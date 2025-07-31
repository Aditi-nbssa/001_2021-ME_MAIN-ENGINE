(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"vital_opsm_eg_atlas_1", frames: [[964,2115,1198,335],[0,0,3086,630],[0,3020,3037,481],[0,3503,3037,481],[0,2537,3160,481],[3475,0,580,657],[0,632,962,1903],[3039,3020,1034,986],[2362,1586,663,812],[2362,632,1111,952],[964,1662,1291,451],[964,632,1396,1028],[3027,1586,494,779]]},
		{name:"vital_opsm_eg_atlas_2", frames: [[2917,1399,879,173],[1178,1212,1170,173],[2042,2838,450,110],[0,704,1231,173],[1233,862,1231,173],[2137,1696,1234,120],[1805,687,1234,173],[2137,1574,1255,120],[2538,2473,249,99],[1654,704,132,99],[1569,2967,207,99],[315,2786,304,99],[0,2679,373,99],[315,2887,297,99],[2494,2898,492,99],[2988,2950,483,99],[711,2679,326,99],[885,2473,834,120],[1679,2229,1176,120],[990,2107,1207,120],[1103,2595,1185,66],[0,1229,1170,173],[1721,2473,815,120],[1233,704,419,155],[2137,1414,738,155],[3041,687,575,155],[1172,1387,649,294],[0,283,743,277],[1016,2873,229,99],[3934,1096,132,105],[1602,2860,232,105],[3857,3027,235,105],[1039,2765,303,106],[711,2780,303,106],[614,2888,210,106],[293,2988,210,106],[0,2990,210,106],[1836,2950,210,106],[3934,929,132,165],[2042,2663,237,165],[3033,1818,229,165],[0,2780,313,106],[476,2148,294,59],[2137,1818,894,165],[3394,1574,365,110],[2811,0,1189,227],[2137,1985,1210,120],[2692,2660,639,110],[2538,2576,1185,82],[375,2679,334,105],[3473,3027,382,99],[3577,2757,412,155],[2692,2772,520,124],[0,0,1165,281],[2466,862,1185,173],[2811,229,1174,227],[0,2473,883,120],[1662,1996,430,105],[0,562,717,105],[1645,2351,1158,120],[0,1054,1176,173],[1194,1037,1179,173],[2199,2107,1207,120],[0,2595,1101,82],[2307,571,459,110],[3288,2351,770,124],[3767,1949,326,107],[0,2888,291,100],[3577,2914,517,111],[1103,2663,675,100],[0,1404,670,277],[1247,2973,198,99],[1167,0,1148,277],[1344,2869,223,102],[1344,2765,256,102],[3408,2058,633,159],[476,2351,1167,120],[2811,458,1170,227],[2857,2229,1176,120],[0,879,1192,173],[476,2229,1201,120],[1823,1387,312,607],[4072,0,14,1191],[3653,687,279,551],[2317,0,492,569],[1654,805,113,53],[1039,2679,60,60],[3288,2477,276,53],[0,2055,474,380],[1167,279,636,423],[2917,1037,480,360],[3577,2660,125,94],[3566,2477,125,94],[672,1404,493,370],[3333,2660,242,288],[990,1776,167,272],[2805,2351,481,223],[1780,2663,260,195],[1167,1683,493,370],[2290,2660,400,176],[2375,1037,540,375],[3983,458,87,469],[0,1683,493,370],[1805,279,500,375],[3399,1037,229,358],[3767,1574,260,373],[3725,2477,322,278],[3798,1240,267,291],[3373,1696,392,360],[495,1776,493,370],[745,283,382,410]]}
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
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_101 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_100 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_99 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_98 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_97 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_96 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_95 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_94 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_93 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_92 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_91 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_90 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_89 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_88 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_87 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_86 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_85 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_84 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_83 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_82 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_81 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_80 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_79 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_78 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_77 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_76 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_75 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_74 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_73 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_72 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_71 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_70 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_69 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_68 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_67 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(30);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_66 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(31);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_65 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(32);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_64 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(33);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_63 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(34);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_62 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(35);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_61 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(36);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_60 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(37);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_59 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(38);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_58 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(39);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_57 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(40);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_56 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(41);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_55 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(42);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_54 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(43);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_53 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(44);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_52 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(45);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_51 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(46);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_50 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(47);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_49 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(48);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_48 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(49);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_47 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(50);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_46 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(51);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_45 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(52);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_44 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(53);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_43 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(54);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_42 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(55);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_41 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(56);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_40 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(57);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_39 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(58);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_38 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(59);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_37 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(60);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_36 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(61);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_35 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(62);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_34 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(63);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_33 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(64);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_32 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(65);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_31 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(66);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_30 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(67);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_29 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(68);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_28 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(69);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_27 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(70);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_26 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(71);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_25 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(72);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_24 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(73);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_23 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(74);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_22 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(75);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_21 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(76);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_20 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(77);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_19 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(78);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_18 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(79);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_17 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(80);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_16 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(81);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_15 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_13 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(82);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_12 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_11 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(83);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_10 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_9 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_8 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_7 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_6 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_1"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_5 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_1"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_4 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(84);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_3 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(85);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(86);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(87);
}).prototype = p = new cjs.Sprite();



(lib.image11 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(88);
}).prototype = p = new cjs.Sprite();



(lib.image115 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(89);
}).prototype = p = new cjs.Sprite();



(lib.image118 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(90);
}).prototype = p = new cjs.Sprite();



(lib.image124 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(91);
}).prototype = p = new cjs.Sprite();



(lib.image126 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(92);
}).prototype = p = new cjs.Sprite();



(lib.image14 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(93);
}).prototype = p = new cjs.Sprite();



(lib.image148 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(94);
}).prototype = p = new cjs.Sprite();



(lib.image156 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(95);
}).prototype = p = new cjs.Sprite();



(lib.image162 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(96);
}).prototype = p = new cjs.Sprite();



(lib.image197 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(97);
}).prototype = p = new cjs.Sprite();



(lib.image20 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(98);
}).prototype = p = new cjs.Sprite();



(lib.image221 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(99);
}).prototype = p = new cjs.Sprite();



(lib.image231 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(100);
}).prototype = p = new cjs.Sprite();



(lib.image235 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(101);
}).prototype = p = new cjs.Sprite();



(lib.image27 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(102);
}).prototype = p = new cjs.Sprite();



(lib.image271 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(103);
}).prototype = p = new cjs.Sprite();



(lib.image278 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(104);
}).prototype = p = new cjs.Sprite();



(lib.image281 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(105);
}).prototype = p = new cjs.Sprite();



(lib.image29 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(106);
}).prototype = p = new cjs.Sprite();



(lib.image36 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(107);
}).prototype = p = new cjs.Sprite();



(lib.image48 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(108);
}).prototype = p = new cjs.Sprite();



(lib.image52 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(109);
}).prototype = p = new cjs.Sprite();



(lib.image56 = function() {
	this.initialize(ss["vital_opsm_eg_atlas_2"]);
	this.gotoAndStop(110);
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
	this.instance = new lib.CachedBmp_101();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,398.7,111.5);


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
	this.instance = new lib.CachedBmp_100();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,389.4,57.599999999999994);


(lib.text269 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(-3.95,-3.9,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.9,149.8,36.6);


(lib.text266 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,409.7,57.599999999999994);


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
	this.instance = new lib.CachedBmp_97();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,409.7,57.599999999999994);


(lib.text264 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,410.7,39.9);


(lib.text263 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,410.7,57.599999999999994);


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
	this.instance = new lib.CachedBmp_94();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,417.7,39.9);


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
	this.instance = new lib.CachedBmp_93();
	this.instance.setTransform(-3.95,-3.65,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.6,82.9,32.9);


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
	this.instance = new lib.CachedBmp_92();
	this.instance.setTransform(-3.95,-3.65,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.6,43.9,32.9);


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
	this.instance = new lib.CachedBmp_91();
	this.instance.setTransform(-3.95,-3.65,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.6,68.9,32.9);


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
	this.instance = new lib.CachedBmp_90();
	this.instance.setTransform(-3.95,-3.65,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.6,101.2,32.9);


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
	this.instance = new lib.CachedBmp_89();
	this.instance.setTransform(-3.95,-3.65,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.6,124.10000000000001,32.9);


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
	this.instance = new lib.CachedBmp_88();
	this.instance.setTransform(-3.95,-3.65,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.6,98.80000000000001,32.9);


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
	this.instance = new lib.CachedBmp_87();
	this.instance.setTransform(-0.75,-3.65,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.7,-3.6,163.7,32.9);


(lib.text239 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(-0.75,-2.7,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.7,-2.7,160.7,33);


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
	this.instance = new lib.CachedBmp_85();
	this.instance.setTransform(-3.95,-3.65,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.6,108.5,32.9);


(lib.text230 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,277.59999999999997,39.9);


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
	this.instance = new lib.CachedBmp_83();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,391.4,39.9);


(lib.text228 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,401.7,39.9);


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
	this.instance = new lib.CachedBmp_81();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,394.4,21.900000000000002);


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
	this.instance = new lib.CachedBmp_80();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,389.4,57.599999999999994);


(lib.text224 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,271.29999999999995,39.9);


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
	this.instance = new lib.CachedBmp_78();
	this.instance.setTransform(23.8,-2.1,0.119,0.119);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(23.8,-2.1,49.900000000000006,18.5);


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
	this.instance = new lib.CachedBmp_77();
	this.instance.setTransform(3.15,-2.1,0.119,0.119);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(3.2,-2.1,87.8,18.5);


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
	this.instance = new lib.CachedBmp_76();
	this.instance.setTransform(13.65,-2.1,0.119,0.119);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(13.7,-2.1,68.39999999999999,18.5);


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
	this.instance = new lib.CachedBmp_75();
	this.instance.setTransform(7.45,-3.7,0.119,0.119);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(7.5,-3.7,77.2,35);


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
	this.instance = new lib.CachedBmp_74();
	this.instance.setTransform(-3.95,-3.35,0.12,0.12);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,370.4,75.6);


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
	this.instance = new lib.CachedBmp_73();
	this.instance.setTransform(-3.95,-3.35,0.12,0.12);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,364.5,57.699999999999996);


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
	this.instance = new lib.CachedBmp_72();
	this.instance.setTransform(-3.95,-3.35,0.12,0.12);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,364.5,57.699999999999996);


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
	this.instance = new lib.CachedBmp_71();
	this.instance.setTransform(-3.95,-3.35,0.12,0.12);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,379.29999999999995,57.699999999999996);


(lib.text195 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(10.15,-2.9,0.119,0.119);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(10.2,-2.9,88.39999999999999,33);


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
	this.instance = new lib.CachedBmp_69();
	this.instance.setTransform(22.8,-2.85,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(22.8,-2.8,76.2,32.9);


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
	this.instance = new lib.CachedBmp_68();
	this.instance.setTransform(37.45,-2.05,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(37.5,-2,43.900000000000006,34.9);


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
	this.instance = new lib.CachedBmp_67();
	this.instance.setTransform(21.55,-2.05,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(21.6,-2,77.19999999999999,34.9);


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
	this.instance = new lib.CachedBmp_66();
	this.instance.setTransform(20.75,-2.05,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(20.8,-2,78.2,34.9);


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
	this.instance = new lib.CachedBmp_65();
	this.instance.setTransform(-7.9,-3.55,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-7.9,-3.5,100.9,35.3);


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
	this.instance = new lib.CachedBmp_64();
	this.instance.setTransform(-7.9,-3.55,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-7.9,-3.5,100.9,35.3);


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
	this.instance = new lib.CachedBmp_63();
	this.instance.setTransform(6.15,-3.55,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(6.2,-3.5,69.89999999999999,35.3);


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
	this.instance = new lib.CachedBmp_62();
	this.instance.setTransform(6.15,-3.55,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(6.2,-3.5,69.89999999999999,35.3);


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
	this.instance = new lib.CachedBmp_61();
	this.instance.setTransform(6.15,-3.55,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(6.2,-3.5,69.89999999999999,35.3);


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
	this.instance = new lib.CachedBmp_60();
	this.instance.setTransform(6.15,-3.55,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(6.2,-3.5,69.89999999999999,35.3);


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
	this.instance = new lib.CachedBmp_59();
	this.instance.setTransform(13,-3.55,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(13,-3.5,44,54.9);


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
	this.instance = new lib.CachedBmp_58();
	this.instance.setTransform(-2.9,-3.55,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2.9,-3.5,78.9,54.9);


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
	this.instance = new lib.CachedBmp_57();
	this.instance.setTransform(-3.95,-3.55,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.5,76.2,54.9);


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
	this.instance = new lib.CachedBmp_56();
	this.instance.setTransform(-3.95,-3.55,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.5,104.2,35.3);


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
	this.instance = new lib.CachedBmp_55();
	this.instance.setTransform(-3.95,-3.55,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.5,97.80000000000001,19.6);


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
	this.instance = new lib.CachedBmp_54();
	this.instance.setTransform(-3.95,-3.55,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.5,297.5,54.9);


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
	this.instance = new lib.CachedBmp_53();
	this.instance.setTransform(21.65,-3.9,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(21.7,-3.9,121.49999999999999,36.6);


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
	this.instance = new lib.CachedBmp_52();
	this.instance.setTransform(15.9,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(15.9,-3.3,395.8,75.5);


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
	this.instance = new lib.CachedBmp_51();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,402.7,39.9);


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
	this.instance = new lib.CachedBmp_50();
	this.instance.setTransform(-19.75,-3.9,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.7,-3.9,212.7,36.6);


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
	this.instance = new lib.CachedBmp_49();
	this.instance.setTransform(0,0,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,394.5,27.3);


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
	this.instance = new lib.CachedBmp_48();
	this.instance.setTransform(-9,-2.25,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9,-2.2,111.2,34.900000000000006);


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
	this.instance = new lib.CachedBmp_47();
	this.instance.setTransform(-3.95,-3.65,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.6,127.10000000000001,32.9);


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
	this.instance = new lib.CachedBmp_46();
	this.instance.setTransform(2,-3.65,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(2,-3.6,137.2,51.6);


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
	this.instance = new lib.CachedBmp_45();
	this.instance.setTransform(-3.95,-3.75,0.3326,0.3326);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,172.9,41.2);


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
	this.instance = new lib.CachedBmp_44();
	this.instance.setTransform(15.9,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(15.9,-3.3,387.8,93.5);


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
	this.instance = new lib.CachedBmp_43();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,394.4,57.599999999999994);


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
	this.instance = new lib.CachedBmp_42();
	this.instance.setTransform(15.9,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(15.9,-3.3,390.8,75.5);


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
	this.instance = new lib.CachedBmp_41();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,293.9,39.9);


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
	this.instance = new lib.CachedBmp_40();
	this.instance.setTransform(-6.6,-3.7,0.3153,0.3153);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-6.6,-3.7,135.6,33.1);


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
	this.instance = new lib.CachedBmp_39();
	this.instance.setTransform(-4,-3.7,0.3153,0.3153);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.7,226.1,33.1);


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
	this.instance = new lib.CachedBmp_38();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,385.4,39.9);


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
	this.instance = new lib.CachedBmp_37();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,391.4,57.599999999999994);


(lib.text111 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,392.4,57.599999999999994);


(lib.text110 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,401.7,39.9);


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
	this.instance = new lib.CachedBmp_34();
	this.instance.setTransform(0,0,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,366.5,27.3);


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
	this.instance = new lib.CachedBmp_33();
	this.instance.setTransform(-3.95,-3.9,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.9,152.8,36.6);


(lib.text66 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(-3.95,-3.75,0.3326,0.3326);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,256.09999999999997,41.2);


(lib.text60 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(-4,-2.8,0.3284,0.3284);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-2.8,107.1,35.199999999999996);


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
	this.instance = new lib.CachedBmp_30();
	this.instance.setTransform(-2.4,-2.1,0.3284,0.3284);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2.4,-2.1,95.60000000000001,32.9);


(lib.text55 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(-0.65,-1.75,0.3156,0.3156);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.6,-1.7,163.1,35);


(lib.text51 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(-1.55,-2.9,0.3286,0.3286);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.5,-2.9,221.8,32.9);


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
	this.instance = new lib.CachedBmp_27();
	this.instance.setTransform(37.15,-3.65,0.1191,0.1191);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(37.2,-3.6,79.8,33);


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
	this.instance = new lib.CachedBmp_26();
	this.instance.setTransform(36,-3.65,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(36,-3.6,65.9,32.9);


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
	this.instance = new lib.CachedBmp_25();
	this.instance.setTransform(37.15,-3.65,0.1191,0.1191);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(37.2,-3.6,136.7,33);


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
	this.instance = new lib.CachedBmp_24();
	this.instance.setTransform(-2.2,-2.95,0.3241,0.3241);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2.2,-2.9,72.3,33);


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
	this.instance = new lib.CachedBmp_23();
	this.instance.setTransform(-3.1,-2,0.3241,0.3241);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.1,-2,83,33.1);


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
	this.instance = new lib.CachedBmp_22();
	this.instance.setTransform(-4,-3.65,0.3241,0.3241);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.6,205.2,51.5);


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
	this.instance = new lib.CachedBmp_21();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,388.4,39.9);


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
	this.instance = new lib.CachedBmp_20();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,389.4,75.5);


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
	this.instance = new lib.CachedBmp_19();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,391.4,39.9);


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
	this.instance = new lib.CachedBmp_18();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,396.7,57.599999999999994);


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
	this.instance = new lib.CachedBmp_17();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,399.7,39.9);


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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("ADfBeIm9i7");
	this.shape.setTransform(-71.85,-68.175);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.instance = new lib.CachedBmp_16();
	this.instance.setTransform(-46.45,-100.75,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	var sprImg_shape_1 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_eg_atlas_2"],105);
	sprImg_shape_1.onload = function(){
		this.shape_1.graphics.bf(sprImg_shape_1, null, new cjs.Matrix2D(1,0,0,1,-130,-186.5)).s().p("A0TdJMAAAg6RMAonAAAMAAAA6Rg")
	}.bind(this);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-130,-186.5,260,373);


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

	// Layer_2
	this.instance = new lib.CachedBmp_15();
	this.instance.setTransform(-97.5,-83.5,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_1
	this.shape = new cjs.Shape();
	var sprImg_shape = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_eg_atlas_2"],104);
	sprImg_shape.onload = function(){
		this.shape.graphics.bf(sprImg_shape, null, new cjs.Matrix2D(1,0,0,1,-114.5,-179)).s().p("Ax4b+MAAAg37MAjxAAAMAAAA37g")
	}.bind(this);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-114.5,-179,229,358);


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

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(3,0,0,3).p("ADfBeIm9i7");
	this.shape.setTransform(-90.2,-29.275);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FF9900").ss(4,0,0,3).p("ACXjuIg3gXAEhi1Ig3gXAMlCtIAQg6AL8E+IAQg6AI1hDIg3gXAK/gKIg3gXAEIG4IA3AXAB9F/IA4AXAgMFGIA2AXALTHPIAQg6AKqJfIAQg6AIdIqIA3AXAGSHxIA4AXAGrh8Ig3gXANJAuIg3gXAsAkqIgQA6ArXm7IgQA6AqmpEIgJgEIgPA2AocoLIg3gXAkHmZIg3gXAh8lgIg4gXAmRnSIg4gXAiWENIA3AXAkgDUIA3AXAo0BiIA3AXAq+ApIA3AXAspiaIgQA6AmqCbIA3AXAtIgPIA3AWAANknIg2gX");
	this.shape_1.setTransform(2.175,17.0313);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-114,-44.3,202.3,124.1);


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

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgRARQgHgHAAgKQAAgKAHgHQAHgHAKAAQAKAAAHAHQAIAHAAAKQAAAKgIAHQgHAIgKAAQgKAAgHgIg");
	this.shape.setTransform(-347.25,56.3);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgRARQgHgGAAgLQAAgKAHgHQAHgHAKAAQAKAAAHAHQAIAHAAAKQAAALgIAGQgHAIgKAAQgKAAgHgIg");
	this.shape_1.setTransform(-347.25,9.8);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-349.7,7.3,5,51.5);


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

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("ADfBeIm9i7");
	this.shape.setTransform(-120.2,-41.275);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.instance = new lib.CachedBmp_15();
	this.instance.setTransform(-97.5,-83.5,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	var sprImg_shape_1 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_eg_atlas_2"],103);
	sprImg_shape_1.onload = function(){
		this.shape_1.graphics.bf(sprImg_shape_1, null, new cjs.Matrix2D(1,0,0,1,-250,-187.5)).s().p("EgnDAdTMAAAg6lMBOHAAAMAAAA6lg")
	}.bind(this);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-250,-187.5,500,375);


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

	// Layer_5
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgJAHgIQAIgHAJAAQAKAAAIAHQAHAIAAAJQAAAKgHAIQgIAHgKAAQgJAAgIgHg");
	this.shape.setTransform(-333.5,203.9);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_4
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgJAHgIQAIgHAJAAQAKAAAIAHQAHAIAAAJQAAAKgHAIQgIAHgKAAQgJAAgIgHg");
	this.shape_1.setTransform(-333.5,154.9);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_3
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgJAHgIQAIgHAJAAQAKAAAIAHQAHAIAAAJQAAAKgHAIQgIAHgKAAQgJAAgIgHg");
	this.shape_2.setTransform(-333.5,98.2);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_2
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgKAHgHQAIgHAJAAQAKAAAIAHQAHAHAAAKQAAAKgHAIQgIAHgKAAQgJAAgIgHg");
	this.shape_3.setTransform(-333.5,48.2);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	// Layer_1
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgRARQgHgHAAgKQAAgKAHgHQAIgHAJAAQAKAAAIAHQAHAHAAAKQAAAKgHAHQgIAIgKAAQgJAAgIgIg");
	this.shape_4.setTransform(-333.5,10.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-336,8,5,198.4);


