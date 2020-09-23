function getQueryStringArgs() {
    var qs = (location.search.length>0 ? location.search.substring(1):""),
    args = {},
    items = qs.length ? qs.split("&") : [],
    item = null,
    name = null,
    value = null,
    i=0,
    len = items.length;
    for(i=0;i<len;i++){
        item = items[i].split("=");
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);//执行解码，因为中文字符串往往在传递时被编码过了
        if(name.length)
            args[name]=value;
 
    }
    return args;//args["userid"]=叶倩
 
}

$(function(){
	

	//获得数据
	getData();
	
	//饼状图下拉框时间区间-年
	selectVals();
	//饼状图下拉框时间区间-月
	selectValsMonth();
	
	 var html = "<div class='couActive'>全部</div>";
	//国家名称列表
	for(var p in couYearContainer){//遍历json对象的每个key/value对,p为key
		 html += "<div>"+p+"</div>";
	}
	$(".country").html(html);
	
	//国家切换
	$(".country > div").click(function(){
		$(".country > div").each(function(j,m){
			$(m).removeClass("couActive");
		});
		$(this).addClass("couActive");
		//加载数据
		//判断当前是年还是月
		if($($("#chartDiv_1 > .mode")[0]).attr("class").indexOf("tip") >= 0){
			chartYear($.trim($(this).html()));
		}else{
			chartMonth($.trim($(this).html()));
		}
		$(".md-close").click();
		$(".md-trigger").html("&nbsp;" + $(this).html() + "&nbsp;▾");
	});
	
	var country = getQueryStringArgs();
	if(country['country'] == undefined){
		//标准箱（TUN）
		chartYear("全部");	
	}else{
		chartYear(country['country']);
		$(".md-trigger").html("&nbsp;" + country['country'] + "&nbsp;▾");
		$(".country > div").each(function(j,m){
			$(m).removeClass("couActive");
			if($(m).html().indexOf(country['country']) >= 0){
				$(m).addClass("couActive");
			}
		});
	}
	
	
	//年月切换
	$("#chartDiv_1 > .mode").click(function(){
		$("#chartDiv_1 > .mode").each(function(j,m){
			$(m).removeClass("tip");
		});
		$(this).addClass("tip");
		var contryName = "全部";
		$(".country > div").each(function(j,m){
			if($(m).attr("class")!=undefined && $(m).attr("class").indexOf("couActive") >=0){
				contryName = $(m).html();
//				break;
			}
		});
		//加载数据
		if($($("#chartDiv_1 > .mode")[0]).attr("class").indexOf("tip") >= 0){
			chartYear(contryName);
		}else{
			chartMonth(contryName);
		}
	});
	
	
	
	//饼状图时间切换
	 $(".selClass").change(function(){
		//开始时间不能大于结束时间
		if($("#selectId_1").val() != null && $("#selectId_2").val() != null 
				&& parseInt($("#selectId_1").val()) > parseInt($("#selectId_2").val())){
			
			var html = $("#selectId_1").html();
			$('#selectId_1').html(html);
			$('#selectId_2').html(html);
			
			$("#selectId_1 option[value='"+beginYear+"']").attr("selected","selected"); 
			
			$("#selectId_2 option[value='"+endYear+"']").attr("selected","selected"); 
			
			alert("开始时间不能大于结束时间！");
		}else{
			var contryName = "全部";
			$(".country > div").each(function(j,m){
				if($(m).attr("class")!=undefined && $(m).attr("class").indexOf("couActive") >=0){
					contryName = $(m).html();
				}
			});
			//加载数据
			chartYear(contryName);
			beginYear = parseInt($("#selectId_1").val()) ;
			endYear = parseInt($("#selectId_2").val());
		}
	});
	//饼状图时间切换
	 $(".selClassMon").change(function(){
		//开始时间不能大于结束时间
		if($("#selectId_3").val() != null && $("#selectId_4").val() != null 
				&& parseInt($("#selectId_3").val()) > parseInt($("#selectId_4").val())){
			var html = $("#selectId_3").html();
			$('#selectId_3').html(html);
			$('#selectId_4').html(html);
			
			$("#selectId_3 option[value='"+bengin+"']").attr("selected","selected"); 
			
			$("#selectId_4 option[value='"+end+"']").attr("selected","selected"); 
			
			alert("开始时间不能大于结束时间！");
		}else{
			var contryName = "全部";
			$(".country > div").each(function(j,m){
				if($(m).attr("class")!=undefined && $(m).attr("class").indexOf("couActive") >=0){
					contryName = $(m).html();
				}
			});
			chartMonth(contryName);
			bengin = parseInt($("#selectId_3").val()) ;
			end = parseInt($("#selectId_4").val());
		}
	});
});

