import time
import math
import random 
import numpy as np
import pandas as pd
from datetime import datetime, timedelta
from utils.vehicle_routing.customers import Node, Order
from utils.vehicle_routing.vehicle import Vehicle
from ortools.constraint_solver import routing_enums_pb2  
  
def timer_func(func):
    # This function shows the execution time of 
    # the function object passed
    def wrap_func(*args, **kwargs):
        t1 = time.time()
        result = func(*args, **kwargs)
        t2 = time.time()
        print(f'Function {func.__name__!r} executed in {(t2-t1):.4f}s')
        return result
    return wrap_func

def generate_locs(num_rows):
    lat = 31.156412
    lon = 121.271469

    result = []

    for _ in range(num_rows):
        dec_lat = random.random()/100
        dec_lon = random.random()/100

        result.append([lat + dec_lat, lon + dec_lon])
    
    return np.array(result)

def generate_problem_from_file(path_to_delivery, path_to_pickup):
    depot = Node([12.9716, 77.5946], 0)

    delivery_df = pd.read_excel(path_to_delivery)
    pickup_df = pd.read_excel(path_to_pickup)

    orders = []
    vehicles = []

    for index, row in delivery_df.iterrows():
        if pd.notnull(row["lat"]) and pd.notnull(row["lon"]):
            if pd.notnull(row["EDD"]):
                deadline = math.ceil((datetime.strptime(row['EDD'], "%d-%m-%Y") - datetime.now()).total_seconds() / (60 * 60 * 24))
            else:
                deadline = 0
            orders.append(Order(1, [row['lat'], row['lon']],  1, AWB=row['AWB'], SKU=row['product_id'], deadline=deadline))

    for index, row in pickup_df.iterrows():
        if row['lat'] is not None and row['lon'] is not None:
            orders.append(Order(1, [row['lat'], row['lon']], 2, SKU=row['product_id']))
    
    num_vehicles = max(1, len(orders) // 20)

    for i in range(num_vehicles):
        vehicles.append(Vehicle(25, start=depot, end=depot))
    
    return depot, orders, vehicles

def generate_coordinates(center_lat, center_long, radius=10000):
    radius_in_degrees = radius / 111300
    u = random.uniform(0, 1)
    v = random.uniform(0, 1)
    w = radius_in_degrees * math.sqrt(u)
    t = 2 * math.pi * v
    x = w * math.cos(t)
    y = w * math.sin(t)
    new_x = x / math.cos(math.radians(center_lat))
    new_long = new_x + center_long
    new_lat = y + center_lat
    return [new_lat, new_long]

def generate_random_order(type=None, start_time=None, end_time=None):
    if type is None:
        type = np.random.choice([1, 2], size=1, p=[0.7, 0.3])

    return Order(1, generate_coordinates(12.9716, 77.5946), type=type, start_time=start_time, end_time=end_time)

def generate_random_problem(num_orders=50, **kwargs):
    depot = Node([12.9716, 77.5946], 0)
    orders = []
    vehicles = []

    for i in range(num_orders):
        orders.append(generate_random_order(**kwargs))
    
    num_vehicles = max(1, num_orders // 25)

    for i in range(num_vehicles):
        vehicles.append(Vehicle(25, start=depot, end=depot))
    
    print(len(orders), len(vehicles))
    return depot, orders, vehicles

def get_local_search_metaheuristic(local_mh):
    pick_local_search_metaheuristic = {
        "AUTOMATIC": routing_enums_pb2.LocalSearchMetaheuristic.AUTOMATIC,
        "GREEDY_DESCENT": routing_enums_pb2.LocalSearchMetaheuristic.GREEDY_DESCENT, 
        "GUIDED_LOCAL_SEARCH": routing_enums_pb2.LocalSearchMetaheuristic.GUIDED_LOCAL_SEARCH,
        "SIMULATED_ANNEALING": routing_enums_pb2.LocalSearchMetaheuristic.SIMULATED_ANNEALING, 
        "TABU_SEARCH" : routing_enums_pb2.LocalSearchMetaheuristic.TABU_SEARCH
    }
    return pick_local_search_metaheuristic[local_mh]

def get_first_sol_strategy(first_sol_strategy):
    pick_first_sol = {
        "AUTOMATIC" : routing_enums_pb2.FirstSolutionStrategy.AUTOMATIC, 
        "PATH_CHEAPEST_ARC" : routing_enums_pb2.FirstSolutionStrategy.PATH_CHEAPEST_ARC, 
        "PATH_MOST_CONSTRAINED_ARC" : routing_enums_pb2.FirstSolutionStrategy.PATH_MOST_CONSTRAINED_ARC, 
        "EVALUATOR_STRATEGY" : routing_enums_pb2.FirstSolutionStrategy.EVALUATOR_STRATEGY, 
        "SAVINGS" : routing_enums_pb2.FirstSolutionStrategy.SAVINGS, 
        "SWEEP" : routing_enums_pb2.FirstSolutionStrategy.SWEEP, 
        "CHRISTOFIDES" : routing_enums_pb2.FirstSolutionStrategy.CHRISTOFIDES, 
        "ALL_UNPERFORMED" : routing_enums_pb2.FirstSolutionStrategy.ALL_UNPERFORMED,
        "BEST_INSERTION" : routing_enums_pb2.FirstSolutionStrategy.BEST_INSERTION, 
        "PARALLEL_CHEAPEST_INSERTION" : routing_enums_pb2.FirstSolutionStrategy.PARALLEL_CHEAPEST_INSERTION, 
        "LOCAL_CHEAPEST_INSERTION" : routing_enums_pb2.FirstSolutionStrategy.LOCAL_CHEAPEST_INSERTION,
        "GLOBAL_CHEAPEST_ARC" : routing_enums_pb2.FirstSolutionStrategy.GLOBAL_CHEAPEST_ARC, 
        "LOCAL_CHEAPEST_ARC" : routing_enums_pb2.FirstSolutionStrategy.LOCAL_CHEAPEST_ARC, 
        "FIRST_UNBOUND_MIN_VALUE" : routing_enums_pb2.FirstSolutionStrategy.FIRST_UNBOUND_MIN_VALUE
    }

    return pick_first_sol[first_sol_strategy]

def vehicle_output_string(manager, routing, plan):
    """
    Return a string displaying the output of the routing instance and
    assignment (plan).
    
    Arguments: 
    ------------------
    routing: ortools.constraint_solver.pywrapcp.RoutingModel 
    plan: ortools.constraint_solver.pywrapcp.Assignment
        The returned solution from the solver.
    Returns:
        (string) plan_output: describing each vehicle's plan.
        (List) dropped: list of dropped orders.
    """
    print('The Objective Value is {0}'.format(plan.ObjectiveValue()))
    dropped = []
    for order in range(routing.Size()):
        if (plan.Value(routing.NextVar(order)) == order):
            dropped.append(str(order))

    deliveries_dimension = routing.GetDimensionOrDie('Deliveries')
    loads_dimension = routing.GetDimensionOrDie('Loads')
    time_dimension = routing.GetDimensionOrDie('Time')
    
    total_distance = 0
    plan_output = ''
    for route_number in range(routing.vehicles()):
        order = routing.Start(route_number)
        plan_output += 'Route {0}:'.format(route_number)
        if routing.IsEnd(plan.Value(routing.NextVar(order))):
            plan_output += ' Empty \n'
        else:
            route_distance = 0
            while not routing.IsEnd(order):
                load_var = loads_dimension.CumulVar(order)
                delivery_var = deliveries_dimension.CumulVar(order)
                time_var = time_dimension.CumulVar(order)
                node = manager.IndexToNode(order)
                plan_output += \
                    ' {node} Load({load}) Delivery({delivery}) Time({tmin}, {tmax}) -> '.format(
                        node=node,
                        delivery=plan.Value(delivery_var),
                        load=plan.Value(load_var),
                        tmin=str(timedelta(seconds=plan.Min(time_var))),
                        tmax=str(timedelta(seconds=plan.Max(time_var))))
                previous_order = order
                order = plan.Value(routing.NextVar(order))
                route_distance += routing.GetArcCostForVehicle(previous_order, order, 0)/1000

            plan_output += ' EndRoute {0}. \n'.format(route_number)
            plan_output += ' Distance Covered in Route{0}: {1}\n'.format(route_number, route_distance)
            total_distance += route_distance
            
        plan_output += ' Total Distance Travelled: {0}'.format(total_distance)
        plan_output += '\n'

    print('Total Distance: ', total_distance)
    return (plan_output, dropped, total_distance)