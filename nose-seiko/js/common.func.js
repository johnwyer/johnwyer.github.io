$(function() {
    var header = $('#header');
    var body = $('body');
    var go_top = $('#go-top'),
        footer = $('#footer');
    var header_nav = $("#header-top-menu");
    var startMobMenu = false;

    $(window).on('resize', function() {
        winSize();

        if (!startMobMenu) {
            mobileMenu();
            startMobMenu = true;
        }

        if (winSize() >= 767) {
            $("#header-nav").show();
        }

    });

    if (!startMobMenu) {
        mobileMenu();
        startMobMenu = true;
    }

    var timeOutMenu;

    function mobileMenu() {
        $('#btn-open-menu').on('click', function(e) {
            e.preventDefault();
            var _this = $(this);
            clearTimeout(timeOutMenu);
            if (!body.hasClass('mobile-menu-open') && !body.hasClass('menu-opened')) {
                header_nav.show();
                header_nav.removeClass('out').addClass('active');
                setTimeout(function() {
                    _this.addClass('active');
                    body.addClass('mobile-menu-open');
                    setTimeout(function() {
                        body.addClass('menu-opened');
                    }, 500);
                }, 20);
            } else {
                if (body.hasClass('menu-opened')) {
                    body.removeClass('mobile-menu-open');
                    _this.removeClass('active');
                    timeOutMenu = setTimeout(function() {
                        header_nav.removeClass('active').addClass('out');
                        setTimeout(function() {
                            header_nav.hide()
                            body.removeClass('menu-opened');
                        }, 500);

                    }, 20);
                }
            }
        });

        $("#btn-close-menu").on("click", function(e) {
            e.preventDefault();
            body.removeClass('mobile-menu-open');
            $(this).removeClass('active');
            $('#btn-open-menu').removeClass('active');
            timeOutMenu = setTimeout(function() {
                header_nav.hide();
            }, 200);
        });

        body.on('click', function(e) {
            var target = $(e.target),
                hasTargets = target.is("#header-top-menu") || target.is("#header-top-menu *") || target.is("#btn-open-menu") || target.is("#btn-open-menu *");
            if (!hasTargets && winSize() <= 1007) {
                body.removeClass('mobile-menu-open');
                $('#btn-open-menu').removeClass('active');
                $('#btn-close-menu').removeClass('active');
                timeOutMenu = setTimeout(function() {
                    header_nav.hide();
                }, 200);
            }
        });
    }


    if ($('.mCheck').length > 0) {
        $('.mCheck').mCheckable();
    }


    if ($('#cover-slider').length) {
        var cover_slider = new Swiper('#cover-slider', {
            autoplay: {
                delay: 5000
            },
            speed: 1500,
            slidesPerView: 1,
            loop: true,
            spaceBetween: 0,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            }
        });
    }


    if ($('.js-cols').length > 0) {
        $('.js-cols').matchHeight({ remove: false });
    }

    function goTop() {
        var windowTop = $(window).scrollTop();
        var footer_h = footer.height();
        var footer_bottom_h = footer.find('.footer-bottom').outerHeight()
        var offset_footer_bottom = footer.find('.footer-bottom').offset().top - $(window).height();
        // console.log(content_h)

        var startShow = 100;

        if (windowTop > startShow) {
            go_top.addClass('fixed in');
        } else {
            go_top.removeClass('in')
        }

        if (windowTop > offset_footer_bottom) {
            go_top.css({
                'bottom': windowTop - offset_footer_bottom + 10
            })
        } else {
            go_top.css('bottom', 10)
        }

    }

    go_top.on('click', function(e) {
        e.preventDefault();
        $('html,body').animate({ scrollTop: 0 }, 1500, 'easeInOutCubic');
    });

    goTop();
    $(window).on('resize scroll', function() {
        goTop();
    });


    $(".products-menu a").on("click", function(e) {
        e.preventDefault();

        var id = $(this).attr("href");
        var topOffset = 9;
        var offset = $(id).offset().top - 9;

        $('html,body').animate({ scrollTop: offset }, 2000, 'easeInOutCubic');
    });
});

function winSize() {
    return window.innerWidth;
}