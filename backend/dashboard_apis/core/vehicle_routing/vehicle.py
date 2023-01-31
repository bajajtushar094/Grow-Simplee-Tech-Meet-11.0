import matplotlib.pyplot as plt

class Vehicle:
    """
    Vehicle class represents a vehicle that is used to deliver a set of orders in a Vehicle Routing Problem (VRP). It contains information related to the vehicle's capacity, status, location, route, current trip and the orders assigned to it.

    Attributes:
    -----------
    vehicle_index: int
        Index of the vehicle.
    vehicle_status: str
        Status of the vehicle (default None).
    total_volume_capacity: int
        Total volume capacity of the vehicle.
    actual_volume_capacity: int
        Actual volume capacity of the vehicle.
    current_location: int
        Current location of the vehicle.
    current_node: obj
        The current node of the vehicle.
    last_node: obj
        The last node visited by the vehicle.
    next_node: obj
        The next node that the vehicle is going to visit.
    route: list
        List of orders assigned to the vehicle.
    start: obj
        The starting node of the vehicle.
    end: obj
        The ending node of the vehicle.
    current_trip: obj
        The current trip of the vehicle.
    available_volume_capacity: int
        The available volume capacity of the vehicle.

    Methods:
    -----------
    update_container_volume(self, order_id, order_status, load_volume, order_type): Updates the container volume after a pick-up or delivery of an order. It takes in the order_id, order_status, load_volume and order_type as parameters and updates the vehicle's total and available volume capacity accordingly. It returns None.
    """
    def __init__(self, total_volume_capacity, vehicle_status=None, current_location=0, alotted_packages=None, start=None, end=None, last_node=None, next_node=None, current_node=None, route=None,current_trip=None):
        self.vehicle_index = None
        self.vehicle_status = vehicle_status

        self.total_volume_capacity = total_volume_capacity
        self.actual_volume_capacity = total_volume_capacity

        self.current_location = current_location
        self.current_node = start
        self.last_node = last_node
        self.next_node = next_node

        self.route = route

        self.start = start
        self.end = end

        self.current_trip = current_trip

        if route != None:
            self.available_volume_capacity = total_volume_capacity - sum([order.volume for order in route])
        else:
            self.available_volume_capacity = total_volume_capacity
        
        
    def update_container_volume(self, order_id, order_status, load_volume, order_type):
        self.route[self.route.find(order_id)]=order_status
        if order_type==0: 
            # Pickup
            pass
        else:
            pass
        if order_status==3: 
            # Successful
            self.total_volume_capacity -= load_volume
            self.available_volume_capacity -= load_volume
        else:
            pass
        if order_status==3: #successful
            self.available_volume_capacity += load_volume
        else:
            self.total_volume_capacity -= load_volume
            self.available_volume_capacity -= load_volume
        return

class Fleet:
    """
        The Fleet class represents a collection of vehicles and their properties. It initializes the indexes of the vehicles, sets the starts and ends of the vehicles and provides methods to get the total volume capacity of the vehicles.

        Attributes:
        -----------
        vehicle_list: list
            A list of vehicles in the fleet.
        num_vehicles: int
            The number of vehicles in the fleet.
        starts: list
            A list of starting nodes for each vehicle in the fleet.
        ends: list
            A list of ending nodes for each vehicle in the fleet.

        Methods:
        -----------
        process_vehicle_list(vehicle_list): 
            Initialize indexes to the vehicles.
        get_total_vol_capacity(): 
            Returns the total volume capacity of the vehicles.
        set_starts_ends(): 
            Set the starts and ends of the vehicles in the fleet.
"""
    def __init__(self, vehicle_list):
        self.num_vehicles = len(vehicle_list)
        self.vehicle_list = self.process_vehicle_list(vehicle_list)
        self.capacities = [vehicle.actual_volume_capacity for vehicle in vehicle_list]
        self.starts = None
        self.ends = None
    
    def process_vehicle_list(self, vehicle_list):
        """
        Initialize indexes to the vehicles
        """
        for idx, vehicle in enumerate(vehicle_list):
            vehicle.vehicle_index = idx

        return vehicle_list
        
    def get_total_vol_capacity(self):
        """
        Returns the total volume capacity of the vehicles
        """
        return sum([vehicle.total_volume_capacity for vehicle in self.vehicle_list])

    def set_starts_ends(self):
        print(self.vehicle_list[0].start.current_vrp_index)
        self.starts = [v.start.current_vrp_index for v in self.vehicle_list]
        self.ends = [0] * len(self.starts)
        
            
      