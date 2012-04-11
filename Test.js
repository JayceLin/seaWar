
var tempImg=new Image();
tempImg.src="./img/pop.png";

tempImg.onload=function(){
	Game.init({
		//canvas:document.querySelector("#canvas"),

	});

	Game.startGame({
		level:1
	});

	t=new Tower({
		id:1,
		type:1,
		owner:"enemy",
		armySize:30, 
		status:"normal",
		neighbours:[2,3,7,8],
		x:380,
		y:45
	});

	//@@ToDo
	//load parameters from the CONFIG table 
	t.init({
		Game:Game,
		img:this,
		frames:{width:79,height:79,regX:40,regY:40},
		animations:{stand:[0,3,"stand"]},
		speed:1,
		direction:90,
		currentAnimationFrame:0,

		startAnimName:"stand",
		insideGlobalVariable:{
			count:0
		},
		ticksFun:function(){
				//console.log("t tick count: ",t.insideGlobalVariable.count)
				if(t.insideGlobalVariable.count ++ <70){
					//console.log("t tick counts: ",t.insideGlobalVariable.count)
					Game.stage.update();
				}
				/*else{
					Game.isPlay=false;
				}*/
				else{
					t.dispose();
				}
		}
	});


}


/*t2=new Tower({
	id:2,
	type:1,
	owner:"enemy",
	armySize:30, 
	status:"normal",
	neighbours:[2,3,7,8],
	x:380,
	y:45

});*/
/*t2.init({
	imgSrc:"./img/arms_walk.png",
	frames:{width:36,height:37,regX:18,regY:18},
	animations:{
	    stands:[0,7,"stands"]
	},
	speed:1,
	direction:90,
	currentAnimationFrame:0,
	startAnimName:"stands",
});*/
 
/*t2.init({
	imgSrc:"./img/pop.png",
	frames:{width:79,height:79,regX:40,regY:40},
	animations:{stands:[0,3,"stands"]},
	speed:1,
	direction:90,
	currentAnimationFrame:0,

	startAnimName:"stands",
	insideGlobalVariable:{
		count:0
	},
	ticksFun:function(){
			//console.log("t2 tick count: ",t2.insideGlobalVariable.count)
			if(t2.insideGlobalVariable.count ++ <50){
				console.log("t2 tick count: ",t2.insideGlobalVariable.count)
				Game.stage.update();
			}
			else{				
				t2.dispose();
			}
	}
});*/


/*
//@@ToDo:move it into its init function
t.addEventListener({
	eventType:"onClick",
	callback:function(e){
		console.log("clicking");
		var img=new Image(),
			that=this;
		img.src="./img/arms_walk.png";
		img.onload=function(){	
			that.spriteSheet=new SpriteSheet({
	    		images:[img],
	    		frames:{width:36,height:37,regX:18,regY:18},
	    		animations:{
	    			stands:[0,7,"stands"]
	    		}
	    	});
	    	that.gotoAndPlay("stands");
	    	that.currentAnimationFrame=0;
	    	//Game.stage.addChild(this)
	    }
	}
});
t.addEventListener({
	eventType:"onPress",
	callback:function(e1){
		e1.onMouseMove=function(e2){
			console.log("onMouseMoving");
		}
	}
});
console.log(t)

var b=new Bubble({
	source:{
		x:2,
		y:1
	},
	destination:{
		x:6,
		y:10
	},
	x:190,
	y:380
});

/*b.init({
	imgSrc:"./img/pop.png",
	frames:{width:79,height:79,regX:40,regY:40},
	animations:{stand:[0,3,"stand"]},
	speed:1,
	direction:90,
	currentAnimationFrame:0,
	startAnimName:"stand",
	tickFun:function(){
		//Game.stage.update();
		Game.stage.update();
		
	}
})*/


