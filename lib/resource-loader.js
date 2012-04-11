function testAudioStall(a){
}
(function(window){
        var progressBackgroundImage = "progressBackground.jpg";

        function ProgressBar(canvasId){
                var background  = new Bitmap(progressBackgroundImage);
                var canvas      = document.getElementById(canvasId);
                var stage       = new Stage(canvas);
                var context     = canvas.getContext("2d");
                var total       = 0;
                var current     = 0;
                var rect        = {width:300, height:20};
                var position    = {x:277, y:400};

                background.x    = 0;
                background.y    = 0;
                background.scaleX = 1;
                background.scaleY = 1;
                stage.addChild(background);
                stage.update();
                stage.scaleX = 1;
                stage.scaleY = 1;
                this.setTotal   = function(input){
                        total   = input;
                }
                this.getTotal   = function(){
                        return total;
                }
                this.setCurrent = function(input){
                        current = input;
                        updateProgressBar(current/total);
                }
                this.getCurrent = function(){
                        return current;
                }
                this.getPercentage = function(){
                        return current/total;
                }
                var updateProgressBar = function(percentage){
                        var i = percentage * rect.width;
                        var radius = rect.height /2  ;
                        console.log("current=>"+current+" total=>"+total);
                        drawProgressLayerRect(position.x,position.y,rect.width,rect.height, radius);            
                        drawProgressBarRect(position.x, position.y, i ,rect.height, radius);
                        drawProgressText(position.x, position.y, i, rect.height, radius, rect.width);
                        stage.update();
                }
                var drawProgressLayerRect = function(x,y,width,height,radius){  
                        var layerGraphics = new Graphics();
                        layerGraphics.beginFill("rgba(189,189,189, 1)");
                        layerGraphics.drawRoundRect(0,0,width+1,height+1,radius);
                        layerGraphics.endStroke();

                        var layerShape = new Shape(layerGraphics);
                        layerShape.shadow = new Shadow("#464646", 1, 1, 5);
                        layerShape.x = x-1;
                        layerShape.y = y-1;
                        layerShape.scaleX = 1;
                        layerShape.scaleY = 1;
                        var gradientGraphics    = new Graphics();
                        gradientGraphics.beginLinearGradientFill(["rgba(228,228,228, 1)","rgba(235,235,235, 1)","rgba(196,196,196, 1)"], [1, 0.8, 0],0,y+rect.height,0,0);
                        gradientGraphics.drawRoundRect(0, 0, width, height, radius);
                        gradientGraphics.endStroke();
                        var gradientShape       = new Shape(gradientGraphics);
                        gradientShape.x = x;
                        gradientShape.y = y;
                        gradientShape.scaleX = 1;
                        gradientShape.scaleY = 1;


                        stage.addChild(layerShape);
                        stage.addChild(gradientShape);
                }
                var drawProgressBarRect = function(x,y,width,height,radius){
                        var graphics    = new Graphics();
                        graphics.beginLinearGradientFill(["#4DA4F3","#ADD9FF","#9ED1FF"],[0, 0.4, 1],0,rect.height,0,0);
                        graphics.endStroke();
                        graphics.drawRoundRect(0, 0, width, height, radius);
                        var shape       = new Shape(graphics);
                        shape.x         = x;
                        shape.y         = y;
                        shape.scaleX    = 1;
                        shape.scaleY    = 1;
                        shape.shadow    = new Shadow("#666", 1, 1, 1);
                        stage.addChild(shape);
                }
                var drawProgressText = function(x, y, width, height, radius, max){
                        var percentage  = Math.floor(width/max * 100) +"%";
                        var label       = new Text(percentage, "normal 17px Arial",'white');
                        var textWidth   = label.getMeasuredWidth();
                        var textHeight  = label.getMeasuredLineHeight();
                        console.log(height);
                        console.log(textHeight);
                        label.textAlign = "center";
                        label.x         = x + width - textWidth - radius / 2;
                        label.y         = y + height - 5

                        stage.addChild(label);
                }
                this.dispose = function(){
                        stage.removeAllChildren();
                        delete stage;
                        delete background;
                        delete canvas;
                        delete context;
                        delete rect;
                        delete position;
                }
        }

        function ResourceLoader(resourcesList, successCallBack, failedCallBack){
                var successCallBack     = successCallBack;
                var resources           = new Array();
                var resourcesTrial      = new Array();
                var resourcesURLs       = resourcesList;
                var total               = resourcesURLs.length;
                var count               = 0;
                var imagePattern        = new RegExp("(http(s?):)|([/|.|\w|\s])*\.(?:jpg|gif|png|bmp)");
                var musicPattern        = new RegExp("(http(s?):)|([/|.|\w|\s])*\.(?:wav|mp3)");
                var progressBar         = new ProgressBar("mainView");
                progressBar.setTotal(total);
                this.startLoad = function(){
                        var url;
                        var filename;
                        for(var i=0; i < resourcesURLs.length; i++){
                                url      = resourcesURLs[i];
                                filename = url.substring(url.lastIndexOf('/')+1);
                                if(imagePattern.test(filename)){
                                        loadImage(url);
                                }else{
                                        loadAudio(url);
                                }
                        
                        }
                }
                var loadImage = function(url, count){
                        var image       = new Image();
                        image.onload    = increment;
                        image.onerror   = handleError;
                        image.src       = url;
                        resources[url]  = image;
                        resourcesTrial[url] = count == undefined ? 1 : count;
                }
                var loadAudio = function(url, count){
                        var filetype="", agent;
                        agent = navigator.userAgent.toLowerCase();
                                if(agent.indexOf("chrome") > -1){
                                        filetype = ".mp3";
                                } else if(agent.indexOf("opera") > -1) {
                                        filetype = ".wav";
                                } else if(agent.indexOf("firefox") > -1) {
                                        filetype = ".wav";
                                } else if(agent.indexOf("safari") > -1) {
                                        filetype = ".mp3";
                                } else if(agent.indexOf("msie") > -1) {
                                        filetype = ".mp3";
                                }
                        var audio = new buzz.sound(url + filetype);
                        audio.bind("loadeddata",increment);
/*                      audio.bind("empty",     handleAudioError);
                        audio.bind("dataunavailable", handleAudioError);
                        audio.bind("error", handleAudioError);
*/                      audio.sound.childNodes[0].onerror = handleAudioError;;
                        audio.load();
                        resources[url]  = audio;
                        resourcesTrial[url] = count == undefined ? 1 : count;
                }
                var increment = function(e){
                        count++;
                        progressBar.setCurrent(count);
                        if(count == total){
                                successCallBack();
                                progressBar.dispose();
                        }
                }
                var handleError = function(e){
                        var element = this;
                        var counter = 0
                        for(var key in resourcesTrial){
                                var checker = key;
                                if(key.indexOf("./") == 0){
                                        checker = key.substring(key.indexOf("./")+2,key.length);        
                                }
                                if(element.src.indexOf(checker) != -1){
                                        counter = resourcesTrial[key];
                                }
                        }
                        if(counter >= 3){
                                console.log("==error==");       
                                failedCallBack();
                        }else{
                                loadImage(element.src, counter + 1);
                        }
                }
                var handleAudioError = function(e){
                        var element = this;
                        var counter = 0;
                        var uri = "";
                        for(var key in resourcesTrial){
                                var checker = key;
                                if(key.indexOf("./") == 0){
                                        checker = key.substring(key.indexOf("./")+2,key.length);        
                                }
                                if(element.src.indexOf(checker) != -1){
                                        counter = resourcesTrial[key];
                                        uri     = key;
                                        break;
                                }
                        }
                        if(counter >= 3 || counter ==0 ||uri==""){
                                console.log("==error==");
                                failedCallBack();
                        }else{
                                loadAudio(uri, counter + 1);
                        }
                }
                this.getResources = function(){
                        return resources;
                }
                this.dispose = function(){
                        resourcesTrial.splice(0,resourcesTrial.length); 
                        delete successCallBack;
                        delete resources;
                        delete resourcesTrial;
                        delete resourcesURLs;
                        delete imagePatten;
                        delete musicPattern;
                        delete progressBar;

                }
        }
        window.ResourceLoader = ResourceLoader;
}(window));