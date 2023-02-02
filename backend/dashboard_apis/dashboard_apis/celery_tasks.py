
import os
from celery import Celery
import pickle


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "dashboard_apis.settings")
app = Celery("dashboard_apis")
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()

app.conf.enable_utc = False