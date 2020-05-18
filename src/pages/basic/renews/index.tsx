import React, { useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { RenewListItem } from './data';
import { queryRenew } from './service';
import { typeMapper } from '../categories/mapper';

const RenewTableList: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<RenewListItem>[] = [
    {
      title: '属于',
      dataIndex: ['record', 'type'],
      valueEnum: typeMapper
    },
    {
      title: '房间号',
      dataIndex: ['record', 'room', 'title'],
    },
    {
      title: '姓名',
      dataIndex: ['record', 'person', 'name'],
    },
    {
      title: '公司名称',
      dataIndex: ['record', 'company', 'company_name'],
    },
    {
      title: '租期开始日',
      dataIndex: ['record', 'rent_start'],
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '原到期日',
      dataIndex: 'old_rent_end',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '续签至',
      dataIndex: 'new_rent_end',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '续签日期',
      dataIndex: 'renewed_at',
      valueType: 'date',
      hideInSearch: true,
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<RenewListItem>
        headerTitle="人员明细"
        actionRef={actionRef}
        rowKey="id"
        request={params => queryRenew(params)}
        columns={columns}
        rowSelection={{}}
        beforeSearchSubmit={(params) => { console.log(params); return params }}
      />
    </PageHeaderWrapper>
  );
};

export default RenewTableList;
