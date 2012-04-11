(function(window){
	var stage2;
	var container1;
	var container6 = new Container();
	var CanvasWidth;
	var CanvasHeight;
	
function levelSelect(f_menu) {

//    var Canvas = document.getElementById("testCanvas");
//    var stage = new Stage(Canvas);
    // Ticker.setPaused(false);
	
	var stage = f_menu.getStage();
	container1 = f_menu.getContainer();

	disable();
	
	stage.addChild(container6);
	
	var CanvasWidth = f_menu.getCanvasWidth();
	var CanvasHeight = f_menu.getCanvasHeight();
    
    var resoucesURL = picUrl();
    localStorageData();

    function picUrl() {
        var picURL = [];
        for (var i = 0; i < 14; i++) {
            picURL[i] = "./Level/"+(i+1)+".png";
        }
        picURL.push("./Level/level.jpg");
        picURL.push("./Level/return.png");
        picURL.push("./Level/close.png");
        picURL.push("./Level/13close.png");
        //console.log(picURL);
        return picURL;
    }
    

    //local storage test data
    function localStorageData() {
        var level_max = 14;
        for(count = 1, playData = [] ; count <= level_max; count++) {
            var time = localStorage.getItem("l"+count);
            if(time) {
                playData[count] = time;
            }
            else {
                break;
            }
        }

        return playData;
    }

    
    var resources = [];

   //Ticker.removeListener(stage);
    var imgLoader = new ResourceLoader(resoucesURL, function() {
        drawLevelScreen(localStorageData(),CanvasWidth,CanvasHeight);
        //console.log("IMAGE LOAD SUCCESS!");
        Ticker.addListener(stage)
        Ticker.setPaused(false);
       }, 
        function() {
            alert("IMAGE LOAD FAILED!")
        }, "testCanvas");
        
        
        imgLoader.startLoad();
        resources = imgLoader.getResources();
        imgLoader.dispose();


    var drawLevelScreen = function (levelTime, canvasWidth, canvasHeight) {
        var picPos = []; //coordinate of each picture
        var backImg = new Bitmap(resources["./Level/level.jpg"]);

		var levelFinish = levelTime.length;
       // console.log(levelTime);
        if(levelFinish > 0){
            levelFinish -= 1;
        }
		
        backImg.scaleX = CanvasWidth/854;
        backImg.scaleY = CanvasHeight/480;
		container6.addChild(backImg);
        stage.update();


        var returnButton = new Bitmap(resources["./Level/return.png"]);
        returnButton.x = 13/800 * canvasWidth;
        returnButton.y = 364/480 * canvasHeight;
		container6.addChild(returnButton);
        returnButton.onClick = function(evt) { 
            //screenDispose();
            if(document.getElementById("newCanvas") == null) {
                container6.removeAllChildren();
                enable();
            }

            if(document.getElementById("newCanvas") != null) { 
                document.getElementById("canvasWrapper").removeChild(document.getElementById("newCanvas"));
                (new StartPage()).init(); 

                //Ticker.removeListener(stage);
                Ticker.removeListener(Timer);
                Ticker.setPaused(false);
                //console.log("XXXXXXXXXXXXXXX");
            }
        };
            
        //Calculate the coordinate of starting point of each line
        var startX1 = 44/800 * canvasWidth;
        var startY1 = 25/480 * canvasHeight;

        var startX2 = 100/800 * canvasWidth;
        var startY2 = 130/480 * canvasHeight;                    

        var startX3 = 225/800 * canvasWidth;
        var startY3 = 420/800 * canvasHeight;

        //Store the coordinate of each point in an array
        for(var i = 0; i < 6; i++) {
            x = startX1 + i * (79+46)/800 *canvasWidth;
            y = startY1;
            picPos[i+1] = [x,y];
        }
        for(var i = 0; i < 5; i++) {
            x = startX2 + i * (79+46)/800 *canvasWidth;
            y = startY2;
            picPos[i+7] = [x,y];
        }
        for(var i = 0; i < 3; i++) {
            x = startX3 + i * (79+46)/800 *canvasWidth;
            y = startY3;
            picPos[i+12] = [x,y];
        }

        //Draw the pictures of finished level
        if(levelFinish > 14) {
            //console.log("Level Number is too large!");
            alert("error");
        }
        for(var i = 1; i <= levelFinish+1; i++) {
            if (i > 14) break;
            var levelImg = new Bitmap(resources["./Level/"+i+".png"]);
           // console.log("Level: "+ i);
        //    console.log("picPos:"+picPos);
            drawLevel(levelImg,picPos[i][0],picPos[i][1], i);
            displayText(picPos[i][0],picPos[i][1],levelTime[i]);
        }
        //Draw the pictures of question mark
        //if(levelFinish < 12) {
        for(i ; i <= 12; i++) {
            var levelImg = new Bitmap(resources["./Level/close.png"]);
            drawQues(levelImg,picPos[i][0],picPos[i][1]);
            displayText(picPos[i][0],picPos[i][1]);
        }
        for(; i <= 14; i++) {
            var levelImg = new Bitmap(resources["./Level/13close.png"]);
            drawQues(levelImg,picPos[i][0],picPos[i][1]);
            displayText(picPos[i][0],picPos[i][1]);
        }
    }

    function drawQues(levelImg,x,y) {

        levelImg.x = x;
        levelImg.y = y;
        //stage.addChild(levelImg);
		container6.addChild(levelImg);
    }

    function drawLevel(levelImg,x,y,levelNumber) {

        levelImg.x = x;
        levelImg.y = y;
		container6.addChild(levelImg);
        levelImg.onClick = function() {
            screenDispose();
            window.games=new Game({canvas:document.getElementById("testCanvas"),level:levelNumber});
            games.init();
            Ticker.removeListener(stage);
			container6.removeAllChildren();
            if(document.getElementById("newCanvas") != null) {
                Utility.setGamePaused(false);
                document.getElementById("canvasWrapper").removeChild(document.getElementById("newCanvas"));
            }
           // console.log("-----------------------------levelNumber:"+levelNumber);
        }
    }

    function displayText(x,y,passedTime) {
        var timeUsed = new Text();
        if(passedTime == null) {
            timeUsed.text = "00:00";
            timeUsed.maxWidth = 50;
            timeUsed.color = "#0000FF";
            timeUsed.font = "18px Comic Sans MS";
     //       console.log("displayText called.");
        }
        else {
            timeUsed.text = passedTime;
            timeUsed.maxWidth = 50;
            timeUsed.color = "#0000FF";
            timeUsed.font = "18px Comic Sans MS";
        }
        timeUsed.x = x + 15;
        timeUsed.y = y + 100;
		container6.addChild(timeUsed);
    }

    function screenDispose() {
        stage.removeAllChildren();
    }
}
//new below
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
		//console.log("total is :" + total + "    ++++++++");
		for(var i=0; i<total; i++) {
			element = container1.getChildAt(i);
			element.mouseEnabled = true;
		}
	}
//above

 window.LevelSelect = levelSelect;

}(window));
