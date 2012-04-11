var Utility={
	beget:function(obj){
		var f=function(){};
		f.prototype=obj;
		return new f();
	},
	extend:function(Sub,Super){
		Sub.prototype=this.beget(Super.prototype)
	},
	extendPro:function(obj,extendFun){
		if(typeof(obj)!==Object && !(obj instanceof Function))
			return false;
		for(var i=0;i<extendFun.length;i++){
			obj.prototype[extendFun[i].funName]=extendFun[i].fun;

			}
	},
	judgeInBoss:function(stageX,stageY,level){
			if(level != 14){
							return false;
			}

			boss = Towers[16];
			if(!boss) return false;
			var x=boss.x;
			var y=boss.y;
			var radius=40;

			if((Math.pow(stageX-x,2)+Math.pow(stageY-y,2))<Math.pow(radius,2)){
				return boss;
			}
	},
	judgeInCircle:function(stageX,stageY,level,resource,specifiedRadius){
		var cache=Towers;
		var arrtest=false;
		for(var i=1,len=cache.length;i<len;i++){
			if(resource){	
				if(resource.constructor==Array)
				{
					for(var k=0;k<resource.length;k++)
					{
						if(cache[i].id==resource[k].id)
						{
							arrtest=true;
							
						}
					}
					if(arrtest)
					{
						arrtest=false;
						continue;
					}
						
						
				}	
				else
				{		
					if(cache[i].id==resource.id){
						continue;
					}						
				}
			}
			//console.log(cache[i].id)
			var radius=undefined;
			var x=cache[i].x
			var y=cache[i].y
            if(specifiedRadius){
                radius = specifiedRadius;
            }
            else{
			    radius=CONFIG.Radius[cache[i].owner];
            }
			if((Math.pow(stageX-x,2)+Math.pow(stageY-y,2))<Math.pow(radius,2)){
				return this.getTowerById(cache[i].id);
			}
		}
		return false;
	},
	judgeNeighbour:function(resource,destination){
		
		for(var j=0;j<resource.length;j++){
			var source=resource[j];
			var n=source.neighbours;
			//var direction="positive"
			//console.log(resource,destination)
			//check the path trying to shoot bubble if it is shooting now
			// for(var k=0;k<bubbleHelp.bubbleConduct.length;k++)
			// {
			// 	if(bubbleHelp.bubbleConduct[k].resource==resource&&bubbleHelp.bubbleConduct[k].destination==destination)
			// 		return false;
			// }
			for(var i=0;i<=n.length;i++)
			{
				if(n[i]==destination.id)
				{
					// if(source.x>destination.x)
					// 	direction="negative";
					// 	bubbleHelp.bubbleConduct.push({
					// 			resource:source,
					// 			destination:destination
					// })
					//return {slope:(source.y-destination.y)/(source.x-destination.x),direction:direction}
					return true;
				}
			}
			
		}
		return false;
	},
	drawCount:function(options){
		var x=options.x;
		var y=options.y;
		var label=options.label;
		var maxWidth=options.maxWidth;
		label.text=options.text.toString();
		label.textAlign = "center";
		label.x = x||0;
		label.y = y||0;
		label.maxWidth=maxWidth||40;
		//this.stage.addChild(label)
	},
	getTowerById:function(id){
		return Towers[id];
	},
	clearLeave:function(){
		for(i=0;i<shootPointToObj.leaveContainer.length;i++)
			this.stage.removeChild(shootPointToObj.leaveContainer[i]);
		        //clear all leave
        shootPointToObj.leaveContainer=[];
        //console.log(shootPointToObj.leaveContainer)
	},
	clearMonsterConstant:function(){
		for(var j=0;j<MonsterWithLeave.length;j++)
		{
			MonsterWithLeave[j].hasLeave=false;
		}//that.resource.shoot({that:that,stage:stage,count:count,newBubble:newBubble,shootTarget:shootTarget})
		MonsterWithLeave=[];
	},
	getPath:function(sources,destination){
		//console.log(sources);
		var _findNodePath = function(node,destination,path){
				var cost = 99999999;
				var nextNode = undefined;
				var cheapestPath = undefined;
				for(var i = 0; i < node.neighbours.length; i++){
					var n = Utility.getTowerById(node.neighbours[i]);
					
					if(sources.indexOf(n) == -1 && n.id != destination.id){
						continue;
					}
					
					if(n.id == destination.id){
						 nCost = Math.pow(node.x - n.x,2) + Math.pow(node.y - n.y,2);
						 path.push(n);
						 nextNode = n;
						
						 if(nCost < cost){
							nextNode = n;
							cost = nCost;
							cheapestPath = path;
						}
					}
					else if(path.indexOf(n) == -1){
						 var tpath = path.slice(0);
						 tpath.push(n);
						 costObj = _findNodePath(n,destination,tpath);

						 costObj.cost += Math.pow(node.x - n.x,2) + Math.pow(node.y - n.y,2);	
						// console.log( costObj.cost);		 
						 nCost = costObj.cost;		 
						 nextNode = n;
						 if(nCost < cost){
							nextNode = n;
							cost = nCost;
							cheapestPath = costObj.path;
						}
					}
				}
				//console.log( {cost:cost,path:cheapestPath});
				return {cost:cost,path:cheapestPath};
		};
		var lines=[];
		for(var i = 0; i < sources.length; i++){
			var path = [];
			var node = sources[i];
			path.push(node);
			var result = _findNodePath(node,destination,path);
			lines.push(result);
		}
		// for(var i=0;i<lines.length;i++)
		// {
		// 	if(lines.length==1)
		// 		break
		// }
		return lines;
	},
	setGamePaused:function(value){
		Ticker.setPaused(value);
		/*var i=0,
			len=Utility.TowerArmySizeInterval.length;*/
		//Pause the game clock
		value ? Timer.funs.pauseClock() : Timer.funs.resumeClock();;
		
	},
	isWin:function(){
		for(var i in Towers){
			if(Towers[i] === undefined) {
				return false;
			}
  			else if(Towers[i].owner === OCTOPUS||Towers[i].owner === CUTTLEFISH||Towers[i].owner === GLOBEFISH){
  				return false;
  			}
		}
		return true;
	},
	isLose:function(){
		for(var i in Towers){
			if(Towers[i]===undefined){
				return false;
			}
			else if(Towers[i].owner==PLAYER){
				return false;
			}
		}
		return true;

	},
	checkGameStatus:function(){
		var player=0,
			others=0,
			neutral=0;


		for(var i in Towers){
			if(Towers[i]===undefined){
				return 0;
			}
			else if(Towers[i].owner==PLAYER){
				player++;
			}
			else if(Towers[i].owner===NEUTRAL){
				neutral++;
			}
			else{
				others++;
			}
		}

		if(player==0){
			return -1; //lose
		}
		else if(others==0){
			return 1; //win
		}
		else{
			return 0; //processing
		}
	},
	getMedal:function(){
		//alert("You're awesome");
		var isOccupyAllTowers=true,
			isOccupyAllBattery=true,
			isOccupyAllCamp=true;

		 
		for(var item in Towers){
			if(Towers[item].owner!=PLAYER){
				isOccupyAllTowers=false;
				if(Towers[item].type=="Base"){
					isOccupyAllBattery=false;
				}
				if(Towers[item].type=="Transfer"){
					isOccupyAllCamp=false;
				}
			}
		}

		return{
				isOccupyAllCamp:isOccupyAllCamp,
				isOccupyAllBattery:isOccupyAllBattery,
				isOccupyAllTowers:isOccupyAllTowers
			}
	},
	updateCustomComponent:function(a){
		//slow down the different component
		if(a.owner==OCTOPUS||a.owner==CUTTLEFISH||a.owner==GLOBEFISH){
			a.makeAction({ gameFPS:Ticker.getFPS(),  multiplier:0.03 });
			Utility.CustomComponentList.push(a);
		}
		else if(a.owner==NEUTRAL){
			a.makeAction({  gameFPS:Ticker.getFPS(),  multiplier:0.13});
			Utility.CustomComponentList.push(a);
			
		}
		else if(a.owner==PLAYER){
			a.makeAction({  gameFPS:Ticker.getFPS(),  multiplier:0.1});
			Utility.CustomComponentList.push(a);
		}
	},
	showShootingAnim:function(target){
		var setId;
		return (function(){
			clearTimeout(setId);
			setId=setTimeout(function(){
				if(target.owner==PLAYER){
					//console.log("player")
				}
				else if(target.owner==NEUTRAL){
					//console.log("neutral")
				}
				else if(target.owner==OCTOPUS){
					//console.log("octopus")
				}
			},1);
		})();
	},
	/*
	beginCounting:function(){
		var temp,
			that=this;
		//console.log("~~~",this,this.armySize)

		if( that.type=="Base" ){
			if(that.owner=="player"){
				temp=setInterval(function(){
					 that.armySize++;
					 Utility.drawCount({text:that.armySize,x:that.x+50,y:that.y-20,label:that.label,maxWidth:20});
				},CONFIGlobalGame.PlayerArmySizeIncreament);
			}
			else if(that.owner=="enemy"){
				temp=setInterval(function(){
					 that.armySize++;
					 Utility.drawCount({text:that.armySize,x:that.x+50,y:that.y-20,label:that.label,maxWidth:20});
				},CONFIG.GlobalGame.EnemyArmySizeIncreament);
			}
			else if(that.owner=="intermediate"){
				temp=setInterval(function(){
					 that.armySize++;
					 Utility.drawCount({text:that.armySize,x:that.x+50,y:that.y-20,label:that.label,maxWidth:20});
				},CONFIG.GlobalGame.IntermediateArmySizeIncreament);
			}
		}
		else if(that.type="Transfer"){
			//no increasing
		}
		Utility.TowerArmySizeInterval.push(temp)
	},
	*/
	stopCounting:function(){
		if(Utility.TowerArmySizeInterval.length>0){
			for(var i=0,len=Utility.TowerArmySizeInterval.length;i<len;i++){
				clearInterval(Utility.TowerArmySizeInterval[i]);
			}
			Utility.TowerArmySizeInterval=[]
		}
		
	},
	getBossPath:function(source){
			var source=source||this.getTowerById(16);
			var destination=Utility.getTowerById(source.neighbours[Math.round(Math.random())])
			var v=6;
         var length=Math.sqrt(Math.pow(destination.y-source.y,2)+Math.pow(destination.x-source.x,2));
         dx=(destination.x-source.x)/length*v;
         dy=(destination.y-source.y)/length*v;
         return {dx:dx,dy:dy,destination:destination}
	},
	stage:null,
	TotalKill:0,
	CustomComponentList:[],
	TowerArmySizeInterval:[]
	// caculatePath:function(x1,y1,x2,y2,v){
	// 	var coordinate={x:0,y:0};
	// 	coordinate.x=x1

	// }
};
