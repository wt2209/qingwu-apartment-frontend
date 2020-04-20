import React, { FC, useRef, useState, useEffect } from 'react';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Card,
  Col,
  Dropdown,
  Input,
  List,
  Menu,
  Modal,
  Progress,
  Radio,
  Row,
  Checkbox,
  Tag,
} from 'antd';

import { findDOMNode } from 'react-dom';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import moment from 'moment';
import OperationModal from './components/OperationModal';
import { StateType } from './model';
import styles from './style.less';
import { RepairListItem } from './data';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

interface RepairsProps {
  repairs: StateType;
  loading: boolean;
}

const initialList: RepairListItem[] = [
  {
    id: 1,
    location: '红1-1-101',
    content: '厨房下水管道漏水',
    area: { id: 1, title: '职工公寓' },
    name: '服务站',
    phone: '86700256',
    inputer: '服务站',
    payer: 'company',
    report_at: '2020-4-19',
    reviewer: '管理室',
    reviewed_at: '2020-4-19',
    printed_at: '',
    is_passed: true,
    repairer: '雪',
    finished_at: '2020-4-19',
    created_at: '2020-4-19',
    updated_at: '2020-4-19',
  },
  {
    id: 2,
    location: '红1-1-102',
    content: '厕所水龙头坏',
    area: { id: 1, title: '职工公寓' },
    name: '',
    phone: '',
    inputer: '服务站',
    payer: 'company',
    report_at: '2020-4-19',
    reviewer: null,
    reviewed_at: undefined,
    printed_at: undefined,
    is_passed: false,
    repairer: undefined,
    finished_at: undefined,
    created_at: '2020-4-19',
    updated_at: '2020-4-19',
  },
  {
    id: 3,
    location: '高3-204',
    content: '水表坏',
    area: { id: 1, title: '职工公寓' },
    name: '张斌',
    phone: '13323531254',
    inputer: '服务站',
    payer: 'company',
    report_at: '2020-4-19',
    reviewer: '管理室',
    reviewed_at: '2020-4-19',
    printed_at: undefined,
    is_passed: false,
    repairer: undefined,
    finished_at: undefined,
    created_at: '2020-4-19',
    updated_at: '2020-4-19',
  },
  {
    id: 4,
    location: '9-1单元',
    content: '楼道灯不亮',
    area: { id: 1, title: '职工公寓' },
    name: '服务站',
    phone: '',
    inputer: '服务站',
    payer: 'wuye',
    report_at: '2020-4-19',
    reviewer: '服务站',
    reviewed_at: '2020-4-19',
    printed_at: '2020-4-19',
    is_passed: false,
    repairer: undefined,
    finished_at: undefined,
    created_at: '2020-4-19',
    updated_at: '2020-4-19',
  },
  {
    id: 5,
    location: '8-4地下室',
    content: '污水管碎',
    area: { id: 1, title: '职工公寓' },
    name: '服务站',
    phone: '',
    inputer: '服务站',
    payer: 'company',
    report_at: '2020-4-19',
    reviewer: '管理室',
    reviewed_at: '2020-4-19',
    printed_at: '2020-4-19',
    is_passed: true,
    repairer: '薛',
    finished_at: '2020-4-19',
    created_at: '2020-4-19',
    updated_at: '2020-4-19',
  },
]

const Info: FC<{
  title: React.ReactNode;
  value: React.ReactNode;
  bordered?: boolean;
}> = ({ title, value, bordered }) => (
  <div className={styles.headerInfo}>
    <span>{title}</span>
    <p>{value}</p>
    {bordered && <em />}
  </div>
);

const ListContent = (data: { data: RepairListItem }) => {
  const { data: item } = data

  let progress
  if (!item.reviewed_at) {
    progress = <Progress format={() => '待审批'} percent={0} status="active" strokeWidth={6} style={{ width: 120 }} />
  } else if (!item.printed_at) {
    progress = <Progress format={() => '已审批'} percent={33} status='active' strokeWidth={6} style={{ width: 120 }} />
  } else if (!item.finished_at) {
    progress = <Progress format={() => '维修中'} percent={66} status='active' strokeWidth={6} style={{ width: 120 }} />
  } else {
    progress = <Progress format={() => '已完工'} percent={100} status='success' strokeWidth={6} style={{ width: 120 }} />
  }
  return (
    <div className={styles.listContent} >
      {item.repairer ? <div className={styles.listContentItem}>
        <span>维修人员</span>
        <p>{item.repairer}</p>
      </div> : null}
      <div className={styles.listContentItem}>
        <span>付款方</span>
        <p>
          {item.payer === 'company' ? <Tag color="green">公司</Tag> : <Tag color="red">物业</Tag>}
        </p>
      </div>
      <div className={styles.listContentItem}>
        <span>报修人</span>
        <p>{item.name || 'ad'}</p>
      </div>
      <div className={styles.listContentItem}>
        <span>报修时间</span>
        <p>{moment(item.created_at).format('YYYY-MM-DD')}</p>
      </div>
      <div className={styles.listContentItem}>
        {progress}
      </div>
    </div >
  )
};

