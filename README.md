
<h2 align="center">GROW SIMPLEE'S ROUTING ALGORITHM</h2>
<h4 align="left">A web application for tracking riders and displaying all the orders</h4>

**A React-Django Based  Web App**  

-------

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


##Optimization Readme
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

## Directory structure 

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
