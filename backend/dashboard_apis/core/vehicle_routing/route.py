from vehicle_routing.customers import Order, Node

class Route:
    """
        Stores the info about a created route.
        route : List of Order Objects
        current_node : The current position of the vehicle in the route
        vehicle : the vehicle assigned to the current route
    """
    def __init__(self, route, vehicle):
        self.route = route
        self.current_node = 0
        self.vehicle = vehicle

    def next_node(self, new_status):
        """
        Update the order status of the current node and move to the next node in the route.
        
        Parameters:
        -----------
        new_status: int
            Status of the order:
                0 : Unrouted 
                1 : Postponed
                2 : Scheduled
                3 : Success
                4 : Failed
        """

        if self.current_node != 0:
            self.route[self.current_node].update_order_status(new_status)
            print("status", self.route[self.current_node].status)

        if self.current_node < len(self.route):
            self.current_node += 1
            self.vehicle.start = self.route[self.current_node]

    def get_current_node(self):
        """
        Return the current node of the route
        """
        return self.route[self.current_node]

class RoutesList():
    def __init__(self, routes_list):
        self.routes_list = routes_list
    
    def get_initial_routes(self):
        """
        Get the initial routes from the routes list
        """
        curr_solution = []
        print(self.routes_list)
        for vehicle_idx, route in self.routes_list.items():
            temp = []
            print(route)
            #route == -1 means the vehicle is not assigned any route
            if route != -1:
                for node in route.route:
                    if node.status in [3,4]:
                        continue
                    elif (node.current_vrp_index == route.vehicle.start.current_vrp_index or 
                            node.current_vrp_index == route.vehicle.end.current_vrp_index):
                            continue
                    else:
                        temp.append(node.current_vrp_index)
                curr_solution.append(temp)
            else:
                curr_solution.append([])
        
        return curr_solution