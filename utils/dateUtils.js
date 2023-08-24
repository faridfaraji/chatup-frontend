
const formatOffset = (offsetMinutes) => {
    const offsetHours = Math.floor(Math.abs(offsetMinutes) / 60);
    const offsetSign = offsetMinutes >= 0 ? "-" : "+";
    const formattedOffset = `${offsetSign}${padZero(offsetHours)}:${padZero(Math.abs(offsetMinutes) % 60)}`;
    return formattedOffset;
}

function timeZoneOffsetInMinutes(ianaTimeZone) {
    const now = new Date();
    now.setSeconds(0, 0);

    // Format current time in `ianaTimeZone` as `M/DD/YYYY, HH:MM:SS`:
    const tzDateString = now.toLocaleString('en-US', {
        timeZone: ianaTimeZone,
        hourCycle: 'h23',
    });

    // Parse formatted date string:
    const match = /(\d+)\/(\d+)\/(\d+), (\d+):(\d+)/.exec(tzDateString);
    const [_, month, day, year, hour, min] = match.map(Number);

    // Change date string's time zone to UTC and get timestamp:
    const tzTime = Date.UTC(year, month - 1, day, hour, min);

    // Return the offset between UTC and target time zone:
    return Math.floor((tzTime - now.getTime()) / (1000 * 60));
}

export const zeroRange = (range) => {
    const now = new Date();
    let offsetMinutes = now.getTimezoneOffset()
    const offsetString = formatOffset(offsetMinutes);
    const sinceDateTime = new Date(`${range.since} 00:00:00${offsetString}`)
    const untilDateTime = new Date(`${range.until} 00:00:00${offsetString}`)
    untilDateTime.setDate(untilDateTime.getDate() + 1)
    const newRange = { since: sinceDateTime, until: untilDateTime }
    return newRange
}

export const getCompDates = (range) => {
    return { since: new Date(2 * range.since - range.until), until: range.since }
}

function padZero(value) {
    return String(value).padStart(2, "0");
}

export const formatHours = (date1, date2) => {
    // Compatibility:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatRange
    // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/language
    let locale = navigator.language
    let options = { hour: "numeric" }
    let formatter = Intl.DateTimeFormat(locale = locale, options = options)
    const fdate1 = formatter.format(date1)
    const fdate2 = formatter.format(date2)
    const formatted = `${fdate1} - ${fdate2}`
    return formatted
}

export const formatHour = (date) => {
    // Compatibility:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatRange
    // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/language
    let locale = navigator.language
    let options = { hour: "numeric" }
    let formatter = Intl.DateTimeFormat(locale = locale, options = options)
    const formatted = formatter.format(date)
    return formatted
}

export const formatOneDay = (date) => {
    // Compatibility:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
    // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/language
    let locale = navigator.language
    let options = { month: "short", day: "numeric" }
    let formatter = Intl.DateTimeFormat(locale = locale, options = options)
    const formatted = formatter.format(date)
    return formatted
}

export const formatOneDayHours = (date1, date2) => {
    // Compatibility:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatRange
    // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/language
    let locale = navigator.language
    let options = { hour: "numeric", month: "short", day: "numeric" }
    let formatter = Intl.DateTimeFormat(locale = locale, options = options)
    const formatted = formatter.formatRange(date1, date2)
    return formatted
}

export const formatDayHour = (date) => {
    // Compatibility:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatRange
    // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/language
    let locale = navigator.language
    let options = { hour: "numeric", month: "short", day: "numeric" }
    let formatter = Intl.DateTimeFormat(locale = locale, options = options)
    const formatted = formatter.format(date)
    return formatted
}

const isOneDay = (date1, date2) => {
    const diffMillis = Math.abs(date2 - date1)
    const oneDay = 24 * 60 * 60 * 1000
    return diffMillis <= oneDay
}

export const formatRange = (range) => {
    // Compatibility:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatRange
    // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/language
    let locale = navigator.language
    let options = { month: "short", day: "numeric" }
    let formatter = Intl.DateTimeFormat(locale = locale, options = options)
    const formatted = isOneDay(range.since, range.until) ?
        formatter.format(range.since) :
        formatter.formatRange(range.since, range.until)
    return formatted
}

export const localizeTimestamp = (timestamp) => {
    // Compatibility:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatRange
    // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/language
    const date = new Date(timestamp)
    let locale = navigator.language
    let options = { month: "short", day: "numeric", hour: "numeric", minute: "numeric" }
    let formatter = Intl.DateTimeFormat(locale = locale, options = options)
    const formatted = formatter.format(date)
    return formatted
}

export const localizeDatestamp = (timestamp) => {
    // Compatibility:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatRange
    // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/language
    const date = new Date(timestamp)
    let locale = navigator.language
    let options = { month: "short", day: "numeric" }
    let formatter = Intl.DateTimeFormat(locale = locale, options = options)
    const formatted = formatter.format(date)
    return formatted
}

export const localizeTime = (timestamp) => {
    // Compatibility:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatRange
    // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/language
    const date = new Date(timestamp)
    let locale = navigator.language
    let options = { hour: "numeric", minute: "numeric" }
    let formatter = Intl.DateTimeFormat(locale = locale, options = options)
    const formatted = formatter.format(date)
    return formatted
}


export const getTimeSince = (time) => {
    const since_time = new Date(time)
    const curr_time = new Date();
    const diffInMilliseconds = Math.abs(curr_time - since_time);
    const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60)

    return diffInHours
}

export const setYMD = (date, year, month, day) => {
    date.setYear(year)
    date.setMonth(month)
    date.setDate(day)
}

// Timestamps are returned from the backend with an implicit UTC timezone
// We make that timezone explicit
export const withUTC = (timestamp) => {
    return `${timestamp}+00:00`
}

export const dateFromUTC = (timestamp) => {
    return new Date(withUTC(timestamp))
}

export const freeTrialActive = (data) => {
    if (!data) return false
    const trialEnds = new Date(data?.trial_ends_on)
    trialEnds.setDate(trialEnds.getDate() + data?.trial_days ?? 0)
    const now = new Date()
    return now < trialEnds
}