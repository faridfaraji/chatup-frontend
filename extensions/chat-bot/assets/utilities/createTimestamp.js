  
export const createTimestamp = () => {
    // Compatibility:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatRange
    // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/language
    const date = new Date()
    let locale = navigator.language
    let options = { hour: "numeric", minute: "numeric" }
    let formatter = Intl.DateTimeFormat(locale = locale, options = options)
    const formatted = formatter.format(date)
    return formatted
}
