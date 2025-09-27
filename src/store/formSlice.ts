import {createSlice, type PayloadAction} from '@reduxjs/toolkit'
import type z from 'zod'
import type {
  familyInfoSchema,
  personalInfoSchema,
  situationSchema
} from '../utils/validation'

export interface FormState {
  step: number
  data: {
    personalInfo: z.infer<typeof personalInfoSchema>
    familyInfo: z.infer<typeof familyInfoSchema>
    situation: z.infer<typeof situationSchema>
  }
}

const initialState: FormState = {
  step: 1,
  data: {
    personalInfo: {
      fullName: '',
      nationalId: '',
      dateOfBirth: '',
      gender: '',
      address: '',
      city: '',
      state: '',
      country: '',
      phoneNumber: '',
      email: ''
    },
    familyInfo: {
      maritalStatus: '',
      dependents: 0,
      employmentStatus: '',
      monthlyIncome: 0,
      housingStatus: ''
    },
    situation: {
      financialSituation: '',
      employmentCircumstances: '',
      reasonForApplying: ''
    }
  }
}

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<number>) {
      state.step = action.payload
    },
    setPersonalInfo(
      state,
      action: PayloadAction<FormState['data']['personalInfo']>
    ) {
      state.data.personalInfo = action.payload
    },
    setFamilyInfo(
      state,
      action: PayloadAction<FormState['data']['familyInfo']>
    ) {
      state.data.familyInfo = action.payload
    },
    setSituation(state, action: PayloadAction<FormState['data']['situation']>) {
      state.data.situation = action.payload
    },
    resetForm() {
      return initialState
    }
  }
})

export const {
  setStep,
  setPersonalInfo,
  setFamilyInfo,
  setSituation,
  resetForm
} = formSlice.actions

export default formSlice.reducer
