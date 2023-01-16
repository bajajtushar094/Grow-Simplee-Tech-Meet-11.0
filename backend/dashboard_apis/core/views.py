from django.conf import settings
import os
from core.models import Order, OrderImage
import zipfile
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view(['GET'])
def getData(request):
    person = {'name': 'siddhartha'}
    return Response(person)


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
