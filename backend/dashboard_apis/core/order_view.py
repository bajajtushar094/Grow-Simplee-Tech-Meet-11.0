from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import status
from django.shortcuts import get_object_or_404
from .serializers import *
from rest_framework.response import Response
from datetime import date


def dummyFunction(order_images):
    data = {'volume': '300', 'length': '30', 'width': '20', 'height': '6'}
    return data

class order_image_update(APIView):
    def get(self, request, *args, **kwargs):
        id = kwargs['id']
        order = get_object_or_404(Order, order_name=id)
        attributes_calculated = dummyFunction
        data = OrderSerializer(instance=order, data=attributes_calculated)
        if data.is_valid():
            data.save()
            return Response(data.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

class get_all_orders(APIView):
    def get(self, request, *args, **kwargs):  
        orders = Order.objects.all()  
        serializers = OrderSerializer(orders, many=True)  
        return Response({'status': 'success', "orders":serializers.data}, status=status.HTTP_200_OK)

class order_detail(APIView):
    def get(self, request, *args, **kwargs):
        id = kwargs['id']
        order = get_object_or_404(Order, order_name=id)
        serializers = OrderSerializer(instance=order, many=False)
        if serializers.is_valid():
            return Response(serializers.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
        

    

    
