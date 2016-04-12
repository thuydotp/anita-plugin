"use strict";

function dateHelper() {};
dateHelper.prototype = new Date();

dateHelper.prototype.isLeapYear = function(year) {
    if (year % 100 == 0) {
        if (year % 400 == 0) {
            return true;
        }
        return false;
    }

    if (year % 4 == 0) {
        return true;
    } else {
        return false;
    }
};
dateHelper.prototype.getDaysOfYear = function(year) {
    if (dateHelper.prototype.isLeapYear(year)) {
        return 366;
    }
    return 365;
};
dateHelper.prototype.getDaysOfMonth = function(month, year) {
    switch (month) {
        case 2:
            var isLeapYear = this.isLeapYear(year);
            if (isLeapYear) {
                return 29;
            }
            return 28;
            break;

        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:

            return 31;
            break;

        case 4:
        case 6:
        case 9:
        case 11:
            return 30;
            break;

        default:
            return 0;
            break;

    }
}
dateHelper.prototype.getMonthName=function(month){
	var arr=["January","February","March","April","May","June","July","August","September","October","November","December"];
	
	return arr[month-1];
};


