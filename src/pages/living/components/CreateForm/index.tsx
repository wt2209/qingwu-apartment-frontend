import React, { useState, useEffect } from 'react';
import { Modal, Steps, Form, Button, Spin } from 'antd';
import moment from 'moment';
import BasicInfoStep from './components/BasicInfoStep';
import UploadStep from './components/UploadStep';
import ChargeRuleStep from './components/ChargeRuleStep';
import { RoomListItem } from '@/pages/room/data';
import { getRoom } from '@/pages/room/service';
import styles from './style.less';
import { CategoryListItem } from '@/pages/categories/data';

const { Step } = Steps

const itemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

interface Props {
  modalVisible: boolean;
  onCancel: () => void;
  roomId: number;
  categories: CategoryListItem[] | undefined;
}

const CreateForm = (props: Props) => {
  const { modalVisible, onCancel, categories } = props;
  const [currentStep, setCurrentStep] = useState(0)
  const [room, setRoom] = useState<RoomListItem>()
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const { roomId } = props
  const [formVals, setFormVals] = useState({
    room_id: roomId,
    type: '',
    category_id: undefined,
    record_at: moment(),
    person: {
      education: '其他',
    }
  })

  useEffect(() => {
    (async () => {
      setLoading(true)
      const res = await getRoom(roomId)
      if (res && res.data) {
        const currentRoom = res.data
        const { type } = currentRoom?.category
        setRoom(currentRoom)
        const fields = { ...formVals, type, category_id: currentRoom.category.id }
        setFormVals(fields)
        form.setFieldsValue(fields)
      }
      setLoading(false)
    })()
  }, [roomId])

  const handleCancel = () => {
    setCurrentStep(0)
    onCancel()
  }

  const handleNext = async () => {
    const fields = await form.validateFields()
    setFormVals({ ...formVals, ...fields })
    if (currentStep === 2) {
      console.log({ ...formVals, ...fields })
    } else {
      setCurrentStep(() => currentStep + 1)
    }
  }

  const renderContent = () => {
    if (currentStep === 1) {
      return <ChargeRuleStep type={formVals.type} itemLayout={itemLayout} />
    }
    if (currentStep === 2) {
      return <UploadStep itemLayout={itemLayout} />
    }
    return <BasicInfoStep room={room} categories={categories} itemLayout={itemLayout} />
  }

  const renderFooter = () => {
    if (currentStep === 1) {
      return (
        <>
          <Button onClick={() => setCurrentStep(() => currentStep - 1)}>
            上一步
          </Button>
          <Button style={{ marginLeft: 12 }} type="primary" onClick={() => handleNext()}>
            下一步
          </Button>
        </>
      );
    }
    if (currentStep === 2) {
      return (
        <>
          <Button onClick={() => setCurrentStep(() => currentStep - 1)}>
            上一步
          </Button>
          <Button style={{ marginLeft: 12 }} type="primary" onClick={() => handleNext()}>
            完成
          </Button>
        </>
      );
    }
    return (
      <>
        <Button type="primary" onClick={() => handleNext()}>
          下一步
        </Button>
      </>
    );
  }

  return (
    <Modal
      width={660}
      destroyOnClose
      title="新建规则"
      visible={modalVisible}
      onCancel={() => handleCancel()}
      footer={null}
    >
      <Steps size="small" current={currentStep}>
        <Step title="填写基本信息" />
        <Step title="设置收费规则" />
        <Step title="上传入住凭证" />
      </Steps>
      <Spin spinning={loading}>
        <Form
          form={form}
          layout="horizontal"
          initialValues={formVals}
          className={styles.stepForm}
        >
          <div style={{ minHeight: 400 }}>
            {renderContent()}
          </div>
          <Form.Item wrapperCol={{ span: 22 }} style={{ textAlign: 'right', marginTop: 24 }}>
            {renderFooter()}
          </Form.Item>
        </Form>
      </Spin>
    </Modal >
  );
};

export default CreateForm;
