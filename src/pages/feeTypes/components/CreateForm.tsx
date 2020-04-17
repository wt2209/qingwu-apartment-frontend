import React from 'react';
import { Form, Modal } from 'antd';
import CommonFormItems from './CommonFormItems';
import { FeeTypeListItem } from '../data';

interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: Partial<FeeTypeListItem>) => void;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = props => {
  const [form] = Form.useForm();

  const { modalVisible, onSubmit: handleAdd, onCancel } = props;
  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    form.resetFields();
    handleAdd((fieldsValue as Partial<FeeTypeListItem>));
  };
  return (
    <Modal
      destroyOnClose
      title="新建规则"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form form={form} initialValues={{ turn_in: true }}>
        <CommonFormItems />
      </Form>
    </Modal>
  );
};

export default CreateForm;
