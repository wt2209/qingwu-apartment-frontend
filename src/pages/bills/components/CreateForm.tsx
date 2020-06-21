import React from 'react';
import { Form, Modal } from 'antd';
import moment from 'moment';
import { AreaListItem } from '@/pages/basic/areas/data';
import { FeeTypeListItem } from '@/pages/basic/feeTypes/data';
import CommonFormItems from './CommonFormItems';
import styles from './style.less';

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
    const fieldsValue: any = await form.validateFields();
    if (fieldsValue.late_date instanceof moment) {
      fieldsValue.late_date = fieldsValue.late_date.format('YYYY-MM-DD')
    }
    if (fieldsValue.charged_at instanceof moment) {
      fieldsValue.charged_at = fieldsValue.charged_at.format('YYYY-MM-DD')
    }
    if (fieldsValue.should_charge_at instanceof moment) {
      fieldsValue.should_charge_at = fieldsValue.should_charge_at.format('YYYY-MM-DD')
    }
    form.resetFields();
    handleAdd(fieldsValue);
  };

  return (
    <Modal
      width={640}
      destroyOnClose
      title="新建规则"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form form={form} initialValues={{ type: 'person' }} className={styles.form}>
        <CommonFormItems areas={areas} feeTypes={feeTypes} hasCharged={false} />
      </Form>
    </Modal>
  );
};

export default CreateForm;
