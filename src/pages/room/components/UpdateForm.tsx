import React, { useState } from 'react';
import { Form, Button, Modal } from 'antd';

import { RoomListItem } from '../data.d';
import CommonFormItems from './CommonFormItems';

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
    console.log(fieldsValue)
    return
    setFormVals({ ...formVals, ...fieldsValue });
    handleUpdate(formVals);
  };

  const renderFooter = () => (
    <>
      <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
      <Button type="primary" onClick={() => handleNext()}>
        确定
      </Button>
    </>
  );

  const initialValues = {
    ...formVals,
    area_id: formVals.area ? formVals.area.id : 2,
    category_id: formVals.category ? formVals.category.id : undefined,
  }

  return (
    <Modal
      width={800}
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
        initialValues={initialValues}
      >

        <CommonFormItems />

        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="房间收费项目"
          extra={
            <p>以逗号分隔不同年份的月度费用，如: 600, 700, 800。<br />以上示例指第一年600元/月，第二年700元/月，第三年及以后800元/月</p>
          }
        >
          {/* <Button type="link" onClick={() => { setChargeCount(() => chargeCount + 1) }}>添加一项</Button>
        {chargeGroups.map(item => item)} */}
        </FormItem>
      </Form>
    </Modal>
  );
};

export default UpdateForm;
