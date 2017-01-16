/**
 * 柱形轮播图
 * @return {[type]} [description]
 */
$(function () {
    var chart = Highcharts.chart('container', {
        chart: {
            backgroundColor: null,
            width: '1000'
        },
        title: {
            text: null,
        },
        subtitle: {
            text: null
        },
        xAxis: {
            categories: ['HTML5', 'CSS3', 'javascript', 'jquery', 'git', 'canvas', 'Angular', 'gulp', 'ajax' , 'photoshop', 'fireworks', 'dreamweaver'],
            labels:{
                style:{
                    color: '#fff',
                    fontSize: '14px'
                },
            }
        },
        yAxis: {
            labels:{
                style:{
                    color: '#fff',
                    fontSize: '14px'
                },
            },
            title:{
                text: null
            }
        },
        series: [{
            type: 'column',
            colorByPoint: true,
            data: [8, 8, 6, 7, 6, 6, 6, 6, 6, 8 , 6 ,4],
            showInLegend: false
        }],
        credits: {
          enabled:false
        },
        exporting: {
            enabled:false
        }

    });

});

/**
 * GreedySnake
 */


function GreedySnake() {
    this.init();
}
GreedySnake.prototype = {
    constructor: GreedySnake,
    init: function () {
        this.renderDom();
        this.bindevents();//绑定事件
    },
    //渲染
    renderDom: function () {
        var canvas = document.getElementById("myCanvas");
        this.ctx = canvas.getContext("2d");
        this.snakelen = 4;//蛇身长度
        this.eatings=0//觅食数量
        this.speed = 300;//速度
        this.stride = 21;//单位宽高
        this.direct = 68;//方向
        this.path = [];//记录轨道
        this.isPause=false;//是否暂停
        this.recordNum();
        // this.createfood();
        this.x=0;
        this.y=0;
        // this.update();
    },
    bindevents: function () {
        //绑定事件
        var self = this;
        var $pause=$("#pause");
        var $nav=$(".greedySnake");
        $(window).keydown(function (event) {
            //绑定键盘事件
            self.direct = event.keyCode;
            if(event.keyCode!=65&&event.keyCode!=87&&event.keyCode!=83)
                self.direct=68;
        })
        $nav.on("click.renew","#start", function () {
            //点击重新开始
            $pause.text("暂停游戏");
            self.isPause=false;
            $nav.off(".renew .gamePause");
            self.ctx.clearRect(0,0, 419, 419);
            clearInterval(self.timer);
            self.init();
            self.update();
            self.createfood();
        }).on("click.gamePause","#pause",function () {
            //点击暂停和恢复

            if(self.isPause===false){
                $pause.text("继续游戏");
                self.isPause=true;
            }
            else{
                self.isPause=false;
                $pause.text("暂停游戏");
                self.update();
            }
        })
    },
    createfood: function () {
        //随机产生食物
        this.foodx = Math.floor(Math.random() * 20) * 21;
        this.foody = Math.floor(Math.random() * 20) * 21;
        for (var i = 0; i < this.path.length; i++) {
            //检测食物是否在蛇身
            if (this.path[i]["x"] == this.foodx && this.path[i]["y"] == this.foody){
                return this.createfood();
            }
        }
        this.ctx.fillStyle = "#FFF200";
        this.ctx.fillRect(this.foodx,this.foody, 20, 20);
    },
    drawSnake: function (x, y) {
        //画蛇
        this.ctx.fillStyle = "#58D437";
        this.ctx.fillRect(x, y, 20, 20);
    },
    update: function () {
        //运动
        var self = this;
            this.timer = setInterval(function () {
                if(self.isPause===true){
                    return clearInterval(self.timer);
                }
                switch (self.direct) {
                    case 65:
                        self.x = self.x - self.stride;
                        break;//左
                    case 87:
                        self.y = self.y - self.stride;
                        break;//上
                    case 68:
                        self.x = self.x + self.stride;
                        break;//右
                    case 83:
                        self.y = self.y + self.stride;
                        break;//下
                }
                if (self.x < 0 || self.x > 399 || self.y < 0 || self.y > 399) {
                    //撞墙检测
                    alert("两眼懵逼，一头撞墙");
                    return clearInterval(self.timer);
                }
                for (var i = 0; i < self.path.length; i++) {
                    //撞自身检测
                    if (self.path[i]["x"] == self.x && self.path[i]["y"] == self.y){
                        alert("淘气，你咬死自己了");
                        return clearInterval(self.timer);
                    }
                }
                if (self.path.length > self.snakelen) {
                    //清除尾巴
                    var del = self.path.shift();
                    self.ctx.clearRect(del["x"], del["y"], 20, 20);
                }
                self.path.push({"x": self.x, "y": self.y})
                self.drawSnake(self.x, self.y);
                self.recordNum();
                self.step++;
                if(self.x==self.foodx && self.y==self.foody){
                    //判断吃食物
                    self.eatings++;
                    self.snakelen++;
                    self.speed=self.speed-10;
                    if(self.speed<100) self.speed=100;
                    clearInterval(self.timer);
                    self.createfood();
                    self.update();
                }
            },self.speed);
        },
    recordNum: function () {
        //记录信息
        var $sankeLength=$("#sankeLength");
        var $foodNum=$("#foodNum");
        var $speed=$("#speed");
        $sankeLength.html(this.snakelen+1);
        $foodNum.html(this.eatings);
        $speed.html(this.speed/1000);
    },
    }


