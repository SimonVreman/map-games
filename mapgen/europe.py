import geopandas as gpd
import json

countries_used = [
    "France",
    "Belgium",
    "Germany",
    "Italy",
    "Spain",
    "Portugal",
    "Netherlands",
    "Luxembourg",
    "Ireland",
    "United Kingdom",
    "Switzerland",
    "Austria",
    "Denmark",
    "Finland",
    "Norway",
    "Sweden",
    "Iceland",
    "Czechia",
    "Slovakia",
    "Hungary",
    "Poland",
    "Romania",
    "Bulgaria",
    "Croatia",
    "Republic of Serbia",
    "Bosnia and Herzegovina",
    "Montenegro",
    "North Macedonia",
    "Albania",
    "Greece",
    "Turkey",
    "Cyprus",
    "Malta",
    "Monaco",
    "San Marino",
    "Andorra",
    "Liechtenstein",
    "Slovenia",
    "Estonia",
    "Latvia",
    "Lithuania",
    "Belarus",
    "Ukraine",
    "Russia",
    "Kosovo",
    "Moldova",
]

precision = 6
output_path = "../web/public/assets/geo/european-countries.geojson"


def write_countries():
    df = gpd.read_file("input/natural_earth_countries/ne_10m_admin_0_countries_nld.shp")

    df_used = df[df["ADMIN"].isin(countries_used)]
    df_used["name"] = df_used["NAME"]
    df_used = df_used[["name", "geometry"]]
    df_used.geometry.set_precision(1 / 10**precision)

    df_used.to_file(
        output_path,
        driver="GeoJSON",
        WRITE_BBOX="YES",
        COORDINATE_PRECISION=precision,
    )

    # Minimize the file size by removing all whitespace
    with open(output_path, "r") as f:
        content = f.read()
    content = json.dumps(json.loads(content), separators=(",", ":"), indent=None)
    with open(output_path, "w") as f:
        f.write(content)


write_countries()
