var eventCalendar = angular.module('eventCalendar', []);

eventCalendar.controller('EventController', function($scope, $http) {
    $http.get("data/events.json").then(function(response) {
        $scope.data = response.data;
    },
        function(error) {

        });
});

/*Calendar Builder
  Here is where the Calendar will be built based on todays date. 
*/

// these are labels for the days of the week
cal_days_labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
// these are human-readable month name labels, in order
cal_months_labels = ['January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December'];
// these are the days of the week for each month, in order
cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
cal_current_date = new Date();

function Calendar(month, year) {
    this.month = (isNaN(month) || month == null) ? cal_current_date.getMonth() : month;
    this.year = (isNaN(year) || year == null) ? cal_current_date.getFullYear() : year;
    this.html = '';

}

Calendar.prototype.generateHTML = function() {
    var firstDay = new Date(this.year, this.month, 1);
    var startingDay = firstDay.getDay();
    var monthLength = cal_days_in_month[this.month];
    if (this.month == 1) {
        if (this.year % 4 == 0 && this.year % 100 != 0 || this.year % 400 == 0) {
            monthLength = 29;
        }
    }

    var monthName = cal_months_labels[this.month];
    var html = '<div class="calendar-wrapper">';
    html += '<h2 class="center">';
    html += monthName + "&nbsp;" + this.year;
    html += '</h2>';
    html += '<ul class="calendar-daysOfWeek">';
    for (var i = 0; i <= 6; i++) {
        html += '<li class="WeekDay">';
        html += cal_days_labels[i];
        html += '</li>';
    }
    html += '</ul><ul class="calendar-week">';

    var day = 1;
    // this loop is for is weeks (rows)
    for (var i = 0; i < 9; i++) {
        // this loop is for weekdays (cells)
        for (var j = 0; j <= 6; j++) {
            html += '<li class="day">';
            if (day <= monthLength && (i > 0 || j >= startingDay)) {
                html += day;
                day++;
            }
            html += '</li>';
        }
        // stop making rows if we've run out of days
        if (day > monthLength) {
            break;
        } else {
            html += '</ul><ul class="calendar-week">';
        }
    }

    html += '</ul></div>';

    this.html = html;

}

Calendar.prototype.getHTML = function() {
  return this.html;
}


eventCalendar.controller("CalendarController", function($scope) {

});

