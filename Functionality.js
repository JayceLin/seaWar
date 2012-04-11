//globle config table
var CONFIG={

	LevelArmys:[
		/*level1:{
			Vector:{
				Monster1:{
					x:100,
					y:200,
					type:"user",
					num:32
				},
				Monster2:{
					x:500,
					y:400,
				}
				//Monster3
				//DifferentTypeMonster
			},
			Edeg:[
					["Monster1","Monster2"],
					["Monster2","Monster4"]
			]
		}//level1 end*/

		[{ //level 1
			id:1, 
			type:"Base", 
			owner:"enemy", 
			armySize:30, 
			status:"normal", // 
			neighbours:[2,3,7,8],
			coordinate:{
				x:100,
				y:200
			}
		},
		{
			id:2, 
			type:"Base", 
			owner:"enemy", 
			armySize:30, 
			status:"normal", // 
			neighbours:[2,3,7,8],
			coordinate:{
				x:100,
				y:200
			}
		},
		]
	],//level configration
	LevelResourse:{
		level1:{
			backgroundImageURL:"level1Bg.png"
		}
	},
	GlobalResourses:{

	},
	Tower:{
		/*User:{
			shootingSpeed:100,
			standFPS:27,
			walkFPS:45,
			numIncreaseRate:10,
			shootingSpeed
		},
		Enemy:{

		}*/
		bubbleSpeed:2,
		standFPS:27,
		walkFPS:45,
		numIncreaseRate:10,
		shootingSpeed:20,
		armySizeIndicator:{
			armySizeOffSetX:10,
			armySizeOffSetY:20,
			font:"bold 30px Arial",
			color:"black"
		}
		
	},
	GlobalGame:{
		BoomMaximum:50,
	}
}




//@@Caching Module
//LocalStorage



//@@Caching Module?
var Cache={
	hasCache:function(){
		//console.log("Checking for Cache ");
		return true;
	},
	loadSession:function(){
		//console.log("I'm loading the cache")
	}
}

//@@Resourse Loader Module

var ResourseLoader=(function(){

	return {
		loadResouces:function(level){
			//console.log("loading level",level," resources ");
		}
	}
})();

//




var Utility={
	beget:function(obj){
		var f=function(){};
		f.prototype=obj;
		return new f();
	},
	extend:function(Sub,Super){
		Sub.prototype=this.beget(Super.prototype)
	}
};



