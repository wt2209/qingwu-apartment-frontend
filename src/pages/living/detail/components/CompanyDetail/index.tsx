import React from 'react'
import { RecordListItem } from '@/pages/records/data'
import { Descriptions, Divider, Table } from 'antd'
import styles from '../../style.less'
import ProofFiles from '../ProofFiles'

interface Props {
  record: RecordListItem | undefined
}

const CompanyDetail = (props: Props) => {
  const { record } = props
  return (
    <>
      <Descriptions title="公司信息" style={{ marginBottom: 32 }}>
        <Descriptions.Item label="公司名称">{record?.company?.company_name}</Descriptions.Item>
        <Descriptions.Item label="公司负责人">{record?.company?.manager}</Descriptions.Item>
        <Descriptions.Item label="负责人电话">{record?.company?.manager_phone}</Descriptions.Item>
        <Descriptions.Item label="日常联系人">{record?.company?.linkman}</Descriptions.Item>
        <Descriptions.Item label="联系人电话">{record?.company?.linkman_phone}</Descriptions.Item>
        <Descriptions.Item label="公司备注">{record?.company?.remark}</Descriptions.Item>
      </Descriptions>

      <ProofFiles files={record?.proof_files} />

      <Divider style={{ marginBottom: 32 }} />
      <div className={styles.title}>公司改名记录</div>
      <Table
        style={{ marginBottom: 24 }}
        pagination={false}
        // loading={loading}
        // dataSource={goodsData}
        // columns={goodsColumns}
        rowKey="id"
      />
    </>
  )
}

export default CompanyDetail
