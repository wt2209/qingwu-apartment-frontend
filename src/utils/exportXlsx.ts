import { message } from "antd";
import { WritingOptions } from "xlsx/types";
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const saveXlsx = (data: Array<any>, columns: Array<any>, filename: string) => {
  const hide = message.info('正在生成文件...')
  const excelData = data.map((row: any) => {
    const result = {}
    for (let i = 0; i < columns.length; i += 1) {
      const column = columns[i];
      if (column?.hideInExport !== true) {
        if (column.exportRender) {
          result[column.title] = column.exportRender(row)
        } else if (column.dataIndex) {
          result[column.title] = row[column.dataIndex]
        }
      }
    }
    return result
  })
  const workbook = XLSX.utils.book_new();
  const sheet = XLSX.utils.json_to_sheet(excelData)
  XLSX.utils.book_append_sheet(workbook, sheet, 'Sheet1');
  const wopts: WritingOptions = { bookType: 'xlsx', bookSST: false, type: "array" };
  const wbout = XLSX.write(workbook, wopts);
  /* the saveAs call downloads a file on the local machine */
  saveAs(new Blob([wbout], { type: "application/octet-stream" }), `${filename}.xlsx`);
  hide()
  message.success('文件下载成功')
}

export const exportXlsx = async (params: any, columns: Array<any>, exportQueryFunc: (params: any) => Promise<any>, filename: string) => {
  const hide = message.info('正在获取数据...')
  const res = await exportQueryFunc({ ...params, export: 1 })
  hide()
  if (res && res.data) {
    saveXlsx(res.data, columns, filename)
  } else {
    message.error('数据请求发生错误')
  }
}

