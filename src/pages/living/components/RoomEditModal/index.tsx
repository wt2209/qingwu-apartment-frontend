import React, { useEffect, useState } from 'react'
import Modal from 'antd/lib/modal/Modal'
import { Input, Form, Button, Spin, Select, InputNumber } from 'antd'
import { Dispatch, connect } from 'umi'
import styles from './style.less'
import { getRoom } from '@/pages/basic/rooms/service'
import { AreaListItem } from '@/pages/basic/areas/data'
import { getAllAreas } from '@/pages/basic/areas/service'
import { getAllCategories } from '@/pages/basic/categories/service'
import { CategoryListItem } from '@/pages/basic/categories/data'
import { getAllChargeRules } from '@/pages/basic/chargeRules/service'
import { ChargeRuleListItem } from '@/pages/basic/chargeRules/data'

const itemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

interface Props {
  modalVisible: boolean;
  roomId: number;
  dispatch: Dispatch;
  handleVisible: (visible: boolean) => void;
}

const RoomEditModal = (props: Props) => {
  const { modalVisible, roomId, dispatch, handleVisible } = props
  const [loading, setLoading] = useState<boolean>(false)
  const [areas, setAreas] = useState<AreaListItem[]>()
  const [categories, setCategories] = useState<CategoryListItem[]>()
  const [rules, setRules] = useState<ChargeRuleListItem[]>()
  const [form] = Form.useForm()

  useEffect(() => {
    (async () => {
      setLoading(true)
      const [res1, res2, res3, res4] = await Promise.all([
        getRoom(roomId),
        getAllAreas(),
        getAllCategories(),
        getAllChargeRules(),
      ]);
      if (res1 && res1.data) {
        form.setFieldsValue(res1.data)
      }
      if (res2 && res2.data) {
        setAreas(res2.data)
      }
      if (res3 && res3.data) {
        setCategories(res3.data)
      }
      if (res4 && res4.data) {
        setRules(res4.data)
      }
      setLoading(false)
    })()
  }, [roomId])

  const handleEdit = () => {
    const values = form.getFieldsValue()
    handleVisible(false)
    dispatch({ type: 'living/editRoom', payload: { id: roomId, values } })
  }

  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => handleVisible(false)}>取消</Button>
        <Button type="primary" onClick={() => handleEdit()}>
          确定
        </Button>
      </>
    );
  };

  return (
    <Modal
      destroyOnClose
      title="房间修改"
      visible={modalVisible}
      onCancel={() => handleVisible(false)}
      footer={renderFooter()}
    >
      <Spin spinning={loading}>
        <Form
          form={form}
          layout="horizontal"
          className={styles.form}
        >
          <Form.Item
            name="area_id"
            {...itemLayout}
            rules={[{ required: true, message: '不能为空' }]}
            label="所属区域">
            <Select placeholder="请选择">
              {areas?.map(area => (
                <Select.Option key={area.id} value={area.id}>{area.title}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="category_id"
            {...itemLayout}
            rules={[{ required: true, message: '不能为空' }]}
            label="类型">
            <Select placeholder="请选择">
              {categories?.map(category => (
                <Select.Option key={category.id} value={category.id}>{category.title}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="building"
            {...itemLayout}
            rules={[{ required: true, message: '不能为空' }]}
            label="楼号">
            <Input placeholder="楼号" />
          </Form.Item>
          <Form.Item
            name="unit"
            {...itemLayout}
            rules={[{ required: true, message: '不能为空' }]}
            label="楼号">
            <Input placeholder="单元" />
          </Form.Item>
          <Form.Item
            name="title"
            {...itemLayout}
            rules={[{ required: true, message: '不能为空' }]}
            label="房间号">
            <Input placeholder="房间号" />
          </Form.Item>
          <Form.Item
            name="number"
            {...itemLayout}
            rules={[{ required: true, message: '不能为空' }]}
            label="房间人数">
            <InputNumber placeholder="房间人数" />
          </Form.Item>
          <Form.Item
            name="charge_rule_id"
            {...itemLayout}
            label="默认收费规则">
            <Select placeholder="请选择">
              <Select.Option value={0}>无</Select.Option>
              {rules?.map(rule => (
                <Select.Option key={rule.id} value={rule.id}>{rule.title}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="remark"
            {...itemLayout}
            label="备注">
            <Input.TextArea placeholder="备注" />
          </Form.Item>
        </Form>
      </Spin>
    </Modal >
  )
}

export default connect()(RoomEditModal)
