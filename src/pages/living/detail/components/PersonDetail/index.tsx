import React, { useState, useEffect } from 'react'
import { RecordListItem } from '@/pages/basic/records/data'
import { Descriptions, Divider, Table } from 'antd'
import styles from '../../style.less'
import { getMoveList } from '@/pages/living/service'
import ProofFiles from '../ProofFiles'

interface Props {
  record: RecordListItem | undefined
}

const moveListColumns = [
  {
    title: '姓名',
    key: 'name',
    render: (_: any, row: RecordListItem) => row.person.name
  },
  {
    title: '原房间号',
    key: 'title',
    render: (_: any, row: RecordListItem) => row.room.title
  },
  {
    title: '调整到房间',
    key: 'to_title',
    render: (_: any, row: RecordListItem) => row?.to_room?.title
  },
  {
    title: '调房日期',
    dataIndex: 'deleted_at',
  },
]

const PersonDetail = (props: Props) => {
  const [moveLoading, setMoveLoading] = useState<boolean>(false)
  const [moveList, setMoveList] = useState<Array<any>>()
  const { record } = props

  useEffect(() => {
    (async () => {
      setMoveLoading(true)
      const res = await getMoveList(record?.person.id)
      if (res && res.data) {
        setMoveList(res.data)
      }
      setMoveLoading(false)
    })()
  }, [])

  return (
    <>
      <Descriptions title="个人信息" style={{ marginBottom: 32 }}>
        <Descriptions.Item label="房间号">{record?.room?.title}</Descriptions.Item>
        <Descriptions.Item label="姓名">{record?.person.name}</Descriptions.Item>
        <Descriptions.Item label="性别">{record?.person?.gender}</Descriptions.Item>
        <Descriptions.Item label="学历">{record?.person?.education}</Descriptions.Item>
        <Descriptions.Item label="部门">{record?.person?.department}</Descriptions.Item>
        <Descriptions.Item label="工号">{record?.person?.serial}</Descriptions.Item>
        <Descriptions.Item label="身份证号">{record?.person?.identify}</Descriptions.Item>
        <Descriptions.Item label="电话">{record?.person?.phone}</Descriptions.Item>
        <Descriptions.Item label="入职时间">{record?.person?.hired_at}</Descriptions.Item>
        <Descriptions.Item label="劳动合同期限">{`${record?.person?.contract_start}~${record?.person?.contract_end}`}</Descriptions.Item>
        <Descriptions.Item label="本房间入住日期">{record?.record_at}</Descriptions.Item>
        <Descriptions.Item label="租期期限">{`${record?.rent_start}~${record?.rent_end}`}</Descriptions.Item>
        <Descriptions.Item label="首次入住公寓时间">{record?.person?.created_at}</Descriptions.Item>
        <Descriptions.Item label="备注">{record?.person?.remark}</Descriptions.Item>
      </Descriptions>

      <ProofFiles files={record?.proof_files} />

      {(moveList && moveList.length > 0) ? (
        <>
          <Divider style={{ marginBottom: 32 }} />
          <div className={styles.title}>调房记录</div>
          <Table
            style={{ marginBottom: 24 }}
            loading={moveLoading}
            pagination={false}
            dataSource={moveList}
            columns={moveListColumns}
            rowKey="id"
          />
        </>) : null}
    </>
  )
}

export default PersonDetail
