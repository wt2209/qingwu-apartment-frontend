import React, { useRef, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { DownloadOutlined } from '@ant-design/icons';
import { exportXlsx } from '@/utils/exportXlsx';
import { Button } from 'antd';
import { queryRename, queryExportRename } from './service';
import { ExportRender } from '@/global.d';

const RenameTableList: React.FC<{}> = () => {
  const [exportParams, setExportParams] = useState({})
  const actionRef = useRef<ActionType>();

  const columns: (ExportRender & ProColumns<any>)[] = [
    {
      title: '公司名称',
      dataIndex: 'company_name',
      exportRender: row => row?.company?.company_name,
      renderText: (_text, row) => row?.company?.company_name,
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
        toolBarRender={() => [
          <Button
            type="primary"
            onClick={() => exportXlsx(exportParams, columns, queryExportRename, '公司改名表')}>
            <DownloadOutlined /> 导出
          </Button>,
        ]}
        beforeSearchSubmit={(params) => { setExportParams(params); return params }}
        request={params => queryRename(params)}
        columns={columns}
        rowSelection={{}}
      />
    </PageHeaderWrapper>
  );
};

export default RenameTableList;
