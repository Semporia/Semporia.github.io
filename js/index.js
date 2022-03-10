// Scrolls to the selected menu item on the page
$(function() {
    $('a[href*="#"]:not([href="#"],[data-toggle],[data-target],[data-slide])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 300);
                return false;
            }
        }
    });
    
 	// Closes the sidebar menu
    $("#menu-close").click(function(e) {
        e.preventDefault();
        $("#sidebar-wrapper").toggleClass("active");
    });
    // Opens the sidebar menu
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#sidebar-wrapper").toggleClass("active");
    });
    
    $('a','#sidebar-wrapper').not('#menu-close').click(function(){
    	$("#menu-close").click();
    });
    
	//#to-top button appears after scrolling
    var fixed = false;
    $(document).scroll(function() {
        if ($(this).scrollTop() > 250) {
            if (!fixed) {
                fixed = true;
                // $('#to-top').css({position:'fixed', display:'block'});
                $('#to-top').show("slow", function() {
                    $('#to-top').css({
                        position: 'fixed',
                        display: 'block'
                    });
                });
            }
        } else {
            if (fixed) {
                fixed = false;
                $('#to-top').hide("slow", function() {
                    $('#to-top').css({
                        display: 'none'
                    });
                });
            }
        }
    });
    // Disable Google Maps scrolling
    // See http://stackoverflow.com/a/25904582/1607849
    // Disable scroll zooming and bind back the click event
    /*
    var onMapMouseleaveHandler = function(event) {
        var that = $(this);
        that.on('click', onMapClickHandler);
        that.off('mouseleave', onMapMouseleaveHandler);
        that.find('iframe').css("pointer-events", "none");
    };
    var onMapClickHandler = function(event) {
	    var that = $(this);
	    // Disable the click handler until the user leaves the map area
	    that.off('click', onMapClickHandler);
	    // Enable scrolling zoom
	    that.find('iframe').css("pointer-events", "auto");
	    // Handle the mouse leave event
	    that.on('mouseleave', onMapMouseleaveHandler);
	};
    // Enable map zooming with mouse scroll when the user clicks the map
    $('.map').on('click', onMapClickHandler);
    var result = '38,38,40,40,37,39,37,39,66,65',keyArr = [],acceptInput = true;
    var inputError = function () {
        //$('[id^="inputBtn"]')
        var btns =  $('.rightInput');
        if(btns.size() === 0) return;
        acceptInput = false;
        keyArr = [];
        btns.removeClass('rightInput').addClass('wrongInput');
        setTimeout(function () {
            btns.removeClass('wrongInput');
            acceptInput = true;
        },2000);
    };
    */
    /*
    $(document).keydown(function(e){
        var key = e.keyCode;
        if(!acceptInput || result.indexOf(key) === -1) return;
        e.stopPropagation();
        e.preventDefault();
        if(result.indexOf(key) !== -1) keyArr.push(key);
        else {
            inputError();
            return;
        }
        var iptstr = keyArr.join();
        if(result.indexOf(iptstr) === -1) {
            inputError();
            return;
        }else{
            if(result.substring(0,iptstr.length) === iptstr){
                $('#inputBtn' + keyArr.length).addClass('rightInput');
                if(keyArr.length > 8 && !$('#inputBtnPlus').hasClass('rightInput'))
                    $('#inputBtnPlus').addClass('rightInput');
            }
        }
        if(result === iptstr){
            acceptInput = false;
            bDialog.alert('这都被你发现，还试出来了，算你厉害！',function(){
                keyArr = [];
                $('.rightInput').removeClass('rightInput');
                acceptInput = true;
            },{
                messageType : 'success'
            })
        }
    });
    */
    /*
    var isHttps = 'https:' == document.location.protocol ? true: false;
    if(isHttps){
        $('#contact iframe').remove();
        var map = $('<div>').css({
            'width' : '100%',
            'height' : '100%'
        }).attr('id','mapDiv');
        $('#contact').append(map);
        // 百度地图API功能
        var map = new BMap.Map("mapDiv");    // 创建Map实例
        map.centerAndZoom(new BMap.Point(119.30462,26.078871), 14);  // 初始化地图,设置中心点坐标和地图级别
        map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
        map.setCurrentCity("福州");          // 设置地图显示的城市 此项是必须设置的
        $('#mapDiv').click(function(){
            map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        });
    } else{
        $('#contact iframe').attr('src', 'http://www.google.cn/maps/embed?pb=!1m18!1m12!1m3!1d28670.35468281035!2d119.29191671972148!3d26.072976988156046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3440513e27329f41%3A0x6ef285094a298b88!2z56aP5bu655yB56aP5bee5biC!5e0!3m2!1szh-CN!2scn!4v1507599395612');
    }
    */





    var headerBar = document.getElementById('top');
    var can = document.getElementById('canvas');
    var cxt = can.getContext('2d');

    var pos = headerBar.getBoundingClientRect();
    var w = can.width = pos.width;
    var h = can.height = pos.height;

    var num = 200; //生成点的个数
    var data = []; //定义一个数组，准备用来存坐标
    var move = {};
    var liuXY = [];
    var k = -1;
    var range = Math.atan(k);
    var length = 200;

    //生成num个点，并且存储初始坐标
    for (var i = 0; i < num; i++) {
        data[i] = {
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 8 + 3
        };
        Cricle(data[i].x, data[i].y, data[i].r);
    };

    ! function draw() {
        cxt.clearRect(0, 0, w, h);
        for (var i = 0; i < num; i++) {
            data[i].r += Math.random() * 2 - 1;
            data[i].r = Math.max(0, data[i].r);
            data[i].r = Math.min(12, data[i].r);
            Cricle(data[i].x, data[i].y, data[i].r);
        };
        if (liuXY.length) {
            for (var i in liuXY) {
                liuXY[i].cX -= 10;
                liuX(liuXY[i].cX, liuXY[i].y, liuXY[i].x);
                if (liuXY[i].cX < 0 || getY(liuXY[i].cX, liuXY[i].y, liuXY[i].x) > h) {
                    liuXY.splice(i, 1);
                };
            };
        };
        if (Math.random() > 0.98) {
            var a = Math.random() * (w - 400) + 400;
            liuXY.push({
                x: a,
                y: 0,
                cX: a
            });
        };
        window.requestAnimationFrame(draw);
    }();

    function liuX(x, sX, sY) {
        cxt.save();
        var y = getY(x, sY, sX);
        var r = 15;
        var rad = cxt.createRadialGradient(x, y, 0, x, y, r);
        rad.addColorStop(0, 'rgba(255,255,255,0.8)');
        rad.addColorStop(0.1, 'rgba(255,255,255,0.8)');
        rad.addColorStop(0.2, 'rgba(255,255,255,0.08)');
        rad.addColorStop(1, 'rgba(255,255,255,0)');
        cxt.fillStyle = rad;
        cxt.beginPath();
        cxt.arc(x, y, r, 0, 2 * Math.PI, true);
        cxt.closePath();
        cxt.fill();
        cxt.restore();

        var wX = x + (Math.cos(range) * length);
        var wY = y + (Math.sin(range) * length);

        var x1 = x + 3;
        var y1 = y;
        var x2 = x;
        var y2 = y - 3;

        cxt.save();
        var rad2 = cxt.createRadialGradient(x, y, 0, x, y, length);
        rad2.addColorStop(0, 'rgba(255,255,255,0.1)');
        rad2.addColorStop(1, 'rgba(255,255,255,0)');
        cxt.fillStyle = rad2;
        cxt.beginPath();
        cxt.moveTo(x1, y1);
        cxt.lineTo(x2, y2);
        cxt.lineTo(wX, wY);
        cxt.closePath();
        cxt.fill();
        cxt.restore();
    };

    function getY(x, startY, startX) {
        return k * x + startY - k * startX;
    };

    //画点
    function Cricle(x, y, r) {
        cxt.save();
        var rad = cxt.createRadialGradient(x, y, 0, x, y, r);
        rad.addColorStop(0, 'rgba(255,255,255,0.8)');
        rad.addColorStop(0.1, 'rgba(255,255,255,0.8)');
        rad.addColorStop(0.2, 'rgba(255,255,255,0.08)');
        rad.addColorStop(1, 'rgba(255,255,255,0)');
        cxt.fillStyle = rad;
        cxt.beginPath();
        cxt.arc(x, y, r, 0, 2 * Math.PI, true);
        cxt.closePath();
        cxt.fill();
        cxt.restore();
    };

    $('#currentYear').text(new Date().getFullYear());
});