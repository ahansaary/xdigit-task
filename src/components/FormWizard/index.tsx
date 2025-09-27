import {Button, Card, Space} from 'antd'
import {useState} from 'react'
import {useTranslation} from 'react-i18next'
import ProgressBar from '../ProgressBar'
import PersonalInfoForm from '../Step1'
import FamilyInfoForm from '../Step2'
import SituationForm from '../Step3'

const FormWizard = () => {
  const [current, setCurrent] = useState(0)
  const {t} = useTranslation()

  const next = () => setCurrent(prev => Math.min(prev + 1, steps.length - 1))
  const prev = () => setCurrent(prev => Math.max(prev - 1, 0))

  const saveAndExit = () => {
    // TODO: Implement save and exit logic (e.g., persist state, redirect, show message)
    alert(t('messages.saveAndExit'))
  }

  const steps = [
    {
      title: t('personalInfo.title'),
      content: <PersonalInfoForm onNext={next} />
    },
    {
      title: t('familyInfo.title'),
      content: <FamilyInfoForm onNext={next} />
    },
    {
      title: t('situation.title'),
      content: <SituationForm onNext={saveAndExit} />
    }
  ]

  return (
    <div className="w-full flex justify-center py-8">
      <Card>
        <ProgressBar current={current} steps={steps.map(s => t(s.title))} />
        <div className="my-6">{steps[current].content}</div>
        <Space>
          <Button disabled={current === 0} onClick={prev}>
            {t('buttons.previous')}
          </Button>
          {current < steps.length - 1 ? (
            <Button type="primary" onClick={next}>
              {t('buttons.next')}
            </Button>
          ) : (
            <Button type="primary" onClick={saveAndExit}>
              {t('buttons.saveAndExit')}
            </Button>
          )}
        </Space>
      </Card>
    </div>
  )
}

export default FormWizard
