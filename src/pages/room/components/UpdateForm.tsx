import React, { useState } from 'react';
import { Form, Button, Input, Modal } from 'antd';

import { RoomListItem } from '../data.d';

export interface FormValueType extends Partial<RoomListItem> { }

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<RoomListItem>;
}
const FormItem = Form.Item;

export interface UpdateFormState {
  formVals: FormValueType;
  currentStep: number;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateForm: React.FC<UpdateFormProps> = props => {
  const [formVals, setFormVals] = useState<FormValueType>({
    title: props.values.title,
    building: props.values.building,
    unit: props.values.unit,
    rent: props.values.rent,
    number: props.values.number,
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
    setFormVals({ ...formVals, ...fieldsValue });
    handleUpdate(formVals);
  };

  const renderContent = () => (
    <>
      <FormItem name="title" label="房间号">
        <Input style={{ width: '100%' }} />
      </FormItem>
      <FormItem name="building" label="楼号">
        <Input style={{ width: '100%' }} />
      </FormItem>
      <FormItem name="unit" label="单元">
        <Input style={{ width: '100%' }} />
      </FormItem>
    </>
  );

  const renderFooter = () => (
    <>
      <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
      <Button type="primary" onClick={() => handleNext()}>
        确定
      </Button>
    </>
  );

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="修改房间"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible(false, values)}
      afterClose={() => handleUpdateModalVisible()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          title: formVals.title,
          building: formVals.building,
          unit: formVals.unit,
          rent: formVals.rent,
          number: formVals.number,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