var beginYear = 2014 ;
var endYear = 2017;
//饼状图下拉框时间区间-年
function selectVals(){
	for(var p in couYearTypeNum){
		var json2 = couYearTypeNum[p];
		for(var p2 in json2){
			var json3 = json2[p2]
			for(var p3 in json3){
				if(p3.length <= 4){
					if(parseInt(p3) <= beginYear){
						beginYear = parseInt(p3);
					}
					if(parseInt(p3) >= endYear){
						endYear = parseInt(p3);
					}
				}
			}
		}
	}
	
	var html = "",html2="";
	for (var i = beginYear; i <= endYear; i++) {
		html += "<option value='"+i+"'>"+i+"</option>";
	}
	$('#selectId_1').html(html);
	$('#selectId_2').html(html);
	$("#selectId_2 option[value='"+endYear+"']").attr("selected","selected"); 
}

var bengin = 201403 ;
var end = 201712;
//饼状图下拉框时间区间-月
function selectValsMonth(){
	for(var p in couYearTypeNum){
		var json2 = couYearTypeNum[p];
		for(var p2 in json2){
			var json3 = json2[p2]
			for(var p3 in json3){
				if(p3.length > 4){
					if(parseInt(p3) <= bengin){
						bengin = parseInt(p3);
					}
					if(parseInt(p3) >= end){
						end = parseInt(p3);
					}
				}
			}
		}
	}
	var html = "";
	bengin = bengin + "";
	end = end + "";
	var beginYear = parseInt(bengin.substring(0,4));
	var beginMonth = parseInt(bengin.substring(4));
	var endYear = parseInt(end.substring(0,4));
	var endMonth = parseInt(end.substring(4));
	var res;
	for (var i = beginYear; i <= endYear; i++) {
		if(i == beginYear){
			for(var j=beginMonth;j<=12;j++){
				res = i + (j < 10 ? ("0" + j) : j + "");
				html += "<option value='"+res+"'>"+res+"</option>";
			}
		}else if(i == endYear){
			for(var j=1;j<=endMonth;j++){
				res = i + (j < 10 ? ("0" + j) : j + "");
				html += "<option value='"+res+"'>"+res+"</option>";
			}
		}else{
			for(var j=1;j<=12;j++){
				res = i + (j < 10 ? ("0" + j) : j + "");
				html += "<option value='"+res+"'>"+res+"</option>";
			}
		}
	}
	$('#selectId_3').html(html);
	$('#selectId_4').html(html);
	$("#selectId_4 option[value='"+end+"']").attr("selected","selected");
}
var chart ;
//按年
function chartYear(countryName){
	
	var YearContainer_1,YearTonnage_1,YearAmount_1;
	//类型
	var typeRes = {};
	var beginSel = parseInt($('#selectId_1').val());
	var endSel = parseInt($('#selectId_2').val());
	$('#divSelId_1').css("display","block");
	$('#divSelId_2').css("display","block");
	$('#divSelId_3').css("display","none");
	$('#divSelId_4').css("display","none");
	
	if(countryName.indexOf("全部") >= 0){
		YearContainer_1 = YearContainer;
		YearTonnage_1 = YearTonnage;
		YearAmount_1= YearAmount;
		//类型
		for(var p in couYearTypeNum){
			var json2 = couYearTypeNum[p];
			for(var p2 in json2){
				if(typeRes[p2] == undefined){
					typeRes[p2] = 0;
				}
				var json3 = json2[p2]
				for(var p3 in json3){
					if(p3.length <= 4 && parseInt(p3) >= beginSel && parseInt(p3) <= endSel){
						typeRes[p2] +=  json3[p3];
					}
				}
			}
		}
	}else{
		YearContainer_1 = couYearContainer[countryName];
		YearTonnage_1 = couYearTonnage[countryName];
		YearAmount_1= couYearAmount[countryName];
		var couYearTypeNum_1 = couYearTypeNum[countryName];
		var YearContainer_2 = {},YearTonnage_2 = {},YearAmount_2 = {},couYearTypeNum_2 = {};
		for(var p in YearContainer_1){
			if(p.length <= 4){
				YearContainer_2[p] = YearContainer_1[p]
			}
		}
		for(var p in YearTonnage_1){
			if(p.length <= 4){
				YearTonnage_2[p] = YearTonnage_1[p]
			}
		}
		for(var p in YearAmount_1){
			if(p.length <= 4){
				YearAmount_2[p] = YearAmount_1[p]
			}
		}
		
		typeRes = {};
		for(var p in couYearTypeNum_1){
			var json2 = couYearTypeNum_1[p];
			typeRes[p] = 0;
			
			for(var p2 in json2){
				if(p2.length <= 4  && parseInt(p2) >= beginSel && parseInt(p2) <= endSel){
					typeRes[p] +=  json2[p2];
				}
			}
		}
		YearContainer_1 = YearContainer_2;
		YearTonnage_1 = YearTonnage_2;
		YearAmount_1= YearAmount_2;
		
	}

	var option = {
			 title: {
			        text: '进口标准箱（TUN）'
			    },
			    tooltip: {
			        trigger: 'axis',
			        axisPointer: {
			            type: 'cross',
			            crossStyle: {
			                color: '#999'
			            }
			        }
			    },
			    grid:{
		            x:130,
		            y:50,
		            x2:10,
		            y2:50,
		            borderWidth:1
		        },
		        dataZoom: [
			               {
			                   show: false,
			               }
			           ],
			    xAxis: [
			        {
			            type: 'category',
			            data: ["2014", "2015", "2016", "2017"],
			            axisPointer: {
			                type: 'shadow'
			            }
//			        , axisLabel:{ //调整x轴的lable  
//			            textStyle:{
//			                fontSize:20 // 让字体变大
//			            }
//			        }
			        }
			        
			    ],
			    yAxis: [
			        {
			            type: 'value',
//			            name: '数量',
			            axisLabel: {
			                formatter: '{value} '
			            }
//			        , axisLabel:{ //调整x轴的lable  
//			            textStyle:{
//			                fontSize:20 // 让字体变大
//			            }
//			        }
			        }
			    ],
			    series: [
			        {
			            name:'标准箱（TUN）',
			            type:'bar',
			            data:[84128, 363066],
			            itemStyle: {
				            normal: {
				                barBorderRadius: 0,
				                color: new echarts.graphic.LinearGradient(
				                    0, 0, 0, 1,
				                    [
//				                        {offset: 0, color: '#D8A867'},
				                        {offset: 1, color: '#04CB94'}
				                    ]
				                )
				            }
					        
				        }
			        }
			    ]
			};
	//年，箱
	var data1 = [];
	var data2 = [];
	
	

	chart = echarts.init(document.getElementById('chartId_5'),"shine");
	for(var p in YearContainer_1){//遍历json对象的每个key/value对,p为key
		  data1.push(p);
		  data2.push(parseInt(YearContainer_1[p]));
	}
	option.xAxis[0].data= data1;
	option.series[0].data = data2;
	chart.setOption(option);

	chart = echarts.init(document.getElementById('chartId_2'),"shine");
	option.title.text = "重量（KG）";
	option.series[0].name = "重量（KG）"
	var  itemStyle = {
            normal: {
                barBorderRadius: 0,
                color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
//	                        {offset: 0, color: '#D8A867'},
                        {offset: 1, color: '#1DD2C6'}
                    ]
                )
            }
        }
	
	option.series[0].itemStyle = itemStyle;
	
	data1 = [];
	data2 = [];
	for(var p in YearTonnage_1){//遍历json对象的每个key/value对,p为key
		  data1.push(p);
		  data2.push(parseInt(YearTonnage_1[p]));
	}
	option.xAxis[0].data= data1;
	option.series[0].data = data2;
	chart.setOption(option);
	
	
	chart = echarts.init(document.getElementById('chartId_3'),"shine");
	option.title.text = "金额（USD）";
	option.series[0].name = "金额（USD）";
	itemStyle = {
            normal: {
                barBorderRadius: 0,
                color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
//	                        {offset: 0, color: '#D8A867'},
                        {offset: 1, color: '#1EB8F7'}
                    ]
                )
            }
        }
	option.series[0].itemStyle = itemStyle;
	data1 = [];
	data2 = [];
	for(var p in YearAmount_1){//遍历json对象的每个key/value对,p为key
		  data1.push(p);
		  data2.push(parseInt(YearAmount_1[p]));
	}
	option.xAxis[0].data= data1;
	option.series[0].data = data2;
	//月，箱
	chart.setOption(option);
	
	//饼状图-年
	pieYear(typeRes);
}

