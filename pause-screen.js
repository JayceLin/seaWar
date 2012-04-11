
(function(window) {

window.PauseScreen = PauseScreen;


function PauseScreen(view, state, battleTime, enemyKilled, level, getAchievement, Callback) {

	var buttonPos = [];
	buttonPos["resume"]		= {x:75,  y:75};
	buttonPos["restart"]	= {x:88,  y:166};
	buttonPos["next"]		= {x:75,  y:75};
	buttonPos["out"]		= {x:142, y:242};
	buttonPos["bgs"]		= {x:539, y:18};
	buttonPos["help"]		= {x:635, y:18};
	buttonPos["killed"]		= {x:507, y:313};
	buttonPos["time"]		= {x:340, y:313};
	buttonPos["endbg"]		= {x:0,   y:0};
	buttonPos["level"]		= {x:617, y:207};
	buttonPos["win"]		= {x:132, y:240};
	buttonPos["achieve"]	= {x:250, y:147};
	buttonPos["achieveText"]= {x:350, y:170};
	
	 var acmplish = {
	 	kill100: {
	 		icon: "./achievement/kill_1.png",
			banner: "./achievement/1.png",
			status: false
		},
		failAfter2m: {
			icon: "./achievement/FailedAfter2M_2.png",
			banner: "./achievement/2.png",
			status: false
		},
		winIn1m: {
			icon: "./achievement/success_3.png",
			banner: "./achievement/3.png",
			status: false
		},
		winAllBuilding: {
			icon: "./achievement/all_4.png",
			banner: "./achievement/4.png",
			status: false
		},
		winAllTower: {
			icon: "./achievement/tower_5.png",
			banner: "./achievement/5.png",
			status: false
		},
		winAllCamp: {
			icon: "./achievement/camp_6.png",
			banner: "./achievement/6.png",
			status: false
		},
		kill200: {
			icon: "./achievement/kill_7.png",
			banner: "./achievement/7.png",
			status: false
		},
		winAfter2m: {
			icon: "./achievement/success_8.png",
			banner: "./achievement/8.png",
			status: false
		},
		allLevelClear: {
			icon: "./achievement/AllLevelClear_9.png",
			banner: "./achievement/9.png",
			status:false
		},
		killBoss: {
			icon: "./achievement/KilledBoss_10.png",
			banner: "./achievement/10.png",
			status: false
		},
		loser: {
			icon: "./achievement/failed_2.png",
			banner: "./achievement/NoAchievement.png",
			status: false
		}
	}

	var resources;
	var currentLevel = level;
	var backgoundBitmap;
	var bgMusic;	
	var soundOn;
	var soundOff;
	var soundStatus = localStorage.getItem("soundEnabled");
	var levelText;
	var timeText;
	var enemyKilledText;
	var screen = this;
	var acmplishList = [];
	var mouseOver;
	var dbStateButton;
	var container = new Container();
	var interval1;
	var interval2;
	var callCount = 0;
    var Canvas;
    var stage;
    var shortestTime;

	this.getCanvasWidth = function() {return Canvas.width;}
	this.getCanvasHeight = function() {return Canvas.height;}

	this.getStage = function(){
		return stage;
	}
	this.getContainer = function() {
		return container;
	}
	this.initScreen = function(){
		shortestTime = timeInSecond(battleTime);
		canvasWrap = document.getElementById("canvasWrapper");
		//Make sure not more than 2 canvas exist
		//if($(canvasWrap).children().length < 2) {
		Canvas = document.createElement("canvas");
		
		$(Canvas).attr("id","newCanvas").attr("width","854").attr("height","480");
		$(canvasWrap).append(Canvas);
		$(Canvas).css("position","absolute").css("zIndex","2");

		stage = new Stage(Canvas);
		if (Touch.isSupported()) { Touch.enable(stage); }

		resources = Utility.resources;
		//console.log(resources);
		
		// bgMusic = resources["./music/Start"].sound;
		// console.log(resources["./music/Start"].sound);
		// bgMusicObject = new soundManager(bgMusic);
		// if(localStorage.getItem("soundEnabled") == "False") {
		// 	// bgMusicObject.stopSound();
		// 	console.log("-------------------------------audio paused.");
		// }
		
		// if(audio == null) {
		// 	audio = resources["./music/Start"].sound;
		// }

		bitmapList	= createBitmap(resources);
		stage.enableMouseOver();
	//	console.log(this);
		if(state == "pause") {
			//console.log(state);
			Ticker.setPaused(true);
			drawBackground();
			drawAll("pause");
			elementMove(0, 1500, Ease.elasticInOut);
		}
		else if(state == "win") {
			//console.log(state);
			achievementJudge();
			drawWinScreen();
			Tween.get(bitmapList["./pause-screen/Win.png"], {loop:false,ignoreGlobalPause:true})
			.to({x:buttonPos["win"].x, y:buttonPos["win"].y}, 1500, Ease.elasticInOut)
			.wait(1000)
			.to({x:buttonPos["win"].x+Canvas.width, y:buttonPos["win"].y}, 1000, Ease.elasticInOut)
			.call(drawAll,["win"])
			.call(drawAchievement)
			.call(elementMove, [0, 1500, Ease.elasticInOut])
			.call(achievementMove,[0,1500,Ease.elasticInOut]);

			if(localStorage.getItem("l"+currentLevel) == undefined) {
				localStorage.setItem("l"+currentLevel, battleTime);					
			}
			//console.log(shortestTime);
			//console.log(timeInSecond(battleTime));

			if(timeInSecond(battleTime) < shortestTime) {
	        		localStorage.setItem("l"+currentLevel, battleTime);
	        }
			
		}
		else if(state == "lose") {
			//console.log(state);
			achievementJudge();
			drawLoseScreen();
			Tween.get(bitmapList["./pause-screen/newLost.png"], {loop:false,ignoreGlobalPause:true})
			.to({x:buttonPos["win"].x, y:buttonPos["win"].y}, 1500, Ease.elasticInOut)
			.wait(1000)
			.to({x:buttonPos["win"].x+Canvas.width, y:buttonPos["win"].y}, 1000, Ease.elasticInOut)
			.call(drawAll,["lose"])
			.call(drawAchievement)
			.call(elementMove, [0, 1500, Ease.elasticInOut])
			.call(achievementMove,[0,1500,Ease.elasticInOut,0]);;
			
		}
		else {
			//console.log("state is wrong at init()");
		}
	
//		Ticker.setPaused(true);
		Ticker.addListener(stage, false)
		//Ticker.addListener(this, false)
		// console.log(Ticker.getPaused());
        //Ticker.setPaused(false);

	//	Ticker.addListener(screen);
	//}

	}
	var createBitmap = function(imgResource) {
		var tempBitmaps = [];
		for (imgURL in resources) {
			tempBitmaps[imgURL] = new Bitmap(resources[imgURL]);
		}
		return tempBitmaps;
	}
	var drawAll = function(state) {
		drawFish();
		if(state == "pause") {
			drawHelpButton();
			drawDBStateButton("restart", "Normal", buttonPos["restart"].x+Canvas.width, buttonPos["restart"].y, restart);
			drawDBStateButton("resume", "Normal", buttonPos["resume"].x+Canvas.width, buttonPos["resume"].y, resume);
			drawSoundButton();
		}
		else if(state == "win") {
			drawDBStateButton("next", "Normal", buttonPos["next"].x+Canvas.width,buttonPos["next"].y, nextLevel);
		}
		else if(state == "lose") {
			drawDBStateButton("restart", "Normal", buttonPos["restart"].x+Canvas.width, buttonPos["restart"].y, restart);
		}
		else {
			//console.log("state is wrong at drawAll()");
		}
		drawDBStateButton("out", "Normal", buttonPos["out"].x+Canvas.width, buttonPos["out"].y, quit);

		drawCurrentLevel();
		drawTimeText();
		drawEnemyKilledText();		//Text must be drawn after pictures!!
		stage.update();
	}

	function imgDraw(bitmap,x,y,scalex,scaley) {
		bitmap.x = x/854 * Canvas.width;
		bitmap.y = y/480 * Canvas.height;
		bitmap.scaleX = (scalex ? scalex : 1);
		bitmap.scaleY = (scaley ? scaley : 1);
		stage.addChild(bitmap);
	}

	function drawWinScreen(){
		drawBackground();
		imgDraw(bitmapList["./pause-screen/Win.png"], buttonPos["win"].x+Canvas.width, buttonPos["win"].y,0.8,0,8);
	}

	function drawLoseScreen() {
		drawBackground();
		imgDraw(bitmapList["./pause-screen/newLost.png"], buttonPos["win"].x+Canvas.width, buttonPos["win"].y,0.8,0,8);
	}

	function drawFish(){
		
	//	imgDraw(bitmapList["./pause-screen/stopBG.png"], 0, 0, Canvas.width/960, Canvas.height/640);
		imgDraw(bitmapList["./pause-screen/End_BG.png"], Canvas.width, 0, Canvas.width/854, Canvas.height/480);
		//console.log("------------------------------drawBackground called.");
	}

	function drawBackground() {
		imgDraw(bitmapList["./pause-screen/stopBG.png"], 0, 0, Canvas.width/960, Canvas.height/640);
	}

	function drawHelpButton() {
		imgDraw(bitmapList["./pause-screen/Help.png"], buttonPos["help"].x +Canvas.width, buttonPos["help"].y);
		bitmapList["./pause-screen/Help.png"].onClick = help;
	}
	
	function drawDBStateButton(name, state, x, y, buttonCallback) {
		imgDraw(bitmapList["./pause-screen/"+name+"_Active.png"], x, y);
		imgDraw(bitmapList["./pause-screen/"+name+"_Normal.png"], x, y);
		bitmapList["./pause-screen/"+name+"_Active.png"].visible = false;
		bitmapList["./pause-screen/"+name+"_Normal.png"].visible = true;
	
		bitmapList["./pause-screen/"+name+"_Normal.png"].onMouseOver = function () {
			// stage.enableMouseOver();
			//console.log("button over");
			bitmapList["./pause-screen/"+name+"_Active.png"].visible = true;
			bitmapList["./pause-screen/"+name+"_Normal.png"].visible = false;
			bitmapList["./pause-screen/"+name+"_Active.png"].scaleX = 1;
			bitmapList["./pause-screen/"+name+"_Active.png"].scaleY = 1;
			dbStateButton = bitmapList["./pause-screen/"+name+"_Active.png"];
			//console.log("mouseOver");
			stage.update();
		}
		
		bitmapList["./pause-screen/"+name+"_Active.png"].onMouseOut = function () {
			// stage.enableMouseOver(0);
			//console.log("button out");
			bitmapList["./pause-screen/"+name+"_Active.png"].visible = false;
			bitmapList["./pause-screen/"+name+"_Normal.png"].visible = true;
			stage.update();
		}
		
		bitmapList["./pause-screen/"+name+"_Active.png"].onPress = function(evt) {
			evt.target.scaleX = evt.target.scaleY = 0.9;
			//console.log("Click");
			stage.update();
		}
		bitmapList["./pause-screen/"+name+"_Active.png"].onClick = buttonCallback;

	}
		// stage.onMouseUp = function(evt) {
		// 	evt.target.scaleY = evt.target.scaleX = 1;
		// 	stage.update();
		// //	callback();
		// }

	function drawSoundButton(){
		var x = buttonPos["bgs"].x;
		var y = buttonPos["bgs"].y;
		soundOn = bitmapList["./pause-screen/BGSTexture_True.png"]; 
		soundOff = bitmapList["./pause-screen/BGSTexture_False.png"];
		if (soundStatus == "False") {
			imgDraw(soundOn, x+Canvas.width, y);
			imgDraw(soundOff, x+Canvas.width, y);
		}
		else if (soundStatus == "True") {
			imgDraw(soundOff, x+Canvas.width, y);
			imgDraw(soundOn, x+Canvas.width, y);
		}
		
		soundOn.onClick = function () {
			//console.log("disable sound");
			stage.addChild(soundOff);
			stage.removeChild(soundOn);
			stage.update();
			Utility.bgMusic.pauseLoopSound();
			localStorage.setItem("soundEnabled", "False");
			window.sound_flag == 0;
		}
		soundOff.onClick = function () {
			//console.log("enable sound");
			stage.addChild(soundOn);
			stage.removeChild(soundOff);
			stage.update();
			Utility.bgMusic.playLoopSound();
			localStorage.setItem("soundEnabled", "True");
			window.sound_flag == 1;
		}
	}
	function drawCurrentLevel() {
		levelText = bitmapList["./LevelNumber/"+ currentLevel +".png"];
		imgDraw(levelText, 610 + Canvas.width, 207);
	}

	function drawEnemyKilledText() {
		enemyKilledText = new Text();
		if(enemyKilled) 
			enemyKilledText.text = enemyKilled.toString();
		else
			enemyKilledText.text = "0";
		enemyKilledText.maxWidth = 100;
		enemyKilledText.x = buttonPos["killed"].x/854*Canvas.width+Canvas.width;
		enemyKilledText.y = buttonPos["killed"].y/480*Canvas.height;
		enemyKilledText.textAlign = "center";
		enemyKilledText.font = "bold 36px Comic Sans MS";
		enemyKilledText.color = "#FFF";
		stage.addChild(enemyKilledText);
		stage.update();
		//console.log("drawEnemyKilledText called.");
	}

	function drawTimeText() {
		timeText = new Text();
		timeText.text = battleTime;
		timeText.maxWidth = 100;
		timeText.x = buttonPos["time"].x/854*Canvas.width+Canvas.width;
		timeText.y = buttonPos["time"].y/480*Canvas.height;
		timeText.textAlign = "center";
		timeText.font = "bold 36px Comic Sans MS";
		timeText.color = "#FFF";
		stage.addChild(timeText);
		stage.update();
	}



	var drawAchievement = function() {
		//console.log(acmplishList);
		for (var task in acmplishList) {
			imgDraw(bitmapList[acmplishList[task].icon], buttonPos["achieve"].x+Canvas.width, buttonPos["achieve"].y, 0.8, 0.8);
			imgDraw(bitmapList[acmplishList[task].banner], buttonPos["achieveText"].x+Canvas.width, buttonPos["achieveText"].y, 0.9, 0.9);
		}
		stage.update();
	}

	var achievementJudge = function() {
		var timeUsed = timeInSecond(battleTime);
		if(state == "win") {
			if(enemyKilled >= 200) {
				acmplish.kill200.status = true;
				acmplishList.push(acmplish.kill200);
				localStorage.setItem("kill200", "true");
			}
			else if(enemyKilled >= 100) {
				acmplish.kill100.status = true;
				acmplishList.push(acmplish.kill100);
				localStorage.setItem("kill100", "true");
			}
			if(timeUsed < 60) {
				acmplish.winIn1m.status = true;
				acmplishList.push(acmplish.winIn1m);
				localStorage.setItem("winIn1m", "true");
			}
			if(timeUsed > 120) {
				acmplish.winAfter2m.status = true;
				acmplishList.push(acmplish.winAfter2m);
				localStorage.setItem("winAfter2m", "true");
			}
			if(level > 12 && level <= 14) {
				acmplish.allLevelClear.status = true;
				acmplishList.push(acmplish.allLevelClear);
				localStorage.setItem("allLevelClear", "true");
			}
			if(level == 14) {
				acmplish.killBoss.status = true;
				acmplishList.push(acmplish.killBoss);
				localStorage.setItem("killBoss", "true");
			}
			if(getAchievement.isOccupyAllCamp == true) {
				acmplish.winAllCamp.status = true;
				acmplishList.push(acmplish.winAllCamp);
				localStorage.setItem("winAllCamp", "true");
			}
			if(getAchievement.isOccupyAllTowers == true) {
				acmplish.winAllBuilding.status = true;
				acmplishList.push(acmplish.winAllBuilding);
				localStorage.setItem("winAllBuilding", "true");
			}
			if(getAchievement.isOccupyAllBattery == true) {
				acmplish.winAllTower.status = true;
				acmplishList.push(acmplish.winAllTower);
				localStorage.setItem("winAllTower", "true");
			}
		}
		else if(state == "lose") {
			if(enemyKilled >= 200) {
				acmplish.kill200.status = true;
				acmplishList.push(acmplish.kill200);
				localStorage.setItem("kill200", "true");
			}
			else if(enemyKilled >= 100) {
				acmplish.kill100.status = true;
				acmplishList.push(acmplish.kill100);
				localStorage.setItem("kill100", "true");
			}
			if(timeUsed >= 120) {
				acmplish.failAfter2m.status = true;
				acmplishList.push(acmplish.failAfter2m);
				localStorage.setItem("failAfter2m", "true");

			}
		}

		if(acmplishList.length === 0) {
			acmplish.loser.status = true;
			acmplishList.push(acmplish.loser);
		}
		return acmplishList;
	}

	var timeInSecond = function(timetoConvert) {
		minPart = parseInt(timetoConvert.split(":", 2)[0]);
		secPart = parseInt(timetoConvert.split(":", 2)[1]);
		totalTime = minPart*60 + secPart;
		return totalTime;
	}


	var elementMove = function(offset, moveSpeed, moveBehavior) {
		Tween.get(bitmapList["./pause-screen/next_Normal.png"], {loop:false, ignoreGlobalPause:true})
		.to({x:buttonPos["next"].x+offset, y:buttonPos["next"].y}, moveSpeed, moveBehavior);

		Tween.get(bitmapList["./pause-screen/next_Active.png"], {loop:false, ignoreGlobalPause:true})
		.to({x:buttonPos["next"].x+offset, y:buttonPos["next"].y}, moveSpeed, moveBehavior);

		Tween.get(bitmapList["./pause-screen/resume_Normal.png"], {loop:false, ignoreGlobalPause:true})
		.to({x:buttonPos["resume"].x+offset, y:buttonPos["resume"].y}, moveSpeed, moveBehavior);

		Tween.get(bitmapList["./pause-screen/resume_Active.png"], {loop:false, ignoreGlobalPause:true})
		.to({x:buttonPos["resume"].x+offset, y:buttonPos["resume"].y}, moveSpeed, moveBehavior);
		
		Tween.get(bitmapList["./pause-screen/restart_Normal.png"], {loop:false, ignoreGlobalPause:true})
		.to({x:buttonPos["restart"].x+offset, y:buttonPos["restart"].y}, moveSpeed, moveBehavior);

		Tween.get(bitmapList["./pause-screen/restart_Active.png"], {loop:false, ignoreGlobalPause:true})
		.to({x:buttonPos["restart"].x+offset, y:buttonPos["restart"].y}, moveSpeed, moveBehavior);

		Tween.get(bitmapList["./pause-screen/out_Normal.png"], {loop:false, ignoreGlobalPause:true})
		.to({x:buttonPos["out"].x+offset, y:buttonPos["out"].y}, moveSpeed, moveBehavior);

		Tween.get(bitmapList["./pause-screen/out_Active.png"], {loop:false, ignoreGlobalPause:true})
		.to({x:buttonPos["out"].x+offset, y:buttonPos["out"].y}, moveSpeed, moveBehavior);

		Tween.get(bitmapList["./pause-screen/BGSTexture_True.png"], {loop:false, ignoreGlobalPause:true})
		.to({x:buttonPos["bgs"].x+offset, y:buttonPos["bgs"].y}, moveSpeed, moveBehavior);

		Tween.get(bitmapList["./pause-screen/BGSTexture_False.png"], {loop:false, ignoreGlobalPause:true})
		.to({x:buttonPos["bgs"].x+offset, y:buttonPos["bgs"].y}, moveSpeed, moveBehavior);

		Tween.get(bitmapList["./pause-screen/Help.png"], {loop:false, ignoreGlobalPause:true})
		.to({x:buttonPos["help"].x+offset, y:buttonPos["help"].y}, moveSpeed, moveBehavior);

		Tween.get(bitmapList["./LevelNumber/"+ currentLevel +".png"],{loop:false, ignoreGlobalPause:true})
		.to({x:buttonPos["level"].x+offset, y:buttonPos["level"].y}, moveSpeed, moveBehavior);

		Tween.get(bitmapList["./pause-screen/End_BG.png"], {loop:false, ignoreGlobalPause:true})
		.to({x:buttonPos["endbg"].x+offset, y:buttonPos["endbg"].y}, moveSpeed, moveBehavior);

		Tween.get(timeText, {loop:false, ignoreGlobalPause:true}).to({x:buttonPos["time"].x+offset, y:buttonPos["time"].y}, moveSpeed, moveBehavior);

		Tween.get(enemyKilledText, {loop:false, ignoreGlobalPause:true}).to({x:buttonPos["killed"].x+offset, y:buttonPos["killed"].y}, moveSpeed, moveBehavior);

		stage.update();
	//	console.log("elementMove called.");
	//	console.log(Tween.get(bitmapList["./pause-screen/End_BG.png"],{loop:false, ignoreGlobalPause:true, override:true}));
	}

	var achievementMove = function(offset, moveSpeed, moveBehavior) {
		var index1 = undefined;
		var index2 = undefined;

			Tween.get(bitmapList[acmplishList[0].icon], {loop:false, ignoreGlobalPause:true})
			.to({x:buttonPos["achieve"].x+offset, y:buttonPos["achieve"].y}, moveSpeed, moveBehavior)
			// .wait(2000)
			.call(function() {
				interval1 = setInterval(function() {
					this.index1 = this.index1 === undefined ? 0 : this.index1 + 1;
					//console.log("index1:"+this.index1);
					bitmapList[acmplishList[(this.index1)%acmplishList.length].icon].visible = false;
					imgDraw(
						bitmapList[acmplishList[(this.index1+1)%acmplishList.length].icon],
						buttonPos["achieve"].x, buttonPos["achieve"].y,0.8,0.8);
					bitmapList[acmplishList[(this.index1+1)%acmplishList.length].icon].visible = true;
				}, 
				2000);
			});
			// .wait(2000)
			// .to({x:buttonPos["achieve"].x+offset+Canvas.width, y:buttonPos["achieve"].y}, 500)
			// .call(achievementMove, [0, 1500, Ease.elasticInOut, i+1]);

			Tween.get(bitmapList[acmplishList[0].banner], {loop:false, ignoreGlobalPause:true})
			.to({x:buttonPos["achieveText"].x+offset, y:buttonPos["achieveText"].y}, moveSpeed, moveBehavior)
			// .wait(2000)
			.call(function () {
				interval2 = setInterval(function() {
					this.index2 = this.index2 === undefined ? 0 : this.index2 + 1;
					//console.log("index2:"+this.index2);
					bitmapList[acmplishList[(this.index2)%acmplishList.length].banner].visible = false;
					imgDraw(
						bitmapList[acmplishList[(this.index2+1)%acmplishList.length].banner],
						buttonPos["achieveText"].x, buttonPos["achieveText"].y, 0.9, 0.9);
					bitmapList[acmplishList[(this.index2+1)%acmplishList.length].banner].visible = true;
					;
				}, 
				2000);
			})
			// .to({x:buttonPos["achieveText"].x+offset+Canvas.width, y:buttonPos["achieveText"].y}, 500)
			// .call(achievementMove, [0, 1500, Ease.elasticInOut, i+1]);

			stage.update();
	// }
		}

	var quit = function(){
		for(task in acmplishList) {
			bitmapList[acmplishList[task].icon].visible = true;
			bitmapList[acmplishList[task].banner].visible = true;
		}
		elementMove(Canvas.width, 500, Ease.elasticInOut);
		dispose();
		// Utility.bgMusic.removeSound();
		clearInterval(interval1);
		clearInterval(interval2);
		new View_quit(screen,function() {
			dispose();
			if(state == "win") {
				drawBackground();
				drawAll("win");
				drawAchievement();
				elementMove(0, 1000, Ease.elasticInOut);
				achievementMove(0,1000,Ease.elasticInOut);
			}
			else if(state == "pause") {
				drawBackground();
				drawAll("pause");
				elementMove(0, 1000, Ease.elasticInOut);
			}
			else if(state == "lose") {
				drawBackground();
				drawAll("lose");
				drawAchievement();
				elementMove(0, 1000, Ease.elasticInOut);
				achievementMove(0,1000,Ease.elasticInOut);
			}
			
		});
	}
	
	var help = function(){
		elementMove(Canvas.width, 500, Ease.linear);
	//	dispose();
		//console.log("move away finished.")
		new View_help(screen,function() {
			drawAll("pause");
			elementMove(0, 1000, Ease.elasticInOut);
		});
	}
	
	var resume = function(){
        Tween.get(bitmapList["./pause-screen/stopBG.png"],{loop:false, ignoreGlobalPause:true})
        .call(function() {
        	elementMove(Canvas.width, 300, Ease.linear)
        })
        .wait(400)
        .call(removeCanvas,[Canvas])
        .call(function() {
        	// bgMusicObject.removeSound();
        	dispose();
        	Utility.setGamePaused(false);

        	// Ticker.setFPS(10);
        });
        clearInterval(interval1);
        clearInterval(interval2);
        // Ticker.setPaused(true);

        // .call(canvasWrap.removeChild, ["Canvas"]);
        if(Callback) Callback();       
	}

    var removeCanvas = function(canvasName) {
            canvasWrap.removeChild(canvasName);
            //console.log("removeCanvas called.")
    }

	var restart = function(){
		Tween.get(bitmapList["./pause-screen/stopBG.png"],{loop:false, ignoreGlobalPause:true})
        .call(function() {
        	clearInterval(interval1);
			clearInterval(interval2);
			// bgMusicObject.removeSound();
        	for(task in acmplishList) {
				bitmapList[acmplishList[task].icon].visible = false;
				bitmapList[acmplishList[task].banner].visible = false;
			}
        	elementMove(Canvas.width, 300, Ease.linear)
        })
        .wait(400)
        .call(function() {
        	Utility.bgMusic.removeLoopSound();
        	Utility.bgMusic = null;
        	Ticker.removeListener(stage);
        	dispose();
        	removeCanvas(Canvas);

        })
        .call(function() {
            window.games.dispose(function(){
                window.games=new Game({canvas:document.getElementById("testCanvas"),level:(currentLevel)});
                games.init();
                Utility.setGamePaused(false);
            });
        	if (Callback) Callback();
        });
	}

	var nextLevel = function() {
		if(currentLevel < 14){
            Tween.get(bitmapList["./pause-screen/stopBG.png"],{loop:false, ignoreGlobalPause:true})
	        .call(function() {
	        	clearInterval(interval1);
                clearInterval(interval2);
                // bgMusicObject.removeSound();
		        for(task in acmplishList) {
					bitmapList[acmplishList[task].icon].visible = false;
					bitmapList[acmplishList[task].banner].visible = false;
				}
				elementMove(Canvas.width, 300, Ease.linear);
	        })
	        .wait(400)
	        .call(function() {
	        	Utility.bgMusic.removeLoopSound();
	        	Utility.bgMusic = null;
	        	Ticker.removeListener(stage);
	        	dispose();
                removeCanvas(Canvas);

            })
            .call(function() {
                window.games.dispose(function(){
					window.games=new Game({canvas:document.getElementById("testCanvas"),level:(currentLevel+1)});
					window.games.init();
                });
            })
	    }
	    if(currentLevel == 14) {
	    	Tween.get(bitmapList["./pause-screen/stopBG.png"],{loop:false, ignoreGlobalPause:true})
	        .call(function() {
		        for(task in acmplishList) {
		        	clearInterval(interval1);
                	clearInterval(interval2);
                	// bgMusicObject.removeSound();
					bitmapList[acmplishList[task].icon].visible = false;
					bitmapList[acmplishList[task].banner].visible = false;
				}
				elementMove(Canvas.width, 300, Ease.linear);
	        })
	        .wait(400)
	    	.call(function() {
	    		Ticker.removeListener(stage);
	    		dispose();
                removeCanvas(Canvas);
            })
            .call(function() {
				window.games.dispose(function(){
					Utility.bgMusic.removeLoopSound();
					Utility.bgMusic = null;
					Ticker.removeListener(Timer);
					window.games.inited = false;
					Ticker.setPaused(false);
					(new StartPage()).init();
            	});
	    	});
	    }

	    if(Callback) Callback();
	}

	var dispose = function(){
		stage.removeAllChildren();
	//	stage.update();
	}

}

}(window));
