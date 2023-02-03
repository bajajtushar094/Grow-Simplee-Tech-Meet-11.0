from celery import shared_task

@shared_task()
def solveVRP(vrp_instance):
    manager, routing, solution = vrp_instance.process_VRP()
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