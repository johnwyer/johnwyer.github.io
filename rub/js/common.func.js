$(function () {

    var dropdown_event;

    if ($('.mCheck').length > 0) {
        $('.mCheck').mCheckable();
    }

    if ($('select[class^="js-select-"]').length) {
        $('select[class^="js-select-"]').each(function () {
            var name = $(this).data("name");
            $(this).select2({
                minimumResultsForSearch: Infinity,
                dropdownParent: $('.js-select-wrapper-' + name)
            });
        });
    }


    $('#modal-menu').on('show.bs.modal', function (event) {
        $('body').addClass('modal-menu-opened')
    });

    $('#modal-menu').on('hidden.bs.modal', function (event) {
        $('body').removeClass('modal-menu-opened')
    });

    /*
     $(window).on('scroll', function () {
     if ($(window).scrollTop() > 200) {
     $('body').addClass("sticky-header");
     }
     else {
     $('body').removeClass("sticky-header");
     }
     });
     */

    $('#main-section-2').imagesLoaded({
            background: '.item-image'
        },
        function () {
        });

    $('#main-section-4').imagesLoaded({
            background: '.item'
        },
        function () {
        });


    $(".js-gallery-image").on("click", function (e) {
        e.preventDefault();

        var imgSrc = $(this).find("img").attr("src");
        var $mainImg = $(".js-gallery-main-image");
        console.log($mainImg.css("background-image"), imgSrc);
        if ($mainImg.css("background-image") != imgSrc) {
            $mainImg.css({"background-image": "url(" + imgSrc + ")"});
        }
    });

    /*
     if($("#logos-list img").length > 0) {
     $("#logos-list img").each(function(i){
     var target = document.getElementById($(this).attr("id"));
     GradientMaps.applyGradientMap(target, "black, white");
     });
     }
     */


    var header = $('#header');
    var header_nav = $("#header-nav");
    var startMobMenu = false;

    if (winWidth() <= 767 && !startMobMenu) {
        mobileMenu();
        startMobMenu = true;
    }

    var go_top = $('#go-top'),
        footer = $('#footer');

    function goTop() {
        var windowTop = $(window).scrollTop();
        var offset_footer;
        var footer_h = footer.height();
        offset_footer = footer.offset().top - $(window).height();

        var startShow = 50;

        if (windowTop > startShow) {
            go_top.addClass('fixed');
            go_top.css('bottom', 25)
            if (!go_top.is(':visible')) {
                go_top.stop().fadeIn();
            }
        }

        if (windowTop > offset_footer) {
            go_top.removeClass('fixed');
            go_top.css('bottom', windowTop - offset_footer + 15);
            if (!go_top.is(':visible')) {
                go_top.stop().fadeIn();
            }
        }
        else if (windowTop < startShow) {
            go_top.stop().fadeOut();
        }
    }

    go_top.on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({scrollTop: 0}, 1500, 'easeInOutCubic');
    });

    goTop();
    $(window).on('resize scroll', function () {
        goTop();
        stickyBlock($('#header .header-content.i-2'))
    });


    //
    if ($('.js-cols').length > 0) {
        $('.js-cols').matchHeight({remove: false});
    }


    jsColsResponsive();
    $(window).on('resize', function () {
        winWidth();
        jsColsResponsive();

        if (winWidth() <= 767) {
            $('#modal-menu').modal('hide')
            $('body').removeClass('modal-menu-opened')
        }

        if (winWidth() <= 767 && !startMobMenu) {
            mobileMenu();
            startMobMenu = true;

        }


        if (winWidth() >= 768) {
            $("#header-nav").removeAttr('style');
            $('body').removeClass('mobile-menu-open')
        }

        winWidth()

    });

    function stickyBlock(el) {
        var windowTop = $(window).scrollTop();
        var el_h = el.outerHeight()
        var startFixed = el_h + 50;
        var startShow = 180;

        // if (windowTop > startFixed) {
        //     el.addClass('fixed')
        //     setTimeout(function () {
        //         el.addClass('easing')
        //     }, 10)
        // } else {
        //     el.removeClass('fixed easing')
        // }

        if (windowTop > startShow) {
            el.addClass('show');
        }
        else {
            el.removeClass('show')
        }
    }

    var timeOutMenu;

    function mobileMenu() {
        $('.btn-open-menu').on('click', function (e) {
            e.preventDefault();
            var $this = $(this);
            clearTimeout(timeOutMenu);
            if (!$("body").hasClass('mobile-menu-open')) {
                header_nav.show();
                //$('#overlay').show();
                setTimeout(function () {
                    $this.addClass('active');
                    $("body").addClass('mobile-menu-open');
                }, 20);
            } else {
                $("body").removeClass('mobile-menu-open');
                $this.removeClass('active');
                timeOutMenu = setTimeout(function () {
                    header_nav.hide();
                }, 200)
            }
        });

        $(".btn-close-menu").on("click", function (e) {
            e.preventDefault();
            $("body").removeClass('mobile-menu-open');
            $(this).removeClass('active');
            $('.btn-open-menu').removeClass('active');
            timeOutMenu = setTimeout(function () {
                header_nav.hide();
            }, 200)
        });

        $('body').on('click', function (e) {
            var target = $(e.target),
                hasTargets = target.is("#header-nav") || target.is("#header-nav *") || target.is(".btn-open-menu") || target.is(".btn-open-menu *");
            if (!hasTargets && winWidth() <= 1007) {
                $('body').removeClass('mobile-menu-open');
                $('.btn-open-menu').removeClass('active');
                $('.btn-close-menu').removeClass('active');
                timeOutMenu = setTimeout(function () {
                    header_nav.hide();
                }, 200)
            }
        });
    }


    dropdown()


});

