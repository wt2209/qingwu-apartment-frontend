import React from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import { Tabs, Card } from 'antd'
import { HomeOutlined, PayCircleOutlined, ToolOutlined } from '@ant-design/icons'
import LivingStatistic from './components/LivingStatistic'

const Statistics = () => {
  return (
    <PageHeaderWrapper>
      <Card>
        <Tabs>
          <Tabs.TabPane
            tab={
              <span>
                <HomeOutlined />
                居住统计
              </span>
            }
            key="living"
          >
            <LivingStatistic />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span>
                <PayCircleOutlined />
                费用统计
              </span>
            }
            key="bill"
          >
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
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
