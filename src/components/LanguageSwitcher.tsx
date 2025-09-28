import {Select} from 'antd'
import {useTranslation} from 'react-i18next'

export default function LanguageSwitcher() {
  const {i18n} = useTranslation()

  return (
    <Select
      defaultValue={i18n.language}
      style={{width: 100}}
      onChange={lng => i18n.changeLanguage(lng)}
      options={[
        {value: 'en', label: 'English'},
        {value: 'ar', label: 'العربية'}
      ]}
    />
  )
}
