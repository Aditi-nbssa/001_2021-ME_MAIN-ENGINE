(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"PerformanceChecks_atlas_1", frames: [[0,0,1264,857],[0,859,1264,857]]},
		{name:"PerformanceChecks_atlas_2", frames: [[0,0,1175,847],[0,849,1175,847]]},
		{name:"PerformanceChecks_atlas_3", frames: [[1095,223,467,93],[435,277,435,92],[0,368,411,92],[335,560,374,94],[1581,324,415,92],[1296,888,307,92],[920,913,205,136],[1127,913,162,136],[509,1095,181,92],[602,860,316,99],[1643,519,363,99],[1564,223,421,99],[1025,704,332,99],[1581,418,378,99],[1661,837,318,99],[633,180,460,95],[0,462,387,95],[0,271,433,95],[663,664,360,93],[413,371,403,93],[389,466,396,92],[569,961,204,132],[1835,620,159,215],[0,1107,178,92],[1785,101,241,92],[0,973,195,132],[663,759,330,99],[270,764,330,99],[357,0,502,99],[1605,938,275,99],[1041,603,353,99],[872,318,394,99],[509,1189,143,106],[818,419,373,99],[1417,0,487,99],[1896,938,152,106],[1417,101,366,120],[0,1201,135,106],[586,1297,99,106],[1193,450,235,59],[1359,780,300,106],[0,559,333,106],[180,1191,138,106],[137,1299,99,106],[0,792,232,59],[1496,1296,127,106],[0,865,287,106],[1832,1316,75,106],[1243,1065,192,106],[335,656,326,106],[320,1191,138,106],[1550,1039,171,120],[1365,1296,129,106],[995,805,299,106],[289,865,278,106],[1723,1039,171,120],[0,667,268,123],[0,144,344,124],[1961,418,76,81],[1437,1065,76,81],[692,1095,76,81],[1909,1316,76,81],[687,1321,76,81],[765,1321,76,81],[843,1321,76,81],[921,1321,76,81],[1906,0,104,81],[999,1321,76,81],[1077,1321,76,81],[1909,1399,76,81],[1041,520,104,81],[197,973,258,81],[1291,982,257,81],[687,1404,76,81],[765,1404,76,81],[775,961,104,81],[843,1404,76,81],[457,973,104,81],[921,1404,76,81],[999,1404,76,81],[1268,324,311,124],[1077,1404,76,81],[1346,1404,76,81],[1751,1316,79,106],[332,1299,81,106],[1180,1308,81,106],[1263,1308,81,106],[238,1299,92,106],[0,1309,81,106],[1193,519,448,82],[1625,1296,124,106],[460,1297,124,106],[775,1051,154,133],[931,1051,154,133],[1896,1046,120,133],[1437,1161,120,133],[1559,1161,120,133],[1681,1161,120,133],[1243,1173,120,133],[1803,1181,120,133],[1925,1181,120,133],[692,1186,120,133],[814,1186,120,133],[936,1186,120,133],[1058,1186,120,133],[1087,1051,154,133],[197,1056,154,133],[353,1056,154,133],[0,0,355,142],[787,520,252,142],[633,101,113,53],[748,101,60,60],[1396,603,216,161],[1614,620,219,158],[861,0,276,178],[1139,0,276,175],[357,101,274,168]]},
		{name:"PerformanceChecks_atlas_4", frames: [[1114,1388,456,132],[1387,1831,385,132],[1650,1250,396,134],[1650,1386,385,135],[1545,1523,385,134],[1205,1250,443,136],[1184,372,460,176],[1187,155,480,215],[996,1630,408,134],[1196,946,389,176],[0,815,1194,153],[0,970,1194,153],[0,660,1200,153],[1187,0,804,153],[996,1522,547,106],[1184,550,715,106],[520,1855,865,106],[0,1625,994,113],[0,1375,1112,113],[0,1740,960,113],[0,0,1185,163],[0,165,1185,163],[0,330,1182,163],[0,1260,1180,113],[1205,1124,542,124],[520,1963,791,81],[0,495,1182,163],[0,1855,518,189],[0,1490,903,133],[1202,658,491,142],[1202,802,491,142],[0,1125,1203,133],[1669,355,300,170],[1406,1659,300,170],[1669,155,304,198],[1695,658,304,196],[1695,856,276,198]]},
		{name:"PerformanceChecks_atlas_5", frames: [[0,216,1197,200],[0,1243,1198,163],[0,1408,1198,163],[0,1573,1198,163],[0,418,1214,163],[0,748,1212,163],[0,1078,1209,163],[0,583,1214,163],[0,913,1212,163],[0,0,1185,214],[0,1738,1193,163]]},
		{name:"PerformanceChecks_atlas_6", frames: [[0,1366,1194,246],[0,1118,1200,246],[0,0,1118,482],[0,1614,1209,214],[0,1830,1206,214],[0,484,1182,315],[0,801,1180,315]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_168 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_167 = function() {
	this.initialize(ss["PerformanceChecks_atlas_4"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_166 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_165 = function() {
	this.initialize(ss["PerformanceChecks_atlas_4"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_164 = function() {
	this.initialize(ss["PerformanceChecks_atlas_4"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_163 = function() {
	this.initialize(ss["PerformanceChecks_atlas_4"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_162 = function() {
	this.initialize(ss["PerformanceChecks_atlas_4"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_161 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_160 = function() {
	this.initialize(ss["PerformanceChecks_atlas_4"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_159 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_158 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_157 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_156 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_155 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_154 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_153 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_152 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_151 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_150 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_149 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_148 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_147 = function() {
	this.initialize(ss["PerformanceChecks_atlas_4"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_146 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_145 = function() {
	this.initialize(ss["PerformanceChecks_atlas_4"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_144 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_143 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_142 = function() {
	this.initialize(ss["PerformanceChecks_atlas_4"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_141 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_140 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_139 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_138 = function() {
	this.initialize(ss["PerformanceChecks_atlas_4"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_137 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_136 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_135 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_134 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_133 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_132 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_131 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_130 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_129 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_128 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(30);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_127 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(31);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_126 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(32);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_125 = function() {
	this.initialize(ss["PerformanceChecks_atlas_4"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_124 = function() {
	this.initialize(ss["PerformanceChecks_atlas_4"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_123 = function() {
	this.initialize(ss["PerformanceChecks_atlas_5"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_122 = function() {
	this.initialize(ss["PerformanceChecks_atlas_6"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_121 = function() {
	this.initialize(ss["PerformanceChecks_atlas_4"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_120 = function() {
	this.initialize(ss["PerformanceChecks_atlas_6"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_119 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(33);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_118 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(34);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_117 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(35);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_116 = function() {
	this.initialize(ss["PerformanceChecks_atlas_6"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_115 = function() {
	this.initialize(ss["PerformanceChecks_atlas_4"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_114 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(36);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_113 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(37);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_112 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(38);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_111 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(39);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_110 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(40);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_109 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(41);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_108 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(42);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_107 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(43);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_106 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(44);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_105 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(45);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_104 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(46);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_103 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(47);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_102 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(48);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_101 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(49);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_100 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(50);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_99 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(51);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_98 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(52);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_97 = function() {
	this.initialize(ss["PerformanceChecks_atlas_4"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_96 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(53);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_95 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(54);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_94 = function() {
	this.initialize(ss["PerformanceChecks_atlas_4"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_93 = function() {
	this.initialize(ss["PerformanceChecks_atlas_4"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_92 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(55);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_91 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(56);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_90 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(57);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_89 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(58);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_88 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(59);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_87 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(60);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_86 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(61);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_85 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(62);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_84 = function() {
	this.initialize(ss["PerformanceChecks_atlas_5"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_83 = function() {
	this.initialize(ss["PerformanceChecks_atlas_5"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_82 = function() {
	this.initialize(ss["PerformanceChecks_atlas_5"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_81 = function() {
	this.initialize(ss["PerformanceChecks_atlas_5"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_80 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(63);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_79 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(64);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_78 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(65);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_77 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(66);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_76 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(67);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_75 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(68);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_74 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(69);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_73 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(70);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_72 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(71);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_71 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(72);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_70 = function() {
	this.initialize(ss["PerformanceChecks_atlas_5"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_69 = function() {
	this.initialize(ss["PerformanceChecks_atlas_5"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_68 = function() {
	this.initialize(ss["PerformanceChecks_atlas_4"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_67 = function() {
	this.initialize(ss["PerformanceChecks_atlas_5"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_66 = function() {
	this.initialize(ss["PerformanceChecks_atlas_4"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_65 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(73);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_64 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(74);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_63 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(75);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_62 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(76);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_61 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(77);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_60 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(78);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_59 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(79);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_58 = function() {
	this.initialize(ss["PerformanceChecks_atlas_6"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_57 = function() {
	this.initialize(ss["PerformanceChecks_atlas_5"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_56 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(80);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_55 = function() {
	this.initialize(ss["PerformanceChecks_atlas_6"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_54 = function() {
	this.initialize(ss["PerformanceChecks_atlas_4"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_53 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(81);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_52 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(82);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_51 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(83);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_50 = function() {
	this.initialize(ss["PerformanceChecks_atlas_5"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_49 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(84);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_48 = function() {
	this.initialize(ss["PerformanceChecks_atlas_5"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_47 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(85);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_46 = function() {
	this.initialize(ss["PerformanceChecks_atlas_4"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_45 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(86);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_44 = function() {
	this.initialize(ss["PerformanceChecks_atlas_4"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_43 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(87);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_42 = function() {
	this.initialize(ss["PerformanceChecks_atlas_4"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_41 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(88);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_40 = function() {
	this.initialize(ss["PerformanceChecks_atlas_4"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_39 = function() {
	this.initialize(ss["PerformanceChecks_atlas_4"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_38 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(89);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_37 = function() {
	this.initialize(ss["PerformanceChecks_atlas_4"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_36 = function() {
	this.initialize(ss["PerformanceChecks_atlas_6"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_35 = function() {
	this.initialize(ss["PerformanceChecks_atlas_6"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_34 = function() {
	this.initialize(ss["PerformanceChecks_atlas_4"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_33 = function() {
	this.initialize(ss["PerformanceChecks_atlas_4"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_32 = function() {
	this.initialize(ss["PerformanceChecks_atlas_4"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_31 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(90);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_30 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(91);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_29 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(92);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_28 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(93);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_27 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(94);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_26 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(95);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_25 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(96);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_24 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(97);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_23 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(98);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_22 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(99);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_21 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(100);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_20 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(101);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_19 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(102);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_18 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(103);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_17 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(104);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_16 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(105);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_15 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(106);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_14 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(107);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_13 = function() {
	this.initialize(ss["PerformanceChecks_atlas_4"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_12 = function() {
	this.initialize(ss["PerformanceChecks_atlas_4"]);
	this.gotoAndStop(30);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_11 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(108);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_10 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(109);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_9 = function() {
	this.initialize(ss["PerformanceChecks_atlas_4"]);
	this.gotoAndStop(31);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_8 = function() {
	this.initialize(ss["PerformanceChecks_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_7 = function() {
	this.initialize(ss["PerformanceChecks_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_4 = function() {
	this.initialize(ss["PerformanceChecks_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_3 = function() {
	this.initialize(ss["PerformanceChecks_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(110);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(111);
}).prototype = p = new cjs.Sprite();



(lib.image121 = function() {
	this.initialize(ss["PerformanceChecks_atlas_4"]);
	this.gotoAndStop(32);
}).prototype = p = new cjs.Sprite();



(lib.image127 = function() {
	this.initialize(ss["PerformanceChecks_atlas_4"]);
	this.gotoAndStop(33);
}).prototype = p = new cjs.Sprite();



(lib.image157 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(112);
}).prototype = p = new cjs.Sprite();



(lib.image167 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(113);
}).prototype = p = new cjs.Sprite();



(lib.image213 = function() {
	this.initialize(ss["PerformanceChecks_atlas_4"]);
	this.gotoAndStop(34);
}).prototype = p = new cjs.Sprite();



(lib.image214 = function() {
	this.initialize(ss["PerformanceChecks_atlas_4"]);
	this.gotoAndStop(35);
}).prototype = p = new cjs.Sprite();



(lib.image225 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(114);
}).prototype = p = new cjs.Sprite();



(lib.image229 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(115);
}).prototype = p = new cjs.Sprite();



(lib.image263 = function() {
	this.initialize(ss["PerformanceChecks_atlas_4"]);
	this.gotoAndStop(36);
}).prototype = p = new cjs.Sprite();



(lib.image266 = function() {
	this.initialize(ss["PerformanceChecks_atlas_3"]);
	this.gotoAndStop(116);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.sprite_sliderbase = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// レイヤー_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#666666").s().p("EggfAAyQgUAAAAgUIAAg7QAAgUAUAAMBA/AAAQAUAAAAAUIAAA7QAAAUgUAAg");
	this.shape.setTransform(220,20);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// レイヤー_2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFFFFF").ss(2,1,1).p("EgiDgDHMBEHAAAQAUAAAAAUIAAFnQAAAUgUAAMhEHAAAQgUAAAAgUIAAlnQAAgUAUAAg");
	this.shape_1.setTransform(220,20);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000066").s().p("EgiDADIQgUAAAAgUIAAlnQAAgUAUAAMBEHAAAQAUAAAAAUIAAFnQAAAUgUAAg");
	this.shape_2.setTransform(220,20);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite_sliderbase, new cjs.Rectangle(-1,-1,442,42), null);


(lib.text297 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_168();
	this.instance.setTransform(-3.95,-3.75,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,155.4,30.9);


(lib.text296 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_167();
	this.instance.setTransform(-3.95,-3.75,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,151.8,43.900000000000006);


(lib.text295 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_166();
	this.instance.setTransform(-3.95,-3.75,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,144.8,30.599999999999998);


(lib.text294 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_165();
	this.instance.setTransform(-3.95,-3.75,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,128.1,43.900000000000006);


(lib.text293 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_164();
	this.instance.setTransform(-3.95,-3.75,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,131.8,44.6);


(lib.text292 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_163();
	this.instance.setTransform(-3.95,-3.75,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,128.1,44.900000000000006);


(lib.text291 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_162();
	this.instance.setTransform(-3.95,-3.75,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,128.1,44.6);


(lib.text290 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_161();
	this.instance.setTransform(-3.95,-3.75,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,136.8,30.599999999999998);


(lib.text289 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_160();
	this.instance.setTransform(-3.95,-3.75,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,147.4,45.2);


(lib.text288 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_159();
	this.instance.setTransform(-3.95,-3.75,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,124.5,31.3);


(lib.text287 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_158();
	this.instance.setTransform(-3.95,-3.75,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,138.1,30.599999999999998);


(lib.text286 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_157();
	this.instance.setTransform(-3.95,-3.75,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,102.2,30.599999999999998);


(lib.text285 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_156();
	this.instance.setTransform(9.2,-3.75,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(9.2,-3.7,68.3,45.2);


(lib.text284 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_155();
	this.instance.setTransform(-0.9,-3.75,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.9,-3.7,53.9,45.2);


(lib.text283 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_154();
	this.instance.setTransform(8.55,-3.75,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(8.6,-3.7,60.199999999999996,30.599999999999998);


(lib.text280 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_153();
	this.instance.setTransform(4.7,-3.65,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(4.7,-3.6,105.2,32.9);


(lib.text278 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_152();
	this.instance.setTransform(-3.95,-3.65,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.6,120.80000000000001,32.9);


(lib.text276 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_151();
	this.instance.setTransform(-3.95,-3.65,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.6,140.1,32.9);


(lib.text273 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_150();
	this.instance.setTransform(-3.95,-3.65,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.6,110.5,32.9);


(lib.text271 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_149();
	this.instance.setTransform(-3.95,-3.65,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.6,125.80000000000001,32.9);


(lib.text270 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_148();
	this.instance.setTransform(-3.95,-3.65,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.6,105.80000000000001,32.9);


(lib.text261 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_147();
	this.instance.setTransform(-3.95,-3.75,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,153.1,58.5);


(lib.text260 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_146();
	this.instance.setTransform(-3.95,-3.75,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,153.1,31.599999999999998);


(lib.text259 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_145();
	this.instance.setTransform(-3.95,-3.75,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,159.70000000000002,71.5);


(lib.text258 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_144();
	this.instance.setTransform(-3.95,-3.75,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,128.8,31.599999999999998);


(lib.text257 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_143();
	this.instance.setTransform(-3.95,-3.75,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,144.1,31.599999999999998);


(lib.text256 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_142();
	this.instance.setTransform(-3.95,-3.75,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,135.8,44.6);


(lib.text255 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_141();
	this.instance.setTransform(-3.95,-3.75,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,119.80000000000001,30.9);


(lib.text254 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_140();
	this.instance.setTransform(-3.95,-3.75,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,134.1,30.9);


(lib.text253 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_139();
	this.instance.setTransform(-3.95,-3.75,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,131.8,30.599999999999998);


(lib.text252 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_138();
	this.instance.setTransform(-3.95,-3.75,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,129.4,58.5);


(lib.text251 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_137();
	this.instance.setTransform(2.95,-3.75,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(3,-3.7,67.9,43.900000000000006);


(lib.text250 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_136();
	this.instance.setTransform(0,-3.75,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-3.7,52.9,71.5);


(lib.text249 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_135();
	this.instance.setTransform(-3.95,-3.75,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,59.199999999999996,30.599999999999998);


(lib.text248 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_134();
	this.instance.setTransform(-3.95,-3.75,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,80.2,30.599999999999998);


(lib.text247 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_133();
	this.instance.setTransform(6,-3.75,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(6,-3.7,64.9,43.900000000000006);


(lib.text244 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_132();
	this.instance.setTransform(-3.95,-3.65,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.6,109.80000000000001,32.9);


(lib.text242 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_131();
	this.instance.setTransform(0.3,-3.65,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0.3,-3.6,109.9,32.9);


(lib.text237 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_130();
	this.instance.setTransform(-3.95,-3.65,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.6,167.1,32.9);


(lib.text236 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_129();
	this.instance.setTransform(-3.95,-3.65,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.6,91.5,32.9);


(lib.text234 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_128();
	this.instance.setTransform(-3.95,-3.65,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.6,117.5,32.9);


(lib.text232 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_127();
	this.instance.setTransform(-3.95,-3.65,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.6,131.1,32.9);


(lib.text227 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_126();
	this.instance.setTransform(-3.95,-3.55,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.5,47.6,35.3);


(lib.text223 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_125();
	this.instance.setTransform(-591.35,-3.55,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-591.3,-3.5,397.4,50.9);


(lib.text222 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_124();
	this.instance.setTransform(-591.35,-3.55,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-591.3,-3.5,397.4,50.9);


(lib.text221 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_123();
	this.instance.setTransform(-591.35,-3.55,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-591.3,-3.5,398.4,66.5);


(lib.text220 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_122();
	this.instance.setTransform(-591.35,-3.55,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-591.3,-3.5,397.4,81.8);


(lib.text219 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_121();
	this.instance.setTransform(-591.35,-3.55,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-591.3,-3.5,399.4,50.9);


(lib.text218 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_120();
	this.instance.setTransform(-591.35,-3.55,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-591.3,-3.5,399.4,81.8);


(lib.text217 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_119();
	this.instance.setTransform(-3.95,-3.65,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.6,124.10000000000001,32.9);


(lib.text216 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_118();
	this.instance.setTransform(-3.95,-3.65,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.6,162.1,32.9);


(lib.text211 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_117();
	this.instance.setTransform(52.1,-3.55,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(52.1,-3.5,50.6,35.3);


(lib.text210 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_116();
	this.instance.setTransform(-3.95,-3.55,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.5,372.09999999999997,160.4);


(lib.text209 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_115();
	this.instance.setTransform(-3.95,-3.55,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.5,267.59999999999997,50.9);


(lib.text207 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_114();
	this.instance.setTransform(-3.95,-3.35,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,121.80000000000001,39.9);


(lib.text205 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_113();
	this.instance.setTransform(-3.95,-3.55,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.5,44.9,35.3);


(lib.text204 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_112();
	this.instance.setTransform(-3.95,-3.55,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.5,32.9,35.3);


(lib.text203 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_111();
	this.instance.setTransform(-3.95,-3.55,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.5,78.2,19.6);


(lib.text201 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_110();
	this.instance.setTransform(-3.95,-3.55,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.5,99.80000000000001,35.3);


(lib.text200 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_109();
	this.instance.setTransform(-3.95,-3.55,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.5,110.80000000000001,35.3);


(lib.text199 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_108();
	this.instance.setTransform(-3.95,-3.55,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.5,45.9,35.3);


(lib.text197 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_107();
	this.instance.setTransform(-3.95,-3.55,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.5,32.9,35.3);


(lib.text196 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_106();
	this.instance.setTransform(-3.95,-3.55,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.5,77.2,19.6);


(lib.text194 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_105();
	this.instance.setTransform(-3.95,-3.55,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.5,42.199999999999996,35.3);


(lib.text193 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_104();
	this.instance.setTransform(-3.95,-3.55,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.5,95.5,35.3);


(lib.text192 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_103();
	this.instance.setTransform(-3.95,-3.55,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.5,24.9,35.3);


(lib.text191 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_102();
	this.instance.setTransform(-3.95,-3.55,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.5,63.9,35.3);


(lib.text190 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_101();
	this.instance.setTransform(-3.95,-3.55,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.5,108.5,35.3);


(lib.text189 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_100();
	this.instance.setTransform(-3.95,-3.55,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.5,45.9,35.3);


(lib.text188 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_99();
	this.instance.setTransform(-3.95,-3.35,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,56.9,39.9);


(lib.text187 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_98();
	this.instance.setTransform(-3.95,-3.55,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.5,42.9,35.3);


(lib.text186 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_97();
	this.instance.setTransform(-3.95,-3.55,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.5,182,35.3);


(lib.text185 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_96();
	this.instance.setTransform(-3.95,-3.55,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.5,99.5,35.3);


(lib.text184 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_95();
	this.instance.setTransform(-3.95,-3.55,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.5,92.5,35.3);


(lib.text183 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_94();
	this.instance.setTransform(58.45,-3.55,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(58.5,-3.5,237.89999999999998,35.3);


(lib.text182 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_93();
	this.instance.setTransform(35.75,-3.55,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(35.8,-3.5,287.9,35.3);


(lib.text181 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_92();
	this.instance.setTransform(-3.95,-3.35,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,56.9,39.9);


(lib.text180 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_91();
	this.instance.setTransform(-3.95,-3.75,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,89.2,40.900000000000006);


(lib.text178 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_90();
	this.instance.setTransform(34.95,-3.75,0.3326,0.3326);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(35,-3.7,114.4,41.2);


(lib.text175 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_89();
	this.instance.setTransform(62.3,-3.95,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(62.3,-3.9,25.299999999999997,26.9);


(lib.text174 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_88();
	this.instance.setTransform(62.3,-3.95,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(62.3,-3.9,25.299999999999997,26.9);


(lib.text169 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_87();
	this.instance.setTransform(62.3,-3.95,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(62.3,-3.9,25.299999999999997,26.9);


(lib.text166 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_86();
	this.instance.setTransform(62.3,-3.95,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(62.3,-3.9,25.299999999999997,26.9);


(lib.text165 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_85();
	this.instance.setTransform(62.3,-3.95,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(62.3,-3.9,25.299999999999997,26.9);


(lib.text163 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_84();
	this.instance.setTransform(-3.95,-3.45,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,398.7,54.199999999999996);


(lib.text162 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_83();
	this.instance.setTransform(-3.95,-3.45,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,398.7,54.199999999999996);


(lib.text161 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_82();
	this.instance.setTransform(-3.95,-3.45,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,398.7,54.199999999999996);


(lib.text160 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_81();
	this.instance.setTransform(-3.95,-3.45,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,404.09999999999997,54.199999999999996);


(lib.text155 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_80();
	this.instance.setTransform(62.3,-3.95,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(62.3,-3.9,25.299999999999997,26.9);


(lib.text154 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_79();
	this.instance.setTransform(62.3,-3.95,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(62.3,-3.9,25.299999999999997,26.9);


(lib.text153 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_78();
	this.instance.setTransform(62.3,-3.95,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(62.3,-3.9,25.299999999999997,26.9);


(lib.text152 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_77();
	this.instance.setTransform(58.15,-3.95,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(58.2,-3.9,34.599999999999994,26.9);


(lib.text151 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_76();
	this.instance.setTransform(62.3,-3.95,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(62.3,-3.9,25.299999999999997,26.9);


(lib.text150 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_75();
	this.instance.setTransform(62.3,-3.95,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(62.3,-3.9,25.299999999999997,26.9);


(lib.text149 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_74();
	this.instance.setTransform(62.3,-3.95,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(62.3,-3.9,25.299999999999997,26.9);


(lib.text148 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_73();
	this.instance.setTransform(58.15,-3.95,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(58.2,-3.9,34.599999999999994,26.9);


(lib.text145 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_72();
	this.instance.setTransform(-3.95,-3.95,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.9,85.9,26.9);


(lib.text143 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_71();
	this.instance.setTransform(-3.95,-3.95,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.9,85.5,26.9);


(lib.text142 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_70();
	this.instance.setTransform(-3.95,-3.45,0.3327,0.3327);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,403.29999999999995,54.199999999999996);


(lib.text141 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_69();
	this.instance.setTransform(-3.95,-3.45,0.3327,0.3327);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,402.29999999999995,54.199999999999996);


(lib.text140 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_68();
	this.instance.setTransform(-3.95,-3.45,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,330.79999999999995,37.6);


(lib.text139 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_67();
	this.instance.setTransform(-3.95,-3.45,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,404,54.199999999999996);


(lib.text137 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_66();
	this.instance.setTransform(-3.95,-3.45,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,370.09999999999997,37.6);


(lib.text135 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_65();
	this.instance.setTransform(62.3,-3.95,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(62.3,-3.9,25.299999999999997,26.9);


(lib.text134 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_64();
	this.instance.setTransform(62.3,-3.95,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(62.3,-3.9,25.299999999999997,26.9);


(lib.text133 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_63();
	this.instance.setTransform(58.15,-3.95,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(58.2,-3.9,34.599999999999994,26.9);


(lib.text132 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_62();
	this.instance.setTransform(62.3,-3.95,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(62.3,-3.9,25.299999999999997,26.9);


(lib.text131 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_61();
	this.instance.setTransform(58.15,-3.95,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(58.2,-3.9,34.599999999999994,26.9);


(lib.text130 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_60();
	this.instance.setTransform(62.3,-3.95,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(62.3,-3.9,25.299999999999997,26.9);


(lib.text129 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_59();
	this.instance.setTransform(62.3,-3.95,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(62.3,-3.9,25.299999999999997,26.9);


(lib.text124 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_58();
	this.instance.setTransform(-3.95,-3.45,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,402.4,71.2);


(lib.text123 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_57();
	this.instance.setTransform(-3.95,-3.45,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,403.4,54.199999999999996);


(lib.text120 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_56();
	this.instance.setTransform(40,-3.75,0.3326,0.3326);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(40,-3.7,103.5,41.2);


(lib.text118 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_55();
	this.instance.setTransform(-3.95,-3.45,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,401.4,71.2);


(lib.text117 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_54();
	this.instance.setTransform(-3.95,-3.45,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,319.5,37.6);


(lib.text113 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_53();
	this.instance.setTransform(62.3,-3.95,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(62.3,-3.9,25.299999999999997,26.9);


(lib.text112 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_52();
	this.instance.setTransform(62.3,-3.95,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(62.3,-3.9,25.299999999999997,26.9);


(lib.text102 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_51();
	this.instance.setTransform(-0.55,-2.55,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.5,-2.5,26.3,35.3);


(lib.text101 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_50();
	this.instance.setTransform(-3.95,-3.45,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,394.4,71.2);


(lib.text99 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_49();
	this.instance.setTransform(-0.95,-2.55,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.9,-2.5,26.9,35.3);


(lib.text98 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_48();
	this.instance.setTransform(-3.95,-3.45,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,397.09999999999997,54.199999999999996);


(lib.text96 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_47();
	this.instance.setTransform(-0.95,-2.55,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.9,-2.5,26.9,35.3);


(lib.text95 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_46();
	this.instance.setTransform(-3.95,-3.45,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,394.4,54.199999999999996);


(lib.text94 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_45();
	this.instance.setTransform(-0.95,-2.55,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.9,-2.5,26.9,35.3);


(lib.text93 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_44();
	this.instance.setTransform(-3.95,-3.45,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,394.4,54.199999999999996);


(lib.text91 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_43();
	this.instance.setTransform(-1.6,-2.55,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.6,-2.5,30.6,35.3);


(lib.text90 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_42();
	this.instance.setTransform(-3.95,-3.45,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,393.4,54.199999999999996);


(lib.text88 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_41();
	this.instance.setTransform(-0.95,-2.55,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.9,-2.5,26.9,35.3);


(lib.text85 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_40();
	this.instance.setTransform(-3.95,-3.45,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,392.7,37.6);


(lib.text44 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_39();
	this.instance.setTransform(-3.95,-3.75,0.3326,0.3326);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,180.3,41.2);


(lib.text42 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_38();
	this.instance.setTransform(0,0,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,149.1,27.3);


(lib.text39 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_37();
	this.instance.setTransform(-3.95,-3.95,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.9,263.29999999999995,26.9);


(lib.text36 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_36();
	this.instance.setTransform(-3.95,-3.45,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,393.4,104.80000000000001);


(lib.text35 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_35();
	this.instance.setTransform(-3.95,-3.45,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,392.7,104.80000000000001);


(lib.text33 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_34();
	this.instance.setTransform(-3.95,-3.45,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,393.4,54.199999999999996);


(lib.text30 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_33();
	this.instance.setTransform(-212.25,-4.3,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-212.2,-4.3,259,94.5);


(lib.text28 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_32();
	this.instance.setTransform(-374.35,-4.2,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-374.3,-4.2,451.5,66.5);


(lib.text26 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_31();
	this.instance.setTransform(-24.05,-3.8,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-24,-3.8,62,53);


(lib.text25 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_30();
	this.instance.setTransform(-24.05,-3.8,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-24,-3.8,62,53);


(lib.text24 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_29();
	this.instance.setTransform(-33.95,-4.2,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-33.9,-4.2,77,66.5);


(lib.text23 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_28();
	this.instance.setTransform(-33.95,-4.2,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-33.9,-4.2,77,66.5);


(lib.text22 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_27();
	this.instance.setTransform(-18.4,-4.2,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-18.4,-4.2,60,66.5);


(lib.text21 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_26();
	this.instance.setTransform(-18.4,-4.2,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-18.4,-4.2,60,66.5);


(lib.text20 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_25();
	this.instance.setTransform(-18.4,-4.2,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-18.4,-4.2,60,66.5);


(lib.text19 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_24();
	this.instance.setTransform(-18.4,-4.2,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-18.4,-4.2,60,66.5);


(lib.text18 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_23();
	this.instance.setTransform(-18.4,-4.2,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-18.4,-4.2,60,66.5);


(lib.text17 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_22();
	this.instance.setTransform(-18.4,-4.2,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-18.4,-4.2,60,66.5);


(lib.text16 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_21();
	this.instance.setTransform(-18.4,-4.2,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-18.4,-4.2,60,66.5);


(lib.text15 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_20();
	this.instance.setTransform(-18.4,-4.2,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-18.4,-4.2,60,66.5);


(lib.text14 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_19();
	this.instance.setTransform(-18.4,-4.2,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-18.4,-4.2,60,66.5);


(lib.text13 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_18();
	this.instance.setTransform(-18.4,-4.2,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-18.4,-4.2,60,66.5);


(lib.text12 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_17();
	this.instance.setTransform(-18.4,-4.2,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-18.4,-4.2,60,66.5);


(lib.text11 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_16();
	this.instance.setTransform(-10.6,-4.2,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-10.6,-4.2,77,66.5);


(lib.text10 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_15();
	this.instance.setTransform(-10.6,-4.2,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-10.6,-4.2,77,66.5);


(lib.text9 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_14();
	this.instance.setTransform(-10.6,-4.2,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-10.6,-4.2,77,66.5);


(lib.text8 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_13();
	this.instance.setTransform(-185.8,-4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-185.8,-4,245.5,71);


(lib.text7 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_12();
	this.instance.setTransform(-185.85,-4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-185.8,-4,245.5,71);


(lib.text6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_11();
	this.instance.setTransform(-123.9,-4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-123.9,-4,177.5,71);


(lib.text5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_10();
	this.instance.setTransform(-77.25,-4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-77.2,-4,126,71);


(lib.text3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_9();
	this.instance.setTransform(-510.75,-4.2,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-510.7,-4.2,601.5,66.5);


(lib.shape298 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_10
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgJAHgIQAIgHAJAAQAKAAAIAHQAHAIAAAJQAAAKgHAIQgIAHgKAAQgJAAgIgHg");
	this.shape.setTransform(259.05,286.95);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_9
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgRARQgHgHAAgKQAAgKAHgHQAIgHAJAAQAKAAAIAHQAHAHAAAKQAAAKgHAHQgIAIgKAAQgJAAgIgIg");
	this.shape_1.setTransform(259.05,243.95);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_8
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgKAHgHQAIgHAJAAQAKAAAIAHQAHAHAAAKQAAAKgHAIQgIAHgKAAQgJAAgIgHg");
	this.shape_2.setTransform(259.05,173.45);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_7
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgRARQgHgHAAgKQAAgKAHgHQAHgHAKAAQAKAAAHAHQAIAHAAAKQAAAKgIAHQgHAIgKAAQgKAAgHgIg");
	this.shape_3.setTransform(85.65,360.95);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	// Layer_6
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgKAHgHQAHgHAKAAQAKAAAHAHQAIAHAAAKQAAAKgIAIQgHAHgKAAQgKAAgHgHg");
	this.shape_4.setTransform(85.65,335.45);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	// Layer_5
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgKAHgHQAHgHAKAAQAKAAAHAHQAIAHAAAKQAAAKgIAIQgHAHgKAAQgKAAgHgHg");
	this.shape_5.setTransform(85.65,312.95);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(1));

	// Layer_4
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgJAHgIQAHgHAKAAQAKAAAHAHQAIAIAAAJQAAAKgIAIQgHAHgKAAQgKAAgHgHg");
	this.shape_6.setTransform(85.65,278.95);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(1));

	// Layer_3
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgRARQgHgHAAgKQAAgKAHgHQAHgHAKAAQAKAAAHAHQAIAHAAAKQAAAKgIAHQgHAIgKAAQgKAAgHgIg");
	this.shape_7.setTransform(85.65,154.95);

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(1));

	// Layer_2
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgKAHgHQAIgHAJAAQAKAAAIAHQAHAHAAAKQAAAKgHAIQgIAHgKAAQgJAAgIgHg");
	this.shape_8.setTransform(259.05,132.95);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(1));

	// Layer_1
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgKAHgHQAHgHAKAAQAKAAAHAHQAIAHAAAKQAAAKgIAIQgHAHgKAAQgKAAgHgHg");
	this.shape_9.setTransform(85.65,132.95);

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(83.2,130.5,178.40000000000003,233);


(lib.shape282 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgVASQgIgIAAgKQAAgKAIgHQAJgHAMAAQANAAAIAHQAJAHAAAKQAAAKgJAIQgIAHgNAAQgMAAgJgHg");
	this.shape.setTransform(100.275,178.85);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgVARQgIgHAAgKQAAgKAIgHQAJgHAMAAQANAAAIAHQAJAHAAAKQAAAKgJAHQgIAIgNAAQgMAAgJgIg");
	this.shape_1.setTransform(100.275,244.95);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(1,0,0,3).p("AIO68IXCAAIAAH/IAASaIAAbgI3CAAI7AAAIAA7hIsdAAIAAyZIAAn/IMdAAIEeAAIA+AAgAIOy9IAAn/Ayyy9IsdAAAyy68IAAH/IbAAAIAASZIXCABAyygkIbAAAIAAbhAyyy9IAASZAyya9IsdAAIAA7hAfQy9I3CAA");
	this.shape_2.setTransform(214.8,225.9);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(13.8,52.4,402,347);


(lib.shape279 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AG4BaItvAAIAAizINvAAg");
	this.shape.setTransform(365.6,218.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("Am3BaIAAizINvAAIAACzg");
	this.shape_1.setTransform(365.6,218.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(320.6,208.6,90,20);


(lib.shape277 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AImBaIxLAAIAAizIRLAAg");
	this.shape.setTransform(142.35,5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AolBaIAAizIRLAAIAACzg");
	this.shape_1.setTransform(142.35,5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(86.4,-5,112,20);


(lib.shape275 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("ApNhZISbAAIAACzIybAAg");
	this.shape.setTransform(126.025,224.325);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("ApNBaIAAizISbAAIAACzg");
	this.shape_1.setTransform(126.025,224.325);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(66,214.3,120.1,20.099999999999994);


(lib.shape274 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("ACSADIkjgF");
	this.shape.setTransform(201.35,222.35);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(185.3,220.6,32.19999999999999,3.5999999999999943);


(lib.shape272 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("AD4BIInviP");
	this.shape.setTransform(188.075,22.4);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(161.8,13.7,52.599999999999994,17.400000000000002);


(lib.shape269 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(2,1,0,3).p("AAdzMIg7AAAhazMIg8AAAjSzMIg8AAAGFzMIg8AAAENzMIg8AAACVzMIg8AAAGGTNIg8AAAEOTNIg8AAACWTNIg8AAAAeTNIg7AAAhZTNIg8AAAjRTNIg8AAAlJTNIg8AA");
	this.shape.setTransform(277.3,96.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1,0,0,3).p("AntwZIMpAAAnsQaIPbAA");
	this.shape_1.setTransform(50.8,83.95);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0.4,-27.7,316.90000000000003,247.7);


(lib.shape267 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#0000FF").ss(3,1,0,3).p("AAAnBIAAg8AAAo5IAAg8AAAqxIAAg8AAAAeIAAg7AAAhZIAAg8AAAjRIAAg8AAAlJIAAg8AAAH+IAAg8AAAGGIAAg8AAAEOIAAg8AAACWIAAg8AAALuIAAg8AAAJ2IAAg8");
	this.shape.setTransform(6.05,-7.15);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(2,0,0,3).p("AzYAAMAmxAAA");
	this.shape_1.setTransform(4.8,71.65);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	var sprImg_shape_2 = cjs.SpriteSheetUtils.extractFrame(ss["PerformanceChecks_atlas_3"],116);
	sprImg_shape_2.onload = function(){
		this.shape_2.graphics.bf(sprImg_shape_2, null, new cjs.Matrix2D(1,0,0,1,-137,-84)).s().p("A1ZNIIAA6PMAqzAAAIAAaPg")
	}.bind(this);
	this.shape_2.setTransform(0,-8.15);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-137,-92.1,274,168);


(lib.shape264 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#0000FF").ss(3,1,0,3).p("AAAnBIAAg8AAAo5IAAg8AAAqxIAAg8AAAAeIAAg7AAAhZIAAg8AAAjRIAAg8AAAlJIAAg8AAAH+IAAg8AAAGGIAAg8AAAEOIAAg8AAACWIAAg8AAALuIAAg8AAAJ2IAAg8");
	this.shape.setTransform(-0.95,-7.15);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(2,0,0,3).p("A0sAAMApZAAA");
	this.shape_1.setTransform(4.1,72.75);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	var sprImg_shape_2 = cjs.SpriteSheetUtils.extractFrame(ss["PerformanceChecks_atlas_4"],36);
	sprImg_shape_2.onload = function(){
		this.shape_2.graphics.bf(sprImg_shape_2, null, new cjs.Matrix2D(1,0,0,1,-138,-99)).s().p("A1jPeIAA+7MArHAAAIAAe7g")
	}.bind(this);
	this.shape_2.setTransform(3.5,-18.15);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-134.5,-117.1,276,198);


(lib.shape262 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_10
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgRARQgHgHAAgKQAAgKAHgHQAHgHAKAAQALAAAGAHQAIAHAAAKQAAAKgIAHQgGAIgLAAQgKAAgHgIg");
	this.shape.setTransform(233.5,134.15);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_9
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgJAHgIQAHgHAKAAQALAAAGAHQAIAIAAAJQAAAKgIAIQgGAHgLAAQgKAAgHgHg");
	this.shape_1.setTransform(233.5,160.15);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_8
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgRARQgHgGAAgLQAAgKAHgHQAHgHAKAAQALAAAGAHQAIAHAAAKQAAALgIAGQgGAIgLAAQgKAAgHgIg");
	this.shape_2.setTransform(233.5,191.15);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_7
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgJAHgIQAHgHAKAAQALAAAGAHQAIAIAAAJQAAAKgIAIQgGAHgLAAQgKAAgHgHg");
	this.shape_3.setTransform(233.5,310.15);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	// Layer_6
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgRARQgHgGAAgLQAAgKAHgHQAHgHAKAAQALAAAGAHQAIAHAAAKQAAALgIAGQgGAIgLAAQgKAAgHgIg");
	this.shape_4.setTransform(233.5,344.15);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	// Layer_5
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AgRARQgHgGAAgLQAAgKAHgHQAIgHAJAAQAKAAAIAHQAHAHAAAKQAAALgHAGQgIAIgKAAQgJAAgIgIg");
	this.shape_5.setTransform(77.5,344.15);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(1));

	// Layer_4
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgJAHgIQAIgHAJAAQAKAAAIAHQAHAIAAAJQAAAKgHAIQgIAHgKAAQgJAAgIgHg");
	this.shape_6.setTransform(77.5,312.15);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(1));

	// Layer_3
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgKAHgHQAIgHAJAAQAKAAAIAHQAHAHAAAKQAAAKgHAIQgIAHgKAAQgJAAgIgHg");
	this.shape_7.setTransform(77.5,214.25);

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(1));

	// Layer_2
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgRARQgHgHAAgKQAAgKAHgHQAIgHAJAAQAKAAAIAHQAHAHAAAKQAAAKgHAHQgIAIgKAAQgJAAgIgIg");
	this.shape_8.setTransform(77.5,188.15);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(1));

	// Layer_1
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgRARQgHgHAAgKQAAgKAHgHQAIgHAJAAQAKAAAIAHQAHAHAAAKQAAAKgHAHQgIAIgKAAQgJAAgIgIg");
	this.shape_9.setTransform(77.5,135.15);

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(75,131.7,161,215);


(lib.shape246 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("Aw6J6IAAr0IqUAAAw6h6IAAn/Aw6h6IUrAAIXeAA");
	this.shape.setTransform(208.407,116.8,1.1731,1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1,0,0,3).p("ADv68IXeAAIAAH/IAAdVIAAQlI3eAAI0rAAIqUAAIAAwgIAAgGIAA9UIAAn/IKUAAgAbWKYIgJAAI3eAAIAAQlADvKYIAA9VIAAn/Aw8KXIqUAAADvKYI0rgBIAAxfAw8a9IAAwm");
	this.shape_1.setTransform(208.6417,225.9,1.1731,1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(3,52.4,412,347);


(lib.shape243 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AnLhZIOXAAIAACzIuXAAg");
	this.shape.setTransform(373.8,-25.325);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AnLBaIAAizIOXAAIAACzg");
	this.shape_1.setTransform(373.8,-25.325);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(326.8,-35.3,94,19.999999999999996);


(lib.shape241 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AHCBaIuDAAIAAizIODAAg");
	this.shape.setTransform(360.95,215.85);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AnBBaIAAizIODAAIAACzg");
	this.shape_1.setTransform(360.95,215.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(315,205.9,92,20);


(lib.shape239 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF0000").s().p("AAIAXIgPAAIgbAJIAjhAIAiBBg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.5,-3.3,7,6.699999999999999);


(lib.shape238 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(3,0,0,3).p("AiRgCIEjAF");
	this.shape.setTransform(299,218.35);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(282.9,216.6,32.200000000000045,3.5999999999999943);


(lib.shape235 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AmAhaIMBAAIAAC0IsBAAg");
	this.shape.setTransform(156,201.05);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AmABaIAAi0IMBAAIAAC0g");
	this.shape_1.setTransform(156,201.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(116.5,191,79,20.099999999999994);


(lib.shape233 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AHvBaIvdAAIAAizIPdAAg");
	this.shape.setTransform(131.95,37.85);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AnuBaIAAizIPdAAIAACzg");
	this.shape_1.setTransform(131.95,37.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#FF0000").ss(2,1,0,3).p("AMTxQIg8AAAIjxQIg8AAAGrxQIg8AAAC7xQIg8AAABDxQIg8AAAg0xQIg8AAAEzxQIg8AAAlusuIg8AAAnmsuIg8AAApesuIg8AAArWsuIg8AAAC3P3IgnguAg6QNQAYAPAYALAAANiQgcgOgbgKACfRRQAdgEAKgRIAFgNAArQ+QAdAKAbAFABjOhQgXgRgbgQAjhNCIgCADIgEAKIgBALIABAKQAFAXAZAfAigNkIg8AAAjnNkIg8AAAnXNkIg8AAAlfNkIg8AAApPNkIg8gBAigPGQAWATAaATAhwM3Ig7gIAKbxQIg8AA");
	this.shape_2.setTransform(258,116.325);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(1,0,0,3).p("Aq4vEIVyAAAq5PFIQuAA");
	this.shape_3.setTransform(70.1,79.45);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.6,-18,338.3,245.8);


(lib.shape230 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#0000FF").ss(3,1,0,3).p("AAAnBIAAg8AAAo5IAAg8AAAqxIAAg8AAAAeIAAg7AAAhZIAAg8AAAjRIAAg8AAAlJIAAg8AAAH+IAAg8AAAGGIAAg8AAAEOIAAg8AAACWIAAg8AAALuIAAg8AAAJ2IAAg8");
	this.shape.setTransform(-0.95,-7.15);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_3
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AvaAXIAAgrIAsAAIAAArgAlTANIAAgjIAkAAIAAAjgAE2ALIAAgfIAfAAIAAAfgAO6AJIAAgfIAhAAIAAAfg");
	this.shape_1.setTransform(-13.975,-96.85);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(2,0,0,3).p("A0iAAMApFAAA");
	this.shape_2.setTransform(0.35,71.9);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_1
	this.shape_3 = new cjs.Shape();
	var sprImg_shape_3 = cjs.SpriteSheetUtils.extractFrame(ss["PerformanceChecks_atlas_3"],115);
	sprImg_shape_3.onload = function(){
		this.shape_3.graphics.bf(sprImg_shape_3, null, new cjs.Matrix2D(1,0,0,1,-137.5,-87.5)).s().p("A1eNrIAA7VMAq9AAAIAAbVg")
	}.bind(this);
	this.shape_3.setTransform(0.35,-11.05);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-137.1,-99.2,275,175.7);


(lib.shape226 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#0000FF").ss(3,1,0,3).p("AAAqxIAAg8AAAjRIAAg8AAAlJIAAg8AAAnBIAAg8AAAo5IAAg8AAAEOIAAg8AAACWIAAg8AAAAeIAAg7AAALuIAAg8AAAJ2IAAg8AAAH+IAAg8AAAGGIAAg8AAAhZIAAg8");
	this.shape.setTransform(3.85,11.05);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(2,0,0,3).p("A0sAAMApZAAA");
	this.shape_1.setTransform(5.85,91.15);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	var sprImg_shape_2 = cjs.SpriteSheetUtils.extractFrame(ss["PerformanceChecks_atlas_3"],114);
	sprImg_shape_2.onload = function(){
		this.shape_2.graphics.bf(sprImg_shape_2, null, new cjs.Matrix2D(1,0,0,1,-138,-89)).s().p("A1jN6IAA7zMArHAAAIAAbzg")
	}.bind(this);
	this.shape_2.setTransform(5.5,8.95);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-132.5,-80,276,178);


(lib.shape215 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("AqdwyIPxAAAqdQzIU7AA");
	this.shape.setTransform(69.3,87.45);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_3
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(2,0,0,3).p("A1yOvMAp2AAAA1ouuMArbAAA");
	this.shape_1.setTransform(250.85,263.6);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	var sprImg_shape_2 = cjs.SpriteSheetUtils.extractFrame(ss["PerformanceChecks_atlas_4"],34);
	sprImg_shape_2.onload = function(){
		this.shape_2.graphics.bf(sprImg_shape_2, null, new cjs.Matrix2D(1,0,0,1,-151.5,-99)).s().p("A3qPeIAA+7MAvVAAAIAAe7g")
	}.bind(this);
	this.shape_2.setTransform(244.95,76.25);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_1
	this.shape_3 = new cjs.Shape();
	var sprImg_shape_3 = cjs.SpriteSheetUtils.extractFrame(ss["PerformanceChecks_atlas_4"],35);
	sprImg_shape_3.onload = function(){
		this.shape_3.graphics.bf(sprImg_shape_3, null, new cjs.Matrix2D(1,0,0,1,-152,-98)).s().p("A3vPUIAA+nMAvfAAAIAAeng")
	}.bind(this);
	this.shape_3.setTransform(237,267);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(1.3,-22.7,395.2,387.7);


(lib.shape212 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("AzhAAMAnDAAA");
	this.shape.setTransform(179,123);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(53,122,252,2);


(lib.shape206 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("ACMETIAAjwIKeAAIAADwgA0TETIAAjwIUyAAIAADwgAN6giIAAjwIKeAAIAADwgA4XgiIAAjwIKeAAIAADwg");
	this.shape.setTransform(-3,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-159,-27.5,312,55);


(lib.shape202 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(2,0,0,3).p("AliAAILFAA");
	this.shape.setTransform(-21.55,-1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-58,-2,73,2);


(lib.shape198 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AxpKUIAAjIIFAAAIAADIgAphFoIAAi+IO1AAIAAC+gACWAyIAAi9IMgAAIAAC9gAAeifIAAn0IRMAAIAAH0g");
	this.shape.setTransform(143.675,267);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(30.7,201,226,132);


(lib.shape195 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("AliAAILFAA");
	this.shape.setTransform(184.2,224);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(147.7,223,73,2);


(lib.shape179 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("EAhTAMRMhClAAAIAA4hMBClAAAgAv+jqMArxAAA");
	this.shape.setTransform(195.475,107.725);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-18.6,28.2,428.20000000000005,159.10000000000002);


(lib.shape177 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#CC0000").ss(2,0,0,3).p("AoKCCIAAkDIQVAAIAAEDg");
	this.shape.setTransform(593.45,41);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(540.2,27,106.5,28);


(lib.shape173 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AgyBtIANgbAgYA3IANgbAABABIANgaAAag0IANgbAAzhqIAMgbABMigIAMgbABljWIABgDAhmDZIANgbAhMCjIANgb");
	this.shape.setTransform(7.0238,-75.6662);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4.2,-98.5,22.5,45.6);


(lib.shape172 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ag7FlIAArJIB3AAIAALJg");
	this.shape.setTransform(-321.775,-19.9);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-327.8,-55.6,12.100000000000023,71.5);


(lib.shape171 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ag7FlIAArJIB3AAIAALJg");
	this.shape.setTransform(-321.775,-19.9);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-327.8,-55.6,12.100000000000023,71.5);


(lib.shape170 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AAADaIAAgeAAACeIAAgeAAABiIAAgeAAAAmIAAgeAAAgVIAAgeAAAhRIAAgeAAAiNIAAgeAAAjJIAAgQ");
	this.shape.setTransform(17.25,-75.725);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(16.3,-98.5,2,45.6);


(lib.shape168 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AW6RAIAAgjMguJAAAIAAALIgfAAIAAgfIgqAAIAAgZIAqAAMAAAggvIAfAAIAABbMAutAAAIAAAeIAFAAIAAe7IA3AAIAAAUIg3AAIAAA3gA3PPwICRAAIAAAFMAr4AAAIAA+sMguJAAAg");
	this.shape.setTransform(0.15,-3.325);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	var sprImg_shape_1 = cjs.SpriteSheetUtils.extractFrame(ss["PerformanceChecks_atlas_3"],113);
	sprImg_shape_1.onload = function(){
		this.shape_1.graphics.bf(sprImg_shape_1, null, new cjs.Matrix2D(1.37,0,0,1.266,-150,-100)).s().p("A3bPoIAA/PMAu3AAAIAAfPg")
	}.bind(this);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-156,-112.1,312.3,217.6);


(lib.shape164 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AAADaIAAgeAAACeIAAgeAAABiIAAgeAAAAmIAAgeAAAgVIAAgeAAAhRIAAgeAAAiNIAAgeAAAjJIAAgQ");
	this.shape.setTransform(17.25,-75.725);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(16.3,-98.5,2,45.6);


(lib.shape158 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	var sprImg_shape = cjs.SpriteSheetUtils.extractFrame(ss["PerformanceChecks_atlas_3"],112);
	sprImg_shape.onload = function(){
		this.shape.graphics.bf(sprImg_shape, null, new cjs.Matrix2D(1,0,0,1,-107.5,-80.5)).s().p("AwyMlIAA5JMAhlAAAIAAZJg")
	}.bind(this);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-107.5,-80.5,215,161);


(lib.shape147 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AgjCbIAHgdAgVBhIAHgdAgHAnIAHgdAAGgSIAHgdAAUhMIAGgdAAhiGIAGgdAAujAIAGgdAA7j6IAEgUAg/EPIAHgdAgxDVIAHgd");
	this.shape.setTransform(-24.6458,-66.3057);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-32,-94.4,14.7,56.2);


(lib.shape146 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ag7FmIAArLIB3AAIAALLg");
	this.shape.setTransform(-321.775,-21.2);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-327.8,-56.9,12.100000000000023,71.5);


(lib.shape144 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ag7FmIAArLIB3AAIAALLg");
	this.shape.setTransform(-321.775,-21.2);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-327.8,-56.9,12.100000000000023,71.5);


(lib.shape138 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AC4DJIgUgWACQCdIgUgWABoBxIgUgWABABFIgUgWAAYAZIgUgWAgPgSIgUgWAg3g+IgUgWAhfhqIgUgWAiIiWIgUgWAixjCIgGgH");
	this.shape.setTransform(0.0653,-73.2891);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.3,-94.4,38.8,42.300000000000004);


(lib.shape128 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	var sprImg_shape = cjs.SpriteSheetUtils.extractFrame(ss["PerformanceChecks_atlas_4"],33);
	sprImg_shape.onload = function(){
		this.shape.graphics.bf(sprImg_shape, null, new cjs.Matrix2D(1,0,0,1,-150,-85)).s().p("A3bNSIAA6jMAu3AAAIAAajg")
	}.bind(this);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-150,-85,300,170);


(lib.shape126 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AC4DJIgUgWACQCdIgUgWABoBxIgUgWABABFIgUgWAAYAZIgUgWAgPgSIgUgWAg3g+IgUgWAhfhqIgUgWAiIiWIgUgWAixjCIgGgH");
	this.shape.setTransform(0.0653,-73.2891);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.3,-94.4,38.8,42.300000000000004);


(lib.shape122 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	var sprImg_shape = cjs.SpriteSheetUtils.extractFrame(ss["PerformanceChecks_atlas_4"],32);
	sprImg_shape.onload = function(){
		this.shape.graphics.bf(sprImg_shape, null, new cjs.Matrix2D(1,0,0,1,-150,-85)).s().p("A3bNSIAA6jMAu3AAAIAAajg")
	}.bind(this);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-150,-85,300,170);


(lib.shape119 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#CC0000").ss(2,0,0,3).p("AneCCIAAkDIO9AAIAAEDg");
	this.shape.setTransform(593.925,41);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(545.1,27,97.69999999999993,28);


(lib.shape115_b = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#0066CC").s().p("AgYAYQgKgKAAgOQAAgNAKgLQALgKANAAQAOAAAKAKQALALAAANQAAAOgLAKQgKALgOAAQgNAAgLgLg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.5,-3.5,7,7);


(lib.shape115 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF0000").s().p("AgYAYQgKgKAAgOQAAgNAKgLQALgKANAAQAOAAAKAKQALALAAANQAAAOgLAKQgKALgOAAQgNAAgLgLg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.5,-3.5,7,7);


(lib.shape114_r = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF0000").s().p("AgJM8IAA53IATAAIAAZ3g");
	this.shape.setTransform(0,-82.75);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-165.5,2,165.5);


(lib.shape114 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#0066CC").s().p("AgJM8IAA53IATAAIAAZ3g");
	this.shape.setTransform(0,-82.75);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-165.5,2,165.5);


(lib.shape111 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhNA/IAAh9ICaAAIAAB9g");
	this.shape.setTransform(-307.6,-52.25);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-315.3,-58.5,15.5,12.5);


(lib.shape109 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Au2DzIdHpcIAmB2I9HJdg");
	this.shape.setTransform(203.475,105.55);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FF0000").ss(1,2,0,3).p("AAkhBIhHCD");
	this.shape_1.setTransform(163.625,308.925);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FF0000").s().p("AgLAkIgZgOIBJhIIgWBlg");
	this.shape_2.setTransform(168.4,298.725);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(108.4,69.4,190.20000000000002,247.49999999999997);


(lib.shape108 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(1,2,0,3).p("AhDDXICHmu");
	this.shape.setTransform(394.55,19.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF0000").s().p("AgbgzIAcAJIAcAJIg5BVg");
	this.shape_1.setTransform(387.625,45.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(384.7,-2.8,17.900000000000034,53.9);


(lib.shape107 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AooG5IPxvTIBgBjIvxPSg");
	this.shape.setTransform(240.525,184.15);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(185.3,130.3,110.5,107.79999999999998);


(lib.shape106 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("AAighQAOAOAAATQAAAUgOAOQgOAOgUAAQgTAAgOgOQgOgOAAgUQAAgTAOgOQAOgOATAAQAUAAAOAOg");
	this.shape.setTransform(381.65,54.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgiAiQgNgPAAgTQAAgTANgOQAPgOATAAQAUAAAOAOQAOAOAAATQAAATgOAPQgOAOgUAAQgTAAgPgOg");
	this.shape_1.setTransform(381.65,54.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(375.9,48.8,11.600000000000023,11.600000000000001);


(lib.shape105 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("AhGBHQgdgeAAgpQAAgoAdgeQAdgdApAAQApAAAdAdQAdAeABAoQgBApgdAeQgdAdgpAAQgpAAgdgdg");
	this.shape.setTransform(363.9,54.3496);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AhFBHQgegeAAgpQAAgoAegeQAcgdApAAQAqAAAdAdQAcAeABAoQgBApgcAeQgdAdgqAAQgpAAgcgdg");
	this.shape_1.setTransform(363.9,54.3496);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(352.9,43.4,22,22.000000000000007);


(lib.shape104 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.instance = new lib.CachedBmp_7();
	this.instance.setTransform(32.6,11.9,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,2,0,3).p("AAAxqMAAAAjV");
	this.shape.setTransform(409.15,180.275);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(2,0,0,3).p("A6UTZMAqogjZIKEjW");
	this.shape_1.setTransform(240.3385,169.4103);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(2,0,0,3).p("AAAhrIAAA4IAACf");
	this.shape_2.setTransform(409.15,56.325);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(1,2,0,3).p("AipgvIBIgYAipAIICyiwAipCpIFTlR");
	this.shape_3.setTransform(426.15,50.25);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#000000").ss(1,0,0,3).p("ASizhIAAASAyiTfMAiigjVICiihAwATeMAiigjU");
	this.shape_4.setTransform(290.5962,168.6747);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#000000").ss(1,2,0,3).p("Ab10TIo/DQMguqAlW");
	this.shape_5.setTransform(225.6687,163.6563);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_1
	this.instance_1 = new lib.CachedBmp_8();
	this.instance_1.setTransform(29.25,11.85,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(29.3,11.9,420.7,285.20000000000005);


(lib.shape100 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("Ah4AoIDxhP");
	this.shape.setTransform(-41.125,16.775);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(2,2,0,3).p("AFDhPIAAAfAAxgtIlwB6");
	this.shape_1.setTransform(2.9927,5.0073);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(1,0,0,3).p("ACxhpIDkAAADhBnIkIAAIgJADAmSBoIACgB");
	this.shape_2.setTransform(12.7632,-10.1878);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(1,2,0,3).p("AIUjPIizCyAoTDQIEBjNAkQACIJAjR");
	this.shape_3.setTransform(0.0272,-0.0022);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(0,102,153,0.753)").s().p("AkSADIACgBIJAjRIDkAAIizCyIAAAfIkJAAIgJACIlxB8IjxBQg");
	this.shape_4.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-54.6,-22.2,109.30000000000001,44.4);


(lib.shape97 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,2,0,3).p("AyQSqMAkhglT");
	this.shape.setTransform(13.7,1.725);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1,0,0,3).p("AUaypIAiAAAtnSqIigAAIk0AA");
	this.shape_1.setTransform(0,1.725);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(1,2,0,3).p("ARSxqMgijAjV");
	this.shape_2.setTransform(23.4,8.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(2,2,0,3).p("AAAg+IAAB9");
	this.shape_3.setTransform(134,-111.325);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(255,255,0,0.753)").s().p("AyhSqMAkgglTIAjAAIAAB/MgijAjUg");
	this.shape_4.setTransform(15.425,1.725);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-135,-119,270.4,241.5);


(lib.shape92 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("Ah4AoIDxhP");
	this.shape.setTransform(117.175,-93.775);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(2,2,0,3).p("AyZPSMAkzgej");
	this.shape_1.setTransform(11.425,0.025);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(1,2,0,3).p("ASUupMgknAdT");
	this.shape_2.setTransform(-12.05,4.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(1,0,0,3).p("AhxAAIDjAA");
	this.shape_3.setTransform(-117.8,97.85);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(153,153,153,0.8)").s().p("A0LPSMAkmgdTIDxhQMgkzAejg");
	this.shape_4.setTransform(0.025,0.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-130.6,-99.2,261.29999999999995,198.5);


(lib.shape89 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,2,0,3).p("AC5iXIlxExIgCAA");
	this.shape.setTransform(19.552,-0.077);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1,0,0,3).p("AALCZImEAAIAAkxIL4AA");
	this.shape_1.setTransform(-0.225,0.025);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(0,0,0,0.8)").s().p("AAICZImDAAIAAkxIL3AAIlxExg");
	this.shape_2.setTransform(0.025,0.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-39,-16.7,78.5,33.5);


(lib.shape87 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("AhGBHQgdgeAAgpQAAgoAdgeQAdgdApAAQApAAAdAdQAdAeABAoQgBApgdAeQgdAdgpAAQgpAAgdgdg");
	this.shape.setTransform(363.9,54.3496);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AhFBHQgegeAAgpQAAgoAegeQAcgdApAAQAqAAAdAdQAcAeABAoQgBApgcAeQgdAdgqAAQgpAAgcgdg");
	this.shape_1.setTransform(363.9,54.3496);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(352.9,43.4,22,22.000000000000007);


(lib.shape86 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgRARQgHgHAAgKQAAgKAHgHQAHgHAKAAQAKAAAIAHQAHAHAAAKQAAAKgHAHQgIAIgKAAQgKAAgHgIg");
	this.shape.setTransform(-677.95,-16.6);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-680.4,-19.1,5,5.000000000000002);


(lib.shape84 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Au2DzIdHpcIAmB2I9HJdg");
	this.shape.setTransform(203.475,105.55);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FF0000").ss(1,2,0,3).p("AAkhBIhHCD");
	this.shape_1.setTransform(163.625,308.925);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FF0000").s().p("AgLAkIgZgOIBJhIIgWBlg");
	this.shape_2.setTransform(168.4,298.725);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(108.4,69.4,190.20000000000002,247.49999999999997);


(lib.shape83 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(1,2,0,3).p("AhDDXICHmu");
	this.shape.setTransform(394.55,19.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF0000").s().p("AgbgzIAcAJIAcAJIg5BVg");
	this.shape_1.setTransform(387.625,45.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(384.7,-2.8,17.900000000000034,53.9);


(lib.shape82 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AooG5IPyvTIBfBjIvxPSg");
	this.shape.setTransform(240.5,184.15);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(185.2,130.3,110.60000000000002,107.79999999999998);


(lib.shape81 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("AAighQAOAOAAATQAAAUgOAOQgOAOgUAAQgTAAgOgOQgOgOAAgUQAAgTAOgOQAOgOATAAQAUAAAOAOg");
	this.shape.setTransform(381.65,54.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgiAiQgNgPAAgTQAAgTANgOQAPgOATAAQAUAAAOAOQAOAOAAATQAAATgOAPQgOAOgUAAQgTAAgPgOg");
	this.shape_1.setTransform(381.65,54.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(375.9,48.8,11.600000000000023,11.600000000000001);


(lib.shape80 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("AQuw9IBphrIACgCADjjmIDTjWAH8oDIDTjWAMVsgIDTjWApmJwIDTjWAlNFTIDSjWAt/ONIDTjWAyYSqIDTjWAg1A2IDSjV");
	this.shape.setTransform(-13.578,4.6755);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(2,0,0,3).p("A4JSqMAqlgjWIFyh7");
	this.shape_1.setTransform(-51.0116,4.6102);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(2,2,0,3).p("AABAAIgBAA");
	this.shape_2.setTransform(-205.775,124);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(2,0,0,3).p("AgCABIAFgB");
	this.shape_3.setTransform(104.225,-114.7);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#000000").ss(2,0,0,3).p("AAAyqMAAAAlV");
	this.shape_4.setTransform(131.3,4.65);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#000000").ss(1,0,0,3).p("AaVyqIkMAAIgEAAAaVSrI7+AAIragBIg0AAIg0ABAusSrIrogB");
	this.shape_5.setTransform(-37.1753,4.65);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#3FD83F").s().p("AooG5IPxvTIBgBjIvxPSg");
	this.shape_6.setTransform(-37.55,15.5);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("rgba(0,204,0,0.753)").s().p("AhpSrIragBIg0AAIg0ABIgBAAIrogBMAqlgjXIFyh6IAGgDIEMAAMAAAAlVgAosIlIBgBiIPxvSIhfhjgAWFyqIAEAAIgGADgAWJyqg");
	this.shape_7.setTransform(-37.175,4.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-206.9,-116,339.20000000000005,241.1);


(lib.shape79 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.instance = new lib.CachedBmp_7();
	this.instance.setTransform(32.6,11.9,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,2,0,3).p("AAAxqMAAAAjV");
	this.shape.setTransform(409.15,180.275);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(2,0,0,3).p("A6UTZMAqogjZIKEjW");
	this.shape_1.setTransform(240.3385,169.4103);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(2,0,0,3).p("AAAhrIAAA4IAACf");
	this.shape_2.setTransform(409.15,56.325);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(1,2,0,3).p("AP4yZIBIgYA1LUUMAiigjVIChigICzixAP4vBIFUlS");
	this.shape_3.setTransform(307.525,163.35);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#000000").ss(1,0,0,3).p("ARRzhIAAATAxRTfMAiigjV");
	this.shape_4.setTransform(298.6712,168.6498);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#000000").ss(1,2,0,3).p("Ab10TIo/DQMguqAlW");
	this.shape_5.setTransform(225.6687,163.6563);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_1
	this.instance_1 = new lib.CachedBmp_8();
	this.instance_1.setTransform(29.25,11.85,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(29.3,11.9,420.7,285.20000000000005);


(lib.shape43 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#003366").s().p("AgRARQgHgHAAgKQAAgKAHgHQAHgHAKAAQALAAAGAHQAIAHAAAKQAAAKgIAHQgGAIgLAAQgKAAgHgIg");
	this.shape.setTransform(8,38.85);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(5.5,36.4,5,5);


(lib.shape34 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgKAHgHQAHgHAKAAQALAAAGAHQAIAHAAAKQAAAKgIAIQgGAHgLAAQgKAAgHgHg");
	this.shape.setTransform(-352.1,179.75);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgJAHgIQAHgHAKAAQALAAAGAHQAIAIAAAJQAAAKgIAIQgGAHgLAAQgKAAgHgHg");
	this.shape_1.setTransform(-352.1,72.85);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgRARQgHgHAAgKQAAgKAHgHQAHgHAKAAQALAAAGAHQAIAHAAAKQAAAKgIAHQgGAIgLAAQgKAAgHgIg");
	this.shape_2.setTransform(-352.1,19.05);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-354.6,16.6,5,165.70000000000002);


(lib.shape31 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(1,2,0,3).p("AAkhBIhHCD");
	this.shape.setTransform(163.625,308.925);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF0000").s().p("AgLAkIgZgOIBJhIIgWBlg");
	this.shape_1.setTransform(168.4,298.725);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(158.7,293.7,13.400000000000006,23.19999999999999);


(lib.shape29 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(1,2,0,3).p("AhDDXICHmu");
	this.shape.setTransform(394.55,19.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF0000").s().p("AgbgzIAcAJIAcAJIg5BVg");
	this.shape_1.setTransform(387.625,45.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(384.7,-2.8,17.900000000000034,53.9);


(lib.shape27 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AooG5IPxvTIBgBjIvxPSg");
	this.shape.setTransform(240.525,184.15);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(185.3,130.3,110.5,107.79999999999998);


(lib.shape1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_8
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Au2DzIdHpcIAmB2I9HJdg");
	this.shape.setTransform(203.475,105.55);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_7
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1,0,0,3).p("AAighQAOAOAAATQAAAUgOAOQgOAOgUAAQgTAAgOgOQgOgOAAgUQAAgTAOgOQAOgOATAAQAUAAAOAOg");
	this.shape_1.setTransform(381.65,54.6);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgiAiQgNgPAAgTQAAgTANgOQAPgOATAAQAUAAAOAOQAOAOAAATQAAATgOAPQgOAOgUAAQgTAAgPgOg");
	this.shape_2.setTransform(381.65,54.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1}]}).wait(1));

	// Layer_6
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(1,0,0,3).p("AB5gnIjxBP");
	this.shape_3.setTransform(332.625,70.975);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	// Layer_5
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#000000").ss(2,2,0,3).p("AVUxsMgqnAjZ");
	this.shape_4.setTransform(208.275,180.225);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#000000").ss(1,2,0,3).p("AVVxEMgqpAiJ");
	this.shape_5.setTransform(184.075,184.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4}]}).wait(1));

	// Layer_4
	this.instance = new lib.CachedBmp_3();
	this.instance.setTransform(32.6,11.9,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_3
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#000000").ss(2,2,0,3).p("AAAxqMAAAAjV");
	this.shape_6.setTransform(409.15,180.275);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#000000").ss(2,0,0,3).p("AlBBrIKDjV");
	this.shape_7.setTransform(376.925,56.225);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#000000").ss(2,0,0,3).p("AAAhrIAAA4IAACf");
	this.shape_8.setTransform(409.15,56.325);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#000000").ss(1,2,0,3).p("AipgvIBIgYAipAIICyiwAipCpIFTlR");
	this.shape_9.setTransform(426.15,50.25);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#000000").ss(1,0,0,3).p("ASizhIAAASAyiTfMAiigjVICiihAwATeMAiigjU");
	this.shape_10.setTransform(290.5962,168.6747);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#000000").ss(1,2,0,3).p("AGhjOIo/DPIkBDN");
	this.shape_11.setTransform(362.1437,54.3563);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6}]}).wait(1));

	// Layer_2
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#000000").ss(1,0,0,3).p("AkBAAIIDAA");
	this.shape_12.setTransform(115.3,262.6);

	this.timeline.addTween(cjs.Tween.get(this.shape_12).wait(1));

	// Layer_1
	this.instance_1 = new lib.CachedBmp_4();
	this.instance_1.setTransform(29.25,11.85,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(29.3,11.9,420.7,285.20000000000005);


(lib.shape_slider = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgdCWQgUAAAAgUIAAkDQAAgUAUAAIA7AAQAUAAAAAUIAAEDQAAAUgUAAg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-5,-15,10,30);


(lib.buttonreplay = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// レイヤー_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhJBqQgmgrAAg+IgmAAIBBiWIBBCWIgpAAQAAAkAYAcQAVAZAhAAQAhAAAWgZQAYgcAAgkQAAgmgYgaQgUgZgggBIAAg8QA0AAAmAsQAnArAAA/QAAA+gnArQgmAsg2AAQg2AAgmgsg");
	this.shape.setTransform(19,20);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(4));

	// Layer 3
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFFFFF").ss(2,1,1).p("AizjHIFnAAQAUAAAAAUIAAFnQAAAUgUAAIlnAAQgUAAAAgUIAAlnQAAgUAUAAg");
	this.shape_1.setTransform(20,20);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000066").s().p("AizDIQgUAAAAgUIAAlnQAAgUAUAAIFnAAQAUAAAAAUIAAFnQAAAUgUAAg");
	this.shape_2.setTransform(20,20);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#0099FF").s().p("AizDIQgUAAAAgUIAAlnQAAgUAUAAIFnAAQAUAAAAAUIAAFnQAAAUgUAAg");
	this.shape_3.setTransform(20,20);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1}]}).to({state:[{t:this.shape_3},{t:this.shape_1}]},1).to({state:[{t:this.shape_3},{t:this.shape_1}]},1).to({state:[{t:this.shape_3},{t:this.shape_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,42,42);


(lib.buttonprev = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// レイヤー_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AiVAAIEriVIAAErg");
	this.shape.setTransform(28,25);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(4));

	// Layer 4
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFFFFF").ss(2,1,1).p("Aj5j5IHzAAQAyAAAAAyIAAGPQAAAygyAAInzAAQgyAAAAgyIAAmPQAAgyAyAAg");
	this.shape_1.setTransform(30.0418,25.0474,1.0013,0.9999);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000066").s().p("Aj5D6QgxAAAAgyIAAmPQAAgyAxAAIHzAAQAxAAAAAyIAAGPQAAAygxAAg");
	this.shape_2.setTransform(30.0418,25.0474,1.0013,0.9999);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#0099FF").s().p("Aj5D6QgxAAAAgyIAAmPQAAgyAxAAIHzAAQAxAAAAAyIAAGPQAAAygxAAg");
	this.shape_3.setTransform(29.9918,24.9974,1.0013,0.9999);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1,p:{x:30.0418,y:25.0474}}]}).to({state:[{t:this.shape_3},{t:this.shape_1,p:{x:29.9918,y:24.9974}}]},1).to({state:[{t:this.shape_3},{t:this.shape_1,p:{x:29.9918,y:24.9974}}]},1).to({state:[{t:this.shape_3},{t:this.shape_1,p:{x:29.9918,y:24.9974}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,62.1,52.1);


(lib.buttonplay = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// レイヤー_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhjhjIDHBjIjHBkg");
	this.shape.setTransform(20,20);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(4));

	// Layer 1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFFFFF").ss(2,1,1).p("AizjHIFnAAQAUAAAAAUIAAFnQAAAUgUAAIlnAAQgUAAAAgUIAAlnQAAgUAUAAg");
	this.shape_1.setTransform(20,20);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000066").s().p("AizDIQgUAAAAgUIAAlnQAAgUAUAAIFnAAQAUAAAAAUIAAFnQAAAUgUAAg");
	this.shape_2.setTransform(20,20);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#0099FF").s().p("AizDIQgUAAAAgUIAAlnQAAgUAUAAIFnAAQAUAAAAAUIAAFnQAAAUgUAAg");
	this.shape_3.setTransform(20,20);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1}]}).to({state:[{t:this.shape_3},{t:this.shape_1}]},1).to({state:[{t:this.shape_3},{t:this.shape_1}]},1).to({state:[{t:this.shape_3},{t:this.shape_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,42,42);


(lib.buttonpause = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// レイヤー_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAaBkIAAjHIBKAAIAADHgAhjBkIAAjHIBKAAIAADHg");
	this.shape.setTransform(20,20);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(4));

	// Layer 1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFFFFF").ss(2,1,1).p("AizjHIFnAAQAUAAAAAUIAAFnQAAAUgUAAIlnAAQgUAAAAgUIAAlnQAAgUAUAAg");
	this.shape_1.setTransform(20,20);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000066").s().p("AizDIQgUAAAAgUIAAlnQAAgUAUAAIFnAAQAUAAAAAUIAAFnQAAAUgUAAg");
	this.shape_2.setTransform(20,20);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#0099FF").s().p("AizDIQgUAAAAgUIAAlnQAAgUAUAAIFnAAQAUAAAAAUIAAFnQAAAUgUAAg");
	this.shape_3.setTransform(20,20);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1}]}).to({state:[{t:this.shape_3},{t:this.shape_1}]},1).to({state:[{t:this.shape_3},{t:this.shape_1}]},1).to({state:[{t:this.shape_3},{t:this.shape_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,42,42);


(lib.buttonnext = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// レイヤー_2
	this.instance = new lib.CachedBmp_2();
	this.instance.setTransform(5,12,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_1();
	this.instance_1.setTransform(58,10,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(4));

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(2,1,1).p("AnAj5IOBAAQAyAAAAAyIAAGPQAAAygyAAIuBAAQgyAAAAgyIAAmPQAAgyAyAAg");
	this.shape.setTransform(50.0378,24.9974,1.0012,0.9999);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000066").s().p("AnAD6QgyAAAAgyIAAmPQAAgyAyAAIOBAAQAyAAAAAyIAAGPQAAAygyAAg");
	this.shape_1.setTransform(50.0378,24.9974,1.0012,0.9999);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#0099FF").s().p("AnAD6QgyAAAAgyIAAmPQAAgyAyAAIOBAAQAyAAAAAyIAAGPQAAAygyAAg");
	this.shape_2.setTransform(49.9878,24.9974,1.0012,0.9999);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape,p:{x:50.0378}}]}).to({state:[{t:this.shape_2},{t:this.shape,p:{x:49.9878}}]},1).to({state:[{t:this.shape_2},{t:this.shape,p:{x:49.9878}}]},1).to({state:[{t:this.shape_2},{t:this.shape,p:{x:49.9878}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,102,52);


(lib.sprite268 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_4
	this.instance = new lib.text227("synched",0);
	this.instance.setTransform(-16.3,75.25);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_3
	this.instance_1 = new lib.shape267("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite268, new cjs.Rectangle(-137,-92.1,274,199.1), null);


(lib.sprite265 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_4
	this.instance = new lib.text227("synched",0);
	this.instance.setTransform(-16.3,75.25);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_3
	this.instance_1 = new lib.shape264("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite265, new cjs.Rectangle(-134.5,-117.1,276,224.1), null);


(lib.sprite240 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.shape239("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite240, new cjs.Rectangle(-3.5,-3.3,7,6.699999999999999), null);


(lib.sprite231 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_5
	this.instance = new lib.text227("synched",0);
	this.instance.setTransform(-16.3,75.25);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_4
	this.instance_1 = new lib.shape230("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite231, new cjs.Rectangle(-137.1,-99.2,275,206.2), null);


(lib.sprite228 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_4
	this.instance = new lib.text227("synched",0);
	this.instance.setTransform(-11.5,94.65);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_3
	this.instance_1 = new lib.shape226("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite228, new cjs.Rectangle(-132.5,-80,276,206.4), null);


(lib.sprite224 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.isSingleFrame = false;
	// timeline functions:
	this.frame_0 = function() {
		if(this.isSingleFrame) {
			return;
		}
		if(this.totalFrames == 1) {
			this.isSingleFrame = true;
		}
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// Layer_12
	this.instance = new lib.text223("synched",0);
	this.instance.setTransform(89.3,253.6);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_11
	this.instance_1 = new lib.text222("synched",0);
	this.instance_1.setTransform(89.3,205.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_10
	this.instance_2 = new lib.text221("synched",0);
	this.instance_2.setTransform(89.3,142.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	// Layer_9
	this.instance_3 = new lib.text220("synched",0);
	this.instance_3.setTransform(88.9,60.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

	// Layer_8
	this.instance_4 = new lib.text219("synched",0);
	this.instance_4.setTransform(89.3,300.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

	// Layer_7
	this.instance_5 = new lib.text218("synched",0);
	this.instance_5.setTransform(88.9,-17.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1));

	// Layer_6
	this.instance_6 = new lib.text217("synched",0);
	this.instance_6.setTransform(3.55,-32.75);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1));

	// Layer_5
	this.instance_7 = new lib.text216("synched",0);
	this.instance_7.setTransform(2.6,182.25);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1));

	// Layer_4
	this.instance_8 = new lib.shape215("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite224, new cjs.Rectangle(-502.4,-36.4,898.9,401.4), null);


(lib.sprite208 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		/* stopAllSounds ();
		*/
	}
	this.frame_159 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(159).call(this.frame_159).wait(1));

	// Layer_28
	this.instance = new lib.text205("synched",0);
	this.instance.setTransform(221.2,225.55);
	this.instance._off = true;

	this.instance_1 = new lib.text207("synched",0);
	this.instance_1.setTransform(58.4,145.5);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(29).to({_off:false},0).to({startPosition:0},5).to({x:127.8,y:61.75},49).wait(1).to({x:125.9,y:58.4},0).to({_off:true},5).wait(71));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(119).to({_off:false},0).to({alpha:0.2891},6).to({alpha:0.7305},6).to({alpha:0.9102},2).wait(1).to({alpha:1},0).to({_off:true},5).wait(5).to({_off:false},0).to({_off:true},5).wait(5).to({_off:false},0).wait(6));

	// Layer_27
	this.instance_2 = new lib.text205("synched",0);
	this.instance_2.setTransform(221.2,225.55);

	this.instance_3 = new lib.text204("synched",0);
	this.instance_3.setTransform(177.05,229.55);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_2,p:{x:221.2,y:225.55}}]},9).to({state:[]},5).to({state:[{t:this.instance_2,p:{x:221.2,y:225.55}}]},5).to({state:[]},5).to({state:[{t:this.instance_3}]},5).to({state:[{t:this.instance_3}]},5).to({state:[{t:this.instance_3}]},49).to({state:[{t:this.instance_3}]},1).to({state:[]},5).to({state:[{t:this.instance_2,p:{x:125.9,y:58.4}}]},5).to({state:[]},5).to({state:[{t:this.instance_2,p:{x:125.9,y:58.4}}]},5).wait(56));
	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(29).to({_off:false},0).to({startPosition:0},5).to({x:83.65,y:65.75},49).wait(1).to({x:81.75,y:62.4},0).to({_off:true},5).wait(71));

	// Layer_26
	this.instance_4 = new lib.text204("synched",0);
	this.instance_4.setTransform(177.05,229.55);

	this.instance_5 = new lib.text203("synched",0);
	this.instance_5.setTransform(155.45,205.55);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_4,p:{x:177.05,y:229.55}}]},9).to({state:[]},5).to({state:[{t:this.instance_4,p:{x:177.05,y:229.55}}]},5).to({state:[]},5).to({state:[{t:this.instance_5}]},5).to({state:[{t:this.instance_5}]},5).to({state:[{t:this.instance_5}]},49).to({state:[{t:this.instance_5}]},1).to({state:[]},5).to({state:[{t:this.instance_4,p:{x:81.75,y:62.4}}]},5).to({state:[]},5).to({state:[{t:this.instance_4,p:{x:81.75,y:62.4}}]},5).wait(56));
	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(29).to({_off:false},0).to({startPosition:0},5).to({x:62.05,y:41.75},49).wait(1).to({x:60.15,y:38.4},0).to({_off:true},5).wait(71));

	// Layer_25
	this.instance_6 = new lib.text203("synched",0);
	this.instance_6.setTransform(155.45,205.55);

	this.instance_7 = new lib.shape202("synched",0);
	this.instance_7.setTransform(205.65,225.35);
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_6,p:{x:155.45,y:205.55}}]},9).to({state:[]},5).to({state:[{t:this.instance_6,p:{x:155.45,y:205.55}}]},5).to({state:[]},5).to({state:[{t:this.instance_7}]},5).to({state:[{t:this.instance_7}]},5).to({state:[{t:this.instance_7}]},49).to({state:[{t:this.instance_7}]},1).to({state:[]},5).to({state:[{t:this.instance_6,p:{x:60.15,y:38.4}}]},5).to({state:[]},5).to({state:[{t:this.instance_6,p:{x:60.15,y:38.4}}]},5).wait(56));
	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(29).to({_off:false},0).to({startPosition:0},5).to({x:112.25,y:61.55},49).wait(1).to({x:110.35,y:58.2},0).to({_off:true},5).wait(71));

	// Layer_24
	this.instance_8 = new lib.shape202("synched",0);
	this.instance_8.setTransform(205.65,225.35);

	this.instance_9 = new lib.text201("synched",0);
	this.instance_9.setTransform(160,255.55);
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_8,p:{x:205.65,y:225.35}}]},9).to({state:[]},5).to({state:[{t:this.instance_8,p:{x:205.65,y:225.35}}]},5).to({state:[]},5).to({state:[{t:this.instance_9}]},5).to({state:[{t:this.instance_9}]},4).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},39).to({state:[{t:this.instance_9}]},10).to({state:[{t:this.instance_9}]},1).to({state:[]},5).to({state:[{t:this.instance_8,p:{x:110.35,y:58.2}}]},5).to({state:[]},5).to({state:[{t:this.instance_8,p:{x:110.35,y:58.2}}]},5).wait(56));
	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(29).to({_off:false},0).to({startPosition:0},4).to({x:159.4,y:255.5},1).to({x:159.95,y:111.3},39).to({x:160,y:93.55},10).wait(1).to({y:92.2},0).to({_off:true},5).wait(71));

	// Layer_23
	this.instance_10 = new lib.text201("synched",0);
	this.instance_10.setTransform(160,255.55);

	this.instance_11 = new lib.text200("synched",0);
	this.instance_11.setTransform(85,285.55);
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_10,p:{y:255.55}}]},9).to({state:[]},5).to({state:[{t:this.instance_10,p:{y:255.55}}]},5).to({state:[]},5).to({state:[{t:this.instance_11}]},5).to({state:[{t:this.instance_11}]},5).to({state:[{t:this.instance_11}]},23).to({state:[{t:this.instance_11}]},20).to({state:[{t:this.instance_11}]},6).to({state:[{t:this.instance_11}]},1).to({state:[]},5).to({state:[{t:this.instance_10,p:{y:92.2}}]},5).to({state:[]},5).to({state:[{t:this.instance_10,p:{y:92.2}}]},5).wait(56));
	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(29).to({_off:false},0).to({startPosition:0},5).to({guide:{path:[85.1,285.5,131.9,291.7,165.4,277.2,198.9,262.6,222,235,233.2,221.7,242.3,206.1,242.3,206.1,242.3,206.1]}},23).to({guide:{path:[242.3,206.1,252,189.5,259.4,170.4,270.2,142,277.5,112.5,277.5,112.5,277.5,112.5]}},20).to({guide:{path:[277.4,112.5,279.6,103.7,281.5,94.7]}},6).wait(1).to({x:282,y:92.2},0).to({_off:true},5).wait(71));

	// Layer_22
	this.instance_12 = new lib.text200("synched",0);
	this.instance_12.setTransform(85,285.55);

	this.instance_13 = new lib.text199("synched",0);
	this.instance_13.setTransform(32,315.55);
	this.instance_13._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_12,p:{x:85,y:285.55}}]},9).to({state:[]},5).to({state:[{t:this.instance_12,p:{x:85,y:285.55}}]},5).to({state:[]},5).to({state:[{t:this.instance_13}]},5).to({state:[{t:this.instance_13}]},5).to({state:[{t:this.instance_13}]},15).to({state:[{t:this.instance_13}]},14).to({state:[{t:this.instance_13}]},13).to({state:[{t:this.instance_13}]},7).to({state:[{t:this.instance_13}]},1).to({state:[]},5).to({state:[{t:this.instance_12,p:{x:282,y:92.2}}]},5).to({state:[]},5).to({state:[{t:this.instance_12,p:{x:282,y:92.2}}]},5).wait(56));
	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(29).to({_off:false},0).to({startPosition:0},5).to({guide:{path:[32.1,315.5,72.5,316.5,109.8,312.3]}},15).to({guide:{path:[109.9,312.3,109.9,312.3,109.9,312.3,129.4,310.1,148.2,306.4,188.7,298.3,222.1,280.9,222.1,280.9,222.1,280.9]}},14).to({guide:{path:[222.2,280.9,233.3,275.1,243.7,268.2,284.9,240.7,310.9,194.3,316.6,184,321.3,172.5,321.3,172.5,321.3,172.5]}},13).to({guide:{path:[321.3,172.5,337.9,132.4,342.3,78.2]}},7).wait(1).to({x:343,y:63.4},0).to({_off:true},5).wait(71));

	// Layer_21
	this.instance_14 = new lib.text199("synched",0);
	this.instance_14.setTransform(32,315.55);

	this.instance_15 = new lib.shape198("synched",0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_14,p:{x:32,y:315.55}}]},9).to({state:[]},5).to({state:[{t:this.instance_14,p:{x:32,y:315.55}}]},5).to({state:[]},5).to({state:[{t:this.instance_15}]},5).to({state:[]},55).to({state:[{t:this.instance_14,p:{x:343,y:63.4}}]},10).to({state:[]},5).to({state:[{t:this.instance_14,p:{x:343,y:63.4}}]},5).wait(56));

	// Layer_20
	this.instance_16 = new lib.shape198("synched",0);

	this.instance_17 = new lib.shape206("synched",0);
	this.instance_17.setTransform(248.7,84.5);
	this.instance_17.alpha = 0;
	this.instance_17._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_16}]},9).to({state:[]},5).to({state:[{t:this.instance_16}]},5).to({state:[]},5).to({state:[{t:this.instance_17}]},40).to({state:[{t:this.instance_17}]},19).to({state:[{t:this.instance_17}]},1).wait(76));
	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(64).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(76));

	// Layer_19
	this.instance_18 = new lib.text197("synched",0);
	this.instance_18.setTransform(177.15,229.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(160));

	// Layer_18
	this.instance_19 = new lib.text196("synched",0);
	this.instance_19.setTransform(155.55,205.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(160));

	// Layer_17
	this.instance_20 = new lib.shape195("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(160));

	// Layer_16
	this.instance_21 = new lib.text194("synched",0);
	this.instance_21.setTransform(223,224.55);

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(160));

	// Layer_15
	this.instance_22 = new lib.text193("synched",0);
	this.instance_22.setTransform(160,254.55);

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(160));

	// Layer_14
	this.instance_23 = new lib.text192("synched",0);
	this.instance_23.setTransform(130,224.55);

	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(160));

	// Layer_13
	this.instance_24 = new lib.text191("synched",0);
	this.instance_24.setTransform(80,224.55);

	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(160));

	// Layer_12
	this.instance_25 = new lib.text190("synched",0);
	this.instance_25.setTransform(85,284.55);

	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(160));

	// Layer_11
	this.instance_26 = new lib.text189("synched",0);
	this.instance_26.setTransform(32,314.55);

	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(160));

	// Layer_10
	this.instance_27 = new lib.text188("synched",0);
	this.instance_27.setTransform(2,145.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_27).wait(160));

	// Layer_9
	this.instance_28 = new lib.text187("synched",0);
	this.instance_28.setTransform(2,314.55);

	this.timeline.addTween(cjs.Tween.get(this.instance_28).wait(160));

	// Layer_8
	this.instance_29 = new lib.text186("synched",0);
	this.instance_29.setTransform(2,254.55);

	this.timeline.addTween(cjs.Tween.get(this.instance_29).wait(160));

	// Layer_7
	this.instance_30 = new lib.text185("synched",0);
	this.instance_30.setTransform(2,284.55);

	this.timeline.addTween(cjs.Tween.get(this.instance_30).wait(160));

	// Layer_6
	this.instance_31 = new lib.text184("synched",0);
	this.instance_31.setTransform(2,224.55);

	this.timeline.addTween(cjs.Tween.get(this.instance_31).wait(160));

	// Layer_5
	this.instance_32 = new lib.text183("synched",0);
	this.instance_32.setTransform(59.45,91.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_32).wait(160));

	// Layer_4
	this.instance_33 = new lib.text182("synched",0);
	this.instance_33.setTransform(60.45,62.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_33).wait(160));

	// Layer_3
	this.instance_34 = new lib.text181("synched",0);
	this.instance_34.setTransform(2,76.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_34).wait(160));

	// Layer_2
	this.instance_35 = new lib.text180("synched",0);
	this.instance_35.setTransform(-38.3,-9.25);

	this.timeline.addTween(cjs.Tween.get(this.instance_35).wait(160));

	// Layer_1
	this.instance_36 = new lib.shape179("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_36).wait(160));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-42.2,-13,451.8,360.5);


(lib.sprite176 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		/* stopAllSounds ();
		*/
	}
	this.frame_754 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(754).call(this.frame_754).wait(1));

	// Masked_Layer_22___15
	this.instance = new lib.shape86("synched",0);
	this.instance.setTransform(-151,0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(755));

	// Masked_Layer_21___15
	this.instance_1 = new lib.text163("synched",0);
	this.instance_1.setTransform(-822.55,-24.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(755));

	// Masked_Layer_20___15
	this.instance_2 = new lib.shape86("synched",0);
	this.instance_2.setTransform(-151,-47.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(755));

	// Masked_Layer_19___15
	this.instance_3 = new lib.text162("synched",0);
	this.instance_3.setTransform(-822.55,-69.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(755));

	// Masked_Layer_18___15
	this.instance_4 = new lib.shape86("synched",0);
	this.instance_4.setTransform(-151,-87.95);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(755));

	// Masked_Layer_17___15
	this.instance_5 = new lib.text161("synched",0);
	this.instance_5.setTransform(-822.55,-112.65);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(755));

	// Masked_Layer_16___15
	this.instance_6 = new lib.text160("synched",0);
	this.instance_6.setTransform(-827.8,-155.65);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(755));

	// Layer_14
	this.instance_7 = new lib.shape158("synched",0);
	this.instance_7.setTransform(-650,120);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(514).to({startPosition:0},0).to({alpha:0.0703},14).to({_off:true},1).wait(226));

	// Layer_13
	this.instance_8 = new lib.shape168("synched",0);
	this.instance_8.setTransform(-650,120,0.7231,0.8126);
	this.instance_8.alpha = 0;
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(514).to({_off:false},0).to({alpha:0.9297},14).wait(1).to({alpha:1},0).wait(226));

	// Layer_11_r
	this.instance_9 = new lib.shape115("synched",0);
	this.instance_9.setTransform(17.5,-83.8);
	this.instance_9.alpha = 0;
	this.instance_9._off = true;

	this.instance_10 = new lib.shape115_b("synched",0);
	this.instance_10.setTransform(4.65,-71.4);
	this.instance_10.alpha = 0;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_9}]},514).to({state:[{t:this.instance_9}]},22).to({state:[{t:this.instance_9}]},1).to({state:[]},5).to({state:[{t:this.instance_9}]},9).to({state:[]},5).to({state:[{t:this.instance_9}]},8).to({state:[{t:this.instance_9}]},48).to({state:[{t:this.instance_9}]},19).to({state:[{t:this.instance_9}]},17).to({state:[{t:this.instance_10}]},34).to({state:[]},1).wait(72));
	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(514).to({_off:false},0).to({y:-97.6,alpha:0.5781},22).wait(1).to({y:-98.3,alpha:1},0).to({_off:true},5).wait(9).to({_off:false},0).to({_off:true},5).wait(8).to({_off:false},0).to({startPosition:0},48).to({x:14.3,y:-91.55},19).to({x:11.1,y:-84.85},17).to({_off:true,x:4.65,y:-71.4,alpha:0},34).wait(73));

	// Layer_11
	this.instance_11 = new lib.shape115_b("synched",0);
	this.instance_11.setTransform(17.5,-54);
	this.instance_11._off = true;

	this.instance_12 = new lib.shape115("synched",0);
	this.instance_12.setTransform(17.5,-97.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_11}]},222).to({state:[{t:this.instance_11}]},172).to({state:[{t:this.instance_11}]},99).to({state:[{t:this.instance_11}]},21).to({state:[{t:this.instance_12}]},22).to({state:[]},1).to({state:[{t:this.instance_11}]},111).to({state:[{t:this.instance_11}]},34).to({state:[{t:this.instance_11}]},45).to({state:[{t:this.instance_11}]},1).to({state:[]},7).to({state:[{t:this.instance_11}]},6).to({state:[]},7).to({state:[{t:this.instance_11}]},6).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(222).to({_off:false},0).wait(172).to({startPosition:0},0).to({y:-76.35},99).to({y:-83.8},21).to({_off:true,y:-97.6},22).wait(112).to({_off:false,x:11.1,y:-84.85},0).to({x:4.65,y:-71.4},34).to({x:-3.75,y:-53.85},45).wait(1).to({x:-3.95,y:-53.45},0).to({_off:true},7).wait(6).to({_off:false},0).to({_off:true},7).wait(6).to({_off:false},0).wait(1));

	// Layer_10
	this.instance_13 = new lib.shape115_b("synched",0);
	this.instance_13.setTransform(17.5,-54);

	this.instance_14 = new lib.text169("synched",0);
	this.instance_14.setTransform(-379.6,-101.5);

	this.instance_15 = new lib.text135("synched",0);
	this.instance_15.setTransform(-379.6,-98.9);

	this.instance_16 = new lib.text166("synched",0);
	this.instance_16.setTransform(-379.6,-84.6);

	this.instance_17 = new lib.text130("synched",0);
	this.instance_17.setTransform(-379.6,-72.9);

	this.instance_18 = new lib.text113("synched",0);
	this.instance_18.setTransform(-379.6,-57.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_13}]},179).to({state:[]},28).to({state:[{t:this.instance_13}]},5).to({state:[]},5).to({state:[{t:this.instance_14}]},320).to({state:[{t:this.instance_15}]},88).to({state:[{t:this.instance_16}]},33).to({state:[{t:this.instance_17}]},32).to({state:[{t:this.instance_18}]},38).wait(27));

	// Layer_9
	this.instance_19 = new lib.text113("synched",0);
	this.instance_19.setTransform(-379.6,-57.95);

	this.instance_20 = new lib.text130("synched",0);
	this.instance_20.setTransform(-379.6,-72.9);

	this.instance_21 = new lib.text166("synched",0);
	this.instance_21.setTransform(-379.6,-84.6);

	this.instance_22 = new lib.text135("synched",0);
	this.instance_22.setTransform(-379.6,-98.9);

	this.instance_23 = new lib.shape111("synched",0);
	this.instance_23.setTransform(0,-39.65);
	this.instance_23._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_19}]},179).to({state:[{t:this.instance_20}]},280).to({state:[{t:this.instance_21}]},45).to({state:[{t:this.instance_22}]},25).to({state:[{t:this.instance_23}]},8).to({state:[{t:this.instance_23}]},87).to({state:[{t:this.instance_23}]},1).to({state:[{t:this.instance_23}]},32).to({state:[{t:this.instance_23}]},1).to({state:[{t:this.instance_23}]},31).to({state:[{t:this.instance_23}]},1).to({state:[{t:this.instance_23}]},37).to({state:[{t:this.instance_23}]},1).wait(27));
	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(537).to({_off:false},0).to({startPosition:0},87).wait(1).to({y:-40.95},0).to({startPosition:0},32).wait(1).to({y:-26.65},0).to({startPosition:0},31).wait(1).to({y:-14.95},0).to({startPosition:0},37).wait(1).to({y:0},0).wait(27));

	// Layer_8
	this.instance_24 = new lib.shape111("synched",0);
	this.instance_24._off = true;

	this.instance_25 = new lib.text135("synched",0);
	this.instance_25.setTransform(-54.9,144.75);

	this.instance_26 = new lib.text174("synched",0);
	this.instance_26.setTransform(-60.75,144.75);

	this.instance_27 = new lib.text129("synched",0);
	this.instance_27.setTransform(-67.9,144.75);

	this.instance_28 = new lib.text175("synched",0);
	this.instance_28.setTransform(-76.35,144.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_24}]},179).to({state:[{t:this.instance_24}]},279).to({state:[{t:this.instance_24}]},1).to({state:[{t:this.instance_24}]},44).to({state:[{t:this.instance_24}]},1).to({state:[{t:this.instance_24}]},24).to({state:[{t:this.instance_24}]},1).to({state:[{t:this.instance_25}]},8).to({state:[{t:this.instance_26}]},121).to({state:[{t:this.instance_27}]},32).to({state:[{t:this.instance_28}]},38).wait(27));
	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(179).to({_off:false},0).wait(279).to({startPosition:0},0).wait(1).to({y:-14.95},0).to({startPosition:0},44).wait(1).to({y:-26.65},0).to({startPosition:0},24).wait(1).to({y:-40.95},0).to({_off:true},8).wait(218));

	// Layer_7
	this.instance_29 = new lib.text112("synched",0);
	this.instance_29.setTransform(-54.9,144.75);

	this.instance_30 = new lib.text165("synched",0);
	this.instance_30.setTransform(-54.9,144.75);

	this.instance_31 = new lib.text135("synched",0);
	this.instance_31.setTransform(-54.9,144.75);

	this.instance_32 = new lib.shape111("synched",0);
	this.instance_32.setTransform(324.8,201.6);
	this.instance_32._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_29}]},179).to({state:[{t:this.instance_30}]},325).to({state:[{t:this.instance_31}]},25).to({state:[{t:this.instance_32}]},8).to({state:[{t:this.instance_32}]},120).to({state:[{t:this.instance_32}]},1).to({state:[{t:this.instance_32}]},31).to({state:[{t:this.instance_32}]},1).to({state:[{t:this.instance_32}]},37).to({state:[{t:this.instance_32}]},1).wait(27));
	this.timeline.addTween(cjs.Tween.get(this.instance_32).wait(537).to({_off:false},0).to({startPosition:0},120).wait(1).to({x:322.2},0).to({startPosition:0},31).wait(1).to({x:311.15},0).to({startPosition:0},37).wait(1).to({x:302.7},0).wait(27));

	// Layer_6
	this.instance_33 = new lib.shape111("synched",0);
	this.instance_33.setTransform(324.8,201.6);

	this.instance_34 = new lib.shape170("synched",0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_33}]},179).to({state:[]},358).to({state:[{t:this.instance_34}]},27).wait(191));

	// Layer_4
	this.instance_35 = new lib.text145("synched",0);
	this.instance_35.setTransform(-327.65,14.8,1,1,-89.9948);
	this.instance_35._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_35).wait(581).to({_off:false},0).to({_off:true},5).wait(5).to({_off:false},0).to({_off:true},5).wait(159));

	// Mask_Layer_3 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_394 = new cjs.Graphics().p("AAQkAIAAgXIBfAAIAAAXg");
	var mask_graphics_395 = new cjs.Graphics().p("AAQj/IAAgZIBfAAIAAAZg");
	var mask_graphics_396 = new cjs.Graphics().p("AAQj+IAAgbIBfAAIAAAbg");
	var mask_graphics_397 = new cjs.Graphics().p("AAQj9IAAgdIBfAAIAAAdg");
	var mask_graphics_398 = new cjs.Graphics().p("AAQj8IAAgfIBfAAIAAAfg");
	var mask_graphics_399 = new cjs.Graphics().p("AAQj7IAAghIBfAAIAAAhg");
	var mask_graphics_400 = new cjs.Graphics().p("AAQj6IAAgjIBfAAIAAAjg");
	var mask_graphics_401 = new cjs.Graphics().p("AAQj5IAAglIBfAAIAAAlg");
	var mask_graphics_402 = new cjs.Graphics().p("AAQj4IAAgnIBfAAIAAAng");
	var mask_graphics_403 = new cjs.Graphics().p("AAQj3IAAgpIBfAAIAAApg");
	var mask_graphics_404 = new cjs.Graphics().p("AAQj2IAAgrIBfAAIAAArg");
	var mask_graphics_405 = new cjs.Graphics().p("AAQj1IAAgtIBfAAIAAAtg");
	var mask_graphics_406 = new cjs.Graphics().p("AAQj0IAAgvIBfAAIAAAvg");
	var mask_graphics_407 = new cjs.Graphics().p("AAQjzIAAgxIBfAAIAAAxg");
	var mask_graphics_408 = new cjs.Graphics().p("AAQjyIAAgzIBfAAIAAAzg");
	var mask_graphics_409 = new cjs.Graphics().p("AAQjxIAAg1IBfAAIAAA1g");
	var mask_graphics_410 = new cjs.Graphics().p("AAQjwIAAg3IBfAAIAAA3g");
	var mask_graphics_411 = new cjs.Graphics().p("AAQjvIAAg5IBfAAIAAA5g");
	var mask_graphics_412 = new cjs.Graphics().p("AAQjuIAAg7IBfAAIAAA7g");
	var mask_graphics_413 = new cjs.Graphics().p("AAQjtIAAg9IBfAAIAAA9g");
	var mask_graphics_414 = new cjs.Graphics().p("AAQjsIAAg/IBfAAIAAA/g");
	var mask_graphics_415 = new cjs.Graphics().p("AAQjrIAAhBIBfAAIAABBg");
	var mask_graphics_416 = new cjs.Graphics().p("AAQjqIAAhDIBfAAIAABDg");
	var mask_graphics_417 = new cjs.Graphics().p("AAQjpIAAhFIBfAAIAABFg");
	var mask_graphics_418 = new cjs.Graphics().p("AAQjoIAAhHIBfAAIAABHg");
	var mask_graphics_419 = new cjs.Graphics().p("AAQjnIAAhJIBfAAIAABJg");
	var mask_graphics_420 = new cjs.Graphics().p("AAQjlIAAhMIBfAAIAABMg");
	var mask_graphics_421 = new cjs.Graphics().p("AAQjkIAAhOIBfAAIAABOg");
	var mask_graphics_422 = new cjs.Graphics().p("AAQjjIAAhQIBfAAIAABQg");
	var mask_graphics_423 = new cjs.Graphics().p("AAQjiIAAhTIBfAAIAABTg");
	var mask_graphics_424 = new cjs.Graphics().p("AAQjhIAAhVIBfAAIAABVg");
	var mask_graphics_425 = new cjs.Graphics().p("AAQjgIAAhXIBfAAIAABXg");
	var mask_graphics_426 = new cjs.Graphics().p("AAQjfIAAhZIBfAAIAABZg");
	var mask_graphics_427 = new cjs.Graphics().p("AAQjeIAAhbIBfAAIAABbg");
	var mask_graphics_428 = new cjs.Graphics().p("AAQjdIAAhdIBfAAIAABdg");
	var mask_graphics_429 = new cjs.Graphics().p("AAQjcIAAhfIBfAAIAABfg");
	var mask_graphics_430 = new cjs.Graphics().p("AAQjbIAAhhIBfAAIAABhg");
	var mask_graphics_431 = new cjs.Graphics().p("AAQjaIAAhjIBfAAIAABjg");
	var mask_graphics_432 = new cjs.Graphics().p("AAQjZIAAhlIBfAAIAABlg");
	var mask_graphics_433 = new cjs.Graphics().p("AAQjYIAAhnIBfAAIAABng");
	var mask_graphics_434 = new cjs.Graphics().p("AAQjXIAAhpIBfAAIAABpg");
	var mask_graphics_435 = new cjs.Graphics().p("AAQjWIAAhrIBfAAIAABrg");
	var mask_graphics_436 = new cjs.Graphics().p("AAQjVIAAhtIBfAAIAABtg");
	var mask_graphics_437 = new cjs.Graphics().p("AAQjUIAAhvIBfAAIAABvg");
	var mask_graphics_438 = new cjs.Graphics().p("AAQjTIAAhxIBfAAIAABxg");
	var mask_graphics_439 = new cjs.Graphics().p("AAQjSIAAhzIBfAAIAABzg");
	var mask_graphics_440 = new cjs.Graphics().p("AAQjRIAAh1IBfAAIAAB1g");
	var mask_graphics_441 = new cjs.Graphics().p("AAQjQIAAh3IBfAAIAAB3g");
	var mask_graphics_442 = new cjs.Graphics().p("AAQjPIAAh5IBfAAIAAB5g");
	var mask_graphics_443 = new cjs.Graphics().p("AAQjOIAAh7IBfAAIAAB7g");
	var mask_graphics_444 = new cjs.Graphics().p("AAQjNIAAh9IBfAAIAAB9g");
	var mask_graphics_445 = new cjs.Graphics().p("AAQjMIAAh/IBfAAIAAB/g");
	var mask_graphics_446 = new cjs.Graphics().p("AAQjLIAAiBIBfAAIAACBg");
	var mask_graphics_447 = new cjs.Graphics().p("AAQjKIAAiDIBfAAIAACDg");
	var mask_graphics_448 = new cjs.Graphics().p("AAQjIIAAiGIBfAAIAACGg");
	var mask_graphics_449 = new cjs.Graphics().p("AAQjHIAAiIIBfAAIAACIg");
	var mask_graphics_450 = new cjs.Graphics().p("AAQjGIAAiKIBfAAIAACKg");
	var mask_graphics_451 = new cjs.Graphics().p("AAQjFIAAiMIBfAAIAACMg");
	var mask_graphics_452 = new cjs.Graphics().p("AAQjEIAAiPIBfAAIAACPg");
	var mask_graphics_453 = new cjs.Graphics().p("AAQjDIAAiRIBfAAIAACRg");
	var mask_graphics_454 = new cjs.Graphics().p("AAQjCIAAiTIBfAAIAACTg");
	var mask_graphics_455 = new cjs.Graphics().p("AAQjBIAAiVIBfAAIAACVg");
	var mask_graphics_456 = new cjs.Graphics().p("AAQjAIAAiXIBfAAIAACXg");
	var mask_graphics_457 = new cjs.Graphics().p("AAQi/IAAiZIBfAAIAACZg");
	var mask_graphics_458 = new cjs.Graphics().p("AAQi+IAAibIBfAAIAACbg");
	var mask_graphics_459 = new cjs.Graphics().p("AAQi9IAAidIBfAAIAACdg");
	var mask_graphics_460 = new cjs.Graphics().p("AAQi8IAAifIBfAAIAACfg");
	var mask_graphics_461 = new cjs.Graphics().p("AAQi7IAAihIBfAAIAAChg");
	var mask_graphics_462 = new cjs.Graphics().p("AAQi6IAAijIBfAAIAACjg");
	var mask_graphics_463 = new cjs.Graphics().p("AAQi5IAAilIBfAAIAAClg");
	var mask_graphics_464 = new cjs.Graphics().p("AAQi4IAAinIBfAAIAACng");
	var mask_graphics_465 = new cjs.Graphics().p("AAQi3IAAipIBfAAIAACpg");
	var mask_graphics_466 = new cjs.Graphics().p("AAQi2IAAirIBfAAIAACrg");
	var mask_graphics_467 = new cjs.Graphics().p("AAQi1IAAitIBfAAIAACtg");
	var mask_graphics_468 = new cjs.Graphics().p("AAQi0IAAivIBfAAIAACvg");
	var mask_graphics_469 = new cjs.Graphics().p("AAQizIAAixIBfAAIAACxg");
	var mask_graphics_470 = new cjs.Graphics().p("AAQiyIAAizIBfAAIAACzg");
	var mask_graphics_471 = new cjs.Graphics().p("AAQixIAAi1IBfAAIAAC1g");
	var mask_graphics_472 = new cjs.Graphics().p("AAQiwIAAi3IBfAAIAAC3g");
	var mask_graphics_473 = new cjs.Graphics().p("AAQivIAAi5IBfAAIAAC5g");
	var mask_graphics_474 = new cjs.Graphics().p("AAQiuIAAi7IBfAAIAAC7g");
	var mask_graphics_475 = new cjs.Graphics().p("AAQitIAAi9IBfAAIAAC9g");
	var mask_graphics_476 = new cjs.Graphics().p("AAQirIAAjAIBfAAIAADAg");
	var mask_graphics_477 = new cjs.Graphics().p("AAQiqIAAjCIBfAAIAADCg");
	var mask_graphics_478 = new cjs.Graphics().p("AAQipIAAjEIBfAAIAADEg");
	var mask_graphics_479 = new cjs.Graphics().p("AAQioIAAjGIBfAAIAADGg");
	var mask_graphics_480 = new cjs.Graphics().p("AAQinIAAjIIBfAAIAADIg");
	var mask_graphics_481 = new cjs.Graphics().p("AAQimIAAjKIBfAAIAADKg");
	var mask_graphics_482 = new cjs.Graphics().p("AAQilIAAjNIBfAAIAADNg");
	var mask_graphics_483 = new cjs.Graphics().p("AAQikIAAjPIBfAAIAADPg");
	var mask_graphics_484 = new cjs.Graphics().p("AAQijIAAjRIBfAAIAADRg");
	var mask_graphics_485 = new cjs.Graphics().p("AAQiiIAAjTIBfAAIAADTg");
	var mask_graphics_486 = new cjs.Graphics().p("AAQihIAAjVIBfAAIAADVg");
	var mask_graphics_487 = new cjs.Graphics().p("AAQigIAAjXIBfAAIAADXg");
	var mask_graphics_488 = new cjs.Graphics().p("AAQifIAAjZIBfAAIAADZg");
	var mask_graphics_489 = new cjs.Graphics().p("AAQieIAAjbIBfAAIAADbg");
	var mask_graphics_490 = new cjs.Graphics().p("AAQidIAAjdIBfAAIAADdg");
	var mask_graphics_491 = new cjs.Graphics().p("AAQicIAAjfIBfAAIAADfg");
	var mask_graphics_492 = new cjs.Graphics().p("AAQibIAAjhIBfAAIAADhg");
	var mask_graphics_493 = new cjs.Graphics().p("AAQiaIAAjjIBfAAIAADjg");
	var mask_graphics_494 = new cjs.Graphics().p("AAQiXIAAjoIBfAAIAADog");
	var mask_graphics_495 = new cjs.Graphics().p("AAQiVIAAjtIBfAAIAADtg");
	var mask_graphics_496 = new cjs.Graphics().p("AAQiTIAAjxIBfAAIAADxg");
	var mask_graphics_497 = new cjs.Graphics().p("AAQiQIAAj2IBfAAIAAD2g");
	var mask_graphics_498 = new cjs.Graphics().p("AAQiOIAAj7IBfAAIAAD7g");
	var mask_graphics_499 = new cjs.Graphics().p("AAQiMIAAj/IBfAAIAAD/g");
	var mask_graphics_500 = new cjs.Graphics().p("AAQiJIAAkEIBfAAIAAEEg");
	var mask_graphics_501 = new cjs.Graphics().p("AAQiHIAAkJIBfAAIAAEJg");
	var mask_graphics_502 = new cjs.Graphics().p("AAQiEIAAkOIBfAAIAAEOg");
	var mask_graphics_503 = new cjs.Graphics().p("AAQiCIAAkTIBfAAIAAETg");
	var mask_graphics_504 = new cjs.Graphics().p("AAQiAIAAkXIBfAAIAAEXg");
	var mask_graphics_505 = new cjs.Graphics().p("AAQh9IAAkcIBfAAIAAEcg");
	var mask_graphics_506 = new cjs.Graphics().p("AAQh7IAAkhIBfAAIAAEhg");
	var mask_graphics_507 = new cjs.Graphics().p("AAQh4IAAkmIBfAAIAAEmg");
	var mask_graphics_508 = new cjs.Graphics().p("AAQh2IAAkqIBfAAIAAEqg");
	var mask_graphics_509 = new cjs.Graphics().p("AAQh0IAAkvIBfAAIAAEvg");
	var mask_graphics_510 = new cjs.Graphics().p("AAQhxIAAk0IBfAAIAAE0g");
	var mask_graphics_511 = new cjs.Graphics().p("AAQhvIAAk4IBfAAIAAE4g");
	var mask_graphics_512 = new cjs.Graphics().p("AAQhtIAAk9IBfAAIAAE9g");
	var mask_graphics_513 = new cjs.Graphics().p("AAQhqIAAlCIBfAAIAAFCg");
	var mask_graphics_514 = new cjs.Graphics().p("AAQhoIAAlHIBfAAIAAFHg");
	var mask_graphics_515 = new cjs.Graphics().p("AAQhlIAAlMIBfAAIAAFMg");
	var mask_graphics_516 = new cjs.Graphics().p("AAQhjIAAlQIBfAAIAAFQg");
	var mask_graphics_517 = new cjs.Graphics().p("AAQhhIAAlVIBfAAIAAFVg");
	var mask_graphics_518 = new cjs.Graphics().p("AAQheIAAlaIBfAAIAAFag");
	var mask_graphics_519 = new cjs.Graphics().p("AAQhcIAAleIBfAAIAAFeg");
	var mask_graphics_520 = new cjs.Graphics().p("AAQhZIAAlkIBfAAIAAFkg");
	var mask_graphics_521 = new cjs.Graphics().p("AAQhXIAAloIBfAAIAAFog");
	var mask_graphics_522 = new cjs.Graphics().p("AAQhVIAAltIBfABIAAFsg");
	var mask_graphics_523 = new cjs.Graphics().p("AAQhSIAAlyIBfAAIAAFyg");
	var mask_graphics_524 = new cjs.Graphics().p("AAQhQIAAl2IBfAAIAAF2g");
	var mask_graphics_525 = new cjs.Graphics().p("AAQhNIAAl8IBfAAIAAF8g");
	var mask_graphics_526 = new cjs.Graphics().p("AAQhLIAAmAIBfAAIAAGAg");
	var mask_graphics_527 = new cjs.Graphics().p("AAQhJIAAmEIBfAAIAAGEg");
	var mask_graphics_528 = new cjs.Graphics().p("AAQhGIAAmKIBfAAIAAGKg");
	var mask_graphics_529 = new cjs.Graphics().p("AAQhEIAAmOIBfAAIAAGOg");
	var mask_graphics_530 = new cjs.Graphics().p("AAQhCIAAmSIBfAAIAAGSg");
	var mask_graphics_531 = new cjs.Graphics().p("AAQg/IAAmYIBfAAIAAGYg");
	var mask_graphics_532 = new cjs.Graphics().p("AAQg9IAAmcIBfAAIAAGcg");
	var mask_graphics_533 = new cjs.Graphics().p("AAQg6IAAmiIBfAAIAAGig");
	var mask_graphics_534 = new cjs.Graphics().p("AAQg4IAAmmIBfAAIAAGmg");
	var mask_graphics_535 = new cjs.Graphics().p("AAQg2IAAmqIBfAAIAAGqg");
	var mask_graphics_536 = new cjs.Graphics().p("AAQgzIAAmwIBfAAIAAGwg");
	var mask_graphics_537 = new cjs.Graphics().p("AAQgxIAAm0IBfAAIAAG0g");
	var mask_graphics_612 = new cjs.Graphics().p("AAInZIAMgcIBXAnIgMAcg");
	var mask_graphics_613 = new cjs.Graphics().p("AAHnWIAOgeIBWAmIgNAfg");
	var mask_graphics_614 = new cjs.Graphics().p("AAGnTIAPghIBWAmIgOAhg");
	var mask_graphics_615 = new cjs.Graphics().p("AAEnQIARgkIBWAmIgQAkg");
	var mask_graphics_616 = new cjs.Graphics().p("AADnNIASgnIBWAmIgRAng");
	var mask_graphics_617 = new cjs.Graphics().p("AACnKIATgqIBWAmIgTAqg");
	var mask_graphics_618 = new cjs.Graphics().p("AABnHIAUgtIBWAmIgUAug");
	var mask_graphics_619 = new cjs.Graphics().p("AAAnEIAVgwIBWAmIgVAxg");
	var mask_graphics_620 = new cjs.Graphics().p("AgBnBIAWgzIBWAmIgWA0g");
	var mask_graphics_621 = new cjs.Graphics().p("AgDm/IAYg2IBWAnIgYA2g");
	var mask_graphics_622 = new cjs.Graphics().p("AgEm7IAYg5IBXAmIgZA5g");
	var mask_graphics_623 = new cjs.Graphics().p("AgFm5IAag8IBWAnIgaA8g");
	var mask_graphics_624 = new cjs.Graphics().p("AgGm1IAbg/IBWAmIgcA/g");
	var mask_graphics_625 = new cjs.Graphics().p("AgHmyIAchCIBWAnIgdBBg");
	var mask_graphics_626 = new cjs.Graphics().p("AgJmwIAehFIBXAnIgfBFg");
	var mask_graphics_627 = new cjs.Graphics().p("AgKmtIAfhHIBWAmIggBIg");
	var mask_graphics_628 = new cjs.Graphics().p("AgMmpIAghLIBXAnIghBKg");
	var mask_graphics_629 = new cjs.Graphics().p("AgNmnIAhhNIBXAmIgjBOg");
	var mask_graphics_630 = new cjs.Graphics().p("AgOmjIAjhRIBWAnIgkBQg");
	var mask_graphics_631 = new cjs.Graphics().p("AgQmgIAlhUIBWAmIglBVg");
	var mask_graphics_632 = new cjs.Graphics().p("AgRmdIAmhXIBWAmIgnBYg");
	var mask_graphics_633 = new cjs.Graphics().p("AgUmZIAohbIBXAmIgpBcg");
	var mask_graphics_634 = new cjs.Graphics().p("AgVmVIAqhfIBWAmIgqBgg");
	var mask_graphics_635 = new cjs.Graphics().p("AgXmRIAshjIBWAmIgsBkg");
	var mask_graphics_636 = new cjs.Graphics().p("AgYmNIAthnIBWAmIguBog");
	var mask_graphics_637 = new cjs.Graphics().p("AgamJIAvhrIBWAmIgwBsg");
	var mask_graphics_638 = new cjs.Graphics().p("AgcmFIAwhwIBXAnIgyBvg");
	var mask_graphics_639 = new cjs.Graphics().p("AgemBIAzhzIBWAmIgzBzg");
	var mask_graphics_640 = new cjs.Graphics().p("Aggl9IA1h3IBWAmIg1B4g");
	var mask_graphics_641 = new cjs.Graphics().p("Aghl5IA2h8IBWAnIg3B7g");
	var mask_graphics_642 = new cjs.Graphics().p("Agjl1IA4h/IBWAmIg4B/g");
	var mask_graphics_643 = new cjs.Graphics().p("AgllxIA6iDIBWAmIg6CDg");
	var mask_graphics_644 = new cjs.Graphics().p("AgmluIA7iHIBWAnIg8CHg");
	var mask_graphics_645 = new cjs.Graphics().p("AgolqIA9iLIBWAnIg+CLg");
	var mask_graphics_646 = new cjs.Graphics().p("AgqlmIA/iPIBWAnIg/CPg");
	var mask_graphics_647 = new cjs.Graphics().p("AgsliIBBiSIBWAmIhBCTg");
	var mask_graphics_648 = new cjs.Graphics().p("AgtleIBCiWIBWAmIhDCXg");
	var mask_graphics_649 = new cjs.Graphics().p("AgvlaIBEiaIBXAmIhFCbg");
	var mask_graphics_650 = new cjs.Graphics().p("AgxlWIBGieIBXAmIhHCfg");
	var mask_graphics_651 = new cjs.Graphics().p("AgylSIBHiiIBXAmIhJCjg");
	var mask_graphics_652 = new cjs.Graphics().p("Ag0lOIBJimIBWAmIhKCng");
	var mask_graphics_653 = new cjs.Graphics().p("Ag2lKIBLiqIBWAmIhMCrg");
	var mask_graphics_654 = new cjs.Graphics().p("Ag4lGIBNiuIBXAmIhOCvg");
	var mask_graphics_655 = new cjs.Graphics().p("Ag6lCIBPiyIBWAmIhPCzg");
	var mask_graphics_656 = new cjs.Graphics().p("Ag7k+IBQi2IBXAmIhSC3g");
	var mask_graphics_657 = new cjs.Graphics().p("Ag9k6IBSi6IBWAmIhTC7g");
	var mask_graphics_658 = new cjs.Graphics().p("Ag/k2IBUi+IBWAmIhVC/g");
	var mask_graphics_659 = new cjs.Graphics().p("AhAkyIBVjCIBXAmIhXDDg");
	var mask_graphics_660 = new cjs.Graphics().p("AhDkuIBYjGIBWAmIhYDHg");
	var mask_graphics_661 = new cjs.Graphics().p("AhEkqIBZjKIBXAmIhbDLg");
	var mask_graphics_662 = new cjs.Graphics().p("AhGkmIBbjOIBXAnIhcDOg");
	var mask_graphics_663 = new cjs.Graphics().p("AhIkiIBdjTIBXAnIheDSg");
	var mask_graphics_664 = new cjs.Graphics().p("AhKkeIBfjWIBWAmIhfDWg");
	var mask_graphics_665 = new cjs.Graphics().p("AhLkaIBgjaIBWAnIhhDag");
	var mask_graphics_666 = new cjs.Graphics().p("AhNkXIBijeIBWAnIhjDeg");
	var mask_graphics_667 = new cjs.Graphics().p("AhPkTIBkjiIBXAnIhlDig");
	var mask_graphics_668 = new cjs.Graphics().p("AhQkPIBljlIBXAmIhnDmg");
	var mask_graphics_669 = new cjs.Graphics().p("AhSkLIBnjqIBXAnIhpDqg");
	var mask_graphics_670 = new cjs.Graphics().p("AhUkHIBpjuIBXAnIhqDug");
	var mask_graphics_671 = new cjs.Graphics().p("AhWkDIBrjyIBXAnIhsDyg");
	var mask_graphics_672 = new cjs.Graphics().p("AhYj/IBtj1IBWAmIhsD2g");
	var mask_graphics_673 = new cjs.Graphics().p("Ahaj7IBvj6IBWAnIhuD6g");
	var mask_graphics_674 = new cjs.Graphics().p("Ahbj3IBwj+IBXAnIhxD+g");
	var mask_graphics_675 = new cjs.Graphics().p("AhdjzIBykCIBWAnIhxECg");
	var mask_graphics_676 = new cjs.Graphics().p("AhfjvIB0kFIBWAmIhzEGg");
	var mask_graphics_677 = new cjs.Graphics().p("AhgjrIB1kKIBXAnIh2EKg");
	var mask_graphics_678 = new cjs.Graphics().p("AhijnIB3kOIBXAnIh4EOg");
	var mask_graphics_679 = new cjs.Graphics().p("AhkjjIB5kRIBXAmIh5ESg");
	var mask_graphics_680 = new cjs.Graphics().p("AhmjgIB7kVIBXAnIh7EVg");
	var mask_graphics_681 = new cjs.Graphics().p("AhojbIB9kaIBWAnIh8EZg");
	var mask_graphics_682 = new cjs.Graphics().p("AhpjXIB+keIBWAnIh+Edg");
	var mask_graphics_683 = new cjs.Graphics().p("AhrjUICAkhIBXAnIiAEhg");
	var mask_graphics_684 = new cjs.Graphics().p("AhsjQICCklIBXAnIiCElg");
	var mask_graphics_685 = new cjs.Graphics().p("AhtjMICEkpIBXAnIiEEpg");
	var mask_graphics_686 = new cjs.Graphics().p("AhtjIICFktIBWAnIiFEtg");
	var mask_graphics_687 = new cjs.Graphics().p("AhujEICHkxIBWAnIiHExg");
	var mask_graphics_688 = new cjs.Graphics().p("AhvjAICJk1IBWAnIiJE1g");
	var mask_graphics_689 = new cjs.Graphics().p("Ahwi8ICKk5IBXAnIiKE5g");
	var mask_graphics_690 = new cjs.Graphics().p("Ahxi4ICMk9IBXAnIiME9g");
	var mask_graphics_691 = new cjs.Graphics().p("Ahyi0ICOlBIBXAnIiOFBg");
	var mask_graphics_692 = new cjs.Graphics().p("AhziwICQlFIBXAnIiQFFg");
	var mask_graphics_693 = new cjs.Graphics().p("Ah0isICSlJIBXAmIiSFJg");
	var mask_graphics_694 = new cjs.Graphics().p("Ah1ioICUlNIBXAmIiUFNg");
	var mask_graphics_695 = new cjs.Graphics().p("Ah1ikICVlRIBWAnIiVFQg");
	var mask_graphics_696 = new cjs.Graphics().p("Ah2igICXlVIBWAnIiXFUg");
	var mask_graphics_697 = new cjs.Graphics().p("Ah3icICZlZIBWAnIiZFYg");
	var mask_graphics_698 = new cjs.Graphics().p("Ah4iYICaldIBXAnIiaFcg");
	var mask_graphics_699 = new cjs.Graphics().p("Ah5iVICclgIBXAnIicFgg");
	var mask_graphics_700 = new cjs.Graphics().p("Ah6iRICelkIBXAnIieFkg");
	var mask_graphics_701 = new cjs.Graphics().p("Ah7iNICgloIBXAnIigFog");
	var mask_graphics_702 = new cjs.Graphics().p("Ah8iJICilsIBXAnIiiFsg");
	var mask_graphics_703 = new cjs.Graphics().p("Ah8iFICjlwIBWAmIijFxg");
	var mask_graphics_704 = new cjs.Graphics().p("Ah9iBICll0IBWAmIilF1g");
	var mask_graphics_705 = new cjs.Graphics().p("Ah+h9ICnl4IBWAmIinF5g");
	var mask_graphics_706 = new cjs.Graphics().p("Ah/h5ICol8IBXAmIioF9g");
	var mask_graphics_707 = new cjs.Graphics().p("AiAh1ICqmAIBXAmIiqGBg");
	var mask_graphics_708 = new cjs.Graphics().p("AiBhxICsmEIBXAmIisGFg");
	var mask_graphics_709 = new cjs.Graphics().p("AiChtICumIIBXAmIiuGJg");
	var mask_graphics_710 = new cjs.Graphics().p("AiDhpICwmMIBXAmIiwGNg");
	var mask_graphics_711 = new cjs.Graphics().p("AiEhlICymQIBXAmIiyGRg");
	var mask_graphics_712 = new cjs.Graphics().p("AiEhhICzmUIBWAmIizGUg");
	var mask_graphics_713 = new cjs.Graphics().p("AiFhdIC1mYIBWAmIi1GYg");
	var mask_graphics_714 = new cjs.Graphics().p("AiGhZIC3mcIBWAnIi3Gcg");
	var mask_graphics_715 = new cjs.Graphics().p("AiHhVIC4mgIBXAnIi4Ggg");
	var mask_graphics_716 = new cjs.Graphics().p("AiIhRIC6mkIBXAnIi6Gjg");
	var mask_graphics_717 = new cjs.Graphics().p("AiJhNIC8moIBXAnIi8Gng");
	var mask_graphics_718 = new cjs.Graphics().p("AiKhJIC+msIBXAmIi+Gsg");
	var mask_graphics_719 = new cjs.Graphics().p("AiLhGIDAmvIBXAmIjAGwg");
	var mask_graphics_720 = new cjs.Graphics().p("AiLhCIDBmzIBWAmIjBG0g");
	var mask_graphics_721 = new cjs.Graphics().p("AiMg+IDDm4IBWAnIjDG4g");
	var mask_graphics_722 = new cjs.Graphics().p("AiNg6IDFm7IBWAmIjFG8g");
	var mask_graphics_723 = new cjs.Graphics().p("AiOg2IDGm/IBXAmIjGHAg");
	var mask_graphics_724 = new cjs.Graphics().p("AiPgyIDInDIBXAmIjIHEg");
	var mask_graphics_725 = new cjs.Graphics().p("AiQguIDKnHIBXAmIjKHIg");
	var mask_graphics_726 = new cjs.Graphics().p("AiRgqIDMnLIBXAmIjMHMg");
	var mask_graphics_727 = new cjs.Graphics().p("AiSgmIDOnPIBXAmIjOHPg");
	var mask_graphics_728 = new cjs.Graphics().p("AiTghIDQnUIBXAmIjQHTg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:null,x:0,y:0}).wait(394).to({graphics:mask_graphics_394,x:11.1,y:-27.955}).wait(1).to({graphics:mask_graphics_395,x:11.1,y:-28.0584}).wait(1).to({graphics:mask_graphics_396,x:11.1,y:-28.1618}).wait(1).to({graphics:mask_graphics_397,x:11.1,y:-28.2652}).wait(1).to({graphics:mask_graphics_398,x:11.1,y:-28.3685}).wait(1).to({graphics:mask_graphics_399,x:11.1,y:-28.4719}).wait(1).to({graphics:mask_graphics_400,x:11.1,y:-28.5753}).wait(1).to({graphics:mask_graphics_401,x:11.1,y:-28.6787}).wait(1).to({graphics:mask_graphics_402,x:11.1,y:-28.7821}).wait(1).to({graphics:mask_graphics_403,x:11.1,y:-28.8855}).wait(1).to({graphics:mask_graphics_404,x:11.1,y:-28.9889}).wait(1).to({graphics:mask_graphics_405,x:11.1,y:-29.0922}).wait(1).to({graphics:mask_graphics_406,x:11.1,y:-29.1956}).wait(1).to({graphics:mask_graphics_407,x:11.1,y:-29.299}).wait(1).to({graphics:mask_graphics_408,x:11.1,y:-29.4024}).wait(1).to({graphics:mask_graphics_409,x:11.1,y:-29.5058}).wait(1).to({graphics:mask_graphics_410,x:11.1,y:-29.6092}).wait(1).to({graphics:mask_graphics_411,x:11.1,y:-29.7126}).wait(1).to({graphics:mask_graphics_412,x:11.1,y:-29.816}).wait(1).to({graphics:mask_graphics_413,x:11.1,y:-29.9193}).wait(1).to({graphics:mask_graphics_414,x:11.1,y:-30.0227}).wait(1).to({graphics:mask_graphics_415,x:11.1,y:-30.1261}).wait(1).to({graphics:mask_graphics_416,x:11.1,y:-30.2295}).wait(1).to({graphics:mask_graphics_417,x:11.1,y:-30.3329}).wait(1).to({graphics:mask_graphics_418,x:11.1,y:-30.4363}).wait(1).to({graphics:mask_graphics_419,x:11.1,y:-30.5397}).wait(1).to({graphics:mask_graphics_420,x:11.1,y:-30.643}).wait(1).to({graphics:mask_graphics_421,x:11.1,y:-30.7464}).wait(1).to({graphics:mask_graphics_422,x:11.1,y:-30.8498}).wait(1).to({graphics:mask_graphics_423,x:11.1,y:-30.9532}).wait(1).to({graphics:mask_graphics_424,x:11.1,y:-31.0566}).wait(1).to({graphics:mask_graphics_425,x:11.1,y:-31.16}).wait(1).to({graphics:mask_graphics_426,x:11.1,y:-31.2634}).wait(1).to({graphics:mask_graphics_427,x:11.1,y:-31.3667}).wait(1).to({graphics:mask_graphics_428,x:11.1,y:-31.4701}).wait(1).to({graphics:mask_graphics_429,x:11.1,y:-31.5735}).wait(1).to({graphics:mask_graphics_430,x:11.1,y:-31.6769}).wait(1).to({graphics:mask_graphics_431,x:11.1,y:-31.7803}).wait(1).to({graphics:mask_graphics_432,x:11.1,y:-31.8837}).wait(1).to({graphics:mask_graphics_433,x:11.1,y:-31.9871}).wait(1).to({graphics:mask_graphics_434,x:11.1,y:-32.0904}).wait(1).to({graphics:mask_graphics_435,x:11.1,y:-32.1938}).wait(1).to({graphics:mask_graphics_436,x:11.1,y:-32.2972}).wait(1).to({graphics:mask_graphics_437,x:11.1,y:-32.4006}).wait(1).to({graphics:mask_graphics_438,x:11.1,y:-32.504}).wait(1).to({graphics:mask_graphics_439,x:11.1,y:-32.6074}).wait(1).to({graphics:mask_graphics_440,x:11.1,y:-32.7108}).wait(1).to({graphics:mask_graphics_441,x:11.1,y:-32.8142}).wait(1).to({graphics:mask_graphics_442,x:11.1,y:-32.9175}).wait(1).to({graphics:mask_graphics_443,x:11.1,y:-33.0209}).wait(1).to({graphics:mask_graphics_444,x:11.1,y:-33.1243}).wait(1).to({graphics:mask_graphics_445,x:11.1,y:-33.2277}).wait(1).to({graphics:mask_graphics_446,x:11.1,y:-33.3311}).wait(1).to({graphics:mask_graphics_447,x:11.1,y:-33.4345}).wait(1).to({graphics:mask_graphics_448,x:11.1,y:-33.5379}).wait(1).to({graphics:mask_graphics_449,x:11.1,y:-33.6412}).wait(1).to({graphics:mask_graphics_450,x:11.1,y:-33.7446}).wait(1).to({graphics:mask_graphics_451,x:11.1,y:-33.848}).wait(1).to({graphics:mask_graphics_452,x:11.1,y:-33.9514}).wait(1).to({graphics:mask_graphics_453,x:11.1,y:-34.0548}).wait(1).to({graphics:mask_graphics_454,x:11.1,y:-34.1582}).wait(1).to({graphics:mask_graphics_455,x:11.1,y:-34.2616}).wait(1).to({graphics:mask_graphics_456,x:11.1,y:-34.3649}).wait(1).to({graphics:mask_graphics_457,x:11.1,y:-34.4683}).wait(1).to({graphics:mask_graphics_458,x:11.1,y:-34.5717}).wait(1).to({graphics:mask_graphics_459,x:11.1,y:-34.6751}).wait(1).to({graphics:mask_graphics_460,x:11.1,y:-34.7785}).wait(1).to({graphics:mask_graphics_461,x:11.1,y:-34.8819}).wait(1).to({graphics:mask_graphics_462,x:11.1,y:-34.9853}).wait(1).to({graphics:mask_graphics_463,x:11.1,y:-35.0886}).wait(1).to({graphics:mask_graphics_464,x:11.1,y:-35.192}).wait(1).to({graphics:mask_graphics_465,x:11.1,y:-35.2954}).wait(1).to({graphics:mask_graphics_466,x:11.1,y:-35.3988}).wait(1).to({graphics:mask_graphics_467,x:11.1,y:-35.5022}).wait(1).to({graphics:mask_graphics_468,x:11.1,y:-35.6056}).wait(1).to({graphics:mask_graphics_469,x:11.1,y:-35.709}).wait(1).to({graphics:mask_graphics_470,x:11.1,y:-35.8124}).wait(1).to({graphics:mask_graphics_471,x:11.1,y:-35.9157}).wait(1).to({graphics:mask_graphics_472,x:11.1,y:-36.0191}).wait(1).to({graphics:mask_graphics_473,x:11.1,y:-36.1225}).wait(1).to({graphics:mask_graphics_474,x:11.1,y:-36.2259}).wait(1).to({graphics:mask_graphics_475,x:11.1,y:-36.3293}).wait(1).to({graphics:mask_graphics_476,x:11.1,y:-36.4327}).wait(1).to({graphics:mask_graphics_477,x:11.1,y:-36.5361}).wait(1).to({graphics:mask_graphics_478,x:11.1,y:-36.6394}).wait(1).to({graphics:mask_graphics_479,x:11.1,y:-36.7428}).wait(1).to({graphics:mask_graphics_480,x:11.1,y:-36.8462}).wait(1).to({graphics:mask_graphics_481,x:11.1,y:-36.9496}).wait(1).to({graphics:mask_graphics_482,x:11.1,y:-37.053}).wait(1).to({graphics:mask_graphics_483,x:11.1,y:-37.1564}).wait(1).to({graphics:mask_graphics_484,x:11.1,y:-37.2598}).wait(1).to({graphics:mask_graphics_485,x:11.1,y:-37.3631}).wait(1).to({graphics:mask_graphics_486,x:11.1,y:-37.4665}).wait(1).to({graphics:mask_graphics_487,x:11.1,y:-37.5699}).wait(1).to({graphics:mask_graphics_488,x:11.1,y:-37.6733}).wait(1).to({graphics:mask_graphics_489,x:11.1,y:-37.7767}).wait(1).to({graphics:mask_graphics_490,x:11.1,y:-37.8801}).wait(1).to({graphics:mask_graphics_491,x:11.1,y:-37.9835}).wait(1).to({graphics:mask_graphics_492,x:11.1,y:-38.0869}).wait(1).to({graphics:mask_graphics_493,x:11.1,y:-38.1902}).wait(1).to({graphics:mask_graphics_494,x:11.1,y:-38.4268}).wait(1).to({graphics:mask_graphics_495,x:11.1,y:-38.6633}).wait(1).to({graphics:mask_graphics_496,x:11.1,y:-38.8999}).wait(1).to({graphics:mask_graphics_497,x:11.1,y:-39.1364}).wait(1).to({graphics:mask_graphics_498,x:11.1,y:-39.373}).wait(1).to({graphics:mask_graphics_499,x:11.1,y:-39.6095}).wait(1).to({graphics:mask_graphics_500,x:11.1,y:-39.8461}).wait(1).to({graphics:mask_graphics_501,x:11.1,y:-40.0826}).wait(1).to({graphics:mask_graphics_502,x:11.1,y:-40.3192}).wait(1).to({graphics:mask_graphics_503,x:11.1,y:-40.5557}).wait(1).to({graphics:mask_graphics_504,x:11.1,y:-40.7923}).wait(1).to({graphics:mask_graphics_505,x:11.1,y:-41.0288}).wait(1).to({graphics:mask_graphics_506,x:11.1,y:-41.2654}).wait(1).to({graphics:mask_graphics_507,x:11.1,y:-41.5019}).wait(1).to({graphics:mask_graphics_508,x:11.1,y:-41.7385}).wait(1).to({graphics:mask_graphics_509,x:11.1,y:-41.975}).wait(1).to({graphics:mask_graphics_510,x:11.1,y:-42.2116}).wait(1).to({graphics:mask_graphics_511,x:11.1,y:-42.4481}).wait(1).to({graphics:mask_graphics_512,x:11.1,y:-42.6847}).wait(1).to({graphics:mask_graphics_513,x:11.1,y:-42.9213}).wait(1).to({graphics:mask_graphics_514,x:11.1,y:-43.1578}).wait(1).to({graphics:mask_graphics_515,x:11.1,y:-43.3944}).wait(1).to({graphics:mask_graphics_516,x:11.1,y:-43.6309}).wait(1).to({graphics:mask_graphics_517,x:11.1,y:-43.8675}).wait(1).to({graphics:mask_graphics_518,x:11.1,y:-44.104}).wait(1).to({graphics:mask_graphics_519,x:11.1,y:-44.3406}).wait(1).to({graphics:mask_graphics_520,x:11.1,y:-44.5771}).wait(1).to({graphics:mask_graphics_521,x:11.1,y:-44.8137}).wait(1).to({graphics:mask_graphics_522,x:11.1,y:-45.0502}).wait(1).to({graphics:mask_graphics_523,x:11.1,y:-45.2868}).wait(1).to({graphics:mask_graphics_524,x:11.1,y:-45.5233}).wait(1).to({graphics:mask_graphics_525,x:11.1,y:-45.7599}).wait(1).to({graphics:mask_graphics_526,x:11.1,y:-45.9964}).wait(1).to({graphics:mask_graphics_527,x:11.1,y:-46.233}).wait(1).to({graphics:mask_graphics_528,x:11.1,y:-46.4695}).wait(1).to({graphics:mask_graphics_529,x:11.1,y:-46.7061}).wait(1).to({graphics:mask_graphics_530,x:11.1,y:-46.9426}).wait(1).to({graphics:mask_graphics_531,x:11.1,y:-47.1792}).wait(1).to({graphics:mask_graphics_532,x:11.1,y:-47.4157}).wait(1).to({graphics:mask_graphics_533,x:11.1,y:-47.6523}).wait(1).to({graphics:mask_graphics_534,x:11.1,y:-47.8888}).wait(1).to({graphics:mask_graphics_535,x:11.1,y:-48.1254}).wait(1).to({graphics:mask_graphics_536,x:11.1,y:-48.3619}).wait(1).to({graphics:mask_graphics_537,x:11.1,y:-48.6059}).wait(27).to({graphics:null,x:0,y:0}).wait(48).to({graphics:mask_graphics_612,x:10.7245,y:-50.1507}).wait(1).to({graphics:mask_graphics_613,x:10.7306,y:-50.1489}).wait(1).to({graphics:mask_graphics_614,x:10.7367,y:-50.147}).wait(1).to({graphics:mask_graphics_615,x:10.7194,y:-50.1455}).wait(1).to({graphics:mask_graphics_616,x:10.7222,y:-50.1392}).wait(1).to({graphics:mask_graphics_617,x:10.7249,y:-50.1328}).wait(1).to({graphics:mask_graphics_618,x:10.7276,y:-50.1265}).wait(1).to({graphics:mask_graphics_619,x:10.7303,y:-50.1201}).wait(1).to({graphics:mask_graphics_620,x:10.733,y:-50.1137}).wait(1).to({graphics:mask_graphics_621,x:10.7158,y:-50.1622}).wait(1).to({graphics:mask_graphics_622,x:10.6983,y:-50.1358}).wait(1).to({graphics:mask_graphics_623,x:10.7312,y:-50.1596}).wait(1).to({graphics:mask_graphics_624,x:10.739,y:-50.1332}).wait(1).to({graphics:mask_graphics_625,x:10.7467,y:-50.1067}).wait(1).to({graphics:mask_graphics_626,x:10.7543,y:-50.1555}).wait(1).to({graphics:mask_graphics_627,x:10.7371,y:-50.1291}).wait(1).to({graphics:mask_graphics_628,x:10.6948,y:-50.1027}).wait(1).to({graphics:mask_graphics_629,x:10.7025,y:-50.1261}).wait(1).to({graphics:mask_graphics_630,x:10.7103,y:-50.1}).wait(1).to({graphics:mask_graphics_631,x:10.7112,y:-50.1111}).wait(1).to({graphics:mask_graphics_632,x:10.7121,y:-50.1222}).wait(1).to({graphics:mask_graphics_633,x:10.681,y:-50.1208}).wait(1).to({graphics:mask_graphics_634,x:10.7251,y:-50.1445}).wait(1).to({graphics:mask_graphics_635,x:10.7316,y:-50.1432}).wait(1).to({graphics:mask_graphics_636,x:10.7381,y:-50.1418}).wait(1).to({graphics:mask_graphics_637,x:10.7072,y:-50.1155}).wait(1).to({graphics:mask_graphics_638,x:10.7012,y:-50.1641}).wait(1).to({graphics:mask_graphics_639,x:10.7202,y:-50.1378}).wait(1).to({graphics:mask_graphics_640,x:10.7142,y:-50.1115}).wait(1).to({graphics:mask_graphics_641,x:10.7082,y:-50.1601}).wait(1).to({graphics:mask_graphics_642,x:10.7274,y:-50.1338}).wait(1).to({graphics:mask_graphics_643,x:10.7338,y:-50.145}).wait(1).to({graphics:mask_graphics_644,x:10.7402,y:-50.1561}).wait(1).to({graphics:mask_graphics_645,x:10.7093,y:-50.1548}).wait(1).to({graphics:mask_graphics_646,x:10.7283,y:-50.1534}).wait(1).to({graphics:mask_graphics_647,x:10.7374,y:-50.1471}).wait(1).to({graphics:mask_graphics_648,x:10.7465,y:-50.1408}).wait(1).to({graphics:mask_graphics_649,x:10.7555,y:-50.1345}).wait(1).to({graphics:mask_graphics_650,x:10.7645,y:-50.1282}).wait(1).to({graphics:mask_graphics_651,x:10.7735,y:-50.1219}).wait(1).to({graphics:mask_graphics_652,x:10.7424,y:-50.1454}).wait(1).to({graphics:mask_graphics_653,x:10.7365,y:-50.1441}).wait(1).to({graphics:mask_graphics_654,x:10.7555,y:-50.1177}).wait(1).to({graphics:mask_graphics_655,x:10.7495,y:-50.1413}).wait(1).to({graphics:mask_graphics_656,x:10.7686,y:-50.1401}).wait(1).to({graphics:mask_graphics_657,x:10.7501,y:-50.1388}).wait(1).to({graphics:mask_graphics_658,x:10.7316,y:-50.1374}).wait(1).to({graphics:mask_graphics_659,x:10.7757,y:-50.1362}).wait(1).to({graphics:mask_graphics_660,x:10.7447,y:-50.1347}).wait(1).to({graphics:mask_graphics_661,x:10.7512,y:-50.1209}).wait(1).to({graphics:mask_graphics_662,x:10.7576,y:-50.1069}).wait(1).to({graphics:mask_graphics_663,x:10.7517,y:-50.1557}).wait(1).to({graphics:mask_graphics_664,x:10.7458,y:-50.1294}).wait(1).to({graphics:mask_graphics_665,x:10.7397,y:-50.1029}).wait(1).to({graphics:mask_graphics_666,x:10.7338,y:-50.1517}).wait(1).to({graphics:mask_graphics_667,x:10.7528,y:-50.1504}).wait(1).to({graphics:mask_graphics_668,x:10.7717,y:-50.149}).wait(1).to({graphics:mask_graphics_669,x:10.7658,y:-50.156}).wait(1).to({graphics:mask_graphics_670,x:10.7599,y:-50.163}).wait(1).to({graphics:mask_graphics_671,x:10.7539,y:-50.1699}).wait(1).to({graphics:mask_graphics_672,x:10.7478,y:-50.1436}).wait(1).to({graphics:mask_graphics_673,x:10.7418,y:-50.1672}).wait(1).to({graphics:mask_graphics_674,x:10.7607,y:-50.166}).wait(1).to({graphics:mask_graphics_675,x:10.7423,y:-50.1522}).wait(1).to({graphics:mask_graphics_676,x:10.7238,y:-50.1382}).wait(1).to({graphics:mask_graphics_677,x:10.7679,y:-50.162}).wait(1).to({graphics:mask_graphics_678,x:10.7619,y:-50.1607}).wait(1).to({graphics:mask_graphics_679,x:10.781,y:-50.1343}).wait(1).to({graphics:mask_graphics_680,x:10.7501,y:-50.208}).wait(1).to({graphics:mask_graphics_681,x:10.719,y:-50.1816}).wait(1).to({graphics:mask_graphics_682,x:10.738,y:-50.1804}).wait(1).to({graphics:mask_graphics_683,x:10.6837,y:-50.204}).wait(1).to({graphics:mask_graphics_684,x:10.5834,y:-50.1776}).wait(1).to({graphics:mask_graphics_685,x:10.4832,y:-50.2013}).wait(1).to({graphics:mask_graphics_686,x:10.433,y:-50.175}).wait(1).to({graphics:mask_graphics_687,x:10.3328,y:-50.1862}).wait(1).to({graphics:mask_graphics_688,x:10.2326,y:-50.1973}).wait(1).to({graphics:mask_graphics_689,x:10.1823,y:-50.1709}).wait(1).to({graphics:mask_graphics_690,x:10.0821,y:-50.1823}).wait(1).to({graphics:mask_graphics_691,x:9.9819,y:-50.1934}).wait(1).to({graphics:mask_graphics_692,x:9.9317,y:-50.1918}).wait(1).to({graphics:mask_graphics_693,x:9.7814,y:-50.2157}).wait(1).to({graphics:mask_graphics_694,x:9.7312,y:-50.2144}).wait(1).to({graphics:mask_graphics_695,x:9.681,y:-50.2129}).wait(1).to({graphics:mask_graphics_696,x:9.5308,y:-50.2117}).wait(1).to({graphics:mask_graphics_697,x:9.4805,y:-50.2103}).wait(1).to({graphics:mask_graphics_698,x:9.3803,y:-50.2089}).wait(1).to({graphics:mask_graphics_699,x:9.3301,y:-50.2076}).wait(1).to({graphics:mask_graphics_700,x:9.2299,y:-50.2062}).wait(1).to({graphics:mask_graphics_701,x:9.0797,y:-50.2048}).wait(1).to({graphics:mask_graphics_702,x:9.0294,y:-50.2037}).wait(1).to({graphics:mask_graphics_703,x:8.9292,y:-50.215}).wait(1).to({graphics:mask_graphics_704,x:8.829,y:-50.226}).wait(1).to({graphics:mask_graphics_705,x:8.7413,y:-50.2247}).wait(1).to({graphics:mask_graphics_706,x:8.6535,y:-50.2234}).wait(1).to({graphics:mask_graphics_707,x:8.5658,y:-50.2221}).wait(1).to({graphics:mask_graphics_708,x:8.4781,y:-50.2206}).wait(1).to({graphics:mask_graphics_709,x:8.3945,y:-50.2194}).wait(1).to({graphics:mask_graphics_710,x:8.311,y:-50.2181}).wait(1).to({graphics:mask_graphics_711,x:8.2274,y:-50.2166}).wait(1).to({graphics:mask_graphics_712,x:8.1772,y:-50.2154}).wait(1).to({graphics:mask_graphics_713,x:8.027,y:-50.2141}).wait(1).to({graphics:mask_graphics_714,x:7.9768,y:-50.1876}).wait(1).to({graphics:mask_graphics_715,x:7.8765,y:-50.1988}).wait(1).to({graphics:mask_graphics_716,x:7.7763,y:-50.2098}).wait(1).to({graphics:mask_graphics_717,x:7.7261,y:-50.2086}).wait(1).to({graphics:mask_graphics_718,x:7.6009,y:-50.22}).wait(1).to({graphics:mask_graphics_719,x:7.4756,y:-50.231}).wait(1).to({graphics:mask_graphics_720,x:7.4254,y:-50.2296}).wait(1).to({graphics:mask_graphics_721,x:7.3252,y:-50.2535}).wait(1).to({graphics:mask_graphics_722,x:7.25,y:-50.2397}).wait(1).to({graphics:mask_graphics_723,x:7.1747,y:-50.2257}).wait(1).to({graphics:mask_graphics_724,x:7.0745,y:-50.2492}).wait(1).to({graphics:mask_graphics_725,x:7.0243,y:-50.2479}).wait(1).to({graphics:mask_graphics_726,x:6.9241,y:-50.2466}).wait(1).to({graphics:mask_graphics_727,x:6.8738,y:-50.2452}).wait(1).to({graphics:mask_graphics_728,x:6.7736,y:-50.2361}).wait(27));

	// Masked_Layer_4___3
	this.instance_36 = new lib.shape164("synched",0);

	this.instance_37 = new lib.shape173("synched",0);

	var maskedShapeInstanceList = [this.instance_36,this.instance_37];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_36}]},394).to({state:[]},170).to({state:[{t:this.instance_37}]},48).wait(143));

	// Layer_3
	this.instance_38 = new lib.shape171("synched",0);

	this.instance_39 = new lib.shape172("synched",0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_38}]},581).to({state:[]},5).to({state:[{t:this.instance_39}]},5).to({state:[]},5).wait(159));

	// Layer_2
	this.instance_40 = new lib.shape114("synched",0);
	this.instance_40.setTransform(-299.7,-53.6,1,0.0015,90);
	this.instance_40._off = true;

	this.instance_41 = new lib.shape114_r("synched",0);
	this.instance_41.setTransform(-299.7,-97.8,1,0.0015,90);
	this.instance_41._off = true;

	this.instance_42 = new lib.text143("synched",0);
	this.instance_42.setTransform(-131,160.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_40}]},179).to({state:[{t:this.instance_40}]},2).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},2).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},4).to({state:[{t:this.instance_40}]},2).to({state:[{t:this.instance_40}]},3).to({state:[{t:this.instance_40}]},3).to({state:[{t:this.instance_40}]},3).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},2).to({state:[]},1).to({state:[{t:this.instance_41}]},329).to({state:[{t:this.instance_41}]},1).to({state:[{t:this.instance_41}]},1).to({state:[{t:this.instance_41}]},1).to({state:[{t:this.instance_41}]},1).to({state:[{t:this.instance_41}]},2).to({state:[{t:this.instance_41}]},4).to({state:[{t:this.instance_41}]},4).to({state:[{t:this.instance_41}]},3).to({state:[{t:this.instance_41}]},1).to({state:[{t:this.instance_41}]},1).to({state:[{t:this.instance_41}]},3).to({state:[{t:this.instance_41}]},1).to({state:[{t:this.instance_41}]},3).to({state:[{t:this.instance_41}]},8).to({state:[]},1).to({state:[{t:this.instance_42}]},9).to({state:[]},5).to({state:[{t:this.instance_42}]},5).to({state:[]},5).to({state:[{t:this.instance_40}]},132).to({state:[{t:this.instance_40}]},2).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},2).to({state:[{t:this.instance_40}]},3).to({state:[{t:this.instance_40}]},4).to({state:[{t:this.instance_40}]},4).to({state:[{t:this.instance_40}]},3).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},4).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_40).wait(179).to({_off:false},0).to({scaleY:0.016},2).to({scaleY:0.0341,x:-299.75},1).to({scaleY:0.0594,x:-299.7},1).to({scaleY:0.1318,x:-299.65},2).to({scaleY:0.1789,x:-299.7},1).to({scaleY:0.4395,x:-299.65},4).to({scaleY:0.6132,x:-299.7},2).to({scaleY:0.9281},3).to({scaleY:1.3082,x:-299.65},3).to({scaleY:1.7535,x:-299.7},3).to({scaleY:1.9163},1).to({alpha:0.6406},1).to({alpha:0.3594},1).to({alpha:0.1602},1).to({alpha:0},2).to({_off:true},1).wait(520).to({_off:false,scaleY:0.0015,alpha:1},0).to({scaleY:0.0121},2).to({scaleY:0.0253,x:-299.65},1).to({scaleY:0.0438,x:-299.7},1).to({scaleY:0.0676},1).to({scaleY:0.1309,x:-299.75},2).to({scaleY:0.2657,x:-299.7},3).to({scaleY:0.5193,x:-299.65},4).to({scaleY:0.8574,x:-299.7},4).to({scaleY:1.1664,x:-299.65},3).to({scaleY:1.28,x:-299.7},1).to({scaleY:1.7872},4).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_41).wait(537).to({_off:false},0).to({scaleY:0.0041,x:-299.75},1).to({scaleY:0.012,x:-299.7},1).to({scaleY:0.0251},1).to({scaleY:0.0435},1).to({scaleY:0.0961,x:-299.75},2).to({scaleY:0.2642},4).to({scaleY:0.5164,x:-299.7},4).to({scaleY:0.7608},3).to({scaleY:0.8528,x:-299.75},1).to({scaleY:0.95,x:-299.7},1).to({scaleY:1.2731,y:-97.85},3).to({scaleY:1.3913,x:-299.75},1).to({scaleY:1.7776},3).to({scaleY:1.9168,x:-299.7,alpha:0},8).to({_off:true},1).wait(183));

	// Layer_1
	this.instance_43 = new lib.shape114("synched",0);
	this.instance_43.setTransform(17.4,137.4,1,0.006);
	this.instance_43._off = true;

	this.instance_44 = new lib.shape114_r("synched",0);
	this.instance_44.setTransform(17.2,137.4,1,0.006);
	this.instance_44._off = true;

	this.instance_45 = new lib.shape111("synched",0);
	this.instance_45.setTransform(1322.65,216.25,4.6129,0.96);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_43}]},179).to({state:[{t:this.instance_43}]},1).to({state:[{t:this.instance_43}]},1).to({state:[{t:this.instance_43}]},1).to({state:[{t:this.instance_43}]},1).to({state:[{t:this.instance_43}]},1).to({state:[{t:this.instance_43}]},1).to({state:[{t:this.instance_43}]},2).to({state:[{t:this.instance_43}]},1).to({state:[{t:this.instance_43}]},3).to({state:[{t:this.instance_43}]},5).to({state:[{t:this.instance_43}]},5).to({state:[{t:this.instance_43}]},1).to({state:[{t:this.instance_43}]},1).to({state:[{t:this.instance_43}]},1).to({state:[{t:this.instance_43}]},1).to({state:[{t:this.instance_43}]},2).to({state:[]},1).to({state:[{t:this.instance_44}]},329).to({state:[{t:this.instance_44}]},1).to({state:[{t:this.instance_44}]},1).to({state:[{t:this.instance_44}]},1).to({state:[{t:this.instance_44}]},1).to({state:[{t:this.instance_44}]},1).to({state:[{t:this.instance_44}]},1).to({state:[{t:this.instance_44}]},2).to({state:[{t:this.instance_44}]},1).to({state:[{t:this.instance_44}]},5).to({state:[{t:this.instance_44}]},6).to({state:[{t:this.instance_44}]},6).to({state:[{t:this.instance_44}]},8).to({state:[]},1).to({state:[{t:this.instance_45}]},9).to({state:[]},5).to({state:[{t:this.instance_45}]},5).to({state:[]},5).to({state:[{t:this.instance_43}]},132).to({state:[{t:this.instance_43}]},1).to({state:[{t:this.instance_43}]},1).to({state:[{t:this.instance_43}]},1).to({state:[{t:this.instance_43}]},1).to({state:[{t:this.instance_43}]},1).to({state:[{t:this.instance_43}]},1).to({state:[{t:this.instance_43}]},1).to({state:[{t:this.instance_43}]},1).to({state:[{t:this.instance_43}]},1).to({state:[{t:this.instance_43}]},6).to({state:[{t:this.instance_43}]},3).to({state:[{t:this.instance_43}]},3).to({state:[{t:this.instance_43}]},5).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_43).wait(179).to({_off:false},0).to({scaleY:0.0082},1).to({scaleY:0.0147},1).to({scaleY:0.0256},1).to({scaleY:0.0408},1).to({scaleY:0.0603},1).to({scaleY:0.0843},1).to({scaleY:0.1451},2).to({scaleY:0.1821,y:137.45},1).to({scaleY:0.319,y:137.4},3).to({scaleY:0.6341,x:17.45,y:137.45},5).to({scaleY:1.0578,y:137.4},5).to({scaleY:1.1556},1).to({alpha:0.6406},1).to({alpha:0.3594},1).to({alpha:0.1602},1).to({alpha:0},2).to({_off:true},1).wait(520).to({_off:false,scaleY:0.006,x:-4,alpha:1},0).to({scaleY:0.0077},1).to({scaleY:0.0128},1).to({scaleY:0.0213},1).to({scaleY:0.0332},1).to({scaleY:0.0486},1).to({scaleY:0.0672},1).to({scaleY:0.0893},1).to({scaleY:0.1149},1).to({scaleY:0.1438},1).to({scaleY:0.3886},6).to({scaleY:0.557},3).to({scaleY:0.756,x:-4.05,y:137.45},3).to({scaleY:1.1556,y:137.4},5).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_44).wait(537).to({_off:false},0).to({scaleY:0.008},1).to({scaleY:0.0138},1).to({scaleY:0.0235},1).to({scaleY:0.0371},1).to({scaleY:0.0547},1).to({scaleY:0.0761},1).to({scaleY:0.1305},2).to({scaleY:0.1636,y:137.45},1).to({scaleY:0.3873},5).to({scaleY:0.7842,y:137.4},6).to({scaleY:1.3211,y:137.45},6).to({scaleY:1.4242,y:137.4,alpha:0},8).to({_off:true},1).wait(183));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-831.7,-159.1,864.4000000000001,364.9);


(lib.sprite156 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		/* stopAllSounds ();
		*/
	}
	this.frame_674 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(674).call(this.frame_674).wait(1));

	// Masked_Layer_19___12
	this.instance = new lib.shape86("synched",0);
	this.instance.setTransform(-154.65,182.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(675));

	// Masked_Layer_18___12
	this.instance_1 = new lib.text142("synched",0);
	this.instance_1.setTransform(-826.2,159.4,1.0001,1.0003);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(675));

	// Masked_Layer_17___12
	this.instance_2 = new lib.shape86("synched",0);
	this.instance_2.setTransform(-154.65,139.25);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(675));

	// Masked_Layer_16___12
	this.instance_3 = new lib.text141("synched",0);
	this.instance_3.setTransform(-826.2,114.5,1.0001,1.0003);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(675));

	// Masked_Layer_15___12
	this.instance_4 = new lib.text140("synched",0);
	this.instance_4.setTransform(-831.45,86.5,1.0001,0.9997);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(675));

	// Masked_Layer_14___12
	this.instance_5 = new lib.shape86("synched",0);
	this.instance_5.setTransform(-154.65,63.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(675));

	// Masked_Layer_13___12
	this.instance_6 = new lib.text139("synched",0);
	this.instance_6.setTransform(-826.2,40.1,1.0001,0.9997);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(675));

	// Layer_11_b
	this.instance_7 = new lib.shape115_b("synched",0);
	this.instance_7.setTransform(-27.95,-53.15);
	this.instance_7.alpha = 0;
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(129).to({_off:false},0).to({x:-31.2,y:-39.4,alpha:1},59).wait(1).to({startPosition:0},0).to({_off:true},5).wait(5).to({_off:false},0).to({_off:true},5).wait(5).to({_off:false},0).wait(466));

	// Layer_11
	this.instance_8 = new lib.shape115("synched",0);
	this.instance_8.setTransform(-18.25,-93.75);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).to({_off:true},54).wait(5).to({_off:false},0).to({_off:true},5).wait(5).to({_off:false},0).wait(5).to({startPosition:0},0).to({x:-27.05,y:-56.9},43).to({x:-27.95,y:-53.15},12).to({x:-31.2,y:-39.4},59).to({_off:true},1).wait(486));

	// Layer_10
	this.instance_9 = new lib.text135("synched",0);
	this.instance_9.setTransform(-379.6,-98.3);

	this.instance_10 = new lib.text134("synched",0);
	this.instance_10.setTransform(-379.6,-85.3);

	this.instance_11 = new lib.text149("synched",0);
	this.instance_11.setTransform(-379.6,-72.95);

	this.instance_12 = new lib.text151("synched",0);
	this.instance_12.setTransform(-379.6,-62.8);

	this.instance_13 = new lib.text153("synched",0);
	this.instance_13.setTransform(-379.6,-54.35);

	this.instance_14 = new lib.text155("synched",0);
	this.instance_14.setTransform(-379.6,-44.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_9}]}).to({state:[{t:this.instance_10}]},82).to({state:[{t:this.instance_11}]},11).to({state:[{t:this.instance_12}]},24).to({state:[{t:this.instance_13}]},22).to({state:[{t:this.instance_14}]},50).wait(486));

	// Layer_9
	this.instance_15 = new lib.shape111("synched",0);
	this.instance_15.setTransform(0,-40.35);

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(81).to({startPosition:0},0).wait(1).to({y:-27.35},0).to({startPosition:0},10).wait(1).to({y:-15},0).to({startPosition:0},23).wait(1).to({y:-0.35},0).to({startPosition:0},71).wait(1).to({y:17.85},0).wait(486));

	// Layer_8
	this.instance_16 = new lib.text134("synched",0);
	this.instance_16.setTransform(-90.8,144.75);

	this.instance_17 = new lib.text148("synched",0);
	this.instance_17.setTransform(-90.15,144.75);

	this.instance_18 = new lib.text150("synched",0);
	this.instance_18.setTransform(-96.8,144.75);

	this.instance_19 = new lib.text152("synched",0);
	this.instance_19.setTransform(-93.6,144.75);

	this.instance_20 = new lib.text154("synched",0);
	this.instance_20.setTransform(-102.3,144.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_16}]}).to({state:[{t:this.instance_17}]},93).to({state:[{t:this.instance_18}]},24).to({state:[{t:this.instance_19}]},22).to({state:[{t:this.instance_20}]},50).wait(486));

	// Layer_7
	this.instance_21 = new lib.shape111("synched",0);
	this.instance_21.setTransform(288.9,201.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(92).to({startPosition:0},0).wait(1).to({x:286.95},0).to({startPosition:0},23).wait(1).to({x:288.9},0).to({startPosition:0},21).wait(1).to({x:290.85},0).to({startPosition:0},49).wait(1).to({scaleX:1.6129,x:472.25},0).wait(486));

	// Layer_6
	this.instance_22 = new lib.shape138("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(675));

	// Layer_4
	this.instance_23 = new lib.text145("synched",0);
	this.instance_23.setTransform(-327.65,13.5,1,1,-89.9948);
	this.instance_23._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(4).to({_off:false},0).to({_off:true},5).wait(5).to({_off:false},0).to({_off:true},5).wait(656));

	// Mask_Layer_3 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_74 = new cjs.Graphics().p("Ah3m/IAHgdIBdAUIgHAcg");
	var mask_graphics_75 = new cjs.Graphics().p("Ah3m4IAHgkIBdAUIgHAkg");
	var mask_graphics_76 = new cjs.Graphics().p("Ah4mwIAJgsIBdAUIgJAsg");
	var mask_graphics_77 = new cjs.Graphics().p("Ah5moIALg0IBdAUIgLAzg");
	var mask_graphics_78 = new cjs.Graphics().p("Ah6mhIANg7IBdAUIgNA7g");
	var mask_graphics_79 = new cjs.Graphics().p("Ah6mZIAOhDIBdAUIgOBCg");
	var mask_graphics_80 = new cjs.Graphics().p("Ah7mSIAPhKIBdAUIgQBKg");
	var mask_graphics_81 = new cjs.Graphics().p("Ah8mKIAShSIBcAUIgRBSg");
	var mask_graphics_82 = new cjs.Graphics().p("Ah9mCIAThaIBdAUIgTBZg");
	var mask_graphics_83 = new cjs.Graphics().p("Ah9l7IAUhhIBdAUIgVBhg");
	var mask_graphics_84 = new cjs.Graphics().p("Ah+lzIAWhpIBdAUIgWBpg");
	var mask_graphics_85 = new cjs.Graphics().p("Ah/lsIAYhwIBdAUIgYBwg");
	var mask_graphics_86 = new cjs.Graphics().p("AiAlkIAah4IBcAUIgZB4g");
	var mask_graphics_87 = new cjs.Graphics().p("AiBlcIAbiAIBdAUIgbB/g");
	var mask_graphics_88 = new cjs.Graphics().p("AiClVIAdiHIBdAUIgdCHg");
	var mask_graphics_89 = new cjs.Graphics().p("AiClNIAeiPIBdAUIgfCPg");
	var mask_graphics_90 = new cjs.Graphics().p("AiDlFIAgiXIBdAUIggCWg");
	var mask_graphics_91 = new cjs.Graphics().p("AiEk+IAhieIBdAUIghCdg");
	var mask_graphics_92 = new cjs.Graphics().p("AiFk3IAjilIBdAUIgjClg");
	var mask_graphics_93 = new cjs.Graphics().p("AiFkvIAkitIBdAUIglCtg");
	var mask_graphics_94 = new cjs.Graphics().p("AiHknIAni1IBdAUIgnC1g");
	var mask_graphics_95 = new cjs.Graphics().p("AiHkgIAoi8IBdAUIgoC8g");
	var mask_graphics_96 = new cjs.Graphics().p("AiIkYIAqjDIBdATIgqDEg");
	var mask_graphics_97 = new cjs.Graphics().p("AiJkQIArjMIBdAUIgrDLg");
	var mask_graphics_98 = new cjs.Graphics().p("AiJkJIAsjTIBdAUIgtDTg");
	var mask_graphics_99 = new cjs.Graphics().p("AiKkBIAujaIBcATIgtDbg");
	var mask_graphics_100 = new cjs.Graphics().p("AiLj5IAwjiIBcATIgvDig");
	var mask_graphics_101 = new cjs.Graphics().p("AiMjyIAyjqIBcAUIgxDqg");
	var mask_graphics_102 = new cjs.Graphics().p("AiNjrIA0jxIBcAUIgzDxg");
	var mask_graphics_103 = new cjs.Graphics().p("AiNjjIA1j5IBcAUIg0D5g");
	var mask_graphics_104 = new cjs.Graphics().p("AiOjbIA2kAIBcATIg2EBg");
	var mask_graphics_105 = new cjs.Graphics().p("AiPjUIA4kHIBcATIg3EIg");
	var mask_graphics_106 = new cjs.Graphics().p("AiQjMIA6kQIBcAUIg5EQg");
	var mask_graphics_107 = new cjs.Graphics().p("AiRjFIA8kXIBbAUIg6EXg");
	var mask_graphics_108 = new cjs.Graphics().p("AiSi9IA9kfIBcAUIg8Efg");
	var mask_graphics_109 = new cjs.Graphics().p("AiSi1IA+knIBcAUIg+Emg");
	var mask_graphics_110 = new cjs.Graphics().p("AiTiuIBAkuIBcAUIg/Eug");
	var mask_graphics_111 = new cjs.Graphics().p("AiUimIBCk2IBcAUIhBE2g");
	var mask_graphics_112 = new cjs.Graphics().p("AiVifIBEk9IBcAUIhDE9g");
	var mask_graphics_113 = new cjs.Graphics().p("AiViXIBFlFIBcAUIhEFFg");
	var mask_graphics_114 = new cjs.Graphics().p("AiWiPIBGlMIBcATIhGFNg");
	var mask_graphics_115 = new cjs.Graphics().p("AiXiIIBIlTIBcATIhHFUg");
	var mask_graphics_116 = new cjs.Graphics().p("AiYiAIBKlbIBcATIhJFcg");
	var mask_graphics_117 = new cjs.Graphics().p("AiZh4IBLljIBcATIhKFjg");
	var mask_graphics_118 = new cjs.Graphics().p("AiZh1IBMlmIBcAUIhLFmg");
	var mask_graphics_119 = new cjs.Graphics().p("AiahyIBNlpIBcAUIhMFog");
	var mask_graphics_120 = new cjs.Graphics().p("AiahvIBOlsIBbAUIhMFsg");
	var mask_graphics_121 = new cjs.Graphics().p("AiahsIBOlvIBcAUIhNFvg");
	var mask_graphics_122 = new cjs.Graphics().p("AibhpIBPlyIBcAUIhOFxg");
	var mask_graphics_123 = new cjs.Graphics().p("AibhmIBPl1IBcAUIhOF1g");
	var mask_graphics_124 = new cjs.Graphics().p("AibhjIBQl4IBcAUIhPF4g");
	var mask_graphics_125 = new cjs.Graphics().p("AibhhIBQl6IBcATIhQF7g");
	var mask_graphics_126 = new cjs.Graphics().p("AichdIBRl+IBcAUIhQF9g");
	var mask_graphics_127 = new cjs.Graphics().p("AichaIBSmBIBbAUIhQGBg");
	var mask_graphics_128 = new cjs.Graphics().p("AidhYIBTmDIBcATIhSGEg");
	var mask_graphics_129 = new cjs.Graphics().p("AidhUIBTmHIBcAUIhSGGg");
	var mask_graphics_130 = new cjs.Graphics().p("AidhRIBUmKIBbAUIhSGJg");
	var mask_graphics_131 = new cjs.Graphics().p("AidhOIBUmNIBcAUIhUGMg");
	var mask_graphics_132 = new cjs.Graphics().p("AiehLIBVmQIBcAUIhUGPg");
	var mask_graphics_133 = new cjs.Graphics().p("AiehIIBWmTIBcAUIhVGSg");
	var mask_graphics_134 = new cjs.Graphics().p("AiehFIBWmWIBcAUIhWGVg");
	var mask_graphics_135 = new cjs.Graphics().p("AifhCIBXmZIBcAUIhWGZg");
	var mask_graphics_136 = new cjs.Graphics().p("Aifg/IBYmcIBbAUIhWGcg");
	var mask_graphics_137 = new cjs.Graphics().p("Aifg8IBYmfIBcAUIhYGeg");
	var mask_graphics_138 = new cjs.Graphics().p("Aigg5IBZmiIBcAUIhYGig");
	var mask_graphics_139 = new cjs.Graphics().p("Aigg2IBamlIBbAUIhYGlg");
	var mask_graphics_140 = new cjs.Graphics().p("AihgzIBbmoIBbAUIhZGog");
	var mask_graphics_141 = new cjs.Graphics().p("AihgwIBbmrIBcAUIhaGrg");
	var mask_graphics_142 = new cjs.Graphics().p("AihgtIBcmuIBbAUIhaGug");
	var mask_graphics_143 = new cjs.Graphics().p("AihgqIBcmxIBcAUIhbGxg");
	var mask_graphics_144 = new cjs.Graphics().p("AihgnIBcm0IBcAUIhcG0g");
	var mask_graphics_145 = new cjs.Graphics().p("AiigkIBdm3IBcAUIhcG3g");
	var mask_graphics_146 = new cjs.Graphics().p("AiighIBdm6IBcAUIhdG6g");
	var mask_graphics_147 = new cjs.Graphics().p("AijgeIBfm9IBcAUIheG9g");
	var mask_graphics_148 = new cjs.Graphics().p("AijgbIBfnAIBcAUIheHAg");
	var mask_graphics_149 = new cjs.Graphics().p("AijgYIBgnDIBbAUIheHCg");
	var mask_graphics_150 = new cjs.Graphics().p("AijgVIBgnGIBcAUIhgHFg");
	var mask_graphics_151 = new cjs.Graphics().p("AikgSIBhnJIBcAUIhgHIg");
	var mask_graphics_152 = new cjs.Graphics().p("AikgPIBhnMIBcAUIhhHLg");
	var mask_graphics_153 = new cjs.Graphics().p("AilgMIBjnPIBbAUIhhHOg");
	var mask_graphics_154 = new cjs.Graphics().p("AilgJIBjnSIBcAUIhiHRg");
	var mask_graphics_155 = new cjs.Graphics().p("AilgGIBjnVIBcAUIhjHUg");
	var mask_graphics_156 = new cjs.Graphics().p("AimgDIBknYIBcAUIhjHWg");
	var mask_graphics_157 = new cjs.Graphics().p("AimAAIBlnbIBcAUIhkHag");
	var mask_graphics_158 = new cjs.Graphics().p("AimACIBlndIBcAUIhlHcg");
	var mask_graphics_159 = new cjs.Graphics().p("AinAEIBmnfIBcAUIhlHfg");
	var mask_graphics_160 = new cjs.Graphics().p("AinAIIBnnjIBcAUIhmHig");
	var mask_graphics_161 = new cjs.Graphics().p("AinALIBnnmIBcAUIhnHlg");
	var mask_graphics_162 = new cjs.Graphics().p("AioAOIBpnpIBbAUIhnHog");
	var mask_graphics_163 = new cjs.Graphics().p("AioARIBpnsIBcAUIhoHrg");
	var mask_graphics_164 = new cjs.Graphics().p("AioATIBpnuIBcAUIhpHug");
	var mask_graphics_165 = new cjs.Graphics().p("AipAXIBqnyIBcAUIhpHxg");
	var mask_graphics_166 = new cjs.Graphics().p("AipAaIBrn0IBcATIhqH1g");
	var mask_graphics_167 = new cjs.Graphics().p("AipAcIBrn3IBcAUIhrH3g");
	var mask_graphics_168 = new cjs.Graphics().p("AiqAgIBsn7IBcAUIhrH6g");
	var mask_graphics_169 = new cjs.Graphics().p("AiqAjIBtn9IBbATIhrH+g");
	var mask_graphics_170 = new cjs.Graphics().p("AiqAlIBtoAIBcAUIhsIAg");
	var mask_graphics_171 = new cjs.Graphics().p("AiqAoIBtoDIBcAUIhtIDg");
	var mask_graphics_172 = new cjs.Graphics().p("AirAsIBvoGIBbATIhtIHg");
	var mask_graphics_173 = new cjs.Graphics().p("AirAvIBvoJIBcATIhuIKg");
	var mask_graphics_174 = new cjs.Graphics().p("AirAyIBwoMIBbATIhuINg");
	var mask_graphics_175 = new cjs.Graphics().p("AisA1IBxoPIBcAUIhwIPg");
	var mask_graphics_176 = new cjs.Graphics().p("AisA4IBxoTIBcAUIhwISg");
	var mask_graphics_177 = new cjs.Graphics().p("AitA7IByoVIBcATIhxIWg");
	var mask_graphics_178 = new cjs.Graphics().p("AitA+IByoYIBcATIhxIZg");
	var mask_graphics_179 = new cjs.Graphics().p("AitBBIBzobIBcATIhyIcg");
	var mask_graphics_180 = new cjs.Graphics().p("AitBEIBzoeIBcATIhzIfg");
	var mask_graphics_181 = new cjs.Graphics().p("AiuBHIB1ohIBbATIhzIig");
	var mask_graphics_182 = new cjs.Graphics().p("AiuBKIB1olIBcAUIh0Ikg");
	var mask_graphics_183 = new cjs.Graphics().p("AiuBNIB1onIBcATIh1Iog");
	var mask_graphics_184 = new cjs.Graphics().p("AivBQIB3orIBbAUIh1Iqg");
	var mask_graphics_185 = new cjs.Graphics().p("AivBTIB3ouIBcAUIh2Iug");
	var mask_graphics_186 = new cjs.Graphics().p("AivBWIB3owIBcATIh3Ixg");
	var mask_graphics_187 = new cjs.Graphics().p("AiwBZIB4ozIBcATIh3I0g");
	var mask_graphics_188 = new cjs.Graphics().p("AiwBcIB4o3IBcAUIh3I2g");
	var mask_graphics_189 = new cjs.Graphics().p("AiwBeIB5o5IBcATIh4I6g");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:null,x:0,y:0}).wait(74).to({graphics:mask_graphics_74,x:-11.952,y:-47.7143}).wait(1).to({graphics:mask_graphics_75,x:-12.0271,y:-47.7132}).wait(1).to({graphics:mask_graphics_76,x:-12.1021,y:-47.7121}).wait(1).to({graphics:mask_graphics_77,x:-12.1772,y:-47.711}).wait(1).to({graphics:mask_graphics_78,x:-12.2522,y:-47.7099}).wait(1).to({graphics:mask_graphics_79,x:-12.3273,y:-47.7087}).wait(1).to({graphics:mask_graphics_80,x:-12.4426,y:-47.7228}).wait(1).to({graphics:mask_graphics_81,x:-12.483,y:-47.6869}).wait(1).to({graphics:mask_graphics_82,x:-12.5651,y:-47.6843}).wait(1).to({graphics:mask_graphics_83,x:-12.6472,y:-47.6816}).wait(1).to({graphics:mask_graphics_84,x:-12.7292,y:-47.679}).wait(1).to({graphics:mask_graphics_85,x:-12.8113,y:-47.6764}).wait(1).to({graphics:mask_graphics_86,x:-12.8933,y:-47.6737}).wait(1).to({graphics:mask_graphics_87,x:-12.9754,y:-47.6711}).wait(1).to({graphics:mask_graphics_88,x:-13.0574,y:-47.6684}).wait(1).to({graphics:mask_graphics_89,x:-13.1395,y:-47.6658}).wait(1).to({graphics:mask_graphics_90,x:-13.2215,y:-47.6631}).wait(1).to({graphics:mask_graphics_91,x:-13.3119,y:-47.7024}).wait(1).to({graphics:mask_graphics_92,x:-13.3773,y:-47.6913}).wait(1).to({graphics:mask_graphics_93,x:-13.4426,y:-47.6802}).wait(1).to({graphics:mask_graphics_94,x:-13.5581,y:-47.6692}).wait(1).to({graphics:mask_graphics_95,x:-13.611,y:-47.6584}).wait(1).to({graphics:mask_graphics_96,x:-13.6637,y:-47.6473}).wait(1).to({graphics:mask_graphics_97,x:-13.7791,y:-47.6613}).wait(1).to({graphics:mask_graphics_98,x:-13.8445,y:-47.6504}).wait(1).to({graphics:mask_graphics_99,x:-13.91,y:-47.6394}).wait(1).to({graphics:mask_graphics_100,x:-13.9753,y:-47.6283}).wait(1).to({graphics:mask_graphics_101,x:-14.0905,y:-47.6674}).wait(1).to({graphics:mask_graphics_102,x:-14.156,y:-47.6691}).wait(1).to({graphics:mask_graphics_103,x:-14.2214,y:-47.6704}).wait(1).to({graphics:mask_graphics_104,x:-14.3368,y:-47.6343}).wait(1).to({graphics:mask_graphics_105,x:-14.4023,y:-47.6485}).wait(1).to({graphics:mask_graphics_106,x:-14.4676,y:-47.6625}).wait(1).to({graphics:mask_graphics_107,x:-14.5829,y:-47.6765}).wait(1).to({graphics:mask_graphics_108,x:-14.6609,y:-47.672}).wait(1).to({graphics:mask_graphics_109,x:-14.7388,y:-47.6672}).wait(1).to({graphics:mask_graphics_110,x:-14.8167,y:-47.6625}).wait(1).to({graphics:mask_graphics_111,x:-14.8946,y:-47.6576}).wait(1).to({graphics:mask_graphics_112,x:-14.96,y:-47.6593}).wait(1).to({graphics:mask_graphics_113,x:-15.0253,y:-47.6607}).wait(1).to({graphics:mask_graphics_114,x:-15.1407,y:-47.6248}).wait(1).to({graphics:mask_graphics_115,x:-15.2062,y:-47.6264}).wait(1).to({graphics:mask_graphics_116,x:-15.2715,y:-47.6277}).wait(1).to({graphics:mask_graphics_117,x:-15.4144,y:-47.6479}).wait(1).to({graphics:mask_graphics_118,x:-15.4278,y:-47.5911}).wait(1).to({graphics:mask_graphics_119,x:-15.469,y:-47.6158}).wait(1).to({graphics:mask_graphics_120,x:-15.485,y:-47.6031}).wait(1).to({graphics:mask_graphics_121,x:-15.5008,y:-47.5902}).wait(1).to({graphics:mask_graphics_122,x:-15.5668,y:-47.6148}).wait(1).to({graphics:mask_graphics_123,x:-15.5827,y:-47.5893}).wait(1).to({graphics:mask_graphics_124,x:-15.6237,y:-47.5891}).wait(1).to({graphics:mask_graphics_125,x:-15.6398,y:-47.6386}).wait(1).to({graphics:mask_graphics_126,x:-15.6808,y:-47.6134}).wait(1).to({graphics:mask_graphics_127,x:-15.7216,y:-47.5878}).wait(1).to({graphics:mask_graphics_128,x:-15.7626,y:-47.6373}).wait(1).to({graphics:mask_graphics_129,x:-15.7785,y:-47.612}).wait(1).to({graphics:mask_graphics_130,x:-15.8196,y:-47.6117}).wait(1).to({graphics:mask_graphics_131,x:-15.8355,y:-47.6113}).wait(1).to({graphics:mask_graphics_132,x:-15.8766,y:-47.6109}).wait(1).to({graphics:mask_graphics_133,x:-15.8924,y:-47.6104}).wait(1).to({graphics:mask_graphics_134,x:-15.9459,y:-47.5978}).wait(1).to({graphics:mask_graphics_135,x:-15.9993,y:-47.5848}).wait(1).to({graphics:mask_graphics_136,x:-15.9902,y:-47.5843}).wait(1).to({graphics:mask_graphics_137,x:-16.0313,y:-47.6089}).wait(1).to({graphics:mask_graphics_138,x:-16.0722,y:-47.5836}).wait(1).to({graphics:mask_graphics_139,x:-16.0882,y:-47.5833}).wait(1).to({graphics:mask_graphics_140,x:-16.1542,y:-47.5828}).wait(1).to({graphics:mask_graphics_141,x:-16.1702,y:-47.5826}).wait(1).to({graphics:mask_graphics_142,x:-16.1861,y:-47.582}).wait(1).to({graphics:mask_graphics_143,x:-16.2271,y:-47.582}).wait(1).to({graphics:mask_graphics_144,x:-16.243,y:-47.5563}).wait(1).to({graphics:mask_graphics_145,x:-16.3089,y:-47.5811}).wait(1).to({graphics:mask_graphics_146,x:-16.3499,y:-47.5806}).wait(1).to({graphics:mask_graphics_147,x:-16.366,y:-47.5804}).wait(1).to({graphics:mask_graphics_148,x:-16.4069,y:-47.5799}).wait(1).to({graphics:mask_graphics_149,x:-16.423,y:-47.5922}).wait(1).to({graphics:mask_graphics_150,x:-16.4388,y:-47.604}).wait(1).to({graphics:mask_graphics_151,x:-16.4799,y:-47.5786}).wait(1).to({graphics:mask_graphics_152,x:-16.5457,y:-47.5783}).wait(1).to({graphics:mask_graphics_153,x:-16.5866,y:-47.5779}).wait(1).to({graphics:mask_graphics_154,x:-16.6027,y:-47.5777}).wait(1).to({graphics:mask_graphics_155,x:-16.6438,y:-47.5775}).wait(1).to({graphics:mask_graphics_156,x:-16.6848,y:-47.5768}).wait(1).to({graphics:mask_graphics_157,x:-16.7007,y:-47.5514}).wait(1).to({graphics:mask_graphics_158,x:-16.7417,y:-47.5762}).wait(1).to({graphics:mask_graphics_159,x:-16.7825,y:-47.6006}).wait(1).to({graphics:mask_graphics_160,x:-16.7987,y:-47.5752}).wait(1).to({graphics:mask_graphics_161,x:-16.8395,y:-47.5746}).wait(1).to({graphics:mask_graphics_162,x:-16.8556,y:-47.5745}).wait(1).to({graphics:mask_graphics_163,x:-16.8715,y:-47.574}).wait(1).to({graphics:mask_graphics_164,x:-16.9374,y:-47.5988}).wait(1).to({graphics:mask_graphics_165,x:-16.9784,y:-47.5733}).wait(1).to({graphics:mask_graphics_166,x:-16.9944,y:-47.5479}).wait(1).to({graphics:mask_graphics_167,x:-17.0352,y:-47.5976}).wait(1).to({graphics:mask_graphics_168,x:-17.0512,y:-47.5722}).wait(1).to({graphics:mask_graphics_169,x:-17.0921,y:-47.5467}).wait(1).to({graphics:mask_graphics_170,x:-17.133,y:-47.5964}).wait(1).to({graphics:mask_graphics_171,x:-17.149,y:-47.596}).wait(1).to({graphics:mask_graphics_172,x:-17.1901,y:-47.5455}).wait(1).to({graphics:mask_graphics_173,x:-17.2062,y:-47.5453}).wait(1).to({graphics:mask_graphics_174,x:-17.2221,y:-47.5447}).wait(1).to({graphics:mask_graphics_175,x:-17.263,y:-47.5195}).wait(1).to({graphics:mask_graphics_176,x:-17.3289,y:-47.5691}).wait(1).to({graphics:mask_graphics_177,x:-17.3699,y:-47.5437}).wait(1).to({graphics:mask_graphics_178,x:-17.386,y:-47.5436}).wait(1).to({graphics:mask_graphics_179,x:-17.4019,y:-47.543}).wait(1).to({graphics:mask_graphics_180,x:-17.4428,y:-47.5426}).wait(1).to({graphics:mask_graphics_181,x:-17.4588,y:-47.5422}).wait(1).to({graphics:mask_graphics_182,x:-17.4998,y:-47.5668}).wait(1).to({graphics:mask_graphics_183,x:-17.5408,y:-47.5415}).wait(1).to({graphics:mask_graphics_184,x:-17.5567,y:-47.566}).wait(1).to({graphics:mask_graphics_185,x:-17.5977,y:-47.5533}).wait(1).to({graphics:mask_graphics_186,x:-17.6385,y:-47.5403}).wait(1).to({graphics:mask_graphics_187,x:-17.6546,y:-47.5399}).wait(1).to({graphics:mask_graphics_188,x:-17.7206,y:-47.5644}).wait(1).to({graphics:mask_graphics_189,x:-17.7133,y:-47.6488}).wait(486));

	// Masked_Layer_4___3
	this.instance_24 = new lib.shape147("synched",0);
	this.instance_24._off = true;

	var maskedShapeInstanceList = [this.instance_24];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(74).to({_off:false},0).wait(601));

	// Layer_3
	this.instance_25 = new lib.shape144("synched",0);

	this.instance_26 = new lib.shape146("synched",0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_25}]},4).to({state:[]},5).to({state:[{t:this.instance_26}]},5).to({state:[]},5).wait(656));

	// Layer_2
	this.instance_27 = new lib.text143("synched",0);
	this.instance_27.setTransform(-131,160.25);

	this.instance_28 = new lib.shape114_r("synched",0);
	this.instance_28.setTransform(-299.7,-93.8,1,0.0015,90);
	this.instance_28._off = true;

	this.instance_29 = new lib.shape114("synched",0);
	this.instance_29.setTransform(-299.7,-39.4,1,0.0015,90);
	this.instance_29._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_27}]},4).to({state:[]},5).to({state:[{t:this.instance_27}]},5).to({state:[]},5).to({state:[{t:this.instance_28}]},10).to({state:[{t:this.instance_28}]},2).to({state:[{t:this.instance_28}]},8).to({state:[{t:this.instance_28}]},3).to({state:[{t:this.instance_28}]},6).to({state:[{t:this.instance_28}]},1).to({state:[{t:this.instance_28}]},1).to({state:[{t:this.instance_28}]},1).to({state:[{t:this.instance_28}]},2).to({state:[]},1).to({state:[{t:this.instance_29}]},135).to({state:[{t:this.instance_29}]},1).to({state:[{t:this.instance_29}]},1).to({state:[{t:this.instance_29}]},1).to({state:[{t:this.instance_29}]},2).to({state:[{t:this.instance_29}]},1).to({state:[{t:this.instance_29}]},1).to({state:[{t:this.instance_29}]},2).to({state:[{t:this.instance_29}]},3).to({state:[{t:this.instance_29}]},3).to({state:[{t:this.instance_29}]},4).to({state:[{t:this.instance_29}]},1).to({state:[{t:this.instance_29}]},1).to({state:[{t:this.instance_29}]},1).to({state:[{t:this.instance_29}]},1).to({state:[{t:this.instance_29}]},2).to({state:[{t:this.instance_29}]},1).wait(460));
	this.timeline.addTween(cjs.Tween.get(this.instance_28).wait(29).to({_off:false},0).to({scaleY:0.0203},2).to({scaleY:0.4723,x:-299.65},8).to({scaleY:0.7971},3).to({scaleY:1.7009,x:-299.7,y:-93.85},6).to({alpha:0.6484},1).to({alpha:0.3789},1).to({alpha:0.1797},1).to({alpha:0},2).to({_off:true},1).wait(621));
	this.timeline.addTween(cjs.Tween.get(this.instance_29).wait(189).to({_off:false},0).to({scaleY:0.0056},1).to({scaleY:0.0177},1).to({scaleY:0.038},1).to({scaleY:0.1028},2).to({scaleY:0.1474,x:-299.75},1).to({scaleY:0.2001,x:-299.65},1).to({scaleY:0.3297,x:-299.7},2).to({scaleY:0.585},3).to({scaleY:0.9132,y:-39.35},3).to({scaleY:1.4643,x:-299.75},4).to({scaleY:1.6223,x:-299.7},1).to({x:-299.65,alpha:0.6992},1).to({alpha:0.4492},1).to({alpha:0.25},1).to({alpha:0.0313},2).wait(1).to({x:-299.7,alpha:0},0).wait(460));

	// Layer_1
	this.instance_30 = new lib.shape111("synched",0);
	this.instance_30.setTransform(1322.65,216.25,4.6129,0.96);

	this.instance_31 = new lib.shape114_r("synched",0);
	this.instance_31.setTransform(-18.3,137.4,1,0.006);
	this.instance_31._off = true;

	this.instance_32 = new lib.shape114("synched",0);
	this.instance_32.setTransform(-31.3,137.4,1,0.006);
	this.instance_32._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_30}]},4).to({state:[]},5).to({state:[{t:this.instance_30}]},5).to({state:[]},5).to({state:[{t:this.instance_31}]},10).to({state:[{t:this.instance_31}]},3).to({state:[{t:this.instance_31}]},7).to({state:[{t:this.instance_31}]},3).to({state:[{t:this.instance_31}]},6).to({state:[{t:this.instance_31}]},1).to({state:[{t:this.instance_31}]},1).to({state:[{t:this.instance_31}]},1).to({state:[{t:this.instance_31}]},2).to({state:[]},1).to({state:[{t:this.instance_32}]},135).to({state:[{t:this.instance_32}]},1).to({state:[{t:this.instance_32}]},1).to({state:[{t:this.instance_32}]},1).to({state:[{t:this.instance_32}]},1).to({state:[{t:this.instance_32}]},1).to({state:[{t:this.instance_32}]},1).to({state:[{t:this.instance_32}]},4).to({state:[{t:this.instance_32}]},3).to({state:[{t:this.instance_32}]},1).to({state:[{t:this.instance_32}]},4).to({state:[{t:this.instance_32}]},2).to({state:[{t:this.instance_32}]},1).to({state:[{t:this.instance_32}]},1).to({state:[{t:this.instance_32}]},1).to({state:[{t:this.instance_32}]},2).to({state:[{t:this.instance_32}]},1).wait(460));
	this.timeline.addTween(cjs.Tween.get(this.instance_31).wait(29).to({_off:false},0).to({scaleY:0.0404},3).to({scaleY:0.3881},7).to({scaleY:0.6517},3).to({scaleY:1.3853},6).to({alpha:0.6484},1).to({alpha:0.3789},1).to({alpha:0.1797},1).to({alpha:0},2).to({_off:true},1).wait(621));
	this.timeline.addTween(cjs.Tween.get(this.instance_32).wait(189).to({_off:false},0).to({scaleY:0.0087},1).to({scaleY:0.0166},1).to({scaleY:0.0298},1).to({scaleY:0.0483},1).to({scaleY:0.0721},1).to({scaleY:0.1012},1).to({scaleY:0.2704},4).to({scaleY:0.4528},3).to({scaleY:0.5242,y:137.45},1).to({scaleY:0.8625,y:137.4},4).to({scaleY:1.0634},2).to({alpha:0.6992},1).to({alpha:0.4492},1).to({alpha:0.25},1).to({alpha:0.0313},2).wait(1).to({alpha:0},0).wait(460));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-835.4,-102.2,854.9,312.4);


(lib.sprite136 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		/* stopAllSounds ();
		*/
	}
	this.frame_509 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(509).call(this.frame_509).wait(1));

	// Masked_Layer_17___13
	this.instance = new lib.shape86("synched",0);
	this.instance.setTransform(-155.6,-1.85);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(510));

	// Masked_Layer_16___13
	this.instance_1 = new lib.text124("synched",0);
	this.instance_1.setTransform(-826.15,-25.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(510));

	// Masked_Layer_15___13
	this.instance_2 = new lib.shape86("synched",0);
	this.instance_2.setTransform(-155.6,-45.35);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(510));

	// Masked_Layer_14___13
	this.instance_3 = new lib.text123("synched",0);
	this.instance_3.setTransform(-826.15,-70.05);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(510));

	// Layer_12
	this.instance_4 = new lib.shape122("synched",0);
	this.instance_4.setTransform(-630,120);
	this.instance_4.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({alpha:0.8906},8).wait(1).to({alpha:1},0).wait(280).to({startPosition:0},0).to({alpha:0.1016},9).to({_off:true},1).wait(211));

	// Layer_11
	this.instance_5 = new lib.shape128("synched",0);
	this.instance_5.setTransform(-630,120);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(289).to({_off:false},0).to({alpha:0.8984},9).wait(1).to({alpha:1},0).wait(211));

	// Layer_10_r
	this.instance_6 = new lib.shape115("synched",0);
	this.instance_6.setTransform(17.5,-54);
	this.instance_6.alpha = 0;
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(289).to({_off:false},0).to({x:-17.65,y:-93.1,alpha:1},59).wait(1).to({x:-18.25,y:-93.75},0).to({_off:true},5).wait(5).to({_off:false},0).to({_off:true},5).wait(5).to({_off:false},0).wait(141));

	// Layer_10
	this.instance_7 = new lib.shape115_b("synched",0);
	this.instance_7.setTransform(17.5,-54);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).to({_off:true},34).wait(5).to({_off:false},0).to({_off:true},5).wait(5).to({_off:false},0).to({startPosition:0},240).to({x:-17.65,y:-93.1,alpha:0},59).to({_off:true},1).wait(161));

	// Layer_9
	this.instance_8 = new lib.text113("synched",0);
	this.instance_8.setTransform(-379.6,-57.95);

	this.instance_9 = new lib.text130("synched",0);
	this.instance_9.setTransform(-379.6,-72.25);

	this.instance_10 = new lib.text135("synched",0);
	this.instance_10.setTransform(-379.6,-98.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_8}]}).to({state:[{t:this.instance_9}]},309).to({state:[]},8).to({state:[{t:this.instance_10}]},32).wait(161));

	// Layer_8
	this.instance_11 = new lib.shape111("synched",0);

	this.instance_12 = new lib.text132("synched",0);
	this.instance_12.setTransform(-379.6,-74.2);

	this.instance_13 = new lib.text134("synched",0);
	this.instance_13.setTransform(-379.6,-85.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_11}]}).to({state:[{t:this.instance_11}]},308).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_12}]},8).to({state:[{t:this.instance_13}]},13).to({state:[{t:this.instance_11}]},19).wait(161));
	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(308).to({startPosition:0},0).wait(1).to({y:-14.3},0).to({_off:true},8).wait(32).to({_off:false,y:-40.35},0).wait(161));

	// Layer_7
	this.instance_14 = new lib.text112("synched",0);
	this.instance_14.setTransform(-54.9,144.75);

	this.instance_15 = new lib.text129("synched",0);
	this.instance_15.setTransform(-66.6,144.75);

	this.instance_16 = new lib.shape111("synched",0);
	this.instance_16.setTransform(0,-14.3);
	this.instance_16._off = true;

	this.instance_17 = new lib.text134("synched",0);
	this.instance_17.setTransform(-90.8,144.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_14}]}).to({state:[{t:this.instance_15}]},309).to({state:[{t:this.instance_16}]},8).to({state:[{t:this.instance_16}]},12).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_17}]},19).wait(161));
	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(317).to({_off:false},0).to({startPosition:0},12).wait(1).to({y:-27.3},0).to({_off:true},19).wait(161));

	// Layer_6
	this.instance_18 = new lib.shape111("synched",0);
	this.instance_18.setTransform(324.8,201.6);

	this.instance_19 = new lib.text131("synched",0);
	this.instance_19.setTransform(-70.5,144.75);

	this.instance_20 = new lib.text133("synched",0);
	this.instance_20.setTransform(-75.05,144.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_18}]}).to({state:[{t:this.instance_18}]},308).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_19}]},8).to({state:[{t:this.instance_20}]},13).to({state:[{t:this.instance_18}]},19).wait(161));
	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(308).to({startPosition:0},0).wait(1).to({scaleX:0.8387,scaleY:1.04,x:262.85,y:204.25},0).to({_off:true},8).wait(32).to({_off:false,scaleX:1,scaleY:1,x:288.9,y:201.6},0).wait(161));

	// Mask_Layer_3 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_289 = new cjs.Graphics().p("AAVjhIBGhAIAVAWIhGBBg");
	var mask_graphics_290 = new cjs.Graphics().p("AAPjkIBGhAIAbAdIhGBAg");
	var mask_graphics_291 = new cjs.Graphics().p("AAJjoIBGhAIAhAkIhGBAg");
	var mask_graphics_292 = new cjs.Graphics().p("AADjrIBGhAIAnAqIhGBAg");
	var mask_graphics_293 = new cjs.Graphics().p("AgCjuIBFhBIAtAyIhGBAg");
	var mask_graphics_294 = new cjs.Graphics().p("AgJjxIBFhBIA0A4IhGBBg");
	var mask_graphics_295 = new cjs.Graphics().p("AgPj1IBFhAIA6A/IhGBAg");
	var mask_graphics_296 = new cjs.Graphics().p("AgVj4IBFhAIBABFIhGBAg");
	var mask_graphics_297 = new cjs.Graphics().p("Agbj8IBFhAIBGBNIhGBAg");
	var mask_graphics_298 = new cjs.Graphics().p("Aghj/IBEhAIBNBTIhGBAg");
	var mask_graphics_299 = new cjs.Graphics().p("AgokCIBFhBIBTBaIhGBBg");
	var mask_graphics_300 = new cjs.Graphics().p("AgukGIBFhAIBZBhIhGBAg");
	var mask_graphics_301 = new cjs.Graphics().p("Ag0kJIBFhAIBfBnIhGBAg");
	var mask_graphics_302 = new cjs.Graphics().p("Ag6kNIBFhAIBlBvIhGBAg");
	var mask_graphics_303 = new cjs.Graphics().p("AhAkQIBEhAIBsB1IhGBAg");
	var mask_graphics_304 = new cjs.Graphics().p("AhHkTIBGhBIBxB8IhGBBg");
	var mask_graphics_305 = new cjs.Graphics().p("AhNkXIBGhAIB3CDIhGBAg");
	var mask_graphics_306 = new cjs.Graphics().p("AhTkaIBGhAIB9CJIhGBAg");
	var mask_graphics_307 = new cjs.Graphics().p("AhZkeIBGhAICDCRIhGBAg");
	var mask_graphics_308 = new cjs.Graphics().p("AhfkhIBFhAICKCXIhGBAg");
	var mask_graphics_309 = new cjs.Graphics().p("AhmkkIBGhBICQCeIhGBBg");
	var mask_graphics_310 = new cjs.Graphics().p("AhskoIBGhAICWClIhGBAg");
	var mask_graphics_311 = new cjs.Graphics().p("AhxkrIBGhAICdCrIhGBAg");
	var mask_graphics_312 = new cjs.Graphics().p("Ah0kvIBGhAICjCzIhGBAg");
	var mask_graphics_313 = new cjs.Graphics().p("Ah3kyIBGhAICpC5IhGBAg");
	var mask_graphics_314 = new cjs.Graphics().p("Ah6k1IBGhBICvDAIhGBBg");
	var mask_graphics_315 = new cjs.Graphics().p("Ah9k5IBGhAIC1DHIhGBAg");
	var mask_graphics_316 = new cjs.Graphics().p("AiAk8IBGhAIC7DNIhGBAg");
	var mask_graphics_317 = new cjs.Graphics().p("AiDlAIBGhAIDBDVIhGBAg");
	var mask_graphics_318 = new cjs.Graphics().p("AiGlDIBFhAIDIDbIhFBAg");
	var mask_graphics_319 = new cjs.Graphics().p("AiKlGIBGhBIDPDjIhGBAg");
	var mask_graphics_320 = new cjs.Graphics().p("AiNlKIBGhAIDVDpIhGBAg");
	var mask_graphics_321 = new cjs.Graphics().p("AiQlNIBGhAIDbDvIhGBBg");
	var mask_graphics_322 = new cjs.Graphics().p("AiTlRIBGhAIDhD3IhGBAg");
	var mask_graphics_323 = new cjs.Graphics().p("AiWlUIBGhAIDnD9IhGBAg");
	var mask_graphics_324 = new cjs.Graphics().p("AiZlXIBGhAIDtEEIhGBAg");
	var mask_graphics_325 = new cjs.Graphics().p("AiclbIBGhAIDzELIhGBAg");
	var mask_graphics_326 = new cjs.Graphics().p("AifleIBGhAID5ESIhGBAg");
	var mask_graphics_327 = new cjs.Graphics().p("AiilhIBGhBID/EZIhGBAg");
	var mask_graphics_328 = new cjs.Graphics().p("AilllIBFhAIEGEfIhFBBg");
	var mask_graphics_329 = new cjs.Graphics().p("AioloIBFhAIEMEmIhFBAg");
	var mask_graphics_330 = new cjs.Graphics().p("AislrIBGhBIETEtIhGBAg");
	var mask_graphics_331 = new cjs.Graphics().p("AivlvIBGhAIEZE0IhGBAg");
	var mask_graphics_332 = new cjs.Graphics().p("AiylyIBGhAIEfE6IhGBAg");
	var mask_graphics_333 = new cjs.Graphics().p("Ai1l2IBGhAIElFCIhGBAg");
	var mask_graphics_334 = new cjs.Graphics().p("Ai4l5IBGhAIErFIIhGBAg");
	var mask_graphics_335 = new cjs.Graphics().p("Ai7l8IBGhAIExFOIhGBBg");
	var mask_graphics_336 = new cjs.Graphics().p("Ai+mAIBGhAIE3FWIhGBAg");
	var mask_graphics_337 = new cjs.Graphics().p("AjBmDIBGhAIE9FcIhGBBg");
	var mask_graphics_338 = new cjs.Graphics().p("AjEmGIBGhBIFDFkIhGBAg");
	var mask_graphics_339 = new cjs.Graphics().p("AjHmKIBGhAIFJFqIhGBAg");
	var mask_graphics_340 = new cjs.Graphics().p("AjKmNIBFhAIFQFxIhFBAg");
	var mask_graphics_341 = new cjs.Graphics().p("AjNmRIBFhAIFWF4IhFBAg");
	var mask_graphics_342 = new cjs.Graphics().p("AjRmUIBGhAIFdF+IhGBBg");
	var mask_graphics_343 = new cjs.Graphics().p("AjUmXIBGhAIFjGFIhGBAg");
	var mask_graphics_344 = new cjs.Graphics().p("AjXmbIBGhAIFpGMIhGBAg");
	var mask_graphics_345 = new cjs.Graphics().p("AjameIBGhAIFvGTIhGBAg");
	var mask_graphics_346 = new cjs.Graphics().p("AjdmhIBGhBIF1GaIhGBAg");
	var mask_graphics_347 = new cjs.Graphics().p("AjgmlIBGhAIF7GhIhGBAg");
	var mask_graphics_348 = new cjs.Graphics().p("AjjmoIBGhAIGBGnIhGBAg");
	var mask_graphics_349 = new cjs.Graphics().p("AjnmrIBGhBIGJGvIhGA/g");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:null,x:0,y:0}).wait(289).to({graphics:mask_graphics_289,x:11.1839,y:-28.9867}).wait(1).to({graphics:mask_graphics_290,x:11.1839,y:-29.3298}).wait(1).to({graphics:mask_graphics_291,x:11.1892,y:-29.6747}).wait(1).to({graphics:mask_graphics_292,x:11.1946,y:-30.0196}).wait(1).to({graphics:mask_graphics_293,x:11.2,y:-30.3645}).wait(1).to({graphics:mask_graphics_294,x:11.1805,y:-30.6594}).wait(1).to({graphics:mask_graphics_295,x:11.1829,y:-30.9996}).wait(1).to({graphics:mask_graphics_296,x:11.1854,y:-31.3397}).wait(1).to({graphics:mask_graphics_297,x:11.1878,y:-31.6799}).wait(1).to({graphics:mask_graphics_298,x:11.1902,y:-32.0201}).wait(1).to({graphics:mask_graphics_299,x:11.1926,y:-32.3603}).wait(1).to({graphics:mask_graphics_300,x:11.195,y:-32.7005}).wait(1).to({graphics:mask_graphics_301,x:11.1973,y:-33.0408}).wait(1).to({graphics:mask_graphics_302,x:11.1996,y:-33.3811}).wait(1).to({graphics:mask_graphics_303,x:11.2019,y:-33.7214}).wait(1).to({graphics:mask_graphics_304,x:11.2042,y:-34.0617}).wait(1).to({graphics:mask_graphics_305,x:11.2065,y:-34.402}).wait(1).to({graphics:mask_graphics_306,x:11.2087,y:-34.7424}).wait(1).to({graphics:mask_graphics_307,x:11.2109,y:-35.0828}).wait(1).to({graphics:mask_graphics_308,x:11.2131,y:-35.4231}).wait(1).to({graphics:mask_graphics_309,x:11.2153,y:-35.7636}).wait(1).to({graphics:mask_graphics_310,x:11.2174,y:-36.104}).wait(1).to({graphics:mask_graphics_311,x:11.0738,y:-36.4444}).wait(1).to({graphics:mask_graphics_312,x:10.7668,y:-36.7849}).wait(1).to({graphics:mask_graphics_313,x:10.4597,y:-37.1254}).wait(1).to({graphics:mask_graphics_314,x:10.1527,y:-37.4659}).wait(1).to({graphics:mask_graphics_315,x:9.8457,y:-37.8064}).wait(1).to({graphics:mask_graphics_316,x:9.5386,y:-38.147}).wait(1).to({graphics:mask_graphics_317,x:9.2316,y:-38.4876}).wait(1).to({graphics:mask_graphics_318,x:8.9246,y:-38.8282}).wait(1).to({graphics:mask_graphics_319,x:8.6147,y:-39.1642}).wait(1).to({graphics:mask_graphics_320,x:8.3048,y:-39.5003}).wait(1).to({graphics:mask_graphics_321,x:7.9949,y:-39.8364}).wait(1).to({graphics:mask_graphics_322,x:7.6851,y:-40.1725}).wait(1).to({graphics:mask_graphics_323,x:7.3752,y:-40.5086}).wait(1).to({graphics:mask_graphics_324,x:7.0653,y:-40.8448}).wait(1).to({graphics:mask_graphics_325,x:6.7554,y:-41.181}).wait(1).to({graphics:mask_graphics_326,x:6.4456,y:-41.5172}).wait(1).to({graphics:mask_graphics_327,x:6.1357,y:-41.8535}).wait(1).to({graphics:mask_graphics_328,x:5.8258,y:-42.1898}).wait(1).to({graphics:mask_graphics_329,x:5.5159,y:-42.5261}).wait(1).to({graphics:mask_graphics_330,x:5.2061,y:-42.8624}).wait(1).to({graphics:mask_graphics_331,x:4.8962,y:-43.1987}).wait(1).to({graphics:mask_graphics_332,x:4.5863,y:-43.5351}).wait(1).to({graphics:mask_graphics_333,x:4.2765,y:-43.8715}).wait(1).to({graphics:mask_graphics_334,x:3.9666,y:-44.2079}).wait(1).to({graphics:mask_graphics_335,x:3.6567,y:-44.5444}).wait(1).to({graphics:mask_graphics_336,x:3.3468,y:-44.8808}).wait(1).to({graphics:mask_graphics_337,x:3.037,y:-45.2173}).wait(1).to({graphics:mask_graphics_338,x:2.7271,y:-45.5539}).wait(1).to({graphics:mask_graphics_339,x:2.4172,y:-45.8904}).wait(1).to({graphics:mask_graphics_340,x:2.1074,y:-46.227}).wait(1).to({graphics:mask_graphics_341,x:1.9066,y:-46.5723}).wait(1).to({graphics:mask_graphics_342,x:1.5915,y:-46.9106}).wait(1).to({graphics:mask_graphics_343,x:1.2764,y:-47.2488}).wait(1).to({graphics:mask_graphics_344,x:0.9614,y:-47.5871}).wait(1).to({graphics:mask_graphics_345,x:0.6463,y:-47.9253}).wait(1).to({graphics:mask_graphics_346,x:0.3312,y:-48.2636}).wait(1).to({graphics:mask_graphics_347,x:0.0161,y:-48.6019}).wait(1).to({graphics:mask_graphics_348,x:-0.2989,y:-48.9401}).wait(1).to({graphics:mask_graphics_349,x:-0.6499,y:-49.2606}).wait(161));

	// Masked_Layer_4___3
	this.instance_21 = new lib.shape126("synched",0);
	this.instance_21._off = true;

	var maskedShapeInstanceList = [this.instance_21];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(289).to({_off:false},0).wait(221));

	// Layer_2
	this.instance_22 = new lib.shape114("synched",0);
	this.instance_22.setTransform(-299.7,-53.6,1,0.0015,90);

	this.instance_23 = new lib.shape114_r("synched",0);
	this.instance_23.setTransform(-299.7,-93.8,1,0.0015,90);
	this.instance_23._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_22).to({scaleY:0.0046,x:-299.75},1).to({scaleY:0.0137,x:-299.65},1).to({scaleY:0.0505,x:-299.75},2).to({scaleY:0.0781,x:-299.7},1).to({scaleY:0.1118,x:-299.75},1).to({scaleY:0.2496,x:-299.7},3).to({scaleY:0.5193,x:-299.65},4).to({scaleY:0.602,x:-299.7},1).to({scaleY:0.6908,x:-299.65},1).to({scaleY:0.7858,x:-299.7},1).to({scaleY:0.8869,x:-299.65},1).to({scaleY:1.3526,x:-299.7},4).to({scaleY:1.7662,x:-299.65},3).to({scaleY:1.9163,x:-299.7},1).to({alpha:0.6406},1).to({alpha:0.3594},1).to({alpha:0.1602},1).to({alpha:0},2).to({_off:true},1).wait(338).to({_off:false,scaleY:1.7009,y:-93.85},52).to({_off:true},1).wait(88));
	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(349).to({_off:false},0).to({scaleY:0.0058,x:-299.65},1).to({scaleY:0.0185,x:-299.7},1).to({scaleY:0.0695,x:-299.65},2).to({scaleY:0.1544,x:-299.7},2).to({scaleY:0.3456,x:-299.75},3).to({scaleY:0.5156,x:-299.65},2).to({scaleY:0.6133,x:-299.7},1).to({scaleY:0.9574,y:-93.85},3).to({scaleY:1.378,x:-299.65},3).to({scaleY:1.7009,x:-299.7},2).to({_off:true,alpha:0},52).wait(89));

	// Layer_1
	this.instance_24 = new lib.shape114("synched",0);
	this.instance_24.setTransform(17.4,137.4,1,0.006);

	this.instance_25 = new lib.shape114_r("synched",0);
	this.instance_25.setTransform(-18.3,137.4,1,0.006);
	this.instance_25._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_24).to({scaleY:0.0079},1).to({scaleY:0.0134},1).to({scaleY:0.0226},1).to({scaleY:0.0355},1).to({scaleY:0.052},1).to({scaleY:0.0723},1).to({scaleY:0.0961},1).to({scaleY:0.1237},1).to({scaleY:0.3665},6).to({scaleY:0.5376},3).to({scaleY:0.7417,x:17.45},3).to({scaleY:1.1556},5).to({alpha:0.6406},1).to({alpha:0.3594},1).to({alpha:0.1602},1).to({alpha:0},2).to({_off:true},1).wait(479));
	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(349).to({_off:false},0).to({scaleY:0.0198},2).to({scaleY:0.037,y:137.45},1).to({scaleY:0.0612,y:137.4},1).to({scaleY:0.2267,y:137.45},4).to({scaleY:0.3508,y:137.4},2).to({scaleY:0.5026,y:137.45},2).to({scaleY:0.5887,y:137.4},1).to({scaleY:0.8888},3).to({scaleY:1.2508,y:137.45},3).to({scaleY:1.3853,y:137.4},1).to({alpha:0},52).to({_off:true},1).wait(88));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-836,-102.2,868.7,307.2);


(lib.sprite116 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		/* stopAllSounds ();
		*/
	}
	this.frame_314 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(314).call(this.frame_314).wait(1));

	// Layer_7
	this.instance = new lib.shape115_b("synched",0);
	this.instance.setTransform(17.5,-54);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(49).to({_off:false},0).to({_off:true},5).wait(5).to({_off:false},0).to({_off:true},5).wait(5).to({_off:false},0).wait(246));

	// Layer_6
	this.instance_1 = new lib.text113("synched",0);
	this.instance_1.setTransform(-379.35,-58.1);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(14).to({_off:false},0).wait(301));

	// Layer_5
	this.instance_2 = new lib.shape111("synched",0);
	this.instance_2.setTransform(-47.75,1.9,0.8452,1.048);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(14).to({_off:false},0).wait(301));

	// Layer_4
	this.instance_3 = new lib.text113("synched",0);
	this.instance_3.setTransform(-379.35,-58.1);

	this.instance_4 = new lib.text112("synched",0);
	this.instance_4.setTransform(-55.3,145.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_3}]},4).to({state:[]},5).to({state:[{t:this.instance_4}]},5).wait(301));

	// Layer_3
	this.instance_5 = new lib.shape111("synched",0);
	this.instance_5.setTransform(-47.75,1.9,0.8452,1.048);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(4).to({_off:false},0).to({_off:true},5).wait(5).to({_off:false,scaleX:1.0484,scaleY:0.8,x:339.3,y:192.4},0).wait(301));

	// Layer_2
	this.instance_6 = new lib.text112("synched",0);
	this.instance_6.setTransform(-55.3,145.05);

	this.instance_7 = new lib.shape114("synched",0);
	this.instance_7.setTransform(-299.7,-53.6,1,0.0015,90);
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_6}]},4).to({state:[]},5).to({state:[{t:this.instance_7}]},15).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},2).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},3).to({state:[{t:this.instance_7}]},4).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},4).to({state:[{t:this.instance_7}]},3).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},2).to({state:[{t:this.instance_7}]},1).wait(261));
	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(24).to({_off:false},0).to({scaleY:0.0046,x:-299.75},1).to({scaleY:0.0137,x:-299.65},1).to({scaleY:0.0505,x:-299.75},2).to({scaleY:0.0781,x:-299.7},1).to({scaleY:0.1118,x:-299.75},1).to({scaleY:0.2496,x:-299.7},3).to({scaleY:0.5193,x:-299.65},4).to({scaleY:0.602,x:-299.7},1).to({scaleY:0.6908,x:-299.65},1).to({scaleY:0.7858,x:-299.7},1).to({scaleY:0.8869,x:-299.65},1).to({scaleY:1.3526,x:-299.7},4).to({scaleY:1.7662,x:-299.65},3).to({scaleY:1.9163,x:-299.7},1).to({alpha:0.6406},1).to({alpha:0.3594},1).to({alpha:0.0391},2).wait(1).to({alpha:0},0).wait(261));

	// Layer_1
	this.instance_8 = new lib.shape111("synched",0);
	this.instance_8.setTransform(339.3,192.4,1.0484,0.8);

	this.instance_9 = new lib.shape114("synched",0);
	this.instance_9.setTransform(17.4,137.4,1,0.006);
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_8}]},4).to({state:[]},5).to({state:[{t:this.instance_9}]},15).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},6).to({state:[{t:this.instance_9}]},3).to({state:[{t:this.instance_9}]},3).to({state:[{t:this.instance_9}]},5).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},2).to({state:[{t:this.instance_9}]},1).wait(261));
	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(24).to({_off:false},0).to({scaleY:0.0079},1).to({scaleY:0.0134},1).to({scaleY:0.0226},1).to({scaleY:0.0355},1).to({scaleY:0.052},1).to({scaleY:0.0723},1).to({scaleY:0.0961},1).to({scaleY:0.1237},1).to({scaleY:0.3665},6).to({scaleY:0.5376},3).to({scaleY:0.7417,x:17.45},3).to({scaleY:1.1556},5).to({alpha:0.6406},1).to({alpha:0.3594},1).to({alpha:0.0391},2).wait(1).to({alpha:0},0).wait(261));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-317,-62,349.3,230.1);


(lib.sprite110 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		/* stopAllSounds ();
		mySound = new Sound();
		*/
	}
	this.frame_49 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(49).call(this.frame_49).wait(1));

	// Layer_58
	this.instance = new lib.text3("synched",0);
	this.instance.setTransform(290,71,0.369,0.369,-17.9989);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(50));

	// Layer_57
	this.instance_1 = new lib.shape109("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(50));

	// Layer_55
	this.instance_2 = new lib.text30("synched",0);
	this.instance_2.setTransform(182,317,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(50));

	// Layer_54
	this.instance_3 = new lib.shape108("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(50));

	// Layer_53
	this.instance_4 = new lib.text28("synched",0);
	this.instance_4.setTransform(282.9,136.7,0.3547,0.3547,-44.1181);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(50));

	// Layer_52
	this.instance_5 = new lib.shape107("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(50));

	// Layer_51
	this.instance_6 = new lib.text26("synched",0);
	this.instance_6.setTransform(440.95,295.95,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(50));

	// Layer_50
	this.instance_7 = new lib.text25("synched",0);
	this.instance_7.setTransform(406.75,296.9,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(50));

	// Layer_49
	this.instance_8 = new lib.text24("synched",0);
	this.instance_8.setTransform(449.3,304.95,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(50));

	// Layer_48
	this.instance_9 = new lib.text23("synched",0);
	this.instance_9.setTransform(381.15,304.95,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(50));

	// Layer_47
	this.instance_10 = new lib.text22("synched",0);
	this.instance_10.setTransform(344.95,304.95,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(50));

	// Layer_46
	this.instance_11 = new lib.text12("synched",0);
	this.instance_11.setTransform(309.4,304.95,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(50));

	// Layer_45
	this.instance_12 = new lib.text21("synched",0);
	this.instance_12.setTransform(270.75,304.95,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(50));

	// Layer_44
	this.instance_13 = new lib.text13("synched",0);
	this.instance_13.setTransform(228.35,304.95,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(50));

	// Layer_43
	this.instance_14 = new lib.text20("synched",0);
	this.instance_14.setTransform(186.45,304.95,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(50));

	// Layer_42
	this.instance_15 = new lib.text14("synched",0);
	this.instance_15.setTransform(140.25,304.95,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(50));

	// Layer_41
	this.instance_16 = new lib.text19("synched",0);
	this.instance_16.setTransform(88.6,304.95,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(50));

	// Layer_40
	this.instance_17 = new lib.text15("synched",0);
	this.instance_17.setTransform(32.45,304.95,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(50));

	// Layer_39
	this.instance_18 = new lib.text18("synched",0);
	this.instance_18.setTransform(20.9,288.85,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(50));

	// Layer_38
	this.instance_19 = new lib.text17("synched",0);
	this.instance_19.setTransform(20.9,258.55,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(50));

	// Layer_37
	this.instance_20 = new lib.text16("synched",0);
	this.instance_20.setTransform(20.9,208.45,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(50));

	// Layer_36
	this.instance_21 = new lib.text15("synched",0);
	this.instance_21.setTransform(20.9,166.5,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(50));

	// Layer_35
	this.instance_22 = new lib.text14("synched",0);
	this.instance_22.setTransform(20.9,132.25,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(50));

	// Layer_34
	this.instance_23 = new lib.text13("synched",0);
	this.instance_23.setTransform(20.9,101.9,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(50));

	// Layer_33
	this.instance_24 = new lib.text12("synched",0);
	this.instance_24.setTransform(20.9,74.45,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(50));

	// Layer_32
	this.instance_25 = new lib.text11("synched",0);
	this.instance_25.setTransform(13.35,50.35,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(50));

	// Layer_31
	this.instance_26 = new lib.text10("synched",0);
	this.instance_26.setTransform(13.35,29.35,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(50));

	// Layer_30
	this.instance_27 = new lib.text9("synched",0);
	this.instance_27.setTransform(13.35,8.05,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_27).wait(50));

	// Layer_29
	this.instance_28 = new lib.text8("synched",0);
	this.instance_28.setTransform(1,114.4,0.3231,0.3231,-89.9838);

	this.timeline.addTween(cjs.Tween.get(this.instance_28).wait(50));

	// Layer_28
	this.instance_29 = new lib.text7("synched",0);
	this.instance_29.setTransform(256.45,320.5,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_29).wait(50));

	// Layer_27
	this.instance_30 = new lib.text6("synched",0);
	this.instance_30.setTransform(450.75,318,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_30).wait(50));

	// Layer_26
	this.instance_31 = new lib.text6("synched",0);
	this.instance_31.setTransform(51.85,-14.3,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_31).wait(50));

	// Layer_25
	this.instance_32 = new lib.text5("synched",0);
	this.instance_32.setTransform(412.75,-13.65,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_32).wait(50));

	// Layer_24
	this.instance_33 = new lib.shape106("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_33).wait(50));

	// Layer_23
	this.instance_34 = new lib.text102("synched",0);
	this.instance_34.setTransform(357.75,46.55);

	this.timeline.addTween(cjs.Tween.get(this.instance_34).wait(50));

	// Layer_22
	this.instance_35 = new lib.shape105("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_35).wait(50));

	// Layer_21
	this.instance_36 = new lib.text99("synched",0);
	this.instance_36.setTransform(283.85,173.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_36).wait(50));

	// Layer_20
	this.instance_37 = new lib.shape105("synched",0);
	this.instance_37.setTransform(-73.9,126.65);

	this.timeline.addTween(cjs.Tween.get(this.instance_37).wait(50));

	// Layer_19
	this.instance_38 = new lib.text88("synched",0);
	this.instance_38.setTransform(283.85,173.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_38).wait(50));

	// Layer_18
	this.instance_39 = new lib.shape105("synched",0);
	this.instance_39.setTransform(-73.9,126.65);

	this.timeline.addTween(cjs.Tween.get(this.instance_39).wait(50));

	// Layer_17
	this.instance_40 = new lib.text96("synched",0);
	this.instance_40.setTransform(420.85,173.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_40).wait(50));

	// Layer_16
	this.instance_41 = new lib.shape105("synched",0);
	this.instance_41.setTransform(63.1,126.65);

	this.timeline.addTween(cjs.Tween.get(this.instance_41).wait(50));

	// Layer_15
	this.instance_42 = new lib.text94("synched",0);
	this.instance_42.setTransform(188.85,173.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_42).wait(50));

	// Layer_14
	this.instance_43 = new lib.shape105("synched",0);
	this.instance_43.setTransform(-168.9,126.65);

	this.timeline.addTween(cjs.Tween.get(this.instance_43).wait(50));

	// Layer_13
	this.instance_44 = new lib.text91("synched",0);
	this.instance_44.setTransform(51.8,271.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_44).wait(50));

	// Layer_12
	this.instance_45 = new lib.shape105("synched",0);
	this.instance_45.setTransform(-305.95,224.65);

	this.timeline.addTween(cjs.Tween.get(this.instance_45).wait(50));

	// Layer_11
	this.instance_46 = new lib.text88("synched",0);
	this.instance_46.setTransform(344.85,173.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_46).wait(50));

	// Layer_10
	this.instance_47 = new lib.shape105("synched",0);
	this.instance_47.setTransform(-12.9,126.65);

	this.timeline.addTween(cjs.Tween.get(this.instance_47).wait(50));

	// Layer_9
	this.instance_48 = new lib.text88("synched",0);
	this.instance_48.setTransform(344.85,173.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_48).wait(50));

	// Layer_8
	this.instance_49 = new lib.shape105("synched",0);
	this.instance_49.setTransform(-12.9,126.65);

	this.timeline.addTween(cjs.Tween.get(this.instance_49).wait(50));

	// Layer_7
	this.instance_50 = new lib.shape97("synched",0);
	this.instance_50.setTransform(275.15,172.15);

	this.timeline.addTween(cjs.Tween.get(this.instance_50).wait(50));

	// Layer_6
	this.instance_51 = new lib.shape100("synched",0);
	this.instance_51.setTransform(373.85,54.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_51).wait(50));

	// Layer_5
	this.instance_52 = new lib.shape92("synched",0);
	this.instance_52.setTransform(215.45,164.75);

	this.timeline.addTween(cjs.Tween.get(this.instance_52).wait(50));

	// Layer_4
	this.instance_53 = new lib.shape89("synched",0);
	this.instance_53.setTransform(71,277.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_53).wait(50));

	// Layer_3
	this.instance_54 = new lib.shape80("synched",0);
	this.instance_54.setTransform(277.8,169.15);

	this.timeline.addTween(cjs.Tween.get(this.instance_54).wait(50));

	// Layer_2
	this.instance_55 = new lib.shape104("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_55).wait(50));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.3,-15.5,468.3,361.6);


(lib.sprite103 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {A:0,"A'":154,B:554,C:854,D:1239,E:1579};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		/* stopAllSounds ();
		*/
	}
	this.frame_1834 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1834).call(this.frame_1834).wait(1));

	// Layer_70
	this.instance = new lib.shape86("synched",0);
	this.instance.setTransform(179.7,312.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1835));

	// Layer_69
	this.instance_1 = new lib.text101("synched",0);
	this.instance_1.setTransform(-489.1,288.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1835));

	// Layer_68
	this.instance_2 = new lib.shape86("synched",0);
	this.instance_2.setTransform(179.7,250.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1835));

	// Layer_67
	this.instance_3 = new lib.text98("synched",0);
	this.instance_3.setTransform(-489.1,226.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1835));

	// Layer_66
	this.instance_4 = new lib.shape86("synched",0);
	this.instance_4.setTransform(179.7,190.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1835));

	// Layer_65
	this.instance_5 = new lib.text95("synched",0);
	this.instance_5.setTransform(-489.1,165);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1835));

	// Layer_64
	this.instance_6 = new lib.shape86("synched",0);
	this.instance_6.setTransform(179.7,130);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1835));

	// Layer_63
	this.instance_7 = new lib.text93("synched",0);
	this.instance_7.setTransform(-489.1,103.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1835));

	// Layer_62
	this.instance_8 = new lib.shape86("synched",0);
	this.instance_8.setTransform(179.7,67.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1835));

	// Layer_61
	this.instance_9 = new lib.text90("synched",0);
	this.instance_9.setTransform(-489.1,42.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1835));

	// Layer_60
	this.instance_10 = new lib.shape86("synched",0);
	this.instance_10.setTransform(179.1,28);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1835));

	// Layer_59
	this.instance_11 = new lib.text85("synched",0);
	this.instance_11.setTransform(-489.7,2);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(1835));

	// Layer_58
	this.instance_12 = new lib.text3("synched",0);
	this.instance_12.setTransform(290,71,0.369,0.369,-17.9989);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(1835));

	// Layer_57
	this.instance_13 = new lib.shape84("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(1835));

	// Layer_55
	this.instance_14 = new lib.text30("synched",0);
	this.instance_14.setTransform(182,317,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(1835));

	// Layer_54
	this.instance_15 = new lib.shape83("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(1835));

	// Layer_53
	this.instance_16 = new lib.text28("synched",0);
	this.instance_16.setTransform(282.9,136.7,0.3547,0.3547,-44.1181);

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(1835));

	// Layer_52
	this.instance_17 = new lib.shape82("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(1835));

	// Layer_51
	this.instance_18 = new lib.text26("synched",0);
	this.instance_18.setTransform(440.95,295.95,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(1835));

	// Layer_50
	this.instance_19 = new lib.text25("synched",0);
	this.instance_19.setTransform(406.75,296.9,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(1835));

	// Layer_49
	this.instance_20 = new lib.text24("synched",0);
	this.instance_20.setTransform(449.3,304.95,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(1835));

	// Layer_48
	this.instance_21 = new lib.text23("synched",0);
	this.instance_21.setTransform(381.15,304.95,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(1835));

	// Layer_47
	this.instance_22 = new lib.text22("synched",0);
	this.instance_22.setTransform(344.95,304.95,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(1835));

	// Layer_46
	this.instance_23 = new lib.text12("synched",0);
	this.instance_23.setTransform(309.4,304.95,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(1835));

	// Layer_45
	this.instance_24 = new lib.text21("synched",0);
	this.instance_24.setTransform(270.75,304.95,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(1835));

	// Layer_44
	this.instance_25 = new lib.text13("synched",0);
	this.instance_25.setTransform(228.35,304.95,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(1835));

	// Layer_43
	this.instance_26 = new lib.text20("synched",0);
	this.instance_26.setTransform(186.45,304.95,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(1835));

	// Layer_42
	this.instance_27 = new lib.text14("synched",0);
	this.instance_27.setTransform(140.25,304.95,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_27).wait(1835));

	// Layer_41
	this.instance_28 = new lib.text19("synched",0);
	this.instance_28.setTransform(88.6,304.95,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_28).wait(1835));

	// Layer_40
	this.instance_29 = new lib.text15("synched",0);
	this.instance_29.setTransform(32.45,304.95,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_29).wait(1835));

	// Layer_39
	this.instance_30 = new lib.text18("synched",0);
	this.instance_30.setTransform(20.9,288.85,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_30).wait(1835));

	// Layer_38
	this.instance_31 = new lib.text17("synched",0);
	this.instance_31.setTransform(20.9,258.55,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_31).wait(1835));

	// Layer_37
	this.instance_32 = new lib.text16("synched",0);
	this.instance_32.setTransform(20.9,208.45,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_32).wait(1835));

	// Layer_36
	this.instance_33 = new lib.text15("synched",0);
	this.instance_33.setTransform(20.9,166.5,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_33).wait(1835));

	// Layer_35
	this.instance_34 = new lib.text14("synched",0);
	this.instance_34.setTransform(20.9,132.25,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_34).wait(1835));

	// Layer_34
	this.instance_35 = new lib.text13("synched",0);
	this.instance_35.setTransform(20.9,101.9,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_35).wait(1835));

	// Layer_33
	this.instance_36 = new lib.text12("synched",0);
	this.instance_36.setTransform(20.9,74.45,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_36).wait(1835));

	// Layer_32
	this.instance_37 = new lib.text11("synched",0);
	this.instance_37.setTransform(13.35,50.35,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_37).wait(1835));

	// Layer_31
	this.instance_38 = new lib.text10("synched",0);
	this.instance_38.setTransform(13.35,29.35,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_38).wait(1835));

	// Layer_30
	this.instance_39 = new lib.text9("synched",0);
	this.instance_39.setTransform(13.35,8.05,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_39).wait(1835));

	// Layer_29
	this.instance_40 = new lib.text8("synched",0);
	this.instance_40.setTransform(1,114.4,0.3231,0.3231,-89.9838);

	this.timeline.addTween(cjs.Tween.get(this.instance_40).wait(1835));

	// Layer_28
	this.instance_41 = new lib.text7("synched",0);
	this.instance_41.setTransform(256.45,320.5,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_41).wait(1835));

	// Layer_27
	this.instance_42 = new lib.text6("synched",0);
	this.instance_42.setTransform(450.75,318,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_42).wait(1835));

	// Layer_26
	this.instance_43 = new lib.text6("synched",0);
	this.instance_43.setTransform(51.85,-14.3,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_43).wait(1835));

	// Layer_25
	this.instance_44 = new lib.text5("synched",0);
	this.instance_44.setTransform(412.75,-13.65,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_44).wait(1835));

	// Layer_24
	this.instance_45 = new lib.shape81("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_45).wait(1835));

	// Layer_23
	this.instance_46 = new lib.text102("synched",0);
	this.instance_46.setTransform(357.75,46.55);
	this.instance_46._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_46).wait(1584).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).wait(239));

	// Layer_22
	this.instance_47 = new lib.shape87("synched",0);
	this.instance_47._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_47).wait(1584).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).wait(239));

	// Layer_21
	this.instance_48 = new lib.text99("synched",0);
	this.instance_48.setTransform(283.85,173.2);
	this.instance_48._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_48).wait(1255).to({_off:false},0).wait(580));

	// Layer_20
	this.instance_49 = new lib.text99("synched",0);
	this.instance_49.setTransform(283.85,173.2);

	this.instance_50 = new lib.shape87("synched",0);
	this.instance_50.setTransform(-73.9,126.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_49}]},1243).to({state:[]},3).to({state:[{t:this.instance_49}]},3).to({state:[]},3).to({state:[{t:this.instance_50}]},3).wait(580));

	// Layer_19
	this.instance_51 = new lib.shape87("synched",0);
	this.instance_51.setTransform(-73.9,126.65);

	this.instance_52 = new lib.text88("synched",0);
	this.instance_52.setTransform(283.85,173.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_51}]},1243).to({state:[]},3).to({state:[{t:this.instance_51}]},3).to({state:[]},3).to({state:[{t:this.instance_52}]},3).wait(580));

	// Layer_18
	this.instance_53 = new lib.text88("synched",0);
	this.instance_53.setTransform(283.85,173.2);

	this.instance_54 = new lib.shape87("synched",0);
	this.instance_54.setTransform(-73.9,126.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_53}]},1243).to({state:[]},3).to({state:[{t:this.instance_53}]},3).to({state:[]},3).to({state:[{t:this.instance_54}]},3).wait(580));

	// Layer_17
	this.instance_55 = new lib.shape87("synched",0);
	this.instance_55.setTransform(-73.9,126.65);

	this.instance_56 = new lib.text96("synched",0);
	this.instance_56.setTransform(420.85,173.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_55}]},1243).to({state:[]},3).to({state:[{t:this.instance_55}]},3).to({state:[]},3).to({state:[{t:this.instance_56}]},3).wait(580));

	// Layer_16
	this.instance_57 = new lib.text96("synched",0);
	this.instance_57.setTransform(420.85,173.2);

	this.instance_58 = new lib.shape87("synched",0);
	this.instance_58.setTransform(63.1,126.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_57}]},1239).to({state:[{t:this.instance_58}]},16).wait(580));

	// Layer_15
	this.instance_59 = new lib.shape87("synched",0);
	this.instance_59.setTransform(63.1,126.65);

	this.instance_60 = new lib.text94("synched",0);
	this.instance_60.setTransform(188.85,173.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_59}]},1239).to({state:[{t:this.instance_60}]},16).wait(580));

	// Layer_14
	this.instance_61 = new lib.text94("synched",0);
	this.instance_61.setTransform(188.85,173.2);

	this.instance_62 = new lib.shape87("synched",0);
	this.instance_62.setTransform(-168.9,126.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_61}]},1239).to({state:[{t:this.instance_62}]},16).wait(580));

	// Layer_13
	this.instance_63 = new lib.text96("synched",0);
	this.instance_63.setTransform(420.85,173.2);

	this.instance_64 = new lib.shape87("synched",0);
	this.instance_64.setTransform(-168.9,126.65);

	this.instance_65 = new lib.text91("synched",0);
	this.instance_65.setTransform(51.8,271.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_63}]},858).to({state:[]},3).to({state:[{t:this.instance_63}]},3).to({state:[]},3).to({state:[{t:this.instance_63}]},3).to({state:[{t:this.instance_64}]},369).to({state:[{t:this.instance_65}]},16).wait(580));

	// Layer_12
	this.instance_66 = new lib.shape87("synched",0);
	this.instance_66.setTransform(63.1,126.65);

	this.instance_67 = new lib.text91("synched",0);
	this.instance_67.setTransform(51.8,271.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_66,p:{x:63.1,y:126.65}}]},858).to({state:[]},3).to({state:[{t:this.instance_66,p:{x:63.1,y:126.65}}]},3).to({state:[]},3).to({state:[{t:this.instance_66,p:{x:63.1,y:126.65}}]},3).to({state:[{t:this.instance_67}]},369).to({state:[{t:this.instance_66,p:{x:-305.95,y:224.65}}]},16).wait(580));

	// Layer_11
	this.instance_68 = new lib.text94("synched",0);
	this.instance_68.setTransform(188.85,173.2);

	this.instance_69 = new lib.shape87("synched",0);
	this.instance_69.setTransform(-305.95,224.65);

	this.instance_70 = new lib.text88("synched",0);
	this.instance_70.setTransform(344.85,173.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_68}]},558).to({state:[]},3).to({state:[{t:this.instance_68}]},3).to({state:[]},3).to({state:[{t:this.instance_68}]},3).to({state:[{t:this.instance_69}]},669).to({state:[{t:this.instance_70}]},16).wait(580));

	// Layer_10
	this.instance_71 = new lib.shape87("synched",0);
	this.instance_71.setTransform(-168.9,126.65);

	this.instance_72 = new lib.text88("synched",0);
	this.instance_72.setTransform(344.85,173.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_71,p:{x:-168.9}}]},558).to({state:[]},3).to({state:[{t:this.instance_71,p:{x:-168.9}}]},3).to({state:[]},3).to({state:[{t:this.instance_71,p:{x:-168.9}}]},3).to({state:[{t:this.instance_72}]},669).to({state:[{t:this.instance_71,p:{x:-12.9}}]},16).wait(580));

	// Layer_9
	this.instance_73 = new lib.text91("synched",0);
	this.instance_73.setTransform(51.8,271.2);

	this.instance_74 = new lib.shape87("synched",0);
	this.instance_74.setTransform(-12.9,126.65);

	this.instance_75 = new lib.text88("synched",0);
	this.instance_75.setTransform(344.85,173.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_73}]},554).to({state:[{t:this.instance_74}]},685).to({state:[{t:this.instance_75}]},16).wait(580));

	// Layer_8
	this.instance_76 = new lib.text91("synched",0);
	this.instance_76.setTransform(51.8,271.2);

	this.instance_77 = new lib.shape87("synched",0);
	this.instance_77.setTransform(-305.95,224.65);

	this.instance_78 = new lib.text88("synched",0);
	this.instance_78.setTransform(344.85,173.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_76}]},158).to({state:[]},3).to({state:[{t:this.instance_76}]},3).to({state:[]},3).to({state:[{t:this.instance_76}]},3).to({state:[{t:this.instance_77,p:{x:-305.95,y:224.65}}]},384).to({state:[{t:this.instance_78}]},685).to({state:[{t:this.instance_77,p:{x:-12.9,y:126.65}}]},16).wait(580));

	// Layer_7
	this.instance_79 = new lib.shape87("synched",0);
	this.instance_79.setTransform(-305.95,224.65);

	this.instance_80 = new lib.text88("synched",0);
	this.instance_80.setTransform(344.85,173.2);

	this.instance_81 = new lib.shape100("synched",0);
	this.instance_81.setTransform(373.85,54.2);
	this.instance_81.alpha = 0;
	this.instance_81._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_79,p:{x:-305.95,y:224.65}}]},158).to({state:[]},3).to({state:[{t:this.instance_79,p:{x:-305.95,y:224.65}}]},3).to({state:[]},3).to({state:[{t:this.instance_79,p:{x:-305.95,y:224.65}}]},3).to({state:[{t:this.instance_80}]},384).to({state:[{t:this.instance_79,p:{x:-12.9,y:126.65}}]},685).to({state:[]},16).to({state:[{t:this.instance_81}]},324).to({state:[{t:this.instance_81}]},7).to({state:[{t:this.instance_81}]},7).to({state:[{t:this.instance_81}]},8).to({state:[{t:this.instance_81}]},1).to({state:[]},4).to({state:[{t:this.instance_81}]},3).to({state:[]},3).to({state:[{t:this.instance_81}]},3).wait(220));
	this.timeline.addTween(cjs.Tween.get(this.instance_81).wait(1579).to({_off:false},0).to({alpha:0.5},7).to({alpha:0.8281},7).to({alpha:0.9883},8).wait(1).to({alpha:1},0).to({_off:true},4).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).wait(220));

	// Layer_6
	this.instance_82 = new lib.text88("synched",0);
	this.instance_82.setTransform(344.85,173.2);

	this.instance_83 = new lib.shape87("synched",0);
	this.instance_83.setTransform(-12.9,126.65);

	this.instance_84 = new lib.shape97("synched",0);
	this.instance_84.setTransform(275.15,172.15);
	this.instance_84.alpha = 0;
	this.instance_84._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_82}]},154).to({state:[{t:this.instance_83}]},400).to({state:[{t:this.instance_84}]},685).to({state:[{t:this.instance_84}]},7).to({state:[{t:this.instance_84}]},7).to({state:[{t:this.instance_84}]},8).to({state:[{t:this.instance_84}]},1).to({state:[]},4).to({state:[{t:this.instance_84}]},3).to({state:[]},3).to({state:[{t:this.instance_84}]},3).wait(560));
	this.timeline.addTween(cjs.Tween.get(this.instance_84).wait(1239).to({_off:false},0).to({alpha:0.5},7).to({alpha:0.8281},7).to({alpha:0.9883},8).wait(1).to({alpha:1},0).to({_off:true},4).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).wait(560));

	// Layer_5
	this.instance_85 = new lib.text88("synched",0);
	this.instance_85.setTransform(344.85,173.2);

	this.instance_86 = new lib.shape87("synched",0);
	this.instance_86.setTransform(-12.9,126.65);

	this.instance_87 = new lib.shape92("synched",0);
	this.instance_87.setTransform(215.45,164.75);
	this.instance_87.alpha = 0;
	this.instance_87._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_85}]},4).to({state:[]},3).to({state:[{t:this.instance_85}]},3).to({state:[]},3).to({state:[{t:this.instance_85}]},3).to({state:[{t:this.instance_86}]},138).to({state:[{t:this.instance_87}]},400).to({state:[{t:this.instance_87}]},7).to({state:[{t:this.instance_87}]},7).to({state:[{t:this.instance_87}]},8).to({state:[{t:this.instance_87}]},1).to({state:[]},4).to({state:[{t:this.instance_87}]},3).to({state:[]},3).to({state:[{t:this.instance_87}]},3).wait(1245));
	this.timeline.addTween(cjs.Tween.get(this.instance_87).wait(554).to({_off:false},0).to({alpha:0.5},7).to({alpha:0.8281},7).to({alpha:0.9883},8).wait(1).to({alpha:1},0).to({_off:true},4).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).wait(1245));

	// Layer_4
	this.instance_88 = new lib.shape87("synched",0);
	this.instance_88.setTransform(-12.9,126.65);

	this.instance_89 = new lib.shape89("synched",0);
	this.instance_89.setTransform(71,277.9);
	this.instance_89.alpha = 0.0781;
	this.instance_89._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_88}]},4).to({state:[]},3).to({state:[{t:this.instance_88}]},3).to({state:[]},3).to({state:[{t:this.instance_88}]},3).to({state:[{t:this.instance_89}]},138).to({state:[{t:this.instance_89}]},23).to({state:[{t:this.instance_89}]},1).to({state:[]},3).to({state:[{t:this.instance_89}]},3).to({state:[]},3).to({state:[{t:this.instance_89}]},3).wait(1645));
	this.timeline.addTween(cjs.Tween.get(this.instance_89).wait(154).to({_off:false},0).to({alpha:0.9609},23).wait(1).to({alpha:1},0).to({_off:true},3).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).wait(1645));

	// Layer_3
	this.instance_90 = new lib.shape80("synched",0);
	this.instance_90.setTransform(277.8,169.15);
	this.instance_90.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_90).to({alpha:0.5},7).to({alpha:0.8281},7).to({alpha:0.9883},8).wait(1).to({alpha:1},0).to({_off:true},4).wait(3).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).wait(1799));

	// Layer_2
	this.instance_91 = new lib.shape79("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_91).wait(1835));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-501.3,-15.5,969.3,371.7);


(lib.sprite37 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		/* stopAllSounds ();
		*/
	}
	this.frame_1184 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1184).call(this.frame_1184).wait(1));

	// Masked_Layer_46___40
	this.instance = new lib.text36("synched",0);
	this.instance.setTransform(-487.85,56.25);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1185));

	// Masked_Layer_45___40
	this.instance_1 = new lib.text35("synched",0);
	this.instance_1.setTransform(-487.85,164.25);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1185));

	// Masked_Layer_44___40
	this.instance_2 = new lib.shape34("synched",0);
	this.instance_2.setTransform(-144,-8.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1185));

	// Masked_Layer_41___40
	this.instance_3 = new lib.text33("synched",0);
	this.instance_3.setTransform(-487.85,3.15);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1185));

	// Layer_39
	this.instance_4 = new lib.shape31("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1185));

	// Layer_38
	this.instance_5 = new lib.text30("synched",0);
	this.instance_5.setTransform(182,317,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1185));

	// Layer_37
	this.instance_6 = new lib.shape29("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1185));

	// Layer_36
	this.instance_7 = new lib.text28("synched",0);
	this.instance_7.setTransform(282.9,136.7,0.3547,0.3547,-44.1181);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1185));

	// Layer_35
	this.instance_8 = new lib.shape27("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1185));

	// Layer_34
	this.instance_9 = new lib.text26("synched",0);
	this.instance_9.setTransform(440.95,295.95,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1185));

	// Layer_33
	this.instance_10 = new lib.text25("synched",0);
	this.instance_10.setTransform(406.75,296.9,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1185));

	// Layer_32
	this.instance_11 = new lib.text24("synched",0);
	this.instance_11.setTransform(449.3,304.95,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(1185));

	// Layer_31
	this.instance_12 = new lib.text23("synched",0);
	this.instance_12.setTransform(381.15,304.95,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(1185));

	// Layer_30
	this.instance_13 = new lib.text22("synched",0);
	this.instance_13.setTransform(344.95,304.95,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(1185));

	// Layer_29
	this.instance_14 = new lib.text12("synched",0);
	this.instance_14.setTransform(309.4,304.95,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(1185));

	// Layer_28
	this.instance_15 = new lib.text21("synched",0);
	this.instance_15.setTransform(270.75,304.95,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(1185));

	// Layer_27
	this.instance_16 = new lib.text13("synched",0);
	this.instance_16.setTransform(228.35,304.95,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(1185));

	// Layer_26
	this.instance_17 = new lib.text20("synched",0);
	this.instance_17.setTransform(186.45,304.95,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(1185));

	// Layer_25
	this.instance_18 = new lib.text14("synched",0);
	this.instance_18.setTransform(140.25,304.95,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(1185));

	// Layer_24
	this.instance_19 = new lib.text19("synched",0);
	this.instance_19.setTransform(88.6,304.95,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(1185));

	// Layer_23
	this.instance_20 = new lib.text15("synched",0);
	this.instance_20.setTransform(32.45,304.95,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(1185));

	// Layer_22
	this.instance_21 = new lib.text18("synched",0);
	this.instance_21.setTransform(20.9,288.85,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(1185));

	// Layer_21
	this.instance_22 = new lib.text17("synched",0);
	this.instance_22.setTransform(20.9,258.55,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(1185));

	// Layer_20
	this.instance_23 = new lib.text16("synched",0);
	this.instance_23.setTransform(20.9,208.45,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(1185));

	// Layer_19
	this.instance_24 = new lib.text15("synched",0);
	this.instance_24.setTransform(20.9,166.5,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(1185));

	// Layer_18
	this.instance_25 = new lib.text14("synched",0);
	this.instance_25.setTransform(20.9,132.25,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(1185));

	// Layer_17
	this.instance_26 = new lib.text13("synched",0);
	this.instance_26.setTransform(20.9,101.9,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(1185));

	// Layer_16
	this.instance_27 = new lib.text12("synched",0);
	this.instance_27.setTransform(20.9,74.45,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_27).wait(1185));

	// Layer_15
	this.instance_28 = new lib.text11("synched",0);
	this.instance_28.setTransform(13.35,50.35,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_28).wait(1185));

	// Layer_14
	this.instance_29 = new lib.text10("synched",0);
	this.instance_29.setTransform(13.35,29.35,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_29).wait(1185));

	// Layer_13
	this.instance_30 = new lib.text9("synched",0);
	this.instance_30.setTransform(13.35,8.05,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_30).wait(1185));

	// Layer_12
	this.instance_31 = new lib.text8("synched",0);
	this.instance_31.setTransform(1,114.4,0.3231,0.3231,-89.9838);

	this.timeline.addTween(cjs.Tween.get(this.instance_31).wait(1185));

	// Layer_11
	this.instance_32 = new lib.text7("synched",0);
	this.instance_32.setTransform(256.45,320.5,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_32).wait(1185));

	// Layer_10
	this.instance_33 = new lib.text6("synched",0);
	this.instance_33.setTransform(450.75,318,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_33).wait(1185));

	// Layer_9
	this.instance_34 = new lib.text6("synched",0);
	this.instance_34.setTransform(51.85,-14.3,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_34).wait(1185));

	// Layer_8
	this.instance_35 = new lib.text5("synched",0);
	this.instance_35.setTransform(412.75,-13.65,0.3228,0.3228);

	this.timeline.addTween(cjs.Tween.get(this.instance_35).wait(1185));

	// Layer_7
	this.instance_36 = new lib.text3("synched",0);
	this.instance_36.setTransform(290,71,0.369,0.369,-17.9989);

	this.timeline.addTween(cjs.Tween.get(this.instance_36).wait(1185));

	// Layer_6
	this.instance_37 = new lib.shape1("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_37).wait(1185));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-498.6,-15.5,966.6,361.6);


(lib.sprite_slider = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		MoveSlider();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2));

	// Layer_1
	this.instance = new lib.shape_slider("synched",0);
	this.instance.setTransform(0,0,1.0064,1.0012);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-5,-15,10.1,30);


