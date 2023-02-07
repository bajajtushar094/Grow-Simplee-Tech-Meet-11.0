import pandas as pd
import urllib.parse
import requests

endpoint = "mapbox.places"
df1 = pd.read_excel('bangalore_dispatch_address_finals.xlsx')
lats = []
longs = []

for add in df1['address']:
    print(add)
    # print(df1['address'][0])
    search_text = urllib.parse.quote(add)
    # print(search_text)
    url = f"https://api.mapbox.com/geocoding/v5/{endpoint}/{search_text}.json?limit=1&access_token=pk.eyJ1IjoiZGl0dGFwYW5kZXkiLCJhIjoiY2xkZDR0cDB5MDA1cTNvbzFydG5nMjU2OCJ9.HeAveWAWRIFOZ56TZVjaJw"
    # print(url)
    r = requests.get(url=url)
    data =  r.json()
    print(data['features'][0]['geometry']['coordinates'])
    lats.append(data['features'][0]['geometry']['coordinates'][0])
    longs.append(data['features'][0]['geometry']['coordinates'][1])

df1['latitude'] = lats
df1['longitude'] = longs
df1.to_csv('bang_final_data.csv')