export const Repairs: FC<RepairsProps> = (props) => {
  const addBtn = useRef(null);
  const [list, setList] = useState<RepairListItem[]>(initialList)
  const [loading, setLoading] = useState<boolean>(false)
  const [done, setDone] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [current, setCurrent] = useState<Partial<RepairListItem> | undefined>(undefined);

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: false,
    pageSize: 20,
    total: 50,
  };

  const showModal = () => {
    setVisible(true);
    setCurrent(undefined);
  };

  const showEditModal = (item: RepairListItem) => {
    setVisible(true);
    setCurrent(item);
  };

  const deleteItem = (id: string) => {

  };

  const editAndDelete = (key: string, currentItem: RepairListItem) => {
    if (key === 'edit') showEditModal(currentItem);
    else if (key === 'delete') {
      Modal.confirm({
        title: '删除任务',
        content: '确定删除该任务吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => deleteItem(currentItem.id),
      });
    }
  };

  const selectAllContent = (
    <>
      <div style={{ display: 'inline-block', margin: '0 32px 0 16px' }}>
        <Checkbox >全选</Checkbox>
      </div>
      <Button>批量审批</Button>
    </>
  )

  const extraContent = (
    <div className={styles.extraContent} style={{ display: 'inline-block' }}>
      <RadioGroup defaultValue="all">
        <RadioButton value="all">全部</RadioButton>
        <RadioButton value="unreview">待审批</RadioButton>
        <RadioButton value="reviewed">已审批</RadioButton>
        <RadioButton value="repairing">维修中</RadioButton>
        <RadioButton value="done">已完工</RadioButton>
      </RadioGroup>
      <Search className={styles.extraContentSearch} placeholder="请输入" onSearch={() => ({})} />
    </div>
  );

  const MoreBtn: React.FC<{
    item: RepairListItem;
  }> = ({ item }) => (
    <Dropdown
      overlay={
        <Menu onClick={({ key }) => editAndDelete(key, item)}>
          <Menu.Item key="edit">编辑</Menu.Item>
          <Menu.Item key="delete">删除</Menu.Item>
        </Menu>
      }
    >
      <a>
        更多 <DownOutlined />
      </a>
    </Dropdown>
  );

  const setAddBtnblur = () => {
    if (addBtn.current) {
      // eslint-disable-next-line react/no-find-dom-node
      const addBtnDom = findDOMNode(addBtn.current) as HTMLButtonElement;
      setTimeout(() => addBtnDom.blur(), 0);
    }
  };

  const handleDone = () => {
    setAddBtnblur();

    setDone(false);
    setVisible(false);
  };

  const handleCancel = () => {
    setAddBtnblur();
    setVisible(false);
  };

  const handleSubmit = (values: RepairListItem) => {
    const id = current ? current.id : '';
    setAddBtnblur();
    setDone(true);
  };

  return (
    <div>
      <PageHeaderWrapper title={false}>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title="近30天当日完工率" value="98.2%" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="每项平均维修时间" value="3小时20分钟" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="本月完成项目数" value="24个项目" />
              </Col>
            </Row>
          </Card>

          <Card
            className={styles.listCard}
            bordered={false}
            title={selectAllContent}
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 16px 40px 16px' }}
            extra={extraContent}
          >
            <Button
              type="dashed"
              style={{ width: '100%', marginBottom: 8 }}
              onClick={showModal}
              ref={addBtn}
            >
              <PlusOutlined />
              报修
            </Button>

            <List
              size="large"
              rowKey="id"
              loading={loading}
              pagination={paginationProps}
              dataSource={list}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <a
                      key="edit"
                      onClick={(e) => {
                        e.preventDefault();
                        showEditModal(item);
                      }}
                    >
                      编辑
                    </a>,
                    <MoreBtn key="more" item={item} />,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<div style={{ lineHeight: '48px' }} ><Checkbox /></div>}
                    title={item.location}
                    description={item.content}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageHeaderWrapper>

      <OperationModal
        done={done}
        current={current}
        visible={visible}
        onDone={handleDone}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    </div >
  );
};

export default Repairs;
