//Get canvas
    var canvas = document.getElementById("canvas");
    //Set 2d draw Env
    var ctx = canvas.getContext("2d");
    var holesNum = 7;
    var holes=new Array(holesNum);
    for(i=0;i<holesNum;i++)
        holes[i]=new Object();
    holes[0].x=100;
    holes[0].y=150;
    holes[1].x=250;
    holes[1].y=150;
    holes[2].x=400;
    holes[2].y=150;
    holes[3].x=550;
    holes[3].y=150;
    holes[4].x=175;
    holes[4].y=300;
    holes[5].x=325;
    holes[5].y=300;
    holes[6].x=475;
    holes[6].y=300;
    
    function BezierEllipse2(ctx, x, y, a, b){
        var k = .5522848,
        ox = a * k, 
        oy = b * k; 
        ctx.fillStyle='rgba(255,0,0,1)';
        ctx.beginPath();
        ctx.moveTo(x - a, y);
        ctx.bezierCurveTo(x - a, y - oy, x - ox, y - b, x, y - b);
        ctx.bezierCurveTo(x + ox, y - b, x + a, y - oy, x + a, y);
        ctx.bezierCurveTo(x + a, y + oy, x + ox, y + b, x, y + b);
        ctx.bezierCurveTo(x - ox, y + b, x - a, y + oy, x - a, y);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    };
    
    function init(){
        for(i=0;i<holesNum;i++)
            BezierEllipse2(ctx, holes[i].x, holes[i].y, 50, 20);
    }
    
    init();
    
    timer=0;
    var moleId;

    document.getElementById("content").onmousemove = function(e) {
        document.getElementById("hammer").style.top = e.pageY*1 - 110 + "px";
        document.getElementById("hammer").style.left = e.pageX*1 - 20 + "px";
        //document.getElementById('cursorX').value = e.pageX;
        //document.getElementById('cursorY').value = e.pageY;
    }
    
    document.getElementById("content").onmousedown = function(e) {
        var hitsuccuess=false;
        for(i=0;i<holesNum;i++)
        {
            if((e.pageX>(holes[moleId].x-90))&&(e.pageX<(holes[moleId].x-50))&&(e.pageY>(holes[moleId].y+10))&&(e.pageY<(holes[moleId].y+80)))
            {
                hitsuccuess=true;
                break;
            }
        }
        if(hitsuccuess)
        {
            timers=0;
        
            ctx.clearRect(0,0,650,400);
            init();

            var mole=new Image();
            mole.src="mole_2.gif";
            ctx.drawImage(mole, holes[moleId].x-45, holes[moleId].y-70);
        }
        document.getElementById("hammer").src="Hammer_2.png";
    }
    
    document.getElementById("content").onmouseup = function(e) {
        document.getElementById("hammer").src="Hammer_1.png";
    }

    function showMoles(){
        //if(running)
        if(timer==10)
        {
            ctx.clearRect(0,0,650,400);
            init();
            moleId = Math.floor(Math.random()*7);
            
	    var mole=new Image();
            mole.src="mole_1.gif";
            ctx.drawImage(mole, holes[moleId].x-45, holes[moleId].y-70);
        }
        else if(timer>200)
        {
            timer=0;
        }
        timer+=1;
    }
    
    setInterval(showMoles, 10);