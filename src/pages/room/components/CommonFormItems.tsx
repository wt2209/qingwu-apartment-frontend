import React from 'react';
import FormItem from 'antd/lib/form/FormItem';
import { Select, Input, InputNumber } from 'antd';
import { AreaListItem } from '@/pages/area/data';
import { CategoryListItem } from '@/pages/categories/data';

interface Props {
  areas: AreaListItem[] | undefined;
  categories: CategoryListItem[] | undefined;
}

const CommonFormItems = (props: Props) => {
  return (
    <>
      <FormItem
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
      </FormItem>
      <FormItem
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
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="房间号"
        name="title"
        rules={[{ required: true, message: '请输入房间号！' }]}
      >
        <Input placeholder="请输入" />
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="楼号"
        name="building"
        rules={[{ required: true, message: '请输入楼号！' }]}
      >
        <Input placeholder="请输入" />
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="单元"
        name="unit"
        rules={[{ required: true, message: '请输入单元！' }]}
      >
        <Input placeholder="请输入" />
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="房间人数"
        name="number"
        rules={[{ required: true, message: '请输入房间最大人数！' }]}
      >
        <InputNumber min={1} placeholder="请输入" />
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
