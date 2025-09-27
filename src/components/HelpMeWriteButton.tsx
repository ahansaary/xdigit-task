import {Button} from 'antd'
import {useTranslation} from 'react-i18next'

interface Props {
  onClick: () => void
}

export default function HelpMeWriteButton({onClick}: Props) {
  const {t} = useTranslation()

  return (
    <Button type="dashed" onClick={onClick} style={{marginTop: 8}}>
      {t('buttons.helpMeWrite')}
    </Button>
  )
}
