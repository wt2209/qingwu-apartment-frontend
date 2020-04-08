import React from 'react';
import { SearchItems } from '@/global.d';
import { Card, Row, Col, Input, Select, Button, Form } from 'antd';


interface TableSearchBarProps {
  items: SearchItems,
  onSearch: (values: { [key: string]: string }) => void,
  onExport: (values: any) => void,
}
const TableSearchBar: React.FC<TableSearchBarProps> = (props: TableSearchBarProps) => {
  return (<Card style={{ marginBottom: 26 }} >
    <Form
      layout="horizontal"
      onFinish={props.onSearch}
    >
      <Row gutter={{ md: 24, lg: 16, xl: 8 }}>
        {Object.keys(props.items).map((key: string) => {
          const item = props.items[key]
          switch (item.type) {
            case 'input':
              return (
                <Col md={5} sm={24} key={key}>
                  <Form.Item name={key} label={item.label} style={{ marginBottom: 0 }}>
                    <Input />
                  </Form.Item>
                </Col>
              )
            case 'select':
              return (
                <Col md={5} sm={24} key={key}>
                  <Form.Item name={key} label={item.label} style={{ marginBottom: 0 }}>
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
        <Col md={4} sm={24} style={{ textAlign: 'right', paddingRight: 24 }}>
          <span>
            <Form.Item style={{ marginBottom: 0 }}>
              <Button type="primary" htmlType="submit">
                查询
            </Button>
              <Button type="default" style={{ marginLeft: 8 }} onClick={props.onExport}>
                导出
            </Button>
            </Form.Item>
          </span>
        </Col>
      </Row>
    </Form>
  </Card>)
}


export default TableSearchBar
