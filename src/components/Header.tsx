import {Layout, Space} from 'antd'
import LanguageSwitcher from './LanguageSwitcher'
import Logo from './Logo'

const {Header} = Layout

export default function AppHeader() {
  return (
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#fff',
        padding: '0 24px',
        boxShadow: '0 2px 8px #f0f1f2'
      }}>
      <Logo />
      <Space size="middle">
        <LanguageSwitcher />
      </Space>
    </Header>
  )
}
