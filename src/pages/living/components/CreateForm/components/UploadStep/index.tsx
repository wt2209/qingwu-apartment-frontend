import React from 'react';
import { Upload, Form } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

interface Props {
  itemLayout: any;
}

const UploadStep = (props: Props) => {
  const { itemLayout } = props
  const normFile = (e: { fileList: any; }) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <Form.Item {...itemLayout} name="dragger" valuePropName="fileList" noStyle getValueFromEvent={normFile} label="上传入住凭证">
      <Upload.Dragger name="files" action="/upload.do">
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">点击或将文件拖动到此区域</p>
        <p className="ant-upload-hint">可上传一个或多个文件</p>
      </Upload.Dragger>
    </Form.Item>
  )
}

export default UploadStep
