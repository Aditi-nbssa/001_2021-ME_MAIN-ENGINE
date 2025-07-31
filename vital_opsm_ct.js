(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"vital_opsm_ct_atlas_1", frames: [[0,1278,1160,211],[0,1065,1173,211],[0,1491,1112,211],[0,1704,1112,211],[660,213,1215,211],[660,0,1263,211],[660,426,1191,211],[0,852,1175,211],[0,639,1188,211],[0,0,658,518],[1162,1278,327,632]]},
		{name:"vital_opsm_ct_atlas_2", frames: [[0,978,1175,161],[0,1467,1121,161],[0,1304,1133,161],[0,1630,1061,161],[0,815,1188,161],[0,1793,1279,111],[0,1141,1154,161],[0,0,1212,161],[0,489,1197,161],[0,1906,1269,111],[0,163,1206,161],[0,652,1194,161],[0,326,1203,161],[1135,1304,493,370]]},
		{name:"vital_opsm_ct_atlas_3", frames: [[929,527,779,111],[1217,1635,215,92],[0,1462,289,92],[0,765,852,92],[179,1587,226,92],[0,1168,478,92],[435,947,162,115],[0,1262,426,98],[866,1369,367,98],[1537,298,507,98],[1295,1265,398,98],[1340,640,336,115],[0,859,618,86],[135,1681,142,86],[657,1733,52,86],[1287,1365,426,86],[675,1645,163,86],[772,1379,67,86],[0,565,674,123],[1105,1641,104,86],[1695,1265,69,86],[930,1641,173,86],[1985,1125,63,86],[279,1681,124,86],[1191,1729,65,86],[1366,937,584,86],[1476,1541,153,86],[1053,1729,67,86],[676,640,662,123],[0,1556,177,123],[1235,1453,398,86],[1434,1635,198,86],[1122,1729,67,86],[1258,1729,65,86],[1193,402,708,123],[1434,1723,118,86],[1325,1729,65,86],[675,1557,253,86],[1819,754,210,86],[405,1713,112,86],[772,1469,296,86],[1785,1703,124,86],[1985,1213,59,86],[1946,94,71,92],[428,1262,53,92],[1952,937,71,92],[1975,1031,71,92],[984,1729,67,92],[1982,1458,64,92],[840,1645,71,92],[913,1729,69,92],[1946,0,73,92],[1554,1723,71,92],[0,339,1191,111],[0,113,1224,111],[1791,1603,202,98],[1537,192,487,104],[1911,1703,112,92],[521,1654,134,92],[0,1681,133,92],[1715,1358,316,98],[854,765,963,76],[1366,843,636,92],[1295,1171,469,92],[291,1483,245,102],[0,1064,485,102],[0,0,1233,111],[1217,1541,257,92],[866,1171,427,102],[0,947,433,115],[1087,1093,886,76],[384,1389,386,92],[0,1362,382,98],[1537,0,407,190],[0,226,1215,111],[0,452,927,111],[866,1275,419,92],[929,452,113,53],[1044,452,60,60],[0,690,276,53],[1710,527,300,225],[1235,0,300,400],[1634,1638,149,112],[1791,1458,189,143],[1903,398,112,124],[407,1587,112,124],[1070,1469,145,170],[538,1483,135,169],[666,1147,198,230],[1635,1458,154,178],[487,1109,177,278],[1766,1171,217,185],[854,843,231,302],[620,859,211,248],[1087,843,277,248]]}
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



(lib.CachedBmp_102 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_101 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_100 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_99 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_2"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_98 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_97 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_96 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_95 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_94 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_93 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_92 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_91 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_90 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_2"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_89 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_88 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_87 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_2"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_86 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_85 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_84 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_83 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_82 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_81 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_80 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_79 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_78 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_77 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_76 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_75 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_74 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_73 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_72 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_71 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_70 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_69 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_68 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_67 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_66 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_65 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_64 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_63 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(30);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_62 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(31);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_61 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(32);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_60 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(33);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_59 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(34);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_58 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(35);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_57 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(36);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_56 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(37);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_55 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(38);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_54 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(39);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_53 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(40);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_52 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(41);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_51 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(42);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_50 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_49 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(43);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_48 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(44);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_47 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(45);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_46 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(46);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_45 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(47);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_44 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(48);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_43 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(49);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_42 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(50);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_41 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(51);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_40 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(52);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_39 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_2"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_38 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_2"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_37 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(53);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_36 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(54);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_35 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_34 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_2"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_33 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(55);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_32 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(56);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_31 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(57);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_30 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(58);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_29 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(59);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_28 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(60);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_27 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(61);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_26 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(62);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_25 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(63);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_24 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(64);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_23 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(65);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_22 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_2"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_21 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(66);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_20 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_2"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_19 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_2"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_18 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_2"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_17 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_2"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_16 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(67);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_15 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(68);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_14 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(69);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_13 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(70);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_12 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(71);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_11 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(72);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_10 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(73);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_9 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_8 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_7 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(74);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_6 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_5 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(75);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_4 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(76);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_3 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(77);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(78);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(79);
}).prototype = p = new cjs.Sprite();



(lib.image106 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.image107 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(80);
}).prototype = p = new cjs.Sprite();



(lib.image110 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.image16 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(81);
}).prototype = p = new cjs.Sprite();



(lib.image190 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(82);
}).prototype = p = new cjs.Sprite();



(lib.image192 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(83);
}).prototype = p = new cjs.Sprite();



(lib.image195 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(84);
}).prototype = p = new cjs.Sprite();



(lib.image198 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(85);
}).prototype = p = new cjs.Sprite();



(lib.image2 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_2"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.image217 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(86);
}).prototype = p = new cjs.Sprite();



(lib.image218 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(87);
}).prototype = p = new cjs.Sprite();



(lib.image227 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(88);
}).prototype = p = new cjs.Sprite();



(lib.image230 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(89);
}).prototype = p = new cjs.Sprite();



(lib.image71 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(90);
}).prototype = p = new cjs.Sprite();



(lib.image73 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(91);
}).prototype = p = new cjs.Sprite();



(lib.image87 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(92);
}).prototype = p = new cjs.Sprite();



(lib.image91 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(93);
}).prototype = p = new cjs.Sprite();



