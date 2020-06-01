import React, { useRef, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { Badge, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { PersonListItem } from './data';
import { queryPerson, queryExportPerson } from './service';
import { exportXlsx } from '@/utils/exportXlsx';
import { ExportRender } from '@/global.d';

const PeopleTableList: React.FC<{}> = () => {
  const [exportParams, setExportParams] = useState({})

  const actionRef = useRef<ActionType>();
  const columns: (ExportRender & ProColumns<PersonListItem>)[] = [
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
      dataIndex: 'records_count',
      exportRender: row => row.records_count > 0 ? '在住' : '已退房',
      render: (count) => (
        count === 0 ? <Badge color='red' text='已退房' /> : <Badge color='green' text='在住' />
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
        toolBarRender={() => [
          <Button
            type="primary"
            onClick={() => exportXlsx(exportParams, columns, queryExportPerson, '人员明细表')}>
            <DownloadOutlined /> 导出
          </Button>,
        ]}
        request={params => queryPerson(params)}
        beforeSearchSubmit={(params) => { setExportParams(params); return params }}
        columns={columns}
        rowSelection={{}}
      />
    </PageHeaderWrapper>
  );
};

export default PeopleTableList;
