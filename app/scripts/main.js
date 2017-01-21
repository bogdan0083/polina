$(document).ready(function () {

    // VARIABLES
    var $window = $(window);
    var $windowWidth = $window.width();
    var $intro = $('.intro');
    var $inputs = $('.input__control');
    var $anchors = $('[data-anchor]');
    var $sections = $('[data-section]');
    var $arrowUp = $('.js-up');

    // portfolio filter

    $('.portfolio__items').imagesLoaded( function () {
        var filterizd = $('.portfolio__items').filterizr({
            animationDuration: 0.3, //in seconds
            filterOutCss: { //Filtering out animation
                opacity: 0,
                transform: 'scale(0.5)'
            },
            filterInCss: { //Filtering in animation
                opacity: 1,
                transform: 'scale(1)'
            }
        });
    });



    // remove default event on click;

    var $filterLinks = $('.portfolio-sort__link');

    $filterLinks.on('click', function (e) {
       e.preventDefault();
    });


    // events on scroll

    $window.on('scroll', onScroll);


    // on input focus

    $inputs.focus(function (e) {
        e.preventDefault();

        var $input = $(this);
        $input.parent().find('.input__placeholder').addClass('js-active');
    });

    // on input blur

    $inputs.blur(function (e) {
        e.preventDefault();

        var $input = $(this);

        if ($input.val() == '')
            $input.parent().find('.input__placeholder').removeClass('js-active');
    });

    $anchors.click(function (e) {
        e.preventDefault();

        var $anchor = $(this);
        var id = $anchor.attr('href');

        $('body, html').animate({
            'scrollTop': $(id).offset().top - 78
        });
    });

    $arrowUp.click(function (e) {
        e.preventDefault();

        $('body, html').animate({
            'scrollTop': 0
        });
    });

    //  on scroll

    function onScroll(e) {
        e.preventDefault();
        var wScroll = $window.scrollTop();

        if ($windowWidth >= 768) {
            parallaxIntro(wScroll);
            checkActiveAnchor($sections, $anchors);
        }
    }

    // parallax for intro section

    function parallaxIntro(wScroll) {
        $intro.css('transform', 'translateY(' + (wScroll * 0.2) + 'px)');
    }

    // check active anchor and add class

    function checkActiveAnchor($sections, $anchors) {
        var topEdge = $window.scrollTop() + 200;

        $sections.each(function (idx, item) {
            var $section = $(item);
            var sectionOffset = $section.offset().top;

            if (topEdge >= sectionOffset) {
                var id = $section.attr('id');

                $anchors
                    .removeClass('js-active')
                    .filter('[data-anchor="' + id + '"]')
                    .addClass('js-active');
            } else if (idx === $section.length - 1) {
                $anchors.removeClass('js-active');
            }

        });
    }
});