import React, { useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Row, Col, Button, Icon, Spin, Divider, Input } from 'antd';
import { Link } from 'umi';
import CheckableTag from 'antd/lib/tag/CheckableTag';
import { PlusOutlined, SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import Person from './components/Person';
import Company from './components/Company';
import Functional from './components/Functional';
import { LivingListItem } from './data';

const buildingTree = [
  { building: '1#', units: ['1单元', '2单元'] },
  { building: '2#', units: ['1单元', '2单元', '3单元', '4单元'] },
  { building: '3#', units: ['1单元', '2单元', '3单元'] },
  { building: '4#', units: ['1单元', '2单元', '3单元'] },
  { building: '5#', units: ['1单元', '2单元', '3单元', '4单元'] },
  { building: '6#', units: ['1单元', '2单元', '3单元', '4单元'] },
  { building: '7#', units: ['1单元', '2单元', '3单元', '4单元', '5单元'] },
  { building: '8#', units: ['1单元', '2单元', '3单元', '4单元'] },
  { building: '9#', units: ['1单元', '2单元', '3单元', '4单元'] },
  { building: '10#', units: ['1单元', '2单元', '3单元', '4单元'] },
  { building: '11#', units: ['1单元', '2单元', '3单元', '4单元'] },
  { building: '12#', units: ['1单元', '2单元', '3单元', '4单元'] },
  { building: '13#', units: ['1单元', '2单元', '3单元', '4单元'] },
  { building: '14#', units: ['1单元', '2单元', '3单元'] },
  { building: '红1#', units: ['1单元', '2单元'] },
  { building: '红2#', units: ['1单元', '2单元', '3单元'] },
  { building: '红3#', units: ['1单元', '2单元', '3单元', '4单元'] },
  { building: '高1#', units: ['3-8层', '9-14层', '15-17层'] },
  { building: '高2#', units: ['1-5层', '6-10层', '11-16层', '17-20层'] },
  { building: '高3#', units: ['1-5层', '6-10层', '11-16层', '17-20层'] },
  { building: '高4#', units: ['1-5层', '6-10层', '11-16层', '17-20层'] },
]


const initialList = [
  {
    id: 1,
    roomName: '1-1-102',
    building: '1#',
    unit: '1单元',
    number: 0,
    remark: '房间的说明',
    records: [
      {
        id: 1,
        type: 'company',
        category: {
          type: 'company',
          title: '包商公司',
        },
        room: {
          roomName: '1-1-101',
        },
        company: {
          companyName: '青岛商剑鸣大传播工程有限公司',
          manager: '张三',
          managerPhone: '13333333333',
          linkman: '李四',
          linkmanPhone: '13345673456',
          remark: '这是一个公司的备注',
        },
        person: {},
        recordAt: '2019-11-11',
        rentStart: '2019-12-1',
        rentEnd: '2020-12-3',
        status: 'using',
      },
    ],
  },
  {
    id: 2,
    roomName: '3-3-101',
    building: '3#',
    unit: '3单元',
    number: 4,
    remark: '房间的说明',
    records: [
      {
        id: 3,
        type: 'person',
        category: {
          type: 'person',
          title: '新职工',
        },
        room: {
          roomName: '3-3-101',
        },
        company: {},
        person: {
          id: 11,
          name: '张三',
          gender: '男',
          enteredAt: '2011-8-7',
          education: '本科',
          serial: '11050487',
          identify: '1305221998080190887',
          phone: '13333333333',
          department: '资产财务部',
          contractStart: '1990-12-1',
          contractEnd: '无固定期',
          remark: '备注',
        },
        recordAt: '2019-11-11',
        rentStart: '',
        rentEnd: '',
        status: 'using',
      },
      {
        id: 4,
        type: 'person',
        category: {
          type: 'person',
          title: '单身职工',
        },
        room: {
          roomName: '3-3-101',
        },
        company: {},
        person: {
          id: 12,
          name: '张三2',
          gender: '男',
          enteredAt: '2011-8-7',
          education: '本科',
          serial: '11050487',
          identify: '1305221998080190887',
          phone: '13333333333',
          department: '资产财务部',
          contractStart: '1990-12-1',
          contractEnd: '无固定期',
          remark: '备注',
        },
        recordAt: '2019-11-11',
        rentStart: '2019-11-11',
        rentEnd: '2019-11-11',
        status: 'using',
      },
    ],
  },
  {
    id: 3,
    roomName: '2-2-101',
    building: '2#',
    unit: '2单元',
    number: 1,
    remark: '房间的说明',
    records: [
      {
        id: 2,
        type: 'company',
        category: {
          type: 'company',
          title: '包商公司',
        },
        room: {
          roomName: '2-2-101',
        },
        company: {
          companyName: '青岛滴滴滴滴滴地点工程有限公司',
          manager: '张三',
          managerPhone: '13333333333',
          linkman: '李四',
          linkmanPhone: '13345673456',
          remark: '这是一个公司的备注',
        },
        person: {},
        recordAt: '2019-11-11',
        rentStart: '',
        rentEnd: '',
        status: 'using',
      },
    ],
  },
  {
    id: 4,
    roomName: '3-3-101',
    building: '3#',
    unit: '3单元',
    number: 1,
    remark: '房间的说明',
    records: [
      {
        id: 14,
        type: 'person',
        category: {
          type: 'person',
          title: '新职工',
        },
        room: {
          roomName: '3-3-101',
        },
        company: {},
        person: {
          id: 12,
          name: '张三2',
          gender: '男',
          enteredAt: '2011-8-7',
          education: '本科',
          serial: '11050487',
          identify: '1305221998080190887',
          phone: '13333333333',
          department: '资产财务部',
          contractStart: '1990-12-1',
          contractEnd: '无固定期',
          remark: '备注',
        },
        recordAt: '2019-11-11',
        rentStart: '2019-11-11',
        rentEnd: '2019-11-11',
        status: 'using',
      },
    ],
  },
  {
    id: 5,
    roomName: '4-3-101',
    building: '4#',
    unit: '3单元',
    number: 1,
    remark: '房间的说明',
    records: [
      {
        id: 14,
        type: 'functional',
        category: {
          type: 'functional',
          title: '仓库',
        },
        room: {
          roomName: '3-3-101',
        },
        company: {},
        person: {},
        recordAt: '2019-11-11',
        rentStart: '',
        rentEnd: '',
        status: 'using',
      },
    ],
  },
]

const Living = () => {
  const [list] = useState(initialList)

  const renderCompany = (record, width: string) => (
    <Card.Grid
      key={`company${record.id}`}
      style={{
        padding: 0,
        margin: '0.5%',
        width,
      }}
    >
      <Company record={record} />
    </Card.Grid>
  );

  const renderPeople = (record, width: string) => (
    <Card.Grid
      key={`person${record.id}`}
      style={{
        padding: 0,
        margin: '0.5%',
        width,
      }}
    >
      <Person record={record} />
    </Card.Grid>
  );

  const renderFunctional = (record, width: string) => (
    <Card.Grid
      key={`functional${record.id}`}
      style={{
        padding: 0,
        margin: '0.5%',
        width,
      }}
    >
      <Functional record={record} />
    </Card.Grid>
  );

  const renderContent = (living: LivingListItem) => {
    const number = Math.max(living.number, living.records.length);
    const width = number === 1 ? '99%' : '49%';
    const result = [];
    for (let i = 0; i < number; i += 1) {
      const record = living.records[i];
      if (record) {
        switch (record.type) {
          case 'person':
            result.push(renderPeople(record, width));
            break;
          case 'company':
            result.push(renderCompany(record, width));
            break;
          case 'functional':
            result.push(renderFunctional(record, width));
            break;
          default:
            result.push(null);
        }
      } else {
        result.push(
          <Card.Grid key={`empty${living.id}${i}`} style={{ padding: 0, margin: '0.5%', width }}>
            <Button
              type="dashed"
              style={{ border: '0', backgroundColor: '#5dade2', width: '100%', height: 225 }}
            >
              <Link to={`/living/livings/create/${living.id}`}>
                <PlusOutlined style={{ fontSize: 30, color: 'rgba(0,0,0,0.65)' }} />
                <Icon type="plus" style={{ fontSize: 30, color: 'rgba(0,0,0,0.65)' }} />
              </Link>
            </Button>
          </Card.Grid>,
        );
      }
    }
    return result;
  };


  const renderLivingTitle = (living: { roomName: string; remark: string }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ fontSize: 18, fontWeight: 'bold', flex: 2 }}>{living.roomName}</div>
      <div style={{ fontSize: 14, flex: 4 }}>{living.remark}</div>
    </div>
  );

  return (
    <PageHeaderWrapper title={false}>
      <Card style={{ marginBottom: 20 }}>
        <div>
          <span style={{ marginRight: 8, display: 'inline' }}>区域：</span>
          <CheckableTag
            style={{ fontSize: 14 }}
            checked
            onChange={checked => checked}
          >
            职工公寓
          </CheckableTag>
          <CheckableTag
            style={{ fontSize: 14 }}
            checked={false}
            onChange={checked => checked}
          >
            协力公寓
          </CheckableTag>
          <CheckableTag
            style={{ fontSize: 14 }}
            checked={false}
            onChange={checked => checked}
          >
            青武公寓
          </CheckableTag>
        </div>
        <Divider dashed style={{ margin: '6px 0' }} />
        <div>
          <span style={{ marginRight: 8, display: 'inline' }}>楼号：</span>
          <CheckableTag
            style={{ fontSize: 14 }}
            checked={false}
            onChange={checked => checked}
          >
            1#
          </CheckableTag>
          <CheckableTag
            style={{ fontSize: 14 }}
            checked
            onChange={checked => checked}
          >
            2#
          </CheckableTag>
          <CheckableTag
            style={{ fontSize: 14 }}
            checked={false}
            onChange={checked => checked}
          >
            3#
          </CheckableTag>
          <CheckableTag
            style={{ fontSize: 14 }}
            checked={false}
          >
            4#
          </CheckableTag>
        </div>
        <Divider dashed style={{ margin: '6px 0' }} />
        <div>
          <span style={{ marginRight: 8, display: 'inline' }}>单元：</span>
          <span style={{ marginLeft: 100 }}>
            <CheckableTag
              style={{ fontSize: 14 }}
              checked={false}
            >
              1单元
            </CheckableTag>
            <CheckableTag
              style={{ fontSize: 14 }}
              checked={false}
            >
              2单元
            </CheckableTag>
            <CheckableTag
              style={{ fontSize: 14 }}
              checked
            >
              3单元
            </CheckableTag>
            <CheckableTag
              style={{ fontSize: 14 }}
              checked={false}
            >
              4单元
            </CheckableTag>
          </span>
        </div>
        <Divider dashed style={{ margin: '6px 0' }} />
        <div style={{ display: ' flex', alignItems: 'center' }}>
          <span style={{ marginRight: 8, display: 'inline' }}>搜索：</span>
          <Input.Search
            style={{ width: 400 }}
            placeholder="姓名，房间号，或电话"
            enterButton
          />
        </div>
      </Card>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <Row gutter={24}>
            {list.map(living => (
              <Col md={12} sm={24} key={living.id}>
                <Card
                  style={{ marginBottom: 24 }}
                  headStyle={{ padding: '0 12px' }}
                  bodyStyle={{ padding: '0.5%' }}
                  title={renderLivingTitle(living)}
                  actions={[
                    <SettingOutlined />,
                    <EditOutlined />,
                    <EllipsisOutlined />,
                  ]}
                >
                  {renderContent(living)}
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </PageHeaderWrapper >
  )
}

export default Living;
