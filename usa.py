import geopandas as gpd
import pandas as pd
from main import (
    open_utf8,
    read_boundaries,
    read_internal_boundaries,
    write_paths,
    Transformation,
)
import shapely

rounding = 3


# Shifts for far away regions
transformations = {
    "HI": Transformation([230, 100], 0.8),
    "AK": Transformation([160, 330], 0.4),
    "PR": Transformation([-10, -10]),
}


def write_usa():
    df = gpd.read_file(
        "input/natural_earth_countries/ne_10m_admin_1_states_provinces.shp"
    )
    df_countries = gpd.read_file(
        "input/natural_earth_countries/ne_10m_admin_0_countries.shp"
    )

    df = df[df["admin"] == "United States of America"]

    df_mainland = df[
        (df["name"] != "Alaska")
        & (df["name"] != "Hawaii")
        & (df["name"] != "Puerto Rico")
    ]
    df_alaska = df[df["name"] == "Alaska"]
    df_hawaii = df[df["name"] == "Hawaii"]
    df_puerto_rico = df_countries[df_countries["ADMIN"] == "Puerto Rico"]

    output = open_utf8("output/usa.path.txt", "w")

    boundaries, _ = read_boundaries(df_mainland, union=True)
    boundaries_alaska, _ = read_boundaries(df_alaska, union=True)
    boundaries_hawaii, _ = read_boundaries(df_hawaii, union=True)
    boundaries_puerto_rico, _ = read_boundaries(df_puerto_rico, union=True)

    write_paths(output, boundaries)
    write_paths(
        output,
        boundaries_alaska,
        transformation=transformations["AK"],
    )
    write_paths(
        output,
        boundaries_hawaii,
        transformation=transformations["HI"],
    )
    write_paths(
        output,
        boundaries_puerto_rico,
        transformation=transformations["PR"],
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


# Has overlaying codes, so we need to union them and exlculde these unioned areas from the other areas
def write_usa_phone():
    df = gpd.read_file("input/usa/areacode.gdb")
    npa = pd.read_csv("input/usa/npa_report.csv", skiprows=1)

    output = open_utf8("output/usa-dialing-codes.path.txt", "w")
    output.write("export const usPhoneCodes = [\n")

    for key in df["AREA_CODE"].unique():
        code_df = df[df["AREA_CODE"] == key]
        state = code_df["STATE"].values[0]
        transformation = transformations[state] if state in transformations else None

        overlay = npa[npa["NPA_ID"] == int(key)]["OVERLAY_COMPLEX"].values[0]
        if not isinstance(overlay, str):
            overlay = ""

        complex_codes = list(filter(lambda x: x not in (key, ""), overlay.split("/")))
        overlaying = df[df["AREA_CODE"].isin(complex_codes)].union_all()
        non_overlaying = shapely.difference(code_df.union_all(), overlaying)
        area_non_overlaying = non_overlaying.area

        if area_non_overlaying < 0.001:
            continue

        code_df = code_df.assign(geometry=non_overlaying)
        boundaries, center = read_boundaries(code_df, union=True)
        center = transformation.transform(center) if transformation else center

        output.write(
            f"{{ code: {key}, center: [{round(center[0], rounding)},{round(center[1], rounding)}], paths: ({'<>' if len(boundaries) > 1 else ''}"
        )

        write_paths(output, boundaries, transformation=transformation, interiors=True)
        output.write(f"{'</>' if len(boundaries) > 1 else ''})}},\n")

    output.write("]\n")
    output.close()


write_usa_phone()
# write_usa()
# write_usa_first_administrative()
