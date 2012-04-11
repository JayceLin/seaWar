
(function(window) {
	var aboutBmp = new Bitmap("./about/aboutBG.jpg");
	var stage;
	var container1;
	var container3 = new Container();
	
	function view_about(f_menu) {
		var backBmp = new Bitmap("./about/back.png");
		stage = f_menu.getStage();
		container1 = f_menu.getContainer();
		stage.addChild(container3);
		
		container3.addChild(aboutBmp);
		
		backBmp.x = 378;
		backBmp.y = 360;
		container3.addChild(backBmp);
		
		disable();
		
		backBmp.onPress = function() {
			backBmp.scaleX=0.9;
			backBmp.scaleY=0.9;
			backBmp.x += 2;
			backBmp.y += 2;
			stage.update();
			
		}
		backBmp.onMouseOut = function() {
			backBmp.scaleX=1;
			backBmp.scaleY=1;
			backBmp.x = 378;
			backBmp.y = 360;
			stage.update();
			
		}
		backBmp.onClick = function() {
			container3.removeAllChildren();
			enable();
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
	window.View_about = view_about;
}(window));
