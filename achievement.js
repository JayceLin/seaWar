(function(window){
	var achievementBmp = new Bitmap("./achievement/achievementBG.jpg");
	var slideBmp = new Bitmap("./achievement/slideway.png");
	var runnerBmp = new Bitmap("./achievement/runner.png");
	var upBmp = new Bitmap("./achievement/up.png");
	var downBmp = new Bitmap("./achievement/down.png");
	
	var stage;
	var container1;
	var container4 = new Container();
	
	var array = ["./achievement/1.png","./achievement/2.png","./achievement/3.png",
				"./achievement/4.png","./achievement/5.png","./achievement/6.png",
				"./achievement/7.png","./achievement/8.png","./achievement/9.png",
				"./achievement/10.png"];
	var achArr = ["./achievement/kill_1.png","./achievement/FailedAfter2M_2.png",
				"./achievement/success_3.png","./achievement/all_4.png","./achievement/tower_5.png",
				"./achievement/camp_6.png","./achievement/kill_7.png","./achievement/success_8.png",
				"./achievement/AllLevelClear_9.png","./achievement/KilledBoss_10.png"];

	var w_bmp = new Array();
	var bmp = new Array();
	var achBmp = new Array();
	
	function view_achievement(f_menu){
		var backBmp = new Bitmap("./achievement/back.png");
		upBmp.x = 241;
		upBmp.y = 0;
		downBmp.x = 243;
		downBmp.y = 434;
		
		runnerBmp.x = 744;
		runnerBmp.y = 0;
		
		slideBmp.rotation = 90;
		slideBmp.x = 810;
		slideBmp.y = 8;
		
		backBmp.x = 50;
		backBmp.y = 370;
		
		stage = f_menu.getStage();
		container1 = f_menu.getContainer();
		
		disable();
		
		stage.addChild(container4);
		
		container4.addChild(achievementBmp);
		container4.addChild(backBmp);
		
		backBmp.onPress = function() {
			backBmp.scaleX = 0.9;
			backBmp.scaleY = 0.9;
			backBmp.x += 2;
			backBmp.y += 2;
		}

		backBmp.onMouseOut = function() {
			backBmp.scaleX = 1.0;
			backBmp.scaleY = 1.0;
			backBmp.x = 50;
			backBmp.y = 370;
		}

		backBmp.onClick = function() {
			container4.removeAllChildren();
			enable();
		}
		
		for(var i = 0, j = 40; i < array.length; i++, j = j + 75 )
		{			
			w_bmp[i] = new Bitmap(array[i]);
			w_bmp[i].x = 460;
			w_bmp[i].y = j;
			switch ( i ) {
				case 0 : 
				case 1 :
						break;
				case 2 :w_bmp[i].scaleX = 0.9;
						break;
				case 3 :
						break;
				case 4 :w_bmp[i].scaleX = 1.1;
						break;
				case 5 : w_bmp[i].scaleX = 1.1;
						break;
				case 6 :
						w_bmp[i].scaleX = 0.8;
						break;
				case 7 :
						break;
				case 8 :w_bmp[i].scaleX = 1.1;
						break;
				case 9 :w_bmp[i].scaleX = 0.9;
						break;
				default :
						break;
				
			}
			
			bmp[i] = new Bitmap("./achievement/failed_2.png");
			bmp[i].x = 330;
			bmp[i].y = j - 14;
			bmp[i].scaleX = 0.7;
			bmp[i].scaleY = 0.7;
			
			container4.addChild(bmp[i]);
			container4.addChild(w_bmp[i]);
		}	
		

		/*container4.addChild(upBmp);
		container4.addChild(downBmp);
		container4.addChild(slideBmp);
		container4.addChild(runnerBmp);
			*/
		for(var i = 0; i < array.length; i++ )
		{
			//console.log(bmp[i].x + "   " + bmp[i].y);
		}

		if(window.localStorage){
			//console.log('This browser supports localStorage');
			displayAchie();
		}
		else {
			//console.log('This browser does not supports localStorage');
		}

		container4.addChild(upBmp);
		container4.addChild(downBmp);
		container4.addChild(slideBmp);
		container4.addChild(runnerBmp);
		
		runnerBmp.onPress = function(evt){
			var offset = {x:runnerBmp.x-evt.stageX,y:runnerBmp.y-evt.stageY};
			evt.onMouseMove = function(e){
				if(e.stageY >= 80 && e.stageY < 400) {
					runnerBmp.y = e.stageY+offset.y;
					for(var i = 0, j = 120; i < array.length; i++, j = j + 75)
					{
						w_bmp[i].y = j - e.stageY;
						bmp[i].y = (j - 14) - e.stageY;
						achBmp[i].y = bmp[i].y;						
					}
				}
			}
		}
	}

	var displayAchie = function() {

		for(var i = 0; i<achArr.length; i++)
		{
			achBmp[i] = new Bitmap(achArr[i]);
		}
		if(localStorage.getItem("kill100"))
		{
			achBmp[0].x = bmp[0].x;
			achBmp[0].y = bmp[0].y;
			achBmp[0].scaleX = 0.7;
			achBmp[0].scaleY = 0.7;
			container4.addChild(achBmp[0]);
		}
		if(localStorage.getItem("failAfter2m"))
		{
			achBmp[1].x = bmp[1].x;
			achBmp[1].y = bmp[1].y;
			achBmp[1].scaleX = 0.7;
			achBmp[1].scaleY = 0.7;
			container4.addChild(achBmp[1]);
		}
		if(localStorage.getItem("winIn1m"))
		{
			achBmp[2].x = bmp[2].x;
			achBmp[2].y = bmp[2].y;
			achBmp[2].scaleX = 0.7;
			achBmp[2].scaleY = 0.7;
			container4.addChild(achBmp[2]);
		}
		if(localStorage.getItem("winAllBuilding"))
		{
			achBmp[3].x = bmp[3].x;
			achBmp[3].y = bmp[3].y;
			achBmp[3].scaleX = 0.7;
			achBmp[3].scaleY = 0.7;
			container4.addChild(achBmp[3]);
		}
		if(localStorage.getItem("winAllTower"))
		{
			achBmp[4].x = bmp[4].x;
			achBmp[4].y = bmp[4].y;
			achBmp[4].scaleX = 0.7;
			achBmp[4].scaleY = 0.7;
			container4.addChild(achBmp[4]);
		}
		if(localStorage.getItem("winAllCamp"))
		{
			achBmp[5].x = bmp[5].x;
			achBmp[5].y = bmp[5].y;
			achBmp[5].scaleX = 0.7;
			achBmp[5].scaleY = 0.7;
			container4.addChild(achBmp[5]);
		}
		if(localStorage.getItem("kill200"))
		{
			achBmp[6].x = bmp[6].x;
			achBmp[6].y = bmp[6].y;
			achBmp[6].scaleX = 0.7;
			achBmp[6].scaleY = 0.7;
			container4.addChild(achBmp[6]);
		}
		if(localStorage.getItem("winAfter2m"))
		{
			achBmp[7].x = bmp[7].x;
			achBmp[7].y = bmp[7].y;
			achBmp[7].scaleX = 0.7;
			achBmp[7].scaleY = 0.7;
			container4.addChild(achBmp[7]);
		}
		if(localStorage.getItem("allLevelClear"))
		{
			achBmp[8].x = bmp[8].x;
			achBmp[8].y = bmp[8].y;
			achBmp[8].scaleX = 0.7;
			achBmp[8].scaleY = 0.7;
			container4.addChild(achBmp[8]);
		}
		if(localStorage.getItem("killBoss"))
		{
			achBmp[9].x = bmp[9].x;
			achBmp[9].y = bmp[9].y;
			achBmp[9].scaleX = 0.7;
			achBmp[9].scaleY = 0.7;
			container4.addChild(achBmp[9]);
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
	
	window.View_achievement = view_achievement;
	
}(window));
