import { UniqueIdHandler } from '@/helpers'
import { ThrowErrorMessage } from '@/utils'
import { GOAT_ATTR_NAMES } from '@/constants'

const GetSliderConfigs = (slider: HTMLElement | Element, sliderIds: Array<string>): any => {
    try {
        const slider_config_value = slider.getAttribute(GOAT_ATTR_NAMES.CONFIGS) || null
        const formatted_configs = slider_config_value ? slider_config_value.slice(1, -1) : null
        const configs: SliderOptions = formatted_configs ? JSON.parse(formatted_configs) : null

        
        if (!configs) return ThrowErrorMessage('No slider data found')

        else {
            if (!configs?.hasOwnProperty('StartPosition')) configs.StartPosition = undefined
            
            UniqueIdHandler(sliderIds, configs)
            return configs
        }
    }

    catch(error) {
        return ThrowErrorMessage('Something went wrong while getting slider data!')
    }
}

export default GetSliderConfigs