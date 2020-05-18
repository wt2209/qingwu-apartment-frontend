import React from 'react';
import { Input, Form } from 'antd';

const CommonFormItems = () => (
  <>
    <Form.Item
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 15 }}
      label="区域名称"
      name="title"
      rules={[{ required: true, message: '请输入区域名称！' }]}
    >
      <Input placeholder="请输入" />
    </Form.Item>
    <Form.Item
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 15 }}
      label="描述"
      name="description"
    >
      <Input.TextArea placeholder="请输入" />
    </Form.Item>
  </>
)

export default CommonFormItems;
