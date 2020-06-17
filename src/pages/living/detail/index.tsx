import { Card, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { RecordListItem } from '@/pages/basic/records/data';
import { Link } from 'umi';
import { LeftOutlined } from '@ant-design/icons';
import CompanyDetail from './components/CompanyDetail';
import PersonDetail from './components/PersonDetail';
import { getOneLiving } from '../service';

interface Props {
  match: { params: { recordId: number } }
}

const Detail = (props: Props) => {
  const { match: { params: { recordId } } } = props
  const [record, setRecord] = useState<RecordListItem>()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    (async () => {
      setLoading(true)
      const res = await getOneLiving(recordId)
      if (res && res.data) {
        setRecord(res.data)
      }
      setLoading(false)
    })()
  }, [])

  const renderContent = () => {
    if (record?.type === 'company') {
      return <CompanyDetail record={record} />
    }
    if (record?.type === 'person') {
      return <PersonDetail record={record} />
    }
    return null
  }

  return (
    <PageHeaderWrapper title="详情">
      <Spin spinning={loading}>
        <Card bordered={false} title={<Link to='/livings'><LeftOutlined /> 返回</Link>}>
          {renderContent()}
        </Card>
      </Spin>
    </PageHeaderWrapper>
  );
}

export default Detail;
