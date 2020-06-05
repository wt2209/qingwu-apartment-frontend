import { DownOutlined, PlusOutlined, DownloadOutlined, ProfileOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message, Tag, Select, Badge, DatePicker } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { BillListItem } from './data.d';
import { addBill, updateBill, removeBill, queryBill, queryExportBill, generateBill } from './service';
import { FeeTypeListItem } from '../basic/feeTypes/data';
import { AreaListItem } from '../basic/areas/data';
import { getAllFeeTypes } from '../basic/feeTypes/service';
import { getAllAreas } from '../basic/areas/service';
import { exportXlsx } from '@/utils/exportXlsx';
import { ExportRender } from '@/global.d';
import GenerateBill from './components/GenerateBill';


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
  const [areas, setAreas] = useState<AreaListItem[]>()
  const [feeTypes, setFeeTypes] = useState<FeeTypeListItem[]>()
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [generateModalVisible, handleGenerateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const [exportParams, setExportParams] = useState({})
  const actionRef = useRef<ActionType>();

  const handleGenerateBill = async (values: { date: string; export: boolean }) => {
    const res = await generateBill(values)
    if (res?.data) {
      console.log(res.data)
    }
  }

  useEffect(() => {
    (async () => {
      const [res1, res2] = await Promise.all([getAllAreas(), getAllFeeTypes()])
      if (res1?.data) {
        setAreas(res1.data)
      }
      if (res2?.data) {
        setFeeTypes(res2.data)
      }
    })()
  }, [])

  const columns: (ExportRender & ProColumns<BillListItem>)[] = [
    {
      title: '缴/退费',
      dataIndex: 'is_refund',
      render: value => value ? '<span style="color:red">退费</span>' : null,
      renderFormItem: (record, { value, onChange }) => {
        return (
          <Select placeholder="请选择" value={value} onChange={onChange}>
            <Select.Option value="0">缴费</Select.Option>
            <Select.Option value="1">退费</Select.Option>
          </Select >
        )
      },
      exportRender: (row) => row.is_refund ? '退费' : ''
    },
    {
      title: '所属区域',
      dataIndex: ['area', 'title'],
      order: 10,
      exportRender: row => row?.area.title,
      renderFormItem: (record, { value, onChange }) => (
        <Select placeholder="请选择" value={value} onChange={onChange}>
          {areas?.map(area => (
            <Select.Option key={area.id} value={area.id}>{area.title}</Select.Option>
          ))}
        </Select>
      )
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
      renderFormItem: (record, { value, onChange }) => {
        return (
          <Select placeholder="请选择" mode="multiple" value={value} onChange={onChange}>
            {feeTypes?.map(type => (
              <Select.Option key={type.id} value={type.title}>{type.title}</Select.Option>
            ))}
          </Select>
        )
      }
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
      render: (value, record) => (
        <span>
          {record.turn_in ? <Tag color="green">上交</Tag> : <Tag color="red">自留</Tag>}
          {record.late_rate ? <Tag color="red">有滞纳金</Tag> : null}
        </span>
      ),
      exportRender: row => row.turn_in ? '上交' : '自留',
      renderFormItem: (record, { value, onChange }) => {
        return (
          <Select placeholder="请选择" value={value} onChange={onChange}>
            <Select.Option value="1">上交</Select.Option>
            <Select.Option value="0">自留</Select.Option>
          </Select >
        )
      },
    },
    {
      title: '缴费状态',
      dataIndex: 'status',
      render: (text, record) => {
        return record.charged_at ? <Badge color="green" text="已缴费" /> : <Badge color="red" text="未缴费" />
      },
      renderFormItem: (record, { value, onChange }) => {
        return (
          <Select placeholder="请选择" value={value} onChange={onChange}>
            <Select.Option value="charged">已缴费</Select.Option>
            <Select.Option value="uncharged">未缴费</Select.Option>
          </Select >
        )
      },
    },
    {
      title: '缴费时间',
      dataIndex: 'charged_at',
      valueType: 'date',
      renderFormItem: (record, { value, onChange }) => (
        <DatePicker.RangePicker picker="date" value={value} onChange={onChange} />
      )
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
          <Button icon={<PlusOutlined />} type="default" onClick={() => handleModalVisible(true)}>
            新建
          </Button>,
          <Button icon={<ProfileOutlined />} type="default" onClick={() => handleGenerateModalVisible(true)}>
            生成
          </Button>,
          <Button
            type="primary"
            onClick={() => exportXlsx(exportParams, columns, queryExportBill, '费用明细表')}>
            <DownloadOutlined /> 导出
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
        ]}
        tableAlertRender={({ selectedRowKeys, selectedRows }) => (
          <div>
            已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
            <span>
              费用共计 {selectedRows.reduce((pre, item) => pre + item.money, 0)} 元
            </span>
          </div>
        )}
        beforeSearchSubmit={(params) => { setExportParams(params); return params }}
        request={(params) => queryBill(params)}
        columns={columns}
        rowSelection={{}}
      />
      <CreateForm
        areas={areas}
        feeTypes={feeTypes}
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
          areas={areas}
          feeTypes={feeTypes}
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
      <GenerateBill
        onOk={handleGenerateBill}
        onCancel={() => handleGenerateModalVisible(false)}
        modalVisible={generateModalVisible}
      />
    </PageHeaderWrapper>
  );
};

export default BillList;
