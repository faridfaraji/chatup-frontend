import { formatHour, formatDayHour, formatHours, formatOneDay, formatOneDayHours, setYMD, withUTC, dateFromUTC } from "./dateUtils"

export const getRaw = (messages) => {
    return messages?.map((msg) => {
        return dateFromUTC(msg.timestamp)
    })
}

const getTimeStep = (start, end) => {
    const diffMillis = end - start
    const diffDays = Math.floor(diffMillis / (1000 * 60 * 60 * 24))
    const breaks = [
        { dur: 1, step: 3, },
        { dur: 3, step: 6, },
        { dur: 5, step: 12, },
    ]
    const step = breaks.find((bp) => diffDays <= bp.dur)
    return (step ? step.step : 24) * 60 * 60 * 1000
}

const getTimeArray = (start, end, step) => {
    const diffMillis = end - start
    const diffDays = Math.floor(diffMillis / (1000 * 60 * 60 * 24))

    const timeArray = []
    let currentTime = start

    while (currentTime <= end) {
        const prevTime = timeArray.slice(-1).pop()?.timestamp ?? currentTime
        const nextTime = new Date(currentTime.getTime() + step)
        let name = diffDays < 1 ? formatHour(currentTime) : formatDayHour(currentTime)
        if (step > 1 * 60 * 60 * 1000) {
            name = diffDays <= 1 ? formatHours(prevTime, currentTime) : formatOneDayHours(prevTime, currentTime)
        }
        timeArray.push({ name: name, timestamp: currentTime })
        currentTime = nextTime
    }

    return timeArray
}

const getTimeSeries = (timeArray, messages, name, isComparison) => {
    const bucketedMessages = timeArray.map((bucket) => { return { key: bucket.name, value: 0 } })
    messages.forEach((msg) => {
        const index = timeArray.findIndex((bucket) => msg <= bucket.timestamp)
        if (index > -1) {
            bucketedMessages[index].value += 1
        }
    })
    return [{ name: name, data: bucketedMessages, isComparison: isComparison }]
}

// partitions a list of comparible objects around a single breakpoint
// list is split into before u after => (-infty, bp)u[bp, infty)
const split = (obj, bp) => {
    const ba = { before: [], after: [] }
    obj.forEach((obj) => obj < bp ? ba.before.push(obj) : ba.after.push(obj))
    return ba
}

export const formatChatDataForTS = (messages, dates, comp, names) => {
    const step = 1 * 60 * 60 * 1000
    const splitMessages = split(messages, dates.since)
    const primeArray = getTimeArray(dates.since, new Date(), step)
    const compArray = getTimeArray(comp.since, comp.until, step)
    const primeSeries = getTimeSeries(primeArray, splitMessages.after, names.prime, false)
    const compSeries = getTimeSeries(compArray, splitMessages.before, names.comp, true)
    return [...primeSeries, ...compSeries]
}

const makeBasicDonutData = (names, values) => {
    return (
        [
            {
                name: names.used,
                data: [{
                    key: names.key,
                    value: values.used
                }]
            },
            {
                name: names.remaining,
                data: [{
                    key: names.key,
                    value: values.max > values.used ? values.max - values.used : 0
                }]
            },
        ]
    )
}


export const formatChatDataForDonut = (messages, names, max) => {
    return makeBasicDonutData(names, {used: messages.length, max: max})
}

export const formatValidationForDonut = (validation, names) => {
    const donut = makeBasicDonutData(names, {used: validation.current_usage, max: validation.message_limit})
    return {donut: donut, validation: validation}
}


export const formatChatDataForBar = (messages, dates, bp, names) => {
    const array = getTimeArray(dates.since, dates.until, 4 * 60 * 60 * 1000)
    array.shift()
    const year = dates.since.getFullYear()
    const month = dates.since.getMonth()
    const day = dates.since.getDate()
    const splitMessages = split(messages, bp)
    splitMessages.before.forEach((msg) => setYMD(msg, year, month, day))
    splitMessages.after.forEach((msg) => setYMD(msg, year, month, day))
    const primeSeries = getTimeSeries(array, splitMessages.after, names.prime, false)
    const compSeries = getTimeSeries(array, splitMessages.before, names.comp, true)
    return [...primeSeries, ...compSeries]
}

export function tempString(floatValue) {
    if (floatValue <= 0) {
        return "0.00";
    } else if (floatValue <= 0.125) {
        return "0.00";
    } else if (floatValue <= 0.375) {
        return "0.25";
    } else if (floatValue <= 0.625) {
        return "0.50";
    } else if (floatValue <= 0.875) {
        return "0.75";
    } else if (floatValue <= 1) {
        return "1.00";
    } else {
        return "0.00";
    }
}