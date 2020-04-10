export interface SearchItems {
  [key: string]: {
    label: string,
    type: 'input' | 'select' | 'multi-select' | 'radio',
    options?: {
      [k: string]: string | number
    }
  }
}


export interface ResponseListData {
  data: any
  meta: {
    total: number;
    current_page: number;
    per_page: number;
  }
}
