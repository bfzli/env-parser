import { UseState } from '@/utils'
import { GOAT_ATTR_NAMES } from '@/constants'

const HandleClicker = (event: Event, id: string) => {
    const isTrusted = event.isTrusted
    const element = event.target as HTMLElement

    const { IsDragging } = UseState(id)

    event.preventDefault()
    
    if (element) {
        if (isTrusted) {
            if (!IsDragging) {
                event.stopPropagation()

                if (element.nodeName === 'A') {
                    const anchor = element as HTMLAnchorElement

                    const href = anchor.href
                    const target = anchor.target
                        
                    if (href && !target) window.open(href, '_self')
                    if (href && target) window.open(href, target)
                }
            }
        }
    }
}

const InitEvents = (slides: GetSlidesType, id: string) => {
    const elements: Array<HTMLElement> = []

    for (const slide of Array.from(slides)) {
        const elems = slide.querySelectorAll('*') as NodeListOf<HTMLElement>
        elements.push(...elems)
    }

    if(elements.length > 0) {
        for (const element of elements) {
            const animation = element.getAttribute(GOAT_ATTR_NAMES.ANIMATION)

            if (animation) {
                const animationClass = animation.replace(/\s+/g, '-')

                if (!animationClass) {
                    element.addEventListener('click', (event: Event) => {
                        HandleClicker(event, id)
                    })
                }
            }
        }
    }
}

export default InitEvents