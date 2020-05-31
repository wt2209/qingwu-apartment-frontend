import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message, Tag, Badge, Select } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { queryChargeRule, updateChargeRule, addChargeRule, restoreChargeRule, removeChargeRule } from './service';
import { ChargeRuleListItem } from './data';
import { ChargeRuleTypeMapper, ChargeRuleWayMapper } from './mapper'

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: FormValueType) => {
  const hide = message.loading('正在添加');
  try {
    await addChargeRule(fields);
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
const handleUpdate = async (id: number, fields: FormValueType) => {
  const hide = message.loading('正在配置');
  try {
    await updateChargeRule(id, fields);
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
      await restoreChargeRule(id)
    } else {
      await removeChargeRule(id)
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
  const columns: ProColumns<ChargeRuleListItem>[] = [
    {
      title: '名称',
      dataIndex: 'title',
      hideInSearch: true,
    },
    {
      title: '缴费间隔',
      dataIndex: 'period',
      hideInSearch: true,
      renderText: text => `${text} 个月`
    },
    {
      title: '所属类型',
      dataIndex: 'type',
      valueEnum: ChargeRuleTypeMapper,
    },
    {
      title: '缴费方式',
      dataIndex: 'way',
      valueEnum: ChargeRuleWayMapper,
    },
    {
      title: '缴费项目',
      render: (_, { rule }) => (
        <div>
          {rule.map(item => (
            <div key={item.title} style={{ margin: '3px 0' }}>
              <Badge color="green" />
              <Tag color={item.turn_in ? 'success' : 'warning'} >{item.turn_in ? '上交' : '自留'}</Tag>
              {item.title}: {item.fee.join(', ')}
              {parseFloat(item.rate) > 0 ? <Tag style={{ marginLeft: 20 }} color="error">日滞纳金：{parseFloat(item.rate)}%</Tag> : null}
            </div>
          ))}
        </div>
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (_, row) => (
        row.deleted_at ? <Badge color='red' text='已停用' /> : <Badge color='green' text='在用' />
      ),
      renderFormItem: (item, { value, onChange }) => {
        return (
          <Select value={value} onChange={onChange} placeholder="请选择">
            <Select.Option value="all">全部</Select.Option >
            <Select.Option value="using">在用</Select.Option>
            <Select.Option value="deleted">已停用</Select.Option>
          </Select >
        )
      },
    },
    {
      title: '备注',
      dataIndex: 'remark',
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
                  setStepFormValues(record);
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
      <ProTable<ChargeRuleListItem>
        headerTitle="收费规则"
        actionRef={actionRef}
        rowKey="id"
        form={{ initialValues: { status: 'all' } }}
        toolBarRender={() => [
          <Button icon={<PlusOutlined />} type="primary" onClick={() => handleModalVisible(true)}>
            新建
          </Button>,
        ]}
        request={(params) => queryChargeRule(params)}
        columns={columns}
        rowSelection={{}}
      />
      <CreateForm
        onSubmit={async (value) => {
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
