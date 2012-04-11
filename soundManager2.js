    
    /*  @f_audio: HTMLAudioElement contains an array of source 
				  whose suffix is different in order to match different browser.
		@id: AudioElement id.
	*/
    function soundManager2(f_audio,id) {
        
        var element;
		var _audio;
		//play the music and loop
		this.loopSound = function() {
			try {
				if(f_audio != undefined)
				{
					document.getElementsByTagName("body")[0].appendChild(f_audio);
					f_audio.setAttribute("id",id);
					f_audio.play();   //First to play.
					f_audio.addEventListener("ended", function(evt){ loopCallBack(f_audio.childNodes,evt); }, false);
				}
			}
			catch(e) {
				//console.log(e + "");
			}
		}		
		
        //Remove old audio element and add a new audio element
        var loopCallBack = function(audiosource,evt){                
				var audio = document.createElement("audio");
                audio.setAttribute("id",id);
                try {
	                for(var i=0;i <audiosource.length ;i++){
	                    var source  = document.createElement("source");
	                    source.setAttribute("src", audiosource[i].getAttribute("src"));
	                    //U can just execute the statement below to see something.
	                    //console.log(audiosource.getAttribute("src"));                    
	                    audio.appendChild(source);
	                }//end of for

	                document.getElementsByTagName("body")[0].removeChild(evt.target);
					//console.log("evt.target is " + evt.target);
	                document.getElementsByTagName("body")[0].appendChild(audio);
	                audio.play();
					//When music is ended, execute function loopCallBack again.
	                audio.addEventListener("ended", function(event){ loopCallBack(audiosource,event); }, false);
	        	}
	        	catch(e) {
	        		//console.log(e + "");
	        	}
        };//end of loopCallBack		
		
        //pause the loop music.
        this.pauseLoopSound = function() 
        {
            element = document.getElementById(id);
            try {
				element.pause();
			}
			catch(e) {
				//console.log(e + "");
			}
        }
        //play the loop music.
        this.playLoopSound = function()
        {
            element = document.getElementById(id);
            try {
				element.play();
			}
			catch(e) {
				//console.log(e + "");
			}
        }
        //remove the loop music.
        this.removeLoopSound = function()
        {
            element = document.getElementById(id);
            try{
            	if(element != null)
            	{
					element.parentNode.removeChild(element);
					//console.log(element + "element");
				}
			}
			catch(e) {
				//console.log(e + "");
			}
        }
		//play music once
		this.playMusic = function()
		{
			_audio = document.createElement("audio");
            _audio.setAttribute("id",id);
            try {
	            if(f_audio != undefined)
		        {
		            for(var i=0;i <f_audio.childNodes.length ;i++){
		                var source  = document.createElement("source");
		                source.setAttribute("src", f_audio.childNodes[i].getAttribute("src"));                   
		                _audio.appendChild(source);
		            }
					document.getElementsByTagName("body")[0].appendChild(_audio);
					_audio.play();
				
					_audio.addEventListener("ended", function(evt){ 
						//must remove evt.target not _audio.
						document.getElementsByTagName("body")[0].removeChild(evt.target); 
					}, false);	
				}
			}
			catch(e) {
				//console.log(e + "");
			}
		}
		//pause music
		this.stopMusic = function()
		{
			try {
				_audio.pause();
			}
			catch(e) {
				//console.log(e + "");
			}
		}        
    }
