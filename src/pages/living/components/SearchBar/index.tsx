import React, { useState, useEffect } from 'react'
import { Input, Select } from 'antd'
import { LivingFetchParams } from '../../data'
import { AreaListItem } from '@/pages/area/data'

interface Props {
  onSubmit: (params: LivingFetchParams) => void;
  params: LivingFetchParams;
  areas: AreaListItem[] | undefined;
}

const SearchBar = (props: Props) => {
  const { params, onSubmit, areas } = props
  const [keyword, setKeyword] = useState<string>()
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
  }, [params])

  return (
    <div style={{ display: ' flex', alignItems: 'center' }}>
      <span style={{ marginRight: 8, display: 'inline', minWidth: 42 }}>搜索：</span>
      <Select
        value={areaId}
        placeholder="请选择"
        style={{ minWidth: 100 }}
        onSelect={(value: number | string) => setAreaId(value)}>
        <Select.Option value={0}>全部区域</Select.Option>
        {areas && areas.map(area => (
          <Select.Option key={area.id} value={area.id}>{area.title}</Select.Option>
        ))}
      </Select>
      <Input.Search
        value={keyword}
        style={{ maxWidth: 400 }}
        placeholder="姓名/公司名，房间号，或电话"
        enterButton
        onChange={(e) => setKeyword(e.target.value)}
        onSearch={() => onSubmit({ keyword, area_id: areaId })}
      />
    </div>
  )
}

export default SearchBar