function winWidth() {
    return window.innerWidth
}


function jsColsResponsive() {
    if ($('.js-cols-responsive').length > 0 && winWidth() > 767) {
        $('.js-cols-responsive').matchHeight({remove: false});
    }

    if ($('.js-cols-responsive').length > 0 && winWidth() < 768) {
        $('.js-cols-responsive').matchHeight({remove: true});
    }
}


if ($('#cover-slider').length) {
    var cover_slider = new Swiper('#cover-slider', {
        autoplay: 5000,
        speed: 1000,
        // simulateTouch: false,
        loop: true,
        // freeMode: true,
        pagination: '.swiper-pagination',
        spaceBetween: 0
    });
}

function dropdown() {
    $('.js-dropdown').each(function () {
        var $this = $(this);
        var toggle = $this.find('li')
        var timerHide
        // console.log(event)

        $this.on('mouseenter', function () {
            var dropdown = $(this).children('ul')
            if (winWidth() > 767) {
                clearTimeout(timerHide)
                dropdown.show()
                setTimeout(function () {
                    dropdown.addClass('active')
                }, 10)
            }

        })
        $this.on('mouseleave', function () {
            var dropdown = $(this).children('ul')
            if (winWidth() > 767) {
                dropdown.removeClass('active')
                timerHide = setTimeout(function () {
                    dropdown.hide()
                }, 200)
            }
        })

        $this.on('click', function (e) {
            var dropdown = $(this).children('ul')
            var parent = $(this).parent('.js-accordion')
            var all_dropdowns = parent.children('.js-dropdown').children('ul')
            if (winWidth() < 768) {
                if (!dropdown.hasClass('active')) {
                    all_dropdowns.slideUp('normal', function () {
                        all_dropdowns.removeClass('active')
                    })
                    dropdown.slideDown('normal', function () {
                        dropdown.addClass('active')
                    })
                } else {

                }

            }
        })

        $this.children('a').on('click', function (e) {
            e.preventDefault()
        })

    })
}