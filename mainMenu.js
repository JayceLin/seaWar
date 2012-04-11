window.sound_flag = 0;
function StartPage(){

    var canvas = $('#testCanvas')[0];
    var stage = new Stage(canvas);
    if (Touch.isSupported()) { Touch.enable(stage); }
    var container = new Container();
	
	var imageItemTable = [];
    var update = true;
    var resources;
	var menu = this;//new startpage()
	var audio;
    var sm;
	
    var resourcesURL = ["./MainMenu/start.png","./MainMenu/help.png","./MainMenu/about.png",
        "./MainMenu/achievement.png","./MainMenu/exit.png","./music/music.png","./music/nomusic.png",
		"./MainMenu/background.jpg","./music/Start"];
		
	var resourceLoader = new ResourceLoader(resourcesURL, 
			function() { 
				loadComplete();
            },
            function() {
                loadComplete();
				//console.log("start page load error.");
            }, "testCanvas");
			
    var viewItems = [{url:resourcesURL[0], x:15, y:15},
        {url:resourcesURL[1], x:15, y:105},
        {url:resourcesURL[2], x:15, y:195},
        {url:resourcesURL[3], x:15, y:285},
        {url:resourcesURL[4], x:15, y:375}];
	
	this.getCanvasWidth = function () { return canvas.width;}
	this.getCanvasHeight = function () { return canvas.height;}
	this.getStage = function(){
		return stage;
	}
	this.getContainer = function() {
		return container;
	}
    this.init = function(){
        preventDefaultIOS();
        resourceLoader.startLoad();
    }

    var preventDefaultIOS = function() {
        document.ontouchmove = function(e) {
            e.preventDefault();
        }
    };

    var loadComplete = function() {
		resources = resourceLoader.getResources();
        audio = resources["./music/Start"].sound;

    	sm2 = new soundManager2(audio,"startMusic");  //reference to soundManager2.js
        console.log("~~~~I'm here________",sm2,sm2.loopSound)
    	sm2.loopSound();
		
        localStorage.setItem("soundEnabled", "True");
        window.sound_flag = 1;

        stage.enableMouseOver();
		
        stage.addChild(container);
        
        var bmp = new Bitmap(resourcesURL[7]);
		container.addChild(bmp);
        $.each(viewItems,function(index, item){
            constructButton(item);
        });
        //container.getChildAt(9).mouseEnabled = false; //Number nine is "exit" button.
    }

    var constructButton = function(item) {
        var bitmap;
        bitmap = new Bitmap(resources[item.url]);
        bitmap.x = item.x;
        bitmap.y = item.y;
		
        //console.log(container.getNumChildren());
		
        bitmap.name = "bmp_"+container.getNumChildren();
        bitmap.scaleX = 1.0;
        bitmap.scaleY = 1.0;
 
        (function(t) {
            t.onPress = function(evt) {
                switch(evt.target.name) {
                    case "bmp_1":
                         sm2.removeLoopSound();
                         Ticker.removeListener(stage);
                         LevelSelect(menu);
                        break;
                    case "bmp_3": 
			             View_help(menu);
                       	break;
                    case "bmp_5": 
			             View_about(menu);
                        break;
                    case "bmp_7": 
			             View_achievement(menu);
                        break;
                    case "bmp_9":
			             View_quit(menu);
                        break;
                    default: 
			             break;
                }
            }
            t.onMouseOver = function() {
                t.x = t.x-11.55;
                t.y = t.y-5.55;
                t.scaleX = t.scaleY = 1.1;
            }
            t.onMouseOut = function() {
                t.x = t.x+11.55;
                t.y = t.y+5.55;
                t.scaleX = t.scaleY = 1.0;
            }
			
        })(bitmap);	
		
        container.addChild(bitmap);
        loadSoundIcon();
        Ticker.addListener(stage);
    }
	
    var loadSoundIcon = function() {
        var bmp1 = new Bitmap(resourcesURL[5]);
		var bmp2 = new Bitmap(resourcesURL[6]);
		bmp2.x = canvas.width - 66;
		bmp2.y = canvas.height - 66;
        bmp1.x = canvas.width - 66;
        bmp1.y = canvas.height - 66;
        container.addChild(bmp1);

		bmp1.onClick = function() {
			container.addChild(bmp2);
            sm2.pauseLoopSound();
            localStorage.setItem("soundEnabled", "False");
            window.sound_flag = 0;
            //console.log("pause++");
		}
		
		bmp2.onClick = function() {
			container.removeChild(bmp2);
			sm2.playLoopSound();
            localStorage.setItem("soundEnabled", "True");
            window.sound_flag = 1;
            //console.log("play++");
		}
    }
	
}


