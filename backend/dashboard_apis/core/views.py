from django.conf import settings
import os
from utils.routing_util import vehicle_output_string
from utils.vehicle_routing.customers import Node
from utils.vehicle_routing.vehicle import Vehicle
from utils.vehicle_routing.vrp import VRP
from utils.vehicle_routing.customers import Order as OrderVRP
from core.models import *
import zipfile
from django.shortcuts import render
from django.http import HttpResponseRedirect
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from .forms import RiderRewardsForm, OrderForm
from .models import Rider
from .serializers import *
from datetime import datetime
import pytz
from rest_framework import status
from volume_estimation.cuboid import VolumeCalc


class getData(APIView):
    def get(self, request, *args, **kwargs):
        person = {'name': 'siddhartha'}
        return Response(person)

class getRiderManagementMap(APIView):
    def get(self, request, *args, **kwargs):
        all_riders = Rider.objects.all()
        data = {}
        data['riders'] = [RiderSerializer(rider).data for rider in all_riders]
        return Response(data)
    
    def post(self, request, *args, **kwargs):
        serializer = RiderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class rider_rewards(APIView):
    def get(self, request, *args, **kwargs):
        rider_rewards_list = RiderRewards.objects.all()
        data = {}
        data['riders'] = [RiderRewardsSerializer(rider).data for rider in rider_rewards_list]
        return Response(data)
    
    def post(self, request, *args, **kwargs):
        serializer = RiderRewardsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class upload(APIView):
    def get(self, request, *args, **kwargs):
        return render(request, 'core/upload.html')

    def post(self, request, *args, **kwargs):
        print(request.FILES)
        if request.FILES['myfile']:
            my_file = request.FILES['myfile']
            zf = zipfile.ZipFile(my_file)

            with zipfile.ZipFile(my_file, 'r') as zip_ref:
                zip_ref.extractall(
                    path=settings.MEDIA_ROOT+'/')

            top_folders = {item.split('/')[0] for item in zf.namelist()}

            for folder in top_folders:
                # create a record for the order below
                order_record = Order(order_name=folder)
                order_record.save()
                print(order_record.order_name)

                for filename in os.listdir(os.path.join(settings.MEDIA_ROOT, folder)):
                    # f = os.path.join(os.path.join(settings.MEDIA_ROOT, folder), filename)
                    # create a record for the image file below:
                    order_image_record = OrderImage(order=order_record)
                    order_image_record.images.name = folder + '/' + filename
                    order_image_record.save()
                    # print(order_image_record.images)

            return render(request, 'core/upload.html', {
                'parent_folder_path': my_file.name,
                'uploaded_folders': top_folders
            })
        else:
            return render(request, 'core/upload.html')

class order(APIView):
    def get(self, request, *args, **kwargs):
        form = OrderForm()
        return render(request, 'core/rider_rewards_form.html', {'form':form})

    def post(self, request, *args, **kwargs):
        form = OrderForm(request.POST, request.FILES)
        if form.is_valid():
            return HttpResponseRedirect('')
        return render(request, 'core/rider_rewards_form.html', {'form':form})

#dashboard APIS
class getOrder(APIView):
    def get(self, request, *args, **kwargs):
        utc=pytz.UTC

        all_orders = Order.objects.all()

        for i in range(len(all_orders)):
            date_time_now = datetime.now().replace(tzinfo=utc)
            if date_time_now > all_orders[i].edd:
                if all_orders[i].order_status == 'undelivered':
                    all_orders[i].order_status = 'delayed'
                    all_orders[i].save()

        data = {}
        data['orders'] = [OrderSerializer(order).data for order in all_orders]
        for i in range(len(data['orders'])):
            data['orders'][i]['rider'] = RiderSerializer(all_orders[i].rider).data
            data['orders'][i]['address'] = AddressSerializer(all_orders[i].address).data
        return Response(data)

class getRider(APIView):
    def get(self, request, *args, **kwargs):
        all_riders = Rider.objects.all()
        data = {}
        data['riders'] = [RiderSerializer(rider).data for rider in all_riders]
        return Response(data)

class cancelOrder(APIView):
    def post(self, request, *args, **kwargs):
        order_id = request.data['order_id']
        order = Order.objects.get(id=order_id)
        order.order_status = 'failed'
        rider_orders = order.rider.delievery_orders.split(",")
        rider_orders.remove(str(order_id))
        order_rider = Rider.objects.get(rider_id=order.rider.rider_id)
        print(rider_orders)
        print(order_rider)
        order_rider.delievery_orders = ",".join(rider_orders)
        order.rider.delievery_orders = ",".join(rider_orders)
        print(order_rider.delievery_orders)
        print(order.rider.delievery_orders)
        order.save()
        order_rider.save()
        return Response(OrderSerializer(order).data)

class addDynamicPickup(APIView):
    def post(self, request, *args, **kwargs):
        rider_id = request.data['rider_id']
        rider = Rider.objects.get(id=rider_id)
        delivery_orders = request.data['route']
        rider.delievery_orders = delivery_orders
        rider.save()

class getBags(APIView):
    def get(self, request, *args, **kwargs):
        all_bags = Bags.objects.all()
        data = {}
        data['bags'] = [RiderSerializer(bag).data for bag in all_bags]
        return Response(data)

class getRiderOrders(APIView):
    def get(self, request, *args, **kwargs):
        rider_id = kwargs['id']
        rider = Rider.objects.get(id=rider_id)
        orders = rider.order_set.all()
        orders_serialized = [OrderSerializer(o).data for o in orders]
        return Response(orders_serialized)
        

        

class generateSolution(APIView):
    def get(self, request, *args, **kwargs):
        # TODO: Get the coordinates of the depot
        depot = Node([12.944013565497546, 77.69623411806606], 0)
        orders = []
        vehicles = []

        all_riders = Rider.objects.all()
        for rider in all_riders:
            vehicles.append(Vehicle(int(rider.bag_volume), start=depot, end=depot))
        
        all_orders = Order.objects.all()
        for order in all_orders:
            orders.append(OrderVRP(int(order.volume), [float(order.address.latitude), float(order.address.longitude)], 1 if order.delivery_action == "drop" else 2))
        # depot, orders, vehicles = helper.generate_random_problem(num_orders=20)
        vrp_instance = VRP(depot, orders, vehicles)
        manager, routing, solution = vrp_instance.process_VRP()

        plan_output, dropped = vehicle_output_string(manager, routing, solution)
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
        return Response(plan_output)


class startButton(APIView):
    def get(self, request, *args, **kwargs):
        vol = VolumeCalc()        
        return Response("camera feed started", status=status.HTTP_200_OK)
