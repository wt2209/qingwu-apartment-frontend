export interface SearchItems {
  [key: string]: {
    label: string,
    type: 'input' | 'select' | 'multi-select' | 'radio',
    options?: {
      [k: string]: string | number
    }
  }
}
