import React from 'react'
import { Form, Input, Select, InputNumber, DatePicker } from 'antd'
import { AreaListItem } from '@/pages/basic/areas/data';
import { FeeTypeListItem } from '@/pages/basic/feeTypes/data';
import { chargeWays } from '..';

interface Props {
  areas: AreaListItem[] | undefined;
  feeTypes: FeeTypeListItem[] | undefined;
  hasCharged: boolean;
}

const FormItem = Form.Item
const itemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 15 },
};

const types = [
  { value: 'person', label: '个人费用' },
  { value: 'company', label: '公司或机构费用' },
  { value: 'other', label: '其他费用' },
]

const CommonFormItems = (props: Props) => {
  const { areas, feeTypes, hasCharged } = props
  return (
    <>
      <FormItem
        {...itemLayout}
        label="类型"
        name="type"
        rules={[{ required: true, message: '请选择' }]}
      >
        <Select placeholder="请选择">
          {types.map(type => (
            <Select.Option key={type.value} value={type.value}>{type.label}</Select.Option>
          ))}
        </Select>
      </FormItem>
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
        name="title"
        rules={[{ required: true, message: '请选择' }]}
      >
        <Select
          placeholder="请选择"
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option?.children.indexOf(input) >= 0
          }
        >
          {feeTypes?.map(type => (
            <Select.Option key={type.id} value={type.title}>{type.title}</Select.Option>
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
        <Input.TextArea placeholder="请输入" />
      </FormItem>
      <FormItem {...itemLayout} style={{ marginBottom: 0 }} label="滞纳金">
        <Input.Group compact style={{ display: 'flex' }}>
          <FormItem name="late_rate">
            <InputNumber placeholder="滞纳金率" precision={2} step={0.1} formatter={value => value ? `${value}%` : ''} />
          </FormItem>
          <FormItem name="late_base">
            <InputNumber style={{ width: 100 }} placeholder="基数" precision={2} step={1} />
          </FormItem>
          <FormItem name="late_date">
            <DatePicker placeholder="开始收取日期" />
          </FormItem>
        </Input.Group>
      </FormItem>
      <FormItem
        {...itemLayout}
        label="最晚缴费时间"
        name="should_charge_at"
        extra="应于此日期前缴费, 否则将产生滞纳金"
      >
        <DatePicker placeholder="缴费时间" />
      </FormItem>
      {
        hasCharged
          ? <>
            <FormItem
              {...itemLayout}
              label="缴费时间"
              name="charged_at"
            >
              <DatePicker placeholder="缴费时间" />
            </FormItem>
            <FormItem
              {...itemLayout}
              label="缴费方式"
              name="charge_way"
            >
              <Select placeholder="请选择">
                {chargeWays.map(way => (
                  <Select.Option key={way} value={way}>{way}</Select.Option>
                ))}
              </Select>
            </FormItem>
          </>
          : null
      }
    </>
  )
}

export default CommonFormItems
