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
    PickledModelObject.current_instance = vrp_instance
    PickledModelObject.save()
    for rider in all_riders:
        rider.rider_status = 'at warehouse'
        rider.current_trip_id = ''
        rider.save()
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
    Trip.objects.all().delete()
    routes = []
    for (i,route) in enumerate(data):
        temp=[]
        print(route)
        list_route = route.split(',')
        trip = Trip(orders = "", rider=all_riders[i], trip_status="ongoing", created_time=datetime.now())
        trip.save()
        order_ids=""
        for loc in list_route:
            if int(loc)==0:
                continue
            else:
                all_orders[int(loc)-1].trip = trip
                all_orders[int(loc)-1].rider = all_riders[i]
                all_orders[int(loc)-1].save()
                order_ids += f"{all_orders[int(loc)-1].order_id},"
                temp.append([all_orders[int(loc)-1].order_id,float(all_orders[int(loc)-1].latitude), float(all_orders[int(loc)-1].longitude)])
        order_ids=order_ids[0:len(order_ids)-1]
        trip.orders = order_ids
        trip.save()
        all_riders[i].current_trip_id = trip.id
        all_riders[i].rider_status = 'on trip'
        all_riders[i].save()
        routes.append(temp)

    return routes


@shared_task()
def solveVRPReroute(all_riders,all_orders,Order, PickledVRPInstance):
    PickledModelObject = PickledVRPInstance.objects.all()[len(PickledVRPInstance.objects.all())-1]
    vrp_instance= PickledModelObject.current_instance
    print(vrp_instance.orders)
    manager, routing, solution = vrp_instance.process_VRP(isReroute=True, rerouting_metaheuristic="AUTOMATIC", time_limit=20)
    data = []
    for rider in all_riders:
        rider.rider_status = 'at warehouse'
        rider.current_trip_id = ''
        rider.save()
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
    Trip.objects.all().delete()
    routes = []
    for (i,route) in enumerate(data):
        temp=[]
        print(route)
        list_route = route.split(',')
        trip = Trip(orders = "", rider=all_riders[i], trip_status="ongoing", created_time=datetime.now())
        trip.save()
        order_ids=""
        for loc in list_route:
            if int(loc)==0:
                continue
            else:
                all_orders[int(loc)-1].trip = trip
                all_orders[int(loc)-1].rider = all_riders[i]
                all_orders[int(loc)-1].save()
                order_ids += f"{all_orders[int(loc)-1].order_id},"
                temp.append([all_orders[int(loc)-1].order_id,float(all_orders[int(loc)-1].latitude), float(all_orders[int(loc)-1].longitude)])
        order_ids=order_ids[0:len(order_ids)-1]
        trip.orders = order_ids
        trip.save()
        all_riders[i].current_trip_id = trip.id
        all_riders[i].rider_status = 'on trip'
        all_riders[i].save()
        routes.append(temp)

    return routes