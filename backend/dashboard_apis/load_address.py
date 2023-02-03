from core.models import Address
import csv
import sys,os

dataReader = csv.reader(open('./bang_final_data.csv'), delimiter=',', quotechar='"')
i=0

for row in dataReader:
    i+=1
    if i==1:
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