from django.conf import settings
from utils.bin_packing.packing import Packer
import os
import json
from utils.routing_util import vehicle_output_string
from utils.vehicle_routing.customers import Node
from utils.vehicle_routing.vehicle import Vehicle
from utils.vehicle_routing.vrp import VRP
from utils.vehicle_routing.customers import Order as OrderVRP
from core.models import *
import zipfile
from celery.result import AsyncResult
from .choices import *
from django.shortcuts import render
from django.http import HttpResponseRedirect, JsonResponse, HttpResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from .forms import RiderRewardsForm, OrderForm
from .models import Rider
from .serializers import *
from datetime import datetime
import pytz
from rest_framework import status
from core.tasks import solveVRP, solveVRPReroute
import pickle
from volume_estimation.cuboid import VolumeCalc
from utils.populate_data import *
from utils.google_map import *
from rest_framework import permissions
import pandas as pd
from shapely.geometry import Point, LineString
import geopandas as gpd
from django.core.files.storage import default_storage
import base64
from datetime import datetime

url = "http://localhost:8000/"

class getRiderManagementMap(APIView):
    permission_class = [permissions.IsAuthenticated]
    def get(self, request, *args, **kwargs):
        all_riders = Rider.objects.all()
        data = {}
        data["riders"] = [RiderSerializer(rider).data for rider in all_riders]
        return Response(data)

    def post(self, request, *args, **kwargs):
        serializer = RiderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class rider_rewards(APIView):
#    def get(self, request, *args, **kwargs):
#        rider_rewards_list = RiderRewards.objects.all()
#        data = {}
#        data["riders"] = [
#            RiderRewardsSerializer(rider).data for rider in rider_rewards_list
#        ]
#        return Response(data)

#    def post(self, request, *args, **kwargs):
#        serializer = RiderRewardsSerializer(data=request.data)
#        if serializer.is_valid():
#            serializer.save()
#            return Response(serializer.data, status=status.HTTP_201_CREATED)
#        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def modify_input_for_multiple_files(image, order_record):
    dict = {}
    dict["images"] = image
    dict["order"] = order_record.id
    print(dict)
    return dict


# dashboard APIS
class populateData(APIView):
    def get(self, request, *args, **kwargs):
        populate_riders()
        populate_order()
        return Response(True)


class getOrders(APIView):
    permission_class = [permissions.IsAuthenticated]
    def get(self, request, *args, **kwargs):
        utc = pytz.UTC

        all_orders = Order.objects.all()
        data = {}
        data["orders"] = []

        for i in range(len(all_orders)):
            # if all_orders[i].delivery_action == "pickup":
            #     continue
            date_time_now = datetime.now().replace(tzinfo=utc)
            if date_time_now > all_orders[i].edd and all_orders[i].order_status == "undelivered":
                all_orders[i].delay_status = "delayed"
                all_orders[i].save()
            data['orders'].append(OrderSerializer(all_orders[i]).data)

        #data = {}
        #data["orders"] = [OrderSerializer(order).data for order in all_orders]
        #for i in range(len(data["orders"])):
        #    data["orders"][i]["rider"] = RiderSerializer(all_orders[i].rider).data

        #return Response(data)

        return Response(data)


