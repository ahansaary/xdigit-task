import {I18nextProvider} from 'react-i18next'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import ErrorBoundary from './components/common/ErrorBoundary'
import FormWizard from './components/FormWizard'
import i18n from './i18n'
import {persistor, store} from './store'

const App = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <I18nextProvider i18n={i18n}>
            <FormWizard />
          </I18nextProvider>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  )
}

export default App
