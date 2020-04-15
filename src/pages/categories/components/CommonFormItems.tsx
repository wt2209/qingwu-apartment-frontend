import React from 'react';
import FormItem from 'antd/lib/form/FormItem';
import { Select, Input } from 'antd';
import { typeMapper } from '../mapper';

const CommonFormItems = () => {
  return (
    <>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="名称"
        name="title"
        rules={[{ required: true, message: '请输入名称！' }]}
      >
        <Input placeholder="请输入" />
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="类别"
        rules={[{ required: true, message: "必须选择" }]}
        name="type">
        <Select placeholder="请选择">
          {Object.keys(typeMapper).map(key => (
            <Select.Option key={key} value={key}>{typeMapper[key]}</Select.Option>
          ))}
        </Select>
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="水电收费方式"
        name="utility_type"
      >
        <Input placeholder="请输入" />
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="备注"
        name="remark"
      >
        <Input.TextArea placeholder="请输入" />
      </FormItem>
    </>
  )
}

export default CommonFormItems;
