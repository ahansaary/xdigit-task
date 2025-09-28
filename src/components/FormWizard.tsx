import {Card} from 'antd'
import {useTranslation} from 'react-i18next'
import useSteps from '../hooks/steps'
import ErrorBoundary from './ErrorBoundary'
import ProgressBar from './ProgressBar'

export default function FormWizard() {
  const {currentStep} = useSteps()
  const {t} = useTranslation()

  const saveAndExit = () => {
    // TODO: Implement save and exit logic (e.g., persist state, redirect, show message)
    alert(t('messages.saveAndExit'))
  }

  return (
    <ErrorBoundary>
      <div className="w-full flex justify-center py-8">
        <Card>
          <ProgressBar />
          <div className="my-6">
            {currentStep ? currentStep.content : <div>Step not found.</div>}
          </div>
        </Card>
      </div>
    </ErrorBoundary>
  )
}
