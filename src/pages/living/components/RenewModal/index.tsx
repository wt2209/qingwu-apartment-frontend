import React, { useEffect } from 'react'
import Modal from 'antd/lib/modal/Modal'
import { connect, Dispatch } from 'umi'
import { DatePicker, Button, Form } from 'antd'
import locale from "antd/es/date-picker/locale/zh_CN"
import moment from 'moment'
import { RecordListItem } from '@/pages/basic/records/data'
import styles from './style.less'

const itemLayout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 11 },
};

interface Props {
  dispatch: Dispatch;
  handleVisible: (visible: boolean) => void;
  modalVisible: boolean;
  record: RecordListItem;
}

const RenewModal = (props: Props) => {
  const { modalVisible, handleVisible, dispatch, record } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      renewed_at: moment(),
      new_rent_end: undefined,
    })
  }, [record])

  const handleRenew = async () => {
    const formValues = await form.validateFields()
    const values: any = Object.assign({}, formValues)
    if (values.renewed_at instanceof moment) {
      values.renewed_at = values.renewed_at.format('YYYY-MM-DD')
    }
    if (values.new_rent_end instanceof moment) {
      values.new_rent_end = values.new_rent_end.format('YYYY-MM-DD')
    }
    handleVisible(false)
    dispatch({ type: 'living/renew', payload: { id: record?.id, values } })
  }

  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => handleVisible(false)}>取消</Button>
        <Button type="primary" onClick={() => handleRenew()}>
          确定
        </Button>
      </>
    );
  };

  return (
    <Modal
      destroyOnClose
      title="续签"
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
          name="new_rent_end"
          {...itemLayout}
          rules={[{ required: true, message: '必须填写' }]}
          label="新租期结束日">
          <DatePicker locale={locale} placeholder="新租期结束日" format="YYYY-M-D" />
        </Form.Item>
        <Form.Item
          name="renewed_at"
          {...itemLayout}
          rules={[{ required: true, message: '必须填写' }]}
          label="续签日期">
          <DatePicker locale={locale} placeholder="续签日期" format="YYYY-M-D" />
        </Form.Item>
      </Form>
    </Modal >
  )
}

export default connect()(RenewModal)