(lib.sprite_replay = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.buttonreplay();
	new cjs.ButtonHelper(this.instance, 0, 1, 2, false, new lib.buttonreplay(), 3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite_replay, new cjs.Rectangle(-1,-1,42,42), null);


(lib.sprite_playpau = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.buttonplay();
	new cjs.ButtonHelper(this.instance, 0, 1, 2, false, new lib.buttonplay(), 3);

	this.instance_1 = new lib.buttonpause();
	new cjs.ButtonHelper(this.instance_1, 0, 1, 2, false, new lib.buttonpause(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,42.1,42.1);


(lib.sprite281 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.isSingleFrame = false;
	// timeline functions:
	this.frame_0 = function() {
		if(this.isSingleFrame) {
			return;
		}
		if(this.totalFrames == 1) {
			this.isSingleFrame = true;
		}
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// Layer_27
	this.instance = new lib.text280("synched",0);
	this.instance.setTransform(316.9,212.35);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_26
	this.instance_1 = new lib.shape279("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_25
	this.instance_2 = new lib.text278("synched",0);
	this.instance_2.setTransform(95.15,-1.25);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	// Layer_24
	this.instance_3 = new lib.shape277("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

	// Layer_23
	this.instance_4 = new lib.text276("synched",0);
	this.instance_4.setTransform(70.1,218.05);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

	// Layer_22
	this.instance_5 = new lib.shape275("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1));

	// Layer_20
	this.instance_6 = new lib.sprite240();
	this.instance_6.setTransform(217.5,222.4,2.0326,2.0326,89.9923);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1));

	// Layer_19
	this.instance_7 = new lib.shape274("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1));

	// Layer_18
	this.instance_8 = new lib.text273("synched",0);
	this.instance_8.setTransform(332.3,-31.55);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1));

	// Layer_17
	this.instance_9 = new lib.shape243("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1));

	// Layer_15
	this.instance_10 = new lib.sprite240();
	this.instance_10.setTransform(214.4,29.75,2.0326,2.0326,104.9926);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1));

	// Layer_14
	this.instance_11 = new lib.shape272("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(1));

	// Layer_13
	this.instance_12 = new lib.text271("synched",0);
	this.instance_12.setTransform(1.8,175.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(1));

	// Layer_12
	this.instance_13 = new lib.text270("synched",0);
	this.instance_13.setTransform(2.85,-33.65);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(1));

	// Layer_11
	this.instance_14 = new lib.shape269("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(1));

	// Layer_6
	this.instance_15 = new lib.sprite268();
	this.instance_15.setTransform(221.25,272.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(1));

	// Layer_1
	this.instance_16 = new lib.sprite265();
	this.instance_16.setTransform(228.25,86.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite281, new cjs.Rectangle(-2.1,-37.3,441,416.40000000000003), null);


(lib.sprite245 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.isSingleFrame = false;
	// timeline functions:
	this.frame_0 = function() {
		if(this.isSingleFrame) {
			return;
		}
		if(this.totalFrames == 1) {
			this.isSingleFrame = true;
		}
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// Layer_25
	this.instance = new lib.text244("synched",0);
	this.instance.setTransform(350.35,-3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_24
	this.instance_1 = new lib.shape243("synched",0);
	this.instance_1.setTransform(17.6,28.5,1,0.9972);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_23
	this.instance_2 = new lib.text242("synched",0);
	this.instance_2.setTransform(315.55,209.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	// Layer_22
	this.instance_3 = new lib.shape241("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

	// Layer_20
	this.instance_4 = new lib.sprite240();
	this.instance_4.setTransform(282.85,218.3,2.0326,2.0326,-90.0077);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

	// Layer_19
	this.instance_5 = new lib.shape238("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1));

	// Layer_18
	this.instance_6 = new lib.text237("synched",0);
	this.instance_6.setTransform(2.6,-30.25);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1));

	// Layer_17
	this.instance_7 = new lib.text236("synched",0);
	this.instance_7.setTransform(123.2,194.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1));

	// Layer_16
	this.instance_8 = new lib.shape235("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1));

	// Layer_15
	this.instance_9 = new lib.text234("synched",0);
	this.instance_9.setTransform(87.25,31.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1));

	// Layer_14
	this.instance_10 = new lib.shape233("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1));

	// Layer_12
	this.instance_11 = new lib.text232("synched",0);
	this.instance_11.setTransform(2.6,162.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(1));

	// Layer_6
	this.instance_12 = new lib.sprite231();
	this.instance_12.setTransform(221.25,275.25,0.9,0.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(1));

	// Layer_1
	this.instance_13 = new lib.sprite228();
	this.instance_13.setTransform(216.85,54.3,0.9,0.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite245, new cjs.Rectangle(-1.3,-33.9,457.6,405.4), null);


// stage content:
(lib.PerformanceChecks = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {p1:0,p2:1185,p3:3020,p4:3335,p5:3845,p6:4520,p7:5275,p8:5276,p9:5277,p10:5278};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,1,1183,1184,1185,1186,3018,3019,3020,3021,3333,3334,3335,3336,3843,3844,3845,3846,4518,4519,4520,4521,5273,5274,5275,5276,5277,5278];
	this.streamSoundSymbolsList[1] = [{id:"PerformanceCheck1",startFrame:1,endFrame:1184,loop:1,offset:0}];
	this.streamSoundSymbolsList[1186] = [{id:"PerformanceCheck2",startFrame:1186,endFrame:3019,loop:1,offset:0}];
	this.streamSoundSymbolsList[3021] = [{id:"PerformanceCheck3",startFrame:3021,endFrame:3334,loop:1,offset:0}];
	this.streamSoundSymbolsList[3336] = [{id:"PerformanceCheck4",startFrame:3336,endFrame:3844,loop:1,offset:0}];
	this.streamSoundSymbolsList[3846] = [{id:"PerformanceCheck5",startFrame:3846,endFrame:4519,loop:1,offset:0}];
	this.streamSoundSymbolsList[4521] = [{id:"PerformanceCheck6",startFrame:4521,endFrame:5257,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		InitPage(10);
		Next(1);
		Prev(0);
		InitAnim();
		
		//-------------------------------------
		//ページ移動
		//-------------------------------------
		// NEXTボタンクリック
		this.next.addEventListener("click", ClickNext);
		// PREVボタンクリック
		this.previous.addEventListener("click", ClickPrev);
		
		//-------------------------------------
		// スライダー操作関連
		//-------------------------------------
		// 再生/停止ボタンクリック
		this.playpau.addEventListener("click", ClickPlayPau);
		// リプレイボタンクリック
		this.replay.addEventListener("click", ClickReplay);
	}
	this.frame_1 = function() {
		var soundInstance = playSound("PerformanceCheck1",0);
		this.InsertIntoSoundStreamData(soundInstance,1,1184,1);
	}
	this.frame_1183 = function() {
		this.stop();
	}
	this.frame_1184 = function() {
		this.stop();
	}
	this.frame_1185 = function() {
		Prev(1);
		InitAnim();
	}
	this.frame_1186 = function() {
		var soundInstance = playSound("PerformanceCheck2",0);
		this.InsertIntoSoundStreamData(soundInstance,1186,3019,1);
	}
	this.frame_3018 = function() {
		this.stop();
	}
	this.frame_3019 = function() {
		this.stop();
	}
	this.frame_3020 = function() {
		InitAnim();
	}
	this.frame_3021 = function() {
		var soundInstance = playSound("PerformanceCheck3",0);
		this.InsertIntoSoundStreamData(soundInstance,3021,3334,1);
	}
	this.frame_3333 = function() {
		this.stop();
	}
	this.frame_3334 = function() {
		this.stop();
	}
	this.frame_3335 = function() {
		InitAnim();
	}
	this.frame_3336 = function() {
		var soundInstance = playSound("PerformanceCheck4",0);
		this.InsertIntoSoundStreamData(soundInstance,3336,3844,1);
	}
	this.frame_3843 = function() {
		this.stop();
	}
	this.frame_3844 = function() {
		this.stop();
	}
	this.frame_3845 = function() {
		InitAnim();
	}
	this.frame_3846 = function() {
		var soundInstance = playSound("PerformanceCheck5",0);
		this.InsertIntoSoundStreamData(soundInstance,3846,4519,1);
	}
	this.frame_4518 = function() {
		this.stop();
	}
	this.frame_4519 = function() {
		this.stop();
	}
	this.frame_4520 = function() {
		InitAnim();
	}
	this.frame_4521 = function() {
		var soundInstance = playSound("PerformanceCheck6",0);
		this.InsertIntoSoundStreamData(soundInstance,4521,5257,1);
	}
	this.frame_5273 = function() {
		this.stop();
	}
	this.frame_5274 = function() {
		this.stop();
	}
	this.frame_5275 = function() {
		this.stop();
	}
	this.frame_5276 = function() {
		this.stop();
	}
	this.frame_5277 = function() {
		Next(1);
		this.stop();
	}
	this.frame_5278 = function() {
		Next(0);
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1182).call(this.frame_1183).wait(1).call(this.frame_1184).wait(1).call(this.frame_1185).wait(1).call(this.frame_1186).wait(1832).call(this.frame_3018).wait(1).call(this.frame_3019).wait(1).call(this.frame_3020).wait(1).call(this.frame_3021).wait(312).call(this.frame_3333).wait(1).call(this.frame_3334).wait(1).call(this.frame_3335).wait(1).call(this.frame_3336).wait(507).call(this.frame_3843).wait(1).call(this.frame_3844).wait(1).call(this.frame_3845).wait(1).call(this.frame_3846).wait(672).call(this.frame_4518).wait(1).call(this.frame_4519).wait(1).call(this.frame_4520).wait(1).call(this.frame_4521).wait(752).call(this.frame_5273).wait(1).call(this.frame_5274).wait(1).call(this.frame_5275).wait(1).call(this.frame_5276).wait(1).call(this.frame_5277).wait(1).call(this.frame_5278).wait(1));

	// Layer_page
	this.page = new cjs.Text("Page number", "italic bold 15px 'Arial'", "#FF9900");
	this.page.name = "page";
	this.page.lineHeight = 17;
	this.page.lineWidth = 193;
	this.page.parent = this;
	this.page.setTransform(23,658,1.4989,1.4989);

	this.timeline.addTween(cjs.Tween.get(this.page).wait(5279));

	// Layer_next
	this.next = new lib.buttonnext();
	this.next.name = "next";
	this.next.setTransform(1496.1,5.1,0.9998,0.9999,0,0,0,0.1,0.1);
	new cjs.ButtonHelper(this.next, 0, 1, 2, false, new lib.buttonnext(), 3);

	this.timeline.addTween(cjs.Tween.get(this.next).wait(5279));

	// Layer_previous
	this.previous = new lib.buttonprev();
	this.previous.name = "previous";
	this.previous.setTransform(1432,5,1.0003,0.9993);
	new cjs.ButtonHelper(this.previous, 0, 1, 2, false, new lib.buttonprev(), 3);

	this.timeline.addTween(cjs.Tween.get(this.previous).wait(5279));

	// Layer_slider
	this.slider = new lib.sprite_slider();
	this.slider.name = "slider";
	this.slider.setTransform(610.1,670.1,0.9937,0.9983,0,0,0,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.slider).to({_off:true},5275).wait(4));

	// Layer_replay
	this.replay = new lib.sprite_replay();
	this.replay.name = "replay";
	this.replay.setTransform(1045.1,650.1,0.9999,0.9999,0,0,0,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.replay).to({_off:true},5275).wait(4));

	// Layer_slider_base
	this.instance = new lib.sprite_sliderbase();
	this.instance.setTransform(600,650,1,0.9999);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true},5275).wait(4));

	// Layer_playpau
	this.playpau = new lib.sprite_playpau();
	this.playpau.name = "playpau";
	this.playpau.setTransform(555,650,0.9999,0.9999);

	this.timeline.addTween(cjs.Tween.get(this.playpau).to({_off:true},5275).wait(4));

	// Layer_118
	this.instance_1 = new lib.text44("synched",0);
	this.instance_1.setTransform(36,46.4,1.5031,1.5021);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(5279));

	// Layer_117
	this.instance_2 = new lib.shape43("synched",0);
	this.instance_2.setTransform(10.5,1.2,1.5021,1.5021);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(5279));

	// Layer_116
	this.instance_3 = new lib.text42("synched",0);
	this.instance_3.setTransform(10,0,1.5021,1.5021);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(5279));

	// Layer_115
	this.instance_4 = new lib.shape298("synched",0);
	this.instance_4.setTransform(35.1,0,1.5021,1.5021);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(5278).to({_off:false},0).wait(1));

	// Layer_111
	this.instance_5 = new lib.shape262("synched",0);
	this.instance_5.setTransform(27,0,1.5021,1.5021);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(5277).to({_off:false},0).to({_off:true},1).wait(1));

	// Layer_105
	this.instance_6 = new lib.text297("synched",0);
	this.instance_6.setTransform(176.05,532.95,1.5021,1.5021);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(5278).to({_off:false},0).wait(1));

	// Layer_104
	this.instance_7 = new lib.text296("synched",0);
	this.instance_7.setTransform(176.05,409.1,1.5021,1.5021);
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(5278).to({_off:false},0).wait(1));

	// Layer_103
	this.instance_8 = new lib.text295("synched",0);
	this.instance_8.setTransform(176.05,494.8,1.5021,1.5021);
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(5278).to({_off:false},0).wait(1));

	// Layer_102
	this.instance_9 = new lib.text294("synched",0);
	this.instance_9.setTransform(437.2,420.2,1.5021,1.5021);
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(5278).to({_off:false},0).wait(1));

	// Layer_101
	this.instance_10 = new lib.text261("synched",0);
	this.instance_10.setTransform(388.55,508.75,1.5023,1.5021);

	this.instance_11 = new lib.text293("synched",0);
	this.instance_11.setTransform(437.2,357.05,1.5021,1.5021);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_10}]},5277).to({state:[{t:this.instance_11}]},1).wait(1));

	// Layer_100
	this.instance_12 = new lib.text260("synched",0);
	this.instance_12.setTransform(388.55,458.5,1.5023,1.5021);

	this.instance_13 = new lib.text292("synched",0);
	this.instance_13.setTransform(437.2,251.45,1.5021,1.5021);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_12}]},5277).to({state:[{t:this.instance_13}]},1).wait(1));

	// Layer_99
	this.instance_14 = new lib.text259("synched",0);
	this.instance_14.setTransform(388.55,280.5,1.5023,1.5021);

	this.instance_15 = new lib.text291("synched",0);
	this.instance_15.setTransform(437.2,190.05,1.5021,1.5021);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_14}]},5277).to({state:[{t:this.instance_15}]},1).wait(1));

	// Layer_98
	this.instance_16 = new lib.text258("synched",0);
	this.instance_16.setTransform(388.55,233.1,1.5023,1.5021);

	this.instance_17 = new lib.text290("synched",0);
	this.instance_17.setTransform(176.05,460.15,1.5021,1.5021);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_16}]},5277).to({state:[{t:this.instance_17}]},1).wait(1));

	// Layer_97
	this.instance_18 = new lib.text257("synched",0);
	this.instance_18.setTransform(388.55,192.75,1.5023,1.5021);

	this.instance_19 = new lib.text289("synched",0);
	this.instance_19.setTransform(178.7,357.05,1.5021,1.5021);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_18}]},5277).to({state:[{t:this.instance_19}]},1).wait(1));

	// Layer_96
	this.instance_20 = new lib.text256("synched",0);
	this.instance_20.setTransform(153.15,511.45,1.5023,1.5021);

	this.instance_21 = new lib.text288("synched",0);
	this.instance_21.setTransform(177.2,257.45,1.5021,1.5021);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_20}]},5277).to({state:[{t:this.instance_21}]},1).wait(1));

	// Layer_95
	this.instance_22 = new lib.text255("synched",0);
	this.instance_22.setTransform(155.8,463.1,1.5023,1.5021);

	this.instance_23 = new lib.text287("synched",0);
	this.instance_23.setTransform(176.75,222.9,1.5021,1.5021);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_22}]},5277).to({state:[{t:this.instance_23}]},1).wait(1));

	// Layer_94
	this.instance_24 = new lib.text120("synched",0);
	this.instance_24.setTransform(1013.55,49.7,1.5031,1.5021);

	this.instance_25 = new lib.text254("synched",0);
	this.instance_25.setTransform(155.8,316.45,1.5023,1.5021);

	this.instance_26 = new lib.text286("synched",0);
	this.instance_26.setTransform(177.2,190.05,1.5021,1.5021);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_24}]},3020).to({state:[]},1500).to({state:[{t:this.instance_25}]},757).to({state:[{t:this.instance_26}]},1).wait(1));

	// Layer_93
	this.instance_27 = new lib.shape119("synched",0);
	this.instance_27.setTransform(243,0,1.5021,1.5021);

	this.instance_28 = new lib.text253("synched",0);
	this.instance_28.setTransform(155.35,279.35,1.5023,1.5021);

	this.instance_29 = new lib.text285("synched",0);
	this.instance_29.setTransform(31.6,429.05,1.5021,1.5021);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_27}]},3020).to({state:[]},1500).to({state:[{t:this.instance_28}]},757).to({state:[{t:this.instance_29}]},1).wait(1));

	// Layer_92
	this.instance_30 = new lib.shape86("synched",0);
	this.instance_30.setTransform(1044.9,317.1,1.5021,1.5021);

	this.instance_31 = new lib.text252("synched",0);
	this.instance_31.setTransform(155.8,195.45,1.5023,1.5021);

	this.instance_32 = new lib.text284("synched",0);
	this.instance_32.setTransform(45.9,222,1.5021,1.5021);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_30}]},3845).to({state:[]},675).to({state:[{t:this.instance_31}]},757).to({state:[{t:this.instance_32}]},1).wait(1));

	// Layer_91
	this.instance_33 = new lib.text124("synched",0);
	this.instance_33.setTransform(37.65,282.85,1.5021,1.5021);

	this.instance_34 = new lib.text182("synched",0);
	this.instance_34.setTransform(49.5,157.85,1.5021,1.5021);

	this.instance_35 = new lib.text251("synched",0);
	this.instance_35.setTransform(14.55,489.15,1.5023,1.5021);

	this.instance_36 = new lib.text249("synched",0);
	this.instance_36.setTransform(486.6,109.95,1.5021,1.5021);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_33}]},3845).to({state:[]},675).to({state:[{t:this.instance_34}]},755).to({state:[]},1).to({state:[{t:this.instance_35}]},1).to({state:[{t:this.instance_36}]},1).wait(1));

	// Layer_90
	this.instance_37 = new lib.shape86("synched",0);
	this.instance_37.setTransform(1046.25,161.3,1.5021,1.5021);

	this.instance_38 = new lib.text183("synched",0);
	this.instance_38.setTransform(49.5,191.5,1.5021,1.5021);

	this.instance_39 = new lib.text250("synched",0);
	this.instance_39.setTransform(29.6,222,1.5023,1.5021);

	this.instance_40 = new lib.text248("synched",0);
	this.instance_40.setTransform(214.05,109.95,1.5021,1.5021);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_37}]},3845).to({state:[]},675).to({state:[{t:this.instance_38}]},755).to({state:[]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_40}]},1).wait(1));

	// Layer_89
	this.instance_41 = new lib.text118("synched",0);
	this.instance_41.setTransform(39,124.2,1.5021,1.5021);

	this.instance_42 = new lib.shape212("synched",0);
	this.instance_42.setTransform(27,0,1.5021,1.5021);

	this.instance_43 = new lib.text249("synched",0);
	this.instance_43.setTransform(406.95,104,1.5023,1.5021);

	this.instance_44 = new lib.text283("synched",0);
	this.instance_44.setTransform(32.9,109.95,1.5021,1.5021);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_41}]},3845).to({state:[]},675).to({state:[{t:this.instance_42}]},755).to({state:[]},1).to({state:[{t:this.instance_43}]},1).to({state:[{t:this.instance_44}]},1).wait(1));

	// Layer_88
	this.instance_45 = new lib.shape86("synched",0);
	this.instance_45.setTransform(1046.25,161.3,1.5021,1.5021);

	this.instance_46 = new lib.text137("synched",0);
	this.instance_46.setTransform(31.15,88.15,1.5021,1.5021);

	this.instance_47 = new lib.text211("synched",0);
	this.instance_47.setTransform(-37.8,174.65,1.5021,1.5021);

	this.instance_48 = new lib.text248("synched",0);
	this.instance_48.setTransform(185.75,104,1.5023,1.5021);

	this.instance_49 = new lib.shape282("synched",0);
	this.instance_49.setTransform(13.5,0,1.5021,1.5021);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_45}]},3020).to({state:[{t:this.instance_46}]},825).to({state:[]},675).to({state:[{t:this.instance_47}]},755).to({state:[]},1).to({state:[{t:this.instance_48}]},1).to({state:[{t:this.instance_49}]},1).wait(1));

	// Layer_87
	this.instance_50 = new lib.text118("synched",0);
	this.instance_50.setTransform(39,124.2,1.5021,1.5021);

	this.instance_51 = new lib.shape86("synched",0);
	this.instance_51.setTransform(1044.9,253.1,1.5021,1.5021);

	this.instance_52 = new lib.text178("synched",0);
	this.instance_52.setTransform(1013.55,49.7,1.5031,1.5021);

	this.instance_53 = new lib.text210("synched",0);
	this.instance_53.setTransform(46.5,233.85,1.5021,1.5021);

	this.instance_54 = new lib.text247("synched",0);
	this.instance_54.setTransform(11.25,92.45,1.5023,1.5021);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_50}]},3020).to({state:[{t:this.instance_51}]},825).to({state:[{t:this.instance_52}]},675).to({state:[{t:this.instance_53}]},755).to({state:[]},1).to({state:[{t:this.instance_54}]},1).to({state:[]},1).wait(1));

	// Layer_86
	this.instance_55 = new lib.text117("synched",0);
	this.instance_55.setTransform(31.15,88.15,1.5021,1.5021);

	this.instance_56 = new lib.text137("synched",0);
	this.instance_56.setTransform(31.15,88.15,1.5021,1.5021);

	this.instance_57 = new lib.text123("synched",0);
	this.instance_57.setTransform(37.65,216,1.5021,1.5021);

	this.instance_58 = new lib.shape177("synched",0);
	this.instance_58.setTransform(243,0,1.5021,1.5021);

	this.instance_59 = new lib.text209("synched",0);
	this.instance_59.setTransform(46.5,88.15,1.5021,1.5021);

	this.instance_60 = new lib.shape246("synched",0);
	this.instance_60.setTransform(13.5,0,1.5021,1.5021);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_55}]},3020).to({state:[{t:this.instance_56}]},315).to({state:[{t:this.instance_57}]},510).to({state:[{t:this.instance_58}]},675).to({state:[{t:this.instance_59}]},755).to({state:[]},1).to({state:[{t:this.instance_60}]},1).to({state:[]},1).wait(1));

	// Layer_84
	this.instance_61 = new lib.text39("synched",0);
	this.instance_61.setTransform(870,617,1.5021,1.5021);

	this.timeline.addTween(cjs.Tween.get(this.instance_61).to({_off:true},5275).wait(4));

	// Layer_1
	this.ani1 = new lib.sprite37();
	this.ani1.name = "ani1";
	this.ani1.setTransform(784.85,81.85,1.5021,1.5021);

	this.ani2 = new lib.sprite103();
	this.ani2.name = "ani2";
	this.ani2.setTransform(784.85,81.85,1.5021,1.5021);

	this.ani3 = new lib.sprite116();
	this.ani3.name = "ani3";
	this.ani3.setTransform(1278.7,321.3,1.5021,1.5021);

	this.ani4 = new lib.sprite136();
	this.ani4.name = "ani4";
	this.ani4.setTransform(1278.7,321.3,1.5021,1.5021);

	this.ani5 = new lib.sprite156();
	this.ani5.name = "ani5";
	this.ani5.setTransform(1278.7,321.3,1.5021,1.5021);

	this.ani6 = new lib.sprite176();
	this.ani6.name = "ani6";
	this.ani6.setTransform(1278.7,321.3,1.5021,1.5021);

	this.ani7 = new lib.sprite208();
	this.ani7.name = "ani7";
	this.ani7.setTransform(854.8,97.7,1.5023,1.5021);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.ani1}]}).to({state:[{t:this.ani2}]},1185).to({state:[{t:this.ani3}]},1835).to({state:[{t:this.ani4}]},315).to({state:[{t:this.ani5}]},510).to({state:[{t:this.ani6}]},675).to({state:[{t:this.ani7}]},755).to({state:[]},1).wait(3));

	// Layer_60
	this.instance_62 = new lib.sprite110();
	this.instance_62.setTransform(784.85,81.85,1.5021,1.5021);
	this.instance_62._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_62).wait(3020).to({_off:false},0).to({_off:true},2255).wait(4));

	// Mask_Layer_1 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_5276 = new cjs.Graphics().p("Eh8/AyyMAAAhfTMD5/AAAMAAABfTg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:null,x:0,y:0}).wait(5276).to({graphics:mask_graphics_5276,x:800,y:325}).wait(3));

	// Masked_Layer_2___1
	this.ani8 = new lib.sprite224();
	this.ani8.name = "ani8";
	this.ani8.setTransform(793.75,107.05,1.5023,1.5021);

	this.ani9 = new lib.sprite245();
	this.ani9.name = "ani9";
	this.ani9.setTransform(793.75,109.75,1.5023,1.5021);

	this.ani10 = new lib.sprite281();
	this.ani10.name = "ani10";
	this.ani10.setTransform(793.75,109.75,1.5023,1.5021);

	var maskedShapeInstanceList = [this.ani8,this.ani9,this.ani10];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.ani8}]},5276).to({state:[{t:this.ani9}]},1).to({state:[{t:this.ani10}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(810,350,787,341);
// library properties:
lib.properties = {
	id: '786DCE5F8407AE4380EFB6EA9159D292',
	width: 1600,
	height: 700,
	fps: 25,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/PerformanceChecks_atlas_1.png", id:"PerformanceChecks_atlas_1"},
		{src:"images/PerformanceChecks_atlas_2.png", id:"PerformanceChecks_atlas_2"},
		{src:"images/PerformanceChecks_atlas_3.png", id:"PerformanceChecks_atlas_3"},
		{src:"images/PerformanceChecks_atlas_4.png", id:"PerformanceChecks_atlas_4"},
		{src:"images/PerformanceChecks_atlas_5.png", id:"PerformanceChecks_atlas_5"},
		{src:"images/PerformanceChecks_atlas_6.png", id:"PerformanceChecks_atlas_6"},
		{src:"sounds/PerformanceCheck1.mp3", id:"PerformanceCheck1"},
		{src:"sounds/PerformanceCheck2.mp3", id:"PerformanceCheck2"},
		{src:"sounds/PerformanceCheck3.mp3", id:"PerformanceCheck3"},
		{src:"sounds/PerformanceCheck4.mp3", id:"PerformanceCheck4"},
		{src:"sounds/PerformanceCheck5.mp3", id:"PerformanceCheck5"},
		{src:"sounds/PerformanceCheck6.mp3", id:"PerformanceCheck6"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['786DCE5F8407AE4380EFB6EA9159D292'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;