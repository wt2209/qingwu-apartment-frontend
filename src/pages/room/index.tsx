import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message, Badge, Input, Select } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import moment from 'moment';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { RoomListItem, RoomFormValueType } from './data.d';
import { queryRoom, updateRoom, addRoom, removeRoom } from './service';
import { SearchItems } from '../../global.d';
import ListTable from '@/components/ListTable';

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: RoomFormValueType) => {
  const hide = message.loading('正在添加');
  try {
    await addRoom({
      title: fields.title,
    });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新节点
 * @param fields
 */
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

/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: RoomListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRoom({
      key: selectedRows.map(row => row.id),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const RoomList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<Partial<RoomListItem>>({});
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<RoomListItem>[] = [
    {
      title: '所属区域',
      dataIndex: 'area_id',
      render: (_, row) => (row.area && row.area.title) ? row.area.title : '',
      renderFormItem: () => {
        return (
          <Select>
            <Select.Option value="all">全部</Select.Option>
            <Select.Option value="using">在用</Select.Option>
            <Select.Option value="deleted">已删除</Select.Option>
          </Select>
        )
      }
    },
    {
      title: '房间号',
      dataIndex: 'title'
    },
    {
      title: '类型',
      render: (_, row) => (row.category && row.category.title) ? row.category.title : '',
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
        row.deleted_at ? <Badge color='red' text='已删除' /> : <Badge color='green' text='在用' />
      ),
      renderFormItem: () => {
        return <Select>
          <Select.Option value="all">全部</Select.Option>
          <Select.Option value="using">在用</Select.Option>
          <Select.Option value="deleted">已删除</Select.Option>
        </Select>
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
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setFormValues(record);
            }}
          >
            修改
          </a>
          <Divider type="vertical" />
          <a href="">删除</a>
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
        toolBarRender={(action, { selectedRows }) => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async e => {
                    if (e.key === 'remove') {
                      await handleRemove(selectedRows);
                      action.reload();
                    }
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="remove">批量删除</Menu.Item>
                  <Menu.Item key="approval">批量审批</Menu.Item>
                </Menu>
              }
            >
              <Button>
                批量操作 <DownOutlined />
              </Button>
            </Dropdown>
          ),
        ]}
        tableAlertRender={({ selectedRowKeys, selectedRows }) => (
          <div>
            已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
            <span>
              服务调用次数总计 {selectedRows.reduce((pre, item) => pre + item.callNo, 0)} 万
            </span>
          </div>
        )}
        request={params => queryRoom(params)}
        columns={columns}
        rowSelection={{}}
      />

      <CreateForm
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
