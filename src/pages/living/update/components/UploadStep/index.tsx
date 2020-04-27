import React from 'react';
import { Upload, Form } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { FILE_UPLOAD_URL } from '@/config';
import { removeFile } from '@/pages/living/service';

interface Props {
  itemLayout: any;
}

const UploadStep = (props: Props) => {
  const { itemLayout } = props
  const normFile = (e: { fileList: any; }) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  return (
    <Form.Item {...itemLayout} name="uploaded_files" valuePropName="fileList" noStyle getValueFromEvent={normFile} label="上传入住凭证">
      <Upload.Dragger
        accept='.xls,.xlsx,.doc,.docx,.pdf,.txt,.jpg,.jpeg,.png,.gif'
        name="file"
        listType='picture'
        multiple
        onRemove={(file) => {
          if (file.response.path) {
            removeFile(file.response.path)
          }
        }}
        headers={{
          Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
        }}
        action={FILE_UPLOAD_URL}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">点击或将文件拖动到此区域</p>
        <p className="ant-upload-hint">可上传一个或多个文件</p>
      </Upload.Dragger>
    </Form.Item >
  )
}

export default UploadStep
