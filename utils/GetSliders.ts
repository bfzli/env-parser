import { ThrowErrorMessage } from '@/utils'
import { GOAT_ATTR_NAMES, GOAT_ATTR_VALUES } from '@/constants'

const GetSliders = (): GetSlidersType => {
    let sliders: NodeListOf<HTMLElement | Element> | never[] = []

    try {
        const selector = `[${GOAT_ATTR_NAMES.TYPE}='${GOAT_ATTR_VALUES.SLIDER}']`
        const sliders_list = document?.querySelectorAll(selector)
        
        if (sliders_list.length > 0) sliders = Array.from(sliders_list) as NodeListOf<HTMLElement | Element> | never[]
        else ThrowErrorMessage('No sliders found, please add at least one slider or remove the goatsliderjs library!')
    } 
    
    catch (error) {
        ThrowErrorMessage('Something went wrong while getting sliders, if you think this is a bug please report it!')
    }

    return sliders
}

export default GetSliders