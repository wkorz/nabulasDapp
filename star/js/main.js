/**
 * Created by Jingyi21 on 2017/02/13.
 */
window.requestAnimFrame = ( function() {
    return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                function( callback ) {
                    window.setTimeout( callback, 1000 / 60 );
                };
})();

var can;
var ctx;

var w;
var h;

var star_x = [];
var star_y = [];

var padLeft = 0;
var padTop = 0;

//var girlWidth = 600;
//var girlHeight = 300;
var limiterTotal = 5;
var limiterTick = 0;

var deltaTime;
var lastTime;

//var girlPic = new Image();
var starPic = new Image();

var stars = [];
var num = 1000;

var alive = 0;

var switchy = true;
var mousedown = false;

var mx;
var my;

function init() {
    can = document.getElementById("canvas");
    ctx = can.getContext("2d");

    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;

    w = can.width;
    h = can.height;
/*
    var a=document.getElementById("test");  
    a.style.width="100%";  
    a.style.height="5%"; 
*/
    //document.addEventListener('mousemove', mousemove, false);

    //girlPic.src = "src/girl.jpg";
    starPic.src = "src/star.png";

    for (var i = 0; i < num; i++) {
        stars[i] = new starObj();
        stars[i].init();
    }

    lastTime = Date.now();
    //foreach();
    gameLoop();
}

function gameLoop() {
    window.requestAnimFrame(gameLoop);
    var now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;

    fillCanvas();
    /*

    if( limiterTick >= limiterTotal ) {

        if ( mousedown ) {
            star_x.push(mx);
            star_y.push(my);
            console.log("x:"+star_x);
            console.log("y:"+star_y);
        }
    } else {
        limiterTick++;
    }
    */
    //drawGirl();


    drawStars();

    aliveUpdate();
            //console.log("flag");
            //console.log("x:"+star_x);
           // console.log("y:"+star_y);
           // console.log("-----------");
}

function fillCanvas() {
    //ctx.fillStyle = "#393550";
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, w, h);
}

function getMousePos(event) {
    console.log("click");
            var e = event || window.event;
            mx = e.clientX
            my = e.clientY;
            star_x.push(mx);
            star_y.push(my);
            console.log(mx);
            console.log(my);

}



/*
function foreach () {
    console.log("foreach-----start");
    var to = dappaddress;
    var value = "0";
    var callFunction = "foreach";
    var callArgs = "";
    nebPay.simulateCall(to,value,callFunction,callArgs,{
        listener:function(resp){
            console.log(resp.result);
        }
    })

}
*/

/*
can.addEventListener( 'mousemove', function( e ) {
    mx = e.pageX - can.offsetLeft;
    my = e.pageY - can.offsetTop;
});

// toggle mousedown state and prevent canvas from being selected
can.addEventListener( 'mousedown', function( e ) {
    e.preventDefault();
    mousedown = true;
});

can.addEventListener( 'mouseup', function( e ) {
    e.preventDefault();
    mousedown = false;
});
*/
/*
function drawGirl() {
    ctx.drawImage(girlPic, padLeft, padTop, girlWidth, girlHeight);
}
*/

/*
function mousemove(e) {
    if (e.offsetX || e.layerX) {

        var px = e.offsetX == undefined ? e.layerX : e.offsetX;
        var py = e.offsetY == undefined ? e.layerY : e.offsetY;

        if (px > padLeft && px < (padLeft + girlWidth) && py > padTop && py < (padTop + girlHeight)) {
            switchy = true;
        } else {
            switchy = false;
        }
    }
}
*/
// once the window loads, we are ready for some fireworks!

