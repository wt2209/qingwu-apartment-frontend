import React from 'react';
import { Form, Modal } from 'antd';
import CommonFormItems from './CommonFormItems';
import { CategoryListItem } from '../data';

interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: Partial<CategoryListItem>) => void;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();

  const { modalVisible, onSubmit: handleAdd, onCancel } = props;
  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    form.resetFields();
    handleAdd(fieldsValue);
  };
  return (
    <Modal
      destroyOnClose
      title="新建规则"
      visible={modalVisible}
      onOk={okHandle}
      okText="确定"
      cancelText="取消"
      onCancel={() => onCancel()}
    >
      <Form form={form}>
        <CommonFormItems />
      </Form>
    </Modal>
  );
};

export default CreateForm;
