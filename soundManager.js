    
    //Parameter is HTMLAudioElement and audio id.
    function soundManager(f_audio,id) {
        
        var element;
        //First to play.
		if(f_audio instanceof HTMLElement){
	        document.getElementsByTagName("body")[0].appendChild(f_audio);
	        f_audio.setAttribute("id",id);
	        f_audio.play();
	
     	    f_audio.addEventListener("ended",function(e) {
     	               loopCallBack(f_audio.childNodes,e);
                    //console.log("e is " + e.target);
       	         }, false );
	}
        //Remove old audio element and add a new audio element
        var loopCallBack = function(soundsource,evt){
                var audio = document.createElement("audio");
                audio.setAttribute("id",id);

                for(var i=0;i <soundsource.length ;i++){
                    var source  = document.createElement("source");
                    source.setAttribute("src", soundsource[i].getAttribute("src"));

                    //U can just execute the statement below to see something.
                    //console.log(soundsource.getAttribute("src"));
                    
                    audio.appendChild(source);
                }
                //When music is ended, execute function loopCallBack again.
                audio.addEventListener("ended", function(event){
                    loopCallBack(soundsource,event)
                }, false);

                document.getElementsByTagName("body")[0].removeChild(evt.target);
                document.getElementsByTagName("body")[0].appendChild(audio);
                audio.play();
        }
        //pause the music.
        this.stopSound = function() 
        {
            element = document.getElementById(id);
            if(element != null){
	    	element.pause();
	    }
        }
        //play the music.
        this.playSound = function()
        {
            element = document.getElementById(id);
            if(element != null){
			element.play();
	    }
        }
        //remove the music.
        this.removeSound = function()
        {
            element = document.getElementById(id);
            if(element != null){
	    	element.parentNode.removeChild(element);
	    }
        }
        
    }
