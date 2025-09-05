import geopandas as gpd
import sys

output = sys.argv[1]

df = gpd.read_file("input/ne/states/ne_10m_admin_1_states_provinces.shp")
df = df[df["admin"] == "Philippines"]

# Merge independent cities into surrounding province
df["iso_3166_2"] = df["iso_3166_2"].where(
    ~df["iso_3166_2"].isin(["PH-LAP", "PH-MDE"]), other="PH-CEB"
)
df["iso_3166_2"] = df["iso_3166_2"].where(
    ~df["iso_3166_2"].isin(["PH-BCD"]), other="PH-NEC"
)

df["id"] = df["iso_3166_2"]
df["label"] = df["name_en"]
df["is_province"] = df["type_en"] == "Province"
df = df.sort_values(["is_province"], ascending=False)

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

df[["geometry", "label", "center_lng", "center_lat"]].to_file(output, driver="GeoJSON")