(lib.image95 = function() {
	this.initialize(ss["vital_opsm_ct_atlas_3"]);
	this.gotoAndStop(94);
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
	this.instance = new lib.CachedBmp_102();
	this.instance.setTransform(-3.95,-3.4,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,421.2,57.699999999999996);


(lib.text246 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(-3.95,-3.4,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,401.79999999999995,57.699999999999996);


(lib.text245 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(-3.95,-3.4,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,415.79999999999995,75.7);


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
	this.instance = new lib.CachedBmp_99();
	this.instance.setTransform(-3.95,-3.4,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,406.09999999999997,57.699999999999996);


(lib.text243 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(-3.95,-3.4,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,420.4,75.7);


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
	this.instance = new lib.CachedBmp_97();
	this.instance.setTransform(-3.95,-3.4,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,279.2,39.8);


(lib.text240 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(-3.95,-3.65,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.6,77,33);


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
	this.instance = new lib.CachedBmp_95();
	this.instance.setTransform(-3.95,-3.65,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.6,103.60000000000001,33);


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
	this.instance = new lib.CachedBmp_94();
	this.instance.setTransform(37.2,-3.65,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(37.2,-3.6,305.40000000000003,33);


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
	this.instance = new lib.CachedBmp_93();
	this.instance.setTransform(-3.95,-3.65,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.6,81,33);


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
	this.instance = new lib.CachedBmp_92();
	this.instance.setTransform(-3.95,-3.65,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.6,171.3,33);


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
	this.instance = new lib.CachedBmp_91();
	this.instance.setTransform(-3.95,-3.75,0.3582,0.3582);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,58,41.2);


(lib.text212 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(-3.95,-3.4,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,380.29999999999995,57.699999999999996);


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
	this.instance = new lib.CachedBmp_89();
	this.instance.setTransform(-3.95,-3.4,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,398.59999999999997,75.7);


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
	this.instance = new lib.CachedBmp_88();
	this.instance.setTransform(-3.95,-3.4,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,398.59999999999997,75.7);


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
	this.instance = new lib.CachedBmp_87();
	this.instance.setTransform(-3.95,-3.4,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,425.79999999999995,57.699999999999996);


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
	this.instance = new lib.CachedBmp_86();
	this.instance.setTransform(59.95,-3.65,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(60,-3.6,152.7,35.1);


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
	this.instance = new lib.CachedBmp_85();
	this.instance.setTransform(30.35,-3.65,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(30.4,-3.6,131.5,35.1);


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
	this.instance = new lib.CachedBmp_84();
	this.instance.setTransform(12,-4.65,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(12,-4.6,181.8,35.1);


(lib.text202 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(59.95,-4.65,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(60,-4.6,142.6,35.1);


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
	this.instance = new lib.CachedBmp_82();
	this.instance.setTransform(-3.95,-3.75,0.3582,0.3582);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,120.30000000000001,41.2);


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
	this.instance = new lib.CachedBmp_81();
	this.instance.setTransform(-3.95,-3.75,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,221.5,30.8);


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
	this.instance = new lib.CachedBmp_80();
	this.instance.setTransform(-3.95,-3.75,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,50.9,30.8);


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
	this.instance = new lib.CachedBmp_79();
	this.instance.setTransform(-2.95,-3.75,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2.9,-3.7,18.599999999999998,30.8);


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
	this.instance = new lib.CachedBmp_78();
	this.instance.setTransform(-3.95,-3.75,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,152.70000000000002,30.8);


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
	this.instance = new lib.CachedBmp_77();
	this.instance.setTransform(-3.95,-3.75,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,58.4,30.8);


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
	this.instance = new lib.CachedBmp_76();
	this.instance.setTransform(-3.95,-3.75,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,24,30.8);


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
	this.instance = new lib.CachedBmp_75();
	this.instance.setTransform(-3.95,-3.75,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,241.6,44.1);


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
	this.instance = new lib.CachedBmp_74();
	this.instance.setTransform(-3.95,-3.75,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,37.3,30.8);


(lib.text179 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(-3.95,-3.75,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,24.7,30.8);


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
	this.instance = new lib.CachedBmp_72();
	this.instance.setTransform(-3.95,-3.75,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,62,30.8);


(lib.text177 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(-3.95,-3.75,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,22.599999999999998,30.8);


(lib.text176 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(-3.95,-3.75,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,44.4,30.8);


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
	this.instance = new lib.CachedBmp_69();
	this.instance.setTransform(-3.95,-3.75,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,23.299999999999997,30.8);


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
	this.instance = new lib.CachedBmp_68();
	this.instance.setTransform(-3.95,-3.75,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,209.3,30.8);


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
	this.instance = new lib.CachedBmp_67();
	this.instance.setTransform(-3.95,-3.75,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,54.8,30.8);


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
	this.instance = new lib.CachedBmp_66();
	this.instance.setTransform(-3.95,-3.75,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,24,30.8);


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
	this.instance = new lib.CachedBmp_65();
	this.instance.setTransform(-3.95,-3.75,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,237.3,44.1);


(lib.text170 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(-3.95,-3.75,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,63.4,44.1);


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
	this.instance = new lib.CachedBmp_63();
	this.instance.setTransform(-3.95,-3.75,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,142.6,30.8);


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
	this.instance = new lib.CachedBmp_62();
	this.instance.setTransform(-3.95,-3.75,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,70.9,30.8);


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
	this.instance = new lib.CachedBmp_61();
	this.instance.setTransform(-3.95,-3.75,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,24,30.8);


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
	this.instance = new lib.CachedBmp_60();
	this.instance.setTransform(-3.95,-3.75,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,23.299999999999997,30.8);


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
	this.instance = new lib.CachedBmp_59();
	this.instance.setTransform(-3.95,-3.75,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,253.8,44.1);


(lib.text164 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(-3.95,-3.75,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,42.3,30.8);


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
	this.instance = new lib.CachedBmp_57();
	this.instance.setTransform(-3.95,-3.75,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,23.299999999999997,30.8);


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
	this.instance = new lib.CachedBmp_56();
	this.instance.setTransform(-3.95,-3.75,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,90.7,30.8);


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
	this.instance = new lib.CachedBmp_55();
	this.instance.setTransform(-3.95,-3.75,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,75.30000000000001,30.8);


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
	this.instance = new lib.CachedBmp_54();
	this.instance.setTransform(-3.95,-3.75,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,40.1,30.8);


(lib.text159 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(-3.95,-3.75,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,106.10000000000001,30.8);


(lib.text158 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(-3.95,-3.75,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,44.4,30.8);


(lib.text157 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(-3.95,-3.75,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,21.099999999999998,30.8);


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
	this.instance = new lib.CachedBmp_50();
	this.instance.setTransform(-3.95,-3.4,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,435.5,75.7);


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
	this.instance = new lib.CachedBmp_49();
	this.instance.setTransform(37.2,-3.65,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(37.2,-3.6,25.5,33);


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
	this.instance = new lib.CachedBmp_48();
	this.instance.setTransform(37.2,-3.65,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(37.2,-3.6,19,33);


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
	this.instance = new lib.CachedBmp_47();
	this.instance.setTransform(37.2,-3.65,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(37.2,-3.6,25.5,33);


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
	this.instance = new lib.CachedBmp_46();
	this.instance.setTransform(37.2,-3.65,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(37.2,-3.6,25.5,33);


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
	this.instance = new lib.CachedBmp_45();
	this.instance.setTransform(37.2,-3.65,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(37.2,-3.6,24,33);


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
	this.instance = new lib.CachedBmp_44();
	this.instance.setTransform(37.2,-3.65,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(37.2,-3.6,23,33);


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
	this.instance = new lib.CachedBmp_43();
	this.instance.setTransform(37.2,-3.65,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(37.2,-3.6,25.5,33);


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
	this.instance = new lib.CachedBmp_42();
	this.instance.setTransform(37.2,-3.65,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(37.2,-3.6,24.799999999999997,33);


(lib.text146 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(37.2,-3.65,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(37.2,-3.6,26.199999999999996,33);


(lib.text138 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(37.2,-3.65,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(37.2,-3.6,25.5,33);


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
	this.instance = new lib.CachedBmp_39();
	this.instance.setTransform(-3.95,-3.4,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,458.4,39.8);


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
	this.instance = new lib.CachedBmp_38();
	this.instance.setTransform(-3.95,-3.4,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,413.59999999999997,57.699999999999996);


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
	this.instance = new lib.CachedBmp_37();
	this.instance.setTransform(-3.95,-3.4,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,426.9,39.8);


(lib.text128 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(-3.95,-3.4,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,438.7,39.8);


(lib.text127 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(-3.95,-3.4,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,452.7,75.7);


(lib.text126 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(-3.95,-3.4,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,434.4,57.699999999999996);


(lib.text125 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(-3.95,-3.6,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.6,72.4,35.2);


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
	this.instance = new lib.CachedBmp_32();
	this.instance.setTransform(3,-3.6,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(3,-3.6,174.6,37.300000000000004);


(lib.text122 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(-3.95,-3.65,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.6,40.1,33);


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
	this.instance = new lib.CachedBmp_30();
	this.instance.setTransform(-3.95,-3.65,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.6,48,33);


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
	this.instance = new lib.CachedBmp_29();
	this.instance.setTransform(-3.95,-3.65,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.6,47.699999999999996,33);


(lib.text109 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(-3.95,-3.6,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.6,113.2,35.2);


(lib.text104 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(0,0,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,345.2,27.3);


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
	this.instance = new lib.CachedBmp_26();
	this.instance.setTransform(-3.95,-3.65,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.6,228,33);


(lib.text97 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(-3.95,-3.65,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.6,168.1,33);


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
	this.instance = new lib.CachedBmp_24();
	this.instance.setTransform(-3.95,-3.9,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.9,87.80000000000001,36.6);


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
	this.instance = new lib.CachedBmp_23();
	this.instance.setTransform(-3.95,-3.9,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.9,173.8,36.6);


(lib.text86 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(-3.95,-3.4,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,429.09999999999997,57.699999999999996);


(lib.text84 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(-3.95,-3.4,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,442,39.8);


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
	this.instance = new lib.CachedBmp_20();
	this.instance.setTransform(-3.95,-3.4,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,454.9,39.8);


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
	this.instance = new lib.CachedBmp_19();
	this.instance.setTransform(-3.95,-3.4,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,432.29999999999995,57.699999999999996);


(lib.text81 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(-3.95,-3.4,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,428,57.699999999999996);


(lib.text80 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(-3.95,-3.4,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,431.2,57.699999999999996);


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
	this.instance = new lib.CachedBmp_16();
	this.instance.setTransform(-3.95,-3.65,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.6,92.10000000000001,33);


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
	this.instance = new lib.CachedBmp_15();
	this.instance.setTransform(-3.95,-3.9,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.9,153,36.6);


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
	this.instance = new lib.CachedBmp_14();
	this.instance.setTransform(-3.95,-3.75,0.3582,0.3582);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,155.1,41.2);


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
	this.instance = new lib.CachedBmp_13();
	this.instance.setTransform(0,0,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,317.6,27.3);


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
	this.instance = new lib.CachedBmp_12();
	this.instance.setTransform(-3.95,-3.7,0.3583,0.3583);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,138.3,33);


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
	this.instance = new lib.CachedBmp_11();
	this.instance.setTransform(-3.95,-3.7,0.3583,0.3583);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,136.9,35.1);


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
	this.instance = new lib.CachedBmp_10();
	this.instance.setTransform(-3.95,-3.65,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.6,145.9,68.1);


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
	this.instance = new lib.CachedBmp_9();
	this.instance.setTransform(-3.95,-3.4,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,426.9,75.7);


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
	this.instance = new lib.CachedBmp_8();
	this.instance.setTransform(-3.95,-3.4,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,421.2,75.7);


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
	this.instance = new lib.CachedBmp_7();
	this.instance.setTransform(-3.95,-3.4,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,435.5,39.8);


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
	this.instance = new lib.CachedBmp_6();
	this.instance.setTransform(-3.95,-3.4,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,425.79999999999995,75.7);


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
	this.instance = new lib.CachedBmp_5();
	this.instance.setTransform(-3.95,-3.4,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,332.29999999999995,39.8);


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
	this.instance = new lib.CachedBmp_4();
	this.instance.setTransform(-3.95,-3.65,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.6,150.20000000000002,33);


(lib.shape247 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#000000").s().p("AgRARQgHgGAAgLQAAgKAHgHQAHgHAKAAQAKAAAIAHQAHAHAAAKQAAALgHAGQgIAIgKAAQgKAAgHgIg");
	this.shape.setTransform(-578.5,105.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgJAHgIQAHgHAKAAQAKAAAIAHQAHAIAAAJQAAAKgHAIQgIAHgKAAQgKAAgHgHg");
	this.shape_1.setTransform(-578.5,58.35);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-581,55.9,5,51.699999999999996);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AlHhZIKPAAIAACzIqPAAg");
	this.shape.setTransform(-159.3,-96.05);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AlHBaIAAizIKPAAIAACzg");
	this.shape_1.setTransform(-159.3,-96.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-193.1,-106,67.6,20);


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

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AG7hZIAACzIt1AAIAAizg");
	this.shape.setTransform(117.3,-96.05);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("Am6BaIAAizIN1AAIAACzg");
	this.shape_1.setTransform(117.3,-96.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(72,-106,90.6,20);


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
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("A0nAAMApPAAA");
	this.shape.setTransform(15.6,-129.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("A1UBnIAAjNMAqpAAAIAAC6IldAAIAAATgAUlBJMgpOAAAg");
	this.shape_1.setTransform(15.85,-136.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-120.6,-146.8,273,20.60000000000001);


(lib.shape234 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#FF0000").ss(2,0,0,3).p("ACSCcIkjk3");
	this.shape.setTransform(37.35,-112.525);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(21.8,-129.1,31.2,33.19999999999999);


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

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(2,0,0,3).p("AiNCXIEbkt");
	this.shape.setTransform(-41.7,-112.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FF6600").ss(3,1,0,3).p("AMektQgRAXgPAfAK/DcIAJA8ALHhLQgFAegEAeAK6AtIgBA4QAAAfABAcALmi/IgSA5APmlBQgWgZgYgMAQhjeIgag0ARQD4IAHg8ARWAIIgHg6ARaCCIAAg+AREhtIgPg6AN/lwQgeADgaAUAOvI0QAagKAXgYAQEHiIAZgxIAEgKAL8G/QAOAdAPAWANAIeQAZAWAdAFALVFTIARA4AQ2FuIAPg6AscoxQgcAGgcANAuHoAIgtAoAwck+IgWA4AvbmrIglA4AxZgSIACA7AxQBkIAKA8Aw1DaIAVA4AxXhVIgCA7AxEjMIgMA7Al5jZQgJgdgKgcAmklKQgNgbgQgaAnimwQgTgYgUgUAo2oCQgZgSgbgMAqioyIg7gGIgEAAAmRD9QAKgcAJgcAlvCKIAJg8AlhATIAAg8AllhkIgIg8ArvITIASAAIAlgCAp+IDQAdgKAagRAoXHEQAVgTAVgYAu/GnQAVAXAWASAtjHyQAcAOAcAIAnJFnQAQgZAOgaAwEFIIAfAx");
	this.shape_1.setTransform(-3.3,-33.9);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-116.1,-128.1,225.7,152.6);


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

	// Layer_1
	this.shape = new cjs.Shape();
	var sprImg_shape = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_ct_atlas_3"],89);
	sprImg_shape.onload = function(){
		this.shape.graphics.bf(sprImg_shape, null, new cjs.Matrix2D(1.364,0,0,1.364,-103.1,-119.5)).s().p("AvsSrMAAAglVIfZAAMAAAAlVg")
	}.bind(this);
	this.shape.setTransform(-1.85,-1.9);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-102.3,-121.4,201,239);


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

	// Layer_1
	this.shape = new cjs.Shape();
	var sprImg_shape = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_ct_atlas_3"],88);
	sprImg_shape.onload = function(){
		this.shape.graphics.bf(sprImg_shape, null, new cjs.Matrix2D(1.07,0,0,1.07,-102,-119.9)).s().p("Av7SvMAAAgldIf3AAMAAAAldg")
	}.bind(this);
	this.shape.setTransform(-3.975,-3.2);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-105.9,-123.1,203.9,239.8);


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

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("ADzhZIAACzInlAAIAAizg");
	this.shape.setTransform(126.6,-99.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AjyBaIAAizIHlAAIAACzg");
	this.shape_1.setTransform(126.6,-99.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(101.3,-109.8,50.60000000000001,20);


(lib.shape224 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#FF0000").ss(3,0,0,3).p("ADFAAImJAA");
	this.shape.setTransform(99.775,-100);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(78.6,-101.5,42.400000000000006,3);


(lib.shape222 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AFXBaIqtAAIAAizIKtAAg");
	this.shape.setTransform(-113.9,24.65);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AlWBaIAAizIKtAAIAACzg");
	this.shape_1.setTransform(-113.9,24.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-149.2,14.7,70.6,20.000000000000004);


(lib.shape221 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#FF0000").ss(3,0,0,3).p("AAAFbIAAq1");
	this.shape.setTransform(-113.45,-18.875);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-114.9,-55.1,3,72.5);


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

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AL0BaI3nAAIAAizIXnAAg");
	this.shape.setTransform(14.45,52.925);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("ArzBaIAAizIXnAAIAACzg");
	this.shape_1.setTransform(14.45,52.925);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	var sprImg_shape_2 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_ct_atlas_3"],86);
	sprImg_shape_2.onload = function(){
		this.shape_2.graphics.bf(sprImg_shape_2, null, new cjs.Matrix2D(1.059,0,0,1.059,-76.7,-90)).s().p("Ar/OEIAA8HIX/AAIAAcHg")
	}.bind(this);
	this.shape_2.setTransform(94.85,-47.1);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_1
	this.shape_3 = new cjs.Shape();
	var sprImg_shape_3 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_ct_atlas_3"],87);
	sprImg_shape_3.onload = function(){
		this.shape_3.graphics.bf(sprImg_shape_3, null, new cjs.Matrix2D(1.065,0,0,1.065,-71.9,-90)).s().p("ArOOEIAA8HIWdAAIAAcHg")
	}.bind(this);
	this.shape_3.setTransform(-81.3,-47.1);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-153.2,-137.1,324.79999999999995,200);


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

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgRARQgHgHAAgKQAAgKAHgHQAHgHAKAAQAKAAAHAHQAIAHAAAKQAAAKgIAHQgHAIgKAAQgKAAgHgIg");
	this.shape.setTransform(-551.65,23.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgRARQgHgGAAgLQAAgJAHgIQAHgHAKAAQAKAAAHAHQAIAIAAAJQAAALgIAGQgHAIgKAAQgKAAgHgIg");
	this.shape_1.setTransform(-551.65,-44.1);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-554.1,-46.6,5,72.2);


(lib.shape207 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AMMizI4XAAIAAFnIYXAAg");
	this.shape.setTransform(115.45,156.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AsKC0IAAlnIYWAAIAAFng");
	this.shape_1.setTransform(115.45,156.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(36.5,137.9,157.9,38);


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

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AKbizI00AAIAAFnIU0AAg");
	this.shape.setTransform(-120.55,156.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AqaC0IAAlnIU0AAIAAFng");
	this.shape_1.setTransform(-120.55,156.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-188.2,137.9,135.29999999999998,38);


(lib.shape203 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#000000").ss(2,2,2).p("AurizIdYAAIAAFnI9YAAg");
	this.shape.setTransform(122.15,-58.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AusC0IAAlnIdYAAIAAFng");
	this.shape_1.setTransform(122.15,-58.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(27.1,-77.8,190.1,38);


(lib.shape201 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(2,2,2).p("ArVizIWrAAIAAFnI2rAAg");
	this.shape.setTransform(-106.575,-58.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("ArVC0IAAlnIWrAAIAAFng");
	this.shape_1.setTransform(-106.575,-58.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#FF6600").ss(3,1,0,3).p("AVF18QgagPgcgHAPxw4QAAAfADAdAP/vAQAIAeALAbARl1hQgVATgUAaAQe0CQgNAagKAdAP4yQQgFAegBAfAXRvQQAHgdACgfAXcxGIgFg8AXKy8QgIgdgMgaAWZ0nIgFgIQgQgXgRgRATQ2UQgeADgcAOATvraQAfgBAcgLAVdsFQAWgSAVgZAR9r7QAaASAdAIAQutRIAjAuAWntgQAPgaALgcAUcGFQgbgPgegDAVsImQgCgggGgbAVOG1QgRgagZgRASnF4QgbAHgeAOAQ4GtQgZARgXAVAPdH9IgnAuANZLDQgNAcgKAbAMwM0QgHAdgEAdARnQqIAvgnAOUJcIggAzAS/PXIAmgwAU8MOIAVg4AVgKdQAHgeADgdAUGN1IAdgyAOIRrQAcAKAggCAP+RlQAagJAbgQAMhOqQgBAgAEAbAM1QeQANAdAWATA0cy7IgTA4A05xGIgCAqQAAAfAEAdAzZ0fIgmAvAtFvLQAGgdABgfAs/xDQgCgfgHgcAtby3QgLgbgRgZAub0aQgVgXgYgQAv91aQgcgJgegBAxz1dQgdAIgaAQAyertQAbAOAdAGAwsrVQAfgDAcgKAu8sAQAXgSAWgaAz2s8IAnAtA0rumQAJAeANAaAtutbQAPgaAKgcA0xRrQgGgcgLgYIgCgDA1lQFQgNgKgPAAQgPAAgNAJA3AQ0IgBADQgMAbgGAgA1CVYQAMgaAGgfA2cWNQANAIAOAAQAQAAAOgLA3RUmQAGAbAKAYIACAFA3bSuIABA8A0oTjIAAg9");
	this.shape_2.setTransform(0.85,-9.025);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-180.1,-153.4,332.4,288.8);


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
	var sprImg_shape = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_ct_atlas_3"],85);
	sprImg_shape.onload = function(){
		this.shape.graphics.bf(sprImg_shape, null, new cjs.Matrix2D(1,0,0,1,-56.2,-61.6)).s().p("AogI/IAAx9IRBAAIAAR9g")
	}.bind(this);
	this.shape.setTransform(0.175,-0.35);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-54.3,-57.8,109,115);


(lib.shape196 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	var sprImg_shape = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_ct_atlas_3"],84);
	sprImg_shape.onload = function(){
		this.shape.graphics.bf(sprImg_shape, null, new cjs.Matrix2D(1,0,0,1,-54.9,-61.9)).s().p("AoOJQIAAyfIQeAAIAASfg")
	}.bind(this);
	this.shape.setTransform(-1.1,-0.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-53.8,-59.3,105.5,118.5);


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

	// Layer_1
	this.shape = new cjs.Shape();
	var sprImg_shape = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_ct_atlas_3"],83);
	sprImg_shape.onload = function(){
		this.shape.graphics.bf(sprImg_shape, null, new cjs.Matrix2D(1,0,0,1,-92.2,-66.6)).s().p("AuaKaIAA0zIc1AAIAAUzg")
	}.bind(this);
	this.shape.setTransform(-2.25,-4.925);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-94.5,-71.5,184.5,133.2);


(lib.shape191 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	var sprImg_shape = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_ct_atlas_3"],82);
	sprImg_shape.onload = function(){
		this.shape.graphics.bf(sprImg_shape, null, new cjs.Matrix2D(1.3,0,0,1.3,-94.6,-70.4)).s().p("AuxLAIAA1/IdjAAIAAV/g")
	}.bind(this);
	this.shape.setTransform(122.175,-132.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(27.6,-202.9,189.20000000000002,140.8);


(lib.shape156 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("AzwgfIAAA/Ao+gfIAAA/AYxgfIAAA/A4wAgIAAg/");
	this.shape.setTransform(-141.9319,366.725,1.2618,1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1,0,0,3).p("AYxyKIAAFUIAADmIAAFoIAADmIAADlIAADmIAAFKIAADwIAADTIAACWAo+2rMAhvAAAIAAEhAzws2IAAlUIKyAAIAAkhAzws2IAADmIKyAAIAAjmIAAlUMAhvAAAAo+s2IqyAAAzw2rIAAEhIlAAAIAAkhIFAAAIKyAAAo+gCIAADlIqyAAIAAjlIKyAAIAAjmMAhvAAAAo+HJIAAjmMAhvAAAAzwjoIAADmIlAAAIAAjmIAAloIAAjmIAAlUAzwHJIAAjmIlAAAIAAjlAzwQDIAAjwIKyAAIAAlKIqyAAIAAFKIlAAAIAAlKIAAjmAzwTWIAACWAzwTWIAAjTIKyAAIAAjwMAhvAAAAo+TWIAACWAo+QDIAADTIqyAAAzwjoIKyAAIAAloMAhvAAAAYxWsMghvAAAIqyAAIlAAAAYxs2MghvAAAAYxHJMghvAAAAYxQDMghvAAAAYxTWMghvAAAAYxgCMghvAAAAzwpQIAAFoA4wQDIAAjwA4wVsIAAiWIAAjTIFAAAA4wTWIFAAAA4wHJIFAAAA4wpQIFAAAA4wjoIFAAAA4ws2IFAAA");
	this.shape_1.setTransform(-141.9319,224.75,1.2618,1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-342.9,78.6,402,292.4);


(lib.shape145 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#FF0000").ss(2,0,0,3).p("AgDjpIAHHU");
	this.shape.setTransform(435.825,217.2);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(434.4,192.8,2.900000000000034,48.89999999999998);


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
	this.shape.graphics.f().s("#FF0000").ss(2,0,0,3).p("Ah4jIIDxGR");
	this.shape.setTransform(411,278.4);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(397.9,257.3,26.200000000000045,42.19999999999999);


(lib.shape143 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#FF0000").ss(2,0,0,3).p("ACfihIk8FD");
	this.shape.setTransform(345.4,233.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(328.6,215.8,33.69999999999999,34.5);


(lib.shape142 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#FF0000").ss(2,0,0,3).p("ACtk3IlZJv");
	this.shape.setTransform(344.325,260.775);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(326.1,228.6,36.5,64.4);


(lib.shape141 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#FF0000").ss(2,0,0,3).p("ACnpfIlNS/");
	this.shape.setTransform(209.125,271.175);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(191.5,209.4,35.30000000000001,123.6);


(lib.shape140 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#FF0000").ss(2,0,0,3).p("AisoxIFZRj");
	this.shape.setTransform(153.95,276.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(135.7,218.8,36.5,114.5);


(lib.shape139 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#FF0000").ss(2,0,0,3).p("AEECRIoHkh");
	this.shape.setTransform(150.575,91.175);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(123.6,75.7,54,31);


(lib.shape137 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AhMhOICZAAIAACdIiZAAg");
	this.shape.setTransform(428.325,311.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AhMBPIAAidICZAAIAACdg");
	this.shape_1.setTransform(428.325,311.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(419.6,303,17.5,17.899999999999977);


(lib.shape136 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#FF0000").ss(2,0,0,3).p("AhYFjICyrF");
	this.shape.setTransform(392.9,61.7);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(383,25.2,19.899999999999977,73);


(lib.shape134 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_69
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("AAIgLQADAFAAAGQAAAHgDAFQgDAFgFAAQgDAAgDgFIgDgMIADgLQADgEADAAg");
	this.shape.setTransform(-22.858,-33.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgGAMIgEgMIAEgLQADgFADABIAHAEQAEAFAAAGQAAAHgEAFQgDAEgEAAQgDAAgDgEg");
	this.shape_1.setTransform(-22.85,-33.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_68
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(1,0,0,3).p("AAIgLQADAFAAAGQAAAHgDAFQgDAFgFAAQgDAAgDgFIgDgMIADgLQADgEADAAg");
	this.shape_2.setTransform(-16.858,-27.2);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgHAMIgDgMIADgLQADgFAEAAIAHAFQADAFAAAGQAAAHgDAFQgDAEgEAAQgEAAgDgEg");
	this.shape_3.setTransform(-16.85,-27.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	// Layer_67
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#000000").ss(1,0,0,3).p("AAIgLQADAFAAAGQAAAHgDAFQgDAFgFAAQgDAAgDgFIgDgMIADgLIAGgEQAFAAADAEg");
	this.shape_4.setTransform(-11.858,-18.2);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgHAMIgCgMIACgLIAHgFQAEAAAEAFQACAFAAAGQAAAHgCAFQgEAEgEAAQgEAAgDgEg");
	this.shape_5.setTransform(-11.85,-18.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4}]}).wait(1));

	// Layer_66
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#000000").ss(1,0,0,3).p("AAIgLQADAFAAAGQAAAHgDAEQgDAFgFAAQgDAAgDgFIgDgLIADgLQADgFADAAQAFAAADAFg");
	this.shape_6.setTransform(-9.858,-8.2);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgHAMIgCgMIACgLQADgFAEABQAFgBADAFQACAFAAAGQAAAHgCAFQgDAEgFAAQgEAAgDgEg");
	this.shape_7.setTransform(-9.85,-8.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6}]}).wait(1));

	// Layer_65
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#000000").ss(1,0,0,3).p("AAIgMQADAFAAAHQAAAGgDAFIgIAFIgGgFIgDgLIADgMQADgEADAAQAFAAADAEg");
	this.shape_8.setTransform(-9.558,1.8505);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgGAMIgEgMIAEgLQADgFADABQAEgBADAFQADAFABAGQgBAHgDAFIgHAEg");
	this.shape_9.setTransform(-9.55,1.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8}]}).wait(1));

	// Layer_64
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#000000").ss(1,0,0,3).p("Ag6jWICBgcQAXALAXALIAABaQBqBfgiCjIAzAwIimAcIAAAZIAbASIiQAcIAAADIgbgSIgPANIACggIgYgTAj0j6IBigPIAvgOIApAYIAAAnIAAACQCuCEgqEeAg6jYIAAACIAAAAAj1iDIAAh3IABAAQDrBvgiGe");
	this.shape_10.setTransform(-1.8424,-15.0074);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#000000").ss(1,0,0,3).p("ABBCzQAclBilgg");
	this.shape_11.setTransform(-19.0953,-10.7738);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#808080").s().p("AhDEFIgPANIACggIgYgTQAclBimggIAAh3IABAAIBigPIAvgOIApAYIAAAnIAAACIAAAAQCMBrAADNQAAAygIA4IAAAZIAbATIiQAcQAFg1AAgwQgBlIjNhhQDNBhABFIQAAAwgFA1IAAACgABNDNIAAAAgABVBjQAAjNiMhrICBgcIAuAWIAABaQBqBfgiCjIAzAxIimAbQAIg4AAgyg");
	this.shape_12.setTransform(-2.125,-15.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_12},{t:this.shape_11},{t:this.shape_10}]}).wait(1));

	// Layer_63
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("#000000").ss(1,0,0,3).p("AAJAJQgEAEgFAAIgHgEIgEgJQAAgFAEgDQADgEAEAAQAFAAAEAEQADADAAAFQAAAFgDAEg");
	this.shape_13.setTransform(-77.45,15.2306);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgIAJIgDgJQAAgFADgDQAEgEAEAAQAFAAAEAEQADADAAAFQAAAFgDAEQgEAEgFAAg");
	this.shape_14.setTransform(-77.45,15.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_14},{t:this.shape_13}]}).wait(1));

	// Layer_62
	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("#000000").ss(1,0,0,3).p("AAJAJQgEAEgFAAIgHgEQgEgEAAgFIAEgIQADgEAEAAQAFAAAEAEQADADAAAFQAAAFgDAEg");
	this.shape_15.setTransform(-77.95,8.2306);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgIAJQgDgEAAgFIADgIQAEgEAEAAQAFAAADAEQAEADAAAFQAAAFgEAEQgDAEgFAAg");
	this.shape_16.setTransform(-77.95,8.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_16},{t:this.shape_15}]}).wait(1));

	// Layer_61
	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f().s("#000000").ss(1,0,0,3).p("AAIAJQgDAEgFAAIgIgEIgDgJQAAgFADgDQAEgEAEAAQAFAAADAEQAEADAAAFQAAAFgEAEg");
	this.shape_17.setTransform(-79.55,0.2306);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgHAJIgEgJQAAgFAEgDQADgEAEAAQAFAAAEAEQADADAAAFQAAAFgDAEQgEAEgFAAg");
	this.shape_18.setTransform(-79.55,0.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_18},{t:this.shape_17}]}).wait(1));

	// Layer_60
	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f().s("#000000").ss(1,0,0,3).p("AAIAJQgDAEgFAAQgEAAgEgEQgDgEAAgFIADgIQAEgEAEAAQAFAAADAEQAEADAAAFQAAAFgEAEg");
	this.shape_19.setTransform(-81.8,-7.0238);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgHAJQgEgEAAgFIAEgIQADgEAEAAQAFAAAEAEQADADAAAFQAAAFgDAEQgEAEgFAAQgEAAgDgEg");
	this.shape_20.setTransform(-81.8,-7.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_20},{t:this.shape_19}]}).wait(1));

	// Layer_59
	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f().s("#000000").ss(1,0,0,3).p("AAIAJQgDAEgFAAQgEAAgEgEQgDgEAAgFQAAgFADgDQAEgEAEAAQAFAAADAEQAEADAAAFQAAAFgEAEg");
	this.shape_21.setTransform(-85.1,-13.1738);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgIAJQgDgEAAgFQAAgFADgDQAEgEAEAAQAFAAAEAEQADADAAAFQAAAFgDAEQgEAEgFAAQgEAAgEgEg");
	this.shape_22.setTransform(-85.1,-13.175);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_22},{t:this.shape_21}]}).wait(1));

	// Layer_58
	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f().s("#000000").ss(1,0,0,3).p("AAIAJQgDAEgFAAQgEAAgEgEQgDgEAAgFQAAgFADgDQAEgEAEAAQAFAAADAEQAEADAAAFQAAAFgEAEg");
	this.shape_23.setTransform(-90.35,-18.6238);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgHAJQgEgEAAgFQAAgFAEgDQADgEAEAAQAFAAAEAEQADADAAAFQAAAFgDAEQgEAEgFAAQgEAAgDgEg");
	this.shape_24.setTransform(-90.35,-18.625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_24},{t:this.shape_23}]}).wait(1));

	// Layer_57
	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f().s("#000000").ss(1,0,0,3).p("AhIjhIAAgEIAIgJIANATIAVgYIgEgPIBLgIIAAAAQDZB7gJFvIAFAOIh/AXIglAHIgmgUIgFgDIiaAXIgWgLIgcgnQABiWhjhsIAAhRIC0gjIADhFQDQCJgJFdAhMiZQCIB8gIEV");
	this.shape_25.setTransform(-85.6564,-2.251);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f().s("#000000").ss(1,0,0,3).p("AhMjAQCtBOgaE3");
	this.shape_26.setTransform(-103.5516,4.7928);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#808080").s().p("AA1D4IAAgcQABj/iCh2QCCB2gBD/IAAAcIgGgDIiZAWQADgpAAglQAAjziXhDQCXBDAADzQAAAlgDApIgWgLIgdgmQACiWhjhsIAAhRICzgkIAEhFQDHCEAAFFIAAAeIglAGgACAEFIAAAAgACADnQAAlFjHiEIAAgDIAIgJIAMATIAWgYIgEgPIBKgIIABAAQDZB7gKFuIAGAPIh/AXIAAgeg");
	this.shape_27.setTransform(-85.75,-2.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_27},{t:this.shape_26},{t:this.shape_25}]}).wait(1));

	// Layer_56
	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f().s("#000000").ss(1,0,0,3).p("AhAEvIgIgHIgOgSQgSl7iRhyIAAgZIE8g+QC+CqgHF0gAj5jwQCnB5ASGm");
	this.shape_28.setTransform(100.6125,-33.6751);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#808080").s().p("AhAEvQgSmminh5IE8g+QC+CqgHF0Ik6A/IAAAAgAhIEoIgOgSQgSl7iRhyIAAgZQCnB5ASGmgAj5jwIAAAAg");
	this.shape_29.setTransform(100.6125,-33.675);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_29},{t:this.shape_28}]}).wait(1));

	// Layer_55
	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f().s("#000000").ss(1,0,0,3).p("AkCkXIgBAAIAAAfQCuB+ASGkIAdAiIAAAAAgmFMQgCnVjaiOIFCg1QCyC6AZGpg");
	this.shape_30.setTransform(157.9117,-44.3466);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#808080").s().p("AhHEqQgSmkiuh+IAAgfIABAAIFCg0QCyC6AaGpIkxA0QgDnUjaiPQDaCPADHUg");
	this.shape_31.setTransform(158.3,-44.375);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_31},{t:this.shape_30}]}).wait(1));

	// Layer_54
	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f().s("#000000").ss(1,0,0,3).p("AgBAAIADAA");
	this.shape_32.setTransform(93.5,-4.075);

	this.timeline.addTween(cjs.Tween.get(this.shape_32).wait(1));

	// Layer_53
	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f().s("#000000").ss(1,0,0,3).p("AihjcIAHgbQAehuBCgGQA7gFA6BXIAJAPIAJAOIAWAuQAlBUAQBtQAQBsgLBXIgFAdIgGAaIgCAKQgfBvhCAGQhAAFg+hmIgVgn");
	this.shape_33.setTransform(52.3602,-16.2273);

	this.timeline.addTween(cjs.Tween.get(this.shape_33).wait(1));

	// Layer_52
	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f().s("#000000").ss(1,0,0,3).p("Ah2kpIAAgDIBngSIAAA+IgEABIhdAVIABA3IgiAGQgcARgaA7IgaAEIAAiCIgCgBIAJgOQANgUATgQQAegZAcACgAimj5QACgBADADIADAIIgBAJIgEAEIgFgDIgDgIIABgJQABgDADAAgAi6jnQACgBADADIADAIIgBAJIgEAEQgDAAgCgDIgDgIIABgJgAjViiIgCgIIACgIIAFgDIAEADIACAIIgCAIIgEAEgAitibQgKgcgjg3AiSj4IABgJIAEgDQACgBADADIADAIIgBAJIgEAEQgDAAgCgDgAh0jvIgCg6AgzFAIA5gQADLC1IAbAPIADAB");
	this.shape_34.setTransform(-14.7665,-9.9813);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f().s("#000000").ss(1,0,0,3).p("ACdlEIABAAIgBBfIjYAmIh0AVIhGAMIgqAHAgOk9ICCgbIApAUAhnl0IAFAAIAAAAIArgKIAkATIAFAuIABAWICqgdAhil0IAnAOIAAABIAACJIgXgYQgJgHgPAAIgBg6Ahqj7IgCAAIgSADIgDACIgBAAAg7llIAogGAj1ieIAPgiQAPgZAMAAQAFAAAAAIQAAAIgSAgAg7jcIAAAdAjHjpIBFgNQgkAagJAyAgVCcIgDAAIACgBIABABIAQAOIgCAAQgHBqgOAnIgLAYIAAAAQgXAngnAFAg/B2IB0gSIgigfIDYgqIAeAdIAQAQIAAACIACAjIgCAmIgGAgQgGAZgLAVQgUAmgaAIIgNACIgJgBIg5ACQgIAXgNATQgaApgjALIiYAPIgqgCIABh1QgNgMgCgbIBXgPQAEgsAAgwIADAAIAVATAgYCcIgRAKIgBgdIAAAAIAAgBICJgaIAAgZICqgdAgrDNQACgDADAAQACAAACADIACAJIgCAIIgEADIgFgDIgCgIgAhGDaIAAgIIABgBIgBAIIAAABIgCAIQgCAOgHALIgDAEIgDAEQgOAOgRAAQgNAAgIgGIgDgDAg0EIIACgJQACgDACAAQADAAACADIACAJIgCAIQgCADgDAAIgEgDgAhHFDIgEgDIgCgIIACgJQACgDACAAQADAAACADIACAJIgCAIgAh9FSQACgDACAAQADAAACADIACAJIgCAIQgCADgDAAIgEgDIgCgIgAhkFWIgCgIIACgJIAEgDQADAAACADIACAJIgCAIIgFADQgCAAgCgDgABfCDIAAgVACFESIALgpIAEgwIgDgqIAAgBIgDAAIiTAcABfCDIAUgEIABAAIAAgaIClgbAgVCcIB0gZ");
	this.shape_35.setTransform(-5.9911,-4.6389);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#00FE00").s().p("AAiEAIA6gQIgDAFIgDADQgOAPgRAAQgNAAgIgHgAAiEAIgEgDQgMgMgCgbIBXgPIgBAIIgCAJQgCANgGALIg6AQIAAAAgABcDwgAg7jtIAhgGIBFgNQglAagHAxIhHANIAQgiQAPgZAMAAQAFAAAAAIQAAAHgTAhQATghAAgHQAAgIgFAAQgMAAgPAZIgQAiIgpAHQAag7AcgRgAgBi1QAHgxAlgaIABAAIACgCIASgEIADAAQAPABAIAGIAYAZIAAAdIhzAUIAAAAgAArkAIAAAAg");
	this.shape_36.setTransform(-23.35,-3.575);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#808080").s().p("Ah+F9IAAh1IADADQAIAGAOAAQARAAANgOIADgEIAEgEQAGgLACgOIACgIIAAgBIABgIIgBABQAEgsAAgwIADAAIAVATIAAAAIABAdIARgKIADAAIAPAOIgCAAQgHBqgMAnIgMAYIAAAAQgXAngnAFgAhtFSIgCAJIACAIIAEADQADAAACgDIACgIIgCgJQgCgDgDAAQgCAAgCADgAhUFFIgCAJIACAIQACADACAAIAFgDIACgIIgCgJQgCgDgDAAgAg7EvIgCAJIACAIIAFADIAEgDIACgIIgCgJQgCgDgCAAQgDAAgCADgAgiD/IgCAJIACAIIAFADQACAAACgDIACgIIgCgJQgCgDgCAAQgDAAgCADgAgbDNIgBAJIABAIIAFADIAEgDIACgIIgCgJQgCgDgCAAQgCAAgDADgAgXFTIAAAAIAMgYQAMgnAHhqIACAAICVgcIgcgPIACAAIAAgaICkgbIACAjIgCAmIgGAgQgGAZgKAVQgVAmgaAIIgNACIgJgBIg4ACIALgpIADgwIgDgqIAAgBIgCAAIACABIADAqIgDAwIgLApQgJAXgNATQgaApgiALIiZAPQAngFAXgngAkpkUIgBgCIAIgNQANgVATgPQAegaAcADIALAAIAAgEIBmgSIAAA+IgDABIheAVIABA3IghAGQgdARgZA7IgbAFgAj0jRQgLgbgjg3QAjA3ALAbgAkdjoIgCAJIACAIIAFADIAEgDIADgIIgDgJIgEgDgAkCkdIgEAEIgBAIIADAIQADADACAAIAEgEIABgIIgDgIQgBgBAAAAQgBgBAAAAQgBAAAAgBQgBAAAAAAIgBAAgAjukvQgCAAgCAEIgBAIIADAIIAFADIAEgEIABgIIgDgIQgCgDgCAAIgBAAgAjVk6IgEAEIgBAIIADAIQADADACAAIAEgEIABgIIgDgIQgBgBAAAAQgBgBAAAAQgBAAAAgBQgBAAAAAAIgBAAgAi8klIgBg5gAhCj0QgJgHgPAAIAAg6IADgBIAAg+IAFAAIABAAIAqgKIAlATIgpAGIAAgBIgmgOIAmAOIAAABIAACJgAi4kgIBegVIAAA6IgCAAIgSADIgDACIgBAAIhFANgAABk9ICEgbIAoAUIirAdgAhak1g");
	this.shape_37.setTransform(-7.6,-4.625);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#00B6B6").s().p("AiCD9IB1gZIh1AZIAAgBIgCABIgSAKIAAgdIAAgBIgBABIgVgTIB1gSIghgfIDXgqIAdAdIARAQIAAACIilAbIAAAaIgCAAIgTAEIAAgVIiJAaICJgaIAAAVIATgEIAcAPIiUAcgAgNC2IAAAZIAAgZICpgdgAinh7IAAiJIAogGIAFAuIAAAWICqgdIABAAIgBBfIjXAmg");
	this.shape_38.setTransform(4.875,-14.325);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34}]}).wait(1));

	// Layer_51
	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f().s("#000000").ss(1,0,0,3).p("AB6h+QABAQAAARIAAATIgEAlQgIAvgXAnIgEAHQgPAZgSAPIijAdQAXgHAUgSQAPgOAMgVQAng+AAhXIAAgUg");
	this.shape_39.setTransform(-72.4783,34.0064);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f().s("#000000").ss(1,0,0,3).p("Akuh6IgYAEAhFllIAQABIAXgIIANAIIAQgNIBfgQIAUANIhPALIAIAQAAElWIgVgOAgCkTIgBg3IAAgFIAHgHAAglZIgMAVIgPgTIAAAAIgBABAAjlZIgkgYAi4jhIgEAPIgCAFAi7jJIAAA7AArkyIAAA4IAugFQgMAJgLAWIgTAoIgEABIAAhDABWk5IASgEIAMgCAg7kgIgOgBQgGgDgDgHQgCgIADgHIALgJIAOABQAGAEADAHQACAIgDAGQgEAHgHACgAgCkDIgIAUAgCkTIAAAOQgLgLgbgIAgCkTIAAAOAAri3IjmApIhyAUAgoCiIChgXIAKgBIgKgNIi1AaIADAEIARAHgACOCWIgVgKQgCAwgDAXIgEAVQgOBCgeAaIgZAEIgUADIgnAIIhmASQAMgEAKgIIADgCQAegZAOhCIAEgVQAFghAAgkADGCaIglAGIgTgKICigcIAMgCIAIAKAhWBzIDZglIAYAdICDgWIASAXIitAeACDDGQACgGAFgBQAEgBAEAFQAFAEACAIQACAIgCAGQgCAHgEABQgEABgFgFIgGgMgACIELIgCAIIgFAEIgEgEIgCgIIACgIQACgDACAAQADAAACADgAB1FMQgBAGgEABQgFABgFgFIgGgMIAAgOQACgGAEgBQAEgCAFAFQAFAFACAIQABAHgCAHgAg+DqQAGgkABgpIgCgCAiZEgQACAEAAAGQAAAGgCADIgFAEIgFgEIgDgJIADgKIAFgDQADAAACADgAh9D1QAYgbAKgsQAHgggCgbAg+DqIgCAIQgRBYgvAKIgagBQgggKghgxIgDgFAj6ELIAWgEIBngSIA/gLAh2FlIgGABIgeAAQgggJghgmIgRgXABPFbIgCAIIgEADIgFgDIgCgIIACgJQACgDADAAQACAAACADgAArFIIADAHQABAHgCAHQgBAGgEABQgFABgFgFIgGgMIgBgJABaGAIgXADQgwgBgjgvAg8CXIgagk");
	this.shape_40.setTransform(-92.7009,8.137);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f().s("#000000").ss(1,0,0,3).p("AkhhTIgCACAkihRIABgCAk7hNIAEgRQAGgeAKgWQAVgwAmgHIADgBQAcgEAdAUIC4ggAgqk7QATAFAeAVgAArkwIADAAIAIAAIAAAnIArgHAiwigIAAgCIgDgCQgYgSgYAFQgtAKgRBUAjpjKIBzgVQAQhUAsgJAiti4IgDgCAB9lLIACA1IAAABIgMABAAAjGIixAdAgdjvIhZAQACEkWIABA7IghAFAE7CVIAAAOAjTE8IgGgMAjhFJIgOgV");
	this.shape_41.setTransform(-93.8451,4.0054);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#00FE00").s().p("AgWgeIAtgFQgMAJgLAXIgSAmIgEABg");
	this.shape_42.setTransform(-86.125,-13.9);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#00B6B6").s().p("AhrD+IgQgHIgEgEIC1gaIAKANIgKABIihAXgABMDyICigcIiiAcIgWgKIAKgCIAAAAIgKgNIi1AaIgagkIDaglIAXAdICDgWIATAXIiuAeICugeIAAAOIALgCIAIAKIAAACIh+AWIgkAGgABADmgADuDIgAj+htIAAgCIgCgCIABgFIAEgPIgDgCIC6ggIgJAUIAJgUIAAgCIgBgOIgBg3IAAgFIAIgHIABgBIAPATIAMgVIAEAAIAHAAIAAAnIAAA4IAABDIjnApgAj/h2ICygdg");
	this.shape_43.setTransform(-86.05,-1.075);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#808080").s().p("AgQFTIAogIIABAJIAGAMQAFAFAEgBQAEgBACgGQACgHgCgIIgCgHIgUAEIgoAIIhmASQAMgEALgIIACgCQAegZAPhDIADgUQAGghAAglIChgWIAAABQgCAwgEAWIgDAWQgPBCgeAaIgYADIAYgDQAegaAPhCIADgWQAEgWACgwIAVAKIATAKIAlgHIB+gVQABAPAAARIAAATIgEAmQgIAwgXAnIgEAHQgPAZgSAPIikAdQAXgHAUgSQAPgPAMgUQAng+AAhZIAAgUIAAAUQAABZgnA+QgMAUgPAPQgUASgXAHIgXACQgwAAgjgvgABFFSIgCAJIACAHIAEAEIAFgEIACgHIgCgJQgCgDgDAAQgCAAgCADgABnEuQgFABgCAFIABAPIAGAMQAFAFAEgBQAEgBACgGQACgHgCgIQgCgHgFgFQgDgEgDAAIgCABgAB9EDIgCAIIACAIIAFAEIAEgEIACgIIgCgIQgCgDgCgBQgDABgCADgACKC/QgEABgCAGIAAAPIAGAMQAFAFAFgCQAEAAABgHQACgGgBgIQgCgIgFgEQgEgEgDAAIgCAAgAiZFmQgggJghgmIgSgYIgNgUIAVgEIBngSQAZgbAKgtQAHgfgDgbIAbAkIADADIABACQgBApgGAlQAGglABgpIgBgCIAQAHIABAAQAAAlgGAhIgDAUQgPBDgeAZIgCACQgLAIgMAEIgGABgAjeETIAEAFQAhAxAgAKIAaABQAugKAShYIABgIIg/ALIA/gLIgBAIQgSBYguAKIgagBQgggKghgxIgEgFIgGgMgAijEgIgCAKIACAJIAFAEIAFgEQADgEAAgFQAAgGgDgEQgCgEgDABgAgnChgAlCiHQAGgfAKgVQAVgwAngIIACAAIABAAIABAAIAIgBIABAAIAAAAQAXAAAXARQgXgRgXAAIAAAAIgBAAIgIABIgBAAIgBAAIBzgVIBZgQQAcAIAKALIABAAIAAABIi6AhIAEACIgFAPIgBAFIADACIAAACIAAA6IhyAUIAAgCQARhTAtgKIABAAIABAAIAJgBIAAAAIAAAAQASAAASANIABAAIABABIgBgBIgBAAQgSgNgSAAIAAAAIAAAAIgJABIgBAAIgBAAQgtAKgRBTIgBACIgYAFgAArkyIArgIIATgDIALgBIAAgBIAFgBIACA8IghAFIgvAEgAgCkFQgKgLgcgIIhZAQQAQhUAsgJIAQABIAYgJIANAIIAUAPIgUgPIAPgMIBfgRIAVAOIhPALIAHAQIgHgQIBPgLIABA1IgLACIgTADIgrAIIAAgnIgHAAIglgYIAlAYIgEAAIgLAVIgQgTIAAAAIgBABIgHAHIAAAFIABA3IAAAOgAhQk6QgEAHADAIQACAGAHAEIAOABQAHgCADgHQAEgHgDgHQgCgIgHgDIgOgBgAgDlKQgegVgUgFg");
	this.shape_44.setTransform(-92.775,8.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39}]}).wait(1));

	// Layer_50
	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f().s("#000000").ss(1,0,0,3).p("AgqlYIAEAFQAAADgFACQgEADgGAAIgLgBQgEgCABgDIAEgGIALgCgAAzl1IARADQAHADAAAFQgBAFgHAEQgHAEgKABIgSgDQgGgDAAgFQAAgFAHgEgAiKjiIgBAcIA3AhIAAgkIAQARIAUAeQArBMAHBuQAIBvgfBRQgKAYgLASIC9geIAABrIjhArIAAAAIgrgZQAWgnAIgxIABgGIADgfIAPgXQAohLgKhnQgKhmg2hHIgggiIhUAPQANgcAQgRQAWgWAbgBgAhUk1Ig1ghIDegqIA2AfIACACIAACCIAMgCIABACIAUAeQArBMAJBvQAGBggXBJIgIAWQgJAYgMAUIghAFAhUk1IAABsQgagYgcgBIAAh0ACLlhIjfAsACNjdIjRAlADDBUQgBgKgIgGQgHgGgJACIhrARQgJACgFAHQgFAIACAKIAAABQABAJAHAGQAIAFAJgBIBrgRQAJgCAFgIQAFgHgCgKgAhPEQIABByAhPEQIAlgGAhbERIAMgB");
	this.shape_45.setTransform(-51.4034,2.8868);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FE00FE").s().p("AhQGCIgBhyIAlgHIC9gdIi9AdQALgRAKgYQAZhCAAhVIgCgpQgHhugrhMIgUgeIgQgSIAAAlIg3ghIABgcIgBAcIA3AhIAAglIAQASIAUAeQArBMAHBuIACApQAABVgZBCQgKAYgLARIglAHIABByIgrgZQAWgoAIgwIABgHIADgeIAPgYQAohKgKhnQgKhng2hGIgggiIhUAPQANgcAQgRQAWgWAbgBIAGgBQAcAAAaAYIAAhsIAABsQgagYgcAAIAAh0IABAAIA1AgIg1ggIDegqIA2AfIjfArIDfgrIACACIAACBIjRAmIDRgmIAMgBIABACIAUAeQArBMAJBvQAGBfgXBKIgIAVQgJAZgMAUIghAFIAABrIjhArgAhdERIAMgBgACoBAIhrARQgJACgFAHQgFAIACAKIAAABQABAJAHAFQAIAGAJgBIBrgSQAJgBAFgIQAFgIgCgJIAAgBQgBgJgIgHQgFgEgHAAIgEABgAhBlXIgEAFQgBAEAEACIALABQAGgBAEgCQAFgCAAgDIgEgFIgKgCgAAflwQgHADAAAGQAAAFAGADIASADQAKgBAHgFQAHgDABgGQAAgEgHgEIgRgCg");
	this.shape_46.setTransform(-51.2284,2.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_46},{t:this.shape_45}]}).wait(1));

	// Layer_49
	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f().s("#000000").ss(1,0,0,3).p("AAlkGQgNAZAAAVQAAA6ALAWQAMAYABAYQAEB4gPBDQgSBOgxA/IgBABIgFAHIgDADIAIgK");
	this.shape_47.setTransform(-179.7899,42.5102);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f().s("#000000").ss(1,0,0,3).p("AiHk+IgFAAIgFABQAehzA8gIIABAAIAGgBIBbgGQAcABAcAZQAfAaASArQAOATAPAyIAIAdQAIAfAGAkQAKAzAHA7IAAACIAFAQIAMAvQAHAeAFAjIADAhIACAUQADAygCAtIgHA9QgHAqgMAlQgcBTg6ANIgaADQAegLAVhBQAbhNAAhtQAAhugbhMQgSg4gZgPQgTi3gthVQgzhfg2ABAgOG/IgFABIgBAAQg9AEg/hkQhBhpgbifQgcieAah3QAbh3BAgJIACAAAiHk+IBLgGQA2AHA1BZQBBBpAcCeQAcCfgbB2QgZBzg9ANIgQACIg1AFAgVl0QAFAAADAFQADAFAAAHQAAAHgDAFQgDAGgFAAQgFAAgEgGIgDgMIADgMQAEgFAFAAgAAuEMQAUhdgVh7QgWh7gyhTIgEgFQgIARgEAdQgLBFAPBcQAPBcAfA9IAYAmIAPANIgBgBIgHgFIAAAAIgHgHABzhSIAGADAB/CQIACACQADAFAAAGQAAAGgDAEQgDAFgFAAIgCAAIgHgFIgDgKIADgLQAEgEAFAAQAEAAACACgAiHk+QA6ABA7BfQBABqAcCeQAbCegaB3QgaB3g/AJAhLjUIALAKQAQAQARAbIgigpIgJASIgHAYQgaBmAcCGIAPA8QAbBgAxBFIAOARIACACIgIAOQgSAcgZAEQgzAIgzhSQgyhSgWh8QgVh7AUhdQAVhdAygHQAagEAaAUgAAUFQIgXgdQgyhFgchgIgPg8QgbiGAahmIAHgYIAPgiIAKAMIABgCAAaFAIgGAQAAuEMQgHAggLAWABxG4IgBAAIgHABIhCABAAuD8IAAAQ");
	this.shape_48.setTransform(-197.6668,23.8822);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#00FE00").s().p("AgrDgQgzhSgVh8QgWh7AUhcQAVhdAygIQAagEAZAVIgOAiIgHAYQgMAxAAA5QAAA9AOBEIAOA8QAbBgAyBFIAYAeIgYgeQgyhFgbhgIgOg8QgOhEAAg9QAAg5AMgxIAHgYIAOgiIAKALIgIATIgHAYQgMAxAAA5QAAA9ANBEIAPA8QAcBgAyBFIAOARIgOgRQgyhFgchgIgPg8QgNhEAAg9QAAg5AMgxIAHgYIAIgTIAjApQgJASgEAdQgLBFAPBdQAPBbAgA9IAZAlIAGAHIABABIAGAFIABAAIAAAQIgTA0IgHARQgSAcgaAEIgIAAQguAAguhLg");
	this.shape_49.setTransform(-205.8319,30.8238);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#C0C0C0").s().p("AiPFgQhBhpgbifQgcieAah3QAbh3BAgJIACAAIAFgBIAFAAQA6ABA7BfQBABqAcCeQAOBQAABGQAABEgNA7QgaB3g/AJIgFABIgBAAIgFAAQg7AAg8hggAh+jkQgyAHgVBdQgUBdAVB7QAWB8AyBSQAzBSAzgIQAZgEASgcIAIgOQALgWAHggQAUhdgVh7QgWh7gyhTIgEgFQgRgbgQgQIgLgKQgWgRgWAAIgIABgAgNG/QA/gJAah3QANg7AAhEQAAhGgOhQQgciehAhqQg7hfg6gBIBLgGQA2AHA1BZQBBBpAcCeQAOBRAABGQAABEgNA6QgZBzg9ANIgQACIAQgCQA9gNAZhzQANg6AAhEQAAhGgOhRQgciehBhpQg1hZg2gHIhLAGIgFAAIgFABQAehzA8gIIABAAIAGgBIBbgGQAcABAcAZIAxBFIAdBFIAIAdIAfCxIAAACIAFAQIAMAvQAHAeAFAjIADAhIACAUIgGCcQgHAqgMAlQgcBTg6ANIADgDIAFgGIgIAJIgaADQAegLAVhBQAbhNAAhtQAAhugbhMQgSg4gZgPQAZAPASA4QAbBMAABuQAABtgbBNQgVBBgeALIgBAAIgHABIhCABIg1AFIAAAAgADZEdQgSBPgyA+IgBACIABgCQAyg+AShPQALg1AAhWIAAgwQgBgYgMgYQgLgXAAg5QAAgVANgYQgNAYAAAVQAAA5ALAXQAMAYABAYIAAAwQAABWgLA1gABxCSIgDALIADAKIAHAFIACAAQAFAAADgFQADgEAAgGQAAgGgDgFIgCgCQgCgCgEAAQgFAAgEAEgAB6hPQgTi3gthVIgBgCIgEgGIAAgBQgvhUgzgBIgBAAIAAAAIgBAAIABAAIAAAAIABAAQAzABAvBUIAAABIAEAGIABACQAtBVATC3IgGgDIAGADIAAAAgAgdlvIgDAMIADAMQAEAGAFAAQAFAAADgGQADgFAAgHQAAgHgDgFQgDgFgFAAQgFAAgEAFgACMG1gAB6hPg");
	this.shape_50.setTransform(-197.7568,23.8827);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47}]}).wait(1));

	// Layer_48
	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f().s("#000000").ss(1,0,0,3).p("AiWkUQAchNA0gJQA/gKA9BjQARAbAPAgQAlBSARBtQASBrgKBZQgEAigIAgQgcByg/AKQg/AKg+hj");
	this.shape_51.setTransform(-164.8031,23.225);

	this.timeline.addTween(cjs.Tween.get(this.shape_51).wait(1));

	// Layer_47
	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f().s("#000000").ss(1,0,0,3).p("ADPCeICTgaIAZgFIFgg/IAMgCIAqgGAsPhBIAUgEIAQgDIAcgFIAdgFIALgCIALgCIGuhMIALgCIF3hCIAMgDIHbhTADMCeIkbA0IgMACInEBPAq1E9IACAAIBLgNIAFgB");
	this.shape_52.setTransform(-50.9067,3.5538);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f().s("#000000").ss(1,0,0,3).p("ANUlcIAtgIIAVAaQA3BMAKBvQAJBggeBIIgCAFIgBACIArgIIAogHAPTlyIhSAOAOzAiIAMgCAoihkIAYAeIAUAgQAeA3AMBLIACAMQANBcgWBGIgHATAoPhoIgDABAmHEPIAHgXQAUhAgIhQIgEgeQgQhigvhAIgXgbAGoB+IgDABAncEdInqBWAwRgIIHbhZ");
	this.shape_53.setTransform(-72.6255,6.7251);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f().s("#000000").ss(1,0,0,3).p("AKTiqQgRg4gggtIgVgaINtibIAAABIAOARIAKAPQAuBHAJBlQAHBPgTBAIkXAzIgCAmIpYBpIADgFQAdhKgIhfQgDgggHgdgA0nGYQggAwgxgCQg1gBgrg6Qgqg6gHhRQgHhRAgg4QAhg4A1ABIAEABQARABARAHQARAIAQAPQAMALAMARQAqA6AIBRQAHBRghA4gA17CbIgDgKIADgKQAEgEAFAAQAEAAADADIAGADQADAEAAAGQAAAGgDAEQgDAEgFAAIgHgCgA0pEoQgDgEgEgBQgCgCgEAAQgFAAgEAEIgDALIADAKIAHAFIAHACQAFAAADgEQADgFAAgGQAAgGgDgEg");
	this.shape_54.setTransform(-33.6261,-0.5514);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AAaBdIgHgFIgDgKIADgLQAEgEAFAAQAEAAACACQAEABACAEQAEAEAAAGQAAAGgEAFQgCAEgGAAgAghhCIgHgEIgDgKIADgKQAEgEAEAAQAEAAAEADIAGADQADAEAAAGQAAAGgDAEQgEAEgEAAg");
	this.shape_55.setTransform(-169.9,22.025);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#C0C0C0").s().p("A14HGQg1gCgrg6Qgqg6gHhRQgHhRAgg4QAhg4A1ACIAEAAQARABARAIQgRgIgRgBIgBAAIHbhYIAUgEIAQgDIANgCIgNACIADAAIAKgCIAPgDIAdgFIALgCIALgCIGuhMIALgCIF4hCIAMgDIHahTIAtgIIAVAZQA3BMAKBvQACAWAAAVQAABFgXA5IgCAFIgMACIAMgCIgBABIgMACIABgBIlgA/IgZAFIiTAaIgDAAIkbA0IgMACInEBPIhBALIAHgXQAOgsAAg1QAAgXgCgXIgEgfQgQhigvhAIgXgbIAXAbQAvBAAQBiIAEAfQACAXAAAXQAAA1gOAsIgHAXIgDABIgFABIhLANIAHgTQAOgtAAg2QAAgegFghIgCgMQgMhMgeg3IgUggIgYgeIAYAeIAUAgQAeA3AMBMIACAMQAFAhAAAeQAAA2gOAtIgHATIgCAAInqBWQAZgLAMgaIAEgHQAbguAAg/IgBgcQgIhSgqg6QgMgQgMgMIgPgSIgSgEQARAHAQAPQAMAMAMAQQAqA6AIBSIABAcQAAA/gbAuIgEAHQgfAvgvAAIgDAAgA0/ElIgDAKIADALIAHAEIAHADQAFAAADgFQADgEAAgGQAAgGgDgFQgDgEgEAAQgCgDgEAAQgFAAgEAFgAkKDbIABgBgA17CGIgDAKIADAKIAHAEIAHADQAFAAADgEQADgEAAgGQAAgGgDgEIgGgEQgDgDgEAAQgFAAgEAEgAkID9IAMgCIgNATgADOCoIAAABIgZAEgADOCogAI6BnIAqgGIgrAHgAI6BnIACgFQAXg5AAhFQAAgVgCgWQgKhvg3hMIgVgZIBSgPINtibIAAABIAOARIAKAPQAuBIAJBkQAHBPgTBBIkXAyIgCAnIpYBoIADgFQAXg5AAhFQAAgVgCgVQgDghgHgdIgHgYQgRg5gggsIgVgbIAVAbQAgAsARA5IAAAYIAHAAQAHAdADAhQACAVAAAVQAABFgXA5IgDAFIgoAIIgqAGgAJkBhgAt9gkIACgCIgBACIgPADgAtJgtIgLACIgLACg");
	this.shape_56.setTransform(-33.6261,-0.5227);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52}]}).wait(1));

	// Layer_46
	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f().s("#000000").ss(1,0,0,3).p("AhHEvIgZAFQgtABgtgwIgDgDIgYgeIgDgEIgJgNIgPgaIgDgEQgKgSgZhAQg4iqgGi2IAAgBAiuDyQg9hNgUhCIgghmQgqiQAMhuAAaBIIgUgZIgCAAIgCAmIABAAIgJA7QgZB0g/AMQgoAHgogmAAGAvIA6gKIEEgvIARATIAAACIk7A5IAAAEQgFA5gJAnQgYBxg7AWAgHk4QAHD5BABkAFVALQgDAogGAlIgFAUIgFAWQgYBXgwAXIlBA/");
	this.shape_57.setTransform(91.375,-10.6798);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f().s("#000000").ss(1,0,0,3).p("AhDhBQgigZgiAEIEng4IANgDIAOgBQAdgBAcAUIACACIgCAAIAAAWIhtAVQgcAggPBGIgGAgIgBAHQgCAQgBARIgCAAAhDgqIAAgXIE3g8AjlCTIgBAAIAEgoIABgHIABgDIAFgdQAYhzA9gLQAdgGAeAVIACACIAGgBIDKgoAj8CWQACgmAGgjIACgJIADgQQAbh1A/gSIAOgDAg1AeIADAHIgDAHIgGADQgEAAgDgDQgDgDAAgEQAAgEADgDQADgDAEAAgAiPAiQAFAAAEAEQAEAEAAAGQAAAGgEAEQgEAEgFAAQgGAAgEgEQgEgEAAgGQAAgGAEgEQAEgEAGAAgAAhAHQAFAAAEAEQAEAEAAAGQAAAGgEAEQgEAEgFAAQgGAAgEgEQgEgEAAgGQAAgGAEgEQAEgEAGAAg");
	this.shape_58.setTransform(82.5702,-51.1756);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#00FE00").s().p("AguFdIAAAAQg8hNgVhBIgfhnQgriPANhuIgBAAIAEgoIABgHIAAgEIAFgcQAZh0A9gLQAdgGAeAUIACACIAFgBIDLgnQgdAfgPBHIgFAgIgBAHQgDAQgBASIgCAAQAHD4BBBkIg6AKIgCAAIgCAnIABAAIgJA7QgaB0g+ALIgOABQggAAgigfgAhwkCQgEAEAAAGQAAAGAEAEQAEAEAFAAQAGAAAEgEQAEgEAAgGQAAgGgEgEQgEgEgGAAQgFAAgEAEgAgakKQgDACABAFQgBAEADADQADACAEAAIAHgCIACgHIgCgHIgHgDQgEAAgDADgABAkeQgEAEAAAGQAAAGAEAEQAEAEAFAAQAGAAAEgEQAEgEAAgGQAAgGgEgEQgEgEgGAAQgFAAgEAEg");
	this.shape_59.setTransform(78.533,-21.4132);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#00B6B6").s().p("AhVEUIA5gKIEEgwIARAVIAAACIk6A4IAAAFgAj3jxIE3g7IAAAVIhsAVIjLAog");
	this.shape_60.setTransform(100.6,-33.6);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#808080").s().p("Ai6F/IgDgDIgYgeIgDgEIgJgNIgPgaIgDgEQgKgSgZhAQg4irgGi1IAAgBIAAABIAAgBQACgmAGgjIACgJIADgQQAbh2A/gSIAOgDIEng4IANgDIAOgBQAdgBAcAUIACACIgCAAIk3A8IgCgBQgcgUgcAAIAAAAIgBAAIgJAAIAJAAIABAAIAAAAQAcAAAcAUIACABIAAAXIgGABIgCgCQgegVgdAGQg9ALgYB0IgFAdIgBADIgBAHIgEAoIABAAQgMBuAqCPIAgBnQAUBCA9BNIAAgBQAoAmAogHQA/gMAZh0IAJg7IgBAAIACgmIACAAIAUAZIAAgEIE7g5QgDAogGAlIgFAUIgFAWQgYBXgwAXIlBA/QA7gWAYhxQAJgnAFg5QgFA5gJAnQgYBxg7AWIgZAFIgCAAQgsAAgsgvgAhHGpIAAAAgAi9F8IADADg");
	this.shape_61.setTransform(91.375,-22.8983);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57}]}).wait(1));

	// Layer_45
	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f().s("#000000").ss(1,0,0,3).p("AgDAaIAAgFQAAgGAEgFQAEgFAHAAQAHAAAFAEIACADIADAIQAAAHgFAFQgFAEgHABQgHAAgEgFIgBgBIgDgFIgQgbIAAgBAAHgTIgHgNQgFgEgGAAQgHAAgFAFQgFAFAAAHIAAADIAJAOIgBgEQAAgHAFgFQAFgEAHgBQAFAAAFAEIATAfAAEAdIgCgEIAAgDQAAgEADgDQADgDAEgBIAIADIABACIACAFIgDAIQgDADgFAAQgEAAgDgDg");
	this.shape_62.setTransform(73.675,-70.625);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FEFEFE").s().p("AABAgIgBgBIgDgFIAAgFQAAgGAEgFQAEgFAHAAQAHAAAFAEIACADIADAIQAAAHgFAFQgFAEgHABQgHAAgEgFgAAFAPQgDADAAAEIAAADIACAEIABAAQADADAEAAQAFAAADgDIADgIIgCgFIgBgCIgIgDQgEABgDADgAgTgBIAAgBIgBgEQAAgHAFgFQAFgEAHgBQAFAAAFAEIATAfIgCgDQgFgEgHAAQgHAAgEAFQgEAFAAAGIAAAFgAgcgQIAAgDQAAgHAFgFQAFgFAHAAQAGAAAFAEIAHANQgFgEgFAAQgHABgFAEQgFAFAAAHIABAEg");
	this.shape_63.setTransform(73.675,-70.625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_63},{t:this.shape_62}]}).wait(1));

	// Layer_44
	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f().s("#000000").ss(1,0,0,3).p("AgVgCIgBgEQAAgHAFgFQAFgEAHgBQAFAAAFAEIgHgNQgFgEgGAAQgHAAgFAFQgFAFAAAHIAAADIAJAOIAAABIAQAbIAAgFQAAgGAFgFQADgFAHAAQAHAAAFAEIACADIgTgfAAYAMIADAIQAAAHgFAFQgFAEgHABQgHAAgDgFIgCgBIgDgFAACAdIgCgEIAAgDQAAgEADgDQADgDAEgBIAIADIABACIACAFIgDAIQgDADgFAAQgEAAgDgDg");
	this.shape_64.setTransform(56.3991,-67.225);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FEFEFE").s().p("AABAgIgBgBIgDgFIgQgbIAAgBIgJgOIAAgDQAAgHAFgFQAFgFAHAAQAGAAAFAEIAHANQgFgEgFAAQgHABgFAEQgFAFAAAHIABAEIgBgEQAAgHAFgFQAFgEAHgBQAFAAAFAEIATAfIgCgDQgFgEgHAAQgHAAgEAFQgEAFAAAGIAAAFIAAgFQAAgGAEgFQAEgFAHAAQAHAAAFAEIACADIADAIQAAAHgFAFQgFAEgHABQgHAAgEgFgAAFAPQgDADAAAEIAAADIACAEIABAAQADADAEAAQAFAAADgDIADgIIgCgFIgBgCIgIgDQgEABgDADgAAHgTIAAAAg");
	this.shape_65.setTransform(56.175,-67.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_65},{t:this.shape_64}]}).wait(1));

	// Layer_43
	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f().s("#000000").ss(1,0,0,3).p("AgyAAIACAAIABAAIACACIACAFIgCAGIgBABIgCABIgCAAIAEgBIBfgOIAAAAIAEAAIAAAAIgEAAAgvAAIgDAAIgCACIgBAFIABAGIACACAA1AAIABgBIABgGIgBgFIgDgCIgCAAIAAAAIACAAAAxgOIhgAO");
	this.shape_66.setTransform(103.8463,-53.9862);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#999999").s().p("AgDAGIgBgGIABgFIACgBIACgBIADACIABAFIgBAGIgBABIgEABg");
	this.shape_67.setTransform(98.9,-53.25);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AgwAOIABgGIgBgGIgDgCIBggNIADgBIADADIABAFIgBAGIgBAAIgFABIABAAIhfAOg");
	this.shape_68.setTransform(104.175,-54.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_68},{t:this.shape_67},{t:this.shape_66}]}).wait(1));

	// Layer_42
	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f().s("#000000").ss(1,0,0,3).p("AA1AAIABgBIABgGIgBgFIgDgCIgCAAIAAAAIACAAAAxAAIAAAAIAEAAIAAAAgAgyAAIACAAIABAAIgDAAIgCACIgBAFIABAGIACACAgvAAIACACIACAFIgCAGIgBABQgBABgBAAIgCAAIAEgBIBfgOAAxgOIhgAO");
	this.shape_69.setTransform(29.0963,-40.7983);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#999999").s().p("AgDAGIgBgGIABgEIADgCIABAAIACACIACAEIgCAGIgBABIgDAAg");
	this.shape_70.setTransform(24.15,-40.05);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("AgwAOIABgGIgBgGIgDgCIBggNIADgBIADADIABAFIgBAGIgBAAIgFABIABAAIhfAOg");
	this.shape_71.setTransform(29.425,-40.825);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_71},{t:this.shape_70},{t:this.shape_69}]}).wait(1));

	// Layer_41
	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f().s("#000000").ss(1,0,0,3).p("AgBACIgBAFQgBAEgEABQgDABgDgDQgEgDAAgFQgCgEACgEQACgEADgBIAHACIADAGIABADgAARgHIACAAIAAACIAAACIgBABIgCABIgRADAAPgHIABgBIABABAAPgHIACAAAgCgDIARgE");
	this.shape_72.setTransform(17.0929,-38.5179);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FF8040").s().p("AgNAKQgEgDAAgFQgCgEACgEQACgEADgBIAHACIADAGIABADIAAACIgBAFQgBAEgEABIgCAAQgCAAgCgCgAgBACIAAgCIgBgDIARgEIACAAIACAAIAAACIAAACIgBABIgCABIgRADgAgCgDg");
	this.shape_73.setTransform(17.0929,-38.5125);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_73},{t:this.shape_72}]}).wait(1));

	// Layer_40
	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f().s("#000000").ss(1,0,0,3).p("AgZD3IAApMIACgBQAKgGANAAQAOAAAKAFIAAJMQABAAACACQAGAEADAGIAAABIgJAJIgBABIgCgXAgjEBQACgGAIgEIgCAUIABAAQALAIAPAAQAQAAAKgHAgkEQIgBgFIAAgBIACgJAgbELIgIgKAAlEPQgCAIgIAFQgLAIgQAAQgPAAgLgIIgKgMAAlEDIABAHIgBAFIABA0QAAALgLAHQgLAIgQAAQgPAAgLgIQgIgGgCgHAAkEBIABACIAAAMAgkE9IAAALIgBgFIABgGIAAgt");
	this.shape_74.setTransform(-56.426,81.2479);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FF6633").s().p("AgaFVQgIgGgCgHIAAgLIAAgtIAKAMQALAIAPAAQAQAAALgIQAIgFACgIQgCAIgIAFQgLAIgQAAQgPAAgLgIIgKgMIgBgFIAAgBIACgJIAIAKIABAAQALAIAPAAQAQAAAKgHIABgBIAJgJIABABIAAAMIABA0QAAALgLAHQgLAIgQAAQgPAAgLgIgAgaELIgBAAIACgUIAApMIACgBQAKgGANAAQAOAAAKAFIAAJMIACAXQgKAHgQAAQgPAAgLgIgAAaEMg");
	this.shape_75.setTransform(-56.425,81.2479);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_75},{t:this.shape_74}]}).wait(1));

	// Layer_39
	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f().s("#000000").ss(1,0,0,3).p("AAAlTIAIACIAEAFQAAADgEACIgIACIgIgCIgEgFIAEgFgAghlIIgBgFIABgEIAJgKQAKgGAOAAQAOAAAKAGQAHAEACAGIABAEIgBAFIAAgJAAhlIQgCAFgHAFQgKAGgOAAQgOAAgKgGQgHgFgCgFAAckPIgEADQgKAGgOAAQgLAAgIgEIgFgCQgHgFgCgFIAAgyAAhlIIAAAyIgFAHIAAJrQgKAGgOAAQgNAAgKgGIgCgBIACpl");
	this.shape_76.setTransform(-47.0954,-80.775);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FF6633").s().p("AgTFcIgBgBIACplIgFgCQgHgFgCgFIAAgyQACAFAHAFQAKAGAOAAQAOAAAKgGQAHgFACgFQgCAFgHAFQgKAGgOAAQgOAAgKgGQgHgFgCgFIgBgFIABgEIAJgKQAKgGAOAAQAOAAAKAGQAHAEACAGIAAAJIAAAyIgFAHIgEADQgKAGgOAAQgLAAgIgEQAIAEALAAQAOAAAKgGIAEgDIAAJrQgKAGgOAAQgNAAgLgGgAgHlRIgFAFIAFAFIAHACIAJgCQADgCAAgDIgDgFIgJgCg");
	this.shape_77.setTransform(-47.15,-80.775);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_77},{t:this.shape_76}]}).wait(1));

	// Layer_38
	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f().s("#000000").ss(1,0,0,3).p("AgQhaIAzCLIgQA0IgCAAIgziMg");
	this.shape_78.setTransform(-141.0769,4.9484);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#818100").s().p("AARBgIgziMIASgzIAzCLIgQA0g");
	this.shape_79.setTransform(-141.075,5.425);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_79},{t:this.shape_78}]}).wait(1));

	// Layer_37
	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f().s("#000000").ss(1,0,0,3).p("AgdhnIgUA4IA3CYIACAAAAwAsIABgDIg2iSIgYACIA2CVAAwAsIgUA+IgUgBIASg4IgBgDg");
	this.shape_80.setTransform(-129.963,3.0945);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#818100").s().p("AAIBpIASg5IgBgCIAXgCIgUA+gAAGBpIg2iYIATg4IA2CVIg2iVIAYgCIA3CSIgCADIgXACIABACIgSA5gAAwAsg");
	this.shape_81.setTransform(-130,3.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_81},{t:this.shape_80}]}).wait(1));

	// Layer_36
	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f().s("#000000").ss(1,0,0,3).p("AgQhaIAzCLIgQA0IgCAAIgziMg");
	this.shape_82.setTransform(-144.5269,53.8984);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#818100").s().p("AARBgIgziMIASgzIAzCLIgQA0g");
	this.shape_83.setTransform(-144.525,54.375);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_83},{t:this.shape_82}]}).wait(1));

	// Layer_35
	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f().s("#000000").ss(1,0,0,3).p("AgdhnIgUA4IA3CYIACAAAAwAsIABgDIg2iSIgYACIA2CVAAwAsIgUA+IgUgBIASg4IgBgDg");
	this.shape_84.setTransform(-133.113,53.0445);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#818100").s().p("AAIBpIASg5IgBgDIAXgBIgUA+gAAGBpIg2iYIATg4IA2CUIg2iUIAYgCIA3CSIgCADIgXABIABADIgSA5gAAwAsg");
	this.shape_85.setTransform(-133.15,53.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_85},{t:this.shape_84}]}).wait(1));

	// Layer_34
	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f().s("#000000").ss(1,0,0,3).p("AgQhaIAzCLIgQA0IgCAAIgziMg");
	this.shape_86.setTransform(47.1731,-29.6016);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#818100").s().p("AARBgIgziMIASgzIAzCLIgQA0g");
	this.shape_87.setTransform(47.175,-29.125);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_87},{t:this.shape_86}]}).wait(1));

	// Layer_33
	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f().s("#000000").ss(1,0,0,3).p("AgdhjIAYgCIA2CSIgBACIgXACIABADIgSA5IgCAAIg2iXIATg5IA2CUAAwAvIgUA/IgUgB");
	this.shape_88.setTransform(38.1284,-27.7409);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#818100").s().p("AAIBpIASg5IgBgCIAXgDIgUA/gAAIBpIgCAAIg2iXIATg5IA2CVIABACIgSA5gAAZAugAAZAuIg2iVIAYgCIA2CSIgBACIgXADg");
	this.shape_89.setTransform(38.125,-27.35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_89},{t:this.shape_88}]}).wait(1));

	// Layer_32
	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f().s("#000000").ss(1,0,0,3).p("AgHABIAAgXIAHgBIAHACIAAAWIAAAKIgHABIgHgBgAgPAKIAAgBIAAgBQAAgDAEgCIAEgCAgOAMIAAAAIADADIAEABIAHABIAHgBIAEgBIACgCIABgBIABgCIAAAEIgBgCAgPAKIABACIgBACgAAHABIAEACQAEACABAEIgBABAAPAQIAAgCIABABIgBABIgCAEIgCABIgEACIgHABIgHgBIgEgCIgDgCIgBgDIAAgC");
	this.shape_90.setTransform(160.2795,97.7278);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#CCCCCC").s().p("AgHAXIgDgCIgEgCIgBgCIAAgCIABgDIgBgCIAAgBIAAgBQAAgDAFgCIADgCIAAAKIAHABIAIgBIAAgKIADACQAEACABAEIAAABIgBACIgBACIgDABIgDACIgIAAIgHAAIgDgCIgEgDIAAAAIAAAAIAEADIADACIAHAAIAIAAIADgCIADgBIABgCIABADIAAACIgCADIgDABIgDACIgIABgAgHALIAAgKIAAgXIAHgBIAIACIAAAWIAAAKIgIABg");
	this.shape_91.setTransform(160.25,97.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_91},{t:this.shape_90}]}).wait(1));

	// Layer_31
	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f().s("#000000").ss(1,0,0,3).p("AgHABIAAgXIAHgBIAHACIAAAWIAEACQAEACABAEIgBABIAAAEIABABIgBABIgCAEIgCABIgEACIgHABIgHgBIgEgCIgDgCIgBgDIAAgCAAOAMIABgCAgOAMIAAAAIADADIAEABIAHABIAHgBIAEgBIACgCIABgBAAPAOIgBgCAAPAQIAAgCAAHABIAAAKIgHABIgHgBIAAgKAgPAKIAAgBIAAgBQAAgDAEgCIAEgCAgOAMIgBACIAAgEg");
	this.shape_92.setTransform(151.2795,99.7278);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#CCCCCC").s().p("AgHAXIgDgBIgEgDIgBgDIAAgBIABgDIgBgCIAAgBIAAgBQAAgDAFgCIADgCIAAAKIAHABIAIgBIAAgKIAAAKIgIABIgHgBIAAgKIAAgXIAHgBIAIACIAAAWIADACQAEADABADIAAABIgBACIgBACIgDABIgDABIgIABIgHgBIgDgBIgEgCIAAgBIAAABIAEACIADABIAHABIAIgBIADgBIADgBIABgCIABADIAAABIgCAEIgDACIgDABIgIABg");
	this.shape_93.setTransform(151.25,99.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_93},{t:this.shape_92}]}).wait(1));

	// Layer_30
	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f().s("#000000").ss(1,0,0,3).p("AgHAAIAAgXIAHgBIAHACIAAAWIAEACQAEACABAEIgBABIAAAEIgBgCIABgCAgOALIAAAAIADADIAEABIAHABIAHgBIAEgBIACgCIABgBAAHAAIAAAKIgHABIgHgBIAAgKAgPAJIAAgBIAAgBQAAgDAEgCIAEgCAgOALIgBACIAAgEgAAPAPIgCAEIgCABIgEACIgHABIgHgBIgEgCIgDgCIgBgDIAAgCAAPAPIAAgCIABABg");
	this.shape_94.setTransform(155.4795,94.1188);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#CCCCCC").s().p("AgGAXIgFgCIgDgCIgBgCIAAgCIABgDIgBgCIAAgBIAAgBQAAgDAEgCIAFgCIAAAKIAGABIAIgBIAAgKIAAAKIgIABIgGgBIAAgKIAAgXIAGgBIAIACIAAAWIADACQAFACAAAEIgBABIgBACIABADIAAACIgCADIgCABIgDACIgIABgAgOAMIADADIAFACIAGABIAIgBIADgCIACgCIABgBIgBABIgCACIgDACIgIABIgGgBIgFgCIgDgDIAAAAIAAAAg");
	this.shape_95.setTransform(155.45,94);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_95},{t:this.shape_94}]}).wait(1));

	// Layer_29
	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f().s("#000000").ss(1,0,0,3).p("AgHAAIAAgXIAHgBIAHACIAAAWIAAAKIgHABIgHgBgAgPAJIAAgBIAAgBQAAgDAEgCIAEgCAgOALIAAAAIADADIAEABIAHABIAHgBIAEgBIACgCIABgBIABgCIAAAEIgBgCAAPAPIgCAEIgCABIgEACIgHABIgHgBIgEgCIgDgCIgBgDIAAgCAgPAJIABACIgBACgAAHAAIAEACQAEACABAEIgBABAAPAPIAAgCIABABg");
	this.shape_96.setTransform(146.4795,95.4188);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#CCCCCC").s().p("AgGAXIgFgBIgDgDIgBgDIAAgCIABgCIgBgCIAAgBIAAgBQAAgDAEgCIAFgBIAAgYIAGgBIAIACIAAAXIAAAJIgIABIgGgBIAAgJIAAAJIAGABIAIgBIAAgJIADABQAFACAAAEIgBABIgBACIABACIAAACIgCAEIgCACIgDABIgIABgAAAARIAIgBIADgBIACgBIABgCIgBACIgCABIgDABIgIABIgGgBIgFgBIgDgCIAAgBIAAABIADACIAFABIAGABg");
	this.shape_97.setTransform(146.45,95.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_97},{t:this.shape_96}]}).wait(1));

	// Layer_28
	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f().s("#000000").ss(1,0,0,3).p("AAHACIAEABIAFAGIgBABAgHACIAAgYIAHgBQADAAAEACIAAAXIAAAJIgHABIgHgBgAAPAPIgBgDIABgCIAAAFIABABIgBABIgCADIgCACIgEABIgHABIgHgBIgEgBIgDgDIgBgCIAAgCIAAgFIAAgBIAAgBQAAgDAEgCIAEgBAgOAMIAAABIADACIAEACIAHABIAHgBIAEgCIACgBIABgCAAPARIAAgCAgOAMIgBADAgPAKIABAC");
	this.shape_98.setTransform(142.3967,101.398);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#CCCCCC").s().p("AgHAXIgDgBIgEgDIgBgCIAAgCIABgDIAAABIAEACIADACIAHABIAHgBIAEgCIADgBIABgCIgBACIgDABIgEACIgHABIgHgBIgDgCIgEgCIAAgBIgBgCIAAgBIAAgBQABgDAEgCIADgBIAAAJIAHABIAHgBIAAgJIAEABIAFAGIAAABIgBACIABADIAAACIgCADIgDACIgEABIgHABgAAAAMIgHgBIAAgJIAAgYIAHgBQAEAAADACIAAAXIAAAJIgHABgAgHACg");
	this.shape_99.setTransform(142.35,101.3958);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_99},{t:this.shape_98}]}).wait(1));

	// Layer_27
	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f().s("#000000").ss(1,0,0,3).p("AgnABQAAgHAMgFIAQgFQgFABgDACQgIAEAAAHQAAAFAIAEQAIAFALAAIASgFQAIgEAAgFQAAgHgIgEQgEgDgFgBQALACAIAEQALAFAAAHQAAAIgLAGQgMAGgQAAQgQAAgLgGQgMgGAAgIg");
	this.shape_100.setTransform(149.05,49.7954);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#FFFFFF").s().p("AgbANQgMgFAAgIQAAgHAMgGIALgDIgDABQgHAFAAAGQAAAFAHAFQAIAEALAAIATgEQAHgFABgFQgBgGgHgFQgEgCgGgBQALABAIAEQALAGAAAHQAAAIgLAFQgMAGgQAAQgPAAgMgGgAgLgSIgFACIAFgCg");
	this.shape_101.setTransform(149.05,49.925);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_101},{t:this.shape_100}]}).wait(1));

	// Layer_26
	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f().s("#000000").ss(1,0,0,3).p("AgnABQAAgHAMgFIAQgFQgFABgDACQgIAEAAAHQAAAFAIAEQAIAFALAAIASgFQAIgEAAgFQAAgHgIgEQgEgDgFgBQALACAIAEQALAFAAAHQAAAIgLAGQgMAGgQAAQgQAAgLgGQgMgGAAgIg");
	this.shape_102.setTransform(149.05,40.0954);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#FFFFFF").s().p("AgbANQgMgFAAgIQAAgHAMgGIALgDIgDABQgHAFAAAGQAAAFAHAFQAIAEALAAIATgEQAHgFABgFQgBgGgHgFQgEgCgGgBQALABAIAEQALAGAAAHQAAAIgLAFQgMAGgQAAQgPAAgMgGgAgLgSIgFACIAFgCg");
	this.shape_103.setTransform(149.05,40.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_103},{t:this.shape_102}]}).wait(1));

	// Layer_25
	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f().s("#000000").ss(1,0,0,3).p("AgnABQAAgHAMgFIAQgFQgFABgDACQgIAEAAAHQAAAFAIAEQAIAFALAAIASgFQAIgEAAgFQAAgHgIgEQgEgDgFgBQALACAIAEQALAFAAAHQAAAIgLAGQgMAGgQAAQgQAAgLgGQgMgGAAgIg");
	this.shape_104.setTransform(149.05,30.5954);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#FFFFFF").s().p("AgbANQgMgFAAgIQAAgHAMgGIALgDIgDABQgHAFAAAGQAAAFAHAFQAIAEALAAIATgEQAHgFABgFQgBgGgHgFQgEgCgGgBQALABAIAEQALAGAAAHQAAAIgLAFQgMAGgQAAQgPAAgMgGgAgLgSIgFACIAFgCg");
	this.shape_105.setTransform(149.05,30.725);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_105},{t:this.shape_104}]}).wait(1));

	// Layer_24
	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f().s("#000000").ss(1,0,0,3).p("AgnABQAAgHAMgFIAQgFQgFABgDACQgIAEAAAHQAAAFAIAEIATAFIASgFQAIgEAAgFQAAgHgIgEQgEgDgFgBQALACAIAEQALAFAAAHQAAAIgLAGQgMAGgQAAQgQAAgLgGQgMgGAAgIg");
	this.shape_106.setTransform(158.05,48.3954);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#FFFFFF").s().p("AgbANQgMgFAAgIQAAgHAMgGIAMgDIgEABQgHAFAAAGQAAAFAHAFIATAEIATgEQAHgFABgFQgBgGgHgFQgEgCgGgBQALABAIAEQALAGAAAHQAAAIgLAFQgMAGgQAAQgPAAgMgGgAgLgSIgEACIAEgCg");
	this.shape_107.setTransform(158.05,48.525);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_107},{t:this.shape_106}]}).wait(1));

	// Layer_23
	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f().s("#000000").ss(1,0,0,3).p("AgnABQAAgHAMgFIAQgFQgFABgDACQgIAEAAAHQAAAFAIAEIATAFIASgFQAIgEAAgFQAAgHgIgEQgEgDgFgBQALACAIAEQALAFAAAHQAAAIgLAGQgMAGgQAAQgQAAgLgGQgMgGAAgIg");
	this.shape_108.setTransform(158.05,38.5954);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#FFFFFF").s().p("AgbANQgMgFAAgIQAAgHAMgGIAMgDIgEABQgHAFAAAGQAAAFAHAFIATAEIATgEQAHgFABgFQgBgGgHgFQgEgCgGgBQALABAIAEQALAGAAAHQAAAIgLAFQgMAGgQAAQgPAAgMgGgAgLgSIgEACIAEgCg");
	this.shape_109.setTransform(158.05,38.725);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_109},{t:this.shape_108}]}).wait(1));

	// Layer_22
	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f().s("#000000").ss(1,0,0,3).p("AgnABQAAgHAMgFIAQgFQgFABgDACQgIAEAAAHQAAAFAIAEIATAFIASgFQAIgEAAgFQAAgHgIgEQgEgDgFgBQALACAIAEQALAFAAAHQAAAIgLAGQgMAGgQAAQgQAAgLgGQgMgGAAgIg");
	this.shape_110.setTransform(158.05,29.1954);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#FFFFFF").s().p("AgbANQgMgFAAgIQAAgHAMgGIALgDIgDABQgHAFAAAGQAAAFAHAFIATAEIATgEQAHgFABgFQgBgGgHgFQgEgCgGgBQALABAIAEQALAGAAAHQAAAIgLAFQgMAGgQAAQgPAAgMgGgAgLgSIgFACIAFgCg");
	this.shape_111.setTransform(158.05,29.325);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_111},{t:this.shape_110}]}).wait(1));

	// Layer_21
	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f().s("#000000").ss(1,0,0,3).p("AgnABQAAgHAMgFIAQgFQgFABgDACQgIAEAAAHQAAAFAIAEIATAFIASgFQAIgEAAgFQAAgHgIgEQgEgDgFgBQALACAIAEQALAFAAAHQAAAIgLAGQgMAGgQAAQgQAAgLgGQgMgGAAgIg");
	this.shape_112.setTransform(158.05,18.5954);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#FFFFFF").s().p("AgbANQgMgFAAgIQAAgHAMgGIALgDIgDABQgHAFAAAGQAAAFAHAFIATAEIATgEQAHgFABgFQgBgGgHgFQgEgCgGgBQALABAIAEQALAGAAAHQAAAIgLAFQgMAGgQAAQgPAAgMgGgAgLgSIgFACIAFgCg");
	this.shape_113.setTransform(158.05,18.725);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_113},{t:this.shape_112}]}).wait(1));

	// Layer_20
	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f().s("#000000").ss(1,0,0,3).p("AgnABQAAgHAMgFIAQgFQgFABgDACQgIAEAAAHQAAAFAIAEQAIAFALAAIASgFQAIgEAAgFQAAgHgIgEQgEgDgFgBQALACAIAEQALAFAAAHQAAAIgLAGQgMAGgQAAQgQAAgLgGQgMgGAAgIg");
	this.shape_114.setTransform(149.05,20.5954);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#FFFFFF").s().p("AgbANQgMgFAAgIQAAgHAMgGIAMgDIgEABQgHAFAAAGQAAAFAHAFQAIAEALAAIATgEQAHgFABgFQgBgGgHgFQgEgCgGgBQALABAIAEQALAGAAAHQAAAIgLAFQgMAGgQAAQgPAAgMgGgAgLgSIgEACIAEgCg");
	this.shape_115.setTransform(149.05,20.725);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_115},{t:this.shape_114}]}).wait(1));

	// Layer_19
	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f().s("#000000").ss(1,0,0,3).p("AgnABQAAgHAMgFIAQgFQgFABgDACQgIAEAAAHQAAAFAIAEIATAFIASgFQAIgEAAgFQAAgHgIgEIgJgEQALACAIAEQALAFAAAHQAAAIgLAGQgMAGgQAAQgQAAgLgGQgMgGAAgIg");
	this.shape_116.setTransform(140.05,22.5954);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#FFFFFF").s().p("AgbANQgMgFAAgIQAAgHAMgGIALgDIgDABQgHAFAAAGQAAAFAHAFIATAEIATgEQAHgFABgFQgBgGgHgFIgKgDQALABAIAEQALAGAAAHQAAAIgLAFQgMAGgQAAQgPAAgMgGgAgLgSIgFACIAFgCg");
	this.shape_117.setTransform(140.05,22.725);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_117},{t:this.shape_116}]}).wait(1));

	// Layer_18
	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f().s("#000000").ss(1,0,0,3).p("AgnABQAAgHAMgFIAQgFQgFABgDACQgIAEAAAHQAAAFAIAEIATAFIASgFQAIgEAAgFQAAgHgIgEIgJgEQALACAIAEQALAFAAAHQAAAIgLAGQgMAGgQAAQgQAAgLgGQgMgGAAgIg");
	this.shape_118.setTransform(140.05,32.5954);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#FFFFFF").s().p("AgbANQgMgFAAgIQAAgHAMgGIALgDIgDABQgHAFAAAGQAAAFAHAFIATAEIATgEQAHgFABgFQgBgGgHgFIgKgDQALABAIAEQALAGAAAHQAAAIgLAFQgMAGgQAAQgPAAgMgGgAgLgSIgFACIAFgCg");
	this.shape_119.setTransform(140.05,32.725);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_119},{t:this.shape_118}]}).wait(1));

	// Layer_17
	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f().s("#000000").ss(1,0,0,3).p("AgnABQAAgHAMgFIAQgFQgFABgDACQgIAEAAAHQAAAFAIAEIATAFIASgFQAIgEAAgFQAAgHgIgEIgJgEQALACAIAEQALAFAAAHQAAAIgLAGQgMAGgQAAQgQAAgLgGQgMgGAAgIg");
	this.shape_120.setTransform(140.05,41.7954);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#FFFFFF").s().p("AgbANQgMgFAAgIQAAgHAMgGIALgDIgDABQgHAFAAAGQAAAFAHAFIATAEIATgEQAHgFABgFQgBgGgHgFIgKgDQALABAIAEQALAGAAAHQAAAIgLAFQgMAGgQAAQgPAAgMgGgAgLgSIgFACIAFgCg");
	this.shape_121.setTransform(140.05,41.925);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_121},{t:this.shape_120}]}).wait(1));

	// Layer_16
	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f().s("#000000").ss(1,0,0,3).p("AAkg6IgBAAIgBABIgFACIAAgJIAFADIACADIAAAQIAAAqIAAA3IAAAhIAIAHIAAAsIgCACQgJAGgNAAIgFAAIgBAAIg5ggIAAgZAAkgqIgCABIgfAGQgRAAgNgGIgFgDIAAgQIAEgDAAkBYIAAAJIgEAHQgDADAAAEIACAIIAAABIgMAFIgLgBIgBAAIgngbIAAgbAgch0IAAgUQAAgBABAAQAMgJAQAAQAQgBALAJIAAAWIgSAAAgJiJIAKgDIAMADIAFAGIgFAHIgMACIgKgCQgFgDAAgEQAAgDAFgDgAAchmIAAgOAAdhAIgBgmIgCAAIgaAEIgcgFIAAgNIAUAAAgcg5IAAgBIgEgCAgchnIAAAoIAAAGIABAAQANAGARAAIAagEAAkAAIgFACQgMAFgQAAIgbgFIgIgEIAAgqAgBAhQABgFACgDQAFgEAGAAQAGAAAFAEQAEAEAAAGIgEAKQgFAEgGAAAgBAhIADgBQAFAAADAEQAEADAAAFIgBAFQgGAAgFgEQgDgEAAgGgAAkA3IgeAFQgRAAgNgGIgBgBIgHgEAggBhIgLgHIAAgMIADgCIAIgGIAAgVIAAgz");
	this.shape_122.setTransform(158.6764,73.8236);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#FEFE00").s().p("AAPCTIgBAAIg5ggIAAgZIAAgMIADgCIAIgGIAAgVIAHAEIABABQANAGARAAIAegFIAAAhIAIAHIAAAsIgCACQgJAGgNAAgAAHB8IABAAIALABIAMgFIAAgBIgCgIQAAgEADgDIAEgHIAAgJIAAAJIgEAHQgDADAAAEIACAIIAAABIgMAFIgLgBIgBAAIgngbIAAgbIAAAbIgLgHIALAHgAggBhgAgYA2IgBgBIgHgEIAAgzIAAgqIAAgQIAEgDIAAAGIABAAQANAGARAAIAagEIAFgCIABgBIABAAIAAAQIgCABIgfAGQgRAAgNgGIgFgDIAFADQANAGARAAIAfgGIACgBIAAAqIgFACQgMAFgQAAIgbgFIgIgEIAIAEIAbAFQAQAAAMgFIAFgCIAAA3IgeAFQgRAAgNgGgAACAZQgCADgBAFIAAACQAAAGADAEQAFAEAGAAQAGAAAFgEIAEgKQAAgGgEgEQgFgEgGAAQgGAAgFAEgAgcg6IAAABIAAgBIgEgCgAggAxgAAkAAgAAkgqgAgbg5IgBAAIAAgGIAAgoIAAgNIAUAAIgUAAIAAgUIABgBQAMgJAQAAQAQgBALAJIAAAWIgSAAIASAAIAAAOIgCAAIgaAEIgcgFIAcAFIAagEIACAAIABAmIAAAJIgaAEQgRAAgNgGgAgOiDQAAAEAFADIAKACIAMgCIAFgHIgFgGIgMgDIgKADQgFADAAADIAAAAgAAdg3gAAdhAIAFADIACADIgBAAIgBABIgFACgAAkg6gAgch0gAgJh8QgFgDAAgEQAAgDAFgDIAKgDIAMADIAFAGIgFAHIgMACgAgJiJg");
	this.shape_123.setTransform(158.675,73.8236);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_123},{t:this.shape_122}]}).wait(1));

	// Layer_15
	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f().s("#000000").ss(1,0,0,3).p("AgJiJIAKgDIAMADIAFAGIgFAHIgMACIgKgCQgFgDAAgEQAAgDAFgDgAAchmIgCAAIgaAEIgcgFIAAgNIAAgUIABgBQAMgJAQAAQAQgBALAJIAAAWIAAAOIABAmIAFADIACADIAAAQIgCABQgNAGgSAAIgegGIgFgDIAAgQIAEgDIAAAGIAAgBIgEgCAgcg5IABAAQANAGARAAIAagEIAAgJAgch0IAUAAAgcg/IAAgoAAkg6IgBAAIgBABIgFACAAKh0IASAAAAkBYIAAAJIgEAHQgDADAAAEIACAIIAAABQgFAFgHAAIgLgBIgBAAIgngbIAAgbAAkAAIgFACIgcAFQgQAAgLgFIgIgEAAkAAIAAA3IAAAhIAIAHIAAAsIgCACQgJAGgNAAIgFAAIgBAAIg5ggIAAgZIAAgMIADgCIAIgGIAAgVIAAgzIAAgqAANAxQgGAAgFgEQgDgEAAgGIAAgCIADgBQAFAAADAEQAEADAAAFgAgBAhQABgFACgDQAFgEAGAAQAGAAAFAEIAEAKIgEAKQgFAEgGAAAggBhIgLgHAAkA3QgNAFgRAAQgRAAgNgGIgBgBIgHgEAAkgqIAAAq");
	this.shape_124.setTransform(149.2764,75.7236);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#FEFE00").s().p("AAPCTIgBAAIg5ggIAAgZIAAgMIADgCIAIgGIAAgVIAAgzIAAgqIAFADIAeAGQASAAANgGIACgBIAAAqIgFACIgcAFQgQAAgLgFIgIgEIAIAEQALAFAQAAIAcgFIAFgCIAAA3QgNAFgRAAQgRAAgNgGIgBgBIgHgEIAHAEIABABQANAGARAAQARAAANgFIAAAhIAAAJIgEAHQgDADAAAEIACAIIAAABQgFAFgHAAIgLgBIgBAAIgngbIAAgbIAAAbIgLgHIALAHIAnAbIABAAIALABQAHAAAFgFIAAgBIgCgIQAAgEADgDIAEgHIAAgJIAIAHIAAAsIgCACQgJAGgNAAgAACAZQgCADgBAFIAAACQAAAGADAEQAFAEAGAAQAGAAAFgEIAEgKIgEgKQgFgEgGAAQgGAAgFAEgAggBhgAAkA3gAAkAAgAgbgpIgFgDIAAgQIAEACIAAABIAAgBIgEgCIAEgDIAAgoIAAgNIAUAAIgUAAIAAgUIABgBQAMgJAQAAQAQgBALAJIAAAWIgSAAIASAAIAAAOIABAmIAAAJIAFgCIABgBIABAAIAAAQIgCABQgNAGgSAAgAADgzIAagEIgaAEQgRAAgNgGIgBAAIAAgGIAAAGIABAAQANAGARAAIAAAAgAAAhiIAagEIACAAIgCAAIgaAEIgcgFgAgOiDQAAAEAFADIAKACIAMgCIAFgHIgFgGIgMgDIgKADQgFADAAADIAAAAgAgggsgAAdhAIAFADIACADIgBAAIgBABIgFACgAgcg5gAAkg6gAgch0gAgJh8QgFgDAAgEQAAgDAFgDIAKgDIAMADIAFAGIgFAHIgMACgAgJiJg");
	this.shape_125.setTransform(149.275,75.7236);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_125},{t:this.shape_124}]}).wait(1));

	// Layer_14
	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f().s("#000000").ss(1,0,0,3).p("Agch0IAAgUQAAgBABAAQAMgJAQAAQAQgBALAJIAAAWIgSAAAAchmIAAgOAAchmIgCAAIgaAEIgcgFIAAgNIAUAAAAkg6IgBAAIgBABIgFACIAAgJIgBgmAAkgqIgCABQgNAGgSAAQgRAAgNgGIgFgDIAAgQIAEgDIAAAGIABAAQANAGARAAIAagEAAkg6IAAAQIAAAqIgFACIgcAFQgQAAgLgFIgIgEIAAgqAAdhAIAFADIACADAgJiJIAKgDIAMADIAFAGIgFAHIgMACIgKgCQgFgDAAgEQAAgDAFgDgAgcg5IAAgBIgEgCAgchnIAAAoAgBAhQABgFACgDQAFgEAGAAQAGAAAFAEQAEAEAAAGQAAAGgEAEQgFAEgGAAQgGAAgFgEQgDgEAAgGIAAgCIADgBQAFAAADAEQAEADAAAFIgBAFAggBGIAAgVAgrBaIAAgMIADgCIAIgGAAkA3QgNAFgRAAQgRAAgNgGIgBgBIgHgEIAAgzAAkBYIAAAJIgEAHQgDADAAAEIACAIIAAABIgMAFIgLgBIgBAAIgngbIAAgbAAkBYIAIAHIAAAsIgCACQgJAGgNAAIgFAAIgBAAIg5ggIAAgZAggBhIgLgHAAkAAIAAA3IAAAh");
	this.shape_126.setTransform(139.8764,77.2736);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#FEFE00").s().p("AAPCTIgBAAIg5ggIAAgZIALAHIgLgHIAAgMIADgCIAIgGIAAgVIAAgzIAIAEQALAFAQAAIAcgFIAFgCIAAA3QgNAFgRAAQgRAAgNgGIgBgBIgHgEIAHAEIABABQANAGARAAQARAAANgFIAAAhIAAAJIgEAHQgDADAAAEIACAIIAAABIgMAFIgLgBIgBAAIgngbIAAgbIAAAbIAnAbIABAAIALABIAMgFIAAgBIgCgIQAAgEADgDIAEgHIAAgJIAIAHIAAAsIgCACQgJAGgNAAgAACAZQgCADgBAFIAAACQAAAGADAEQAFAEAGAAQAGAAAFgEQAEgEAAgGQAAgGgEgEQgFgEgGAAQgGAAgFAEgAggBhgAAkA3gAgYACIgIgEIAAgqIAFADQANAGARAAQASAAANgGIACgBIAAAqIgFACIgcAFQgQAAgLgFgAgggCgAgbgpIgFgDIAAgQIAEgDIAAgoIAAgNIAUAAIgUAAIAAgUIABgBQAMgJAQAAQAQgBALAJIAAAWIgSAAIASAAIAAAOIgCAAIgaAEIgcgFIAcAFIAagEIACAAIABAmIAAAJIAAgJIAFADIACADIgBAAIgBABIgFACIAFgCIABgBIABAAIAAAQIgCABQgNAGgSAAQgRAAgNgGgAADgzIAagEIgaAEQgRAAgNgGIgBAAIAAgGIAAAGIABAAQANAGARAAIAAAAgAgcg6IAAABIAAgBIgEgCgAgOiDQAAAEAFADIAKACIAMgCIAFgHIgFgGIgMgDIgKADQgFADAAADIAAAAgAgggsgAAch0gAgJh8QgFgDAAgEQAAgDAFgDIAKgDIAMADIAFAGIgFAHIgMACgAgJiJg");
	this.shape_127.setTransform(139.875,77.2736);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_127},{t:this.shape_126}]}).wait(1));

	// Layer_13
	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f().s("#000000").ss(1,0,0,3).p("AgPAKIAAgBIAAgBQAAgDAEgCIAEgCIAAgXIAHgBIAHACIAAAWIAAAKIgHABIgHgBIAAgKAgOAMIAAAAIADADIAEABIAHABIAHgBIAEgBIACgCIABgBIABgCIAAAEIgBgCAgPAKIABACIgBACgAAHABIAEACIAFAGIgBABAAPAQIAAgCIABABIgBABIgCAEIgCABIgEACIgHABIgHgBIgEgCIgDgCIgBgDIAAgC");
	this.shape_128.setTransform(137.5967,97.6278);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#CCCCCC").s().p("AgGAXIgEgCIgEgCIgBgCIAAgCIABgDIAAAAIAEADIAEACIAGABIAIgBIADgCIACgCIABgBIgBABIgCACIgDACIgIABIgGgBIgEgCIgEgDIAAAAIgBgCIAAgBIAAgBQAAgDAFgCIAEgCIAAgXIAGgBIAIACIAAAWIAAAKIgIABIgGgBIAAgKIAAAKIAGABIAIgBIAAgKIADACIAFAGIAAABIgCACIACADIAAACIgDADIgCABIgDACIgIABg");
	this.shape_129.setTransform(137.55,97.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_129},{t:this.shape_128}]}).wait(1));

	// Layer_12
	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f().s("#000000").ss(1,0,0,3).p("AgnABQAAgHAMgFIAQgFQgFABgDACQgIAEAAAHQAAAFAIAEIATAFIASgFQAIgEAAgFQAAgHgIgEIgJgEQALACAIAEQALAFAAAHQAAAIgLAGQgMAGgQAAQgQAAgLgGQgMgGAAgIg");
	this.shape_130.setTransform(140.05,51.9954);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#FFFFFF").s().p("AgbANQgMgFAAgIQAAgHAMgGIAMgDIgEABQgHAFAAAGQAAAFAHAFIATAEIATgEQAHgFABgFQgBgGgHgFIgKgDQALABAIAEQALAGAAAHQAAAIgLAFQgMAGgQAAQgPAAgMgGgAgLgSIgEACIAEgCg");
	this.shape_131.setTransform(140.05,52.125);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_131},{t:this.shape_130}]}).wait(1));

	// Layer_11
	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f().s("#000000").ss(1,0,0,3).p("AAIgFQAAgFABgEIAIgJQAFAAAFAGIAGAQQACAJgDAIQgDAHgEABQgFABgFgHQgDgDgCgFAAIgFIAHgBIACAPIgHABIgoAFIgCgPg");
	this.shape_132.setTransform(56.9718,-24.8701);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#FF6633").s().p("AAOASQgCgDgCgFIAHgBIgCgPIgHABQAAgFABgEIAIgJQAFAAAFAGIAGAQQACAJgEAIQgCAHgEABIgCAAQgEAAgFgGgAghAAIApgFIAHgBIACAPIgHABIgpAFg");
	this.shape_133.setTransform(57,-24.8701);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_133},{t:this.shape_132}]}).wait(1));

	// Layer_10
	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f().s("#333333").ss(1,0,0,3).p("AAIgFIAHgBIACAPIgHABAAIgFQAAgFABgEQADgIAFgBQAFAAAFAGIAGAQQACAJgDAIQgDAHgEABQgFABgFgHQgDgDgCgFIgoAFIgCgPg");
	this.shape_134.setTransform(53.4718,25.0799);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#FF6633").s().p("AAPASQgEgDgBgFIAHgBIgCgPIgHABQgBgFACgEQADgIAFgBQAFAAAFAGIAGAQQACAJgEAIQgCAHgEABIgCAAQgEAAgEgGgAghAAIApgFIAHgBIACAPIgHABIgpAFg");
	this.shape_135.setTransform(53.5,25.0799);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_135},{t:this.shape_134}]}).wait(1));

	// Layer_9
	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f().s("#000000").ss(1,0,0,3).p("AgQhaIAzCLIgQA0IgCAAIgziMg");
	this.shape_136.setTransform(42.7231,20.8484);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#818100").s().p("AARBgIgziMIASgzIAzCLIgQA0g");
	this.shape_137.setTransform(42.725,21.325);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_137},{t:this.shape_136}]}).wait(1));

	// Layer_8
	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f().s("#000000").ss(1,0,0,3).p("AAIBpIgCAAIg2iXIATg5IAYgCIA2CSIgBADIgXACIABADgAAwAsIgUA+IgUgBAgdhnIA2CV");
	this.shape_138.setTransform(34.5784,22.7945);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#818100").s().p("AAIBpIASg5IgBgCIAXgCIgXACIABACIgSA5IgCAAIg2iXIATg5IAYgCIA2CSIgBADIgUA+gAAZAuIg2iVg");
	this.shape_139.setTransform(34.575,22.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_139},{t:this.shape_138}]}).wait(1));

	// Layer_7
	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f().s("#000000").ss(1,0,0,3).p("ACRgvIgGABIABgBIADAAIACAAIACAAIAGAGQAFAHABALQACALgDAIIgEAHIgEABIgDAAIgSADIgEACIgEAAIgHgGIgDgEIAQgDAB4gqQADAAAEAGIADAEIAEAOQABALgDAHIgDAHIgIACABsgbIATgDABygpIAGgBIATgEABygpIADgBIADAAABsgbIABgHQACgGADgBACTAEIAHgBAiYAuIgCgCIgEgKIgBgKQABgFADAAIADABIACACIAEAKIAAAKIgBADIgCACgAiTAtIgFABAiYAUIACAAIECgvABvgBIkCAu");
	this.shape_140.setTransform(35.3737,41.5797);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#FF6633").s().p("AiaAtIgEgKIgBgKQABgEADgBIADABIACACIAEAKIAAAKIgBADIgFABgAiSArIAAgKIgEgKIAAgCIECgvIABgHQACgFADgCIAGgBQADAAAEAGIADAFIAEANIAAAIQAAAGgCAEIgDAHIgIACIgHgGIgDgEIAQgDIgQADIkCAugABsgaIATgDgACBAIgACEABQACgEAAgGIAAgIIgEgNIgDgFQgEgGgDAAIATgEIAGgBIACABIAGAFQAFAIABALQACAKgDAJIgEAGIgHACIgSACg");
	this.shape_141.setTransform(35.375,41.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_141},{t:this.shape_140}]}).wait(1));

	// Layer_6
	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f().s("#000000").ss(1,0,0,3).p("AigAKIAZgGQAEAAAEADIADADIAEAJIABAIAiVAtIgCAAQgEABgEgEQgFgEgCgHQgCgIABgGIAGgHIABAAIAIACIAHAMIACAJIgBAEQgBAGgEACIAYgFQAFgCABgGIAAgFIEYg3IAAAAIAAAAIAAgEIgBgKIgCgDIkaA3");
	this.shape_142.setTransform(-138.1746,-14.9563);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#FF6633").s().p("AibArQgFgEgCgIQgDgHACgGIAFgIIACAAIAIADIAHALIABAKIAAADQgBAHgFABIgBABIgBAAQgEAAgDgDgAiSAtQAFgBABgHIAAgDIgBgKIgHgLIgIgDIAYgFQAEgBAEAEIADADIAEAIIACAJIgCgJIgEgIIEbg4IABAEIACAJIgBAEIAAABIkXA3IgBAFQgBAGgEACIgZAEIAAAAgAicAKg");
	this.shape_143.setTransform(-138.5281,-15.0219);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_143},{t:this.shape_142}]}).wait(1));

	// Layer_5
	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f().s("#000000").ss(1,0,0,3).p("AgHgJIAhAAIADAIIAAAFIgiADAgHgJIADAJIgBAHIAAADIgBADQgDAGgFAAQgFABgEgFIgFgNQgBgIADgGQADgGAFAAQAEgBAEAFIACACIAAABg");
	this.shape_144.setTransform(-160.3625,15.225);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#FF6633").s().p("AgXAPIgFgNQgBgIADgGQADgGAFAAQAEgBAEAFIACACIAAABIABACIADAJIgBAHIABgHIgDgJIAhAAIADAIIAAAFIgiADIAAADIgBADQgDAGgFAAIgBAAQgEAAgEgEg");
	this.shape_145.setTransform(-160.3625,15.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_145},{t:this.shape_144}]}).wait(1));

	// Layer_4
	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f().s("#000000").ss(1,0,0,3).p("AgHgJIAhAAIADAIIAAAFIgiADAgHgJIADAJIgBAHIAAADIgBADQgDAGgFAAQgFABgEgFIgFgNQgBgIADgGQADgGAFAAQAEgBAEAFIACACIAAABg");
	this.shape_146.setTransform(-151.5625,61.875);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#FF6633").s().p("AgXAPIgFgNQgBgIADgGQADgGAFAAQAEgBAEAFIACACIAAABIABACIADAJIgBAHIABgHIgDgJIAhAAIADAIIAAAFIgiADIAAADIgBADQgDAGgFAAIgBAAQgEAAgEgEg");
	this.shape_147.setTransform(-151.5625,61.875);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_147},{t:this.shape_146}]}).wait(1));

	// Layer_3
	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f().s("#000000").ss(1,0,0,3).p("AhZhdIgdghIAAgBIAVgDIAmgHIAMAOIAhgFIgMgOIA5gKIALANIAegGIgLgMIAygIIALAMIAYgDIgLgNIA6gKIAZAfIAAABIABAbIAAAZIgDAlQgFAogOAiIgIATQgXAxgjAVQgLAHgNAEIk7A9QAggIAYgcIAGgIIAPgYIAGgNQAMgdAJglIADgNIAFgaIACgSgADaiTIkzAzIAAAD");
	this.shape_148.setTransform(163.0681,-1.935);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f().s("#000000").ss(1,0,0,3).p("Ah/mmIFmg/IACABIADADQAUAPAKAQIABADIAAAoIguAIIgBgYIghAFIABAYIguAIIgKAWIgEAJIgNAmIgGAbIgBAEQgLA4gBA/QgBBhAXBvIADAQQAOA/ATA4AiNFgIgBgBQhChmggiJQggiMAHhkIgBAAQAAhGANg+QAciHBJgXIAZgEAg5l0IAAATIAVgDIAWgEIAfgFIgBgZIAhgFIABAYIAcgEIALACAEKnCIlAA1IgDgCIAAAbIgGAKQhEAbgYBqQgdCDAmCpQAmCrBTBuQAdAoAeAXIARgJQgYgWgZggQhShugmirQgmipAdiDQAUhWApgkIAJgCAjSjbIACgKIACgGQAfh8BDgNQAOgDAfANABzElQhChmghiTQglipAciDQAHgfAKgXQAIgXAMgRIAKgOABYFqIgIgKQhShugmirQgmipAdiDQAVhaAOgpAgklkQgOAqgUBVQgdCDAmCpQAmCrBSBuIAUAYIAJgOABXl5IARgDIgBgXIAhgFIABAXIAFgBABOl3IAJgCAB9D5Qgxhbgbh4QgmipAdiDIAEgQQAIggAMgYIAKgSIAPgVIAEgDIgGgBAg5mPQgjgYgjABAjyjvIAHgDIAHADIACAHIgCAHIgHADQgEAAgDgDQgDgDABgEQgBgEADgDgAjSjbIgDALQgLAygBA5QgDBaAYBnQAMA3ARAxIAHASQAQAtAWAnQAVAoAaAjIAQATQApAlAqgIIAPgEIADgCAjhhlIABADQAChAAMg5ACGC0IgCAUIgCAPIAAABIgFAhIgHAhIgDALQgLApgQAcABPF4QgNATgPALAiNFgIgBgBIACACIAAAAIACAEIgDgFIABABAAsHlIgIABIgbABQhAgJhEhiIgRgb");
	this.shape_149.setTransform(137.813,-32.6647);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#00FE00").s().p("AgfGCIgQgUQgagigVgoQgWgogQgtIgHgSQgRgwgMg3QgYhoADhZIABACQAChAAMg4IACgLIACgFQAfh9BDgNQAOgCAfANQhEAbgYBpQgNA6AABAQAABUAWBfQAmCqBSBuQAeAoAeAYIgDABIgPAEIgPACQgjAAghgegABGGZQgegYgegoQhShugmiqQgWhfAAhUQAAhAANg6QAYhpBEgbIAGgKIAAATIAVgEIAVgDIAggGIgBgYIAhgFIABAYIAcgFIALADIgPAUIgKASQgMAZgIAgIgEAPQgNA6AABAQAABUAWBfQAbB4AxBaQgxhagbh4QgWhfAAhUQAAhAANg6IAEgPQAIggAMgZIAKgSIAPgUIAEgEIgGAAIARgDIgBgYIAhgFIABAXIAFAAIgKAVIgEAKIgNAmIgGAbIgBADQgLA5gBA/QgBBgAXBwIADAPQAOBAATA4IgUADIAAABIgCAUIgCAPIAAABIgFAgIgHAhIgDAMQhChmghiTQgWhfAAhUQAAhAANg6QAHgeAKgYQAIgXAMgRIAKgOIgKAOQgMARgIAXQgKAYgHAeQgNA6AABAQAABUAWBfQAhCTBCBmQgLAogQAcIgIgKQhThugliqQgWhfAAhUQAAhAANg6QAUhZAOgpQgOApgUBZQgNA6AABAQAABUAWBfQAlCqBTBuIAIAKIgJAPIgUgZQhThugliqQgWhfAAhUQAAhAANg6QAUhVAOgqQgOAqgUBVQgNA6AABAQAABUAWBfQAlCqBTBuIAUAZQgNASgPALQgYgVgZghQhShugmiqQgWhfAAhUQAAhAANg6QAUhWApgkIAJgBIgJABQgpAkgUBWQgNA6AABAQAABUAWBfQAmCqBSBuQAZAhAYAVIgRAKIAAAAgAgblwIAAAAg");
	this.shape_150.setTransform(134.213,-32.0281);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#00B6B6").s().p("AhIErIAAAAIAVgEIAngGIAMANIAfgEIgMgPIA6gJIALAMIAegFIgLgNIAzgIIAKANIAYgEIgLgNIA7gJIAYAeIAAABIkzAzIAAADgAkHj9IAAgbIADACIFAg1IABADIAAAoIguAHIgBgXIggAEIABAZIguAIIgFABIgCgYIggAGIABAXIgRADIgJACIgcAEIgBgYIghAFIABAYIghAGIgWADIgUAEg");
	this.shape_151.setTransform(158.45,-44.55);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#808080").s().p("AjhF8IgRgbIgCgCIAAAAQhChmggiJQggiMAHhkIgBAAQAAhGANg+QAciHBJgXIAZgEIFmg/IACABIADACQAUAPAKARIlAA1IgDgCIgCgBIAAAAIAAAAIgCgBIgCgCIgCgBQgdgSgegBIAAAAIAAAAIgCAAIgBABIABgBIACAAIAAAAIAAAAQAeABAdASIACABIACACIACABIAAAAIAAAAIACABIAAAbIgGAKQgfgNgOACQhDAOgfB8IgCAFIgCALIgDAKQgLAzgBA5QABg5ALgzIADgKQgNA4gBBBIgBgDQgDBaAYBnQAMA3ARAwIAHASQAQAuAWAnQAVAoAaAiIAQAUQApAkArgIIAPgDIADgCIARgJQAPgMANgSIAJgOQAPgcALgpIADgMIAHghIAFggIAAgBIACgPIACgUIAdAhIAAgDIEzgzIACAbIAAAZIgDAlQgGAogNAkIgIATQgXAwgjAWQgMAGgMAFIk7A9QAggJAXgcIAFgHIAPgZIAGgNQANgcAIgmIADgNIAFgaIADgTIAFhCIgFBCIgDATIgFAaIgDANQgIAmgNAcIgGANIgPAZIgFAHQgXAcggAJIgIABIgbABQhBgJhEhigAlYjvQgDADABAEQgBAEADADQADACAEABIAHgDIACgHIgCgHIgHgDgAg5HlIAAAAgAifmPIAAAAg");
	this.shape_152.setTransform(148.038,-32.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148}]}).wait(1));

	// Layer_2
	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f().s("#000000").ss(1,0,0,3).p("AAUBvIgGgGIg9hCIAlhsIgSghIgBgCAAxgUIg3hVIAAAAIgCgHAAugzIgkg5");
	this.shape_153.setTransform(180.5234,-8.8296);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f().s("#000000").ss(1,0,0,3).p("AhPnBIAVgEAhsm0QAEgBgCgHIAbgFAi/CkIgBAAIgBgDIgNgfQgSgvgMg2IgLg7QgZieAfh3IAFgTQANgpARgZQAVgeAbgLIAbgFIAWACIABAAQAPADAOAJQAmAWAkA5QBCBoAZCeQANBTgCBKIAAAJQgBB0gmBrIgIAYIAWgSQAMgNAMgTQAegwACgxIAAgDIAAgFIAAhDIAAgDIABgVIAAgJQADhKgOhTQgZiehChoQgYgkgugpIgkgcAgpnJIAggHQBMgLBKBmQBMBoAdChQAdChgiB8QgSBAgdAlIgEAGIgDACIgDADIgtARACMEtIgBABQgPgYAAgHQAAgEAQgYQAGgJAFgeIAKhFIAAgeIAAgDIABgVIAAgJQAChJgNhUQgZiehDhoQgdgugzglQgUgPgRgIIARgEQA8gGBJByQBDBoAZCeIADAXIAGCfIACAWQADAxgRAvQgMAdgdA7IAAABIgBAEQgSBOgJASQgZAwgTAQIhhAAAioCgIgDgGQgVgrgOgzQgJgjgHgmQgYiIAZhnQAGgdAJgVQAYg4AqgIIAbAAQAQAEARALQAbATAbAoIABADQA5BYAYCHQAXCGgYBnQgQBGggAcQgOANgTAEQgsAIgrgxAgkkSIAEAHQAyBRAVB8QAUB7gVBfIgBAEQgPBBgdAYQgQgOgQgVQhChSghiEQghiDAThoQAOhIAigeAiYCdIgDgEQgihGgRhhQgUh7AUheQAWhiAzgJIALgBIASACQAiALAiA0QgLAYgEAnQgKBbAfB1QAIAdAKAbIAWA4QANAbAOAYAhzDaIgDgEIABABgAgHD5IgBACQgMAIgNADQgpAIgpg0ADiATQAHAAAFAGQAFAFAAAIQAAAIgFAGQgFAFgHAAQgHAAgFgFQgFgGAAgIQAAgIAFgFQAFgGAHAAgAAyFKIgWBCQgOAlgPARQgJALgKAEIgJABIgBAAIgKgCQgLgDgOgLIghgbQgfgdgOgRIgFgG");
	this.shape_154.setTransform(196.8868,-35.4538);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#FFFFFF").s().p("AhUCnIgXg4QgJgcgIgeQgghzALhcQAEgmAKgYIAFAGQAyBRAVB9QAVB7gVBfIgBADQgPgXgNgbgAB4BtQgFgFAAgIQAAgIAFgGQAFgFAHAAQAHAAAFAFQAFAGAAAIQAAAIgFAFQgFAGgHAAQgHAAgFgGg");
	this.shape_155.setTransform(206.3188,-41.225);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#00FE00").s().p("AgZEBIgCgEIACAEIgDgEIABAAIgjg5IgDgEQgihHgRhhQgUh6AUhfQAWhhAzgKIALgBIASADQAhALAiA0QgLAYgEAmQgKBcAfBzQAIAeAKAcIAXA4QANAbAOAXQgPBCgeAYQgQgPgQgUQhBhSghiEQgVhSAAhHQAAgrAHgnQAOhJAigdQgiAdgOBJQgHAnAAArQAABHAVBSQAhCEBBBSQAQAUAQAPIgBABQgMAJgNACIgLACQgjAAgjgtgAgdDhIAAABIAAAAIAAgBIAAAAIAAAAg");
	this.shape_156.setTransform(187.8875,-39.3462);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#C0C0C0").s().p("AgdHSIAJgBQAKgEAJgLQAPgRAOglIAWhCIAWgSQAMgNAMgTQAegwACgxIAAgDIAAgFIAAhDIAAgDIABgVIAAgJIABgYQAAg+gMhHQgZiehChoQgYgkgugpIgkgcIAVgEQARAIAUAPQAzAlAdAuQBDBoAZCeQALBHAAA+IAAAYIAAAJIgBAVIAAADIAAAeIgKBFQgFAegGAJQgQAYAAAEQAAAHAPAYIABAAIAAgBQAdg7AMgdQAPgoAAgqIgBgOIgCgWIgGifIgDgXQgZiehDhoIgFgIIgDgFIAAAAQhBhfg1gBIgBAAIAAAAIgGABIAggHQBMgLBKBmQBMBoAdChQAdChgiB8QgSBAgdAlIgEAGIgDACIgDADIgtARIABgEIgBAEQgSBOgJASQgZAwgTAQgADWAZQgFAFAAAIQAAAIAFAGQAFAFAHAAQAHAAAFgFQAFgGAAgIQAAgIgFgFQgFgGgHAAQgHAAgFAGgAgeHSIgKgCQgLgDgOgLIghgbQgfgdgOgRIgFgGIAAAAIg+hBIAlhuIgSggIgCgDIACADIgBAAIgBgDIgNgfQgSgvgMg2IgLg7QgZieAfh3IAFgTQANgpARgZQAVgeAbgLIAbgFIAWACIABAAQAPADAOAJQAmAWAkA5QBCBoAZCeQALBHAAA+IAAAYIAAAJQgBB0gmBrIgIAYIgWBCQgOAlgPARQgJALgKAEIgJABgAgnEfIANgBQATgEAOgNQAggcAQhGQAMg0AAg9QAAg6gLhCQgYiHg5hYIgBgDQgbgogbgTQgRgLgQgEIgbAAQgqAIgYA4QgJAVgGAdQgNA0AAA9QAAA7AMBDQAHAmAJAjQAOAzAVArIADAGIgDgGQgVgrgOgzQgJgjgHgmQgMhDAAg7QAAg9ANg0QAGgdAJgVQAYg4AqgIIAbAAQAQAEARALQAbATAbAoIABADQA5BYAYCHQALBCAAA6QAAA9gMA0QgQBGggAcQgOANgTAEIgNABIAAAAIAAAAQgkgBgkgmIgBgBIgBgCIABACIABABQAkAmAkABIAAAAIAAAAgAhzDaQApA0ApgIQANgDAMgIIABgCQAdgYAPhBIABgEQAVhfgUh7QgVh8gyhRIgEgHQgig0gigLIgSgCIgLABQgzAJgWBiQgUBeAUB7QARBhAiBGIADAEIAjA6IgBgBgAhxD1Ig4hUIABgBIgBAAIgCgGIACAGIAAABgAAyFKgAA6EyQAmhrABh0IAAgJIAAgYQAAg+gLhHQgZiehChoQgkg5gmgWQgOgJgPgDQAEgBgCgHIAbgFIAkAcQAuApAYAkQBCBoAZCeQAMBHAAA+IgBAYIAAAJIgBAVIAAADIAABDIAAAFIAAADQgCAxgeAwQgMATgMANIgWASgACLEuQgPgYAAgHQAAgEAQgYQAGgJAFgeIAKhFIAAgeIAAgDIABgVIAAgJIAAgYQAAg+gLhHQgZiehDhoQgdgugzglQgUgPgRgIIARgEIAGgBIAAAAIABAAQA1ABBBBfIAAAAIADAFIAFAIQBDBoAZCeIADAXIAGCfIACAWIABAOQAAAqgPAoQgMAdgdA7IgBABgAipChg");
	this.shape_157.setTransform(196.8868,-35.4538);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153}]}).wait(1));

	// Layer_1
	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f().s("#000000").ss(1,0,0,3).p("AZBrDIAAADAdurqIAIgCIAFgBAbmrOIARgEIAKgBIAZgGAMeEKIgOADIgLACAsYg4IALgCAtREjIAJgCA7QIAIgMABIgJgDA8UB3IAEgBIAMABA90LtIgFABA7sJAIgEgFA5GBXIgfg7");
	this.shape_158.setTransform(4.4286,-6.9783);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#808080").s().p("AAGAAIAAAAIgLABg");
	this.shape_159.setTransform(-81.725,-23.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_159},{t:this.shape_158}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-223.8,-117.1,447.6,234.3);


