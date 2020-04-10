import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message, Badge } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { ProColumns, ActionType } from '@ant-design/pro-table';
import moment from 'moment';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { RoomListItem } from './data.d';
import { queryRoom, updateRoom, addRoom, removeRoom } from './service';
import { SearchItems } from '../../global.d';
import ListTable from '@/components/ListTable';

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: FormValueType) => {
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
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在修改');
  try {
    await updateRoom({
      title: fields.title,
      building: fields.building,
      unit: fields.unit,
    });
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
  const [formValues, setFormValues] = useState({});
  const actionRef = useRef<ActionType>();

  const initialParams = {
    title: '',
    building: '',
    unit: '',
    status: 'all',
    page: 1,
    pageSize: 20,
  };

  const searchItems: SearchItems = {
    title: {
      label: '房间号',
      type: 'input',
    },
    building: {
      label: '楼号',
      type: 'input',
    },
    status: {
      label: '状态',
      type: 'select',
      default: 'all',
      options: {
        all: '全部',
        using: '在用',
        deleted: '已删除'
      }
    }
  }

  const columns: ProColumns<RoomListItem>[] = [
    {
      title: '所属区域',
      render: (_, row) => (row.area && row.area.title) ? row.area.title : ''
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
    },
    {
      title: '状态',
      render: (_, row) => (
        row.deletedAt ? <Badge color='red' text='已删除' /> : <Badge color='green' text='在用' />
      )
    },
    {
      title: '收费项目',
      render: () => {
        const items = [
          { title: '租赁房租', fees: '600,700,800' },
          { title: '单身床位费', fees: '0，0，0，0，230' },
          { title: '租赁物业费', fees: '42' },
        ]
        return (
          <>
            {items.map(item =>
              <p style={{ marginBottom: 0 }}>{item.title}: {item.fees}</p>
            )}
          </>
        )
      }
    },
    {
      title: '上次修改时间',
      render: (_, row) => row.updatedAt && moment(row.updatedAt).format('YYYY-MM-DD')
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
      <ListTable<RoomListItem>
        title="房间明细"
        request={queryRoom}
        actionRef={actionRef}
        search={searchItems}
        initialParams={initialParams}
        columns={columns}
        toolBarRender={(action, selectedRowKeys, selectedRows) => [
          <Button icon={<PlusOutlined />} type="primary" onClick={() => handleModalVisible(true)}>
            新建
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async e => {
                    if (e.key === 'remove') {
                      await handleRemove(selectedRows);
                      if (action) {
                        action.reload();
                      }
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
              const success = await handleUpdate(value);
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
