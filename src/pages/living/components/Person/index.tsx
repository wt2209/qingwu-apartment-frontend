import React from 'react';
import { Card, Divider, Tag } from 'antd';

export interface PersonState { }
export interface PersonProps {
}
function Person(props) {
  const { record } = props;
  const { person } = record;
  return (
    <Card
      bodyStyle={{ padding: 8, backgroundColor: '#5dade2', minHeight: 226, position: 'relative' }}
      bordered={false}
    >
      <div style={{ display: 'flex', alignItems: 'center', paddingBottom: 4 }}>
        <div style={{ flex: 2, fontWeight: 'bold' }}>
          <span style={{ fontSize: 16 }}>{person.name}</span>
          <span style={{ fontSize: 14 }}>
            （{person.gender} {person.education ? `，${person.education}` : null}）
          </span>
        </div>
        <div style={{ flex: 1, fontSize: 14, fontWeight: 'bold', textAlign: 'right' }}>
          {record.category.title}
        </div>
      </div>
      <Divider style={{ margin: 2, backgroundColor: '#7ec4e6' }} />
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 4 }}>
          <p style={{ marginBottom: 0 }}>{person.department}</p>
          <p style={{ marginBottom: 0 }}>{person.phone}</p>
        </div>
        <div style={{ flex: 5 }}>
          <p style={{ marginBottom: 0 }}>工号：{person.serial}</p>
          <p style={{ marginBottom: 0 }}>入住：{person.enteredAt}</p>
        </div>
      </div>
      <Divider style={{ margin: 2, backgroundColor: '#7ec4e6' }} />
      <div>
        {person.contractStart && (
          <p style={{ marginBottom: 0 }}>
            劳动合同：
            {person.contractStart}~{person.contractEnd}
          </p>
        )}
        {record.rentStart && (
          <p style={{ marginBottom: 0 }}>
            租赁期限：
            {record.rentStart}~{record.rentEnd}
          </p>
        )}
      </div>
      <Divider style={{ margin: 2, backgroundColor: '#7ec4e6' }} />
      <div>
        <p style={{ marginBottom: 0 }}>
          身份证：
          {person.identify}
        </p>
        <p style={{ marginBottom: 0 }}>
          备注：
          {person.remark}
        </p>
      </div>
      <div style={{ position: 'absolute', bottom: 6 }}>
        {/* #00a65a 绿 */}
        <Tag color="#f39c12" style={{ cursor: 'pointer' }}>
          调房
        </Tag>
        <Tag color="#f39c12" style={{ cursor: 'pointer' }}>
          修改
        </Tag>
        {record.rentStart && (
          <Tag color="#f39c12" style={{ cursor: 'pointer' }}>
            续签
          </Tag>
        )}
        <Tag color="#dd4b39" style={{ cursor: 'pointer' }}>
          退房
        </Tag>
      </div>
    </Card>
  );
}

export default Person;
