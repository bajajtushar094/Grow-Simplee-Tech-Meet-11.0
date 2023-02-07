from core.models import Owner
import csv
import sys,os
import numpy as np

dataReader = csv.reader(open('./bang_final_data.csv'), delimiter=',', quotechar='"')
i=0

for row in dataReader:
    i+=1
    if i==1:
        continue
    print(row)
    owner = Owner()
    owner.name = row[5]
    owner.owner_id = i
    owner.contact_number = int(np.random.rand()*1000000)
    owner.address_id = row[4]
    owner.save()
    # address.name = row[4]
    # address.latitude = row[6]
    # address.longitude = row[7]
    # address.location = row[2]
    # address.address = row[1]
    # address.save()