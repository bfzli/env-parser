import { ThrowErrorMessage } from '@/utils'
import { GOAT_ATTR_NAMES, GOAT_ATTR_VALUES } from '@/constants'

const GetSlidesContainer = (slider: HTMLElement | Element): GetSlidesContainerType => {
    let container: HTMLElement | Element

    try {
        const selector = `[${GOAT_ATTR_NAMES.TYPE}='${GOAT_ATTR_VALUES.SLIDES}']`
        const container_element = slider.querySelector(selector)

        if (container_element) container = container_element
        else return ThrowErrorMessage('The slider has no slides container, please don\'t remove it from the slider because it\'s required!')
    } 
    
    catch (error) {
        return ThrowErrorMessage('Something went wrong while geting the main container or similar!')
    }

    return container
}

export default GetSlidesContainer