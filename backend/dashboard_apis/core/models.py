from django.db import models
from django.utils.translation import gettext_lazy as _
from .choices import *
import os
from picklefield.fields import PickledObjectField

# Create your models here.


class Manager(models.Model):
    name = models.CharField(max_length=250)
    contact_number = models.CharField(max_length=500, null=True)
    latitude = models.CharField(max_length=50, null=True)
    longitude = models.CharField(max_length=50, null=True)
    location = models.CharField(max_length=500, null=True)

    def __str__(self):
        return self.name + str(self.id)


class Rider(models.Model):
    name = models.CharField(max_length=250)
    photoURL = models.CharField(max_length=250, null=True)
    contact_number = models.CharField(max_length=10)
    rider_status = models.CharField(
        _("filing form type"), max_length=50, choices=RIDER_STATUS
    )
    manager = models.ForeignKey(
        Manager, on_delete=models.CASCADE, null=True, blank=True
    )
    successful_deliveries = models.IntegerField(default=0)
    packages_delayed = models.IntegerField(default=0)
    current_trip_id = models.CharField(max_length=50, null=True)
    earnings = models.IntegerField(blank=True, null=True)
    bag_volume = models.FloatField(null=True)

    def __str__(self):
        return f"{self.name} + {self.id}"


class Bag(models.Model):
    length = models.FloatField(blank=True)
    width = models.FloatField(blank=True)
    height = models.FloatField(blank=True)
    name = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.name


class Trip(models.Model):
    rider = models.ForeignKey(
        Rider, on_delete=models.CASCADE, null=True, blank=True
    )
    bag = models.ForeignKey(
        Bag, on_delete=models.CASCADE, null=True, blank=True
    )
    orders = models.CharField(max_length=500, null=True, blank=True)
    start_time = models.DateTimeField(_("Start time"), blank=True, null=True)
    end_time = models.DateTimeField(_("End time"), blank=True, null=True)
    created_time = models.DateTimeField(_("Created time"), blank=True, null=True)
    trip_status = models.CharField(
        _("trip status"), max_length=50, choices=TRIP_STATUS, blank=True
    )
    etf = models.DateTimeField(_("ETF date"), blank=True, null=True)

    def __str__(self):
        return str(self.id)


class Order(models.Model):
    rider = models.ForeignKey(
        Rider, on_delete=models.CASCADE, null=True, blank=True
    )
    trip = models.ForeignKey(
        Trip, on_delete=models.CASCADE, null=True, blank=True
    )
    order_id = models.CharField(max_length=50, null=True)
    shape = models.CharField(max_length=50, null=True, blank=True)
    volume = models.FloatField(blank=True)
    length = models.FloatField(blank=True)
    width = models.FloatField(blank=True)
    height = models.FloatField(blank=True)
    sku = models.CharField(max_length=50, null=True, blank=True)
    delivery_action = models.CharField(
        _("delivery action"), max_length=50, choices=DELIVERY_ACTION, blank=True
    )
    order_status = models.CharField(
        _("order status"), max_length=50, choices=ORDER_STATUS, blank=True
    )
    edd = models.DateTimeField(_("EDD date"), blank=True, null=True)
    completed_time = models.DateTimeField(_("Completed Time"), blank=True, null=True)
    latitude = models.CharField(max_length=50, null=True)
    longitude = models.CharField(max_length=50, null=True)
    owner_name = models.CharField(max_length=500, null=True)
    contact_number = models.CharField(max_length=50, null=True)
    location = models.CharField(max_length=500, null=True)
    address_name = models.CharField(max_length=500, null=True)
    delay_status = models.CharField(max_length=50, null=True, default='not delayed')

    def __str__(self):
        return self.order_id



def get_upload_to(instance, filename):
    return os.path.join("media/", str(instance.order.order_id), filename)

class PickledVRPInstance(models.Model):
    current_instance = PickledObjectField()

    def __str__(self):
        return f"PickledVRPInstance"


class OrderImage(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, null=True)
    images = models.ImageField(upload_to="media/", blank=True)
