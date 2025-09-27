import {zodResolver} from '@hookform/resolvers/zod'
import {Form, Input, Spin, message} from 'antd'
import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {useDispatch} from 'react-redux'
import {generateSituationText} from '../../services/gptService'
import {saveSituation} from '../../store/formSlice'
import {situationSchema} from '../../utils/validation'
import ErrorBoundary from '../common/ErrorBoundary'
import HelpMeWriteButton from '../common/HelpMeWriteButton'

export type SituationFormValues = {
  financialSituation: string
  employmentCircumstances: string
  reasonForApplying: string
}

const SituationForm = () => {
  const dispatch = useDispatch()
  const {t} = useTranslation()
  const [loadingField, setLoadingField] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
    watch
  } = useForm<SituationFormValues>({
    resolver: zodResolver(situationSchema)
  })

  const onSubmit = async (data: SituationFormValues) => {
    try {
      setError(null)
      dispatch(saveSituation(data))
      message.success(t('messages.situationSaved'))
    } catch (err) {
      setError(t('messages.apiError'))
    }
  }

  const handleHelpMeWrite = async (field: keyof SituationFormValues) => {
    setLoadingField(field)
    setError(null)
    try {
      const prompt = watch(field)
      const suggestion = await generateSituationText(prompt)
      setValue(field, suggestion)
    } catch (err) {
      setError(t('messages.gptError'))
    } finally {
      setLoadingField(null)
    }
  }

  return (
    <ErrorBoundary>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item
          label={t('situation.financialSituation')}
          validateStatus={errors.financialSituation ? 'error' : ''}
          help={errors.financialSituation?.message}
          htmlFor="financialSituation">
          <Input.TextArea
            id="financialSituation"
            rows={3}
            {...register('financialSituation')}
            aria-label={t('situation.financialSituation')}
            aria-invalid={!!errors.financialSituation}
            aria-describedby="financialSituation-error"
          />
          {loadingField === 'financialSituation' ? (
            <Spin size="small" style={{marginTop: 8}} />
          ) : (
            <HelpMeWriteButton
              onClick={() => handleHelpMeWrite('financialSituation')}
            />
          )}
        </Form.Item>
        <Form.Item
          label={t('situation.employmentCircumstances')}
          validateStatus={errors.employmentCircumstances ? 'error' : ''}
          help={errors.employmentCircumstances?.message}
          htmlFor="employmentCircumstances">
          <Input.TextArea
            id="employmentCircumstances"
            rows={3}
            {...register('employmentCircumstances')}
            aria-label={t('situation.employmentCircumstances')}
            aria-invalid={!!errors.employmentCircumstances}
            aria-describedby="employmentCircumstances-error"
          />
          {loadingField === 'employmentCircumstances' ? (
            <Spin size="small" style={{marginTop: 8}} />
          ) : (
            <HelpMeWriteButton
              onClick={() => handleHelpMeWrite('employmentCircumstances')}
            />
          )}
        </Form.Item>
        <Form.Item
          label={t('situation.reasonForApplying')}
          validateStatus={errors.reasonForApplying ? 'error' : ''}
          help={errors.reasonForApplying?.message}
          htmlFor="reasonForApplying">
          <Input.TextArea
            id="reasonForApplying"
            rows={3}
            {...register('reasonForApplying')}
            aria-label={t('situation.reasonForApplying')}
            aria-invalid={!!errors.reasonForApplying}
            aria-describedby="reasonForApplying-error"
          />
          {loadingField === 'reasonForApplying' ? (
            <Spin size="small" style={{marginTop: 8}} />
          ) : (
            <HelpMeWriteButton
              onClick={() => handleHelpMeWrite('reasonForApplying')}
            />
          )}
        </Form.Item>
        {error && <div style={{color: 'red', marginBottom: 8}}>{error}</div>}
      </Form>
    </ErrorBoundary>
  )
}

export default SituationForm
