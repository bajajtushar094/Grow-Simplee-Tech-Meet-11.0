import math
import random 
import numpy as np
from vehicle_routing.customers import Node, Order
from vehicle_routing.vehicle import Vehicle
from ortools.constraint_solver import routing_enums_pb2

def generate_locs(num_rows):
    lat = 31.156412
    lon = 121.271469

    result = []

    for _ in range(num_rows):
        dec_lat = random.random()/100
        dec_lon = random.random()/100

        result.append([lat + dec_lat, lon + dec_lon])
    
    return np.array(result)

def generate_coordinates(center_lat, center_long, radius=27000):
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

def generate_random_order(type=None):
    if type is None:
        type = np.random.choice([1, 2], size=1, p=[0.7, 0.3])

    return Order(1, generate_coordinates(12.9716, 77.5946), type)

def generate_random_problem(num_orders=50):
    depot = Node([12.9716, 77.5946], 0)
    orders = []
    vehicles = []

    for i in range(num_orders):
        orders.append(generate_random_order())
    
    num_vehicles = num_orders // 20
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