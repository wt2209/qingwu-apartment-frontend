// 已房间为主题，计算出来的 “居住情况”
export interface LivingListItem {
  id: number;
  title: string;
  building: string;
  unit: string;
  number: number; // 最大人数
  remark: string; // 房间备注
  records: RecordListItem[];
}

export interface BuildingTreeItem {
  building: string;
  units: string[];
}
