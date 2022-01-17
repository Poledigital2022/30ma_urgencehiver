$(document).ready(function() {

    /** TRACKING **/
    /*
    add .. data-utmlink .. to the <a></a> 
    exemple :
    <a href="LINK" target="_blank" data-utmlink >
        some text
    </a>
*/


    var urlWindows = window.location.href; // get url 
    const urlParams = new URLSearchParams(urlWindows);
    const utm_source = urlParams.get('utm_source');
    const utm_medium = urlParams.get('utm_medium');
    const utm_campaign = urlParams.get('utm_campaign');


    document.onreadystatechange = () => { // execute whene page state/UI change
        if (document.readyState === 'complete') { // check if page is fully loaded
            if (utm_source) {
                let linkArr = document.querySelectorAll('a[data-utmlink]'); // get all link with [data-utmlink]
                linkArr.forEach(link => {
                    var url = link.getAttribute('href');
                    var arr = url.split('?');
                    if (arr.length > 1 && arr[1] !== '') {
                        url = url + `&utm_source=${utm_source}&utm_medium=${utm_medium}&utm_campaign=${utm_campaign}`
                    } else {
                        url = url + `?utm_source=${utm_source}&utm_medium=${utm_medium}&utm_campaign=${utm_campaign}`
                    }
                    link.setAttribute('href', url);
                })
            }
        }
    };


    /** fin TRACKING **/

    /** loader **/
    $(window).on('load', function() {
        setTimeout(function() { // allowing 3 secs to fade out loader
            $('#loader-page').fadeOut('slow');
        }, 1500);
    });
    /** fin loader **/
    // Hide Header on on scroll down
    // var didScroll;
    // var lastScrollTop = 0;
    // var delta = 200;
    // var navbarHeight = $('.conteneur2btn.fxScroll').outerHeight();

    // $(window).scroll(function(event) {
    //     didScroll = true;
    //     hasScrolled();
    // });

    // setInterval(function() {
    //     if (didScroll) {

    //         didScroll = false;
    //     }
    // }, 250);

    // function hasScrolled() {
    //     var st = $(this).scrollTop();
    //     var winHeight = $(this).outerHeight();
    //     var offset = $('.conteneur2btn.fxScroll').offset().top;
    //     var _height = $('.conteneur2btn.fxScroll').outerHeight();

    //     // Make sure they scroll more than delta
    //     if (Math.abs(lastScrollTop - st) <= delta)
    //         return;

    //     // If they scrolled down and are past the navbar, add class .nav-up.
    //     // This is necessary so you never see what is "behind" the navbar.
    //     if ((st + winHeight) > (offset + _height)) {
    //         // Scroll Down
    //         $('.conteneur2btn.fxScroll').addClass('nav-up');
    //     } else {
    //         $('.conteneur2btn.fxScroll').removeClass('nav-up');
    //     }

    //     lastScrollTop = st;
    // }
    $(".navDown").css({
        "position": "relative"
    })
    $(window).scroll(function() {
        if ($(this).scrollTop() < 200) {
            $(".fxScroll").removeClass("navDown");
        } else {
            $(".fxScroll").addClass("navDown");
        }
    });
    /** fin .conteneur2btn.fxScroll**/
    /* debut remplissage don*/
    (function() {
        var c1 = document.getElementById("c1");
        var c2 = document.getElementById("c2");
        var ctx1 = c1.getContext("2d");
        var ctx2 = c2.getContext("2d");
        c1.height = 300;
        c1.width = 300;
        c2.height = 300;
        c2.width = 300;

        ctx1.fillStyle = "white";
        ctx1.strokeStyle = "red";
        ctx2.fillStyle = "white";
        var c1Flakes = [];
        var c2Flakes = [];

        function Flake(r) {
            this.x = Math.random() * 300;
            this.y = Math.random() * 250;
            this.r = r;
        }

        for (var i = 0; i <= 80; i++) {
            var flake = new Flake(2);
            c1Flakes.push(flake);
        }

        for (var i = 0; i <= 80; i++) {
            var flake = new Flake(3);
            c2Flakes.push(flake);
        }

        function render() {
            ctx1.clearRect(0, 0, 300, 300);
            ctx2.clearRect(0, 0, 300, 300);
            for (var i = 0; i < c1Flakes.length; i++) {
                ctx1.beginPath();
                ctx1.arc(c1Flakes[i].x, c1Flakes[i].y, c1Flakes[i].r, 0, Math.PI * 2);
                ctx1.fill();
                if (c1Flakes[i].y <= 275) {
                    c1Flakes[i].y += .3;
                } else {
                    c1Flakes[i].y = 0;
                }
            }

            for (var i = 0; i < c2Flakes.length; i++) {
                ctx2.beginPath();
                ctx2.arc(c2Flakes[i].x, c2Flakes[i].y, c2Flakes[i].r, 0, Math.PI * 2);
                ctx2.fill();
                if (c2Flakes[i].y <= 275) {
                    c2Flakes[i].y += .6;
                } else {
                    c2Flakes[i].y = 0;
                }
            }
            requestAnimationFrame(render);
        }
        render();
    })();
    /* fin remplissage don*/


    /** fixed header **/
    $(function() {
        $(window).on("scroll", function() {
            if ($(window).scrollTop() > 140) {
                $(".header").addClass("active");
            } else {
                //remove the background property so it comes transparent again (defined in your css)
                $(".header").removeClass("active");
            }
        });
    });
    /** fin fixed header **/
    /** debut popup **/
    $('.modal-toggle').click(function() {
        $('.modal').addClass('active');
    });

    $('.modal-close').click(function() {
        $('.modal').removeClass('active');
    });
    /** fin popup **/
    /*debut slick sliderImg*/
    $('.sliderImg').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        nextArrow: '<div class="rightArrows"><i class="fa fa-angle-right"></i></div>',
        prevArrow: '<div class="leftArrows"><i class="fa fa-angle-left"></i></div>',
        dots: true,
        customPaging: function(slick, index) {
            return '<a><i class="fa fa-snowflake-o"></a>';
        },
        responsive: [{
            breakpoint: 769,
            settings: {
                arrows: false
            }
        }]
    });
    /*fin slick sliderImg*/
    /*debut slick skeletteChifreCle*/
    $('.skeletteChifreCle').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true,
        dots: true,
        settings: "unslick",
        responsive: [{
            breakpoint: 769,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: true,
                customPaging: function(slick, index) {
                    return '<a><i class="fa fa-circle"></a>';
                },
                arrows: true
            }
        }, {
            breakpoint: 9999,
            settings: "unslick"
        }]
    });
    /*fin slick skeletteChifreCle*/




});