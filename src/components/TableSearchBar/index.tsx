import React, { useRef } from 'react';
import { SearchItems } from '@/global.d';
import { Card, Row, Col, Input, Select, Button, Form } from 'antd';
import { FormInstance } from 'antd/lib/form';


interface TableSearchBarProps {
  items: SearchItems,
  onSearch: (values: { [key: string]: string }) => void,
  onExport: (values: any) => void,
  onReset: () => void,
}
const TableSearchBar: React.FC<TableSearchBarProps> = (props: TableSearchBarProps) => {
  const formRef = useRef<FormInstance>(null);

  const handleReset = () => {
    if (formRef && formRef.current) {
      formRef.current.resetFields()
    }
    props.onReset()
  }

  const initialValues = {}
  Object.keys(props.items).forEach(key => {
    initialValues[key] = props.items[key].default || ''
  })

  return (<Card style={{ marginBottom: 26 }} bodyStyle={{ paddingBottom: 0 }} >
    <Form
      ref={formRef}
      layout="horizontal"
      onFinish={props.onSearch}
      initialValues={initialValues}
    >
      <Row gutter={{ md: 24, lg: 16, xl: 8 }}>
        {Object.keys(props.items).map((key: string) => {
          const item = props.items[key]
          switch (item.type) {
            case 'input':
              return (
                <Col lg={6} md={12} sm={24} key={key} style={{ marginBottom: 12 }}>
                  <Form.Item labelCol={{ span: 6 }} name={key} label={item.label} style={{ marginBottom: 0 }}>
                    <Input />
                  </Form.Item>
                </Col>
              )
            case 'select':
              return (
                <Col lg={6} md={12} sm={24} key={key} style={{ marginBottom: 12 }}>
                  <Form.Item labelCol={{ span: 6 }} name={key} label={item.label} style={{ marginBottom: 0 }}>
                    <Select placeholder="请选择">
                      {item.options && Object.keys(item.options).map((k: string) => {
                        return <Select.Option value={k} key={`searchSelect-${k}`}>{item.options && item.options[k]}</Select.Option>
                      })}
                    </Select>
                  </Form.Item>
                </Col>
              )
            default:
              return '尚未定义';
          }
        })}
        <Col xl={6} lg={6} md={12} sm={24} style={{ textAlign: 'right', marginBottom: 12 }}>
          <span>
            <Form.Item style={{ marginBottom: 0 }}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button type="default" style={{ marginLeft: 8 }} onClick={handleReset}>
                重置
              </Button>
              <Button type="default" style={{ marginLeft: 8 }} onClick={props.onExport}>
                导出
              </Button>
            </Form.Item>
          </span>
        </Col>
      </Row>
    </Form>
  </Card >)
}


export default TableSearchBar
