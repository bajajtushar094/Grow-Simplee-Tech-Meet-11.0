import cv2
# from realsense_depth import *
from .opt_realsense import *
import matplotlib.pyplot as plt
import rembg
import numpy.ma as ma
import numpy as np
import os
import json
import threading
from collections import deque
from typing import NamedTuple
import warnings
import time

warnings.filterwarnings('ignore')

class ObjDetails(NamedTuple):
    depth_image: np.array
    color_image: np.array
    volume: float
    dimensions: list
    shape: str



# TODO: compare the various filters in the final report
class VolumeCalc:
    def __init__(self):
        self.point = (100, 100)
        self.point2 = None
        self.queue = deque([])
        self.MIN_VOL_THRESHOLD = 27
        self.SPHERE_THRESHOLD = 0.3
        self.queue.clear()
        self.processImage(queue=self.queue)
        self.saveHandler(queue=self.queue)

    def saveHandler(self, queue):
        counter = 1

        while len(queue) > 0:
            obj_details = queue.popleft()
            if obj_details is None:
                continue
            folder_name = "folder" + str(counter)
            self.saveToFolder(folder_name=folder_name, obj_details=obj_details)
            counter = counter + 1


    def saveToFolder(self, folder_name, obj_details: ObjDetails):
        #TODO: see if dimensions can be presented better. For cylinder we give radius and length only. Or else just give the cuboid dimensions.
        depth_image = obj_details.depth_image
        color_image = obj_details.color_image
        volume = obj_details.volume
        dimensions = obj_details.dimensions
        shape = obj_details.shape

        # base_path = os.getcwd()
        base_path = '/home/gunjan/Desktop/task1_interiit/dump'
        folderPath = os.path.join(base_path, folder_name)
        folderExist = os.path.exists(folderPath)

        if not folderExist:
            os.mkdir(folderPath)
            print("Folder does not exist. Creating new folder...")
        else:
            print(f"Folder already exists. Overwriting files in {folderPath}")

        cv2.imwrite(os.path.join(folderPath, "depth_image.png"),depth_image)
        cv2.imwrite(os.path.join(folderPath, "color_image.png"),color_image)

        product_information = {
            "volume": volume,
            "dimensions": dimensions,
            "shape": shape
        }

        json_obj = json.dumps(product_information, indent=4)

        with open(os.path.join(folderPath, "details.json"), "w") as outfile:
            outfile.write(json_obj)
        print("All files successfully written!")

    def showDistance(self, event, x, y, args, params):
        global point
        point = (x, y)

    def objPixels(self, color2, obj_area_threshold):
        obj_pixels = np.sum(color2[:,:,3]> obj_area_threshold)
        total_pixels = color2.shape[0] * color2.shape[1]
        print(f"Pixels of object = {obj_pixels}")
        ratio = obj_pixels/total_pixels
        print(f"Ratio of object area = {ratio}")
        return ratio, obj_pixels


    def similarityFactor(self, depth_frame, color2, depth_2, alpha_threshold, obj_pixels):
        depth_max = np.max(depth_2)
        depth_min = np.min(depth_2)

        overall_img_depth = np.mean(depth_2) * depth_2.shape[0]

        print(f"Max depth = {depth_max} and min depth = {depth_min}")

        masked_depth = ma.masked_array(depth_frame, mask = color2[:,:,3] > alpha_threshold)
        obj_depth = np.mean(masked_depth) * obj_pixels
        avg_bg_depth =  (overall_img_depth - obj_depth) / (depth_2.shape[0] - obj_pixels)

        obj_height = avg_bg_depth - depth_min
        obj_height = obj_height/10
        similarity_factor = depth_min/depth_max

        return similarity_factor, obj_height


    def normalize2D(self, matrix):
        norm = np.linalg.norm(matrix)
        matrix = matrix/norm  # normalized matrix
        return matrix
    
    def check_sphere(self, obj_area, obj_height, radius):

        print(f"Radius = {radius} cm")
        sphere = False

        if abs(radius - obj_height/2)/radius < self.SPHERE_THRESHOLD:
            print("Sphere detected!")
            sphere = True
            # radius = obj_height/2
        else:
            print("Not a sphere")
            
        return sphere

    def processImage(self, queue):
        # Initialize Camera Intel Realsense
        dc = DepthCamera()

        # Create mouse event
        cv2.namedWindow("Color frame")
        cv2.setMouseCallback("Color frame", self.showDistance)

        temp_item = None
        point = self.point
        while True:
            print("------------------------------------------------------------")
            # i+= 1
            ret, depth_frame, depth_rgb_image, color_frame = dc.get_frame()

            # depth_frame = depth_frame[90:370, 90:550]
            # color_frame = color_frame[90:370, 90:550]

            color2 = rembg.remove(color_frame)

            area = 27*16.4 #TODO: Need to fix these values
            ratio, obj_pixels = self.objPixels(color2= color2, obj_area_threshold=215)

            # Show distance for a specific point
            cv2.circle(color_frame, point, 4, (0, 0, 255))
            distance = depth_frame[point[1], point[0]]

            #ignore the zeros
            depth_2 = depth_frame[depth_frame != 0]
            similarity_factor, obj_height = self.similarityFactor(depth_frame = depth_frame, color2= color2, depth_2=depth_2, alpha_threshold=250, obj_pixels=obj_pixels)

            obj_area = ratio * area * (similarity_factor**2)
            
            radius = np.sqrt(obj_area/np.pi)
            if(self.check_sphere(obj_area,obj_height, radius)):
                print(f"Difference in heights = {obj_height} cm")
                print(f"Area of the top = {obj_area} cm2")
                volume = 4/3 * np.pi * (radius**3)
                print(f"Volume of object = {volume} cm3")
            
            else:
                volume = obj_area * obj_height

                print(f"Difference in heights = {obj_height} cm")
                print(f"Area of the top = {obj_area} cm2")
                print(f"Volume of object = {volume} cm3")

            max_pixel = np.argmax(depth_frame)
            min_pixel = np.argmin(depth_frame)
            point2 = max_pixel // depth_frame.shape[1], max_pixel % depth_frame.shape[1]
            cv2.circle(color_frame, point2, 15, (255, 255, 0))

            cv2.putText(color_frame, "{}mm".format(distance), (point[0], point[1] - 20), cv2.FONT_HERSHEY_PLAIN, 2, (0, 0, 0), 2)

            # color_depth_frame = 127.5* 2 * self.normalize2D(depth_frame)

            # colormap = plt.get_cmap('inferno')
            # heatmap = (colormap(color_depth_frame) * 2**16).astype(np.uint16)[:,:,:3]
            # heatmap = cv2.cvtColor(heatmap, cv2.COLOR_RGB2BGR)
            # heatmap = depth_frame

            cv2.imshow("depth frame", depth_rgb_image)
            cv2.imshow("Color frame", color_frame)

            item_details = ObjDetails(depth_image=depth_rgb_image, color_image=color_frame, volume=volume, dimensions=[], shape='Cuboid')

            prev_vol = 0
            if volume < self.MIN_VOL_THRESHOLD:
                volume = 0
                if temp_item is not None:
                    print("Pushed the previous object details.")
                    queue.append(temp_item)
                    temp_item = None
                print("----------Empty Frame----------")
            else:
                if volume > prev_vol:
                    prev_vol = volume
                    if temp_item is not None:
                        temp_item = None
                    temp_item = item_details
                    print("Updated the Object details!")
            key = cv2.waitKey(27)
            
            if key == 27:
                break
        queue.append(temp_item)

vol = VolumeCalc()
