$(function () {
    if ($('.mCheck').length > 0) {
        $('.mCheck').mCheckable();
    }

    if ($('.js-select-2').length) {
        $('.js-select-2').each(function () {
            var name = $(this).data("name");
            $(this).select2({
                minimumResultsForSearch: Infinity,
                width: '100%',
                placeholder: "...",
                // allowClear: true
                // dropdownParent: $('.js-select-wrapper-' + name)
            });
        });
    }

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


    var header = $('#header');
    var header_nav = $("#header-nav");
    var startMobMenu = false;
    /*
    if (winSize() <= 1100 && !startMobMenu) {
        mobileMenu();
        startMobMenu = true;
    }
    */

    var go_top = $('#go-top'),
        footer = $('#footer');

    function goTop() {
        var windowTop = $(window).scrollTop();
        var footer_h = footer.height();
        var offset_footer = footer.offset().top - $(window).height();

        var startShow = 50;

        if (windowTop > startShow) {
            go_top.addClass('fixed');
            setTimeout(function () {
                go_top.addClass('show')
            }, 5)
        }

        if (windowTop > offset_footer) {
            go_top.removeClass('fixed');
            // go_top.css('bottom', windowTop - offset_footer + 15);
            go_top.addClass('show')
        }
        else if (windowTop < startShow) {
            go_top.removeClass('show')
        }
    }

    go_top.on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({scrollTop: 0}, 1500, 'easeInOutCubic');
    });

    if (go_top.length) {
        goTop();
    }
    $(window).on('resize scroll', function () {
        if (go_top.length) {
            goTop();
        }
        if ($('#s-mypage-consultation').length) {
            toolbarBottom($('#s-mypage-consultation').find('.s-mypage-consultation__content'), footer)
        }

    });


    if ($('.js-cols').length > 0) {
        $('.js-cols').matchHeight({remove: false});
    }


    var topSliderInit = false, topSlider;
    if ($('#top-slider').length > 0 && !topSliderInit) {
        topSlider = new Swiper('#top-slider', {
            autoplay: 5000,
            speed: 1500,
            spaceBetween: 0,
            slidesPerView: 1,
            loop: true,
            pagination: {
                el: '.top-slider-pagination',
                clickable: true
            },
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


    var characteristicsSliderInit = false, characteristicsSlider;
    if ($('#characteristics-slider').length > 0 && winSize() <= 767 && !characteristicsSliderInit) {
        characteristicsSlider = new Swiper('#characteristics-slider', {
            slidesPerView: 'auto',
            spaceBetween: 0,
            freeMode: true
        });

        characteristicsSliderInit = true;
    }

    var expertsSliderInit = false, expertsSlider;
    if ($('#experts-slider').length > 0 && winSize() <= 767 && !expertsSliderInit) {
        expertsSlider = new Swiper('#experts-slider', {
            slidesPerView: 'auto',
            spaceBetween: 0,
            freeMode: true
        });

        expertsSliderInit = true;
    }

    var newsSliderInit = false, newsSlider;
    if ($('#news-slider').length > 0 && winSize() <= 767 && !newsSliderInit) {
        newsSlider = new Swiper('#news-slider', {
            slidesPerView: 'auto',
            spaceBetween: 0,
            freeMode: true
        });

        newsSliderInit = true;
    }

    $(window).on('resize', function () {
        winSize();
        //
        if ($('#characteristics-slider').length > 0 && winSize() <= 767 && !characteristicsSliderInit) {
            characteristicsSlider = new Swiper('#characteristics-slider', {
                slidesPerView: 'auto',
                spaceBetween: 0,
                freeMode: true
            });
            characteristicsSliderInit = true;
        }
        if ($('#characteristics-slider').length > 0 && winSize() > 767 && characteristicsSliderInit) {
            characteristicsSlider.destroy(false, true);
            characteristicsSliderInit = false;
        }

        //
        if ($('#experts-slider').length > 0 && winSize() <= 767 && !expertsSliderInit) {
            expertsSlider = new Swiper('#experts-slider', {
                slidesPerView: 'auto',
                spaceBetween: 0,
                freeMode: true
            });
            expertsSliderInit = true;
        }
        if ($('#experts-slider').length > 0 && winSize() > 767 && expertsSliderInit) {
            expertsSlider.destroy(false, true);
            expertsSliderInit = false;
        }

        //
        if ($('#news-slider').length > 0 && winSize() <= 767 && !newsSliderInit) {
            newsSlider = new Swiper('#news-slider', {
                slidesPerView: 'auto',
                spaceBetween: 0,
                freeMode: true
            });
            newsSliderInit = true;
        }
        if ($('#news-slider').length > 0 && winSize() > 767 && newsSliderInit) {
            newsSlider.destroy(false, true);
            newsSliderInit = false;
        }

        /*
        if (winSize() <= 1100 && !startMobMenu) {
            mobileMenu();
            startMobMenu = true;
        }

        if (winSize() >= 1008) {
            $("#header-nav").show();
        } 
        */

        infoPopover()

    });

    /*
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
    */

    /*
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
    */

    infoPopover()
    uploadFile()

});

function uploadFile() {
    var input = $('input[type="file"]')
    input.each(function () {
        var $this = $(this);
        $this.on('change', function () {
            var value = $(this).val();
            var filename = this.files[0].name;
            $(this).next('.file-upload__path').show().html(filename)
        })
    })
}

var start_popover_funcs = false;

function infoPopover() {
    var placement;
    if (winSize() < 768) {
        placement = 'bottom'
    } else {
        placement = 'auto right'
    }

    if ($('[data-toggle="popover"]').length) {
        $('[data-toggle="popover"]').each(function () {
            var popover_data = $(this).data('bs.popover');
            if (!popover_data) {
                $(this).popover({
                    html: true,
                    content: function () {
                        var content = $($(this).data('cnt')).html()
                        return content || ' ';
                    },
                    placement: placement
                })
            }
            if (popover_data) {
                if ($('.popover').is(':visible')) {
                    $('[data-toggle="popover"]').popover('hide')
                    popover_data.inState.click = false
                }
                popover_data.options.placement = placement
            }
        })

    }

    if (!start_popover_funcs) {
        $('body').on('click', function (e) {
            var target = $(e.target),
                hasTargets = target.is('.popover') || target.is('.popover *') || target.is('[data-toggle="popover"]');
            if (!hasTargets && $('.popover').is(':visible')) {
                $('[data-toggle="popover"]').popover('hide')
                $('[data-toggle="popover"]').each(function () {
                    var popover_data = $(this).data('bs.popover');
                    popover_data.inState.click = false
                })

            }
        });
        start_popover_funcs = true;
    }


}

function toolbarBottom(toolbar, footer) {
    // var toolbar = $('#s-mypage-consultation').find('.s-mypage-consultation__content')
    var winTop = $(window).scrollTop()
    var footerTop = footer.offset().top - $(window).height()
    if (footerTop > winTop) {
        toolbar.addClass('fixed')
    } else {
        toolbar.removeClass('fixed')
    }

}

function winSize() {
    return window.innerWidth;
}


function f(){
    console.log(this.x);
}
var obj = { x: 'yandex' };

console.log(f.call(obj));


/*
var arr = [
    {name:'width',value:10},
    {name:'height',value:20}
];

function getValues(arr){
    let obj = {};
    arr.forEach((item,i) => {
        obj[item.name] = item.value;
    });

    return obj;
}
*/

//console.log(getValues(arr));
/*
const go = (arr) => { 
    return arr.reduce((newObj, el) => { 
        newObj[el.name] = el.value; 
        return newObj 
    }, {});
};
console.log(go(arr));
*/