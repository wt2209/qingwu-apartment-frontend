import React from 'react';
import { Form, Modal } from 'antd';
import moment from 'moment';
import { AreaListItem } from '@/pages/basic/areas/data';
import { FeeTypeListItem } from '@/pages/basic/feeTypes/data';
import { BillListItem, BillFormValueType } from '../data.d';
import CommonFormItems from './CommonFormItems';
import styles from './style.less';

export interface Props {
  onCancel: (flag?: boolean, formVals?: BillFormValueType) => void;
  onSubmit: (id: number, values: BillFormValueType) => void;
  updateModalVisible: boolean;
  bill: BillListItem;
  areas: AreaListItem[] | undefined;
  feeTypes: FeeTypeListItem[] | undefined;
}

const UpdateForm: React.FC<Props> = props => {
  const [form] = Form.useForm();
  const { onSubmit, onCancel, updateModalVisible, bill, areas, feeTypes, } = props;

  const { late_date, charged_at, should_charge_at, ...rest } = bill
  const initialValues = {
    ...rest,
    late_date: typeof late_date === 'string' ? moment(late_date) : null,
    charged_at: typeof charged_at === 'string' ? moment(charged_at) : null,
    should_charge_at: typeof should_charge_at === 'string' ? moment(should_charge_at) : null,
  }
  // 是否已缴费.缴费以后才可以修改缴费时间和缴费方式
  const hasCharged = !!charged_at

  const handleUpdate = async () => {
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
    onSubmit(bill.id, fieldsValue);
  };

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="规则配置"
      visible={updateModalVisible}
      onOk={handleUpdate}
      onCancel={() => onCancel(false)}
      afterClose={() => onCancel(false)}
    >
      <Form form={form} initialValues={initialValues} className={styles.form}>
        <CommonFormItems areas={areas} feeTypes={feeTypes} hasCharged={hasCharged} />
      </Form>
    </Modal>
  );
};

export default UpdateForm;
