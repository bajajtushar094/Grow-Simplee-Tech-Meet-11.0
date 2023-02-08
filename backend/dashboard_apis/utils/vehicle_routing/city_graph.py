import os
import math
import networkx as nx
import geopandas as gpd
from shapely.geometry import Point

class CityGraph():
    def __init__(self, orders):
        self.orders = self.process_orders(orders)
        self.ward_list = self.process_wards()
        self.G = self.prepare_graph()

    def process_orders(self, orders):
        for order in orders:
            order.point = Point(order.lon, order.lat)
        return orders

    def process_wards(self):
        self.city = gpd.read_file(os.path.dirname(__file__) + r'/../wards/bangalore.geojson')
        self.city['KGISWardNo'] = self.city['KGISWardNo'].astype('int')

        wards = {}

        for i in self.city.iterrows():
            num = i[1]['KGISWardNo']
            name = i[1]['KGISWardName']
            geo = i[1]['geometry']

            wards[num] = {
                'name': name,
                'geometry': geo
            }

        return wards
    
    # Add edges to the graph, connecting each ward to its neighboring wards
    def prepare_graph(self):
        if self.ward_list is None:
            raise TypeError

        G = nx.Graph()
        for i in self.ward_list.keys():
            G.add_node(i)

        for i in self.ward_list.keys():
            for j in self.ward_list.keys():
                if i <= j:
                    continue

                if self.ward_list[i]['geometry'].touches(self.ward_list[j]['geometry']):
                    G.add_edge(i, j)
        return G

    def calculate_order_density(self):
        if self.ward_list is None:
            raise TypeError
        if self.orders is None:
            raise TypeError

        beta = {}
        for i in self.ward_list.keys():
            self.ward_list[i]['order_density'] = 0
            for order in self.orders:
                if self.ward_list[i]['geometry'].contains(order.point):
                    self.ward_list[i]['order_density'] += 1
            self.ward_list[i]['order_density'] /= (self.ward_list[i]['geometry'].area / 1000000)
            beta[i] = self.ward_list[i]['order_density']
        
        self.beta = beta

    def calculate_katz_centrality(self):
        return nx.katz_centrality(self.G, beta=self.beta)

    def get_priorities(self):
        self.calculate_order_density()
        katz_centrality = self.calculate_katz_centrality()

        priorities = {}

        for i in self.ward_list:
            priorities[i] = katz_centrality[i]
        
        for i in self.ward_list:
            for order in self.orders:
                if self.ward_list[i]['geometry'].contains(order.point):
                    order.priority = priorities[i]

        return priorities