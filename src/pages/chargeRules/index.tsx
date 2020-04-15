import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message, Tag, Badge, Select } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { updateRule, addRule, queryChargeRule } from './service';
import { ChargeRuleListItem } from './data';
import { restoreArea, removeArea } from '../area/service';

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: FormValueType) => {
  const hide = message.loading('正在添加');
  try {
    await addRule(fields);
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
    await updateRule(fields);
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
      await restoreArea(id)
    } else {
      await removeArea(id)
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
    },
    {
      title: '缴费间隔',
      dataIndex: 'period',
      renderText: text => `${text} 个月`
    },
    {
      title: '缴费项目',
      render: (_, { rule }) => (
        <div>
          {rule.map(item => (
            <div key={item.name} style={{ margin: '3px 0' }}>
              <Badge color="green" />
              <Tag color={item.turn_in ? 'success' : 'warning'} >{item.turn_in ? '上交财务' : '物业自留'}</Tag>
              {item.name}: {item.fee.join(', ')}
              {item.rate ? <Tag style={{ marginLeft: 20 }} color="error">滞纳金率：{item.rate}%</Tag> : null}
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
      renderFormItem: () => {
        return (
          <Select>
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
                <Divider type="vertical" style={{ margin: 0 }} />
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
          onSubmit={async (value) => {
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

export default TableList;
