import open3d as o3d
from PIL import Image
import numpy as np
import pandas as pd

color = o3d.io.read_image('blender4_no_bg.png')
depth = o3d.io.read_image('depth_map_output3.png')
rgbd = o3d.geometry.RGBDImage.create_from_color_and_depth(color, depth, convert_rgb_to_intensity = False)
pinhole_intrinsics = o3d.camera.PinholeCameraIntrinsic(720, 640, 2.86448821e+03, 2.31226656e+03,1.33797695e+03,1.89626498e+03)
# pinhole_intrinsics2 = o3d.camera.PinholeCameraIntrinsic(o3d.camera.PinholeCameraIntrinsicParameters.PrimeSenseDefault)
pcd = o3d.geometry.PointCloud.create_from_rgbd_image(rgbd, pinhole_intrinsics)

# flip the orientation, so it looks upright, not upside-down


# transformed_cloud = pcd
# transformed_cloud_np = transformed_cloud.points.to_numpy()
# transformed_cloud_np = transformed_cloud_np[~np.isnan(transformed_cloud_np).any(axis=1),:]
# transformed_cloud_o3d = o3d.geometry.PointCloud()
# transformed_cloud_o3d.points = o3d.utility.Vector3dVector(transformed_cloud_np)
# transformed_cloud_o3d.transform([[1, 0, 0, 0], [0, -1, 0, 0], [0, 0, -1, 0], [0, 0, 0, 1]])
pcd.transform([[1,0,0,0],[0,-1,0,0],[0,0,-1,0],[0,0,0,1]])

nb_neighbors=15 
std_ratio=1.6
# voxel_size=5e-3

cl, ind = pcd.remove_statistical_outlier(nb_neighbors=nb_neighbors,
                                                    std_ratio=std_ratio)
pcd_clean = pcd.select_by_index(ind)
# voxel_pcd = pcd_clean.voxel_down_sample(voxel_size=voxel_size)

pcd = pcd_clean
# o3d.visualization.draw_geometries([pcd])    # visualize the point cloud



k = np.asarray(pcd.colors)
print(k)
print(k.shape)

# mask = np.isclose(k[:,2],0.39215686, rtol= 1)
pcd_sel = pcd.select_by_index(np.where(np.isclose(k[:,2],0.39215686, rtol= 1)!=True)[0])
# o3d.visualization.draw_geometries([pcd_sel])


hull, _ = o3d.geometry.PointCloud.compute_convex_hull(pcd_sel)
hull.orient_triangles()
hull_ls = o3d.geometry.LineSet.create_from_triangle_mesh(hull)
hull_ls.paint_uniform_color((1, 0, 0))
o3d.visualization.draw_geometries([pcd_sel, hull_ls])    # visualize the point cloud

print(hull.get_volume()*0.75)