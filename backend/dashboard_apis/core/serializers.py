from rest_framework import serializers
from .models import *

class OrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = '__all__'

class RiderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Rider
        fields = '__all__'

class AddressSerializer(serializers.ModelSerializer):

    class Meta:
        model = Address
        fields = '__all__'

class OwnerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Owner
        fields = '__all__'

class ImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = OrderImage
        fields = '__all__'