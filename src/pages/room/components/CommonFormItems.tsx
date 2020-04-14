import React, { useEffect, useState } from 'react';
import FormItem from 'antd/lib/form/FormItem';
import { Select, Input, InputNumber } from 'antd';
import { queryArea } from '@/pages/area/service';
import { AreaListItem } from '@/pages/area/data';

const CommonFormItems = () => {
  const [categories, setCategories] = useState<Array<any>>([])
  const [areas, setAreas] = useState<Array<AreaListItem>>([])

  useEffect(() => {
    (async () => {
      const areaRes = await queryArea()
      if (areaRes.data) {
        setAreas(areaRes.data)
      }
    })()
  }, [])

  return (
    <>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="区域"
        rules={[{ required: true, message: "必须选择" }]}
        name="area_id">
        <Select placeholder="请选择">
          {areas.map(area => (
            <Select.Option key={`areas-${area.id}`} value={area.id}>{area.title}</Select.Option>
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
          <Select.Option value={1}>租赁</Select.Option>
          <Select.Option value={2}>新员工</Select.Option>
          <Select.Option value={3}>单身职工</Select.Option>
          <Select.Option value={4}>派遣工</Select.Option>
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
