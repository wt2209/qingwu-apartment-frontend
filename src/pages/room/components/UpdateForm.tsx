import React, { useState } from 'react';
import { Form, Button, Modal } from 'antd';

import { RoomListItem, RoomFormValueType } from '../data.d';
import CommonFormItems from './CommonFormItems';
import { AreaListItem } from '@/pages/area/data';
import { CategoryListItem } from '@/pages/categories/data';

export interface UpdateFormProps {
  areas: AreaListItem[] | undefined;
  categories: CategoryListItem[] | undefined;
  onCancel: (flag?: boolean, formVals?: RoomFormValueType) => void;
  onSubmit: (values: RoomFormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<RoomListItem>;
}

export interface UpdateFormState {
  formVals: RoomFormValueType;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateForm: React.FC<UpdateFormProps> = props => {
  const [formVals, setFormVals] = useState<RoomFormValueType>({
    title: props.values.title,
    building: props.values.building,
    unit: props.values.unit,
    number: props.values.number,
    area_id: props.values.area ? props.values.area.id : undefined,
    category_id: props.values.category ? props.values.category.id : undefined,
    remark: props.values.remark,
  });

  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
  } = props;


  const handleNext = async () => {
    const fieldsValue = await form.validateFields();
    const result = { ...formVals, ...fieldsValue }
    setFormVals(result);
    handleUpdate(result);
  };

  const renderFooter = () => (
    <>
      <Button onClick={() => handleUpdateModalVisible(false)}>取消</Button>
      <Button type="primary" onClick={() => handleNext()}>
        确定
      </Button>
    </>
  );

  return (
    <Modal
      width={800}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="修改房间"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible(false)}
      afterClose={() => handleUpdateModalVisible()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={formVals}
      >
        <CommonFormItems areas={props.areas} categories={props.categories} />
      </Form>
    </Modal >
  );
};

export default UpdateForm;
