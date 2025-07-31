(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"vital_opsm_ssw_atlas_1", frames: [[0,962,864,763],[0,0,1280,960]]},
		{name:"vital_opsm_ssw_atlas_2", frames: [[0,1764,1231,229],[0,339,1213,337],[0,963,1190,283],[0,1248,1178,283],[0,1533,1246,229],[0,678,1206,283],[0,0,1264,337]]},
		{name:"vital_opsm_ssw_atlas_3", frames: [[0,924,1197,229],[0,693,1201,229],[0,0,1228,229],[0,1155,1193,229],[0,231,1227,229],[0,1386,1262,175],[0,1563,1227,175],[0,462,1212,229],[0,1740,1224,175]]},
		{name:"vital_opsm_ssw_atlas_4", frames: [[0,1239,1191,175],[0,708,1201,175],[0,531,1204,175],[0,1770,1060,175],[0,0,1210,175],[0,1593,1160,175],[0,1062,1193,175],[0,1416,1190,175],[0,354,1206,175],[0,885,1197,175],[0,177,1209,175]]},
		{name:"vital_opsm_ssw_atlas_5", frames: [[0,0,1189,120],[317,122,1170,120],[543,1822,461,106],[1097,1568,411,100],[936,876,654,106],[810,1360,623,100],[608,1562,487,156],[910,672,864,100],[0,1042,1267,82],[0,1126,865,120],[936,774,720,100],[1269,984,585,100],[1658,774,352,100],[1457,448,441,100],[317,570,1250,100],[1569,550,433,100],[1185,1466,428,100],[608,1720,651,100],[317,244,1386,100],[317,346,1374,100],[0,798,934,120],[1706,1574,310,100],[1776,652,265,106],[1158,1176,558,100],[1592,876,417,106],[1682,1342,291,100],[1750,1824,190,144],[1615,1466,352,106],[543,1930,444,106],[0,1478,1183,82],[0,920,899,120],[1191,0,605,120],[317,448,1138,120],[0,672,908,124],[0,571,282,98],[989,1983,738,43],[1489,122,525,88],[1269,1086,641,88],[867,1126,289,232],[438,1248,370,202],[0,122,315,447],[0,1248,436,228],[1551,1824,197,146],[1706,1676,211,146],[1718,1176,208,164],[1326,1813,223,168],[1261,1670,267,141],[1530,1574,174,185],[0,1562,253,362],[255,1562,351,257],[255,1821,286,173],[1006,1822,318,149],[1435,1278,245,186],[1705,212,244,184]]},
		{name:"vital_opsm_ssw_atlas_6", frames: [[310,346,177,56],[577,260,157,100],[137,0,265,100],[137,102,255,100],[404,0,265,100],[671,0,169,156],[394,102,255,100],[651,158,243,100],[225,670,71,67],[326,497,72,88],[0,690,71,67],[276,587,76,81],[489,346,80,97],[0,333,111,81],[0,619,73,69],[75,619,73,69],[469,619,73,69],[544,619,73,69],[619,622,73,69],[694,622,73,69],[769,622,73,69],[844,622,73,69],[919,622,73,69],[952,551,67,63],[73,690,67,63],[472,690,61,56],[535,690,61,56],[598,693,61,56],[150,639,73,69],[310,275,227,69],[400,538,90,69],[0,548,90,69],[92,548,90,69],[736,260,105,69],[492,548,90,69],[584,548,90,69],[676,551,90,69],[768,551,90,69],[860,551,90,69],[184,568,90,69],[310,204,265,69],[725,480,95,69],[822,480,95,69],[919,480,95,69],[229,497,95,69],[113,362,75,91],[956,387,54,91],[421,445,74,91],[77,455,74,91],[153,455,74,91],[497,455,74,91],[573,455,74,91],[649,455,74,91],[354,664,54,91],[190,362,75,91],[571,362,75,91],[648,362,75,91],[725,387,75,91],[802,387,75,91],[879,387,75,91],[267,404,75,91],[344,404,75,91],[0,416,75,91],[354,609,113,53],[410,690,60,60],[736,332,276,53],[0,0,135,201],[842,0,178,145],[896,147,121,183],[177,204,131,156],[0,204,175,127]]}
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



(lib.CachedBmp_134 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_4"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_133 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_3"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_132 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_4"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_131 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_3"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_130 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_4"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_129 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_128 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_4"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_127 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_126 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_125 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_124 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_123 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_122 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_121 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_120 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_119 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_118 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_3"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_117 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_116 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_4"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_115 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_114 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_113 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_112 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_111 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_110 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_109 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_108 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_107 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_106 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_4"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_105 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_2"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_104 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_2"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_103 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_3"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_102 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_101 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_100 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_4"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_99 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_2"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_98 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_4"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_97 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_3"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_96 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_95 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_94 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_93 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_2"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_92 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_4"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_91 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_4"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_90 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_89 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_88 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_87 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_86 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_85 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_84 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_83 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_82 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_81 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_80 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_79 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_78 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_77 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_76 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_2"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_75 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_3"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_74 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_73 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_72 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_71 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_70 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_69 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_68 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_67 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_3"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_66 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_3"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_65 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_4"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_64 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_3"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_63 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(30);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_62 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(31);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_61 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(32);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_60 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(33);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_59 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_58 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_57 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_56 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_55 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_54 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_53 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_52 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_51 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_50 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_49 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_48 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_47 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_46 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_45 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_44 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(34);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_43 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_42 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(30);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_41 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(31);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_40 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(32);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_39 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(33);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_38 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(34);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_37 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(35);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_36 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(36);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_35 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(37);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_34 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(38);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_33 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(39);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_32 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(40);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_31 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(41);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_30 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(42);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_29 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(43);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_28 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(44);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_27 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(35);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_26 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(36);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_25 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(37);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_24 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(45);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_23 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(46);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_22 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(47);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_21 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(48);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_20 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(49);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_19 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(50);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_18 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(51);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_17 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(52);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_16 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(53);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_15 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(54);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_14 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(55);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_13 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(56);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_12 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(57);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_11 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(58);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_10 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(59);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_9 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(60);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_8 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(61);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_7 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(62);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_6 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_5 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(38);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_4 = function() {
	this.initialize(img.CachedBmp_4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1269,2099);


(lib.CachedBmp_3 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(63);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(64);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(65);
}).prototype = p = new cjs.Sprite();



(lib.image150 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(39);
}).prototype = p = new cjs.Sprite();



(lib.image156 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(40);
}).prototype = p = new cjs.Sprite();



(lib.image161 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(41);
}).prototype = p = new cjs.Sprite();



(lib.image201 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(42);
}).prototype = p = new cjs.Sprite();



(lib.image202 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(43);
}).prototype = p = new cjs.Sprite();



(lib.image203 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(44);
}).prototype = p = new cjs.Sprite();



(lib.image204 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(45);
}).prototype = p = new cjs.Sprite();



(lib.image211 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(66);
}).prototype = p = new cjs.Sprite();



(lib.image212 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.image224 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(46);
}).prototype = p = new cjs.Sprite();



(lib.image227 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(67);
}).prototype = p = new cjs.Sprite();



(lib.image230 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(47);
}).prototype = p = new cjs.Sprite();



(lib.image236 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(48);
}).prototype = p = new cjs.Sprite();



(lib.image239 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(68);
}).prototype = p = new cjs.Sprite();



(lib.image242 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(69);
}).prototype = p = new cjs.Sprite();



(lib.image249 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(49);
}).prototype = p = new cjs.Sprite();



(lib.image251 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(50);
}).prototype = p = new cjs.Sprite();



(lib.image268 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_6"]);
	this.gotoAndStop(70);
}).prototype = p = new cjs.Sprite();



(lib.image269 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(51);
}).prototype = p = new cjs.Sprite();



(lib.image270 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(52);
}).prototype = p = new cjs.Sprite();



(lib.image271 = function() {
	this.initialize(ss["vital_opsm_ssw_atlas_5"]);
	this.gotoAndStop(53);
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
	this.instance = new lib.CachedBmp_134();
	this.instance.setTransform(-3.95,-3.4,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,393.7,57.9);


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
	this.instance = new lib.CachedBmp_133();
	this.instance.setTransform(-3.95,-3.4,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,395.7,75.7);


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
	this.instance = new lib.CachedBmp_132();
	this.instance.setTransform(-3.95,-3.4,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,397,57.9);


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
	this.instance = new lib.CachedBmp_131();
	this.instance.setTransform(-3.95,-3.4,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,397,75.7);


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
	this.instance = new lib.CachedBmp_130();
	this.instance.setTransform(-3.95,-3.4,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,398,57.9);


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
	this.instance = new lib.CachedBmp_129();
	this.instance.setTransform(-3.95,-3.4,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,393,39.699999999999996);


(lib.text282 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-3.95,-3.4,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,350.4,57.9);


(lib.text281 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-3.95,-3.4,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,386.7,39.699999999999996);


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
	this.instance = new lib.CachedBmp_126();
	this.instance.setTransform(-3.95,-3.7,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,152.4,35.1);


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
	this.instance = new lib.CachedBmp_125();
	this.instance.setTransform(-3.95,-3.7,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,135.8,33.1);


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
	this.instance = new lib.CachedBmp_124();
	this.instance.setTransform(-3.2,-3.7,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.2,-3.7,216.2,35.1);


(lib.text274 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-3.95,-3.7,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,205.9,33.1);


(lib.text267 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-3.95,-3.7,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,161,51.6);


(lib.text265 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-3.95,-3.7,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,285.59999999999997,33.1);


(lib.text262 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(0,0,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,418.9,27.1);


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
	this.instance = new lib.CachedBmp_119();
	this.instance.setTransform(-3.95,-3.4,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,285.9,39.699999999999996);


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
	this.instance = new lib.CachedBmp_118();
	this.instance.setTransform(-3.95,-3.4,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,405.9,75.7);


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
	this.instance = new lib.CachedBmp_117();
	this.instance.setTransform(-3.95,-3.4,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,406.9,75.7);


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
	this.instance = new lib.CachedBmp_116();
	this.instance.setTransform(-3.95,-3.4,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,400,57.9);


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
	this.instance = new lib.CachedBmp_115();
	this.instance.setTransform(-3.95,-3.4,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,401,111.4);


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
	this.instance = new lib.CachedBmp_114();
	this.instance.setTransform(39.7,-2.1,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(39.7,-2.1,58.5,18.5);


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
	this.instance = new lib.CachedBmp_113();
	this.instance.setTransform(-36.5,-2.9,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-36.5,-2.9,238,33.1);


(lib.text241 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-16.2,-3.7,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.2,-3.7,193.39999999999998,33.1);


(lib.text238 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(18.7,-2.9,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(18.7,-2.9,116.39999999999999,33.1);


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
	this.instance = new lib.CachedBmp_110();
	this.instance.setTransform(48,-3.7,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(48,-3.7,51.900000000000006,33.1);


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
	this.instance = new lib.CachedBmp_109();
	this.instance.setTransform(-5.05,-3.7,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-5,-3.7,145.8,33.1);


(lib.text229 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-138.8,-3.7,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-138.8,-3.7,413.2,33.1);


(lib.text226 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-3.25,-3.7,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.2,-3.7,143.1,33.1);


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
	this.instance = new lib.CachedBmp_106();
	this.instance.setTransform(-3.95,-3.4,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,383.4,57.9);


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
	this.instance = new lib.CachedBmp_105();
	this.instance.setTransform(-3.95,-3.4,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,393.29999999999995,93.60000000000001);


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
	this.instance = new lib.CachedBmp_104();
	this.instance.setTransform(-3.95,-3.4,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,389.4,93.60000000000001);


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
	this.instance = new lib.CachedBmp_103();
	this.instance.setTransform(-3.95,-3.4,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,394.29999999999995,75.7);


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
	this.instance = new lib.CachedBmp_102();
	this.instance.setTransform(-2.5,-3.7,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2.5,-3.7,141.5,33.1);


(lib.text214 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-11.5,-3.7,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-11.5,-3.7,215.2,33.1);


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
	this.instance = new lib.CachedBmp_100();
	this.instance.setTransform(-3.95,-3.4,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,394.29999999999995,57.9);


(lib.text208 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-3.95,-3.4,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,411.9,75.7);


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
	this.instance = new lib.CachedBmp_98();
	this.instance.setTransform(-3.95,-3.4,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,393.29999999999995,57.9);


(lib.text206 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-3.95,-3.4,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,405.59999999999997,75.7);


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
	this.instance = new lib.CachedBmp_96();
	this.instance.setTransform(-3.95,-3.7,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,458.09999999999997,33.1);


(lib.text198 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-3.95,-3.7,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,454.2,33.1);


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
	this.instance = new lib.CachedBmp_94();
	this.instance.setTransform(-3.95,-3.4,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,308.7,39.699999999999996);


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
	this.instance = new lib.CachedBmp_93();
	this.instance.setTransform(-3.95,-3.4,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,398.59999999999997,93.60000000000001);


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
	this.instance = new lib.CachedBmp_92();
	this.instance.setTransform(-3.95,-3.4,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,398.59999999999997,57.9);


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
	this.instance = new lib.CachedBmp_91();
	this.instance.setTransform(-3.95,-3.4,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,395.7,57.9);


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
	this.instance = new lib.CachedBmp_90();
	this.instance.setTransform(-3.95,-3.7,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,102.5,33.1);


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
	this.instance = new lib.CachedBmp_89();
	this.instance.setTransform(-5.55,-4.45,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-5.5,-4.4,87.6,35);


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
	this.instance = new lib.CachedBmp_88();
	this.instance.setTransform(-3.95,-3.7,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,184.4,33.1);


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
	this.instance = new lib.CachedBmp_87();
	this.instance.setTransform(-4,-3.7,0.3114,0.3114);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.7,129.9,33);


(lib.text173 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-3.95,-3.7,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,87.60000000000001,33.1);


(lib.text172 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-3.95,-3.7,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,84.30000000000001,33.1);


(lib.text171 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-3.95,-3.7,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,96.2,33.1);


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
	this.instance = new lib.CachedBmp_83();
	this.instance.setTransform(-3.95,-3.7,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,87.60000000000001,33.1);


(lib.text168 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(9.95,-3.7,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(10,-3.7,62.8,47.6);


(lib.text167 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-3.95,-3.7,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,55.8,51.6);


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
	this.instance = new lib.CachedBmp_80();
	this.instance.setTransform(-3.95,-3.7,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,84.30000000000001,33.1);


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
	this.instance = new lib.CachedBmp_79();
	this.instance.setTransform(-3.95,-3.7,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,80.30000000000001,33.1);


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
	this.instance = new lib.CachedBmp_78();
	this.instance.setTransform(-3.95,-3.7,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,116.30000000000001,35.1);


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
	this.instance = new lib.CachedBmp_77();
	this.instance.setTransform(-3.95,-2.9,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-2.9,146.70000000000002,35.1);


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
	this.instance = new lib.CachedBmp_76();
	this.instance.setTransform(-3.95,-3.4,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,417.79999999999995,111.4);


(lib.text147 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-3.95,-3.4,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,417.09999999999997,57.9);


(lib.text108 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(0,0,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,391.1,27.1);


(lib.text103 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-2.65,-3.05,0.3685,0.3685);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2.6,-3,26.1,24.7);


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
	this.instance = new lib.CachedBmp_72();
	this.instance.setTransform(-4,-3.9,0.3673,0.3673);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.9,26.5,32.3);


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
	this.instance = new lib.CachedBmp_71();
	this.instance.setTransform(-3.95,-4.05,0.3685,0.3685);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-4,26.099999999999998,24.7);


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
	this.instance = new lib.CachedBmp_70();
	this.instance.setTransform(-10.85,-2.5,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-10.8,-2.5,25.1,26.8);


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
	this.instance = new lib.CachedBmp_69();
	this.instance.setTransform(-3.95,-3.95,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.9,26.4,32);


(lib.text92 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-11.35,-3,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-11.3,-3,36.7,26.8);


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
	this.instance = new lib.CachedBmp_67();
	this.instance.setTransform(-3.95,-3.4,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,405.59999999999997,57.9);


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
	this.instance = new lib.CachedBmp_66();
	this.instance.setTransform(-3.95,-3.4,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,400.59999999999997,75.7);


(lib.text89 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-3.95,-3.4,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,399.59999999999997,57.9);


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
	this.instance = new lib.CachedBmp_64();
	this.instance.setTransform(-3.95,-3.4,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,404.59999999999997,57.9);


(lib.text87 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-3.95,-3.4,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,297.2,39.699999999999996);


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
	this.instance = new lib.CachedBmp_62();
	this.instance.setTransform(-3.95,-3.4,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,200,39.699999999999996);


(lib.text83 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-3.95,-3.4,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,376.2,39.699999999999996);


(lib.text82 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-3.95,-3.75,0.3304,0.3304);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,299.9,40.900000000000006);


(lib.text79 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-1.7,-2.5,0.3569,0.3569);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.7,-2.5,26.099999999999998,24.7);


(lib.text78 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-2.1,-1.75,0.3567,0.3567);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2.1,-1.7,26.1,24.599999999999998);


(lib.text76 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-1.65,-2.15,0.3566,0.3566);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.6,-2.1,26,24.6);


(lib.text74 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-1.9,-1.9,0.3565,0.3565);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.9,-1.9,26.099999999999998,24.599999999999998);


(lib.text72 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-1.4,-1.75,0.3565,0.3565);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.4,-1.7,26.099999999999998,24.599999999999998);


(lib.text70 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-1.4,-1.55,0.3565,0.3565);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.4,-1.5,26,24.6);


(lib.text68 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-1.65,-1.6,0.3564,0.3564);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.6,-1.6,26,24.6);


(lib.text67 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-2.35,-2,0.3564,0.3564);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2.3,-2,26,24.6);


(lib.text65 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-1.75,-2.45,0.3562,0.3562);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.7,-2.4,26,24.599999999999998);


(lib.text63 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-1.4,-2,0.3561,0.3561);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.4,-2,23.9,22.5);


(lib.text62 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-1.4,-2,0.3561,0.3561);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.4,-2,23.9,22.5);


(lib.text61 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-2.3,-1.9,0.3568,0.3568);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2.3,-1.9,21.8,20);


(lib.text59 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-2.3,-1.9,0.3568,0.3568);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2.3,-1.9,21.8,20);


(lib.text58 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-2.3,-1.9,0.3568,0.3568);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2.3,-1.9,21.8,20);


(lib.text56 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-1.4,-1.9,0.3561,0.3561);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.4,-1.9,26,24.599999999999998);


(lib.text54 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-4,-4.05,0.356,0.356);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-4,100.4,34.9);


(lib.text52 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-2.2,-1.3,0.3555,0.3555);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2.2,-1.3,80.7,24.6);


(lib.text50 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-0.95,-2,0.357,0.357);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.9,-2,32.1,24.7);


(lib.text49 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-0.95,-2,0.357,0.357);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.9,-2,32.1,24.7);


(lib.text48 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-0.95,-2,0.357,0.357);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.9,-2,32.1,24.7);


(lib.text46 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-0.85,-2.15,0.357,0.357);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.8,-2.1,37.5,24.6);


(lib.text45 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-0.85,-2.15,0.357,0.357);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.8,-2.1,32.1,24.6);


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
	this.instance = new lib.CachedBmp_37();
	this.instance.setTransform(-0.85,-2.15,0.357,0.357);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.8,-2.1,32.1,24.6);


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
	this.instance = new lib.CachedBmp_36();
	this.instance.setTransform(0.1,-2.9,0.3564,0.3564);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0.1,-2.9,32.1,24.599999999999998);


(lib.text40 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-1.1,-2.35,0.3563,0.3563);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.1,-2.3,32.1,24.6);


(lib.text38 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-1.15,-2,0.356,0.356);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.1,-2,32,24.6);


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
	this.instance = new lib.CachedBmp_33();
	this.instance.setTransform(-0.85,-2.5,0.3558,0.3558);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.8,-2.5,32,24.6);


(lib.text34 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-1.7,-1.4,0.3563,0.3563);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.7,-1.4,94.5,24.599999999999998);


(lib.text32 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-2,-1.3,0.3555,0.3555);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2,-1.3,33.8,24.6);


(lib.text31 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-2,-1.3,0.3555,0.3555);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2,-1.3,33.8,24.6);


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
	this.instance = new lib.CachedBmp_29();
	this.instance.setTransform(-1.3,-1.8,0.3555,0.3555);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.3,-1.8,33.8,24.6);


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
	this.instance = new lib.CachedBmp_28();
	this.instance.setTransform(-3.15,-1.5,0.3555,0.3555);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.1,-1.5,33.7,24.6);


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
	this.instance = new lib.CachedBmp_27();
	this.instance.setTransform(-3.95,-1,0.3555,0.3555);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-1,262.29999999999995,15.3);


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
	this.instance = new lib.CachedBmp_26();
	this.instance.setTransform(-3.95,-3.8,0.3555,0.3555);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.8,186.6,31.3);


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
	this.instance = new lib.CachedBmp_25();
	this.instance.setTransform(-3.95,-3.8,0.3555,0.3555);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.8,227.8,31.3);


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
	this.instance = new lib.CachedBmp_24();
	this.instance.setTransform(-3.95,-3.9,0.3555,0.3555);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.9,26.599999999999998,32.4);


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
	this.instance = new lib.CachedBmp_23();
	this.instance.setTransform(2.6,-3.9,0.3555,0.3555);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(2.6,-3.9,19.2,32.4);


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
	this.instance = new lib.CachedBmp_22();
	this.instance.setTransform(-3.95,-3.9,0.3555,0.3555);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.9,26.299999999999997,32.4);


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
	this.instance = new lib.CachedBmp_21();
	this.instance.setTransform(-3.95,-3.9,0.3555,0.3555);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.9,26.299999999999997,32.4);


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
	this.instance = new lib.CachedBmp_20();
	this.instance.setTransform(-3.95,-3.9,0.3555,0.3555);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.9,26.299999999999997,32.4);


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
	this.instance = new lib.CachedBmp_19();
	this.instance.setTransform(-3.95,-3.9,0.3555,0.3555);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.9,26.299999999999997,32.4);


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
	this.instance = new lib.CachedBmp_18();
	this.instance.setTransform(-3.95,-3.9,0.3555,0.3555);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.9,26.299999999999997,32.4);


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
	this.instance = new lib.CachedBmp_17();
	this.instance.setTransform(-3.95,-3.9,0.3555,0.3555);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.9,26.299999999999997,32.4);


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
	this.instance = new lib.CachedBmp_16();
	this.instance.setTransform(-0.65,-3.9,0.3555,0.3555);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.6,-3.9,19.200000000000003,32.4);


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
	this.instance = new lib.CachedBmp_15();
	this.instance.setTransform(-3.95,-3.9,0.3555,0.3555);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.9,26.599999999999998,32.4);


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
	this.instance = new lib.CachedBmp_14();
	this.instance.setTransform(-3.95,-3.9,0.3555,0.3555);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.9,26.599999999999998,32.4);


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
	this.instance = new lib.CachedBmp_13();
	this.instance.setTransform(-3.95,-3.9,0.3555,0.3555);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.9,26.599999999999998,32.4);


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
	this.instance = new lib.CachedBmp_12();
	this.instance.setTransform(-3.95,-3.9,0.3555,0.3555);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.9,26.599999999999998,32.4);


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
	this.instance = new lib.CachedBmp_11();
	this.instance.setTransform(-3.95,-3.9,0.3555,0.3555);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.9,26.599999999999998,32.4);


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
	this.instance = new lib.CachedBmp_10();
	this.instance.setTransform(-3.95,-3.9,0.3555,0.3555);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.9,26.599999999999998,32.4);


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
	this.instance = new lib.CachedBmp_9();
	this.instance.setTransform(-3.95,-3.9,0.3555,0.3555);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.9,26.599999999999998,32.4);


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
	this.instance = new lib.CachedBmp_8();
	this.instance.setTransform(-3.95,-3.9,0.3555,0.3555);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.9,26.599999999999998,32.4);


(lib.text4 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_7();
	this.instance.setTransform(-3.95,-3.9,0.3555,0.3555);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.9,26.599999999999998,32.4);


