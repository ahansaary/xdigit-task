import {Layout} from 'antd'

const {Footer} = Layout

const AppFooter = () => (
  <Footer
    style={{textAlign: 'center', background: '#fff', padding: '12px 24px'}}>
    &copy; {new Date().getFullYear()} xdigit.ai. All rights reserved.
  </Footer>
)

export default AppFooter
