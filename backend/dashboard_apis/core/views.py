from django.conf import settings
import os
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

class rider_rewards(APIView):
    def get(self, request, *args, **kwargs):
        rider_rewards_list = RiderRewards.objects.all()
        data = {}
        data['riders'] = [RiderRewardsSerializer(rider).data for rider in rider_rewards_list]
        # serializer = RiderRewardsSerializer(rider_rewards_list, many=True)
        return Response(data)

class upload(APIView):
    def get(self, request, *args, **kwargs):
        return render(request, 'core/upload.html')

    def post(self, request, *args, **kwargs):
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

class getBags(APIView):
    def get(self, request, *args, **kwargs):
        all_bags = Bags.objects.all()
        data = {}
        data['bags'] = [RiderSerializer(bag).data for bag in all_bags]
        return Response(data)

