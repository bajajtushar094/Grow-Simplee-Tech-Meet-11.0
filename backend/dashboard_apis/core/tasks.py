from celery import shared_task
import copy
@shared_task()
def solveVRP(vrp_instance,all_riders,all_orders,Order,PickledVRPInstance):
    manager, routing, solution = vrp_instance.process_VRP()
    data = []
    PickledVRPInstance.current_instance=vrp_instance
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
                temp.append([float(all_orders[int(loc)-1].address.latitude), float(all_orders[int(loc)-1].address.longitude)])
        all_riders[i].delievery_orders = str(temp)
        all_riders[i].save()
        routes.append(temp)

    return routes


@shared_task()
def solveVRP(vrp_instance,all_riders,all_orders,Order):
    manager, routing, solution = vrp_instance.process_VRP(isReroute=True)
    data = []
    PickledVRPInstance.current_instance=vrp_instance
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
                temp.append([float(all_orders[int(loc)-1].address.latitude), float(all_orders[int(loc)-1].address.longitude)])
        all_riders[i].delievery_orders = str(temp)
        all_riders[i].save()
        routes.append(temp)

    return routes