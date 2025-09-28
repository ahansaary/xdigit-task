import {zodResolver} from '@hookform/resolvers/zod'
import {Button, Form, Input, message, Modal, Spin} from 'antd'
import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import type z from 'zod'
import {generateSituationText} from '../services/gptService'
import {useAppDispatch, useAppSelector} from '../store'
import {setSituation} from '../store/formSlice'
import {situationSchema} from '../utils/validation'
import ErrorBoundary from './ErrorBoundary'
import HelpMeWriteButton from './HelpMeWriteButton'
import StepsNavigator from './StepsNavigator'

type FormValues = z.infer<typeof situationSchema>

export default function SituationForm() {
  const dispatch = useAppDispatch()
  const {t} = useTranslation()
  const [loadingField, setLoadingField] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [suggestion, setSuggestion] = useState<string>('')
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [modalField, setModalField] = useState<keyof FormValues | null>(null)
  const [editValue, setEditValue] = useState<string>('')

  const defaultValues = useAppSelector(
    state => state.form?.data?.situation
  ) as FormValues

  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
    watch
  } = useForm<FormValues>({
    resolver: zodResolver(situationSchema),
    defaultValues
  })

  const onSubmit = async (data: FormValues) => {
    try {
      setError(null)
      dispatch(setSituation(data))
      message.success(t('messages.situationSaved'))
    } catch (err) {
      setError(t('messages.apiError'))
    }
  }

  const handleHelpMeWrite = async (field: keyof FormValues) => {
    setLoadingField(field)
    setError(null)
    try {
      const prompt = watch(field)
      const suggestionText = await generateSituationText(prompt)
      setSuggestion(suggestionText)
      setEditValue(suggestionText)
      setModalField(field)
      setModalOpen(true)
    } catch (err: any) {
      setError(err.message || t('messages.gptError'))
    } finally {
      setLoadingField(null)
    }
  }

  const handleAccept = () => {
    if (modalField) {
      setValue(modalField, editValue)
      setModalOpen(false)
      setSuggestion('')
      setModalField(null)
    }
  }

  const handleDiscard = () => {
    setModalOpen(false)
    setSuggestion('')
    setModalField(null)
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
        <Form.Item>
          <StepsNavigator />
        </Form.Item>
      </Form>
      <Modal
        open={modalOpen}
        title={t('buttons.helpMeWrite')}
        onCancel={handleDiscard}
        footer={[
          <Button key="accept" type="primary" onClick={handleAccept}>
            {t('buttons.accept', 'Accept')}
          </Button>,
          <Button key="edit" onClick={() => setEditValue(editValue)}>
            {t('buttons.edit', 'Edit')}
          </Button>,
          <Button key="discard" danger onClick={handleDiscard}>
            {t('buttons.discard', 'Discard')}
          </Button>
        ]}>
        <Input.TextArea
          value={editValue}
          onChange={e => setEditValue(e.target.value)}
          rows={5}
        />
      </Modal>
    </ErrorBoundary>
  )
}
