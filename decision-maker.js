(function(window){
	var convertToUnique = function(list){
		var o = {}, a = [];
		for (var i = 0; i < list.length; i++) {
			if(o[list[i].id] == undefined){
				o[list[i].id] = 1;
				a.push(list[i]);
			}
		}
		return a;
	}
	window.DecisionMaker = DecisionMaker;
	window.Order = Order;
	function Order(){
		this.destination = null;
		this.amount = 0;
	}
	function DecisionMaker(graph, owner){
		var enemyTowerList;
		var gameGraph	= graph;
		var aiOwner	= owner;
		this.MakeDecision = function(aiTowers){// ,playerTowers){
			enemyTowerList	= convertToUnique(aiTowers);
			var costList	= [];
			var neighbours	= [];
			var tower;
			var destination	= [];
			for(var i = 0; i< enemyTowerList.length; i++ ){
				tower = enemyTowerList[i];
				tower.clearOrder();
				if(tower.status == 'UnderAttact'){
					destination.push(tower);
				}
				for(var k=0; k < tower.neighbours.length; k++){
					var neighbour = gameGraph[tower.neighbours[k]];
					if(neighbour.owner != aiOwner){
						neighbours[neighbour.id] = neighbour;
					}
				}
			}
			for(var towerId in neighbours){
				//console.log("tower id =>"+towerId);
				tower = neighbours[towerId];
				//console.log("tower object=>")
				//console.log(tower);
				costList.push(weight(tower));
			}
		//	//console.log("strenght difference => "+strenghtDifference);
			costList.sort(function(a,b){
				if(a.tower.owner==b.tower.owner){
					return a.score - b.score;
				}else{
					if(b.tower.owner == NEUTRAL || a.tower.owner != aiOwner){
						var strenghtDifference = getTotalArmyOfEnemy() - getTotalArmyOfCamp(a.tower.owner);
						if(strenghtDifference > 0){
							return -1 * strenghtDifference;
						}else{
							return a.score - b.score;
						}
					}else if(b.tower.owner != aiOwner || a.tower.owner == NEUTRAL){
						var strenghtDifference = getTotalArmyOfEnemy() - getTotalArmyOfCamp(b.tower.owner);
						//return  1 * strenghtDifference;
						if(strenghtDifference > 0){
							return 1 * strenghtDifference;
						}else{
							return a.score - b.score;
						}
					}
					return a.score - b.score;
				}
			});
			//console.log("cost list");
			//console.log(costList);
			if(destination.length > 0){
				var difference = getTotalArmyOfEnemy() - getTotalArmyOfCamps(destination);
				//console.log("total Army Of self =>"+getTotalArmyOfEnemy());
				//console.log("total Army Of attacker camps =>"+getTotalArmyOfCamps(destination));
				if(difference >0){
					for(var i=0;i<costList.length;i++){
						if(difference < 0){
							break;
						}else{
							if(difference > costList[i].score){
								destination.push(costList[i].tower);
								difference -= costList[i].score;
							}
						}
					}
				}
			}else{
				var difference = getTotalArmyOfEnemy();
				//console.log("total Army Of self =>"+getTotalArmyOfEnemy());
				for(var i=0;i<costList.length;i++){
					if(difference < 0){
						break;
					}else{
						if(difference > costList[i].score){

							destination.push(costList[i].tower);
							difference -= costList[i].score;
						}
						if(destination.length == 0 && i== 0 && difference *1.5 > costList[i].score &&  costList[i].tower.owner != NEUTRAL){
							difference = 0;
							destination.push(costList[i].tower);
						}
					}
				}
			}
			//console.log("destination======>");
			//console.log(destination);
			constructNodeAction(destination);
			for(var i=0;i<enemyTowerList.length;i++){
				var enemy = enemyTowerList[i];
				var orders= enemy.getOrders();
				//console.log("enemy order count=>"+orders.length);
				for(var k = 0; k < orders.length;k++){
					//console.log("from =>"+ enemy.id+" to destination=>"+orders[k].destination.id+"     amount=>"+orders[k].amount);
				}
			}
			return enemyTowerList;
		}
		var constructNodeAction = function(destination){
			var nodeCount	= 0;
			var average	= 0;
			var total	= getTotalArmyOfEnemy();
			for(var i=0;i<destination.length;i++){
				if(destination[i].owner != aiOwner){
					nodeCount++;
					total -= destination[i].armySize;
				}
			}
			nodeCount += enemyTowerList.length;
			average	= Math.floor(total/nodeCount);
			average	= average <= 0 ? 1 : average;
			//console.log("average =>"+average);

			while(destination.length > 0){
				var tower = destination.splice(0,1)[0];
				var requirement = {amount:0};
				var visitedNodes = [];
				if(tower.owner == NEUTRAL ||tower.owner != aiOwner){
					requirement.amount = tower.armySize + average;
					var maxDepth = 1;
					while(visitedNodes.length < enemyTowerList.length && requirement.amount >0 && maxDepth<=10){
						for(var k=0;k<tower.neighbours.length;k++){
							var neighbour = gameGraph[tower.neighbours[k]];
							if(enemyTowerList.indexOf(neighbour) != -1 && neighbour.owner == aiOwner){
								depthFirstSearch(tower, neighbour, visitedNodes, average, requirement, 0, maxDepth);
							}
						}
						maxDepth++;
						visitedNodes = convertToUnique(visitedNodes);
					}
				}else if(tower.owner == aiOwner){
					requirement.amount = average - tower.amount;
					var maxDepth = 1;
			/*		for(var k=0;k<tower.neighbours.length;k++){
						var neighbour = gameGraph[tower.neighbours[k]];
						if(enemyTowerList.indexOf(neighbour) != -1){
							depthFirstSearch(tower, neighbour,visitedNodes,average, requirement);
						}
					}
					*/
					while(visitedNodes.length < enemyTowerList.length && requirement.amount >0&&maxDepth <=10){
						for(var k=0;k<tower.neighbours.length;k++){
							var neighbour = gameGraph[tower.neighbours[k]];
							if(enemyTowerList.indexOf(neighbour) != -1 && neighbour.owner == aiOwner){
								depthFirstSearch(tower, neighbour, visitedNodes, average, requirement, 0, maxDepth);
							}
						}
						maxDepth++;
						visitedNodes = convertToUnique(visitedNodes);
					}
					
				}
			}
		}
		var depthFirstSearch = function (ancestor, currentNode, visitedList, average,requirement,currentDepth, maxDepth){
			var armySize = 0;
			var currentNodeSend = 0;
			var selfAvailableArmySize = 0
			var total = 0;
			visitedList.push(currentNode);
			if(requirement.amount <= 0){
				return 0;
			}
			if(currentNode.getAvailableArmySize() > average){
				selfAvailableArmySize += currentNode.getAvailableArmySize() - average;
				if(requirement.amount < selfAvailableArmySize){
					var order = new Order();
					order.destination = ancestor;
					order.amount	  = requirement.amount;
					currentNodeSend	  = order.amount;
					currentNode.addOrder(order);
					requirement.amount = 0;
		/*			//console.log("[1] from  :" + currentNode.id);
					//console.log("[1] to    :" + order.destination.id);
					//console.log("[1] amount:" + order.amount);
		*/		}else{
					requirement.amount -= selfAvailableArmySize;	
					var order = new Order();
					order.destination = ancestor;
					order.amount	  = selfAvailableArmySize;
					currentNodeSend	  = order.amount;
					currentNode.addOrder(order);
		/*			//console.log("[2] from  :" + currentNode.id);
					//console.log("[2] to    :" + order.destination.id);
					//console.log("[2] amount:" + order.amount);
		*/		}
			}
			
			if(currentDepth >= maxDepth){
				return currentNodeSend;
			}
			if(requirement.amount >0){
				for(var i=0; i < currentNode.neighbours.length; i++){
					var node = gameGraph[currentNode.neighbours[i]];
					if(node.owner == aiOwner){
						armySize += depthFirstSearch(currentNode,node, visitedList,average, requirement, currentDepth +1, maxDepth);
					}
				}
			}
			if(armySize > 0){
				var order = new Order();
				order.destination = ancestor;
				order.amount	  = armySize;
				currentNode.addOrder(order);
		/*		//console.log("[3] from  :" + currentNode.id);
				//console.log("[3] to    :" + order.destination.id);
				//console.log("[3] amount:" + order.amount);
		*/	}else{
				armySize = 0;
			}
			return armySize+currentNodeSend;
		}

		var getTotalArmyOfEnemy = function(){
			var armySize = 0;
			for(var i = 0; i < enemyTowerList.length;i++){
				armySize +=enemyTowerList[i].armySize;
			}
			return armySize;
		}

		var getTotalArmyOfCamp = function(camp){
			var armySize = 0;
			for(var i in graph){
				if(graph[i].owner == camp){
					armySize += graph[i].armySize;
				}
			}
			return armySize;
		}

		var getTotalArmyOfCamps = function(destinations){
			var armySize = 0;
			var checkList = [];
			for(var key in destinations){
				if(checkList[destinations[key].attacker]==undefined){
					armySize += getTotalArmyOfCamp(destinations[key].attacker);
					checkList[destinations[key].attacker] = 1;
				}
			}
			return armySize;
		}
		var weight = function(tower){
			var score = 0;
			if(tower.owner != NEUTRAL){
				return {tower:tower,score:tower.armySize};
			}else{
				if(tower.type == "Base"){
					return {tower:tower,score:tower.armySize};
				}else{
					var queue = [{tower:tower, cost:tower.armySize}];
					var visitedList = [];
					var cost = 100000;
					for(var i=0;i<queue.length;){
						var item = queue.splice(0,1)[0];
						var neighbours = item.tower.neighbours;
						if(item.cost == undefined){
							//console.log("weight cost undefine");
							//console.log(item);
						}
						for(var k =0; k< neighbours.length;k++){
							var neighbour = gameGraph[neighbours[k]];
							
							if(visitedList.indexOf(neighbour) == -1 && 
							   enemyTowerList.indexOf(neighbour) == -1){
								if(neighbour.type=="Base"){
									if(item.cost + neighbour.armySize < cost){
										cost = item.cost + neighbour.armySize;
									}
								}else{
									visitedList.push(neighbour);
									queue.push({tower:neighbour, cost:item.cost+neighbour.armySize});
								}
							}
						}
					}
					return {tower:tower,score:cost};
				}
			}
		}
	}

}(window));
