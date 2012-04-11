//bubble

var bubbleConduct=[];
var Bubble=function(options){
	this.source = options.source;
	this.bubbleOwner = options.source.owner;
	this.x = this.source.x;
	this.y = this.source.y;
	this.isDead = false;
	this.scaleX = 0.7;
	this.scaleY = 0.7;
	this.destination = options.destination;
	this.collisionContainer={
		Monster:{},
		Bubble:[]
	};
}
Bubble.prototype=new Component();
Bubble.prototype.blowup=function(callback){
	var blowImage=Utility.resources["img/armsAttack.png"];
	var spriteSheet=new SpriteSheet({
			images:[blowImage],
			frames:{width:110,height:70,regX:55,regY:35},
			animations:{
				explode:[0,7,"explode"]
			}
		});
	var bitAnim=new BitmapAnimation(spriteSheet);
	bitAnim.x = this.x;
	bitAnim.y = this.y;
	bitAnim.currentAnimationFrame = 0;
	bitAnim.gotoAndPlay(0);
	Utility.stage.addChild(bitAnim);

	callback && callback();
	setTimeout(function(){
		Utility.stage.removeChild(bitAnim);
	},200);
};
Bubble.init=function(){
    bubbleConduct=[];
}

function reduceFunc(func){
        clearTimeout(func.methodID);
        func.methodID=setTimeout(func,500);
}

Bubble.detectHit=function(){
    var item=bubbleConduct,
        diffArr=[];
    //divide into different group
    for(var i=0,len1=item.length;i<len1;i++){

        for(var k=i+1,len2=item.length;k<len2;k++){
            if( item[i].destination==item[k].resource && 
                    item[i].resource==item[k].destination){
                //console.log("in the same line+++++++++++++++++++++",item[i],item[k])	
                //if(item[i].resource.owner!=item[i].destination.owner){
                if(item[i].bubbleList[0] && item[k].bubbleList[0]){
                    if(item[i].bubbleList[0].bubbleOwner!= item[i].destination.owner){
                        diffArr.push(item[i],item[k]);
                    }	
                }
                //}							
            }
        }
    }
    for(var m=0,len=diffArr.length;m<len;m+=2){

        if( diffArr[m].resource.x < diffArr[m+1].resource.x  ){ //m is leftside of the m+1

            if(diffArr[m].resource.y < diffArr[m+1].resource.y){ //m is left up side of m+1
                if(	diffArr[m].bubbleList[0].x >= diffArr[m+1].bubbleList[0].x &&
                        diffArr[m].bubbleList[0].y >= diffArr[m+1].bubbleList[0].y
                  ){
                    diffArr[m].bubbleList[0].blowup(function(){
                        Bomb.privateFun.addCount()
                        Utility.stage.removeChild(diffArr[m].bubbleList[0],diffArr[m+1].bubbleList[0]);
                    diffArr[m].bubbleList.splice(0,1);
                    diffArr[m+1].bubbleList.splice(0,1);
                    if(window.sound_flag == 1)
                    {
                        //Utility.bubbleMusic.playMusic();
                        reduceFunc(Utility.bubbleMusic.playMusic);
                    }                

                    })
                }
            }
            else{ //m is left down side of m+1
                if(diffArr[m].bubbleList[0].x >= diffArr[m+1].bubbleList[0].x &&
                        diffArr[m].bubbleList[0].y <= diffArr[m+1].bubbleList[0].y
                  ){
                    //callback

                    diffArr[m].bubbleList[0].blowup(function(){  
                        Bomb.privateFun.addCount()
                        Utility.stage.removeChild(diffArr[m].bubbleList[0],diffArr[m+1].bubbleList[0]);
                    diffArr[m].bubbleList.splice(0,1);
                    diffArr[m+1].bubbleList.splice(0,1);
                   
                    if(window.sound_flag == 1)
                    {
                       //Utility.bubbleMusic.playMusic();
                       reduceFunc(Utility.bubbleMusic.playMusic);
                    }
               
                    })
                }
            }
        }
        else {// m is rightside of the m+1
            if(diffArr[m].resource.y < diffArr[m+1].resource.y){//m is right up side of m+1
                if(	diffArr[m].bubbleList[0].x <= diffArr[m+1].bubbleList[0].x &&
                        diffArr[m].bubbleList[0].y >= diffArr[m+1].bubbleList[0].y
                  ){
                    diffArr[m].bubbleList[0].blowup(function(){
                        Bomb.privateFun.addCount()
                        Utility.stage.removeChild(diffArr[m].bubbleList[0],diffArr[m+1].bubbleList[0]);
                    diffArr[m].bubbleList.splice(0,1);
                    diffArr[m+1].bubbleList.splice(0,1);
                   
                  if(window.sound_flag == 1)
                    {
                        //Utility.bubbleMusic.playMusic();
                        reduceFunc(Utility.bubbleMusic.playMusic);
                    }
                    
                    })
                }
            }
            else{//m is right down side of m+1
                if(	diffArr[m].bubbleList[0].x <= diffArr[m+1].bubbleList[0].x &&
                        diffArr[m].bubbleList[0].y <= diffArr[m+1].bubbleList[0].y
                  ){
                    diffArr[m].bubbleList[0].blowup(function(){
                        Bomb.privateFun.addCount()
                        Utility.stage.removeChild(diffArr[m].bubbleList[0],diffArr[m+1].bubbleList[0]);
                    diffArr[m].bubbleList.splice(0,1);
                    diffArr[m+1].bubbleList.splice(0,1);
    
                   if(window.sound_flag == 1)
                    {
                        //Utility.bubbleMusic.playMusic();
                        reduceFunc(Utility.bubbleMusic.playMusic);
                    }

                    })
                }
            }
        }

    }

}

