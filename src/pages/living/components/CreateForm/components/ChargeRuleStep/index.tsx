import React, { Fragment, useState } from "react"
import { Form, Select, Table } from "antd"
import { ChargeRuleListItem } from "@/pages/chargeRules/data"


const ChargeRuleStep = (props: { itemLayout: any }) => {
  const [chargeRules, setChargeRules] = useState<ChargeRuleListItem[]>()
  const { itemLayout } = props

  return (
    <Fragment>
      <Form.Item {...itemLayout} label="类型" name="charge_rule_id"
      >
        <Select placeholder="请选择">
          {chargeRules?.map(rule =>
            <Select.Option key={rule.id} value={rule.id}>{rule.title}</Select.Option>
          )}
        </Select>
      </Form.Item>
    </Fragment>)
}

export default ChargeRuleStep
