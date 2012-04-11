
var TimeOutId = null;
var Timer={
		init:function(options){
			this.stage=options.stage;
			this.funs.InitClock();
			Ticker.addListener(this);
		},
		reset:function(){
			Ticker.removeListener(Timer);
			this.funs.reset();
			Ticker.addListener(Timer);
		},
		tick:function(){
			if(window.games.inited == false){
							return;
			}
			//this.stage.update();
			for(var i=0,len=Utility.CustomComponentList.length;i<len;i++){
				Utility.CustomComponentList[i].action();
			}
			for( var id in Towers){
				Towers[id].ticks(Ticker.getFPS());
			}
      Bubble.tick();
			Bubble.detectHit();

			decisionFrequenceCounter++;
			if(decisionFrequenceCounter % decisionFrequence == 0){
				for(var key in Towers){
					Towers[key].clearOrder();
				}
				for(var key in campList){
					campList[key].makeDecision();
				}
			}


			this.stage.update();
			/*
			if( Utility.isWin() ){
				console.log("WIN!!!!");
				Utility.getMedal();
				Utility.setGamePaused(true);
				var pauseScreen = new PauseScreen(Utility.stage, "win", Timer.label.text, Bomb.totalKill, games.level, Utility.getMedal());
				pauseScreen.initScreen();

			}
			if(Utility.isLose()){
				console.log("You're totally a loser");
				Utility.getMedal();
				Utility.setGamePaused(true);
				var pauseScreen = new PauseScreen(Utility.stage, "lose", Timer.label.text, Bomb.totalKill, games.level, Utility.getMedal());
				pauseScreen.initScreen();
			}
			*/
			var gameStatus=Utility.checkGameStatus();
			if(gameStatus!=0){
				Utility.getMedal();
				Utility.setGamePaused(true);
				var pauseScreen;
				if(gameStatus==1){
					pauseScreen= new PauseScreen(Utility.stage, "win", Timer.label.text, Bomb.totalKill, games.level, Utility.getMedal());	
				}
				else{
					pauseScreen = new PauseScreen(Utility.stage, "lose", Timer.label.text, Bomb.totalKill, games.level, Utility.getMedal());
				} 
				pauseScreen.initScreen();
			}

		},
		allTime:""
		}

		Timer.funs=(function(timer){
			var IO={}
			var m=0,s=0;
			var label;
			var container=new Container();
			var bitmap;
			var that=timer;
			function pauseClock(){
				TimeOutId && clearTimeout(TimeOutId);
				TimeOutId = undefined;
				//console.log("pause clock right now~");
			};
			function resumeClock(){
				startclock();
			};
			function drawClock(text){
				container.removeChild(label);
				label = new Text(text, "36px Arial", "orange");
				label.textAlign = "center";
				label.x = 93;
				label.y = 55;
				label.maxWidth=100;
				container.addChild(label);
				Timer.label=label;
			} 
			function second(){ 
				s+=1; 
				if(s>0 && (s%60)==0){m+=1;s=0;}
				if(m>0 && (m%60)==0){ m=0;}
				return (m>9?m:'0'+m)+":"+(s>9?s:('0'+s))				 
			}  
			function startclock(){
				timer.allTime=second();
				drawClock(timer.allTime);
				TimeOutId && clearTimeout(TimeOutId);
				TimeOutId=setTimeout(startclock,1000)
			}
			IO.loadImage=function(src,callback){
				var image=new Image();
				image.src=src;
				image.onload = callback;
				return image;
			}
			function drawBg(x,y){
				bitmap=new Bitmap(Utility.resources["img/TimeBG.png"]);
				bitmap.x=x;
				bitmap.y=y;
				container.addChild(bitmap);
				that.stage.update();
			}
			IO.InitClock=function(){			
				that.stage.addChild(container);
				m=0;
				s=0;
				TimeOutId && clearTimeout(TimeOutId);
				drawBg(10,10);
				drawClock("00:00");
				TimeOutId = setTimeout(startclock,1000)
			};
			IO.reset=function(){
				clearTimeout(TimeOutId);
				m = 0;
				s = 0;
				container.removeAllChildren();
				that.stage.removeChild(container);
				that.stage.addChild(container)
				drawBg(10,10);
				drawClock("00:00");
			};
			IO.pauseClock=pauseClock;
			IO.resumeClock=resumeClock;

			return IO;
		}(Timer))
