$(function() {

    //
    if ($('.mCheck').length > 0) {
        $('.mCheck').mCheckable();
    }

    //
    if ($('select[class^="js-select-"]').length) {
        $('select[class^="js-select-"]').each(function() {
            var name = $(this).data("name");
            $(this).select2({
                minimumResultsForSearch: Infinity,
                dropdownParent: $('.js-select-wrapper-' + name)
            });
        });
    }

    //
    $('input[name=order-type]').on('change', function() {
        initCheckForm();
    });
    initCheckForm();

    function initCheckForm() {
        $oneTimeOrder = $('#one-time-order');
        $subscribeOrder = $('#subscribe-order');
        $radio = $('input[name=order-type]:checked');

        $('input[name=order-type]:not(:checked)').parent().removeClass('checked');
        $('input[name=order-type]:checked').parent().addClass('checked');

        if (parseInt($radio.val()) === 2) {
            $oneTimeOrder.addClass('hidden');
            $subscribeOrder.removeClass('hidden');
        } else {
            $oneTimeOrder.removeClass('hidden');
            $subscribeOrder.addClass('hidden');
        }
    }

    //
    $('.tooltipster').tooltipster({
        side: "top",
        animation: "fade",
        animationDuration: 500,
        contentCloning: true,
        delay: 150,
        distance: -16,
        trigger: 'hover',
        interactive: true,
        functionPosition: function(instance, helper, position) {
            position.coord.top -= 21;
            position.coord.left += 10;
            return position;
        }
    });

    //
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
        } else if (windowTop < startShow) {
            go_top.stop().fadeOut();
        }
    }

    go_top.on('click', function(e) {
        e.preventDefault();
        $('html,body').animate({ scrollTop: 0 }, 1500, 'easeInOutCubic');
    });

    //goTop();
    $(window).on('resize scroll', function() {
        //goTop();
    });

    //
    $(".js-go-to-order").on("click", function(e) {
        if ($('body').hasClass('sticky-header')) {
            e.preventDefault();

            var headerHeight = $("#header").height();
            var offset = $('#order-section').offset().top - headerHeight;

            $('html,body').animate({ scrollTop: offset }, 2000, 'easeInOutCubic');
        }
    });

    //
    $('.selectpicker').selectpicker();

    //
    var header = $('#header');
    var header_nav = $("#header-nav");
    var startMobMenu = false;

    $(window).on('resize', function() {
        winWidth();

        /*
        if (winWidth() <= 767 && !startMobMenu) {
            mobileMenu();
            startMobMenu = true;
        }*/

        if (winWidth() >= 768) {
            $("#header-nav").show();
        }
    });


    var timeOutMenu;

    function mobileMenu() {
        $('#btn-open-menu').on('click', function(e) {
            e.preventDefault();

            var $this = $(this);
            clearTimeout(timeOutMenu);
            if (!$("body").hasClass('mobile-menu-open')) {
                header_nav.show();
                setTimeout(function() {
                    $this.addClass('active');
                    $("body").addClass('mobile-menu-open');
                }, 20);
            } else {
                $("body").removeClass('mobile-menu-open');
                $this.removeClass('active');
                timeOutMenu = setTimeout(function() {
                    header_nav.hide();
                }, 200);
            }
        });

        $(".btn-close-menu").on("click", function(e) {
            e.preventDefault();

            $("body").removeClass('mobile-menu-open');
            $(this).removeClass('active');
            $('#btn-open-menu').removeClass('active');
            timeOutMenu = setTimeout(function() {
                header_nav.hide();
            }, 200);
        });

        $('body').on('click', function(e) {
            var target = $(e.target),
                hasTargets = target.is("#header-nav") || target.is("#header-nav *") || target.is("#btn-open-menu") || target.is("#btn-open-menu *");

            if (!hasTargets && winWidth() <= 768) {
                $('body').removeClass('mobile-menu-open');
                $('#btn-open-menu').removeClass('active');
                $('#btn-close-menu').removeClass('active');
                timeOutMenu = setTimeout(function() {
                    header_nav.hide();
                }, 200);
            }
        });
    }
    mobileMenu();


    //
    $('body').on('click', '#btn-start-movie', function(e) {
        $('body').addClass('modal-video-opened')
    })

    $('#modal-video').on('show.bs.modal', function(event) {
        var button = $(event.relatedTarget);
        var recipient = button.data('whatever');
        var modal = $(this);
        setTimeout(function() {
            modal.find('iframe').attr('src', recipient);
        }, 200);
    });


    $('#modal-video').on('hide.bs.modal', function(event) {
        var modal = $(this);
        modal.find('iframe').removeAttr('src');
    });

    //
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 151) {
            if (!$('body').hasClass("sticky-header")) {
                $('body').addClass("sticky-header");
            }
        } else {
            $('body').removeClass("sticky-header");
        }
    });

    //
    function checkCookiePanel() {
        var useCookie = Cookies.get('useCookie');
        var $cookiePanel = $("#cookie-panel");

        if (typeof useCookie === "undefined") {
            $cookiePanel.removeClass('hidden');
        } else {
            $cookiePanel.addClass('hidden').remove();
        }
    }
    checkCookiePanel();

    $('.js-close-cookie-panel').on('click', function(e) {
        e.preventDefault();

        var useCookie = Cookies.get('useCookie');
        var $cookiePanel = $("#cookie-panel");

        if (typeof useCookie === "undefined") {
            Cookies.set('useCookie', true);
        }

        $cookiePanel.addClass('hidden').remove();
    });

    //
    $('#section-testimonial .item.has-video .item-image').each(function() {
        $(this).on('click', function(e) {
            e.preventDefault();
            var $parent = $(this).parent();
            var id = $(this).find('video').attr('id');
            var video = document.getElementById(id);

            if (!$parent.hasClass('video-opened') && !$parent.hasClass('video-paused')) {
                $parent.addClass('video-opened');
                video.play();
            } else {
                if ($parent.hasClass('video-opened')) {
                    $parent.removeClass('video-opened').addClass('video-paused');
                    video.pause();
                } else {
                    $parent.removeClass('video-paused').addClass('video-opened');
                    video.play();
                }
            }
        });
    });

    //
    $(window).load(function() {
        $('body').addClass('loaded');
        setTimeout(function() {
            $('#preloader').remove();
        }, 1500);
    });
});

function winWidth() {
    return $(window).width();
}