class getRiders(APIView):
    permission_class = [permissions.IsAuthenticated]
    def get(self, request, *args, **kwargs):
        all_riders = Rider.objects.all()
        data = {"riders": [RiderSerializer(rider).data for rider in all_riders]}
        for i in range(len(data['riders'])):
            # data['riders'][i]['current_address'] = {
            #     'latitude':RiderSerializer(all_riders[i]).data['latitude'],
            #     'longitude':RiderSerializer(all_riders[i]).data['longitude'],
            #     'location':RiderSerializer(all_riders[i]).data['location'],
            #     'address_name':RiderSerializer(all_riders[i]).data['address_name'],
            # }
            trip_id = data['riders'][i]['current_trip_id']

            if trip_id:
                trip = Trip.objects.get(pk=trip_id)
                data['riders'][i]['trip'] = TripSerializer(trip).data  # with trip deserializer
                orders_id = trip.orders.split(',')
                orders_completed = 0
                data['riders'][i]["orders"] = []
                for j in range (len(orders_id)):
                    order = Order.objects.get(order_id=int(orders_id[j]))
                    data['riders'][i]["orders"].append(OrderSerializer(order).data)
                    if order.order_status == 'delivered' or order.order_status == 'failed':
                        orders_completed = orders_completed + 1
                current_order = Order.objects.get(order_id=orders_id[orders_completed-1])
                data['riders'][i]['current_order'] = OrderSerializer(current_order).data
                if len(orders_id) == 1:
                    data['riders'][i]['progress'] = "100"
                else:
                    data['riders'][i]['progress'] = orders_completed / \
                        (len(orders_id)) * 100
        return Response(data)


class cancelOrder(APIView):  # should not be needed
    def post(self, request, *args, **kwargs):
        order_id = request.data["order_id"]
        order = Order.objects.get(order_id=order_id)
        order.order_status = "failed"
        #rider_orders = order.rider.delievery_orders.split(",")
        #rider_orders.remove(str(order_id))
        order_rider = Rider.objects.get(rider_id=order.rider.rider_id)
        # print(rider_orders)
        # print(order_rider)
        #order_rider.delievery_orders = ",".join(rider_orders)
        #order.rider.delievery_orders = ",".join(rider_orders)
        # print(order_rider.delievery_orders)
        # print(order.rider.delievery_orders)
        order.save()
        #order_rider.save()
        return Response(OrderSerializer(order).data)


class updateOrder(APIView):

    def post(self, request, *args, **kwargs):
        order_id = request.data["order_id"]
        isDelivered = request.data["is_delivered"]
        isFailed = request.data["is_failed"]
        order = Order.objects.get(order_id=int(order_id))
        if isFailed == 'true':
            order.order_status = "failed"
        elif isDelivered == 'true':
            order.order_status = 'delivered'
        order.save()
        return Response(OrderSerializer(order).data)

class updateTrip(APIView):

    def post(self, request, *args, **kwargs):
        trip_id = request.data["trip_id"]
        trip_status = request.data["trip_status"]
        trip = Trip.objects.get(id=trip_id)
        trip.trip_status = trip_status
        trip.save()

        return Response('success')



class addDynamicPickup(APIView):
    def post(self, request, *args, **kwargs):
        volume = request.data["volume"]
        latitude = request.data["latitude"]
        longitude = request.data["longitude"]
        location = request.data["location"]
        name = request.data["name"]
        # address = Address(latitude=latitude, longitude=longitude,
        #                   location=location, name=name)
        # address.save()
        order = Order(order_name=name, volume=volume,
                      latitude=latitude, longitude=longitude, location=location, delivery_action='pickup')
        order.save()
        return Response(OrderSerializer(order).data)


class getBags(APIView):
    def get(self, request, *args, **kwargs):
        all_bags = Bag.objects.all()
        data = {}
        data["bags"] = [BagSerializer(bag).data for bag in all_bags]
        return Response(data)

class getManager(APIView):
    # permission_classes = (IsAuthenticated, )
    def get(self, request, *args, **kwargs):
        manager = Manager.objects.all()
        data = {}
        print(manager[0].__dict__)
        data['manager'] = [ManagerSerializer(man).data for man in manager]
        return Response(data)

class getUpcomingCount(APIView):
    # permission_classes = (IsAuthenticated, )
    def get(self, request, *args, **kwargs):
        # date = datetime.datetime.now()
        orders_upcoming = Order.objects.filter(order_status = "undelivered")
        orders_delivered = Order.objects.filter(order_status = "delivered")
        orders_error = Order.objects.filter(order_status = "failed")
        data = {}
        # print(orders[0].__dict__)
        data['Upcoming Count'] = len([OrderSerializer(man).data for man in orders_upcoming])
        data['Delivered Count'] = len([OrderSerializer(man).data for man in orders_delivered])
        data['Error Count'] = len([OrderSerializer(man).data for man in orders_error])
        return Response(data)


