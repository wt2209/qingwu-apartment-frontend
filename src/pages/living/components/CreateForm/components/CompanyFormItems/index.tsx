import { Form, Radio, Select, Input, DatePicker, Checkbox, Button } from "antd"
import React, { Fragment } from "react"

const CompanyFormItems = (props: { itemLayout: any; }) => {

  const { itemLayout } = props
  return (
    <Fragment>
      <Form.Item name={['company', "company_name"]} {...itemLayout} label="公司名"
        rules={[{ required: true, message: 'asdf' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name={['company', "manager"]} {...itemLayout} label="负责人">
        <Input />
      </Form.Item>
      <Form.Item name={['company', "manager_phone"]} {...itemLayout} label="负责人电话">
        <Input />
      </Form.Item>
      <Form.Item name={['company', "linkman"]} {...itemLayout} label="日常联系人">
        <Input />
      </Form.Item>
      <Form.Item name={['company', "linkman_phone"]} {...itemLayout} label="联系人电话">
        <Input />
      </Form.Item>
      <Form.Item name={['company', "entered_at"]} {...itemLayout} label="房间入住日">
        <DatePicker format="YYYY-MM-DD" />
      </Form.Item>
      <Form.Item name={['company', "remark"]} {...itemLayout} label="公司说明">
        <Input />
      </Form.Item>
      <Form.Item name={['company', "contract_start"]} {...itemLayout} label="租期">
        <DatePicker.RangePicker format="YYYY-MM-DD" />
      </Form.Item>
      <Form.Item {...itemLayout} label="备注">
        <Input.TextArea />
      </Form.Item>
    </Fragment >
  )
}


export default CompanyFormItems;
