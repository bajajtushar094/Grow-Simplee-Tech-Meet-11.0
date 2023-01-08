from django.db import models
from django.utils.translation import gettext_lazy as _
from .choices import *


# Create your models here.

class Address(models.Model):
    id: models.CharField(max_length=500,primary_key=True)
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
    order_id = models.CharField(max_length=500)
    rider_id = models.ForeignKey(Rider, null=True, on_delete=models.CASCADE)
    order_name = models.CharField(max_length=500,null=True)
    shape = models.CharField(max_length=50,null=True)
    volume = models.CharField(max_length=50)
    length = models.CharField(max_length=50)
    width = models.CharField(max_length=50)
    height = models.CharField(max_length=50)
    sku = models.CharField( max_length=50,null=True,blank=False)
    address_id = models.CharField(max_length=500)
    delievery_action = models.CharField(_('delievery action'), max_length=50, choices=DELIEVERY_ACTION)
    order_status = models.CharField(_('order status'), max_length=50, choices=ORDER_STATUS)
    edd = models.DateField(_('EDD date'))
    owner_id = models.ForeignKey(Owner, on_delete=models.CASCADE)

    def __str__(self):
        return self.order_name + self.order_id


