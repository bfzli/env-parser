import { SliderStates } from '@/constants'

const InitState = (
    goatslider: GoatSliderType, 
    configs: SliderConfigsType,
    slider: HTMLElement | Element,
    slides: NodeListOf<HTMLElement | Element> | never[]
) => {
    SliderStates[configs.Id] = {
        Configs: configs,
        IsDisabled: false,
        IsDragging: false,
        GoatSlider: goatslider,
        Current: {
            slider: slider,
            slides: slides
        }
    }
}

export default InitState