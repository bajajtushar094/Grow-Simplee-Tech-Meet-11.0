import numpy as np
import json
import requests

def _cuboid_data(origin, size=(1, 1, 1)):
    X = [[[0, 1, 0], [0, 0, 0], [1, 0, 0], [1, 1, 0]],
         [[0, 0, 0], [0, 0, 1], [1, 0, 1], [1, 0, 0]],
         [[1, 0, 1], [1, 0, 0], [1, 1, 0], [1, 1, 1]],
         [[0, 0, 1], [0, 0, 0], [0, 1, 0], [0, 1, 1]],
         [[0, 1, 0], [0, 1, 1], [1, 1, 1], [1, 1, 0]],
         [[0, 1, 1], [0, 0, 1], [1, 0, 1], [1, 1, 1]]]
    X = np.array(X).astype(float)
    for i in range(3):
        X[:, :, i] *= size[i]
    X += np.array(origin)

    return X

def _get_all_cuboids(positions, sizes,color_coded, case_ids):
    case_data = []
    mesh_kwargs = dict(alphahull=0, flatshading=True, showlegend=True)
    for p, s, id in zip(positions, sizes, case_ids):
        # print(p,s)
        case_points = _cuboid_data(tuple(p), size=tuple(s))
        # Get all unique vertices for 3d Mesh
        x, y, z = np.unique(np.vstack(case_points), axis=0).T
        case_data.append((id, x.tolist(), y.tolist(), z.tolist()))

    return case_data

def _plot_cuboids(positions, sizes,
                  bin_length, bin_width,
                  bin_height, color_coded,
                  case_ids):
    case_data = _get_all_cuboids(positions, sizes, color_coded, case_ids)
    return case_data

def plot_cuboids(bin,size,container):
    color_coded=True
    num_cases = len(bin)
    positions = []
    sizes = []
    for i in range(num_cases):
        sizes.append(size[bin[i]['piece']])
        positions.append((bin[i]['position']['x'],bin[i]['position']['y'],bin[i]['position']['z']))
    case_data = _plot_cuboids(positions, sizes, container[0],
                        container[1], container[2], color_coded, [bin[i]['piece'] for i in range(num_cases)])
    return case_data
 

class Packer:
    def __init__(self,url,length,width,height):
        self.url=url
        self.volumes={}
        self.sizes={}
        self.items=[]
        self.container=(length,width,height)
        self.post={"priority":1,"instance":{"name":"example","containers":[{"id":0,"length":length,"width":width,"height":height}],"pieces":[{"id":-1,"cubes":[{"x":0,"y":0,"z":0,"length":1000,"width":1000,"height":1000}]}]}}
    def add_item(self,id,length,width,height,priority):
        self.items.append({"id":id,"cubes":[{"x":0,"y":0,"z":0,"length":length,"width":width,"height":height}],"priority":priority})
        self.volumes[id]=length*width*height
        self.sizes[id]=[length,width,height]
    def pack(self):
        self.items.sort(key=lambda item: item['priority'])
        for item in self.items:
            self.post["instance"]["pieces"].append(item)
        x=json.loads(requests.post(self.url+"/Packing/calculations",json=self.post).text)
        while json.loads(requests.get(self.url+"/Packing/calculations/"+str(x["id"])+"/status").text)['status']!="DONE":
            continue
        results=json.loads(requests.get(self.url+"/Packing/calculations/"+str(x["id"])+"/solution").text)
        
        vol=sum(self.volumes.values())
        total_vol=vol
        for out in (results['offload']):
            if int(out) in self.volumes:
                vol-=self.volumes[int(out)]
        results['offload'].remove((-1))
        print("removed:",results['offload'])
        print("efficiency:",vol/total_vol)
        for piece in results['containers'][0]['assignments']:
            if piece['position']['a']==90:
                temp=self.sizes[piece['piece']][1]
                self.sizes[piece['piece']][1]=self.sizes[piece['piece']][2]
                self.sizes[piece['piece']][2]=temp
            if piece['position']['b']==90:
                temp=self.sizes[piece['piece']][0]
                self.sizes[piece['piece']][0]=self.sizes[piece['piece']][2]
                self.sizes[piece['piece']][2]=temp
            if piece['position']['c']==90:
                temp=self.sizes[piece['piece']][1]
                self.sizes[piece['piece']][1]=self.sizes[piece['piece']][0]
                self.sizes[piece['piece']][0]=temp
            self.sizes[piece['piece']]=tuple(self.sizes[piece['piece']])
        data = plot_cuboids(results['containers'][0]['assignments'],self.sizes,self.container)
        return data
