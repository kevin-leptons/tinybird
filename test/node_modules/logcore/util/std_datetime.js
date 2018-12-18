const dateformat = require('dateformat')

/*
Arguments.
    * date - Date.
Return String.
*/
function std_datetime(date) {
    return dateformat(date, 'yyyy-mm-dd hh:MM:ss')
}

module.exports = std_datetime
