$(function () {
    /*
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
    */

    /*
    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 200) {
            $('body').addClass("sticky-header");
        }
        else {
            $('body').removeClass("sticky-header");
        }
    });



    $(window).on('scroll', function (e) {
        widgetBtn($('#btn-free'));
    });    
    */


    var header = $('#header');
    var header_nav = $("#header-nav");
    var startMobMenu = false;

    if (winSize() <= 1024 && !startMobMenu) {
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

    goTop();
    $(window).on('resize scroll', function () {
        goTop();
    }); 

 
    if ($('.js-cols').length > 0) {
        $('.js-cols').matchHeight({ remove: false });
    }  

 
    var homeTopInit = false,
        homeTopTimer;
    function setupHomePageContent(){      
        var $aside = $("#page-aside").clone(true),
            $wrapper = $("#aside-mobile");
            //$column = $("#home-page-top-content");

        if($("body").hasClass("home-page") && winSize() < 768) {            
            if(!homeTopInit){
                clearTimeout(homeTopTimer);
                setTimeout(function () {
                    $wrapper.append($aside);
                    homeTopInit = true;
                }, 20);                
            }
            else {
                $wrapper.show();  
            }
        }
        else if($("body").hasClass("home-page") && winSize() >= 768) {
            homeTopTimer = setTimeout(function () {
                $wrapper.hide();
            }, 200);            
        }
    }

    setupHomePageContent();
	$(window).on('resize', function () {
        winSize();  

        if (winSize() <= 1024 && !startMobMenu) {
            mobileMenu();
            startMobMenu = true;
        }
        
        if (winSize() > 1024) {
            $("#header-nav").hide();
        } 
        

        setupHomePageContent();  

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
                }, 200)
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
            if (!hasTargets && winSize() <= 1007) {
                $('body').removeClass('mobile-menu-open');
                $('#btn-open-menu').removeClass('active');
                $('#btn-close-menu').removeClass('active');
                timeOutMenu = setTimeout(function () {
                    header_nav.hide();
                }, 200)
            }
        });
    }
});

function winSize() {
    return $(window).width();
}

