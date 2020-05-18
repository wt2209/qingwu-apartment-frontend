import React from 'react';
import { Form, Modal } from 'antd';
import { FormValueType } from './UpdateForm';
import { ChargeRuleListItem } from '../data';
import CommonFormItems from './CommonFormItems';

interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: Partial<ChargeRuleListItem>) => void;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();

  const { modalVisible, onSubmit: handleAdd, onCancel } = props;
  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    form.resetFields();
    handleAdd((fieldsValue as FormValueType));
  };

  return (
    <Modal
      width={800}
      destroyOnClose
      title="新建交费规则"
      visible={modalVisible}
      okText="确定"
      cancelText="取消"
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form form={form} initialValues={{ period: 1 }}>
        <CommonFormItems form={form} rulesCount={0} />
      </Form>
    </Modal>
  );
};

export default CreateForm;
