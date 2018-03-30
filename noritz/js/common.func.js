$(function () {

    if($('.mCheck').length > 0){
        $('.mCheck').mCheckable();
    }

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
            if(!go_top.is(':visible')){
                go_top.stop().fadeIn();
            }
        }

        if (windowTop > offset_footer) {
            go_top.removeClass('fixed');
            go_top.css('bottom', windowTop - offset_footer + 15);
            if(!go_top.is(':visible')){
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

    //goTop();
    $(window).on('resize scroll', function () {
        //goTop();
    });

  

    if ($('.js-cols').length > 0) {
        $('.js-cols').matchHeight({ remove: false });
    }  

    var productSliderInit = false, productSlider;
    if ($('#product-slider').length > 0 && winWidth() <= 767 && !productSliderInit) {
        productSlider = new Swiper('#product-slider', {
            slidesPerView: 'auto',
            freeMode: true,
            spaceBetween: 7
        });
        productSliderInit = true;
    }

    $(window).on('resize', function () {
        if ($('#product-slider').length > 0 && winWidth() <= 767 && !productSliderInit) {
            productSlider = new Swiper('#product-slider', {
                slidesPerView: 'auto',
                freeMode: true,
                spaceBetween: 7          
            });
            productSliderInit = true;
        }
        if ($('#product-slider').length > 0 && winWidth() >= 768 && productSliderInit) {
            productSlider.destroy(false, true);
            productSliderInit = false;
        }
    });    


	$(window).on('resize', function () {
        winWidth();  

        if (winWidth() <= 767 && !startMobMenu) {
            mobileMenu();
            startMobMenu = true;            
        }

        if (winWidth() >= 768) {
            $("#header-nav").show();

            //$("#header-nav a.has-dropdown.active").next().css({"display":"none"});
            $("#header-nav li.active").removeClass("active");
        }        

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
                    //$("#header-nav a.has-dropdown.active").next().hide();                    
                    $("#header-nav li.active").removeClass("active");                
                }, 200);
            }
        });

        $("#btn-close-menu").on("click", function (e) {
            e.preventDefault();
            $("body").removeClass('mobile-menu-open');
            $(this).removeClass('active');
            $('#btn-open-menu').removeClass('active');
            timeOutMenu = setTimeout(function () {
                header_nav.hide();
            }, 200);
        });

        $('body').on('click', function (e) {
            var target = $(e.target),
                hasTargets = target.is("#header-nav") || target.is("#header-nav *") || target.is("#btn-open-menu") || target.is("#btn-open-menu *");
            if (!hasTargets && winWidth() <= 768) {
                $('body').removeClass('mobile-menu-open');
                $('#btn-open-menu').removeClass('active');
                $('#btn-close-menu').removeClass('active');
                timeOutMenu = setTimeout(function () {
                    header_nav.hide();
                }, 200);
                //$("#header-nav a.has-dropdown.active").next().hide();
                $("#header-nav li.active").removeClass("active");                
            }
        });

        $("#header-nav a.has-dropdown").on("click", function(e){
            if (winWidth() <= 768) {
                console.log("opened");
                if(!$(this).parent().hasClass("active")) {
                    $(this).parent().addClass("active");
                    //$(this).next().slideDown(500);
                }
                else {
                    console.log("closed");
                    $(this).parent().removeClass("active");
                    //$(this).next().slideUp(500);
                }
            }
        });

    }


    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 151) {
            if(!$('body').hasClass("sticky-header")){
                $('body').addClass("sticky-header");    
            }
        }
        else {
            $('body').removeClass("sticky-header");
        }
    });

});

function winWidth() {
    return $(window).width();
}
