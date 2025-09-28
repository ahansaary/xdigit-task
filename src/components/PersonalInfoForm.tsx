import {zodResolver} from '@hookform/resolvers/zod'
import {DatePicker, Form, Input, Select} from 'antd'
import dayjs from 'dayjs'
import {Controller, useForm} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import type z from 'zod'
import {useAppDispatch, useAppSelector} from '../store'
import {nextStep, setPersonalInfo} from '../store/formSlice'
import {personalInfoSchema} from '../utils/validation'
import ErrorBoundary from './ErrorBoundary'
import StepsNavigator from './StepsNavigator'

const {Option} = Select

type FormValues = z.infer<typeof personalInfoSchema>

export default function PersonalInfoForm() {
  const dispatch = useAppDispatch()
  const {t} = useTranslation()

  const defaultValues = useAppSelector(
    state => state.form.data.personalInfo
  ) as FormValues

  const {
    control,
    handleSubmit,
    watch,
    formState: {errors}
  } = useForm<FormValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues
  })

  const {dateOfBirth} = watch()

  const onSubmit = (data: FormValues) => {
    dispatch(setPersonalInfo(data))
    dispatch(nextStep())
  }

  return (
    <ErrorBoundary>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-2 gap-4">
          <Form.Item
            label={t('personalInfo.fullName')}
            validateStatus={errors.fullName ? 'error' : ''}
            help={errors.fullName?.message}
            htmlFor="fullName">
            <Controller
              name="fullName"
              control={control}
              render={({field}) => (
                <Input
                  {...field}
                  id="fullName"
                  aria-label={t('personalInfo.fullName')}
                  aria-invalid={!!errors.fullName}
                  aria-describedby="fullName-error"
                />
              )}
            />
          </Form.Item>
          <Form.Item
            label={t('personalInfo.nationalId')}
            validateStatus={errors.nationalId ? 'error' : ''}
            help={errors.nationalId?.message}
            htmlFor="nationalId">
            <Controller
              name="nationalId"
              control={control}
              render={({field}) => (
                <Input
                  {...field}
                  id="nationalId"
                  aria-label={t('personalInfo.nationalId')}
                  aria-invalid={!!errors.nationalId}
                  aria-describedby="nationalId-error"
                />
              )}
            />
          </Form.Item>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Form.Item
            label={t('personalInfo.dateOfBirth')}
            validateStatus={errors.dateOfBirth ? 'error' : ''}
            help={errors.dateOfBirth?.message}
            htmlFor="dateOfBirth">
            <Controller
              name="dateOfBirth"
              control={control}
              render={({field}) => (
                <DatePicker
                  {...field}
                  id="dateOfBirth"
                  style={{width: '100%'}}
                  format="YYYY-MM-DD"
                  value={
                    dateOfBirth ? dayjs(dateOfBirth, 'YYYY-MM-DD') : undefined
                  }
                  onChange={date => {
                    field.onChange(date ? dayjs(date).format('YYYY-MM-DD') : '')
                  }}
                  aria-label={t('personalInfo.dateOfBirth')}
                  aria-invalid={!!errors.dateOfBirth}
                  aria-describedby="dateOfBirth-error"
                />
              )}
            />
          </Form.Item>
          <Form.Item
            label={t('personalInfo.gender')}
            validateStatus={errors.gender ? 'error' : ''}
            help={errors.gender?.message}
            htmlFor="gender">
            <Controller
              name="gender"
              control={control}
              render={({field}) => (
                <Select
                  {...field}
                  id="gender"
                  style={{width: '100%'}}
                  aria-label={t('personalInfo.gender')}
                  aria-invalid={!!errors.gender}
                  aria-describedby="gender-error">
                  <Option value="male">{t('personalInfo.genderMale')}</Option>
                  <Option value="female">
                    {t('personalInfo.genderFemale')}
                  </Option>
                  <Option value="other">{t('personalInfo.genderOther')}</Option>
                </Select>
              )}
            />
          </Form.Item>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Form.Item
            label={t('personalInfo.phoneNumber')}
            validateStatus={errors.phoneNumber ? 'error' : ''}
            help={errors.phoneNumber?.message}
            htmlFor="phoneNumber">
            <Controller
              name="phoneNumber"
              control={control}
              render={({field}) => (
                <Input
                  {...field}
                  id="phoneNumber"
                  aria-label={t('personalInfo.phoneNumber')}
                  aria-invalid={!!errors.phoneNumber}
                  aria-describedby="phoneNumber-error"
                />
              )}
            />
          </Form.Item>
          <Form.Item
            label={t('personalInfo.email')}
            validateStatus={errors.email ? 'error' : ''}
            help={errors.email?.message}
            htmlFor="email">
            <Controller
              name="email"
              control={control}
              render={({field}) => (
                <Input
                  {...field}
                  id="email"
                  aria-label={t('personalInfo.email')}
                  aria-invalid={!!errors.email}
                  aria-describedby="email-error"
                />
              )}
            />
          </Form.Item>
        </div>

        <Form.Item
          label={t('personalInfo.address')}
          validateStatus={errors.address ? 'error' : ''}
          help={errors.address?.message}
          htmlFor="address">
          <Controller
            name="address"
            control={control}
            render={({field}) => (
              <Input
                {...field}
                id="address"
                aria-label={t('personalInfo.address')}
                aria-invalid={!!errors.address}
                aria-describedby="address-error"
              />
            )}
          />
        </Form.Item>

        <div className="grid md:grid-cols-3 gap-4">
          <Form.Item
            label={t('personalInfo.city')}
            validateStatus={errors.city ? 'error' : ''}
            help={errors.city?.message}
            htmlFor="city">
            <Controller
              name="city"
              control={control}
              render={({field}) => (
                <Input
                  {...field}
                  id="city"
                  aria-label={t('personalInfo.city')}
                  aria-invalid={!!errors.city}
                  aria-describedby="city-error"
                />
              )}
            />
          </Form.Item>
          <Form.Item
            label={t('personalInfo.state')}
            validateStatus={errors.state ? 'error' : ''}
            help={errors.state?.message}
            htmlFor="state">
            <Controller
              name="state"
              control={control}
              render={({field}) => (
                <Input
                  {...field}
                  id="state"
                  aria-label={t('personalInfo.state')}
                  aria-invalid={!!errors.state}
                  aria-describedby="state-error"
                />
              )}
            />
          </Form.Item>
          <Form.Item
            label={t('personalInfo.country')}
            validateStatus={errors.country ? 'error' : ''}
            help={errors.country?.message}
            htmlFor="country">
            <Controller
              name="country"
              control={control}
              render={({field}) => (
                <Input
                  {...field}
                  id="country"
                  aria-label={t('personalInfo.country')}
                  aria-invalid={!!errors.country}
                  aria-describedby="country-error"
                />
              )}
            />
          </Form.Item>
        </div>

        <Form.Item>
          <StepsNavigator />
        </Form.Item>
      </Form>
    </ErrorBoundary>
  )
}
