import cv2
import pyrealsense2
# from realsense_depth import *
from opt_realsense import *
import matplotlib.pyplot as plt
import rembg
import numpy
import numpy.ma as ma

point = (100, 100)
point2 = None
THRESHOLD = 0.3

def show_distance(event, x, y, args, params):
    global point
    point = (x, y)

def normalize_2d(matrix):
    norm = np.linalg.norm(matrix)
    matrix = matrix/norm  # normalized matrix
    return matrix

# Initialize Camera Intel Realsense
dc = DepthCamera()

cv2.namedWindow("Color frame")
cv2.setMouseCallback("Color frame", show_distance)
flag = 1
while True:
    print("--------------------------------------------------------------")
    ret, depth_frame, color_frame = dc.get_frame()

    depth_frame = depth_frame[90:370, 90:550]
    color_frame = color_frame[90:370, 90:550]

    color2 = rembg.remove(color_frame)

    obj_pixels = np.sum(color2[:,:,3]>250)
    total_pixels = color2.shape[0] * color2.shape[1]
    print(f"Pixels of object = {obj_pixels}")
    ratio = obj_pixels/total_pixels
    print(f"Ratio of object area = {ratio}")
    area = 27*16.4

    # Show distance for a specific point
    cv2.circle(color_frame, point, 4, (0, 0, 255))
    distance = depth_frame[point[1], point[0]]

    depth_2 = depth_frame[depth_frame != 0]

    depth_max = np.max(depth_2)
    depth_min = np.min(depth_2)

    overall_img_depth = np.mean(depth_2) * depth_2.shape[0]
    
    # obj_depth = np.mean(depth_2[color2[:,:,3]>250]) * obj_pixels
    masked_depth = ma.masked_array(depth_frame, mask = color2[:,:,3]>250)
    obj_depth = np.mean(masked_depth) * obj_pixels
    avg_bg_depth =  (overall_img_depth - obj_depth) / (depth_2.shape[0] - obj_pixels)

    # obj_height = depth_max - depth_min
    obj_height = avg_bg_depth - depth_min
    obj_height = obj_height/10

    max_pixel = np.argmax(depth_frame)
    min_pixel = np.argmin(depth_frame)

    similarity_factor = (avg_bg_depth - obj_height/2)/avg_bg_depth

    obj_area = ratio * area * (similarity_factor**2)

    radius = np.sqrt(obj_area/np.pi)
    print(f"Radius = {radius} cm")
    sphere = False

    if abs(radius - obj_height/2)/radius < THRESHOLD:
        print("Sphere detected!")
        sphere = True
        # radius = obj_height/2
    else:
        print("Not a sphere")

    print(f"Avg bg depth = {avg_bg_depth} cm")
    print(f"Max height = {depth_max} and min height = {depth_min}")
    print(f"Difference in heights = {obj_height} cm")
    print(f"Area of the object's top = {obj_area} cm2")
    volume = 4/3 * np.pi * (radius**3)
    print(f"Volume of the object = {volume} cm3")

    point2 = max_pixel // depth_frame.shape[1], max_pixel % depth_frame.shape[1]
    cv2.circle(color_frame, point2, 15, (255, 255, 0))

    cv2.putText(color_frame, "{}mm".format(distance), (point[0], point[1] - 20), cv2.FONT_HERSHEY_PLAIN, 2, (0, 0, 0), 2)

    color_depth_frame = 127.5* 2 * normalize_2d(depth_frame)
    # print(color_depth_frame)
    # color_depth_frame = cv2.cvtColor(color_depth_frame,cv2.COLOR_GRAY2RGB)
    # heatmap = cv2.applyColorMap(color_depth_frame, cv2.COLORMAP_HOT)
    colormap = plt.get_cmap('inferno')
    heatmap = (colormap(color_depth_frame) * 2**16).astype(np.uint16)[:,:,:3]
    heatmap = cv2.cvtColor(heatmap, cv2.COLOR_RGB2BGR)

    if flag:
        cv2.imwrite("heatmap.png",heatmap)
        cv2.imwrite("rgb.png", color_frame)
        flag = 0

    cv2.imshow("depth frame", heatmap)
    # cv2.imshow("Depth frame", depth_frame)
    cv2.imshow("Color frame", color_frame)

    key = cv2.waitKey(1)
    
    if key == 27:
        break