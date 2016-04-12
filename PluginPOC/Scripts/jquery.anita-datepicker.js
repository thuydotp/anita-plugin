"use strict";


(function($) {

    $.fn.dpk = function() {

        var self=$(this);
        $(this).on("focus", function() {
            $(this).dpkToggle("open");
        })
//        .on("blur", function() {
//            $(this).dpkToggle("close");
//        });
		
        return this.each(function() {             
            self.attr("dpk-dateinput", true);
        });
    };

    //default options
    $.fn.dpk.settings = {
        wrapperClass: "datepicker",
        containerClass: "mycontainer",
        getWrapper: function(temp) {
            return $(temp).addClass(this.wrapperClass);
        },
    };

    $.fn.dpkToggle = function(action) {

        var defaultSettings = $.fn.dpk.settings;
        var self = $(this);
        if (action === "open") {
            var wrapperClass=defaultSettings.wrapperClass;
            if($("."+wrapperClass).length!=0){
                return false;
            }
			var currentDate=new Date();
            var content = $.fn.getDatepicker(currentDate.getMonth(),currentDate.getDate(),currentDate.getFullYear());
            $(content).insertAfter(self);
			
			$(".day").on("click",function(){
				$(".day").removeClass("active");
				$(this).addClass("active");
			});
            
            $(document).mouseup(function (e)
            {
                var container = $("."+wrapperClass);
                var input=$(".txtDatepicker");
                if (!container.is(e.target)  && container.has(e.target).length === 0
                    &&!input.is(e.target)  && input.has(e.target).length===0)
                {
                    self.siblings("." + defaultSettings.wrapperClass).remove();
                }
            });
			

        } else if (action === "close") {
        	self.siblings("." + defaultSettings.wrapperClass).remove();
        }
    };

    $.fn.resize = function() {
        var containerClass = $.fn.dpk.settings.containerClass;
        var windowH = window.innerHeight;
        var windowW = window.innerWidth;
        var curMarginTop = parseFloat($("." + containerClass).css("margin-top"));
        var curMarginLeft = parseFloat($("." + containerClass).css("margin-left"));

        var resMarginTop = ((curMarginTop * 100) / windowH);
        var resMarginLeft = ((curMarginLeft * 100) / windowW);


        $(window).resize(function() {
            $("." + containerClass).css("margin-top", resMarginTop + "%");
            $("." + containerClass).css("margin-left", resMarginLeft + "%");
        });

    };

    $.fn.getDatepicker = function(month,day, year) {
        var self = $(this);

		month=month+1;
		
        var _dateHelper = new dateHelper();
        var selectedDate = new Date(month+"/"+day+"/"+year);


        var _daysOfMonth = _dateHelper.getDaysOfMonth(month, year);
        var firstDay = new Date(month + "/1/" + year);
        var start = firstDay.getDay();

        var _row = 6,
            _column = 7;
        var j = 0,
            count = 1,
            countNew = 1,
            countPrev = 0;

        if (month == 1) {
            countPrev = _dateHelper.getDaysOfMonth(12, year - 1) + 1 - start;
        } else {
            countPrev = _dateHelper.getDaysOfMonth(month - 1, year - 1) + 1 - start;
        }
        var _tbl = "";
		
		var today=new Date();
		var currentDate=today.getDate();
        for (var i = 0; i < (_row * _column); i++) {
            if (i % 7 == 0) {
                _tbl += "<tr>";
            }
            if (i < start) {
                _tbl += "<td class='old day'>" + countPrev + "</td>";
                countPrev++
            } else if (count <= _daysOfMonth) {
				
                if (currentDate == count) {
                    _tbl += "<td class='today day'>" + count + "</td>";
                } else {
                    _tbl += "<td class='day'>" + count + "</td>";
                }
                count++;
				
            } else {
				
                _tbl += "<td class='new day'>" + countNew + "</td>";				
                countNew++
                count++;
				
            }

            if (i % 7 == 6) {
                _tbl += "</tr>";
            }

        }

        var datepickerSwitch = _dateHelper.getMonthName(month) + " " + year;
        var tblHeader = "<thead>" +
            "<tr>" +
            "<th class='prev visible'>«</th>" +
            "<th colspan='5' class='datepicker-switch'>" + datepickerSwitch + "</th>" +
            "<th class='next visible'>»</th>" +
            "</tr>" +
            "<tr>" +
            "<th class='dow'>Su</th>" +
            "<th class='dow'>Mo</th>" +
            "<th class='dow'>Tu</th>" +
            "<th class='dow'>We</th>" +
            "<th class='dow'>Th</th>" +
            "<th class='dow'>Fr</th>" +
            "<th class='dow'>Sa</th>" +
            "</tr>" +
            "</thead>";

        var tblBody = "<tbody>" + _tbl + "</tbody>";
        var tbl = "<table class='table-condensed'>" + tblHeader + tblBody + "</table>";
        var wrapper = $("<div><div style='display: block;' class='datepicker-days'>" + tbl + "</div></div>");
        wrapper.addClass($.fn.dpk.settings.wrapperClass);
        return wrapper;
    }
})(jQuery);

