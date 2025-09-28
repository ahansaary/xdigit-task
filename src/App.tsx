import {Layout} from 'antd'
import {useEffect} from 'react'
import {I18nextProvider, useTranslation} from 'react-i18next'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import ErrorBoundary from './components/ErrorBoundary'
import AppFooter from './components/Footer'
import FormWizard from './components/FormWizard'
import AppHeader from './components/Header'
import i18n from './i18n'
import {persistor, store} from './store'

export default function App() {
  const {
    i18n: {language}
  } = useTranslation()
  const isArabic = language === 'ar'

  useEffect(() => {
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr'
    document.body.style.fontFamily = isArabic ? 'Almarai, sans-serif' : ''
  }, [isArabic])

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <I18nextProvider i18n={i18n}>
            <Layout style={{minHeight: '100vh'}}>
              <AppHeader />
              <Layout.Content className="py-8">
                <FormWizard />
              </Layout.Content>
              <AppFooter />
            </Layout>
          </I18nextProvider>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  )
}
