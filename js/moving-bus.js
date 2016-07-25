(function () {
    var animate, left = 0, imgObj = null;

    function init() {
        console.log("start moving!: ");

        var startElement = document.getElementById('carousel-example-1');

        if (!startElement) {
            startPosition = document.getElementById('pages').getBoundingClientRect().top - 65;
        } else {
            startPosition = startElement.getBoundingClientRect().bottom - 150;
        }
        var windowHeight = window.innerHeight;
        var windowWidth = window.innerWidth;
        console.log("height: " + windowHeight);
        console.log("width: " + windowWidth);
        console.log("footer top: " + document.getElementById('footer').getBoundingClientRect().top);
        console.log("startPosition: " + startPosition);


        imgObj = document.getElementById('movingBus');
        imgObj.style.display = 'block';
        imgObj.style.position = 'absolute';
        imgObj.style.top = startPosition + 'px';
        imgObj.style.left = '-300px';
        imgObj.style.visibility = 'hidden';

        moveRight();
    }

    function moveRight() {
        var totalDiff = window.innerWidth - 400 - parseInt(imgObj.style.left, 10);
        var diff = 5;
        doMoveRight();

        function doMoveRight() {

            left = parseInt(imgObj.style.left, 10);

            if ((window.innerWidth - 400)/2 >= left) {
                diff++;
            } else {
                diff--;
            }

            console.log("vitesse: " + diff);

            if (window.innerWidth - 400 >= left) {
                imgObj.style.left = (left + diff) + 'px';
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

function doSomething() {
    imgObj = document.getElementById('movingBus');
    imgObj.style.display = 'none';
}

window.addEventListener('scroll', function (e) {
    if (!ticking) {
        window.requestAnimationFrame(function () {
            console.log("hide bus: ");
            doSomething(last_known_scroll_position);
            ticking = true;
        });
    }
});