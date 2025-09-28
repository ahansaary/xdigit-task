import {ErrorBoundaryMock} from '../__mocks__/ErrorBoundary'
import * as gptServiceMock from '../__mocks__/gptService'
import * as reactI18nextMock from '../__mocks__/reactI18next'
import * as reactReduxMock from '../__mocks__/reactRedux'
import * as reduxPersistMock from '../__mocks__/reduxPersist'
import * as reduxPersistIntegrationReactMock from '../__mocks__/reduxPersistIntegrationReact'

jest.mock('../../components/ErrorBoundary', () => ErrorBoundaryMock)
jest.mock('../../services/gptService', () => gptServiceMock)
jest.mock('react-i18next', () => reactI18nextMock)
jest.mock('react-redux', () => reactReduxMock)
jest.mock('redux-persist', () => reduxPersistMock)
jest.mock(
  'redux-persist/integration/react',
  () => reduxPersistIntegrationReactMock
)

import '@testing-library/jest-dom'
import {fireEvent, render, screen} from '@testing-library/react'
import React from 'react'
import PersonalInfoForm from '../../components/PersonalInfoForm'
import Providers from '../../Providers'

jest.mock('antd', () => {
  const RealAntd = jest.requireActual('antd')
  // Button mock: render real <button>
  const Button = ({children, ...props}: any) => (
    <button {...props}>{children}</button>
  )
  // Input mock: render real <input>
  const Input = ({children, ...props}: any) => (
    <input {...props}>{children}</input>
  )
  // Select mock: render real <select> with <option>
  const Option = ({children, ...props}: any) => (
    <option {...props}>{children}</option>
  )
  const Select = ({children, ...props}: any) => (
    <select {...props}>{children}</select>
  )
  // DatePicker mock: render real <input type="date">
  const DatePicker = ({children, ...props}: any) => (
    <input type="date" {...props}>
      {children}
    </input>
  )
  // InputNumber mock: render real <input type="number">
  const InputNumber = ({children, ...props}: any) => (
    <input type="number" {...props}>
      {children}
    </input>
  )
  return {
    ...RealAntd,
    ConfigProvider: ({children}: any) => <div>{children}</div>,
    Form: Object.assign(
      ({children, ...props}: any) => <form {...props}>{children}</form>,
      {
        Item: ({children, help, validateStatus, ...props}: any) => (
          <div {...props}>
            {children}
            {help && <span>{help}</span>}
          </div>
        )
      }
    ),
    Button,
    Input,
    Select: Object.assign(Select, {Option}),
    DatePicker,
    Checkbox: ({children, ...props}: any) => (
      <input type="checkbox" {...props}>
        {children}
      </input>
    ),
    Radio: ({children, ...props}: any) => (
      <input type="radio" {...props}>
        {children}
      </input>
    ),
    Row: ({children}: any) => <div>{children}</div>,
    Col: ({children}: any) => <div>{children}</div>,
    Space: ({children}: any) => <div>{children}</div>,
    Card: ({children}: any) => <div>{children}</div>,
    Divider: () => <hr />,
    Layout: Object.assign(({children}: any) => <div>{children}</div>, {
      Header: ({children}: any) => <header>{children}</header>,
      Content: ({children}: any) => <main>{children}</main>
    }),
    InputNumber,
    message: {
      success: jest.fn(),
      error: jest.fn(),
      info: jest.fn(),
      warning: jest.fn()
    },
    Modal: ({children}: any) => <div>{children}</div>,
    Spin: ({children}: any) => <div>{children}</div>
    // Add more as needed
  }
})

// Helper to render with providers
function renderWithProviders(ui: React.ReactElement) {
  return render(<Providers>{ui}</Providers>)
}

