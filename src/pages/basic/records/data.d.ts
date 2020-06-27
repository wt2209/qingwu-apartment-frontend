import { UploadFile } from "antd/lib/upload/interface";
import { CategoryListItem } from "../categories/data";
import { AreaListItem } from "../areas/data";
import { CompanyListItem } from "../companies/data";
import { RoomListItem } from "../rooms/data";

export interface RecordListItem {
  id: string;
  room: RoomListItem;
  to_room?: RoomListItem;
  area: AreaListItem;
  category: CategoryListItem;
  type: 'person' | 'company' | 'functional';
  record_at?: Date;
  person?: PersonListItem;
  company?: CompanyListItem;
  functional_title: string;
  rent_start?: Date;
  rent_end?: Date;
  charged_to?: Date; // 费用已生成至
  proof_files: UploadFile<any>[];
}

export interface RecordListParams {
  status?: 'living' | 'quitted' | 'moved';
  area_id?: string;
  category_id?: string;
  room?: string;
  name?: string; // 姓名
  identify?: string;
  company_name?: number;
  pageSize?: number;
  current?: number;
}
