
const getRaw = (chats) => {
    return chats.map((chat) => {
        return {
            timestamp: new Date(chat.timestamp),
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
    const timeArray = []
    let currentTime = start

    while (currentTime <= end) {
        timeArray.push(currentTime)
        currentTime = new Date(currentTime.getTime() + step)
    }

    return timeArray
}

const getTimeSeries = (timeArray, raw) => {
    const conversations = timeArray.map((bucket) => { return { key: bucket, value: 0 } })
    const messages = timeArray.map((bucket) => { return { key: bucket, value: 0 } })

    raw.forEach((chat) => {
        const index = timeArray.findIndex((bucket) => chat.timestamp <= bucket)
        if (index > -1) {
            conversations[index].value += 1
            messages[index].value += chat.message_count
        }
    })
    return [
        { name: "Conversations", data: conversations },
        { name: "Messages", data: messages }
    ]
}

export const formatChatData = (chats, dates) => {
    const raw = getRaw(chats)
    const step = getTimeStep(dates.since, dates.until)
    const array = getTimeArray(dates.since, dates.until, step)
    const timeSeries = getTimeSeries(array, raw)
    return timeSeries
}

export const formatOffset = (offsetMinutes) => {
    const offsetHours = Math.floor(Math.abs(offsetMinutes) / 60);
    const offsetSign = offsetMinutes >= 0 ? "-" : "+";

    const formattedOffset = `${offsetSign}${padZero(offsetHours)}:${padZero(Math.abs(offsetMinutes) % 60)}`;

    return formattedOffset;
}

function padZero(value) {
    return String(value).padStart(2, "0");
}

export function tempString(floatValue) {
    if (floatValue <= 0) {
      return "0.0";
    } else if (floatValue <= 0.25) {
      return "0.0";
    } else if (floatValue <= 0.75) {
      return "0.5";
    } else if (floatValue <= 1.25) {
      return "1.0";
    } else if (floatValue <= 1.75) {
      return "1.5";
    } else if (floatValue <= 2) {
      return "2.0";
    } else {
      return "Invalid value";
    }
  }