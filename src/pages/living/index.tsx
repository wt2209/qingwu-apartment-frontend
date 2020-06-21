import React, { useEffect, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Row, Col, Button, Spin, Divider, BackTop, Tag } from 'antd';
import { PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { connect, Dispatch, Link, CategoryModelState } from 'umi';
import Person from './components/Person';
import Company from './components/Company';
import Functional from './components/Functional';
import { LivingListItem, LivingFetchParams } from './data';
import SelectBuilding from './components/SelectBuilding';
import SearchBar from './components/SearchBar';
import { ModelState } from './model';
import { AreaListItem } from '../basic/areas/data';
import { CategoryListItem } from '../basic/categories/data';
import { RecordListItem } from '../basic/records/data';
import QuitModal from './components/QuitModal';
import MoveModal from './components/MoveModal';
import RenewModal from './components/RenewModal';
import RenameModal from './components/RenameModal';
import RoomEditModal from './components/RoomEditModal';
import { AreaModelState } from '../../models/area';

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
  const [quitModalVisible, setQuitModalVisible] = useState<boolean>(false)
  const [moveModalVisible, setMoveModalVisible] = useState<boolean>(false)
  const [renewModalVisible, setRenewModalVisible] = useState<boolean>(false)
  const [renameModalVisible, setRenameModalVisible] = useState<boolean>(false)
  const [roomEditModalVisible, setRoomEditModalVisible] = useState<boolean>(false)
  const [record, setRecord] = useState<RecordListItem>()
  const [roomId, setRoomId] = useState<number>(0)

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
      dispatch({ type: 'area/fetch' })
    }
    if (!categories) {
      dispatch({ type: 'category/fetch' })
    }
  }, [])

  const handleOption = (type: string, value: RecordListItem) => {
    setRecord(value)
    switch (type) {
      case 'move':
        setMoveModalVisible(true)
        break
      case 'quit':
        setQuitModalVisible(true)
        break
      case 'renew':
        setRenewModalVisible(true)
        break
      case 'rename':
        setRenameModalVisible(true)
        break
      default:
        break
    }
  }

  const actions = (value: RecordListItem) => {
    return [
      <Tag key="quit"
        color="#dd4b39"
        onClick={() => handleOption('quit', value)}
        style={{ cursor: 'pointer', marginRight: 6 }}>
        退房
      </Tag >,
      <Tag key="move"
        color="#f39c12"
        onClick={() => handleOption('move', value)}
        style={{ cursor: 'pointer', marginRight: 6 }}>
        调房
        </Tag>,
      value.type === 'company'
        ? <Tag key="rename"
          onClick={() => handleOption('rename', value)}
          color="#f39c12"
          style={{ cursor: 'pointer', marginRight: 6 }}>
          改名
        </Tag>
        : null,
      value.rent_start
        ? <Tag key="renew"
          onClick={() => handleOption('renew', value)}
          color="#f39c12"
          style={{ cursor: 'pointer', marginRight: 6 }}>
          续签
        </Tag>
        : null,
      <Link key="edit" to={`/livings/update/${value.id}`}>
        <Tag color="#f39c12" style={{ cursor: 'pointer', marginRight: 6 }}>
          修改
        </Tag>
      </Link>,
      value.type === 'functional'
        ? null
        : <Link key="detail" to={`/livings/detail/${value.id}`}>
          <Tag color="#00a65a" style={{ cursor: 'pointer', marginRight: 6 }}>
            详情
          </Tag>
        </Link >,
    ]
  }

  const renderContent = (room: LivingListItem) => {
    const number = room.category.type === 'person'
      ? Math.max(room.number, room.records.length)
      : Math.max(1, room.records.length);
    const xlCols = number === 1 ? 24 : 12;
    const result = [];
    for (let i = 0; i < number; i += 1) {
      const currentRecord: RecordListItem = room.records[i];
      if (currentRecord) {
        let element
        switch (currentRecord.type) {
          case 'person':
            element = <Person key={record?.id} record={currentRecord} actions={actions(currentRecord)} />
            break;
          case 'company':
            element = <Company key={record?.id} record={currentRecord} actions={actions(currentRecord)} />
            break;
          case 'functional':
            element = <Functional key={record?.id} record={currentRecord} actions={actions(currentRecord)} />
            break;
          default:
            element = null;
        }
        result.push(
          <Col key={currentRecord.id} style={{ padding: '2px' }} xs={24} lg={24} xl={xlCols} >
            <Card.Grid style={{ width: '100%', padding: 0 }}>
              {element}
            </Card.Grid>
          </Col>
        )
      } else {
        result.push(
          <Col key={`empty${room.id}${i}`} style={{ padding: '2px' }} xs={24} lg={24} xl={xlCols} >
            <Card.Grid style={{ width: '100%', padding: 0 }}>
              <Link to={`/livings/create/${room.id}`}>
                <Button
                  type="dashed"
                  style={{ border: '0', backgroundColor: '#5dade2', width: '100%', height: 247 }}
                >
                  <PlusOutlined style={{ fontSize: 30, color: 'rgba(0,0,0,0.65)' }} />
                </Button>
              </Link>
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
          {room.area ? room.area.title : ''}
          {room.category ? `（${room?.category.title}）` : ''}
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
            categories={categories}
            params={params}
            onSubmit={(value: LivingFetchParams) => { fetchData(value) }} />
        </Spin>
      </Card>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <Row gutter={24}>
            {list?.map(room => (
              <Col md={room.category.type === 'person' ? 12 : 6} sm={24} key={room.id} style={{ width: '100%' }}>
                <Card
                  style={{ marginBottom: 24 }}
                  headStyle={{ padding: '0 12px' }}
                  bodyStyle={{ padding: '2px' }}
                  title={renderLivingTitle(room)}
                  actions={[
                    <SettingOutlined onClick={() => { setRoomId(room.id); setRoomEditModalVisible(true) }} />,
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
      {
        record && <QuitModal
          handleVisible={(visible: boolean) => setQuitModalVisible(visible)}
          modalVisible={quitModalVisible}
          record={record}
        />
      }
      {
        record && <MoveModal
          areas={areas}
          handleVisible={(visible: boolean) => setMoveModalVisible(visible)}
          modalVisible={moveModalVisible}
          record={record}
        />
      }
      {
        record && <RenewModal
          handleVisible={(visible: boolean) => setRenewModalVisible(visible)}
          modalVisible={renewModalVisible}
          record={record}
        />
      }
      {
        record && <RenameModal
          handleVisible={(visible: boolean) => setRenameModalVisible(visible)}
          modalVisible={renameModalVisible}
          record={record}
        />
      }
      {
        roomId > 0 && <RoomEditModal
          roomId={roomId}
          modalVisible={roomEditModalVisible}
          handleVisible={(visible: boolean) => setRoomEditModalVisible(visible)}
        />
      }
      <BackTop />
    </PageHeaderWrapper >
  )
}

export default connect(
  ({ living, area, category, loading }:
    {
      living: ModelState,
      area: AreaModelState,
      category: CategoryModelState,
      loading: {
        models: { [key: string]: boolean }
      }
    }) => ({
      areas: area.list,
      categories: category.list,
      tree: living.tree,
      list: living.list,
      params: living.params,
      total: living.total,
      loading: loading.models.living
    })
)(Living);
