from django.conf import settings
import os
from core.models import *
import zipfile
from django.shortcuts import render
from django.http import HttpResponseRedirect
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .forms import RiderRewardsForm, OrderForm
from .models import Rider
from .serializers import *

@api_view(['GET'])
def getData(request):
    person = {'name': 'siddhartha'}
    return Response(person)

@api_view(['GET'])
def getRiderManagementMap(request):
    all_riders = Rider.objects.all()
    data = {}
    data['riders'] = [RiderSerializer(rider).data for rider in all_riders]
    return Response(data)

def upload(request):
    if request.method == 'POST' and request.FILES['myfile']:
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

    return render(request, 'core/upload.html')

def rider_rewards(request):
    if request.method=='POST':
        form = RiderRewardsForm(request.POST)
        if form.is_valid():
            return HttpResponseRedirect('rider_id')

    if request.method=='GET':
        form = RiderRewardsForm()
    
    return render(request, 'core/rider_rewards_form.html', {'form':form})

def order(request):
    if request.method=='POST':
        form = OrderForm(request.POST)
        if form.is_valid():
            return HttpResponseRedirect('')
    
    if request.method=='GET':
        form = OrderForm()

    return render(request, 'core/rider_rewards_form.html', {'form':form})


