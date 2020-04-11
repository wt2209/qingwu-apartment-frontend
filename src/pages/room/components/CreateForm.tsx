import React, { useState } from 'react';
import { Form, Input, Modal, Select, Button } from 'antd';
import { RoomListItem } from '../data';
import CommonFormItems from './CommonFormItems';

const FormItem = Form.Item;

interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: Partial<RoomListItem>) => void;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = props => {
  const [form] = Form.useForm();
  const [chargeCount, setChargeCount] = useState(0)

  const { modalVisible, onSubmit: handleAdd, onCancel } = props;

  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    console.log(fieldsValue);
    return
    form.resetFields();
    handleAdd(fieldsValue);
  };

  const chargeGroups = []
  for (let i = 0; i < chargeCount; i += 1) {
    chargeGroups.push(
      <Input.Group key={i} compact style={{ display: 'flex', marginBottom: 4 }}>
        <Form.Item
          name={['charge_rule', i, 'bill_type_id']}
          noStyle
          rules={[{ required: true, message: '必须选择收费项目' }]}
        >
          <Select
            style={{ width: 120 }}
            showSearch
            allowClear
            optionFilterProp="children"
            placeholder="选择收费项目">
            <Select.Option value="1">浙江</Select.Option>
            <Select.Option value="2">江苏</Select.Option>
          </Select>
        </Form.Item>&nbsp;
            <Form.Item
          name={['charge_rule', i, 'fees']}
          noStyle
          rules={[{ required: true, message: '必须填写费用' }]}
        >
          <Input style={{ flex: 1 }} placeholder="请输入不同年份的月度费用" />
        </Form.Item>
        {i === chargeCount - 1
          ? <Button type="link" onClick={() => setChargeCount(() => chargeCount - 1)}>删除</Button>
          : <span style={{ width: 60 }} />
        }
      </Input.Group>
    )
  }

  return (
    <Modal
      width={800}
      destroyOnClose
      title="新增房间"
      visible={modalVisible}
      onOk={okHandle}
      cancelText="取消"
      okText="确定"
      onCancel={() => onCancel()}
    >
      <Form form={form}>

        <CommonFormItems />

        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="房间收费项目"
          extra={
            <p>以逗号分隔不同年份的月度费用，如: 600, 700, 800。<br />以上示例指第一年600元/月，第二年700元/月，第三年及以后800元/月</p>
          }
        >
          <Button type="link" onClick={() => { setChargeCount(() => chargeCount + 1) }}>添加一项</Button>
          {chargeGroups.map(item => item)}
        </FormItem>
      </Form>
    </Modal >
  );
};

export default CreateForm;
