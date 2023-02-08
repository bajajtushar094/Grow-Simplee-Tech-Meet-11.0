# Stereoscopic Depth-Based Multi-Modal Volume Estimation
Our primary aim is to accurately calculate the volumetric weight of objects at the last-mile hub using the most reliable and efficient method available. To this end, we propose a stereoscopic depth-based multi-modal volume approximation approach that is based on shape-specific features, with filter enhancements and zero manual intervention in the pipeline.

The file `cuboid.py` contains the code for the volume calculation, and all the dependencies to use the Intel Realsense SDK are in the `opt_realsense.py` file.

## Code Explanation
We have a class called `ObjDetails` that has the following structure:
```py
class ObjDetails(NamedTuple):
    depth_image: np.array
    color_image: np.array
    volume: float
    dimensions: list
    shape: str
```

There are two main functions in the `VolumeCalc` class namely:-
1. `processImage`
2. `saveHandler`

In the `processImage` function, the following steps take place:-
1. Initialise the Depth Camera
2. Start an infinite loop:
    - Get the depth frame and color frame from the camera stream.
    - Remove the background from the color frame to get a foreground mask.
    - Calculate the number of pixels in the foreground and get the ratio with the number of total pixels in the image using `objPixels` method.
    - Get the similarity factor and the object height from the depth frame using the `similarityFactor` function.
    - The `check_sphere` functions runs the test for checking if the object is a sphere based on its radius and height values.
    - After getting the object volume according to the shapes, we then check if the volume is less than the `MIN_VOL_THRESHOLD` then we declare that frame as empty, and push the details of the object (if any).
    - Otherwise, if the current volume is greater than the previous volume, we update the object details. 
    - If the user presses the `Esc` button, the stream is stopped.
3. After the `processImage` function gets executed, we write the objDetails in separate folders for each file.