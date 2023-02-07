from core.models import *
import csv
import numpy as np
from datetime import datetime

def populate_riders():
    i=0
    rider_name = ["Ram", "Shyam", "Rajesh", "Suresh", "Kamlesh", "John", "Han", "Timothy", "Johnson", "Tree"]
    user = User(username="Pete Davidson", password="password", is_manager=True)
    user.save()
    manager = Manager()
    manager.name = "Pete Davidson"
    manager.user = user
    manager.contact_number = int(np.random.rand()*1000000)
    manager.latitude = 12.909694
    manager.longitude = 77.586607
    manager.location = "JP Nagar"
    manager.save()
    for i in range(len(rider_name)):
        user = User(username=rider_name[i], password="password", is_rider=True)
        user.save()
        rider = Rider()
        rider.user = user
        rider.name = rider_name[i]
        rider.photoURL = "https://www.askideas.com/media/06/Funny-Human-Naomi-Grossman-Face.jpg"
        rider.contact_number = int(np.random.rand()*1000000)
        rider.rider_status = 'trip'
        rider.manager = manager
        rider.current_trip_id = 1
        rider.save()

def populate_order():
    dataReader = csv.reader(open('./bang_final_data.csv'), delimiter=',', quotechar='"')
    i=0

    for row in dataReader:
        i+=1
        if i == 1:
            continue
        order = Order()
        order.order_id = row[4]
        order.shape = row[9]
        order.volume = row[13]
        order.length = row[10]
        order.width = row[11]
        order.height = row[12]
        order.sku = row[6]
        order.latitude = row[8]
        order.longitude = row[7]
        order.location = row[2]
        order.delivery_action = "undelivered"
        order.order_status = "drop"
        order.edd = datetime.now()
        order.owner_name = row[5]
        order.address_name = row[5]
        order.contact_number = int(np.random.rand()*1000000)
        order.save()