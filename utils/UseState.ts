import { SliderStates } from '@/constants'

const UseState = (slider_id: string) => {
    return SliderStates[slider_id]
}

export default UseState