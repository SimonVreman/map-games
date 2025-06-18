import geopandas as gpd
import pandas as pd
from main import (
    open_utf8,
    read_boundaries,
    read_internal_boundaries,
    write_paths,
    Transformation,
    write_code_paths,
    meta_string,
)
import shapely
import math

rounding = 3


# Shifts for far away regions
transformations = {
    "HI": Transformation((230, 100), 0.8),
    "AK": Transformation((160, 330), 0.4),
    "PR": Transformation((-12, -9)),
    "VI": Transformation((-12, -9)),
    "AS": Transformation((175, -625), 2),
    "GU": Transformation((-1655, -470), 2),
    "CNMI": Transformation((-1655, -470), 2),
    "MP": Transformation((-1655, -470), 2),
}


def write_usa():
    df = gpd.read_file(
        "input/natural_earth_countries/ne_10m_admin_1_states_provinces.shp"
    )
    df_countries = gpd.read_file(
        "input/natural_earth_countries/ne_10m_admin_0_countries.shp"
    )

    df = df[df["admin"] == "United States of America"]

    df_mainland = df[(df["name"] != "Alaska") & (df["name"] != "Hawaii")]
    df_alaska = df[df["name"] == "Alaska"]
    df_hawaii = df[df["name"] == "Hawaii"]
    df_puerto_rico = df_countries[df_countries["ADMIN"] == "Puerto Rico"]
    df_usvi = df_countries[df_countries["ADMIN"] == "United States Virgin Islands"]
    df_samoa = df_countries[df_countries["ADMIN"] == "American Samoa"]
    df_guam = df_countries[df_countries["ADMIN"] == "Guam"]
    df_nmi = df_countries[df_countries["ADMIN"] == "Northern Mariana Islands"]

    output = open_utf8("output/usa.path.txt", "w")

    write_paths(output, read_boundaries(df_mainland, union=True)[0])
    write_paths(
        output,
        read_boundaries(df_alaska, union=True)[0],
        transformation=transformations["AK"],
    )
    write_paths(
        output,
        read_boundaries(df_hawaii, union=True)[0],
        transformation=transformations["HI"],
    )
    write_paths(
        output,
        read_boundaries(df_puerto_rico, union=True)[0],
        transformation=transformations["PR"],
    )
    write_paths(
        output,
        read_boundaries(df_usvi, union=True)[0],
        transformation=transformations["VI"],
    )
    write_paths(
        output,
        read_boundaries(df_samoa, union=True)[0],
        transformation=transformations["AS"],
    )
    write_paths(
        output,
        read_boundaries(df_guam, union=True)[0],
        transformation=transformations["GU"],
    )
    write_paths(
        output,
        read_boundaries(df_nmi, union=True)[0],
        transformation=transformations["CNMI"],
    )

    output.close()


def write_usa_first_administrative():
    df = gpd.read_file(
        "input/natural_earth_countries/ne_10m_admin_1_states_provinces.shp"
    )
    df = df[df["admin"] == "United States of America"]

    output = open_utf8("output/usa-first-administrative.path.txt", "w")
    boundaries = read_internal_boundaries(df)
    write_paths(output, boundaries, close=False)

    output.close()


def write_usa_phone():
    df = gpd.read_file("input/usa/areacode.gdb")
    npa = pd.read_csv("input/usa/npa_report.csv", skiprows=1)

    output = open_utf8("output/usa-dialing-codes.path.txt", "w")
    output.write("export const usPhoneCodes = [\n")

    for key in df["AREA_CODE"].unique():
        code_df = df[df["AREA_CODE"] == key]
        npa_df = npa[npa["NPA_ID"] == int(key)]
        state = code_df["STATE"].iat[0]
        transformation = transformations[state] if state in transformations else None

        parent = npa_df["PARENT_NPA_ID"].iat[0]
        parent = "" if math.isnan(parent) else str(int(parent))
        parent_df = df[df["AREA_CODE"] == parent]

        if parent_df.size != 0:
            # Has a parent with a geometry, only process if not included in its overlay
            parent_overlay = npa[npa["NPA_ID"] == int(parent)]["OVERLAY_COMPLEX"].iat[0]
            parent_overlay = parent_overlay if isinstance(parent_overlay, str) else ""

            if key in parent_overlay:
                # Now check if this still isn't also a separate code
                # (e.g. 321 in Florida being standalone, and overlay code)
                if key == "321":
                    # Use the standalone geometry only
                    standalone = shapely.difference(
                        code_df.union_all(), parent_df.union_all()
                    )
                    code_df = code_df.assign(geometry=standalone)
                else:
                    continue

        # Have been merged, not reflected in my data yet
        if key == "602":
            code_df = code_df.assign(
                geometry=df[df["AREA_CODE"].isin(["480", "623", "602"])].union_all()
            )

        overlay = npa_df["OVERLAY_COMPLEX"].iat[0]
        overlay = overlay if isinstance(overlay, str) else ""
        overlay_codes = [key] if overlay == "" else sorted(overlay.split("/"))

        write_code_paths(output, overlay_codes, code_df, transformation)

    # American Samoa is not included in the dataset, handle separately
    df_samoa = gpd.read_file(
        "input/natural_earth_countries/ne_10m_admin_0_countries.shp"
    )
    df_samoa = df_samoa[df_samoa["ADMIN"] == "American Samoa"]
    write_code_paths(output, ["684"], df_samoa, transformations["AS"])

    output.write("]\n")
    output.close()


