/**
 * Created by Jingyi21 on 2017/02/13.
 */

//var star_x = [100,200,300,400,500,600,700,800,900,1000];
//var star_y = [100,200,300,400,500,600,700,800,900,1000];

var starObj = function() {
    this.x;
    this.y;

    //this.ySpd;

    this.picNo;

    this.timer;

    this.beta;
}

starObj.prototype.init = function(i) {
    //this.x = Math.random() * w + padLeft;
    //this.y = Math.random() * h + padTop;
    this.x = star_x[i];
    this.y = star_y[i];

    //this.ySpd = Math.random() * 0.6 - 0.3; //[0,2) [-1, 1)
    //this.xSpd = Math.random() * 0.2 - 0.1; //[0,2) [-1, 1)

    this.picNo = Math.floor(Math.random() * 7);
    this.timer = 0;

    this.beta = Math.random() * Math.PI * 0.5;
}

starObj.prototype.update = function() {
    //this.xSpd = Math.random() * 0.2 - 0.1; //[0,2) [-1, 1)
    //this.x += this.xSpd;
    //this.y += this.ySpd;

    if (this.x > (padLeft + w) || this.x < (padLeft - 10))
        this.init();
    else if (this.y > (padTop + h) || this.y < (padTop - 10))
        this.init();

    this.timer += deltaTime;
    if (this.timer > 30) {
        this.picNo += 1;
        this.picNo %= 7;
        this.timer = 0;
    }
}

starObj.prototype.draw = function() {
    this.beta += deltaTime * 0.005;
    ctx.save();
    ctx.globalAlpha = Math.sin(this.beta) * alive;
    //console.log(alive);
    //console.log(ctx.globalAlpha);
    ctx.drawImage(starPic, this.picNo * 7, 0, 7, 7, this.x, this.y, 7, 7);
    ctx.restore();
}



function drawStars() {
    for (var i = 0; i < star_x.length; i++) {
        stars[i].init(i);
        //console.log(stars[i]);
        stars[i].update();
        stars[i].draw();
    }
}

function aliveUpdate() {
    if (switchy) {
        alive += 0.03;
        if (alive > 0.7) {
            alive = 0.7;
        }
    } else {
        alive -= 0.03;
        if (alive < 0) {
            alive = 0;
        }
    }
}