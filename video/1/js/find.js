$(function () {
    var swiper = new Swiper('.nav-container', {
        slidesPerView: 'auto',
        paginationClickable: true
    });
    $(".nav-ul .swiper-slide").click(function () {
        $(this).addClass("active-li").siblings().removeClass("active-li");
    });
    var $grid = $('.grid').masonry({
        itemSelector: '.grid-item',
        gutter: 0,
        isAnimated: false
    });
    $grid.imagesLoaded().done(function () {
        console.log('uuuu===');
        $grid.masonry('layout');
    });
    var pageIndex = 0;
    var dataFall = [];
    var totalItem = 10;
    $(window).scroll(function () {
        $grid.masonry('layout');
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(this).height();
        if (scrollTop + windowHeight == scrollHeight) {
           // getList(1);
        }
    });
    //getList(1);
    $(".swiper-slide a").click(function(){
        var cat=$(this).data("cat");
        getList(cat);
    })
    function getList(i) {
        $(".grid").html("");
        $.ajax({
            dataType: "json",
            type: 'get',
            url: 'list_'+i+'.json',
            success: function (result) {
                dataFall = result;
                setTimeout(function () {
                    appendFall();
                }, 500)
            },
            error: function (e) {
                console.log('error')
            }
        })
    }
    function appendFall() {
        $.each(dataFall,
                function (index, value) {
                    var dataLength = dataFall.length;
                    $grid.imagesLoaded().done(function () {
                        $grid.masonry('layout');
                    });
                    var $griDiv=$('<div class="grid-item item"><div class="item-inner"><div class="inner-img"><img src="'+value.img+'" class="item-img"> <button class="play-btn"><i class="icon iconfont icon-play"></i></button></div><section class="section-p"> <p class="title-p">'+value.title+'</p> <p class="name-p"><button class="btn btn-primary btn-heart"><i class="icon iconfont icon-heart"></i>'+value.heart+'</button><button class="btn btn-success btn-download"><i class="icon iconfont icon-icondesign-"></i>'+value.download+'</button></p></section></div></div>');
                    var $items = $griDiv;
                    $items.imagesLoaded().done(function () {
                        $grid.masonry('layout');
                        $grid.append($items).masonry('appended', $items);
                    })
                });
    }
})