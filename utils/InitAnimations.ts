import { GOAT_ATTR_NAMES, GOAT_ATTR_VALUES } from '@/constants'

const Traversal = (element: HTMLElement) => {
    const animation = element.getAttribute(GOAT_ATTR_NAMES.ANIMATION)

    if (animation) {
        const animationClass = animation.replace(/\s+/g, '-')

        element.classList.add(animationClass)

        element.addEventListener('click', (event) => {
            const isTrusted = event.isTrusted

            if (isTrusted) {
                event.preventDefault()
                event.stopPropagation()
            }
        })
    }

    if (element?.children) Array.from(element.children).forEach(child => {
        if (child instanceof HTMLElement) {
            Traversal(child)
        }
    })
}

const InitAnimations = (slider: HTMLElement | Element) => {
    const selector = `[${GOAT_ATTR_NAMES.TYPE}='${GOAT_ATTR_VALUES.SLIDE}']`
    const slides = slider?.querySelectorAll(selector)

    if (slides) slides.forEach(slide => {
        if (slide instanceof HTMLElement) {
            Traversal(slide)
        }
    })
}

export default InitAnimations