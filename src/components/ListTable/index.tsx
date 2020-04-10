import React, { useState, useEffect } from 'react';
import Table from 'antd/lib/table';
import { SearchItems, ResponseListData } from '@/global.d';
import TableSearchBar from '../TableSearchBar';
import { Card, Alert } from 'antd';
import { RoomListParams } from '@/pages/room/data';

interface ListTableProps<T> {
  rowKey?: string;
  columns: any;
  search: SearchItems;
  request: (params: { page: number, pageSize: number }) => Promise<ResponseListData>;
  initialParams: any;
  actionRef: any;
  tableAlertRender?: ((selectedRowKeys: (string | number)[], selectedRows: T[]) => React.ReactNode) | false;
  toolBarRender?: (action: { reload: () => void; }, selectedRowKeys?: (string | number)[], selectedRows?: T[]) => React.ReactNode[];
}


const ListTable: <T>(props: ListTableProps<T>) => JSX.Element = props => {

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [params, setParams] = useState(props.initialParams);
  const [rows, setRows] = useState({
    selectedRowKeys: [],
    selectedRows: []
  })

  const initialAlertMessage = props.tableAlertRender
    ? props.tableAlertRender([], [])
    : (<div>已选择 <a style={{ fontWeight: 600 }}>0</a> 项</div>)
  const [alertMessage, setAlertMessage] = useState(initialAlertMessage);

  const fetchData = async () => {
    const query = props.request;
    setLoading(true)
    const { data, meta } = await query(params)
    setList(data)
    setLoading(false)
    if (meta && meta.total) {
      setTotal(meta.total)
    }
  }

  const rowKey = props.rowKey || 'id';
  const { actionRef } = props;

  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      setRows({ selectedRowKeys, selectedRows })
      if (props.tableAlertRender) {
        setAlertMessage(props.tableAlertRender(selectedRowKeys, selectedRows))
      }
    }
  }

  const handlePageChange = (page: number, pageSize: number | undefined = 20) => {
    setParams({
      ...params,
      page,
      pageSize
    })
  }

  const pagination = {
    total,
    current: params.page,
    pageSize: params.pageSize,
    onChange: handlePageChange,
    onShowSizeChange: handlePageChange,
  }

  const handleSearch = (values: RoomListParams) => {
    setParams({
      ...params,
      ...values,
      page: 1, // 点击查询后永远显示第一页
    })
  }

  const handleReset = () => {
    setParams(props.initialParams)
  }

  useEffect(() => {
    fetchData()
  }, [params])

  const handleExport = () => { }

  return (
    <>
      <TableSearchBar items={props.search} onSearch={handleSearch} onExport={handleExport} onReset={handleReset} />
      <Card bodyStyle={{ padding: 0 }} >
        <div className="ant-pro-table-toolbar">
          <div className="ant-pro-table-toolbar-title">
            房间明细
          </div>
          <div className="ant-pro-table-toolbar-option" >
            <div className="ant-pro-table-toolbar-item">
              {props.toolBarRender && props.toolBarRender(actionRef.current, rows.selectedRowKeys, rows.selectedRows).map((item, index) => {
                // eslint-disable-next-line react/no-array-index-key
                return <span key={`tool-bar-action-${index}`} style={{ marginLeft: 8 }}>{item}</span>
              })
              }
            </div>
          </div>
        </div>
        <div className="ant-pro-table-alert">
          <Alert message={alertMessage} type="info" showIcon />
        </div>
        <Table
          rowKey={rowKey}
          loading={loading}
          rowSelection={rowSelection}
          columns={props.columns}
          dataSource={list}
          size="middle"
          pagination={pagination}
        />
      </Card>
    </>
  )

}

export default ListTable;
