(function(window){
	window.AICamp = AICamp;
	window.Camp = Camp;
	function AICamp(campOwner, graph){
		var owner = campOwner;
		var decisionMaker = new DecisionMaker(graph, owner);
		var towerList = new Array();
		this.makeDecision = function(){
			decisionMaker.MakeDecision(towerList);
		}
		this.addElement = function(tower){
			towerList.push(tower);
		}
		this.removeElement = function(tower){
			towerList.splice(towerList.indexOf(tower), 1);
		}
	}

	function Camp(campOwner, graph){
		var owner = campOwner;
		var towerList = new Array();
		this.makeDecision = function(){}
		this.addElement = function(tower){
			towerList.push(tower);
		}
		this.removeElement = function(tower){
			towerList.splice(towerList.indexOf(tower), 1);
		}
	}
})(window);
