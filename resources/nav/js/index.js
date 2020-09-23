/*
* 
* Credits to http://css-tricks.com/long-dropdowns-solution/
*
*/

var maxHeight = 400;

function toPage(toPage){
	console.log(toPage);
	window.location.href=toPage;
}

$(function(){
	
//	走进进博会跳转页面
//	$("#timeTopDiv >div >div> div").click(function(){
//		console.log(343);
//		var toPage = $(this).attr("toPage");
//		window.location.href=toPage;
//	});
	
	//计算高度
	 $(".dropdown  ul").each(function(j,m){
		 var height = $(m).height();
		 var li = $(m).height()/$(m).find("li").length;
		 $(m).css("top",0-height-li);
	 });
	 
    $(".dropdown ul > li").hover(function() {
    
         var $container = $(this),
             $list = $container.find("ul"),
             $anchor = $container.find("a"),
             height = $list.height() * 1.1,       // make sure there is enough room at the bottom
             multiplier = height / maxHeight;     // needs to move faster if list is taller
        
        // need to save height here so it can revert on mouseout            
        $container.data("origHeight", $container.height());
        
        // so it can retain it's rollover color all the while the dropdown is open
        $anchor.addClass("hover");
        
        // make sure dropdown appears directly below parent list item  
        
        $list.show().css({
        	
                paddingTop: $container.data("origHeight")
            });
        
        // don't do any animation if list shorter than max
//        if (multiplier > 1) {
//            $container
//                .css({
//                    height: maxHeight,
//                    overflow: "hidden"
//                })
//                .mousemove(function(e) {
//                    var offset = $container.offset();
//                    var relativeY = ((e.pageY - offset.top) * multiplier) - ($container.data("origHeight") * multiplier);
//                    if (relativeY > $container.data("origHeight")) {
//                        $list.css("top", -relativeY + $container.data("origHeight"));
//                    };
//                });
//        }
        
    }, function() {
    
        var $el = $(this);
        
        // put things back to normal
        $el
            .height($(this).data("origHeight"))
            .find("ul")
//            .css({ top: 0 })
            .hide()
            .end()
            .find("a")
            .removeClass("hover");
    
    });  
   
    
    $(".dropdown > li >a").click(function() {
    	
    	
    	
        var $container =$(this).parent();
        
        $(".dropdown > li > ul").each(function(j,m){
			if(!$container.is($(this).parent())){
				$(this).hide();
			}
		});
        
        
        $list = $container.find("ul"),
        $anchor = $container.find("a"),
        height = $list.height() * 1.1,       // make sure there is enough room at the bottom
        multiplier = height / maxHeight;     // needs to move faster if list is taller
        
        $container.data("origHeight", $container.height());
        $anchor.addClass("hover");
//      $list.show().css({
//                paddingTop: $container.data("origHeight")
//            });
        $list.css({
            paddingTop: $container.data("origHeight")
        });
        $list.toggle();
   }); 
    
    $(document).click(function(e){
		e = window.event || e;
		var obj = e.srcElement || e.target;
//		if(!$(obj).is("#navId")) {
		if($(obj).attr('value') != "navLiA") {
			$(".dropdown > li > ul").each(function(j,m){
				$(this).hide();
			});
		}
	});
    
//    $("body").click(function(event){
//    	console.log(event.target.id);
//		if(event.target.id.indexOf("navId")==-1){
////			$("#toggle-con").hide();
//			$(".dropdown > li > ul").each(function(j,m){
//				$(this).hide();
//			});
//		}
//	});
    

});