import os
import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "dashboard_apis.settings")
django.setup()
from celery import Celery
import pickle
from datetime import datetime, timedelta
from core.models import *
import pickle
import json
from core.serializers import *
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "dashboard_apis.settings")
app = Celery("dashboard_apis")
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()
all_riders = Rider.objects.all()        
all_orders = Order.objects.all()
app.conf.beat_schedule={
    'run_vrp':{
    'task':'core.tasks.solveVRPReroute',
    'schedule': timedelta(minutes=1),
    'args': {
        'all_riders': RiderSerializer(all_riders, many=True).data,
        'all_orders': OrderSerializer(all_orders, many=True).data,
    },
    }
}
app.conf.enable_utc = False