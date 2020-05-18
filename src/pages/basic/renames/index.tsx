import React, { useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { queryRename } from './service';

const RenameTableList: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<any>[] = [
    {
      title: '公司名称',
      dataIndex: 'company_name',
      hideInTable: true,
    },
    {
      title: '现公司名称',
      dataIndex: ['company', 'company_name'],
      hideInSearch: true,
    },
    {
      title: '由',
      dataIndex: 'old_company_name',
      hideInSearch: true,
    },
    {
      title: '改为',
      dataIndex: 'new_company_name',
      hideInSearch: true,
    },
    {
      title: '改名日期',
      dataIndex: 'renamed_at',
      valueType: 'date',
      hideInSearch: true,
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<any>
        headerTitle="公司改名"
        actionRef={actionRef}
        rowKey="id"
        request={params => queryRename(params)}
        columns={columns}
        rowSelection={{}}
        beforeSearchSubmit={(params) => { console.log(params); return params }}
      />
    </PageHeaderWrapper>
  );
};

export default RenameTableList;
