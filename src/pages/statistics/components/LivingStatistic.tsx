import React, { useState, useEffect } from 'react'
import { Table, Row, Col, Form, Card, Divider, Select, Button, Spin, Input } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { AreaListItem } from '@/pages/basic/areas/data'
import { CategoryListItem } from '@/pages/basic/categories/data'
import { LivingStatisticsList, LivingStatisticsParams } from '../data'
import { getLivingStatistics } from '../service'

interface Props {
  areas: AreaListItem[] | undefined;
  categories: CategoryListItem[] | undefined;
}
const LivingStatistic = (props: Props) => {
  const { areas, categories } = props
  const [form] = Form.useForm()
  const [statistics, setStatistics] = useState<LivingStatisticsList[]>()
  const [loading, setLoading] = useState<boolean>(false)
  const types = [
    { label: '个人入住', value: 'person' },
    { label: '公司或机构入住', value: 'company' },
    { label: '功能用房', value: 'functional' },
  ]

  const fetchStatistics = async (params: LivingStatisticsParams) => {
    setLoading(true)
    const res = await getLivingStatistics(params)
    if (res?.data) {
      setStatistics(res.data)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchStatistics({})
  }, [])

  const initialForm = {
    room: undefined,
    'areas[]': undefined,
    'types[]': undefined,
    'categories[]': undefined,
  }

  const handleSubmit = () => {
    const values = form.getFieldsValue()
    fetchStatistics(values)
  }

  const handleReset = () => {
    form.setFieldsValue(initialForm)
    fetchStatistics({})
  }

  const columns: ColumnsType<LivingStatisticsList> = [
    {
      title: '区域',
      dataIndex: 'area',
      align: 'center',
    },
    {
      title: '类型',
      align: 'center',
      dataIndex: 'category',
    },
    {
      title: '房间总数',
      align: 'center',
      dataIndex: 'rooms_all_count',
    },
    {
      title: '在用房间',
      align: 'center',
      dataIndex: 'rooms_used_count',
    },
    {
      title: '空房间数',
      align: 'center',
      dataIndex: 'rooms_empty_count',
    },
    {
      title: '居住人数',
      align: 'center',
      dataIndex: 'people_count',
    },
    {
      title: '总公司数',
      align: 'center',
      dataIndex: 'companies_count',
    },
  ]

  return (
    <Row >
      <Col lg={24} xl={14}>
        <Card bordered={false} bodyStyle={{ paddingLeft: 0, paddingRight: 12 }}>
          <Table
            size="small"
            bordered
            rowKey={(row: LivingStatisticsList) => row.area + row.category}
            columns={columns}
            dataSource={statistics}
            pagination={false}
            summary={(currentData) => {
              if (currentData.length === 0) {
                return null
              }
              let rooms_all_sum = 0
              let rooms_used_sum = 0
              let rooms_empty_sum = 0
              let people_sum = 0
              let companies_sum = 0

              currentData.forEach(row => {
                rooms_all_sum += row.rooms_all_count
                rooms_used_sum += row.rooms_used_count
                rooms_empty_sum += row.rooms_empty_count
                people_sum += row.people_count ? parseInt(row.people_count as string, 10) : 0
                companies_sum += row.companies_count ? parseInt(row.companies_count as string, 10) : 0
              });

              return (
                <>
                  <Table.Summary.Row style={{ fontWeight: 'bold', textAlign: 'center' }}>
                    <Table.Summary.Cell index={1} colSpan={2}>
                      合计
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={2}>
                      {rooms_all_sum}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={3}>
                      {rooms_used_sum}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={4}>
                      {rooms_empty_sum}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={5}>
                      {people_sum}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={6}>
                      {companies_sum}
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
                    name="areas[]"
                    label="区域"
                  >
                    <Select mode="multiple" placeholder="请选择">
                      {areas?.map(area => (
                        <Select.Option key={area.id} value={area.id}>{area.title}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="types[]"
                    label="属于"
                  >
                    <Select mode="multiple" placeholder="请选择">
                      {types.map(type => (
                        <Select.Option key={type.value} value={type.value}>{type.label}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="categories[]"
                    label="类型"
                  >
                    <Select mode="multiple" placeholder="请选择">
                      {categories?.map(category => (
                        <Select.Option key={category.id} value={category.id}>{category.title}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="room"
                    label="房间"
                  >
                    <Input placeholder="请输入房间（模糊匹配）" />
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

export default LivingStatistic
