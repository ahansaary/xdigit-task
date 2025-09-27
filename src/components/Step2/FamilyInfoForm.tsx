import {zodResolver} from '@hookform/resolvers/zod'
import {Form, InputNumber, Select} from 'antd'
import React from 'react'
import {Controller, useForm} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {useDispatch} from 'react-redux'
import {saveFamilyInfo} from '../../store/formSlice'
import {familyInfoSchema} from '../../utils/validation'
import ErrorBoundary from '../common/ErrorBoundary'

const {Option} = Select

export type FamilyInfoFormValues = {
  maritalStatus: string
  dependents: number
  employmentStatus: string
  monthlyIncome: number
  housingStatus: string
}

const FamilyInfoForm: React.FC<{onNext: () => void}> = ({onNext}) => {
  const {t} = useTranslation()
  const dispatch = useDispatch()

  const {
    control,
    handleSubmit,
    formState: {errors}
  } = useForm<FamilyInfoFormValues>({
    resolver: zodResolver(familyInfoSchema),
    mode: 'onChange'
  })

  const onSubmit = (data: FamilyInfoFormValues) => {
    dispatch(saveFamilyInfo(data))
    onNext()
  }

  return (
    <ErrorBoundary>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item
          label={t('familyInfo.maritalStatus')}
          validateStatus={errors.maritalStatus ? 'error' : ''}
          help={errors.maritalStatus?.message}
          htmlFor="maritalStatus">
          <Controller
            name="maritalStatus"
            control={control}
            render={({field}) => (
              <Select
                {...field}
                id="maritalStatus"
                style={{width: '100%'}}
                aria-label={t('familyInfo.maritalStatus')}
                aria-invalid={!!errors.maritalStatus}
                aria-describedby="maritalStatus-error"
                placeholder={t('familyInfo.maritalStatus')}>
                <Option value="single">
                  {t('familyInfo.maritalStatusSingle')}
                </Option>
                <Option value="married">
                  {t('familyInfo.maritalStatusMarried')}
                </Option>
                <Option value="divorced">
                  {t('familyInfo.maritalStatusDivorced')}
                </Option>
                <Option value="widowed">
                  {t('familyInfo.maritalStatusWidowed')}
                </Option>
              </Select>
            )}
          />
        </Form.Item>
        <Form.Item
          label={t('familyInfo.dependents')}
          validateStatus={errors.dependents ? 'error' : ''}
          help={errors.dependents?.message}
          htmlFor="dependents">
          <Controller
            name="dependents"
            control={control}
            render={({field}) => (
              <InputNumber
                {...field}
                id="dependents"
                min={0}
                style={{width: '100%'}}
                aria-label={t('familyInfo.dependents')}
                aria-invalid={!!errors.dependents}
                aria-describedby="dependents-error"
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label={t('familyInfo.employmentStatus')}
          validateStatus={errors.employmentStatus ? 'error' : ''}
          help={errors.employmentStatus?.message}
          htmlFor="employmentStatus">
          <Controller
            name="employmentStatus"
            control={control}
            render={({field}) => (
              <Select
                {...field}
                id="employmentStatus"
                style={{width: '100%'}}
                aria-label={t('familyInfo.employmentStatus')}
                aria-invalid={!!errors.employmentStatus}
                aria-describedby="employmentStatus-error"
                placeholder={t('familyInfo.employmentStatus')}>
                <Option value="employed">
                  {t('familyInfo.employmentStatusEmployed')}
                </Option>
                <Option value="unemployed">
                  {t('familyInfo.employmentStatusUnemployed')}
                </Option>
                <Option value="student">
                  {t('familyInfo.employmentStatusStudent')}
                </Option>
                <Option value="retired">
                  {t('familyInfo.employmentStatusRetired')}
                </Option>
              </Select>
            )}
          />
        </Form.Item>
        <Form.Item
          label={t('familyInfo.monthlyIncome')}
          validateStatus={errors.monthlyIncome ? 'error' : ''}
          help={errors.monthlyIncome?.message}
          htmlFor="monthlyIncome">
          <Controller
            name="monthlyIncome"
            control={control}
            render={({field}) => (
              <InputNumber
                {...field}
                id="monthlyIncome"
                min={0}
                style={{width: '100%'}}
                aria-label={t('familyInfo.monthlyIncome')}
                aria-invalid={!!errors.monthlyIncome}
                aria-describedby="monthlyIncome-error"
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label={t('familyInfo.housingStatus')}
          validateStatus={errors.housingStatus ? 'error' : ''}
          help={errors.housingStatus?.message}
          htmlFor="housingStatus">
          <Controller
            name="housingStatus"
            control={control}
            render={({field}) => (
              <Select
                {...field}
                id="housingStatus"
                aria-label={t('familyInfo.housingStatus')}
                aria-invalid={!!errors.housingStatus}
                aria-describedby="housingStatus-error"
                placeholder={t('familyInfo.housingStatus')}>
                <Select.Option value="Own">
                  {t('familyInfo.housingStatusOwn')}
                </Select.Option>
                <Select.Option value="Rent">
                  {t('familyInfo.housingStatusRent')}
                </Select.Option>
                <Select.Option value="Family">
                  {t('familyInfo.housingStatusFamily')}
                </Select.Option>
                <Select.Option value="Other">
                  {t('familyInfo.housingStatusOther')}
                </Select.Option>
              </Select>
            )}
          />
        </Form.Item>
      </Form>
    </ErrorBoundary>
  )
}

export default FamilyInfoForm
