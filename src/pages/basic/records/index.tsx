import React, { useRef, useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { Select, Button } from 'antd';
import { ExportRender } from '@/global.d';
import { DownloadOutlined } from '@ant-design/icons';
import { exportXlsx } from '@/utils/exportXlsx';
import { queryRecord, queryExportRecord } from './service';
import { RecordListItem } from './data';
import { AreaListItem } from '../areas/data';
import { getAllAreas } from '../areas/service';
import { CategoryListItem } from '../categories/data';
import { getAllCategories } from '../categories/service';

const RecordTableList: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const [exportParams, setExportParams] = useState({})
  const [areas, setAreas] = useState<AreaListItem[]>()
  const [categories, setCategories] = useState<CategoryListItem[]>()

  useEffect(() => {
    Promise.all([getAllAreas(), getAllCategories()])
      .then(res => {
        if (res[0].data) {
          setAreas(res[0].data)
        }
        if (res[1].data) {
          setCategories(res[1].data)
        }
      })
  }, [])

  const columns: (ExportRender & ProColumns<RecordListItem>)[] = [
    {
      title: '所属区域',
      dataIndex: 'area_id',
      exportRender: row => row?.area?.title,
      render: (_, row) => row?.area?.title,
      renderFormItem: (item, { value, onChange }) => {
        return (
          <Select value={value} onChange={onChange} mode="multiple" placeholder="请选择">
            {areas && areas.map(area => (
              <Select.Option key={area.id} value={area.id}>{area.title}</Select.Option>
            ))}
          </Select>
        )
      }
    },
    {
      title: '房间号',
      exportRender: row => row?.room?.title,
      dataIndex: 'room',
      renderText: (_text, row) => row?.room?.title,
    },
    {
      title: '姓名',
      exportRender: row => row?.person?.name,
      dataIndex: 'name',
      renderText: (_text, row) => row?.person?.name,
    },
    {
      title: '身份证号',
      exportRender: row => row?.person?.identify,
      dataIndex: 'identify',
      renderText: (_text, row) => row?.person?.identify,
    },
    {
      title: '公司名称',
      exportRender: row => row?.company?.company_name,
      dataIndex: 'company_name',
      renderText: (_text, row) => row?.company?.company_name,
    },
    {
      title: '类型',
      dataIndex: 'category_id',
      render: (_, row) => (row.category && row.category.title) ? row.category.title : '',
      renderFormItem: (item, { value, onChange }) => {
        return (
          <Select value={value} onChange={onChange} mode="multiple" placeholder="请选择">
            {categories && categories.map(category => (
              <Select.Option key={category.id} value={category.id}>{category.title}</Select.Option>
            ))}
          </Select>
        )
      }
    },
    {
      title: '入住时间',
      dataIndex: 'record_at',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '租期',
      exportRender: row => row.rent_start ? `${row.rent_start} ~ ${row.rent_end}` : '',
      renderText: (_text, row) => row.rent_start ? `${row.rent_start} ~ ${row.rent_end}` : '',
    },
    {
      title: '状态',
      dataIndex: 'status',
      order: 10,
      exportRender: row => {
        switch (row.status) {
          case 'living':
            return '在住'
          case 'moved':
            return '已调房'
          case 'quitted':
            return '已退房'
          default:
            return ''
        }
      },
      valueEnum: {
        living: { text: '在住', status: 'Success' },
        moved: { text: '已调房', status: 'Default' },
        quitted: { text: '已退房', status: 'Error' },
      },
    },
    {
      title: '调房到',
      exportRender: row => row?.to_room?.title,
      dataIndex: ['to_room', 'title'],
      hideInSearch: true,
    },
  ];

  return (
    <PageHeaderWrapper title={false}>
      <ProTable<RecordListItem>
        headerTitle="入住记录"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          <Button
            type="primary"
            onClick={() => exportXlsx(exportParams, columns, queryExportRecord, '入住记录表')}>
            <DownloadOutlined /> 导出
          </Button>,
        ]}
        beforeSearchSubmit={(params) => { setExportParams(params); return params }}
        request={params => queryRecord(params)}
        columns={columns}
        rowSelection={{}}
      />
    </PageHeaderWrapper>
  );
};

export default RecordTableList;
