import math
import numpy as np
from sklearn.metrics import pairwise

class Node:
    def __init__(self, coordinates, type, volume=0, status=0):
        """        
        The Node class represents a location in a Vehicle Routing Problem (VRP) with attributes for coordinates, type, volume, and status.

        Attributes:
        -----------
        lat: float 
            The latitude coordinate of the node.
        lon: float
            The longitude coordinate of the node.
        coordinates: tuple
            A tuple of latitude and longitude coordinates.
        type: int
            The type of node.
                0 : Depot
                1 : Delivery
                2 : Pickup
        volume: int
            The volume of goods at the node (default 0).
        current_vrp_index: int
            The current index of the node in the VRP (default None).
        status: int
            The status of the node.
                0 : Unrouted
                1 : Postponed
                2 : Scheduled
                3 : Success
                4 : Failed

        Methods:
        -----------
        init(self, coordinates, type, volume=0, status=0): Initializes the Node object with given coordinates, type, volume and status.
        """
        self.type = type 
        self.status = status
        self.volume = volume
        self.lat = coordinates[0]
        self.lon = coordinates[1]
        self.coordinates = coordinates
        self.current_vrp_index = None
        # self.next_vrp_index = None
        
        
class Order(Node):
    """
    The Order class represents a specific order in a Vehicle Routing Problem (VRP) and inherits from the Node class. It stores additional information related to the order such as AWB, SKU, carryforward_penalty, vehicle, orientation, and position.

    Attributes:
    -----------
    AWB: str
        Airway bill number of the order (default None).
    SKU: str
        Stock Keeping Unit of the order (default None).
    carryforward_penalty: int
        Penalty for carrying forward the order (default 1000000).
    vehicle: str
        The vehicle assigned to the order (default None).
    orientation: str
        The orientation of the order (default None).
    position: str
        The position of the order in the vehicle (default None).
    All other attributes are inherited from the Node class.

    Methods:
    -----------
    init(self, volume, coordinates, type, AWB=None, SKU=None, carryforward_penalty=1000000, status=0, vehicle=None, orientation=None, position=None) : Initializes the Order object with given volume, coordinates, type, AWB, SKU, carryforward_penalty, status, vehicle, orientation and position.
    update_order_status(self, new_status): Update the status of the order and also updates the vehicle's capacity accordingly.
    """

    def __init__(self, volume, coordinates, type, AWB=None, SKU=None, carryforward_penalty=1000000, status=0, vehicle=None, orientation=None, position=None):
        super().__init__(coordinates, type, volume, status)
        self.AWB = AWB
        self.SKU = SKU
        self.carryforward_penalty = carryforward_penalty
        self.vehicle = vehicle
        self.orientation = orientation
        self.position = position
        
    def update_order_status(self, new_status):
        """
        Note:
        If the type of the order is 1 (Delivery) and the new status is 4 (Failed), the vehicle's actual volume capacity 
            is reduced by the order volume.
        If the type of the order is 2 (Pickup) and the new status is 3 (Success), the vehicle's actual volume capacity 
            is reduced by the order volume.
        """
        if self.type == 1:
            if new_status == 4:
                # Delivery failed: Reduce vehicle capacity by order volume
                self.vehicle.actual_volume_capacity -= self.volume
        if self.type == 2:
            if new_status == 3:
                self.vehicle.actual_volume_capacity -= self.volume
        
        self.status = new_status

