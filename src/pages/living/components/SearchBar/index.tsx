import React, { useState, useEffect } from 'react'
import { Input, Select, Row, Col } from 'antd'
import { LivingFetchParams } from '../../data'
import { AreaListItem } from '@/pages/basic/areas/data'
import { CategoryListItem } from '@/pages/basic/categories/data'

interface Props {
  onSubmit: (params: LivingFetchParams) => void;
  params: LivingFetchParams;
  areas: AreaListItem[] | undefined;
  categories: CategoryListItem[] | undefined;
}

const SearchBar = (props: Props) => {
  const { params, onSubmit, areas, categories } = props
  const [keyword, setKeyword] = useState<string>()
  const [categoryId, setCategoryId] = useState<string | number>(0)
  const [areaId, setAreaId] = useState<string | number>(0)

  useEffect(() => {
    if (!params.keyword) {
      setKeyword('')
    } else {
      setKeyword(params.keyword)
    }
    if (!params.area_id) {
      setAreaId(0)
    } else {
      setAreaId(params.area_id)
    }
    if (!params.category_id) {
      setCategoryId(0)
    } else {
      setCategoryId(params.category_id)
    }
  }, [params])

  return (
    <div style={{ display: ' flex', alignItems: 'center' }}>
      <span style={{ marginRight: 8, display: 'inline', minWidth: 42 }}>搜索：</span>
      <Row style={{ flex: 1 }}>
        <Col md={3} sm={24} xs={24} >
          <Select
            style={{ width: '100%' }}
            value={areaId}
            placeholder="请选择"
            onSelect={(value: number | string) => setAreaId(value)}>
            <Select.Option value={0}>全部区域</Select.Option>
            {areas && areas.map(area => (
              <Select.Option key={area.id} value={area.id}>{area.title}</Select.Option>
            ))}
          </Select>
        </Col>
        <Col md={3} sm={24} xs={24} >
          <Select
            style={{ width: '100%' }}
            value={categoryId}
            placeholder="请选择"
            onSelect={(value: number | string) => setCategoryId(value)}>
            <Select.Option value={0}>全部类型</Select.Option>
            {categories && categories.map(category => (
              <Select.Option key={category.id} value={category.id}>{category.title}</Select.Option>
            ))}
          </Select>
        </Col>
        <Col md={6} sm={24} xs={24}>
          <Input.Search
            value={keyword}
            placeholder="姓名/公司名，房间号，或电话"
            enterButton
            onChange={(e) => setKeyword(e.target.value)}
            onSearch={() => onSubmit({ keyword, area_id: areaId, category_id: categoryId })}
          />
        </Col>
      </Row>
    </div>
  )
}

export default SearchBar
