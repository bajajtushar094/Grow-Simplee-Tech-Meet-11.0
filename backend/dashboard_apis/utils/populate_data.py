from core.models import *
import csv
import numpy as np
from datetime import datetime


# def populate_address():
#     dataReader = csv.reader(open('./bang_final_data.csv'), delimiter=',', quotechar='"')
#     i=0

#     for row in dataReader:
#         i+=1
#         if i==1:
#             continue

#         address = Address()
#         address.name = row[5]
#         address.latitude = row[8]
#         address.longitude = row[7]
#         address.location = row[2]
#         address.save()

def populate_managers():
    dataReader = csv.reader(open('./bang_final_data.csv'), delimiter=',', quotechar='"')
    i=0
    # all_address = Address.objects.all()
    for row in dataReader:
        i+=1
        if i==1:
            continue
        print(row)
        manager = Manager()
        manager.name = row[5]
        manager.contact_number = int(np.random.rand()*1000000)
        manager.latitude = row[8]
        # manager
        manager.save()

def populate_riders():
    i=0
    rider_name = ["Ram", "Shyam", "Rajesh", "Suresh", "Kamlesh", "John", "Han", "Timothy", "Johnson", "Tree"]
    all_address = Address.objects.all()
    manager = Manager()
    manager.name = "Pete Davidson"
    manager.contact_number = int(np.random.rand()*1000000)
    manager.address_id = all_address[0].id
    manager.save()
    for i in range(len(rider_name)):
        owner = Rider()
        owner.name = rider_name[i]
        owner.contact_number = int(np.random.rand()*1000000)
        owner.manager_id = 1
        owner.bag_volume = 27
        owner.bag_height = 3
        owner.bag_length = 3
        owner.bag_width = 3
        owner.bag_volume_used = 0
        owner.current_address = all_address[0]
        owner.rider_status = 'trip'
        owner.delievery_orders = ''
        owner.last_delivered_pointer = '0'
        owner.manager_id = manager.id
        owner.arrival_time = datetime.now()
        owner.departure_time = datetime.now()
        owner.etf = "hmm"
        owner.save()

def populate_order():
    dataReader = csv.reader(open('./bang_final_data.csv'), delimiter=',', quotechar='"')
    i=0

    vals = Owner.objects.all()
    all_address = Address.objects.all()

    for row in dataReader:
        i+=1
        if i == 1:
            continue
        order = Order()
        order.order_name = row[5]
        order.shape = row[9]
        order.volume = row[13]
        order.length = row[10]
        order.width = row[11]
        order.height = row[12]
        order.sku = row[6]
        order.address = all_address[i-2]
        order.delivery_action = "undelivered"
        order.order_status = "drop"
        order.edd = datetime.now()
        order.eta = "hmm"
        order.owner = vals[i-2]
        order.save()