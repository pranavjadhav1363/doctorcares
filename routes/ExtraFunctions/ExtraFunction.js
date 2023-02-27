const CheckpasswordLength = (password) => {
    if (password.length <= 8)
        return false;
    else if (password.length >= 16)
        return false;
    else
        return true;

}







const convertTime12to24 = (time12h) => {
    const [time, modifier] = time12h.split(' ');

    let [hours, minutes] = time.split(':');

    if (hours === '12') {
        hours = '00';
    }

    if (modifier === 'PM') {
        hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}`;
}

// console.log(convertTime12to24('01:02 PM'));
// console.log(convertTime12to24('05:06 PM'));
// console.log(convertTime12to24('12:00 PM'));
// console.log(convertTime12to24('12:00 AM'));
function formatTime(timeString) {
    const [hourString, minute] = timeString.split(":");
    const hour = +hourString % 24;
    return (hour % 12 || 12) + ":" + minute + (hour < 12 ? "AM" : "PM");
}



function addMinutes(time, minutes) {
    var date = new Date(new Date('01/01/2015 ' + time).getTime() + minutes * 60000);
    var tempTime = ((date.getHours().toString().length == 1) ? '0' + date.getHours() : date.getHours()) + ':' +
        ((date.getMinutes().toString().length == 1) ? '0' + date.getMinutes() : date.getMinutes()) + ':' +
        ((date.getSeconds().toString().length == 1) ? '0' + date.getSeconds() : date.getSeconds());
    return tempTime;
}



const CreateTimeSlot = (starttime, endtime, interval) => {
    var timeslots = [starttime];

    while (starttime != endtime) {
        console.log(1)
        starttime = addMinutes(starttime, interval);
        console.log(starttime)
        timeslots.push(starttime);
        console.log(2)
    }
    return timeslots
}
// while (starttime != endtime) {

//     starttime = addMinutes(starttime, interval);
//     timeslots.push(starttime);

// }
// console.log(timeslots)
module.exports = { CheckpasswordLength, convertTime12to24, CreateTimeSlot }