Bubble.tick=function(e){
    //bmpAnim.x+=bmpAnim.vX;
    //bmpAnim.y+=bmpAnim.vY;
    //stage.update();
    for(var j=0;j<bubbleConduct.length;j++){
        var cache=bubbleConduct[j].bubbleList;
        var path=bubbleConduct[j].path;
        //console.log(cache)
        //Ticker.removeAllListener();
        var itemToRemove = [];

        for(var i=0;i<cache.length;i++)
        {
            var currentBubble=cache[i];
            //testing for the bubble if it is in the explode range
            var sourceOwner=bubbleConduct[j].resource.owner;
            if(Bomb.isExploding && (sourceOwner==OCTOPUS||sourceOwner==CUTTLEFISH||sourceOwner==GLOBEFISH))
            {
                if((Math.pow(Bomb.bombCoordinate.x-currentBubble.x,2)+Math.pow(Bomb.bombCoordinate.y-currentBubble.y,2))<Math.pow(Bomb.bombCoordinate.radius,2))
                {
                    // if(currentBubble.isEnemy)
                    itemToRemove.push(currentBubble);
                }
            }//end of bomb explode



            currentBubble.x+=path.dx;
            currentBubble.y+=path.dy;
            currentBubble.paused = !currentBubble.paused;

            if(currentBubble.bubbleOwner != GLOBEFISH &&  Utility.judgeInBoss(currentBubble.x,currentBubble.y,games.level) ){
                    itemToRemove.push(currentBubble);
										//console.log("OOO!!!!YYYYYYYYYYYYYYYYYYYYY");
                    if(Utility.bubbleMusic)
                    {
                        if(window.sound_flag == 1)
                        {
                            //Utility.bubbleMusic.playMusic();
                            reduceFunc(Utility.bubbleMusic.playMusic);
                        }
                    }
								Utility.judgeInBoss(currentBubble.x,currentBubble.y,games.level).armySize --;

						}

						else if(Utility.judgeInCircle(currentBubble.x,currentBubble.y,games.level,bubbleConduct[j].resource))
            {
                var target=Utility.judgeInCircle(currentBubble.x,currentBubble.y,games.level,bubbleConduct[j].resource);
                if(target.type != "boss"||bubbleConduct[j].resource.owner!=GLOBEFISH)
                {
                    itemToRemove.push(currentBubble);
                    //to test if it is the boss
    		       if(target.type!="boss")
                        bubbleConduct[j].destination.bubbleIn(currentBubble);
                   else
                        Utility.judgeInCircle(currentBubble.x,currentBubble.y,games.level,bubbleConduct[j].resource).armySize--;

                    if(Utility.bubbleMusic)
                    {
                        if(window.sound_flag == 1)
                        {
                            //Utility.bubbleMusic.playMusic();
                            reduceFunc(Utility.bubbleMusic.playMusic);
                        }
                    }
                }
		/*
                if(bubbleConduct[j].destination.waitBubble > 0){
                    bubbleConduct[j].destination.shootCount++;
                }

                if(bubbleConduct[j].destination.owner == currentBubble.bubbleOwner){
                    bubbleConduct[j].destination.updateArmySize({command:"up", bubbleSource:currentBubble.bubbleOwner});
                }
                else{
                    if(currentBubble.bubbleOwner == PLAYER){
                        Bomb.privateFun.addCount();
                    }
                    bubbleConduct[j].destination.updateArmySize({command:"down",bubbleSource:currentBubble.bubbleOwner});
                    //bubbleConduct[j].destination = Utility.getTowerById(bubbleConduct[j].destination.id);
                }
                // if(itemToRemove.length==cache.length)
                // 	bubbleConduct.splice(bubbleConduct.indexOf(bubbleConduct[j]),1)
		*/
            }
        }
        for(i = 0; i < itemToRemove.length ; i++){
            cache.splice(cache.indexOf(itemToRemove[i]),1);
            itemToRemove[i].blowup=Bubble.prototype.blowup;
            itemToRemove[i].blowup();
            Utility.stage.removeChild(itemToRemove[i]);
        }
    }
    //console.log("ticking")
}
