import {useTranslation} from 'react-i18next'
import FamilyInfoForm from '../components/FamilyInfoForm'
import PersonalInfoForm from '../components/PersonalInfoForm'
import SituationForm from '../components/SituationForm'
import {useAppSelector} from '../store'

export default function useSteps() {
  const current = useAppSelector(state => state.form.step) as number
  const {t} = useTranslation()

  const steps = [
    {
      title: t('personalInfo.title'),
      content: <PersonalInfoForm />
    },
    {
      title: t('familyInfo.title'),
      content: <FamilyInfoForm />
    },
    {
      title: t('situation.title'),
      content: <SituationForm />
    }
  ]

  const currentStep = steps[current]

  return {steps, current, currentStep}
}
