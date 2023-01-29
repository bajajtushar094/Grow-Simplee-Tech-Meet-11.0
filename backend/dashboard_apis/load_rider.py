from core.models import Rider, Manager
import csv
import sys,os
import numpy as np
from datetime import datetime

# dataReader = csv.reader(open('./bang_final_data.csv'), delimiter=',', quotechar='"')
i=0
rider_name = ["Ram", "Shyam", "Rajesh", "Suresh", "Kamlesh", "John", "Han", "Timothy", "Johnson", "Tree"]

manager = Manager()
manager.name = "Pete Davidson"
manager.id = 1
manager.contact_number = int(np.random.rand()*1000000)
manager.address_id = 71791751983
manager.save()

for i in range(2,13):
    
    # print(row)
    print(rider_name[i-2])
    owner = Rider()
    owner.name = rider_name[i-2]
    owner.rider_id = i
    owner.contact_number = int(np.random.rand()*1000000)
    owner.manager_id = 1
    owner.bag_volume = int(np.random.rand()*100000)+100000
    owner.arrival_time = datetime.now()
    owner.departure_time = datetime.now()
    owner.current_address_id = 71791751983
    owner.save()

