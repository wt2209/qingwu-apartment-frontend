import React, { useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { Badge } from 'antd';
import { CompanyListItem } from './data';
import { queryCompany } from './service';

const TableList: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<CompanyListItem>[] = [
    {
      title: '公司名称',
      dataIndex: 'company_name',
    },
    {
      title: '负责人',
      dataIndex: 'manager',
    },
    {
      title: '负责人电话',
      dataIndex: 'manager_phone',
    },
    {
      title: '日常联系人',
      dataIndex: 'linkman',
    },
    {
      title: '联系人电话',
      dataIndex: 'linkman_phone',
    },
    {
      title: '在用房间数',
      dataIndex: 'records_count',
    },
    {
      title: '状态',
      render: (count) => (
        count === 0 ? <Badge color='red' text='已退房' /> : <Badge color='green' text='在用' />
      ),
      hideInSearch: true,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      hideInSearch: true,
    },
    {
      title: '首次记录时间',
      dataIndex: 'created_at',
      valueType: 'date',
      hideInSearch: true,
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<CompanyListItem>
        headerTitle="公司明细"
        actionRef={actionRef}
        rowKey="id"
        request={params => queryCompany(params)}
        columns={columns}
        rowSelection={{}}
      />
    </PageHeaderWrapper>
  );
};

export default TableList;
