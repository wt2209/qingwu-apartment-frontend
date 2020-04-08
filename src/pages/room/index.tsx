import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message, Form, Row, Col, Input, Select, Card } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { RoomListItem, RoomListParams } from './data.d';
import { queryRoom, updateRoom, addRoom, removeRoom } from './service';
import { SearchItems } from '../../global.d';
import TableSearchBar from '@/components/TableSearchBar';
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
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [params, setParams] = useState({
    title: '',
    building: '',
    unit: '',
    status: 'all',
    page: 1,
    pageSize: 20,
  });

  const searchItems: SearchItems = {
    title: {
      label: '房间号',
      type: 'input',
    },
    building: {
      label: '楼号',
      type: 'input',
    },
    unit: {
      label: '单元',
      type: 'input',
    },
    status: {
      label: '状态',
      type: 'select',
      options: {
        all: '全部',
        using: '在用',
        deleted: '已删除'
      }
    }
  }

  const handlePageChange = (page: number, pageSize: number | undefined = 20) => {
    setParams({
      ...params,
      page,
      pageSize: pageSize
    })
  }

  const handleSearch = (values: RoomListParams) => {
    setParams({
      ...params,
      ...values,
      page: 1, // 点击查询后永远显示第一页
    })
  }

  const handleExport = () => { }

  const fetchData = async () => {
    setLoading(true)
    const { data, meta } = await queryRoom(params)
    setRooms(data)
    setLoading(false)
    setTotal(meta.total)
  }

  const pagination = {
    total,
    current: params.page,
    pageSize: params.pageSize,
    onChange: handlePageChange,
    onShowSizeChange: handlePageChange,
  }

  const actionRef = useRef<ActionType>();

  useEffect(() => {
    fetchData()
  }, [params])

  const columns: ProColumns<RoomListItem>[] = [
    {
      title: '所属区域',
      renderText: (_, row) => (row.area && row.area.title) ? row.area.title : ''
    },
    {
      title: '房间号',
      dataIndex: 'title',
      rules: [
        {
          required: true,
          message: '房间号必须填写',
        },
      ],
    },
    {
      title: '类型',
      renderText: (_, row) => (row.category && row.category.title) ? row.category.title : ''
    },
    {
      title: '楼号',
      dataIndex: 'building',
      sorter: true,
      rules: [
        {
          required: true,
          message: '楼号必须填写',
        },
      ],
    },
    {
      title: '单元',
      dataIndex: 'unit',
      sorter: true,
      rules: [
        {
          required: true,
          message: '单元必须填写',
        },
      ],
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        0: { text: '关闭', status: 'Default' },
        1: { text: '运行中', status: 'Processing' },
        2: { text: '已上线', status: 'Success' },
        3: { text: '异常', status: 'Error' },
      },
    },
    {
      title: '上次调度时间',
      dataIndex: 'updatedAt',
      sorter: true,
      valueType: 'dateTime',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
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
          <a href="">订阅警报</a>
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <TableSearchBar items={searchItems} onSearch={handleSearch} onExport={handleExport} />

      <ProTable<RoomListItem>
        headerTitle="房间明细"
        actionRef={actionRef}
        loading={loading}
        rowKey="id"
        toolBarRender={(action, { selectedRows }) => [
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
        search={false}
        dataSource={rooms}
        pagination={pagination}
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
