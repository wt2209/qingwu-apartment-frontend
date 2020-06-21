import { PlusOutlined, DownloadOutlined, ProfileOutlined, UploadOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, Button, message, Tag, Select, Badge, DatePicker } from 'antd';
import React, { useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { connect, AreaModelState, BillModelState, Dispatch, FeeTypeModelState } from 'umi';
import { Moment } from 'moment';
import { exportXlsx, saveXlsx } from '@/utils/exportXlsx';
import { ExportRender } from '@/global.d';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { BillListItem, BillListParams, BillFormValueType } from './data.d';
import { addBill, updateBill, removeBill, generateBill, queryBill, chargeBill } from './service';
import { FeeTypeListItem } from '../basic/feeTypes/data';
import { AreaListItem } from '../basic/areas/data';
import GenerateBill from './components/GenerateBill';
import ImportBill from './components/ImportBill';
import ChargeBill from './components/ChargeBill';

interface Props {
  list: BillListItem[] | undefined;
  params: BillListParams;
  pagination: {
    total: number;
    current: number;
    pageSize: number;
  };
  areas: AreaListItem[] | undefined;
  feeTypes: FeeTypeListItem[] | undefined;
  loading: boolean;
  dispatch: Dispatch;
}

const handleAdd = async (fields: BillFormValueType) => {
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

const handleUpdate = async (id: string, fields: BillFormValueType) => {
  const hide = message.loading('正在配置');
  try {
    await updateBill(id, fields);
    hide();

    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

const handleRemove = async (selectedRows: BillListItem[] | undefined) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeBill({
      ids: selectedRows.map(row => row.id),
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

export const chargeWays: string[] = ['现金']

const BillList: React.FC<Props> = (props: Props) => {
  const { list, dispatch, areas, feeTypes, loading, params, pagination } = props
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [generateModalVisible, handleGenerateModalVisible] = useState<boolean>(false);
  const [importModalVisible, handleImportModalVisible] = useState<boolean>(false);
  const [chargeModalVisible, handleChargeModalVisible] = useState<boolean>(false);
  // 手动控制selectedRows
  const [selectedRows, setSelectedRows] = useState<BillListItem[]>([])

  // 要修改的单条费用
  const [bill, setBill] = useState<BillListItem>();
  // 要缴费的多条费用
  const [chargeBills, setChargeBills] = useState<BillListItem[]>()

  const fetchData = (p: any) => {
    const values = p
    if (values['charged_at[]']) {
      values['charged_at[]'] = values['charged_at[]'].map((c: Moment) => c.format('YYYY-MM-DD'))
    }
    setSelectedRows([])
    dispatch({ type: 'bill/fetch', payload: values })
  }

  const reloadData = () => {
    setSelectedRows([])
    dispatch({ type: 'bill/fetch', payload: params })
  }

  useEffect(() => {
    if (!feeTypes || feeTypes.length === 0) {
      dispatch({ type: 'feeType/fetch' })
    }
    if (!areas || areas.length === 0) {
      dispatch({ type: 'area/fetch' })
    }
    if (list === undefined) {
      fetchData({})
    }
  }, [])

  const columns: (ExportRender & ProColumns<BillListItem>)[] = [
    {
      title: '缴/退费',
      dataIndex: 'is_refund',
      render: value => (value ? <span style={{ color: 'red' }}>退费</span> : null),
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
      dataIndex: 'area_id',
      order: 10,
      render: (value, { area }) => area.title,
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
      title: '姓名/公司',
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
            {feeTypes?.map((type: FeeTypeListItem) => (
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
      labelAlign: 'left',
      align: 'right',
      hideInSearch: true,
    },
    {
      title: '费用说明',
      dataIndex: 'description',
      hideInSearch: true,
    },
    {
      title: '缴费时间',
      dataIndex: 'charged_at[]',
      render: (value, { charged_at }) => (charged_at || <Badge color="red" text="未缴费" />),
      renderFormItem: (record, { value, onChange }) => {
        return <DatePicker.RangePicker picker="date" value={value} onChange={onChange} />
      }
    },
    {
      title: '缴费方式',
      dataIndex: 'charge_way',
      renderFormItem: (record, { value, onChange }) => (
        <Select placeholder="请选择" value={value} onChange={onChange}>
          {chargeWays.map(way => (
            <Select.Option key={way} value={way}>{way}</Select.Option>
          ))}
        </Select >
      )
    },
    {
      title: '是否上交',
      dataIndex: 'turn_in',
      hideInTable: true,
      render: (value, record) => (
        <>
          <span>
            {record.turn_in ? <Tag color="green">上交财务</Tag> : <Tag color="red">物业自留</Tag>}
          </span>
        </>
      ),
      exportRender: row => row.turn_in ? '上交财务' : '物业自留',
      renderFormItem: (record, { value, onChange }) => {
        return (
          <Select placeholder="请选择" value={value} onChange={onChange}>
            <Select.Option value="1">上交财务</Select.Option>
            <Select.Option value="0">物业自留</Select.Option>
          </Select >
        )
      },
    },
    {
      title: '滞纳金率|基数|日期',
      dataIndex: 'rate',
      hideInExport: true,
      hideInForm: true,
      hideInSearch: true,
      render: (value, record) => (
        <>
          <span>
            {
              record?.late_rate && record.late_rate > 0
                ? <Tag color="warning">
                  {parseFloat(record.late_rate as unknown as string)}%
                  {record.late_base ? ` | ${record?.late_base}` : null}
                  {record.late_date ? ` | ${record?.late_date}` : null}
                </Tag>
                : null
            }
          </span>
        </>
      )
    },
    {
      title: '缴费状态',
      dataIndex: 'status',
      hideInTable: true,
      exportRender: (record) => record.charged_at ? '已缴费' : '未缴费',
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
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      hideInExport: true,
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setBill(record);
            }}
          >
            修改
          </a>
        </>
      ),
    },
  ];

  const handlePageChange = (current: number | undefined, pageSize: number | undefined) => {
    dispatch({ type: 'bill/fetch', payload: { ...params, current, pageSize } })
  }

  /**
 * @param ids 需要缴费的bill主键
 * @param lates 根据需要缴费的bills生成的滞纳金，需要插入到数据库
 */
  const handleCharge = async (ids: string[], lates: any[] | undefined, chargeDate: string | undefined) => {
    const hide = message.loading('正在缴费');
    try {
      await chargeBill(ids, lates, chargeDate)
      handleChargeModalVisible(false)
      reloadData()
      hide();
      message.success('缴费成功，即将刷新');
      return true;
    } catch (error) {
      hide();
      message.error('删除失败，请重试');
      return false;
    }
  }

  const renderToolBar = () => {
    return [
      <Button icon={<PlusOutlined />} type="default" onClick={() => handleModalVisible(true)}>
        新建
      </Button>,
      <Button icon={<ProfileOutlined />} type="default" onClick={() => handleGenerateModalVisible(true)}>
        生成
      </Button>,
      <Button icon={<UploadOutlined />} type="default" onClick={() => handleImportModalVisible(true)}>
        导入
      </Button>,
      <Button
        type="primary"
        onClick={() => exportXlsx(params, columns, queryBill, '费用明细表')}>
        <DownloadOutlined />导出
      </Button>,
      <Button
        disabled={!selectedRows?.length}
        onClick={() => {
          const maps = {}
          selectedRows!.forEach(row => {
            maps[row.id] = row
          });
          setChargeBills(Object.values(maps))
          handleChargeModalVisible(true)
        }}
      >
        批量缴费
        </Button>,
      <Button
        disabled={!selectedRows?.length}
        onClick={() => Modal.confirm({
          title: '删除后将不能恢复, 确认删除吗?',
          icon: <ExclamationCircleOutlined />,
          onOk() {
            (async () => {
              await handleRemove(selectedRows);
              reloadData()
            })()
          },
        })}
      >
        批量删除
      </Button >,
    ]
  }

  const renderAlertText = () => {
    const sum = selectedRows?.reduce((pre, item) => pre + parseFloat(item.money as any), 0.0)
    return (
      <div>
        已选择 <a style={{ fontWeight: 600 }}>{selectedRows?.length}</a> 项 &nbsp;&nbsp;
        <span>
          费用共计 {sum?.toFixed(2)} 元
        </span>
      </div >
    )
  }

  return (
    <PageHeaderWrapper title={false}>
      <ProTable<BillListItem>
        headerTitle="费用明细"
        options={false}
        loading={loading}
        dataSource={list}
        rowKey="id"
        form={{ initialValues: params }}
        toolBarRender={renderToolBar}
        tableAlertRender={renderAlertText}
        pagination={{ ...pagination, onChange: handlePageChange, onShowSizeChange: handlePageChange }}
        beforeSearchSubmit={(p) => { fetchData(p); return p; }}
        columns={columns}
        rowSelection={{
          // 由于protable 的内部实现问题与我的预期不符,此处手动控制selectedRows
          onChange: (values, records) => {
            setSelectedRows(records)
          }
        }}
      />
      <CreateForm
        areas={areas}
        feeTypes={feeTypes}
        onSubmit={async value => {
          const success = await handleAdd(value);
          if (success) {
            handleModalVisible(false);
            reloadData()
          }
        }}
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      />
      {bill ? (
        <UpdateForm
          areas={areas}
          feeTypes={feeTypes}
          onSubmit={async (id, values) => {
            const success = await handleUpdate(id, values);
            if (success) {
              handleModalVisible(false);
              setBill(undefined);
              reloadData()
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setBill(undefined);
          }}
          updateModalVisible={updateModalVisible}
          bill={bill}
        />
      ) : null}
      <GenerateBill
        onOk={async (values) => {
          const res = await generateBill(values)
          message.success('费用生成成功')
          handleGenerateModalVisible(false);
          reloadData()
          if (res?.data && res.data.length > 0) {
            const data = res.data.map((item: any) => {
              const currentBill = item
              currentBill.area = areas?.find(area => area.id === currentBill.area_id)
              return currentBill
            })
            saveXlsx(data, columns, '生成的费用')
          }
        }}
        onCancel={() => handleGenerateModalVisible(false)}
        modalVisible={generateModalVisible}
      />
      <ImportBill
        onOk={() => { }}
        onCancel={() => handleImportModalVisible(false)}
        modalVisible={importModalVisible}
      />
      {
        chargeBills && chargeBills.length > 0
          ? <ChargeBill
            bills={chargeBills}
            feeTypes={feeTypes}
            onCancel={() => handleChargeModalVisible(false)}
            onOk={handleCharge}
            modalVisible={chargeModalVisible}
          />
          : null
      }
    </PageHeaderWrapper>
  );
};

export default connect(
  ({ bill, area, feeType, loading }:
    {
      bill: BillModelState,
      area: AreaModelState,
      feeType: FeeTypeModelState,
      loading: {
        models: { [key: string]: boolean }
      }
    }) => ({
      list: bill.list,
      params: bill.params,
      pagination: bill.pagination,
      areas: area.list,
      feeTypes: feeType.list,
      loading: loading.models.bill,
    })
)(BillList);
