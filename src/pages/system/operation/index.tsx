import React, { useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { queryOperation } from './service';
import { OperationListItem } from './data.d';

const OperationList: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<OperationListItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '用户名',
      dataIndex: 'user',
      render: (value, row) => row?.user?.name
    },
    {
      title: '来源IP',
      dataIndex: 'ip',
    },
    {
      title: '路径',
      dataIndex: 'path',
    },
    {
      title: '方法',
      dataIndex: 'method',
      valueEnum: {
        GET: 'GET',
        POST: 'POST',
        PUT: 'PUT',
        PATCH: 'PATCH',
        DELETE: 'DELETE',
      },
    },
    {
      title: '参数',
      dataIndex: 'inputs',
      renderText: value => JSON.stringify(value),
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      valueType: 'dateTime',
      hideInSearch: true,
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<OperationListItem>
        headerTitle="操作记录"
        actionRef={actionRef}
        rowKey="id"
        request={(params) => queryOperation(params)}
        columns={columns}
        rowSelection={{}}
      />
    </PageHeaderWrapper>
  );
};

export default OperationList;
