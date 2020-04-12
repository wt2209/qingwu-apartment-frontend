import { Card, Tag } from 'antd';
import React from 'react';


function Functional(props) {
  const { record } = props;
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
        {record.category.title}
      </div>
      <div style={{ position: 'absolute', bottom: 6 }}>
        <Tag color="#dd4b39" style={{ cursor: 'pointer' }}>
          退房
        </Tag>
      </div>
    </Card>
  );
}

export default Functional;
