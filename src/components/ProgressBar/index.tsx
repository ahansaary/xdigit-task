import {Steps} from 'antd'

const ProgressBar = ({current, steps}: {current: number; steps: string[]}) => {
  return <Steps current={current} items={steps.map(title => ({title}))} />
}

export default ProgressBar
