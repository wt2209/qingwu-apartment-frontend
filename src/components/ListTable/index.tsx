import React, { useState, useEffect } from 'react';
import Table from 'antd/lib/table';
import { SearchItems, ResponseListData } from '@/global.d';
import TableSearchBar from '../TableSearchBar';
import { Card, Button, Alert } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { RoomListParams } from '@/pages/room/data';

interface ListTableProps<T> {
  rowKey?: string;
  columns: any;
  search: SearchItems;
  request: (params: { page: number, pageSize: number }) => Promise<ResponseListData>;
  initialParams: any;
  tableAlertRender?: ((selectedRowKeys: (string | number)[], selectedRows: T[]) => React.ReactNode) | false;
}


const ListTable: <T>(props: ListTableProps<T>) => JSX.Element = props => {

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [params, setParams] = useState(props.initialParams);

  const fetchData = async () => {
    const query = props.request;
    setLoading(true)
    const { data, meta } = await query(params)
    setList(data)
    setLoading(false)
    setTotal(meta.total)
  }

  const rowKey = props.rowKey || 'id';

  const rowSelection = {
    onChange: props.tableAlertRender ? props.tableAlertRender : (selectedRowKeys, selectedRows) => (
      <div>
        已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
      </div>
    )
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

  useEffect(() => {
    fetchData()
  }, [params])

  const handleExport = () => { }

  return (
    <>
      <TableSearchBar items={props.search} onSearch={handleSearch} onExport={handleExport} />
      <Card bodyStyle={{ padding: 0 }} >
        <div className="ant-pro-table-toolbar">
          <div className="ant-pro-table-toolbar-title">
            房间明细
          </div>
          <div className="ant-pro-table-toolbar-option" >
            <div className="ant-pro-table-toolbar-item">
              <Button type="primary" icon={<PlusOutlined />}>
                新建
              </Button>
            </div>
          </div>
        </div>
        <div className="ant-pro-table-alert">
          <Alert message={
            <div>
              已选择 <a style={{ fontWeight: 600 }}>0</a> 项&nbsp;&nbsp;
            <span>
                服务调用次数总计 1 万
            </span>
            </div>
          } type="info" showIcon />
        </div>
        <Table
          rowKey={rowKey}
          loading={loading}
          rowSelection={{
            onChange: (selectedRowKeys, selectedRows) => {
              console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
          }}
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
