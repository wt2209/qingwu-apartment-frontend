import React, { useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Row, Col, Button, Spin, Divider, BackTop } from 'antd';
import { PlusOutlined, SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { connect, Dispatch } from 'dva';
import Person from './components/Person';
import Company from './components/Company';
import Functional from './components/Functional';
import { LivingListItem, LivingFetchParams } from './data';
import CreateForm from './components/CreateForm';
import SelectBuilding from './components/SelectBuilding';
import SearchBar from './components/SearchBar';
import { ModelState } from './model';
import { AreaListItem } from '../area/data';
import { CategoryListItem } from '../categories/data';

interface Props {
  areas: AreaListItem[] | undefined;
  categories: CategoryListItem[] | undefined;
  list: LivingListItem[];
  params: LivingFetchParams;
  total: number;
  loading: boolean;
  dispatch: Dispatch;
  tree: any;
}

const Living = (props: Props) => {
  const { areas, categories, tree, list, params, total, loading, dispatch } = props
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [createFormRoomId, setCreateFormRoomId] = useState(0)

  const fetchData = (payload: LivingFetchParams) => {
    dispatch({ type: 'living/fetch', payload })
  }

  const loadMore = () => {
    dispatch({ type: 'living/appendFetch' })
  }

  useEffect(() => {
    if (!tree) {
      dispatch({ type: 'living/fetchTree' })
    }
    if (!areas) {
      dispatch({ type: 'living/fetchAreas' })
    }
    if (!categories) {
      dispatch({ type: 'living/fetchCategories' })
    }
  }, [])

  const renderContent = (room: LivingListItem) => {
    const number = Math.max(room.number, room.records.length);
    const xlCols = number === 1 ? 24 : 12;
    const result = [];
    for (let i = 0; i < number; i += 1) {
      const record = room.records[i];
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
          <Col key={`empty${room.id}${i}`} style={{ padding: '2px' }} xs={24} lg={24} xl={xlCols} >
            <Card.Grid style={{ width: '100%', padding: 0 }}>
              <Button
                type="dashed"
                style={{ border: '0', backgroundColor: '#5dade2', width: '100%', height: 225 }}
                onClick={() => {
                  handleModalVisible(true)
                  setCreateFormRoomId(room.id)
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

  const renderLivingTitle = (room: LivingListItem) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ fontSize: 18, fontWeight: 'bold', flex: 2 }}>
        <span style={{ display: 'block', fontSize: 18, fontWeight: 'bold' }} >
          {room.title}
        </span>
        <span style={{ display: 'block', fontSize: 14, fontWeight: 'normal' }} >
          {room.area.title}&nbsp;&nbsp;&nbsp;( {room.category.title} )
        </span>
      </div>
      <div style={{ fontSize: 14, flex: 3 }}>{room.remark}</div>
    </div>
  );

  return (
    <PageHeaderWrapper title={false}>
      <Card style={{ marginBottom: 20 }}>
        <Spin spinning={loading === undefined ? false : loading}>
          <SelectBuilding
            roomTree={tree}
            onSubmit={(value: LivingFetchParams) => { fetchData(value) }}
            params={params} />
          <Divider dashed style={{ margin: '6px 0' }} />
          <SearchBar
            areas={areas}
            params={params}
            onSubmit={(value: LivingFetchParams) => { fetchData(value) }} />
        </Spin>
      </Card>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <Row gutter={24}>
            {list?.map(room => (
              <Col md={12} sm={24} key={room.id} style={{ width: '100%' }}>
                <Card
                  style={{ marginBottom: 24 }}
                  headStyle={{ padding: '0 12px' }}
                  bodyStyle={{ padding: '2px' }}
                  title={renderLivingTitle(room)}
                  actions={[
                    <SettingOutlined />,
                    <EditOutlined />,
                    <EllipsisOutlined />,
                  ]}
                >
                  <Row>
                    {renderContent(room)}
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
          {list && list?.length < total
            ? <Row>
              <div style={{ width: '100%', textAlign: 'center', marginTop: 16 }} >
                <Button
                  onClick={loadMore}
                  type="default"
                  style={{ paddingLeft: 48, paddingRight: 48 }}
                  loading={loading === undefined ? false : loading}>
                  {loading ? '加载中...' : `还有 ${total - list.length} 项，点击继续加载`}
                </Button>
              </div>
            </Row>
            : null
          }
        </div>
      </div>
      <BackTop />
      {createFormRoomId
        ? <CreateForm
          categories={categories}
          roomId={createFormRoomId}
          modalVisible={createModalVisible}
          onCancel={() => handleModalVisible(false)} />
        : null
      }
    </PageHeaderWrapper >
  )
}

export default connect(
  ({ living, loading }:
    {
      living: ModelState,
      loading: {
        models: { [key: string]: boolean }
      }
    }) => ({
      areas: living.areas,
      categories: living.categories,
      tree: living.tree,
      list: living.list,
      params: living.params,
      total: living.total,
      loading: loading.models.living
    })
)(Living);
