(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"vital_acc_ssw_atlas_1", frames: [[0,1589,1243,281],[0,869,954,718],[0,0,1155,867]]},
		{name:"vital_acc_ssw_atlas_2", frames: [[0,283,1246,227],[0,1495,1100,173],[0,1670,1076,173],[0,970,1252,173],[0,512,1107,227],[0,1320,1125,173],[0,741,1100,227],[0,1845,1398,110],[0,1145,1246,173],[0,0,1243,281]]},
		{name:"vital_acc_ssw_atlas_3", frames: [[0,501,1036,120],[1306,342,517,155],[1306,499,514,155],[0,745,1034,99],[0,122,1353,110],[0,379,1131,120],[0,0,1273,120],[0,623,951,120],[0,846,518,99],[520,846,468,99],[0,960,1242,82],[1878,632,156,105],[1878,739,155,99],[1620,851,299,99],[1505,952,201,105],[0,234,959,143],[1133,234,171,724],[1921,840,113,53],[1244,960,60,60],[1708,952,276,53],[1306,912,197,148],[1825,220,203,246],[1355,0,428,340],[1825,468,220,162],[1785,0,243,218],[1306,656,312,254],[1620,656,256,193]]}
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



(lib.CachedBmp_374 = function() {
	this.initialize(ss["vital_acc_ssw_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_373 = function() {
	this.initialize(ss["vital_acc_ssw_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_372 = function() {
	this.initialize(ss["vital_acc_ssw_atlas_2"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_371 = function() {
	this.initialize(ss["vital_acc_ssw_atlas_3"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_370 = function() {
	this.initialize(ss["vital_acc_ssw_atlas_2"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_369 = function() {
	this.initialize(ss["vital_acc_ssw_atlas_3"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_368 = function() {
	this.initialize(ss["vital_acc_ssw_atlas_3"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_367 = function() {
	this.initialize(ss["vital_acc_ssw_atlas_3"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_366 = function() {
	this.initialize(ss["vital_acc_ssw_atlas_3"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_365 = function() {
	this.initialize(ss["vital_acc_ssw_atlas_2"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_364 = function() {
	this.initialize(ss["vital_acc_ssw_atlas_2"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_363 = function() {
	this.initialize(ss["vital_acc_ssw_atlas_2"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_362 = function() {
	this.initialize(ss["vital_acc_ssw_atlas_3"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_361 = function() {
	this.initialize(ss["vital_acc_ssw_atlas_3"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_360 = function() {
	this.initialize(ss["vital_acc_ssw_atlas_3"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_359 = function() {
	this.initialize(ss["vital_acc_ssw_atlas_2"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_358 = function() {
	this.initialize(ss["vital_acc_ssw_atlas_3"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_357 = function() {
	this.initialize(ss["vital_acc_ssw_atlas_3"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_356 = function() {
	this.initialize(ss["vital_acc_ssw_atlas_3"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_355 = function() {
	this.initialize(ss["vital_acc_ssw_atlas_2"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_354 = function() {
	this.initialize(ss["vital_acc_ssw_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_353 = function() {
	this.initialize(ss["vital_acc_ssw_atlas_2"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_352 = function() {
	this.initialize(ss["vital_acc_ssw_atlas_3"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_351 = function() {
	this.initialize(ss["vital_acc_ssw_atlas_3"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_350 = function() {
	this.initialize(ss["vital_acc_ssw_atlas_3"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_349 = function() {
	this.initialize(ss["vital_acc_ssw_atlas_3"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_348 = function() {
	this.initialize(ss["vital_acc_ssw_atlas_3"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_347 = function() {
	this.initialize(ss["vital_acc_ssw_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_346 = function() {
	this.initialize(ss["vital_acc_ssw_atlas_3"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_345 = function() {
	this.initialize(ss["vital_acc_ssw_atlas_3"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_344 = function() {
	this.initialize(ss["vital_acc_ssw_atlas_3"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_343 = function() {
	this.initialize(ss["vital_acc_ssw_atlas_3"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.image103 = function() {
	this.initialize(ss["vital_acc_ssw_atlas_3"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.image2 = function() {
	this.initialize(ss["vital_acc_ssw_atlas_3"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.image3 = function() {
	this.initialize(ss["vital_acc_ssw_atlas_3"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.image72 = function() {
	this.initialize(ss["vital_acc_ssw_atlas_3"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.image73 = function() {
	this.initialize(ss["vital_acc_ssw_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.image92 = function() {
	this.initialize(ss["vital_acc_ssw_atlas_3"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.image93 = function() {
	this.initialize(ss["vital_acc_ssw_atlas_3"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.image99 = function() {
	this.initialize(ss["vital_acc_ssw_atlas_3"]);
	this.gotoAndStop(26);
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
	this.instance = new lib.CachedBmp_374();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,414.7,75.5);


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
	this.instance = new lib.CachedBmp_373();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,366.09999999999997,57.599999999999994);


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
	this.instance = new lib.CachedBmp_372();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,358.09999999999997,57.599999999999994);


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
	this.instance = new lib.CachedBmp_371();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,344.79999999999995,39.9);


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
	this.instance = new lib.CachedBmp_370();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,416.7,57.599999999999994);


(lib.text106 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_369();
	this.instance.setTransform(-3.95,-3.65,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.6,172.1,51.6);


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
	this.instance = new lib.CachedBmp_368();
	this.instance.setTransform(-3.95,-2.65,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-2.6,171.1,51.6);


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
	this.instance = new lib.CachedBmp_367();
	this.instance.setTransform(-3.95,-3.65,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.6,344.09999999999997,32.9);


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
	this.instance = new lib.CachedBmp_366();
	this.instance.setTransform(-3.95,-3.9,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.9,450.29999999999995,36.6);


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
	this.instance = new lib.CachedBmp_365();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,368.4,75.5);


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
	this.instance = new lib.CachedBmp_364();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,374.4,57.599999999999994);


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
	this.instance = new lib.CachedBmp_363();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,366.09999999999997,75.5);


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
	this.instance = new lib.CachedBmp_362();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,376.4,39.9);


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
	this.instance = new lib.CachedBmp_361();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,423.7,39.9);


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
	this.instance = new lib.CachedBmp_360();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,316.5,39.9);


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
	this.instance = new lib.CachedBmp_359();
	this.instance.setTransform(-3.95,-3.9,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.9,465.29999999999995,36.6);


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
	this.instance = new lib.CachedBmp_358();
	this.instance.setTransform(37.15,-3.65,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(37.2,-3.6,172.39999999999998,32.9);


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
	this.instance = new lib.CachedBmp_357();
	this.instance.setTransform(37.15,-3.65,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(37.2,-3.6,155.8,32.9);


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
	this.instance = new lib.CachedBmp_356();
	this.instance.setTransform(0,0,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,413.4,27.3);


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
	this.instance = new lib.CachedBmp_355();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,414.7,57.599999999999994);


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
	this.instance = new lib.CachedBmp_354();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,413.7,93.5);


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
	this.instance = new lib.CachedBmp_353();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,413.7,93.5);


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
	this.instance = new lib.CachedBmp_352();
	this.instance.setTransform(0,-4.6,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-4.6,52,35);


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
	this.instance = new lib.CachedBmp_351();
	this.instance.setTransform(-3.95,-3.65,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.6,51.6,32.9);


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
	this.instance = new lib.CachedBmp_350();
	this.instance.setTransform(-3.95,-3.65,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.6,99.5,32.9);


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
	this.instance = new lib.CachedBmp_349();
	this.instance.setTransform(0,-4.6,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-4.6,66.9,35);


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
	this.instance = new lib.CachedBmp_348();
	this.instance.setTransform(-3.95,-3.65,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.6,319.2,47.6);


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
	this.shape.graphics.f().s("#FFFFFF").ss(1,0,0,3).p("AAAAOIAAgb");
	this.shape.setTransform(-239.2,190.25);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-240.2,187.9,2,4.799999999999983);


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
	this.shape.graphics.f().s("#FF9900").ss(3,1,0,3).p("AKKjwIAAgTIgpAAAKKDvIAAg8AKKB3IAAg8AKKAAIAAg8AKKh4IAAg8AkikDIg8AAAmakDIg8AAAoSkDIg8AAAqJkCIAAA8ABFkDIg8AAAgykDIg8AAAiqkDIg8AAAIlkDIg8AAAGtkDIg8AAAE1kDIg8AAAC9kDIg8AAAC+EEIA8AAAE2EEIA8AAAGuEEIA8AAAipEEIA8AAAgxEEIA7AAABGEEIA8AAAoREEIA8AAAmZEEIA8AAAqJiKIAAA8AqJgSIAAA7AqJBlIAAA8AqJDdIAAAnIA8AAAkhEEIA8AAAImEEIA8AA");
	this.shape.setTransform(-55.125,18.8);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-121.6,-8.7,133,55);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("ANmEOI7LAAIAAobIbLAAg");
	this.shape.setTransform(144.975,56.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AtlEOIAAobIbLAAIAAIbg");
	this.shape_1.setTransform(144.975,56.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(57,28.9,176,56.00000000000001);


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
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("ADFA1ImJhp");
	this.shape.setTransform(44.35,33.85);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.shape_1 = new cjs.Shape();
	var sprImg_shape_1 = cjs.SpriteSheetUtils.extractFrame(ss["vital_acc_ssw_atlas_3"],20);
	sprImg_shape_1.onload = function(){
		this.shape_1.graphics.bf(sprImg_shape_1, null, new cjs.Matrix2D(1.201,0,0,1.201,-118.3,-88.8)).s().p("AyeN4IAA7vMAk9AAAIAAbvg")
	}.bind(this);
	this.shape_1.setTransform(-1.775,83.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#FF9900").ss(3,1,0,3).p("AI9jyIg+gOAFLkXIg8gDAHDkLIg8gHAggkLIg7AIABbkWIg7AFADTkbIg8ACAA9EJIA7gJAg4EVIA8gGAINCVQAbgLAZgMQAcgNAYgOAGdC+IA5gTAEpDeIA6gPACzD3IA7gMAMHh5QgMgagagWAL8gKQASgbADgdAKnBFQAbgSAUgSAKujJIg3gYAnuigIg3AXAl9jGIg5ASAkKjkIg6AOAq9gzQgaAUgRAUApahwIgzAcAqQDZQAaAKAfAKAr2CVQASAVAdATAsIAmQgKAaADAaIAAAEAobD8IA8AMAkqEbIA9ABAmjERIA9AGAixEbIA8gCAiWj6Ig6AK");
	this.shape_2.setTransform(16.8404,-58.225);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-120,-88.1,236.5,260.5);


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

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AtbkNIa3AAIAAIbI63AAg");
	this.shape.setTransform(-122,-146.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AtbEOIAAobIa3AAIAAIbg");
	this.shape_1.setTransform(-122,-146.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-209,-174.2,174,55.999999999999986);


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

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("AhlivIDLFg");
	this.shape.setTransform(-38.825,-102.55);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.shape_1 = new cjs.Shape();
	var sprImg_shape_1 = cjs.SpriteSheetUtils.extractFrame(ss["vital_acc_ssw_atlas_3"],26);
	sprImg_shape_1.onload = function(){
		this.shape_1.graphics.bf(sprImg_shape_1, null, new cjs.Matrix2D(0.924,0,0,0.924,-118.2,-89.1)).s().p("AydN8IAA72MAk8AAAIAAb2g")
	}.bind(this);
	this.shape_1.setTransform(-1.65,-104.55);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#FFFFFF").ss(3,0,0,3).p("AyWAAMAktAAA");
	this.shape_2.setTransform(-2.625,-193.2);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-121.6,-194.7,238.2,179.29999999999998);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AZABaMgx/AAAIAAizMAx/AAAg");
	this.shape.setTransform(15.9,122.35);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.498)").s().p("A4/BaIAAizMAx/AAAIAACzg");
	this.shape_1.setTransform(15.9,122.35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-145.1,112.4,322,20);


(lib.shape94 = function(mode,startPosition,loop,reversed) {
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
	var sprImg_shape = cjs.SpriteSheetUtils.extractFrame(ss["vital_acc_ssw_atlas_3"],24);
	sprImg_shape.onload = function(){
		this.shape.graphics.bf(sprImg_shape, null, new cjs.Matrix2D(1,0,0,1,-121.5,-109)).s().p("Ay+RCMAAAgiDMAl9AAAMAAAAiDg")
	}.bind(this);
	this.shape.setTransform(116.6,-14.95);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_3
	this.shape_1 = new cjs.Shape();
	var sprImg_shape_1 = cjs.SpriteSheetUtils.extractFrame(ss["vital_acc_ssw_atlas_3"],25);
	sprImg_shape_1.onload = function(){
		this.shape_1.graphics.bf(sprImg_shape_1, null, new cjs.Matrix2D(0.861,0,0,0.861,-134.2,-109.3)).s().p("A0+RFMAAAgiJMAp8AAAMAAAAiJg")
	}.bind(this);
	this.shape_1.setTransform(-146.45,-14.65);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("EgkqADTIAAmlMBJUAAAIAAGlg");
	this.shape_2.setTransform(2.45,-211.675);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#FFFFFF").ss(5,0,0,3).p("AAAnsIAABQAAA95IAASxAAAl0MAAAAju");
	this.shape_3.setTransform(11.5,2.075);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-280.7,-232.7,518.8,428.7);


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

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgRARQgHgHAAgKQAAgKAHgHQAHgHAKAAQAKAAAHAHQAIAHAAAKQAAAKgIAHQgHAIgKAAQgKAAgHgIg");
	this.shape.setTransform(-547.5,71.9);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgRARQgHgHAAgKQAAgKAHgHQAHgHAKAAQAKAAAHAHQAIAHAAAKQAAAKgIAHQgHAIgKAAQgKAAgHgIg");
	this.shape_1.setTransform(-547.5,21.2);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgJAHgIQAHgHAKAAQAKAAAHAHQAIAIAAAJQAAAKgIAIQgHAHgKAAQgKAAgHgHg");
	this.shape_2.setTransform(-547.5,-43.8);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-550,-46.3,5,120.7);


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
	this.shape.graphics.f("#000000").s().p("AgRARQgHgHAAgKQAAgKAHgHQAIgHAJAAQALAAAGAHQAIAHAAAKQAAAKgIAHQgGAIgLAAQgJAAgIgIg");
	this.shape.setTransform(-547.65,-24.25);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-550.1,-26.7,5,5);


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

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("EgozADTIAAmlMBRnAAAIAAGlg");
	this.shape.setTransform(8.9,208.425);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFFFFF").ss(1,0,0,3).p("AAAAOIAAgb");
	this.shape_1.setTransform(-239.2,190.25);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-252.2,187.4,522.3,42.099999999999994);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("ALkBaI3HAAIAAizIXHAAg");
	this.shape.setTransform(-105.3,89.25);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("ArjBaIAAizIXHAAIAACzg");
	this.shape_1.setTransform(-105.3,89.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-180.3,79.3,150,20);


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
	this.shape.graphics.f().s("#FF0000").ss(3,0,0,3).p("ABjioIjEFR");
	this.shape.setTransform(-71.75,63.9);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-83.1,45.5,22.699999999999996,36.8);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AqdhZIU7AAIAACzI07AAg");
	this.shape.setTransform(-121.1,-24.15);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AqdBaIAAizIU7AAIAACzg");
	this.shape_1.setTransform(-121.1,-24.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-189.1,-34.1,136,20);


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
	this.shape.graphics.f("#FF0000").s().p("AAIAXIgPAAIgbAJIAjhAIAiBBg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.5,-3.3,7,6.699999999999999);


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

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("ADUlrImnLX");
	this.shape.setTransform(-138.075,-68.6);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_3
	this.instance = new lib.CachedBmp_347();
	this.instance.setTransform(-197.65,-154.75,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_2
	this.shape_1 = new cjs.Shape();
	var sprImg_shape_1 = cjs.SpriteSheetUtils.extractFrame(ss["vital_acc_ssw_atlas_3"],23);
	sprImg_shape_1.onload = function(){
		this.shape_1.graphics.bf(sprImg_shape_1, null, new cjs.Matrix2D(1,0,0,1,-110,-81)).s().p("AxLMqIAA5TMAiXAAAIAAZTg")
	}.bind(this);
	this.shape_1.setTransform(-121.15,-112.75);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	var sprImg_shape_2 = cjs.SpriteSheetUtils.extractFrame(ss["vital_acc_ssw_atlas_1"],2);
	sprImg_shape_2.onload = function(){
		this.shape_2.graphics.bf(sprImg_shape_2, null, new cjs.Matrix2D(0.393,0,0,0.44,-227.1,-190.8)).s().p("EgjfAd0MAAAg7nMBG/AAAMAAAA7ng")
	}.bind(this);
	this.shape_2.setTransform(0,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-231.1,-193.7,458.29999999999995,384.5);


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
	this.shape.graphics.f().s("#0000FF").ss(3,1,0,3).p("ANcqGQgJVQ6uhH");
	this.shape.setTransform(57,-143.174);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-30.5,-209.3,175,132.3);


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
	this.shape.graphics.f().s("#333333").ss(2,0,0,3).p("AEhizIAAFnIpBAAIAAlng");
	this.shape.setTransform(-130.675,-191.175);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.749)").s().p("AkgC0IAAlnIJBAAIAAFng");
	this.shape_1.setTransform(-130.675,-191.175);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-160.5,-210.1,59.7,37.900000000000006);


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

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#333333").ss(2,0,0,3).p("ADSBaImjAAIAAizIGjAAg");
	this.shape.setTransform(15,75.35);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AjRBaIAAizIGjAAIAACzg");
	this.shape_1.setTransform(15,75.35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-7,65.4,44,20);


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

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#333333").ss(2,0,0,3).p("AnzhZIPnAAIAACzIvnAAg");
	this.shape.setTransform(-286.9,-31.25);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.749)").s().p("AnzBaIAAizIPnAAIAACzg");
	this.shape_1.setTransform(-286.9,-31.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-337.9,-41.2,101.99999999999997,20.000000000000004);


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
	this.shape.graphics.f().s("#333333").ss(2,0,0,3).p("AGGC0IsLAAIAAlnIMLAAg");
	this.shape.setTransform(11,-185.575);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.749)").s().p("AmFC0IAAlnIMLAAIAAFng");
	this.shape_1.setTransform(11,-185.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-29,-204.5,80,37.900000000000006);


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
	this.instance = new lib.CachedBmp_346();
	this.instance.setTransform(-85.95,-211.95,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-85.9,-211.9,56.900000000000006,241);


(lib.shape6b = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#0000FF").s().p("AAIAXIgPAAIgbAJIAjhAIAiBBg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.5,-3.3,7,6.699999999999999);


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
	this.shape.graphics.f("#CC6600").s().p("AAIAXIgPAAIgbAJIAjhAIAiBBg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.5,-3.3,7,6.699999999999999);


(lib.shape5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
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

	// Layer_2
	this.shape = new cjs.Shape();
	var sprImg_shape = cjs.SpriteSheetUtils.extractFrame(ss["vital_acc_ssw_atlas_3"],21);
	sprImg_shape.onload = function(){
		this.shape.graphics.bf(sprImg_shape, null, new cjs.Matrix2D(0.65,0,0,0.65,-66,-79.9)).s().p("AqTMfIAA49IUnAAIAAY9g")
	}.bind(this);
	this.shape.setTransform(142.025,180);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	var sprImg_shape_1 = cjs.SpriteSheetUtils.extractFrame(ss["vital_acc_ssw_atlas_3"],22);
	sprImg_shape_1.onload = function(){
		this.shape_1.graphics.bf(sprImg_shape_1, null, new cjs.Matrix2D(1,0,0,1,-214,-170)).s().p("EghbAakMAAAg1HMBC3AAAMAAAA1Hg")
	}.bind(this);
	this.shape_1.setTransform(-6,-1.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-220,-171.5,428,431.5);


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
	this.instance = new lib.CachedBmp_345();
	this.instance.setTransform(5,12,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_344();
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
	this.instance = new lib.CachedBmp_343();
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


(lib.sprite76 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.shape75("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite76, new cjs.Rectangle(-3.5,-3.3,7,6.699999999999999), null);


(lib.sprite7b = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.shape6b("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite7b, new cjs.Rectangle(-3.5,-3.3,7,6.699999999999999), null);


(lib.sprite7 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.shape6("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite7, new cjs.Rectangle(-3.5,-3.3,7,6.699999999999999), null);


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


(lib.sprite114 = function(mode,startPosition,loop,reversed) {
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

	// Masked_Layer_39___31
	this.instance = new lib.text113("synched",0);
	this.instance.setTransform(-731.45,12.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(790));

	// Masked_Layer_38___31
	this.instance_1 = new lib.shape86("synched",0);
	this.instance_1.setTransform(-146.3,-6.65);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(790));

	// Masked_Layer_37___31
	this.instance_2 = new lib.text112("synched",0);
	this.instance_2.setTransform(-686.45,-40);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(790));

	// Masked_Layer_36___31
	this.instance_3 = new lib.text111("synched",0);
	this.instance_3.setTransform(-686.45,-91.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(790));

	// Masked_Layer_35___31
	this.instance_4 = new lib.text110("synched",0);
	this.instance_4.setTransform(-731.45,-183.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(790));

	// Masked_Layer_34___31
	this.instance_5 = new lib.shape86("synched",0);
	this.instance_5.setTransform(-146.3,-57.85);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(790));

	// Masked_Layer_33___31
	this.instance_6 = new lib.text109("synched",0);
	this.instance_6.setTransform(-731.45,-135.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(790));

	// Masked_Layer_32___31
	this.instance_7 = new lib.text84("synched",0);
	this.instance_7.setTransform(-731.45,-160);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(790));

	// Layer_30
	this.instance_8 = new lib.shape108("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(790));

	// Layer_29
	this.instance_9 = new lib.shape107("synched",0);
	this.instance_9.setTransform(-3.05,38.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(790));

	// Layer_28
	this.instance_10 = new lib.text106("synched",0);
	this.instance_10.setTransform(60.3,72.85);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(790));

	// Layer_27
	this.instance_11 = new lib.shape105("synched",0);
	this.instance_11.setTransform(-3.05,38.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(790));

	// Layer_25
	this.instance_12 = new lib.sprite76();
	this.instance_12.setTransform(20.6,67.1,1.3551,1.3551,-75.0065);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(790));

	// Layer_24
	this.instance_13 = new lib.shape104("synched",0);
	this.instance_13.setTransform(-3.05,38.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(790));

	// Layer_21
	this.instance_14 = new lib.text102("synched",0);
	this.instance_14.setTransform(-206.65,-130.25);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(790));

	// Layer_20
	this.instance_15 = new lib.shape101("synched",0);
	this.instance_15.setTransform(-3.05,38.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(790));

	// Layer_18
	this.instance_16 = new lib.sprite76();
	this.instance_16.setTransform(-31.15,-45.35,1.3551,1.3551,149.9933);

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(790));

	// Layer_17
	this.instance_17 = new lib.shape100("synched",0);
	this.instance_17.setTransform(-3.05,38.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(790));

	// Layer_14
	this.instance_18 = new lib.text82("synched",0);
	this.instance_18.setTransform(-224,-177.05);
	this.instance_18.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(790));

	// Layer_13
	this.instance_19 = new lib.text81("synched",0);
	this.instance_19.setTransform(-218.2,120.7);
	this.instance_19.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(790));

	// Layer_12
	this.instance_20 = new lib.shape80("synched",0);
	this.instance_20.setTransform(-0.05,38.7);
	this.instance_20.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(790));

	// Layer_10
	this.instance_21 = new lib.sprite76();
	this.instance_21.setTransform(-61.5,84.8,1.3551,1.3551,29.9914);
	this.instance_21.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(790));

	// Layer_9
	this.instance_22 = new lib.shape79("synched",0);
	this.instance_22.setTransform(-0.05,38.7);
	this.instance_22.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(790));

	// Layer_8
	this.instance_23 = new lib.text78("synched",0);
	this.instance_23.setTransform(-226.4,7.3);
	this.instance_23.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(790));

	// Layer_7
	this.instance_24 = new lib.shape77("synched",0);
	this.instance_24.setTransform(-0.05,38.7);
	this.instance_24.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(790));

	// Layer_5
	this.instance_25 = new lib.sprite76();
	this.instance_25.setTransform(-116.5,-67.2,1.3551,1.3551,29.9914);
	this.instance_25.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(790));

	// Layer_4
	this.instance_26 = new lib.shape74("synched",0);
	this.instance_26.setTransform(-0.05,38.7);
	this.instance_26.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(790));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-735.4,-186.5,972.8,416);


(lib.sprite98 = function(mode,startPosition,loop,reversed) {
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
	this.frame_999 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(999).call(this.frame_999).wait(1));

	// Masked_Layer_36___26
	this.instance = new lib.shape91("synched",0);
	this.instance.setTransform(-152.95,-26.6);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1000));

	// Masked_Layer_33___26
	this.instance_1 = new lib.text90("synched",0);
	this.instance_1.setTransform(-693,36.2,0.9999,1);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1000));

	// Masked_Layer_32___26
	this.instance_2 = new lib.text89("synched",0);
	this.instance_2.setTransform(-693,-14.5,0.9999,1);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1000));

	// Masked_Layer_31___26
	this.instance_3 = new lib.text88("synched",0);
	this.instance_3.setTransform(-693,-79.5,0.9999,1);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1000));

	// Masked_Layer_30___26
	this.instance_4 = new lib.text87("synched",0);
	this.instance_4.setTransform(-693,-111.2,0.9999,1);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1000));

	// Masked_Layer_29___26
	this.instance_5 = new lib.shape86("synched",0);
	this.instance_5.setTransform(-152.8,-77.85);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1000));

	// Masked_Layer_28___26
	this.instance_6 = new lib.text85("synched",0);
	this.instance_6.setTransform(-737.95,-141.9,0.9999,1);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1000));

	// Masked_Layer_27___26
	this.instance_7 = new lib.text84("synched",0);
	this.instance_7.setTransform(-736.65,-167.2,0.9999,1);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1000));

	// Mask_Layer_1 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EhANAgaMAAAhAzMCAbAAAMAAABAzg");
	mask.setTransform(180.952,15.0941);

	// Masked_Layer_24___1
	this.instance_8 = new lib.shape83("synched",0);

	var maskedShapeInstanceList = [this.instance_8];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1000));

	// Masked_Layer_22___1
	this.instance_9 = new lib.text97("synched",0);
	this.instance_9.setTransform(-135.85,154.8);
	this.instance_9.alpha = 0;
	this.instance_9._off = true;

	var maskedShapeInstanceList = [this.instance_9];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(89).to({_off:false},0).to({alpha:0.9609},24).wait(1).to({alpha:1},0).wait(886));

	// Masked_Layer_21___1
	this.instance_10 = new lib.shape96("synched",0);
	this.instance_10.setTransform(-2.05,38.7);
	this.instance_10.alpha = 0;
	this.instance_10._off = true;

	var maskedShapeInstanceList = [this.instance_10];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(89).to({_off:false},0).to({alpha:0.9609},24).wait(1).to({alpha:1},0).wait(886));

	// Masked_Layer_20___1
	this.instance_11 = new lib.text95("synched",0);
	this.instance_11.setTransform(-226,-177.05);
	this.instance_11.alpha = 0;
	this.instance_11._off = true;

	var maskedShapeInstanceList = [this.instance_11];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(89).to({_off:false},0).to({alpha:0.9609},24).wait(1).to({alpha:1},0).wait(886));

	// Masked_Layer_19___1
	this.instance_12 = new lib.shape94("synched",0);
	this.instance_12.setTransform(-2.05,38.7);
	this.instance_12.alpha = 0;
	this.instance_12._off = true;

	var maskedShapeInstanceList = [this.instance_12];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(89).to({_off:false},0).to({alpha:0.9609},24).wait(1).to({alpha:1},0).wait(886));

	// Masked_Layer_15___1
	this.instance_13 = new lib.text82("synched",0);
	this.instance_13.setTransform(-224,-177.05);

	var maskedShapeInstanceList = [this.instance_13];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(89).to({startPosition:0},0).to({alpha:0.0391},24).wait(1).to({alpha:0},0).wait(886));

	// Masked_Layer_14___1
	this.instance_14 = new lib.text81("synched",0);
	this.instance_14.setTransform(-216.2,121.7);

	var maskedShapeInstanceList = [this.instance_14];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(89).to({startPosition:0},0).to({alpha:0.0391},24).wait(1).to({x:-218.2,y:120.7,alpha:0},0).wait(886));

	// Masked_Layer_13___1
	this.instance_15 = new lib.shape80("synched",0);
	this.instance_15.setTransform(-0.05,38.7);

	var maskedShapeInstanceList = [this.instance_15];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(89).to({startPosition:0},0).to({alpha:0.0391},24).wait(1).to({alpha:0},0).wait(886));

	// Masked_Layer_11___1
	this.instance_16 = new lib.sprite76();
	this.instance_16.setTransform(-61.5,84.8,1.3551,1.3551,29.9914);

	var maskedShapeInstanceList = [this.instance_16];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(89).to({alpha:0.0391},24).wait(1).to({alpha:0},0).wait(886));

	// Masked_Layer_10___1
	this.instance_17 = new lib.shape79("synched",0);
	this.instance_17.setTransform(-0.05,38.7);

	var maskedShapeInstanceList = [this.instance_17];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(89).to({startPosition:0},0).to({alpha:0.0391},24).wait(1).to({alpha:0},0).wait(886));

	// Masked_Layer_9___1
	this.instance_18 = new lib.text78("synched",0);
	this.instance_18.setTransform(-224.4,8.3);

	var maskedShapeInstanceList = [this.instance_18];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(89).to({startPosition:0},0).to({alpha:0.0391},24).wait(1).to({x:-226.4,y:7.3,alpha:0},0).wait(886));

	// Masked_Layer_8___1
	this.instance_19 = new lib.shape77("synched",0);
	this.instance_19.setTransform(-0.05,38.7);

	var maskedShapeInstanceList = [this.instance_19];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(89).to({startPosition:0},0).to({alpha:0.0391},24).wait(1).to({alpha:0},0).wait(886));

	// Masked_Layer_6___1
	this.instance_20 = new lib.sprite76();
	this.instance_20.setTransform(-116.5,-67.2,1.3551,1.3551,29.9914);

	var maskedShapeInstanceList = [this.instance_20];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(89).to({alpha:0.0391},24).wait(1).to({alpha:0},0).wait(886));

	// Masked_Layer_5___1
	this.instance_21 = new lib.shape74("synched",0);
	this.instance_21.setTransform(-0.05,38.7);

	var maskedShapeInstanceList = [this.instance_21];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(89).to({startPosition:0},0).to({alpha:0.0391},24).wait(1).to({alpha:0},0).wait(886));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-741.8,-192.3,1011.9,414.8);


(lib.sprite23 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.sprite7b();
	this.instance.setTransform(142.75,-201.25,1.9956,1.9956,-176.2899);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2).to({_off:false},0).to({scaleX:1.9902,scaleY:1.9903,rotation:-163.4717,guide:{path:[142.7,-201.1,142,-184.3,138.3,-170.1]}},7).to({scaleX:1.9889,scaleY:1.9891,rotation:-159.9222,guide:{path:[138.3,-170.1,138.3,-170.1,138.3,-170,137.1,-165.7,135.8,-161.6]}},2).to({scaleX:1.9906,scaleY:1.9907,rotation:-157.9495,guide:{path:[135.7,-161.7,135.7,-161.6,135.7,-161.6,135,-159.5,134.2,-157.5]}},1).to({scaleX:1.9881,scaleY:1.9882,rotation:-156.686,guide:{path:[134.3,-157.5,134.3,-157.5,134.3,-157.4,133.5,-155.6,132.8,-153.8]}},1).to({scaleX:1.9868,scaleY:1.9868,rotation:-142.6474,guide:{path:[132.7,-153.9,132.7,-153.8,132.7,-153.8,130.1,-147.7,126.8,-142.2,119.4,-130,109.9,-120.3]}},8).to({scaleX:1.9864,scaleY:1.9865,rotation:-138.1537,guide:{path:[109.9,-120.3,109.9,-120.3,109.9,-120.2,105.3,-115.6,100.3,-111.6]}},2).to({scaleX:1.9867,scaleY:1.9867,rotation:-125.3721,guide:{path:[100.3,-111.6,100.3,-111.6,100.2,-111.6,95.1,-107.5,89.6,-104,80.4,-98.2,70.3,-93.8]}},7).to({scaleX:1.9899,scaleY:1.9899,rotation:-90.797,guide:{path:[70.2,-93.8,70.2,-93.8,70.2,-93.8,55,-87.2,37.6,-83.7,8.5,-77.7,-22.6,-78.4]}},20).wait(1).to({scaleX:1.99,scaleY:1.9901,rotation:-89.2118,x:-27.35,y:-79.05},0).wait(5));

	// Mask_Layer_1 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_1 = new cjs.Graphics().p("AKDvmIAAhkIBkAAIAABkg");
	var mask_graphics_2 = new cjs.Graphics().p("AJ0u4IAAiRIByAAIAACRg");
	var mask_graphics_3 = new cjs.Graphics().p("AJkuLIABi/ICAABIAAC/g");
	var mask_graphics_4 = new cjs.Graphics().p("AJVtdIACjuICOACIgCDtg");
	var mask_graphics_5 = new cjs.Graphics().p("AJFswIADkbICcACIgDEag");
	var mask_graphics_6 = new cjs.Graphics().p("AI0sDIAFlJICqADIgEFIg");
	var mask_graphics_7 = new cjs.Graphics().p("AIkrWIAHl2IC4ADIgHF2g");
	var mask_graphics_8 = new cjs.Graphics().p("AITqpIAJmkIDHAEIgKGkg");
	var mask_graphics_9 = new cjs.Graphics().p("AICp8IAMnSIDUAGIgMHRg");
	var mask_graphics_10 = new cjs.Graphics().p("AHwpPIAPoAIDjAHIgPH/g");
	var mask_graphics_11 = new cjs.Graphics().p("AHfoiIASotIDxAIIgTItg");
	var mask_graphics_12 = new cjs.Graphics().p("AHNn1IAWpbID/AJIgWJbg");
	var mask_graphics_13 = new cjs.Graphics().p("AG7nJIAaqIIENALIgaKIg");
	var mask_graphics_14 = new cjs.Graphics().p("AGpmcIAeq2IEbANIgfK1g");
	var mask_graphics_15 = new cjs.Graphics().p("AGWlvIAjrjIEpAOIgjLjg");
	var mask_graphics_16 = new cjs.Graphics().p("AGDlCIAosRIE3APIgoMRg");
	var mask_graphics_17 = new cjs.Graphics().p("AFwkWIAus+IFEASIgtM+g");
	var mask_graphics_18 = new cjs.Graphics().p("AFdjpIAztsIFTAUIgzNsg");
	var mask_graphics_19 = new cjs.Graphics().p("AFKi9IA5uZIFgAWIg5OZg");
	var mask_graphics_20 = new cjs.Graphics().p("AE2iQIA/vHIFvAYIg/PHg");
	var mask_graphics_21 = new cjs.Graphics().p("AEihkIBGv0IF8AaIhFP1g");
	var mask_graphics_22 = new cjs.Graphics().p("AEOg3IBNwiIGKAdIhNQhg");
	var mask_graphics_23 = new cjs.Graphics().p("AD6gLIBTxPIGZAfIhUROg");
	var mask_graphics_24 = new cjs.Graphics().p("ADlAgIBbx7IGnAiIhcR7g");
	var mask_graphics_25 = new cjs.Graphics().p("ADQBNIBjypIG1AlIhkSog");
	var mask_graphics_26 = new cjs.Graphics().p("ABgxAIJ9gIIAVXbIp9AJg");
	var mask_graphics_27 = new cjs.Graphics().p("AAyxCIKsgJIAUXbIqsAJg");
	var mask_graphics_28 = new cjs.Graphics().p("AADxBILbgKIAUXbIrbAKg");
	var mask_graphics_29 = new cjs.Graphics().p("AgrxBIMJgKIAUXcIsJAKg");
	var mask_graphics_30 = new cjs.Graphics().p("AhaxAIM4gLIAUXcIs5ALg");
	var mask_graphics_31 = new cjs.Graphics().p("AiKw/INpgMIAUXcItpAMg");
	var mask_graphics_32 = new cjs.Graphics().p("Ai5w+IOYgMIAUXbIuYAMg");
	var mask_graphics_33 = new cjs.Graphics().p("Ajow9IPHgNIAUXbIvHANg");
	var mask_graphics_34 = new cjs.Graphics().p("AkXw9IP2gNIAUXbIv2AOg");
	var mask_graphics_35 = new cjs.Graphics().p("AlGw8IQlgOIAUXbIwlAPg");
	var mask_graphics_36 = new cjs.Graphics().p("Al1w7IRUgPIAUXcIxUAOg");
	var mask_graphics_37 = new cjs.Graphics().p("Amkw6ISDgQIAUXcIyDAPg");
	var mask_graphics_38 = new cjs.Graphics().p("AnTw6ISzgQIATXcIyzAQg");
	var mask_graphics_39 = new cjs.Graphics().p("AoDw5ITjgRIAUXcIzjARg");
	var mask_graphics_40 = new cjs.Graphics().p("Aoyw4IUSgRIAUXbI0SARg");
	var mask_graphics_41 = new cjs.Graphics().p("Aphw3IVBgSIAUXbI1BASg");
	var mask_graphics_42 = new cjs.Graphics().p("AqQw3IVwgSIAUXbI1wATg");
	var mask_graphics_43 = new cjs.Graphics().p("Aq/w2IWfgTIAUXcI2fATg");
	var mask_graphics_44 = new cjs.Graphics().p("Aruw1IXOgUIAUXcI3OATg");
	var mask_graphics_45 = new cjs.Graphics().p("AsIw0IX9gVIAUXcI39AUg");
	var mask_graphics_46 = new cjs.Graphics().p("Asgw0IYtgVIAUXcI4tAVg");
	var mask_graphics_47 = new cjs.Graphics().p("As4wzIZdgVIAUXbI5dAWg");
	var mask_graphics_48 = new cjs.Graphics().p("AtPwyIaLgWIAUXbI6LAXg");
	var mask_graphics_49 = new cjs.Graphics().p("AtnwxIa7gXIAUXbI67AXg");
	var mask_graphics_50 = new cjs.Graphics().p("At+wwIbpgYIAUXbI7pAYg");
	var mask_graphics_51 = new cjs.Graphics().p("AuXwvIcagZIAVXbI8aAZg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:null,x:0,y:0}).wait(1).to({graphics:mask_graphics_1,x:74.25,y:-109.875}).wait(1).to({graphics:mask_graphics_2,x:74.23,y:-109.8458}).wait(1).to({graphics:mask_graphics_3,x:74.1477,y:-109.9018}).wait(1).to({graphics:mask_graphics_4,x:74.0735,y:-109.9602}).wait(1).to({graphics:mask_graphics_5,x:74.0074,y:-110.0209}).wait(1).to({graphics:mask_graphics_6,x:73.9495,y:-110.0841}).wait(1).to({graphics:mask_graphics_7,x:73.8996,y:-110.1494}).wait(1).to({graphics:mask_graphics_8,x:73.8577,y:-110.2171}).wait(1).to({graphics:mask_graphics_9,x:73.8239,y:-110.2869}).wait(1).to({graphics:mask_graphics_10,x:73.7981,y:-110.3589}).wait(1).to({graphics:mask_graphics_11,x:73.7804,y:-110.433}).wait(1).to({graphics:mask_graphics_12,x:73.7706,y:-110.5091}).wait(1).to({graphics:mask_graphics_13,x:73.7688,y:-110.5873}).wait(1).to({graphics:mask_graphics_14,x:73.775,y:-110.6674}).wait(1).to({graphics:mask_graphics_15,x:73.7892,y:-110.7495}).wait(1).to({graphics:mask_graphics_16,x:73.8112,y:-110.8334}).wait(1).to({graphics:mask_graphics_17,x:73.8412,y:-110.9192}).wait(1).to({graphics:mask_graphics_18,x:73.8791,y:-111.0068}).wait(1).to({graphics:mask_graphics_19,x:73.9249,y:-111.0962}).wait(1).to({graphics:mask_graphics_20,x:73.9786,y:-111.1872}).wait(1).to({graphics:mask_graphics_21,x:74.0401,y:-111.2799}).wait(1).to({graphics:mask_graphics_22,x:74.1094,y:-111.3742}).wait(1).to({graphics:mask_graphics_23,x:74.1866,y:-111.4701}).wait(1).to({graphics:mask_graphics_24,x:74.2715,y:-111.5675}).wait(1).to({graphics:mask_graphics_25,x:74.364,y:-111.6658}).wait(1).to({graphics:mask_graphics_26,x:75.3944,y:-109.7365}).wait(1).to({graphics:mask_graphics_27,x:75.404,y:-110.016}).wait(1).to({graphics:mask_graphics_28,x:75.4168,y:-110.0025}).wait(1).to({graphics:mask_graphics_29,x:75.4295,y:-109.9889}).wait(1).to({graphics:mask_graphics_30,x:75.4423,y:-109.9752}).wait(1).to({graphics:mask_graphics_31,x:75.455,y:-109.9616}).wait(1).to({graphics:mask_graphics_32,x:75.4678,y:-109.9479}).wait(1).to({graphics:mask_graphics_33,x:75.4805,y:-109.9343}).wait(1).to({graphics:mask_graphics_34,x:75.4932,y:-109.9206}).wait(1).to({graphics:mask_graphics_35,x:75.506,y:-109.9069}).wait(1).to({graphics:mask_graphics_36,x:75.5187,y:-109.8933}).wait(1).to({graphics:mask_graphics_37,x:75.5315,y:-109.8796}).wait(1).to({graphics:mask_graphics_38,x:75.5442,y:-109.8659}).wait(1).to({graphics:mask_graphics_39,x:75.5569,y:-109.8522}).wait(1).to({graphics:mask_graphics_40,x:75.5697,y:-109.8386}).wait(1).to({graphics:mask_graphics_41,x:75.5824,y:-109.8249}).wait(1).to({graphics:mask_graphics_42,x:75.5951,y:-109.8112}).wait(1).to({graphics:mask_graphics_43,x:75.6079,y:-109.7975}).wait(1).to({graphics:mask_graphics_44,x:75.6206,y:-109.7838}).wait(1).to({graphics:mask_graphics_45,x:73.5348,y:-109.7701}).wait(1).to({graphics:mask_graphics_46,x:71.1978,y:-109.7564}).wait(1).to({graphics:mask_graphics_47,x:68.8609,y:-109.7427}).wait(1).to({graphics:mask_graphics_48,x:66.5239,y:-109.7289}).wait(1).to({graphics:mask_graphics_49,x:64.187,y:-109.7152}).wait(1).to({graphics:mask_graphics_50,x:61.85,y:-109.7014}).wait(1).to({graphics:mask_graphics_51,x:59.3,y:-109.7443}).wait(5));

	// Masked_Layer_2___1
	this.instance_1 = new lib.shape22("synched",0);
	this.instance_1._off = true;

	var maskedShapeInstanceList = [this.instance_1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({_off:false},0).wait(55));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-34.1,-209.3,184.29999999999998,209.3);


(lib.sprite9 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.sprite7();
	this.instance.setTransform(3,-42.25,1.9969,1.9969,179.9987);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({_off:false},0).to({rotation:179.9978,y:28.55},18).to({rotation:0,skewX:89.9978,skewY:-90.0022,x:12.5,y:23.75},1).to({skewX:89.9987,skewY:-90.0013,x:21.4},8).wait(1).to({skewX:89.9978,skewY:-90.0022,x:22.5},0).wait(5));

	// Layer_2
	this.instance_1 = new lib.shape5("synched",0);
	this.instance_1.setTransform(3,-55.25,0.0081,1,-90);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({scaleX:0.0882,y:-50.3},1).to({scaleX:0.6343,y:-16.55},17).wait(1).to({scaleX:0.6664,y:-14.6},0).wait(15));

	// Layer_1
	this.instance_2 = new lib.shape5("synched",0);
	this.instance_2.setTransform(5.95,23.75,0.0734,1,0,0,180);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(20).to({_off:false},0).to({scaleX:0.1462,x:10.35},8).wait(1).to({scaleX:0.1553,x:10.9},0).wait(5));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-55.7,33.2,91);


(lib.sprite8 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.sprite7();
	this.instance.setTransform(3,-42.25,1.9969,1.9969,179.9987);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({_off:false},0).to({y:107.25},38).to({rotation:270.0022,x:-7.5,y:105.75},1).to({rotation:270.0013,x:-26.55},13).wait(1).to({rotation:270.0022,x:-28},0).wait(10));

	// Layer_2
	this.instance_1 = new lib.shape5("synched",0);
	this.instance_1.setTransform(3,-55.25,0.0081,1,-90);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({scaleX:0.0882,y:-50.3},1).to({scaleX:0.4737,y:-26.45},12).to({scaleX:1.2768,y:23.1},25).wait(1).to({scaleX:1.3089,y:24.75},0).wait(25));

	// Layer_1
	this.instance_2 = new lib.shape5("synched",0);
	this.instance_2.setTransform(1.05,105.75,0.0734,1);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(40).to({_off:false},0).to({scaleX:0.2619,x:-10.4,y:105.8},13).wait(1).to({scaleX:0.2764,x:-11.5},0).wait(10));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-34.7,-55.7,44.800000000000004,169.7);


(lib.sprite28 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {page1:0};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		/* stopAllSounds ();
		*/
	}
	this.frame_1084 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1084).call(this.frame_1084).wait(1));

	// Masked_Layer_39___36
	this.instance = new lib.text27("synched",0);
	this.instance.setTransform(-877.65,-107.9);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1085));

	// Masked_Layer_38___36
	this.instance_1 = new lib.text26("synched",0);
	this.instance_1.setTransform(-877.65,-34.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1085));

	// Masked_Layer_37___36
	this.instance_2 = new lib.text25("synched",0);
	this.instance_2.setTransform(-877.65,-201.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1085));

	// Layer_31
	this.aniE = new lib.sprite23();
	this.aniE.name = "aniE";
	this.aniE.setTransform(-143,51.85,1,1,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.aniE).wait(1085));

	// Layer_26
	this.aniD = new lib.sprite23();
	this.aniD.name = "aniD";
	this.aniD.setTransform(-118,26.85,1,1,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.aniD).wait(1085));

	// Layer_21
	this.aniC = new lib.sprite23();
	this.aniC.name = "aniC";
	this.aniC.setTransform(-93,1.85,1,1,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.aniC).wait(1085));

	// Layer_20
	this.instance_3 = new lib.text20("synched",0);
	this.instance_3.setTransform(-157.4,-203.65);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1085));

	// Layer_19
	this.instance_4 = new lib.shape19("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1085));

	// Layer_18
	this.instance_5 = new lib.text18("synched",0);
	this.instance_5.setTransform(-0.7,69.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1085));

	// Layer_17
	this.instance_6 = new lib.shape17("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1085));

	// Layer_16
	this.instance_7 = new lib.text16("synched",0);
	this.instance_7.setTransform(-333.1,-37.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1085));

	// Layer_15
	this.instance_8 = new lib.shape15("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1085));

	// Layer_14
	this.instance_9 = new lib.text14("synched",0);
	this.instance_9.setTransform(-22.75,-199.05);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1085));

	// Layer_13
	this.instance_10 = new lib.shape13("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1085));

	// Layer_12
	this.instance_11 = new lib.text12("synched",0);
	this.instance_11.setTransform(-353.95,114.25);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(1085));

	// Layer_11
	this.instance_12 = new lib.shape10("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(1085));

	// Layer_7
	this.aniB = new lib.sprite9();
	this.aniB.name = "aniB";
	this.aniB.setTransform(-68.1,99.6);

	this.timeline.addTween(cjs.Tween.get(this.aniB).wait(1085));

	// Layer_3
	this.aniF = new lib.sprite8();
	this.aniF.name = "aniF";
	this.aniF.setTransform(43.9,8.6);

	this.timeline.addTween(cjs.Tween.get(this.aniF).wait(1085));

	// Layer_2
	this.instance_13 = new lib.shape4("synched",0);
	this.instance_13.setTransform(-146.65,-55.65,0.95,0.95);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(1085));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-881.6,-218.5,932.6,409.8);


// stage content:
(lib.vital_acc_ssw = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {p1:0,p2:1085,p3:2085};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,1,1083,1084,1085,1086,2083,2084,2085,2086,2874];
	this.streamSoundSymbolsList[1] = [{id:"vital_acc_ssw1",startFrame:1,endFrame:1084,loop:1,offset:0}];
	this.streamSoundSymbolsList[1086] = [{id:"vital_acc_ssw2",startFrame:1086,endFrame:2084,loop:1,offset:0}];
	this.streamSoundSymbolsList[2086] = [{id:"vital_acc_ssw3",startFrame:2086,endFrame:2874,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		InitPage(3);
		Next(1);
		Prev(0);
		InitAnim(CtlSprite);
		
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
		
		
		function CtlSprite(sw)
		{
			if( sw ){
				exportRoot.ani1.aniB.play();
				exportRoot.ani1.aniC.play();
				exportRoot.ani1.aniD.play();
				exportRoot.ani1.aniE.play();
				exportRoot.ani1.aniF.play();
			}
			else{
				exportRoot.ani1.aniB.stop();
				exportRoot.ani1.aniC.stop();
				exportRoot.ani1.aniD.stop();
				exportRoot.ani1.aniE.stop();
				exportRoot.ani1.aniF.stop();
			}
		}
	}
	this.frame_1 = function() {
		var soundInstance = playSound("vital_acc_ssw1",0);
		this.InsertIntoSoundStreamData(soundInstance,1,1084,1);
	}
	this.frame_1083 = function() {
		this.stop();
	}
	this.frame_1084 = function() {
		this.stop();
	}
	this.frame_1085 = function() {
		Prev(1);
		Next(1);
		InitAnim();
	}
	this.frame_1086 = function() {
		var soundInstance = playSound("vital_acc_ssw2",0);
		this.InsertIntoSoundStreamData(soundInstance,1086,2084,1);
	}
	this.frame_2083 = function() {
		this.stop();
	}
	this.frame_2084 = function() {
		this.stop();
	}
	this.frame_2085 = function() {
		Next(0);
		InitAnim();
	}
	this.frame_2086 = function() {
		var soundInstance = playSound("vital_acc_ssw3",0);
		this.InsertIntoSoundStreamData(soundInstance,2086,2874,1);
	}
	this.frame_2874 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1082).call(this.frame_1083).wait(1).call(this.frame_1084).wait(1).call(this.frame_1085).wait(1).call(this.frame_1086).wait(997).call(this.frame_2083).wait(1).call(this.frame_2084).wait(1).call(this.frame_2085).wait(1).call(this.frame_2086).wait(788).call(this.frame_2874).wait(1));

	// Layer_59
	this.instance = new lib.text49("synched",0);
	this.instance.setTransform(10,0,1.5021,1.5021);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2875));

	// Layer_back
	this.back = new lib.buttonbak();
	this.back.name = "back";
	this.back.setTransform(350,645,1.0001,1.0002);
	new cjs.ButtonHelper(this.back, 0, 1, 2, false, new lib.buttonbak(), 3);

	this.timeline.addTween(cjs.Tween.get(this.back).wait(2875));

	// Layer_page
	this.page = new cjs.Text("Page number", "italic bold 15px 'Arial'", "#FF9900");
	this.page.name = "page";
	this.page.lineHeight = 17;
	this.page.lineWidth = 193;
	this.page.parent = this;
	this.page.setTransform(23,658,1.4989,1.4989);

	this.timeline.addTween(cjs.Tween.get(this.page).wait(2875));

	// Layer_next
	this.next = new lib.buttonnext();
	this.next.name = "next";
	this.next.setTransform(1496.1,5.1,0.9998,0.9999,0,0,0,0.1,0.1);
	new cjs.ButtonHelper(this.next, 0, 1, 2, false, new lib.buttonnext(), 3);

	this.timeline.addTween(cjs.Tween.get(this.next).wait(2875));

	// Layer_previous
	this.previous = new lib.buttonprev();
	this.previous.name = "previous";
	this.previous.setTransform(1432,5,1.0003,0.9993);
	new cjs.ButtonHelper(this.previous, 0, 1, 2, false, new lib.buttonprev(), 3);

	this.timeline.addTween(cjs.Tween.get(this.previous).wait(2875));

	// Layer_slider
	this.slider = new lib.sprite_slider();
	this.slider.name = "slider";
	this.slider.setTransform(610.1,670.1,0.9937,0.9983,0,0,0,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.slider).wait(2875));

	// Layer_replay
	this.replay = new lib.sprite_replay();
	this.replay.name = "replay";
	this.replay.setTransform(1045.1,650.1,0.9999,0.9999,0,0,0,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.replay).wait(2875));

	// Layer_slider_base
	this.instance_1 = new lib.sprite_sliderbase();
	this.instance_1.setTransform(600,650,1,0.9999);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(2875));

	// Layer_playpau
	this.playpau = new lib.sprite_playpau();
	this.playpau.name = "playpau";
	this.playpau.setTransform(555,650,0.9999,0.9999);

	this.timeline.addTween(cjs.Tween.get(this.playpau).wait(2875));

	// Mask_Layer_1 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("Eh8/AyyMAAAhfTMD5/AAAMAAABfTg");
	mask.setTransform(800,325);

	// Masked_Layer_2___1
	this.ani1 = new lib.sprite28();
	this.ani1.name = "ani1";
	this.ani1.setTransform(1350,372.55,1.5021,1.5021);

	this.ani2 = new lib.sprite98();
	this.ani2.name = "ani2";
	this.ani2.setTransform(1130,317.7,1.5021,1.5021);

	this.ani3 = new lib.sprite114();
	this.ani3.name = "ani3";
	this.ani3.setTransform(1130,320,1.5021,1.5021);

	var maskedShapeInstanceList = [this.ani1,this.ani2,this.ani3];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.ani1}]}).to({state:[{t:this.ani2}]},1085).to({state:[{t:this.ani3}]},1000).wait(790));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(810,350,790,346);
// library properties:
lib.properties = {
	id: '786DCE5F8407AE4380EFB6EA9159D292',
	width: 1600,
	height: 700,
	fps: 25,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/vital_acc_ssw_atlas_1.png", id:"vital_acc_ssw_atlas_1"},
		{src:"images/vital_acc_ssw_atlas_2.png", id:"vital_acc_ssw_atlas_2"},
		{src:"images/vital_acc_ssw_atlas_3.png", id:"vital_acc_ssw_atlas_3"},
		{src:"sounds/vital_acc_ssw1.mp3", id:"vital_acc_ssw1"},
		{src:"sounds/vital_acc_ssw2.mp3", id:"vital_acc_ssw2"},
		{src:"sounds/vital_acc_ssw3.mp3", id:"vital_acc_ssw3"}
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