(lib.shape261 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("Aj3iOIHvEd");
	this.shape.setTransform(175.65,305.325);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(149.3,289.5,52.69999999999999,31.69999999999999);


(lib.shape259 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AGhBeItBAAIAAi8INBAAg");
	this.shape.setTransform(128.775,129.35);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AmgBeIAAi8INBAAIAAC8g");
	this.shape_1.setTransform(128.775,129.35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(86.1,118.9,85.4,20.900000000000006);


(lib.shape257 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AjlhdIHMAAIAAC7InMAAg");
	this.shape.setTransform(127.75,277.55);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AjmBfIAAi8IHNAAIAAC8g");
	this.shape_1.setTransform(127.75,277.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(103.7,267.1,48.10000000000001,20.899999999999977);


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

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AFfBeIq9AAIAAi7IK9AAg");
	this.shape.setTransform(328.925,161.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AleBeIAAi8IK9AAIAAC8g");
	this.shape_1.setTransform(328.925,161.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(292.9,151.3,72.10000000000002,20.899999999999977);


(lib.shape254 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("AB5h4IjyDy");
	this.shape.setTransform(255.75,56.75);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(242.1,43.1,27.299999999999983,27.300000000000004);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AH8BeIv3AAIAAi8IP3AAg");
	this.shape.setTransform(324,45.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("An7BfIAAi8IP3AAIAAC8g");
	this.shape_1.setTransform(324,45.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(272.3,35.5,103.5,20.9);


(lib.shape251 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("ABshyIjXDl");
	this.shape.setTransform(231.725,37.8);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(219.4,24.8,24.69999999999999,25.999999999999996);


(lib.shape249 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AJ2BfIzsAAIAAi9ITsAAg");
	this.shape.setTransform(287.6,16.85);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("Ap1BeIAAi8ITrAAIAAC8g");
	this.shape_1.setTransform(287.6,16.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(223.6,6.4,128.1,20.9);


(lib.shape248 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("AC2BpIlrjS");
	this.shape.setTransform(272.425,149.05);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(252.7,137,39.5,24.099999999999994);


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

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("AiPCQIEfkf");
	this.shape.setTransform(184.875,105.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(169,89.6,31.80000000000001,31.80000000000001);


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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("AAABmIAAjL");
	this.shape.setTransform(263.75,373.65);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(262.3,362,3,23.399999999999977);


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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("AAAhlIAADL");
	this.shape.setTransform(263.65,328.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(262.2,316.4,3,23.400000000000034);


(lib.shape244 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("AAABmIAAjL");
	this.shape.setTransform(180.25,77.65);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(178.8,66,3,23.400000000000006);


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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("AAAhlIAADL");
	this.shape.setTransform(180.15,32.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(178.7,20.4,3,23.4);


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

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AqdAAIU7AA");
	this.shape.setTransform(359.05,307.9);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(291.1,306.9,136,2);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AqEAAIUJAA");
	this.shape.setTransform(364.55,104.9);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(299.1,103.9,131,2);


(lib.shape236 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("AnN4IIg8AAAk34IIg8AAAnN2GIg8AAAk32GIg8AAAih2GIg8AAAih4IIg8AAApj4IIg8AAApj2GIg8AAADfWHIg8AAADfYJIg8AAAF1WHIg8AAAILWHIg8AAAF1YJIg8AAAILYJIg8AAAKhYJIg8AAAKhWHIg8AA");
	this.shape.setTransform(219.9,202.4);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	var sprImg_shape_1 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_eg_atlas_2"],101);
	sprImg_shape_1.onload = function(){
		this.shape_1.graphics.bf(sprImg_shape_1, null, new cjs.Matrix2D(1.069,0,0,0.688,-46.5,-161.4)).s().p("AnQZPMAAAgydIOhAAMAAAAydg")
	}.bind(this);
	this.shape_1.setTransform(223.975,198.9);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(151.2,37.5,137.5,322.9);


(lib.shape232 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	var sprImg_shape = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_eg_atlas_2"],100);
	sprImg_shape.onload = function(){
		this.shape.graphics.bf(sprImg_shape, null, new cjs.Matrix2D(1,0,0,1,-270,-187.5)).s().p("EgqLAdTMAAAg6lMBUXAAAMAAAA6lg")
	}.bind(this);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-270,-187.5,540,375);


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

	// Layer_5
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgRARQgHgGAAgLQAAgJAHgIQAIgHAJAAQAKAAAIAHQAHAIAAAJQAAALgHAGQgIAIgKAAQgJAAgIgIg");
	this.shape.setTransform(-309.95,164.7);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_4
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgJAHgIQAIgHAJAAQAKAAAIAHQAHAIAAAJQAAAKgHAIQgIAHgKAAQgJAAgIgHg");
	this.shape_1.setTransform(-309.95,192.7);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_3
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgKAHgHQAIgHAJAAQAKAAAIAHQAHAHAAAKQAAAKgHAIQgIAHgKAAQgJAAgIgHg");
	this.shape_2.setTransform(-309.95,65);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_2
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgJAHgIQAIgHAJAAQAKAAAIAHQAHAIAAAJQAAAKgHAIQgIAHgKAAQgJAAgIgHg");
	this.shape_3.setTransform(-309.95,113);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	// Layer_1
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgRARQgHgHAAgKQAAgKAHgHQAIgHAJAAQAKAAAIAHQAHAHAAAKQAAAKgHAHQgIAIgKAAQgJAAgIgIg");
	this.shape_4.setTransform(-309.95,38.3);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-312.4,35.8,5,159.39999999999998);


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
	var sprImg_shape = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_eg_atlas_2"],99);
	sprImg_shape.onload = function(){
		this.shape.graphics.bf(sprImg_shape, null, new cjs.Matrix2D(0,-1,1,0,-88,200)).s().p("AtvfQMAAAg+fIbfAAMAAAA+fg")
	}.bind(this);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-88,-200,176,400);


(lib.shape218 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#FF0000").ss(3,0,0,3).p("ADtA/InZh9");
	this.shape.setTransform(32.625,-154.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(7.5,-161.9,50.3,15.700000000000017);


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
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(3,0,0,3).p("AOKB4I8Tjv");
	this.shape.setTransform(-1003.25,322.3);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1095.3,308.8,184.19999999999993,27);


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
	this.shape.graphics.f().s("#000000").ss(3,0,0,3).p("ARpJBMgjRAAAIAAyBMAjRAAAg");
	this.shape.setTransform(-1201.15,301.825);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AxoJBIAAyBMAjRAAAIAASBg");
	this.shape_1.setTransform(-1201.15,301.825);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1315.5,242.7,228.79999999999995,118.30000000000001);


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

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AfmJVMg/LAAAIAAypMA/LAAAg");
	this.shape.setTransform(-854.925,597.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("A/lJVIAAypMA/LAAAIAASpg");
	this.shape_1.setTransform(-854.925,597.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1058.1,536.9,406.39999999999986,121.39999999999998);


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
	this.shape.graphics.f().s("#FF0000").ss(3,0,0,3).p("ACRldIkhK7");
	this.shape.setTransform(-897.925,500.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-913.9,463.6,32,73);


(lib.shape211 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("AiPF8IhbAAIAAuwIj6AAIAAiGApNppIAAKCQhCgBgJA4IAAHvACHF8IhBAAIjVAAICtkYIAoAAIAAEYAD1MyIAAjzIgZgsIhViXAB2sxIARStAKZnSIAAPFADcITIAA0s");
	this.shape.setTransform(3.025,-1.5284);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1,0,0,3).p("AnGrJQg2AjgzAtIgmAkQj3D4AAFdQAAFDDTDsIAkAnQD4D3FdAAQCTAACAgrQCzg8CQiQQA3g3Aqg8QCWjSAAkRQAAkQiWjSQgqg8g3g3QiaiajCg6QgxgPg0gIQhIgMhNAAQj9AAjJCDg");
	this.shape_1.setTransform(-0.025,0.025);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FF0200").s().p("AjEIzIgZgsIAA0sQDBA6CZCaQA3A3AqA8IAAPFQgqA8g3A2QiPCQiyA9g");
	this.shape_2.setTransform(47.25,-0.35);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFF01").s().p("AghIMIgRyuQAzAJAyAPIAAUsg");
	this.shape_3.setTransform(19.925,-15.85);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FF0098").s().p("AD1JdIAAkYIgoAAIiuEYIhaAAIAAuwIj6AAIAAiGQDIiDD+AAQBNAABHAMIARStg");
	this.shape_4.setTransform(-14.5,-24);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("Aq+IUIglgmIAAnuQAJg4BCABIAAqDQAygtA3gkIAACGID6AAIAAOwIBbAAICukYIAoAAIAAEYIBAAAIBVCXIAZAsIAADzQiBAriRAAQlfAAj3j4gAgEErIjWAAgAJOojQCWDSAAERQAAEPiWDTg");
	this.shape_5.setTransform(10.525,6.575);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#989AFE").s().p("AiOAmQAAleD3j4IAmgkIAAKDQhCgBgJA4IAAHvQjSjtAAlCg");
	this.shape_6.setTransform(-70.275,-3.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-85.5,-85.5,171,171.1);


(lib.shape209 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AfmJVMg/LAAAIAAypMA/LAAAg");
	this.shape.setTransform(121.975,633.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("A/lJVIAAypMA/LAAAIAASpg");
	this.shape_1.setTransform(121.975,633.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-81.2,573.1,406.4,121.39999999999998);


(lib.shape208 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#FF0000").ss(3,0,0,3).p("AoABDIQBiF");
	this.shape.setTransform(-119.375,635.05);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-172.1,626.9,105.5,16.399999999999977);


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
	this.shape.graphics.f().s("#000000").ss(3,0,0,3).p("AZvspIAAZTMgzdAAAIAA5Tg");
	this.shape.setTransform(-451.525,101.725);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("A5uMqIAA5TMAzdAAAIAAZTg");
	this.shape_1.setTransform(-451.525,101.725);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-617.7,19.3,332.40000000000003,164.89999999999998);


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
	this.shape.graphics.f().s("#FF0000").ss(3,0,0,3).p("ADFB3ImJjt");
	this.shape.setTransform(-532.075,201.75);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-553.3,188.3,42.49999999999994,26.899999999999977);


(lib.shape204 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_13();
	this.instance.setTransform(0,-129.55,0.2174,0.2174);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("AB1xhQBegKBfgrAE1tzQA7gEABA3IFkgGIBxA/IAad+QgrAhgvAKIhIABQhCgQhTgsIgCAAIgBAAQidgUj2BjQiQAbiPhTQgDgDgEgCQiIhBhaA2QhhAphJAVQASlEgfjrIgHgzQgGgmgIgjIgEi+IgSAAAE5joIggAAIgEKXIAkAAIAAiEIAAnxIAAgiIgEqLAIhE1IAAo6IgpheIADAKIAACTIjCAAAFxtAICHHdAE0ySIABEfAH7jGIAAE5IhHAAIAADCIBtAAIAJAAQArB/gvBoIAAAjIAAAtIAAH5IABABIACABAG0E1IAAB6IguAAIhNAAAGGGvIhNiEAEVJsIAAAJQg6AYhIALIAAABIgEAAIAEgBIAAgKIge7vAEVJsIERAAAImI/IkLAAAEVGvIAAC9ACTKZIAAIdAlbttIAFkUIC2g8QCKBCCLAaAmQtBIAUgsIAhAAAozFDIAAorIAliJIABC3IAAAaIAEEgIBVAAIAADDIAAB1IAaACIBShrIABBrQAbALAJAcIAArGIgxAAIABArIi6AAIgBAAIABAaAofSsQhAARgtABQiOADg3g8IgO+BIB5hFIFWAAAoOlxIB+nQAlUjlQgKlEADlEApFFDIASAAAm0FDIh/AAAkjHhQALAigRBBIAHAGQAfAaAjATQAnAVAtANIAAgKIgU9MAozJKIERAAAosJ9IFMgGAlHG6IhTAAAiMKZIAAHlAlTi6QAHEEAEEFACPKZIkbAA");
	this.shape.setTransform(0.0256,-0.0118);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#979B2D").s().p("ACWj3IAAgBQBIgLA6gYIAAgJIESAAIAAH4IAAACQiegUj2BjgAookUIFMgFQAmAVAuANIAAHjIgIgEQiIhChaA2QhhAqhJAUQASlCgejsg");
	this.shape_1.setTransform(-0.3,91.3);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FF0198").s().p("AmqE/IAAh2IAAjCIhVAAIgEkgIAAgaIC5AAQAIEFADEEIhRBrgAGQE1IhNiDIAAnyIDBAAIAAE7IhHAAIAADBIAAB5g");
	this.shape_2.setTransform(-0.95,12.1);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FEFF01").s().p("Ak5E+IgBhrQgDkEgIkFIgBgrIAxAAIAALGQgJgcgbgLgAEjEzIAEqXIAgAAIAAAiIAAHxIAACEg");
	this.shape_3.setTransform(-1.4,12.35);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FE0000").s().p("AjOOJQgjgTgfgaIgHgGQARhBgLgiIAArHIgxAAQgKlDADlEIAFkTIC2g9IAUdMIAAALQgtgNgngWgAClOgIge7vQBegKBfgrIACAEIABEfIAEKKIggAAIgEKYIAAC+IAAAJQg6AYhIALg");
	this.shape_4.setTransform(-1.7704,-27.45);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AiIR+IAAnkIAAgLIgU9LQCKBCCKAZIAebvIAAALIgEABIAEAAIAAIdQgiAGgjAAQhsAAhtg/gACSKaIkaAAgAowJKIERAAIkRAAQgGglgHgjIgFi/IASAAIAAorIAmiJIB+nQIAUgsIAhAAQgEFEAKFFIABArIi5AAIgBi4IABC4IgBAAIAAAaIAFEgIBVAAIAADCIiAAAICAAAIAAB2IAaABIBRhqIACBqQAbALAJAcQALAigRBCIAGAFQAfAaAkAUIlMAFgAlDG6IhTAAgAEZJtIAAi+IAjAAIAAiDIBOCDIhOAAIBOAAIAtAAIAAh5IBuAAIAJAAQArB+gvBpIAAAjIkLAAIELAAIAAAtgAowJKgAIqJAgAE8jGIAAgiIgDqLQA6gEACA3ICGHdIADALIAACSg");
	this.shape_5.setTransform(-0.3478,-0.0793);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#9998FF").s().p("AtRPJIgO+AIB5hGIFWAAIh+HQIglCJIAAIrIgSAAIgSAAIASAAIAEC/QAIAjAGAlIAHAzQAfDsgSFDQhAASgtABIgNAAQiEAAg0g6gAIpOrIgCgBIgBAAIAAn5IAAgtIAAgjQAvhpgrh+IgJAAIAAo6IgphfIiHndIFkgGIBxBAIAad9QgrAigvAKIhIAAQhCgPhTgtg");
	this.shape_6.setTransform(0.025,18.7321);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-87.3,-129.5,174.7,258.9);


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

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AhKBJQgdgdAAgsQAAgrAdgfQAfgdArAAQArAAAeAdQAfAfAAArQAAAsgfAdQgeAfgrAAQgrAAgfgfg");
	this.shape.setTransform(-2851.1,-146.325);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AhKBJQgdgdAAgsQAAgrAdgfQAfgdArAAQArAAAeAdQAfAfAAArQAAAsgfAdQgeAfgrAAQgrAAgfgfg");
	this.shape_1.setTransform(-2851.1,-414.575);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AhKBJQgdgdAAgsQAAgrAdgfQAfgdArAAQArAAAeAdQAfAfAAArQAAAsgfAdQgeAfgrAAQgrAAgfgfg");
	this.shape_2.setTransform(-2851.1,-607.875);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2861.5,-618.3,20.800000000000182,482.4);


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
	var sprImg_shape = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_eg_atlas_2"],97);
	sprImg_shape.onload = function(){
		this.shape.graphics.bf(sprImg_shape, null, new cjs.Matrix2D(1,0,0,1,-130,-97.5)).s().p("A0TPPIAA+dMAonAAAIAAedg")
	}.bind(this);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-130,-97.5,260,195);


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
	this.shape.graphics.f().s("#FF0000").ss(9,0,0,3).p("A4RNZMAwjgax");
	this.shape.setTransform(197.9,-373.8);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(38.1,-464,319.7,180.39999999999998);


(lib.shape194 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#000000").ss(9,0,0,3).p("AX2F7MgvrAAAIAAr1MAvrAAAg");
	this.shape.setTransform(372.9,-497.4);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AX1F7IAAr1IABAAIAAL1gA31F7IAAr1MAvqAAAIAAL1gAX1l6g");
	this.shape_1.setTransform(372.925,-497.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(215.9,-539.8,314.1,84.79999999999995);


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

	// Layer_15
	this.instance = new lib.CachedBmp_12();
	this.instance.setTransform(-317.5,-785.2,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_14
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("AWWqmIAAgDAXDJoIARBBAHxjLICmAAIAACqAKXjLIC0AAAKXl6IAACvA3YqjIBdACIAUAAIBoABAz8itIAACqA2mitICqAAICvAAAz8lcIAACv");
	this.shape.setTransform(4.9129,-175.3617);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1,0,0,3).p("A1tlTIlUAAIAAruIRyAAIJwgQITLgOIGkAAIAALjIgvgHQiYgVh4AXQg3ALgwAUIAABSIAABbIAABhIAABZIBjAQIAEABQCDAOCNgUIAxgIIA1gKIAABeIAtAAIAAP6IgZhjAPIhSIAADFIAHgBQBIAAAyAzQAzAzAABHIAAADICiAAAPIhSIAAhfIAAg4APIBzQhDACgwAwQgzAzAABHIAAADIisAAAPIixIEigEATqhUIkiACAbHBcIAAHMIgqgCIAADeIA+DvAR8EiQgBBGgyAxQgyAzhIAAIgHAAIAAC+APIHMQhDgDgwgwQgygxgBhGABnhKIAAFkICYAAQA9gPgEBnIgCARIAAGBIAAA6ICRAAQAvgEAcApIAACHIDVAAIAAgFAE2MEIVnAAALnPqIP0AJAadImIgLoeA1tlTICPAAIAdAbIAKAIIBVBNIAYAAIB6gDIPxgXITJgTAzBk4IAAAIIAKAAAvLhKIgDhoIgCg0Aw2izIgCBpIgPAAIgXgXIgWgWIg0AAIAAgWIgyAAIAAgsIAZABIABgBIAYAEIAAAoAvLhKIhtAAAzBi5IABAAAzBi4IAAgBIAAh3IisAAIAAgjAzDhrIgXgCIAAggAzDhrQAGAkACAcQAKCGhEgkIAAEJIgjAAA0sA7IA3gEAvLCQIADAAQADAAgGABQBNACAwAwQAyAzAABHIAAADICsAAAx2FAIAAgDQAAhHAzgzQAxgyBHgBIAAABAvLhKIAADaAxehhIhlgKAxKizIAAgwABnhKIhahnIheBfIt6AIAvOiyIPbABIO7AAA6jA3IgbAAIg1BVIAANnIP1gJIA+AAIDVAAIAAiHQAggdBGAJIBfAAIAAg8IAAmQIgBgRQgFhnA9APICeAAIAAlsA6jA3ID9AAIB6AEIAALiIl3ADgAscFAQgBBGgxAxQgwAwhDADIgDAAIgEAAIgBAAIgCAAQhHgBgxgyQgxgxgChGAvLHqIAAC+Az1FAIB/AAAz1McIg3ABAz1McIAAncAkmMTIvPAJABnhKINhgI");
	this.shape_1.setTransform(-25.55,-224.7862);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AbbJyIg+juIAAjfIAqACIAAnLIAAHLIgqgCIgMocIA2gMIAABfIAtAAIAAP5gALmJpIAAgEIAAAEIjUAAIAAiHQgdgpguAEIiRAAIAAg5IVnAAIA+DugA7zj0IA1hVIAbAAIAALoIF2gDIAArhIA4gEIAAEJIgjAAIAjAAIAAHbIg4ABIA4gBIPPgJIAAA9IhfAAQhGgKggAdIAACHIjVAAIg+AAIv1AJgAadGEgAvEBpIgEAAIgBAAIgCAAIAAipICvAAQgBBFgyAyQgvAvhDADgAxDA3QgygyAAhFICqAAIAACpQhHgBgxgxgAPHBLIAAipIilAAIAAgCQAAhIAzgzQAwgwBCgCIAIgBQBIAAAyAzQAzAzgBBIIAAACIi0AAIAAivIAACvIC0AAQAABGgyAwQgyAzhIAAgAPHBLQhCgCgwgxQgygwgBhGIClAAIAACpgAvLhAIAAivIAACvIiqAAIAAgDQAAhHAygzQAxgxBHgBIAAAAQBMACAwAwQAzAzAABHIAAADgAx1hAgAR7hegAMihegAANoyIO6AAIAABgIthAHgAw5nLIADhpIBnACIAEBngAvPoyIPcAAIhfBgIt5AHgAw5nLIgOAAIgXgWIgWgXIg0AAIAAgWIgxAAIAxAAIAAAWIA0AAIAWAXIhlgKIgWgDIAAggIAAgsIAYABIABgBIgBAAIAAh3IisAAIAAgjICPAAIAdAbIAAAIIAKAAIBWBNIAXAAIB5gDIPxgWITJgUIAABcIkiADIAAg4IAAA4Iu6AAIvcAAIgCg1IACA1IhngCIgUAAIAAgwIAAAwIhegBIBeABIAUAAIgDBpgAyooOIAAgnIgYgFIAYAFgAPHoyIEigDIAABgIkiADgAyooOgAPHoygAANoygAw2o0gAxKo0gATpo1g");
	this.shape_2.setTransform(-25.55,-186.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#00FF00").s().p("A6QDXID9AAIB5AEIAALiIl2ADgAziHgIAAkJQBEAkgKiHQgCgcgGgjIBlAKIAWAWIAPAAIBtAAIAADcIAAjcIN6gHIAAFsIidAAQg9gPAFBnIABASIAAGPIvPAJgAu5NIIAAi+IADAAIAAAAIAFAAIACAAQBDgDAwgvQAygyABhGICsAAIisAAIAAgDQAAhHgzgzQgwgwhNgCIADAAIgDAAQhGABgxAxQgzAzAABHIAAADIh/AAIB/AAQABBGAyAyQAxAxBGABgAFJOlIAAmBIABgSQAFhng9APIiZAAIAAllINhgHIAADFIAAjFIEigDIAABaIBkAQIAEABQCCAOCNgUIAxgHIALIdIAADfgANoI5QAwAxBCACIAAC+IAAi+IAIAAQBHAAAzgzQAxgxABhGICjAAIijAAIAAgCQAAhIgygzQgzgzhHAAIgIABQhCACgwAwQgzAzAABIIAAACIisAAICsAAQABBGAyAxgAu5KKIAAAAgAykiQIgKgIIgdgbIiPAAIlUAAIAAruIRxAAIJwgPITMgPIGkAAIAALjIgwgHQiXgVh4AYQg3AKgxAUIAABSIzJAUIvxAWIh5ADIgYAAg");
	this.shape_3.setTransform(-27.425,-240.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_13
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#000000").ss(1,0,0,3).p("ASihEICJAAAzSgrIhYAAAv2BFIgDAA");
	this.shape_4.setTransform(-22.3,0.325);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#000000").ss(1,0,0,3).p("ALkgPICgAAIAAgDQAAgtAgghQAgggAuAAIAFAAIAAiYALkgPIAAoSIFUAAICCB6IAAGVAP3iAQAqACAeAeQAhAhAAAtIBaAAIAAGNIhxCEIleAAIgHoOAOEgPQABArAfAfQAgAgAuAAIAFAAIAACqAP3BbQAqgCAegeQAhggAAgtAvgEFIAAiOQgogDgegeQggggAAgtIAAgDIADgYQAHgcAWgWQAdgdAngDIACAAAvdB3IAZgCQAhgGAZgZQAfgfABgsIAAgCQAAgtggggQghgggtAAIgFAAIgDAAIAAi0Ay5AGIBzAAAqyAJIgWoRIl8AAIh1COIAAGAIAAGpICHBzIF3AAIAJoZIifAA");
	this.shape_5.setTransform(-24.775,-4.675);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AwyIiIiHhzIAAmpIBzAAIAAADQAAAtAgAgQAeAeAoADIAACOIAAiOQgogDgegeQggggAAgtIAAgDIADgYQAHgcAWgWQAdgdAngDIACAAIgCAAQgnADgdAdQgWAWgHAcIgDAYIhzAAIAAmAIB1iOIF8AAIAWIRIifAAICfAAIgJIZgAvdB3IAZgCQAhgGAZgZQAfgfABgsIAAgCQAAgtggggQghgggtAAIgFAAIgDAAIAAi0IAAC0IADAAIAFAAQAtAAAhAgQAgAgAAAtIAAACQgBAsgfAfQgZAZghAGIgZACIgDAAgALrH/IgHoOICgAAIAAgDQAAgtAgghQAgggAuAAIAFAAIAAiYIAACYIgFAAQguAAggAgQggAhAAAtIAAADIigAAIAAoSIFUAAICCB6IAAGVIhaAAQAAgtghghQgegegqgCQAqACAeAeQAhAhAAAtIBaAAIAAGNIhxCEgAP3EFIAAiqIgFAAQguAAggggQgfgfgBgrQABArAfAfQAgAgAuAAIAFAAgAQ/A7QgeAegqACQAqgCAegeQAhggAAgtQAAAtghAggAy5AGgALkgPg");
	this.shape_6.setTransform(-24.775,-4.675);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4}]}).wait(1));

	// Layer_12
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#000000").ss(1,0,0,3).p("AHCtCQBSANANA0IAPYhQiOA1iZgcQA9jcAXjrQAOiMAAiRQAAhxgIh2IgKqwgAnBtCQhTANgMA0IgPYhQCNA1CZgcQg9jcgWjrQgOiMAAiRQAAhxAIh2IAKqwg");
	this.shape_7.setTransform(-22.3,-16.316);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#999BFF").s().p("AEJM5QA+jcAXjrQANiMAAiRQAAhxgIh2IgKqwIBpAAQBSANANA0IAPYhQhdAjhhAAQg0AAg1gKgAovMgIAP4hQANg0BSgNIBpAAIgKKwQgIB2AABxQAACRAOCMQAXDrA8DcQg0AKg0AAQhhAAhdgjg");
	this.shape_8.setTransform(-22.3,-16.316);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7}]}).wait(1));

	// Layer_11
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#000000").ss(1,0,0,3).p("AIhxZIBzAAAIwEjIBkAAAORKzQACAwg6AJQgHA2geAQIhbAAALZLsICAAAAqTw+IBzAAAjOiKIiOAAAuQKzQgCAwA6AJQAHA2AeAQIBaAAAtYLsICBAAArUFuIH2AAAqTEjIBkAAAqgQ5QCZA5EegoADPiKICOAA");
	this.shape_9.setTransform(-22.3,34.6455);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#000000").ss(1,0,0,3).p("AIhlsIAAhVQgMg0hTgNIhpAAIAAgMIgPgSIAAhDIA6AAIAEAAQA/gCArgrIAAhpIDUAAIAACWIADD7gAGIpjIE+AAAKUO0IAAzQIAPAAIAmg8IACDSIAAAZIAAIRIAHIQIADD3IAADDIBkAAIBYAAIAACCIhYAAIAAiCAFrGVQAACRgOCMQgWDrg9DcQCYAcCOg1IgP18IAAhQAC+CqIClAAIAAADQAIB2AAByADAD9IBnAAIAACYIBEAAAKUO0IA+AAALVSrIg0BnIAAJkQiZA6kegoIiBAAIgX8NIgM+qIhZhmIhfBfIAAFtIAhZEIgXcNIiBAAIALrdIAQn5IAOm1ALVSrIhBhLIAAisALYXwIABA6IAABGIAFEGIg9AAALYXwIBhAAALVVuIADCCAoglLIAAh2QAMg0BTgNIBpAAIAAgMIAPgSIAAg3IhTAAIgEAAIgggEQgrgJgfggIgCh1IjVAAIAACzArUSrIAJruIgWoRIAAj3IAoBLIAmAAIAAVgIhBBLIA0BnIAAJkIg9AAIAEkGIAChGIABg6IhiAAIAAiCIhYAAIAACCIBYAAAoglLIAABLIgPVgQCNA1CZgcQg9jcgWjrQgOiMAAiRQAAhyAIh2IAAgDIClAAIgDBTIhmAAIAACYIhEAAABSB7QA6gMAyA7IACBTIAPG1IAPH5Ai9CqQAxg7A7AMAnApbQiQAhiRgMIAAD7IDBAAArUVuIAAjDIAAAAAs4VuIBkAAIgCCCAhoeIIDRAAADqeIIgMrdIH3AA");
	this.shape_10.setTransform(-22.3,-48.3449);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FE0002").s().p("ABpOHIgX8MQA7gLAxA7IACBSIAPG2IAPH4IAMLcgAjpOHIALrcIARn4IANm2IADhSQAxg7A8ALIgYcMg");
	this.shape_11.setTransform(-22.3,54.1062);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#C0C0C0").s().p("ALaCBIgBhGICAAAQgHA2geAQgAszCBQgegQgHg2ICBAAIgBBGgALZA7IgBg6IBhAAIhhAAIgDiBIBkAAIBXAAIAACBIhXAAIAAiBIAACBIBXAAQADAxg6AJgALZA7gAtYA7Qg5gJABgxIBYAAIBiAAIgBA6gAtYA7gAM5ABgArWABIhiAAIAAiBIAACBIhYAAIAAiBIBYAAIBkAAIgCCBgAuQABg");
	this.shape_12.setTransform(-22.3,103.575);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FD0097").s().p("ADPDbIgPm1IBnAAIAACZIBEAAQAACQgNCMgAlcDbQgOiMAAiQIBEAAIAAiZIBmAAIgNG1g");
	this.shape_13.setTransform(-22.3,-1.175);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("ADseHIgMrdIH3AAIg1BnIAAJkQhaAiiIAAQhfAAh1gQgAqed1IAApkIg0hnIH2AAIgLLdQh1AQhfAAQiJAAhagigAhmeHIAX8NIgh5EIAAltIBfhfIBZBmIAMeqIAXcNgAKid1IAApkIA1hnIAADDIACCCIABA6IABBGIAFEGgAqed1Ig9AAIAEkGIAChGIABg6IACiCIAAjDIAAAAIA0BnIAAJkIAAAAgALXSqIhBhLIAAisIAACsIBBBLIn3AAIgQn5ICPAAQgXDrg9DcQCZAcCOg1IgP18IBzAAIAATQIAAzQIAPAAIAmg8IACDSIAAAZIAAIRIAHIQIg+AAIA+AAIADD3gAKWRfIhkAAgADgSqgArSSqIBBhLIAA1gIgmAAIgohLIDBAAIAABLIhzAAIBzAAIgPVgQCNA1CZgcQg9jcgWjrICOAAIgQH5gAotRfIhkAAgArSSqgArSSqgArSSqgArJG8IgWoRIAAj3IAoBLIAmAAIAAVgIhBBLgAEpGUIAAiYIhnAAIgChTIClAAIAAADQAIB2AABygAloGUQAAhyAIh2IAAgDIClAAIgDBTIhmAAIAACYgAKWkdIhzAAIAAhQICnAEIABAQIgmA8gAIjkdgAoelMIjBAAIAAj7QAnADAnAAIAAAAIABAAQBjAABjgVIABAAIACgBIAJgCIAgAEIAEAAIBTAAIAAA3IgPASIAAAMIhpAAQhTANgMA0IAAB2gArflMgArflMgAIjltIAAhVQgNg0hSgNIhpAAIAAgMIgPgSIAAhDIA5AAIAEAAQBAgCAqgrIAAhpIDVAAIAACWIk/AAIE/AAIACD7gAqRpEQgnAAgngDIAAizIDVAAIACB1QAfAgArAJIgJACIgCABIgBAAQhjAVhjAAIgBAAIAAAAg");
	this.shape_14.setTransform(-22.475,-48.2295);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9}]}).wait(1));

	// Layer_10
	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("#000000").ss(1,0,0,3).p("AbnjKIv0gJIAACWIADD6ArFggIASAAIAAizIwzAJAqzDaIAAj6");
	this.shape_15.setTransform(-26.8249,-103.3022);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().s("#000000").ss(1,0,0,3).p("AP3ukILwAAIAAiNALzukIEEAAIAAEAIAAD2Ij/AAIAAgZIgCjiIEBAFAMCNqIgDj3IEAAAIAAD3IAADDIj9AAgAP/NqIj9AAA7mwxIAAC/IMbgSIEGgDAvLqMIAAD3IEYAAIAAj3IkYAAIAAj4AukNqIAAjUID+AAIAADUIgBAAIAADDIj9AAIAAjDID9AA");
	this.shape_16.setTransform(-26.825,-16.225);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FD9A34").s().p("ALVBiIAAjDID9AAIAADDgAvRBiIAAjDID9AAIAADDg");
	this.shape_17.setTransform(-22.3,80.95);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#983402").s().p("ALVB8IgDj3IEAAAIAAD3gArUB8Ij9AAIAAjUID9AAIAADUg");
	this.shape_18.setTransform(-22.3,58.825);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FF9A30").s().p("AvhCMIAAj2IEHgDIARgBIAAD6gALgBvIgCj6IEEAAIAAD/g");
	this.shape_19.setTransform(-24.675,-95.55);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#9B3202").s().p("AvLFTIAAj4IEYAAIAAD4gAL4E6IAAgaIgCjiIEBAFIAAD3gA7mlJIQzgJIAACzIgSABIkGADIsbARgAP3i8IkEAAIAAiWIP0AJIAACNg");
	this.shape_20.setTransform(-26.825,-90.675);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15}]}).wait(1));

	// Layer_9
	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f().s("#000000").ss(1,0,0,3).p("AGQAyIAAmAIACgSQAEhng9AQIgKAAIiOAAAjMBBIAAA8IhfAAQhGgJggAdIAAB8AjnG6IAZAA");
	this.shape_21.setTransform(-34.5845,-152.5264);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f().s("#000000").ss(1,0,0,3).p("AEjlOIAAA5ICRAAQAvgEAcAqIAADvQgqArhAACIgEAAIg5AAIAABDIAPASIAKK5IilAAQgyg7g6AMIgM5EADis4IAABXIBDAAAj4s4IAABXIhCAAIABASIAAGQAj4s4IgKAAQg9gQAFBnAn+hzIACB/QAfAgArAJIAgAEIAEAAIA6AAAk7A5IAAA3IgPASIgKK5IClAAQAxg7A7AMIgh5EIiUAA");
	this.shape_22.setTransform(-23.675,-114.0264);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#979A31").s().p("ADMM6Qgyg7g6AMIgM5EICOAAIAABXIBDAAIgCASIAAGBIAAA5ICRAAQAvgEAcAqIAADwQgqAqhAACIgEAAIg5AAIAABDIAPASIAKK5gAlUM6IAKq5IAPgSIAAg3IgZAAIg6AAIgEAAIgggEQgrgJgfggIgCh/IAAh8QAggdBGAJIBfAAIAAg8IAAmQIgBgSIBCAAIAAhXICUAAIAhZEQg7gMgxA7g");
	this.shape_23.setTransform(-23.675,-113.925);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("ADtAtIAAhXIAKAAQA9gPgEBmgAkvAtQgFhmA9APIAKAAIAABXg");
	this.shape_24.setTransform(-24.7785,-192.2764);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21}]}).wait(1));

	// Layer_8
	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f().s("#000000").ss(1,0,0,3).p("ADqiLIAAiLIibAAIAABfADqAAICqAAADqAAIAACNIAACKIibAAIAAhfABPAAICbAAIAAiLIibAAIAAgsIg3gKAkqDQIhkgRIAAi6IAAhaAgXDKQiNAUiCgOIAAAAIAAjMIhoABAATACIA8gCIAAiLABPABIg8ABAgXDKIAwgHIA2gLIAAgrIAAiMICbgBAgXACIAADIAgXACIAqAAAgXjJIAADLAkmjGIAADKIEPgCABPCNICbAA");
	this.shape_25.setTransform(140.0772,-243.425);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f().s("#000000").ss(1,0,0,3).p("ADVgqIgvgHQiYgVh3AXQg3ALgwAUIAABR");
	this.shape_26.setTransform(121.114,-258.5705);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AAwDLIhjgQIAAi6IBngBIAADLgAgzhaIAAhSQAxgUA2gKIAADKIhnABgAA0AAg");
	this.shape_27.setTransform(105.375,-243);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#C0C0C0").s().p("ABuEXIAAhfIg2ALIgxAHIAAjIIkPACIEPgCIAADIQiMAUiDgOIAAAAIAAjMIAAjKQB5gYCWAVIAwAIIA3AKIAAAsIAAgsIAAhfICaAAIAACLIiaAAICaAAIAACLIiaAAIAAiLIAACLIg9ACIA9gBICagBIAACNIiaAAICaAAIAACKgABuCNIAAArIAAgrIAAiMgAAHACIAqAAIgqAAIAAjLIAADLgAEICNgAAHACgAEIiLg");
	this.shape_28.setTransform(137,-243.425);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25}]}).wait(1));

	// Layer_7
	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f().s("#000000").ss(1,0,0,3).p("ABrA8IAAg7IAAg8IAAgYIAAgOABrA8IAAArIgeAAIAAA8IBrAAIA9hAAhuCfIAAgpIAAh1IAAhiIAAhkABNABIgxg/AAnA8IgdA6AAqABIgDA7IBEAAAjyABIAAB1IAABQAABhhIAaAi");
	this.shape_29.setTransform(-171.2183,-239.05);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f().s("#000000").ss(1,0,0,3).p("AJNiiICsAAIAAB4IgKAAIgPAAIAAArIAAAgIAXACQAGAkACAcQAKCHhEgkIg4ACIAAACIh5gEIj9AAIgbAAIg1BVImCAAIAAg3IiUAAIAAhuIhuAAIAAB/IigAAIAAh/IAAhtIinABAJNhhIAXAAIARAOIAyAnIAPABIAqABAJcABIAZAAIBBAAIAAgsALgAhIgqAAIAAggIAqAAApdhhIAAhrICgAAIAABrIBiAAIAAh1ICRAAIAAhEIGWAAIAtBVICiAAICyAAIAAAjApdhhIhLAAAm9AIIAABuIigAAApdAJIAAhqICgAAIAABpILUgHICEAAICZAAIAjAAIAFAAIAAg9IAZABApdAJICggBAJNhhIhCAAIhwAAIr2AAAJNhhIAAhBAIlg/IABABIA2ACAlPB2IJmAAICEAAIB5AAIAABQ");
	this.shape_30.setTransform(-223.4374,-239.05);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#868686").s().p("AhTBRIAAg8IAeAAIAAgpIAAg8IBAAAIAAAgIArAAIAWADQAGAjACAbIg9BAg");
	this.shape_31.setTransform(-155.15,-230.9);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#040406").s().p("AAWAfIgwg+IA1ACIAAA8g");
	this.shape_32.setTransform(-165.725,-242.15);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#00FEFC").s().p("AghA9IADg8IAiAAIAFAAIAZAAIgZAAIAAg9IAZABIAAA8IAAA8g");
	this.shape_33.setTransform(-163.925,-239.1);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AB3CQIg3ACIAAACIh5gEIAAhQIAeg6IBCAAIAAArIgeAAIAAA8IBsAAIA8hAQAIBqgpAAQgLAAgOgHgABogUIAAggIhBAAIAAg9IAAgYIAAAYIgZgBIg0gBIgCgCIACACIAvA/IgiAAIiYAAIAAhiIBwAAIBBAAIAWAAIARANIAyAnIAPABIArABIAAAsIgrAAIAAgtIAAAtIArAAIAAAggAgoh1IgZghg");
	this.shape_34.setTransform(-164.4609,-233.6711);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#878787").s().p("AmKEbIAAg3IiTAAIAAhvIJlAAICFAAIB4AAIAABQIj9AAIAAhQIAABQIgbAAIg0BWgADNCeIAAgpgAISgqIgrgCIgPAAIgygnIAAgNIAAANIgRgNIgXAAIAAhCIAABCIhBAAIhwAAIAAhlIAABlIr3AAIAAh2ICRAAIAAhEIGXAAIAsBVICjAAICxAAIAAAjICtAAIAAB4IgKABg");
	this.shape_35.setTransform(-202.775,-239.05);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#C0C0C0").s().p("ApIDhIAAiAIAAhrIAAhqIAAhsICgAAIAABsIBiAAIL2AAIAABhIiEAAIrUAHIAAhoIigAAICgAAIAABoIigACICggCIAABtIigAAICgAAIAACAgAGwBhIAAh0ICZAAIgDA7IgdA5gAGwBhIiEAAIAAh0IAAB0IpmAAIhuAAIAAhtILUgHICEAAIAAB0gAmogMgAGwgTg");
	this.shape_36.setTransform(-225.525,-237.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29}]}).wait(1));

	// Layer_6
	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f().s("#000000").ss(1,0,0,3).p("AE9BKIFLgGIAAicIlLAFgAqHhJIFKAFIAACdIlKgGg");
	this.shape_37.setTransform(-29.8,-649.9492);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f().s("#000000").ss(1,0,0,3).p("Ac9ArIozAJIAAibIIzgJgA88BnIIzAJIAAibIozgJg");
	this.shape_38.setTransform(-31.05,-649.4998);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FE9931").s().p("A87BnIAAibIIyAJIAACbgAp6BPIAAidIFKAGIAACcgAFKhYIFKgFIAACdIlKAGgAUKhnIIygJIAACbIoyAKg");
	this.shape_39.setTransform(-31.05,-649.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_39},{t:this.shape_38},{t:this.shape_37}]}).wait(1));

	// Layer_5
	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f().s("#000000").ss(1,0,0,3).p("ADN5QIgCjsIjgAAIAAghABk5OIBpgCIBJgBABk5OIAAABIAAADQgBAughAgQghAigvAAIgBAAIgLAAQgogEgdgeQghgggBguIimADIgEjzIEWgCIACB8IAFAAQAvAAAhAiQAiAhAAAvgAgT7AQgsACggAgQgiAiAAAvIAAADAgP3aIgEjmAgBorIAEAAQAvAAAiAhQAiAiAAAwIAAACIBjAAIBHAAAAAlFIgIgBQgogEgegdQggghgBguIAAgCQAAgwAhgiQAggfAtgCIABDmIADAAQAvAAAigiQAhghABguAAFJtIgFuyAkWm2IgRyRAgP3aIAOOvADZm2IgMyaAhvm2IinAAAB4LjIBuAAIADE7IhsAAAAFJtQAwAAAhAiQAiAiAAAvIAAADIAAACIAAAKQgFAmgdAcQghAigwAAIAAB4IA8AAIA8AAIAABTIg8AAIg8AAIAACYIDkAAIAACoIjkAAIAAClAhtLjQABAuAhAgQAiAiAuAAIAAjmQguAAgiAiQgiAiAAAvIAAADIiZAAIgQyZAhtQeIAAhTIAyAAIAABTIgyAAIiUAAIgFk7AAFPLIAABTIhAAAABBQeIAAhTAg7PLIBAAAAAFS2IAACoIkKAAIAAhOIASgPIAAhLIBeAAIheBLADmLjIBLAAADpQeIAACYAkBQeIABBBIANALIBgBJIABABIgDACIADAAICXAAAjzRqIAABMAkFVeIAAIAADmLjIgNyZ");
	this.shape_40.setTransform(174.1964,-459.9287);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#9B3101").s().p("AAUBUIAAinIDkAAIAACngAAUBUIkKAAIAAhOIASgOIAAhLIBeAAIADAAICXAAIAACngAjkgIIBehLg");
	this.shape_41.setTransform(172.7,-330.95);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FF9934").s().p("AASBMIAAiXIA8AAIA8AAIBsAAIAACXgAiFBMIAAgCIgBAAIhghKIgOgKIgBhBICVAAIAyAAIBAAAIAACXgAjmBMIAAhMIBgBKIgCACgAAShLg");
	this.shape_42.setTransform(172.9,-346.95);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("ABEVvIAAhSIAABSIg9AAIAAhSIA9AAIA7AAIAABSgAg4VvIAAhSIA/AAIAABSgAhrVvIAAhSIAzAAIAABSgAhJSDQghghgBguIAAgCQAAgwAigiQAighAuAAIAADmIAAjmQAwAAAhAhQAjAiAAAwIAAACIAAADIgBAKQgFAmgdAcQghAigwAAQguAAgigigAABALIgBjlIAFAAQAwAAAhAiQAiAiAAAvIAAADQgBAughAgQghAhgwAAgAgGALQgogEgdgdQghgggBguIAAgDQAAgvAigiQAfggAsgCIABDlgAgNyIIgEjmIAGAAQAuAAAiAhQAhAiABAuIAAACIAAACQgCAuggAhQgiAiguAAgAgXyJQgogEgegdQggghgCguIAAgCQABgwAhgiQAggfAsgCIAEDmgAgR1ug");
	this.shape_43.setTransform(173.95,-493.675);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#01FFFF").s().p("ACfWtIAAhSIg8AAIg8AAIAAh4QAvAAAigiQAcgcAFgmIABgKIAAgDIBtAAIADE7gAjgWtIgEk7ICZAAQABAuAgAhQAiAiAvAAIAAB4IhAAAIgyAAIAABSgACaRyIAAgCQAAgwgigiQgighgvAAIgGu0IADAAQAwAAAhgiQAhggABgtIBkAAIAMSYgACaRygAjkRyIgRyYICnAAIinAAIgRySICngDIinADIgDjzIEVgBIACB8IgCh8IDgAAIADDsIhpABIBpgBIAMSaIhkAAIAAgDQAAgvgigiQghgigwAAIgFAAIgOuuIACAAQAvAAAigiQAhghABguIAAgCIAAgCQgBgughgiQgighgvAAIgFAAQgsACggAfQghAiAAAwIAAACQABAuAgAhQAeAdAnAEIAKABIAOOuQgrACggAgQgiAiAAAvIAAADQABAtAhAgQAdAeAnAEIAJAAIAGO0QgvAAgiAhQghAiAAAwIAAACgAjkRygACXgmgAj1gmg");
	this.shape_44.setTransform(170.825,-499.875);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40}]}).wait(1));

	// Layer_4
	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f().s("#000000").ss(1,0,0,3).p("AAGw7IgGAAQgvAAghAiQghAhgBAvIAAABIAAADQABAuAhAgQAhAiAvAAIACAAIAKAAQAogEAegeQAgggABguIAAgDQAAgvghgiQgggggsgCIABh8IABghAAGw7IgEDmIAWN+AAVGgIAeM5");
	this.shape_45.setTransform(-234.8,-518.4196);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f().s("#000000").ss(1,0,0,3).p("AA39NIHPAIIAAicIoygJIAACbIBjACIgDDzIimgDAnB5jIADjsIDgAAICyAAAlY5hIhpgCIgKSaICFAAIAAgCIAAgIQACgqAgggQAhghAwAAIAFAAIgBDmIAIgBQAogEAdgdIAPgSQASgbABgiICmAAIALDSIAJM4IgCCPIgEE7IgBBBIgOALIAABMIAABLIATAPIAABOIkLAAIAABSAoJ5kIBIABAjNpuIgBAwQAsACAgAfQAfAgADAqIAAAIIAAACAA05aIAUPsIgCClAnLnJIglAAAjPlYIgEAAQgwAAghgiIgPgSQgTgbAAgiAjPlYIgBBhAizNAQAwAAAigiQAgggABguAizJaQAwAAAiAiQAhAiAAAvIAAADICYAAAiyJBIgBAZIAADmQgvAAgigiQgcgcgFgmIgBgKIAAgCIAAgDQAAgvAigiQAigiAvAAAkrQLIA8AAIAAhTIA8AAIBBAAIAABTIAyAAAkrQLIAAhTIA8AAAizQLIAAhTIAAh4AizQLIBBAAAjvQLIA8AAIAACYICZAAIACAAIgCgCIAAgBIBfhJAhyO4IAyAAIAABTICUAAAgYSjIBdAAABFTuIhdhLAizVLIAAioIj+AAIAACogAmxLQIAAE7ICGAAAmxLQIguAAAmxSjIAAiYABYVLIAAKlAkmLQIiLAAAnLnJIAaSZ");
	this.shape_46.setTransform(-211.8052,-452.029);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#9B3101").s().p("AgGBUIAAinICYAAIACAAIBeAAIAABLIhehLIBeBLIATAPIAABNgAgGBUIj+AAIAAinID+AAIAACng");
	this.shape_47.setTransform(-229.125,-324.95);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FF9934").s().p("ACWBMIgCgDIBghJIhgBJIAAABIAAACIiYAAIAAiXIBAAAIAyAAICVAAIgBBBIgOAKIAABMgAgEBMIj+AAIAAiXICGAAIA8AAIA8AAIAACXg");
	this.shape_48.setTransform(-229.325,-340.95);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("ABaVvIhBAAIAAhSIAABSIg7AAIAAhSIA7AAIBBAAIAABSIAAhSIAyAAIAABSgAheVvIAAhSIA8AAIAABSgAgiUdgAg3SDQgdgcgEgmIgBgKIAAgDIAAgCQAAgwAigiQAhghAvAAIAADmIAAjmQAwAAAhAhQAiAiAAAwIAAACQgBAughAhQghAigwAAQgvAAghgigAgGALQgwAAghghIgPgSQgTgaAAgiIAAgDIAAgHQACgrAggfQAhgiAwAAIAFAAIgCDlgAgBjaQArACAgAgQAfAfACArIAAAHIAAADQAAAigSAaIgPASQgdAdgoAEIgIAAgAgYyIQgvAAgigiQghghgBguIAAgCIAAgCQABguAhgiQAighAvAAIAFAAIgDDmgAgT1uQArACAhAfQAhAiAAAwIAAACQgBAuggAhQgeAdgnAEIgKABg");
	this.shape_49.setTransform(-232.3,-487.675);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#01FFFF").s().p("AB4WtIAAhSIgyAAIhBAAIAAh4QAwAAAhgiQAhghABguIAAgCQAAgwgigiQghghgwAAIAAgZIgcs5IAcM5IAAAZQgvAAghAhQgiAiAAAwIAAACIiLAAICLAAIAAADIABAKQAEAmAdAcQAhAiAvAAIAAB4Ig7AAIg8AAIAABSIiGAAIAAk7IgayYICFAAIiFAAIAKyaIBpABIhpgBIACjsIDhAAICxAAIBkABIgDDzIingDIAAgCQAAgwghgiQghgfgrgCIACh8IgCB8IgFAAQgvAAgiAhQghAigBAuIAAACIAAACQABAuAhAhQAiAiAvAAIACAAIAVN/IAAAvIAAgvIgVt/IAKgBQAngEAegdQAgghABguICnADIAUPtIgCClIALDRIAJM5IgCCOIiZAAICZAAIgFE7gAgXCrIAAhigAhrh6QggAfgCArIAAAHIAAADQAAAiATAZIAPASQAhAiAwAAIADAAIAJAAQAngEAdgeIAPgSQASgZAAgiICoAAIioAAIAAgDIAAgHQgCgrgfgfQgggggrgCIgFAAQgwAAghAigAkSgmgAgVjLgABGy7g");
	this.shape_50.setTransform(-230.3,-493.875);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45}]}).wait(1));

	// Layer_3
	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f().s("#000000").ss(1,0,0,3).p("EAETgpXIADDwIAvAAIAAIoIgoAAIgHooAFF8/IAmBXIAJJfIi9AAIhCAAIASOsIDhAGIAwAzIAASHACHjdQANAdAnBKQAbAzAQCzQAGBFAFBXIAGBCIAJA9QAGAtgBBHIABAOIACBJQAABLgGBMIAGEqIAAAFAEPRuIByAAQA/AIAGBKAEiahIAAGuIAAA0IAAAaIAAAJIAAAZIgyAAIixAAIAAF0Qg8BAhEhAIAAl0ICAAAIAA27IgGi+IgMm8IAAgCMgAZgqDEgB3gn7ICLAAIBfAAIAAKdIAAAfIACAAIAAKTIBCgDIAAo5IAbgXIAAhAIBLAAIhLBAAkr86IBiAAIAArBIBSAAMAAjAwjIATaXIiuAAQgRAogtgrIAAhrIA+A0IAAA6Akr86IhaAAIAAsdABz9eIACAfIBdAAAmF86Ig0BcIAAJfICsAAIADgkIAKABIgKoDIghiVAjJx/IhEAAAjJygIAAAhAjJygIg3gCAB1ysIAAAjAC3yvIAAAmAjJ86IAAKaAnFOQIAAwsQAOghArgOIDRAAIgOu0AiwH/IAAgFIgBhWIgFk0IgFk7AkYRpIAAhJIgCnqIgMg3QgJgvgEgtIgChEIADheIAJhZIAIg4QAWiGAwiGQAFgPAbggACHjdIAHFNIAADmIgEBQIgEBZIgBAEEgEtAhRIAAlyEAEiAhPIgyAAIAABw");
	this.shape_51.setTransform(-25.075,-510.9406);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f().s("#000000").ss(1,0,0,3).p("EAEZghuQAAAQgMAMQgLAMgRAAQgRAAgMgMQgLgMAAgQQAAgRALgMQAMgLARAAQARAAALALQAMAMAAARgEADUggkQAMgMARAAQARAAALAMQAMAMAAAQQAAARgMAMQgLALgRAAQgRAAgMgLQgLgMAAgRQAAgQALgMgAEN92QgLAMgRAAQgRAAgMgMQgLgMAAgQQAAgRALgMQAMgLARAAQARAAALALQAMAMAAARQAAAQgMAMgADX9BQAMgLARAAQAQAAAMALQALAMABARQgBAQgLAMQgMAMgQAAQgRAAgMgMQgMgMAAgQQAAgRAMgMgAD06HQgRAAgMgLQgMgMAAgRQAAgQAMgMQAMgMARAAQAQAAAMAMQALAMABAQQgBARgLAMQgMALgQAAgAES5gQAMAMAAARQAAAQgMAMQgLAMgRAAQgRAAgMgMQgLgMAAgQQAAgRALgMQAMgLARAAQARAAALALgAEV35QALAMABAQQgBARgLAMQgMALgQAAQgRAAgMgLQgMgMAAgRQAAgQAMgMQAMgMARAAQAQAAAMAMgAGgWhQggBEhvgLQgLApARApAEQXVIABAFIgBAAAHPZ+IAAGlQgHAug/APIhfAAEgE2ghSQgLAMgRAAQgRAAgMgMQgLgMAAgQQAAgRALgMQAMgLARAAQARAAALALQAMAMAAARQAAAQgMAMgEgFvggkQAMgMARAAQARAAALAMQAMAMAAAQQAAARgMAMQgLALgRAAQgRAAgMgLQgLgMAAgRQAAgQALgMgAlS+6QARAAALALQAMAMAAARQAAAQgMAMQgLAMgRAAQgRAAgMgMQgLgMAAgQQAAgRALgMQAMgLARAAgAlv9BQAMgLARAAQARAAALALQAMAMAAARQAAAQgMAMQgLAMgRAAQgRAAgMgMQgLgMAAgQQAAgRALgMgAkq6vQAAARgMAMQgLALgRAAQgRAAgMgLQgLgMAAgRQAAgQALgMQAMgMARAAQARAAALAMQAMAMAAAQgAlS5rQARAAALALQAMAMAAARQAAAQgMAMQgLAMgRAAQgRAAgMgMQgLgMAAgQQAAgRALgMQAMgLARAAgAlS4FQARAAALAMQAMAMAAAQQAAARgMAMQgLALgRAAQgRAAgMgLQgLgMAAgRQAAgQALgMQAMgMARAAgAitIvIhrAAADvIvIhZAAACSNlIA+AAIAAibIAqAAACSO9IgEAAABCQFIBMhEIAEgEAkpLAIBFAAIAACiIA7ABAioO9Ih2AAAkQXeQi9AYAQinAioO4IBdAuEgEkAieQAGgfgGgfIhfAAQg/gPgHguIgEnHQAlgyCZgCEgF8giZIKYAAAENO9Ih7AA");
	this.shape_52.setTransform(-25.9008,-555.5775);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FD0099").s().p("ACqCbIAFhQIAAjlIBYAAQAGBEAFBXIgqAAIAACagAjMCYIAAihIhFAAIAIhaIAJg3IBrAAIAEEzg");
	this.shape_53.setTransform(-28.35,-484.2);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#040404").s().p("AjhAYIADgjIAJABIA3ACIAAAggAChAOIAAgiIBBgDIAAAlg");
	this.shape_54.setTransform(-29.425,-628.525);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#9A99FF").s().p("AmWFgIAApeIA0hcIBaAAIAhCVIAKICIgKgBIgDAkgADaFWIAAgmIAAo4IAbgXIBLhAIAoAAIAmBXIAJJeg");
	this.shape_55.setTransform(-28.575,-661.325);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FF0100").s().p("ABLRlIAAgCMgAYgqDIBeAAIAAKdIAAAfIADAAIAAKTIAAAjIASOrIAGFOIAADmIgEBQIgEBZIgBADIhMBEgAiSXUIgBhVIgFk0IgEk8IgPuzIAAghIAAqaIAArBIBSAAMAAjAwig");
	this.shape_56.setTransform(-28.1,-609.6);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFEFF").s().p("EgAPAo2IAAl1IgT6XMgAjgwiICLAAIiLAAIhSAAIAALBIhiAAIhaAAIAAseIKYAAIADDwIAHIpIhMAAIBMAAIhMBAIAAhAIhcAAIgCgfIAAqdIhfAAMAAYAqCIAAADIANG8IAFC+IAAW6Ih/AAIB/AAIAAF1QgdAgggAAQghAAghgggAD5+ZQAAARAMAMQAMALARAAQARAAALgLQAMgMAAgRQAAgQgMgMQAMAMAAAQQAAARgMAMQgLALgRAAQgRAAgMgLQgMgMAAgRQAAgQAMgMQAMgMARAAQARAAALAMQgLgMgRAAQgRAAgMAMQgMAMAAAQIAAAAgAlR+ZQAAARALAMQAMALASAAQAQAAAMgLQALgMAAgRQAAgQgLgMQgMgMgQAAQAQAAAMAMQALAMAAAQQAAARgLAMQgMALgQAAQgSAAgMgLQgLgMAAgRQAAgQALgMQAMgMASAAQgSAAgMAMQgLAMAAAQIAAAAgAD3//QAAAQALAMQAMAMASAAQAQAAAMgMQALgMABgQQgBgRgLgMQALAMABARQgBAQgLAMQgMAMgQAAQgSAAgMgMQgLgMAAgQQAAgRALgMQAMgLASAAQAQAAAMALQgMgLgQAAQgSAAgMALQgLAMAAARIAAAAgAlR//QAAAQALAMQAMAMASAAQAQAAAMgMQALgMAAgQQAAgRgLgMQgMgLgQAAQAQAAAMALQALAMAAARQAAAQgLAMQgMAMgQAAQgSAAgMgMQgLgMAAgQQAAgRALgMQAMgLASAAQgSAAgMALQgLAMAAARIAAAAgEAD1ghrQAAARALAMQAMALARAAQgRAAgMgLQgLgMAAgRQAAgQALgMQAMgMARAAQAQAAAMAMQAMAMAAAQQAAARgMAMQgMALgQAAQAQAAAMgLQAMgMAAgRQAAgQgMgMQgMgMgQAAQgRAAgMAMQgLAMAAAQIAAAAgEgFRghrQAAARALAMQAMALASAAQAQAAAMgLQALgMAAgRQAAgQgLgMQgMgMgQAAQgSAAgMAMQgLAMAAAQIAAAAgEAD1gjgQAAAQALAMQAMAMARAAQAQAAAMgMQAMgMAAgQQAAgRgMgMQgMgLgQAAQgRAAgMALQgLAMAAARIAAAAgEgFRgjgQAAAQALAMQAMAMASAAQAQAAAMgMQALgMAAgQQAAgRgLgMQgMgLgQAAQgSAAgMALQgLAMAAARIAAAAgEADyglOQAAAQAMAMQAMAMAQAAQARAAALgMQgLAMgRAAQgQAAgMgMQgMgMAAgQQAAgRAMgMQAMgLAQAAQARAAALALQAMAMAAARQAAAQgMAMQAMgMAAgQQAAgRgMgMQgLgLgRAAQgQAAgMALQgMAMAAARIAAAAgEgFRglOQAAAQALAMQAMAMASAAQAQAAAMgMQALgMAAgQQAAgRgLgMQgMgLgQAAQAQAAAMALQALAMAAARQAAAQgLAMQgMAMgQAAQgSAAgMgMQgLgMAAgQQAAgRALgMQAMgLASAAQgSAAgMALQgLAMAAARIAAAAgEADygnEQAAARAMAMQAMALAQAAQARAAALgLQAMgMAAgRQAAgQgMgMQgLgMgRAAQgQAAgMAMQgMAMAAAQIAAAAgEgFRgnEQAAARALAMQAMALASAAQAQAAAMgLQALgMAAgRQAAgQgLgMQgMgMgQAAQgSAAgMAMQgLAMAAAQIAAAAgEADygoqQAAAQAMAMQAMAMAQAAQARAAALgMQAMgMAAgQQAAgRgMgMQgLgLgRAAQgQAAgMALQgMAMAAARIAAAAgEgFRgoqQAAAQALAMQAMAMASAAQAQAAAMgMQgMAMgQAAQgSAAgMgMQgLgMAAgQQAAgRALgMQAMgLASAAQAQAAAMALQALAMAAARQAAAQgLAMQALgMAAgQQAAgRgLgMQgMgLgQAAQgSAAgMALQgLAMAAARIAAAAgEgD7Ai/IAAhsIA+A1IAAA5QgIAUgPAAQgQAAgXgWgEAEiAjBIAAhwIAxAAIAAA0IAAAbIAAAIIABAZgAC3IBIAEAAIgEAEgAC7IBIgEAAIAEhYIA+AAIAAibIAqAAIAGBDIAJA9QAGAtgCBGgAC3IBgAj1IBQgIgvgEgsIgChEIADheIBFAAIAACiIA7ABIABBVIAAAFgADABzIgHlNQANAcAnBKQAaA0ARCzgAjvBzQAWiHAwiFQAFgQAbgfIAFE7gAjOygIgLoCIggiVIBiAAIAAKagACn88IBcAAIAABAIgbAWIAAI6IhBACgEgFGghOQgLgMAAgRQAAgQALgMQAMgMASAAQAQAAAMAMQALAMAAAQQAAARgLAMQgMALgQAAQgSAAgMgLgEgEBghrIAAAAgEAEAgjEQgLgMAAgQQAAgRALgMQAMgLARAAQAQAAAMALQAMAMAAARQAAAQgMAMQgMAMgQAAQgRAAgMgMgEgFGgjEQgLgMAAgQQAAgRALgMQAMgLASAAQAQAAAMALQALAMAAARQAAAQgLAMQgMAMgQAAQgSAAgMgMgEAEAgj9IAAAAgEgFGgj9IAAAAgEAD+gmnQgMgMAAgRQAAgQAMgMQAMgMAQAAQARAAALAMQAMAMAAAQQAAARgMAMQgLALgRAAQgQAAgMgLgEgFGgmnQgLgMAAgRQAAgQALgMQAMgMASAAQAQAAAMAMQALAMAAAQQAAARgLAMQgMALgQAAQgSAAgMgLgEAD+gngIAAAAgEgFGgngIAAAAgEAD+goOQgMgMAAgQQAAgRAMgMQAMgLAQAAQARAAALALQAMAMAAARQAAAQgMAMQgLAMgRAAQgQAAgMgMgEAFCgoqIAAAAg");
	this.shape_57.setTransform(-30.05,-511.1875);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#9A9833").s().p("ABHNjIAA26IgGi+IBMhEIAFgDIB7AAIABANIACBJQAABMgGBMIAGEpIAAAGIABAAQgMApASApIByAAQBAAHAFBLIAAGkQgGAthAAPIheAAIAAGtIgyAAIAABxgAjnNjIAAg6Ig+g1IAAlxQAHgfgHgfIheAAQg/gPgHgtIgFnHQAmgyCYgCIAAhKIgCnpIgMg3IB2AAIAAgGIBcAuIATaXg");
	this.shape_58.setTransform(-25.9,-373.7);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#9A97FE").s().p("AmtHuIAAwtQAOghArgNIDRAAQgbAfgFAQQgwCFgWCIIgIA3IgJBaIgDBeIACBDQAEAsAJAvIAMA3IACHqQgYADgUAAQiQAAAPiSgAEgJ5IAAgFIgGkpQAGhMAAhMIgChJIgBgOQABhGgGgsIgJg9IgGhDQgFhXgGhEQgQi0gbg0QgnhKgNgcIDhAFIAwAzIAASHQgcA7hWAAIgegCg");
	this.shape_59.setTransform(-27.4661,-469.0801);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51}]}).wait(1));

	// Layer_2
	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f().s("#000000").ss(1,0,0,3).p("EAAjgn7IBfAAIAAKdIACAfIBcAAIBMAAIgHooIAvAAIAAIoIgoAAIhMBAIgbAXIAAI5IAAAmEAElglnIgDjwAi786IAArBIBTAAICLAAAkc86IBhAAIAAKaIg3gCIgJgBIgDAkIitAAIAApfIA1hcgACC9eIAAAfIACAAIAAKTIBBgDEgF2gpXIAAMdAi7x/IhDAAAi7ygIAAAhAFU8/IAlBXIAKJfIi+AAIhBAAIAVSFIAMAcIDSAAIAvAzIAAOYIAFDIQAFBRhQAGIhFAAIAAAPACEysIAAAjAjyyiIgKoDIggiVADg8/IAABAAkLLtIACIkIhKAAQhiABASiaIAAwtQAOghArgOICrAAIAWgqIgSxxABNMEIgSp6IAAgCMgAYgqDACcFWIBkAAQgYiShDisAEWJWIg/gCIAABHIhLAAIgEBSAEUINQgfgwgeAwIAABHAEWJWIgChJQgFhcgPhbAkNFhIBpAAIgFlvAifKdIgBhAIgEj8AkYIIQAdgUAeAUIAABVIAABAIA+AAAkYIIQABhUAKhTQAVikA5ihAkLLtIB7AAIAAg0IgPgWIAAgGAhDMEIhNAAIAAgXABNMEIAAAAIAKAAAEQLtIiIAAIgBAXIgwAAIgKAAIAAW7IiAAAIgQ27ICQAAAkYIIQgCByAPBzAEQLtQAHhMgBhLACMKbIAQlFIgDlaEgBogn7MAAlAz/EAEwAhPIAAA0IAAAaIAAAJIABAZIgyAAEAEwAhPIgxAAIAABwIiyAAIAAF0Qg7BAhFhAIAAl0IitAAQgSAogtgrIAAhrIABlyEgDgAi/IAAg6Ig/g0AEwahIAAGuAEbUCIgLoV");
	this.shape_60.setTransform(-123.0353,-509.4406);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f().s("#000000").ss(1,0,0,3).p("EADSgiMQAMgLARAAQAQAAAMALQALAMABARQgBAQgLAMQgMAMgQAAQgRAAgMgMQgMgMAAgQQAAgRAMgMgEADvggxQAQAAAMAMQALAMABAQQgBARgLAMQgMALgQAAQgRAAgMgLQgMgMAAgRQAAgQAMgMQAMgMARAAgADG+TQAAgRAMgMQAMgLARAAQAQAAAMALQALAMABARQgBAQgLAMQgMAMgQAAQgRAAgMgMQgMgMAAgQgEgEsghvQgBAQgLAMQgMAMgQAAQgRAAgMgMQgMgMAAgQQAAgRAMgMQAMgLARAAQAQAAAMALQALAMABARgEgEsggJQgBARgLAMQgMALgQAAQgRAAgMgLQgMgMAAgRQAAgQAMgMQAMgMARAAQAQAAAMAMQALAMABAQgAlx93QgMgMAAgQQAAgRAMgMQAMgLARAAQAQAAAMALQALAMABARQgBAQgLAMQgMAMgQAAQgRAAgMgMgAlx9CQAMgLARAAQAQAAAMALQALAMABARQgBAQgLAMQgMAMgQAAQgRAAgMgMQgMgMAAgQQAAgRAMgMgAks6wQgBARgLAMQgMALgQAAQgRAAgMgLQgMgMAAgRQAAgQAMgMQAMgMARAAQAQAAAMAMQALAMABAQgAk44oQgMAMgQAAQgRAAgMgMQgMgMAAgQQAAgRAMgMQAMgLARAAQAQAAAMALQALAMABARQgBAQgLAMgAlU4GQAQAAAMAMQALAMABAQQgBARgLAMQgMALgQAAQgRAAgMgLQgMgMAAgRQAAgQAMgMQAMgMARAAgADU9CQAMgLARAAQARAAALALQAMAMAAARQAAAQgMAMQgLAMgRAAQgRAAgMgMQgLgMAAgQQAAgRALgMgADx7YQARAAALAMQAMAMAAAQQAAARgMAMQgLALgRAAQgRAAgMgLQgLgMAAgRQAAgQALgMQAMgMARAAgADX5hQAMgLARAAQAQAAAMALQALAMABARQgBAQgLAMQgMAMgQAAQgRAAgMgMQgMgMAAgQQAAgRAMgMgAEe3eQAAARgMAMQgLALgRAAQgRAAgMgLQgLgMAAgRQAAgQALgMQAMgMARAAQARAAALAMQAMAMAAAQgEAEZgiaIqYAAAipQaIg8AAAESbPQgOAjAOAsIB1AAQA/AIAGBKIAACyQgHAug/APIheAAEgEnAidQAZgfgZgfIheAAQg/gPgHguIAAiyQAGhKA/gIIB1AAQAOgsgOgj");
	this.shape_61.setTransform(-122.175,-553.97);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FD0099").s().p("ACPCiIAQlEIBkAAQAPBcAFBaQgfgvgfAvIAABHIAABHgAjaBkIAAhVQgegSgeASQABhTALhTIBpAAIADD7g");
	this.shape_62.setTransform(-123.275,-458.95);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#040404").s().p("AjhAYIADgjIAJABIA3ACIAAAggAChAOIAAgiIBBgDIAAAlg");
	this.shape_63.setTransform(-125.925,-627.025);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#9A99FF").s().p("AmWFgIAApeIA0hcIBaAAIAhCVIAKICIgKgBIgDAkgADaFWIAAgmIAAo4IAbgXIBLhAIAoAAIAmBXIAJJeg");
	this.shape_64.setTransform(-125.075,-659.825);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FF0100").s().p("AiAaAIAAgXIAAg0IgQgXIAAgFIAAhAIgEj8IgFlwIgSxxIAAggIAAqaIAArBIBSAAMAAmAz/gABnZ/IgKAAIgSp5IAAgCMgAYgqDIBeAAIAAKdIAAAfIACAAIAAKSIAAAjIAWSFIADFbIgQFFIgEBSIgBAWg");
	this.shape_65.setTransform(-124.6,-598.6);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFEFF").s().p("EgAPAo2IAAl1IgQ26ICQAAIAAW6IiAAAICAAAIAAF1QgeAgghAAQggAAghgggEgD8Ai/IAAhsIA/A1IAAA5QgIAUgPAAQgQAAgYgWgEAEiAjBIAAhwIAxAAIAAA0IAAAbIAAAIIABAZgAgfMHMgAmgz/ICLAAIiLAAIhTAAIAALBIhhAAIhaAAIAAseIKYAAIADDwIAHIpIhMAAIBMAAIhMBAIAAhAIAABAIgbAWIAAI6IhBACIAAqSIBcAAIhcAAIgCgfIAAqdIhfAAMAAZAqCIAAADIASJ5IAAABgAD5+ZQAAARAMAMQAMALARAAQAQAAAMgLQAMgMAAgRQAAgQgMgMQgMgMgQAAQgRAAgMAMQgMAMAAAQIAAAAgAlR+ZQAAARALAMQANALAQAAQARAAALgLQAMgMABgRQgBgQgMgMQgLgMgRAAQARAAALAMQAMAMABAQQgBARgMAMQgLALgRAAQgQAAgNgLQgLgMAAgRQAAgQALgMQANgMAQAAQgQAAgNAMQgLAMAAAQIAAAAgAD3//QAAAQALAMQANAMAQAAQARAAALgMQAMgMABgQQgBgRgMgMQgLgLgRAAQgQAAgNALQgLAMAAARIAAAAgAlR//QAAAQALAMQANAMAQAAQARAAALgMQgLAMgRAAQgQAAgNgMQgLgMAAgQQAAgRALgMQANgLAQAAQARAAALALQAMAMABARQgBAQgMAMQAMgMABgQQgBgRgMgMQgLgLgRAAQgQAAgNALQgLAMAAARIAAAAgEAD1ghrQgBARAMAMQAMALARAAQARAAALgLQAMgMAAgRQAAgQgMgMQgLgMgRAAQARAAALAMQAMAMAAAQQAAARgMAMQgLALgRAAQgRAAgMgLQgMgMABgRQgBgQAMgMQAMgMARAAQgRAAgMAMQgMAMABAQIAAAAgEgFRghrQAAARALAMQANALAQAAQARAAALgLQAMgMABgRQgBgQgMgMQgLgMgRAAQgQAAgNAMQgLAMAAAQIAAAAgEAD1gjgQgBAQAMAMQAMAMARAAQARAAALgMQAMgMAAgQQAAgRgMgMQgLgLgRAAQgRAAgMALQgMAMABARIAAAAgEgFRgjgQAAAQALAMQANAMAQAAQARAAALgMQAMgMABgQQgBgRgMgMQgLgLgRAAQgQAAgNALQgLAMAAARIAAAAgEAD+gkyQALAMASAAQAQAAAMgMQALgMAAgQQAAgRgLgMQgMgLgQAAQgSAAgLALQgMAMAAARQAAAQAMAMgEgEpgkmQARAAALgMQAMgMABgQQgBgRgMgMQgLgLgRAAQgQAAgNALQgLAMAAARQAAAQALAMQgLgMAAgQQAAgRALgMQANgLAQAAQARAAALALQAMAMABARQgBAQgMAMQgLAMgRAAQgQAAgNgMQANAMAQAAgEADygnEQAAARAMAMQALALASAAQAQAAAMgLQALgMAAgRQAAgQgLgMQgMgMgQAAQAQAAAMAMQALAMAAAQQAAARgLAMQgMALgQAAQgSAAgLgLQgMgMAAgRQAAgQAMgMQALgMASAAQgSAAgLAMQgMAMAAAQIAAAAgEgFRgnEQAAARALAMQANALAQAAQARAAALgLQAMgMABgRQgBgQgMgMQgLgMgRAAQgQAAgNAMQgLAMAAAQIAAAAgEADygoqQAAAQAMAMQALAMASAAQAQAAAMgMQALgMAAgQQAAgRgLgMQgMgLgQAAQgSAAgLALQgMAMAAARIAAAAgEgFRgoqQAAAQALAMQANAMAQAAQARAAALgMQAMgMABgQQgBgRgMgMQgLgLgRAAQgQAAgNALQgLAMAAARIAAAAgAgfMHgACrLwIAFhSIBKAAIAAhHIAAhIQAfgvAeAvIACBJIg/gBIA/ABQABBMgGBMgAjnLwQgQh0AChyQAdgTAfATIAABVIAABBIA9AAIAAAFIAPAWIAAA1gAjqFjQAWijA4ihIAWgqIAFFugADAFZIgElbIAMAcQBDCtAZCSgAjPygIgKoCIggiVIBhAAIAAKagAEF98QgMgMAAgRQAAgQAMgMQAMgMARAAQAQAAAMAMQAMAMAAAQQAAARgMAMQgMALgQAAQgRAAgMgLgAFK+ZIAAAAgAEC/jQgLgMAAgQQAAgRALgMQANgLAQAAQARAAALALQAMAMABARQgBAQgMAMQgLAMgRAAQgQAAgNgMgEAECggcIAAAAgEgFGghOQgLgMAAgRQAAgQALgMQANgMAQAAQARAAALAMQAMAMABAQQgBARgMAMQgLALgRAAQgQAAgNgLgEgEAghrIAAAAgEAEAgjEQgMgMABgQQgBgRAMgMQAMgLARAAQARAAALALQAMAMAAARQAAAQgMAMQgLAMgRAAQgRAAgMgMgEgFGgjEQgLgMAAgQQAAgRALgMQANgLAQAAQARAAALALQAMAMABARQgBAQgMAMQgLAMgRAAQgQAAgNgMgEAEAgj9IAAAAgEgFGgj9IAAAAgEAD+gkyQgMgMAAgQQAAgRAMgMQALgLASAAQAQAAAMALQALAMAAARQAAAQgLAMQgMAMgQAAQgSAAgLgMgEADyglOIAAAAgEgFGgmnQgLgMAAgRQAAgQALgMQANgMAQAAQARAAALAMQAMAMABAQQgBARgMAMQgLALgRAAQgQAAgNgLgEgEAgnEIAAAAgEgBFgn4gEAD+goOQgMgMAAgQQAAgRAMgMQALgLASAAQAQAAAMALQALAMAAARQAAAQgLAMQgMAMgQAAQgSAAgLgMgEgFGgoOQgLgMAAgQQAAgRALgMQANgLAQAAQARAAALALQAMAMABARQgBAQgMAMQgLAMgRAAQgQAAgNgMgEgEAgoqIAAAAgEAD+gpHIAAAAg");
	this.shape_66.setTransform(-126.55,-509.6875);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#9A9833").s().p("ABFLpIAA26IAKAAIAvAAIACgXICIAAIAKIVIAAAPQgOAjAOAtIB1AAQA/AIAGBKIAACxQgHAug/AOIheAAIAAGuIgyAAIAABwgAjpLpIAAg6Ig+g0IAAlyQAZgfgZgfIheAAQg/gOgHguIAAixQAGhKA/gIIB1AAQAOgtgOgjIgCokIB6AAIAAAXIBOAAIAQW6g");
	this.shape_67.setTransform(-122.175,-360.025);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#9A97FE").s().p("AmlHkIAAwtQAOghArgNICrAAQg5ChgVCjQgLBTgBBUQgCByAQBzIACIkIhKAAIgBAAQhhAAASiZgAEYJuIgKoVQAGhMAAhLIgChJQgFhbgPhbQgZiShDitIDSAAIAwAzIAAOXIAFDIQAFBShQAGg");
	this.shape_68.setTransform(-122.7749,-443.3749);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60}]}).wait(1));

	// Layer_1
	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f().s("#000000").ss(1,0,0,3).p("EAELgpHQALAMABARQgBAQgLAMQgMAMgQAAQgRAAgMgMQgMgMAAgQQAAgRAMgMQAMgLARAAQAQAAAMALgEADSgngQAMgMARAAQAQAAAMAMQALAMABAQQgBARgLAMQgMALgQAAQgRAAgMgLQgMgMAAgRQAAgQAMgMgEADSgkyQgMgMAAgQQAAgRAMgMQAMgLARAAQAQAAAMALQALAMABARQgBAQgLAMQgMAMgQAAQgRAAgMgMgEADUgj9QAMgLARAAQARAAALALQAMAMAAARQAAAQgMAMQgLAMgRAAQgRAAgMgMQgLgMAAgQQAAgRALgMgEAEcgllIAvAAIAAIpIgoAAgAl/83IAAseIKYAAIADDwEAENgiHQAMAMAAAQQAAARgMAMQgLALgRAAQgRAAgMgLQgLgMAAgRQAAgQALgMQAMgMARAAQARAAALAMgEAEQggcQALAMABARQgBAQgLAMQgMAMgQAAQgRAAgMgMQgMgMAAgQQAAgRAMgMQAMgLARAAQAQAAAMALgAD2/BQARAAALAMQAMAMAAAQQAAARgMAMQgLALgRAAQgRAAgMgLQgLgMAAgRQAAgQALgMQAMgMARAAgAB59bIACAfIBdAAIBLAAIhLBAIAAhAAB59bIAAAfIACAAIAAKSIBCgCIAAo6IAbgWEAAagn4IBfAAIAAKdAjD83IAArBIBSAAICLAAEgE4goOQgMAMgQAAQgRAAgMgMQgMgMAAgQQAAgRAMgMQAMgLARAAQAQAAAMALQALAMABARQgBAQgLAMgEgFxgngQAMgMARAAQAQAAAMAMQALAMABAQQgBARgLAMQgMALgQAAQgRAAgMgLQgMgMAAgRQAAgQAMgMgEgEsglOQgBAQgLAMQgMAMgQAAQgRAAgMgMQgMgMAAgQQAAgRAMgMQAMgLARAAQAQAAAMALQALAMABARgEgFxgj9QAMgLARAAQAQAAAMALQALAMABARQgBAQgLAMQgMAMgQAAQgRAAgMgMQgMgMAAgQQAAgRAMgMgEgFUgiTQAQAAAMAMQALAMABAQQgBARgLAMQgMALgQAAQgRAAgMgLQgMgMAAgRQAAgQAMgMQAMgMARAAgEgFUggnQAQAAAMALQALAMABARQgBAQgLAMQgMAMgQAAQgRAAgMgMQgMgMAAgQQAAgRAMgMQAMgLARAAgAlx+1QAMgMARAAQAQAAAMAMQALAMABAQQgBARgLAMQgMALgQAAQgRAAgMgLQgMgMAAgRQAAgQAMgMgAkl83IhaAAAkl83IBiAAIAAKaIAAAgIhEAAAjDydIg3gDIgKAAIgDAjIisAAIAApfIA0hbAj6ygIgKoCIghiVAFL88IAmBWIAJJfIi9AAIhCAAIAWSFIALAcQBDCtAZCSQAPBbAFBbIACBJQAABMgGBMIAKIVIBGAAQBQgGgFhSIgFjIIAAuYIgwgzIjSAAAB7yqIAAAjAC9ysIAAAlAkRUUIhKAAQhiAAASiZIAAwuQAOghArgNICrAAQAFgQAQgaIgRxyABFMGIgSp5IAAgDMgAZgqCAkhIKQABhUALhTQAVijA5ihAkhIKQAegTAeATIAABVIA8AAIgDj8IhpAAABFMGIAKAAIgKABgAhLMHICQAAIAAW6IAAF1Qg8A/hEg/IAAl1IiuAAAjlJfIAABBIA9AAIAAAFIAPAWIAAA1IAAAXIBOAAMgAmgz/AiZLwIh6AAQgQh0AChyAioKgIgBhBACUFZIBkAAACEKeIBKAAIAAhHIAAhIQAfgvAfAvADOJXIBAABACUFZIgQFFIgEBSIgCAWIgvAAACALwICIAAAisFjIgGluACRgCIADFbAESUFIAAAPQgOAjAOAsIB1AAQA/AIAGBKIAACyQgHAug/APIheAAIAAGtIAAA0IAAAbIAAAIIAAAZIgyAAIixAAIiAAAIgQ26EAD2AjBIAAhwIAyAAEgEnAhTIAAlxQAZgfgZgfIheAAQg/gPgHguIAAiyQAGhKA/gIIB1AAQAOgsgOgjEgEnAhTIA+A1IAAA5QgRAogtgqgAkTLwIACIk");
	this.shape_69.setTransform(69.825,-512.6875);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FD0099").s().p("ACPCjIAQlEIBkAAQAPBaAFBbQgfgugfAuIAABIIAABHgAjaBkIAAhVQgegTgeATQABhTALhTIBpAAIADD7g");
	this.shape_70.setTransform(68.725,-461.95);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#040404").s().p("AjhAYIADgjIAJABIA3ACIAAAggAChAOIAAgiIBBgDIAAAlg");
	this.shape_71.setTransform(66.075,-630.025);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#9A99FF").s().p("AmWFgIAApeIA0hcIBaAAIAhCVIAKICIgKgBIgDAkgADaFWIAAgmIAAo4IAbgXIBLhAIAoAAIAmBXIAJJeg");
	this.shape_72.setTransform(66.925,-662.825);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FF0100").s().p("AiAaAIAAgXIAAg0IgQgXIAAgFIgBhBIgDj8IgGlvIgRxxIAAggIAAqaIAArBIBSAAMAAmAz/gABnaAIgKAAIgSp6IAAgDMgAZgqCIBgAAIAAKdIAAAfIACAAIAAKSIAAAjIAVSFIADFbIgQFFIgEBSIgCAXg");
	this.shape_73.setTransform(67.4,-601.6);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFEFF").s().p("EgAPAo2IAAl1IgR26ICQAAIAAW6Ih/AAIB/AAIAAF1QgdAgggAAQghAAghgggEgD7Ai/IAAhsIA+A1IAAA5QgIAUgPAAQgQAAgXgWgEAEiAjBIAAhwIAxAAIAAA0IAAAbIAAAIIABAZgAggMHMgAlgz/ICLAAIiLAAIhSAAIAALBIhiAAIhaAAIAAseIKYAAIADDwIAHIpIhLAAIhdAAIBdAAIAABAIgbAWIAAI6IhCACIAAqSIgCgfIAAqdIhfAAMAAYAqCIAAADIASJ5IAAABgAD5+ZQAAARAMAMQAMALARAAQARAAALgLQALgMABgRQgBgQgLgMQgLgMgRAAQARAAALAMQALAMABAQQgBARgLAMQgLALgRAAQgRAAgMgLQgMgMAAgRQAAgQAMgMQAMgMARAAQgRAAgMAMQgMAMAAAQIAAAAgAlR+ZQAAARALAMQAMALASAAQAQAAAMgLQALgMAAgRQAAgQgLgMQgMgMgQAAQgSAAgMAMQgLAMAAAQIAAAAgAD3//QAAAQALAMQAMAMASAAQAQAAAMgMQALgMAAgQQAAgRgLgMQALAMAAARQAAAQgLAMQgMAMgQAAQgSAAgMgMQgLgMAAgQQAAgRALgMQAMgLASAAQAQAAAMALQgMgLgQAAQgSAAgMALQgLAMAAARIAAAAgAlR//QAAAQALAMQAMAMASAAQAQAAAMgMQALgMAAgQQAAgRgLgMQgMgLgQAAQAQAAAMALQALAMAAARQAAAQgLAMQgMAMgQAAQgSAAgMgMQgLgMAAgQQAAgRALgMQAMgLASAAQgSAAgMALQgLAMAAARIAAAAgEAD1ghrQAAARALAMQAMALARAAQAQAAAMgLQALgMABgRQgBgQgLgMQALAMABAQQgBARgLAMQgMALgQAAQgRAAgMgLQgLgMAAgRQAAgQALgMQAMgMARAAQAQAAAMAMQgMgMgQAAQgRAAgMAMQgLAMAAAQIAAAAgEgFRghrQAAARALAMQAMALASAAQAQAAAMgLQALgMAAgRQAAgQgLgMQgMgMgQAAQAQAAAMAMQALAMAAAQQAAARgLAMQgMALgQAAQgSAAgMgLQgLgMAAgRQAAgQALgMQAMgMASAAQgSAAgMAMQgLAMAAAQIAAAAgEAD1gjgQAAAQALAMQAMAMARAAQAQAAAMgMQALgMABgQQgBgRgLgMQgMgLgQAAQgRAAgMALQgLAMAAARIAAAAgEgFRgjgQAAAQALAMQAMAMASAAQAQAAAMgMQALgMAAgQQAAgRgLgMQgMgLgQAAQgSAAgMALQgLAMAAARIAAAAgEAEagkmQARAAALgMQAMgMABgQQgBgRgMgMQgLgLgRAAQgQAAgMALQgMAMAAARQAAAQAMAMQgMgMAAgQQAAgRAMgMQAMgLAQAAQARAAALALQAMAMABARQgBAQgMAMQgLAMgRAAQgQAAgMgMQAMAMAQAAgEgFRglOQAAAQALAMQAMAMASAAQAQAAAMgMQALgMAAgQQAAgRgLgMQgMgLgQAAQgSAAgMALQgLAMAAARIAAAAgEADygnEQAAARAMAMQAMALAQAAQARAAALgLQAMgMABgRQgBgQgMgMQgLgMgRAAQgQAAgMAMQgMAMAAAQIAAAAgEgFRgnEQAAARALAMQAMALASAAQAQAAAMgLQALgMAAgRQAAgQgLgMQgMgMgQAAQgSAAgMAMQgLAMAAAQIAAAAgEADygoqQAAAQAMAMQAMAMAQAAQARAAALgMQAMgMABgQQgBgRgMgMQAMAMABARQgBAQgMAMQgLAMgRAAQgQAAgMgMQgMgMAAgQQAAgRAMgMQAMgLAQAAQARAAALALQgLgLgRAAQgQAAgMALQgMAMAAARIAAAAgEgFRgoqQAAAQALAMQAMAMASAAQAQAAAMgMQgMAMgQAAQgSAAgMgMQgLgMAAgQQAAgRALgMQAMgLASAAQAQAAAMALQALAMAAARQAAAQgLAMQALgMAAgQQAAgRgLgMQgMgLgQAAQgSAAgMALQgLAMAAARIAAAAgAggMHgACsLwIADhSIBLAAIAAhHIAAhIQAegvAfAvIADBJIhAgBIBAABQAABMgGBMgAjnLwQgQh0AChyQAegTAdATIAABVIAABBIA+AAIAAAFIAPAWIAAA1gAjpFjQAUijA5ihQAGgQAQgaIAFFugAC/FZIgClbIALAcQBDCtAYCSgAjOygIgKoCIghiVIBiAAIAAKagAEE88IBLAAIhLBAgAEE88gAlG98QgLgMAAgRQAAgQALgMQAMgMASAAQAQAAAMAMQALAMAAAQQAAARgLAMQgMALgQAAQgSAAgMgLgAlG+1IAAAAgEAEAgjEQgLgMAAgQQAAgRALgMQAMgLARAAQAQAAAMALQALAMABARQgBAQgLAMQgMAMgQAAQgRAAgMgMgEgFGgjEQgLgMAAgQQAAgRALgMQAMgLASAAQAQAAAMALQALAMAAARQAAAQgLAMQgMAMgQAAQgSAAgMgMgEAEAgj9IAAAAgEgFGgj9IAAAAgEgFGgkyQgLgMAAgQQAAgRALgMQAMgLASAAQAQAAAMALQALAMAAARQAAAQgLAMQgMAMgQAAQgSAAgMgMgEgEBglOIAAAAgEAD+gmnQgMgMAAgRQAAgQAMgMQAMgMAQAAQARAAALAMQAMAMABAQQgBARgMAMQgLALgRAAQgQAAgMgLgEgFGgmnQgLgMAAgRQAAgQALgMQAMgMASAAQAQAAAMAMQALAMAAAQQAAARgLAMQgMALgQAAQgSAAgMgLgEAD+gngIAAAAgEgFGgngIAAAAg");
	this.shape_74.setTransform(65.45,-512.6875);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#9A9833").s().p("ABFLpIAA26IAKAAIAvAAIACgXICIAAIAKIVIAAAPQgOAjAOAtIB1AAQA/AIAGBKIAACxQgHAug/AOIheAAIAAGuIgyAAIAABwgAjpLpIAAg6Ig+g0IAAlyQAZgfgZgfIheAAQg/gOgHguIAAixQAGhKA/gIIB1AAQAOgtgOgjIgCokIB6AAIAAAXIBOAAIAQW6g");
	this.shape_75.setTransform(69.825,-363.025);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#9A97FE").s().p("AmlHkIAAwtQAOghArgNICrAAQg5ChgVCjQgLBTgBBUQgCByAQBzIACIkIhKAAIgBAAQhhAAASiZgAEYJuIgKoVQAGhMAAhLIgChJQgFhbgPhbQgZiShDitIDSAAIAwAzIAAOXIAFDIQAFBShQAGg");
	this.shape_76.setTransform(69.2251,-446.3749);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-317.5,-785.2,523.2,951.5);