//饼状图-年
function pieYear(typeRes){
	option = {
//		    title : {
//		        text: '商品占比',
//		        x:  '5%' ,
//		        y: '0%' ,
//		        textStyle:{
//		        	color: '#333'
//		        }
//		        
//		    },
		    tooltip : {
		        trigger: 'item',
//		        show:false,
//		        triggerOn: 'click',
		        formatter: "{b} : {c} ({d}%)"
//		       formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		    	 type: 'scroll',
		        orient: 'vertical',
		        x:  '10%' ,
		        y: '0%' ,
				top:50,
				bottom: 50,
				 pageIconSize: 40,
				 itemHeight   : 30,
				 itemWidth   : 50,
				 
//				 selectedMode:false,  
//				 formatter: function (name) {
//				        return echarts.format.truncateText(name, 40, '14px Microsoft Yahei', '…');
//				    },	
//				 tooltip: {
//				        show: true
//				    },
//				 triggerOn: "mousemove",
//				 triggerOn: "mousemove|click",
		        data: ['菠萝','冻鸡肉','冻牛肉','冻猪肉','火龙果','猕猴桃','奶粉','啤酒','其他']
		    },
		    series : [
		        {
		            name: '商品占比',
		            type: 'pie',
		            radius : '90%',
		            center: ['55%', '50%'],
					label : {
						show : false
					},
		            labelLine:{  //指示线长度
		                normal:{  
		                    length:0  
							,show: false
		                }  
						
		            },  
						
		            data:[
		                {value:335, name:'菠萝'},
		                {value:310, name:'冻鸡肉'},
		                {value:234, name:'冻牛肉'},
		                {value:135, name:'冻猪肉'},
		                {value:335, name:'火龙果'},
		                {value:310, name:'猕猴桃'},
		                {value:234, name:'奶粉'},
		                {value:135, name:'啤酒'},
		                {value:148, name:'其他'}
		            ],
		            itemStyle: {
		                emphasis: {
		                    shadowBlur: 10,
		                    shadowOffsetX: 0,
		                    shadowColor: 'rgba(0, 0, 0, 0.5)'
							
		                }
			
		            }
					
		        }
		    ]
		};
	chart = echarts.init(document.getElementById('chartId_4'),"infographic");
	data1 = [];
	data2 = [];
	var total = 0;
	for(var p in typeRes){//遍历json对象的每个key/value对,p为key
		total += typeRes[p];
		  data1.push(p);
		  data2.push({
			  value:parseInt(typeRes[p]),
			  name:p
		  });
	}
	console.log(data2);
	option.legend.data= data1;
	option.series[0].data = data2;

	chart.setOption(option);
	
	
	

//   
//    //定义一个开关，第一次点击的时候才翻转。当所有都被选择的时候，再次点击不会只显示一个。
    var index = 0;
    chart.on('legendselectchanged', function(params) {
    	
    	this.dispatchAction({type: 'downplay',seriesIndex: 0,dataIndex: index});
    	var option = this.getOption();
    	option.legend[0].selected[params.name] = true;
        this.setOption(option);

        var select_key = Object.keys(params.selected);
        var select_value = Object.values(params.selected);
        var clickNum = 0;
      for(var i=0;i<select_value.length;i++){
 	   if(select_value[i] == false){
 		 index = i;
 		clickNum = option.series[0].data[i].value;
 	   }
    }
      getMousePos(clickNum,total);
        var a = this;
        setTimeout(function(){
        	a.dispatchAction({type: 'highlight',seriesIndex: 0,dataIndex: index});
        }, 500);
        
       
    });

    chart.on('mouseover',function(e){        
		$("#showLenDataId").css("dispaly","none");
		});
////
    chart.on('mouseout',function(e){
    	$("#showLenDataId").css("display","none");
    	});

    chart.on('click',function(e){
    		$("#showLenDataId").css("display","none");
     });
}

