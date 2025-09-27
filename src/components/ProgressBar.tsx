import {Steps} from 'antd'
import useSteps from '../hooks/steps'

export default function ProgressBar() {
  const {steps, current} = useSteps()

  return <Steps current={current} items={steps} />
}
