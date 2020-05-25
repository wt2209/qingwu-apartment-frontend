import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message, Tag, Badge, Select } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { queryFeeType, restoreFeeType, removeFeeType, updateFeeType, addFeeType } from './service';
import { FeeTypeListItem } from './data';

const handleAdd = async (fields: FormValueType) => {
  const hide = message.loading('正在添加');
  try {
    await addFeeType(fields);
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

const handleUpdate = async (id: number, fields: FormValueType) => {
  const hide = message.loading('正在配置');
  try {
    await updateFeeType(id, fields);
    hide();

    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

const handleChangeStatus = async (id: number, status: boolean) => {
  const hide = message.loading('正在修改');
  try {
    if (status) {
      await restoreFeeType(id)
    } else {
      await removeFeeType(id)
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

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<FeeTypeListItem>[] = [
    {
      title: '费用名称',
      dataIndex: 'title',
      hideInSearch: true,
    },
    {
      title: '每日滞纳金率',
      dataIndex: 'rate',
      renderText: (rate) => `${parseFloat(rate)}%`,
      hideInSearch: true,
    },
    {
      title: '是否上交',
      dataIndex: 'turn_in',
      render: (turnIn) => (
        <Tag color={turnIn ? 'success' : 'warning'} >{turnIn ? '上交' : '自留'}</Tag>
      ),
      renderFormItem: () => (
        <Select placeholder="请选择">
          <Select.Option value={1}>上交</Select.Option >
          <Select.Option value={0}>自留</Select.Option>
        </Select >
      )
    },
    {
      title: '备注',
      dataIndex: 'remark',
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
          <Select placeholder="请选择">
            <Select.Option value="all">全部</Select.Option >
            <Select.Option value="using">在用</Select.Option>
            <Select.Option value="deleted">已停用</Select.Option>
          </Select >
        )
      },
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '上次修改时间',
      dataIndex: 'updated_at',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
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
                <Divider type="vertical" />
                <a onClick={() => {
                  handleUpdateModalVisible(true);
                  setStepFormValues({
                    ...record,
                    turn_in: !!record.turn_in
                  });
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
      <ProTable<FeeTypeListItem>
        headerTitle="费用类型"
        actionRef={actionRef}
        rowKey="id"
        form={{ initialValues: { status: 'all' } }}
        toolBarRender={() => [
          <Button icon={<PlusOutlined />} type="primary" onClick={() => handleModalVisible(true)}>
            新建
          </Button>,
        ]}
        request={params => queryFeeType(params)}
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
          onSubmit={async (id, value) => {
            const success = await handleUpdate(id, value);
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

export default TableList;
