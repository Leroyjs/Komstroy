"use strict";
(function() {
    var
        isNoviBuilder = false,

        plugins = {
            slick: $('.slick-slider'),
            slickMain: $('.slick-slider-main'),

        };

    $(function() {      

        function initLightGallery(itemsToInit, addClass) {
            if (!isNoviBuilder) {
                $(itemsToInit).lightGallery({
                    thumbnail: $(itemsToInit).attr("data-lg-thumbnail") !== "false",
                    selector: "[data-lightgallery='item']",
                    zoom: $(itemsToInit).attr("data-zoom") === "true",
                    autoplay: $(itemsToInit).attr("data-lg-autoplay") === "true",
                    pause: parseInt($(itemsToInit).attr("data-lg-autoplay-delay")) || 5000,
                    addClass: addClass,
                    mode: $(itemsToInit).attr("data-lg-animation") || "lg-slide",
                    loop: $(itemsToInit).attr("data-lg-loop") !== "false"
                });
            }
        }

        function leadingZero(decimal) {
            return decimal < 10 && decimal > 0 ? decimal : decimal;
        }
        if (plugins.slick.length) {
            for (var i = 0; i < plugins.slick.length; i++) {
                var $slickItem = $(plugins.slick[i]);
                $slickItem.on('init', function(slick) {
                    initLightGallery($('[data-lightgallery="group-slick"]'), 'lightGallery-in-carousel');
                    initLightGallery($('[data-lightgallery="item-slick"]'), 'lightGallery-in-carousel');
                });
                $slickItem.slick({
                    slidesToScroll: parseInt($slickItem.attr('data-slide-to-scroll'), 10) || 1,
                    asNavFor: $slickItem.attr('data-for') || false,
                    dots: $slickItem.attr("data-dots") === "true",
                    infinite: isNoviBuilder ? false : $slickItem.attr("data-loop") === "true",
                    focusOnSelect: $slickItem.attr("data-select") === "true",
                    draggable: isNoviBuilder ? false : $slickItem.attr("data-draggable") === "true",
                    arrows: $slickItem.attr("data-arrows") === "true",
                    fade: $slickItem.attr("data-fade") === "true",
                    appendArrows: $slickItem.attr("data-arrows-class") || $slickItem,
                    nextArrow: $slickItem.attr('data-custom-arrows') === "true" ? '<button type="button" class="slick-next">' +
                        '</button>' : '<button type="button" class="slick-next"></button>',
                    prevArrow: $slickItem.attr('data-custom-arrows') === "true" ? '<button type="button" class="slick-prev">' +
                        '</button>' : '<button type="button" class="slick-prev"></button>',
                    swipe: $slickItem.attr("data-swipe") === "true",
                    autoplay: $slickItem.attr("data-autoplay") === "true",
                    vertical: $slickItem.attr("data-vertical") === "true",
                    centerMode: $slickItem.attr("data-center-mode") === "true",
                    centerPadding: $slickItem.attr("data-center-padding") ? $slickItem.attr("data-center-padding") : '0.50',
                    mobileFirst: true,
                    responsive: [{
                        breakpoint: 0,
                        settings: {
                            slidesToShow: parseInt($slickItem.attr('data-items'), 10) || 1
                        }
                    }, {
                        breakpoint: 575,
                        settings: {
                            slidesToShow: parseInt($slickItem.attr('data-sm-items'), 10) || 1
                        }
                    }, {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: parseInt($slickItem.attr('data-md-items'), 10) || 1
                        }
                    }, {
                        breakpoint: 991,
                        settings: {
                            slidesToShow: parseInt($slickItem.attr('data-lg-items'), 10) || 1
                        }
                    }, {
                        breakpoint: 1199,
                        settings: {
                            slidesToShow: parseInt($slickItem.attr('data-xl-items'), 10) || 1
                        }
                    }]
                }).on('afterChange', function(event, slick, currentSlide, nextSlide) {
                    var $this = $(this),
                        childCarousel = $this.attr('data-child');
                    if (childCarousel) {
                        $(childCarousel + ' .slick-slide').removeClass('slick-current');
                        $(childCarousel + ' .slick-slide').eq(currentSlide).addClass('slick-current');
                    }
                });

// ПАГИНАТОР ГЛАВНОГО СЛАЙДЕРА
                if ($slickItem.attr('data-fraction')) {
                    (function() {
                        var fractionElement = document.querySelectorAll($slickItem.attr('data-fraction'))[0],
                            fractionCurrent = fractionElement.querySelectorAll('.slick-fraction-current')[0],
                            fractionAll = fractionElement.querySelectorAll('.slick-fraction-all')[0];
                        $slickItem.on('afterChange', function(slick) {
                            fractionCurrent.innerText = leadingZero(this.slick.currentSlide + 1);
                            fractionAll.innerText = leadingZero(this.slick.slideCount);
                            $('.custom-slick-arrows .slick-arrow').click(function() {
                                slickSliderMain.find($('.slick-slider')).slick('slickGoTo', 0);
                            });
                        });
                        $slickItem.trigger('afterChange');
                    })();
                }
            }
        }      
    });
}());