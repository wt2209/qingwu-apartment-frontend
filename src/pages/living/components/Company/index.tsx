import React from 'react';
import { Card, Divider, Tag } from 'antd';

export interface CompanyState { }

const Company = (props) => {
  const { record } = props;
  const { company } = record;
  return (
    <Card
      bodyStyle={{ padding: 8, backgroundColor: '#5dade2', minHeight: 226, position: 'relative' }}
      bordered={false}
    >
      <div style={{ display: 'flex', alignItems: 'center', paddingBottom: 4 }}>
        <div style={{ flex: 2, fontSize: 16, fontWeight: 'bold' }}>{company.companyName}</div>
        <div style={{ flex: 1, fontSize: 14, fontWeight: 'bold', textAlign: 'right' }}>
          {record.category.title}
        </div>
      </div>
      <Divider style={{ margin: 2, backgroundColor: '#7ec4e6' }} />
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <p style={{ marginBottom: 0 }}>本房间入住日：{record.recordAt}</p>
          <p style={{ marginBottom: 0 }}>
            {record.rentStart ? (
              `本房间租赁期：${record.rentStart} — ${record.rentEnd}`
            ) : (
                <span>&nbsp;</span>
              )}
          </p>
        </div>
      </div>
      <Divider style={{ margin: 2, backgroundColor: '#7ec4e6' }} />
      <div>
        <p style={{ marginBottom: 0 }}>
          {company.manager ? (
            `负责人：${company.manager} ${company.managerPhone}`
          ) : (
              <span>&nbsp;</span>
            )}
        </p>
        <p style={{ marginBottom: 0 }}>
          联系人：
            {company.linkman} {company.linkmanPhone}
        </p>
      </div>
      <Divider style={{ margin: 2, backgroundColor: '#7ec4e6' }} />
      <div>
        <p style={{ marginBottom: 0 }}>
          备注：
            {company.remark}
        </p>
      </div>
      <div style={{ position: 'absolute', bottom: 6 }}>
        <Tag color="#00a65a" style={{ cursor: 'pointer' }}>
          公司详情
          </Tag>
        <Tag color="#f39c12" style={{ cursor: 'pointer' }}>
          公司改名
          </Tag>
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

export default Company;