(lib.shape289 = function(mode,startPosition,loop,reversed) {
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
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgJAHgIQAIgHAJAAQAKAAAIAHQAHAIAAAJQAAAKgHAIQgIAHgKAAQgJAAgIgHg");
	this.shape.setTransform(-355.85,295.3);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_4
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgJAHgIQAIgHAJAAQAKAAAIAHQAHAIAAAJQAAAKgHAIQgIAHgKAAQgJAAgIgHg");
	this.shape_1.setTransform(-355.85,247.6);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_3
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgRARQgHgGAAgLQAAgKAHgHQAIgHAJAAQAKAAAIAHQAHAHAAAKQAAALgHAGQgIAIgKAAQgJAAgIgIg");
	this.shape_2.setTransform(-355.85,147.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_2
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgRARQgHgGAAgLQAAgJAHgIQAIgHAJAAQAKAAAIAHQAHAIAAAJQAAALgHAGQgIAIgKAAQgJAAgIgIg");
	this.shape_3.setTransform(-355.85,77.4);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	// Layer_1
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgRARQgHgGAAgLQAAgKAHgHQAIgHAJAAQAKAAAIAHQAHAHAAAKQAAALgHAGQgIAIgKAAQgJAAgIgIg");
	this.shape_4.setTransform(-355.85,35);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-358.3,32.5,5,265.3);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AL9C0I35AAIAAlnIX5AAg");
	this.shape.setTransform(373.4,367.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("Ar8C0IAAlnIX5AAIAAFng");
	this.shape_1.setTransform(373.4,367.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(295.9,348.9,155,38);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("ApNhZISbAAIAACzIybAAg");
	this.shape.setTransform(136.1,359.15);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("ApNBaIAAizISbAAIAACzg");
	this.shape_1.setTransform(136.1,359.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(76.1,349.2,120,20);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("ARCC0MgiDAAAIAAlnMAiDAAAg");
	this.shape.setTransform(121.85,159);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AxBC0IAAlnMAiDAAAIAAFng");
	this.shape_1.setTransform(121.85,159);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(11.9,140,220,38);


(lib.shape273 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AOEBaI8HAAIAAizIcHAAg");
	this.shape.setTransform(357.85,167.55);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AuDBaIAAizIcHAAIAACzg");
	this.shape_1.setTransform(357.85,167.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(266.9,157.6,182,20);


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

	// Layer_6
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("AAPNIIge6P");
	this.shape.setTransform(452.6,148.15);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_5
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FF9900").ss(2,1,0,3).p("AC5mHQgcgLgdgGAgzmcQgeAGgcAJABEmiIg8gBAF8heQgHgegKgcAFRjOIgagnAFzj1QgSgYgVgWAGGAXIgCg7AEflLQgXgTgagPAikl1QgaAOgYASAkFktIgFAFQgTATgQAUAlPjPQgQAagLAcAl7hgQgHAegCAgAlvCMQAKAcAPAbAk2D2IAmAtAjjFMIAxAiAE3D3QASgZAOgaAFvCNQAKgcAFgeAFAEwIArgvAh7GJIA6ARAgFGiIA4ABABvGdQAegGAcgJADgF1IAzgfAmFAWQACAfAFAd");
	this.shape_1.setTransform(94.1,94);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#FF9900").ss(3,1,0,3).p("AC5i5QgWgWgYgQADrB2QANgbAHgeAEGADIAAgDQAAgdgGgcADthxQgNgbgTgYAghkEQgeAEgcAKAiQjbQgVAOgTAUIgFAFAjiiFQgPAagJAdAkFgRIAAARQAAAUADAUAitDDQAXAWAaANAhFD9IA8AJACfDRIAagYIAQgRABUj5QgcgJgggDAAyEBQAegFAbgMAjzBiQALAbASAZ");
	this.shape_2.setTransform(440.075,37.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1}]}).wait(1));

	// Layer_4
	this.shape_3 = new cjs.Shape();
	var sprImg_shape_3 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_ssw_atlas_6"],70);
	sprImg_shape_3.onload = function(){
		this.shape_3.graphics.bf(sprImg_shape_3, null, new cjs.Matrix2D(1,0,0,1,-87.5,-63.5)).s().p("AtqJ7IAAz1IbVAAIAAT1g")
	}.bind(this);
	this.shape_3.setTransform(374.3,285.35);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	// Layer_3
	this.shape_4 = new cjs.Shape();
	var sprImg_shape_4 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_ssw_atlas_5"],51);
	sprImg_shape_4.onload = function(){
		this.shape_4.graphics.bf(sprImg_shape_4, null, new cjs.Matrix2D(1,0,0,1,-159,-74.5)).s().p("A41LpIAA3RMAxrAAAIAAXRg")
	}.bind(this);
	this.shape_4.setTransform(118,274.35);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	// Layer_2
	this.shape_5 = new cjs.Shape();
	var sprImg_shape_5 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_ssw_atlas_5"],52);
	sprImg_shape_5.onload = function(){
		this.shape_5.graphics.bf(sprImg_shape_5, null, new cjs.Matrix2D(1,0,0,1,-122.5,-93)).s().p("AzIOiIAA9DMAmRAAAIAAdDg")
	}.bind(this);
	this.shape_5.setTransform(376.3,85);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(1));

	// Layer_1
	this.shape_6 = new cjs.Shape();
	var sprImg_shape_6 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_ssw_atlas_5"],53);
	sprImg_shape_6.onload = function(){
		this.shape_6.graphics.bf(sprImg_shape_6, null, new cjs.Matrix2D(1.011,0,0,1.011,-123.3,-93)).s().p("AzROiIAA9DMAmiAAAIAAdDg")
	}.bind(this);
	this.shape_6.setTransform(123.65,85);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-41,-8,539.8,356.9);


(lib.shape266 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AMtkNIAAIbI5ZAAIAAobg");
	this.shape.setTransform(739.15,390.05);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.498)").s().p("AssEOIAAobIZZAAIAAIbg");
	this.shape_1.setTransform(739.15,390.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(656.9,362.1,164.5,56);


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

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("Az1hZMAnrAAAIAACzMgnrAAAg");
	this.shape.setTransform(503.825,344.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.498)").s().p("Az1BaIAAizMAnrAAAIAACzg");
	this.shape_1.setTransform(503.825,344.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(375.8,335,256.09999999999997,20);


(lib.shape263 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("AhwgfIxTlJATEFoI0fmC");
	this.shape.setTransform(604.25,264.85);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FF9900").ss(4,1,0,3).p("ABaksIg8gGAgckyIg7AGAiSkfQgdAIgbALADNkLQgbgMgdgIAGDhyQgOgagVgYAEwDRIAsgoAF/B5QAQgaAIgdAGgAIIAAgIQAAgegHgcAEzjOIgwgiAkAjxQgTALgSAOIgMAJAiYEeIA7AOAghEyIA6AAADJEOQAcgMAbgPAkFDuQAZAQAcAMABVEtIA7gMAlcinQgVAXgOAZAmWhBQgIAdgBAeAmZA3QAHAdAOAbAljChQATAWAYAU");
	this.shape_1.setTransform(435.225,223.55);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(391.7,190.9,336.00000000000006,111.49999999999997);


(lib.shape255 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgJAHgIQAHgHAKAAQAKAAAHAHQAIAIAAAJQAAAKgIAIQgHAHgKAAQgKAAgHgHg");
	this.shape.setTransform(-355.8,277.05);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_3
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgJAHgIQAHgHAKAAQAKAAAHAHQAIAIAAAJQAAAKgIAIQgHAHgKAAQgKAAgHgHg");
	this.shape_1.setTransform(-355.8,202.6);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgRARQgHgHAAgKQAAgKAHgHQAHgHAKAAQAKAAAHAHQAIAHAAAKQAAAKgIAHQgHAIgKAAQgKAAgHgIg");
	this.shape_2.setTransform(-355.8,127.05);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgRARQgHgHAAgKQAAgKAHgHQAHgHAKAAQAKAAAHAHQAIAHAAAKQAAAKgIAHQgHAIgKAAQgKAAgHgIg");
	this.shape_3.setTransform(-355.8,17.7);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-358.3,15.2,5,264.40000000000003);


(lib.shape253 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#FFFFFF").ss(6,0,0,3).p("Am6IBIAAveAm/niIOYAA");
	this.shape.setTransform(356.3,233.75);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(308.6,182.5,98,105.5);


(lib.shape252 = function(mode,startPosition,loop,reversed) {
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
	var sprImg_shape = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_ssw_atlas_5"],50);
	sprImg_shape.onload = function(){
		this.shape.graphics.bf(sprImg_shape, null, new cjs.Matrix2D(1,0,0,1,-143,-86.5)).s().p("A2VNhIAA7BMAsrAAAIAAbBg")
	}.bind(this);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-143,-86.5,286,173);


(lib.shape250 = function(mode,startPosition,loop,reversed) {
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
	var sprImg_shape = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_ssw_atlas_5"],49);
	sprImg_shape.onload = function(){
		this.shape.graphics.bf(sprImg_shape, null, new cjs.Matrix2D(1,0,0,1,-175.5,-128.5)).s().p("A7aUFMAAAgoJMA21AAAMAAAAoJg")
	}.bind(this);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-175.5,-128.5,351,257);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AEnBaIpNAAIAAizIJNAAg");
	this.shape.setTransform(100.95,55.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.6)").s().p("AkmBaIAAizIJNAAIAACzg");
	this.shape_1.setTransform(100.95,55.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(70.5,45.8,61,20);


(lib.shape245 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#FF0000").ss(3,0,0,3).p("ACADrIj/nV");
	this.shape.setTransform(112.175,88.75);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(97.9,63.7,28.599999999999994,50.099999999999994);


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

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AwPhZMAgfAAAIAACzMggfAAAg");
	this.shape.setTransform(131.025,179.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.6)").s().p("AwPBaIAAizMAgfAAAIAACzg");
	this.shape_1.setTransform(131.025,179.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#FF9900").ss(4,1,0,3).p("AAAikIg7AHADIAkIAFgkIgCgYAC0hPQgOgTgVgSIgIgGABUiWQgcgKgggDAhyiIQgQAIgOAMIgRAQAjCgzQgKAYAAAbIAAAHAhkCRQAbAMAeAFAARClIA8gLACEB+IANgJIAcgdAi9BBQANAYAYAV");
	this.shape_2.setTransform(132.5551,139.675);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_1
	this.shape_3 = new cjs.Shape();
	var sprImg_shape_3 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_ssw_atlas_6"],69);
	sprImg_shape_3.onload = function(){
		this.shape_3.graphics.bf(sprImg_shape_3, null, new cjs.Matrix2D(0.949,0,0,0.949,-62.1,-74)).s().p("AptLkIAA3HITaAAIAAXHg")
	}.bind(this);
	this.shape_3.setTransform(131,94.2);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(26,20.2,210.1,169.3);


(lib.shape240 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("ANNBaI6ZAAIAAizIaZAAg");
	this.shape.setTransform(135.5,1.85);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.6)").s().p("AtMBaIAAizIaZAAIAACzg");
	this.shape_1.setTransform(135.5,1.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	var sprImg_shape_2 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_ssw_atlas_6"],68);
	sprImg_shape_2.onload = function(){
		this.shape_2.graphics.bf(sprImg_shape_2, null, new cjs.Matrix2D(1,0,0,1,-60.5,-91.5)).s().p("ApcOTIAA8lIS5AAIAAclg")
	}.bind(this);
	this.shape_2.setTransform(135.5,-99.6);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(50,-191.1,171,203);


(lib.shape237 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AnuhZIPdAAIAACzIvdAAg");
	this.shape.setTransform(-99.5,176.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.6)").s().p("AnuBaIAAizIPdAAIAACzg");
	this.shape_1.setTransform(-99.5,176.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	var sprImg_shape_2 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_ssw_atlas_5"],48);
	sprImg_shape_2.onload = function(){
		this.shape_2.graphics.bf(sprImg_shape_2, null, new cjs.Matrix2D(0.98,0,0,0.98,-124,-177.4)).s().p("AzXbuMAAAg3bMAmvAAAMAAAA3bg")
	}.bind(this);
	this.shape_2.setTransform(-102,-13.4);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("EglBAg+MAAAhB7MBKDAAAMAAABB7g");
	this.shape_3.setTransform(5.075,-0.75);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-231.9,-211.7,474,422);


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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("ADaDlImznJ");
	this.shape.setTransform(141.025,77.3);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(117.8,52.9,46.500000000000014,48.800000000000004);


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

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("ADcBaIm3AAIAAizIG3AAg");
	this.shape.setTransform(117,44.25);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.6)").s().p("AjbBaIAAizIG3AAIAACzg");
	this.shape_1.setTransform(117,44.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(94,34.3,46,20);


(lib.shape231 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("ALaBaI2zAAIAAizIWzAAg");
	this.shape.setTransform(129,180.65);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.6)").s().p("ArZBaIAAizIWzAAIAACzg");
	this.shape_1.setTransform(129,180.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	var sprImg_shape_2 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_ssw_atlas_5"],47);
	sprImg_shape_2.onload = function(){
		this.shape_2.graphics.bf(sprImg_shape_2, null, new cjs.Matrix2D(1,0,0,1,-87,-92.5)).s().p("AtlOdIAA85IbLAAIAAc5g")
	}.bind(this);
	this.shape_2.setTransform(129,78.9);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(42,-13.6,174,204.29999999999998);


(lib.shape228 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("EAgqABaMhBTAAAIAAizMBBTAAAg");
	this.shape.setTransform(-7,-37.65);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.6)").s().p("EggpABaIAAizMBBTAAAIAACzg");
	this.shape_1.setTransform(-7,-37.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	var sprImg_shape_2 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_ssw_atlas_6"],67);
	sprImg_shape_2.onload = function(){
		this.shape_2.graphics.bf(sprImg_shape_2, null, new cjs.Matrix2D(1,0,0,1,-89,-72.5)).s().p("At5LVIAA2pIbzAAIAAWpg")
	}.bind(this);
	this.shape_2.setTransform(-107,58.9);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-217,-47.6,420,179);


(lib.shape225 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("ArZhZIWzAAIAACzI2zAAg");
	this.shape.setTransform(-107,140.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.6)").s().p("ArZBaIAAizIWzAAIAACzg");
	this.shape_1.setTransform(-107,140.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	var sprImg_shape_2 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_ssw_atlas_5"],46);
	sprImg_shape_2.onload = function(){
		this.shape_2.graphics.bf(sprImg_shape_2, null, new cjs.Matrix2D(1,0,0,1,-133.5,-70.5)).s().p("A02LBIAA2BMAptAAAIAAWBg")
	}.bind(this);
	this.shape_2.setTransform(-7,-119.4);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("EglfAhcMAAAhC3MBK/AAAMAAABC3g");
	this.shape_3.setTransform(-10.6,-1.025);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-250.6,-215,480,428);


(lib.shape223 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgJAHgIQAHgHAKAAQALAAAGAHQAIAIAAAJQAAAKgIAIQgGAHgLAAQgKAAgHgHg");
	this.shape.setTransform(-352,10.2);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgKAHgHQAHgHAKAAQALAAAGAHQAIAHAAAKQAAAKgIAIQgGAHgLAAQgKAAgHgHg");
	this.shape_1.setTransform(-352,240.8);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-354.5,7.7,5,235.60000000000002);


(lib.shape219 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgJAHgIQAHgHAKAAQALAAAGAHQAIAIAAAJQAAAKgIAIQgGAHgLAAQgKAAgHgHg");
	this.shape.setTransform(-352,197.2);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgRARQgHgGAAgLQAAgKAHgHQAHgHAKAAQALAAAGAHQAIAHAAAKQAAALgIAGQgGAIgLAAQgKAAgHgIg");
	this.shape_1.setTransform(-352,96.2);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-354.5,93.7,5,105.99999999999999);


(lib.shape217 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_6();
	this.instance.setTransform(-116.7,-141.45,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-116.7,-141.4,285.6,252.2);


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

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("ArKhZIWVAAIAACzI2VAAg");
	this.shape.setTransform(154.4,147.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.6)").s().p("ArKBaIAAizIWVAAIAACzg");
	this.shape_1.setTransform(154.4,147.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(81.9,138,145,20);


(lib.shape213 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("Aw3hZMAhvAAAIAACzMghvAAAg");
	this.shape.setTransform(-85.9,147.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.498)").s().p("Aw3BaIAAizMAhvAAAIAACzg");
	this.shape_1.setTransform(-85.9,147.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	var sprImg_shape_2 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_ssw_atlas_6"],66);
	sprImg_shape_2.onload = function(){
		this.shape_2.graphics.bf(sprImg_shape_2, null, new cjs.Matrix2D(1.458,0,0,1.458,-96.9,-144.5)).s().p("Au2WWMAAAgsrIduAAMAAAAsrg")
	}.bind(this);
	this.shape_2.setTransform(152.35,-14.2);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_1
	this.shape_3 = new cjs.Shape();
	var sprImg_shape_3 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_ssw_atlas_1"],1);
	sprImg_shape_3.onload = function(){
		this.shape_3.graphics.bf(sprImg_shape_3, null, new cjs.Matrix2D(0.292,0,0,0.292,-164.4,-140)).s().p("A0TV4MAAAgrvMAonAAAMAAAArvg")
	}.bind(this);
	this.shape_3.setTransform(-82,-15);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-212,-157.2,459.5,315.2);


(lib.shape205 = function(mode,startPosition,loop,reversed) {
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
	var sprImg_shape = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_ssw_atlas_5"],42);
	sprImg_shape.onload = function(){
		this.shape.graphics.bf(sprImg_shape, null, new cjs.Matrix2D(1,0,0,1,-98.5,-73)).s().p("AvYLaIAA2zIexAAIAAWzg")
	}.bind(this);
	this.shape.setTransform(305.25,287);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_3
	this.shape_1 = new cjs.Shape();
	var sprImg_shape_1 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_ssw_atlas_5"],43);
	sprImg_shape_1.onload = function(){
		this.shape_1.graphics.bf(sprImg_shape_1, null, new cjs.Matrix2D(1,0,0,1,-105.5,-73)).s().p("AweLaIAA2zMAg9AAAIAAWzg")
	}.bind(this);
	this.shape_1.setTransform(88.3,287);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	var sprImg_shape_2 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_ssw_atlas_5"],44);
	sprImg_shape_2.onload = function(){
		this.shape_2.graphics.bf(sprImg_shape_2, null, new cjs.Matrix2D(1.025,0,0,1.024,-106.5,-84)).s().p("AwoNIIAA6PMAhSAAAIAAaPg")
	}.bind(this);
	this.shape_2.setTransform(313.35,102);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_1
	this.shape_3 = new cjs.Shape();
	var sprImg_shape_3 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_ssw_atlas_5"],45);
	sprImg_shape_3.onload = function(){
		this.shape_3.graphics.bf(sprImg_shape_3, null, new cjs.Matrix2D(1,0,0,1,-111.5,-84)).s().p("AxaNIIAA6PMAi1AAAIAAaPg")
	}.bind(this);
	this.shape_3.setTransform(82.3,102);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-29.2,18,449.09999999999997,342);


(lib.shape199 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("Af4BaMg/vAAAIAAizMA/vAAAg");
	this.shape.setTransform(193.7,370.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("A/3BaIAAizMA/vAAAIAACzg");
	this.shape_1.setTransform(193.7,370.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-11.3,360.8,410,20);


(lib.shape197 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AfkBaMg/HAAAIAAizMA/HAAAg");
	this.shape.setTransform(194.35,196.625);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("A/jBaIAAizMA/HAAAIAACzg");
	this.shape_1.setTransform(194.35,196.625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8.6,186.7,406,19.900000000000006);


(lib.shape193 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#000000").s().p("AgRARQgHgHAAgKQAAgKAHgHQAHgHAKAAQAKAAAHAHQAIAHAAAKQAAAKgIAHQgHAIgKAAQgKAAgHgIg");
	this.shape.setTransform(-381.1,152.7);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgJAHgIQAHgHAKAAQAKAAAHAHQAIAIAAAJQAAAKgIAIQgHAHgKAAQgKAAgHgHg");
	this.shape_1.setTransform(-381.1,104.7);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-383.6,102.2,5,52.999999999999986);


(lib.shape186 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AILhZIwVAAIAACzIQVAAg");
	this.shape.setTransform(-182.15,27.3);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AoJBaIAAizIQUAAIAACzg");
	this.shape_1.setTransform(-182.15,27.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-235.4,17.3,106.5,19.999999999999996);


(lib.shape185 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#999999").ss(2,1,0,3).p("AAAiQIAAEh");
	this.shape.setTransform(-57.35,69.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-58.3,53.6,2,30.9);


(lib.shape184 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#999999").ss(2,1,0,3).p("AAAi2IAAFt");
	this.shape.setTransform(-21.3,19.25);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-22.3,0,2,38.5);


(lib.shape182 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AHMizIuXAAIAAFnIOXAAg");
	this.shape.setTransform(-153.775,78.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AnLC0IAAlnIOXAAIAAFng");
	this.shape_1.setTransform(-153.775,78.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-200.7,59.1,93.89999999999999,37.99999999999999);


(lib.shape180 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AsBBaIYDAAIAAizI4DAAg");
	this.shape.setTransform(127.025,-115.25);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AsBBaIAAizIYDAAIAACzg");
	this.shape_1.setTransform(127.025,-115.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(49.1,-125.2,155.9,20);


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
	this.shape.graphics.f().s("#FF0000").ss(2,1,0,3).p("AgqBMIBViX");
	this.shape.setTransform(54.65,-99.875);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(49.4,-108.4,10.5,17.10000000000001);


(lib.shape178 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#FF0000").ss(2,1,0,3).p("AihieIFDE9");
	this.shape.setTransform(41.25,-8.975);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(24.1,-25.9,34.4,33.9);


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
	this.shape.graphics.f().s("#FF0000").ss(2,1,0,3).p("AB9heIj5C9");
	this.shape.setTransform(-95.875,68.25);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-109.4,57.8,27.10000000000001,21);


(lib.shape176 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#FF0000").ss(2,1,0,3).p("ACRh6IkhD1");
	this.shape.setTransform(-154.675,10.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-170.2,-2.8,31.099999999999994,26.6);


(lib.shape174 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AJnhZIzNAAIAACzITNAAg");
	this.shape.setTransform(107.9,18);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("ApmBaIAAizITNAAIAACzg");
	this.shape_1.setTransform(107.9,18);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(45.4,8,125,20);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AmDhZIAACzIMHAAIAAizg");
	this.shape.setTransform(-62.2,-19.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AmDBaIAAizIMGAAIAACzg");
	this.shape_1.setTransform(-62.2,-19.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-101.9,-29.7,79.5,20);


(lib.shape166 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AEaizIozAAIAAFnII9AA");
	this.shape.setTransform(-30.35,-65.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(2,0,0,3).p("AgJC0IATAAIAAlnIgdAA");
	this.shape_1.setTransform(-0.2,-65.7);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AEVC0Io9AAIAAlnIIzAAIAeAAIAAFng");
	this.shape_2.setTransform(-28.85,-65.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-59.5,-84.7,61.3,38);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AFShZIqjAAIAACzIKjAAg");
	this.shape.setTransform(-112.35,-108);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AlQBaIAAizIKiAAIAACzg");
	this.shape_1.setTransform(-112.35,-108);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-147.1,-118,69.5,20);


(lib.shape162 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AkrBaIJXAAIAAizIpXAAg");
	this.shape.setTransform(-169.25,-59.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AkrBaIAAizIJXAAIAACzg");
	this.shape_1.setTransform(-169.25,-59.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	var sprImg_shape_2 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_ssw_atlas_5"],41);
	sprImg_shape_2.onload = function(){
		this.shape_2.graphics.bf(sprImg_shape_2, null, new cjs.Matrix2D(0.764,0,0,0.764,-95.5,-73.1)).s().p("AhlBuIAAhIIAEAAIAAhAIgEAAIAAhTIDLAAIAAAiIgGAAIAABpIAGAAIAABQg")
	}.bind(this);
	this.shape_2.setTransform(-112.275,-85.725);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_1
	this.shape_3 = new cjs.Shape();
	var sprImg_shape_3 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_ssw_atlas_5"],41);
	sprImg_shape_3.onload = function(){
		this.shape_3.graphics.bf(sprImg_shape_3, null, new cjs.Matrix2D(0.72,0,0,0.72,-157,-82.1)).s().p("A4hM1IAA5pMAxDAAAIAAZpg")
	}.bind(this);
	this.shape_3.setTransform(-45.925,-17.775);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-202.9,-99.8,314,164.1);


(lib.shape159 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AJ2izIAAFnIzrAAIAAlng");
	this.shape.setTransform(148.025,-8.65);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("Ap1C0IAAlnITrAAIAAFng");
	this.shape_1.setTransform(148.025,-8.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(84,-27.6,128.1,38);


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

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("AiGhtIENDc");
	this.shape.setTransform(150.575,-38.6);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.instance = new lib.CachedBmp_5();
	this.instance.setTransform(40.9,-107.15,0.3306,0.3306);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(40.9,-107.1,124.69999999999999,81.1);


(lib.shape157 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFFFFF").s().p("A0XJYIAAyvMAovAAAIAASvg");
	this.shape.setTransform(-66.8,-79.7);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AyCFsIAArXMAkFAAAIAALXg");
	this.shape_1.setTransform(-74.95,-62.55);

	this.shape_2 = new cjs.Shape();
	var sprImg_shape_2 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_ssw_atlas_5"],40);
	sprImg_shape_2.onload = function(){
		this.shape_2.graphics.bf(sprImg_shape_2, null, new cjs.Matrix2D(0.733,0,0,0.733,-115.5,-163.9)).s().p("AyCZnMAAAglWMAkFAAAMAAAAlWgAyC3GIAAigMAkFAAAIAACgg")
	}.bind(this);
	this.shape_2.setTransform(-74.95,49);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-197.2,-139.6,260.8,352.5);


(lib.shape154 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("ArtizIXbAAIAAFnI3bAAg");
	this.shape.setTransform(-85.25,-26.25);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("ArtC0IAAlnIXbAAIAAFng");
	this.shape_1.setTransform(-85.25,-26.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-161.2,-45.2,152,38);


(lib.shape152w = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#999999").s().p("AAIAXIgPAAIgbAJIAjhAIAiBBg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.5,-3.3,7,6.699999999999999);


(lib.shape152 = function(mode,startPosition,loop,reversed) {
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


(lib.shape151 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#FFFFFF").ss(3,1,0,3).p("AOGAbQgBgegGgcANvhYIgQgjQgQgdgTgSANNEAIASgcIAMgZAN9CRQAHgdABgfAtXjqQgpAPgFAQAtcilIA8AQAFMkbIg8gEADTkkIg8gDABuhlIA8gDADlhrIA8gEAFdh0IA8gGAKsjAQABgDAAgEQAAgQgigOAMHjDIgIAAQgaAAgWAPAKmiGIgHALIgTAqAJCiTIA4gPAJQj3Ig8gMAHPiAIA6gJAJ+gWQgFAcgBAgAHYkLIhQgKAmFkmIg7AEAn8keIg7AFArkiJIA8AJApnh5IA9AGAnthuIA8AEApzkTIg6AHAgcksIg8AAAiYksIg7AAAkOkqIg7ACAj7hjIA8ABAiBhiIA8AAAl0hnIA8ACAKYDVIAHAPQALAUALANALlEoIAaAFQARAAAPgHABbkpIg8gCAgJhiIA7gBAJ6BfQACAfAHAcArnkEIg4AL");
	this.shape.setTransform(-85.05,-111.85);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FF0000").ss(2,0,0,3).p("AjLF0IKen0Aj/mAIjPMB");
	this.shape_1.setTransform(-73.9838,-82.4);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	var sprImg_shape_2 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_ssw_atlas_5"],39);
	sprImg_shape_2.onload = function(){
		this.shape_2.graphics.bf(sprImg_shape_2, null, new cjs.Matrix2D(0.493,0,0,0.493,-91.2,-49.8)).s().p("AuPHyIAAvjIcfAAIAAPjg")
	}.bind(this);
	this.shape_2.setTransform(-85.45,-95.075);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-176.7,-144.9,183.39999999999998,102);


(lib.shape101 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFFFFF").s().p("AhGA6IAAhyICNAAIAAByg");
	this.shape.setTransform(-196.075,-238.7);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1,0,0,3).p("AAQgPQAHAGAAAJQAAAJgHAHQgHAHgJAAQgIAAgHgHQgHgHAAgJQAAgJAHgGQAHgHAIAAQAJAAAHAHg");
	this.shape_1.setTransform(-184.25,-238.1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FF0000").s().p("AgPAQQgGgGAAgKQAAgIAGgHQAGgHAJAAQAJAAAHAHQAGAHABAIQgBAKgGAGQgHAHgJgBQgJABgGgHg");
	this.shape_2.setTransform(-184.25,-238.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-203.2,-244.4,22.19999999999999,11.5);


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

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("AKEnuIgEACIAAgCgAqBHtIAAACIgCAAg");
	this.shape.setTransform(11.5425,-92.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#0000FF").ss(1,0,0,3).p("Ab06FIgeAMIgiAPIhDAdIhEAdIgnARIgcANIhEAfIhDAgIgeAOIgmASIhDAiIhEAiIgHAEIg8AgIhEAkIgpAWIgaAPIhEAnIg/AkANHy0QgiATgiAVIhDAqIgKAFIg6AlIhDAsIgQAJIg0AjIhDAuIgOAJIg2AmIhDAxIgFADIg/AvIg6ArIgJAIIhEA0IgmAeIgdAYIhDA4IgMAKIg3AvIgyArIgSAQIhDA8IgQAOIg0AxIgsApIgXAXIhEBCAm9jZIhBBDIgXAXIgtAvIgpArIgaAdIg4A8IgMANIhDBNIhEBQIgIAKIgdAkIgeAkIgPASIg1BDIgSAXIgxBBIgTAZIgQAWIghAtIgRAXIgyBHIgOATIg2BPIgIALIg7BaIg6BaIgKAQIguBKIgVAkIghA2IgjA9IgRAdIgyBaIgxBaIgTAkIgcA2IgnBNIgHANIgsBa");
	this.shape_1.setTransform(-8.3063,-20.9213);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-187,-188.9,357.7,336.20000000000005);


(lib.shape96 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#CC6600").s().p("AAIAXIgPAAIgbAJIAjhAIAiBBg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.5,-3.3,7,6.699999999999999);


(lib.shape95 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFFFFF").s().p("Ah6BBIAAiBID1AAIAACBg");
	this.shape.setTransform(133.375,-171.9);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1,0,0,3).p("AAQgPQAHAGAAAJQAAAJgHAHQgHAGgJAAQgJAAgGgGQgHgHAAgJQAAgJAHgGQAGgHAJAAQAJAAAHAHg");
	this.shape_1.setTransform(-189.95,-62.6);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FF0000").s().p("AgPAQQgHgGAAgKQAAgIAHgHQAHgHAIAAQAKAAAGAHQAHAHgBAIQABAKgHAGQgGAHgKgBQgIABgHgHg");
	this.shape_2.setTransform(-189.95,-62.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-193.2,-178.4,338.9,119.10000000000001);


(lib.shape93b = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#0000FF").s().p("ApmAZIAAgxITNAAIAAAxg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-61.5,-2.5,123,5);


(lib.shape93 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#CC6600").s().p("ApmAZIAAgxITNAAIAAAxg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-61.5,-2.5,123,5);


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
	this.shape.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgJAHgIQAIgHAJAAQAKAAAIAHQAHAIAAAJQAAAKgHAIQgIAHgKAAQgJAAgIgHg");
	this.shape.setTransform(-355.85,10);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-358.3,7.5,5,5);


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

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#003366").s().p("AgRARQgHgGAAgLQAAgJAHgIQAHgHAKAAQAKAAAHAHQAIAIAAAJQAAALgIAGQgHAIgKAAQgKAAgHgIg");
	this.shape.setTransform(-568.65,-350.55);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-571.1,-353,5,5);


(lib.shape77 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFFFFF").s().p("AhkgbICrgyIAeBpIirAyg");
	this.shape.setTransform(212.525,-222.35);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(202.4,-230.1,20.299999999999983,15.5);


(lib.shape75 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFFFFF").s().p("AhcgOICUg9IAlBaIiTA+g");
	this.shape.setTransform(159.25,-285.95);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(149.9,-293.6,18.69999999999999,15.300000000000011);


(lib.shape73 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFFFFF").s().p("AhngIICfhQIAwBhIifBQg");
	this.shape.setTransform(185.95,-291.075);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(175.5,-300,20.900000000000006,17.899999999999977);


(lib.shape71 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFFFFF").s().p("AhogGICehTIAzBgIieBTg");
	this.shape.setTransform(175.85,-305.625);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(165.4,-314.6,21,18);


(lib.shape69 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFFFFF").s().p("AhogBICahaIA3BdIiaBag");
	this.shape.setTransform(164.5,-321.6);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(154,-330.8,21,18.5);


(lib.shape66 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFFFFF").s().p("AhoADICVhhIA8BbIiVBig");
	this.shape.setTransform(150.15,-331.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(139.7,-340.6,21,19);


(lib.shape64 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFFFFF").s().p("AhoAJICQhqIBBBZIiQBqg");
	this.shape.setTransform(103.4,-334.275);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(92.9,-344,21,19.5);


(lib.shape60 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFFFFF").s().p("AhkAXICDhzIBGBLIiIBug");
	this.shape.setTransform(61.875,-320.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(51.8,-329.7,20.200000000000003,18.5);


(lib.shape57 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFFFFF").s().p("AhAAQIBZhMIAoAtIhcBMg");
	this.shape.setTransform(42.75,-356.775);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(36.3,-362.9,13,12.299999999999955);


(lib.shape55 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFFFFF").s().p("AhnATICGh3IBJBTIiGB2g");
	this.shape.setTransform(-2.175,-339.45);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-12.5,-349.5,20.7,20.19999999999999);


(lib.shape53 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFFFFF").s().p("AmdB1IK1m7ICGDSIq1G7g");
	this.shape.setTransform(48.025,-126.725);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(6.6,-159.4,82.9,65.4);


(lib.shape51 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFFFFF").s().p("AjrDzIFqosIBtBHIlqIsg");
	this.shape.setTransform(190.425,233.375);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(166.9,202,47.099999999999994,62.80000000000001);


(lib.shape47 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFFFFF").s().p("AhsAdIARhcIDIAjIgRBcg");
	this.shape.setTransform(220.175,320.875);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(209.3,314.5,21.799999999999983,12.800000000000011);


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
	this.shape.graphics.f("#FFFFFF").s().p("AiGAWIAbhbIDyAvIgbBcg");
	this.shape.setTransform(221.875,279.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(208.4,272.5,27,14);


(lib.shape41 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFFFFF").s().p("AhvALIAghYIC/BCIgfBZg");
	this.shape.setTransform(142.6,359.8);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(131.4,352,22.400000000000006,15.699999999999989);


(lib.shape39 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFFFFF").s().p("AhwAAIAohVIC5BVIgoBWg");
	this.shape.setTransform(53.375,359.275);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(42.1,350.7,22.6,17.19999999999999);


(lib.shape37 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFFFFF").s().p("AhrgeIA+hIICZCFIg+BIg");
	this.shape.setTransform(-33.425,357.65);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-44.2,347.4,21.6,20.600000000000023);


(lib.shape35 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFFFFF").s().p("AhlgwIBKg9ICACeIhJA9g");
	this.shape.setTransform(-141.1,353.7);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-151.2,342.8,20.299999999999983,21.899999999999977);


(lib.shape33 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFFFFF").s().p("AjykJIBUg6IGSJNIhVA6g");
	this.shape.setTransform(-118.6,-11.175);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-142.9,-43.5,48.7,64.7);


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
	this.shape.graphics.f("#FFFFFF").s().p("AhhA5IB1inIBOA2Ih1Cng");
	this.shape.setTransform(182.375,221.325);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(172.6,210.2,19.599999999999994,22.30000000000001);


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
	this.shape.graphics.f("#FFFFFF").s().p("AhhA5IB1inIBOA2Ih1Cng");
	this.shape.setTransform(-125.875,87.475);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-135.6,76.4,19.5,22.19999999999999);


(lib.shape25 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFFFFF").s().p("Al0BvIAAjeILpAAIAADeg");
	this.shape.setTransform(14.125,45.65);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-23.2,34.5,74.7,22.299999999999997);


(lib.shape2 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_4();
	this.instance.setTransform(-205.95,-373.1,0.3555,0.3555);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-205.9,-373.1,451,746.1);


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
	this.instance = new lib.CachedBmp_3();
	this.instance.setTransform(5,12,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2();
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


(lib.buttonbak = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_1();
	this.instance.setTransform(7.95,11.95,0.4999,0.4999);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(4));

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(2,1,1).p("AqJj5IUTAAQBkAAAABkIAAErQAABkhkAAI0TAAQhkAAAAhkIAAkrQAAhkBkAAg");
	this.shape.setTransform(75,25);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000066").s().p("AqJD6QhkAAAAhkIAAkrQAAhkBkAAIUTAAQBkAAAABkIAAErQAABkhkAAg");
	this.shape_1.setTransform(75,25);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#0099FF").s().p("AqJD6QhkAAAAhkIAAkrQAAhkBkAAIUTAAQBkAAAABkIAAErQAABkhkAAg");
	this.shape_2.setTransform(75,25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_2},{t:this.shape}]},1).to({state:[{t:this.shape_2},{t:this.shape}]},1).to({state:[{t:this.shape_2},{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,152,52);


(lib.sprite210 = function(mode,startPosition,loop,reversed) {
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

	// Masked_Layer_15___9
	this.instance = new lib.text209("synched",0);
	this.instance.setTransform(-485.9,54.35);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(675));

	// Masked_Layer_14___9
	this.instance_1 = new lib.text208("synched",0);
	this.instance_1.setTransform(-493.55,106.35);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(675));

	// Masked_Layer_13___9
	this.instance_2 = new lib.shape86("synched",0);
	this.instance_2.setTransform(-139.2,176.05);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(675));

	// Masked_Layer_12___9
	this.instance_3 = new lib.text207("synched",0);
	this.instance_3.setTransform(-485.9,2.35);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(675));

	// Masked_Layer_11___9
	this.instance_4 = new lib.text206("synched",0);
	this.instance_4.setTransform(-485.9,176.95);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(675));

	// Masked_Layer_10___9
	this.instance_5 = new lib.shape86("synched",0);
	this.instance_5.setTransform(-139.2,2.45);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(675));

	// Layer_8
	this.instance_6 = new lib.shape205("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(675));

	// Layer_4
	this.instance_7 = new lib.text200("synched",0);
	this.instance_7.setTransform(-5.7,364.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(675));

	// Layer_3
	this.instance_8 = new lib.shape199("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(675));

	// Layer_2
	this.instance_9 = new lib.text198("synched",0);
	this.instance_9.setTransform(-2.45,191.35);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(675));

	// Layer_1
	this.instance_10 = new lib.shape197("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(675));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-497.5,-1,946,394.9);


(lib.sprite153w = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.shape152w("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite153w, new cjs.Rectangle(-3.5,-3.3,7,6.699999999999999), null);


(lib.sprite153 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.shape152("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite153, new cjs.Rectangle(-3.5,-3.3,7,6.699999999999999), null);


(lib.sprite149 = function(mode,startPosition,loop,reversed) {
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
	this.frame_693 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(693).call(this.frame_693).wait(1));

	// Masked_Layer_111___106
	this.instance = new lib.text148("synched",0);
	this.instance.setTransform(-694.1,-287.45);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(694));

	// Masked_Layer_110___106
	this.instance_1 = new lib.text147("synched",0);
	this.instance_1.setTransform(-694.1,-174.45,0.9998,1);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(694));

	// Masked_Layer_109___106
	this.instance_2 = new lib.text83("synched",0);
	this.instance_2.setTransform(-687,-317);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(694));

	// Masked_Layer_108___106
	this.instance_3 = new lib.text82("synched",0);
	this.instance_3.setTransform(-685,-341,1.0007,1);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(694));

	// Masked_Layer_107___106
	this.instance_4 = new lib.shape80("synched",0);
	this.instance_4.setTransform(-123.9,19.45);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(694));

	// Mask_Layer_1 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EgkZAf3MAAAg/tMBIzAAAMAAAA/tg");
	mask.setTransform(19.3583,-148.488);

	// Masked_Layer_104___1
	this.instance_5 = new lib.text103("synched",0);
	this.instance_5.setTransform(152.45,-286.85,0.897,0.897,-28.0001);

	var maskedShapeInstanceList = [this.instance_5];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(694));

	// Masked_Layer_103___1
	this.instance_6 = new lib.shape75("synched",0);

	var maskedShapeInstanceList = [this.instance_6];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(694));

	// Masked_Layer_102___1
	this.instance_7 = new lib.text102("synched",0);
	this.instance_7.setTransform(-202,-244.7,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_7];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(694));

	// Masked_Layer_101___1
	this.instance_8 = new lib.shape101("synched",0);

	var maskedShapeInstanceList = [this.instance_8];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(694));

	// Masked_Layer_99___1
	this.instance_9 = new lib.text98("synched",0);
	this.instance_9.setTransform(72.4,20.35);

	var maskedShapeInstanceList = [this.instance_9];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(694));

	// Masked_Layer_98___1
	this.instance_10 = new lib.shape25("synched",0);
	this.instance_10.setTransform(65.5,-1.85,0.2338,0.5829);

	var maskedShapeInstanceList = [this.instance_10];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(694));

	// Masked_Layer_97___1
	this.instance_11 = new lib.shape25("synched",0);
	this.instance_11.setTransform(-78.95,-452.85,6.1212,2.8251);
	this.instance_11.alpha = 0;

	var maskedShapeInstanceList = [this.instance_11];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(694));

	// Masked_Layer_96___1
	this.instance_12 = new lib.shape93("synched",0);
	this.instance_12.setTransform(72.6,-112,2.0575,0.4,89.9956);

	var maskedShapeInstanceList = [this.instance_12];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(694));

	// Masked_Layer_95___1
	this.instance_13 = new lib.shape93("synched",0);
	this.instance_13.setTransform(-54.85,-238.4,2.0885,0.399);

	var maskedShapeInstanceList = [this.instance_13];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(694));

	// Masked_Layer_94___1
	this.instance_14 = new lib.shape100("synched",0);
	this.instance_14.setTransform(49.95,-132.5);

	var maskedShapeInstanceList = [this.instance_14];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(694));

	// Masked_Layer_93___1
	this.instance_15 = new lib.text79("synched",0);
	this.instance_15.setTransform(185.9,-213.5,0.8964,0.8964,-16.0041);

	var maskedShapeInstanceList = [this.instance_15];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(694));

	// Masked_Layer_92___1
	this.instance_16 = new lib.shape77("synched",0);
	this.instance_16.setTransform(1,-11,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_16];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(694));

	// Masked_Layer_91___1
	this.instance_17 = new lib.text78("synched",0);
	this.instance_17.setTransform(185.85,-240.1,0.8968,0.8968,-17.2569);

	var maskedShapeInstanceList = [this.instance_17];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(694));

	// Masked_Layer_90___1
	this.instance_18 = new lib.shape77("synched",0);
	this.instance_18.setTransform(0.1,-33.9,0.9044,0.9174);

	var maskedShapeInstanceList = [this.instance_18];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(694));

	// Masked_Layer_89___1
	this.instance_19 = new lib.text76("synched",0);
	this.instance_19.setTransform(172.85,-257.55,0.8971,0.8971,-22.5432);

	var maskedShapeInstanceList = [this.instance_19];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(694));

	// Masked_Layer_88___1
	this.instance_20 = new lib.shape75("synched",0);
	this.instance_20.setTransform(20.5,29.95,0.9987,1);

	var maskedShapeInstanceList = [this.instance_20];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(694));

	// Masked_Layer_87___1
	this.instance_21 = new lib.text74("synched",0);
	this.instance_21.setTransform(161.55,-274.05,0.8973,0.8973,-26.6069);

	var maskedShapeInstanceList = [this.instance_21];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(694));

	// Masked_Layer_86___1
	this.instance_22 = new lib.shape73("synched",0);
	this.instance_22.setTransform(1,-11,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_22];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(694));

	// Masked_Layer_85___1
	this.instance_23 = new lib.text72("synched",0);
	this.instance_23.setTransform(152.4,-287.05,0.8973,0.8973,-27.6257);

	var maskedShapeInstanceList = [this.instance_23];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(694));

	// Masked_Layer_84___1
	this.instance_24 = new lib.shape71("synched",0);
	this.instance_24.setTransform(1,-11,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_24];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(694));

	// Masked_Layer_83___1
	this.instance_25 = new lib.text70("synched",0);
	this.instance_25.setTransform(142.2,-301.1,0.8974,0.8974,-30.1529);

	var maskedShapeInstanceList = [this.instance_25];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(694));

	// Masked_Layer_82___1
	this.instance_26 = new lib.shape69("synched",0);
	this.instance_26.setTransform(1,-11,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_26];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(694));

	// Masked_Layer_81___1
	this.instance_27 = new lib.text68("synched",0);
	this.instance_27.setTransform(129.3,-309.3,0.8976,0.8976,-33.1973);

	var maskedShapeInstanceList = [this.instance_27];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_27).wait(694));

	// Masked_Layer_80___1
	this.instance_28 = new lib.shape66("synched",0);
	this.instance_28.setTransform(1,-11,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_28];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_28).wait(694));

	// Masked_Layer_79___1
	this.instance_29 = new lib.text67("synched",0);
	this.instance_29.setTransform(118.65,-318.55,0.8976,0.8976,-33.1973);

	var maskedShapeInstanceList = [this.instance_29];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_29).wait(694));

	// Masked_Layer_78___1
	this.instance_30 = new lib.shape66("synched",0);
	this.instance_30.setTransform(-9.6,-20.25,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_30];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_30).wait(694));

	// Masked_Layer_77___1
	this.instance_31 = new lib.text65("synched",0);
	this.instance_31.setTransform(87.3,-311.8,0.8981,0.8981,-36.6055);

	var maskedShapeInstanceList = [this.instance_31];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_31).wait(694));

	// Masked_Layer_76___1
	this.instance_32 = new lib.shape64("synched",0);
	this.instance_32.setTransform(1,-11,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_32];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_32).wait(694));

	// Masked_Layer_75___1
	this.instance_33 = new lib.text63("synched",0);
	this.instance_33.setTransform(49.8,-298.65,0.8983,0.8983,-41.662);

	var maskedShapeInstanceList = [this.instance_33];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_33).wait(694));

	// Masked_Layer_74___1
	this.instance_34 = new lib.shape60("synched",0);
	this.instance_34.setTransform(1,-11,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_34];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_34).wait(694));

	// Masked_Layer_73___1
	this.instance_35 = new lib.text62("synched",0);
	this.instance_35.setTransform(46.85,-321.25,0.8983,0.8983,-41.662);

	var maskedShapeInstanceList = [this.instance_35];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_35).wait(694));

	// Masked_Layer_72___1
	this.instance_36 = new lib.shape60("synched",0);
	this.instance_36.setTransform(-1.9,-33.65,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_36];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_36).wait(694));

	// Masked_Layer_71___1
	this.instance_37 = new lib.text61("synched",0);
	this.instance_37.setTransform(56.3,-340.15,0.8967,0.8967,-36.3438);

	var maskedShapeInstanceList = [this.instance_37];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_37).wait(694));

	// Masked_Layer_70___1
	this.instance_38 = new lib.shape60("synched",0);
	this.instance_38.setTransform(24.85,-137.4,0.6,0.6324);

	var maskedShapeInstanceList = [this.instance_38];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_38).wait(694));

	// Masked_Layer_69___1
	this.instance_39 = new lib.text59("synched",0);
	this.instance_39.setTransform(34.05,-331.85,0.8967,0.8967,-36.3438);

	var maskedShapeInstanceList = [this.instance_39];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_39).wait(694));

	// Masked_Layer_68___1
	this.instance_40 = new lib.shape57("synched",0);
	this.instance_40.setTransform(1,-11,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_40];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_40).wait(694));

	// Masked_Layer_67___1
	this.instance_41 = new lib.text58("synched",0);
	this.instance_41.setTransform(29.1,-337.25,0.8967,0.8967,-36.3438);

	var maskedShapeInstanceList = [this.instance_41];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_41).wait(694));

	// Masked_Layer_66___1
	this.instance_42 = new lib.shape57("synched",0);
	this.instance_42.setTransform(-3.95,-16.4,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_42];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_42).wait(694));

	// Masked_Layer_65___1
	this.instance_43 = new lib.text56("synched",0);
	this.instance_43.setTransform(-7.65,-315.8,0.8983,0.8983,-41.662);

	var maskedShapeInstanceList = [this.instance_43];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_43).wait(694));

	// Masked_Layer_64___1
	this.instance_44 = new lib.shape55("synched",0);
	this.instance_44.setTransform(1,-11,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_44];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_44).wait(694));

	// Masked_Layer_63___1
	this.instance_45 = new lib.text54("synched",0);
	this.instance_45.setTransform(6.4,-109,0.8985,0.8985,-32.6205);

	var maskedShapeInstanceList = [this.instance_45];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_45).wait(694));

	// Masked_Layer_62___1
	this.instance_46 = new lib.shape53("synched",0);
	this.instance_46.setTransform(1,-11,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_46];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_46).wait(694));

	// Masked_Layer_61___1
	this.instance_47 = new lib.text52("synched",0);
	this.instance_47.setTransform(152.9,220.4,0.9,0.9,-57.0005);

	var maskedShapeInstanceList = [this.instance_47];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_47).wait(694));

	// Masked_Layer_60___1
	this.instance_48 = new lib.shape51("synched",0);
	this.instance_48.setTransform(1,-11,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_48];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_48).wait(694));

	// Masked_Layer_59___1
	this.instance_49 = new lib.text50("synched",0);
	this.instance_49.setTransform(190.9,272.15,0.896,0.896,9.9152);

	var maskedShapeInstanceList = [this.instance_49];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_49).wait(694));

	// Masked_Layer_58___1
	this.instance_50 = new lib.shape47("synched",0);
	this.instance_50.setTransform(1,-11,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_50];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_50).wait(694));

	// Masked_Layer_57___1
	this.instance_51 = new lib.text49("synched",0);
	this.instance_51.setTransform(192.9,259.75,0.896,0.896,9.9152);

	var maskedShapeInstanceList = [this.instance_51];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_51).wait(694));

	// Masked_Layer_56___1
	this.instance_52 = new lib.shape47("synched",0);
	this.instance_52.setTransform(3,-23.35,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_52];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_52).wait(694));

	// Masked_Layer_55___1
	this.instance_53 = new lib.text48("synched",0);
	this.instance_53.setTransform(193.6,246.7,0.896,0.896,9.9152);

	var maskedShapeInstanceList = [this.instance_53];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_53).wait(694));

	// Masked_Layer_54___1
	this.instance_54 = new lib.shape47("synched",0);
	this.instance_54.setTransform(3.7,-36.4,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_54];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_54).wait(694));

	// Masked_Layer_53___1
	this.instance_55 = new lib.text46("synched",0);
	this.instance_55.setTransform(191.25,234.1,0.8962,0.8962,13.4532);

	var maskedShapeInstanceList = [this.instance_55];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_55).wait(694));

	// Masked_Layer_52___1
	this.instance_56 = new lib.shape43("synched",0);
	this.instance_56.setTransform(1,-11,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_56];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_56).wait(694));

	// Masked_Layer_51___1
	this.instance_57 = new lib.text45("synched",0);
	this.instance_57.setTransform(188.1,285.9,0.8962,0.8962,13.4532);

	var maskedShapeInstanceList = [this.instance_57];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_57).wait(694));

	// Masked_Layer_50___1
	this.instance_58 = new lib.shape43("synched",0);
	this.instance_58.setTransform(32.65,40.55,0.7364,0.9);

	var maskedShapeInstanceList = [this.instance_58];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_58).wait(694));

	// Masked_Layer_49___1
	this.instance_59 = new lib.text44("synched",0);
	this.instance_59.setTransform(184.5,301.65,0.8962,0.8962,13.4532);

	var maskedShapeInstanceList = [this.instance_59];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_59).wait(694));

	// Masked_Layer_48___1
	this.instance_60 = new lib.shape43("synched",0);
	this.instance_60.setTransform(29.05,56.3,0.7364,0.9);

	var maskedShapeInstanceList = [this.instance_60];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_60).wait(694));

	// Masked_Layer_47___1
	this.instance_61 = new lib.text42("synched",0);
	this.instance_61.setTransform(122,305.9,0.8976,0.8976,19.1859);

	var maskedShapeInstanceList = [this.instance_61];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_61).wait(694));

	// Masked_Layer_46___1
	this.instance_62 = new lib.shape41("synched",0);
	this.instance_62.setTransform(1,-11,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_62];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_62).wait(694));

	// Masked_Layer_45___1
	this.instance_63 = new lib.text40("synched",0);
	this.instance_63.setTransform(42.45,304.75,0.8979,0.8979,24.9764);

	var maskedShapeInstanceList = [this.instance_63];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_63).wait(694));

	// Masked_Layer_44___1
	this.instance_64 = new lib.shape39("synched",0);
	this.instance_64.setTransform(1,-11,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_64];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_64).wait(694));

	// Masked_Layer_43___1
	this.instance_65 = new lib.text38("synched",0);
	this.instance_65.setTransform(-33.35,301.75,0.8987,0.8987,41.0194);

	var maskedShapeInstanceList = [this.instance_65];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_65).wait(694));

	// Masked_Layer_42___1
	this.instance_66 = new lib.shape37("synched",0);
	this.instance_66.setTransform(1,-11,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_66];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_66).wait(694));

	// Masked_Layer_41___1
	this.instance_67 = new lib.text36("synched",0);
	this.instance_67.setTransform(-128.65,297.65,0.8992,0.8992,50.778);

	var maskedShapeInstanceList = [this.instance_67];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_67).wait(694));

	// Masked_Layer_40___1
	this.instance_68 = new lib.shape35("synched",0);
	this.instance_68.setTransform(1,-11,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_68];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_68).wait(694));

	// Masked_Layer_39___1
	this.instance_69 = new lib.text34("synched",0);
	this.instance_69.setTransform(-130.6,262.05,0.8978,0.8978,55.6839);

	var maskedShapeInstanceList = [this.instance_69];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_69).wait(694));

	// Masked_Layer_38___1
	this.instance_70 = new lib.shape33("synched",0);
	this.instance_70.setTransform(0.15,303.35,0.9684,0.9681);

	var maskedShapeInstanceList = [this.instance_70];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_70).wait(694));

	// Masked_Layer_37___1
	this.instance_71 = new lib.text32("synched",0);
	this.instance_71.setTransform(156.5,193.45,0.8999,0.8999,-54.9987);

	var maskedShapeInstanceList = [this.instance_71];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_71).wait(694));

	// Masked_Layer_36___1
	this.instance_72 = new lib.shape29("synched",0);
	this.instance_72.setTransform(1,-11,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_72];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_72).wait(694));

	// Masked_Layer_35___1
	this.instance_73 = new lib.text31("synched",0);
	this.instance_73.setTransform(20.3,141.25,0.8999,0.8999,-54.9987);

	var maskedShapeInstanceList = [this.instance_73];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_73).wait(694));

	// Masked_Layer_34___1
	this.instance_74 = new lib.shape29("synched",0);
	this.instance_74.setTransform(-135.2,-63.2,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_74];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_74).wait(694));

	// Masked_Layer_33___1
	this.instance_75 = new lib.text30("synched",0);
	this.instance_75.setTransform(-77.7,122.45,0.8999,0.8999,-54.9987);

	var maskedShapeInstanceList = [this.instance_75];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_75).wait(694));

	// Masked_Layer_32___1
	this.instance_76 = new lib.shape29("synched",0);
	this.instance_76.setTransform(-233.2,-81.95,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_76];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_76).wait(694));

	// Masked_Layer_31___1
	this.instance_77 = new lib.text28("synched",0);
	this.instance_77.setTransform(-120.9,72.95,0.8999,0.8999,-54.9987);

	var maskedShapeInstanceList = [this.instance_77];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_77).wait(694));

	// Masked_Layer_30___1
	this.instance_78 = new lib.shape27("synched",0);
	this.instance_78.setTransform(1,-11,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_78];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_78).wait(694));

	// Masked_Layer_29___1
	this.instance_79 = new lib.text26("synched",0);
	this.instance_79.setTransform(-78.6,39.1,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_79];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_79).wait(694));

	// Masked_Layer_28___1
	this.instance_80 = new lib.shape25("synched",0);
	this.instance_80.setTransform(-15.7,22.05,2.741,0.4984);

	var maskedShapeInstanceList = [this.instance_80];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_80).wait(694));

	// Masked_Layer_27___1
	this.instance_81 = new lib.text24("synched",0);
	this.instance_81.setTransform(-224.85,263.6,0.9,0.9,-89.9961);

	var maskedShapeInstanceList = [this.instance_81];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_81).wait(694));

	// Masked_Layer_26___1
	this.instance_82 = new lib.text23("synched",0);
	this.instance_82.setTransform(-229.15,-85.6,0.9,0.9,-89.9961);

	var maskedShapeInstanceList = [this.instance_82];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_82).wait(694));

	// Masked_Layer_25___1
	this.instance_83 = new lib.text12("synched",0);
	this.instance_83.setTransform(-201.95,317.8,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_83];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_83).wait(694));

	// Masked_Layer_24___1
	this.instance_84 = new lib.text10("synched",0);
	this.instance_84.setTransform(-201.95,272.8,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_84];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_84).wait(694));

	// Masked_Layer_23___1
	this.instance_85 = new lib.text8("synched",0);
	this.instance_85.setTransform(-201.95,227.8,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_85];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_85).wait(694));

	// Masked_Layer_22___1
	this.instance_86 = new lib.text6("synched",0);
	this.instance_86.setTransform(-201.95,182.8,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_86];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_86).wait(694));

	// Masked_Layer_21___1
	this.instance_87 = new lib.text4("synched",0);
	this.instance_87.setTransform(-201.95,137.8,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_87];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_87).wait(694));

	// Masked_Layer_20___1
	this.instance_88 = new lib.text21("synched",0);
	this.instance_88.setTransform(-201.95,92.8,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_88];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_88).wait(694));

	// Masked_Layer_19___1
	this.instance_89 = new lib.text20("synched",0);
	this.instance_89.setTransform(-201.95,47.8,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_89];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_89).wait(694));

	// Masked_Layer_18___1
	this.instance_90 = new lib.text19("synched",0);
	this.instance_90.setTransform(214.75,21.05,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_90];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_90).wait(694));

	// Masked_Layer_17___1
	this.instance_91 = new lib.text18("synched",0);
	this.instance_91.setTransform(147.25,21.05,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_91];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_91).wait(694));

	// Masked_Layer_16___1
	this.instance_92 = new lib.text17("synched",0);
	this.instance_92.setTransform(79.75,21.05,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_92];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_92).wait(694));

	// Masked_Layer_15___1
	this.instance_93 = new lib.text16("synched",0);
	this.instance_93.setTransform(12.25,21.05,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_93];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_93).wait(694));

	// Masked_Layer_14___1
	this.instance_94 = new lib.text15("synched",0);
	this.instance_94.setTransform(-55.45,21.05,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_94];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_94).wait(694));

	// Masked_Layer_13___1
	this.instance_95 = new lib.text14("synched",0);
	this.instance_95.setTransform(-122.95,21.05,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_95];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_95).wait(694));

	// Masked_Layer_12___1
	this.instance_96 = new lib.text13("synched",0);
	this.instance_96.setTransform(-190.45,21.05,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_96];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_96).wait(694));

	// Masked_Layer_11___1
	this.instance_97 = new lib.text12("synched",0);
	this.instance_97.setTransform(-201.95,-350.2,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_97];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_97).wait(694));

	// Masked_Layer_10___1
	this.instance_98 = new lib.text11("synched",0);
	this.instance_98.setTransform(-201.95,-307.45,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_98];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_98).wait(694));

	// Masked_Layer_9___1
	this.instance_99 = new lib.text10("synched",0);
	this.instance_99.setTransform(-201.95,-262.45,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_99];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_99).wait(694));

	// Masked_Layer_8___1
	this.instance_100 = new lib.text9("synched",0);
	this.instance_100.setTransform(-201.95,-217.45,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_100];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_100).wait(694));

	// Masked_Layer_7___1
	this.instance_101 = new lib.text8("synched",0);
	this.instance_101.setTransform(-201.95,-172.45,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_101];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_101).wait(694));

	// Masked_Layer_6___1
	this.instance_102 = new lib.text7("synched",0);
	this.instance_102.setTransform(-201.95,-127.45,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_102];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_102).wait(694));

	// Masked_Layer_5___1
	this.instance_103 = new lib.text6("synched",0);
	this.instance_103.setTransform(-201.95,-82.45,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_103];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_103).wait(694));

	// Masked_Layer_4___1
	this.instance_104 = new lib.text5("synched",0);
	this.instance_104.setTransform(-201.95,-37.45,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_104];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_104).wait(694));

	// Masked_Layer_3___1
	this.instance_105 = new lib.text4("synched",0);
	this.instance_105.setTransform(-201.95,7.55,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_105];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_105).wait(694));

	// Masked_Layer_2___1
	this.instance_106 = new lib.shape2("synched",0);
	this.instance_106.setTransform(1,-11,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_106];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_106).wait(694));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-698,-352.4,934,407.9);


