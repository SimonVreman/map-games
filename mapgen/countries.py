import geopandas as gpd
from main import (
    open_utf8,
    read_boundaries,
    write_paths,
    meta_string,
    normalize_string,
)

rounding = 3

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


def write_countries():
    df = gpd.read_file("input/natural_earth_countries/ne_10m_admin_0_countries_nld.shp")

    for country in countries_used:
        country_name_parts = normalize_string(country).split(" ")
        filename = "-".join(country_name_parts)
        constant_name = country_name_parts[0] + "".join(
            x.capitalize() for x in country_name_parts[1:]
        )

        df_country = df[df["ADMIN"] == country]
        if df_country.empty:
            print(f"Warning: No data found for {country}")
            continue

        boundaries, _ = read_boundaries(df_country, union=True)
        output = open_utf8(f"output/countries/{filename}.tsx", "w")
        output.write(f"export const {constant_name}Paths = [\n")

        write_paths(output, boundaries)
        output.write(
            f"]\nexport const {constant_name}Meta = {meta_string(df_country)}\n"
        )
        output.close()


write_countries()
