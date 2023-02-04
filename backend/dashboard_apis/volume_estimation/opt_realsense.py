import pyrealsense2 as rs
import numpy as np
import cv2

class DepthCamera:
    def __init__(self):
        # Configure depth and color streams
        self.pipeline = rs.pipeline()
        config = rs.config()
        self.colorizer = rs.colorizer()

        # Get device product line for setting a supporting resolution
        pipeline_wrapper = rs.pipeline_wrapper(self.pipeline)
        pipeline_profile = config.resolve(pipeline_wrapper)
        device = pipeline_profile.get_device()
        device_product_line = str(device.get_info(rs.camera_info.product_line))

        config.enable_stream(rs.stream.depth, 640, 480, rs.format.z16, 30)
        config.enable_stream(rs.stream.color, 640, 480, rs.format.bgr8, 30)

        # Start streaming
        self.pipeline.start(config)
        self.flag = True

    def get_frame(self):
        frames = self.pipeline.wait_for_frames()
        depth_frame = frames.get_depth_frame()
        color_frame = frames.get_color_frame()
        
        hole_filling = rs.hole_filling_filter()
        depth_frame = hole_filling.process(depth_frame)
        # if self.flag:
        #     depth_image = np.asanyarray(self.colorizer.colorize(depth_frame).get_data())
        #     cv2.imwrite("vanilla.png", depth_image)
            
        #     spatial = rs.spatial_filter()
        #     spatial.set_option(rs.option.holes_fill, 2)
        #     sp_depth_frame = spatial.process(depth_frame)
        #     depth_image = np.asanyarray(self.colorizer.colorize(sp_depth_frame).get_data())
        #     color_image = np.asanyarray(color_frame.get_data())
        #     cv2.imwrite("spatial.png", depth_image)

        #     hole_filling = rs.hole_filling_filter()
        #     hf_depth_frame = hole_filling.process(depth_frame)
        #     depth_image = np.asanyarray(self.colorizer.colorize(hf_depth_frame).get_data())
        #     cv2.imwrite("hole_filling.png", depth_image)

        #     self.flag = False
        # depth_image = np.asanyarray(depth_frame.get_data())
        color_image = np.asanyarray(color_frame.get_data())
        depth_rgb_image = np.asanyarray(self.colorizer.colorize(depth_frame).get_data())
        depth_image = np.asanyarray(depth_frame.get_data())
        if not depth_frame or not color_frame:
            return False, None, None
        return True, depth_image, depth_rgb_image, color_image

    def release(self):
        self.pipeline.stop()