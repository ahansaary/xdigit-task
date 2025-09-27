import {Button, Space} from 'antd'
import {useTranslation} from 'react-i18next'
import useSteps from '../hooks/steps'
import {useAppDispatch} from '../store'
import {prevStep} from '../store/formSlice'

export default function StepsNavigator() {
  const {steps, current} = useSteps()
  const dispatch = useAppDispatch()
  const {t} = useTranslation()

  const prev = () => dispatch(prevStep())

  return (
    <Space>
      <Button disabled={current === 0} onClick={prev}>
        {t('buttons.previous')}
      </Button>
      {current < steps.length - 1 ? (
        <Button type="primary" htmlType="submit">
          {t('buttons.next')}
        </Button>
      ) : (
        <Button type="primary" htmlType="submit">
          {t('buttons.saveAndExit')}
        </Button>
      )}
    </Space>
  )
}
