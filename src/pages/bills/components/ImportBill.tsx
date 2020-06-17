import React from 'react'
import { Modal, Card, Upload, message } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import XLSX from 'xlsx';

interface Props {
  modalVisible: boolean;
  onOk: (records: any) => void;
  onCancel: () => void;
}

const ImportBill = (props: Props) => {
  const { modalVisible, onOk, onCancel } = props

  return (
    <Modal
      destroyOnClose
      title="导入费用"
      visible={modalVisible}
      onOk={onOk}
      okText="确定"
      cancelText="取消"
      onCancel={() => onCancel()}
    >
      <Card bordered={false}>
        {
          FileReader
            ? <Upload.Dragger
              multiple={false}
              accept=".xls,.xlsx"
              beforeUpload={(currentFile) => {
                const reader = new FileReader();
                const hide = message.info('正在读取文件...')
                reader.onload = (e: any) => {
                  hide()
                  const fileData = new Uint8Array(e.target.result);
                  const workbook = XLSX.read(fileData, { type: 'array' });
                  const sheet = workbook.Sheets[workbook.SheetNames[0]]
                  const data = XLSX.utils.sheet_to_json(sheet)
                  console.log(data)
                };
                reader.readAsArrayBuffer(currentFile);
                // setFile(currentFile)
                // const data = XLSX.readFile(currentFile)
                return false
              }}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">点击此处，或将文件拖拽到此处</p>
              <p className="ant-upload-hint">
                仅支持Excel文件（扩展名为xls和xlsx的文件）
              </p>
            </Upload.Dragger>
            : <span style={{ color: 'red' }}>此浏览器不支持导入功能，请更换浏览器</span>
        }
      </Card>
    </Modal >
  )
}

export default ImportBill
