from core.models import *
import pandas as pd
import os

rootPath = os.getcwd()
filespath = os.path.join(rootPath, 'files/')

fileName = 'bangalore_dispatch_address_finals.xlsx'

df = pd.read_excel(filespath + fileName)

for index, row in df.iterrows():
    print(row)

# print(dispatch_addresses)