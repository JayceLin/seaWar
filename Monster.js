//var MonsterConduct=[];
var MonsterWithLeave=[];
window.Towers=[];
//var PlayerTowerList = [];
//var EnemyTowerList = [];

//The basic class of the Tower
var Monster = function(options,undefined){
    this.type=options.type;
    this.owner=options.owner;
    this.armySize=options.armySize || 0;
    this.id=options.id;
    this.status		= options.status || "normal";
    this.attacker	= -1;
    this.neighbours=options.neighbours || [];
    this.x=options.x;
    this.y=options.y;
    this.Game = options.Game;
    this.label=new Text(0, "20px Arial", "black");
    this.fpsCount = 0;
    this.lastUnderAttactTime = -1;
    var orders	= [];
    this.addOrder = function(order){
        if(this.owner == PLAYER||this.owner == NEUTRAL){
           /* console.log("error occurs ");
            console.log(order.destination);
            console.log(this);
            console.log(order);*/
        }
        orders.push(order);
    }
    this.getAvailableArmySize = function(){
	    var total = 0;
	    for(var i=0;i<orders.length;i++){
		    total +=orders[i].amount;
	    }
	    var size = (this.armySize - total);
	    return size >0?size:0;
    }
    this.getOrders = function(){
	    return orders;
    }
    this.clearOrder = function(){
	    orders.splice(0,orders.length);
	    orders  = new Array();
    }
    this.armPic = options.armPic;
    Utility.stage.addChild(this.label);
}
//Monster.prototype=new BitmapAnimation();
Monster.prototype=new Component();


Monster.prototype.drawArmySize=function(){

	var InitBombBitmap=new Bitmap(Utility.resources["img/armscount.png"]);	
	InitBombBitmap.x=this.x+30;
	InitBombBitmap.y=this.y-40;
	InitBombBitmap.regX=InitBombBitmap.width/2;
	InitBombBitmap.regY=InitBombBitmap.height/2;
	Utility.stage.addChild(InitBombBitmap);
	Utility.drawCount({text:this.armySize,x:this.x+50,y:this.y-20,label:this.label,maxWidth:40});
	var that=this;
	return this;
}



Monster.prototype.updateArmySize=function(options){
	if(options.command=="up"){
		this.armySize++
    	}else if(options.command == "down"){
		if(options.bubbleSource){
	    		if(options.bubbleSource != this.owner){
				this.status = "UnderAttact";
				this.attacker = options.bubbleSource;
	        	        this.lastUnderAttactTime = this.fpsCount;
			}
        	}
		if(this.armySize==0){
			this.changeOwner(options.bubbleSource);
			return;
		}else{
			this.armySize--;
		}
	}
	Utility.drawCount({
		text:this.armySize,
		x:this.x+50,
		y:this.y-20,
		label:this.label,
		maxWidth:40
	});
};
Monster.prototype.ticks = function(fps){
	this.fpsCount++;
	if(this.fpsCount % (fps/2) == 0){
		if(this.fpsCount - this.lastUnderAttactTime >= fps){
			this.status	= "normal";
			this.attacker	= -1;
		}
		//Shoot
		if(this.shootCount && this.shootCount > 0 && this.bubbleAnim){
			if(!this.bubbleDestination){
				this.shootCount = 0;
			}
			else{
				var b=this.bubbleAnim.clone();
				var sourceOwner=this.bubbleAnim.source.owner;
				if(sourceOwner==OCTOPUS||sourceOwner==CUTTLEFISH||sourceOwner==GLOBEFISH){
					b.isEnemy=true;
				}
				b.blowup=Bubble.prototype.blowup;
				b.bubbleOwner=this.bubbleAnim.bubbleOwner;
				b.x=this.x + this.curPath.path.dx * 5;
				b.y=this.y + this.curPath.path.dy * 5;
				b.gotoAndPlay("walk");
				b.currentAnimationFrame=0;
				b.destination = this.bubbleDestination;
				this.curPath.bubbleList.push(b);
				Utility.stage.addChildAt(b,1); //"1" just in front of background!!
				//console.log("X:" + this.curPath.path.dx  + "Y:" + this.curPath.path.dy + "curPath>>>>>>>>>>>>>>>");
				this.curPath.count--;
				this.updateArmySize({command:"down",bubbleSource:this.owner});
				this.shootCount--;
			}
		}
		
		if(this.getOrders().length > 0){
			var orders = this.getOrders();
			shootPointToObj.shoot(this, orders[0].destination,this.Game);

			orders[0].amount--;
			if(orders[0].amount <= 0){
				orders.splice(0,1);
			}
		}
		//set this.fpsCount = 0
	}
	var that=this,
	    addArmySize=function(){
	    	that.armySize++;
	    	Utility.drawCount({text:that.armySize,x:that.x+50,y:that.y-20,label:that.label,maxWidth:20});
		}
	//decide the type and then update it in different time tick
	if(this.type=="Base"){
		if(this.owner==NEUTRAL)
		{
			if(this.fpsCount % (fps *7) == 0){
				addArmySize();
			}
		}
		else
		{
			if(this.fpsCount % (fps *4) == 0){
				addArmySize();
			}
		}
		
	}
	

	/*if(this.fpsCount % (fps * 7) == 0){
		 this.armySize++;
		 Utility.drawCount({text:this.armySize,x:this.x+50,y:this.y-20,label:this.label,maxWidth:20});
	}*/
}
Monster.prototype.shoot = function(bubblePath,destination){
	var bubbleAnim=new Bubble({source:this,destination:destination});
	bubbleAnim.init({
		Game:this.Game,
		img:this.armPic,
		frames:{width:36,height:37,regX:18,regY:18},
		animations:{stand:[0,7,"stand"]},
		speed:2,
		direction:90,
		currentAnimationFrame:0,
		startAnimName:"stand"										
	});
	this.bubbleAnim = bubbleAnim;
	Utility.stage.removeChild(bubbleAnim);
	this.bubbleDestination = destination;
    this.curPath = bubblePath;
	if(this.armySize >= 1){
		this.shootCount = Math.ceil(this.armySize/2); 
	}
	else{
		this.shootCount = 0;
	}
}
Monster.prototype.addEventListener=function(options){
	if(options.callback){
		this[options.eventType]=options.callback
	}
	return this;
};

