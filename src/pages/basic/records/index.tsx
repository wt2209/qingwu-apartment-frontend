import React, { useRef, useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { Select } from 'antd';
import { queryRecord } from './service';
import { RecordListItem } from './data';
import { AreaListItem } from '../areas/data';
import { getAllAreas } from '../areas/service';
import { CategoryListItem } from '../categories/data';
import { getAllCategories } from '../categories/service';

const RecordTableList: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
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

  const columns: ProColumns<RecordListItem>[] = [
    {
      title: '姓名/公司名称',
      renderText: (record: RecordListItem) => {
        if (record.person) {
          return record.person.name
        }
        if (record.company) {
          return record.company.company_name
        }
        return '';
      },
    },
    {
      title: '所属区域',
      dataIndex: 'area_id',
      render: (_, row) => (row.area && row.area.title) ? row.area.title : '',
      renderFormItem: () => {
        return (
          <Select mode="multiple" placeholder="请选择">
            {areas && areas.map(area => (
              <Select.Option key={area.id} value={area.id}>{area.title}</Select.Option>
            ))}
          </Select>
        )
      }
    },
    {
      title: '类型',
      dataIndex: 'category_id',
      render: (_, row) => (row.category && row.category.title) ? row.category.title : '',
      renderFormItem: () => {
        return (
          <Select mode="multiple" placeholder="请选择">
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
      renderText: (record: RecordListItem) => {
        if (record.rent_start) {
          return `${record.rent_start} ~ ${record.rent_end}`
        }
        return ''
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        living: { text: '在住', status: 'Success' },
        moved: { text: '已调房', status: 'Default' },
        quitted: { text: '已退房', status: 'Error' },
      },
    },
    {
      title: '调房到',
      dataIndex: ['to_room', 'title'],
      hideInSearch: true,
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<RecordListItem>
        headerTitle="入住记录"
        actionRef={actionRef}
        rowKey="id"
        request={params => queryRecord(params)}
        columns={columns}
        rowSelection={{}}
      />
    </PageHeaderWrapper>
  );
};

export default RecordTableList;
