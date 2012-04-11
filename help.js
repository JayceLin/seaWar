
(function(window) {

	var stage;	
	var array = ["./Help/help1.png","./Help/help2.png","./Help/help3.png",
					"./Help/help4.png","./Help/help5.png"];
	var container1;
//	var finishCall = undefined;

	function view_help(f_menu, callback) {
		var stopBG = new Bitmap("./Help/stopBG.png");
		var bmp_Ok_N = new Bitmap("./Help/Ok_Normal.png");
		
		stage = f_menu.getStage();
		//console.log(stage.id);
		container1 = f_menu.getContainer();
		
		var container2 = new Container();
		stage.addChild(container2);
		
		stopBG.x =0;
		stopBG.y =0;
		container2.addChild(stopBG);
		disable();
		
		var bmp = new Bitmap(array[0]);		
		bmp.x = 40;
		bmp.y = 100;	
		bmp.scaleX=0.1;
		bmp.scaleY=0.1;
		container2.addChild(bmp);
		
		bmp_Ok_N.y = 80;
		bmp_Ok_N.x = 40;

		bmp_Ok_N.scaleX = 0.1;
		bmp_Ok_N.scaleY = 0.1;
		container2.addChild(bmp_Ok_N);
		
		Tween.get(stopBG,{loop:false, ignoreGlobalPause:true}).to({x:-57,scaleX:1,scaleY:1},180);
		Tween.get(bmp,{loop:false, ignoreGlobalPause:true}).to({x:325,y:60,scaleX:0.8,scaleY:0.8},800);
		Tween.get(bmp_Ok_N,{loop:false, ignoreGlobalPause:true}).to({x:660,y:375,scaleX:1,scaleY:1},800);
		
		var i = 0;
		bmp_Ok_N.onPress = function() {
			bmp_Ok_N.scaleY = 0.9;
			bmp_Ok_N.scaleX = 0.9;
		}
		bmp_Ok_N.onMouseOut = function() {
			bmp_Ok_N.scaleX = 1.0;
			bmp_Ok_N.scaleY = 1.0;
		}
		bmp_Ok_N.onClick = function() {
			container2.removeChild(bmp);
			i++;
			if(i < array.length )
			{
				var bmp1 = new Bitmap(array[i]);
				bmp1.x = 325;
				bmp1.y = 60;
				bmp1.scaleY = 0.8;
				bmp1.scaleX = 0.8;
				container2.addChild(bmp1);
				bmp_Ok_N.scaleX = 1.0;
				bmp_Ok_N.scaleY = 1.0;
			}
			else {
				container2.removeAllChildren();
				enable();
				if(callback) callback();
			}
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
	window.View_help = view_help;
	
}(window));
