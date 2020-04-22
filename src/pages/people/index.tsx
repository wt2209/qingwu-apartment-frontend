import React, { useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { Badge } from 'antd';
import { PersonListItem } from './data.d';
import { queryPerson } from './service';

const PeopleTableList: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<PersonListItem>[] = [
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      hideInSearch: true,
    },
    {
      title: '部门',
      dataIndex: 'department',
    },
    {
      title: '身份证号',
      dataIndex: 'identify',
    },
    {
      title: '工号',
      dataIndex: 'serial',
    },
    {
      title: '电话',
      dataIndex: 'phone',
    },
    {
      title: '入职时间',
      dataIndex: 'hired_at',
      valueType: 'date',
      hideInSearch: true,
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
      <ProTable<PersonListItem>
        headerTitle="人员明细"
        actionRef={actionRef}
        rowKey="id"
        request={params => queryPerson(params)}
        columns={columns}
        rowSelection={{}}
      />
    </PageHeaderWrapper>
  );
};

export default PeopleTableList;
