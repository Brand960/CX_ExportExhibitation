//长时间不操作返回主页面
//  var maxTime = 10*60*1000; // seconds
//	var time = maxTime;
// 
//	document.body.addEventListener("mousemove", function() {
//		time = maxTime; // reset
//	}, false);
// 
//	var intervalId = setInterval(function() {
//		time--;
//		if(time <= 0) {
//			ShowInvalidLoginMessage();
//			clearInterval(intervalId);
//		}
//	}, 1000);
// 
//	function ShowInvalidLoginMessage() {
//		// 清除sessionstorage中的登录ID
//		// 退到登陆界面
//		window.localStorage.removeItem("loguserId");
//		window.location.href="main.html";
//	}

	
	window.onload = function (){
		 
		   (function($){
		     funObj = {
		       timeUserFun:'timeUserFun',
		     }
		     $[funObj.timeUserFun] = function(time){
		       var time = time || 2;
		       var userTime = time*60;
		       var objTime = {
		         init:0,
		         time:function(){
		           objTime.init += 1;
		           if(objTime.init == userTime){
//		             console.log(111) // 用户到达未操作事件 做一些处理
//					 alert("用户长时间没有操作页面,即将跳转到登录页面");
//		             window.location.href="closed.html";
		             top.location.href ="closed.html";
		           }
		         },
		         eventFun:function(){
		           clearInterval(testUser);
		           objTime.init = 0;
		           testUser = setInterval(objTime.time,1000);
		         }
		       }
		 
		       var testUser = setInterval(objTime.time,1000);
		 
		       var body = document.querySelector('html');
		       body.addEventListener("click",objTime.eventFun);
		       body.addEventListener("keydown",objTime.eventFun);
		       body.addEventListener("mousemove",objTime.eventFun);
		       body.addEventListener("mousewheel",objTime.eventFun);
		     }
		   })(window)
		 
		 
		//   直接调用 参数代表分钟数,可以有一位小数;
		    timeUserFun(10);
		 }

	
//底部导航菜单的跳转页面
function jumpBotMenu(path){
	 window.location.href=path;
}