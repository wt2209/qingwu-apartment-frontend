import { Form, Radio, Input, DatePicker, Checkbox } from "antd"
import React, { Fragment, useState, useEffect } from "react"
import locale from "antd/es/date-picker/locale/zh_CN"
import { FormInstance } from "antd/lib/form"
import moment from "moment"
import { dateFormater } from "../.."
import { getOnePerson } from "@/pages/basic/people/service"

const PersonFormItems = (props: { itemLayout: any, form: FormInstance }) => {
  const { itemLayout, form } = props
  const [isNoEnd, setIsNoEnd] = useState(false)

  const handleNoEndChange = (checked: boolean) => {
    setIsNoEnd(checked)
    if (checked) {
      form.setFieldsValue({ person: { contract_date: undefined } })
    } else {
      form.setFieldsValue({ person: { contract_start: undefined } })
    }
  }

  const handleIdentifyChange = async (e: any) => {
    const identify = e.target.value
    if (identify.length === 18) {
      const res = await getOnePerson({ identify })
      if (res && res.data) {
        const person = res.data
        person.hired_at = moment(person.hired_at)
        if (person.contract_start) {
          if (person.contract_end === '无固定期') {
            setIsNoEnd(true)
            person.contract_start = moment(person.contract_start)
            delete person.contract_end
          } else {
            setIsNoEnd(false)
            person.contract_date = [moment(person.contract_start), moment(person.contract_end)]
            delete person.contract_end
            delete person.contract_start
          }
        }
        form.setFieldsValue({
          person: {
            ...person
          }
        })
      }
    }
  }

  useEffect(() => {
    if (form.getFieldValue(['person', 'contract_start'])) {
      setIsNoEnd(true)
    }
  }, [])

  return (
    <Fragment>
      <Form.Item
        {...itemLayout}
        onChange={(e: any) => handleIdentifyChange(e)}
        name={['person', 'identify']}
        label="身份证号">
        <Input placeholder="请首先输入身份证号" />
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
        <Radio.Group size="small">
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
        <DatePicker locale={locale} placeholder="入职时间" format={dateFormater} />
      </Form.Item>
      <Form.Item label="劳动合同" {...itemLayout}>
        {isNoEnd ?
          <Form.Item
            noStyle
            name={['person', 'contract_start']}
          >
            <DatePicker locale={locale} placeholder="开始日期" format="YYYY-MM-DD" />
          </Form.Item>
          :
          <Form.Item
            noStyle
            name={['person', 'contract_date']}
          >
            <DatePicker.RangePicker locale={locale} placeholder={['开始日期', '结束日期']} format="YYYY-MM-DD" />
          </Form.Item>
        }
        <Checkbox
          checked={isNoEnd}
          onChange={(e) => handleNoEndChange(e.target.checked)}
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
