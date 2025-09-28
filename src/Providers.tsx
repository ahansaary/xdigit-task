import {ConfigProvider} from 'antd'
import arEG from 'antd/locale/ar_EG'
import enUS from 'antd/locale/en_US'
import {useEffect, type PropsWithChildren} from 'react'
import {I18nextProvider, useTranslation} from 'react-i18next'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import i18n from './i18n'
import {persistor, store} from './store'

export default function Providers({children}: PropsWithChildren) {
  const {
    i18n: {language}
  } = useTranslation()
  const isArabic = language === 'ar'

  useEffect(() => {
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr'
    document.body.style.fontFamily = isArabic ? 'Almarai, sans-serif' : ''
  }, [isArabic])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <I18nextProvider i18n={i18n}>
          <ConfigProvider locale={isArabic ? arEG : enUS}>
            {children}
          </ConfigProvider>
        </I18nextProvider>
      </PersistGate>
    </Provider>
  )
}
