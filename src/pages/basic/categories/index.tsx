import { PlusOutlined, DownloadOutlined } from '@ant-design/icons';
import { Button, Divider, message, Badge, Select } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { exportXlsx } from '@/utils/exportXlsx';
import { ExportRender } from '@/global.d';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { queryCategory, restoreCategory, removeCategory, addCategory, updateCategory, queryExportCategory } from './service';
import { typeMapper } from './mapper';
import { CategoryListItem } from './data';

const handleAdd = async (fields: FormValueType) => {
  const hide = message.loading('正在添加');
  try {
    await addCategory(fields);
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
    await updateCategory(id, fields);
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
      await restoreCategory(id)
    } else {
      await removeCategory(id)
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
  const [formValues, setFormValues] = useState({});
  const [exportParams, setExportParams] = useState({})

  const actionRef = useRef<ActionType>();
  const columns: (ExportRender & ProColumns<CategoryListItem>)[] = [
    {
      title: '名称',
      dataIndex: 'title',
      hideInSearch: true,
    },
    {
      title: '类别',
      dataIndex: 'type',
      valueEnum: typeMapper,
      exportRender: row => (typeMapper[row.type])
    },
    {
      title: '水电收费',
      dataIndex: 'utility_type',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (_, row) => (
        row.deleted_at ? <Badge color='red' text='已停用' /> : <Badge color='green' text='在用' />
      ),
      exportRender: row => (
        row.deleted_at ? '已停用' : '在用'
      ),
      renderFormItem: (item, { value, onChange }) => {
        return (
          <Select value={value} onChange={onChange} >
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
    <PageHeaderWrapper title={false}>
      <ProTable<CategoryListItem>
        headerTitle="类型明细"
        actionRef={actionRef}
        form={{ initialValues: { status: 'all' } }}
        rowKey="id"
        toolBarRender={() => [
          <Button icon={<PlusOutlined />} type="default" onClick={() => handleModalVisible(true)}>
            新建
          </Button>,
          <Button
            type="primary"
            onClick={() => exportXlsx(exportParams, columns, queryExportCategory, '类型明细表')}>
            <DownloadOutlined /> 导出
          </Button>,
        ]}
        request={(params) => queryCategory(params)}
        beforeSearchSubmit={(params) => { setExportParams(params); return params }}
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
      {formValues && Object.keys(formValues).length ? (
        <UpdateForm
          onSubmit={async (id, value) => {
            const success = await handleUpdate(id, value);
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
      ) : null}
    </PageHeaderWrapper>
  );
};

export default TableList;
