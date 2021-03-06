import { AreaListItem } from "../basic/areas/data";
import { CategoryListItem } from "../basic/categories/data";
import { RecordListItem } from "../basic/records/data";

// 以房间为主题，计算出来的 “居住情况”
export interface LivingListItem {
  id: string;
  area_id: number;
  category_id: number;
  area: AreaListItem;
  category: CategoryListItem;
  title: string;
  building: string;
  unit: string;
  number: number; // 最大人数
  remark: string; // 房间备注
  records: RecordListItem[];
  created_at: Date | null;
  updated_at: Date | null;
}

export interface LivingFetchParams {
  page?: number;
  area_id?: number | string;
  category_id?: number | string;
  area?: string;
  building?: string;
  unit?: string;
  keyword?: string;
}

export interface BuildingTreeItem {
  building: string;
  units: string[];
}
