import React from 'react';
import FormItem from 'antd/lib/form/FormItem';
import { Input } from 'antd';

const CommonFormItems = () => (
  <>
    <FormItem
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 15 }}
      label="区域名称"
      name="title"
      rules={[{ required: true, message: '请输入区域名称！' }]}
    >
      <Input placeholder="请输入" />
    </FormItem>
    <FormItem
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 15 }}
      label="描述"
      name="description"
    >
      <Input.TextArea placeholder="请输入" />
    </FormItem>
  </>
)

export default CommonFormItems;
