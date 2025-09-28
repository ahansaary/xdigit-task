import {Button} from 'antd'
import {useTranslation} from 'react-i18next'
import {RobotFilled} from '@ant-design/icons'

interface Props {
  onClick: () => void
}

export default function HelpMeWriteButton({onClick}: Props) {
  const {t} = useTranslation()

  return (
    <Button
      type="dashed"
      onClick={onClick}
      style={{
        marginTop: 8,
        background: 'linear-gradient(90deg, #6a5af9 0%, #00e0ff 100%)',
        color: '#fff',
        border: 'none',
        boxShadow: '0 2px 8px rgba(106,90,249,0.15)',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '0 16px'
      }}
      icon={<RobotFilled style={{fontSize: 20, color: '#fff', filter: 'drop-shadow(0 0 4px #00e0ff)'}} />}
    >
      {t('buttons.helpMeWrite')}
    </Button>
  )
}
