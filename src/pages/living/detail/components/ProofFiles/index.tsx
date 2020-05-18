import React from 'react'
import { FileOutlined } from '@ant-design/icons'
import { Divider, Avatar, List } from 'antd'
import { UploadFile } from 'antd/es/upload/interface'
import styles from '../../style.less'

interface Props {
  files?: UploadFile<any>[];
}

const ProofFiles = (props: Props) => {
  const { files } = props
  if (files && files.length > 0) {
    return (
      <>
        <Divider style={{ marginBottom: 32 }} />
        <div className={styles.title}>入住凭证</div>
        <List
          itemLayout="horizontal"
          dataSource={files}
          renderItem={item => (
            <List.Item style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: 70 }}>
                <Avatar style={{ backgroundColor: 'white', color: '#40a9ff' }}
                  shape="square"
                  size="large"
                  icon={<FileOutlined />}
                  src={item.url} />
              </div>
              <div style={{ flex: 1, lineHeight: '24px' }}>
                <a href={item.url} target="blank">{item.name}</a>
              </div>
            </List.Item>
          )}
        />
      </>
    )
  }
  return null
}

export default ProofFiles
