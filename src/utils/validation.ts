import {z} from 'zod'

export const personalInfoSchema = z.object({
  fullName: z.string().min(2),
  nationalId: z.string().min(8),
  dateOfBirth: z.string(),
  gender: z.string(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  phoneNumber: z.string(),
  email: z.email()
})

export const familyInfoSchema = z.object({
  maritalStatus: z.string(),
  dependents: z.number().min(0),
  employmentStatus: z.string(),
  monthlyIncome: z.number().min(0),
  housingStatus: z.string()
})

export const situationSchema = z.object({
  financialSituation: z.string().max(1000),
  employmentCircumstances: z.string().max(1000),
  reasonForApplying: z.string().max(1000)
})
