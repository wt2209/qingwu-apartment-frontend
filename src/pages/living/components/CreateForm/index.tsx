import React, { useState, useEffect } from 'react';
import { Modal, Steps, Form, Button } from 'antd';
import BasicInfoStep from './components/BasicInfoStep';
import UploadStep from './components/UploadStep';
import ChargeRuleStep from './components/ChargeRuleStep';
import { RoomListItem } from '@/pages/room/data';
import { getRoom } from '@/pages/room/service';
import { getAllCategories } from '@/pages/categories/service';
import styles from './style.less';

const { Step } = Steps

const itemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

interface Props {
  modalVisible: boolean;
  onCancel: () => void;
  roomId: number;
}

const CreateForm = (props: Props) => {
  const { modalVisible, onCancel } = props;
  const [currentStep, setCurrentStep] = useState(0)
  const [categories, setCategories] = useState()
  const [room, setRoom] = useState<RoomListItem>()
  const [form] = Form.useForm()
  const { roomId } = props
  const [formVals, setFormVals] = useState({
    room_id: roomId,
    type: '',
  })

  useEffect(() => {
    (async () => {
      const res = await Promise.all([getRoom(roomId), getAllCategories()])
      if (res[0] && res[0].data) {
        const currentRoom = res[0].data
        setRoom(currentRoom)
        setFormVals({ ...formVals, type: currentRoom.category.type })
      }
      if (res[1] && res[1].data) {
        setCategories(res[1].data)
      }
    })()
  }, [roomId])

  const backward = () => {
    setCurrentStep(() => currentStep - 1)
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
      return <ChargeRuleStep itemLayout={itemLayout} />
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
          <Button onClick={backward}>
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
          <Button style={{ float: 'left' }} onClick={backward}>
            上一步
          </Button>
          <Button type="primary" onClick={() => handleNext()}>
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
      width={800}
      destroyOnClose
      title="新建规则"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <Steps style={{ maxWidth: 1000, margin: '0 auto', paddingTop: 16 }} current={currentStep}>
        <Step title="填写基本信息" />
        <Step title="设置收费规则" />
        <Step title="上传入住凭证" />
        <Step title="完成" />
      </Steps>
      <Form
        form={form}
        layout="horizontal"
        initialValues={room}
        className={styles.stepForm}
      >
        {renderContent()}
        <Form.Item wrapperCol={{ span: 22 }} style={{ textAlign: 'right', marginTop: 24 }}>
          {renderFooter()}
        </Form.Item>
      </Form>
    </Modal >
  );
};

export default CreateForm;
