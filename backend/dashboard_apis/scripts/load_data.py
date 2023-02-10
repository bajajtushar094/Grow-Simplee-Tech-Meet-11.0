# from ..core.models import *
import sys,os
csv_path = '/home/gunjan/Desktop/GrowSimplee/Grow-Simplee-Tech-Meet-11.0/backend/dashboard_apis/bang_final_data.csv'
# sys.path.append('/home/aditya/Grow-Simplee-Tech-Meet-11.0/backend/')
os.environ['DJANGO_SETTINGS_MODULE'] = 'dashboard_apis.dashboard_apis.settings'
import csv
from dashboard_apis.core.models import *
dataReader = csv.reader(open(csv_path), delimiter=',', quotechar='"')
print(dataReader)
i = 0
for row in dataReader:
    if i==0:
        continue

    print(row)
    address = Address()
    address.id = row[3]
    address.name = row[4]
    address.latitude = row[6]
    address.longitude = row[7]
    address.location = row[2]
    address.address = row[1]
    address.save()

