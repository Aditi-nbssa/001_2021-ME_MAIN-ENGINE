(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"vital_opsm_ce_atlas_1", frames: [[0,806,1230,162],[0,642,1232,162],[0,1462,1185,162],[0,970,1222,162],[0,428,1182,212],[0,1298,1187,162],[0,1134,1190,162],[0,1626,1185,162],[0,214,1190,212],[0,1790,1185,162],[0,0,1219,212]]},
		{name:"vital_opsm_ce_atlas_2", frames: [[0,914,1219,112],[0,1028,1217,112],[1219,1091,474,98],[1211,1191,496,93],[1176,381,431,145],[1224,901,516,93],[0,1370,1145,112],[0,492,1169,162],[0,800,1222,112],[1181,114,680,112],[1224,806,538,93],[1474,1476,273,93],[923,1562,176,93],[0,1562,234,93],[1672,1286,360,93],[1742,913,282,93],[1816,1381,228,93],[472,1562,233,93],[236,1562,234,93],[0,1484,1193,76],[1181,0,734,112],[0,1256,1174,112],[0,164,1174,162],[0,0,1179,162],[1195,1476,277,93],[707,1562,214,93],[1221,996,514,93],[1224,711,554,93],[1176,1286,494,93],[0,656,1115,142],[0,1142,1209,112],[0,328,1174,162],[1695,1091,339,93],[1749,1476,261,93],[1504,1381,310,93],[1147,1381,355,93],[1709,1186,322,93],[1911,644,113,53],[1117,693,60,60],[1737,1008,276,53],[1609,504,300,205],[1171,528,269,163],[1442,528,164,143],[1101,1571,135,106],[1911,504,129,138],[1238,1571,87,162],[1863,114,167,388],[1176,228,457,151],[1917,0,128,100],[1780,711,257,200],[1635,377,206,119],[1635,228,199,147]]}
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



(lib.CachedBmp_51 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_50 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_49 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_48 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_47 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_2"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_46 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_2"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_45 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_2"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_44 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_2"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_43 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_2"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_42 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_41 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_2"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_40 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_2"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_39 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_38 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_2"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_37 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_2"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_36 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_2"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_35 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_2"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_34 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_2"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_33 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_2"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_32 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_2"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_31 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_2"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_30 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_2"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_29 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_2"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_28 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_2"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_27 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_2"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_26 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_25 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_2"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_24 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_2"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_23 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_2"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_22 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_21 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_20 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_2"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_19 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_2"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_18 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_2"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_17 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_2"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_16 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_2"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_15 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_2"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_14 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_2"]);
	this.gotoAndStop(30);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_13 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_12 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_2"]);
	this.gotoAndStop(31);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_11 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_10 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_9 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_8 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_2"]);
	this.gotoAndStop(32);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_7 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_2"]);
	this.gotoAndStop(33);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_6 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_2"]);
	this.gotoAndStop(34);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_5 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_2"]);
	this.gotoAndStop(35);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_4 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_2"]);
	this.gotoAndStop(36);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_3 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_2"]);
	this.gotoAndStop(37);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_2"]);
	this.gotoAndStop(38);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_2"]);
	this.gotoAndStop(39);
}).prototype = p = new cjs.Sprite();



(lib.image105 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_2"]);
	this.gotoAndStop(40);
}).prototype = p = new cjs.Sprite();



(lib.image127 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_2"]);
	this.gotoAndStop(41);
}).prototype = p = new cjs.Sprite();



(lib.image138 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_2"]);
	this.gotoAndStop(42);
}).prototype = p = new cjs.Sprite();



(lib.image139 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_2"]);
	this.gotoAndStop(43);
}).prototype = p = new cjs.Sprite();



(lib.image140 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_2"]);
	this.gotoAndStop(44);
}).prototype = p = new cjs.Sprite();



(lib.image141 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_2"]);
	this.gotoAndStop(45);
}).prototype = p = new cjs.Sprite();



(lib.image2 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_2"]);
	this.gotoAndStop(46);
}).prototype = p = new cjs.Sprite();



(lib.image74 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_2"]);
	this.gotoAndStop(47);
}).prototype = p = new cjs.Sprite();



(lib.image75 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_2"]);
	this.gotoAndStop(48);
}).prototype = p = new cjs.Sprite();



(lib.image76 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_2"]);
	this.gotoAndStop(49);
}).prototype = p = new cjs.Sprite();



(lib.image77 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_2"]);
	this.gotoAndStop(50);
}).prototype = p = new cjs.Sprite();



(lib.image78 = function() {
	this.initialize(ss["vital_opsm_ce_atlas_2"]);
	this.gotoAndStop(51);
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
	this.instance.setTransform(-4,-3.4,0.3562,0.3562);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,434.2,39.9);


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
	this.instance = new lib.CachedBmp_50();
	this.instance.setTransform(-4,-3.4,0.3562,0.3562);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,433.5,39.9);


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
	this.instance = new lib.CachedBmp_49();
	this.instance.setTransform(-4,-3.4,0.3562,0.3562);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,438.1,57.699999999999996);


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
	this.instance = new lib.CachedBmp_48();
	this.instance.setTransform(-4,-3.4,0.3562,0.3562);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,438.8,57.699999999999996);


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
	this.instance = new lib.CachedBmp_47();
	this.instance.setTransform(-8.85,-3.7,0.3562,0.3562);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8.8,-3.7,168.8,34.9);


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
	this.instance = new lib.CachedBmp_46();
	this.instance.setTransform(-4,-3.7,0.3562,0.3562);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.7,176.7,33.2);


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
	this.instance = new lib.CachedBmp_45();
	this.instance.setTransform(-6.35,-3.7,0.3562,0.3562);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-6.3,-3.7,153.5,51.7);


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
	this.instance = new lib.CachedBmp_44();
	this.instance.setTransform(-4,-3.7,0.3562,0.3562);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.7,183.8,33.2);


