import React, { Fragment, useState, useEffect } from "react"
import { Form, Select, DatePicker } from "antd"
import { ChargeRuleListItem } from "@/pages/chargeRules/data"
import { getAllChargeRules } from "@/pages/chargeRules/service"
import locale from "antd/es/date-picker/locale/zh_CN"

const ChargeRuleStep = (props: { itemLayout: any, type: string }) => {
  const [chargeRules, setChargeRules] = useState<ChargeRuleListItem[]>()
  const { itemLayout, type } = props

  useEffect(() => {
    (async () => {
      const res = await getAllChargeRules()
      if (res && res.data) {
        setChargeRules(res.data.filter((item: ChargeRuleListItem) => item.type === type))
      }
    })()
  }, [])

  return (
    <Fragment>
      <Form.Item
        name="record_at"
        {...itemLayout}
        rules={[{ required: true, message: '必须填写' }]}
        label="本房间入住日期">
        <DatePicker placeholder="本房间入住日" format="YYYY-MM-DD" />
      </Form.Item>
      <Form.Item name="rent_date" {...itemLayout} label="租期">
        <DatePicker.RangePicker locale={locale} placeholder={['开始日期', '结束日期']} format="YYYY-MM-DD" />
      </Form.Item>
      <Form.Item {...itemLayout} label="选择收费规则" name="charge_rule_id">
        <Select placeholder="请选择">
          {chargeRules?.map(rule =>
            <Select.Option key={rule.id} value={rule.id}>{rule.title}</Select.Option>
          )}
        </Select>
      </Form.Item>
    </Fragment>)
}

export default ChargeRuleStep
