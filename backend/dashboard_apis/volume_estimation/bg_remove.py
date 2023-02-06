import numpy as np
import pandas as pd
from rembg import remove
from PIL import Image
from matplotlib import pyplot as plt


img = Image.open('blender2.png')
img = img.convert('RGB')
# image = np.asarray(img)
no_bg = remove(img)
# no_bg.save('no_bg.png')
no_bg = no_bg.convert('RGBA')

# width, height = no_bg.size
# # pixels = no_bg.load()
# pixels = no_bg.load()

# for i in range(width):
#     for j in range(height) : 
#         r,g,b,a = no_bg.getpixel((i,j))
#         # print(r,g,b)
#         if(a != 0):
#             new_r = r
#             new_g = 0
#             new_b = 0
#             pixels[i,j] = (new_r, new_g, new_b)
#         # if((r == 0) & (g == 0) & (b == 0)):
#         #     new_r = r
#         #     new_g = 0
#         #     new_b = 0
#         #     pixels[i,j] = (new_r, new_g, new_b)
#         # else :
#         #     new_r = r
#         #     new_g = 0
#         #     new_b = 0
#         #     pixels[i,j] = (new_r, new_g, new_b)
# # no_bg = no_bg.convert('RGB')
no_bg.save('blender2_no_bg.png')
        