(lib.sprite97 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.shape96("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite97, new cjs.Rectangle(-3.5,-3.3,7,6.699999999999999), null);


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


(lib.sprite290 = function(mode,startPosition,loop,reversed) {
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
	this.frame_1529 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1529).call(this.frame_1529).wait(1));

	// Masked_Layer_33___19
	this.instance = new lib.shape289("synched",0);
	this.instance.setTransform(-133.3,7.9);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1530));

	// Masked_Layer_28___19
	this.instance_1 = new lib.text288("synched",0);
	this.instance_1.setTransform(-481.7,246.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1530));

	// Masked_Layer_27___19
	this.instance_2 = new lib.text287("synched",0);
	this.instance_2.setTransform(-481.7,294.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1530));

	// Masked_Layer_26___19
	this.instance_3 = new lib.text286("synched",0);
	this.instance_3.setTransform(-481.7,146.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1530));

	// Masked_Layer_25___19
	this.instance_4 = new lib.text285("synched",0);
	this.instance_4.setTransform(-481.7,77.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1530));

	// Masked_Layer_24___19
	this.instance_5 = new lib.text284("synched",0);
	this.instance_5.setTransform(-481.7,35.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1530));

	// Masked_Layer_23___19
	this.instance_6 = new lib.text283("synched",0);
	this.instance_6.setTransform(-481.7,10.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1530));

	// Masked_Layer_22___19
	this.instance_7 = new lib.text282("synched",0);
	this.instance_7.setTransform(-490.7,204.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1530));

	// Masked_Layer_21___19
	this.instance_8 = new lib.shape86("synched",0);
	this.instance_8.setTransform(-133.3,7.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1530));

	// Masked_Layer_20___19
	this.instance_9 = new lib.text281("synched",0);
	this.instance_9.setTransform(-490.7,-12.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1530));

	// Mask_Layer_1 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EglCAhBMAAAhCBMBKFAAAMAAABCBg");
	mask.setTransform(235.1552,190.3207);

	// Masked_Layer_17___1
	this.instance_10 = new lib.text280("synched",0);
	this.instance_10.setTransform(301.2,353.4);

	var maskedShapeInstanceList = [this.instance_10];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1530));

	// Masked_Layer_16___1
	this.instance_11 = new lib.shape279("synched",0);

	var maskedShapeInstanceList = [this.instance_11];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(1530));

	// Masked_Layer_15___1
	this.instance_12 = new lib.text278("synched",0);
	this.instance_12.setTransform(82.1,352.9);

	var maskedShapeInstanceList = [this.instance_12];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(1530));

	// Masked_Layer_14___1
	this.instance_13 = new lib.shape277("synched",0);

	var maskedShapeInstanceList = [this.instance_13];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(1530));

	// Masked_Layer_13___1
	this.instance_14 = new lib.text276("synched",0);
	this.instance_14.setTransform(17,144.5);

	var maskedShapeInstanceList = [this.instance_14];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(1530));

	// Masked_Layer_12___1
	this.instance_15 = new lib.shape275("synched",0);

	var maskedShapeInstanceList = [this.instance_15];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(1530));

	// Masked_Layer_11___1
	this.instance_16 = new lib.text274("synched",0);
	this.instance_16.setTransform(273,161.3);

	var maskedShapeInstanceList = [this.instance_16];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(1530));

	// Masked_Layer_10___1
	this.instance_17 = new lib.shape273("synched",0);

	var maskedShapeInstanceList = [this.instance_17];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(1530));

	// Masked_Layer_8___1
	this.instance_18 = new lib.sprite153();
	this.instance_18.setTransform(454.45,233.55,2.0314,2.0314,175.6075);

	var maskedShapeInstanceList = [this.instance_18];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(1530));

	// Masked_Layer_7___1
	this.instance_19 = new lib.shape272("synched",0);

	var maskedShapeInstanceList = [this.instance_19];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(1530));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-494.6,-16.2,966.9000000000001,403.09999999999997);


