import React, { Fragment } from "react"
import { Select, Form } from "antd"
import PersonFormItems from "../PersonFormItems"
import CompanyFormItems from "../CompanyFormItems";
import { RoomListItem } from "@/pages/room/data";
import { CategoryListItem } from "@/pages/categories/data";



interface Props {
  room: RoomListItem | undefined;
  categories: CategoryListItem[] | undefined;
  itemLayout: any;
}

const BasicInfo = (props: Props) => {
  const { room, categories, itemLayout } = props

  const renderContent = () => {
    switch (room?.category.type) {
      case 'person':
        return <PersonFormItems itemLayout={itemLayout} />
      case 'company':
        return <CompanyFormItems itemLayout={itemLayout} />
      case 'functional':
        return null
      default:
        return null
    }
  }

  return (
    <Fragment>
      <Form.Item {...itemLayout} label="属于">
        {room?.category.type}
      </Form.Item>
      <Form.Item {...itemLayout} label="类型" name="category_id">
        <Select placeholder="请选择">
          {categories?.map(category =>
            <Select.Option key={category.id} value={category.id}>{category.title}</Select.Option>
          )}
        </Select>
      </Form.Item>

      {renderContent()}

    </Fragment>

    //   {/* <Fragment>
    //     <Form.Item {...itemLayout} label="公司名">
    //       {getFieldDecorator('company.companyName', {
    //         rules: [{ required: true, message: '必须输入' }],
    //       })(<Input />)}
    //     </Form.Item>
    //     <Form.Item {...itemLayout} label="负责人">
    //       {getFieldDecorator('company.manager', {
    //         rules: [{ required: true, message: '必须输入' }],
    //       })(<Input />)}
    //     </Form.Item>
    //     <Form.Item {...itemLayout} label="负责人电话">
    //       {getFieldDecorator('company.managerPhone', {
    //         rules: [],
    //       })(<Input />)}
    //     </Form.Item>
    //     <Form.Item {...itemLayout} label="日常联系人">
    //       {getFieldDecorator('company.linkman', {
    //         rules: [],
    //       })(<Input />)}
    //     </Form.Item>
    //     <Form.Item {...itemLayout} label="联系人电话">
    //       {getFieldDecorator('company.linkmanPhone', {
    //         rules: [],
    //       })(<Input />)}
    //     </Form.Item>

    //     <Form.Item {...itemLayout} label="房间入住日">
    //       {getFieldDecorator('company.enteredAt')(<DatePicker format="YYYY-MM-DD" />)}
    //     </Form.Item>
    //     <Form.Item {...itemLayout} label="公司说明">
    //       {getFieldDecorator('company.remark')(<Input />)}
    //     </Form.Item>
    //   </Fragment>
    //   )}
    //   <Form.Item {...itemLayout} label="租期">
    //     {getFieldDecorator('rentPeriod', {
    //       initialValue: data.rentStart ? [moment(data.rentStart), moment(data.rentEnd)] : null,
    //     })(<DatePicker.RangePicker format="YYYY-MM-DD" />)}
    //   </Form.Item>
    //   <Form.Item {...itemLayout} label="备注">
    //     {getFieldDecorator('remark')(<Input.TextArea />)}
    //   </Form.Item>

    //   <Form.Item style={{ textAlign: 'right' }}>
    //     <Button type="primary" htmlType="submit">
    //       下一步
    //         </Button>
    //   </Form.Item>
    //   </Form>
    // </Fragment > */}
  )
}


export default BasicInfo;
