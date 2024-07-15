const InitCleaner = (): void => {
    const styles = document.querySelector('div[goat-type="styles"]')
    if (styles) styles.remove()
}

export default InitCleaner