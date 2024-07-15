import { ThrowErrorMessage } from '@/utils'
import { GOAT_ATTR_NAMES, GOAT_ATTR_VALUES } from '@/constants'

const GetSlides = (slider: HTMLElement | Element): GetSlidesType => {
    let slides: NodeListOf<HTMLElement | Element> | never[] = []
    
    try {
        const selector = `[${GOAT_ATTR_NAMES.TYPE}='${GOAT_ATTR_VALUES.SLIDE}']`
        const slides_list = slider?.querySelectorAll(selector)

        if (slides_list.length > 0) slides = slides_list
        else return ThrowErrorMessage('No slides found, please add at least one slide for the slider to work!')
    } 
    
    catch (error) {
        return ThrowErrorMessage('Something went wrong while getting slides, if you think this is a bug please report it!')
    }

    return slides
}

export default GetSlides