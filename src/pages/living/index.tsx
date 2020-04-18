import React, { useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Row, Col, Button, Spin, Divider } from 'antd';
import { PlusOutlined, SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import Person from './components/Person';
import Company from './components/Company';
import Functional from './components/Functional';
import { LivingListItem, LivingFetchParams } from './data';
import CreateForm from './components/CreateForm';
import SelectBuilding from './components/SelectBuilding';
import SearchBar from './components/SearchBar';
import { initialList } from './mock_data'

const Living = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [createFormRoomId, setCreateFormRoomId] = useState(0)
  const [params, setParams] = useState({})
  const [list, setList] = useState(initialList)

  const fetchData = async (currentParams: LivingFetchParams) => {
    console.log(currentParams)
    setLoading(true)
    setParams(currentParams)
    const data = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(initialList)
      }, 1000);
    })
    setList(data)
    setLoading(false)
    return data;
  }

  const renderContent = (living: LivingListItem) => {
    const number = Math.max(living.number, living.records.length);
    const xlCols = number === 1 ? 24 : 12;
    const result = [];
    for (let i = 0; i < number; i += 1) {
      const record = living.records[i];
      if (record) {
        let element
        switch (record.type) {
          case 'person':
            element = <Person record={record} />
            break;
          case 'company':
            element = <Company record={record} />
            break;
          case 'functional':
            element = <Functional record={record} />
            break;
          default:
            element = null;
        }
        result.push(
          <Col key={record.id} style={{ padding: '2px' }} xs={24} lg={24} xl={xlCols} >
            <Card.Grid style={{ width: '100%', padding: 0 }}>
              {element}
            </Card.Grid>
          </Col>
        )
      } else {
        result.push(
          <Col key={`empty${living.id}${i}`} style={{ padding: '2px' }} xs={24} lg={24} xl={xlCols} >
            <Card.Grid style={{ width: '100%', padding: 0 }}>
              <Button
                type="dashed"
                style={{ border: '0', backgroundColor: '#5dade2', width: '100%', height: 225 }}
                onClick={() => {
                  handleModalVisible(true)
                  setCreateFormRoomId(living.id)
                }}
              >
                <PlusOutlined style={{ fontSize: 30, color: 'rgba(0,0,0,0.65)' }} />
              </Button>
            </Card.Grid>
          </Col>
        );
      }
    }
    return result;
  };

  const renderLivingTitle = (living: { roomName: string; remark: string }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ fontSize: 18, fontWeight: 'bold', flex: 2 }}>
        职工公寓 {living.roomName}
      </div>
      <div style={{ fontSize: 14, flex: 3 }}>{living.remark}</div>
    </div>
  );

  return (
    <PageHeaderWrapper title={false}>
      <Card style={{ marginBottom: 20 }}>
        <Spin spinning={loading}>
          <SelectBuilding fetchData={fetchData} params={params} />
          <Divider dashed style={{ margin: '6px 0' }} />
          <SearchBar params={params} fetchData={fetchData} />
        </Spin>
      </Card>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <Row gutter={24}>
            {list?.map(living => (
              <Col md={12} sm={24} key={living.id} style={{ width: '100%' }}>
                <Card
                  style={{ marginBottom: 24 }}
                  headStyle={{ padding: '0 12px' }}
                  bodyStyle={{ padding: '2px' }}
                  title={renderLivingTitle(living)}
                  actions={[
                    <SettingOutlined />,
                    <EditOutlined />,
                    <EllipsisOutlined />,
                  ]}
                >
                  <Row>
                    {renderContent(living)}
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
      {createFormRoomId
        ? <CreateForm
          roomId={createFormRoomId}
          modalVisible={createModalVisible}
          onCancel={() => handleModalVisible(false)} />
        : null
      }
    </PageHeaderWrapper >
  )
}

export default Living;
