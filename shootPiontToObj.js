//the first time to spaw a leave by press the tower , you should call shootPointToObj.init(options)
//And that will born another leave if it cross the other towers .And now calling shootPointToObj.newLeave(options) is required
var shootPointToObj={

    //options require {stage,stageX,stageY,evt,level}
    init:function(options){
             this.options.stage=options.stage;
             this._evt=options.evt;
             this.newLeave(options);

         },
    game:null,
    newLeave:function(options){
        this.game=options.game;
       // console.log(options.resource);
        if(options.resource.owner!=PLAYER){
            return false;
        }
        this.leaveContainer[this.leaveContainer.length] 
            = new this.leaveObj(options.stageX,options.stageY,
                            this._evt,options.level,options.game,options.resource);

        this.leaveContainer[this.leaveContainer.length-1].init(options.stage);
        MonsterWithLeave.push(options.resource);
    },
    shootSpeed:6,
    options:{},
    leaveContainer:[],
    ticks:function(){
        this.options.stage.update();
    },
    leaveObj:function(x,y,evt,level,game,resource){
                 this.x = x|0;
                 this.y = y|0;
                 this.scaleX=0.01;
                 this.scaleY=0.5;
                 this.level=level;
                 this.game=game;
                 this.resource=resource;
                 this.towerX=x;
                 this.towerY=y;
             },
    isOnpress:false,
    drop:function(x3,y3){
	var dx = x3;
	var dy = y3;
        shootPointToObj.isOnpress=true;
        var leaveContainer=this.leaveContainer;
        for(i in Towers){
            /** Attach to tower feature **/
            var that=Towers[i];
            var distance = 0;
            distance = Math.pow(dx-that.x,2)+Math.pow(dy-that.y,2) ;
            if(distance < 2500){
                dx = that.x;
                dy = that.y;
                if(Utility.judgeNeighbour(MonsterWithLeave,that)
                    && MonsterWithLeave.indexOf(that) == -1){
                    shootPointToObj.newLeave({
                        stage:window.games.stage,
                        stageX:dx,
                        stageY:dy,
                        evt:shootPointToObj._evt,
                        level:window.games.level,
                        game:window.games,
                        resource:that
                    });
                }
                break;
            }
        }
        for(var i = 0;i < leaveContainer.length; i++){
            var that=leaveContainer[i];
            var originalWidth,originalScaleX;
            originalWidth=that.originalWidth;					
            originalScaleX=that.originalScaleX;	
            var angle;
            angle=Math.atan((dy-that.y)/(dx-that.x))*180/Math.PI;
            if(that.x > dx){
                that.scaleX=(Math.sqrt(Math.pow(dx-that.x+25,2)+Math.pow(dy-that.y,2)))/originalWidth ;
                angle=angle-180;
            }
            else{
                that.scaleX=(Math.sqrt(Math.pow(dx-that.x-25,2)+Math.pow(dy-that.y,2)))/originalWidth ;
            }
            if(that.scaleX < 0.1){
                that.visible = false;
            }
            else{
                that.visible = true;
            }
            //to rotate the object
            that.regX = -25 / that.scaleX ;
            that.rotation=angle;
        }
        //console.log("droping :",MonsterWithLeave)
    },
    up:function(options){
	var evt=options.evt;
        var leaveContainer = this.leaveContainer;
        var shootTarget = Utility.judgeInCircle(evt.stageX,evt.stageY
                ,leaveContainer[leaveContainer.length-1].level,undefined,50);


        //change Tower shooting animation
        Utility.showShootingAnim(options.target);

        if(shootTarget == false){
            //console.log("shootTargetFalse")
           Utility.clearLeave();
           Utility.clearMonsterConstant();
           return;
        }

        if(!Utility.judgeNeighbour(MonsterWithLeave,shootTarget)){
           // console.log("judgeNeighbour")
           Utility.clearLeave();
           Utility.clearMonsterConstant();
           return false;
        }

        if( MonsterWithLeave.indexOf(Utility.getTowerById(shootTarget.id)) != -1){
            MonsterWithLeave.splice(MonsterWithLeave.indexOf(Utility.getTowerById(shootTarget.id)),1);
        }
        //console.log("asdasdf",shootTarget.id,MonsterWithLeave)
        var cacheMonsterWithLeave=MonsterWithLeave.slice(0);
        var testPath=Utility.getPath(cacheMonsterWithLeave,shootTarget);

        //get the Path and shoot count
        for(var i=0;i<testPath.length;i++){

            var passLine=testPath[i].path;
            for(var j=1;j<passLine.length;j++)
            {
                passLine[j-1].shootTarget=passLine[j];
            }
        }
	   shootTarget.bubbleDestination = undefined;

        for(var i=0;i<MonsterWithLeave.length;i++){
           shootPointToObj.shoot(MonsterWithLeave[i],MonsterWithLeave[i].shootTarget,shootTarget);
        }

        //shootPointToObj.shoot(testPath[1].path[0],testPath[1].path[1],Math.round(testPath[1].path[0].armySize/3))		
        Utility.clearMonsterConstant();
        Utility.clearLeave();
     }


};
shootPointToObj.getPath = function(source,destination){
    var bubbleNow = undefined;
    for(var k=0;k<bubbleConduct.length;k++)
    {
        if(bubbleConduct[k].resource == source && bubbleConduct[k].destination == destination){
            bubbleNow = bubbleConduct[k];
            break;
        }
    }
    function getPath(source,destination){
        var direction,dx,dy;
        var v=shootPointToObj.shootSpeed;
        var length=Math.sqrt(Math.pow(destination.y-source.y,2)+Math.pow(destination.x-source.x,2));

        dx=(destination.x-source.x)/length*v;
        dy=(destination.y-source.y)/length*v;
        return {dx:dx,dy:dy}
    }
    if(!bubbleNow){
        bubbleConduct[bubbleConduct.length]={resource:source,destination:destination};
        bubbleNow = bubbleConduct[bubbleConduct.length-1];
        var path=getPath(source,destination);
        bubbleNow.path=null;
        bubbleNow.path=path;
        bubbleNow.bubbleList=[];
    }
    return bubbleNow;
}
shootPointToObj.shoot=function(source,destination,finalDestination){
    //console.log(this.leaveContainer)
    source.shoot(shootPointToObj.getPath(source,destination),finalDestination);
}


shootPointToObj.leaveObj.prototype=new Bitmap();
//arguments declaratioin :evt is the onPress target ,and each time to init new LeaveObj ,you must pass the first onPress target

Utility.extendPro(shootPointToObj.leaveObj,[
        {
            funName:"init",
    fun:function(stage){
        this.image=Utility.resources["img/leave.png"];
        this.regX=0;
        this.regY=this.image.height/2;
        this.originalWidth=this.image.width;
        this.originalScaleX=this.scaleX;
        stage.addChild(this);
        stage.update();
    }
        }


        ])
