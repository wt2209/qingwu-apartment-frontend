import React, { useEffect } from 'react'
import Modal from 'antd/lib/modal/Modal';
import { DatePicker, Input, Form, Button, Select } from 'antd';
import locale from "antd/es/date-picker/locale/zh_CN"
import moment from 'moment';
import { connect, Dispatch } from 'dva';
import { AreaListItem } from '@/pages/area/data';
import styles from './style.less'
import { RecordListItem } from '@/pages/records/data';

const itemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

interface Props {
  dispatch: Dispatch;
  handleVisible: (visible: boolean) => void;
  modalVisible: boolean;
  record: RecordListItem | undefined;
  areas: AreaListItem[] | undefined;
}

const MoveModal = (props: Props) => {
  const { modalVisible, handleVisible, dispatch, record, areas } = props
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      area_id: record?.area_id,
      title: undefined,
      deleted_at: moment(),
      electric_start_base: undefined,
      water_start_base: undefined,
      electric_end_base: undefined,
      water_end_base: undefined,
    })
  }, [record])

  const handleQuit = async () => {
    const formValues = await form.validateFields();
    const values: any = Object.assign({}, formValues)
    if (values.deleted_at instanceof moment) {
      values.deleted_at = values.deleted_at.format('YYYY-MM-DD')
    }
    handleVisible(false)
    dispatch({ type: 'living/move', payload: { id: record?.id, values } })
  }

  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => handleVisible(false)}>取消</Button>
        <Button type="primary" onClick={() => handleQuit()}>
          确定
        </Button>
      </>
    );
  };

  return (
    <Modal
      destroyOnClose
      title="调房"
      visible={modalVisible}
      onCancel={() => handleVisible(false)}
      footer={renderFooter()}
    >
      <Form
        form={form}
        layout="horizontal"
        className={styles.form}
      >
        <Form.Item
          name="area_id"
          {...itemLayout}
          rules={[{ required: true, message: '必须选择' }]}
          label="调到区域">
          <Select placeholder="请选择">
            {areas?.map(area =>
              <Select.Option key={area.id} value={area.id}>{area.title}</Select.Option>
            )}
          </Select>
        </Form.Item>
        <Form.Item
          name="title"
          {...itemLayout}
          rules={[{ required: true, message: '必须填写' }]}
          label="调到房间">
          <Input placeholder="请输入房间号" />
        </Form.Item>
        <Form.Item
          name="deleted_at"
          {...itemLayout}
          rules={[{ required: true, message: '必须填写' }]}
          label="调房日期">
          <DatePicker locale={locale} placeholder="调房日期" format="YYYY-M-D" />
        </Form.Item>
        <Form.Item {...itemLayout} label="现房间水电底数">
          <Form.Item
            name="electric_end_base"
            style={{ display: 'inline-block', width: 'calc(50% - 4px )', marginBottom: 0 }}
          >
            <Input placeholder="电表底数" />
          </Form.Item>
          <Form.Item
            name="water_end_base"
            style={{ display: 'inline-block', width: 'calc(50% - 4px)', margin: '0 0 0 8px' }}
          >
            <Input placeholder="水表底数" />
          </Form.Item>
        </Form.Item>
        <Form.Item {...itemLayout} label="新房间水电底数">
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
      </Form>
    </Modal >
  )
}

export default connect()(MoveModal)
