var Bomb={
    bombFactor:{
                   shape:null,
                   update:true

               },
    count:0,
    isExploding:false,
    bombCoordinate:{x:0,y:0,radius:0},
    totalKill:0,
    init:function(options){
        this.stage=options.stage;
        this.canvas=options.canvas;
        this.stage.enableMouseOver();
        this.privateFun.loadUnInitContainer(Utility.resources["img/bombUnInit.png"]);
        this.privateFun.loadCounter(Utility.resources["img/bombCounter.png"]);

    },

    // loadImage:function(src,callback){
    // 	var image=new Image();
    // 	image.src=src;
    // 	image.onload = callback;
    // 	return image;
    // }, //end of loadImage

    tick:function(){
             this.stage.update();
         }
}
Bomb.privateFun=(function(extVar){
    var IO={};//give the IO for external calling
    var UnInitCT=new Container();
    var InitBombBitmap=null;
    var UnInitBombBitmap=null;
    var publicVar=extVar;
    var shape;
    var count=0;
    var label;
    ///function to load the bomb image(skill_false.png) which has not inited with 0 degree;
    IO.loadUnInitContainer=function(unInitBomb){
        UnInitBombBitmap=new Bitmap(unInitBomb);
        UnInitBombBitmap.x=754;
        UnInitBombBitmap.y=396;
        UnInitCT.addChild(UnInitBombBitmap);
        publicVar.stage.addChild(UnInitCT);
        //bombAnimation(Utility.resources["img/bombInit.png"])//attention here,just for testing and waiting for the init IO
        //setInterval(IO.addCount,1000)
    }//end of loadUninitBomb
    //function to load the counter beside the bomb
    IO.loadCounter=function(img){
        var counterMap=new Bitmap(img);
        counterMap.x=705;
        counterMap.y=435;
        UnInitCT.addChild(counterMap);
        drawCount(Bomb.count);

    }			
    IO.addCount=function(){
        Bomb.totalKill++;
        if(Bomb.count<50&&UnInitBombBitmap.visible)
        {
            Bomb.count+=10;
            drawCount(Bomb.count)
                if(Bomb.count==50)
                {
                    bombAnimation(Utility.resources["img/bombInit.png"]);
                }
        }
    }
    function drawCount(text){

        UnInitCT.removeChild(label);
        label = new Text(text.toString(), "20px Arial", "orange");
        label.textAlign = "center";
        label.x = 742;
        label.y = 458;
        label.maxWidth=40;
        UnInitCT.addChild(label)
    }


    // //function to switch the bomb to initialized state
    // var bombReady=function (){
    // 	 Bomb.loadImage("img/skill_But.png",bombAnimation)
    // 	 UnInitBombBitmap.visible=false;
    // } //end of bombReady

    var bombAnimation=function (img){
        //console.log(InitBombBitmap)
        InitBombBitmap=new Bitmap(img);
        //var g = new Graphics();		
        InitBombBitmap.x=756;
        InitBombBitmap.y=394;
        UnInitBombBitmap.visible=false;
        Utility.stage.addChild(InitBombBitmap);
        InitBombBitmap.onPress = function(evt) {
            Bomb.count=0;
            drawCount(0)
                var target=InitBombBitmap;
            var offset = {x:target.x-evt.stageX, y:target.y-evt.stageY};
            evt.onMouseMove = function(ev) {
                target.x = ev.stageX+offset.x;
                target.y = ev.stageY+offset.y;				
            }
            evt.onMouseUp = explode;

        }//end of onPress
       // Ticker.addListener(Bomb);

    }//end of bombAnimation

    var explode=function (evt){
        Bomb.isExploding=true;
        var explodeImg=new Image();
        explodeImg.src="img/result.png";
        explodeImg.onload=function(event){
            var spriteSheet=new SpriteSheet({
                images:[event.target],
                frames:{width:253,height:210,regX:50,regY:50},
                animations:{
                    explode:[0,13,"explode"]
                }
            });
            var bmpAnim = new BitmapAnimation(spriteSheet);
            bmpAnim.scaleX=0.7;
            bmpAnim.scaleY=0.7;
            bmpAnim.x=InitBombBitmap.x;
            bmpAnim.y=InitBombBitmap.y;
            Bomb.bombCoordinate.x=evt.stageX;
            Bomb.bombCoordinate.y=evt.stageY;
            Bomb.bombCoordinate.radius=Math.sqrt(Math.pow(85,2)+Math.pow(75,2))+3;
                //console.log(Bomb.bombCoordinate.radius)
                Utility.stage.removeChild(InitBombBitmap)
                //InitCT.removeChild(shape)
                bmpAnim.gotoAndPlay("explode");		
            bmpAnim.currentAnimationFrame=5;
            var i=0;
            var bombTarget=null;
            var isInEnmy=(function(){
              //  console.log(evt.stageX,evt.stageY)
                if(Utility.judgeInCircle(evt.stageX,evt.stageY,games.level))
            {
                bombTarget=Utility.getTowerById( Utility.judgeInCircle(evt.stageX,evt.stageY,games.level).id );
                return true;
            }
                else
                return false;
            })()
            //console.log(bombTarget)
                bmpAnim.onAnimationEnd=function(){
                    i++;
                   if(Utility.bombMusic)
                       {
                            //Utility.bombMusic.removeSound();
                            Utility.bombMusic=null;
                       } 
                    else
                    {
                        Utility.bombMusic=new soundManager2(Utility.resources["./music/bomb"].sound,"bombMusic");
                        if(window.sound_flag == 1)
                        {
                            Utility.bombMusic.playMusic();
                        }
                    }
                  
                    if(isInEnmy&&(bombTarget.owner==OCTOPUS||bombTarget.owner==CUTTLEFISH||bombTarget.owner==GLOBEFISH))
                    {
                        var size = bombTarget.armySize;
                        if(size > 5)
                        {
                            for(var j=0;j<3;j++)
                                if(bombTarget.armySize>1)
                                    bombTarget.updateArmySize({command:"down"})
                        }
                        else
                        {
                            for(var j=0;j<bombTarget.armySize-1;j++)
                            {
                                bombTarget.updateArmySize({command:"down"})
                            }
                        }

                    }

                    if(i==3){
                        Bomb.isExploding=false;
                        Utility.stage.removeChild(bmpAnim);
                        UnInitBombBitmap.visible=true;
                    }
                }
            Utility.stage.addChild(bmpAnim);
        }
    }//end of explode

    return IO;
})(Bomb)//function to protect private Interface
