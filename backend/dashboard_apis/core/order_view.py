from django.conf import settings
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from .serializers import *

def order_detail_view(request,id):
    order = get_object_or_404(Order, id=id)
    img = "1/hi.jpeg"  #file name with id (will be removed)
    image_path = settings.STATIC_URL + 'images/'+img
    return render(request, 'index.html', {
        'order':order,
        'image_path':image_path
    })