import React from 'react';
import { List, Card, Modal } from 'antd';
import { BillListItem } from '../data';

interface Props {
  bills: BillListItem[];
  modalVisible: boolean;
  onOk: (records: any) => void;
  onCancel: () => void;
}

const ChargeBill = (props: Props) => {
  const { bills, modalVisible, onOk, onCancel } = props
  return (
    <Modal
      destroyOnClose
      title="缴费"
      visible={modalVisible}
      onOk={onOk}
      okText="确定"
      cancelText="取消"
      bodyStyle={{ paddingTop: 0, paddingBottom: 0 }}
      onCancel={() => onCancel()}
    >
      <Card bordered={false}>
        <List
          className="demo-loadmore-list"
          itemLayout="horizontal"
          dataSource={bills}
          renderItem={bill => (
            <List.Item>
              <List.Item.Meta
                title={bill.title}
                description={`${bill.area.title} ${bill.location} ${bill.name}`}
              />
              <div>{bill.money}</div>
            </List.Item>
          )}
        />
      </Card>
    </Modal>
  )
}

export default ChargeBill