(lib.sprite260 = function(mode,startPosition,loop,reversed) {
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
	this.frame_1539 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1539).call(this.frame_1539).wait(1));

	// Masked_Layer_13___4
	this.instance = new lib.text259("synched",0);
	this.instance.setTransform(-489.65,-9.9);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1540));

	// Masked_Layer_12___4
	this.instance_1 = new lib.text258("synched",0);
	this.instance_1.setTransform(-485.25,199.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1540));

	// Masked_Layer_11___4
	this.instance_2 = new lib.text257("synched",0);
	this.instance_2.setTransform(-485.25,124.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1540));

	// Masked_Layer_10___4
	this.instance_3 = new lib.text256("synched",0);
	this.instance_3.setTransform(-485.25,272.75);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1540));

	// Masked_Layer_9___4
	this.instance_4 = new lib.shape255("synched",0);
	this.instance_4.setTransform(-138.6,6.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1540));

	// Masked_Layer_5___4
	this.instance_5 = new lib.text254("synched",0);
	this.instance_5.setTransform(-485.25,16.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1540));

	// レイヤー_10
	this.instance_6 = new lib.text267("synched",0);
	this.instance_6.setTransform(298.85,313.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1540));

	// レイヤー_11
	this.instance_7 = new lib.shape266("synched",0);
	this.instance_7.setTransform(-363.5,-55);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1540));

	// レイヤー_12
	this.instance_8 = new lib.text265("synched",0);
	this.instance_8.setTransform(18.3,283.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1540));

	// レイヤー_13
	this.instance_9 = new lib.shape264("synched",0);
	this.instance_9.setTransform(-363.5,-55);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1540));

	// レイヤー_14
	this.instance_10 = new lib.sprite153();
	this.instance_10.setTransform(362.7,246.4,1.8349,1.8698,0,108.0822,108.8876);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1540));

	// レイヤー_15
	this.instance_11 = new lib.shape263("synched",0);
	this.instance_11.setTransform(-363.5,-55);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(1540));

	// Layer_3
	this.instance_12 = new lib.shape253("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(1540));

	// Layer_2
	this.instance_13 = new lib.shape252("synched",0);
	this.instance_13.setTransform(384.3,245,0.4863,0.6598);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(1540));

	// Layer_1
	this.instance_14 = new lib.shape250("synched",0);
	this.instance_14.setTransform(181.55,138,1.0361,1.0714);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(1540));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-496.9,-13.3,954.8,376.40000000000003);


(lib.sprite248 = function(mode,startPosition,loop,reversed) {
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
	this.frame_1369 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1369).call(this.frame_1369).wait(1));

	// Masked_Layer_49___41
	this.instance = new lib.shape223("synched",0);
	this.instance.setTransform(-138.6,0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1370));

	// Masked_Layer_47___41
	this.instance_1 = new lib.text222("synched",0);
	this.instance_1.setTransform(-482.45,175.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1370));

	// Masked_Layer_46___41
	this.instance_2 = new lib.text221("synched",0);
	this.instance_2.setTransform(-482.45,75.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1370));

	// Masked_Layer_45___41
	this.instance_3 = new lib.text220("synched",0);
	this.instance_3.setTransform(-482.45,230.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1370));

	// Masked_Layer_44___41
	this.instance_4 = new lib.shape219("synched",0);
	this.instance_4.setTransform(-138.6,-13.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1370));

	// Masked_Layer_42___41
	this.instance_5 = new lib.text218("synched",0);
	this.instance_5.setTransform(-482.45,2.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1370));

	// Mask_Layer_1 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EglBAg+MAAAhB7MBKDAAAMAAABB7g");
	mask.setTransform(236.2609,190.3333);

	// Masked_Layer_39___1
	this.instance_6 = new lib.text247("synched",0);
	this.instance_6.setTransform(261.2,240.3);
	this.instance_6.alpha = 0;
	this.instance_6._off = true;

	var maskedShapeInstanceList = [this.instance_6];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(984).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(366));

	// Masked_Layer_38___1
	this.instance_7 = new lib.shape246("synched",0);
	this.instance_7.setTransform(229,191.8);
	this.instance_7.alpha = 0;
	this.instance_7._off = true;

	var maskedShapeInstanceList = [this.instance_7];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(984).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(366));

	// Masked_Layer_36___1
	this.instance_8 = new lib.sprite153();
	this.instance_8.setTransform(353.65,304.5,1.8349,1.8698,0,153.082,153.8882);
	this.instance_8.alpha = 0;
	this.instance_8._off = true;

	var maskedShapeInstanceList = [this.instance_8];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(984).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(366));

	// Masked_Layer_35___1
	this.instance_9 = new lib.shape245("synched",0);
	this.instance_9.setTransform(229,191.8);
	this.instance_9.alpha = 0;
	this.instance_9._off = true;

	var maskedShapeInstanceList = [this.instance_9];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(984).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(366));

	// Masked_Layer_34___1
	this.instance_10 = new lib.text244("synched",0);
	this.instance_10.setTransform(293.25,365);
	this.instance_10.alpha = 0;
	this.instance_10._off = true;

	var maskedShapeInstanceList = [this.instance_10];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(984).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(366));

	// Masked_Layer_33___1
	this.instance_11 = new lib.shape243("synched",0);
	this.instance_11.setTransform(229,191.8);
	this.instance_11.alpha = 0;
	this.instance_11._off = true;

	var maskedShapeInstanceList = [this.instance_11];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(984).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(366));

	// Masked_Layer_30___1
	this.instance_12 = new lib.text241("synched",0);
	this.instance_12.setTransform(297.75,187.4);
	this.instance_12.alpha = 0;
	this.instance_12._off = true;

	var maskedShapeInstanceList = [this.instance_12];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(984).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(366));

	// Masked_Layer_29___1
	this.instance_13 = new lib.shape240("synched",0);
	this.instance_13.setTransform(229,191.8);
	this.instance_13.alpha = 0;
	this.instance_13._off = true;

	var maskedShapeInstanceList = [this.instance_13];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(984).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(366));

	// Masked_Layer_27___1
	this.instance_14 = new lib.text238("synched",0);
	this.instance_14.setTransform(61.75,362.45);
	this.instance_14.alpha = 0;
	this.instance_14._off = true;

	var maskedShapeInstanceList = [this.instance_14];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(984).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(366));

	// Masked_Layer_26___1
	this.instance_15 = new lib.shape237("synched",0);
	this.instance_15.setTransform(229,191.8);
	this.instance_15.alpha = 0;
	this.instance_15._off = true;

	var maskedShapeInstanceList = [this.instance_15];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(984).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(366));

	// Masked_Layer_22___1
	this.instance_16 = new lib.sprite153();
	this.instance_16.setTransform(404.55,290.65,1.8348,1.8698,0,138.0825,138.8877);
	this.instance_16.alpha = 0;
	this.instance_16._off = true;

	var maskedShapeInstanceList = [this.instance_16];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(339).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).to({_off:true},645).wait(366));

	// Masked_Layer_21___1
	this.instance_17 = new lib.shape235("synched",0);
	this.instance_17.setTransform(242,190);
	this.instance_17.alpha = 0;
	this.instance_17._off = true;

	var maskedShapeInstanceList = [this.instance_17];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(339).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).to({_off:true},645).wait(366));

	// Masked_Layer_20___1
	this.instance_18 = new lib.text234("synched",0);
	this.instance_18.setTransform(291.25,228);
	this.instance_18.alpha = 0;
	this.instance_18._off = true;

	var maskedShapeInstanceList = [this.instance_18];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(339).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).to({_off:true},645).wait(366));

	// Masked_Layer_19___1
	this.instance_19 = new lib.shape233("synched",0);
	this.instance_19.setTransform(242,190);
	this.instance_19.alpha = 0;
	this.instance_19._off = true;

	var maskedShapeInstanceList = [this.instance_19];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(339).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).to({_off:true},645).wait(366));

	// Masked_Layer_18___1
	this.instance_20 = new lib.text232("synched",0);
	this.instance_20.setTransform(303.25,364.4);
	this.instance_20.alpha = 0;
	this.instance_20._off = true;

	var maskedShapeInstanceList = [this.instance_20];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(339).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).to({_off:true},645).wait(366));

	// Masked_Layer_17___1
	this.instance_21 = new lib.shape231("synched",0);
	this.instance_21.setTransform(242,190);
	this.instance_21.alpha = 0;
	this.instance_21._off = true;

	var maskedShapeInstanceList = [this.instance_21];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(339).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).to({_off:true},645).wait(366));

	// Masked_Layer_15___1
	this.instance_22 = new lib.text229("synched",0);
	this.instance_22.setTransform(167.25,146.1);
	this.instance_22.alpha = 0;
	this.instance_22._off = true;

	var maskedShapeInstanceList = [this.instance_22];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(339).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).to({_off:true},645).wait(366));

	// Masked_Layer_14___1
	this.instance_23 = new lib.shape228("synched",0);
	this.instance_23.setTransform(242,190);
	this.instance_23.alpha = 0;
	this.instance_23._off = true;

	var maskedShapeInstanceList = [this.instance_23];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(339).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).to({_off:true},645).wait(366));

	// Masked_Layer_12___1
	this.instance_24 = new lib.text226("synched",0);
	this.instance_24.setTransform(66.25,324.2);
	this.instance_24.alpha = 0;
	this.instance_24._off = true;

	var maskedShapeInstanceList = [this.instance_24];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(339).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).to({_off:true},645).wait(366));

	// Masked_Layer_11___1
	this.instance_25 = new lib.shape225("synched",0);
	this.instance_25.setTransform(242,190);
	this.instance_25.alpha = 0;
	this.instance_25._off = true;

	var maskedShapeInstanceList = [this.instance_25];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(339).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).to({_off:true},645).wait(366));

	// Masked_Layer_8___1
	this.instance_26 = new lib.shape217("synched",0);
	this.instance_26.setTransform(211.9,182.2);

	var maskedShapeInstanceList = [this.instance_26];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_26).to({_off:true},359).wait(1011));

	// Masked_Layer_7___1
	this.instance_27 = new lib.text216("synched",0);
	this.instance_27.setTransform(298.55,323.9);

	var maskedShapeInstanceList = [this.instance_27];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_27).to({_off:true},359).wait(1011));

	// Masked_Layer_6___1
	this.instance_28 = new lib.shape215("synched",0);
	this.instance_28.setTransform(211.9,182.2);

	var maskedShapeInstanceList = [this.instance_28];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_28).to({_off:true},359).wait(1011));

	// Masked_Layer_5___1
	this.instance_29 = new lib.text214("synched",0);
	this.instance_29.setTransform(29.6,323.9);

	var maskedShapeInstanceList = [this.instance_29];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_29).to({_off:true},359).wait(1011));

	// Masked_Layer_4___1
	this.instance_30 = new lib.shape213("synched",0);
	this.instance_30.setTransform(211.9,182.2);

	var maskedShapeInstanceList = [this.instance_30];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_30).to({_off:true},359).wait(1011));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-493.1,-20.6,966.4000000000001,421.90000000000003);


