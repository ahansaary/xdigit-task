import {zodResolver} from '@hookform/resolvers/zod'
import {DatePicker, Form, Input, Select} from 'antd'
import dayjs from 'dayjs'
import React from 'react'
import {Controller, useForm} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {useDispatch} from 'react-redux'
import {savePersonalInfo} from '../../store/formSlice'
import {personalInfoSchema} from '../../utils/validation'

const {Option} = Select

export type PersonalInfoFormValues = {
  fullName: string
  nationalId: string
  dateOfBirth: string
  gender: string
  address: string
  city: string
  state: string
  country: string
  phoneNumber: string
  email: string
}

const PersonalInfoForm: React.FC<{onNext: () => void}> = ({onNext}) => {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const {
    control,
    handleSubmit,
    watch,
    formState: {errors}
  } = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    mode: 'onChange'
  })

  const {dateOfBirth} = watch()

  const onSubmit = (data: PersonalInfoFormValues) => {
    dispatch(savePersonalInfo(data))
    onNext()
  }

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <Form.Item
        label={t('personalInfo.fullName')}
        validateStatus={errors.fullName ? 'error' : ''}
        help={errors.fullName?.message}>
        <Controller
          name="fullName"
          control={control}
          render={({field}) => <Input {...field} />}
        />
      </Form.Item>
      <Form.Item
        label={t('personalInfo.nationalId')}
        validateStatus={errors.nationalId ? 'error' : ''}
        help={errors.nationalId?.message}>
        <Controller
          name="nationalId"
          control={control}
          render={({field}) => <Input {...field} />}
        />
      </Form.Item>
      <Form.Item
        label={t('personalInfo.dateOfBirth')}
        validateStatus={errors.dateOfBirth ? 'error' : ''}
        help={errors.dateOfBirth?.message}>
        <Controller
          name="dateOfBirth"
          control={control}
          render={({field}) => (
            <DatePicker
              {...field}
              style={{width: '100%'}}
              format="YYYY-MM-DD"
              value={dateOfBirth ? dayjs(dateOfBirth, 'YYYY-MM-DD') : undefined}
              onChange={date => {
                field.onChange(date ? dayjs(date).format('YYYY-MM-DD') : '')
              }}
            />
          )}
        />
      </Form.Item>
      <Form.Item
        label={t('personalInfo.gender')}
        validateStatus={errors.gender ? 'error' : ''}
        help={errors.gender?.message}>
        <Controller
          name="gender"
          control={control}
          render={({field}) => (
            <Select {...field} style={{width: '100%'}}>
              <Option value="male">{t('personalInfo.male')}</Option>
              <Option value="female">{t('personalInfo.female')}</Option>
              <Option value="other">{t('personalInfo.other')}</Option>
            </Select>
          )}
        />
      </Form.Item>
      <Form.Item
        label={t('personalInfo.address')}
        validateStatus={errors.address ? 'error' : ''}
        help={errors.address?.message}>
        <Controller
          name="address"
          control={control}
          render={({field}) => <Input {...field} />}
        />
      </Form.Item>
      <Form.Item
        label={t('personalInfo.city')}
        validateStatus={errors.city ? 'error' : ''}
        help={errors.city?.message}>
        <Controller
          name="city"
          control={control}
          render={({field}) => <Input {...field} />}
        />
      </Form.Item>
      <Form.Item
        label={t('personalInfo.state')}
        validateStatus={errors.state ? 'error' : ''}
        help={errors.state?.message}>
        <Controller
          name="state"
          control={control}
          render={({field}) => <Input {...field} />}
        />
      </Form.Item>
      <Form.Item
        label={t('personalInfo.country')}
        validateStatus={errors.country ? 'error' : ''}
        help={errors.country?.message}>
        <Controller
          name="country"
          control={control}
          render={({field}) => <Input {...field} />}
        />
      </Form.Item>
      <Form.Item
        label={t('personalInfo.phoneNumber')}
        validateStatus={errors.phoneNumber ? 'error' : ''}
        help={errors.phoneNumber?.message}>
        <Controller
          name="phoneNumber"
          control={control}
          render={({field}) => <Input {...field} />}
        />
      </Form.Item>
      <Form.Item
        label={t('personalInfo.email')}
        validateStatus={errors.email ? 'error' : ''}
        help={errors.email?.message}>
        <Controller
          name="email"
          control={control}
          render={({field}) => <Input {...field} />}
        />
      </Form.Item>
    </Form>
  )
}

export default PersonalInfoForm
