$(function () {

    //
    if ($('.mCheck').length > 0) {
        $('.mCheck').mCheckable();
    }

    //
    if ($('.js-cols').length > 0) {
        $('.js-cols').matchHeight({remove: false});
    }

    //
    if ($('select[class^="js-select-"]').length) {
        $('select[class^="js-select-"]').each(function () {
            var name = $(this).data("name");
            $(this).select2({
                minimumResultsForSearch: Infinity,
                dropdownParent: $('.js-select-wrapper-' + name)
            });
        });
    }

    $("#work-gallery .gallery-item").on("click", function (e) {
        e.preventDefault();
        $el = $(this);
        if (!$el.hasClass("active")) {
            var imageUrl = $el.data("img");
            $("#work-gallery-image").addClass("animate");
            setTimeout(function () {
                //$("#work-gallery-image").attr("src", imageUrl);
                $("#work-gallery-image").css('background-image', 'url(' + imageUrl + ')');
                $("#work-gallery-image").removeClass("animate");
                $("#work-gallery .gallery-item").removeClass("active");
                $el.addClass("active");
            }, 200);
        }
    });


    $("#contact-form input[type=text]").on("focus", function () {
        var value = $.trim($(this).val());
        var placeholder = $(this).data("placeholder");
        if (value.length == 0) {
            $(this).attr("placeholder", "");
        }
    }).on("blur", function () {
        var value = $.trim($(this).val());
        var placeholder = $(this).data("placeholder");
        if (value.length == 0) {
            $(this).attr("placeholder", placeholder);
        }
    });


    if ($('.scroll-pane').length > 0) {
        var pane = $('.scroll-pane');
        pane.jScrollPane(
            {
                showArrows: false,
                animateScroll: true,
                horizontalGutter: 0,
                verticalGutter: 10
            }
        );
        var paneApi = pane.data('jsp');
        $(window).on('resize', function () {
            paneApi.reinitialise();
        });
    }


    var header = $('#header');
    var header_nav = $("#header-nav");
    var startMobMenu = false;


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

    $('.scroll-to').on('click', function (e) {
        e.preventDefault();
        var target = $(this).attr('href')
        var position = $(target).offset().top
        $('html,body').animate({scrollTop: position - 20}, 800, 'easeInOutCubic');
    });

    goTop();
    $(window).on('resize scroll', function () {
        goTop();
    });


    /*
    var topSliderInit = false, topSlider;
    if ($('#top-slider').length > 0 && !topSliderInit) {
         topSlider = new Swiper('#top-slider', {          
            autoplay: 5000,
            speed: 1500,
            spaceBetween: 0,
            slidesPerView: 1,
            loop: true,
            simulateTouch: false,
            shortSwipes: false,
            longSwipes: false,
            followFinger: false,            
            effect: "slide"           
        });

        topSliderInit = true;
    }  

    var detailsSliderInit = false, detailsSlider;
    if ($('#article-slider').length > 0 && !detailsSliderInit) {
         detailsSlider = new Swiper('#article-slider', {   
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',                 
            autoplay: 500000,
            speed: 1500,
            spaceBetween: 0,
            slidesPerView: 1,
            loop: true,
            simulateTouch: false,
            shortSwipes: false,
            longSwipes: false,
            followFinger: false,            
            effect: "slide"         
        });

        detailsSliderInit = true;
    }        
    */

    var menuSliderInit = false, menuSlider;
    if ($('#menu-slider').length > 0 && winSize() <= 767 && !menuSliderInit) {
        menuSlider = new Swiper('#menu-slider', {
            slidesPerView: 'auto',
            spaceBetween: 0,
            freeMode: true,
            onInit: function (swiper) {
                swiper.slideTo($('#menu-slider li.active').index(), 500, false);
            }
        });
        console.log(menuSlider.activeIndex);

        menuSliderInit = true;
    }

    var customerSliderTopInit = false, customerSliderTop;
    if ($('#customer-slider-top').length > 0 && winSize() <= 1024 && !customerSliderTopInit) {
        customerSliderTop = new Swiper('#customer-slider-top', {
            slidesPerView: 'auto',
            spaceBetween: 0,
            simulateTouch: true,
            freeMode: true
        });
        customerSliderTopInit = true;
    }

    var customerSliderInit = false, customerSlider;
    if ($('#customer-slider').length > 0 && winSize() <= 1024 && !customerSliderInit) {
        customerSlider = new Swiper('#customer-slider', {
            slidesPerView: 'auto',
            spaceBetween: 0,
            simulateTouch: true,
            freeMode: true
        });
        customerSliderInit = true;
    }

    var workSliderInit = false, workSlider;
    if ($('#works-slider').length > 0 && winSize() <= 1024 && !workSliderInit) {
        workSlider = new Swiper('#works-slider', {
            slidesPerView: 'auto',
            spaceBetween: 0,
            simulateTouch: true,
            freeMode: true,
            scrollbar: {
                el: '#works-slider .swiper-scrollbar',
                draggable: true,
                hide: false,
                dragSize: '20'
            }
        });
        workSliderInit = true;
    }

    var worksPageSliderInit = false, worksPageSlider;
    if ($('#works-page-slider').length > 0 && winSize() <= 767 && !worksPageSliderInit) {
        worksPageSlider = new Swiper('#works-page-slider', {
            slidesPerView: 'auto',
            spaceBetween: 0,
            simulateTouch: true,
            freeMode: true,
            scrollbar: {
                el: '#works-page-slider .swiper-scrollbar',
                draggable: true,
                hide: false,
                dragSize: '20'
            }
        });
        worksPageSliderInit = true;
    }

    var aboutSliderInit = false, aboutSlider;
    if ($('#about-slider').length > 0 && winSize() <= 767 && !aboutSliderInit) {
        aboutSlider = new Swiper('#about-slider', {
            slidesPerView: 'auto',
            spaceBetween: 0,
            freeMode: true
        });

        aboutSliderInit = true;
    }

    var technologySliderInit = false, technologySlider;
    if ($('#technology-slider').length > 0 && !technologySliderInit) {
        topSlider = new Swiper('#technology-slider', {
            // autoplay: 5000,
            speed: 1300,
            spaceBetween: 56,
            slidesPerView: 3,
             // centeredSlides: true,
            // loop: true,
            /*
            simulateTouch: false,
            shortSwipes: false,
            longSwipes: false,
            followFinger: false,
            */
            effect: "slide",
            navigation: {
                nextEl: '.technology-next',
                prevEl: '.technology-prev',
            },
            breakpoints: {
                767: {
                    // centeredSlides: false,
                    slidesPerView: 2,
                    spaceBetween: 40
                },
                480: {
                    // centeredSlides: false,
                    slidesPerView: 1,
                    spaceBetween: 20
                }
            }
        });

        technologySliderInit = true;
    }

    $(window).on('resize', function () {
        winSize();


        //
        if ($('#menu-slider').length > 0 && winSize() <= 767 && !menuSliderInit) {
            menuSlider = new Swiper('#menu-slider', {
                slidesPerView: 'auto',
                spaceBetween: 0,
                freeMode: true,
                onInit: function (swiper) {
                    swiper.slideTo($('#menu-slider li.active').index(), 500, false);
                }
            });
            menuSliderInit = true;
        }
        if ($('#menu-slider').length > 0 && winSize() > 767 && menuSliderInit) {
            menuSlider.destroy(false, true);
            menuSliderInit = false;
        }

        //
        if ($('#customer-slider-top').length > 0 && winSize() <= 1024 && !customerSliderTopInit) {
            customerSliderTop = new Swiper('#customer-slider-top', {
                slidesPerView: 'auto',
                spaceBetween: 0,
                simulateTouch: true,
                freeMode: true
            });
            customerSliderTopInit = true;
        }
        if ($('#customer-slider').length > 0 && winSize() > 1024 && customerSliderTopInit) {
            customerSliderTop.destroy(false, true);
            customerSliderTopInit = false;
        }

        //
        if ($('#customer-slider').length > 0 && winSize() <= 1024 && !customerSliderInit) {
            customerSlider = new Swiper('#customer-slider', {
                slidesPerView: 'auto',
                spaceBetween: 0,
                simulateTouch: true,
                freeMode: true
            });
            customerSliderInit = true;
        }
        // console.log(winSize())
        if ($('#customer-slider').length > 0 && winSize() > 1024 && customerSliderInit) {
            customerSlider.destroy(false, true);
            customerSliderInit = false;
        }

        //
        if ($('#works-slider').length > 0 && winSize() <= 1024 && !workSliderInit) {
            workSlider = new Swiper('#works-slider', {
                slidesPerView: 'auto',
                spaceBetween: 0,
                simulateTouch: true,
                freeMode: true,
                scrollbar: {
                    el: '#works-slider .swiper-scrollbar',
                    draggable: true,
                    hide: false,
                    dragSize: '20'
                }
            });
            workSliderInit = true;
        }
        // console.log(winSize())
        if ($('#works-slider').length > 0 && winSize() > 1024 && workSliderInit) {
            workSlider.destroy(false, true);
            workSliderInit = false;
        }

        //
        if ($('#works-page-slider').length > 0 && winSize() <= 767 && !worksPageSliderInit) {
            worksPageSlider = new Swiper('#works-page-slider', {
                slidesPerView: 'auto',
                spaceBetween: 0,
                simulateTouch: true,
                freeMode: true,
                scrollbar: {
                    el: '#works-page-slider .swiper-scrollbar',
                    draggable: true,
                    hide: false,
                    dragSize: '20'
                }
            });
            worksPageSliderInit = true;
        }
        if ($('#works-page-slider').length > 0 && winSize() > 767 && workSliderInit) {
            worksPageSlider.destroy(false, true);
            worksPageSliderInit = false;
        }

        //
        if ($('#about-slider').length > 0 && winSize() <= 767 && !aboutSliderInit) {
            aboutSlider = new Swiper('#about-slider', {
                slidesPerView: 'auto',
                spaceBetween: 0,
                freeMode: true
            });
            aboutSliderInit = true;
        }
        if ($('#about-slider').length > 0 && winSize() > 767 && aboutSliderInit) {
            aboutSlider.destroy(false, true);
            aboutSliderInit = false;
        }

        //
        if (winSize() >= 768) {
            $("#header-nav").show();
        }

        // if ($('.js-line-truncate-2').length) {
        //     $('.js-line-truncate-2').trunk8({lines: 2});
        // }
        // if ($('.js-line-truncate-3').length) {
        //     $('.js-line-truncate-3').trunk8({lines: 3});
        // }
        // if ($('.js-line-truncate-4').length) {
        //     $('.js-line-truncate-4').trunk8({lines: 4});
        // }

    });

    function headerAnim() {
        var windowTop = $(window).scrollTop();
        var startShow = 20;

        if (windowTop > startShow) {
            header.addClass('scrolling');
        }
        else if (windowTop < startShow) {
            header.removeClass('scrolling')
        }
    }

    var timeOutMenu;

    function mobileMenu() {
        $('#btn-open-menu').on('click', function (e) {
            e.preventDefault();
            var $this = $(this);
            clearTimeout(timeOutMenu);
            if (winSize() <= 767) {
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
            }
        });

        $("#btn-close-menu").on("click", function (e) {
            e.preventDefault();
            $("body").removeClass('mobile-menu-open');
            $(this).removeClass('active');
            $('#btn-open-menu').removeClass('active');
            timeOutMenu = setTimeout(function () {
                header_nav.hide();
            }, 200)
        });

        $('body').on('click', function (e) {
            var target = $(e.target),
                hasTargets = target.is("#header-nav") || target.is("#header-nav *") || target.is("#btn-open-menu") || target.is("#btn-open-menu *");
            if (!hasTargets && winSize() <= 767) {
                $('body').removeClass('mobile-menu-open');
                $('#btn-open-menu').removeClass('active');
                $('#btn-close-menu').removeClass('active');
                timeOutMenu = setTimeout(function () {
                    header_nav.hide();
                }, 200)
            }
        });
    }

    mobileMenu();

    $(window).on('resize scroll', function (e) {
        widgetBtn($('#btn-free'));
    });

    newsMenu();

    $("#search-toggler").on("click", function (e) {
        e.preventDefault();
        $("body").toggleClass("search-opened");
    });


    // if ($('.js-line-truncate-2').length) {
    //     $('.js-line-truncate-2').trunk8({lines: 2});
    // }
    //
    // if ($('.js-line-truncate-3').length) {
    //     $('.js-line-truncate-3').trunk8({lines: 3});
    // }
    //
    // if ($('.js-line-truncate-4').length) {
    //     $('.js-line-truncate-4').trunk8({lines: 4});
    // }


});

var widgetBtn = function (btn) {
    //if(target.offset() == undefined) return;
    // console.log(winSize())
    if (winSize() > 767) {
        var win_top = $(window).scrollTop();
        var target_top = 570;

        if (win_top > target_top) {
            btn.addClass('fixed');
        }
        else {
            btn.removeClass('fixed');
        }
    }
    else {
        btn.removeClass('fixed');
    }
};

function newsMenu() {
    var menuSlide = new Swiper('#news-menu', {
        slidesPerView: 'auto',
        spaceBetween: 0,
        simulateTouch: true,
        freeMode: true
    });
    // workSliderInit = true;
}

function winSize() {
    return window.innerWidth;
}