/*//deprecated 
Monster.prototype.loadCoordinate=function(data){
	//load the configration 
	//console.log("loading coordinate and place the Object")
};
*/

Monster.prototype.receive=function(options){
	//@@ parameters
	//console.log("receive target: ",options.target);
	//this.armySize++
	//update canvas
}
Monster.prototype.bubbleIn=function(bubble){
	if(bubble.bubbleOwner == this.owner){
		if(this.type == "boss")
			return;
		if(bubble.destination && bubble.destination != this){
			this.shootCount++;
		}
		this.updateArmySize({command:"up",bubbleSource:bubble.bubbleOwner});
	}
	else{
		this.updateArmySize({command:"down",bubbleSource:bubble.bubbleOwner});
	}
	if(bubble.bubbleOwner == PLAYER && bubble.destination.owner!=PLAYER){
		Bomb.privateFun.addCount();
	}

}

Monster.prototype.changeOwner=function(owner){
	var imgObj={},
	frameChoice={},
	that=this,
	animations={};
    this.clearOrder();
    this.waitBubble = 0;
    this.shootCount = 0;
    this.bubbleAnim = undefined;
    //console.log("====================");
   // console.log(this);
    MonsterWithLeave.indexOf(this) ;
    
    if(MonsterWithLeave.indexOf(this) != -1){
       // console.log("remove!!");
        MonsterWithLeave.splice(MonsterWithLeave.indexOf(this),1);
          //  console.log(shootPointToObj.leaveContainer);
        for(i = 0; i < shootPointToObj.leaveContainer.length ; i++){
            if(shootPointToObj.leaveContainer[i].resource == this){
            	Utility.stage.removeChild(shootPointToObj.leaveContainer[i])
                shootPointToObj.leaveContainer.splice(i,1);
                //console.log("remove!!!!!!!!!!");
                break;
            }
        }
    }
	//if(this.type=="Base"){ //TODO Why this?
        //this.clearOrder();
	//console.log("new owner =>"+owner);

	//if(owner==OCTOPUS||owner==CUTTLEFISH||owner==GLOBEFISH){
	if(owner!=PLAYER){
		if(this.type=="Base"){
			if(owner==OCTOPUS){
				imgObj=Utility.resources["img/enemy_move.png"];
				var animations={stand:[0,1,2,3,4,5,6,"stand"]};
				var spriteSheet=new SpriteSheet({
	       				images:[imgObj],
					frames:{width:77,height:91,regX:34,regY:42},
					animations:animations
				});
			}
			else if(owner==CUTTLEFISH){
				imgObj=Utility.resources["img/team3_move.png"];
				var animations={stand:[0,1,2,3,4,5,6,"stand"]};
				var spriteSheet=new SpriteSheet({
	       				images:[imgObj],
					frames:{width:99,height:105,regX:50,regY:52},
					animations:animations
				});
			}
			else if(owner==GLOBEFISH){
				imgObj=Utility.resources["img/team4_move.png"];
				var animations={stand:[0,1,2,3,4,5,"stand"]};
				var spriteSheet=new SpriteSheet({
	       				images:[imgObj],
					frames:{width:116,height:81,regX:34,regY:42},
					animations:animations
				});
			}
			
			
		}else{//Transfer owned by the others
			if(owner==OCTOPUS){
				imgObj=Utility.resources["img/tower2_normal.png"];
				var animations={stand:[0,1,2,"stand"]};
				var spriteSheet=new SpriteSheet({
	       				images:[imgObj],
					frames:{width:90,height:83,regX:40,regY:41},
					animations:animations
				});
			}
			else if(owner==CUTTLEFISH){
				imgObj=Utility.resources["img/tower3_normal.png"];
				var animations={stand:[0,1,2,"stand"]};
				var spriteSheet=new SpriteSheet({
	       				images:[imgObj],
					frames:{width:90,height:83,regX:40,regY:41},
					animations:animations
				});
			}
			else if(owner==GLOBEFISH){
				imgObj=Utility.resources["img/tower4_normal.png"];
				var animations={stand:[0,1,2,"stand"]};
				var spriteSheet=new SpriteSheet({
	       				images:[imgObj],
					frames:{width:90,height:83,regX:40,regY:41},
					animations:animations
				});
			}
			
		}
		//arms attack sytle
		if(owner==OCTOPUS){
			this.armPic = Utility.resources["img/Arms2_Attack.png"]
		}
		else if(owner==CUTTLEFISH){
       		this.armPic = Utility.resources["img/Arms3_Attack.png"];
		}
		else if(owner==GLOBEFISH){
			this.armPic = Utility.resources["img/Arms4_Attack.png"];
		}
        		
		campList[this.owner].removeElement(this);
		this.spriteSheet=spriteSheet;
		this.gotoAndPlay("stand");
		this.owner	= owner;
		this.armySize	= 0;
		this.onPress	= null;
		this.onMouseOut = null;
		this.drawArmySize();
		campList[this.owner].addElement(this);

	}else if(owner==PLAYER){
		if(this.type=="Base"){
			imgObj=Utility.resources["img/player_normal.png"];
			var animations={stand:[0,1,"stand"]};
	    		var spriteSheet=new SpriteSheet({
       		 		images:[imgObj],
	       			frames:{width:70,height:79,regX:35,regY:40},
	        		animations:animations
	    		});
		}else{
			imgObj=Utility.resources["img/tower0_normal.png"];
			var animations={stand:[0,3,"stand"]};
	    		var spriteSheet=new SpriteSheet({
	        		images:[imgObj],
	       			frames:{width:90,height:83,regX:40,regY:41},
	        		animations:animations
	    		});
		}
			
        this.armPic = Utility.resources["img/arms_walk.png"];
			
	
		campList[this.owner].removeElement(this);
       		this.spriteSheet=spriteSheet;
       		this.gotoAndPlay("stand");
       		this.owner	= owner;
       		this.armySize	= 0;
       		this.onPress	= null;
       		this.onMouseOut = null;
       		this.drawArmySize();
       		//Utility.CustomComponentList.splice(Utility.CustomComponentList.indexOf(this),1);
		campList[this.owner].addElement(this);
		

		this.addEventListener({
			eventType:"onPress",
			callback:function(e){
				e.target.hasLeave = true;
				shootPointToObj.init({game:this.Game,resource:this,stage:this.Game.stage,stageX:this.x,stageY:this.y,evt:e,level:this.Game.level});
				e.onMouseMove=function(e){
					shootPointToObj.drop(e.stageX,e.stageY);
				};
				e.onMouseUp=function(e){
					shootPointToObj.up({evt:e,target:that});
				};
            }
		});
		this.addEventListener({
			eventType:"onMouseOut",
			callback:function(e){
				if(shootPointToObj.isOnpress && MonsterWithLeave.indexOf(e.target) == -1)
				{
					if(Utility.judgeNeighbour(MonsterWithLeave,e.target))
					{
						e.target.hasLeave=true;
						shootPointToObj.newLeave({
							stage:this.Game.stage,
							stageX:e.target.x,
							stageY:e.target.y,
							evt:shootPointToObj._evt,
							level:this.Game.level,
							game:this.Game,
							resource:e.target
						});
					}
				}
       			}
		});
			
	};
	//adjust the speed by type
	for(var i=0,len=Utility.CustomComponentList.length;i<len;i++){
		if(Utility.CustomComponentList[i].id==this.id){
			Utility.CustomComponentList.splice(i,1);
			Utility.updateCustomComponent(this);
			break;
		}
	};
	//}
	/*else if (this.type="Transfer"){
		this.clearOrder();
		if(owner==OCTOPUS||owner==CUTTLEFISH||owner==GLOBEFISH){
			imgObj=Utility.resources["img/tower2_normal.png"];
			this.armPic=Utility.resources["img/Arms2_Attack.png"];

		}else if(owner==PLAYER){

		}
	}*/

};

var Tower=function(options){
	Monster.call(this,options)
}

//extend from the Monster
Utility.extend(Tower,Monster);
