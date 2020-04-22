import React from 'react';
import { Card, Divider, Tag } from 'antd';
import { RecordListItem } from '@/pages/records/data';

interface Props {
  record: RecordListItem;
}

const Company = (props: Props) => {
  const { record } = props;
  const { company } = record;
  return (
    <Card
      bodyStyle={{ padding: 8, backgroundColor: '#5dade2', minHeight: 226, position: 'relative' }}
      bordered={false}
    >
      <div style={{ display: 'flex', alignItems: 'center', paddingBottom: 4 }}>
        <div style={{ flex: 2, fontSize: 16, fontWeight: 'bold' }}>{company?.company_name}</div>
        <div style={{ flex: 1, fontSize: 14, fontWeight: 'bold', textAlign: 'right' }}>
          {record.category.title}
        </div>
      </div>
      <Divider style={{ margin: 2, backgroundColor: '#7ec4e6' }} />
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <p style={{ marginBottom: 0 }}>本房间入住日：{record.record_at}</p>
          <p style={{ marginBottom: 0 }}>
            {record.rent_start ? (
              `本房间租赁期：${record.rent_start} — ${record.rent_end}`
            ) : (
                <span>&nbsp;</span>
              )}
          </p>
        </div>
      </div>
      <Divider style={{ margin: 2, backgroundColor: '#7ec4e6' }} />
      <div>
        <p style={{ marginBottom: 0 }}>
          {company?.manager ? (
            `负责人：${company.manager} ${company.manager_phone}`
          ) : (
              <span>&nbsp;</span>
            )}
        </p>
        <p style={{ marginBottom: 0 }}>
          {company?.linkman ? `联系人：${company.linkman} ${company.linkman_phone}` : (
            <span>&nbsp;</span>
          )}
        </p>
      </div>
      {company?.remark ?
        <>
          <Divider style={{ margin: 2, backgroundColor: '#7ec4e6' }} />
          <div>
            <p style={{ marginBottom: 0 }}>
              备注：{company.remark}:
            </p>
          </div>
        </> : null}
      <div style={{ position: 'absolute', bottom: 6 }}>
        <Tag color="#00a65a" style={{ cursor: 'pointer' }}>
          详情
          </Tag>
        <Tag color="#f39c12" style={{ cursor: 'pointer' }}>
          改名
          </Tag>
        <Tag color="#f39c12" style={{ cursor: 'pointer' }}>
          调房
          </Tag>
        <Tag color="#f39c12" style={{ cursor: 'pointer' }}>
          修改
          </Tag>
        {record.rent_start && (
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

export default Company;
