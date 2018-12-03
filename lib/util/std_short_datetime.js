const dateformat = require('dateformat')

/*
Arguments.
    * date - Date.
Return String.
*/
function std_short_datetime(date) {
    return dateformat(date, 'yyyy-mm-dd hh:MM')
}

module.exports = std_short_datetime
