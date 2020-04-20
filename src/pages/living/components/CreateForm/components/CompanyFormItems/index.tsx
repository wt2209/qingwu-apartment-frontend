import { Form, Input, DatePicker, AutoComplete } from "antd"
import React, { Fragment } from "react"
import locale from 'antd/es/date-picker/locale/zh_CN';

const CompanyFormItems = (props: { itemLayout: any; }) => {

  const options = [
    { value: '青岛诚晟物业有限公司' },
    { value: '大连太平洋有限公司' },
  ]

  const { itemLayout } = props
  return (
    <Fragment>
      <Form.Item name={['company', "company_name"]} {...itemLayout} label="公司名"
        rules={[{ required: true, message: 'asdf' }]}
      >
        <AutoComplete
          options={options}
          placeholder="请输入公司名"
          filterOption={(inputValue, option) =>
            option?.value.indexOf(inputValue) !== -1
          }
        />
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
      <Form.Item name={['company', "entered_at"]} {...itemLayout} label="公司入驻公寓时间">
        <DatePicker locale={locale} placeholder="入驻时间" format="YYYY-MM-DD" />
      </Form.Item>
      <Form.Item name={['company', "remark"]} {...itemLayout} label="公司说明/备注">
        <Input.TextArea />
      </Form.Item>

    </Fragment >
  )
}


export default CompanyFormItems;
