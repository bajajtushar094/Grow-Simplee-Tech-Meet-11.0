import pandas as pd
import urllib.parse
import requests
import numpy as np

# endpoint = "mapbox.places"
df1 = pd.read_csv('bang_final_data.csv')
shapes = []
l = []
b = []
h = []
vol = []
std_shapes = ['cuboidal', 'cylindrical', 'circular', 'prism']
minl = 3
maxl = 40
minb = 3
maxb = 40
minh = 3
maxh = 20
for add in df1['address']:
    val = int(np.random.rand()*4)
    shapes.append(std_shapes[val])
    if val == 0:
        l1=int(np.random.rand()*37)+3
        b1=int(np.random.rand()*37)+3
        h1=int(np.random.rand()*17)+3
        l.append(l1)
        b.append(b1)
        h.append(h1)
        vol.append(l1*b1*h1)
    elif val == 1:
        l1=np.random.rand()*37+3 #height
        b1=l1
        h1=np.random.rand()*17+3 #radius
        l.append(l1), b.append(b1), h.append(h1)
        vol.append(np.pi*h1*h1*l1)
    elif val == 2:
        l1 = np.random.rand()*37+3 #radius
        b1 = l1
        h1 = l1
        l.append(l1)
        b.append(b1)
        h.append(h1)
        vol.append(4*np.pi*l1*l1*l1/3)
    else:
        l1 = np.random.rand()*37+3 #height
        b1 = np.random.rand()*37+3 #height of triangle
        h1 = np.random.rand()*17+3 #length of triangle base
        l.append(l1)
        b.append(b1)
        h.append(h1)
        vol.append(0.5*l1*b1*h1)

    

    # pri

df1['shapes'] = shapes
df1['len'] = l
df1['breadth'] =b
df1['height'] = h
df1['vol'] = vol
df1.to_csv('bang_final_data.csv')