(lib.shape192 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("AAAk1IAAJr");
	this.shape.setTransform(717.5,162.85);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(716,130.4,3,65);


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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("ABZB2Iixjr");
	this.shape.setTransform(734.525,143.6);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(724.1,130.4,20.899999999999977,26.5);


(lib.shape190 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("AAAFXIAAqt");
	this.shape.setTransform(422.05,146.275);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(420.6,110.5,3,71.6);


(lib.shape189 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("AB9BFIj5iJ");
	this.shape.setTransform(438.775,119.125);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(424.8,110.8,28,16.700000000000003);


(lib.shape188 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("AhnguIDPBd");
	this.shape.setTransform(749.35,220.25);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(737.5,214.1,23.700000000000045,12.400000000000006);


(lib.shape187 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("AhoAwIDRhf");
	this.shape.setTransform(749.225,230.7);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(737.3,224.5,23.90000000000009,12.5);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AmFh3IMLAAIAADvIsLAAg");
	this.shape.setTransform(497.1,184.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AmFB4IAAjvIMLAAIAADvg");
	this.shape_1.setTransform(497.1,184.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(457.1,171.8,80,26);


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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("AiHA5IEPhx");
	this.shape.setTransform(443.5,191.875);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(428.4,184.7,30.200000000000045,14.400000000000006);


(lib.shape183 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("AhKCiICVlD");
	this.shape.setTransform(560.225,160.15);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(551.2,142.5,18.09999999999991,35.30000000000001);


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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("AiHg4IEPBx");
	this.shape.setTransform(608.35,252.125);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(593.3,244.9,30.200000000000045,14.499999999999972);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("ADji9IAAF7InFAAIAAl7g");
	this.shape.setTransform(735,326.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AjiC+IAAl7IHFAAIAAF7g");
	this.shape_1.setTransform(735,326.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(711.3,306.1,47.40000000000009,40);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AmFi9IMLAAIAAF7IsLAAg");
	this.shape.setTransform(575.1,326.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AmFC+IAAl7IMLAAIAAF7g");
	this.shape_1.setTransform(575.1,326.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(535.1,306.1,80,40);


(lib.shape163 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("AYy0VIAAGwMgxYAAAIAAmwgAIXsPIQbAAIAAFNIAAIgIAAJsIAAJMIwbAAIAApMIQbAAAIXnCIAAlNAIXBeIAAJsIvdAAIAAJMIxrAAIAApMIAApsIAAogIAAlNIRrAAIAAFNIAAIgIAAJsIxrAAAIXBeIQbAAAIXnCIAAIgAYynCIwbAAAnGBeIPdAAAIXUWIvdAAAnGsPIPdAAAnGnCIPdAAAnGnCIxrAAA4xBeIRrAA");
	this.shape.setTransform(-190.55,99.05);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	var sprImg_shape_1 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_eg_atlas_2"],96);
	sprImg_shape_1.onload = function(){
		this.shape_1.graphics.bf(sprImg_shape_1, null, new cjs.Matrix2D(1,0,0,1,-240.5,-111.5)).s().p("EglkARbMAAAgi1MBLJAAAMAAAAi1g")
	}.bind(this);
	this.shape_1.setTransform(370.5,111.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-350.1,-32.1,961.1,262.40000000000003);


(lib.shape160 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(5,0,0,3).p("AjbjcQBbhbCAAAQCBAABcBbQBbBcAACAQAACBhbBcQhcBbiBAAQiAAAhbhbQhchcAAiBQAAiABchcg");
	this.shape.setTransform(372.15,282.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1,0,0,3).p("ADWh7ImrD2");
	this.shape_1.setTransform(377.35,288.35);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(1,0,0,3).p("AiYCpIh4jPIBXgyIBGB4IFUjEIAyBX");
	this.shape_2.setTransform(371.2245,283.8087);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AjbDdQhchcAAiBQAAiABchbQBahcCBAAQCBAABbBcQBcBbAACAQAACBhcBcQhbBbiBAAQiBAAhahbgAkZgbIB4DOIGrj1IgyhXIlUDEIhGh4g");
	this.shape_3.setTransform(372.15,282.75);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#00FF00").s().p("AkRgoIBXgyIBGB4IFUjEIAyBXImrD2g");
	this.shape_4.setTransform(371.35,284.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_1
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#000000").ss(5,0,0,3).p("AjbjcQBbhbCAAAQCBAABcBbQBbBcAACAQAACBhbBcQhcBbiBAAQiAAAhbhbQhchcAAiBQAAiABchcg");
	this.shape_5.setTransform(182.9,289.95);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#000000").ss(1,0,0,3).p("AB1jPIBbBaIh1B1IB1B2IhbBaIh1h2Ih0B2IhbhaIB2h2Ih2h1IBbhaIB0B1g");
	this.shape_6.setTransform(182.1746,290.1);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AjcDdQhbhcAAiBQAAiBBbhaQBchcCAAAQCBAABbBcQBcBaAACBQAACBhcBcQhbBbiBAAQiAAAhchbgABuDRIBahaIh0h2IB0h0IhahbIh0B2Ih1h2IhbBbIB2B0Ih2B2IBbBaIB1h1g");
	this.shape_7.setTransform(182.9,289.95);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FF0000").s().p("AAABbIh0B1IhbhaIB2h2Ih2h0IBbhbIB0B2IB1h2IBbBbIh1B0IB1B2IhbBag");
	this.shape_8.setTransform(182.175,290.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(149.2,249.1,256.7,74.6);


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

	// Layer_1
	this.shape = new cjs.Shape();
	var sprImg_shape = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_eg_atlas_2"],95);
	sprImg_shape.onload = function(){
		this.shape.graphics.bf(sprImg_shape, null, new cjs.Matrix2D(1,0,0,1,-83.5,-136)).s().p("AtCVQMAAAgqfIaFAAMAAAAqfg")
	}.bind(this);
	this.shape.setTransform(0,0.35);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-83.5,-135.6,167,272);


(lib.shape155 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#FF9900").ss(8,1,1).p("A4+4+MAx9AAAMAAAAx9Mgx9AAAg");
	this.shape.setTransform(-18.525,-26.775);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-182.4,-190.7,327.8,327.9);


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
	this.shape.graphics.f("#000000").s().p("AhKBJQgdgdAAgsQAAgrAdgfQAfgdArAAQArAAAeAdQAfAfAAArQAAAsgfAdQgeAfgrAAQgrAAgfgfg");
	this.shape.setTransform(-2851.1,-792.875);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2861.5,-803.3,20.800000000000182,20.899999999999977);


(lib.shape149 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	var sprImg_shape = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_eg_atlas_2"],94);
	sprImg_shape.onload = function(){
		this.shape.graphics.bf(sprImg_shape, null, new cjs.Matrix2D(1,0,0,1,-121,-144)).s().p("Ay5WgMAAAgs/MAlzAAAMAAAAs/g")
	}.bind(this);
	this.shape.setTransform(-0.65,2);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-121.6,-142,242,288);


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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("AgwBAIBhh/");
	this.shape.setTransform(465.75,322.375);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(459.3,314.5,12.899999999999977,15.800000000000011);


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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("Ah9ikID7FJ");
	this.shape.setTransform(663,127.55);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(648.9,109.6,28.300000000000068,35.900000000000006);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AI8C2Ix3AAIAAlrIR3AAg");
	this.shape.setTransform(614.025,394.05);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("Ao7C2IAAlrIR3AAIAAFrg");
	this.shape_1.setTransform(614.025,394.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(555.9,374.9,116.30000000000007,38.400000000000034);


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
	this.shape.graphics.f().s("#FF0000").ss(3,0,0,3).p("AivlAIFfKB");
	this.shape.setTransform(538.925,356.175);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(519.8,322.6,38.30000000000007,67.19999999999999);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AKUBfI0nAAIAAi9IUnAAg");
	this.shape.setTransform(636.1,315);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AqTBfIAAi9IUnAAIAAC9g");
	this.shape_1.setTransform(636.1,315);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(569.1,304.5,134,21);


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
	this.shape.graphics.f().s("#FF0000").ss(3,0,0,3).p("AiCiHIEFEQ");
	this.shape.setTransform(556.925,302.05);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(542.4,286.9,29.100000000000023,30.30000000000001);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("Aqdi9IU7AAIAAF7I07AAg");
	this.shape.setTransform(741.3,105.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AqdC+IAAl7IU7AAIAAF7g");
	this.shape_1.setTransform(741.3,105.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(673.3,85.5,136,40);


(lib.shape135 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("AhMC2ICZlr");
	this.shape.setTransform(713.6,144.225);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FF9900").ss(4,1,0,3).p("ARitsQgogTgugFAPNuFQgvAFgpASALnrZQgRApgDAvANCtPIgeAbQgSASgOAUANhl5QAoAWAtAIAL4ngQASAeAaAaIANAMALTpuQAAAuANAqATTsKQgPgWgUgUIgbgZAUCp+QgCgvgQgoATjnsQAWgoAGguAR+mAQAbgRAXgXIASgTAPwlWQAugBAqgPAztIDQgRApgDAvAyRGNQgQAMgOAPQgTASgOAUAxyNjQAnAWAtAIAzbL8QASAeAaAaIAMAMA0BJuQAAAuANAqAtyFwQgogTgtgFAsAHSQgPgWgUgUIgcgZArSJeQgCgvgQgoArwLwQAVgoAHguAtVNcQAagRAYgXIARgTAvkOGQAvgBApgPAwHFXQgvAFgoAS");
	this.shape_1.setTransform(591.2,230.825);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(461,124.5,261.79999999999995,198.5);


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

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgJAHgIQAIgHAJAAQAKAAAIAHQAHAIAAAJQAAAKgHAIQgIAHgKAAQgJAAgIgHg");
	this.shape.setTransform(-334.85,255.95);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgRARQgHgGAAgLQAAgJAHgIQAIgHAJAAQAKAAAIAHQAHAIAAAJQAAALgHAGQgIAIgKAAQgJAAgIgIg");
	this.shape_1.setTransform(-334.85,125.55);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgKAHgHQAIgHAJAAQAKAAAIAHQAHAHAAAKQAAAKgHAIQgIAHgKAAQgJAAgIgHg");
	this.shape_2.setTransform(-334.85,37.55);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-337.3,35.1,5,223.4);


(lib.shape127 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	var sprImg_shape = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_eg_atlas_2"],92);
	sprImg_shape.onload = function(){
		this.shape.graphics.bf(sprImg_shape, null, new cjs.Matrix2D(1,0,0,1,-62.5,-47)).s().p("ApwHWIAAurIThAAIAAOrg")
	}.bind(this);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-62.5,-47,125,94);


(lib.shape125 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	var sprImg_shape = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_eg_atlas_2"],91);
	sprImg_shape.onload = function(){
		this.shape.graphics.bf(sprImg_shape, null, new cjs.Matrix2D(1,0,0,1,-62.5,-47)).s().p("ApwHWIAAurIThAAIAAOrg")
	}.bind(this);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-62.5,-47,125,94);


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

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(1,1,1,0)").ss(1,0,0,3).p("ABNg/IjhC7ABNg/QAUAKAUAKIAbhMIhsAgg");
	this.shape.setTransform(-174.5345,68.5409);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(1,1,1,0)").s().p("AgMASIgpgXIBrggIgbBLIgngUg");
	this.shape_1.setTransform(-165.525,60.325);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(1,0,0,3).p("AQfqkIgBBzQA0BPB+gZIACgHQACgNgDgKQgHgYgegKQgHgnAsAFQAxATABAqIioJ6QgqAagSgrICxpEAT7qkIAAh7Qheg+h8BKIgCABIAABuAUSqkIgXAAASQqVIAAgPIBrAAIAAAeASQroIAABEIhxAAATzp1IhtgBQgoA0ApAsIBCAAAKpE+IAAAxQBZAYBpgXQCUhBBGiGQgIgdgzABQg0BvhwA2QhXAYhmgMIAAgOAhVFeIAAATIL+AfIAAghAKkErIr5gSIAAALIAAA6AhVEkQiSgWh1AVIplE6IhuA4IApAuIBwg6IJQkzIDxAIAy2ITIgrgtAy2ITIAkAkIAVgPIBKhBIAnApIhSBTAvEGoIgggbIhFA/IAMAJIASANgAvzIqIgZgaAwzHnIgqgrIhZBXAwdHVIgWASAxMJ/IAMgLIBGAAAx9JNIAxAyIhUBSIBqBpIBRhSIhnhpAxIJ0IAIAAIBNhKIBfhaIgwgoAxUKPIAAAyIBXAcAySI3IgYASIAAA0IAngCIACAPAygLRIhphtIBThRAzyMfIBShOAyiJsIAlgfAvlLoIBVhYIgGgHAySI3IAVAWIBahMAvlLoIAnAoAvBJdIgygz");
	this.shape_2.setTransform(-25.2528,-8.8261);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FF0000").s().p("AyZJjIBug4IJmk6QB0gVCSAWIAAA5IAAg5IAAgLIL5ARIAGAFIAAAPQBmALBWgXQBxg2A0hvQAygCAJAdQhHCHiTBAQhqAYhYgYIAAAgIr/gfIAAgTIjxgHIpQEzIhwA6gAJAE9IAAgxgAO1AWICypDIACgHQABgNgCgKQgHgZgegKQgIgmAtAEQAwAUACAqIioJ6QgQAJgMAAQgVAAgMgbg");
	this.shape_3.setTransform(-14.725,-3.7985);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-190.4,-92.6,295.9,174.5);


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
	this.shape.graphics.f().s("#FF9900").ss(4,1,0,3).p("AFZo2IgYg2AEmqiIgegyADmsDIgogsACRtUQgZgSgbgLAAjuAIgjgDIg6AHAG6hlIgEg7AGwjbIgIg7AGelQIgNg6AF0HvIARg6AGUF7IANg7AGrEEIAHg8AG3CMIAEg7AG8AUIAAg9AGBnEIgSg5AgPOEIAPAAIAogDABiNwQAbgMAZgSADEMrIAoguAEPLLIAdgzAFIJfIAYg4AhytnQgaAOgZAUAjRscIgmAwAkYq6IgdA1AlQpMIgWA4Al6nbIgQA6AmsjwIgHA9Am4h3IgDA8Am3B3IAEA8AmsDvIAJA7AmYFlIAOA7AmYlmIgLA7Am7AAIABA7AlQJMIAWAxAkeKwIAfAyAjbMRIAqArAiCNfQAbAQAcAJAl5HaIATA6");
	this.shape.setTransform(1.35,-50.7528);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-45,-142.7,92.8,184);


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

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AKsBkI1XAAIAAjHIVXAAg");
	this.shape.setTransform(9.425,141.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AqrBkIAAjHIVXAAIAADHg");
	this.shape_1.setTransform(9.425,141.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FF0000").s().p("AgJH/IAAs4IAUAAIAAM4gAgJk5IAAiHIgfAWIgjATIAAgQQAfgcAQgVQAQgUAHgSIAJAAQAKAVAQATQAQAUAdAbIAAAQQgpgUgXgVIAACHg");
	this.shape_2.setTransform(7.85,81.4);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_1
	this.shape_3 = new cjs.Shape();
	var sprImg_shape_3 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_eg_atlas_2"],90);
	sprImg_shape_3.onload = function(){
		this.shape_3.graphics.bf(sprImg_shape_3, null, new cjs.Matrix2D(1,0,0,1,-240,-180)).s().p("EglfAcIMAAAg4PMBK/AAAMAAAA4Pg")
	}.bind(this);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-240,-180,480,360);


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

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("APoBkI/PAAIAAjHIfPAAg");
	this.shape.setTransform(-1.75,-106.25);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AvnBkIAAjHIfPAAIAADHg");
	this.shape_1.setTransform(-1.75,-106.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_3
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FF0000").s().p("Aj8G5QADgWgFgZQgEgYgMgnIAIgOQAbAmAJAeIBDh1IASAKIhDB1IAlgDIAoABIgIANQgpAKgYAIIgnAXgAieEMIGbrJIASAKImbLJg");
	this.shape_2.setTransform(-17.4,-51.6);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_2
	this.instance = new lib.CachedBmp_11();
	this.instance.setTransform(-126.65,-64.55,0.3153,0.3153);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_1
	this.shape_3 = new cjs.Shape();
	var sprImg_shape_3 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_eg_atlas_2"],89);
	sprImg_shape_3.onload = function(){
		this.shape_3.graphics.bf(sprImg_shape_3, null, new cjs.Matrix2D(0.898,0,0,0.898,-220.9,-190)).s().p("EgigAdsMAAAg7XMBFBAAAMAAAA7Xg")
	}.bind(this);
	this.shape_3.setTransform(-19.1,10.025);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-240,-180,441.8,380.1);


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

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgKAHgHQAHgHAKAAQALAAAGAHQAIAHAAAKQAAAKgIAIQgGAHgLAAQgKAAgHgHg");
	this.shape.setTransform(-347.15,173.85);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_3
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgRARQgHgHAAgKQAAgKAHgHQAHgHAKAAQALAAAGAHQAIAHAAAKQAAAKgIAHQgGAIgLAAQgKAAgHgIg");
	this.shape_1.setTransform(-347.15,124.8);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgRARQgHgGAAgLQAAgKAHgHQAHgHAKAAQALAAAGAHQAIAHAAAKQAAALgIAGQgGAIgLAAQgKAAgHgIg");
	this.shape_2.setTransform(-347.15,54.8);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgRARQgHgGAAgLQAAgKAHgHQAHgHAKAAQALAAAGAHQAIAHAAAKQAAALgIAGQgGAIgLAAQgKAAgHgIg");
	this.shape_3.setTransform(-347.15,9.8);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-349.6,7.3,5,169.1);


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
	this.shape.graphics.f("#003366").s().p("AgRARQgHgHAAgKQAAgKAHgHQAHgHAKAAQALAAAGAHQAIAHAAAKQAAAKgIAHQgGAIgLAAQgKAAgHgIg");
	this.shape.setTransform(8,38.85);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(5.5,36.4,5,5);


(lib.shape62 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("AjpA/IHTh9");
	this.shape.setTransform(-48.2,-136.425);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-73.1,-144.2,49.8,15.599999999999994);


(lib.shape61 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("ADSh4ImjDx");
	this.shape.setTransform(107.575,73.55);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.instance = new lib.CachedBmp_10();
	this.instance.setTransform(-140.85,-193.4,0.3284,0.3284);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-140.8,-193.4,339.5,323.8);


(lib.shape59 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AIaDHIwzAAIAAmNIQzAAg");
	this.shape.setTransform(24.025,99.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AoZDHIAAmNIQzAAIAAGNg");
	this.shape_1.setTransform(24.025,99.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-30.8,78.9,109.7,41.8);


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

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AGfB9Is9AAIAAj5IM9AAg");
	this.shape.setTransform(23.225,-149.4);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AmeB9IAAj5IM9AAIAAD5g");
	this.shape_1.setTransform(23.225,-149.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	var sprImg_shape_2 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_eg_atlas_2"],110);
	sprImg_shape_2.onload = function(){
		this.shape_2.graphics.bf(sprImg_shape_2, null, new cjs.Matrix2D(1.202,0,0,1.202,-229.6,-246.4)).s().p("Egj3AmhMAAAhNBMBHvAAAMAAABNBg")
	}.bind(this);
	this.shape_2.setTransform(-26.175,28.75);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-255.8,-217.7,459.3,492.9);


(lib.shape54 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("ANADJI5/AAIAAmQIZ/AAg");
	this.shape.setTransform(-59.1,124.25);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("As/DIIAAmPIZ/AAIAAGPg");
	this.shape_1.setTransform(-59.1,124.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-143.3,103.2,168.4,42.10000000000001);


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

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("ABAjsIh+HZ");
	this.shape.setTransform(-101.05,79.725);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FF9900").ss(4,1,0,3).p("AlOkxIgiAxAmhixIgcA1AnhgqIgUA4AHmnoQgPgagUgWAF/pTQgagQgbgKADyqCQgdgCgfACAAHpQIg1AbAh6oFIgwAlABepxIg4AUAHRBXIAXg3AIDg1IANg6AIbjJQABgWAAgVIAAgQAIVldQgEgegIgbAjtmjIgpAsADOHEIArgqAE0FWIAlgwAGMDaIAdgzAgxJkIA4gZABWIgIAygiAjDKEIA8gHAobD3IABA7AoMGKQAIAeALAbAnMIPQATAYAYATAlXJpQAbANAeAHAoMBlIgKA8");
	this.shape_1.setTransform(-56.725,-12.3625);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	var sprImg_shape_2 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_eg_atlas_2"],109);
	sprImg_shape_2.onload = function(){
		this.shape_2.graphics.bf(sprImg_shape_2, null, new cjs.Matrix2D(1.014,0,0,1.014,-250,-187.6)).s().p("EgnDAdUMAAAg6nMBOHAAAMAAAA6ng")
	}.bind(this);
	this.shape_2.setTransform(-24.6,-6.025);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-274.6,-193.6,500,375.2);


(lib.shape50 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("ARwB9MgjfAAAIAAj5MAjfAAAg");
	this.shape.setTransform(-34.925,72.55);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AxvB9IAAj5MAjfAAAIAAD5g");
	this.shape_1.setTransform(-34.925,72.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-149.5,59.1,229.2,26.999999999999993);


(lib.shape49 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("AB5jRIjxGj");
	this.shape.setTransform(-115.675,32.225);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FF9900").ss(4,1,0,3).p("AlejBIAAA8AlelXIAAA8AjymDIg8ABAhcmFIg8ABAlfEAIAAA8AleBqIAAA8AlegrIAAA7Ag0GOIA7AAAjKGOIA8AAAlgGOIA8AAADQmLIg8ABAFhmJIAAgFIg3ABAFhjzIAAg8AFhhdIAAg8AFhA4IAAg7AFhDOIAAg8AFhFkIAAg8AD3GPIA8ABABhGPIA8AAAA6mIIg8AB");
	this.shape_1.setTransform(-84.55,-41.4683);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	var sprImg_shape_2 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_eg_atlas_2"],108);
	sprImg_shape_2.onload = function(){
		this.shape_2.graphics.bf(sprImg_shape_2, null, new cjs.Matrix2D(1.205,0,0,1.205,-236.2,-216.9)).s().p("Egk5Ah6MAAAhDyMBJzAAAMAAABDyg")
	}.bind(this);
	this.shape_2.setTransform(-15.025,0.1);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-251.2,-216.8,472.4,433.9);


(lib.shape45 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AGQBiIsfAAIAAjDIMfAAg");
	this.shape.setTransform(-5.85,-157.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(243,243,243,0.8)").s().p("AmPBiIAAjCIMfAAIAADCg");
	this.shape_1.setTransform(-5.85,-157.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-46.8,-168.5,81.9,21.5);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AFLBaIqWAAIAAizIKWAAg");
	this.shape.setTransform(138.05,81.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AlKBaIAAizIKVAAIAACzg");
	this.shape_1.setTransform(138.05,81.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(103.9,71.2,68.29999999999998,20);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AK4BeI1vAAIAAi7IVvAAg");
	this.shape.setTransform(-64.2,158.575);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("Aq3BeIAAi7IVvAAIAAC7g");
	this.shape_1.setTransform(-64.2,158.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-134.8,148.2,141.20000000000002,20.80000000000001);


(lib.shape40 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#FF0000").ss(3,0,0,3).p("AAAo9IAAR7");
	this.shape.setTransform(135.5,14.9);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(134,-43.9,3,117.69999999999999);


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
	this.shape.graphics.f().s("#FF0000").ss(3,0,0,3).p("ABtAdIjZg5");
	this.shape.setTransform(45.4,-150.675);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(33,-155.1,24.799999999999997,8.900000000000006);


(lib.shape38 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#FF0000").ss(3,0,0,3).p("AAAqHIAAUP");
	this.shape.setTransform(-65.65,84.6);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-67.1,18.4,3,132.5);


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
	var sprImg_shape = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_eg_atlas_2"],107);
	sprImg_shape.onload = function(){
		this.shape.graphics.bf(sprImg_shape, null, new cjs.Matrix2D(1.233,0,0,1.233,-164.6,-179.4)).s().p("A5tcCMAAAg4DMAzbAAAMAAAA4Dg")
	}.bind(this);
	this.shape.setTransform(0.025,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-164.6,-179.4,329.29999999999995,358.9);


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

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AmEhgIMJAAIAADBIsJAAg");
	this.shape.setTransform(78.475,134.4);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AmEBhIAAjBIMJAAIAADBg");
	this.shape_1.setTransform(78.475,134.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(38.6,123.8,79.80000000000001,21.299999999999997);


(lib.shape32 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AmrhZINXAAIAACyItXAAg");
	this.shape.setTransform(73.975,-61.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AmrBaIAAiyINXAAIAACyg");
	this.shape_1.setTransform(73.975,-61.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(30.2,-71.7,87.6,19.900000000000006);


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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("AiSjQIEmGh");
	this.shape.setTransform(21.65,-94.475);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(5.4,-116.8,32.5,44.7);


(lib.shape30 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("AiXjKIEvGV");
	this.shape.setTransform(22.075,109.475);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.instance = new lib.CachedBmp_9();
	this.instance.setTransform(-214.7,-88.65,0.3241,0.3241);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	var sprImg_shape_1 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_eg_atlas_2"],106);
	sprImg_shape_1.onload = function(){
		this.shape_1.graphics.bf(sprImg_shape_1, null, new cjs.Matrix2D(1.377,0,0,1.377,-221.7,-191.4)).s().p("EgioAd6MAAAg7zMBFRAAAMAAAA7zg")
	}.bind(this);
	this.shape_1.setTransform(-27.85,-4.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-249.6,-195.9,443.5,382.9);


(lib.shape28 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_8();
	this.instance.setTransform(-205.1,-179.95,0.3285,0.3285);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_1
	this.shape = new cjs.Shape();
	var sprImg_shape = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_eg_atlas_2"],102);
	sprImg_shape.onload = function(){
		this.shape.graphics.bf(sprImg_shape, null, new cjs.Matrix2D(1,0,0,1,-246.5,-185)).s().p("EgmgAc6MAAAg5zMBNBAAAMAAAA5zg")
	}.bind(this);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-246.5,-185,493,370);


(lib.shape26 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#FF0000").ss(3,0,0,3).p("ACrCrIlVlV");
	this.shape.setTransform(-207.225,-21.575);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-225.8,-40.2,37.20000000000002,37.300000000000004);


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
	this.shape.graphics.f().s("#FF0000").ss(3,0,0,3).p("ACrCrIlVlV");
	this.shape.setTransform(31.525,-111.325);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(12.9,-129.9,37.300000000000004,37.2);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("At1jMIbrAAIAAGZI7rAAg");
	this.shape.setTransform(-127.175,-151.375);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("At1DNIAAmZIbrAAIAAGZg");
	this.shape_1.setTransform(-127.175,-151.375);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-216.7,-172.8,179.1,42.900000000000006);


(lib.shape22 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#FF0000").ss(3,0,0,3).p("AA/DqIh9nT");
	this.shape.setTransform(144.625,-31.95);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(136.9,-56.8,15.5,49.8);


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

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("ACrCrIlVlV");
	this.shape.setTransform(-137.025,-94.675);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.instance = new lib.CachedBmp_7();
	this.instance.setTransform(-222.65,-88.15,0.3241,0.3241);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	var sprImg_shape_1 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_eg_atlas_2"],98);
	sprImg_shape_1.onload = function(){
		this.shape_1.graphics.bf(sprImg_shape_1, null, new cjs.Matrix2D(1,0,0,1,-246.5,-185)).s().p("EgmgAc6MAAAg5zMBNBAAAMAAAA5zg")
	}.bind(this);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-246.5,-185,493,370);


(lib.shape19 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("ADqg+InTB9");
	this.shape.setTransform(-3.8,-71.725);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-28.7,-79.5,49.8,15.600000000000001);


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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("ADqg+InTB9");
	this.shape.setTransform(-144,133.175);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-168.9,125.4,49.80000000000001,15.599999999999994);


(lib.shape16 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("AjRh4IGjDx");
	this.shape.setTransform(-128.275,-95.45);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.instance = new lib.CachedBmp_6();
	this.instance.setTransform(-246.4,-185.1,0.3403,0.3403);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	var sprImg_shape_1 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_eg_atlas_2"],93);
	sprImg_shape_1.onload = function(){
		this.shape_1.graphics.bf(sprImg_shape_1, null, new cjs.Matrix2D(1,0,0,1,-246.5,-185)).s().p("EgmgAc6MAAAg5zMBNBAAAMAAAA5zg")
	}.bind(this);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-246.5,-185.1,493,370.1);


(lib.shape13 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#FF9900").ss(8,0,1).p("AJYJYIyvAAIAAyvISvAAg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-64,-64,128,128);


(lib.shape12 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	var sprImg_shape = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_eg_atlas_2"],88);
	sprImg_shape.onload = function(){
		this.shape.graphics.bf(sprImg_shape, null, new cjs.Matrix2D(1,0,0,1,-237,-190)).s().p("EglBAdsMAAAg7XMBKDAAAMAAAA7Xg")
	}.bind(this);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-237,-190,474,380);


(lib.shape10 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgKAHgHQAHgHAKAAQAKAAAHAHQAIAHAAAKQAAAKgIAIQgHAHgKAAQgKAAgHgHg");
	this.shape.setTransform(-348.15,258.15);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_3
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgKAHgHQAHgHAKAAQAKAAAHAHQAIAHAAAKQAAAKgIAIQgHAHgKAAQgKAAgHgHg");
	this.shape_1.setTransform(-348.15,195.8);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgJAHgIQAHgHAKAAQAKAAAHAHQAIAIAAAJQAAAKgIAIQgHAHgKAAQgKAAgHgHg");
	this.shape_2.setTransform(-348.15,103.8);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgRARQgHgGAAgLQAAgJAHgIQAHgHAKAAQAKAAAHAHQAIAIAAAJQAAALgIAGQgHAIgKAAQgKAAgHgIg");
	this.shape_3.setTransform(-348.15,55.8);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-350.6,53.3,5,207.39999999999998);


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

	// Layer_4
	this.instance = new lib.CachedBmp_4();
	this.instance.setTransform(-576.95,-229.9,0.4785,0.4785);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_3
	this.instance_1 = new lib.CachedBmp_5();
	this.instance_1.setTransform(-577.1,-742.2,0.4785,0.4785);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("ASUxaMgknAAAAyTRbMAknAAA");
	this.shape.setTransform(-459.275,-646.725);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.lf(["#D3D3D3","#DDDDDD","#FFFFFF","#E5E5E5","#D3D3D3"],[0,0.18,0.427,0.659,1],22.9,-73.4,22.9,58).s().p("AyTRbMAAAgi1MAknAAAMAAAAi1g");
	this.shape_1.setTransform(-459.275,-646.725);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(1,0,0,3).p("AO1o1IABgBIAAAAIBWBEAOqoVIgBAEIAnAfIAAAKIhfAAIAAgoIAAgMIAAhzQACgUgOgJQgMgIgXgBIAAgLAO1o1IAAgBIAAiKAQWn1IBJjLAQbrAIgFDLASTprIgTgKIAThDASTnGIhagMIA7iHIAfATALQrAIABAKIABAkIACABQA4AoA4gpIgCgjAKZqlIgFAPIAAB0QAaALAZAHQBVAVBVghAKZqlIgPAPQhABFgcBbIAAAuALRq2QghAAgKAGIgGAEIgHAHAKOqSIAGgEQABAQAfAMIATAFIA9AGQAuAAAggLQAYgKAHgLAI2rAIgQAUQhTBoADBfIAAASIAAByQAsAfAsgRIAAgRIAAhkANxoQIA5gFANxmpIggAJANRk4IAAACQhDARgigiIAAhWIBlgDIAABoIDDAYIgDhsIAFhpALsmdIhYgRIAAgRIhmgJALslHIi+gdAQ/mLIAAgeIBUAIAPQmXIBBALAPQmRIAAgGIhfgSIAAg/AQWkOIgCgBIAAgRAQ+kbIAAAMIgoABAQ/mLIgBBwARajYIhaAjQghAaAkALIBAAHIBQgXARdjZIgDABIA5AHARdjZIgOgBIALACASTmDIhUgIASTkSIhVgJASTj/Ih9gPASTjSIg2gHAKUoiIAABjAPQnoIAABRAO1o1IgLAgACRqSIALAGADPq/IghBbQgdBQAGCQIgogJIAAgSIiSgZIAAAZQg2AEgkgVIAAiKIBaAOIAAAbIBFAHIgCgYIBPALAChrAIgQAuADQrAIgBABADHnxIAFhYIAlhhIgigVAHHrAIgfBSIiahSAGonYQgKg7Agg7IAvhyADxqqICoBkQgkA1ALA1Ii5gVAh1rAIgaBGIgohGAgspTIhHgKIAkhjAiPp6IgPApIgBApIgDBcIgBAcIAmAAAB5o+IAHgeIACgKIgEAJIAAgLIhohEIAAAAIgbgUABCrAIA4AgIgCggACCpmIgEgCAhArAIAIAUQAJAiADA3AgjosIBDAKABvoDIAAgUIAKgnIhcgMIhJgJAAioKIBNAHAAWqsIAHBiAgvl0IAlAHIADAtIAEBQIADApIATFpIADAyIADA3IAYG1AAxlnIAFB/IACApAAxlnIhggNAgHlAIh+AZQhZAFBahdIBVALAGElwIjDgkIAGhdAFUlAIi1gYIhugPAFUlAIiIA1QjNAQCghdACXmEIAoAIIACgYAHWlhIgpgHIgFhwAGElwIApAIAgjm4IAAhZAGAncIAEBsAB6qgIAXAOIgPAsABvmfIAAhkAHWnTIgugFABQEUIgDg3IgCgyIgTlqIRbCUABQEUIAXGsASTFRIxIimASTHCIxDiuABNDdIRGCqAA2joIRdCVARPjaIr7hmAq8psIDSAXIAGAQIgBhlIgBgWAkWqZIgBgRQhiBAhshAAkYrAIABAWAmnoQIAIADIBfAAQAYgMAYgPIgGhxIBdgTAmnoQIAAADIAAAoIkVgoIAAhfIAAhSIABgCAlAnlIAAgoAnkpFQAQAkAtARAt5p/IAAhBAukqHIArAIAukrAIAAA5AvVrAIgLBAAwCoyIBlAUIgHhpAwArAIgCCOIg9gKAv4nxIBTALIBUAKIC7AZIArAGIgBgDIophJAudoeIC0AbIAAhkIAAhZAq8oNIAAASIgtAAArppnIiQgYAulnmIh7AdQgyAyBwgFICSgoIgBgYApEm7IgogHIAAACIAoAFIBoAPIiPgRIAIB8IJgBRAqOlHIADApIoKhGApgkYIgDgpAqWnDIAIB8IoHhFAmnnlQAoAyA/gKIAAgoICeAZAw/qOIhWgJAw/qOIgCgkAyVo3IAQADQAeAFAogDIAAgKQACgpgCgpIAtAEApECrIgDg1IgCgvIgXlfApxBvIACA1IATHRIAyAJIganTApzBAIACAvApYLAIgEhLIo5hkAoqJ+IADBCAyVgRIIiBRAyVKIIE3A4ApvCkIomhYAyVAaIIkBVAv4nxIidgUAyVnGICdgrAqLkeIAYFeAATCiIpchbAiwLAIl6hCAAAjHIpghRAAZELIpdhgAifooIhxAAApHB2IJdBeAiEl/IlYgt");
	this.shape_2.setTransform(-459.1007,-299.4494);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#CFC7C5").s().p("AB8BYIgEhDIF6BDgAi7BYIk3g4IAAh3II5BjIADBMg");
	this.shape_3.setTransform(-526.65,-237.775);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#CCCFA7").s().p("AiaAcIAAg3IE1A3g");
	this.shape_4.setTransform(-560.975,-231.8);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#CEA259").s().p("AgDACIAAgCIAHACg");
	this.shape_5.setTransform(-501.125,-352.15);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#A39092").s().p("ABoE6IgWmsIRCCuIAAD+gAiuE6Il7hCIgZnSIJcBgIAZG0gAyTCLIAAnEIImBXIATHRg");
	this.shape_6.setTransform(-459.275,-260.4);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FEF0FD").s().p("ABSAmIgDg2IRFCqIAAA6gApChCIgDg1IJcBeIADA2gAyTigIAAgzIIjBVIADA1g");
	this.shape_7.setTransform(-459.275,-275.65);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#DFD0D5").s().p("AFJJCIgYm1IgDg4IgDgxIgUlpIgDgqIgEhQIgDgsIglgHIBhANIAFB/IACAoIATFrIACAxIADA3IAXGtgAlAJCIgEhLIAyAJIADBCgAlEH3IgTnSIgCg0IgCguIgYlfIgDgqIgIh7IArAFIAIB8IADAqIAXFgIACAvIADA0IAaHTg");
	this.shape_8.setTransform(-487.125,-286.8);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#5F5FFE").s().p("AgoBXIgCgYIBOAMIAAAUgAgtAYIgHhhIBnBDIABALIABAAIgHAegAgIheIA1AAIACAhg");
	this.shape_9.setTransform(-451.65,-360.475);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#D3C9C8").s().p("ABPDgIgDgyIRICmIAAA2gASUFUIxIimIgTlqIRbCUIAAF8gApFB5IgDgvIJdBbIpdhbIgXlfIJfBRIAVFpIACAygAyTAdIAAgrIAAlTIAAgoIIHBFIACApIoJhGIIJBGIAZFeIoihRIIiBRIABAvgAA5i8IgCgpIRdCVIAAAogAA5i8gApfkVIgDgpIJhBRIABApg");
	this.shape_10.setTransform(-459.275,-299.725);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#654E5E").s().p("AQFC5QgkgLAggaIBbgjIA4AHIAAAxIhPAXgAChgOIC0AYIiIA0QgfACgWAAQiBAACKhOgAiDg1IBVAMIAmAHIACArIh9AZIgJABQhMAABVhYgAwfh/IB8gdIBTAKIhTgKIhUgLIicgTICcATIicAsIAAg/IAAgFIIpBJIAAADIgqgGIi8gZIACAYIiSAoIgSABQhbAAAugugAv3ing");
	this.shape_11.setTransform(-459.275,-332.45);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#BEB6C1").s().p("AA3A6IgFh+IBvAOQihBdDNgRICIgzIL7BlIAMACIhbAjQggAaAkALIBAAGIBPgWIAABNgApigfIgIh8ICQARIFXAtQhaBdBagEIB9gaIAFBPgAyThpIAAg6ICcgrIBUALIh8AdQgyAyBxgFICSgoIgCgYIC8AZIAIB7g");
	this.shape_12.setTransform(-459.275,-328.5);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#302B2F").s().p("AgpALIAAgdIBTAIIAAAdg");
	this.shape_13.setTransform(-346.25,-340.125);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#ADA1AB").s().p("ARfDwIgPgBIr7hlIi0gZIhvgPIhggMIhVgMIlXgtIhpgPIgngHIAAACIophIIAAguIAPAEQAeAEAogDIABgKQABgpgBgpIAsAEIgsgEIgCgjIACAjIhWgIIAAgqICUAAIgCCOIg8gKIA8AKIBmAUIC0AbIAAhjIAAhaIAuAAIgBACIAABSIAABgIEUAnQAoAyA/gKIAAgoICfAZIgBAbIAlAAQAlAVA1gEIAAgZICTAZIAAASIAoAJIAoAIIABgYIDDAkIApAIIApAHQAsAfAsgRIAAgRIC+AdQAjAiBDgRIAAgCIDCAYIAAARIADABIB8AQIAAAsgAq6gxIAAgRIAAARIgtAAgAuii9IAAg5IAqAAIAABBg");
	this.shape_14.setTransform(-459.275,-345.25);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#31190D").s().p("AgHAGIAPgPIgFAOIgGAFg");
	this.shape_15.setTransform(-393.375,-366.3);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FF0000").s().p("ADKCmIAAhzIAAgSQgDhdBShpIARgUICaAAIAAAKQggAAgKAHIgGADIgHAHIgPAQQhBBFgcBaIAAAtIAABkIAAARQgPAHgQAAQgcAAgcgUgAmKBWIAAiIIBaANIAAAcIAABYIAAAZIgQAAQgrAAgfgSgAmAhVIAlhkIAPAAIAHAUQAKAiACA3gAnDi5IBCAAIgbBHg");
	this.shape_16.setTransform(-432.3,-351.3843);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFF33").s().p("AInCxIAAhVIBlgEIhlAEIhYgSIAAgRIAAhiQAaALAZAHIACABIACAAQAfAHAfAAIAAAAIABAAQAyAAAygSIADgBIgDABQgyASgyAAIgBAAIAAAAQgfAAgfgHIgCAAIgCgBQgZgHgagLIAAh0QABAQAfAMIATAGIA9AGQAuAAAggMQAYgJAHgMQgHAMgYAJQggAMguAAIg9gGIgTgGQgfgMgBgQIAFgPIAHgHIAGgDQAKgHAhAAIABAkIACABIABABIAAAAIABABIAAAAIACABQAZARAaAAIAAAAIAAAAQAcAAAcgUIAAAAIABgBIgCgiQAXABAMAHQAOAKgCATIAAB0IAAAMIAAAmIAABAIggAIIAABoIAAACQgWAGgTAAQglAAgXgXgApsAUIAAgnIAIAAIgIgDQgtgSgQgjIgBhmQA2AgAzAAQA0AAAxggQgxAgg0AAQgzAAg2ggIgBgWIDOAAIABAWIABASIAGBwQgYAQgYAMIhfAAIBfAAIAAAnIAAAoQgLABgKAAQgxAAghgpgAJGiEQgaAAgZgRIgCgBIAAAAIgBgBIAAAAIgBgBIgCgBIgBgkIgBgKIByAAIAAAMIACAiIgBABIAAAAQgcAUgcAAIAAAAIAAAAgAJ9i7IAAAAg");
	this.shape_17.setTransform(-439.4066,-349.9667);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#968460").s().p("AgvAtIAAg+IBfAAIhfAAIAAgoIA5gFIgCAEIAoAfIAAAKIAABQg");
	this.shape_18.setTransform(-366.275,-346.525);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#C1BAC1").s().p("AQYDRIAoAAIAAgNIAAANIgoAAIgDAAIAAgSIgChrIAEhoIBKjMIAzAAIAAAIIgTBDIATALIAAAlIgegTIg7CGIBZALIAAAmIhUgIIAAAdIBUAIIAABxIhUgJIBUAJIAAAUgARADEIAAhwgANTCnIAAhoIAfgIIBgARIBBAMIhBgMIAAhQIAAgKIgogeIACgEIALggIABgBIBWBDIhWhDIgBgBIAAAAIgBiKIBnAAIgGDMIgEBoIACBrgAPSBPIAAgHgAIvB7IAAhkIBnAJIAAARIBXASIAABVgAGuB3IgFhwIAFBwIgpgHIgDhtIADBtIjDglIAGhbIgGBbIgBAZIgogJIgogJIAAgRIiTgZIAAhYIBFAGIBOAIIAAgUIAJgoIAHgeIACgJIgEgDIhohDIAAgBIgbgUIBIAAIA4AhIgCghIApAAIgQAuIAQguIAuAAIAAACIAhAUIglBiIgFBYIC6ATQgLg0Ajg1IiohkIghgUIAAgCIA+AAICaBSIAfhSIAmAAIguBzQghA7AKA5IAuAFIAABzgACZBbIgBgvQAAhtAXhDIAihaIgiBaQgXBDAABtIABAvgABxBBIAAhjgACDiFIAQgtIgXgNIAXANgACeisIgLgGgAihAvIABgbIifgYIAAgoQAZgMAXgQIBxAAIgCBcIAChcIABgpIAPgoIAbhHIAmAAIglBkIBHAJIBKAKIBbALIgJAoIhPgMIhEgKIhagNIAACIgAq6gsIAAhfIDSAWIAGARQAQAjAsASIAAADIAAAogAubg+IgHhoIAqAHICRAZIAABkgAwBhSIACiOIArAAIAyAAIAAA6IAHBogAvfifIALhBgAyEhTIgPgDIAAhgIBWAIQABApgBApIgBAKIgeABQgWAAgSgCgACjjgg");
	this.shape_19.setTransform(-459.275,-347.475);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#9AFE70").s().p("AGhB3IAAgtQAchaBBhFIADAEIAHgFIAABzIAABjgAOtBuIA7iGIAeATIAAB+gAEbBnQgJg6Agg6IAuhzIBKAAIgRAVQhSBoADBeIAAASgAA6BPIAFhXIAlhhICpBjQgkA1ALA1gAOPiAIBEAAIhJDLgAiwAvIAAgbIBFAJIABAZgALkAkIAAhyQADgUgOgJQgNgIgWgBIgBgMIB0AAIAACKIAAABIgLAgIg6AFgAmdAXIgGhvIBegTIheATIAAgRIgBgXIBhAAIAnBHIgOApIgBAngAp2gVIjSgWIAAhSIABgDIDVAAIAAAXIACBlgAi5gSQgCg4gKghIgHgVIA7AAIAcAVIAAAAIAHBigAwGg+IAAhCICRAAIAABagAPzg0IAThEIAABOgACBiAIC6AAIggBTg");
	this.shape_20.setTransform(-445.1,-357.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-577.5,-759.2,236.8,801.6);


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


(lib.sprite233 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.shape232("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite233, new cjs.Rectangle(-270,-187.5,540,375), null);


(lib.sprite223 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.shape222("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite223, new cjs.Rectangle(-88,-200,176,400), null);


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
	this.frame_284 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(284).call(this.frame_284).wait(1));

	// 追記追加
	this.instance = new lib.CachedBmp_102();
	this.instance.setTransform(-349.05,242.7,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(285));

	// Layer_14
	this.instance_1 = new lib.text175("synched",0);
	this.instance_1.setTransform(-118.55,191.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(285));

	// Layer_13
	this.instance_2 = new lib.text174("synched",0);
	this.instance_2.setTransform(-225.05,191.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(285));

	// Layer_12
	this.instance_3 = new lib.text173("synched",0);
	this.instance_3.setTransform(-118.55,131.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(285));

	// Layer_11
	this.instance_4 = new lib.text172("synched",0);
	this.instance_4.setTransform(-225.05,131.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(285));

	// Layer_10
	this.instance_5 = new lib.text171("synched",0);
	this.instance_5.setTransform(-118.55,71.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(285));

	// Layer_9
	this.instance_6 = new lib.text170("synched",0);
	this.instance_6.setTransform(-225.05,71.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(285));

	// Layer_8
	this.instance_7 = new lib.text169("synched",0);
	this.instance_7.setTransform(-336.05,182.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(285));

	// Layer_7
	this.instance_8 = new lib.text168("synched",0);
	this.instance_8.setTransform(-335.05,122.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(285));

	// Layer_6
	this.instance_9 = new lib.text167("synched",0);
	this.instance_9.setTransform(-336.05,62.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(285));

	// Layer_5
	this.instance_10 = new lib.text166("synched",0);
	this.instance_10.setTransform(-119.55,29.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(285));

	// Layer_4
	this.instance_11 = new lib.text165("synched",0);
	this.instance_11.setTransform(-231.05,29.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(285));

	// Layer_3
	this.instance_12 = new lib.text164("synched",0);
	this.instance_12.setTransform(-334.8,-26.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(285));

	// Layer_2
	this.instance_13 = new lib.shape163("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(285));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-350.1,-32.1,961.1,332.40000000000003);


(lib.sprite159 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.text158("synched",0);
	this.instance.setTransform(-43.6,-181.3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_1
	this.instance_1 = new lib.shape157("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite159, new cjs.Rectangle(-83.5,-185.2,183.1,321.6), null);


(lib.sprite151 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.text150("synched",0);
	this.instance.setTransform(-72.95,-176.15);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_1
	this.instance_1 = new lib.shape149("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite151, new cjs.Rectangle(-121.6,-180,242,326), null);


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
	this.frame_1049 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(1049).call(this.frame_1049).wait(1));

	// Masked_Layer_12___5
	this.instance = new lib.shape132("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1050));

	// Masked_Layer_9___5
	this.instance_1 = new lib.text131("synched",0);
	this.instance_1.setTransform(-344.7,122.25);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1050));

	// Masked_Layer_8___5
	this.instance_2 = new lib.text130("synched",0);
	this.instance_2.setTransform(-324.75,246.85);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1050));

	// Masked_Layer_7___5
	this.instance_3 = new lib.text129("synched",0);
	this.instance_3.setTransform(-344.7,28.45);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1050));

	// Masked_Layer_6___5
	this.instance_4 = new lib.text128("synched",0);
	this.instance_4.setTransform(-354.7,2.45);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1050));

	// Layer_4
	this.instance_5 = new lib.shape127("synched",0);
	this.instance_5.setTransform(351.25,64.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1050));

	// Layer_3
	this.instance_6 = new lib.shape125("synched",0);
	this.instance_6.setTransform(213.25,327.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1050));

	// Layer_2
	this.instance_7 = new lib.shape123("synched",0);
	this.instance_7.setTransform(380.25,188.3,0.864,1);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1050));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-358.6,-0.9,830.2,375.29999999999995);


(lib.sprite122 = function(mode,startPosition,loop,reversed) {
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
	this.frame_639 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(639).call(this.frame_639).wait(1));

	// Masked_Layer_13___5
	this.instance = new lib.shape114("synched",0);
	this.instance.setTransform(-127.1,6.95);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(640));

	// Masked_Layer_9___5
	this.instance_1 = new lib.text113("synched",0);
	this.instance_1.setTransform(-468.3,122.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(640));

	// Masked_Layer_8___5
	this.instance_2 = new lib.text112("synched",0);
	this.instance_2.setTransform(-468.3,54.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(640));

	// Masked_Layer_7___5
	this.instance_3 = new lib.text111("synched",0);
	this.instance_3.setTransform(-468.3,172.45);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(640));

	// Masked_Layer_6___5
	this.instance_4 = new lib.text110("synched",0);
	this.instance_4.setTransform(-468.3,8.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(640));

	// Layer_14
	this.instance_5 = new lib.shape121("synched",0);
	this.instance_5.setTransform(97.3,241,0.1,0.1);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(284).to({_off:false},0).to({scaleX:1.0078,scaleY:1.0078,x:253.35,y:198.8,alpha:0.9492},19).wait(1).to({scaleX:1.0556,scaleY:1.0555,x:261.55,y:196.5,alpha:1},0).wait(336));

	// Layer_13
	this.instance_6 = new lib.text120("synched",0);
	this.instance_6.setTransform(93.05,255.45,0.1,0.1);
	this.instance_6.alpha = 0;
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(284).to({_off:false},0).to({scaleX:1.0078,scaleY:1.0078,x:201.45,y:335.35,alpha:0.9492},19).wait(1).to({scaleX:1.0556,scaleY:1.0555,x:207.15,y:339.45,alpha:1},0).wait(336));

	// Layer_12
	this.instance_7 = new lib.shape119("synched",0);
	this.instance_7.setTransform(97.3,241,0.1,0.1);
	this.instance_7.alpha = 0;
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(284).to({_off:false},0).to({scaleX:1.0078,scaleY:1.0078,x:253.35,y:198.8,alpha:0.9492},19).wait(1).to({scaleX:1.0556,scaleY:1.0555,x:261.55,y:196.5,alpha:1},0).wait(336));

	// Layer_9
	this.instance_8 = new lib.text117("synched",0);
	this.instance_8.setTransform(68.05,77.15,0.1,0.1);
	this.instance_8.alpha = 0;
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(126).to({_off:false},0).to({scaleX:1.0078,scaleY:1.0078,x:155.8,y:77.65,alpha:0.9492},19).wait(1).to({scaleX:1.0556,scaleY:1.0555,x:160.4,y:77.7,alpha:1},0).to({_off:true},158).wait(336));

	// Layer_8
	this.instance_9 = new lib.shape116("synched",0);
	this.instance_9.setTransform(75.8,87.5,0.1,0.1);
	this.instance_9.alpha = 0;
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(126).to({_off:false},0).to({scaleX:1.0078,scaleY:1.0078,x:252.25,y:191.05,alpha:0.9492},19).wait(1).to({scaleX:1.0556,scaleY:1.0555,x:261.55,y:196.5,alpha:1},0).to({_off:true},158).wait(336));

	// Layer_5
	this.instance_10 = new lib.shape13("synched",0);
	this.instance_10.setTransform(84.5,82.8,0.25,0.25);
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(104).to({_off:false},0).to({_off:true},4).wait(4).to({_off:false},0).to({_off:true},4).wait(4).to({_off:false},0).to({_off:true},4).wait(516));

	// Layer_4
	this.instance_11 = new lib.shape2("synched",0);
	this.instance_11.setTransform(443.5,363,0.6956,0.473);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).to({_off:true},146).wait(494));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-476.7,3.4,991.5999999999999,404.3);


(lib.sprite17 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.shape16("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite17, new cjs.Rectangle(-3.5,-3.3,7,6.699999999999999), null);


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


(lib.sprite283 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.sprite17();
	this.instance.setTransform(-52.25,-60.05,1.6919,1.6919,112.7927);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_3
	this.instance_1 = new lib.shape282("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite283, new cjs.Rectangle(-130,-186.5,260,373), null);


(lib.sprite280 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.shape279("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_3
	this.instance_1 = new lib.sprite17();
	this.instance_1.setTransform(-70.6,-21.15,1.6919,1.6919,112.7927);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_2
	this.instance_2 = new lib.shape277("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite280, new cjs.Rectangle(-114.5,-179,229,358), null);


(lib.sprite276 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.sprite17();
	this.instance.setTransform(-100.6,-33.15,1.6919,1.6919,112.7927);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_3
	this.instance_1 = new lib.shape272("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite276, new cjs.Rectangle(-250,-187.5,500,375), null);


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

	// timeline functions:
	this.frame_0 = function() {
		/* stopAllSounds ();
		*/
	}
	this.frame_849 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(849).call(this.frame_849).wait(1));

	// Masked_Layer_56___46
	this.instance = new lib.shape267("synched",0);
	this.instance.setTransform(-134.95,0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(850));

	// Masked_Layer_51___46
	this.instance_1 = new lib.text266("synched",0);
	this.instance_1.setTransform(-461.05,146.05);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(850));

	// Masked_Layer_50___46
	this.instance_2 = new lib.text265("synched",0);
	this.instance_2.setTransform(-461.05,89.35);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(850));

	// Masked_Layer_49___46
	this.instance_3 = new lib.text264("synched",0);
	this.instance_3.setTransform(-461.05,39.35);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(850));

	// Masked_Layer_48___46
	this.instance_4 = new lib.text263("synched",0);
	this.instance_4.setTransform(-461.05,196.05);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(850));

	// Masked_Layer_47___46
	this.instance_5 = new lib.text262("synched",0);
	this.instance_5.setTransform(-461.05,2.65);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(850));

	// Layer_44
	this.instance_6 = new lib.sprite17();
	this.instance_6.setTransform(201.35,320.15,1.3551,1.3551,119.9934);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(850));

	// Layer_43
	this.instance_7 = new lib.shape261("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(850));

	// Layer_42
	this.instance_8 = new lib.text260("synched",0);
	this.instance_8.setTransform(90.85,123.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(850));

	// Layer_41
	this.instance_9 = new lib.shape259("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(850));

	// Layer_40
	this.instance_10 = new lib.text258("synched",0);
	this.instance_10.setTransform(109.45,271.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(850));

	// Layer_39
	this.instance_11 = new lib.shape257("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(850));

	// Layer_38
	this.instance_12 = new lib.text256("synched",0);
	this.instance_12.setTransform(298.35,155.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(850));

	// Layer_37
	this.instance_13 = new lib.shape255("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(850));

	// Layer_35
	this.instance_14 = new lib.sprite17();
	this.instance_14.setTransform(242.9,69.65,1.3551,1.3551,-135.0114);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(850));

	// Layer_34
	this.instance_15 = new lib.shape254("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(850));

	// Layer_33
	this.instance_16 = new lib.text253("synched",0);
	this.instance_16.setTransform(278.1,39.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(850));

	// Layer_32
	this.instance_17 = new lib.shape252("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(850));

	// Layer_30
	this.instance_18 = new lib.sprite17();
	this.instance_18.setTransform(220.2,50.05,1.3551,1.3551,-135.0114);

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(850));

	// Layer_29
	this.instance_19 = new lib.shape251("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(850));

	// Layer_28
	this.instance_20 = new lib.text250("synched",0);
	this.instance_20.setTransform(229.4,10.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(850));

	// Layer_27
	this.instance_21 = new lib.shape249("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(850));

	// Layer_25
	this.instance_22 = new lib.sprite17();
	this.instance_22.setTransform(253.3,138.05,1.3551,1.3551,-60.0066);

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(850));

	// Layer_24
	this.instance_23 = new lib.shape248("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(850));

	// Layer_22
	this.instance_24 = new lib.sprite17();
	this.instance_24.setTransform(199.95,90.3,1.3551,1.3551,44.9932);

	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(850));

	// Layer_21
	this.instance_25 = new lib.shape247("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(850));

	// Layer_19
	this.instance_26 = new lib.sprite17();
	this.instance_26.setTransform(263.7,362.45,1.3551,1.3551,-0.0116);

	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(850));

	// Layer_18
	this.instance_27 = new lib.shape246("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_27).wait(850));

	// Layer_16
	this.instance_28 = new lib.sprite17();
	this.instance_28.setTransform(263.7,339.3,1.3551,1.3551,179.9877);

	this.timeline.addTween(cjs.Tween.get(this.instance_28).wait(850));

	// Layer_15
	this.instance_29 = new lib.shape245("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_29).wait(850));

	// Layer_13
	this.instance_30 = new lib.sprite17();
	this.instance_30.setTransform(180.2,66.45,1.3551,1.3551,-0.0116);

	this.timeline.addTween(cjs.Tween.get(this.instance_30).wait(850));

	// Layer_12
	this.instance_31 = new lib.shape244("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_31).wait(850));

	// Layer_10
	this.instance_32 = new lib.sprite17();
	this.instance_32.setTransform(180.2,43.3,1.3551,1.3551,179.9877);

	this.timeline.addTween(cjs.Tween.get(this.instance_32).wait(850));

	// Layer_9
	this.instance_33 = new lib.shape243("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_33).wait(850));

	// Layer_8
	this.instance_34 = new lib.text242("synched",0);
	this.instance_34.setTransform(304.75,344.25);

	this.timeline.addTween(cjs.Tween.get(this.instance_34).wait(850));

	// Layer_7
	this.instance_35 = new lib.text241("synched",0);
	this.instance_35.setTransform(290.9,293.15);

	this.timeline.addTween(cjs.Tween.get(this.instance_35).wait(850));

	// Layer_6
	this.instance_36 = new lib.shape240("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_36).wait(850));

	// Layer_5
	this.instance_37 = new lib.text239("synched",0);
	this.instance_37.setTransform(298.25,89.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_37).wait(850));

	// Layer_4
	this.instance_38 = new lib.shape238("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_38).wait(850));

	// Layer_3
	this.instance_39 = new lib.text237("synched",0);
	this.instance_39.setTransform(57.5,47.65);

	this.timeline.addTween(cjs.Tween.get(this.instance_39).wait(850));

	// Layer_2
	this.instance_40 = new lib.shape236("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_40).wait(850));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-470.9,-0.7,929.2,386.09999999999997);


(lib.sprite234 = function(mode,startPosition,loop,reversed) {
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
	this.frame_864 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(864).call(this.frame_864).wait(1));

	// Masked_Layer_14___3
	this.instance = new lib.text230("synched",0);
	this.instance.setTransform(-433.8,155.6);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(865));

	// Masked_Layer_13___3
	this.instance_1 = new lib.text229("synched",0);
	this.instance_1.setTransform(-433.8,102.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(865));

	// Masked_Layer_12___3
	this.instance_2 = new lib.text228("synched",0);
	this.instance_2.setTransform(-433.8,55.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(865));

	// Masked_Layer_11___3
	this.instance_3 = new lib.text227("synched",0);
	this.instance_3.setTransform(-433.8,29.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(865));

	// Masked_Layer_10___3
	this.instance_4 = new lib.text226("synched",0);
	this.instance_4.setTransform(-433.8,182.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(865));

	// Masked_Layer_9___3
	this.instance_5 = new lib.shape225("synched",0);
	this.instance_5.setTransform(-133,0);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(865));

	// Masked_Layer_4___3
	this.instance_6 = new lib.text224("synched",0);
	this.instance_6.setTransform(-433.8,2.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(865));

	// Layer_3
	this.instance_7 = new lib.shape13("synched",0);
	this.instance_7.setTransform(154.6,230.95,0.5111,0.5111);

	this.instance_8 = new lib.sprite233();
	this.instance_8.setTransform(154.8,233.7,0.0987,0.0987);
	this.instance_8.alpha = 0;
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_7}]},574).to({state:[]},5).to({state:[{t:this.instance_7}]},5).to({state:[]},5).to({state:[{t:this.instance_8}]},5).to({state:[{t:this.instance_8}]},19).to({state:[{t:this.instance_8}]},1).wait(251));
	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(594).to({_off:false},0).to({scaleX:0.7966,scaleY:0.8916,x:259.3,y:175.2,alpha:0.9492},19).wait(1).to({scaleX:0.8333,scaleY:0.9333,x:264.8,y:172.1,alpha:1},0).wait(251));

	// Layer_1
	this.instance_9 = new lib.sprite223();
	this.instance_9.setTransform(269,182.4,1,1,89.9939);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).to({_off:true},614).wait(251));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-445.4,-2.9,935.2,350);


(lib.sprite219 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_11
	this.instance = new lib.text46("synched",0);
	this.instance.setTransform(-82.05,-163.05);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_10
	this.instance_1 = new lib.shape45("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_8
	this.instance_2 = new lib.sprite17();
	this.instance_2.setTransform(57.25,-147.5,1.3551,1.3551,104.9906);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	// Layer_7
	this.instance_3 = new lib.shape218("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

	// Layer_6
	this.instance_4 = new lib.text42("synched",0);
	this.instance_4.setTransform(-168.85,152.55);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

	// Layer_5
	this.instance_5 = new lib.shape41("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1));

	// Layer_3
	this.instance_6 = new lib.sprite17();
	this.instance_6.setTransform(-65.7,18.85,1.3551,1.3551,-0.009);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1));

	// Layer_2
	this.instance_7 = new lib.shape38("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1));

	// Layer_1
	this.instance_8 = new lib.shape37("synched",0);
	this.instance_8.setTransform(-20,2,1.2565,1.1003);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite219, new cjs.Rectangle(-226.8,-195.4,413.70000000000005,394.9), null);


(lib.sprite161 = function(mode,startPosition,loop,reversed) {
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
	this.frame_409 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(409).call(this.frame_409).wait(1));

	// Masked_Layer_14___10
	this.instance = new lib.shape152("synched",0);
	this.instance.setTransform(189.2,200.65,0.2404,0.2398);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(410));

	// Masked_Layer_13___10
	this.instance_1 = new lib.text154("synched",0);
	this.instance_1.setTransform(-506,38.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(410));

	// Masked_Layer_12___10
	this.instance_2 = new lib.text153("synched",0);
	this.instance_2.setTransform(-486.05,3.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(410));

	// Masked_Layer_11___10
	this.instance_3 = new lib.shape152("synched",0);
	this.instance_3.setTransform(189.2,235.35,0.2404,0.2398);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(410));

	// Layer_9
	this.instance_4 = new lib.shape160("synched",0);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(89).to({_off:false},0).to({_off:true},5).wait(5).to({_off:false},0).to({_off:true},5).wait(5).to({_off:false},0).wait(301));

	// Layer_5
	this.instance_5 = new lib.sprite159();
	this.instance_5.setTransform(115.55,230.45,0.5603,0.5603);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(65).to({_off:false},0).to({scaleX:0.978,scaleY:0.978,x:349.25,y:198.2,alpha:0.9492},19).wait(1).to({scaleX:1,scaleY:1,x:361.5,y:196.5,alpha:1},0).wait(325));

	// Layer_4
	this.instance_6 = new lib.shape155("synched",0);
	this.instance_6.setTransform(131.8,250.5,0.6376,0.6572);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(44).to({_off:false},0).to({_off:true},5).wait(5).to({_off:false},0).to({_off:true},5).wait(4).to({_off:false},0).wait(347));

	// Layer_1
	this.instance_7 = new lib.sprite151();
	this.instance_7.setTransform(140.5,192);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(410));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-498.6,0.1,959.7,340.5);


(lib.sprite47 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_16
	this.instance = new lib.text46("synched",0);
	this.instance.setTransform(-82.45,-163.25);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_15
	this.instance_1 = new lib.shape45("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_14
	this.instance_2 = new lib.text44("synched",0);
	this.instance_2.setTransform(68.45,75.65);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	// Layer_13
	this.instance_3 = new lib.shape43("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

	// Layer_12
	this.instance_4 = new lib.text42("synched",0);
	this.instance_4.setTransform(-169.05,152.55);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

	// Layer_11
	this.instance_5 = new lib.shape41("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1));

	// Layer_9
	this.instance_6 = new lib.sprite17();
	this.instance_6.setTransform(135.45,-43.45,1.3551,1.3551,-0.009);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1));

	// Layer_8
	this.instance_7 = new lib.shape40("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1));

	// Layer_6
	this.instance_8 = new lib.sprite17();
	this.instance_8.setTransform(57.25,-147.5,1.3551,1.3551,104.9906);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1));

	// Layer_5
	this.instance_9 = new lib.shape39("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1));

	// Layer_3
	this.instance_10 = new lib.sprite17();
	this.instance_10.setTransform(-65.7,17.85,1.3551,1.3551,-0.009);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1));

	// Layer_2
	this.instance_11 = new lib.shape38("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(1));

	// Layer_1
	this.instance_12 = new lib.shape37("synched",0);
	this.instance_12.setTransform(-20,2,1.2565,1.1003);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite47, new cjs.Rectangle(-226.8,-195.4,413.70000000000005,394.9), null);


(lib.sprite284 = function(mode,startPosition,loop,reversed) {
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
	this.frame_539 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(539).call(this.frame_539).wait(1));

	// Masked_Layer_24___20
	this.instance = new lib.shape275("synched",0);
	this.instance.setTransform(-159.6,0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(540));

	// Masked_Layer_22___20
	this.instance_1 = new lib.text274("synched",0);
	this.instance_1.setTransform(-500,49.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(540));

	// Masked_Layer_21___20
	this.instance_2 = new lib.text273("synched",0);
	this.instance_2.setTransform(-500,2.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(540));

	// Mask_Layer_1 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EgkKAeZMAAAg8xMBIVAAAMAAAA8xg");
	mask.setTransform(231.4998,194.4);

	// Masked_Layer_14___1
	this.instance_3 = new lib.sprite283();
	this.instance_3.setTransform(232.55,189.85);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	var maskedShapeInstanceList = [this.instance_3];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(134).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(386));

	// Masked_Layer_7___1
	this.instance_4 = new lib.sprite280();
	this.instance_4.setTransform(217,182);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	var maskedShapeInstanceList = [this.instance_4];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(25).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(89).to({alpha:0.0508},19).wait(1).to({alpha:0},0).wait(386));

	// Masked_Layer_5___1
	this.instance_5 = new lib.sprite17();
	this.instance_5.setTransform(130.8,150.35,1.6919,1.6919,112.7927);

	var maskedShapeInstanceList = [this.instance_5];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({_off:true},25).wait(515));

	// Masked_Layer_4___1
	this.instance_6 = new lib.shape272("synched",0);
	this.instance_6.setTransform(231.4,183.5);

	var maskedShapeInstanceList = [this.instance_6];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_6).to({_off:true},25).wait(515));

	// Masked_Layer_2___1
	this.instance_7 = new lib.sprite276();
	this.instance_7.setTransform(231.4,183.5);
	this.instance_7._off = true;

	var maskedShapeInstanceList = [this.instance_7];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(25).to({_off:false},0).to({alpha:0.9414},5).to({alpha:0.75},5).to({alpha:0.5117},4).to({alpha:0},6).to({_off:true},1).wait(494));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-509.3,-0.6,972.3,377);


(lib.sprite220 = function(mode,startPosition,loop,reversed) {
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
	this.frame_584 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(584).call(this.frame_584).wait(1));

	// Masked_Layer_53___45
	this.instance = new lib.shape203("synched",0);
	this.instance.setTransform(-372.8,10.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(585));

	// Masked_Layer_50___45
	this.instance_1 = new lib.text202("synched",0);
	this.instance_1.setTransform(-3231.6,-439.45,4.1654,4.1654);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(585));

	// Masked_Layer_49___45
	this.instance_2 = new lib.text201("synched",0);
	this.instance_2.setTransform(-3231.6,-632.8,4.1654,4.1654);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(585));

	// Masked_Layer_48___45
	this.instance_3 = new lib.text200("synched",0);
	this.instance_3.setTransform(-3231.6,-171.25,4.1654,4.1654);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(585));

	// Masked_Layer_47___45
	this.instance_4 = new lib.shape152("synched",0);
	this.instance_4.setTransform(-372.8,10.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(585));

	// Masked_Layer_46___45
	this.instance_5 = new lib.text199("synched",0);
	this.instance_5.setTransform(-3231.6,-811.85,4.1654,4.1654);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(585));

	// Layer_44
	this.instance_6 = new lib.shape198("synched",0);
	this.instance_6.setTransform(-870.45,-396.4,4.1798,4.1798);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).to({_off:true},439).wait(146));

	// Layer_42
	this.instance_7 = new lib.sprite17();
	this.instance_7.setTransform(-906.8,334,8.5233,8.5233,96.3802);
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(284).to({_off:false},0).to({_off:true},155).wait(146));

	// Layer_41
	this.instance_8 = new lib.shape217("synched",0);
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(284).to({_off:false},0).to({_off:true},155).wait(146));

	// Layer_40
	this.instance_9 = new lib.text216("synched",0);
	this.instance_9.setTransform(-1407.85,273.45,4.2001,4.2001);
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(284).to({_off:false},0).to({_off:true},155).wait(146));

	// Layer_39
	this.instance_10 = new lib.shape215("synched",0);
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(284).to({_off:false},0).to({_off:true},155).wait(146));

	// Layer_38
	this.instance_11 = new lib.text214("synched",0);
	this.instance_11.setTransform(-1051.25,567.15,4.2001,4.2001);
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(284).to({_off:false},0).to({_off:true},155).wait(146));

	// Layer_37
	this.instance_12 = new lib.shape213("synched",0);
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(284).to({_off:false},0).to({_off:true},155).wait(146));

	// Layer_35
	this.instance_13 = new lib.sprite17();
	this.instance_13.setTransform(-882.15,459.3,8.5232,8.5231,21.3803);
	this.instance_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(284).to({_off:false},0).to({_off:true},155).wait(146));

	// Layer_34
	this.instance_14 = new lib.shape212("synched",0);

	this.instance_15 = new lib.sprite219();
	this.instance_15.setTransform(-356.75,-64.35,4.1973,4.1973);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_14}]},284).to({state:[{t:this.instance_15}]},155).wait(146));

	// Layer_33
	this.instance_16 = new lib.text210("synched",0);
	this.instance_16.setTransform(-74.4,603.3,4.2001,4.2001);
	this.instance_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(168).to({_off:false},0).wait(417));

	// Layer_32
	this.instance_17 = new lib.shape209("synched",0);
	this.instance_17._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(168).to({_off:false},0).wait(417));

	// Layer_30
	this.instance_18 = new lib.sprite17();
	this.instance_18.setTransform(-176.3,643.55,8.5233,8.5234,-98.6196);
	this.instance_18._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(168).to({_off:false},0).wait(417));

	// Layer_29
	this.instance_19 = new lib.shape208("synched",0);
	this.instance_19._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(168).to({_off:false},0).wait(417));

	// Layer_28
	this.instance_20 = new lib.text207("synched",0);
	this.instance_20.setTransform(-647.4,45,4.2001,4.2001);
	this.instance_20._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(168).to({_off:false},0).wait(417));

	// Layer_27
	this.instance_21 = new lib.shape206("synched",0);
	this.instance_21._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(168).to({_off:false},0).wait(417));

	// Layer_25
	this.instance_22 = new lib.sprite17();
	this.instance_22.setTransform(-506.8,215.75,8.5368,8.5368,119.9925);
	this.instance_22._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(168).to({_off:false},0).wait(417));

	// Layer_24
	this.instance_23 = new lib.shape205("synched",0);
	this.instance_23._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(168).to({_off:false},0).wait(417));

	// Layer_23
	this.instance_24 = new lib.shape13("synched",0);
	this.instance_24.setTransform(-459.55,489.85);

	this.instance_25 = new lib.shape211("synched",0);
	this.instance_25.setTransform(-462.4,478.05,0.5,0.5);
	this.instance_25.alpha = 0.4492;
	this.instance_25._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_24}]},224).to({state:[]},5).to({state:[{t:this.instance_24}]},5).to({state:[]},5).to({state:[{t:this.instance_24}]},5).to({state:[]},5).to({state:[{t:this.instance_24}]},5).to({state:[{t:this.instance_25}]},1).to({state:[{t:this.instance_25}]},28).to({state:[{t:this.instance_25}]},1).wait(301));
	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(255).to({_off:false},0).to({scaleX:2.2379,scaleY:2.2379,x:-885.35,y:339.5,alpha:0.9805},28).wait(1).to({scaleX:2.3,scaleY:2.3,x:-900.3,y:334.55,alpha:1},0).wait(301));

	// Layer_22
	this.instance_26 = new lib.shape204("synched",0);
	this.instance_26.setTransform(52.75,-458.1,0.5,0.5);
	this.instance_26.alpha = 0.4492;
	this.instance_26._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(138).to({_off:false},0).to({scaleX:2.24,scaleY:2.24,x:-348.05,y:445.05,alpha:0.9805},29).wait(1).to({scaleX:2.3,scaleY:2.3,x:-361.85,y:476.2,alpha:1},0).wait(417));

	// Layer_21
	this.instance_27 = new lib.shape13("synched",0);
	this.instance_27.setTransform(44,-453.9);
	this.instance_27._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_27).wait(109).to({_off:false},0).to({_off:true},5).wait(5).to({_off:false},0).to({_off:true},5).wait(5).to({_off:false},0).to({_off:true},5).wait(451));

	// Layer_19
	this.instance_28 = new lib.sprite17();
	this.instance_28.setTransform(37.95,-284.4,8.5369,8.5368,-120.0075);

	this.timeline.addTween(cjs.Tween.get(this.instance_28).to({_off:true},439).wait(146));

	// Layer_18
	this.instance_29 = new lib.shape196("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_29).to({_off:true},439).wait(146));

	// Layer_17
	this.instance_30 = new lib.text195("synched",0);
	this.instance_30.setTransform(177.6,-527.85,4.2001,4.2001);

	this.timeline.addTween(cjs.Tween.get(this.instance_30).to({_off:true},439).wait(146));

	// Layer_16
	this.instance_31 = new lib.shape194("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_31).to({_off:true},439).wait(146));

	// Layer_15
	this.instance_32 = new lib.shape193("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_32).wait(585));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3248,-884.4,3839.7,1658.1);


(lib.sprite63 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {"1":0,"2":260,"3":926};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		/* stopAllSounds ();
		*/
	}
	this.frame_1029 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1029).call(this.frame_1029).wait(1));

	// Masked_Layer_41___32
	this.instance = new lib.shape10("synched",0);
	this.instance.setTransform(-153.6,7.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1030));

	// Masked_Layer_37___32
	this.instance_1 = new lib.text9("synched",0);
	this.instance_1.setTransform(-495,194.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1030));

	// Masked_Layer_36___32
	this.instance_2 = new lib.text8("synched",0);
	this.instance_2.setTransform(-495,102.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1030));

	// Masked_Layer_35___32
	this.instance_3 = new lib.text7("synched",0);
	this.instance_3.setTransform(-495,54.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1030));

	// Masked_Layer_34___32
	this.instance_4 = new lib.text6("synched",0);
	this.instance_4.setTransform(-495,256.55);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1030));

	// Masked_Layer_33___32
	this.instance_5 = new lib.text4("synched",0);
	this.instance_5.setTransform(-506,8.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1030));

	// Mask_Layer_1 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EgkZAetMAAAg9ZMBIzAAAMAAAA9Zg");
	mask.setTransform(232.2484,189.2902);

	// Masked_Layer_27___1
	this.instance_6 = new lib.sprite17();
	this.instance_6.setTransform(283.5,95.8,0.1694,0.1694,74.9998);
	this.instance_6.alpha = 0;
	this.instance_6._off = true;

	var maskedShapeInstanceList = [this.instance_6];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(274).to({_off:false},0).to({scaleX:1.582,scaleY:1.5824,rotation:75.0054,x:259.25,y:112.65,alpha:0.9492},19).wait(1).to({scaleX:1.6563,scaleY:1.6568,rotation:75.0049,x:258,y:113.55,alpha:1},0).wait(110).to({alpha:0},20).to({_off:true},1).wait(605));

	// Masked_Layer_26___1
	this.instance_7 = new lib.shape19("synched",0);
	this.instance_7.setTransform(281.85,103.5,0.1,0.1);
	this.instance_7.alpha = 0;
	this.instance_7._off = true;

	var maskedShapeInstanceList = [this.instance_7];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(274).to({_off:false},0).to({scaleX:0.9342,scaleY:0.9339,x:243.6,y:184.8,alpha:0.9492},19).wait(1).to({scaleX:0.9781,scaleY:0.9778,x:241.6,y:189.1,alpha:1},0).to({startPosition:0},110).to({alpha:0},20).to({_off:true},1).wait(605));

	// Masked_Layer_24___1
	this.instance_8 = new lib.sprite17();
	this.instance_8.setTransform(269.5,116.25,0.1694,0.1694,74.9998);
	this.instance_8.alpha = 0;
	this.instance_8._off = true;

	var maskedShapeInstanceList = [this.instance_8];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(274).to({_off:false},0).to({scaleX:1.582,scaleY:1.5824,rotation:75.0054,x:128.2,y:303.95,alpha:0.9492},19).wait(1).to({scaleX:1.6563,scaleY:1.6568,rotation:75.0049,x:120.75,y:313.85,alpha:1},0).wait(110).to({alpha:0},20).to({_off:true},1).wait(605));

	// Masked_Layer_23___1
	this.instance_9 = new lib.shape18("synched",0);
	this.instance_9.setTransform(281.85,103.5,0.1,0.1);
	this.instance_9.alpha = 0;
	this.instance_9._off = true;

	var maskedShapeInstanceList = [this.instance_9];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(274).to({_off:false},0).to({scaleX:0.9342,scaleY:0.9339,x:243.6,y:184.8,alpha:0.9492},19).wait(1).to({scaleX:0.9781,scaleY:0.9778,x:241.6,y:189.1,alpha:1},0).to({startPosition:0},110).to({alpha:0},20).to({_off:true},1).wait(605));

	// Masked_Layer_21___1
	this.instance_10 = new lib.sprite17();
	this.instance_10.setTransform(267.2,92.9,0.1694,0.1694,-59.9977);
	this.instance_10.alpha = 0;
	this.instance_10._off = true;

	var maskedShapeInstanceList = [this.instance_10];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(274).to({_off:false},0).to({scaleX:1.5821,scaleY:1.5823,rotation:-60.008,x:106.6,y:85.75,alpha:0.9492},19).wait(1).to({scaleX:1.6564,scaleY:1.6567,rotation:-60.0076,x:98.15,y:85.4,alpha:1},0).wait(110).to({alpha:0},20).to({_off:true},1).wait(605));

	// Masked_Layer_20___1
	this.instance_11 = new lib.shape15("synched",0);
	this.instance_11.setTransform(281.85,103.5,0.1,0.1);
	this.instance_11.alpha = 0;
	this.instance_11._off = true;

	this.instance_12 = new lib.text55("synched",0);
	this.instance_12.setTransform(317.3,152.95,0.1014,0.1014);
	this.instance_12.alpha = 0;
	this.instance_12._off = true;

	var maskedShapeInstanceList = [this.instance_11,this.instance_12];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(274).to({_off:false},0).to({scaleX:0.9342,scaleY:0.9339,x:243.6,y:184.8,alpha:0.9492},19).wait(1).to({scaleX:0.9781,scaleY:0.9778,x:241.6,y:189.1,alpha:1},0).to({startPosition:0},110).to({alpha:0},20).to({_off:true},1).wait(605));
	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(950).to({_off:false},0).to({scaleX:1.0071,scaleY:1.0071,x:128.1,y:303.25,alpha:0.9492},19).wait(1).to({scaleX:1.0547,scaleY:1.0547,x:118.1,y:311.2,alpha:1},0).wait(31).to({startPosition:0},0).to({alpha:0.0508},19).wait(1).to({alpha:0},0).wait(9));

	// Masked_Layer_19___1
	this.instance_13 = new lib.shape28("synched",0);
	this.instance_13.setTransform(261.5,196.5,1.0132,1.0132);
	this.instance_13.alpha = 0;
	this.instance_13._off = true;

	this.instance_14 = new lib.shape54("synched",0);
	this.instance_14.setTransform(331.4,142.15,0.1,0.1);
	this.instance_14.alpha = 0;
	this.instance_14._off = true;

	var maskedShapeInstanceList = [this.instance_13,this.instance_14];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(561).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(143).to({startPosition:0},0).to({alpha:0},20).to({_off:true},1).wait(285));
	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(950).to({_off:false},0).to({scaleX:0.993,scaleY:0.993,x:268.2,y:195.75,alpha:0.9492},19).wait(1).to({scaleX:1.04,scaleY:1.04,x:264.85,y:198.6,alpha:1},0).wait(31).to({startPosition:0},0).to({alpha:0.0508},19).wait(1).to({alpha:0},0).wait(9));

	// Masked_Layer_17___1
	this.instance_15 = new lib.sprite17();
	this.instance_15.setTransform(321.85,148.05,0.1718,0.1718,15.0016);
	this.instance_15.alpha = 0;
	this.instance_15._off = true;

	var maskedShapeInstanceList = [this.instance_15];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(950).to({_off:false},0).to({scaleX:1.706,scaleY:1.706,rotation:15.0008,x:173.35,y:254.3,alpha:0.9492},19).wait(1).to({scaleX:1.7867,scaleY:1.7867,rotation:15.0005,x:165.55,y:259.9,alpha:1},0).wait(31).to({alpha:0.0508},19).wait(1).to({alpha:0},0).wait(9));

	// Masked_Layer_16___1
	this.instance_16 = new lib.sprite17();
	this.instance_16.setTransform(60.45,189.65,1.685,1.685,0,136.8909,133.1106);
	this.instance_16.alpha = 0;
	this.instance_16._off = true;

	this.instance_17 = new lib.shape53("synched",0);
	this.instance_17.setTransform(331.4,142.15,0.1,0.1);
	this.instance_17.alpha = 0;
	this.instance_17._off = true;

	var maskedShapeInstanceList = [this.instance_16,this.instance_17];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(404).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(137).to({alpha:0},20).to({_off:true},1).wait(448));
	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(950).to({_off:false},0).to({scaleX:0.993,scaleY:0.993,x:268.2,y:195.75,alpha:0.9492},19).wait(1).to({scaleX:1.04,scaleY:1.04,x:264.85,y:198.6,alpha:1},0).wait(31).to({startPosition:0},0).to({alpha:0.0508},19).wait(1).to({alpha:0},0).wait(9));

	// Masked_Layer_15___1
	this.instance_18 = new lib.shape26("synched",0);
	this.instance_18.setTransform(245.2,196.45,0.9614,1.027);
	this.instance_18.alpha = 0;
	this.instance_18._off = true;

	var maskedShapeInstanceList = [this.instance_18];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(404).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(137).to({startPosition:0},0).to({alpha:0},20).to({_off:true},1).wait(448));

	// Masked_Layer_14___1
	this.instance_19 = new lib.sprite47();
	this.instance_19.setTransform(251.2,190.65);
	this.instance_19.alpha = 0;
	this.instance_19._off = true;

	var maskedShapeInstanceList = [this.instance_19];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(841).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(43).to({alpha:0},20).to({_off:true},1).wait(105));

	// Masked_Layer_13___1
	this.instance_20 = new lib.sprite17();
	this.instance_20.setTransform(289.95,97.45,1.685,1.685,0,136.8909,133.1106);
	this.instance_20.alpha = 0;
	this.instance_20._off = true;

	this.instance_21 = new lib.text35("synched",0);
	this.instance_21.setTransform(306.1,327.5,1.0272,1.0269);
	this.instance_21.alpha = 0;
	this.instance_21._off = true;

	var maskedShapeInstanceList = [this.instance_20,this.instance_21];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(404).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(137).to({alpha:0},20).to({_off:true},1).wait(448));
	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(724).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(97).to({startPosition:0},0).to({alpha:0},20).to({_off:true},1).wait(168));

	// Masked_Layer_12___1
	this.instance_22 = new lib.shape25("synched",0);
	this.instance_22.setTransform(245.2,196.45,0.9614,1.027);
	this.instance_22.alpha = 0;
	this.instance_22._off = true;

	this.instance_23 = new lib.shape34("synched",0);
	this.instance_23.setTransform(261.4,196.5,1.0272,1.0269);
	this.instance_23.alpha = 0;
	this.instance_23._off = true;

	this.instance_24 = new lib.sprite17();
	this.instance_24.setTransform(191.95,63.8,1.7167,1.717,-104.9977);
	this.instance_24.alpha = 0;
	this.instance_24._off = true;

	var maskedShapeInstanceList = [this.instance_22,this.instance_23,this.instance_24];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(404).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(137).to({startPosition:0},0).to({alpha:0},20).to({_off:true},1).wait(448));
	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(724).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(97).to({startPosition:0},0).to({alpha:0},20).to({_off:true},1).wait(168));
	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(1001).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(9));

	// Masked_Layer_11___1
	this.instance_25 = new lib.text24("synched",0);
	this.instance_25.setTransform(42.85,25.65,0.9614,1.027);
	this.instance_25.alpha = 0;
	this.instance_25._off = true;

	this.instance_26 = new lib.text33("synched",0);
	this.instance_26.setTransform(298.45,125.05,1.0272,1.0269);
	this.instance_26.alpha = 0;
	this.instance_26._off = true;

	this.instance_27 = new lib.shape62("synched",0);
	this.instance_27.setTransform(261.6,196.5,1.0136,1.0134);
	this.instance_27.alpha = 0;
	this.instance_27._off = true;

	var maskedShapeInstanceList = [this.instance_25,this.instance_26,this.instance_27];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(404).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(137).to({startPosition:0},0).to({alpha:0},20).to({_off:true},1).wait(448));
	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(724).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(97).to({startPosition:0},0).to({alpha:0},20).to({_off:true},1).wait(168));
	this.timeline.addTween(cjs.Tween.get(this.instance_27).wait(1001).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(9));

	// Masked_Layer_10___1
	this.instance_28 = new lib.shape23("synched",0);
	this.instance_28.setTransform(245.2,196.45,0.9614,1.027);
	this.instance_28.alpha = 0;
	this.instance_28._off = true;

	this.instance_29 = new lib.shape32("synched",0);
	this.instance_29.setTransform(261.4,196.5,1.0272,1.0269);
	this.instance_29.alpha = 0;
	this.instance_29._off = true;

	var maskedShapeInstanceList = [this.instance_28,this.instance_29];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_28).wait(404).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(137).to({startPosition:0},0).to({alpha:0},20).to({_off:true},1).wait(448));
	this.timeline.addTween(cjs.Tween.get(this.instance_29).wait(724).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(97).to({startPosition:0},0).to({alpha:0},20).to({_off:true},1).wait(168));

	// Masked_Layer_9___1
	this.instance_30 = new lib.shape13("synched",0);
	this.instance_30.setTransform(332.75,141.65,0.25,0.25);

	this.instance_31 = new lib.sprite17();
	this.instance_31.setTransform(389.25,260.3,1.7167,1.7169,60.0045);
	this.instance_31.alpha = 0;
	this.instance_31._off = true;

	var maskedShapeInstanceList = [this.instance_30,this.instance_31];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_30}]},929).to({state:[]},4).to({state:[{t:this.instance_30}]},4).to({state:[]},4).to({state:[{t:this.instance_30}]},4).to({state:[]},4).to({state:[{t:this.instance_31}]},52).to({state:[{t:this.instance_31}]},19).to({state:[{t:this.instance_31}]},1).wait(9));
	this.timeline.addTween(cjs.Tween.get(this.instance_31).wait(1001).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(9));

	// Masked_Layer_8___1
	this.instance_32 = new lib.sprite17();
	this.instance_32.setTransform(389.5,184.65,1.6362,1.7324,0,165.9202,164.0277);
	this.instance_32.alpha = 0;
	this.instance_32._off = true;

	this.instance_33 = new lib.text51("synched",0);
	this.instance_33.setTransform(102.1,264.25,1.013,1.013);
	this.instance_33.alpha = 0;
	this.instance_33._off = true;

	this.instance_34 = new lib.shape61("synched",0);
	this.instance_34.setTransform(261.6,196.5,1.0136,1.0134);
	this.instance_34.alpha = 0;
	this.instance_34._off = true;

	var maskedShapeInstanceList = [this.instance_32,this.instance_33,this.instance_34];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_32).wait(404).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(137).to({alpha:0},20).to({_off:true},1).wait(142).to({_off:false,scaleX:1.7378,scaleY:1.7377,rotation:-37.2144,skewX:0,skewY:0,x:270.3,y:80.55},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(97).to({alpha:0},20).to({_off:true},1).wait(168));
	this.timeline.addTween(cjs.Tween.get(this.instance_33).wait(904).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).to({_off:true},46).wait(60));
	this.timeline.addTween(cjs.Tween.get(this.instance_34).wait(1001).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(9));

	// Masked_Layer_7___1
	this.instance_35 = new lib.shape13("synched",0);
	this.instance_35.setTransform(280.85,105.05,0.25,0.25);

	this.instance_36 = new lib.shape22("synched",0);
	this.instance_36.setTransform(245.2,196.45,0.9614,1.027);
	this.instance_36.alpha = 0;
	this.instance_36._off = true;

	this.instance_37 = new lib.shape31("synched",0);
	this.instance_37.setTransform(261.4,196.5,1.0272,1.0269);
	this.instance_37.alpha = 0;
	this.instance_37._off = true;

	this.instance_38 = new lib.shape50("synched",0);
	this.instance_38.setTransform(248.6,198.65,1.013,1.013);
	this.instance_38.alpha = 0;
	this.instance_38._off = true;

	var maskedShapeInstanceList = [this.instance_35,this.instance_36,this.instance_37,this.instance_38];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_35}]},250).to({state:[]},4).to({state:[{t:this.instance_35}]},4).to({state:[]},4).to({state:[{t:this.instance_35}]},4).to({state:[]},4).to({state:[{t:this.instance_36}]},134).to({state:[{t:this.instance_36}]},19).to({state:[{t:this.instance_36}]},1).to({state:[{t:this.instance_36}]},137).to({state:[{t:this.instance_36}]},20).to({state:[]},1).to({state:[{t:this.instance_37}]},142).to({state:[{t:this.instance_37}]},19).to({state:[{t:this.instance_37}]},1).to({state:[{t:this.instance_37}]},97).to({state:[{t:this.instance_37}]},20).to({state:[]},1).to({state:[{t:this.instance_38}]},42).to({state:[{t:this.instance_38}]},19).to({state:[{t:this.instance_38}]},1).to({state:[]},46).wait(60));
	this.timeline.addTween(cjs.Tween.get(this.instance_36).wait(404).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(137).to({startPosition:0},0).to({alpha:0},20).to({_off:true},1).wait(448));
	this.timeline.addTween(cjs.Tween.get(this.instance_37).wait(724).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(97).to({startPosition:0},0).to({alpha:0},20).to({_off:true},1).wait(168));
	this.timeline.addTween(cjs.Tween.get(this.instance_38).wait(904).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).to({_off:true},46).wait(60));

	// Masked_Layer_6___1
	this.instance_39 = new lib.shape12("synched",0);
	this.instance_39.setTransform(90.4,297.6,0.27,0.2526);
	this.instance_39.alpha = 0;
	this.instance_39._off = true;

	this.instance_40 = new lib.text60("synched",0);
	this.instance_40.setTransform(235.15,282.2,1.0136,1.0134);
	this.instance_40.alpha = 0;
	this.instance_40._off = true;

	var maskedShapeInstanceList = [this.instance_39,this.instance_40];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_39).wait(114).to({_off:false},0).to({scaleX:0.9635,scaleY:0.9626,x:237.7,y:201.25,alpha:0.9492},19).wait(1).to({scaleX:1,scaleY:1,x:245.5,y:196.2,alpha:1},0).to({_off:true},160).wait(736));
	this.timeline.addTween(cjs.Tween.get(this.instance_40).wait(1001).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(9));

	// Masked_Layer_5___1
	this.instance_41 = new lib.shape2("synched",0);
	this.instance_41.setTransform(410.25,360,0.6956,0.473);

	this.instance_42 = new lib.sprite17();
	this.instance_42.setTransform(127.95,114.6,1.685,1.685,0,136.8909,133.1106);
	this.instance_42.alpha = 0;
	this.instance_42._off = true;

	this.instance_43 = new lib.shape59("synched",0);
	this.instance_43.setTransform(261.6,196.5,1.0136,1.0134);
	this.instance_43.alpha = 0;
	this.instance_43._off = true;

	var maskedShapeInstanceList = [this.instance_41,this.instance_42,this.instance_43];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_41}]}).to({state:[]},134).to({state:[{t:this.instance_42}]},270).to({state:[{t:this.instance_42}]},19).to({state:[{t:this.instance_42}]},1).to({state:[{t:this.instance_42}]},137).to({state:[{t:this.instance_42}]},20).to({state:[]},1).to({state:[{t:this.instance_42}]},142).to({state:[{t:this.instance_42}]},19).to({state:[{t:this.instance_42}]},1).to({state:[{t:this.instance_42}]},97).to({state:[{t:this.instance_42}]},20).to({state:[]},1).to({state:[{t:this.instance_42}]},42).to({state:[{t:this.instance_42}]},19).to({state:[{t:this.instance_42}]},1).to({state:[]},46).to({state:[{t:this.instance_43}]},31).to({state:[{t:this.instance_43}]},19).to({state:[{t:this.instance_43}]},1).wait(9));
	this.timeline.addTween(cjs.Tween.get(this.instance_42).wait(404).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(137).to({alpha:0},20).to({_off:true},1).wait(142).to({_off:false,scaleX:1.7378,scaleY:1.7377,rotation:-37.2144,skewX:0,skewY:0,x:270.3,y:290.55},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(97).to({alpha:0},20).to({_off:true},1).wait(42).to({_off:false,scaleX:1.7159,scaleY:1.7159,rotation:30.0004,x:142.1,y:212.65},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).to({_off:true},46).wait(60));
	this.timeline.addTween(cjs.Tween.get(this.instance_43).wait(1001).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(9));

	// Masked_Layer_4___1
	this.instance_44 = new lib.shape21("synched",0);
	this.instance_44.setTransform(245.2,196.45,0.9614,1.027);
	this.instance_44.alpha = 0;
	this.instance_44._off = true;

	this.instance_45 = new lib.shape30("synched",0);
	this.instance_45.setTransform(261.4,196.5,1.0272,1.0269);
	this.instance_45.alpha = 0;
	this.instance_45._off = true;

	this.instance_46 = new lib.shape49("synched",0);
	this.instance_46.setTransform(248.6,198.65,1.013,1.013);
	this.instance_46.alpha = 0;
	this.instance_46._off = true;

	this.instance_47 = new lib.text58("synched",0);
	this.instance_47.setTransform(247.05,37.2,1.0136,1.0134);
	this.instance_47.alpha = 0;
	this.instance_47._off = true;

	var maskedShapeInstanceList = [this.instance_44,this.instance_45,this.instance_46,this.instance_47];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_44).wait(404).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(137).to({startPosition:0},0).to({alpha:0},20).to({_off:true},1).wait(448));
	this.timeline.addTween(cjs.Tween.get(this.instance_45).wait(724).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(97).to({startPosition:0},0).to({alpha:0},20).to({_off:true},1).wait(168));
	this.timeline.addTween(cjs.Tween.get(this.instance_46).wait(904).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).to({_off:true},46).wait(60));
	this.timeline.addTween(cjs.Tween.get(this.instance_47).wait(1001).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(9));

	// Masked_Layer_3___1
	this.instance_48 = new lib.shape57("synched",0);
	this.instance_48.setTransform(261.6,196.5,1.0136,1.0134);
	this.instance_48.alpha = 0;
	this.instance_48._off = true;

	var maskedShapeInstanceList = [this.instance_48];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_48).wait(1001).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(9));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-509.9,-7.2,975.2,393);


