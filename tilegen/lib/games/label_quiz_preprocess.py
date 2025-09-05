import geopandas as gpd


def preprocess(df: gpd.GeoDataFrame, output: str):
    df = df.dissolve(by=["id"])

    if "label" not in df:
        df["label"] = df["id"]

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

    df[["geometry", "label", "center_lng", "center_lat"]].to_file(
        output, driver="GeoJSON"
    )
