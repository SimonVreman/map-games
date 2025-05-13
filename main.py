import unicodedata
from functools import partial
import math
import geopandas as gpd
import shapely

open_utf8 = partial(open, encoding="UTF-8")

mercator_reach = 85.05112877980659
x_domain = 1000
rounding = 3
simplify = 0.01


class BoundaryPaths:
    def __init__(self, exterior: list[float], interiors: list[list[float]] = None):
        self.exterior = exterior
        self.interiors = interiors


def lat_lon_to_mercator(lat, lon):
    # Convert latitude and longitude from degrees to radians
    lat_rad = math.radians(lat)
    lon_rad = math.radians(lon)

    # Mercator projection formulas
    x = math.pi + lon_rad  # x coordinate in radians
    y = math.pi - math.log(
        math.tan(math.pi / 4 + lat_rad / 2)
    )  # y coordinate in radians

    x *= x_domain / (2 * math.pi)  # Scale x to the domain
    y *= x_domain / (2 * math.pi)  # Scale y to the domain

    return (x, y)


def read_boundaries(
    df: gpd.GeoDataFrame, union=False
) -> tuple[list[BoundaryPaths], tuple[float, float]]:
    # Explode the multipolygon into individual polygons
    df = df.explode()

    # Filter out polygons with area less than a certain threshold
    # This is an arbitrary threshold to filter out small geometries
    df = df[df.geometry.apply(lambda x: x.area > 1e-5)]
    union_geometry = df.geometry.union_all()

    # Convert the geometries to a list of simplified paths
    boundaries: list[BoundaryPaths] = []
    geometries = [union_geometry] if union else df.geometry.to_list()

    for shape in geometries:
        polygons = (
            [shape]
            if isinstance(shape, shapely.Polygon)
            else shape.geoms if isinstance(shape, shapely.MultiPolygon) else []
        )

        for polygon in polygons:
            simplified = polygon.simplify(simplify)
            if not isinstance(simplified, shapely.Polygon):
                continue
            boundaries.append(
                BoundaryPaths(
                    list(simplified.exterior.coords),
                    [i.coords for i in list(simplified.interiors)],
                )
            )

    representative = union_geometry.representative_point()

    return boundaries, lat_lon_to_mercator(representative.y, representative.x)


def unioned_or_largest(geometry):
    unioned = shapely.unary_union(geometry)

    if isinstance(unioned, shapely.geometry.polygon.Polygon):
        return unioned

    return max(unioned.geoms, key=lambda polygon: polygon.area)


def read_internal_boundaries(df: gpd.GeoDataFrame) -> list[BoundaryPaths]:
    indexed = df.reset_index(drop=False)
    indexed["geometry"] = indexed.apply(
        lambda row: unioned_or_largest(row.geometry),
        axis=1,
    )
    crossed = indexed.merge(indexed, how="cross")
    crossed = crossed[(crossed["index_x"] > crossed["index_y"])]

    crossed["intersection"] = crossed.apply(
        lambda row: shapely.line_merge(
            shapely.intersection(row.geometry_x, row.geometry_y, grid_size=0.01),
        ),
        axis=1,
    )

    paths = []
    for line in crossed["intersection"].to_list():
        lines = [line] if isinstance(line, shapely.LineString) else line.geoms
        paths.extend(
            [BoundaryPaths(list(line.simplify(simplify).coords)) for line in lines]
        )

    return paths


def path_to_string(path: list[float]) -> str:
    result = "M"
    is_first = True

    for lon, lat in path:
        if is_first:
            is_first = False
        else:
            result += " L"

        x, y = lat_lon_to_mercator(lat, lon)
        result += f" {round(x, rounding)} {round(y, rounding)}"

    return result


def write_paths(output, boundaries: list[BoundaryPaths], close=True, interiors=False):
    for boundary in boundaries:
        output.write(
            f'<path d="{path_to_string(boundary.exterior)}{' Z' if close else ''}'
        )

        if interiors and boundary.interiors:
            for interior in boundary.interiors:
                output.write(f" {path_to_string(interior)} Z")

        output.write('" />\n')


def normalize_string(s):
    s = s.lower()
    s = "".join(
        c for c in unicodedata.normalize("NFD", s) if unicodedata.category(c) != "Mn"
    )
    s = s.replace("’", "'").replace("´", "'").replace("`", "'")
    return s