function getMousePos(clickNum,total) {
 e = arguments.callee.caller.arguments[0] || window.event;
e = event || window.event;
clickNum = parseInt(clickNum);
total = parseInt(total);
$("#showLenDataId").html(clickNum + " ("+((clickNum/total*100).toFixed(2))+ "%)").css("display","block");
$("#showLenDataId").css("top",e.clientY-200).css("left",e.clientX-150);
}



//按月
function chartMonth(countryName){
//	selectValsMonth(201403,201710);
	var monthContainer_1,monthTonnage_1,monthAmount_1;
	var typeRes = {};
	var beginSel = parseInt($('#selectId_3').val());
	var endSel = parseInt($('#selectId_4').val());
//	$('#divSelId_3').css("display","block");
//	$('#divSelId_4').css("display","block");
//	$('#divSelId_1').css("display","none");
//	$('#divSelId_2').css("display","none");
	console.log(couYearTypeNum);
	if(countryName.indexOf("全部") >= 0){
		monthContainer_1 = monthContainer;
		monthTonnage_1 = monthTonnage;
		monthAmount_1= monthAmount;
		
		//类型
		for(var p in couYearTypeNum){
			var json2 = couYearTypeNum[p];
			for(var p2 in json2){
				if(typeRes[p2] == undefined){
					typeRes[p2] = 0;
				}
				var json3 = json2[p2]
				for(var p3 in json3){
					if(p3.length > 4 && parseInt(p3) >= beginSel && parseInt(p3) <= endSel){
						typeRes[p2] +=  json3[p3];
					}
				}
			}
		}
	}else{
		monthContainer_1 = couYearContainer[countryName];
		monthTonnage_1 = couYearTonnage[countryName];
		monthAmount_1= couYearAmount[countryName];
		var couYearTypeNum_1 = couYearTypeNum[countryName];
		var monthContainer_2 = {},monthTonnage_2 = {},monthAmount_2 = {};
		for(var p in monthContainer_1){
			if(p.length > 4){
				monthContainer_2[p] = monthContainer_1[p]
			}
		}
		for(var p in monthTonnage_1){
			if(p.length > 4){
				monthTonnage_2[p] = monthTonnage_1[p]
			}
		}
		for(var p in monthAmount_1){
			if(p.length > 4){
				monthAmount_2[p] = monthAmount_1[p]
			}
		}
		monthContainer_1 = monthContainer_2;
		monthTonnage_1 = monthTonnage_2;
		monthAmount_1= monthAmount_2;
		
		typeRes = {};
		for(var p in couYearTypeNum_1){
			var json2 = couYearTypeNum_1[p];
			typeRes[p] = 0;
			
			for(var p2 in json2){
				if(p2.length > 4  && parseInt(p2) >= beginSel && parseInt(p2) <= endSel){
					typeRes[p] +=  json2[p2];
				}
			}
		}
	}
	
	
	var option = {
			 title: {
			        text: '进口标准箱（TUN）'
			    },
			    tooltip: {
			        trigger: 'axis',
			        axisPointer: {
			            type: 'cross',
			            crossStyle: {
			                color: '#999'
			            }
			        }
			    },
			    
			    xAxis: [
			        {
			            type: 'category',
			            data: ['201403','201403','201403','201403','201403','201403','201403','201403','201403','201403','201403','201403','201403',
			                   '201403','201403','201403','201403','201403','201403','201403','201403','201403','201403','201403','201403','201403',
			                   '201403','201403','201403','201403','201403','201403','201403','201403','201403','201403','201403','201403','201403',
			                   '201403','201403','201403','201403','201403','201403','201403','201403','201403','201403','201403','201403','201403'],
			            axisPointer: {
			                type: 'shadow'
			            }
//			        , axisLabel:{ //调整x轴的lable  
//			            textStyle:{
//			                fontSize:20 // 让字体变大
//			            }
//			        }
			        }
			        
			    ],
			    yAxis: [
			        {
			            type: 'value',
//			            name: '数量',
			            axisLabel: {
			                formatter: '{value} '
			            }
			        
//			        , axisLabel:{ //调整x轴的lable  
//			            textStyle:{
//			                fontSize:20 // 让字体变大
//			            }
//			        }
			        }
			    ],
			    grid:{
		            x:130,
		            y:50,
		            x2:16,
		            y2:60,
		            borderWidth:1
		        },
			    dataZoom: [
			               {
			                   show: true,
			                   start: 0,
			                   end: 100
//			                   ,handleSize: 40
//			                   ,handleIcon:"M0,0 v9.7h5 v-9.7h-5 Z",
//			                   backgroundColor:"#f7f7f7",
			                   ,handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
			                   handleSize: '100%',
			               }
			               
			           ],
			    series: [
			        {
			            name:'标准箱（TUN）',
			            type:'bar',
			            data:[ 23.2, 25.6, 76.7, 135.6, 162.2, 25.6, 76.7, 135.6, 162.2, 25.6, 76.7, 135.6, 
			                   23.2, 25.6, 76.7, 135.6, 162.2, 25.6, 76.7, 135.6, 162.2, 25.6, 76.7, 135.6,
			                   23.2, 25.6, 76.7, 135.6, 162.2, 25.6, 76.7, 135.6, 162.2, 25.6, 76.7, 135.6,
			                   23.2, 25.6, 76.7, 135.6, 162.2, 25.6, 76.7, 135.6, 162.2, 25.6, 76.7, 135.6],
			            itemStyle: {
				            normal: {
				                barBorderRadius: 0,
				                color: new echarts.graphic.LinearGradient(
				                    0, 0, 0, 1,
				                    [
//				                        {offset: 0, color: '#D8A867'},
				                        {offset: 1, color: '#04CB94'}
				                    ]
				                )
				            }
				        }
			        }
			    ]
			};
	chart = echarts.init(document.getElementById('chartId_5'),"shine");
	
	
	//月，箱
	var data1 = [];
	var data2 = [];
	for(var p in monthContainer_1){//遍历json对象的每个key/value对,p为key
		  data1.push(p);
		  data2.push(parseInt(monthContainer_1[p]));
	}
	option.xAxis[0].data= data1;
	option.series[0].data = data2;
	
	
	chart.setOption(option);
	
	chart = echarts.init(document.getElementById('chartId_2'),"shine");
	option.title.text = "重量（吨）"
	var  itemStyle = {
            normal: {
                barBorderRadius: 0,
                color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
//	                        {offset: 0, color: '#D8A867'},
                        {offset: 1, color: '#1DD2C6'}
                    ]
                )
            }
        }
	option.series[0].itemStyle = itemStyle;
	
	
	data1 = [];
	data2 = [];
	for(var p in monthTonnage_1){//遍历json对象的每个key/value对,p为key
		  data1.push(p);
		  data2.push(parseInt(monthTonnage_1[p]));
	}
	option.xAxis[0].data= data1;
	option.series[0].data = data2;
	
	chart.setOption(option);
	
	chart = echarts.init(document.getElementById('chartId_3'),"shine");
	option.title.text = "金额USD（吨）"
	itemStyle = {
            normal: {
                barBorderRadius: 0,
                color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
//	                        {offset: 0, color: '#D8A867'},
                        {offset: 1, color: '#1EB8F7'}
                    ]
                )
            }
        }
	option.series[0].itemStyle = itemStyle;
	
	//月，金额
	data1 = [];
	data2 = [];
	for(var p in monthAmount_1){//遍历json对象的每个key/value对,p为key
		  data1.push(p);
		  data2.push(parseInt(monthAmount_1[p]));
	}
	option.xAxis[0].data= data1;
	option.series[0].data = data2;
	chart.setOption(option);
	
	//饼状图-月
	pieYear(typeRes);
}


