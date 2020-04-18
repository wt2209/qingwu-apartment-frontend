import React, { Fragment, useState, useEffect } from "react"
import { Form, Select } from "antd"
import { ChargeRuleListItem } from "@/pages/chargeRules/data"
import { getAllChargeRules } from "@/pages/chargeRules/service"


const ChargeRuleStep = (props: { itemLayout: any }) => {
  const [chargeRules, setChargeRules] = useState<ChargeRuleListItem[]>()
  const { itemLayout } = props

  useEffect(() => {
    (async () => {
      const res = await getAllChargeRules()
      if (res && res.data) {
        setChargeRules(res.data)
      }
    })()
  })

  return (
    <Fragment>
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
