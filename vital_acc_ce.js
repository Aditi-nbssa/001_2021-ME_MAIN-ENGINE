(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"vital_acc_ce_atlas_1", frames: [[0,728,1127,211],[0,941,1108,211],[0,1480,1106,161],[0,1154,1111,161],[0,1317,1111,161],[0,1643,1170,141],[0,503,1129,223],[0,1905,1169,117],[0,1786,1232,117],[0,278,1216,223],[0,0,1264,276]]},
		{name:"vital_acc_ce_atlas_2", frames: [[0,0,1190,111],[0,113,479,92],[1642,0,353,92],[481,113,444,92],[1192,0,448,115],[1325,117,113,53],[1440,117,60,60],[927,117,276,53],[1642,94,207,109],[1851,94,166,76],[1502,117,65,37],[1205,117,118,82]]}
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



(lib.CachedBmp_38 = function() {
	this.initialize(ss["vital_acc_ce_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_37 = function() {
	this.initialize(ss["vital_acc_ce_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_36 = function() {
	this.initialize(ss["vital_acc_ce_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_35 = function() {
	this.initialize(ss["vital_acc_ce_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_34 = function() {
	this.initialize(ss["vital_acc_ce_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_33 = function() {
	this.initialize(ss["vital_acc_ce_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_32 = function() {
	this.initialize(ss["vital_acc_ce_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_31 = function() {
	this.initialize(ss["vital_acc_ce_atlas_2"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_30 = function() {
	this.initialize(ss["vital_acc_ce_atlas_2"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_29 = function() {
	this.initialize(ss["vital_acc_ce_atlas_2"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_28 = function() {
	this.initialize(ss["vital_acc_ce_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_27 = function() {
	this.initialize(ss["vital_acc_ce_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_26 = function() {
	this.initialize(ss["vital_acc_ce_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_25 = function() {
	this.initialize(ss["vital_acc_ce_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_24 = function() {
	this.initialize(ss["vital_acc_ce_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_23 = function() {
	this.initialize(ss["vital_acc_ce_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_22 = function() {
	this.initialize(ss["vital_acc_ce_atlas_2"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_21 = function() {
	this.initialize(ss["vital_acc_ce_atlas_2"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_20 = function() {
	this.initialize(ss["vital_acc_ce_atlas_2"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.image130 = function() {
	this.initialize(ss["vital_acc_ce_atlas_2"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.image131 = function() {
	this.initialize(ss["vital_acc_ce_atlas_2"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.image132 = function() {
	this.initialize(ss["vital_acc_ce_atlas_2"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.image133 = function() {
	this.initialize(ss["vital_acc_ce_atlas_2"]);
	this.gotoAndStop(11);
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
	this.instance = new lib.CachedBmp_38();
	this.instance.setTransform(0,0,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,404,75.7);


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
	this.instance = new lib.CachedBmp_37();
	this.instance.setTransform(0,0,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,397.2,75.7);


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
	this.instance = new lib.CachedBmp_36();
	this.instance.setTransform(0,0,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,396.5,57.7);


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
	this.instance = new lib.CachedBmp_35();
	this.instance.setTransform(0,0,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,398.3,57.7);


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
	this.instance = new lib.CachedBmp_34();
	this.instance.setTransform(0,0,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,398.3,57.7);


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
	this.instance = new lib.CachedBmp_33();
	this.instance.setTransform(-3.95,-3.4,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,426.5,39.8);


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
	this.instance = new lib.CachedBmp_32();
	this.instance.setTransform(-3.95,-3.65,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.6,171.70000000000002,33);


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
	this.instance = new lib.CachedBmp_31();
	this.instance.setTransform(-3.95,-3.65,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.6,126.5,33);


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
	this.instance = new lib.CachedBmp_30();
	this.instance.setTransform(-3.95,-3.65,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.6,159.1,33);


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
	this.instance = new lib.CachedBmp_29();
	this.instance.setTransform(-3.95,-3.75,0.3582,0.3582);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,160.5,41.2);


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
	this.instance = new lib.CachedBmp_28();
	this.instance.setTransform(0,0,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,419.4,50.6);


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
	this.instance = new lib.CachedBmp_27();
	this.instance.setTransform(0,0,0.3392,0.3392);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,383,75.7);


(lib.text29 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(0,0,0.3392,0.3392);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,396.5,39.7);


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
	this.instance = new lib.CachedBmp_25();
	this.instance.setTransform(-4,-3.35,0.3392,0.3392);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.3,417.9,39.699999999999996);


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
	this.instance = new lib.CachedBmp_24();
	this.instance.setTransform(0,0,0.3392,0.3392);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,412.5,75.7);


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
	this.instance = new lib.CachedBmp_23();
	this.instance.setTransform(-4,-3.35,0.3392,0.3392);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.3,428.8,93.6);


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

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgRARQgHgGAAgLQAAgJAHgIQAIgHAJAAQAKAAAIAHQAHAIAAAJQAAALgHAGQgIAIgKAAQgJAAgIgIg");
	this.shape.setTransform(-577.25,123.75);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgJAHgIQAIgHAJAAQAKAAAIAHQAHAIAAAJQAAAKgHAIQgIAHgKAAQgJAAgIgHg");
	this.shape_1.setTransform(-577.25,73.75);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-579.7,71.3,5,55);


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

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgRARQgHgGAAgLQAAgJAHgIQAIgHAJAAQAKAAAIAHQAHAIAAAJQAAALgHAGQgIAIgKAAQgJAAgIgIg");
	this.shape.setTransform(-577.25,-132.75);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgRARQgHgGAAgLQAAgJAHgIQAIgHAJAAQAKAAAIAHQAHAIAAAJQAAALgHAGQgIAIgKAAQgJAAgIgIg");
	this.shape_1.setTransform(-577.25,-76.05);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgJAHgIQAIgHAJAAQAKAAAIAHQAHAIAAAJQAAAKgHAIQgIAHgKAAQgJAAgIgHg");
	this.shape_2.setTransform(-577.25,-19.95);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-579.7,-135.2,5,117.79999999999998);


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
	this.shape.graphics.f().s("#FF9900").ss(3,1,0,3).p("AjfipQgnAXggAdAlPhLQgfAmgOAlAhXjlQgsANgnASAA8kCIhYANAFZiwQgdgegugUAGHgmQAFghgJggIgJgYADRj2IhZgNAFDBaQAigkARglADPC1QApgXAhgcABFDsQAtgNAngQAhPEEIBZgKAlMC9QAgAbAwASAmIA6QAAAXAGAXQAFAVALASAjkDyQArAMAuAE");
	this.shape.setTransform(141.8731,-0.45);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(101.1,-27.9,81.6,54.9);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("ALkBaI3HAAIAAizIXHAAg");
	this.shape.setTransform(-143.3,169.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("ArjBaIAAizIXHAAIAACzg");
	this.shape_1.setTransform(-143.3,169.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-218.3,159.8,150,20);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AJOBaIybAAIAAizISbAAg");
	this.shape.setTransform(97.55,75.25);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("ApNBaIAAizISbAAIAACzg");
	this.shape_1.setTransform(97.55,75.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(37.6,65.3,120,20);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AqxhZIVjAAIAACzI1jAAg");
	this.shape.setTransform(-144.425,-77.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AqxBaIAAizIVjAAIAACzg");
	this.shape_1.setTransform(-144.425,-77.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-214.4,-87.7,140,20);


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

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF0000").s().p("AAIAXIgPAAIgbAJIAjhAIAiBBg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.5,-3.3,7,6.699999999999999);


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

	// Layer_7
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("ArOGqIWdtT");
	this.shape.setTransform(29.3,49.675);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_6
	this.shape_1 = new cjs.Shape();
	var sprImg_shape_1 = cjs.SpriteSheetUtils.extractFrame(ss["vital_acc_ce_atlas_2"],8);
	sprImg_shape_1.onload = function(){
		this.shape_1.graphics.bf(sprImg_shape_1, null, new cjs.Matrix2D(1.392,0,0,1.392,-144.1,-75.9)).s().p("A2gL3IAA3tMAtBAAAIAAXtg")
	}.bind(this);
	this.shape_1.setTransform(94.125,-13.875);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_5
	this.shape_2 = new cjs.Shape();
	var sprImg_shape_2 = cjs.SpriteSheetUtils.extractFrame(ss["vital_acc_ce_atlas_2"],9);
	sprImg_shape_2.onload = function(){
		this.shape_2.graphics.bf(sprImg_shape_2, null, new cjs.Matrix2D(1.308,0,0,1.308,-108.6,-49.7)).s().p("Aw9HxIAAvhMAh7AAAIAAPhg")
	}.bind(this);
	this.shape_2.setTransform(-124.65,-140.475);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_4
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#FFFFFF").ss(2,0,0,3).p("An8kiIPwAAIAAJP");
	this.shape_3.setTransform(-183.3,128.25);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	// Layer_3
	this.shape_4 = new cjs.Shape();
	var sprImg_shape_4 = cjs.SpriteSheetUtils.extractFrame(ss["vital_acc_ce_atlas_2"],10);
	sprImg_shape_4.onload = function(){
		this.shape_4.graphics.bf(sprImg_shape_4, null, new cjs.Matrix2D(1.553,0,0,1.553,-50.5,-28.7)).s().p("An4EfIAAo9IPxAAIAAI9g")
	}.bind(this);
	this.shape_4.setTransform(-183.725,128.125);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	// Layer_2
	this.shape_5 = new cjs.Shape();
	var sprImg_shape_5 = cjs.SpriteSheetUtils.extractFrame(ss["vital_acc_ce_atlas_2"],11);
	sprImg_shape_5.onload = function(){
		this.shape_5.graphics.bf(sprImg_shape_5, null, new cjs.Matrix2D(1.553,0,0,1.553,-91.6,-63.6)).s().p("AuTJ9IAAz5IcnAAIAAT5g")
	}.bind(this);
	this.shape_5.setTransform(-142.6,93.2);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(1));

	// Layer_1
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#FFFFFF").ss(2,0,0,3).p("AmEAAIMJAA");
	this.shape_6.setTransform(-173.575,37.95);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-235.2,-190.2,473.4,349.6);


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
	this.shape.graphics.f("#003366").s().p("AgRARQgHgHAAgKQAAgKAHgHQAHgHAKAAQALAAAGAHQAIAHAAAKQAAAKgIAHQgGAIgLAAQgKAAgHgIg");
	this.shape.setTransform(8,38.85);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(5.5,36.4,5,5);


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
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("ABHIdQiAhAgGiGQgmiSCsrk");
	this.shape.setTransform(-241.6156,216.4672);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1,0,0,3).p("EACbgmuIAAiHIBFAAIAAjJIB9AAIAABUIDMAAQC8AcAIEpIAAL+IgkAAIAAncIiHAAIAAATIg6AAIAAA6IiqhkIAAh+IBCAAIAABEICiAfIAAAHICHAAIAAi1QAKlBi+gkIi4AAIAABHQARgBALAjIAAB1IAnAAIAADSEAEIgkaIAAjwQAWgPAXAPIAAESIApAgEACbgmuIBWAAEAFdgqqIAAAiEAF5gmqIgsAAEgMIgiSQhBhaAAh1QAAiVBphqQBqhpCVAAQCVAABpBpQBaBaANB4IADAtQAABDgWA7IEfAAIAgAAIAAANIAgAAIAACIIh+BOIgjAAIAAgjIg9AAIAAhJIABAAICdgeIAAhZEACQgmOIAAAXIB4BdEAAvggAIAAANIAAAoIBOAAIgBgoIA5gfIBTg2IAAjSAAv/zIBNAAEgB8gmOIEMAAIALAAIAAggEgCPgjjQgaBGg6A6QgsAtg1AaQhHAjhWAAIgCAAIhHgHIgiAoIGDAAIAAMhImTAAIAAD3IERFdIAABfIkRAAIAAm8AqG+ZIAqAAIAALiIpQAAIhPAAIAAkLQhoibByiNIAAivIFoAAICBj5AgJ7MIAAiuIA4AAIAAhRAgJ7MIAVAAIBwAAIABj/AhVy3IAAksIAfAAIAAgxIAPAAIAAg1IAeAAIAAiDAAb4UIAAg1IgPAAIgVAAAgn4UIBCAAAB83jIgsAAIAAgxIg1AAABQ3jIhKAAIg8AAAB83jIAAjpAAM5JIAAiDApM/YIg6A/EgIqggAQhngUhPhPIgogvAlLoEIAAEQQAHA+hWAIIn/AAQhWgIAIg+IAAoZIjFmqAhVy3Ih0AAAAGyfIAmgsIBQAAIAAkYAhVoEIAAgRIAAqiADWpzIhQAAIg2A8IAAACICGAAIAAg+IAAgwIhaAAIAAooABQo3IgCACIhIAAIAAAgIhbAAAhVoEIj2AAAAGo1IAApqAAG3jIAAFEAuJ+ZIEDAAEALJghDIAAgrEAJCghuIAAArAGz/BIAAgyIh+hOIAAi3AGz/BIBgAAIAAgyIhgAAAGz3kIAAjlIAAj4AGz3kIAuAAIAAgrICKgEIAAAvIAqAAIAAhfIAWAAIAAgkIAeAAAIq3kIhJAAAIY4dIAAgtIAOAAIAAh6AIT/BIAABCIAmAAIAAC2IAAB/IAlAAIAAAwALt5nIAVAAIAAAkIATAAIAACUIAZAAIAAE1IgiAAIAABNIgaATIgaAAIhUAAIAAmUIARAAIAAg2AJr3kIhBAAAI57JIiGAAAIm5KIATAAAMux6IAlAAIAoBoIAJAYIAADcIBLAAIAAE8Ig9BDIi1AAIgdhBIgzAAIgJAAIAAg6IhaABIAAgcIAApPIAAlgAGzzDIBGAAIAAAQIAxAvADWo1IB4AAIAAg+IAAgzIBlAAIAAodIAAkhAFOpzIBjAAIBLA+IAuAAAH8o1IiuAAAKEoaIAAjBIBUg3IAAkIAKErbIAAk/AN7wSICeAAIEUCYIAAIHInYHJIgfAAAKNngIAAAoICpIOIFhQyIAAS9IAPAAIAAAeIjdAAIAACBIkQEbItoAAIjSkVIAAiHIjRAAIAAgeIAZAAIAAiLIAAgEAo5R5IAAAFIHk4dIAAhlEgA4AljIAAA3IBjAAIAAg3IhjAAIlJAAEAIVAljIAAA3IBkAAIAAg3gEAJ5AljIFQAAEAArAljIHqAAEgI5AlFIbQAA");
	this.shape_1.setTransform(-177.4864,47.6);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#804000").s().p("AmeabIjSkVIAAiGIjRAAIAAgfIAZAAIbQAAIAPAAIAAAfIjdAAIlQAAIFQAAIAACAIkQEbgAEmU3IBkAAIAAg3IhkAAInpAAIHpAAIBkAAIAAA3IhkAAIAAg3IAAA3gAjDU3IAAg3IhkAAIlJAAIFJAAIAAA3IBkAAgAjDU3IhkAAIAAg3IBkAAIAAA3gALaUAgAknUAgAsoThIAAiKIAAgFQiBhAgHiFQgliSCtrmIAAAFIHk4cIAAhlIAAgRIBcAAIAAggIBIAAIACgCIAAACICGAAIB3AAICuAAIAuAAIAAAcIBagBIAAA6IAJAAIAAAoICpIPIFhQxIAAS8gAsoThg");
	this.shape_2.setTransform(-153.584,159.925);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#C0C0C0").s().p("AM2WrIipoQIAAgoIgJAAIAAg5IAAjCIBUg3IAAkIIAaAAIAagSIAAhOIAiAAIgiAAIAABOIgaASIgaAAIhUAAIBUAAIAAEIIhUA3IAAk/IAAmSIARAAIAAg2IAAA2IgRAAIAAGSIAAE/IAADCIhaAAIAAgbIguAAIhLg/IhjAAIAAgzIBlAAIAAocIAAIcIhlAAIAAAzIAAA/Ih4AAIAAg/IAAA/IiGAAIAAgDIA2g8IBQAAIhQAAIg2A8IgCADIhIAAIAAprIAAlDIg8AAIA8AAIAAFDIAAJrIAAAfIhbAAIAAqiIAAkrIAfAAIAAgxIAPAAIAAg0IAeAAIAAiEIAAitIA4AAIAAhSIAAgoIBNAAIABAoIhOAAIBOAAIgBD/IABj/IgBgoIA5gfIBTg2IAAjSIAAjwQAWgPAXAPIAAESIAAkSQgXgPgWAPIAADwIAADSIhTA2Ig5AfIhNAAIAAgNIAAgjIg9AAIAAhJIABAAICdgeIAAhZIkfAAQgaBGg6A7QgsAsg1AaQhHAjhWAAIgCAAIhHgGIgiAnIGDAAIAAMgIB0AAIAAKiIAAARIj2AAIAAhfIkRlcIERFcIAABfIkRAAIAAm7IAAG7IERAAIAAEQQAHA+hWAIIn/AAQhWgIAIg+IAAoZIjFmqIJQAAIpQAAIhPAAIAAkJQhoicByiNIAAivIFoAAICBj4IAoAvQBPBOBnAVQhngVhPhOIgogvQhBhbAAh1QAAiVBphqQBqhpCVAAQCVAABpBpQBaBaANB5IEMAAIAAAWIB4BdIh4hdIAAgWIALAAIAAghIAAiHIBFAAIAAjIIB9AAIAABTIAAAiIAAgiIDMAAQC8AcAIEpIAAL+IAVAAIAAAkIATAAIAACUIAZAAIAAE0IAlAAIAoBoICeAAIEUCYIAAIHInYHLgALANzIAdBBIC1AAIA9hDIAAk7IhLAAIAAjdIgJgYIAJAYIAADdIBLAAIAAE7Ig9BDIi1AAIgdhBIgzAAgAIqMfIAApQgADWLgIAAgwIhaAAIAAooIAAkXIgsAAIAAgxIg1AAIAAg0IgPAAIAAiEIAACEIgVAAIAVAAIAPAAIAAA0IhCAAIBCAAIA1AAIAAAxIAsAAIAAEXIhQAAIgmAsIAmgsIBQAAIAAIoIBaAAgApcGUIAAj4IGTAAImTAAIAArhIgqAAIkDAAIEDAAIAqAAIAALhgAIqDPIAAlegAH5ChIAxAuIgxguIAAgQIhGAAIAAkgIAuAAIAAgsICKgDIAAAvIAqAAIgqAAIAAgvIiKADIAAAsIguAAIAAEgIBGAAIAAAQgAB8iPIAAjpgABQiPIhKAAgAKViPIAAhgIAWAAIAAgkIAeAAIAkAAIgkAAIAAncIAAgqIAAAqIiHAAIAAgqIAAAqIAAATIg6AAIAAA7IiqhkIAAh+IBCAAIAABDICiAfIAAAIICHAAIAAi2QAKlAi+glIi4AAIAABHQARgBALAjIAAB1IAnAAIAADTIhCAAIgpghIApAhIAAB+ICqBkIAAg7IA6AAIAAgTICHAAIAAHcIgeAAIAAAkIgWAAgAIqiPIBBAAIhBAAIhJAAgAGzl1IAADmIAAjmIAAj4IAAgyIBgAAIAAAyIhgAAIBgAAIAAgyIhgAAIh+hNIAAi4IAAC4IB+BNIAAAygAJejGIAAgwIglAAIAAh/IiGAAICGAAIAAB/IgTAAIATAAIAlAAgAIYjJIAAgtIAOAAIAAh6IAAB6IgOAAgAI5l1IAAi2IgmAAIAAhCIAABCIAmAAgAAMl4IBwAAIhwAAIgVAAgAqGpFIA6g/gABSqsIB+hOIAAiIIggAAIAAgNIggAAIAgAAIAAANIAgAAIAACIIh+BOIgjAAgAiPuPQAWg6AAhEIgDgsIADAsQAABEgWA6gAF5xWIgsAAgADxxaIhWAAgAlLNPgAFOMfIAAg/IBjAAIBLA/gAFOLggALYE5gAhVCcgApcCcgAB8CIgAAGiPgAAMj0gAI5l1gAAvqfgAJCrvgAGguDg");
	this.shape_3.setTransform(-177.4864,-88.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-311,-234.8,267.1,564.9000000000001);


(lib.shape78 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["#FFFF00","#FF6600"],[0,1],-3.8,1.7,0,-3.8,1.7,13.6).s().p("AgzBLIgrgjIgBgoIAKAAIAAgJIAaAAIAAgHIASAAIAFgSIAQAAIAAgoIAWAAIAAAJIAKAAIAAAQIAFAAIAAAQIALAAIAAgWIAJAAIAAAVIAMAAIAAAKIARAAIAAAaIAeAAIAAAcIgOAPIgyAeg");
	this.shape.setTransform(0.025,-0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.6,-7.5,19.299999999999997,15);


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

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AAxgfQgIgHgBgRIgCgVIgGgMIgMgUQgGgLABgBABxhBIgUAMQgEAAgJAGIgPAHQgFADgLAGAAwgdQgDAAAEgCAgiAPQAMACAFgHIANgKIAUgEQAMAAAFgNQAFgMAKAAIACAAIAIAWQAIARAAAFQAAAGAEAIQAFAIACAOQADAOAEAEIAHAKIAEAKIACAEAg9hoIAEATQADANgCAKQgCALALANQAKAMgFAGQgGAGAEAIIAHALQADAEAAAGAh1A6IADAAQAWABgDgGQgDgGAKgEQALgFADgFQAEgFANgEIAXgJQACAKgBAKQgBAKAGAKQAFAKABAJQABAJAHAMQAHAMgFADQgFAEAHAM");
	this.shape.setTransform(0.104,94.8019);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1,0,0,3).p("AArh8IgmgFIglADQgVAEgSAJQgSAJgKARAB+giIgQgkIgbgaQgMgOgRgKAB1A4IAJgqIADgkAAQCBQATgIAQgGQARgGAPgQIAKgJIASgRAhrhNQgIARgGASQgGATgBAVQAAAVAFARIAHARIAIASQAJARARAOAhIBtQAPAKAVADIAnAI");
	this.shape_1.setTransform(0.3723,95.3192);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_3
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#CCCCCC").s().p("AhcBdQgRgSgKgVQgLgZAAgdIACgSQAEgqAgggQAngmA1AAQA3AAAmAmIATAYIABACQANAWAEAZIABATQAAA0gjAlIgDAEQgmAmg3AAQg1AAgngmg");
	this.shape_2.setTransform(0.25,95.2);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_2
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(1,0,0,3).p("AC9g+IiDiqABJDpIAAgCIBkhfAA4jmIh3AAIh9CqAiiCIIBeBh");
	this.shape_3.setTransform(0.1713,99.549);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#000000").ss(1,0,0,3).p("AiCiSIg9ABIgJAAIAADEIAjAAIFQAAIAeAAIAAjGIgOAAIg7AAAhHCUICNAA");
	this.shape_4.setTransform(0.425,108.05);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FF0000").s().p("AhHDpIhehhIFQAAIlQAAIgjAAIAAjEIAJAAIA9gBIg9ABIB9iqIB3AAIACgCICECqIg7AAIA7AAIAOAAIAADGIgeAAIhlBfIAAACg");
	this.shape_5.setTransform(0.425,99.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3}]}).wait(1));

	// Layer_1
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#000000").ss(1,0,0,3).p("AA8sZIAAYzIh3AAIAA4zg");
	this.shape_6.setTransform(-0.675,24.225);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#000000").ss(1,0,0,3).p("ABvg7IAtAAIAAgpIk2AAIAAApIA1AAACcgbIgtABACcg7IAAAgIAACAIhnAAAhBBlIhZAAIAAh8IAAgkAiagXIAwAA");
	this.shape_7.setTransform(-0.001,-65.225);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FF00FF").s().p("AhCN+IAA4yIB3AAIAAYygAA1q0Ih3AAIhZAAIABh8IAAgkIA0AAIg0AAIAAgqIE2AAIAAAqIAAAfIgtABIAtgBIAACBgAhqswIgwAAgACctUIgtAAgAA1q0gACcs1g");
	this.shape_8.setTransform(0,14.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20.6,-76.3,42.1,200.2);


(lib.shape76 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("AhGkoIAAIwIARgkIAPA1IAOg3IARA4IANg3IAQA2IANg2IAQA2IAUg2IAAoL");
	this.shape.setTransform(-0.65,-28.5742);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF00FF").s().p("AgXDpIgPA4IgPg1IgRAkIAAowICNAAIAAILIgUA2IgRg2IgMA2IgQg2IgNA2g");
	this.shape_1.setTransform(-0.65,-29.325);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8.7,-59.2,16.2,60.300000000000004);


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
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("ADlohIAAQtIgMASIgOgSIAAwtgAjFohIAAQsIgOgWIgRAXIAAwtg");
	this.shape.setTransform(-1.425,11.4271);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF00FF").s().p("ADLIOIAAwtIAaAAIAAQtIgMASgAjkofIAfAAIAAQsIgOgXIgRAYg");
	this.shape_1.setTransform(-1.425,11.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-25.3,-44.1,47.8,110.80000000000001);


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
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("AABhhIAPAWIAACxIgfAAIAAivg");
	this.shape.setTransform(-22.2,27.9302);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1,0,0,3).p("AANhSIAACvIgZAAIAAivIANASg");
	this.shape_1.setTransform(20.8,28.8262);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FF00FF").s().p("ADLBkIAAivIAOASIAMgSIAACvgAjkBkIAAivIARgYIAOAWIAACxg");
	this.shape_2.setTransform(-0.825,28.125);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(1,0,0,3).p("AihgXIAAgkIBUhWIAAkZIARgjIAPA1IAOg4IARA4IAOg2IAOA2IANg2IARA2IAUg2IAAE+IBeBaIABAfIBfAAIAAGAIhtByIkgAAIhuhlIAAmNIBcAAIFAAAACcA9QBBBBAABbQAABbhBBAQhABBhbAAQhaAAhBhBQhAhAAAhbQAAhbBAhBQBBg/BaAAQBbAABAA/g");
	this.shape_3.setTransform(0.025,40.4991);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#999999").s().p("AibCbQhAhAAAhbQAAhaBAhAQBBhBBaAAQBbAABBBBQBABAAABaQAABbhABAQhBBBhbAAQhaAAhBhBg");
	this.shape_4.setTransform(0.1,62.15);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FF0000").s().p("AiPD6IhuhmIAAmNIBcAAIFAAAIBfAAIAAGAIhtBzgAiaijQhABAAABbQAABaBABAQBBBBBaAAQBbAABAhBQBBhAAAhaQAAhbhBhAQhAhBhbAAQhaAAhBBBg");
	this.shape_5.setTransform(0.025,63.05);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FF00FF").s().p("AifDcIAAgkIBUhVIAAkZIARgjIAOA1IAOg4IARA5IANg3IAPA2IAOg2IAQA2IAVg2IAAE+IBdBaIABAeg");
	this.shape_6.setTransform(-0.1,16.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-26.4,-7.5,52.9,96.5);


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
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("EACbgmuIAAiHIBFAAIAAjJIB9AAIAABUIDMAAQC8AcAIEpIAAL+IgkAAIAAncIiHAAIAAATIg6AAIAAA6IiqhkIAAh+IBCAAIAABEICiAfIAAAHICHAAIAAi1QAKlBi+gkIi4AAIAABHQARgBALAjIAAB1IAnAAIAADSEAEIgkaIAAjwQAWgPAXAPIAAESIApAgEACbgmuIBWAAEAFdgqqIAAAiEAF5gmqIgsAAEgMIgiSQhBhaAAh1QAAiVBphqQBqhpCVAAQCVAABpBpQBaBaANB4IADAtQAABDgWA7IEfAAIAgAAIAAANIAgAAIAACIIh+BOIgjAAIAAgjIg9AAIAAhJIABAAICdgeIAAhZEACQgmOIAAAXIB4BdEAAvggAIAAANIAAAoIBOAAIgBgoIA5gfIBTg2IAAjSAAv/zIBNAAEgB8gmOIEMAAIALAAIAAggEgCPgjjQgaBGg6A6QgsAtg1AaQhHAjhWAAIgCAAIhHgHIgiAoIGDAAIAAMhImTAAIAAD3IERFdIAABfIkRAAIAAm8AqG+ZIAqAAIAALiIpQAAIhPAAIAAkLQhoibByiNIAAivIFoAAICBj5AgJ7MIAAiuIA4AAIAAhRAgJ7MIAVAAIBwAAIABj/AhVy3IAAksIAfAAIAAgxIAPAAIAAg1IAeAAIAAiDAAb4UIAAg1IgPAAIgVAAAgn4UIBCAAAB83jIgsAAIAAgxIg1AAABQ3jIhKAAIAAFEIAmgsIBQAAIAAkYIAAjpAAM5JIAAiDAg23jIA8AAApM/YIg6A/EgIqggAQhngUhPhPIgogvAlLoEIAAEQQAHA+hWAIIn/AAQhWgIAIg+IAAoZIjFmqAhVy3Ih0AAAhVoEIAAgRIAAqiADWo1IiGAAIAAgCIgCACIhIAAIAAAgIhbAAADWpzIhQAAIg2A8AhVoEIj2AAADWpzIAAgwIhaAAIAAooAAGo1IAApqAuJ+ZIEDAAEALJghDIAAgrEAJCghuIAAArAGz/BIBgAAIAAgyIhgAAIAAAyIAAD4IAADlIAuAAIAAgrICKgEIAAAvIAqAAIAAhfIAWAAIAAgkIAeAAEAE1gj4IAAC3IB+BOAIm7EIAAB6IATAAIAlAAIAAAwAIq3kIhJAAAIY4dIAAgtIAOAAAIT/BIAABCIAmAAIAAC2IiGAAALt5nIAVAAIAAAkIATAAIAACUIAZAAIAAE1IgiAAIAABNIgaATIgaAAIhUAAIAAmUIARAAIAAg2AI55KIAAh/AJr3kIhBAAAMux6IAlAAIAoBoIAJAYIAADcIBLAAIAAE8Ig9BDIi1AAIgdhBIgzAAIgJAAIAAg6IAAjBIBUg3IAAkIAGzzDIBGAAIAAAQIAxAvIAAlgAFOo1Ih4AAIAAg+AFOo1IAAg+IAAgzIBlAAIAAodAFOpzIBjAAIBLA+AKEoaIhaABIAAgcIguAAIiuAAAKErbIAAk/AIqo1IAApPAN7wSICeAAIEUCYIAAIHInYHJIgfAAIipoOIAAgoAGz3kIAAEhAM2BWIFhQyIAAS9IAPAAIAAAeIjdAAIAACBIkQEbItoAAIjSkVIAAiHIjRAAIAAgeIAZAAIAAzHIHk4dIAAhlEgA4AljIAAA3IBjAAIAAg3IhjAAIlJAAEAIVAljIAAA3IBkAAIAAg3gEAJ5AljIFQAAEAArAljIHqAAEgI5AlFIbQAA");
	this.shape.setTransform(-177.4864,47.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#804000").s().p("AnZabIjSkVIAAiGIjRAAIAAgfIAZAAIAAzHIHk4cIAAhlIAAgRIBcAAIAAggIBIAAIACgCIAAACICGAAIB3AAICuAAIAuAAIAAAcIBagBIAAA6IAJAAIAAAoICpIPIFiQxIAAS8IAPAAIAAAfIjeAAIlQAAIFQAAIAACAIkPEbgAFPU3IAAg3IhkAAInpAAIHpAAIAAA3IBkAAgAj+U3IAAg3IhkAAIlJAAIFJAAIAAA3IBkAAgANuThI7RAAgAFPU3IhkAAIAAg3IBkAAIAAA3gAj+U3IhkAAIAAg3IBkAAIAAA3gAKfUAgADrUAgAliUAg");
	this.shape_1.setTransform(-147.7,159.925);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#C0C0C0").s().p("AM2WrIipoQIAAgoIgJAAIAAg5IAAjCIBUg3IAAkIIAaAAIAagSIAAhOIAiAAIgiAAIAABOIgaASIgaAAIhUAAIBUAAIAAEIIhUA3IAAk/IAAmSIARAAIAAg2IAAA2IgRAAIAAGSIAAE/IAADCIhaAAIAAgbIguAAIhLg/IhjAAIBjAAIBLA/IiuAAIAAg/IAAgzIBlAAIAAocIBGAAIAAAQIAxAuIgxguIAAgQIhGAAIAAkgIAAEgIAAIcIhlAAIAAAzIAAA/Ih4AAIAAg/IAAgwIhaAAIAAooIAAkXIgsAAIAAgxIg1AAIAAg0IgPAAIAAiEIAACEIgVAAIAVAAIAPAAIAAA0IhCAAIBCAAIA1AAIAAAxIAsAAIAAEXIhQAAIgmAsIAmgsIBQAAIAAIoIBaAAIAAAwIhQAAIg2A8IA2g8IBQAAIAAA/IiGAAIAAgDIgCADIhIAAIAAprIAAlDIg8AAIA8AAIAAFDIAAJrIAAAfIhbAAIAAqiIAAkrIAfAAIAAgxIAPAAIAAg0IAeAAIAAiEIAAitIA4AAIAAhSIAAgoIBNAAIABAoIhOAAIBOAAIgBD/IABj/IgBgoIA5gfIBTg2IAAjSIAAjwQAWgPAXAPIAAESIAAkSQgXgPgWAPIAADwIAADSIhTA2Ig5AfIhNAAIAAgNIAAgjIg9AAIAAhJIABAAICdgeIAAhZIkfAAQgaBGg6A7QgsAsg1AaQhHAjhWAAIgCAAIhHgGIgiAnIGDAAIAAMgIB0AAIAAKiIAAARIj2AAIAAhfIkRlcIERFcIAABfIkRAAIAAm7IAAG7IERAAIAAEQQAHA+hWAIIn/AAQhWgIAIg+IAAoZIjFmqIJQAAIpQAAIhPAAIAAkJQhoicByiNIAAivIFoAAICBj4IAoAvQBPBOBnAVQhngVhPhOIgogvQhBhbAAh1QAAiVBphqQBqhpCVAAQCVAABpBpQBaBaANB5IEMAAIAAAWIB4BdIh4hdIAAgWIALAAIAAghIAAiHIBFAAIAAjIIB9AAIAABTIAAAiIAAgiIDMAAQC8AcAIEpIAAL+IgkAAIAAncIAAgqIAAAqIiHAAIAAgqIAAAqIAAATIg6AAIAAA7IiqhkIAAh+IBCAAIAABDICiAfIAAAIICHAAIAAi2QAKlAi+glIi4AAIAABHQARgBALAjIAAB1IAnAAIAADTIhCAAIgpghIApAhIAAB+ICqBkIAAg7IA6AAIAAgTICHAAIAAHcIgeAAIAAAkIgWAAIAABgIAAhgIAWAAIAAgkIAeAAIAkAAIAVAAIAAAkIATAAIAACUIAZAAIAAE0IAlAAIAoBoIAJAYIAADdIBLAAIAAE7Ig9BDIi1AAIgdhBIgzAAIAzAAIAdBBIC1AAIA9hDIAAk7IhLAAIAAjdIgJgYICeAAIEUCYIAAIHInYHLgAIqMfIAApQgApcGUIAAj4IGTAAImTAAIAArhIgqAAIkDAAIEDAAIAqAAIAALhgAIqDPIAAlegAB8iPIAAjpgABQiPIhKAAgAJriPIAqAAIgqAAIAAgvIiKADIAAAsIguAAIAAjmIAAj4IBgAAIAAgyIhgAAIAAAyIAAD4IAADmIAuAAIAAgsICKgDIAAAvgAIqiPIBBAAIhBAAIhJAAgAJejGIAAgwIglAAIAAh/IiGAAICGAAIAAB/IgTAAIATAAIAlAAgAIYjJIAAgtIAOAAIAAh6IAAB6IgOAAgAI5l1IAAi2IgmAAIAAhCIAABCIAmAAgAAMl4IBwAAIhwAAIgVAAgAqGpFIA6g/gAE1rsIB+BNIh+hNIAAi4IAAC4gABSqsIB+hOIAAiIIggAAIAAgNIggAAIAgAAIAAANIAgAAIAACIIh+BOIgjAAgAiPuPQAWg6AAhEIgDgsIADAsQAABEgWA6gAF5xWIgsAAgADxxaIhWAAgAlLNPgALYE5gAhVCcgApcCcgAB8CIgAAGiPgAAMj0gALJkTgAGzptIAAgyIBgAAIAAAygAAvqfgAJCrvgAGguDg");
	this.shape_2.setTransform(-177.4864,-88.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-311,-234.8,267.1,564.9000000000001);


(lib.shape70 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,0,0,0.392)").s().p("Eg8bAxlMAAAhjJMB43AARMgCFBi4g");
	this.shape.setTransform(-172.6,54);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-559.4,-263.3,773.5999999999999,634.7);


(lib.shape67 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(3,0,0,3).p("AAIC5IgCgDQgGgMAFgGIAbgZQAUgTgEgUQgEgVABgNQABgOAGgLQAHgMgBgQQgCgPAKgSQAKgSAEgSQAEgTADgHQAEgIACgOQADgNgFgIQgFgHAYgMQgIgWgZAFQgaAGgKgOQgKgNgBAHQAAAHgNAEQgMAEADAXQADAXgLAXQgJAXgIALIgJARIgEAeIgDAZIgWAQQgWAPACAQIAIAeQAEANgXAVQATgCgZAU");
	this.shape.setTransform(-1.5384,-6.6285);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1,0,0,3).p("Ag0gUQADAAACACIAKAHIANABQAGgDAFAHQAEAGABgCQAAgCAIAEIAMAGQAFABAEAFIAKAHIAJACIAGgDIAAgBQAEgBgCAF");
	this.shape_1.setTransform(-5.4873,9.8316);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#804000").s().p("AhkCKIBqk9IBfAeIhlFJg");
	this.shape_2.setTransform(-0.675,-6.075);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-14.3,-26,25.6,39.9);


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

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("ACCgSIABASQAAA3gmAmQgmAmg3AAQg2AAgmgmQgmgmAAg3IABgRQAFgrAgggQAmgmA2AAQA3AAAmAmQAfAgAGAqg");
	this.shape.setTransform(0.25,95.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CCCCCC").s().p("AhcBdQgmgmAAg3IACgSQAEgqAgggQAngmA1AAQA3AAAmAmQAfAgAGApIABATQAAA3gmAmQgmAmg3AAQg1AAgngmg");
	this.shape_1.setTransform(0.25,95.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(1,0,0,3).p("AC9g+IiDiqACtCIIhkBfIAAACAA4jmIh3AAIh9CqAhEDpIhehh");
	this.shape_2.setTransform(0.1713,99.549);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(1,0,0,3).p("ACAiTIA7AAIAOAAIAADGIgeAAIlQAAIgjAAIAAjEIAJAAIA9gBIgCATQAAA2AmAmQAnAmA2AAQA2AAAmgmQAmgmAAg2gABGCUIiNAA");
	this.shape_3.setTransform(0.425,108.05);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FF0000").s().p("AhHDpIhehhIFQAAIhlBfIAAACgACrCIIlQAAIgjAAIAAjEIAJAAIA9gBIgCATQAAA1AmAmQAnAmA2AAQA2AAAmgmQAmgmAAg1IgBgUIA7AAIAOAAIAADGgAilCIgAhCjmIB3AAIACgCICECqIg7AAQgGgqgfggQgmglg2gBQg2ABgnAlQgfAhgFAqIg9ABg");
	this.shape_4.setTransform(0.425,99.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	// Layer_1
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#000000").ss(1,0,0,3).p("AA8sZIAAYzIh3AAIAA4zg");
	this.shape_5.setTransform(-0.675,24.225);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#000000").ss(1,0,0,3).p("Aiag7IAAgpIE2AAIAAApIAAAgIAACAIhnAAACcgbIgtABABvg7IAtAAAhBBlIhZAAIAAh8IAAgkIA1AAAiagXIAwAA");
	this.shape_6.setTransform(-0.001,-65.225);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FF00FF").s().p("AhCN+IAA4yIB3AAIAAYygAA1q0Ih3AAIhZAAIABh8IAAgkIAAgqIE2AAIAAAqIgtAAIAtAAIAAAfIgtABIAtgBIAACBgAhqswIgwAAgAhmtUIg0AAgAA1q0gACcs1gACctUg");
	this.shape_7.setTransform(0,14.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20.6,-76.3,42.1,200.2);


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
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("AAZiwIAHAFAAZiwQDfhLBFCKQBkAMAbBYQAKCdjUAAQAUCAk2gxIgFACQiOA9hchgIgCAAQhpAKgMhfIgCgDQhRhwBnhxIAEgFQCVjUECCkg");
	this.shape.setTransform(22.0317,3.2872);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CCCCCC").s().p("AkfC+IgCAAQhpAKgMhfIgCgDQhRhwBnhxIAEgFQCVjUECCkIAHAFIgHgFQDfhLBFCKQBkAMAbBYQAKCdjUAAQAUCAk2gxIgFACQg3AXgwAAQhLAAg4g6g");
	this.shape_1.setTransform(22.0317,3.2872);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-23.4,-22.5,90.9,51.7);


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
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("ABArdIAANKIBeBaIABAfIBfAAIAAGBIhtByIkgAAIhuhmIAAmNIBcAAIAAgkIBUhWIAAtJACcE7QBBBAAABbQAABbhBBBQhABAhbAAQhaAAhBhAQhAhBAAhbQAAhbBAhAQBBhBBaAAQBbAABABBgACfDmIlAAA");
	this.shape.setTransform(0.025,15.125);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AibCbQhAhAAAhbQAAhaBAhAQBBhBBaAAQBbAABBBBQBABAAABaQAABbhABAQhBBBhbAAQhaAAhBhBg");
	this.shape_1.setTransform(0.1,62.15);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FF0000").s().p("AiPD6IhuhmIAAmNIBcAAIFAAAIBfAAIAAGAIhtBzgAiaijQhABAAABbQAABaBABAQBBBBBaAAQBbAABAhBQBBhAAAhaQAAhbhBhAQhAhBhbAAQhaAAhBBBg");
	this.shape_2.setTransform(0.025,63.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FF00FF").s().p("AifHiIAAgkIBUhWIAAtJICNAAIAANKIBdBaIABAfg");
	this.shape_3.setTransform(-0.1,-10.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-26.4,-59.2,52.9,148.2);


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

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("AAADoQhfAAhEhEQhEhEABhgQgBhfBEhEQBEhEBfABQBggBBEBEQBEBEAABfQAABghEBEQhEBEhgAAg");
	this.shape.setTransform(0.0998,20.9998);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CCCCCC").s().p("AijCkQhEhEABhgQgBhfBEhEQBEhEBfABQBggBBEBEQBEBEgBBfQABBghEBEQhEBEhgAAQhfAAhEhEg");
	this.shape_1.setTransform(0.0998,20.9998);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(1,0,0,3).p("AEjCDIgBgJIgWjsAkIiCIgYDqIgCAK");
	this.shape_2.setTransform(0.0764,5.6252);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(1,0,0,3).p("AENirQgThEg1g2QhShShzAAQhyAAhSBSQgrArgUA1IgBACIgDAIAkhA5QgDAUABAUQgBB0BWBRQBWBSB4AAQB5AABWhSQBVhRAAh0IAAgW");
	this.shape_3.setTransform(-0.0286,11.275);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FF0000").s().p("AjOEmQhWhRABh0QgBgUADgUIACgKIAYjqIADgIIABgCQAUg1ArgrQBShSByAAQBzAABSBSQA1A2ATBEIAWDsIABAKIAAAWQAAB0hVBRQhWBSh5AAQh4AAhWhSgAiihCQhEBDABBgQgBBgBEBEQBEBEBfAAQBgAABEhEQBEhEAAhgQAAhghEhDQhEhEhgABIgBAAQheAAhEBDg");
	this.shape_4.setTransform(-0.0286,11.275);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FF00FF").s().p("AkFAAIABARIgBACIgCAIgAEGAAIAAgGIgBgUIADAfg");
	this.shape_5.setTransform(0.05,-10.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-30.2,-27.3,60.4,77.2);


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

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFF00").s().p("AgjAtQgCgGALgMQAMgMgGgJIgDgGIgBgBQgCgHAMgMQALgLgGgJQgFgKADABQAEABAEAIQAEAHAAALQAAAKgEAHQgEAGgHABIgCAAIACAEQAFAIAAAKQAAALgFAHQgEAGgIACIgCAAQgFAAgCgFgAAAAqQgBgGAKgMQALgLgGgKQgFgIADABIAIAHQAFAIAAALQAAAKgFAHQgEAHgHABIgDAAQgFAAgBgFgAAYADQgCgGALgLQALgMgFgJQgFgKADABIAIAJQAFAIAAAKQAAAKgFAHQgFAGgHABIgCABQgFAAgCgFgAgwgBQgCgHALgMQALgLgFgJQgGgKAEABQADABAFAIQAEAHAAALQAAAKgEAHQgFAGgHABIgCAAQgGAAgBgDg");
	this.shape.setTransform(-32.7654,134.8229);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFF00").s().p("AgpA1QgCgHANgOQANgOgGgLIgEgHIgBgCQgDgHAOgPQANgOgHgKQgGgLAEABIAJAKQAEAJAAANQAAAMgEAIQgGAGgHACIgCABIADAEQAFAJAAANQAAANgFAHQgGAIgIACIgCAAQgHAAgCgGgAAAAyQgCgHANgOQANgPgHgKQgGgKAEABQAEABAFAIQAGAJAAANQAAAMgGAIIgNAJIgDABQgGAAgCgGgAAcADQgCgGANgOQANgOgGgLQgHgLAFABQADABAGAJQAFAJAAANQAAANgFAHQgGAHgIACIgCAAQgHAAgCgGgAg5gCQgDgHAOgPQANgOgHgKQgGgLAFABIAJAKQAFAJAAANQAAAMgFAIIgOAIIgCABQgHAAgCgFg");
	this.shape_1.setTransform(-22.9445,99.4525);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-37.7,93.6,20.6,46.20000000000002);


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

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFF00").s().p("AgiAtQgCgGALgMQALgMgFgJIgEgGIAAgBQgCgHALgLQALgMgFgJQgGgKAEABQADABAEAIQAEAIAAAKQAAAKgEAIQgEAFgHABIgCAAIACAEQAFAIAAAKQAAALgFAHIgLAIIgDAAQgFAAgBgFgAAAArQgBgHAKgMQALgLgFgJQgGgJAEABIAIAIQAEAHAAALQAAAKgEAHQgFAHgHABIgCAAQgGAAgBgEgAAYADQgCgGAMgLQALgMgGgJQgFgKADACQAEAAAEAIQAFAIAAAKQAAALgFAGQgEAGgHACIgCAAQgGAAgCgFgAgwgBQgCgHALgLQALgMgFgJQgFgKADABQADABAFAIQAEAIAAAKQAAAKgEAIQgFAFgHABIgDAAQgFAAgBgDg");
	this.shape.setTransform(-4.059,15.9852);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFF00").s().p("AgpA2QgCgIANgOQANgOgGgLIgDgHIgCgCQgDgHAOgOQANgPgHgKQgGgLAEABIAJAKQAFAJAAANQAAAMgFAIQgFAGgIACIgCABIADAEQAFAJAAANQAAANgFAIQgGAHgIACIgDAAQgGAAgCgFgAAAAyQgCgHANgOQANgOgGgLQgHgKAFABIAJAJQAFAJAAANQAAANgFAHQgGAIgIABIgDAAQgHAAgBgFgAAdADQgDgGAOgOQANgOgHgLQgGgLAEACIAJAJQAFAJAAANQAAANgFAHQgGAHgHACIgDAAQgHAAgBgGgAg5gCQgCgHANgOQANgPgGgKQgHgLAFABIAJAKQAFAJAAANQAAAMgFAIIgOAIIgCAAQgHAAgCgEg");
	this.shape_1.setTransform(5.7805,-13.1199);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9,-19,20.6,40);


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

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFF00").s().p("AgiAtQgCgHALgLQALgMgFgJIgEgGIAAgCQgCgGALgMQALgLgFgKQgGgJAEABIAHAIQAEAIAAALQAAAKgEAHQgEAGgHABIgCAAIACAEQAFAIAAAKQAAALgFAHQgEAGgHABIgDABQgFAAgBgFgAAAAqQgBgGAKgMQALgMgFgJQgGgIAEABIAIAHQAEAIAAALQAAAKgEAHQgFAHgHABIgDAAQgFAAgBgFgAAYADQgCgGAMgMQALgLgGgJQgFgKADABIAIAJQAFAHAAALQAAAKgFAHQgEAGgHABIgDABQgFAAgCgFgAgwgCQgCgGALgMQALgLgFgKQgFgJADABQADABAFAHQAEAIAAALQAAAKgEAHQgFAGgHABIgCABQgGAAgBgFg");
	this.shape.setTransform(-4.059,-22.9452);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFF00").s().p("AgpA2QgCgHANgPQANgOgGgKIgDgIIgCgCQgDgHAOgOQANgPgHgKQgGgLAEABIAJAKQAFAJAAANQAAAMgFAIQgFAGgIACIgCABIADAFQAFAJAAANQAAAMgFAIQgGAHgIACIgDAAQgGAAgCgFgAAAAyQgCgHANgOQANgOgGgLQgHgKAFACIAJAIQAFAJAAANQAAANgFAIQgGAHgIACIgCAAQgIAAgBgGgAAdAEQgDgHAOgOQANgOgHgLQgGgLAEACIAJAJQAFAKAAANQAAAMgFAHQgGAHgHACIgDAAQgHAAgBgFgAg5gCQgCgHANgOQANgPgGgKQgHgLAFABIAJAKQAFAJAAANQAAAMgFAIIgOAIIgDAAQgGAAgCgEg");
	this.shape_1.setTransform(5.7805,-52.0699);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9,-57.9,20.6,40);


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

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFF00").s().p("AgjAtQgCgGALgMQALgMgFgJIgDgGIgBgBQgCgHALgLQALgMgFgJQgFgKADABIAIAJQAEAIAAAKQAAALgEAHQgEAFgIABIgCAAIADAEQAFAIAAALQAAAKgFAHQgFAHgHABIgCAAQgFAAgCgFgAAAArQgCgHAKgLQALgMgFgJQgFgJADABQAEABAEAHQAFAIAAAKQAAAKgFAHIgMAIIgCAAQgFAAgBgEgAAYADQgCgFALgMQALgMgFgJQgFgKADACIAIAIQAEAIAAAKQAAALgEAGIgMAIIgCAAQgFAAgCgFgAgwgBQgCgHALgLQALgMgFgJQgGgKAEABIAHAJIAFASQAAALgFAHIgLAGIgDAAQgEAAgCgDg");
	this.shape.setTransform(41.0096,0.6852);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFF00").s().p("AgpA2QgDgIAOgOQANgOgGgLIgEgHIgCgCQgCgHANgOQANgPgGgKQgHgLAFABIAJAKQAEAJAAANQAAAMgEAIQgGAGgIACIgCABIAEAEQAFAKAAANQAAAMgFAIQgGAHgIACIgDAAQgGAAgCgFgAAAAyQgCgHANgOQANgOgHgLQgGgKAEABIAJAJQAGAJAAANQAAANgGAHQgGAIgHACIgCAAQgHAAgCgGgAAcAEQgCgHANgOQANgOgGgLQgHgLAFACQADAAAGAJQAFAKAAANQAAAMgFAHIgOAJIgDAAQgGAAgCgFgAg5gCQgDgHAOgOQANgPgHgKQgGgLAEABIAJAKQAGAJAAANQAAAMgGAIQgFAGgIACIgDAAQgGAAgCgEg");
	this.shape_1.setTransform(50.8555,-28.4199);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(36.1,-34.3,20.6,40);


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

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFF00").s().p("AgjAtQgCgHALgLQALgMgFgJIgDgGIgBgCQgCgGALgMQALgLgFgKQgFgJADABIAIAIQAEAIAAALQAAAKgEAHIgMAHIgCAAIADAEQAFAIAAAKQAAALgFAHQgFAGgHABIgCABQgFAAgCgFgAAAAqQgCgGAKgMQALgMgFgJQgFgIADABIAIAHQAFAIAAALQAAAKgFAHQgEAHgIABIgCAAQgFAAgBgFgAAYADQgCgGALgMQALgLgFgJQgFgKADABQADABAFAIQAEAHAAALQAAAKgEAHIgMAHIgCABQgFAAgCgFgAgwgCQgCgGALgMQALgLgFgKQgGgJAEABIAHAIQAFAIAAALQAAAKgFAHIgLAHIgCABQgFAAgCgFg");
	this.shape.setTransform(41.0096,67.9048);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFF00").s().p("AgpA2QgDgHAOgPQANgOgGgKIgEgIIgCgCQgCgHANgOQANgPgGgKQgHgLAFABIAJAKQAEAJAAANQAAAMgEAIQgGAGgIACIgCABIAEAFQAFAJAAANQAAAMgFAIIgOAJIgDAAQgGAAgCgFgAAAAyQgCgHANgOQANgOgHgLQgGgKAEACQADAAAGAIQAGAJAAANQAAANgGAIIgNAJIgCAAQgHAAgCgGgAAcAEQgCgHANgOQANgOgGgLQgHgLAFACQADAAAGAJQAFAKAAANQAAAMgFAHIgOAJIgDAAQgGAAgCgFgAg5gCQgDgHAOgOQANgPgHgKQgGgLAEABIAJAKQAGAJAAANQAAAMgGAIIgNAIIgDAAQgGAAgCgEg");
	this.shape_1.setTransform(50.8555,38.7801);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(36.1,32.9,20.6,40.00000000000001);


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
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("ABOinIgPg6ABrgzIgPg6AE9AsIAeA0AEDg7IAdA0ADIijIAdA0ACMkLIAeA0AgIhZIAAg8AgIAeIAAg7AgICWIAAg8Ai+jEIAag2AjyhYIAag2AkmATIAag1AlaB/IAag2AhliXIgPA6AgIEOIAAg8AhHkLIgPA6");
	this.shape.setTransform(-0.9337,25.5501);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-36.6,-2.2,71.4,55.800000000000004);


(lib.shape42 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFFF00").s().p("AgjAtQgCgGALgMQALgMgFgJIgDgGIgBgBQgCgHALgMQALgLgFgJQgFgKADABQADABAFAIQAEAHAAALQAAAKgEAHQgFAGgHABIgCAAIADAEQAFAIAAAKQAAALgFAHQgFAGgHACIgCAAQgFAAgCgFgAAAAqQgCgGAKgMQALgLgFgKQgFgIADABIAIAHQAFAIAAALQAAAKgFAHQgEAHgIABIgBAAQgGAAgBgFgAAYADQgCgGALgLQALgMgFgJQgFgKADABIAIAJQAEAIAAAKQAAAKgEAHQgFAGgHABIgCABQgFAAgCgFgAgwgBQgCgHALgMQALgLgGgJQgFgKAEABIAHAJQAFAHAAALQAAAKgFAHQgEAGgHABIgCAAQgGAAgBgDg");
	this.shape.setTransform(15.1596,140.9729);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFF00").s().p("AgpA1QgDgHAOgOQANgOgGgLIgEgHIgCgCQgCgHANgPQANgOgGgKQgHgLAFABIAJAKQAEAJAAANQAAAMgEAIQgGAGgIACIgCABIAEAEQAFAJAAANQAAANgFAHQgGAIgIACIgCAAQgHAAgCgGgAAAAyQgCgHANgOQANgPgHgKQgGgKAEABIAJAJQAFAJAAANQAAAMgFAIIgNAJIgDABQgGAAgCgGgAAcADQgCgGANgOQANgOgGgLQgHgLAFABQADABAGAJQAFAJAAANQAAANgFAHQgGAHgIABIgDABQgGAAgCgGgAg5gCQgDgHAOgPQANgOgHgKQgGgLAEABIAJAKQAGAJAAANQAAAMgGAIIgNAIIgDAAQgGAAgCgEg");
	this.shape_1.setTransform(25.0055,111.8525);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(10.2,106,20.7,40);


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

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFF00").s().p("AgjAtQgCgGALgMQALgMgFgJIgDgGIgBgBQgCgHALgLQALgMgFgJQgFgKADABQAEABAEAIQAEAIAAAKQAAAKgEAIQgEAFgIABIgCAAIADAEQAFAIAAALQAAAKgFAHQgFAHgHABIgCAAQgFAAgCgFgAAAArQgCgHAKgLQALgMgFgJQgFgJADABQAEABAEAHQAFAIAAAKQAAAKgFAHQgEAHgIABIgCAAQgFAAgBgEgAAYADQgCgFALgMQALgMgFgJQgFgKADACQADAAAFAIQAEAIAAAKQAAALgEAGQgFAGgHACIgCAAQgFAAgCgFgAgwgBQgCgHALgLQALgMgFgJQgGgKAEABQADABAEAIQAFAIAAAKQAAAKgFAIQgEAFgHABIgDAAQgEAAgCgDg");
	this.shape.setTransform(-8.8404,59.1852);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_3
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFF00").s().p("AgpA2QgDgIAOgOQANgOgGgLIgEgHIgCgCQgCgHANgOQANgPgGgKQgHgLAFABQADABAGAJQAEAJAAANQAAAMgEAIQgGAGgIACIgCABIAEAEQAFAKAAANQAAAMgFAIIgOAJIgDAAQgGAAgCgFgAAAAyQgCgHANgOQANgOgHgLQgGgKAEABIAJAJQAFAJAAANQAAANgFAHQgGAIgHACIgCAAQgHAAgCgGgAAcAEQgCgHANgOQANgOgGgLQgHgLAFACQADAAAGAJQAFAJAAANQAAANgFAHIgOAJIgDAAQgGAAgCgFgAg5gCQgDgHAOgOQANgPgHgKQgGgLAEABQAEABAFAJQAGAJAAANQAAAMgGAIIgNAIIgDAAQgGAAgCgEg");
	this.shape_1.setTransform(1.0055,30.0801);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFF00").s().p("AgjAtQgCgGALgMQAMgMgGgJIgDgGIgBgBQgCgHAMgMQALgLgGgJQgFgKADABQAEABAEAIQAEAHAAALQAAAKgEAHQgEAGgHABIgCAAIACAEQAFAIAAAKQAAALgFAHQgEAGgIACIgCAAQgFAAgCgFgAAAAqQgBgGAKgMQALgLgGgKQgFgIADABIAIAHQAFAIAAALQAAAKgFAHQgEAHgHABIgDAAQgFAAgBgFgAAYADQgCgGALgLQALgMgFgJQgFgKADABIAIAJQAFAIAAAKQAAAKgFAHQgFAGgHABIgCABQgFAAgCgFgAgwgBQgCgHALgMQALgLgFgJQgGgKAEABQADABAFAIQAEAHAAALQAAAKgEAHQgFAGgHABIgCAAQgGAAgBgDg");
	this.shape_2.setTransform(-32.7654,134.8229);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFF00").s().p("AgpA1QgCgHANgOQANgOgGgLIgEgHIgBgCQgDgHAOgPQANgOgHgKQgGgLAEABIAJAKQAEAJAAANQAAAMgEAIQgGAGgHACIgCABIADAEQAFAJAAANQAAANgFAHQgGAIgIACIgCAAQgHAAgCgGgAAAAyQgCgHANgOQANgPgHgKQgGgKAEABQAEABAFAIQAGAJAAANQAAAMgGAIIgNAJIgDABQgGAAgCgGgAAcADQgCgGANgOQANgOgGgLQgHgLAFABQADABAGAJQAFAJAAANQAAANgFAHQgGAHgIACIgCAAQgHAAgCgGgAg5gCQgDgHAOgPQANgOgHgKQgGgLAFABIAJAKQAFAJAAANQAAAMgFAIIgOAIIgCABQgHAAgCgFg");
	this.shape_3.setTransform(-22.9445,99.4525);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-37.7,24.2,44.6,115.60000000000001);


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
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("ABNkLIAeA0AAtgzIgPg6AD/AsIAeA0ADFg7IAdA0ACJijIAeA0AiAjEIAag2AgMj7IgPA6AgIhZIAAg8AgIAeIAAg7AgICWIAAg8AgIEOIAAg8Ai0hYIAag2AjoATIAag1AkcB/IAag2AgqiHIgQA6AAQinIgPg6");
	this.shape.setTransform(-0.9337,19.3001);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-30.4,-8.5,59,55.9);


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

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFF00").s().p("AgiAtQgCgGALgMQALgMgFgJIgEgGIAAgBQgCgHALgLQALgMgFgJQgGgKAEABQADABAEAIQAEAIAAAKQAAAKgEAIQgEAFgHABIgCAAIACAEQAFAIAAAKQAAALgFAHIgLAIIgDAAQgFAAgBgFgAAAArQgBgHAKgMQALgLgFgJQgGgJAEABIAIAIQAEAHAAALQAAAKgEAHQgFAHgHABIgCAAQgGAAgBgEgAAYADQgCgGAMgLQALgMgGgJQgFgKADACQAEAAAEAIQAFAIAAAKQAAALgFAGQgEAGgHACIgCAAQgGAAgCgFgAgwgBQgCgHALgLQALgMgFgJQgFgKADABQADABAFAIQAEAIAAAKQAAAKgEAIQgFAFgHABIgDAAQgFAAgBgDg");
	this.shape.setTransform(-4.059,15.9852);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_3
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFF00").s().p("AgpA2QgCgIANgOQANgOgGgLIgDgHIgCgCQgDgHAOgOQANgPgHgKQgGgLAEABIAJAKQAFAJAAANQAAAMgFAIQgFAGgIACIgCABIADAEQAFAJAAANQAAANgFAIQgGAHgIACIgDAAQgGAAgCgFgAAAAyQgCgHANgOQANgOgGgLQgHgKAFABIAJAJQAFAJAAANQAAANgFAHQgGAIgIABIgDAAQgHAAgBgFgAAdADQgDgGAOgOQANgOgHgLQgGgLAEACIAJAJQAFAJAAANQAAANgFAHQgGAHgHACIgDAAQgHAAgBgGgAg5gCQgCgHANgOQANgPgGgKQgHgLAFABIAJAKQAFAJAAANQAAAMgFAIIgOAIIgCAAQgHAAgCgEg");
	this.shape_1.setTransform(5.7805,-13.1199);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFF00").s().p("AgjAtQgCgGALgMQALgMgFgJIgDgGIgBgBQgCgHALgLQALgMgFgJQgFgKADABQAEABAEAIQAEAIAAAKQAAAKgEAIQgEAFgIABIgCAAIADAEQAFAIAAAKQAAALgFAHQgEAGgIACIgCAAQgFAAgCgFgAAAArQgCgHAKgMQAMgLgGgJQgFgJADABQAEABAEAHQAFAHAAALQAAAKgFAHQgEAHgIABIgCAAQgFAAgBgEgAAYADQgCgGALgLQALgMgFgJQgFgKADACQADAAAFAIQAEAIAAAKQAAALgEAGIgMAIIgBAAQgGAAgCgFgAgwgBQgCgHALgLQALgMgFgJQgGgKAEABQADABAEAIQAFAIAAAKQAAAKgFAIQgEAFgHABIgDAAQgEAAgCgDg");
	this.shape_2.setTransform(-27.9904,76.4852);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFF00").s().p("AgpA1QgDgHAOgOQANgOgGgLIgEgHIgCgCQgCgHANgPQANgOgGgKQgHgLAFABQADABAGAJQAEAJAAANQAAAMgEAIIgOAIIgBABIADAEQAFAJAAANQAAANgFAIQgGAHgIACIgCAAQgHAAgCgGgAAAAyQgCgHANgOQANgPgHgKQgGgKAEABQAEABAFAIQAGAJAAANQAAANgGAHIgNAJIgDABQgGAAgCgGgAAcADQgCgGANgOQANgOgGgLQgHgLAFACQADAAAGAJQAFAJAAANQAAANgFAHIgOAJIgCAAQgHAAgCgGgAg5gCQgDgHAOgPQANgOgHgKQgGgLAEABQAEABAGAJQAFAJAAANQAAAMgFAIQgGAGgIACIgCAAQgHAAgCgEg");
	this.shape_3.setTransform(-18.1445,47.3727);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-32.9,-19,44.5,100.5);


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

	// Layer_5
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFF00").s().p("AgKATQgCgFAKgLQAJgKgFgIQgEgJADABQACABAFAHQAEAHAAAJQAAAJgEAGIgKAHIgCABQgFAAgBgFg");
	this.shape.setTransform(-29.966,105.0531);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_4
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFF00").s().p("AgKATQgCgFAKgLQAJgKgFgIQgEgJADABIAHAIQAEAHAAAJQAAAJgEAGQgFAGgFABIgCABQgFAAgBgFg");
	this.shape_1.setTransform(-34.416,104.5531);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_3
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFF00").s().p("AgKATQgCgFAKgLQAJgKgFgIQgEgJADABIAHAIQAEAHAAAJQAAAJgEAGQgFAGgFABIgCABQgFAAgBgFg");
	this.shape_2.setTransform(-32.166,108.6531);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_2
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFF00").s().p("AgKATQgCgFAKgLQAJgKgFgIQgEgJADABIAHAIQAEAHAAAJQAAAJgEAGIgKAHIgCABQgFAAgBgFg");
	this.shape_3.setTransform(-36.616,104.5531);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	// Layer_1
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFF00").s().p("AgKATQgCgFAKgLQAJgKgFgIQgEgJADABIAHAIQAEAHAAAJQAAAJgEAGIgKAHIgCABQgFAAgBgFg");
	this.shape_4.setTransform(-35.366,108.9031);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-37.8,102.2,8.999999999999996,9.099999999999994);


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
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("ABAhMIgUgjAAegbIAGAWAAGh9IAKAnACjBhIgUgjADVC4IgUgjAByAKIgUgiAgoivIAUgjIADgMIAKAnAgUjSIgHAbAgRihIAAgoAh+AEIARgjAhEgcIgGAXAgRg9IAAgoAgqh9IgKAnAhThVIARgkAipBeIARgkAjUC4IARgkAgRCKIAAgoAgRDuIAAgoAgRAmIAAgnAAPijIgTgj");
	this.shape.setTransform(-0.034,-0.7251);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-22.3,-24.5,44.6,48.6);


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

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFF00").s().p("AgiAtQgCgHALgLQALgMgFgJIgEgGIAAgCQgCgGALgMQALgLgFgKQgGgJAEABIAHAIQAEAIAAALQAAAKgEAHQgEAGgHABIgCAAIACAEQAFAIAAAKQAAALgFAHQgEAGgHABIgDABQgFAAgBgFgAAAAqQgBgGAKgMQALgMgFgJQgGgIAEABIAIAHQAEAIAAALQAAAKgEAHQgFAHgHABIgDAAQgFAAgBgFgAAYADQgCgGAMgMQALgLgGgJQgFgKADABIAIAJQAFAHAAALQAAAKgFAHQgEAGgHABIgDABQgFAAgCgFgAgwgCQgCgGALgMQALgLgFgKQgFgJADABQADABAFAHQAEAIAAALQAAAKgEAHQgFAGgHABIgCABQgGAAgBgFg");
	this.shape.setTransform(-4.059,-22.9452);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_3
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFF00").s().p("AgpA2QgCgHANgPQANgOgGgKIgDgIIgCgCQgDgHAOgOQANgPgHgKQgGgLAEABIAJAKQAFAJAAANQAAAMgFAIQgFAGgIACIgCABIADAFQAFAJAAANQAAAMgFAIQgGAHgIACIgDAAQgGAAgCgFgAAAAyQgCgHANgOQANgOgGgLQgHgKAFACIAJAIQAFAJAAANQAAANgFAIQgGAHgIACIgCAAQgIAAgBgGgAAdAEQgDgHAOgOQANgOgHgLQgGgLAEACIAJAJQAFAKAAANQAAAMgFAHQgGAHgHACIgDAAQgHAAgBgFgAg5gCQgCgHANgOQANgPgGgKQgHgLAFABIAJAKQAFAJAAANQAAAMgFAIIgOAIIgDAAQgGAAgCgEg");
	this.shape_1.setTransform(5.7805,-52.0699);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFF00").s().p("AgjAtQgCgHALgLQALgMgFgJIgDgGIgBgCQgCgGALgMQALgLgFgKQgFgJADABQADABAFAHQAEAIAAALQAAAKgEAHIgMAHIgCAAIADAEQAFAIAAAKQAAALgFAHQgFAGgHABIgCABQgFAAgCgFgAAAAqQgCgGAKgMQALgMgFgJQgFgIADABQAEABAEAGQAFAIAAALQAAAKgFAHQgEAHgIABIgCAAQgFAAgBgFgAAYADQgCgGALgMQALgLgFgJQgFgKADABQADABAFAIQAEAHAAALQAAAKgEAHIgMAHIgCABQgFAAgCgFgAgwgCQgCgGALgMQALgLgGgKQgFgJAEABQADABAEAHQAFAIAAALQAAAKgFAHQgEAGgHABIgCABQgGAAgBgFg");
	this.shape_2.setTransform(-23.1904,18.9048);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFF00").s().p("AgpA2QgDgHAOgPQANgOgGgKIgEgIIgCgCQgCgHANgOQANgPgGgKQgHgLAFABQADABAGAJQAEAJAAANQAAAMgEAIQgGAGgIACIgCABIAEAFQAFAJAAANQAAAMgFAIQgGAHgIACIgDAAQgGAAgCgFgAAAAyQgCgHANgOQANgOgHgLQgGgKAEACIAJAIQAFAJAAANQAAANgFAIQgGAHgHACIgCAAQgHAAgCgGgAAcAEQgCgGANgPQANgOgGgKQgHgMAFACQADAAAGAKQAFAJAAANQAAAMgFAHQgGAHgIACIgDAAQgGAAgCgFgAg5gCQgDgHAOgOQANgPgHgKQgGgLAEABQAEABAFAJQAGAJAAANQAAAMgGAIQgFAGgIACIgDAAQgGAAgCgEg");
	this.shape_3.setTransform(-13.3445,-10.2196);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-28.1,-57.9,39.7,81.8);


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

	// Layer_10
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFF00").s().p("AgKATQgCgFAKgLQAJgKgFgIQgEgJADABIAHAIQAEAHAAAJQAAAJgEAGQgFAGgFABIgCABQgFAAgBgFg");
	this.shape.setTransform(-16.366,60.6531);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_9
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFF00").s().p("AgKATQgCgFAKgLQAJgKgFgIQgEgJADABQACABAFAHQAEAHAAAJQAAAJgEAGIgKAHIgCABQgFAAgBgFg");
	this.shape_1.setTransform(-20.816,60.1531);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_8
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFF00").s().p("AgKATQgCgFAKgLQAJgKgFgIQgEgJADABIAHAIQAEAHAAAJQAAAJgEAGIgKAHIgCABQgFAAgBgFg");
	this.shape_2.setTransform(-18.566,64.2531);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_7
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFF00").s().p("AgKATQgCgFAKgLQAJgKgFgIQgEgJADABIAHAIQAEAHAAAJQAAAJgEAGQgFAGgFABIgCABQgFAAgBgFg");
	this.shape_3.setTransform(-23.016,60.1531);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	// Layer_6
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFF00").s().p("AgKATQgCgFAKgLQAJgKgFgIQgEgJADABIAHAIQAEAHAAAJQAAAJgEAGQgFAGgFABIgCABQgFAAgBgFg");
	this.shape_4.setTransform(-21.766,64.5031);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	// Layer_5
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFF00").s().p("AgKATQgCgFAKgLQAJgKgFgIQgEgJADABIAHAIQAEAHAAAJQAAAJgEAGIgKAHIgCABQgFAAgBgFg");
	this.shape_5.setTransform(-11.666,32.3031);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(1));

	// Layer_4
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFF00").s().p("AgKATQgCgFAKgLQAJgKgFgIQgEgJADABIAHAIQAEAHAAAJQAAAJgEAGQgFAGgFABIgCABQgFAAgBgFg");
	this.shape_6.setTransform(-16.116,31.8031);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(1));

	// Layer_3
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFF00").s().p("AgKATQgCgFAKgLQAJgKgFgIQgEgJADABIAHAIQAEAHAAAJQAAAJgEAGQgFAGgFABIgCABQgFAAgBgFg");
	this.shape_7.setTransform(-13.866,35.9031);

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(1));

	// Layer_2
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFF00").s().p("AgKATQgCgFAKgLQAJgKgFgIQgEgJADABIAHAIQAEAHAAAJQAAAJgEAGIgKAHIgCABQgFAAgBgFg");
	this.shape_8.setTransform(-18.316,31.8031);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(1));

	// Layer_1
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFF00").s().p("AgKATQgCgFAKgLQAJgKgFgIQgEgJADABIAHAIQAEAHAAAJQAAAJgEAGIgKAHIgCABQgFAAgBgFg");
	this.shape_9.setTransform(-17.066,36.1531);

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-24.2,29.5,13.7,37.400000000000006);


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

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFF00").s().p("AgiAtQgCgHALgLQALgMgFgJIgEgGIAAgBQgCgHALgMQALgLgFgJQgGgKAEABIAHAJQAEAHAAALQAAAKgEAHQgEAGgHABIgCAAIACAEQAFAIAAAKQAAALgFAHQgEAGgHACIgCAAQgGAAgBgFgAAAAqQgBgGAKgMQALgMgFgJQgGgIAEABIAHAHQAFAIAAALQAAAKgFAHQgEAHgHABIgDAAQgFAAgBgFgAAYADQgCgGALgLQAMgMgGgJQgFgKADABIAIAJQAFAIAAAKQAAAKgFAHQgEAGgIABIgCABQgFAAgCgFgAgwgBQgCgHALgMQALgLgFgJQgFgKADABQADABAFAIQAEAHAAALQAAAKgEAHQgFAGgHABIgCAAQgGAAgBgDg");
	this.shape.setTransform(-18.4148,-29.0776);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFF00").s().p("AgpA2QgCgHANgPQANgOgGgKIgDgIIgCgCQgDgHAOgOQANgPgHgKQgGgLAEABIAJAKQAFAJAAANQAAAMgFAIQgFAGgIACIgCABIADAFQAFAJAAANQAAAMgFAIQgGAHgIACIgDAAQgGAAgCgFgAAAAyQgCgHANgOQANgOgGgLQgHgKAFACIAJAIQAFAJAAANQAAANgFAIQgGAHgIACIgCAAQgIAAgBgGgAAdAEQgDgGAOgPQANgOgHgKQgGgMAEACIAJAKQAFAJAAANQAAAMgFAHQgGAHgHACIgDAAQgHAAgBgFgAg5gCQgCgHANgOQANgPgGgKQgHgLAFABIAJAKQAFAJAAANQAAAMgFAIQgGAGgIACIgDAAQgGAAgCgEg");
	this.shape_1.setTransform(-8.5695,-58.2196);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-23.4,-64.1,20.7,39.99999999999999);


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

	// Layer_10
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFF00").s().p("AgKATQgCgFAKgLQAJgKgFgIQgEgJADABIAHAIQAEAHAAAJQAAAJgEAGIgKAHIgCABQgFAAgBgFg");
	this.shape.setTransform(-10.166,17.2531);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_9
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFF00").s().p("AgKATQgCgFAKgLQAJgKgFgIQgEgJADABIAHAIQAEAHAAAJQAAAJgEAGQgFAGgFABIgCABQgFAAgBgFg");
	this.shape_1.setTransform(-14.616,16.7531);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_8
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFF00").s().p("AgKATQgCgFAKgLQAJgKgFgIQgEgJADABIAHAIQAEAHAAAJQAAAJgEAGQgFAGgFABIgCABQgFAAgBgFg");
	this.shape_2.setTransform(-12.366,20.8531);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_7
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFF00").s().p("AgKATQgCgFAKgLQAJgKgFgIQgEgJADABIAHAIQAEAHAAAJQAAAJgEAGIgKAHIgCABQgFAAgBgFg");
	this.shape_3.setTransform(-16.816,16.7531);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	// Layer_6
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFF00").s().p("AgKATQgCgFAKgLQAJgKgFgIQgEgJADABIAHAIQAEAHAAAJQAAAJgEAGIgKAHIgCABQgFAAgBgFg");
	this.shape_4.setTransform(-15.566,21.1031);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	// Layer_5
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFF00").s().p("AgKATQgCgFAKgLQAJgKgFgIQgEgJADABIAHAIQAEAHAAAJQAAAJgEAGIgKAHIgCABQgFAAgBgFg");
	this.shape_5.setTransform(-11.666,41.6031);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(1));

	// Layer_4
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFF00").s().p("AgKATQgCgFAKgLQAJgKgFgIQgEgJADABIAHAIQAEAHAAAJQAAAJgEAGQgFAGgFABIgCABQgFAAgBgFg");
	this.shape_6.setTransform(-16.116,41.1031);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(1));

	// Layer_3
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFF00").s().p("AgKATQgCgFAKgLQAJgKgFgIQgEgJADABIAHAIQAEAHAAAJQAAAJgEAGQgFAGgFABIgCABQgFAAgBgFg");
	this.shape_7.setTransform(-13.866,45.2031);

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(1));

	// Layer_2
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFF00").s().p("AgKATQgCgFAKgLQAJgKgFgIQgEgJADABIAHAIQAEAHAAAJQAAAJgEAGIgKAHIgCABQgFAAgBgFg");
	this.shape_8.setTransform(-18.316,41.1031);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(1));

	// Layer_1
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFF00").s().p("AgKATQgCgFAKgLQAJgKgFgIQgEgJADABIAHAIQAEAHAAAJQAAAJgEAGIgKAHIgCABQgFAAgBgFg");
	this.shape_9.setTransform(-17.066,45.4531);

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.5,14.4,10.5,33.4);


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

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgaAZQgKgKAAgPQAAgOAKgMQALgKAPAAQAQAAAKAKQALAMAAAOQAAAPgLAKQgKAMgQAAQgPAAgLgMg");
	this.shape.setTransform(-1019.65,203.65);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgaAZQgKgKAAgPQAAgOAKgMQALgKAPAAQAQAAAKAKQALAMAAAOQAAAPgLAKQgKAMgQAAQgPAAgLgMg");
	this.shape_1.setTransform(-1019.65,103.4);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgaAaQgKgLAAgPQAAgOAKgLQALgLAPAAQAQAAAKALQALALAAAOQAAAPgLALQgKALgQAAQgPAAgLgLg");
	this.shape_2.setTransform(-1019.65,10.55);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1023.3,6.9,7.399999999999977,200.5);


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
	this.shape.graphics.f("rgba(51,51,51,0.58)").s().p("AkfC+IgCAAQhpAKgMhfIgCgDQhRhwBnhxIAEgFQCVjUECCkQDfhLBFCKQBkAMAbBYQAKCdjUAAQAUCAk2gxIgFACQg3AXgwAAQhLAAg4g6g");
	this.shape.setTransform(0.0317,0.0372);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-44.4,-24.8,88.9,49.7);


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
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("ABmiVIhmFJIhkgqIBrk9g");
	this.shape.setTransform(-0.7002,-6.0761);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#804000").s().p("AhlCKIBrk9IBfAeIhlFJg");
	this.shape_1.setTransform(-0.7,-6.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-11.8,-25.1,22.3,38);


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

	// Layer_6
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFF00").s().p("AgaAjQgCgFAJgJQAIgJgEgHIgCgFIgBgBQgBgFAIgJQAJgJgEgHQgEgHACABIAGAGQADAGAAAIQAAAIgDAGIgJAFIgBAAIACADQADAGAAAIIgDANIgJAGIgCAAQgEAAgBgDgAAAAhQgBgFAIgJQAIgJgEgHQgEgHADABQACABAEAFQADAGAAAIIgDANIgJAGIgCAAQgEAAgBgDgAATACQgCgEAJgJQAIgJgEgHQgEgHADABIAGAGQADAGAAAIQAAAIgDAFQgEAFgFABIgCAAQgEAAgBgEgAglgBQgBgFAIgJQAJgJgEgHQgEgHACABIAGAGQAEAGAAAIQAAAIgEAGIgJAFIgCAAQgEAAgBgDg");
	this.shape.setTransform(62.1888,107.2782);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_5
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFF00").s().p("AgKATQgCgFAKgLQAJgKgFgIQgEgJADABIAHAIQAEAHAAAJQAAAJgEAGIgKAHIgCABQgFAAgBgFg");
	this.shape_1.setTransform(73.084,83.2031);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_4
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFF00").s().p("AgKATQgCgFAKgLQAJgKgFgIQgEgJADABIAHAIQAEAHAAAJQAAAJgEAGIgKAHIgCABQgFAAgBgFg");
	this.shape_2.setTransform(68.634,82.7031);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_3
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFF00").s().p("AgKATQgCgFAKgLQAJgKgFgIQgEgJADABIAHAIQAEAHAAAJQAAAJgEAGIgKAHIgCABQgFAAgBgFg");
	this.shape_3.setTransform(70.884,86.8031);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	// Layer_2
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFF00").s().p("AgKATQgCgFAKgLQAJgKgFgIQgEgJADABIAHAIQAEAHAAAJQAAAJgEAGIgKAHIgCABQgFAAgBgFg");
	this.shape_4.setTransform(66.434,82.7031);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	// Layer_1
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFF00").s().p("AgKATQgCgFAKgLQAJgKgFgIQgEgJADABIAHAIQAEAHAAAJQAAAJgEAGIgKAHIgCABQgFAAgBgFg");
	this.shape_5.setTransform(67.684,87.0531);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(58.4,80.4,15.899999999999999,30.69999999999999);


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
	this.shape.graphics.f("#A9A801").s().p("AnTDNIjSkTIAAiGIFKAAIAAA3IBkAAIAAg3IHoAAIAAA3IBkAAIAAg3IFRAAIAAB/IkQEag");
	this.shape.setTransform(21.95,137.35);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#804000").s().p("AtoW+IAAzHIHk4cIAAh2IBdAAIAAggIBHAAIADgCIAAACIHYAAIAAAcIBagBIAAA6IAJAAIAAAoICpIPIFiQxIAAS8g");
	this.shape_1.setTransform(23.175,-33.625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-64.1,-180.6,174.6,338.5);


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

	// Layer_10
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFF00").s().p("AgKATQgCgFAKgLQAJgKgFgIQgEgJADABIAHAIQAEAHAAAJQAAAJgEAGIgKAHIgCABQgFAAgBgFg");
	this.shape.setTransform(-10.166,17.2531);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_9
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFF00").s().p("AgKATQgCgFAKgLQAJgKgFgIQgEgJADABIAHAIQAEAHAAAJQAAAJgEAGQgFAGgFABIgCABQgFAAgBgFg");
	this.shape_1.setTransform(-14.616,16.7531);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_8
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFF00").s().p("AgKATQgCgFAKgLQAJgKgFgIQgEgJADABIAHAIQAEAHAAAJQAAAJgEAGQgFAGgFABIgCABQgFAAgBgFg");
	this.shape_2.setTransform(-12.366,20.8531);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_7
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFF00").s().p("AgKATQgCgFAKgLQAJgKgFgIQgEgJADABIAHAIQAEAHAAAJQAAAJgEAGIgKAHIgCABQgFAAgBgFg");
	this.shape_3.setTransform(-16.816,16.7531);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	// Layer_6
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFF00").s().p("AgKATQgCgFAKgLQAJgKgFgIQgEgJADABIAHAIQAEAHAAAJQAAAJgEAGIgKAHIgCABQgFAAgBgFg");
	this.shape_4.setTransform(-15.566,21.1031);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	// Layer_5
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFF00").s().p("AgKATQgCgFAKgLQAJgKgFgIQgEgJADABIAHAIQAEAHAAAJQAAAJgEAGIgKAHIgCABQgFAAgBgFg");
	this.shape_5.setTransform(-8.966,-1.7969);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(1));

	// Layer_4
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFF00").s().p("AgKATQgCgFAKgLQAJgKgFgIQgEgJADABIAHAIQAEAHAAAJQAAAJgEAGQgFAGgFABIgCABQgFAAgBgFg");
	this.shape_6.setTransform(-13.416,-2.2969);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(1));

	// Layer_3
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFF00").s().p("AgKATQgCgFAKgLQAJgKgFgIQgEgJADABIAHAIQAEAHAAAJQAAAJgEAGQgFAGgFABIgCABQgFAAgBgFg");
	this.shape_7.setTransform(-11.166,1.8031);

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(1));

	// Layer_2
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFF00").s().p("AgKATQgCgFAKgLQAJgKgFgIQgEgJADABIAHAIQAEAHAAAJQAAAJgEAGIgKAHIgCABQgFAAgBgFg");
	this.shape_8.setTransform(-15.616,-2.2969);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(1));

	// Layer_1
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFF00").s().p("AgKATQgCgFAKgLQAJgKgFgIQgEgJADABIAHAIQAEAHAAAJQAAAJgEAGIgKAHIgCABQgFAAgBgFg");
	this.shape_9.setTransform(-14.366,2.0531);

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-18,-4.6,10.2,28.1);


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

	// Layer_6
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFF00").s().p("AgjAtQgBgGALgMQALgMgGgJIgDgGIAAgBQgCgHALgLQALgMgGgJQgFgKAEABIAHAJQAEAIAAAKQAAAKgEAIQgEAFgHABIgCAAIACAEQAFAIAAAKQAAALgFAHQgEAHgHABIgDAAQgFAAgCgFgAAAArQgBgHAKgMQALgLgFgJQgGgJAEABQADABAEAHQAFAHAAALQAAAKgFAHQgEAHgHABIgDAAQgFAAgBgEgAAYADQgCgFALgMQALgMgFgJQgFgKADACQAEAAAEAIQAFAIAAAKQAAALgFAGQgEAGgIACIgCAAQgFAAgCgFgAgwgBQgCgHALgLQALgMgFgJQgFgKADABIAIAJQAEAIAAAKQAAAKgEAIQgFAFgHABIgDAAQgFAAgBgDg");
	this.shape.setTransform(-13.6154,-67.5148);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_5
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFF00").s().p("AgOAZQgCgHAOgOQAMgNgHgLQgFgLADACIAJAJQAFAJAAAMQAAANgFAIIgMAJIgDAAQgHAAgCgGg");
	this.shape_1.setTransform(0.5311,-98.8023);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_4
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFF00").s().p("AgOAZQgCgHANgOQAMgNgGgLQgGgLAEACIAJAJQAFAJAAAMQAAANgFAIQgGAHgHACIgCAAQgHAAgCgGg");
	this.shape_2.setTransform(-5.2195,-99.4523);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_3
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFF00").s().p("AgOAZQgCgHANgOQAMgNgGgLQgGgLAEABIAJAKQAFAJAAAMQAAANgFAHQgGAIgHABIgDABQgGAAgCgGg");
	this.shape_3.setTransform(-2.3195,-94.1401);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	// Layer_2
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFF00").s().p("AgNAZQgDgHAOgOQAMgNgHgLQgFgLADACIAJAJQAFAJAAAMQAAANgFAIQgGAHgGACIgDAAQgHAAgBgGg");
	this.shape_4.setTransform(-8.1015,-99.4523);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	// Layer_1
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFF00").s().p("AgOAZQgCgHANgOQAMgOgGgKQgGgLAEABIAJAKQAFAJAAAMQAAAMgFAIQgGAHgHACIgDABQgGAAgCgGg");
	this.shape_5.setTransform(-6.4695,-93.7949);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-18.6,-102.5,20.700000000000003,40);


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
	this.shape.graphics.f("#804000").s().p("AtoW+IAAzHIHk4cIAAh2IBdAAIAAggIBHAAIADgCIAAACIHYAAIAAAcIBagBIAAA6IAJAAIAAAoICpIPIFiQxIAAS8g");
	this.shape.setTransform(24.025,3.775);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#A9A801").s().p("AnSDOIjSkVIAAiGIFIAAIAAA3IBkAAIAAg3IHqAAIAAA3IBkAAIAAg3IFPAAIAACBIkPEag");
	this.shape_1.setTransform(22.8,174.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-63.2,-143.2,174.5,338.5);


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
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("Aj3jNIhkAAIAAA3IBkAAIAAg3IHoAAAFVjNIFRAAIAACAIkQEbItpAAIjSkUIAAiHIFKAAAFVjNIAAA3IhkAAIAAg3g");
	this.shape.setTransform(-148.35,308.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#A9A801").s().p("AnTDNIjRkUIAAiGIFIAAIAAA4IBlAAIAAg4IHoAAIAAA4IBkAAIAAg4IFQAAIAACBIkPEZg");
	this.shape_1.setTransform(-148.35,308.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#804000").s().p("AD1AcIAAg3IBkAAIAAA3gAlYAcIAAg3IBkAAIAAA3g");
	this.shape_2.setTransform(-148.7,290.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-217.1,287,137.5,43.10000000000002);


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

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("ACCgSIABASQAAA3gmAmQgmAmg3AAQg2AAgmgmQgmgmAAg3IABgRQAFgrAgggQAmgmA2AAQA3AAAmAmQAfAgAGAqg");
	this.shape.setTransform(0.25,95.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AhcBdQgmgmAAg3IACgSQAEgqAgggQAngmA1AAQA3AAAmAmQAfAgAGApIABATQAAA3gmAmQgmAmg3AAQg1AAgngmg");
	this.shape_1.setTransform(0.25,95.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(1,0,0,3).p("AC9g+IiDiqACtCIIhkBfIAAACAA4jmIh3AAIh9CqAhEDpIhehh");
	this.shape_2.setTransform(0.1713,99.549);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(1,0,0,3).p("ACAiTIA7AAIAOAAIAADGIgeAAIlQAAIgjAAIAAjEIAJAAIA9gBIgCATQAAA2AmAmQAnAmA2AAQA2AAAmgmQAmgmAAg2gABGCUIiNAA");
	this.shape_3.setTransform(0.425,108.05);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FF00FF").s().p("AhHDpIhehhIFQAAIhlBfIAAACgACrCIIlQAAIgjAAIAAjEIAJAAIB9iqIB3AAIACgCICECqIg7AAQgGgqgfggQgmglg2gBQg2ABgnAlQgfAhgFAqIg9ABIA9gBIgCATQAAA1AmAmQAnAmA2AAQA2AAAmgmQAmgmAAg1IgBgUIA7AAIAOAAIAADGgAilCIg");
	this.shape_4.setTransform(0.425,99.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	// Layer_1
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#000000").ss(1,0,0,3).p("AA8sZIAAYzIh3AAIAA4zg");
	this.shape_5.setTransform(-0.675,24.225);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#000000").ss(1,0,0,3).p("Aiag7IAAgpIE2AAIAAApIAAAgIAACAIhnAAACcgbIgtABABvg7IAtAAAhBBlIhZAAIAAh8IAAgkIA1AAAiagXIAwAA");
	this.shape_6.setTransform(-0.001,-65.225);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FF00FF").s().p("AhCN+IAA4yIB3AAIAAYygAA1q0Ih3AAIhZAAIABh8IAAgkIAAgqIE2AAIAAAqIgtAAIAtAAIAAAfIgtABIAtgBIAACBgAhqswIgwAAgAhmtUIg0AAgAA1q0gACcs1gACctUg");
	this.shape_7.setTransform(0,14.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20.6,-76.3,42.1,200.2);


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
	this.shape.graphics.f("#A9A801").s().p("AgsA4QgCgIAOgOQAOgPgHgMIgEgHIgBgDQgDgHAOgPQAOgPgGgLQgHgMAEACIAKAKQAFAKAAANQAAANgFAJQgGAHgJABIgCABIAEAFQAFAJAAAOQAAANgFAIQgGAIgJACIgDAAQgGAAgDgGgAAAA0QgCgHANgPQAOgPgHgLQgHgLAFACQAEABAGAIQAFAKAAANQAAANgFAJQgGAIgJABIgDABQgGAAgCgHgAAeADQgDgHAOgOQAOgPgGgMQgHgLAEABIAKALQAGAJAAAOQAAANgGAIQgGAHgJACIgCAAQgHAAgCgGgAg9gDQgCgHAOgPQAOgPgHgLQgHgMAFACIAKAKQAFAKAAANQAAANgFAJQgGAHgJABIgDABQgGAAgDgGg");
	this.shape.setTransform(2.5061,2.4038);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.7,-3.8,12.399999999999999,12.5);


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
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("ABArdIAANKIBeBaIABAfIBfAAIAAGBIhtByIkgAAIhuhmIAAmNIBcAAIAAgkIBUhWIAAtJACcE7QBBBAAABbQAABbhBBBQhABAhbAAQhaAAhBhAQhAhBAAhbQAAhbBAhAQBBhBBaAAQBbAABABBgAihDmIFAAA");
	this.shape.setTransform(0.025,15.125);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AibCbQhAhAAAhbQAAhaBAhAQBBhBBaAAQBbAABBBBQBABAAABaQAABbhABAQhBBBhbAAQhaAAhBhBg");
	this.shape_1.setTransform(0.1,62.15);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FF00FF").s().p("AiPLbIhuhlIAAmOIBcAAIFAAAIBfAAIAAGBIhtBygAiaE9QhABBAABbQAABbBABAQBBBBBaAAQBbAABAhBQBBhAAAhbQAAhbhBhBQhAhAhbAAQhaAAhBBAgACfDogAihDoIAAgkIBUhWIAAtIICNAAIAANJIBeBaIABAfgAihDog");
	this.shape_2.setTransform(0.025,14.875);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-26.4,-59.2,52.9,148.2);


(lib.shape7 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("AAADoQhfAAhEhEQhEhEABhgQgBhfBEhEQBEhEBfABQBggBBEBEQBEBEAABfQAABghEBEQhEBEhgAAg");
	this.shape.setTransform(0.0998,20.9998);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AijCkQhEhEABhgQgBhfBEhEQBEhEBfABQBggBBEBEQBEBEgBBfQABBghEBEQhEBEhgAAQhfAAhEhEg");
	this.shape_1.setTransform(0.0998,20.9998);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(1,0,0,3).p("AEjCDIgBgJIgWjsAkIiCIgYDqIgCAK");
	this.shape_2.setTransform(0.0764,5.6252);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(1,0,0,3).p("AENirQgThEg1g2QhShShzAAQhyAAhSBSQgrArgUA1IgBACIgDAIAkhA5QgDAUABAUQgBB0BWBRQBWBSB4AAQB5AABWhSQBVhRAAh0IAAgW");
	this.shape_3.setTransform(-0.0286,11.275);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FF00FF").s().p("AjOEmQhWhRABh0QgBgUADgUIACgKIAYjqIADgIIABgCQAUg1ArgrQBShSByAAQBzAABSBSQA1A2ATBEIAWDsIABAKIAAAWQAAB0hVBRQhWBSh5AAQh4AAhWhSgAiihCQhEBDABBgQgBBgBEBEQBEBEBfAAQBgAABEhEQBEhEAAhgQAAhghEhDQhEhEhgABIgBAAQheAAhEBDgAkEjWIABARIgBACIgDAIgAEHjXIAAgGIgBgUIADAgg");
	this.shape_4.setTransform(-0.0286,11.275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-30.2,-27.3,60.4,77.2);


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
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("ABngbIA0AeIAAAaIk1AAIgBgaIA5geg");
	this.shape.setTransform(0.0019,25.55);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1,0,0,3).p("AhkEAIBTg2IAAnBQAVgOAXAOIAAHEIBKAz");
	this.shape_1.setTransform(0.2309,-2.9033);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#C0C0C0").s().p("AiaEcIgBgZIA6ggIDIAAIA0AfIABAagAhhDjIBSg2IAAnBQAWgOAWAOIAAHEIBKAzgAhhDjg");
	this.shape_2.setTransform(0,-0.0125);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.5,-29.4,33.1,58.8);


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
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("ACco1IAARpIhlAAIgCxpgAibo1IAARrIBbAAIgCxrg");
	this.shape.setTransform(-0.8,-112.025);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#C0C0C0").s().p("AibI2IAAxrIBZAAIABRrgAA3I0IgCxpIBnAAIAARpg");
	this.shape_1.setTransform(-0.8,-112.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-17.3,-169.6,33.1,115.19999999999999);


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

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("AjIp3IAATsIgfAAIAAzsgADop4IAATxIgfAAIAAzxg");
	this.shape.setTransform(-148.75,55.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF00FF").s().p("ADJJ4IAAzvIAfAAIAATvgAjnJ0IAAzrIAfAAIAATrg");
	this.shape_1.setTransform(-148.75,55.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(1,0,0,3).p("AIHsrIFiQwIAAS9I7RAAIAAzHIHk4cIAAhmIAAgQIBdAAIAAggIBHAAIADgDIAAADICGAAIB3AAICtAAIAuAAIAAAbIBaAAIAAA5IAJAAIAAAog");
	this.shape_2.setTransform(-147.225,137.4714);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(1,0,0,3).p("EACbgmuIAAiHIBFAAIAAjJIB9AAIAABUIDMAAQC8AcAIEpIAAL+IAVAAIAAAkIATAAIAACUIAZAAIAAE1EACbgmuIBWAAEAEIgkaIAAjwQAWgPAXAPIAAESIApAgIBCAAIAAjSIgnAAIgsAAEAFdgqIIAABHQARgBALAjIAAB1EALJghuIAAi1QAKlBi+gkIi4AAEAFdgqqIAAAiEgMIgiSQhBhaAAh1QAAiVBphqQBqhpCVAAQCVAABpBpQBaBaANB4IADAtQAABDgWA7IEfAAIAgAAIAAANIAgAAIAACIIh+BOIgjAAIAAgjIg9AAIAAhJIABAAICdgeIAAhZEACQgmOIAAAXIB4BdEAAvggAIAAANIBNAAIA5gfIBTg2IAAjSAAv/LIAAgoAB9/LIgBgoAAv/LIBOAAEgB8gmOIEMAAIALAAIAAggEgCPgjjQgaBGg6A6QgsAtg1AaQhHAjhWAAIgCAAIhHgHIgiAoIGDAAIAAMhImTAAIAAD3IERFdIAABfIkRAAIAAm8AqG+ZIAqAAIAALiIpQAAIhPAAIAAkLQhoibByiNIAAivIFoAAICBj5AAM7MIBwAAIABj/AgJ7MIAAiuIA4AAIAAhRAgJ7MIAVAAIAACDIAPAAIAAA1AhVy3IAAksIAfAAIAAgxIAPAAIAAg1IAeAAIAAiDAAM5JIgVAAAgn4UIBCAAIA1AAIAAAxIAsAAIAAjpABQ3jIhKAAIg8AAApM/YIg6A/EgIqggAQhngUhPhPIgogvAlLoEIAAEQQAHA+hWAIIn/AAQhWgIAIg+IAAoZIjFmqAhVy3Ih0AAAAGyfIAmgsIBQAAIAAkYADWpzIhQAAIg2A8AhVoEIj2AAAhVoVIAAqiADWpzIAAgwIhaAAIAAooAAGo1IAApqAAG3jIAAFEAuJ+ZIEDAAEAGggjYIAABEICiAfIAAAHICHAAIAAArIiHAAIAAATIg6AAIAAA6IiqhkIAAh+EAJCghuIAAArAGz/BIBgAAIAAgyIhgAAIAAAyIAAD4IAADlIAuAAIAAgrICKgEIAAAvIAqAAIAAhfIAWAAIAAgkIAeAAIAkAAEAE1gj4IAAC3IB+BOAIm7EIAAB6IATAAIAlAAIAAAwAIY4dIAAgtIAOAAAHh3kIBJAAIBBAAAI57JIAAi2IgmAAIAAhCAI55KIAAh/IiGAAALJ5nIAAncAKV3kIAAA2IgRAAIAAGUIBUAAIAaAAIAagTIAAhNIAiAAIAlAAIAoBoIAJAYIAADcIBLAAIAAE8Ig9BDIi1AAIgdhBIgzAAAGzzDIBGAAIAAAQIAxAvIAAlgADWo1IAAg+AFOo1IAAg+IAAgzIBlAAIAAodAFOpzIBjAAIBLA+ALYwaIAAEIIhUA3IAADBAKErbIAAk/AIqo1IAApPAN7wSICeAAIEUCYIAAIHInYHJIgfAAAGz3kIAAEhEgGBAljIjRAAIAAgeIAZAAEgA4AljIAAA3IBjAAIAAg3IhjAAIlJAAEAPJAljIAACBIkQEbItoAAIjSkVIAAiHEASXAlFIAPAAIAAAeIjdAAIlQAAEAIVAljIAAA3IBkAAIAAg3IhkAAInqAA");
	this.shape_3.setTransform(-177.4864,47.6);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#804000").s().p("AnZabIjSkVIAAiGIFJAAIAAA3IBkAAIAAg3IhkAAIlJAAIjRAAIAAgfIAZAAIAAzHIHk4cIAAhlIAAgRIBcAAIAAggIBIAAIACgCIAAACICGAAIB3AAICuAAIAuAAIAAAcIBagBIAAA6IAJAAIAAAoICpIPIFiQxIAAS8I7RAAIbRAAIAPAAIAAAfIjeAAIlQAAIFQAAIAACAIkPEbgAFPU3IAAg3IhkAAInpAAIHpAAIAAA3IBkAAgAFPU3IhkAAIAAg3IBkAAIAAA3gAliU3IAAg3IBkAAIAAA3gAKfUAgADrUAg");
	this.shape_4.setTransform(-147.7,159.925);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#C0C0C0").s().p("AM2WrIipoQIAAgoIgJAAIAAg5IhaAAIAAgbIguAAIhLg/IhjAAIBjAAIBLA/IiuAAIAAg/IAAgzIBlAAIAAocIBGAAIAAAQIAxAuIgxguIAAgQIhGAAIAAkgIAAEgIAAIcIhlAAIAAAzIAAA/Ih4AAIAAg/IAAgwIhaAAIAAooIAAkXIgsAAIAAgxIg1AAIhCAAIBCAAIA1AAIAAAxIAsAAIAAEXIhQAAIgmAsIAmgsIBQAAIAAIoIBaAAIAAAwIhQAAIg2A8IA2g8IBQAAIAAA/IiGAAIAAgDIgCADIhIAAIAAprIAAlDIg8AAIA8AAIAAFDIAAJrIAAAfIhbAAIAAqiIAAKiIAAARIj2AAIAAhfIkRlcIERFcIAABfIkRAAIAAm7IAAG7IERAAIAAEQQAHA+hWAIIn/AAQhWgIAIg+IAAoZIjFmqIJQAAIpQAAIhPAAIAAkJQhoicByiNIAAivIFoAAICBj4IAoAvQBPBOBnAVQhngVhPhOIgogvQhBhbAAh1QAAiVBphqQBqhpCVAAQCVAABpBpQBaBaANB5IEMAAIAAAWIB4BdIh4hdIAAgWIALAAIAAghIBWAAIhWAAIAAiHIBFAAIAAjIIB9AAIAABTIDMAAQC8AcAIEpIAAL+IAVAAIAAAkIATAAIAACUIAZAAIAAE0IAlAAIAoBoICeAAIEUCYIAAIHInYHLgALANzIAdBBIC1AAIA9hDIAAk7IhLAAIAAjdIgJgYIAJAYIAADdIBLAAIAAE7Ig9BDIi1AAIgdhBIgzAAgAKEJ4IAADCIAAjCIBUg3IAAkIIAAEIIhUA3IAAk/IAAE/gAIqMfIAApQgApcGUIAAj4IGTAAImTAAIAArhIgqAAIkDAAIEDAAIAqAAIAALhgAKEE5IBUAAIAaAAIAagSIAAhOIAiAAIgiAAIAABOIgaASIgaAAIhUAAIAAmSIARAAIAAg2IAAA2IgRAAIAAGSgAIqDPIAAlegApMqEIGDAAIAAMgIB0AAIAAkrIAfAAIAAgxIAPAAIAAg0IAeAAIAAiEIAAitIA4AAIAAhSIAAgoIBNAAIABAoIhOAAIBOAAIgBD/IABj/IgBgoIA5gfIBTg2IAAjSIAAjwQAWgPAXAPIAAESIAAkSQgXgPgWAPIAADwIAADSIhTA2Ig5AfIhNAAIAAgNIAAgjIg9AAIAAhJIABAAICdgeIAAhZIkfAAQgaBGg6A7QgsAsg1AaQhHAjhWAAIgCAAIhHgGgAB8iPIAAjpgABQiPIhKAAgAKViPIAAhgIAWAAIAAgkIAeAAIAkAAIgkAAIAAncIAAHcIgeAAIAAAkIgWAAgAJriPIAqAAIgqAAIAAgvIiKADIAAAsIguAAIAAjmIAAj4IBgAAIAAgyIhgAAIAAAyIAAD4IAADmIAuAAIAAgsICKgDIAAAvgAJriPIhBAAgAIqiPIhJAAgAAbjAIAAg0IgPAAIAAiEIBwAAIhwAAIgVAAIAVAAIAACEIgVAAIAVAAIAPAAgAJejGIAAgwIglAAIAAh/IAAi2IgmAAIAAhCIAABCIAmAAIAAC2IiGAAICGAAIAAB/IAlAAgAIYjJIAAgtIAOAAIAAh6IAAB6IgOAAgAI5j2IgTAAgAqGpFIA6g/gAE1rsIB+BNIh+hNIAAi4IAAC4gAFesFICqBkIAAg7IA6AAIAAgTICHAAIAAgqIAAi2QAKlAi+glIi4AAIAAgiIAAAiIAABHQARgBALAjIAAB1IAnAAIAADTIhCAAIgpghIApAhIAAB+gABSqsIB+hOIAAiIIggAAIAAgNIggAAIAgAAIAAANIAgAAIAACIIh+BOIgjAAgAiPuPQAWg6AAhEIgDgsIADAsQAABEgWA6gAF5xWIgsAAgAlLNPgAKEJ4gApcCcgAB8CIgAAGiPgAAMl4gAGzptIAAgyIBgAAIAAAygAAvqfgAFesFIAAh+IBCAAIAABDICiAfIAAAIICHAAIAAAqIiHAAIAAgqIAAAqIAAATIg6AAIAAA7gAJCrvgAGguDg");
	this.shape_5.setTransform(-177.4864,-88.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-311,-234.8,267.1,564.9000000000001);


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
	this.instance = new lib.CachedBmp_22();
	this.instance.setTransform(5,12,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_21();
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
	this.instance = new lib.CachedBmp_20();
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

	// Layer_1
	this.instance = new lib.shape135("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite136, new cjs.Rectangle(-3.5,-3.3,7,6.699999999999999), null);


(lib.sprite79 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.shape78("synched",0);
	this.instance.setTransform(1,-2.6);
	this.instance.alpha = 0.5898;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({x:-0.6},3).to({y:-3.1},3).wait(1));

	// Layer_2
	this.instance_1 = new lib.shape78("synched",0);
	this.instance_1.setTransform(1,-2.6);
	this.instance_1.alpha = 0.5898;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({x:0,y:0,alpha:1},3).to({scaleX:0.8135,scaleY:0.7852},3).wait(1));

	// Layer_1
	this.instance_2 = new lib.shape78("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(7));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-10.2,-10.6,20.9,18.1);


(lib.sprite68 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.shape67("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite68, new cjs.Rectangle(-14.3,-26,25.6,39.9), null);


(lib.sprite66 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.shape22("synched",0);
	this.instance.setTransform(-0.8,-1.95,0.2,0.2,180);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(18).to({_off:false},0).to({scaleX:0.2498,scaleY:0.2498,x:-4.7,y:-4.9},1).to({scaleX:0.342,scaleY:0.342,x:-11.95,y:-10.35},2).to({scaleX:0.4246,scaleY:0.4246,x:-18.45,y:-15.2},2).to({scaleX:0.4974,scaleY:0.4974,x:-24.2,y:-19.5},2).to({scaleX:0.5606,scaleY:0.5606,x:-29.15,y:-23.25,alpha:0.8281},2).to({scaleX:0.614,scaleY:0.614,x:-33.35,y:-26.4,alpha:0.7109},2).to({scaleX:0.6577,scaleY:0.6577,x:-36.8,y:-28.95,alpha:0.5},2).to({scaleX:0.6759,scaleY:0.6759,x:-38.2,y:-30.05,alpha:0.3203},1).to({scaleX:0.705,scaleY:0.705,x:-40.5,y:-31.75,alpha:0.1406},2).to({scaleX:0.716,scaleY:0.716,x:-41.35,y:-32.4,alpha:0.0898},1).to({scaleX:0.7245,scaleY:0.7245,x:-42.05,y:-32.9,alpha:0.0313},1).to({scaleX:0.7342,scaleY:0.7342,x:-42.8,y:-33.5,alpha:0.0117},2).to({scaleX:0.7354,scaleY:0.7354,x:-42.9,y:-33.55,alpha:0},1).wait(1));

	// Layer_2
	this.instance_1 = new lib.shape22("synched",0);
	this.instance_1.setTransform(-0.8,-1.95,0.35,0.35,180);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(10).to({_off:false},0).to({scaleX:0.3506,scaleY:0.3506,x:-0.85,y:-2.1},1).to({scaleX:0.3523,scaleY:0.3523,x:-1.05,y:-2.65},1).to({scaleX:0.3552,scaleY:0.3552,x:-1.3,y:-3.55},1).to({scaleX:0.3592,scaleY:0.3592,x:-1.65,y:-4.7},1).to({scaleX:0.3644,scaleY:0.3644,x:-2.2,y:-6.3},1).to({scaleX:0.3708,scaleY:0.3708,x:-2.85,y:-8.15},1).to({scaleX:0.3783,scaleY:0.3783,x:-3.55,y:-10.4},1).to({scaleX:0.3968,scaleY:0.3968,x:-5.4,y:-15.95},2).to({scaleX:0.4078,scaleY:0.4078,x:-6.45,y:-19.2},1).to({scaleX:0.42,scaleY:0.42,x:-7.65,y:-22.85},1).to({scaleX:0.4333,scaleY:0.4333,x:-8.95,y:-26.8},1).to({scaleX:0.4477,scaleY:0.4477,x:-10.3,y:-31.1},1).to({scaleX:0.4633,scaleY:0.4633,x:-11.9,y:-35.8,alpha:0.5},1).to({scaleX:0.498,scaleY:0.498,x:-15.3,y:-46.15,alpha:0.2813},2).to({scaleX:0.5373,scaleY:0.5373,x:-19.15,y:-57.85,alpha:0.1289},2).to({scaleX:0.605,scaleY:0.605,x:-25.75,y:-78.05,alpha:0},3).to({_off:true},1).wait(8));

	// Layer_1
	this.instance_2 = new lib.shape22("synched",0);
	this.instance_2.setTransform(5.45,-8.2,0.23,0.23,180);
	this.instance_2.alpha = 0.8516;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({scaleX:0.5,scaleY:0.5,x:11.75,y:-59.3,alpha:0.0781},23).to({_off:true},1).wait(16));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-75.6,-93.1,109.6,99.89999999999999);


(lib.sprite65 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.shape22("synched",0);
	this.instance.setTransform(-0.8,-1.95,0.2887,0.2887,180);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(19).to({_off:false},0).to({scaleX:0.3895,scaleY:0.3895,x:-6.5,y:-13.5,alpha:0.7617},3).to({scaleX:0.4774,scaleY:0.4774,x:-11.35,y:-23.55,alpha:0.6719},3).to({scaleX:0.5524,scaleY:0.5524,x:-15.6,y:-32.1,alpha:0.4805},3).to({scaleX:0.6146,scaleY:0.6146,x:-19,y:-39.25,alpha:0.3281},3).to({scaleX:0.6489,scaleY:0.6489,x:-20.9,y:-43.15,alpha:0.2305},2).to({scaleX:0.6639,scaleY:0.6639,x:-21.75,y:-44.85,alpha:0.1406},1).to({scaleX:0.6896,scaleY:0.6896,x:-23.2,y:-47.8,alpha:0.1211},2).to({scaleX:0.7097,scaleY:0.7097,x:-24.3,y:-50.1,alpha:0.0508},2).to({scaleX:0.7175,scaleY:0.7175,x:-24.8,y:-51,alpha:0.0195},1).to({scaleX:0.7239,scaleY:0.7239,x:-25.1,y:-51.75},1).to({scaleX:0.7325,scaleY:0.7325,x:-25.65,y:-52.7,alpha:0.0117},2).to({scaleX:0.7347,scaleY:0.7347,x:-25.75,y:-52.95,alpha:0.0313},1).to({scaleX:0.7354,scaleY:0.7354,y:-53.05,alpha:0.0195},1).wait(1));

	// Layer_2
	this.instance_1 = new lib.shape22("synched",0);
	this.instance_1.setTransform(-0.8,-1.95,0.2887,0.2887,180);
	this.instance_1.alpha = 0.9414;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(11).to({_off:false},0).to({scaleX:0.289,scaleY:0.289,x:-0.85,y:-2.05,alpha:0.8516},1).to({scaleX:0.2901,scaleY:0.2901,x:-0.95,y:-2.3,alpha:0.8008},1).to({scaleX:0.2918,scaleY:0.2918,x:-1.15,y:-2.7,alpha:0.7695},1).to({scaleX:0.2942,scaleY:0.2942,x:-1.45,y:-3.25,alpha:0.7383},1).to({scaleX:0.2973,scaleY:0.2973,x:-1.8,y:-4,alpha:0.7109},1).to({scaleX:0.3011,scaleY:0.3011,x:-2.25,y:-4.9,alpha:0.6719},1).to({scaleX:0.3056,scaleY:0.3056,x:-2.75,y:-5.95,alpha:0.6289},1).to({scaleX:0.3108,scaleY:0.3108,x:-3.35,y:-7.2,alpha:0.6016},1).to({scaleX:0.3167,scaleY:0.3167,x:-4.1,y:-8.55,alpha:0.5586},1).to({scaleX:0.3232,scaleY:0.3232,x:-4.8,y:-10.1,alpha:0.5195},1).to({scaleX:0.3305,scaleY:0.3305,x:-5.65,y:-11.85,alpha:0.4805},1).to({scaleX:0.3384,scaleY:0.3384,x:-6.55,y:-13.7,alpha:0.4492},1).to({scaleX:0.3471,scaleY:0.3471,x:-7.55,y:-15.75,alpha:0.4102},1).to({scaleX:0.3564,scaleY:0.3564,x:-8.6,y:-17.95,alpha:0.3711},1).to({scaleX:0.3664,scaleY:0.3664,x:-9.8,y:-20.35,alpha:0.3398},1).to({scaleX:0.3885,scaleY:0.3885,x:-12.4,y:-25.6,alpha:0.2891},2).to({scaleX:0.4006,scaleY:0.4006,x:-13.75,y:-28.45,alpha:0.2383},1).to({scaleX:0.4134,scaleY:0.4134,x:-15.2,y:-31.45,alpha:0.1992},1).to({scaleX:0.4269,scaleY:0.4269,x:-16.8,y:-34.65,alpha:0.1602},1).to({scaleX:0.441,scaleY:0.441,x:-18.4,y:-38,alpha:0.1016},1).to({scaleX:0.4559,scaleY:0.4559,x:-20.1,y:-41.5,alpha:0.0586},1).to({scaleX:0.5046,scaleY:0.5046,x:-25.75,y:-53.05,alpha:0.0117},3).to({_off:true},1).wait(8));

	// Layer_1
	this.instance_2 = new lib.shape22("synched",0);
	this.instance_2.setTransform(-0.8,-1.95,0.2887,0.2887,180);
	this.instance_2.alpha = 0.8984;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({scaleX:0.2999,scaleY:0.2999,x:-1.7,y:-3.75,alpha:0.8203},1).to({scaleX:0.6134,scaleY:0.6134,x:-25.75,y:-53.05,alpha:0.0781},28).to({_off:true},1).wait(15));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-58.5,-71.3,70.6,76.5);


(lib.sprite62 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_20
	this.instance = new lib.shape22("synched",0);
	this.instance.setTransform(81.1,2.3,0.4487,0.4487);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_19
	this.instance_1 = new lib.shape22("synched",0);
	this.instance_1.setTransform(-1.8,17.1,0.4487,0.4487);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_18
	this.instance_2 = new lib.shape22("synched",0);
	this.instance_2.setTransform(42.1,2.3,0.4487,0.4487);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	// Layer_17
	this.instance_3 = new lib.shape22("synched",0);
	this.instance_3.setTransform(69.45,11.95,0.4487,0.4487);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

	// Layer_16
	this.instance_4 = new lib.shape22("synched",0);
	this.instance_4.setTransform(54.8,11.95,0.4487,0.4487);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

	// Layer_15
	this.instance_5 = new lib.shape22("synched",0);
	this.instance_5.setTransform(21.85,11.95,0.4487,0.4487);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1));

	// Layer_14
	this.instance_6 = new lib.shape22("synched",0);
	this.instance_6.setTransform(3.05,13.35,0.4487,0.4487);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1));

	// Layer_13
	this.instance_7 = new lib.shape22("synched",0);
	this.instance_7.setTransform(-84.15,11.95,0.4487,0.4487);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1));

	// Layer_12
	this.instance_8 = new lib.shape22("synched",0);
	this.instance_8.setTransform(-53.9,15.7,0.4487,0.4487);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1));

	// Layer_11
	this.instance_9 = new lib.shape22("synched",0);
	this.instance_9.setTransform(-64.2,11.95,0.4487,0.4487);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1));

	// Layer_10
	this.instance_10 = new lib.shape22("synched",0);
	this.instance_10.setTransform(-34,10.55,0.4487,0.4487);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1));

	// Layer_9
	this.instance_11 = new lib.shape22("synched",0);
	this.instance_11.setTransform(-16.85,10.55,0.4487,0.4487);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(1));

	// Layer_8
	this.instance_12 = new lib.shape22("synched",0);
	this.instance_12.setTransform(59.45,5.05,0.4487,0.4487);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(1));

	// Layer_7
	this.instance_13 = new lib.shape22("synched",0);
	this.instance_13.setTransform(71.75,5.05,0.4487,0.4487);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(1));

	// Layer_6
	this.instance_14 = new lib.shape22("synched",0);
	this.instance_14.setTransform(66.95,-6.6,0.4487,0.4487);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(1));

	// Layer_5
	this.instance_15 = new lib.shape22("synched",0);
	this.instance_15.setTransform(47.05,2.3,0.4487,0.4487);

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(1));

	// Layer_4
	this.instance_16 = new lib.shape22("synched",0);
	this.instance_16.setTransform(19.55,7.1,0.4487,0.4487);

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(1));

	// Layer_3
	this.instance_17 = new lib.shape22("synched",0);
	this.instance_17.setTransform(-8.6,6.45,0.4487,0.4487);

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(1));

	// Layer_2
	this.instance_18 = new lib.shape22("synched",0);
	this.instance_18.setTransform(-42.9,5.05,0.4487,0.4487);

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(1));

	// Layer_1
	this.instance_19 = new lib.shape22("synched",0);
	this.instance_19.setTransform(-71.75,5.05,0.4487,0.4487);

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite62, new cjs.Rectangle(-104.1,-17.7,205.2,46), null);


(lib.sprite60 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.shape22("synched",0);
	this.instance.setTransform(-4.45,14.5,0.4349,0.5596);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_3
	this.instance_1 = new lib.shape22("synched",0);
	this.instance_1.setTransform(19.6,8.75,0.5855,0.5855);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_2
	this.instance_2 = new lib.shape22("synched",0);
	this.instance_2.setTransform(7.9,-14.6,0.4967,0.4967);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	// Layer_1
	this.instance_3 = new lib.shape22("synched",0);
	this.instance_3.setTransform(-19.55,-8.45,0.5855,0.5855);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite60, new cjs.Rectangle(-45.5,-26.9,91.2,55.3), null);


(lib.sprite59 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.shape53("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite59, new cjs.Rectangle(-30.2,-27.3,60.4,77.2), null);


(lib.sprite56 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.shape55("synched",0);
	this.instance.setTransform(-22,-3.25);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({startPosition:0},8).wait(1).to({x:0,y:0},0).wait(11));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-45.4,-25.8,112.9,55);


(lib.sprite21 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.shape20("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite21, new cjs.Rectangle(-11.8,-25.1,22.3,38), null);


(lib.sprite11 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.shape10("synched",0);
	this.instance.setTransform(1.05,-4.05);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({startPosition:0},9).wait(1).to({x:0,y:0},0).wait(10));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.7,-7.8,13.5,16.5);


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

	// Layer_2
	this.instance = new lib.shape7("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite8, new cjs.Rectangle(-30.2,-27.3,60.4,77.2), null);


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


(lib.sprite152 = function(mode,startPosition,loop,reversed) {
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
	this.frame_1134 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1134).call(this.frame_1134).wait(1));

	// Masked_Layer_28___17
	this.instance = new lib.shape151("synched",0);
	this.instance.setTransform(-199.85,-38);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1135));

	// Masked_Layer_26___17
	this.instance_1 = new lib.text150("synched",0);
	this.instance_1.setTransform(-770.8,74.85,0.9998,1);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1135));

	// Masked_Layer_25___17
	this.instance_2 = new lib.text149("synched",0);
	this.instance_2.setTransform(-770.8,-45.15,0.9998,1);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1135));

	// Masked_Layer_24___17
	this.instance_3 = new lib.text148("synched",0);
	this.instance_3.setTransform(-770.8,-101.55,0.9998,1);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1135));

	// Masked_Layer_23___17
	this.instance_4 = new lib.text147("synched",0);
	this.instance_4.setTransform(-770.8,-157.95,0.9998,1);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1135));

	// Masked_Layer_22___17
	this.instance_5 = new lib.text146("synched",0);
	this.instance_5.setTransform(-770.8,24.85,0.9998,1);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1135));

	// Masked_Layer_21___17
	this.instance_6 = new lib.shape145("synched",0);
	this.instance_6.setTransform(-199.85,-13.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1135));

	// Masked_Layer_18___17
	this.instance_7 = new lib.text144("synched",0);
	this.instance_7.setTransform(-779,-194.35,0.9998,1);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1135));

	// Layer_16
	this.instance_8 = new lib.shape143("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1135));

	// Layer_15
	this.instance_9 = new lib.text142("synched",0);
	this.instance_9.setTransform(-212.6,163.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1135));

	// Layer_14
	this.instance_10 = new lib.shape141("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1135));

	// Layer_13
	this.instance_11 = new lib.text140("synched",0);
	this.instance_11.setTransform(47.85,69);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(1135));

	// Layer_12
	this.instance_12 = new lib.shape139("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(1135));

	// Layer_11
	this.instance_13 = new lib.text138("synched",0);
	this.instance_13.setTransform(-207.95,-84);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(1135));

	// Layer_10
	this.instance_14 = new lib.shape137("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(1135));

	// Layer_8
	this.instance_15 = new lib.sprite136();
	this.instance_15.setTransform(-43.65,93.3,2.0318,2.0318,-128.241);

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(1135));

	// Layer_7
	this.instance_16 = new lib.shape134("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(1135));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-782.9,-197.7,1021.0999999999999,390.6);


(lib.sprite83 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_98
	this.instance = new lib.sprite62();
	this.instance.setTransform(5.9,14.75);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_77
	this.instance_1 = new lib.sprite62();
	this.instance_1.setTransform(5.9,26.15);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_56
	this.instance_2 = new lib.sprite62();
	this.instance_2.setTransform(5.9,43.65);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	// Layer_51
	this.instance_3 = new lib.sprite60();
	this.instance_3.setTransform(-54.3,26.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

	// Layer_46
	this.instance_4 = new lib.sprite60();
	this.instance_4.setTransform(-54.3,-2.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

	// Layer_41
	this.instance_5 = new lib.sprite60();
	this.instance_5.setTransform(-59.75,-65.35);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1));

	// Layer_36
	this.instance_6 = new lib.sprite60();
	this.instance_6.setTransform(-56.05,-87.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1));

	// Layer_31
	this.instance_7 = new lib.sprite60();
	this.instance_7.setTransform(-50.8,-30.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1));

	// Layer_26
	this.instance_8 = new lib.sprite60();
	this.instance_8.setTransform(12,26.1);
	this.instance_8.alpha = 0.3008;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1));

	// Layer_21
	this.instance_9 = new lib.sprite60();
	this.instance_9.setTransform(56.2,26.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1));

	// Layer_16
	this.instance_10 = new lib.sprite60();
	this.instance_10.setTransform(56.2,-2.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1));

	// Layer_11
	this.instance_11 = new lib.sprite60();
	this.instance_11.setTransform(50.75,-65.35);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(1));

	// Layer_6
	this.instance_12 = new lib.sprite60();
	this.instance_12.setTransform(54.45,-87.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(1));

	// Layer_1
	this.instance_13 = new lib.sprite60();
	this.instance_13.setTransform(59.7,-30.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite83, new cjs.Rectangle(-105.3,-114.4,212.3,186.3), null);


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

	// Layer_25
	this.instance = new lib.sprite79();
	this.instance.setTransform(-71.6,11.8,1.043,1.962,15.0002);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_21
	this.instance_1 = new lib.sprite79();
	this.instance_1.setTransform(42.75,13.9,1.043,1.962,15.0002);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_17
	this.instance_2 = new lib.sprite79();
	this.instance_2.setTransform(-31.05,-13.25,1.043,1.962,15.0002);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	// Layer_13
	this.instance_3 = new lib.sprite79();
	this.instance_3.setTransform(8.9,14.5,0.8519,1.6026,-45);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

	// Layer_9
	this.instance_4 = new lib.sprite79();
	this.instance_4.setTransform(-13.9,4.5,1.4871,2.7973,14.9999);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

	// Layer_5
	this.instance_5 = new lib.sprite79();
	this.instance_5.setTransform(-41.4,20.75,0.8519,1.6026,-45);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1));

	// Layer_1
	this.instance_6 = new lib.sprite79();
	this.instance_6.setTransform(28.7,-2.6,1.043,1.962,15.0002);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite80, new cjs.Rectangle(-85,-34.7,143.6,69.7), null);


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

	// timeline functions:
	this.frame_0 = function() {
		/* stopAllSounds ();
		*/
	}
	this.frame_1289 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1289).call(this.frame_1289).wait(1));

	// Masked_Layer_370___362
	this.instance = new lib.text30("synched",0);
	this.instance.setTransform(-1310,47.1,1.4741,1.4741);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1290));

	// Masked_Layer_369___362
	this.instance_1 = new lib.text29("synched",0);
	this.instance_1.setTransform(-1310,145.85,1.4741,1.4741);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1290));

	// Masked_Layer_368___362
	this.instance_2 = new lib.text28("synched",0);
	this.instance_2.setTransform(-1322.1,-94.25,1.4741,1.4741);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1290));

	// Masked_Layer_367___362
	this.instance_3 = new lib.text27("synched",0);
	this.instance_3.setTransform(-1310,-45.8,1.4741,1.4741);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1290));

	// Masked_Layer_366___362
	this.instance_4 = new lib.shape26("synched",0);
	this.instance_4.setTransform(-299.75,-44.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1290));

	// Masked_Layer_363___362
	this.instance_5 = new lib.text25("synched",0);
	this.instance_5.setTransform(-1322.1,-233.6,1.4741,1.4741);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1290));

	// Mask_Layer_359 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_514 = new cjs.Graphics().p("AtoW+IAAzHIHk4cIAAh2IBdAAIAAggIBHAAIADgCIAAACIHYAAIAAAcIBagBIAAA6IAJAAIAAAoICpIPIFiQxIAAS8g");
	var mask_graphics_518 = new cjs.Graphics().p("AtoW+IAAzHIHk4cIAAh2IBdAAIAAggIBHAAIADgCIAAACIHYAAIAAAcIBagBIAAA6IAJAAIAAAoICpIPIFiQxIAAS8g");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:null,x:0,y:0}).wait(514).to({graphics:mask_graphics_514,x:-147.2252,y:137.8251}).wait(2).to({graphics:null,x:0,y:0}).wait(2).to({graphics:mask_graphics_518,x:-147.2252,y:137.8251}).wait(772));

	// Masked_Layer_360___359
	this.instance_6 = new lib.shape70("synched",0);
	this.instance_6.setTransform(20.7,126.75,0.5162,0.5162);
	this.instance_6._off = true;

	var maskedShapeInstanceList = [this.instance_6];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(514).to({_off:false},0).to({_off:true},2).wait(2).to({_off:false,scaleX:1,scaleY:1,x:0,y:0},0).to({_off:true},2).wait(770));

	// Layer_355
	this.instance_7 = new lib.sprite66();
	this.instance_7.setTransform(-230.55,106.7);
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(494).to({_off:false},0).wait(796));

	// Layer_351
	this.instance_8 = new lib.sprite65();
	this.instance_8.setTransform(-230.55,106.7);
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(494).to({_off:false},0).wait(796));

	// Layer_349
	this.instance_9 = new lib.sprite68();
	this.instance_9.setTransform(-227.25,127.2);
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(496).to({_off:false},0).to({scaleX:0.9973,scaleY:0.9973,rotation:-60.1823,x:-237.9,y:132.6},10).to({scaleX:0.9979,scaleY:0.9979,rotation:-84.2435,x:-239.75,y:137.2},4).wait(1).to({scaleX:0.998,scaleY:0.998,rotation:-90.2479,x:-239.85,y:138.45},0).wait(779));

	// Mask_Layer_343 (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	var mask_1_graphics_519 = new cjs.Graphics().p("AzmYuMAAAgxbMAnNAAAMAAAAxbg");

	this.timeline.addTween(cjs.Tween.get(mask_1).to({graphics:null,x:0,y:0}).wait(519).to({graphics:mask_1_graphics_519,x:-136.775,y:135.175}).wait(771));

	// Masked_Layer_346___343
	this.instance_10 = new lib.shape18("synched",0);
	this.instance_10.setTransform(-170.55,171.45);
	this.instance_10.alpha = 0.1484;
	this.instance_10._off = true;

	var maskedShapeInstanceList = [this.instance_10];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(519).to({_off:false},0).wait(771));

	// Masked_Layer_344___343
	this.instance_11 = new lib.shape15("synched",0);
	this.instance_11.setTransform(-171.25,134);
	this.instance_11.alpha = 0.1484;
	this.instance_11._off = true;

	var maskedShapeInstanceList = [this.instance_11];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(519).to({_off:false},0).wait(771));

	// Mask_Layer_340 (mask)
	var mask_2 = new cjs.Shape();
	mask_2._off = true;
	var mask_2_graphics_519 = new cjs.Graphics().p("A0fazIAAnxMAjfAAAIAAHxg");

	this.timeline.addTween(cjs.Tween.get(mask_2).to({graphics:null,x:0,y:0}).wait(519).to({graphics:mask_2_graphics_519,x:-131.166,y:171.5407}).wait(771));

	// Masked_Layer_341___340
	this.instance_12 = new lib.shape14("synched",0);
	this.instance_12._off = true;

	var maskedShapeInstanceList = [this.instance_12];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_2;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(519).to({_off:false},0).wait(771));

	// Layer_326
	this.instance_13 = new lib.sprite79();
	this.instance_13.setTransform(-170.5,212.95,0.8519,1.6026,-45);
	this.instance_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(526).to({_off:false},0).to({_off:true},7).wait(757));

	// Layer_322
	this.instance_14 = new lib.sprite79();
	this.instance_14.setTransform(-144.4,232.3,1.4871,2.7973,14.9999);
	this.instance_14._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(526).to({_off:false},0).to({_off:true},7).wait(757));

	// Layer_318
	this.instance_15 = new lib.sprite79();
	this.instance_15.setTransform(-167.05,229.1,0.8519,1.6026,-45);
	this.instance_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(526).to({_off:false},0).to({_off:true},7).wait(757));

	// Layer_314
	this.instance_16 = new lib.sprite79();
	this.instance_16.setTransform(-113.15,245.55,1.043,1.962,15.0002);

	this.instance_17 = new lib.sprite80();
	this.instance_17.setTransform(-141.5,257.45);
	this.instance_17._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_16}]},526).to({state:[{t:this.instance_17}]},7).to({state:[{t:this.instance_17}]},75).to({state:[{t:this.instance_17}]},9).to({state:[{t:this.instance_17}]},1).wait(672));
	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(533).to({_off:false},0).wait(75).to({scaleX:0.6593,scaleY:0.6593,y:268.65,alpha:0.1719},9).wait(1).to({scaleX:0.6214,scaleY:0.6214,y:269.9,alpha:0.0781},0).wait(672));

	// Layer_312
	this.instance_18 = new lib.sprite11();
	this.instance_18.setTransform(-164.35,22.4,1.2936,1.2936,29.9998);
	this.instance_18._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(519).to({_off:false},0).to({y:36.1},9).to({y:83.5},10).to({y:128.2},6).wait(1).to({y:136.85},0).to({_off:true},63).wait(682));

	// Layer_310
	this.instance_19 = new lib.sprite56();
	this.instance_19.setTransform(-154.2,17.4,0.3114,0.3114);
	this.instance_19.alpha = 0.6992;
	this.instance_19._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(519).to({_off:false},0).to({y:31.1,alpha:0.75},9).to({y:78.5,alpha:0.6992},10).to({y:123.2},6).wait(1).to({y:131.85},0).to({_off:true},63).wait(682));

	// Layer_309
	this.instance_20 = new lib.shape77("synched",0);
	this.instance_20.setTransform(-149.3,-78);
	this.instance_20._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(519).to({_off:false},0).to({y:-64.3},9).to({y:-16.9},10).to({y:27.8},6).wait(1).to({y:36.45},0).wait(745));

	// Layer_306
	this.instance_21 = new lib.shape6("synched",0);
	this.instance_21.setTransform(-149.2,-181.8);
	this.instance_21._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(519).to({_off:false},0).to({y:-147.35},13).wait(1).to({y:-144.7},0).wait(757));

	// Layer_305
	this.instance_22 = new lib.shape76("synched",0);
	this.instance_22.setTransform(-149.25,80.25);
	this.instance_22._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(519).to({_off:false},0).to({y:96.65},10).to({y:145.8},10).to({y:182.65},5).wait(1).to({y:191},0).wait(745));

	// Layer_304
	this.instance_23 = new lib.shape75("synched",0);
	this.instance_23.setTransform(-148.7,35.4);
	this.instance_23._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(519).to({_off:false},0).wait(771));

	// Layer_302
	this.instance_24 = new lib.sprite11();
	this.instance_24.setTransform(-171,150.3,1,1,29.9999);
	this.instance_24._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(519).to({_off:false},0).to({x:-170.9,y:154.55},2).to({x:-169.9,y:167.4},2).to({x:-168.2,y:188.95},2).to({x:-171,y:219.25},2).to({x:-220.9,y:268.25},5).to({scaleX:0.9978,scaleY:0.9978,rotation:1.1689,x:-216.3,y:277.4},6).wait(1).to({scaleX:0.9991,scaleY:0.9991,rotation:-3.7164,x:-214.9,y:278.6},0).wait(751));

	// Layer_301
	this.instance_25 = new lib.shape74("synched",0);
	this.instance_25.setTransform(-149.25,80.25);
	this.instance_25._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(519).to({_off:false},0).to({y:84.55},2).to({y:97.5},2).to({y:119.05},2).to({y:149.2},2).to({x:-200.5,y:197.9},5).to({scaleX:0.9978,scaleY:0.9978,rotation:-28.8312,x:-231,y:205.7},6).wait(1).to({scaleX:0.9991,scaleY:0.9991,rotation:-33.7163,x:-235.7,y:208.35},0).wait(751));

	// Layer_297
	this.instance_26 = new lib.sprite59();
	this.instance_26.setTransform(-149.7,169.75);
	this.instance_26._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(519).to({_off:false},0).to({y:174.05},2).to({y:187},2).to({y:208.55},2).to({y:238.7},2).to({scaleX:0.9991,scaleY:0.9991,rotation:-17.8306,x:-156.05,y:239.7},1).to({scaleX:0.9985,scaleY:0.9985,rotation:-35.8765,x:-161.85,y:242.65},1).to({rotation:-54.1235,x:-166.5,y:247.3},1).to({scaleX:0.9991,scaleY:0.9991,rotation:-72.1694,x:-169.45,y:253.1},1).wait(1).to({scaleX:1,scaleY:1,rotation:-90,x:-170.45,y:259.45},0).wait(758));

	// Mask_Layer_294 (mask)
	var mask_3 = new cjs.Shape();
	mask_3._off = true;
	var mask_3_graphics_533 = new cjs.Graphics().p("AtOHeIAAwiIGjAAIAAQig");

	this.timeline.addTween(cjs.Tween.get(mask_3).to({graphics:null,x:0,y:0}).wait(533).to({graphics:mask_3_graphics_533,x:-84.675,y:-58.15}).wait(757));

	// Masked_Layer_295___294
	this.instance_27 = new lib.shape5("synched",0);
	this.instance_27.setTransform(-148.7,35.4);
	this.instance_27._off = true;

	var maskedShapeInstanceList = [this.instance_27];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_3;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_27).wait(533).to({_off:false},0).wait(757));

	// Layer_265
	this.instance_28 = new lib.shape22("synched",0);
	this.instance_28.setTransform(-232.75,146.5,0.2736,0.2339,104.7379);
	this.instance_28.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_28).wait(397).to({startPosition:0},0).to({scaleX:0.2976,scaleY:0.2405,rotation:104.5723,guide:{path:[-232.7,146.5,-232.8,147,-233,147.5,-233,147.5,-233,147.6]},alpha:0.0508},1).to({scaleX:0.7099,scaleY:0.3565,rotation:104.5727,guide:{path:[-232.9,147.5,-233.1,148.2,-233.5,149.1,-234.8,153.4,-238.1,165.5,-238.1,165.5,-238.1,165.5]},alpha:0.9492},17).to({scaleX:0.7347,scaleY:0.3636,rotation:104.7366,guide:{path:[-238.1,165.6,-238.2,166,-238.4,166.7,-238.4,166.7,-238.4,166.7]},alpha:1},1).to({scaleX:0.7707,scaleY:0.3633,rotation:104.5697,guide:{path:[-238.4,166.6,-238.6,167.4,-238.8,168.3,-238.8,168.3,-238.8,168.3]},alpha:0.9492},1).to({scaleX:1.4285,rotation:104.572,guide:{path:[-238.9,168.2,-242.1,180,-247.1,198.8,-246.8,197.9,-246.5,197.2]},alpha:0.0508},18).wait(1).to({scaleX:1.4662,scaleY:0.3636,rotation:104.7366,x:-247.15,y:198.85,alpha:0},0).to({startPosition:0},10).to({scaleX:0.2736,scaleY:0.2339,rotation:104.7379,guide:{path:[-247,198.8,-243.6,189.4,-239.1,172.8,-234.6,156.2,-232.7,148.3,-231.2,142,-232.6,146.3,-232.6,146.4,-232.6,146.4]}},1).to({scaleX:0.2976,scaleY:0.2405,rotation:104.5723,guide:{path:[-232.7,146.4,-232.8,146.8,-233,147.3,-233,147.4,-233,147.4]},alpha:0.0508},1).to({scaleX:0.7099,scaleY:0.3565,rotation:104.5727,guide:{path:[-233,147.5,-233.2,148.2,-233.5,149.1,-234.8,153.4,-238.1,165.5,-238.2,165.5,-238.2,165.5]},alpha:0.9492},17).to({scaleX:0.7347,scaleY:0.3636,rotation:104.7366,guide:{path:[-238.1,165.5,-238.2,165.9,-238.4,166.5,-238.4,166.6,-238.4,166.6]},alpha:1},1).to({scaleX:0.7707,scaleY:0.3633,rotation:104.5697,guide:{path:[-238.4,166.6,-238.6,167.3,-238.8,168.1,-238.8,168.2,-238.8,168.2]},alpha:0.9492},1).to({scaleX:1.4662,scaleY:0.3636,rotation:104.7366,guide:{path:[-238.8,168.2,-242,180.1,-247,198.9,-247,198.9,-247,198.9]},alpha:0},19).to({_off:true},1).wait(803));

	// Layer_264
	this.instance_29 = new lib.shape22("synched",0);
	this.instance_29.setTransform(-222.5,107.3,0.274,0.234,-82.4987);
	this.instance_29.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_29).wait(397).to({startPosition:0},0).to({scaleX:0.4194,scaleY:0.2749,rotation:-82.4821,guide:{path:[-222.4,107.3,-222.4,107.3,-222.4,107.3,-222.2,106.4,-222,105.4,-221.7,103.8,-221.3,100.8]},alpha:0.3203},6).to({scaleX:0.4436,scaleY:0.2817,rotation:-82.4769,guide:{path:[-221.2,100.9,-221.2,100.4,-221.1,99.8]},alpha:0.3711},1).to({scaleX:0.735,scaleY:0.3638,rotation:-82.3104,guide:{path:[-221.2,99.7,-221.2,99.7,-221.1,99.7,-220.4,94.7,-219.3,86.5]},alpha:1},12).to({scaleX:0.7491,scaleY:0.3636,rotation:-82.4479,guide:{path:[-219.2,86.7,-219.2,86.3,-219.1,86]},alpha:0.9492},1).to({scaleX:1.0071,rotation:-82.4503,guide:{path:[-219.2,85.9,-219.2,85.9,-219.1,85.9,-218.4,80.3,-217.5,73.6,-217.5,73.9,-217.6,74.3,-217.7,74.3,-217.7,74.4]},alpha:0.0508},18).wait(1).to({scaleX:1.0219,scaleY:0.3638,rotation:-82.3104,x:-217.55,y:73.65,alpha:0},0).to({startPosition:0},10).to({scaleX:0.274,scaleY:0.234,rotation:-82.4987,guide:{path:[-217.4,73.6,-219.1,79.9,-220.6,90.5,-222.2,101.1,-222.6,106,-223,110,-222.4,107.2]}},1).to({scaleX:0.4194,scaleY:0.2749,rotation:-82.4821,guide:{path:[-222.4,107.3,-222.4,107.2,-222.4,107.2,-222.2,106.4,-222,105.4,-221.7,103.9,-221.3,100.8]},alpha:0.3203},6).to({scaleX:0.4436,scaleY:0.2817,rotation:-82.4769,guide:{path:[-221.2,100.7,-221.2,100.3,-221.1,99.7]},alpha:0.3711},1).to({scaleX:0.735,scaleY:0.3638,rotation:-82.3104,guide:{path:[-221.2,99.7,-221.2,99.7,-221.1,99.7,-220.3,94.6,-219.2,86.5]},alpha:1},12).to({scaleX:0.7491,scaleY:0.3636,rotation:-82.4479,guide:{path:[-219.2,86.5,-219.2,86.2,-219.1,85.9]},alpha:0.9492},1).to({scaleX:1.0219,scaleY:0.3638,rotation:-82.3104,guide:{path:[-219.2,85.9,-219.2,85.9,-219.1,85.8,-218.4,80.3,-217.5,73.7,-217.5,73.7,-217.5,73.7]},alpha:0},19).to({_off:true},1).wait(803));

	// Layer_262
	this.instance_30 = new lib.sprite21();
	this.instance_30.setTransform(-227.25,127.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_30).to({_off:true},496).wait(794));

	// Mask_Layer_221 (mask)
	var mask_4 = new cjs.Shape();
	mask_4._off = true;
	var mask_4_graphics_147 = new cjs.Graphics().p("AzmbhMAAAg3BMAnNAAAMAAAA3Bg");
	var mask_4_graphics_148 = new cjs.Graphics().p("AzmbgMAAAg2/MAnNAAAMAAAA2/g");
	var mask_4_graphics_149 = new cjs.Graphics().p("AzmbfMAAAg2+MAnNAAAMAAAA2+g");
	var mask_4_graphics_150 = new cjs.Graphics().p("AzmbfMAAAg29MAnNAAAMAAAA29g");
	var mask_4_graphics_151 = new cjs.Graphics().p("AzmbeMAAAg28MAnNAAAMAAAA28g");
	var mask_4_graphics_152 = new cjs.Graphics().p("AzmbeMAAAg27MAnNAAAMAAAA27g");
	var mask_4_graphics_153 = new cjs.Graphics().p("AzmbeMAAAg27MAnNAAAMAAAA27g");
	var mask_4_graphics_154 = new cjs.Graphics().p("AzmbdMAAAg25MAnNAAAMAAAA25g");
	var mask_4_graphics_155 = new cjs.Graphics().p("AzmbdMAAAg25MAnNAAAMAAAA25g");
	var mask_4_graphics_156 = new cjs.Graphics().p("AzmbcMAAAg23MAnNAAAMAAAA23g");
	var mask_4_graphics_157 = new cjs.Graphics().p("AzmbcMAAAg23MAnNAAAMAAAA23g");
	var mask_4_graphics_158 = new cjs.Graphics().p("AzmbbMAAAg21MAnNAAAMAAAA21g");
	var mask_4_graphics_159 = new cjs.Graphics().p("AzmbbMAAAg21MAnNAAAMAAAA21g");
	var mask_4_graphics_160 = new cjs.Graphics().p("AzmbaMAAAg2zMAnNAAAMAAAA2zg");
	var mask_4_graphics_161 = new cjs.Graphics().p("AzmbaMAAAg2zMAnNAAAMAAAA2zg");
	var mask_4_graphics_162 = new cjs.Graphics().p("AzmbZMAAAg2xMAnNAAAMAAAA2xg");
	var mask_4_graphics_163 = new cjs.Graphics().p("AzmbZMAAAg2xMAnNAAAMAAAA2xg");
	var mask_4_graphics_164 = new cjs.Graphics().p("AzmbYMAAAg2vMAnNAAAMAAAA2vg");
	var mask_4_graphics_165 = new cjs.Graphics().p("AzmbYMAAAg2vMAnNAAAMAAAA2vg");
	var mask_4_graphics_166 = new cjs.Graphics().p("AzmbXMAAAg2tMAnNAAAMAAAA2tg");
	var mask_4_graphics_167 = new cjs.Graphics().p("AzmbXMAAAg2tMAnNAAAMAAAA2tg");
	var mask_4_graphics_168 = new cjs.Graphics().p("AzmbWMAAAg2sMAnNAAAMAAAA2sg");
	var mask_4_graphics_169 = new cjs.Graphics().p("AzmbWMAAAg2rMAnNAAAMAAAA2rg");
	var mask_4_graphics_170 = new cjs.Graphics().p("AzmbVMAAAg2qMAnNAAAMAAAA2qg");
	var mask_4_graphics_171 = new cjs.Graphics().p("AzmbVMAAAg2pMAnNAAAMAAAA2pg");
	var mask_4_graphics_172 = new cjs.Graphics().p("AzmbUMAAAg2oMAnNAAAMAAAA2og");
	var mask_4_graphics_173 = new cjs.Graphics().p("AzmbUMAAAg2nMAnNAAAMAAAA2ng");
	var mask_4_graphics_174 = new cjs.Graphics().p("AzmbUMAAAg2nMAnNAAAMAAAA2ng");
	var mask_4_graphics_175 = new cjs.Graphics().p("AzmbTMAAAg2lMAnNAAAMAAAA2lg");
	var mask_4_graphics_176 = new cjs.Graphics().p("AzmbTMAAAg2lMAnNAAAMAAAA2lg");
	var mask_4_graphics_177 = new cjs.Graphics().p("AzmbSMAAAg2jMAnNAAAMAAAA2jg");
	var mask_4_graphics_178 = new cjs.Graphics().p("AzmbRMAAAg2iMAnNAAAMAAAA2ig");
	var mask_4_graphics_179 = new cjs.Graphics().p("AzmbRMAAAg2hMAnNAAAMAAAA2hg");
	var mask_4_graphics_180 = new cjs.Graphics().p("AzmbQMAAAg2gMAnNAAAMAAAA2gg");
	var mask_4_graphics_181 = new cjs.Graphics().p("AzmbQMAAAg2fMAnNAAAMAAAA2fg");
	var mask_4_graphics_182 = new cjs.Graphics().p("AzmbQMAAAg2fMAnNAAAMAAAA2fg");
	var mask_4_graphics_183 = new cjs.Graphics().p("AzmbPMAAAg2dMAnNAAAMAAAA2dg");
	var mask_4_graphics_184 = new cjs.Graphics().p("AzmbPMAAAg2dMAnNAAAMAAAA2dg");
	var mask_4_graphics_185 = new cjs.Graphics().p("AzmbOMAAAg2bMAnNAAAMAAAA2bg");
	var mask_4_graphics_186 = new cjs.Graphics().p("AzmbOMAAAg2bMAnNAAAMAAAA2bg");
	var mask_4_graphics_187 = new cjs.Graphics().p("AzmbNMAAAg2ZMAnNAAAMAAAA2Zg");
	var mask_4_graphics_188 = new cjs.Graphics().p("AzmbNMAAAg2ZMAnNAAAMAAAA2Zg");
	var mask_4_graphics_189 = new cjs.Graphics().p("AzmbMMAAAg2XMAnNAAAMAAAA2Xg");
	var mask_4_graphics_190 = new cjs.Graphics().p("AzmbMMAAAg2XMAnNAAAMAAAA2Xg");
	var mask_4_graphics_191 = new cjs.Graphics().p("AzmbLMAAAg2VMAnNAAAMAAAA2Vg");
	var mask_4_graphics_192 = new cjs.Graphics().p("AzmbLMAAAg2VMAnNAAAMAAAA2Vg");
	var mask_4_graphics_193 = new cjs.Graphics().p("AzmbKMAAAg2TMAnNAAAMAAAA2Tg");
	var mask_4_graphics_194 = new cjs.Graphics().p("AzmbKMAAAg2TMAnNAAAMAAAA2Tg");
	var mask_4_graphics_195 = new cjs.Graphics().p("AzmbJMAAAg2RMAnNAAAMAAAA2Rg");
	var mask_4_graphics_196 = new cjs.Graphics().p("AzmbJMAAAg2RMAnNAAAMAAAA2Rg");
	var mask_4_graphics_197 = new cjs.Graphics().p("AzmbIMAAAg2QMAnNAAAMAAAA2Qg");
	var mask_4_graphics_198 = new cjs.Graphics().p("AzmbIMAAAg2PMAnNAAAMAAAA2Pg");
	var mask_4_graphics_199 = new cjs.Graphics().p("AzmbHMAAAg2OMAnNAAAMAAAA2Og");
	var mask_4_graphics_200 = new cjs.Graphics().p("AzmbHMAAAg2NMAnNAAAMAAAA2Ng");
	var mask_4_graphics_201 = new cjs.Graphics().p("AzmbHMAAAg2NMAnNAAAMAAAA2Ng");
	var mask_4_graphics_202 = new cjs.Graphics().p("AzmbGMAAAg2LMAnNAAAMAAAA2Lg");
	var mask_4_graphics_203 = new cjs.Graphics().p("AzmbGMAAAg2LMAnNAAAMAAAA2Lg");
	var mask_4_graphics_204 = new cjs.Graphics().p("AzmbFMAAAg2JMAnNAAAMAAAA2Jg");
	var mask_4_graphics_205 = new cjs.Graphics().p("AzmbEMAAAg2IMAnNAAAMAAAA2Ig");
	var mask_4_graphics_206 = new cjs.Graphics().p("AzmbEMAAAg2HMAnNAAAMAAAA2Hg");
	var mask_4_graphics_207 = new cjs.Graphics().p("AzmbDMAAAg2GMAnNAAAMAAAA2Gg");
	var mask_4_graphics_208 = new cjs.Graphics().p("AzmbDMAAAg2FMAnNAAAMAAAA2Fg");
	var mask_4_graphics_209 = new cjs.Graphics().p("AzmbDMAAAg2FMAnNAAAMAAAA2Fg");
	var mask_4_graphics_210 = new cjs.Graphics().p("AzmbCMAAAg2DMAnNAAAMAAAA2Dg");
	var mask_4_graphics_211 = new cjs.Graphics().p("AzmbCMAAAg2DMAnNAAAMAAAA2Dg");
	var mask_4_graphics_212 = new cjs.Graphics().p("AzmbBMAAAg2BMAnNAAAMAAAA2Bg");
	var mask_4_graphics_213 = new cjs.Graphics().p("AzmbBMAAAg2BMAnNAAAMAAAA2Bg");
	var mask_4_graphics_214 = new cjs.Graphics().p("AzmbAMAAAg1/MAnNAAAMAAAA1/g");
	var mask_4_graphics_215 = new cjs.Graphics().p("AzmbAMAAAg1/MAnNAAAMAAAA1/g");
	var mask_4_graphics_216 = new cjs.Graphics().p("Azma/MAAAg19MAnNAAAMAAAA19g");
	var mask_4_graphics_217 = new cjs.Graphics().p("Azma/MAAAg19MAnNAAAMAAAA19g");
	var mask_4_graphics_218 = new cjs.Graphics().p("Azma+MAAAg17MAnNAAAMAAAA17g");
	var mask_4_graphics_219 = new cjs.Graphics().p("Azma+MAAAg17MAnNAAAMAAAA17g");
	var mask_4_graphics_220 = new cjs.Graphics().p("Azma9MAAAg15MAnNAAAMAAAA15g");
	var mask_4_graphics_221 = new cjs.Graphics().p("Azma9MAAAg15MAnNAAAMAAAA15g");
	var mask_4_graphics_222 = new cjs.Graphics().p("Azma8MAAAg13MAnNAAAMAAAA13g");
	var mask_4_graphics_223 = new cjs.Graphics().p("Azma8MAAAg13MAnNAAAMAAAA13g");
	var mask_4_graphics_224 = new cjs.Graphics().p("Azma7MAAAg12MAnNAAAMAAAA12g");
	var mask_4_graphics_225 = new cjs.Graphics().p("Azma7MAAAg11MAnNAAAMAAAA11g");
	var mask_4_graphics_226 = new cjs.Graphics().p("Azma6MAAAg10MAnNAAAMAAAA10g");
	var mask_4_graphics_227 = new cjs.Graphics().p("Azma6MAAAg1zMAnNAAAMAAAA1zg");
	var mask_4_graphics_228 = new cjs.Graphics().p("Azma5MAAAg1yMAnNAAAMAAAA1yg");
	var mask_4_graphics_229 = new cjs.Graphics().p("Azma5MAAAg1xMAnNAAAMAAAA1xg");
	var mask_4_graphics_230 = new cjs.Graphics().p("Azma5MAAAg1xMAnNAAAMAAAA1xg");
	var mask_4_graphics_231 = new cjs.Graphics().p("Azma4MAAAg1vMAnNAAAMAAAA1vg");
	var mask_4_graphics_232 = new cjs.Graphics().p("Azma4MAAAg1vMAnNAAAMAAAA1vg");
	var mask_4_graphics_233 = new cjs.Graphics().p("Azma3MAAAg1tMAnNAAAMAAAA1tg");
	var mask_4_graphics_234 = new cjs.Graphics().p("Azma2MAAAg1sMAnNAAAMAAAA1sg");
	var mask_4_graphics_235 = new cjs.Graphics().p("Azma2MAAAg1rMAnNAAAMAAAA1rg");
	var mask_4_graphics_236 = new cjs.Graphics().p("Azma1MAAAg1qMAnNAAAMAAAA1qg");
	var mask_4_graphics_237 = new cjs.Graphics().p("Azma1MAAAg1pMAnNAAAMAAAA1pg");
	var mask_4_graphics_238 = new cjs.Graphics().p("Azma1MAAAg1pMAnNAAAMAAAA1pg");
	var mask_4_graphics_239 = new cjs.Graphics().p("Azma0MAAAg1nMAnNAAAMAAAA1ng");
	var mask_4_graphics_240 = new cjs.Graphics().p("Azma0MAAAg1nMAnNAAAMAAAA1ng");
	var mask_4_graphics_241 = new cjs.Graphics().p("AzmazMAAAg1lMAnNAAAMAAAA1lg");
	var mask_4_graphics_242 = new cjs.Graphics().p("AzmazMAAAg1lMAnNAAAMAAAA1lg");
	var mask_4_graphics_243 = new cjs.Graphics().p("AzmayMAAAg1jMAnNAAAMAAAA1jg");
	var mask_4_graphics_244 = new cjs.Graphics().p("AzmayMAAAg1jMAnNAAAMAAAA1jg");
	var mask_4_graphics_245 = new cjs.Graphics().p("AzmaxMAAAg1hMAnNAAAMAAAA1hg");
	var mask_4_graphics_246 = new cjs.Graphics().p("AzmaxMAAAg1hMAnNAAAMAAAA1hg");
	var mask_4_graphics_247 = new cjs.Graphics().p("AzmawMAAAg1fMAnNAAAMAAAA1fg");
	var mask_4_graphics_248 = new cjs.Graphics().p("AzmawMAAAg1fMAnNAAAMAAAA1fg");
	var mask_4_graphics_249 = new cjs.Graphics().p("AzmavMAAAg1dMAnNAAAMAAAA1dg");
	var mask_4_graphics_250 = new cjs.Graphics().p("AzmavMAAAg1dMAnNAAAMAAAA1dg");
	var mask_4_graphics_251 = new cjs.Graphics().p("AzmavMAAAg1dMAnNAAAMAAAA1dg");
	var mask_4_graphics_252 = new cjs.Graphics().p("AzmauMAAAg1bMAnNAAAMAAAA1bg");
	var mask_4_graphics_253 = new cjs.Graphics().p("AzmatMAAAg1aMAnNAAAMAAAA1ag");
	var mask_4_graphics_254 = new cjs.Graphics().p("AzmatMAAAg1ZMAnNAAAMAAAA1Zg");
	var mask_4_graphics_255 = new cjs.Graphics().p("AzmasMAAAg1YMAnNAAAMAAAA1Yg");
	var mask_4_graphics_256 = new cjs.Graphics().p("AzmasMAAAg1XMAnNAAAMAAAA1Xg");
	var mask_4_graphics_257 = new cjs.Graphics().p("AzmasMAAAg1XMAnNAAAMAAAA1Xg");
	var mask_4_graphics_258 = new cjs.Graphics().p("AzmarMAAAg1VMAnNAAAMAAAA1Vg");
	var mask_4_graphics_259 = new cjs.Graphics().p("AzmarMAAAg1VMAnNAAAMAAAA1Vg");
	var mask_4_graphics_260 = new cjs.Graphics().p("AzmaqMAAAg1TMAnNAAAMAAAA1Tg");
	var mask_4_graphics_261 = new cjs.Graphics().p("AzmapMAAAg1SMAnNAAAMAAAA1Sg");
	var mask_4_graphics_262 = new cjs.Graphics().p("AzmapMAAAg1RMAnNAAAMAAAA1Rg");
	var mask_4_graphics_263 = new cjs.Graphics().p("AzmaoMAAAg1QMAnNAAAMAAAA1Qg");
	var mask_4_graphics_264 = new cjs.Graphics().p("AzmaoMAAAg1PMAnNAAAMAAAA1Pg");
	var mask_4_graphics_265 = new cjs.Graphics().p("AzmaoMAAAg1PMAnNAAAMAAAA1Pg");
	var mask_4_graphics_266 = new cjs.Graphics().p("AzmanMAAAg1NMAnNAAAMAAAA1Ng");
	var mask_4_graphics_267 = new cjs.Graphics().p("AzmanMAAAg1NMAnNAAAMAAAA1Ng");
	var mask_4_graphics_268 = new cjs.Graphics().p("AzmamMAAAg1LMAnNAAAMAAAA1Lg");
	var mask_4_graphics_269 = new cjs.Graphics().p("AzmamMAAAg1LMAnNAAAMAAAA1Lg");
	var mask_4_graphics_270 = new cjs.Graphics().p("AzmalMAAAg1JMAnNAAAMAAAA1Jg");
	var mask_4_graphics_271 = new cjs.Graphics().p("AzmalMAAAg1JMAnNAAAMAAAA1Jg");
	var mask_4_graphics_272 = new cjs.Graphics().p("AzmakMAAAg1HMAnNAAAMAAAA1Hg");
	var mask_4_graphics_273 = new cjs.Graphics().p("AzmakMAAAg1HMAnNAAAMAAAA1Hg");
	var mask_4_graphics_274 = new cjs.Graphics().p("AzmajMAAAg1FMAnNAAAMAAAA1Fg");
	var mask_4_graphics_275 = new cjs.Graphics().p("AzmajMAAAg1FMAnNAAAMAAAA1Fg");
	var mask_4_graphics_276 = new cjs.Graphics().p("AzmaiMAAAg1DMAnNAAAMAAAA1Dg");
	var mask_4_graphics_277 = new cjs.Graphics().p("AzmaiMAAAg1DMAnNAAAMAAAA1Dg");
	var mask_4_graphics_278 = new cjs.Graphics().p("AzmaiMAAAg1DMAnNAAAMAAAA1Dg");
	var mask_4_graphics_279 = new cjs.Graphics().p("AzmahMAAAg1BMAnNAAAMAAAA1Bg");
	var mask_4_graphics_280 = new cjs.Graphics().p("AzmagMAAAg1AMAnNAAAMAAAA1Ag");
	var mask_4_graphics_281 = new cjs.Graphics().p("AzmagMAAAg0/MAnNAAAMAAAA0/g");
	var mask_4_graphics_282 = new cjs.Graphics().p("AzmafMAAAg0+MAnNAAAMAAAA0+g");
	var mask_4_graphics_283 = new cjs.Graphics().p("AzmafMAAAg09MAnNAAAMAAAA09g");
	var mask_4_graphics_284 = new cjs.Graphics().p("AzmaeMAAAg08MAnNAAAMAAAA08g");
	var mask_4_graphics_285 = new cjs.Graphics().p("AzmaeMAAAg07MAnNAAAMAAAA07g");
	var mask_4_graphics_286 = new cjs.Graphics().p("AzmaeMAAAg07MAnNAAAMAAAA07g");
	var mask_4_graphics_287 = new cjs.Graphics().p("AzmadMAAAg05MAnNAAAMAAAA05g");
	var mask_4_graphics_288 = new cjs.Graphics().p("AzmadMAAAg05MAnNAAAMAAAA05g");
	var mask_4_graphics_289 = new cjs.Graphics().p("AzmacMAAAg03MAnNAAAMAAAA03g");
	var mask_4_graphics_290 = new cjs.Graphics().p("AzmabMAAAg02MAnNAAAMAAAA02g");
	var mask_4_graphics_291 = new cjs.Graphics().p("AzmabMAAAg01MAnNAAAMAAAA01g");
	var mask_4_graphics_292 = new cjs.Graphics().p("AzmabMAAAg01MAnNAAAMAAAA01g");
	var mask_4_graphics_293 = new cjs.Graphics().p("AzmaaMAAAg0zMAnNAAAMAAAA0zg");
	var mask_4_graphics_294 = new cjs.Graphics().p("AzmaaMAAAg0zMAnNAAAMAAAA0zg");
	var mask_4_graphics_295 = new cjs.Graphics().p("AzmaZMAAAg0xMAnNAAAMAAAA0xg");
	var mask_4_graphics_296 = new cjs.Graphics().p("AzmaZMAAAg0xMAnNAAAMAAAA0xg");
	var mask_4_graphics_297 = new cjs.Graphics().p("AzmaYMAAAg0vMAnNAAAMAAAA0vg");
	var mask_4_graphics_298 = new cjs.Graphics().p("AzmaYMAAAg0vMAnNAAAMAAAA0vg");
	var mask_4_graphics_299 = new cjs.Graphics().p("AzmaXMAAAg0tMAnNAAAMAAAA0tg");
	var mask_4_graphics_300 = new cjs.Graphics().p("AzmaXMAAAg0tMAnNAAAMAAAA0tg");
	var mask_4_graphics_301 = new cjs.Graphics().p("AzmaWMAAAg0rMAnNAAAMAAAA0rg");
	var mask_4_graphics_302 = new cjs.Graphics().p("AzmaWMAAAg0rMAnNAAAMAAAA0rg");
	var mask_4_graphics_303 = new cjs.Graphics().p("AzmaVMAAAg0pMAnNAAAMAAAA0pg");
	var mask_4_graphics_304 = new cjs.Graphics().p("AzmaVMAAAg0pMAnNAAAMAAAA0pg");
	var mask_4_graphics_305 = new cjs.Graphics().p("AzmaVMAAAg0pMAnNAAAMAAAA0pg");
	var mask_4_graphics_306 = new cjs.Graphics().p("AzmaUMAAAg0nMAnNAAAMAAAA0ng");
	var mask_4_graphics_307 = new cjs.Graphics().p("AzmaUMAAAg0nMAnNAAAMAAAA0ng");
	var mask_4_graphics_308 = new cjs.Graphics().p("AzmaTMAAAg0lMAnNAAAMAAAA0lg");
	var mask_4_graphics_309 = new cjs.Graphics().p("AzmaSMAAAg0kMAnNAAAMAAAA0kg");
	var mask_4_graphics_310 = new cjs.Graphics().p("AzmaSMAAAg0jMAnNAAAMAAAA0jg");
	var mask_4_graphics_311 = new cjs.Graphics().p("AzmaRMAAAg0iMAnNAAAMAAAA0ig");
	var mask_4_graphics_312 = new cjs.Graphics().p("AzmaRMAAAg0hMAnNAAAMAAAA0hg");
	var mask_4_graphics_313 = new cjs.Graphics().p("AzmaRMAAAg0hMAnNAAAMAAAA0hg");
	var mask_4_graphics_314 = new cjs.Graphics().p("AzmaQMAAAg0fMAnNAAAMAAAA0fg");
	var mask_4_graphics_315 = new cjs.Graphics().p("AzmaQMAAAg0fMAnNAAAMAAAA0fg");
	var mask_4_graphics_316 = new cjs.Graphics().p("AzmaPMAAAg0dMAnNAAAMAAAA0dg");
	var mask_4_graphics_317 = new cjs.Graphics().p("AzmaOMAAAg0cMAnNAAAMAAAA0cg");
	var mask_4_graphics_318 = new cjs.Graphics().p("AzmaOMAAAg0bMAnNAAAMAAAA0bg");
	var mask_4_graphics_319 = new cjs.Graphics().p("AzmaOMAAAg0bMAnNAAAMAAAA0bg");
	var mask_4_graphics_320 = new cjs.Graphics().p("AzmaNMAAAg0ZMAnNAAAMAAAA0Zg");
	var mask_4_graphics_321 = new cjs.Graphics().p("AzmaNMAAAg0ZMAnNAAAMAAAA0Zg");
	var mask_4_graphics_322 = new cjs.Graphics().p("AzmaMMAAAg0XMAnNAAAMAAAA0Xg");
	var mask_4_graphics_323 = new cjs.Graphics().p("AzmaMMAAAg0XMAnNAAAMAAAA0Xg");
	var mask_4_graphics_324 = new cjs.Graphics().p("AzmaLMAAAg0VMAnNAAAMAAAA0Vg");
	var mask_4_graphics_325 = new cjs.Graphics().p("AzmaLMAAAg0VMAnNAAAMAAAA0Vg");
	var mask_4_graphics_326 = new cjs.Graphics().p("AzmaKMAAAg0TMAnNAAAMAAAA0Tg");
	var mask_4_graphics_327 = new cjs.Graphics().p("AzmaKMAAAg0TMAnNAAAMAAAA0Tg");
	var mask_4_graphics_328 = new cjs.Graphics().p("AzmaJMAAAg0RMAnNAAAMAAAA0Rg");
	var mask_4_graphics_329 = new cjs.Graphics().p("AzmaJMAAAg0RMAnNAAAMAAAA0Rg");
	var mask_4_graphics_330 = new cjs.Graphics().p("AzmaIMAAAg0PMAnNAAAMAAAA0Pg");
	var mask_4_graphics_331 = new cjs.Graphics().p("AzmaIMAAAg0PMAnNAAAMAAAA0Pg");
	var mask_4_graphics_332 = new cjs.Graphics().p("AzmaHMAAAg0NMAnNAAAMAAAA0Ng");
	var mask_4_graphics_333 = new cjs.Graphics().p("AzmaHMAAAg0NMAnNAAAMAAAA0Ng");
	var mask_4_graphics_334 = new cjs.Graphics().p("AzmaHMAAAg0NMAnNAAAMAAAA0Ng");
	var mask_4_graphics_335 = new cjs.Graphics().p("AzmaGMAAAg0LMAnNAAAMAAAA0Lg");
	var mask_4_graphics_336 = new cjs.Graphics().p("AzmaFMAAAg0KMAnNAAAMAAAA0Kg");
	var mask_4_graphics_337 = new cjs.Graphics().p("AzmaFMAAAg0JMAnNAAAMAAAA0Jg");
	var mask_4_graphics_338 = new cjs.Graphics().p("AzmaEMAAAg0IMAnNAAAMAAAA0Ig");
	var mask_4_graphics_339 = new cjs.Graphics().p("AzmaEMAAAg0HMAnNAAAMAAAA0Hg");
	var mask_4_graphics_340 = new cjs.Graphics().p("AzmaEMAAAg0HMAnNAAAMAAAA0Hg");
	var mask_4_graphics_341 = new cjs.Graphics().p("AzmaDMAAAg0FMAnNAAAMAAAA0Fg");
	var mask_4_graphics_342 = new cjs.Graphics().p("AzmaDMAAAg0FMAnNAAAMAAAA0Fg");
	var mask_4_graphics_343 = new cjs.Graphics().p("AzmaCMAAAg0DMAnNAAAMAAAA0Dg");
	var mask_4_graphics_344 = new cjs.Graphics().p("AzmaCMAAAg0DMAnNAAAMAAAA0Dg");
	var mask_4_graphics_345 = new cjs.Graphics().p("AzmaBMAAAg0BMAnNAAAMAAAA0Bg");
	var mask_4_graphics_346 = new cjs.Graphics().p("AzmaAMAAAg0AMAnNAAAMAAAA0Ag");
	var mask_4_graphics_347 = new cjs.Graphics().p("AzmaAMAAAgz/MAnNAAAMAAAAz/g");
	var mask_4_graphics_348 = new cjs.Graphics().p("AzmaAMAAAgz/MAnNAAAMAAAAz/g");
	var mask_4_graphics_349 = new cjs.Graphics().p("AzmZ/MAAAgz9MAnNAAAMAAAAz9g");
	var mask_4_graphics_350 = new cjs.Graphics().p("AzmZ/MAAAgz9MAnNAAAMAAAAz9g");
	var mask_4_graphics_351 = new cjs.Graphics().p("AzmZ+MAAAgz7MAnNAAAMAAAAz7g");
	var mask_4_graphics_352 = new cjs.Graphics().p("AzmZ+MAAAgz7MAnNAAAMAAAAz7g");
	var mask_4_graphics_353 = new cjs.Graphics().p("AzmZ9MAAAgz5MAnNAAAMAAAAz5g");
	var mask_4_graphics_354 = new cjs.Graphics().p("AzmZ9MAAAgz5MAnNAAAMAAAAz5g");
	var mask_4_graphics_355 = new cjs.Graphics().p("AzmZ8MAAAgz3MAnNAAAMAAAAz3g");
	var mask_4_graphics_356 = new cjs.Graphics().p("AzmZ8MAAAgz3MAnNAAAMAAAAz3g");
	var mask_4_graphics_357 = new cjs.Graphics().p("AzmZ7MAAAgz1MAnNAAAMAAAAz1g");
	var mask_4_graphics_358 = new cjs.Graphics().p("AzmZ7MAAAgz1MAnNAAAMAAAAz1g");
	var mask_4_graphics_359 = new cjs.Graphics().p("AzmZ6MAAAgzzMAnNAAAMAAAAzzg");
	var mask_4_graphics_360 = new cjs.Graphics().p("AzmZ6MAAAgzzMAnNAAAMAAAAzzg");
	var mask_4_graphics_361 = new cjs.Graphics().p("AzmZ6MAAAgzzMAnNAAAMAAAAzzg");
	var mask_4_graphics_362 = new cjs.Graphics().p("AzmZ5MAAAgzxMAnNAAAMAAAAzxg");
	var mask_4_graphics_363 = new cjs.Graphics().p("AzmZ5MAAAgzxMAnNAAAMAAAAzxg");
	var mask_4_graphics_364 = new cjs.Graphics().p("AzmZ4MAAAgzvMAnNAAAMAAAAzvg");
	var mask_4_graphics_365 = new cjs.Graphics().p("AzmZ3MAAAgzuMAnNAAAMAAAAzug");
	var mask_4_graphics_366 = new cjs.Graphics().p("AzmZ3MAAAgztMAnNAAAMAAAAztg");
	var mask_4_graphics_367 = new cjs.Graphics().p("AzmZ2MAAAgzsMAnNAAAMAAAAzsg");
	var mask_4_graphics_368 = new cjs.Graphics().p("AzmZ2MAAAgzrMAnNAAAMAAAAzrg");
	var mask_4_graphics_369 = new cjs.Graphics().p("AzmZ2MAAAgzrMAnNAAAMAAAAzrg");
	var mask_4_graphics_370 = new cjs.Graphics().p("AzmZ1MAAAgzpMAnNAAAMAAAAzpg");
	var mask_4_graphics_371 = new cjs.Graphics().p("AzmZ1MAAAgzpMAnNAAAMAAAAzpg");
	var mask_4_graphics_372 = new cjs.Graphics().p("AzmZ0MAAAgznMAnNAAAMAAAAzng");
	var mask_4_graphics_373 = new cjs.Graphics().p("AzmZzMAAAgzmMAnNAAAMAAAAzmg");
	var mask_4_graphics_374 = new cjs.Graphics().p("AzmZzMAAAgzlMAnNAAAMAAAAzlg");
	var mask_4_graphics_375 = new cjs.Graphics().p("AzmZzMAAAgzlMAnNAAAMAAAAzlg");
	var mask_4_graphics_376 = new cjs.Graphics().p("AzmZyMAAAgzjMAnNAAAMAAAAzjg");
	var mask_4_graphics_377 = new cjs.Graphics().p("AzmZyMAAAgzjMAnNAAAMAAAAzjg");
	var mask_4_graphics_378 = new cjs.Graphics().p("AzmZxMAAAgzhMAnNAAAMAAAAzhg");
	var mask_4_graphics_379 = new cjs.Graphics().p("AzmZxMAAAgzhMAnNAAAMAAAAzhg");
	var mask_4_graphics_380 = new cjs.Graphics().p("AzmZwMAAAgzfMAnNAAAMAAAAzfg");
	var mask_4_graphics_381 = new cjs.Graphics().p("AzmZwMAAAgzfMAnNAAAMAAAAzfg");
	var mask_4_graphics_382 = new cjs.Graphics().p("AzmZvMAAAgzdMAnNAAAMAAAAzdg");
	var mask_4_graphics_383 = new cjs.Graphics().p("AzmZvMAAAgzdMAnNAAAMAAAAzdg");
	var mask_4_graphics_384 = new cjs.Graphics().p("AzmZuMAAAgzbMAnNAAAMAAAAzbg");
	var mask_4_graphics_385 = new cjs.Graphics().p("AzmZuMAAAgzbMAnNAAAMAAAAzbg");
	var mask_4_graphics_386 = new cjs.Graphics().p("AzmZtMAAAgzZMAnNAAAMAAAAzZg");
	var mask_4_graphics_387 = new cjs.Graphics().p("AzmZtMAAAgzZMAnNAAAMAAAAzZg");
	var mask_4_graphics_388 = new cjs.Graphics().p("AzmZtMAAAgzZMAnNAAAMAAAAzZg");
	var mask_4_graphics_389 = new cjs.Graphics().p("AzmZsMAAAgzXMAnNAAAMAAAAzXg");
	var mask_4_graphics_390 = new cjs.Graphics().p("AzmZsMAAAgzXMAnNAAAMAAAAzXg");
	var mask_4_graphics_391 = new cjs.Graphics().p("AzmZrMAAAgzVMAnNAAAMAAAAzVg");
	var mask_4_graphics_392 = new cjs.Graphics().p("AzmZqMAAAgzUMAnNAAAMAAAAzUg");
	var mask_4_graphics_393 = new cjs.Graphics().p("AzmZqMAAAgzTMAnNAAAMAAAAzTg");
	var mask_4_graphics_394 = new cjs.Graphics().p("AzmZpMAAAgzSMAnNAAAMAAAAzSg");
	var mask_4_graphics_395 = new cjs.Graphics().p("AzmZpMAAAgzRMAnNAAAMAAAAzRg");
	var mask_4_graphics_396 = new cjs.Graphics().p("AzmZpMAAAgzRMAnNAAAMAAAAzRg");
	var mask_4_graphics_397 = new cjs.Graphics().p("AzmZoMAAAgzPMAnNAAAMAAAAzPg");
	var mask_4_graphics_398 = new cjs.Graphics().p("AzmZoMAAAgzPMAnNAAAMAAAAzPg");
	var mask_4_graphics_399 = new cjs.Graphics().p("AzmZnMAAAgzNMAnNAAAMAAAAzNg");
	var mask_4_graphics_400 = new cjs.Graphics().p("AzmZnMAAAgzNMAnNAAAMAAAAzNg");
	var mask_4_graphics_401 = new cjs.Graphics().p("AzmZmMAAAgzLMAnNAAAMAAAAzLg");
	var mask_4_graphics_402 = new cjs.Graphics().p("AzmZmMAAAgzLMAnNAAAMAAAAzLg");
	var mask_4_graphics_403 = new cjs.Graphics().p("AzmZlMAAAgzJMAnNAAAMAAAAzJg");
	var mask_4_graphics_404 = new cjs.Graphics().p("AzmZlMAAAgzJMAnNAAAMAAAAzJg");
	var mask_4_graphics_405 = new cjs.Graphics().p("AzmZkMAAAgzHMAnNAAAMAAAAzHg");
	var mask_4_graphics_406 = new cjs.Graphics().p("AzmZkMAAAgzHMAnNAAAMAAAAzHg");
	var mask_4_graphics_407 = new cjs.Graphics().p("AzmZjMAAAgzFMAnNAAAMAAAAzFg");
	var mask_4_graphics_408 = new cjs.Graphics().p("AzmZjMAAAgzFMAnNAAAMAAAAzFg");
	var mask_4_graphics_409 = new cjs.Graphics().p("AzmZiMAAAgzDMAnNAAAMAAAAzDg");
	var mask_4_graphics_410 = new cjs.Graphics().p("AzmZiMAAAgzDMAnNAAAMAAAAzDg");
	var mask_4_graphics_411 = new cjs.Graphics().p("AzmZhMAAAgzBMAnNAAAMAAAAzBg");
	var mask_4_graphics_412 = new cjs.Graphics().p("AzmZhMAAAgzBMAnNAAAMAAAAzBg");
	var mask_4_graphics_413 = new cjs.Graphics().p("AzmZgMAAAgy/MAnNAAAMAAAAy/g");
	var mask_4_graphics_414 = new cjs.Graphics().p("AzmZgMAAAgy/MAnNAAAMAAAAy/g");
	var mask_4_graphics_415 = new cjs.Graphics().p("AzmZfMAAAgy+MAnNAAAMAAAAy+g");
	var mask_4_graphics_416 = new cjs.Graphics().p("AzmZfMAAAgy9MAnNAAAMAAAAy9g");
	var mask_4_graphics_417 = new cjs.Graphics().p("AzmZfMAAAgy9MAnNAAAMAAAAy9g");
	var mask_4_graphics_418 = new cjs.Graphics().p("AzmZeMAAAgy7MAnNAAAMAAAAy7g");
	var mask_4_graphics_419 = new cjs.Graphics().p("AzmZeMAAAgy7MAnNAAAMAAAAy7g");
	var mask_4_graphics_420 = new cjs.Graphics().p("AzmZdMAAAgy5MAnNAAAMAAAAy5g");
	var mask_4_graphics_421 = new cjs.Graphics().p("AzmZcMAAAgy4MAnNAAAMAAAAy4g");
	var mask_4_graphics_422 = new cjs.Graphics().p("AzmZcMAAAgy3MAnNAAAMAAAAy3g");
	var mask_4_graphics_423 = new cjs.Graphics().p("AzmZbMAAAgy2MAnNAAAMAAAAy2g");
	var mask_4_graphics_424 = new cjs.Graphics().p("AzmZbMAAAgy1MAnNAAAMAAAAy1g");
	var mask_4_graphics_425 = new cjs.Graphics().p("AzmZbMAAAgy1MAnNAAAMAAAAy1g");
	var mask_4_graphics_426 = new cjs.Graphics().p("AzmZaMAAAgyzMAnNAAAMAAAAyzg");
	var mask_4_graphics_427 = new cjs.Graphics().p("AzmZaMAAAgyzMAnNAAAMAAAAyzg");
	var mask_4_graphics_428 = new cjs.Graphics().p("AzmZZMAAAgyxMAnNAAAMAAAAyxg");
	var mask_4_graphics_429 = new cjs.Graphics().p("AzmZZMAAAgyxMAnNAAAMAAAAyxg");
	var mask_4_graphics_430 = new cjs.Graphics().p("AzmZYMAAAgyvMAnNAAAMAAAAyvg");
	var mask_4_graphics_431 = new cjs.Graphics().p("AzmZYMAAAgyvMAnNAAAMAAAAyvg");
	var mask_4_graphics_432 = new cjs.Graphics().p("AzmZXMAAAgytMAnNAAAMAAAAytg");
	var mask_4_graphics_433 = new cjs.Graphics().p("AzmZXMAAAgytMAnNAAAMAAAAytg");
	var mask_4_graphics_434 = new cjs.Graphics().p("AzmZWMAAAgyrMAnNAAAMAAAAyrg");
	var mask_4_graphics_435 = new cjs.Graphics().p("AzmZWMAAAgyrMAnNAAAMAAAAyrg");
	var mask_4_graphics_436 = new cjs.Graphics().p("AzmZVMAAAgypMAnNAAAMAAAAypg");
	var mask_4_graphics_437 = new cjs.Graphics().p("AzmZVMAAAgypMAnNAAAMAAAAypg");
	var mask_4_graphics_438 = new cjs.Graphics().p("AzmZUMAAAgynMAnNAAAMAAAAyng");
	var mask_4_graphics_439 = new cjs.Graphics().p("AzmZUMAAAgynMAnNAAAMAAAAyng");
	var mask_4_graphics_440 = new cjs.Graphics().p("AzmZTMAAAgylMAnNAAAMAAAAylg");
	var mask_4_graphics_441 = new cjs.Graphics().p("AzmZTMAAAgylMAnNAAAMAAAAylg");
	var mask_4_graphics_442 = new cjs.Graphics().p("AzmZSMAAAgyjMAnNAAAMAAAAyjg");
	var mask_4_graphics_443 = new cjs.Graphics().p("AzmZSMAAAgyjMAnNAAAMAAAAyjg");
	var mask_4_graphics_444 = new cjs.Graphics().p("AzmZSMAAAgyjMAnNAAAMAAAAyjg");
	var mask_4_graphics_445 = new cjs.Graphics().p("AzmZRMAAAgyhMAnNAAAMAAAAyhg");
	var mask_4_graphics_446 = new cjs.Graphics().p("AzmZRMAAAgyhMAnNAAAMAAAAyhg");
	var mask_4_graphics_447 = new cjs.Graphics().p("AzmZQMAAAgyfMAnNAAAMAAAAyfg");
	var mask_4_graphics_448 = new cjs.Graphics().p("AzmZPMAAAgyeMAnNAAAMAAAAyeg");
	var mask_4_graphics_449 = new cjs.Graphics().p("AzmZPMAAAgydMAnNAAAMAAAAydg");
	var mask_4_graphics_450 = new cjs.Graphics().p("AzmZOMAAAgycMAnNAAAMAAAAycg");
	var mask_4_graphics_451 = new cjs.Graphics().p("AzmZOMAAAgybMAnNAAAMAAAAybg");
	var mask_4_graphics_452 = new cjs.Graphics().p("AzmZNMAAAgyaMAnNAAAMAAAAyag");
	var mask_4_graphics_453 = new cjs.Graphics().p("AzmZNMAAAgyZMAnNAAAMAAAAyZg");
	var mask_4_graphics_454 = new cjs.Graphics().p("AzmZNMAAAgyZMAnNAAAMAAAAyZg");
	var mask_4_graphics_455 = new cjs.Graphics().p("AzmZMMAAAgyXMAnNAAAMAAAAyXg");
	var mask_4_graphics_456 = new cjs.Graphics().p("AzmZMMAAAgyXMAnNAAAMAAAAyXg");
	var mask_4_graphics_457 = new cjs.Graphics().p("AzmZLMAAAgyVMAnNAAAMAAAAyVg");
	var mask_4_graphics_458 = new cjs.Graphics().p("AzmZLMAAAgyVMAnNAAAMAAAAyVg");
	var mask_4_graphics_459 = new cjs.Graphics().p("AzmZKMAAAgyTMAnNAAAMAAAAyTg");
	var mask_4_graphics_460 = new cjs.Graphics().p("AzmZKMAAAgyTMAnNAAAMAAAAyTg");
	var mask_4_graphics_461 = new cjs.Graphics().p("AzmZJMAAAgyRMAnNAAAMAAAAyRg");
	var mask_4_graphics_462 = new cjs.Graphics().p("AzmZJMAAAgyRMAnNAAAMAAAAyRg");
	var mask_4_graphics_463 = new cjs.Graphics().p("AzmZIMAAAgyPMAnNAAAMAAAAyPg");
	var mask_4_graphics_464 = new cjs.Graphics().p("AzmZIMAAAgyPMAnNAAAMAAAAyPg");
	var mask_4_graphics_465 = new cjs.Graphics().p("AzmZHMAAAgyNMAnNAAAMAAAAyNg");
	var mask_4_graphics_466 = new cjs.Graphics().p("AzmZHMAAAgyNMAnNAAAMAAAAyNg");
	var mask_4_graphics_467 = new cjs.Graphics().p("AzmZGMAAAgyLMAnNAAAMAAAAyLg");
	var mask_4_graphics_468 = new cjs.Graphics().p("AzmZGMAAAgyLMAnNAAAMAAAAyLg");
	var mask_4_graphics_469 = new cjs.Graphics().p("AzmZFMAAAgyJMAnNAAAMAAAAyJg");
	var mask_4_graphics_470 = new cjs.Graphics().p("AzmZFMAAAgyJMAnNAAAMAAAAyJg");
	var mask_4_graphics_471 = new cjs.Graphics().p("AzmZEMAAAgyIMAnNAAAMAAAAyIg");
	var mask_4_graphics_472 = new cjs.Graphics().p("AzmZEMAAAgyHMAnNAAAMAAAAyHg");
	var mask_4_graphics_473 = new cjs.Graphics().p("AzmZEMAAAgyHMAnNAAAMAAAAyHg");
	var mask_4_graphics_474 = new cjs.Graphics().p("AzmZDMAAAgyFMAnNAAAMAAAAyFg");
	var mask_4_graphics_475 = new cjs.Graphics().p("AzmZDMAAAgyFMAnNAAAMAAAAyFg");
	var mask_4_graphics_476 = new cjs.Graphics().p("AzmZCMAAAgyDMAnNAAAMAAAAyDg");
	var mask_4_graphics_477 = new cjs.Graphics().p("AzmZBMAAAgyCMAnNAAAMAAAAyCg");
	var mask_4_graphics_478 = new cjs.Graphics().p("AzmZBMAAAgyBMAnNAAAMAAAAyBg");
	var mask_4_graphics_479 = new cjs.Graphics().p("AzmZAMAAAgyAMAnNAAAMAAAAyAg");
	var mask_4_graphics_480 = new cjs.Graphics().p("AzmZAMAAAgx/MAnNAAAMAAAAx/g");
	var mask_4_graphics_481 = new cjs.Graphics().p("AzmZAMAAAgx/MAnNAAAMAAAAx/g");
	var mask_4_graphics_482 = new cjs.Graphics().p("AzmY/MAAAgx9MAnNAAAMAAAAx9g");
	var mask_4_graphics_483 = new cjs.Graphics().p("AzmY/MAAAgx9MAnNAAAMAAAAx9g");
	var mask_4_graphics_484 = new cjs.Graphics().p("AzmY+MAAAgx7MAnNAAAMAAAAx7g");
	var mask_4_graphics_485 = new cjs.Graphics().p("AzmY+MAAAgx7MAnNAAAMAAAAx7g");
	var mask_4_graphics_486 = new cjs.Graphics().p("AzmY9MAAAgx5MAnNAAAMAAAAx5g");
	var mask_4_graphics_487 = new cjs.Graphics().p("AzmY9MAAAgx5MAnNAAAMAAAAx5g");
	var mask_4_graphics_488 = new cjs.Graphics().p("AzmY8MAAAgx3MAnNAAAMAAAAx3g");
	var mask_4_graphics_489 = new cjs.Graphics().p("AzmY8MAAAgx3MAnNAAAMAAAAx3g");
	var mask_4_graphics_490 = new cjs.Graphics().p("AzmY7MAAAgx1MAnNAAAMAAAAx1g");
	var mask_4_graphics_491 = new cjs.Graphics().p("AzmY7MAAAgx1MAnNAAAMAAAAx1g");
	var mask_4_graphics_492 = new cjs.Graphics().p("AzmY6MAAAgxzMAnNAAAMAAAAxzg");
	var mask_4_graphics_493 = new cjs.Graphics().p("AzmY6MAAAgxzMAnNAAAMAAAAxzg");
	var mask_4_graphics_494 = new cjs.Graphics().p("AzmY5MAAAgxxMAnNAAAMAAAAxxg");
	var mask_4_graphics_495 = new cjs.Graphics().p("AzmY5MAAAgxxMAnNAAAMAAAAxxg");
	var mask_4_graphics_496 = new cjs.Graphics().p("AzmY4MAAAgxvMAnNAAAMAAAAxvg");
	var mask_4_graphics_497 = new cjs.Graphics().p("AzmY4MAAAgxvMAnNAAAMAAAAxvg");
	var mask_4_graphics_498 = new cjs.Graphics().p("AzmY3MAAAgxuMAnNAAAMAAAAxug");
	var mask_4_graphics_499 = new cjs.Graphics().p("AzmY3MAAAgxtMAnNAAAMAAAAxtg");
	var mask_4_graphics_500 = new cjs.Graphics().p("AzmY3MAAAgxtMAnNAAAMAAAAxtg");
	var mask_4_graphics_501 = new cjs.Graphics().p("AzmY2MAAAgxrMAnNAAAMAAAAxrg");
	var mask_4_graphics_502 = new cjs.Graphics().p("AzmY2MAAAgxrMAnNAAAMAAAAxrg");
	var mask_4_graphics_503 = new cjs.Graphics().p("AzmY1MAAAgxpMAnNAAAMAAAAxpg");
	var mask_4_graphics_504 = new cjs.Graphics().p("AzmY0MAAAgxoMAnNAAAMAAAAxog");
	var mask_4_graphics_505 = new cjs.Graphics().p("AzmY0MAAAgxnMAnNAAAMAAAAxng");
	var mask_4_graphics_506 = new cjs.Graphics().p("AzmYzMAAAgxmMAnNAAAMAAAAxmg");
	var mask_4_graphics_507 = new cjs.Graphics().p("AzmYzMAAAgxlMAnNAAAMAAAAxlg");
	var mask_4_graphics_508 = new cjs.Graphics().p("AzmYyMAAAgxkMAnNAAAMAAAAxkg");
	var mask_4_graphics_509 = new cjs.Graphics().p("AzmYyMAAAgxjMAnNAAAMAAAAxjg");
	var mask_4_graphics_510 = new cjs.Graphics().p("AzmYyMAAAgxjMAnNAAAMAAAAxjg");
	var mask_4_graphics_511 = new cjs.Graphics().p("AzmYxMAAAgxhMAnNAAAMAAAAxhg");
	var mask_4_graphics_512 = new cjs.Graphics().p("AzmYxMAAAgxhMAnNAAAMAAAAxhg");
	var mask_4_graphics_513 = new cjs.Graphics().p("AzmYwMAAAgxfMAnNAAAMAAAAxfg");
	var mask_4_graphics_514 = new cjs.Graphics().p("AzmYwMAAAgxfMAnNAAAMAAAAxfg");
	var mask_4_graphics_515 = new cjs.Graphics().p("AzmYvMAAAgxdMAnNAAAMAAAAxdg");
	var mask_4_graphics_516 = new cjs.Graphics().p("AzmYvMAAAgxdMAnNAAAMAAAAxdg");
	var mask_4_graphics_517 = new cjs.Graphics().p("AzmYuMAAAgxbMAnNAAAMAAAAxbg");
	var mask_4_graphics_518 = new cjs.Graphics().p("AzmYuMAAAgxbMAnNAAAMAAAAxbg");

	this.timeline.addTween(cjs.Tween.get(mask_4).to({graphics:null,x:0,y:0}).wait(147).to({graphics:mask_4_graphics_147,x:-136.775,y:153.05}).wait(1).to({graphics:mask_4_graphics_148,x:-136.775,y:153}).wait(1).to({graphics:mask_4_graphics_149,x:-136.775,y:152.95}).wait(1).to({graphics:mask_4_graphics_150,x:-136.775,y:152.9}).wait(1).to({graphics:mask_4_graphics_151,x:-136.775,y:152.85}).wait(1).to({graphics:mask_4_graphics_152,x:-136.775,y:152.8}).wait(1).to({graphics:mask_4_graphics_153,x:-136.775,y:152.75}).wait(1).to({graphics:mask_4_graphics_154,x:-136.775,y:152.725}).wait(1).to({graphics:mask_4_graphics_155,x:-136.775,y:152.675}).wait(1).to({graphics:mask_4_graphics_156,x:-136.775,y:152.625}).wait(1).to({graphics:mask_4_graphics_157,x:-136.775,y:152.575}).wait(1).to({graphics:mask_4_graphics_158,x:-136.775,y:152.525}).wait(1).to({graphics:mask_4_graphics_159,x:-136.775,y:152.475}).wait(1).to({graphics:mask_4_graphics_160,x:-136.775,y:152.425}).wait(1).to({graphics:mask_4_graphics_161,x:-136.775,y:152.375}).wait(1).to({graphics:mask_4_graphics_162,x:-136.775,y:152.325}).wait(1).to({graphics:mask_4_graphics_163,x:-136.775,y:152.275}).wait(1).to({graphics:mask_4_graphics_164,x:-136.775,y:152.225}).wait(1).to({graphics:mask_4_graphics_165,x:-136.775,y:152.175}).wait(1).to({graphics:mask_4_graphics_166,x:-136.775,y:152.125}).wait(1).to({graphics:mask_4_graphics_167,x:-136.775,y:152.075}).wait(1).to({graphics:mask_4_graphics_168,x:-136.775,y:152.05}).wait(1).to({graphics:mask_4_graphics_169,x:-136.775,y:152}).wait(1).to({graphics:mask_4_graphics_170,x:-136.775,y:151.95}).wait(1).to({graphics:mask_4_graphics_171,x:-136.775,y:151.9}).wait(1).to({graphics:mask_4_graphics_172,x:-136.775,y:151.85}).wait(1).to({graphics:mask_4_graphics_173,x:-136.775,y:151.8}).wait(1).to({graphics:mask_4_graphics_174,x:-136.775,y:151.75}).wait(1).to({graphics:mask_4_graphics_175,x:-136.775,y:151.7}).wait(1).to({graphics:mask_4_graphics_176,x:-136.775,y:151.65}).wait(1).to({graphics:mask_4_graphics_177,x:-136.775,y:151.6}).wait(1).to({graphics:mask_4_graphics_178,x:-136.775,y:151.55}).wait(1).to({graphics:mask_4_graphics_179,x:-136.775,y:151.5}).wait(1).to({graphics:mask_4_graphics_180,x:-136.775,y:151.45}).wait(1).to({graphics:mask_4_graphics_181,x:-136.775,y:151.4}).wait(1).to({graphics:mask_4_graphics_182,x:-136.775,y:151.375}).wait(1).to({graphics:mask_4_graphics_183,x:-136.775,y:151.325}).wait(1).to({graphics:mask_4_graphics_184,x:-136.775,y:151.275}).wait(1).to({graphics:mask_4_graphics_185,x:-136.775,y:151.225}).wait(1).to({graphics:mask_4_graphics_186,x:-136.775,y:151.175}).wait(1).to({graphics:mask_4_graphics_187,x:-136.775,y:151.125}).wait(1).to({graphics:mask_4_graphics_188,x:-136.775,y:151.075}).wait(1).to({graphics:mask_4_graphics_189,x:-136.775,y:151.025}).wait(1).to({graphics:mask_4_graphics_190,x:-136.775,y:150.975}).wait(1).to({graphics:mask_4_graphics_191,x:-136.775,y:150.925}).wait(1).to({graphics:mask_4_graphics_192,x:-136.775,y:150.875}).wait(1).to({graphics:mask_4_graphics_193,x:-136.775,y:150.825}).wait(1).to({graphics:mask_4_graphics_194,x:-136.775,y:150.775}).wait(1).to({graphics:mask_4_graphics_195,x:-136.775,y:150.725}).wait(1).to({graphics:mask_4_graphics_196,x:-136.775,y:150.7}).wait(1).to({graphics:mask_4_graphics_197,x:-136.775,y:150.65}).wait(1).to({graphics:mask_4_graphics_198,x:-136.775,y:150.6}).wait(1).to({graphics:mask_4_graphics_199,x:-136.775,y:150.55}).wait(1).to({graphics:mask_4_graphics_200,x:-136.775,y:150.5}).wait(1).to({graphics:mask_4_graphics_201,x:-136.775,y:150.45}).wait(1).to({graphics:mask_4_graphics_202,x:-136.775,y:150.4}).wait(1).to({graphics:mask_4_graphics_203,x:-136.775,y:150.35}).wait(1).to({graphics:mask_4_graphics_204,x:-136.775,y:150.3}).wait(1).to({graphics:mask_4_graphics_205,x:-136.775,y:150.25}).wait(1).to({graphics:mask_4_graphics_206,x:-136.775,y:150.2}).wait(1).to({graphics:mask_4_graphics_207,x:-136.775,y:150.15}).wait(1).to({graphics:mask_4_graphics_208,x:-136.775,y:150.1}).wait(1).to({graphics:mask_4_graphics_209,x:-136.775,y:150.075}).wait(1).to({graphics:mask_4_graphics_210,x:-136.775,y:150.025}).wait(1).to({graphics:mask_4_graphics_211,x:-136.775,y:149.975}).wait(1).to({graphics:mask_4_graphics_212,x:-136.775,y:149.925}).wait(1).to({graphics:mask_4_graphics_213,x:-136.775,y:149.875}).wait(1).to({graphics:mask_4_graphics_214,x:-136.775,y:149.825}).wait(1).to({graphics:mask_4_graphics_215,x:-136.775,y:149.775}).wait(1).to({graphics:mask_4_graphics_216,x:-136.775,y:149.725}).wait(1).to({graphics:mask_4_graphics_217,x:-136.775,y:149.675}).wait(1).to({graphics:mask_4_graphics_218,x:-136.775,y:149.625}).wait(1).to({graphics:mask_4_graphics_219,x:-136.775,y:149.575}).wait(1).to({graphics:mask_4_graphics_220,x:-136.775,y:149.525}).wait(1).to({graphics:mask_4_graphics_221,x:-136.775,y:149.475}).wait(1).to({graphics:mask_4_graphics_222,x:-136.775,y:149.425}).wait(1).to({graphics:mask_4_graphics_223,x:-136.775,y:149.4}).wait(1).to({graphics:mask_4_graphics_224,x:-136.775,y:149.35}).wait(1).to({graphics:mask_4_graphics_225,x:-136.775,y:149.3}).wait(1).to({graphics:mask_4_graphics_226,x:-136.775,y:149.25}).wait(1).to({graphics:mask_4_graphics_227,x:-136.775,y:149.2}).wait(1).to({graphics:mask_4_graphics_228,x:-136.775,y:149.15}).wait(1).to({graphics:mask_4_graphics_229,x:-136.775,y:149.1}).wait(1).to({graphics:mask_4_graphics_230,x:-136.775,y:149.05}).wait(1).to({graphics:mask_4_graphics_231,x:-136.775,y:149}).wait(1).to({graphics:mask_4_graphics_232,x:-136.775,y:148.95}).wait(1).to({graphics:mask_4_graphics_233,x:-136.775,y:148.9}).wait(1).to({graphics:mask_4_graphics_234,x:-136.775,y:148.85}).wait(1).to({graphics:mask_4_graphics_235,x:-136.775,y:148.8}).wait(1).to({graphics:mask_4_graphics_236,x:-136.775,y:148.75}).wait(1).to({graphics:mask_4_graphics_237,x:-136.775,y:148.725}).wait(1).to({graphics:mask_4_graphics_238,x:-136.775,y:148.675}).wait(1).to({graphics:mask_4_graphics_239,x:-136.775,y:148.625}).wait(1).to({graphics:mask_4_graphics_240,x:-136.775,y:148.575}).wait(1).to({graphics:mask_4_graphics_241,x:-136.775,y:148.525}).wait(1).to({graphics:mask_4_graphics_242,x:-136.775,y:148.475}).wait(1).to({graphics:mask_4_graphics_243,x:-136.775,y:148.425}).wait(1).to({graphics:mask_4_graphics_244,x:-136.775,y:148.375}).wait(1).to({graphics:mask_4_graphics_245,x:-136.775,y:148.325}).wait(1).to({graphics:mask_4_graphics_246,x:-136.775,y:148.275}).wait(1).to({graphics:mask_4_graphics_247,x:-136.775,y:148.225}).wait(1).to({graphics:mask_4_graphics_248,x:-136.775,y:148.175}).wait(1).to({graphics:mask_4_graphics_249,x:-136.775,y:148.125}).wait(1).to({graphics:mask_4_graphics_250,x:-136.775,y:148.075}).wait(1).to({graphics:mask_4_graphics_251,x:-136.775,y:148.05}).wait(1).to({graphics:mask_4_graphics_252,x:-136.775,y:148}).wait(1).to({graphics:mask_4_graphics_253,x:-136.775,y:147.95}).wait(1).to({graphics:mask_4_graphics_254,x:-136.775,y:147.9}).wait(1).to({graphics:mask_4_graphics_255,x:-136.775,y:147.85}).wait(1).to({graphics:mask_4_graphics_256,x:-136.775,y:147.8}).wait(1).to({graphics:mask_4_graphics_257,x:-136.775,y:147.75}).wait(1).to({graphics:mask_4_graphics_258,x:-136.775,y:147.7}).wait(1).to({graphics:mask_4_graphics_259,x:-136.775,y:147.65}).wait(1).to({graphics:mask_4_graphics_260,x:-136.775,y:147.6}).wait(1).to({graphics:mask_4_graphics_261,x:-136.775,y:147.55}).wait(1).to({graphics:mask_4_graphics_262,x:-136.775,y:147.5}).wait(1).to({graphics:mask_4_graphics_263,x:-136.775,y:147.45}).wait(1).to({graphics:mask_4_graphics_264,x:-136.775,y:147.425}).wait(1).to({graphics:mask_4_graphics_265,x:-136.775,y:147.375}).wait(1).to({graphics:mask_4_graphics_266,x:-136.775,y:147.325}).wait(1).to({graphics:mask_4_graphics_267,x:-136.775,y:147.275}).wait(1).to({graphics:mask_4_graphics_268,x:-136.775,y:147.225}).wait(1).to({graphics:mask_4_graphics_269,x:-136.775,y:147.175}).wait(1).to({graphics:mask_4_graphics_270,x:-136.775,y:147.125}).wait(1).to({graphics:mask_4_graphics_271,x:-136.775,y:147.075}).wait(1).to({graphics:mask_4_graphics_272,x:-136.775,y:147.025}).wait(1).to({graphics:mask_4_graphics_273,x:-136.775,y:146.975}).wait(1).to({graphics:mask_4_graphics_274,x:-136.775,y:146.925}).wait(1).to({graphics:mask_4_graphics_275,x:-136.775,y:146.875}).wait(1).to({graphics:mask_4_graphics_276,x:-136.775,y:146.825}).wait(1).to({graphics:mask_4_graphics_277,x:-136.775,y:146.775}).wait(1).to({graphics:mask_4_graphics_278,x:-136.775,y:146.75}).wait(1).to({graphics:mask_4_graphics_279,x:-136.775,y:146.7}).wait(1).to({graphics:mask_4_graphics_280,x:-136.775,y:146.65}).wait(1).to({graphics:mask_4_graphics_281,x:-136.775,y:146.6}).wait(1).to({graphics:mask_4_graphics_282,x:-136.775,y:146.55}).wait(1).to({graphics:mask_4_graphics_283,x:-136.775,y:146.5}).wait(1).to({graphics:mask_4_graphics_284,x:-136.775,y:146.45}).wait(1).to({graphics:mask_4_graphics_285,x:-136.775,y:146.4}).wait(1).to({graphics:mask_4_graphics_286,x:-136.775,y:146.35}).wait(1).to({graphics:mask_4_graphics_287,x:-136.775,y:146.3}).wait(1).to({graphics:mask_4_graphics_288,x:-136.775,y:146.25}).wait(1).to({graphics:mask_4_graphics_289,x:-136.775,y:146.2}).wait(1).to({graphics:mask_4_graphics_290,x:-136.775,y:146.15}).wait(1).to({graphics:mask_4_graphics_291,x:-136.775,y:146.1}).wait(1).to({graphics:mask_4_graphics_292,x:-136.775,y:146.075}).wait(1).to({graphics:mask_4_graphics_293,x:-136.775,y:146.025}).wait(1).to({graphics:mask_4_graphics_294,x:-136.775,y:145.975}).wait(1).to({graphics:mask_4_graphics_295,x:-136.775,y:145.925}).wait(1).to({graphics:mask_4_graphics_296,x:-136.775,y:145.875}).wait(1).to({graphics:mask_4_graphics_297,x:-136.775,y:145.825}).wait(1).to({graphics:mask_4_graphics_298,x:-136.775,y:145.775}).wait(1).to({graphics:mask_4_graphics_299,x:-136.775,y:145.725}).wait(1).to({graphics:mask_4_graphics_300,x:-136.775,y:145.675}).wait(1).to({graphics:mask_4_graphics_301,x:-136.775,y:145.625}).wait(1).to({graphics:mask_4_graphics_302,x:-136.775,y:145.575}).wait(1).to({graphics:mask_4_graphics_303,x:-136.775,y:145.525}).wait(1).to({graphics:mask_4_graphics_304,x:-136.775,y:145.475}).wait(1).to({graphics:mask_4_graphics_305,x:-136.775,y:145.45}).wait(1).to({graphics:mask_4_graphics_306,x:-136.775,y:145.4}).wait(1).to({graphics:mask_4_graphics_307,x:-136.775,y:145.35}).wait(1).to({graphics:mask_4_graphics_308,x:-136.775,y:145.3}).wait(1).to({graphics:mask_4_graphics_309,x:-136.775,y:145.25}).wait(1).to({graphics:mask_4_graphics_310,x:-136.775,y:145.2}).wait(1).to({graphics:mask_4_graphics_311,x:-136.775,y:145.15}).wait(1).to({graphics:mask_4_graphics_312,x:-136.775,y:145.1}).wait(1).to({graphics:mask_4_graphics_313,x:-136.775,y:145.05}).wait(1).to({graphics:mask_4_graphics_314,x:-136.775,y:145}).wait(1).to({graphics:mask_4_graphics_315,x:-136.775,y:144.95}).wait(1).to({graphics:mask_4_graphics_316,x:-136.775,y:144.9}).wait(1).to({graphics:mask_4_graphics_317,x:-136.775,y:144.85}).wait(1).to({graphics:mask_4_graphics_318,x:-136.775,y:144.8}).wait(1).to({graphics:mask_4_graphics_319,x:-136.775,y:144.775}).wait(1).to({graphics:mask_4_graphics_320,x:-136.775,y:144.725}).wait(1).to({graphics:mask_4_graphics_321,x:-136.775,y:144.675}).wait(1).to({graphics:mask_4_graphics_322,x:-136.775,y:144.625}).wait(1).to({graphics:mask_4_graphics_323,x:-136.775,y:144.575}).wait(1).to({graphics:mask_4_graphics_324,x:-136.775,y:144.525}).wait(1).to({graphics:mask_4_graphics_325,x:-136.775,y:144.475}).wait(1).to({graphics:mask_4_graphics_326,x:-136.775,y:144.425}).wait(1).to({graphics:mask_4_graphics_327,x:-136.775,y:144.375}).wait(1).to({graphics:mask_4_graphics_328,x:-136.775,y:144.325}).wait(1).to({graphics:mask_4_graphics_329,x:-136.775,y:144.275}).wait(1).to({graphics:mask_4_graphics_330,x:-136.775,y:144.225}).wait(1).to({graphics:mask_4_graphics_331,x:-136.775,y:144.175}).wait(1).to({graphics:mask_4_graphics_332,x:-136.775,y:144.125}).wait(1).to({graphics:mask_4_graphics_333,x:-136.775,y:144.1}).wait(1).to({graphics:mask_4_graphics_334,x:-136.775,y:144.05}).wait(1).to({graphics:mask_4_graphics_335,x:-136.775,y:144}).wait(1).to({graphics:mask_4_graphics_336,x:-136.775,y:143.95}).wait(1).to({graphics:mask_4_graphics_337,x:-136.775,y:143.9}).wait(1).to({graphics:mask_4_graphics_338,x:-136.775,y:143.85}).wait(1).to({graphics:mask_4_graphics_339,x:-136.775,y:143.8}).wait(1).to({graphics:mask_4_graphics_340,x:-136.775,y:143.75}).wait(1).to({graphics:mask_4_graphics_341,x:-136.775,y:143.7}).wait(1).to({graphics:mask_4_graphics_342,x:-136.775,y:143.65}).wait(1).to({graphics:mask_4_graphics_343,x:-136.775,y:143.6}).wait(1).to({graphics:mask_4_graphics_344,x:-136.775,y:143.55}).wait(1).to({graphics:mask_4_graphics_345,x:-136.775,y:143.5}).wait(1).to({graphics:mask_4_graphics_346,x:-136.775,y:143.45}).wait(1).to({graphics:mask_4_graphics_347,x:-136.775,y:143.425}).wait(1).to({graphics:mask_4_graphics_348,x:-136.775,y:143.375}).wait(1).to({graphics:mask_4_graphics_349,x:-136.775,y:143.325}).wait(1).to({graphics:mask_4_graphics_350,x:-136.775,y:143.275}).wait(1).to({graphics:mask_4_graphics_351,x:-136.775,y:143.225}).wait(1).to({graphics:mask_4_graphics_352,x:-136.775,y:143.175}).wait(1).to({graphics:mask_4_graphics_353,x:-136.775,y:143.125}).wait(1).to({graphics:mask_4_graphics_354,x:-136.775,y:143.075}).wait(1).to({graphics:mask_4_graphics_355,x:-136.775,y:143.025}).wait(1).to({graphics:mask_4_graphics_356,x:-136.775,y:142.975}).wait(1).to({graphics:mask_4_graphics_357,x:-136.775,y:142.925}).wait(1).to({graphics:mask_4_graphics_358,x:-136.775,y:142.875}).wait(1).to({graphics:mask_4_graphics_359,x:-136.775,y:142.825}).wait(1).to({graphics:mask_4_graphics_360,x:-136.775,y:142.775}).wait(1).to({graphics:mask_4_graphics_361,x:-136.775,y:142.75}).wait(1).to({graphics:mask_4_graphics_362,x:-136.775,y:142.7}).wait(1).to({graphics:mask_4_graphics_363,x:-136.775,y:142.65}).wait(1).to({graphics:mask_4_graphics_364,x:-136.775,y:142.6}).wait(1).to({graphics:mask_4_graphics_365,x:-136.775,y:142.55}).wait(1).to({graphics:mask_4_graphics_366,x:-136.775,y:142.5}).wait(1).to({graphics:mask_4_graphics_367,x:-136.775,y:142.45}).wait(1).to({graphics:mask_4_graphics_368,x:-136.775,y:142.4}).wait(1).to({graphics:mask_4_graphics_369,x:-136.775,y:142.35}).wait(1).to({graphics:mask_4_graphics_370,x:-136.775,y:142.3}).wait(1).to({graphics:mask_4_graphics_371,x:-136.775,y:142.25}).wait(1).to({graphics:mask_4_graphics_372,x:-136.775,y:142.2}).wait(1).to({graphics:mask_4_graphics_373,x:-136.775,y:142.15}).wait(1).to({graphics:mask_4_graphics_374,x:-136.775,y:142.125}).wait(1).to({graphics:mask_4_graphics_375,x:-136.775,y:142.075}).wait(1).to({graphics:mask_4_graphics_376,x:-136.775,y:142.025}).wait(1).to({graphics:mask_4_graphics_377,x:-136.775,y:141.975}).wait(1).to({graphics:mask_4_graphics_378,x:-136.775,y:141.925}).wait(1).to({graphics:mask_4_graphics_379,x:-136.775,y:141.875}).wait(1).to({graphics:mask_4_graphics_380,x:-136.775,y:141.825}).wait(1).to({graphics:mask_4_graphics_381,x:-136.775,y:141.775}).wait(1).to({graphics:mask_4_graphics_382,x:-136.775,y:141.725}).wait(1).to({graphics:mask_4_graphics_383,x:-136.775,y:141.675}).wait(1).to({graphics:mask_4_graphics_384,x:-136.775,y:141.625}).wait(1).to({graphics:mask_4_graphics_385,x:-136.775,y:141.575}).wait(1).to({graphics:mask_4_graphics_386,x:-136.775,y:141.525}).wait(1).to({graphics:mask_4_graphics_387,x:-136.775,y:141.475}).wait(1).to({graphics:mask_4_graphics_388,x:-136.775,y:141.45}).wait(1).to({graphics:mask_4_graphics_389,x:-136.775,y:141.4}).wait(1).to({graphics:mask_4_graphics_390,x:-136.775,y:141.35}).wait(1).to({graphics:mask_4_graphics_391,x:-136.775,y:141.3}).wait(1).to({graphics:mask_4_graphics_392,x:-136.775,y:141.25}).wait(1).to({graphics:mask_4_graphics_393,x:-136.775,y:141.2}).wait(1).to({graphics:mask_4_graphics_394,x:-136.775,y:141.15}).wait(1).to({graphics:mask_4_graphics_395,x:-136.775,y:141.1}).wait(1).to({graphics:mask_4_graphics_396,x:-136.775,y:141.05}).wait(1).to({graphics:mask_4_graphics_397,x:-136.775,y:141}).wait(1).to({graphics:mask_4_graphics_398,x:-136.775,y:140.95}).wait(1).to({graphics:mask_4_graphics_399,x:-136.775,y:140.9}).wait(1).to({graphics:mask_4_graphics_400,x:-136.775,y:140.85}).wait(1).to({graphics:mask_4_graphics_401,x:-136.775,y:140.8}).wait(1).to({graphics:mask_4_graphics_402,x:-136.775,y:140.775}).wait(1).to({graphics:mask_4_graphics_403,x:-136.775,y:140.725}).wait(1).to({graphics:mask_4_graphics_404,x:-136.775,y:140.675}).wait(1).to({graphics:mask_4_graphics_405,x:-136.775,y:140.625}).wait(1).to({graphics:mask_4_graphics_406,x:-136.775,y:140.575}).wait(1).to({graphics:mask_4_graphics_407,x:-136.775,y:140.525}).wait(1).to({graphics:mask_4_graphics_408,x:-136.775,y:140.475}).wait(1).to({graphics:mask_4_graphics_409,x:-136.775,y:140.425}).wait(1).to({graphics:mask_4_graphics_410,x:-136.775,y:140.375}).wait(1).to({graphics:mask_4_graphics_411,x:-136.775,y:140.325}).wait(1).to({graphics:mask_4_graphics_412,x:-136.775,y:140.275}).wait(1).to({graphics:mask_4_graphics_413,x:-136.775,y:140.225}).wait(1).to({graphics:mask_4_graphics_414,x:-136.775,y:140.175}).wait(1).to({graphics:mask_4_graphics_415,x:-136.775,y:140.15}).wait(1).to({graphics:mask_4_graphics_416,x:-136.775,y:140.1}).wait(1).to({graphics:mask_4_graphics_417,x:-136.775,y:140.05}).wait(1).to({graphics:mask_4_graphics_418,x:-136.775,y:140}).wait(1).to({graphics:mask_4_graphics_419,x:-136.775,y:139.95}).wait(1).to({graphics:mask_4_graphics_420,x:-136.775,y:139.9}).wait(1).to({graphics:mask_4_graphics_421,x:-136.775,y:139.85}).wait(1).to({graphics:mask_4_graphics_422,x:-136.775,y:139.8}).wait(1).to({graphics:mask_4_graphics_423,x:-136.775,y:139.75}).wait(1).to({graphics:mask_4_graphics_424,x:-136.775,y:139.7}).wait(1).to({graphics:mask_4_graphics_425,x:-136.775,y:139.65}).wait(1).to({graphics:mask_4_graphics_426,x:-136.775,y:139.6}).wait(1).to({graphics:mask_4_graphics_427,x:-136.775,y:139.55}).wait(1).to({graphics:mask_4_graphics_428,x:-136.775,y:139.5}).wait(1).to({graphics:mask_4_graphics_429,x:-136.775,y:139.475}).wait(1).to({graphics:mask_4_graphics_430,x:-136.775,y:139.425}).wait(1).to({graphics:mask_4_graphics_431,x:-136.775,y:139.375}).wait(1).to({graphics:mask_4_graphics_432,x:-136.775,y:139.325}).wait(1).to({graphics:mask_4_graphics_433,x:-136.775,y:139.275}).wait(1).to({graphics:mask_4_graphics_434,x:-136.775,y:139.225}).wait(1).to({graphics:mask_4_graphics_435,x:-136.775,y:139.175}).wait(1).to({graphics:mask_4_graphics_436,x:-136.775,y:139.125}).wait(1).to({graphics:mask_4_graphics_437,x:-136.775,y:139.075}).wait(1).to({graphics:mask_4_graphics_438,x:-136.775,y:139.025}).wait(1).to({graphics:mask_4_graphics_439,x:-136.775,y:138.975}).wait(1).to({graphics:mask_4_graphics_440,x:-136.775,y:138.925}).wait(1).to({graphics:mask_4_graphics_441,x:-136.775,y:138.875}).wait(1).to({graphics:mask_4_graphics_442,x:-136.775,y:138.825}).wait(1).to({graphics:mask_4_graphics_443,x:-136.775,y:138.8}).wait(1).to({graphics:mask_4_graphics_444,x:-136.775,y:138.75}).wait(1).to({graphics:mask_4_graphics_445,x:-136.775,y:138.7}).wait(1).to({graphics:mask_4_graphics_446,x:-136.775,y:138.65}).wait(1).to({graphics:mask_4_graphics_447,x:-136.775,y:138.6}).wait(1).to({graphics:mask_4_graphics_448,x:-136.775,y:138.55}).wait(1).to({graphics:mask_4_graphics_449,x:-136.775,y:138.5}).wait(1).to({graphics:mask_4_graphics_450,x:-136.775,y:138.45}).wait(1).to({graphics:mask_4_graphics_451,x:-136.775,y:138.4}).wait(1).to({graphics:mask_4_graphics_452,x:-136.775,y:138.35}).wait(1).to({graphics:mask_4_graphics_453,x:-136.775,y:138.3}).wait(1).to({graphics:mask_4_graphics_454,x:-136.775,y:138.25}).wait(1).to({graphics:mask_4_graphics_455,x:-136.775,y:138.2}).wait(1).to({graphics:mask_4_graphics_456,x:-136.775,y:138.15}).wait(1).to({graphics:mask_4_graphics_457,x:-136.775,y:138.125}).wait(1).to({graphics:mask_4_graphics_458,x:-136.775,y:138.075}).wait(1).to({graphics:mask_4_graphics_459,x:-136.775,y:138.025}).wait(1).to({graphics:mask_4_graphics_460,x:-136.775,y:137.975}).wait(1).to({graphics:mask_4_graphics_461,x:-136.775,y:137.925}).wait(1).to({graphics:mask_4_graphics_462,x:-136.775,y:137.875}).wait(1).to({graphics:mask_4_graphics_463,x:-136.775,y:137.825}).wait(1).to({graphics:mask_4_graphics_464,x:-136.775,y:137.775}).wait(1).to({graphics:mask_4_graphics_465,x:-136.775,y:137.725}).wait(1).to({graphics:mask_4_graphics_466,x:-136.775,y:137.675}).wait(1).to({graphics:mask_4_graphics_467,x:-136.775,y:137.625}).wait(1).to({graphics:mask_4_graphics_468,x:-136.775,y:137.575}).wait(1).to({graphics:mask_4_graphics_469,x:-136.775,y:137.525}).wait(1).to({graphics:mask_4_graphics_470,x:-136.775,y:137.5}).wait(1).to({graphics:mask_4_graphics_471,x:-136.775,y:137.45}).wait(1).to({graphics:mask_4_graphics_472,x:-136.775,y:137.4}).wait(1).to({graphics:mask_4_graphics_473,x:-136.775,y:137.35}).wait(1).to({graphics:mask_4_graphics_474,x:-136.775,y:137.3}).wait(1).to({graphics:mask_4_graphics_475,x:-136.775,y:137.25}).wait(1).to({graphics:mask_4_graphics_476,x:-136.775,y:137.2}).wait(1).to({graphics:mask_4_graphics_477,x:-136.775,y:137.15}).wait(1).to({graphics:mask_4_graphics_478,x:-136.775,y:137.1}).wait(1).to({graphics:mask_4_graphics_479,x:-136.775,y:137.05}).wait(1).to({graphics:mask_4_graphics_480,x:-136.775,y:137}).wait(1).to({graphics:mask_4_graphics_481,x:-136.775,y:136.95}).wait(1).to({graphics:mask_4_graphics_482,x:-136.775,y:136.9}).wait(1).to({graphics:mask_4_graphics_483,x:-136.775,y:136.85}).wait(1).to({graphics:mask_4_graphics_484,x:-136.775,y:136.825}).wait(1).to({graphics:mask_4_graphics_485,x:-136.775,y:136.775}).wait(1).to({graphics:mask_4_graphics_486,x:-136.775,y:136.725}).wait(1).to({graphics:mask_4_graphics_487,x:-136.775,y:136.675}).wait(1).to({graphics:mask_4_graphics_488,x:-136.775,y:136.625}).wait(1).to({graphics:mask_4_graphics_489,x:-136.775,y:136.575}).wait(1).to({graphics:mask_4_graphics_490,x:-136.775,y:136.525}).wait(1).to({graphics:mask_4_graphics_491,x:-136.775,y:136.475}).wait(1).to({graphics:mask_4_graphics_492,x:-136.775,y:136.425}).wait(1).to({graphics:mask_4_graphics_493,x:-136.775,y:136.375}).wait(1).to({graphics:mask_4_graphics_494,x:-136.775,y:136.325}).wait(1).to({graphics:mask_4_graphics_495,x:-136.775,y:136.275}).wait(1).to({graphics:mask_4_graphics_496,x:-136.775,y:136.225}).wait(1).to({graphics:mask_4_graphics_497,x:-136.775,y:136.175}).wait(1).to({graphics:mask_4_graphics_498,x:-136.775,y:136.15}).wait(1).to({graphics:mask_4_graphics_499,x:-136.775,y:136.1}).wait(1).to({graphics:mask_4_graphics_500,x:-136.775,y:136.05}).wait(1).to({graphics:mask_4_graphics_501,x:-136.775,y:136}).wait(1).to({graphics:mask_4_graphics_502,x:-136.775,y:135.95}).wait(1).to({graphics:mask_4_graphics_503,x:-136.775,y:135.9}).wait(1).to({graphics:mask_4_graphics_504,x:-136.775,y:135.85}).wait(1).to({graphics:mask_4_graphics_505,x:-136.775,y:135.8}).wait(1).to({graphics:mask_4_graphics_506,x:-136.775,y:135.75}).wait(1).to({graphics:mask_4_graphics_507,x:-136.775,y:135.7}).wait(1).to({graphics:mask_4_graphics_508,x:-136.775,y:135.65}).wait(1).to({graphics:mask_4_graphics_509,x:-136.775,y:135.6}).wait(1).to({graphics:mask_4_graphics_510,x:-136.775,y:135.55}).wait(1).to({graphics:mask_4_graphics_511,x:-136.775,y:135.5}).wait(1).to({graphics:mask_4_graphics_512,x:-136.775,y:135.475}).wait(1).to({graphics:mask_4_graphics_513,x:-136.775,y:135.425}).wait(1).to({graphics:mask_4_graphics_514,x:-136.775,y:135.375}).wait(1).to({graphics:mask_4_graphics_515,x:-136.775,y:135.325}).wait(1).to({graphics:mask_4_graphics_516,x:-136.775,y:135.275}).wait(1).to({graphics:mask_4_graphics_517,x:-136.775,y:135.225}).wait(1).to({graphics:mask_4_graphics_518,x:-136.775,y:135.175}).wait(772));

	// Masked_Layer_259___221
	this.instance_31 = new lib.shape19("synched",0);
	this.instance_31.setTransform(-224.6,162.3);
	this.instance_31.alpha = 0.5;

	this.instance_32 = new lib.shape43("synched",0);
	this.instance_32.setTransform(-109.95,295.55,0.3,0.3);
	this.instance_32.alpha = 0.5;

	var maskedShapeInstanceList = [this.instance_31,this.instance_32];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_4;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_31}]},147).to({state:[]},8).to({state:[{t:this.instance_32}]},65).to({state:[]},10).to({state:[{t:this.instance_31}]},15).to({state:[]},10).to({state:[{t:this.instance_32}]},65).to({state:[]},10).to({state:[{t:this.instance_31}]},15).to({state:[]},10).to({state:[{t:this.instance_32}]},65).to({state:[]},10).to({state:[{t:this.instance_31}]},15).to({state:[]},10).wait(835));

	// Masked_Layer_258___221
	this.instance_33 = new lib.shape19("synched",0);
	this.instance_33.setTransform(-170.55,171.45);
	this.instance_33.alpha = 0.5;
	this.instance_33._off = true;

	var maskedShapeInstanceList = [this.instance_33];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_4;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_33).wait(190).to({_off:false},0).to({_off:true},10).wait(20).to({_off:false,x:-270.1,y:108.95},0).to({_off:true},10).wait(60).to({_off:false,x:-170.55,y:171.45},0).to({_off:true},10).wait(20).to({_off:false,x:-270.1,y:108.95},0).to({_off:true},10).wait(60).to({_off:false,x:-170.55,y:171.45},0).to({_off:true},10).wait(20).to({_off:false,x:-270.1,y:108.95},0).to({_off:true},10).wait(860));

	// Masked_Layer_254___221
	this.instance_34 = new lib.shape19("synched",0);
	this.instance_34.setTransform(-158.05,108.95);
	this.instance_34.alpha = 0.5;
	this.instance_34._off = true;

	var maskedShapeInstanceList = [this.instance_34];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_4;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_34).wait(170).to({_off:false},0).wait(10).to({x:-164.3,y:140.2},0).to({_off:true},10).wait(80).to({_off:false,x:-158.05,y:108.95},0).wait(10).to({x:-164.3,y:140.2},0).to({_off:true},10).wait(80).to({_off:false,x:-158.05,y:108.95},0).wait(10).to({x:-164.3,y:140.2},0).to({_off:true},10).wait(80).to({_off:false,x:-158.05,y:108.95},0).wait(10).to({x:-164.3,y:140.2},0).to({_off:true},10).wait(800));

	// Masked_Layer_253___221
	this.instance_35 = new lib.shape19("synched",0);
	this.instance_35.setTransform(-282.6,171.45);
	this.instance_35.alpha = 0.5;
	this.instance_35._off = true;

	this.instance_36 = new lib.shape36("synched",0);
	this.instance_36.setTransform(-109.95,295.55,0.3,0.3);
	this.instance_36.alpha = 0.5;

	this.instance_37 = new lib.shape39("synched",0);
	this.instance_37.setTransform(-109.95,295.55,0.3,0.3);
	this.instance_37.alpha = 0.5;

	var maskedShapeInstanceList = [this.instance_35,this.instance_36,this.instance_37];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_4;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_35}]},147).to({state:[]},3).to({state:[{t:this.instance_36}]},50).to({state:[{t:this.instance_37}]},10).to({state:[]},10).to({state:[{t:this.instance_35}]},10).to({state:[{t:this.instance_35}]},10).to({state:[]},10).to({state:[{t:this.instance_36}]},50).to({state:[{t:this.instance_37}]},10).to({state:[]},10).to({state:[{t:this.instance_35}]},10).to({state:[{t:this.instance_35}]},10).to({state:[]},10).to({state:[{t:this.instance_36}]},50).to({state:[{t:this.instance_37}]},10).to({state:[]},10).to({state:[{t:this.instance_35}]},10).to({state:[{t:this.instance_35}]},10).to({state:[]},10).wait(840));
	this.timeline.addTween(cjs.Tween.get(this.instance_35).wait(147).to({_off:false},0).to({_off:true},3).wait(80).to({_off:false,x:-276.35,y:140.2},0).wait(10).to({x:-282.6,y:171.45},0).to({_off:true},10).wait(80).to({_off:false,x:-276.35,y:140.2},0).wait(10).to({x:-282.6,y:171.45},0).to({_off:true},10).wait(80).to({_off:false,x:-276.35,y:140.2},0).wait(10).to({x:-282.6,y:171.45},0).to({_off:true},10).wait(840));

	// Masked_Layer_252___221
	this.instance_38 = new lib.shape19("synched",0);
	this.instance_38.setTransform(-226.35,77.7);
	this.instance_38.alpha = 0.5;
	this.instance_38._off = true;

	var maskedShapeInstanceList = [this.instance_38];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_4;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_38).wait(196).to({_off:false},0).wait(9).to({x:-238.85,y:108.95},0).wait(10).to({x:-251.35,y:152.7},0).to({_off:true},10).wait(71).to({_off:false,x:-226.35,y:77.7},0).wait(9).to({x:-238.85,y:108.95},0).wait(10).to({x:-251.35,y:152.7},0).to({_off:true},10).wait(71).to({_off:false,x:-226.35,y:77.7},0).wait(9).to({x:-238.85,y:108.95},0).wait(10).to({x:-251.35,y:152.7},0).to({_off:true},10).wait(65).to({_off:false,x:-170.55,y:171.45},0).to({_off:true},6).wait(794));

	// Masked_Layer_251___221
	this.instance_39 = new lib.shape37("synched",0);
	this.instance_39.setTransform(-170.55,171.45);
	this.instance_39.alpha = 0.5;
	this.instance_39._off = true;

	var maskedShapeInstanceList = [this.instance_39];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_4;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_39).wait(225).to({_off:false},0).to({_off:true},5).wait(95).to({_off:false},0).to({_off:true},5).wait(95).to({_off:false},0).to({_off:true},5).wait(860));

	// Masked_Layer_249___221
	this.instance_40 = new lib.shape36("synched",0);
	this.instance_40.setTransform(-162.5,294.95,0.3,0.3);
	this.instance_40.alpha = 0.5;
	this.instance_40._off = true;

	var maskedShapeInstanceList = [this.instance_40];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_4;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_40).wait(155).to({_off:false},0).to({_off:true},10).wait(90).to({_off:false},0).to({_off:true},10).wait(90).to({_off:false},0).to({_off:true},10).wait(90).to({_off:false},0).to({_off:true},10).wait(825));

	// Masked_Layer_248___221
	this.instance_41 = new lib.shape36("synched",0);
	this.instance_41.setTransform(-211.25,294.95,0.3,0.3,30.0001);
	this.instance_41.alpha = 0.5;

	this.instance_42 = new lib.shape39("synched",0);
	this.instance_42.setTransform(-162.5,294.95,0.3,0.3);
	this.instance_42.alpha = 0.5;

	this.instance_43 = new lib.shape43("synched",0);
	this.instance_43.setTransform(-162.5,294.95,0.3,0.3);
	this.instance_43.alpha = 0.5;

	var maskedShapeInstanceList = [this.instance_41,this.instance_42,this.instance_43];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_4;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_41}]},150).to({state:[]},10).to({state:[{t:this.instance_42}]},5).to({state:[{t:this.instance_43}]},10).to({state:[]},10).to({state:[{t:this.instance_41}]},65).to({state:[]},10).to({state:[{t:this.instance_42}]},5).to({state:[{t:this.instance_43}]},10).to({state:[]},10).to({state:[{t:this.instance_41}]},65).to({state:[]},10).to({state:[{t:this.instance_42}]},5).to({state:[{t:this.instance_43}]},10).to({state:[]},10).to({state:[{t:this.instance_41}]},65).to({state:[]},10).to({state:[{t:this.instance_42}]},5).to({state:[{t:this.instance_43}]},10).to({state:[]},10).wait(805));

	// Masked_Layer_247___221
	this.instance_44 = new lib.shape39("synched",0);
	this.instance_44.setTransform(-207.65,294.95,0.3,0.3,30.0001);
	this.instance_44.alpha = 0.5;
	this.instance_44._off = true;

	this.instance_45 = new lib.shape43("synched",0);
	this.instance_45.setTransform(-207.65,294.95,0.3,0.3,30.0001);
	this.instance_45.alpha = 0.5;
	this.instance_45._off = true;

	this.instance_46 = new lib.shape36("synched",0);
	this.instance_46.setTransform(-207.65,294.95,0.3,0.3,30.0001);
	this.instance_46.alpha = 0.5;

	var maskedShapeInstanceList = [this.instance_44,this.instance_45,this.instance_46];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_4;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_44}]},147).to({state:[{t:this.instance_45}]},3).to({state:[{t:this.instance_44}]},10).to({state:[{t:this.instance_45}]},10).to({state:[]},10).to({state:[{t:this.instance_46}]},50).to({state:[{t:this.instance_44}]},10).to({state:[{t:this.instance_45}]},10).to({state:[{t:this.instance_44}]},10).to({state:[{t:this.instance_45}]},10).to({state:[]},10).to({state:[{t:this.instance_46}]},50).to({state:[{t:this.instance_44}]},10).to({state:[{t:this.instance_45}]},10).to({state:[{t:this.instance_44}]},10).to({state:[{t:this.instance_45}]},10).to({state:[]},10).to({state:[{t:this.instance_46}]},50).to({state:[{t:this.instance_44}]},10).to({state:[{t:this.instance_45}]},10).to({state:[{t:this.instance_44}]},10).to({state:[{t:this.instance_45}]},10).to({state:[]},10).wait(810));
	this.timeline.addTween(cjs.Tween.get(this.instance_44).wait(147).to({_off:false},0).to({_off:true},3).wait(10).to({_off:false,x:-211.25},0).to({_off:true},10).wait(70).to({_off:false,x:-207.65},0).to({_off:true},10).wait(10).to({_off:false,x:-211.25},0).to({_off:true},10).wait(70).to({_off:false,x:-207.65},0).to({_off:true},10).wait(10).to({_off:false,x:-211.25},0).to({_off:true},10).wait(70).to({_off:false,x:-207.65},0).to({_off:true},10).wait(10).to({_off:false,x:-211.25},0).to({_off:true},10).wait(820));
	this.timeline.addTween(cjs.Tween.get(this.instance_45).wait(150).to({_off:false},0).to({_off:true},10).wait(10).to({_off:false,x:-211.25},0).to({_off:true},10).wait(70).to({_off:false,x:-207.65},0).to({_off:true},10).wait(10).to({_off:false,x:-211.25},0).to({_off:true},10).wait(70).to({_off:false,x:-207.65},0).to({_off:true},10).wait(10).to({_off:false,x:-211.25},0).to({_off:true},10).wait(70).to({_off:false,x:-207.65},0).to({_off:true},10).wait(10).to({_off:false,x:-211.25},0).to({_off:true},10).wait(810));

	// Masked_Layer_246___221
	this.instance_47 = new lib.shape18("synched",0);
	this.instance_47.setTransform(-170.55,171.45);
	this.instance_47.alpha = 0.1484;
	this.instance_47._off = true;

	var maskedShapeInstanceList = [this.instance_47];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_4;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_47).wait(147).to({_off:false},0).wait(372).to({startPosition:0},0).to({_off:true},1).wait(770));

	// Masked_Layer_245___221
	this.instance_48 = new lib.shape33("synched",0);
	this.instance_48.setTransform(-164.95,218.25);
	this.instance_48._off = true;

	this.instance_49 = new lib.shape36("synched",0);
	this.instance_49.setTransform(-187.8,295.75,0.3,0.3);
	this.instance_49.alpha = 0.5;
	this.instance_49._off = true;

	this.instance_50 = new lib.shape39("synched",0);
	this.instance_50.setTransform(-187.8,295.75,0.3,0.3);
	this.instance_50.alpha = 0.5;
	this.instance_50._off = true;

	this.instance_51 = new lib.shape43("synched",0);
	this.instance_51.setTransform(-187.8,295.75,0.3,0.3);
	this.instance_51.alpha = 0.5;
	this.instance_51._off = true;

	this.instance_52 = new lib.shape17("synched",0);
	this.instance_52.setTransform(-164.95,218.25);
	this.instance_52._off = true;

	this.instance_53 = new lib.shape31("synched",0);
	this.instance_53.setTransform(-164.95,218.25);
	this.instance_53._off = true;

	var maskedShapeInstanceList = [this.instance_48,this.instance_49,this.instance_50,this.instance_51,this.instance_52,this.instance_53];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_4;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_48).wait(147).to({_off:false},0).to({_off:true},7).wait(50).to({_off:false},0).to({_off:true},10).wait(50).to({_off:false},0).to({_off:true},10).wait(50).to({_off:false},0).to({_off:true},10).wait(50).to({_off:false},0).to({_off:true},10).wait(50).to({_off:false},0).to({_off:true},10).wait(836));
	this.timeline.addTween(cjs.Tween.get(this.instance_49).wait(154).to({_off:false},0).to({_off:true},10).wait(50).to({_off:false},0).to({_off:true},10).wait(50).to({_off:false},0).to({_off:true},10).wait(50).to({_off:false},0).to({_off:true},10).wait(50).to({_off:false},0).to({_off:true},10).wait(50).to({_off:false},0).to({_off:true},10).wait(826));
	this.timeline.addTween(cjs.Tween.get(this.instance_50).wait(164).to({_off:false},0).to({_off:true},10).wait(50).to({_off:false},0).to({_off:true},10).wait(50).to({_off:false},0).to({_off:true},10).wait(50).to({_off:false},0).to({_off:true},10).wait(50).to({_off:false},0).to({_off:true},10).wait(50).to({_off:false},0).to({_off:true},10).wait(816));
	this.timeline.addTween(cjs.Tween.get(this.instance_51).wait(174).to({_off:false},0).to({_off:true},10).wait(50).to({_off:false},0).to({_off:true},10).wait(50).to({_off:false},0).to({_off:true},10).wait(50).to({_off:false},0).to({_off:true},10).wait(50).to({_off:false},0).to({_off:true},10).wait(50).to({_off:false},0).to({_off:true},10).wait(806));
	this.timeline.addTween(cjs.Tween.get(this.instance_52).wait(185).to({_off:false},0).to({_off:true},9).wait(51).to({_off:false},0).to({_off:true},9).wait(51).to({_off:false},0).to({_off:true},9).wait(51).to({_off:false},0).to({_off:true},9).wait(51).to({_off:false},0).to({_off:true},9).wait(51).to({_off:false},0).to({_off:true},9).wait(796));
	this.timeline.addTween(cjs.Tween.get(this.instance_53).wait(194).to({_off:false},0).to({_off:true},10).wait(50).to({_off:false},0).to({_off:true},10).wait(50).to({_off:false},0).to({_off:true},10).wait(50).to({_off:false},0).to({_off:true},10).wait(50).to({_off:false},0).to({_off:true},10).wait(846));

	// Masked_Layer_244___221
	this.instance_54 = new lib.shape17("synched",0);
	this.instance_54.setTransform(-164.95,218.25);
	this.instance_54._off = true;

	this.instance_55 = new lib.shape31("synched",0);
	this.instance_55.setTransform(-164.95,218.25);
	this.instance_55._off = true;

	this.instance_56 = new lib.shape33("synched",0);
	this.instance_56.setTransform(-164.95,218.25);
	this.instance_56._off = true;

	var maskedShapeInstanceList = [this.instance_54,this.instance_55,this.instance_56];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_4;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_54).wait(154).to({_off:false},0).to({_off:true},9).wait(51).to({_off:false},0).to({_off:true},9).wait(52).to({_off:false},0).to({_off:true},9).wait(51).to({_off:false},0).to({_off:true},9).wait(51).to({_off:false},0).to({_off:true},9).wait(51).to({_off:false},0).to({_off:true},9).wait(826));
	this.timeline.addTween(cjs.Tween.get(this.instance_55).wait(163).to({_off:false},0).to({_off:true},10).wait(50).to({_off:false},0).to({_off:true},10).wait(51).to({_off:false},0).to({_off:true},10).wait(50).to({_off:false},0).to({_off:true},10).wait(50).to({_off:false},0).to({_off:true},10).wait(50).to({_off:false},0).to({_off:true},10).wait(20).to({_off:false},0).to({_off:true},25).wait(771));
	this.timeline.addTween(cjs.Tween.get(this.instance_56).wait(173).to({_off:false},0).to({_off:true},10).wait(50).to({_off:false},0).to({_off:true},10).wait(51).to({_off:false},0).to({_off:true},10).wait(50).to({_off:false},0).to({_off:true},10).wait(50).to({_off:false},0).to({_off:true},10).wait(50).to({_off:false},0).to({_off:true},10).wait(806));

	// Masked_Layer_235___221
	this.instance_57 = new lib.shape43("synched",0);
	this.instance_57.setTransform(-187.8,295.75,0.3,0.3);
	this.instance_57.alpha = 0.5;
	this.instance_57._off = true;

	this.instance_58 = new lib.shape36("synched",0);
	this.instance_58.setTransform(-187.8,295.75,0.3,0.3);
	this.instance_58.alpha = 0.5;
	this.instance_58._off = true;

	this.instance_59 = new lib.shape39("synched",0);
	this.instance_59.setTransform(-187.8,295.75,0.3,0.3);
	this.instance_59.alpha = 0.5;
	this.instance_59._off = true;

	var maskedShapeInstanceList = [this.instance_57,this.instance_58,this.instance_59];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_4;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_57).wait(147).to({_off:false},0).to({_off:true},6).wait(50).to({_off:false},0).to({_off:true},10).wait(50).to({_off:false},0).to({_off:true},10).wait(51).to({_off:false},0).to({_off:true},10).wait(50).to({_off:false},0).to({_off:true},10).wait(50).to({_off:false},0).to({_off:true},10).wait(836));
	this.timeline.addTween(cjs.Tween.get(this.instance_58).wait(183).to({_off:false},0).to({_off:true},10).wait(50).to({_off:false},0).to({_off:true},10).wait(51).to({_off:false},0).to({_off:true},10).wait(50).to({_off:false},0).to({_off:true},10).wait(50).to({_off:false},0).to({_off:true},10).wait(50).to({_off:false},0).to({_off:true},10).wait(796));
	this.timeline.addTween(cjs.Tween.get(this.instance_59).wait(193).to({_off:false},0).to({_off:true},10).wait(50).to({_off:false},0).to({_off:true},10).wait(51).to({_off:false},0).to({_off:true},10).wait(50).to({_off:false},0).to({_off:true},10).wait(50).to({_off:false},0).to({_off:true},10).wait(846));

	// Masked_Layer_233___221
	this.instance_60 = new lib.shape42("synched",0);
	this.instance_60.setTransform(-145.4,-39.85);
	this.instance_60.alpha = 0.5;

	this.instance_61 = new lib.shape47("synched",0);
	this.instance_61.setTransform(-171.25,134);
	this.instance_61.alpha = 0.5;

	var maskedShapeInstanceList = [this.instance_60,this.instance_61];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_4;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_60}]},170).to({state:[{t:this.instance_61}]},12).to({state:[]},12).to({state:[{t:this.instance_60}]},76).to({state:[{t:this.instance_61}]},12).to({state:[]},12).to({state:[{t:this.instance_60}]},76).to({state:[{t:this.instance_61}]},12).to({state:[]},12).wait(896));

	// Masked_Layer_232___221
	this.instance_62 = new lib.shape46("synched",0);
	this.instance_62.setTransform(-171.25,134);
	this.instance_62.alpha = 0.5;

	this.instance_63 = new lib.shape32("synched",0);
	this.instance_63.setTransform(-121.4,298.2);
	this.instance_63.alpha = 0.5;

	var maskedShapeInstanceList = [this.instance_62,this.instance_63];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_4;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_62}]},194).to({state:[{t:this.instance_63}]},12).to({state:[]},11).to({state:[{t:this.instance_62}]},77).to({state:[{t:this.instance_63}]},12).to({state:[]},11).to({state:[{t:this.instance_62}]},77).to({state:[{t:this.instance_63}]},12).to({state:[]},11).wait(873));

	// Masked_Layer_231___221
	this.instance_64 = new lib.shape42("synched",0);
	this.instance_64.setTransform(-171.25,134);
	this.instance_64.alpha = 0.5;
	this.instance_64._off = true;

	var maskedShapeInstanceList = [this.instance_64];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_4;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_64).wait(179).to({_off:false},0).to({_off:true},12).wait(88).to({_off:false},0).to({_off:true},12).wait(88).to({_off:false},0).to({_off:true},12).wait(899));

	// Masked_Layer_230___221
	this.instance_65 = new lib.shape36("synched",0);
	this.instance_65.setTransform(-159,296.35,0.3,0.3);
	this.instance_65.alpha = 0.5;

	this.instance_66 = new lib.shape39("synched",0);
	this.instance_66.setTransform(-159,296.35,0.3,0.3);
	this.instance_66.alpha = 0.5;

	var maskedShapeInstanceList = [this.instance_65,this.instance_66];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_4;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_65}]},191).to({state:[{t:this.instance_66}]},10).to({state:[]},10).to({state:[{t:this.instance_65}]},80).to({state:[{t:this.instance_66}]},10).to({state:[]},10).to({state:[{t:this.instance_65}]},80).to({state:[{t:this.instance_66}]},10).to({state:[]},10).wait(879));

	// Masked_Layer_229___221
	this.instance_67 = new lib.shape39("synched",0);
	this.instance_67.setTransform(-176.6,299.45,0.3,0.3);
	this.instance_67.alpha = 0.5;
	var instance_67Filter_2 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_67.filters = [instance_67Filter_2];
	this.instance_67.cache(-32,-10,63,60);

	this.instance_68 = new lib.shape43("synched",0);
	this.instance_68.setTransform(-176.6,299.45,0.3,0.3);
	this.instance_68.alpha = 0.5;
	this.instance_68._off = true;
	var instance_68Filter_1 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_68.filters = [instance_68Filter_1];
	this.instance_68.cache(-39,-4,75,60);

	this.instance_69 = new lib.shape42("synched",0);
	this.instance_69.setTransform(-145.4,-39.85);
	this.instance_69.alpha = 0.5;

	var maskedShapeInstanceList = [this.instance_67,this.instance_68,this.instance_69];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_4;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_67,p:{alpha:0.5}}]},188).to({state:[{t:this.instance_68}]},10).to({state:[]},10).to({state:[{t:this.instance_68}]},29).to({state:[]},10).to({state:[{t:this.instance_67,p:{alpha:1}}]},42).to({state:[{t:this.instance_68}]},10).to({state:[]},10).to({state:[{t:this.instance_68}]},28).to({state:[]},10).to({state:[{t:this.instance_67,p:{alpha:0.5}}]},42).to({state:[{t:this.instance_68}]},10).to({state:[]},10).to({state:[{t:this.instance_68}]},28).to({state:[]},10).to({state:[{t:this.instance_69}]},23).to({state:[]},12).wait(808));
	this.timeline.addTween(cjs.Tween.get(this.instance_68).wait(198).to({_off:false},0).to({_off:true},10).wait(29).to({_off:false,x:-137.3,y:296.35,alpha:1},0).to({_off:true},10).wait(52).to({_off:false,x:-176.6,y:299.45},0).to({_off:true},10).wait(28).to({_off:false,x:-137.3,y:296.35},0).to({_off:true},10).wait(52).to({_off:false,x:-176.6,y:299.45,alpha:0.5},0).to({_off:true},10).wait(28).to({_off:false,x:-137.3,y:296.35},0).to({_off:true},10).wait(843));
	this.timeline.addTween(cjs.Tween.get(instance_67Filter_2).wait(279).to(new cjs.ColorFilter(0,0,0,1,180,179,1,0), 0).wait(90).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(891));
	this.timeline.addTween(cjs.Tween.get(instance_68Filter_1).wait(198).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(29).to(new cjs.ColorFilter(0,0,0,1,180,179,1,0), 0).wait(52).to(new cjs.ColorFilter(0,0,0,1,180,179,1,0), 0).wait(28).to(new cjs.ColorFilter(0,0,0,1,180,179,1,0), 0).wait(52).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(28).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(843));

	// Masked_Layer_228___221
	this.instance_70 = new lib.shape42("synched",0);
	this.instance_70.setTransform(-171.25,9.15);
	this.instance_70.alpha = 0.5;

	this.instance_71 = new lib.shape16("synched",0);
	this.instance_71.setTransform(-171.25,134);
	this.instance_71.alpha = 0.5;

	this.instance_72 = new lib.shape36("synched",0);
	this.instance_72.setTransform(-137.3,296.35,0.3,0.3);
	this.instance_72.alpha = 0.5;

	this.instance_73 = new lib.shape47("synched",0);
	this.instance_73.setTransform(-171.25,134);
	this.instance_73.alpha = 0.5;

	var maskedShapeInstanceList = [this.instance_70,this.instance_71,this.instance_72,this.instance_73];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_4;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_70}]},147).to({state:[]},10).to({state:[{t:this.instance_71}]},38).to({state:[]},11).to({state:[{t:this.instance_72}]},11).to({state:[]},10).to({state:[{t:this.instance_70}]},18).to({state:[]},12).to({state:[{t:this.instance_71}]},39).to({state:[]},11).to({state:[{t:this.instance_72}]},10).to({state:[]},10).to({state:[{t:this.instance_70}]},18).to({state:[]},12).to({state:[{t:this.instance_71}]},39).to({state:[]},11).to({state:[{t:this.instance_72}]},10).to({state:[]},10).to({state:[{t:this.instance_70}]},18).to({state:[]},12).to({state:[{t:this.instance_73}]},25).to({state:[]},12).wait(796));

	// Masked_Layer_227___221
	this.instance_74 = new lib.shape47("synched",0);
	this.instance_74.setTransform(-197.1,187.85);
	this.instance_74.alpha = 0.5;

	this.instance_75 = new lib.shape42("synched",0);
	this.instance_75.setTransform(-171.25,86);
	this.instance_75.alpha = 0.5;

	this.instance_76 = new lib.shape43("synched",0);
	this.instance_76.setTransform(-159,296.35,0.3,0.3);
	this.instance_76.alpha = 0.5;

	this.instance_77 = new lib.shape39("synched",0);
	this.instance_77.setTransform(-137.3,296.35,0.3,0.3);
	this.instance_77.alpha = 0.5;

	var maskedShapeInstanceList = [this.instance_74,this.instance_75,this.instance_76,this.instance_77];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_4;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_74}]},157).to({state:[{t:this.instance_75}]},12).to({state:[]},10).to({state:[{t:this.instance_76}]},32).to({state:[]},10).to({state:[{t:this.instance_77}]},6).to({state:[]},10).to({state:[{t:this.instance_74}]},20).to({state:[{t:this.instance_75}]},12).to({state:[]},10).to({state:[{t:this.instance_76}]},32).to({state:[]},10).to({state:[{t:this.instance_77}]},6).to({state:[]},10).to({state:[{t:this.instance_74}]},20).to({state:[{t:this.instance_75}]},12).to({state:[]},10).to({state:[{t:this.instance_76}]},32).to({state:[]},10).to({state:[{t:this.instance_77}]},6).to({state:[]},10).to({state:[{t:this.instance_74}]},20).to({state:[{t:this.instance_75}]},12).to({state:[]},10).wait(811));

	// Masked_Layer_226___221
	this.instance_78 = new lib.shape40("synched",0);
	this.instance_78.setTransform(-171.25,134);
	this.instance_78.alpha = 0.5;

	this.instance_79 = new lib.shape50("synched",0);
	this.instance_79.setTransform(-171.25,134);
	this.instance_79.alpha = 0.5;

	this.instance_80 = new lib.shape51("synched",0);
	this.instance_80.setTransform(-171.25,134);
	this.instance_80.alpha = 0.5;

	this.instance_81 = new lib.shape42("synched",0);
	this.instance_81.setTransform(-195.25,52.2);
	this.instance_81.alpha = 0.5;

	this.instance_82 = new lib.shape46("synched",0);
	this.instance_82.setTransform(-171.25,134);
	this.instance_82.alpha = 0.5;

	var maskedShapeInstanceList = [this.instance_78,this.instance_79,this.instance_80,this.instance_81,this.instance_82];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_4;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_78}]},147).to({state:[]},8).to({state:[{t:this.instance_79}]},65).to({state:[{t:this.instance_80}]},12).to({state:[{t:this.instance_81,p:{x:-195.25,y:52.2}}]},12).to({state:[]},12).to({state:[{t:this.instance_79}]},64).to({state:[{t:this.instance_80}]},12).to({state:[{t:this.instance_81,p:{x:-195.25,y:52.2}}]},12).to({state:[]},12).to({state:[{t:this.instance_79}]},64).to({state:[{t:this.instance_80}]},12).to({state:[{t:this.instance_81,p:{x:-195.25,y:52.2}}]},12).to({state:[]},12).to({state:[{t:this.instance_81,p:{x:-171.25,y:134}}]},23).to({state:[]},12).to({state:[{t:this.instance_82}]},3).to({state:[]},1).wait(795));

	// Masked_Layer_225___221
	this.instance_83 = new lib.shape46("synched",0);
	this.instance_83.setTransform(-221.1,168.5);
	this.instance_83.alpha = 0.5;

	this.instance_84 = new lib.shape42("synched",0);
	this.instance_84.setTransform(-195.25,133.85);
	this.instance_84.alpha = 0.5;

	var maskedShapeInstanceList = [this.instance_83,this.instance_84];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_4;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_83}]},155).to({state:[{t:this.instance_84}]},12).to({state:[]},11).to({state:[{t:this.instance_83}]},78).to({state:[{t:this.instance_84}]},12).to({state:[]},11).to({state:[{t:this.instance_83}]},77).to({state:[{t:this.instance_84}]},12).to({state:[]},11).to({state:[{t:this.instance_83}]},77).to({state:[{t:this.instance_84}]},12).to({state:[]},11).wait(811));

	// Masked_Layer_224___221
	this.instance_85 = new lib.shape36("synched",0);
	this.instance_85.setTransform(-176.6,299.45,0.3,0.3);
	this.instance_85.alpha = 0.5;
	this.instance_85._off = true;

	this.instance_86 = new lib.shape32("synched",0);
	this.instance_86.setTransform(-171.25,134);
	this.instance_86.alpha = 0.5;

	this.instance_87 = new lib.shape46("synched",0);
	this.instance_87.setTransform(-235.45,85);
	this.instance_87.alpha = 0.5;

	this.instance_88 = new lib.shape42("synched",0);
	this.instance_88.setTransform(-214.4,69.5);
	this.instance_88.alpha = 0.5;

	this.instance_89 = new lib.shape52("synched",0);
	this.instance_89.setTransform(-171.25,134);
	this.instance_89.alpha = 0.5;

	var maskedShapeInstanceList = [this.instance_85,this.instance_86,this.instance_87,this.instance_88,this.instance_89];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_4;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_85}]},178).to({state:[]},10).to({state:[{t:this.instance_86}]},18).to({state:[{t:this.instance_87}]},12).to({state:[{t:this.instance_88}]},12).to({state:[{t:this.instance_89}]},12).to({state:[]},12).to({state:[{t:this.instance_85}]},25).to({state:[]},10).to({state:[{t:this.instance_86}]},18).to({state:[{t:this.instance_87}]},12).to({state:[{t:this.instance_88}]},12).to({state:[{t:this.instance_89}]},12).to({state:[]},12).to({state:[{t:this.instance_85}]},24).to({state:[]},10).to({state:[{t:this.instance_86}]},18).to({state:[{t:this.instance_87}]},12).to({state:[{t:this.instance_88}]},12).to({state:[{t:this.instance_89}]},12).to({state:[]},12).to({state:[{t:this.instance_85}]},24).to({state:[]},10).to({state:[{t:this.instance_85}]},2).to({state:[]},4).wait(795));
	this.timeline.addTween(cjs.Tween.get(this.instance_85).wait(178).to({_off:false},0).to({_off:true},10).wait(91).to({_off:false},0).to({_off:true},10).wait(90).to({_off:false},0).to({_off:true},10).wait(90).to({_off:false},0).to({_off:true},10).wait(2).to({_off:false,x:-159,y:296.35},0).to({_off:true},4).wait(795));

	// Masked_Layer_223___221
	this.instance_90 = new lib.shape36("synched",0);
	this.instance_90.setTransform(-209.65,295.1,0.3,0.3,30.0001);
	this.instance_90.alpha = 0.5;
	var instance_90Filter_3 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_90.filters = [instance_90Filter_3];
	this.instance_90.cache(-24,-26,49,53);

	this.instance_91 = new lib.shape39("synched",0);
	this.instance_91.setTransform(-209.65,295.1,0.3,0.3,30.0001);
	this.instance_91.alpha = 0.5;
	this.instance_91._off = true;
	var instance_91Filter_4 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_91.filters = [instance_91Filter_4];
	this.instance_91.cache(-32,-10,63,60);

	this.instance_92 = new lib.shape43("synched",0);
	this.instance_92.setTransform(-209.65,295.1,0.3,0.3,30.0001);
	this.instance_92.alpha = 0.5;
	var instance_92Filter_5 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_92.filters = [instance_92Filter_5];
	this.instance_92.cache(-39,-4,75,60);

	var maskedShapeInstanceList = [this.instance_90,this.instance_91,this.instance_92];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_4;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_90,p:{alpha:0.5}}]},155).to({state:[{t:this.instance_91}]},10).to({state:[{t:this.instance_92,p:{alpha:0.5}}]},10).to({state:[]},10).to({state:[{t:this.instance_90,p:{alpha:1}}]},69).to({state:[{t:this.instance_91}]},10).to({state:[{t:this.instance_92,p:{alpha:1}}]},10).to({state:[]},10).to({state:[{t:this.instance_90,p:{alpha:0.5}}]},71).to({state:[{t:this.instance_91}]},10).to({state:[{t:this.instance_92,p:{alpha:0.5}}]},10).to({state:[]},10).to({state:[{t:this.instance_90,p:{alpha:0.5}}]},70).to({state:[{t:this.instance_91}]},10).to({state:[{t:this.instance_92,p:{alpha:0.5}}]},10).to({state:[]},10).to({state:[{t:this.instance_91}]},4).to({state:[]},6).wait(795));
	this.timeline.addTween(cjs.Tween.get(this.instance_91).wait(165).to({_off:false},0).to({_off:true},10).wait(89).to({_off:false,alpha:1},0).to({_off:true},10).wait(91).to({_off:false,alpha:0.5},0).to({_off:true},10).wait(90).to({_off:false},0).to({_off:true},10).wait(14).to({_off:false,rotation:0,x:-176.6,y:299.45},0).to({_off:true},6).wait(795));
	this.timeline.addTween(cjs.Tween.get(instance_90Filter_3).wait(244).to(new cjs.ColorFilter(0,0,0,1,180,179,1,0), 0).wait(91).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(90).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(825));
	this.timeline.addTween(cjs.Tween.get(instance_91Filter_4).wait(165).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(89).to(new cjs.ColorFilter(0,0,0,1,180,179,1,0), 0).wait(91).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(90).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(14).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(795));
	this.timeline.addTween(cjs.Tween.get(instance_92Filter_5).wait(175).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(89).to(new cjs.ColorFilter(0,0,0,1,180,179,1,0), 0).wait(91).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(90).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(805));

	// Masked_Layer_222___221
	this.instance_93 = new lib.shape15("synched",0);
	this.instance_93.setTransform(-171.25,134);
	this.instance_93.alpha = 0.1484;
	this.instance_93._off = true;

	var maskedShapeInstanceList = [this.instance_93];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_4;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_93).wait(147).to({_off:false},0).to({_off:true},372).wait(771));

	// Mask_Layer_218 (mask)
	var mask_5 = new cjs.Shape();
	mask_5._off = true;
	var mask_5_graphics_147 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_148 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_149 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_150 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_151 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_152 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_153 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_154 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_155 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_156 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_157 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_158 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_159 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_160 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_161 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_162 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_163 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_164 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_165 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_166 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_167 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_168 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_169 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_170 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_171 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_172 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_173 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_174 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_175 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_176 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_177 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_178 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_179 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_180 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_181 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_182 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_183 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_184 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_185 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_186 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_187 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_188 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_189 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_190 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_191 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_192 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_193 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_194 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_195 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_196 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_197 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_198 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_199 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_200 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_201 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_202 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_203 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_204 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_205 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_206 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_207 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_208 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_209 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_210 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_211 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_212 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_213 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_214 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_215 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_216 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_217 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_218 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_219 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_220 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_221 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_222 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_223 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_224 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_225 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_226 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_227 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_228 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_229 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_230 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_231 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_232 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_233 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_234 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_235 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_236 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_237 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_238 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_239 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_240 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_241 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_242 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_243 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_244 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_245 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_246 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_247 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_248 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_249 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_250 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_251 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_252 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_253 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_254 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_255 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_256 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_257 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_258 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_259 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_260 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_261 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_262 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_263 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_264 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_265 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_266 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_267 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_268 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_269 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_270 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_271 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_272 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_273 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_274 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_275 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_276 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_277 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_278 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_279 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_280 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_281 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_282 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_283 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_284 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_285 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_286 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_287 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_288 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_289 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_290 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_291 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_292 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_293 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_294 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_295 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_296 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_297 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_298 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_299 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_300 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_301 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_302 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_303 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_304 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_305 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_306 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_307 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_308 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_309 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_310 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_311 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_312 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_313 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_314 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_315 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_316 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_317 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_318 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_319 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_320 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_321 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_322 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_323 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_324 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_325 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_326 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_327 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_328 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_329 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_330 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_331 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_332 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_333 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_334 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_335 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_336 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_337 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_338 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_339 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_340 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_341 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_342 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_343 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_344 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_345 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_346 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_347 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_348 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_349 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_350 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_351 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_352 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_353 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_354 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_355 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_356 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_357 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_358 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_359 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_360 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_361 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_362 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_363 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_364 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_365 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_366 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_367 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_368 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_369 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_370 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_371 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_372 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_373 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_374 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_375 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_376 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_377 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_378 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_379 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_380 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_381 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_382 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_383 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_384 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_385 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_386 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_387 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_388 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_389 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_390 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_391 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_392 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_393 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_394 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_395 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_396 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_397 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_398 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_399 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_400 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_401 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_402 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_403 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_404 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_405 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_406 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_407 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_408 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_409 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_410 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_411 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_412 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_413 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_414 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_415 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_416 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_417 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_418 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_419 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_420 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_421 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_422 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_423 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_424 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_425 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_426 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_427 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_428 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_429 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_430 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_431 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_432 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_433 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_434 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_435 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_436 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_437 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_438 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_439 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_440 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_441 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_442 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_443 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_444 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_445 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_446 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_447 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_448 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_449 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_450 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_451 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_452 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_453 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_454 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_455 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_456 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_457 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_458 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_459 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_460 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_461 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_462 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_463 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_464 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_465 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_466 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_467 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_468 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_469 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_470 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_471 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_472 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_473 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_474 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_475 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_476 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_477 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_478 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_479 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_480 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_481 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_482 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_483 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_484 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_485 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_486 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_487 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_488 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_489 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_490 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_491 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_492 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_493 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_494 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_495 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_496 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_497 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_498 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_499 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_500 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_501 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_502 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_503 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_504 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_505 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_506 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_507 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_508 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_509 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_510 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_511 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_512 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_513 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_514 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_515 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_516 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_517 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");
	var mask_5_graphics_518 = new cjs.Graphics().p("AxvD5IAAnxMAjfAAAIAAHxg");

	this.timeline.addTween(cjs.Tween.get(mask_5).to({graphics:null,x:0,y:0}).wait(147).to({graphics:mask_5_graphics_147,x:-148.75,y:354.125}).wait(1).to({graphics:mask_5_graphics_148,x:-148.75,y:354.025}).wait(1).to({graphics:mask_5_graphics_149,x:-148.75,y:353.925}).wait(1).to({graphics:mask_5_graphics_150,x:-148.75,y:353.825}).wait(1).to({graphics:mask_5_graphics_151,x:-148.75,y:353.725}).wait(1).to({graphics:mask_5_graphics_152,x:-148.75,y:353.625}).wait(1).to({graphics:mask_5_graphics_153,x:-148.75,y:353.525}).wait(1).to({graphics:mask_5_graphics_154,x:-148.75,y:353.425}).wait(1).to({graphics:mask_5_graphics_155,x:-148.75,y:353.375}).wait(1).to({graphics:mask_5_graphics_156,x:-148.75,y:353.275}).wait(1).to({graphics:mask_5_graphics_157,x:-148.75,y:353.175}).wait(1).to({graphics:mask_5_graphics_158,x:-148.75,y:353.075}).wait(1).to({graphics:mask_5_graphics_159,x:-148.75,y:352.975}).wait(1).to({graphics:mask_5_graphics_160,x:-148.75,y:352.875}).wait(1).to({graphics:mask_5_graphics_161,x:-148.75,y:352.775}).wait(1).to({graphics:mask_5_graphics_162,x:-148.75,y:352.675}).wait(1).to({graphics:mask_5_graphics_163,x:-148.75,y:352.575}).wait(1).to({graphics:mask_5_graphics_164,x:-148.75,y:352.475}).wait(1).to({graphics:mask_5_graphics_165,x:-148.75,y:352.375}).wait(1).to({graphics:mask_5_graphics_166,x:-148.75,y:352.275}).wait(1).to({graphics:mask_5_graphics_167,x:-148.75,y:352.175}).wait(1).to({graphics:mask_5_graphics_168,x:-148.75,y:352.075}).wait(1).to({graphics:mask_5_graphics_169,x:-148.75,y:351.975}).wait(1).to({graphics:mask_5_graphics_170,x:-148.75,y:351.875}).wait(1).to({graphics:mask_5_graphics_171,x:-148.75,y:351.825}).wait(1).to({graphics:mask_5_graphics_172,x:-148.75,y:351.725}).wait(1).to({graphics:mask_5_graphics_173,x:-148.75,y:351.625}).wait(1).to({graphics:mask_5_graphics_174,x:-148.75,y:351.525}).wait(1).to({graphics:mask_5_graphics_175,x:-148.75,y:351.425}).wait(1).to({graphics:mask_5_graphics_176,x:-148.75,y:351.325}).wait(1).to({graphics:mask_5_graphics_177,x:-148.75,y:351.225}).wait(1).to({graphics:mask_5_graphics_178,x:-148.75,y:351.125}).wait(1).to({graphics:mask_5_graphics_179,x:-148.75,y:351.025}).wait(1).to({graphics:mask_5_graphics_180,x:-148.75,y:350.925}).wait(1).to({graphics:mask_5_graphics_181,x:-148.75,y:350.825}).wait(1).to({graphics:mask_5_graphics_182,x:-148.75,y:350.725}).wait(1).to({graphics:mask_5_graphics_183,x:-148.75,y:350.625}).wait(1).to({graphics:mask_5_graphics_184,x:-148.75,y:350.525}).wait(1).to({graphics:mask_5_graphics_185,x:-148.75,y:350.425}).wait(1).to({graphics:mask_5_graphics_186,x:-148.75,y:350.375}).wait(1).to({graphics:mask_5_graphics_187,x:-148.75,y:350.275}).wait(1).to({graphics:mask_5_graphics_188,x:-148.75,y:350.175}).wait(1).to({graphics:mask_5_graphics_189,x:-148.75,y:350.075}).wait(1).to({graphics:mask_5_graphics_190,x:-148.75,y:349.975}).wait(1).to({graphics:mask_5_graphics_191,x:-148.75,y:349.875}).wait(1).to({graphics:mask_5_graphics_192,x:-148.75,y:349.775}).wait(1).to({graphics:mask_5_graphics_193,x:-148.75,y:349.675}).wait(1).to({graphics:mask_5_graphics_194,x:-148.75,y:349.575}).wait(1).to({graphics:mask_5_graphics_195,x:-148.75,y:349.475}).wait(1).to({graphics:mask_5_graphics_196,x:-148.75,y:349.375}).wait(1).to({graphics:mask_5_graphics_197,x:-148.75,y:349.275}).wait(1).to({graphics:mask_5_graphics_198,x:-148.75,y:349.175}).wait(1).to({graphics:mask_5_graphics_199,x:-148.75,y:349.075}).wait(1).to({graphics:mask_5_graphics_200,x:-148.75,y:348.975}).wait(1).to({graphics:mask_5_graphics_201,x:-148.75,y:348.875}).wait(1).to({graphics:mask_5_graphics_202,x:-148.75,y:348.825}).wait(1).to({graphics:mask_5_graphics_203,x:-148.75,y:348.725}).wait(1).to({graphics:mask_5_graphics_204,x:-148.75,y:348.625}).wait(1).to({graphics:mask_5_graphics_205,x:-148.75,y:348.525}).wait(1).to({graphics:mask_5_graphics_206,x:-148.75,y:348.425}).wait(1).to({graphics:mask_5_graphics_207,x:-148.75,y:348.325}).wait(1).to({graphics:mask_5_graphics_208,x:-148.75,y:348.225}).wait(1).to({graphics:mask_5_graphics_209,x:-148.75,y:348.125}).wait(1).to({graphics:mask_5_graphics_210,x:-148.75,y:348.025}).wait(1).to({graphics:mask_5_graphics_211,x:-148.75,y:347.925}).wait(1).to({graphics:mask_5_graphics_212,x:-148.75,y:347.825}).wait(1).to({graphics:mask_5_graphics_213,x:-148.75,y:347.725}).wait(1).to({graphics:mask_5_graphics_214,x:-148.75,y:347.625}).wait(1).to({graphics:mask_5_graphics_215,x:-148.75,y:347.525}).wait(1).to({graphics:mask_5_graphics_216,x:-148.75,y:347.425}).wait(1).to({graphics:mask_5_graphics_217,x:-148.75,y:347.375}).wait(1).to({graphics:mask_5_graphics_218,x:-148.75,y:347.275}).wait(1).to({graphics:mask_5_graphics_219,x:-148.75,y:347.175}).wait(1).to({graphics:mask_5_graphics_220,x:-148.75,y:347.075}).wait(1).to({graphics:mask_5_graphics_221,x:-148.75,y:346.975}).wait(1).to({graphics:mask_5_graphics_222,x:-148.75,y:346.875}).wait(1).to({graphics:mask_5_graphics_223,x:-148.75,y:346.775}).wait(1).to({graphics:mask_5_graphics_224,x:-148.75,y:346.675}).wait(1).to({graphics:mask_5_graphics_225,x:-148.75,y:346.575}).wait(1).to({graphics:mask_5_graphics_226,x:-148.75,y:346.475}).wait(1).to({graphics:mask_5_graphics_227,x:-148.75,y:346.375}).wait(1).to({graphics:mask_5_graphics_228,x:-148.75,y:346.275}).wait(1).to({graphics:mask_5_graphics_229,x:-148.75,y:346.175}).wait(1).to({graphics:mask_5_graphics_230,x:-148.75,y:346.075}).wait(1).to({graphics:mask_5_graphics_231,x:-148.75,y:345.975}).wait(1).to({graphics:mask_5_graphics_232,x:-148.75,y:345.875}).wait(1).to({graphics:mask_5_graphics_233,x:-148.75,y:345.825}).wait(1).to({graphics:mask_5_graphics_234,x:-148.75,y:345.725}).wait(1).to({graphics:mask_5_graphics_235,x:-148.75,y:345.625}).wait(1).to({graphics:mask_5_graphics_236,x:-148.75,y:345.525}).wait(1).to({graphics:mask_5_graphics_237,x:-148.75,y:345.425}).wait(1).to({graphics:mask_5_graphics_238,x:-148.75,y:345.325}).wait(1).to({graphics:mask_5_graphics_239,x:-148.75,y:345.225}).wait(1).to({graphics:mask_5_graphics_240,x:-148.75,y:345.125}).wait(1).to({graphics:mask_5_graphics_241,x:-148.75,y:345.025}).wait(1).to({graphics:mask_5_graphics_242,x:-148.75,y:344.925}).wait(1).to({graphics:mask_5_graphics_243,x:-148.75,y:344.825}).wait(1).to({graphics:mask_5_graphics_244,x:-148.75,y:344.725}).wait(1).to({graphics:mask_5_graphics_245,x:-148.75,y:344.625}).wait(1).to({graphics:mask_5_graphics_246,x:-148.75,y:344.525}).wait(1).to({graphics:mask_5_graphics_247,x:-148.75,y:344.425}).wait(1).to({graphics:mask_5_graphics_248,x:-148.75,y:344.375}).wait(1).to({graphics:mask_5_graphics_249,x:-148.75,y:344.275}).wait(1).to({graphics:mask_5_graphics_250,x:-148.75,y:344.175}).wait(1).to({graphics:mask_5_graphics_251,x:-148.75,y:344.075}).wait(1).to({graphics:mask_5_graphics_252,x:-148.75,y:343.975}).wait(1).to({graphics:mask_5_graphics_253,x:-148.75,y:343.875}).wait(1).to({graphics:mask_5_graphics_254,x:-148.75,y:343.775}).wait(1).to({graphics:mask_5_graphics_255,x:-148.75,y:343.675}).wait(1).to({graphics:mask_5_graphics_256,x:-148.75,y:343.575}).wait(1).to({graphics:mask_5_graphics_257,x:-148.75,y:343.475}).wait(1).to({graphics:mask_5_graphics_258,x:-148.75,y:343.375}).wait(1).to({graphics:mask_5_graphics_259,x:-148.75,y:343.275}).wait(1).to({graphics:mask_5_graphics_260,x:-148.75,y:343.175}).wait(1).to({graphics:mask_5_graphics_261,x:-148.75,y:343.075}).wait(1).to({graphics:mask_5_graphics_262,x:-148.75,y:342.975}).wait(1).to({graphics:mask_5_graphics_263,x:-148.75,y:342.925}).wait(1).to({graphics:mask_5_graphics_264,x:-148.75,y:342.825}).wait(1).to({graphics:mask_5_graphics_265,x:-148.75,y:342.725}).wait(1).to({graphics:mask_5_graphics_266,x:-148.75,y:342.625}).wait(1).to({graphics:mask_5_graphics_267,x:-148.75,y:342.525}).wait(1).to({graphics:mask_5_graphics_268,x:-148.75,y:342.425}).wait(1).to({graphics:mask_5_graphics_269,x:-148.75,y:342.325}).wait(1).to({graphics:mask_5_graphics_270,x:-148.75,y:342.225}).wait(1).to({graphics:mask_5_graphics_271,x:-148.75,y:342.125}).wait(1).to({graphics:mask_5_graphics_272,x:-148.75,y:342.025}).wait(1).to({graphics:mask_5_graphics_273,x:-148.75,y:341.925}).wait(1).to({graphics:mask_5_graphics_274,x:-148.75,y:341.825}).wait(1).to({graphics:mask_5_graphics_275,x:-148.75,y:341.725}).wait(1).to({graphics:mask_5_graphics_276,x:-148.75,y:341.625}).wait(1).to({graphics:mask_5_graphics_277,x:-148.75,y:341.525}).wait(1).to({graphics:mask_5_graphics_278,x:-148.75,y:341.425}).wait(1).to({graphics:mask_5_graphics_279,x:-148.75,y:341.375}).wait(1).to({graphics:mask_5_graphics_280,x:-148.75,y:341.275}).wait(1).to({graphics:mask_5_graphics_281,x:-148.75,y:341.175}).wait(1).to({graphics:mask_5_graphics_282,x:-148.75,y:341.075}).wait(1).to({graphics:mask_5_graphics_283,x:-148.75,y:340.975}).wait(1).to({graphics:mask_5_graphics_284,x:-148.75,y:340.875}).wait(1).to({graphics:mask_5_graphics_285,x:-148.75,y:340.775}).wait(1).to({graphics:mask_5_graphics_286,x:-148.75,y:340.675}).wait(1).to({graphics:mask_5_graphics_287,x:-148.75,y:340.575}).wait(1).to({graphics:mask_5_graphics_288,x:-148.75,y:340.475}).wait(1).to({graphics:mask_5_graphics_289,x:-148.75,y:340.375}).wait(1).to({graphics:mask_5_graphics_290,x:-148.75,y:340.275}).wait(1).to({graphics:mask_5_graphics_291,x:-148.75,y:340.175}).wait(1).to({graphics:mask_5_graphics_292,x:-148.75,y:340.075}).wait(1).to({graphics:mask_5_graphics_293,x:-148.75,y:339.975}).wait(1).to({graphics:mask_5_graphics_294,x:-148.75,y:339.925}).wait(1).to({graphics:mask_5_graphics_295,x:-148.75,y:339.825}).wait(1).to({graphics:mask_5_graphics_296,x:-148.75,y:339.725}).wait(1).to({graphics:mask_5_graphics_297,x:-148.75,y:339.625}).wait(1).to({graphics:mask_5_graphics_298,x:-148.75,y:339.525}).wait(1).to({graphics:mask_5_graphics_299,x:-148.75,y:339.425}).wait(1).to({graphics:mask_5_graphics_300,x:-148.75,y:339.325}).wait(1).to({graphics:mask_5_graphics_301,x:-148.75,y:339.225}).wait(1).to({graphics:mask_5_graphics_302,x:-148.75,y:339.125}).wait(1).to({graphics:mask_5_graphics_303,x:-148.75,y:339.025}).wait(1).to({graphics:mask_5_graphics_304,x:-148.75,y:338.925}).wait(1).to({graphics:mask_5_graphics_305,x:-148.75,y:338.825}).wait(1).to({graphics:mask_5_graphics_306,x:-148.75,y:338.725}).wait(1).to({graphics:mask_5_graphics_307,x:-148.75,y:338.625}).wait(1).to({graphics:mask_5_graphics_308,x:-148.75,y:338.525}).wait(1).to({graphics:mask_5_graphics_309,x:-148.75,y:338.425}).wait(1).to({graphics:mask_5_graphics_310,x:-148.75,y:338.375}).wait(1).to({graphics:mask_5_graphics_311,x:-148.75,y:338.275}).wait(1).to({graphics:mask_5_graphics_312,x:-148.75,y:338.175}).wait(1).to({graphics:mask_5_graphics_313,x:-148.75,y:338.075}).wait(1).to({graphics:mask_5_graphics_314,x:-148.75,y:337.975}).wait(1).to({graphics:mask_5_graphics_315,x:-148.75,y:337.875}).wait(1).to({graphics:mask_5_graphics_316,x:-148.75,y:337.775}).wait(1).to({graphics:mask_5_graphics_317,x:-148.75,y:337.675}).wait(1).to({graphics:mask_5_graphics_318,x:-148.75,y:337.575}).wait(1).to({graphics:mask_5_graphics_319,x:-148.75,y:337.475}).wait(1).to({graphics:mask_5_graphics_320,x:-148.75,y:337.375}).wait(1).to({graphics:mask_5_graphics_321,x:-148.75,y:337.275}).wait(1).to({graphics:mask_5_graphics_322,x:-148.75,y:337.175}).wait(1).to({graphics:mask_5_graphics_323,x:-148.75,y:337.075}).wait(1).to({graphics:mask_5_graphics_324,x:-148.75,y:336.975}).wait(1).to({graphics:mask_5_graphics_325,x:-148.75,y:336.925}).wait(1).to({graphics:mask_5_graphics_326,x:-148.75,y:336.825}).wait(1).to({graphics:mask_5_graphics_327,x:-148.75,y:336.725}).wait(1).to({graphics:mask_5_graphics_328,x:-148.75,y:336.625}).wait(1).to({graphics:mask_5_graphics_329,x:-148.75,y:336.525}).wait(1).to({graphics:mask_5_graphics_330,x:-148.75,y:336.425}).wait(1).to({graphics:mask_5_graphics_331,x:-148.75,y:336.325}).wait(1).to({graphics:mask_5_graphics_332,x:-148.75,y:336.225}).wait(1).to({graphics:mask_5_graphics_333,x:-148.75,y:336.125}).wait(1).to({graphics:mask_5_graphics_334,x:-148.75,y:336.025}).wait(1).to({graphics:mask_5_graphics_335,x:-148.75,y:335.925}).wait(1).to({graphics:mask_5_graphics_336,x:-148.75,y:335.825}).wait(1).to({graphics:mask_5_graphics_337,x:-148.75,y:335.725}).wait(1).to({graphics:mask_5_graphics_338,x:-148.75,y:335.625}).wait(1).to({graphics:mask_5_graphics_339,x:-148.75,y:335.525}).wait(1).to({graphics:mask_5_graphics_340,x:-148.75,y:335.425}).wait(1).to({graphics:mask_5_graphics_341,x:-148.75,y:335.375}).wait(1).to({graphics:mask_5_graphics_342,x:-148.75,y:335.275}).wait(1).to({graphics:mask_5_graphics_343,x:-148.75,y:335.175}).wait(1).to({graphics:mask_5_graphics_344,x:-148.75,y:335.075}).wait(1).to({graphics:mask_5_graphics_345,x:-148.75,y:334.975}).wait(1).to({graphics:mask_5_graphics_346,x:-148.75,y:334.875}).wait(1).to({graphics:mask_5_graphics_347,x:-148.75,y:334.775}).wait(1).to({graphics:mask_5_graphics_348,x:-148.75,y:334.675}).wait(1).to({graphics:mask_5_graphics_349,x:-148.75,y:334.575}).wait(1).to({graphics:mask_5_graphics_350,x:-148.75,y:334.475}).wait(1).to({graphics:mask_5_graphics_351,x:-148.75,y:334.375}).wait(1).to({graphics:mask_5_graphics_352,x:-148.75,y:334.275}).wait(1).to({graphics:mask_5_graphics_353,x:-148.75,y:334.175}).wait(1).to({graphics:mask_5_graphics_354,x:-148.75,y:334.075}).wait(1).to({graphics:mask_5_graphics_355,x:-148.75,y:333.975}).wait(1).to({graphics:mask_5_graphics_356,x:-148.75,y:333.925}).wait(1).to({graphics:mask_5_graphics_357,x:-148.75,y:333.825}).wait(1).to({graphics:mask_5_graphics_358,x:-148.75,y:333.725}).wait(1).to({graphics:mask_5_graphics_359,x:-148.75,y:333.625}).wait(1).to({graphics:mask_5_graphics_360,x:-148.75,y:333.525}).wait(1).to({graphics:mask_5_graphics_361,x:-148.75,y:333.425}).wait(1).to({graphics:mask_5_graphics_362,x:-148.75,y:333.325}).wait(1).to({graphics:mask_5_graphics_363,x:-148.75,y:333.225}).wait(1).to({graphics:mask_5_graphics_364,x:-148.75,y:333.125}).wait(1).to({graphics:mask_5_graphics_365,x:-148.75,y:333.025}).wait(1).to({graphics:mask_5_graphics_366,x:-148.75,y:332.925}).wait(1).to({graphics:mask_5_graphics_367,x:-148.75,y:332.825}).wait(1).to({graphics:mask_5_graphics_368,x:-148.75,y:332.725}).wait(1).to({graphics:mask_5_graphics_369,x:-148.75,y:332.625}).wait(1).to({graphics:mask_5_graphics_370,x:-148.75,y:332.525}).wait(1).to({graphics:mask_5_graphics_371,x:-148.75,y:332.425}).wait(1).to({graphics:mask_5_graphics_372,x:-148.75,y:332.375}).wait(1).to({graphics:mask_5_graphics_373,x:-148.75,y:332.275}).wait(1).to({graphics:mask_5_graphics_374,x:-148.75,y:332.175}).wait(1).to({graphics:mask_5_graphics_375,x:-148.75,y:332.075}).wait(1).to({graphics:mask_5_graphics_376,x:-148.75,y:331.975}).wait(1).to({graphics:mask_5_graphics_377,x:-148.75,y:331.875}).wait(1).to({graphics:mask_5_graphics_378,x:-148.75,y:331.775}).wait(1).to({graphics:mask_5_graphics_379,x:-148.75,y:331.675}).wait(1).to({graphics:mask_5_graphics_380,x:-148.75,y:331.575}).wait(1).to({graphics:mask_5_graphics_381,x:-148.75,y:331.475}).wait(1).to({graphics:mask_5_graphics_382,x:-148.75,y:331.375}).wait(1).to({graphics:mask_5_graphics_383,x:-148.75,y:331.275}).wait(1).to({graphics:mask_5_graphics_384,x:-148.75,y:331.175}).wait(1).to({graphics:mask_5_graphics_385,x:-148.75,y:331.075}).wait(1).to({graphics:mask_5_graphics_386,x:-148.75,y:330.975}).wait(1).to({graphics:mask_5_graphics_387,x:-148.75,y:330.925}).wait(1).to({graphics:mask_5_graphics_388,x:-148.75,y:330.825}).wait(1).to({graphics:mask_5_graphics_389,x:-148.75,y:330.725}).wait(1).to({graphics:mask_5_graphics_390,x:-148.75,y:330.625}).wait(1).to({graphics:mask_5_graphics_391,x:-148.75,y:330.525}).wait(1).to({graphics:mask_5_graphics_392,x:-148.75,y:330.425}).wait(1).to({graphics:mask_5_graphics_393,x:-148.75,y:330.325}).wait(1).to({graphics:mask_5_graphics_394,x:-148.75,y:330.225}).wait(1).to({graphics:mask_5_graphics_395,x:-148.75,y:330.125}).wait(1).to({graphics:mask_5_graphics_396,x:-148.75,y:330.025}).wait(1).to({graphics:mask_5_graphics_397,x:-148.75,y:329.925}).wait(1).to({graphics:mask_5_graphics_398,x:-148.75,y:329.825}).wait(1).to({graphics:mask_5_graphics_399,x:-148.75,y:329.725}).wait(1).to({graphics:mask_5_graphics_400,x:-148.75,y:329.625}).wait(1).to({graphics:mask_5_graphics_401,x:-148.75,y:329.525}).wait(1).to({graphics:mask_5_graphics_402,x:-148.75,y:329.425}).wait(1).to({graphics:mask_5_graphics_403,x:-148.75,y:329.375}).wait(1).to({graphics:mask_5_graphics_404,x:-148.75,y:329.275}).wait(1).to({graphics:mask_5_graphics_405,x:-148.75,y:329.175}).wait(1).to({graphics:mask_5_graphics_406,x:-148.75,y:329.075}).wait(1).to({graphics:mask_5_graphics_407,x:-148.75,y:328.975}).wait(1).to({graphics:mask_5_graphics_408,x:-148.75,y:328.875}).wait(1).to({graphics:mask_5_graphics_409,x:-148.75,y:328.775}).wait(1).to({graphics:mask_5_graphics_410,x:-148.75,y:328.675}).wait(1).to({graphics:mask_5_graphics_411,x:-148.75,y:328.575}).wait(1).to({graphics:mask_5_graphics_412,x:-148.75,y:328.475}).wait(1).to({graphics:mask_5_graphics_413,x:-148.75,y:328.375}).wait(1).to({graphics:mask_5_graphics_414,x:-148.75,y:328.275}).wait(1).to({graphics:mask_5_graphics_415,x:-148.75,y:328.175}).wait(1).to({graphics:mask_5_graphics_416,x:-148.75,y:328.075}).wait(1).to({graphics:mask_5_graphics_417,x:-148.75,y:327.975}).wait(1).to({graphics:mask_5_graphics_418,x:-148.75,y:327.925}).wait(1).to({graphics:mask_5_graphics_419,x:-148.75,y:327.825}).wait(1).to({graphics:mask_5_graphics_420,x:-148.75,y:327.725}).wait(1).to({graphics:mask_5_graphics_421,x:-148.75,y:327.625}).wait(1).to({graphics:mask_5_graphics_422,x:-148.75,y:327.525}).wait(1).to({graphics:mask_5_graphics_423,x:-148.75,y:327.425}).wait(1).to({graphics:mask_5_graphics_424,x:-148.75,y:327.325}).wait(1).to({graphics:mask_5_graphics_425,x:-148.75,y:327.225}).wait(1).to({graphics:mask_5_graphics_426,x:-148.75,y:327.125}).wait(1).to({graphics:mask_5_graphics_427,x:-148.75,y:327.025}).wait(1).to({graphics:mask_5_graphics_428,x:-148.75,y:326.925}).wait(1).to({graphics:mask_5_graphics_429,x:-148.75,y:326.825}).wait(1).to({graphics:mask_5_graphics_430,x:-148.75,y:326.725}).wait(1).to({graphics:mask_5_graphics_431,x:-148.75,y:326.625}).wait(1).to({graphics:mask_5_graphics_432,x:-148.75,y:326.525}).wait(1).to({graphics:mask_5_graphics_433,x:-148.75,y:326.475}).wait(1).to({graphics:mask_5_graphics_434,x:-148.75,y:326.375}).wait(1).to({graphics:mask_5_graphics_435,x:-148.75,y:326.275}).wait(1).to({graphics:mask_5_graphics_436,x:-148.75,y:326.175}).wait(1).to({graphics:mask_5_graphics_437,x:-148.75,y:326.075}).wait(1).to({graphics:mask_5_graphics_438,x:-148.75,y:325.975}).wait(1).to({graphics:mask_5_graphics_439,x:-148.75,y:325.875}).wait(1).to({graphics:mask_5_graphics_440,x:-148.75,y:325.775}).wait(1).to({graphics:mask_5_graphics_441,x:-148.75,y:325.675}).wait(1).to({graphics:mask_5_graphics_442,x:-148.75,y:325.575}).wait(1).to({graphics:mask_5_graphics_443,x:-148.75,y:325.475}).wait(1).to({graphics:mask_5_graphics_444,x:-148.75,y:325.375}).wait(1).to({graphics:mask_5_graphics_445,x:-148.75,y:325.275}).wait(1).to({graphics:mask_5_graphics_446,x:-148.75,y:325.175}).wait(1).to({graphics:mask_5_graphics_447,x:-148.75,y:325.075}).wait(1).to({graphics:mask_5_graphics_448,x:-148.75,y:324.975}).wait(1).to({graphics:mask_5_graphics_449,x:-148.75,y:324.925}).wait(1).to({graphics:mask_5_graphics_450,x:-148.75,y:324.825}).wait(1).to({graphics:mask_5_graphics_451,x:-148.75,y:324.725}).wait(1).to({graphics:mask_5_graphics_452,x:-148.75,y:324.625}).wait(1).to({graphics:mask_5_graphics_453,x:-148.75,y:324.525}).wait(1).to({graphics:mask_5_graphics_454,x:-148.75,y:324.425}).wait(1).to({graphics:mask_5_graphics_455,x:-148.75,y:324.325}).wait(1).to({graphics:mask_5_graphics_456,x:-148.75,y:324.225}).wait(1).to({graphics:mask_5_graphics_457,x:-148.75,y:324.125}).wait(1).to({graphics:mask_5_graphics_458,x:-148.75,y:324.025}).wait(1).to({graphics:mask_5_graphics_459,x:-148.75,y:323.925}).wait(1).to({graphics:mask_5_graphics_460,x:-148.75,y:323.825}).wait(1).to({graphics:mask_5_graphics_461,x:-148.75,y:323.725}).wait(1).to({graphics:mask_5_graphics_462,x:-148.75,y:323.625}).wait(1).to({graphics:mask_5_graphics_463,x:-148.75,y:323.525}).wait(1).to({graphics:mask_5_graphics_464,x:-148.75,y:323.475}).wait(1).to({graphics:mask_5_graphics_465,x:-148.75,y:323.375}).wait(1).to({graphics:mask_5_graphics_466,x:-148.75,y:323.275}).wait(1).to({graphics:mask_5_graphics_467,x:-148.75,y:323.175}).wait(1).to({graphics:mask_5_graphics_468,x:-148.75,y:323.075}).wait(1).to({graphics:mask_5_graphics_469,x:-148.75,y:322.975}).wait(1).to({graphics:mask_5_graphics_470,x:-148.75,y:322.875}).wait(1).to({graphics:mask_5_graphics_471,x:-148.75,y:322.775}).wait(1).to({graphics:mask_5_graphics_472,x:-148.75,y:322.675}).wait(1).to({graphics:mask_5_graphics_473,x:-148.75,y:322.575}).wait(1).to({graphics:mask_5_graphics_474,x:-148.75,y:322.475}).wait(1).to({graphics:mask_5_graphics_475,x:-148.75,y:322.375}).wait(1).to({graphics:mask_5_graphics_476,x:-148.75,y:322.275}).wait(1).to({graphics:mask_5_graphics_477,x:-148.75,y:322.175}).wait(1).to({graphics:mask_5_graphics_478,x:-148.75,y:322.075}).wait(1).to({graphics:mask_5_graphics_479,x:-148.75,y:321.975}).wait(1).to({graphics:mask_5_graphics_480,x:-148.75,y:321.925}).wait(1).to({graphics:mask_5_graphics_481,x:-148.75,y:321.825}).wait(1).to({graphics:mask_5_graphics_482,x:-148.75,y:321.725}).wait(1).to({graphics:mask_5_graphics_483,x:-148.75,y:321.625}).wait(1).to({graphics:mask_5_graphics_484,x:-148.75,y:321.525}).wait(1).to({graphics:mask_5_graphics_485,x:-148.75,y:321.425}).wait(1).to({graphics:mask_5_graphics_486,x:-148.75,y:321.325}).wait(1).to({graphics:mask_5_graphics_487,x:-148.75,y:321.225}).wait(1).to({graphics:mask_5_graphics_488,x:-148.75,y:321.125}).wait(1).to({graphics:mask_5_graphics_489,x:-148.75,y:321.025}).wait(1).to({graphics:mask_5_graphics_490,x:-148.75,y:320.925}).wait(1).to({graphics:mask_5_graphics_491,x:-148.75,y:320.825}).wait(1).to({graphics:mask_5_graphics_492,x:-148.75,y:320.725}).wait(1).to({graphics:mask_5_graphics_493,x:-148.75,y:320.625}).wait(1).to({graphics:mask_5_graphics_494,x:-148.75,y:320.525}).wait(1).to({graphics:mask_5_graphics_495,x:-148.75,y:320.475}).wait(1).to({graphics:mask_5_graphics_496,x:-148.75,y:320.375}).wait(1).to({graphics:mask_5_graphics_497,x:-148.75,y:320.275}).wait(1).to({graphics:mask_5_graphics_498,x:-148.75,y:320.175}).wait(1).to({graphics:mask_5_graphics_499,x:-148.75,y:320.075}).wait(1).to({graphics:mask_5_graphics_500,x:-148.75,y:319.975}).wait(1).to({graphics:mask_5_graphics_501,x:-148.75,y:319.875}).wait(1).to({graphics:mask_5_graphics_502,x:-148.75,y:319.775}).wait(1).to({graphics:mask_5_graphics_503,x:-148.75,y:319.675}).wait(1).to({graphics:mask_5_graphics_504,x:-148.75,y:319.575}).wait(1).to({graphics:mask_5_graphics_505,x:-148.75,y:319.475}).wait(1).to({graphics:mask_5_graphics_506,x:-148.75,y:319.375}).wait(1).to({graphics:mask_5_graphics_507,x:-148.75,y:319.275}).wait(1).to({graphics:mask_5_graphics_508,x:-148.75,y:319.175}).wait(1).to({graphics:mask_5_graphics_509,x:-148.75,y:319.075}).wait(1).to({graphics:mask_5_graphics_510,x:-148.75,y:318.975}).wait(1).to({graphics:mask_5_graphics_511,x:-148.75,y:318.925}).wait(1).to({graphics:mask_5_graphics_512,x:-148.75,y:318.825}).wait(1).to({graphics:mask_5_graphics_513,x:-148.75,y:318.725}).wait(1).to({graphics:mask_5_graphics_514,x:-148.75,y:318.625}).wait(1).to({graphics:mask_5_graphics_515,x:-148.75,y:318.525}).wait(1).to({graphics:mask_5_graphics_516,x:-148.75,y:318.425}).wait(1).to({graphics:mask_5_graphics_517,x:-148.75,y:318.325}).wait(1).to({graphics:mask_5_graphics_518,x:-148.75,y:318.225}).wait(772));

	// Masked_Layer_219___218
	this.instance_94 = new lib.shape14("synched",0);
	this.instance_94._off = true;

	var maskedShapeInstanceList = [this.instance_94];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_5;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_94).wait(147).to({_off:false},0).to({_off:true},372).wait(771));

	// Mask_Layer_216 (mask)
	var mask_6 = new cjs.Shape();
	mask_6._off = true;
	mask_6.graphics.p("A0eb9MAAAg35MAnMAAAMAAAA35g");
	mask_6.setTransform(-131.125,155.8552);

	// Masked_Layer_249___216
	this.instance_95 = new lib.shape19("synched",0);
	this.instance_95.setTransform(-224.6,162.3);
	this.instance_95.alpha = 0.5;
	this.instance_95._off = true;

	var maskedShapeInstanceList = [this.instance_95];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_6;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_95).wait(145).to({_off:false},0).to({_off:true},2).wait(1143));

	// Masked_Layer_248___216
	this.instance_96 = new lib.shape19("synched",0);
	this.instance_96.setTransform(-270.1,108.95);
	this.instance_96.alpha = 0.5;
	this.instance_96._off = true;

	var maskedShapeInstanceList = [this.instance_96];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_6;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_96).wait(120).to({_off:false},0).to({_off:true},10).wait(1160));

	// Masked_Layer_243___216
	this.instance_97 = new lib.shape19("synched",0);
	this.instance_97.setTransform(-276.35,140.2);
	this.instance_97.alpha = 0.5;
	this.instance_97._off = true;

	var maskedShapeInstanceList = [this.instance_97];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_6;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_97).wait(130).to({_off:false},0).wait(10).to({x:-282.6,y:171.45},0).to({_off:true},7).wait(1143));

	// Masked_Layer_242___216
	this.instance_98 = new lib.shape19("synched",0);
	this.instance_98.setTransform(-226.35,77.7);
	this.instance_98.alpha = 0.5;

	var maskedShapeInstanceList = [this.instance_98];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_6;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_98).wait(105).to({x:-238.85,y:108.95},0).wait(10).to({x:-251.35,y:152.7},0).to({_off:true},10).wait(1165));

	// Masked_Layer_241___216
	this.instance_99 = new lib.shape37("synched",0);
	this.instance_99.setTransform(-170.55,171.45);
	this.instance_99.alpha = 0.5;
	this.instance_99._off = true;

	var maskedShapeInstanceList = [this.instance_99];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_6;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_99).wait(125).to({_off:false},0).to({_off:true},5).wait(1160));

	// Masked_Layer_237___216
	this.instance_100 = new lib.shape36("synched",0);
	this.instance_100.setTransform(-207.65,294.95,0.3,0.3,30.0001);
	this.instance_100.alpha = 0.5;

	this.instance_101 = new lib.shape39("synched",0);
	this.instance_101.setTransform(-207.65,294.95,0.3,0.3,30.0001);
	this.instance_101.alpha = 0.5;

	var maskedShapeInstanceList = [this.instance_100,this.instance_101];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_6;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_100}]},130).to({state:[{t:this.instance_101}]},10).to({state:[]},7).wait(1143));

	// Masked_Layer_236___216
	this.instance_102 = new lib.shape18("synched",0);
	this.instance_102.setTransform(-170.55,171.45);
	this.instance_102.alpha = 0.1484;

	var maskedShapeInstanceList = [this.instance_102];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_6;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_102).to({_off:true},147).wait(1143));

	// Masked_Layer_235___216
	this.instance_103 = new lib.shape17("synched",0);
	this.instance_103.setTransform(-164.95,218.25);

	this.instance_104 = new lib.shape31("synched",0);
	this.instance_104.setTransform(-164.95,218.25);

	this.instance_105 = new lib.shape33("synched",0);
	this.instance_105.setTransform(-164.95,218.25);

	var maskedShapeInstanceList = [this.instance_103,this.instance_104,this.instance_105];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_6;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_103}]},125).to({state:[{t:this.instance_104}]},9).to({state:[{t:this.instance_105}]},10).to({state:[]},3).wait(1143));

	// Masked_Layer_234___216
	this.instance_106 = new lib.shape17("synched",0);
	this.instance_106.setTransform(-164.95,218.25);

	this.instance_107 = new lib.shape31("synched",0);
	this.instance_107.setTransform(-164.95,218.25);

	this.instance_108 = new lib.shape33("synched",0);
	this.instance_108.setTransform(-164.95,218.25);

	var maskedShapeInstanceList = [this.instance_106,this.instance_107,this.instance_108];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_6;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_106}]}).to({state:[{t:this.instance_107}]},105).to({state:[{t:this.instance_108}]},10).to({state:[]},10).wait(1165));

	// Masked_Layer_225___216
	this.instance_109 = new lib.shape36("synched",0);
	this.instance_109.setTransform(-187.8,295.75,0.3,0.3);
	this.instance_109.alpha = 0.5;

	this.instance_110 = new lib.shape39("synched",0);
	this.instance_110.setTransform(-187.8,295.75,0.3,0.3);
	this.instance_110.alpha = 0.5;

	this.instance_111 = new lib.shape43("synched",0);
	this.instance_111.setTransform(-187.8,295.75,0.3,0.3);
	this.instance_111.alpha = 0.5;

	var maskedShapeInstanceList = [this.instance_109,this.instance_110,this.instance_111];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_6;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_109}]},125).to({state:[{t:this.instance_110}]},10).to({state:[{t:this.instance_111}]},10).to({state:[]},2).wait(1143));

	// Masked_Layer_223___216
	this.instance_112 = new lib.shape16("synched",0);
	this.instance_112.setTransform(-171.25,134);
	this.instance_112.alpha = 0.5;

	this.instance_113 = new lib.shape42("synched",0);
	this.instance_113.setTransform(-171.25,9.15);
	this.instance_113.alpha = 0.5;

	var maskedShapeInstanceList = [this.instance_112,this.instance_113];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_6;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_112}]}).to({state:[]},107).to({state:[{t:this.instance_113}]},38).to({state:[]},2).wait(1143));

	// Masked_Layer_221___216
	this.instance_114 = new lib.shape34("synched",0);
	this.instance_114.setTransform(-171.25,134);
	this.instance_114.alpha = 0.5;

	this.instance_115 = new lib.shape38("synched",0);
	this.instance_115.setTransform(-171.25,134);
	this.instance_115.alpha = 0.5;

	this.instance_116 = new lib.shape40("synched",0);
	this.instance_116.setTransform(-171.25,134);
	this.instance_116.alpha = 0.5;

	var maskedShapeInstanceList = [this.instance_114,this.instance_115,this.instance_116];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_6;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_114}]},119).to({state:[{t:this.instance_115}]},12).to({state:[{t:this.instance_116}]},12).to({state:[]},4).wait(1143));

	// Masked_Layer_219___216
	this.instance_117 = new lib.shape32("synched",0);
	this.instance_117.setTransform(-171.25,134);
	this.instance_117.alpha = 0.5;
	this.instance_117._off = true;

	var maskedShapeInstanceList = [this.instance_117];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_6;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_117).wait(107).to({_off:false},0).to({_off:true},12).wait(1171));

	// Masked_Layer_217___216
	this.instance_118 = new lib.shape15("synched",0);
	this.instance_118.setTransform(-171.25,134);
	this.instance_118.alpha = 0.1602;

	var maskedShapeInstanceList = [this.instance_118];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_6;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_118).to({_off:true},147).wait(1143));

	// Layer_216
	this.instance_119 = new lib.sprite11();
	this.instance_119.setTransform(-170.15,202.05,0.9745,0.9745,29.999);
	this.instance_119._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_119).wait(297).to({_off:false},0).to({_off:true},222).wait(771));

	// Layer_215
	this.instance_120 = new lib.shape55("synched",0);
	this.instance_120.setTransform(-156.05,192.1,0.4205,0.4205);
	this.instance_120.alpha = 0.25;
	this.instance_120._off = true;
	var instance_120Filter_6 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_120.filters = [instance_120Filter_6];
	this.instance_120.cache(-25,-24,95,56);

	this.timeline.addTween(cjs.Tween.get(this.instance_120).wait(297).to({_off:false},0).wait(1).to({x:-165.3,y:190.75},0).to({startPosition:0},8).wait(1).to({x:-156.05,y:192.1},0).to({startPosition:0},10).wait(1).to({x:-165.3,y:190.75},0).to({startPosition:0},8).wait(1).to({x:-156.05,y:192.1},0).to({startPosition:0},10).wait(1).to({x:-165.3,y:190.75},0).to({startPosition:0},8).wait(1).to({x:-156.05,y:192.1},0).to({startPosition:0},10).wait(1).to({x:-165.3,y:190.75},0).to({alpha:0.6992},8).wait(1).to({x:-156.05,y:192.1},0).to({startPosition:0},10).wait(1).to({x:-165.3,y:190.75},0).to({startPosition:0},8).wait(1).to({x:-156.05,y:192.1},0).to({startPosition:0},10).wait(1).to({x:-165.3,y:190.75},0).to({startPosition:0},8).wait(1).to({x:-156.05,y:192.1},0).to({startPosition:0},10).wait(1).to({x:-165.3,y:190.75},0).to({startPosition:0},8).wait(1).to({x:-156.05,y:192.1},0).to({startPosition:0},10).wait(1).to({x:-165.3,y:190.75},0).to({startPosition:0},8).wait(1).to({x:-156.05,y:192.1},0).to({startPosition:0},10).wait(1).to({x:-165.3,y:190.75},0).to({startPosition:0},8).wait(1).to({x:-156.05,y:192.1},0).to({startPosition:0},10).wait(1).to({x:-165.3,y:190.75},0).to({startPosition:0},8).wait(1).to({x:-156.05,y:192.1},0).to({startPosition:0},10).wait(1).to({x:-165.3,y:190.75},0).to({startPosition:0},8).wait(1).to({x:-156.05,y:192.1},0).to({alpha:0.25},10).to({x:-165.3,y:190.75},1).to({_off:true},1).wait(771));
	this.timeline.addTween(cjs.Tween.get(instance_120Filter_6).wait(298).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(9).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 10).wait(1).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 8).wait(1).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 10).wait(1).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 8).wait(1).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 10).wait(1).to(new cjs.ColorFilter(1,1,1,1,255,255,255,0), 8).wait(141).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 10).wait(772));

	// Mask_Layer_213 (mask)
	var mask_7 = new cjs.Shape();
	mask_7._off = true;
	mask_7.graphics.p("A0fdnIAAnyMAjfAAAIAAHyg");
	mask_7.setTransform(-131.166,189.4907);

	// Masked_Layer_214___213
	this.instance_121 = new lib.shape14("synched",0);

	var maskedShapeInstanceList = [this.instance_121];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_7;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_121).to({_off:true},147).wait(1143));

	// Layer_213
	this.instance_122 = new lib.sprite11();
	this.instance_122.setTransform(-164.35,22.4,1.2936,1.2936,29.9998);
	this.instance_122._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_122).wait(297).to({_off:false},0).wait(1).to({y:113.2},49).to({y:24.8},49).wait(1).to({y:22.4},0).wait(1).to({y:113.2},49).to({y:24.8},49).wait(1).to({y:22.4},0).wait(1).to({y:72.4},20).to({_off:true},1).wait(771));

	// Layer_211
	this.instance_123 = new lib.sprite11();
	this.instance_123.setTransform(-170.15,202.05,0.9745,0.9745,29.999);

	this.instance_124 = new lib.sprite56();
	this.instance_124.setTransform(-154.2,17.4,0.3114,0.3114);
	this.instance_124.alpha = 0.25;
	this.instance_124._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_123}]}).to({state:[{t:this.instance_124}]},297).to({state:[{t:this.instance_124}]},1).to({state:[{t:this.instance_124}]},49).to({state:[{t:this.instance_124}]},49).to({state:[{t:this.instance_124}]},1).to({state:[{t:this.instance_124}]},1).to({state:[{t:this.instance_124}]},49).to({state:[{t:this.instance_124}]},49).to({state:[{t:this.instance_124}]},1).to({state:[{t:this.instance_124}]},1).to({state:[{t:this.instance_124}]},20).to({state:[]},1).wait(771));
	this.timeline.addTween(cjs.Tween.get(this.instance_124).wait(297).to({_off:false},0).wait(1).to({y:108.2},49).to({y:19.8},49).wait(1).to({y:17.4},0).wait(1).to({y:108.2},49).to({y:19.8},49).wait(1).to({y:17.4},0).wait(1).to({y:67.4},20).to({_off:true},1).wait(771));

	// Layer_210
	this.instance_125 = new lib.shape57("synched",0);
	this.instance_125.setTransform(-149.3,-78);
	this.instance_125._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_125).wait(297).to({_off:false},0).to({startPosition:0},1).to({y:12.8},49).to({y:-75.6},49).wait(1).to({y:-78},0).to({startPosition:0},1).to({y:12.8},49).to({y:-75.6},49).wait(1).to({y:-78},0).to({startPosition:0},1).to({y:-28},20).to({_off:true},1).wait(771));

	// Layer_209
	this.instance_126 = new lib.sprite11();
	this.instance_126.setTransform(-164.35,22.4,1.2936,1.2936,29.9998);

	this.timeline.addTween(cjs.Tween.get(this.instance_126).wait(98).to({y:29.9},1).to({y:113.2},46).to({y:24.8},49).wait(1).to({y:22.4},0).wait(1).to({y:113.2},49).to({y:24.8},49).wait(1).to({y:22.4},0).to({_off:true},2).wait(993));

	// Layer_208
	this.instance_127 = new lib.shape12("synched",0);
	this.instance_127.setTransform(-149.3,-78);

	this.timeline.addTween(cjs.Tween.get(this.instance_127).to({startPosition:0},98).to({y:-70.5},1).to({y:12.8},46).to({y:-75.6},49).wait(1).to({y:-78},0).to({startPosition:0},1).to({y:12.8},49).to({y:-75.6},49).wait(1).to({y:-78},0).to({_off:true},2).wait(993));

	// Layer_203
	this.instance_128 = new lib.shape9("synched",0);
	this.instance_128.setTransform(-148.25,80.25);

	this.instance_129 = new lib.shape54("synched",0);
	this.instance_129.setTransform(-148.25,80.25);
	this.instance_129._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_128).to({startPosition:0},98).to({scaleX:0.9993,scaleY:0.9993,rotation:4.0086,guide:{path:[-148.2,80.3,-150.4,80.1,-152.5,80.5,-152.5,80.5,-152.6,80.5]}},1).to({scaleX:0.9988,scaleY:0.9988,rotation:6.5572,guide:{path:[-152.5,80.5,-154.2,80.8,-155.8,81.5,-155.8,81.5,-155.8,81.5]}},2).to({scaleX:0.9984,scaleY:0.9984,rotation:9.2936,guide:{path:[-155.9,81.5,-157.6,82.2,-159.1,83.5,-159.2,83.5,-159.2,83.5]}},2).to({scaleX:0.9982,scaleY:0.9982,rotation:14.7793,guide:{path:[-159.1,83.5,-162.5,86.2,-165,91.3,-165,91.3,-165,91.3]}},4).to({scaleX:0.9973,scaleY:0.9973,rotation:15.2937,guide:{path:[-165.1,91.3,-165.6,92.5,-166.2,93.9,-166.2,94,-166.3,94]}},1).to({rotation:15.8179,guide:{path:[-166.2,94,-166.7,95.3,-167.2,96.7,-167.2,96.8,-167.2,96.8]}},1).to({scaleX:0.9976,scaleY:0.9976,rotation:22.4972,guide:{path:[-167.3,96.9,-172.4,112.9,-171.5,130.3,-171.5,130.3,-171.5,130.3]}},11).to({scaleX:0.9956,scaleY:0.9956,rotation:21.8079,guide:{path:[-171.4,130.2,-171.3,131.9,-171.2,133.4,-171.1,134.3,-171.1,134.9]}},2).to({scaleX:0.9958,scaleY:0.9958,rotation:21.3234,guide:{path:[-171.1,134.9,-170.9,136.1,-170.8,137.1]}},1).to({scaleX:0.9987,scaleY:0.9987,rotation:17.098,guide:{path:[-170.8,137.1,-170.8,137.1,-170.8,137.1,-169.4,148.5,-165.7,157.4]}},10).to({scaleX:0.9979,scaleY:0.9979,rotation:15.5569,guide:{path:[-165.7,157.4,-165.2,158.4,-164.8,159.3,-164.8,159.3,-164.8,159.3]}},1).to({scaleX:0.9993,scaleY:0.9993,rotation:5.5513,guide:{path:[-164.8,159.4,-164.8,159.4,-164.8,159.4,-163.3,162.7,-161.4,165.6,-159.2,169.1,-156.7,170.9,-156.7,170.9,-156.7,170.9]}},7).to({scaleX:0.9998,scaleY:0.9998,rotation:1.2934,guide:{path:[-156.7,170.8,-153.9,172.7,-150.9,172.9,-150.9,172.9,-150.9,172.9]}},3).to({scaleX:1,scaleY:1,rotation:0,guide:{path:[-150.8,172.9,-149.7,172.9,-148.7,172.7]}},1).to({scaleX:0.9997,scaleY:0.9997,rotation:-1.0372,guide:{path:[-148.6,172.7,-148.6,172.7,-148.5,172.7,-147.8,172.6,-147,172.4]}},1).to({scaleX:0.9981,scaleY:0.9981,rotation:-13.9838,guide:{path:[-147,172.5,-147,172.5,-147,172.4,-143.3,171.5,-139.1,168.6,-136,166.4,-133.7,162.7]}},11).to({scaleX:0.9969,scaleY:0.9969,rotation:-20.0562,guide:{path:[-133.7,162.7,-133.6,162.7,-133.6,162.6,-130.4,157.5,-128.4,149.4,-128.1,148.1,-127.8,146.8]}},7).to({scaleX:0.9959,scaleY:0.9959,rotation:-20.3308,guide:{path:[-127.8,146.7,-127.8,146.7,-127.8,146.7,-127.5,145.1,-127.2,143.9]}},1).to({scaleX:0.9963,scaleY:0.9963,rotation:-22.0743,guide:{path:[-127.2,144,-127.2,143.9,-127.2,143.9,-126.2,138.1,-125.9,132.3]}},4).to({scaleX:0.9976,scaleY:0.9976,rotation:-22.6191,guide:{path:[-126,132.3,-126,132.3,-125.9,132.2,-125.8,130.5,-125.8,129.3]}},1).to({scaleX:0.9965,scaleY:0.9965,rotation:-22.0586,guide:{path:[-125.8,129.3,-125.8,129.2,-125.8,129.2,-125.7,127.8,-125.7,126.4]}},1).to({scaleX:0.9988,scaleY:0.9988,rotation:-16.7905,guide:{path:[-125.7,126.3,-125.7,126.3,-125.7,126.3,-125.7,123.3,-125.9,120.4,-126.5,107.8,-130.2,97.1,-130.2,97.1,-130.2,97.1]}},11).to({scaleX:0.999,scaleY:0.999,rotation:-7.5657,guide:{path:[-130.2,97.1,-130.9,95,-131.8,93.1,-134.5,86.5,-138.6,82.9,-138.6,82.9,-138.6,82.9]}},7).to({scaleX:0.9995,scaleY:0.9995,rotation:-3.7831,guide:{path:[-138.6,82.9,-140.7,81,-143.2,80,-143.2,80,-143.2,80]}},3).to({scaleX:0.9998,scaleY:0.9998,rotation:-1.2619,guide:{path:[-143.1,80.1,-144.7,79.4,-146.5,79.1]}},2).wait(1).to({scaleX:1,scaleY:1,rotation:0,x:-148.25,y:80.25},0).to({startPosition:0},1).to({scaleX:0.9998,scaleY:0.9998,rotation:1.2734,guide:{path:[-148.2,80.2,-149,79.6,-149.8,79.3,-149.8,79.3,-149.8,79.3]}},1).to({scaleX:0.9995,scaleY:0.9995,rotation:2.5471,guide:{path:[-149.9,79.3,-150.4,79,-151.4,79,-151.4,79,-151.4,79]}},1).to({scaleX:0.9988,scaleY:0.9988,rotation:6.5572,guide:{path:[-151.3,79.1,-153.6,79,-156.1,81.3,-156.1,81.3,-156.1,81.3]}},3).to({scaleX:0.9984,scaleY:0.9984,rotation:9.2936,guide:{path:[-156.1,81.3,-157.4,82.3,-158.7,84.1,-158.7,84.1,-158.7,84.1]}},2).to({scaleX:0.9982,scaleY:0.9982,rotation:14.7793,guide:{path:[-158.8,84.1,-159.1,84.5,-159.4,84.9,-161.6,88,-163.5,91.9,-163.6,92,-163.6,92]}},4).to({scaleX:0.9973,scaleY:0.9973,rotation:15.2937,guide:{path:[-163.6,92,-164.1,93.2,-164.7,94.5,-164.8,94.6,-164.8,94.6]}},1).to({rotation:15.8179,guide:{path:[-164.7,94.7,-165.2,95.9,-165.8,97.3,-165.8,97.3,-165.8,97.3]}},1).to({scaleX:0.9976,scaleY:0.9976,rotation:22.4972,guide:{path:[-165.7,97.4,-167.5,101.9,-168.9,107.4,-171.4,117.7,-171.6,130.1,-171.6,130.1,-171.6,130.1]}},11).to({scaleX:0.9956,scaleY:0.9956,rotation:21.8079,guide:{path:[-171.6,130.1,-171.6,132.7,-171.5,134.9,-171.5,134.9,-171.5,134.9]}},2).to({scaleX:0.9958,scaleY:0.9958,rotation:21.3234,guide:{path:[-171.6,134.9,-171.6,136.2,-171.5,137.1,-171.5,137.1,-171.5,137.1]}},1).to({scaleX:0.9987,scaleY:0.9987,rotation:17.098,guide:{path:[-171.5,137.1,-171.5,137.3,-171.5,137.4,-170.9,148.7,-166.5,157.7,-166.4,157.7,-166.4,157.7]}},10).to({scaleX:0.9979,scaleY:0.9979,rotation:15.5569,guide:{path:[-166.5,157.8,-165.9,158.8,-165.4,159.7,-165.4,159.7,-165.4,159.7]}},1).to({scaleX:0.9993,scaleY:0.9993,rotation:5.5513,guide:{path:[-165.5,159.7,-165.5,159.7,-165.5,159.7,-163.9,162.6,-162,165.1,-159.3,168.7,-156.8,170.9,-156.8,170.9,-156.8,170.9]}},7).to({scaleX:0.9998,scaleY:0.9998,rotation:1.2934,guide:{path:[-156.8,170.8,-154,173,-151.4,173.7]}},3).to({scaleX:1,scaleY:1,rotation:0,guide:{path:[-151.4,173.8,-150,174.2,-148.7,174.1]}},1).to({scaleX:0.9997,scaleY:0.9997,rotation:-1.0372,guide:{path:[-148.7,174.1,-148.7,174.1,-148.6,174.1,-147.6,174,-146.6,173.7]}},1).to({scaleX:0.9981,scaleY:0.9981,rotation:-13.9838,guide:{path:[-146.6,173.7,-146.5,173.7,-146.5,173.7,-143.6,172.8,-141,169.9,-137.9,166.4,-135.4,162.2]}},11).to({scaleX:0.9969,scaleY:0.9969,rotation:-20.0562,guide:{path:[-135.4,162.3,-135.3,162,-135.1,161.7,-131.4,155.1,-129.1,146.8]}},7).to({scaleX:0.9959,scaleY:0.9959,rotation:-20.3308,guide:{path:[-129.1,146.7,-129,146.5,-129,146.3,-128.6,144.9,-128.3,143.6]}},1).to({scaleX:0.9963,scaleY:0.9963,rotation:-22.0743,guide:{path:[-128.4,143.7,-128.4,143.6,-128.4,143.6,-128,141.9,-127.6,140.2,-126.8,136.1,-126.3,132.3]}},4).to({scaleX:0.9976,scaleY:0.9976,rotation:-22.6191,guide:{path:[-126.4,132.2,-126.4,132.2,-126.3,132.1,-126.2,130.6,-126.1,129.3]}},1).to({scaleX:0.9965,scaleY:0.9965,rotation:-22.0586,guide:{path:[-126,129.3,-126,129.3,-126,129.3,-125.8,127.4,-125.7,126.5]}},1).to({scaleX:0.9988,scaleY:0.9988,rotation:-16.7905,guide:{path:[-125.8,126.4,-125.8,126.3,-125.8,126.3,-125.1,113.7,-127.5,101.3,-128,98.9,-128.6,96.7]}},11).to({scaleX:0.999,scaleY:0.999,rotation:-7.5657,guide:{path:[-128.6,96.7,-128.6,96.7,-128.6,96.7,-131.5,86.8,-138.2,82.3,-138.2,82.3,-138.2,82.3]}},7).to({scaleX:0.9995,scaleY:0.9995,rotation:-3.7831,guide:{path:[-138.2,82.4,-140.4,80.8,-143,79.9,-143,79.9,-143.1,79.9]}},3).to({scaleX:0.9998,scaleY:0.9998,rotation:-1.2619,guide:{path:[-143.1,79.9,-144.7,79.4,-146.5,79.1]}},2).wait(1).to({scaleX:1,scaleY:1,rotation:0,x:-148.25,y:80.25},0).to({_off:true},2).wait(993));
	this.timeline.addTween(cjs.Tween.get(this.instance_129).wait(297).to({_off:false},0).to({startPosition:0},1).to({scaleX:0.9998,scaleY:0.9998,rotation:1.2734,guide:{path:[-148.2,80.2,-149,79.6,-149.8,79.3,-149.8,79.3,-149.8,79.3]}},1).to({scaleX:0.9995,scaleY:0.9995,rotation:2.5471,guide:{path:[-149.9,79.3,-150.4,79,-151.4,79,-151.4,79,-151.4,79]}},1).to({scaleX:0.9988,scaleY:0.9988,rotation:6.5572,guide:{path:[-151.3,79.1,-153.6,79,-156.1,81.3,-156.1,81.3,-156.1,81.3]}},3).to({scaleX:0.9984,scaleY:0.9984,rotation:9.2936,guide:{path:[-156.1,81.3,-157.4,82.3,-158.7,84.1,-158.7,84.1,-158.7,84.1]}},2).to({scaleX:0.9982,scaleY:0.9982,rotation:14.7793,guide:{path:[-158.8,84.1,-159.1,84.5,-159.4,84.9,-161.6,88,-163.5,91.9,-163.6,92,-163.6,92]}},4).to({scaleX:0.9973,scaleY:0.9973,rotation:15.2937,guide:{path:[-163.6,92,-164.1,93.2,-164.7,94.5,-164.8,94.6,-164.8,94.6]}},1).to({rotation:15.8179,guide:{path:[-164.7,94.7,-165.2,95.9,-165.8,97.3,-165.8,97.3,-165.8,97.3]}},1).to({scaleX:0.9976,scaleY:0.9976,rotation:22.4972,guide:{path:[-165.7,97.4,-167.5,101.9,-168.9,107.4,-171.4,117.7,-171.6,130.1,-171.6,130.1,-171.6,130.1]}},11).to({scaleX:0.9956,scaleY:0.9956,rotation:21.8079,guide:{path:[-171.6,130.1,-171.6,132.7,-171.5,134.9,-171.5,134.9,-171.5,134.9]}},2).to({scaleX:0.9958,scaleY:0.9958,rotation:21.3234,guide:{path:[-171.6,134.9,-171.6,136.2,-171.5,137.1,-171.5,137.1,-171.5,137.1]}},1).to({scaleX:0.9987,scaleY:0.9987,rotation:17.098,guide:{path:[-171.5,137.1,-171.5,137.3,-171.5,137.4,-170.9,148.7,-166.5,157.7,-166.4,157.7,-166.4,157.7]}},10).to({scaleX:0.9979,scaleY:0.9979,rotation:15.5569,guide:{path:[-166.5,157.8,-165.9,158.8,-165.4,159.7,-165.4,159.7,-165.4,159.7]}},1).to({scaleX:0.9993,scaleY:0.9993,rotation:5.5513,guide:{path:[-165.5,159.7,-165.5,159.7,-165.5,159.7,-163.9,162.6,-162,165.1,-159.3,168.7,-156.8,170.9,-156.8,170.9,-156.8,170.9]}},7).to({scaleX:0.9998,scaleY:0.9998,rotation:1.2934,guide:{path:[-156.8,170.8,-154,173,-151.4,173.7]}},3).to({scaleX:1,scaleY:1,rotation:0,guide:{path:[-151.4,173.8,-150,174.2,-148.7,174.1]}},1).to({scaleX:0.9997,scaleY:0.9997,rotation:-1.0372,guide:{path:[-148.7,174.1,-148.7,174.1,-148.6,174.1,-147.6,174,-146.6,173.7]}},1).to({scaleX:0.9981,scaleY:0.9981,rotation:-13.9838,guide:{path:[-146.6,173.7,-146.5,173.7,-146.5,173.7,-143.6,172.8,-141,169.9,-137.9,166.4,-135.4,162.2]}},11).to({scaleX:0.9969,scaleY:0.9969,rotation:-20.0562,guide:{path:[-135.4,162.3,-135.3,162,-135.1,161.7,-131.4,155.1,-129.1,146.8]}},7).to({scaleX:0.9959,scaleY:0.9959,rotation:-20.3308,guide:{path:[-129.1,146.7,-129,146.5,-129,146.3,-128.6,144.9,-128.3,143.6]}},1).to({scaleX:0.9963,scaleY:0.9963,rotation:-22.0743,guide:{path:[-128.4,143.7,-128.4,143.6,-128.4,143.6,-128,141.9,-127.6,140.2,-126.8,136.1,-126.3,132.3]}},4).to({scaleX:0.9976,scaleY:0.9976,rotation:-22.6191,guide:{path:[-126.4,132.2,-126.4,132.2,-126.3,132.1,-126.2,130.6,-126.1,129.3]}},1).to({scaleX:0.9965,scaleY:0.9965,rotation:-22.0586,guide:{path:[-126,129.3,-126,129.3,-126,129.3,-125.8,127.4,-125.7,126.5]}},1).to({scaleX:0.9988,scaleY:0.9988,rotation:-16.7905,guide:{path:[-125.8,126.4,-125.8,126.3,-125.8,126.3,-125.1,113.7,-127.5,101.3,-128,98.9,-128.6,96.7]}},11).to({scaleX:0.999,scaleY:0.999,rotation:-7.5657,guide:{path:[-128.6,96.7,-128.6,96.7,-128.6,96.7,-131.5,86.8,-138.2,82.3,-138.2,82.3,-138.2,82.3]}},7).to({scaleX:0.9995,scaleY:0.9995,rotation:-3.7831,guide:{path:[-138.2,82.4,-140.4,80.8,-143,79.9,-143,79.9,-143.1,79.9]}},3).to({scaleX:0.9998,scaleY:0.9998,rotation:-1.2619,guide:{path:[-143.1,79.9,-144.7,79.4,-146.5,79.1]}},2).wait(1).to({scaleX:1,scaleY:1,rotation:0,x:-148.25,y:80.25},0).to({startPosition:0},1).to({scaleX:0.9998,scaleY:0.9998,rotation:1.2734,guide:{path:[-148.2,80.2,-149,79.6,-149.8,79.3,-149.8,79.3,-149.8,79.3]}},1).to({scaleX:0.9995,scaleY:0.9995,rotation:2.5471,guide:{path:[-149.9,79.3,-150.4,79,-151.4,79,-151.4,79,-151.4,79]}},1).to({scaleX:0.9988,scaleY:0.9988,rotation:6.5572,guide:{path:[-151.3,79.1,-153.6,79,-156.1,81.3,-156.1,81.3,-156.1,81.3]}},3).to({scaleX:0.9984,scaleY:0.9984,rotation:9.2936,guide:{path:[-156.1,81.3,-157.4,82.3,-158.7,84.1,-158.7,84.1,-158.7,84.1]}},2).to({scaleX:0.9982,scaleY:0.9982,rotation:14.7793,guide:{path:[-158.8,84.1,-159.1,84.5,-159.4,84.9,-161.6,88,-163.5,91.9,-163.6,92,-163.6,92]}},4).to({scaleX:0.9973,scaleY:0.9973,rotation:15.2937,guide:{path:[-163.6,92,-164.1,93.2,-164.7,94.5,-164.8,94.6,-164.8,94.6]}},1).to({rotation:15.8179,guide:{path:[-164.7,94.7,-165.2,95.9,-165.8,97.3,-165.8,97.3,-165.8,97.3]}},1).to({scaleX:0.9976,scaleY:0.9976,rotation:22.4972,guide:{path:[-165.7,97.4,-167.5,101.9,-168.9,107.4,-171.4,117.7,-171.6,130.1,-171.6,130.1,-171.6,130.1]}},11).to({scaleX:0.9956,scaleY:0.9956,rotation:21.8079,guide:{path:[-171.6,130.1,-171.6,132.7,-171.5,134.9,-171.5,134.9,-171.5,134.9]}},2).to({scaleX:0.9958,scaleY:0.9958,rotation:21.3234,guide:{path:[-171.6,134.9,-171.6,136.2,-171.5,137.1,-171.5,137.1,-171.5,137.1]}},1).to({scaleX:0.9987,scaleY:0.9987,rotation:17.098,guide:{path:[-171.5,137.1,-171.5,137.3,-171.5,137.4,-170.9,148.7,-166.5,157.7,-166.4,157.7,-166.4,157.7]}},10).to({scaleX:0.9979,scaleY:0.9979,rotation:15.5569,guide:{path:[-166.5,157.8,-165.9,158.8,-165.4,159.7,-165.4,159.7,-165.4,159.7]}},1).to({scaleX:0.9993,scaleY:0.9993,rotation:5.5513,guide:{path:[-165.5,159.7,-165.5,159.7,-165.5,159.7,-163.9,162.6,-162,165.1,-159.3,168.7,-156.8,170.9,-156.8,170.9,-156.8,170.9]}},7).to({scaleX:0.9998,scaleY:0.9998,rotation:1.2934,guide:{path:[-156.8,170.8,-154,173,-151.4,173.7]}},3).to({scaleX:1,scaleY:1,rotation:0,guide:{path:[-151.4,173.8,-150,174.2,-148.7,174.1]}},1).to({scaleX:0.9997,scaleY:0.9997,rotation:-1.0372,guide:{path:[-148.7,174.1,-148.7,174.1,-148.6,174.1,-147.5,174,-146.5,173.7,-143.7,172.8,-141,169.9,-139,167.7,-137.3,165.1]}},1).to({scaleX:0.9981,scaleY:0.9981,rotation:-13.9838,guide:{path:[-137.3,165.1,-136.3,163.7,-135.4,162.2]}},11).to({scaleX:0.9969,scaleY:0.9969,rotation:-20.0562,guide:{path:[-135.4,162.3,-135.3,162,-135.1,161.7,-131.4,155.1,-129.1,146.8]}},7).to({scaleX:0.9959,scaleY:0.9959,rotation:-20.3308,guide:{path:[-129.1,146.7,-129,146.5,-129,146.3,-128.6,144.9,-128.3,143.6]}},1).to({scaleX:0.9963,scaleY:0.9963,rotation:-22.0743,guide:{path:[-128.4,143.7,-128.4,143.6,-128.4,143.6,-128,141.9,-127.6,140.2,-126.8,136.1,-126.3,132.3]}},4).to({scaleX:0.9976,scaleY:0.9976,rotation:-22.6191,guide:{path:[-126.4,132.2,-126.4,132.2,-126.3,132.1,-126.2,130.6,-126.1,129.3]}},1).to({scaleX:0.9965,scaleY:0.9965,rotation:-22.0586,guide:{path:[-126,129.3,-126,129.3,-126,129.3,-125.8,127.4,-125.7,126.5]}},1).to({scaleX:0.9988,scaleY:0.9988,rotation:-16.7905,guide:{path:[-125.8,126.4,-125.8,126.3,-125.8,126.3,-125.1,113.7,-127.5,101.3,-128,98.9,-128.6,96.7]}},11).to({scaleX:0.999,scaleY:0.999,rotation:-7.5657,guide:{path:[-128.6,96.7,-128.6,96.7,-128.6,96.7,-131.5,86.8,-138.2,82.3,-138.2,82.3,-138.2,82.3]}},7).to({scaleX:0.9995,scaleY:0.9995,rotation:-3.7831,guide:{path:[-138.2,82.4,-140.4,80.8,-143,79.9,-143,79.9,-143.1,79.9]}},3).to({scaleX:0.9998,scaleY:0.9998,rotation:-1.2619,guide:{path:[-143.1,79.9,-144.7,79.4,-146.5,79.1]}},2).wait(1).to({scaleX:1,scaleY:1,rotation:0,x:-148.25,y:80.25},0).to({startPosition:0},1).to({scaleX:0.9998,scaleY:0.9998,rotation:1.2734,guide:{path:[-148.2,80.2,-149,79.6,-149.8,79.3,-149.8,79.3,-149.8,79.3]}},1).to({scaleX:0.9995,scaleY:0.9995,rotation:2.5471,guide:{path:[-149.9,79.3,-150.5,79,-151.4,79,-151.4,79,-151.4,79]}},1).to({scaleX:0.9988,scaleY:0.9988,rotation:6.5572,guide:{path:[-151.3,79.1,-153.6,79,-156.2,81.3,-156.2,81.3,-156.2,81.3]}},3).to({scaleX:0.9984,scaleY:0.9984,rotation:9.2936,guide:{path:[-156.1,81.3,-157.4,82.4,-158.7,84.1,-158.7,84.1,-158.7,84.1]}},2).to({scaleX:0.9982,scaleY:0.9982,rotation:14.7793,guide:{path:[-158.8,84.2,-159.1,84.4,-159.4,84.9,-161.6,88.1,-163.5,92.1,-163.6,92.1,-163.6,92.1]}},4).to({scaleX:0.9973,scaleY:0.9973,rotation:15.2937,guide:{path:[-163.5,92.1,-164,93.3,-164.6,94.7,-164.6,94.7,-164.6,94.7]}},1).to({rotation:15.8179,guide:{path:[-164.8,94.7,-165.2,95.9,-165.8,97.3,-165.8,97.3,-165.8,97.3]}},1).to({scaleX:0.9967,scaleY:0.9967,rotation:20.0534,x:-171.9,y:117.35},7).to({_off:true},1).wait(771));

	// Layer_201
	this.instance_130 = new lib.shape7("synched",0);
	this.instance_130.setTransform(-148.7,169.75);

	this.instance_131 = new lib.shape53("synched",0);
	this.instance_131.setTransform(-148.7,169.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_130}]},195).to({state:[]},1).to({state:[{t:this.instance_130}]},99).to({state:[]},1).to({state:[{t:this.instance_131}]},1).to({state:[]},1).to({state:[{t:this.instance_131}]},99).to({state:[]},1).to({state:[{t:this.instance_131}]},99).to({state:[]},1).wait(792));

	// Layer_200
	this.instance_132 = new lib.sprite8();
	this.instance_132.setTransform(-148.7,169.75);

	this.instance_133 = new lib.sprite59();
	this.instance_133.setTransform(-148.7,169.75);
	this.instance_133._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_132).wait(98).to({scaleX:0.9994,scaleY:0.9994,rotation:-10.7942,guide:{path:[-148.6,169.8,-150.5,170,-152.4,170.2,-152.4,170.3,-152.4,170.3]}},1).to({scaleX:0.9999,scaleY:0.9999,rotation:-178.2318,guide:{path:[-152.4,170.2,-168.1,172.8,-169.1,182.5,-170.2,193.3,-162.9,202,-157.1,208.8,-149.3,211.1]}},46).to({rotation:-181.7656,guide:{path:[-149.4,211,-149.4,211,-149.4,211,-148.7,211.2,-148.1,211.3]}},1).to({scaleX:0.9998,scaleY:0.9998,rotation:-356.6937,guide:{path:[-148.2,211.4,-148.2,211.4,-148.1,211.4,-146.4,211.8,-144.6,212,-133.6,213.3,-129,196.4,-127.6,191.6,-128.6,187.1,-129.6,182.6,-132.3,179,-135,175.5,-139,173.2,-143.1,170.8,-147.9,170.4]}},48).to({_off:true},1).wait(1).to({_off:false,scaleX:1,scaleY:1,rotation:-360,x:-148.7,y:169.75},0).to({scaleX:0.9999,scaleY:0.9999,rotation:-538.2318,guide:{path:[-148.6,169.8,-156.6,170.1,-161.9,175.1,-167.1,180.1,-168.6,186.7,-170.1,193.3,-167.5,199.8,-164.8,206.4,-157.1,209.8,-153.1,211.6,-149.5,211.9,-149.5,211.9,-149.5,211.9]}},49).to({rotation:-541.7656,guide:{path:[-149.5,211.9,-148.8,211.9,-148.2,211.9,-148.2,211.9,-148.2,211.9]}},1).to({scaleX:0.9998,scaleY:0.9998,rotation:-716.6937,guide:{path:[-148.2,211.9,-143.1,212.1,-139.2,209.3,-131.9,204.1,-129.9,195.9,-127.8,187.6,-131.9,179.6,-135.9,171.5,-147.9,170.4]}},48).to({_off:true},1).wait(1).to({_off:false,scaleX:1,scaleY:1,rotation:-720,x:-148.7,y:169.75},0).to({_off:true},1).wait(993));
	this.timeline.addTween(cjs.Tween.get(this.instance_133).wait(298).to({_off:false},0).to({scaleX:0.9999,scaleY:0.9999,rotation:-178.2318,guide:{path:[-148.6,169.8,-156.6,170.1,-161.9,175.1,-167.1,180.1,-168.6,186.7,-170.1,193.3,-167.5,199.8,-164.8,206.4,-157.1,209.8,-153.1,211.6,-149.5,211.9,-149.5,211.9,-149.5,211.9]}},49).to({rotation:-181.7656,guide:{path:[-149.5,211.9,-148.8,211.9,-148.2,211.9,-148.2,211.9,-148.2,211.9]}},1).to({scaleX:0.9998,scaleY:0.9998,rotation:-356.6937,guide:{path:[-148.2,211.9,-143.1,212.1,-139.2,209.3,-131.9,204.1,-129.9,195.9,-127.8,187.6,-131.9,179.6,-135.9,171.5,-147.9,170.4]}},48).to({_off:true},1).wait(1).to({_off:false,scaleX:1,scaleY:1,rotation:-360,x:-148.7,y:169.75},0).to({scaleX:0.9999,scaleY:0.9999,rotation:-538.2318,guide:{path:[-148.6,169.8,-156.6,170.1,-161.9,175.1,-167.1,180.1,-168.6,186.7,-170.1,193.3,-167.5,199.8,-164.8,206.4,-157.1,209.8,-153.1,211.6,-149.5,211.9,-149.5,211.9,-149.5,211.9]}},49).to({rotation:-541.7656,guide:{path:[-149.5,211.9,-148.8,211.9,-148.2,211.9,-148.2,211.9,-148.2,211.9]}},1).to({scaleX:0.9998,scaleY:0.9998,rotation:-716.6937,x:-148,y:170.45},48).to({_off:true},1).wait(1).to({_off:false,scaleX:1,scaleY:1,rotation:-720,x:-148.7,y:169.75},0).to({scaleX:0.9991,scaleY:0.9991,rotation:-792.7318,x:-168.55,y:184.5},20).to({_off:true},1).wait(771));

	// Layer_199
	this.instance_134 = new lib.shape6("synched",0);
	this.instance_134.setTransform(-149.2,-181.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_134).wait(133).to({startPosition:0},0).to({y:-176.8},12).to({y:-181.4},11).wait(1).to({y:-181.8},0).to({startPosition:0},76).to({y:-176.8},12).to({y:-181.4},11).wait(1).to({y:-181.8},0).to({startPosition:0},78).to({y:-176.8},12).to({y:-181.4},11).wait(1).to({y:-181.8},0).to({startPosition:0},76).to({y:-176.8},12).to({y:-181.4},11).wait(1).to({y:-181.8},0).to({_off:true},60).wait(771));

	// Mask_Layer_196 (mask)
	var mask_8 = new cjs.Shape();
	mask_8._off = true;
	var mask_8_graphics_0 = new cjs.Graphics().p("Ai+KeIAA07IF8AAIAAU7g");
	var mask_8_graphics_1 = new cjs.Graphics().p("Ai+KcIAA03IF8AAIAAU3g");
	var mask_8_graphics_2 = new cjs.Graphics().p("Ai+KZIAA0xIF8AAIAAUxg");
	var mask_8_graphics_3 = new cjs.Graphics().p("Ai+KXIAA0tIF8AAIAAUtg");
	var mask_8_graphics_4 = new cjs.Graphics().p("Ai+KUIAA0nIF8AAIAAUng");
	var mask_8_graphics_5 = new cjs.Graphics().p("Ai+KSIAA0jIF8AAIAAUjg");
	var mask_8_graphics_6 = new cjs.Graphics().p("Ai+KPIAA0dIF8AAIAAUdg");
	var mask_8_graphics_7 = new cjs.Graphics().p("Ai+KNIAA0YIF8AAIAAUYg");
	var mask_8_graphics_8 = new cjs.Graphics().p("Ai+KKIAA0TIF8AAIAAUTg");
	var mask_8_graphics_9 = new cjs.Graphics().p("Ai+KIIAA0OIF8AAIAAUOg");
	var mask_8_graphics_10 = new cjs.Graphics().p("Ai+KFIAA0JIF8AAIAAUJg");
	var mask_8_graphics_11 = new cjs.Graphics().p("Ai+KDIAA0EIF8AAIAAUEg");
	var mask_8_graphics_12 = new cjs.Graphics().p("Ai+KAIAAz/IF8AAIAAT/g");
	var mask_8_graphics_13 = new cjs.Graphics().p("Ai+J+IAAz7IF8AAIAAT7g");
	var mask_8_graphics_14 = new cjs.Graphics().p("Ai+J7IAAz1IF8AAIAAT1g");
	var mask_8_graphics_15 = new cjs.Graphics().p("Ai+J5IAAzxIF8AAIAATxg");
	var mask_8_graphics_16 = new cjs.Graphics().p("Ai+J2IAAzrIF8AAIAATrg");
	var mask_8_graphics_17 = new cjs.Graphics().p("Ai+J0IAAznIF8AAIAATng");
	var mask_8_graphics_18 = new cjs.Graphics().p("Ai+JxIAAzhIF8AAIAAThg");
	var mask_8_graphics_19 = new cjs.Graphics().p("Ai+JuIAAzbIF8AAIAATbg");
	var mask_8_graphics_20 = new cjs.Graphics().p("Ai+JsIAAzXIF8AAIAATXg");
	var mask_8_graphics_21 = new cjs.Graphics().p("Ai+JpIAAzRIF8AAIAATRg");
	var mask_8_graphics_22 = new cjs.Graphics().p("Ai+JnIAAzNIF8AAIAATNg");
	var mask_8_graphics_23 = new cjs.Graphics().p("Ai+JkIAAzHIF8AAIAATHg");
	var mask_8_graphics_24 = new cjs.Graphics().p("Ai+JiIAAzDIF8AAIAATDg");
	var mask_8_graphics_25 = new cjs.Graphics().p("Ai+JfIAAy9IF8AAIAAS9g");
	var mask_8_graphics_26 = new cjs.Graphics().p("Ai+JdIAAy5IF8AAIAAS5g");
	var mask_8_graphics_27 = new cjs.Graphics().p("Ai+JaIAAyzIF8AAIAASzg");
	var mask_8_graphics_28 = new cjs.Graphics().p("Ai+JYIAAyvIF8AAIAASvg");
	var mask_8_graphics_29 = new cjs.Graphics().p("Ai+JVIAAypIF8AAIAASpg");
	var mask_8_graphics_30 = new cjs.Graphics().p("Ai+JTIAAykIF8AAIAASkg");
	var mask_8_graphics_31 = new cjs.Graphics().p("Ai+JQIAAyfIF8AAIAASfg");
	var mask_8_graphics_32 = new cjs.Graphics().p("Ai+JOIAAyaIF8AAIAASag");
	var mask_8_graphics_33 = new cjs.Graphics().p("Ai+JLIAAyVIF8AAIAASVg");
	var mask_8_graphics_34 = new cjs.Graphics().p("Ai+JJIAAyQIF8AAIAASQg");
	var mask_8_graphics_35 = new cjs.Graphics().p("Ai+JGIAAyLIF8AAIAASLg");
	var mask_8_graphics_36 = new cjs.Graphics().p("Ai+JEIAAyGIF8AAIAASGg");
	var mask_8_graphics_37 = new cjs.Graphics().p("Ai+JBIAAyBIF8AAIAASBg");
	var mask_8_graphics_38 = new cjs.Graphics().p("Ai+I/IAAx9IF8AAIAAR9g");
	var mask_8_graphics_39 = new cjs.Graphics().p("Ai+I8IAAx3IF8AAIAAR3g");
	var mask_8_graphics_40 = new cjs.Graphics().p("Ai+I6IAAxzIF8AAIAARzg");
	var mask_8_graphics_41 = new cjs.Graphics().p("Ai+I3IAAxtIF8AAIAARtg");
	var mask_8_graphics_42 = new cjs.Graphics().p("Ai+I0IAAxnIF8AAIAARng");
	var mask_8_graphics_43 = new cjs.Graphics().p("Ai+IyIAAxjIF8AAIAARjg");
	var mask_8_graphics_44 = new cjs.Graphics().p("Ai+IvIAAxdIF8AAIAARdg");
	var mask_8_graphics_45 = new cjs.Graphics().p("Ai+ItIAAxZIF8AAIAARZg");
	var mask_8_graphics_46 = new cjs.Graphics().p("Ai+IqIAAxTIF8AAIAARTg");
	var mask_8_graphics_47 = new cjs.Graphics().p("Ai+IoIAAxPIF8AAIAARPg");
	var mask_8_graphics_48 = new cjs.Graphics().p("Ai+IlIAAxJIF8AAIAARJg");
	var mask_8_graphics_49 = new cjs.Graphics().p("Ai+IjIAAxFIF8AAIAARFg");
	var mask_8_graphics_50 = new cjs.Graphics().p("Ai+IgIAAw/IF8AAIAAQ/g");
	var mask_8_graphics_51 = new cjs.Graphics().p("Ai+IeIAAw7IF8AAIAAQ7g");
	var mask_8_graphics_52 = new cjs.Graphics().p("Ai+IbIAAw1IF8AAIAAQ1g");
	var mask_8_graphics_53 = new cjs.Graphics().p("Ai+IZIAAwxIF8AAIAAQxg");
	var mask_8_graphics_54 = new cjs.Graphics().p("Ai+IWIAAwrIF8AAIAAQrg");
	var mask_8_graphics_55 = new cjs.Graphics().p("Ai+IUIAAwmIF8AAIAAQmg");
	var mask_8_graphics_56 = new cjs.Graphics().p("Ai+IRIAAwhIF8AAIAAQhg");
	var mask_8_graphics_57 = new cjs.Graphics().p("Ai+IPIAAwcIF8AAIAAQcg");
	var mask_8_graphics_58 = new cjs.Graphics().p("Ai+IMIAAwXIF8AAIAAQXg");
	var mask_8_graphics_59 = new cjs.Graphics().p("Ai+IKIAAwSIF8AAIAAQSg");
	var mask_8_graphics_60 = new cjs.Graphics().p("Ai+IHIAAwNIF8AAIAAQNg");
	var mask_8_graphics_61 = new cjs.Graphics().p("Ai+IFIAAwJIF8AAIAAQJg");
	var mask_8_graphics_62 = new cjs.Graphics().p("Ai+ICIAAwDIF8AAIAAQDg");
	var mask_8_graphics_63 = new cjs.Graphics().p("Ai+IAIAAv/IF8AAIAAP/g");
	var mask_8_graphics_64 = new cjs.Graphics().p("Ai+H9IAAv5IF8AAIAAP5g");
	var mask_8_graphics_65 = new cjs.Graphics().p("Ai+H7IAAv1IF8AAIAAP1g");
	var mask_8_graphics_66 = new cjs.Graphics().p("Ai+H4IAAvvIF8AAIAAPvg");
	var mask_8_graphics_67 = new cjs.Graphics().p("Ai+H1IAAvpIF8AAIAAPpg");
	var mask_8_graphics_68 = new cjs.Graphics().p("Ai+HzIAAvlIF8AAIAAPlg");
	var mask_8_graphics_69 = new cjs.Graphics().p("Ai+HwIAAvfIF8AAIAAPfg");
	var mask_8_graphics_70 = new cjs.Graphics().p("Ai+HuIAAvbIF8AAIAAPbg");
	var mask_8_graphics_71 = new cjs.Graphics().p("Ai+HrIAAvWIF8AAIAAPWg");
	var mask_8_graphics_72 = new cjs.Graphics().p("Ai+HpIAAvRIF8AAIAAPRg");
	var mask_8_graphics_73 = new cjs.Graphics().p("Ai+HmIAAvMIF8AAIAAPMg");
	var mask_8_graphics_74 = new cjs.Graphics().p("Ai+HkIAAvHIF8AAIAAPHg");
	var mask_8_graphics_75 = new cjs.Graphics().p("Ai+HhIAAvCIF8AAIAAPCg");
	var mask_8_graphics_76 = new cjs.Graphics().p("Ai+HfIAAu9IF8AAIAAO9g");
	var mask_8_graphics_77 = new cjs.Graphics().p("Ai+HcIAAu4IF8AAIAAO4g");
	var mask_8_graphics_78 = new cjs.Graphics().p("Ai+HaIAAuzIF8AAIAAOzg");
	var mask_8_graphics_79 = new cjs.Graphics().p("Ai+HXIAAutIF8AAIAAOtg");
	var mask_8_graphics_80 = new cjs.Graphics().p("Ai+HVIAAupIF8AAIAAOpg");
	var mask_8_graphics_81 = new cjs.Graphics().p("Ai+HSIAAujIF8AAIAAOjg");
	var mask_8_graphics_82 = new cjs.Graphics().p("Ai+HQIAAufIF8AAIAAOfg");
	var mask_8_graphics_83 = new cjs.Graphics().p("Ai+HNIAAuZIF8AAIAAOZg");
	var mask_8_graphics_84 = new cjs.Graphics().p("Ai+HLIAAuVIF8AAIAAOVg");
	var mask_8_graphics_85 = new cjs.Graphics().p("Ai+HIIAAuPIF8AAIAAOPg");
	var mask_8_graphics_86 = new cjs.Graphics().p("Ai+HGIAAuLIF8AAIAAOLg");
	var mask_8_graphics_87 = new cjs.Graphics().p("Ai+HDIAAuFIF8AAIAAOFg");
	var mask_8_graphics_88 = new cjs.Graphics().p("Ai+HBIAAuBIF8AAIAAOBg");
	var mask_8_graphics_89 = new cjs.Graphics().p("Ai+G+IAAt7IF8AAIAAN7g");
	var mask_8_graphics_90 = new cjs.Graphics().p("Ai+G7IAAt1IF8AAIAAN1g");
	var mask_8_graphics_91 = new cjs.Graphics().p("Ai+G5IAAtxIF8AAIAANxg");
	var mask_8_graphics_92 = new cjs.Graphics().p("Ai+G2IAAtrIF8AAIAANrg");
	var mask_8_graphics_93 = new cjs.Graphics().p("Ai+G0IAAtnIF8AAIAANng");
	var mask_8_graphics_94 = new cjs.Graphics().p("Ai+GxIAAthIF8AAIAANhg");
	var mask_8_graphics_95 = new cjs.Graphics().p("Ai+GvIAAtdIF8AAIAANdg");
	var mask_8_graphics_96 = new cjs.Graphics().p("Ai+GsIAAtYIF8AAIAANYg");
	var mask_8_graphics_97 = new cjs.Graphics().p("Ai+GqIAAtTIF8AAIAANTg");
	var mask_8_graphics_98 = new cjs.Graphics().p("Ai+GnIAAtOIF8AAIAANOg");
	var mask_8_graphics_99 = new cjs.Graphics().p("Ai+GlIAAtJIF8AAIAANJg");
	var mask_8_graphics_100 = new cjs.Graphics().p("Ai+GiIAAtEIF8AAIAANEg");
	var mask_8_graphics_101 = new cjs.Graphics().p("Ai+GgIAAs/IF8AAIAAM/g");
	var mask_8_graphics_102 = new cjs.Graphics().p("Ai+GdIAAs5IF8AAIAAM5g");
	var mask_8_graphics_103 = new cjs.Graphics().p("Ai+GbIAAs1IF8AAIAAM1g");
	var mask_8_graphics_104 = new cjs.Graphics().p("Ai+GYIAAsvIF8AAIAAMvg");
	var mask_8_graphics_105 = new cjs.Graphics().p("Ai+GWIAAsrIF8AAIAAMrg");
	var mask_8_graphics_106 = new cjs.Graphics().p("Ai+GTIAAslIF8AAIAAMlg");
	var mask_8_graphics_107 = new cjs.Graphics().p("Ai+GRIAAshIF8AAIAAMhg");
	var mask_8_graphics_108 = new cjs.Graphics().p("Ai+GOIAAsbIF8AAIAAMbg");
	var mask_8_graphics_109 = new cjs.Graphics().p("Ai+GMIAAsXIF8AAIAAMXg");
	var mask_8_graphics_110 = new cjs.Graphics().p("Ai+GJIAAsRIF8AAIAAMRg");
	var mask_8_graphics_111 = new cjs.Graphics().p("Ai+GHIAAsNIF8AAIAAMNg");
	var mask_8_graphics_112 = new cjs.Graphics().p("Ai+GEIAAsHIF8AAIAAMHg");
	var mask_8_graphics_113 = new cjs.Graphics().p("Ai+GBIAAsBIF8AAIAAMBg");
	var mask_8_graphics_114 = new cjs.Graphics().p("Ai+F/IAAr9IF8AAIAAL9g");
	var mask_8_graphics_115 = new cjs.Graphics().p("Ai+F8IAAr3IF8AAIAAL3g");
	var mask_8_graphics_116 = new cjs.Graphics().p("Ai+F6IAArzIF8AAIAALzg");
	var mask_8_graphics_117 = new cjs.Graphics().p("Ai+F3IAArtIF8AAIAALtg");
	var mask_8_graphics_118 = new cjs.Graphics().p("Ai+F1IAArpIF8AAIAALpg");
	var mask_8_graphics_119 = new cjs.Graphics().p("Ai+FyIAArjIF8AAIAALjg");
	var mask_8_graphics_120 = new cjs.Graphics().p("Ai+FyIAArjIF8AAIAALjg");
	var mask_8_graphics_121 = new cjs.Graphics().p("Ai+FsIAArXIF8AAIAALXg");
	var mask_8_graphics_122 = new cjs.Graphics().p("Ai+FmIAArLIF8AAIAALLg");
	var mask_8_graphics_123 = new cjs.Graphics().p("Ai+FfIAAq9IF8AAIAAK9g");
	var mask_8_graphics_124 = new cjs.Graphics().p("Ai+FZIAAqxIF8AAIAAKxg");
	var mask_8_graphics_125 = new cjs.Graphics().p("Ai+FSIAAqkIF8AAIAAKkg");
	var mask_8_graphics_126 = new cjs.Graphics().p("Ai+FMIAAqXIF8AAIAAKXg");
	var mask_8_graphics_127 = new cjs.Graphics().p("Ai+FGIAAqLIF8AAIAAKLg");
	var mask_8_graphics_128 = new cjs.Graphics().p("Ai+E/IAAp9IF8AAIAAJ9g");
	var mask_8_graphics_129 = new cjs.Graphics().p("Ai+E5IAApxIF8AAIAAJxg");
	var mask_8_graphics_130 = new cjs.Graphics().p("Ai+EyIAApjIF8AAIAAJjg");
	var mask_8_graphics_131 = new cjs.Graphics().p("Ai+EsIAApXIF8AAIAAJXg");
	var mask_8_graphics_132 = new cjs.Graphics().p("Ai+EmIAApLIF8AAIAAJLg");
	var mask_8_graphics_133 = new cjs.Graphics().p("Ai+EfIAAo9IF8AAIAAI9g");
	var mask_8_graphics_134 = new cjs.Graphics().p("Ai+EZIAAoxIF8AAIAAIxg");
	var mask_8_graphics_135 = new cjs.Graphics().p("Ai+ESIAAojIF8AAIAAIjg");
	var mask_8_graphics_136 = new cjs.Graphics().p("Ai+EMIAAoXIF8AAIAAIXg");
	var mask_8_graphics_137 = new cjs.Graphics().p("Ai+EGIAAoKIF8AAIAAIKg");
	var mask_8_graphics_138 = new cjs.Graphics().p("Ai+D/IAAn9IF8AAIAAH9g");
	var mask_8_graphics_139 = new cjs.Graphics().p("Ai+D4IAAnvIF8AAIAAHvg");
	var mask_8_graphics_140 = new cjs.Graphics().p("Ai+DyIAAnjIF8AAIAAHjg");
	var mask_8_graphics_141 = new cjs.Graphics().p("Ai+DsIAAnXIF8AAIAAHXg");
	var mask_8_graphics_142 = new cjs.Graphics().p("Ai+DlIAAnJIF8AAIAAHJg");
	var mask_8_graphics_143 = new cjs.Graphics().p("Ai+DfIAAm9IF8AAIAAG9g");
	var mask_8_graphics_144 = new cjs.Graphics().p("Ai+DYIAAmwIF8AAIAAGwg");
	var mask_8_graphics_145 = new cjs.Graphics().p("Ai+DYIAAmwIF8AAIAAGwg");
	var mask_8_graphics_146 = new cjs.Graphics().p("Ai+DfIAAm9IF8AAIAAG9g");
	var mask_8_graphics_147 = new cjs.Graphics().p("Ai+DlIAAnJIF8AAIAAHJg");
	var mask_8_graphics_148 = new cjs.Graphics().p("Ai+DsIAAnXIF8AAIAAHXg");
	var mask_8_graphics_149 = new cjs.Graphics().p("Ai+DyIAAnjIF8AAIAAHjg");
	var mask_8_graphics_150 = new cjs.Graphics().p("Ai+D4IAAnvIF8AAIAAHvg");
	var mask_8_graphics_151 = new cjs.Graphics().p("Ai+D/IAAn9IF8AAIAAH9g");
	var mask_8_graphics_152 = new cjs.Graphics().p("Ai+EFIAAoJIF8AAIAAIJg");
	var mask_8_graphics_153 = new cjs.Graphics().p("Ai+EMIAAoXIF8AAIAAIXg");
	var mask_8_graphics_154 = new cjs.Graphics().p("Ai+ESIAAojIF8AAIAAIjg");
	var mask_8_graphics_155 = new cjs.Graphics().p("Ai+EYIAAovIF8AAIAAIvg");
	var mask_8_graphics_156 = new cjs.Graphics().p("Ai+EfIAAo9IF8AAIAAI9g");
	var mask_8_graphics_157 = new cjs.Graphics().p("Ai+EmIAApLIF8AAIAAJLg");
	var mask_8_graphics_158 = new cjs.Graphics().p("Ai+EsIAApXIF8AAIAAJXg");
	var mask_8_graphics_159 = new cjs.Graphics().p("Ai+EyIAApjIF8AAIAAJjg");
	var mask_8_graphics_160 = new cjs.Graphics().p("Ai+E5IAApxIF8AAIAAJxg");
	var mask_8_graphics_161 = new cjs.Graphics().p("Ai+E/IAAp9IF8AAIAAJ9g");
	var mask_8_graphics_162 = new cjs.Graphics().p("Ai+FGIAAqLIF8AAIAAKLg");
	var mask_8_graphics_163 = new cjs.Graphics().p("Ai+FMIAAqXIF8AAIAAKXg");
	var mask_8_graphics_164 = new cjs.Graphics().p("Ai+FSIAAqjIF8AAIAAKjg");
	var mask_8_graphics_165 = new cjs.Graphics().p("Ai+FZIAAqxIF8AAIAAKxg");
	var mask_8_graphics_166 = new cjs.Graphics().p("Ai+FfIAAq9IF8AAIAAK9g");
	var mask_8_graphics_167 = new cjs.Graphics().p("Ai+FmIAArLIF8AAIAALLg");
	var mask_8_graphics_168 = new cjs.Graphics().p("Ai+FsIAArXIF8AAIAALXg");
	var mask_8_graphics_169 = new cjs.Graphics().p("Ai+FyIAArjIF8AAIAALjg");
	var mask_8_graphics_170 = new cjs.Graphics().p("Ai+FyIAArjIF8AAIAALjg");
	var mask_8_graphics_171 = new cjs.Graphics().p("Ai+F+IAAr7IF8AAIAAL7g");
	var mask_8_graphics_172 = new cjs.Graphics().p("Ai+GKIAAsTIF8AAIAAMTg");
	var mask_8_graphics_173 = new cjs.Graphics().p("Ai+GWIAAsrIF8AAIAAMrg");
	var mask_8_graphics_174 = new cjs.Graphics().p("Ai+GiIAAtDIF8AAIAANDg");
	var mask_8_graphics_175 = new cjs.Graphics().p("Ai+GuIAAtbIF8AAIAANbg");
	var mask_8_graphics_176 = new cjs.Graphics().p("Ai+G6IAAtzIF8AAIAANzg");
	var mask_8_graphics_177 = new cjs.Graphics().p("Ai+HGIAAuLIF8AAIAAOLg");
	var mask_8_graphics_178 = new cjs.Graphics().p("Ai+HRIAAuhIF8AAIAAOhg");
	var mask_8_graphics_179 = new cjs.Graphics().p("Ai+HdIAAu6IF8AAIAAO6g");
	var mask_8_graphics_180 = new cjs.Graphics().p("Ai+HpIAAvSIF8AAIAAPSg");
	var mask_8_graphics_181 = new cjs.Graphics().p("Ai+H1IAAvpIF8AAIAAPpg");
	var mask_8_graphics_182 = new cjs.Graphics().p("Ai+IBIAAwBIF8AAIAAQBg");
	var mask_8_graphics_183 = new cjs.Graphics().p("Ai+INIAAwZIF8AAIAAQZg");
	var mask_8_graphics_184 = new cjs.Graphics().p("Ai+IZIAAwxIF8AAIAAQxg");
	var mask_8_graphics_185 = new cjs.Graphics().p("Ai+IlIAAxJIF8AAIAARJg");
	var mask_8_graphics_186 = new cjs.Graphics().p("Ai+IxIAAxhIF8AAIAARhg");
	var mask_8_graphics_187 = new cjs.Graphics().p("Ai+I9IAAx5IF8AAIAAR5g");
	var mask_8_graphics_188 = new cjs.Graphics().p("Ai+JJIAAyRIF8AAIAASRg");
	var mask_8_graphics_189 = new cjs.Graphics().p("Ai+JVIAAypIF8AAIAASpg");
	var mask_8_graphics_190 = new cjs.Graphics().p("Ai+JhIAAzBIF8AAIAATBg");
	var mask_8_graphics_191 = new cjs.Graphics().p("Ai+JtIAAzZIF8AAIAATZg");
	var mask_8_graphics_192 = new cjs.Graphics().p("Ai+J5IAAzxIF8AAIAATxg");
	var mask_8_graphics_193 = new cjs.Graphics().p("Ai+KFIAA0JIF8AAIAAUJg");
	var mask_8_graphics_194 = new cjs.Graphics().p("Ai+KRIAA0gIF8AAIAAUgg");
	var mask_8_graphics_195 = new cjs.Graphics().p("AtKIwIAA0gIF9AAIAAUgg");
	var mask_8_graphics_196 = new cjs.Graphics().p("Ai+KeIAA07IF8AAIAAU7g");
	var mask_8_graphics_197 = new cjs.Graphics().p("Ai+KRIAA0hIF8AAIAAUhg");
	var mask_8_graphics_198 = new cjs.Graphics().p("Ai+KEIAA0HIF8AAIAAUHg");
	var mask_8_graphics_199 = new cjs.Graphics().p("Ai+J3IAAztIF8AAIAATtg");
	var mask_8_graphics_200 = new cjs.Graphics().p("Ai+JqIAAzTIF8AAIAATTg");
	var mask_8_graphics_201 = new cjs.Graphics().p("Ai+JdIAAy5IF8AAIAAS5g");
	var mask_8_graphics_202 = new cjs.Graphics().p("Ai+JQIAAyfIF8AAIAASfg");
	var mask_8_graphics_203 = new cjs.Graphics().p("Ai+JDIAAyFIF8AAIAASFg");
	var mask_8_graphics_204 = new cjs.Graphics().p("Ai+I2IAAxrIF8AAIAARrg");
	var mask_8_graphics_205 = new cjs.Graphics().p("Ai+IpIAAxRIF8AAIAARRg");
	var mask_8_graphics_206 = new cjs.Graphics().p("Ai+IcIAAw3IF8AAIAAQ3g");
	var mask_8_graphics_207 = new cjs.Graphics().p("Ai+IPIAAwdIF8AAIAAQdg");
	var mask_8_graphics_208 = new cjs.Graphics().p("Ai+ICIAAwDIF8AAIAAQDg");
	var mask_8_graphics_209 = new cjs.Graphics().p("Ai+H1IAAvpIF8AAIAAPpg");
	var mask_8_graphics_210 = new cjs.Graphics().p("Ai+HoIAAvPIF8AAIAAPPg");
	var mask_8_graphics_211 = new cjs.Graphics().p("Ai+HbIAAu1IF8AAIAAO1g");
	var mask_8_graphics_212 = new cjs.Graphics().p("Ai+HOIAAubIF8AAIAAObg");
	var mask_8_graphics_213 = new cjs.Graphics().p("Ai+HBIAAuBIF8AAIAAOBg");
	var mask_8_graphics_214 = new cjs.Graphics().p("Ai+G0IAAtnIF8AAIAANng");
	var mask_8_graphics_215 = new cjs.Graphics().p("Ai+GnIAAtNIF8AAIAANNg");
	var mask_8_graphics_216 = new cjs.Graphics().p("Ai+GaIAAszIF8AAIAAMzg");
	var mask_8_graphics_217 = new cjs.Graphics().p("Ai+GMIAAsYIF8AAIAAMYg");
	var mask_8_graphics_218 = new cjs.Graphics().p("Ai+F/IAAr+IF8AAIAAL+g");
	var mask_8_graphics_219 = new cjs.Graphics().p("Ai+FyIAArjIF8AAIAALjg");
	var mask_8_graphics_220 = new cjs.Graphics().p("Ai+FyIAArjIF8AAIAALjg");
	var mask_8_graphics_221 = new cjs.Graphics().p("Ai+FsIAArXIF8AAIAALXg");
	var mask_8_graphics_222 = new cjs.Graphics().p("Ai+FmIAArLIF8AAIAALLg");
	var mask_8_graphics_223 = new cjs.Graphics().p("Ai+FfIAAq9IF8AAIAAK9g");
	var mask_8_graphics_224 = new cjs.Graphics().p("Ai+FZIAAqxIF8AAIAAKxg");
	var mask_8_graphics_225 = new cjs.Graphics().p("Ai+FSIAAqkIF8AAIAAKkg");
	var mask_8_graphics_226 = new cjs.Graphics().p("Ai+FMIAAqXIF8AAIAAKXg");
	var mask_8_graphics_227 = new cjs.Graphics().p("Ai+FGIAAqLIF8AAIAAKLg");
	var mask_8_graphics_228 = new cjs.Graphics().p("Ai+E/IAAp9IF8AAIAAJ9g");
	var mask_8_graphics_229 = new cjs.Graphics().p("Ai+E5IAApxIF8AAIAAJxg");
	var mask_8_graphics_230 = new cjs.Graphics().p("Ai+EyIAApjIF8AAIAAJjg");
	var mask_8_graphics_231 = new cjs.Graphics().p("Ai+EsIAApXIF8AAIAAJXg");
	var mask_8_graphics_232 = new cjs.Graphics().p("Ai+EmIAApLIF8AAIAAJLg");
	var mask_8_graphics_233 = new cjs.Graphics().p("Ai+EfIAAo9IF8AAIAAI9g");
	var mask_8_graphics_234 = new cjs.Graphics().p("Ai+EZIAAoxIF8AAIAAIxg");
	var mask_8_graphics_235 = new cjs.Graphics().p("Ai+ESIAAojIF8AAIAAIjg");
	var mask_8_graphics_236 = new cjs.Graphics().p("Ai+EMIAAoXIF8AAIAAIXg");
	var mask_8_graphics_237 = new cjs.Graphics().p("Ai+EGIAAoKIF8AAIAAIKg");
	var mask_8_graphics_238 = new cjs.Graphics().p("Ai+D/IAAn9IF8AAIAAH9g");
	var mask_8_graphics_239 = new cjs.Graphics().p("Ai+D4IAAnvIF8AAIAAHvg");
	var mask_8_graphics_240 = new cjs.Graphics().p("Ai+DyIAAnjIF8AAIAAHjg");
	var mask_8_graphics_241 = new cjs.Graphics().p("Ai+DsIAAnXIF8AAIAAHXg");
	var mask_8_graphics_242 = new cjs.Graphics().p("Ai+DlIAAnJIF8AAIAAHJg");
	var mask_8_graphics_243 = new cjs.Graphics().p("Ai+DfIAAm9IF8AAIAAG9g");
	var mask_8_graphics_244 = new cjs.Graphics().p("Ai+DYIAAmwIF8AAIAAGwg");
	var mask_8_graphics_245 = new cjs.Graphics().p("Ai+DYIAAmwIF8AAIAAGwg");
	var mask_8_graphics_246 = new cjs.Graphics().p("Ai+DfIAAm9IF8AAIAAG9g");
	var mask_8_graphics_247 = new cjs.Graphics().p("Ai+DlIAAnJIF8AAIAAHJg");
	var mask_8_graphics_248 = new cjs.Graphics().p("Ai+DsIAAnXIF8AAIAAHXg");
	var mask_8_graphics_249 = new cjs.Graphics().p("Ai+DyIAAnjIF8AAIAAHjg");
	var mask_8_graphics_250 = new cjs.Graphics().p("Ai+D4IAAnvIF8AAIAAHvg");
	var mask_8_graphics_251 = new cjs.Graphics().p("Ai+D/IAAn9IF8AAIAAH9g");
	var mask_8_graphics_252 = new cjs.Graphics().p("Ai+EFIAAoJIF8AAIAAIJg");
	var mask_8_graphics_253 = new cjs.Graphics().p("Ai+EMIAAoXIF8AAIAAIXg");
	var mask_8_graphics_254 = new cjs.Graphics().p("Ai+ESIAAojIF8AAIAAIjg");
	var mask_8_graphics_255 = new cjs.Graphics().p("Ai+EYIAAovIF8AAIAAIvg");
	var mask_8_graphics_256 = new cjs.Graphics().p("Ai+EfIAAo9IF8AAIAAI9g");
	var mask_8_graphics_257 = new cjs.Graphics().p("Ai+EmIAApLIF8AAIAAJLg");
	var mask_8_graphics_258 = new cjs.Graphics().p("Ai+EsIAApXIF8AAIAAJXg");
	var mask_8_graphics_259 = new cjs.Graphics().p("Ai+EyIAApjIF8AAIAAJjg");
	var mask_8_graphics_260 = new cjs.Graphics().p("Ai+E5IAApxIF8AAIAAJxg");
	var mask_8_graphics_261 = new cjs.Graphics().p("Ai+E/IAAp9IF8AAIAAJ9g");
	var mask_8_graphics_262 = new cjs.Graphics().p("Ai+FGIAAqLIF8AAIAAKLg");
	var mask_8_graphics_263 = new cjs.Graphics().p("Ai+FMIAAqXIF8AAIAAKXg");
	var mask_8_graphics_264 = new cjs.Graphics().p("Ai+FSIAAqjIF8AAIAAKjg");
	var mask_8_graphics_265 = new cjs.Graphics().p("Ai+FZIAAqxIF8AAIAAKxg");
	var mask_8_graphics_266 = new cjs.Graphics().p("Ai+FfIAAq9IF8AAIAAK9g");
	var mask_8_graphics_267 = new cjs.Graphics().p("Ai+FmIAArLIF8AAIAALLg");
	var mask_8_graphics_268 = new cjs.Graphics().p("Ai+FsIAArXIF8AAIAALXg");
	var mask_8_graphics_269 = new cjs.Graphics().p("Ai+FyIAArjIF8AAIAALjg");
	var mask_8_graphics_270 = new cjs.Graphics().p("Ai+FyIAArjIF8AAIAALjg");
	var mask_8_graphics_271 = new cjs.Graphics().p("Ai+F+IAAr7IF8AAIAAL7g");
	var mask_8_graphics_272 = new cjs.Graphics().p("Ai+GKIAAsTIF8AAIAAMTg");
	var mask_8_graphics_273 = new cjs.Graphics().p("Ai+GWIAAsrIF8AAIAAMrg");
	var mask_8_graphics_274 = new cjs.Graphics().p("Ai+GiIAAtDIF8AAIAANDg");
	var mask_8_graphics_275 = new cjs.Graphics().p("Ai+GuIAAtbIF8AAIAANbg");
	var mask_8_graphics_276 = new cjs.Graphics().p("Ai+G6IAAtzIF8AAIAANzg");
	var mask_8_graphics_277 = new cjs.Graphics().p("Ai+HGIAAuLIF8AAIAAOLg");
	var mask_8_graphics_278 = new cjs.Graphics().p("Ai+HRIAAuhIF8AAIAAOhg");
	var mask_8_graphics_279 = new cjs.Graphics().p("Ai+HdIAAu6IF8AAIAAO6g");
	var mask_8_graphics_280 = new cjs.Graphics().p("Ai+HpIAAvSIF8AAIAAPSg");
	var mask_8_graphics_281 = new cjs.Graphics().p("Ai+H1IAAvpIF8AAIAAPpg");
	var mask_8_graphics_282 = new cjs.Graphics().p("Ai+IBIAAwBIF8AAIAAQBg");
	var mask_8_graphics_283 = new cjs.Graphics().p("Ai+INIAAwZIF8AAIAAQZg");
	var mask_8_graphics_284 = new cjs.Graphics().p("Ai+IZIAAwxIF8AAIAAQxg");
	var mask_8_graphics_285 = new cjs.Graphics().p("Ai+IlIAAxJIF8AAIAARJg");
	var mask_8_graphics_286 = new cjs.Graphics().p("Ai+IxIAAxhIF8AAIAARhg");
	var mask_8_graphics_287 = new cjs.Graphics().p("Ai+I9IAAx5IF8AAIAAR5g");
	var mask_8_graphics_288 = new cjs.Graphics().p("Ai+JJIAAyRIF8AAIAASRg");
	var mask_8_graphics_289 = new cjs.Graphics().p("Ai+JVIAAypIF8AAIAASpg");
	var mask_8_graphics_290 = new cjs.Graphics().p("Ai+JhIAAzBIF8AAIAATBg");
	var mask_8_graphics_291 = new cjs.Graphics().p("Ai+JtIAAzZIF8AAIAATZg");
	var mask_8_graphics_292 = new cjs.Graphics().p("Ai+J5IAAzxIF8AAIAATxg");
	var mask_8_graphics_293 = new cjs.Graphics().p("Ai+KFIAA0JIF8AAIAAUJg");
	var mask_8_graphics_294 = new cjs.Graphics().p("Ai+KRIAA0gIF8AAIAAUgg");
	var mask_8_graphics_295 = new cjs.Graphics().p("AtKIwIAA0gIF9AAIAAUgg");
	var mask_8_graphics_296 = new cjs.Graphics().p("Ai+KeIAA07IF8AAIAAU7g");
	var mask_8_graphics_297 = new cjs.Graphics().p("AtKIwIAA0gIF9AAIAAUgg");
	var mask_8_graphics_298 = new cjs.Graphics().p("Ai+KeIAA07IF8AAIAAU7g");
	var mask_8_graphics_299 = new cjs.Graphics().p("Ai+KRIAA0hIF8AAIAAUhg");
	var mask_8_graphics_300 = new cjs.Graphics().p("Ai+KEIAA0HIF8AAIAAUHg");
	var mask_8_graphics_301 = new cjs.Graphics().p("Ai+J3IAAztIF8AAIAATtg");
	var mask_8_graphics_302 = new cjs.Graphics().p("Ai+JqIAAzTIF8AAIAATTg");
	var mask_8_graphics_303 = new cjs.Graphics().p("Ai+JdIAAy5IF8AAIAAS5g");
	var mask_8_graphics_304 = new cjs.Graphics().p("Ai+JQIAAyfIF8AAIAASfg");
	var mask_8_graphics_305 = new cjs.Graphics().p("Ai+JDIAAyFIF8AAIAASFg");
	var mask_8_graphics_306 = new cjs.Graphics().p("Ai+I2IAAxrIF8AAIAARrg");
	var mask_8_graphics_307 = new cjs.Graphics().p("Ai+IpIAAxRIF8AAIAARRg");
	var mask_8_graphics_308 = new cjs.Graphics().p("Ai+IcIAAw3IF8AAIAAQ3g");
	var mask_8_graphics_309 = new cjs.Graphics().p("Ai+IPIAAwdIF8AAIAAQdg");
	var mask_8_graphics_310 = new cjs.Graphics().p("Ai+ICIAAwDIF8AAIAAQDg");
	var mask_8_graphics_311 = new cjs.Graphics().p("Ai+H1IAAvpIF8AAIAAPpg");
	var mask_8_graphics_312 = new cjs.Graphics().p("Ai+HoIAAvPIF8AAIAAPPg");
	var mask_8_graphics_313 = new cjs.Graphics().p("Ai+HbIAAu1IF8AAIAAO1g");
	var mask_8_graphics_314 = new cjs.Graphics().p("Ai+HOIAAubIF8AAIAAObg");
	var mask_8_graphics_315 = new cjs.Graphics().p("Ai+HBIAAuBIF8AAIAAOBg");
	var mask_8_graphics_316 = new cjs.Graphics().p("Ai+G0IAAtnIF8AAIAANng");
	var mask_8_graphics_317 = new cjs.Graphics().p("Ai+GnIAAtNIF8AAIAANNg");
	var mask_8_graphics_318 = new cjs.Graphics().p("Ai+GaIAAszIF8AAIAAMzg");
	var mask_8_graphics_319 = new cjs.Graphics().p("Ai+GMIAAsYIF8AAIAAMYg");
	var mask_8_graphics_320 = new cjs.Graphics().p("Ai+F/IAAr+IF8AAIAAL+g");
	var mask_8_graphics_321 = new cjs.Graphics().p("Ai+FyIAArjIF8AAIAALjg");
	var mask_8_graphics_322 = new cjs.Graphics().p("Ai+FyIAArjIF8AAIAALjg");
	var mask_8_graphics_323 = new cjs.Graphics().p("Ai+FsIAArXIF8AAIAALXg");
	var mask_8_graphics_324 = new cjs.Graphics().p("Ai+FmIAArLIF8AAIAALLg");
	var mask_8_graphics_325 = new cjs.Graphics().p("Ai+FfIAAq9IF8AAIAAK9g");
	var mask_8_graphics_326 = new cjs.Graphics().p("Ai+FZIAAqxIF8AAIAAKxg");
	var mask_8_graphics_327 = new cjs.Graphics().p("Ai+FSIAAqkIF8AAIAAKkg");
	var mask_8_graphics_328 = new cjs.Graphics().p("Ai+FMIAAqXIF8AAIAAKXg");
	var mask_8_graphics_329 = new cjs.Graphics().p("Ai+FGIAAqLIF8AAIAAKLg");
	var mask_8_graphics_330 = new cjs.Graphics().p("Ai+E/IAAp9IF8AAIAAJ9g");
	var mask_8_graphics_331 = new cjs.Graphics().p("Ai+E5IAApxIF8AAIAAJxg");
	var mask_8_graphics_332 = new cjs.Graphics().p("Ai+EyIAApjIF8AAIAAJjg");
	var mask_8_graphics_333 = new cjs.Graphics().p("Ai+EsIAApXIF8AAIAAJXg");
	var mask_8_graphics_334 = new cjs.Graphics().p("Ai+EmIAApLIF8AAIAAJLg");
	var mask_8_graphics_335 = new cjs.Graphics().p("Ai+EfIAAo9IF8AAIAAI9g");
	var mask_8_graphics_336 = new cjs.Graphics().p("Ai+EZIAAoxIF8AAIAAIxg");
	var mask_8_graphics_337 = new cjs.Graphics().p("Ai+ESIAAojIF8AAIAAIjg");
	var mask_8_graphics_338 = new cjs.Graphics().p("Ai+EMIAAoXIF8AAIAAIXg");
	var mask_8_graphics_339 = new cjs.Graphics().p("Ai+EGIAAoKIF8AAIAAIKg");
	var mask_8_graphics_340 = new cjs.Graphics().p("Ai+D/IAAn9IF8AAIAAH9g");
	var mask_8_graphics_341 = new cjs.Graphics().p("Ai+D4IAAnvIF8AAIAAHvg");
	var mask_8_graphics_342 = new cjs.Graphics().p("Ai+DyIAAnjIF8AAIAAHjg");
	var mask_8_graphics_343 = new cjs.Graphics().p("Ai+DsIAAnXIF8AAIAAHXg");
	var mask_8_graphics_344 = new cjs.Graphics().p("Ai+DlIAAnJIF8AAIAAHJg");
	var mask_8_graphics_345 = new cjs.Graphics().p("Ai+DfIAAm9IF8AAIAAG9g");
	var mask_8_graphics_346 = new cjs.Graphics().p("Ai+DYIAAmwIF8AAIAAGwg");
	var mask_8_graphics_347 = new cjs.Graphics().p("Ai+DYIAAmwIF8AAIAAGwg");
	var mask_8_graphics_348 = new cjs.Graphics().p("Ai+DfIAAm9IF8AAIAAG9g");
	var mask_8_graphics_349 = new cjs.Graphics().p("Ai+DlIAAnJIF8AAIAAHJg");
	var mask_8_graphics_350 = new cjs.Graphics().p("Ai+DsIAAnXIF8AAIAAHXg");
	var mask_8_graphics_351 = new cjs.Graphics().p("Ai+DyIAAnjIF8AAIAAHjg");
	var mask_8_graphics_352 = new cjs.Graphics().p("Ai+D4IAAnvIF8AAIAAHvg");
	var mask_8_graphics_353 = new cjs.Graphics().p("Ai+D/IAAn9IF8AAIAAH9g");
	var mask_8_graphics_354 = new cjs.Graphics().p("Ai+EFIAAoJIF8AAIAAIJg");
	var mask_8_graphics_355 = new cjs.Graphics().p("Ai+EMIAAoXIF8AAIAAIXg");
	var mask_8_graphics_356 = new cjs.Graphics().p("Ai+ESIAAojIF8AAIAAIjg");
	var mask_8_graphics_357 = new cjs.Graphics().p("Ai+EYIAAovIF8AAIAAIvg");
	var mask_8_graphics_358 = new cjs.Graphics().p("Ai+EfIAAo9IF8AAIAAI9g");
	var mask_8_graphics_359 = new cjs.Graphics().p("Ai+EmIAApLIF8AAIAAJLg");
	var mask_8_graphics_360 = new cjs.Graphics().p("Ai+EsIAApXIF8AAIAAJXg");
	var mask_8_graphics_361 = new cjs.Graphics().p("Ai+EyIAApjIF8AAIAAJjg");
	var mask_8_graphics_362 = new cjs.Graphics().p("Ai+E5IAApxIF8AAIAAJxg");
	var mask_8_graphics_363 = new cjs.Graphics().p("Ai+E/IAAp9IF8AAIAAJ9g");
	var mask_8_graphics_364 = new cjs.Graphics().p("Ai+FGIAAqLIF8AAIAAKLg");
	var mask_8_graphics_365 = new cjs.Graphics().p("Ai+FMIAAqXIF8AAIAAKXg");
	var mask_8_graphics_366 = new cjs.Graphics().p("Ai+FSIAAqjIF8AAIAAKjg");
	var mask_8_graphics_367 = new cjs.Graphics().p("Ai+FZIAAqxIF8AAIAAKxg");
	var mask_8_graphics_368 = new cjs.Graphics().p("Ai+FfIAAq9IF8AAIAAK9g");
	var mask_8_graphics_369 = new cjs.Graphics().p("Ai+FmIAArLIF8AAIAALLg");
	var mask_8_graphics_370 = new cjs.Graphics().p("Ai+FsIAArXIF8AAIAALXg");
	var mask_8_graphics_371 = new cjs.Graphics().p("Ai+FyIAArjIF8AAIAALjg");
	var mask_8_graphics_372 = new cjs.Graphics().p("Ai+FyIAArjIF8AAIAALjg");
	var mask_8_graphics_373 = new cjs.Graphics().p("Ai+F+IAAr7IF8AAIAAL7g");
	var mask_8_graphics_374 = new cjs.Graphics().p("Ai+GKIAAsTIF8AAIAAMTg");
	var mask_8_graphics_375 = new cjs.Graphics().p("Ai+GWIAAsrIF8AAIAAMrg");
	var mask_8_graphics_376 = new cjs.Graphics().p("Ai+GiIAAtDIF8AAIAANDg");
	var mask_8_graphics_377 = new cjs.Graphics().p("Ai+GuIAAtbIF8AAIAANbg");
	var mask_8_graphics_378 = new cjs.Graphics().p("Ai+G6IAAtzIF8AAIAANzg");
	var mask_8_graphics_379 = new cjs.Graphics().p("Ai+HGIAAuLIF8AAIAAOLg");
	var mask_8_graphics_380 = new cjs.Graphics().p("Ai+HRIAAuhIF8AAIAAOhg");
	var mask_8_graphics_381 = new cjs.Graphics().p("Ai+HdIAAu6IF8AAIAAO6g");
	var mask_8_graphics_382 = new cjs.Graphics().p("Ai+HpIAAvSIF8AAIAAPSg");
	var mask_8_graphics_383 = new cjs.Graphics().p("Ai+H1IAAvpIF8AAIAAPpg");
	var mask_8_graphics_384 = new cjs.Graphics().p("Ai+IBIAAwBIF8AAIAAQBg");
	var mask_8_graphics_385 = new cjs.Graphics().p("Ai+INIAAwZIF8AAIAAQZg");
	var mask_8_graphics_386 = new cjs.Graphics().p("Ai+IZIAAwxIF8AAIAAQxg");
	var mask_8_graphics_387 = new cjs.Graphics().p("Ai+IlIAAxJIF8AAIAARJg");
	var mask_8_graphics_388 = new cjs.Graphics().p("Ai+IxIAAxhIF8AAIAARhg");
	var mask_8_graphics_389 = new cjs.Graphics().p("Ai+I9IAAx5IF8AAIAAR5g");
	var mask_8_graphics_390 = new cjs.Graphics().p("Ai+JJIAAyRIF8AAIAASRg");
	var mask_8_graphics_391 = new cjs.Graphics().p("Ai+JVIAAypIF8AAIAASpg");
	var mask_8_graphics_392 = new cjs.Graphics().p("Ai+JhIAAzBIF8AAIAATBg");
	var mask_8_graphics_393 = new cjs.Graphics().p("Ai+JtIAAzZIF8AAIAATZg");
	var mask_8_graphics_394 = new cjs.Graphics().p("Ai+J5IAAzxIF8AAIAATxg");
	var mask_8_graphics_395 = new cjs.Graphics().p("Ai+KFIAA0JIF8AAIAAUJg");
	var mask_8_graphics_396 = new cjs.Graphics().p("Ai+KRIAA0gIF8AAIAAUgg");
	var mask_8_graphics_397 = new cjs.Graphics().p("AtKIwIAA0gIF9AAIAAUgg");
	var mask_8_graphics_398 = new cjs.Graphics().p("Ai+KeIAA07IF8AAIAAU7g");
	var mask_8_graphics_399 = new cjs.Graphics().p("Ai+KRIAA0hIF8AAIAAUhg");
	var mask_8_graphics_400 = new cjs.Graphics().p("Ai+KEIAA0HIF8AAIAAUHg");
	var mask_8_graphics_401 = new cjs.Graphics().p("Ai+J3IAAztIF8AAIAATtg");
	var mask_8_graphics_402 = new cjs.Graphics().p("Ai+JqIAAzTIF8AAIAATTg");
	var mask_8_graphics_403 = new cjs.Graphics().p("Ai+JdIAAy5IF8AAIAAS5g");
	var mask_8_graphics_404 = new cjs.Graphics().p("Ai+JQIAAyfIF8AAIAASfg");
	var mask_8_graphics_405 = new cjs.Graphics().p("Ai+JDIAAyFIF8AAIAASFg");
	var mask_8_graphics_406 = new cjs.Graphics().p("Ai+I2IAAxrIF8AAIAARrg");
	var mask_8_graphics_407 = new cjs.Graphics().p("Ai+IpIAAxRIF8AAIAARRg");
	var mask_8_graphics_408 = new cjs.Graphics().p("Ai+IcIAAw3IF8AAIAAQ3g");
	var mask_8_graphics_409 = new cjs.Graphics().p("Ai+IPIAAwdIF8AAIAAQdg");
	var mask_8_graphics_410 = new cjs.Graphics().p("Ai+ICIAAwDIF8AAIAAQDg");
	var mask_8_graphics_411 = new cjs.Graphics().p("Ai+H1IAAvpIF8AAIAAPpg");
	var mask_8_graphics_412 = new cjs.Graphics().p("Ai+HoIAAvPIF8AAIAAPPg");
	var mask_8_graphics_413 = new cjs.Graphics().p("Ai+HbIAAu1IF8AAIAAO1g");
	var mask_8_graphics_414 = new cjs.Graphics().p("Ai+HOIAAubIF8AAIAAObg");
	var mask_8_graphics_415 = new cjs.Graphics().p("Ai+HBIAAuBIF8AAIAAOBg");
	var mask_8_graphics_416 = new cjs.Graphics().p("Ai+G0IAAtnIF8AAIAANng");
	var mask_8_graphics_417 = new cjs.Graphics().p("Ai+GnIAAtNIF8AAIAANNg");
	var mask_8_graphics_418 = new cjs.Graphics().p("Ai+GaIAAszIF8AAIAAMzg");
	var mask_8_graphics_419 = new cjs.Graphics().p("Ai+GMIAAsYIF8AAIAAMYg");
	var mask_8_graphics_420 = new cjs.Graphics().p("Ai+F/IAAr+IF8AAIAAL+g");
	var mask_8_graphics_421 = new cjs.Graphics().p("Ai+FyIAArjIF8AAIAALjg");
	var mask_8_graphics_422 = new cjs.Graphics().p("Ai+FyIAArjIF8AAIAALjg");
	var mask_8_graphics_423 = new cjs.Graphics().p("Ai+FsIAArXIF8AAIAALXg");
	var mask_8_graphics_424 = new cjs.Graphics().p("Ai+FmIAArLIF8AAIAALLg");
	var mask_8_graphics_425 = new cjs.Graphics().p("Ai+FfIAAq9IF8AAIAAK9g");
	var mask_8_graphics_426 = new cjs.Graphics().p("Ai+FZIAAqxIF8AAIAAKxg");
	var mask_8_graphics_427 = new cjs.Graphics().p("Ai+FSIAAqkIF8AAIAAKkg");
	var mask_8_graphics_428 = new cjs.Graphics().p("Ai+FMIAAqXIF8AAIAAKXg");
	var mask_8_graphics_429 = new cjs.Graphics().p("Ai+FGIAAqLIF8AAIAAKLg");
	var mask_8_graphics_430 = new cjs.Graphics().p("Ai+E/IAAp9IF8AAIAAJ9g");
	var mask_8_graphics_431 = new cjs.Graphics().p("Ai+E5IAApxIF8AAIAAJxg");
	var mask_8_graphics_432 = new cjs.Graphics().p("Ai+EyIAApjIF8AAIAAJjg");
	var mask_8_graphics_433 = new cjs.Graphics().p("Ai+EsIAApXIF8AAIAAJXg");
	var mask_8_graphics_434 = new cjs.Graphics().p("Ai+EmIAApLIF8AAIAAJLg");
	var mask_8_graphics_435 = new cjs.Graphics().p("Ai+EfIAAo9IF8AAIAAI9g");
	var mask_8_graphics_436 = new cjs.Graphics().p("Ai+EZIAAoxIF8AAIAAIxg");
	var mask_8_graphics_437 = new cjs.Graphics().p("Ai+ESIAAojIF8AAIAAIjg");
	var mask_8_graphics_438 = new cjs.Graphics().p("Ai+EMIAAoXIF8AAIAAIXg");
	var mask_8_graphics_439 = new cjs.Graphics().p("Ai+EGIAAoKIF8AAIAAIKg");
	var mask_8_graphics_440 = new cjs.Graphics().p("Ai+D/IAAn9IF8AAIAAH9g");
	var mask_8_graphics_441 = new cjs.Graphics().p("Ai+D4IAAnvIF8AAIAAHvg");
	var mask_8_graphics_442 = new cjs.Graphics().p("Ai+DyIAAnjIF8AAIAAHjg");
	var mask_8_graphics_443 = new cjs.Graphics().p("Ai+DsIAAnXIF8AAIAAHXg");
	var mask_8_graphics_444 = new cjs.Graphics().p("Ai+DlIAAnJIF8AAIAAHJg");
	var mask_8_graphics_445 = new cjs.Graphics().p("Ai+DfIAAm9IF8AAIAAG9g");
	var mask_8_graphics_446 = new cjs.Graphics().p("Ai+DYIAAmwIF8AAIAAGwg");
	var mask_8_graphics_447 = new cjs.Graphics().p("Ai+DYIAAmwIF8AAIAAGwg");
	var mask_8_graphics_448 = new cjs.Graphics().p("Ai+DfIAAm9IF8AAIAAG9g");
	var mask_8_graphics_449 = new cjs.Graphics().p("Ai+DlIAAnJIF8AAIAAHJg");
	var mask_8_graphics_450 = new cjs.Graphics().p("Ai+DsIAAnXIF8AAIAAHXg");
	var mask_8_graphics_451 = new cjs.Graphics().p("Ai+DyIAAnjIF8AAIAAHjg");
	var mask_8_graphics_452 = new cjs.Graphics().p("Ai+D4IAAnvIF8AAIAAHvg");
	var mask_8_graphics_453 = new cjs.Graphics().p("Ai+D/IAAn9IF8AAIAAH9g");
	var mask_8_graphics_454 = new cjs.Graphics().p("Ai+EFIAAoJIF8AAIAAIJg");
	var mask_8_graphics_455 = new cjs.Graphics().p("Ai+EMIAAoXIF8AAIAAIXg");
	var mask_8_graphics_456 = new cjs.Graphics().p("Ai+ESIAAojIF8AAIAAIjg");
	var mask_8_graphics_457 = new cjs.Graphics().p("Ai+EYIAAovIF8AAIAAIvg");
	var mask_8_graphics_458 = new cjs.Graphics().p("Ai+EfIAAo9IF8AAIAAI9g");
	var mask_8_graphics_459 = new cjs.Graphics().p("Ai+EmIAApLIF8AAIAAJLg");
	var mask_8_graphics_460 = new cjs.Graphics().p("Ai+EsIAApXIF8AAIAAJXg");
	var mask_8_graphics_461 = new cjs.Graphics().p("Ai+EyIAApjIF8AAIAAJjg");
	var mask_8_graphics_462 = new cjs.Graphics().p("Ai+E5IAApxIF8AAIAAJxg");
	var mask_8_graphics_463 = new cjs.Graphics().p("Ai+E/IAAp9IF8AAIAAJ9g");
	var mask_8_graphics_464 = new cjs.Graphics().p("Ai+FGIAAqLIF8AAIAAKLg");
	var mask_8_graphics_465 = new cjs.Graphics().p("Ai+FMIAAqXIF8AAIAAKXg");
	var mask_8_graphics_466 = new cjs.Graphics().p("Ai+FSIAAqjIF8AAIAAKjg");
	var mask_8_graphics_467 = new cjs.Graphics().p("Ai+FZIAAqxIF8AAIAAKxg");
	var mask_8_graphics_468 = new cjs.Graphics().p("Ai+FfIAAq9IF8AAIAAK9g");
	var mask_8_graphics_469 = new cjs.Graphics().p("Ai+FmIAArLIF8AAIAALLg");
	var mask_8_graphics_470 = new cjs.Graphics().p("Ai+FsIAArXIF8AAIAALXg");
	var mask_8_graphics_471 = new cjs.Graphics().p("Ai+FyIAArjIF8AAIAALjg");
	var mask_8_graphics_472 = new cjs.Graphics().p("Ai+FyIAArjIF8AAIAALjg");
	var mask_8_graphics_473 = new cjs.Graphics().p("Ai+F+IAAr7IF8AAIAAL7g");
	var mask_8_graphics_474 = new cjs.Graphics().p("Ai+GKIAAsTIF8AAIAAMTg");
	var mask_8_graphics_475 = new cjs.Graphics().p("Ai+GWIAAsrIF8AAIAAMrg");
	var mask_8_graphics_476 = new cjs.Graphics().p("Ai+GiIAAtDIF8AAIAANDg");
	var mask_8_graphics_477 = new cjs.Graphics().p("Ai+GuIAAtbIF8AAIAANbg");
	var mask_8_graphics_478 = new cjs.Graphics().p("Ai+G6IAAtzIF8AAIAANzg");
	var mask_8_graphics_479 = new cjs.Graphics().p("Ai+HGIAAuLIF8AAIAAOLg");
	var mask_8_graphics_480 = new cjs.Graphics().p("Ai+HRIAAuhIF8AAIAAOhg");
	var mask_8_graphics_481 = new cjs.Graphics().p("Ai+HdIAAu6IF8AAIAAO6g");
	var mask_8_graphics_482 = new cjs.Graphics().p("Ai+HpIAAvSIF8AAIAAPSg");
	var mask_8_graphics_483 = new cjs.Graphics().p("Ai+H1IAAvpIF8AAIAAPpg");
	var mask_8_graphics_484 = new cjs.Graphics().p("Ai+IBIAAwBIF8AAIAAQBg");
	var mask_8_graphics_485 = new cjs.Graphics().p("Ai+INIAAwZIF8AAIAAQZg");
	var mask_8_graphics_486 = new cjs.Graphics().p("Ai+IZIAAwxIF8AAIAAQxg");
	var mask_8_graphics_487 = new cjs.Graphics().p("Ai+IlIAAxJIF8AAIAARJg");
	var mask_8_graphics_488 = new cjs.Graphics().p("Ai+IxIAAxhIF8AAIAARhg");
	var mask_8_graphics_489 = new cjs.Graphics().p("Ai+I9IAAx5IF8AAIAAR5g");
	var mask_8_graphics_490 = new cjs.Graphics().p("Ai+JJIAAyRIF8AAIAASRg");
	var mask_8_graphics_491 = new cjs.Graphics().p("Ai+JVIAAypIF8AAIAASpg");
	var mask_8_graphics_492 = new cjs.Graphics().p("Ai+JhIAAzBIF8AAIAATBg");
	var mask_8_graphics_493 = new cjs.Graphics().p("Ai+JtIAAzZIF8AAIAATZg");
	var mask_8_graphics_494 = new cjs.Graphics().p("Ai+J5IAAzxIF8AAIAATxg");
	var mask_8_graphics_495 = new cjs.Graphics().p("Ai+KFIAA0JIF8AAIAAUJg");
	var mask_8_graphics_496 = new cjs.Graphics().p("Ai+KRIAA0gIF8AAIAAUgg");
	var mask_8_graphics_497 = new cjs.Graphics().p("AtKIwIAA0gIF9AAIAAUgg");
	var mask_8_graphics_498 = new cjs.Graphics().p("Ai+KeIAA07IF8AAIAAU7g");
	var mask_8_graphics_499 = new cjs.Graphics().p("Ai+KPIAA0dIF8AAIAAUdg");
	var mask_8_graphics_500 = new cjs.Graphics().p("Ai+KAIAAz/IF8AAIAAT/g");
	var mask_8_graphics_501 = new cjs.Graphics().p("Ai+JxIAAzhIF8AAIAAThg");
	var mask_8_graphics_502 = new cjs.Graphics().p("Ai+JiIAAzDIF8AAIAATDg");
	var mask_8_graphics_503 = new cjs.Graphics().p("Ai+JTIAAylIF8AAIAASlg");
	var mask_8_graphics_504 = new cjs.Graphics().p("Ai+JEIAAyHIF8AAIAASHg");
	var mask_8_graphics_505 = new cjs.Graphics().p("Ai+I1IAAxpIF8AAIAARpg");
	var mask_8_graphics_506 = new cjs.Graphics().p("Ai+ImIAAxLIF8AAIAARLg");
	var mask_8_graphics_507 = new cjs.Graphics().p("Ai+IXIAAwtIF8AAIAAQtg");
	var mask_8_graphics_508 = new cjs.Graphics().p("Ai+IIIAAwPIF8AAIAAQPg");
	var mask_8_graphics_509 = new cjs.Graphics().p("Ai+H5IAAvxIF8AAIAAPxg");
	var mask_8_graphics_510 = new cjs.Graphics().p("Ai+HqIAAvUIF8AAIAAPUg");
	var mask_8_graphics_511 = new cjs.Graphics().p("Ai+HbIAAu1IF8AAIAAO1g");
	var mask_8_graphics_512 = new cjs.Graphics().p("Ai+HMIAAuXIF8AAIAAOXg");
	var mask_8_graphics_513 = new cjs.Graphics().p("Ai+G9IAAt6IF8AAIAAN6g");
	var mask_8_graphics_514 = new cjs.Graphics().p("Ai+GuIAAtbIF8AAIAANbg");
	var mask_8_graphics_515 = new cjs.Graphics().p("Ai+GfIAAs9IF8AAIAAM9g");
	var mask_8_graphics_516 = new cjs.Graphics().p("Ai+GQIAAsgIF8AAIAAMgg");
	var mask_8_graphics_517 = new cjs.Graphics().p("Ai+GBIAAsBIF8AAIAAMBg");
	var mask_8_graphics_518 = new cjs.Graphics().p("Ai+FyIAArjIF8AAIAALjg");
	var mask_8_graphics_519 = new cjs.Graphics().p("AjRLfIAA29IGjAAIAAW9g");
	var mask_8_graphics_520 = new cjs.Graphics().p("AjRLPIAA2dIGjAAIAAWdg");
	var mask_8_graphics_521 = new cjs.Graphics().p("AjRK/IAA19IGjAAIAAV9g");
	var mask_8_graphics_522 = new cjs.Graphics().p("AjRKvIAA1eIGjAAIAAVeg");
	var mask_8_graphics_523 = new cjs.Graphics().p("AjRKgIAA0/IGjAAIAAU/g");
	var mask_8_graphics_524 = new cjs.Graphics().p("AjRKQIAA0fIGjAAIAAUfg");
	var mask_8_graphics_525 = new cjs.Graphics().p("AjRKAIAAz/IGjAAIAAT/g");
	var mask_8_graphics_526 = new cjs.Graphics().p("AjRJwIAAzfIGjAAIAATfg");
	var mask_8_graphics_527 = new cjs.Graphics().p("AjRJgIAAy/IGjAAIAAS/g");
	var mask_8_graphics_528 = new cjs.Graphics().p("AjRJRIAAyhIGjAAIAAShg");
	var mask_8_graphics_529 = new cjs.Graphics().p("AjRJBIAAyBIGjAAIAASBg");
	var mask_8_graphics_530 = new cjs.Graphics().p("AjRIxIAAxhIGjAAIAARhg");
	var mask_8_graphics_531 = new cjs.Graphics().p("AjRIhIAAxBIGjAAIAARBg");
	var mask_8_graphics_532 = new cjs.Graphics().p("AjRISIAAwjIGjAAIAAQjg");

	this.timeline.addTween(cjs.Tween.get(mask_8).to({graphics:mask_8_graphics_0,x:-149.6,y:-86.225}).wait(1).to({graphics:mask_8_graphics_1,x:-149.6,y:-85.975}).wait(1).to({graphics:mask_8_graphics_2,x:-149.6,y:-85.725}).wait(1).to({graphics:mask_8_graphics_3,x:-149.6,y:-85.475}).wait(1).to({graphics:mask_8_graphics_4,x:-149.6,y:-85.225}).wait(1).to({graphics:mask_8_graphics_5,x:-149.6,y:-84.975}).wait(1).to({graphics:mask_8_graphics_6,x:-149.6,y:-84.725}).wait(1).to({graphics:mask_8_graphics_7,x:-149.6,y:-84.45}).wait(1).to({graphics:mask_8_graphics_8,x:-149.6,y:-84.2}).wait(1).to({graphics:mask_8_graphics_9,x:-149.6,y:-83.95}).wait(1).to({graphics:mask_8_graphics_10,x:-149.6,y:-83.7}).wait(1).to({graphics:mask_8_graphics_11,x:-149.6,y:-83.45}).wait(1).to({graphics:mask_8_graphics_12,x:-149.6,y:-83.2}).wait(1).to({graphics:mask_8_graphics_13,x:-149.6,y:-82.95}).wait(1).to({graphics:mask_8_graphics_14,x:-149.6,y:-82.7}).wait(1).to({graphics:mask_8_graphics_15,x:-149.6,y:-82.45}).wait(1).to({graphics:mask_8_graphics_16,x:-149.6,y:-82.2}).wait(1).to({graphics:mask_8_graphics_17,x:-149.6,y:-81.95}).wait(1).to({graphics:mask_8_graphics_18,x:-149.6,y:-81.675}).wait(1).to({graphics:mask_8_graphics_19,x:-149.6,y:-81.425}).wait(1).to({graphics:mask_8_graphics_20,x:-149.6,y:-81.175}).wait(1).to({graphics:mask_8_graphics_21,x:-149.6,y:-80.925}).wait(1).to({graphics:mask_8_graphics_22,x:-149.6,y:-80.675}).wait(1).to({graphics:mask_8_graphics_23,x:-149.6,y:-80.425}).wait(1).to({graphics:mask_8_graphics_24,x:-149.6,y:-80.175}).wait(1).to({graphics:mask_8_graphics_25,x:-149.6,y:-79.925}).wait(1).to({graphics:mask_8_graphics_26,x:-149.6,y:-79.675}).wait(1).to({graphics:mask_8_graphics_27,x:-149.6,y:-79.425}).wait(1).to({graphics:mask_8_graphics_28,x:-149.6,y:-79.175}).wait(1).to({graphics:mask_8_graphics_29,x:-149.6,y:-78.925}).wait(1).to({graphics:mask_8_graphics_30,x:-149.6,y:-78.65}).wait(1).to({graphics:mask_8_graphics_31,x:-149.6,y:-78.4}).wait(1).to({graphics:mask_8_graphics_32,x:-149.6,y:-78.15}).wait(1).to({graphics:mask_8_graphics_33,x:-149.6,y:-77.9}).wait(1).to({graphics:mask_8_graphics_34,x:-149.6,y:-77.65}).wait(1).to({graphics:mask_8_graphics_35,x:-149.6,y:-77.4}).wait(1).to({graphics:mask_8_graphics_36,x:-149.6,y:-77.15}).wait(1).to({graphics:mask_8_graphics_37,x:-149.6,y:-76.9}).wait(1).to({graphics:mask_8_graphics_38,x:-149.6,y:-76.65}).wait(1).to({graphics:mask_8_graphics_39,x:-149.6,y:-76.4}).wait(1).to({graphics:mask_8_graphics_40,x:-149.6,y:-76.15}).wait(1).to({graphics:mask_8_graphics_41,x:-149.6,y:-75.9}).wait(1).to({graphics:mask_8_graphics_42,x:-149.6,y:-75.625}).wait(1).to({graphics:mask_8_graphics_43,x:-149.6,y:-75.375}).wait(1).to({graphics:mask_8_graphics_44,x:-149.6,y:-75.125}).wait(1).to({graphics:mask_8_graphics_45,x:-149.6,y:-74.875}).wait(1).to({graphics:mask_8_graphics_46,x:-149.6,y:-74.625}).wait(1).to({graphics:mask_8_graphics_47,x:-149.6,y:-74.375}).wait(1).to({graphics:mask_8_graphics_48,x:-149.6,y:-74.125}).wait(1).to({graphics:mask_8_graphics_49,x:-149.6,y:-73.875}).wait(1).to({graphics:mask_8_graphics_50,x:-149.6,y:-73.625}).wait(1).to({graphics:mask_8_graphics_51,x:-149.6,y:-73.375}).wait(1).to({graphics:mask_8_graphics_52,x:-149.6,y:-73.125}).wait(1).to({graphics:mask_8_graphics_53,x:-149.6,y:-72.875}).wait(1).to({graphics:mask_8_graphics_54,x:-149.6,y:-72.6}).wait(1).to({graphics:mask_8_graphics_55,x:-149.6,y:-72.35}).wait(1).to({graphics:mask_8_graphics_56,x:-149.6,y:-72.1}).wait(1).to({graphics:mask_8_graphics_57,x:-149.6,y:-71.85}).wait(1).to({graphics:mask_8_graphics_58,x:-149.6,y:-71.6}).wait(1).to({graphics:mask_8_graphics_59,x:-149.6,y:-71.35}).wait(1).to({graphics:mask_8_graphics_60,x:-149.6,y:-71.075}).wait(1).to({graphics:mask_8_graphics_61,x:-149.6,y:-70.825}).wait(1).to({graphics:mask_8_graphics_62,x:-149.6,y:-70.575}).wait(1).to({graphics:mask_8_graphics_63,x:-149.6,y:-70.325}).wait(1).to({graphics:mask_8_graphics_64,x:-149.6,y:-70.075}).wait(1).to({graphics:mask_8_graphics_65,x:-149.6,y:-69.825}).wait(1).to({graphics:mask_8_graphics_66,x:-149.6,y:-69.55}).wait(1).to({graphics:mask_8_graphics_67,x:-149.6,y:-69.3}).wait(1).to({graphics:mask_8_graphics_68,x:-149.6,y:-69.05}).wait(1).to({graphics:mask_8_graphics_69,x:-149.6,y:-68.8}).wait(1).to({graphics:mask_8_graphics_70,x:-149.6,y:-68.55}).wait(1).to({graphics:mask_8_graphics_71,x:-149.6,y:-68.3}).wait(1).to({graphics:mask_8_graphics_72,x:-149.6,y:-68.05}).wait(1).to({graphics:mask_8_graphics_73,x:-149.6,y:-67.8}).wait(1).to({graphics:mask_8_graphics_74,x:-149.6,y:-67.55}).wait(1).to({graphics:mask_8_graphics_75,x:-149.6,y:-67.3}).wait(1).to({graphics:mask_8_graphics_76,x:-149.6,y:-67.05}).wait(1).to({graphics:mask_8_graphics_77,x:-149.6,y:-66.8}).wait(1).to({graphics:mask_8_graphics_78,x:-149.6,y:-66.525}).wait(1).to({graphics:mask_8_graphics_79,x:-149.6,y:-66.275}).wait(1).to({graphics:mask_8_graphics_80,x:-149.6,y:-66.025}).wait(1).to({graphics:mask_8_graphics_81,x:-149.6,y:-65.775}).wait(1).to({graphics:mask_8_graphics_82,x:-149.6,y:-65.525}).wait(1).to({graphics:mask_8_graphics_83,x:-149.6,y:-65.275}).wait(1).to({graphics:mask_8_graphics_84,x:-149.6,y:-65.025}).wait(1).to({graphics:mask_8_graphics_85,x:-149.6,y:-64.775}).wait(1).to({graphics:mask_8_graphics_86,x:-149.6,y:-64.525}).wait(1).to({graphics:mask_8_graphics_87,x:-149.6,y:-64.275}).wait(1).to({graphics:mask_8_graphics_88,x:-149.6,y:-64.025}).wait(1).to({graphics:mask_8_graphics_89,x:-149.6,y:-63.775}).wait(1).to({graphics:mask_8_graphics_90,x:-149.6,y:-63.5}).wait(1).to({graphics:mask_8_graphics_91,x:-149.6,y:-63.25}).wait(1).to({graphics:mask_8_graphics_92,x:-149.6,y:-63}).wait(1).to({graphics:mask_8_graphics_93,x:-149.6,y:-62.75}).wait(1).to({graphics:mask_8_graphics_94,x:-149.6,y:-62.5}).wait(1).to({graphics:mask_8_graphics_95,x:-149.6,y:-62.25}).wait(1).to({graphics:mask_8_graphics_96,x:-149.6,y:-62}).wait(1).to({graphics:mask_8_graphics_97,x:-149.6,y:-61.75}).wait(1).to({graphics:mask_8_graphics_98,x:-149.6,y:-61.5}).wait(1).to({graphics:mask_8_graphics_99,x:-149.6,y:-61.25}).wait(1).to({graphics:mask_8_graphics_100,x:-149.6,y:-61}).wait(1).to({graphics:mask_8_graphics_101,x:-149.6,y:-60.75}).wait(1).to({graphics:mask_8_graphics_102,x:-149.6,y:-60.475}).wait(1).to({graphics:mask_8_graphics_103,x:-149.6,y:-60.225}).wait(1).to({graphics:mask_8_graphics_104,x:-149.6,y:-59.975}).wait(1).to({graphics:mask_8_graphics_105,x:-149.6,y:-59.725}).wait(1).to({graphics:mask_8_graphics_106,x:-149.6,y:-59.475}).wait(1).to({graphics:mask_8_graphics_107,x:-149.6,y:-59.225}).wait(1).to({graphics:mask_8_graphics_108,x:-149.6,y:-58.975}).wait(1).to({graphics:mask_8_graphics_109,x:-149.6,y:-58.725}).wait(1).to({graphics:mask_8_graphics_110,x:-149.6,y:-58.475}).wait(1).to({graphics:mask_8_graphics_111,x:-149.6,y:-58.225}).wait(1).to({graphics:mask_8_graphics_112,x:-149.6,y:-57.975}).wait(1).to({graphics:mask_8_graphics_113,x:-149.6,y:-57.7}).wait(1).to({graphics:mask_8_graphics_114,x:-149.6,y:-57.45}).wait(1).to({graphics:mask_8_graphics_115,x:-149.6,y:-57.2}).wait(1).to({graphics:mask_8_graphics_116,x:-149.6,y:-56.95}).wait(1).to({graphics:mask_8_graphics_117,x:-149.6,y:-56.7}).wait(1).to({graphics:mask_8_graphics_118,x:-149.6,y:-56.45}).wait(1).to({graphics:mask_8_graphics_119,x:-149.6,y:-56.2}).wait(1).to({graphics:mask_8_graphics_120,x:-149.6,y:-56.2}).wait(1).to({graphics:mask_8_graphics_121,x:-149.6,y:-55.55}).wait(1).to({graphics:mask_8_graphics_122,x:-149.6,y:-54.925}).wait(1).to({graphics:mask_8_graphics_123,x:-149.6,y:-54.275}).wait(1).to({graphics:mask_8_graphics_124,x:-149.6,y:-53.65}).wait(1).to({graphics:mask_8_graphics_125,x:-149.6,y:-53}).wait(1).to({graphics:mask_8_graphics_126,x:-149.6,y:-52.35}).wait(1).to({graphics:mask_8_graphics_127,x:-149.6,y:-51.75}).wait(1).to({graphics:mask_8_graphics_128,x:-149.6,y:-51.1}).wait(1).to({graphics:mask_8_graphics_129,x:-149.6,y:-50.475}).wait(1).to({graphics:mask_8_graphics_130,x:-149.6,y:-49.825}).wait(1).to({graphics:mask_8_graphics_131,x:-149.6,y:-49.2}).wait(1).to({graphics:mask_8_graphics_132,x:-149.6,y:-48.55}).wait(1).to({graphics:mask_8_graphics_133,x:-149.6,y:-47.9}).wait(1).to({graphics:mask_8_graphics_134,x:-149.6,y:-47.275}).wait(1).to({graphics:mask_8_graphics_135,x:-149.6,y:-46.625}).wait(1).to({graphics:mask_8_graphics_136,x:-149.6,y:-46}).wait(1).to({graphics:mask_8_graphics_137,x:-149.6,y:-45.35}).wait(1).to({graphics:mask_8_graphics_138,x:-149.6,y:-44.7}).wait(1).to({graphics:mask_8_graphics_139,x:-149.6,y:-44.1}).wait(1).to({graphics:mask_8_graphics_140,x:-149.6,y:-43.45}).wait(1).to({graphics:mask_8_graphics_141,x:-149.6,y:-42.825}).wait(1).to({graphics:mask_8_graphics_142,x:-149.6,y:-42.175}).wait(1).to({graphics:mask_8_graphics_143,x:-149.6,y:-41.55}).wait(1).to({graphics:mask_8_graphics_144,x:-149.6,y:-40.9}).wait(1).to({graphics:mask_8_graphics_145,x:-149.6,y:-40.9}).wait(1).to({graphics:mask_8_graphics_146,x:-149.6,y:-41.55}).wait(1).to({graphics:mask_8_graphics_147,x:-149.6,y:-42.175}).wait(1).to({graphics:mask_8_graphics_148,x:-149.6,y:-42.825}).wait(1).to({graphics:mask_8_graphics_149,x:-149.6,y:-43.45}).wait(1).to({graphics:mask_8_graphics_150,x:-149.6,y:-44.1}).wait(1).to({graphics:mask_8_graphics_151,x:-149.6,y:-44.725}).wait(1).to({graphics:mask_8_graphics_152,x:-149.6,y:-45.375}).wait(1).to({graphics:mask_8_graphics_153,x:-149.6,y:-46.025}).wait(1).to({graphics:mask_8_graphics_154,x:-149.6,y:-46.65}).wait(1).to({graphics:mask_8_graphics_155,x:-149.6,y:-47.3}).wait(1).to({graphics:mask_8_graphics_156,x:-149.6,y:-47.925}).wait(1).to({graphics:mask_8_graphics_157,x:-149.6,y:-48.55}).wait(1).to({graphics:mask_8_graphics_158,x:-149.6,y:-49.2}).wait(1).to({graphics:mask_8_graphics_159,x:-149.6,y:-49.825}).wait(1).to({graphics:mask_8_graphics_160,x:-149.6,y:-50.475}).wait(1).to({graphics:mask_8_graphics_161,x:-149.6,y:-51.1}).wait(1).to({graphics:mask_8_graphics_162,x:-149.6,y:-51.75}).wait(1).to({graphics:mask_8_graphics_163,x:-149.6,y:-52.375}).wait(1).to({graphics:mask_8_graphics_164,x:-149.6,y:-53.025}).wait(1).to({graphics:mask_8_graphics_165,x:-149.6,y:-53.675}).wait(1).to({graphics:mask_8_graphics_166,x:-149.6,y:-54.3}).wait(1).to({graphics:mask_8_graphics_167,x:-149.6,y:-54.95}).wait(1).to({graphics:mask_8_graphics_168,x:-149.6,y:-55.575}).wait(1).to({graphics:mask_8_graphics_169,x:-149.6,y:-56.225}).wait(1).to({graphics:mask_8_graphics_170,x:-149.6,y:-56.225}).wait(1).to({graphics:mask_8_graphics_171,x:-149.6,y:-57.425}).wait(1).to({graphics:mask_8_graphics_172,x:-149.6,y:-58.625}).wait(1).to({graphics:mask_8_graphics_173,x:-149.6,y:-59.8}).wait(1).to({graphics:mask_8_graphics_174,x:-149.6,y:-61}).wait(1).to({graphics:mask_8_graphics_175,x:-149.6,y:-62.2}).wait(1).to({graphics:mask_8_graphics_176,x:-149.6,y:-63.4}).wait(1).to({graphics:mask_8_graphics_177,x:-149.6,y:-64.625}).wait(1).to({graphics:mask_8_graphics_178,x:-149.6,y:-65.8}).wait(1).to({graphics:mask_8_graphics_179,x:-149.6,y:-67}).wait(1).to({graphics:mask_8_graphics_180,x:-149.6,y:-68.2}).wait(1).to({graphics:mask_8_graphics_181,x:-149.6,y:-69.4}).wait(1).to({graphics:mask_8_graphics_182,x:-149.6,y:-70.575}).wait(1).to({graphics:mask_8_graphics_183,x:-149.6,y:-71.775}).wait(1).to({graphics:mask_8_graphics_184,x:-149.6,y:-72.975}).wait(1).to({graphics:mask_8_graphics_185,x:-149.6,y:-74.175}).wait(1).to({graphics:mask_8_graphics_186,x:-149.6,y:-75.375}).wait(1).to({graphics:mask_8_graphics_187,x:-149.6,y:-76.55}).wait(1).to({graphics:mask_8_graphics_188,x:-149.6,y:-77.75}).wait(1).to({graphics:mask_8_graphics_189,x:-149.6,y:-78.975}).wait(1).to({graphics:mask_8_graphics_190,x:-149.6,y:-80.175}).wait(1).to({graphics:mask_8_graphics_191,x:-149.6,y:-81.375}).wait(1).to({graphics:mask_8_graphics_192,x:-149.6,y:-82.55}).wait(1).to({graphics:mask_8_graphics_193,x:-149.6,y:-83.75}).wait(1).to({graphics:mask_8_graphics_194,x:-149.6,y:-84.95}).wait(1).to({graphics:mask_8_graphics_195,x:-84.3135,y:-75.2977}).wait(1).to({graphics:mask_8_graphics_196,x:-149.6,y:-86.225}).wait(1).to({graphics:mask_8_graphics_197,x:-149.6,y:-84.925}).wait(1).to({graphics:mask_8_graphics_198,x:-149.6,y:-83.625}).wait(1).to({graphics:mask_8_graphics_199,x:-149.6,y:-82.3}).wait(1).to({graphics:mask_8_graphics_200,x:-149.6,y:-81}).wait(1).to({graphics:mask_8_graphics_201,x:-149.6,y:-79.7}).wait(1).to({graphics:mask_8_graphics_202,x:-149.6,y:-78.4}).wait(1).to({graphics:mask_8_graphics_203,x:-149.6,y:-77.1}).wait(1).to({graphics:mask_8_graphics_204,x:-149.6,y:-75.8}).wait(1).to({graphics:mask_8_graphics_205,x:-149.6,y:-74.475}).wait(1).to({graphics:mask_8_graphics_206,x:-149.6,y:-73.175}).wait(1).to({graphics:mask_8_graphics_207,x:-149.6,y:-71.875}).wait(1).to({graphics:mask_8_graphics_208,x:-149.6,y:-70.55}).wait(1).to({graphics:mask_8_graphics_209,x:-149.6,y:-69.25}).wait(1).to({graphics:mask_8_graphics_210,x:-149.6,y:-67.95}).wait(1).to({graphics:mask_8_graphics_211,x:-149.6,y:-66.625}).wait(1).to({graphics:mask_8_graphics_212,x:-149.6,y:-65.325}).wait(1).to({graphics:mask_8_graphics_213,x:-149.6,y:-64.025}).wait(1).to({graphics:mask_8_graphics_214,x:-149.6,y:-62.725}).wait(1).to({graphics:mask_8_graphics_215,x:-149.6,y:-61.425}).wait(1).to({graphics:mask_8_graphics_216,x:-149.6,y:-60.125}).wait(1).to({graphics:mask_8_graphics_217,x:-149.6,y:-58.8}).wait(1).to({graphics:mask_8_graphics_218,x:-149.6,y:-57.5}).wait(1).to({graphics:mask_8_graphics_219,x:-149.6,y:-56.2}).wait(1).to({graphics:mask_8_graphics_220,x:-149.6,y:-56.2}).wait(1).to({graphics:mask_8_graphics_221,x:-149.6,y:-55.55}).wait(1).to({graphics:mask_8_graphics_222,x:-149.6,y:-54.925}).wait(1).to({graphics:mask_8_graphics_223,x:-149.6,y:-54.275}).wait(1).to({graphics:mask_8_graphics_224,x:-149.6,y:-53.65}).wait(1).to({graphics:mask_8_graphics_225,x:-149.6,y:-53}).wait(1).to({graphics:mask_8_graphics_226,x:-149.6,y:-52.35}).wait(1).to({graphics:mask_8_graphics_227,x:-149.6,y:-51.75}).wait(1).to({graphics:mask_8_graphics_228,x:-149.6,y:-51.1}).wait(1).to({graphics:mask_8_graphics_229,x:-149.6,y:-50.475}).wait(1).to({graphics:mask_8_graphics_230,x:-149.6,y:-49.825}).wait(1).to({graphics:mask_8_graphics_231,x:-149.6,y:-49.2}).wait(1).to({graphics:mask_8_graphics_232,x:-149.6,y:-48.55}).wait(1).to({graphics:mask_8_graphics_233,x:-149.6,y:-47.9}).wait(1).to({graphics:mask_8_graphics_234,x:-149.6,y:-47.275}).wait(1).to({graphics:mask_8_graphics_235,x:-149.6,y:-46.625}).wait(1).to({graphics:mask_8_graphics_236,x:-149.6,y:-46}).wait(1).to({graphics:mask_8_graphics_237,x:-149.6,y:-45.35}).wait(1).to({graphics:mask_8_graphics_238,x:-149.6,y:-44.7}).wait(1).to({graphics:mask_8_graphics_239,x:-149.6,y:-44.1}).wait(1).to({graphics:mask_8_graphics_240,x:-149.6,y:-43.45}).wait(1).to({graphics:mask_8_graphics_241,x:-149.6,y:-42.825}).wait(1).to({graphics:mask_8_graphics_242,x:-149.6,y:-42.175}).wait(1).to({graphics:mask_8_graphics_243,x:-149.6,y:-41.55}).wait(1).to({graphics:mask_8_graphics_244,x:-149.6,y:-40.9}).wait(1).to({graphics:mask_8_graphics_245,x:-149.6,y:-40.9}).wait(1).to({graphics:mask_8_graphics_246,x:-149.6,y:-41.55}).wait(1).to({graphics:mask_8_graphics_247,x:-149.6,y:-42.175}).wait(1).to({graphics:mask_8_graphics_248,x:-149.6,y:-42.825}).wait(1).to({graphics:mask_8_graphics_249,x:-149.6,y:-43.45}).wait(1).to({graphics:mask_8_graphics_250,x:-149.6,y:-44.1}).wait(1).to({graphics:mask_8_graphics_251,x:-149.6,y:-44.725}).wait(1).to({graphics:mask_8_graphics_252,x:-149.6,y:-45.375}).wait(1).to({graphics:mask_8_graphics_253,x:-149.6,y:-46.025}).wait(1).to({graphics:mask_8_graphics_254,x:-149.6,y:-46.65}).wait(1).to({graphics:mask_8_graphics_255,x:-149.6,y:-47.3}).wait(1).to({graphics:mask_8_graphics_256,x:-149.6,y:-47.925}).wait(1).to({graphics:mask_8_graphics_257,x:-149.6,y:-48.55}).wait(1).to({graphics:mask_8_graphics_258,x:-149.6,y:-49.2}).wait(1).to({graphics:mask_8_graphics_259,x:-149.6,y:-49.825}).wait(1).to({graphics:mask_8_graphics_260,x:-149.6,y:-50.475}).wait(1).to({graphics:mask_8_graphics_261,x:-149.6,y:-51.1}).wait(1).to({graphics:mask_8_graphics_262,x:-149.6,y:-51.75}).wait(1).to({graphics:mask_8_graphics_263,x:-149.6,y:-52.375}).wait(1).to({graphics:mask_8_graphics_264,x:-149.6,y:-53.025}).wait(1).to({graphics:mask_8_graphics_265,x:-149.6,y:-53.675}).wait(1).to({graphics:mask_8_graphics_266,x:-149.6,y:-54.3}).wait(1).to({graphics:mask_8_graphics_267,x:-149.6,y:-54.95}).wait(1).to({graphics:mask_8_graphics_268,x:-149.6,y:-55.575}).wait(1).to({graphics:mask_8_graphics_269,x:-149.6,y:-56.225}).wait(1).to({graphics:mask_8_graphics_270,x:-149.6,y:-56.225}).wait(1).to({graphics:mask_8_graphics_271,x:-149.6,y:-57.425}).wait(1).to({graphics:mask_8_graphics_272,x:-149.6,y:-58.625}).wait(1).to({graphics:mask_8_graphics_273,x:-149.6,y:-59.8}).wait(1).to({graphics:mask_8_graphics_274,x:-149.6,y:-61}).wait(1).to({graphics:mask_8_graphics_275,x:-149.6,y:-62.2}).wait(1).to({graphics:mask_8_graphics_276,x:-149.6,y:-63.4}).wait(1).to({graphics:mask_8_graphics_277,x:-149.6,y:-64.625}).wait(1).to({graphics:mask_8_graphics_278,x:-149.6,y:-65.8}).wait(1).to({graphics:mask_8_graphics_279,x:-149.6,y:-67}).wait(1).to({graphics:mask_8_graphics_280,x:-149.6,y:-68.2}).wait(1).to({graphics:mask_8_graphics_281,x:-149.6,y:-69.4}).wait(1).to({graphics:mask_8_graphics_282,x:-149.6,y:-70.575}).wait(1).to({graphics:mask_8_graphics_283,x:-149.6,y:-71.775}).wait(1).to({graphics:mask_8_graphics_284,x:-149.6,y:-72.975}).wait(1).to({graphics:mask_8_graphics_285,x:-149.6,y:-74.175}).wait(1).to({graphics:mask_8_graphics_286,x:-149.6,y:-75.375}).wait(1).to({graphics:mask_8_graphics_287,x:-149.6,y:-76.55}).wait(1).to({graphics:mask_8_graphics_288,x:-149.6,y:-77.75}).wait(1).to({graphics:mask_8_graphics_289,x:-149.6,y:-78.975}).wait(1).to({graphics:mask_8_graphics_290,x:-149.6,y:-80.175}).wait(1).to({graphics:mask_8_graphics_291,x:-149.6,y:-81.375}).wait(1).to({graphics:mask_8_graphics_292,x:-149.6,y:-82.55}).wait(1).to({graphics:mask_8_graphics_293,x:-149.6,y:-83.75}).wait(1).to({graphics:mask_8_graphics_294,x:-149.6,y:-84.95}).wait(1).to({graphics:mask_8_graphics_295,x:-84.3135,y:-75.2977}).wait(1).to({graphics:mask_8_graphics_296,x:-149.6,y:-86.225}).wait(1).to({graphics:mask_8_graphics_297,x:-84.3135,y:-75.2977}).wait(1).to({graphics:mask_8_graphics_298,x:-149.6,y:-86.225}).wait(1).to({graphics:mask_8_graphics_299,x:-149.6,y:-84.925}).wait(1).to({graphics:mask_8_graphics_300,x:-149.6,y:-83.625}).wait(1).to({graphics:mask_8_graphics_301,x:-149.6,y:-82.3}).wait(1).to({graphics:mask_8_graphics_302,x:-149.6,y:-81}).wait(1).to({graphics:mask_8_graphics_303,x:-149.6,y:-79.7}).wait(1).to({graphics:mask_8_graphics_304,x:-149.6,y:-78.4}).wait(1).to({graphics:mask_8_graphics_305,x:-149.6,y:-77.1}).wait(1).to({graphics:mask_8_graphics_306,x:-149.6,y:-75.8}).wait(1).to({graphics:mask_8_graphics_307,x:-149.6,y:-74.475}).wait(1).to({graphics:mask_8_graphics_308,x:-149.6,y:-73.175}).wait(1).to({graphics:mask_8_graphics_309,x:-149.6,y:-71.875}).wait(1).to({graphics:mask_8_graphics_310,x:-149.6,y:-70.55}).wait(1).to({graphics:mask_8_graphics_311,x:-149.6,y:-69.25}).wait(1).to({graphics:mask_8_graphics_312,x:-149.6,y:-67.95}).wait(1).to({graphics:mask_8_graphics_313,x:-149.6,y:-66.625}).wait(1).to({graphics:mask_8_graphics_314,x:-149.6,y:-65.325}).wait(1).to({graphics:mask_8_graphics_315,x:-149.6,y:-64.025}).wait(1).to({graphics:mask_8_graphics_316,x:-149.6,y:-62.725}).wait(1).to({graphics:mask_8_graphics_317,x:-149.6,y:-61.425}).wait(1).to({graphics:mask_8_graphics_318,x:-149.6,y:-60.125}).wait(1).to({graphics:mask_8_graphics_319,x:-149.6,y:-58.8}).wait(1).to({graphics:mask_8_graphics_320,x:-149.6,y:-57.5}).wait(1).to({graphics:mask_8_graphics_321,x:-149.6,y:-56.2}).wait(1).to({graphics:mask_8_graphics_322,x:-149.6,y:-56.2}).wait(1).to({graphics:mask_8_graphics_323,x:-149.6,y:-55.55}).wait(1).to({graphics:mask_8_graphics_324,x:-149.6,y:-54.925}).wait(1).to({graphics:mask_8_graphics_325,x:-149.6,y:-54.275}).wait(1).to({graphics:mask_8_graphics_326,x:-149.6,y:-53.65}).wait(1).to({graphics:mask_8_graphics_327,x:-149.6,y:-53}).wait(1).to({graphics:mask_8_graphics_328,x:-149.6,y:-52.35}).wait(1).to({graphics:mask_8_graphics_329,x:-149.6,y:-51.75}).wait(1).to({graphics:mask_8_graphics_330,x:-149.6,y:-51.1}).wait(1).to({graphics:mask_8_graphics_331,x:-149.6,y:-50.475}).wait(1).to({graphics:mask_8_graphics_332,x:-149.6,y:-49.825}).wait(1).to({graphics:mask_8_graphics_333,x:-149.6,y:-49.2}).wait(1).to({graphics:mask_8_graphics_334,x:-149.6,y:-48.55}).wait(1).to({graphics:mask_8_graphics_335,x:-149.6,y:-47.9}).wait(1).to({graphics:mask_8_graphics_336,x:-149.6,y:-47.275}).wait(1).to({graphics:mask_8_graphics_337,x:-149.6,y:-46.625}).wait(1).to({graphics:mask_8_graphics_338,x:-149.6,y:-46}).wait(1).to({graphics:mask_8_graphics_339,x:-149.6,y:-45.35}).wait(1).to({graphics:mask_8_graphics_340,x:-149.6,y:-44.7}).wait(1).to({graphics:mask_8_graphics_341,x:-149.6,y:-44.1}).wait(1).to({graphics:mask_8_graphics_342,x:-149.6,y:-43.45}).wait(1).to({graphics:mask_8_graphics_343,x:-149.6,y:-42.825}).wait(1).to({graphics:mask_8_graphics_344,x:-149.6,y:-42.175}).wait(1).to({graphics:mask_8_graphics_345,x:-149.6,y:-41.55}).wait(1).to({graphics:mask_8_graphics_346,x:-149.6,y:-40.9}).wait(1).to({graphics:mask_8_graphics_347,x:-149.6,y:-40.9}).wait(1).to({graphics:mask_8_graphics_348,x:-149.6,y:-41.55}).wait(1).to({graphics:mask_8_graphics_349,x:-149.6,y:-42.175}).wait(1).to({graphics:mask_8_graphics_350,x:-149.6,y:-42.825}).wait(1).to({graphics:mask_8_graphics_351,x:-149.6,y:-43.45}).wait(1).to({graphics:mask_8_graphics_352,x:-149.6,y:-44.1}).wait(1).to({graphics:mask_8_graphics_353,x:-149.6,y:-44.725}).wait(1).to({graphics:mask_8_graphics_354,x:-149.6,y:-45.375}).wait(1).to({graphics:mask_8_graphics_355,x:-149.6,y:-46.025}).wait(1).to({graphics:mask_8_graphics_356,x:-149.6,y:-46.65}).wait(1).to({graphics:mask_8_graphics_357,x:-149.6,y:-47.3}).wait(1).to({graphics:mask_8_graphics_358,x:-149.6,y:-47.925}).wait(1).to({graphics:mask_8_graphics_359,x:-149.6,y:-48.55}).wait(1).to({graphics:mask_8_graphics_360,x:-149.6,y:-49.2}).wait(1).to({graphics:mask_8_graphics_361,x:-149.6,y:-49.825}).wait(1).to({graphics:mask_8_graphics_362,x:-149.6,y:-50.475}).wait(1).to({graphics:mask_8_graphics_363,x:-149.6,y:-51.1}).wait(1).to({graphics:mask_8_graphics_364,x:-149.6,y:-51.75}).wait(1).to({graphics:mask_8_graphics_365,x:-149.6,y:-52.375}).wait(1).to({graphics:mask_8_graphics_366,x:-149.6,y:-53.025}).wait(1).to({graphics:mask_8_graphics_367,x:-149.6,y:-53.675}).wait(1).to({graphics:mask_8_graphics_368,x:-149.6,y:-54.3}).wait(1).to({graphics:mask_8_graphics_369,x:-149.6,y:-54.95}).wait(1).to({graphics:mask_8_graphics_370,x:-149.6,y:-55.575}).wait(1).to({graphics:mask_8_graphics_371,x:-149.6,y:-56.225}).wait(1).to({graphics:mask_8_graphics_372,x:-149.6,y:-56.225}).wait(1).to({graphics:mask_8_graphics_373,x:-149.6,y:-57.425}).wait(1).to({graphics:mask_8_graphics_374,x:-149.6,y:-58.625}).wait(1).to({graphics:mask_8_graphics_375,x:-149.6,y:-59.8}).wait(1).to({graphics:mask_8_graphics_376,x:-149.6,y:-61}).wait(1).to({graphics:mask_8_graphics_377,x:-149.6,y:-62.2}).wait(1).to({graphics:mask_8_graphics_378,x:-149.6,y:-63.4}).wait(1).to({graphics:mask_8_graphics_379,x:-149.6,y:-64.625}).wait(1).to({graphics:mask_8_graphics_380,x:-149.6,y:-65.8}).wait(1).to({graphics:mask_8_graphics_381,x:-149.6,y:-67}).wait(1).to({graphics:mask_8_graphics_382,x:-149.6,y:-68.2}).wait(1).to({graphics:mask_8_graphics_383,x:-149.6,y:-69.4}).wait(1).to({graphics:mask_8_graphics_384,x:-149.6,y:-70.575}).wait(1).to({graphics:mask_8_graphics_385,x:-149.6,y:-71.775}).wait(1).to({graphics:mask_8_graphics_386,x:-149.6,y:-72.975}).wait(1).to({graphics:mask_8_graphics_387,x:-149.6,y:-74.175}).wait(1).to({graphics:mask_8_graphics_388,x:-149.6,y:-75.375}).wait(1).to({graphics:mask_8_graphics_389,x:-149.6,y:-76.55}).wait(1).to({graphics:mask_8_graphics_390,x:-149.6,y:-77.75}).wait(1).to({graphics:mask_8_graphics_391,x:-149.6,y:-78.975}).wait(1).to({graphics:mask_8_graphics_392,x:-149.6,y:-80.175}).wait(1).to({graphics:mask_8_graphics_393,x:-149.6,y:-81.375}).wait(1).to({graphics:mask_8_graphics_394,x:-149.6,y:-82.55}).wait(1).to({graphics:mask_8_graphics_395,x:-149.6,y:-83.75}).wait(1).to({graphics:mask_8_graphics_396,x:-149.6,y:-84.95}).wait(1).to({graphics:mask_8_graphics_397,x:-84.3135,y:-75.2977}).wait(1).to({graphics:mask_8_graphics_398,x:-149.6,y:-86.225}).wait(1).to({graphics:mask_8_graphics_399,x:-149.6,y:-84.925}).wait(1).to({graphics:mask_8_graphics_400,x:-149.6,y:-83.625}).wait(1).to({graphics:mask_8_graphics_401,x:-149.6,y:-82.3}).wait(1).to({graphics:mask_8_graphics_402,x:-149.6,y:-81}).wait(1).to({graphics:mask_8_graphics_403,x:-149.6,y:-79.7}).wait(1).to({graphics:mask_8_graphics_404,x:-149.6,y:-78.4}).wait(1).to({graphics:mask_8_graphics_405,x:-149.6,y:-77.1}).wait(1).to({graphics:mask_8_graphics_406,x:-149.6,y:-75.8}).wait(1).to({graphics:mask_8_graphics_407,x:-149.6,y:-74.475}).wait(1).to({graphics:mask_8_graphics_408,x:-149.6,y:-73.175}).wait(1).to({graphics:mask_8_graphics_409,x:-149.6,y:-71.875}).wait(1).to({graphics:mask_8_graphics_410,x:-149.6,y:-70.55}).wait(1).to({graphics:mask_8_graphics_411,x:-149.6,y:-69.25}).wait(1).to({graphics:mask_8_graphics_412,x:-149.6,y:-67.95}).wait(1).to({graphics:mask_8_graphics_413,x:-149.6,y:-66.625}).wait(1).to({graphics:mask_8_graphics_414,x:-149.6,y:-65.325}).wait(1).to({graphics:mask_8_graphics_415,x:-149.6,y:-64.025}).wait(1).to({graphics:mask_8_graphics_416,x:-149.6,y:-62.725}).wait(1).to({graphics:mask_8_graphics_417,x:-149.6,y:-61.425}).wait(1).to({graphics:mask_8_graphics_418,x:-149.6,y:-60.125}).wait(1).to({graphics:mask_8_graphics_419,x:-149.6,y:-58.8}).wait(1).to({graphics:mask_8_graphics_420,x:-149.6,y:-57.5}).wait(1).to({graphics:mask_8_graphics_421,x:-149.6,y:-56.2}).wait(1).to({graphics:mask_8_graphics_422,x:-149.6,y:-56.2}).wait(1).to({graphics:mask_8_graphics_423,x:-149.6,y:-55.55}).wait(1).to({graphics:mask_8_graphics_424,x:-149.6,y:-54.925}).wait(1).to({graphics:mask_8_graphics_425,x:-149.6,y:-54.275}).wait(1).to({graphics:mask_8_graphics_426,x:-149.6,y:-53.65}).wait(1).to({graphics:mask_8_graphics_427,x:-149.6,y:-53}).wait(1).to({graphics:mask_8_graphics_428,x:-149.6,y:-52.35}).wait(1).to({graphics:mask_8_graphics_429,x:-149.6,y:-51.75}).wait(1).to({graphics:mask_8_graphics_430,x:-149.6,y:-51.1}).wait(1).to({graphics:mask_8_graphics_431,x:-149.6,y:-50.475}).wait(1).to({graphics:mask_8_graphics_432,x:-149.6,y:-49.825}).wait(1).to({graphics:mask_8_graphics_433,x:-149.6,y:-49.2}).wait(1).to({graphics:mask_8_graphics_434,x:-149.6,y:-48.55}).wait(1).to({graphics:mask_8_graphics_435,x:-149.6,y:-47.9}).wait(1).to({graphics:mask_8_graphics_436,x:-149.6,y:-47.275}).wait(1).to({graphics:mask_8_graphics_437,x:-149.6,y:-46.625}).wait(1).to({graphics:mask_8_graphics_438,x:-149.6,y:-46}).wait(1).to({graphics:mask_8_graphics_439,x:-149.6,y:-45.35}).wait(1).to({graphics:mask_8_graphics_440,x:-149.6,y:-44.7}).wait(1).to({graphics:mask_8_graphics_441,x:-149.6,y:-44.1}).wait(1).to({graphics:mask_8_graphics_442,x:-149.6,y:-43.45}).wait(1).to({graphics:mask_8_graphics_443,x:-149.6,y:-42.825}).wait(1).to({graphics:mask_8_graphics_444,x:-149.6,y:-42.175}).wait(1).to({graphics:mask_8_graphics_445,x:-149.6,y:-41.55}).wait(1).to({graphics:mask_8_graphics_446,x:-149.6,y:-40.9}).wait(1).to({graphics:mask_8_graphics_447,x:-149.6,y:-40.9}).wait(1).to({graphics:mask_8_graphics_448,x:-149.6,y:-41.55}).wait(1).to({graphics:mask_8_graphics_449,x:-149.6,y:-42.175}).wait(1).to({graphics:mask_8_graphics_450,x:-149.6,y:-42.825}).wait(1).to({graphics:mask_8_graphics_451,x:-149.6,y:-43.45}).wait(1).to({graphics:mask_8_graphics_452,x:-149.6,y:-44.1}).wait(1).to({graphics:mask_8_graphics_453,x:-149.6,y:-44.725}).wait(1).to({graphics:mask_8_graphics_454,x:-149.6,y:-45.375}).wait(1).to({graphics:mask_8_graphics_455,x:-149.6,y:-46.025}).wait(1).to({graphics:mask_8_graphics_456,x:-149.6,y:-46.65}).wait(1).to({graphics:mask_8_graphics_457,x:-149.6,y:-47.3}).wait(1).to({graphics:mask_8_graphics_458,x:-149.6,y:-47.925}).wait(1).to({graphics:mask_8_graphics_459,x:-149.6,y:-48.55}).wait(1).to({graphics:mask_8_graphics_460,x:-149.6,y:-49.2}).wait(1).to({graphics:mask_8_graphics_461,x:-149.6,y:-49.825}).wait(1).to({graphics:mask_8_graphics_462,x:-149.6,y:-50.475}).wait(1).to({graphics:mask_8_graphics_463,x:-149.6,y:-51.1}).wait(1).to({graphics:mask_8_graphics_464,x:-149.6,y:-51.75}).wait(1).to({graphics:mask_8_graphics_465,x:-149.6,y:-52.375}).wait(1).to({graphics:mask_8_graphics_466,x:-149.6,y:-53.025}).wait(1).to({graphics:mask_8_graphics_467,x:-149.6,y:-53.675}).wait(1).to({graphics:mask_8_graphics_468,x:-149.6,y:-54.3}).wait(1).to({graphics:mask_8_graphics_469,x:-149.6,y:-54.95}).wait(1).to({graphics:mask_8_graphics_470,x:-149.6,y:-55.575}).wait(1).to({graphics:mask_8_graphics_471,x:-149.6,y:-56.225}).wait(1).to({graphics:mask_8_graphics_472,x:-149.6,y:-56.225}).wait(1).to({graphics:mask_8_graphics_473,x:-149.6,y:-57.425}).wait(1).to({graphics:mask_8_graphics_474,x:-149.6,y:-58.625}).wait(1).to({graphics:mask_8_graphics_475,x:-149.6,y:-59.8}).wait(1).to({graphics:mask_8_graphics_476,x:-149.6,y:-61}).wait(1).to({graphics:mask_8_graphics_477,x:-149.6,y:-62.2}).wait(1).to({graphics:mask_8_graphics_478,x:-149.6,y:-63.4}).wait(1).to({graphics:mask_8_graphics_479,x:-149.6,y:-64.625}).wait(1).to({graphics:mask_8_graphics_480,x:-149.6,y:-65.8}).wait(1).to({graphics:mask_8_graphics_481,x:-149.6,y:-67}).wait(1).to({graphics:mask_8_graphics_482,x:-149.6,y:-68.2}).wait(1).to({graphics:mask_8_graphics_483,x:-149.6,y:-69.4}).wait(1).to({graphics:mask_8_graphics_484,x:-149.6,y:-70.575}).wait(1).to({graphics:mask_8_graphics_485,x:-149.6,y:-71.775}).wait(1).to({graphics:mask_8_graphics_486,x:-149.6,y:-72.975}).wait(1).to({graphics:mask_8_graphics_487,x:-149.6,y:-74.175}).wait(1).to({graphics:mask_8_graphics_488,x:-149.6,y:-75.375}).wait(1).to({graphics:mask_8_graphics_489,x:-149.6,y:-76.55}).wait(1).to({graphics:mask_8_graphics_490,x:-149.6,y:-77.75}).wait(1).to({graphics:mask_8_graphics_491,x:-149.6,y:-78.975}).wait(1).to({graphics:mask_8_graphics_492,x:-149.6,y:-80.175}).wait(1).to({graphics:mask_8_graphics_493,x:-149.6,y:-81.375}).wait(1).to({graphics:mask_8_graphics_494,x:-149.6,y:-82.55}).wait(1).to({graphics:mask_8_graphics_495,x:-149.6,y:-83.75}).wait(1).to({graphics:mask_8_graphics_496,x:-149.6,y:-84.95}).wait(1).to({graphics:mask_8_graphics_497,x:-84.3135,y:-75.2977}).wait(1).to({graphics:mask_8_graphics_498,x:-149.6,y:-86.225}).wait(1).to({graphics:mask_8_graphics_499,x:-149.6,y:-84.725}).wait(1).to({graphics:mask_8_graphics_500,x:-149.6,y:-83.225}).wait(1).to({graphics:mask_8_graphics_501,x:-149.6,y:-81.725}).wait(1).to({graphics:mask_8_graphics_502,x:-149.6,y:-80.225}).wait(1).to({graphics:mask_8_graphics_503,x:-149.6,y:-78.725}).wait(1).to({graphics:mask_8_graphics_504,x:-149.6,y:-77.225}).wait(1).to({graphics:mask_8_graphics_505,x:-149.6,y:-75.725}).wait(1).to({graphics:mask_8_graphics_506,x:-149.6,y:-74.225}).wait(1).to({graphics:mask_8_graphics_507,x:-149.6,y:-72.725}).wait(1).to({graphics:mask_8_graphics_508,x:-149.6,y:-71.2}).wait(1).to({graphics:mask_8_graphics_509,x:-149.6,y:-69.7}).wait(1).to({graphics:mask_8_graphics_510,x:-149.6,y:-68.2}).wait(1).to({graphics:mask_8_graphics_511,x:-149.6,y:-66.7}).wait(1).to({graphics:mask_8_graphics_512,x:-149.6,y:-65.2}).wait(1).to({graphics:mask_8_graphics_513,x:-149.6,y:-63.7}).wait(1).to({graphics:mask_8_graphics_514,x:-149.6,y:-62.2}).wait(1).to({graphics:mask_8_graphics_515,x:-149.6,y:-60.7}).wait(1).to({graphics:mask_8_graphics_516,x:-149.6,y:-59.2}).wait(1).to({graphics:mask_8_graphics_517,x:-149.6,y:-57.7}).wait(1).to({graphics:mask_8_graphics_518,x:-149.6,y:-56.2}).wait(1).to({graphics:mask_8_graphics_519,x:-148.4,y:-83.825}).wait(1).to({graphics:mask_8_graphics_520,x:-148.4,y:-82.25}).wait(1).to({graphics:mask_8_graphics_521,x:-148.4,y:-80.675}).wait(1).to({graphics:mask_8_graphics_522,x:-148.4,y:-79.1}).wait(1).to({graphics:mask_8_graphics_523,x:-148.4,y:-77.525}).wait(1).to({graphics:mask_8_graphics_524,x:-148.4,y:-75.95}).wait(1).to({graphics:mask_8_graphics_525,x:-148.4,y:-74.375}).wait(1).to({graphics:mask_8_graphics_526,x:-148.4,y:-72.775}).wait(1).to({graphics:mask_8_graphics_527,x:-148.4,y:-71.2}).wait(1).to({graphics:mask_8_graphics_528,x:-148.4,y:-69.625}).wait(1).to({graphics:mask_8_graphics_529,x:-148.4,y:-68.05}).wait(1).to({graphics:mask_8_graphics_530,x:-148.4,y:-66.475}).wait(1).to({graphics:mask_8_graphics_531,x:-148.4,y:-64.9}).wait(1).to({graphics:mask_8_graphics_532,x:-148.4,y:-63.325}).wait(758));

	// Masked_Layer_197___196
	this.instance_135 = new lib.shape5("synched",0);
	this.instance_135.setTransform(-148.7,35.4);

	var maskedShapeInstanceList = [this.instance_135];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_8;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_135).to({_off:true},533).wait(757));

	// Mask_Layer_3 (mask)
	var mask_9 = new cjs.Shape();
	mask_9._off = true;
	mask_9.graphics.p("AtoW9IAAzMIHk4fIAAhuIBdgCIAAgeIIiAAIAAAbIBaAAIAAA5IAJAAIAAAoIAGASIADAKIH/YcIADRfIgDAAIAABmg");
	mask_9.setTransform(-147.225,137.95);

	// Masked_Layer_190___3
	this.instance_136 = new lib.sprite60();
	this.instance_136.setTransform(-92.8,111.35);
	this.instance_136.alpha = 0;
	this.instance_136._off = true;
	var instance_136Filter_7 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_136.filters = [instance_136Filter_7];
	this.instance_136.cache(-47,-29,95,59);

	var maskedShapeInstanceList = [this.instance_136];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_9;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_136).wait(380).to({_off:false},0).to({alpha:0.0195},1).to({alpha:0.3281},12).wait(1).to({alpha:0.3594},0).wait(124).to({alpha:1},1).wait(18).to({_off:true},5).wait(748));
	this.timeline.addTween(cjs.Tween.get(instance_136Filter_7).wait(381).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(13).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 124).wait(1).to(new cjs.ColorFilter(0.19140625,0.19140625,0.19140625,1,0,0,0,0), 17).wait(1).to(new cjs.ColorFilter(0.140625,0.140625,0.140625,1,0,0,0,0), 0).wait(748));

	// Masked_Layer_185___3
	this.instance_137 = new lib.sprite60();
	this.instance_137.setTransform(-203.55,111.35);
	this.instance_137.alpha = 0;
	this.instance_137._off = true;
	var instance_137Filter_8 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_137.filters = [instance_137Filter_8];
	this.instance_137.cache(-47,-29,95,59);

	var maskedShapeInstanceList = [this.instance_137];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_9;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_137).wait(380).to({_off:false},0).to({alpha:0.0195},1).to({alpha:0.3281},12).wait(1).to({alpha:0.3594},0).wait(124).to({alpha:1},1).wait(18).to({_off:true},5).wait(748));
	this.timeline.addTween(cjs.Tween.get(instance_137Filter_8).wait(381).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(13).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 124).wait(1).to(new cjs.ColorFilter(0.19140625,0.19140625,0.19140625,1,0,0,0,0), 17).wait(1).to(new cjs.ColorFilter(0.140625,0.140625,0.140625,1,0,0,0,0), 0).wait(748));

	// Masked_Layer_180___3
	this.instance_138 = new lib.sprite60();
	this.instance_138.setTransform(-92.8,130.55);
	this.instance_138.alpha = 0.0195;
	this.instance_138._off = true;
	var instance_138Filter_9 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_138.filters = [instance_138Filter_9];
	this.instance_138.cache(-47,-29,95,59);

	var maskedShapeInstanceList = [this.instance_138];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_9;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_138).wait(371).to({_off:false},0).to({alpha:0.1211},4).to({alpha:0.3281},9).wait(1).to({alpha:0.3594},0).wait(133).to({alpha:1},1).wait(18).to({_off:true},5).wait(748));
	this.timeline.addTween(cjs.Tween.get(instance_138Filter_9).wait(371).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 4).wait(10).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 133).wait(1).to(new cjs.ColorFilter(0.19140625,0.19140625,0.19140625,1,0,0,0,0), 17).wait(1).to(new cjs.ColorFilter(0.140625,0.140625,0.140625,1,0,0,0,0), 0).wait(748));

	// Masked_Layer_175___3
	this.instance_139 = new lib.sprite60();
	this.instance_139.setTransform(-203.55,130.55);
	this.instance_139.alpha = 0.0195;
	this.instance_139._off = true;
	var instance_139Filter_10 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_139.filters = [instance_139Filter_10];
	this.instance_139.cache(-47,-29,95,59);

	var maskedShapeInstanceList = [this.instance_139];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_9;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_139).wait(371).to({_off:false},0).to({alpha:0.1211},4).to({alpha:0.3281},9).wait(1).to({alpha:0.3594},0).wait(133).to({alpha:1},1).wait(18).to({_off:true},5).wait(748));
	this.timeline.addTween(cjs.Tween.get(instance_139Filter_10).wait(371).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 4).wait(10).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 133).wait(1).to(new cjs.ColorFilter(0.19140625,0.19140625,0.19140625,1,0,0,0,0), 17).wait(1).to(new cjs.ColorFilter(0.140625,0.140625,0.140625,1,0,0,0,0), 0).wait(748));

	// Masked_Layer_170___3
	this.instance_140 = new lib.sprite60();
	this.instance_140.setTransform(-92.8,149.75);
	this.instance_140.alpha = 0;
	this.instance_140._off = true;
	var instance_140Filter_11 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_140.filters = [instance_140Filter_11];
	this.instance_140.cache(-47,-29,95,59);

	var maskedShapeInstanceList = [this.instance_140];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_9;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_140).wait(365).to({_off:false},0).to({alpha:0.0195},1).to({alpha:0.3281},12).wait(1).to({alpha:0.3594},0).wait(139).to({alpha:1},1).wait(18).to({_off:true},5).wait(748));
	this.timeline.addTween(cjs.Tween.get(instance_140Filter_11).wait(366).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(13).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 139).wait(1).to(new cjs.ColorFilter(0.19140625,0.19140625,0.19140625,1,0,0,0,0), 17).wait(1).to(new cjs.ColorFilter(0.140625,0.140625,0.140625,1,0,0,0,0), 0).wait(748));

	// Masked_Layer_165___3
	this.instance_141 = new lib.sprite60();
	this.instance_141.setTransform(-203.55,149.75);
	this.instance_141.alpha = 0;
	this.instance_141._off = true;
	var instance_141Filter_12 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_141.filters = [instance_141Filter_12];
	this.instance_141.cache(-47,-29,95,59);

	var maskedShapeInstanceList = [this.instance_141];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_9;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_141).wait(365).to({_off:false},0).to({alpha:0.0195},1).to({alpha:0.3281},12).wait(1).to({alpha:0.3594},0).wait(139).to({alpha:1},1).wait(18).to({_off:true},5).wait(748));
	this.timeline.addTween(cjs.Tween.get(instance_141Filter_12).wait(366).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(13).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 139).wait(1).to(new cjs.ColorFilter(0.19140625,0.19140625,0.19140625,1,0,0,0,0), 17).wait(1).to(new cjs.ColorFilter(0.140625,0.140625,0.140625,1,0,0,0,0), 0).wait(748));

	// Masked_Layer_160___3
	this.instance_142 = new lib.sprite60();
	this.instance_142.setTransform(-92.8,168.3);
	this.instance_142.alpha = 0;
	this.instance_142._off = true;
	var instance_142Filter_13 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_142.filters = [instance_142Filter_13];
	this.instance_142.cache(-47,-29,95,59);

	var maskedShapeInstanceList = [this.instance_142];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_9;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_142).wait(357).to({_off:false},0).to({alpha:0.0195},1).to({alpha:0.3281},12).wait(1).to({alpha:0.3594},0).wait(147).to({alpha:1},1).wait(18).to({_off:true},5).wait(748));
	this.timeline.addTween(cjs.Tween.get(instance_142Filter_13).wait(358).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(13).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 147).wait(1).to(new cjs.ColorFilter(0.19140625,0.19140625,0.19140625,1,0,0,0,0), 17).wait(1).to(new cjs.ColorFilter(0.140625,0.140625,0.140625,1,0,0,0,0), 0).wait(748));

	// Masked_Layer_155___3
	this.instance_143 = new lib.sprite60();
	this.instance_143.setTransform(-203.55,168.3);
	this.instance_143.alpha = 0;
	this.instance_143._off = true;
	var instance_143Filter_14 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_143.filters = [instance_143Filter_14];
	this.instance_143.cache(-47,-29,95,59);

	var maskedShapeInstanceList = [this.instance_143];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_9;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_143).wait(357).to({_off:false},0).to({alpha:0.0195},1).to({alpha:0.3281},12).wait(1).to({alpha:0.3594},0).wait(147).to({alpha:1},1).wait(18).to({_off:true},5).wait(748));
	this.timeline.addTween(cjs.Tween.get(instance_143Filter_14).wait(358).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(13).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 147).wait(1).to(new cjs.ColorFilter(0.19140625,0.19140625,0.19140625,1,0,0,0,0), 17).wait(1).to(new cjs.ColorFilter(0.140625,0.140625,0.140625,1,0,0,0,0), 0).wait(748));

	// Masked_Layer_150___3
	this.instance_144 = new lib.sprite60();
	this.instance_144.setTransform(-203.55,187.5);
	this.instance_144.alpha = 0;
	this.instance_144._off = true;
	var instance_144Filter_15 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_144.filters = [instance_144Filter_15];
	this.instance_144.cache(-47,-29,95,59);

	var maskedShapeInstanceList = [this.instance_144];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_9;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_144).wait(351).to({_off:false},0).to({alpha:0.0195},1).to({alpha:0.3281},12).wait(1).to({alpha:0.3594},0).wait(153).to({alpha:1},1).wait(18).to({_off:true},5).wait(748));
	this.timeline.addTween(cjs.Tween.get(instance_144Filter_15).wait(352).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(13).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 153).wait(1).to(new cjs.ColorFilter(0.19140625,0.19140625,0.19140625,1,0,0,0,0), 17).wait(1).to(new cjs.ColorFilter(0.140625,0.140625,0.140625,1,0,0,0,0), 0).wait(748));

	// Masked_Layer_145___3
	this.instance_145 = new lib.sprite60();
	this.instance_145.setTransform(-203.55,205.75);
	this.instance_145.alpha = 0;
	this.instance_145._off = true;
	var instance_145Filter_16 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_145.filters = [instance_145Filter_16];
	this.instance_145.cache(-47,-29,95,59);

	var maskedShapeInstanceList = [this.instance_145];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_9;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_145).wait(343).to({_off:false},0).to({alpha:0.0195},1).to({alpha:0.3281},12).wait(1).to({alpha:0.3594},0).wait(161).to({alpha:1},1).wait(18).to({_off:true},5).wait(748));
	this.timeline.addTween(cjs.Tween.get(instance_145Filter_16).wait(344).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(13).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 161).wait(1).to(new cjs.ColorFilter(0.19140625,0.19140625,0.19140625,1,0,0,0,0), 17).wait(1).to(new cjs.ColorFilter(0.140625,0.140625,0.140625,1,0,0,0,0), 0).wait(748));

	// Masked_Layer_124___3
	this.instance_146 = new lib.sprite62();
	this.instance_146.setTransform(-148.3,224.95);
	this.instance_146.alpha = 0;
	this.instance_146._off = true;
	var instance_146Filter_17 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_146.filters = [instance_146Filter_17];
	this.instance_146.cache(-106,-20,209,50);

	var maskedShapeInstanceList = [this.instance_146];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_9;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_146).wait(337).to({_off:false},0).to({alpha:0.0195},1).to({alpha:0.3281},12).wait(1).to({alpha:0.3594},0).wait(167).to({alpha:1},1).wait(18).to({_off:true},5).wait(748));
	this.timeline.addTween(cjs.Tween.get(instance_146Filter_17).wait(338).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(13).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 167).wait(1).to(new cjs.ColorFilter(0.19140625,0.19140625,0.19140625,1,0,0,0,0), 17).wait(1).to(new cjs.ColorFilter(0.140625,0.140625,0.140625,1,0,0,0,0), 0).wait(748));

	// Masked_Layer_103___3
	this.instance_147 = new lib.sprite62();
	this.instance_147.setTransform(-148.3,224.95);
	this.instance_147.alpha = 0;
	this.instance_147._off = true;
	var instance_147Filter_18 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_147.filters = [instance_147Filter_18];
	this.instance_147.cache(-106,-20,209,50);

	var maskedShapeInstanceList = [this.instance_147];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_9;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_147).wait(337).to({_off:false},0).to({alpha:0.0195},1).to({alpha:0.3281},12).wait(1).to({alpha:0.3594},0).wait(167).to({alpha:1},1).wait(18).to({_off:true},5).wait(748));
	this.timeline.addTween(cjs.Tween.get(instance_147Filter_18).wait(338).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(13).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 167).wait(1).to(new cjs.ColorFilter(0.19140625,0.19140625,0.19140625,1,0,0,0,0), 17).wait(1).to(new cjs.ColorFilter(0.140625,0.140625,0.140625,1,0,0,0,0), 0).wait(748));

	// Masked_Layer_82___3
	this.instance_148 = new lib.sprite62();
	this.instance_148.setTransform(-148.3,246.2);
	this.instance_148.alpha = 0;
	this.instance_148._off = true;
	var instance_148Filter_19 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_148.filters = [instance_148Filter_19];
	this.instance_148.cache(-106,-20,209,50);

	var maskedShapeInstanceList = [this.instance_148];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_9;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_148).wait(329).to({_off:false},0).to({alpha:0.0195},1).to({alpha:0.3281},12).wait(1).to({alpha:0.3594},0).wait(175).to({alpha:1},1).wait(18).to({_off:true},5).wait(748));
	this.timeline.addTween(cjs.Tween.get(instance_148Filter_19).wait(330).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(13).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 175).wait(1).to(new cjs.ColorFilter(0.19140625,0.19140625,0.19140625,1,0,0,0,0), 17).wait(1).to(new cjs.ColorFilter(0.140625,0.140625,0.140625,1,0,0,0,0), 0).wait(748));

	// Masked_Layer_61___3
	this.instance_149 = new lib.sprite62();
	this.instance_149.setTransform(-148.3,246.2);
	this.instance_149.alpha = 0;
	this.instance_149._off = true;
	var instance_149Filter_20 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_149.filters = [instance_149Filter_20];
	this.instance_149.cache(-106,-20,209,50);

	var maskedShapeInstanceList = [this.instance_149];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_9;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_149).wait(329).to({_off:false},0).to({alpha:0.0195},1).to({alpha:0.3281},12).wait(1).to({alpha:0.3594},0).wait(175).to({alpha:1},1).wait(18).to({_off:true},5).wait(748));
	this.timeline.addTween(cjs.Tween.get(instance_149Filter_20).wait(330).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(13).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 175).wait(1).to(new cjs.ColorFilter(0.19140625,0.19140625,0.19140625,1,0,0,0,0), 17).wait(1).to(new cjs.ColorFilter(0.140625,0.140625,0.140625,1,0,0,0,0), 0).wait(748));

	// Masked_Layer_40___3
	this.instance_150 = new lib.sprite62();
	this.instance_150.setTransform(-141.45,267.8);
	this.instance_150.alpha = 0;
	this.instance_150._off = true;
	var instance_150Filter_21 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_150.filters = [instance_150Filter_21];
	this.instance_150.cache(-106,-20,209,50);

	var maskedShapeInstanceList = [this.instance_150];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_9;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_150).wait(323).to({_off:false},0).to({alpha:0.0195},1).to({alpha:0.3281},12).wait(1).to({alpha:0.3594},0).wait(181).to({alpha:1},1).wait(18).to({_off:true},5).wait(748));
	this.timeline.addTween(cjs.Tween.get(instance_150Filter_21).wait(324).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(13).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 181).wait(1).to(new cjs.ColorFilter(0.19140625,0.19140625,0.19140625,1,0,0,0,0), 17).wait(1).to(new cjs.ColorFilter(0.140625,0.140625,0.140625,1,0,0,0,0), 0).wait(748));

	// Masked_Layer_19___3
	this.instance_151 = new lib.sprite62();
	this.instance_151.setTransform(-141.45,267.8);
	this.instance_151.alpha = 0;
	this.instance_151._off = true;
	var instance_151Filter_22 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_151.filters = [instance_151Filter_22];
	this.instance_151.cache(-106,-20,209,50);

	var maskedShapeInstanceList = [this.instance_151];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_9;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_151).wait(323).to({_off:false},0).to({alpha:0.0195},1).to({alpha:0.3281},12).wait(1).to({alpha:0.3594},0).wait(181).to({alpha:1},1).wait(18).to({_off:true},5).wait(748));
	this.timeline.addTween(cjs.Tween.get(instance_151Filter_22).wait(324).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(13).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 181).wait(1).to(new cjs.ColorFilter(0.19140625,0.19140625,0.19140625,1,0,0,0,0), 17).wait(1).to(new cjs.ColorFilter(0.140625,0.140625,0.140625,1,0,0,0,0), 0).wait(748));

	// Masked_Layer_14___3
	this.instance_152 = new lib.sprite60();
	this.instance_152.setTransform(-78.75,236.65);
	this.instance_152.alpha = 0;
	this.instance_152._off = true;
	var instance_152Filter_23 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_152.filters = [instance_152Filter_23];
	this.instance_152.cache(-47,-29,95,59);

	var maskedShapeInstanceList = [this.instance_152];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_9;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_152).wait(315).to({_off:false},0).to({x:-79.65,y:237.6,alpha:0.0195},1).to({x:-90.25,y:249.3,alpha:0.3281},12).wait(1).to({x:-91.15,y:250.25,alpha:0.3594},0).wait(189).to({alpha:1},1).wait(18).to({_off:true},5).wait(748));
	this.timeline.addTween(cjs.Tween.get(instance_152Filter_23).wait(316).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(13).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 189).wait(1).to(new cjs.ColorFilter(0.19140625,0.19140625,0.19140625,1,0,0,0,0), 17).wait(1).to(new cjs.ColorFilter(0.140625,0.140625,0.140625,1,0,0,0,0), 0).wait(748));

	// Masked_Layer_9___3
	this.instance_153 = new lib.sprite60();
	this.instance_153.setTransform(-78.75,188.65);
	this.instance_153.alpha = 0;
	this.instance_153._off = true;
	var instance_153Filter_24 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_153.filters = [instance_153Filter_24];
	this.instance_153.cache(-47,-29,95,59);

	var maskedShapeInstanceList = [this.instance_153];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_9;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_153).wait(309).to({_off:false},0).to({x:-79.65,y:191,alpha:0.0195},1).to({x:-90.25,y:219.1,alpha:0.3281},12).wait(1).to({x:-91.15,y:221.45,alpha:0.3594},0).wait(195).to({alpha:1},1).wait(18).to({_off:true},5).wait(748));
	this.timeline.addTween(cjs.Tween.get(instance_153Filter_24).wait(310).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(13).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 195).wait(1).to(new cjs.ColorFilter(0.19140625,0.19140625,0.19140625,1,0,0,0,0), 17).wait(1).to(new cjs.ColorFilter(0.140625,0.140625,0.140625,1,0,0,0,0), 0).wait(748));

	// Masked_Layer_4___3
	this.instance_154 = new lib.sprite60();
	this.instance_154.setTransform(-87.65,193.45);
	this.instance_154.alpha = 0;
	this.instance_154._off = true;
	var instance_154Filter_25 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_154.filters = [instance_154Filter_25];
	this.instance_154.cache(-47,-29,95,59);

	var maskedShapeInstanceList = [this.instance_154];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_9;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_154).wait(300).to({_off:false},0).to({alpha:0.1602},7).to({alpha:0.3281},7).wait(1).to({alpha:0.3594},0).wait(203).to({alpha:1},1).wait(18).to({_off:true},5).wait(748));
	this.timeline.addTween(cjs.Tween.get(instance_154Filter_25).wait(300).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 7).wait(8).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 203).wait(1).to(new cjs.ColorFilter(0.19140625,0.19140625,0.19140625,1,0,0,0,0), 17).wait(1).to(new cjs.ColorFilter(0.140625,0.140625,0.140625,1,0,0,0,0), 0).wait(748));

	// Mask_Layer_2 (mask)
	var mask_10 = new cjs.Shape();
	mask_10._off = true;
	var mask_10_graphics_542 = new cjs.Graphics().p("AshW+IAAiKIAAgFQiBhAgGiFQgmiSCtrmIAAAFIHk4cIAAh2IBdAAIAAggIBHAAIADgCIAAACIHYAAIAAAcIBagBIAAA6IAJAAIAAAoICpIPIFiQxIAAS8g");

	this.timeline.addTween(cjs.Tween.get(mask_10).to({graphics:null,x:0,y:0}).wait(542).to({graphics:mask_10_graphics_542,x:-154.334,y:137.825}).wait(748));

	// Masked_Layer_194___2
	this.instance_155 = new lib.sprite83();
	this.instance_155.setTransform(-148.7,215.25);
	this.instance_155.alpha = 0;
	this.instance_155._off = true;

	var maskedShapeInstanceList = [this.instance_155];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_10;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_155).wait(621).to({_off:false},0).to({alpha:0.2891},3).to({alpha:0.5},3).to({alpha:0.6289},3).to({alpha:0.6992},3).wait(657));

	// Masked_Layer_189___2
	this.instance_156 = new lib.sprite60();
	this.instance_156.setTransform(-92.8,111.35);
	this.instance_156._off = true;

	var maskedShapeInstanceList = [this.instance_156];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_10;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_156).wait(542).to({_off:false},0).to({alpha:0.5},79).to({alpha:0.3516},5).wait(1).to({alpha:0.0195},0).to({_off:true},2).wait(661));

	// Masked_Layer_184___2
	this.instance_157 = new lib.sprite60();
	this.instance_157.setTransform(-203.55,111.35);
	this.instance_157._off = true;

	var maskedShapeInstanceList = [this.instance_157];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_10;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_157).wait(542).to({_off:false},0).to({alpha:0.5},79).to({alpha:0.3516},5).wait(1).to({alpha:0.0195},0).to({_off:true},2).wait(661));

	// Masked_Layer_179___2
	this.instance_158 = new lib.sprite60();
	this.instance_158.setTransform(-92.8,130.55);
	this.instance_158._off = true;

	var maskedShapeInstanceList = [this.instance_158];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_10;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_158).wait(542).to({_off:false},0).to({alpha:0.5},79).to({alpha:0.3516},5).wait(1).to({alpha:0.0195},0).to({_off:true},2).wait(661));

	// Masked_Layer_174___2
	this.instance_159 = new lib.sprite60();
	this.instance_159.setTransform(-203.55,130.55);
	this.instance_159._off = true;

	var maskedShapeInstanceList = [this.instance_159];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_10;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_159).wait(542).to({_off:false},0).to({alpha:0.5},79).to({alpha:0.3516},5).wait(1).to({alpha:0.0195},0).to({_off:true},2).wait(661));

	// Masked_Layer_169___2
	this.instance_160 = new lib.sprite60();
	this.instance_160.setTransform(-92.8,149.75);
	this.instance_160._off = true;

	var maskedShapeInstanceList = [this.instance_160];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_10;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_160).wait(542).to({_off:false},0).to({alpha:0.5},79).to({alpha:0.3516},5).wait(1).to({alpha:0.0195},0).to({_off:true},2).wait(661));

	// Masked_Layer_164___2
	this.instance_161 = new lib.sprite60();
	this.instance_161.setTransform(-203.55,149.75);
	this.instance_161._off = true;

	var maskedShapeInstanceList = [this.instance_161];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_10;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_161).wait(542).to({_off:false},0).to({alpha:0.5},79).to({alpha:0.3516},5).wait(1).to({alpha:0.0195},0).to({_off:true},2).wait(661));

	// Masked_Layer_159___2
	this.instance_162 = new lib.sprite60();
	this.instance_162.setTransform(-92.8,168.3);
	this.instance_162._off = true;

	var maskedShapeInstanceList = [this.instance_162];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_10;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_162).wait(542).to({_off:false},0).to({alpha:0.5},79).to({alpha:0.3516},5).wait(1).to({alpha:0.0195},0).to({_off:true},2).wait(661));

	// Masked_Layer_154___2
	this.instance_163 = new lib.sprite60();
	this.instance_163.setTransform(-203.55,168.3);
	this.instance_163._off = true;

	var maskedShapeInstanceList = [this.instance_163];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_10;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_163).wait(542).to({_off:false},0).to({alpha:0.5},79).to({alpha:0.3516},5).wait(1).to({alpha:0.0195},0).to({_off:true},2).wait(661));

	// Masked_Layer_149___2
	this.instance_164 = new lib.sprite60();
	this.instance_164.setTransform(-203.55,187.5);
	this.instance_164._off = true;

	var maskedShapeInstanceList = [this.instance_164];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_10;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_164).wait(542).to({_off:false},0).to({alpha:0.5},79).to({alpha:0.3516},5).wait(1).to({alpha:0.0195},0).to({_off:true},2).wait(661));

	// Masked_Layer_144___2
	this.instance_165 = new lib.sprite60();
	this.instance_165.setTransform(-203.55,205.75);
	this.instance_165._off = true;

	var maskedShapeInstanceList = [this.instance_165];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_10;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_165).wait(542).to({_off:false},0).to({alpha:0.5},79).to({alpha:0.3516},5).wait(1).to({alpha:0.0195},0).to({_off:true},2).wait(661));

	// Masked_Layer_123___2
	this.instance_166 = new lib.sprite62();
	this.instance_166.setTransform(-148.3,224.95);
	this.instance_166._off = true;

	var maskedShapeInstanceList = [this.instance_166];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_10;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_166).wait(542).to({_off:false},0).to({alpha:0.5},79).to({alpha:0.3516},5).wait(1).to({alpha:0.0195},0).to({_off:true},2).wait(661));

	// Masked_Layer_102___2
	this.instance_167 = new lib.sprite62();
	this.instance_167.setTransform(-148.3,224.95);
	this.instance_167._off = true;

	var maskedShapeInstanceList = [this.instance_167];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_10;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_167).wait(542).to({_off:false},0).to({alpha:0.5},79).to({alpha:0.3516},5).wait(1).to({alpha:0.0195},0).to({_off:true},2).wait(661));

	// Masked_Layer_81___2
	this.instance_168 = new lib.sprite62();
	this.instance_168.setTransform(-148.3,246.2);
	this.instance_168._off = true;

	var maskedShapeInstanceList = [this.instance_168];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_10;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_168).wait(542).to({_off:false},0).to({alpha:0.5},79).to({alpha:0.3516},5).wait(1).to({alpha:0.0195},0).to({_off:true},2).wait(661));

	// Masked_Layer_60___2
	this.instance_169 = new lib.sprite62();
	this.instance_169.setTransform(-148.3,246.2);
	this.instance_169._off = true;

	var maskedShapeInstanceList = [this.instance_169];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_10;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_169).wait(542).to({_off:false},0).to({alpha:0.5},79).to({alpha:0.3516},5).wait(1).to({alpha:0.0195},0).to({_off:true},2).wait(661));

	// Masked_Layer_39___2
	this.instance_170 = new lib.sprite62();
	this.instance_170.setTransform(-141.45,267.8);
	this.instance_170._off = true;

	var maskedShapeInstanceList = [this.instance_170];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_10;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_170).wait(542).to({_off:false},0).to({alpha:0.5},79).to({alpha:0.3516},5).wait(1).to({alpha:0.0195},0).to({_off:true},2).wait(661));

	// Masked_Layer_18___2
	this.instance_171 = new lib.sprite62();
	this.instance_171.setTransform(-141.45,267.8);
	this.instance_171._off = true;

	var maskedShapeInstanceList = [this.instance_171];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_10;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_171).wait(542).to({_off:false},0).to({alpha:0.5},79).to({alpha:0.3516},5).wait(1).to({alpha:0.0195},0).to({_off:true},2).wait(661));

	// Masked_Layer_13___2
	this.instance_172 = new lib.sprite60();
	this.instance_172.setTransform(-91.15,250.25);
	this.instance_172._off = true;

	var maskedShapeInstanceList = [this.instance_172];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_10;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_172).wait(542).to({_off:false},0).to({alpha:0.5},79).to({alpha:0.3516},5).wait(1).to({alpha:0.0195},0).to({_off:true},2).wait(661));

	// Masked_Layer_8___2
	this.instance_173 = new lib.sprite60();
	this.instance_173.setTransform(-91.15,221.45);
	this.instance_173._off = true;

	var maskedShapeInstanceList = [this.instance_173];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_10;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_173).wait(542).to({_off:false},0).to({alpha:0.5},79).to({alpha:0.3516},5).wait(1).to({alpha:0.0195},0).to({_off:true},2).wait(661));

	// Masked_Layer_3___2
	this.instance_174 = new lib.sprite60();
	this.instance_174.setTransform(-87.65,193.45);
	this.instance_174._off = true;

	var maskedShapeInstanceList = [this.instance_174];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_10;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_174).wait(542).to({_off:false},0).to({alpha:0.5},79).to({alpha:0.3516},5).wait(1).to({alpha:0.0195},0).to({_off:true},2).wait(661));

	// Layer_2
	this.instance_175 = new lib.shape2("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_175).to({_off:true},519).wait(771));

	// Layer_1
	this.instance_176 = new lib.shape72("synched",0);

	this.instance_177 = new lib.shape81("synched",0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_176}]},519).to({state:[{t:this.instance_177}]},23).wait(748));

	this.filterCacheList = [];
	this.filterCacheList.push({instance: this.instance_67, startFrame:188, endFrame:188, x:-32, y:-10, w:63, h:60});
	this.filterCacheList.push({instance: this.instance_67, startFrame:289, endFrame:289, x:-32, y:-10, w:63, h:60});
	this.filterCacheList.push({instance: this.instance_67, startFrame:389, endFrame:389, x:-32, y:-10, w:63, h:60});
	this.filterCacheList.push({instance: this.instance_68, startFrame:198, endFrame:198, x:-39, y:-4, w:75, h:60});
	this.filterCacheList.push({instance: this.instance_68, startFrame:237, endFrame:237, x:-39, y:-4, w:75, h:60});
	this.filterCacheList.push({instance: this.instance_68, startFrame:299, endFrame:299, x:-39, y:-4, w:75, h:60});
	this.filterCacheList.push({instance: this.instance_68, startFrame:337, endFrame:337, x:-39, y:-4, w:75, h:60});
	this.filterCacheList.push({instance: this.instance_68, startFrame:399, endFrame:399, x:-39, y:-4, w:75, h:60});
	this.filterCacheList.push({instance: this.instance_68, startFrame:437, endFrame:437, x:-39, y:-4, w:75, h:60});
	this.filterCacheList.push({instance: this.instance_90, startFrame:155, endFrame:155, x:-24, y:-26, w:49, h:53});
	this.filterCacheList.push({instance: this.instance_90, startFrame:254, endFrame:254, x:-24, y:-26, w:49, h:53});
	this.filterCacheList.push({instance: this.instance_90, startFrame:355, endFrame:355, x:-24, y:-26, w:49, h:53});
	this.filterCacheList.push({instance: this.instance_90, startFrame:455, endFrame:455, x:-24, y:-26, w:49, h:53});
	this.filterCacheList.push({instance: this.instance_91, startFrame:165, endFrame:165, x:-32, y:-10, w:63, h:60});
	this.filterCacheList.push({instance: this.instance_91, startFrame:264, endFrame:264, x:-32, y:-10, w:63, h:60});
	this.filterCacheList.push({instance: this.instance_91, startFrame:365, endFrame:365, x:-32, y:-10, w:63, h:60});
	this.filterCacheList.push({instance: this.instance_91, startFrame:465, endFrame:465, x:-32, y:-10, w:63, h:60});
	this.filterCacheList.push({instance: this.instance_91, startFrame:489, endFrame:489, x:-32, y:-10, w:63, h:60});
	this.filterCacheList.push({instance: this.instance_92, startFrame:175, endFrame:175, x:-39, y:-4, w:75, h:60});
	this.filterCacheList.push({instance: this.instance_92, startFrame:274, endFrame:274, x:-39, y:-4, w:75, h:60});
	this.filterCacheList.push({instance: this.instance_92, startFrame:375, endFrame:375, x:-39, y:-4, w:75, h:60});
	this.filterCacheList.push({instance: this.instance_92, startFrame:475, endFrame:475, x:-39, y:-4, w:75, h:60});
	this.filterCacheList.push({instance: this.instance_120, startFrame:297, endFrame:297, x:-25, y:-24, w:95, h:56});
	this.filterCacheList.push({instance: this.instance_120, startFrame:298, endFrame:298, x:-25, y:-24, w:95, h:56});
	this.filterCacheList.push({instance: this.instance_120, startFrame:307, endFrame:307, x:-25, y:-24, w:95, h:56});
	this.filterCacheList.push({instance: this.instance_120, startFrame:308, endFrame:317, x:-25, y:-24, w:95, h:56});
	this.filterCacheList.push({instance: this.instance_120, startFrame:318, endFrame:318, x:-25, y:-24, w:95, h:56});
	this.filterCacheList.push({instance: this.instance_120, startFrame:319, endFrame:326, x:-25, y:-24, w:95, h:56});
	this.filterCacheList.push({instance: this.instance_120, startFrame:327, endFrame:327, x:-25, y:-24, w:95, h:56});
	this.filterCacheList.push({instance: this.instance_120, startFrame:328, endFrame:337, x:-25, y:-24, w:95, h:56});
	this.filterCacheList.push({instance: this.instance_120, startFrame:338, endFrame:338, x:-25, y:-24, w:95, h:56});
	this.filterCacheList.push({instance: this.instance_120, startFrame:339, endFrame:346, x:-25, y:-24, w:95, h:56});
	this.filterCacheList.push({instance: this.instance_120, startFrame:347, endFrame:347, x:-25, y:-24, w:95, h:56});
	this.filterCacheList.push({instance: this.instance_120, startFrame:348, endFrame:357, x:-25, y:-24, w:95, h:56});
	this.filterCacheList.push({instance: this.instance_120, startFrame:358, endFrame:358, x:-25, y:-24, w:95, h:56});
	this.filterCacheList.push({instance: this.instance_120, startFrame:359, endFrame:366, x:-25, y:-24, w:95, h:56});
	this.filterCacheList.push({instance: this.instance_120, startFrame:508, endFrame:517, x:-25, y:-24, w:95, h:56});
	this.filterCacheList.push({instance: this.instance_120, startFrame:518, endFrame:518, x:-25, y:-24, w:95, h:56});
	this.filterCacheList.push({instance: this.instance_136, startFrame:380, endFrame:380, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_136, startFrame:381, endFrame:381, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_136, startFrame:394, endFrame:394, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_136, startFrame:395, endFrame:518, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_136, startFrame:519, endFrame:519, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_136, startFrame:520, endFrame:536, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_136, startFrame:537, endFrame:537, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_137, startFrame:380, endFrame:380, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_137, startFrame:381, endFrame:381, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_137, startFrame:394, endFrame:394, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_137, startFrame:395, endFrame:518, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_137, startFrame:519, endFrame:519, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_137, startFrame:520, endFrame:536, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_137, startFrame:537, endFrame:537, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_138, startFrame:371, endFrame:371, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_138, startFrame:372, endFrame:375, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_138, startFrame:385, endFrame:385, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_138, startFrame:386, endFrame:518, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_138, startFrame:519, endFrame:519, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_138, startFrame:520, endFrame:536, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_138, startFrame:537, endFrame:537, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_139, startFrame:371, endFrame:371, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_139, startFrame:372, endFrame:375, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_139, startFrame:385, endFrame:385, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_139, startFrame:386, endFrame:518, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_139, startFrame:519, endFrame:519, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_139, startFrame:520, endFrame:536, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_139, startFrame:537, endFrame:537, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_140, startFrame:365, endFrame:365, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_140, startFrame:366, endFrame:366, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_140, startFrame:379, endFrame:379, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_140, startFrame:380, endFrame:518, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_140, startFrame:519, endFrame:519, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_140, startFrame:520, endFrame:536, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_140, startFrame:537, endFrame:537, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_141, startFrame:365, endFrame:365, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_141, startFrame:366, endFrame:366, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_141, startFrame:379, endFrame:379, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_141, startFrame:380, endFrame:518, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_141, startFrame:519, endFrame:519, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_141, startFrame:520, endFrame:536, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_141, startFrame:537, endFrame:537, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_142, startFrame:357, endFrame:357, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_142, startFrame:358, endFrame:358, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_142, startFrame:371, endFrame:371, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_142, startFrame:372, endFrame:518, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_142, startFrame:519, endFrame:519, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_142, startFrame:520, endFrame:536, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_142, startFrame:537, endFrame:537, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_143, startFrame:357, endFrame:357, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_143, startFrame:358, endFrame:358, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_143, startFrame:371, endFrame:371, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_143, startFrame:372, endFrame:518, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_143, startFrame:519, endFrame:519, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_143, startFrame:520, endFrame:536, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_143, startFrame:537, endFrame:537, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_144, startFrame:351, endFrame:351, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_144, startFrame:352, endFrame:352, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_144, startFrame:365, endFrame:365, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_144, startFrame:366, endFrame:518, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_144, startFrame:519, endFrame:519, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_144, startFrame:520, endFrame:536, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_144, startFrame:537, endFrame:537, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_145, startFrame:343, endFrame:343, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_145, startFrame:344, endFrame:344, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_145, startFrame:357, endFrame:357, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_145, startFrame:358, endFrame:518, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_145, startFrame:519, endFrame:519, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_145, startFrame:520, endFrame:536, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_145, startFrame:537, endFrame:537, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_146, startFrame:337, endFrame:337, x:-106, y:-20, w:209, h:50});
	this.filterCacheList.push({instance: this.instance_146, startFrame:338, endFrame:338, x:-106, y:-20, w:209, h:50});
	this.filterCacheList.push({instance: this.instance_146, startFrame:351, endFrame:351, x:-106, y:-20, w:209, h:50});
	this.filterCacheList.push({instance: this.instance_146, startFrame:352, endFrame:518, x:-106, y:-20, w:209, h:50});
	this.filterCacheList.push({instance: this.instance_146, startFrame:519, endFrame:519, x:-106, y:-20, w:209, h:50});
	this.filterCacheList.push({instance: this.instance_146, startFrame:520, endFrame:536, x:-106, y:-20, w:209, h:50});
	this.filterCacheList.push({instance: this.instance_146, startFrame:537, endFrame:537, x:-106, y:-20, w:209, h:50});
	this.filterCacheList.push({instance: this.instance_147, startFrame:337, endFrame:337, x:-106, y:-20, w:209, h:50});
	this.filterCacheList.push({instance: this.instance_147, startFrame:338, endFrame:338, x:-106, y:-20, w:209, h:50});
	this.filterCacheList.push({instance: this.instance_147, startFrame:351, endFrame:351, x:-106, y:-20, w:209, h:50});
	this.filterCacheList.push({instance: this.instance_147, startFrame:352, endFrame:518, x:-106, y:-20, w:209, h:50});
	this.filterCacheList.push({instance: this.instance_147, startFrame:519, endFrame:519, x:-106, y:-20, w:209, h:50});
	this.filterCacheList.push({instance: this.instance_147, startFrame:520, endFrame:536, x:-106, y:-20, w:209, h:50});
	this.filterCacheList.push({instance: this.instance_147, startFrame:537, endFrame:537, x:-106, y:-20, w:209, h:50});
	this.filterCacheList.push({instance: this.instance_148, startFrame:329, endFrame:329, x:-106, y:-20, w:209, h:50});
	this.filterCacheList.push({instance: this.instance_148, startFrame:330, endFrame:330, x:-106, y:-20, w:209, h:50});
	this.filterCacheList.push({instance: this.instance_148, startFrame:343, endFrame:343, x:-106, y:-20, w:209, h:50});
	this.filterCacheList.push({instance: this.instance_148, startFrame:344, endFrame:518, x:-106, y:-20, w:209, h:50});
	this.filterCacheList.push({instance: this.instance_148, startFrame:519, endFrame:519, x:-106, y:-20, w:209, h:50});
	this.filterCacheList.push({instance: this.instance_148, startFrame:520, endFrame:536, x:-106, y:-20, w:209, h:50});
	this.filterCacheList.push({instance: this.instance_148, startFrame:537, endFrame:537, x:-106, y:-20, w:209, h:50});
	this.filterCacheList.push({instance: this.instance_149, startFrame:329, endFrame:329, x:-106, y:-20, w:209, h:50});
	this.filterCacheList.push({instance: this.instance_149, startFrame:330, endFrame:330, x:-106, y:-20, w:209, h:50});
	this.filterCacheList.push({instance: this.instance_149, startFrame:343, endFrame:343, x:-106, y:-20, w:209, h:50});
	this.filterCacheList.push({instance: this.instance_149, startFrame:344, endFrame:518, x:-106, y:-20, w:209, h:50});
	this.filterCacheList.push({instance: this.instance_149, startFrame:519, endFrame:519, x:-106, y:-20, w:209, h:50});
	this.filterCacheList.push({instance: this.instance_149, startFrame:520, endFrame:536, x:-106, y:-20, w:209, h:50});
	this.filterCacheList.push({instance: this.instance_149, startFrame:537, endFrame:537, x:-106, y:-20, w:209, h:50});
	this.filterCacheList.push({instance: this.instance_150, startFrame:323, endFrame:323, x:-106, y:-20, w:209, h:50});
	this.filterCacheList.push({instance: this.instance_150, startFrame:324, endFrame:324, x:-106, y:-20, w:209, h:50});
	this.filterCacheList.push({instance: this.instance_150, startFrame:337, endFrame:337, x:-106, y:-20, w:209, h:50});
	this.filterCacheList.push({instance: this.instance_150, startFrame:338, endFrame:518, x:-106, y:-20, w:209, h:50});
	this.filterCacheList.push({instance: this.instance_150, startFrame:519, endFrame:519, x:-106, y:-20, w:209, h:50});
	this.filterCacheList.push({instance: this.instance_150, startFrame:520, endFrame:536, x:-106, y:-20, w:209, h:50});
	this.filterCacheList.push({instance: this.instance_150, startFrame:537, endFrame:537, x:-106, y:-20, w:209, h:50});
	this.filterCacheList.push({instance: this.instance_151, startFrame:323, endFrame:323, x:-106, y:-20, w:209, h:50});
	this.filterCacheList.push({instance: this.instance_151, startFrame:324, endFrame:324, x:-106, y:-20, w:209, h:50});
	this.filterCacheList.push({instance: this.instance_151, startFrame:337, endFrame:337, x:-106, y:-20, w:209, h:50});
	this.filterCacheList.push({instance: this.instance_151, startFrame:338, endFrame:518, x:-106, y:-20, w:209, h:50});
	this.filterCacheList.push({instance: this.instance_151, startFrame:519, endFrame:519, x:-106, y:-20, w:209, h:50});
	this.filterCacheList.push({instance: this.instance_151, startFrame:520, endFrame:536, x:-106, y:-20, w:209, h:50});
	this.filterCacheList.push({instance: this.instance_151, startFrame:537, endFrame:537, x:-106, y:-20, w:209, h:50});
	this.filterCacheList.push({instance: this.instance_152, startFrame:315, endFrame:315, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_152, startFrame:316, endFrame:316, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_152, startFrame:329, endFrame:329, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_152, startFrame:330, endFrame:518, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_152, startFrame:519, endFrame:519, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_152, startFrame:520, endFrame:536, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_152, startFrame:537, endFrame:537, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_153, startFrame:309, endFrame:309, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_153, startFrame:310, endFrame:310, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_153, startFrame:323, endFrame:323, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_153, startFrame:324, endFrame:518, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_153, startFrame:519, endFrame:519, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_153, startFrame:520, endFrame:536, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_153, startFrame:537, endFrame:537, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_154, startFrame:300, endFrame:300, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_154, startFrame:301, endFrame:307, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_154, startFrame:315, endFrame:315, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_154, startFrame:316, endFrame:518, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_154, startFrame:519, endFrame:519, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_154, startFrame:520, endFrame:536, x:-47, y:-29, w:95, h:59});
	this.filterCacheList.push({instance: this.instance_154, startFrame:537, endFrame:537, x:-47, y:-29, w:95, h:59});
	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1327.9,-238.5,1284,568.6);


// stage content:
(lib.vital_acc_ce = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {p1:0,p2:1290};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,1,1288,1289,1290,1291,2424];
	this.streamSoundSymbolsList[1] = [{id:"vital_acc_ce1",startFrame:1,endFrame:1289,loop:1,offset:0}];
	this.streamSoundSymbolsList[1291] = [{id:"vital_acc_ce2",startFrame:1291,endFrame:2424,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		InitPage(2);
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
		var soundInstance = playSound("vital_acc_ce1",0);
		this.InsertIntoSoundStreamData(soundInstance,1,1289,1);
	}
	this.frame_1288 = function() {
		this.stop();
	}
	this.frame_1289 = function() {
		this.stop();
	}
	this.frame_1290 = function() {
		Prev(1);
		Next(0);
		InitAnim();
	}
	this.frame_1291 = function() {
		var soundInstance = playSound("vital_acc_ce2",0);
		this.InsertIntoSoundStreamData(soundInstance,1291,2424,1);
	}
	this.frame_2424 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1287).call(this.frame_1288).wait(1).call(this.frame_1289).wait(1).call(this.frame_1290).wait(1).call(this.frame_1291).wait(1133).call(this.frame_2424).wait(1));

	// Layer_377
	this.instance = new lib.text88("synched",0);
	this.instance.setTransform(35.3,46.05,1.3957,1.3948);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2425));

	// Layer_376
	this.instance_1 = new lib.shape87("synched",0);
	this.instance_1.setTransform(13,2.7,1.3948,1.3948);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(2425));

	// Layer_375
	this.instance_2 = new lib.text86("synched",0);
	this.instance_2.setTransform(10,0,1.3948,1.3948);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(2425));

	// Layer_back
	this.back = new lib.buttonbak();
	this.back.name = "back";
	this.back.setTransform(350,645,1.0001,1.0002);
	new cjs.ButtonHelper(this.back, 0, 1, 2, false, new lib.buttonbak(), 3);

	this.timeline.addTween(cjs.Tween.get(this.back).wait(2425));

	// Layer_page
	this.page = new cjs.Text("Page number", "italic bold 15px 'Arial'", "#FF9900");
	this.page.name = "page";
	this.page.lineHeight = 17;
	this.page.lineWidth = 193;
	this.page.parent = this;
	this.page.setTransform(23,658,1.4989,1.4989);

	this.timeline.addTween(cjs.Tween.get(this.page).wait(2425));

	// Layer_next
	this.next = new lib.buttonnext();
	this.next.name = "next";
	this.next.setTransform(1496.1,5.1,0.9998,0.9999,0,0,0,0.1,0.1);
	new cjs.ButtonHelper(this.next, 0, 1, 2, false, new lib.buttonnext(), 3);

	this.timeline.addTween(cjs.Tween.get(this.next).wait(2425));

	// Layer_previous
	this.previous = new lib.buttonprev();
	this.previous.name = "previous";
	this.previous.setTransform(1432,5,1.0003,0.9993);
	new cjs.ButtonHelper(this.previous, 0, 1, 2, false, new lib.buttonprev(), 3);

	this.timeline.addTween(cjs.Tween.get(this.previous).wait(2425));

	// Layer_slider
	this.slider = new lib.sprite_slider();
	this.slider.name = "slider";
	this.slider.setTransform(610.1,670.1,0.9937,0.9983,0,0,0,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.slider).wait(2425));

	// Layer_replay
	this.replay = new lib.sprite_replay();
	this.replay.name = "replay";
	this.replay.setTransform(1045.1,650.1,0.9999,0.9999,0,0,0,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.replay).wait(2425));

	// Layer_slider_base
	this.instance_3 = new lib.sprite_sliderbase();
	this.instance_3.setTransform(600,650,1,0.9999);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(2425));

	// Layer_playpau
	this.playpau = new lib.sprite_playpau();
	this.playpau.name = "playpau";
	this.playpau.setTransform(555,650,0.9999,0.9999);

	this.timeline.addTween(cjs.Tween.get(this.playpau).wait(2425));

	// Mask_Layer_1 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("Eh8/AyyMAAAhfTMD5/AAAMAAABfTg");
	mask.setTransform(800,325);

	// Masked_Layer_2___1
	this.ani1 = new lib.sprite84();
	this.ani1.name = "ani1";
	this.ani1.setTransform(1294,301.1,0.9454,0.9454);

	this.ani2 = new lib.sprite152();
	this.ani2.name = "ani2";
	this.ani2.setTransform(1135,351.55,1.3948,1.3948);

	var maskedShapeInstanceList = [this.ani1,this.ani2];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.ani1}]}).to({state:[{t:this.ani2}]},1290).wait(1135));
	this.ani1.addEventListener("tick", AdobeAn.handleFilterCache);

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
		{src:"images/vital_acc_ce_atlas_1.png", id:"vital_acc_ce_atlas_1"},
		{src:"images/vital_acc_ce_atlas_2.png", id:"vital_acc_ce_atlas_2"},
		{src:"sounds/vital_acc_ce1.mp3", id:"vital_acc_ce1"},
		{src:"sounds/vital_acc_ce2.mp3", id:"vital_acc_ce2"}
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