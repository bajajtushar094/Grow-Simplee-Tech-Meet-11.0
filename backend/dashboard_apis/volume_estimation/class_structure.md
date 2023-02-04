# Item
- **Item ID (SKU)**: String
- **Images**: List of paths (List of strings)

# ItemsGroup
- **List<Item>**: List of Items

# ItemOutput
- **Item ID (SKU)**: String
- **Segmented Image**: Image (String of its path)
- **Depth Image**: Image (String of its path)
- **Point Cloud of the object** (.ply format): String of its path
- **Point Cloud of the Convex Hull** (.ply format): String of its path
- **Volume of the object**: Float (in cm3)
- **Defects**: Boolean
- **Defect Percentage**: Float (Between 0 - 100)
- **Dimensions**: List of 3 float values
