
//bubble
var bubbleFactor=[];
var bubbleConduct=[];//{resource:tower,destination:tower}
var Bubble=function(options){
	this.source=options.source;
	this.x=this.source.x;
	this.y=this.source.y;
	this.isDead=false;
	this.collisionContainer={
		Monster:{},
		Bubble:[]
	};
	
}
Bubble.prototype=new Component();
Bubble.tick=function(e){
	    	//bmpAnim.x+=bmpAnim.vX;
			//bmpAnim.y+=bmpAnim.vY;
			//stage.update();
			for(var j=0;j<bubbleFactor.length;j++){
				var cache=bubbleFactor[j].bubbleList;
				var path=bubbleFactor[j].path
				for(var i=0;i<cache.length;i++)
				{
					var currentBubble=cache[i];
	        		// console.log(bubbleFactor.path.slope+":v"+bubbleFactor.path.v
	        		currentBubble.x+=path.v;
	        		currentBubble.y+=path.slope*path.v;
	        		if(Utility.judgeInCircle(currentBubble.x,currentBubble.y,1,path.resource))
	        			{
	        				//stage.removeChild(this);
	        				Utility.stage.removeChild(currentBubble)
	        			}
				}

			}
	        
			//console.log("ticking")

    }
