import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  personalInfo: {},
  familyInfo: {},
  situation: {}
}

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    savePersonalInfo(state, action) {
      state.personalInfo = action.payload
    },
    saveFamilyInfo(state, action) {
      state.familyInfo = action.payload
    },
    saveSituation(state, action) {
      state.situation = action.payload
    }
  }
})

export default formSlice.reducer
export const {savePersonalInfo, saveFamilyInfo, saveSituation} =
  formSlice.actions
