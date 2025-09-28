import {Layout} from 'antd'
import ErrorBoundary from './components/ErrorBoundary'
import AppFooter from './components/Footer'
import FormWizard from './components/FormWizard'
import AppHeader from './components/Header'
import Providers from './Providers'

export default function App() {
  return (
    <Providers>
      <ErrorBoundary>
        <Layout style={{minHeight: '100vh'}}>
          <AppHeader />
          <Layout.Content className="py-8">
            <FormWizard />
          </Layout.Content>
          <AppFooter />
        </Layout>
      </ErrorBoundary>
    </Providers>
  )
}
