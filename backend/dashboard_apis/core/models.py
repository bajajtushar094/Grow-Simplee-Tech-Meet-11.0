from django.db import models
from django.utils.translation import gettext_lazy as _
from .choices import *
import os



# Create your models here.

class Address(models.Model):
    id: models.CharField(max_length=500)
    latitude: models.CharField(max_length=50)
    longitude: models.CharField(max_length=50)
    name: models.CharField(max_length=250)

    def __str__(self):
        return f'Address-{self.name}'

class Rider(models.Model):
    name = models.CharField(max_length=250)
    rider_id = models.CharField(max_length=500)
    contact_number = models.CharField(max_length=10)
    bag_volume = models.CharField(max_length=50)
    current_address= models.ForeignKey(Address, related_name="Current_Delievery_Address", on_delete=models.CASCADE)
    rider_status = models.CharField(_('filing form type'), max_length=50, choices=RIDER_STATUS)
    delievery_addresses = models.ManyToManyField(Address, related_name='Addresses_Assigned', blank=True) 
    manager_id = models.CharField(max_length=500)
    arrival_time = models.DateField( (_('arrival time')))
    departure_time = models.DateField((_('departure time')))

    def __str__(self):
        return f'{self.name} + {self.rider_id}'
    

class Owner(models.Model):
    owner_id = models.CharField(max_length=500)
    name = models.CharField(max_length=500,null=True)
    contact_number = models.CharField(max_length=500,null=True)
    address_id = models.CharField(max_length=500)

    def __str__(self):
        return self.name + self.address_id

class Order(models.Model):
    rider = models.ForeignKey(Rider, null=True, on_delete=models.CASCADE,blank= True)
    order_name = models.CharField(max_length=500,null=True,blank= True)
    shape = models.CharField(max_length=50,null=True,blank= True)
    volume = models.CharField(max_length=50,blank= True)
    length = models.CharField(max_length=50,blank= True)
    width = models.CharField(max_length=50,blank= True)
    height = models.CharField(max_length=50,blank= True)
    sku = models.CharField( max_length=50,null=True,blank= True)
    address = models.CharField(max_length=500,blank= True)
    delievery_action = models.CharField(_('delievery action'), max_length=50, choices=DELIEVERY_ACTION,blank= True)
    order_status = models.CharField(_('order status'), max_length=50, choices=ORDER_STATUS,blank= True)
    edd = models.DateField(_('EDD date'),blank= True)
    edd_time = models.TimeField(auto_now=False, auto_now_add=False)
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE,blank= True)
    image = models.FileField(blank=True)

    def __str__(self):
        return self.order_name 

def get_upload_to(instance, filename):
    path = 'images/'
    format = instance.id + instance.file_extension
    return os.path.join(path, format)

class OrderImage(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    images = models.FileField(upload_to=get_upload_to, blank=True)



