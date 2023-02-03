from celery import shared_task
from time import sleep
from utils.routing_util import vehicle_output_string
from utils.vehicle_routing.customers import Node
from utils.vehicle_routing.vehicle import Vehicle
from utils.vehicle_routing.vrp import VRP
from utils.vehicle_routing.customers import Order as OrderVRP
from core.models import Order, Rider
import pickle

@shared_task()
def solveVRP(vrp_instance):
    manager, routing, solution = vrp_instance.process_VRP()
    all_riders = Rider.objects.all()
    data = []
    for route_number in range(routing.vehicles()):
        path = ''
        order = routing.Start(route_number)
        if routing.IsEnd(solution.Value(routing.NextVar(order))):
            path = ''
        else:
            while True:
                node = manager.IndexToNode(order)
                path += "," + str(node)

                if routing.IsEnd(order):
                    break
                order = solution.Value(routing.NextVar(order))

        if path != '':
            path = path[1:]
        
        data.append(path)
    return data
    for route_number in range(routing.vehicles()):
        all_riders[route_number].delievery_orders = ''
        order = routing.Start(route_number)
        if routing.IsEnd(solution.Value(routing.NextVar(order))):
            all_riders[route_number].delievery_orders = ''
        else:
            while True:
                node = manager.IndexToNode(order)
                all_riders[route_number].delievery_orders += "," + str(node)
                if (node != 0):
                    curr_order = Order.objects.get(id=int(node))
                    curr_order.rider = all_riders[route_number]
                    curr_order.save()

                if routing.IsEnd(order):
                    break
                order = solution.Value(routing.NextVar(order))

        if all_riders[route_number].delievery_orders != '':
            all_riders[route_number].delievery_orders = all_riders[route_number].delievery_orders[1:]

        all_riders[route_number].save()
    return True