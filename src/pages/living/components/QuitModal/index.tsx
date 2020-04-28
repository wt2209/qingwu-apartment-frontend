import React, { useEffect } from 'react'
import Modal from 'antd/lib/modal/Modal';
import { DatePicker, Input, Form, Button } from 'antd';
import locale from "antd/es/date-picker/locale/zh_CN"
import moment from 'moment';
import { connect, Dispatch } from 'dva';
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
}

const QuitModal = (props: Props) => {
  const { modalVisible, handleVisible, dispatch, record } = props
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      area_id: record?.area_id,
      deleted_at: moment()
    })
  }, [record])

  const handleQuit = async () => {
    const formValues = await form.validateFields();
    const values: any = Object.assign({}, formValues)
    if (values.deleted_at instanceof moment) {
      values.deleted_at = values.deleted_at.format('YYYY-MM-DD')
    }
    form.resetFields()
    handleVisible(false)
    dispatch({ type: 'living/quit', payload: { id: record?.id, values } })
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
      title="退房"
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
          name="deleted_at"
          {...itemLayout}
          rules={[{ required: true, message: '必须填写' }]}
          label="退房日期">
          <DatePicker locale={locale} placeholder="退房日期" format="YYYY-M-D" />
        </Form.Item>
        <Form.Item {...itemLayout} label="退房水电底数">
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
      </Form>
    </Modal >
  )
}

export default connect()(QuitModal)
