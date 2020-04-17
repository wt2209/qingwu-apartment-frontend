import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message, Badge, Select } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import moment from 'moment';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { RoomListItem, RoomFormValueType } from './data.d';
import { queryRoom, updateRoom, addRoom, removeRoom, restoreRoom } from './service';
import { AreaListItem } from '../area/data';
import { CategoryListItem } from '../categories/data';
import { getAllCategories } from '../categories/service';
import { getAllAreas } from '../area/service';

const handleAdd = async (fields: RoomFormValueType) => {
  const hide = message.loading('正在添加');
  try {
    await addRoom(fields);
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

const handleUpdate = async (id: number | undefined, fields: RoomFormValueType) => {
  const hide = message.loading('正在修改');
  try {
    await updateRoom(id, fields);
    hide();
    message.success('修改成功');
    return true;
  } catch (error) {
    hide();
    message.error('修改失败请重试！');
    return false;
  }
};

const handleChangeStatus = async (id: number, status: boolean) => {
  const hide = message.loading('正在修改');
  try {
    if (status) {
      await restoreRoom(id)
    } else {
      await removeRoom(id)
    }
    hide();
    message.success('修改成功');
    return true;
  } catch (error) {
    hide();
    message.error('修改失败请重试！');
    return false;
  }
}

const RoomList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<Partial<RoomListItem>>({});
  const [areas, setAreas] = useState<AreaListItem[]>()
  const [categories, setCategories] = useState<CategoryListItem[]>()
  const actionRef = useRef<ActionType>();

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

  const columns: ProColumns<RoomListItem>[] = [
    {
      title: '所属区域',
      dataIndex: 'areas[]',
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
      dataIndex: 'categories[]',
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
      title: '房间号',
      dataIndex: 'title'
    },
    {
      title: '楼号',
      dataIndex: 'building',
    },
    {
      title: '单元',
      dataIndex: 'unit',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (_, row) => (
        row.deleted_at ? <Badge color='red' text='已停用' /> : <Badge color='green' text='在用' />
      ),
      renderFormItem: () => {
        return (
          <Select>
            <Select.Option value="all">全部</Select.Option>
            <Select.Option value="using">在用</Select.Option>
            <Select.Option value="deleted">已停用</Select.Option>
          </Select>
        )
      },
    },
    {
      title: '备注',
      dataIndex: 'remark',
      hideInSearch: true,
    },
    {
      title: '上次修改时间',
      render: (_, row) => row.updated_at && moment(row.updated_at).format('YYYY-MM-DD')
    },
    {
      title: '操作',
      render: (_, record) => (
        <>
          {record.deleted_at
            ? <a onClick={async () => {
              await handleChangeStatus(record.id, true)
              if (actionRef.current) {
                actionRef.current.reload()
              }
            }}>启用</a>
            : (
              <>
                <a onClick={async () => {
                  await handleChangeStatus(record.id, false)
                  if (actionRef.current) {
                    actionRef.current.reload()
                  }
                }}>禁用</a>
                <Divider type="vertical" style={{ margin: 0 }} />
                <a onClick={() => {
                  handleUpdateModalVisible(true);
                  setFormValues(record);
                }}>修改</a>
              </>
            )
          }
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<RoomListItem>
        headerTitle="房间明细"
        actionRef={actionRef}
        form={{ initialValues: { status: 'all' } }}
        rowKey="id"
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={params => queryRoom(params)}
        columns={columns}
        rowSelection={{}}
      />

      <CreateForm
        areas={areas}
        categories={categories}
        onSubmit={async value => {
          const success = await handleAdd(value);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      />
      {
        formValues && Object.keys(formValues).length ? (
          <UpdateForm
            areas={areas}
            categories={categories}
            onSubmit={async value => {
              const success = await handleUpdate(formValues.id, value);
              if (success) {
                handleModalVisible(false);
                setFormValues({});
                if (actionRef.current) {
                  actionRef.current.reload();
                }
              }
            }}
            onCancel={() => {
              handleUpdateModalVisible(false);
              setFormValues({});
            }}
            updateModalVisible={updateModalVisible}
            values={formValues}
          />
        ) : null
      }
    </PageHeaderWrapper >
  );
};

export default RoomList;
