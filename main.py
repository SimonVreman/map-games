import geopandas as gpd
import math
import shapely
from brazil_ddd import ddds
import unicodedata

mercator_reach = 85.05112877980659
x_domain = 1000
rounding = 4
simplify = 0.025

def lat_lon_to_mercator(lat, lon):
    # Convert latitude and longitude from degrees to radians
    lat_rad = math.radians(lat)
    lon_rad = math.radians(lon)
    
    # Mercator projection formulas
    x = math.pi + lon_rad  # x coordinate in radians
    y = math.pi - math.log(math.tan(math.pi / 4 + lat_rad / 2))  # y coordinate in radians

    x *= x_domain / (2 * math.pi)  # Scale x to the domain
    y *= x_domain / (2 * math.pi)  # Scale y to the domain
    
    return (x, y)

def read_boundaries(df: gpd.GeoDataFrame, union=False):
    # Explode the multipolygon into individual polygons
    df = df.explode()

    # Filter out polygons with area less than a certain threshold
    # This is an arbitrary threshold to filter out small geometries
    df = df[df.geometry.apply(lambda x: x.area > 1e-5)]
    union = df.geometry.union_all()

    # Convert the geometries to a list of simplified paths
    paths = []
    geometries = [union] if union else df.geometry.to_list()
    for polygon in geometries:
        if isinstance(polygon, shapely.geometry.polygon.Polygon):
            paths.append(list(polygon.simplify(simplify).exterior.coords))
        elif isinstance(polygon, shapely.geometry.multipolygon.MultiPolygon):
            for poly in polygon.geoms:
                paths.append(list(poly.simplify(simplify).exterior.coords))

    representative = union.representative_point()
    
    return paths, lat_lon_to_mercator(representative.y, representative.x)

def write_paths(output, paths):
    for path in paths:
        output.write('<path d="M')
        is_first = True

        for lon,lat in path:
            if is_first:
                is_first = False
            else:
                output.write('L')

            x, y = lat_lon_to_mercator(lat, lon)
            output.write(f' {round(x, rounding)} {round(y, rounding)} ')

        output.write('z" />\n')

def normalize_string(s):
    s = s.lower()
    s = ''.join(c for c in unicodedata.normalize('NFD', s) if unicodedata.category(c) != 'Mn')
    s = s.replace('’', "'").replace('´', "'").replace('`', "'")
    return s

def write_brazil():
    df = gpd.read_file("input/brazil/bra_admbnda_adm0_ibge_2020.shp")
    output = open('output/brazil.path.txt', 'w')
    paths,_ = read_boundaries(df)
    write_paths(output, paths)
    output.close()

def write_brazil_first_administrative():
    df = gpd.read_file("input/brazil/bra_admbnda_adm1_ibge_2020.shp")
    output = open('output/brazil-first-administrative.path.txt', 'w')
    paths,_ = read_boundaries(df)
    write_paths(output, paths)
    output.close()

def write_brazil_phone():
    df = gpd.read_file('input/brazil/bra_admbnda_adm2_ibge_2020.shp')
    df['ADM2_PT_normalized'] = df['ADM2_PT'].apply(normalize_string)

    output = open('output/brazil-dialing-codes.path.txt', 'w')
    output.write('export const brazilPhoneCodes = [\n')

    for ddd in ddds.keys():
        normalized_ddd_cities = set(map(normalize_string, ddds[ddd]['adm2']))
        normalized_ddd_2_cities = set(map(normalize_string, ddds[ddd]['adm2_2'])) if 'adm1_2' in ddds[ddd] else set()

        df_ddd = df[
            (df['ADM1_PT'] == ddds[ddd]['adm1']) & df['ADM2_PT_normalized'].isin(normalized_ddd_cities)
        ] if 'adm1_2' not in ddds[ddd] else df[
            ((df['ADM1_PT'] == ddds[ddd]['adm1']) & df['ADM2_PT_normalized'].isin(normalized_ddd_cities)) | 
            ((df['ADM1_PT'] == ddds[ddd]['adm1_2']) & df['ADM2_PT_normalized'].isin(normalized_ddd_2_cities))
        ]
        
        cities_not_in_df = (normalized_ddd_cities | normalized_ddd_2_cities) - set(df_ddd['ADM2_PT_normalized'])
        if len(cities_not_in_df) > 0:
            print(f"Warning: Not all cities found for DDD {ddd} in {ddds[ddd]['adm1']}, missing: {cities_not_in_df}")

        paths, center = read_boundaries(df_ddd, union=True)
        output.write(f'{{ code: {ddd}, center: [{round(center[0], rounding)},{round(center[1], rounding)}], paths: ({'<>' if len(paths) > 1 else ''}')
        write_paths(output, paths)
        output.write(f'{'</>' if len(paths) > 1 else ''})}},\n')
    
    output.write(']\n')
    output.close()

# write_brazil_phone()
# write_brazil()
write_brazil_first_administrative()