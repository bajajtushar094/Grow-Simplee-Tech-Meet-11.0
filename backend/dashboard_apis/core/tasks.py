from celery import shared_task
import copy
import pickle
from .models import *
from datetime import datetime
@shared_task()
def solveVRP(all_riders,all_orders, Trip, Order, PickledVRPInstance):
    PickledModelObject = PickledVRPInstance.objects.all()[len(PickledVRPInstance.objects.all())-1]
    vrp_instance= PickledModelObject.current_instance
    manager, routing, solution = vrp_instance.process_VRP()
    data = []
    print(PickledModelObject.current_instance)
    # PickledModelObject.current_instance = vrp_instance
    # PickledModelObject.save()
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
    for (i, path) in enumerate(data):
            for node in path.split(","):
                if (node != "0"):
                    curr_order = Order.objects.get(id=int(node))
                    curr_order.rider_id = all_riders[i]
                    curr_order.save()
    routes = []
    for (i,route) in enumerate(data):
        temp=[]
        list_route = route.split(',')
        trip = Trip(orders = "", rider_id=all_riders[i].id, trip_status="ongoing", created_time=datetime.now())
        trip.save()
        order_ids=""
        for loc in list_route:
            if int(loc)==0:
                continue
            else:
                
                order_ids += f"{all_orders[int(loc)-1].order_id},"
                temp.append([all_orders[int(loc)-1].order_id,float(all_orders[int(loc)-1].latitude), float(all_orders[int(loc)-1].longitude)])
        order_ids=order_ids[0:len(order_ids)-1]
        trip.orders = order_ids
        trip.save()
        all_riders[i].delievery_orders = str(temp)
        all_riders[i].save()
        routes.append(temp)


    # list_riders = routes[0]

    # for (i, orders) in list_riders:
    #     for (j, order) in orders:
    #         trip = Trip(order_id = order[0], rider_id=all_riders[i].id, trip_status="upcoming", created_time=datetime.now())
    #         trip.save()
    return routes


@shared_task()
def solveVRPReroute(all_riders,all_orders):
    PickledModelObject = PickledVRPInstance.objects.all()[len(PickledVRPInstance.objects.all())-1]
    vrp_instance= PickledModelObject.current_instance
    
    manager, routing, solution = vrp_instance.process_VRP(isReroute=True)
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
    for (i, path) in enumerate(data):
            for node in path.split(","):
                if (node != "0"):
                    curr_order = Order.objects.get(id=int(node))
                    curr_order.rider_id = all_riders[i]
                    curr_order.save()
    routes = []
    for (i,route) in enumerate(data):
        temp=[]
        list_route = route.split(',')
        for loc in list_route:
            if int(loc)==0:
                continue
            else:
                temp.append([float(all_orders[int(loc)-1].latitude), float(all_orders[int(loc)-1].longitude)])
        all_riders[i].delievery_orders = str(temp)
        all_riders[i].save()
        routes.append(temp)

    return routes