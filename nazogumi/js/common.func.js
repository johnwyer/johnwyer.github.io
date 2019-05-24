

$(function () { 

    var bottomSliderInit = false;
    var bottomSlider;

    var $container = $('.section-2-grid');
    $container.imagesLoaded(function(){
        $container.masonry({
            columnWidth: '.m-grid-sizer',
            itemSelector: '.m-grid-item',
            gutter: '.m-gutter-sizer',
            percentPosition: true,
            resize: true,
            initLayout: false,
            stagger: 30
        });
    });      

    var topSlider;
    topSlider = new Swiper('#top-slider', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',        
        pagination: '.swiper-pagination',        
        slidesPerView: 'auto',
        centeredSlides: true,
        paginationClickable: true,
        autoplay: 3500,
        speed: 1000,
        loop: true,
        spaceBetween: 0,
        initialSlide: 0,
        breakpoints: {
            767: {
                nextButton: '',
                prevButton: ''
            }
        },
        onAutoplayStart: function(swiper){
            console.log('init');
            $('#top-slider .swiper-slide').removeClass("slider-opacity");
        }
        /*
        autoplayDisableOnInteraction: false,
        autoplay: 3500,
        speed: 1000,
        initialSlide: 0,
        loop: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        loopedSlides:0,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',        
        pagination: '.swiper-pagination',
        paginationClickable: true,
        spaceBetween: 0,
        effect: "slide",        
        paginationClickable: true
        */
    });   


    //
    if($('.equalheight-item-js').length > 0) {
        $('.equalheight-item-js').responsiveEqualHeightGrid();
    }  
    
    //
    if($('.mCheck').length > 0){
        $('.mCheck').mCheckable();
    }


    //
    $(".contest-js").on("click", function(){
        var $p = $(this).parent();
        if($p.hasClass('active')) {
            $p.removeClass('active');
        }
        else {
            $p.addClass('active');
        }
    });
    $(".contest-close-js").on("click", function(e){
        e.preventDefault();
        $(".b-contest-wrapper").removeClass("active");
    });



    
    var header = $('#header');
    var header_nav = $("#header-nav");
    var startMobMenu = false;

    if (winSize() <= 1024 && !startMobMenu) {
        mobileMenu();
        startMobMenu = true;
    }

    $('#go-top').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 1500);

        return false;
    }); 


    if ($('#bottom-slider').length > 0 && winSize() <=1024 && !bottomSliderInit) {
        bottomSlider = new Swiper('#bottom-slider', {
            initialSlide: 0,
            slidesPerView: 'auto',
            spaceBetweenSlides: 0,
            freeMode: true
        });
        bottomSliderInit = true;
    }

    //
    var newsSliderInit = false, newsSlider;
    if ($('#news-slider').length > 0 && winSize() <= 640 && !newsSliderInit) {
         newsSlider = new Swiper('#news-slider', {
            slidesPerView: 'auto',
            paginationClickable: true,
            spaceBetween: 0,
            freeMode: true,
            onInit: function (swiper){
                swiper.slideTo($('#news-slider li.active').index(), 500, false);
            },
            onClick: function (swiper){
                swiper.slideTo($('#news-slider li.active').index(), 500, false);
            }
        });

        newsSliderInit = true;
    }    

    //
    var portfolioTabsSliderInit = false, portfolioTabsSlider;
    if ($('#portfolio-tabs-slider').length > 0 && winSize() <= 768 && !portfolioTabsSliderInit) {
         portfolioTabsSlider = new Swiper('#portfolio-tabs-slider', {
            slidesPerView: 'auto',
            paginationClickable: true,
            spaceBetween: 0,
            freeMode: true,
            onInit: function (swiper){
                swiper.slideTo($('#portfolio-tabs-slider li.active').index(), 250, false);
            },
            onClick: function (swiper){
                swiper.slideTo($('#portfolio-tabs-slider li.active').index(), 250, false);
            }
        });

        portfolioTabsSliderInit = true;
    }   

    //portfolio slider 1
    var tabs = {
        1 : {
            init: false,
            slider: {}
        },
        2 : {
            init: false,
            slider: {}
        },
        3 : {
            init: false,
            slider: {}
        }
    };
    if ($('#porfolio-slider-1').length > 0 && winSize() <= 768 && !tabs[1].init) {
         tabs[1].slider = new Swiper('#porfolio-slider-1', {
            slidesPerView: 'auto',
            paginationClickable: true,
            spaceBetween: 0,
            freeMode: true
        });

        tabs[1].init = true;
        //console.log("init in #porfolio-slider-1", tabs.portfolioSliderInit1, tabs.portfolioSlider1);
    }

    //porfolio slider 2
    /*
    if ($('#porfolio-slider-2').length > 0 && winSize() <= 768 && !tabs.portfolioSliderInit2) {
         tabs.portfolioSlider2 = new Swiper('#porfolio-slider-2', {
            slidesPerView: 'auto',
            paginationClickable: true,
            spaceBetween: 0,
            freeMode: true
        });

        tabs.portfolioSliderInit2 = true;
    }
    */

    //porfolio slider 3
    /*
    if ($('#porfolio-slider-3').length > 0 && winSize() <= 768 && !tabs.portfolioSliderInit3) {
         tabs.portfolioSlider3 = new Swiper('#porfolio-slider-3', {
            slidesPerView: 'auto',
            paginationClickable: true,
            spaceBetween: 0,
            freeMode: true
        });

        tabs.portfolioSliderInit3 = true;
    }
    */

    function initPortfolioSlider(id, index){
        if ($(id).length > 0 && winSize() <= 768 && !tabs[index].init) {
             tabs[index].slider = new Swiper(id, {
                slidesPerView: 'auto',
                paginationClickable: true,
                spaceBetween: 0,
                freeMode: true
            });

            tabs[index].init = true;
        }         
    }   

    function destroyPortfolioSlider(id, index){
        if ($(id).length > 0 && winSize() <= 768 && tabs[index].init) {
            tabs[index].slider.destroy(false, true);  
            tabs[index].init = false;
            tabs[index].slider = {};
        } 
    }

    //portfolio page tabs
    $('#portfolio-tabs a').on("click", function (e) {
        e.preventDefault();
        $(this).tab('show');
    }).on('shown.bs.tab', function(e){
        var id = $(this).attr("href");
        var relIndex = $(e.relatedTarget).data("index");
        var index = $(e.target).data("index");

        $(id + ' .equalheight-item-js').responsiveEqualHeightGrid(); 

        if(winSize() <= 768) {
            if(index == 1) {
                initPortfolioSlider("#porfolio-slider-1", index);
            }
            else if(index == 2) {
                initPortfolioSlider("#porfolio-slider-2", index);   
            }
            else if(index == 3) {
                initPortfolioSlider("#porfolio-slider-3", index);   
            }                    
        }
    }).on('hide.bs.tab', function(e){
        var relIndex = $(e.target).data("index");

        if(winSize() <= 768) {
            if(relIndex == 1) {
                destroyPortfolioSlider("#porfolio-slider-1", relIndex);
            }
            else if(relIndex == 2) {
                destroyPortfolioSlider("#porfolio-slider-2", relIndex);   
            }
            else if(relIndex == 3) {
                destroyPortfolioSlider("#porfolio-slider-3", relIndex);   
            }
        }
    });


    //blog page tabs
    $('#blog-tabs a').on("click", function (e) {
        e.preventDefault();
        $(this).tab('show');
    });

    //
	$(window).on('resize', function () {
        winSize();  

        if ($('#bottom-slider').length > 0 && winSize() <=1024 && !bottomSliderInit) {
            bottomSlider = new Swiper('#bottom-slider', {
                initialSlide: 0,
                slidesPerView: 'auto',
                spaceBetweenSlides: 0,
                freeMode: true
            });
            bottomSliderInit = true;
        }
        if($('#bottom-slider').length > 0 && winSize() >= 1024 && bottomSliderInit) {
            bottomSlider.destroy(false, true);            
            bottomSliderInit = false;
        }        

        //
        if ($('#news-slider').length > 0 && winSize() <= 640 && !newsSliderInit) {
            newsSlider = new Swiper('#news-slider', {
                slidesPerView: 'auto',
                paginationClickable: true,
                spaceBetween: 0,
                freeMode: true,                
                onInit: function (swiper){
                    swiper.slideTo($('#news-slider li.active').index(), 500, false);
                },                
                onClick: function (swiper){
                    swiper.slideTo($('#news-slider li.active').index(), 500, false);
                }                
            });
            newsSliderInit = true;            
        } 
        if ($('#news-slider').length > 0 && winSize() <= 640 && newsSliderInit) {
            newsSlider.slideTo($('#news-slider li.active').index(), 0, false);
        }
        if ($('#news-slider').length > 0 && winSize() > 640 && newsSliderInit) {
            newsSlider.destroy(false, true);  
            newsSliderInit = false;
        }

        //
        if ($('#portfolio-tabs-slider').length > 0 && winSize() <= 768 && !portfolioTabsSliderInit) {
            portfolioTabsSlider = new Swiper('#portfolio-tabs-slider', {
                slidesPerView: 'auto',
                paginationClickable: true,
                spaceBetween: 0,
                freeMode: true,
                onInit: function (swiper){
                    swiper.slideTo($('#portfolio-tabs-slider li.active').index(), 500, false);
                },
                onClick: function (swiper){
                    swiper.slideTo($('#portfolio-tabs-slider li.active').index(), 500, false);
                }                
            });
            portfolioTabsSliderInit = true;
        } 
        if ($('#portfolio-tabs-slider').length > 0 && winSize() <= 768 && portfolioTabsSliderInit) {
            portfolioTabsSlider.slideTo($('#portfolio-tabs-slider li.active').index(), 500, false);
        }
        if ($('#portfolio-tabs-slider').length > 0 && winSize() > 768 && portfolioTabsSliderInit) {
            portfolioTabsSlider.destroy(false, true);  
            portfolioTabsSliderInit = false;
        }   

        //porfolio slider 1
        if($("#facilities").hasClass("active")) {
            if ($('#porfolio-slider-1').length > 0 && winSize() <= 768 && !tabs[1].init) {
                tabs[1].slider = new Swiper('#porfolio-slider-1', {
                    slidesPerView: 'auto',
                    paginationClickable: true,
                    spaceBetween: 0,
                    freeMode: true               
                });
                tabs[1].init = true;
            } 
            if ($('#porfolio-slider-1').length > 0 && winSize() > 768 && tabs[1].init) {
                tabs[1].slider.destroy(false, true);  
                tabs[1].init = false;
                tabs[1].slider = {};
            }              
        }

        //porfolio slider 2
        if($("#promotions").hasClass("active")) {
            if ($('#porfolio-slider-2').length > 0 && winSize() <= 768 && !tabs[2].init) {
                tabs[2].slider = new Swiper('#porfolio-slider-2', {
                    slidesPerView: 'auto',
                    paginationClickable: true,
                    spaceBetween: 0,
                    freeMode: true               
                });
                tabs[2].init = true;
            } 
            if ($('#porfolio-slider-2').length > 0 && winSize() > 768 && tabs[2].init) {
                tabs[2].slider.destroy(false, true);  
                tabs[2].init = false;
                tabs[2].slider = {};
            } 
        }

        //porfolio slider 3
        if($("#accomodations").hasClass("active")) {
            if ($('#porfolio-slider-3').length > 0 && winSize() <= 768 && !tabs[3].init) {
                tabs[3].slider = new Swiper('#porfolio-slider-3', {
                    slidesPerView: 'auto',
                    paginationClickable: true,
                    spaceBetween: 0,
                    freeMode: true               
                });
                tabs[3].init = true;
            } 
            if ($('#porfolio-slider-3').length > 0 && winSize() > 768 && tabs[3].init) {
                tabs[3].slider.destroy(false, true);  
                tabs[3].init = false;
                tabs[3].slider = {};
            } 
        }


        if (winSize() <= 1024 && !startMobMenu) {
            mobileMenu();
            startMobMenu = true;
        }

        if (winSize() >= 1008) {
            $("#header-nav").show();
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
                    //$('#overlay').hide();
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


    //
    if($('select[class^="js-select"]').length == 1) {
        $('.js-select').select2({
            minimumResultsForSearch: Infinity,
            dropdownParent: $('.js-select-wrapper')
        });        
    }
    else if ($('select[class^="js-select"]').length > 1) {
        var s = $('select[class^="js-select"]').length;
        for(var i=1; i <= s; i++) {
            $('.js-select-' + i).select2({
                minimumResultsForSearch: Infinity,
                dropdownParent: $('.js-select-wrapper-' + i)
            });          
        }
    }


    /*
    function prepareSlider(){
    	$('.section-8-row-item').responsiveEqualHeightGridDestroy();
    	$("#comfort-space .first-row").append($("#comfort-space .last-row-item"));
    	$("#comfort-space .last-row").remove(".last-row-item");
    }

    function destroySlider (){    	
    	$('.section-8-row-item').responsiveEqualHeightGrid();
    	$("#comfort-space .last-row").append($("#comfort-space .last-row-item"));
    	$("#comfort-space .first-row").remove(".last-row-item");
    }*/
    /*
    $('#go-top').on('click', function (e) {
        e.preventDefault();
    	$('html,body').animate({scrollTop: 0}, 1300, 'easeInOutCubic');
    });*/

    /*
    $('#go-top').hide();
    $('#go-top').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 600);
        return false;
    });

    var h = $("body"),
        go2top = $('#go-top'),
        i = $(window),
        l = !1,
        r = !0;
    i.scroll(function () {
        var a = i.scrollTop();
        var b = $("#main-cover");
        var bh = b.height() / 2;
        var j = $('#wrapper');
        var wrap_height = j.height();
        var footer = $('#footer');
        var foot_height = footer.height();
        var foot_diff = wrap_height - foot_height - $(window).height();
        var start = false;

        if(winSize() > 767) {
            if (a > bh && !start) {
                go2top.fadeIn('slow');
                start = true;
            }
            else{
                go2top.fadeOut(300);
                start = false;
            }

            if (a < foot_diff) {
                go2top.css({
                    position:'fixed',
                    bottom: "30px"
                });
            }
            else{
                go2top.css({
                    position:'absolute',
                    bottom: "103px"
                });
            }
        }
        else {
            go2top.fadeOut(300);
            start = false;            
        }
    });*/

});

function winSize() {
    return $(window).width();
}