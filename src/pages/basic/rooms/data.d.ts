import { AreaListItem } from "../areas/data";
import { ChargeRuleListItem } from "../chargeRules/data";
import { CategoryListItem } from "../categories/data";

export interface RoomFormValueType {
  title: string;
  building: string;
  unit: string;
  number: number;
  area_id: string;
  category_id: string;
  charge_rule_id?: string;
  remark?: string | undefined;
}

export interface RoomListItem {
  id: string;
  title: string;
  unit: string;
  building: string;
  area?: AreaListItem;
  category?: CategoryListItem;
  charge_rule?: ChargeRuleListItem;
  number: number;
  remark: string | undefined;
  deleted_at?: Date | null;
  updated_at?: Date;
  created_at?: Date;
}

export interface RoomListParams {
  title?: string;
  building?: string;
  unit?: string;
  status?: string;
  pageSize?: number;
  current?: number;
}
