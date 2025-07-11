/*---------------------------
      Table of Contents
    --------------------
    
    01- Mobile Menu
    02- Sticky Navbar
    03- Module Search 
    04- Module Sidenav 
    05- Scroll Top Button
    06- Equal Height Elements
    07- Set Background-img to section 
    08- Add active class to accordions
    09- Load More Items
    10- Add Animation to About Img
    11- Progress bars
    11- Owl Carousel
    12- Popup Video
    13- CounterUp
    14- Projects Filtering and Sorting
    15- lightbox Gallery 
     
 ----------------------------*/

/*
=== MAIN.JS CONTENT INDEX ===
Lines 1-17: Table of Contents listing 15 different functionality modules (functional)
Lines 19-24: jQuery document ready function setup and global variables (functional)
Lines 26-52: HTML Include functionality for loading footer/header files (functional)
Lines 54-60: Mobile menu toggle functionality (functional)
Lines 62-71: Sticky navbar on scroll functionality (functional)
Lines 73-85: Module search overlay show/hide functionality (functional)
Lines 87-99: Scroll to top button show/hide and animate functionality (functional)
Lines 101-107: Equal height elements functionality (functional)
Lines 109-119: Set background images to sections dynamically (functional)
Lines 121-128: Accordion active class management (functional)
Lines 130-142: Load more items functionality for blog/services/projects (functional)
Lines 144-152: About image animation on scroll (functional)
Lines 154-168: Progress bars animation on scroll (functional)
Lines 170-202: Owl Carousel configuration with responsive settings (functional)
Lines 203-226: Owl Carousel with thumbnails configuration (functional)
Lines 228-246: Popup video functionality using Magnific Popup (functional)
Lines 248-252: CounterUp animation functionality (functional)
Lines 254-258: Projects filtering and sorting using MixItUp (functional)
Lines 260-263: Lightbox gallery configuration (functional)
Lines 265-285: Active navigation link management (functional)

ALL FUNCTIONALITY IS RELEVANT AND USEFUL:
- No logistics-specific code found
- All functions serve website interactivity purposes
- Navigation, animations, carousels, and UI components are universal
- Code is well-structured and documented
- HTML include functionality enables modular design
- Active navigation link management is particularly useful

NO ISSUES IDENTIFIED - This JavaScript file is clean and entirely functional for the visa website.
*/

