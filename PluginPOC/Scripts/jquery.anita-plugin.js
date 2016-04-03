
(function($){
    $.fn.greenify=function(options){
        // This is the easiest way to have default options.
        var settings=$.extend({
            color: "green",
            backgroundColor: "black"
        },options);
         // Greenify the collection based on the settings variable.
        return this.css({
            color: settings.color,
            backgroundColor: settings.backgroundColor
        });//allow Chaining    
    };
    $.fn.showLinkLocation = function() {
 
        this.filter( "a" ).each(function() {
            var link = $( this );
            link.append( " (" + link.attr( "href" ) + ")" );
        });
 
        return this;
 
    };
})(jQuery);
//using Self-Invoking Functions to:
//+ protect the $ Alias and Adding Scope
//+ have our own private variables



$(document).ready(function(){
    
    
    $("a").greenify().addClass("greenified");
    $("a.nameaa").greenify().css("color", "red");
    $("a.demooption").greenify({color: "blue",backgroundColor: "white"});
    $( "a" ).showLinkLocation();
});