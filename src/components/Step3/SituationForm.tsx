import {zodResolver} from '@hookform/resolvers/zod'
import {Form, Input} from 'antd'
import React from 'react'
import {Controller, useForm} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {useDispatch} from 'react-redux'
import {saveSituation} from '../../store/formSlice'
import {situationSchema} from '../../utils/validation'
import HelpMeWriteButton from '../common/HelpMeWriteButton'

export type SituationFormValues = {
  financialSituation: string
  employmentCircumstances: string
  reasonForApplying: string
}

const SituationForm: React.FC<{onNext: () => void}> = ({onNext}) => {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors}
  } = useForm<SituationFormValues>({
    resolver: zodResolver(situationSchema),
    mode: 'onChange'
  })

  const onSubmit = (data: SituationFormValues) => {
    dispatch(saveSituation(data))
    onNext()
  }

  // Handler for GPT integration
  const handleHelpMeWrite = async (field: keyof SituationFormValues) => {
    setValue(field, t('situation.gptPlaceholder'))
  }

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <Form.Item
        label={t('situation.financialSituation')}
        validateStatus={errors.financialSituation ? 'error' : ''}
        help={errors.financialSituation?.message}>
        <Controller
          name="financialSituation"
          control={control}
          render={({field}) => (
            <>
              <Input.TextArea {...field} rows={3} maxLength={500} />
              <HelpMeWriteButton
                onClick={() => handleHelpMeWrite('financialSituation')}
              />
            </>
          )}
        />
      </Form.Item>
      <Form.Item
        label={t('situation.employmentCircumstances')}
        validateStatus={errors.employmentCircumstances ? 'error' : ''}
        help={errors.employmentCircumstances?.message}>
        <Controller
          name="employmentCircumstances"
          control={control}
          render={({field}) => (
            <>
              <Input.TextArea {...field} rows={3} maxLength={500} />
              <HelpMeWriteButton
                onClick={() => handleHelpMeWrite('employmentCircumstances')}
              />
            </>
          )}
        />
      </Form.Item>
      <Form.Item
        label={t('situation.reasonForApplying')}
        validateStatus={errors.reasonForApplying ? 'error' : ''}
        help={errors.reasonForApplying?.message}>
        <Controller
          name="reasonForApplying"
          control={control}
          render={({field}) => (
            <>
              <Input.TextArea {...field} rows={3} maxLength={500} />
              <HelpMeWriteButton
                onClick={() => handleHelpMeWrite('reasonForApplying')}
              />
            </>
          )}
        />
      </Form.Item>
    </Form>
  )
}

export default SituationForm