(lib.text136 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(-4,-3.4,0.3562,0.3562);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,407.9,39.9);


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
	this.instance = new lib.CachedBmp_42();
	this.instance.setTransform(-4,-3.4,0.3562,0.3562);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,422.1,57.699999999999996);


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
	this.instance = new lib.CachedBmp_41();
	this.instance.setTransform(-4,-3.4,0.3562,0.3562);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,416.4,57.699999999999996);


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
	this.instance = new lib.CachedBmp_40();
	this.instance.setTransform(-4,-3.4,0.3562,0.3562);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,435.3,39.9);


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
	this.instance = new lib.CachedBmp_39();
	this.instance.setTransform(-4,-3.4,0.3562,0.3562);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,435.3,57.699999999999996);


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
	this.instance.setTransform(-4,-3.4,0.3562,0.3562);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,242.2,39.9);


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
	this.instance.setTransform(-4,-3.7,0.3562,0.3562);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.7,191.7,33.2);


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
	this.instance = new lib.CachedBmp_36();
	this.instance.setTransform(-4,-3.7,0.356,0.356);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.7,97.2,33.1);


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
	this.instance = new lib.CachedBmp_35();
	this.instance.setTransform(-4,-3.7,0.3562,0.3562);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.7,62.7,33.2);


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
	this.instance = new lib.CachedBmp_34();
	this.instance.setTransform(-4,-3.7,0.3562,0.3562);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.7,83.4,33.2);


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
	this.instance = new lib.CachedBmp_33();
	this.instance.setTransform(-4,-3.7,0.3562,0.3562);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.7,128.3,33.2);


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
	this.instance = new lib.CachedBmp_32();
	this.instance.setTransform(-4,-3.7,0.3562,0.3562);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.7,100.5,33.2);


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
	this.instance = new lib.CachedBmp_31();
	this.instance.setTransform(-4,-3.7,0.3562,0.3562);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.7,81.2,33.2);


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
	this.instance = new lib.CachedBmp_30();
	this.instance.setTransform(-4,-3.7,0.3562,0.3562);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.7,83,33.2);


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
	this.instance = new lib.CachedBmp_29();
	this.instance.setTransform(-4,-3.7,0.3562,0.3562);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.7,83.4,33.2);


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
	this.instance = new lib.CachedBmp_28();
	this.instance.setTransform(0,0,0.3562,0.3562);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,425,27.1);


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
	this.instance = new lib.CachedBmp_27();
	this.instance.setTransform(-4,-3.4,0.3562,0.3562);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,261.5,39.9);


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
	this.instance = new lib.CachedBmp_26();
	this.instance.setTransform(-4,-3.4,0.3562,0.3562);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,421,75.5);


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
	this.instance = new lib.CachedBmp_25();
	this.instance.setTransform(-4,-3.4,0.3562,0.3562);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,418.2,39.9);


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
	this.instance = new lib.CachedBmp_24();
	this.instance.setTransform(-4,-3.4,0.3562,0.3562);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,418.2,57.699999999999996);


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
	this.instance = new lib.CachedBmp_23();
	this.instance.setTransform(-4,-3.4,0.3562,0.3562);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,420,57.699999999999996);


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
	this.instance = new lib.CachedBmp_22();
	this.instance.setTransform(-4,-30.4,0.3562,0.3562);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-30.4,422.8,57.7);


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
	this.instance = new lib.CachedBmp_21();
	this.instance.setTransform(-4,-3.4,0.3562,0.3562);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,423.9,57.699999999999996);


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
	this.instance = new lib.CachedBmp_20();
	this.instance.setTransform(-4,-3.7,0.3562,0.3562);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.7,98.7,33.2);


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
	this.instance = new lib.CachedBmp_19();
	this.instance.setTransform(-4,-3.7,0.3562,0.3562);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.7,76.2,33.2);


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
	this.instance = new lib.CachedBmp_18();
	this.instance.setTransform(-4,-3.7,0.3562,0.3562);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.7,183.1,33.2);


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
	this.instance = new lib.CachedBmp_17();
	this.instance.setTransform(-4,-3.7,0.3562,0.3562);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.7,197.4,33.2);


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
	this.instance = new lib.CachedBmp_16();
	this.instance.setTransform(-4,-3.7,0.3562,0.3562);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.7,176,33.2);


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
	this.instance = new lib.CachedBmp_15();
	this.instance.setTransform(0,0,0.3562,0.3562);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,397.2,50.6);


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
	this.instance = new lib.CachedBmp_14();
	this.instance.setTransform(-4,-3.4,0.3562,0.3562);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,430.7,39.9);


(lib.text27 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(-4,-3.4,0.3562,0.3562);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,422.1,57.699999999999996);


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
	this.instance = new lib.CachedBmp_12();
	this.instance.setTransform(-4,-3.4,0.3562,0.3562);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,418.2,57.699999999999996);


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
	this.instance = new lib.CachedBmp_11();
	this.instance.setTransform(-4,-3.4,0.3562,0.3562);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,423.9,75.5);


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
	this.instance = new lib.CachedBmp_10();
	this.instance.setTransform(-4,-3.4,0.3562,0.3562);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,422.1,57.699999999999996);


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
	this.instance = new lib.CachedBmp_9();
	this.instance.setTransform(-4,-3.4,0.3562,0.3562);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,434.2,75.5);


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
	this.instance = new lib.CachedBmp_8();
	this.instance.setTransform(-4,-3.7,0.3562,0.3562);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.7,120.8,33.2);


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
	this.instance = new lib.CachedBmp_7();
	this.instance.setTransform(-4,-3.7,0.3562,0.3562);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.7,93,33.2);


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
	this.instance = new lib.CachedBmp_6();
	this.instance.setTransform(-4,-3.7,0.3562,0.3562);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.7,110.4,33.2);


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
	this.instance = new lib.CachedBmp_5();
	this.instance.setTransform(-4,-3.7,0.3562,0.3562);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.7,126.5,33.2);


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
	this.instance.setTransform(-4,-3.7,0.3562,0.3562);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.7,114.7,33.2);


(lib.shape148 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("ANIizIAAFnI6PAAIAAlng");
	this.shape.setTransform(81.975,-7.375);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AtHC0IAAlnIaPAAIAAFng");
	this.shape_1.setTransform(81.975,-7.375);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3,-26.4,170,38.099999999999994);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AMMBaI4XAAIAAizIYXAAg");
	this.shape.setTransform(-142.8,170.25);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AsLBaIAAizIYXAAIAACzg");
	this.shape_1.setTransform(-142.8,170.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-221.8,160.3,158,20);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("ALCizIAAFnI2DAAIAAlng");
	this.shape.setTransform(-145.325,-7.4);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("ArBC0IAAlnIWDAAIAAFng");
	this.shape_1.setTransform(-145.325,-7.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-216.9,-26.4,143.2,38);


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

	// Layer_5
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AMqhZI5TAAIAACzIZTAAg");
	this.shape.setTransform(73.9,170.25);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AspBaIAAizIZTAAIAACzg");
	this.shape_1.setTransform(73.9,170.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_4
	this.shape_2 = new cjs.Shape();
	var sprImg_shape_2 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_ce_atlas_2"],42);
	sprImg_shape_2.onload = function(){
		this.shape_2.graphics.bf(sprImg_shape_2, null, new cjs.Matrix2D(0.942,0,0,0.942,-76.3,-67)).s().p("AriKFIAA0JIXFAAIAAUJg")
	}.bind(this);
	this.shape_2.setTransform(75.875,115.025);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_3
	this.shape_3 = new cjs.Shape();
	var sprImg_shape_3 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_ce_atlas_2"],43);
	sprImg_shape_3.onload = function(){
		this.shape_3.graphics.bf(sprImg_shape_3, null, new cjs.Matrix2D(1.509,0,0,1.509,-101.9,-80)).s().p("Av6MgIAA4/If1AAIAAY/g")
	}.bind(this);
	this.shape_3.setTransform(82,-99.65);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	// Layer_2
	this.shape_4 = new cjs.Shape();
	var sprImg_shape_4 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_ce_atlas_2"],44);
	sprImg_shape_4.onload = function(){
		this.shape_4.graphics.bf(sprImg_shape_4, null, new cjs.Matrix2D(1.072,0,0,1.072,-69.2,-74)).s().p("AqzLkIAA3HIVnAAIAAXHg")
	}.bind(this);
	this.shape_4.setTransform(-143.975,92);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	// Layer_1
	this.shape_5 = new cjs.Shape();
	var sprImg_shape_5 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_ce_atlas_2"],45);
	sprImg_shape_5.onload = function(){
		this.shape_5.graphics.bf(sprImg_shape_5, null, new cjs.Matrix2D(1.135,0,0,1.135,-49.4,-91.9)).s().p("AntOXIAA8tIPbAAIAActg")
	}.bind(this);
	this.shape_5.setTransform(-145.225,-102.975);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-213.1,-194.9,397,375.20000000000005);


