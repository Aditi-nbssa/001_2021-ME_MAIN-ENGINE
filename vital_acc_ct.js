(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"vital_acc_ct_atlas_1", frames: [[1197,1137,598,155],[1197,1294,547,155],[1212,456,626,155],[1203,757,603,155],[0,1469,1134,173],[0,957,1152,281],[0,337,1210,335],[1197,1451,663,120],[0,1644,1021,82],[1430,1573,413,124],[1212,613,674,142],[0,674,1201,281],[0,1240,1195,227],[0,0,1213,335],[1888,644,139,99],[1847,298,186,99],[1847,399,186,99],[1746,1294,253,99],[1430,1699,311,99],[1154,957,850,178],[1888,500,127,142],[1926,1137,90,142],[1797,1137,127,142],[1862,1395,127,142],[1862,1539,90,142],[1849,0,184,296],[1808,757,229,179],[1746,1395,113,53],[1954,1539,60,60],[1743,1699,276,53],[1215,0,632,232],[1136,1573,292,203],[1215,234,630,220]]}
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



(lib.CachedBmp_32 = function() {
	this.initialize(ss["vital_acc_ct_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_31 = function() {
	this.initialize(ss["vital_acc_ct_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_30 = function() {
	this.initialize(ss["vital_acc_ct_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_29 = function() {
	this.initialize(ss["vital_acc_ct_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_28 = function() {
	this.initialize(ss["vital_acc_ct_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_27 = function() {
	this.initialize(ss["vital_acc_ct_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_26 = function() {
	this.initialize(ss["vital_acc_ct_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_25 = function() {
	this.initialize(ss["vital_acc_ct_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_24 = function() {
	this.initialize(ss["vital_acc_ct_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_23 = function() {
	this.initialize(ss["vital_acc_ct_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_22 = function() {
	this.initialize(ss["vital_acc_ct_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_21 = function() {
	this.initialize(ss["vital_acc_ct_atlas_1"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_20 = function() {
	this.initialize(ss["vital_acc_ct_atlas_1"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_19 = function() {
	this.initialize(ss["vital_acc_ct_atlas_1"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_18 = function() {
	this.initialize(ss["vital_acc_ct_atlas_1"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_17 = function() {
	this.initialize(ss["vital_acc_ct_atlas_1"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_16 = function() {
	this.initialize(ss["vital_acc_ct_atlas_1"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_15 = function() {
	this.initialize(ss["vital_acc_ct_atlas_1"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_14 = function() {
	this.initialize(ss["vital_acc_ct_atlas_1"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_13 = function() {
	this.initialize(ss["vital_acc_ct_atlas_1"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_12 = function() {
	this.initialize(ss["vital_acc_ct_atlas_1"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_11 = function() {
	this.initialize(ss["vital_acc_ct_atlas_1"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_10 = function() {
	this.initialize(ss["vital_acc_ct_atlas_1"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_9 = function() {
	this.initialize(ss["vital_acc_ct_atlas_1"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_8 = function() {
	this.initialize(ss["vital_acc_ct_atlas_1"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_7 = function() {
	this.initialize(ss["vital_acc_ct_atlas_1"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_6 = function() {
	this.initialize(ss["vital_acc_ct_atlas_1"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_3 = function() {
	this.initialize(ss["vital_acc_ct_atlas_1"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2 = function() {
	this.initialize(ss["vital_acc_ct_atlas_1"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1 = function() {
	this.initialize(ss["vital_acc_ct_atlas_1"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.image133 = function() {
	this.initialize(ss["vital_acc_ct_atlas_1"]);
	this.gotoAndStop(30);
}).prototype = p = new cjs.Sprite();



(lib.image134 = function() {
	this.initialize(ss["vital_acc_ct_atlas_1"]);
	this.gotoAndStop(31);
}).prototype = p = new cjs.Sprite();



(lib.image135 = function() {
	this.initialize(ss["vital_acc_ct_atlas_1"]);
	this.gotoAndStop(32);
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
	this.instance = new lib.CachedBmp_32();
	this.instance.setTransform(-91.4,-3.65,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-91.4,-3.6,199,51.6);


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
	this.instance = new lib.CachedBmp_31();
	this.instance.setTransform(-91.4,-3.65,0.3328,0.3328);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-91.4,-3.6,182,51.6);


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
	this.instance = new lib.CachedBmp_30();
	this.instance.setTransform(-91.45,-3.65,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-91.4,-3.6,208.3,51.6);


(lib.text144 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(-91.45,-3.65,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-91.4,-3.6,200.7,51.6);


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
	this.instance = new lib.CachedBmp_28();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,377.4,57.599999999999994);


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
	this.instance = new lib.CachedBmp_27();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,383.4,93.5);


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
	this.instance = new lib.CachedBmp_26();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,402.7,111.5);


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
	this.instance = new lib.CachedBmp_25();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,220.70000000000002,39.9);


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
	this.instance = new lib.CachedBmp_24();
	this.instance.setTransform(0,0,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,339.9,27.3);


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
	this.instance.setTransform(-3.95,-3.75,0.3326,0.3326);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,137.4,41.2);


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
	this.instance = new lib.CachedBmp_22();
	this.instance.setTransform(-4,-4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-4,337,71);


(lib.text43 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,399.7,93.5);


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
	this.instance = new lib.CachedBmp_20();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,397.7,75.5);


(lib.text41 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,403.7,111.5);


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
	this.instance = new lib.CachedBmp_18();
	this.instance.setTransform(44.85,-3.65,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(44.9,-3.6,46.199999999999996,32.9);


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
	this.instance = new lib.CachedBmp_17();
	this.instance.setTransform(31,-3.65,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(31,-3.6,61.900000000000006,32.9);


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
	this.instance = new lib.CachedBmp_16();
	this.instance.setTransform(29,-3.65,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(29,-3.6,61.900000000000006,32.9);


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
	this.instance = new lib.CachedBmp_15();
	this.instance.setTransform(37.15,-3.65,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(37.2,-3.6,84.2,32.9);


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
	this.instance.setTransform(37.15,-3.65,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(37.2,-3.6,103.49999999999999,32.9);


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
	this.instance = new lib.CachedBmp_13();
	this.instance.setTransform(-4,-4.25,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-4.2,425,89);


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
	this.instance = new lib.CachedBmp_12();
	this.instance.setTransform(-4,-4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-4,63.5,71);


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
	this.instance = new lib.CachedBmp_11();
	this.instance.setTransform(-4,-4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-4,45,71);


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
	this.instance = new lib.CachedBmp_10();
	this.instance.setTransform(-4,-4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-4,63.5,71);


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
	this.instance = new lib.CachedBmp_9();
	this.instance.setTransform(-4,-4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-4,63.5,71);


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
	this.instance = new lib.CachedBmp_8();
	this.instance.setTransform(-4,-4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-4,45,71);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("APeC+I+7AAIAAl7Ie7AAg");
	this.shape.setTransform(712.575,423);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AvdC+IAAl7Ie7AAIAAF7g");
	this.shape_1.setTransform(712.575,423);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(612.6,403,200,40);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("APeC+I+7AAIAAl7Ie7AAg");
	this.shape.setTransform(478.525,423);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AvdC+IAAl7Ie7AAIAAF7g");
	this.shape_1.setTransform(478.525,423);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(378.5,403,200.10000000000002,40);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("APeC+I+7AAIAAl7Ie7AAg");
	this.shape.setTransform(712.55,205.05);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AvdC+IAAl7Ie7AAIAAF7g");
	this.shape_1.setTransform(712.55,205.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(612.6,185.1,200,40);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("APeC+I+7AAIAAl7Ie7AAg");
	this.shape.setTransform(478.5,205.05);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AvdC+IAAl7Ie7AAIAAF7g");
	this.shape_1.setTransform(478.5,205.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(378.5,185.1,200,40);


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

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgRARQgHgHAAgKQAAgKAHgHQAIgHAJAAQAKAAAIAHQAHAHAAAKQAAAKgHAHQgIAIgKAAQgJAAgIgIg");
	this.shape.setTransform(-347.55,271.05);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgJAHgIQAIgHAJAAQAKAAAIAHQAHAIAAAJQAAAKgHAIQgIAHgKAAQgJAAgIgHg");
	this.shape_1.setTransform(-347.55,179.4);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-350,176.9,5,96.70000000000002);


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

	// Layer_6
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF9900").ss(3,1,0,3).p("Afaz8QAJgqABgtIAAgEAeu4dQgWgmggghAdK6PQgkgcgngTAbH7UQgqgMgugDAYavHIA5AEIAggBAauvNQAsgKAogUAc1wJQAegVAbgbIANgNAegx0QAZglAQgqAff2SQgHgtgQgpAXB7JQgpAQgmAaAVE55IgLALQgbAbgVAdATq4DQgUApgJAsATF1xIgBAdQAAAgAEAeATVzcQANArAXAnAWMv4QAnAXAsANAUcxZIA/A/AZT7jQguAAgrAJAVBJ3IgMgVQgTgfgWgSATXIWIgWgCQgtAAglAiAQeL3QgBATAAAVIACAwAQqOLQAMAsAXAkARxQJQAkAgAsAAIADAAAT9QYQAfgTAZgqIAEgHAVSOeQAOgpAEgwAVlMHQgCgvgMgpARLJmQgXAmgMAuA3NCjIgLAAIhNAHAwbIcQgRgpgVgnAxfGXIgHgKQgagngbggA07DFQgpgTgsgIAvYRqIAJhaAvUM8IgNhYAvNPTIgChcAzDEaQghgggjgYAvtKqQgLgsgOgqA7dELQggAdgeAkA9AF+IgKAPQgUAfgRAhA+KIDQgTApgOArA/ZMlQgGAsgCAuA/jO8IAAAHQAAAqADAoA+9KRQgLArgIAtA/CTkQALAtAPAqA+SVyQASAqAWAoA9MX3IACACQAYAlAaAfA7wZpQAhAhAkAYAwpWKQATgoAPgrAv2T+QAMgrAJgtAx0YOIAwhOA3nbjIAPABIBIgHA1WbNQApgQAngaAzWZ+QAggcAeglA5eC7QgpAQgmAaA/bRRQAFAtAIArA53bAQAoAUAsAJ");
	this.shape.setTransform(246.275,181.6512);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_5
	this.shape_1 = new cjs.Shape();
	var sprImg_shape_1 = cjs.SpriteSheetUtils.extractFrame(ss["vital_acc_ct_atlas_1"],30);
	sprImg_shape_1.onload = function(){
		this.shape_1.graphics.bf(sprImg_shape_1, null, new cjs.Matrix2D(0.842,0,0,0.842,-131,-97.9)).s().p("AziOqIAA9TMAnFAAAIAAdTg")
	}.bind(this);
	this.shape_1.setTransform(105.25,282.65);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_4
	this.shape_2 = new cjs.Shape();
	var sprImg_shape_2 = cjs.SpriteSheetUtils.extractFrame(ss["vital_acc_ct_atlas_1"],31);
	sprImg_shape_2.onload = function(){
		this.shape_2.graphics.bf(sprImg_shape_2, null, new cjs.Matrix2D(0.945,0,0,0.945,-143.9,-93.6)).s().p("AzmOoIAA9PMAnOAAAIAAdPg")
	}.bind(this);
	this.shape_2.setTransform(358.9,282);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_3
	this.shape_3 = new cjs.Shape();
	var sprImg_shape_3 = cjs.SpriteSheetUtils.extractFrame(ss["vital_acc_ct_atlas_1"],30);
	sprImg_shape_3.onload = function(){
		this.shape_3.graphics.bf(sprImg_shape_3, null, new cjs.Matrix2D(0.844,0,0,0.845,-396.2,-98.1)).s().p("AzhOrIAA9VMAnDAAAIAAdVg")
	}.bind(this);
	this.shape_3.setTransform(358.325,282.275);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	// Layer_2
	this.shape_4 = new cjs.Shape();
	var sprImg_shape_4 = cjs.SpriteSheetUtils.extractFrame(ss["vital_acc_ct_atlas_1"],32);
	sprImg_shape_4.onload = function(){
		this.shape_4.graphics.bf(sprImg_shape_4, null, new cjs.Matrix2D(0.903,0,0,0.906,-131.6,-98.4)).s().p("AzmPFIAA+JMAnNAAAIAAeJg")
	}.bind(this);
	this.shape_4.setTransform(106.575,88.9);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	// Layer_1
	this.shape_5 = new cjs.Shape();
	var sprImg_shape_5 = cjs.SpriteSheetUtils.extractFrame(ss["vital_acc_ct_atlas_1"],32);
	sprImg_shape_5.onload = function(){
		this.shape_5.graphics.bf(sprImg_shape_5, null, new cjs.Matrix2D(0.956,0,0,0.932,-442.6,-95.7)).s().p("A0dO8IAA93MAo8AAAIAAd3g")
	}.bind(this);
	this.shape_5.setTransform(365.3,88.875);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.8,-7.6,516.1999999999999,384.1);


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

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("ADfhpQgPAfgNADQgMADgNATQgNATgOAFQgNAGgUATQgUATgJAVQgIAVgTANIgZARQgHAEgMAWQgMAVgUASAjBh3QADgWgUgHQgUgHAQAAAgiCJIgTgZIgYgiQgRgbgIgTQgHgSgKgPQgKgQgIgXQgHgXgKgPQgJgQgSgG");
	this.shape.setTransform(-0.371,2.425);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1,0,0,3).p("ADcgRQhphjiRAAQhVAAhHAiIgOAGQgJAEgIAFAh2BdQAogWAwAAQBGAAAzAw");
	this.shape_1.setTransform(-0.0535,-6.3171);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FDFDFD").s().p("AgfBGQgwAAgoAWIhjigIARgJIAOgGQBHgiBVAAQCRAABpBjIiBCIQgzgwhGAAg");
	this.shape_2.setTransform(0.025,-6.25);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#6F6F6F").s().p("Ahog/QAngWAxAAQBFAAA0AwIh1B7g");
	this.shape_3.setTransform(-1.45,9.375);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-24.6,-19,47.6,38);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AhAkiQAKAPATAPQATAQgEATQgDAUAJAPQAJAQALAIQAMAJANAXQgGAAAHACQgEABAGACIAQAkQAFAPAQARIAiAiIAYAZQAGAHgJAQIgXAdQgKAPgMALIggAXQgUAMgCAPQgCAOgZASQgPgEgVAXQgVAXABAPAAACeIgDABAhHDnQgNAFgUAdQgUAdgEgDQgDgEABAH");
	this.shape.setTransform(9.9318,-0.1314);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1,0,0,3).p("ACRCcIgDgDIgDgDQgyg0ABhIQgBhHAygzIADgEIACgCQARgRAUgLABRkjIg7AhQiGBSguBkQgUArABAzQgBA4AeArIAIAMIACACQBIBiA+AsIANANIAHAH");
	this.shape_1.setTransform(-4.7278,-0.0414);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#6F6F6F").s().p("AgjCOIAAAAIgDADgAgmCLIgDgDQgyg0ABhHQgBhIAygzIADgDIACgCQARgSATgLIBbCWIh+CIg");
	this.shape_2.setTransform(13.3748,1.35);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FDFDFD").s().p("AAIEdIgNgMQg+gshIhiIgCgCIgIgMQgegrABg4QgBg0AUgqQAuhkCGhSIA7giIBkCiQgUALgRARIgCACIgDAEQgyAzABBHQgBBIAyAzIADADIADAEIgDACIh+CHg");
	this.shape_3.setTransform(-4.6006,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-23.5,-30.2,47.6,60.5);


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

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AhxAAIAFgSQAFgQAMgMQAMgLAPgaQAQgaAEgPQAFgPAQgMIAjgXQATgLAMgSIAaghIAVgXIAbgbABCEjQgLglgFgIIgWgbQgQgUgFgXQgEgWgUgJQgVgJgEgRQgEgRgUgZQgUgYAAgKQAAgKgPgP");
	this.shape.setTransform(-5.1758,-0.1887);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1,0,0,3).p("AgiEgIALgIIAvgpQBshsAAiXQAAgzgMgtQgYhchIhIIgIgIAhwiXIAEAEQA1A1AABKIgBAVQgHA8gtAtIgZAW");
	this.shape_1.setTransform(4.9117,0.0504);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#6F6F6F").s().p("AhXgPIB1h8IAFAFQA0A0ABBLIgCAUQgGA8gtAtIgaAWg");
	this.shape_2.setTransform(-9.4,-1.15);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FDFDFD").s().p("AiECAIAZgWQAtgsAHg9IABgUQAAhKg1g1IgEgFICAiJIAIAJQBIBIAYBbQAMAuAAAzQAACXhsBrIgvAqIgLAIg");
	this.shape_3.setTransform(4.825,0.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-18.1,-29.8,37.3,59.7);


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

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AAHiPQgFgLAVAHQAWAIANANQAMAOAKAVIAKAZQAAADATASQATASAMAZQALAZAPAVQAOAWACAOQACAOANAPQANAPAHARQAHAQADgKAjiBoQALgQAPgPIAhgeQARgOAJgNIAVggQAMgUAagJQAagJABgOQABgNAQgMQARgMAOgW");
	this.shape.setTransform(0,-1.7608);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1,0,0,3).p("ACAhkIgGAEQgqAbg1AAIgxgGQgpgMghggAjhARIAbAYQBhBNCAAAQBwAABYg6");
	this.shape_1.setTransform(-0.0257,6.9192);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#6F6F6F").s().p("AglBXQgqgMggggIB/iHIBhCaIgHAEQgqAbg1AAg");
	this.shape_2.setTransform(1.5,-9.375);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FDFDFD").s().p("AjHApIgbgXICCiIQAgAfAqAMIAwAHQA1gBAqgaIAHgEIBjCfQhYA7hxAAQh/AAhihOg");
	this.shape_3.setTransform(0,6.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-23.6,-18.7,47.3,38.5);


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

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("ACugtQASBHglBAQglBAhHATQhHAThBglIgDgCQg+glgShFQgThFAjg+IABgFQAmhABIgTQBGgTBAAlQBBAmAUBHg");
	this.shape.setTransform(3.8432,-0.025);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#6F6F6F").s().p("AhZCbIgDgCQg+glgShFQgThFAjg+IABgFQAmhABIgTQBGgTBAAlQBBAmAUBHQASBHglBAQglBAhHATQgZAHgWAAQguAAgrgZg");
	this.shape_1.setTransform(3.8432,-0.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(1,0,0,3).p("Ah+gHQAXiICoiTIALgJAg3C6IgLgIACBErQgKgGgGgCQhIgbhdhM");
	this.shape_2.setTransform(-27.5927,1.8502);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(1,0,0,3).p("AjHkZQA8gzBSgWQCSgnCEBMQCEBMAnCTQAoCShNCDQhMCFiTAnQiRAniFhMAlWDEQgngigOg2QgOgzAHguAlIDPIgDgC");
	this.shape_3.setTransform(0.0309,0.0112);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FDFDFD").s().p("AiSE+IgQgJQhIgahehMIgDgCIgLgJQgngigOg2QgOgzAHguQAXiHCpiTIALgKQA8gzBSgWQCSgnCEBMQCEBMAnCTQAoCShNCDQhMCFiTAnQgyANgwAAQhcAAhYgyg");
	this.shape_4.setTransform(0.0309,0.0112);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	// Layer_1
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#000000").ss(1,0,0,3).p("AAGAEIgGgEIgEgD");
	this.shape_5.setTransform(-33.7062,20.0798);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-41.5,-37.8,83.1,75.69999999999999);


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
	this.shape.graphics.f().s("#FF0000").ss(2,0,0,3).p("AiBADQCNgLB2AJ");
	this.shape.setTransform(34.9257,-11.5416);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(21,-12.9,27.9,2.700000000000001);


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

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(2,0,0,3).p("AjmBhQDojEDrAG");
	this.shape.setTransform(-17.3855,-0.2024);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-41.4,-10.6,48.699999999999996,21.1);


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
	this.shape.graphics.f("rgba(255,0,0,0.663)").s().p("AqLKMQkOkOAAl+QAAl9EOkOQCLiLCohEQCfg/C5AAQC6AACfA/QCoBECLCLQENEOABF9QgBF+kNEOQkOEOl+AAQl9AAkOkOg");
	this.shape.setTransform(-147.25,85.7248);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-239.4,-6.4,184.4,184.3);


(lib.shape68 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,0,0,0.663)").s().p("AqLKMQkOkOAAl+QAAl9EOkOQCLiLCohEQCfg/C5AAQC6AACfA/QCoBECLCLQENEOABF9QgBF+kNEOQkOEOl+AAQl9AAkOkOg");
	this.shape.setTransform(-147.25,85.7248);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-239.4,-6.4,184.4,184.3);


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
	this.shape.graphics.f("rgba(255,0,0,0.663)").s().p("AqLKMQkOkOAAl+QAAl9EOkOQCLiLCohEQCfg/C5AAQC6AACfA/QCoBECLCLQENEOABF9QgBF+kNEOQkOEOl+AAQl9AAkOkOg");
	this.shape.setTransform(-147.25,85.7248);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-239.4,-6.4,184.4,184.3);


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
	this.shape.graphics.f("#013C76").s().p("AsXDDIAAgtIB9AAIAAihIAmAAIAADOgApgg4IAAg9IOUAAIAAhNIA4AAIAABNIGsAAIAAA9g");
	this.shape.setTransform(171.55,-24.475);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(92.4,-44,158.4,39.1);


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
	this.shape.graphics.f().s("#FF0000").ss(2,0,0,3).p("ABrhJQh6BIhaBM");
	this.shape.setTransform(-42.2472,-93.4267);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-53.8,-101.8,23.299999999999997,16.89999999999999);


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

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(2,0,0,3).p("AD4g2QkvgZi7CM");
	this.shape.setTransform(5.2387,-116.2644);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20,-123.2,51.1,14.100000000000009);


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

	// Layer_7
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("Al4iCIAAAZIAAAuIAAAwIAAAtIAAAwIAAAuIAAAwIAAAuIAAAtIAAADIAAAqIBvhuQCRiJB9hUQA8gpA4gcQArgWApgPQAigNAigIIA4gKIAugCIACiDIhEAAIAAgdIhPAAIAAB+IgHACIhCASQgoAOgpAVIgCABQg5Acg6ApQiHBdiSCgIAAk8Al4kFIAABWAj4i+ICkgCIAAgaIAPgRICLAAIAAhTIh2AAADmk+IigAA");
	this.shape.setTransform(133.5279,8.2497);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1,0,0,3).p("Ai0BkIAjAAIA1AAIBKAAIAAg8IAAhGIAAhKAC1hXIhLAAIAAA5Ih8AAAiRA3IBaAAIAAhVIhaAA");
	this.shape_1.setTransform(110.475,-14.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_6
	this.instance = new lib.CachedBmp_6();
	this.instance.setTransform(95.3,-24.1,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_5
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(1,0,0,3).p("AEsjWIAACIIgkAAIkdDoIAACcIh2AAIAAGKQgRApgcAWIAAoHQC7iUCii4IgNgWQgNgQgQgDIAAAAIgJgBQgbAFgaALQiJA4h1DGIgcAyIAAJCIgfAAIAAg3IgxAAIAAlnIABgGIABgIIAJg4IANg8IAVhEQAQgtAVgnQBMiNCLhIQAlgVAsgPQAfgLAjgIIAPgDgAEusIIgCIy");
	this.shape_2.setTransform(140.825,70.0619);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_4
	this.instance_1 = new lib.CachedBmp_7();
	this.instance_1.setTransform(110.05,48.6,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_3
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(1,0,0,3).p("AgkDwIgSA3IAAIwIAiAAIAAgxIAyAAIAAnFIAiixIAAAAIACgEIAAAAIAAgBIAahAIAWg7IASg4IAQg2IAOg0IAMguIAAp5IgeAAACMsZIjUAAIAAg9IhlAAIAATWIARALIAAAAIAXAPIADACIAAGAIAhAzIAJgJIAAn4IgUgiIAAwFIDSAAIAHAWIAIAeIAHAgIAGAfIAEAiIAEAiIACAkIABAlIAAAmIgCAoIgEArIgGArIgIAuIAAABIAAABIgKAtIgJAjIg/C+AAmAMIgkBuAgRC2IgSA2AABB9IgRA2");
	this.shape_3.setTransform(52.325,61.35);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	// Layer_2
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#CCCCCC").ss(1,0,0,3).p("AiBtVIgsAsAgUrYIA6g7Ag6rYIA6g7AhgrYIA7g7AARrYIA7g7ACusDIhBBBIgDADAB8qFIAygyACCplIAsgsAB1qkIA5g5ACYsTIg7A7AA3rYIA7g7AitsDIBShSAhsqmIhBBBAitqLIBBhBAitq3IBlhlAhItCIhlBlACKohIAkgkACuofIgiAiACNmyIAhghACLmKIAjgjACNnYIAhghACBk0IAtgtACuk7Ig1A0ABgigIBOhPACukVIg/A+ACumHIgnAnAABB+IABgDIB2h3ACihxIh7B6IgBAEABACwIAAABIh1B0IgEADAgkDwIABgEIB1h2AicGLIBChBIACgDAA4DcIhuBwIgDACAAvELIhlBnIgDACAgRC3IABgEIB1h2ACUg9Ih4B4AhspaIhBBBAhso0IhBBBAhsoOIhBBBAhsnoIhBBBAhsnCIhBBBAhsmcIhBBBAhslQIhBBBAhskqIhBBBAhskEIhBBBAhsjeIhBBBAhsi4IhBBBAhsl2IhBBBAhsggIhBBAAhshGIhBBBAhshsIhBBBAhsArIhBBBAhsBRIhBBBAhsAFIhBBBAhsCdIhBBBAhsDDIhBBBAhsEPIhBBBAhsDpIhBBBAhsB3IhBBBAhsE1IhBBBAithRIBBhBACuijIhrBsABNhpIBhhgAAmE6IhcBeIgDACAAeGXIhUBWAAeITIhUBWAg2ITIBUhWAAeHtIhUBWAhYM1IgQAQAgUM0IgiAiAAeMAIglAnAAeKOIhUBWAAeLaIhUBWAg2MKIBUhWAg2KYIBUhWAAeJoIhUBWAhYGTIgqAqIgDADAhYG5IgqAqIgDADAhYHfIgqAqIgDADAhYIFIgqAqIgDADAhYKdIgqAqIgDADAh3MuIAfgfAiCKhIAqgqAiCLtIAqgqAhYLpIgqAqAhYJRIgqAqAiCJVIAqgqAAeFoIhUBWAhYFtIgtAtAhsqAIhBBBACuprIgoAn");
	this.shape_4.setTransform(52.3263,61.275);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#000000").ss(1,0,0,3).p("AgBAAIADAA");
	this.shape_5.setTransform(66.525,-18);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FEFEFE").s().p("Ag2NXIAAgCIAAglIAAgmIAAgnIAAgmIAAglIAAgwIAAgmIAAgwIAAglIAAgwIAAgmIAAgmIAAgmIAAgkIABgDIARg0IABgFIASg1IABgEIB1h1Ih1B1IARg1IABgDIB2h2Ih2B2IAkhuIABgEIB7h6Ih7B6IAmhyIATg3IAGgUIAJgjIAKgtIAAgBIAAgBIAIguIAGgrIAEgrIACgnIAAgnIgBglIAigiIAAAmIghAhIAhghIAAAmIghAiIAhgiIAAAmIgjAjIAjgjIAAAmIgnAoIAngoIAAAmIgtAtIAtgtIAAAmIg1A1IA1g1IAAAmIg/A+IA/g+IAAAmIhOBPIBOhPIAAAmIhhBgIBhhgIAAAnIhrBrIBrhrIAAACIgMAvIgOA0Ih4B4IB4h4IgQA2IgSA3IgWA8IgaBAIAAAAIAAABIgCAEIAAAAIh1B0IB1h0IgIAsIhuBvIBuhvIgJAvIhlBmIBlhmIgJAuIhcBeIBcheIgIAnIAAAHIhUBWIBUhWIAAAvIhUBXIBUhXIAAAnIhUBVIBUhVIAAAvIhUBWIBUhWIAAAmIhUBWIBUhWIAAAvIhUBXIBUhXIAAAnIhUBVIBUhVIAAAmIhUBVIBUhVIAAAmIhUBWIBUhWIAAAlIhUBXIBUhXIAAAmIglAnIgNAAIAAANIgiAiIAigiIAAAkgAgjDrIB1h2gAhoNEIAQgQIAAARIgJAKgAhoNEIgPgXIAfgfIAAAmIgQAQgAhYM0gAh3MtIgLgRIAAgKIAAgmIAAgmIAAgmIAAgmIAAgmIAAgmIAAgmIAAgmIAAgmIAAggIgDgCIAtguIAAAmIgqAqIAqgqIAAAmIgqAqIAqgqIAAAmIgqAqIAqgqIAAAmIgqAqIAqgqIAAAmIgqAqIAqgqIAAAmIgqAqIAqgqIAAAmIgqAqIAqgqIAAAmIgqAqIAqgqIAAAmIgqAqIAqgqIAAAmIgqAqIAqgqIAAAmIgfAfgAgHMmIAlgnIAAAngAiFGaIgXgQIBChBIhCBBIAAAAIgRgKIAAgLIAAgmIAAgmIAAgmIAAgmIAAgmIAAgmIAAgmIAAgmIAAgmIAAglIAAgmIAAgmIAAgmIAAgmIAAgmIAAgmIAAgmIAAgmIAAgmIAAgmIAAgmIAAgmIAAgmIAAgmIAAgmIAAgmIAAgmIAAgsIAAgmIAAgmIAAgmIAsgsIAmAAIATAAIAAATIhlBlIBlhlIAAAmIhlBlIBlhlIAAAEIDUAAIAEAAIAeAAIAAAVIhBBCIgHgXIgJAAIA7g6Ig7A6IgmAAIA7g6Ig7A6IgmAAIA7g6Ig7A6IglAAIA6g6Ig6A6IgmAAIA6g6Ig6A6IgmAAIA7g6Ig7A6IgMAAIAAAMIhBBBIBBhBIAAAmIhBBBIBBhBIAAAmIhBBBIBBhBIAAAmIhBBBIBBhBIAAAmIhBBBIBBhBIAAAmIhBBBIBBhBIAAAmIhBBBIBBhBIAAAmIhBBBIBBhBIAAAmIhBBBIBBhBIAAAmIhBBBIBBhBIAAAmIhBBBIBBhBIAAAmIhBBBIBBhBIAAAmIhBBBIBBhBIAAAmIhBBBIBBhBIAAAmIhBBBIBBhBIAAAmIhBBBIBBhBIAAAmIhBBBIBBhBIAAAmIhBBBIBBhBIAAAmIhBBAIBBhAIAAAlIhBBBIBBhBIAAAmIhBBBIBBhBIAAAmIhBBBIBBhBIAAAmIhBBBIBBhBIAAAmIhBBBIBBhBIAAAmIhBBBIBBhBIAAAmIhBBBIBBhBIAAAmIhBBBIBBhBIAAAdIASAeIACAFIAAAeIgtAugAitF1IBBhBgAitsEIBShSgAhYFsgABACwgACUg+gACumIgACumugACunUgACun6gACMn+IgCgkIAkgkIAAAmIgiAigACuoggACKoiIgEgiIAogoIAAAmIgkAkgACGpEIgEghIAsgtIAAAmIgoAogACCplIgGghIAygyIAAAmIgsAtgAB8qGIgHgeIA5g6IAAAmIgyAygAB1qkIgIgeIBBhCIAAAmIg5A6gACusEgAittWIAsAAIgsAsgAhItDgAiBtWg");
	this.shape_6.setTransform(52.325,61.35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4}]}).wait(1));

	// Layer_1
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#000000").ss(1,0,0,3).p("ACL4XIBaAAIAAgUIgOAAAImoAIAAhJIg+AAIgDl2IicAAIAApYIhkAAAG4oAIAAlVIh+AAIAAp9IivAAAge4XIAAgYIAKAAAjo1aIniAAIgGAAQh2gDmfEgQgnARgWBOIAAErIABBQIAxAAICGAAIAADQIBOAAIAAgZIBlA+IhlBBIAAgoIhOAAAiR2SIBnAAIAAhAIBfAAAge4XIBTAAAiR3EIAAhTIBzAAAiR04IhXAAIAAgiIBXAAAjo2SIAAgyIBXAAAiR2SIAAgyAjo2SIBXAAAn1mRIAAASIAAAbAnam0IAfgLAnanDIAWgIAnamlIAfgLAnXmHIAcgLAnamWIAfgLAmdlZIAAgMAmdl+IAAgSAlmn1Ik1AAIAAB2IAAAcIAAB1IgjAAIAAkyIFWAAAlmlPIAAgWAqbljICmgBIAAAPAn1l/IimAAADfkSIAABWAKdlKIAABSIiMAAIgPASIAAAaIikABAImlKIB3AAADfEsIBvhuQCQiKB/hUQA7goA4gcQArgXApgPQAjgNAhgIIA5gJIAugCIABiEIhDAAIAAgcIhQAAIAAB+IgHABIhLAWIhKAgQg5Adg6ApQiHBdiTCgIAAk9AM9lKIigAAATtnMIAagBIAAhHAUHnMIAAgBAVAoUIAABHIGnAAAbnmLImnAAAC8FxIAjAAIAAhFAgMFxIgeAAIAAgMAi5UtIAADUQgaAWgyATQgrgLgCgYIgmAAIAAh7IAQACAkOVeIAABPQAZAGAPAtIAAAfQgtACg1hzQgCgjARgVAHCViIAABQQgkAYAAAfQABAkAqgSQAHgxAnglQAIgSABgOIANAAIADB6IgoAAQgWAVgKAZIhWgxIAAjRAHoVdQAaANgCAbADfiPIAAG7A1YqzIAFk/QAIg8AugnID2ilQDhiWBegCIIAAAA7llGIDQAAIAAkaICKgDIAAhQIAzAAA4VkKIjQAAA1XpjIgBhQA2LpjIA0AAIACCEIgwBMIgTAAIgBBNIh8AAA0iqzIAxAAIABBQA0hpjIABCEIAdBMICZAAAwcmTIAAA+Au3luIBihAIAAB8g");
	this.shape_7.setTransform(73.6,9.4586);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#000000").ss(1,0,0,3).p("AED2XIAAgUIBMAAIAAg1IjtAAIAAAxIBKAAIAAAYIAABEIAADmIBXAAIAAjmgAFovLIAAleIAvAAIAAJUIgvAAgABMvLIgEDuIjSAAIAAE9IhmAAIAAgmIBGAAIAAlvICQAAIABlwIAAgUIAAgiIBlAAIAAEQIEcAAAjuj+IAAh4IBkAAIAnAAIAAkpIAgAAIAABuIAAEzgAlPj0IgvgeAiVjmIhZABIg3AAIAAgaIA3ABAlPj0IAqAaAklkRIgqAdAl+jWIAvgeABrliIg/AAIAACNIADAAIAAAAIAABDIgDAAIAAhDIgYAAIhXAAIAAgRAiVjmIBSAAIAAgYAiViSIgTAAIAAg+IhGAAAAviSIAeAAIAeAAIAAjQIC4AAIAQAAIBQAAIAACHIAAAAIAIAAIAlAAIAABJIgtAAIgtAAIgjAAIAABWIAjAAIBaAAIAAhWAiViSIAAhUAAsiSIjBAAAKelNIAAAEIiuAAIAAjoIAAhuIAsAAIAAEfIAUAAIAAAAIBuAAgAHWiSIAAhJIAaAAIAAgxICuAAAEzgPIAAgtAHWiSIAABHIAAA8IhKAAIg2AAIgjAAIAAH/IjIAAIAAqCAHWiSIB9AAIAAgyIAAgHIAHAAIBEAAIAAhBAEzliIAADQAGDiSIAAhJAV/lNIgaAAIrHAAAW3kMIsZAAARGgrIAAIxIiUATIgLAEQgjAIgfALQgsAPgmAUQiLBJhMCOQgVAngQAtIgVBEIgYCBIAAFnIAxAAIAAA3IAfAAIAApBIAcgyQB1jHCKg4QAagLAbgGIAJABIAAAAQAQAEANAPQAHAJAGAOQiiC4i8CVIAAIGAiXXdIAiAAIAAgxIA0AAIAAnFIAhixIABAAIAAgCAggM2IABgCIABgCIABAAIBBi1IApiYIAAp3AjBXVIAJgJA2MOyIglgBIAAqhIAUAAIAAmbIB6AAIgBAzIAAD6IhRAAIAAMPgAvyjWIAAHjIAZAAIAAKkIg+AAIADsEIhTABIAAkGIAAh+gA11OxIAAABIgXAA");
	this.shape_8.setTransform(61.65,-3.275);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#99CCFF").s().p("Aq8DDIg2AAIgjAAIAAgtIAjAAIBaAAIAAhXIAAhHIAmAAIAABHIAABIIAAA8gAFvg5IsZAAIiuAAIgCAAIAAg9IACAAICuAAILgAAIAAgEIAAgBIAAhHIA5AAIAABHIGnAAIAABCg");
	this.shape_9.setTransform(171.3,-24.35);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("ApDOiIAAgwIAAjUIAAnGIAhiwIABgBIAAgBIABgCIABgBIBCizIApiZIAAAMIAeAAIDIAAIAjAAIAAhFIBvhuQCQiKB+hVQA8goA4gcQArgXApgPQAigNAigIIA4gJIAugCIAAIxIiUAUIgLADQgjAIgfALQgsAPgmAVQiLBIhMCNQgVAngQAtIgVBEIgXCCIAAFnIgBDRIAAA1gAirtLIAAhWIAtAAIAtAAIAABWg");
	this.shape_10.setTransform(113.025,74.975);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#6F6F6F").s().p("AgrAPIAAgZIAAgTIAtAdIgtAegAACAAIAqgcIAAASIAAAZIAAALgAACAAg");
	this.shape_11.setTransform(27.775,-27.75);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#009930").s().p("AjFLLIAWAAIgWAAIgmAAIAAqhIAUAAIAAmbIB6AAIgBAzIAAD7IhRAAIAAMOIAAAAgACuLLIADsEIhTABIAAkGIAAh+IB1AAIAAHjIAZAAIAAKkgAjXmtIAAkaICKgDIA0AAIACCEIgwBMIgTAAIgBBNgAA6n6IgdhMIgBiEIAxAAICGAAIAADQg");
	this.shape_12.setTransform(-60.575,19.775);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#D09B30").s().p("AAdAoIgBhPIAwAAIABBPgAhNAoIAAhPIA0AAIABBPg");
	this.shape_13.setTransform(-60.65,-55.75);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#33179C").s().p("AEWBQIABjQIAxAAIAAA3IAfAAIAABPQgkAYAAAfQAAAkAqgSQAHgxAngkQAJgSABgOIANAAIACB5IgoAAQgVAVgKAZgAmOBbIglAAIAAh6IAQACQA1ByAsgCIAAgfQgPgtgZgGIAAhOIAiAAIAAgxIA0AAIAADTQgbAWgyATQgqgLgDgYg");
	this.shape_14.setTransform(82.725,154.675);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#0099C8").s().p("AiOOOQAAgfAkgYIAAhQIAApCIAcgyQB0jGCKg4QAagLAbgFIAJABIABAAQAQADAMAQQAIAJAGANQiiC4i7CUIAAIHQAaANgCAbQgBAOgIASQgnAlgHAxQgOAGgJAAQgTAAgBgYgAkYrqIBKAAIAAg8ICkgBIAAgaIAPgSICLAAIAAhSICgAAIAAB+IgHABIhLAWIhKAgQg5Adg6ApQiGBeiTCgg");
	this.shape_15.setTransform(129.275,69.7612);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#99339C").s().p("Ag6A9IAAhIIAbAAIAAgxICsAAIAABAIhEAAIgHAAIAAAHIAAAygAiMA9IAAhIIAHAAIAmAAIAABIgAiMgLIAHAAIgHAAgAiFgLg");
	this.shape_16.setTransform(114.475,-24.075);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#5E2827").s().p("AhjGpIAAqCIAAjQIC3AAIAQAAIAADQIAABWIAAAtIAAH/g");
	this.shape_17.setTransform(82.35,3.8);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#B4B647").s().p("AkBCZIAAkxIFVAAIBnAAIAAAqIhlAAIk0AAIAAB1IAAAcIAAB2gAjeAHIClABIAAAaIilABgAAfAiIAAgaIA3ABICrABIAAAXIhSAAIhZABg");
	this.shape_18.setTransform(29.1,-29.7);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#BC514F").s().p("ABhFCIAAoAIAjAAIAAG7IAABFgAiDFCIAAgMIAAp3IAeAAIAAKDgABhjrIAAhWIAjAAIAABWg");
	this.shape_19.setTransform(82.6,14.175);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FEFEFE").s().p("Ar+AYIAAg8IAAgZIBkA9IhkBAgAqaAAIBjhAIAAB8gAL4AjIAHAAIgHAHg");
	this.shape_20.setTransform(45.075,-27.2);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FF9833").s().p("AB/BoIgjAAIAAjPIBQAAIAACGIAAAAIAABJgAiJBoIgeAAIAAhDIAAAAIgEAAIAAiMIBAAAIAADPg");
	this.shape_21.setTransform(83.175,-28.375);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#F1F0E2").s().p("AAKAAIgXAAIAXAAIADAAIAAAAg");
	this.shape_22.setTransform(65,-24.675);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#99339D").s().p("AirEGIAAhCIAEAAIAABCgAirEGIjBAAIAAhTIBSAAIAAARIBYAAIAXAAIAABCgAnFCaIAAh3IBkAAIAmAAIAAkoIAhAAIAABuIAAEygAEZBQIAAjnIAAhuIArAAIAAEeIAVAAIAAAAIBuAAIAAAzIAAAEg");
	this.shape_23.setTransform(83.15,-44.25);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#F8F8F8").s().p("AmEFOIAAATIilgBIAAh2IE1AAIAAB3Ig3AAIAAgSIgqAcgAlmFYIAdgKgAloFJIAfgLgAloE7IAfgMgAloErIAfgKgAloEcIAVgIgAiQDqIAAgrIAAk7IDSAAIAEjvIEcAAIAAD3IAvAAIAbAAIB+AAIAAFUIAAAAIgUAAIAAkeIgsAAIAABtIozAAIAAhtIggAAIAAEog");
	this.shape_24.setTransform(62.225,-64.15);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#C49634").s().p("AgrBGIAAgiIBXAAIAAAigAgrgTIAAgyIBXAAIAAAyg");
	this.shape_25.setTransform(54.625,-131.25);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FEFE00").s().p("ArFJ9IABgzIh6AAIjRAAIAAg7IDRAAIB7AAIAChNIATAAIAvhMIgCiFIgBhQIAGk9QAHg8AvgnID2ilQDgiWBegDIH/AAIBXAAIBnAAIAAhAIBgAAIAADnIBWAAIAAjnICvAAIAAJ9IgaAAIAApTIgwAAIAAFeIkbAAIAAkPIhnAAIhXAAIniAAIgFAAQh2gEmeEgQgoASgWBOIAAEpIABBQIACCFIAdBMICYAAIBPAAIAAA9IhPAAIh0AAIAAB+g");
	this.shape_26.setTransform(0.975,-75.9);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#CE3333").s().p("AFaIMIAAlVIh+AAIAAp9IiwAAIAAhFIBaAAIBkAAIAAJYICdAAIACF1IA/AAIAABKgAnGHrIAAglIBFAAIAAlwICRAAIABlvIAAgTIAAgiIBmAAIAAEPIgEDuIjTAAIAAE8gACRC3IAAj2IAAleIAwAAIAAJUgAjvmGIAAgyIAAhTIByAAIBUAAIAABFIhgAAIAABAg");
	this.shape_27.setTransform(83.05,-94.15);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AjfKOIAAg9IhGAAIAAgVIBagBIAABTgADMp2IAAgUIBMAAIAOAAIAAAUgAAip2IAAgXIAKAAIBKAAIAAAXg");
	this.shape_28.setTransform(67.075,-83.45);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#009940").s().p("AgrC6IAAjlIAAhFIAAgYIhKAAIAAgxIDrAAIAAA1IhMAAIAAAUIAABFIAADlg");
	this.shape_29.setTransform(83.275,-135.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-104,-154.8,355.3,323.4);


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
	this.shape.graphics.f().s("#FF0000").ss(2,0,0,3).p("ABrhJQh6BIhaBM");
	this.shape.setTransform(-42.2472,-93.4267);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-53.8,-101.8,23.299999999999997,16.89999999999999);


(lib.shape58 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(2,0,0,3).p("AD4g2QkvgZi7CM");
	this.shape.setTransform(5.2387,-116.2644);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20,-123.2,51.1,14.100000000000009);


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
	this.shape.graphics.f().s("#FF0000").ss(2,0,0,3).p("ABrhJQh6BIhaBM");
	this.shape.setTransform(-42.2472,-93.4267);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-53.8,-101.8,23.299999999999997,16.89999999999999);


(lib.shape56 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(2,0,0,3).p("AD4g2QkvgZi7CM");
	this.shape.setTransform(5.2387,-116.2644);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20,-123.2,51.1,14.100000000000009);


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
	this.shape.graphics.f().s("#FF0000").ss(2,0,0,3).p("ABrhJQh6BIhaBM");
	this.shape.setTransform(-42.2472,-93.4267);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-53.8,-101.8,23.299999999999997,16.89999999999999);


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
	this.shape.graphics.f().s("#FF0000").ss(2,0,0,3).p("AD4g2QkvgZi7CM");
	this.shape.setTransform(5.2387,-116.2644);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20,-123.2,51.1,14.100000000000009);


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
	this.shape.graphics.f().s("#FF0000").ss(2,0,0,3).p("ABrhJQh6BIhaBM");
	this.shape.setTransform(-42.2472,-93.4267);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-53.8,-101.8,23.299999999999997,16.89999999999999);


(lib.shape52 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(2,0,0,3).p("AD4g2QkvgZi7CM");
	this.shape.setTransform(5.2387,-116.2644);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20,-123.2,51.1,14.100000000000009);


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
	this.shape.graphics.f().s("#FF0000").ss(2,0,0,3).p("ABrhJQh6BIhaBM");
	this.shape.setTransform(-42.2472,-93.4267);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-53.8,-101.8,23.299999999999997,16.89999999999999);


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
	this.shape.graphics.f().s("#FF0000").ss(2,0,0,3).p("AD4g2QkvgZi7CM");
	this.shape.setTransform(5.2387,-116.2644);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20,-123.2,51.1,14.100000000000009);


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

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(2,0,0,3).p("ABrhJQh6BIhaBM");
	this.shape.setTransform(-42.2472,-93.4267);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-53.8,-101.8,23.299999999999997,16.89999999999999);


(lib.shape48 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(2,0,0,3).p("AD4g2QkvgZi7CM");
	this.shape.setTransform(5.2387,-116.2644);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20,-123.2,51.1,14.100000000000009);


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
	this.shape.graphics.f().s("#FF0000").ss(2,0,0,3).p("ABrhJQh6BIhaBM");
	this.shape.setTransform(-42.2472,-93.4267);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-53.8,-101.8,23.299999999999997,16.89999999999999);


(lib.shape46 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(2,0,0,3).p("AD4g2QkvgZi7CM");
	this.shape.setTransform(5.2387,-116.2644);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20,-123.2,51.1,14.100000000000009);


(lib.shape44 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgJAHgIQAIgHAJAAQALAAAGAHQAIAIAAAJQAAAKgIAIQgGAHgLAAQgJAAgIgHg");
	this.shape.setTransform(-513,53.4);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgRARQgHgHAAgKQAAgKAHgHQAIgHAJAAQALAAAGAHQAIAHAAAKQAAAKgIAHQgGAIgLAAQgJAAgIgIg");
	this.shape_1.setTransform(-513,-52.6);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgRARQgHgGAAgLQAAgKAHgHQAIgHAJAAQALAAAGAHQAIAHAAAKQAAALgIAGQgGAIgLAAQgJAAgIgIg");
	this.shape_2.setTransform(-513,-169.3);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-515.5,-171.8,5,227.70000000000002);


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
	this.shape.graphics.f().s("#000000").ss(2,2,2).p("AC0hZIAACzIlnAAIAAizg");
	this.shape.setTransform(-121.775,41.225);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AizBaIAAizIFnAAIAACzg");
	this.shape_1.setTransform(-121.775,41.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-140.7,31.2,37.89999999999999,20.099999999999998);


(lib.shape36 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(2,0,0,3).p("ABiDgIjEm/");
	this.shape.setTransform(-112.45,72.05);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-123.3,48.7,21.700000000000003,46.8);


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
	this.shape.graphics.f().s("#000000").ss(2,2,2).p("AE2izIAAFnIprAAIAAlng");
	this.shape.setTransform(-124.3,-52.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("Ak1C0IAAlnIJrAAIAAFng");
	this.shape_1.setTransform(-124.3,-52.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-156.3,-71.9,64.00000000000001,38.00000000000001);


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
	this.shape.graphics.f().s("#FF0000").ss(2,0,0,3).p("AIEiJIwHET");
	this.shape.setTransform(142.45,47.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(89.9,32.2,105.19999999999999,29.699999999999996);


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

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,2,2).p("AlThZIKnAAIAACzIqnAAg");
	this.shape.setTransform(147.55,-141.55);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AlTBaIAAizIKnAAIAACzg");
	this.shape_1.setTransform(147.55,-141.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(112.6,-151.5,70,20);


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
	this.shape.graphics.f().s("#FF0000").ss(2,0,0,3).p("Ai4GpIFxtQ");
	this.shape.setTransform(121.7,-92.15);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(102.2,-135.6,38.999999999999986,86.89999999999999);


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
	this.shape.graphics.f().s("#000000").ss(2,2,2).p("AG4BaItvAAIAAizINvAAg");
	this.shape.setTransform(-112,-147.05);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("Am3BaIAAizINvAAIAACzg");
	this.shape_1.setTransform(-112,-147.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-157,-157,90,20);


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
	this.shape.graphics.f().s("#FF0000").ss(2,0,0,3).p("ADqCNInUka");
	this.shape.setTransform(-83.05,-123.85);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-107.5,-139,48.9,30.299999999999997);


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
	this.shape.graphics.f("#FF0000").s().p("AAIAXIgPAAIgbAJIAjhAIAiBBg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.5,-3.3,7,6.699999999999999);


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
	this.shape.graphics.f().s("#FF0000").ss(2,0,0,3).p("ACrGEIlVsH");
	this.shape.setTransform(-108.075,2.625);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-126.1,-37.2,36.099999999999994,79.7);


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
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("ACzAAQAABKg1A0Qg0A1hKAAQhJAAg1g1IgDgDQgygzABhIQgBhHAyg0IADgDQA1g1BJAAQBKAAA0A1QA1A1AABJg");
	this.shape.setTransform(4.0248,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#6F6F6F").s().p("Ah+B/IgDgEQgygzABhIQgBhHAygzIADgEQA1g0BJAAQBKAAA0A0QA1A1AABJQAABKg1A1Qg0A0hKAAQhJAAg1g0g");
	this.shape_1.setTransform(4.0248,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(1,0,0,3).p("AiGhBQA6h+DHhiIAOgGAhzCMIgJgMAAhEpIgNgNQg+gshHhi");
	this.shape_2.setTransform(-25.3435,-3.7418);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(1,0,0,3).p("Ah0lNQBIgiBUAAQCYAABrBsQBsBsAACXQAACYhsBsQhrBsiYAAQiXAAhshsAl5BbQgegrABg3QgBg1AUgrAlvBpIgCgC");
	this.shape_3.setTransform(0.0244,0);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FDFDFD").s().p("AjbEDIgOgMQg+gshIhiIgCgCIgIgMQgegsABg2QgBg1AUgrQA6h9DIhiIANgHQBIghBUAAQCYAABrBrQBsBsAACXQAACYhsBrQhrBsiYAAQiXAAhshsg");
	this.shape_4.setTransform(0.0244,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	// Layer_1
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#000000").ss(1,0,0,3).p("AAEAGIgEgGIgDgF");
	this.shape_5.setTransform(-37.3772,9.678);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-41.7,-37.7,83.5,75.5);


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

	// Layer_5
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("ABgA9Ii/AAIAAh5IC/AAg");
	this.shape.setTransform(-18.575,-85.975);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_4
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1,0,0,3).p("ABnA9IjNAAIAAh5IDNAAg");
	this.shape_1.setTransform(17.95,-85.975);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_3
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#666666").ss(1,0,0,3).p("ABgAIIg1A1ABgAlIgYAYABggwIhtBtABggTIhRBQAg9g8IgiAiAghg8Ig+A9AAXg8Ih2B2AA0g8Ih6B5ABQg8Ih5B5AgEg8IhbBa");
	this.shape_2.setTransform(-18.575,-85.975);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_2
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#666666").ss(1,0,0,3).p("ABnARIgtAsABngLIhKBIAhLg8IgbAaAgvg8Ig3A3AgSg8IhUBSAAJg8IhvBvABfg8Ih6B5ABDg8Ih6B5AAmg8Ih6B5ABngpIhnBm");
	this.shape_3.setTransform(17.95,-85.975);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	// Layer_1
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#000000").ss(1,0,0,3).p("Ah80IIAXgBIAAABAguNnIAAgXIAciOIAfAAIgiClgAhjR6IgFAJAhySVIgBACIAAgBIAIgNAhxSVIAAgBAjeT7QBEgnAng9ABCRyIACACABbSVIAQAVQAxA8BDAfAhj14IClAAADfV5Im9AA");
	this.shape_4.setTransform(1.0556,10.825);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#000000").ss(1,0,0,3).p("AhfykIgXAAIgYAAIAAk4IBgAAIAABuIBWAAIAAhuIBlAAIAAE4IhFAAABI0UIAABwIAAEEIAAB6IAAZUAhdMxIAA5XIAAh6IAAkFIAAhvAhdO3IAAiGAhdO3IhGgXIAAhgIBGgPAjYXdIiMAAIgBg2QAqgOAhgcQAkgNAegRAhlTtIADgGIAFgLIAAACAhrT4IgBABAhdTcIAAklABIPCIAAiUIBNATIAABbIhNAmIAAEUABKTYIARAZIAGAIADlVpIAnAOIADABIABABQAhAYAzAYQgMAaABAaIh0AA");
	this.shape_5.setTransform(0.4842,0.825);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#996699").s().p("AAAABIABgBIAAABg");
	this.shape_6.setTransform(-10.35,128.075);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FEFEFE").s().p("ABNA9IAAh5IDNAAIAAB5gAkZA9IAAh5IDBAAIAAB5g");
	this.shape_7.setTransform(0,-85.975);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#331861").s().p("ABJCcIAAhwIilAAIAABvIgCAAIgXABIAXgBIAAABIgXAAIgYAAIAAk3IBgAAIAABuIBWAAIAAhuIBlAAIAAE3g");
	this.shape_8.setTransform(0.375,-133.675);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#963063").s().p("AggBTIAAgXIAbiOIAgAAIgiClgABQhJIBNATIAABaIhNAmgAhWA/IAAiFIADAAIAACGgAhWA/IhGgXIAAhgIBGgOIAACFg");
	this.shape_9.setTransform(-0.275,89.65);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#C89FC8").s().p("ADmV5Im9AAIiNAAIAAg2QApgOAigcQAjgNAfgRQBEgnAng9IABgCIgBACIAAgBIAIgNIADgGIAFgJIACgGIABgDIAAkdIgBiHIgCAAIAA5XIAAh6IAAkFIAAhvIClAAIAABwIAAEEIAAB6IAAZUIAACUIAAEUIABACIASAZIAGAIIAQAVQAwA8BEAfIAnAOIACABIACABQAgAYA0AYQgMAaABAagAhrSVIABAAIAAgBgAgnNQIAAAXIAZAAIAiilIgfAAg");
	this.shape_10.setTransform(0.4,10.825);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-36.3,-150.2,73.4,302.1);


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
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("AIQokIhbB8AEtqiIgqCFADDq/IgeCHAJjnUIhhBsAG5piIhBB2AKogtICdg6AK6BkICfAHAJ4GgICfBWIAEABAItIZICTBeAKwDzICoA6Ah7rIIAUB+AkhqtIABADIA+B/AoQojIBnB8AseiRICMBAAponJIBlBzAmqpiIBZB9AtYBJICsgCAsFHwIClg7Ap+LGICShyAtKEyICtgm");
	this.shape.setTransform(-0.67,-13.2918);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(5,0,0,3).p("AKMqLQENEOABF9QgBF+kNEOQkOEOl+AAQl9AAkOkOQkOkOAAl+QAAl9EOkOQCLiLCohEQCfg/C5AAQC5AACfA/QCpBECLCLg");
	this.shape_1.setTransform(0,0.0248);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(3,0,0,3).p("ALKmnIicCGAIFMKIiKjBAAFsTIAADEArJmRICdCHAn0MKICgiq");
	this.shape_2.setTransform(-0.8732,-7.6618);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(3,0,0,3).p("An8MPIhEg4IgjghIgeggIgDgDQihiygrjiQgQhTAAhaIACg8QAOjoB/i6QAvhGA/g/QAlglAoggQBvhZCBguQCIgxCcAAIACAAQFmAAD+D9QA1A1ApA6QCfDZAAEbQAABXgPBRQgUBqgtBfQg+CDhvBwQgyAxg1Ao");
	this.shape_3.setTransform(-0.0757,-8.175);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-94.7,-94.6,189.4,189.3);


(lib.shape8 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(3,0,0,3).p("AA8ggQAPAbgGAbQgGAcgXAOIgCACQgZAOgcgJQgcgJgQgcQgIgOgCgPIAAgaQAHgdAXgOIACgBQAYgOAcAJQAdAJAPAbg");
	this.shape.setTransform(2.0369,-1.1463);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(3,0,0,3).p("ABMA6IEKCRQCBg6heheIkZhZAghAAIlgi/IF+B5");
	this.shape_1.setTransform(-1.5546,-0.5435);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FF0000").s().p("AgPBHQgcgJgQgcQgIgOgCgPIAAgaQAHgdAXgOIACgBQAYgOAcAJQAdAJAPAbIABACQAPAbgGAbQgGAcgXAOIgCACQgPAIgRAAQgKAAgLgDg");
	this.shape_2.setTransform(2.0378,-1.1463);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AA8A1QAXgOAGgcQAGgbgOgbIEZBZQBeBeiCA5gAmQjEIF9B5QgXAOgGAdIgBAbg");
	this.shape_3.setTransform(-0.0233,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-44.7,-22.5,86.30000000000001,43.9);


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
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("Ah0AKQAAgwAjgjQAjgjAwAAQAxAAAjAjQAjAjAAAwQAAAxgjAjIgLAKQgfAYgqABQgpgBgfgYIgLgKQgjgjAAgxgABDAHQAAAcgUAUQgUATgbAAQgcAAgUgTQgTgUAAgcQAAgbATgUQAUgTAcAAQAbAAAUATQAUAUAAAbgAiJgeQAJgiAcgaQApgmA6ABQA5gBApAmQAnAlACAz");
	this.shape.setTransform(0,41.5997);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1,0,0,3).p("AAylDIAsAAIAAjQIi8AAIAADQIApAAIAAiTIBnAAgAg1CcIh6AAIAAF4IAmAAIAAiHACJGpIAABrIAlAAIACl4Ih+AAIAAnfAg1CcIBnAAAg1lDIAAHf");
	this.shape_1.setTransform(0.0267,-1.225);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FDFDFD").s().p("AgvAwQgTgUAAgcQAAgbATgUQAUgTAbAAQAcAAAUATQATAUAAAbQAAAcgTAUQgUATgcAAQgbAAgUgTg");
	this.shape_2.setTransform(-0.075,42.275);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#333367").s().p("AhIBeIgLgKQgjgjAAgxQAAgwAjgjQAjgjAwAAQAxAAAjAjQAiAjABAwQgBAxgiAjIgMAKQgfAYgpABQgpgBgfgYgAgygyQgTAUAAAcQAAAbATAUQAUATAcAAQAbAAAUgTQATgUAAgbQAAgcgTgUQgUgTgbAAQgcAAgUATg");
	this.shape_3.setTransform(0.225,42.575);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#CD3333").s().p("ACJH1IAAhqQgBg0gogkQgogmg5AAQg6AAgpAmQgcAagJAhIAACHIgmAAIAAl4IB6AAIBnAAIB+AAIgCF4gAAyB9IhnAAIAAnfIAAiSIBnAAIAACSIAAHfgAg1B9g");
	this.shape_4.setTransform(0.025,1.825);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#332E68").s().p("AAzBoIAAiSIhnAAIAACSIgqAAIAAjPIC8AAIAADPg");
	this.shape_5.setTransform(-0.05,-44.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-18.6,-55.4,37.3,110.9);


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

	// Layer_9
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("AAAgTQAIAAAGAGQAGAGAAAHQAAAIgGAGQgGAGgIAAQgHAAgGgGQgGgGAAgIQAAgHAGgGQAGgGAHAAg");
	this.shape.setTransform(-13.625,20.3731);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgNAOQgGgGAAgIQAAgHAGgGQAGgGAHAAQAIAAAGAGQAGAGAAAHQAAAIgGAGQgGAGgIAAQgHAAgGgGg");
	this.shape_1.setTransform(-13.625,20.3731);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_8
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(1,0,0,3).p("AgNgNQAGgGAHAAQAIAAAGAGQAGAGAAAHQAAAIgGAGQgGAGgIAAQgHAAgGgGQgGgGAAgIQAAgHAGgGg");
	this.shape_2.setTransform(-13.625,11.1231);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgNAOQgGgGAAgIQAAgHAGgGQAGgGAHAAQAIAAAGAGQAGAGAAAHQAAAIgGAGQgGAGgIAAQgHAAgGgGg");
	this.shape_3.setTransform(-13.625,11.1231);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	// Layer_7
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#000000").ss(1,0,0,3).p("AAOgNQAGAGAAAHQAAAIgGAGQgGAGgIAAQgHAAgGgGQgGgGAAgIQAAgHAGgGQAGgGAHAAQAIAAAGAGg");
	this.shape_4.setTransform(-13.625,1.4731);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AgNAOQgGgGAAgIQAAgHAGgGQAGgGAHAAQAIAAAGAGQAGAGAAAHQAAAIgGAGQgGAGgIAAQgHAAgGgGg");
	this.shape_5.setTransform(-13.625,1.4731);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4}]}).wait(1));

	// Layer_6
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#000000").ss(1,0,0,3).p("AAAAUQgHAAgGgGQgGgGAAgIQAAgHAGgGQAGgGAHAAQAIAAAGAGQAGAGAAAHQAAAIgGAGQgGAGgIAAg");
	this.shape_6.setTransform(-13.625,-8.2769);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgNAOQgGgGAAgIQAAgHAGgGQAGgGAHAAQAIAAAGAGQAGAGAAAHQAAAIgGAGQgGAGgIAAQgHAAgGgGg");
	this.shape_7.setTransform(-13.625,-8.2769);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6}]}).wait(1));

	// Layer_5
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#000000").ss(1,0,0,3).p("AAAAUQgHAAgGgGQgGgGAAgIQAAgHAGgGQAGgGAHAAQAIAAAGAGQAGAGAAAHQAAAIgGAGQgGAGgIAAg");
	this.shape_8.setTransform(13.525,-8.2769);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgNAOQgGgGAAgIQAAgHAGgGQAGgGAHAAQAIAAAGAGQAGAGAAAHQAAAIgGAGQgGAGgIAAQgHAAgGgGg");
	this.shape_9.setTransform(13.525,-8.2769);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8}]}).wait(1));

	// Layer_4
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#000000").ss(1,0,0,3).p("AgNgNQAGgGAHAAQAIAAAGAGQAGAGAAAHQAAAIgGAGQgGAGgIAAQgHAAgGgGQgGgGAAgIQAAgHAGgGg");
	this.shape_10.setTransform(13.525,0.6231);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AgNAOQgGgGAAgIQAAgHAGgGQAGgGAHAAQAIAAAGAGQAGAGAAAHQAAAIgGAGQgGAGgIAAQgHAAgGgGg");
	this.shape_11.setTransform(13.525,0.6231);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10}]}).wait(1));

	// Layer_3
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#000000").ss(1,0,0,3).p("AAAAUQgHAAgGgGQgGgGAAgIQAAgHAGgGQAGgGAHAAQAIAAAGAGQAGAGAAAHQAAAIgGAGQgGAGgIAAg");
	this.shape_12.setTransform(13.525,11.1231);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AgNAOQgGgGAAgIQAAgHAGgGQAGgGAHAAQAIAAAGAGQAGAGAAAHQAAAIgGAGQgGAGgIAAQgHAAgGgGg");
	this.shape_13.setTransform(13.525,11.1231);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_13},{t:this.shape_12}]}).wait(1));

	// Layer_2
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#000000").ss(1,0,0,3).p("AgNAOQgGgGAAgIQAAgHAGgGQAGgGAHAAQAIAAAGAGQAGAGAAAHQAAAIgGAGQgGAGgIAAQgHAAgGgGg");
	this.shape_14.setTransform(13.525,20.3731);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AgNAOQgGgGAAgIQAAgHAGgGQAGgGAHAAQAIAAAGAGQAGAGAAAHQAAAIgGAGQgGAGgIAAQgHAAgGgGg");
	this.shape_15.setTransform(13.525,20.3731);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_15},{t:this.shape_14}]}).wait(1));

	// Layer_1
	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().s("#000000").ss(1,0,0,3).p("ABejyIAAA3IBSgBIAAGqIlfAAIAAm0IBRAAIAAgs");
	this.shape_16.setTransform(0.025,0.25);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FDFDFD").s().p("AivDwIAAmzIBRAAIAAgsIC8AAIAAA3IBSgBIAAGpg");
	this.shape_17.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_17},{t:this.shape_16}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-18.6,-25,37.3,50);


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

	// Layer_7
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("Al4iCIAAAZIAAAuIAAAwIAAAtIAAAwIAAAuIAAAwIAAAuIAAAtIAAADIAAAqIBvhuQCRiJB9hUQA8gpA4gcQArgWApgPQAigNAigIIA4gKIAugCIACiDIhEAAIAAgdIhPAAIAAB+IgHACIhCASQgoAOgpAVIgCABQg5Acg6ApQiHBdiSCgIAAk8Al4kFIAABWAgwk+IB2AAIAABTIiLAAIgPARIAAAaIikACABGk+ICgAA");
	this.shape.setTransform(133.5279,8.2497);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1,0,0,3).p("Ai0BkIAjAAIA1AAIBKAAIAAg8IAAhGIB8AAIAAg5IBLAAAiRA3IBaAAIAAhVIhaAAAgSgeIAAhK");
	this.shape_1.setTransform(110.475,-14.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_6
	this.instance = new lib.CachedBmp_6();
	this.instance.setTransform(95.3,-24.1,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_5
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(1,0,0,3).p("AEsjWIAACIIgkAAIkdDoIAACcIh2AAIAAGKQgRApgcAWIAAoHQC7iUCii4IgNgWQgNgQgQgDIAAAAIgJgBQgbAFgaALQiJA4h1DGIgcAyIAAJCIgfAAIAAg3IgxAAIAAlnIABgGIABgIIAJg4IANg8IAVhEQAQgtAVgnQBMiNCLhIQAlgVAsgPQAfgLAjgIIAPgDgAEusIIgCIy");
	this.shape_2.setTransform(140.825,70.0619);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_4
	this.instance_1 = new lib.CachedBmp_7();
	this.instance_1.setTransform(110.05,48.6,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_3
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(1,0,0,3).p("ACMsZIjUAAIAAg9IhlAAIAATWIARALIAAAAIAXAPIADACIAAGAIAhAzIAJgJIAAn4IgUgiIAAwFIDSAAIAHAWIAIAeIAHAgIAGAfIAEAiIAEAiIACAkIABAlIAAAmIgCAoIgEArIgGArIgIAuIAAABIAAABIgKAtIgJAjIg/C+AgkDwIgSA3IAAIwIAiAAIAAgxIAyAAIAAnFIAiixIAAAAIACgEIAAAAIAAgBIAahAIAWg7IASg4IAQg2IAOg0IAMguIAAp5IgeAAAAmAMIgkBuAgRC2IgSA2AABB9IgRA2");
	this.shape_3.setTransform(52.325,61.35);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	// Layer_2
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#CCCCCC").ss(1,0,0,3).p("AiBtVIgsAsAARrYIA7g7AhgrYIA7g7Ag6rYIA6g7AgUrYIA6g7ABqq/IADgDIBBhBAB8qFIAygyACCplIAsgsAB1qkIA5g5ACYsTIg7A7AA3rYIA7g7AhItCIhlBlAhIscIhlBlAhsrMIhBBBAhsqmIhBBBAitsDIBShSACMn9IAigiACKohIAkgkACLmKIAjgjACNmyIAhghACNnYIAhghACBk0IAtgtAB5kHIA1g0ABgigIBOhPABvjXIA/g+ACHlgIAngnACihxIh7B6IgBAEAB4AEIh2B3IgBADAg5EoIAEgDIB1h0IAAgBAgkDwIABgEIB1h2AhYFHIgCADIhCBBAg5F0IADgCIBlhnAg5FOIADgCIBuhwAgRC3IABgEIB1h2ACUg9Ih4B4ABNhpIBhhgACuijIhrBsAhsE1IhBBBAhsiSIhBBBAhsB3IhBBBAhsDpIhBBBAhsEPIhBBBAhsCdIhBBBAhsDDIhBBBAhsAFIhBBBAhsBRIhBBBAhsArIhBBBAhshGIhBBBAhsggIhBBAAhshsIhBBBAhsl2IhBBBAhsi4IhBBBAhsjeIhBBBAhskEIhBBBAhskqIhBBBAhslQIhBBBAhspaIhBBBAhso0IhBBBAhsnoIhBBBAhsoOIhBBBAhsnCIhBBBAhsmcIhBBBAAmE6IhcBeIgDACAAeITIhUBWAAeG9IhUBWAAeHtIhUBWAAeGXIhUBWAhYM1IgQAQAgUM0IgiAiAAeMAIglAnAAeLaIhUBWAAeK0IhUBWAAeKOIhUBWAAeJoIhUBWAAeJCIhUBWAhYGTIgqAqIgDADAhYG5IgqAqIgDADAhYIFIgqAqIgDADAhYHfIgqAqIgDADAhYKdIgqAqIgDADAhYLDIgqAqAhYLpIgqAqAhYMPIgfAfAhYIrIgqAqAhYJRIgqAqAhYJ3IgqAqAAeFoIhUBWAhYFtIgtAtACGpEIAognAhsqAIhBBB");
	this.shape_4.setTransform(52.3263,61.275);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#000000").ss(1,0,0,3).p("AgBAAIADAA");
	this.shape_5.setTransform(66.525,-18);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FEFEFE").s().p("Ag2NXIAAgCIAAglIAAgmIAAgnIAAgmIAAglIAAgwIAAgmIAAgwIAAglIAAgwIAAgmIAAgmIAAgmIAAgkIABgDIARg0IABgFIASg1IABgEIARg1IABgDIB2h2Ih2B2IAkhuIABgEIB7h6Ih7B6IAmhyIATg3IAGgUIAJgjIAKgtIAAgBIAAgBIAIguIAGgrIAEgrIACgnIAAgnIgBglIAigiIAAAmIghAhIAhghIAAAmIghAiIAhgiIAAAmIgjAjIAjgjIAAAmIgnAoIAngoIAAAmIgtAtIAtgtIAAAmIg1A1IA1g1IAAAmIg/A+IA/g+IAAAmIhOBPIBOhPIAAAmIhhBgIBhhgIAAAnIhrBrIBrhrIAAACIgMAvIgOA0Ih4B4IB4h4IgQA2IgSA3IgWA8IgaBAIAAAAIAAABIgCAEIAAAAIh1B0IB1h0IAAAAIAAAAIgIAsIhuBvIBuhvIgJAvIhlBmIBlhmIgJAuIhcBeIBcheIgIAnIAAAHIhUBWIBUhWIAAAvIhUBXIBUhXIAAAnIhUBVIBUhVIAAAvIhUBWIBUhWIAAAmIhUBWIBUhWIAAAvIhUBXIBUhXIAAAnIhUBVIBUhVIAAAmIhUBVIBUhVIAAAmIhUBWIBUhWIAAAlIhUBXIBUhXIAAAmIglAnIgNAAIAAANIgiAiIAigiIAAAkgAgjDrIB1h2gAgQCyIB1h1gAhoNEIAQgQIAAARIgJAKgAhoNEIgPgXIAfgfIAAAmIgQAQgAhYM0gAh3MtIgLgRIAAgKIAAgmIAAgmIAAgmIAAgmIAAgmIAAgmIAAgmIAAgmIAAgmIAAggIgDgCIAtguIAAAmIgqAqIAqgqIAAAmIgqAqIAqgqIAAAmIgqAqIAqgqIAAAmIgqAqIAqgqIAAAmIgqAqIAqgqIAAAmIgqAqIAqgqIAAAmIgqAqIAqgqIAAAmIgqAqIAqgqIAAAmIgqAqIAqgqIAAAmIgqAqIAqgqIAAAmIgfAfgAgHMmIAlgnIAAAngAiFGaIgXgQIBChBIhCBBIAAAAIgRgKIAAgLIAAgmIAAgmIAAgmIAAgmIAAgmIAAgmIAAgmIAAgmIAAgmIAAglIAAgmIAAgmIAAgmIAAgmIAAgmIAAgmIAAgmIAAgmIAAgmIAAgmIAAgmIAAgmIAAgmIAAgmIAAgmIAAgmIAAgmIAAgsIAAgmIAAgmIAAgmIAAgsIAsAAIAmAAIATAAIAAATIhlBlIBlhlIAAAmIhlBlIBlhlIAAAEIDUAAIAEAAIAeAAIAAAVIhBBCIgHgXIgJAAIA7g6Ig7A6IgmAAIA7g6Ig7A6IgmAAIA7g6Ig7A6IglAAIA6g6Ig6A6IgmAAIA6g6Ig6A6IgmAAIA7g6Ig7A6IgMAAIAAAMIhBBBIBBhBIAAAmIhBBBIBBhBIAAAmIhBBBIBBhBIAAAmIhBBBIBBhBIAAAmIhBBBIBBhBIAAAmIhBBBIBBhBIAAAmIhBBBIBBhBIAAAmIhBBBIBBhBIAAAmIhBBBIBBhBIAAAmIhBBBIBBhBIAAAmIhBBBIBBhBIAAAmIhBBBIBBhBIAAAmIhBBBIBBhBIAAAmIhBBBIBBhBIAAAmIhBBBIBBhBIAAAmIhBBBIBBhBIAAAmIhBBBIBBhBIAAAmIhBBBIBBhBIAAAmIhBBAIBBhAIAAAlIhBBBIBBhBIAAAmIhBBBIBBhBIAAAmIhBBBIBBhBIAAAmIhBBBIBBhBIAAAmIhBBBIBBhBIAAAmIhBBBIBBhBIAAAmIhBBBIBBhBIAAAmIhBBBIBBhBIAAAdIASAeIACAFIAAAeIgtAugAitF1IBBhBgAitsEIBShSgAitsqIAsgsgAhYFsgAA4DcgACUg+gACumIgACumugACunUgACun6gACMn+IgCgkIAkgkIAAAmIgiAigACuoggACKoiIgEgiIAogoIAAAmIgkAkgACGpEIgEghIAsgtIAAAmIgoAogACCplIgGghIAygyIAAAmIgsAtgAB8qGIgHgeIA5g6IAAAmIgyAygAB1qkIgIgeIBBhCIAAAmIg5A6gACusEgAhItDg");
	this.shape_6.setTransform(52.325,61.35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4}]}).wait(1));

	// Layer_1
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#000000").ss(1,0,0,3).p("ACL4XIBaAAIAAgUIgOAAADl4XIBkAAIAAJYICcAAIADF2IA+AAIAABJAG4oAIAAlVIh+AAIAAp9IivAAAge4XIAAgYIAKAAAjo1aIniAAIgGAAQh2gDmfEgQgnARgWBOIAAErIABBQIAxAAICGAAIAADQIBOAAIAAgZIBlA+IhlBBIAAgoIhOAAAge4XIBTAAAiR2SIBnAAIAAhAIBfAAAiR3EIAAhTIBzAAAiR04IhXAAIAAgiAjo2SIAAgyIBXAAAiR1aIhXAAAiR2SIAAgyAjo2SIBXAAAnam0IAfgLAnamWIAfgLAnXmHIAcgLAnamlIAfgLAn1l/IAAAbAnanDIAWgIAn1l/IAAgSAmdllIAAAMAmdmQIAAASAqbljIAAgcICmAAAlmn1Ik1AAIAAB2AqbljIAAB1IgjAAIAAkyIFWAAAlmlPIAAgWAn1lVIAAgPIimABADfiPIAAAZIAAAvIAAAvIAAAuIAAAvIAAAvIAAAvIAAAvIAAAtIAAACIAAArIAABFIgjAAADfkSIAABWAKdlKIAABSIiMAAIgPASIAAAaIhBABIhjAAAM9lKIAAB+IgHABIgxANIgQAGIgKADIhIAfIgCABQg5Adg6ApQiHBdiTCgIAAk9AImlKIB3AAICgAAIBQAAIAAAcIBDAAIgBCEIguACIg5AJQghAIgjANQgpAPgrAXQg4Acg7AoQh/BUiQCKIhvBuATtnMIAagBIAAhHAUHnMIAAgBAVAoUIAABHIGnAAAbnmLImnAAAgMFxIgeAAIAAgMAi5UtIAADUQgaAWgyATQgrgLgCgYIgmAAIAAh7IAQACAkOVeIAABPQAZAGAPAtIAAAfQgtACg1hzQgCgjARgVAIAWFQgBAOgIASQgnAlgHAxQgqASgBgkQAAgfAkgYIAAhQAIAWFIANAAIADB6IgoAAQgWAVgKAZIhWgxIAAjRAHoVdQAaANgCAbA1YqzIAFk/QAIg8AugnID2ilQDhiWBegCIIAAAA7llGIDQAAIAAkaICKgDIAAhQIAzAAA4VkKIjQAAA1XpjIg0AAA1XpjIgBhQA0iqzIAxAAIABBQA0hpjIABCEIAdBMICZAAA4VlGIB8AAIABhNIATAAIAwhMIgCiEAwcmTIAAA+Au3luIBihAIAAB8g");
	this.shape_7.setTransform(73.6,9.4586);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#000000").ss(1,0,0,3).p("AED2XIAAgUIBMAAIAAg1IjtAAIAAAxIBKAAIAAAYIAABEIAADmIBXAAIAAjmgAFovLIAAleIAvAAIAAJUIgvAAgABMvLIgEDuIjSAAIAAE9IhmAAIAAgmIBGAAIAAlvICQAAIABlwIAAgUIAAgiIBlAAIAAEQIEcAAAjuj+IAAh4IBkAAIAnAAIAAkpIAgAAIAABuIAAEzgAl+kSIAvAeIgvAeAiVjmIhZABIg3AAIAAgaIA3ABAkljaIgqgaIAqgdABrliIg/AAIAACNIADAAIAAAAIAABDIgDAAIjBAAIgTAAIAAg+IhGAAAiVjmIBSAAIAAgYABNiSIgeAAAhDjmIAAARIBXAAIAYAAIAABDABNiSIAeAAIAAjQIC4AAIAQAAIBQAAIAACHIAAAAIAIAAIAlAAIAABJAiVjmIAABUAKelNIAAAEIiuAAIAAjoIAAhuIAsAAIAAEfIAUAAIAAAAIBuAAIAAAzILHAAIAaAAAHWiSIAAhJIAaAAIAAgxICuAAIAABBIhEAAIgHAAIAAAHIAAAygAGDiSIgtAAIgjAAIAAjQAEzg8IAjAAIBaAAIAAhWAEzg8IAAAtIAjAAIA2AAIBKAAIAAg8IAAhHAEzg8IAAhWAGDiSIAtAAAGDjbIAABJAW3kMIsZAAARGgrIAAIxIiUATIgLAEQgjAIgfALQgsAPgmAUQiLBJhMCOQgVAngQAtIgVBEIgNA8IgJA4IgBAHIgBAGIAAFnIAxAAIAAA3IAfAAIAApBIAcgyQB1jHCKg4QAagLAbgGIAJABIAAAAQAQAEANAPQAHAJAGAOQiiC4i8CVIAAIGAgfM0IABgCIABAAIAahBIAUg7IATg5IAQg2IAOg0IAJgjIACgLIAAp3AgfM0IgBACIABAAgAiXXdIAiAAIAAgxIA0AAIAAnFIAFgdIAJgrIAAgDIAThmAjBXVIAJgJAEzgPIAAH/IjIAAIAAqCA2MOyIglgBIAAqhIAUAAIAAmbIB6AAIgBAzIAAD6IhRAAIAAMPAvyjWIAAHjIAZAAIAAKkIg+AAIADsEIhTABIAAkGIAAh+gA2MOyIAXgBIAAABg");
	this.shape_8.setTransform(61.65,-3.275);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#99CCFF").s().p("Aq8DDIg2AAIgjAAIAAgtIAjAAIBaAAIAAhXIAAhHIAmAAIAABHIAABIIAAA8gAFvg5IsZAAIiuAAIgCAAIAAg9IACAAICuAAILgAAIAAgEIAAgBIAAhHIA5AAIAABHIGnAAIAABCg");
	this.shape_9.setTransform(171.3,-24.35);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("ApDOiIAAgwIAAjUIAAnGIAFgdIAJgqIAAgEIAThlIABgCIABgCIABgBIAag/IAVg8IATg4IAQg2IAOg0IAJgkIACgLIAAAMIAeAAIDIAAIAjAAIAAhFIBvhuQCQiKB+hVQA8goA4gcQArgXApgPQAigNAigIIA4gJIAugCIAAIxIiUAUIgLADQgjAIgfALQgsAPgmAVQiLBIhMCNQgVAngQAtIgVBEIgMA8IgJA4IgBAIIgBAGIAAFnIgBDRIAAA1gAirtLIAAhWIAtAAIAtAAIAABWg");
	this.shape_10.setTransform(113.025,74.975);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#6F6F6F").s().p("AgrAPIAAgZIAAgTIAtAdIAqgcIAAASIAAAZIAAALIgqgaIgtAeg");
	this.shape_11.setTransform(27.775,-27.75);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#009930").s().p("AjFLLIAWAAIgWAAIgmAAIAAqhIAUAAIAAmbIB6AAIgBAzIAAD7IhRAAIAAMOIAAAAgACuLLIADsEIhTABIAAkGIAAh+IB1AAIAAHjIAZAAIAAKkgAjXmtIAAkaICKgDIA0AAIACCEIgwBMIgTAAIgBBNgAA6n6IgdhMIgBiEIAxAAICGAAIAADQg");
	this.shape_12.setTransform(-60.575,19.775);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#D09B30").s().p("AAdAoIgBhPIAwAAIABBPgAhNAoIAAhPIA0AAIABBPg");
	this.shape_13.setTransform(-60.65,-55.75);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#33179C").s().p("AEWBQIABjQIAxAAIAAA3IAfAAIAABPQgkAYAAAfQAAAkAqgSQAHgxAngkQAJgSABgOIANAAIACB5IgoAAQgVAVgKAZgAmOBbIglAAIAAh6IAQACQA1ByAsgCIAAgfQgPgtgZgGIAAhOIAiAAIAAgxIA0AAIAADTQgbAWgyATQgqgLgDgYg");
	this.shape_14.setTransform(82.725,154.675);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#0099C8").s().p("ACgOOQAAgfAkgYIAAhQIAApCIAcgyQB1jGCKg4QAagLAbgFIAJABIAAAAQAQADANAQQAHAJAGANQiiC4i8CUIAAIHQAaANgBAbQgBAOgJASQgnAlgHAxQgNAGgKAAQgTAAAAgYgApGMzQgCgjARgVIAJgKIAAn3IgUgjIAAwEIDTAAIAGAWIABACIAGAYIABAEIAGAXIADAQIAEAYIAFAhIACARIABASIADAkIABAlIgBAmIAAAQIgBAEIgBAUIgEAqIgGAsIgHAtIgBABIAAACIgKAtIgIAiIh6FwIAAABIggBhIgDAIIgBACIAAABIAAIwIAABPQAZAGAPAtIAAAfIgCAAQgrAAg0hxgAAWrqIBKAAIAAg8IBjAAIBBgBIAAgaIAPgSICMAAIAAhSICgAAIAAB+IgHABIgxANIgRAGIgKADIhHAfIgCABQg5Adg7ApQiHBeiSCgg");
	this.shape_15.setTransform(99.0145,69.7612);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#99339C").s().p("Ag6A9IAAhIIAbAAIAAgxICsAAIAABAIhEAAIgHAAIAAAHIAAAygAiMA9IAAhIIAHAAIAmAAIAABIgAiMgLIAHAAIgHAAgAiFgLg");
	this.shape_16.setTransform(114.475,-24.075);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#5E2827").s().p("AhjGpIAAqCIAAjQIC3AAIAQAAIAADQIAABWIAAAtIAAH/g");
	this.shape_17.setTransform(82.35,3.8);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#B4B647").s().p("AkBCZIAAkxIFVAAIBnAAIAAAqIhlAAIk0AAIAAB1IClABIAAAaIilABIAAgcIAAAcIAAB2gAAfAiIAAgaIA3ABICrABIAAAXIhSAAIhZABg");
	this.shape_18.setTransform(29.1,-29.7);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#BC514F").s().p("ABhFCIAAoAIAjAAIAAAZIAAAvIAAAvIAAAvIAAAuIAAAvIAAAvIAAAvIAAAtIAAACIAAArIAABFgAiDFCIAAgMIAAp3IAeAAIAAKDgABhjrIAAhWIAjAAIAABWg");
	this.shape_19.setTransform(82.6,14.175);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FEFEFE").s().p("AAOJuIAAgBIAAACgAAOJsIADgIIgCAHIgBACgAr+oVIAAg9IAAgZIBkA9IhkBBgAqaouIBjhAIAAB8gAL4oKIAHAAIgHAHg");
	this.shape_20.setTransform(45.075,28.625);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FF9833").s().p("AB/BoIgjAAIAAjPIBQAAIAACGIAAAAIAABJgAiJBoIgeAAIAAhDIAAAAIgEAAIAAiMIBAAAIAADPg");
	this.shape_21.setTransform(83.175,-28.375);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#F1F0E2").s().p("AAKAAIgXAAIAXAAIADAAIAAAAg");
	this.shape_22.setTransform(65,-24.675);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#99339D").s().p("AirEGIAAhCIAABCIjBAAIAAhTIBSAAIAAARIBYAAIAXAAIAEAAIAABCgAnFCaIAAh3IBkAAIAmAAIAAkoIAhAAIAABuIAAEygAEZBQIAAjnIAAhuIArAAIAAEeIAVAAIAAAAIBuAAIAAAzIAAAEg");
	this.shape_23.setTransform(83.15,-44.25);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#F8F8F8").s().p("AmEFOIAAATIilgBIAAh2IE1AAIAAB3Ig3AAIAAgSIgqAcgAlmFYIAdgKgAloFJIAfgLgAloE7IAfgMgAloErIAfgKgAloEcIAVgIgAiQDqIAAgrIAAk7IDSAAIAEjvIEcAAIAAD3IAvAAIAbAAIB+AAIAAFUIAAAAIgUAAIAAkeIgsAAIAABtIozAAIAAhtIggAAIAAEog");
	this.shape_24.setTransform(62.225,-64.15);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#C49634").s().p("AgrBGIAAgiIBXAAIAAAigAgrgTIAAgyIBXAAIAAAyg");
	this.shape_25.setTransform(54.625,-131.25);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FEFE00").s().p("ArFJ9IABgzIh6AAIjRAAIAAg7IDRAAIB7AAIAChNIATAAIAvhMIgCiFIgBhQIAGk9QAHg8AvgnID2ilQDgiWBegDIH/AAIBXAAIBnAAIAAhAIBgAAIAADnIBWAAIAAjnICvAAIAAJ9IgaAAIAApTIgwAAIAAFeIkbAAIAAkPIhnAAIhXAAIniAAIgFAAQh2gEmeEgQgoASgWBOIAAEpIABBQIACCFIAdBMICYAAIBPAAIAAA9IhPAAIh0AAIAAB+g");
	this.shape_26.setTransform(0.975,-75.9);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#CE3333").s().p("AFaIMIAAlVIh+AAIAAp9IiwAAIAAhFIBaAAIBkAAIAAJYICdAAIACF1IA/AAIAABKgAnGHrIAAglIBFAAIAAlwICRAAIABlvIAAgTIAAgiIBmAAIAAEPIgEDuIjTAAIAAE8gACRC3IAAj2IAAleIAwAAIAAJUgAjvmGIAAgyIAAhTIByAAIBUAAIAABFIhgAAIAABAg");
	this.shape_27.setTransform(83.05,-94.15);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AjfKOIAAg9IhGAAIAAgVIBagBIAABTgADMp2IAAgUIBMAAIAOAAIAAAUgAAip2IAAgXIAKAAIBKAAIAAAXg");
	this.shape_28.setTransform(67.075,-83.45);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#009940").s().p("AgrC6IAAjlIAAhFIAAgYIhKAAIAAgxIDrAAIAAA1IhMAAIAAAUIAABFIAADlg");
	this.shape_29.setTransform(83.275,-135.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-104,-154.8,355.3,323.4);


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

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#99CCFF").s().p("AkhivIJBAAIAADhIACAAIAABCIgCAAIAAA1IiBAAIAAiKIhQAAIAAgJIiqAAIAAAJIhTAAIAACRIhzAAg");
	this.shape.setTransform(0.85,1.25);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-28.1,-16.4,58,35.3);


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


(lib.sprite142 = function(mode,startPosition,loop,reversed) {
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
	this.frame_1089 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1089).call(this.frame_1089).wait(1));

	// Masked_Layer_15___9
	this.instance = new lib.text141("synched",0);
	this.instance.setTransform(-473.45,249.45);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1090));

	// Masked_Layer_14___9
	this.instance_1 = new lib.text140("synched",0);
	this.instance_1.setTransform(-472.8,157.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1090));

	// Masked_Layer_13___9
	this.instance_2 = new lib.shape139("synched",0);
	this.instance_2.setTransform(-133,-13.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1090));

	// Masked_Layer_11___9
	this.instance_3 = new lib.text138("synched",0);
	this.instance_3.setTransform(-488.4,15.05);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1090));

	// Masked_Layer_10___9
	this.instance_4 = new lib.text137("synched",0);
	this.instance_4.setTransform(-488.4,130.45);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1090));

	// Mask_Layer_1 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EgkZAd2MAAAg5zMBIzAAAMAAAA5zg");
	mask.setTransform(230.8647,191.0315);

	// Masked_Layer_7___1
	this.instance_5 = new lib.shape136("synched",0);

	var maskedShapeInstanceList = [this.instance_5];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1090));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-492.3,11.7,956.2,364.8);


(lib.sprite86 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.shape85("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite86, new cjs.Rectangle(-24.6,-19,47.6,38), null);


(lib.sprite84 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.shape83("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite84, new cjs.Rectangle(-23.5,-30.2,47.6,60.5), null);


(lib.sprite82 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.shape81("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite82, new cjs.Rectangle(-18.1,-29.8,37.3,59.7), null);


(lib.sprite80 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.shape79("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite80, new cjs.Rectangle(-23.6,-18.7,47.3,38.5), null);


(lib.sprite78 = function(mode,startPosition,loop,reversed) {
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
	this.frame_9 = function() {
		this.gotoAndPlay(0);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(9).call(this.frame_9).wait(1));

	// Layer_3
	this.instance = new lib.shape77("synched",0);

	this.instance_1 = new lib.shape21("synched",0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},5).wait(5));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-41.7,-37.8,83.5,75.69999999999999);


(lib.sprite25 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.shape24("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite25, new cjs.Rectangle(-3.5,-3.3,7,6.699999999999999), null);


(lib.sprite22 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.shape21("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite22, new cjs.Rectangle(-41.7,-37.7,83.5,75.5), null);


(lib.sprite20 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.shape19("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite20, new cjs.Rectangle(-36.3,-150.2,73.4,302.1), null);


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

	// Layer_6
	this.instance = new lib.shape16("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_5
	this.instance_1 = new lib.text15("synched",0);
	this.instance_1.setTransform(22.55,-40.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_4
	this.instance_2 = new lib.text14("synched",0);
	this.instance_2.setTransform(-57.65,-37.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	// Layer_3
	this.instance_3 = new lib.text13("synched",0);
	this.instance_3.setTransform(-17.05,-70.95);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

	// Layer_2
	this.instance_4 = new lib.text12("synched",0);
	this.instance_4.setTransform(18.45,23.15);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

	// Layer_1
	this.instance_5 = new lib.text11("synched",0);
	this.instance_5.setTransform(-37.95,23.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite17, new cjs.Rectangle(-94.7,-94.6,189.4,189.3), null);


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

	// Layer_1
	this.instance = new lib.shape8("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite9, new cjs.Rectangle(-44.7,-22.5,86.30000000000001,43.9), null);


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

}).prototype = getMCSymbolPrototype(lib.sprite7, new cjs.Rectangle(-18.6,-55.4,37.3,110.9), null);


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

	// Layer_9
	this.instance = new lib.shape4("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite5, new cjs.Rectangle(-18.6,-25,37.3,50), null);


(lib.sprite2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.shape1("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite2, new cjs.Rectangle(-28.1,-16.4,58,35.3), null);


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


(lib.sprite87 = function(mode,startPosition,loop,reversed) {
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
	this.frame_31 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(31).call(this.frame_31).wait(1));

	// Layer_7
	this.instance = new lib.sprite86();
	this.instance.setTransform(7.15,-18.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(9).to({x:7.2,y:-28.05},20).wait(1).to({y:-28.15},0).wait(2));

	// Layer_5
	this.instance_1 = new lib.sprite84();
	this.instance_1.setTransform(-18.15,-2.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(9).to({x:-18.95,y:1.55},13).to({y:1.75},1).to({x:-19.05,y:2.05},2).to({y:2.25},2).to({x:-19.1,y:2.3},1).to({y:2.35},1).wait(1).to({y:2.4},0).wait(2));

	// Layer_3
	this.instance_2 = new lib.sprite82();
	this.instance_2.setTransform(22.6,2);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(9).to({x:31.5},20).wait(1).to({x:31.55},0).wait(2));

	// Layer_1
	this.instance_3 = new lib.sprite80();
	this.instance_3.setTransform(1.35,18);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(9).to({x:7.9,y:31.55},20).to({x:7.95,y:31.6},1).to({y:31.65},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-42.6,-46.7,92.80000000000001,97.6);


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

	// Layer_5
	this.instance = new lib.sprite25();
	this.instance.setTransform(20.9,-11.25,1.3546,1.3547,0,-99.7141,80.2844);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true},8).wait(20));

	// Layer_4
	this.instance_1 = new lib.shape75("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:true},8).wait(20));

	// Layer_2
	this.instance_2 = new lib.sprite25();
	this.instance_2.setTransform(-41.35,10.05,1.3551,1.3551,0,-134.9922,45.0073);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({_off:true},8).wait(20));

	// Layer_1
	this.instance_3 = new lib.shape74("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({_off:true},8).wait(20));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-47.9,-16.6,96.8,33.2);


(lib.sprite72 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.text65("synched",0);
	this.instance.setTransform(-289.05,-64.3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(19));

	// Layer_4
	this.instance_1 = new lib.sprite17();
	this.instance_1.setTransform(-147.25,85.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(19));

	// Layer_3
	this.instance_2 = new lib.shape71("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({_off:true},2).wait(17));

	// Layer_1
	this.instance_3 = new lib.sprite9();
	this.instance_3.setTransform(-147.75,87.05,1,1,-150.0001);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({scaleX:0.9983,scaleY:0.9983,rotation:-146.4054},1).to({scaleX:0.9996,scaleY:0.9996,rotation:-142.7125,y:87},1).to({scaleX:0.9983,scaleY:0.9983,rotation:-146.4066,y:87.05},1).to({scaleX:0.9984,scaleY:0.9984,rotation:-155.6582,x:-147.8},2).to({scaleX:0.9994,scaleY:0.9994,rotation:-161.0369,x:-147.75},1).to({scaleX:0.9984,scaleY:0.9984,rotation:-155.6598,x:-147.8,y:87.1},1).to({scaleX:1,scaleY:1,rotation:-150.0001,x:-147.75,y:87.05},1).to({scaleX:0.9986,scaleY:0.9986,rotation:-150.1407},1).to({scaleX:1,scaleY:1,rotation:-150.0001},1).to({scaleX:0.9996,scaleY:0.9996,rotation:-142.7125,y:87},2).to({scaleX:0.9983,scaleY:0.9983,rotation:-146.4066,y:87.05},1).to({scaleX:0.9984,scaleY:0.9984,rotation:-155.6582,x:-147.8},2).to({scaleX:0.9994,scaleY:0.9994,rotation:-161.0369,x:-147.75},1).to({scaleX:0.9984,scaleY:0.9984,rotation:-155.6598,x:-147.8,y:87.1},1).to({scaleX:1,scaleY:1,rotation:-150.0001,x:-147.75,y:87.05},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-293,-68.3,337,248.7);


(lib.sprite45 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.text18("synched",0);
	this.instance.setTransform(-330.95,-52.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(9));

	// Layer_3
	this.instance_1 = new lib.sprite17();
	this.instance_1.setTransform(-147.25,85.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(9));

	// Layer_1
	this.instance_2 = new lib.sprite9();
	this.instance_2.setTransform(-147.7,87.05);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({scaleX:0.9996,scaleY:0.9996,rotation:7.0322,y:87.1},2).to({rotation:-3.7566,y:87},3).to({rotation:-7.5438,y:87.05},1).to({rotation:-3.7567,y:87},1).to({scaleX:1,scaleY:1,rotation:0,y:87.05},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-334.9,-56.6,425,237);


(lib.sprite88 = function(mode,startPosition,loop,reversed) {
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
	this.frame_1149 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1149).call(this.frame_1149).wait(1));

	// Masked_Layer_88___82
	this.instance = new lib.shape44("synched",0);
	this.instance.setTransform(-159.6,0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1150));

	// Masked_Layer_85___82
	this.instance_1 = new lib.text43("synched",0);
	this.instance_1.setTransform(-666.1,-61.15);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1150));

	// Masked_Layer_84___82
	this.instance_2 = new lib.text42("synched",0);
	this.instance_2.setTransform(-666.1,45.15);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1150));

	// Masked_Layer_83___82
	this.instance_3 = new lib.text41("synched",0);
	this.instance_3.setTransform(-666.1,-177.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1150));

	// Layer_81
	this.instance_4 = new lib.text38("synched",0);
	this.instance_4.setTransform(-182.8,34.95);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1150));

	// Layer_80
	this.instance_5 = new lib.shape37("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1150));

	// Layer_78
	this.instance_6 = new lib.sprite25();
	this.instance_6.setTransform(-102.15,95.2,1.3528,1.3528,156.4025);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1150));

	// Layer_77
	this.instance_7 = new lib.shape36("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1150));

	// Layer_76
	this.instance_8 = new lib.text35("synched",0);
	this.instance_8.setTransform(-186.35,-65.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1150));

	// Layer_75
	this.instance_9 = new lib.shape33("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1150));

	// Layer_74
	this.instance_10 = new lib.text34("synched",0);
	this.instance_10.setTransform(163.25,20.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1150));

	// Layer_73
	this.instance_11 = new lib.shape33("synched",0);
	this.instance_11.setTransform(347.6,87.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(1150));

	// Layer_71
	this.instance_12 = new lib.sprite25();
	this.instance_12.setTransform(89.9,61.2,1.3551,1.3551,-105.0075);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(1150));

	// Layer_70
	this.instance_13 = new lib.shape32("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(1150));

	// Layer_69
	this.instance_14 = new lib.text31("synched",0);
	this.instance_14.setTransform(76.85,-147.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(1150));

	// Layer_68
	this.instance_15 = new lib.shape30("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(1150));

	// Layer_66
	this.instance_16 = new lib.sprite25();
	this.instance_16.setTransform(102.85,-48.75,1.3546,1.3546,-156.296);

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(1150));

	// Layer_65
	this.instance_17 = new lib.shape29("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(1150));

	// Layer_64
	this.instance_18 = new lib.text28("synched",0);
	this.instance_18.setTransform(-192.4,-153.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(1150));

	// Layer_63
	this.instance_19 = new lib.shape27("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(1150));

	// Layer_61
	this.instance_20 = new lib.sprite25();
	this.instance_20.setTransform(-58.75,-109.35,1.3551,1.355,119.9923);

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(1150));

	// Layer_60
	this.instance_21 = new lib.shape26("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(1150));

	// Layer_58
	this.instance_22 = new lib.sprite25();
	this.instance_22.setTransform(-90.55,42.2,1.3528,1.3528,156.4025);

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(1150));

	// Layer_57
	this.instance_23 = new lib.shape23("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(1150));

	// Mask_Layer_54 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_728 = new cjs.Graphics().p("AuADIIAAmPIcBAAIAAGPg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:null,x:0,y:0}).wait(728).to({graphics:mask_graphics_728,x:180.65,y:-24}).wait(422));

	// Masked_Layer_55___54
	this.instance_24 = new lib.shape64("synched",0);
	this.instance_24._off = true;

	var maskedShapeInstanceList = [this.instance_24];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(728).to({_off:false},0).wait(422));

	// Mask_Layer_50 (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	var mask_1_graphics_699 = new cjs.Graphics().p("AhhA4IAAhvIDDAAIAABvg");
	var mask_1_graphics_700 = new cjs.Graphics().p("AiJA4IAAhvIETAAIAABvg");
	var mask_1_graphics_701 = new cjs.Graphics().p("AixA4IAAhvIFjAAIAABvg");
	var mask_1_graphics_702 = new cjs.Graphics().p("AjaA4IAAhvIG1AAIAABvg");
	var mask_1_graphics_703 = new cjs.Graphics().p("AkCA4IAAhvIIFAAIAABvg");
	var mask_1_graphics_704 = new cjs.Graphics().p("AkqA4IAAhvIJVAAIAABvg");
	var mask_1_graphics_705 = new cjs.Graphics().p("AlTA4IAAhvIKnAAIAABvg");
	var mask_1_graphics_706 = new cjs.Graphics().p("AlTA4IAAhvIKnAAIAABvg");
	var mask_1_graphics_707 = new cjs.Graphics().p("AmkA/IAAh9INJAAIAAB9g");
	var mask_1_graphics_708 = new cjs.Graphics().p("An2BFIAAiJIPtAAIAACJg");
	var mask_1_graphics_709 = new cjs.Graphics().p("ApIBLIAAiVISQAAIAACVg");
	var mask_1_graphics_710 = new cjs.Graphics().p("AqZBSIAAijIUzAAIAACjg");
	var mask_1_graphics_711 = new cjs.Graphics().p("ArrBYIAAivIXXAAIAACvg");
	var mask_1_graphics_712 = new cjs.Graphics().p("As8BeIAAi7IZ5AAIAAC7g");
	var mask_1_graphics_713 = new cjs.Graphics().p("As8BeIAAi7IZ5AAIAAC7g");
	var mask_1_graphics_714 = new cjs.Graphics().p("As8BwIAAjfIZ5AAIAADfg");
	var mask_1_graphics_715 = new cjs.Graphics().p("As8CBIAAkBIZ5AAIAAEBg");
	var mask_1_graphics_716 = new cjs.Graphics().p("As8CTIAAklIZ5AAIAAElg");
	var mask_1_graphics_717 = new cjs.Graphics().p("As8ClIAAlJIZ5AAIAAFJg");
	var mask_1_graphics_718 = new cjs.Graphics().p("As8C3IAAltIZ5AAIAAFtg");
	var mask_1_graphics_719 = new cjs.Graphics().p("As8DIIAAmPIZ5AAIAAGPg");
	var mask_1_graphics_720 = new cjs.Graphics().p("As8DIIAAmPIZ5AAIAAGPg");
	var mask_1_graphics_721 = new cjs.Graphics().p("AtGDIIAAmPIaNAAIAAGPg");
	var mask_1_graphics_722 = new cjs.Graphics().p("AtQDIIAAmPIahAAIAAGPg");
	var mask_1_graphics_723 = new cjs.Graphics().p("AtZDIIAAmPIazAAIAAGPg");
	var mask_1_graphics_724 = new cjs.Graphics().p("AtjDIIAAmPIbHAAIAAGPg");
	var mask_1_graphics_725 = new cjs.Graphics().p("AttDIIAAmPIbbAAIAAGPg");
	var mask_1_graphics_726 = new cjs.Graphics().p("At2DIIAAmPIbuAAIAAGPg");
	var mask_1_graphics_727 = new cjs.Graphics().p("AuADIIAAmPIcBAAIAAGPg");

	this.timeline.addTween(cjs.Tween.get(mask_1).to({graphics:null,x:0,y:0}).wait(699).to({graphics:mask_1_graphics_699,x:260.5,y:-30.75}).wait(1).to({graphics:mask_1_graphics_700,x:256.475,y:-30.75}).wait(1).to({graphics:mask_1_graphics_701,x:252.425,y:-30.75}).wait(1).to({graphics:mask_1_graphics_702,x:248.425,y:-30.75}).wait(1).to({graphics:mask_1_graphics_703,x:244.4,y:-30.75}).wait(1).to({graphics:mask_1_graphics_704,x:240.35,y:-30.75}).wait(1).to({graphics:mask_1_graphics_705,x:236.325,y:-30.75}).wait(1).to({graphics:mask_1_graphics_706,x:236.325,y:-30.75}).wait(1).to({graphics:mask_1_graphics_707,x:228.15,y:-31.375}).wait(1).to({graphics:mask_1_graphics_708,x:220,y:-32}).wait(1).to({graphics:mask_1_graphics_709,x:211.85,y:-32.625}).wait(1).to({graphics:mask_1_graphics_710,x:203.675,y:-33.275}).wait(1).to({graphics:mask_1_graphics_711,x:195.525,y:-33.9}).wait(1).to({graphics:mask_1_graphics_712,x:187.35,y:-34.525}).wait(1).to({graphics:mask_1_graphics_713,x:187.35,y:-34.525}).wait(1).to({graphics:mask_1_graphics_714,x:187.35,y:-32.775}).wait(1).to({graphics:mask_1_graphics_715,x:187.35,y:-31}).wait(1).to({graphics:mask_1_graphics_716,x:187.35,y:-29.25}).wait(1).to({graphics:mask_1_graphics_717,x:187.35,y:-27.525}).wait(1).to({graphics:mask_1_graphics_718,x:187.35,y:-25.75}).wait(1).to({graphics:mask_1_graphics_719,x:187.35,y:-24}).wait(1).to({graphics:mask_1_graphics_720,x:187.35,y:-24}).wait(1).to({graphics:mask_1_graphics_721,x:186.4,y:-24}).wait(1).to({graphics:mask_1_graphics_722,x:185.425,y:-24}).wait(1).to({graphics:mask_1_graphics_723,x:184.475,y:-24}).wait(1).to({graphics:mask_1_graphics_724,x:183.525,y:-24}).wait(1).to({graphics:mask_1_graphics_725,x:182.575,y:-24}).wait(1).to({graphics:mask_1_graphics_726,x:181.6,y:-24}).wait(1).to({graphics:mask_1_graphics_727,x:180.65,y:-24}).wait(423));

	// Masked_Layer_51___50
	this.instance_25 = new lib.shape64("synched",0);
	this.instance_25._off = true;

	var maskedShapeInstanceList = [this.instance_25];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(699).to({_off:false},0).to({_off:true},29).wait(422));

	// Layer_46
	this.instance_26 = new lib.sprite22();
	this.instance_26.setTransform(-64.25,135.75);
	var instance_26Filter_1 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_26.filters = [instance_26Filter_1];
	this.instance_26.cache(-44,-40,88,80);

	this.aniD = new lib.sprite78();
	this.aniD.name = "aniD";
	this.aniD.setTransform(-61.25,132.75,1,1,90);

	this.aniB = new lib.sprite87();
	this.aniB.name = "aniB";
	this.aniB.setTransform(-61.25,138.7,0.9991,0.9991,-89.965);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_26}]}).to({state:[{t:this.instance_26}]},99).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},5).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},3).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},3).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},3).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},5).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},5).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},7).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},4).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},4).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},7).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},5).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},5).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},3).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},3).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},3).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},5).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},4).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},5).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},3).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},3).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},3).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},5).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},5).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},7).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},4).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},4).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},7).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},5).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},5).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},3).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},3).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},3).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},5).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},4).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},5).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},3).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},3).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},3).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},5).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},5).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},7).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},4).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},4).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},7).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},5).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},5).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},3).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},3).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},3).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},5).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},5).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},6).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},4).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},6).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},6).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},6).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},3).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},6).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},6).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},6).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},6).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},6).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},6).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},4).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},6).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},3).to({state:[{t:this.aniD}]},1).to({state:[{t:this.instance_26}]},119).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},3).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_26}]},3).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.aniB}]},1).wait(152));
	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(99).to({scaleX:0.9998,scaleY:0.9998,rotation:4.0294,y:135.55},2).to({scaleX:0.9996,scaleY:0.9996,rotation:6.0441,x:-64.2,y:135.45},1).to({scaleX:0.9995,scaleY:0.9995,rotation:8.0612,x:-64.25,y:135.35},1).to({scaleX:0.9994,scaleY:0.9994,rotation:10.2642,x:-64.2,y:135.2},1).to({scaleX:0.9993,scaleY:0.9993,rotation:12.2816,y:135.1},1).to({scaleX:0.9991,scaleY:0.9991,rotation:16.317,x:-64.1,y:134.9},2).to({scaleX:0.999,scaleY:0.999,rotation:18.5218,y:134.8},1).to({scaleX:0.9986,scaleY:0.9986,rotation:28.8063,x:-63.85,y:134.3},5).to({rotation:30.8259,y:134.2},1).to({scaleX:0.9985,scaleY:0.9985,rotation:34.8668,x:-63.7,y:134.05},2).to({scaleX:0.9984,scaleY:0.9984,rotation:41.1171,x:-63.55,y:133.75},3).to({scaleX:0.9983,scaleY:0.9983,rotation:43.1371,x:-63.45,y:133.7},1).to({scaleX:0.9984,scaleY:0.9984,rotation:49.3888,x:-63.2,y:133.45},3).to({rotation:53.4308,x:-63,y:133.35},2).to({scaleX:0.9985,scaleY:0.9985,rotation:57.659,x:-62.85,y:133.2},2).to({scaleX:0.9987,scaleY:0.9987,rotation:63.9063,x:-62.55,y:133.05},3).to({scaleX:0.9988,scaleY:0.9988,rotation:65.9266,x:-62.5,y:133},1).to({scaleX:0.9989,scaleY:0.9989,rotation:67.9454,x:-62.4,y:132.95},1).to({rotation:69.9635,x:-62.3},1).to({scaleX:0.999,scaleY:0.999,rotation:71.9818,x:-62.15,y:132.9},1).to({scaleX:0.9991,scaleY:0.9991,rotation:74.188,x:-62.05},1).to({scaleX:0.9994,scaleY:0.9994,rotation:78.2232,x:-61.85,y:132.8},2).to({scaleX:0.9996,scaleY:0.9996,rotation:82.444,x:-61.65},2).to({scaleX:0.9997,scaleY:0.9997,rotation:84.4589,x:-61.55,y:132.75},1).to({rotation:94.5337,x:-61},5).to({scaleX:0.9996,scaleY:0.9996,rotation:96.5483,x:-60.95,y:132.8},1).to({scaleX:0.9994,scaleY:0.9994,rotation:100.769,x:-60.7},2).to({scaleX:0.9993,scaleY:0.9993,rotation:102.7867,x:-60.6,y:132.85},1).to({scaleX:0.9992,scaleY:0.9992,rotation:104.8036,x:-60.5},1).to({scaleX:0.9991,scaleY:0.9991,rotation:106.8212,x:-60.35,y:132.9},1).to({scaleX:0.999,scaleY:0.999,rotation:109.0272,x:-60.25},1).to({scaleX:0.9988,scaleY:0.9988,rotation:113.0641,x:-60.05,y:133},2).to({scaleX:0.9987,scaleY:0.9987,rotation:115.0835,x:-60,y:133.05},1).to({scaleX:0.9985,scaleY:0.9985,rotation:125.3721,x:-59.5,y:133.3},5).to({scaleX:0.9984,scaleY:0.9984,rotation:129.6013,x:-59.35,y:133.45},2).to({rotation:131.6215,x:-59.25,y:133.5},1).to({rotation:133.6426,x:-59.2,y:133.6},1).to({scaleX:0.9983,scaleY:0.9983,rotation:135.8515,x:-59.1,y:133.65},1).to({scaleX:0.9984,scaleY:0.9984,rotation:137.8731,x:-59.05,y:133.7},1).to({rotation:139.8933,x:-58.95,y:133.85},1).to({rotation:141.9146,x:-58.9,y:133.9},1).to({rotation:143.9336,x:-58.85,y:134},1).to({scaleX:0.9985,scaleY:0.9985,rotation:148.1638,x:-58.7,y:134.15},2).to({scaleX:0.9991,scaleY:0.9991,rotation:162.6748,x:-58.35,y:134.85},7).to({scaleX:0.9992,scaleY:0.9992,rotation:164.6916,x:-58.4,y:134.95},1).to({scaleX:0.9993,scaleY:0.9993,rotation:166.7103,x:-58.3,y:135.05},1).to({scaleX:0.9994,scaleY:0.9994,rotation:168.7263,x:-58.35,y:135.15},1).to({scaleX:0.9995,scaleY:0.9995,rotation:170.7436,x:-58.25,y:135.25},1).to({scaleX:1,scaleY:1,rotation:178.9927,y:135.7},4).to({rotation:181.0073,y:135.8},1).to({scaleX:0.9995,scaleY:0.9995,rotation:189.2564,y:136.25},4).to({scaleX:0.9994,scaleY:0.9994,rotation:191.2737,x:-58.35,y:136.35},1).to({scaleX:0.9993,scaleY:0.9993,rotation:193.2897,x:-58.3,y:136.45},1).to({scaleX:0.9992,scaleY:0.9992,rotation:195.3084,x:-58.4,y:136.55},1).to({scaleX:0.9991,scaleY:0.9991,rotation:197.3252,x:-58.35,y:136.65},1).to({scaleX:0.9985,scaleY:0.9985,rotation:211.8362,x:-58.7,y:137.35},7).to({scaleX:0.9984,scaleY:0.9984,rotation:216.0664,x:-58.85,y:137.5},2).to({rotation:218.0854,x:-58.9,y:137.6},1).to({rotation:220.1067,x:-58.95,y:137.65},1).to({rotation:222.1269,x:-59.05,y:137.8},1).to({scaleX:0.9983,scaleY:0.9983,rotation:224.1485,x:-59.1,y:137.85},1).to({scaleX:0.9984,scaleY:0.9984,rotation:226.3574,x:-59.2,y:137.9},1).to({rotation:228.3785,x:-59.25,y:138},1).to({rotation:230.3987,x:-59.35,y:138.05},1).to({scaleX:0.9985,scaleY:0.9985,rotation:234.6279,x:-59.5,y:138.2},2).to({scaleX:0.9987,scaleY:0.9987,rotation:244.9165,x:-60,y:138.45},5).to({scaleX:0.9988,scaleY:0.9988,rotation:246.9359,x:-60.05,y:138.5},1).to({scaleX:0.999,scaleY:0.999,rotation:250.9728,x:-60.25,y:138.6},2).to({scaleX:0.9991,scaleY:0.9991,rotation:253.1788,x:-60.35},1).to({scaleX:0.9992,scaleY:0.9992,rotation:255.1964,x:-60.5,y:138.65},1).to({scaleX:0.9993,scaleY:0.9993,rotation:257.2133,x:-60.6},1).to({scaleX:0.9994,scaleY:0.9994,rotation:259.231,x:-60.7,y:138.7},1).to({scaleX:0.9996,scaleY:0.9996,rotation:263.4517,x:-60.95},2).to({scaleX:0.9997,scaleY:0.9997,rotation:265.4663,x:-61,y:138.75},1).to({rotation:275.5411,x:-61.55},5).to({scaleX:0.9996,scaleY:0.9996,rotation:277.556,x:-61.65,y:138.7},1).to({scaleX:0.9994,scaleY:0.9994,rotation:281.7768,x:-61.85},2).to({scaleX:0.9991,scaleY:0.9991,rotation:285.812,x:-62.05,y:138.6},2).to({scaleX:0.999,scaleY:0.999,rotation:288.0182,x:-62.15},1).to({scaleX:0.9989,scaleY:0.9989,rotation:290.0365,x:-62.3,y:138.55},1).to({rotation:292.0546,x:-62.4},1).to({scaleX:0.9988,scaleY:0.9988,rotation:294.0734,x:-62.5,y:138.5},1).to({scaleX:0.9987,scaleY:0.9987,rotation:296.0937,x:-62.55,y:138.45},1).to({scaleX:0.9985,scaleY:0.9985,rotation:302.341,x:-62.85,y:138.3},3).to({scaleX:0.9984,scaleY:0.9984,rotation:306.5692,x:-63,y:138.15},2).to({rotation:310.6112,x:-63.2,y:138.05},2).to({scaleX:0.9983,scaleY:0.9983,rotation:316.8629,x:-63.45,y:137.8},3).to({scaleX:0.9984,scaleY:0.9984,rotation:318.8829,x:-63.55,y:137.75},1).to({scaleX:0.9985,scaleY:0.9985,rotation:325.1332,x:-63.7,y:137.45},3).to({scaleX:0.9986,scaleY:0.9986,rotation:329.1741,x:-63.85,y:137.3},2).to({rotation:331.1937,y:137.2},1).to({scaleX:0.999,scaleY:0.999,rotation:341.4782,x:-64.1,y:136.7},5).to({scaleX:0.9991,scaleY:0.9991,rotation:343.683,y:136.6},1).to({scaleX:0.9993,scaleY:0.9993,rotation:347.7184,x:-64.2,y:136.4},2).to({scaleX:0.9994,scaleY:0.9994,rotation:349.7358,y:136.3},1).to({scaleX:0.9995,scaleY:0.9995,rotation:351.9388,x:-64.25,y:136.15},1).to({scaleX:0.9996,scaleY:0.9996,rotation:353.9559,x:-64.2,y:136.05},1).to({scaleX:0.9998,scaleY:0.9998,rotation:355.9706,x:-64.25,y:135.95},1).to({rotation:364.0294,y:135.55},4).to({scaleX:0.9996,scaleY:0.9996,rotation:366.0441,x:-64.2,y:135.45},1).to({scaleX:0.9995,scaleY:0.9995,rotation:368.0612,x:-64.25,y:135.35},1).to({scaleX:0.9994,scaleY:0.9994,rotation:370.2642,x:-64.2,y:135.2},1).to({scaleX:0.9993,scaleY:0.9993,rotation:372.2816,y:135.1},1).to({scaleX:0.9991,scaleY:0.9991,rotation:376.317,x:-64.1,y:134.9},2).to({scaleX:0.999,scaleY:0.999,rotation:378.5218,y:134.8},1).to({scaleX:0.9986,scaleY:0.9986,rotation:388.8063,x:-63.85,y:134.3},5).to({rotation:390.8259,y:134.2},1).to({scaleX:0.9985,scaleY:0.9985,rotation:394.8668,x:-63.7,y:134.05},2).to({scaleX:0.9984,scaleY:0.9984,rotation:401.1171,x:-63.55,y:133.75},3).to({scaleX:0.9983,scaleY:0.9983,rotation:403.1371,x:-63.45,y:133.7},1).to({scaleX:0.9984,scaleY:0.9984,rotation:409.3888,x:-63.2,y:133.45},3).to({rotation:413.4308,x:-63,y:133.35},2).to({scaleX:0.9985,scaleY:0.9985,rotation:417.659,x:-62.85,y:133.2},2).to({scaleX:0.9987,scaleY:0.9987,rotation:423.9063,x:-62.55,y:133.05},3).to({scaleX:0.9988,scaleY:0.9988,rotation:425.9266,x:-62.5,y:133},1).to({scaleX:0.9989,scaleY:0.9989,rotation:427.9454,x:-62.4,y:132.95},1).to({rotation:429.9635,x:-62.3},1).to({scaleX:0.999,scaleY:0.999,rotation:431.9818,x:-62.15,y:132.9},1).to({scaleX:0.9991,scaleY:0.9991,rotation:434.188,x:-62.05},1).to({scaleX:0.9994,scaleY:0.9994,rotation:438.2232,x:-61.85,y:132.8},2).to({scaleX:0.9996,scaleY:0.9996,rotation:442.444,x:-61.65},2).to({scaleX:0.9997,scaleY:0.9997,rotation:444.4589,x:-61.55,y:132.75},1).to({rotation:454.5337,x:-61},5).to({scaleX:0.9996,scaleY:0.9996,rotation:456.5483,x:-60.95,y:132.8},1).to({scaleX:0.9994,scaleY:0.9994,rotation:460.769,x:-60.7},2).to({scaleX:0.9993,scaleY:0.9993,rotation:462.7867,x:-60.6,y:132.85},1).to({scaleX:0.9992,scaleY:0.9992,rotation:464.8036,x:-60.5},1).to({scaleX:0.9991,scaleY:0.9991,rotation:466.8212,x:-60.35,y:132.9},1).to({scaleX:0.999,scaleY:0.999,rotation:469.0272,x:-60.25},1).to({scaleX:0.9988,scaleY:0.9988,rotation:473.0641,x:-60.05,y:133},2).to({scaleX:0.9987,scaleY:0.9987,rotation:475.0835,x:-60,y:133.05},1).to({scaleX:0.9985,scaleY:0.9985,rotation:485.3721,x:-59.5,y:133.3},5).to({scaleX:0.9984,scaleY:0.9984,rotation:489.6013,x:-59.35,y:133.45},2).to({rotation:491.6215,x:-59.25,y:133.5},1).to({rotation:493.6426,x:-59.2,y:133.6},1).to({scaleX:0.9983,scaleY:0.9983,rotation:495.8515,x:-59.1,y:133.65},1).to({scaleX:0.9984,scaleY:0.9984,rotation:497.8731,x:-59.05,y:133.7},1).to({rotation:499.8933,x:-58.95,y:133.85},1).to({rotation:501.9146,x:-58.9,y:133.9},1).to({rotation:503.9336,x:-58.85,y:134},1).to({scaleX:0.9985,scaleY:0.9985,rotation:508.1638,x:-58.7,y:134.15},2).to({scaleX:0.9991,scaleY:0.9991,rotation:522.6748,x:-58.35,y:134.85},7).to({scaleX:0.9992,scaleY:0.9992,rotation:524.6916,x:-58.4,y:134.95},1).to({scaleX:0.9993,scaleY:0.9993,rotation:526.7103,x:-58.3,y:135.05},1).to({scaleX:0.9994,scaleY:0.9994,rotation:528.7263,x:-58.35,y:135.15},1).to({scaleX:0.9995,scaleY:0.9995,rotation:530.7436,x:-58.25,y:135.25},1).to({scaleX:1,scaleY:1,rotation:538.9927,y:135.7},4).to({rotation:541.0073,y:135.8},1).to({scaleX:0.9995,scaleY:0.9995,rotation:549.2564,y:136.25},4).to({scaleX:0.9994,scaleY:0.9994,rotation:551.2737,x:-58.35,y:136.35},1).to({scaleX:0.9993,scaleY:0.9993,rotation:553.2897,x:-58.3,y:136.45},1).to({scaleX:0.9992,scaleY:0.9992,rotation:555.3084,x:-58.4,y:136.55},1).to({scaleX:0.9991,scaleY:0.9991,rotation:557.3252,x:-58.35,y:136.65},1).to({scaleX:0.9985,scaleY:0.9985,rotation:571.8362,x:-58.7,y:137.35},7).to({scaleX:0.9984,scaleY:0.9984,rotation:576.0664,x:-58.85,y:137.5},2).to({rotation:578.0854,x:-58.9,y:137.6},1).to({rotation:580.1067,x:-58.95,y:137.65},1).to({rotation:582.1269,x:-59.05,y:137.8},1).to({scaleX:0.9983,scaleY:0.9983,rotation:584.1485,x:-59.1,y:137.85},1).to({scaleX:0.9984,scaleY:0.9984,rotation:586.3574,x:-59.2,y:137.9},1).to({rotation:588.3785,x:-59.25,y:138},1).to({rotation:590.3987,x:-59.35,y:138.05},1).to({scaleX:0.9985,scaleY:0.9985,rotation:594.6279,x:-59.5,y:138.2},2).to({scaleX:0.9987,scaleY:0.9987,rotation:604.9165,x:-60,y:138.45},5).to({scaleX:0.9988,scaleY:0.9988,rotation:606.9359,x:-60.05,y:138.5},1).to({scaleX:0.999,scaleY:0.999,rotation:610.9728,x:-60.25,y:138.6},2).to({scaleX:0.9991,scaleY:0.9991,rotation:613.1788,x:-60.35},1).to({scaleX:0.9992,scaleY:0.9992,rotation:615.1964,x:-60.5,y:138.65},1).to({scaleX:0.9993,scaleY:0.9993,rotation:617.2133,x:-60.6},1).to({scaleX:0.9994,scaleY:0.9994,rotation:619.231,x:-60.7,y:138.7},1).to({scaleX:0.9996,scaleY:0.9996,rotation:623.4517,x:-60.95},2).to({scaleX:0.9997,scaleY:0.9997,rotation:625.4663,x:-61,y:138.75},1).to({rotation:635.5411,x:-61.55},5).to({scaleX:0.9996,scaleY:0.9996,rotation:637.556,x:-61.65,y:138.7},1).to({scaleX:0.9994,scaleY:0.9994,rotation:641.7768,x:-61.85},2).to({scaleX:0.9991,scaleY:0.9991,rotation:645.812,x:-62.05,y:138.6},2).to({scaleX:0.999,scaleY:0.999,rotation:648.0182,x:-62.15},1).to({scaleX:0.9989,scaleY:0.9989,rotation:650.0365,x:-62.3,y:138.55},1).to({rotation:652.0546,x:-62.4},1).to({scaleX:0.9988,scaleY:0.9988,rotation:654.0734,x:-62.5,y:138.5},1).to({scaleX:0.9987,scaleY:0.9987,rotation:656.0937,x:-62.55,y:138.45},1).to({scaleX:0.9985,scaleY:0.9985,rotation:662.341,x:-62.85,y:138.3},3).to({scaleX:0.9984,scaleY:0.9984,rotation:666.5692,x:-63,y:138.15},2).to({rotation:670.6112,x:-63.2,y:138.05},2).to({scaleX:0.9983,scaleY:0.9983,rotation:676.8629,x:-63.45,y:137.8},3).to({scaleX:0.9984,scaleY:0.9984,rotation:678.8829,x:-63.55,y:137.75},1).to({scaleX:0.9985,scaleY:0.9985,rotation:685.1332,x:-63.7,y:137.45},3).to({scaleX:0.9986,scaleY:0.9986,rotation:689.1741,x:-63.85,y:137.3},2).to({rotation:691.1937,y:137.2},1).to({scaleX:0.999,scaleY:0.999,rotation:701.4782,x:-64.1,y:136.7},5).to({scaleX:0.9991,scaleY:0.9991,rotation:703.683,y:136.6},1).to({scaleX:0.9993,scaleY:0.9993,rotation:707.7184,x:-64.2,y:136.4},2).to({scaleX:0.9994,scaleY:0.9994,rotation:709.7358,y:136.3},1).to({scaleX:0.9995,scaleY:0.9995,rotation:711.9388,x:-64.25,y:136.15},1).to({scaleX:0.9996,scaleY:0.9996,rotation:713.9559,x:-64.2,y:136.05},1).to({scaleX:0.9998,scaleY:0.9998,rotation:715.9706,x:-64.25,y:135.95},1).to({rotation:724.0294,y:135.55},4).to({scaleX:0.9996,scaleY:0.9996,rotation:726.0441,x:-64.2,y:135.45},1).to({scaleX:0.9995,scaleY:0.9995,rotation:728.0612,x:-64.25,y:135.35},1).to({scaleX:0.9994,scaleY:0.9994,rotation:730.2642,x:-64.2,y:135.2},1).to({scaleX:0.9993,scaleY:0.9993,rotation:732.2816,y:135.1},1).to({scaleX:0.9991,scaleY:0.9991,rotation:736.317,x:-64.1,y:134.9},2).to({scaleX:0.999,scaleY:0.999,rotation:738.5218,y:134.8},1).to({scaleX:0.9986,scaleY:0.9986,rotation:748.8063,x:-63.85,y:134.3},5).to({rotation:750.8259,y:134.2},1).to({scaleX:0.9985,scaleY:0.9985,rotation:754.8668,x:-63.7,y:134.05},2).to({scaleX:0.9984,scaleY:0.9984,rotation:761.1171,x:-63.55,y:133.75},3).to({scaleX:0.9983,scaleY:0.9983,rotation:763.1371,x:-63.45,y:133.7},1).to({scaleX:0.9984,scaleY:0.9984,rotation:769.3888,x:-63.2,y:133.45},3).to({rotation:773.4308,x:-63,y:133.35},2).to({scaleX:0.9985,scaleY:0.9985,rotation:777.659,x:-62.85,y:133.2},2).to({scaleX:0.9987,scaleY:0.9987,rotation:783.9063,x:-62.55,y:133.05},3).to({scaleX:0.9988,scaleY:0.9988,rotation:785.9266,x:-62.5,y:133},1).to({scaleX:0.9989,scaleY:0.9989,rotation:787.9454,x:-62.4,y:132.95},1).to({rotation:789.9635,x:-62.3},1).to({scaleX:0.999,scaleY:0.999,rotation:791.9818,x:-62.15,y:132.9},1).to({scaleX:0.9991,scaleY:0.9991,rotation:794.188,x:-62.05},1).to({scaleX:0.9994,scaleY:0.9994,rotation:798.2232,x:-61.85,y:132.8},2).to({scaleX:0.9996,scaleY:0.9996,rotation:802.444,x:-61.65},2).to({scaleX:0.9997,scaleY:0.9997,rotation:804.4589,x:-61.55,y:132.75},1).to({rotation:814.5337,x:-61},5).to({scaleX:0.9996,scaleY:0.9996,rotation:816.5483,x:-60.95,y:132.8},1).to({scaleX:0.9994,scaleY:0.9994,rotation:820.769,x:-60.7},2).to({scaleX:0.9993,scaleY:0.9993,rotation:822.7867,x:-60.6,y:132.85},1).to({scaleX:0.9992,scaleY:0.9992,rotation:824.8036,x:-60.5},1).to({scaleX:0.9991,scaleY:0.9991,rotation:826.8212,x:-60.35,y:132.9},1).to({scaleX:0.999,scaleY:0.999,rotation:829.0272,x:-60.25},1).to({scaleX:0.9988,scaleY:0.9988,rotation:833.0641,x:-60.05,y:133},2).to({scaleX:0.9987,scaleY:0.9987,rotation:835.0835,x:-60,y:133.05},1).to({scaleX:0.9985,scaleY:0.9985,rotation:845.3721,x:-59.5,y:133.3},5).to({scaleX:0.9984,scaleY:0.9984,rotation:849.6013,x:-59.35,y:133.45},2).to({rotation:851.6215,x:-59.25,y:133.5},1).to({rotation:853.6426,x:-59.2,y:133.6},1).to({scaleX:0.9983,scaleY:0.9983,rotation:855.8515,x:-59.1,y:133.65},1).to({scaleX:0.9984,scaleY:0.9984,rotation:857.8731,x:-59.05,y:133.7},1).to({rotation:859.8933,x:-58.95,y:133.85},1).to({rotation:861.9146,x:-58.9,y:133.9},1).to({rotation:863.9336,x:-58.85,y:134},1).to({scaleX:0.9985,scaleY:0.9985,rotation:868.1638,x:-58.7,y:134.15},2).to({scaleX:0.9991,scaleY:0.9991,rotation:882.6748,x:-58.35,y:134.85},7).to({scaleX:0.9992,scaleY:0.9992,rotation:884.6916,x:-58.4,y:134.95},1).to({scaleX:0.9993,scaleY:0.9993,rotation:886.7103,x:-58.3,y:135.05},1).to({scaleX:0.9994,scaleY:0.9994,rotation:888.7263,x:-58.35,y:135.15},1).to({scaleX:0.9995,scaleY:0.9995,rotation:890.7436,x:-58.25,y:135.25},1).to({scaleX:1,scaleY:1,rotation:898.9927,y:135.7},4).to({rotation:901.0073,y:135.8},1).to({scaleX:0.9995,scaleY:0.9995,rotation:909.2564,y:136.25},4).to({scaleX:0.9994,scaleY:0.9994,rotation:911.2737,x:-58.35,y:136.35},1).to({scaleX:0.9993,scaleY:0.9993,rotation:913.2897,x:-58.3,y:136.45},1).to({scaleX:0.9992,scaleY:0.9992,rotation:915.3084,x:-58.4,y:136.55},1).to({scaleX:0.9991,scaleY:0.9991,rotation:917.3252,x:-58.35,y:136.65},1).to({scaleX:0.9985,scaleY:0.9985,rotation:931.8362,x:-58.7,y:137.35},7).to({scaleX:0.9984,scaleY:0.9984,rotation:936.0664,x:-58.85,y:137.5},2).to({rotation:938.0854,x:-58.9,y:137.6},1).to({rotation:940.1067,x:-58.95,y:137.65},1).to({rotation:942.1269,x:-59.05,y:137.8},1).to({scaleX:0.9983,scaleY:0.9983,rotation:944.1485,x:-59.1,y:137.85},1).to({scaleX:0.9984,scaleY:0.9984,rotation:946.3574,x:-59.2,y:137.9},1).to({rotation:948.3785,x:-59.25,y:138},1).to({rotation:950.3987,x:-59.35,y:138.05},1).to({scaleX:0.9985,scaleY:0.9985,rotation:954.6279,x:-59.5,y:138.2},2).to({scaleX:0.9987,scaleY:0.9987,rotation:964.9165,x:-60,y:138.45},5).to({scaleX:0.9988,scaleY:0.9988,rotation:966.9359,x:-60.05,y:138.5},1).to({scaleX:0.999,scaleY:0.999,rotation:970.9728,x:-60.25,y:138.6},2).to({scaleX:0.9991,scaleY:0.9991,rotation:973.1788,x:-60.35},1).to({scaleX:0.9992,scaleY:0.9992,rotation:975.1964,x:-60.5,y:138.65},1).to({scaleX:0.9993,scaleY:0.9993,rotation:977.2133,x:-60.6},1).to({scaleX:0.9994,scaleY:0.9994,rotation:979.231,x:-60.7,y:138.7},1).to({scaleX:0.9996,scaleY:0.9996,rotation:983.4517,x:-60.95},2).to({scaleX:0.9997,scaleY:0.9997,rotation:985.4663,x:-61,y:138.75},1).to({rotation:995.5411,x:-61.55},5).to({scaleX:0.9996,scaleY:0.9996,rotation:997.556,x:-61.65,y:138.7},1).to({scaleX:0.9994,scaleY:0.9994,rotation:1001.7768,x:-61.85},2).to({scaleX:0.9991,scaleY:0.9991,rotation:1005.812,x:-62.05,y:138.6},2).to({scaleX:0.999,scaleY:0.999,rotation:1008.0182,x:-62.15},1).to({scaleX:0.9989,scaleY:0.9989,rotation:1010.0365,x:-62.3,y:138.55},1).to({rotation:1012.0546,x:-62.4},1).to({scaleX:0.9988,scaleY:0.9988,rotation:1014.0734,x:-62.5,y:138.5},1).to({scaleX:0.9987,scaleY:0.9987,rotation:1016.0937,x:-62.55,y:138.45},1).to({scaleX:0.9985,scaleY:0.9985,rotation:1022.341,x:-62.85,y:138.3},3).to({scaleX:0.9984,scaleY:0.9984,rotation:1026.5692,x:-63,y:138.15},2).to({rotation:1030.6112,x:-63.2,y:138.05},2).to({scaleX:0.9983,scaleY:0.9983,rotation:1036.8629,x:-63.45,y:137.8},3).to({scaleX:0.9984,scaleY:0.9984,rotation:1038.8829,x:-63.55,y:137.75},1).to({scaleX:0.9985,scaleY:0.9985,rotation:1045.1332,x:-63.7,y:137.45},3).to({scaleX:0.9986,scaleY:0.9986,rotation:1049.1741,x:-63.85,y:137.3},2).to({rotation:1051.1937,y:137.2},1).to({scaleX:0.999,scaleY:0.999,rotation:1061.4782,x:-64.1,y:136.7},5).to({scaleX:0.9991,scaleY:0.9991,rotation:1063.683,y:136.6},1).to({scaleX:0.9993,scaleY:0.9993,rotation:1067.7184,x:-64.2,y:136.4},2).to({scaleX:0.9994,scaleY:0.9994,rotation:1069.7358,y:136.3},1).to({scaleX:0.9995,scaleY:0.9995,rotation:1071.9388,x:-64.25,y:136.15},1).to({scaleX:0.9996,scaleY:0.9996,rotation:1073.9559,x:-64.2,y:136.05},1).to({scaleX:0.9998,scaleY:0.9998,rotation:1075.9706,x:-64.25,y:135.95},1).to({scaleX:0.9996,scaleY:0.9996,rotation:1086.2958,y:135.4},5).to({scaleX:0.9994,scaleY:0.9994,rotation:1090.5588,x:-64.15,y:135.2},2).to({scaleX:0.9992,scaleY:0.9992,rotation:1095.0135,y:134.95},2).to({scaleX:0.9991,scaleY:0.9991,rotation:1097.0523,x:-64.1,y:134.9},1).to({scaleX:0.999,scaleY:0.999,rotation:1099.2796,y:134.75},1).to({scaleX:0.9985,scaleY:0.9985,rotation:1112.0884,x:-63.8,y:134.15},6).to({rotation:1114.3186,x:-63.75,y:134.1},1).to({scaleX:0.9984,scaleY:0.9984,rotation:1116.3596,x:-63.65,y:133.95},1).to({rotation:1118.5898,x:-63.6,y:133.9},1).to({rotation:1120.6323,x:-63.55,y:133.8},1).to({scaleX:0.9983,scaleY:0.9983,rotation:1122.8644,x:-63.45,y:133.7},1).to({scaleX:0.9984,scaleY:0.9984,rotation:1125.0954,x:-63.4,y:133.6},1).to({rotation:1127.1368,x:-63.3,y:133.55},1).to({rotation:1129.3677,x:-63.2,y:133.45},1).to({rotation:1131.4102,x:-63.1,y:133.4},1).to({rotation:1133.6404,x:-63.05,y:133.35},1).to({scaleX:0.9985,scaleY:0.9985,rotation:1135.6814,x:-62.9,y:133.25},1).to({rotation:1137.9116,x:-62.85,y:133.2},1).to({scaleX:0.9986,scaleY:0.9986,rotation:1139.9528,x:-62.7},1).to({scaleX:0.9987,scaleY:0.9987,rotation:1142.182,x:-62.65,y:133.1},1).to({scaleX:0.999,scaleY:0.999,rotation:1150.7218,x:-62.25,y:132.9},4).to({scaleX:0.9991,scaleY:0.9991,rotation:1152.9485,x:-62.1},1).to({scaleX:0.9992,scaleY:0.9992,rotation:1155.1758,x:-62.05,y:132.85},1).to({scaleX:0.9994,scaleY:0.9994,rotation:1159.4403,x:-61.8},2).to({scaleX:0.9996,scaleY:0.9996,rotation:1163.7042,x:-61.6,y:132.75},2).to({rotation:1176.2958,x:-60.9},6).to({scaleX:0.9994,scaleY:0.9994,rotation:1180.5605,x:-60.7,y:132.85},2).to({scaleX:0.9992,scaleY:0.9992,rotation:1185.0127,x:-60.45},2).to({scaleX:0.9991,scaleY:0.9991,rotation:1187.0523,x:-60.4,y:132.9},1).to({scaleX:0.999,scaleY:0.999,rotation:1189.2796,x:-60.25},1).to({scaleX:0.9985,scaleY:0.9985,rotation:1202.0884,x:-59.65,y:133.2},6).to({rotation:1204.3186,x:-59.6,y:133.25},1).to({scaleX:0.9984,scaleY:0.9984,rotation:1206.3596,x:-59.45,y:133.35},1).to({rotation:1208.5917,x:-59.4,y:133.4},1).to({rotation:1210.6328,x:-59.3,y:133.45},1).to({scaleX:0.9983,scaleY:0.9983,rotation:1212.8644,x:-59.2,y:133.55},1).to({rotation:1215.0941,x:-59.1,y:133.6},1).to({scaleX:0.9984,scaleY:0.9984,rotation:1217.1368,x:-59.05,y:133.7},1).to({rotation:1219.3672,x:-58.95,y:133.8},1).to({rotation:1221.4097,x:-58.9,y:133.9},1).to({rotation:1223.6404,x:-58.85,y:133.95},1).to({scaleX:0.9985,scaleY:0.9985,rotation:1225.6814,x:-58.75,y:134.1},1).to({rotation:1227.9109,x:-58.7,y:134.15},1).to({scaleX:0.999,scaleY:0.999,rotation:1240.7204,x:-58.4,y:134.75},6).to({scaleX:0.9991,scaleY:0.9991,rotation:1242.9477,y:134.9},1).to({scaleX:0.9992,scaleY:0.9992,rotation:1245.1758,x:-58.35,y:134.95},1).to({scaleX:0.9994,scaleY:0.9994,rotation:1249.4403,y:135.2},2).to({scaleX:0.9996,scaleY:0.9996,rotation:1253.7025,x:-58.25,y:135.4},2).to({scaleX:1,scaleY:1,rotation:1259.9991,y:135.75},3).to({scaleX:0.9999,scaleY:0.9999,rotation:1262.0351,y:135.9},1).to({scaleX:0.9996,scaleY:0.9996,rotation:1266.2975,y:136.1},2).to({scaleX:0.9994,scaleY:0.9994,rotation:1270.5605,x:-58.35,y:136.3},2).to({scaleX:0.9992,scaleY:0.9992,rotation:1275.0127,y:136.55},2).to({scaleX:0.9991,scaleY:0.9991,rotation:1277.0523,x:-58.4,y:136.6},1).to({scaleX:0.999,scaleY:0.999,rotation:1279.2796,y:136.75},1).to({scaleX:0.9985,scaleY:0.9985,rotation:1292.09,x:-58.7,y:137.35},6).to({rotation:1294.3186,x:-58.75,y:137.4},1).to({scaleX:0.9984,scaleY:0.9984,rotation:1296.362,x:-58.85,y:137.55},1).to({rotation:1298.5903,x:-58.9,y:137.6},1).to({rotation:1300.6328,x:-58.95,y:137.7},1).to({rotation:1302.8632,x:-59.05,y:137.8},1).to({scaleX:1,scaleY:1,rotation:1305,x:-59.1,y:137.9},1).to({scaleX:0.9984,scaleY:0.9984,rotation:1307.1368,x:-59.2,y:137.95},1).to({rotation:1309.3672,x:-59.3,y:138.05},1).to({rotation:1311.4097,x:-59.4,y:138.1},1).to({rotation:1313.638,x:-59.45,y:138.15},1).to({scaleX:0.9985,scaleY:0.9985,rotation:1315.6814,x:-59.6,y:138.25},1).to({rotation:1317.91,x:-59.65,y:138.3},1).to({scaleX:0.999,scaleY:0.999,rotation:1330.7204,x:-60.25,y:138.6},6).to({scaleX:0.9991,scaleY:0.9991,rotation:1332.9477,x:-60.4},1).to({scaleX:0.9992,scaleY:0.9992,rotation:1334.9873,x:-60.45,y:138.65},1).to({scaleX:0.9994,scaleY:0.9994,rotation:1339.4395,x:-60.7},2).to({scaleX:0.9996,scaleY:0.9996,rotation:1343.7025,x:-60.9,y:138.75},2).to({rotation:1356.2975,x:-61.6},6).to({scaleX:0.9994,scaleY:0.9994,rotation:1360.5597,x:-61.8,y:138.65},2).to({scaleX:0.9992,scaleY:0.9992,rotation:1364.8242,x:-62.05},2).to({scaleX:0.9991,scaleY:0.9991,rotation:1367.0523,x:-62.1,y:138.6},1).to({scaleX:0.999,scaleY:0.999,rotation:1369.2796,x:-62.25},1).to({scaleX:0.9985,scaleY:0.9985,rotation:1382.0891,x:-62.85,y:138.3},6).to({rotation:1384.3186,x:-62.9,y:138.25},1).to({scaleX:0.9984,scaleY:0.9984,rotation:1386.3596,x:-63.05,y:138.15},1).to({rotation:1388.5903,x:-63.1,y:138.1},1).to({rotation:1390.6328,x:-63.2,y:138.05},1).to({rotation:1392.8632,x:-63.3,y:137.95},1).to({scaleX:0.9983,scaleY:0.9983,rotation:1394.9059,x:-63.4,y:137.9},1).to({rotation:1397.1356,x:-63.45,y:137.8},1).to({scaleX:0.9984,scaleY:0.9984,rotation:1399.3672,x:-63.55,y:137.7},1).to({rotation:1401.4083,x:-63.6,y:137.6},1).to({rotation:1403.6404,x:-63.65,y:137.55},1).to({scaleX:0.9985,scaleY:0.9985,rotation:1405.6814,x:-63.75,y:137.4},1).to({rotation:1407.9116,x:-63.8,y:137.35},1).to({scaleX:0.999,scaleY:0.999,rotation:1420.7204,x:-64.1,y:136.75},6).to({scaleX:0.9991,scaleY:0.9991,rotation:1422.9477,y:136.6},1).to({scaleX:0.9992,scaleY:0.9992,rotation:1424.9873,x:-64.15,y:136.55},1).to({scaleX:0.9994,scaleY:0.9994,rotation:1429.4395,y:136.3},2).to({scaleX:0.9996,scaleY:0.9996,rotation:1433.7042,x:-64.25,y:136.1},2).to({rotation:1446.2958,y:135.4},6).to({scaleX:0.9994,scaleY:0.9994,rotation:1450.5597,x:-64.15,y:135.2},2).to({scaleX:0.9992,scaleY:0.9992,rotation:1454.8242,y:134.95},2).to({scaleX:0.9991,scaleY:0.9991,rotation:1457.0515,x:-64.1,y:134.9},1).to({scaleX:0.999,scaleY:0.999,rotation:1459.2782,y:134.75},1).to({scaleX:0.9987,scaleY:0.9987,rotation:1467.818,x:-63.9,y:134.35},4).to({scaleX:0.9986,scaleY:0.9986,rotation:1470.0472,x:-63.8,y:134.3},1).to({scaleX:0.9985,scaleY:0.9985,rotation:1472.0884,y:134.15},1).to({rotation:1474.3186,x:-63.75,y:134.1},1).to({scaleX:0.9984,scaleY:0.9984,rotation:1476.3596,x:-63.65,y:133.95},1).to({rotation:1478.5898,x:-63.6,y:133.9},1).to({rotation:1480.6323,x:-63.55,y:133.8},1).to({rotation:1482.8632,x:-63.45,y:133.7},1).to({rotation:1484.9046,x:-63.4,y:133.6},1).to({scaleX:0.9983,scaleY:0.9983,rotation:1487.1356,x:-63.3,y:133.55},1).to({scaleX:0.9984,scaleY:0.9984,rotation:1489.3677,x:-63.2,y:133.45},1).to({rotation:1491.4102,x:-63.1,y:133.4},1).to({rotation:1493.6404,x:-63.05,y:133.35},1).to({scaleX:0.9985,scaleY:0.9985,rotation:1495.6814,x:-62.9,y:133.25},1).to({rotation:1497.9116,x:-62.85,y:133.2},1).to({scaleX:0.999,scaleY:0.999,rotation:1510.7204,x:-62.25,y:132.9},6).to({scaleX:0.9991,scaleY:0.9991,rotation:1512.9477,x:-62.1},1).to({scaleX:0.9992,scaleY:0.9992,rotation:1514.9865,x:-62.05,y:132.85},1).to({scaleX:0.9994,scaleY:0.9994,rotation:1519.4412,x:-61.8},2).to({scaleX:0.9996,scaleY:0.9996,rotation:1523.7042,x:-61.6,y:132.75},2).to({scaleX:1,scaleY:1,rotation:1530,x:-61.25},3).to({_off:true},1).wait(119).to({_off:false},0).to({scaleX:0.9992,scaleY:0.9992,rotation:1518.6856,x:-61.8},1).to({scaleX:0.9979,scaleY:0.9979,rotation:1484.111,x:-63.4,y:133.65},3).to({scaleX:0.998,scaleY:0.998,rotation:1472.5787,x:-63.8,y:134.15},1).to({scaleX:0.9988,scaleY:0.9988,rotation:1449.5389,x:-64.2,y:135.3},2).to({scaleX:0.9984,scaleY:0.9984,rotation:1426.7224,y:136.45},2).to({scaleX:0.9989,scaleY:0.9989,rotation:1403.7177,x:-63.65,y:137.55},2).to({scaleX:0.9973,scaleY:0.9973,rotation:1391.6364,x:-63.2,y:138.05},1).to({scaleX:0.998,scaleY:0.998,rotation:1367.5711,x:-62.1,y:138.65},2).to({scaleX:0.9985,scaleY:0.9985,rotation:1343.7395,x:-60.9,y:138.75},2).to({scaleX:0.9974,scaleY:0.9974,rotation:1319.6935,x:-59.65,y:138.35},2).to({scaleX:0.9972,scaleY:0.9972,rotation:1307.6579,x:-59.2,y:138.05},1).to({scaleX:0.9973,scaleY:0.9973,rotation:1295.6184,x:-58.75,y:137.55},1).to({scaleX:0.9989,scaleY:0.9989,rotation:1283.7183,x:-58.45,y:137},1).to({scaleX:0.9973,scaleY:0.9973,rotation:1294.8659,x:-58.7,y:137.55},1).to({scaleX:0.9974,scaleY:0.9974,rotation:1317.4381,x:-59.55,y:138.4},2).to({scaleX:0.9978,scaleY:0.9978,rotation:1328.7177,x:-60.05,y:138.65},1).to({scaleX:0.9988,scaleY:0.9988,rotation:1351.0539,x:-61.3,y:138.85},2).to({scaleX:0.9989,scaleY:0.9989,rotation:1373.7183,x:-62.45,y:138.6},2).to({scaleX:0.9986,scaleY:0.9986,rotation:1355.5569,x:-61.5,y:138.8},2).to({scaleX:0.9989,scaleY:0.9989,rotation:1328.7187,x:-60.1,y:138.55},3).to({scaleX:0.998,scaleY:0.9981,rotation:1334.7284,x:-60.35},1).to({scaleX:0.9984,scaleY:0.9984,rotation:1340.7369,x:-60.7,y:138.7},1).to({scaleX:0.9987,scaleY:0.9987,rotation:1346.7417,x:-60.95,y:138.75},1).to({scaleY:0.9988,rotation:1352.5551,x:-61.2,y:138.7},1).to({scaleX:0.9989,scaleY:0.9989,rotation:1358.7184,x:-61.6,y:138.8},1).to({scaleX:0.9984,scaleY:0.9984,rotation:1355.8033,x:-61.45,y:138.85},1).to({rotation:1353.054,x:-61.25},1).to({scaleY:0.9985,rotation:1350.4501,x:-61.15,y:138.8},2).to({_off:true},1).wait(152));
	this.timeline.addTween(cjs.Tween.get(instance_26Filter_1).wait(99).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 2).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(3).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 5).wait(1).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 2).wait(4).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 3).wait(9).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(1).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 2).wait(3).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 5).wait(1).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 2).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(3).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 5).wait(4).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(1).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 2).wait(9).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(5).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 4).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(11).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(1).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 2).wait(6).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 2).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(3).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 5).wait(1).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 2).wait(4).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(1).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 3).wait(8).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 3).wait(3).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 5).wait(1).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 2).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(6).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(3).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 5).wait(1).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 2).wait(4).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 3).wait(9).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(1).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 2).wait(3).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 5).wait(1).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 2).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(3).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 5).wait(4).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(1).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 2).wait(9).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(5).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 4).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(11).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(1).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 2).wait(6).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 2).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(3).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 5).wait(1).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 2).wait(4).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(1).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 3).wait(8).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 3).wait(3).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 5).wait(1).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 2).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(6).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(3).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 5).wait(1).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 2).wait(4).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 3).wait(9).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(1).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 2).wait(3).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 5).wait(1).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 2).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(3).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 5).wait(4).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(1).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 2).wait(9).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(5).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 4).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(11).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(1).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 2).wait(6).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 2).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(3).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 5).wait(1).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 2).wait(4).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(1).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 3).wait(8).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 3).wait(3).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 5).wait(1).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 2).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(11).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(8).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(6).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(16).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(8).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(8).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(8).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 2).wait(6).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(8).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(8).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(16).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(8).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(8).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(16).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(6).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(8).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(126).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(1).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 3).wait(1).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 2).wait(5).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 2).wait(6).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(3).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 2).wait(9).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(1).to(new cjs.ColorFilter(0.19921875,0.19921875,0.19921875,1,204,204,204,0), 2).wait(152));

	// Layer_40
	this.instance_27 = new lib.sprite20();
	this.instance_27.setTransform(83.05,21.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_27).wait(119).to({y:33.6},26).to({y:22.05},26).wait(1).to({y:21.6},0).wait(122).to({y:33.6},26).to({y:22.05},26).wait(1).to({y:21.6},0).wait(122).to({y:33.6},26).to({y:22.05},26).wait(1).to({y:21.6},0).wait(122).to({y:33.6},26).to({y:22.05},26).wait(1).to({y:21.6},0).wait(121).to({y:23.3},15).wait(1).to({y:23.4},0).wait(120).to({y:21.95},4).wait(1).to({y:21.6},0).wait(191));

	// Layer_38
	this.instance_28 = new lib.text65("synched",0);
	this.instance_28.setTransform(156.2,-127,0.342,0.342);
	this.instance_28._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_28).wait(701).to({_off:false},0).to({_off:true},25).wait(424));

	// Layer_37
	this.instance_29 = new lib.text18("synched",0);
	this.instance_29.setTransform(141.9,-122.9,0.342,0.342);

	this.timeline.addTween(cjs.Tween.get(this.instance_29).to({_off:true},94).wait(1056));

	// Layer_31
	this.instance_30 = new lib.sprite17();
	this.instance_30.setTransform(204.7,-75.7,0.342,0.342);
	this.instance_30._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_30).wait(701).to({_off:false},0).to({_off:true},25).wait(424));

	// Layer_30
	this.instance_31 = new lib.sprite17();
	this.instance_31.setTransform(204.7,-75.7,0.342,0.342);

	this.instance_32 = new lib.shape66("synched",0);
	this.instance_32.setTransform(255.05,-105,0.342,0.342);

	this.instance_33 = new lib.shape68("synched",0);
	this.instance_33.setTransform(255.05,-105,0.342,0.342);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_31}]}).to({state:[]},94).to({state:[{t:this.instance_32}]},609).to({state:[]},2).to({state:[{t:this.instance_33}]},2).to({state:[]},2).wait(441));

	// Layer_28
	this.instance_34 = new lib.sprite9();
	this.instance_34.setTransform(204.55,-75.25,0.342,0.342);

	this.aniA = new lib.sprite45();
	this.aniA.name = "aniA";
	this.aniA.setTransform(255.05,-105,0.342,0.342);

	this.aniA2 = new lib.sprite72();
	this.aniA2.name = "aniA2";
	this.aniA2.setTransform(255.05,-105,0.342,0.342);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_34}]}).to({state:[{t:this.aniA}]},94).to({state:[{t:this.instance_34}]},607).to({state:[{t:this.instance_34}]},8).to({state:[{t:this.instance_34}]},1).to({state:[{t:this.instance_34}]},3).to({state:[{t:this.instance_34}]},1).to({state:[{t:this.instance_34}]},1).to({state:[{t:this.instance_34}]},1).to({state:[{t:this.instance_34}]},1).to({state:[{t:this.instance_34}]},1).to({state:[{t:this.instance_34}]},1).to({state:[{t:this.instance_34}]},2).to({state:[{t:this.instance_34}]},2).to({state:[{t:this.instance_34}]},1).to({state:[{t:this.aniA2}]},2).wait(424));
	this.timeline.addTween(cjs.Tween.get(this.instance_34).to({_off:true},94).wait(607).to({_off:false},0).wait(8).to({scaleX:0.3413,scaleY:0.3413,rotation:34.8594,y:-75.2},1).to({scaleX:0.3412,scaleY:0.3412,rotation:131.1105,y:-75.15},3).to({scaleX:0.3414,scaleY:0.3414,rotation:157.4511,y:-75.2},1).to({scaleX:0.3418,scaleY:0.3418,rotation:183.5497,x:204.5},1).to({scaleX:0.3419,scaleY:0.342,rotation:210.0017,y:-75.25},1).to({scaleX:0.3414,scaleY:0.3414,rotation:213.5921,x:204.55},1).to({scaleX:0.3418,scaleY:0.3418,rotation:217.2868,x:204.5},1).to({scaleX:0.3414,scaleY:0.3414,rotation:213.5935},1).to({rotation:204.3418,x:204.55,y:-75.2},2).to({rotation:204.3395,x:204.5,y:-75.25},2).wait(1).to({scaleX:0.3419,scaleY:0.342,rotation:210.0017},0).to({_off:true},2).wait(424));

	// Layer_26
	this.instance_35 = new lib.sprite7();
	this.instance_35.setTransform(-60.55,42.25);

	this.timeline.addTween(cjs.Tween.get(this.instance_35).wait(119).to({y:37.25},26).to({y:42.05},26).wait(1).to({y:42.25},0).wait(122).to({y:37.25},26).to({y:42.05},26).wait(1).to({y:42.25},0).wait(122).to({y:37.25},26).to({y:42.05},26).wait(1).to({y:42.25},0).wait(122).to({y:37.25},26).to({y:42.05},26).wait(1).to({y:42.25},0).wait(121).to({y:36.65},15).wait(1).to({y:36.25},0).wait(120).to({y:41.05},4).wait(1).to({y:42.25},0).wait(191));

	// Layer_16
	this.instance_36 = new lib.sprite5();
	this.instance_36.setTransform(-60.55,32.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_36).wait(119).to({scaleY:0.8958,y:30.1},26).to({scaleY:0.9961,y:32.5},26).wait(1).to({scaleY:1,y:32.6},0).wait(122).to({scaleY:0.8958,y:30.1},26).to({scaleY:0.9961,y:32.5},26).wait(1).to({scaleY:1,y:32.6},0).wait(122).to({scaleY:0.8958,y:30.1},26).to({scaleY:0.9961,y:32.5},26).wait(1).to({scaleY:1,y:32.6},0).wait(122).to({scaleY:0.8958,y:30.1},26).to({scaleY:0.9961,y:32.5},26).wait(1).to({scaleY:1,y:32.6},0).wait(121).to({scaleY:0.8832,y:29.8},15).wait(1).to({scaleY:0.8754,y:29.6},0).wait(120).to({scaleY:0.9751,y:32},4).wait(1).to({scaleY:1,y:32.6},0).wait(191));

	// Layer_15
	this.instance_37 = new lib.shape3("synched",0);

	this.instance_38 = new lib.shape60("synched",0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_37}]}).to({state:[{t:this.instance_38}]},644).wait(506));

	// Layer_7
	this.instance_39 = new lib.sprite25();
	this.instance_39.setTransform(-30.75,-101.5,1.3525,1.3526,64.1137);
	this.instance_39._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_39).wait(119).to({_off:false},0).to({_off:true},8).wait(20).to({_off:false},0).to({_off:true},8).wait(139).to({_off:false},0).to({_off:true},8).wait(20).to({_off:false},0).to({_off:true},8).wait(139).to({_off:false},0).to({_off:true},8).wait(20).to({_off:false},0).to({_off:true},8).wait(139).to({_off:false},0).to({_off:true},8).wait(20).to({_off:false},0).to({_off:true},8).wait(470));

	// Layer_6
	this.instance_40 = new lib.shape47("synched",0);

	this.instance_41 = new lib.shape49("synched",0);

	this.instance_42 = new lib.shape51("synched",0);

	this.instance_43 = new lib.shape53("synched",0);

	this.instance_44 = new lib.shape55("synched",0);

	this.instance_45 = new lib.shape57("synched",0);

	this.instance_46 = new lib.shape59("synched",0);

	this.instance_47 = new lib.shape62("synched",0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_40}]},119).to({state:[]},8).to({state:[{t:this.instance_41}]},20).to({state:[]},8).to({state:[{t:this.instance_42}]},139).to({state:[]},8).to({state:[{t:this.instance_43}]},20).to({state:[]},8).to({state:[{t:this.instance_44}]},139).to({state:[]},8).to({state:[{t:this.instance_45}]},20).to({state:[]},8).to({state:[{t:this.instance_46}]},139).to({state:[]},8).to({state:[{t:this.instance_47}]},20).to({state:[]},8).wait(470));

	// Layer_4
	this.instance_48 = new lib.sprite25();
	this.instance_48.setTransform(31.05,-121.9,1.353,1.353,99.3909);
	this.instance_48._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_48).wait(119).to({_off:false},0).to({_off:true},8).wait(20).to({_off:false},0).to({_off:true},8).wait(139).to({_off:false},0).to({_off:true},8).wait(20).to({_off:false},0).to({_off:true},8).wait(139).to({_off:false},0).to({_off:true},8).wait(20).to({_off:false},0).to({_off:true},8).wait(139).to({_off:false},0).to({_off:true},8).wait(20).to({_off:false},0).to({_off:true},8).wait(470));

	// Layer_3
	this.instance_49 = new lib.shape46("synched",0);

	this.instance_50 = new lib.shape48("synched",0);

	this.instance_51 = new lib.shape50("synched",0);

	this.instance_52 = new lib.shape52("synched",0);

	this.instance_53 = new lib.shape54("synched",0);

	this.instance_54 = new lib.shape56("synched",0);

	this.instance_55 = new lib.shape58("synched",0);

	this.instance_56 = new lib.shape61("synched",0);

	this.aniC = new lib.sprite76();
	this.aniC.name = "aniC";
	this.aniC.setTransform(-2.5,-130.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_49}]},119).to({state:[]},8).to({state:[{t:this.instance_50}]},20).to({state:[]},8).to({state:[{t:this.instance_51}]},139).to({state:[]},8).to({state:[{t:this.instance_52}]},20).to({state:[]},8).to({state:[{t:this.instance_53}]},139).to({state:[]},8).to({state:[{t:this.instance_54}]},20).to({state:[]},8).to({state:[{t:this.instance_55}]},139).to({state:[]},8).to({state:[{t:this.instance_56}]},20).to({state:[]},8).to({state:[{t:this.aniC}]},49).to({state:[]},275).wait(146));

	// Layer_1
	this.instance_57 = new lib.sprite2();
	this.instance_57.setTransform(83.05,-42.1,1.0089,1);
	var instance_57Filter_2 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_57.filters = [instance_57Filter_2];
	this.instance_57.cache(-30,-18,62,39);

	this.timeline.addTween(cjs.Tween.get(this.instance_57).wait(145).to({scaleX:1.0073},5).to({scaleX:1.007,x:83.1},1).to({scaleX:1.0066,x:83.05},1).to({scaleX:1.0063,x:83.1},1).to({scaleX:1.006,x:83.05},1).to({scaleX:1.0056,x:83.1},1).to({scaleX:1.0033},7).to({scaleX:1.003,x:83.05},1).to({scaleX:1.0026,x:83.1},1).to({scaleX:1.0023,x:83.05},1).to({scaleX:1.002,x:83.1},1).to({scaleX:1.0003,x:83.05},5).wait(1).to({scaleX:1},0).wait(121).to({scaleX:1.0089},1).wait(26).to({scaleX:1.0073},5).to({scaleX:1.007,x:83.1},1).to({scaleX:1.0066,x:83.05},1).to({scaleX:1.0063,x:83.1},1).to({scaleX:1.006,x:83.05},1).to({scaleX:1.0056,x:83.1},1).to({scaleX:1.0033},7).to({scaleX:1.003,x:83.05},1).to({scaleX:1.0026,x:83.1},1).to({scaleX:1.0023,x:83.05},1).to({scaleX:1.002,x:83.1},1).to({scaleX:1.0003,x:83.05},5).wait(1).to({scaleX:1},0).wait(121).to({scaleX:1.0089},1).wait(26).to({scaleX:1.0073},5).to({scaleX:1.007,x:83.1},1).to({scaleX:1.0066,x:83.05},1).to({scaleX:1.0063,x:83.1},1).to({scaleX:1.006,x:83.05},1).to({scaleX:1.0056,x:83.1},1).to({scaleX:1.0033},7).to({scaleX:1.003,x:83.05},1).to({scaleX:1.0026,x:83.1},1).to({scaleX:1.0023,x:83.05},1).to({scaleX:1.002,x:83.1},1).to({scaleX:1.0003,x:83.05},5).wait(1).to({scaleX:1},0).wait(121).to({scaleX:1.0089},1).wait(26).to({scaleX:1.0073},5).to({scaleX:1.007,x:83.1},1).to({scaleX:1.0066,x:83.05},1).to({scaleX:1.0063,x:83.1},1).to({scaleX:1.006,x:83.05},1).to({scaleX:1.0056,x:83.1},1).to({scaleX:1.0033},7).to({scaleX:1.003,x:83.05},1).to({scaleX:1.0026,x:83.1},1).to({scaleX:1.0023,x:83.05},1).to({scaleX:1.002,x:83.1},1).to({scaleX:1.0003,x:83.05},5).wait(1).to({scaleX:1},0).wait(453));
	this.timeline.addTween(cjs.Tween.get(instance_57Filter_2).wait(119).to(new cjs.ColorFilter(0.8515625,0.8515625,0.8515625,1,0,9,18,0), 4).to(new cjs.ColorFilter(0,0,0,1,1,60,118,0), 22).to(new cjs.ColorFilter(0.1796875,0.1796875,0.1796875,1,1,49,96,0), 5).wait(1).to(new cjs.ColorFilter(0.21875,0.21875,0.21875,1,1,47,92,0), 0).wait(1).to(new cjs.ColorFilter(0.26171875,0.26171875,0.26171875,1,1,44,87,0), 0).wait(1).to(new cjs.ColorFilter(0.30078125,0.30078125,0.30078125,1,1,42,83,0), 0).wait(1).to(new cjs.ColorFilter(0.328125,0.328125,0.328125,1,1,40,79,0), 0).wait(1).to(new cjs.ColorFilter(0.37109375,0.37109375,0.37109375,1,1,38,74,0), 0).to(new cjs.ColorFilter(0.62890625,0.62890625,0.62890625,1,0,22,44,0), 7).wait(1).to(new cjs.ColorFilter(0.671875,0.671875,0.671875,1,0,20,39,0), 0).wait(1).to(new cjs.ColorFilter(0.69921875,0.69921875,0.69921875,1,0,18,35,0), 0).wait(1).to(new cjs.ColorFilter(0.73828125,0.73828125,0.73828125,1,0,16,31,0), 0).wait(1).to(new cjs.ColorFilter(0.78125,0.78125,0.78125,1,0,13,26,0), 0).to(new cjs.ColorFilter(0.9609375,0.9609375,0.9609375,1,0,2,4,0), 5).wait(1).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(122).to(new cjs.ColorFilter(0.8515625,0.8515625,0.8515625,1,0,9,18,0), 4).to(new cjs.ColorFilter(0,0,0,1,1,60,118,0), 22).to(new cjs.ColorFilter(0.1796875,0.1796875,0.1796875,1,1,49,96,0), 5).wait(1).to(new cjs.ColorFilter(0.21875,0.21875,0.21875,1,1,47,92,0), 0).wait(1).to(new cjs.ColorFilter(0.26171875,0.26171875,0.26171875,1,1,44,87,0), 0).wait(1).to(new cjs.ColorFilter(0.30078125,0.30078125,0.30078125,1,1,42,83,0), 0).wait(1).to(new cjs.ColorFilter(0.328125,0.328125,0.328125,1,1,40,79,0), 0).wait(1).to(new cjs.ColorFilter(0.37109375,0.37109375,0.37109375,1,1,38,74,0), 0).to(new cjs.ColorFilter(0.62890625,0.62890625,0.62890625,1,0,22,44,0), 7).wait(1).to(new cjs.ColorFilter(0.671875,0.671875,0.671875,1,0,20,39,0), 0).wait(1).to(new cjs.ColorFilter(0.69921875,0.69921875,0.69921875,1,0,18,35,0), 0).wait(1).to(new cjs.ColorFilter(0.73828125,0.73828125,0.73828125,1,0,16,31,0), 0).wait(1).to(new cjs.ColorFilter(0.78125,0.78125,0.78125,1,0,13,26,0), 0).to(new cjs.ColorFilter(0.9609375,0.9609375,0.9609375,1,0,2,4,0), 5).wait(1).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(122).to(new cjs.ColorFilter(0.8515625,0.8515625,0.8515625,1,0,9,18,0), 4).to(new cjs.ColorFilter(0,0,0,1,1,60,118,0), 22).to(new cjs.ColorFilter(0.1796875,0.1796875,0.1796875,1,1,49,96,0), 5).wait(1).to(new cjs.ColorFilter(0.21875,0.21875,0.21875,1,1,47,92,0), 0).wait(1).to(new cjs.ColorFilter(0.26171875,0.26171875,0.26171875,1,1,44,87,0), 0).wait(1).to(new cjs.ColorFilter(0.30078125,0.30078125,0.30078125,1,1,42,83,0), 0).wait(1).to(new cjs.ColorFilter(0.328125,0.328125,0.328125,1,1,40,79,0), 0).wait(1).to(new cjs.ColorFilter(0.37109375,0.37109375,0.37109375,1,1,38,74,0), 0).to(new cjs.ColorFilter(0.62890625,0.62890625,0.62890625,1,0,22,44,0), 7).wait(1).to(new cjs.ColorFilter(0.671875,0.671875,0.671875,1,0,20,39,0), 0).wait(1).to(new cjs.ColorFilter(0.69921875,0.69921875,0.69921875,1,0,18,35,0), 0).wait(1).to(new cjs.ColorFilter(0.73828125,0.73828125,0.73828125,1,0,16,31,0), 0).wait(1).to(new cjs.ColorFilter(0.78125,0.78125,0.78125,1,0,13,26,0), 0).to(new cjs.ColorFilter(0.9609375,0.9609375,0.9609375,1,0,2,4,0), 5).wait(1).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(122).to(new cjs.ColorFilter(0.8515625,0.8515625,0.8515625,1,0,9,18,0), 4).to(new cjs.ColorFilter(0,0,0,1,1,60,118,0), 22).to(new cjs.ColorFilter(0.1796875,0.1796875,0.1796875,1,1,49,96,0), 5).wait(1).to(new cjs.ColorFilter(0.21875,0.21875,0.21875,1,1,47,92,0), 0).wait(1).to(new cjs.ColorFilter(0.26171875,0.26171875,0.26171875,1,1,44,87,0), 0).wait(1).to(new cjs.ColorFilter(0.30078125,0.30078125,0.30078125,1,1,42,83,0), 0).wait(1).to(new cjs.ColorFilter(0.328125,0.328125,0.328125,1,1,40,79,0), 0).wait(1).to(new cjs.ColorFilter(0.37109375,0.37109375,0.37109375,1,1,38,74,0), 0).to(new cjs.ColorFilter(0.62890625,0.62890625,0.62890625,1,0,22,44,0), 7).wait(1).to(new cjs.ColorFilter(0.671875,0.671875,0.671875,1,0,20,39,0), 0).wait(1).to(new cjs.ColorFilter(0.69921875,0.69921875,0.69921875,1,0,18,35,0), 0).wait(1).to(new cjs.ColorFilter(0.73828125,0.73828125,0.73828125,1,0,16,31,0), 0).wait(1).to(new cjs.ColorFilter(0.78125,0.78125,0.78125,1,0,13,26,0), 0).to(new cjs.ColorFilter(0.9609375,0.9609375,0.9609375,1,0,2,4,0), 5).wait(1).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(18).to(new cjs.ColorFilter(0.33984375,0.33984375,0.33984375,1,1,40,78,0), 0).to(new cjs.ColorFilter(0.05078125,0.05078125,0.05078125,1,1,57,112,0), 6).wait(1).to(new cjs.ColorFilter(0,0,0,1,1,60,118,0), 0).wait(428));

	this.filterCacheList = [];
	this.filterCacheList.push({instance: this.instance_26, startFrame:99, endFrame:99, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:100, endFrame:101, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:102, endFrame:102, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:103, endFrame:103, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:104, endFrame:104, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:105, endFrame:105, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:108, endFrame:108, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:109, endFrame:113, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:114, endFrame:114, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:115, endFrame:116, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:120, endFrame:120, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:121, endFrame:123, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:131, endFrame:131, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:132, endFrame:132, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:133, endFrame:133, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:134, endFrame:134, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:135, endFrame:135, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:136, endFrame:137, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:140, endFrame:140, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:141, endFrame:145, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:146, endFrame:146, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:147, endFrame:148, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:149, endFrame:149, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:150, endFrame:150, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:151, endFrame:151, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:152, endFrame:152, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:155, endFrame:155, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:156, endFrame:160, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:163, endFrame:163, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:164, endFrame:164, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:165, endFrame:165, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:166, endFrame:166, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:167, endFrame:167, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:168, endFrame:168, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:169, endFrame:169, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:170, endFrame:171, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:179, endFrame:179, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:180, endFrame:180, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:181, endFrame:181, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:182, endFrame:182, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:187, endFrame:187, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:188, endFrame:191, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:192, endFrame:192, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:193, endFrame:193, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:194, endFrame:194, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:195, endFrame:195, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:205, endFrame:205, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:206, endFrame:206, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:207, endFrame:207, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:208, endFrame:208, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:209, endFrame:209, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:210, endFrame:210, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:211, endFrame:211, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:212, endFrame:213, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:219, endFrame:219, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:220, endFrame:221, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:222, endFrame:222, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:223, endFrame:223, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:224, endFrame:224, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:225, endFrame:225, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:228, endFrame:228, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:229, endFrame:233, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:234, endFrame:234, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:235, endFrame:236, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:239, endFrame:239, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:240, endFrame:240, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:241, endFrame:241, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:242, endFrame:242, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:243, endFrame:243, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:244, endFrame:246, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:254, endFrame:254, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:255, endFrame:257, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:260, endFrame:260, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:261, endFrame:265, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:266, endFrame:266, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:267, endFrame:268, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:269, endFrame:269, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:270, endFrame:270, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:271, endFrame:271, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:272, endFrame:272, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:277, endFrame:277, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:278, endFrame:278, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:279, endFrame:279, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:280, endFrame:280, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:283, endFrame:283, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:284, endFrame:288, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:289, endFrame:289, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:290, endFrame:291, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:295, endFrame:295, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:296, endFrame:298, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:306, endFrame:306, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:307, endFrame:307, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:308, endFrame:308, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:309, endFrame:309, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:310, endFrame:310, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:311, endFrame:312, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:315, endFrame:315, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:316, endFrame:320, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:321, endFrame:321, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:322, endFrame:323, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:324, endFrame:324, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:325, endFrame:325, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:326, endFrame:326, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:327, endFrame:327, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:330, endFrame:330, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:331, endFrame:335, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:338, endFrame:338, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:339, endFrame:339, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:340, endFrame:340, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:341, endFrame:341, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:342, endFrame:342, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:343, endFrame:343, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:344, endFrame:344, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:345, endFrame:346, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:354, endFrame:354, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:355, endFrame:355, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:356, endFrame:356, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:357, endFrame:357, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:362, endFrame:362, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:363, endFrame:366, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:367, endFrame:367, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:368, endFrame:368, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:369, endFrame:369, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:370, endFrame:370, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:380, endFrame:380, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:381, endFrame:381, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:382, endFrame:382, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:383, endFrame:383, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:384, endFrame:384, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:385, endFrame:385, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:386, endFrame:386, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:387, endFrame:388, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:394, endFrame:394, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:395, endFrame:396, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:397, endFrame:397, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:398, endFrame:398, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:399, endFrame:399, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:400, endFrame:400, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:403, endFrame:403, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:404, endFrame:408, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:409, endFrame:409, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:410, endFrame:411, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:414, endFrame:414, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:415, endFrame:415, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:416, endFrame:416, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:417, endFrame:417, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:418, endFrame:418, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:419, endFrame:421, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:429, endFrame:429, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:430, endFrame:432, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:435, endFrame:435, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:436, endFrame:440, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:441, endFrame:441, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:442, endFrame:443, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:444, endFrame:444, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:445, endFrame:445, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:446, endFrame:446, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:447, endFrame:447, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:452, endFrame:452, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:453, endFrame:453, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:454, endFrame:454, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:455, endFrame:455, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:458, endFrame:458, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:459, endFrame:463, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:464, endFrame:464, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:465, endFrame:466, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:470, endFrame:470, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:471, endFrame:473, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:481, endFrame:481, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:482, endFrame:482, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:483, endFrame:483, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:484, endFrame:484, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:485, endFrame:485, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:486, endFrame:487, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:490, endFrame:490, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:491, endFrame:495, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:496, endFrame:496, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:497, endFrame:498, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:499, endFrame:499, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:500, endFrame:500, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:501, endFrame:501, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:502, endFrame:502, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:505, endFrame:505, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:506, endFrame:510, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:513, endFrame:513, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:514, endFrame:514, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:515, endFrame:515, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:516, endFrame:516, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:517, endFrame:517, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:518, endFrame:518, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:519, endFrame:519, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:520, endFrame:521, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:529, endFrame:529, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:530, endFrame:530, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:531, endFrame:531, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:532, endFrame:532, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:537, endFrame:537, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:538, endFrame:541, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:542, endFrame:542, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:543, endFrame:543, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:544, endFrame:544, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:545, endFrame:545, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:555, endFrame:555, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:556, endFrame:556, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:557, endFrame:557, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:558, endFrame:558, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:559, endFrame:559, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:560, endFrame:560, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:561, endFrame:561, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:562, endFrame:563, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:569, endFrame:569, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:570, endFrame:571, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:572, endFrame:572, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:573, endFrame:573, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:574, endFrame:574, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:575, endFrame:575, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:578, endFrame:578, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:579, endFrame:583, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:584, endFrame:584, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:585, endFrame:586, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:589, endFrame:589, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:590, endFrame:590, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:591, endFrame:591, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:592, endFrame:592, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:593, endFrame:593, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:594, endFrame:596, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:604, endFrame:604, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:605, endFrame:607, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:610, endFrame:610, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:611, endFrame:615, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:616, endFrame:616, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:617, endFrame:618, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:619, endFrame:619, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:620, endFrame:620, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:621, endFrame:621, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:622, endFrame:622, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:632, endFrame:632, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:633, endFrame:633, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:640, endFrame:640, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:641, endFrame:641, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:642, endFrame:642, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:643, endFrame:643, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:644, endFrame:644, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:645, endFrame:645, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:646, endFrame:646, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:647, endFrame:647, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:648, endFrame:648, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:649, endFrame:649, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:650, endFrame:650, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:651, endFrame:651, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:652, endFrame:652, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:653, endFrame:653, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:658, endFrame:658, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:659, endFrame:659, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:674, endFrame:674, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:675, endFrame:675, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:682, endFrame:682, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:683, endFrame:683, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:684, endFrame:684, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:685, endFrame:685, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:686, endFrame:686, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:687, endFrame:687, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:688, endFrame:688, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:689, endFrame:689, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:690, endFrame:690, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:691, endFrame:691, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:692, endFrame:692, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:693, endFrame:693, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:700, endFrame:700, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:701, endFrame:701, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:709, endFrame:709, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:710, endFrame:711, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:716, endFrame:716, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:717, endFrame:717, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:724, endFrame:724, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:725, endFrame:725, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:726, endFrame:726, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:727, endFrame:727, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:728, endFrame:728, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:729, endFrame:729, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:730, endFrame:730, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:731, endFrame:731, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:732, endFrame:732, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:733, endFrame:733, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:734, endFrame:734, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:735, endFrame:735, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:742, endFrame:742, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:743, endFrame:743, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:758, endFrame:758, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:759, endFrame:759, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:766, endFrame:766, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:767, endFrame:767, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:768, endFrame:768, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:769, endFrame:769, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:770, endFrame:770, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:771, endFrame:771, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:772, endFrame:772, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:773, endFrame:773, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:774, endFrame:774, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:775, endFrame:775, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:776, endFrame:776, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:777, endFrame:777, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:784, endFrame:784, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:785, endFrame:785, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:800, endFrame:800, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:801, endFrame:801, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:806, endFrame:806, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:807, endFrame:807, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:808, endFrame:808, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:809, endFrame:809, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:810, endFrame:810, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:811, endFrame:811, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:812, endFrame:812, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:813, endFrame:813, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:814, endFrame:814, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:815, endFrame:815, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:816, endFrame:816, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:817, endFrame:817, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:818, endFrame:818, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:819, endFrame:819, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:826, endFrame:826, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:827, endFrame:827, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:954, endFrame:954, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:955, endFrame:955, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:956, endFrame:958, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:959, endFrame:959, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:960, endFrame:961, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:966, endFrame:966, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:967, endFrame:968, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:973, endFrame:973, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:974, endFrame:974, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:975, endFrame:975, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:976, endFrame:976, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:979, endFrame:979, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:980, endFrame:981, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:989, endFrame:989, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:990, endFrame:990, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:991, endFrame:991, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:992, endFrame:992, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:993, endFrame:993, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:994, endFrame:994, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:995, endFrame:995, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_26, startFrame:996, endFrame:997, x:-44, y:-40, w:88, h:80});
	this.filterCacheList.push({instance: this.instance_57, startFrame:119, endFrame:119, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:120, endFrame:123, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:124, endFrame:145, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:146, endFrame:150, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:151, endFrame:151, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:152, endFrame:152, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:153, endFrame:153, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:154, endFrame:154, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:155, endFrame:155, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:156, endFrame:162, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:163, endFrame:163, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:164, endFrame:164, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:165, endFrame:165, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:166, endFrame:166, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:167, endFrame:171, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:172, endFrame:172, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:294, endFrame:294, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:295, endFrame:298, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:299, endFrame:320, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:321, endFrame:325, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:326, endFrame:326, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:327, endFrame:327, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:328, endFrame:328, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:329, endFrame:329, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:330, endFrame:330, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:331, endFrame:337, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:338, endFrame:338, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:339, endFrame:339, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:340, endFrame:340, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:341, endFrame:341, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:342, endFrame:346, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:347, endFrame:347, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:469, endFrame:469, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:470, endFrame:473, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:474, endFrame:495, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:496, endFrame:500, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:501, endFrame:501, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:502, endFrame:502, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:503, endFrame:503, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:504, endFrame:504, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:505, endFrame:505, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:506, endFrame:512, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:513, endFrame:513, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:514, endFrame:514, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:515, endFrame:515, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:516, endFrame:516, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:517, endFrame:521, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:522, endFrame:522, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:644, endFrame:644, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:645, endFrame:648, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:649, endFrame:670, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:671, endFrame:675, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:676, endFrame:676, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:677, endFrame:677, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:678, endFrame:678, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:679, endFrame:679, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:680, endFrame:680, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:681, endFrame:687, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:688, endFrame:688, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:689, endFrame:689, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:690, endFrame:690, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:691, endFrame:691, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:692, endFrame:696, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:697, endFrame:697, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:715, endFrame:715, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:716, endFrame:721, x:-30, y:-18, w:62, h:39});
	this.filterCacheList.push({instance: this.instance_57, startFrame:722, endFrame:722, x:-30, y:-18, w:62, h:39});
	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-675.1,-181.1,961,374.6);