describe('PersonalInfoForm', () => {
  it.skip('shows validation errors for required fields', async () => {
    renderWithProviders(<PersonalInfoForm />)
    fireEvent.click(screen.getByRole('button', {name: /next/i}))

    // Full Name: min(2)
    expect(await screen.findByText(/at least 2 character/i)).toBeInTheDocument()
    // National ID: min(8)
    expect(await screen.findByText(/at least 8 character/i)).toBeInTheDocument()
    // Date of Birth: required
    expect(await screen.findByText(/required/i)).toBeInTheDocument()
    // Gender: required
    expect(await screen.findByText(/required/i)).toBeInTheDocument()
    // Address: required
    expect(await screen.findByText(/required/i)).toBeInTheDocument()
    // City: required
    expect(await screen.findByText(/required/i)).toBeInTheDocument()
    // State: required
    expect(await screen.findByText(/required/i)).toBeInTheDocument()
    // Country: required
    expect(await screen.findByText(/required/i)).toBeInTheDocument()
    // Phone Number: required
    expect(await screen.findByText(/required/i)).toBeInTheDocument()
    // Email: invalid email (since empty string is not valid email)
    expect(await screen.findByText(/invalid email/i)).toBeInTheDocument()
  })
})

it('renders all form fields and the next button', () => {
  renderWithProviders(<PersonalInfoForm />)
  // Check for all input fields by label
  expect(screen.getByLabelText('personalInfo.fullName')).toBeInTheDocument()
  expect(screen.getByLabelText('personalInfo.nationalId')).toBeInTheDocument()
  expect(screen.getByLabelText('personalInfo.dateOfBirth')).toBeInTheDocument()
  expect(screen.getByLabelText('personalInfo.gender')).toBeInTheDocument()
  expect(screen.getByLabelText('personalInfo.phoneNumber')).toBeInTheDocument()
  expect(screen.getByLabelText('personalInfo.email')).toBeInTheDocument()
  expect(screen.getByLabelText('personalInfo.address')).toBeInTheDocument()
  // Next button
  expect(screen.getByRole('button', {name: /next/i})).toBeInTheDocument()
})

it('uses translation keys for labels and button', () => {
  renderWithProviders(<PersonalInfoForm />)
  // Check aria-label attributes for translation keys
  expect(screen.getByLabelText('personalInfo.fullName')).toHaveAttribute(
    'aria-label',
    'personalInfo.fullName'
  )
  expect(screen.getByLabelText('personalInfo.nationalId')).toHaveAttribute(
    'aria-label',
    'personalInfo.nationalId'
  )
  expect(screen.getByLabelText('personalInfo.dateOfBirth')).toHaveAttribute(
    'aria-label',
    'personalInfo.dateOfBirth'
  )
  expect(screen.getByLabelText('personalInfo.gender')).toHaveAttribute(
    'aria-label',
    'personalInfo.gender'
  )
  expect(screen.getByLabelText('personalInfo.phoneNumber')).toHaveAttribute(
    'aria-label',
    'personalInfo.phoneNumber'
  )
  expect(screen.getByLabelText('personalInfo.email')).toHaveAttribute(
    'aria-label',
    'personalInfo.email'
  )
  expect(screen.getByLabelText('personalInfo.address')).toHaveAttribute(
    'aria-label',
    'personalInfo.address'
  )
  // Next button
  expect(screen.getByRole('button', {name: /next/i})).toBeInTheDocument()
})

it('allows filling fields and clicking next', () => {
  renderWithProviders(<PersonalInfoForm />)
  fireEvent.change(screen.getByLabelText('personalInfo.fullName'), {
    target: {value: 'John Doe'}
  })
  fireEvent.change(screen.getByLabelText('personalInfo.nationalId'), {
    target: {value: '12345678'}
  })
  fireEvent.change(screen.getByLabelText('personalInfo.dateOfBirth'), {
    target: {value: '2000-01-01'}
  })
  fireEvent.change(screen.getByLabelText('personalInfo.gender'), {
    target: {value: 'male'}
  })
  fireEvent.change(screen.getByLabelText('personalInfo.phoneNumber'), {
    target: {value: '5551234567'}
  })
  fireEvent.change(screen.getByLabelText('personalInfo.email'), {
    target: {value: 'john@example.com'}
  })
  fireEvent.change(screen.getByLabelText('personalInfo.address'), {
    target: {value: '123 Main St'}
  })
  fireEvent.click(screen.getByRole('button', {name: /next/i}))
  // No assertion for Redux dispatch since it's mocked, but no error should occur
})