(lib.sprite188 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_44
	this.instance = new lib.text187("synched",0);
	this.instance.setTransform(-229.7,21.05);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_43
	this.instance_1 = new lib.shape186("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_41
	this.instance_2 = new lib.sprite153w();
	this.instance_2.setTransform(-57.35,55.45,1.69,1.69);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	// Layer_40
	this.instance_3 = new lib.shape185("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

	// Layer_38
	this.instance_4 = new lib.sprite153w();
	this.instance_4.setTransform(-21.3,1.9,1.69,1.69);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

	// Layer_37
	this.instance_5 = new lib.shape184("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1));

	// Layer_36
	this.instance_6 = new lib.text183("synched",0);
	this.instance_6.setTransform(-192.25,64.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1));

	// Layer_35
	this.instance_7 = new lib.shape182("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1));

	// Layer_34
	this.instance_8 = new lib.text181("synched",0);
	this.instance_8.setTransform(53.95,-121.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1));

	// Layer_33
	this.instance_9 = new lib.shape180("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1));

	// Layer_31
	this.instance_10 = new lib.sprite153();
	this.instance_10.setTransform(49.9,-91.3,1.6885,1.6885,-153.5871);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1));

	// Layer_30
	this.instance_11 = new lib.shape179("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(1));

	// Layer_28
	this.instance_12 = new lib.sprite153();
	this.instance_12.setTransform(24.15,-25.6,1.6898,1.6898,-48.5142);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(1));

	// Layer_27
	this.instance_13 = new lib.shape178("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(1));

	// Layer_25
	this.instance_14 = new lib.sprite153();
	this.instance_14.setTransform(-82.5,58,1.6906,1.6906,49.7999);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(1));

	// Layer_24
	this.instance_15 = new lib.shape177("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(1));

	// Layer_22
	this.instance_16 = new lib.sprite153();
	this.instance_16.setTransform(-139.35,-2.55,1.6906,1.6906,49.7999);

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(1));

	// Layer_21
	this.instance_17 = new lib.shape176("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(1));

	// Layer_20
	this.instance_18 = new lib.text175("synched",0);
	this.instance_18.setTransform(53.5,11.3,1.0616,1.0616);

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(1));

	// Layer_19
	this.instance_19 = new lib.shape174("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(1));

	// Layer_18
	this.instance_20 = new lib.text173("synched",0);
	this.instance_20.setTransform(-19.15,38.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(1));

	// Layer_17
	this.instance_21 = new lib.shape25("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(1));

	// Layer_16
	this.instance_22 = new lib.text172("synched",0);
	this.instance_22.setTransform(-51.4,70.25);

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(1));

	// Layer_15
	this.instance_23 = new lib.shape25("synched",0);
	this.instance_23.setTransform(-32.65,31.7,0.9792,1);

	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(1));

	// Layer_14
	this.instance_24 = new lib.text171("synched",0);
	this.instance_24.setTransform(-97.2,-26.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(1));

	// Layer_13
	this.instance_25 = new lib.shape170("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(1));

	// Layer_12
	this.instance_26 = new lib.text169("synched",0);
	this.instance_26.setTransform(114.35,-36.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(1));

	// Layer_11
	this.instance_27 = new lib.shape25("synched",0);
	this.instance_27.setTransform(142.05,-74.7,1.0784,1);

	this.timeline.addTween(cjs.Tween.get(this.instance_27).wait(1));

	// Layer_10
	this.instance_28 = new lib.text168("synched",0);
	this.instance_28.setTransform(75.85,-87.65);

	this.timeline.addTween(cjs.Tween.get(this.instance_28).wait(1));

	// Layer_9
	this.instance_29 = new lib.shape25("synched",0);
	this.instance_29.setTransform(112.95,-152.95,0.9926,1.7623);

	this.timeline.addTween(cjs.Tween.get(this.instance_29).wait(1));

	// Layer_8
	this.instance_30 = new lib.text167("synched",0);
	this.instance_30.setTransform(-53.3,-79.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_30).wait(1));

	// Layer_7
	this.instance_31 = new lib.shape166("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_31).wait(1));

	// Layer_6
	this.instance_32 = new lib.text165("synched",0);
	this.instance_32.setTransform(-141.95,-114.25);

	this.timeline.addTween(cjs.Tween.get(this.instance_32).wait(1));

	// Layer_5
	this.instance_33 = new lib.shape164("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_33).wait(1));

	// Layer_4
	this.instance_34 = new lib.text163("synched",0);
	this.instance_34.setTransform(-195.85,-65.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_34).wait(1));

	// Layer_3
	this.instance_35 = new lib.shape162("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_35).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite188, new cjs.Rectangle(-235.4,-125.2,469.9,224.8), null);


(lib.sprite104 = function(mode,startPosition,loop,reversed) {
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
	this.frame_1314 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1314).call(this.frame_1314).wait(1));

	// Masked_Layer_127___112
	this.instance = new lib.shape86("synched",0);
	this.instance.setTransform(-334.05,-41.3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1315));

	// Masked_Layer_126___112
	this.instance_1 = new lib.text91("synched",0);
	this.instance_1.setTransform(-680.75,-41.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1315));

	// Masked_Layer_125___112
	this.instance_2 = new lib.shape86("synched",0);
	this.instance_2.setTransform(-334.05,-111.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1315));

	// Masked_Layer_124___112
	this.instance_3 = new lib.text90("synched",0);
	this.instance_3.setTransform(-680.75,-112.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1315));

	// Masked_Layer_123___112
	this.instance_4 = new lib.shape86("synched",0);
	this.instance_4.setTransform(-334.05,-167.45);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1315));

	// Masked_Layer_122___112
	this.instance_5 = new lib.text89("synched",0);
	this.instance_5.setTransform(-680.75,-166.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1315));

	// Masked_Layer_121___112
	this.instance_6 = new lib.shape86("synched",0);
	this.instance_6.setTransform(-334.05,-221.95);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1315));

	// Masked_Layer_120___112
	this.instance_7 = new lib.text88("synched",0);
	this.instance_7.setTransform(-680.75,-221.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1315));

	// Masked_Layer_119___112
	this.instance_8 = new lib.shape86("synched",0);
	this.instance_8.setTransform(-334.05,-257.45);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1315));

	// Masked_Layer_118___112
	this.instance_9 = new lib.text87("synched",0);
	this.instance_9.setTransform(-680.75,-256.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1315));

	// Masked_Layer_117___112
	this.instance_10 = new lib.shape86("synched",0);
	this.instance_10.setTransform(-334.05,-294.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1315));

	// Masked_Layer_116___112
	this.instance_11 = new lib.text85("synched",0);
	this.instance_11.setTransform(-680.75,-293.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(1315));

	// Masked_Layer_115___112
	this.instance_12 = new lib.text83("synched",0);
	this.instance_12.setTransform(-687.75,-317.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(1315));

	// Masked_Layer_114___112
	this.instance_13 = new lib.text82("synched",0);
	this.instance_13.setTransform(-685.75,-341.8,1.0007,1);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(1315));

	// Masked_Layer_113___112
	this.instance_14 = new lib.shape80("synched",0);
	this.instance_14.setTransform(-124.1,17.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(1315));

	// Mask_Layer_1 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EgkZAfVMAAAg+oMBIzAAAMAAAA+og");
	mask.setTransform(19.3583,-144.9782);

	// Masked_Layer_110___1
	this.instance_15 = new lib.text92("synched",0);
	this.instance_15.setTransform(131.35,-176.3);
	this.instance_15._off = true;

	var maskedShapeInstanceList = [this.instance_15];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(444).to({_off:false},0).to({_off:true},230).wait(641));

	// Masked_Layer_109___1
	this.instance_16 = new lib.shape95("synched",0);
	this.instance_16._off = true;

	var maskedShapeInstanceList = [this.instance_16];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(444).to({_off:false},0).to({_off:true},230).wait(641));

	// Masked_Layer_108___1
	this.instance_17 = new lib.text92("synched",0);
	this.instance_17.setTransform(131.35,-176.3);
	this.instance_17._off = true;

	var maskedShapeInstanceList = [this.instance_17];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(319).to({_off:false},0).to({_off:true},5).wait(350).to({_off:false},0).to({_off:true},5).wait(5).to({_off:false},0).to({_off:true},5).wait(5).to({_off:false},0).to({_off:true},85).wait(536));

	// Masked_Layer_107___1
	this.instance_18 = new lib.shape95("synched",0);

	this.instance_19 = new lib.text34("synched",0);
	this.instance_19.setTransform(-135.05,-42.65,0.9277,0.9277,55.6837);

	var maskedShapeInstanceList = [this.instance_18,this.instance_19];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_18}]},319).to({state:[]},5).to({state:[{t:this.instance_19}]},120).to({state:[{t:this.instance_18}]},230).to({state:[]},5).to({state:[{t:this.instance_18}]},5).to({state:[]},5).to({state:[{t:this.instance_18}]},5).to({state:[]},85).wait(536));

	// Masked_Layer_106___1
	this.instance_20 = new lib.text92("synched",0);
	this.instance_20.setTransform(131.35,-176.3);

	this.instance_21 = new lib.shape33("synched",0);

	this.instance_22 = new lib.text103("synched",0);
	this.instance_22.setTransform(152.45,-286.85,0.897,0.897,-28.0001);

	var maskedShapeInstanceList = [this.instance_20,this.instance_21,this.instance_22];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_20}]},309).to({state:[]},5).to({state:[{t:this.instance_21}]},130).to({state:[]},230).to({state:[{t:this.instance_20}]},5).to({state:[]},5).to({state:[{t:this.instance_20}]},5).to({state:[]},5).to({state:[{t:this.instance_22}]},510).to({state:[]},5).to({state:[{t:this.instance_22}]},5).to({state:[]},5).to({state:[{t:this.instance_22}]},5).wait(91));

	// Masked_Layer_105___1
	this.instance_23 = new lib.shape95("synched",0);

	this.instance_24 = new lib.text92("synched",0);
	this.instance_24.setTransform(131.35,-176.3);

	this.instance_25 = new lib.text34("synched",0);
	this.instance_25.setTransform(-135.05,-42.65,0.9277,0.9277,55.6837);

	this.instance_26 = new lib.text94("synched",0);
	this.instance_26.setTransform(-208.75,-68.5);

	this.instance_27 = new lib.shape75("synched",0);

	var maskedShapeInstanceList = [this.instance_23,this.instance_24,this.instance_25,this.instance_26,this.instance_27];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_23}]},309).to({state:[{t:this.instance_24}]},5).to({state:[{t:this.instance_25}]},5).to({state:[{t:this.instance_24}]},5).to({state:[{t:this.instance_26}]},120).to({state:[{t:this.instance_23}]},235).to({state:[{t:this.instance_26}]},5).to({state:[{t:this.instance_23}]},5).to({state:[{t:this.instance_26}]},5).to({state:[]},85).to({state:[{t:this.instance_27}]},425).to({state:[]},5).to({state:[{t:this.instance_27}]},5).to({state:[]},5).to({state:[{t:this.instance_27}]},5).wait(91));

	// Masked_Layer_104___1
	this.instance_28 = new lib.shape25("synched",0);
	this.instance_28.setTransform(128.7,-198.5,0.3302,0.5829);
	this.instance_28._off = true;

	this.instance_29 = new lib.shape33("synched",0);

	this.instance_30 = new lib.text98("synched",0);
	this.instance_30.setTransform(72.4,20.35);

	this.instance_31 = new lib.text102("synched",0);
	this.instance_31.setTransform(-202,-244.7,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_28,this.instance_29,this.instance_30,this.instance_31];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_28}]},314).to({state:[{t:this.instance_29}]},5).to({state:[{t:this.instance_28}]},5).to({state:[{t:this.instance_28}]},119).to({state:[{t:this.instance_28}]},1).to({state:[]},235).to({state:[{t:this.instance_28}]},5).to({state:[]},5).to({state:[{t:this.instance_28}]},5).to({state:[]},85).to({state:[{t:this.instance_30}]},425).to({state:[]},5).to({state:[{t:this.instance_31}]},5).to({state:[]},5).to({state:[{t:this.instance_31}]},5).wait(91));
	this.timeline.addTween(cjs.Tween.get(this.instance_28).wait(314).to({_off:false},0).to({_off:true},5).wait(5).to({_off:false},0).wait(119).to({startPosition:0},0).wait(1).to({scaleX:0.2344,scaleY:0.6727,x:-206.5,y:-93.3},0).to({_off:true},235).wait(5).to({_off:false},0).to({_off:true},5).wait(5).to({_off:false},0).to({_off:true},85).wait(536));

	// Masked_Layer_103___1
	this.instance_32 = new lib.text34("synched",0);
	this.instance_32.setTransform(-135.05,-42.65,0.9277,0.9277,55.6837);

	this.instance_33 = new lib.text94("synched",0);
	this.instance_33.setTransform(-208.75,-68.5);

	this.instance_34 = new lib.text98("synched",0);
	this.instance_34.setTransform(92.5,-252.7);

	this.instance_35 = new lib.text99("synched",0);
	this.instance_35.setTransform(152.45,-287.1,0.897,0.897,-28.0001);

	this.instance_36 = new lib.shape25("synched",0);
	this.instance_36.setTransform(67.5,-1.85,0.2338,0.5829);

	this.instance_37 = new lib.text103("synched",0);
	this.instance_37.setTransform(152.45,-286.85,0.897,0.897,-28.0001);

	this.instance_38 = new lib.shape101("synched",0);

	var maskedShapeInstanceList = [this.instance_32,this.instance_33,this.instance_34,this.instance_35,this.instance_36,this.instance_37,this.instance_38];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_32}]},309).to({state:[{t:this.instance_33}]},5).to({state:[{t:this.instance_32}]},130).to({state:[{t:this.instance_34,p:{x:92.5,y:-252.7}}]},230).to({state:[{t:this.instance_33}]},5).to({state:[{t:this.instance_34,p:{x:92.5,y:-252.7}}]},5).to({state:[{t:this.instance_33}]},5).to({state:[{t:this.instance_34,p:{x:92.5,y:-252.7}}]},5).to({state:[]},85).to({state:[{t:this.instance_34,p:{x:72.9,y:20.35}}]},107).to({state:[]},5).to({state:[{t:this.instance_35}]},5).to({state:[]},5).to({state:[{t:this.instance_35}]},5).to({state:[{t:this.instance_36}]},298).to({state:[{t:this.instance_37}]},5).to({state:[{t:this.instance_38}]},5).to({state:[{t:this.instance_37}]},5).to({state:[{t:this.instance_38}]},5).wait(91));

	// Masked_Layer_102___1
	this.instance_39 = new lib.shape33("synched",0);

	this.instance_40 = new lib.shape25("synched",0);
	this.instance_40.setTransform(-206.5,-93.3,0.2344,0.6727);
	this.instance_40._off = true;

	this.instance_41 = new lib.shape75("synched",0);
	this.instance_41.setTransform(0,-0.25);

	this.instance_42 = new lib.text102("synched",0);
	this.instance_42.setTransform(-202,-244.7,0.9,0.9);

	var maskedShapeInstanceList = [this.instance_39,this.instance_40,this.instance_41,this.instance_42];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_39}]},309).to({state:[{t:this.instance_40}]},5).to({state:[{t:this.instance_39}]},130).to({state:[{t:this.instance_40}]},230).to({state:[{t:this.instance_40}]},4).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},4).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},4).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_40}]},4).to({state:[{t:this.instance_40}]},1).to({state:[]},85).to({state:[{t:this.instance_40}]},107).to({state:[]},5).to({state:[{t:this.instance_41,p:{y:-0.25}}]},5).to({state:[]},5).to({state:[{t:this.instance_41,p:{y:-0.25}}]},5).to({state:[{t:this.instance_42}]},298).to({state:[{t:this.instance_41,p:{y:0}}]},5).to({state:[]},5).to({state:[{t:this.instance_41,p:{y:0}}]},5).to({state:[]},5).wait(91));
	this.timeline.addTween(cjs.Tween.get(this.instance_40).wait(314).to({_off:false},0).to({_off:true},130).wait(230).to({_off:false,scaleX:0.3302,scaleY:0.5829,x:85.1,y:-273.6},0).to({startPosition:0},4).wait(1).to({scaleX:0.2344,scaleY:0.6727,x:-206.5,y:-93.3},0).to({startPosition:0},4).wait(1).to({scaleX:0.3302,scaleY:0.5829,x:85.1,y:-273.6},0).to({startPosition:0},4).wait(1).to({scaleX:0.2344,scaleY:0.6727,x:-206.5,y:-93.3},0).to({startPosition:0},4).wait(1).to({scaleX:0.3302,scaleY:0.5829,x:85.1,y:-273.6},0).to({_off:true},85).wait(107).to({_off:false,scaleX:0.2338,x:68,y:-1.85},0).to({_off:true},5).wait(424));

	// Masked_Layer_101___1
	this.instance_43 = new lib.text92("synched",0);
	this.instance_43.setTransform(131.35,-176.3);

	this.instance_44 = new lib.text94("synched",0);
	this.instance_44.setTransform(-208.75,-68.5);

	this.instance_45 = new lib.text34("synched",0);
	this.instance_45.setTransform(-135.05,-42.65,0.9277,0.9277,55.6837);

	this.instance_46 = new lib.text98("synched",0);
	this.instance_46.setTransform(72.4,20.35);
	this.instance_46._off = true;

	this.instance_47 = new lib.text99("synched",0);
	this.instance_47.setTransform(152.45,-286.85,0.897,0.897,-28.0001);

	this.instance_48 = new lib.shape101("synched",0);

	var maskedShapeInstanceList = [this.instance_43,this.instance_44,this.instance_45,this.instance_46,this.instance_47,this.instance_48];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_43}]},218).to({state:[]},5).to({state:[{t:this.instance_43}]},5).to({state:[]},5).to({state:[{t:this.instance_43}]},5).to({state:[{t:this.instance_44}]},71).to({state:[{t:this.instance_45}]},5).to({state:[]},465).to({state:[{t:this.instance_46}]},70).to({state:[{t:this.instance_47}]},37).to({state:[{t:this.instance_46}]},5).to({state:[{t:this.instance_46}]},4).to({state:[{t:this.instance_46}]},1).to({state:[{t:this.instance_46}]},4).to({state:[{t:this.instance_46}]},1).to({state:[{t:this.instance_48}]},303).to({state:[{t:this.instance_46}]},5).wait(106));
	this.timeline.addTween(cjs.Tween.get(this.instance_46).wait(849).to({_off:false},0).to({_off:true},37).wait(5).to({_off:false},0).to({startPosition:0},4).wait(1).to({y:20.1},0).to({startPosition:0},4).wait(1).to({y:20.35},0).to({_off:true},303).wait(5).to({_off:false},0).wait(106));

	// Masked_Layer_100___1
	this.instance_49 = new lib.shape25("synched",0);
	this.instance_49.setTransform(128.7,-198.5,0.3302,0.5829);
	this.instance_49._off = true;

	this.instance_50 = new lib.shape33("synched",0);

	this.instance_51 = new lib.shape75("synched",0);

	var maskedShapeInstanceList = [this.instance_49,this.instance_50,this.instance_51];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_49}]},218).to({state:[]},5).to({state:[{t:this.instance_49}]},5).to({state:[]},5).to({state:[{t:this.instance_49}]},5).to({state:[{t:this.instance_49}]},70).to({state:[{t:this.instance_49}]},1).to({state:[{t:this.instance_50}]},5).to({state:[]},465).to({state:[{t:this.instance_49}]},70).to({state:[{t:this.instance_51}]},37).to({state:[{t:this.instance_49}]},5).to({state:[{t:this.instance_49}]},4).to({state:[{t:this.instance_49}]},1).to({state:[{t:this.instance_49}]},4).to({state:[{t:this.instance_49}]},1).to({state:[]},303).to({state:[{t:this.instance_49}]},5).wait(106));
	this.timeline.addTween(cjs.Tween.get(this.instance_49).wait(218).to({_off:false},0).to({_off:true},5).wait(5).to({_off:false},0).to({_off:true},5).wait(5).to({_off:false},0).wait(70).to({startPosition:0},0).wait(1).to({scaleX:0.2344,scaleY:0.6727,x:-206.5,y:-93.3},0).to({_off:true},5).wait(535).to({_off:false,scaleX:0.2338,scaleY:0.5829,x:67.5,y:-1.85},0).to({_off:true},37).wait(5).to({_off:false},0).to({startPosition:0},4).wait(1).to({y:-2.1},0).to({startPosition:0},4).wait(1).to({y:-1.85},0).to({_off:true},303).wait(5).to({_off:false},0).wait(106));

	// Masked_Layer_99___1
	this.instance_52 = new lib.shape25("synched",0);
	this.instance_52.setTransform(-78.95,-452.85,6.1212,2.8251);
	this.instance_52.alpha = 0;
	this.instance_52._off = true;

	var maskedShapeInstanceList = [this.instance_52];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_52).wait(184).to({_off:false},0).to({alpha:0.9492},18).wait(1).to({alpha:1},0).wait(574).to({startPosition:0},0).to({alpha:0.0703},14).wait(1).to({alpha:0},0).wait(523));

	// Masked_Layer_97___1
	this.instance_53 = new lib.sprite97();
	this.instance_53.setTransform(-181.95,-62.8,1,1,89.9948);
	this.instance_53._off = true;

	var maskedShapeInstanceList = [this.instance_53];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_53).wait(445).to({_off:false},0).to({rotation:89.9974,x:65.15,y:-62.75},28).wait(1).to({rotation:89.9948,x:74},0).wait(139).to({rotation:-0.0009,x:74.9,y:-69.45},1).to({rotation:0,y:-252.7},49).wait(1).to({rotation:-0.0009,y:-256.45},0).wait(113).to({alpha:0},5).to({_off:true},1).wait(66).to({_off:false,x:72.5,y:12.1,alpha:1},0).to({y:6.85},1).to({scaleX:0.9999,scaleY:0.9999,rotation:0,y:-36.05},25).wait(1).to({scaleX:1,scaleY:1,y:-37.75},0).to({_off:true},65).wait(5).to({_off:false},0).to({_off:true},5).wait(5).to({_off:false},0).to({_off:true},5).wait(23).to({_off:false},0).to({y:-232.05},54).wait(1).to({y:-235.65},0).wait(119).to({rotation:-89.9948,x:69.6,y:-238.4},1).to({rotation:-89.9983,x:-174.4},39).wait(1).to({rotation:-89.9948,x:-180.65},0).to({_off:true},5).wait(111));

	// Masked_Layer_96___1
	this.instance_54 = new lib.shape93("synched",0);
	this.instance_54.setTransform(-188.45,-62.8,0.0073,0.4);
	this.instance_54._off = true;

	var maskedShapeInstanceList = [this.instance_54];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_54).wait(444).to({_off:false},0).to({scaleX:2.0874,x:-60.35},29).wait(1).to({scaleX:2.1592,x:-56.95},0).wait(303).to({startPosition:0},0).to({alpha:0},5).to({_off:true},1).wait(66).to({_off:false,scaleX:0.0261,rotation:89.9869,x:72.6,y:12.65,alpha:1},0).to({scaleX:0.3989,rotation:89.9978,y:-10.2},26).wait(1).to({scaleX:0.4133,rotation:89.9956,y:-11.1},0).wait(108).to({startPosition:0},0).to({scaleX:2.0276,rotation:89.9978,y:-110.1},54).wait(1).to({scaleX:2.0575,rotation:89.9956,y:-112},0).wait(276));

	// Masked_Layer_95___1
	this.instance_55 = new lib.shape93("synched",0);
	this.instance_55.setTransform(74.9,-65.25,0.034,0.4,89.9869);
	this.instance_55._off = true;

	var maskedShapeInstanceList = [this.instance_55];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_55).wait(614).to({_off:false},0).to({scaleX:1.5342,rotation:89.9956,y:-157.8},49).wait(1).to({scaleX:1.5649,rotation:89.9869,y:-159.35},0).wait(113).to({startPosition:0},0).to({alpha:0},5).to({_off:true},1).wait(376).to({_off:false,scaleX:0.0328,scaleY:0.399,rotation:0,x:71.3,y:-238.4,alpha:1},0).to({scaleX:2.0092,x:-50.05},39).wait(1).to({scaleX:2.0599,x:-53.1},0).to({startPosition:0},4).wait(1).to({scaleX:2.0885,x:-54.85},0).wait(111));

	// Masked_Layer_94___1
	this.instance_56 = new lib.shape93b("synched",0);
	this.instance_56.setTransform(23.35,20.05,0.0181,0.3993,-58.6228);
	this.instance_56._off = true;

	this.instance_57 = new lib.shape100("synched",0);
	this.instance_57.setTransform(49.95,-132.5);
	this.instance_57.alpha = 0;
	this.instance_57._off = true;

	var maskedShapeInstanceList = [this.instance_56,this.instance_57];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_56).wait(253).to({_off:false},0).to({scaleX:0.0615,scaleY:0.3987,rotation:-58.6677,x:24.75,y:17.8},1).to({scaleX:1.7156,x:77.85,y:-68.85},38).wait(1).to({scaleX:1.7616,scaleY:0.3993,rotation:-58.6228,x:79.2,y:-70.9},0).wait(484).to({startPosition:0},0).to({scaleX:1.7591,scaleY:0.3987,rotation:-58.6677,x:79.1,y:-70.8},1).to({scaleX:1.7616,scaleY:0.3993,rotation:-58.6228,x:79.2,y:-70.9,alpha:0},4).to({_off:true},1).wait(532));
	this.timeline.addTween(cjs.Tween.get(this.instance_57).wait(916).to({_off:false},0).to({alpha:0.9297},14).wait(1).to({alpha:1},0).wait(384));

	// Masked_Layer_93___1
	this.instance_58 = new lib.text79("synched",0);
	this.instance_58.setTransform(109.95,-267.2,0.5233,0.5233,-16.0044);

	var maskedShapeInstanceList = [this.instance_58];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_58).wait(183).to({startPosition:0},0).to({scaleX:0.9061,scaleY:0.9061,rotation:-16.0042,x:187.95,y:-520.9},19).wait(1).to({scaleX:0.9263,scaleY:0.9263,rotation:-16.004,x:192.05,y:-534.25},0).wait(574).to({startPosition:0},0).to({scaleX:0.9155,scaleY:0.9155,rotation:-16.0047,x:189.85,y:-418.75},8).to({scaleX:0.9071,scaleY:0.9071,rotation:-16.0058,x:188.1,y:-329},8).to({scaleX:0.9012,scaleY:0.9012,rotation:-16.0047,x:186.85,y:-264.85},8).to({scaleX:0.8976,scaleY:0.8976,rotation:-16.0052,x:186.1,y:-226.35},8).to({scaleX:0.8964,scaleY:0.8964,rotation:-16.0038,x:185.85,y:-213.7},7).wait(1).to({rotation:-16.0041,x:185.9,y:-213.5},0).wait(498));

	// Masked_Layer_92___1
	this.instance_59 = new lib.shape77("synched",0);
	this.instance_59.setTransform(2,-149,0.5254,0.5254);

	var maskedShapeInstanceList = [this.instance_59];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_59).wait(183).to({startPosition:0},0).to({scaleX:0.9098,scaleY:0.9098,x:1.05,y:-316.2},19).wait(1).to({scaleX:0.93,scaleY:0.93,x:1,y:-325},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,y:-211.95},8).to({scaleX:0.9108,scaleY:0.9108,y:-124.05},8).to({scaleX:0.9048,scaleY:0.9048,x:0.95,y:-61.25},8).to({scaleX:0.9012,scaleY:0.9012,y:-23.6},8).to({scaleX:0.9,scaleY:0.9,y:-11.2},7).wait(1).to({x:1,y:-11},0).wait(498));

	// Masked_Layer_91___1
	this.instance_60 = new lib.text78("synched",0);
	this.instance_60.setTransform(109.9,-282.75,0.5235,0.5235,-17.2572);

	var maskedShapeInstanceList = [this.instance_60];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_60).wait(183).to({startPosition:0},0).to({scaleX:0.9065,scaleY:0.9065,rotation:-17.2567,x:187.9,y:-547.8},19).wait(1).to({scaleX:0.9267,scaleY:0.9267,rotation:-17.257,x:192,y:-561.75},0).wait(574).to({startPosition:0},0).to({scaleX:0.9159,scaleY:0.9159,rotation:-17.2564,x:189.8,y:-445.95},8).to({scaleX:0.9076,scaleY:0.9076,rotation:-17.2566,x:188.1,y:-355.9},8).to({scaleX:0.9015,scaleY:0.9015,rotation:-17.2564,x:186.8,y:-291.55},8).to({scaleX:0.898,scaleY:0.898,rotation:-17.2569,x:186.05,y:-253},8).to({scaleX:0.8968,scaleY:0.8968,rotation:-17.2566,x:185.8,y:-240.3},7).wait(1).to({rotation:-17.2569,x:185.85,y:-240.1},0).wait(498));

	// Masked_Layer_90___1
	this.instance_61 = new lib.shape77("synched",0);
	this.instance_61.setTransform(1.45,-162.35,0.528,0.5356);

	var maskedShapeInstanceList = [this.instance_61];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_61).wait(183).to({startPosition:0},0).to({scaleX:0.9142,scaleY:0.9274,x:0.15,y:-339.35},19).wait(1).to({scaleX:0.9346,scaleY:0.948,x:0.05,y:-348.65},0).wait(574).to({startPosition:0},0).to({scaleX:0.9237,scaleY:0.937,x:0.1,y:-235.35},8).to({scaleX:0.9153,scaleY:0.9284,y:-147.25},8).to({scaleX:0.9092,scaleY:0.9223,x:0.05,y:-84.3},8).to({scaleX:0.9056,scaleY:0.9186,y:-46.55},8).to({scaleX:0.9045,scaleY:0.9174,y:-34.1},7).wait(1).to({scaleX:0.9044,x:0.1,y:-33.9},0).wait(498));

	// Masked_Layer_89___1
	this.instance_62 = new lib.text76("synched",0);
	this.instance_62.setTransform(102.3,-292.95,0.5237,0.5237,-22.5449);

	var maskedShapeInstanceList = [this.instance_62];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_62).wait(183).to({startPosition:0},0).to({scaleX:0.9068,scaleY:0.9068,rotation:-22.5437,x:174.75,y:-565.45},19).wait(1).to({scaleX:0.927,scaleY:0.927,rotation:-22.5442,x:178.6,y:-579.75},0).wait(574).to({startPosition:0},0).to({scaleX:0.9162,scaleY:0.9162,rotation:-22.5439,x:176.5,y:-463.75},8).to({scaleX:0.9078,scaleY:0.9078,rotation:-22.5443,x:174.9,y:-373.55},8).to({scaleX:0.9019,scaleY:0.9019,rotation:-22.5433,x:173.7,y:-309.1},8).to({scaleX:0.8983,scaleY:0.8983,rotation:-22.5442,x:173.05,y:-270.5},8).to({scaleX:0.8971,scaleY:0.8971,rotation:-22.5441,x:172.8,y:-257.75},7).wait(1).to({rotation:-22.5432,x:172.85,y:-257.55},0).wait(498));

	// Masked_Layer_88___1
	this.instance_63 = new lib.shape75("synched",0);
	this.instance_63.setTransform(13.35,-125.1,0.583,0.5838);

	var maskedShapeInstanceList = [this.instance_63];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_63).wait(183).to({startPosition:0},0).to({scaleX:1.0095,scaleY:1.0108,x:20.75,y:-274.8},19).wait(1).to({scaleX:1.0319,scaleY:1.0333,x:21.15,y:-282.7},0).wait(574).to({startPosition:0},0).to({scaleX:1.0199,scaleY:1.0213,x:20.9,y:-170.15},8).to({scaleX:1.0106,scaleY:1.012,x:20.7,y:-82.6},8).to({scaleX:1.004,scaleY:1.0053,x:20.55,y:-20.1},8).to({scaleX:1,scaleY:1.0013,x:20.45,y:17.4},8).to({scaleX:0.9987,scaleY:1,y:29.75},7).wait(1).to({x:20.5,y:29.95},0).wait(498));

	// Masked_Layer_87___1
	this.instance_64 = new lib.text74("synched",0);
	this.instance_64.setTransform(95.75,-302.55,0.5238,0.5238,-26.6069);

	var maskedShapeInstanceList = [this.instance_64];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_64).wait(183).to({startPosition:0},0).to({scaleX:0.907,scaleY:0.907,rotation:-26.6056,x:163.35,y:-582.1},19).wait(1).to({scaleX:0.9272,scaleY:0.9272,rotation:-26.6055,x:166.9,y:-596.85},0).wait(574).to({startPosition:0},0).to({scaleX:0.9164,scaleY:0.9164,rotation:-26.606,x:165,y:-480.6},8).to({scaleX:0.908,scaleY:0.908,rotation:-26.6068,x:163.5,y:-390.3},8).to({scaleX:0.902,scaleY:0.902,rotation:-26.6067,x:162.35,y:-325.7},8).to({scaleX:0.8985,scaleY:0.8985,rotation:-26.6068,x:161.7,y:-287},8).to({scaleX:0.8973,scaleY:0.8973,rotation:-26.6069,x:161.5,y:-274.25},7).wait(1).to({x:161.55,y:-274.05},0).wait(498));

	// Masked_Layer_86___1
	this.instance_65 = new lib.shape73("synched",0);
	this.instance_65.setTransform(2,-149,0.5254,0.5254);

	var maskedShapeInstanceList = [this.instance_65];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_65).wait(183).to({startPosition:0},0).to({scaleX:0.9098,scaleY:0.9098,x:1.05,y:-316.2},19).wait(1).to({scaleX:0.93,scaleY:0.93,x:1,y:-325},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,y:-211.95},8).to({scaleX:0.9108,scaleY:0.9108,y:-124.05},8).to({scaleX:0.9048,scaleY:0.9048,x:0.95,y:-61.25},8).to({scaleX:0.9012,scaleY:0.9012,y:-23.6},8).to({scaleX:0.9,scaleY:0.9,y:-11.2},7).wait(1).to({x:1,y:-11},0).wait(498));

	// Masked_Layer_85___1
	this.instance_66 = new lib.text72("synched",0);
	this.instance_66.setTransform(90.4,-310.15,0.5238,0.5238,-27.6258);

	var maskedShapeInstanceList = [this.instance_66];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_66).wait(183).to({startPosition:0},0).to({scaleX:0.9071,scaleY:0.9071,rotation:-27.6259,x:154.1,y:-595.2},19).wait(1).to({scaleX:0.9272,scaleY:0.9272,rotation:-27.6252,x:157.45,y:-610.25},0).wait(574).to({startPosition:0},0).to({scaleX:0.9164,scaleY:0.9164,rotation:-27.6249,x:155.65,y:-493.85},8).to({scaleX:0.9081,scaleY:0.9081,rotation:-27.6256,x:154.25,y:-403.4},8).to({scaleX:0.9021,scaleY:0.9021,rotation:-27.6248,x:153.2,y:-338.75},8).to({scaleX:0.8985,scaleY:0.8985,rotation:-27.6256,x:152.6,y:-300},8).to({scaleX:0.8973,scaleY:0.8973,rotation:-27.6257,x:152.4,y:-287.25},7).wait(1).to({y:-287.05},0).wait(498));

	// Masked_Layer_84___1
	this.instance_67 = new lib.shape71("synched",0);
	this.instance_67.setTransform(2,-149,0.5254,0.5254);

	var maskedShapeInstanceList = [this.instance_67];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_67).wait(183).to({startPosition:0},0).to({scaleX:0.9098,scaleY:0.9098,x:1.05,y:-316.2},19).wait(1).to({scaleX:0.93,scaleY:0.93,x:1,y:-325},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,y:-211.95},8).to({scaleX:0.9108,scaleY:0.9108,y:-124.05},8).to({scaleX:0.9048,scaleY:0.9048,x:0.95,y:-61.25},8).to({scaleX:0.9012,scaleY:0.9012,y:-23.6},8).to({scaleX:0.9,scaleY:0.9,y:-11.2},7).wait(1).to({x:1,y:-11},0).wait(498));

	// Masked_Layer_83___1
	this.instance_68 = new lib.text70("synched",0);
	this.instance_68.setTransform(84.45,-318.35,0.5239,0.5239,-30.1527);

	var maskedShapeInstanceList = [this.instance_68];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_68).wait(183).to({startPosition:0},0).to({scaleX:0.9072,scaleY:0.9072,rotation:-30.1532,x:143.8,y:-609.45},19).wait(1).to({scaleX:0.9274,scaleY:0.9274,rotation:-30.1527,x:146.9,y:-624.8},0).wait(574).to({startPosition:0},0).to({scaleX:0.9166,scaleY:0.9166,rotation:-30.1523,x:145.2,y:-508.25},8).to({scaleX:0.9082,scaleY:0.9082,rotation:-30.153,x:143.9,y:-417.65},8).to({scaleX:0.9022,scaleY:0.9022,rotation:-30.1521,x:142.9,y:-352.9},8).to({scaleX:0.8986,scaleY:0.8986,rotation:-30.1534,x:142.35,y:-314.1},8).to({scaleX:0.8975,scaleY:0.8975,rotation:-30.1528,x:142.15,y:-301.3},7).wait(1).to({scaleX:0.8974,scaleY:0.8974,rotation:-30.1529,x:142.2,y:-301.1},0).wait(498));

	// Masked_Layer_82___1
	this.instance_69 = new lib.shape69("synched",0);
	this.instance_69.setTransform(2,-149,0.5254,0.5254);

	var maskedShapeInstanceList = [this.instance_69];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_69).wait(183).to({startPosition:0},0).to({scaleX:0.9098,scaleY:0.9098,x:1.05,y:-316.2},19).wait(1).to({scaleX:0.93,scaleY:0.93,x:1,y:-325},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,y:-211.95},8).to({scaleX:0.9108,scaleY:0.9108,y:-124.05},8).to({scaleX:0.9048,scaleY:0.9048,x:0.95,y:-61.25},8).to({scaleX:0.9012,scaleY:0.9012,y:-23.6},8).to({scaleX:0.9,scaleY:0.9,y:-11.2},7).wait(1).to({x:1,y:-11},0).wait(498));

	// Masked_Layer_81___1
	this.instance_70 = new lib.text68("synched",0);
	this.instance_70.setTransform(76.9,-323.15,0.524,0.524,-33.1982);

	var maskedShapeInstanceList = [this.instance_70];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_70).wait(183).to({startPosition:0},0).to({scaleX:0.9073,scaleY:0.9073,rotation:-33.1978,x:130.75,y:-617.75},19).wait(1).to({scaleX:0.9275,scaleY:0.9275,rotation:-33.1988,x:133.55,y:-633.25},0).wait(574).to({startPosition:0},0).to({scaleX:0.9167,scaleY:0.9167,rotation:-33.1983,x:132.05,y:-516.6},8).to({scaleX:0.9084,scaleY:0.9084,rotation:-33.1984,x:130.85,y:-425.95},8).to({scaleX:0.9024,scaleY:0.9024,rotation:-33.1978,x:129.95,y:-361.15},8).to({scaleX:0.8988,scaleY:0.8988,rotation:-33.198,x:129.4,y:-322.3},8).to({scaleX:0.8976,scaleY:0.8976,rotation:-33.199,x:129.25,y:-309.5},7).wait(1).to({rotation:-33.1973,x:129.3,y:-309.3},0).wait(498));

	// Masked_Layer_80___1
	this.instance_71 = new lib.shape66("synched",0);
	this.instance_71.setTransform(2,-149,0.5254,0.5254);

	var maskedShapeInstanceList = [this.instance_71];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_71).wait(183).to({startPosition:0},0).to({scaleX:0.9098,scaleY:0.9098,x:1.05,y:-316.2},19).wait(1).to({scaleX:0.93,scaleY:0.93,x:1,y:-325},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,y:-211.95},8).to({scaleX:0.9108,scaleY:0.9108,y:-124.05},8).to({scaleX:0.9048,scaleY:0.9048,x:0.95,y:-61.25},8).to({scaleX:0.9012,scaleY:0.9012,y:-23.6},8).to({scaleX:0.9,scaleY:0.9,y:-11.2},7).wait(1).to({x:1,y:-11},0).wait(498));

	// Masked_Layer_79___1
	this.instance_72 = new lib.text67("synched",0);
	this.instance_72.setTransform(70.7,-328.55,0.524,0.524,-33.1982);

	var maskedShapeInstanceList = [this.instance_72];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_72).wait(183).to({startPosition:0},0).to({scaleX:0.9073,scaleY:0.9073,rotation:-33.1978,x:120,y:-627.1},19).wait(1).to({scaleX:0.9275,scaleY:0.9275,rotation:-33.1988,x:122.6,y:-642.8},0).wait(574).to({startPosition:0},0).to({scaleX:0.9167,scaleY:0.9167,rotation:-33.1983,x:121.2,y:-526.1},8).to({scaleX:0.9084,scaleY:0.9084,rotation:-33.1984,x:120.1,y:-435.3},8).to({scaleX:0.9024,scaleY:0.9024,rotation:-33.1978,x:119.25,y:-370.45},8).to({scaleX:0.8988,scaleY:0.8988,rotation:-33.198,x:118.8,y:-331.6},8).to({scaleX:0.8976,scaleY:0.8976,rotation:-33.199,x:118.65,y:-318.8},7).wait(1).to({rotation:-33.1973,y:-318.55},0).wait(498));

	// Masked_Layer_78___1
	this.instance_73 = new lib.shape66("synched",0);
	this.instance_73.setTransform(-4.2,-154.4,0.5254,0.5254);

	var maskedShapeInstanceList = [this.instance_73];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_73).wait(183).to({startPosition:0},0).to({scaleX:0.9098,scaleY:0.9098,x:-9.7,y:-325.55},19).wait(1).to({scaleX:0.93,scaleY:0.93,x:-9.95,y:-334.6},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,x:-9.85,y:-221.4},8).to({scaleX:0.9108,scaleY:0.9108,x:-9.75,y:-133.45},8).to({scaleX:0.9048,scaleY:0.9048,y:-70.55},8).to({scaleX:0.9012,scaleY:0.9012,x:-9.7,y:-32.9},8).to({scaleX:0.9,scaleY:0.9,x:-9.65,y:-20.45},7).wait(1).to({x:-9.6,y:-20.25},0).wait(498));

	// Masked_Layer_77___1
	this.instance_74 = new lib.text65("synched",0);
	this.instance_74.setTransform(52.4,-324.6,0.5243,0.5243,-36.6041);

	var maskedShapeInstanceList = [this.instance_74];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_74).wait(183).to({startPosition:0},0).to({scaleX:0.9079,scaleY:0.9079,rotation:-36.606,x:88.3,y:-620.25},19).wait(1).to({scaleX:0.928,scaleY:0.928,rotation:-36.6061,x:90.2,y:-635.8},0).wait(574).to({startPosition:0},0).to({scaleX:0.9173,scaleY:0.9173,x:89.15,y:-519.15},8).to({scaleX:0.9089,scaleY:0.9089,rotation:-36.6059,x:88.35,y:-428.45},8).to({scaleX:0.9029,scaleY:0.9029,rotation:-36.6057,x:87.7,y:-363.65},8).to({scaleX:0.8993,scaleY:0.8993,rotation:-36.6055,x:87.4,y:-324.8},8).to({scaleX:0.8981,scaleY:0.8981,rotation:-36.6063,x:87.25,y:-312},7).wait(1).to({rotation:-36.6055,x:87.3,y:-311.8},0).wait(498));

	// Masked_Layer_76___1
	this.instance_75 = new lib.shape64("synched",0);
	this.instance_75.setTransform(2,-149,0.5254,0.5254);

	var maskedShapeInstanceList = [this.instance_75];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_75).wait(183).to({startPosition:0},0).to({scaleX:0.9098,scaleY:0.9098,x:1.05,y:-316.2},19).wait(1).to({scaleX:0.93,scaleY:0.93,x:1,y:-325},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,y:-211.95},8).to({scaleX:0.9108,scaleY:0.9108,y:-124.05},8).to({scaleX:0.9048,scaleY:0.9048,x:0.95,y:-61.25},8).to({scaleX:0.9012,scaleY:0.9012,y:-23.6},8).to({scaleX:0.9,scaleY:0.9,y:-11.2},7).wait(1).to({x:1,y:-11},0).wait(498));

	// Masked_Layer_75___1
	this.instance_76 = new lib.text63("synched",0);
	this.instance_76.setTransform(30.5,-316.9,0.5244,0.5244,-41.6633);

	var maskedShapeInstanceList = [this.instance_76];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_76).wait(183).to({startPosition:0},0).to({scaleX:0.9081,scaleY:0.9081,rotation:-41.6604,x:50.35,y:-606.95},19).wait(1).to({scaleX:0.9283,scaleY:0.9283,x:51.4,y:-622.25},0).wait(574).to({startPosition:0},0).to({scaleX:0.9175,scaleY:0.9175,rotation:-41.6609,x:50.8,y:-505.7},8).to({scaleX:0.9091,scaleY:0.9091,rotation:-41.6621,x:50.35,y:-415.15},8).to({scaleX:0.9031,scaleY:0.9031,rotation:-41.6605,x:50,y:-350.4},8).to({scaleX:0.8996,scaleY:0.8996,rotation:-41.661,x:49.8,y:-311.6},8).to({scaleX:0.8984,scaleY:0.8984,rotation:-41.6607,x:49.75,y:-298.85},7).wait(1).to({scaleX:0.8983,scaleY:0.8983,rotation:-41.662,x:49.8,y:-298.65},0).wait(498));

	// Masked_Layer_74___1
	this.instance_77 = new lib.shape60("synched",0);
	this.instance_77.setTransform(2,-149,0.5254,0.5254);

	var maskedShapeInstanceList = [this.instance_77];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_77).wait(183).to({startPosition:0},0).to({scaleX:0.9098,scaleY:0.9098,x:1.05,y:-316.2},19).wait(1).to({scaleX:0.93,scaleY:0.93,x:1,y:-325},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,y:-211.95},8).to({scaleX:0.9108,scaleY:0.9108,y:-124.05},8).to({scaleX:0.9048,scaleY:0.9048,x:0.95,y:-61.25},8).to({scaleX:0.9012,scaleY:0.9012,y:-23.6},8).to({scaleX:0.9,scaleY:0.9,y:-11.2},7).wait(1).to({x:1,y:-11},0).wait(498));

	// Masked_Layer_73___1
	this.instance_78 = new lib.text62("synched",0);
	this.instance_78.setTransform(28.75,-330.15,0.5244,0.5244,-41.6633);

	var maskedShapeInstanceList = [this.instance_78];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_78).wait(183).to({startPosition:0},0).to({scaleX:0.9081,scaleY:0.9081,rotation:-41.6604,x:47.4,y:-629.85},19).wait(1).to({scaleX:0.9283,scaleY:0.9283,x:48.4,y:-645.6},0).wait(574).to({startPosition:0},0).to({scaleX:0.9175,scaleY:0.9175,rotation:-41.6609,x:47.85,y:-528.85},8).to({scaleX:0.9091,scaleY:0.9091,rotation:-41.6621,x:47.4,y:-438.05},8).to({scaleX:0.9031,scaleY:0.9031,rotation:-41.6605,x:47.05,y:-373.15},8).to({scaleX:0.8996,scaleY:0.8996,rotation:-41.661,x:46.85,y:-334.3},8).to({scaleX:0.8984,scaleY:0.8984,rotation:-41.6607,x:46.8,y:-321.5},7).wait(1).to({scaleX:0.8983,scaleY:0.8983,rotation:-41.662,x:46.85,y:-321.25},0).wait(498));

	// Masked_Layer_72___1
	this.instance_79 = new lib.shape60("synched",0);
	this.instance_79.setTransform(0.3,-162.2,0.5254,0.5254);

	var maskedShapeInstanceList = [this.instance_79];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_79).wait(183).to({startPosition:0},0).to({scaleX:0.9098,scaleY:0.9098,x:-1.9,y:-339.1},19).wait(1).to({scaleX:0.93,scaleY:0.93,x:-2,y:-348.4},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,y:-235.05},8).to({scaleX:0.9108,scaleY:0.9108,x:-1.95,y:-146.95},8).to({scaleX:0.9048,scaleY:0.9048,x:-2,y:-84},8).to({scaleX:0.9012,scaleY:0.9012,y:-46.25},8).to({scaleX:0.9,scaleY:0.9,y:-33.85},7).wait(1).to({x:-1.9,y:-33.65},0).wait(498));

	// Masked_Layer_71___1
	this.instance_80 = new lib.text61("synched",0);
	this.instance_80.setTransform(34.3,-341.15,0.5235,0.5235,-36.3448);

	var maskedShapeInstanceList = [this.instance_80];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_80).wait(183).to({startPosition:0},0).to({scaleX:0.9064,scaleY:0.9064,rotation:-36.3436,x:56.95,y:-648.95},19).wait(1).to({scaleX:0.9266,scaleY:0.9266,rotation:-36.3438,x:58.15,y:-665.15},0).wait(574).to({startPosition:0},0).to({scaleX:0.9158,scaleY:0.9158,rotation:-36.3435,x:57.5,y:-548.15},8).to({scaleX:0.9074,scaleY:0.9074,rotation:-36.3439,x:56.95,y:-457.15},8).to({scaleX:0.9015,scaleY:0.9015,rotation:-36.3442,x:56.55,y:-392.2},8).to({scaleX:0.8979,scaleY:0.8979,rotation:-36.3429,x:56.35,y:-353.2},8).to({scaleX:0.8967,scaleY:0.8967,rotation:-36.344,x:56.25,y:-340.4},7).wait(1).to({rotation:-36.3438,x:56.3,y:-340.15},0).wait(498));

	// Masked_Layer_70___1
	this.instance_81 = new lib.shape60("synched",0);
	this.instance_81.setTransform(15.9,-222.8,0.3503,0.3692);

	var maskedShapeInstanceList = [this.instance_81];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_81).wait(183).to({startPosition:0},0).to({scaleX:0.6065,scaleY:0.6393,x:25.15,y:-444},19).wait(1).to({scaleX:0.62,scaleY:0.6535,x:25.65,y:-455.6},0).wait(574).to({startPosition:0},0).to({scaleX:0.6128,scaleY:0.6459,x:25.35,y:-341.05},8).to({scaleX:0.6072,scaleY:0.64,x:25.15,y:-251.95},8).to({scaleX:0.6032,scaleY:0.6358,x:24.95,y:-188.35},8).to({scaleX:0.6008,scaleY:0.6333,x:24.85,y:-150.15},8).to({scaleX:0.6,scaleY:0.6324,x:24.8,y:-137.6},7).wait(1).to({x:24.85,y:-137.4},0).wait(498));

	// Masked_Layer_69___1
	this.instance_82 = new lib.text59("synched",0);
	this.instance_82.setTransform(21.3,-336.3,0.5235,0.5235,-36.3448);

	var maskedShapeInstanceList = [this.instance_82];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_82).wait(183).to({startPosition:0},0).to({scaleX:0.9064,scaleY:0.9064,rotation:-36.3436,x:34.45,y:-640.55},19).wait(1).to({scaleX:0.9266,scaleY:0.9266,rotation:-36.3438,x:35.15,y:-656.55},0).wait(574).to({startPosition:0},0).to({scaleX:0.9158,scaleY:0.9158,rotation:-36.3435,x:34.75,y:-539.65},8).to({scaleX:0.9074,scaleY:0.9074,rotation:-36.3439,x:34.45,y:-448.75},8).to({scaleX:0.9015,scaleY:0.9015,rotation:-36.3442,x:34.15,y:-383.8},8).to({scaleX:0.8979,scaleY:0.8979,rotation:-36.3429,x:34,y:-344.9},8).to({scaleX:0.8967,scaleY:0.8967,rotation:-36.344,y:-332.05},7).wait(1).to({rotation:-36.3438,x:34.05,y:-331.85},0).wait(498));

	// Masked_Layer_68___1
	this.instance_83 = new lib.shape57("synched",0);
	this.instance_83.setTransform(2,-149,0.5254,0.5254);

	var maskedShapeInstanceList = [this.instance_83];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_83).wait(183).to({startPosition:0},0).to({scaleX:0.9098,scaleY:0.9098,x:1.05,y:-316.2},19).wait(1).to({scaleX:0.93,scaleY:0.93,x:1,y:-325},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,y:-211.95},8).to({scaleX:0.9108,scaleY:0.9108,y:-124.05},8).to({scaleX:0.9048,scaleY:0.9048,x:0.95,y:-61.25},8).to({scaleX:0.9012,scaleY:0.9012,y:-23.6},8).to({scaleX:0.9,scaleY:0.9,y:-11.2},7).wait(1).to({x:1,y:-11},0).wait(498));

	// Masked_Layer_67___1
	this.instance_84 = new lib.text58("synched",0);
	this.instance_84.setTransform(18.4,-339.45,0.5235,0.5235,-36.3448);

	var maskedShapeInstanceList = [this.instance_84];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_84).wait(183).to({startPosition:0},0).to({scaleX:0.9064,scaleY:0.9064,rotation:-36.3436,x:29.45,y:-646},19).wait(1).to({scaleX:0.9266,scaleY:0.9266,rotation:-36.3438,x:30,y:-662.1},0).wait(574).to({startPosition:0},0).to({scaleX:0.9158,scaleY:0.9158,rotation:-36.3435,x:29.7,y:-545.15},8).to({scaleX:0.9074,scaleY:0.9074,rotation:-36.3439,x:29.4,y:-454.2},8).to({scaleX:0.9015,scaleY:0.9015,rotation:-36.3442,x:29.2,y:-389.25},8).to({scaleX:0.8979,scaleY:0.8979,rotation:-36.3429,x:29.05,y:-350.3},8).to({scaleX:0.8967,scaleY:0.8967,rotation:-36.344,y:-337.45},7).wait(1).to({rotation:-36.3438,x:29.1,y:-337.25},0).wait(498));

	// Masked_Layer_66___1
	this.instance_85 = new lib.shape57("synched",0);
	this.instance_85.setTransform(-0.9,-152.15,0.5254,0.5254);

	var maskedShapeInstanceList = [this.instance_85];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_85).wait(183).to({startPosition:0},0).to({scaleX:0.9098,scaleY:0.9098,x:-3.95,y:-321.65},19).wait(1).to({scaleX:0.93,scaleY:0.93,x:-4.1,y:-330.6},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,x:-4.05,y:-217.45},8).to({scaleX:0.9108,scaleY:0.9108,x:-4,y:-129.5},8).to({scaleX:0.9048,scaleY:0.9048,x:-4.05,y:-66.7},8).to({scaleX:0.9012,scaleY:0.9012,x:-4,y:-29},8).to({scaleX:0.9,scaleY:0.9,y:-16.6},7).wait(1).to({x:-3.95,y:-16.4},0).wait(498));

	// Masked_Layer_65___1
	this.instance_86 = new lib.text56("synched",0);
	this.instance_86.setTransform(-3.05,-326.9,0.5244,0.5244,-41.6633);

	var maskedShapeInstanceList = [this.instance_86];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_86).wait(183).to({startPosition:0},0).to({scaleX:0.9081,scaleY:0.9081,rotation:-41.6604,x:-7.7,y:-624.3},19).wait(1).to({scaleX:0.9283,scaleY:0.9283,x:-7.95,y:-639.95},0).wait(574).to({startPosition:0},0).to({scaleX:0.9175,scaleY:0.9175,rotation:-41.6609,x:-7.8,y:-523.25},8).to({scaleX:0.9091,scaleY:0.9091,rotation:-41.6621,x:-7.75,y:-432.5},8).to({scaleX:0.9031,scaleY:0.9031,rotation:-41.6605,y:-367.65},8).to({scaleX:0.8996,scaleY:0.8996,rotation:-41.661,x:-7.7,y:-328.8},8).to({scaleX:0.8984,scaleY:0.8984,rotation:-41.6607,y:-316},7).wait(1).to({scaleX:0.8983,scaleY:0.8983,rotation:-41.662,x:-7.65,y:-315.8},0).wait(498));

	// Masked_Layer_64___1
	this.instance_87 = new lib.shape55("synched",0);
	this.instance_87.setTransform(2,-149,0.5254,0.5254);

	var maskedShapeInstanceList = [this.instance_87];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_87).wait(183).to({startPosition:0},0).to({scaleX:0.9098,scaleY:0.9098,x:1.05,y:-316.2},19).wait(1).to({scaleX:0.93,scaleY:0.93,x:1,y:-325},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,y:-211.95},8).to({scaleX:0.9108,scaleY:0.9108,y:-124.05},8).to({scaleX:0.9048,scaleY:0.9048,x:0.95,y:-61.25},8).to({scaleX:0.9012,scaleY:0.9012,y:-23.6},8).to({scaleX:0.9,scaleY:0.9,y:-11.2},7).wait(1).to({x:1,y:-11},0).wait(498));

	// Masked_Layer_63___1
	this.instance_88 = new lib.text54("synched",0);
	this.instance_88.setTransform(5.1,-206.15,0.5245,0.5245,-32.6217);

	var maskedShapeInstanceList = [this.instance_88];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_88).wait(183).to({y:-205.65},0).to({scaleX:0.9082,scaleY:0.9082,rotation:-32.6202,x:9.05,y:-420.3},19).wait(1).to({scaleX:0.9284,scaleY:0.9284,rotation:-32.6203,x:9.2,y:-431.45},0).wait(574).to({startPosition:0},0).to({scaleX:0.9176,scaleY:0.9176,rotation:-32.6206,x:9.1,y:-317.15},8).to({scaleX:0.9093,scaleY:0.9093,rotation:-32.6207,x:5.5,y:-222.8},8).to({scaleX:0.9033,scaleY:0.9033,rotation:-32.6205,x:5.4,y:-159.3},8).to({scaleX:0.8997,scaleY:0.8997,rotation:-32.6195,y:-121.75},8).to({scaleX:0.8985,scaleY:0.8985,rotation:-32.6205,x:6,y:-108},7).wait(1).to({startPosition:0},0).wait(498));

	// Masked_Layer_62___1
	this.instance_89 = new lib.shape53("synched",0);
	this.instance_89.setTransform(2,-149,0.5254,0.5254);

	var maskedShapeInstanceList = [this.instance_89];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_89).wait(183).to({startPosition:0},0).to({scaleX:0.9098,scaleY:0.9098,x:1.05,y:-316.2},19).wait(1).to({scaleX:0.93,scaleY:0.93,x:1,y:-325},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,y:-211.95},8).to({scaleX:0.9108,scaleY:0.9108,y:-124.05},8).to({scaleX:0.9048,scaleY:0.9048,x:0.95,y:-61.25},8).to({scaleX:0.9012,scaleY:0.9012,y:-23.6},8).to({scaleX:0.9,scaleY:0.9,y:-11.2},7).wait(1).to({x:1,y:-11},0).wait(498));

	// Masked_Layer_61___1
	this.instance_90 = new lib.text52("synched",0);
	this.instance_90.setTransform(90.7,-13.9,0.5254,0.5254,-57.0004);

	var maskedShapeInstanceList = [this.instance_90];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_90).wait(183).to({startPosition:0},0).to({scaleX:0.9097,scaleY:0.9097,rotation:-57.0011,x:154.6,y:-82.3},19).wait(1).to({scaleX:0.93,scaleY:0.93,rotation:-57.0019,x:158,y:-85.9},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,rotation:-57.0009,x:156.15,y:24.35},8).to({scaleX:0.9108,scaleY:0.9108,rotation:-57.0011,x:154.75,y:110.1},8).to({scaleX:0.9048,scaleY:0.9048,rotation:-57.0008,x:153.7,y:171.35},8).to({scaleX:0.9012,scaleY:0.9012,rotation:-57.0004,x:153.05,y:208.1},8).to({scaleX:0.9,scaleY:0.9,rotation:-57.001,x:152.85,y:220.2},7).wait(1).to({rotation:-57.0005,x:152.9,y:220.4},0).wait(498));

	// Masked_Layer_60___1
	this.instance_91 = new lib.shape51("synched",0);
	this.instance_91.setTransform(2,-149,0.5254,0.5254);

	var maskedShapeInstanceList = [this.instance_91];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_91).wait(183).to({startPosition:0},0).to({scaleX:0.9098,scaleY:0.9098,x:1.05,y:-316.2},19).wait(1).to({scaleX:0.93,scaleY:0.93,x:1,y:-325},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,y:-211.95},8).to({scaleX:0.9108,scaleY:0.9108,y:-124.05},8).to({scaleX:0.9048,scaleY:0.9048,x:0.95,y:-61.25},8).to({scaleX:0.9012,scaleY:0.9012,y:-23.6},8).to({scaleX:0.9,scaleY:0.9,y:-11.2},7).wait(1).to({x:1,y:-11},0).wait(498));

	// Masked_Layer_59___1
	this.instance_92 = new lib.text50("synched",0);
	this.instance_92.setTransform(112.85,16.3,0.5231,0.5231,9.9144);

	var maskedShapeInstanceList = [this.instance_92];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_92).wait(183).to({startPosition:0},0).to({scaleX:0.9057,scaleY:0.9057,rotation:9.9146,x:193,y:-30},19).wait(1).to({scaleX:0.9259,scaleY:0.9259,rotation:9.9152,x:197.25,y:-32.4},0).wait(574).to({startPosition:0},0).to({scaleX:0.9139,scaleY:0.9139,rotation:9.914,x:194.7,y:89.2},9).to({scaleX:0.9059,scaleY:0.9059,rotation:9.9148,x:193,y:171.4},8).to({scaleX:0.9002,scaleY:0.9002,rotation:9.9151,x:191.75,y:229.25},8).to({scaleX:0.8969,scaleY:0.8969,rotation:9.9142,x:191.05,y:262.8},8).to({scaleX:0.896,scaleY:0.896,rotation:9.915,x:190.85,y:271.95},6).wait(1).to({rotation:9.9152,x:190.9,y:272.15},0).wait(498));

	// Masked_Layer_58___1
	this.instance_93 = new lib.shape47("synched",0);
	this.instance_93.setTransform(2,-149,0.5254,0.5254);

	var maskedShapeInstanceList = [this.instance_93];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_93).wait(183).to({startPosition:0},0).to({scaleX:0.9098,scaleY:0.9098,x:1.05,y:-316.2},19).wait(1).to({scaleX:0.93,scaleY:0.93,x:1,y:-325},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,y:-211.95},8).to({scaleX:0.9108,scaleY:0.9108,y:-124.05},8).to({scaleX:0.9048,scaleY:0.9048,x:0.95,y:-61.25},8).to({scaleX:0.9012,scaleY:0.9012,y:-23.6},8).to({scaleX:0.9,scaleY:0.9,y:-11.2},7).wait(1).to({x:1,y:-11},0).wait(498));

	// Masked_Layer_57___1
	this.instance_94 = new lib.text49("synched",0);
	this.instance_94.setTransform(114.05,9.05,0.5231,0.5231,9.9144);

	var maskedShapeInstanceList = [this.instance_94];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_94).wait(183).to({startPosition:0},0).to({scaleX:0.9057,scaleY:0.9057,rotation:9.9146,x:195.05,y:-42.5},19).wait(1).to({scaleX:0.9259,scaleY:0.9259,rotation:9.9152,x:199.3,y:-45.2},0).wait(574).to({startPosition:0},0).to({scaleX:0.9151,scaleY:0.9151,rotation:9.9148,x:197,y:64.6},8).to({scaleX:0.9067,scaleY:0.9067,rotation:9.915,x:195.25,y:149.95},8).to({scaleX:0.9008,scaleY:0.9008,rotation:9.9144,x:193.9,y:210.95},8).to({scaleX:0.8972,scaleY:0.8972,rotation:9.9147,x:193.15,y:247.55},8).to({scaleX:0.896,scaleY:0.896,rotation:9.915,x:192.9,y:259.55},7).wait(1).to({rotation:9.9152,y:259.75},0).wait(498));

	// Masked_Layer_56___1
	this.instance_95 = new lib.shape47("synched",0);
	this.instance_95.setTransform(3.2,-156.2,0.5254,0.5254);

	var maskedShapeInstanceList = [this.instance_95];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_95).wait(183).to({startPosition:0},0).to({scaleX:0.9098,scaleY:0.9098,x:3.1,y:-328.7},19).wait(1).to({scaleX:0.93,scaleY:0.93,y:-337.8},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,x:3.05,y:-224.6},8).to({scaleX:0.9108,scaleY:0.9108,y:-136.55},8).to({scaleX:0.9048,scaleY:0.9048,x:3,y:-73.7},8).to({scaleX:0.9012,scaleY:0.9012,y:-36},8).to({scaleX:0.9,scaleY:0.9,y:-23.6},7).wait(1).to({y:-23.35},0).wait(498));

	// Masked_Layer_55___1
	this.instance_96 = new lib.text48("synched",0);
	this.instance_96.setTransform(114.45,1.45,0.5231,0.5231,9.9144);

	var maskedShapeInstanceList = [this.instance_96];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_96).wait(183).to({startPosition:0},0).to({scaleX:0.9057,scaleY:0.9057,rotation:9.9146,x:195.75,y:-55.7},19).wait(1).to({scaleX:0.9259,scaleY:0.9259,rotation:9.9152,x:200,y:-58.7},0).wait(574).to({startPosition:0},0).to({scaleX:0.9151,scaleY:0.9151,rotation:9.9148,x:197.7,y:51.25},8).to({scaleX:0.9067,scaleY:0.9067,rotation:9.915,x:195.9,y:136.75},8).to({scaleX:0.9008,scaleY:0.9008,rotation:9.9144,x:194.55,y:197.85},8).to({scaleX:0.8969,scaleY:0.8969,rotation:9.9142,x:193.75,y:237.35},9).to({scaleX:0.896,scaleY:0.896,rotation:9.915,x:193.55,y:246.5},6).wait(1).to({rotation:9.9152,x:193.6,y:246.7},0).wait(498));

	// Masked_Layer_54___1
	this.instance_97 = new lib.shape47("synched",0);
	this.instance_97.setTransform(3.6,-163.85,0.5254,0.5254);

	var maskedShapeInstanceList = [this.instance_97];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_97).wait(183).to({startPosition:0},0).to({scaleX:0.9098,scaleY:0.9098,x:3.8,y:-341.9},19).wait(1).to({scaleX:0.93,scaleY:0.93,y:-351.25},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,x:3.75,y:-237.9},8).to({scaleX:0.9108,scaleY:0.9108,y:-149.8},8).to({scaleX:0.9048,scaleY:0.9048,x:3.65,y:-86.8},8).to({scaleX:0.9012,scaleY:0.9012,y:-49.05},8).to({scaleX:0.9,scaleY:0.9,y:-36.65},7).wait(1).to({x:3.7,y:-36.4},0).wait(498));

	// Masked_Layer_53___1
	this.instance_98 = new lib.text46("synched",0);
	this.instance_98.setTransform(113.05,-5.9,0.5232,0.5232,13.4526);

	var maskedShapeInstanceList = [this.instance_98];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_98).wait(183).to({startPosition:0},0).to({scaleX:0.9059,scaleY:0.9059,rotation:13.4529,x:193.35,y:-68.45},19).wait(1).to({scaleX:0.9261,scaleY:0.9261,rotation:13.4528,x:197.6,y:-71.7},0).wait(574).to({startPosition:0},0).to({scaleX:0.9153,scaleY:0.9153,rotation:13.4529,x:195.3,y:38.4},8).to({scaleX:0.9069,scaleY:0.9069,rotation:13.4531,x:193.55,y:124},8).to({scaleX:0.901,scaleY:0.901,rotation:13.4526,x:192.2,y:185.15},8).to({scaleX:0.8974,scaleY:0.8974,rotation:13.4531,x:191.45,y:221.85},8).to({scaleX:0.8962,scaleY:0.8962,rotation:13.4528,x:191.2,y:233.9},7).wait(1).to({rotation:13.4532,x:191.25,y:234.1},0).wait(498));

	// Masked_Layer_52___1
	this.instance_99 = new lib.shape43("synched",0);
	this.instance_99.setTransform(2,-149,0.5254,0.5254);

	var maskedShapeInstanceList = [this.instance_99];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_99).wait(183).to({startPosition:0},0).to({scaleX:0.9098,scaleY:0.9098,x:1.05,y:-316.2},19).wait(1).to({scaleX:0.93,scaleY:0.93,x:1,y:-325},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,y:-211.95},8).to({scaleX:0.9108,scaleY:0.9108,y:-124.05},8).to({scaleX:0.9048,scaleY:0.9048,x:0.95,y:-61.25},8).to({scaleX:0.9012,scaleY:0.9012,y:-23.6},8).to({scaleX:0.9,scaleY:0.9,y:-11.2},7).wait(1).to({x:1,y:-11},0).wait(498));

	// Masked_Layer_51___1
	this.instance_100 = new lib.text45("synched",0);
	this.instance_100.setTransform(111.25,24.35,0.5232,0.5232,13.4526);

	var maskedShapeInstanceList = [this.instance_100];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_100).wait(183).to({startPosition:0},0).to({scaleX:0.9059,scaleY:0.9059,rotation:13.4529,x:190.2,y:-16.05},19).wait(1).to({scaleX:0.9261,scaleY:0.9261,rotation:13.4528,x:194.35,y:-18.2},0).wait(574).to({startPosition:0},0).to({scaleX:0.9153,scaleY:0.9153,rotation:13.4529,x:192.1,y:91.3},8).to({scaleX:0.9069,scaleY:0.9069,rotation:13.4531,x:190.35,y:176.4},8).to({scaleX:0.901,scaleY:0.901,rotation:13.4526,x:189.05,y:237.25},8).to({scaleX:0.8974,scaleY:0.8974,rotation:13.4531,x:188.3,y:273.7},8).to({scaleX:0.8962,scaleY:0.8962,rotation:13.4528,x:188.05,y:285.7},7).wait(1).to({rotation:13.4532,x:188.1,y:285.9},0).wait(498));

	// Masked_Layer_50___1
	this.instance_101 = new lib.shape43("synched",0);
	this.instance_101.setTransform(20.45,-118.9,0.4299,0.5254);

	var maskedShapeInstanceList = [this.instance_101];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_101).wait(183).to({startPosition:0},0).to({scaleX:0.7443,scaleY:0.9098,x:33.05,y:-264.05},19).wait(1).to({scaleX:0.7609,scaleY:0.93,x:33.7,y:-271.7},0).wait(574).to({startPosition:0},0).to({scaleX:0.752,scaleY:0.9192,x:33.3,y:-159.3},8).to({scaleX:0.7452,scaleY:0.9108,x:33,y:-71.85},8).to({scaleX:0.7403,scaleY:0.9048,x:32.75,y:-9.4},8).to({scaleX:0.7373,scaleY:0.9012,x:32.65,y:28.05},8).to({scaleX:0.7364,scaleY:0.9,x:32.6,y:40.35},7).wait(1).to({x:32.65,y:40.55},0).wait(498));

	// Masked_Layer_49___1
	this.instance_102 = new lib.text44("synched",0);
	this.instance_102.setTransform(109.15,33.5,0.5232,0.5232,13.4526);

	var maskedShapeInstanceList = [this.instance_102];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_102).wait(183).to({startPosition:0},0).to({scaleX:0.9059,scaleY:0.9059,rotation:13.4529,x:186.55,y:-0.15},19).wait(1).to({scaleX:0.9261,scaleY:0.9261,rotation:13.4528,x:190.65,y:-1.9},0).wait(574).to({startPosition:0},0).to({scaleX:0.9141,scaleY:0.9141,rotation:13.4517,x:188.2,y:119.3},9).to({scaleX:0.9061,scaleY:0.9061,rotation:13.4526,x:186.55,y:201.25},8).to({scaleX:0.8999,scaleY:0.8999,rotation:13.4533,x:185.2,y:264.5},9).to({scaleX:0.8969,scaleY:0.8969,rotation:13.453,x:184.6,y:294.85},8).to({scaleX:0.8962,scaleY:0.8962,rotation:13.4528,x:184.45,y:301.45},5).wait(1).to({rotation:13.4532,x:184.5,y:301.65},0).wait(498));

	// Masked_Layer_48___1
	this.instance_103 = new lib.shape43("synched",0);
	this.instance_103.setTransform(18.35,-109.7,0.4299,0.5254);

	var maskedShapeInstanceList = [this.instance_103];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_103).wait(183).to({startPosition:0},0).to({scaleX:0.7443,scaleY:0.9098,x:29.4,y:-248.15},19).wait(1).to({scaleX:0.7609,scaleY:0.93,x:29.95,y:-255.45},0).wait(574).to({startPosition:0},0).to({scaleX:0.752,scaleY:0.9192,x:29.65,y:-143.2},8).to({scaleX:0.7452,scaleY:0.9108,x:29.35,y:-55.9},8).to({scaleX:0.7403,scaleY:0.9048,x:29.15,y:6.45},8).to({scaleX:0.7373,scaleY:0.9012,x:29,y:43.8},8).to({scaleX:0.7364,scaleY:0.9,y:56.1},7).wait(1).to({x:29.05,y:56.3},0).wait(498));

	// Masked_Layer_47___1
	this.instance_104 = new lib.text42("synched",0);
	this.instance_104.setTransform(72.65,36,0.524,0.524,19.1842);

	var maskedShapeInstanceList = [this.instance_104];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_104).wait(183).to({startPosition:0},0).to({scaleX:0.9073,scaleY:0.9073,rotation:19.1864,x:123.35,y:4.15},19).wait(1).to({scaleX:0.9275,scaleY:0.9275,rotation:19.1855,x:126.05,y:2.45},0).wait(574).to({startPosition:0},0).to({scaleX:0.9156,scaleY:0.9156,rotation:19.1856,x:124.45,y:123.65},9).to({scaleX:0.9075,scaleY:0.9075,rotation:19.1847,x:123.35,y:205.55},8).to({scaleX:0.9013,scaleY:0.9013,rotation:19.1862,x:122.45,y:268.75},9).to({scaleX:0.8983,scaleY:0.8983,rotation:19.1853,x:122.05,y:299.05},8).to({scaleX:0.8976,scaleY:0.8976,rotation:19.1856,x:121.95,y:305.7},5).wait(1).to({rotation:19.1859,x:122,y:305.9},0).wait(498));

	// Masked_Layer_46___1
	this.instance_105 = new lib.shape41("synched",0);
	this.instance_105.setTransform(2,-149,0.5254,0.5254);

	var maskedShapeInstanceList = [this.instance_105];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_105).wait(183).to({startPosition:0},0).to({scaleX:0.9098,scaleY:0.9098,x:1.05,y:-316.2},19).wait(1).to({scaleX:0.93,scaleY:0.93,x:1,y:-325},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,y:-211.95},8).to({scaleX:0.9108,scaleY:0.9108,y:-124.05},8).to({scaleX:0.9048,scaleY:0.9048,x:0.95,y:-61.25},8).to({scaleX:0.9012,scaleY:0.9012,y:-23.6},8).to({scaleX:0.9,scaleY:0.9,y:-11.2},7).wait(1).to({x:1,y:-11},0).wait(498));

	// Masked_Layer_45___1
	this.instance_106 = new lib.text40("synched",0);
	this.instance_106.setTransform(26.2,35.35,0.5242,0.5242,24.9753);

	var maskedShapeInstanceList = [this.instance_106];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_106).wait(183).to({startPosition:0},0).to({scaleX:0.9076,scaleY:0.9076,rotation:24.9762,x:42.95,y:3},19).wait(1).to({scaleX:0.9278,scaleY:0.9278,x:43.85,y:1.3},0).wait(574).to({startPosition:0},0).to({scaleX:0.9159,scaleY:0.9159,rotation:24.976,x:43.25,y:122.5},9).to({scaleX:0.9078,scaleY:0.9078,rotation:24.9756,x:42.9,y:204.4},8).to({scaleX:0.9016,scaleY:0.9016,rotation:24.9759,x:42.55,y:267.6},9).to({scaleX:0.8986,scaleY:0.8986,rotation:24.9767,x:42.45,y:297.95},8).to({scaleX:0.8979,scaleY:0.8979,rotation:24.976,x:42.4,y:304.55},5).wait(1).to({rotation:24.9764,x:42.45,y:304.75},0).wait(498));

	// Masked_Layer_44___1
	this.instance_107 = new lib.shape39("synched",0);
	this.instance_107.setTransform(2,-149,0.5254,0.5254);

	var maskedShapeInstanceList = [this.instance_107];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_107).wait(183).to({startPosition:0},0).to({scaleX:0.9098,scaleY:0.9098,x:1.05,y:-316.2},19).wait(1).to({scaleX:0.93,scaleY:0.93,x:1,y:-325},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,y:-211.95},8).to({scaleX:0.9108,scaleY:0.9108,y:-124.05},8).to({scaleX:0.9048,scaleY:0.9048,x:0.95,y:-61.25},8).to({scaleX:0.9012,scaleY:0.9012,y:-23.6},8).to({scaleX:0.9,scaleY:0.9,y:-11.2},7).wait(1).to({x:1,y:-11},0).wait(498));

	// Masked_Layer_43___1
	this.instance_108 = new lib.text38("synched",0);
	this.instance_108.setTransform(-18.05,33.55,0.5246,0.5246,41.0185);

	var maskedShapeInstanceList = [this.instance_108];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_108).wait(183).to({startPosition:0},0).to({scaleX:0.9084,scaleY:0.9084,rotation:41.0184,x:-33.65,y:-0.05},19).wait(1).to({scaleX:0.9286,scaleY:0.9286,rotation:41.0198,x:-34.5,y:-1.85},0).wait(574).to({startPosition:0},0).to({scaleX:0.9178,scaleY:0.9178,rotation:41.0195,x:-34.05,y:107.45},8).to({scaleX:0.9095,scaleY:0.9095,rotation:41.019,x:-33.75,y:192.45},8).to({scaleX:0.9035,scaleY:0.9035,rotation:41.0199,x:-33.55,y:253.15},8).to({scaleX:0.8996,scaleY:0.8996,rotation:41.0179,x:-33.4,y:292.4},9).to({scaleX:0.8987,scaleY:0.8987,rotation:41.0194,y:301.55},6).wait(1).to({x:-33.35,y:301.75},0).wait(498));

	// Masked_Layer_42___1
	this.instance_109 = new lib.shape37("synched",0);
	this.instance_109.setTransform(2,-149,0.5254,0.5254);

	var maskedShapeInstanceList = [this.instance_109];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_109).wait(183).to({startPosition:0},0).to({scaleX:0.9098,scaleY:0.9098,x:1.05,y:-316.2},19).wait(1).to({scaleX:0.93,scaleY:0.93,x:1,y:-325},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,y:-211.95},8).to({scaleX:0.9108,scaleY:0.9108,y:-124.05},8).to({scaleX:0.9048,scaleY:0.9048,x:0.95,y:-61.25},8).to({scaleX:0.9012,scaleY:0.9012,y:-23.6},8).to({scaleX:0.9,scaleY:0.9,y:-11.2},7).wait(1).to({x:1,y:-11},0).wait(498));

	// Masked_Layer_41___1
	this.instance_110 = new lib.text36("synched",0);
	this.instance_110.setTransform(-73.7,31.2,0.5249,0.5249,50.7783);

	var maskedShapeInstanceList = [this.instance_110];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_110).wait(183).to({startPosition:0},0).to({scaleX:0.9089,scaleY:0.9089,rotation:50.7779,x:-130,y:-4.2},19).wait(1).to({scaleX:0.9292,scaleY:0.9292,rotation:50.7783,x:-132.95,y:-6.05},0).wait(574).to({startPosition:0},0).to({scaleX:0.9183,scaleY:0.9183,rotation:50.7776,x:-131.4,y:103.3},8).to({scaleX:0.91,scaleY:0.91,rotation:50.7775,x:-130.2,y:188.3},8).to({scaleX:0.904,scaleY:0.904,rotation:50.7783,x:-129.4,y:249.05},8).to({scaleX:0.9004,scaleY:0.9004,rotation:50.7773,x:-128.85,y:285.45},8).to({scaleX:0.8992,scaleY:0.8992,x:-128.7,y:297.45},7).wait(1).to({rotation:50.778,x:-128.65,y:297.65},0).wait(498));

	// Masked_Layer_40___1
	this.instance_111 = new lib.shape35("synched",0);
	this.instance_111.setTransform(2,-149,0.5254,0.5254);

	var maskedShapeInstanceList = [this.instance_111];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_111).wait(183).to({startPosition:0},0).to({scaleX:0.9098,scaleY:0.9098,x:1.05,y:-316.2},19).wait(1).to({scaleX:0.93,scaleY:0.93,x:1,y:-325},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,y:-211.95},8).to({scaleX:0.9108,scaleY:0.9108,y:-124.05},8).to({scaleX:0.9048,scaleY:0.9048,x:0.95,y:-61.25},8).to({scaleX:0.9012,scaleY:0.9012,y:-23.6},8).to({scaleX:0.9,scaleY:0.9,y:-11.2},7).wait(1).to({x:1,y:-11},0).wait(498));

	// Masked_Layer_39___1
	this.instance_112 = new lib.text34("synched",0);
	this.instance_112.setTransform(-74.85,10.4,0.5241,0.5241,55.6844);

	var maskedShapeInstanceList = [this.instance_112];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_112).wait(183).to({startPosition:0},0).to({scaleX:0.9075,scaleY:0.9075,rotation:55.6842,x:-132,y:-40.2},19).wait(1).to({scaleX:0.9277,scaleY:0.9277,rotation:55.6837,x:-135,y:-42.85},0).wait(574).to({startPosition:0},0).to({scaleX:0.9158,scaleY:0.9158,rotation:55.6845,x:-133.25,y:78.95},9).to({scaleX:0.9077,scaleY:0.9077,rotation:55.6838,x:-132.05,y:161.2},8).to({scaleX:0.902,scaleY:0.902,rotation:55.6852,x:-131.3,y:219.15},8).to({scaleX:0.8987,scaleY:0.8987,rotation:55.684,x:-130.8,y:252.7},8).to({scaleX:0.8978,scaleY:0.8978,rotation:55.6842,x:-130.7,y:261.85},6).wait(1).to({rotation:55.6839,x:-130.6,y:262.05},0).wait(498));

	// Masked_Layer_38___1
	this.instance_113 = new lib.shape33("synched",0);
	this.instance_113.setTransform(1.5,34.5,0.5653,0.5651);

	var maskedShapeInstanceList = [this.instance_113];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_113).wait(183).to({startPosition:0},0).to({scaleX:0.9789,scaleY:0.9786,x:0.2,y:1.6},19).wait(1).to({scaleX:1.0006,scaleY:1.0004,x:0.1,y:-0.15},0).wait(574).to({startPosition:0},0).to({scaleX:0.9878,scaleY:0.9875,x:0.15,y:121.05},9).to({scaleX:0.979,scaleY:0.9788,y:203},8).to({scaleX:0.9723,scaleY:0.972,x:0.1,y:266.2},9).to({scaleX:0.9691,scaleY:0.9688,y:296.55},8).to({scaleX:0.9684,scaleY:0.9681,y:303.15},5).wait(1).to({x:0.15,y:303.35},0).wait(498));

	// Masked_Layer_37___1
	this.instance_114 = new lib.text32("synched",0);
	this.instance_114.setTransform(92.8,-29.65,0.5254,0.5254,-55.0009);

	var maskedShapeInstanceList = [this.instance_114];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_114).wait(183).to({startPosition:0},0).to({scaleX:0.9097,scaleY:0.9097,rotation:-55.0006,x:158.25,y:-109.55},19).wait(1).to({scaleX:0.93,scaleY:0.93,rotation:-55.0009,x:161.7,y:-113.75},0).wait(574).to({startPosition:0},0).to({scaleX:0.9191,scaleY:0.9191,rotation:-54.9995,x:159.85,y:-3.15},8).to({scaleX:0.9108,scaleY:0.9108,rotation:-54.9989,x:158.4,y:82.85},8).to({scaleX:0.9048,scaleY:0.9048,rotation:-54.9998,x:157.3,y:144.25},8).to({scaleX:0.9012,scaleY:0.9012,rotation:-54.9997,x:156.7,y:181.1},8).to({scaleX:0.9,scaleY:0.9,rotation:-54.9999,x:156.45,y:193.25},7).wait(1).to({scaleX:0.8999,scaleY:0.8999,rotation:-54.9987,x:156.5,y:193.45},0).wait(498));

	// Masked_Layer_36___1
	this.instance_115 = new lib.shape29("synched",0);
	this.instance_115.setTransform(2,-149,0.5254,0.5254);

	var maskedShapeInstanceList = [this.instance_115];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_115).wait(183).to({startPosition:0},0).to({scaleX:0.9098,scaleY:0.9098,x:1.05,y:-316.2},19).wait(1).to({scaleX:0.93,scaleY:0.93,x:1,y:-325},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,y:-211.95},8).to({scaleX:0.9108,scaleY:0.9108,y:-124.05},8).to({scaleX:0.9048,scaleY:0.9048,x:0.95,y:-61.25},8).to({scaleX:0.9012,scaleY:0.9012,y:-23.6},8).to({scaleX:0.9,scaleY:0.9,y:-11.2},7).wait(1).to({x:1,y:-11},0).wait(498));

	// Masked_Layer_35___1
	this.instance_116 = new lib.text31("synched",0);
	this.instance_116.setTransform(13.5,-60.4,0.5254,0.5254,-55.0009);

	var maskedShapeInstanceList = [this.instance_116];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_116).wait(183).to({x:13.25,y:-60.15},0).to({scaleX:0.9097,scaleY:0.9097,rotation:-55.0006,x:20.55,y:-162.3},19).wait(1).to({scaleX:0.93,scaleY:0.93,rotation:-55.0009,x:20.95,y:-167.7},0).wait(574).to({startPosition:0},0).to({scaleX:0.9191,scaleY:0.9191,rotation:-54.9995,x:20.7,y:-56.45},8).to({scaleX:0.9108,scaleY:0.9108,rotation:-54.9989,x:20.55,y:30},8).to({scaleX:0.9048,scaleY:0.9048,rotation:-54.9998,x:20.35,y:91.8},8).to({scaleX:0.9012,scaleY:0.9012,rotation:-54.9997,x:20.3,y:128.85},8).to({scaleX:0.9,scaleY:0.9,rotation:-54.9999,x:20.25,y:141.05},7).wait(1).to({scaleX:0.8999,scaleY:0.8999,rotation:-54.9987,x:20.3,y:141.25},0).wait(498));

	// Masked_Layer_34___1
	this.instance_117 = new lib.shape29("synched",0);
	this.instance_117.setTransform(-77.5,-179.45,0.5254,0.5254);

	var maskedShapeInstanceList = [this.instance_117];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_117).wait(183).to({startPosition:0},0).to({scaleX:0.9098,scaleY:0.9098,x:-136.65,y:-368.95},19).wait(1).to({scaleX:0.93,scaleY:0.93,x:-139.75,y:-378.95},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,x:-138.1,y:-265.25},8).to({scaleX:0.9108,scaleY:0.9108,x:-136.85,y:-176.9},8).to({scaleX:0.9048,scaleY:0.9048,x:-136,y:-113.75},8).to({scaleX:0.9012,scaleY:0.9012,x:-135.45,y:-75.85},8).to({scaleX:0.9,scaleY:0.9,x:-135.25,y:-63.4},7).wait(1).to({x:-135.2,y:-63.2},0).wait(498));

	// Masked_Layer_33___1
	this.instance_118 = new lib.text30("synched",0);
	this.instance_118.setTransform(-43.95,-71.1,0.5254,0.5254,-55.0009);

	var maskedShapeInstanceList = [this.instance_118];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_118).wait(183).to({startPosition:0},0).to({scaleX:0.9097,scaleY:0.9097,rotation:-55.0006,x:-78.5,y:-181.3},19).wait(1).to({scaleX:0.93,scaleY:0.93,rotation:-55.0009,x:-80.35,y:-187.1},0).wait(574).to({startPosition:0},0).to({scaleX:0.9191,scaleY:0.9191,rotation:-54.9995,x:-79.4,y:-75.65},8).to({scaleX:0.9108,scaleY:0.9108,rotation:-54.9989,x:-78.65,y:11},8).to({scaleX:0.9048,scaleY:0.9048,rotation:-54.9998,x:-78.15,y:72.95},8).to({scaleX:0.9012,scaleY:0.9012,rotation:-54.9997,x:-77.85,y:110.05},8).to({scaleX:0.9,scaleY:0.9,rotation:-54.9999,x:-77.75,y:122.25},7).wait(1).to({scaleX:0.8999,scaleY:0.8999,rotation:-54.9987,x:-77.7,y:122.45},0).wait(498));

	// Masked_Layer_32___1
	this.instance_119 = new lib.shape29("synched",0);
	this.instance_119.setTransform(-134.75,-190.45,0.5254,0.5254);

	var maskedShapeInstanceList = [this.instance_119];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_119).wait(183).to({startPosition:0},0).to({scaleX:0.9098,scaleY:0.9098,x:-235.7,y:-387.95},19).wait(1).to({scaleX:0.93,scaleY:0.93,x:-241.05,y:-398.35},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,x:-238.2,y:-284.45},8).to({scaleX:0.9108,scaleY:0.9108,x:-236.05,y:-195.85},8).to({scaleX:0.9048,scaleY:0.9048,x:-234.5,y:-132.6},8).to({scaleX:0.9012,scaleY:0.9012,x:-233.6,y:-94.65},8).to({scaleX:0.9,scaleY:0.9,x:-233.3,y:-82.15},7).wait(1).to({x:-233.2,y:-81.95},0).wait(498));

	// Masked_Layer_31___1
	this.instance_120 = new lib.text28("synched",0);
	this.instance_120.setTransform(-69.15,-100,0.5254,0.5254,-55.0009);

	var maskedShapeInstanceList = [this.instance_120];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_120).wait(183).to({startPosition:0},0).to({scaleX:0.9097,scaleY:0.9097,rotation:-55.0006,x:-122.2,y:-231.3},19).wait(1).to({scaleX:0.93,scaleY:0.93,rotation:-55.0009,x:-124.95,y:-238.25},0).wait(574).to({startPosition:0},0).to({scaleX:0.9191,scaleY:0.9191,rotation:-54.9995,x:-123.5,y:-126.2},8).to({scaleX:0.9108,scaleY:0.9108,rotation:-54.9989,x:-122.35,y:-39.05},8).to({scaleX:0.9048,scaleY:0.9048,rotation:-54.9998,x:-121.6,y:23.15},8).to({scaleX:0.9012,scaleY:0.9012,rotation:-54.9997,x:-121.1,y:60.5},8).to({scaleX:0.9,scaleY:0.9,rotation:-54.9999,x:-120.95,y:72.75},7).wait(1).to({scaleX:0.8999,scaleY:0.8999,rotation:-54.9987,x:-120.9,y:72.95},0).wait(498));

	// Masked_Layer_30___1
	this.instance_121 = new lib.shape27("synched",0);
	this.instance_121.setTransform(2,-149,0.5254,0.5254);

	var maskedShapeInstanceList = [this.instance_121];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_121).wait(183).to({startPosition:0},0).to({scaleX:0.9098,scaleY:0.9098,x:1.05,y:-316.2},19).wait(1).to({scaleX:0.93,scaleY:0.93,x:1,y:-325},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,y:-211.95},8).to({scaleX:0.9108,scaleY:0.9108,y:-124.05},8).to({scaleX:0.9048,scaleY:0.9048,x:0.95,y:-61.25},8).to({scaleX:0.9012,scaleY:0.9012,y:-23.6},8).to({scaleX:0.9,scaleY:0.9,y:-11.2},7).wait(1).to({x:1,y:-11},0).wait(498));

	// Masked_Layer_29___1
	this.instance_122 = new lib.text26("synched",0);
	this.instance_122.setTransform(-44.45,-119.75,0.5254,0.5254);

	var maskedShapeInstanceList = [this.instance_122];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_122).wait(183).to({startPosition:0},0).to({scaleX:0.9097,scaleY:0.9097,x:-79.4,y:-265.55},19).wait(1).to({scaleX:0.93,scaleY:0.93,x:-81.25,y:-273.25},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,x:-80.3,y:-160.8},8).to({scaleX:0.9108,scaleY:0.9108,x:-79.55,y:-73.35},8).to({scaleX:0.9048,scaleY:0.9048,x:-79.1,y:-10.9},8).to({scaleX:0.9012,scaleY:0.9012,x:-78.75,y:26.55},8).to({scaleX:0.9,scaleY:0.9,x:-78.65,y:38.9},7).wait(1).to({x:-78.6,y:39.1},0).wait(498));

	// Masked_Layer_28___1
	this.instance_123 = new lib.shape25("synched",0);
	this.instance_123.setTransform(-7.75,-129.7,1.6001,0.291);

	var maskedShapeInstanceList = [this.instance_123];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_123).wait(183).to({startPosition:0},0).to({scaleX:2.7707,scaleY:0.5038,x:-15.85,y:-282.8},19).wait(1).to({scaleX:2.8323,scaleY:0.515,x:-16.25,y:-290.85},0).wait(574).to({startPosition:0},0).to({scaleX:2.7994,scaleY:0.509,x:-16.05,y:-178.2},8).to({scaleX:2.7739,scaleY:0.5044,x:-15.9,y:-90.6},8).to({scaleX:2.7556,scaleY:0.5011,x:-15.85,y:-28.05},8).to({scaleX:2.7446,scaleY:0.4991,x:-15.75,y:9.45},8).to({scaleX:2.741,scaleY:0.4984,y:21.85},7).wait(1).to({x:-15.7,y:22.05},0).wait(498));

	// Masked_Layer_27___1
	this.instance_124 = new lib.text24("synched",0);
	this.instance_124.setTransform(-129.85,11.3,0.5254,0.5254,-89.995);

	var maskedShapeInstanceList = [this.instance_124];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_124).wait(183).to({startPosition:0},0).to({scaleX:0.9097,scaleY:0.9097,rotation:-89.9952,x:-227.25,y:-38.65},19).wait(1).to({scaleX:0.93,scaleY:0.93,rotation:-89.9953,x:-232.4,y:-41.25},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,rotation:-89.9952,x:-229.65,y:68.5},8).to({scaleX:0.9108,scaleY:0.9108,x:-227.55,y:153.85},8).to({scaleX:0.9048,scaleY:0.9048,x:-226.1,y:214.8},8).to({scaleX:0.9012,scaleY:0.9012,rotation:-89.9951,x:-225.2,y:251.35},8).to({scaleX:0.9,scaleY:0.9,x:-224.9,y:263.4},7).wait(1).to({rotation:-89.9961,x:-224.85,y:263.6},0).wait(498));

	// Masked_Layer_26___1
	this.instance_125 = new lib.text23("synched",0);
	this.instance_125.setTransform(-132.35,-192.55,0.5254,0.5254,-89.995);

	var maskedShapeInstanceList = [this.instance_125];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_125).wait(183).to({startPosition:0},0).to({scaleX:0.9097,scaleY:0.9097,rotation:-89.9952,x:-231.6,y:-391.6},19).wait(1).to({scaleX:0.93,scaleY:0.93,rotation:-89.9953,x:-236.85,y:-402.1},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,rotation:-89.9952,x:-234.1,y:-288.15},8).to({scaleX:0.9108,scaleY:0.9108,x:-231.95,y:-199.55},8).to({scaleX:0.9048,scaleY:0.9048,x:-230.45,y:-136.25},8).to({scaleX:0.9012,scaleY:0.9012,rotation:-89.9951,x:-229.55,y:-98.3},8).to({scaleX:0.9,scaleY:0.9,x:-229.25,y:-85.8},7).wait(1).to({rotation:-89.9961,x:-229.15,y:-85.6},0).wait(498));

	// Masked_Layer_25___1
	this.instance_126 = new lib.text12("synched",0);
	this.instance_126.setTransform(-116.5,42.95,0.5254,0.5254);

	var maskedShapeInstanceList = [this.instance_126];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_126).wait(183).to({startPosition:0},0).to({scaleX:0.9098,scaleY:0.9098,x:-204.1,y:16.2},19).wait(1).to({scaleX:0.93,scaleY:0.93,x:-208.7,y:14.75},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,x:-206.25,y:123.85},8).to({scaleX:0.9108,scaleY:0.9108,x:-204.4,y:208.7},8).to({scaleX:0.9048,scaleY:0.9048,x:-203.1,y:269.3},8).to({scaleX:0.9012,scaleY:0.9012,x:-202.25,y:305.65},8).to({scaleX:0.9,scaleY:0.9,x:-202,y:317.6},7).wait(1).to({x:-201.95,y:317.8},0).wait(498));

	// Masked_Layer_24___1
	this.instance_127 = new lib.text10("synched",0);
	this.instance_127.setTransform(-116.5,16.7,0.5254,0.5254);

	var maskedShapeInstanceList = [this.instance_127];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_127).wait(183).to({startPosition:0},0).to({scaleX:0.9098,scaleY:0.9098,x:-204.1,y:-29.3},19).wait(1).to({scaleX:0.93,scaleY:0.93,x:-208.7,y:-31.75},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,x:-206.25,y:77.9},8).to({scaleX:0.9108,scaleY:0.9108,x:-204.4,y:163.15},8).to({scaleX:0.9048,scaleY:0.9048,x:-203.1,y:224.05},8).to({scaleX:0.9012,scaleY:0.9012,x:-202.25,y:260.6},8).to({scaleX:0.9,scaleY:0.9,x:-202,y:272.6},7).wait(1).to({x:-201.95,y:272.8},0).wait(498));

	// Masked_Layer_23___1
	this.instance_128 = new lib.text8("synched",0);
	this.instance_128.setTransform(-116.5,-9.6,0.5254,0.5254);

	var maskedShapeInstanceList = [this.instance_128];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_128).wait(183).to({startPosition:0},0).to({scaleX:0.9098,scaleY:0.9098,x:-204.1,y:-74.8},19).wait(1).to({scaleX:0.93,scaleY:0.93,x:-208.7,y:-78.25},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,x:-206.25,y:31.95},8).to({scaleX:0.9108,scaleY:0.9108,x:-204.4,y:117.65},8).to({scaleX:0.9048,scaleY:0.9048,x:-203.1,y:178.85},8).to({scaleX:0.9012,scaleY:0.9012,x:-202.25,y:215.55},8).to({scaleX:0.9,scaleY:0.9,x:-202,y:227.6},7).wait(1).to({x:-201.95,y:227.8},0).wait(498));

	// Masked_Layer_22___1
	this.instance_129 = new lib.text6("synched",0);
	this.instance_129.setTransform(-116.5,-35.85,0.5254,0.5254);

	var maskedShapeInstanceList = [this.instance_129];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_129).wait(183).to({startPosition:0},0).to({scaleX:0.9098,scaleY:0.9098,x:-204.1,y:-120.3},19).wait(1).to({scaleX:0.93,scaleY:0.93,x:-208.7,y:-124.75},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,x:-206.25,y:-14},8).to({scaleX:0.9108,scaleY:0.9108,x:-204.4,y:72.1},8).to({scaleX:0.9048,scaleY:0.9048,x:-203.1,y:133.6},8).to({scaleX:0.9012,scaleY:0.9012,x:-202.25,y:170.45},8).to({scaleX:0.9,scaleY:0.9,x:-202,y:182.6},7).wait(1).to({x:-201.95,y:182.8},0).wait(498));

	// Masked_Layer_21___1
	this.instance_130 = new lib.text4("synched",0);
	this.instance_130.setTransform(-116.5,-62.15,0.5254,0.5254);

	var maskedShapeInstanceList = [this.instance_130];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_130).wait(183).to({startPosition:0},0).to({scaleX:0.9098,scaleY:0.9098,x:-204.1,y:-165.75},19).wait(1).to({scaleX:0.93,scaleY:0.93,x:-208.7,y:-171.25},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,x:-206.25,y:-59.95},8).to({scaleX:0.9108,scaleY:0.9108,x:-204.4,y:26.55},8).to({scaleX:0.9048,scaleY:0.9048,x:-203.1,y:88.35},8).to({scaleX:0.9012,scaleY:0.9012,x:-202.25,y:125.4},8).to({scaleX:0.9,scaleY:0.9,x:-202,y:137.6},7).wait(1).to({x:-201.95,y:137.8},0).wait(498));

	// Masked_Layer_20___1
	this.instance_131 = new lib.text21("synched",0);
	this.instance_131.setTransform(-116.5,-88.4,0.5254,0.5254);

	var maskedShapeInstanceList = [this.instance_131];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_131).wait(183).to({startPosition:0},0).to({scaleX:0.9098,scaleY:0.9098,x:-204.1,y:-211.25},19).wait(1).to({scaleX:0.93,scaleY:0.93,x:-208.7,y:-217.75},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,x:-206.25,y:-105.9},8).to({scaleX:0.9108,scaleY:0.9108,x:-204.4,y:-19},8).to({scaleX:0.9048,scaleY:0.9048,x:-203.1,y:43.1},8).to({scaleX:0.9012,scaleY:0.9012,x:-202.25,y:80.35},8).to({scaleX:0.9,scaleY:0.9,x:-202,y:92.6},7).wait(1).to({x:-201.95,y:92.8},0).wait(498));

	// Masked_Layer_19___1
	this.instance_132 = new lib.text20("synched",0);
	this.instance_132.setTransform(-116.5,-114.65,0.5254,0.5254);

	var maskedShapeInstanceList = [this.instance_132];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_132).wait(183).to({startPosition:0},0).to({scaleX:0.9098,scaleY:0.9098,x:-204.1,y:-256.75},19).wait(1).to({scaleX:0.93,scaleY:0.93,x:-208.7,y:-264.2},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,x:-206.25,y:-151.9},8).to({scaleX:0.9108,scaleY:0.9108,x:-204.4,y:-64.55},8).to({scaleX:0.9048,scaleY:0.9048,x:-203.1,y:-2.1},8).to({scaleX:0.9012,scaleY:0.9012,x:-202.25,y:35.3},8).to({scaleX:0.9,scaleY:0.9,x:-202,y:47.6},7).wait(1).to({x:-201.95,y:47.8},0).wait(498));

	// Masked_Layer_18___1
	this.instance_133 = new lib.text19("synched",0);
	this.instance_133.setTransform(126.8,-130.3,0.5254,0.5254);

	var maskedShapeInstanceList = [this.instance_133];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_133).wait(183).to({startPosition:0},0).to({scaleX:0.9098,scaleY:0.9098,x:217.1,y:-283.8},19).wait(1).to({scaleX:0.93,scaleY:0.93,x:221.85,y:-291.9},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,x:219.3,y:-179.25},8).to({scaleX:0.9108,scaleY:0.9108,x:217.3,y:-91.65},8).to({scaleX:0.9048,scaleY:0.9048,x:215.85,y:-29.05},8).to({scaleX:0.9012,scaleY:0.9012,x:215,y:8.5},8).to({scaleX:0.9,scaleY:0.9,x:214.7,y:20.85},7).wait(1).to({x:214.75,y:21.05},0).wait(498));

	// Masked_Layer_17___1
	this.instance_134 = new lib.text18("synched",0);
	this.instance_134.setTransform(87.4,-130.3,0.5254,0.5254);

	var maskedShapeInstanceList = [this.instance_134];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_134).wait(183).to({startPosition:0},0).to({scaleX:0.9098,scaleY:0.9098,x:148.9,y:-283.8},19).wait(1).to({scaleX:0.93,scaleY:0.93,x:152.1,y:-291.9},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,x:150.35,y:-179.25},8).to({scaleX:0.9108,scaleY:0.9108,x:149,y:-91.65},8).to({scaleX:0.9048,scaleY:0.9048,x:148,y:-29.05},8).to({scaleX:0.9012,scaleY:0.9012,x:147.4,y:8.5},8).to({scaleX:0.9,scaleY:0.9,x:147.2,y:20.85},7).wait(1).to({x:147.25,y:21.05},0).wait(498));

	// Masked_Layer_16___1
	this.instance_135 = new lib.text17("synched",0);
	this.instance_135.setTransform(47.95,-130.3,0.5254,0.5254);

	var maskedShapeInstanceList = [this.instance_135];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_135).wait(183).to({startPosition:0},0).to({scaleX:0.9098,scaleY:0.9098,x:80.65,y:-283.8},19).wait(1).to({scaleX:0.93,scaleY:0.93,x:82.35,y:-291.9},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,x:81.45,y:-179.25},8).to({scaleX:0.9108,scaleY:0.9108,x:80.7,y:-91.65},8).to({scaleX:0.9048,scaleY:0.9048,x:80.1,y:-29.05},8).to({scaleX:0.9012,scaleY:0.9012,x:79.8,y:8.5},8).to({scaleX:0.9,scaleY:0.9,x:79.7,y:20.85},7).wait(1).to({x:79.75,y:21.05},0).wait(498));

	// Masked_Layer_15___1
	this.instance_136 = new lib.text16("synched",0);
	this.instance_136.setTransform(8.55,-130.3,0.5254,0.5254);

	var maskedShapeInstanceList = [this.instance_136];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_136).wait(183).to({startPosition:0},0).to({scaleX:0.9098,scaleY:0.9098,x:12.4,y:-283.8},19).wait(1).to({scaleX:0.93,scaleY:0.93,x:12.6,y:-291.9},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,x:12.5,y:-179.25},8).to({scaleX:0.9108,scaleY:0.9108,x:12.4,y:-91.65},8).to({scaleX:0.9048,scaleY:0.9048,x:12.25,y:-29.05},8).to({scaleX:0.9012,scaleY:0.9012,x:12.2,y:8.5},8).to({scaleX:0.9,scaleY:0.9,y:20.85},7).wait(1).to({x:12.25,y:21.05},0).wait(498));

	// Masked_Layer_14___1
	this.instance_137 = new lib.text15("synched",0);
	this.instance_137.setTransform(-30.95,-130.3,0.5254,0.5254);

	var maskedShapeInstanceList = [this.instance_137];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_137).wait(183).to({startPosition:0},0).to({scaleX:0.9098,scaleY:0.9098,x:-56.05,y:-283.8},19).wait(1).to({scaleX:0.93,scaleY:0.93,x:-57.35,y:-291.9},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,x:-56.7,y:-179.25},8).to({scaleX:0.9108,scaleY:0.9108,x:-56.15,y:-91.65},8).to({scaleX:0.9048,scaleY:0.9048,x:-55.85,y:-29.05},8).to({scaleX:0.9012,scaleY:0.9012,x:-55.6,y:8.5},8).to({scaleX:0.9,scaleY:0.9,x:-55.55,y:20.85},7).wait(1).to({x:-55.45,y:21.05},0).wait(498));

	// Masked_Layer_13___1
	this.instance_138 = new lib.text14("synched",0);
	this.instance_138.setTransform(-70.35,-130.3,0.5254,0.5254);

	var maskedShapeInstanceList = [this.instance_138];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_138).wait(183).to({startPosition:0},0).to({scaleX:0.9098,scaleY:0.9098,x:-124.25,y:-283.8},19).wait(1).to({scaleX:0.93,scaleY:0.93,x:-127.1,y:-291.9},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,x:-125.6,y:-179.25},8).to({scaleX:0.9108,scaleY:0.9108,x:-124.45,y:-91.65},8).to({scaleX:0.9048,scaleY:0.9048,x:-123.7,y:-29.05},8).to({scaleX:0.9012,scaleY:0.9012,x:-123.2,y:8.5},8).to({scaleX:0.9,scaleY:0.9,x:-123.05,y:20.85},7).wait(1).to({x:-122.95,y:21.05},0).wait(498));

	// Masked_Layer_12___1
	this.instance_139 = new lib.text13("synched",0);
	this.instance_139.setTransform(-109.8,-130.3,0.5254,0.5254);

	var maskedShapeInstanceList = [this.instance_139];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_139).wait(183).to({startPosition:0},0).to({scaleX:0.9098,scaleY:0.9098,x:-192.5,y:-283.8},19).wait(1).to({scaleX:0.93,scaleY:0.93,x:-196.85,y:-291.9},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,x:-194.55,y:-179.25},8).to({scaleX:0.9108,scaleY:0.9108,x:-192.75,y:-91.65},8).to({scaleX:0.9048,scaleY:0.9048,x:-191.55,y:-29.05},8).to({scaleX:0.9012,scaleY:0.9012,x:-190.8,y:8.5},8).to({scaleX:0.9,scaleY:0.9,x:-190.55,y:20.85},7).wait(1).to({x:-190.45,y:21.05},0).wait(498));

	// Masked_Layer_11___1
	this.instance_140 = new lib.text12("synched",0);
	this.instance_140.setTransform(-116.5,-347,0.5254,0.5254);

	var maskedShapeInstanceList = [this.instance_140];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_140).wait(183).to({startPosition:0},0).to({scaleX:0.9098,scaleY:0.9098,x:-204.1,y:-659.1},19).wait(1).to({scaleX:0.93,scaleY:0.93,x:-208.7,y:-675.5},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,x:-206.25,y:-558.4},8).to({scaleX:0.9108,scaleY:0.9108,x:-204.4,y:-467.35},8).to({scaleX:0.9048,scaleY:0.9048,x:-203.1,y:-402.25},8).to({scaleX:0.9012,scaleY:0.9012,x:-202.25,y:-363.25},8).to({scaleX:0.9,scaleY:0.9,x:-202,y:-350.4},7).wait(1).to({x:-201.95,y:-350.2},0).wait(498));

	// Masked_Layer_10___1
	this.instance_141 = new lib.text11("synched",0);
	this.instance_141.setTransform(-116.5,-322.05,0.5254,0.5254);

	var maskedShapeInstanceList = [this.instance_141];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_141).wait(183).to({startPosition:0},0).to({scaleX:0.9098,scaleY:0.9098,x:-204.1,y:-615.85},19).wait(1).to({scaleX:0.93,scaleY:0.93,x:-208.7,y:-631.35},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,x:-206.25,y:-514.75},8).to({scaleX:0.9108,scaleY:0.9108,x:-204.4,y:-424.05},8).to({scaleX:0.9048,scaleY:0.9048,x:-203.1,y:-359.3},8).to({scaleX:0.9012,scaleY:0.9012,x:-202.25,y:-320.45},8).to({scaleX:0.9,scaleY:0.9,x:-202,y:-307.65},7).wait(1).to({x:-201.95,y:-307.45},0).wait(498));

	// Masked_Layer_9___1
	this.instance_142 = new lib.text10("synched",0);
	this.instance_142.setTransform(-116.5,-295.8,0.5254,0.5254);

	var maskedShapeInstanceList = [this.instance_142];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_142).wait(183).to({startPosition:0},0).to({scaleX:0.9098,scaleY:0.9098,x:-204.1,y:-570.4},19).wait(1).to({scaleX:0.93,scaleY:0.93,x:-208.7,y:-584.85},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,x:-206.25,y:-468.75},8).to({scaleX:0.9108,scaleY:0.9108,x:-204.4,y:-378.55},8).to({scaleX:0.9048,scaleY:0.9048,x:-203.1,y:-314.05},8).to({scaleX:0.9012,scaleY:0.9012,x:-202.25,y:-275.4},8).to({scaleX:0.9,scaleY:0.9,x:-202,y:-262.65},7).wait(1).to({x:-201.95,y:-262.45},0).wait(498));

	// Masked_Layer_8___1
	this.instance_143 = new lib.text9("synched",0);
	this.instance_143.setTransform(-116.5,-269.5,0.5254,0.5254);

	var maskedShapeInstanceList = [this.instance_143];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_143).wait(183).to({startPosition:0},0).to({scaleX:0.9098,scaleY:0.9098,x:-204.1,y:-524.9},19).wait(1).to({scaleX:0.93,scaleY:0.93,x:-208.7,y:-538.35},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,x:-206.25,y:-422.8},8).to({scaleX:0.9108,scaleY:0.9108,x:-204.4,y:-333},8).to({scaleX:0.9048,scaleY:0.9048,x:-203.1,y:-268.8},8).to({scaleX:0.9012,scaleY:0.9012,x:-202.25,y:-230.35},8).to({scaleX:0.9,scaleY:0.9,x:-202,y:-217.65},7).wait(1).to({x:-201.95,y:-217.45},0).wait(498));

	// Masked_Layer_7___1
	this.instance_144 = new lib.text8("synched",0);
	this.instance_144.setTransform(-116.5,-243.25,0.5254,0.5254);

	var maskedShapeInstanceList = [this.instance_144];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_144).wait(183).to({startPosition:0},0).to({scaleX:0.9098,scaleY:0.9098,x:-204.1,y:-479.4},19).wait(1).to({scaleX:0.93,scaleY:0.93,x:-208.7,y:-491.85},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,x:-206.25,y:-376.85},8).to({scaleX:0.9108,scaleY:0.9108,x:-204.4,y:-287.45},8).to({scaleX:0.9048,scaleY:0.9048,x:-203.1,y:-223.55},8).to({scaleX:0.9012,scaleY:0.9012,x:-202.25,y:-185.3},8).to({scaleX:0.9,scaleY:0.9,x:-202,y:-172.65},7).wait(1).to({x:-201.95,y:-172.45},0).wait(498));

	// Masked_Layer_6___1
	this.instance_145 = new lib.text7("synched",0);
	this.instance_145.setTransform(-116.5,-217,0.5254,0.5254);

	var maskedShapeInstanceList = [this.instance_145];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_145).wait(183).to({startPosition:0},0).to({scaleX:0.9098,scaleY:0.9098,x:-204.1,y:-433.9},19).wait(1).to({scaleX:0.93,scaleY:0.93,x:-208.7,y:-445.35},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,x:-206.25,y:-330.9},8).to({scaleX:0.9108,scaleY:0.9108,x:-204.4,y:-241.9},8).to({scaleX:0.9048,scaleY:0.9048,x:-203.1,y:-178.35},8).to({scaleX:0.9012,scaleY:0.9012,x:-202.25,y:-140.2},8).to({scaleX:0.9,scaleY:0.9,x:-202,y:-127.65},7).wait(1).to({x:-201.95,y:-127.45},0).wait(498));

	// Masked_Layer_5___1
	this.instance_146 = new lib.text6("synched",0);
	this.instance_146.setTransform(-116.5,-190.7,0.5254,0.5254);

	var maskedShapeInstanceList = [this.instance_146];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_146).wait(183).to({startPosition:0},0).to({scaleX:0.9098,scaleY:0.9098,x:-204.1,y:-388.45},19).wait(1).to({scaleX:0.93,scaleY:0.93,x:-208.7,y:-398.85},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,x:-206.25,y:-284.95},8).to({scaleX:0.9108,scaleY:0.9108,x:-204.4,y:-196.35},8).to({scaleX:0.9048,scaleY:0.9048,x:-203.1,y:-133.1},8).to({scaleX:0.9012,scaleY:0.9012,x:-202.25,y:-95.15},8).to({scaleX:0.9,scaleY:0.9,x:-202,y:-82.65},7).wait(1).to({x:-201.95,y:-82.45},0).wait(498));

	// Masked_Layer_4___1
	this.instance_147 = new lib.text5("synched",0);
	this.instance_147.setTransform(-116.5,-164.45,0.5254,0.5254);

	var maskedShapeInstanceList = [this.instance_147];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_147).wait(183).to({startPosition:0},0).to({scaleX:0.9098,scaleY:0.9098,x:-204.1,y:-342.95},19).wait(1).to({scaleX:0.93,scaleY:0.93,x:-208.7,y:-352.35},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,x:-206.25,y:-238.95},8).to({scaleX:0.9108,scaleY:0.9108,x:-204.4,y:-150.85},8).to({scaleX:0.9048,scaleY:0.9048,x:-203.1,y:-87.85},8).to({scaleX:0.9012,scaleY:0.9012,x:-202.25,y:-50.1},8).to({scaleX:0.9,scaleY:0.9,x:-202,y:-37.65},7).wait(1).to({x:-201.95,y:-37.45},0).wait(498));

	// Masked_Layer_3___1
	this.instance_148 = new lib.text4("synched",0);
	this.instance_148.setTransform(-116.5,-138.2,0.5254,0.5254);

	var maskedShapeInstanceList = [this.instance_148];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_148).wait(183).to({startPosition:0},0).to({scaleX:0.9098,scaleY:0.9098,x:-204.1,y:-297.45},19).wait(1).to({scaleX:0.93,scaleY:0.93,x:-208.7,y:-305.85},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,x:-206.25,y:-193},8).to({scaleX:0.9108,scaleY:0.9108,x:-204.4,y:-105.3},8).to({scaleX:0.9048,scaleY:0.9048,x:-203.1,y:-42.6},8).to({scaleX:0.9012,scaleY:0.9012,x:-202.25,y:-5.05},8).to({scaleX:0.9,scaleY:0.9,x:-202,y:7.35},7).wait(1).to({x:-201.95,y:7.55},0).wait(498));

	// Masked_Layer_2___1
	this.instance_149 = new lib.shape2("synched",0);
	this.instance_149.setTransform(2,-149,0.5254,0.5254);

	var maskedShapeInstanceList = [this.instance_149];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_149).wait(183).to({startPosition:0},0).to({scaleX:0.9098,scaleY:0.9098,x:1.05,y:-316.2},19).wait(1).to({scaleX:0.93,scaleY:0.93,x:1,y:-325},0).wait(574).to({startPosition:0},0).to({scaleX:0.9192,scaleY:0.9192,y:-211.95},8).to({scaleX:0.9108,scaleY:0.9108,y:-124.05},8).to({scaleX:0.9048,scaleY:0.9048,x:0.95,y:-61.25},8).to({scaleX:0.9012,scaleY:0.9012,y:-23.6},8).to({scaleX:0.9,scaleY:0.9,y:-11.2},7).wait(1).to({x:1,y:-11},0).wait(498));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-695.2,-345.5,937.8000000000001,401);


