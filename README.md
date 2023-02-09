
<h2 align="center">GROW SIMPLEE'S ROUTING ALGORITHM</h2>
<h4 align="left">A web application for tracking riders and displaying all the orders</h4>

**A React-Django Based  Web App**  

-------

# Development Readme

### Prerequisites

1.  [Git](https://git-scm.com/downloads).
2.  [Node & npm](https://nodejs.org/en/download/) _(version 12 or greater)_.
3.  A fork of the repo.
4.  Python3 environment to install Django and its dependencies

### Directory Structure

The following is a high-level overview of relevant files and folders.

```
backend/
├── dashboard_apis/
│   ├── core/
│   ├── dashboard_apis/
|   ├── files/
|   ├── scripts/
|   ├── static/
|   ├── templates/
|   ├── utils/
|   ├── volume_estimation/
|   ├── dbsqlite3
|   ├── generate_data.py
|   ├── load_adress.py
|   ├── load_data_object.py
|   ├── load_data_owner.py
|   ├── load_rider.py
|   ├── manage.py 
|   └── requirements.txt
|
└── frontend/
    ├── public/
    │   ├── index.html
    │   └── ...
    ├── src/
    │   ├── app/
    │   │   ├── store.js
    │   ├── Components/
    |   |   ├── Auth/
    │   │   ├── Global/
    |   |   ├── Layout/
    |   |   ├── Mobile/
    |   |   ├── RiderManagement/
    │   │   └── VolumeEstimation/
    │   ├── constants/
    │   ├── dummy_files/
    │   ├── features/
    │   ├── Pages/
    |       ├── Mobile/
    |       |   ├──Checklist.jsx
    |       |   └── ...
    |       ├── Dashboard.jsx
    |       ├── Demo.jsx
    |       ├── Inventory.jsx
    |       ├── InventoryImages.jsx
    |       ├── ManagerLogin.jsx
    |       ├── RiderDetails.jsx
    |       ├── RiderManagement.jsx
    |       ├── Riders.jsx
    |       ├── UploadZipPage.jsx
    |       └── VolumeEstimation
    |   ├── redux/
    |   ├── shared/
    |   ├── styles/
    |   ├── App.js
    |   ├── index.js
    |   ├── package-lock.json
    |   ├── package.json
    |   └── tailwind.config.js
    ├── .gitignore
    └── .README.MD
       
```

## Installation

### Steps to run backend

In order to install all packages follow the steps below:

 1. Move to backend folder
 2. Then move into the dashboard_apis folder
 3. For installing virtual environment - `python3 -m pip install --user virtualenv`
 4. Create A Virtual env - `python3 -m venv env`
 5. Activate virtual env - `source env/bin/activate`
 6. `pip3 install -r requirements.txt`
 7. `python manage.py runserver localhost:8000`

### Steps To Set Up Frontend
 1. Move to frontend folder
 2. Move into dashboard_frontend
 3. `npm install`
 4. `npm start`




> The model will be served on **http://localhost:3000/**


### Celery Setup
Solving the VRP is a quite a time intensive task. If done within the Django Server, the server will keep waiting for the response of solver to generate the response. This will clog the system as Django will not accept any request till the vrp solution is returned. To solve this issue we use a task queue namely Celery and a message broker Redis which offloads the part of solving the vrp to an another seerver.
The celery worker returns the id of the task in the queue which can be later used to fetch the solution celery results backend.

Celery-beat is used in the project to execute tasks of solving the vrp at regular intervals.

Setup:
1. First install celery using pip:
    pip intsall celery
2. Install redis
3. In a terminal start a redis server through the command
    redis-server
4. Inside the backend/dashboard_apis directory run the given command in a new terminal to start the celery server:
    celery -A dashboard_apis worker --pool=solo -l info
5. Inside the backend/dashboard_apis directory run the given command in a new terminal to start the celery beat server:
    celery -A dashboard_apis beat -l info


# Task 1 Readme

### Stereoscopic Depth-Based Multi-Modal Volume Estimation
Our primary aim is to accurately calculate the volumetric weight of objects at the last-mile hub using the most reliable and efficient method available. To this end, we propose a stereoscopic depth-based multi-modal volume approximation approach that is based on shape-specific features, with filter enhancements and zero manual intervention in the pipeline.

The file `cuboid.py` contains the code for the volume calculation, and all the dependencies to use the Intel Realsense SDK are in the `opt_realsense.py` file.

### Code Explanation
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


 # Task 2 Readme

Route planning for optimised last mile delivery
The Capacitated Vehicle Routing Problem with Mixed Pickup and Delivery(CVRPMPD) is a optimization problem that involves finding the most effective routes while maintaining the various constraints such as capacity, route lenghts and route times. It is an NP-Hard Problem whose time complexity increaes exponentially with increase in problem size and hence cannot be solved using exact methods in an reasonable amount of time. 

To solve the problem of generating optimal routes for drivers we have modelled the problem using a open source software(or-tools). The structure of the solution is given below.

Installation:
1. First create a virtualenv through the following commands:
    -pip install --user virtualenv
    -virtualenv venv
    -venv\scripts\activate (for windows)
    -venv\bin\activate (for Mac/Unix)

2. Inside the vehicle_routing directory install the libraries from the requirements using requirements.txt using the command
    pip install -r requirements.txt

3. To run the VRP solver use the following commandd:
    python main.py

### Directory structure 

```
    ├── vehicle_routing/
    │   ├── city_graph.py
    │   ├── customers.py
    |   ├── helpers.py
    |   ├── route.py
    |   ├── vehicle.py
    |   ├── vrp.py
    └── main.py
    └── input
    └── mock
    └── wards
```
