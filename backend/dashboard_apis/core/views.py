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
from django.shortcuts import render
from django.http import HttpResponseRedirect, JsonResponse
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
from utils.populate_data import *
from utils.google_map import *
from rest_framework import permissions


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

        for i in range(len(all_orders)):
            if all_orders[i].delivery_action == "pickup":
                continue
            date_time_now = datetime.now().replace(tzinfo=utc)
            if date_time_now > all_orders[i].edd and all_orders[i].order_status == "undelivered":
                all_orders[i].delay_status = "delayed"
                all_orders[i].save()

        #data = {}
        #data["orders"] = [OrderSerializer(order).data for order in all_orders]
        #for i in range(len(data["orders"])):
        #    data["orders"][i]["rider"] = RiderSerializer(all_orders[i].rider).data

        #return Response(data)

        return Response(all_orders)


class getRiders(APIView):
    permission_class = [permissions.IsAuthenticated]
    def get(self, request, *args, **kwargs):
        all_riders = Rider.objects.all()
        data = {"riders": [RiderSerializer(rider).data for rider in all_riders]}
        for i in range(len(data['riders'])):
            data['riders'][i]['current_address'] = {
                'latitude':RiderSerializer(all_riders[i]).data['latitude'],
                'longitude':RiderSerializer(all_riders[i]).data['longitude'],
                'location':RiderSerializer(all_riders[i]).data['location'],
                'address_name':RiderSerializer(all_riders[i]).data['address_name'],
            }
            trip_id = data['riders'][i]['current_trip_id']
            if trip_id:
                trip = Trip.objects.get(pk=trip_id)
                data['riders'][i]['trip'] = TripSerializer(trip)  # with trip deserializer
                orders_id = trip['orders'].split(',')
                orders_completed = 0
                for j in range (len(orders_id)):
                    order = Order.objects.get(order_id=orders_id[i])
                    data['riders'][i]["orders"][j] = OrderSerializer(order).data
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
        rider = Rider.objects.get(id=rider_id)
        rider_serialized = RiderSerializer(rider).data
        return Response(rider_serialized)


class generateSolution(APIView):
    def get(self, request, *args, **kwargs):
        # TODO: Get the coordinates of the depot
        depot = Node([12.944013565497546, 77.69623411806606], 0)
        orders = []
        vehicles = []

        all_riders = Rider.objects.all()
        for rider in all_riders:
            vehicles.append(
                Vehicle(int(rider.bag_volume), start=depot, end=depot))

        all_orders = Order.objects.all()
        for order in all_orders:
            orders.append(OrderVRP(int(order.volume), [float(order.address.latitude), float(
                order.address.longitude)], 1 if order.delivery_action == "drop" else 2))
        # depot, orders, vehicles = helper.generate_random_problem(num_orders=20)
        vrp_instance = VRP(depot, orders, vehicles)
        manager, routing, solution = vrp_instance.process_VRP()

        plan_output, dropped = vehicle_output_string(
            manager, routing, solution)
        for route_number in range(routing.vehicles()):
            all_riders[route_number].delievery_orders = ''
            order = routing.Start(route_number)
            if routing.IsEnd(solution.Value(routing.NextVar(order))):
                all_riders[route_number].delievery_orders = ''
            else:
                while True:
                    node = manager.IndexToNode(order)
                    all_riders[route_number].delievery_orders += "," + \
                        str(node)
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
       vol.startProcess()
       return Response("camera feed started", status=status.HTTP_200_OK)


class binPacking(APIView):
    def get(self, request, *args, **kwargs):
        rider_id = kwargs['id']
        rider = Rider.objects.get(rider_id=rider_id)
        url = "http://localhost:4550"

        box = Packer(url, rider.bag_length, rider.bag_width, rider.bag_height)
        order_ids = rider.delievery_orders.split(",")[1:-1]
        for (i, order_id) in enumerate(order_ids):
            order = Order.objects.get(id=order_id)
            box.add_item(order_id, order.length,
                         order.width, order.height, i+1)

        data = box.pack()
        return Response(data)

class getGeoCode(APIView):
    def post(self, request, *args, **kwargs):
        address = request.data["address"]
        geocode = extract_lat_long_via_address(address)
        return Response(geocode, status=status.HTTP_200_OK)