(lib.shape132 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#000000").s().p("AgRARQgHgHAAgKQAAgKAHgHQAIgHAJAAQAKAAAIAHQAHAHAAAKQAAAKgHAHQgIAIgKAAQgJAAgIgIg");
	this.shape.setTransform(-366.35,257.95);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgRARQgHgHAAgKQAAgKAHgHQAIgHAJAAQAKAAAIAHQAHAHAAAKQAAAKgHAHQgIAIgKAAQgJAAgIgIg");
	this.shape_1.setTransform(-366.35,158.1);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-368.8,155.6,5,104.9);


(lib.shape123 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("AmDhjILyAAAszBkIZnAA");
	this.shape.setTransform(350.825,363.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("At3DDIAAmFIbvAAIAAGFgAM1C2I5nAAgAFwgRIryAAg");
	this.shape_1.setTransform(350.725,355.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(262,336,177.5,39);


(lib.shape121 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AjQhhIGhAAIAADDImhAAg");
	this.shape.setTransform(249.45,290.25);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AjQBiIAAjDIGhAAIAADDg");
	this.shape_1.setTransform(249.45,290.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(227.6,279.5,43.79999999999998,21.600000000000023);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("Aj+hmIH9AAIAADNIn9AAg");
	this.shape.setTransform(387.05,308.725);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("Aj+BnIAAjNIH9AAIAADNg");
	this.shape_1.setTransform(387.05,308.725);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(360.6,297.5,53,22.5);


(lib.shape117 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("ADshmIAADNInYAAIAAjNg");
	this.shape.setTransform(406.1,105.225);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AjsBnIAAjNIHYAAIAADNg");
	this.shape_1.setTransform(406.1,105.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(381.5,94,49.30000000000001,22.5);


(lib.shape116 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#FF0000").ss(3,0,0,3).p("Ajtg0IHbBq");
	this.shape.setTransform(370.725,307.65);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(345.4,300.8,50.700000000000045,13.699999999999989);


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
	this.shape.graphics.f().s("#FF0000").ss(3,0,0,3).p("AjKhhIGVDD");
	this.shape.setTransform(374.8,300.45);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(353,289.2,43.60000000000002,22.600000000000023);


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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("AjKB2IGWjq");
	this.shape.setTransform(378.55,133.95);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(356.7,120.7,43.69999999999999,26.499999999999986);


(lib.shape113 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#FF0000").ss(3,0,0,3).p("ADMh1ImWDr");
	this.shape.setTransform(282.3,268.9);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(260.5,255.7,43.69999999999999,26.5);


(lib.shape112 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#FF0000").ss(3,0,0,3).p("AlHjkIKPHJ");
	this.shape.setTransform(379.05,297.55);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(344.8,273.1,68.5,48.89999999999998);


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

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(3,0,0,3).p("AiHn7IEPP3");
	this.shape.setTransform(376.25,247.475);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	var sprImg_shape_1 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_ct_atlas_1"],10);
	sprImg_shape_1.onload = function(){
		this.shape_1.graphics.bf(sprImg_shape_1, null, new cjs.Matrix2D(0.48,0,0,0.524,-78.4,-165.7)).s().p("AKwZ5IAAlYImZAAIAAFYIwmAAIAAnOIEmAAIAAjtIkmAAMAAAgo2IYfAAIAAPMIlQAAIAACKIFQAAMAAAAibg")
	}.bind(this);
	this.shape_1.setTransform(324.425,179.25);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(246,13.6,156.89999999999998,331.4);


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

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF9900").ss(3,1,0,3).p("AD8izIgjgsIgGgGACxkCQgdgWgggNABFk1IhFgHQgnAAgkAJAEfByQAKgcAFgfAEyAPIAAgPIgDguAEnhWQgHgegOgbAkwgiQgBARAAARIAAAYAksBAQAGAeALAdAjZjeQgXAYgRAbAkViFQgNAcgHAeAjFDyQAbAYAdARAkJCfQAQAdAWAZACUEXQAegSAagYAhfEvQAkALAnADAAdE8QAngDAjgNADqDNQAVgaAPgcAh6kjQggAPgdAX");
	this.shape.setTransform(93.7758,86.65);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_3
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FF9900").ss(3,1,0,3).p("AhzlhQgeARgbAdAkaBOQAFAlALAiAjMkOQgWAegQAhAkFiiQgMAigGAlAkdgqIgBBIAi5EmQAZAdAcAUAj5DCQAPAiAVAeACmk6QgcgagegQABAl3QgfgJghAAQglAAgiALAENCLQAKgjAEglAEVhoQgHgkgNgiADsjaQgOgcgTgZIgFgHAEfATIgDhLACKFTQAcgVAZgeAAbGAQAkgEAigQADbD5QAUgfAOgiAhaFvQAiAPAlAD");
	this.shape_1.setTransform(170.8,278.125);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	var sprImg_shape_2 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_ct_atlas_1"],9);
	sprImg_shape_2.onload = function(){
		this.shape_2.graphics.bf(sprImg_shape_2, null, new cjs.Matrix2D(0.322,0,0,0.322,-106.1,-83.5)).s().p("AwkNDIAA6FMAhJAAAIAAaFg")
	}.bind(this);
	this.shape_2.setTransform(96.475,274.1);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_1
	this.shape_3 = new cjs.Shape();
	var sprImg_shape_3 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_ct_atlas_3"],80);
	sprImg_shape_3.onload = function(){
		this.shape_3.graphics.bf(sprImg_shape_3, null, new cjs.Matrix2D(0.707,0,0,0.707,-106,-79.5)).s().p("AwjMbIAA41MAhHAAAIAAY1g")
	}.bind(this);
	this.shape_3.setTransform(96.55,104.9);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.6,25.4,212.2,332.20000000000005);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AP1BaI/pAAIAAizIfpAAg");
	this.shape.setTransform(-82.4,115.075);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("Av0BaIAAizIfpAAIAACzg");
	this.shape_1.setTransform(-82.4,115.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-184.7,105.1,204.6,20);


(lib.shape99 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("ACBHXIkBut");
	this.shape.setTransform(-135.275,59.225);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-149.7,10.6,28.89999999999999,97.30000000000001);


(lib.shape98 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("ADbMfIm149");
	this.shape.setTransform(102.725,23.4);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(79.3,-58,46.900000000000006,162.9);


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

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("ALlBaI3JAAIAAizIXJAAg");
	this.shape.setTransform(120.05,115.05);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("ArkBaIAAizIXJAAIAACzg");
	this.shape_1.setTransform(120.05,115.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#FF9900").ss(3,1,0,3).p("AU1rKIg8gGAS9rPIg7AHARFq8Ig6ASAZ4k1QAJgdACgeAaBmsIgHgmIgGgTAZcobQgPgagVgWAYMpzIgxggAWoqqIg4gTAPTqVQgcAMgaAPANrpZIgvAlALRmpQgNAbgIAbAKwk3QgCAeAEAeAMToJIgjAtAK+jDQAJAdAOAaAL4haQATAWAZATANWgQQAYANAcAKAWXgqQAagPAYgRAX3hwIApgrAQ8AsQAeABAegCAS1AkIA9gNAUqAHQAdgJAagMAPFAaQAdAIAeAFAZFjLIAegzA3cCEQgcAMgYAUA42J5QAUAYAWARA3XLBQAbALAeAEA50E5QgIAdgEAfA6CGyQABAfAGAcA5pInQALAcARAZA49DQIghAyAyqDxIgdgoIgHgHAz6CaQgZgSgbgKA1pBxIgWgBIglADA1kLRQAegEAcgLAz1KkQAXgSAVgXAymJKQAPgaAKgcAx/HaQAFgbAAgeIAAgGAyAFgQgFgegLgb");
	this.shape_2.setTransform(-20.95,-74.35);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_1
	this.shape_3 = new cjs.Shape();
	var sprImg_shape_3 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_ct_atlas_3"],94);
	sprImg_shape_3.onload = function(){
		this.shape_3.graphics.bf(sprImg_shape_3, null, new cjs.Matrix2D(1.387,0,0,1.387,-192.1,-172)).s().p("A+Aa4MAAAg1vMA8BAAAMAAAA1vg")
	}.bind(this);
	this.shape_3.setTransform(4.575,0);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-189.1,-172,385.79999999999995,344);


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

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(3,0,0,3).p("AnGAAIONAA");
	this.shape.setTransform(114.35,-155.15);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FF9900").ss(3,1,0,3).p("ADTj2QgXgUgZgPABukyQgdgKgegEAgIlEIg7AHAh8ksQgcAMgZAQAjgjqIgFAFQgWAWgRAXAj7DOIAqArAC1EOQAZgRAWgWAEKC7QASgYAMgbAE8BPQAHgdACgfAFDgoQgEgfgJgcAEeiZQgOgagTgXAgvFCIA6ADAigEcQAaAPAcAJABHE+QAegGAbgMAkpiFQgMAbgHAdAlEgRIACA8Ak1BmQAJAdAPAa");
	this.shape_1.setTransform(29.4,-129.3);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4.5,-163.3,165.9,68.00000000000001);


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

	// Layer_1
	this.shape = new cjs.Shape();
	var sprImg_shape = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_ct_atlas_3"],93);
	sprImg_shape.onload = function(){
		this.shape.graphics.bf(sprImg_shape, null, new cjs.Matrix2D(1.1,0,0,1.1,-116,-136.4)).s().p("AyIVUMAAAgqnMAkQAAAMAAAAqng")
	}.bind(this);
	this.shape.setTransform(111.3,-64.4);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4.7,-200.8,232.1,272.8);


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

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(3,0,0,3).p("AjqAAIHVAA");
	this.shape.setTransform(124.35,-58.15);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FF9900").ss(3,1,0,3).p("ABkisQgagQgdgGAgPjHQgfACgbAMAh9iaIgQAOIgYAcAi/g7QgIAcAAAfQAAAfAIAcAilBwQAKAQAOAOIARAPAhJC7QAdALAgACADGAdIACgdIgCgeAC0hXQgNgagVgWACTCIQAVgXANgaAAuDDQAegGAagQ");
	this.shape_1.setTransform(70.9017,-58.2);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(49.4,-79.6,100,42.89999999999999);


(lib.shape88 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	var sprImg_shape = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_ct_atlas_3"],92);
	sprImg_shape.onload = function(){
		this.shape.graphics.bf(sprImg_shape, null, new cjs.Matrix2D(0.9,0,0,0.9,-103.9,-135.9)).s().p("AwOVPMAAAgqdMAgeAAAMAAAAqdg")
	}.bind(this);
	this.shape.setTransform(90.95,-78.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13,-214,207.9,271.8);


(lib.shape85 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#000000").s().p("AgRARQgHgHAAgKQAAgKAHgHQAHgHAKAAQALAAAGAHQAIAHAAAKQAAAKgIAHQgGAIgLAAQgKAAgHgIg");
	this.shape.setTransform(-366.4,237.15);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgJAHgIQAHgHAKAAQALAAAGAHQAIAIAAAJQAAAKgIAIQgGAHgLAAQgKAAgHgHg");
	this.shape_1.setTransform(-366.4,206.95);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgJAHgIQAHgHAKAAQALAAAGAHQAIAIAAAJQAAAKgIAIQgGAHgLAAQgKAAgHgHg");
	this.shape_2.setTransform(-366.4,61.75);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-368.9,59.3,5,180.39999999999998);


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

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgJAHgIQAHgHAKAAQAKAAAIAHQAHAIAAAJQAAAKgHAIQgIAHgKAAQgKAAgHgHg");
	this.shape.setTransform(-578.5,-155.6);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-581,-158.1,5,5);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AGzBaItlAAIAAizINlAAg");
	this.shape.setTransform(204.4,-155.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AmyBaIAAizINlAAIAACzg");
	this.shape_1.setTransform(204.4,-155.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(159.9,-165.9,89,20);


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

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(3,0,0,3).p("AjqAAIHVAA");
	this.shape.setTransform(118.35,-85.15);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FF9900").ss(3,1,0,3).p("AA8i+QgbgJghAAIg7AIAhvilIgeAYIgNAPAi5hLQgMAbgCAfAjDArQAGAdAPAaAiJCRQAXAWAaANAgeDGIAeACIAdgCABWC1QAbgNAWgVACsBmQAQgaAHgdADIgLQgCgfgKgbACeh5IgRgUIgbgX");
	this.shape_1.setTransform(65.95,-84.2483);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(44.5,-105.7,98.9,43);


(lib.shape74 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFFFFF").s().p("AuEMXIAAgIIggAAIAA4lIc5AAIAAA/IAQAAIAAXXIgoAAIAAAXgAtNLJIajAAIAA15I6jAAg");
	this.shape.setTransform(-1.075,-3.25);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	var sprImg_shape_1 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_ct_atlas_3"],91);
	sprImg_shape_1.onload = function(){
		this.shape_1.graphics.bf(sprImg_shape_1, null, new cjs.Matrix2D(0.8,0,0,0.8,-86.8,-74)).s().p("AtjLkIAA3HIbHAAIAAXHg")
	}.bind(this);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-94.3,-82.3,186.5,158.2);


(lib.shape72 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	var sprImg_shape = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_ct_atlas_3"],90);
	sprImg_shape.onload = function(){
		this.shape.graphics.bf(sprImg_shape, null, new cjs.Matrix2D(1,0,0,1,-88.5,-139)).s().p("At0VuMAAAgrbIbpAAMAAAArbg")
	}.bind(this);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-88.5,-139,177,278);


(lib.shape24 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AJ6BaIzzAAIAAizITzAAg");
	this.shape.setTransform(145.65,135.25);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("Ap5BaIAAizITyAAIAACzg");
	this.shape_1.setTransform(145.65,135.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(81.3,125.3,128.7,20.000000000000014);


(lib.shape23 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("Aj7AAIH3AB");
	this.shape.setTransform(59.15,136.075);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(32.5,134.5,53.3,3.1999999999999886);


(lib.shape21 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("ArQizIWiAAIAAFnI2iAAg");
	this.shape.setTransform(154.45,-46.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("ArRC0IAAlnIWjAAIAAFng");
	this.shape_1.setTransform(154.45,-46.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(81.3,-65.5,146.3,38);


(lib.shape20 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("Ai9AAIF7AB");
	this.shape.setTransform(67.025,-45.95);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(46.5,-47.5,41.099999999999994,3.1000000000000014);


(lib.shape18 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("Ar0lnIXpAAIAALPI3pAAg");
	this.shape.setTransform(157.9,-147.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("ArzFoIAArPIXoAAIAALPg");
	this.shape_1.setTransform(157.9,-147.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(81.3,-184.9,153.3,74);


(lib.shape17 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("AkChFIIFCL");
	this.shape.setTransform(58.125,-155.875);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FF9900").ss(3,1,1).p("ACt8AIhaAAAFD3KIAAhaAFD5gIAAhaAFD72IAAgKIhaAAADB0gIBaAAAFD00IAAhaAHeo6IhaAAAFIo6IhaAAACyo6IhaAAAHenCIAAhaABYhaIBaAAADuhaIBaAAAGEhaIBaAAAHeiWIAAhaAHeksIAAhaADBTJIhaAAAFXYZIAAhaAFXWDIAAhaAFXTtIAAgkIhaAAAB9cBIBaAAAETcBIBEAAIAAgWAFXavIAAhaAAX8AIhZAAAh/8AIhaAAAmr8AIgyAAIAAAoAnd6cIAABaAnd4GIAABaAnd1wIAABQIAKAAAkB0gIBaAAAhr0gIBbAAAkV8AIhaAAAmX0gIBaAAAAco6IgdAAIAAA8AgBksIAABaAgBiWIAAA8IAdAAAgBnCIAABaAArTJIhZAAAhqTJIhaAAAmWTJIgyAAIAAAoAnIUtIAABaAnIXDIAABaAnIZZIAABaAnIbvIAAASIBIAAAlEcBIBaAAAiucBIBaAAAgYcBIBZAAAkATJIhaAAAAr0gIBaAA");
	this.shape_1.setTransform(-7.85,-10.875);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	var sprImg_shape_2 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_ct_atlas_3"],81);
	sprImg_shape_2.onload = function(){
		this.shape_2.graphics.bf(sprImg_shape_2, null, new cjs.Matrix2D(0.966,0,0,0.966,-144.9,-193.3)).s().p("A2peNMAAAg8ZMAtSAAAMAAAA8Zg")
	}.bind(this);
	this.shape_2.setTransform(5.1,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-139.8,-193.2,289.9,386.5);


(lib.shape15 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgJAHgIQAIgHAJAAQAKAAAIAHQAHAIAAAJQAAAKgHAIQgIAHgKAAQgJAAgIgHg");
	this.shape.setTransform(-344.85,85.9);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_3
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgJAHgIQAIgHAJAAQAKAAAIAHQAHAIAAAJQAAAKgHAIQgIAHgKAAQgJAAgIgHg");
	this.shape_1.setTransform(-344.85,227.65);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgRARQgHgGAAgLQAAgKAHgHQAIgHAJAAQAKAAAIAHQAHAHAAAKQAAALgHAGQgIAIgKAAQgJAAgIgIg");
	this.shape_2.setTransform(-344.85,155.9);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgJAHgIQAIgHAJAAQAKAAAIAHQAHAIAAAJQAAAKgHAIQgIAHgKAAQgJAAgIgHg");
	this.shape_3.setTransform(-344.85,40.6);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-347.3,38.1,5,192.1);


(lib.shape6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AKeBaI07AAIAAizIU7AAg");
	this.shape.setTransform(-46.4,-81.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AqdBaIAAizIU7AAIAACzg");
	this.shape_1.setTransform(-46.4,-81.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-114.4,-91.9,136,20);


(lib.shape4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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


(lib.shape3 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("AE5C9Ipxl6");
	this.shape.setTransform(31.65,-55.05);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FF9900").ss(3,1,1).p("Anwp2IgeARIAtBOAlurBIhOAtAnDnjIAtBOAj5rfIgQgcIgxAcAiupdIgthOAhjnbIgthOAgYlZIgthOAiXAkIAtBOAjihdIAtBOAktjfIAtBOAgBEoIAsBOAhMCmIAtBOADIAsIgthNAETCuIgthOAFeEwIgthOAGpGyIgthOACUIsIAtBOAH0I0IgthOAHCKUIBNgtAAyjXIgthOAB9hVIgthOABJGqIAtBOAl4lhIAtBOAFALfIBOgtADfKuIAuBO");
	this.shape_1.setTransform(71.65,-70.325);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	var sprImg_shape_2 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_ct_atlas_2"],13);
	sprImg_shape_2.onload = function(){
		this.shape_2.graphics.bf(sprImg_shape_2, null, new cjs.Matrix2D(1,0,0,1,-246.5,-185)).s().p("EgmgAc6MAAAg5zMBNBAAAMAAAA5zg")
	}.bind(this);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-246.5,-185,493,370);


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


(lib.sprite232 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.shape231("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite232, new cjs.Rectangle(-102.3,-121.4,201,239), null);


(lib.sprite229 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.shape228("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite229, new cjs.Rectangle(-105.9,-123.1,203.9,239.8), null);


(lib.sprite200 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.shape199("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite200, new cjs.Rectangle(-54.3,-57.8,109,115), null);


(lib.sprite197 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.shape196("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite197, new cjs.Rectangle(-53.8,-59.3,105.5,118.5), null);


(lib.sprite194 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.shape193("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite194, new cjs.Rectangle(-94.5,-71.5,184.5,133.2), null);


(lib.sprite135 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_69
	this.instance = new lib.shape134("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite135, new cjs.Rectangle(-223.8,-117.1,447.6,234.3), null);


(lib.sprite5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.shape4("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite5, new cjs.Rectangle(-3.5,-3.3,7,6.699999999999999), null);


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


(lib.sprite241 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.text240("synched",0);
	this.instance.setTransform(-186.6,-102.3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_16
	this.instance_1 = new lib.shape239("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_15
	this.instance_2 = new lib.text238("synched",0);
	this.instance_2.setTransform(78.05,-102.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	// Layer_14
	this.instance_3 = new lib.shape237("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

	// Layer_13
	this.instance_4 = new lib.text236("synched",0);
	this.instance_4.setTransform(-156.1,-143.75);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

	// Layer_12
	this.instance_5 = new lib.shape235("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1));

	// Layer_10
	this.instance_6 = new lib.sprite5();
	this.instance_6.setTransform(52.45,-96.15,1.3551,1.3551,0,135.0078,-44.9932);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1));

	// Layer_9
	this.instance_7 = new lib.shape234("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1));

	// Layer_7
	this.instance_8 = new lib.sprite5();
	this.instance_8.setTransform(-56.35,-96.15,1.3551,1.3551,-135.0078);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1));

	// Layer_6
	this.instance_9 = new lib.shape233("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1));

	// Layer_3
	this.instance_10 = new lib.sprite232();
	this.instance_10.setTransform(92.4,-62.15,0.7532,0.7531);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1));

	// Layer_1
	this.instance_11 = new lib.sprite229();
	this.instance_11.setTransform(-101.5,-61.2,0.8997,0.7506);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite241, new cjs.Rectangle(-196.8,-153.6,383.3,180), null);


(lib.sprite226 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_14
	this.instance = new lib.text118("synched",0);
	this.instance.setTransform(106.95,-106.05);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_13
	this.instance_1 = new lib.shape225("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_11
	this.instance_2 = new lib.sprite5();
	this.instance_2.setTransform(79.05,-100,1.3551,1.3551,-90.0071);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	// Layer_10
	this.instance_3 = new lib.shape224("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

	// Layer_9
	this.instance_4 = new lib.text223("synched",0);
	this.instance_4.setTransform(-143,18.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

	// Layer_8
	this.instance_5 = new lib.shape222("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1));

	// Layer_6
	this.instance_6 = new lib.sprite5();
	this.instance_6.setTransform(-113.45,-54.65,1.3551,1.3551,-0.0071);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1));

	// Layer_5
	this.instance_7 = new lib.shape221("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1));

	// Layer_4
	this.instance_8 = new lib.text220("synched",0);
	this.instance_8.setTransform(-55.55,46.65);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1));

	// Layer_3
	this.instance_9 = new lib.shape219("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite226, new cjs.Rectangle(-153.2,-137.1,324.79999999999995,213.1), null);


(lib.sprite214 = function(mode,startPosition,loop,reversed) {
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
	this.frame_854 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(854).call(this.frame_854).wait(1));

	// Masked_Layer_24___17
	this.instance = new lib.shape213("synched",0);
	this.instance.setTransform(-205.4,-31.6);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(855));

	// Masked_Layer_22___17
	this.instance_1 = new lib.text212("synched",0);
	this.instance_1.setTransform(-743.6,-16.45);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(855));

	// Masked_Layer_21___17
	this.instance_2 = new lib.text211("synched",0);
	this.instance_2.setTransform(-743.6,-82.45);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(855));

	// Masked_Layer_20___17
	this.instance_3 = new lib.text210("synched",0);
	this.instance_3.setTransform(-743.6,-155.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(855));

	// Masked_Layer_19___17
	this.instance_4 = new lib.text209("synched",0);
	this.instance_4.setTransform(-767.3,-208.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(855));

	// Masked_Layer_18___17
	this.instance_5 = new lib.shape79("synched",0);
	this.instance_5.setTransform(-178.55,9.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(855));

	// Layer_16
	this.instance_6 = new lib.text208("synched",0);
	this.instance_6.setTransform(-20.7,143.4,0.9997,1);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(855));

	// Layer_15
	this.instance_7 = new lib.shape207("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(855));

	// Layer_14
	this.instance_8 = new lib.text206("synched",0);
	this.instance_8.setTransform(-216.8,143.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(855));

	// Layer_13
	this.instance_9 = new lib.shape205("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(855));

	// Layer_12
	this.instance_10 = new lib.text204("synched",0);
	this.instance_10.setTransform(19.5,-71.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(855));

	// Layer_11
	this.instance_11 = new lib.shape203("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(855));

	// Layer_10
	this.instance_12 = new lib.text202("synched",0);
	this.instance_12.setTransform(-237.2,-72.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(855));

	// Layer_9
	this.instance_13 = new lib.shape201("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(855));

	// Layer_6
	this.instance_14 = new lib.sprite200();
	this.instance_14.setTransform(115.15,67.25,1.4428,1.4428);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(855));

	// Layer_4
	this.instance_15 = new lib.sprite197();
	this.instance_15.setTransform(-119.8,69.45,1.4266,1.4266);

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(855));

	// Layer_2
	this.instance_16 = new lib.sprite194();
	this.instance_16.setTransform(-106.15,-124.75,1.1164,1.1164);

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(855));

	// Layer_1
	this.instance_17 = new lib.shape191("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(855));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-771.2,-212,988.4000000000001,387.9);


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

	// timeline functions:
	this.frame_0 = function() {
		/* stopAllSounds ();
		*/
	}
	this.frame_234 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(234).call(this.frame_234).wait(1));

	// Masked_Layer_167___132
	this.instance = new lib.text187("synched",0);
	this.instance.setTransform(-395.1,331);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(235));

	// Masked_Layer_166___132
	this.instance_1 = new lib.text186("synched",0);
	this.instance_1.setTransform(-475.25,331);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(235));

	// Masked_Layer_165___132
	this.instance_2 = new lib.text185("synched",0);
	this.instance_2.setTransform(-518,331);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(235));

	// Masked_Layer_164___132
	this.instance_3 = new lib.text184("synched",0);
	this.instance_3.setTransform(-395.1,309.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(235));

	// Masked_Layer_163___132
	this.instance_4 = new lib.text183("synched",0);
	this.instance_4.setTransform(-475.25,309.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(235));

	// Masked_Layer_162___132
	this.instance_5 = new lib.text182("synched",0);
	this.instance_5.setTransform(-518,309.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(235));

	// Masked_Layer_161___132
	this.instance_6 = new lib.text181("synched",0);
	this.instance_6.setTransform(-395.1,273.75);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(235));

	// Masked_Layer_160___132
	this.instance_7 = new lib.text180("synched",0);
	this.instance_7.setTransform(-475.25,280.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(235));

	// Masked_Layer_159___132
	this.instance_8 = new lib.text179("synched",0);
	this.instance_8.setTransform(-518,280.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(235));

	// Masked_Layer_158___132
	this.instance_9 = new lib.text174("synched",0);
	this.instance_9.setTransform(-395.1,252.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(235));

	// Masked_Layer_157___132
	this.instance_10 = new lib.text178("synched",0);
	this.instance_10.setTransform(-475.25,252.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(235));

	// Masked_Layer_156___132
	this.instance_11 = new lib.text177("synched",0);
	this.instance_11.setTransform(-518,252.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(235));

	// Masked_Layer_155___132
	this.instance_12 = new lib.text174("synched",0);
	this.instance_12.setTransform(-395.1,230.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(235));

	// Masked_Layer_154___132
	this.instance_13 = new lib.text176("synched",0);
	this.instance_13.setTransform(-475.25,230.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(235));

	// Masked_Layer_153___132
	this.instance_14 = new lib.text175("synched",0);
	this.instance_14.setTransform(-518,230.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(235));

	// Masked_Layer_152___132
	this.instance_15 = new lib.text174("synched",0);
	this.instance_15.setTransform(-395.1,207.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(235));

	// Masked_Layer_151___132
	this.instance_16 = new lib.text173("synched",0);
	this.instance_16.setTransform(-475.25,207.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(235));

	// Masked_Layer_150___132
	this.instance_17 = new lib.text172("synched",0);
	this.instance_17.setTransform(-518,207.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(235));

	// Masked_Layer_149___132
	this.instance_18 = new lib.text171("synched",0);
	this.instance_18.setTransform(-395.1,169.65);

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(235));

	// Masked_Layer_148___132
	this.instance_19 = new lib.text170("synched",0);
	this.instance_19.setTransform(-474.45,169.65);

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(235));

	// Masked_Layer_147___132
	this.instance_20 = new lib.text169("synched",0);
	this.instance_20.setTransform(-395.1,147.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(235));

	// Masked_Layer_146___132
	this.instance_21 = new lib.text168("synched",0);
	this.instance_21.setTransform(-475.25,147.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(235));

	// Masked_Layer_145___132
	this.instance_22 = new lib.text167("synched",0);
	this.instance_22.setTransform(-518.3,177.35);

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(235));

	// Masked_Layer_144___132
	this.instance_23 = new lib.text166("synched",0);
	this.instance_23.setTransform(-518,147.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(235));

	// Masked_Layer_143___132
	this.instance_24 = new lib.text165("synched",0);
	this.instance_24.setTransform(-395.45,112.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(235));

	// Masked_Layer_142___132
	this.instance_25 = new lib.text164("synched",0);
	this.instance_25.setTransform(-475.25,119);

	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(235));

	// Masked_Layer_141___132
	this.instance_26 = new lib.text163("synched",0);
	this.instance_26.setTransform(-518,119);

	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(235));

	// Masked_Layer_140___132
	this.instance_27 = new lib.text162("synched",0);
	this.instance_27.setTransform(-353.75,87.15);

	this.timeline.addTween(cjs.Tween.get(this.instance_27).wait(235));

	// Masked_Layer_139___132
	this.instance_28 = new lib.text161("synched",0);
	this.instance_28.setTransform(-478.75,87.15);

	this.timeline.addTween(cjs.Tween.get(this.instance_28).wait(235));

	// Masked_Layer_138___132
	this.instance_29 = new lib.text160("synched",0);
	this.instance_29.setTransform(-524.35,87.15);

	this.timeline.addTween(cjs.Tween.get(this.instance_29).wait(235));

	// Masked_Layer_137___132
	this.instance_30 = new lib.text159("synched",0);
	this.instance_30.setTransform(-395.1,352);

	this.timeline.addTween(cjs.Tween.get(this.instance_30).wait(235));

	// Masked_Layer_136___132
	this.instance_31 = new lib.text158("synched",0);
	this.instance_31.setTransform(-475.25,352);

	this.timeline.addTween(cjs.Tween.get(this.instance_31).wait(235));

	// Masked_Layer_135___132
	this.instance_32 = new lib.text157("synched",0);
	this.instance_32.setTransform(-518,352);

	this.timeline.addTween(cjs.Tween.get(this.instance_32).wait(235));

	// Masked_Layer_134___132
	this.instance_33 = new lib.shape156("synched",0);
	this.instance_33.setTransform(-189.6,0);

	this.timeline.addTween(cjs.Tween.get(this.instance_33).wait(235));

	// Masked_Layer_133___132
	this.instance_34 = new lib.text155("synched",0);
	this.instance_34.setTransform(-547.75,-0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_34).wait(235));

	// Layer_131
	this.instance_35 = new lib.text154("synched",0);
	this.instance_35.setTransform(384.7,306.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_35).wait(235));

	// Layer_130
	this.instance_36 = new lib.shape137("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_36).wait(235));

	// Layer_129
	this.instance_37 = new lib.text153("synched",0);
	this.instance_37.setTransform(273.5,297.15);

	this.timeline.addTween(cjs.Tween.get(this.instance_37).wait(235));

	// Layer_128
	this.instance_38 = new lib.shape137("synched",0);
	this.instance_38.setTransform(-114.2,-9.65);

	this.timeline.addTween(cjs.Tween.get(this.instance_38).wait(235));

	// Layer_127
	this.instance_39 = new lib.text152("synched",0);
	this.instance_39.setTransform(278.2,253.25);

	this.timeline.addTween(cjs.Tween.get(this.instance_39).wait(235));

	// Layer_126
	this.instance_40 = new lib.shape137("synched",0);
	this.instance_40.setTransform(-106.5,-53.55);

	this.timeline.addTween(cjs.Tween.get(this.instance_40).wait(235));

	// Layer_125
	this.instance_41 = new lib.text151("synched",0);
	this.instance_41.setTransform(137.4,335.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_41).wait(235));

	// Layer_124
	this.instance_42 = new lib.shape137("synched",0);
	this.instance_42.setTransform(-247.3,28.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_42).wait(235));

	// Layer_123
	this.instance_43 = new lib.text138("synched",0);
	this.instance_43.setTransform(393.9,248.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_43).wait(235));

	// Layer_122
	this.instance_44 = new lib.shape137("synched",0);
	this.instance_44.setTransform(9.2,-58);

	this.timeline.addTween(cjs.Tween.get(this.instance_44).wait(235));

	// Layer_121
	this.instance_45 = new lib.text150("synched",0);
	this.instance_45.setTransform(359.25,4.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_45).wait(235));

	// Layer_120
	this.instance_46 = new lib.shape137("synched",0);
	this.instance_46.setTransform(-25.45,-301.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_46).wait(235));

	// Layer_119
	this.instance_47 = new lib.text149("synched",0);
	this.instance_47.setTransform(297.25,21.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_47).wait(235));

	// Layer_118
	this.instance_48 = new lib.shape137("synched",0);
	this.instance_48.setTransform(-87.45,-285.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_48).wait(235));

	// Layer_117
	this.instance_49 = new lib.text148("synched",0);
	this.instance_49.setTransform(238.75,34.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_49).wait(235));

	// Layer_116
	this.instance_50 = new lib.shape137("synched",0);
	this.instance_50.setTransform(-145.95,-272.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_50).wait(235));

	// Layer_115
	this.instance_51 = new lib.text147("synched",0);
	this.instance_51.setTransform(165.25,71.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_51).wait(235));

	// Layer_114
	this.instance_52 = new lib.shape137("synched",0);
	this.instance_52.setTransform(-219.45,-235.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_52).wait(235));

	// Layer_113
	this.instance_53 = new lib.text146("synched",0);
	this.instance_53.setTransform(69.1,62.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_53).wait(235));

	// Layer_112
	this.instance_54 = new lib.shape137("synched",0);
	this.instance_54.setTransform(-315.6,-244.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_54).wait(235));

	// Layer_110
	this.instance_55 = new lib.sprite5();
	this.instance_55.setTransform(435.2,192.8,1.3529,1.3529,-1.3579);

	this.timeline.addTween(cjs.Tween.get(this.instance_55).wait(235));

	// Layer_109
	this.instance_56 = new lib.shape145("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_56).wait(235));

	// Layer_107
	this.instance_57 = new lib.sprite5();
	this.instance_57.setTransform(398.25,257.6,1.3528,1.3528,-31.3572);

	this.timeline.addTween(cjs.Tween.get(this.instance_57).wait(235));

	// Layer_106
	this.instance_58 = new lib.shape144("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_58).wait(235));

	// Layer_104
	this.instance_59 = new lib.sprite5();
	this.instance_59.setTransform(361.6,216,1.3502,1.3502,43.9839);

	this.timeline.addTween(cjs.Tween.get(this.instance_59).wait(235));

	// Layer_103
	this.instance_60 = new lib.shape143("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_60).wait(235));

	// Layer_101
	this.instance_61 = new lib.sprite5();
	this.instance_61.setTransform(361.85,228.7,1.3528,1.3528,28.642);

	this.timeline.addTween(cjs.Tween.get(this.instance_61).wait(235));

	// Layer_100
	this.instance_62 = new lib.shape142("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_62).wait(235));

	// Layer_98
	this.instance_63 = new lib.sprite5();
	this.instance_63.setTransform(225.85,209.4,1.3551,1.3551,14.9928);

	this.timeline.addTween(cjs.Tween.get(this.instance_63).wait(235));

	// Layer_97
	this.instance_64 = new lib.shape141("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_64).wait(235));

	// Layer_95
	this.instance_65 = new lib.sprite5();
	this.instance_65.setTransform(136.25,218.95,1.3551,1.3551,-15.0069);

	this.timeline.addTween(cjs.Tween.get(this.instance_65).wait(235));

	// Layer_94
	this.instance_66 = new lib.shape140("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_66).wait(235));

	// Layer_92
	this.instance_67 = new lib.sprite5();
	this.instance_67.setTransform(383.9,98.15,1.3551,1.3551,-165.007);

	this.timeline.addTween(cjs.Tween.get(this.instance_67).wait(235));

	// Layer_91
	this.instance_68 = new lib.shape136("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_68).wait(235));

	// Layer_89
	this.instance_69 = new lib.sprite5();
	this.instance_69.setTransform(322.4,110.15,1.3551,1.3551,-165.007);

	this.timeline.addTween(cjs.Tween.get(this.instance_69).wait(235));

	// Layer_88
	this.instance_70 = new lib.shape136("synched",0);
	this.instance_70.setTransform(-61.5,12);

	this.timeline.addTween(cjs.Tween.get(this.instance_70).wait(235));

	// Layer_86
	this.instance_71 = new lib.sprite5();
	this.instance_71.setTransform(261.9,128.15,1.3551,1.3551,-165.007);

	this.timeline.addTween(cjs.Tween.get(this.instance_71).wait(235));

	// Layer_85
	this.instance_72 = new lib.shape136("synched",0);
	this.instance_72.setTransform(-122,30);

	this.timeline.addTween(cjs.Tween.get(this.instance_72).wait(235));

	// Layer_83
	this.instance_73 = new lib.sprite5();
	this.instance_73.setTransform(188.4,162.65,1.3551,1.3551,-165.007);

	this.timeline.addTween(cjs.Tween.get(this.instance_73).wait(235));

	// Layer_82
	this.instance_74 = new lib.shape136("synched",0);
	this.instance_74.setTransform(-195.5,64.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_74).wait(235));

	// Layer_80
	this.instance_75 = new lib.sprite5();
	this.instance_75.setTransform(177.45,105.95,1.355,1.355,119.9926);

	this.timeline.addTween(cjs.Tween.get(this.instance_75).wait(235));

	// Layer_79
	this.instance_76 = new lib.shape139("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_76).wait(235));

	// Layer_77
	this.instance_77 = new lib.sprite5();
	this.instance_77.setTransform(88.4,152.65,1.3551,1.3551,-165.007);

	this.timeline.addTween(cjs.Tween.get(this.instance_77).wait(235));

	// Layer_76
	this.instance_78 = new lib.shape136("synched",0);
	this.instance_78.setTransform(-295.5,54.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_78).wait(235));

	// Layer_75
	this.instance_79 = new lib.text138("synched",0);
	this.instance_79.setTransform(10.75,70.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_79).wait(235));

	// Layer_74
	this.instance_80 = new lib.shape137("synched",0);
	this.instance_80.setTransform(-373.95,-236.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_80).wait(235));

	// Layer_72
	this.instance_81 = new lib.sprite5();
	this.instance_81.setTransform(33.4,158.85,1.3551,1.3551,-165.007);

	this.timeline.addTween(cjs.Tween.get(this.instance_81).wait(235));

	// Layer_71
	this.instance_82 = new lib.shape136("synched",0);
	this.instance_82.setTransform(-350.5,60.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_82).wait(235));

	// Layer_1
	this.ani = new lib.sprite135();
	this.ani.name = "ani";
	this.ani.setTransform(230.8,177);

	this.timeline.addTween(cjs.Tween.get(this.ani).wait(235));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-551.7,-3.5,1008.3000000000001,382.6);


(lib.sprite133 = function(mode,startPosition,loop,reversed) {
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
	this.frame_979 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(979).call(this.frame_979).wait(1));

	// Masked_Layer_43___34
	this.instance = new lib.shape132("synched",0);
	this.instance.setTransform(-189.6,-15.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(980));

	// Masked_Layer_41___34
	this.instance_1 = new lib.text131("synched",0);
	this.instance_1.setTransform(-554.75,9.3,0.9998,1);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(980));

	// Masked_Layer_40___34
	this.instance_2 = new lib.text130("synched",0);
	this.instance_2.setTransform(-529.95,184.9,0.9998,1);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(980));

	// Masked_Layer_39___34
	this.instance_3 = new lib.text129("synched",0);
	this.instance_3.setTransform(-529.95,161.25,0.9998,1);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(980));

	// Masked_Layer_38___34
	this.instance_4 = new lib.text128("synched",0);
	this.instance_4.setTransform(-546.85,132.2,0.9998,1);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(980));

	// Masked_Layer_37___34
	this.instance_5 = new lib.text127("synched",0);
	this.instance_5.setTransform(-546.85,60.3,0.9998,1);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(980));

	// Masked_Layer_36___34
	this.instance_6 = new lib.text126("synched",0);
	this.instance_6.setTransform(-546.85,233.35,0.9998,1);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(980));

	// Masked_Layer_35___34
	this.instance_7 = new lib.shape79("synched",0);
	this.instance_7.setTransform(22.55,224);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(980));

	// Layer_33
	this.instance_8 = new lib.text125("synched",0);
	this.instance_8.setTransform(239.95,11.95);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(980));

	// Layer_32
	this.instance_9 = new lib.text124("synched",0);
	this.instance_9.setTransform(259.1,339.65);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(980));

	// Layer_31
	this.instance_10 = new lib.shape123("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(980));

	// Layer_30
	this.instance_11 = new lib.text122("synched",0);
	this.instance_11.setTransform(234.15,284.35);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(980));

	// Layer_29
	this.instance_12 = new lib.shape121("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(980));

	// Layer_28
	this.instance_13 = new lib.text120("synched",0);
	this.instance_13.setTransform(366.95,302.35);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(980));

	// Layer_27
	this.instance_14 = new lib.shape119("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(980));

	// Layer_26
	this.instance_15 = new lib.text118("synched",0);
	this.instance_15.setTransform(386.35,98.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(980));

	// Layer_25
	this.instance_16 = new lib.shape117("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(980));

	// Layer_23
	this.instance_17 = new lib.sprite5();
	this.instance_17.setTransform(343.4,301.4,1.7986,1.7986,-77.2974);

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(980));

	// Layer_22
	this.instance_18 = new lib.shape116("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(980));

	// Layer_20
	this.instance_19 = new lib.sprite5();
	this.instance_19.setTransform(351.35,289,1.8,1.8,-63.0029);

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(980));

	// Layer_19
	this.instance_20 = new lib.shape115("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(980));

	// Layer_17
	this.instance_21 = new lib.sprite5();
	this.instance_21.setTransform(354.85,147.1,1.7999,1.7999,-119.997);

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(980));

	// Layer_16
	this.instance_22 = new lib.shape114("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(980));

	// Layer_14
	this.instance_23 = new lib.sprite5();
	this.instance_23.setTransform(306,255.7,1.7999,1.8,60.0041);

	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(980));

	// Layer_13
	this.instance_24 = new lib.shape113("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(980));

	// Layer_11
	this.instance_25 = new lib.sprite5();
	this.instance_25.setTransform(343.35,272.5,1.8,1.8,-55.0026);

	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(980));

	// Layer_10
	this.instance_26 = new lib.shape112("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(980));

	// Layer_8
	this.instance_27 = new lib.sprite5();
	this.instance_27.setTransform(362.25,193.05,1.8,1.8,-15.0024);

	this.timeline.addTween(cjs.Tween.get(this.instance_27).wait(980));

	// Layer_7
	this.instance_28 = new lib.shape111("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_28).wait(980));

	// Layer_5
	this.instance_29 = new lib.text109("synched",0);
	this.instance_29.setTransform(-11,9.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_29).wait(980));

	// Layer_4
	this.instance_30 = new lib.shape108("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_30).wait(980));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-558.6,5.9,998.1,369.1);


(lib.sprite102 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_12
	this.instance = new lib.text101("synched",0);
	this.instance.setTransform(-178.35,108.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_11
	this.instance_1 = new lib.shape100("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_9
	this.instance_2 = new lib.sprite5();
	this.instance_2.setTransform(-148.45,11.15,1.3551,1.3551,-15.0069);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	// Layer_8
	this.instance_3 = new lib.shape99("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

	// Layer_6
	this.instance_4 = new lib.sprite5();
	this.instance_4.setTransform(80.55,-57.5,1.3551,1.3551,-15.0069);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

	// Layer_5
	this.instance_5 = new lib.shape98("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1));

	// Layer_4
	this.instance_6 = new lib.text97("synched",0);
	this.instance_6.setTransform(51.5,108.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1));

	// Layer_3
	this.instance_7 = new lib.shape96("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite102, new cjs.Rectangle(-189.1,-172,404.79999999999995,344), null);


(lib.sprite26 = function(mode,startPosition,loop,reversed) {
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
	this.frame_1099 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1099).call(this.frame_1099).wait(1));

	// Masked_Layer_36___27
	this.instance = new lib.shape15("synched",0);
	this.instance.setTransform(-213.3,0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1100));

	// Masked_Layer_32___27
	this.instance_1 = new lib.text14("synched",0);
	this.instance_1.setTransform(-547.9,147.45);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1100));

	// Masked_Layer_31___27
	this.instance_2 = new lib.text13("synched",0);
	this.instance_2.setTransform(-547.9,76.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1100));

	// Masked_Layer_30___27
	this.instance_3 = new lib.text12("synched",0);
	this.instance_3.setTransform(-547.9,32.65);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1100));

	// Masked_Layer_29___27
	this.instance_4 = new lib.text11("synched",0);
	this.instance_4.setTransform(-547.9,216.95);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1100));

	// Masked_Layer_28___27
	this.instance_5 = new lib.text9("synched",0);
	this.instance_5.setTransform(-557.85,9.65);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1100));

	// Mask_Layer_1 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EgkPAfsMAAAg/XMBI0AAAMAAAA/Xg");
	mask.setTransform(234.0604,196.1099);

	// Masked_Layer_25___1
	this.instance_6 = new lib.text8("synched",0);
	this.instance_6.setTransform(123.4,97.15);

	var maskedShapeInstanceList = [this.instance_6];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(559).to({startPosition:0},0).to({alpha:0.0508},19).to({_off:true},1).wait(521));

	// Masked_Layer_24___1
	this.instance_7 = new lib.shape6("synched",0);
	this.instance_7.setTransform(229.3,185.35);

	var maskedShapeInstanceList = [this.instance_7];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(559).to({startPosition:0},0).to({alpha:0.0508},19).to({_off:true},1).wait(521));

	// Masked_Layer_22___1
	this.instance_8 = new lib.sprite5();
	this.instance_8.setTransform(293.55,149.75,2.0326,2.0326,119.992);

	var maskedShapeInstanceList = [this.instance_8];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(559).to({alpha:0.0508},19).to({_off:true},1).wait(521));

	// Masked_Layer_21___1
	this.instance_9 = new lib.shape3("synched",0);
	this.instance_9.setTransform(229.3,185.35);

	var maskedShapeInstanceList = [this.instance_9];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(559).to({startPosition:0},0).to({alpha:0.0508},19).to({_off:true},1).wait(521));

	// Masked_Layer_18___1
	this.instance_10 = new lib.text25("synched",0);
	this.instance_10.setTransform(320.5,321.1,1.0004,0.9998);
	this.instance_10.alpha = 0;
	this.instance_10._off = true;

	var maskedShapeInstanceList = [this.instance_10];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(559).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(521));

	// Masked_Layer_17___1
	this.instance_11 = new lib.shape24("synched",0);
	this.instance_11.setTransform(230,192.15,1,0.9998);
	this.instance_11.alpha = 0;
	this.instance_11._off = true;

	var maskedShapeInstanceList = [this.instance_11];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(559).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(521));

	// Masked_Layer_15___1
	this.instance_12 = new lib.sprite5();
	this.instance_12.setTransform(262.65,328.25,2.0295,2.03,-89.9983);
	this.instance_12.alpha = 0;
	this.instance_12._off = true;

	var maskedShapeInstanceList = [this.instance_12];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(559).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(521));

	// Masked_Layer_14___1
	this.instance_13 = new lib.shape23("synched",0);
	this.instance_13.setTransform(230,192.15,1,0.9998);
	this.instance_13.alpha = 0;
	this.instance_13._off = true;

	var maskedShapeInstanceList = [this.instance_13];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(559).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(521));

	// Masked_Layer_13___1
	this.instance_14 = new lib.text22("synched",0);
	this.instance_14.setTransform(319.8,131.2,1.0004,0.9984);
	this.instance_14.alpha = 0;
	this.instance_14._off = true;

	var maskedShapeInstanceList = [this.instance_14];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(559).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(521));

	// Masked_Layer_12___1
	this.instance_15 = new lib.shape21("synched",0);
	this.instance_15.setTransform(230,192.15,1,0.9998);
	this.instance_15.alpha = 0;
	this.instance_15._off = true;

	var maskedShapeInstanceList = [this.instance_15];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(559).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(521));

	// Masked_Layer_10___1
	this.instance_16 = new lib.sprite5();
	this.instance_16.setTransform(276.65,146.3,2.0295,2.03,-89.9983);
	this.instance_16.alpha = 0;
	this.instance_16._off = true;

	var maskedShapeInstanceList = [this.instance_16];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(559).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(521));

	// Masked_Layer_9___1
	this.instance_17 = new lib.shape20("synched",0);
	this.instance_17.setTransform(230,192.15,1,0.9998);
	this.instance_17.alpha = 0;
	this.instance_17._off = true;

	var maskedShapeInstanceList = [this.instance_17];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(559).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(521));

	// Masked_Layer_8___1
	this.instance_18 = new lib.text19("synched",0);
	this.instance_18.setTransform(321.2,13.3,1,0.9998);
	this.instance_18.alpha = 0;
	this.instance_18._off = true;

	var maskedShapeInstanceList = [this.instance_18];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(559).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(521));

	// Masked_Layer_7___1
	this.instance_19 = new lib.shape18("synched",0);
	this.instance_19.setTransform(230,192.15,1,0.9998);
	this.instance_19.alpha = 0;
	this.instance_19._off = true;

	var maskedShapeInstanceList = [this.instance_19];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(559).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(521));

	// Masked_Layer_5___1
	this.instance_20 = new lib.sprite5();
	this.instance_20.setTransform(260.85,29.1,2.0295,2.03,-75.0018);
	this.instance_20.alpha = 0;
	this.instance_20._off = true;

	var maskedShapeInstanceList = [this.instance_20];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(559).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(521));

	// Masked_Layer_4___1
	this.instance_21 = new lib.shape17("synched",0);
	this.instance_21.setTransform(230,192.15,1,0.9998);
	this.instance_21.alpha = 0;
	this.instance_21._off = true;

	var maskedShapeInstanceList = [this.instance_21];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(559).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(521));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-561.8,-1,1029.9,386.4);


