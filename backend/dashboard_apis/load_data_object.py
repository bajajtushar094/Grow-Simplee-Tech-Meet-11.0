from core.models import Order, Owner
import csv
import sys,os
import numpy as np

dataReader = csv.reader(open('./bang_final_data.csv'), delimiter=',', quotechar='"')
i=0

vals = Owner.objects.all()

for row in dataReader:
    i+=1
    if i == 1:
        continue
    print(row)
    order = Order()
    order.rider_id = int(np.random.rand()*9)+2
    order.order_name = row[5]
    order.shape = row[9]
    order.volume = row[13]
    order.length = row[10]
    order.width = row[11]
    order.height = row[12]
    order.sku = row[6]
    order.address_id = row[4]
    order.owner = vals[i-2]
    order.save()