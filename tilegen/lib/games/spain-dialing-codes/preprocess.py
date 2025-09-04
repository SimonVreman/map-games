import geopandas as gpd
import sys

codes = {
    "95": {"adm2": ["Seville", "Malaga"]},
    "959": {"adm2": ["Huelva"]},
    "956": {"adm2": ["Cadiz"]},
    "957": {"adm2": ["Cordoba"]},
    "953": {"adm2": ["Jaen"]},
    "958": {"adm2": ["Granada"]},
    "950": {"adm2": ["Almeria"]},
    "926": {"adm2": ["Ciudad Real"]},
    "924": {"adm2": ["Badajoz"]},
    "920": {"adm2": ["Avila"]},
    "927": {"adm2": ["Caceres"]},
    "925": {"adm2": ["Toledo"]},
    "923": {"adm2": ["Salamanca"]},
    "921": {"adm2": ["Segovia"]},
    "922": {"adm2": ["Santa Cruz de Tenerife"]},
    "928": {"adm2": ["Las Palmas"]},
    "91": {"adm2": ["Madrid"]},
    "969": {"adm2": ["Cuenca"]},
    "967": {"adm2": ["Albacete"]},
    "968": {"adm2": ["Murcia"]},
    "96": {"adm2": ["Valencia", "Alicante"]},
    "964": {"adm2": ["Castellon"]},
    "978": {"adm2": ["Teruel"]},
    "976": {"adm2": ["Zaragoza"]},
    "975": {"adm2": ["Soria"]},
    "974": {"adm2": ["Huesca"]},
    "979": {"adm2": ["Palencia"]},
    "973": {"adm2": ["Lleida"]},
    "977": {"adm2": ["Tarragona"]},
    "972": {"adm2": ["Girona"]},
    "971": {"adm2": ["Balearic Islands"]},
    "93": {"adm2": ["Barcelona"]},
    "949": {"adm2": ["Guadalajara"]},
    "947": {"adm2": ["Burgos"]},
    "941": {"adm2": ["La Rioja"]},
    "948": {"adm2": ["Navarre"]},
    "945": {"adm2": ["Alava"]},
    "943": {"adm2": ["Gipuzkoa"]},
    "94": {"adm2": ["Biscay"]},
    "942": {"adm2": ["Cantabria"]},
    "98": {"adm2": ["Asturias"]},
    "987": {"adm2": ["Leon"]},
    "983": {"adm2": ["Valladolid"]},
    "980": {"adm2": ["Zamora"]},
    "988": {"adm2": ["Ourense"]},
    "982": {"adm2": ["Lugo"]},
    "981": {"adm2": ["Corunna"]},
    "986": {"adm2": ["Pontevedra"]},
}

output = sys.argv[1]

df = gpd.read_file("input/spain/whosonfirst-data-admin-es-region-polygon.shp")

df["id"] = df.apply(
    lambda r: next((k for k, v in codes.items() if r["name_eng"] in v["adm2"]), None),
    axis=1,
)

df = df.dissolve(by=["id"])

df["center"] = df.apply(
    lambda r: r.geometry.representative_point(),
    axis=1,
)

df["center_lng"] = df.apply(
    lambda r: r["center"].x,
    axis=1,
)

df["center_lat"] = df.apply(
    lambda r: r["center"].y,
    axis=1,
)

df[["geometry", "center_lng", "center_lat"]].to_file(output, driver="GeoJSON")
