import {Button} from 'antd'
import {useTranslation} from 'react-i18next'

const HelpMeWriteButton = ({onClick}: {onClick: () => void}) => {
  const {t} = useTranslation()
  return (
    <Button type="dashed" onClick={onClick} style={{marginTop: 8}}>
      {t('buttons.helpMeWrite')}
    </Button>
  )
}

export default HelpMeWriteButton
