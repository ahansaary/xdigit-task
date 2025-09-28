export const Provider = ({children}: any) => <>{children}</>
export const useDispatch = () => jest.fn()
export const useSelector = (selector: any) =>
  selector({
    form: {
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
  })
