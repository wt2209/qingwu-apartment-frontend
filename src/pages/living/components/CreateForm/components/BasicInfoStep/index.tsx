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

  console.log(room)
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
      <Form.Item {...itemLayout} label="类型" name="category_id">
        <Select placeholder="请选择">
          {categories?.map(category =>
            <Select.Option key={category.id} value={category.id}>{category.title}</Select.Option>
          )}
        </Select>
      </Form.Item>

      {renderContent()}

    </Fragment>
  )
}


export default BasicInfo;