def write_usa_states():
    df = gpd.read_file(
        "input/natural_earth_countries/ne_10m_admin_1_states_provinces.shp"
    )
    df_countries = gpd.read_file(
        "input/natural_earth_countries/ne_10m_admin_0_countries.shp"
    )

    df = df[df["admin"] == "United States of America"]

    df_mainland = df[(df["name"] != "Alaska") & (df["name"] != "Hawaii")]
    df_alaska = df[df["name"] == "Alaska"]
    df_hawaii = df[df["name"] == "Hawaii"]
    df_puerto_rico = df_countries[df_countries["ADMIN"] == "Puerto Rico"]
    df_usvi = df_countries[df_countries["ADMIN"] == "United States Virgin Islands"]
    df_samoa = df_countries[df_countries["ADMIN"] == "American Samoa"]
    df_guam = df_countries[df_countries["ADMIN"] == "Guam"]
    df_nmi = df_countries[df_countries["ADMIN"] == "Northern Mariana Islands"]

    output = open_utf8("output/us-states.tsx", "w")

    output.write("export const usStates = {\n")

    for key in df_mainland["name"].unique():
        state_df = df_mainland[df_mainland["name"] == key]
        lowerCamelCased = key.split(" ")[0].lower() + "".join(
            word.capitalize() for word in key.split(" ")[1:]
        )
        output.write(f"{lowerCamelCased}: {{\npaths: [\n")
        write_paths(
            output,
            read_boundaries(state_df, union=True)[0],
        )
        output.write(f"],\nmeta:{meta_string(state_df)}\n}},\n")

    output.write("alaska: {\npaths: [\n")
    write_paths(
        output,
        read_boundaries(df_alaska, union=True)[0],
        transformation=transformations["AK"],
    )
    output.write(
        f"], meta: {meta_string(df_alaska,transformation=transformations["AK"])} }},\nhawaii: {{\npaths: [\n"
    )
    write_paths(
        output,
        read_boundaries(df_hawaii, union=True)[0],
        transformation=transformations["HI"],
    )
    output.write(
        f"], meta: {meta_string(df_hawaii,transformation=transformations["HI"])} }},\npuertoRico: {{\npaths: [\n"
    )
    write_paths(
        output,
        read_boundaries(df_puerto_rico, union=True)[0],
        transformation=transformations["PR"],
    )
    output.write(
        f"], meta: {meta_string(df_puerto_rico,transformation=transformations["PR"])} }},\nvirginIslands: {{\npaths: [\n"
    )
    write_paths(
        output,
        read_boundaries(df_usvi, union=True)[0],
        transformation=transformations["VI"],
    )
    output.write(
        f"], meta: {meta_string(df_usvi,transformation=transformations["VI"])} }},\namericanSamoa: {{\npaths: [\n"
    )
    write_paths(
        output,
        read_boundaries(df_samoa, union=True)[0],
        transformation=transformations["AS"],
    )
    output.write(
        f"], meta: {meta_string(df_samoa,transformation=transformations["AS"])} }},\nguam: {{\npaths: [\n"
    )
    write_paths(
        output,
        read_boundaries(df_guam, union=True)[0],
        transformation=transformations["GU"],
    )
    output.write(
        f"], meta: {meta_string(df_guam,transformation=transformations["GU"])} }},\nnorthernMarianaIslands: {{\npaths: [\n"
    )
    write_paths(
        output,
        read_boundaries(df_nmi, union=True)[0],
        transformation=transformations["CNMI"],
    )
    output.write(
        f"], meta: {meta_string(df_nmi,transformation=transformations["CNMI"])} }}\n}};\n"
    )

    output.close()


# write_usa_phone()
# write_usa()
# write_usa_first_administrative()
write_usa_states()
