
$(init)
function init() {
    $(".mask").hide();
    $("body").on('click', 'li', showimg);
    $(".mask").on('click',function(){$(".mask").hide();})
    //$(".b-box").on('click',function(){$(".b-box"),hide();})
}
function showimg(e) {
    $(".mask").fadeToggle();
    var url=$(e.target).attr("src");
    $(".b-box img").attr("src",url);
}
/*5.2*/
$("cont-btn").ready(function(){
    $("li").hover(function () {
        $("li").css({background:'white'});
        $(this).css({background:'#666666'});
        $(".cont-txt").text($(this).index()+1);
    });
    $("li").mouseleave(function () {
        $("li").css({background:'white'});
        $(".cont-txt").text("");
    });
});

/*5.3*/
$(document).ready(function () {
    $(".box-list-button").click(function (e) {
        $(this).parent().remove();
        var num = $(".box-list").length;
        for (var i = 1;i <= num;i++)
            $(".box-list-num").eq(i-1).html(i);
    });
    $(".ex3-btn").click(function () {
        var num = $(".box-list").length + 1;
        var newdiv = "<div class='box-list'><div class='box-list-num'>"+num+"</div><input type='text' class='box-list-content'><div class='box-list-button'>Delete</div></div>"
        if(num > 10){
            alert("最多添加10个");
        }
        else {
            $(".ex3-contain-box:first").append(newdiv);
            $(".box-list-button").click(function (e) {
                $(this).parent().remove();
                var num = $(".box-list").length;
                for (var i = 1;i <= num;i++)
                    $(".box-list-num").eq(i-1).html(i);

            });
        }
    });
});