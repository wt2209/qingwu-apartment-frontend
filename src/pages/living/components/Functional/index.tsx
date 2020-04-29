import { Card } from 'antd';
import React from 'react';
import { RecordListItem } from '@/pages/records/data';


interface Props {
  record: RecordListItem;
  actions: Array<any>
}

function Functional(props: Props) {
  const { record, actions } = props;
  return (
    <Card
      bodyStyle={{
        padding: 8,
        backgroundColor: '#5dade2',
        minHeight: 226,
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
      }}
      bordered={false}
    >
      <div style={{ flex: 1, fontSize: 26, fontWeight: 'bold', paddingBottom: 26 }}>
        {record.functional_title}
      </div>
      <div style={{ position: 'absolute', bottom: 6 }}>
        {actions && actions.map(action => action)}
      </div>
    </Card>
  );
}

export default Functional;