class countRiders(APIView):
    def get(self, request, *args, **kwargs):
        riders = Rider.objects.filter(rider_status = "delayed")
        data = {}
        data['count'] = len([RiderSerializer(rider).data for rider in riders])
        return Response(data)



class getRiderOrders(APIView):
    def get(self, request, *args, **kwargs):
        rider_id = kwargs['id']
        rider = Rider.objects.get(id=rider_id)
        orders = rider.order_set.all()
        orders_serialized = [OrderSerializer(o).data for o in orders]
        return Response(orders_serialized)


class getRiderById(APIView):
    def get(self, request, *args, **kwargs):
        rider_id = kwargs['id']
        rider = Rider.objects.get(id=int(rider_id))
        rider_serialized = RiderSerializer(rider).data
        return Response(rider_serialized)


class getTripById(APIView):
    def get(self, request, *args, **kwargs):
        trip_id = kwargs['id']
        trip = Trip.objects.get(id=trip_id)
        orders_id = trip.orders.split(',')
        print(orders_id)
        #trip_serialized = TripSerializer(Trip).data
        #trip_serialized["order_objects"] = []
        data = []
        for j in range(len(orders_id)):
            order = Order.objects.get(order_id=orders_id[j])
            #trip_serialized["order_objects"].append(OrderSerializer(order).data)
            data.append(OrderSerializer(order).data)

        return Response(data)



class startButton(APIView):
    def get(self, request, *args, **kwargs):
        vol = VolumeCalc()
        vol.startProcess()
        base_path = os.getcwd()
        folderPath = os.path.join(base_path, 'static', 'folder1')
        folderExist = os.path.exists(folderPath)
        data = {}
        data['status']='Unsuccessful'
        data['folder']=None
        data['howManyFolders']=0
        if folderExist:
            data['status']='Successful'
            data['folder']='1'
            data['howManyFolders']=len(next(os.walk(os.getcwd()))[1])
            return Response(data, status=status.HTTP_200_OK)
        return Response(data, status=status.HTTP_204_NO_CONTENT)


class getFolder(APIView):
    def get(self, request, *args, **kwargs):
        folderNumber = kwargs['folder']
        print(folderNumber)
        base_path = os.getcwd()
        folderPath = os.path.join(base_path, 'static', 'folder')+folderNumber
        with open(os.path.join(folderPath, 'details.json'), "r") as file:
            file_data = json.load(file)
        data={}
        data['details']=file_data
        print(file_data)
        return Response(data, status=status.HTTP_200_OK)


class binPacking(APIView):
    def get(self, request, *args, **kwargs):
        rider_id = kwargs['id']
        rider = Rider.objects.get(id=rider_id)
        url = "http://localhost:4550"
        trip = Trip.objects.get(id=rider.current_trip_id)
        box = Packer(url, trip.bag.length, trip.bag.width, trip.bag.height)
        order_ids = trip.orders.split(",")
        for (i, order_id) in enumerate(order_ids):
            order = Order.objects.get(order_id=order_id)
            box.add_item(int(order_id), order.length,
                         order.width, order.height, i+1)

        data = box.pack()
        return Response(data)

class getGeoCode(APIView):
    def post(self, request, *args, **kwargs):
        address = request.data["address"]
        geocode = extract_lat_long_via_address(address)
        return Response(geocode, status=status.HTTP_200_OK)


