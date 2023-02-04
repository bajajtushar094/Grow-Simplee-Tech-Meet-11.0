import cv2
import pyrealsense2
import matplotlib.pyplot as plt
from realsense_depth import *

point = (400, 300)

def show_distance(event, x, y, args, params):
    global point
    point = (x, y)

# import module
import numpy as np

# explicit function to normalize array
def normalize_2d(matrix):
    norm = np.linalg.norm(matrix)
    matrix = matrix/norm  # normalized matrix
    return matrix

# Initialize Camera Intel Realsense
dc = DepthCamera()

# Create mouse event
cv2.namedWindow("Color frame")
cv2.setMouseCallback("Color frame", show_distance)
flag = 1
while True:
    ret, depth_frame, color_frame = dc.get_frame()

    # Show distance for a specific point
    cv2.circle(color_frame, point, 4, (0, 0, 255))
    distance = depth_frame[point[1], point[0]]
    depth_max = np.max(depth_frame)
    depth_min = np.min(depth_frame)

    max_pixel = np.argmax(depth_frame)
    min_pixel = np.argmin(depth_frame)

    point2 = max_pixel // depth_frame.shape[1], max_pixel % depth_frame.shape[1]
    cv2.circle(color_frame, point2, 15, (255, 255, 0))

    cv2.putText(color_frame, "{}mm".format(distance), (point[0], point[1] - 20), cv2.FONT_HERSHEY_PLAIN, 2, (0, 0, 0), 2)

    color_depth_frame = 127.5* 2 * normalize_2d(depth_frame)
    print(color_depth_frame)
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
    cv2.imshow("Color frame", color_frame)

    key = cv2.waitKey(1)
    if key == 27:
        break