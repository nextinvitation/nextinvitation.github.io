// 百度地图API功能
var map = new BMap.Map("map");    // 创建Map实例
var point=new BMap.Point(120.1414,30.257807);
map.centerAndZoom(point,15);  // 初始化地图,设置中心点坐标和地图级别
map.addControl(new BMap.NavigationControl());
map.addControl(new BMap.ScaleControl());
map.addControl(new BMap.OverviewMapControl());
map.addControl(new BMap.MapTypeControl());
map.enableScrollWheelZoom(true);


// var marker=new BMap.Marker(point);
// map.addOverlay(marker);
// marker.enableDragging();
// marker.addEventListener("dragend", function(e){
//  alert("当前位置：" + e.point.lng + ", " + e.point.lat);
// })

var local = new BMap.LocalSearch(map, {
    pageCapacity: 6,
    renderOptions: {
        map: map,
        panel: "result",
        autoViewport: true
    }
});
local.searchNearby("宾馆", "西湖",3000);

// 通过参数e得到点击的经纬度坐标
// map.addEventListener("click", function(e){
//  alert(e.point.lng + ", " + e.point.lat);
// });

var transit=new BMap.TransitRoute(map, {
    renderOptions: {
        map: map,
        panel: "route"
    }
});
local.searchNearby("宾馆", "西湖",1000);

hznu=new BMap.Point(120.019973,30.294177);

var markerArr=[];
local.setMarkersSetCallback(function(pois){
    for(var i=0;i<pois.length;i++){
        markerArr[i]=pois[i].marker;
        pois[i].marker.addEventListener("click", function(e){
            transit.clearResults();
            transit.search(hznu,this.z.title);
        });

    }
});

var date_info=[
    [120.016976,30.295394,"博文苑1号楼"],
    [120.015413,30.295005,"博文苑4号楼"],
    [120.014748,30.295831,"博文苑7号楼"],
    [120.015745,30.296533,"博文苑9号楼"],
    [120.013208,30.29502,"田径场"],
    [120.015355,30.295605,"足球场"],
    [120.017924,30.29573, "恕园7号楼食堂"],
    [120.019406,30.295297,"恕园7号楼彩色玻璃房"],
    [120.016945,30.297671,"恕园36号楼图书馆"],
    [120.019127,30.296423,"恕园13号楼一鸣奶吧"],
    [120.02065,30.297554,"恕园16号楼实验楼"],
    [120.01827,30.297499,"恕园23号楼人文学院"],
    [120.019743,30.297148,"恕园17号楼法学院"],
    [120.019527,30.297417,"恕园21号楼经济与管理学院"],
    [120.019976,30.294841,"恕园1号楼阿里巴巴商学院"],
    [120.016527,30.293952,"恕园6号楼经亨颐学院"]
];

var opts = {
    width: 200, // 信息窗口宽度
    height: 200, // 信息窗口高度
    title: "<span style='color:#FF0000'>"+"地址：", // 信息窗口标题
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
    img.src='1.jpg';
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
