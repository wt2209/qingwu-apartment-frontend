import React from 'react';
import { Form, Modal } from 'antd';
import CommonFormItems from './CommonFormItems';
import { AreaListItem } from '@/pages/basic/areas/data';
import { FeeTypeListItem } from '@/pages/basic/feeTypes/data';

interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: any) => void;
  onCancel: () => void;
  areas: AreaListItem[] | undefined;
  feeTypes: FeeTypeListItem[] | undefined;
}

const CreateForm: React.FC<CreateFormProps> = props => {
  const [form] = Form.useForm();

  const { modalVisible, onSubmit: handleAdd, onCancel, areas, feeTypes } = props;
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
      onCancel={() => onCancel()}
    >
      <Form form={form}>
        <CommonFormItems areas={areas} feeTypes={feeTypes} />
      </Form>
    </Modal>
  );
};

export default CreateForm;
