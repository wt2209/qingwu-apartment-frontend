import React from 'react';
import { Card, Divider } from 'antd';
import { RecordListItem } from '@/pages/basic/records/data';

function Person(props: { record: RecordListItem; actions: Array<any> }) {
  const { record, actions } = props;
  const { person } = record;

  return (
    <>
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
            <p style={{ marginBottom: 0 }}>工号:&nbsp;{person.serial}</p>
            <p style={{ marginBottom: 0 }}>入住:&nbsp;{record.record_at}</p>
          </div>
        </div>
        {person.contract_start && record.rent_start
          ? <Divider style={{ margin: 2, backgroundColor: '#7ec4e6' }} />
          : null}
        <div>
          {person.contract_start && (
            <p style={{ marginBottom: 0 }}>
              劳动合同:&nbsp;
              {person.contract_start}~{person.contract_end}
            </p>
          )}
          {record.rent_start && (
            <p style={{ marginBottom: 0 }}>
              租赁期限:&nbsp;
              {record.rent_start}~{record.rent_end}
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
            {person.remark}
          </p>
        </div>
        <div style={{ position: 'absolute', bottom: 6 }}>
          {actions && actions.map(action => action)}
        </div >
      </Card >
    </>
  );
}

export default Person;
