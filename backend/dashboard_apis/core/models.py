from django.db import models
from django.utils.translation import gettext_lazy as _
from .choices import *
import os


# Create your models here.


class Manager(models.Model):
    id = models.CharField(max_length=500, primary_key=True)
    name = models.CharField(max_length=250)
    contact_number = models.CharField(max_length=500, null=True)
    address_id = models.CharField(max_length=500)

    def __str__(self):
        return self.name + self.id


class Address(models.Model):
    id = models.CharField(max_length=500, primary_key=True)
    latitude = models.CharField(max_length=50, null=True)
    longitude = models.CharField(max_length=50, null=True)
    location = models.CharField(max_length=250, null=True)
    name = models.CharField(max_length=250, null=True)

    def __str__(self):
        return f"Address-{self.location}"


class Owner(models.Model):
    owner_id = models.CharField(max_length=500)
    name = models.CharField(max_length=500, null=True)
    contact_number = models.CharField(max_length=500, null=True)
    address_id = models.CharField(max_length=500)

    def __str__(self):
        return self.name + self.address_id


class Rider(models.Model):
    name = models.CharField(max_length=250)
    rider_id = models.CharField(max_length=500)
    contact_number = models.CharField(max_length=10)
    bag_volume = models.CharField(max_length=50)
    bag_length = models.CharField(max_length=10)
    bag_width = models.CharField(max_length=10)
    bag_height = models.CharField(max_length=10)
    bag_volume_used = models.CharField(max_length=50, null=True)
    current_address = models.ForeignKey(
        Address, related_name="Current_Delievery_Address", on_delete=models.CASCADE
    )
    rider_status = models.CharField(
        _("filing form type"), max_length=50, choices=RIDER_STATUS
    )
    delievery_orders = models.CharField(max_length=500, null=True)
    last_delivered_pointer = models.IntegerField(null=True)
    manager_id = models.CharField(max_length=500, null=True)
    arrival_time = models.DateField((_("arrival time")))
    departure_time = models.DateField((_("departure time")))
    etf = models.CharField(max_length=50, null=True)
    successful_deliveries = models.IntegerField(default=0)
    packages_delayed = models.IntegerField(default=0)

    def save(self, *args, **kwargs):
        # self.successful_deliveries = self.last_delivered_pointer + 1
        # self.packages_delayed = 0
        # for order_id in self.delievery_orders.split(","):
        #     if Order.objects.get(id=order_id).order_status == "delayed":
        #         self.packages_delayed += 1
        super(Rider, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} + {self.rider_id}"


class Order(models.Model):
    rider = models.ForeignKey(Rider, on_delete=models.CASCADE, null=True)
    order_name = models.CharField(max_length=500, null=True, blank=True)
    shape = models.CharField(max_length=50, null=True, blank=True)
    volume = models.CharField(max_length=50, blank=True)
    length = models.CharField(max_length=50, blank=True)
    width = models.CharField(max_length=50, blank=True)
    height = models.CharField(max_length=50, blank=True)
    sku = models.CharField(max_length=50, null=True, blank=True)
    address = models.ForeignKey(Address, on_delete=models.CASCADE, null=True)
    delivery_action = models.CharField(
        _("delivery action"), max_length=50, choices=DELIVERY_ACTION, blank=True
    )
    order_status = models.CharField(
        _("order status"), max_length=50, choices=ORDER_STATUS, blank=True
    )
    edd = models.DateTimeField(_("EDD date"), blank=True, null=True)
    eta = models.CharField(max_length=50, null=True)
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE, blank=True, null=True)
    image = models.FileField(blank=True)

    def __str__(self):
        return self.order_name


class Bags(models.Model):
    rider_id = models.CharField(max_length=500)
    order_name = models.CharField(max_length=500, null=True, blank=True)
    shape = models.CharField(max_length=50, null=True, blank=True)
    volume = models.CharField(max_length=50, blank=True)
    length = models.CharField(max_length=50, blank=True)
    width = models.CharField(max_length=50, blank=True)
    height = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return self.order_name


class Repository(models.Model):
    cancelled = models.IntegerField(default=0)
    pickups = models.IntegerField(default=0)
    damaged = models.IntegerField(default=0)
    history = models.TextField()

    def __str__(self):
        return f"Repository"


def get_upload_to(instance, filename):
    return os.path.join("media/", str(instance.order.order_name), filename)


class OrderImage(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, null=True)
    images = models.ImageField(upload_to="media/", blank=True)


class RiderRewards(models.Model):
    rider_id = models.CharField(max_length=100, blank=True, null=True)
    rider_name = models.CharField(max_length=100, blank=True, null=True)
    successful_deliveries = models.IntegerField(blank=True, null=True)
    earnings = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return {self.rider_name} + "RiderRewards"
