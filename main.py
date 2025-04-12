import geopandas as gpd
import math
import shapely

mercator_reach = 85.05112877980659
x_domain = 1000

def lat_lon_to_mercator(lat, lon):
    """
    Convert latitude and longitude to Mercator coordinates.
    
    Parameters:
    lat (float): Latitude in degrees.
    lon (float): Longitude in degrees.
    
    Returns:
    tuple: (x, y) Mercator coordinates.
    """
    # Convert latitude and longitude from degrees to radians
    lat_rad = math.radians(lat)
    lon_rad = math.radians(lon)
    
    # Mercator projection formulas
    x = lon_rad  # x coordinate in radians
    y = -math.log(math.tan(math.pi / 4 + lat_rad / 2))  # y coordinate in radians

    x *= x_domain / (2 * math.pi)  # Scale x to the domain
    y *= x_domain * (mercator_reach / 90) / (2 * math.pi)  # Scale y to the domain
    
    return (x, y)

def read_boundaries(file):
    # Read the shapefile and explode the multipolygon into individual polygons
    df = gpd.read_file(file).explode()

    # Filter out polygons with area less than a certain threshold
    # This is an arbitrary threshold to filter out small geometries
    df = df[df.geometry.apply(lambda x: x.area > 1e-2)]

    # Convert the geometries to a list of simplified paths
    # Each path is a list of coordinates
    # paths = [shapely.get_coordinates(polygon.simplify(0.1).boundary) for polygon in df.geometry.to_list()]
    paths = []
    for polygon in df.geometry.to_list():
        if isinstance(polygon, shapely.geometry.polygon.Polygon):
            paths.append(list(polygon.simplify(0.05).exterior.coords))
        elif isinstance(polygon, shapely.geometry.multipolygon.MultiPolygon):
            for poly in polygon.geoms:
                paths.append(list(poly.simplify(0.05).exterior.coords))

    return paths

def write_paths(file, paths):
    output = open(file, 'w')

    for path in paths:
        output.write('<path d="M')
        is_first = True

        for lon,lat in path:
            if is_first:
                is_first = False
            else:
                output.write('L')

            x, y = lat_lon_to_mercator(lat, lon)
            output.write(f' {round(x, 4)} {round(y, 4)} ')

        output.write('z" />\n')

    output.close()

# def create_svg():
#     df = gpd.read_file("shp/bra_admbnda_adm0_ibge_2020.shp") 

#     output = open('brazil.path.svg', 'w')
#     geometry = df.geometry[0]
#     coordinates = geometry.geoms[0].boundary.coords
#     coordinate_count = len(coordinates)

#     output.write('<path d="M')

#     for index, coordinate in coordinates:
#         x, y = lat_lon_to_mercator(coordinate[1], coordinate[0])
#         output.write(f' {x} {y} ')
#         if index < coordinate_count - 1:
#             output.write('L')

#     output.write('z" />')
#     output.close()

def caculate_svg_bounds():
    origin = lat_lon_to_mercator(-85.0511, -180)
    opposite = lat_lon_to_mercator(85.0511, 180)
    width = opposite[0] - origin[0]
    height = opposite[1] - origin[1]
    return f"{round(origin[0], 0)} {round(origin[1], 1)} {round(width, 0)} {round(height,1)}"

write_paths('brazil.path.svg', read_boundaries("input/brazil/bra_admbnda_adm0_ibge_2020.shp"))