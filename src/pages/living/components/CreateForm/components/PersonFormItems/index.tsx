import { Form, Radio, Select, Input, DatePicker, Checkbox } from "antd"
import React, { Fragment } from "react"

const PersonFormItems = (props: { itemLayout: any }) => {

  const { itemLayout } = props
  return (
    <Fragment>
      <Form.Item
        {...itemLayout}
        name="identify"
        label="身份证号">
        <Input />
      </Form.Item>
      <Form.Item
        {...itemLayout}
        name="name"
        rules={[{ required: true, message: '必须填写' }]}
        label="姓名">
        <Input />
      </Form.Item>
      <Form.Item name="serial" {...itemLayout} label="工号">
        <Input />
      </Form.Item>
      <Form.Item name="gender" {...itemLayout} label="性别">
        <Radio.Group style={{ marginLeft: 16 }}>
          <Radio value="男">男</Radio>
          <Radio value="女">女</Radio>
        </Radio.Group>,
      </Form.Item>
      <Form.Item name="education" {...itemLayout} label="学历">

        <Radio.Group style={{ marginLeft: 16 }}>
          <Radio value="本科">本科</Radio>
          <Radio value="研究生">研究生</Radio>
          <Radio value="博士">博士</Radio>
          <Radio value="其他">其他</Radio>
        </Radio.Group>,
      </Form.Item>
      <Form.Item name="phone" {...itemLayout} label="电话">
        <Input />
      </Form.Item>
      <Form.Item name="department" {...itemLayout} label="部门">
        <Input />
      </Form.Item>
      <Form.Item name="entered_at" {...itemLayout} label="入职时间">
        <DatePicker format="YYYY-MM-DD" />
      </Form.Item>
      <Form.Item {...itemLayout} label="入住时间">
        <DatePicker format="YYYY-MM-DD" />
      </Form.Item>
      <Form.Item name="contract_start" {...itemLayout} label="劳动合同">
        <DatePicker placeholder="开始日期" format="YYYY-MM-DD" />
        <DatePicker.RangePicker format="YYYY-MM-DD" />
        <Checkbox
          style={{ float: 'right' }}
        >
          无固定期
                </Checkbox>
      </Form.Item>
      <Form.Item name="origin" {...itemLayout} label="籍贯">
        <Input />
      </Form.Item>
    </Fragment>
  )
}


export default PersonFormItems;
