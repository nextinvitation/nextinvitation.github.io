// 百度地图API功能
var map = new BMap.Map("container");    // 创建Map实例
var point=new BMap.Point(120.1414,30.257807);
map.centerAndZoom(point,15);  // 初始化地图,设置中心点坐标和地图级别
map.addControl(new BMap.NavigationControl());
map.addControl(new BMap.ScaleControl());
map.addControl(new BMap.OverviewMapControl());
map.addControl(new BMap.MapTypeControl());
map.enableScrollWheelZoom(true);
/*map.addEventListener("click", function (e) {//点击事件坐标
 alert("鼠标当前x位置:" + e.point.lng + ", " + "鼠标当前y位置:" + e.point.lat + "缩放等级:" + this.getZoom());
 });*/
/*window.setTimeout(function() {//2s后跳到某一坐标
 map.panTo(new BMap.Point(120.017407,30.295429));
 }, 3000);*/
function hotel(){
    mid = false;
}

//周边搜索
var local = new BMap.LocalSearch(map, {
    pageCapacity: 6,
    renderOptions: {
        map: map,
        panel: "result",
        autoViewport: true
    }
});
local.searchNearby("宾馆", "西湖",3000);

var circle = new BMap.Circle(point,3000,{fillColor:"blue", strokeWeight: 1 ,fillOpacity: 0.3, strokeOpacity: 0.3});
map.addOverlay(circle);

/*
 //矩形搜索
 var pStart = new BMap.Point(120.123011,30.263033);
 var pEnd = new BMap.Point(120.186288,30.235048);
 var bs = new BMap.Bounds(pStart,pEnd); //自己规定范围
 local.searchInBounds("宾馆", bs);
 */


var transit=new BMap.TransitRoute(map, {
    renderOptions: {
        map: map,
        panel: "route"
    }
});
local.searchNearby("宾馆", "西湖",1000);

hznu=new BMap.Point(120.019973,30.294177);

var markerArr=[];
local.setMarkersSetCallback(function(points){
    for(var i=0;i<points.length;i++){
        markerArr[i]=points[i].marker;
        points[i].marker.addEventListener("click", function(e){
            transit.clearResults();
            transit.search(hznu,this.z.title);
        });

    }
});


function school(){// 中心转到杭师大
    mid = true;
    var point = new BMap.Point(120.017226 , 30.2959);
    map.centerAndZoom(point,18);
}

var date_info = [
    [120.017407,30.295429,"食堂"],
    [120.015161,30.296427,"博文苑8号楼"],
    [120.020641,30.295702,"恕园2号楼"],
    [120.017717,30.296684,"恕园19号楼"],
    [120.013208,30.29502,"田径场"],
    [120.015355,30.295605,"足球场"],
    [120.017924,30.29573, "恕园7号楼食堂"],
    [120.019406,30.295297,"恕园7号楼彩色玻璃房110服务中心"],
    [120.016945,30.297671,"篮球场"],
];
var opts = {
    width: 200, // 信息窗口宽度
    height: 200, // 信息窗口高度
    title: "<span style='color:#070000'>"+"地址：", // 信息窗口标题
}

for(var i = 0;i < date_info.length;i++){
    var point= new BMap.Marker(new BMap.Point(date_info[i][0],date_info[i][1]));
    var address = date_info[i][2];
    var box=document.createElement("div");
    box.style.width='200px';
    box.style.height='200px';
    var img=document.createElement("img");
    img.style.width='200px';
    img.style.height='150px';
    img.src='img/1.jpg';
    box.append(address);
    box.append(img);
    map.addOverlay(point);
    OnClick(box,point);
}

function OnClick(box,point){
    point.addEventListener("click",function(e){
        var p = e.target;
        var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
        var infoWindow = new BMap.InfoWindow(box,opts);
        map.openInfoWindow(infoWindow,point);
    });
}

/*var infoWindow = new BMap.InfoWindow("World", opts); // 创建信息窗口对象
map.openInfoWindow(infoWindow, map.getCenter()); // 打开信息窗口*/


/*



//公交路线
var transit = new BMap.TransitRoute(map, {
    renderOptions: {
        map: map,
        panel: "results"
    }
});
transit.search("杭州师范大学仓前", "西湖");
*/

/*
 var myIcon = new BMap.Icon("image/red.gif", new BMap.Size(23, 25), { offset: new BMap.Size(0, 0)});
 var marker2 = new BMap.Marker(point1,{icon:myIcon});
 map.addOverlay(marker);
 label.setStyle({
 paddingLeft:"12px",  //给label设置样式，任意的CSS都是可以的
 fontSize:"12px", //字号
 border:"0", //边
 height:"50px", //高度
 width:"280px", //宽
 textAlign:"top", //文字水平居中显示
 lineHeight:"30px", //行高，文字垂直居中显示
 background:"url(img/1.png) no-repeat", //背景图片
 cursor:"pointer"
 });
 marker.setLabel(label);*/


