import React from 'react'
import { Form, Input, Select, InputNumber } from 'antd'
import { AreaListItem } from '@/pages/basic/areas/data';
import { FeeTypeListItem } from '@/pages/basic/feeTypes/data';

interface Props {
  areas: AreaListItem[] | undefined;
  feeTypes: FeeTypeListItem[] | undefined;
}

const FormItem = Form.Item
const itemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 15 },
};

const CommonFormItems = (props: Props) => {
  const { areas, feeTypes } = props
  return (
    <>
      <FormItem
        {...itemLayout}
        label="区域"
        name="area_id"
        rules={[{ required: true, message: '请选择' }]}
      >
        <Select placeholder="请选择">
          {areas?.map(area => (
            <Select.Option key={area.id} value={area.id}>{area.title}</Select.Option>
          ))}
        </Select>
      </FormItem>
      <FormItem
        {...itemLayout}
        label="房间/位置"
        name="location"
        rules={[{ required: true, message: '请输入' }]}
      >
        <Input placeholder="请输入" />
      </FormItem>
      <FormItem
        {...itemLayout}
        label="姓名"
        name="name"
      >
        <Input placeholder="请输入" />
      </FormItem>
      <FormItem
        {...itemLayout}
        label="费用类型"
        name="fee_type_id"
        rules={[{ required: true, message: '请选择' }]}
      >
        <Select placeholder="请选择">
          {feeTypes?.map(type => (
            <Select.Option key={type.id} value={type.id}>{type.title}</Select.Option>
          ))}
        </Select>
      </FormItem>
      <FormItem
        {...itemLayout}
        label="金额"
        name="money"
      >
        <InputNumber precision={2} placeholder="请输入" />
      </FormItem>
      <FormItem
        {...itemLayout}
        label="费用说明"
        name="description"
      >
        <Input placeholder="请输入" />
      </FormItem>
    </>
  )
}

export default CommonFormItems
