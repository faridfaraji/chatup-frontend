
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

export const zeroRange = (range, iana) => {
    const now = new Date();
    let offsetMinutes = now.getTimezoneOffset()
    try { 
        offsetMinutes = timeZoneOffsetInMinutes(iana) 
    } catch (err) { 
        console.log("Shop timezone invalid, using browser.", err)
    }
    const offsetString = formatOffset(offsetMinutes);
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