/**
 * 原生轮播图
 */



        //找到对象
    
    var carousel = document.getElementById("carouselId");
    
    var screen = document.getElementById("carouselScreen");
    
    var ul = screen.children[0];
    var ulLis = ul.children;
    var ol = screen.children[1];
    var arr = document.getElementById("arr");
    var left = document.getElementById("car-left");
    var right = document.getElementById("car-right");
    var imgWidth = screen.offsetWidth;
    var pic = 0;//记录图片移动步数
    var square = 0;//记录按钮跟随图片移动步数
    //创建按钮
    for (var i = 0; i < ulLis.length; i++) {
        var li = document.createElement("li");
        li.innerHTML = i + 1;
        ol.appendChild(li);
    }
    var olLis = ol.children;
    olLis[0].className = "current";//默认第一个按钮高亮

    //克隆制造一张假图
    var firstImg = ulLis[0].cloneNode(true);
    ul.appendChild(firstImg);
    //鼠标移动到按钮移动图片并高亮按钮
    for (var j = 0; j < olLis.length; j++) {
        var olbtn = olLis[j];
        olbtn.index = j;
        //如果鼠标移动到第一个图片，则瞬间到达
        if (pic===ulLis.length - 1) {
            olbtn[0].onmouseover = function () {
                ul.style.left = 0;
                for (var i = 0; i < olLis.length; i++) {//遍历设置当前按钮高亮
                    olLis[i].className = "";
                }
                this.className = "current";
            }
        } else {
            olbtn.onmouseover = function () {
                target = -this.index * imgWidth;
                carouselAnimate(ul, target);
                for (var i = 0; i < olLis.length; i++) {//遍历设置当前按钮高亮
                    olLis[i].className = "";
                }
                this.className = "current";
                pic=square=this.index;
            }
        }

    }
    //鼠标进入盒子箭头出现，离开隐藏
    carousel.onmouseover = function () {
        arr.style.display = "block";
        clearInterval(playImg);
    }
    carousel.onmouseout = function () {
        arr.style.display = "none";
        playImg = setInterval(right.onclick, 3000);
    }
    //点击箭头移动图片

    right.onclick = function () {
        if (pic === ulLis.length - 1) {
            ul.style.left = 0 + "px";
            pic = 0;
        }
        pic++;
        target = -pic * imgWidth;
        carouselAnimate(ul, target);
        for (var i = 0; i < olLis.length; i++) {//遍历设置当前按钮高亮
            olLis[i].className = "";
        }
        if (square === olLis.length - 1) {
            square = -1;
        }
        square++;
        olLis[square].className = "current";
    }
    left.onclick = function () {
        if (pic === 0) {
            ul.style.left = -imgWidth * (ulLis.length - 1) + "px";
            pic = ulLis.length - 1;
        }
        pic--;
        target = -pic * imgWidth;
        carouselAnimate(ul, target);
        for (var i = 0; i < olLis.length; i++) {//遍历设置当前按钮高亮
            olLis[i].className = "";
        }
        if (square === 0) {
            square = olLis.length;
        }
        square--;
        olLis[square].className = "current";
    }
    //图片自动播放
    var playImg = setInterval(right.onclick, 3000);
    function carouselAnimate(obj, target) {
        clearInterval(obj.timor);
        obj.timor = setInterval(function () {
            var leader = obj.offsetLeft;
            var step = (target - leader) / 20;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            leader = leader + step;
            obj.style.left = leader + "px";
            if (leader === target) {
                clearInterval(obj.timor);
            }
        }, 15);
    }
