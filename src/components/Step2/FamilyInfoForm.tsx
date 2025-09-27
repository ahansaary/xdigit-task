import {zodResolver} from '@hookform/resolvers/zod'
import {Form, Input, InputNumber, Select} from 'antd'
import React from 'react'
import {Controller, useForm} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {useDispatch} from 'react-redux'
import {saveFamilyInfo} from '../../store/formSlice'
import {familyInfoSchema} from '../../utils/validation'

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
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <Form.Item
        label={t('familyInfo.maritalStatus')}
        validateStatus={errors.maritalStatus ? 'error' : ''}
        help={errors.maritalStatus?.message}>
        <Controller
          name="maritalStatus"
          control={control}
          render={({field}) => (
            <Select {...field} style={{width: '100%'}}>
              <Option value="single">{t('familyInfo.single')}</Option>
              <Option value="married">{t('familyInfo.married')}</Option>
              <Option value="divorced">{t('familyInfo.divorced')}</Option>
              <Option value="widowed">{t('familyInfo.widowed')}</Option>
            </Select>
          )}
        />
      </Form.Item>
      <Form.Item
        label={t('familyInfo.dependents')}
        validateStatus={errors.dependents ? 'error' : ''}
        help={errors.dependents?.message}>
        <Controller
          name="dependents"
          control={control}
          render={({field}) => (
            <InputNumber {...field} min={0} style={{width: '100%'}} />
          )}
        />
      </Form.Item>
      <Form.Item
        label={t('familyInfo.employmentStatus')}
        validateStatus={errors.employmentStatus ? 'error' : ''}
        help={errors.employmentStatus?.message}>
        <Controller
          name="employmentStatus"
          control={control}
          render={({field}) => (
            <Select {...field} style={{width: '100%'}}>
              <Option value="employed">{t('familyInfo.employed')}</Option>
              <Option value="unemployed">{t('familyInfo.unemployed')}</Option>
              <Option value="retired">{t('familyInfo.retired')}</Option>
              <Option value="student">{t('familyInfo.student')}</Option>
            </Select>
          )}
        />
      </Form.Item>
      <Form.Item
        label={t('familyInfo.monthlyIncome')}
        validateStatus={errors.monthlyIncome ? 'error' : ''}
        help={errors.monthlyIncome?.message}>
        <Controller
          name="monthlyIncome"
          control={control}
          render={({field}) => (
            <InputNumber {...field} min={0} style={{width: '100%'}} />
          )}
        />
      </Form.Item>
      <Form.Item
        label={t('familyInfo.housingStatus')}
        validateStatus={errors.housingStatus ? 'error' : ''}
        help={errors.housingStatus?.message}>
        <Controller
          name="housingStatus"
          control={control}
          render={({field}) => <Input {...field} />}
        />
      </Form.Item>
    </Form>
  )
}

export default FamilyInfoForm
