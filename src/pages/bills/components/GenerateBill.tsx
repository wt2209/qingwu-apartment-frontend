import React, { useState, useEffect } from 'react'
import Modal from 'antd/lib/modal/Modal'
import { Typography, Checkbox, DatePicker } from 'antd'
import moment, { Moment } from 'moment'

interface Props {
  modalVisible: boolean;
  onOk: (fieldsValue: any) => void;
  onCancel: () => void;
}

const GenerateBill = (props: Props) => {
  const { modalVisible, onOk, onCancel } = props
  const [beforeDate, setBeforeDate] = useState<Moment | null>()
  const [shouldExport, setShouldExport] = useState<boolean>(true)

  useEffect(() => {
    if (moment().day() < 20) {
      setBeforeDate(moment().set('date', moment().daysInMonth()))
    } else {
      setBeforeDate(moment().add(1, 'months').set('date', moment().daysInMonth()))
    }
  }, [])

  return (
    <Modal
      destroyOnClose
      title="生成费用"
      visible={modalVisible}
      onOk={() => onOk({ date: beforeDate?.format("YYYY-MM-DD"), export: shouldExport })}
      okText="确定"
      cancelText="取消"
      onCancel={() => onCancel()}
    >
      <div style={{ marginBottom: 48 }}>
        <Typography.Text type="warning">说明：用于生成目前在住人员的固定应交费用，如房租、床位费等，不包含各房间的水电费。</Typography.Text>
      </div >
      <div style={{ marginBottom: 24 }}>
        生成 <DatePicker value={beforeDate} onChange={e => setBeforeDate(e)} /> 之前的费用
      </div>
      <div style={{ marginBottom: 24 }}>
        <Checkbox checked={shouldExport} onChange={(e) => { setShouldExport(e.target.checked) }}>将生成的费用导出为Excel文件</Checkbox>
      </div>
    </Modal >
  )
}

export default GenerateBill
