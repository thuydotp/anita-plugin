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
        containerClass: "mycontainer",
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

    $.fn.resize = function() {
        var containerClass = $.fn.dpk.settings.containerClass;
        var windowH = window.innerHeight;
        var windowW = window.innerWidth;
        var curMarginTop = parseFloat($("." + containerClass).css("margin-top"));
        var curMarginLeft = parseFloat($("." + containerClass).css("margin-left"));

        var resMarginTop = ((curMarginTop * 100) / windowH);
        var resMarginLeft = ((curMarginLeft * 100) / windowW);


        var a = $(window).resize(function() {
            $("." + containerClass).css("margin-top", resMarginTop + "%");
            $("." + containerClass).css("margin-left", resMarginLeft + "%");
        });

    };


})(jQuery);