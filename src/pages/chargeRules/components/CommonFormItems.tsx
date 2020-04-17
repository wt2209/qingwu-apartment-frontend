import React, { useState, useEffect } from 'react';
import { Select, Input, InputNumber, Form, Button, Switch } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { ChargeRuleWayMapper, ChargeRuleTypeMapper } from '../mapper';
import { FeeTypeListItem } from '@/pages/feeTypes/data';
import { getAllFeeTypes } from '@/pages/feeTypes/service';

interface Props {
  form: FormInstance;
  rulesCount: number;
}

const CommonFormItems = (props: Props) => {
  const [feeTypes, setFeeTypes] = useState<FeeTypeListItem[]>([])
  const [rulesCount, setRulesCount] = useState(props.rulesCount)
  useEffect(() => {
    (async () => {
      const res = await getAllFeeTypes()
      if (res && res.data) {
        setFeeTypes(res.data)
      }
    })()
  }, [])

  const handleNameChange = (index: number, value: string) => {
    const type = feeTypes.find(item => item.title === value)
    if (type) {
      props.form.setFieldsValue({
        rule: {
          ...props.form.getFieldsValue().rule,
          [index]: {
            title: type.title,
            rate: type.rate,
            turn_in: !!type.turn_in,
          }
        }
      })
    }
  }

  const ruleGroups = []
  for (let i = 0; i < rulesCount; i += 1) {
    ruleGroups.push(
      <Input.Group key={i} compact style={{ display: 'flex', marginBottom: 4 }}>
        <Form.Item
          name={['rule', i, 'title']}
          style={{ margin: 0, padding: 0 }}
          rules={[{ required: true, message: '必须选择' }]}
        >
          <Select
            style={{ width: 120 }}
            showSearch
            allowClear
            placeholder="选择收费项目"
            onChange={(value: string) => handleNameChange(i, value)}>
            {feeTypes.map(type =>
              <Select.Option key={type.id} value={type.title}>{type.title}</Select.Option>
            )}
          </Select>
        </Form.Item>
        <Form.Item
          name={['rule', i, 'fee']}
          style={{ margin: 0, padding: 0 }}
          rules={[{ required: true, message: '必须填写' }]}
        >
          <Input style={{ width: 200 }} placeholder="请输入不同年份的月度费用" />
        </Form.Item>
        <Form.Item
          name={['rule', i, 'rate']}
          style={{ margin: 0, padding: 0 }}
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
        <Form.Item
          name={['rule', i, 'turn_in']}
          style={{ margin: '0 5px' }}
          valuePropName="checked">
          <Switch checkedChildren="上交" unCheckedChildren="自留" style={{ width: 60 }} />
        </Form.Item>
        {i === rulesCount - 1
          ? <Button type="link" onClick={() => setRulesCount(() => rulesCount - 1)}>删除</Button>
          : <span style={{ width: 60 }} />
        }
      </Input.Group>
    )
  }

  return (
    <>
      <Form.Item
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        label="名称"
        name="title"
        rules={[{ required: true, message: '请输入名称！' }]}
      >
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        label="缴费间隔"
        name="period"
        rules={[{ required: true, message: '请输入缴费间隔的月数' }]}
      >
        <InputNumber
          min={1}
          max={100}
          step={1}
          formatter={value => value ? `${value} 个月` : ''}
          parser={value => value ? value.replace(' 个月', '') : 1}
          placeholder="月数" />
      </Form.Item>
      <Form.Item
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        label="所属类型"
        name="type"
        rules={[{ required: true, message: '必须选择所属类型' }]}
      >
        <Select
          style={{ width: 200 }}
          showSearch
          allowClear
          optionFilterProp="children"
          placeholder="选择所属类型">
          {Object.keys(ChargeRuleTypeMapper).map(type => (
            <Select.Option key={type} value={type}>{ChargeRuleTypeMapper[type]}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        label="交费方式"
        name="way"
        rules={[{ required: true, message: '必须选择交费方式' }]}
      >
        <Select
          style={{ width: 200 }}
          showSearch
          allowClear
          optionFilterProp="children"
          placeholder="选择交费方式">
          {Object.keys(ChargeRuleWayMapper).map(type => (
            <Select.Option key={type} value={type}>{ChargeRuleWayMapper[type]}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        label="备注"
        name="remark"
      >
        <Input.TextArea placeholder="请输入" />
      </Form.Item>
      <Form.Item
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        label="房间收费项目"
        extra={
          <p>以空格或逗号分隔不同年份的月度费用，如: 600, 700, 800。<br />以上示例指第一年600元/月，第二年700元/月，第三年及以后800元/月</p>
        }
      >
        <Button type="link" onClick={() => { setRulesCount(() => rulesCount + 1) }}>添加一项</Button>
        {ruleGroups.map(item => item)}
      </Form.Item>
    </>
  )
}

export default CommonFormItems;
