import torch
import numpy as np
import pandas as pd
from rembg import remove
from PIL import Image
import matplotlib.pyplot as plt
import cv2
import glob
import open3d as o3d
from typing import List

class Item:
    def __init__(self, img_path: str, item_id: str, device: str = "cpu", factor: int = 33000):
        self.device = device
        self.factor = factor
        self.img_path = img_path
        self.item_id = item_id
        self.img = Image.open(img_path)
        self.img = self.img.convert("RGB")
        self.no_bg, self.no_bg_path = self.get_seg_mask()
        self.depth_output, self.depth_output_path = self.get_depth_map()
        self.pcd_sel = self.get_point_cloud()
        self.hull_ls = self.get_convex_hull()
        self.volume, self.real_volume = self.get_volume()
        self.bounding_box = self.get_bounding_box()
        
        o3d.visualization.draw_geometries([self.pcd_sel, self.hull_ls, self.bounding_box])
    
    def get_depth_map(self, use_large_model=True):
        midas = torch.hub.load("intel-isl/MiDaS", "MiDaS")

        if use_large_model:
            midas = torch.hub.load("intel-isl/MiDaS", "MiDaS")
        else:
            midas = torch.hub.load("intel-isl/MiDaS", "MiDaS_small")

        midas.to(self.device)
        midas_transforms = torch.hub.load("intel-isl/MiDaS", "transforms")

        if use_large_model:
            transform = midas_transforms.default_transform
        else:
            transform = midas_transforms.small_transform
        
        depth_output = self.depth(midas=midas, transform=transform, img=self.img)
        depth_output_path = f'{self.img_path.split(".")[0]}_depth_map.png'
        depth_output.save(depth_output_path)

        self.depth_output = depth_output
        print("Depth Map Saved!")
        return depth_output, depth_output_path

    def get_seg_mask(self):
        no_bg = remove(self.img)
        no_bg = no_bg.convert("RGBA")
        self.no_bg = no_bg

        no_bg_path = f'{self.img_path.split(".")[0]}_no_bg.png'
        self.no_bg.save(no_bg_path)
        print("Segmentation Mask Saved!")
        return no_bg, no_bg_path

    def get_point_cloud(self, nb_neighbors=15, std_ratio=1.6):
        color = o3d.io.read_image(self.no_bg_path)
        depth_img = o3d.io.read_image(self.depth_output_path)
        rgbd = o3d.geometry.RGBDImage.create_from_color_and_depth(
            color,
            depth_img,
            convert_rgb_to_intensity=False
        )
        pinhole_intrinsics = o3d.camera.PinholeCameraIntrinsic(720, 640, 2.86448821e+03, 2.31226656e+03, 1.33797695e+03, 1.89626498e+03)
        pcd = o3d.geometry.PointCloud.create_from_rgbd_image(rgbd, pinhole_intrinsics)

        pcd.transform([[1,0,0,0],[0,-1,0,0],[0,0,-1,0],[0,0,0,1]])
        cl, ind = pcd.remove_statistical_outlier(nb_neighbors=nb_neighbors,
                                                    std_ratio=std_ratio)
        pcd_clean = pcd.select_by_index(ind)
        pcd = pcd_clean
        k = np.asarray(pcd.colors)
        print(k)
        print(k.shape)
        pcd_sel = pcd.select_by_index(np.where(np.isclose(k[:,2],0.39215686, rtol= 1)!=True)[0])
        self.pcd = pcd
        self.pcd_sel = pcd_sel
        print("Point Cloud Generated!")
        self.point_cloud_path = f'{self.img_path.split(".")[0]}_point_cloud.pcd'
        o3d.io.write_point_cloud(self.point_cloud_path, pcd_sel, print_progress=True)
        print("Point Cloud Saved!")
        return pcd_sel
    
    def get_convex_hull(self):
        hull, _ = o3d.geometry.PointCloud.compute_convex_hull(self.pcd_sel)
        hull.orient_triangles()
        hull_ls = o3d.geometry.LineSet.create_from_triangle_mesh(hull)
        hull_ls.paint_uniform_color((1, 0, 0))
        self.hull_ls = hull_ls
        self.hull = hull
        print("Convex Hull Generated.")
        return hull_ls

    def get_volume(self):
        self.volume = self.hull.get_volume()
        self.real_volume = self.volume * (self.factor ** 3)
        print(f"Real Volume = {self.real_volume} cm3")
        print(f"Volume = {self.volume}")
        return self.volume, self.real_volume

    def get_bounding_box(self):
        bounding_box = o3d.geometry.OrientedBoundingBox.create_from_points(self.pcd_sel.points, robust=True)
        bounding_box.color = [0, 1, 0]
        self.bounding_box = bounding_box
        print("Bounding Box Generated!")
        return bounding_box

    def is_defect():
        pass

    def get_defect_percent():
        pass

    def get_dimensions():
        pass

    def depth(self, img, midas, transform):
        device = self.device
        cv_image = np.array(img) 
        img = cv2.cvtColor(cv_image, cv2.COLOR_BGR2RGB)

        input_batch = transform(img).to(device)
        with torch.no_grad():
            prediction = midas(input_batch)

            prediction = torch.nn.functional.interpolate(
                prediction.unsqueeze(1),
                size=img.shape[:2],
                mode="bicubic",
                align_corners=False,
            ).squeeze()

            output = prediction.cpu().numpy()
            formatted = (output * 255 / np.max(output)).astype('uint8')
            img = Image.fromarray(formatted)
        return img


item = Item(img_path="images/xppen.jpg", item_id="123")
