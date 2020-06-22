import React, { useState, useEffect } from 'react';
import { List, Card, Modal, Input, Divider, InputNumber, Select, Alert, DatePicker } from 'antd';
import { FeeTypeListItem } from '@/pages/basic/feeTypes/data';
import moment from 'moment';
import { BillListItem } from '../data';
import { chargeWays } from '..';

interface Props {
  bills: BillListItem[];
  modalVisible: boolean;
  feeTypes: FeeTypeListItem[] | undefined;
  onOk: (ids: string[], lates: any[] | undefined, chargeDate: string | undefined, way: string) => void;
  onCancel: () => void;
}

const ChargeBill = (props: Props) => {
  const { bills, feeTypes, modalVisible, onOk, onCancel } = props
  const [lates, setLates] = useState<any[]>()
  const [total, setTotal] = useState<number>(0)
  const [hasError, setHasError] = useState<boolean>(false)
  const [chargeDate, setChargeDate] = useState<string | undefined>(moment().format('YYYY-MM-DD'))
  // 缴费方式
  const [way, setWay] = useState<string>('现金')

  const unchargedBills = bills.filter(bill => !bill.charged_at)

  useEffect(() => {
    const tmp: any[] | undefined = []
    unchargedBills.forEach((bill, index) => {
      if (bill.late_rate && bill.late_date && bill.late_base) {
        const start = moment()
        const end = moment(bill.late_date)
        const diff = start.diff(end, 'days')
        if (diff > 0) {
          tmp.push({
            index,
            type: bill.type,
            area_id: bill.area.id,
            area: bill.area.title,
            location: bill.location,
            title: '',
            name: bill.name,
            money: (diff * bill.late_base * bill.late_rate / 100).toFixed(2),
            description: `${start.format('YYYY-MM-DD')}—${end.format('YYYY-MM-DD')}`
          })
        }
      }
    })
    setLates(tmp)
  }, [bills])

  useEffect(() => {
    const firstTotal = unchargedBills.reduce((sum, cur) => sum + (cur.charged_at ? 0 : cur.money) * 1, 0.0)
    const secondTotal = lates?.reduce((sum, cur) => sum + (cur.charged_at ? 0 : cur.money) * 1, firstTotal * 1)
    setTotal(secondTotal)
  }, [bills, lates])

  const handleSubmit = () => {
    let err = false
    lates?.forEach(late => {
      if (!late.money || !late.title) {
        err = true
      }
    })
    if (err) {
      setHasError(true)
      return
    }
    onOk(unchargedBills.map(bill => bill.id), lates, chargeDate, way)
  }

  const handleLateChange = (index: number, field: string, value: any) => {
    setHasError(false)
    const t = lates?.map(late => {
      const l = late
      if (late.index === index) {
        l[field] = value
      }
      return l
    })
    setLates(t)
  }

  const removeOneLate = (index: number) => {
    setHasError(false)
    const t = lates?.filter(item => item.index !== index)
    setLates(t)
  }

  return (
    <Modal
      width={640}
      destroyOnClose
      title="缴费"
      visible={modalVisible}
      onOk={handleSubmit}
      okText="确定"
      cancelText="取消"
      bodyStyle={{ paddingTop: 0, paddingBottom: 0 }}
      onCancel={() => onCancel()}
    >
      <h3 style={{ marginTop: 12 }}>基本费用：</h3>
      <Card bordered={false} bodyStyle={{ paddingTop: 0, paddingBottom: 0 }}>
        <List
          className="demo-loadmore-list"
          itemLayout="horizontal"
          dataSource={unchargedBills}
          renderItem={bill => (
            <List.Item>
              <List.Item.Meta
                title={`${bill.area.title} ${bill.location} （${bill.name}）`}
                description={bill.description}
              />
              <div>
                <span style={{ marginRight: 36 }}>{bill.title}</span>
                <span style={{ marginRight: 70 }}> {bill.money}</span>
              </div>
            </List.Item>
          )}
        />
      </Card>
      <Divider style={{ margin: '12px 0' }} />
      {lates && lates.length > 0 ?
        <>
          <h3 style={{ marginTop: 12 }}>滞纳金：</h3>
          {hasError ? <Alert message="必须选择滞纳金的费用类型并填写金额" type="error" showIcon /> : null}
          <Card bodyStyle={{ paddingTop: 0, paddingBottom: 0 }} bordered={false}>
            <List
              className="demo-loadmore-list"
              itemLayout="horizontal"
              dataSource={lates}
              renderItem={late => (
                <List.Item
                  key={late.index}
                  actions={[<a onClick={() => { removeOneLate(late.index) }}>删除</a>]}
                >
                  <List.Item.Meta
                    title={`${late.area} ${late.location} （${late.name}）`}
                    description={
                      <Input
                        defaultValue={late.description}
                        onChange={(e) => handleLateChange(late.index, 'description', e.target.value)}
                        style={{ width: 180 }}
                      />
                    }
                  />
                  <div>
                    <Input.Group>
                      <Select
                        placeholder="请选择费用类型"
                        style={{ width: 140 }}
                        onChange={(value) => handleLateChange(late.index, 'title', value)}
                      >
                        {feeTypes?.filter(type => type.title.indexOf('滞纳金') > 0).map(type => (
                          <Select.Option key={type.id} value={type.title}>{type.title}</Select.Option>
                        ))}
                      </Select>
                      <InputNumber
                        precision={2}
                        step={1}
                        min={0}
                        defaultValue={late.money}
                        onChange={(value) => handleLateChange(late.index, 'money', value)}
                        placeholder="金额" />
                    </Input.Group>
                  </div>
                </List.Item>
              )}
            />
          </Card>
          <Divider style={{ margin: '12px 0' }} />
        </>
        : null
      }

      <h3 style={{ marginTop: 12, marginBottom: 12, display: 'flex' }}>
        <div style={{ flex: 1 }}>合计：</div>
        <div style={{ flex: 1, textAlign: 'right', paddingRight: '24px' }}>￥ {parseFloat(total as any).toFixed(2)}</div>
      </h3>
      <Divider style={{ margin: '12px 0' }} />
      <div style={{ marginTop: 12, marginBottom: 12, textAlign: 'right', paddingRight: '24px' }}>
        缴费方式：
        <Select
          placeholder="请选择"
          defaultValue="现金"
          onChange={(value) => setWay(value)}
          style={{ marginRight: 24 }}>
          {chargeWays.map(chargeWay => (
            <Select.Option key={chargeWay} value={chargeWay}>{chargeWay}</Select.Option>
          ))}
        </Select>
        缴费日期：<DatePicker
          placeholder="缴费日期"
          format="YYYY-M-D"
          onChange={value => setChargeDate(value?.format('YYYY-MM-DD'))}
          defaultValue={moment()} />
      </div>
    </Modal>
  )
}

export default ChargeBill
