import React from 'react';
import { Select, Input, InputNumber, Form } from 'antd';
import { AreaListItem } from '@/pages/area/data';
import { CategoryListItem } from '@/pages/categories/data';
import { ChargeRuleListItem } from '@/pages/chargeRules/data';

interface Props {
  areas: AreaListItem[] | undefined;
  categories: CategoryListItem[] | undefined;
  chargeRules?: ChargeRuleListItem[];
}

const CommonFormItems = (props: Props) => {
  return (
    <>
      <Form.Item
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="区域"
        rules={[{ required: true, message: "必须选择" }]}
        name="area_id">
        <Select placeholder="请选择">
          {props.areas && props.areas.map(area => (
            <Select.Option key={area.id} value={area.id}>{area.title}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="类型"
        rules={[{ required: true, message: "必须选择" }]}
        name="category_id">
        <Select placeholder="请选择">
          {props.categories && props.categories.map(category => (
            <Select.Option key={category.id} value={category.id}>{category.title}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="房间号"
        name="title"
        rules={[{ required: true, message: '请输入房间号！' }]}
      >
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="楼号"
        name="building"
        rules={[{ required: true, message: '请输入楼号！' }]}
      >
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="单元"
        name="unit"
        rules={[{ required: true, message: '请输入单元！' }]}
      >
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="房间人数"
        name="number"
        rules={[{ required: true, message: '请输入房间最大人数！' }]}
      >
        <InputNumber min={1} placeholder="请输入" />
      </Form.Item>
      <Form.Item
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="默认收费规则"
        name="charge_rule_id"
      >
        <Select placeholder="请选择">
          {props.chargeRules?.map(rule => (
            <Select.Option key={rule.id} value={rule.id}>{rule.title}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="备注"
        name="remark"
      >
        <Input.TextArea placeholder="请输入" />
      </Form.Item>
    </>
  )

}


export default CommonFormItems;
