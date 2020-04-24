import { Form, Input, AutoComplete } from "antd"
import React, { Fragment, useState, useEffect } from "react"
import { CompanyListItem } from "@/pages/companies/data"
import { getAllCompanies, getCompanyByName } from "@/pages/companies/service"
import { FormInstance } from "antd/lib/form"

interface Props {
  itemLayout: any;
  form: FormInstance;
}

const CompanyFormItems = (props: Props) => {
  const [companies, setCompanies] = useState<CompanyListItem[]>()
  const { form, itemLayout } = props

  useEffect(() => {
    (async () => {
      const res = await getAllCompanies()
      if (res && res.data) {
        setCompanies(res.data)
      }
    })()
  }, [])

  const options = companies?.map(company => (
    { value: company.company_name }
  ))

  const handleSelect = async (value: string) => {
    const res = await getCompanyByName({ name: value })

    if (res && res.data) {
      form.setFieldsValue({
        company: {
          ...res.data
        }
      })
    }
  }

  return (
    <Fragment>
      <Form.Item name={['company', "company_name"]} {...itemLayout} label="公司名"
        rules={[{ required: true, message: '必须填写' }]}
      >
        <AutoComplete
          allowClear
          options={options}
          placeholder="请输入公司名"
          filterOption={(inputValue, option) =>
            option?.value.indexOf(inputValue) !== -1
          }
          onSelect={(value) => handleSelect(value)}
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
      <Form.Item name={['company', "remark"]} {...itemLayout} label="公司说明/备注">
        <Input.TextArea />
      </Form.Item>

    </Fragment >
  )
}


export default CompanyFormItems;
