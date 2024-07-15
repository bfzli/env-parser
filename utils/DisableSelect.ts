const DisableSelect = (slider: HTMLElement | Element) =>{
    const elements = slider.querySelectorAll('*')

    for (const element of elements) {
        (element as HTMLElement).style.userSelect = 'none'
    }
}

export default DisableSelect