import geopandas as gpd
import sys
import os

# I am a living code smell, ik...
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
# pylint: disable=wrong-import-position disable=import-error
from label_quiz_preprocess import preprocess

output = sys.argv[1]

df = gpd.read_file("input/ne/states/ne_10m_admin_1_states_provinces.shp")
df = df[df["admin"] == "Vietnam"]

# Mergers July 2025
# https://www.vietnam-briefing.com/news/vietnams-government-introduces-official-plan-for-provincial-mergers.html/


merge_map = {
    # Tuyen Quang
    # Tuyen Quang, Ha Giang
    "VN-07": ["VN-07", "VN-03"],
    # Lao Cai
    # Lao Cai, Yen Bai
    "VN-02": ["VN-02", "VN-06"],
    # Thai Nguyen
    # Thai Nguyen, Bac Kan
    "VN-69": ["VN-69", "VN-53"],
    # Phu Tho
    # Phu Tho, Vinh Phuc, Hoa Binh
    "VN-68": ["VN-68", "VN-70", "VN-14"],
    # Bac Ninh
    # Bac Ninh, Bac Giang
    "VN-56": ["VN-56", "VN-54"],
    # Hung Yen
    # Hung Yen, Thai Binh
    "VN-66": ["VN-66", "VN-20"],
    # Hai Phong
    # Hai Phong, Hai Duong
    "VN-HP": ["VN-HP", "VN-61"],
    # Ninh Binh
    # Ninh Binh, Nam Dinh, Ha Nam
    "VN-18": ["VN-18", "VN-67", "VN-63"],
    # Quang Tri
    # Quang Binh, Quang Tri
    "VN-25": ["VN-24", "VN-25"],
    # Da Nang City
    # Da Nang, Quang Nam
    "VN-DN": ["VN-DN", "VN-27"],
    # Quang Ngai
    # Quang Ngai, Kon Tum
    "VN-29": ["VN-29", "VN-28"],
    # Gia Lai
    # Gia Lai, Binh Dinh
    "VN-30": ["VN-30", "VN-31"],
    # Khanh Hoa
    # Khanh Hoa, Ninh Thuan
    "VN-34": ["VN-34", "VN-36"],
    # Lam Dong
    # Lam Dong, Dak Nong, Binh Thuan
    "VN-35": ["VN-35", "VN-72", "VN-40"],
    # Dak Lak
    # Dak Lak, Phu Yen
    "VN-33": ["VN-33", "VN-32"],
    # Ho Chi Minh City (HCMC)
    # HCMC, Binh Duong, Ba Ria – Vung Tau
    "VN-SG": ["VN-SG", "VN-57", "VN-43"],
    # Dong Nai
    # Dong Nai, Binh Phuoc
    "VN-39": ["VN-39", "VN-58"],
    # Tay Ninh
    # Tay Ninh, Long An
    "VN-37": ["VN-37", "VN-41"],
    # Can Tho City
    # Can Tho, Soc Trang, Hau Giang
    "VN-CT": ["VN-52", "VN-73"],
    # Vinh Long
    # Ben Tre, Vinh Long, Tra Vinh
    "VN-49": ["VN-50", "VN-49", "VN-51"],
    # Dong Thap
    # Dong Thap, Tien Giang
    "VN-45": ["VN-45", "VN-46"],
    # Ca Mau
    # Ca Mau, Bac Lieu
    "VN-59": ["VN-59", "VN-55"],
    # An Giang
    # An Giang, Kien Giang
    "VN-44": ["VN-44", "VN-47"],
}


df["retained"] = df["iso_3166_2"].isin(merge_map.keys())
df = df.sort_values(["retained"], ascending=False)


def get_new_id(row):
    for new_id, old_ids in merge_map.items():
        if row["iso_3166_2"] in old_ids:
            return new_id
    return row["iso_3166_2"]


df["id"] = df.apply(get_new_id, axis=1)
df["label"] = df["name"]

preprocess(df, output)