class demo(APIView):
    def post(self, request, *args, **kwargs):
        print(request.FILES)
        file = request.FILES['file']
        file_name = default_storage.save(file.name, file)
        file_url = default_storage.url(file_name)
        dataframe = pd.read_excel(file_url[1:])
        depot_coordinates = (12.944013565497546, 77.69623411806606)
        depot = Node([depot_coordinates[0], depot_coordinates[1]], 0)
        coordinates = []
        awbs = []
        orders = []
        vehicles = []
        for index, row in dataframe.iterrows():
            address = row['address']
            awb = row['AWB']
            name = row['names']
            product_id = row['product_id']
            edd = row['EDD']
            geocode = extract_lat_long_via_address(address)
            if geocode[0] == None:
                continue
            coordinates.append(geocode)
            awbs.append(awb)
            orders.append(OrderVRP(1, [geocode[0], geocode[1]], 1, AWB=awb))
            print(name, end=": ")
            print(geocode)
            if index==1:
                break
       
        for i in range(int(len(orders)/30) + 1):
            vehicles.append(Vehicle(len(orders), start=depot, end=depot))

        vrp_instance = VRP(depot, orders, vehicles)
        manager, routing, solution = vrp_instance.process_VRP()

        routes = []
        routes_with_order = []

        for route_number in range(routing.vehicles()):
            route = []
            route_coords = []
            order = routing.Start(route_number)
            if routing.IsEnd(solution.Value(routing.NextVar(order))):
                continue
            else:
                while True:
                    node = manager.IndexToNode(order)
                    if (node != 0):
                        route.append(coordinates[node-1])
                        route_coords.append([awbs[node-1], coordinates[node-1]])
                    else:
                        route.append(depot_coordinates)

                    if routing.IsEnd(order):
                        break
                    order = solution.Value(routing.NextVar(order))
                routes.append(route)
                routes_with_order.append(route_coords)

        geo_routes = []
        geo_routes_map = []
        data = pd.DataFrame({'Route': [str(i+1) for i in range(len(routes))]})
        #http://router.project-osrm.org/route/v1/driving/77.586607,12.909694;77.652492,12.91763?overview=full&geometries=geojson
        osrm_url_base = "https://routing.openstreetmap.de/routed-bike/route/v1/driving/"
        for route in routes:
            points_list = []
            for point in route:
                points_list.append(str(point[1])  + "," + str(point[0]))
            osrm_url = osrm_url_base + ";".join(points_list) + "?overview=full&geometries=geojson"
            print(osrm_url)
            r = requests.get(osrm_url)
            t = json.loads(r.text)
            coordinates = t['routes'][0]['geometry']['coordinates']
            points_list = []
            points_list_map = []
            for point in coordinates:
                points_list.append(Point(point[0], point[1]))
                points_list_map.append([point[0], point[1]])
            geo_routes.append(LineString(points_list))
            geo_routes_map.append(points_list_map)
        
        routes_data_map = pd.DataFrame({'S. No.': [str(i+1) for i in range(len(geo_routes_map))], 'Route': geo_routes_map})
        routes_data_map.to_csv('all_routes_map.csv', index=False)

        routes_data = pd.DataFrame({'S. No.': [str(i+1) for i in range(len(routes_with_order))], 'Route': routes_with_order})
        routes_data.to_csv('all_routes.csv', index=False)

        myGDF = gpd.GeoDataFrame(data, geometry=geo_routes)
        myGDF.to_file(filename='myshapefile', driver='ESRI Shapefile')

        vrp_instance.city_graph.city.plot(facecolor="lightgrey", edgecolor="grey", linewidth=0.3)
        vrp_instance.vehicle_output_plot()

        filenames = ["myshapefile/myshapefile.shp", "all_routes_map.csv", "all_routes.csv", "static/Routes4.png"]
        
        with zipfile.ZipFile('solution.zip', 'w') as f:
            for filename in filenames:
                f.write(filename)
        

        with open('solution.zip', 'rb') as file:
            resp = HttpResponse(base64.b64encode(file.read()))
        resp['Content-Disposition'] = 'attachment; filename=solution.zip'
        resp['Content-Type'] = 'application/zip'

        return resp
    
class demoPickup(APIView):
    def post(self, request, *args, **kwargs):
        print("Pickup file received")
        print(request.FILES)
        file = request.FILES['file']
        file_name = default_storage.save(file.name, file)
        file_url = default_storage.url(file_name)
        return Response("Pickup file downloaded on backend")