(lib.sprite249 = function(mode,startPosition,loop,reversed) {
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
	this.frame_1044 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1044).call(this.frame_1044).wait(1));

	// Masked_Layer_44___34
	this.instance = new lib.text248("synched",0);
	this.instance.setTransform(-786.9,-94.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1045));

	// Masked_Layer_43___34
	this.instance_1 = new lib.shape247("synched",0);
	this.instance_1.setTransform(-221.2,-31.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1045));

	// Masked_Layer_41___34
	this.instance_2 = new lib.text246("synched",0);
	this.instance_2.setTransform(-786.9,19.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1045));

	// Masked_Layer_40___34
	this.instance_3 = new lib.text245("synched",0);
	this.instance_3.setTransform(-786.9,-50.25);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1045));

	// Masked_Layer_39___34
	this.instance_4 = new lib.text244("synched",0);
	this.instance_4.setTransform(-786.9,65.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1045));

	// Masked_Layer_38___34
	this.instance_5 = new lib.text243("synched",0);
	this.instance_5.setTransform(-786.9,-164.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1045));

	// Masked_Layer_37___34
	this.instance_6 = new lib.shape79("synched",0);
	this.instance_6.setTransform(-221.2,0);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1045));

	// Masked_Layer_36___34
	this.instance_7 = new lib.text242("synched",0);
	this.instance_7.setTransform(-810.1,-190.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1045));

	// Masked_Layer_35___34
	this.instance_8 = new lib.shape79("synched",0);
	this.instance_8.setTransform(-221.2,114.85);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1045));

	// Layer_16
	this.instance_9 = new lib.sprite241();
	this.instance_9.setTransform(-5.75,-35.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1045));

	// Layer_1
	this.instance_10 = new lib.sprite226();
	this.instance_10.setTransform(-8.8,132.85);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1045));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-814,-193.8,994.8,402.70000000000005);


