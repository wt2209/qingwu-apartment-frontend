export interface SearchItems {
  [key: string]: {
    label: string,
    type: 'input' | 'select' | 'multi-select' | 'radio',
    default?: string;
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

export interface ExportRender {
  exportRender?: (row: T) => string | number
}