// stage content:
(lib.vital_opsm_eg = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {p1:0,p2:1030,p3:1670,p4:2720,p5:3130,p6:3415,p7:4000,p8:4865,p9:5715};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,1,1028,1029,1030,1031,1668,1669,1670,1671,2718,2719,2720,2721,3128,3129,3130,3131,3132,3413,3414,3415,3416,3998,3999,4000,4001,4863,4864,4865,4866,5713,5714,5715,5716,6254];
	this.streamSoundSymbolsList[1] = [{id:"vital_opsm_eg1",startFrame:1,endFrame:1029,loop:1,offset:0}];
	this.streamSoundSymbolsList[1031] = [{id:"vital_opsm_eg2",startFrame:1031,endFrame:1669,loop:1,offset:0}];
	this.streamSoundSymbolsList[1671] = [{id:"vital_opsm_eg3",startFrame:1671,endFrame:2719,loop:1,offset:0}];
	this.streamSoundSymbolsList[2721] = [{id:"vital_opsm_eg4",startFrame:2721,endFrame:3129,loop:1,offset:0}];
	this.streamSoundSymbolsList[3131] = [{id:"vital_opsm_eg5_rrrrr",startFrame:3131,endFrame:3132,loop:1,offset:0}];
	this.streamSoundSymbolsList[3132] = [{id:"vital_opsm_eg5_rrrrr",startFrame:3132,endFrame:3412,loop:1,offset:240}];
	this.streamSoundSymbolsList[3416] = [{id:"vital_opsm_eg6",startFrame:3416,endFrame:3999,loop:1,offset:0}];
	this.streamSoundSymbolsList[4001] = [{id:"vital_opsm_eg7",startFrame:4001,endFrame:4864,loop:1,offset:0}];
	this.streamSoundSymbolsList[4866] = [{id:"vital_opsm_eg8",startFrame:4866,endFrame:5714,loop:1,offset:0}];
	this.streamSoundSymbolsList[5716] = [{id:"vital_opsm_eg9",startFrame:5716,endFrame:6254,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		InitPage(9);
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
			GetUrlMain("vitalmenu_eg");
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
		var soundInstance = playSound("vital_opsm_eg1",0);
		this.InsertIntoSoundStreamData(soundInstance,1,1029,1);
	}
	this.frame_1028 = function() {
		this.stop();
	}
	this.frame_1029 = function() {
		this.stop();
	}
	this.frame_1030 = function() {
		Prev(1);
		InitAnim();
	}
	this.frame_1031 = function() {
		var soundInstance = playSound("vital_opsm_eg2",0);
		this.InsertIntoSoundStreamData(soundInstance,1031,1669,1);
	}
	this.frame_1668 = function() {
		this.stop();
	}
	this.frame_1669 = function() {
		this.stop();
	}
	this.frame_1670 = function() {
		InitAnim();
	}
	this.frame_1671 = function() {
		var soundInstance = playSound("vital_opsm_eg3",0);
		this.InsertIntoSoundStreamData(soundInstance,1671,2719,1);
	}
	this.frame_2718 = function() {
		this.stop();
	}
	this.frame_2719 = function() {
		this.stop();
	}
	this.frame_2720 = function() {
		InitAnim();
	}
	this.frame_2721 = function() {
		var soundInstance = playSound("vital_opsm_eg4",0);
		this.InsertIntoSoundStreamData(soundInstance,2721,3129,1);
	}
	this.frame_3128 = function() {
		this.stop();
	}
	this.frame_3129 = function() {
		this.stop();
	}
	this.frame_3130 = function() {
		InitAnim();
	}
	this.frame_3131 = function() {
		var soundInstance = playSound("vital_opsm_eg5_rrrrr",0);
		this.InsertIntoSoundStreamData(soundInstance,3131,3132,1);
	}
	this.frame_3132 = function() {
		var soundInstance = playSound("vital_opsm_eg5_rrrrr",0,240);
		this.InsertIntoSoundStreamData(soundInstance,3132,3412,1,240);
	}
	this.frame_3413 = function() {
		this.stop();
	}
	this.frame_3414 = function() {
		this.stop();
	}
	this.frame_3415 = function() {
		InitAnim();
	}
	this.frame_3416 = function() {
		var soundInstance = playSound("vital_opsm_eg6",0);
		this.InsertIntoSoundStreamData(soundInstance,3416,3999,1);
	}
	this.frame_3998 = function() {
		this.stop();
	}
	this.frame_3999 = function() {
		this.stop();
	}
	this.frame_4000 = function() {
		InitAnim();
	}
	this.frame_4001 = function() {
		var soundInstance = playSound("vital_opsm_eg7",0);
		this.InsertIntoSoundStreamData(soundInstance,4001,4864,1);
	}
	this.frame_4863 = function() {
		this.stop();
	}
	this.frame_4864 = function() {
		this.stop();
	}
	this.frame_4865 = function() {
		Next(1);
		InitAnim();
	}
	this.frame_4866 = function() {
		var soundInstance = playSound("vital_opsm_eg8",0);
		this.InsertIntoSoundStreamData(soundInstance,4866,5714,1);
	}
	this.frame_5713 = function() {
		this.stop();
	}
	this.frame_5714 = function() {
		this.stop();
	}
	this.frame_5715 = function() {
		Next(0);
		InitAnim();
	}
	this.frame_5716 = function() {
		var soundInstance = playSound("vital_opsm_eg9",0);
		this.InsertIntoSoundStreamData(soundInstance,5716,6254,1);
	}
	this.frame_6254 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1027).call(this.frame_1028).wait(1).call(this.frame_1029).wait(1).call(this.frame_1030).wait(1).call(this.frame_1031).wait(637).call(this.frame_1668).wait(1).call(this.frame_1669).wait(1).call(this.frame_1670).wait(1).call(this.frame_1671).wait(1047).call(this.frame_2718).wait(1).call(this.frame_2719).wait(1).call(this.frame_2720).wait(1).call(this.frame_2721).wait(407).call(this.frame_3128).wait(1).call(this.frame_3129).wait(1).call(this.frame_3130).wait(1).call(this.frame_3131).wait(1).call(this.frame_3132).wait(281).call(this.frame_3413).wait(1).call(this.frame_3414).wait(1).call(this.frame_3415).wait(1).call(this.frame_3416).wait(582).call(this.frame_3998).wait(1).call(this.frame_3999).wait(1).call(this.frame_4000).wait(1).call(this.frame_4001).wait(862).call(this.frame_4863).wait(1).call(this.frame_4864).wait(1).call(this.frame_4865).wait(1).call(this.frame_4866).wait(847).call(this.frame_5713).wait(1).call(this.frame_5714).wait(1).call(this.frame_5715).wait(1).call(this.frame_5716).wait(538).call(this.frame_6254).wait(1));

	// Layer_back
	this.back = new lib.buttonbak();
	this.back.name = "back";
	this.back.setTransform(350,645,1.0001,1.0002);
	new cjs.ButtonHelper(this.back, 0, 1, 2, false, new lib.buttonbak(), 3);

	this.timeline.addTween(cjs.Tween.get(this.back).wait(6255));

	// Layer_page
	this.page = new cjs.Text("Page number", "italic bold 15px 'Arial'", "#FF9900");
	this.page.name = "page";
	this.page.lineHeight = 17;
	this.page.lineWidth = 193;
	this.page.parent = this;
	this.page.setTransform(23,658,1.4989,1.4989);

	this.timeline.addTween(cjs.Tween.get(this.page).wait(6255));

	// Layer_next
	this.next = new lib.buttonnext();
	this.next.name = "next";
	this.next.setTransform(1496.1,5.1,0.9998,0.9999,0,0,0,0.1,0.1);
	new cjs.ButtonHelper(this.next, 0, 1, 2, false, new lib.buttonnext(), 3);

	this.timeline.addTween(cjs.Tween.get(this.next).wait(6255));

	// Layer_previous
	this.previous = new lib.buttonprev();
	this.previous.name = "previous";
	this.previous.setTransform(1432,5,1.0003,0.9993);
	new cjs.ButtonHelper(this.previous, 0, 1, 2, false, new lib.buttonprev(), 3);

	this.timeline.addTween(cjs.Tween.get(this.previous).wait(6255));

	// Layer_slider
	this.slider = new lib.sprite_slider();
	this.slider.name = "slider";
	this.slider.setTransform(610.1,670.1,0.9937,0.9983,0,0,0,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.slider).wait(6255));

	// Layer_replay
	this.replay = new lib.sprite_replay();
	this.replay.name = "replay";
	this.replay.setTransform(1045.1,650.1,0.9999,0.9999,0,0,0,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.replay).wait(6255));

	// Layer_slider_base
	this.instance = new lib.sprite_sliderbase();
	this.instance.setTransform(600,650,1,0.9999);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(6255));

	// Layer_playpau
	this.playpau = new lib.sprite_playpau();
	this.playpau.name = "playpau";
	this.playpau.setTransform(555,650,0.9999,0.9999);

	this.timeline.addTween(cjs.Tween.get(this.playpau).wait(6255));

	// Layer_104
	this.instance_1 = new lib.text68("synched",0);
	this.instance_1.setTransform(10,0,1.5021,1.5021);

	this.instance_2 = new lib.text146("synched",0);
	this.instance_2.setTransform(10,0,1.5021,1.5021);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_2}]},1670).wait(4585));

	// Layer_102
	this.instance_3 = new lib.sprite17();
	this.instance_3.setTransform(1292.15,289.15,2.5415,2.5415,180);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(3130).to({_off:false},0).to({_off:true},285).wait(2840));

	// Layer_101
	this.instance_4 = new lib.shape192("synched",0);
	this.instance_4.setTransform(214.4,0,1.5021,1.5021);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(3130).to({_off:false},0).to({_off:true},285).wait(2840));

	// Layer_99
	this.instance_5 = new lib.sprite17();
	this.instance_5.setTransform(1330,231.85,2.5415,2.5415,142.7919);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(3130).to({_off:false},0).to({_off:true},285).wait(2840));

	// Layer_98
	this.instance_6 = new lib.shape191("synched",0);
	this.instance_6.setTransform(214.4,0,1.5021,1.5021);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(3130).to({_off:false},0).to({_off:true},285).wait(2840));

	// Layer_96
	this.instance_7 = new lib.sprite17();
	this.instance_7.setTransform(848.35,275.1,2.5415,2.5415,-179.9986);
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(3130).to({_off:false},0).to({_off:true},285).wait(2840));

	// Layer_95
	this.instance_8 = new lib.shape190("synched",0);
	this.instance_8.setTransform(214.4,0,1.5021,1.5021);
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(3130).to({_off:false},0).to({_off:true},285).wait(2840));

	// Layer_93
	this.instance_9 = new lib.sprite17();
	this.instance_9.setTransform(892.3,189.25,2.5415,2.5415,112.7927);
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(3130).to({_off:false},0).to({_off:true},285).wait(2840));

	// Layer_92
	this.instance_10 = new lib.shape189("synched",0);
	this.instance_10.setTransform(214.4,0,1.5021,1.5021);
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(3130).to({_off:false},0).to({_off:true},285).wait(2840));

	// Layer_90
	this.instance_11 = new lib.sprite17();
	this.instance_11.setTransform(1107.75,370.1,2.5415,2.5415,-67.2073);
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(3130).to({_off:false},0).to({_off:true},285).wait(2840));

	// Layer_89
	this.instance_12 = new lib.shape182("synched",0);
	this.instance_12.setTransform(214.4,0,1.5021,1.5021);
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(3130).to({_off:false},0).to({_off:true},285).wait(2840));

	// Layer_87
	this.instance_13 = new lib.sprite17();
	this.instance_13.setTransform(1326.8,324.9,2.5142,2.3829,0,-65.5948,-68.7354);
	this.instance_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(3130).to({_off:false},0).to({_off:true},285).wait(2840));

	// Layer_86
	this.instance_14 = new lib.shape188("synched",0);
	this.instance_14.setTransform(214.4,0,1.5021,1.5021);
	this.instance_14._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(3130).to({_off:false},0).to({_off:true},285).wait(2840));

	// Layer_84
	this.instance_15 = new lib.sprite17();
	this.instance_15.setTransform(1326.05,352.7,2.5142,2.3829,0,-114.4052,68.7354);
	this.instance_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(3130).to({_off:false},0).to({_off:true},285).wait(2840));

	// Layer_83
	this.instance_16 = new lib.sprite17();
	this.instance_16.setTransform(901.2,495.7,3.0518,3.0518,-143.274);

	this.instance_17 = new lib.shape187("synched",0);
	this.instance_17.setTransform(214.4,0,1.5021,1.5021);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_16}]},1670).to({state:[]},1050).to({state:[{t:this.instance_17}]},410).to({state:[]},285).wait(2840));

	// Layer_82
	this.instance_18 = new lib.shape145("synched",0);
	this.instance_18.setTransform(210,0,1.5021,1.5021);

	this.instance_19 = new lib.text186("synched",0);
	this.instance_19.setTransform(870.75,266.7,1.5021,1.5021);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_18}]},1670).to({state:[]},1050).to({state:[{t:this.instance_19}]},410).to({state:[]},285).wait(2840));

	// Layer_81
	this.instance_20 = new lib.shape185("synched",0);
	this.instance_20.setTransform(214.4,0,1.5021,1.5021);
	this.instance_20._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(3130).to({_off:false},0).to({_off:true},285).wait(2840));

	// Layer_80
	this.instance_21 = new lib.sprite17();
	this.instance_21.setTransform(1185.4,165.45,3.0498,3.0498,-38.7163);
	this.instance_21._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(1670).to({_off:false},0).to({_off:true},1050).wait(3535));

	// Layer_79
	this.instance_22 = new lib.shape144("synched",0);
	this.instance_22.setTransform(210,0,1.5021,1.5021);

	this.instance_23 = new lib.sprite17();
	this.instance_23.setTransform(860.15,296.8,2.5415,2.5415,0,-112.7927,67.2073);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_22}]},1670).to({state:[]},1050).to({state:[{t:this.instance_23}]},410).to({state:[]},285).wait(2840));

	// Layer_78
	this.instance_24 = new lib.text143("synched",0);
	this.instance_24.setTransform(1062.05,569.65,1.5021,1.5021);

	this.instance_25 = new lib.shape184("synched",0);
	this.instance_25.setTransform(214.4,0,1.5021,1.5021);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_24}]},1670).to({state:[]},1050).to({state:[{t:this.instance_25}]},410).to({state:[]},285).wait(2840));

	// Layer_77
	this.instance_26 = new lib.shape142("synched",0);
	this.instance_26.setTransform(210,0,1.5021,1.5021);
	this.instance_26._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(1670).to({_off:false},0).to({_off:true},1050).wait(3535));

	// Layer_76
	this.instance_27 = new lib.sprite17();
	this.instance_27.setTransform(856.3,366.8,2.5415,2.5415,0,-112.7927,67.2073);
	this.instance_27._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_27).wait(3130).to({_off:false},0).to({_off:true},285).wait(2840));

	// Layer_75
	this.instance_28 = new lib.sprite17();
	this.instance_28.setTransform(991.7,485.15,3.0532,3.0532,-30.008);

	this.instance_29 = new lib.shape184("synched",0);
	this.instance_29.setTransform(208.2,71.05,1.5021,1.5021);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_28}]},1670).to({state:[]},1050).to({state:[{t:this.instance_29}]},410).to({state:[]},285).wait(2840));

	// Layer_74
	this.instance_30 = new lib.shape141("synched",0);
	this.instance_30.setTransform(210,0,1.5021,1.5021);
	this.instance_30._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_30).wait(1670).to({_off:false},0).to({_off:true},1050).wait(3535));

	// Layer_73
	this.instance_31 = new lib.text140("synched",0);
	this.instance_31.setTransform(1075.8,464,1.5021,1.5021);

	this.instance_32 = new lib.sprite17();
	this.instance_32.setTransform(1044.6,264.8,2.5419,2.5419,-154.9998);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_31}]},1670).to({state:[]},1050).to({state:[{t:this.instance_32}]},410).to({state:[]},285).wait(2840));

	// Layer_72
	this.instance_33 = new lib.shape139("synched",0);
	this.instance_33.setTransform(210,0,1.5021,1.5021);

	this.instance_34 = new lib.shape183("synched",0);
	this.instance_34.setTransform(214.4,0,1.5021,1.5021);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_33}]},1670).to({state:[]},1050).to({state:[{t:this.instance_34}]},410).to({state:[]},285).wait(2840));

	// Layer_70
	this.instance_35 = new lib.sprite17();
	this.instance_35.setTransform(1025.25,431.9,3.0532,3.0532,-45.0073);
	this.instance_35._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_35).wait(1670).to({_off:false},0).to({_off:true},1050).wait(410).to({_off:false,scaleX:2.5415,scaleY:2.5415,rotation:-67.2073,x:856.15,y:325.65},0).to({_off:true},285).wait(2840));

	// Layer_69
	this.instance_36 = new lib.shape138("synched",0);
	this.instance_36.setTransform(210,0,1.5021,1.5021);

	this.instance_37 = new lib.shape182("synched",0);
	this.instance_37.setTransform(-39.45,-45.4,1.5021,1.5021);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_36}]},1670).to({state:[]},1050).to({state:[{t:this.instance_37}]},410).to({state:[]},285).wait(2840));

	// Layer_68
	this.instance_38 = new lib.text137("synched",0);
	this.instance_38.setTransform(1217.9,137.35,1.5021,1.5021);

	this.instance_39 = new lib.text181("synched",0);
	this.instance_39.setTransform(1228.1,466.55,1.5021,1.5021);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_38}]},1670).to({state:[]},1050).to({state:[{t:this.instance_39}]},410).to({state:[]},285).wait(2840));

	// Layer_67
	this.instance_40 = new lib.shape136("synched",0);
	this.instance_40.setTransform(210,0,1.5021,1.5021);

	this.instance_41 = new lib.shape180("synched",0);
	this.instance_41.setTransform(214.4,0,1.5021,1.5021);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_40}]},1670).to({state:[]},1050).to({state:[{t:this.instance_41}]},410).to({state:[]},285).wait(2840));

	// Layer_66
	this.instance_42 = new lib.text179("synched",0);
	this.instance_42.setTransform(987.9,466.55,1.5021,1.5021);
	this.instance_42._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_42).wait(3130).to({_off:false},0).to({_off:true},285).wait(2840));

	// Layer_65
	this.instance_43 = new lib.sprite17();
	this.instance_43.setTransform(1269.8,246,3.0519,3.0518,-158.274);

	this.instance_44 = new lib.shape177("synched",0);
	this.instance_44.setTransform(214.4,0,1.5021,1.5021);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_43}]},1670).to({state:[]},1050).to({state:[{t:this.instance_44}]},410).to({state:[]},285).wait(2840));

	// Layer_64
	this.instance_45 = new lib.shape135("synched",0);
	this.instance_45.setTransform(210,0,1.5021,1.5021);

	this.instance_46 = new lib.text178("synched",0);
	this.instance_46.setTransform(748.85,466.6,1.5021,1.5021);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_45}]},1670).to({state:[]},1050).to({state:[{t:this.instance_46}]},410).to({state:[]},285).wait(2840));

	// Layer_63
	this.instance_47 = new lib.text67("synched",0);
	this.instance_47.setTransform(801.75,43.7,1.5021,1.5021);

	this.instance_48 = new lib.shape177("synched",0);
	this.instance_48.setTransform(-24.65,0.05,1.5021,1.5021);

	this.instance_49 = new lib.text269("synched",0);
	this.instance_49.setTransform(789.75,43.7,1.5021,1.5021);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_47,p:{x:801.75,y:43.7}}]}).to({state:[]},1030).to({state:[{t:this.instance_48}]},2100).to({state:[{t:this.instance_47,p:{x:696.75,y:28.2}}]},285).to({state:[]},585).to({state:[{t:this.instance_49}]},865).to({state:[]},850).wait(540));

	// Layer_62
	this.instance_50 = new lib.text66("synched",0);
	this.instance_50.setTransform(30,45,1.5031,1.5021);

	this.instance_51 = new lib.text134("synched",0);
	this.instance_51.setTransform(30,45,1.5031,1.5021);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_50}]}).to({state:[{t:this.instance_51}]},1670).to({state:[]},2330).to({state:[{t:this.instance_51}]},865).wait(1390));

	// Layer_61
	this.instance_52 = new lib.shape64("synched",0);
	this.instance_52.setTransform(7.25,0,1.5021,1.5021);

	this.timeline.addTween(cjs.Tween.get(this.instance_52).to({_off:true},4000).wait(865).to({_off:false,x:7.75},0).wait(1390));

	// Mask_Layer_1 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("Eh8/AyyMAAAhfTMD5/AAAMAAABfTg");
	mask.setTransform(800,325);

	// Masked_Layer_2___1
	this.ani1 = new lib.sprite63();
	this.ani1.name = "ani1";
	this.ani1.setTransform(800,75,1.5021,1.5021);

	this.ani2 = new lib.sprite122();
	this.ani2.name = "ani2";
	this.ani2.setTransform(750,70,1.5021,1.5021);

	this.ani3 = new lib.sprite133();
	this.ani3.name = "ani3";
	this.ani3.setTransform(546.6,82.6,1.5021,1.5021);

	this.ani4 = new lib.sprite161();
	this.ani4.name = "ani4";
	this.ani4.setTransform(800,82.6,1.5021,1.5021);

	this.ani5 = new lib.sprite176();
	this.ani5.name = "ani5";
	this.ani5.setTransform(546.6,133.65,1.5021,1.5021);

	this.ani6 = new lib.sprite220();
	this.ani6.name = "ani6";
	this.ani6.setTransform(1203.45,368.4,0.3605,0.3605,0,0,0,0.1,0);

	this.ani7 = new lib.sprite234();
	this.ani7.name = "ani7";
	this.ani7.setTransform(700,82.95,1.5021,1.5021);

	this.ani8 = new lib.sprite268();
	this.ani8.name = "ani8";
	this.ani8.setTransform(730,82.6,1.5021,1.5021);

	this.ani9 = new lib.sprite284();
	this.ani9.name = "ani9";
	this.ani9.setTransform(800,82.6,1.5021,1.5021);

	var maskedShapeInstanceList = [this.ani1,this.ani2,this.ani3,this.ani4,this.ani5,this.ani6,this.ani7,this.ani8,this.ani9];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.ani1}]}).to({state:[{t:this.ani2}]},1030).to({state:[{t:this.ani3}]},640).to({state:[{t:this.ani4}]},1050).to({state:[{t:this.ani5}]},410).to({state:[{t:this.ani6}]},285).to({state:[{t:this.ani7}]},585).to({state:[{t:this.ani8}]},865).to({state:[{t:this.ani9}]},850).wait(540));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(807.8,350,789.2,346);
