
(function(window){

	var stage;
	var container1;
	var container5 = new Container();
	
	function view_quit(f_menu, callback) {
		var bmp = new Bitmap("./quit/sureBG.png");
		
		var cancel_1= new Bitmap("./quit/cancel_1.png");
		var cancel_2= new Bitmap("./quit/cancel_2.png");
		
		var ok_1 = new Bitmap("./quit/ok_1.png");
		var ok_2 = new Bitmap("./quit/ok_2.png");
		var stopBG = new Bitmap("./Help/stopBG.png");

		var l_menu = this;
	
		stage = f_menu.getStage();
		container1 = f_menu.getContainer();

		this.getStage = function() {
			return stage;
		}
		this.getContainer = function () {
			return container1;
		}
		this.getCanvasWidth = function () {
			return 854;
		}
		this.getCanvasHeight = function() {
			return 480;
		}
		
		stage.addChild(container5);
		
		stopBG.x =0;
		stopBG.y =0;
		container5.addChild(stopBG);		
		disable();

		bmp.x=40
		bmp.y=400;
		bmp.scaleX=0.1;
		bmp.scaleY=0.1;
		container5.addChild(bmp);
		
		cancel_1.x=40;
		cancel_1.y=420;
		cancel_1.scaleX=0.1;
		cancel_1.scaleY=0.1;
		container5.addChild(cancel_1);;
		
		ok_1.x=40;
		ok_1.y=420;
		ok_1.scaleX=0.1;
		ok_1.scaleY=0.1;
		container5.addChild(ok_1);
		
		//Tween.get(stopBG,{loop:false}).to({x:-57,scaleX:1,scaleY:1},180);
		Tween.get(bmp,{loop:false,ignoreGlobalPause:true}).to({x:310,y:90,scaleX:0.9,scaleY:0.9},800);
		Tween.get(cancel_1,{loop:false,ignoreGlobalPause:true}).to({x:700,y:320,scaleX:1.1,scaleY:1.1},800);
		Tween.get(ok_1,{loop:false,ignoreGlobalPause:true}).to({x:360,y:320,scaleX:1,scaleY:1},800);

		ok_1.onPress = function() {
			ok_2.x=360;
			ok_2.y=320;
			container5.addChild(ok_2);			
		}

		ok_1.onMouseOut = function() {
			container5.removeChild(ok_2);
			//stage.update();
		}
		
		ok_1.onClick = function () {
			container5.removeAllChildren();
			if(Utility.bgMusic != undefined)
			{
				Utility.bgMusic.removeLoopSound();
				Utility.bgMusic = null;
			}
			stage.update();
			if(window.games != undefined) {
	            window.games.dispose(function(){
	                LevelSelect(l_menu);
	            });
            }
            enable();
		}

		cancel_1.onPress = function() {
			cancel_2.x=700;
			cancel_2.y=320;
			cancel_2.scaleX = 1.1;
			cancel_2.scaleY = 1.1;
			container5.addChild(cancel_2);
		}

		cancel_1.onMouseOut = function() {
			container5.removeChild(cancel_2);
		}

		cancel_1.onClick = function() {
			container5.removeAllChildren();
			enable();
			if(callback) callback();
		}

	}
	
	var disable = function() {				
		var total = container1.getNumChildren();
		//console.log("total is " + total); some questions
		var element;
		for(var i=0;i<total;i++){
			element = container1.getChildAt(i);
			element.mouseEnabled = false;
		}
	}
	
	var enable = function() {
		var total = container1.getNumChildren();
		var element;
		
		for(var i=0; i<total; i++) {
			element = container1.getChildAt(i);
			element.mouseEnabled = true;
		}
	}
	
	window.View_quit = view_quit;
	
}(window));
