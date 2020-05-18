import React, { useState, useEffect } from 'react';
import { Form, Button, Spin, Card, DatePicker, Select, Input, Upload, message } from 'antd';
import moment from 'moment';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { LeftOutlined, InboxOutlined } from '@ant-design/icons';
import { Link, router } from 'umi';
import { connect, Dispatch } from 'dva';
import locale from "antd/es/date-picker/locale/zh_CN"
import styles from './style.less';
import { CategoryListItem } from '@/pages/categories/data';
import { RoomListItem } from '@/pages/room/data';
import { getRoom } from '@/pages/room/service';
import { getAllCategories } from '@/pages/categories/service';
import { removeFile } from '../service';
import { FILE_UPLOAD_URL } from '@/config';
import { ChargeRuleListItem } from '@/pages/chargeRules/data';
import { getAllChargeRules } from '@/pages/chargeRules/service';
import PersonFormItems from './components/PersonFormItems';
import CompanyFormItems from './components/CompanyFormItems';

interface Props {
  dispatch: Dispatch;
  match: { params: { roomId: number } }
}

const itemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

export const dateFormater = 'YYYY-M-D'

const CreateLiving = (props: Props) => {
  const { match, dispatch } = props;
  const { roomId } = match.params
  const [chargeRules, setChargeRules] = useState<ChargeRuleListItem[]>()
  const [categories, setCategories] = useState<CategoryListItem[]>()
  const [room, setRoom] = useState<RoomListItem>()
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const initialValues = {
    room_id: roomId,
    record_at: moment(),
    person: {
      education: '其他'
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true)
      const res = await Promise.all([getAllCategories(), getRoom(roomId), getAllChargeRules()])
      if (res[0] && res[0].data) {
        setCategories(res[0].data)
      }
      if (res[1] && res[1].data) {
        const currentRoom = res[1].data
        const { type } = currentRoom?.category
        setRoom(currentRoom)
        const fields = {
          type,
          room_id: currentRoom.id,
          area_id: currentRoom.area.id,
          category_id: currentRoom.category.id,
          charge_rule_id: currentRoom.charge_rule_id,
        }
        form.setFieldsValue(fields)
      }
      if (res[2] && res[2].data) {
        setChargeRules(res[2].data.filter((item: ChargeRuleListItem) => item.type === res[1].data?.category?.type))
      }
      setLoading(false)
    })()
  }, [roomId])

  const handleSubmit = async () => {
    const fields = await form.validateFields()
    fields.type = room?.category?.type
    fields.room_id = roomId
    fields.area_id = room?.area?.id
    fields.record_at = fields.record_at ? fields.record_at.format(dateFormater) : undefined
    if (Array.isArray(fields.rent_date)) {
      fields.rent_start = fields.rent_date[0]?.format(dateFormater)
      fields.rent_end = fields.rent_date[1]?.format(dateFormater)
      delete fields.rent_date
    }
    if (Array.isArray(fields.uploaded_files)) {
      fields.proof_files = fields.uploaded_files.map(file => ({
        uid: file.uid,
        size: file.size,
        name: file.name,
        path: file.response?.path,
      }))
      delete fields.uploaded_files
    }
    if (fields.person) {
      if (fields.person?.hired_at instanceof moment) {
        fields.person.hired_at = fields.person.hired_at.format(dateFormater)
      }
      if (fields.person?.contract_start) {
        fields.person.contract_start = fields.person?.contract_start.format(dateFormater)
        fields.person.contract_end = '无固定期'
      }
      if (fields.person?.contract_date && Array.isArray(fields.person?.contract_date)) {
        fields.person.contract_start = fields.person.contract_date[0].format(dateFormater)
        fields.person.contract_end = fields.person.contract_date[1].format(dateFormater)
        delete fields.person.contract_date
      }
    }
    form.resetFields()
    message.success('入住成功')
    dispatch({ type: 'living/create', payload: fields })
    router.push('/livings')
  }

  const renderContent = () => {
    switch (room?.category?.type) {
      case 'person':
        return <PersonFormItems form={form} itemLayout={itemLayout} />
      case 'company':
        return <CompanyFormItems form={form} itemLayout={itemLayout} />
      case 'functional':
        return (
          <Form.Item
            name="functional_title"
            {...itemLayout}
            rules={[{ required: true, message: '必须输入' }]}
            label="房间用途">
            <Input />
          </Form.Item>
        )
      default:
        return null;
    }
  }

  const normFile = (e: { fileList: any; }) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <PageHeaderWrapper title="入住">
      <Card title={<Link to='/livings'><LeftOutlined /> 返回</Link>}>
        <Spin spinning={loading}>
          <Form
            form={form}
            layout="horizontal"
            initialValues={initialValues}
            className={styles.stepForm}
          >
            <Form.Item
              {...itemLayout}
              label="类型"
              rules={[{ required: true, message: '必须选择' }]}
              name="category_id">
              <Select placeholder="请选择">
                {categories?.filter(item => item.type === room?.category?.type)?.map(category =>
                  <Select.Option key={category.id} value={category.id}>{category.title}</Select.Option>
                )}
              </Select>
            </Form.Item>

            {renderContent()}

            <Form.Item
              name="record_at"
              {...itemLayout}
              rules={[{ required: true, message: '必须填写' }]}
              label="入住日期">
              <DatePicker locale={locale} placeholder="本房间入住日" format={dateFormater} />
            </Form.Item>
            <Form.Item name="rent_date" {...itemLayout} label="租期">
              <DatePicker.RangePicker locale={locale} placeholder={['开始日期', '结束日期']} format={dateFormater} />
            </Form.Item>
            <Form.Item {...itemLayout} label="选择收费规则" name="charge_rule_id">
              <Select placeholder="请选择">
                <Select.Option value={0}>无</Select.Option>
                {chargeRules?.map(rule =>
                  <Select.Option key={rule.id} value={rule.id}>{rule.title}</Select.Option>
                )}
              </Select>
            </Form.Item>
            <Form.Item {...itemLayout} label="入住水电底数">
              <Form.Item
                name="electric_start_base"
                style={{ display: 'inline-block', width: 'calc(50% - 4px )' }}
              >
                <Input placeholder="电表底数" />
              </Form.Item>
              <Form.Item
                name="water_start_base"
                style={{ display: 'inline-block', width: 'calc(50% - 4px)', margin: '0 0 0 8px' }}
              >
                <Input placeholder="水表底数" />
              </Form.Item>
            </Form.Item>
            <Form.Item {...itemLayout} name="uploaded_files" valuePropName="fileList" getValueFromEvent={normFile} label="上传入住凭证">
              <Upload.Dragger
                accept='.xls,.xlsx,.doc,.docx,.pdf,.txt,.jpg,.jpeg,.png,.gif'
                name="file"
                listType='picture'
                multiple
                onRemove={(file) => {
                  if (file.response.path) {
                    removeFile(file.response.path)
                  }
                }}
                headers={{
                  Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
                }}
                action={FILE_UPLOAD_URL}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">点击或将文件拖动到此区域</p>
                <p className="ant-upload-hint">可上传一个或多个文件</p>
              </Upload.Dragger>
            </Form.Item >
            <Form.Item wrapperCol={{ span: 22 }} style={{ textAlign: 'right', marginTop: 24 }}>
              <Link to="/livings">
                <Button style={{ marginLeft: 12 }} type="default">
                  返回
                </Button>
              </Link>
              <Button style={{ marginLeft: 12 }} type="primary" onClick={() => handleSubmit()}>
                完成
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Card >
    </PageHeaderWrapper>
  );
};

export default connect()(CreateLiving);
