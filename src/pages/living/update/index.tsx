import React, { useState, useEffect } from 'react';
import { Form, Button, Spin, Card, DatePicker, Select, Input, Upload, message } from 'antd';
import moment from 'moment';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { LeftOutlined, InboxOutlined } from '@ant-design/icons';
import { Link, history, connect, Dispatch } from 'umi';
import locale from "antd/es/date-picker/locale/zh_CN"
import styles from './style.less';
import { CategoryListItem } from '@/pages/basic/categories/data';
import { getAllCategories } from '@/pages/basic/categories/service';
import { getOneLiving } from '../service';
import { RecordListItem } from '@/pages/basic/records/data';
import { getAllChargeRules } from '@/pages/basic/chargeRules/service';
import { ChargeRuleListItem } from '@/pages/basic/chargeRules/data';
import { FILE_UPLOAD_URL } from '@/config';
import { removeFile } from '@/pages/living/service';
import PersonFormItems from '../create/components/PersonFormItems';
import CompanyFormItems from '../create/components/CompanyFormItems';

interface Props {
  dispatch: Dispatch;
  match: { params: { recordId: number } }
}

const itemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

export const dateFormater = 'YYYY-M-D'

const UpdateLiving = (props: Props) => {
  const { match, dispatch } = props;
  const { recordId } = match.params
  const [categories, setCategories] = useState<CategoryListItem[]>()
  const [chargeRules, setChargeRules] = useState<ChargeRuleListItem[]>()
  const [record, setRecord] = useState<RecordListItem>()
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      setLoading(true)
      const res = await Promise.all([getAllCategories(), getOneLiving(recordId), getAllChargeRules()])
      if (res[0] && res[0].data) {
        setCategories(res[0].data)
      }
      if (res[1] && res[1].data) {
        const currentRecord: RecordListItem = res[1].data
        setRecord(currentRecord)
        const values: any = Object.assign({}, currentRecord)
        values.record_at = moment(values.record_at)
        if (values.rent_start) {
          values.rent_date = [
            moment(values.rent_start),
            moment(values.rent_end)
          ]
        }
        delete values.rent_start
        delete values.rent_end
        if (values.person) {
          values.person.hired_at = moment(values.person.hired_at)
          if (values.person.contract_start) {
            if (values.person.contract_end === '无固定期') {
              values.person.contract_start = moment(values.person.contract_start)
              delete values.person.contract_end
            } else {
              values.person.contract_date = [moment(values.person.contract_start), moment(values.person.contract_end)]
              delete values.person.contract_start
              delete values.person.contract_end
            }
          }
        }
        if (values.proof_files) {
          values.uploaded_files = values.proof_files.map((item: any, index: number) => {
            return {
              uid: item.uid || index + 1,
              size: item.size || 0,
              name: item.name,
              path: item.path,
              url: item.url
            }
          })
        }
        form.setFieldsValue(values)
      }
      if (res[2] && res[2].data) {
        setChargeRules(res[2].data)
      }
      setLoading(false)
    })()
  }, [])

  const handleNext = async () => {
    const fields = await form.validateFields()
    fields.id = record?.id
    fields.type = record?.type
    fields.area_id = record?.area.id
    fields.room_id = record?.room.id
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
        path: file.path || file.response?.path,
      }))
      delete fields.uploaded_files
    }
    if (fields.person) {
      fields.person.id = record?.person.id
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
    } else if (fields.company) {
      fields.company.id = record?.company?.id
    }
    message.success('修改成功')
    // console.log(fields)
    dispatch({ type: 'living/update', payload: fields })
    history.push('/livings')
  }

  const renderContent = () => {
    switch (record?.type) {
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
    <PageHeaderWrapper title="修改">
      <Card title={<Link to='/livings'><LeftOutlined /> 返回</Link>}>
        <Spin spinning={loading}>
          <Form
            form={form}
            layout="horizontal"
            className={styles.stepForm}
          >
            <Form.Item
              {...itemLayout}
              label="类型"
              rules={[{ required: true, message: '必须选择' }]}
              name="category_id">
              <Select placeholder="请选择">
                {categories?.filter(item => item.type === record?.type)?.map(category =>
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
                {chargeRules?.filter((item: ChargeRuleListItem) => item.type === record?.type)?.map(rule =>
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
                onRemove={(file: any) => {
                  if (file.path) {
                    removeFile(file.path)
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
              <Button style={{ marginLeft: 12 }} type="primary" onClick={() => handleNext()}>
                完成
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Card >
    </PageHeaderWrapper>
  );
};

export default connect()(UpdateLiving);
