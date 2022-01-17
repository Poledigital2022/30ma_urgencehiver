//banner annimation canva

(function() {

    'use strict';
    var windowsWidthG = $(window).width();
    var textAnimationWave = document.querySelector('.cadreSlide1 .txtBig.mb')
    var svgAnimationWave = document.querySelector('.wave')

    document.querySelector('.cadreAccroche.exiteAnima').style.pointerEvents = 'none';


    if (windowsWidthG <= 768) {
        document.body.style.overflowY = 'hidden';
        textAnimationWave.style.zIndex = 0
        svgAnimationWave.style.zIndex = 0
    }

    var bridge = document.getElementById("bridge"),
        bridgeCanvas = bridge.getContext('2d'),
        brushRadius = (bridge.width / 100) * 5,
        img = new Image();

    if (brushRadius < 50) {
        brushRadius = 50
    }

    img.onload = function() {
        // bridgeCanvas.drawImage(img, 0, 0, window.innerWidth, window.innerHeight);
        bridgeCanvas.drawImage(img, 0, 0, bridge.width, bridge.height);
        // document.querySelectorAll('.form')[0].style.visibility = 'visible'; 

    }

    img.loc = './images/';
    img.filename = 'background-accroche.jpg';

    img.src = img.loc + img.filename;
    img.crossOrigin = "Anonymous";

    destroyCanvas()

    function getFilledInPixels(stride) {
        if (!stride || stride < 1) {
            stride = 1;
        }
        var pixels = bridge.getContext('2d').getImageData(0, 0, bridge.width, bridge.height),
            pdata = pixels.data,
            l = pdata.length,
            total = (l / stride),
            count = 0;

        // Iterate over all pixels
        for (var i = count = 0; i < l; i += stride) {
            if (parseInt(pdata[i]) === 0) {
                count++;
            }
        }

        return Math.round((count / total) * 100);
    }

    function handlePercentage(filledInPixels) {
        filledInPixels = filledInPixels || 0;
        if (filledInPixels > 1) {
            document.querySelector('.cadreAccroche.exiteAnima').style.pointerEvents = 'none';
            // document.querySelector('.cadreAccroche.exiteAnimabtn').style.pointerEvents = 'none';
        }
        if (filledInPixels > 5) {
            document.querySelector('.cadreAccroche.exiteAnima').style.display = 'none';
            // document.querySelector('.cadreAccroche.exiteAnimabtn').style.display = 'none';
        }
        if (filledInPixels > 15) { //pourcentage scratch
            // bridge.parentNode.removeChild(bridge);
            document.querySelector('.cadreAccroche.exiteAnimabtn').style.display = 'none';
            destroyCanvasHtml()
        }

    }

    function detectLeftButton(event) {
        if ('buttons' in event) {
            return event.buttons === 1;
        } else if ('which' in event) {
            return event.which === 1;
        } else {
            return event.button === 1;
        }
    }

    function getBrushPos(xRef, yRef) {
        var bridgeRect = bridge.getBoundingClientRect();
        return {
            x: Math.floor((xRef - bridgeRect.left) / (bridgeRect.right - bridgeRect.left) * bridge.width),
            y: Math.floor((yRef - bridgeRect.top) / (bridgeRect.bottom - bridgeRect.top) * bridge.height)
        };
    }

    function drawDot(mouseX, mouseY) {
        bridgeCanvas.beginPath();
        bridgeCanvas.arc(mouseX, mouseY, 100, 0, 2 * Math.PI);
        bridgeCanvas.fillStyle = '#000';
        bridgeCanvas.globalCompositeOperation = "destination-out";
        bridgeCanvas.fill();
        handlePercentage(getFilledInPixels(32));
    }

    bridge.addEventListener("mousemove", function(e) {
        document.querySelector('.cadreAccroche.exiteAnima').style.pointerEvents = 'none';
        var brushPos = getBrushPos(e.clientX, e.clientY);
        var leftBut = detectLeftButton(e);
        if (leftBut == 1) {
            drawDot(brushPos.x, brushPos.y);
        }
    }, false);

    bridge.addEventListener("touchmove", function(e) {
        e.preventDefault();
        var touch = e.targetTouches[0];
        if (touch) {
            var brushPos = getBrushPos(touch.pageX, touch.pageY);
            drawDot(brushPos.x, brushPos.y);
        }

    }, false);



    document.querySelector('.cadreAccroche.exiteAnimabtn a').addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.cadreAccroche.exiteAnima').style.display = 'none';
        document.querySelector('.cadreAccroche.exiteAnimabtn').style.display = 'none';
        // bridge.parentNode.removeChild(bridge);
        destroyCanvasHtml()
    })
    var body = document.querySelector('.cadre')
    $(window).scroll((e) => {
        var windowsWidth = $(window).width();
        if (windowsWidth > 768) {
            if (bridge.parentNode) {
                body.style.overflowY = 'hidden';
            }
            setTimeout(() => {
                if (bridge.parentNode) {
                    document.querySelector('.cadreAccroche.exiteAnima').style.display = 'none';
                    document.querySelector('.cadreAccroche.exiteAnimabtn').style.display = 'none';
                    // bridge.parentNode.removeChild(bridge);
                    destroyCanvasHtml()
                }
                body.style.overflowY = 'unset';
            }, 500); //500
        }
    })

    function destroyCanvas() {
        setTimeout(() => {
            document.querySelector('.cadreAccroche.exiteAnima').style.display = 'none';
            document.querySelector('.cadreAccroche.exiteAnimabtn').style.display = 'none';
            // bridge.parentNode.removeChild(bridge);
            destroyCanvasHtml()
        }, 15000); //15000
    }



    // function disableScroll() {
    //     // Get the current page scroll position
    //     var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    //     var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    //         // if any scroll is attempted, set this to the previous value
    //         window.onscroll = function() {
    //             window.scrollTo(scrollLeft, scrollTop);
    //         };
    // }

    // function enableScroll() {
    //     window.onscroll = function() {};
    // }
    // disableScroll()
    function destroyCanvasHtml() {
        // bridge.style.display = 'none'
        if (bridge.parentNode) {
            bridge.parentNode.removeChild(bridge);
        }
        if (windowsWidthG <= 768) {
            document.body.style.overflowY = 'unset';
            textAnimationWave.style.zIndex = 2
            svgAnimationWave.style.zIndex = 1
        }
    }

})();