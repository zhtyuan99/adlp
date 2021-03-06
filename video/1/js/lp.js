
var $grid = $('.grid').masonry({
    itemSelector: '.grid-item',
    gutter: 0,
    isAnimated: false
});
$grid.imagesLoaded().done(function () {
    console.log('uuuu===');
    $grid.masonry('layout');
});


function getList(i) {
    $(".grid").html("");
    $.ajax({
        dataType: "json",
        type: 'get',
        url: 'list' + i + '.json?v=2',
        success: function (result) {
            dataFall = result;
            setTimeout(function () {
                appendFall();
            }, 300);
          
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
                var $griDiv = $('<div class="grid-item item"><div class="item-inner"><div class="inner-img"><img src="' + value.img + '" class="item-img"> <button class="play-btn open"><i class="icon iconfont icon-play"></i></button> <i class="icon iconfont icon-hd hd-icon"></i><div class="mask">' + value.title + ' </div></div><section class="section-p"> <p class="name-p"><button class="btn btn-primary btn-heart open"><i class="icon iconfont icon-heart"></i>' + value.heart + '</button><button class="btn btn-success btn-download open"><i class="icon iconfont icon-icondesign-"></i>' + value.download + '</button></p></section></div></div>');
                var $items = $griDiv;
                $items.imagesLoaded().done(function () {
                    $grid.masonry('layout');
                    $grid.append($items).masonry('appended', $items);
                })
            });
}
