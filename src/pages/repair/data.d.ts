import { AreaListItem } from "../basic/areas/data";

export interface Member {
  avatar: string;
  name: string;
  id: string;
}

export interface RepairListItem {
  id: number;
  area: AreaListItem;
  location: string;
  content: string;
  name: string;
  phone: string;
  payer: string; // 付款人（公司、个人）
  inputer: any;
  report_at: Date | string | undefined;
  reviewer: any;
  reviewed_at: Date | string | undefined;
  is_passed: boolean;
  printed_at: Date | string | undefined;
  finished_at: Date | string | undefined;
  repairer: string | undefined;
  created_at: Date | string | undefined;
  updated_at: Date | string | undefined;
}
