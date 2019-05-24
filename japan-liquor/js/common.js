$(function () {
    uiActions.init();


    if ($('select[class^="js-select-"]').length) {
        $('select[class^="js-select-"]').each(function (i) {
            var name = $(this).data("name");
            $(this).select2({
                minimumResultsForSearch: Infinity,
                dropdownParent: $('.js-select-wrapper-' + name)
            });
        });
    }


    if ($('.js-cols').length > 0) {
        if(winSize() > 767) {
            $('.js-cols').matchHeight({ remove: false });
        }
        else {
            $('.js-cols').matchHeight({ remove: true });
        }
    } 

    if ($('.js-cols-2').length > 0) {
        if(winSize() > 767) {
            $('.js-cols-2').matchHeight({ remove: false });
        }
        else {
            $('.js-cols-2').matchHeight({ remove: true });
        }
    }     

    $(window).on('resize', function () {
        winSize();

        if ($('.js-cols').length > 0) {
            if(winSize() > 767) {
                $('.js-cols').matchHeight({ remove: false });
            }
            else {
                $('.js-cols').matchHeight({ remove: true });
            }
        }

        if ($('.js-cols-2').length > 0) {
            if(winSize() > 767) {
                $('.js-cols-2').matchHeight({ remove: false });
            }
            else {
                $('.js-cols-2').matchHeight({ remove: true });
            }
        }        
    });


    $('#go-top').on('click', function (e) {
        e.preventDefault();
        console.log('top')
        $('html,body').animate({scrollTop: 0}, 'slow', 'easeInOutCubic');
    });

    $(window).on('scroll', function (e) {
        // goTopAnim()
    })

    var go_top = $('#go-top');
    var footer = $('#footer');

    function goTopAnim() {
        var windowTop = $(window).scrollTop();
        var offset_footer;
        var footer_h = footer.height();
        offset_footer = footer.offset().top - $(window).height();

        var startShow = 100;

        if (windowTop > startShow) {
            go_top.addClass('fixed');
            go_top.addClass('show');
            if (!go_top.is(':visible')) {
                go_top.addClass('show');
            }
        }

        if (windowTop > offset_footer) {
            go_top.removeClass('fixed');
            // go_top.css('bottom', windowTop - offset_footer + 15);
            if (!go_top.is(':visible')) {
                go_top.addClass('show');
            }
        }

        else if (windowTop < startShow) {
            go_top.removeClass('show');
        }
    }

    // if ($('.js-icheck').length) {
    //     $('.js-icheck').iCheck()
    // }


    // if ($('.scroll-pane').length) {
    //     $('.scroll-pane').jScrollPane({
    //         // showArrows: true,
    //         autoReinitialise: true
    //     });
    // }


})
function winSize() {
    return $(window).width();
}

var md = new MobileDetect(navigator.userAgent);
var selected_categories = []

var uiActions = {
    init: function () {

        var self = this;
        var side_nav_close_timer;
        var side_nav_close_timer2;
        var side_nav_is_visible;

        console.log($(window).width())
        console.log('Is Phone ' + (md.phone() !== null))
        $('#nav-global__user-dropdown').hide()

        $('body').on('click', '#btn-toggle-nav', function (e) {
            e.preventDefault();
            clearTimeout(side_nav_close_timer);
            if (!$('body').hasClass('mobile-nav-opened')) {
                self.sideNavOpen($(this), $('#nav-global'), 'mobile-nav-opened', 10)

            } else {
                // $('body').removeClass('has-left-side');
                side_nav_close_timer = self.sideNavClose($(this), $('#nav-global'), 200, side_nav_close_timer, 'mobile-nav-opened')
            }
        });

        $('body').on('click', '.btn-close-menu', function (e) {
            e.preventDefault();
            clearTimeout(side_nav_close_timer);
            if ($('body').hasClass('mobile-nav-opened')) {
                side_nav_close_timer = self.sideNavClose($(this), $('#nav-global'), 200, side_nav_close_timer, 'mobile-nav-opened')
            }
        });




        // $('body').on('click', function (e) {
        //     var target = $(e.target),
        //         hasTargets = target.is('#nav-global') || target.is('#nav-global *')
        //     if (!hasTargets && ($('body').hasClass('mobile-nav-opened'))) {
        //         side_nav_close_timer = self.sideNavClose($('#btn-toggle-nav'), $('#nav-global'), 200, side_nav_close_timer, 'mobile-nav-opened')
        //     }
        //
        // });


    },
    sideNavOpen: function (toggle, nav, class_name, timer) {
        if (winWidth() < 767) {
            nav.show();
            // $('#content-overlay').show()
            setTimeout(function () {
                toggle.addClass('active');
                nav.addClass('active');
                $('body').addClass(class_name);
            }, timer)
        }

    },
    sideNavClose: function (toggle, nav, speed, timer, class_name) {

        clearTimeout(timer)
        $('body').removeClass(class_name);
        nav.removeClass('active');
        toggle.removeClass('active');

        timer = setTimeout(function () {
            nav.hide()
            // $('#content-overlay').hide()
        }, speed);

        return timer;
    },
    dropdownPopup: function (selector, dropdown) {
        var dropdownHideTimer;
        selector.on('mouseenter', function (e) {
            var $this = $(this),
                $this_dropdown = $this.find(dropdown);
            if ($(window).width() > 767) {
                clearTimeout(dropdownHideTimer);
                $this_dropdown.show();

                setTimeout(function () {
                    $this.addClass('dropdown-opened');
                    $this_dropdown.addClass('in')
                }, 10)
            }

        })
            .on('mouseleave', function () {
                var $this = $(this),
                    $this_dropdown = $this.find(dropdown);
                $this_dropdown.removeClass('in');
                dropdownHideTimer = setTimeout(function () {
                    $this_dropdown.hide()
                    $this.removeClass('dropdown-opened');
                }, 200)
            })
    }
};


(function (window, Modernizr) {
    'use strict';
    var md = new MobileDetect(navigator.userAgent),
        grade = md.mobileGrade();
    Modernizr.addTest({
        mobile: !!md.mobile(),
        phone: !!md.phone(),
        tablet: !!md.tablet(),
        'mobilegrade-a': grade === 'A'
    });
    window.mobileDetect = md;
})(window, Modernizr);

function winWidth() {
    return window.innerWidth
}