// stage content:
(lib.vital_acc_ct = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {p1:0,p2:1150};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,1,1148,1149,1150,1151,2239];
	this.streamSoundSymbolsList[1] = [{id:"vital_acc_ct1",startFrame:1,endFrame:1149,loop:1,offset:0}];
	this.streamSoundSymbolsList[1151] = [{id:"vital_acc_ct2",startFrame:1151,endFrame:2239,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		InitPage(2);
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
			GetUrlMain("vitalmenu_ct");
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
				exportRoot.ani1.aniA.play();
				exportRoot.ani1.aniA2.play();
				exportRoot.ani1.aniB.play();
				exportRoot.ani1.aniC.play();
				exportRoot.ani1.aniD.play();
			}
			else{
				exportRoot.ani1.aniA.stop();
				exportRoot.ani1.aniA2.stop();
				exportRoot.ani1.aniB.stop();
				exportRoot.ani1.aniC.stop();
				exportRoot.ani1.aniD.stop();
			}
		}
	}
	this.frame_1 = function() {
		var soundInstance = playSound("vital_acc_ct1",0);
		this.InsertIntoSoundStreamData(soundInstance,1,1149,1);
	}
	this.frame_1148 = function() {
		this.stop();
	}
	this.frame_1149 = function() {
		this.stop();
	}
	this.frame_1150 = function() {
		Prev(1);
		Next(0);
		InitAnim();
	}
	this.frame_1151 = function() {
		var soundInstance = playSound("vital_acc_ct2",0);
		this.InsertIntoSoundStreamData(soundInstance,1151,2239,1);
	}
	this.frame_2239 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1147).call(this.frame_1148).wait(1).call(this.frame_1149).wait(1).call(this.frame_1150).wait(1).call(this.frame_1151).wait(1088).call(this.frame_2239).wait(1));

	// Layer_92
	this.instance = new lib.text91("synched",0);
	this.instance.setTransform(10,0,1.5021,1.5021);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2240));

	// Layer_back
	this.back = new lib.buttonbak();
	this.back.name = "back";
	this.back.setTransform(350,645,1.0001,1.0002);
	new cjs.ButtonHelper(this.back, 0, 1, 2, false, new lib.buttonbak(), 3);

	this.timeline.addTween(cjs.Tween.get(this.back).wait(2240));

	// Layer_page
	this.page = new cjs.Text("Page number", "italic bold 15px 'Arial'", "#FF9900");
	this.page.name = "page";
	this.page.lineHeight = 17;
	this.page.lineWidth = 193;
	this.page.parent = this;
	this.page.setTransform(23,658,1.4989,1.4989);

	this.timeline.addTween(cjs.Tween.get(this.page).wait(2240));

	// Layer_next
	this.next = new lib.buttonnext();
	this.next.name = "next";
	this.next.setTransform(1496.1,5.1,0.9998,0.9999,0,0,0,0.1,0.1);
	new cjs.ButtonHelper(this.next, 0, 1, 2, false, new lib.buttonnext(), 3);

	this.timeline.addTween(cjs.Tween.get(this.next).wait(2240));

	// Layer_previous
	this.previous = new lib.buttonprev();
	this.previous.name = "previous";
	this.previous.setTransform(1432,5,1.0003,0.9993);
	new cjs.ButtonHelper(this.previous, 0, 1, 2, false, new lib.buttonprev(), 3);

	this.timeline.addTween(cjs.Tween.get(this.previous).wait(2240));

	// Layer_slider
	this.slider = new lib.sprite_slider();
	this.slider.name = "slider";
	this.slider.setTransform(610.1,670.1,0.9937,0.9983,0,0,0,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.slider).wait(2240));

	// Layer_replay
	this.replay = new lib.sprite_replay();
	this.replay.name = "replay";
	this.replay.setTransform(1045.1,650.1,0.9999,0.9999,0,0,0,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.replay).wait(2240));

	// Layer_slider_base
	this.instance_1 = new lib.sprite_sliderbase();
	this.instance_1.setTransform(600,650,1,0.9999);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(2240));

	// Layer_playpau
	this.playpau = new lib.sprite_playpau();
	this.playpau.name = "playpau";
	this.playpau.setTransform(555,650,0.9999,0.9999);

	this.timeline.addTween(cjs.Tween.get(this.playpau).wait(2240));

	// Layer_91
	this.instance_2 = new lib.text90("synched",0);
	this.instance_2.setTransform(808.9,48.5,1.5031,1.5021);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({_off:true},1150).wait(1090));

	// Layer_1
	this.ani1 = new lib.sprite88();
	this.ani1.name = "ani1";
	this.ani1.setTransform(1039.9,354.85,1.5021,1.5021);

	this.timeline.addTween(cjs.Tween.get(this.ani1).to({_off:true},1150).wait(1090));
	this.ani1.addEventListener("tick", AdobeAn.handleFilterCache);

	// Layer_101
	this.instance_3 = new lib.text150("synched",0);
	this.instance_3.setTransform(1292.15,598.6,1.5025,1.5021);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1150).to({_off:false},0).wait(1090));

	// Layer_100
	this.instance_4 = new lib.shape149("synched",0);
	this.instance_4.setTransform(225,-15,1.5021,1.5021);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1150).to({_off:false},0).wait(1090));

	// Layer_99
	this.instance_5 = new lib.text148("synched",0);
	this.instance_5.setTransform(940.6,598.6,1.5025,1.5021);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1150).to({_off:false},0).wait(1090));

	// Layer_98
	this.instance_6 = new lib.shape147("synched",0);
	this.instance_6.setTransform(225,-15,1.5021,1.5021);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1150).to({_off:false},0).wait(1090));

	// Layer_97
	this.instance_7 = new lib.text146("synched",0);
	this.instance_7.setTransform(1292.15,271.2,1.5021,1.5021);
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1150).to({_off:false},0).wait(1090));

	// Layer_96
	this.instance_8 = new lib.shape145("synched",0);
	this.instance_8.setTransform(225,-15,1.5021,1.5021);
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1150).to({_off:false},0).wait(1090));

	// Layer_95
	this.instance_9 = new lib.text144("synched",0);
	this.instance_9.setTransform(940.6,271.2,1.5021,1.5021);
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1150).to({_off:false},0).wait(1090));

	// Layer_94
	this.instance_10 = new lib.shape143("synched",0);
	this.instance_10.setTransform(225,-15,1.5021,1.5021);
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1150).to({_off:false},0).wait(1090));

	// Layer_20
	this.instance_11 = new lib.text90("synched",0);
	this.instance_11.setTransform(778.9,33.5,1.5031,1.5021);
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(1150).to({_off:false},0).wait(1090));

	// Mask_Layer_1 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_1150 = new cjs.Graphics().p("Eh8/AyyMAAAhfTMD5/AAAMAAABfTg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:null,x:0,y:0}).wait(1150).to({graphics:mask_graphics_1150,x:800,y:325}).wait(1090));

	// Masked_Layer_2___1
	this.ani2 = new lib.sprite142();
	this.ani2.name = "ani2";
	this.ani2.setTransform(771.6,51.05,1.5021,1.5021);
	this.ani2._off = true;

	var maskedShapeInstanceList = [this.ani2];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.ani2).wait(1150).to({_off:false},0).wait(1090));

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
		{src:"images/vital_acc_ct_atlas_1.png", id:"vital_acc_ct_atlas_1"},
		{src:"sounds/vital_acc_ct1.mp3", id:"vital_acc_ct1"},
		{src:"sounds/vital_acc_ct2.mp3", id:"vital_acc_ct2"}
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