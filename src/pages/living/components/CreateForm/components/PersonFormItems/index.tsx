import { Form, Radio, Input, DatePicker, Checkbox } from "antd"
import React, { Fragment, useState } from "react"
import locale from "antd/es/date-picker/locale/zh_CN"

const PersonFormItems = (props: { itemLayout: any }) => {
  const { itemLayout } = props
  const [isNoEnd, handleNoEndChange] = useState(false)

  return (
    <Fragment>
      <Form.Item
        {...itemLayout}
        name={['person', 'dentify']}
        label="身份证号">
        <Input placeholder="请首选输入身份证号" />
      </Form.Item>
      <Form.Item
        {...itemLayout}
        name={['person', 'name']}
        rules={[{ required: true, message: '必须填写' }]}
        label="姓名">
        <Input />
      </Form.Item>
      <Form.Item
        name={['person', 'serial']}
        {...itemLayout}
        label="工号">
        <Input />
      </Form.Item>
      <Form.Item
        name={['person', 'gender']}
        {...itemLayout}
        label="性别">
        <Radio.Group>
          <Radio value="男">男</Radio>
          <Radio value="女">女</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        name={['person', 'education']}
        {...itemLayout}
        label="学历">
        <Radio.Group>
          <Radio.Button value="专科">专科</Radio.Button>
          <Radio.Button value="本科">本科</Radio.Button>
          <Radio.Button value="硕士">硕士</Radio.Button>
          <Radio.Button value="博士">博士</Radio.Button>
          <Radio.Button value="其他">其他</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        name={['person', 'phone']}
        {...itemLayout}
        label="电话">
        <Input />
      </Form.Item>
      <Form.Item
        name={['person', 'department']}
        {...itemLayout}
        label="部门">
        <Input />
      </Form.Item>
      <Form.Item
        name={['person', 'hired_at']}
        {...itemLayout}
        label="入职时间">
        <DatePicker locale={locale} placeholder="入职时间" format="YYYY-MM-DD" />
      </Form.Item>
      <Form.Item
        {...itemLayout}
        name={['person', 'entered_at']}
        label="进住公寓时间">
        <DatePicker locale={locale} placeholder="进住公寓时间" format="YYYY-MM-DD" />
      </Form.Item>
      <Form.Item
        name={['person', "contract_date"]}
        {...itemLayout}
        label="劳动合同">
        {
          isNoEnd
            ? <DatePicker locale={locale} placeholder="开始日期" format="YYYY-MM-DD" />
            : <DatePicker.RangePicker locale={locale} placeholder={['开始日期', '结束日期']} format="YYYY-MM-DD" />
        }
        <Checkbox
          checked={isNoEnd}
          onChange={(e) => { handleNoEndChange(e.target.checked) }}
          style={{ float: 'right', lineHeight: '32px' }}
        >
          无固定期
        </Checkbox>
      </Form.Item>
      <Form.Item name={['person', "remark"]} {...itemLayout} label="个人说明/备注">
        <Input.TextArea />
      </Form.Item>
    </Fragment >
  )
}


export default PersonFormItems;
