import React, { useState } from 'react'
import Modal from 'antd/lib/modal/Modal';
import { DatePicker, Input, Form, Button } from 'antd';
import locale from "antd/es/date-picker/locale/zh_CN"
import moment from 'moment';
import { connect, Dispatch } from 'umi';

const itemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

interface Props {
  dispatch: Dispatch;
  handleVisible: (visible: boolean) => void;
  modalVisible: boolean;
  recordId: number | undefined;
}

const QuitModal = (props: Props) => {
  const { modalVisible, handleVisible, dispatch, recordId } = props
  const [formVals] = useState({
    id: undefined,
    deleted_at: moment(),
    electric_end_base: undefined,
    water_end_base: undefined,
  });
  const [form] = Form.useForm();

  const handleQuit = async () => {
    const formValues = await form.validateFields();
    const values: any = Object.assign({}, formValues)
    if (values.deleted_at instanceof moment) {
      values.deleted_at = values.deleted_at.format('YYYY-MM-DD')
    }
    form.resetFields()
    handleVisible(false)
    dispatch({ type: 'living/quit', payload: { id: recordId, values } })
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
        initialValues={formVals}
        layout="horizontal"
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
            style={{ display: 'inline-block', width: 'calc(50% - 4px )' }}
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
