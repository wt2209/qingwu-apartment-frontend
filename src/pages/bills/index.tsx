import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message, Tag, Select, Badge } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { BillListItem } from './data.d';
import { addBill, updateBill, removeBill, queryBill } from './service';


/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: FormValueType) => {
  const hide = message.loading('正在添加');
  try {
    await addBill(fields);
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
  const hide = message.loading('正在配置');
  try {
    await updateBill(fields);
    hide();

    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: BillListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeBill({
      id: selectedRows.map(row => row.id),
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

const BillList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<BillListItem>[] = [

    {
      title: '缴/退费',
      dataIndex: 'is_refund',
      render: value => value ? '<span style="color:red">退费</span>' : null,
      renderFormItem: () => {
        return (
          <Select placeholder="请选择" mode="multiple" defaultValue={["0", '1']}>
            <Select.Option value="0">
              <Tag color="success">缴费</Tag>
            </Select.Option>
            <Select.Option value="1">
              <Tag color="error">退费</Tag>
            </Select.Option>
          </Select >
        )
      },
    },
    {
      title: '缴费方式',
      dataIndex: 'way',
      valueEnum: {
        before: <Tag color="blue">预交费</Tag>,
        after: <Tag color="orange">财务扣款</Tag>
      },
      renderFormItem: () => {
        return (
          <Select placeholder="请选择" mode="multiple" defaultValue={["before", 'after']}>
            <Select.Option value="before">
              <Tag color="blue">预交费</Tag>
            </Select.Option>
            <Select.Option value="after">
              <Tag color="orange">财务扣款</Tag>
            </Select.Option>
          </Select >
        )
      },
    },
    {
      title: '所属区域',
      dataIndex: ['area', 'title'],
      order: 10,
    },
    {
      title: '房间/位置',
      dataIndex: 'location',
      order: 9,
    },
    {
      title: '住户姓名',
      dataIndex: 'name',
      order: 8,
    },
    {
      title: '费用类型',
      dataIndex: 'title',
      order: 7,
    },
    {
      title: '金额',
      dataIndex: 'money',
      valueType: 'money',
      hideInSearch: true,
    },
    {
      title: '费用说明',
      dataIndex: 'description',
      hideInSearch: true,
    },
    {
      title: '是否上交',
      dataIndex: 'turn_in',
      render: value => value ? <Tag color="green">上交</Tag> : <Tag color="red">自留</Tag>,
      renderFormItem: () => {
        return (
          <Select placeholder="请选择" mode="multiple" defaultValue={["1", '0']}>
            <Select.Option value="1">
              <Tag color="success">上交</Tag>
            </Select.Option>
            <Select.Option value="0">
              <Tag color="error">自留</Tag>
            </Select.Option>
          </Select >
        )
      },
    },
    {
      title: '滞纳金',
      dataIndex: 'rate',
      hideInSearch: true,
      render: (value, record) => {
        return record.late_rate && record.late_rate > 0 ? (
          <>
            <span>自{record.late_date}起</span><br />
            日滞纳金{record.late_rate}%
          </>
        ) : null
      }
    },
    {
      title: '缴费状态',
      dataIndex: 'status',
      render: (text, record) => {
        return record.charged_at ? <Badge color="green" text="已缴费" /> : <Badge color="red" text="未缴费" />
      },
      renderFormItem: () => {
        return (
          <Select placeholder="请选择" mode="multiple" defaultValue={["charged", 'uncharged']}>
            <Select.Option value="charged">
              <Tag color="success">已缴费</Tag>
            </Select.Option>
            <Select.Option value="uncharged">
              <Tag color="error">未缴费</Tag>
            </Select.Option>
          </Select >
        )
      },
    },
    {
      title: '缴费时间',
      dataIndex: 'charged_at',
      valueType: 'date',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a href="">缴费</a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
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
      <ProTable<BillListItem>
        headerTitle="费用明细"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={(action, { selectedRows }) => [
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
                  <Menu.Item key="charge">批量缴费</Menu.Item>
                  <Menu.Item key="remove">批量删除</Menu.Item>
                </Menu>
              }
            >
              <Button>
                批量操作 <DownOutlined />
              </Button>
            </Dropdown>
          ),
          <Button icon={<PlusOutlined />} type="primary" onClick={() => handleModalVisible(true)}>
            新建
          </Button>,
        ]}
        tableAlertRender={({ selectedRowKeys, selectedRows }) => (
          <div>
            已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
            <span>
              费用共计 {selectedRows.reduce((pre, item) => pre + item.money, 0)} 元
            </span>
          </div>
        )}
        request={(params) => queryBill(params)}
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
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async value => {
            const success = await handleUpdate(value);
            if (success) {
              handleModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}
    </PageHeaderWrapper>
  );
};

export default BillList;
