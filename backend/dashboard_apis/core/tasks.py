from celery import shared_task
from time import sleep
from utils.routing_util import vehicle_output_string
from utils.vehicle_routing.customers import Node
from utils.vehicle_routing.vehicle import Vehicle
from utils.vehicle_routing.vrp import VRP
from utils.vehicle_routing.customers import Order as OrderVRP
import pickle

@shared_task()
def solveVRP(vrp_instance):
    manager, routing, solution = vrp_instance.process_VRP()
    print(manager, routing, solution)
    return manager, routing, solution