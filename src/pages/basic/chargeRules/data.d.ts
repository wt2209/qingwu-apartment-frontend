export interface ChargeRuleListItem {
  id: string;
  title: string;
  type: string;
  way: string;
  rule: ChargeRule[];
  period: number;
  remark: string;
  updated_at: Date | undefined;
  created_at: Date | undefined;
  deleted_at: Date | undefined;
}

export interface ChargeRule {
  title: string;
  fee: number[];
  turn_in: boolean;
  rate: string;
}

export interface ChargeRuleListParams {
  type?: 'person' | 'company' | 'other';
  way?: 'before' | 'after';
  pageSize?: number;
  current?: number;
}
