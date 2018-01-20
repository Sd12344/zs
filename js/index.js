/*
* @Author: zs129
* @Date:   2018-01-19 11:17:42
* @Last Modified by:   zs129
* @Last Modified time: 2018-01-20 15:27:34
*/
var weather;
var city;
// 请求太原天气情况
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
	dataType:"jsonp",
	type:"get",
	success:function(obj){
		weather=obj.data.weather;
		console.log(weather);
	}
})
// 请求城市天气
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/city/",
	dataType:"jsonp",
	type:"get",
	success:function(obj){
		city=obj.data;
		 console.log(obj.data);
	}
})
// 渲染数据
function updata(){
	// 渲染城市
      var cityName=document.getElementsByClassName("header")[0];
   cityName.innerHTML=weather.city_name;
   // 渲染当前温度
      var currentTemperature=document.getElementsByClassName("du")[0];
   currentTemperature.innerHTML=weather.current_temperature+"°";
   // 当前天气状况
      var datCondition=document.getElementsByClassName("qing")[0];
   datCondition.innerHTML=weather.dat_condition;
   // 今天最高温和最低温
     var dat_high_temperature=document.getElementById("dat_high_temperature");
     dat_high_temperature.innerHTML=weather.dat_high_temperature;
     var dat_low_temperature=document.getElementById("dat_low_temperature");
     dat_low_temperature.innerHTML=weather.dat_low_temperature;
     // 明天最
      var tomorrow_high_temperature=document.getElementById("tomorrow_high_temperature");
     tomorrow_high_temperature.innerHTML=weather.tomorrow_high_temperature;
      var tomorrow_low_temperature=document.getElementById("tomorrow_low_temperature");
     tomorrow_low_temperature.innerHTML=weather.tomorrow_low_temperature;
       var datCondition=document.getElementsByClassName("weather")[0];
   datCondition.innerHTML=weather.dat_condition;
   // 今天icon
   var dat_weather_icon_id=document.getElementById("dat_weather_icon_id");
   dat_weather_icon_id.style=`background-image:url(img/${weather.dat_weather_icon_id}.png);`;
    var tomorrow_weather_icon_id=document.getElementById("tomorrow_weather_icon_id");
   tomorrow_weather_icon_id.style=`background-image:url(img/${weather.tomorrow_weather_icon_id}.png);`;

   for(var i in weather.hourly_forecast){
   	// 创建父元素div
   	var now=document.createElement("div");
   	// 给父元素div加样式
   	now.className="now";
   	// 获取now的父元素
   	var nowp=document.getElementById("now");
   	// 把now插入
   	nowp.appendChild(now);

   	var now_time=document.createElement("h2");
    now_time.className="now_time";
    now_time.innerHTML=weather.hourly_forecast[i].hour+":00";
   	now.appendChild(now_time);

   	var now_pic=document.createElement("div");
   	now_pic.className="now_pic";
   	now_pic.style=`background-image:url(img/${weather.hourly_forecast[i].weather_icon_id}.png)`;
   	now.appendChild(now_pic);
   	var now_temperature=document.createElement("h3");
    now_temperature.className="now_temperature";
    var currentTemperature=document.getElementsByClassName("now_temperature")[0];
    now_temperature.innerHTML=weather.hourly_forecast[i].temperature+"°";
   	now.appendChild(now_temperature);
    }

    for(var j in weather.forecast_list){
   	// 创建父元素div
   	var box=document.createElement("div");
   	// 给父元素div加样式
   	box.className="box";
   	// 获取dox的父元素
   	var boxp=document.getElementById("box");
   	// 把now插入
   	boxp.appendChild(box);

	var box_time=document.createElement("div");
   box_time.className="box_time";
    box_time.innerHTML=weather.forecast_list[j].date.substring(5,7)+"/"+weather.forecast_list[j].date.substring(8);
      // console.log(weather.forecast_list[j].date.substring(8));
   	box.appendChild(box_time);

   	var box_wea=document.createElement("h2");
    box_wea.className="box_wea";
    box_wea.innerHTML=weather.forecast_list[j].condition;
   	box.appendChild(box_wea);

   	var box_pic=document.createElement("div");
   	box_pic.className="box_pic";
    box_pic.style=`background-image:url(img/${weather.forecast_list[j].weather_icon_id}.png);`;
   	box.appendChild(box_pic);

   	var box_high=document.createElement("h3");
    box_high.className="box_high";
    var currentTemperature=document.getElementsByClassName("box_high")[0];
    box_high.innerHTML=weather.forecast_list[j].high_temperature+"°";
   	box.appendChild(box_high);

   	var box_low=document.createElement("h4");
    box_low.className="box_low";
    var currentTemperature=document.getElementsByClassName("box_low")[0];
    box_low.innerHTML=weather.forecast_list[j].low_temperature+"°";
   	box.appendChild(box_low);

   	var box_wind=document.createElement("h5");
    box_wind.className="box_wind";
    var currentTemperature=document.getElementsByClassName("box_wind")[0];
    box_wind.innerHTML=weather.forecast_list[j].wind_direction;
   	box.appendChild(box_wind);

   	var box_level=document.createElement("h6");
    box_level.className="box_level";
    var currentTemperature=document.getElementsByClassName("box_level")[0];
    box_level.innerHTML=weather.forecast_list[j].wind_level+"级";
   	box.appendChild(box_level);
     }
     var header=document.getElementsByClassName("header")[0];
     var city_box=document.getElementsByClassName("city_box")[0];
     header.onclick=function(){
     	$(".text").val("");
     	$(".button").html("取消");
     	city_box.style="display:block";
     }
     for(var k in city){
     	console.log(k);
     	var cityp=document.getElementById("city");

     	var title=document.createElement("h1")
     	title.className="title";
     	title.innerHTML=k;
     	cityp.appendChild(title);
     	var con=document.createElement("div");
     	 con.className="con";
     	for(var y in city[k]){
     		console.log(y);
     		var erji=document.createElement("div");
     	 erji.className="son";
     	 erji.innerHTML=y;
     	 con.appendChild(erji);
     	}
     	cityp.appendChild(con);
     }
}
function AJAX(str){
	$.ajax({
	url:`https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`,
	dataType:"jsonp",
	type:"get",
	success:function(obj){
		weather=obj.data.weather;
		// console.log(weather);
		updata();
		$(".city_box").css({"display":"none"});
	}
})

}
// 当页面加载完成执行的代码
window.onload=function(){
   updata();
   $(".son").on("click",function(){
  var cityh=this.innerHTML;
  AJAX(cityh);
   })
   // 当input获取焦点，button变确认
   // focus 获取焦点
   // html 设置或改变元素的内容
   $(".text").on("focus",function(){
   	$(".button").html("确认");
   })
   var button=document.getElementsByClassName("button")[0];
   console.log(button);
   button.onclick=function(){
   	// console.log(1);
   	// 获取button中的内容
   	  var btn=this.innerHTML;
   	  // console.log(btn);
   	  if(btn=="取消"){
   	
   	  	// console.log(1);
   	    var city_box=document.getElementsByClassName("city_box")[0];
   	    city_box.style="display:none";
   	  }
   	  else{
   	  	var str=document.getElementsByClassName("text")[0].value;
   	  	// console.log(str);
   	  	for(var i in city){
   	  		if(i==str){
   	  			AJAX(str);
   	  			return ;
   	  		}
   	  		else{
   	  			for(var j in city[i]){
   	  				if(j==str){
   	  					AJAX(str);
   	  					return;
   	  				}
   	  			}
   	  		}
   	  	}
   	  	alert("没有该城市的气象信息");

   	  }
   }
}


