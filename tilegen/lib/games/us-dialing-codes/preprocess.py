import geopandas as gpd
import pandas as pd
import math
import sys
import shapely

output = sys.argv[1]

df = gpd.read_file("input/usa/areacode.gdb")
npa = pd.read_csv("input/usa/npa_report.csv", skiprows=1)

compiled = []

for key in df["AREA_CODE"].unique():
    code_df = df[df["AREA_CODE"] == key]
    npa_df = npa[npa["NPA_ID"] == int(key)]
    state = code_df["STATE"].iat[0]
    parent = npa_df["PARENT_NPA_ID"].iat[0]
    parent = "" if math.isnan(parent) or str(int(parent)) == key else str(int(parent))
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

    compiled.append(
        {
            "id": "/".join(overlay_codes),
            "geometry": code_df.union_all(),
        }
    )

# American Samoa is not included in the dataset, handle separately
df_samoa = gpd.read_file("input/ne/countries/ne_10m_admin_0_countries_nld.shp")

compiled.append(
    {
        "id": "684",
        "geometry": df_samoa[df_samoa["ADMIN"] == "American Samoa"].union_all(),
    }
)

df = gpd.GeoDataFrame(compiled, crs=df.crs)
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
