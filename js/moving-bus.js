(function () {
    var animate, imgObjectPosition = 0, imgObj = null;
    var imgObjectStartPosition = -130;
    var imgObjectWidth = 150;
    var marginRight = 50;
    var shouldIncrement = false;

    function init() {
        // console.log("start moving!: ");

        var startElement = document.getElementById('carousel-example-1');

        if (!startElement) {
            startPosition = document.getElementById('pages').getBoundingClientRect().top - 65;
        } else {
            startPosition = startElement.getBoundingClientRect().bottom - 150;
        }
        var windowHeight = window.innerHeight;
        var windowWidth = window.innerWidth;
        // console.log("height: " + windowHeight);
        // console.log("width: " + windowWidth);
        // console.log("footer top: " + document.getElementById('footer').getBoundingClientRect().top);
        // console.log("startPosition: " + startPosition);


        imgObj = document.getElementById('movingBus');
        imgObj.style.display = 'block';
        imgObj.style.position = 'absolute';
        imgObj.style.top = startPosition + 'px';
        imgObj.style.left = imgObjectStartPosition + 'px';
        imgObj.style.visibility = 'hidden';

        moveRight();
    }

    function moveRight() {
        var windowWidth = window.innerWidth - imgObjectWidth - marginRight;

        var totalDiff = windowWidth - imgObjectPosition;
        // console.log(`totalDiff:${totalDiff}`);
        var diff = 1;
        setTimeout(doMoveRight, 500);

        function doMoveRight() {
            var imgObjectCurrentPosition = parseInt(imgObj.style.left, 10);

            // console.log(`windowWidth:${windowWidth}`);
            // console.log(`imgObjCurrentPosition:${imgObjectCurrentPosition}`);
            var centerOfMovementWindow = (windowWidth) / 2;
            var centerOfImgObject = imgObjectCurrentPosition + imgObjectWidth / 2;
            if (centerOfMovementWindow >= centerOfImgObject) {
                if (diff < 10) {
                    if (shouldIncrement) {
                        diff++;
                        shouldIncrement = false;
                    } else {
                        shouldIncrement = true;
                    }
                } else {
                    diff++;
                }
            } else {
                if (diff < 10) {
                    if (shouldIncrement) {
                        diff--;
                        shouldIncrement = false;
                    } else {
                        shouldIncrement = true;
                    }
                } else {
                diff--;
                }
            }

            // console.log("vitesse: " + diff);

            if (diff > 0) {
                imgObj.style.left = (imgObjectCurrentPosition + diff) + 'px';
                imgObj.style.visibility = 'visible';

                animate = setTimeout(function () {
                    doMoveRight();
                }, 20); // call moveRight in 20msec

                //stopanimate = setTimeout(moveRight,20);
            } else {
                stop();
            }
            //f();
        }
    }

    function stop() {
        clearTimeout(animate);
    }

// starting

    window.onload = function () {
        init();
    };


}());

var last_known_scroll_position = 0;
var ticking = false;

function hideBus() {
    imgObj = document.getElementById('movingBus');
    imgObj.style.display = 'none';
}
var viewport = document.getElementsByTagName('body')[0];
viewport.addEventListener('scroll', function (e) {
    if (!ticking) {
        window.requestAnimationFrame(function () {
            // console.log("hide bus: ");
            hideBus(last_known_scroll_position);
            ticking = true;
        });
    }
});