
//The Basic of the game Component
var Component=function(options){
    var that=this;
    this.tickContainer={
        tick:function(){
                // console.log("default tick");
                 this.Game.isPlay && this.Game.stage.update();
                 if(!this.Game.isPlay){
                     that.dispose()
                 }
             }
    };
    this.action = undefined;
};
Component.prototype=new BitmapAnimation();
/*Component.prototype.defaultTickFun=function(){
  console.log("default tick")
  this.Game.isPlay && this.Game.stage.update();
  }*/
Component.prototype.init=function(options){
    var that=this;
    this.Game = options.Game;
    this.insideGlobalVariable=options.insideGlobalVariable||{};
    if(options.animations){//this component has animation at the beginning	
        //init Tower Component
        //Tower itself
        var img= options.img;
        //console.log("img loaded");
        var spriteSheet=new SpriteSheet({
            images:[img],
            frames:options.frames,
            animations:options.animations
        });
        that.spriteSheet=spriteSheet;
        that.gotoAndPlay(options.startAnimName);
        that.speed=options.speed || 1;
        that.direction=options.direction || 90;
        that.currentAnimationFrame=options.currentAnimationFrame || 0;

        this.Game.stage.addChild(that);
        if(options.tickFun){
            that.tickContainer={}
            that.tickContainer.tick=function(){
                //console.log("user defined tick")
                    //this.Game.isPlay && options.tickFun();
                    options.tickFun();
                /*if(!this.Game.isPlay){
                  that.dispose()
                  }*/
            }
        }
        //Ticker.addListener(that.tickContainer);
        this.Game.stage.update();

    }
    else{//static component
        var bitmap=new Bitmap(),
            img=options.img;
       // console.log(img)
        bitmap.x=that.x;
        bitmap.y=that.y;
        this.Game.stage.addChild(bitmap);
        this.Game.stage.update();
    }
    options.callback && options.callback();
    return this;
};
Component.prototype.dispose=function(options){
    //remove stage children
    this.Game.stage.removeChild(this);
    options.callback && options.callback();
};
Component.prototype.makeAction=function(options){
  var count=0,
      that=this;
  this.action = function(){
      var gameFPS=options.gameFPS || 30, //get it from other place
          multiplier=options.multiplier;
      if( count ++ < (1000 / gameFPS) * multiplier-1){
        //options.callback1 && options.callback1();
        that.paused=true;
      }
      else{
        //options.callback2 && options.callback2();
        that.paused=false;
        count=0;
      }
  }
}
/*
Utility.CustomComponentList.push(
  elem.makeAciton({
    gameFPS:30,    //get it from the global configuartion
    multiplier:0.6
  })
);
*/


/*BitmapAnimation.prototype.init=function(){

  };
  BitmapAnimation.prototype.dispose=function(){

  };*/



//Game Component || Modules
var Bomb=(function(){
    return {
        init:function(){
                 //console.log("bomb initializing");
             }
    }
})();
var Timer=(function(){
    return {
        init:function(){
                 //console.log("Timer initializing");
             }
    }
})();
var Setting=(function(){

})();