(lib.shape131 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#000000").s().p("AgRARQgHgGAAgLQAAgKAHgHQAIgHAJAAQAKAAAIAHQAHAHAAAKQAAALgHAGQgIAIgKAAQgJAAgIgIg");
	this.shape.setTransform(-579.5,24.65);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgRARQgHgHAAgKQAAgKAHgHQAIgHAJAAQAKAAAIAHQAHAHAAAKQAAAKgHAHQgIAIgKAAQgJAAgIgIg");
	this.shape_1.setTransform(-579.5,-31.9);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-582,-34.4,5,61.599999999999994);


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

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("ANcBaI63AAIAAizIa3AAg");
	this.shape.setTransform(-18.95,-196.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AtbBaIAAizIa3AAIAACzg");
	this.shape_1.setTransform(-18.95,-196.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	var sprImg_shape_2 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_ce_atlas_2"],41);
	sprImg_shape_2.onload = function(){
		this.shape_2.graphics.bf(sprImg_shape_2, null, new cjs.Matrix2D(0.85,0,0,0.847,-114.3,-69)).s().p("AlJKyIAAgFIstAAIAA1eMAjtAAAIAAVgItJAAIAAADg")
	}.bind(this);
	this.shape_2.setTransform(-18.675,-115);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-133,-206.9,228.7,160.9);


(lib.shape124 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AjvhZIHfAAIAACzInfAAg");
	this.shape.setTransform(-137.3,163.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AjvBaIAAizIHfAAIAACzg");
	this.shape_1.setTransform(-137.3,163.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-162.3,153.5,50.000000000000014,20);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AJEhZIyHAAIAACzISHAAg");
	this.shape.setTransform(-23,-25.25);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("ApDBaIAAizISHAAIAACzg");
	this.shape_1.setTransform(-23,-25.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-82,-35.2,118,20.000000000000004);


(lib.shape120 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#FF0000").ss(3,0,0,3).p("AiWkRIEtIj");
	this.shape.setTransform(59.625,148.325);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(43.1,119.4,33.1,57.900000000000006);


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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("ABmleIjLK9");
	this.shape.setTransform(7.225,136.275);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4.5,99.7,23.5,73.2);


(lib.shape118 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#FF0000").ss(3,0,0,3).p("AAtiaIhZE2");
	this.shape.setTransform(-48.075,140.2);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-54.1,123.2,12.100000000000001,34.10000000000001);


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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("AiTCOIEnkb");
	this.shape.setTransform(80.25,24.45);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(64,8.8,32.599999999999994,31.400000000000002);


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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("AjgB8IHBj3");
	this.shape.setTransform(-70.575,23.125);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-94.5,9.3,47.9,27.7);


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
	this.shape.graphics.f().s("#FF0000").ss(3,0,0,3).p("ABelCIi7KF");
	this.shape.setTransform(-114.625,121.95);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-125.5,88.2,21.799999999999997,67.60000000000001);


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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("ADZCEImxkH");
	this.shape.setTransform(12.2,24.4);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-11,9.8,46.4,29.3);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AmZhZIMzAAIAACzIszAAg");
	this.shape.setTransform(93.1,184.55);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AmZBaIAAizIMzAAIAACzg");
	this.shape_1.setTransform(93.1,184.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(51.1,174.6,84,20);


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

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AFUhZIAACzIqnAAIAAizg");
	this.shape.setTransform(93.2,-1.05);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AlTBaIAAizIKnAAIAACzg");
	this.shape_1.setTransform(93.2,-1.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(58.2,-11,69.99999999999999,20);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AlYhZIKxAAIAACzIqxAAg");
	this.shape.setTransform(-65.8,163.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AlYBaIAAizIKxAAIAACzg");
	this.shape_1.setTransform(-65.8,163.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-101.3,153.5,71,20);


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

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("ABwB0Ijfjn");
	this.shape.setTransform(-129.775,20.9);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	var sprImg_shape_1 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_ce_atlas_2"],40);
	sprImg_shape_1.onload = function(){
		this.shape_1.graphics.bf(sprImg_shape_1, null, new cjs.Matrix2D(0.756,0,0,0.756,-113.4,-77.5)).s().p("AxtMHIAA4NMAjbAAAIAAYNg")
	}.bind(this);
	this.shape_1.setTransform(-22,98.1);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-142.4,7.8,233.8,167.79999999999998);


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

	// Layer_5
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgRARQgHgGAAgLQAAgJAHgIQAHgHAKAAQAKAAAIAHQAHAIAAAJQAAALgHAGQgIAIgKAAQgKAAgHgIg");
	this.shape.setTransform(-601,139.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_4
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgRARQgHgGAAgLQAAgKAHgHQAHgHAKAAQAKAAAIAHQAHAHAAAKQAAALgHAGQgIAIgKAAQgKAAgHgIg");
	this.shape_1.setTransform(-601,73.6);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_3
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgJAHgIQAHgHAKAAQAKAAAIAHQAHAIAAAJQAAAKgHAIQgIAHgKAAQgKAAgHgHg");
	this.shape_2.setTransform(-601,26.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_2
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgKAHgHQAHgHAKAAQAKAAAIAHQAHAHAAAKQAAAKgHAIQgIAHgKAAQgKAAgHgHg");
	this.shape_3.setTransform(-601,-19.6);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	// Layer_1
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgRARQgHgGAAgLQAAgJAHgIQAHgHAKAAQAKAAAIAHQAHAIAAAJQAAALgHAGQgIAIgKAAQgKAAgHgIg");
	this.shape_4.setTransform(-601,-65.7);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-603.5,-68.2,5,210.2);


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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("AkakqII1JV");
	this.shape.setTransform(-29.875,146.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-59.7,115.1,59.7,62.80000000000001);


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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("ACzixIllFj");
	this.shape.setTransform(147.35,131.175);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(128,111.9,38.80000000000001,38.599999999999994);


(lib.shape91 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("Aj8kHIH5IP");
	this.shape.setTransform(75.125,123.225);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(48.3,95.3,53.7,55.89999999999999);


(lib.shape90 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("ARwAXMgjfgAt");
	this.shape.setTransform(-115.475,-55.3);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-230.5,-59,230.1,7.5);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AGkBaItHAAIAAizINHAAg");
	this.shape.setTransform(157.1,17.25);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AmjBaIAAizINHAAIAACzg");
	this.shape_1.setTransform(157.1,17.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(114.1,7.3,86,20);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AE7hZIp1AAIAACzIJ1AAg");
	this.shape.setTransform(65.5,17.25);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("Ak6BaIAAizIJ1AAIAACzg");
	this.shape_1.setTransform(65.5,17.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(33,7.3,65,20);


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

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AMvBaI5dAAIAAizIZdAAg");
	this.shape.setTransform(-115.5,169.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AsuBaIAAizIZdAAIAACzg");
	this.shape_1.setTransform(-115.5,169.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-198,159.5,165,20);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("ANhBaI7BAAIAAizIbBAAg");
	this.shape.setTransform(118.5,158.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AtgBaIAAizIbBAAIAACzg");
	this.shape_1.setTransform(118.5,158.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(31,149,175,20);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AMCBaI4DAAIAAizIYDAAg");
	this.shape.setTransform(73,186.65);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AsBBaIAAizIYDAAIAACzg");
	this.shape_1.setTransform(73,186.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-5,176.7,156,20);


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

	// Layer_8
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("AFfBmIq9jL");
	this.shape.setTransform(-16.125,-75.375);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_7
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFFFFF").ss(3,1,0,3).p("ALag5IhAhAAOvCaIhAhAANFAwIhAg/AMBC0IBABAANqDeIBBhAAJwijIhAhAAIGjzIhABAAHCiJIBABAAsYhNIBaAAAqChNIBaAAAqbisIhaAAAsxisIhaAAAuuiTIAABGIBaAAAnshNIBaAAAlWhNIBaAAAjAhNIAPAAIAAhLAjZisIhaAAAlvisIhaAAAoFisIhaAAAItgfIA/A/AKXBKIBABA");
	this.shape_1.setTransform(95.4,103.225);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#FF9900").ss(3,1,0,3).p("AttkVQgWgPgZAAQgVAAgSALAwjhhQgHApgBAwAshiXQgJgegNgbIgPgaAvvjwIgSAgQgMAYgIAbAwCDDIABADQAXAuAdAWAsvCzQARgnAJguAsPAiIABgmQAAgvgGgqAuVEaQAqgEAgguAwoAzQAFAvALApAPDlxQgjgmgrAAAM8mDQgfAWgaAwAQJjwQgIgZgLgXIgRgiAQTDOQALgqAGguAQqA6QACgcAAgeIgBgkAQnhfQgFgvgJgqALKiPQgHArgDAvAK/AIQAAAvAFArAL4EpQAXAvAZAbANZGTIAcAEQAeAAAbgTAPYFXQAQgXAOggIALgZALNCeQAIAvAPApAL0kgQgSAogMAu");
	this.shape_2.setTransform(-137.05,-72.35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1}]}).wait(1));

	// Layer_6
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#FFFFFF").ss(3,0,0,3).p("AElDgIpJAAIAAm/IJJAAg");
	this.shape_3.setTransform(-128.6,127.775);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	// Layer_5
	this.shape_4 = new cjs.Shape();
	var sprImg_shape_4 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_ce_atlas_2"],47);
	sprImg_shape_4.onload = function(){
		this.shape_4.graphics.bf(sprImg_shape_4, null, new cjs.Matrix2D(0.461,0,0,0.501,-105.4,-37.8)).s().p("AwdF6IAArzMAg7AAAIAALzg")
	}.bind(this);
	this.shape_4.setTransform(101.325,103.475);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	// Layer_4
	this.shape_5 = new cjs.Shape();
	var sprImg_shape_5 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_ce_atlas_2"],48);
	sprImg_shape_5.onload = function(){
		this.shape_5.graphics.bf(sprImg_shape_5, null, new cjs.Matrix2D(0.438,0,0,0.438,-28,-21.9)).s().p("AkXDbIAAm1IIvAAIAAG1g")
	}.bind(this);
	this.shape_5.setTransform(-128.45,127.775);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(1));

	// Layer_3
	this.shape_6 = new cjs.Shape();
	var sprImg_shape_6 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_ce_atlas_2"],49);
	sprImg_shape_6.onload = function(){
		this.shape_6.graphics.bf(sprImg_shape_6, null, new cjs.Matrix2D(0.709,0,0,0.709,-91.2,-70.9)).s().p("AuPLFIAA2JIcfAAIAAWJg")
	}.bind(this);
	this.shape_6.setTransform(98.525,-65.6);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(1));

	// Layer_2
	this.shape_7 = new cjs.Shape();
	var sprImg_shape_7 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_ce_atlas_2"],50);
	sprImg_shape_7.onload = function(){
		this.shape_7.graphics.bf(sprImg_shape_7, null, new cjs.Matrix2D(1.087,0,0,1.087,-112,-64.7)).s().p("AxfKHIAA0NMAi/AAAIAAUNg")
	}.bind(this);
	this.shape_7.setTransform(-140.5,-71.75);

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(1));

	// Layer_1
	this.shape_8 = new cjs.Shape();
	var sprImg_shape_8 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_ce_atlas_2"],51);
	sprImg_shape_8.onload = function(){
		this.shape_8.graphics.bf(sprImg_shape_8, null, new cjs.Matrix2D(1.23,0,0,1.23,-122.3,-90.4)).s().p("AzHOIIAA8PMAmOAAAIAAcPg")
	}.bind(this);
	this.shape_8.setTransform(-130.45,116.425);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-252.8,-136.5,459.5,343.3);


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
	this.shape.graphics.f("#000000").s().p("AgRARQgHgGAAgLQAAgKAHgHQAIgHAJAAQAKAAAIAHQAHAHAAAKQAAALgHAGQgIAIgKAAQgJAAgIgIg");
	this.shape.setTransform(-579.5,-99.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-582,-101.6,5,5);


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

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgRARQgHgGAAgLQAAgKAHgHQAHgHAKAAQAKAAAHAHQAIAHAAAKQAAALgIAGQgHAIgKAAQgKAAgHgIg");
	this.shape.setTransform(-532.75,-29);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_3
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgRARQgHgGAAgLQAAgKAHgHQAHgHAKAAQAKAAAHAHQAIAHAAAKQAAALgIAGQgHAIgKAAQgKAAgHgIg");
	this.shape_1.setTransform(-532.75,134.8);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgRARQgHgGAAgLQAAgJAHgIQAHgHAKAAQAKAAAHAHQAIAIAAAJQAAALgIAGQgHAIgKAAQgKAAgHgIg");
	this.shape_2.setTransform(-532.75,88.65);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgJAHgIQAHgHAKAAQAKAAAHAHQAIAIAAAJQAAAKgIAIQgHAHgKAAQgKAAgHgHg");
	this.shape_3.setTransform(-532.75,43.6);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-535.2,-31.5,5,168.8);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AmehZIM9AAIAACzIs9AAg");
	this.shape.setTransform(137.25,-66.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AmeBaIAAizIM9AAIAACzg");
	this.shape_1.setTransform(137.25,-66.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(94.8,-76.7,85.00000000000001,20);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AIchZIw3AAIAACzIQ3AAg");
	this.shape.setTransform(155.7,14.3);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AobBaIAAizIQ3AAIAACzg");
	this.shape_1.setTransform(155.7,14.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(100.7,4.3,109.99999999999999,20);


(lib.shape14 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AIchZIw3AAIAACzIQ3AAg");
	this.shape.setTransform(-81.75,16.3);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AobBaIAAizIQ3AAIAACzg");
	this.shape_1.setTransform(-81.75,16.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-136.7,6.3,109.99999999999999,20);


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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("AltgHILbAP");
	this.shape.setTransform(58.125,15.475);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(20.1,13.2,76.1,4.600000000000001);


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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("AltgHILbAP");
	this.shape.setTransform(51.625,-126.075);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(13.6,-128.3,76.10000000000001,4.500000000000014);


(lib.shape11 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("ABiBZIjDix");
	this.shape.setTransform(-27.975,33.9);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-39.3,23.5,22.699999999999996,20.799999999999997);


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

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(3,0,0,3).p("AEIj8IoPH5");
	this.shape.setTransform(-3.275,-17.225);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-31.2,-44,55.9,53.6);


(lib.shape9 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("AltgHILbAP");
	this.shape.setTransform(49.075,-66.575);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(11,-68.8,76.2,4.5);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AnfhZIO/AAIAACzIu/AAg");
	this.shape.setTransform(-120.8,-53.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AnfBaIAAizIO/AAIAACzg");
	this.shape_1.setTransform(-120.8,-53.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-169.8,-63.7,98.00000000000001,20);


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

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("AFjhWIrFCt");
	this.shape.setTransform(-73.425,-76.975);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	var sprImg_shape_1 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_ce_atlas_2"],46);
	sprImg_shape_1.onload = function(){
		this.shape_1.graphics.bf(sprImg_shape_1, null, new cjs.Matrix2D(1.004,0,0,1.004,-83.9,-194.8)).s().p("AtGecMAAAg83IaNAAMAAAA83g")
	}.bind(this);
	this.shape_1.setTransform(13.375,-1.625);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-110.4,-196.4,207.7,389.6);


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


(lib.sprite154 = function(mode,startPosition,loop,reversed) {
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
	this.frame_448 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(448).call(this.frame_448).wait(1));

	// Masked_Layer_17___13
	this.instance = new lib.text153("synched",0);
	this.instance.setTransform(-801.45,-185.95,0.9998,1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(449));

	// Masked_Layer_16___13
	this.instance_1 = new lib.text152("synched",0);
	this.instance_1.setTransform(-801.45,-99.45,0.9998,1);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(449));

	// Masked_Layer_15___13
	this.instance_2 = new lib.text151("synched",0);
	this.instance_2.setTransform(-801.45,-147.05,0.9998,1);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(449));

	// Masked_Layer_14___13
	this.instance_3 = new lib.text150("synched",0);
	this.instance_3.setTransform(-801.45,-65.95,0.9998,1);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(449));

	// Layer_12
	this.instance_4 = new lib.text149("synched",0);
	this.instance_4.setTransform(7.5,-19.85);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(449));

	// Layer_11
	this.instance_5 = new lib.shape148("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(449));

	// Layer_10
	this.instance_6 = new lib.text147("synched",0);
	this.instance_6.setTransform(-215.3,164);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(449));

	// Layer_9
	this.instance_7 = new lib.shape146("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(449));

	// Layer_8
	this.instance_8 = new lib.text145("synched",0);
	this.instance_8.setTransform(-215.25,-20.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(449));

	// Layer_7
	this.instance_9 = new lib.shape144("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(449));

	// Layer_6
	this.instance_10 = new lib.text143("synched",0);
	this.instance_10.setTransform(-1.8,164);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(449));

	// Layer_5
	this.instance_11 = new lib.shape142("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(449));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-805.4,-194.9,989.3,388.4);


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


(lib.sprite137 = function(mode,startPosition,loop,reversed) {
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
	this.frame_1158 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1158).call(this.frame_1158).wait(1));

	// Masked_Layer_54___45
	this.instance = new lib.text136("synched",0);
	this.instance.setTransform(-777.4,-66.4,0.9998,1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1159));

	// Masked_Layer_53___45
	this.instance_1 = new lib.text135("synched",0);
	this.instance_1.setTransform(-777.4,-120.5,0.9998,1);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1159));

	// Masked_Layer_52___45
	this.instance_2 = new lib.text134("synched",0);
	this.instance_2.setTransform(-777.4,-10.35,0.9998,1);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1159));

	// Masked_Layer_51___45
	this.instance_3 = new lib.text133("synched",0);
	this.instance_3.setTransform(-801.6,-186,0.9998,1);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1159));

	// Masked_Layer_50___45
	this.instance_4 = new lib.text132("synched",0);
	this.instance_4.setTransform(-801.6,48.9,0.9998,1);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1159));

	// Masked_Layer_49___45
	this.instance_5 = new lib.shape131("synched",0);
	this.instance_5.setTransform(-209.25,-27);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1159));

	// Masked_Layer_47___45
	this.instance_6 = new lib.text130("synched",0);
	this.instance_6.setTransform(-801.6,-146.5,0.9998,1);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1159));

	// Masked_Layer_46___45
	this.instance_7 = new lib.shape29("synched",0);
	this.instance_7.setTransform(-209.25,-13.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1159));

	// Layer_44
	this.instance_8 = new lib.text129("synched",0);
	this.instance_8.setTransform(-98.3,-203.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1159));

	// Layer_43
	this.instance_9 = new lib.shape128("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1159));

	// Layer_41
	this.instance_10 = new lib.text126("synched",0);
	this.instance_10.setTransform(57.75,178.3,1.0006,1);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1159));

	// Layer_40
	this.instance_11 = new lib.shape112("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(1159));

	// Layer_39
	this.instance_12 = new lib.text125("synched",0);
	this.instance_12.setTransform(-157.1,157.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(1159));

	// Layer_38
	this.instance_13 = new lib.shape124("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(1159));

	// Layer_37
	this.instance_14 = new lib.text123("synched",0);
	this.instance_14.setTransform(-95,157.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(1159));

	// Layer_36
	this.instance_15 = new lib.shape107("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(1159));

	// Layer_35
	this.instance_16 = new lib.text122("synched",0);
	this.instance_16.setTransform(-73.45,-31.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(1159));

	// Layer_34
	this.instance_17 = new lib.shape121("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(1159));

	// Layer_32
	this.instance_18 = new lib.sprite5();
	this.instance_18.setTransform(43.7,119.8,2.0326,2.0326,-30.0078);

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(1159));

	// Layer_31
	this.instance_19 = new lib.shape120("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(1159));

	// Layer_29
	this.instance_20 = new lib.sprite5();
	this.instance_20.setTransform(17.55,99.75,2.0326,2.0326,14.9924);

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(1159));

	// Layer_28
	this.instance_21 = new lib.shape119("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(1159));

	// Layer_26
	this.instance_22 = new lib.sprite5();
	this.instance_22.setTransform(-43.45,123.25,2.0326,2.0326,14.9924);

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(1159));

	// Layer_25
	this.instance_23 = new lib.shape118("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(1159));

	// Layer_23
	this.instance_24 = new lib.sprite5();
	this.instance_24.setTransform(64.5,39.75,2.0326,2.0326,-135.0073);

	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(1159));

	// Layer_22
	this.instance_25 = new lib.shape117("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(1159));

	// Layer_20
	this.instance_26 = new lib.sprite5();
	this.instance_26.setTransform(-94.2,36.3,2.0326,2.0326,-120.0074);

	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(1159));

	// Layer_19
	this.instance_27 = new lib.shape116("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_27).wait(1159));

	// Layer_17
	this.instance_28 = new lib.sprite5();
	this.instance_28.setTransform(-105.15,88.25,2.0326,2.0326,14.9924);

	this.timeline.addTween(cjs.Tween.get(this.instance_28).wait(1159));

	// Layer_16
	this.instance_29 = new lib.shape115("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_29).wait(1159));

	// Layer_14
	this.instance_30 = new lib.sprite5();
	this.instance_30.setTransform(35.2,38.05,2.0326,2.0326,119.992);

	this.timeline.addTween(cjs.Tween.get(this.instance_30).wait(1159));

	// Layer_13
	this.instance_31 = new lib.shape114("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_31).wait(1159));

	// Layer_12
	this.instance_32 = new lib.text113("synched",0);
	this.instance_32.setTransform(-32.5,178.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_32).wait(1159));

	// Layer_11
	this.instance_33 = new lib.shape112("synched",0);
	this.instance_33.setTransform(-88.8,0);

	this.timeline.addTween(cjs.Tween.get(this.instance_33).wait(1159));

	// Layer_10
	this.instance_34 = new lib.text111("synched",0);
	this.instance_34.setTransform(65.15,-6.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_34).wait(1159));

	// Layer_9
	this.instance_35 = new lib.shape109("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_35).wait(1159));

	// Layer_8
	this.instance_36 = new lib.text110("synched",0);
	this.instance_36.setTransform(-58.85,-6.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_36).wait(1159));

	// Layer_7
	this.instance_37 = new lib.shape109("synched",0);
	this.instance_37.setTransform(-123.2,0);

	this.timeline.addTween(cjs.Tween.get(this.instance_37).wait(1159));

	// Layer_6
	this.instance_38 = new lib.text108("synched",0);
	this.instance_38.setTransform(-164.95,-7.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_38).wait(1159));

	// Layer_5
	this.instance_39 = new lib.shape107("synched",0);
	this.instance_39.setTransform(-69.95,-164.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_39).wait(1159));

	// Layer_3
	this.instance_40 = new lib.sprite5();
	this.instance_40.setTransform(-117.5,33.35,2.0326,2.0326,134.9927);

	this.timeline.addTween(cjs.Tween.get(this.instance_40).wait(1159));

	// Layer_2
	this.instance_41 = new lib.shape106("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_41).wait(1159));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-805.5,-206.9,956.5,414.70000000000005);


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

	// timeline functions:
	this.frame_0 = function() {
		/* stopAllSounds ();
		*/
	}
	this.frame_1494 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1494).call(this.frame_1494).wait(1));

	// Masked_Layer_46___33
	this.instance = new lib.text101("synched",0);
	this.instance.setTransform(-811.1,-145.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1495));

	// Masked_Layer_45___33
	this.instance_1 = new lib.shape100("synched",0);
	this.instance_1.setTransform(-209.25,0);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1495));

	// Masked_Layer_40___33
	this.instance_2 = new lib.text99("synched",0);
	this.instance_2.setTransform(-800.15,65.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1495));

	// Masked_Layer_39___33
	this.instance_3 = new lib.text98("synched",0);
	this.instance_3.setTransform(-800.15,17.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1495));

	// Masked_Layer_38___33
	this.instance_4 = new lib.text97("synched",0);
	this.instance_4.setTransform(-800.15,-26.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1495));

	// Masked_Layer_37___33
	this.instance_5 = new lib.text96("synched",0);
	this.instance_5.setTransform(-800.15,-72.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1495));

	// Masked_Layer_36___33
	this.instance_6 = new lib.text95("synched",0);
	this.instance_6.setTransform(-800.15,157.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1495));

	// Masked_Layer_35___33
	this.instance_7 = new lib.shape29("synched",0);
	this.instance_7.setTransform(-230.75,-13.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1495));

	// Masked_Layer_34___33
	this.instance_8 = new lib.text94("synched",0);
	this.instance_8.setTransform(-800.15,-119.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1495));

	// Layer_31
	this.instance_9 = new lib.sprite5();
	this.instance_9.setTransform(-59.3,115.75,2.0326,2.0326,-45.0073);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1495));

	// Layer_30
	this.instance_10 = new lib.shape93("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1495));

	// Layer_28
	this.instance_11 = new lib.sprite5();
	this.instance_11.setTransform(166.1,112.25,2.0326,2.0326,44.9927);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(1495));

	// Layer_27
	this.instance_12 = new lib.shape92("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(1495));

	// Layer_25
	this.instance_13 = new lib.sprite5();
	this.instance_13.setTransform(48.7,96,2.0326,2.0326,-45.0073);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(1495));

	// Layer_24
	this.instance_14 = new lib.shape91("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(1495));

	// Layer_22
	this.instance_15 = new lib.sprite5();
	this.instance_15.setTransform(-0.5,-53.2,2.0326,2.0326,89.9927);

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(1495));

	// Layer_21
	this.instance_16 = new lib.shape90("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(1495));

	// Layer_20
	this.instance_17 = new lib.text89("synched",0);
	this.instance_17.setTransform(120.05,11);

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(1495));

	// Layer_19
	this.instance_18 = new lib.shape88("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(1495));

	// Layer_18
	this.instance_19 = new lib.text87("synched",0);
	this.instance_19.setTransform(38.6,11);

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(1495));

	// Layer_17
	this.instance_20 = new lib.shape86("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(1495));

	// Layer_16
	this.instance_21 = new lib.text85("synched",0);
	this.instance_21.setTransform(-190.9,163.25);

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(1495));

	// Layer_15
	this.instance_22 = new lib.shape84("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(1495));

	// Layer_14
	this.instance_23 = new lib.text83("synched",0);
	this.instance_23.setTransform(36.6,152.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(1495));

	// Layer_13
	this.instance_24 = new lib.shape82("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(1495));

	// Layer_12
	this.instance_25 = new lib.text81("synched",0);
	this.instance_25.setTransform(0.85,180.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(1495));

	// Layer_11
	this.instance_26 = new lib.shape80("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(1495));

	// Layer_9
	this.instance_27 = new lib.sprite5();
	this.instance_27.setTransform(20.4,-65,2.0326,2.0326,104.9926);

	this.timeline.addTween(cjs.Tween.get(this.instance_27).wait(1495));

	// Layer_8
	this.instance_28 = new lib.shape79("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_28).wait(1495));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-815.1,-149.2,1045.1,359.1);


(lib.sprite30 = function(mode,startPosition,loop,reversed) {
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
	this.frame_1214 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1214).call(this.frame_1214).wait(1));

	// Masked_Layer_41___30
	this.instance = new lib.shape29("synched",0);
	this.instance.setTransform(-162.5,-31.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1215));

	// Masked_Layer_40___30
	this.instance_1 = new lib.text28("synched",0);
	this.instance_1.setTransform(-743.85,-182.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1215));

	// Masked_Layer_39___30
	this.instance_2 = new lib.text27("synched",0);
	this.instance_2.setTransform(-732.9,54.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1215));

	// Masked_Layer_38___30
	this.instance_3 = new lib.text26("synched",0);
	this.instance_3.setTransform(-732.9,7.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1215));

	// Masked_Layer_37___30
	this.instance_4 = new lib.text25("synched",0);
	this.instance_4.setTransform(-732.9,-63.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1215));

	// Masked_Layer_36___30
	this.instance_5 = new lib.text24("synched",0);
	this.instance_5.setTransform(-732.9,98.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1215));

	// Masked_Layer_35___30
	this.instance_6 = new lib.shape23("synched",0);
	this.instance_6.setTransform(-209.25,-27);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1215));

	// Masked_Layer_31___30
	this.instance_7 = new lib.text22("synched",0);
	this.instance_7.setTransform(-732.9,-137.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1215));

	// Layer_29
	this.instance_8 = new lib.text20("synched",0);
	this.instance_8.setTransform(108.55,9.05);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1215));

	// Layer_28
	this.instance_9 = new lib.shape16("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1215));

	// Layer_27
	this.instance_10 = new lib.text19("synched",0);
	this.instance_10.setTransform(102.75,-72);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1215));

	// Layer_26
	this.instance_11 = new lib.shape18("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(1215));

	// Layer_25
	this.instance_12 = new lib.text17("synched",0);
	this.instance_12.setTransform(108.75,-132.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(1215));

	// Layer_24
	this.instance_13 = new lib.shape16("synched",0);
	this.instance_13.setTransform(-3.5,-140.65);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(1215));

	// Layer_23
	this.instance_14 = new lib.text15("synched",0);
	this.instance_14.setTransform(-131.45,10.05);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(1215));

	// Layer_22
	this.instance_15 = new lib.shape14("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(1215));

	// Layer_20
	this.instance_16 = new lib.sprite5();
	this.instance_16.setTransform(20.15,14.9,2.0326,2.0326,-90.0077);

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(1215));

	// Layer_19
	this.instance_17 = new lib.shape13("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(1215));

	// Layer_17
	this.instance_18 = new lib.sprite5();
	this.instance_18.setTransform(13.65,-126.65,2.0326,2.0326,-90.0077);

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(1215));

	// Layer_16
	this.instance_19 = new lib.shape12("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(1215));

	// Layer_14
	this.instance_20 = new lib.sprite5();
	this.instance_20.setTransform(-17,43.65,2.0326,2.0326,134.9927);

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(1215));

	// Layer_13
	this.instance_21 = new lib.shape11("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(1215));

	// Layer_11
	this.instance_22 = new lib.sprite5();
	this.instance_22.setTransform(23.95,-43.7,2.0326,2.0326,44.9927);

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(1215));

	// Layer_10
	this.instance_23 = new lib.shape10("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(1215));

	// Layer_8
	this.instance_24 = new lib.sprite5();
	this.instance_24.setTransform(11.1,-67.15,2.0326,2.0326,-90.0077);

	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(1215));

	// Layer_7
	this.instance_25 = new lib.shape9("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(1215));

	// Layer_6
	this.instance_26 = new lib.text8("synched",0);
	this.instance_26.setTransform(-164.1,-60);

	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(1215));

	// Layer_5
	this.instance_27 = new lib.shape6("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_27).wait(1215));

	// Layer_3
	this.instance_28 = new lib.sprite5();
	this.instance_28.setTransform(-36.6,-86.25,2.0326,2.0326,74.9923);

	this.timeline.addTween(cjs.Tween.get(this.instance_28).wait(1215));

	// Layer_2
	this.instance_29 = new lib.shape3("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_29).wait(1215));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-747.8,-196.4,973.0999999999999,389.6);


// stage content:
(lib.vital_opsm_ce = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {p1:0,p2:1215,p3:2711,p4:3874};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,1,1213,1214,1215,1216,2709,2710,2711,2712,3872,3873,3874,3875,4322];
	this.streamSoundSymbolsList[1] = [{id:"vital_opsm_ce1",startFrame:1,endFrame:1214,loop:1,offset:0}];
	this.streamSoundSymbolsList[1216] = [{id:"vital_opsm_ce2_rrrrr",startFrame:1216,endFrame:2710,loop:1,offset:0}];
	this.streamSoundSymbolsList[2712] = [{id:"vital_opsm_ce3_rrrrr",startFrame:2712,endFrame:3873,loop:1,offset:0}];
	this.streamSoundSymbolsList[3875] = [{id:"vital_opsm_ce4_rrrrr",startFrame:3875,endFrame:4322,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		InitPage(4);
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
			GetUrlMain("vitalmenu_ce");
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
		var soundInstance = playSound("vital_opsm_ce1",0);
		this.InsertIntoSoundStreamData(soundInstance,1,1214,1);
	}
	this.frame_1213 = function() {
		this.stop();
	}
	this.frame_1214 = function() {
		this.stop();
	}
	this.frame_1215 = function() {
		Prev(1);
		InitAnim();
	}
	this.frame_1216 = function() {
		var soundInstance = playSound("vital_opsm_ce2_rrrrr",0);
		this.InsertIntoSoundStreamData(soundInstance,1216,2710,1);
	}
	this.frame_2709 = function() {
		this.stop();
	}
	this.frame_2710 = function() {
		this.stop();
	}
	this.frame_2711 = function() {
		Next(1);
		InitAnim();
	}
	this.frame_2712 = function() {
		var soundInstance = playSound("vital_opsm_ce3_rrrrr",0);
		this.InsertIntoSoundStreamData(soundInstance,2712,3873,1);
	}
	this.frame_3872 = function() {
		this.stop();
	}
	this.frame_3873 = function() {
		this.stop();
	}
	this.frame_3874 = function() {
		Next(0);
		InitAnim();
	}
	this.frame_3875 = function() {
		var soundInstance = playSound("vital_opsm_ce4_rrrrr",0);
		this.InsertIntoSoundStreamData(soundInstance,3875,4322,1);
	}
	this.frame_4322 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1212).call(this.frame_1213).wait(1).call(this.frame_1214).wait(1).call(this.frame_1215).wait(1).call(this.frame_1216).wait(1493).call(this.frame_2709).wait(1).call(this.frame_2710).wait(1).call(this.frame_2711).wait(1).call(this.frame_2712).wait(1160).call(this.frame_3872).wait(1).call(this.frame_3873).wait(1).call(this.frame_3874).wait(1).call(this.frame_3875).wait(447).call(this.frame_4322).wait(1));

	// Layer_61
	this.instance = new lib.text35("synched",0);
	this.instance.setTransform(10,0,1.4037,1.4037);

	this.instance_1 = new lib.text104("synched",0);
	this.instance_1.setTransform(10,0,1.4037,1.4037);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1215).wait(3108));

	// Layer_back
	this.back = new lib.buttonbak();
	this.back.name = "back";
	this.back.setTransform(350,645,1.0001,1.0002);
	new cjs.ButtonHelper(this.back, 0, 1, 2, false, new lib.buttonbak(), 3);

	this.timeline.addTween(cjs.Tween.get(this.back).wait(4323));

	// Layer_page
	this.page = new cjs.Text("Page number", "italic bold 15px 'Arial'", "#FF9900");
	this.page.name = "page";
	this.page.lineHeight = 17;
	this.page.lineWidth = 193;
	this.page.parent = this;
	this.page.setTransform(23,658,1.4989,1.4989);

	this.timeline.addTween(cjs.Tween.get(this.page).wait(4323));

	// Layer_next
	this.next = new lib.buttonnext();
	this.next.name = "next";
	this.next.setTransform(1496.1,5.1,0.9998,0.9999,0,0,0,0.1,0.1);
	new cjs.ButtonHelper(this.next, 0, 1, 2, false, new lib.buttonnext(), 3);

	this.timeline.addTween(cjs.Tween.get(this.next).wait(4323));

	// Layer_previous
	this.previous = new lib.buttonprev();
	this.previous.name = "previous";
	this.previous.setTransform(1432,5,1.0003,0.9993);
	new cjs.ButtonHelper(this.previous, 0, 1, 2, false, new lib.buttonprev(), 3);

	this.timeline.addTween(cjs.Tween.get(this.previous).wait(4323));

	// Layer_slider
	this.slider = new lib.sprite_slider();
	this.slider.name = "slider";
	this.slider.setTransform(610.1,670.1,0.9937,0.9983,0,0,0,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.slider).wait(4323));

	// Layer_replay
	this.replay = new lib.sprite_replay();
	this.replay.name = "replay";
	this.replay.setTransform(1045.1,650.1,0.9999,0.9999,0,0,0,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.replay).wait(4323));

	// Layer_slider_base
	this.instance_2 = new lib.sprite_sliderbase();
	this.instance_2.setTransform(600,650,1,0.9999);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(4323));

	// Layer_playpau
	this.playpau = new lib.sprite_playpau();
	this.playpau.name = "playpau";
	this.playpau.setTransform(555,650,0.9999,0.9999);

	this.timeline.addTween(cjs.Tween.get(this.playpau).wait(4323));

	// Mask_Layer_1 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("Eh8/AyyMAAAhfTMD5/AAAMAAABfTg");
	mask.setTransform(800,325);

	// Masked_Layer_2___1
	this.ani1 = new lib.sprite30();
	this.ani1.name = "ani1";
	this.ani1.setTransform(1076,337.1,1.4037,1.4037);

	this.ani2 = new lib.sprite102();
	this.ani2.name = "ani2";
	this.ani2.setTransform(1168,285.75,1.4037,1.4037);

	this.ani3 = new lib.sprite137();
	this.ani3.name = "ani3";
	this.ani3.setTransform(1154,341.55,1.4037,1.4037);

	this.ani4 = new lib.sprite154();
	this.ani4.name = "ani4";
	this.ani4.setTransform(1154,341.55,1.4037,1.4037);

	var maskedShapeInstanceList = [this.ani1,this.ani2,this.ani3,this.ani4];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.ani1}]}).to({state:[{t:this.ani2}]},1215).to({state:[{t:this.ani3}]},1496).to({state:[{t:this.ani4}]},1163).wait(449));

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
		{src:"images/vital_opsm_ce_atlas_1.png", id:"vital_opsm_ce_atlas_1"},
		{src:"images/vital_opsm_ce_atlas_2.png", id:"vital_opsm_ce_atlas_2"},
		{src:"sounds/vital_opsm_ce1.mp3", id:"vital_opsm_ce1"},
		{src:"sounds/vital_opsm_ce2_rrrrr.mp3", id:"vital_opsm_ce2_rrrrr"},
		{src:"sounds/vital_opsm_ce3_rrrrr.mp3", id:"vital_opsm_ce3_rrrrr"},
		{src:"sounds/vital_opsm_ce4_rrrrr.mp3", id:"vital_opsm_ce4_rrrrr"}
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