class Customers():
    """
        A class to store and process customer information for VRP problem.
        Attributes:
        -----------
        depot: object
            Location of the depot
        orders: list
            List of orders that are scheduled to be delivered or are unrouted (Not the ones that are failed or delivered or postponed)
        service_time: int
            The time required to service a customer, default is 5 minutes
        number: int
            The number of customers including the depot
        customers: list
            List of all customers including the depot and the orders
            
        Methods:
        --------
        process_orders(self, orders)
            Filters the list of orders to only include unrouted and scheduled orders
        process_customers(self)
            Creates a list of all customers including the depot and the orders and assigns an index to each customer
    """
    def __init__(self, depot, orders, service_time = 5):
        self.depot = depot
        self.number = None
        self.orders = self.process_orders(orders)
        self.customers = self.process_customers()
        self.service_time = service_time

    def process_orders(self, orders):
        order_list = []
        for order in orders:
            if order.status in [0, 2]:
                order_list.append(order)
        return order_list

    def process_customers(self):
        customer_list = [self.depot] + self.orders
        # print(customer_list)
        for idx, c in enumerate(customer_list): 
            c.current_vrp_index = idx
        
        self.number = len(customer_list)
        return customer_list
            
    def set_manager(self, manager):
        self.manager = manager

    def make_distance_mat(self, method='haversine'):
        """
        Return a distance matrix and make it a member of Customer, using the
        method given in the call. Currently only Haversine (GC distance) is
        implemented, but Manhattan, or using a maps API could be added here.
        Raises an AssertionError for all other methods.
        Args: method (Optional[str]): method of distance calculation to use. The
        Haversine formula is the only method implemented.
        Returns:
            Numpy array of node to node distances.
        Examples:
            >>> dist_mat = customers.make_distance_mat(method='haversine')
            >>> dist_mat = customers.make_distance_mat(method='manhattan')
            AssertionError
        """
        if method == 'haversine':
            self.distmat = self._haversine(self.customers)
        elif method == 'euclidean':
            self.distmat = self._euclidean(self.customers)
        else:
            #OSRM
            pass

    def _euclidean(self, nodes):
        # calculate the distance matrix using the euclidean method
        input_locations = [[math.radians(float(o.lat)), math.radians(float(o.lon))] for o in nodes]
        return np.ceil(pairwise.euclidean_distances(input_locations) * 1000)

    def _haversine(self, nodes):
        # calculate the distance matrix using the haversine method
        input_locations = [[math.radians(float(o.lat)), math.radians(float(o.lon))] for o in nodes]
        return np.ceil(pairwise.haversine_distances(input_locations) * 637100)

    def get_total_volume(self):
        """
        Return the total demand of all customers.
        """
        return (sum([c.volume for c in self.customers]))

    def return_dist_callback(self, **kwargs):
        """
        Return a callback function for the distance matrix.
        Args: **kwargs: Arbitrary keyword arguments passed on to
        make_distance_mat()
        Returns:
            function: dist_return(a,b) A function that takes the 'from' node
                index and the 'to' node index and returns the distance in km.
        """
        self.make_distance_mat(**kwargs)
        print(self.distmat)

        def dist_return(from_index, to_index):
            # Convert from routing variable Index to distance matrix NodeIndex.
            from_node = self.manager.IndexToNode(from_index)
            to_node = self.manager.IndexToNode(to_index)
            return int(self.distmat[from_node][to_node])

        return dist_return

    def return_delivery_callback(self):
        """
        Return a callback function for the delivery volume.

        Returns:
            function: delivery_return(a) A function that takes the node index and
            returns the delivery volume at that node.
        """
        def delivery_return(from_index):
            # Convert from routing variable Index to distance matrix NodeIndex.
            from_node = self.manager.IndexToNode(from_index)
            delivery_node = self.customers[from_node]
            if delivery_node.type == 1:
                return int(-delivery_node.volume)
            else:
                return 0

        return delivery_return
        
    def return_load_callback(self):
        """
        Return a callback function for the load volume.
        
        Returns:
            function: load_return(a) A function that takes the node index and
            returns the load volume ((+pickup) + (-delivery)) at that node.
        """
        def load_return(from_index):
            # Convert from routing variable Index to distance matrix NodeIndex.
            from_node = self.manager.IndexToNode(from_index)
            delivery_node = self.customers[from_node]
            if delivery_node.type == 1:
                return int(-delivery_node.volume)
            elif delivery_node.type == 2:
                return int(delivery_node.volume)
            else:
                return 0

        return load_return

    def make_service_time_call_callback(self):
        """
        Return a callback function that provides the time spent servicing the
        customer. Default 300 seconds per unit demand.
        Returns:
            function [dem_return(a, b)]: A function that takes the from/a node
                index and the to/b node index and returns the service time.
        """

        def service_time_return(a, b):
          return self.service_time

        return service_time_return

    def make_transit_time_callback(self, speed_kmph=25):
        """
        Creates a callback function for transit time. Assuming an average
        speed of speed_kmph
        Args:
            speed_kmph: the average speed in km/h
        Returns:
            function [transit_time_return(a, b)]: A function that takes the
                from/a node index and the to/b node index and returns the
                transit time from a to b.
        """

        def transit_time_return(a, b):
            return (self.distmat[a][b] / (speed_kmph * 1000 / 60))

        return transit_time_return