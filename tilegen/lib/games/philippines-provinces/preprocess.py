import geopandas as gpd
import sys
import os

# I am a living code smell, ik...
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
# pylint: disable=wrong-import-position disable=import-error
from label_quiz_preprocess import preprocess

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
df["label"] = df["name"]
df["is_province"] = df["type_en"] == "Province"
df = df.sort_values(["is_province"], ascending=False)

preprocess(df, output)
