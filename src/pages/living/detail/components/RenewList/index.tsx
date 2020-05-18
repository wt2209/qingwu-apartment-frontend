import React, { useState, useEffect } from 'react'
import { RenewListItem } from '@/pages/basic/renews/data'
import { Divider, Table } from 'antd'
import styles from '../../style.less'
import { getRenewList } from '@/pages/living/service'

interface Props {
  recordId: number;
}

const columns = [
  {
    title: '原到期日',
    dataIndex: 'old_rent_end',
  },
  {
    title: '续签至',
    dataIndex: 'new_rent_end',
  },
  {
    title: '续签日期',
    dataIndex: 'renewed_at',
  },
]

const RenewList = (props: Props) => {
  const { recordId } = props
  const [renewList, setRenewList] = useState<Array<RenewListItem>>()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    (async () => {
      setLoading(true)
      const res = await getRenewList(recordId)
      if (res && res.data) {
        setRenewList(res.data)
      }
      setLoading(false)
    })()
  }, [])

  if (renewList && renewList.length > 0) {
    return (
      <>
        <Divider style={{ marginBottom: 32 }} />
        <div className={styles.title}>续签记录</div>
        <Table
          style={{ marginBottom: 24 }}
          loading={loading}
          pagination={false}
          dataSource={renewList}
          columns={columns}
          rowKey="id"
        />
      </>
    )
  }
  return null
}

export default RenewList
