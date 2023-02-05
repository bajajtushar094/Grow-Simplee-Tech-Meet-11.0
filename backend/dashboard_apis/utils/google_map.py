import requests
import pandas as pd
import re
GOOGLE_API_KEY = 'AIzaSyDTAVXIRxhMIx7zYki1NeTSm_6BYXg1Bh0' 

# def format_address(address): #the function should change the address to a geocodable address
#     ind=len(address)-1
#     cnt=0
#     tc=address.count(',')
#     while ind >= 0:
#         if address[ind] == ',':
#             cnt+=1
#             if cnt==tc:
#                 return address[ind+1 :]
#         ind-=1
#     return address

def extract_lat_long_via_address(address_or_zipcode):
    lat, lng = None, None
    api_key = GOOGLE_API_KEY
    base_url = "https://maps.googleapis.com/maps/api/geocode/json"
    endpoint = f"{base_url}?address={address_or_zipcode}&key={api_key}&bounds=12.729887,77.358236|13.179502,77.887910"
    # see how our endpoint includes our API key? Yes this is yet another reason to restrict the key
    r = requests.get(endpoint)
    if r.status_code not in range(200, 299):
        # address_or_zipcode=format_address(address_or_zipcode)
        # base_url = "https://maps.googleapis.com/maps/api/geocode/json"
        # endpoint = f"{base_url}?address={address_or_zipcode}&key={api_key}&bounds=12.729887,77.358236|13.179502,77.887910"
        # r = requests.get(endpoint)
        # if r.status_code not in range(200, 299):
        return None, None
    try:
        '''
        This try block incase any of our inputs are invalid. This is done instead
        of actually writing out handlers for all kinds of responses.
        '''
        results = r.json()['results'][0]
        lat = results['geometry']['location']['lat']
        lng = results['geometry']['location']['lng']
    except:
        pass
    return lat, lng
# print(format_address('#35/4, 24th main JP Nagar 7th phase, Puttenahalli, JP Nagar, Bangalore'))
# print(extract_lat_long_via_address('#35/4, 24th main JP Nagar 7th phase, Puttenahalli, JP Nagar, Bangalore'))
# def geocode_delivery_orders(addresses): #returns a tuple of lists of longitudes and lattitudes
#     x=[]
#     y=[]
#     failed_addresses=[]
#     successful_addresses=[]
#     for address in addresses:
#         try:
#             address = repr(address)
#             address = address.replace('\\', ' ')
#             address = re.sub('[^A-Za-z0-9 ,()]+', ' ', address)
#             #coordinate=ox.geocode(format_address(address)) 
#             coordinate = extract_lat_long_via_address(address)
#             x.append(coordinate[1])
#             y.append(coordinate[0])
#             successful_addresses.append([address,coordinate])
#         except:
#           failed_addresses.append([address,coordinate])

#     coords = [x,y]
#     df = pd.DataFrame(coords)
#     df.to_csv('coordinates')
#     df=pd.DataFrame(failed_addresses, columns=['failed address', 'coordinates'])
#     df.to_csv('failed_p.csv')
#     df=pd.DataFrame(successful_addresses, columns=['successful address', 'coordinates'])
#     df.to_csv('successful_p.csv')
#     return x, y

# addresses=pd.read_excel('dispatch_addresses.xlsx')['address'].tolist()
# x,y=geocode_delivery_orders(addresses)
# addresses["lon"] = x
# addresses["lat"] = y

# pickups=pd.read_excel('pickups.xlsx')['address'].tolist()
# x,y=geocode_delivery_orders(pickups)
