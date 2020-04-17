import React from 'react';
import FormItem from 'antd/lib/form/FormItem';
import { Input, InputNumber, Switch } from 'antd';

const CommonFormItems = () => {
  return (
    <>
      <FormItem
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 15 }}
        label="费用名称"
        name="title"
        rules={[{ required: true, message: '请输入名称！' }]}
      >
        <Input placeholder="请输入" />
      </FormItem>
      <FormItem
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 15 }}
        label="是否上交"
        name="turn_in"
        valuePropName="checked"
        rules={[{ required: true, message: '必须选择是否上交' }]}
      >
        <Switch checkedChildren="上交" unCheckedChildren="自留" defaultChecked />
      </FormItem>
      <FormItem
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 15 }}
        label="每日滞纳金率"
        name="rate"
      >
        <InputNumber
          style={{ width: 80 }}
          min={0}
          max={100}
          step={0.1}
          formatter={value => value ? `${value}%` : ''}
          parser={value => value ? value.replace('%', '') : 0}
          placeholder="滞纳金率" />
      </FormItem>
      <FormItem
        labelCol={{ span: 6 }}
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
