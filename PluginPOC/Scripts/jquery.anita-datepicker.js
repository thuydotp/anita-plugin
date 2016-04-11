"use strict";
(function($) {


    $.fn.dpk = function() {
        $(this).on("focus", function() {

            $(this).dpkToggle("open");

        }).on("blur", function() {

            $(this).dpkToggle("close");
        });
        return this.each(function() {

            $(this).attr("dpk-dateinput", true);
        });;
    };

    //default options
    $.fn.dpk.settings = {
        wrapperClass: "dpk-container",
        getWrapper: function(temp) {
            return $(temp).addClass(this.wrapperClass);
        },
    };

    $.fn.dpkToggle = function(action) {

        var defaultSettings = $.fn.dpk.settings;
        var self = $(this);
        if (action === "open") {
            $.get("../datepicker-days.html", function(data) {
                var content = defaultSettings.getWrapper(data);
                $(content).insertAfter(self);
            })

        } else if (action === "close") {

            this.siblings("." + defaultSettings.wrapperClass).remove();
        }
    };




})(jQuery);
