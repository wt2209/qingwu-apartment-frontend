import React, { useState, useEffect } from 'react'
import { Table, Row, Col, Form, Card, Divider, Select, Button, Spin, Input, DatePicker, Radio } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import moment from 'moment'
import { FeeTypeListItem } from '@/pages/basic/feeTypes/data'
import { AreaListItem } from '@/pages/basic/areas/data'
import { BillStatisticsList, BillStatisticsParams } from '../data'
import { getBillStatistics } from '../service'

interface Props {
  areas: AreaListItem[] | undefined;
  feeTypes: FeeTypeListItem[] | undefined;
}

const BillStatistic = (props: Props) => {
  const { areas, feeTypes } = props
  const [form] = Form.useForm()
  const [statistics, setStatistics] = useState<BillStatisticsList[]>()
  const [loading, setLoading] = useState<boolean>(false)

  const initialForm: BillStatisticsParams = {
    range: [moment(), moment()],
    turn_in: 'all',
    is_refund: 0,
  }

  const fetchStatistics = async (params: BillStatisticsParams) => {
    setLoading(true)
    const res = await getBillStatistics(params)
    if (res?.data) {
      setStatistics(res.data)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchStatistics(initialForm)
  }, [])

  const handleSubmit = () => {
    const values = form.getFieldsValue()
    fetchStatistics(values)
  }

  const handleReset = () => {
    form.setFieldsValue(initialForm)
    fetchStatistics(initialForm)
  }

  const columns: ColumnsType<BillStatisticsList> = [
    {
      title: '费用类型',
      dataIndex: 'title',
      align: 'center',
    },
    {
      title: '金额',
      dataIndex: 'money',
      render: value => `￥ ${value}`,
      align: 'right',
    },
  ]

  return (
    <Row >
      <Col lg={24} xl={14}>
        <Card bordered={false} bodyStyle={{ paddingLeft: 0, paddingRight: 12 }}>
          <Table
            size="small"
            bordered
            rowKey={(row: BillStatisticsList) => row.title}
            columns={columns}
            dataSource={statistics}
            pagination={false}
            summary={(currentData) => {
              if (currentData.length === 0) {
                return null
              }
              let sum = 0
              currentData.forEach(row => {
                sum += row.money * 1
              });

              return (
                <>
                  <Table.Summary.Row style={{ fontWeight: 'bold', textAlign: 'center' }}>
                    <Table.Summary.Cell index={1}>
                      合计
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={2}>
                      <span style={{ display: 'inline-block', width: '100%', textAlign: 'right' }}>
                        ￥ {sum.toFixed(2)}
                      </span>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </>
              )
            }}
          />
        </Card>
      </Col>
      <Col ><Divider type="vertical" style={{ height: '100%' }} /></Col>
      <Col lg={24} xl={9}>
        <Card bordered={false} bodyStyle={{ paddingLeft: 12, paddingRight: 0 }}>
          <Spin spinning={loading}>
            <Form
              form={form}
              onFinish={handleSubmit}
              initialValues={initialForm}
            >
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item
                    name="range"
                    label="缴费日期"
                  >
                    <DatePicker.RangePicker />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="fee_types[]"
                    label="费用类型"
                  >
                    <Select mode="multiple" placeholder="请选择" allowClear>
                      {feeTypes?.map(type => (
                        <Select.Option key={type.id} value={type.title}>{type.title}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="areas[]"
                    label="所属区域"
                  >
                    <Select mode="multiple" placeholder="请选择" allowClear>
                      {areas?.map(area => (
                        <Select.Option key={area.id} value={area.id}>{area.title}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="location"
                    label="房间/位置"
                  >
                    <Input placeholder="请输入房间/位置（模糊搜索）" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="name"
                    label="姓名/公司"
                  >
                    <Input placeholder="请输入姓名/公司（模糊搜索）" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="turn_in"
                    label="是否上交"
                  >
                    <Radio.Group>
                      <Radio value="all">全部</Radio>
                      <Radio value="yes">上交财务</Radio>
                      <Radio value="no">物业自留</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="is_refund"
                    label="缴费/退费"
                  >
                    <Radio.Group>
                      <Radio value={0}>缴费</Radio>
                      <Radio value={1}>退费</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={24} style={{ textAlign: 'right' }}>
                  <Form.Item>
                    <Button
                      style={{ marginRight: '8px' }}
                      type="default"
                      onClick={handleReset}
                    >
                      重置
                  </Button>
                    <Button type="primary" htmlType="submit">
                      统计
                  </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Spin>
        </Card>
      </Col>
    </Row >
  )
}

export default BillStatistic