(lib.sprite103 = function(mode,startPosition,loop,reversed) {
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
	this.frame_1049 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1049).call(this.frame_1049).wait(1));

	// Masked_Layer_22___11
	this.instance = new lib.shape79("synched",0);
	this.instance.setTransform(22.5,174.45);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1050));

	// Masked_Layer_21___11
	this.instance_1 = new lib.text86("synched",0);
	this.instance_1.setTransform(-546.6,9.5,0.9998,1);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1050));

	// Masked_Layer_20___11
	this.instance_2 = new lib.shape85("synched",0);
	this.instance_2.setTransform(-189.6,0);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1050));

	// Masked_Layer_17___11
	this.instance_3 = new lib.text84("synched",0);
	this.instance_3.setTransform(-546.6,230.25,0.9998,1);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1050));

	// Masked_Layer_16___11
	this.instance_4 = new lib.text83("synched",0);
	this.instance_4.setTransform(-546.6,199.7,0.9998,1);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1050));

	// Masked_Layer_15___11
	this.instance_5 = new lib.text82("synched",0);
	this.instance_5.setTransform(-554.5,153.75,0.9998,1);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1050));

	// Masked_Layer_14___11
	this.instance_6 = new lib.text81("synched",0);
	this.instance_6.setTransform(-546.6,99.5,0.9998,1);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1050));

	// Masked_Layer_13___11
	this.instance_7 = new lib.text80("synched",0);
	this.instance_7.setTransform(-546.6,52.4,0.9998,1);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1050));

	// Masked_Layer_12___11
	this.instance_8 = new lib.shape79("synched",0);
	this.instance_8.setTransform(22.5,263.35);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1050));

	// Layer_27
	this.instance_9 = new lib.sprite102();
	this.instance_9.setTransform(209.8,179.35);
	this.instance_9.alpha = 0;
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(639).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(391));

	// Layer_26
	this.instance_10 = new lib.text78("synched",0);
	this.instance_10.setTransform(352.45,32.15);
	this.instance_10.alpha = 0;
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(434).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(185).to({startPosition:0},0).to({alpha:0},11).to({_off:true},1).wait(399));

	// Layer_25
	this.instance_11 = new lib.shape77("synched",0);
	this.instance_11.setTransform(183.2,194.35);
	this.instance_11.alpha = 0;
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(434).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(185).to({startPosition:0},0).to({alpha:0},11).to({_off:true},1).wait(399));

	// Layer_24
	this.instance_12 = new lib.text94("synched",0);
	this.instance_12.setTransform(-9.8,0.35);
	this.instance_12.alpha = 0;
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(434).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(185).to({startPosition:0},0).to({alpha:0},11).to({_off:true},1).wait(399));

	// Layer_22
	this.instance_13 = new lib.sprite5();
	this.instance_13.setTransform(251.5,38.7,1.8,1.8,-89.9976);
	this.instance_13.alpha = 0;
	this.instance_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(434).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(185).to({alpha:0},11).to({_off:true},1).wait(399));

	// Layer_21
	this.instance_14 = new lib.shape93("synched",0);
	this.instance_14.setTransform(183.2,194.35);
	this.instance_14.alpha = 0;
	this.instance_14._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(434).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(185).to({startPosition:0},0).to({alpha:0},11).to({_off:true},1).wait(399));

	// Layer_19
	this.instance_15 = new lib.shape92("synched",0);
	this.instance_15.setTransform(64.25,293.4,1.3208,1.3208);
	this.instance_15.alpha = 0;
	this.instance_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(434).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(185).to({startPosition:0},0).to({alpha:0},11).to({_off:true},1).wait(399));

	// Layer_18
	this.instance_16 = new lib.text78("synched",0);
	this.instance_16.setTransform(341.45,130.15);
	this.instance_16.alpha = 0;
	this.instance_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(244).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(170).to({startPosition:0},0).to({alpha:0},10).to({_off:true},1).wait(605));

	// Layer_17
	this.instance_17 = new lib.shape77("synched",0);
	this.instance_17.setTransform(172.2,292.35);
	this.instance_17.alpha = 0;
	this.instance_17._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(244).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(170).to({startPosition:0},0).to({alpha:0},10).to({_off:true},1).wait(605));

	// Layer_16
	this.instance_18 = new lib.text90("synched",0);
	this.instance_18.setTransform(-9.8,0.35);
	this.instance_18.alpha = 0;
	this.instance_18._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(244).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(170).to({startPosition:0},0).to({alpha:0},10).to({_off:true},1).wait(605));

	// Layer_14
	this.instance_19 = new lib.sprite5();
	this.instance_19.setTransform(280.5,135.7,1.8,1.8,-89.9976);
	this.instance_19.alpha = 0;
	this.instance_19._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(244).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(170).to({alpha:0},10).to({_off:true},1).wait(605));

	// Layer_13
	this.instance_20 = new lib.shape89("synched",0);
	this.instance_20.setTransform(183.2,194.35);
	this.instance_20.alpha = 0;
	this.instance_20._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(244).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(170).to({startPosition:0},0).to({alpha:0},10).to({_off:true},1).wait(605));

	// Layer_11
	this.instance_21 = new lib.shape88("synched",0);
	this.instance_21.setTransform(64.25,293.4,1.3208,1.3208);
	this.instance_21.alpha = 0;
	this.instance_21._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(244).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(170).to({startPosition:0},0).to({alpha:0},10).to({_off:true},1).wait(605));

	// Layer_10
	this.instance_22 = new lib.text78("synched",0);
	this.instance_22.setTransform(332.25,101.95);

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(244).to({startPosition:0},0).to({alpha:0},10).to({_off:true},1).wait(795));

	// Layer_9
	this.instance_23 = new lib.shape77("synched",0);
	this.instance_23.setTransform(163,264.15);

	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(244).to({startPosition:0},0).to({alpha:0},10).to({_off:true},1).wait(795));

	// Layer_8
	this.instance_24 = new lib.text76("synched",0);
	this.instance_24.setTransform(-9.8,0.35);

	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(244).to({startPosition:0},0).to({alpha:0},10).to({_off:true},1).wait(795));

	// Layer_6
	this.instance_25 = new lib.sprite5();
	this.instance_25.setTransform(274.5,108.7,1.8,1.8,-89.9976);

	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(244).to({alpha:0},10).to({_off:true},1).wait(795));

	// Layer_5
	this.instance_26 = new lib.shape75("synched",0);
	this.instance_26.setTransform(183.2,194.35);

	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(244).to({startPosition:0},0).to({alpha:0},10).to({_off:true},1).wait(795));

	// Layer_3
	this.instance_27 = new lib.shape74("synched",0);
	this.instance_27.setTransform(372.5,175.45,0.6351,0.6351);

	this.timeline.addTween(cjs.Tween.get(this.instance_27).wait(244).to({startPosition:0},0).to({alpha:0},10).to({_off:true},1).wait(795));

	// Layer_1
	this.instance_28 = new lib.shape72("synched",0);
	this.instance_28.setTransform(183.25,196.4,1.3208,1.3208);

	this.timeline.addTween(cjs.Tween.get(this.instance_28).wait(244).to({startPosition:0},0).to({alpha:0},10).to({_off:true},1).wait(795));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-558.5,-3.5,999.1,392);


