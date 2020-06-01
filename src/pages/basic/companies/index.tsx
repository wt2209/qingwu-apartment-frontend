import React, { useRef, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { Badge, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { CompanyListItem } from './data';
import { queryCompany, queryExportCompany } from './service';
import { exportXlsx } from '@/utils/exportXlsx';
import { ExportRender } from '@/global.d';

const TableList: React.FC<{}> = () => {
  const [exportParams, setExportParams] = useState({})

  const actionRef = useRef<ActionType>();
  const columns: (ExportRender & ProColumns<CompanyListItem>)[] = [
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
      dataIndex: 'records_count',
      exportRender: row => row.records_count > 0 ? '在住' : '已退房',
      renderText: (count) => (
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
      <ProTable<CompanyListItem>
        headerTitle="公司明细"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          <Button
            type="primary"
            onClick={() => exportXlsx(exportParams, columns, queryExportCompany, '公司明细表')}>
            <DownloadOutlined /> 导出
          </Button>,
        ]}
        request={params => queryCompany(params)}
        beforeSearchSubmit={(params) => { setExportParams(params); return params }}
        columns={columns}
        rowSelection={{}}
      />
    </PageHeaderWrapper>
  );
};

export default TableList;