(lib.sprite189 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_17
	this.instance = new lib.sprite188();
	this.instance.setTransform(7.9,139.9);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_16
	this.instance_1 = new lib.text160("synched",0);
	this.instance_1.setTransform(94.7,-22.15);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_15
	this.instance_2 = new lib.shape159("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	// Layer_13
	this.instance_3 = new lib.sprite153();
	this.instance_3.setTransform(136.55,-50.1,1.6912,1.6912,-50.6526);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

	// Layer_12
	this.instance_4 = new lib.shape158("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

	// Layer_10
	this.instance_5 = new lib.shape157("synched",0);
	this.instance_5.setTransform(183.55,-152.25,0.7628,0.7627);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1));

	// Layer_8
	this.instance_6 = new lib.text155("synched",0);
	this.instance_6.setTransform(-154.4,-40.75);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1));

	// Layer_7
	this.instance_7 = new lib.shape154("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1));

	// Layer_5
	this.instance_8 = new lib.sprite153();
	this.instance_8.setTransform(-27.15,-95.5,1.1407,1.1407,49.8041);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1));

	// Layer_3
	this.instance_9 = new lib.sprite153();
	this.instance_9.setTransform(-100.5,-117.7,1.1431,1.1431,14.9992);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1));

	// Layer_2
	this.instance_10 = new lib.shape151("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite189, new cjs.Rectangle(-227.5,-258.7,469.9,498.2), null);


(lib.sprite195 = function(mode,startPosition,loop,reversed) {
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
	this.frame_789 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(789).call(this.frame_789).wait(1));

	// Masked_Layer_26___19
	this.instance = new lib.text194("synched",0);
	this.instance.setTransform(-498.15,5.3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(790));

	// Masked_Layer_25___19
	this.instance_1 = new lib.shape193("synched",0);
	this.instance_1.setTransform(-112.2,-6.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(790));

	// Masked_Layer_23___19
	this.instance_2 = new lib.text192("synched",0);
	this.instance_2.setTransform(-484.15,138);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(790));

	// Masked_Layer_22___19
	this.instance_3 = new lib.text191("synched",0);
	this.instance_3.setTransform(-484.15,90);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(790));

	// Masked_Layer_21___19
	this.instance_4 = new lib.text190("synched",0);
	this.instance_4.setTransform(-484.15,35.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(790));

	// Masked_Layer_20___19
	this.instance_5 = new lib.shape86("synched",0);
	this.instance_5.setTransform(-137.45,32.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(790));

	// Layer_1
	this.instance_6 = new lib.sprite189();
	this.instance_6.setTransform(195.55,148.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(790));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-502.1,-110.5,940,498.2);


