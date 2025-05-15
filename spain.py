import geopandas as gpd
import shapely
from main import (
    read_boundaries,
    read_internal_boundaries,
    write_paths,
    open_utf8,
    write_code_paths,
)

rounding = 3

spain_area_codes = {
    95: {"adm2": ["Seville", "Malaga"]},
    959: {"adm2": ["Huelva"]},
    956: {"adm2": ["Cadiz"]},
    957: {"adm2": ["Cordoba"]},
    953: {"adm2": ["Jaen"]},
    958: {"adm2": ["Granada"]},
    950: {"adm2": ["Almeria"]},
    926: {"adm2": ["Ciudad Real"]},
    924: {"adm2": ["Badajoz"]},
    920: {"adm2": ["Avila"]},
    927: {"adm2": ["Caceres"]},
    925: {"adm2": ["Toledo"]},
    923: {"adm2": ["Salamanca"]},
    921: {"adm2": ["Segovia"]},
    922: {"adm2": ["Santa Cruz de Tenerife"]},
    928: {"adm2": ["Las Palmas"]},
    91: {"adm2": ["Madrid"]},
    969: {"adm2": ["Cuenca"]},
    967: {"adm2": ["Albacete"]},
    968: {"adm2": ["Murcia"]},
    96: {"adm2": ["Valencia", "Alicante"]},
    964: {"adm2": ["Castellon"]},
    978: {"adm2": ["Teruel"]},
    976: {"adm2": ["Zaragoza"]},
    975: {"adm2": ["Soria"]},
    974: {"adm2": ["Huesca"]},
    979: {"adm2": ["Palencia"]},
    973: {"adm2": ["Lleida"]},
    977: {"adm2": ["Tarragona"]},
    972: {"adm2": ["Girona"]},
    971: {"adm2": ["Balearic Islands"]},
    93: {"adm2": ["Barcelona"]},
    949: {"adm2": ["Guadalajara"]},
    947: {"adm2": ["Burgos"]},
    941: {"adm2": ["La Rioja"]},
    948: {"adm2": ["Navarre"]},
    945: {"adm2": ["Alava"]},
    943: {"adm2": ["Gipuzkoa"]},
    94: {"adm2": ["Biscay"]},
    942: {"adm2": ["Cantabria"]},
    98: {"adm2": ["Asturias"]},
    987: {"adm2": ["Leon"]},
    983: {"adm2": ["Valladolid"]},
    980: {"adm2": ["Zamora"]},
    988: {"adm2": ["Ourense"]},
    982: {"adm2": ["Lugo"]},
    981: {"adm2": ["Corunna"]},
    986: {"adm2": ["Pontevedra"]},
}


# Shift for the Canary Islands
islands_translation = [5, 9]


def shift_islands(
    geometry: shapely.Polygon | shapely.MultiPolygon,
) -> shapely.Polygon | shapely.MultiPolygon:
    if geometry.bounds[1] < 35:
        return shapely.affinity.translate(
            geometry, xoff=islands_translation[0], yoff=islands_translation[1]
        )
    return geometry


def write_spain():
    """
    Using a union of regions to use the same dataset for everything
    """
    df = gpd.read_file("input/spain/whosonfirst-data-admin-es-macroregion-polygon.shp")
    df["geometry"] = df["geometry"].apply(shift_islands)
    output = open_utf8("output/spain.path.txt", "w")
    boundaries, _ = read_boundaries(df, union=True)
    write_paths(output, boundaries)
    output.close()


def write_spain_first_administrative():
    df = gpd.read_file("input/spain/whosonfirst-data-admin-es-macroregion-polygon.shp")
    output = open_utf8("output/spain-first-administrative.path.txt", "w")
    boundaries = read_internal_boundaries(df)
    write_paths(output, boundaries, close=False)
    output.close()


def write_spain_phone():
    df = gpd.read_file("input/spain/whosonfirst-data-admin-es-region-polygon.shp")

    output = open_utf8("output/spain-dialing-codes.path.txt", "w")
    output.write("export const spainPhoneCodes = [\n")

    for key, code in spain_area_codes.items():
        df_ddd = df[df["name_eng"].isin(code["adm2"])]

        # TODO: change to use proper, mercator preserving, translation
        if "Santa Cruz de Tenerife" in code["adm2"] or "Las Palmas" in code["adm2"]:
            df_ddd = df_ddd.translate(xoff=5, yoff=9)

        write_code_paths(output, [str(key)], df_ddd)

    output.write("]\n")
    output.close()


# write_spain()
# write_spain_phone()
# write_spain_first_administrative()