// library properties:
lib.properties = {
	id: '786DCE5F8407AE4380EFB6EA9159D292',
	width: 1600,
	height: 700,
	fps: 25,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/vital_opsm_eg_atlas_1.png", id:"vital_opsm_eg_atlas_1"},
		{src:"images/vital_opsm_eg_atlas_2.png", id:"vital_opsm_eg_atlas_2"},
		{src:"sounds/vital_opsm_eg1.mp3", id:"vital_opsm_eg1"},
		{src:"sounds/vital_opsm_eg2.mp3", id:"vital_opsm_eg2"},
		{src:"sounds/vital_opsm_eg3.mp3", id:"vital_opsm_eg3"},
		{src:"sounds/vital_opsm_eg4.mp3", id:"vital_opsm_eg4"},
		{src:"sounds/vital_opsm_eg5_rrrrr.mp3", id:"vital_opsm_eg5_rrrrr"},
		{src:"sounds/vital_opsm_eg6.mp3", id:"vital_opsm_eg6"},
		{src:"sounds/vital_opsm_eg7.mp3", id:"vital_opsm_eg7"},
		{src:"sounds/vital_opsm_eg8.mp3", id:"vital_opsm_eg8"},
		{src:"sounds/vital_opsm_eg9.mp3", id:"vital_opsm_eg9"}
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