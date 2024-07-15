const DisableImageDragging = (slider: Element | HTMLElement) => {
    const images = slider.querySelectorAll('img')

    for (const image of images) {
        image.ondragstart = () => false
        image.draggable = false
    }
}

export default DisableImageDragging