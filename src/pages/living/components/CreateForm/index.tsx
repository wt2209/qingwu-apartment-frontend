import React, { useState, useEffect } from 'react';
import { Modal, Steps, Form, Button, Spin } from 'antd';
import moment, { Moment } from 'moment';
import { UploadFile } from 'antd/lib/upload/interface';
import BasicInfoStep from './components/BasicInfoStep';
import UploadStep from './components/UploadStep';
import ChargeRuleStep from './components/ChargeRuleStep';
import { RoomListItem } from '@/pages/room/data';
import { getRoom } from '@/pages/room/service';
import styles from './style.less';
import { CategoryListItem } from '@/pages/categories/data';


interface Props {
  handleCreate: (values: any) => void;
  modalVisible: boolean;
  onCancel: () => void;
  roomId: number;
  categories: CategoryListItem[] | undefined;
}

interface FormVals {
  room_id: number;
  area_id: number | undefined;
  type: 'person' | 'company' | 'functional' | undefined;
  category_id: number | undefined;
  record_at?: Moment;
  person?: {
    name: string;
    serial?: string;
    gender?: '男' | '女';
    identify?: string;
    education?: string;
    phone?: string;
    department?: string;
    hired_at?: Moment;
    contract_date?: Moment[] | Moment;
    contract_start?: Moment;
    no_end?: boolean;
    remark?: string;
  };
  company?: {
    company_name: string;
    manager?: string;
    manager_phone?: string;
    linkman?: string;
    linkman_phone?: string;
    remark?: string;
  };
  charge_rule_id?: number;
  rent_date?: Moment[];
  uploaded_files?: Array<UploadFile<{ path: string }>>;
}

const { Step } = Steps

const itemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

export const dateFormater = 'YYYY-M-D'

const formatFields = (values: FormVals) => {
  const { person, company, rent_date, uploaded_files, ...rest } = Object.assign({}, values)
  const result: any = { ...rest }
  if (result.record_at instanceof moment) {
    result.record_at = result.record_at.format(dateFormater)
  }
  if (Array.isArray(rent_date)) {
    result.rent_start = rent_date[0]?.format(dateFormater)
    result.rent_end = rent_date[1]?.format(dateFormater)
  }
  if (Array.isArray(uploaded_files)) {
    result.proof_files = uploaded_files.map(file => ({
      name: file.name,
      path: file.response?.path,
    }))
  }
  if (result.type === 'person') {
    result.person = Object.assign({}, person)
    if (person?.hired_at instanceof moment) {
      result.person.hired_at = person.hired_at.format(dateFormater)
    }
    if (person?.contract_start) {
      result.person.contract_start = person?.contract_start.format(dateFormater)
      result.person.contract_end = '无固定期'
    }
    if (person?.contract_date && Array.isArray(person?.contract_date)) {
      result.person.contract_start = person?.contract_date[0].format(dateFormater)
      result.person.contract_end = person?.contract_date[1].format(dateFormater)
    }
    delete result.person.contract_date
  } else if (result.type === 'company') {
    result.company = Object.assign({}, company)
  }
  delete result.uploaded_files
  return result
}

const CreateForm = (props: Props) => {
  const { modalVisible, onCancel, categories } = props;
  const [currentStep, setCurrentStep] = useState(0)
  const [room, setRoom] = useState<RoomListItem>()
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const { roomId, handleCreate } = props
  const [formVals, setFormVals] = useState<FormVals>({
    room_id: roomId,
    area_id: undefined,
    type: undefined,
    category_id: undefined,
    record_at: undefined,
    person: {
      name: '',
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
        const fields = {
          type,
          room_id: currentRoom.id,
          area_id: currentRoom.area.id,
          category_id: currentRoom.category.id,
        }
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
      const values = formatFields({ ...formVals, ...fields })
      form.resetFields()
      const resets = {}
      Object.keys(formVals).forEach(item => { resets[item] = undefined })
      form.setFieldsValue({
        ...resets,
        type: formVals.type,
        room_id: formVals.room_id,
        area_id: formVals.area_id,
        category_id: formVals.category_id,
      })
      setCurrentStep(0)
      handleCreate(values)
    } else {
      setCurrentStep(() => currentStep + 1)
    }
  }

  const renderContent = () => {
    if (currentStep === 1) {
      return <ChargeRuleStep type={formVals.type || ''} itemLayout={itemLayout} />
    }
    if (currentStep === 2) {
      return <UploadStep itemLayout={itemLayout} />
    }
    return <BasicInfoStep form={form} room={room} categories={categories} itemLayout={itemLayout} />
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