// stage content:
(lib.vital_opsm_ssw = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {p1:0,p2:1315,p3:2009,p4:2799,p5:3474,p6:4844,p7:6384};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,1,1313,1314,1315,1316,2007,2008,2009,2010,2797,2798,2799,2800,3472,3473,3474,3475,4842,4843,4844,4845,6382,6383,6384,6385,7913];
	this.streamSoundSymbolsList[1] = [{id:"vital_opsm_ssw1",startFrame:1,endFrame:1314,loop:1,offset:0}];
	this.streamSoundSymbolsList[1316] = [{id:"vital_opsm_ssw2",startFrame:1316,endFrame:2008,loop:1,offset:0}];
	this.streamSoundSymbolsList[2010] = [{id:"vital_opsm_ssw3",startFrame:2010,endFrame:2798,loop:1,offset:0}];
	this.streamSoundSymbolsList[2800] = [{id:"vital_opsm_ssw4",startFrame:2800,endFrame:3473,loop:1,offset:0}];
	this.streamSoundSymbolsList[3475] = [{id:"vital_opsm_ssw5",startFrame:3475,endFrame:4843,loop:1,offset:0}];
	this.streamSoundSymbolsList[4845] = [{id:"vital_opsm_ssw6",startFrame:4845,endFrame:6383,loop:1,offset:0}];
	this.streamSoundSymbolsList[6385] = [{id:"vital_opsm_ssw7",startFrame:6385,endFrame:7913,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		InitPage(7);
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
		// Back to Topicクリック
		this.back.addEventListener("click", function(){
			GetUrlMain("vitalmenu_ssw");
		});
		
		//-------------------------------------
		// スライダー操作関連
		//-------------------------------------
		// 再生/停止ボタンクリック
		this.playpau.addEventListener("click", ClickPlayPau);
		// リプレイボタンクリック
		this.replay.addEventListener("click", ClickReplay);
	}
	this.frame_1 = function() {
		var soundInstance = playSound("vital_opsm_ssw1",0);
		this.InsertIntoSoundStreamData(soundInstance,1,1314,1);
	}
	this.frame_1313 = function() {
		this.stop();
	}
	this.frame_1314 = function() {
		this.stop();
	}
	this.frame_1315 = function() {
		Prev(1);
		InitAnim();
	}
	this.frame_1316 = function() {
		var soundInstance = playSound("vital_opsm_ssw2",0);
		this.InsertIntoSoundStreamData(soundInstance,1316,2008,1);
	}
	this.frame_2007 = function() {
		this.stop();
	}
	this.frame_2008 = function() {
		this.stop();
	}
	this.frame_2009 = function() {
		InitAnim();
	}
	this.frame_2010 = function() {
		var soundInstance = playSound("vital_opsm_ssw3",0);
		this.InsertIntoSoundStreamData(soundInstance,2010,2798,1);
	}
	this.frame_2797 = function() {
		this.stop();
	}
	this.frame_2798 = function() {
		this.stop();
	}
	this.frame_2799 = function() {
		InitAnim();
	}
	this.frame_2800 = function() {
		var soundInstance = playSound("vital_opsm_ssw4",0);
		this.InsertIntoSoundStreamData(soundInstance,2800,3473,1);
	}
	this.frame_3472 = function() {
		this.stop();
	}
	this.frame_3473 = function() {
		this.stop();
	}
	this.frame_3474 = function() {
		InitAnim();
	}
	this.frame_3475 = function() {
		var soundInstance = playSound("vital_opsm_ssw5",0);
		this.InsertIntoSoundStreamData(soundInstance,3475,4843,1);
	}
	this.frame_4842 = function() {
		this.stop();
	}
	this.frame_4843 = function() {
		this.stop();
	}
	this.frame_4844 = function() {
		Next(1);
		InitAnim();
	}
	this.frame_4845 = function() {
		var soundInstance = playSound("vital_opsm_ssw6",0);
		this.InsertIntoSoundStreamData(soundInstance,4845,6383,1);
	}
	this.frame_6382 = function() {
		this.stop();
	}
	this.frame_6383 = function() {
		this.stop();
	}
	this.frame_6384 = function() {
		Next(0);
		InitAnim();
	}
	this.frame_6385 = function() {
		var soundInstance = playSound("vital_opsm_ssw7",0);
		this.InsertIntoSoundStreamData(soundInstance,6385,7913,1);
	}
	this.frame_7913 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1312).call(this.frame_1313).wait(1).call(this.frame_1314).wait(1).call(this.frame_1315).wait(1).call(this.frame_1316).wait(691).call(this.frame_2007).wait(1).call(this.frame_2008).wait(1).call(this.frame_2009).wait(1).call(this.frame_2010).wait(787).call(this.frame_2797).wait(1).call(this.frame_2798).wait(1).call(this.frame_2799).wait(1).call(this.frame_2800).wait(672).call(this.frame_3472).wait(1).call(this.frame_3473).wait(1).call(this.frame_3474).wait(1).call(this.frame_3475).wait(1367).call(this.frame_4842).wait(1).call(this.frame_4843).wait(1).call(this.frame_4844).wait(1).call(this.frame_4845).wait(1537).call(this.frame_6382).wait(1).call(this.frame_6383).wait(1).call(this.frame_6384).wait(1).call(this.frame_6385).wait(1528).call(this.frame_7913).wait(1));

	// Layer_134
	this.instance = new lib.text108("synched",0);
	this.instance.setTransform(10,0,1.5125,1.5125);

	this.instance_1 = new lib.text262("synched",0);
	this.instance_1.setTransform(10,0,1.5125,1.5125);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},4844).wait(3070));

	// Layer_back
	this.back = new lib.buttonbak();
	this.back.name = "back";
	this.back.setTransform(350,645,1.0001,1.0002);
	new cjs.ButtonHelper(this.back, 0, 1, 2, false, new lib.buttonbak(), 3);

	this.timeline.addTween(cjs.Tween.get(this.back).wait(7914));

	// Layer_page
	this.page = new cjs.Text("Page number", "italic bold 15px 'Arial'", "#FF9900");
	this.page.name = "page";
	this.page.lineHeight = 17;
	this.page.lineWidth = 193;
	this.page.parent = this;
	this.page.setTransform(23,658,1.4989,1.4989);

	this.timeline.addTween(cjs.Tween.get(this.page).wait(7914));

	// Layer_next
	this.next = new lib.buttonnext();
	this.next.name = "next";
	this.next.setTransform(1496.1,5.1,0.9998,0.9999,0,0,0,0.1,0.1);
	new cjs.ButtonHelper(this.next, 0, 1, 2, false, new lib.buttonnext(), 3);

	this.timeline.addTween(cjs.Tween.get(this.next).wait(7914));

	// Layer_previous
	this.previous = new lib.buttonprev();
	this.previous.name = "previous";
	this.previous.setTransform(1432,5,1.0003,0.9993);
	new cjs.ButtonHelper(this.previous, 0, 1, 2, false, new lib.buttonprev(), 3);

	this.timeline.addTween(cjs.Tween.get(this.previous).wait(7914));

	// Layer_slider
	this.slider = new lib.sprite_slider();
	this.slider.name = "slider";
	this.slider.setTransform(610.1,670.1,0.9937,0.9983,0,0,0,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.slider).wait(7914));

	// Layer_replay
	this.replay = new lib.sprite_replay();
	this.replay.name = "replay";
	this.replay.setTransform(1045.1,650.1,0.9999,0.9999,0,0,0,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.replay).wait(7914));

	// Layer_slider_base
	this.instance_2 = new lib.sprite_sliderbase();
	this.instance_2.setTransform(600,650,1,0.9999);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(7914));

	// Layer_playpau
	this.playpau = new lib.sprite_playpau();
	this.playpau.name = "playpau";
	this.playpau.setTransform(555,650,0.9999,0.9999);

	this.timeline.addTween(cjs.Tween.get(this.playpau).wait(7914));

	// Mask_Layer_1 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("Eh8/AyyMAAAhfTMD5/AAAMAAABfTg");
	mask.setTransform(800,325);

	// Masked_Layer_2___1
	this.ani1 = new lib.sprite104();
	this.ani1.name = "ani1";
	this.ani1.setTransform(1072,565,1.5125,1.5125);

	this.ani2 = new lib.sprite149();
	this.ani2.name = "ani2";
	this.ani2.setTransform(1072,565,1.5125,1.5125);

	this.ani3 = new lib.sprite195();
	this.ani3.name = "ani3";
	this.ani3.setTransform(780,64,1.5125,1.5125);

	this.ani4 = new lib.sprite210();
	this.ani4.name = "ani4";
	this.ani4.setTransform(780,64,1.5125,1.5125);

	this.ani5 = new lib.sprite248();
	this.ani5.name = "ani5";
	this.ani5.setTransform(780,64,1.5125,1.5125);

	this.ani6 = new lib.sprite260();
	this.ani6.name = "ani6";
	this.ani6.setTransform(780,64,1.5125,1.5125);

	this.ani7 = new lib.sprite290();
	this.ani7.name = "ani7";
	this.ani7.setTransform(780,64,1.5125,1.5125);

	var maskedShapeInstanceList = [this.ani1,this.ani2,this.ani3,this.ani4,this.ani5,this.ani6,this.ani7];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.ani1}]}).to({state:[{t:this.ani2}]},1315).to({state:[{t:this.ani3}]},694).to({state:[{t:this.ani4}]},790).to({state:[{t:this.ani5}]},675).to({state:[{t:this.ani6}]},1370).to({state:[{t:this.ani7}]},1540).wait(1530));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(810,350,787,346);
