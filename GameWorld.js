//globle config table
var decisionMaker;
var decisionFrequence = 10;
var decisionFrequenceCounter = 10;
var campList;
//game world
//game image object include in CONFIG.GlobalResourses.globalReLoder array
var Game=function(options){
	var stage = new Stage(options.canvas);
    if (Touch.isSupported()) { Touch.enable(stage); }

	var canvas=options.canvas;
	this.level=options.level
	this.stage = stage;
	Utility.stage=stage;

	var Game=this;

	var levelBg = "img/level"+options.level+".jpg"
	var imgs = CONFIG.GlobalResourses.urls;
	imgs.push(levelBg);
	var resources = null;
	var resourceLoader;
	var isFirstTime=true;
	var enemy1NormalFrame={width:68,height:84,regX:34,regY:42},
		playerNormalFrame={width:70,height:79,regX:35,regY:40},
		playerMoveFrame={width:77,height:91,regX:36,regY:45},
		intermediateFrame={width:79,height:79,regX:40,regY:40},
		tranferNeturalNormalFrame={width:90,height:83,regX:40,regY:41};

	Game.inited = false;

    var dispose = function(callback){
        stage.removeAllChildren();
	// Ticker.removeAllListeners();
	window.Towers=[];

	Timer.funs.pauseClock();
	Ticker.removeListener(Timer);
	Ticker.removeListener(Bomb);
	Ticker.removeListener(stage);
	Bomb.count=0;

	Utility.CustomComponentList=[];
        callback();
    }
    this.dispose = dispose;
    var gameinit = function(){
		//console.log("OOO!!!");

		//ensure the  array is clean while restart
		Towers=[];
		bubbleConduct=[];
		MonsterWithLeave=[];
		bubbleFactor=[];
		bubbleConduct=[]; 
		bubbleLine=[];

		//Ticker.removeAllListeners();
		resources = resourceLoader.getResources();
		Utility.resources = resources;
		campList  = new Array();


		_drawBackground({stage:stage});
		_drawLevel(options.level);
		_drawSetting();
        _preventDefaultEvent();

		

		var enemy1NormalFrame={width:68,height:84,regX:34,regY:42},
			playerNormalFrame={width:70,height:79,regX:35,regY:40},
			playerMoveFrame={width:77,height:91,regX:36,regY:45},
			intermediateFrame={width:79,height:79,regX:40,regY:40},
			cuttlefishMoveFrame={width:99,height:105,regX:50,regY:52},
			globefishMoveFrame={width:116,height:81,regX:34,regY:42};

		for(var i=0,len=CONFIG.LevelArmys[options.level-1].length;i<len;i++){
			var imgObj={},
				frameChoice={},
				animations={},
				cache=CONFIG.LevelArmys[options.level-1][i];
				//console.log("looping")
			if( cache.type=="Base"){
				if(cache.owner==OCTOPUS)
				{
					imgObj=Utility.resources["img/enemy_move.png"];
					frameChoice=playerMoveFrame;
					animations={stand:[0,7,"stand"]};
                    			arm = Utility.resources["img/Arms2_Attack.png"];
				}else if(cache.owner == CUTTLEFISH){
					imgObj=Utility.resources["img/team3_move.png"];
					frameChoice=cuttlefishMoveFrame;
					animations={stand:[0,1,2,3,4,5,6,7,"stand"]};
                    arm = Utility.resources["img/Arms3_Attack.png"];
				}
				else if(cache.owner==NEUTRAL){

					imgObj=Utility.resources["img/base.png"],
					frameChoice=intermediateFrame;
					animations={stand:[0,3,"stand"]};
					arm = Utility.resources["img/Arms2_Attack.png"];
				}
				else if(cache.owner==PLAYER){
					imgObj=Utility.resources["img/player_normal.png"],
					frameChoice=playerNormalFrame;
					animations={stand:[0,1,"stand"]}
                	arm = Utility.resources["img/arms_walk.png"];
				}
				else if(cache.owner==GLOBEFISH){
					imgObj=Utility.resources["img/team4_move.png"],
					frameChoice=globefishMoveFrame;
					animations={stand:[0,1,2,3,4,5,6,7,"stand"]};
                	arm = Utility.resources["img/Arms4_Attack.png"];
				}
			}
			else if(cache.type=="Transfer"){
				//console.log("Transfer")
				if(cache.owner==NEUTRAL){
					imgObj=Utility.resources["img/tower1_normal.png"];
					frameChoice=tranferNeturalNormalFrame;
					animations={stand:[0,3,"stand"]};
					arm = Utility.resources["img/Arms4_Attack.png"];
					
				}

			}
			else
			{
				//console.log("boss");
				imgObj=Utility.resources["img/team4_move.png"],
				frameChoice=globefishMoveFrame;
				animations={stand:[0,1,2,3,4,5,6,7,"stand"]};
            arm = Utility.resources["img/Arms4_Attack.png"];
			}

			var  a=new Tower({
				id:cache.id,
				type:cache.type,
				owner:cache.owner,
				armySize:cache.armySize, 
				status:cache.status,
				neighbours:cache.neighbours,
				x:cache.coordinate.x,
				y:cache.coordinate.y,
                		armPic:arm
			});
			a.scaleX=0.7,
			a.scaleY=0.7;
			//console.log(a);
			Towers[a.id] = a;
			if(a.owner==PLAYER){	
				a.waitBubble=null;
				a.shootTarget=null;
				if(campList[a.owner]==undefined){
					campList[a.owner] = new Camp(a.owner, Towers);
				}
				campList[a.owner].addElement(a);
			}

			//slow down the different component
			if(a.owner==OCTOPUS||a.owner==CUTTLEFISH||a.owner==GLOBEFISH){
				a.makeAction({ gameFPS:Ticker.getFPS(),  multiplier:0.03 });
				Utility.CustomComponentList.push(a);
				if(campList[a.owner]==undefined){
					campList[a.owner] = new AICamp(a.owner, Towers);
				}
				campList[a.owner].addElement(a);
			}
			else if(a.owner==NEUTRAL){
				a.makeAction({  gameFPS:Ticker.getFPS(),  multiplier:0.13});
				Utility.CustomComponentList.push(a);
				if(campList[a.owner]==undefined){
					campList[a.owner] = new Camp(a.owner, Towers);
				}
				campList[a.owner].addElement(a);
			}
			else if(a.owner==PLAYER){
				a.makeAction({  gameFPS:Ticker.getFPS(),multiplier:0.1});
				Utility.CustomComponentList.push(a);
			}

			//handle the boss GLOBEFISH
			if(a.type=="boss")
			{
				a.drawArmySize=function(){return a};
				Utility.running=false;
				Utility.bossRun=true;
				a.runCount=0;
				a.site=Utility.getTowerById(7);
				var target;
				a.ticks=function(fps){
					if(a.armySize<=0)
					{
						Towers.splice(Towers.indexOf(a),1);
						Utility.stage.removeChild(a);
					}
					if(!Utility.bossRun)
					{
						a.fpsCount++;
						if(a.fpsCount % (fps/4) == 0){
								//occupy the base
								target=Utility.judgeInCircle(a.x,a.y,14,[a.site,a]);
								//console.log(target,a.site,"asdfasdfasdfasdfasdfsdaf");
								if(target)
								{
									if(target.owner!=GLOBEFISH)
									{
										var size = target.armySize;
										//console.log(target,target.armySize)
										if(size < 7)
										{
											while(target.armySize>0)
											{
												target.updateArmySize({command:"down"});
												a.armySize--;
											}	
											target.changeOwner(GLOBEFISH);
											a.site=target;
											//console.log(a,"----------------");
										}
										else
										{
											for(var k = 0;k<6 ; k++)
											{
												target.updateArmySize({command:"down"});
												a.armySize--;
											}
											return;
										}
									}
								}



								//console.log(a.path);
									a.x += a.path.dx;
									a.y += a.path.dy;
									Utility.running=true;
								//judge in circle




							    if(Math.abs(a.x-a.path.destination.x)<2)
							    {
							    	a.x=a.path.destination.x;
							    	a.y=a.path.destination.y;
							    	a.neighbours=a.path.destination.neighbours;
							    	a.site=a.path.destination;
							    	Utility.bossRun=true;
							    	Utility.running=false;
							    }

						}
					}
					if(!Utility.running)									
					{
						 a.runCount++;
						if(a.runCount % (fps*15)==0)
						{	
							
								a.path=Utility.getBossPath(a);	
								Utility.bossRun=false;
							}
					}


				}//a.ticks()
			}

			a.init({
				Game:Game,
				img:imgObj,
				frames:frameChoice,
				animations:animations,
				speed:2,
				direction:90,
				currentAnimationFrame:0,
				startAnimName:"stand"
			});
            if(a.owner == PLAYER){
                a.addEventListener({
                    eventType:"onPress",
                    callback:function(e){
                        e.target.hasLeave=true;
                        shootPointToObj.init({game:Game,resource:this,stage:Game.stage,stageX:e.target.x,stageY:e.target.y,evt:e,level:options.level})						
                    e.onMouseMove=function(e){
                        shootPointToObj.drop(e.stageX,e.stageY);
                    }
                e.onMouseUp=function(e){
                    shootPointToObj.up({evt:e,target:a});
                }
                    }
                });
                a.addEventListener({
                    eventType:"onMouseOut",
                    callback:function(e){
                        //console.log( MonsterWithLeave.indexOf(e.target))
                        if(shootPointToObj.isOnpress && MonsterWithLeave.indexOf(e.target) == -1)
                        {
                            if(Utility.judgeNeighbour(MonsterWithLeave,e.target))//check here
                            {
                                //console.log("inside")
                                e.target.hasLeave=true;
                                shootPointToObj.newLeave({
                                stage:Game.stage,
                                stageX:e.target.x,
                                stageY:e.target.y,
                                evt:shootPointToObj._evt,
                                level:options.level,
                                game:Game,
                                resource:e.target
                                })
                            }
                        }
                    }
                });
            }

            a.drawArmySize();
            /*
            .addEventListener({
				eventType:"onMouseOver",
				callback:function(e){
					if(!shootPointToObj.isOnpress||MonsterWithLeave.indexOf(e.target) == -1)
						return false;
					var container=shootPointToObj.leaveContainer;
					var removeItem = null;
					for(var i=0,len=container.length;i<len;i++)
					{

						if(container[i].resource==e.target)
						{
							removeItem=e.target;
							break;
							//console.log(MonsterWithLeave);
						}
					}	
					if(removeItem)
					{							
							Utility.stage.removeChild(container[i]);
							container.splice(container.indexOf(container[i]),1);
							console.log(MonsterWithLeave);
							MonsterWithLeave.splice(MonsterWithLeave.indexOf(e.target),1);
					}	
						// if(shootPointToObj.isOnpress && MonsterWithLeave.indexOf(e.target) == -1)
						// {
						// 	if(Utility.judgeNeighbour(MonsterWithLeave,e.target))
						// 	{
						// 		//console.log("inside")
						// 		e.target.hasLeave=true;
						// 		shootPointToObj.newLeave({
						// 			stage:Game.stage,
						// 			stageX:e.target.x,
						// 			stageY:e.target.y,
						// 			evt:shootPointToObj._evt,
						// 			level:options.level,
						// 			game:Game,
						// 			resource:e.target
						// 		})
						// 	}
						// }

	       		}
			}) */
		}//end of for


	var bgMusic = resources["./music/normal_BG"].sound;
	var bombMusic = resources["./music/bomb"].sound;
	var bubbleMusic=resources["./music/arms_Attack"].sound;

	if(!Utility.bombMusic)
	{
		Utility.bombMusic=new soundManager2(bombMusic,"bombMusic");
	}
	if(!Utility.bubbleMusic)
	{
		Utility.bubbleMusic=new soundManager2(bubbleMusic,"bubbleMusic")
	}

	if(!Utility.bgMusic)
		{
			Utility.bgMusic = new soundManager2(bgMusic,"bgMusic");
			Utility.bgMusic.loopSound();
			//console.log("loopSound");
			if( localStorage.getItem("soundEnabled")=="False")
			{
				Utility.bgMusic.pauseLoopSound();
				//console.log("pauseLoopSound");
			}
		}
     Bubble.init();
		//Bomb
		Bomb.init({ canvas:options.canvas, stage:stage});
		//Timer
		//console.log("start timer");
		Timer.init({stage:stage});
		Utility.setGamePaused(false);
		Game.inited = true;

	}
	this.init = function(options){
		resourceLoader = new ResourceLoader(imgs,gameinit,function(){},"testCanvas");
		resourceLoader.startLoad();
	}
    var _preventDefaultEvent=function(){
        //for ios
        document.ontouchmove = function(event){
            event.preventDefault();
        }
    };
	var _drawBackground=function(options){
		var bgBitmap=new Bitmap(resources[levelBg]);
		stage.addChild(bgBitmap);
		stage.update();			
	};
	var _drawLevel=function(level){
		levelText=new Text(level,"20px Arial", "black");
		levelText.x=32;
		levelText.y=93;
		levelText.textAlign = "center";
		levelText.maxWidth=100;
		stage.addChild(levelText);
		stage.update();
	};
	var _drawSetting=function(){
		var setting =new Bitmap(Utility.resources["img/SystemBut.png"]);
		setting.x=10,
		setting.y=430,
		setting.scaleX=0.4,
		setting.scaleY=0.4;
		Utility.stage.addChild(setting);
		setting.onClick=function(e){
			var ps = new PauseScreen(Utility.stage, "pause", Timer.label.text, Bomb.totalKill, options.level,Utility.getMedal());
				ps.initScreen();
				Utility.setGamePaused(true);
			}
		}
	};
