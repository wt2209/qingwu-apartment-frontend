import React, { useState } from 'react';
import FormItem from 'antd/lib/form/FormItem';
import { Select, Input, InputNumber, Form, Button, Switch } from 'antd';

const CommonFormItems = () => {
  const [chargeCount, setChargeCount] = useState(0)

  const chargeGroups = []
  for (let i = 0; i < chargeCount; i += 1) {
    chargeGroups.push(
      <Input.Group key={i} compact style={{ display: 'flex', marginBottom: 4 }}>
        <Form.Item
          name={['charge_rule', i, 'name']}
          noStyle
          rules={[{ required: true, message: '必须选择收费项目' }]}
        >
          <Select
            style={{ width: 120 }}
            showSearch
            allowClear
            optionFilterProp="children"
            placeholder="选择收费项目">
            <Select.Option value="1">浙江</Select.Option>
            <Select.Option value="2">江苏</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name={['charge_rule', i, 'fee']}
          noStyle
          rules={[{ required: true, message: '必须填写费用' }]}
        >
          <Input style={{ flex: 1 }} placeholder="请输入不同年份的月度费用" />
        </Form.Item>
        <Form.Item
          name={['charge_rule', i, 'rate']}
          noStyle
          rules={[{ required: true, message: '必须填写费用' }]}
        >
          <InputNumber
            style={{ width: 80 }}
            min={0}
            max={100}
            step={0.1}
            formatter={value => value ? `${value}%` : ''}
            parser={value => value ? value.replace('%', '') : 0}
            placeholder="滞纳金率" />
        </Form.Item>
        <Form.Item style={{ margin: '0 5px' }}>
          <Switch checkedChildren="上交" unCheckedChildren="自留" defaultChecked />
        </Form.Item>
        {i === chargeCount - 1
          ? <Button type="link" onClick={() => setChargeCount(() => chargeCount - 1)}>删除</Button>
          : <span style={{ width: 60 }} />
        }
      </Input.Group>
    )
  }

  return (
    <>
      <FormItem
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        label="名称"
        name="title"
        rules={[{ required: true, message: '请输入名称！' }]}
      >
        <Input placeholder="请输入" />
      </FormItem>
      <FormItem
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        label="缴费间隔"
        name="period"
        rules={[{ required: true, message: '请输入缴费间隔的月数' }]}
      >
        <InputNumber
          defaultValue={1}
          min={1}
          max={100}
          step={1}
          formatter={value => value ? `${value} 个月` : ''}
          parser={value => value ? value.replace(' 个月', '') : 1}
          placeholder="月数" />
      </FormItem>
      <FormItem
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        label="备注"
        name="remark"
      >
        <Input.TextArea placeholder="请输入" />
      </FormItem>
      <FormItem
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        label="房间收费项目"
        extra={
          <p>以空格或逗号分隔不同年份的月度费用，如: 600, 700, 800。<br />以上示例指第一年600元/月，第二年700元/月，第三年及以后800元/月</p>
        }
      >
        <Button type="link" onClick={() => { setChargeCount(() => chargeCount + 1) }}>添加一项</Button>
        {chargeGroups.map(item => item)}
      </FormItem>
    </>
  )
}

export default CommonFormItems;
