import React from 'react';
import { Form, Modal } from 'antd';
import { RoomFormValueType } from '../data';
import CommonFormItems from './CommonFormItems';
import { AreaListItem } from '@/pages/basic/areas/data';
import { CategoryListItem } from '@/pages/basic/categories/data';
import { ChargeRuleListItem } from '@/pages/basic/chargeRules/data';

interface CreateFormProps {
  areas: AreaListItem[] | undefined;
  categories: CategoryListItem[] | undefined;
  chargeRules?: ChargeRuleListItem[];
  modalVisible: boolean;
  onSubmit: (fieldsValue: RoomFormValueType) => void;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = props => {
  const [form] = Form.useForm();

  const { modalVisible, onSubmit: handleAdd, onCancel } = props;

  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    form.resetFields();
    handleAdd((fieldsValue as RoomFormValueType));
  };

  return (
    <Modal
      width={640}
      destroyOnClose
      title="新增房间"
      visible={modalVisible}
      onOk={okHandle}
      cancelText="取消"
      okText="确定"
      onCancel={() => onCancel()}
    >
      <Form form={form}>
        <CommonFormItems chargeRules={props.chargeRules} areas={props.areas} categories={props.categories} />
      </Form>
    </Modal >
  );
};

export default CreateForm;