// stage content:
(lib.vital_opsm_ct = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {p1:0,p2:1100,p3:2154,p4:3134,p5:3369,p6:4224};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,1,1098,1099,1100,1101,2152,2153,2154,2155,3132,3133,3134,3135,3367,3368,3369,3370,4222,4223,4224,4225,5268];
	this.streamSoundSymbolsList[1] = [{id:"vital_opsm_ct1",startFrame:1,endFrame:1099,loop:1,offset:0}];
	this.streamSoundSymbolsList[1101] = [{id:"vital_opsm_ct2",startFrame:1101,endFrame:2153,loop:1,offset:0}];
	this.streamSoundSymbolsList[2155] = [{id:"vital_opsm_ct3",startFrame:2155,endFrame:3133,loop:1,offset:0}];
	this.streamSoundSymbolsList[3135] = [{id:"vital_opsm_ct4",startFrame:3135,endFrame:3368,loop:1,offset:0}];
	this.streamSoundSymbolsList[3370] = [{id:"vital_opsm_ct5",startFrame:3370,endFrame:4223,loop:1,offset:0}];
	this.streamSoundSymbolsList[4225] = [{id:"vital_opsm_ct6",startFrame:4225,endFrame:5268,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		InitPage(6);
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
			GetUrlMain("vitalmenu_ct");
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
		var soundInstance = playSound("vital_opsm_ct1",0);
		this.InsertIntoSoundStreamData(soundInstance,1,1099,1);
	}
	this.frame_1098 = function() {
		this.stop();
	}
	this.frame_1099 = function() {
		this.stop();
	}
	this.frame_1100 = function() {
		Prev(1);
		InitAnim();
	}
	this.frame_1101 = function() {
		var soundInstance = playSound("vital_opsm_ct2",0);
		this.InsertIntoSoundStreamData(soundInstance,1101,2153,1);
	}
	this.frame_2152 = function() {
		this.stop();
	}
	this.frame_2153 = function() {
		this.stop();
	}
	this.frame_2154 = function() {
		InitAnim();
	}
	this.frame_2155 = function() {
		var soundInstance = playSound("vital_opsm_ct3",0);
		this.InsertIntoSoundStreamData(soundInstance,2155,3133,1);
	}
	this.frame_3132 = function() {
		this.stop();
	}
	this.frame_3133 = function() {
		this.stop();
	}
	this.frame_3134 = function() {
		InitAnim();
	}
	this.frame_3135 = function() {
		var soundInstance = playSound("vital_opsm_ct4",0);
		this.InsertIntoSoundStreamData(soundInstance,3135,3368,1);
	}
	this.frame_3367 = function() {
		this.stop();
	}
	this.frame_3368 = function() {
		this.stop();
	}
	this.frame_3369 = function() {
		Next(1);
		InitAnim();
	}
	this.frame_3370 = function() {
		var soundInstance = playSound("vital_opsm_ct5",0);
		this.InsertIntoSoundStreamData(soundInstance,3370,4223,1);
	}
	this.frame_4222 = function() {
		this.stop();
	}
	this.frame_4223 = function() {
		this.stop();
	}
	this.frame_4224 = function() {
		Next(0);
		InitAnim();
	}
	this.frame_4225 = function() {
		var soundInstance = playSound("vital_opsm_ct6",0);
		this.InsertIntoSoundStreamData(soundInstance,4225,5268,1);
	}
	this.frame_5268 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1097).call(this.frame_1098).wait(1).call(this.frame_1099).wait(1).call(this.frame_1100).wait(1).call(this.frame_1101).wait(1051).call(this.frame_2152).wait(1).call(this.frame_2153).wait(1).call(this.frame_2154).wait(1).call(this.frame_2155).wait(977).call(this.frame_3132).wait(1).call(this.frame_3133).wait(1).call(this.frame_3134).wait(1).call(this.frame_3135).wait(232).call(this.frame_3367).wait(1).call(this.frame_3368).wait(1).call(this.frame_3369).wait(1).call(this.frame_3370).wait(852).call(this.frame_4222).wait(1).call(this.frame_4223).wait(1).call(this.frame_4224).wait(1).call(this.frame_4225).wait(1043).call(this.frame_5268).wait(1));

	// Layer_back
	this.back = new lib.buttonbak();
	this.back.name = "back";
	this.back.setTransform(350,645,1.0001,1.0002);
	new cjs.ButtonHelper(this.back, 0, 1, 2, false, new lib.buttonbak(), 3);

	this.timeline.addTween(cjs.Tween.get(this.back).wait(5269));

	// Layer_page
	this.page = new cjs.Text("Page number", "italic bold 15px 'Arial'", "#FF9900");
	this.page.name = "page";
	this.page.lineHeight = 17;
	this.page.lineWidth = 193;
	this.page.parent = this;
	this.page.setTransform(23,658,1.4989,1.4989);

	this.timeline.addTween(cjs.Tween.get(this.page).wait(5269));

	// Layer_next
	this.next = new lib.buttonnext();
	this.next.name = "next";
	this.next.setTransform(1496.1,5.1,0.9998,0.9999,0,0,0,0.1,0.1);
	new cjs.ButtonHelper(this.next, 0, 1, 2, false, new lib.buttonnext(), 3);

	this.timeline.addTween(cjs.Tween.get(this.next).wait(5269));

	// Layer_previous
	this.previous = new lib.buttonprev();
	this.previous.name = "previous";
	this.previous.setTransform(1432,5,1.0003,0.9993);
	new cjs.ButtonHelper(this.previous, 0, 1, 2, false, new lib.buttonprev(), 3);

	this.timeline.addTween(cjs.Tween.get(this.previous).wait(5269));

	// Layer_slider
	this.slider = new lib.sprite_slider();
	this.slider.name = "slider";
	this.slider.setTransform(610.1,670.1,0.9937,0.9983,0,0,0,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.slider).wait(5269));

	// Layer_replay
	this.replay = new lib.sprite_replay();
	this.replay.name = "replay";
	this.replay.setTransform(1045.1,650.1,0.9999,0.9999,0,0,0,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.replay).wait(5269));

	// Layer_slider_base
	this.instance = new lib.sprite_sliderbase();
	this.instance.setTransform(600,650,1,0.9999);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(5269));

	// Layer_playpau
	this.playpau = new lib.sprite_playpau();
	this.playpau.name = "playpau";
	this.playpau.setTransform(555,650,0.9999,0.9999);

	this.timeline.addTween(cjs.Tween.get(this.playpau).wait(5269));

	// Layer_192
	this.instance_1 = new lib.text49("synched",0);
	this.instance_1.setTransform(814.3,67.25,1.3957,1.3948);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:true},1100).wait(2034).to({_off:false},0).wait(2135));

	// Layer_177
	this.instance_2 = new lib.text216("synched",0);
	this.instance_2.setTransform(35.9,65.55,1.3957,1.3948);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(3369).to({_off:false},0).wait(1900));

	// Layer_176
	this.instance_3 = new lib.text189("synched",0);
	this.instance_3.setTransform(829.3,349,1.3957,1.3948);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(3369).to({_off:false},0).to({_off:true},855).wait(1045));

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(0.5,1,1).p("AASASQgHAHgLAAQgKAAgHgHQgHgHAAgLQAAgJAHgIQAHgHAKAAQALAAAHAHQAHAIAAAJQAAALgHAHg");
	this.shape.setTransform(24.5,76.35);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#003366").s().p("AgRASQgHgIAAgKQAAgJAHgIQAHgHAKAAQAKAAAIAHQAHAIAAAJQAAAKgHAIQgIAHgKAAQgKAAgHgHg");
	this.shape_1.setTransform(24.5,76.35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},3369).wait(1900));

	// Layer_174
	this.instance_4 = new lib.text30("synched",0);
	this.instance_4.setTransform(10,0,1.3948,1.3948);

	this.instance_5 = new lib.text104("synched",0);
	this.instance_5.setTransform(10,0,1.3948,1.3948);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4}]}).to({state:[{t:this.instance_5}]},1100).wait(4169));

	// Mask_Layer_1 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("Eh8/AyyMAAAhfTMD5/AAAMAAABfTg");
	mask.setTransform(800,325);

	// Masked_Layer_3___2
	this.ani1 = new lib.sprite26();
	this.ani1.name = "ani1";
	this.ani1.setTransform(804.4,91.65,1.3948,1.3948);

	this.ani2 = new lib.sprite103();
	this.ani2.name = "ani2";
	this.ani2.setTransform(804,91.65,1.3948,1.3948);

	this.ani3 = new lib.sprite133();
	this.ani3.name = "ani3";
	this.ani3.setTransform(804,91.65,1.3948,1.3948);

	this.ani4 = new lib.sprite188();
	this.ani4.name = "ani4";
	this.ani4.setTransform(804,105.6,1.3948,1.3948);

	this.ani5 = new lib.sprite214();
	this.ani5.name = "ani5";
	this.ani5.setTransform(1123.05,396.3,1.3948,1.3948);

	this.ani6 = new lib.sprite249();
	this.ani6.name = "ani6";
	this.ani6.setTransform(1164.6,371.3,1.3948,1.3948);

	var maskedShapeInstanceList = [this.ani1,this.ani2,this.ani3,this.ani4,this.ani5,this.ani6];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.ani1}]}).to({state:[{t:this.ani2}]},1100).to({state:[{t:this.ani3}]},1054).to({state:[{t:this.ani4}]},980).to({state:[{t:this.ani5}]},235).to({state:[{t:this.ani6}]},855).wait(1045));

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
		{src:"images/vital_opsm_ct_atlas_1.png", id:"vital_opsm_ct_atlas_1"},
		{src:"images/vital_opsm_ct_atlas_2.png", id:"vital_opsm_ct_atlas_2"},
		{src:"images/vital_opsm_ct_atlas_3.png", id:"vital_opsm_ct_atlas_3"},
		{src:"sounds/vital_opsm_ct1.mp3", id:"vital_opsm_ct1"},
		{src:"sounds/vital_opsm_ct2.mp3", id:"vital_opsm_ct2"},
		{src:"sounds/vital_opsm_ct3.mp3", id:"vital_opsm_ct3"},
		{src:"sounds/vital_opsm_ct4.mp3", id:"vital_opsm_ct4"},
		{src:"sounds/vital_opsm_ct5.mp3", id:"vital_opsm_ct5"},
		{src:"sounds/vital_opsm_ct6.mp3", id:"vital_opsm_ct6"}
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