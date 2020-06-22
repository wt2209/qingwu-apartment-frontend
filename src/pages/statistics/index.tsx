import React, { useEffect, useState } from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import { Tabs, Card } from 'antd'
import { HomeOutlined, PayCircleOutlined, ToolOutlined } from '@ant-design/icons'
import LivingStatistic from './components/LivingStatistic'
import BillStatistic from './components/BillStatistic'
import { getAllCategories } from '../basic/categories/service'
import { getAllAreas } from '../basic/areas/service'
import { getAllFeeTypes } from '../basic/feeTypes/service'
import { FeeTypeListItem } from '../basic/feeTypes/data'
import { AreaListItem } from '../basic/areas/data'
import { CategoryListItem } from '../basic/categories/data'

const Statistics = () => {
  const [feeTypes, setFeeTypes] = useState<FeeTypeListItem[]>()
  const [areas, setAreas] = useState<AreaListItem[]>()
  const [categories, setCategories] = useState<CategoryListItem[]>()

  useEffect(() => {
    (async () => {
      const [
        { data: allTypes },
        { data: allAreas },
        { data: allCategories },
      ] = await Promise.all([
        getAllFeeTypes(),
        getAllAreas(),
        getAllCategories(),
      ])
      setFeeTypes(allTypes)
      setAreas(allAreas)
      setCategories(allCategories)
    })()
  }, [])
  return (
    <PageHeaderWrapper title={false}>
      <Card>
        <Tabs>
          <Tabs.TabPane
            tab={
              <span>
                <PayCircleOutlined />
                费用统计
              </span>
            }
            key="bill"
          >
            <BillStatistic areas={areas} feeTypes={feeTypes} />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span>
                <HomeOutlined />
                居住统计
              </span>
            }
            key="living"
          >
            <LivingStatistic areas={areas} categories={categories} />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span>
                <ToolOutlined />
                维修统计
              </span>
            }
            key="repair"
          >
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </PageHeaderWrapper >
  )
}

export default Statistics
