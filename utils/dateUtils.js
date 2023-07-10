
const formatOffset = (offsetMinutes) => {
    const offsetHours = Math.floor(Math.abs(offsetMinutes) / 60);
    const offsetSign = offsetMinutes >= 0 ? "-" : "+";
    const formattedOffset = `${offsetSign}${padZero(offsetHours)}:${padZero(Math.abs(offsetMinutes) % 60)}`;
    return formattedOffset;
}

export const zeroRange = (range) => {
    const date = new Date();
    const timezoneOffsetMinutes = date.getTimezoneOffset();
    const offsetString = formatOffset(timezoneOffsetMinutes);
    const sinceDateTime = new Date(`${range.since} 00:00:00${offsetString}`)
    const untilDateTime = new Date(`${range.until} 00:00:00${offsetString}`)
    untilDateTime.setDate(untilDateTime.getDate() + 1)
    const newRange = { since: sinceDateTime, until: untilDateTime }
    return newRange
}

function padZero(value) {
    return String(value).padStart(2, "0");
}

export const formatHours = (date1, date2) => {
    // Get the hours from the Date objects
    const firstHour = date1.toLocaleTimeString([], { hour: "numeric" })
    const secondHour = date2.toLocaleTimeString([], { hour: "numeric" })

    // Create the reduced string in the format "HH-HH"
    const HHHH = `${firstHour}-${secondHour}`;

    return HHHH
}

export const formatOneDay = (date) => {
    // Get the month
    const month = (date.getMonth() + 1).toString().padStart(2, '0');

    // Get the date
    const day = date.getDate().toString().padStart(2, '0');

    // Create the reduced string in the format "MM-DD"
    const MD = `${month}-${day}`;

    return MD
}

export const formatOneDayHours = (date1, date2) => {
    // Get the hours from the Date objects
    const firstHour = date1.toLocaleTimeString([], { hour: "numeric" })
    const secondHour = date2.toLocaleTimeString([], { hour: "numeric" })

    // date1 will always be the right date. date 2 can be midnight tomorrow
    // Get the month
    const month = (date1.getMonth() + 1).toString().padStart(2, '0');

    // Get the date
    const day = date1.getDate().toString().padStart(2, '0');

    // Create the reduced string in the format "(MM-DD) HH-HH"
    const MDHH = `(${month}-${day}) ${firstHour}-${secondHour}`;

    return MDHH
}

export const getTimeSince = (time) => {
    const since_time = new Date(time)
    const curr_time = new Date();
    const diffInMilliseconds = Math.abs(curr_time - since_time);
    const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60)

    return diffInHours
}
