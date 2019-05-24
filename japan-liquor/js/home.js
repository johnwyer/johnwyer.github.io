$(function () {

    if ($('#home-slider').length) {
        var home_slider = new Swiper('#home-slider', {
            nextButton: '#home-slider .swiper-button-next',
            prevButton: '#home-slider .swiper-button-prev',
            slidesPerView: 'auto',
            centeredSlides: true,
            paginationClickable: true,
            autoplay: 5000,
            speed: 1000,
            initialSlide: 1,
            loop: true,
            // loopAdditionalSlides: 8,
            // loopedSlides: 6,
            spaceBetween: 0,
            // breakpoints: {
            //     1024: {
            //         // slidesPerView: 2
            //     },
            //     // 768: {
            //     //     slidesPerView: 3,
            //     //     spaceBetween: 30
            //     // },
            //     640: {
            //         // slidesPerView: 1
            //     }
            // }


        });
    }

    $(window).on('scroll', function (e) {
        widgetBtn($('#btn-free'));
    });


});

var widgetBtn = function (btn) {
    //if(target.offset() == undefined) return;
    if(winSize() > 767) {
        var win_top = $(window).scrollTop();
        var target_top = 200;

        if (win_top > target_top) {
            btn.addClass('fixed');
        }
        else {
            btn.removeClass('fixed');
        }
    }
};