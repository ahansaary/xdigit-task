export const useTranslation = () => ({
  t: (key: string) => key,
  i18n: {language: 'en', changeLanguage: jest.fn()}
})

export const initReactI18next = {type: '3rdParty', init: jest.fn()}

export const I18nextProvider = ({children}: {children: React.ReactNode}) => (
  <>{children}</>
)
