(function ($){  
   
    
  $.fn.dpk=function(){
        $(this).on("focus",function(){
            
            $(this).dpkToggle("open");
            
        }).on("blur",function(){
            
            $(this).dpkToggle("close");
        });
        return this.each(function(){
            
   $(this).attr("dpk-dateinput",true);
  });; 
 };    
    
     $.fn.dpkToggle=function(action){
        
        var defaultSettings=$.fn.dpk.settings;
        
  if (action ==="open" ){
            
   var dpkWrapper=defaultSettings.getWrapper();
   $(dpkWrapper).insertAfter(this);
            
  } else if(action ==="close"){
            
   this.siblings("."+defaultSettings.wrapperClass).remove();
  }
 };
    
    //default options
 $.fn.dpk.settings = {
        wrapperClass:"dpk-container",
  getWrapper: function (){
            return "<div class="+this.wrapperClass+"></div>";
        }
 };
 
 
 })(jQuery);

//
$(document).ready(function(){    
    $(".txtDatepicker").dpk();
});
