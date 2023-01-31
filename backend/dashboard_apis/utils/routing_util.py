import math
import random 
import numpy as np

from vehicle_routing.vrp import VRP 
import vehicle_routing.helper as helper
from datetime import timedelta

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
    plan_output = ''

    for route_number in range(routing.vehicles()):
        order = routing.Start(route_number)
        plan_output += 'Route {0}:'.format(route_number)
        if routing.IsEnd(plan.Value(routing.NextVar(order))):
            plan_output += ' Empty \n'
        else:
            while True:
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

                if routing.IsEnd(order):
                    plan_output += ' EndRoute {0}. \n'.format(route_number)
                    break
                order = plan.Value(routing.NextVar(order))
        plan_output += '\n'

    return (plan_output, dropped)
    
if __name__ == '__main__':
    # depot = Node([0, 0], 0)
    # orders = [Order(1, [0, 1], 1), Order(1, [1, 0], 1), Order(1, [1, 4], 1), Order(1, [2, 5], 1), Order(1, [6, 9], 1), 
    #         Order(1, [5, 3], 2), Order(1, [3, 1], 2), Order(1, [1, 6], 2), Order(1, [-5, -3], 1), Order(1, [-1, -4], 1), Order(1, [-3, 2], 1)]
    # vehicles = [Vehicle(6, start=depot, end=depot), Vehicle(6, start=depot, end=depot), Vehicle(6, start=depot, end=depot), Vehicle(6, start=depot, end=depot)]
    # vehicles = [Vehicle(3, start=depot, end=depot)]
    
    depot, orders, vehicles = helper.generate_random_problem(num_orders=20)

    vrp_instance = VRP(depot, orders, vehicles)
    manager, routing, solution = vrp_instance.process_VRP()

    plan_output, dropped = vehicle_output_string(manager, routing, solution)
    print(plan_output)
    print('dropped nodes: ' + ', '.join(dropped))
    # vrp_instance.vehicle_output_plot()

    vrp_instance.vehicle_output_plot(block=False)
    routes_list = vrp_instance.get_routes()
    
    for vehicle_idx, route in routes_list.items():
        if route == []:
            continue
        for i in range(3):
            route.next_node(3)

    for i in range(5):
        vrp_instance.add_dynamic_order(helper.generate_random_order())
    
    manager, routing, solution = vrp_instance.process_VRP(isReroute=True, rerouting_metaheuristic="GUIDED_LOCAL_SEARCH", time_limit=20)
    vrp_instance.vehicle_output_plot()
    plan_output, dropped = vehicle_output_string(manager, routing, solution)
    print(plan_output)
    print('dropped nodes: ' + ', '.join(dropped))



    