import React, { useRef, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { RenewListItem } from './data';
import { queryRenew, queryExportRenew } from './service';
import { typeMapper } from '../categories/mapper';
import { ExportRender } from '@/global.d';
import { exportXlsx } from '@/utils/exportXlsx';

const RenewTableList: React.FC<{}> = () => {
  const [exportParams, setExportParams] = useState({})
  const actionRef = useRef<ActionType>();
  const columns: (ExportRender & ProColumns<RenewListItem>)[] = [
    {
      title: '属于',
      dataIndex: ['record', 'type'],
      exportRender: row => typeMapper[row?.record?.type],
      valueEnum: typeMapper
    },
    {
      title: '房间号',
      exportRender: row => row?.record?.room?.title,
      dataIndex: ['record', 'room', 'title'],
    },
    {
      title: '姓名',
      exportRender: row => row?.record?.person?.name,
      dataIndex: ['record', 'person', 'name'],
    },
    {
      title: '公司名称',
      exportRender: row => row?.record?.company?.company_name,
      dataIndex: ['record', 'company', 'company_name'],
    },
    {
      title: '租期开始日',
      exportRender: row => row?.record?.rent_start,
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
        headerTitle="续签记录"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          <Button
            type="primary"
            onClick={() => exportXlsx(exportParams, columns, queryExportRenew, '续签记录表')}>
            <DownloadOutlined /> 导出
          </Button>,
        ]}
        beforeSearchSubmit={(params) => { setExportParams(params); return params }}
        request={params => queryRenew(params)}
        columns={columns}
        rowSelection={{}}
      />
    </PageHeaderWrapper>
  );
};

export default RenewTableList;
