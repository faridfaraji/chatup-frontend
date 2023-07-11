import { formatHours, formatOneDay, formatOneDayHours } from "./dateUtils"

export const getRaw = (chats) => {
    return chats?.map((chat) => {
        return {
            timestamp: new Date(`${chat.timestamp}+00:00`),
            message_count: chat.messages.length
        }
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
        const name = diffDays === 1 ? formatHours(prevTime, currentTime) :
            diffDays < 6 ? formatOneDayHours(prevTime, currentTime) :
                formatOneDay(prevTime)
        timeArray.push({ name: name, timestamp: currentTime })
        currentTime = nextTime
    }

    timeArray.shift()

    return timeArray
}

const getTimeSeries = (timeArray, chats, names) => {
    const conversations = timeArray.map((bucket) => { return { key: bucket.name, value: 0 } })
    const messages = timeArray.map((bucket) => { return { key: bucket.name, value: 0 } })

    chats.forEach((chat) => {
        const index = timeArray.findIndex((bucket) => chat.timestamp <= bucket.timestamp)
        if (index > -1) {
            conversations[index].value += 1
            messages[index].value += chat.message_count
        }
    })
    return [
        // These names are internationalized back in ../pages/Insights.jsx
        { name: names.conversations, data: conversations },
        { name: names.messages, data: messages }
    ]
}

export const formatChatDataForTS = (chats, dates, names) => {
    const step = getTimeStep(dates.since, dates.until)
    const array = getTimeArray(dates.since, dates.until, step)
    const timeSeries = getTimeSeries(array, chats, names)
    return timeSeries
}

export const formatChatDataForDonut = (chats, names, max) => {
    const donut = []
    let message_total = 0
    chats.forEach((chat) => message_total += chat.message_count)
    const remaining = max > message_total ? max - message_total : 0
    donut.push({ name: names.used, data: [{key: names.key, value: message_total}]})
    donut.push({ name: names.remaining, data: [{ key: names.key, value: remaining }] })
    
    return donut
}

export const formatChatDataForBar = (chats, dates, names) => {
    const array = getTimeArray(dates.since, dates.until, 3 * 60 * 60 * 1000)
    const year = dates.since.getFullYear()
    const month = dates.since.getMonth()
    const date = dates.since.getDate()
    const everythingIsToday = chats.map((chat) => {
        const newStamp = new Date(chat.timestamp)
        newStamp.setFullYear(year)
        newStamp.setMonth(month)
        newStamp.setDate(date)

        return ({
            timestamp: newStamp,
            message_count: chat.message_count
        })
    })
    const timeSeries = getTimeSeries(array, everythingIsToday, names)
    return timeSeries
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