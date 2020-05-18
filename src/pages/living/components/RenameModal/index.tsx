import React, { useEffect } from 'react'
import Modal from 'antd/lib/modal/Modal'
import { connect, Dispatch } from 'dva'
import { DatePicker, Button, Form, Input } from 'antd'
import locale from "antd/es/date-picker/locale/zh_CN"
import moment from 'moment'
import { RecordListItem } from '@/pages/basic/records/data'
import styles from './style.less'

const itemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

interface Props {
  dispatch: Dispatch;
  handleVisible: (visible: boolean) => void;
  modalVisible: boolean;
  record: RecordListItem;
}

const RenameModal = (props: Props) => {
  const { modalVisible, handleVisible, dispatch, record } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      renamed_at: moment(),
      new_company_name: undefined,
    })
  }, [record])

  const handleRename = async () => {
    const formValues = await form.validateFields()
    const values: any = Object.assign({}, formValues)
    if (values.renamed_at instanceof moment) {
      values.renamed_at = values.renamed_at.format('YYYY-MM-DD')
    }

    handleVisible(false)
    dispatch({ type: 'living/rename', payload: { companyId: record!.company!.id, values } })
  }

  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => handleVisible(false)}>取消</Button>
        <Button type="primary" onClick={() => handleRename()}>
          确定
        </Button>
      </>
    );
  };

  return (
    <Modal
      destroyOnClose
      title="公司改名"
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
          name="new_company_name"
          {...itemLayout}
          rules={[{ required: true, message: '必须填写' }]}
          label="新公司名称">
          <Input placeholder="新公司名称" />
        </Form.Item>
        <Form.Item
          name="renamed_at"
          {...itemLayout}
          rules={[{ required: true, message: '必须填写' }]}
          label="改名日期">
          <DatePicker locale={locale} placeholder="改名日期" format="YYYY-M-D" />
        </Form.Item>
      </Form>
    </Modal >
  )
}

export default connect()(RenameModal)