class generateInitialSolution(APIView):
    def get(self, request, *args, **kwargs):
        # TODO: Get the coordinates of the depot
        depot = Node([12.944013565497546, 77.69623411806606], 0)
        orders = []
        vehicles = []

        all_riders = Rider.objects.all()
        for rider in all_riders:
            vehicles.append(Vehicle(int(100), start=depot, end=depot))
        
        all_orders = Order.objects.all()
        for order in all_orders:
            orders.append(OrderVRP(100, [float(order.latitude), float(order.longitude)], 1 if order.delivery_action == "drop" else 2))
        # depot, orders, vehicles = helper.generate_random_problem(num_orders=20)
        vrp_instance = VRP(depot, orders, vehicles)
        pick_vrp =  PickledVRPInstance(current_instance=vrp_instance)
        pick_vrp.save()
        # manager, routing, solution = vrp_instance.process_VRP()
        dct={"all_riders":all_riders,"all_orders":all_orders,"Trip":Trip,"Order":Order,"PickledVRPInstance":PickledVRPInstance}
        sol=solveVRP.apply_async(kwargs=dct, serializer="pickle")
        print(sol.task_id)
        return Response(sol.task_id)

class checkCeleryStatus(APIView):
    def get(self,request,*args,**kwargs):
        task_id = kwargs['task_id']
        res = AsyncResult(task_id).status
        return Response(res)

class getResultCelery(APIView):
    def get(self,request,*args,**kwargs):
        task_id = kwargs['task_id']
        res = AsyncResult(task_id)
        routes = res.get()
        return Response(routes)


class generateRerouteSolution(APIView):
    def get(self, request, *args, **kwargs):
        all_riders = Rider.objects.all()
        all_orders = Order.objects.all()
        dct={"all_riders":all_riders,"all_orders":all_orders,"Order":Order,"PickledVRPInstance":PickledVRPInstance}
        sol=solveVRPReroute.apply_async(kwargs=dct, serializer="pickle")
        print(sol.task_id)
        return Response(sol.task_id)

class getRiderLocations(APIView):
    def get(self, request, *args, **kwargs):
        riders = Rider.objects.all()
        trip_ids = [RiderSerializer(rider).data['current_trip_id'] for rider in riders]
        locs = []
        for trip_id in trip_ids:
            print("Trip_id = ", trip_id)
            trip_db = Trip.objects.get(id = int(trip_id))
            order_ids = TripSerializer(trip_db).data['orders']
            print(order_ids)
            order_arr = order_ids.split(',')
            print("Array of order ids is:", order_arr)
            for order in order_arr: 
                order_db = Order.objects.get(order_id = order)
                location = [OrderSerializer(order_db).data['latitude'], OrderSerializer(order_db).data['longitude']]
                print(location)
                if location not in locs:
                    locs.append(location)
        print(locs)
        data = {}
        data['locations'] = locs
        return Response(data)
    
class getRidersPaginate(APIView):
    def get(self, request, *args, **kwargs):
        # print(request.__dict__)
        lim = kwargs["limit"]
        off = kwargs["offset"]
        riders = Rider.objects.all()[off: off+lim]
        rider_data = [RiderSerializer(rider).data for rider in riders]
        data = {}
        data["next"] = f"{url}/core/pagination/rider/{lim}/{off+lim}"
        data["riders"] = rider_data
        return Response(data)
    
class getOrdersPaginate(APIView):
    def get(self, request, *args, **kwargs):
        # print(request.__dict__)
        lim = kwargs["limit"]
        off = kwargs["offset"]
        orders = Order.objects.all()[off: off+lim]
        order_data = [OrderSerializer(rider).data for rider in orders]
        data = {}
        data["next"] = f"{url}/core/pagination/order/{lim}/{off+lim}"
        data["riders"] = order_data
        return Response(data)
    