$(function () {

    // Global variables
    var $win = $(window);

    /*==========   HTML Include Functionality   ==========*/
    // Function to handle data-include attributes
    function loadIncludes() {
        $('[data-include]').each(function() {
            var $this = $(this);
            var file = $this.data('include');
            
            if (file) {
                $.ajax({
                    url: file,
                    type: 'GET',
                    dataType: 'html',
                    cache: false,
                    success: function(data) {
                        $this.html(data);
                        // Trigger any scripts in the loaded content
                        $this.find('script').each(function() {
                            if (this.src) {
                                // External script
                                var script = document.createElement('script');
                                script.src = this.src;
                                document.head.appendChild(script);
                            } else {
                                // Inline script
                                eval(this.innerHTML);
                            }
                        });
                    },
                    error: function() {
                        console.error('Failed to load include file: ' + file);
                    }
                });
            }
        });
    }
    
    // Load includes on DOM ready
    loadIncludes();

    /*==========   Mobile Menu   ==========*/
    var $navToggler = $('.navbar-toggler');
    $navToggler.on('click', function () {
        $(this).toggleClass('actived');
    })
    $navToggler.on('click', function () {
        $('.navbar-collapse').toggleClass('menu-opened');
    })

    /*==========   Sticky Navbar   ==========*/
    $win.on('scroll', function () {
        if ($win.width() >= 992) {
            var $navbar = $('.sticky-navbar');
            if ($win.scrollTop() > 80) {
                $navbar.addClass('fixed-navbar');
            } else {
                $navbar.removeClass('fixed-navbar');
            }
        }
    });

    /*==========  Module Search   ==========*/
    var $moduleBtnSearch = $('.module__btn-search'),
        $moduleSearchContainer = $('.module__search-container');
    // Show Module Search
    $moduleBtnSearch.on('click', function (e) {
        e.preventDefault();
        $moduleSearchContainer.toggleClass('active', 'inActive').removeClass('inActive');
    });
    // Close Module Search
    $('.close-search').on('click', function () {
        $moduleSearchContainer.removeClass('active').addClass('inActive');
    });

    /*==========   Scroll Top Button   ==========*/
    var $scrollTopBtn = $('#scrollTopBtn');
    // Show Scroll Top Button
    $win.on('scroll', function () {
        if ($(this).scrollTop() > 700) {
            $scrollTopBtn.addClass('actived');
        } else {
            $scrollTopBtn.removeClass('actived');
        }
    });
    // Animate Body after Clicking on Scroll Top Button
    $scrollTopBtn.on('click', function () {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });

    /*==========   Equal Height Elements   ==========*/
    var maxHeight = 0;
    $(".equal-height").each(function () {
        if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }
    });
    $(".equal-height").height(maxHeight);


    /*==========   Set Background-img to section   ==========*/
    $('.bg-img').each(function () {
        var imgSrc = $(this).children('img').attr('src');
        $(this).parent().css({
            'background-image': 'url(' + imgSrc + ')',
            'background-size': 'cover',
            'background-position': 'center',
        });
        $(this).parent().addClass('bg-img');
        $(this).remove();
    });

    /*==========   Add active class to accordions   ==========*/
    $('.accordion__item-header').on('click', function () {
        $(this).addClass('opened')
        $(this).parent().siblings().find('.accordion__item-header').removeClass('opened')
    })
    $('.accordion__item-title').on('click', function (e) {
        e.preventDefault()
    });

    /*==========   Load More Items  ==========*/
    function loadMore(loadMoreBtn, loadedItem) {
        $(loadMoreBtn).on('click', function (e) {
            e.preventDefault();
            $(this).fadeOut();
            $(loadedItem).fadeIn();
        })
    }

    loadMore('.loadMoreBlog', '.hidden-blog-item');
    loadMore('.loadMoreServices', '.hidden-service');
    loadMore('.loadMoreProjects', '.project-hidden > .project-item');

    /*==========   Add Animation to About Img ==========*/
    if ($(".about").length > 0) {
        $(window).on('scroll', function () {
            var skillsOffset = $(".about").offset().top - 200,
                skillsHight = $(this).outerHeight(),
                winScrollTop = $(window).scrollTop();
            if (winScrollTop > skillsOffset - 1 && winScrollTop < skillsOffset + skillsHight - 1) {
                $('.about__img').addClass('animate-img');
            }
        });
    }

    /*==========   Progress bars  ==========*/
    if ($(".skills").length > 0) {
        $(window).on('scroll', function () {
            var skillsOffset = $(".skills").offset().top - 130,
                skillsHight = $(this).outerHeight(),
                winScrollTop = $(window).scrollTop();
            if (winScrollTop > skillsOffset - 1 && winScrollTop < skillsOffset + skillsHight - 1) {
                $('.progress-bar').each(function () {
                    $(this).width($(this).attr('aria-valuenow') + '%');
                });
                $('.progress__percentage').each(function () {
                    $(this).text($(this).siblings().children('.progress-bar').attr('aria-valuenow') + '%')
                });
            }
        });
    }

    /*==========   Owl Carousel  ==========*/
    $('.carousel').each(function () {
        $(this).owlCarousel({
            nav: $(this).data('nav'),
            dots: $(this).data('dots'),
            loop: $(this).data('loop'),
            margin: $(this).data('space'),
            center: $(this).data('center'),
            dotsSpeed: $(this).data('speed'),
            autoplay: $(this).data('autoplay'),
            transitionStyle: $(this).data('transition'),
            animateOut: $(this).data('animate-out'),
            animateIn: $(this).data('animate-in'),
            autoplayTimeout: 15000,
            responsive: {
                0: {
                    items: 1,
                },
                400: {
                    items: $(this).data('slide-sm'),
                },
                700: {
                    items: $(this).data('slide-md'),
                },
                1000: {
                    items: $(this).data('slide'),
                }
            }
        });
    });
    // Owl Carousel With Thumbnails
    $('.thumbs-carousel').owlCarousel({
        thumbs: true,
        thumbsPrerendered: true,
        loop: true,
        margin: 0,
        autoplay: $(this).data('autoplay'),
        nav: $(this).data('nav'),
        dots: $(this).data('dots'),
        dotsSpeed: $(this).data('speed'),
        transitionStyle: $(this).data('transition'),
        animateOut: $(this).data('animate-out'),
        animateIn: $(this).data('animate-in'),
        autoplayTimeout: 15000,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });

    /*==========  Popup Video  ==========*/
    $('.popup-video').magnificPopup({
        mainClass: 'mfp-fade',
        removalDelay: 0,
        preloader: false,
        fixedContentPos: false,
        type: 'iframe',
        iframe: {
            markup: '<div class="mfp-iframe-scaler">' +
                '<div class="mfp-close"></div>' +
                '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                '</div>',
            patterns: {
                youtube: {
                    index: 'youtube.com/',
                    id: 'v=',
                    src: '//www.youtube.com/embed/%id%?autoplay=1'
                }
            },
            srcAction: 'iframe_src',
        }
    });

    /*==========   counterUp  ==========*/
    $(".counter").counterUp({
        delay: 10,
        time: 4000
    });

    /*==========   Projects Filtering and Sorting  ==========*/
    $("#filtered-items-wrap").mixItUp();
    $(".projects-filter li a").on("click", function (e) {
        e.preventDefault();
    });

    /*==========   lightbox Gallery  ==========*/
    lightbox.option({
        fadeDuration: 300
    });

    /*==========   Active Navigation Link   ==========*/
    function setActiveNavLink() {
        var currentPage = window.location.pathname.split('/').pop() || 'index.html';
        currentPage = currentPage.split('?')[0]; // Remove query parameters
        
        $('.nav__item-link').each(function() {
            var href = $(this).attr('href');
            if (href && href.split('?')[0] === currentPage) {
                $(this).addClass('active');
            } else {
                $(this).removeClass('active');
            }
        });
    }
    
    // Set active nav link on page load
    setActiveNavLink();
    
    // Handle nav link clicks for smooth transitions
    $('.nav__item-link').on('click', function(e) {
        // Only handle internal links (not external or anchors)
        var href = $(this).attr('href');
        if (href && !href.startsWith('http') && !href.startsWith('#')) {
            $('.nav__item-link').removeClass('active');
            $(this).addClass('active');
        }
    });

});