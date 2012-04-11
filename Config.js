var NEUTRAL	= 0; //gray 
var PLAYER	= 1; //green
var OCTOPUS	= 2; //red
var CUTTLEFISH	= 3; //purple
var GLOBEFISH	= 4; //boss
var CONFIG={
	LevelArmys:[
		[
			{ //level 1
				id:1, 
				type:"Base", 	//Base , Transfer 
				owner:NEUTRAL,//OCTOPUS, //enemy , player ,intermediate
				armySize:23,
				status:"normal", // attacked or normal
				neighbours:[4,8],
				coordinate:{
					x:745,
					y:239
				},
			},
			{
				id:2, 

				type:"Base", 
				owner:NEUTRAL, 
				armySize:31, 
				status:"normal", // 
				neighbours:[3,4,5],
				coordinate:{
					x:264,
					y:64,
				}
			},
			{
				id:3,
				type:"Base",
				owner:PLAYER,
				armySize:31,
				status:"normal",
				neighbours:[2,7],
				coordinate:{
					x:150,
					y:200
				}

			},
			{
				id:4,
				type:"Base",
				owner:NEUTRAL,
				armySize:1, //14
				status:"normal",
				neighbours:[1,2,6],
				coordinate:{
					x:619,
					y:131
				}

			},
			{
				id:5,
				type:"Base",
				owner:NEUTRAL,
				armySize:1,
				status:"normal",
				neighbours:[2,7],
				coordinate:{
					x:336,
					y:205
				}

			},
			{
				id:6,
				type:"Base",
				owner:NEUTRAL,
				armySize:1,
				status:"normal",
				neighbours:[4,8],
				coordinate:{
					x:541,
					y:253
				}

			},
			{
				id:7,
				type:"Base",
				owner:OCTOPUS,
				armySize:14,//14
				status:"normal",
				neighbours:[3,5,8],
				coordinate:{
					x:256,
					y:440
				}

			},
			{
				id:8,
				type:"Base",
				owner:NEUTRAL,
				armySize:14,
				status:"normal",
				neighbours:[1,6,7],
				coordinate:{
					x:686,
					y:349
				}

			}

		],
		[// level 2
			{
				id:1,
				type:"Base",
				owner:PLAYER,
				armySize:14,
				status:"normal",
				neighbours:[1,2,4],
				coordinate:{
					x:235,
					y:93
				}

			},
			{
				id:2,
				type:"Base",
				owner:PLAYER,
				armySize:14,
				status:"normal",
				neighbours:[1,3],
				coordinate:{
					x:119,
					y:214
				}

			},
			{
				id:3,
				type:"Base",
				owner:NEUTRAL,
				armySize:5,
				status:"normal",
				neighbours:[2,4,5],
				coordinate:{
					x:252,
					y:393
				}

			},
			{
				id:4,
				type:"Transfer", //Transfer
				owner:NEUTRAL,
				armySize:5,
				status:"normal",
				neighbours:[1,3,7],
				coordinate:{
					x:345,
					y:212
				}

			},
			{
				id:5,
				type:"Transfer", //Transfer
				owner:NEUTRAL,
				armySize:5,
				status:"normal",
				neighbours:[3,6],
				coordinate:{
					x:443,
					y:393
				}

			},
			{
				id:6,
				type:"Base",
				owner:OCTOPUS,//OCTOPUS,
				armySize:5,
				status:"normal",
				neighbours:[5,7,8],
				coordinate:{
					x:622,
					y:393
				}

			},
			{
				id:7,
				type:"Transfer", //Transfer
				owner:NEUTRAL,
				armySize:5,
				status:"normal",
				neighbours:[4,6,9],
				coordinate:{
					x:523,
					y:212
				}

			},
			{
				id:8,
				type:"Base",
				owner:OCTOPUS,
				armySize:14,
				status:"normal",
				neighbours:[6,9],
				coordinate:{
					x:746,
					y:210
				}

			},
			{
				id:9,
				type:"Base",
				owner:NEUTRAL,
				armySize:5,
				status:"normal",
				neighbours:[7,8],
				coordinate:{
					x:635,
					y:93
				}

			}
		],
		[// level 3
			{
				id:1,
				type:"Transfer",
				owner:NEUTRAL,
				armySize:12,
				status:"normal",
				neighbours:[2,8],
				coordinate:{
					x:441,
					y:42
				}
			},
			{
				id:2,
				type:"Base",
				owner:PLAYER,
				armySize:20,
				status:"normal",
				neighbours:[1,3,9],
				coordinate:{
					x:275,
					y:65
				}

			},
			{
				id:3,
				type:"Base",
				owner:PLAYER,
				armySize:24,
				status:"normal",
				neighbours:[2,4,9],
				coordinate:{
					x:141,
					y:235
				}

			},
			{
				id:4,
				type:"Base",
				owner:NEUTRAL,
				armySize:19,
				status:"normal",
				neighbours:[3,5,9],
				coordinate:{
					x:242,
					y:422
				}

			},
			{
				id:5,
				type:"Transfer",
				owner:NEUTRAL,
				armySize:14,
				status:"normal",
				neighbours:[4,6],
				coordinate:{
					x:441,
					y:422
				}

			},
			{
				id:6,
				type:"Base",
				owner:NEUTRAL,
				armySize:14,
				status:"normal",
				neighbours:[5,7,9],
				coordinate:{
					x:617,
					y:422
				}

			},
			{
				id:7,
				type:"Base",
				owner:CUTTLEFISH,
				armySize:33,
				status:"normal",
				neighbours:[6,8,9],
				coordinate:{
					x:733,
					y:235
				}

			},
			{
				id:8,
				type:"Base",
				owner:NEUTRAL,
				armySize:15,
				status:"normal",
				neighbours:[1,9,7],
				coordinate:{
					x:584,
					y:83
				}

			},
			{
				id:9,
				type:"Transfer",
				owner:NEUTRAL,
				armySize:14,
				status:"normal",
				neighbours:[2,8,3,4,6,7],
				coordinate:{
					x:426,
					y:235
				}

			},
		],
		[//level 4
			{
				id:1,
				type:"Base",
				owner:NEUTRAL,
				armySize:12,
				status:"normal",
				neighbours:[2,3,4],
				coordinate:{
					x:141,
					y:77
				}
			},
			{
				id:2,
				type:"Transfer",
				owner:NEUTRAL,
				armySize:12,
				status:"normal",
				neighbours:[1,4,16],
				coordinate:{
					x:141,
					y:200
				}
			},
			{
				id:3,
				type:"Base",
				owner:PLAYER,
				armySize:23,
				status:"normal",
				neighbours:[1,4,5],
				coordinate:{
					x:308,
					y:77
				}
			},
			{
				id:4,
				type:"Base",
				owner:NEUTRAL,
				armySize:12,
				status:"normal",
				neighbours:[2,1,3],
				coordinate:{
					x:308,
					y:200
				}
			},
			{
				id:5,
				type:"Base",
				owner:PLAYER,
				armySize:23,
				status:"normal",
				neighbours:[3,6,7],
				coordinate:{
					x:552,
					y:77
				}
			},
			{
				id:6,
				type:"Base",
				owner:NEUTRAL,
				armySize:12,
				status:"normal",
				neighbours:[5,7,8],
				coordinate:{
					x:552,
					y:200
				}
			},
			{
				id:7,
				type:"Base",
				owner:NEUTRAL,
				armySize:12,
				status:"normal",
				neighbours:[5,6,8],
				coordinate:{
					x:713,
					y:77
				}
			},
			{
				id:8,
				type:"Transfer",
				owner:NEUTRAL,
				armySize:12,
				status:"normal",
				neighbours:[6,7,9],
				coordinate:{
					x:713,
					y:200
				}
			},
			{
				id:9,
				type:"Transfer",
				owner:NEUTRAL,
				armySize:12,
				status:"normal",
				neighbours:[8,12,11,10],
				coordinate:{
					x:713,
					y:280
				}
			},
			{
				id:10,
				type:"Base",
				owner:NEUTRAL,
				armySize:12,
				status:"normal",
				neighbours:[9,11],
				coordinate:{
					x:713,
					y:398
				}
			},
			{
				id:11,
				type:"Base",
				owner:OCTOPUS,
				armySize:23,
				status:"normal",
				neighbours:[12,10,9,13],
				coordinate:{
					x:552,
					y:398
				}
			},
			{
				id:12,
				type:"Base",
				owner:NEUTRAL,
				armySize:12,
				status:"normal",
				neighbours:[11,9],
				coordinate:{
					x:552,
					y:280
				}
			},
			{
				id:13,
				type:"Base",
				owner:OCTOPUS,
				armySize:20,
				status:"normal",
				neighbours:[11,14,15,16],
				coordinate:{
					x:308,
					y:398
				}
			},
			{
				id:14,
				type:"Base",
				owner:NEUTRAL,
				armySize:14,
				status:"normal",
				neighbours:[16,13],
				coordinate:{
					x:308,
					y:280
				}
			},
			{
				id:15,
				type:"Base",
				owner:NEUTRAL,
				armySize:14,
				status:"normal",
				neighbours:[16,13],
				coordinate:{
					x:141,
					y:398
				}
			},
			{
				id:16,
				type:"Transfer",
				owner:NEUTRAL,
				armySize:13,
				status:"normal",
				neighbours:[2,14,15,13],
				coordinate:{
					x:141,
					y:280
				}
			}
		],
		[//level 5
			{
				id:1,
				type:"Base",
				owner:NEUTRAL,
				armySize:10,
				status:"normal",
				neighbours:[2,6,9],
				coordinate:{
					x:162,
					y:89
				}
			},
			{
				id:2,
				type:"Base",
				owner:NEUTRAL,
				armySize:10,
				status:"normal",
				neighbours:[1,5],
				coordinate:{
					x:334,
					y:79
				}

			},
			{
				id:3,
				type:"Base",
				owner:NEUTRAL,
				armySize:10,
				status:"normal",
				neighbours:[5,4],
				coordinate:{
					x:514,
					y:86
				}

			},
			{
				id:4,
				type:"Base",
				owner:NEUTRAL,
				armySize:13,
				status:"normal",
				neighbours:[3,7,12],
				coordinate:{
					x:670,
					y:85
				}

			},
			{
				id:5,
				type:"Transfer",
				owner:NEUTRAL,
				armySize:12,
				status:"normal",
				neighbours:[2,3],
				coordinate:{
					x:427,
					y:165
				}

			},
			{
				id:6,
				type:"Base",
				owner:PLAYER,
				armySize:33,
				status:"normal",
				neighbours:[1,9],
				coordinate:{
					x:331,
					y:235
				}

			},
			{
				id:7,
				type:"Base",
				owner:OCTOPUS,
				armySize:33,
				status:"normal",
				neighbours:[4,12],
				coordinate:{
					x:562,
					y:235
				}

			},
			{
				id:8,
				type:"Transfer",
				owner:NEUTRAL,
				armySize:12,
				status:"normal",
				neighbours:[10,11],
				coordinate:{
					x:423,
					y:317
				}

			},
			{
				id:9,
				type:"Base",
				owner:NEUTRAL,
				armySize:10,
				status:"normal",
				neighbours:[1,10],
				coordinate:{
					x:174,
					y:388
				}

			},
			{
				id:10,
				type:"Base",
				owner:NEUTRAL,
				armySize:13,
				status:"normal",
				neighbours:[8,9],
				coordinate:{
					x:331,
					y:393
				}

			},
			{
				id:11,
				type:"Base",
				owner:NEUTRAL,
				armySize:12,
				status:"normal",
				neighbours:[8,12],
				coordinate:{
					x:527,
					y:391
				}

			},
			{
				id:12,
				type:"Base",
				owner:NEUTRAL,
				armySize:13,
				status:"normal",
				neighbours:[4,7,11],
				coordinate:{
					x:688,
					y:375
				}

			}
		],
		[//level 6
			{
				id:1,
				type:"Base",
				owner:PLAYER,
				armySize:33,
				status:"normal",
				neighbours:[2,3,4,5],
				coordinate:{
					x:436,
					y:60
				}
			},
			{
				id:2,
				type:"Base",
				owner:NEUTRAL,
				armySize:11,
				status:"normal",
				neighbours:[1,6],
				coordinate:{
					x:229,
					y:105
				}

			},
			{
				id:3,
				type:"Base",
				owner:NEUTRAL,
				armySize:13,
				status:"normal",
				neighbours:[1,8],
				coordinate:{
					x:646,
					y:106
				}

			},
			{
				id:4,
				type:"Transfer",
				owner:NEUTRAL,
				armySize:11,
				status:"normal",
				neighbours:[1,5,6],
				coordinate:{
					x:320,
					y:169
				}

			},
			{
				id:5,
				type:"Transfer",
				owner:NEUTRAL,
				armySize:12,
				status:"normal",
				neighbours:[1,4,8],
				coordinate:{
					x:549,
					y:169
				}

			},
			{
				id:6,
				type:"Base",
				owner:NEUTRAL,
				armySize:11,
				status:"normal",
				neighbours:[2,4,7,9],
				coordinate:{
					x:194,
					y:267
				}

			},
			{
				id:7,
				type:"Transfer",
				owner:NEUTRAL,
				armySize:13,
				status:"normal",
				neighbours:[6,8,9,10],
				coordinate:{
					x:436,
					y:267
				}

			},
			{
				id:8,
				type:"Base",
				owner:NEUTRAL,
				armySize:12,
				status:"normal",
				neighbours:[3,5,7,10],
				coordinate:{
					x:683,
					y:267
				}

			},
			{
				id:9,
				type:"Base",
				owner:OCTOPUS,
				armySize:22,
				status:"normal",
				neighbours:[6,7],
				coordinate:{
					x:312,
					y:424
				}

			},
			{
				id:10,
				type:"Base",
				owner:OCTOPUS,
				armySize:21,
				status:"normal",
				neighbours:[7,8],
				coordinate:{
					x:572,
					y:422
				}
			}
		],
		[//level 7
			{
				id:1,
				type:"Base",
				owner:PLAYER,
				armySize:35,
				status:"normal",
				neighbours:[2,4],
				coordinate:{
					x:432,
					y:36
				}
			},
			{
				id:2,
				type:"Base",
				owner:NEUTRAL,
				armySize:14,
				status:"normal",
				neighbours:[1,5,7],
				coordinate:{
					x:180,
					y:213
				}

			},
			{
				id:3,
				type:"Base",
				owner:OCTOPUS,
				armySize:20,
				status:"normal",
				neighbours:[5,6],
				coordinate:{
					x:442,
					y:180
				}

			},
			{
				id:4,
				type:"Base",
				owner:NEUTRAL,
				armySize:12,
				status:"normal",
				neighbours:[1,6,9],
				coordinate:{
					x:702,
					y:213
				}

			},
			{
				id:5,
				type:"Transfer",
				owner:NEUTRAL,
				armySize:18,
				status:"normal",
				neighbours:[2,3,7,8],
				coordinate:{
					x:348,
					y:297
				}

			},
			{
				id:6,
				type:"Transfer",
				owner:NEUTRAL,
				armySize:15,
				status:"normal",
				neighbours:[3,4,8,9],
				coordinate:{
					x:536,
					y:297
				}

			},
			{
				id:7,
				type:"Base",
				owner:NEUTRAL,
				armySize:12,
				status:"normal",
				neighbours:[2,5],
				coordinate:{
					x:258,
					y:424
				}

			},
			{
				id:8,
				type:"Base",
				owner:OCTOPUS,
				armySize:22,
				status:"normal",
				neighbours:[5,6],
				coordinate:{
					x:452,
					y:424
				}

			},
			{
				id:9,
				type:"Base",
				owner:NEUTRAL,
				armySize:14,
				status:"normal",
				neighbours:[4,6],
				coordinate:{
					x:635,
					y:424
				}

			}
		],
		[//level 8
			{
				id:1,
				type:"Base",
				owner:NEUTRAL,
				armySize:12,
				status:"normal",
				neighbours:[2,3,5],
				coordinate:{
					x:282,
					y:70
				}
			},
			{
				id:2,
				type:"Base",
				owner:NEUTRAL,
				armySize:13,
				status:"normal",
				neighbours:[1,4,6],
				coordinate:{
					x:593,
					y:70
				}

			},
			{
				id:3,
				type:"Base",
				owner:PLAYER,
				armySize:33,
				status:"normal",
				neighbours:[5,1],
				coordinate:{
					x:180,
					y:156
				}

			},
			{
				id:4,
				type:"Base",
				owner:OCTOPUS,
				armySize:34,
				status:"normal",
				neighbours:[2,6],
				coordinate:{
					x:686,
					y:156
				}

			},
			{
				id:5,
				type:"Transfer",
				owner:NEUTRAL,
				armySize:11,
				status:"normal",
				neighbours:[1,3,7,6],
				coordinate:{
					x:308,
					y:186
				}

			},
			{
				id:6,
				type:"Transfer",
				owner:NEUTRAL,
				armySize:10,
				status:"normal",
				neighbours:[2,4,8,5],
				coordinate:{
					x:564,
					y:186
				}

			},
			{
				id:7,
				type:"Transfer",
				owner:NEUTRAL,
				armySize:13,
				status:"normal",
				neighbours:[5,8,9,11],
				coordinate:{
					x:315,
					y:278
				}

			},
			{
				id:8,
				type:"Transfer",
				owner:NEUTRAL,
				armySize:11,
				status:"normal",
				neighbours:[6,12,7,10],
				coordinate:{
					x:560,
					y:278
				}

			},
			{
				id:9,
				type:"Base",
				owner:PLAYER,
				armySize:33,
				status:"normal",
				neighbours:[7,11],
				coordinate:{
					x:150,
					y:345
				}

			},
			{
				id:10,
				type:"Base",
				owner:OCTOPUS,
				armySize:32,
				status:"normal",
				neighbours:[8,12],
				coordinate:{
					x:735,
					y:340
				}

			},
			{
				id:11,
				type:"Base",
				owner:NEUTRAL,
				armySize:13,
				status:"normal",
				neighbours:[7,9,12],
				coordinate:{
					x:309,
					y:414
				}

			},
			{
				id:12,
				type:"Base",
				owner:NEUTRAL,
				armySize:11,
				status:"normal",
				neighbours:[8,10,11],
				coordinate:{
					x:574,
					y:414
				}

			}
		],
		[//level 9
			{
				id:1,
				type:"Base",
				owner:NEUTRAL,
				armySize:13,
				status:"normal",
				neighbours:[2,3,4],
				coordinate:{
					x:277,
					y:66
				}
			},
			{
				id: 2,
				type: "Base",
				owner: NEUTRAL,
				armySize: 14,
				status: "normal",
				neighbours: [1,4,5],
				coordinate: {
					x: 584,
					y: 66
				}
			},
			{
				id: 3,
				type: "Transfer",
				owner: NEUTRAL,
				armySize: 10,
				status: "normal",
				neighbours: [1,6,8],
				coordinate: {
					x: 171,
					y: 143
				}
			},
			{
				id: 4,
				type: "Base",
				owner: OCTOPUS,
				armySize: 22,
				status: "normal",
				neighbours: [1,2],
				coordinate: {
					x: 435,
					y: 159
				}
			},
			{
				id: 5,
				type: "Transfer",
				owner: NEUTRAL,
				armySize: 10,
				status: "normal",
				neighbours: [2,7,10],
				coordinate: {
					x: 690,
					y: 143
				}
			},
			{
				id: 6,
				type: "Base",
				owner: PLAYER,
				armySize: 33,
				status: "normal",
				neighbours: [3,7,8],
				coordinate: {
					x: 327,
					y: 223
				}
			},
			{
				id: 7,
				type: "Base",
				owner: PLAYER,
				armySize: 33,
				status: "normal",
				neighbours: [5,6,10],
				coordinate: {
					x: 533,
					y: 219
				}
			},
			{
				id: 8,
				type: "Transfer",
				owner: NEUTRAL,
				armySize: 3,
				status: "normal",
				neighbours: [3,6,11],
				coordinate: {
					x: 159,
					y: 320
				}
			},
			{
				id: 9,
				type: "Base",
				owner: CUTTLEFISH,
				armySize: 20,
				status: "normal",
				neighbours: [11,12],
				coordinate: {
					x: 423,
					y: 293
				}
			},
			{
				id: 10,
				type: "Transfer",
				owner: NEUTRAL,
				armySize: 10,
				status: "normal",
				neighbours: [5,7,12],
				coordinate: {
					x: 698,
					y: 320
				}
			},
			{
				id: 11,
				type: "Base",
				owner: OCTOPUS,
				armySize: 12,
				status: "normal",
				neighbours: [8,9,12],
				coordinate: {
					x: 256,
					y: 402
				}
			},
			{
				id: 12,
				type: "Base",
				owner: OCTOPUS,
				armySize: 11,
				status: "normal",
				neighbours: [9,10,11],
				coordinate: {
					x: 614,
					y: 402
				}
			}
		],
		[//level 10
			{
				id:1,
				type:"Base",
				owner:OCTOPUS,
				armySize:32,
				status:"normal",
				neighbours:[3,4],
				coordinate:{
					x:330,
					y:59
				}
			},
			{
				id: 2,
				type: "Base",
				owner: CUTTLEFISH,
				armySize: 32,
				status: "normal",
				neighbours: [3,7],
				coordinate: {
					x: 539,
					y: 59
				}
			},
			{
				id: 3,
				type: "Base",
				owner: NEUTRAL,
				armySize: 12,
				status: "normal",
				neighbours: [1,2,5,6],
				coordinate: {
					x: 428,
					y: 147
				}
			},
			{
				id: 4,
				type: "Base",
				owner: NEUTRAL,
				armySize: 13,
				status: "normal",
				neighbours: [1,5],
				coordinate: {
					x: 185,
					y: 217
				}
			},
			{
				id: 5,
				type: "Base",
				owner: NEUTRAL,
				armySize: 14,
				status: "normal",
				neighbours: [3,4,6,8],
				coordinate: {
					x: 340,
					y: 253
				}
			},
			{
				id: 6,
				type: "Base",
				owner: NEUTRAL,
				armySize: 14,
				status: "normal",
				neighbours: [3,5,7,9],
				coordinate: {
					x: 520,
					y: 253
				}
			},
			{
				id: 7,
				type: "Base",
				owner: NEUTRAL,
				armySize: 14,
				status: "normal",
				neighbours: [2,6],
				coordinate: {
					x: 697,
					y: 217
				}
			},

			{
				id: 8,
				type: "Base",
				owner: PLAYER,
				armySize: 34,
				status: "normal",
				neighbours: [5,9],
				coordinate: {
					x: 247,
					y: 399
				}
			},

			{
				id: 9,
				type: "Base",
				owner: PLAYER,
				armySize: 19,
				status: "normal",
				neighbours: [6,8],
				coordinate: {
					x: 622,
					y: 399
				}
			}
		],
		[//level 11
			{
				id:1,
				type:"Base",
				owner:PLAYER,
				armySize:34,
				status:"normal",
				neighbours:[2,4],
				coordinate:{
					x:218,
					y:72
				}
			},

			{
				id: 2,
				type: "Transfer",
				owner: NEUTRAL,
				armySize: 13,
				status: "normal",
				neighbours: [1,3],
				coordinate: {
					x: 444,
					y: 72
				}
			},

			{
				id: 3,
				type: "Base",
				owner: CUTTLEFISH,
				armySize: 34,
				status: "normal",
				neighbours: [2,6,7],
				coordinate: {
					x: 669,
					y: 72
				}
			},

			{
				id: 4,
				type: "Base",
				owner: NEUTRAL,
				armySize: 15,
				status: "normal",
				neighbours: [1,8],
				coordinate: {
					x: 226,
					y: 256
				}
			},

			{
				id: 5,
				type: "Transfer",
				owner: NEUTRAL,
				armySize: 11,
				status: "normal",
				neighbours: [1,6,8],
				coordinate: {
					x: 374,
					y: 277
				}
			},

			{
				id: 6,
				type: "Transfer",
				owner: NEUTRAL,
				armySize: 11,
				status: "normal",
				neighbours: [3,5,9],
				coordinate: {
					x: 516,
					y: 277
				}
			},

			{
				id: 7,
				type: "Base",
				owner: NEUTRAL,
				armySize: 14,
				status: "normal",
				neighbours: [3,9],
				coordinate: {
					x: 667,
					y: 256
				}
			},

			{
				id: 8,
				type: "Base",
				owner: NEUTRAL,
				armySize: 13,
				status: "normal",
				neighbours: [4,5,9],
				coordinate: {
					x: 373,
					y: 423
				}
			},

			{
				id: 9,
				type: "Base",
				owner: NEUTRAL,
				armySize: 14,
				status: "normal",
				neighbours: [6,7,8],
				coordinate: {
					x: 517,
					y: 423
				}
			}
		],
		[//level 12
			{
				id:1,
				type:"Base",
				owner:NEUTRAL,
				armySize:10,
				status:"normal",
				neighbours:[3,5],
				coordinate:{
					x:302,
					y:44
				}
			},

			{
				id: 2,
				type: "Base",
				owner: NEUTRAL,
				armySize: 14,
				status: "normal",
				neighbours: [4,8],
				coordinate: {
					x: 575,
					y: 44
				}
			},

			{
				id: 3,
				type: "Transfer",
				owner: NEUTRAL,
				armySize: 14,
				status: "normal",
				neighbours: [1,4,6],
				coordinate: {
					x: 385,
					y: 124
				}
			},

			{
				id: 4,
				type: "Transfer",
				owner: NEUTRAL,
				armySize: 13,
				status: "normal",
				neighbours: [2,3,7],
				coordinate: {
					x: 497,
					y: 125
				}
			},

			{
				id: 5,
				type: "Base",
				owner: PLAYER,
				armySize: 32,
				status: "normal",
				neighbours: [1,6,11],
				coordinate: {
					x: 132,
					y: 246
				}
			},

			{
				id: 6,
				type: "Transfer",
				owner: NEUTRAL,
				armySize: 11,
				status: "normal",
				neighbours: [3,5,9],
				coordinate: {
					x: 318,
					y: 240
				}
			},

			{
				id: 7,
				type: "Transfer",
				owner: NEUTRAL,
				armySize: 14,
				status: "normal",
				neighbours: [4,8,10],
				coordinate: {
					x: 550,
					y: 240
				}
			},

			{
				id: 8,
				type: "Base",
				owner: CUTTLEFISH,
				armySize: 32,
				status: "normal",
				neighbours: [2,7,11],
				coordinate: {
					x: 723,
					y: 249
				}
			},

			{
				id: 9,
				type: "Transfer",
				owner: NEUTRAL,
				armySize: 13,
				status: "normal",
				neighbours: [6,10,11],
				coordinate: {
					x: 364,
					y: 314
				}
			},
			{
				id: 10,
				type: "Transfer",
				owner: NEUTRAL,
				armySize: 12,
				status: "normal",
				neighbours: [7,9,12],
				coordinate: {
					x: 497,
					y: 314
				}
			},
			{
				id: 11,
				type: "Base",
				owner: NEUTRAL,
				armySize: 14,
				status: "normal",
				neighbours: [5,9],
				coordinate: {
					x: 262,
					y: 422
				}
			},
			{
				id: 12,
				type: "Base",
				owner: NEUTRAL,
				armySize: 13,
				status: "normal",
				neighbours: [8,110],
				coordinate: {
					x: 609,
					y: 422
				}
			}
		],	
		[//level 13
			{
				id:1,
				type:"Base",
				owner:NEUTRAL,
				armySize:7,
				status:"normal",
				neighbours:[2,7,8],
				coordinate:{
					x:145,
					y:83
				}
			},

			{
				id: 2,
				type: "Transfer",
				owner: NEUTRAL,
				armySize: 9,
				status: "normal",
				neighbours: [1,3,5],
				coordinate: {
					x: 354,
					y: 83
				}
			},

			{
				id: 3,
				type: "Transfer",
				owner: NEUTRAL,
				armySize: 8,
				status: "normal",
				neighbours: [2,4,6],
				coordinate: {
					x: 495,
					y: 83
				}
			},

			{
				id: 4,
				type: "Base",
				owner: NEUTRAL,
				armySize: 8,
				status: "normal",
				neighbours: [3,9,10],
				coordinate: {
					x: 695,
					y: 83
				}
			},

			{
				id: 5,
				type: "Transfer",
				owner: NEUTRAL,
				armySize: 8,
				status: "normal",
				neighbours: [2,6,8],
				coordinate: {
					x: 360,
					y: 187
				}
			},

			{
				id: 6,
				type: "Transfer",
				owner: NEUTRAL,
				armySize: 9,
				status: "normal",
				neighbours: [3,5,9],
				coordinate: {
					x: 492,
					y: 187
				}
			},

			{
				id: 7,
				type: "Base",
				owner: NEUTRAL,
				armySize: 10,
				status: "normal",
				neighbours: [1,13],
				coordinate: {
					x: 156,
					y: 260
				}
			},

			{
				id: 8,
				type: "Base",
				owner: GLOBEFISH,
				armySize: 24,
				status: "normal",
				neighbours: [1,5,11,13],
				coordinate: {
					x: 287,
					y: 240
				}
			},

			{
				id: 9,
				type: "Base",
				owner: PLAYER,
				armySize: 35,
				status: "normal",
				neighbours: [4,6,12,16],
				coordinate: {
					x: 563,
					y: 240
				}
			},
			{
				id: 10,
				type: "Base",
				owner: NEUTRAL,
				armySize: 6,
				status: "normal",
				neighbours: [4,16],
				coordinate: {
					x: 668,
					y: 260
				}
			},
			{
				id: 11,
				type: "Transfer",
				owner: NEUTRAL,
				armySize: 9,
				status: "normal",
				neighbours: [8,12,14],
				coordinate: {
					x: 373,
					y: 311
				}
			},
			{
				id: 12,
				type: "Transfer",
				owner: NEUTRAL,
				armySize: 7,
				status: "normal",
				neighbours: [9,11,15],
				coordinate: {
					x: 474,
					y: 311
				}
			},

			{
				id: 13,
				type: "Base",
				owner: NEUTRAL,
				armySize: 7,
				status: "normal",
				neighbours: [7,8,14],
				coordinate: {
					x: 198,
					y: 410
				}
			},

			{
				id: 14,
				type: "Transfer",
				owner: NEUTRAL,
				armySize: 6,
				status: "normal",
				neighbours: [11,13,15],
				coordinate: {
					x: 372,
					y: 410
				}
			},

			{
				id: 15,
				type: "Transfer",
				owner: NEUTRAL,
				armySize: 8,
				status: "normal",
				neighbours: [12,14,16],
				coordinate: {
					x: 480,
					y: 410
				}
			},

			{
				id: 16,
				type: "Base",
				owner: NEUTRAL,
				armySize: 8,
				status: "normal",
				neighbours: [9,10,15],
				coordinate: {
					x: 655,
					y: 410
				}
			}
		],	
		[//level 14
			{
				id:1,
				type:"Base",
				owner:NEUTRAL,
				armySize:12,
				status:"normal",
				neighbours:[6,7,4],
				coordinate:{
					x:126,
					y:65
				}
			},

			{
				id: 2,
				type: "Base",
				owner: NEUTRAL,
				armySize: 8,
				status: "normal",
				neighbours: [4,5,8],
				coordinate: {
					x: 439,
					y: 102
				}
			},

			{
				id: 3,
				type: "Base",
				owner: NEUTRAL,
				armySize: 11,
				status: "normal",
				neighbours: [5,9,10],
				coordinate: {
					x: 735,
					y: 65
				}
			},

			{
				id: 4,
				type: "Transfer",
				owner: NEUTRAL,
				armySize: 7,
				status: "normal",
				neighbours: [1,2,7,8],
				coordinate: {
					x: 317,
					y: 147
				}
			},

			{
				id: 5,
				type: "Transfer",
				owner: NEUTRAL,
				armySize: 10,
				status: "normal",
				neighbours: [2,3,8,9],
				coordinate: {
					x: 552,
					y: 148
				}
			},

			{
				id: 6,
				type: "Base",
				owner: PLAYER,//N
				armySize: 27,
				status: "normal",
				neighbours: [1,14],
				coordinate: {
					x: 36,
					y: 262
				}
			},

			{
				id: 7,
				type: "Base",
				owner: GLOBEFISH,
				armySize: 24,
				status: "normal",
				neighbours: [1,14,11,4],
				coordinate: {
					x: 180,
					y: 252
				}
			},

			{
				id: 8,
				type: "Transfer",
				owner: NEUTRAL,
				armySize: 9,
				status: "normal",
				neighbours: [2,4,5,11,12,13],
				coordinate: {
					x: 436,
					y: 252
				}
			},

			{
				id: 9,
				type: "Base",
				owner: PLAYER,
				armySize: 27,
				status: "normal",
				neighbours: [3,5,12,15],
				coordinate: {
					x: 677,
					y: 252
				}
			},
			{
				id: 10,
				type: "Base",
				owner: NEUTRAL,
				armySize: 10,
				status: "normal",
				neighbours: [3,15],
				coordinate: {
					x: 808,
					y: 262
				}
			},
			{
				id: 11,
				type: "Transfer",
				owner: NEUTRAL,
				armySize: 8,
				status: "normal",
				neighbours: [7,8,13,14],
				coordinate: {
					x: 332,
					y: 317
				}
			},
			{
				id: 12,
				type: "Transfer",
				owner: NEUTRAL,
				armySize: 10,
				status: "normal",
				neighbours: [8,9,13,15],
				coordinate: {
					x: 526,
					y: 317
				}
			},

			{
				id: 13,
				type: "Base",
				owner: NEUTRAL,
				armySize: 14,
				status: "normal",
				neighbours: [8,11,12],
				coordinate: {
					x: 441,
					y: 372
				}
			},

			{
				id: 14,
				type: "Base",
				owner: NEUTRAL,
				armySize: 8,
				status: "normal",
				neighbours: [6,7,11],
				coordinate: {
					x: 213,
					y: 413
				}
			},

			{
				id: 15,
				type: "Base",
				owner: NEUTRAL,
				armySize: 10,
				status: "normal",
				neighbours: [9,10,12],
				coordinate: {
					x: 639,
					y: 413
				}
			},
			{
				id:16,
				type:"boss",
				owner:GLOBEFISH,
				armySize:50,//1000
				status:"normal",
				neighbours:[1,14],
				coordinate:{
					x: 180,
					y: 252
				}
			}
		]
	],//level configration
	Radius:{
		0:40,
		1:32,
		2:35,
		3:35,
		4:35	
	},
	/*
	LevelResourse:{
		levelBg:{
			levelBgReLoder:["img/level1/bg.jpg"],
		//here store all background image for each level
		}
	},
	*/
	GlobalResourses:{
		urls:["img/enemy_normal.png","img/armscount.png","img/enemy_move.png",
		"img/player_normal.png","img/tower2_normal.png","img/tower0_normal.png",
		"img/team3_move.png","img/tower3_normal.png","img/tower3_attack.png",
		"img/tower1_normal.png","img/tower4_normal.png","img/team4_move.png",
		"img/Arms3_Attack.png","img/Arms4_Attack.png","img/armsAttack.png",
		"img/player_move.png","img/base.png","img/arms_attack.png",
		"img/arms_walk.png","img/bombCounter.png","img/bombInit.png",
		"img/bombUnInit.png","img/explode.png","img/leave.png",
		"img/SystemBut.png","img/TimeBG.png","img/Arms2_Attack.png", 
		"./pause-screen/BGSTexture_True.png","./pause-screen/BGSTexture_False.png",
		"./pause-screen/End_BG.png","./pause-screen/Help.png",
		"./pause-screen/out_Active.png","./pause-screen/out_Normal.png",
		"./pause-screen/restart_Active.png","./pause-screen/restart_Normal.png",
		"./pause-screen/resume_Active.png","./pause-screen/resume_Normal.png",
		"./pause-screen/stopBG.png","./Help/help1.png","./Help/help2.png",
		"./Help/help3.png","./Help/help4.png","./Help/help5.png","./Help/Ok_Normal.png",
		"./Help/Ok_Active.png","./quit/cancel_1.png","./quit/cancel_2.png", 
		"./quit/ok_1.png","./quit/ok_2.png","./quit/sureBG.png","./pause-screen/Win.png",
		"./pause-screen/newLost.png","./pause-screen/next_Normal.png",
		"./pause-screen/next_Active.png","./achievement/AllLevelClear_9.png",
		"./achievement/all_4.png","./achievement/camp_6.png","./achievement/failed_2.png",
		"./achievement/FailedAfter2M_2.png","./achievement/kill_1.png",
		"./achievement/kill_7.png","./achievement/KilledBoss_10.png",
		"./achievement/success_3.png","./achievement/success_8.png",
		"./achievement/tower_5.png","./achievement/NoAchievement.png",
		 "./LevelNumber/1.png", "./LevelNumber/2.png","./LevelNumber/3.png",
		 "./LevelNumber/4.png","./LevelNumber/5.png","./LevelNumber/6.png",
		 "./LevelNumber/7.png","./LevelNumber/8.png","./LevelNumber/9.png",
		 "./LevelNumber/10.png","./LevelNumber/11.png","./LevelNumber/12.png",
		 "./LevelNumber/13.png","./LevelNumber/14.png","./achievement/1.png",
		 "./achievement/2.png","./achievement/3.png","./achievement/4.png",
		 "./achievement/5.png","./achievement/6.png","./achievement/7.png",
		 "./achievement/8.png","./achievement/9.png","./achievement/10.png",
		  "img/level1.jpg", "img/level2.jpg", "img/level3.jpg","img/level4.jpg", 
		  "img/level5.jpg", "img/level6.jpg","img/level7.jpg", "img/level8.jpg", 
		  "img/level9.jpg","img/level10.jpg", "img/level11.jpg","img/level12.jpg",
		 "img/level13.jpg","./music/Start","./music/arms_Attack","./music/bomb","./music/normal_BG"]
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
		shootingSpeed:20
	},
	GlobalGame:{
		BoomMaximum:50,
		PlayerArmySizeIncreament:5,
		EnemyArmySizeIncreament:5,
		IntermediateArmySizeIncreament:5
	}
}