//年，箱
var YearContainer = {"2014":0};
//年,吨
var YearTonnage = {"2014":0};
//年,金额
var YearAmount = {"2014":0};
//月，箱
var monthContainer = {
					"201403":0
}
//月，吨数
var monthTonnage = {
					"201403":0
}
//月，金额
var monthAmount = {
					"201403":0
}
//国家，年，月，箱
var couYearContainer = {
		"菲律宾":{
			"2014":0,"201502":0
		}
};
//国家，年，月，重量
var couYearTonnage = {
		"菲律宾":{
			"2014":0,"201502":0
		}
};
//国家，年，月，金额
var couYearAmount = {
		"菲律宾":{
			"2014":0,"201502":0
		}
};
//国家，年，月，类型,数量
var couYearTypeNum = {
};


//var couYearTypeNum = {
//"菲律宾":{
//		"冻猪肉":{
//			"2014":0,"201502":0
//		}
//	}
//};	
//获得数据
function getData(){
	for(var i=0;i<dataVal.length;i++){
		var str = dataVal[i].split("	");
//		for(var j=0;j<str.length;j++){
//年，箱柱状图
			if(YearContainer[str[8]] == undefined){
				YearContainer[str[8]] = 0;
			}
			YearContainer[str[8]] = YearContainer[str[8]] + parseInt(str[2]);
//年，吨
			if(YearTonnage[str[8]] == undefined){
				YearTonnage[str[8]] = 0;
			}
			YearTonnage[str[8]] = YearTonnage[str[8]] + parseFloat(str[4].replace(",",""));	
//年,金额		
			if(YearAmount[str[8]] == undefined){
				YearAmount[str[8]] = 0;
			}
			YearAmount[str[8]] = YearAmount[str[8]] + parseFloat(str[5].replace(",",""));	
//月，箱		
			if(monthContainer[str[9]] == undefined){
				monthContainer[str[9]] = 0;
			}
			monthContainer[str[9]] = monthContainer[str[9]] + parseInt(str[2]);
//月，吨数	
			if(monthTonnage[str[9]] == undefined){
				monthTonnage[str[9]] = 0;
			}
			monthTonnage[str[9]] = monthTonnage[str[9]] + parseFloat(str[4].replace(",",""));
//月，金额	
			if(monthAmount[str[9]] == undefined){
				monthAmount[str[9]] = 0;
			}
			monthAmount[str[9]] = monthAmount[str[9]] + parseFloat(str[5].replace(",",""));
//国家，年，箱		
			var CYC = str[8];
			var CYM = str[9];
			if(couYearContainer[str[6]] == undefined){
				couYearContainer[str[6]] = {
//						CYC : parseInt(str[2]),
//						CYM : parseInt(str[2])
					}; 
			}
			
			//年
			if(couYearContainer[str[6]][str[8]] ==  undefined){
				couYearContainer[str[6]][str[8]] = parseInt(str[2]);
			}else{
				couYearContainer[str[6]][str[8]] += parseInt(str[2]);
			}
			//月
			if(couYearContainer[str[6]][str[9]] ==  undefined){
				couYearContainer[str[6]][str[9]] = parseInt(str[2]);
			}else{
				couYearContainer[str[6]][str[9]] += parseInt(str[2]);
			}
			
//国家，年，月，重量	
			if(couYearTonnage[str[6]] == undefined){
				couYearTonnage[str[6]] = {
//						CYC : parseInt(str[4]),
//						CYM : parseInt(str[4])
					}; 
			}
			//年
			if(couYearTonnage[str[6]][str[8]] ==  undefined){
				couYearTonnage[str[6]][str[8]] = parseFloat(str[4].replace(",",""));
			}else{
				couYearTonnage[str[6]][str[8]] += parseFloat(str[4].replace(",",""));
			}
			//月
			if(couYearTonnage[str[6]][str[9]] ==  undefined){
				couYearTonnage[str[6]][str[9]] = parseFloat(str[4].replace(",",""));
			}else{
				couYearTonnage[str[6]][str[9]] += parseFloat(str[4].replace(",",""));
			}
//国家，年，月，金额			
			if(couYearAmount[str[6]] == undefined){
				couYearAmount[str[6]] = {
//						CYC : parseInt(str[4]),
//						CYM : parseInt(str[4])
					}; 
			}
			//年
			if(couYearAmount[str[6]][str[8]] ==  undefined){
				couYearAmount[str[6]][str[8]] = parseFloat(str[5].replace(",",""));
			}else{
				couYearAmount[str[6]][str[8]] += parseFloat(str[5].replace(",",""));
			}
			//月
			if(couYearAmount[str[6]][str[9]] ==  undefined){
				couYearAmount[str[6]][str[9]] = parseFloat(str[5].replace(",",""));
			}else{
				couYearAmount[str[6]][str[9]] += parseFloat(str[5].replace(",",""));
			}
			//国家，年，月，类型,数量
			//var couYearTypeNum = {
//					"菲律宾":{
//							"冻猪肉":{
//								"2014":0,"201502":0
//							}
//					}
			//};		
//国家，年，月，类型,数量
			if(couYearTypeNum[str[6]] == undefined){
				couYearTypeNum[str[6]] = {}; 
			}
			//类型
			if(couYearTypeNum[str[6]][str[3]] ==  undefined){
				couYearTypeNum[str[6]][str[3]] = {};
			}
//			//年
			if(couYearTypeNum[str[6]][str[3]][str[8]] ==  undefined){
				couYearTypeNum[str[6]][str[3]][str[8]] = parseFloat(str[4].replace(",",""));
			}else{
				couYearTypeNum[str[6]][str[3]][str[8]] += parseFloat(str[4].replace(",",""));
			}
			//月
			if(couYearTypeNum[str[6]][str[3]][str[9]] ==  undefined){
				couYearTypeNum[str[6]][str[3]][str[9]] = parseFloat(str[4].replace(",",""));
			}else{
				couYearTypeNum[str[6]][str[3]][str[9]] += parseFloat(str[4].replace(",",""));
			}
			
			
//		}
	}
//	console.log(couYearTypeNum);
}


