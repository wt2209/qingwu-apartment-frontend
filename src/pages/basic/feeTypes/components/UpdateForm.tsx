import React, { useState } from 'react';
import { Form, Button, Modal } from 'antd';

import { FeeTypeListItem } from '../data';
import CommonFormItems from './CommonFormItems';

export interface FormValueType extends Partial<FeeTypeListItem> {
}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (id: string, values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<FeeTypeListItem>;
}

export interface UpdateFormState {
  formVals: FormValueType;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateForm: React.FC<UpdateFormProps> = props => {
  const [formVals, setFormVals] = useState<FormValueType>({
    title: props.values.title,
    turn_in: props.values.turn_in,
    rate: props.values.rate,
    remark: props.values.remark,
  });

  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();
    const result = { ...formVals, ...fieldsValue }
    setFormVals(result);
    handleUpdate(props.values.id || '', result);
  };

  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
        <Button type="primary" onClick={() => handleNext()}>
          确定
        </Button>
      </>
    );
  };

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="修改类型"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible(false, values)}
      afterClose={() => handleUpdateModalVisible()}
    >

      <Form
        {...formLayout}
        form={form}
        initialValues={formVals}
      >
        <CommonFormItems />
      </Form>
    </Modal>
  );
};

export default UpdateForm;