// library properties:
lib.properties = {
	id: '786DCE5F8407AE4380EFB6EA9159D292',
	width: 1600,
	height: 700,
	fps: 25,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/CachedBmp_4.png", id:"CachedBmp_4"},
		{src:"images/vital_opsm_ssw_atlas_1.png", id:"vital_opsm_ssw_atlas_1"},
		{src:"images/vital_opsm_ssw_atlas_2.png", id:"vital_opsm_ssw_atlas_2"},
		{src:"images/vital_opsm_ssw_atlas_3.png", id:"vital_opsm_ssw_atlas_3"},
		{src:"images/vital_opsm_ssw_atlas_4.png", id:"vital_opsm_ssw_atlas_4"},
		{src:"images/vital_opsm_ssw_atlas_5.png", id:"vital_opsm_ssw_atlas_5"},
		{src:"images/vital_opsm_ssw_atlas_6.png", id:"vital_opsm_ssw_atlas_6"},
		{src:"sounds/vital_opsm_ssw1.mp3", id:"vital_opsm_ssw1"},
		{src:"sounds/vital_opsm_ssw2.mp3", id:"vital_opsm_ssw2"},
		{src:"sounds/vital_opsm_ssw3.mp3", id:"vital_opsm_ssw3"},
		{src:"sounds/vital_opsm_ssw4.mp3", id:"vital_opsm_ssw4"},
		{src:"sounds/vital_opsm_ssw5.mp3", id:"vital_opsm_ssw5"},
		{src:"sounds/vital_opsm_ssw6.mp3", id:"vital_opsm_ssw6"},
		{src:"sounds/vital_opsm_ssw7.mp3", id:"vital_opsm_ssw7"}
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