import React, { useState, useEffect } from 'react'
import { Input } from 'antd'
import { LivingFetchParams } from '../../data'

interface Props {
  fetchData: (params: LivingFetchParams) => void;
  params: LivingFetchParams
}

const SearchBar = (props: Props) => {
  const { params, fetchData } = props
  const [keyword, setKeyword] = useState<string>()

  useEffect(() => {
    if (!params.keyword) {
      setKeyword('')
    }
  }, [params])

  return (
    <div style={{ display: ' flex', alignItems: 'center' }}>
      <span style={{ marginRight: 8, display: 'inline', minWidth: 42 }}>搜索：</span>
      <Input.Search
        value={keyword}
        style={{ maxWidth: 400 }}
        placeholder="姓名/公司名，房间号，或电话"
        enterButton
        onChange={(e) => setKeyword(e.target.value)}
        onSearch={() => fetchData({ keyword })}
      />
    </div>
  )
}

export default SearchBar
