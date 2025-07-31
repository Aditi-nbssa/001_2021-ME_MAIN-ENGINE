(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"vital_acc_ssf_atlas_1", frames: [[0,576,1160,261],[0,0,1160,311],[0,313,1185,261],[1792,117,212,89],[1488,310,415,89],[0,1554,1528,76],[1521,0,354,115],[0,1632,1009,111],[0,1052,1160,161],[0,1328,1151,111],[1162,1052,818,111],[1169,1165,583,111],[0,1215,1167,111],[0,839,1169,211],[0,1441,1148,111],[1187,0,332,153],[1162,155,273,104],[1187,261,258,104],[1488,155,302,153],[1171,576,315,202],[1171,780,426,123],[1792,254,235,37],[1792,208,212,44],[1488,461,406,32],[1488,401,371,58],[1906,355,7,485],[1896,401,8,464],[1877,0,113,53],[1905,293,60,60],[1187,367,276,53]]}
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



(lib.CachedBmp_672 = function() {
	this.initialize(ss["vital_acc_ssf_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_671 = function() {
	this.initialize(ss["vital_acc_ssf_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_670 = function() {
	this.initialize(ss["vital_acc_ssf_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_669 = function() {
	this.initialize(ss["vital_acc_ssf_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_668 = function() {
	this.initialize(ss["vital_acc_ssf_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_667 = function() {
	this.initialize(ss["vital_acc_ssf_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_666 = function() {
	this.initialize(ss["vital_acc_ssf_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_665 = function() {
	this.initialize(ss["vital_acc_ssf_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_664 = function() {
	this.initialize(ss["vital_acc_ssf_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_663 = function() {
	this.initialize(ss["vital_acc_ssf_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_662 = function() {
	this.initialize(ss["vital_acc_ssf_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_661 = function() {
	this.initialize(ss["vital_acc_ssf_atlas_1"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_660 = function() {
	this.initialize(ss["vital_acc_ssf_atlas_1"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_659 = function() {
	this.initialize(ss["vital_acc_ssf_atlas_1"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_658 = function() {
	this.initialize(ss["vital_acc_ssf_atlas_1"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_657 = function() {
	this.initialize(ss["vital_acc_ssf_atlas_1"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_656 = function() {
	this.initialize(ss["vital_acc_ssf_atlas_1"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_655 = function() {
	this.initialize(ss["vital_acc_ssf_atlas_1"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_654 = function() {
	this.initialize(ss["vital_acc_ssf_atlas_1"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_653 = function() {
	this.initialize(ss["vital_acc_ssf_atlas_1"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_652 = function() {
	this.initialize(ss["vital_acc_ssf_atlas_1"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_651 = function() {
	this.initialize(ss["vital_acc_ssf_atlas_1"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_650 = function() {
	this.initialize(ss["vital_acc_ssf_atlas_1"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_649 = function() {
	this.initialize(ss["vital_acc_ssf_atlas_1"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_648 = function() {
	this.initialize(ss["vital_acc_ssf_atlas_1"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_647 = function() {
	this.initialize(ss["vital_acc_ssf_atlas_1"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_646 = function() {
	this.initialize(ss["vital_acc_ssf_atlas_1"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_645 = function() {
	this.initialize(ss["vital_acc_ssf_atlas_1"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_644 = function() {
	this.initialize(ss["vital_acc_ssf_atlas_1"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_643 = function() {
	this.initialize(ss["vital_acc_ssf_atlas_1"]);
	this.gotoAndStop(29);
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
	this.instance = new lib.CachedBmp_672();
	this.instance.setTransform(-3.95,-3.4,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,415.79999999999995,93.60000000000001);


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
	this.instance = new lib.CachedBmp_671();
	this.instance.setTransform(-3.95,-3.4,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,415.79999999999995,111.5);


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
	this.instance = new lib.CachedBmp_670();
	this.instance.setTransform(-3.95,-3.4,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,424.7,93.60000000000001);


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
	this.instance = new lib.CachedBmp_669();
	this.instance.setTransform(-4,-3.65,0.3728,0.3728);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.6,79.1,33.2);


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
	this.instance = new lib.CachedBmp_668();
	this.instance.setTransform(-4,-3.65,0.3728,0.3728);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.6,154.8,33.2);


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
	this.instance = new lib.CachedBmp_667();
	this.instance.setTransform(0,0,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,547.8,27.3);


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
	this.instance = new lib.CachedBmp_666();
	this.instance.setTransform(-3.95,-3.75,0.3582,0.3582);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,126.80000000000001,41.2);


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
	this.instance = new lib.CachedBmp_665();
	this.instance.setTransform(-3.95,-3.4,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,361.7,39.8);


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
	this.instance = new lib.CachedBmp_664();
	this.instance.setTransform(-3.95,-3.4,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,415.79999999999995,57.699999999999996);


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
	this.instance = new lib.CachedBmp_663();
	this.instance.setTransform(-3.95,-3.4,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,412.59999999999997,39.8);


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
	this.instance = new lib.CachedBmp_662();
	this.instance.setTransform(-3.95,-3.4,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,293.2,39.8);


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
	this.instance = new lib.CachedBmp_661();
	this.instance.setTransform(-3.95,-3.4,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,209,39.8);


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
	this.instance = new lib.CachedBmp_660();
	this.instance.setTransform(-3.95,-3.4,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,418.29999999999995,39.8);


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
	this.instance = new lib.CachedBmp_659();
	this.instance.setTransform(-3.95,-3.4,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,419,75.7);


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
	this.instance = new lib.CachedBmp_658();
	this.instance.setTransform(-3.95,-3.4,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.4,411.5,39.8);


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
	this.instance = new lib.CachedBmp_657();
	this.instance.setTransform(-49.8,-3.6,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-49.8,-3.6,119,54.9);


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
	this.instance = new lib.CachedBmp_656();
	this.instance.setTransform(2.15,-2.6,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(2.2,-2.6,97.8,37.300000000000004);


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
	this.instance = new lib.CachedBmp_655();
	this.instance.setTransform(14.7,-3.6,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(14.7,-3.6,92.5,37.300000000000004);


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
	this.instance = new lib.CachedBmp_654();
	this.instance.setTransform(-20.95,-3.6,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20.9,-3.6,108.19999999999999,54.9);


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
	this.instance = new lib.CachedBmp_653();
	this.instance.setTransform(1,-3.6,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(1,-3.6,112.9,72.39999999999999);


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
	this.instance = new lib.CachedBmp_652();
	this.instance.setTransform(-3.95,-4.15,0.3585,0.3585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-4.1,152.70000000000002,44.1);


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
	this.shape.graphics.rf(["#FFFF00","#FF6600"],[0,1],-3.8,1.7,0,-3.8,1.7,13.6).s().p("AgzBLIgrgjIgBgoIAKAAIAAgJIAaAAIAAgHIASAAIAFgSIAQAAIAAgoIAWAAIAAAJIAKAAIAAAQIAFAAIAAAQIALAAIAAgWIAJAAIAAAVIAMAAIAAAKIARAAIAAAaIAeAAIAAAcIgOAPIgyAeg");
	this.shape.setTransform(0.025,-0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.6,-7.5,19.299999999999997,15);


(lib.shape165 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(0.3,0,0,3).p("AAbgTQgQAIgEgCQgEgBgDgSQgEASgDABQgDACgRgHQAMAOgBAEQgBACgQAIIAUADQADADgEARQALgOADAAQAEAAALAOQgEgRACgDIAUgDQgQgIAAgDQgBgEALgOg");
	this.shape.setTransform(0.0011,-0.035);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.rf(["#FFFF00","#FF6600"],[0,1],0.1,0.2,0,0.1,0.2,3.6).s().p("AAAATQgDAAgLAOQAEgRgDgDIgTgDQAPgIABgDQABgEgMgOQARAIAEgCQACgBAEgSQAEASADABQAEACAQgIQgLAOABAEQABACAPAJIgTADQgDADAEARQgLgOgEAAg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4.3,-4.3,8.7,8.6);


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
	this.shape.graphics.f().s("#000000").ss(0.3,0,0,3).p("AASgSQgEgEABgYQgMAWgEABQgGABgTgQQALAWgDAGQgCAFgZAFQAYAFADAFQACAFgLAWQATgPAGABQAEABALAXQAAgZAEgDIAdADQgTgRAAgFQAAgFAUgPg");
	this.shape.setTransform(1.3899,0.8303);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.rf(["#FFFF00","#FF6600"],[0,1],0.4,0,0,0.4,0,5.1).s().p("AgDAXQgFgBgUAPQALgWgCgFQgCgFgYgFQAYgFADgFQACgGgKgWQATAQAFgBQAFgBALgWQgBAYAFAEIAcgCQgUAPABAFQgBAFATARIgcgDQgFADAAAZQgKgXgFgBg");
	this.shape_1.setTransform(1.425,0.825);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4.2,-4.9,11.3,11.5);


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

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(0.3,0,0,3).p("AA9gsQgkARgJgDQgIgEgIgoQgJAogIAEQgIAEglgRQAaAfgCAJQgCAIgkASQAogBAGAHQAFAHgIAoQAZggAIAAQAJAAAaAgQgKgoAGgHQAFgHApAAQglgSgCgIQgCgJAZgfg");
	this.shape.setTransform(0.0009,-0.0104);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.rf(["#FFFF00","#FF6600"],[0,1],0.3,0.3,0,0.3,0.3,8.4).s().p("AAAArQgIAAgZAgQAJgngGgHQgGgHgoAAQAkgSACgHQACgJgZggQAkARAJgEQAHgEAJgnQAJAnAHAEQAJAEAkgSQgZAgADAJQABAHAlASQgoAAgGAHQgGAIAKAnQgagggJAAg");
	this.shape_1.setTransform(0,0.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8.7,-8.5,17.4,17.1);


(lib.shape150 = function(mode,startPosition,loop,reversed) {
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
	this.shape.setTransform(-344.15,213.8);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgRARQgHgGAAgLQAAgJAHgIQAIgHAJAAQAKAAAIAHQAHAIAAAJQAAALgHAGQgIAIgKAAQgJAAgIgIg");
	this.shape_1.setTransform(-344.15,120.6);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgJAHgIQAIgHAJAAQAKAAAIAHQAHAIAAAJQAAAKgHAIQgIAHgKAAQgJAAgIgHg");
	this.shape_2.setTransform(-344.15,26.4);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-346.6,23.9,5,192.4);


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

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1.5,0,0,3).p("ArohZIXQAAIABCzI3RAAg");
	this.shape.setTransform(215.8782,361.125);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AroBaIAAizIXQAAIABCzg");
	this.shape_1.setTransform(215.875,361.125);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(1.5,0,0,3).p("AlnBZILPABIAAizIrPAAg");
	this.shape_2.setTransform(422.4,300.6);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AlnBZIAAiyILPABIAACyg");
	this.shape_3.setTransform(422.4,300.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(140.4,290.6,319,80.5);


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
	this.shape.graphics.f("#FF0000").s().p("AAIAXIgPAAIgbAJIAjhAIAiBBg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.5,-3.3,7,6.699999999999999);


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

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(2,1,0,3).p("Ah6AAID1AA");
	this.shape.setTransform(234.675,330.25);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1.5,0,0,3).p("AAAAAIhTgoIAABRIBTgpIBUgpIAABTg");
	this.shape_1.setTransform(164.75,308.9782);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#FF0000").ss(2,1,0,3).p("ABvAAIjeAA");
	this.shape_2.setTransform(413.1,321.35);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#FF0000").ss(2,0,0,3).p("AAABoIAAjP");
	this.shape_3.setTransform(424.25,331.8);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#000000").ss(1.5,0,0,3).p("AMcuRIBdhCIDGCaIhWA9IA7ESIA6gWIAAktAQknqIiwBCIg3AUIAAGWIHhDXIAAmGIAAgwIAAlqIjABHAXeitIgdAAQgEAcgMAWQgSAfgZAAQgaAAgSgfQgNgWgDgcQgCgMAAgNQAAgMACgLICUAAIAAAwIAAGGIBIggIFfidIA6gaIAAmWIkghsIjBhHIAAFqAWskaQgRgXgVAAQgaAAgSAfQgHANgEAPIgFAZIgsAAAVKitIgsAAAVKitIB3AAAUepHIAAjmAafoAIAAktAXepHIAAjmAeFEHIA/AAIAAB4Ig/AAIAAD/IBEAAIAACRIo4GuIAABpIJBAAIAAGXAYmJ+IAAj/IhRAAIAAh4IBRAAIAAhOAI1JJIIyAAIAAA1IG/AAIFfAAAKQS/IAAm6IBiCnIBIiNIBlCQIBoi6IAAHKIBgAAIAApBAWRS9IgCACIguAAIAABnIukAAIAAhnIgwAAIgPAAIkqAAImmAAIAAk9AQHS/IAABIAVhS/Ij6AAAeibCIAAlsI4VAAIAAiXAeFEHIlfAAAeFF/IlfAAAeFAcIAADrAo5z6IEUiIQAfhTBEhGIAZgYQCViHDSAAQDSAACWCHIAZAYQB9B/AACuQAAB4g8BjIgFAIIChB6AIhrdIjDhcQhLAWhVAAQjSAAiViHQgygtgigzIhoAiIAfAoIkkBUIgYgfIjSBFIAABAIA1AAIAAA1ICeAAIAAh9IB0AAIAAB9IAwAAIAABuIgwAAIAAM1Ao5z6IDUESAs8x7IgVgcIEBiAIAXAdArqnmIAYAAIAAh9IBRAAIB0AAAoNrRIh0AAAhhhEIAAAwIkhAAIAAjmIEhAAIAAAwIA5AAIAAhgIC2AAIAABIIA1AAIAAgnIBIAAIDrAAIAAHbIA/AAIAAF3Ii3AAIAAAVIAAAxIBhBZIBWAAIAAA+IAABIIAAA/IAABDIAABIIAABEIAABDIBbAAIAABIAgohEIg5AAAgojKIAACGAhhjKIAACGALBopIhOA5IjGiaIB0hTID7i0ADkhNIAngnIAAgrADkimIAngnIAAg8ACOgnIA1AAIAACnIBIAAIAAgoADkBaIAngmIAAglACOjiIAAC7IAAD5Ii2AAIAAkWADmAMIAlgnIAAgmA3Ux0IAAjJIA1gaIAAi1IH1AAIAAC1IA0AaIAADJIAiAAIAAAFIAYgMIC6DwA31sGIAAluIAhAAIDsAAIAADKAz8ueIAUgKIAAgCQgKAFgKAHIgTAQQgrAqAAA8IAAAiIAADzIBSgrIAAlqAt2x0IkDAAIAACVIEliQA9YrRIAAh9IBzAAIAAB9IDAAAIAAg1IAwAAIC7AAA5VnmIgYAAIAAh9Ih4AAIhzAAIgnAAIAAhuIAnAAA7lrRIhzAAAwYsGIgQAAIAAAFIAADuIBXAtIDnAAIAAK4IBpAAIB0AAIC7AAIEqAAAwYsGIgQAFAwooTIhRgqIAAmiAtUsGIjEAAIDEhAA06oTQgrAWgsAXIjEAAA9YDSIBzAAICQAAIAAK1A1GS/IqLAAIAAvtIB5AAIAAs1AuwS/IAABIICCAAAvNS/IAABlICfAAAv6S/IAAA1AvNS/IgtAAAuwS/IgdAAA1GT0IAAg1Av6SGIAAA5A1GSGIAAA5AAbKzIA5gvIAAkJIB0heIAAhLIg6AAADIDSIBDAAIDrAAAF+MVIAAA/IAABDIAABIIAABDIBhBaIBWAAAF+LNIAABIIBhBZIBWAAABULgIAAghABUMAIAAggABUNbIAAggIAAghABUOWIAAggABUO2IAAggAI1K4IAAAwAI1K4IhWAAIhhhaAI1MmIhWAAIhhhZAI1OtIhWAAIhhhZAF+OXIBhBZIBWAAAI1Q4IhWAAIhhhZAI1JJIAABvAF+KPIAAA+AlSDSIAAD6ArqDSIAAK1AlWZLIAAA8IkVAAIAAkWIBKAAIDLAAIAADaIFqAAABhZLIhNAnIAAgnIAAgrIBTApIBVgqIAAAsIAAAnIhQgnAohVxIAAhcIhlAAAC8ZLICQAAAI1S/Ih4AAAAbMPIA5gvABUM7Ig5AvAAbPFIA5gvAF+QiIAACdABUS/IAAjpAlSS/IpeAAA7lpjIAAM1A5VDSIAAq4AELDSIAAhSAqBDSIAAs1AN0moIiziBIEojTAQHS/Il3AA");
	this.shape_4.setTransform(237.85,179.1);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AiKCLIAAkVIBKAAIDLAAIAADaIAAA7g");
	this.shape_5.setTransform(189.7,332.3);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#0066FF").s().p("ALzhoI4UAAIAAiXIAvAAIAABmIOkAAIAAhmIAtAAIACgCIAABoIJBAAIAAGXIgvAEg");
	this.shape_6.setTransform(357.8,326.25);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgYgFIAXgCIAFgCIAFgDIAQgQIgDA5g");
	this.shape_7.setTransform(382.65,151.875);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(36.7,5.9,402.40000000000003,347.20000000000005);


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

	// Layer_4
	this.instance = new lib.CachedBmp_650();
	this.instance.setTransform(-19.3,-2.95,0.1165,0.1165);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(0.3,0,0,3).p("AiDAAIEHAA");
	this.shape.setTransform(-6.05,1.85);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.instance_1 = new lib.CachedBmp_651();
	this.instance_1.setTransform(-19.05,-2.55,0.1165,0.1165);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(0.3,0,0,3).p("AiGAAIBKAAACHAAIjBAA");
	this.shape_1.setTransform(-5.4244,1.325);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20.2,-2.9,29.299999999999997,5.8);


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
	this.shape.graphics.f("#B18E01").s().p("ACgAIIAAgPIISAAQD6AKj6AFgAqxAIQj6gFD6gKIISAAIAAAPg");
	this.shape.setTransform(119.3125,299.725);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(37.8,299,163,1.5);


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
	this.shape.graphics.rf(["#E8E8E8","#CCCCCC"],[0,1],0,0,0,0,0,52.8).s().p("AoKJWIAAyrIQVAAIAASrg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-52.2,-59.7,104.5,119.5);


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
	this.shape.graphics.rf(["#FFCC33","#FF6600"],[0,1],0,0,0,0,0,52.8).s().p("AoKJWIAAyrIQVAAIAASrg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-52.2,-59.7,104.5,119.5);


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
	this.instance = new lib.CachedBmp_648();
	this.instance.setTransform(-19.05,-2.55,0.0739,0.0739);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(0.3,0,0,3).p("AiGAAIBKAAACHAAIjBAA");
	this.shape.setTransform(-5.4244,1.325);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.instance_1 = new lib.CachedBmp_649();
	this.instance_1.setTransform(-19.4,-0.65,0.0739,0.0739);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.9,-2.5,30.5,4.9);


(lib.shape102 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_647();
	this.instance.setTransform(-1.35,-88.8,0.3728,0.3728);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.3,-88.8,2.6,180.89999999999998);


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
	this.instance = new lib.CachedBmp_646();
	this.instance.setTransform(-1.45,-90.3,0.3728,0.3728);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.4,-90.3,3,173);


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
	this.shape.graphics.f().s("#000000").ss(1.5,0,0,3).p("ADpGiInRAAICwhcIAArnIByAAIAALog");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AjoGiICwhcIAArnIByAAIAALoICvBbg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-25.5,-42.7,51,85.5);


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
	this.shape.graphics.f().s("#000000").ss(1.5,0,0,3).p("AHHuuIAAAeIAAAoIAAEiIksAAIAAZPIk1AAIAA5PIksAAIAAkiIAAgoIAAgeIAAhaIONAAgAiapGIE1AAAnGtoIONAAAnGuQIONAAAnGuuIONAA");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AiaQIIAA5NIksAAIAAkiIAAgpIAAgdIONAAIAAAdIuNAAIONAAIAAApIuNAAIONAAIAAEiIksAAIk1AAIE1AAIAAZNgAHHutIuNAAIAAhaIONAAIAABagAnGutg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-46.5,-104.2,93,208.5);


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

	// Layer_7
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1.5,0,0,3).p("AAdAxIg5AAIAAhhIA5AAg");
	this.shape.setTransform(158.025,242.775);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_6
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1.5,0,0,3).p("AAdAxIg5AAIAAhhIA5AAg");
	this.shape_1.setTransform(79.025,242.775);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_5
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(1.5,0,0,3).p("AgwgwIBhAAIAABhIhhAAg");
	this.shape_2.setTransform(147.025,242.775);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_4
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(1.5,0,0,3).p("AgwgwIBhAAIAABhIhhAAg");
	this.shape_3.setTransform(133.525,242.775);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	// Layer_3
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#000000").ss(1.5,0,0,3).p("AgwgwIBhAAIAABhIhhAAg");
	this.shape_4.setTransform(118.525,242.775);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	// Layer_2
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#000000").ss(1.5,0,0,3).p("AgwgwIBhAAIAABhIhhAAg");
	this.shape_5.setTransform(103.525,242.775);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(1));

	// Layer_1
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#000000").ss(1.5,0,0,3).p("AgwgwIBhAAIAABhIhhAAg");
	this.shape_6.setTransform(90.025,242.775);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(75.2,236.9,86.7,11.799999999999983);


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
	this.shape.graphics.f("rgba(140,140,140,0.89)").s().p("AB0KCIgBAAQgnAEgJgfQg0ASgiglIgBAAQghADgLgVIhAgGIgCABQg8AZgmgoIgBAAQgsAEgFgnIgBgCQgKgNgDgOQgRgGgOgPIgBAAQgsAEgFgnIgBgCQgigvArgwIACgCQALgQANgKQgPgnAigmIACgCQAIgMAJgIQgGgJgBgMIgBgCQgQgXABgWQgIgSADgSIgOgMIgBAAQgsAEgFgnIgBgCQgegpAdgoQgKgKgCgRIgBgCQgigvArgwIACgCQAagmAkgJQgXgrAmgqIACgCQA3hOBaAsIAKABIADgGQgNglAhglQgDgcAYgcIhYgEIgCABQg0AWgkgbQgjACgZgbIgBAAQgsAEgFgnIgBgCQgigvArgwIACgCQA3hOBaAsQATABAVAJQA9gRAfAZQAwgBATAnQAqAEALAlQACAggTARQAhAEAoAZQBegfAdA6QAqAEAMAlQACAmgcARIACAFQABAagMAQIAFAMQAEBDhZAAQABAJgDAIQAKAIAFAOQAfAGAjAWQBegfAdA6QAqAEAMAlQAEBDhZAAQAEAbgjAIQgKAOgTAGQAAAYgLAOIAFAMQAEBDhZAAQABAJgDAIQALAKAGAQQAEBBhVACQATAHAUANQBegfAdA6QAqAEAMAlQAEBDhZAAQACANgHAKIACAAQBcgeAcA6QAqAEAMAlIAAAKQAnAGALAjQAEBDhZAAQAIA2iDgVIgCABQgXAKgUAAQggAAgXgZg");
	this.shape.setTransform(121.2251,42.9177);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(78.9,-23.7,84.69999999999999,133.29999999999998);


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
	this.shape.graphics.f("rgba(140,140,140,0.341)").s().p("AAkgxQAJgGACAHQABATgGAOIhZBEQA0hFAfghg");
	this.shape.setTransform(-37.7929,-23.421);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(152,152,152,0.651)").s().p("AmeHbIgBAAQgrAEgGgoIgBgBQghgwArgvIABgCIAFgHIgBAAQggAOgagFIhLgFIgCAAQgSAIgPACIAAgwQATgIAIgRQAHgNgCgTQgBgHgKAFQgbAQhYB0QjaiXE4jaQAhAEARAaQAoACASAhIAKgMIABgCIASgVQgGgIgBgNIgCgBQghgvArgvIACgCIAPgTQgJgiAfgiIABgCIAGgHIgCAAQg8AagngoIgBAAQgsAEgFgoIgBgBQghgwArgvIABgCQA/hZBtBFIASgGIAAAAQA9hXBqA/QgJgiAfgiIABgCQA3hOBbArQASACAVAIQA9gRAeAaQAxgCATAnQAqAFALAlQAFBChaAAQADARgLAKIAEADQAcgBAiAQIAPADQgTgpAlgoIABgCQA/hZBtBFQBeggAdA6QAqAFALAlQAEBChZAAQAGAnhBABQAKAJAEAPQAFBChaAAQADARgLAKQAPAKAIATQAdgBAiAQIAPADQgTgpAlgoIABgCQA/hZBtBFQBeggAdA6QAqAFALAlQAEBChYAAQAFAmhBABQAKAJAFAPQADBChZAAQADARgLAKQAQAKAHAWQAEBBhWABQAcAJAJAeIAAARQgDATgOAMQgfgHgvAQQhPgyg3AhQgVAMgRAZIgBACIgMAQQgMATAAASIgDABIgYgMIAAgRQgLglgqgFQgdg6heAgQhOgyg3AhQgVAMgRAZIgBACQgiAlANAlIADAGIgNAGQgVAMgRAZIAAAAIgMgBQgJAnhxgSIgCAAQgXAKgUAAQggAAgYgYgAkdEoQgFAIgNAFIAVAMIABAAIAGgIIABgCQALgQANgLIgCgIQgMANgVAHgACiDlQASAIAVANIAAAAIAHgIIABgCQALgQANgLIgCgHQgTAWgyABgAjqCpIATAKIgDgKgADjB3QABAKgCAHQAIAIAGALIANgSIABgCIARgVIAAAAgAhRgFIAAABIAbAMIABgQg");
	this.shape_1.setTransform(25.6002,-52.5823);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(140,140,140,0.89)").s().p("ACnEFIgBAAQgsAEgFgoIgBgBIgDgFQgWANgnAAQAIA2iCgUIgCAAQg8AagmgoIgBAAQgsAEgFgoIgBgBQgigwArgvIACgCQALgQANgLQgPgmAigmIACgCQAIgMAJgIQgFgHgCgJIgRAAQAIA1iDgUIgCAAQg8AagmgnIgBAAQgsADgFgnIgBgBQgigwArgvIABgCIABAAIAGgIIANgHIgDgFQAQgQASgHQgSgpAkgnIACgCIAGgJQA3ghBPAyQBegfAdA6QAqAEALAlIAAARIAYAMIADAAQAAgTALgSIARAJIACABIAAgCQAAgbAYgaIACgCIAGgJQA3ghBPAyQAvgQAfAHQAOgMADgSIAPACQAeAGAOAdQAUACANAKIALgJQCzDVizElQgdANhMgMIgCAAQgXAKgUAAQggAAgXgYgAEjhJQABAKgDAHIAJAKIAJACIAJgLIACgCIARgVIAAAAg");
	this.shape_2.setTransform(54.4165,5.2903);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-54.6,-102.5,160.5,136.3);


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
	this.shape.graphics.f("rgba(140,140,140,0.671)").s().p("AhYEhQh9jyB9lDIgEAAQAwgcBBAjQggAKgZAkIgCACQgrAvAiAwIABABQAFAoArgEIABAAIACACIgCAEIgCACQgqAvAiAvIABABQAFAoArgEIABAAQAbAdAngFIACAFQAEBBhXABQAcAJAKAeQAEBChYAAQAFAnhCAAIgJAAgABRkMQAugGAYAaIgRAFQgcgSgZgHg");
	this.shape.setTransform(-70.575,35.7222);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(140,140,140,0.89)").s().p("AlKEiIgBAAQgsAEgFgoIgBgBQghgwArgvIABgCIADgEIgDgCIgBAAQgsAEgFgoIgBgBQghgwArgvIABgCQAZgjAhgKQAcgJAhAKQAZAHAcASIARgFQA+gRAdAbIADgCQgGgHgCgNIgBgBQghgwArgvIABgCQAthBBGATIAAgBIgBgBQghgwArgvIABgCQA+hZBtBFIAJgDQA3gRAfARQAOAHAKAPQAPAAAMAGIAAADIAHAAQAPAJAJARIAKgMIABgCIAJgMIADAAQCECXiGCVIgTgBIhLgFIgCAAQg2AXgkgdIgEAEQAQAKAHAWQAEBBhXABQAdAJAJAeQAEBChZAAQAIA2iBgUIgCAAQgfANgZgEQgJAnhxgSIgCAAQgRAIgPACIgMAAQgfAAgYgYg");
	this.shape_1.setTransform(-33.2146,11.7301);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-85.7,-19.7,96.2,84.4);


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
	this.shape.graphics.f("rgba(140,140,140,0.89)").s().p("AkJETIgBAAQgsAEgFgoIgBgBQgigwArgvIACgCIAFgHIgCAAQg8AagmgoIgBAAQgsAEgFgoIgBgBQgigwArguIACgCQAfgsAqgGQA+hTBqBEIAUgGQgFgIgBgMIgBgBQgigwArgvIACgCQA+hZBtBFQBFgYAiAaQAGgNAMgNIACgCQA+hZBtBFQBeggAdA6QAqAFAMAlQAEBChZAAQAFAnhAABQAJAJAFAPQAEBChZAAQACAQgLAKQARAKAHAWQAEBBhXABQAcAJAKAeQAEBChZAAQAIA2iDgUIgCAAQgeANgZgEQgJAnhxgSIgCAAQgXAKgUAAQggAAgXgYg");
	this.shape.setTransform(0.0251,0.0147);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-46.6,-29.9,93.30000000000001,59.9);


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
	this.shape.graphics.f("rgba(140,140,140,0.89)").s().p("AkfC+IgCAAQhpAKgMhfIgCgDQhRhwBnhxIAEgFQCVjUECCkQDfhLBFCKQBkAMAbBYQAKCdjUAAQAUCAk2gxIgFACQg3AXgwAAQhLAAg4g6g");
	this.shape.setTransform(0.0317,0.0372);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-44.4,-24.8,88.9,49.7);


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
	this.shape.graphics.rf(["#00CCFF","#0099FF"],[0,1],0,0,0,0,0,52.8).s().p("AoJJ4IAAzvIQUAAIAATvg");
	this.shape.setTransform(120.35,189.85);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(68.1,126.6,104.5,126.5);


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
	this.shape.graphics.f("#6699FF").s().p("AgrgjIBXAAIgsBHg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4.4,-3.6,8.8,7.2);


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
	this.shape.graphics.f().s("#6699FF").ss(2,2,1).p("AgRmXQARAsACAOIABAqQAAAegZAxQgZAxAAAvQAAApAoA7QAoA6AAAhQAAAngZAmQgZAmAAAyQAAATAgBDQAhBCAAANQAAAIgKAK");
	this.shape.setTransform(0,0.0634);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-5.7,-42,11.5,84.2);


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
	this.shape.graphics.f().s("#D6C299").ss(1,0,0,3).p("AgBAAIADAB");
	this.shape.setTransform(127.4,124.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D6C299").s().p("A/KP0IAAvtICjAAIAAADIDWAAIAAq4IDCAAIAAgFIAUAAIAAgMIAOAAIAAgKIAWAAIAAgMIAcAAIAAgRIAbAAIAAgHIAJAAIAAgHIAZAAIAAgMIAOAAIAAgCICLAAIAAALIAWAAIAAANIAAACIAEAAIAbAAIAAAMIAPAAIAAAHIAJAAIAAACIAMAAIAAAKIAgAAIAAAMIAMAAIAAAKIAOAAIAAAHIDkAAIAAKzIUlAAIAAF3IIyAAIAAA1IG/AAIAAj/IhRAAIAAh4IBRAAIAAhNIhIAfIAAwBIDBAAIAAEoIEgBsIAAGXIg6AaIAADqIA/AAIAAB4Ig/AAIAAD/IBEAAIAACRIo6Gwg");
	this.shape_1.setTransform(237.625,199.425);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(38.2,98.3,398.90000000000003,202.3);


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

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#CCCCCC").ss(0.5,0,0,3).p("AASASQgHAHgLAAQgJAAgIgHQgHgIAAgKQAAgKAHgHQAIgHAJAAQALAAAHAHQAHAHAAAKQAAAKgHAIg");
	this.shape.setTransform(8,38.85);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#003366").s().p("AgRARQgHgHAAgKQAAgKAHgHQAHgHAKAAQALAAAGAHQAIAHAAAKQAAAKgIAHQgGAIgLAAQgKAAgHgIg");
	this.shape_1.setTransform(8,38.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(4.5,35.4,7,7);


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
	this.shape.graphics.f("#000000").s().p("AgRARQgHgGAAgLQAAgJAHgIQAIgHAJAAQAKAAAIAHQAHAIAAAJQAAALgHAGQgIAIgKAAQgJAAgIgIg");
	this.shape.setTransform(-340.1,298.8);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-342.6,296.3,5,5);


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

	// Layer_6
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgJAHgIQAIgHAJAAQAKAAAIAHQAHAIAAAJQAAAKgHAIQgIAHgKAAQgJAAgIgHg");
	this.shape.setTransform(-340.1,251);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_5
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgKAHgHQAIgHAJAAQAKAAAIAHQAHAHAAAKQAAAKgHAIQgIAHgKAAQgJAAgIgHg");
	this.shape_1.setTransform(-340.1,203);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_4
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgJAHgIQAIgHAJAAQAKAAAIAHQAHAIAAAJQAAAKgHAIQgIAHgKAAQgJAAgIgHg");
	this.shape_2.setTransform(-340.1,166.8);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_3
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgJAHgIQAIgHAJAAQAKAAAIAHQAHAIAAAJQAAAKgHAIQgIAHgKAAQgJAAgIgHg");
	this.shape_3.setTransform(-340.1,137.8);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	// Layer_2
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgRARQgHgHAAgKQAAgKAHgHQAIgHAJAAQAKAAAIAHQAHAHAAAKQAAAKgHAHQgIAIgKAAQgJAAgIgIg");
	this.shape_4.setTransform(-340.1,106.8);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	// Layer_1
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AgRARQgHgGAAgLQAAgKAHgHQAIgHAJAAQAKAAAIAHQAHAHAAAKQAAALgHAGQgIAIgKAAQgJAAgIgIg");
	this.shape_5.setTransform(-340.1,73.6);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-342.6,71.1,5,182.4);


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

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("ApXGQIAAsfISvAAIAAMfg");
	this.shape.setTransform(-5,-24.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.lf(["#1D3A58","#568EC7"],[0,1],0,39,0,-54).s().p("ApXGQIAAsfISvAAIAAMfg");
	this.shape_1.setTransform(-5,-24.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#666666").s().p("ApXGQIAAsfISvAAIAAMfg");
	this.shape_2.setTransform(-0.05,-21);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-66,-65.9,126,84.9);


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
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("AHvnuQDNDNAAEhQAAEijNDNQjNDNkiAAQkhAAjNjNQjNjNAAkiQAAkhDNjNQDNjNEhAAQEiAADNDNg");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.rf(["#FF9900","#FF0000"],[0.251,1],-36,40,0,-36,40,124.6).s().p("AnuHvQjNjNAAkiQAAkhDNjNQDNjNEhAAQEiAADNDNQDNDNAAEhQAAEijNDNQjNDNkiAAQkhAAjNjNg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#773000").s().p("AnuHvQjNjNAAkiQAAkhDNjNQDNjNEhAAQEiAADNDNQDNDNAAEhQAAEijNDNQjNDNkiAAQkhAAjNjNg");
	this.shape_2.setTransform(5,0);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-71,-71,146,142);


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

	// Layer_5
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Ar9KDIW31OIBFBJI25VOg");
	this.shape.setTransform(172.65,256.375);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_4
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AqLijIAfhgIT4GdIAABqg");
	this.shape_1.setTransform(196.85,174.55);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_3
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("Ar+qCIBEhJIW5VOIhFBJg");
	this.shape_2.setTransform(283.6,256.375);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_2
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AqOCbIT9meIAgBfI0dGog");
	this.shape_3.setTransform(259.5,174.625);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	// Layer_1
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgxH0IAAvnIBjAAIAAPng");
	this.shape_4.setTransform(228.3,134.25);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(96,84.3,264.3,243.7);


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
	this.instance = new lib.CachedBmp_645();
	this.instance.setTransform(5,12,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_644();
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
	this.instance = new lib.CachedBmp_643();
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


(lib.sprite173 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.shape172("synched",0);
	this.instance.setTransform(1,-2.6);
	this.instance.alpha = 0.5898;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({x:-0.6},3).to({y:-3.1},3).wait(1));

	// Layer_2
	this.instance_1 = new lib.shape172("synched",0);
	this.instance_1.setTransform(1,-2.6);
	this.instance_1.alpha = 0.5898;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({x:0,y:0,alpha:1},3).to({scaleX:0.8135,scaleY:0.7852},3).wait(1));

	// Layer_1
	this.instance_2 = new lib.shape172("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(7));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-10.2,-10.6,20.9,18.1);


(lib.sprite166 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.shape165("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite166, new cjs.Rectangle(-4.3,-4.3,8.7,8.6), null);


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

	// Layer_4
	this.instance = new lib.shape71("synched",0);
	this.instance.setTransform(-1.65,-36.95);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({x:-0.1,y:-32.4},1).to({x:0.25,y:-27.45},1).to({x:-0.75,y:-22.55},1).wait(1).to({x:-3.2,y:-18.2},0).wait(21));

	// Mask_Layer_1 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_0 = new cjs.Graphics().p("AgGAxIgJgBQgNgEgJgJQgHgIgDgNIgCgJIAAgFIABgKIAHgPIACgEIAFgGQAOgOAUAAIAMABQAaAEAIAaIAEASIAAABQAAAPgKAOIgBABQgLAQgTACIgJABg");
	var mask_graphics_1 = new cjs.Graphics().p("AgRBJIgCgDIgDgGIgBgBIgDgNIAAgEQgIgJgKgVIgDgFQgHgOgDgOIgCgHQgCgGAAgIIAAgBQAAgIAEgJQAHgMALgFIAQgHQAWgJAWAbIACACIAJAKIADADQATAYAIAkQABAQgEAPIgBACIAAABQgJAVgWALIgCAAIAAAAIgCABQgKADgIAAQgNAAgJgKg");
	var mask_graphics_2 = new cjs.Graphics().p("AgtBeIgCgFQgBgGABgGIAAgDIAIgYIACgGQgEgQgNggIgCgHQgJgXgEgRIgCgJQgDgJgBgLIAAAAQAAgMAGgLQALgRATgCIAZgEQAdgEAZA0IACAEIAIAUIADAFQAOAsAJAxQAAAVgKAVIgCACIAAABQgRAegjAGIgCABIgBAAIgDAAIgIABQgjAAgIghg");
	var mask_graphics_3 = new cjs.Graphics().p("AgJCsQg/ABgChBQAAgLAEgMIAJgUIAOgXQgBgZgRgzQgPgpgDgWQgFgKgBgPQAAgPAKgOQAOgVAaABIAOABIAVgBQAnAAAaBUIAJAkIAUB/QAAAbgTAcIgBACQgaAlgwACg");
	var mask_graphics_4 = new cjs.Graphics().p("AhKBsQAAgVANgWIAOgXQgBgZgRgzQgPgpgDgWQgFgKgBgPQAAgPAKgOQAOgVAaABIAOABIAVgBQAuAAAcB4IAUB/QAAAcgUAdQgcAogzgBQg/ABgChBg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:mask_graphics_0,x:-6,y:-47.5}).wait(1).to({graphics:mask_graphics_1,x:-4.7812,y:-43.5039}).wait(1).to({graphics:mask_graphics_2,x:-3.3989,y:-39.3931}).wait(1).to({graphics:mask_graphics_3,x:-2,y:-35.25}).wait(1).to({graphics:mask_graphics_4,x:-2,y:-35.25}).wait(21));

	// Masked_Layer_2___1
	this.instance_1 = new lib.shape70("synched",0);

	var maskedShapeInstanceList = [this.instance_1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(25));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-7.6,-42,13.399999999999999,27.4);


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

	// Layer_4
	this.instance = new lib.shape71("synched",0);
	this.instance.setTransform(-1.65,-36.95);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({x:-0.05,y:-32.2},1).to({x:0.25,y:-26.95},1).to({x:-1,y:-21.9},1).to({x:-4.75,y:-9.95},4).to({x:-4.5,y:-7.45},1).wait(1).to({x:-3.45,y:-5.2},0).wait(16));

	// Mask_Layer_1 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_0 = new cjs.Graphics().p("AgGAxIgJgBQgNgEgJgJQgHgIgDgNIgCgJIAAgFIABgKIAHgPIACgEIAFgGQAOgOAUAAIAMABQAaAEAIAaIAEASIAAABQAAAPgKAOIgBABQgLAQgTACIgJABg");
	var mask_graphics_1 = new cjs.Graphics().p("AgRBJIgCgDIgDgGIgBgBIgDgNIAAgEQgIgJgKgVIgDgFQgHgOgDgOIgCgHQgCgGAAgIIAAgBQAAgIAEgJQAHgMALgFIAQgHQAWgJAWAbIACACIAJAKIADADQATAYAIAkQABAQgEAPIgBACIAAABQgJAVgWALIgCAAIAAAAIgCABQgKADgIAAQgNAAgJgKg");
	var mask_graphics_2 = new cjs.Graphics().p("AgtBeIgCgFQgBgGABgGIAAgDIAIgYIACgGQgEgQgNggIgCgHQgJgXgEgRIgCgJQgDgJgBgLIAAAAQAAgMAGgLQALgRATgCIAZgEQAdgEAZA0IACAEIAIAUIADAFQAOAsAJAxQAAAVgKAVIgCACIAAABQgRAegjAGIgCABIgBAAIgDAAIgIABQgjAAgIghg");
	var mask_graphics_3 = new cjs.Graphics().p("AgJCsQg/ABgChBQAAgLAEgMIAJgUIAOgXQgBgZgRgzQgPgpgDgWQgFgKgBgPQAAgPAKgOQAOgVAaABIAOABIAVgBQAnAAAaBUIAJAkIAUB/QAAAbgTAcIgBACQgaAlgwACg");
	var mask_graphics_4 = new cjs.Graphics().p("AgJCsIgBAAQgpAAgPgcIgGgQIgCgUIADgUIAKgXIACgCIAMgVQAAgSgJgeIgGgRIgBgDIgCgIIgDgJIgOguIAAgBIgBgHIgGgVIAAgDIAAgBQAAgPAKgOIACgCIAJgKQALgHAOgBIAEAAIAIAAIACAAIAEABIAIgBIAKAAIADAAIAEAAIAGACQARAFANAVIAPAdIAFAMIAFASIAGATIACAJIABAFIAAADIACANIAQBcIABAQIABADQAAAbgTAcIgBACIgCADQgNAQgQAJIgGADQgSAIgXAAg");
	var mask_graphics_5 = new cjs.Graphics().p("AgWCRIgBgCIgEgFIgBgCIgEgJIAAgCIgDgKIgBgCIACghIAAgBQgIgPgJgdIAAgBIgIgcIgEgLQgMgZgIgUIAAgBIgBgGIgGgXIAAgDQAAgRAJgPIAMgOQAJgIAOgDIABAAIABgBIAJgDIAEgBIAUgGIAKgBIACAAQAMABAHAHIAAABIAIAMIADAFIAAgBQACAEAEAEIAJAMIAFAHIABABIADAFIAAABIAGAKQAPAmAMA4IADAUIAAAEQABAfgOAYIAAABIgBABIgBADIgBABQgJAQgRAMIgBABIgFADIgDABQgKALgOAGIgCABIgBABIgBAAQgLAFgHAAQgKAAgGgIg");
	var mask_graphics_6 = new cjs.Graphics().p("AAJCWIgCgBIgHgEIgCgBIgKgMIgIgMIgBAAQgQgNgJgbIgBgBIgHgfIgFgLQgRgbgHgSIgBgBIgCgGQgEgLgCgNIAAgDQAAgSAJgQIAMgQQAKgJAMgEIABgBIAFgGIAYgQIAKgEIACgBQAJgFABgEIAAgBQAAgBAAgBQAAgBAAgBQAAAAABAAQAAAAABAAIAAgCIAAAAIAHgBQAGABAIAEIAMAJIAAAAIABACIABAAIAJAHQAYAdAPBDIADAVIABAEQADAkgKAVIAAABIAAABIgBABIAAACIAAABQgIATgRAOIgBABIgFAEIgDACQgDANgHANIAAABIgBACIgBAAQgKAagHgEIgBAAIgEACIAAAAIgCABIgFgBg");
	var mask_graphics_7 = new cjs.Graphics().p("AAiCzIgDAAIgWgGIgQgIIgCAAQgXgLgKgaIAAgBIgIgfQgCgIgDgEQgWgegIgQIAAgBIgDgGQgFgMgBgOIAAgCQAAgTAJgRIAMgSQAJgKAMgGIABgBIAAgCIADgHIAJgNIAQgOIAFgEIACgCQAHgJgEgRIgBgCQgFgQABgFQgCgDAAgEIAAgBQABgFAHgEQAHgEAKACIAJADIADAAIAFADIABABIAOAEQAfATAUBNIADAWIABAFQAGAqgGATIAAABIgBACIAAADIAAABQgFATgRASIgBABIgFAEIgDACQADAQABATIAAADIABACIgBABQADAngDAIIgBACIgDAJIgBACQgDAFgGACIgDACQgEACgGAAIgDgBg");
	var mask_graphics_8 = new cjs.Graphics().p("AAaDVIAAAAIgbgEQgggJgKgZIgFgVIgBgEIgCgJQgCgIgDgDQgcgigIgOIAAgBIgDgFQgFgMgBgOIAAgDQAAgVAJgTIABgCIAKgPQAJgMAMgHIAAgEIABgKIAAgBIADgGIAEgKIAJgMIAEgEIAFgGIAEgGQAEgQgLgfQgJgagBgLQgEgGAAgJQABgIAIgIQAJgJANAAIAMAAIAIACIACABIARAAQAoALAXBXIAEAUIABAIQAIAxgCARIAAADIABADQgDAVgTAVIgIAIQALATAJAcIABADIAAABQATA9gCAPIgEAUQgFAMgLAHQgJAGgOACIgeAAg");
	var mask_graphics_9 = new cjs.Graphics().p("AAaDVIAAAAQg3gEgOgiIgFgVIgBgFQgCgPgFgFQgcghgIgOIAAgBQgIgOgBgSIAAgCQAAgXAKgTIAKgPQAJgMAMgHIABgOIAAgBIAHgQIAJgMIAJgKIAEgGQAEgQgLgfQgJgagBgLQgEgGAAgJQABgJAIgIQAJgIANgBIAMABIAKACIARABQAoALAXBXIAEAUQAJA4gCASIABAGQgDAVgTAVIgIAHQALAUAJAcIABAEQATA8gCAQIgEAUQgKAWgdAFIgUABIgNgBg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:mask_graphics_0,x:-6,y:-47.5}).wait(1).to({graphics:mask_graphics_1,x:-4.7812,y:-43.5039}).wait(1).to({graphics:mask_graphics_2,x:-3.3989,y:-39.3931}).wait(1).to({graphics:mask_graphics_3,x:-2,y:-35.25}).wait(1).to({graphics:mask_graphics_4,x:-2,y:-35.25}).wait(1).to({graphics:mask_graphics_5,x:-2.3741,y:-33.1755}).wait(1).to({graphics:mask_graphics_6,x:-2.7296,y:-31.3917}).wait(1).to({graphics:mask_graphics_7,x:-3.0185,y:-30.0405}).wait(1).to({graphics:mask_graphics_8,x:-2.8152,y:-28.55}).wait(1).to({graphics:mask_graphics_9,x:-2.8152,y:-28.5417}).wait(16));

	// Masked_Layer_2___1
	this.instance_1 = new lib.shape70("synched",0);

	var maskedShapeInstanceList = [this.instance_1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(25));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.1,-42,14.899999999999999,40.4);


(lib.sprite145 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.shape144("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite145, new cjs.Rectangle(-3.5,-3.3,7,6.699999999999999), null);


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

	// Layer_2
	this.instance = new lib.shape141("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(20));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20.2,-2.9,29.299999999999997,5.8);


(lib.sprite105 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.shape104("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(20));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.9,-2.5,30.5,4.9);


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

	// Layer_1
	this.instance = new lib.shape101("synched",0);

	this.instance_1 = new lib.shape102("synched",0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},10).wait(10));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.4,-90.3,3,182.39999999999998);


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

	// Layer_4
	this.instance = new lib.shape71("synched",0);
	this.instance.setTransform(-1.65,-36.95);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({x:0.25,y:-26.95},1).to({x:-4.7,y:-8.7},2).to({x:2.8,y:7.05},2).to({x:2.5,y:13.85},1).to({x:-0.7,y:20.1},1).to({x:-1.75,y:27},1).to({x:3.45,y:38.75},2).wait(1).to({y:44.35},0).wait(7));

	// Mask_Layer_1 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_0 = new cjs.Graphics().p("AgGAxIgJgBQgNgEgJgJQgHgIgDgNIgCgJIAAgFIABgKIAHgPIACgEIAFgGQAOgOAUAAIAMABQAaAEAIAaIAEASIAAABQAAAPgKAOIgBABQgLAQgTACIgJABg");
	var mask_graphics_1 = new cjs.Graphics().p("AgJCsQg/ABgChBQAAgLAEgMIAJgUIAOgXQgBgZgRgzQgPgpgDgWQgFgKgBgPQAAgPAKgOQAOgVAaABIAOABIAVgBQAnAAAaBUIAJAkIAUB/QAAAbgTAcIgBACQgaAlgwACg");
	var mask_graphics_2 = new cjs.Graphics().p("AgOCsQgugBgLgpIgDgWQAAgVANgWIANgWIABgBQgBgVgNgoIgEgPIgBgDIgGgQIgLgqIAAgCQgFgKgBgPQAAgPAKgOIAIgKQAJgHAKgCIAMgBIABAAIAOABIALgBIAKAAIAEAAQAUADAQAaQAKAOAIAWIAGAQIAGAUIAEATIABAIIABAJIADAOIANBTIACANQAAAcgUAdIgDADQgMAPgOAJIgGADQgTAJgZAAg");
	var mask_graphics_3 = new cjs.Graphics().p("AASCyIAAAAIgPgJIgBAAQgigLgNgoIAAgBIgGgZQgCgNgEgHQgTgegIgTIAAgBIgBgBQgGgOgBgRIAAgCIAAgBQAAgWAKgUIAKgPQAJgJALgIIAEgKIAiggQAKgLgBgOQgCgNACAAQgBgCAAgDQACgDAFgDQAHgDAJADIAIADIAIAFIALAFQAbAWARBSIAEAXQAEAmgHAmIgBAGQgHATgPARIgDADIgFAEIABABQgBASgFATIgBADQgGAsgFgFQgBAFgDACIAAAAQgEAGgGAAQgEAAgFgCg");
	var mask_graphics_4 = new cjs.Graphics().p("AAYEsQhFgBgOgoIgFgaIgBgGQgCgTgGgGQgggpgJgRIgBgBQgJgRAAgXIAAgFQAAgcAKgZIAKgUIAWgZIgCgTIAAgCIAGgYIAHgQIAJgQIAFgIQgBgYgRg1QgPgpgDgVQgFgLgBgOQAAgQAKgOQAKgOAQgFIAOgBIAOABIAVgBQAuAAAcB5IAFAbIAOBdIABAIQAAAbgUAcIgJAKQATAaARApIADAHQAjBYAAAgQAAATgEAQQgMAmgoAMIgsAGg");
	var mask_graphics_5 = new cjs.Graphics().p("AgvEWQgIgHgEgMIgEgPIgCgRQgBgMgCgGIgFgHIgiguIgHgMQgKgTAAgZIAAgCIACgZIACgMIADgIQAFgPAIgNIAEgGIASgTIgCgTIABgNIAKgaIACgDIAFgIIAJgQIgCgSIgFgWIgLglIgIgVIgKgpIgDgIIgDgRIAAgDQABgMAHgMIACgDQAKgOAQgFIANgBIABAAIAOABIABAAIAUgBQAjAAAYBFIAPA0IAIAzIAIAtIABAIIADAYQAAATgJASIgLASIgJAKIAKAQIARAeIADAGIAFAMIAEAKIARAtQAMAjAEAWIACASIAAACQAAAWgGAQQgSAug8AFIgQAAQgzAAgVgWg");
	var mask_graphics_6 = new cjs.Graphics().p("AggFQIgLgJQgigJgCgeIAFgxIgSgdQgEgQgMgaQgGgOgCgRQgJgWAAgDQAAgQAGgNIALgjQgDgJABgMIAIgOQAAgNABgNIAFgTIAJgUIATgaIgThQIAAgOIAKgfQAAgJgEgQQgIgigEgiQAFgTANgJIAIgDQAHgIAMAAIAOABIAVgBQAYAAASAnQATAaAOA4IATCAQAAAXgOAXIgKAPIAFAVIAkBLQANAYAGAfQAGATACAMIABAPIAAAKQgCAcgOASQgPArgfATQgEADgCAMQgaABgKgKQgDAKgEAFQgGAZggAAIgJAAg");
	var mask_graphics_7 = new cjs.Graphics().p("AgVGPQhDgGgDg2IADgdIAEgVIAEgSIADgXIAAgLQgEgagVgvIgGgQQgSgtgBgGQAAgRALgPIALgLIgHgKQgHgPgCgWIgBgIQAAgSAEgQIAIgYIAIgPIAXgaIgBgFIgCgOIAEgVIAKgVIANgYQAAgRgJgeIgJgeIgPgzIgDgLIgFgVIAAgEQgBgQALgOIACgEQAOgQAXAAIAPABIACAAIASgBQANAAAMAKQAeAZAUBWIAKBCIAKA+QgBAbgTAdIgJAKIATAfIAUArIAJAYIAGAPIAGATQAOANAAAcIgBAGIABAOIgBAPQgEAkgWASQgMArgCAgQAAAFADAYIABADQADAdgEAVQgMBBhQAAg");
	var mask_graphics_8 = new cjs.Graphics().p("AhCGBQgXgOgCggQgBgSAIggIADgOIAEgYIAAgDIAAgCQAAgLgGgTQgFgVgOgfIgFgOQgTgvgBgGQAAgOAHgNIAEgFIADgFIAIgGIgHgKQgFgLgDgOIgCgUQAAgWAHgTIALgbIACgFIAGgIIARgSIgCgLIgBgIIADgPQADgNAIgOIANgYIAAgFQgBgTgLgiIgGgTIgBgDIgIgZIgJgiIgBgBIgDgMIgBgMIAAgHQABgLAJgMQANgUAaAAIAPABIAUgBIAJABQAjAJAYBSIAHAdIAEAWIAAAJIALBBIAFAgIgCARQgEARgLASIgDAEIgJAKQAQAWAOAiIAJASIAOAmIAHAUIACABIADAFQAHALABARIABAHIgBAGIABAOIAAABQgBARgDANQgGAYgRAOIgDANIgHAiIgEAYIAAAEIAEAgIABATIgCAfQgGAjgaAQQgXAOglAAQgpAAgXgPg");
	var mask_graphics_9 = new cjs.Graphics().p("AgVGhIgDgBQgbgPgSgdIgDgFQgNgWgEgcQgEgYAAgfIABgSQABgNAEgLIABgDIABgCIACgEQACgRgCgNIgBgDQgCgVgPglIAAAAIgHgPIAAgBQgVgxgCgJIAAgCQAAgQAJgNIAJgLIAAgHIgFgLQgFgNgCgQIAAgUQADgbAJgVIARgaIAEgQQADgMAIgMIAFgUIAFgOIACghIAAgBIACgbIgBgGIAAgBIgOg5QgEgJgCgKIgBgEQgBgOADgNQAEgSAJgKIABgBIAFgEIAHgIIAEgCIACgBQAGgEAKAAIACABQAOgCARAPIADABIAdAbIABACQAWAmAPBFIABADQABANgCAOIgIAiQANAeALAnIALAmIACAQIACACQADAPgFAVIgBADIgBADIgBABIgBAJIgBABIgBAEQAHAggGAZIAAAGIABAPQAAAXADAVIAHAdIABADIAAABIAEADQAKAJAGAMIACAEIADAGIAAABIAEAVIAAABIABADIACAfIAAAFQgCATgHAXIAAAGIgCANQAAARADAQIABADQADAMAAALIAAAEIAAAGQAAASgGANIgJANIgUASIgDACQgVARgfAIIgFABIgLABQgVAAgWgSg");
	var mask_graphics_10 = new cjs.Graphics().p("Ag7G9QgRgfgPgyIgSg+IgLg6IgBgQQgBgQAKgOIACgEIACgBQAGgeAAgHQAAgWgRgtIgIgSQgWg2gDgLIAAgBQAAgRALgPIAFgGIAGgFIgHgKIgFgMQgEgPgBgSIACgYQAFgbANgWIAXgaIgBgIIgCgLQAAgPAIgQIAGgMIAEgHIAJgQQAAgOgGgYIgKghIgCgGQgOgpgEgWQgEgJgBgLIAAgFQgBgPALgOQANgUAXAAIADAAIAPABIANgBIAHAAQAQAAANAMQAQAQANAiIAGATIAIAcIADALIAUCAQgBARgGAQIgNAYIgJAKQAUAbATAvIAPAoIAGASQAOAOAAAbIgBAGIAAACIABALIAAABQgBAugaAXIgGAZQgHAbgBAWIAEAeIAAADIABAGQASAIALAMIAIAKIAEAIIAGARIABADIAIAmQAFAUAAAnIAAANQABAWAMASQALAQAAANIAAAIQgCAUgPALIgUAKIgoAGIhPABQgdAAgagvg");
	var mask_graphics_11 = new cjs.Graphics().p("AhbFsQgfhkABgkQgBgQAKgOIAEgFQAGgeAAgHQAAgagZg7QgZg7AAgHQAAgRALgPIALgLIgHgKQgKgSAAgbQABgpATggIAXgaIgDgTQAAgVAOgWIANgXQAAgZgSg0QgOgpgEgWQgEgKgBgPQgBgPALgOQANgVAaABIAPABIAUgBQAvAAAcB4IAUCAQgBAcgTAdIgJAKQAUAbATAvIAVA6QAOAOAAAbIgBAGIABANQgBAvgaAXQgMAqgCAgIAEAhIABAGQASAIALAMQAOAPAFAXIAIAmQAGAXgBAxQABAWAMASQALAQAAANQAAAmglALIh3AHQgwAAgniAg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:mask_graphics_0,x:-6,y:-47.5}).wait(1).to({graphics:mask_graphics_1,x:-2,y:-35.25}).wait(1).to({graphics:mask_graphics_2,x:-2,y:-35.25}).wait(1).to({graphics:mask_graphics_3,x:-2.9238,y:-28.6925}).wait(1).to({graphics:mask_graphics_4,x:-1,y:-22.5}).wait(1).to({graphics:mask_graphics_5,x:-1,y:-22.5}).wait(1).to({graphics:mask_graphics_6,x:-1.125,y:-18.8754}).wait(1).to({graphics:mask_graphics_7,x:-1.25,y:-12.5}).wait(1).to({graphics:mask_graphics_8,x:-1.25,y:-12.5}).wait(1).to({graphics:mask_graphics_9,x:-0.85,y:-7.2146}).wait(1).to({graphics:mask_graphics_10,x:1.25,y:-3.25}).wait(1).to({graphics:mask_graphics_11,x:1.25,y:-3.25}).wait(7));

	// Masked_Layer_2___1
	this.instance_1 = new lib.shape70("synched",0);

	var maskedShapeInstanceList = [this.instance_1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(18));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.1,-42,17,90);


(lib.sprite89 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.shape88("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite89, new cjs.Rectangle(78.9,-23.7,84.69999999999999,133.29999999999998), null);


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

	// Layer_1
	this.instance = new lib.shape86("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite87, new cjs.Rectangle(-54.6,-102.5,160.5,136.3), null);


(lib.sprite85 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.shape84("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite85, new cjs.Rectangle(-85.7,-19.7,96.2,84.4), null);


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

	// Layer_1
	this.instance = new lib.shape82("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite83, new cjs.Rectangle(-46.6,-29.9,93.30000000000001,59.9), null);


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

}).prototype = getMCSymbolPrototype(lib.sprite80, new cjs.Rectangle(-44.4,-24.8,88.9,49.7), null);


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

	// Layer_4
	this.instance = new lib.shape71("synched",0);
	this.instance.setTransform(-1.65,-36.95);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({x:-0.05,y:-32.2},1).to({x:0.25,y:-26.95},1).to({x:-1,y:-21.9},1).to({x:-3.2,y:-17.2},1).to({x:-4.55,y:-12.15},1).to({x:-4.35,y:-6.95},1).to({x:2.8,y:7.05},3).to({x:3.15,y:11.15},1).to({x:1.95,y:15.2},1).to({x:-0.15,y:18.85},1).to({x:-1.45,y:22.8},1).to({x:-1.75,y:27},1).to({x:4.35,y:40.95},4).wait(1).to({x:3.45,y:44.35},0).wait(6));

	// Mask_Layer_1 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_0 = new cjs.Graphics().p("AgPAwQgNgEgJgJQgHgIgDgNIgCgOIABgKIAJgTIAFgGQAOgOAUAAIAMABQAaAEAIAaIAEASIAAABQAAAPgKAOIgBABQgLAQgTACIgJABg");
	var mask_graphics_1 = new cjs.Graphics().p("AgRBJIgCgDIgDgGIgBgBIgDgNIAAgEQgIgJgKgVIgDgFQgHgOgDgOIgCgHQgCgGAAgIIAAgBQAAgIAEgJQAHgMALgFIAQgHQAWgJAWAbIACACIAJAKIADADQATAYAIAkQABAQgEAPIgBACIAAABQgJAVgWALIgCAAIAAAAIgCABQgKADgIAAQgNAAgJgKg");
	var mask_graphics_2 = new cjs.Graphics().p("AgtBeIgCgFQgBgGABgGIAAgDIAIgYIACgGQgEgQgNggIgCgHQgJgXgEgRIgCgJQgDgJgBgLIAAAAQAAgMAGgLQALgRATgCIAZgEQAdgEAZA0IACAEIAIAUIADAFQAOAsAJAxQAAAVgKAVIgCACIAAABQgRAegjAGIgCABIgBAAIgDAAIgIABQgjAAgIghg");
	var mask_graphics_3 = new cjs.Graphics().p("AgJCsQg/ABgChBQAAgLAEgMIAJgUIAOgXQgBgZgRgzQgPgpgDgWQgFgKgBgPQAAgPAKgOQAOgVAaABIAOABIAVgBQAnAAAaBUIAJAkIAUB/QAAAbgTAcIgBACQgaAlgwACg");
	var mask_graphics_4 = new cjs.Graphics().p("AgOCsQgugBgLgpIgDgWQAAgVANgWIANgWIABgBQgBgVgNgoIgEgPIgBgDIgGgQIgLgqIAAgCQgFgKgBgPQAAgPAKgOIAIgKQAJgHAKgCIAMgBIABAAIAOABIALgBIAKAAIAEAAQAUADAQAaQAKAOAIAWIAGAQIAGAUIAEATIABAIIABAJIADAOIANBTIACANQAAAcgUAdIgDADQgMAPgOAJIgGADQgTAJgZAAg");
	var mask_graphics_5 = new cjs.Graphics().p("AgOCRIgEgIIAAAAQgDgFAAgOIAAgBIgBgPIAAAAQgRgQgOgpIAAgBIgFgVQgDgLgDgHQgMgYgHgUIAAgCIgBAAQgFgMgBgQIAAgCIAAAAQAAgTAKgRIAJgNQAJgIAKgFIAIgFIAhgOIAEgCQAPgDAIAFQADAAAFAMIACAEIAGAGIALAKIAQAVQARAgAMA+IADAUQACAhgNAhIgDAGQgIAQgOAMIgDACIgFAEIAAABQgKANgPAKIgDACQgNAJgHAAQgJAAgEgLg");
	var mask_graphics_6 = new cjs.Graphics().p("AASCyIAAAAIgPgJIgBAAQgigLgNgoIAAgBIgGgZQgCgNgEgHQgTgegIgTIAAgBIgBgBQgGgOgBgRIAAgCIAAgBQAAgWAKgUIAKgPQAJgJALgIIAEgKIAiggQAKgLgBgOQgCgNACAAQgBgCAAgDQACgDAFgDQAHgDAJADIAIADIAIAFIALAFQAbAWARBSIAEAXQAEAmgHAmIgBAGQgHATgPARIgDADIgFAEIABABQgBASgFATIgBADQgGAsgFgFQgBAFgDACIAAAAQgEAGgGAAQgEAAgFgCg");
	var mask_graphics_7 = new cjs.Graphics().p("AA3DtIgdgBIgBAAQgzgGgOgoIAAgBIgGgcQgCgQgFgHQgZgigIgSIgBgCIgBgBQgHgPgBgVIAAgCIAAgBQAAgZAKgWIAKgSIAVgVIABgPIAIgRIAWgeQAGgTgKghQgIgcgBgKQgDgHAAgIQABgKAIgIQAIgJANAAIAKABIAKADIARACQAlAKAWBmIAEAZQAGAsABAsIgBAHQgEAVgRAVIgDADIgFAGIABABQAIAWAGAdIABAFQAPBBgDAOQAAAMgEAJIAAABQgJAXgaADIgBAAg");
	var mask_graphics_8 = new cjs.Graphics().p("AAYEsQhFgBgOgoIgFgaIgBgGQgCgTgGgGQgggpgJgRIgBgBQgJgRAAgXIAAgFQAAgcAKgZIAKgUIAWgZIgCgTIAAgCIAGgYIAHgQIAJgQIAFgIQgBgYgRg1QgPgpgDgVQgFgLgBgOQAAgQAKgOQAKgOAQgFIAOgBIAOABIAVgBQAuAAAcB5IAFAbIAOBdIABAIQAAAbgUAcIgJAKQATAaARApIADAHQAjBYAAAgQAAATgEAQQgMAmgoAMIgsAGg");
	var mask_graphics_9 = new cjs.Graphics().p("AgvEWQgIgHgEgMIgEgPIgCgRQgBgMgCgGIgFgHIgiguIgHgMQgKgTAAgZIAAgCIACgZIACgMIADgIQAFgPAIgNIAEgGIASgTIgCgTIABgNIAKgaIACgDIAFgIIAJgQIgCgSIgFgWIgLglIgIgVIgKgpIgDgIIgDgRIAAgDQABgMAHgMIACgDQAKgOAQgFIANgBIABAAIAOABIABAAIAUgBQAjAAAYBFIAPA0IAIAzIAIAtIABAIIADAYQAAATgJASIgLASIgJAKIAKAQIARAeIADAGIAFAMIAEAKIARAtQAMAjAEAWIACASIAAACQAAAWgGAQQgSAug8AFIgQAAQgzAAgVgWg");
	var mask_graphics_10 = new cjs.Graphics().p("AgNEnQgEABgFgDQgEAKgWgGIgGgMQgSgKgCgTIABgcIgaglIgMgbQgIgQgBgWIgEgNQAAgOADgOQAKgdAFgLIAAgOIAOgRIgBgWIAEgQIAJgYIARgaIgFgfIgWhOIgCgMIAEgXIgCgOQgEgXABgXQAJgSAPgHIAKgCQAFgEAFAAIAPABIAUgBQAdAAAXA2QAMAaALApIAUCAQAAAVgMAVIgLAQIgBAPIAgBAQANAdAKAgQAJAbADARIACAQIAAAGQgCAZgKASQgPAsgvAMQgFABgGAGIgCAAQglAAgPgPg");
	var mask_graphics_11 = new cjs.Graphics().p("AggFQIgLgJQgigJgCgeIAFgxIgSgdQgEgQgMgaQgGgOgCgRQgJgWAAgDQAAgQAGgNIALgjQgDgJABgMIAIgOQAAgNABgNIAFgTIAJgUIATgaIgThQIAAgOIAKgfQAAgJgEgQQgIgigEgiQAFgTANgJIAIgDQAHgIAMAAIAOABIAVgBQAYAAASAnQATAaAOA4IATCAQAAAXgOAXIgKAPIAFAVIAkBLQANAYAGAfQAGATACAMIABAPIAAAKQgCAcgOASQgPArgfATQgEADgCAMQgaABgKgKQgDAKgEAFQgGAZggAAIgJAAg");
	var mask_graphics_12 = new cjs.Graphics().p("AgRFwIgOgFQg0gIgCgpIAKhHIgJgUQgEgUgRgmQgEgKgDgNQgOghAAgFQAAgQAIgOQAJgVAAgHQgGgMgBgRIAFgMQAAgOACgPIAHgVIAIgSIAUgaIgCgPIgIgiIACgSIAQgmQAAgNgGgXQgMgtgKguQACgTALgMIAGgDQALgMARAAIAOABIAVgBQASAAAQAYQAXAZARBIIAUCAQAAAZgRAaIgKANIAzBxQAOATADAdIADATIAAAbQgDAggRASQgOArgQAZQgCAEAAASQgMABgGgDQAAATgEANQgJAtg3AAIgFAAg");
	var mask_graphics_13 = new cjs.Graphics().p("AgVGPQhDgGgDg2IADgdIAEgVIAEgSIADgXIAAgLQgEgagVgvIgGgQQgSgtgBgGQAAgRALgPIALgLIgHgKQgHgPgCgWIgBgIQAAgSAEgQIAIgYIAIgPIAXgaIgBgFIgCgOIAEgVIAKgVIANgYQAAgRgJgeIgJgeIgPgzIgDgLIgFgVIAAgEQgBgQALgOIACgEQAOgQAXAAIAPABIACAAIASgBQANAAAMAKQAeAZAUBWIAKBCIAKA+QgBAbgTAdIgJAKIATAfIAUArIAJAYIAGAPIAGATQAOANAAAcIgBAGIABAOIgBAPQgEAkgWASQgMArgCAgQAAAFADAYIABADQADAdgEAVQgMBBhQAAg");
	var mask_graphics_14 = new cjs.Graphics().p("AhCGBQgXgOgCggQgBgSAIggIADgOIAEgYIAAgDIAAgCQAAgLgGgTQgFgVgOgfIgFgOQgTgvgBgGQAAgOAHgNIAEgFIADgFIAIgGIgHgKQgFgLgDgOIgCgUQAAgWAHgTIALgbIACgFIAGgIIARgSIgCgLIgBgIIADgPQADgNAIgOIANgYIAAgFQgBgTgLgiIgGgTIgBgDIgIgZIgJgiIgBgBIgDgMIgBgMIAAgHQABgLAJgMQANgUAaAAIAPABIAUgBIAJABQAjAJAYBSIAHAdIAEAWIAAAJIALBBIAFAgIgCARQgEARgLASIgDAEIgJAKQAQAWAOAiIAJASIAOAmIAHAUIACABIADAFQAHALABARIABAHIgBAGIABAOIAAABQgBARgDANQgGAYgRAOIgDANIgHAiIgEAYIAAAEIAEAgIABATIgCAfQgGAjgaAQQgXAOglAAQgpAAgXgPg");
	var mask_graphics_15 = new cjs.Graphics().p("AgLGYIgDgBQghgHgUgWIgEgEQgQgTgDgcQgCgVAEgfIACgRQABgMAEgLIAAgDIABgCIAAgEQAAgOgDgOIAAgDQgFgVgNghIAAAAIgGgOIgBgCQgTgvgBgIIAAAAQAAgPAHgNIAJgLIADgHIgGgKQgFgMgCgOIgBgTQACgaAHgVIAOgaIAGgOIAOgWIABgTIAEgNQACgPAFgQIAAgBIAHgZIAAgFIAAgBQgFgZgIgeIgFgSIgBgEQgDgNAAgNQgBgSACgNIABgKIADgKIABgDIABgCQAFgHAHgFIADgBQANgKAVAGIACABIAMAGIARAFIAHADIADACQAbAYATBJIABADIABAZIAAAXIgBAKQAJAgAJAkIAIAkIAAAPIABACQAAAQgIATIgBACIgCAEIgFAJIgBAEQALAaADAcIABAFIADAOQAEAVAGAUIAHAbIACACIABACIADADQAIAJADAMIACAFIABAGIAAABIADAUIAAABIAAAEQABAPgCAOIgBAFQgEATgLATIgBAFIgBAMQgDAQAAAPIABADQABAMgBALIAAADIAAAGQABARgDANIgEAQIgKAYIgCACQgOAZgcAMIgFABQgKAEgMAAQgPAAgRgGg");
	var mask_graphics_16 = new cjs.Graphics().p("AgVGhIgDgBQgbgPgSgdIgDgFQgNgWgEgcQgEgYAAgfIABgSQABgNAEgLIABgDIABgCIACgEQACgRgCgNIgBgDQgCgVgPglIAAAAIgHgPIAAgBQgVgxgCgJIAAgCQAAgQAJgNIAJgLIAAgHIgFgLQgFgNgCgQIAAgUQADgbAJgVIARgaIAEgQQADgMAIgMIAFgUIAFgOIACghIAAgBIACgbIgBgGIAAgBIgOg5QgEgJgCgKIgBgEQgBgOADgNQAEgSAJgKIABgBIAFgEIAHgIIAEgCIACgBQAGgEAKAAIACABQAOgCARAPIADABIAdAbIABACQAWAmAPBFIABADQABANgCAOIgIAiQANAeALAnIALAmIACAQIACACQADAPgFAVIgBADIgBADIgBABIgBAJIgBABIgBAEQAHAggGAZIAAAGIABAPQAAAXADAVIAHAdIABADIAAABIAEADQAKAJAGAMIACAEIADAGIAAABIAEAVIAAABIABADIACAfIAAAFQgCATgHAXIAAAGIgCANQAAARADAQIABADQADAMAAALIAAAEIAAAGQAAASgGANIgJANIgUASIgDACQgVARgfAIIgFABIgLABQgVAAgWgSg");
	var mask_graphics_17 = new cjs.Graphics().p("AgmGwIgDgCQgVgWgQgmIgDgGQgKgZgFgcQgGgagEgfIAAgDIAAgQQAAgNAGgMIACgDIABgCIACgEQAEgUgBgMIAAgDQgBgVgRgoIAAgBIgGgQIgBgBQgVgygCgLIAAgCQAAgRAJgNIAKgLIgDgJIgFgMQgFgOgBgQIABgXQAEgbALgVIAUgaIAAgSQACgNAIgOIAOgjQABgPgDgUIABgBIgFgdIgBgGIAAgBQgLgkgFgYQgEgJgCgLIAAgEQgBgOAHgOQAIgTARgFIAAAAIACgBIAJgBIAKgEIAGgCIADAAQAKgCAKAGIADACQAOAHAOAXIABACIAXAoIABACQAQAzANBDIAAACQAAAOgEAPIgJAXIgGALQARAdAPAqIARA4IABACQAIAPgCAXIgBADIgBAFIgBAKIAAABIgBAFQADAkgPAXIgBAHIgCAQQgDAaABAVIAFAfIABAFIAEACQANAIAIAMIACAEIAHAOIAEAOIAAABIACAEIAEAgIAAAFQABASgDAdIAAAGIgBANQABATAGAQIACADQAHAOAAAKIAAAEIAAABIAAAGQgCATgKANIgOALIgcALIgDACQgeAJgiAEIgFABIgFAAQgXAAgZgfg");
	var mask_graphics_18 = new cjs.Graphics().p("Ag7G9QgRgfgPgyIgSg+IgLg6IgBgQQgBgQAKgOIACgEIACgBQAGgeAAgHQAAgWgRgtIgIgSQgWg2gDgLIAAgBQAAgRALgPIAFgGIAGgFIgHgKIgFgMQgEgPgBgSIACgYQAFgbANgWIAXgaIgBgIIgCgLQAAgPAIgQIAGgMIAEgHIAJgQQAAgOgGgYIgKghIgCgGQgOgpgEgWQgEgJgBgLIAAgFQgBgPALgOQANgUAXAAIADAAIAPABIANgBIAHAAQAQAAANAMQAQAQANAiIAGATIAIAcIADALIAUCAQgBARgGAQIgNAYIgJAKQAUAbATAvIAPAoIAGASQAOAOAAAbIgBAGIAAACIABALIAAABQgBAugaAXIgGAZQgHAbgBAWIAEAeIAAADIABAGQASAIALAMIAIAKIAEAIIAGARIABADIAIAmQAFAUAAAnIAAANQABAWAMASQALAQAAANIAAAIQgCAUgPALIgUAKIgoAGIhPABQgdAAgagvg");
	var mask_graphics_19 = new cjs.Graphics().p("AhbFsQgfhkABgkQgBgQAKgOIAEgFQAGgeAAgHQAAgagZg7QgZg7AAgHQAAgRALgPIALgLIgHgKQgKgSAAgbQABgpATggIAXgaIgDgTQAAgVAOgWIANgXQAAgZgSg0QgOgpgEgWQgEgKgBgPQgBgPALgOQANgVAaABIAPABIAUgBQAvAAAcB4IAUCAQgBAcgTAdIgJAKQAUAbATAvIAVA6QAOAOAAAbIgBAGIABANQgBAvgaAXQgMAqgCAgIAEAhIABAGQASAIALAMQAOAPAFAXIAIAmQAGAXgBAxQABAWAMASQALAQAAANQAAAmglALIh3AHQgwAAgniAg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:mask_graphics_0,x:-6,y:-47.5}).wait(1).to({graphics:mask_graphics_1,x:-4.7812,y:-43.5039}).wait(1).to({graphics:mask_graphics_2,x:-3.3989,y:-39.3931}).wait(1).to({graphics:mask_graphics_3,x:-2,y:-35.25}).wait(1).to({graphics:mask_graphics_4,x:-2,y:-35.25}).wait(1).to({graphics:mask_graphics_5,x:-2.4867,y:-31.5584}).wait(1).to({graphics:mask_graphics_6,x:-2.9238,y:-28.6925}).wait(1).to({graphics:mask_graphics_7,x:-3.175,y:-25.725}).wait(1).to({graphics:mask_graphics_8,x:-1,y:-22.5}).wait(1).to({graphics:mask_graphics_9,x:-1,y:-22.5}).wait(1).to({graphics:mask_graphics_10,x:-1.05,y:-21.4742}).wait(1).to({graphics:mask_graphics_11,x:-1.125,y:-18.8754}).wait(1).to({graphics:mask_graphics_12,x:-1.2,y:-15.6959}).wait(1).to({graphics:mask_graphics_13,x:-1.25,y:-12.5}).wait(1).to({graphics:mask_graphics_14,x:-1.25,y:-12.5}).wait(1).to({graphics:mask_graphics_15,x:-1.0687,y:-9.7805}).wait(1).to({graphics:mask_graphics_16,x:-0.85,y:-7.2146}).wait(1).to({graphics:mask_graphics_17,x:0.125,y:-5.1528}).wait(1).to({graphics:mask_graphics_18,x:1.25,y:-3.25}).wait(1).to({graphics:mask_graphics_19,x:1.25,y:-3.25}).wait(6));

	// Masked_Layer_2___1
	this.instance_1 = new lib.shape70("synched",0);

	var maskedShapeInstanceList = [this.instance_1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(25));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8.9,-42,17.700000000000003,90);


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

	// timeline functions:
	this.frame_0 = function() {
		/* stopAllSounds ();
		*/
	}
	this.frame_919 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(919).call(this.frame_919).wait(1));

	// Masked_Layer_39___24
	this.instance = new lib.shape22("synched",0);
	this.instance.setTransform(-142.2,-55.3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(920));

	// Masked_Layer_38___24
	this.instance_1 = new lib.text21("synched",0);
	this.instance_1.setTransform(-485.15,202.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(920));

	// Masked_Layer_37___24
	this.instance_2 = new lib.text20("synched",0);
	this.instance_2.setTransform(-485.15,152.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(920));

	// Masked_Layer_36___24
	this.instance_3 = new lib.text19("synched",0);
	this.instance_3.setTransform(-485.15,118.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(920));

	// Masked_Layer_35___24
	this.instance_4 = new lib.text18("synched",0);
	this.instance_4.setTransform(-485.15,88.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(920));

	// Masked_Layer_34___24
	this.instance_5 = new lib.text17("synched",0);
	this.instance_5.setTransform(-485.15,58.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(920));

	// Masked_Layer_33___24
	this.instance_6 = new lib.text16("synched",0);
	this.instance_6.setTransform(-485.15,24);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(920));

	// Masked_Layer_32___24
	this.instance_7 = new lib.text15("synched",0);
	this.instance_7.setTransform(-485.15,234.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(920));

	// Masked_Layer_31___24
	this.instance_8 = new lib.shape13("synched",0);
	this.instance_8.setTransform(-142.2,-39.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(920));

	// Masked_Layer_25___24
	this.instance_9 = new lib.text12("synched",0);
	this.instance_9.setTransform(-485.15,-5.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(920));

	// Layer_23
	this.instance_10 = new lib.text11("synched",0);
	this.instance_10.setTransform(64.75,128.85);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(920));

	// Layer_22
	this.instance_11 = new lib.shape6("synched",0);
	this.instance_11.setTransform(79.3,179.25);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(920));

	// Layer_20
	this.instance_12 = new lib.text10("synched",0);
	this.instance_12.setTransform(83.15,287.65);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(920));

	// Layer_19
	this.instance_13 = new lib.shape6("synched",0);
	this.instance_13.setTransform(138.65,329.25);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(920));

	// Layer_17
	this.instance_14 = new lib.text9("synched",0);
	this.instance_14.setTransform(258.05,287.65);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(920));

	// Layer_16
	this.instance_15 = new lib.shape6("synched",0);
	this.instance_15.setTransform(322.25,329.25);

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(920));

	// Layer_14
	this.instance_16 = new lib.text8("synched",0);
	this.instance_16.setTransform(349.1,128.85);

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(920));

	// Layer_13
	this.instance_17 = new lib.shape6("synched",0);
	this.instance_17.setTransform(386.25,179.25);

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(920));

	// Layer_11
	this.instance_18 = new lib.text7("synched",0);
	this.instance_18.setTransform(171,16.15);

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(920));

	// Layer_10
	this.instance_19 = new lib.shape6("synched",0);
	this.instance_19.setTransform(233.3,73.35);

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(920));

	// Layer_8
	this.instance_20 = new lib.text5("synched",0);
	this.instance_20.setTransform(166,176.45);

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(920));

	// Layer_7
	this.instance_21 = new lib.shape3("synched",0);
	this.instance_21.setTransform(228.3,184.25);

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(920));

	// Layer_5
	this.instance_22 = new lib.shape2("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(920));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-489.1,-8.6,935.3,356.90000000000003);


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


(lib.sprite170 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.sprite80();
	this.instance.setTransform(0,0,0.2831,0.2831);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(29).to({_off:false},0).to({scaleX:0.1067,scaleY:0.1067,x:-0.15,y:-36.7,alpha:0},35).wait(1));

	// Layer_3
	this.instance_1 = new lib.sprite80();
	this.instance_1.setTransform(0,0,0.2831,0.2831);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(14).to({_off:false},0).to({scaleX:0.1118,scaleY:0.1118,x:-0.15,y:-35.65,alpha:0.0313},34).wait(1).to({scaleX:0.1067,scaleY:0.1067,y:-36.7,alpha:0},0).wait(16));

	// Layer_1
	this.instance_2 = new lib.sprite80();
	this.instance_2.setTransform(0,0,0.2831,0.2831);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({scaleX:0.2779,scaleY:0.2779,y:-1.1,alpha:0.9688},1).to({scaleX:0.1119,scaleY:0.1119,x:-0.15,y:-35.6,alpha:0.0313},32).wait(1).to({scaleX:0.1067,scaleY:0.1067,y:-36.7,alpha:0},0).wait(16).to({scaleX:0.2831,scaleY:0.2831,x:-0.55,y:16.9},1).to({x:0,y:0,alpha:1},13).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.1,-39.3,25.7,63.3);


(lib.sprite169 = function(mode,startPosition,loop,reversed) {
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
	this.frame_58 = function() {
		this.gotoAndPlay(29);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(58).call(this.frame_58).wait(1));

	// Layer_7
	this.instance = new lib.sprite89();
	this.instance.setTransform(88.9,22.75);
	this.instance.alpha = 0.0508;
	var instanceFilter_1 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance.filters = [instanceFilter_1];
	this.instance.cache(77,-26,89,137);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({alpha:0.9297},13).wait(1).to({alpha:1},0).wait(15).to({x:94.4},15).to({x:88.9},14).wait(1));
	this.timeline.addTween(cjs.Tween.get(instanceFilter_1).to(new cjs.ColorFilter(0.51953125,0.51953125,0.51953125,1,0,0,0,0), 13).wait(1).to(new cjs.ColorFilter(0.48046875,0.48046875,0.48046875,1,0,0,0,0), 0).wait(45));

	// Layer_5
	this.instance_1 = new lib.sprite87();
	this.instance_1.setTransform(82.1,18.55);
	this.instance_1.alpha = 0.0508;
	var instance_1Filter_2 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_1.filters = [instance_1Filter_2];
	this.instance_1.cache(-57,-104,165,140);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({alpha:0.9297},13).wait(1).to({alpha:1},0).wait(15).to({x:76.6,y:19.65},15).to({x:82.1,y:18.55},14).wait(1));
	this.timeline.addTween(cjs.Tween.get(instance_1Filter_2).to(new cjs.ColorFilter(0.51953125,0.51953125,0.51953125,1,0,0,0,0), 13).wait(1).to(new cjs.ColorFilter(0.48046875,0.48046875,0.48046875,1,0,0,0,0), 0).wait(45));

	// Layer_3
	this.instance_2 = new lib.sprite85();
	this.instance_2.setTransform(58.2,-18.7);
	this.instance_2.alpha = 0.0508;
	var instance_2Filter_3 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_2.filters = [instance_2Filter_3];
	this.instance_2.cache(-88,-22,100,88);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({alpha:0.5195},4).to({alpha:0.8203},4).to({alpha:0.9219},2).to({alpha:0.9609},1).to({alpha:1},2).wait(16).to({x:58.85,y:-19.6},3).to({x:59.1,y:-19.85},1).to({x:60.6,y:-21.95},7).to({x:60.85,y:-22.2},1).to({x:61.5,y:-23.1},3).to({x:61.25,y:-22.8},1).to({x:61.05,y:-22.45},1).to({x:60.3,y:-21.55},3).to({x:60.1,y:-21.2},1).to({x:59.6,y:-20.6},2).to({x:59.4,y:-20.25},1).to({x:58.65,y:-19.35},3).to({x:58.45,y:-19},1).to({x:58.2,y:-18.7},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(instance_2Filter_3).to(new cjs.ColorFilter(0.75,0.75,0.75,1,0,0,0,0), 4).to(new cjs.ColorFilter(0.5703125,0.5703125,0.5703125,1,0,0,0,0), 4).to(new cjs.ColorFilter(0.51953125,0.51953125,0.51953125,1,0,0,0,0), 2).wait(1).to(new cjs.ColorFilter(0.5,0.5,0.5,1,0,0,0,0), 0).to(new cjs.ColorFilter(0.48046875,0.48046875,0.48046875,1,0,0,0,0), 2).wait(46));

	// Layer_1
	this.instance_3 = new lib.sprite83();
	this.instance_3.setTransform(-28,19.5);
	var instance_3Filter_4 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_3.filters = [instance_3Filter_4];
	this.instance_3.cache(-49,-32,97,64);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(29).to({x:-20.3,y:17.3},15).to({x:-28,y:19.5},14).wait(1));
	this.timeline.addTween(cjs.Tween.get(instance_3Filter_4).to(new cjs.ColorFilter(0.51953125,0.51953125,0.51953125,1,0,0,0,0), 13).wait(1).to(new cjs.ColorFilter(0.48046875,0.48046875,0.48046875,1,0,0,0,0), 0).wait(45));

	this.filterCacheList = [];
	this.filterCacheList.push({instance: this.instance, startFrame:1, endFrame:13, x:77, y:-26, w:89, h:137});
	this.filterCacheList.push({instance: this.instance, startFrame:0, endFrame:0, x:77, y:-26, w:89, h:137});
	this.filterCacheList.push({instance: this.instance, startFrame:14, endFrame:14, x:77, y:-26, w:89, h:137});
	this.filterCacheList.push({instance: this.instance_1, startFrame:1, endFrame:13, x:-57, y:-104, w:165, h:140});
	this.filterCacheList.push({instance: this.instance_1, startFrame:0, endFrame:0, x:-57, y:-104, w:165, h:140});
	this.filterCacheList.push({instance: this.instance_1, startFrame:14, endFrame:14, x:-57, y:-104, w:165, h:140});
	this.filterCacheList.push({instance: this.instance_2, startFrame:1, endFrame:4, x:-88, y:-22, w:100, h:88});
	this.filterCacheList.push({instance: this.instance_2, startFrame:0, endFrame:0, x:-88, y:-22, w:100, h:88});
	this.filterCacheList.push({instance: this.instance_2, startFrame:5, endFrame:8, x:-88, y:-22, w:100, h:88});
	this.filterCacheList.push({instance: this.instance_2, startFrame:9, endFrame:10, x:-88, y:-22, w:100, h:88});
	this.filterCacheList.push({instance: this.instance_2, startFrame:11, endFrame:11, x:-88, y:-22, w:100, h:88});
	this.filterCacheList.push({instance: this.instance_2, startFrame:12, endFrame:13, x:-88, y:-22, w:100, h:88});
	this.filterCacheList.push({instance: this.instance_3, startFrame:1, endFrame:13, x:-49, y:-32, w:97, h:64});
	this.filterCacheList.push({instance: this.instance_3, startFrame:0, endFrame:0, x:-49, y:-32, w:97, h:64});
	this.filterCacheList.push({instance: this.instance_3, startFrame:14, endFrame:14, x:-49, y:-32, w:97, h:64});
	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-74.6,-83.9,332.6,216.3);


(lib.sprite168 = function(mode,startPosition,loop,reversed) {
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
	this.frame_28 = function() {
		this.gotoAndPlay(9);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(28).call(this.frame_28).wait(1));

	// Layer_15
	this.instance = new lib.sprite80();
	this.instance.setTransform(6.1,-41.4,0.668,0.668);
	this.instance.alpha = 0.4688;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({alpha:1},9).to({x:1.7},9).to({x:6.1},10).wait(1));

	// Layer_13
	this.instance_1 = new lib.sprite80();
	this.instance_1.setTransform(25.6,-31.35,0.668,0.668);
	this.instance_1.alpha = 0.4688;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({alpha:1},9).to({x:30},9).to({x:25.6},10).wait(1));

	// Layer_11
	this.instance_2 = new lib.sprite80();
	this.instance_2.setTransform(-18.15,-27.95,0.668,0.668);
	this.instance_2.alpha = 0.4688;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({alpha:1},9).to({x:-13.75},9).to({x:-18.15},10).wait(1));

	// Layer_9
	this.instance_3 = new lib.sprite80();
	this.instance_3.setTransform(-25.6,-14.35,0.668,0.668);
	this.instance_3.alpha = 0.4688;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({alpha:1},9).to({x:-23.4},9).to({x:-25.6},10).wait(1));

	// Layer_7
	this.instance_4 = new lib.sprite80();
	this.instance_4.setTransform(18.85,1.8,0.668,0.668);
	this.instance_4.alpha = 0.4688;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({alpha:1},9).to({x:15.55},9).to({x:18.85},10).wait(1));

	// Layer_5
	this.instance_5 = new lib.sprite80();
	this.instance_5.setTransform(-30.1,5.25,0.668,0.668);
	this.instance_5.alpha = 0.4688;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({alpha:1},9).to({x:-33.4},9).to({x:-30.1},10).wait(1));

	// Layer_3
	this.instance_6 = new lib.sprite80();
	this.instance_6.setTransform(24.4,25.25,0.668,0.668);
	this.instance_6.alpha = 0.4688;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).to({alpha:1},9).to({x:26.6},9).to({x:24.4},10).wait(1));

	// Layer_1
	this.instance_7 = new lib.sprite80();
	this.instance_7.setTransform(-9.4,31.3,0.668,0.668);
	this.instance_7.alpha = 0.4688;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).to({alpha:1},9).to({x:-11.6},9).to({x:-9.4},10).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-63.1,-58,122.9,106);


(lib.sprite90 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.sprite89();
	this.instance.setTransform(82.1,18.55);
	this.instance.alpha = 0.0508;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(23).to({x:88.9,y:22.75},1).to({x:85.4,y:20.75,alpha:0.2617},3).to({x:83.15,y:19.45,alpha:0.3984},3).to({x:82.1,y:18.85,alpha:0.4609},3).to({x:82.05,y:18.8},1).to({scaleY:1.114,x:86.05,y:4.85,alpha:0.3203},15).to({scaleY:1.127,y:3.15,alpha:0.3086},1).to({scaleY:1.348,y:-26.15,alpha:0.0703},17).wait(1).to({scaleY:1.361,y:-27.85,alpha:0.0508},0).wait(32));

	// Layer_5
	this.instance_1 = new lib.sprite87();
	this.instance_1.setTransform(82.1,18.55);
	this.instance_1.alpha = 0.1484;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({alpha:0.0508},14).to({x:88.75,alpha:0.3398},1).to({x:98.4,alpha:0.7617},2).to({x:101.4,alpha:0.8906},1).to({x:103.8,alpha:1},2).to({scaleX:1.0128,scaleY:1.0256,x:104.6,y:21.55,alpha:0.9688},2).to({scaleX:1.1857,scaleY:1.371,x:115.25,y:62.15,alpha:0.5703},27).to({alpha:0.1484},7).wait(1).to({alpha:0.0898},0).wait(43));

	// Layer_3
	this.instance_2 = new lib.sprite85();
	this.instance_2.setTransform(47.3,-7.8);
	this.instance_2.alpha = 0.0508;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({scaleX:1.407,scaleY:1.0204,rotation:-0.5064,x:91.8,y:-24.95,alpha:0.5391},11).to({scaleX:1.5034,scaleY:1.0253,rotation:-0.5381,x:102.3,y:-29,alpha:0.6484},4).to({scaleX:1.5963,scaleY:1.0299,rotation:-0.7555,x:112.45,y:-32.9,alpha:0.7695},6).to({scaleX:1.6058,scaleY:1.0304,rotation:-0.7577,x:113.5,y:-33.3},1).to({scaleX:1.6274,scaleY:1.0315,rotation:-0.8111,x:115.85,y:-34.2,alpha:0.8008},5).to({scaleX:1.6332,scaleY:1.0598,rotation:-0.561,x:116.45,y:-34.5,alpha:0.8203},1).to({scaleX:1.651,scaleY:1.1445,rotation:-0.5111,x:118.4,y:-35.5,alpha:0.8711},3).to({scaleX:1.657,scaleY:1.1728,rotation:-0.3056,x:119.05,y:-35.75,alpha:0.8789},1).to({scaleX:1.6748,scaleY:1.2575,rotation:-0.2551,x:120.95,y:-36.65,alpha:0.9297},3).to({scaleX:1.6866,scaleY:1.3141,rotation:-0.0346,x:122.25,y:-37.35,alpha:0.9609},2).to({scaleX:1.6985,scaleY:1.3705,rotation:0,x:123.6,y:-37.9,alpha:1},2).to({x:123.65,alpha:0.1719},7).wait(1).to({x:123.6,alpha:0.0508},0).wait(53));

	// Layer_1
	this.instance_3 = new lib.sprite83();
	this.instance_3.setTransform(-28,19.5,1.1552,1.2776);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({scaleX:1.1928,scaleY:1.3069,x:-24.5,y:18.35,alpha:0.9688},2).to({scaleX:1.5123,scaleY:1.5559,x:4.7,y:8.6,alpha:0.7188},17).to({y:8.55,alpha:0.1406},24).wait(1).to({y:8.6,alpha:0.1211},0).wait(39).to({scaleX:1,scaleY:1,x:-38.9,y:30.4,alpha:0.0508},1).to({scaleX:1.0007,scaleY:1.0012,x:-38.85,y:30.35},1).to({scaleX:1.0027,scaleY:1.0049,x:-38.7,y:30.2,alpha:0.0703},1).to({scaleX:1.0062,scaleY:1.0111,x:-38.45,y:29.95,alpha:0.0898},1).to({scaleX:1.011,scaleY:1.0197,x:-38.1,y:29.65,alpha:0.1211},1).to({scaleX:1.0172,scaleY:1.0308,x:-37.7,y:29.2,alpha:0.1602},1).to({scaleX:1.0248,scaleY:1.0444,x:-37.15,y:28.65,alpha:0.1992},1).to({scaleX:1.0338,scaleY:1.0604,x:-36.55,y:28.05,alpha:0.2617},1).to({scaleX:1.0442,scaleY:1.079,x:-35.8,y:27.3,alpha:0.3203},1).to({scaleX:1.0835,scaleY:1.1493,x:-33.05,y:24.55,alpha:0.5586},3).to({scaleX:1.1552,scaleY:1.2776,x:-28,y:19.5,alpha:1},4).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-85.5,-83.9,338,216.3);


(lib.sprite174 = function(mode,startPosition,loop,reversed) {
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
	this.frame_125 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(125).call(this.frame_125).wait(1));

	// Layer_148
	this.instance = new lib.sprite166();
	this.instance.setTransform(163.55,204.25);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(7).to({_off:false},0).to({y:305.15},22).to({_off:true},1).wait(96));

	// Layer_146
	this.instance_1 = new lib.sprite166();
	this.instance_1.setTransform(75.15,211.75);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(7).to({_off:false},0).to({rotation:-90.0017,y:216.7},1).to({rotation:-180.0026,y:221.65},1).to({rotation:-90,y:236.45},3).to({rotation:-180.0017,y:241.4},1).to({rotation:-89.9983,y:256.2},3).to({rotation:-180,y:261.15},1).to({rotation:-179.9983,y:280.9},4).to({rotation:-270,y:285.85},1).to({rotation:-179.9974,y:300.65},3).to({rotation:0,y:310.55},2).to({alpha:0.6016},2).to({_off:true},1).wait(96));

	// Layer_145
	this.instance_2 = new lib.shape164("synched",0);
	this.instance_2.setTransform(162.75,193.65,0.75,0.75);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(6).to({_off:false},0).to({_off:true},3).wait(117));

	// Layer_144
	this.instance_3 = new lib.shape163("synched",0);
	this.instance_3.setTransform(162.75,193.65,0.75,0.75);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(4).to({_off:false},0).to({_off:true},7).wait(115));

	// Layer_143
	this.instance_4 = new lib.shape164("synched",0);
	this.instance_4.setTransform(76.55,201.7,0.75,0.75);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(6).to({_off:false},0).to({_off:true},3).wait(117));

	// Layer_142
	this.instance_5 = new lib.shape163("synched",0);
	this.instance_5.setTransform(76.55,201.7,0.75,0.75);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(4).to({_off:false},0).to({_off:true},7).wait(115));

	// Mask_Layer_136 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_0 = new cjs.Graphics().p("AoJLAIAA1/IQUAAIAAV/g");
	var mask_graphics_1 = new cjs.Graphics().p("AoJKvIAA1dIQUAAIAAVdg");
	var mask_graphics_2 = new cjs.Graphics().p("AoJKeIAA07IQUAAIAAU7g");
	var mask_graphics_3 = new cjs.Graphics().p("AoJKNIAA0ZIQUAAIAAUZg");
	var mask_graphics_4 = new cjs.Graphics().p("AoJJ8IAAz3IQUAAIAAT3g");
	var mask_graphics_5 = new cjs.Graphics().p("AoJJrIAAzVIQUAAIAATVg");
	var mask_graphics_6 = new cjs.Graphics().p("AoJJaIAAyzIQUAAIAASzg");
	var mask_graphics_7 = new cjs.Graphics().p("AoJJJIAAyRIQUAAIAASRg");
	var mask_graphics_8 = new cjs.Graphics().p("AoJI5IAAxxIQUAAIAARxg");
	var mask_graphics_9 = new cjs.Graphics().p("AoJIoIAAxPIQUAAIAARPg");
	var mask_graphics_10 = new cjs.Graphics().p("AoJIXIAAwtIQUAAIAAQtg");
	var mask_graphics_11 = new cjs.Graphics().p("AoJIGIAAwLIQUAAIAAQLg");
	var mask_graphics_12 = new cjs.Graphics().p("AoJH1IAAvpIQUAAIAAPpg");
	var mask_graphics_13 = new cjs.Graphics().p("AoJHkIAAvHIQUAAIAAPHg");
	var mask_graphics_14 = new cjs.Graphics().p("AoJHTIAAulIQUAAIAAOlg");
	var mask_graphics_15 = new cjs.Graphics().p("AoJHCIAAuDIQUAAIAAODg");
	var mask_graphics_16 = new cjs.Graphics().p("Ai1YkIAAuDIQUAAIAAODg");
	var mask_graphics_17 = new cjs.Graphics().p("AoJHCIAAuDIQUAAIAAODg");
	var mask_graphics_18 = new cjs.Graphics().p("AoJGmIAAtLIQUAAIAANLg");
	var mask_graphics_19 = new cjs.Graphics().p("AoJGKIAAsTIQUAAIAAMTg");
	var mask_graphics_20 = new cjs.Graphics().p("AoJFuIAArbIQUAAIAALbg");
	var mask_graphics_21 = new cjs.Graphics().p("AoJFSIAAqjIQUAAIAAKjg");
	var mask_graphics_22 = new cjs.Graphics().p("AoJE2IAAprIQUAAIAAJrg");
	var mask_graphics_23 = new cjs.Graphics().p("AoJEaIAAozIQUAAIAAIzg");
	var mask_graphics_24 = new cjs.Graphics().p("AoJD+IAAn7IQUAAIAAH7g");
	var mask_graphics_25 = new cjs.Graphics().p("AoJDjIAAnFIQUAAIAAHFg");
	var mask_graphics_26 = new cjs.Graphics().p("AoJDHIAAmMIQUAAIAAGMg");
	var mask_graphics_27 = new cjs.Graphics().p("AoJCqIAAlUIQUAAIAAFUg");
	var mask_graphics_28 = new cjs.Graphics().p("AoJCPIAAkdIQUAAIAAEdg");
	var mask_graphics_29 = new cjs.Graphics().p("AoJBzIAAjlIQUAAIAADlg");
	var mask_graphics_30 = new cjs.Graphics().p("AoJBXIAAitIQUAAIAACtg");
	var mask_graphics_31 = new cjs.Graphics().p("AoJA7IAAh1IQUAAIAAB1g");
	var mask_graphics_32 = new cjs.Graphics().p("AoJAfIAAg9IQUAAIAAA9g");
	var mask_graphics_33 = new cjs.Graphics().p("AoJADIAAgFIQUAAIAAAFg");
	var mask_graphics_34 = new cjs.Graphics().p("AoJADIAAgFIQUAAIAAAFg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:mask_graphics_0,x:120.35,y:244.025}).wait(1).to({graphics:mask_graphics_1,x:120.35,y:245.725}).wait(1).to({graphics:mask_graphics_2,x:120.35,y:247.425}).wait(1).to({graphics:mask_graphics_3,x:120.35,y:249.125}).wait(1).to({graphics:mask_graphics_4,x:120.35,y:250.825}).wait(1).to({graphics:mask_graphics_5,x:120.35,y:252.525}).wait(1).to({graphics:mask_graphics_6,x:120.35,y:254.225}).wait(1).to({graphics:mask_graphics_7,x:120.35,y:255.925}).wait(1).to({graphics:mask_graphics_8,x:120.35,y:257.625}).wait(1).to({graphics:mask_graphics_9,x:120.35,y:259.325}).wait(1).to({graphics:mask_graphics_10,x:120.35,y:261.025}).wait(1).to({graphics:mask_graphics_11,x:120.35,y:262.725}).wait(1).to({graphics:mask_graphics_12,x:120.35,y:264.425}).wait(1).to({graphics:mask_graphics_13,x:120.35,y:266.125}).wait(1).to({graphics:mask_graphics_14,x:120.35,y:267.825}).wait(1).to({graphics:mask_graphics_15,x:120.35,y:269.525}).wait(1).to({graphics:mask_graphics_16,x:86.3,y:157.2487}).wait(1).to({graphics:mask_graphics_17,x:120.35,y:269.525}).wait(1).to({graphics:mask_graphics_18,x:120.35,y:272.35}).wait(1).to({graphics:mask_graphics_19,x:120.35,y:275.175}).wait(1).to({graphics:mask_graphics_20,x:120.35,y:278}).wait(1).to({graphics:mask_graphics_21,x:120.35,y:280.85}).wait(1).to({graphics:mask_graphics_22,x:120.35,y:283.65}).wait(1).to({graphics:mask_graphics_23,x:120.35,y:286.475}).wait(1).to({graphics:mask_graphics_24,x:120.35,y:289.325}).wait(1).to({graphics:mask_graphics_25,x:120.35,y:292.15}).wait(1).to({graphics:mask_graphics_26,x:120.35,y:294.95}).wait(1).to({graphics:mask_graphics_27,x:120.35,y:297.8}).wait(1).to({graphics:mask_graphics_28,x:120.35,y:300.625}).wait(1).to({graphics:mask_graphics_29,x:120.35,y:303.45}).wait(1).to({graphics:mask_graphics_30,x:120.35,y:306.275}).wait(1).to({graphics:mask_graphics_31,x:120.35,y:309.1}).wait(1).to({graphics:mask_graphics_32,x:120.35,y:311.925}).wait(1).to({graphics:mask_graphics_33,x:120.35,y:314.75}).wait(1).to({graphics:mask_graphics_34,x:120.35,y:314.75}).wait(92));

	// Masked_Layer_139___136
	this.instance_6 = new lib.sprite103();
	this.instance_6.setTransform(162.1,232.3);

	var maskedShapeInstanceList = [this.instance_6];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(126));

	// Masked_Layer_137___136
	this.instance_7 = new lib.sprite103();
	this.instance_7.setTransform(75.1,232.3);

	var maskedShapeInstanceList = [this.instance_7];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(126));

	// Layer_135
	this.instance_8 = new lib.shape99("synched",0);
	this.instance_8.setTransform(116.8,96.25);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).to({startPosition:0},20).to({y:100.25},4).wait(1).to({y:101.25},0).wait(101));

	// Mask_Layer_118 (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	var mask_1_graphics_0 = new cjs.Graphics().p("AoJDrIAAnVIQUAAIAAHVg");
	var mask_1_graphics_1 = new cjs.Graphics().p("AoJD8IAAn3IQUAAIAAH3g");
	var mask_1_graphics_2 = new cjs.Graphics().p("AoJENIAAoZIQUAAIAAIZg");
	var mask_1_graphics_3 = new cjs.Graphics().p("AoJEeIAAo7IQUAAIAAI7g");
	var mask_1_graphics_4 = new cjs.Graphics().p("AoJEwIAApfIQUAAIAAJfg");
	var mask_1_graphics_5 = new cjs.Graphics().p("AoJFBIAAqBIQUAAIAAKBg");
	var mask_1_graphics_6 = new cjs.Graphics().p("AoJFTIAAqkIQUAAIAAKkg");
	var mask_1_graphics_7 = new cjs.Graphics().p("AoJFkIAArHIQUAAIAALHg");
	var mask_1_graphics_8 = new cjs.Graphics().p("AoJF1IAArpIQUAAIAALpg");
	var mask_1_graphics_9 = new cjs.Graphics().p("AoJGGIAAsLIQUAAIAAMLg");
	var mask_1_graphics_10 = new cjs.Graphics().p("AoJGXIAAstIQUAAIAAMtg");
	var mask_1_graphics_11 = new cjs.Graphics().p("AoJGpIAAtRIQUAAIAANRg");
	var mask_1_graphics_12 = new cjs.Graphics().p("AoJG6IAAtzIQUAAIAANzg");
	var mask_1_graphics_13 = new cjs.Graphics().p("AoJHMIAAuWIQUAAIAAOWg");
	var mask_1_graphics_14 = new cjs.Graphics().p("AoJHdIAAu5IQUAAIAAO5g");
	var mask_1_graphics_15 = new cjs.Graphics().p("AoJHdIAAu5IQUAAIAAO5g");

	this.timeline.addTween(cjs.Tween.get(mask_1).to({graphics:mask_1_graphics_0,x:120.35,y:150.075}).wait(1).to({graphics:mask_1_graphics_1,x:120.35,y:151.8}).wait(1).to({graphics:mask_1_graphics_2,x:120.35,y:153.525}).wait(1).to({graphics:mask_1_graphics_3,x:120.35,y:155.25}).wait(1).to({graphics:mask_1_graphics_4,x:120.35,y:157}).wait(1).to({graphics:mask_1_graphics_5,x:120.35,y:158.725}).wait(1).to({graphics:mask_1_graphics_6,x:120.35,y:160.45}).wait(1).to({graphics:mask_1_graphics_7,x:120.35,y:162.175}).wait(1).to({graphics:mask_1_graphics_8,x:120.35,y:163.9}).wait(1).to({graphics:mask_1_graphics_9,x:120.35,y:165.625}).wait(1).to({graphics:mask_1_graphics_10,x:120.35,y:167.35}).wait(1).to({graphics:mask_1_graphics_11,x:120.35,y:169.1}).wait(1).to({graphics:mask_1_graphics_12,x:120.35,y:170.825}).wait(1).to({graphics:mask_1_graphics_13,x:120.35,y:172.55}).wait(1).to({graphics:mask_1_graphics_14,x:120.35,y:174.275}).wait(1).to({graphics:mask_1_graphics_15,x:120.35,y:174.275}).wait(111));

	// Masked_Layer_129___118
	this.instance_9 = new lib.sprite98();
	this.instance_9.setTransform(116.95,194.85,0.9998,0.9998,179.0206);

	var maskedShapeInstanceList = [this.instance_9];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(15).to({_off:true},1).wait(110));

	// Masked_Layer_124___118
	this.instance_10 = new lib.sprite98();
	this.instance_10.setTransform(152.1,194.85,0.9998,0.9998,179.0206);

	var maskedShapeInstanceList = [this.instance_10];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(15).to({_off:true},1).wait(110));

	// Masked_Layer_119___118
	this.instance_11 = new lib.sprite98();
	this.instance_11.setTransform(81.85,194.85,0.9998,0.9998,179.0206);

	var maskedShapeInstanceList = [this.instance_11];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(15).to({_off:true},1).wait(110));

	// Layer_116
	this.instance_12 = new lib.sprite80();
	this.instance_12.setTransform(369.2,82.7,0.253,0.253);
	this.instance_12.alpha = 0.75;
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(14).to({_off:false},0).to({scaleX:0.2495,scaleY:0.2495,y:81.85,alpha:0.7305},1).to({_off:true},1).wait(110));

	// Layer_114
	this.instance_13 = new lib.sprite80();
	this.instance_13.setTransform(369.35,96,0.2831,0.2831);

	this.instance_14 = new lib.sprite170();
	this.instance_14.setTransform(369.35,96);
	this.instance_14._off = true;
	var instance_14Filter_1 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_14.filters = [instance_14Filter_1];
	this.instance_14.cache(-15,-41,30,67);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).to({scaleX:0.2809,scaleY:0.2809,y:95.05,alpha:0.9805},1).to({scaleX:0.253,scaleY:0.253,x:369.2,y:82.7,alpha:0.75},13).to({_off:true},1).wait(111));
	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(16).to({_off:false},0).wait(110));
	this.timeline.addTween(cjs.Tween.get(instance_14Filter_1).wait(16).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).to(new cjs.ColorFilter(0.51171875,0.51171875,0.51171875,1,0,0,0,0), 17).wait(1).to(new cjs.ColorFilter(0.48046875,0.48046875,0.48046875,1,0,0,0,0), 0).wait(92));

	// Mask_Layer_104 (mask)
	var mask_2 = new cjs.Shape();
	mask_2._off = true;
	mask_2.graphics.p("ANsMRIAAmnIA5gVIi6iGIhSA6IjNifIB5hXIjLhfQhOAXhYAAQjbAAiciMQg0gvgig1IhtAkIAhAqIkxBWIgYggImnCKIgPAAIAAD9IhWgtIAAmxIFLiiIgXgdIEMiGIAYAfIEfiNQAghXBGhJIAagZQCciMDbAAQDaAACcCMIAaAZQCCCFAAC0QAAB9g/BmIgGAJICpCAIBghGIDOCgIhZBAIA8EcIA5gVIAAlBIDFAAIABD3IAGgCIACF4IAAALIAAAJIgCG2gA1ig6QABg+AsgsQAKgKAKgHIAUgKIAAF4IhVAsg");
	mask_2.setTransform(240.45,110.375);

	// Masked_Layer_105___104
	this.instance_15 = new lib.sprite90();
	this.instance_15.setTransform(153.15,84.1);

	this.instance_16 = new lib.sprite169();
	this.instance_16.setTransform(153.15,84.1);

	var maskedShapeInstanceList = [this.instance_15,this.instance_16];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_2;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15}]}).to({state:[{t:this.instance_16}]},16).wait(110));
	this.instance_16.addEventListener("tick", AdobeAn.handleFilterCache);

	// Mask_Layer_30 (mask)
	var mask_3 = new cjs.Shape();
	mask_3._off = true;
	mask_3.graphics.p("AufNWIADwNIg1AAIG7gBIACp0Ig/AAIA/AAIAAgiIAAAiIOOAAIAAgvIABAvID3AAIj3AAIAEJzIAAAAIAAAAIAAAAIAZAAII6gBIizABIAHQVg");
	mask_3.setTransform(125.9748,229.0252);

	// Masked_Layer_99___30
	this.instance_17 = new lib.sprite173();
	this.instance_17.setTransform(119.95,273.55,3.0714,7.1941);
	this.instance_17.alpha = 0.7617;
	this.instance_17._off = true;

	var maskedShapeInstanceList = [this.instance_17];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_3;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(115).to({_off:false},0).wait(11));

	// Masked_Layer_95___30
	this.instance_18 = new lib.sprite173();
	this.instance_18.setTransform(190.6,308.6,0.9984,0.9984,-35.5935);
	this.instance_18._off = true;

	var maskedShapeInstanceList = [this.instance_18];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_3;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(89).to({_off:false},0).wait(37));

	// Masked_Layer_91___30
	this.instance_19 = new lib.sprite173();
	this.instance_19.setTransform(200.95,298.6,0.9975,0.9975,37.082);
	this.instance_19._off = true;

	var maskedShapeInstanceList = [this.instance_19];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_3;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(89).to({_off:false},0).wait(37));

	// Masked_Layer_87___30
	this.instance_20 = new lib.sprite173();
	this.instance_20.setTransform(199.4,306.9,0.9977,0.9977,40.8449);
	this.instance_20._off = true;

	var maskedShapeInstanceList = [this.instance_20];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_3;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(89).to({_off:false},0).wait(37));

	// Masked_Layer_83___30
	this.instance_21 = new lib.sprite173();
	this.instance_21.setTransform(187.15,284.65,0.9968,0.9968,12.5132);
	this.instance_21._off = true;

	var maskedShapeInstanceList = [this.instance_21];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_3;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(89).to({_off:false},0).wait(37));

	// Masked_Layer_79___30
	this.instance_22 = new lib.sprite173();
	this.instance_22.setTransform(185.1,302.95,0.9984,0.9984,-35.5935);
	this.instance_22._off = true;

	var maskedShapeInstanceList = [this.instance_22];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_3;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(89).to({_off:false},0).wait(37));

	// Masked_Layer_75___30
	this.instance_23 = new lib.sprite173();
	this.instance_23.setTransform(158.3,303.2,0.9984,0.9984,-35.5935);
	this.instance_23._off = true;

	var maskedShapeInstanceList = [this.instance_23];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_3;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(89).to({_off:false},0).wait(37));

	// Masked_Layer_71___30
	this.instance_24 = new lib.sprite173();
	this.instance_24.setTransform(66.2,287.6,0.9968,0.9968,12.5132);
	this.instance_24._off = true;

	var maskedShapeInstanceList = [this.instance_24];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_3;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(89).to({_off:false},0).wait(37));

	// Masked_Layer_67___30
	this.instance_25 = new lib.sprite173();
	this.instance_25.setTransform(64.15,305.9,0.9984,0.9984,-35.5935);
	this.instance_25._off = true;

	var maskedShapeInstanceList = [this.instance_25];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_3;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(89).to({_off:false},0).wait(37));

	// Masked_Layer_63___30
	this.instance_26 = new lib.sprite173();
	this.instance_26.setTransform(37.35,306.15,0.9984,0.9984,-35.5935);
	this.instance_26._off = true;

	var maskedShapeInstanceList = [this.instance_26];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_3;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(89).to({_off:false},0).wait(37));

	// Masked_Layer_61___30
	this.instance_27 = new lib.shape172("synched",0);
	this.instance_27.setTransform(83.4,308.15,0.5703,0.5703,-7.7618);
	this.instance_27.alpha = 0.5898;
	this.instance_27._off = true;

	var maskedShapeInstanceList = [this.instance_27];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_3;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_27).wait(24).to({_off:false},0).to({x:82.5,y:308.3},3).to({y:308.2},1).to({_off:true},1).wait(97));

	// Masked_Layer_60___30
	this.instance_28 = new lib.shape172("synched",0);
	this.instance_28.setTransform(83.4,308.15,0.5703,0.5703,-7.7618);
	this.instance_28.alpha = 0.5898;
	this.instance_28._off = true;

	var maskedShapeInstanceList = [this.instance_28];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_3;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_28).wait(24).to({_off:false},0).to({x:83.2,y:309.2,alpha:0.8594},2).to({scaleX:0.5349,scaleY:0.5295,rotation:-7.7623,x:83.05,y:309.7,alpha:1},2).to({_off:true},1).wait(97));

	// Masked_Layer_59___30
	this.instance_29 = new lib.shape172("synched",0);
	this.instance_29.setTransform(83.05,309.7,0.5703,0.5703,-7.7618);

	this.instance_30 = new lib.sprite173();
	this.instance_30.setTransform(83.05,309.7,0.5703,0.5703,-7.7618);
	this.instance_30._off = true;

	var maskedShapeInstanceList = [this.instance_29,this.instance_30];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_3;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_29}]},24).to({state:[{t:this.instance_30}]},5).to({state:[{t:this.instance_30}]},5).to({state:[{t:this.instance_30}]},4).to({state:[{t:this.instance_30}]},1).to({state:[{t:this.instance_30}]},1).to({state:[{t:this.instance_30}]},2).to({state:[{t:this.instance_30}]},1).to({state:[{t:this.instance_30}]},2).to({state:[{t:this.instance_30}]},1).to({state:[{t:this.instance_30}]},1).wait(79));
	this.timeline.addTween(cjs.Tween.get(this.instance_30).wait(29).to({_off:false},0).to({scaleX:0.7193,scaleY:0.7193,rotation:-7.7564,x:83.45,y:308.4},5).to({scaleX:0.8387,scaleY:0.8387,rotation:-7.7565,x:83.75,y:307.4},4).to({scaleX:0.8685,scaleY:0.8685,rotation:-7.7566,x:83.9,y:307.15},1).to({scaleX:0.8984,scaleY:0.8984,x:83.95,y:306.9},1).to({scaleX:0.9581,scaleY:0.9581,rotation:-7.7575,x:84.2,y:306.4},2).to({scaleX:0.9879,scaleY:0.9879,rotation:-7.7569,y:306.15},1).to({scaleX:1.0476,scaleY:1.0476,rotation:-7.7568,x:84.4,y:305.7},2).to({scaleX:1.0774,scaleY:1.0774,y:305.45},1).wait(1).to({scaleX:1.1077,scaleY:1.1077,rotation:-7.7614,x:84.55,y:305.2},0).wait(79));

	// Masked_Layer_55___30
	this.instance_31 = new lib.sprite173();
	this.instance_31.setTransform(169.55,300.8,0.9865,1.8556,14.9999);
	this.instance_31._off = true;

	var maskedShapeInstanceList = [this.instance_31];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_3;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_31).wait(24).to({_off:false},0).wait(9).to({scaleX:0.9988,scaleY:1.8788,rotation:14.8258,x:169.45,y:300.65},1).to({scaleX:1.0119,scaleY:1.9036,x:169.55,y:300.45},1).to({scaleX:1.0252,scaleY:1.9283,rotation:14.8253,x:169.5,y:300.35},1).to({scaleX:1.0383,scaleY:1.9531,rotation:14.8265,x:169.55,y:300.1},1).to({scaleX:1.0515,scaleY:1.9779,rotation:14.8254,x:169.5,y:299.95},1).to({scaleX:1.0646,scaleY:2.0026,rotation:14.8261,x:169.55,y:299.7},1).to({scaleX:1.091,scaleY:2.0522,rotation:14.8267,y:299.4},2).to({scaleX:1.1041,scaleY:2.0769,rotation:14.8253,x:169.5,y:299.25},1).to({scaleX:1.1304,scaleY:2.1264,rotation:14.826,y:298.9},2).to({scaleX:1.1436,scaleY:2.1511,rotation:14.825,x:169.55,y:298.75},1).to({scaleX:1.1568,scaleY:2.176,rotation:14.8252,x:169.5,y:298.6},1).to({scaleX:1.1699,scaleY:2.2007,rotation:14.8256,y:298.35},1).to({scaleX:1.1831,scaleY:2.2255,rotation:14.8259,x:169.45,y:298.2},1).to({scaleX:1.1962,scaleY:2.2502,rotation:14.8247,x:169.5,y:298},1).to({scaleX:1.2226,scaleY:2.2998,rotation:14.8257,y:297.65},2).to({scaleX:1.2357,scaleY:2.3246,rotation:14.8253,x:169.45,y:297.5},1).to({scaleX:1.2489,scaleY:2.3493,rotation:14.8248,x:169.55,y:297.4},1).to({scaleX:1.2621,scaleY:2.374,rotation:14.8255,x:169.5,y:297.2},1).to({scaleX:1.2752,scaleY:2.3988,rotation:14.826,x:169.55,y:297},1).to({scaleX:1.2884,scaleY:2.4236,rotation:14.8251,x:169.45,y:296.85},1).to({scaleX:1.3016,scaleY:2.4483,rotation:14.8254,y:296.65},1).to({scaleX:1.3147,scaleY:2.4731,rotation:14.8258,x:169.5,y:296.5},1).to({scaleX:1.3279,scaleY:2.4978,rotation:14.826,y:296.35},1).to({scaleX:1.341,scaleY:2.5226,rotation:14.8251,x:169.45,y:296.15},1).to({scaleX:1.3542,scaleY:2.5474,rotation:14.825,x:169.5,y:295.95},1).to({scaleX:1.3674,scaleY:2.5721,rotation:14.8254,y:295.8},1).to({scaleX:1.3806,scaleY:2.5969,rotation:14.8244,x:169.55,y:295.6},1).to({scaleX:1.3937,scaleY:2.6217,rotation:14.8258,x:169.5,y:295.4},1).to({scaleX:1.4068,scaleY:2.6464,rotation:14.825,x:169.45,y:295.3},1).to({scaleX:1.42,scaleY:2.6712,rotation:14.826,y:295.05},1).to({scaleX:1.4332,scaleY:2.6959,rotation:14.8248,x:169.5,y:294.95},1).to({scaleX:1.4595,scaleY:2.7454,rotation:14.8247,y:294.6},2).to({scaleX:1.4727,scaleY:2.7702,rotation:14.825,x:169.45,y:294.35},1).wait(1).to({scaleX:1.4871,scaleY:2.7973,rotation:14.9999,x:169.55,y:294.3},0).wait(55));

	// Masked_Layer_51___30
	this.instance_32 = new lib.sprite173();
	this.instance_32.setTransform(154.7,302.1);
	this.instance_32.alpha = 0.3203;
	this.instance_32._off = true;

	var maskedShapeInstanceList = [this.instance_32];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_3;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_32).wait(43).to({_off:false},0).to({scaleX:2.3725,scaleY:3.1383,x:173.95,y:291.15,alpha:0.9609},16).wait(1).to({scaleX:2.4583,scaleY:3.272,x:175.15,y:290.45,alpha:1},0).wait(66));

	// Masked_Layer_47___30
	this.instance_33 = new lib.sprite173();
	this.instance_33.setTransform(60.8,298.6,2.6776,2.6776);
	this.instance_33._off = true;

	var maskedShapeInstanceList = [this.instance_33];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_3;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_33).wait(100).to({_off:false},0).wait(26));

	// Masked_Layer_43___30
	this.instance_34 = new lib.sprite173();
	this.instance_34.setTransform(150.5,245.6,1.3831,2.9263,0,-6.6397,-12.0397);
	this.instance_34._off = true;

	var maskedShapeInstanceList = [this.instance_34];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_3;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_34).wait(113).to({_off:false},0).wait(13));

	// Masked_Layer_39___30
	this.instance_35 = new lib.sprite173();
	this.instance_35.setTransform(150.5,245.6,1.3831,2.9263,0,-6.6397,-12.0397);
	this.instance_35._off = true;

	var maskedShapeInstanceList = [this.instance_35];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_3;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_35).wait(107).to({_off:false},0).wait(6).to({scaleX:2.4847,scaleY:3.9682,skewX:-6.6395,skewY:9.5317,x:112,y:233.65},0).wait(13));

	// Masked_Layer_35___30
	this.instance_36 = new lib.sprite173();
	this.instance_36.setTransform(82.75,249.35,1.3691,2.3932,0,-6.6396,9.5318);
	this.instance_36._off = true;

	var maskedShapeInstanceList = [this.instance_36];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_3;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_36).wait(107).to({_off:false},0).wait(19));

	// Masked_Layer_33___30
	this.instance_37 = new lib.shape172("synched",0);
	this.instance_37.setTransform(54.95,303.05,1.8469,1.8469);
	this.instance_37.alpha = 0.0195;
	this.instance_37._off = true;

	var maskedShapeInstanceList = [this.instance_37];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_3;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_37).wait(56).to({_off:false},0).to({scaleX:1.847,scaleY:1.847,x:52.05,alpha:0.1602},3).to({y:302.1,alpha:0.3008},3).to({x:55,y:303.05,alpha:0.3516},1).to({x:52.05,alpha:0.4883},3).to({scaleX:1.8469,scaleY:1.8469,x:52,y:302.4,alpha:0.5898},2).to({scaleX:1.8729,scaleY:1.8729,x:52.25,y:301.9},1).to({scaleX:1.8989,scaleY:1.8989,x:55.5,y:302.55},1).to({scaleX:1.9767,scaleY:1.9767,x:53.05,y:301.85},3).to({scaleX:2.0027,scaleY:2.0027,x:53.3,y:301.4},1).to({scaleX:2.0546,scaleY:2.0546,x:53.7,y:300.25},2).to({scaleX:2.0806,scaleY:2.0806,x:57.25,y:301.05},1).to({scaleX:2.1584,scaleY:2.1584,x:54.55,y:300.35},3).to({scaleX:2.2363,scaleY:2.2363,x:55.15,y:298.5},3).to({scaleX:2.2623,scaleY:2.2623,x:59.05,y:299.45},1).to({scaleX:2.3401,scaleY:2.3401,x:56,y:298.75},3).to({scaleX:2.3661,scaleY:2.3661,x:56.25,y:298.2},1).to({scaleX:2.3921,scaleY:2.3921,x:56.4,y:297.45},1).to({scaleX:2.418,scaleY:2.418,x:56.65,y:296.9},1).to({scaleX:2.444,scaleY:2.444,x:60.8,y:297.85},1).to({scaleX:2.5219,scaleY:2.5219,x:57.5,y:297.25},3).to({scaleX:2.5478,scaleY:2.5478,x:57.65,y:296.6},1).to({scaleX:2.5738,scaleY:2.5738,x:57.95,y:295.9},1).to({scaleX:2.5997,scaleY:2.5997,x:58.1,y:295.25},1).to({scaleX:2.6257,scaleY:2.6257,x:62.6,y:296.3},1).to({scaleX:2.6516,scaleY:2.6516,x:61.3,y:296.1},1).to({_off:true},1).wait(26));

	// Masked_Layer_32___30
	this.instance_38 = new lib.shape172("synched",0);
	this.instance_38.setTransform(54.95,303.05,1.8469,1.8469);
	this.instance_38.alpha = 0.0195;
	this.instance_38._off = true;

	var maskedShapeInstanceList = [this.instance_38];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_3;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_38).wait(56).to({_off:false},0).to({scaleX:1.847,scaleY:1.847,x:54.35,y:304.6,alpha:0.0781},1).to({x:53.15,y:307.85,alpha:0.2813},2).to({scaleX:1.5025,scaleY:1.4503,alpha:0.5195},3).to({scaleX:1.847,scaleY:1.847,x:55,y:303.05,alpha:0.3516},1).to({x:54.35,y:304.6,alpha:0.4883},1).to({x:53.15,y:307.85,alpha:0.8398},2).to({scaleX:1.6173,scaleY:1.5825,x:53.1,alpha:1},2).to({scaleX:1.5236,scaleY:1.4707,x:53.35,y:307.7},1).to({scaleX:1.8989,scaleY:1.8989,x:55.5,y:302.55,alpha:0.5898},1).to({scaleX:1.9767,scaleY:1.9767,x:54.25,y:307,alpha:1},3).to({scaleX:1.8782,scaleY:1.8593,x:54.5,y:306.9},1).to({scaleX:1.7764,scaleY:1.7382,x:54.7,y:306.7},1).to({scaleX:1.6714,scaleY:1.6133,x:54.95,y:306.6},1).to({scaleX:2.0806,scaleY:2.0806,x:57.25,y:301.05,alpha:0.5898},1).to({scaleX:2.1584,scaleY:2.1584,x:55.85,y:305.95,alpha:1},3).to({scaleX:1.9355,scaleY:1.8939,x:56.3,y:305.65},2).to({scaleX:1.8192,scaleY:1.756,x:56.5,y:305.45},1).to({scaleX:2.2623,scaleY:2.2623,x:59.05,y:299.45,alpha:0.5898},1).to({scaleX:2.3401,scaleY:2.3401,x:57.4,y:304.85,alpha:1},3).to({scaleX:2.219,scaleY:2.1967,x:57.65,y:304.7},1).to({scaleX:2.0946,scaleY:2.0496,x:57.85,y:304.5},1).to({scaleX:1.967,scaleY:1.8987,x:58.1,y:304.4},1).to({scaleX:2.444,scaleY:2.444,x:60.8,y:297.85,alpha:0.5898},1).to({scaleX:2.5219,scaleY:2.5219,x:59,y:303.8,alpha:1},3).to({scaleX:2.3894,scaleY:2.3654,x:59.2,y:303.6},1).to({scaleX:2.2537,scaleY:2.2053,x:59.5,y:303.5},1).to({scaleX:2.1148,scaleY:2.0414,x:59.65,y:303.3},1).to({scaleX:2.6257,scaleY:2.6257,x:62.6,y:296.3,alpha:0.5898},1).to({scaleX:2.6516,scaleY:2.6516,x:61.8,y:298.35,alpha:0.7305},1).to({_off:true},1).wait(26));

	// Masked_Layer_31___30
	this.instance_39 = new lib.shape172("synched",0);
	this.instance_39.setTransform(53.1,307.85,1.8469,1.8469);
	this.instance_39.alpha = 0.0391;
	this.instance_39._off = true;

	this.instance_40 = new lib.sprite173();
	this.instance_40.setTransform(48.4,277.35,2.4567,3.7327,9.5315);
	this.instance_40.alpha = 0.3203;
	this.instance_40._off = true;

	var maskedShapeInstanceList = [this.instance_39,this.instance_40];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_3;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_39).wait(56).to({_off:false},0).to({alpha:1},12).to({scaleX:1.9508,scaleY:1.9508,x:54.05,y:307.2},4).to({scaleX:1.9767,scaleY:1.9767,x:54.25,y:307},1).to({scaleX:2.0027,scaleY:2.0027,x:54.5,y:306.9},1).to({scaleX:2.0287,scaleY:2.0287,x:54.7,y:306.7},1).to({scaleX:2.0546,scaleY:2.0546,x:54.95,y:306.6},1).to({scaleX:2.2104,scaleY:2.2104,x:56.3,y:305.65},6).to({scaleX:2.2363,scaleY:2.2363,x:56.5,y:305.45},1).to({scaleX:2.2623,scaleY:2.2623,x:56.8,y:305.35},1).to({scaleX:2.2882,scaleY:2.2882,x:56.95,y:305.15},1).to({scaleX:2.3142,scaleY:2.3142,x:57.25,y:305},1).to({scaleX:2.3401,scaleY:2.3401,x:57.4,y:304.85},1).to({scaleX:2.3661,scaleY:2.3661,x:57.65,y:304.7},1).to({scaleX:2.3921,scaleY:2.3921,x:57.85,y:304.5},1).to({scaleX:2.418,scaleY:2.418,x:58.1,y:304.4},1).to({scaleX:2.444,scaleY:2.444,x:58.35,y:304.2},1).to({scaleX:2.47,scaleY:2.47,x:58.55,y:304.1},1).to({scaleX:2.5219,scaleY:2.5219,x:59,y:303.8},2).to({scaleX:2.5478,scaleY:2.5478,x:59.2,y:303.6},1).to({scaleX:2.5738,scaleY:2.5738,x:59.5,y:303.5},1).to({scaleX:2.5997,scaleY:2.5997,x:59.65,y:303.3},1).to({scaleX:2.6257,scaleY:2.6257,x:59.95,y:303.15},1).to({scaleX:2.6516,scaleY:2.6516,x:60.1,y:303},1).to({_off:true},1).wait(26));
	this.timeline.addTween(cjs.Tween.get(this.instance_40).wait(100).to({_off:false},0).to({scaleX:2.4554,scaleY:3.7306,rotation:9.514,x:48.45,y:277.3,alpha:0.3789},1).to({alpha:0.9414},9).wait(1).to({scaleX:2.4567,scaleY:3.7327,rotation:9.5315,x:48.4,y:277.35,alpha:1},0).wait(15));

	// Layer_29
	this.instance_41 = new lib.shape92("synched",0);
	this.instance_41.setTransform(118.6,284.75);

	this.timeline.addTween(cjs.Tween.get(this.instance_41).to({y:353.75},23).wait(1).to({y:356.75},0).wait(102));

	// Layer_28
	this.instance_42 = new lib.shape91("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_42).to({_off:true},16).wait(110));

	// Mask_Layer_1 (mask)
	var mask_4 = new cjs.Shape();
	mask_4._off = true;
	mask_4.graphics.p("AnGJ7IAAybIDMAAICthaIB3AAICtBaIDwAAIAASbg");
	mask_4.setTransform(118.6,192.5);

	// Masked_Layer_13___1
	this.instance_43 = new lib.sprite80();
	this.instance_43.setTransform(125.65,149.5,0.668,0.668);
	this.instance_43.alpha = 0.8008;

	var maskedShapeInstanceList = [this.instance_43];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_4;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_43).to({alpha:1},12).to({y:142,alpha:0.2891},3).to({_off:true},1).wait(110));

	// Masked_Layer_11___1
	this.instance_44 = new lib.sprite80();
	this.instance_44.setTransform(145.15,159.55,0.668,0.668);
	this.instance_44.alpha = 0.8008;

	var maskedShapeInstanceList = [this.instance_44];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_4;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_44).to({alpha:1},11).to({y:151.55,alpha:0.2383},4).to({_off:true},1).wait(110));

	// Masked_Layer_9___1
	this.instance_45 = new lib.sprite80();
	this.instance_45.setTransform(101.4,162.95,0.668,0.668);
	this.instance_45.alpha = 0.8008;

	var maskedShapeInstanceList = [this.instance_45];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_4;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_45).to({alpha:1},7).to({y:152.95,alpha:0.0508},4).to({_off:true},1).wait(114));

	// Masked_Layer_7___1
	this.instance_46 = new lib.sprite80();
	this.instance_46.setTransform(93.95,176.55,0.668,0.668);
	this.instance_46.alpha = 0.8008;

	var maskedShapeInstanceList = [this.instance_46];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_4;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_46).to({alpha:1},4).to({y:166.55,alpha:0.0508},4).to({_off:true},1).wait(117));

	// Masked_Layer_5___1
	this.instance_47 = new lib.sprite80();
	this.instance_47.setTransform(138.4,192.7,0.668,0.668);
	this.instance_47.alpha = 0.6016;

	this.instance_48 = new lib.sprite168();
	this.instance_48.setTransform(119.55,190.9);
	this.instance_48._off = true;
	var instance_48Filter_2 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_48.filters = [instance_48Filter_2];
	this.instance_48.cache(-65,-60,127,110);

	var maskedShapeInstanceList = [this.instance_47,this.instance_48];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_4;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_47).to({y:182.7,alpha:0.0508},4).to({_off:true},1).wait(121));
	this.timeline.addTween(cjs.Tween.get(this.instance_48).wait(16).to({_off:false},0).wait(110));
	this.timeline.addTween(cjs.Tween.get(instance_48Filter_2).wait(16).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(18).to(new cjs.ColorFilter(0,0,0,1,0,0,0,0), 0).wait(92));

	// Masked_Layer_4___1
	this.instance_49 = new lib.shape108("synched",0);
	this.instance_49.setTransform(120.35,156.6,1,0.5008);
	var instance_49Filter_3 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_49.filters = [instance_49Filter_3];
	this.instance_49.cache(-54,-62,109,124);

	var maskedShapeInstanceList = [this.instance_49];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_4;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_49).to({startPosition:0},7).to({scaleY:0.5301,y:158.35},1).to({scaleY:0.873,y:178.85,alpha:0.1406},6).wait(1).to({scaleY:0.9302,y:182.3,alpha:0},0).wait(111));
	this.timeline.addTween(cjs.Tween.get(instance_49Filter_3).wait(8).to(new cjs.ColorFilter(0.48046875,0.48046875,0.48046875,1,131,131,131,0), 6).wait(1).to(new cjs.ColorFilter(0.3984375,0.3984375,0.3984375,1,153,153,153,0), 0).wait(111));

	// Masked_Layer_3___1
	this.instance_50 = new lib.shape109("synched",0);
	this.instance_50.setTransform(120.35,149.35,1,0.3796);
	var instance_50Filter_4 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_50.filters = [instance_50Filter_4];
	this.instance_50.cache(-54,-62,109,124);

	var maskedShapeInstanceList = [this.instance_50];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_4;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_50).to({scaleY:0.9301,y:182.3},19).to({scaleY:0.9772,y:185.15,alpha:0.8008},3).to({scaleY:1.1498,y:195.45,alpha:0.0703},11).wait(1).to({scaleY:1.1655,y:196.4,alpha:0},0).wait(92));
	this.timeline.addTween(cjs.Tween.get(instance_50Filter_4).to(new cjs.ColorFilter(0.69921875,0.69921875,0.69921875,1,0,0,0,0), 19).to(new cjs.ColorFilter(0.76171875,0.76171875,0.76171875,1,0,0,0,0), 3).to(new cjs.ColorFilter(0.98046875,0.98046875,0.98046875,1,0,0,0,0), 11).wait(1).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(92));

	// Masked_Layer_2___1
	this.instance_51 = new lib.shape78("synched",0);
	this.instance_51._off = true;

	var maskedShapeInstanceList = [this.instance_51];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_4;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_51).wait(20).to({_off:false},0).wait(106));

	this.filterCacheList = [];
	this.filterCacheList.push({instance: this.instance_14, startFrame:16, endFrame:16, x:-15, y:-41, w:30, h:67});
	this.filterCacheList.push({instance: this.instance_14, startFrame:17, endFrame:33, x:-15, y:-41, w:30, h:67});
	this.filterCacheList.push({instance: this.instance_14, startFrame:34, endFrame:34, x:-15, y:-41, w:30, h:67});
	this.filterCacheList.push({instance: this.instance_14, startFrame:34, endFrame:126, x:-15, y:-41, w:30, h:67});
	this.filterCacheList.push({instance: this.instance_48, startFrame:16, endFrame:16, x:-65, y:-60, w:127, h:110});
	this.filterCacheList.push({instance: this.instance_48, startFrame:17, endFrame:33, x:-65, y:-60, w:127, h:110});
	this.filterCacheList.push({instance: this.instance_48, startFrame:34, endFrame:34, x:-65, y:-60, w:127, h:110});
	this.filterCacheList.push({instance: this.instance_48, startFrame:34, endFrame:126, x:-65, y:-60, w:127, h:110});
	this.filterCacheList.push({instance: this.instance_49, startFrame:8, endFrame:8, x:-54, y:-62, w:109, h:124});
	this.filterCacheList.push({instance: this.instance_49, startFrame:9, endFrame:14, x:-54, y:-62, w:109, h:124});
	this.filterCacheList.push({instance: this.instance_49, startFrame:15, endFrame:15, x:-54, y:-62, w:109, h:124});
	this.filterCacheList.push({instance: this.instance_50, startFrame:1, endFrame:19, x:-54, y:-62, w:109, h:124});
	this.filterCacheList.push({instance: this.instance_50, startFrame:0, endFrame:0, x:-54, y:-62, w:109, h:124});
	this.filterCacheList.push({instance: this.instance_50, startFrame:20, endFrame:22, x:-54, y:-62, w:109, h:124});
	this.filterCacheList.push({instance: this.instance_50, startFrame:23, endFrame:33, x:-54, y:-62, w:109, h:124});
	this.filterCacheList.push({instance: this.instance_50, startFrame:34, endFrame:34, x:-54, y:-62, w:109, h:124});
	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(28.2,9.5,353.8,451.5);


(lib.sprite139 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_91
	this.instance = new lib.sprite105();
	this.instance.setTransform(162.8,312.6);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(400));

	// Layer_88
	this.instance_1 = new lib.sprite105();
	this.instance_1.setTransform(75.3,311.85);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(400));

	// Mask_Layer_82 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_0 = new cjs.Graphics().p("AoJEzIAAplIQUAAIAAJlg");
	var mask_graphics_1 = new cjs.Graphics().p("AoJE/IAAp9IQUAAIAAJ9g");
	var mask_graphics_2 = new cjs.Graphics().p("AoJFKIAAqUIQUAAIAAKUg");
	var mask_graphics_3 = new cjs.Graphics().p("AoJFWIAAqrIQUAAIAAKrg");
	var mask_graphics_4 = new cjs.Graphics().p("AoJFiIAArDIQUAAIAALDg");
	var mask_graphics_5 = new cjs.Graphics().p("AoJFuIAArbIQUAAIAALbg");
	var mask_graphics_6 = new cjs.Graphics().p("AoJF5IAArxIQUAAIAALxg");
	var mask_graphics_7 = new cjs.Graphics().p("AoJGFIAAsJIQUAAIAAMJg");
	var mask_graphics_8 = new cjs.Graphics().p("AoJGRIAAshIQUAAIAAMhg");
	var mask_graphics_9 = new cjs.Graphics().p("AoJGcIAAs3IQUAAIAAM3g");
	var mask_graphics_10 = new cjs.Graphics().p("AoJGoIAAtPIQUAAIAANPg");
	var mask_graphics_11 = new cjs.Graphics().p("AoJG0IAAtnIQUAAIAANng");
	var mask_graphics_12 = new cjs.Graphics().p("AoJHAIAAt/IQUAAIAAN/g");
	var mask_graphics_13 = new cjs.Graphics().p("AoJHLIAAuVIQUAAIAAOVg");
	var mask_graphics_14 = new cjs.Graphics().p("AoJHXIAAutIQUAAIAAOtg");
	var mask_graphics_15 = new cjs.Graphics().p("AoJHjIAAvFIQUAAIAAPFg");
	var mask_graphics_16 = new cjs.Graphics().p("AoJHvIAAvcIQUAAIAAPcg");
	var mask_graphics_17 = new cjs.Graphics().p("AoJH6IAAvzIQUAAIAAPzg");
	var mask_graphics_18 = new cjs.Graphics().p("AoJIGIAAwLIQUAAIAAQLg");
	var mask_graphics_19 = new cjs.Graphics().p("AoJISIAAwjIQUAAIAAQjg");
	var mask_graphics_20 = new cjs.Graphics().p("AoJIdIAAw5IQUAAIAAQ5g");
	var mask_graphics_21 = new cjs.Graphics().p("AoJIpIAAxRIQUAAIAARRg");
	var mask_graphics_22 = new cjs.Graphics().p("AoJI1IAAxpIQUAAIAARpg");
	var mask_graphics_23 = new cjs.Graphics().p("AoJJBIAAyAIQUAAIAASAg");
	var mask_graphics_24 = new cjs.Graphics().p("AoJJBIAAyAIQUAAIAASAg");
	var mask_graphics_25 = new cjs.Graphics().p("AoJJMIAAyXIQUAAIAASXg");
	var mask_graphics_26 = new cjs.Graphics().p("AoJJYIAAyvIQUAAIAASvg");
	var mask_graphics_27 = new cjs.Graphics().p("AoJJkIAAzHIQUAAIAATHg");
	var mask_graphics_28 = new cjs.Graphics().p("AoJJwIAAzfIQUAAIAATfg");
	var mask_graphics_29 = new cjs.Graphics().p("AoJJ8IAAz3IQUAAIAAT3g");
	var mask_graphics_30 = new cjs.Graphics().p("AoJKIIAA0PIQUAAIAAUPg");
	var mask_graphics_31 = new cjs.Graphics().p("AoJKUIAA0nIQUAAIAAUng");
	var mask_graphics_32 = new cjs.Graphics().p("AoJKfIAA09IQUAAIAAU9g");
	var mask_graphics_33 = new cjs.Graphics().p("AoJKrIAA1VIQUAAIAAVVg");
	var mask_graphics_34 = new cjs.Graphics().p("AoJK3IAA1tIQUAAIAAVtg");
	var mask_graphics_35 = new cjs.Graphics().p("AoJLDIAA2FIQUAAIAAWFg");
	var mask_graphics_36 = new cjs.Graphics().p("AoJLPIAA2dIQUAAIAAWdg");
	var mask_graphics_37 = new cjs.Graphics().p("AoJLbIAA20IQUAAIAAW0g");
	var mask_graphics_38 = new cjs.Graphics().p("AoJLmIAA3LIQUAAIAAXLg");
	var mask_graphics_39 = new cjs.Graphics().p("AoJLyIAA3jIQUAAIAAXjg");
	var mask_graphics_40 = new cjs.Graphics().p("AoJL+IAA37IQUAAIAAX7g");
	var mask_graphics_41 = new cjs.Graphics().p("AoJMKIAA4TIQUAAIAAYTg");
	var mask_graphics_42 = new cjs.Graphics().p("AoJMWIAA4rIQUAAIAAYrg");
	var mask_graphics_43 = new cjs.Graphics().p("AoJMiIAA5CIQUAAIAAZCg");
	var mask_graphics_44 = new cjs.Graphics().p("AoJMtIAA5ZIQUAAIAAZZg");
	var mask_graphics_45 = new cjs.Graphics().p("AoJM5IAA5xIQUAAIAAZxg");
	var mask_graphics_46 = new cjs.Graphics().p("AoJNFIAA6JIQUAAIAAaJg");
	var mask_graphics_47 = new cjs.Graphics().p("AoJNRIAA6hIQUAAIAAahg");
	var mask_graphics_48 = new cjs.Graphics().p("AoJNdIAA65IQUAAIAAa5g");
	var mask_graphics_49 = new cjs.Graphics().p("AoJNdIAA65IQUAAIAAa5g");
	var mask_graphics_50 = new cjs.Graphics().p("AoJNRIAA6hIQUAAIAAahg");
	var mask_graphics_51 = new cjs.Graphics().p("AoJNGIAA6KIQUAAIAAaKg");
	var mask_graphics_52 = new cjs.Graphics().p("AoJM6IAA5zIQUAAIAAZzg");
	var mask_graphics_53 = new cjs.Graphics().p("AoJMuIAA5bIQUAAIAAZbg");
	var mask_graphics_54 = new cjs.Graphics().p("AoJMjIAA5FIQUAAIAAZFg");
	var mask_graphics_55 = new cjs.Graphics().p("AoJMXIAA4tIQUAAIAAYtg");
	var mask_graphics_56 = new cjs.Graphics().p("AoJMMIAA4WIQUAAIAAYWg");
	var mask_graphics_57 = new cjs.Graphics().p("AoJMAIAA3/IQUAAIAAX/g");
	var mask_graphics_58 = new cjs.Graphics().p("AoJL0IAA3nIQUAAIAAXng");
	var mask_graphics_59 = new cjs.Graphics().p("AoJLpIAA3RIQUAAIAAXRg");
	var mask_graphics_60 = new cjs.Graphics().p("AoJLdIAA25IQUAAIAAW5g");
	var mask_graphics_61 = new cjs.Graphics().p("AoJLSIAA2jIQUAAIAAWjg");
	var mask_graphics_62 = new cjs.Graphics().p("AoJLGIAA2LIQUAAIAAWLg");
	var mask_graphics_63 = new cjs.Graphics().p("AoJK6IAA10IQUAAIAAV0g");
	var mask_graphics_64 = new cjs.Graphics().p("AoJKvIAA1dIQUAAIAAVdg");
	var mask_graphics_65 = new cjs.Graphics().p("AoJKjIAA1FIQUAAIAAVFg");
	var mask_graphics_66 = new cjs.Graphics().p("AoJKYIAA0vIQUAAIAAUvg");
	var mask_graphics_67 = new cjs.Graphics().p("AoJKMIAA0XIQUAAIAAUXg");
	var mask_graphics_68 = new cjs.Graphics().p("AoJKAIAA0AIQUAAIAAUAg");
	var mask_graphics_69 = new cjs.Graphics().p("AoJJ1IAAzpIQUAAIAATpg");
	var mask_graphics_70 = new cjs.Graphics().p("AoJJpIAAzRIQUAAIAATRg");
	var mask_graphics_71 = new cjs.Graphics().p("AoJJeIAAy7IQUAAIAAS7g");
	var mask_graphics_72 = new cjs.Graphics().p("AoJJSIAAyjIQUAAIAASjg");
	var mask_graphics_73 = new cjs.Graphics().p("AoJJGIAAyMIQUAAIAASMg");
	var mask_graphics_74 = new cjs.Graphics().p("AoJJGIAAyMIQUAAIAASMg");
	var mask_graphics_75 = new cjs.Graphics().p("AoJI6IAAxzIQUAAIAARzg");
	var mask_graphics_76 = new cjs.Graphics().p("AoJIuIAAxcIQUAAIAARcg");
	var mask_graphics_77 = new cjs.Graphics().p("AoJIiIAAxEIQUAAIAAREg");
	var mask_graphics_78 = new cjs.Graphics().p("AoJIWIAAwrIQUAAIAAQrg");
	var mask_graphics_79 = new cjs.Graphics().p("AoJIKIAAwUIQUAAIAAQUg");
	var mask_graphics_80 = new cjs.Graphics().p("AoJH/IAAv9IQUAAIAAP9g");
	var mask_graphics_81 = new cjs.Graphics().p("AoJHzIAAvlIQUAAIAAPlg");
	var mask_graphics_82 = new cjs.Graphics().p("AoJHnIAAvNIQUAAIAAPNg");
	var mask_graphics_83 = new cjs.Graphics().p("AoJHbIAAu1IQUAAIAAO1g");
	var mask_graphics_84 = new cjs.Graphics().p("AoJHPIAAudIQUAAIAAOdg");
	var mask_graphics_85 = new cjs.Graphics().p("AoJHDIAAuFIQUAAIAAOFg");
	var mask_graphics_86 = new cjs.Graphics().p("AoJG3IAAttIQUAAIAANtg");
	var mask_graphics_87 = new cjs.Graphics().p("AoJGrIAAtVIQUAAIAANVg");
	var mask_graphics_88 = new cjs.Graphics().p("AoJGfIAAs9IQUAAIAAM9g");
	var mask_graphics_89 = new cjs.Graphics().p("AoJGTIAAslIQUAAIAAMlg");
	var mask_graphics_90 = new cjs.Graphics().p("AoJGHIAAsNIQUAAIAAMNg");
	var mask_graphics_91 = new cjs.Graphics().p("AoJF7IAAr1IQUAAIAAL1g");
	var mask_graphics_92 = new cjs.Graphics().p("AoJFvIAArdIQUAAIAALdg");
	var mask_graphics_93 = new cjs.Graphics().p("AoJFjIAArFIQUAAIAALFg");
	var mask_graphics_94 = new cjs.Graphics().p("AoJFXIAAqtIQUAAIAAKtg");
	var mask_graphics_95 = new cjs.Graphics().p("AoJFLIAAqVIQUAAIAAKVg");
	var mask_graphics_96 = new cjs.Graphics().p("AoJE/IAAp9IQUAAIAAJ9g");
	var mask_graphics_97 = new cjs.Graphics().p("AoJEzIAAplIQUAAIAAJlg");
	var mask_graphics_98 = new cjs.Graphics().p("Ai1YlIAApnIQUAAIAAJng");
	var mask_graphics_99 = new cjs.Graphics().p("AoJEzIAAplIQUAAIAAJlg");
	var mask_graphics_100 = new cjs.Graphics().p("AoJE+IAAp7IQUAAIAAJ7g");
	var mask_graphics_101 = new cjs.Graphics().p("AoJFJIAAqSIQUAAIAAKSg");
	var mask_graphics_102 = new cjs.Graphics().p("AoJFVIAAqpIQUAAIAAKpg");
	var mask_graphics_103 = new cjs.Graphics().p("AoJFgIAAq/IQUAAIAAK/g");
	var mask_graphics_104 = new cjs.Graphics().p("AoJFrIAArVIQUAAIAALVg");
	var mask_graphics_105 = new cjs.Graphics().p("AoJF2IAArsIQUAAIAALsg");
	var mask_graphics_106 = new cjs.Graphics().p("AoJGCIAAsDIQUAAIAAMDg");
	var mask_graphics_107 = new cjs.Graphics().p("AoJGNIAAsZIQUAAIAAMZg");
	var mask_graphics_108 = new cjs.Graphics().p("AoJGYIAAsvIQUAAIAAMvg");
	var mask_graphics_109 = new cjs.Graphics().p("AoJGjIAAtGIQUAAIAANGg");
	var mask_graphics_110 = new cjs.Graphics().p("AoJGvIAAtdIQUAAIAANdg");
	var mask_graphics_111 = new cjs.Graphics().p("AoJG6IAAtzIQUAAIAANzg");
	var mask_graphics_112 = new cjs.Graphics().p("AoJHFIAAuJIQUAAIAAOJg");
	var mask_graphics_113 = new cjs.Graphics().p("AoJHQIAAufIQUAAIAAOfg");
	var mask_graphics_114 = new cjs.Graphics().p("AoJHbIAAu1IQUAAIAAO1g");
	var mask_graphics_115 = new cjs.Graphics().p("AoJHnIAAvMIQUAAIAAPMg");
	var mask_graphics_116 = new cjs.Graphics().p("AoJHyIAAvjIQUAAIAAPjg");
	var mask_graphics_117 = new cjs.Graphics().p("AoJH9IAAv5IQUAAIAAP5g");
	var mask_graphics_118 = new cjs.Graphics().p("AoJIIIAAwPIQUAAIAAQPg");
	var mask_graphics_119 = new cjs.Graphics().p("AoJIUIAAwmIQUAAIAAQmg");
	var mask_graphics_120 = new cjs.Graphics().p("AoJIfIAAw9IQUAAIAAQ9g");
	var mask_graphics_121 = new cjs.Graphics().p("AoJIqIAAxTIQUAAIAARTg");
	var mask_graphics_122 = new cjs.Graphics().p("AoJI1IAAxpIQUAAIAARpg");
	var mask_graphics_123 = new cjs.Graphics().p("AoJJBIAAyAIQUAAIAASAg");
	var mask_graphics_124 = new cjs.Graphics().p("AoJJBIAAyAIQUAAIAASAg");
	var mask_graphics_125 = new cjs.Graphics().p("AoJJMIAAyXIQUAAIAASXg");
	var mask_graphics_126 = new cjs.Graphics().p("AoJJYIAAyvIQUAAIAASvg");
	var mask_graphics_127 = new cjs.Graphics().p("AoJJkIAAzHIQUAAIAATHg");
	var mask_graphics_128 = new cjs.Graphics().p("AoJJwIAAzfIQUAAIAATfg");
	var mask_graphics_129 = new cjs.Graphics().p("AoJJ8IAAz3IQUAAIAAT3g");
	var mask_graphics_130 = new cjs.Graphics().p("AoJKIIAA0PIQUAAIAAUPg");
	var mask_graphics_131 = new cjs.Graphics().p("AoJKUIAA0nIQUAAIAAUng");
	var mask_graphics_132 = new cjs.Graphics().p("AoJKfIAA09IQUAAIAAU9g");
	var mask_graphics_133 = new cjs.Graphics().p("AoJKrIAA1VIQUAAIAAVVg");
	var mask_graphics_134 = new cjs.Graphics().p("AoJK3IAA1tIQUAAIAAVtg");
	var mask_graphics_135 = new cjs.Graphics().p("AoJLDIAA2FIQUAAIAAWFg");
	var mask_graphics_136 = new cjs.Graphics().p("AoJLPIAA2dIQUAAIAAWdg");
	var mask_graphics_137 = new cjs.Graphics().p("AoJLbIAA20IQUAAIAAW0g");
	var mask_graphics_138 = new cjs.Graphics().p("AoJLmIAA3LIQUAAIAAXLg");
	var mask_graphics_139 = new cjs.Graphics().p("AoJLyIAA3jIQUAAIAAXjg");
	var mask_graphics_140 = new cjs.Graphics().p("AoJL+IAA37IQUAAIAAX7g");
	var mask_graphics_141 = new cjs.Graphics().p("AoJMKIAA4TIQUAAIAAYTg");
	var mask_graphics_142 = new cjs.Graphics().p("AoJMWIAA4rIQUAAIAAYrg");
	var mask_graphics_143 = new cjs.Graphics().p("AoJMiIAA5CIQUAAIAAZCg");
	var mask_graphics_144 = new cjs.Graphics().p("AoJMtIAA5ZIQUAAIAAZZg");
	var mask_graphics_145 = new cjs.Graphics().p("AoJM5IAA5xIQUAAIAAZxg");
	var mask_graphics_146 = new cjs.Graphics().p("AoJNFIAA6JIQUAAIAAaJg");
	var mask_graphics_147 = new cjs.Graphics().p("AoJNRIAA6hIQUAAIAAahg");
	var mask_graphics_148 = new cjs.Graphics().p("AoJNdIAA65IQUAAIAAa5g");
	var mask_graphics_149 = new cjs.Graphics().p("AoJNdIAA65IQUAAIAAa5g");
	var mask_graphics_150 = new cjs.Graphics().p("AoJNRIAA6hIQUAAIAAahg");
	var mask_graphics_151 = new cjs.Graphics().p("AoJNGIAA6KIQUAAIAAaKg");
	var mask_graphics_152 = new cjs.Graphics().p("AoJM6IAA5zIQUAAIAAZzg");
	var mask_graphics_153 = new cjs.Graphics().p("AoJMuIAA5bIQUAAIAAZbg");
	var mask_graphics_154 = new cjs.Graphics().p("AoJMjIAA5FIQUAAIAAZFg");
	var mask_graphics_155 = new cjs.Graphics().p("AoJMXIAA4tIQUAAIAAYtg");
	var mask_graphics_156 = new cjs.Graphics().p("AoJMMIAA4WIQUAAIAAYWg");
	var mask_graphics_157 = new cjs.Graphics().p("AoJMAIAA3/IQUAAIAAX/g");
	var mask_graphics_158 = new cjs.Graphics().p("AoJL0IAA3nIQUAAIAAXng");
	var mask_graphics_159 = new cjs.Graphics().p("AoJLpIAA3RIQUAAIAAXRg");
	var mask_graphics_160 = new cjs.Graphics().p("AoJLdIAA25IQUAAIAAW5g");
	var mask_graphics_161 = new cjs.Graphics().p("AoJLSIAA2jIQUAAIAAWjg");
	var mask_graphics_162 = new cjs.Graphics().p("AoJLGIAA2LIQUAAIAAWLg");
	var mask_graphics_163 = new cjs.Graphics().p("AoJK6IAA10IQUAAIAAV0g");
	var mask_graphics_164 = new cjs.Graphics().p("AoJKvIAA1dIQUAAIAAVdg");
	var mask_graphics_165 = new cjs.Graphics().p("AoJKjIAA1FIQUAAIAAVFg");
	var mask_graphics_166 = new cjs.Graphics().p("AoJKYIAA0vIQUAAIAAUvg");
	var mask_graphics_167 = new cjs.Graphics().p("AoJKMIAA0XIQUAAIAAUXg");
	var mask_graphics_168 = new cjs.Graphics().p("AoJKAIAA0AIQUAAIAAUAg");
	var mask_graphics_169 = new cjs.Graphics().p("AoJJ1IAAzpIQUAAIAATpg");
	var mask_graphics_170 = new cjs.Graphics().p("AoJJpIAAzRIQUAAIAATRg");
	var mask_graphics_171 = new cjs.Graphics().p("AoJJeIAAy7IQUAAIAAS7g");
	var mask_graphics_172 = new cjs.Graphics().p("AoJJSIAAyjIQUAAIAASjg");
	var mask_graphics_173 = new cjs.Graphics().p("AoJJGIAAyMIQUAAIAASMg");
	var mask_graphics_174 = new cjs.Graphics().p("AoJJGIAAyMIQUAAIAASMg");
	var mask_graphics_175 = new cjs.Graphics().p("AoJI7IAAx1IQUAAIAAR1g");
	var mask_graphics_176 = new cjs.Graphics().p("AoJIvIAAxeIQUAAIAAReg");
	var mask_graphics_177 = new cjs.Graphics().p("AoJIkIAAxHIQUAAIAARHg");
	var mask_graphics_178 = new cjs.Graphics().p("AoJIYIAAwwIQUAAIAAQwg");
	var mask_graphics_179 = new cjs.Graphics().p("AoJINIAAwZIQUAAIAAQZg");
	var mask_graphics_180 = new cjs.Graphics().p("AoJIBIAAwCIQUAAIAAQCg");
	var mask_graphics_181 = new cjs.Graphics().p("AoJH2IAAvrIQUAAIAAPrg");
	var mask_graphics_182 = new cjs.Graphics().p("AoJHrIAAvVIQUAAIAAPVg");
	var mask_graphics_183 = new cjs.Graphics().p("AoJHfIAAu9IQUAAIAAO9g");
	var mask_graphics_184 = new cjs.Graphics().p("AoJHUIAAunIQUAAIAAOng");
	var mask_graphics_185 = new cjs.Graphics().p("AoJHIIAAuPIQUAAIAAOPg");
	var mask_graphics_186 = new cjs.Graphics().p("AoJG9IAAt5IQUAAIAAN5g");
	var mask_graphics_187 = new cjs.Graphics().p("AoJGxIAAthIQUAAIAANhg");
	var mask_graphics_188 = new cjs.Graphics().p("AoJGmIAAtLIQUAAIAANLg");
	var mask_graphics_189 = new cjs.Graphics().p("AoJGaIAAszIQUAAIAAMzg");
	var mask_graphics_190 = new cjs.Graphics().p("AoJGPIAAsdIQUAAIAAMdg");
	var mask_graphics_191 = new cjs.Graphics().p("AoJGDIAAsFIQUAAIAAMFg");
	var mask_graphics_192 = new cjs.Graphics().p("AoJF4IAArvIQUAAIAALvg");
	var mask_graphics_193 = new cjs.Graphics().p("AoJFtIAArZIQUAAIAALZg");
	var mask_graphics_194 = new cjs.Graphics().p("AoJFhIAArBIQUAAIAALBg");
	var mask_graphics_195 = new cjs.Graphics().p("AoJFWIAAqrIQUAAIAAKrg");
	var mask_graphics_196 = new cjs.Graphics().p("AoJFKIAAqTIQUAAIAAKTg");
	var mask_graphics_197 = new cjs.Graphics().p("AoJE/IAAp9IQUAAIAAJ9g");
	var mask_graphics_198 = new cjs.Graphics().p("AoJEzIAAplIQUAAIAAJlg");
	var mask_graphics_199 = new cjs.Graphics().p("Ai1YlIAApnIQUAAIAAJng");
	var mask_graphics_200 = new cjs.Graphics().p("AoJEzIAAplIQUAAIAAJlg");
	var mask_graphics_201 = new cjs.Graphics().p("AoJE/IAAp9IQUAAIAAJ9g");
	var mask_graphics_202 = new cjs.Graphics().p("AoJFKIAAqUIQUAAIAAKUg");
	var mask_graphics_203 = new cjs.Graphics().p("AoJFWIAAqrIQUAAIAAKrg");
	var mask_graphics_204 = new cjs.Graphics().p("AoJFiIAArDIQUAAIAALDg");
	var mask_graphics_205 = new cjs.Graphics().p("AoJFuIAArbIQUAAIAALbg");
	var mask_graphics_206 = new cjs.Graphics().p("AoJF5IAArxIQUAAIAALxg");
	var mask_graphics_207 = new cjs.Graphics().p("AoJGFIAAsJIQUAAIAAMJg");
	var mask_graphics_208 = new cjs.Graphics().p("AoJGRIAAshIQUAAIAAMhg");
	var mask_graphics_209 = new cjs.Graphics().p("AoJGcIAAs3IQUAAIAAM3g");
	var mask_graphics_210 = new cjs.Graphics().p("AoJGoIAAtPIQUAAIAANPg");
	var mask_graphics_211 = new cjs.Graphics().p("AoJG0IAAtnIQUAAIAANng");
	var mask_graphics_212 = new cjs.Graphics().p("AoJHAIAAt/IQUAAIAAN/g");
	var mask_graphics_213 = new cjs.Graphics().p("AoJHLIAAuVIQUAAIAAOVg");
	var mask_graphics_214 = new cjs.Graphics().p("AoJHXIAAutIQUAAIAAOtg");
	var mask_graphics_215 = new cjs.Graphics().p("AoJHjIAAvFIQUAAIAAPFg");
	var mask_graphics_216 = new cjs.Graphics().p("AoJHvIAAvcIQUAAIAAPcg");
	var mask_graphics_217 = new cjs.Graphics().p("AoJH6IAAvzIQUAAIAAPzg");
	var mask_graphics_218 = new cjs.Graphics().p("AoJIGIAAwLIQUAAIAAQLg");
	var mask_graphics_219 = new cjs.Graphics().p("AoJISIAAwjIQUAAIAAQjg");
	var mask_graphics_220 = new cjs.Graphics().p("AoJIdIAAw5IQUAAIAAQ5g");
	var mask_graphics_221 = new cjs.Graphics().p("AoJIpIAAxRIQUAAIAARRg");
	var mask_graphics_222 = new cjs.Graphics().p("AoJI1IAAxpIQUAAIAARpg");
	var mask_graphics_223 = new cjs.Graphics().p("AoJJBIAAyAIQUAAIAASAg");
	var mask_graphics_224 = new cjs.Graphics().p("AoJJBIAAyAIQUAAIAASAg");
	var mask_graphics_225 = new cjs.Graphics().p("AoJJMIAAyXIQUAAIAASXg");
	var mask_graphics_226 = new cjs.Graphics().p("AoJJYIAAyvIQUAAIAASvg");
	var mask_graphics_227 = new cjs.Graphics().p("AoJJkIAAzHIQUAAIAATHg");
	var mask_graphics_228 = new cjs.Graphics().p("AoJJwIAAzfIQUAAIAATfg");
	var mask_graphics_229 = new cjs.Graphics().p("AoJJ8IAAz3IQUAAIAAT3g");
	var mask_graphics_230 = new cjs.Graphics().p("AoJKIIAA0PIQUAAIAAUPg");
	var mask_graphics_231 = new cjs.Graphics().p("AoJKUIAA0nIQUAAIAAUng");
	var mask_graphics_232 = new cjs.Graphics().p("AoJKfIAA09IQUAAIAAU9g");
	var mask_graphics_233 = new cjs.Graphics().p("AoJKrIAA1VIQUAAIAAVVg");
	var mask_graphics_234 = new cjs.Graphics().p("AoJK3IAA1tIQUAAIAAVtg");
	var mask_graphics_235 = new cjs.Graphics().p("AoJLDIAA2FIQUAAIAAWFg");
	var mask_graphics_236 = new cjs.Graphics().p("AoJLPIAA2dIQUAAIAAWdg");
	var mask_graphics_237 = new cjs.Graphics().p("AoJLbIAA20IQUAAIAAW0g");
	var mask_graphics_238 = new cjs.Graphics().p("AoJLmIAA3LIQUAAIAAXLg");
	var mask_graphics_239 = new cjs.Graphics().p("AoJLyIAA3jIQUAAIAAXjg");
	var mask_graphics_240 = new cjs.Graphics().p("AoJL+IAA37IQUAAIAAX7g");
	var mask_graphics_241 = new cjs.Graphics().p("AoJMKIAA4TIQUAAIAAYTg");
	var mask_graphics_242 = new cjs.Graphics().p("AoJMWIAA4rIQUAAIAAYrg");
	var mask_graphics_243 = new cjs.Graphics().p("AoJMiIAA5CIQUAAIAAZCg");
	var mask_graphics_244 = new cjs.Graphics().p("AoJMtIAA5ZIQUAAIAAZZg");
	var mask_graphics_245 = new cjs.Graphics().p("AoJM5IAA5xIQUAAIAAZxg");
	var mask_graphics_246 = new cjs.Graphics().p("AoJNFIAA6JIQUAAIAAaJg");
	var mask_graphics_247 = new cjs.Graphics().p("AoJNRIAA6hIQUAAIAAahg");
	var mask_graphics_248 = new cjs.Graphics().p("AoJNdIAA65IQUAAIAAa5g");
	var mask_graphics_249 = new cjs.Graphics().p("AoJNdIAA65IQUAAIAAa5g");
	var mask_graphics_250 = new cjs.Graphics().p("AoJNRIAA6hIQUAAIAAahg");
	var mask_graphics_251 = new cjs.Graphics().p("AoJNGIAA6KIQUAAIAAaKg");
	var mask_graphics_252 = new cjs.Graphics().p("AoJM6IAA5zIQUAAIAAZzg");
	var mask_graphics_253 = new cjs.Graphics().p("AoJMuIAA5bIQUAAIAAZbg");
	var mask_graphics_254 = new cjs.Graphics().p("AoJMjIAA5FIQUAAIAAZFg");
	var mask_graphics_255 = new cjs.Graphics().p("AoJMXIAA4tIQUAAIAAYtg");
	var mask_graphics_256 = new cjs.Graphics().p("AoJMMIAA4WIQUAAIAAYWg");
	var mask_graphics_257 = new cjs.Graphics().p("AoJMAIAA3/IQUAAIAAX/g");
	var mask_graphics_258 = new cjs.Graphics().p("AoJL0IAA3nIQUAAIAAXng");
	var mask_graphics_259 = new cjs.Graphics().p("AoJLpIAA3RIQUAAIAAXRg");
	var mask_graphics_260 = new cjs.Graphics().p("AoJLdIAA25IQUAAIAAW5g");
	var mask_graphics_261 = new cjs.Graphics().p("AoJLSIAA2jIQUAAIAAWjg");
	var mask_graphics_262 = new cjs.Graphics().p("AoJLGIAA2LIQUAAIAAWLg");
	var mask_graphics_263 = new cjs.Graphics().p("AoJK6IAA10IQUAAIAAV0g");
	var mask_graphics_264 = new cjs.Graphics().p("AoJKvIAA1dIQUAAIAAVdg");
	var mask_graphics_265 = new cjs.Graphics().p("AoJKjIAA1FIQUAAIAAVFg");
	var mask_graphics_266 = new cjs.Graphics().p("AoJKYIAA0vIQUAAIAAUvg");
	var mask_graphics_267 = new cjs.Graphics().p("AoJKMIAA0XIQUAAIAAUXg");
	var mask_graphics_268 = new cjs.Graphics().p("AoJKAIAA0AIQUAAIAAUAg");
	var mask_graphics_269 = new cjs.Graphics().p("AoJJ1IAAzpIQUAAIAATpg");
	var mask_graphics_270 = new cjs.Graphics().p("AoJJpIAAzRIQUAAIAATRg");
	var mask_graphics_271 = new cjs.Graphics().p("AoJJeIAAy7IQUAAIAAS7g");
	var mask_graphics_272 = new cjs.Graphics().p("AoJJSIAAyjIQUAAIAASjg");
	var mask_graphics_273 = new cjs.Graphics().p("AoJJGIAAyMIQUAAIAASMg");
	var mask_graphics_274 = new cjs.Graphics().p("AoJJGIAAyMIQUAAIAASMg");
	var mask_graphics_275 = new cjs.Graphics().p("AoJI7IAAx1IQUAAIAAR1g");
	var mask_graphics_276 = new cjs.Graphics().p("AoJIvIAAxeIQUAAIAAReg");
	var mask_graphics_277 = new cjs.Graphics().p("AoJIkIAAxHIQUAAIAARHg");
	var mask_graphics_278 = new cjs.Graphics().p("AoJIYIAAwwIQUAAIAAQwg");
	var mask_graphics_279 = new cjs.Graphics().p("AoJINIAAwZIQUAAIAAQZg");
	var mask_graphics_280 = new cjs.Graphics().p("AoJIBIAAwCIQUAAIAAQCg");
	var mask_graphics_281 = new cjs.Graphics().p("AoJH2IAAvrIQUAAIAAPrg");
	var mask_graphics_282 = new cjs.Graphics().p("AoJHrIAAvVIQUAAIAAPVg");
	var mask_graphics_283 = new cjs.Graphics().p("AoJHfIAAu9IQUAAIAAO9g");
	var mask_graphics_284 = new cjs.Graphics().p("AoJHUIAAunIQUAAIAAOng");
	var mask_graphics_285 = new cjs.Graphics().p("AoJHIIAAuPIQUAAIAAOPg");
	var mask_graphics_286 = new cjs.Graphics().p("AoJG9IAAt5IQUAAIAAN5g");
	var mask_graphics_287 = new cjs.Graphics().p("AoJGxIAAthIQUAAIAANhg");
	var mask_graphics_288 = new cjs.Graphics().p("AoJGmIAAtLIQUAAIAANLg");
	var mask_graphics_289 = new cjs.Graphics().p("AoJGaIAAszIQUAAIAAMzg");
	var mask_graphics_290 = new cjs.Graphics().p("AoJGPIAAsdIQUAAIAAMdg");
	var mask_graphics_291 = new cjs.Graphics().p("AoJGDIAAsFIQUAAIAAMFg");
	var mask_graphics_292 = new cjs.Graphics().p("AoJF4IAArvIQUAAIAALvg");
	var mask_graphics_293 = new cjs.Graphics().p("AoJFtIAArZIQUAAIAALZg");
	var mask_graphics_294 = new cjs.Graphics().p("AoJFhIAArBIQUAAIAALBg");
	var mask_graphics_295 = new cjs.Graphics().p("AoJFWIAAqrIQUAAIAAKrg");
	var mask_graphics_296 = new cjs.Graphics().p("AoJFKIAAqTIQUAAIAAKTg");
	var mask_graphics_297 = new cjs.Graphics().p("AoJE/IAAp9IQUAAIAAJ9g");
	var mask_graphics_298 = new cjs.Graphics().p("AoJEzIAAplIQUAAIAAJlg");
	var mask_graphics_299 = new cjs.Graphics().p("Ai1YlIAApnIQUAAIAAJng");
	var mask_graphics_300 = new cjs.Graphics().p("AoJEzIAAplIQUAAIAAJlg");
	var mask_graphics_301 = new cjs.Graphics().p("AoJE/IAAp9IQUAAIAAJ9g");
	var mask_graphics_302 = new cjs.Graphics().p("AoJFKIAAqUIQUAAIAAKUg");
	var mask_graphics_303 = new cjs.Graphics().p("AoJFWIAAqrIQUAAIAAKrg");
	var mask_graphics_304 = new cjs.Graphics().p("AoJFiIAArDIQUAAIAALDg");
	var mask_graphics_305 = new cjs.Graphics().p("AoJFuIAArbIQUAAIAALbg");
	var mask_graphics_306 = new cjs.Graphics().p("AoJF5IAArxIQUAAIAALxg");
	var mask_graphics_307 = new cjs.Graphics().p("AoJGFIAAsJIQUAAIAAMJg");
	var mask_graphics_308 = new cjs.Graphics().p("AoJGRIAAshIQUAAIAAMhg");
	var mask_graphics_309 = new cjs.Graphics().p("AoJGcIAAs3IQUAAIAAM3g");
	var mask_graphics_310 = new cjs.Graphics().p("AoJGoIAAtPIQUAAIAANPg");
	var mask_graphics_311 = new cjs.Graphics().p("AoJG0IAAtnIQUAAIAANng");
	var mask_graphics_312 = new cjs.Graphics().p("AoJHAIAAt/IQUAAIAAN/g");
	var mask_graphics_313 = new cjs.Graphics().p("AoJHLIAAuVIQUAAIAAOVg");
	var mask_graphics_314 = new cjs.Graphics().p("AoJHXIAAutIQUAAIAAOtg");
	var mask_graphics_315 = new cjs.Graphics().p("AoJHjIAAvFIQUAAIAAPFg");
	var mask_graphics_316 = new cjs.Graphics().p("AoJHvIAAvcIQUAAIAAPcg");
	var mask_graphics_317 = new cjs.Graphics().p("AoJH6IAAvzIQUAAIAAPzg");
	var mask_graphics_318 = new cjs.Graphics().p("AoJIGIAAwLIQUAAIAAQLg");
	var mask_graphics_319 = new cjs.Graphics().p("AoJISIAAwjIQUAAIAAQjg");
	var mask_graphics_320 = new cjs.Graphics().p("AoJIdIAAw5IQUAAIAAQ5g");
	var mask_graphics_321 = new cjs.Graphics().p("AoJIpIAAxRIQUAAIAARRg");
	var mask_graphics_322 = new cjs.Graphics().p("AoJI1IAAxpIQUAAIAARpg");
	var mask_graphics_323 = new cjs.Graphics().p("AoJJBIAAyAIQUAAIAASAg");
	var mask_graphics_324 = new cjs.Graphics().p("AoJJBIAAyAIQUAAIAASAg");
	var mask_graphics_325 = new cjs.Graphics().p("AoJJMIAAyXIQUAAIAASXg");
	var mask_graphics_326 = new cjs.Graphics().p("AoJJYIAAyvIQUAAIAASvg");
	var mask_graphics_327 = new cjs.Graphics().p("AoJJkIAAzHIQUAAIAATHg");
	var mask_graphics_328 = new cjs.Graphics().p("AoJJwIAAzfIQUAAIAATfg");
	var mask_graphics_329 = new cjs.Graphics().p("AoJJ8IAAz3IQUAAIAAT3g");
	var mask_graphics_330 = new cjs.Graphics().p("AoJKIIAA0PIQUAAIAAUPg");
	var mask_graphics_331 = new cjs.Graphics().p("AoJKUIAA0nIQUAAIAAUng");
	var mask_graphics_332 = new cjs.Graphics().p("AoJKfIAA09IQUAAIAAU9g");
	var mask_graphics_333 = new cjs.Graphics().p("AoJKrIAA1VIQUAAIAAVVg");
	var mask_graphics_334 = new cjs.Graphics().p("AoJK3IAA1tIQUAAIAAVtg");
	var mask_graphics_335 = new cjs.Graphics().p("AoJLDIAA2FIQUAAIAAWFg");
	var mask_graphics_336 = new cjs.Graphics().p("AoJLPIAA2dIQUAAIAAWdg");
	var mask_graphics_337 = new cjs.Graphics().p("AoJLbIAA20IQUAAIAAW0g");
	var mask_graphics_338 = new cjs.Graphics().p("AoJLmIAA3LIQUAAIAAXLg");
	var mask_graphics_339 = new cjs.Graphics().p("AoJLyIAA3jIQUAAIAAXjg");
	var mask_graphics_340 = new cjs.Graphics().p("AoJL+IAA37IQUAAIAAX7g");
	var mask_graphics_341 = new cjs.Graphics().p("AoJMKIAA4TIQUAAIAAYTg");
	var mask_graphics_342 = new cjs.Graphics().p("AoJMWIAA4rIQUAAIAAYrg");
	var mask_graphics_343 = new cjs.Graphics().p("AoJMiIAA5CIQUAAIAAZCg");
	var mask_graphics_344 = new cjs.Graphics().p("AoJMtIAA5ZIQUAAIAAZZg");
	var mask_graphics_345 = new cjs.Graphics().p("AoJM5IAA5xIQUAAIAAZxg");
	var mask_graphics_346 = new cjs.Graphics().p("AoJNFIAA6JIQUAAIAAaJg");
	var mask_graphics_347 = new cjs.Graphics().p("AoJNRIAA6hIQUAAIAAahg");
	var mask_graphics_348 = new cjs.Graphics().p("AoJNdIAA65IQUAAIAAa5g");
	var mask_graphics_349 = new cjs.Graphics().p("AoJNdIAA65IQUAAIAAa5g");
	var mask_graphics_350 = new cjs.Graphics().p("AoJNRIAA6hIQUAAIAAahg");
	var mask_graphics_351 = new cjs.Graphics().p("AoJNGIAA6KIQUAAIAAaKg");
	var mask_graphics_352 = new cjs.Graphics().p("AoJM6IAA5zIQUAAIAAZzg");
	var mask_graphics_353 = new cjs.Graphics().p("AoJMuIAA5bIQUAAIAAZbg");
	var mask_graphics_354 = new cjs.Graphics().p("AoJMjIAA5FIQUAAIAAZFg");
	var mask_graphics_355 = new cjs.Graphics().p("AoJMXIAA4tIQUAAIAAYtg");
	var mask_graphics_356 = new cjs.Graphics().p("AoJMMIAA4WIQUAAIAAYWg");
	var mask_graphics_357 = new cjs.Graphics().p("AoJMAIAA3/IQUAAIAAX/g");
	var mask_graphics_358 = new cjs.Graphics().p("AoJL0IAA3nIQUAAIAAXng");
	var mask_graphics_359 = new cjs.Graphics().p("AoJLpIAA3RIQUAAIAAXRg");
	var mask_graphics_360 = new cjs.Graphics().p("AoJLdIAA25IQUAAIAAW5g");
	var mask_graphics_361 = new cjs.Graphics().p("AoJLSIAA2jIQUAAIAAWjg");
	var mask_graphics_362 = new cjs.Graphics().p("AoJLGIAA2LIQUAAIAAWLg");
	var mask_graphics_363 = new cjs.Graphics().p("AoJK6IAA10IQUAAIAAV0g");
	var mask_graphics_364 = new cjs.Graphics().p("AoJKvIAA1dIQUAAIAAVdg");
	var mask_graphics_365 = new cjs.Graphics().p("AoJKjIAA1FIQUAAIAAVFg");
	var mask_graphics_366 = new cjs.Graphics().p("AoJKYIAA0vIQUAAIAAUvg");
	var mask_graphics_367 = new cjs.Graphics().p("AoJKMIAA0XIQUAAIAAUXg");
	var mask_graphics_368 = new cjs.Graphics().p("AoJKAIAA0AIQUAAIAAUAg");
	var mask_graphics_369 = new cjs.Graphics().p("AoJJ1IAAzpIQUAAIAATpg");
	var mask_graphics_370 = new cjs.Graphics().p("AoJJpIAAzRIQUAAIAATRg");
	var mask_graphics_371 = new cjs.Graphics().p("AoJJeIAAy7IQUAAIAAS7g");
	var mask_graphics_372 = new cjs.Graphics().p("AoJJSIAAyjIQUAAIAASjg");
	var mask_graphics_373 = new cjs.Graphics().p("AoJJGIAAyMIQUAAIAASMg");
	var mask_graphics_374 = new cjs.Graphics().p("AoJJGIAAyMIQUAAIAASMg");
	var mask_graphics_375 = new cjs.Graphics().p("AoJI7IAAx1IQUAAIAAR1g");
	var mask_graphics_376 = new cjs.Graphics().p("AoJIvIAAxeIQUAAIAAReg");
	var mask_graphics_377 = new cjs.Graphics().p("AoJIkIAAxHIQUAAIAARHg");
	var mask_graphics_378 = new cjs.Graphics().p("AoJIYIAAwwIQUAAIAAQwg");
	var mask_graphics_379 = new cjs.Graphics().p("AoJINIAAwZIQUAAIAAQZg");
	var mask_graphics_380 = new cjs.Graphics().p("AoJIBIAAwCIQUAAIAAQCg");
	var mask_graphics_381 = new cjs.Graphics().p("AoJH2IAAvrIQUAAIAAPrg");
	var mask_graphics_382 = new cjs.Graphics().p("AoJHrIAAvVIQUAAIAAPVg");
	var mask_graphics_383 = new cjs.Graphics().p("AoJHfIAAu9IQUAAIAAO9g");
	var mask_graphics_384 = new cjs.Graphics().p("AoJHUIAAunIQUAAIAAOng");
	var mask_graphics_385 = new cjs.Graphics().p("AoJHIIAAuPIQUAAIAAOPg");
	var mask_graphics_386 = new cjs.Graphics().p("AoJG9IAAt5IQUAAIAAN5g");
	var mask_graphics_387 = new cjs.Graphics().p("AoJGxIAAthIQUAAIAANhg");
	var mask_graphics_388 = new cjs.Graphics().p("AoJGmIAAtLIQUAAIAANLg");
	var mask_graphics_389 = new cjs.Graphics().p("AoJGaIAAszIQUAAIAAMzg");
	var mask_graphics_390 = new cjs.Graphics().p("AoJGPIAAsdIQUAAIAAMdg");
	var mask_graphics_391 = new cjs.Graphics().p("AoJGDIAAsFIQUAAIAAMFg");
	var mask_graphics_392 = new cjs.Graphics().p("AoJF4IAArvIQUAAIAALvg");
	var mask_graphics_393 = new cjs.Graphics().p("AoJFtIAArZIQUAAIAALZg");
	var mask_graphics_394 = new cjs.Graphics().p("AoJFhIAArBIQUAAIAALBg");
	var mask_graphics_395 = new cjs.Graphics().p("AoJFWIAAqrIQUAAIAAKrg");
	var mask_graphics_396 = new cjs.Graphics().p("AoJFKIAAqTIQUAAIAAKTg");
	var mask_graphics_397 = new cjs.Graphics().p("AoJE/IAAp9IQUAAIAAJ9g");
	var mask_graphics_398 = new cjs.Graphics().p("AoJEzIAAplIQUAAIAAJlg");
	var mask_graphics_399 = new cjs.Graphics().p("Ai1YlIAApnIQUAAIAAJng");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:mask_graphics_0,x:120.35,y:283.8}).wait(1).to({graphics:mask_graphics_1,x:120.35,y:282.625}).wait(1).to({graphics:mask_graphics_2,x:120.35,y:281.45}).wait(1).to({graphics:mask_graphics_3,x:120.35,y:280.275}).wait(1).to({graphics:mask_graphics_4,x:120.35,y:279.1}).wait(1).to({graphics:mask_graphics_5,x:120.35,y:277.925}).wait(1).to({graphics:mask_graphics_6,x:120.35,y:276.775}).wait(1).to({graphics:mask_graphics_7,x:120.35,y:275.6}).wait(1).to({graphics:mask_graphics_8,x:120.35,y:274.425}).wait(1).to({graphics:mask_graphics_9,x:120.35,y:273.25}).wait(1).to({graphics:mask_graphics_10,x:120.35,y:272.075}).wait(1).to({graphics:mask_graphics_11,x:120.35,y:270.9}).wait(1).to({graphics:mask_graphics_12,x:120.35,y:269.7}).wait(1).to({graphics:mask_graphics_13,x:120.35,y:268.525}).wait(1).to({graphics:mask_graphics_14,x:120.35,y:267.35}).wait(1).to({graphics:mask_graphics_15,x:120.35,y:266.175}).wait(1).to({graphics:mask_graphics_16,x:120.35,y:265}).wait(1).to({graphics:mask_graphics_17,x:120.35,y:263.825}).wait(1).to({graphics:mask_graphics_18,x:120.35,y:262.675}).wait(1).to({graphics:mask_graphics_19,x:120.35,y:261.5}).wait(1).to({graphics:mask_graphics_20,x:120.35,y:260.325}).wait(1).to({graphics:mask_graphics_21,x:120.35,y:259.15}).wait(1).to({graphics:mask_graphics_22,x:120.35,y:257.975}).wait(1).to({graphics:mask_graphics_23,x:120.35,y:256.8}).wait(1).to({graphics:mask_graphics_24,x:120.35,y:256.8}).wait(1).to({graphics:mask_graphics_25,x:120.35,y:255.625}).wait(1).to({graphics:mask_graphics_26,x:120.35,y:254.425}).wait(1).to({graphics:mask_graphics_27,x:120.35,y:253.25}).wait(1).to({graphics:mask_graphics_28,x:120.35,y:252.05}).wait(1).to({graphics:mask_graphics_29,x:120.35,y:250.875}).wait(1).to({graphics:mask_graphics_30,x:120.35,y:249.7}).wait(1).to({graphics:mask_graphics_31,x:120.35,y:248.5}).wait(1).to({graphics:mask_graphics_32,x:120.35,y:247.325}).wait(1).to({graphics:mask_graphics_33,x:120.35,y:246.15}).wait(1).to({graphics:mask_graphics_34,x:120.35,y:244.95}).wait(1).to({graphics:mask_graphics_35,x:120.35,y:243.775}).wait(1).to({graphics:mask_graphics_36,x:120.35,y:242.6}).wait(1).to({graphics:mask_graphics_37,x:120.35,y:241.4}).wait(1).to({graphics:mask_graphics_38,x:120.35,y:240.225}).wait(1).to({graphics:mask_graphics_39,x:120.35,y:239.025}).wait(1).to({graphics:mask_graphics_40,x:120.35,y:237.85}).wait(1).to({graphics:mask_graphics_41,x:120.35,y:236.675}).wait(1).to({graphics:mask_graphics_42,x:120.35,y:235.475}).wait(1).to({graphics:mask_graphics_43,x:120.35,y:234.3}).wait(1).to({graphics:mask_graphics_44,x:120.35,y:233.125}).wait(1).to({graphics:mask_graphics_45,x:120.35,y:231.925}).wait(1).to({graphics:mask_graphics_46,x:120.35,y:230.75}).wait(1).to({graphics:mask_graphics_47,x:120.35,y:229.55}).wait(1).to({graphics:mask_graphics_48,x:120.35,y:228.375}).wait(1).to({graphics:mask_graphics_49,x:120.35,y:228.375}).wait(1).to({graphics:mask_graphics_50,x:120.35,y:229.525}).wait(1).to({graphics:mask_graphics_51,x:120.35,y:230.7}).wait(1).to({graphics:mask_graphics_52,x:120.35,y:231.85}).wait(1).to({graphics:mask_graphics_53,x:120.35,y:233.025}).wait(1).to({graphics:mask_graphics_54,x:120.35,y:234.175}).wait(1).to({graphics:mask_graphics_55,x:120.35,y:235.35}).wait(1).to({graphics:mask_graphics_56,x:120.35,y:236.5}).wait(1).to({graphics:mask_graphics_57,x:120.35,y:237.65}).wait(1).to({graphics:mask_graphics_58,x:120.35,y:238.825}).wait(1).to({graphics:mask_graphics_59,x:120.35,y:239.975}).wait(1).to({graphics:mask_graphics_60,x:120.35,y:241.15}).wait(1).to({graphics:mask_graphics_61,x:120.35,y:242.325}).wait(1).to({graphics:mask_graphics_62,x:120.35,y:243.475}).wait(1).to({graphics:mask_graphics_63,x:120.35,y:244.65}).wait(1).to({graphics:mask_graphics_64,x:120.35,y:245.8}).wait(1).to({graphics:mask_graphics_65,x:120.35,y:246.975}).wait(1).to({graphics:mask_graphics_66,x:120.35,y:248.125}).wait(1).to({graphics:mask_graphics_67,x:120.35,y:249.3}).wait(1).to({graphics:mask_graphics_68,x:120.35,y:250.45}).wait(1).to({graphics:mask_graphics_69,x:120.35,y:251.6}).wait(1).to({graphics:mask_graphics_70,x:120.35,y:252.775}).wait(1).to({graphics:mask_graphics_71,x:120.35,y:253.925}).wait(1).to({graphics:mask_graphics_72,x:120.35,y:255.1}).wait(1).to({graphics:mask_graphics_73,x:120.35,y:256.25}).wait(1).to({graphics:mask_graphics_74,x:120.35,y:256.25}).wait(1).to({graphics:mask_graphics_75,x:120.35,y:257.45}).wait(1).to({graphics:mask_graphics_76,x:120.35,y:258.65}).wait(1).to({graphics:mask_graphics_77,x:120.35,y:259.85}).wait(1).to({graphics:mask_graphics_78,x:120.35,y:261.05}).wait(1).to({graphics:mask_graphics_79,x:120.35,y:262.25}).wait(1).to({graphics:mask_graphics_80,x:120.35,y:263.425}).wait(1).to({graphics:mask_graphics_81,x:120.35,y:264.625}).wait(1).to({graphics:mask_graphics_82,x:120.35,y:265.825}).wait(1).to({graphics:mask_graphics_83,x:120.35,y:267.025}).wait(1).to({graphics:mask_graphics_84,x:120.35,y:268.225}).wait(1).to({graphics:mask_graphics_85,x:120.35,y:269.425}).wait(1).to({graphics:mask_graphics_86,x:120.35,y:270.65}).wait(1).to({graphics:mask_graphics_87,x:120.35,y:271.85}).wait(1).to({graphics:mask_graphics_88,x:120.35,y:273.05}).wait(1).to({graphics:mask_graphics_89,x:120.35,y:274.25}).wait(1).to({graphics:mask_graphics_90,x:120.35,y:275.45}).wait(1).to({graphics:mask_graphics_91,x:120.35,y:276.65}).wait(1).to({graphics:mask_graphics_92,x:120.35,y:277.825}).wait(1).to({graphics:mask_graphics_93,x:120.35,y:279.025}).wait(1).to({graphics:mask_graphics_94,x:120.35,y:280.225}).wait(1).to({graphics:mask_graphics_95,x:120.35,y:281.425}).wait(1).to({graphics:mask_graphics_96,x:120.35,y:282.625}).wait(1).to({graphics:mask_graphics_97,x:120.35,y:283.825}).wait(1).to({graphics:mask_graphics_98,x:86.3,y:157.2862}).wait(1).to({graphics:mask_graphics_99,x:120.35,y:283.8}).wait(1).to({graphics:mask_graphics_100,x:120.35,y:282.675}).wait(1).to({graphics:mask_graphics_101,x:120.35,y:281.55}).wait(1).to({graphics:mask_graphics_102,x:120.35,y:280.425}).wait(1).to({graphics:mask_graphics_103,x:120.35,y:279.3}).wait(1).to({graphics:mask_graphics_104,x:120.35,y:278.175}).wait(1).to({graphics:mask_graphics_105,x:120.35,y:277.05}).wait(1).to({graphics:mask_graphics_106,x:120.35,y:275.925}).wait(1).to({graphics:mask_graphics_107,x:120.35,y:274.8}).wait(1).to({graphics:mask_graphics_108,x:120.35,y:273.675}).wait(1).to({graphics:mask_graphics_109,x:120.35,y:272.55}).wait(1).to({graphics:mask_graphics_110,x:120.35,y:271.425}).wait(1).to({graphics:mask_graphics_111,x:120.35,y:270.325}).wait(1).to({graphics:mask_graphics_112,x:120.35,y:269.175}).wait(1).to({graphics:mask_graphics_113,x:120.35,y:268.05}).wait(1).to({graphics:mask_graphics_114,x:120.35,y:266.925}).wait(1).to({graphics:mask_graphics_115,x:120.35,y:265.8}).wait(1).to({graphics:mask_graphics_116,x:120.35,y:264.675}).wait(1).to({graphics:mask_graphics_117,x:120.35,y:263.55}).wait(1).to({graphics:mask_graphics_118,x:120.35,y:262.425}).wait(1).to({graphics:mask_graphics_119,x:120.35,y:261.3}).wait(1).to({graphics:mask_graphics_120,x:120.35,y:260.175}).wait(1).to({graphics:mask_graphics_121,x:120.35,y:259.05}).wait(1).to({graphics:mask_graphics_122,x:120.35,y:257.925}).wait(1).to({graphics:mask_graphics_123,x:120.35,y:256.8}).wait(1).to({graphics:mask_graphics_124,x:120.35,y:256.8}).wait(1).to({graphics:mask_graphics_125,x:120.35,y:255.625}).wait(1).to({graphics:mask_graphics_126,x:120.35,y:254.425}).wait(1).to({graphics:mask_graphics_127,x:120.35,y:253.25}).wait(1).to({graphics:mask_graphics_128,x:120.35,y:252.05}).wait(1).to({graphics:mask_graphics_129,x:120.35,y:250.875}).wait(1).to({graphics:mask_graphics_130,x:120.35,y:249.7}).wait(1).to({graphics:mask_graphics_131,x:120.35,y:248.5}).wait(1).to({graphics:mask_graphics_132,x:120.35,y:247.325}).wait(1).to({graphics:mask_graphics_133,x:120.35,y:246.15}).wait(1).to({graphics:mask_graphics_134,x:120.35,y:244.95}).wait(1).to({graphics:mask_graphics_135,x:120.35,y:243.775}).wait(1).to({graphics:mask_graphics_136,x:120.35,y:242.6}).wait(1).to({graphics:mask_graphics_137,x:120.35,y:241.4}).wait(1).to({graphics:mask_graphics_138,x:120.35,y:240.225}).wait(1).to({graphics:mask_graphics_139,x:120.35,y:239.025}).wait(1).to({graphics:mask_graphics_140,x:120.35,y:237.85}).wait(1).to({graphics:mask_graphics_141,x:120.35,y:236.675}).wait(1).to({graphics:mask_graphics_142,x:120.35,y:235.475}).wait(1).to({graphics:mask_graphics_143,x:120.35,y:234.3}).wait(1).to({graphics:mask_graphics_144,x:120.35,y:233.125}).wait(1).to({graphics:mask_graphics_145,x:120.35,y:231.925}).wait(1).to({graphics:mask_graphics_146,x:120.35,y:230.75}).wait(1).to({graphics:mask_graphics_147,x:120.35,y:229.55}).wait(1).to({graphics:mask_graphics_148,x:120.35,y:228.375}).wait(1).to({graphics:mask_graphics_149,x:120.35,y:228.375}).wait(1).to({graphics:mask_graphics_150,x:120.35,y:229.525}).wait(1).to({graphics:mask_graphics_151,x:120.35,y:230.7}).wait(1).to({graphics:mask_graphics_152,x:120.35,y:231.85}).wait(1).to({graphics:mask_graphics_153,x:120.35,y:233.025}).wait(1).to({graphics:mask_graphics_154,x:120.35,y:234.175}).wait(1).to({graphics:mask_graphics_155,x:120.35,y:235.35}).wait(1).to({graphics:mask_graphics_156,x:120.35,y:236.5}).wait(1).to({graphics:mask_graphics_157,x:120.35,y:237.65}).wait(1).to({graphics:mask_graphics_158,x:120.35,y:238.825}).wait(1).to({graphics:mask_graphics_159,x:120.35,y:239.975}).wait(1).to({graphics:mask_graphics_160,x:120.35,y:241.15}).wait(1).to({graphics:mask_graphics_161,x:120.35,y:242.325}).wait(1).to({graphics:mask_graphics_162,x:120.35,y:243.475}).wait(1).to({graphics:mask_graphics_163,x:120.35,y:244.65}).wait(1).to({graphics:mask_graphics_164,x:120.35,y:245.8}).wait(1).to({graphics:mask_graphics_165,x:120.35,y:246.975}).wait(1).to({graphics:mask_graphics_166,x:120.35,y:248.125}).wait(1).to({graphics:mask_graphics_167,x:120.35,y:249.3}).wait(1).to({graphics:mask_graphics_168,x:120.35,y:250.45}).wait(1).to({graphics:mask_graphics_169,x:120.35,y:251.6}).wait(1).to({graphics:mask_graphics_170,x:120.35,y:252.775}).wait(1).to({graphics:mask_graphics_171,x:120.35,y:253.925}).wait(1).to({graphics:mask_graphics_172,x:120.35,y:255.1}).wait(1).to({graphics:mask_graphics_173,x:120.35,y:256.25}).wait(1).to({graphics:mask_graphics_174,x:120.35,y:256.25}).wait(1).to({graphics:mask_graphics_175,x:120.35,y:257.4}).wait(1).to({graphics:mask_graphics_176,x:120.35,y:258.55}).wait(1).to({graphics:mask_graphics_177,x:120.35,y:259.7}).wait(1).to({graphics:mask_graphics_178,x:120.35,y:260.85}).wait(1).to({graphics:mask_graphics_179,x:120.35,y:262}).wait(1).to({graphics:mask_graphics_180,x:120.35,y:263.15}).wait(1).to({graphics:mask_graphics_181,x:120.35,y:264.275}).wait(1).to({graphics:mask_graphics_182,x:120.35,y:265.425}).wait(1).to({graphics:mask_graphics_183,x:120.35,y:266.575}).wait(1).to({graphics:mask_graphics_184,x:120.35,y:267.725}).wait(1).to({graphics:mask_graphics_185,x:120.35,y:268.875}).wait(1).to({graphics:mask_graphics_186,x:120.35,y:270.05}).wait(1).to({graphics:mask_graphics_187,x:120.35,y:271.2}).wait(1).to({graphics:mask_graphics_188,x:120.35,y:272.35}).wait(1).to({graphics:mask_graphics_189,x:120.35,y:273.5}).wait(1).to({graphics:mask_graphics_190,x:120.35,y:274.65}).wait(1).to({graphics:mask_graphics_191,x:120.35,y:275.8}).wait(1).to({graphics:mask_graphics_192,x:120.35,y:276.95}).wait(1).to({graphics:mask_graphics_193,x:120.35,y:278.075}).wait(1).to({graphics:mask_graphics_194,x:120.35,y:279.225}).wait(1).to({graphics:mask_graphics_195,x:120.35,y:280.375}).wait(1).to({graphics:mask_graphics_196,x:120.35,y:281.525}).wait(1).to({graphics:mask_graphics_197,x:120.35,y:282.675}).wait(1).to({graphics:mask_graphics_198,x:120.35,y:283.825}).wait(1).to({graphics:mask_graphics_199,x:86.3,y:157.2862}).wait(1).to({graphics:mask_graphics_200,x:120.35,y:283.8}).wait(1).to({graphics:mask_graphics_201,x:120.35,y:282.625}).wait(1).to({graphics:mask_graphics_202,x:120.35,y:281.45}).wait(1).to({graphics:mask_graphics_203,x:120.35,y:280.275}).wait(1).to({graphics:mask_graphics_204,x:120.35,y:279.1}).wait(1).to({graphics:mask_graphics_205,x:120.35,y:277.925}).wait(1).to({graphics:mask_graphics_206,x:120.35,y:276.775}).wait(1).to({graphics:mask_graphics_207,x:120.35,y:275.6}).wait(1).to({graphics:mask_graphics_208,x:120.35,y:274.425}).wait(1).to({graphics:mask_graphics_209,x:120.35,y:273.25}).wait(1).to({graphics:mask_graphics_210,x:120.35,y:272.075}).wait(1).to({graphics:mask_graphics_211,x:120.35,y:270.9}).wait(1).to({graphics:mask_graphics_212,x:120.35,y:269.7}).wait(1).to({graphics:mask_graphics_213,x:120.35,y:268.525}).wait(1).to({graphics:mask_graphics_214,x:120.35,y:267.35}).wait(1).to({graphics:mask_graphics_215,x:120.35,y:266.175}).wait(1).to({graphics:mask_graphics_216,x:120.35,y:265}).wait(1).to({graphics:mask_graphics_217,x:120.35,y:263.825}).wait(1).to({graphics:mask_graphics_218,x:120.35,y:262.675}).wait(1).to({graphics:mask_graphics_219,x:120.35,y:261.5}).wait(1).to({graphics:mask_graphics_220,x:120.35,y:260.325}).wait(1).to({graphics:mask_graphics_221,x:120.35,y:259.15}).wait(1).to({graphics:mask_graphics_222,x:120.35,y:257.975}).wait(1).to({graphics:mask_graphics_223,x:120.35,y:256.8}).wait(1).to({graphics:mask_graphics_224,x:120.35,y:256.8}).wait(1).to({graphics:mask_graphics_225,x:120.35,y:255.625}).wait(1).to({graphics:mask_graphics_226,x:120.35,y:254.425}).wait(1).to({graphics:mask_graphics_227,x:120.35,y:253.25}).wait(1).to({graphics:mask_graphics_228,x:120.35,y:252.05}).wait(1).to({graphics:mask_graphics_229,x:120.35,y:250.875}).wait(1).to({graphics:mask_graphics_230,x:120.35,y:249.7}).wait(1).to({graphics:mask_graphics_231,x:120.35,y:248.5}).wait(1).to({graphics:mask_graphics_232,x:120.35,y:247.325}).wait(1).to({graphics:mask_graphics_233,x:120.35,y:246.15}).wait(1).to({graphics:mask_graphics_234,x:120.35,y:244.95}).wait(1).to({graphics:mask_graphics_235,x:120.35,y:243.775}).wait(1).to({graphics:mask_graphics_236,x:120.35,y:242.6}).wait(1).to({graphics:mask_graphics_237,x:120.35,y:241.4}).wait(1).to({graphics:mask_graphics_238,x:120.35,y:240.225}).wait(1).to({graphics:mask_graphics_239,x:120.35,y:239.025}).wait(1).to({graphics:mask_graphics_240,x:120.35,y:237.85}).wait(1).to({graphics:mask_graphics_241,x:120.35,y:236.675}).wait(1).to({graphics:mask_graphics_242,x:120.35,y:235.475}).wait(1).to({graphics:mask_graphics_243,x:120.35,y:234.3}).wait(1).to({graphics:mask_graphics_244,x:120.35,y:233.125}).wait(1).to({graphics:mask_graphics_245,x:120.35,y:231.925}).wait(1).to({graphics:mask_graphics_246,x:120.35,y:230.75}).wait(1).to({graphics:mask_graphics_247,x:120.35,y:229.55}).wait(1).to({graphics:mask_graphics_248,x:120.35,y:228.375}).wait(1).to({graphics:mask_graphics_249,x:120.35,y:228.375}).wait(1).to({graphics:mask_graphics_250,x:120.35,y:229.525}).wait(1).to({graphics:mask_graphics_251,x:120.35,y:230.7}).wait(1).to({graphics:mask_graphics_252,x:120.35,y:231.85}).wait(1).to({graphics:mask_graphics_253,x:120.35,y:233.025}).wait(1).to({graphics:mask_graphics_254,x:120.35,y:234.175}).wait(1).to({graphics:mask_graphics_255,x:120.35,y:235.35}).wait(1).to({graphics:mask_graphics_256,x:120.35,y:236.5}).wait(1).to({graphics:mask_graphics_257,x:120.35,y:237.65}).wait(1).to({graphics:mask_graphics_258,x:120.35,y:238.825}).wait(1).to({graphics:mask_graphics_259,x:120.35,y:239.975}).wait(1).to({graphics:mask_graphics_260,x:120.35,y:241.15}).wait(1).to({graphics:mask_graphics_261,x:120.35,y:242.325}).wait(1).to({graphics:mask_graphics_262,x:120.35,y:243.475}).wait(1).to({graphics:mask_graphics_263,x:120.35,y:244.65}).wait(1).to({graphics:mask_graphics_264,x:120.35,y:245.8}).wait(1).to({graphics:mask_graphics_265,x:120.35,y:246.975}).wait(1).to({graphics:mask_graphics_266,x:120.35,y:248.125}).wait(1).to({graphics:mask_graphics_267,x:120.35,y:249.3}).wait(1).to({graphics:mask_graphics_268,x:120.35,y:250.45}).wait(1).to({graphics:mask_graphics_269,x:120.35,y:251.6}).wait(1).to({graphics:mask_graphics_270,x:120.35,y:252.775}).wait(1).to({graphics:mask_graphics_271,x:120.35,y:253.925}).wait(1).to({graphics:mask_graphics_272,x:120.35,y:255.1}).wait(1).to({graphics:mask_graphics_273,x:120.35,y:256.25}).wait(1).to({graphics:mask_graphics_274,x:120.35,y:256.25}).wait(1).to({graphics:mask_graphics_275,x:120.35,y:257.4}).wait(1).to({graphics:mask_graphics_276,x:120.35,y:258.55}).wait(1).to({graphics:mask_graphics_277,x:120.35,y:259.7}).wait(1).to({graphics:mask_graphics_278,x:120.35,y:260.85}).wait(1).to({graphics:mask_graphics_279,x:120.35,y:262}).wait(1).to({graphics:mask_graphics_280,x:120.35,y:263.15}).wait(1).to({graphics:mask_graphics_281,x:120.35,y:264.275}).wait(1).to({graphics:mask_graphics_282,x:120.35,y:265.425}).wait(1).to({graphics:mask_graphics_283,x:120.35,y:266.575}).wait(1).to({graphics:mask_graphics_284,x:120.35,y:267.725}).wait(1).to({graphics:mask_graphics_285,x:120.35,y:268.875}).wait(1).to({graphics:mask_graphics_286,x:120.35,y:270.05}).wait(1).to({graphics:mask_graphics_287,x:120.35,y:271.2}).wait(1).to({graphics:mask_graphics_288,x:120.35,y:272.35}).wait(1).to({graphics:mask_graphics_289,x:120.35,y:273.5}).wait(1).to({graphics:mask_graphics_290,x:120.35,y:274.65}).wait(1).to({graphics:mask_graphics_291,x:120.35,y:275.8}).wait(1).to({graphics:mask_graphics_292,x:120.35,y:276.95}).wait(1).to({graphics:mask_graphics_293,x:120.35,y:278.075}).wait(1).to({graphics:mask_graphics_294,x:120.35,y:279.225}).wait(1).to({graphics:mask_graphics_295,x:120.35,y:280.375}).wait(1).to({graphics:mask_graphics_296,x:120.35,y:281.525}).wait(1).to({graphics:mask_graphics_297,x:120.35,y:282.675}).wait(1).to({graphics:mask_graphics_298,x:120.35,y:283.825}).wait(1).to({graphics:mask_graphics_299,x:86.3,y:157.2862}).wait(1).to({graphics:mask_graphics_300,x:120.35,y:283.8}).wait(1).to({graphics:mask_graphics_301,x:120.35,y:282.625}).wait(1).to({graphics:mask_graphics_302,x:120.35,y:281.45}).wait(1).to({graphics:mask_graphics_303,x:120.35,y:280.275}).wait(1).to({graphics:mask_graphics_304,x:120.35,y:279.1}).wait(1).to({graphics:mask_graphics_305,x:120.35,y:277.925}).wait(1).to({graphics:mask_graphics_306,x:120.35,y:276.775}).wait(1).to({graphics:mask_graphics_307,x:120.35,y:275.6}).wait(1).to({graphics:mask_graphics_308,x:120.35,y:274.425}).wait(1).to({graphics:mask_graphics_309,x:120.35,y:273.25}).wait(1).to({graphics:mask_graphics_310,x:120.35,y:272.075}).wait(1).to({graphics:mask_graphics_311,x:120.35,y:270.9}).wait(1).to({graphics:mask_graphics_312,x:120.35,y:269.7}).wait(1).to({graphics:mask_graphics_313,x:120.35,y:268.525}).wait(1).to({graphics:mask_graphics_314,x:120.35,y:267.35}).wait(1).to({graphics:mask_graphics_315,x:120.35,y:266.175}).wait(1).to({graphics:mask_graphics_316,x:120.35,y:265}).wait(1).to({graphics:mask_graphics_317,x:120.35,y:263.825}).wait(1).to({graphics:mask_graphics_318,x:120.35,y:262.675}).wait(1).to({graphics:mask_graphics_319,x:120.35,y:261.5}).wait(1).to({graphics:mask_graphics_320,x:120.35,y:260.325}).wait(1).to({graphics:mask_graphics_321,x:120.35,y:259.15}).wait(1).to({graphics:mask_graphics_322,x:120.35,y:257.975}).wait(1).to({graphics:mask_graphics_323,x:120.35,y:256.8}).wait(1).to({graphics:mask_graphics_324,x:120.35,y:256.8}).wait(1).to({graphics:mask_graphics_325,x:120.35,y:255.625}).wait(1).to({graphics:mask_graphics_326,x:120.35,y:254.425}).wait(1).to({graphics:mask_graphics_327,x:120.35,y:253.25}).wait(1).to({graphics:mask_graphics_328,x:120.35,y:252.05}).wait(1).to({graphics:mask_graphics_329,x:120.35,y:250.875}).wait(1).to({graphics:mask_graphics_330,x:120.35,y:249.7}).wait(1).to({graphics:mask_graphics_331,x:120.35,y:248.5}).wait(1).to({graphics:mask_graphics_332,x:120.35,y:247.325}).wait(1).to({graphics:mask_graphics_333,x:120.35,y:246.15}).wait(1).to({graphics:mask_graphics_334,x:120.35,y:244.95}).wait(1).to({graphics:mask_graphics_335,x:120.35,y:243.775}).wait(1).to({graphics:mask_graphics_336,x:120.35,y:242.6}).wait(1).to({graphics:mask_graphics_337,x:120.35,y:241.4}).wait(1).to({graphics:mask_graphics_338,x:120.35,y:240.225}).wait(1).to({graphics:mask_graphics_339,x:120.35,y:239.025}).wait(1).to({graphics:mask_graphics_340,x:120.35,y:237.85}).wait(1).to({graphics:mask_graphics_341,x:120.35,y:236.675}).wait(1).to({graphics:mask_graphics_342,x:120.35,y:235.475}).wait(1).to({graphics:mask_graphics_343,x:120.35,y:234.3}).wait(1).to({graphics:mask_graphics_344,x:120.35,y:233.125}).wait(1).to({graphics:mask_graphics_345,x:120.35,y:231.925}).wait(1).to({graphics:mask_graphics_346,x:120.35,y:230.75}).wait(1).to({graphics:mask_graphics_347,x:120.35,y:229.55}).wait(1).to({graphics:mask_graphics_348,x:120.35,y:228.375}).wait(1).to({graphics:mask_graphics_349,x:120.35,y:228.375}).wait(1).to({graphics:mask_graphics_350,x:120.35,y:229.525}).wait(1).to({graphics:mask_graphics_351,x:120.35,y:230.7}).wait(1).to({graphics:mask_graphics_352,x:120.35,y:231.85}).wait(1).to({graphics:mask_graphics_353,x:120.35,y:233.025}).wait(1).to({graphics:mask_graphics_354,x:120.35,y:234.175}).wait(1).to({graphics:mask_graphics_355,x:120.35,y:235.35}).wait(1).to({graphics:mask_graphics_356,x:120.35,y:236.5}).wait(1).to({graphics:mask_graphics_357,x:120.35,y:237.65}).wait(1).to({graphics:mask_graphics_358,x:120.35,y:238.825}).wait(1).to({graphics:mask_graphics_359,x:120.35,y:239.975}).wait(1).to({graphics:mask_graphics_360,x:120.35,y:241.15}).wait(1).to({graphics:mask_graphics_361,x:120.35,y:242.325}).wait(1).to({graphics:mask_graphics_362,x:120.35,y:243.475}).wait(1).to({graphics:mask_graphics_363,x:120.35,y:244.65}).wait(1).to({graphics:mask_graphics_364,x:120.35,y:245.8}).wait(1).to({graphics:mask_graphics_365,x:120.35,y:246.975}).wait(1).to({graphics:mask_graphics_366,x:120.35,y:248.125}).wait(1).to({graphics:mask_graphics_367,x:120.35,y:249.3}).wait(1).to({graphics:mask_graphics_368,x:120.35,y:250.45}).wait(1).to({graphics:mask_graphics_369,x:120.35,y:251.6}).wait(1).to({graphics:mask_graphics_370,x:120.35,y:252.775}).wait(1).to({graphics:mask_graphics_371,x:120.35,y:253.925}).wait(1).to({graphics:mask_graphics_372,x:120.35,y:255.1}).wait(1).to({graphics:mask_graphics_373,x:120.35,y:256.25}).wait(1).to({graphics:mask_graphics_374,x:120.35,y:256.25}).wait(1).to({graphics:mask_graphics_375,x:120.35,y:257.4}).wait(1).to({graphics:mask_graphics_376,x:120.35,y:258.55}).wait(1).to({graphics:mask_graphics_377,x:120.35,y:259.7}).wait(1).to({graphics:mask_graphics_378,x:120.35,y:260.85}).wait(1).to({graphics:mask_graphics_379,x:120.35,y:262}).wait(1).to({graphics:mask_graphics_380,x:120.35,y:263.15}).wait(1).to({graphics:mask_graphics_381,x:120.35,y:264.275}).wait(1).to({graphics:mask_graphics_382,x:120.35,y:265.425}).wait(1).to({graphics:mask_graphics_383,x:120.35,y:266.575}).wait(1).to({graphics:mask_graphics_384,x:120.35,y:267.725}).wait(1).to({graphics:mask_graphics_385,x:120.35,y:268.875}).wait(1).to({graphics:mask_graphics_386,x:120.35,y:270.05}).wait(1).to({graphics:mask_graphics_387,x:120.35,y:271.2}).wait(1).to({graphics:mask_graphics_388,x:120.35,y:272.35}).wait(1).to({graphics:mask_graphics_389,x:120.35,y:273.5}).wait(1).to({graphics:mask_graphics_390,x:120.35,y:274.65}).wait(1).to({graphics:mask_graphics_391,x:120.35,y:275.8}).wait(1).to({graphics:mask_graphics_392,x:120.35,y:276.95}).wait(1).to({graphics:mask_graphics_393,x:120.35,y:278.075}).wait(1).to({graphics:mask_graphics_394,x:120.35,y:279.225}).wait(1).to({graphics:mask_graphics_395,x:120.35,y:280.375}).wait(1).to({graphics:mask_graphics_396,x:120.35,y:281.525}).wait(1).to({graphics:mask_graphics_397,x:120.35,y:282.675}).wait(1).to({graphics:mask_graphics_398,x:120.35,y:283.825}).wait(1).to({graphics:mask_graphics_399,x:86.3,y:157.2862}).wait(1));

	// Masked_Layer_85___82
	this.aniE = new lib.sprite103();
	this.aniE.name = "aniE";
	this.aniE.setTransform(162.1,232.3);

	var maskedShapeInstanceList = [this.aniE];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.aniE).wait(400));

	// Masked_Layer_83___82
	this.aniD = new lib.sprite103();
	this.aniD.name = "aniD";
	this.aniD.setTransform(75.1,232.3);

	var maskedShapeInstanceList = [this.aniD];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.aniD).wait(400));

	// Layer_81
	this.instance_2 = new lib.shape99("synched",0);
	this.instance_2.setTransform(116.8,101.25);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({startPosition:0},9).to({y:97.25},4).wait(1).to({y:96.25},0).to({startPosition:0},71).to({y:100.25},4).wait(1).to({y:101.25},0).to({startPosition:0},18).to({y:97.1},5).wait(1).to({y:96.25},0).to({startPosition:0},71).to({y:100.25},4).wait(1).to({y:101.25},0).to({startPosition:0},19).to({y:97.25},4).wait(1).to({y:96.25},0).to({startPosition:0},71).to({y:100.25},4).wait(1).to({y:101.25},0).to({startPosition:0},19).to({y:97.25},4).wait(1).to({y:96.25},0).to({startPosition:0},70).to({y:100.25},4).wait(1).to({y:101.25},0).wait(11));

	// Mask_Layer_64 (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	var mask_1_graphics_0 = new cjs.Graphics().p("AoJJ4IAAzvIQUAAIAATvg");
	var mask_1_graphics_1 = new cjs.Graphics().p("AoJJtIAAzZIQUAAIAATZg");
	var mask_1_graphics_2 = new cjs.Graphics().p("AoJJhIAAzBIQUAAIAATBg");
	var mask_1_graphics_3 = new cjs.Graphics().p("AoJJVIAAypIQUAAIAASpg");
	var mask_1_graphics_4 = new cjs.Graphics().p("AoJJKIAAySIQUAAIAASSg");
	var mask_1_graphics_5 = new cjs.Graphics().p("AoJI+IAAx7IQUAAIAAR7g");
	var mask_1_graphics_6 = new cjs.Graphics().p("AoJIyIAAxjIQUAAIAARjg");
	var mask_1_graphics_7 = new cjs.Graphics().p("AoJImIAAxLIQUAAIAARLg");
	var mask_1_graphics_8 = new cjs.Graphics().p("AoJIbIAAw1IQUAAIAAQ1g");
	var mask_1_graphics_9 = new cjs.Graphics().p("AoJIPIAAwdIQUAAIAAQdg");
	var mask_1_graphics_10 = new cjs.Graphics().p("AoJIDIAAwFIQUAAIAAQFg");
	var mask_1_graphics_11 = new cjs.Graphics().p("AoJH4IAAvuIQUAAIAAPug");
	var mask_1_graphics_12 = new cjs.Graphics().p("AoJHsIAAvXIQUAAIAAPXg");
	var mask_1_graphics_13 = new cjs.Graphics().p("AoJHgIAAu/IQUAAIAAO/g");
	var mask_1_graphics_14 = new cjs.Graphics().p("AoJHUIAAunIQUAAIAAOng");
	var mask_1_graphics_15 = new cjs.Graphics().p("AoJHIIAAuPIQUAAIAAOPg");
	var mask_1_graphics_16 = new cjs.Graphics().p("AoJG9IAAt5IQUAAIAAN5g");
	var mask_1_graphics_17 = new cjs.Graphics().p("AoJGxIAAthIQUAAIAANhg");
	var mask_1_graphics_18 = new cjs.Graphics().p("AoJGlIAAtJIQUAAIAANJg");
	var mask_1_graphics_19 = new cjs.Graphics().p("AoJGaIAAszIQUAAIAAMzg");
	var mask_1_graphics_20 = new cjs.Graphics().p("AoJGOIAAsbIQUAAIAAMbg");
	var mask_1_graphics_21 = new cjs.Graphics().p("AoJGCIAAsDIQUAAIAAMDg");
	var mask_1_graphics_22 = new cjs.Graphics().p("AoJF3IAArsIQUAAIAALsg");
	var mask_1_graphics_23 = new cjs.Graphics().p("AoJFrIAArVIQUAAIAALVg");
	var mask_1_graphics_24 = new cjs.Graphics().p("AoJFrIAArVIQUAAIAALVg");
	var mask_1_graphics_25 = new cjs.Graphics().p("AoJFfIAAq9IQUAAIAAK9g");
	var mask_1_graphics_26 = new cjs.Graphics().p("AoJFTIAAqlIQUAAIAAKlg");
	var mask_1_graphics_27 = new cjs.Graphics().p("AoJFHIAAqNIQUAAIAAKNg");
	var mask_1_graphics_28 = new cjs.Graphics().p("AoJE8IAAp2IQUAAIAAJ2g");
	var mask_1_graphics_29 = new cjs.Graphics().p("AoJEwIAApfIQUAAIAAJfg");
	var mask_1_graphics_30 = new cjs.Graphics().p("AoJEkIAApHIQUAAIAAJHg");
	var mask_1_graphics_31 = new cjs.Graphics().p("AoJEYIAAovIQUAAIAAIvg");
	var mask_1_graphics_32 = new cjs.Graphics().p("AoJEMIAAoXIQUAAIAAIXg");
	var mask_1_graphics_33 = new cjs.Graphics().p("AoJEBIAAoAIQUAAIAAIAg");
	var mask_1_graphics_34 = new cjs.Graphics().p("AoJD1IAAnpIQUAAIAAHpg");
	var mask_1_graphics_35 = new cjs.Graphics().p("AoJDpIAAnRIQUAAIAAHRg");
	var mask_1_graphics_36 = new cjs.Graphics().p("AoJDdIAAm5IQUAAIAAG5g");
	var mask_1_graphics_37 = new cjs.Graphics().p("AoJDRIAAmhIQUAAIAAGhg");
	var mask_1_graphics_38 = new cjs.Graphics().p("AoJDGIAAmKIQUAAIAAGKg");
	var mask_1_graphics_39 = new cjs.Graphics().p("AoJC6IAAlzIQUAAIAAFzg");
	var mask_1_graphics_40 = new cjs.Graphics().p("AoJCuIAAlbIQUAAIAAFbg");
	var mask_1_graphics_41 = new cjs.Graphics().p("AoJCiIAAlDIQUAAIAAFDg");
	var mask_1_graphics_42 = new cjs.Graphics().p("AoJCWIAAkrIQUAAIAAErg");
	var mask_1_graphics_43 = new cjs.Graphics().p("AoJCKIAAkTIQUAAIAAETg");
	var mask_1_graphics_44 = new cjs.Graphics().p("AoJB/IAAj9IQUAAIAAD9g");
	var mask_1_graphics_45 = new cjs.Graphics().p("AoJBzIAAjlIQUAAIAADlg");
	var mask_1_graphics_46 = new cjs.Graphics().p("AoJBnIAAjNIQUAAIAADNg");
	var mask_1_graphics_47 = new cjs.Graphics().p("AoJBbIAAi1IQUAAIAAC1g");
	var mask_1_graphics_48 = new cjs.Graphics().p("AoJBPIAAidIQUAAIAACdg");
	var mask_1_graphics_49 = new cjs.Graphics().p("AoJBPIAAidIQUAAIAACdg");
	var mask_1_graphics_50 = new cjs.Graphics().p("AoJBbIAAi1IQUAAIAAC1g");
	var mask_1_graphics_51 = new cjs.Graphics().p("AoJBnIAAjNIQUAAIAADNg");
	var mask_1_graphics_52 = new cjs.Graphics().p("AoJBzIAAjlIQUAAIAADlg");
	var mask_1_graphics_53 = new cjs.Graphics().p("AoJB/IAAj9IQUAAIAAD9g");
	var mask_1_graphics_54 = new cjs.Graphics().p("AoJCKIAAkTIQUAAIAAETg");
	var mask_1_graphics_55 = new cjs.Graphics().p("AoJCWIAAkrIQUAAIAAErg");
	var mask_1_graphics_56 = new cjs.Graphics().p("AoJCiIAAlDIQUAAIAAFDg");
	var mask_1_graphics_57 = new cjs.Graphics().p("AoJCuIAAlbIQUAAIAAFbg");
	var mask_1_graphics_58 = new cjs.Graphics().p("AoJC6IAAlzIQUAAIAAFzg");
	var mask_1_graphics_59 = new cjs.Graphics().p("AoJDGIAAmKIQUAAIAAGKg");
	var mask_1_graphics_60 = new cjs.Graphics().p("AoJDRIAAmhIQUAAIAAGhg");
	var mask_1_graphics_61 = new cjs.Graphics().p("AoJDdIAAm5IQUAAIAAG5g");
	var mask_1_graphics_62 = new cjs.Graphics().p("AoJDpIAAnRIQUAAIAAHRg");
	var mask_1_graphics_63 = new cjs.Graphics().p("AoJD1IAAnpIQUAAIAAHpg");
	var mask_1_graphics_64 = new cjs.Graphics().p("AoJEBIAAoAIQUAAIAAIAg");
	var mask_1_graphics_65 = new cjs.Graphics().p("AoJEMIAAoXIQUAAIAAIXg");
	var mask_1_graphics_66 = new cjs.Graphics().p("AoJEYIAAovIQUAAIAAIvg");
	var mask_1_graphics_67 = new cjs.Graphics().p("AoJEkIAApHIQUAAIAAJHg");
	var mask_1_graphics_68 = new cjs.Graphics().p("AoJEwIAApfIQUAAIAAJfg");
	var mask_1_graphics_69 = new cjs.Graphics().p("AoJE8IAAp2IQUAAIAAJ2g");
	var mask_1_graphics_70 = new cjs.Graphics().p("AoJFHIAAqNIQUAAIAAKNg");
	var mask_1_graphics_71 = new cjs.Graphics().p("AoJFTIAAqlIQUAAIAAKlg");
	var mask_1_graphics_72 = new cjs.Graphics().p("AoJFfIAAq9IQUAAIAAK9g");
	var mask_1_graphics_73 = new cjs.Graphics().p("AoJFrIAArVIQUAAIAALVg");
	var mask_1_graphics_74 = new cjs.Graphics().p("AoJFrIAArVIQUAAIAALVg");
	var mask_1_graphics_75 = new cjs.Graphics().p("AoJF3IAArsIQUAAIAALsg");
	var mask_1_graphics_76 = new cjs.Graphics().p("AoJGCIAAsDIQUAAIAAMDg");
	var mask_1_graphics_77 = new cjs.Graphics().p("AoJGOIAAsbIQUAAIAAMbg");
	var mask_1_graphics_78 = new cjs.Graphics().p("AoJGaIAAszIQUAAIAAMzg");
	var mask_1_graphics_79 = new cjs.Graphics().p("AoJGlIAAtJIQUAAIAANJg");
	var mask_1_graphics_80 = new cjs.Graphics().p("AoJGxIAAthIQUAAIAANhg");
	var mask_1_graphics_81 = new cjs.Graphics().p("AoJG9IAAt5IQUAAIAAN5g");
	var mask_1_graphics_82 = new cjs.Graphics().p("AoJHIIAAuPIQUAAIAAOPg");
	var mask_1_graphics_83 = new cjs.Graphics().p("AoJHUIAAunIQUAAIAAOng");
	var mask_1_graphics_84 = new cjs.Graphics().p("AoJHgIAAu/IQUAAIAAO/g");
	var mask_1_graphics_85 = new cjs.Graphics().p("AoJHsIAAvXIQUAAIAAPXg");
	var mask_1_graphics_86 = new cjs.Graphics().p("AoJH4IAAvuIQUAAIAAPug");
	var mask_1_graphics_87 = new cjs.Graphics().p("AoJIDIAAwFIQUAAIAAQFg");
	var mask_1_graphics_88 = new cjs.Graphics().p("AoJIPIAAwdIQUAAIAAQdg");
	var mask_1_graphics_89 = new cjs.Graphics().p("AoJIbIAAw1IQUAAIAAQ1g");
	var mask_1_graphics_90 = new cjs.Graphics().p("AoJImIAAxLIQUAAIAARLg");
	var mask_1_graphics_91 = new cjs.Graphics().p("AoJIyIAAxjIQUAAIAARjg");
	var mask_1_graphics_92 = new cjs.Graphics().p("AoJI+IAAx7IQUAAIAAR7g");
	var mask_1_graphics_93 = new cjs.Graphics().p("AoJJKIAAySIQUAAIAASSg");
	var mask_1_graphics_94 = new cjs.Graphics().p("AoJJVIAAypIQUAAIAASpg");
	var mask_1_graphics_95 = new cjs.Graphics().p("AoJJhIAAzBIQUAAIAATBg");
	var mask_1_graphics_96 = new cjs.Graphics().p("AoJJtIAAzZIQUAAIAATZg");
	var mask_1_graphics_97 = new cjs.Graphics().p("AoJJ4IAAzvIQUAAIAATvg");
	var mask_1_graphics_98 = new cjs.Graphics().p("AoJJ4IAAzvIQUAAIAATvg");
	var mask_1_graphics_99 = new cjs.Graphics().p("AoJJ4IAAzvIQUAAIAATvg");
	var mask_1_graphics_100 = new cjs.Graphics().p("AoJJtIAAzZIQUAAIAATZg");
	var mask_1_graphics_101 = new cjs.Graphics().p("AoJJiIAAzDIQUAAIAATDg");
	var mask_1_graphics_102 = new cjs.Graphics().p("AoJJXIAAytIQUAAIAAStg");
	var mask_1_graphics_103 = new cjs.Graphics().p("AoJJLIAAyVIQUAAIAASVg");
	var mask_1_graphics_104 = new cjs.Graphics().p("AoJJAIAAx/IQUAAIAAR/g");
	var mask_1_graphics_105 = new cjs.Graphics().p("AoJI1IAAxpIQUAAIAARpg");
	var mask_1_graphics_106 = new cjs.Graphics().p("AoJIqIAAxTIQUAAIAARTg");
	var mask_1_graphics_107 = new cjs.Graphics().p("AoJIeIAAw7IQUAAIAAQ7g");
	var mask_1_graphics_108 = new cjs.Graphics().p("AoJITIAAwlIQUAAIAAQlg");
	var mask_1_graphics_109 = new cjs.Graphics().p("AoJIIIAAwPIQUAAIAAQPg");
	var mask_1_graphics_110 = new cjs.Graphics().p("AoJH9IAAv5IQUAAIAAP5g");
	var mask_1_graphics_111 = new cjs.Graphics().p("AoJHyIAAvjIQUAAIAAPjg");
	var mask_1_graphics_112 = new cjs.Graphics().p("AoJHnIAAvMIQUAAIAAPMg");
	var mask_1_graphics_113 = new cjs.Graphics().p("AoJHbIAAu1IQUAAIAAO1g");
	var mask_1_graphics_114 = new cjs.Graphics().p("AoJHQIAAufIQUAAIAAOfg");
	var mask_1_graphics_115 = new cjs.Graphics().p("AoJHFIAAuJIQUAAIAAOJg");
	var mask_1_graphics_116 = new cjs.Graphics().p("AoJG6IAAtyIQUAAIAANyg");
	var mask_1_graphics_117 = new cjs.Graphics().p("AoJGuIAAtbIQUAAIAANbg");
	var mask_1_graphics_118 = new cjs.Graphics().p("AoJGjIAAtFIQUAAIAANFg");
	var mask_1_graphics_119 = new cjs.Graphics().p("AoJGYIAAsvIQUAAIAAMvg");
	var mask_1_graphics_120 = new cjs.Graphics().p("AoJGNIAAsYIQUAAIAAMYg");
	var mask_1_graphics_121 = new cjs.Graphics().p("AoJGBIAAsBIQUAAIAAMBg");
	var mask_1_graphics_122 = new cjs.Graphics().p("AoJF2IAArrIQUAAIAALrg");
	var mask_1_graphics_123 = new cjs.Graphics().p("AoJFrIAArVIQUAAIAALVg");
	var mask_1_graphics_124 = new cjs.Graphics().p("AoJFrIAArVIQUAAIAALVg");
	var mask_1_graphics_125 = new cjs.Graphics().p("AoJFfIAAq9IQUAAIAAK9g");
	var mask_1_graphics_126 = new cjs.Graphics().p("AoJFTIAAqlIQUAAIAAKlg");
	var mask_1_graphics_127 = new cjs.Graphics().p("AoJFHIAAqNIQUAAIAAKNg");
	var mask_1_graphics_128 = new cjs.Graphics().p("AoJE8IAAp2IQUAAIAAJ2g");
	var mask_1_graphics_129 = new cjs.Graphics().p("AoJEwIAApfIQUAAIAAJfg");
	var mask_1_graphics_130 = new cjs.Graphics().p("AoJEkIAApHIQUAAIAAJHg");
	var mask_1_graphics_131 = new cjs.Graphics().p("AoJEYIAAovIQUAAIAAIvg");
	var mask_1_graphics_132 = new cjs.Graphics().p("AoJEMIAAoXIQUAAIAAIXg");
	var mask_1_graphics_133 = new cjs.Graphics().p("AoJEBIAAoAIQUAAIAAIAg");
	var mask_1_graphics_134 = new cjs.Graphics().p("AoJD1IAAnpIQUAAIAAHpg");
	var mask_1_graphics_135 = new cjs.Graphics().p("AoJDpIAAnRIQUAAIAAHRg");
	var mask_1_graphics_136 = new cjs.Graphics().p("AoJDdIAAm5IQUAAIAAG5g");
	var mask_1_graphics_137 = new cjs.Graphics().p("AoJDRIAAmhIQUAAIAAGhg");
	var mask_1_graphics_138 = new cjs.Graphics().p("AoJDGIAAmKIQUAAIAAGKg");
	var mask_1_graphics_139 = new cjs.Graphics().p("AoJC6IAAlzIQUAAIAAFzg");
	var mask_1_graphics_140 = new cjs.Graphics().p("AoJCuIAAlbIQUAAIAAFbg");
	var mask_1_graphics_141 = new cjs.Graphics().p("AoJCiIAAlDIQUAAIAAFDg");
	var mask_1_graphics_142 = new cjs.Graphics().p("AoJCWIAAkrIQUAAIAAErg");
	var mask_1_graphics_143 = new cjs.Graphics().p("AoJCKIAAkTIQUAAIAAETg");
	var mask_1_graphics_144 = new cjs.Graphics().p("AoJB/IAAj9IQUAAIAAD9g");
	var mask_1_graphics_145 = new cjs.Graphics().p("AoJBzIAAjlIQUAAIAADlg");
	var mask_1_graphics_146 = new cjs.Graphics().p("AoJBnIAAjNIQUAAIAADNg");
	var mask_1_graphics_147 = new cjs.Graphics().p("AoJBbIAAi1IQUAAIAAC1g");
	var mask_1_graphics_148 = new cjs.Graphics().p("AoJBPIAAidIQUAAIAACdg");
	var mask_1_graphics_149 = new cjs.Graphics().p("AoJBPIAAidIQUAAIAACdg");
	var mask_1_graphics_150 = new cjs.Graphics().p("AoJBbIAAi1IQUAAIAAC1g");
	var mask_1_graphics_151 = new cjs.Graphics().p("AoJBnIAAjNIQUAAIAADNg");
	var mask_1_graphics_152 = new cjs.Graphics().p("AoJBzIAAjlIQUAAIAADlg");
	var mask_1_graphics_153 = new cjs.Graphics().p("AoJB/IAAj9IQUAAIAAD9g");
	var mask_1_graphics_154 = new cjs.Graphics().p("AoJCKIAAkTIQUAAIAAETg");
	var mask_1_graphics_155 = new cjs.Graphics().p("AoJCWIAAkrIQUAAIAAErg");
	var mask_1_graphics_156 = new cjs.Graphics().p("AoJCiIAAlDIQUAAIAAFDg");
	var mask_1_graphics_157 = new cjs.Graphics().p("AoJCuIAAlbIQUAAIAAFbg");
	var mask_1_graphics_158 = new cjs.Graphics().p("AoJC6IAAlzIQUAAIAAFzg");
	var mask_1_graphics_159 = new cjs.Graphics().p("AoJDGIAAmKIQUAAIAAGKg");
	var mask_1_graphics_160 = new cjs.Graphics().p("AoJDRIAAmhIQUAAIAAGhg");
	var mask_1_graphics_161 = new cjs.Graphics().p("AoJDdIAAm5IQUAAIAAG5g");
	var mask_1_graphics_162 = new cjs.Graphics().p("AoJDpIAAnRIQUAAIAAHRg");
	var mask_1_graphics_163 = new cjs.Graphics().p("AoJD1IAAnpIQUAAIAAHpg");
	var mask_1_graphics_164 = new cjs.Graphics().p("AoJEBIAAoAIQUAAIAAIAg");
	var mask_1_graphics_165 = new cjs.Graphics().p("AoJEMIAAoXIQUAAIAAIXg");
	var mask_1_graphics_166 = new cjs.Graphics().p("AoJEYIAAovIQUAAIAAIvg");
	var mask_1_graphics_167 = new cjs.Graphics().p("AoJEkIAApHIQUAAIAAJHg");
	var mask_1_graphics_168 = new cjs.Graphics().p("AoJEwIAApfIQUAAIAAJfg");
	var mask_1_graphics_169 = new cjs.Graphics().p("AoJE8IAAp2IQUAAIAAJ2g");
	var mask_1_graphics_170 = new cjs.Graphics().p("AoJFHIAAqNIQUAAIAAKNg");
	var mask_1_graphics_171 = new cjs.Graphics().p("AoJFTIAAqlIQUAAIAAKlg");
	var mask_1_graphics_172 = new cjs.Graphics().p("AoJFfIAAq9IQUAAIAAK9g");
	var mask_1_graphics_173 = new cjs.Graphics().p("AoJFrIAArVIQUAAIAALVg");
	var mask_1_graphics_174 = new cjs.Graphics().p("AoJFrIAArVIQUAAIAALVg");
	var mask_1_graphics_175 = new cjs.Graphics().p("AoJF2IAArrIQUAAIAALrg");
	var mask_1_graphics_176 = new cjs.Graphics().p("AoJGBIAAsBIQUAAIAAMBg");
	var mask_1_graphics_177 = new cjs.Graphics().p("AoJGNIAAsYIQUAAIAAMYg");
	var mask_1_graphics_178 = new cjs.Graphics().p("AoJGYIAAsvIQUAAIAAMvg");
	var mask_1_graphics_179 = new cjs.Graphics().p("AoJGjIAAtFIQUAAIAANFg");
	var mask_1_graphics_180 = new cjs.Graphics().p("AoJGuIAAtbIQUAAIAANbg");
	var mask_1_graphics_181 = new cjs.Graphics().p("AoJG6IAAtyIQUAAIAANyg");
	var mask_1_graphics_182 = new cjs.Graphics().p("AoJHFIAAuJIQUAAIAAOJg");
	var mask_1_graphics_183 = new cjs.Graphics().p("AoJHQIAAufIQUAAIAAOfg");
	var mask_1_graphics_184 = new cjs.Graphics().p("AoJHbIAAu1IQUAAIAAO1g");
	var mask_1_graphics_185 = new cjs.Graphics().p("AoJHnIAAvMIQUAAIAAPMg");
	var mask_1_graphics_186 = new cjs.Graphics().p("AoJHyIAAvjIQUAAIAAPjg");
	var mask_1_graphics_187 = new cjs.Graphics().p("AoJH9IAAv5IQUAAIAAP5g");
	var mask_1_graphics_188 = new cjs.Graphics().p("AoJIIIAAwPIQUAAIAAQPg");
	var mask_1_graphics_189 = new cjs.Graphics().p("AoJITIAAwlIQUAAIAAQlg");
	var mask_1_graphics_190 = new cjs.Graphics().p("AoJIeIAAw7IQUAAIAAQ7g");
	var mask_1_graphics_191 = new cjs.Graphics().p("AoJIqIAAxTIQUAAIAARTg");
	var mask_1_graphics_192 = new cjs.Graphics().p("AoJI1IAAxpIQUAAIAARpg");
	var mask_1_graphics_193 = new cjs.Graphics().p("AoJJAIAAx/IQUAAIAAR/g");
	var mask_1_graphics_194 = new cjs.Graphics().p("AoJJLIAAyVIQUAAIAASVg");
	var mask_1_graphics_195 = new cjs.Graphics().p("AoJJXIAAytIQUAAIAAStg");
	var mask_1_graphics_196 = new cjs.Graphics().p("AoJJiIAAzDIQUAAIAATDg");
	var mask_1_graphics_197 = new cjs.Graphics().p("AoJJtIAAzZIQUAAIAATZg");
	var mask_1_graphics_198 = new cjs.Graphics().p("AoJJ4IAAzvIQUAAIAATvg");
	var mask_1_graphics_199 = new cjs.Graphics().p("AoJJ4IAAzvIQUAAIAATvg");
	var mask_1_graphics_200 = new cjs.Graphics().p("AoJJ4IAAzvIQUAAIAATvg");
	var mask_1_graphics_201 = new cjs.Graphics().p("AoJJtIAAzZIQUAAIAATZg");
	var mask_1_graphics_202 = new cjs.Graphics().p("AoJJhIAAzBIQUAAIAATBg");
	var mask_1_graphics_203 = new cjs.Graphics().p("AoJJVIAAypIQUAAIAASpg");
	var mask_1_graphics_204 = new cjs.Graphics().p("AoJJKIAAySIQUAAIAASSg");
	var mask_1_graphics_205 = new cjs.Graphics().p("AoJI+IAAx7IQUAAIAAR7g");
	var mask_1_graphics_206 = new cjs.Graphics().p("AoJIyIAAxjIQUAAIAARjg");
	var mask_1_graphics_207 = new cjs.Graphics().p("AoJImIAAxLIQUAAIAARLg");
	var mask_1_graphics_208 = new cjs.Graphics().p("AoJIbIAAw1IQUAAIAAQ1g");
	var mask_1_graphics_209 = new cjs.Graphics().p("AoJIPIAAwdIQUAAIAAQdg");
	var mask_1_graphics_210 = new cjs.Graphics().p("AoJIDIAAwFIQUAAIAAQFg");
	var mask_1_graphics_211 = new cjs.Graphics().p("AoJH4IAAvuIQUAAIAAPug");
	var mask_1_graphics_212 = new cjs.Graphics().p("AoJHsIAAvXIQUAAIAAPXg");
	var mask_1_graphics_213 = new cjs.Graphics().p("AoJHgIAAu/IQUAAIAAO/g");
	var mask_1_graphics_214 = new cjs.Graphics().p("AoJHUIAAunIQUAAIAAOng");
	var mask_1_graphics_215 = new cjs.Graphics().p("AoJHIIAAuPIQUAAIAAOPg");
	var mask_1_graphics_216 = new cjs.Graphics().p("AoJG9IAAt5IQUAAIAAN5g");
	var mask_1_graphics_217 = new cjs.Graphics().p("AoJGxIAAthIQUAAIAANhg");
	var mask_1_graphics_218 = new cjs.Graphics().p("AoJGlIAAtJIQUAAIAANJg");
	var mask_1_graphics_219 = new cjs.Graphics().p("AoJGaIAAszIQUAAIAAMzg");
	var mask_1_graphics_220 = new cjs.Graphics().p("AoJGOIAAsbIQUAAIAAMbg");
	var mask_1_graphics_221 = new cjs.Graphics().p("AoJGCIAAsDIQUAAIAAMDg");
	var mask_1_graphics_222 = new cjs.Graphics().p("AoJF3IAArsIQUAAIAALsg");
	var mask_1_graphics_223 = new cjs.Graphics().p("AoJFrIAArVIQUAAIAALVg");
	var mask_1_graphics_224 = new cjs.Graphics().p("AoJFrIAArVIQUAAIAALVg");
	var mask_1_graphics_225 = new cjs.Graphics().p("AoJFfIAAq9IQUAAIAAK9g");
	var mask_1_graphics_226 = new cjs.Graphics().p("AoJFTIAAqlIQUAAIAAKlg");
	var mask_1_graphics_227 = new cjs.Graphics().p("AoJFHIAAqNIQUAAIAAKNg");
	var mask_1_graphics_228 = new cjs.Graphics().p("AoJE8IAAp2IQUAAIAAJ2g");
	var mask_1_graphics_229 = new cjs.Graphics().p("AoJEwIAApfIQUAAIAAJfg");
	var mask_1_graphics_230 = new cjs.Graphics().p("AoJEkIAApHIQUAAIAAJHg");
	var mask_1_graphics_231 = new cjs.Graphics().p("AoJEYIAAovIQUAAIAAIvg");
	var mask_1_graphics_232 = new cjs.Graphics().p("AoJEMIAAoXIQUAAIAAIXg");
	var mask_1_graphics_233 = new cjs.Graphics().p("AoJEBIAAoAIQUAAIAAIAg");
	var mask_1_graphics_234 = new cjs.Graphics().p("AoJD1IAAnpIQUAAIAAHpg");
	var mask_1_graphics_235 = new cjs.Graphics().p("AoJDpIAAnRIQUAAIAAHRg");
	var mask_1_graphics_236 = new cjs.Graphics().p("AoJDdIAAm5IQUAAIAAG5g");
	var mask_1_graphics_237 = new cjs.Graphics().p("AoJDRIAAmhIQUAAIAAGhg");
	var mask_1_graphics_238 = new cjs.Graphics().p("AoJDGIAAmKIQUAAIAAGKg");
	var mask_1_graphics_239 = new cjs.Graphics().p("AoJC6IAAlzIQUAAIAAFzg");
	var mask_1_graphics_240 = new cjs.Graphics().p("AoJCuIAAlbIQUAAIAAFbg");
	var mask_1_graphics_241 = new cjs.Graphics().p("AoJCiIAAlDIQUAAIAAFDg");
	var mask_1_graphics_242 = new cjs.Graphics().p("AoJCWIAAkrIQUAAIAAErg");
	var mask_1_graphics_243 = new cjs.Graphics().p("AoJCKIAAkTIQUAAIAAETg");
	var mask_1_graphics_244 = new cjs.Graphics().p("AoJB/IAAj9IQUAAIAAD9g");
	var mask_1_graphics_245 = new cjs.Graphics().p("AoJBzIAAjlIQUAAIAADlg");
	var mask_1_graphics_246 = new cjs.Graphics().p("AoJBnIAAjNIQUAAIAADNg");
	var mask_1_graphics_247 = new cjs.Graphics().p("AoJBbIAAi1IQUAAIAAC1g");
	var mask_1_graphics_248 = new cjs.Graphics().p("AoJBPIAAidIQUAAIAACdg");
	var mask_1_graphics_249 = new cjs.Graphics().p("AoJBPIAAidIQUAAIAACdg");
	var mask_1_graphics_250 = new cjs.Graphics().p("AoJBbIAAi1IQUAAIAAC1g");
	var mask_1_graphics_251 = new cjs.Graphics().p("AoJBnIAAjNIQUAAIAADNg");
	var mask_1_graphics_252 = new cjs.Graphics().p("AoJBzIAAjlIQUAAIAADlg");
	var mask_1_graphics_253 = new cjs.Graphics().p("AoJB/IAAj9IQUAAIAAD9g");
	var mask_1_graphics_254 = new cjs.Graphics().p("AoJCKIAAkTIQUAAIAAETg");
	var mask_1_graphics_255 = new cjs.Graphics().p("AoJCWIAAkrIQUAAIAAErg");
	var mask_1_graphics_256 = new cjs.Graphics().p("AoJCiIAAlDIQUAAIAAFDg");
	var mask_1_graphics_257 = new cjs.Graphics().p("AoJCuIAAlbIQUAAIAAFbg");
	var mask_1_graphics_258 = new cjs.Graphics().p("AoJC6IAAlzIQUAAIAAFzg");
	var mask_1_graphics_259 = new cjs.Graphics().p("AoJDGIAAmKIQUAAIAAGKg");
	var mask_1_graphics_260 = new cjs.Graphics().p("AoJDRIAAmhIQUAAIAAGhg");
	var mask_1_graphics_261 = new cjs.Graphics().p("AoJDdIAAm5IQUAAIAAG5g");
	var mask_1_graphics_262 = new cjs.Graphics().p("AoJDpIAAnRIQUAAIAAHRg");
	var mask_1_graphics_263 = new cjs.Graphics().p("AoJD1IAAnpIQUAAIAAHpg");
	var mask_1_graphics_264 = new cjs.Graphics().p("AoJEBIAAoAIQUAAIAAIAg");
	var mask_1_graphics_265 = new cjs.Graphics().p("AoJEMIAAoXIQUAAIAAIXg");
	var mask_1_graphics_266 = new cjs.Graphics().p("AoJEYIAAovIQUAAIAAIvg");
	var mask_1_graphics_267 = new cjs.Graphics().p("AoJEkIAApHIQUAAIAAJHg");
	var mask_1_graphics_268 = new cjs.Graphics().p("AoJEwIAApfIQUAAIAAJfg");
	var mask_1_graphics_269 = new cjs.Graphics().p("AoJE8IAAp2IQUAAIAAJ2g");
	var mask_1_graphics_270 = new cjs.Graphics().p("AoJFHIAAqNIQUAAIAAKNg");
	var mask_1_graphics_271 = new cjs.Graphics().p("AoJFTIAAqlIQUAAIAAKlg");
	var mask_1_graphics_272 = new cjs.Graphics().p("AoJFfIAAq9IQUAAIAAK9g");
	var mask_1_graphics_273 = new cjs.Graphics().p("AoJFrIAArVIQUAAIAALVg");
	var mask_1_graphics_274 = new cjs.Graphics().p("AoJFrIAArVIQUAAIAALVg");
	var mask_1_graphics_275 = new cjs.Graphics().p("AoJF2IAArrIQUAAIAALrg");
	var mask_1_graphics_276 = new cjs.Graphics().p("AoJGBIAAsBIQUAAIAAMBg");
	var mask_1_graphics_277 = new cjs.Graphics().p("AoJGNIAAsYIQUAAIAAMYg");
	var mask_1_graphics_278 = new cjs.Graphics().p("AoJGYIAAsvIQUAAIAAMvg");
	var mask_1_graphics_279 = new cjs.Graphics().p("AoJGjIAAtFIQUAAIAANFg");
	var mask_1_graphics_280 = new cjs.Graphics().p("AoJGuIAAtbIQUAAIAANbg");
	var mask_1_graphics_281 = new cjs.Graphics().p("AoJG6IAAtyIQUAAIAANyg");
	var mask_1_graphics_282 = new cjs.Graphics().p("AoJHFIAAuJIQUAAIAAOJg");
	var mask_1_graphics_283 = new cjs.Graphics().p("AoJHQIAAufIQUAAIAAOfg");
	var mask_1_graphics_284 = new cjs.Graphics().p("AoJHbIAAu1IQUAAIAAO1g");
	var mask_1_graphics_285 = new cjs.Graphics().p("AoJHnIAAvMIQUAAIAAPMg");
	var mask_1_graphics_286 = new cjs.Graphics().p("AoJHyIAAvjIQUAAIAAPjg");
	var mask_1_graphics_287 = new cjs.Graphics().p("AoJH9IAAv5IQUAAIAAP5g");
	var mask_1_graphics_288 = new cjs.Graphics().p("AoJIIIAAwPIQUAAIAAQPg");
	var mask_1_graphics_289 = new cjs.Graphics().p("AoJITIAAwlIQUAAIAAQlg");
	var mask_1_graphics_290 = new cjs.Graphics().p("AoJIeIAAw7IQUAAIAAQ7g");
	var mask_1_graphics_291 = new cjs.Graphics().p("AoJIqIAAxTIQUAAIAARTg");
	var mask_1_graphics_292 = new cjs.Graphics().p("AoJI1IAAxpIQUAAIAARpg");
	var mask_1_graphics_293 = new cjs.Graphics().p("AoJJAIAAx/IQUAAIAAR/g");
	var mask_1_graphics_294 = new cjs.Graphics().p("AoJJLIAAyVIQUAAIAASVg");
	var mask_1_graphics_295 = new cjs.Graphics().p("AoJJXIAAytIQUAAIAAStg");
	var mask_1_graphics_296 = new cjs.Graphics().p("AoJJiIAAzDIQUAAIAATDg");
	var mask_1_graphics_297 = new cjs.Graphics().p("AoJJtIAAzZIQUAAIAATZg");
	var mask_1_graphics_298 = new cjs.Graphics().p("AoJJ4IAAzvIQUAAIAATvg");
	var mask_1_graphics_299 = new cjs.Graphics().p("AoJJ4IAAzvIQUAAIAATvg");
	var mask_1_graphics_300 = new cjs.Graphics().p("AoJJ4IAAzvIQUAAIAATvg");
	var mask_1_graphics_301 = new cjs.Graphics().p("AoJJtIAAzZIQUAAIAATZg");
	var mask_1_graphics_302 = new cjs.Graphics().p("AoJJhIAAzBIQUAAIAATBg");
	var mask_1_graphics_303 = new cjs.Graphics().p("AoJJVIAAypIQUAAIAASpg");
	var mask_1_graphics_304 = new cjs.Graphics().p("AoJJKIAAySIQUAAIAASSg");
	var mask_1_graphics_305 = new cjs.Graphics().p("AoJI+IAAx7IQUAAIAAR7g");
	var mask_1_graphics_306 = new cjs.Graphics().p("AoJIyIAAxjIQUAAIAARjg");
	var mask_1_graphics_307 = new cjs.Graphics().p("AoJImIAAxLIQUAAIAARLg");
	var mask_1_graphics_308 = new cjs.Graphics().p("AoJIbIAAw1IQUAAIAAQ1g");
	var mask_1_graphics_309 = new cjs.Graphics().p("AoJIPIAAwdIQUAAIAAQdg");
	var mask_1_graphics_310 = new cjs.Graphics().p("AoJIDIAAwFIQUAAIAAQFg");
	var mask_1_graphics_311 = new cjs.Graphics().p("AoJH4IAAvuIQUAAIAAPug");
	var mask_1_graphics_312 = new cjs.Graphics().p("AoJHsIAAvXIQUAAIAAPXg");
	var mask_1_graphics_313 = new cjs.Graphics().p("AoJHgIAAu/IQUAAIAAO/g");
	var mask_1_graphics_314 = new cjs.Graphics().p("AoJHUIAAunIQUAAIAAOng");
	var mask_1_graphics_315 = new cjs.Graphics().p("AoJHIIAAuPIQUAAIAAOPg");
	var mask_1_graphics_316 = new cjs.Graphics().p("AoJG9IAAt5IQUAAIAAN5g");
	var mask_1_graphics_317 = new cjs.Graphics().p("AoJGxIAAthIQUAAIAANhg");
	var mask_1_graphics_318 = new cjs.Graphics().p("AoJGlIAAtJIQUAAIAANJg");
	var mask_1_graphics_319 = new cjs.Graphics().p("AoJGaIAAszIQUAAIAAMzg");
	var mask_1_graphics_320 = new cjs.Graphics().p("AoJGOIAAsbIQUAAIAAMbg");
	var mask_1_graphics_321 = new cjs.Graphics().p("AoJGCIAAsDIQUAAIAAMDg");
	var mask_1_graphics_322 = new cjs.Graphics().p("AoJF3IAArsIQUAAIAALsg");
	var mask_1_graphics_323 = new cjs.Graphics().p("AoJFrIAArVIQUAAIAALVg");
	var mask_1_graphics_324 = new cjs.Graphics().p("AoJFrIAArVIQUAAIAALVg");
	var mask_1_graphics_325 = new cjs.Graphics().p("AoJFfIAAq9IQUAAIAAK9g");
	var mask_1_graphics_326 = new cjs.Graphics().p("AoJFTIAAqlIQUAAIAAKlg");
	var mask_1_graphics_327 = new cjs.Graphics().p("AoJFHIAAqNIQUAAIAAKNg");
	var mask_1_graphics_328 = new cjs.Graphics().p("AoJE8IAAp2IQUAAIAAJ2g");
	var mask_1_graphics_329 = new cjs.Graphics().p("AoJEwIAApfIQUAAIAAJfg");
	var mask_1_graphics_330 = new cjs.Graphics().p("AoJEkIAApHIQUAAIAAJHg");
	var mask_1_graphics_331 = new cjs.Graphics().p("AoJEYIAAovIQUAAIAAIvg");
	var mask_1_graphics_332 = new cjs.Graphics().p("AoJEMIAAoXIQUAAIAAIXg");
	var mask_1_graphics_333 = new cjs.Graphics().p("AoJEBIAAoAIQUAAIAAIAg");
	var mask_1_graphics_334 = new cjs.Graphics().p("AoJD1IAAnpIQUAAIAAHpg");
	var mask_1_graphics_335 = new cjs.Graphics().p("AoJDpIAAnRIQUAAIAAHRg");
	var mask_1_graphics_336 = new cjs.Graphics().p("AoJDdIAAm5IQUAAIAAG5g");
	var mask_1_graphics_337 = new cjs.Graphics().p("AoJDRIAAmhIQUAAIAAGhg");
	var mask_1_graphics_338 = new cjs.Graphics().p("AoJDGIAAmKIQUAAIAAGKg");
	var mask_1_graphics_339 = new cjs.Graphics().p("AoJC6IAAlzIQUAAIAAFzg");
	var mask_1_graphics_340 = new cjs.Graphics().p("AoJCuIAAlbIQUAAIAAFbg");
	var mask_1_graphics_341 = new cjs.Graphics().p("AoJCiIAAlDIQUAAIAAFDg");
	var mask_1_graphics_342 = new cjs.Graphics().p("AoJCWIAAkrIQUAAIAAErg");
	var mask_1_graphics_343 = new cjs.Graphics().p("AoJCKIAAkTIQUAAIAAETg");
	var mask_1_graphics_344 = new cjs.Graphics().p("AoJB/IAAj9IQUAAIAAD9g");
	var mask_1_graphics_345 = new cjs.Graphics().p("AoJBzIAAjlIQUAAIAADlg");
	var mask_1_graphics_346 = new cjs.Graphics().p("AoJBnIAAjNIQUAAIAADNg");
	var mask_1_graphics_347 = new cjs.Graphics().p("AoJBbIAAi1IQUAAIAAC1g");
	var mask_1_graphics_348 = new cjs.Graphics().p("AoJBPIAAidIQUAAIAACdg");
	var mask_1_graphics_349 = new cjs.Graphics().p("AoJBPIAAidIQUAAIAACdg");
	var mask_1_graphics_350 = new cjs.Graphics().p("AoJBbIAAi1IQUAAIAAC1g");
	var mask_1_graphics_351 = new cjs.Graphics().p("AoJBnIAAjNIQUAAIAADNg");
	var mask_1_graphics_352 = new cjs.Graphics().p("AoJBzIAAjlIQUAAIAADlg");
	var mask_1_graphics_353 = new cjs.Graphics().p("AoJB/IAAj9IQUAAIAAD9g");
	var mask_1_graphics_354 = new cjs.Graphics().p("AoJCKIAAkTIQUAAIAAETg");
	var mask_1_graphics_355 = new cjs.Graphics().p("AoJCWIAAkrIQUAAIAAErg");
	var mask_1_graphics_356 = new cjs.Graphics().p("AoJCiIAAlDIQUAAIAAFDg");
	var mask_1_graphics_357 = new cjs.Graphics().p("AoJCuIAAlbIQUAAIAAFbg");
	var mask_1_graphics_358 = new cjs.Graphics().p("AoJC6IAAlzIQUAAIAAFzg");
	var mask_1_graphics_359 = new cjs.Graphics().p("AoJDGIAAmKIQUAAIAAGKg");
	var mask_1_graphics_360 = new cjs.Graphics().p("AoJDRIAAmhIQUAAIAAGhg");
	var mask_1_graphics_361 = new cjs.Graphics().p("AoJDdIAAm5IQUAAIAAG5g");
	var mask_1_graphics_362 = new cjs.Graphics().p("AoJDpIAAnRIQUAAIAAHRg");
	var mask_1_graphics_363 = new cjs.Graphics().p("AoJD1IAAnpIQUAAIAAHpg");
	var mask_1_graphics_364 = new cjs.Graphics().p("AoJEBIAAoAIQUAAIAAIAg");
	var mask_1_graphics_365 = new cjs.Graphics().p("AoJEMIAAoXIQUAAIAAIXg");
	var mask_1_graphics_366 = new cjs.Graphics().p("AoJEYIAAovIQUAAIAAIvg");
	var mask_1_graphics_367 = new cjs.Graphics().p("AoJEkIAApHIQUAAIAAJHg");
	var mask_1_graphics_368 = new cjs.Graphics().p("AoJEwIAApfIQUAAIAAJfg");
	var mask_1_graphics_369 = new cjs.Graphics().p("AoJE8IAAp2IQUAAIAAJ2g");
	var mask_1_graphics_370 = new cjs.Graphics().p("AoJFHIAAqNIQUAAIAAKNg");
	var mask_1_graphics_371 = new cjs.Graphics().p("AoJFTIAAqlIQUAAIAAKlg");
	var mask_1_graphics_372 = new cjs.Graphics().p("AoJFfIAAq9IQUAAIAAK9g");
	var mask_1_graphics_373 = new cjs.Graphics().p("AoJFrIAArVIQUAAIAALVg");
	var mask_1_graphics_374 = new cjs.Graphics().p("AoJFrIAArVIQUAAIAALVg");
	var mask_1_graphics_375 = new cjs.Graphics().p("AoJF2IAArrIQUAAIAALrg");
	var mask_1_graphics_376 = new cjs.Graphics().p("AoJGBIAAsBIQUAAIAAMBg");
	var mask_1_graphics_377 = new cjs.Graphics().p("AoJGNIAAsYIQUAAIAAMYg");
	var mask_1_graphics_378 = new cjs.Graphics().p("AoJGYIAAsvIQUAAIAAMvg");
	var mask_1_graphics_379 = new cjs.Graphics().p("AoJGjIAAtFIQUAAIAANFg");
	var mask_1_graphics_380 = new cjs.Graphics().p("AoJGuIAAtbIQUAAIAANbg");
	var mask_1_graphics_381 = new cjs.Graphics().p("AoJG6IAAtyIQUAAIAANyg");
	var mask_1_graphics_382 = new cjs.Graphics().p("AoJHFIAAuJIQUAAIAAOJg");
	var mask_1_graphics_383 = new cjs.Graphics().p("AoJHQIAAufIQUAAIAAOfg");
	var mask_1_graphics_384 = new cjs.Graphics().p("AoJHbIAAu1IQUAAIAAO1g");
	var mask_1_graphics_385 = new cjs.Graphics().p("AoJHnIAAvMIQUAAIAAPMg");
	var mask_1_graphics_386 = new cjs.Graphics().p("AoJHyIAAvjIQUAAIAAPjg");
	var mask_1_graphics_387 = new cjs.Graphics().p("AoJH9IAAv5IQUAAIAAP5g");
	var mask_1_graphics_388 = new cjs.Graphics().p("AoJIIIAAwPIQUAAIAAQPg");
	var mask_1_graphics_389 = new cjs.Graphics().p("AoJITIAAwlIQUAAIAAQlg");
	var mask_1_graphics_390 = new cjs.Graphics().p("AoJIeIAAw7IQUAAIAAQ7g");
	var mask_1_graphics_391 = new cjs.Graphics().p("AoJIqIAAxTIQUAAIAARTg");
	var mask_1_graphics_392 = new cjs.Graphics().p("AoJI1IAAxpIQUAAIAARpg");
	var mask_1_graphics_393 = new cjs.Graphics().p("AoJJAIAAx/IQUAAIAAR/g");
	var mask_1_graphics_394 = new cjs.Graphics().p("AoJJLIAAyVIQUAAIAASVg");
	var mask_1_graphics_395 = new cjs.Graphics().p("AoJJXIAAytIQUAAIAAStg");
	var mask_1_graphics_396 = new cjs.Graphics().p("AoJJiIAAzDIQUAAIAATDg");
	var mask_1_graphics_397 = new cjs.Graphics().p("AoJJtIAAzZIQUAAIAATZg");
	var mask_1_graphics_398 = new cjs.Graphics().p("AoJJ4IAAzvIQUAAIAATvg");
	var mask_1_graphics_399 = new cjs.Graphics().p("AoJJ4IAAzvIQUAAIAATvg");

	this.timeline.addTween(cjs.Tween.get(mask_1).to({graphics:mask_1_graphics_0,x:120.35,y:189.85}).wait(1).to({graphics:mask_1_graphics_1,x:120.35,y:188.675}).wait(1).to({graphics:mask_1_graphics_2,x:120.35,y:187.5}).wait(1).to({graphics:mask_1_graphics_3,x:120.35,y:186.325}).wait(1).to({graphics:mask_1_graphics_4,x:120.35,y:185.15}).wait(1).to({graphics:mask_1_graphics_5,x:120.35,y:183.975}).wait(1).to({graphics:mask_1_graphics_6,x:120.35,y:182.825}).wait(1).to({graphics:mask_1_graphics_7,x:120.35,y:181.65}).wait(1).to({graphics:mask_1_graphics_8,x:120.35,y:180.475}).wait(1).to({graphics:mask_1_graphics_9,x:120.35,y:179.3}).wait(1).to({graphics:mask_1_graphics_10,x:120.35,y:178.125}).wait(1).to({graphics:mask_1_graphics_11,x:120.35,y:176.95}).wait(1).to({graphics:mask_1_graphics_12,x:120.35,y:175.775}).wait(1).to({graphics:mask_1_graphics_13,x:120.35,y:174.6}).wait(1).to({graphics:mask_1_graphics_14,x:120.35,y:173.425}).wait(1).to({graphics:mask_1_graphics_15,x:120.35,y:172.25}).wait(1).to({graphics:mask_1_graphics_16,x:120.35,y:171.075}).wait(1).to({graphics:mask_1_graphics_17,x:120.35,y:169.9}).wait(1).to({graphics:mask_1_graphics_18,x:120.35,y:168.75}).wait(1).to({graphics:mask_1_graphics_19,x:120.35,y:167.575}).wait(1).to({graphics:mask_1_graphics_20,x:120.35,y:166.4}).wait(1).to({graphics:mask_1_graphics_21,x:120.35,y:165.225}).wait(1).to({graphics:mask_1_graphics_22,x:120.35,y:164.05}).wait(1).to({graphics:mask_1_graphics_23,x:120.35,y:162.875}).wait(1).to({graphics:mask_1_graphics_24,x:120.35,y:162.875}).wait(1).to({graphics:mask_1_graphics_25,x:120.35,y:161.7}).wait(1).to({graphics:mask_1_graphics_26,x:120.35,y:160.525}).wait(1).to({graphics:mask_1_graphics_27,x:120.35,y:159.325}).wait(1).to({graphics:mask_1_graphics_28,x:120.35,y:158.15}).wait(1).to({graphics:mask_1_graphics_29,x:120.35,y:156.975}).wait(1).to({graphics:mask_1_graphics_30,x:120.35,y:155.8}).wait(1).to({graphics:mask_1_graphics_31,x:120.35,y:154.625}).wait(1).to({graphics:mask_1_graphics_32,x:120.35,y:153.425}).wait(1).to({graphics:mask_1_graphics_33,x:120.35,y:152.25}).wait(1).to({graphics:mask_1_graphics_34,x:120.35,y:151.075}).wait(1).to({graphics:mask_1_graphics_35,x:120.35,y:149.9}).wait(1).to({graphics:mask_1_graphics_36,x:120.35,y:148.725}).wait(1).to({graphics:mask_1_graphics_37,x:120.35,y:147.525}).wait(1).to({graphics:mask_1_graphics_38,x:120.35,y:146.35}).wait(1).to({graphics:mask_1_graphics_39,x:120.35,y:145.175}).wait(1).to({graphics:mask_1_graphics_40,x:120.35,y:144}).wait(1).to({graphics:mask_1_graphics_41,x:120.35,y:142.8}).wait(1).to({graphics:mask_1_graphics_42,x:120.35,y:141.625}).wait(1).to({graphics:mask_1_graphics_43,x:120.35,y:140.45}).wait(1).to({graphics:mask_1_graphics_44,x:120.35,y:139.275}).wait(1).to({graphics:mask_1_graphics_45,x:120.35,y:138.1}).wait(1).to({graphics:mask_1_graphics_46,x:120.35,y:136.9}).wait(1).to({graphics:mask_1_graphics_47,x:120.35,y:135.725}).wait(1).to({graphics:mask_1_graphics_48,x:120.35,y:134.55}).wait(1).to({graphics:mask_1_graphics_49,x:120.35,y:134.55}).wait(1).to({graphics:mask_1_graphics_50,x:120.35,y:135.725}).wait(1).to({graphics:mask_1_graphics_51,x:120.35,y:136.9}).wait(1).to({graphics:mask_1_graphics_52,x:120.35,y:138.1}).wait(1).to({graphics:mask_1_graphics_53,x:120.35,y:139.275}).wait(1).to({graphics:mask_1_graphics_54,x:120.35,y:140.45}).wait(1).to({graphics:mask_1_graphics_55,x:120.35,y:141.625}).wait(1).to({graphics:mask_1_graphics_56,x:120.35,y:142.8}).wait(1).to({graphics:mask_1_graphics_57,x:120.35,y:144}).wait(1).to({graphics:mask_1_graphics_58,x:120.35,y:145.175}).wait(1).to({graphics:mask_1_graphics_59,x:120.35,y:146.35}).wait(1).to({graphics:mask_1_graphics_60,x:120.35,y:147.525}).wait(1).to({graphics:mask_1_graphics_61,x:120.35,y:148.725}).wait(1).to({graphics:mask_1_graphics_62,x:120.35,y:149.9}).wait(1).to({graphics:mask_1_graphics_63,x:120.35,y:151.075}).wait(1).to({graphics:mask_1_graphics_64,x:120.35,y:152.25}).wait(1).to({graphics:mask_1_graphics_65,x:120.35,y:153.425}).wait(1).to({graphics:mask_1_graphics_66,x:120.35,y:154.625}).wait(1).to({graphics:mask_1_graphics_67,x:120.35,y:155.8}).wait(1).to({graphics:mask_1_graphics_68,x:120.35,y:156.975}).wait(1).to({graphics:mask_1_graphics_69,x:120.35,y:158.15}).wait(1).to({graphics:mask_1_graphics_70,x:120.35,y:159.325}).wait(1).to({graphics:mask_1_graphics_71,x:120.35,y:160.525}).wait(1).to({graphics:mask_1_graphics_72,x:120.35,y:161.7}).wait(1).to({graphics:mask_1_graphics_73,x:120.35,y:162.875}).wait(1).to({graphics:mask_1_graphics_74,x:120.35,y:162.875}).wait(1).to({graphics:mask_1_graphics_75,x:120.35,y:164.05}).wait(1).to({graphics:mask_1_graphics_76,x:120.35,y:165.225}).wait(1).to({graphics:mask_1_graphics_77,x:120.35,y:166.4}).wait(1).to({graphics:mask_1_graphics_78,x:120.35,y:167.575}).wait(1).to({graphics:mask_1_graphics_79,x:120.35,y:168.75}).wait(1).to({graphics:mask_1_graphics_80,x:120.35,y:169.9}).wait(1).to({graphics:mask_1_graphics_81,x:120.35,y:171.075}).wait(1).to({graphics:mask_1_graphics_82,x:120.35,y:172.25}).wait(1).to({graphics:mask_1_graphics_83,x:120.35,y:173.425}).wait(1).to({graphics:mask_1_graphics_84,x:120.35,y:174.6}).wait(1).to({graphics:mask_1_graphics_85,x:120.35,y:175.775}).wait(1).to({graphics:mask_1_graphics_86,x:120.35,y:176.95}).wait(1).to({graphics:mask_1_graphics_87,x:120.35,y:178.125}).wait(1).to({graphics:mask_1_graphics_88,x:120.35,y:179.3}).wait(1).to({graphics:mask_1_graphics_89,x:120.35,y:180.475}).wait(1).to({graphics:mask_1_graphics_90,x:120.35,y:181.65}).wait(1).to({graphics:mask_1_graphics_91,x:120.35,y:182.825}).wait(1).to({graphics:mask_1_graphics_92,x:120.35,y:183.975}).wait(1).to({graphics:mask_1_graphics_93,x:120.35,y:185.15}).wait(1).to({graphics:mask_1_graphics_94,x:120.35,y:186.325}).wait(1).to({graphics:mask_1_graphics_95,x:120.35,y:187.5}).wait(1).to({graphics:mask_1_graphics_96,x:120.35,y:188.675}).wait(1).to({graphics:mask_1_graphics_97,x:120.35,y:189.85}).wait(1).to({graphics:mask_1_graphics_98,x:120.35,y:189.85}).wait(1).to({graphics:mask_1_graphics_99,x:120.35,y:189.85}).wait(1).to({graphics:mask_1_graphics_100,x:120.35,y:188.725}).wait(1).to({graphics:mask_1_graphics_101,x:120.35,y:187.6}).wait(1).to({graphics:mask_1_graphics_102,x:120.35,y:186.475}).wait(1).to({graphics:mask_1_graphics_103,x:120.35,y:185.35}).wait(1).to({graphics:mask_1_graphics_104,x:120.35,y:184.225}).wait(1).to({graphics:mask_1_graphics_105,x:120.35,y:183.1}).wait(1).to({graphics:mask_1_graphics_106,x:120.35,y:181.975}).wait(1).to({graphics:mask_1_graphics_107,x:120.35,y:180.85}).wait(1).to({graphics:mask_1_graphics_108,x:120.35,y:179.725}).wait(1).to({graphics:mask_1_graphics_109,x:120.35,y:178.6}).wait(1).to({graphics:mask_1_graphics_110,x:120.35,y:177.475}).wait(1).to({graphics:mask_1_graphics_111,x:120.35,y:176.375}).wait(1).to({graphics:mask_1_graphics_112,x:120.35,y:175.25}).wait(1).to({graphics:mask_1_graphics_113,x:120.35,y:174.125}).wait(1).to({graphics:mask_1_graphics_114,x:120.35,y:173}).wait(1).to({graphics:mask_1_graphics_115,x:120.35,y:171.875}).wait(1).to({graphics:mask_1_graphics_116,x:120.35,y:170.75}).wait(1).to({graphics:mask_1_graphics_117,x:120.35,y:169.625}).wait(1).to({graphics:mask_1_graphics_118,x:120.35,y:168.5}).wait(1).to({graphics:mask_1_graphics_119,x:120.35,y:167.375}).wait(1).to({graphics:mask_1_graphics_120,x:120.35,y:166.25}).wait(1).to({graphics:mask_1_graphics_121,x:120.35,y:165.125}).wait(1).to({graphics:mask_1_graphics_122,x:120.35,y:164}).wait(1).to({graphics:mask_1_graphics_123,x:120.35,y:162.875}).wait(1).to({graphics:mask_1_graphics_124,x:120.35,y:162.875}).wait(1).to({graphics:mask_1_graphics_125,x:120.35,y:161.7}).wait(1).to({graphics:mask_1_graphics_126,x:120.35,y:160.525}).wait(1).to({graphics:mask_1_graphics_127,x:120.35,y:159.325}).wait(1).to({graphics:mask_1_graphics_128,x:120.35,y:158.15}).wait(1).to({graphics:mask_1_graphics_129,x:120.35,y:156.975}).wait(1).to({graphics:mask_1_graphics_130,x:120.35,y:155.8}).wait(1).to({graphics:mask_1_graphics_131,x:120.35,y:154.625}).wait(1).to({graphics:mask_1_graphics_132,x:120.35,y:153.425}).wait(1).to({graphics:mask_1_graphics_133,x:120.35,y:152.25}).wait(1).to({graphics:mask_1_graphics_134,x:120.35,y:151.075}).wait(1).to({graphics:mask_1_graphics_135,x:120.35,y:149.9}).wait(1).to({graphics:mask_1_graphics_136,x:120.35,y:148.725}).wait(1).to({graphics:mask_1_graphics_137,x:120.35,y:147.525}).wait(1).to({graphics:mask_1_graphics_138,x:120.35,y:146.35}).wait(1).to({graphics:mask_1_graphics_139,x:120.35,y:145.175}).wait(1).to({graphics:mask_1_graphics_140,x:120.35,y:144}).wait(1).to({graphics:mask_1_graphics_141,x:120.35,y:142.8}).wait(1).to({graphics:mask_1_graphics_142,x:120.35,y:141.625}).wait(1).to({graphics:mask_1_graphics_143,x:120.35,y:140.45}).wait(1).to({graphics:mask_1_graphics_144,x:120.35,y:139.275}).wait(1).to({graphics:mask_1_graphics_145,x:120.35,y:138.1}).wait(1).to({graphics:mask_1_graphics_146,x:120.35,y:136.9}).wait(1).to({graphics:mask_1_graphics_147,x:120.35,y:135.725}).wait(1).to({graphics:mask_1_graphics_148,x:120.35,y:134.55}).wait(1).to({graphics:mask_1_graphics_149,x:120.35,y:134.55}).wait(1).to({graphics:mask_1_graphics_150,x:120.35,y:135.725}).wait(1).to({graphics:mask_1_graphics_151,x:120.35,y:136.9}).wait(1).to({graphics:mask_1_graphics_152,x:120.35,y:138.1}).wait(1).to({graphics:mask_1_graphics_153,x:120.35,y:139.275}).wait(1).to({graphics:mask_1_graphics_154,x:120.35,y:140.45}).wait(1).to({graphics:mask_1_graphics_155,x:120.35,y:141.625}).wait(1).to({graphics:mask_1_graphics_156,x:120.35,y:142.8}).wait(1).to({graphics:mask_1_graphics_157,x:120.35,y:144}).wait(1).to({graphics:mask_1_graphics_158,x:120.35,y:145.175}).wait(1).to({graphics:mask_1_graphics_159,x:120.35,y:146.35}).wait(1).to({graphics:mask_1_graphics_160,x:120.35,y:147.525}).wait(1).to({graphics:mask_1_graphics_161,x:120.35,y:148.725}).wait(1).to({graphics:mask_1_graphics_162,x:120.35,y:149.9}).wait(1).to({graphics:mask_1_graphics_163,x:120.35,y:151.075}).wait(1).to({graphics:mask_1_graphics_164,x:120.35,y:152.25}).wait(1).to({graphics:mask_1_graphics_165,x:120.35,y:153.425}).wait(1).to({graphics:mask_1_graphics_166,x:120.35,y:154.625}).wait(1).to({graphics:mask_1_graphics_167,x:120.35,y:155.8}).wait(1).to({graphics:mask_1_graphics_168,x:120.35,y:156.975}).wait(1).to({graphics:mask_1_graphics_169,x:120.35,y:158.15}).wait(1).to({graphics:mask_1_graphics_170,x:120.35,y:159.325}).wait(1).to({graphics:mask_1_graphics_171,x:120.35,y:160.525}).wait(1).to({graphics:mask_1_graphics_172,x:120.35,y:161.7}).wait(1).to({graphics:mask_1_graphics_173,x:120.35,y:162.875}).wait(1).to({graphics:mask_1_graphics_174,x:120.35,y:162.875}).wait(1).to({graphics:mask_1_graphics_175,x:120.35,y:164}).wait(1).to({graphics:mask_1_graphics_176,x:120.35,y:165.125}).wait(1).to({graphics:mask_1_graphics_177,x:120.35,y:166.25}).wait(1).to({graphics:mask_1_graphics_178,x:120.35,y:167.375}).wait(1).to({graphics:mask_1_graphics_179,x:120.35,y:168.5}).wait(1).to({graphics:mask_1_graphics_180,x:120.35,y:169.625}).wait(1).to({graphics:mask_1_graphics_181,x:120.35,y:170.75}).wait(1).to({graphics:mask_1_graphics_182,x:120.35,y:171.875}).wait(1).to({graphics:mask_1_graphics_183,x:120.35,y:173}).wait(1).to({graphics:mask_1_graphics_184,x:120.35,y:174.125}).wait(1).to({graphics:mask_1_graphics_185,x:120.35,y:175.25}).wait(1).to({graphics:mask_1_graphics_186,x:120.35,y:176.375}).wait(1).to({graphics:mask_1_graphics_187,x:120.35,y:177.475}).wait(1).to({graphics:mask_1_graphics_188,x:120.35,y:178.6}).wait(1).to({graphics:mask_1_graphics_189,x:120.35,y:179.725}).wait(1).to({graphics:mask_1_graphics_190,x:120.35,y:180.85}).wait(1).to({graphics:mask_1_graphics_191,x:120.35,y:181.975}).wait(1).to({graphics:mask_1_graphics_192,x:120.35,y:183.1}).wait(1).to({graphics:mask_1_graphics_193,x:120.35,y:184.225}).wait(1).to({graphics:mask_1_graphics_194,x:120.35,y:185.35}).wait(1).to({graphics:mask_1_graphics_195,x:120.35,y:186.475}).wait(1).to({graphics:mask_1_graphics_196,x:120.35,y:187.6}).wait(1).to({graphics:mask_1_graphics_197,x:120.35,y:188.725}).wait(1).to({graphics:mask_1_graphics_198,x:120.35,y:189.85}).wait(1).to({graphics:mask_1_graphics_199,x:120.35,y:189.85}).wait(1).to({graphics:mask_1_graphics_200,x:120.35,y:189.85}).wait(1).to({graphics:mask_1_graphics_201,x:120.35,y:188.675}).wait(1).to({graphics:mask_1_graphics_202,x:120.35,y:187.5}).wait(1).to({graphics:mask_1_graphics_203,x:120.35,y:186.325}).wait(1).to({graphics:mask_1_graphics_204,x:120.35,y:185.15}).wait(1).to({graphics:mask_1_graphics_205,x:120.35,y:183.975}).wait(1).to({graphics:mask_1_graphics_206,x:120.35,y:182.825}).wait(1).to({graphics:mask_1_graphics_207,x:120.35,y:181.65}).wait(1).to({graphics:mask_1_graphics_208,x:120.35,y:180.475}).wait(1).to({graphics:mask_1_graphics_209,x:120.35,y:179.3}).wait(1).to({graphics:mask_1_graphics_210,x:120.35,y:178.125}).wait(1).to({graphics:mask_1_graphics_211,x:120.35,y:176.95}).wait(1).to({graphics:mask_1_graphics_212,x:120.35,y:175.775}).wait(1).to({graphics:mask_1_graphics_213,x:120.35,y:174.6}).wait(1).to({graphics:mask_1_graphics_214,x:120.35,y:173.425}).wait(1).to({graphics:mask_1_graphics_215,x:120.35,y:172.25}).wait(1).to({graphics:mask_1_graphics_216,x:120.35,y:171.075}).wait(1).to({graphics:mask_1_graphics_217,x:120.35,y:169.9}).wait(1).to({graphics:mask_1_graphics_218,x:120.35,y:168.75}).wait(1).to({graphics:mask_1_graphics_219,x:120.35,y:167.575}).wait(1).to({graphics:mask_1_graphics_220,x:120.35,y:166.4}).wait(1).to({graphics:mask_1_graphics_221,x:120.35,y:165.225}).wait(1).to({graphics:mask_1_graphics_222,x:120.35,y:164.05}).wait(1).to({graphics:mask_1_graphics_223,x:120.35,y:162.875}).wait(1).to({graphics:mask_1_graphics_224,x:120.35,y:162.875}).wait(1).to({graphics:mask_1_graphics_225,x:120.35,y:161.7}).wait(1).to({graphics:mask_1_graphics_226,x:120.35,y:160.525}).wait(1).to({graphics:mask_1_graphics_227,x:120.35,y:159.325}).wait(1).to({graphics:mask_1_graphics_228,x:120.35,y:158.15}).wait(1).to({graphics:mask_1_graphics_229,x:120.35,y:156.975}).wait(1).to({graphics:mask_1_graphics_230,x:120.35,y:155.8}).wait(1).to({graphics:mask_1_graphics_231,x:120.35,y:154.625}).wait(1).to({graphics:mask_1_graphics_232,x:120.35,y:153.425}).wait(1).to({graphics:mask_1_graphics_233,x:120.35,y:152.25}).wait(1).to({graphics:mask_1_graphics_234,x:120.35,y:151.075}).wait(1).to({graphics:mask_1_graphics_235,x:120.35,y:149.9}).wait(1).to({graphics:mask_1_graphics_236,x:120.35,y:148.725}).wait(1).to({graphics:mask_1_graphics_237,x:120.35,y:147.525}).wait(1).to({graphics:mask_1_graphics_238,x:120.35,y:146.35}).wait(1).to({graphics:mask_1_graphics_239,x:120.35,y:145.175}).wait(1).to({graphics:mask_1_graphics_240,x:120.35,y:144}).wait(1).to({graphics:mask_1_graphics_241,x:120.35,y:142.8}).wait(1).to({graphics:mask_1_graphics_242,x:120.35,y:141.625}).wait(1).to({graphics:mask_1_graphics_243,x:120.35,y:140.45}).wait(1).to({graphics:mask_1_graphics_244,x:120.35,y:139.275}).wait(1).to({graphics:mask_1_graphics_245,x:120.35,y:138.1}).wait(1).to({graphics:mask_1_graphics_246,x:120.35,y:136.9}).wait(1).to({graphics:mask_1_graphics_247,x:120.35,y:135.725}).wait(1).to({graphics:mask_1_graphics_248,x:120.35,y:134.55}).wait(1).to({graphics:mask_1_graphics_249,x:120.35,y:134.55}).wait(1).to({graphics:mask_1_graphics_250,x:120.35,y:135.725}).wait(1).to({graphics:mask_1_graphics_251,x:120.35,y:136.9}).wait(1).to({graphics:mask_1_graphics_252,x:120.35,y:138.1}).wait(1).to({graphics:mask_1_graphics_253,x:120.35,y:139.275}).wait(1).to({graphics:mask_1_graphics_254,x:120.35,y:140.45}).wait(1).to({graphics:mask_1_graphics_255,x:120.35,y:141.625}).wait(1).to({graphics:mask_1_graphics_256,x:120.35,y:142.8}).wait(1).to({graphics:mask_1_graphics_257,x:120.35,y:144}).wait(1).to({graphics:mask_1_graphics_258,x:120.35,y:145.175}).wait(1).to({graphics:mask_1_graphics_259,x:120.35,y:146.35}).wait(1).to({graphics:mask_1_graphics_260,x:120.35,y:147.525}).wait(1).to({graphics:mask_1_graphics_261,x:120.35,y:148.725}).wait(1).to({graphics:mask_1_graphics_262,x:120.35,y:149.9}).wait(1).to({graphics:mask_1_graphics_263,x:120.35,y:151.075}).wait(1).to({graphics:mask_1_graphics_264,x:120.35,y:152.25}).wait(1).to({graphics:mask_1_graphics_265,x:120.35,y:153.425}).wait(1).to({graphics:mask_1_graphics_266,x:120.35,y:154.625}).wait(1).to({graphics:mask_1_graphics_267,x:120.35,y:155.8}).wait(1).to({graphics:mask_1_graphics_268,x:120.35,y:156.975}).wait(1).to({graphics:mask_1_graphics_269,x:120.35,y:158.15}).wait(1).to({graphics:mask_1_graphics_270,x:120.35,y:159.325}).wait(1).to({graphics:mask_1_graphics_271,x:120.35,y:160.525}).wait(1).to({graphics:mask_1_graphics_272,x:120.35,y:161.7}).wait(1).to({graphics:mask_1_graphics_273,x:120.35,y:162.875}).wait(1).to({graphics:mask_1_graphics_274,x:120.35,y:162.875}).wait(1).to({graphics:mask_1_graphics_275,x:120.35,y:164}).wait(1).to({graphics:mask_1_graphics_276,x:120.35,y:165.125}).wait(1).to({graphics:mask_1_graphics_277,x:120.35,y:166.25}).wait(1).to({graphics:mask_1_graphics_278,x:120.35,y:167.375}).wait(1).to({graphics:mask_1_graphics_279,x:120.35,y:168.5}).wait(1).to({graphics:mask_1_graphics_280,x:120.35,y:169.625}).wait(1).to({graphics:mask_1_graphics_281,x:120.35,y:170.75}).wait(1).to({graphics:mask_1_graphics_282,x:120.35,y:171.875}).wait(1).to({graphics:mask_1_graphics_283,x:120.35,y:173}).wait(1).to({graphics:mask_1_graphics_284,x:120.35,y:174.125}).wait(1).to({graphics:mask_1_graphics_285,x:120.35,y:175.25}).wait(1).to({graphics:mask_1_graphics_286,x:120.35,y:176.375}).wait(1).to({graphics:mask_1_graphics_287,x:120.35,y:177.475}).wait(1).to({graphics:mask_1_graphics_288,x:120.35,y:178.6}).wait(1).to({graphics:mask_1_graphics_289,x:120.35,y:179.725}).wait(1).to({graphics:mask_1_graphics_290,x:120.35,y:180.85}).wait(1).to({graphics:mask_1_graphics_291,x:120.35,y:181.975}).wait(1).to({graphics:mask_1_graphics_292,x:120.35,y:183.1}).wait(1).to({graphics:mask_1_graphics_293,x:120.35,y:184.225}).wait(1).to({graphics:mask_1_graphics_294,x:120.35,y:185.35}).wait(1).to({graphics:mask_1_graphics_295,x:120.35,y:186.475}).wait(1).to({graphics:mask_1_graphics_296,x:120.35,y:187.6}).wait(1).to({graphics:mask_1_graphics_297,x:120.35,y:188.725}).wait(1).to({graphics:mask_1_graphics_298,x:120.35,y:189.85}).wait(1).to({graphics:mask_1_graphics_299,x:120.35,y:189.85}).wait(1).to({graphics:mask_1_graphics_300,x:120.35,y:189.85}).wait(1).to({graphics:mask_1_graphics_301,x:120.35,y:188.675}).wait(1).to({graphics:mask_1_graphics_302,x:120.35,y:187.5}).wait(1).to({graphics:mask_1_graphics_303,x:120.35,y:186.325}).wait(1).to({graphics:mask_1_graphics_304,x:120.35,y:185.15}).wait(1).to({graphics:mask_1_graphics_305,x:120.35,y:183.975}).wait(1).to({graphics:mask_1_graphics_306,x:120.35,y:182.825}).wait(1).to({graphics:mask_1_graphics_307,x:120.35,y:181.65}).wait(1).to({graphics:mask_1_graphics_308,x:120.35,y:180.475}).wait(1).to({graphics:mask_1_graphics_309,x:120.35,y:179.3}).wait(1).to({graphics:mask_1_graphics_310,x:120.35,y:178.125}).wait(1).to({graphics:mask_1_graphics_311,x:120.35,y:176.95}).wait(1).to({graphics:mask_1_graphics_312,x:120.35,y:175.775}).wait(1).to({graphics:mask_1_graphics_313,x:120.35,y:174.6}).wait(1).to({graphics:mask_1_graphics_314,x:120.35,y:173.425}).wait(1).to({graphics:mask_1_graphics_315,x:120.35,y:172.25}).wait(1).to({graphics:mask_1_graphics_316,x:120.35,y:171.075}).wait(1).to({graphics:mask_1_graphics_317,x:120.35,y:169.9}).wait(1).to({graphics:mask_1_graphics_318,x:120.35,y:168.75}).wait(1).to({graphics:mask_1_graphics_319,x:120.35,y:167.575}).wait(1).to({graphics:mask_1_graphics_320,x:120.35,y:166.4}).wait(1).to({graphics:mask_1_graphics_321,x:120.35,y:165.225}).wait(1).to({graphics:mask_1_graphics_322,x:120.35,y:164.05}).wait(1).to({graphics:mask_1_graphics_323,x:120.35,y:162.875}).wait(1).to({graphics:mask_1_graphics_324,x:120.35,y:162.875}).wait(1).to({graphics:mask_1_graphics_325,x:120.35,y:161.7}).wait(1).to({graphics:mask_1_graphics_326,x:120.35,y:160.525}).wait(1).to({graphics:mask_1_graphics_327,x:120.35,y:159.325}).wait(1).to({graphics:mask_1_graphics_328,x:120.35,y:158.15}).wait(1).to({graphics:mask_1_graphics_329,x:120.35,y:156.975}).wait(1).to({graphics:mask_1_graphics_330,x:120.35,y:155.8}).wait(1).to({graphics:mask_1_graphics_331,x:120.35,y:154.625}).wait(1).to({graphics:mask_1_graphics_332,x:120.35,y:153.425}).wait(1).to({graphics:mask_1_graphics_333,x:120.35,y:152.25}).wait(1).to({graphics:mask_1_graphics_334,x:120.35,y:151.075}).wait(1).to({graphics:mask_1_graphics_335,x:120.35,y:149.9}).wait(1).to({graphics:mask_1_graphics_336,x:120.35,y:148.725}).wait(1).to({graphics:mask_1_graphics_337,x:120.35,y:147.525}).wait(1).to({graphics:mask_1_graphics_338,x:120.35,y:146.35}).wait(1).to({graphics:mask_1_graphics_339,x:120.35,y:145.175}).wait(1).to({graphics:mask_1_graphics_340,x:120.35,y:144}).wait(1).to({graphics:mask_1_graphics_341,x:120.35,y:142.8}).wait(1).to({graphics:mask_1_graphics_342,x:120.35,y:141.625}).wait(1).to({graphics:mask_1_graphics_343,x:120.35,y:140.45}).wait(1).to({graphics:mask_1_graphics_344,x:120.35,y:139.275}).wait(1).to({graphics:mask_1_graphics_345,x:120.35,y:138.1}).wait(1).to({graphics:mask_1_graphics_346,x:120.35,y:136.9}).wait(1).to({graphics:mask_1_graphics_347,x:120.35,y:135.725}).wait(1).to({graphics:mask_1_graphics_348,x:120.35,y:134.55}).wait(1).to({graphics:mask_1_graphics_349,x:120.35,y:134.55}).wait(1).to({graphics:mask_1_graphics_350,x:120.35,y:135.725}).wait(1).to({graphics:mask_1_graphics_351,x:120.35,y:136.9}).wait(1).to({graphics:mask_1_graphics_352,x:120.35,y:138.1}).wait(1).to({graphics:mask_1_graphics_353,x:120.35,y:139.275}).wait(1).to({graphics:mask_1_graphics_354,x:120.35,y:140.45}).wait(1).to({graphics:mask_1_graphics_355,x:120.35,y:141.625}).wait(1).to({graphics:mask_1_graphics_356,x:120.35,y:142.8}).wait(1).to({graphics:mask_1_graphics_357,x:120.35,y:144}).wait(1).to({graphics:mask_1_graphics_358,x:120.35,y:145.175}).wait(1).to({graphics:mask_1_graphics_359,x:120.35,y:146.35}).wait(1).to({graphics:mask_1_graphics_360,x:120.35,y:147.525}).wait(1).to({graphics:mask_1_graphics_361,x:120.35,y:148.725}).wait(1).to({graphics:mask_1_graphics_362,x:120.35,y:149.9}).wait(1).to({graphics:mask_1_graphics_363,x:120.35,y:151.075}).wait(1).to({graphics:mask_1_graphics_364,x:120.35,y:152.25}).wait(1).to({graphics:mask_1_graphics_365,x:120.35,y:153.425}).wait(1).to({graphics:mask_1_graphics_366,x:120.35,y:154.625}).wait(1).to({graphics:mask_1_graphics_367,x:120.35,y:155.8}).wait(1).to({graphics:mask_1_graphics_368,x:120.35,y:156.975}).wait(1).to({graphics:mask_1_graphics_369,x:120.35,y:158.15}).wait(1).to({graphics:mask_1_graphics_370,x:120.35,y:159.325}).wait(1).to({graphics:mask_1_graphics_371,x:120.35,y:160.525}).wait(1).to({graphics:mask_1_graphics_372,x:120.35,y:161.7}).wait(1).to({graphics:mask_1_graphics_373,x:120.35,y:162.875}).wait(1).to({graphics:mask_1_graphics_374,x:120.35,y:162.875}).wait(1).to({graphics:mask_1_graphics_375,x:120.35,y:164}).wait(1).to({graphics:mask_1_graphics_376,x:120.35,y:165.125}).wait(1).to({graphics:mask_1_graphics_377,x:120.35,y:166.25}).wait(1).to({graphics:mask_1_graphics_378,x:120.35,y:167.375}).wait(1).to({graphics:mask_1_graphics_379,x:120.35,y:168.5}).wait(1).to({graphics:mask_1_graphics_380,x:120.35,y:169.625}).wait(1).to({graphics:mask_1_graphics_381,x:120.35,y:170.75}).wait(1).to({graphics:mask_1_graphics_382,x:120.35,y:171.875}).wait(1).to({graphics:mask_1_graphics_383,x:120.35,y:173}).wait(1).to({graphics:mask_1_graphics_384,x:120.35,y:174.125}).wait(1).to({graphics:mask_1_graphics_385,x:120.35,y:175.25}).wait(1).to({graphics:mask_1_graphics_386,x:120.35,y:176.375}).wait(1).to({graphics:mask_1_graphics_387,x:120.35,y:177.475}).wait(1).to({graphics:mask_1_graphics_388,x:120.35,y:178.6}).wait(1).to({graphics:mask_1_graphics_389,x:120.35,y:179.725}).wait(1).to({graphics:mask_1_graphics_390,x:120.35,y:180.85}).wait(1).to({graphics:mask_1_graphics_391,x:120.35,y:181.975}).wait(1).to({graphics:mask_1_graphics_392,x:120.35,y:183.1}).wait(1).to({graphics:mask_1_graphics_393,x:120.35,y:184.225}).wait(1).to({graphics:mask_1_graphics_394,x:120.35,y:185.35}).wait(1).to({graphics:mask_1_graphics_395,x:120.35,y:186.475}).wait(1).to({graphics:mask_1_graphics_396,x:120.35,y:187.6}).wait(1).to({graphics:mask_1_graphics_397,x:120.35,y:188.725}).wait(1).to({graphics:mask_1_graphics_398,x:120.35,y:189.85}).wait(1).to({graphics:mask_1_graphics_399,x:120.35,y:189.85}).wait(1));

	// Masked_Layer_75___64
	this.aniB = new lib.sprite98();
	this.aniB.name = "aniB";
	this.aniB.setTransform(116.95,194.85,0.9998,0.9998,179.0206);

	var maskedShapeInstanceList = [this.aniB];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.aniB).wait(400));

	// Masked_Layer_70___64
	this.aniC = new lib.sprite98();
	this.aniC.name = "aniC";
	this.aniC.setTransform(152.1,194.85,0.9998,0.9998,179.0206);

	var maskedShapeInstanceList = [this.aniC];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.aniC).wait(400));

	// Masked_Layer_65___64
	this.aniA = new lib.sprite98();
	this.aniA.name = "aniA";
	this.aniA.setTransform(81.85,194.85,0.9998,0.9998,179.0206);

	var maskedShapeInstanceList = [this.aniA];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.aniA).wait(400));

	// Layer_63
	this.instance_3 = new lib.shape92("synched",0);
	this.instance_3.setTransform(118.6,356.75);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({y:329.5},17).to({y:246.1},30).to({y:245.75},2).to({y:274.5},18).to({y:356.65},30).wait(1).to({y:356.75},0).to({startPosition:0},1).to({y:328.55},18).to({y:245.85},31).to({y:245.75},1).to({y:274.5},18).to({y:356.4},30).to({y:356.65},1).wait(1).to({y:356.75},0).to({startPosition:0},1).to({y:329.5},17).to({y:246.1},30).to({y:245.75},2).to({y:274.5},18).to({y:356.4},30).to({y:356.65},1).wait(1).to({y:356.75},0).to({startPosition:0},1).to({y:329.5},17).to({y:246.1},30).to({y:245.75},2).to({y:274.5},18).to({y:356.4},30).to({y:356.75},2).wait(1));

	// Layer_62
	this.instance_4 = new lib.shape91("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(400));

	// Layer_54
	this.instance_5 = new lib.sprite80();
	this.instance_5.setTransform(369.2,58.7,0.15,0.15);
	this.instance_5.alpha = 0.25;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(68).to({_off:false},0).to({y:48.7,alpha:0},15).to({_off:true},1).wait(9).to({_off:false,y:58.7,alpha:0.25},0).to({y:49.35,alpha:0.0195},14).to({_off:true},1).wait(60).to({_off:false,y:58.7,alpha:0.25},0).to({y:48.7,alpha:0},15).to({_off:true},1).wait(9).to({_off:false,y:58.7,alpha:0.25},0).to({y:48.7,alpha:0},15).to({_off:true},1).wait(59).to({_off:false,y:58.7,alpha:0.25},0).to({y:48.7,alpha:0},15).to({_off:true},1).wait(9).to({_off:false,y:58.7,alpha:0.25},0).to({y:48.7,alpha:0},15).to({_off:true},1).wait(59).to({_off:false,y:58.7,alpha:0.25},0).to({y:48.7,alpha:0},15).to({_off:true},1).wait(9).to({_off:false,y:58.7,alpha:0.25},0).to({y:54.7,alpha:0.1484},6).wait(1));

	// Layer_52
	this.instance_6 = new lib.sprite80();
	this.instance_6.setTransform(369.2,70.2,0.2,0.2);
	this.instance_6.alpha = 0.5;
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(53).to({_off:false},0).to({scaleX:0.15,scaleY:0.15,y:58.7,alpha:0.25},15).to({_off:true},1).wait(9).to({_off:false,scaleX:0.2,scaleY:0.2,y:70.2,alpha:0.5},0).to({scaleX:0.15,scaleY:0.15,y:58.7,alpha:0.25},15).to({_off:true},1).wait(59).to({_off:false,scaleX:0.2,scaleY:0.2,y:70.2,alpha:0.5},0).to({scaleX:0.15,scaleY:0.15,y:58.7,alpha:0.25},15).to({_off:true},1).wait(9).to({_off:false,scaleX:0.2,scaleY:0.2,y:70.2,alpha:0.5},0).to({scaleX:0.15,scaleY:0.15,y:58.7,alpha:0.25},15).to({_off:true},1).wait(59).to({_off:false,scaleX:0.2,scaleY:0.2,y:70.2,alpha:0.5},0).to({scaleX:0.15,scaleY:0.15,y:58.7,alpha:0.25},15).to({_off:true},1).wait(9).to({_off:false,scaleX:0.2,scaleY:0.2,y:70.2,alpha:0.5},0).to({scaleX:0.15,scaleY:0.15,y:58.7,alpha:0.25},15).to({_off:true},1).wait(59).to({_off:false,scaleX:0.2,scaleY:0.2,y:70.2,alpha:0.5},0).to({scaleX:0.15,scaleY:0.15,y:58.7,alpha:0.25},15).to({_off:true},1).wait(9).to({_off:false,scaleX:0.2,scaleY:0.2,y:70.2,alpha:0.5},0).to({scaleX:0.15,scaleY:0.15,y:58.7,alpha:0.25},15).to({_off:true},1).wait(6));

	// Layer_50
	this.instance_7 = new lib.sprite80();
	this.instance_7.setTransform(369.2,82.7,0.253,0.253);
	this.instance_7.alpha = 0.75;
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(38).to({_off:false},0).to({scaleX:0.2,scaleY:0.2,y:70.2,alpha:0.5},15).to({_off:true},1).wait(9).to({_off:false,scaleX:0.253,scaleY:0.253,y:82.7,alpha:0.75},0).to({scaleX:0.2,scaleY:0.2,y:70.2,alpha:0.5},15).to({_off:true},1).wait(59).to({_off:false,scaleX:0.253,scaleY:0.253,y:82.7,alpha:0.75},0).to({scaleX:0.2,scaleY:0.2,y:70.2,alpha:0.5},15).to({_off:true},1).wait(9).to({_off:false,scaleX:0.253,scaleY:0.253,y:82.7,alpha:0.75},0).to({scaleX:0.2,scaleY:0.2,y:70.2,alpha:0.5},15).to({_off:true},1).wait(59).to({_off:false,scaleX:0.253,scaleY:0.253,y:82.7,alpha:0.75},0).to({scaleX:0.2,scaleY:0.2,y:70.2,alpha:0.5},15).to({_off:true},1).wait(9).to({_off:false,scaleX:0.253,scaleY:0.253,y:82.7,alpha:0.75},0).to({scaleX:0.2,scaleY:0.2,y:70.2,alpha:0.5},15).to({_off:true},1).wait(59).to({_off:false,scaleX:0.253,scaleY:0.253,y:82.7,alpha:0.75},0).to({scaleX:0.2,scaleY:0.2,y:70.2,alpha:0.5},15).to({_off:true},1).wait(9).to({_off:false,scaleX:0.253,scaleY:0.253,y:82.7,alpha:0.75},0).to({scaleX:0.2,scaleY:0.2,y:70.2,alpha:0.5},15).to({_off:true},1).wait(21));

	// Layer_48
	this.instance_8 = new lib.sprite80();
	this.instance_8.setTransform(369.2,55.35,0.15,0.15);
	this.instance_8.alpha = 0.1719;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).to({y:54.7,alpha:0.1484},1).to({y:50.05,alpha:0.0391},7).to({_off:true},1).wait(15).to({_off:false,scaleX:0.2831,scaleY:0.2831,x:369.35,y:96,alpha:1},0).to({scaleX:0.2809,scaleY:0.2809,y:95.05,alpha:0.9805},1).to({scaleX:0.253,scaleY:0.253,x:369.2,y:82.7,alpha:0.75},13).to({_off:true},1).wait(4).to({_off:false,scaleX:0.2831,scaleY:0.2831,x:369.35,y:96,alpha:0},0).to({alpha:1},5).to({scaleX:0.253,scaleY:0.253,x:369.2,y:82.7,alpha:0.75},15).to({_off:true},1).wait(60).to({_off:false,scaleX:0.2831,scaleY:0.2831,x:369.35,y:96,alpha:1},0).to({scaleX:0.2809,scaleY:0.2809,y:95.05,alpha:0.9805},1).to({scaleX:0.253,scaleY:0.253,x:369.2,y:82.7,alpha:0.75},13).to({_off:true},1).wait(4).to({_off:false,scaleX:0.2831,scaleY:0.2831,x:369.35,y:96,alpha:0},0).to({alpha:1},5).to({scaleX:0.253,scaleY:0.253,x:369.2,y:82.7,alpha:0.75},15).to({_off:true},1).wait(60).to({_off:false,scaleX:0.2831,scaleY:0.2831,x:369.35,y:96,alpha:1},0).to({scaleX:0.2809,scaleY:0.2809,y:95.05,alpha:0.9805},1).to({scaleX:0.253,scaleY:0.253,x:369.2,y:82.7,alpha:0.75},13).to({_off:true},1).wait(4).to({_off:false,scaleX:0.2831,scaleY:0.2831,x:369.35,y:96,alpha:0},0).to({alpha:1},5).to({scaleX:0.253,scaleY:0.253,x:369.2,y:82.7,alpha:0.75},15).to({_off:true},1).wait(60).to({_off:false,scaleX:0.2831,scaleY:0.2831,x:369.35,y:96,alpha:1},0).to({scaleX:0.2809,scaleY:0.2809,y:95.05,alpha:0.9805},1).to({scaleX:0.253,scaleY:0.253,x:369.2,y:82.7,alpha:0.75},13).to({_off:true},1).wait(4).to({_off:false,scaleX:0.2831,scaleY:0.2831,x:369.35,y:96,alpha:0},0).to({alpha:1},5).to({scaleX:0.253,scaleY:0.253,x:369.2,y:82.7,alpha:0.75},15).to({_off:true},1).wait(36));

	// Mask_Layer_22 (mask)
	var mask_2 = new cjs.Shape();
	mask_2._off = true;
	mask_2.graphics.p("ANsMRIAAmnIA5gVIi6iGIhSA6IjNifIB5hXIjLhfQhOAXhYAAQjbAAiciMQg0gvgig1IhtAkIAhAqIkxBWIgYggImnCKIgPAAIAAD9IhWgtIAAmxIFLiiIgXgdIEMiGIAYAfIEfiNQAghXBGhJIAagZQCciMDbAAQDaAACcCMIAaAZQCCCFAAC0QAAB9g/BmIgGAJICpCAIBghGIDOCgIhZBAIA8EcIA5gVIAAlBIDFAAIABD3IAGgCIACF4IAAALIAAAJIgCG2gA1ig6QABg+AsgsQAKgKAKgHIAUgKIAAF4IhVAsg");
	mask_2.setTransform(240.45,110.375);

	// Masked_Layer_45___22
	this.instance_9 = new lib.sprite89();
	this.instance_9.setTransform(239.2,80.35,1,1.179);
	this.instance_9.alpha = 0.1289;
	this.instance_9._off = true;

	var maskedShapeInstanceList = [this.instance_9];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_2;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(54).to({_off:false},0).wait(346));

	// Masked_Layer_43___22
	this.instance_10 = new lib.sprite87();
	this.instance_10.setTransform(268.4,146.25,1.1857,1.371);
	this.instance_10.alpha = 0.1406;
	this.instance_10._off = true;

	var maskedShapeInstanceList = [this.instance_10];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_2;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(54).to({_off:false},0).wait(346));

	// Masked_Layer_41___22
	this.instance_11 = new lib.sprite85();
	this.instance_11.setTransform(276.75,46.2,1.6985,1.3705);
	this.instance_11.alpha = 0.0195;
	this.instance_11._off = true;

	var maskedShapeInstanceList = [this.instance_11];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_2;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(54).to({_off:false},0).wait(346));

	// Masked_Layer_39___22
	this.instance_12 = new lib.sprite83();
	this.instance_12.setTransform(157.85,92.7,1.5123,1.5559);
	this.instance_12.alpha = 0.0586;
	this.instance_12._off = true;

	var maskedShapeInstanceList = [this.instance_12];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_2;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(54).to({_off:false},0).wait(346));

	// Masked_Layer_37___22
	this.instance_13 = new lib.sprite89();
	this.instance_13.setTransform(235.25,102.65);
	this.instance_13.alpha = 0.0195;
	this.instance_13._off = true;

	var maskedShapeInstanceList = [this.instance_13];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_2;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(19).to({_off:false},0).wait(381));

	// Masked_Layer_35___22
	this.instance_14 = new lib.sprite87();
	this.instance_14.setTransform(256.35,102.65);
	this.instance_14.alpha = 0.3203;
	this.instance_14._off = true;

	var maskedShapeInstanceList = [this.instance_14];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_2;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(19).to({_off:false},0).wait(381));

	// Masked_Layer_33___22
	this.instance_15 = new lib.sprite85();
	this.instance_15.setTransform(263,52.2,1.5723,1.0288,-0.5601);
	this.instance_15.alpha = 0.2383;
	this.instance_15._off = true;

	var maskedShapeInstanceList = [this.instance_15];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_2;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(19).to({_off:false},0).wait(381));

	// Masked_Layer_31___22
	this.instance_16 = new lib.sprite83();
	this.instance_16.setTransform(157.85,92.7,1.5123,1.5559);
	this.instance_16.alpha = 0.2305;
	this.instance_16._off = true;

	var maskedShapeInstanceList = [this.instance_16];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_2;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(19).to({_off:false},0).wait(381));

	// Masked_Layer_23___22
	this.aniF = new lib.sprite90();
	this.aniF.name = "aniF";
	this.aniF.setTransform(153.15,84.1);

	var maskedShapeInstanceList = [this.aniF];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_2;
	}

	this.timeline.addTween(cjs.Tween.get(this.aniF).wait(400));

	// Mask_Layer_1 (mask)
	var mask_3 = new cjs.Shape();
	mask_3._off = true;
	mask_3.graphics.p("AnGJ7IAAybIDMAAICthaIB3AAICtBaIDwAAIAASbg");
	mask_3.setTransform(118.6,192.5);

	// Masked_Layer_19___1
	this.instance_17 = new lib.sprite80();
	this.instance_17.setTransform(125.65,149.5,0.668,0.668);
	this.instance_17.alpha = 0.0508;
	this.instance_17._off = true;

	var maskedShapeInstanceList = [this.instance_17];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_3;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(54).to({_off:false},0).to({alpha:0.9102},9).wait(1).to({alpha:1},0).wait(36).to({alpha:0.8008},0).to({alpha:1},12).to({y:139.5,alpha:0.0508},4).to({_off:true},1).wait(37).to({_off:false,y:149.5},0).to({alpha:0.9102},9).wait(1).to({alpha:1},0).wait(36).to({alpha:0.8008},0).to({alpha:1},12).to({y:139.5,alpha:0.0508},4).to({_off:true},1).wait(37).to({_off:false,y:149.5},0).to({alpha:0.9102},9).wait(1).to({alpha:1},0).wait(36).to({alpha:0.8008},0).to({alpha:1},12).to({y:139.5,alpha:0.0508},4).to({_off:true},1).wait(37).to({_off:false,y:149.5},0).to({alpha:0.9102},9).wait(1).to({alpha:1},0).wait(36));

	// Masked_Layer_17___1
	this.instance_18 = new lib.sprite80();
	this.instance_18.setTransform(145.15,159.55,0.668,0.668);
	this.instance_18.alpha = 0.0508;
	this.instance_18._off = true;

	var maskedShapeInstanceList = [this.instance_18];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_3;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(57).to({_off:false},0).to({alpha:0.9102},9).wait(1).to({alpha:1},0).wait(33).to({alpha:0.8008},0).to({alpha:1},11).to({y:149.55,alpha:0.0508},5).to({_off:true},1).wait(40).to({_off:false,y:159.55},0).to({alpha:0.9102},9).wait(1).to({alpha:1},0).wait(33).to({alpha:0.8008},0).to({alpha:1},11).to({y:149.55,alpha:0.0508},5).to({_off:true},1).wait(40).to({_off:false,y:159.55},0).to({alpha:0.9102},9).wait(1).to({alpha:1},0).wait(33).to({alpha:0.8008},0).to({alpha:1},11).to({y:149.55,alpha:0.0508},5).to({_off:true},1).wait(40).to({_off:false,y:159.55},0).to({alpha:0.9102},9).wait(1).to({alpha:1},0).wait(33));

	// Masked_Layer_15___1
	this.instance_19 = new lib.sprite80();
	this.instance_19.setTransform(101.4,162.95,0.668,0.668);
	this.instance_19.alpha = 0.0508;
	this.instance_19._off = true;

	var maskedShapeInstanceList = [this.instance_19];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_3;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(59).to({_off:false},0).to({alpha:0.9102},9).wait(1).to({alpha:1},0).wait(31).to({alpha:0.8008},0).to({alpha:1},7).to({y:152.95,alpha:0.0508},4).to({_off:true},1).wait(47).to({_off:false,y:162.95},0).to({alpha:0.9102},9).wait(1).to({alpha:1},0).wait(31).to({alpha:0.8008},0).to({alpha:1},7).to({y:152.95,alpha:0.0508},4).to({_off:true},1).wait(47).to({_off:false,y:162.95},0).to({alpha:0.9102},9).wait(1).to({alpha:1},0).wait(31).to({alpha:0.8008},0).to({alpha:1},7).to({y:152.95,alpha:0.0508},4).to({_off:true},1).wait(47).to({_off:false,y:162.95},0).to({alpha:0.9102},9).wait(1).to({alpha:1},0).wait(31));

	// Masked_Layer_13___1
	this.instance_20 = new lib.sprite80();
	this.instance_20.setTransform(93.95,176.55,0.668,0.668);
	this.instance_20.alpha = 0.0508;
	this.instance_20._off = true;

	var maskedShapeInstanceList = [this.instance_20];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_3;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(61).to({_off:false},0).to({alpha:0.9102},9).wait(1).to({alpha:1},0).wait(29).to({alpha:0.8008},0).to({alpha:1},4).to({y:166.55,alpha:0.0508},4).to({_off:true},1).wait(52).to({_off:false,y:176.55},0).to({alpha:0.9102},9).wait(1).to({alpha:1},0).wait(29).to({alpha:0.8008},0).to({alpha:1},4).to({y:166.55,alpha:0.0508},4).to({_off:true},1).wait(52).to({_off:false,y:176.55},0).to({alpha:0.9102},9).wait(1).to({alpha:1},0).wait(29).to({alpha:0.8008},0).to({alpha:1},4).to({y:166.55,alpha:0.0508},4).to({_off:true},1).wait(52).to({_off:false,y:176.55},0).to({alpha:0.9102},9).wait(1).to({alpha:1},0).wait(29));

	// Masked_Layer_11___1
	this.instance_21 = new lib.sprite80();
	this.instance_21.setTransform(125.65,149.5,0.668,0.668);
	this.instance_21.alpha = 0.8008;

	var maskedShapeInstanceList = [this.instance_21];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_3;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_21).to({alpha:1},12).to({y:139.5,alpha:0.0508},4).to({_off:true},1).wait(46).to({_off:false,x:138.4,y:192.7},0).to({alpha:0.9102},9).wait(1).to({alpha:1},0).to({alpha:0.6016},27).to({y:182.7,alpha:0.0508},4).to({_off:true},1).wait(58).to({_off:false,y:192.7},0).to({alpha:0.9102},9).wait(1).to({alpha:1},0).to({alpha:0.6016},27).to({y:182.7,alpha:0.0508},4).to({_off:true},1).wait(58).to({_off:false,y:192.7},0).to({alpha:0.9102},9).wait(1).to({alpha:1},0).to({alpha:0.6016},27).to({y:182.7,alpha:0.0508},4).to({_off:true},1).wait(58).to({_off:false,y:192.7},0).to({alpha:0.9102},9).wait(1).to({alpha:1},0).wait(27));

	// Masked_Layer_9___1
	this.instance_22 = new lib.sprite80();
	this.instance_22.setTransform(145.15,159.55,0.668,0.668);
	this.instance_22.alpha = 0.8008;

	var maskedShapeInstanceList = [this.instance_22];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_3;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_22).to({alpha:1},11).to({y:149.55,alpha:0.0508},5).to({_off:true},1).wait(48).to({_off:false,x:89.45,y:196.15},0).to({alpha:0.9102},9).wait(1).to({alpha:1},0).wait(18).to({y:186.15,alpha:0.0508},6).to({_off:true},1).wait(65).to({_off:false,y:196.15},0).to({alpha:0.9102},9).wait(1).to({alpha:1},0).wait(18).to({y:186.15,alpha:0.0508},6).to({_off:true},1).wait(65).to({_off:false,y:196.15},0).to({alpha:0.9102},9).wait(1).to({alpha:1},0).wait(18).to({y:186.15,alpha:0.0508},6).to({_off:true},1).wait(65).to({_off:false,y:196.15},0).to({alpha:0.9102},9).wait(1).to({alpha:1},0).wait(18).to({y:186.15,alpha:0.0508},6).wait(1));

	// Masked_Layer_7___1
	this.instance_23 = new lib.sprite80();
	this.instance_23.setTransform(101.4,162.95,0.668,0.668);
	this.instance_23.alpha = 0.8008;

	var maskedShapeInstanceList = [this.instance_23];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_3;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_23).to({alpha:1},7).to({y:152.95,alpha:0.0508},4).to({_off:true},1).wait(55).to({_off:false,x:143.95,y:216.15},0).to({alpha:0.9102},9).wait(1).to({alpha:1},0).wait(14).to({y:206.15,alpha:0.0508},5).to({_off:true},1).wait(70).to({_off:false,y:216.15},0).to({alpha:0.9102},9).wait(1).to({alpha:1},0).wait(14).to({y:206.15,alpha:0.0508},5).to({_off:true},1).wait(70).to({_off:false,y:216.15},0).to({alpha:0.9102},9).wait(1).to({alpha:1},0).wait(14).to({y:206.15,alpha:0.0508},5).to({_off:true},1).wait(70).to({_off:false,y:216.15},0).to({alpha:0.9102},9).wait(1).to({alpha:1},0).wait(14).to({y:206.15,alpha:0.0508},5).to({_off:true},1).wait(3));

	// Masked_Layer_5___1
	this.instance_24 = new lib.sprite80();
	this.instance_24.setTransform(93.95,176.55,0.668,0.668);
	this.instance_24.alpha = 0.8008;

	var maskedShapeInstanceList = [this.instance_24];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_3;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_24).to({alpha:1},4).to({y:166.55,alpha:0.0508},4).to({_off:true},1).wait(60).to({_off:false,x:110.15,y:222.2},0).to({alpha:0.9102},9).wait(1).to({alpha:1},0).wait(10).to({y:212.2,alpha:0.0508},5).to({_off:true},1).wait(74).to({_off:false,y:222.2},0).to({alpha:0.9102},9).wait(1).to({alpha:1},0).wait(10).to({y:212.2,alpha:0.0508},5).to({_off:true},1).wait(74).to({_off:false,y:222.2},0).to({alpha:0.9102},9).wait(1).to({alpha:1},0).wait(10).to({y:212.2,alpha:0.0508},5).to({_off:true},1).wait(74).to({_off:false,y:222.2},0).to({alpha:0.9102},9).wait(1).to({alpha:1},0).wait(10).to({y:212.2,alpha:0.0508},5).to({_off:true},1).wait(5));

	// Masked_Layer_4___1
	this.instance_25 = new lib.shape108("synched",0);
	this.instance_25.setTransform(120.35,156.6,1,0.5008);
	this.instance_25._off = true;
	var instance_25Filter_1 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_25.filters = [instance_25Filter_1];
	this.instance_25.cache(-54,-62,109,124);

	var maskedShapeInstanceList = [this.instance_25];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_3;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(40).to({_off:false},0).to({startPosition:0},33).to({scaleY:0.5301,y:158.35},1).to({scaleY:0.8635,y:178.25,alpha:0.1719},5).wait(1).to({scaleY:0.9302,y:182.3,alpha:0},0).to({startPosition:0},59).wait(1).to({scaleY:0.5008,y:156.6,alpha:1},0).to({startPosition:0},33).to({scaleY:0.6101,y:163.1,alpha:0.8008},2).to({scaleY:0.8502,y:177.5,alpha:0.1992},3).wait(1).to({scaleY:0.9302,y:182.3,alpha:0},0).to({startPosition:0},60).to({scaleY:0.5008,y:156.6,alpha:1},1).wait(1).to({startPosition:0},0).to({startPosition:0},32).to({scaleY:0.5301,y:158.35},1).to({scaleY:0.8635,y:178.25,alpha:0.1719},5).wait(1).to({scaleY:0.9302,y:182.3,alpha:0},0).to({startPosition:0},59).to({scaleY:0.5008,y:156.6,alpha:1},1).wait(1).to({startPosition:0},0).to({startPosition:0},32).to({scaleY:0.6101,y:163.1,alpha:0.8008},2).to({scaleY:0.8502,y:177.5,alpha:0.1992},3).wait(1).to({scaleY:0.9302,y:182.3,alpha:0},0).wait(21));
	this.timeline.addTween(cjs.Tween.get(instance_25Filter_1).wait(40).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 33).wait(1).to(new cjs.ColorFilter(0.5,0.5,0.5,1,127,127,127,0), 5).wait(1).to(new cjs.ColorFilter(0.3984375,0.3984375,0.3984375,1,153,153,153,0), 0).wait(60).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(33).to(new cjs.ColorFilter(0.87890625,0.87890625,0.87890625,1,31,31,31,0), 2).to(new cjs.ColorFilter(0.51953125,0.51953125,0.51953125,1,122,122,122,0), 3).wait(1).to(new cjs.ColorFilter(0.3984375,0.3984375,0.3984375,1,153,153,153,0), 0).wait(61).to(new cjs.ColorFilter(0,0,0,1,255,255,255,0), 0).wait(1).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(33).to(new cjs.ColorFilter(0.5,0.5,0.5,1,127,127,127,0), 5).wait(1).to(new cjs.ColorFilter(0.3984375,0.3984375,0.3984375,1,153,153,153,0), 0).wait(60).to(new cjs.ColorFilter(0,0,0,1,255,255,255,0), 0).wait(1).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(32).to(new cjs.ColorFilter(0.87890625,0.87890625,0.87890625,1,31,31,31,0), 2).to(new cjs.ColorFilter(0.51953125,0.51953125,0.51953125,1,122,122,122,0), 3).wait(1).to(new cjs.ColorFilter(0.3984375,0.3984375,0.3984375,1,153,153,153,0), 0).wait(21));

	// Masked_Layer_3___1
	this.instance_26 = new lib.sprite80();
	this.instance_26.setTransform(138.4,192.7,0.668,0.668);
	this.instance_26.alpha = 0.6016;

	this.instance_27 = new lib.shape109("synched",0);
	this.instance_27.setTransform(120.35,149.35,1,0.3796);
	this.instance_27._off = true;
	var instance_27Filter_2 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_27.filters = [instance_27Filter_2];
	this.instance_27.cache(-54,-62,109,124);

	var maskedShapeInstanceList = [this.instance_26,this.instance_27];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_3;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_26).to({y:182.7,alpha:0.0508},4).to({_off:true},1).wait(395));
	this.timeline.addTween(cjs.Tween.get(this.instance_27).wait(49).to({_off:false},0).to({scaleY:0.9301,y:182.3},35).to({scaleY:0.9469,y:183.35,alpha:0.9297},1).to({scaleY:0.9806,y:185.35,alpha:0.7891},2).to({scaleY:1.1655,y:196.4,alpha:0},11).to({_off:true},1).wait(50).to({_off:false,scaleY:0.3796,y:149.35,alpha:1},0).to({scaleY:0.9301,y:182.3},35).to({scaleY:0.9772,y:185.15,alpha:0.8008},3).to({scaleY:1.1655,y:196.4,alpha:0},12).to({_off:true},1).wait(49).to({_off:false,scaleY:0.3796,y:149.35,alpha:1},0).to({scaleY:0.9301,y:182.3},35).to({scaleY:0.9772,y:185.15,alpha:0.8008},3).to({scaleY:1.1655,y:196.4,alpha:0},12).to({_off:true},1).wait(49).to({_off:false,scaleY:0.3796,y:149.35,alpha:1},0).to({scaleY:0.9301,y:182.3},34).to({scaleY:1.1655,y:196.4,alpha:0},16).wait(1));
	this.timeline.addTween(cjs.Tween.get(instance_27Filter_2).wait(49).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).to(new cjs.ColorFilter(0.69921875,0.69921875,0.69921875,1,0,0,0,0), 35).wait(1).to(new cjs.ColorFilter(0.71875,0.71875,0.71875,1,0,0,0,0), 0).to(new cjs.ColorFilter(0.76171875,0.76171875,0.76171875,1,0,0,0,0), 2).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 11).wait(50).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).to(new cjs.ColorFilter(0.69921875,0.69921875,0.69921875,1,0,0,0,0), 35).to(new cjs.ColorFilter(0.76171875,0.76171875,0.76171875,1,0,0,0,0), 3).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 12).wait(49).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).to(new cjs.ColorFilter(0.69921875,0.69921875,0.69921875,1,0,0,0,0), 35).to(new cjs.ColorFilter(0.76171875,0.76171875,0.76171875,1,0,0,0,0), 3).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 12).wait(49).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).to(new cjs.ColorFilter(0.69921875,0.69921875,0.69921875,1,0,0,0,0), 34).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 16).wait(1));

	// Masked_Layer_2___1
	this.instance_28 = new lib.shape78("synched",0);
	var instance_28Filter_3 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_28.filters = [instance_28Filter_3];
	this.instance_28.cache(66,125,109,131);

	var maskedShapeInstanceList = [this.instance_28];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_3;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_28).to({startPosition:0},13).to({scaleY:0.2164,y:99.25},26).to({_off:true},1).wait(44).to({_off:false,scaleY:1,y:0},0).to({startPosition:0},28).to({scaleY:0.2164,y:99.25},27).to({_off:true},1).wait(44).to({_off:false,scaleY:1,y:0},0).to({startPosition:0},29).to({scaleY:0.2164,y:99.25},26).to({_off:true},1).wait(44).to({_off:false,scaleY:1,y:0},0).to({startPosition:0},29).to({scaleY:0.2164,y:99.25},26).to({_off:true},1).wait(43).to({_off:false,scaleY:1,y:0},0).wait(17));
	this.timeline.addTween(cjs.Tween.get(instance_28Filter_3).wait(13).to(new cjs.ColorFilter(0.6015625,0.6015625,0.6015625,1,0,0,0,0), 26).wait(44).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(28).to(new cjs.ColorFilter(0.6015625,0.6015625,0.6015625,1,0,0,0,0), 27).wait(44).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(29).to(new cjs.ColorFilter(0.6015625,0.6015625,0.6015625,1,0,0,0,0), 26).wait(44).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(29).to(new cjs.ColorFilter(0.6015625,0.6015625,0.6015625,1,0,0,0,0), 26).wait(43).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(17));

	this.filterCacheList = [];
	this.filterCacheList.push({instance: this.instance_25, startFrame:40, endFrame:40, x:-54, y:-62, w:109, h:124});
	this.filterCacheList.push({instance: this.instance_25, startFrame:41, endFrame:73, x:-54, y:-62, w:109, h:124});
	this.filterCacheList.push({instance: this.instance_25, startFrame:74, endFrame:74, x:-54, y:-62, w:109, h:124});
	this.filterCacheList.push({instance: this.instance_25, startFrame:75, endFrame:79, x:-54, y:-62, w:109, h:124});
	this.filterCacheList.push({instance: this.instance_25, startFrame:80, endFrame:80, x:-54, y:-62, w:109, h:124});
	this.filterCacheList.push({instance: this.instance_25, startFrame:140, endFrame:140, x:-54, y:-62, w:109, h:124});
	this.filterCacheList.push({instance: this.instance_25, startFrame:174, endFrame:175, x:-54, y:-62, w:109, h:124});
	this.filterCacheList.push({instance: this.instance_25, startFrame:176, endFrame:178, x:-54, y:-62, w:109, h:124});
	this.filterCacheList.push({instance: this.instance_25, startFrame:179, endFrame:179, x:-54, y:-62, w:109, h:124});
	this.filterCacheList.push({instance: this.instance_25, startFrame:240, endFrame:240, x:-54, y:-62, w:109, h:124});
	this.filterCacheList.push({instance: this.instance_25, startFrame:241, endFrame:241, x:-54, y:-62, w:109, h:124});
	this.filterCacheList.push({instance: this.instance_25, startFrame:274, endFrame:274, x:-54, y:-62, w:109, h:124});
	this.filterCacheList.push({instance: this.instance_25, startFrame:275, endFrame:279, x:-54, y:-62, w:109, h:124});
	this.filterCacheList.push({instance: this.instance_25, startFrame:280, endFrame:280, x:-54, y:-62, w:109, h:124});
	this.filterCacheList.push({instance: this.instance_25, startFrame:340, endFrame:340, x:-54, y:-62, w:109, h:124});
	this.filterCacheList.push({instance: this.instance_25, startFrame:341, endFrame:341, x:-54, y:-62, w:109, h:124});
	this.filterCacheList.push({instance: this.instance_25, startFrame:374, endFrame:375, x:-54, y:-62, w:109, h:124});
	this.filterCacheList.push({instance: this.instance_25, startFrame:376, endFrame:378, x:-54, y:-62, w:109, h:124});
	this.filterCacheList.push({instance: this.instance_25, startFrame:379, endFrame:379, x:-54, y:-62, w:109, h:124});
	this.filterCacheList.push({instance: this.instance_27, startFrame:49, endFrame:49, x:-54, y:-62, w:109, h:124});
	this.filterCacheList.push({instance: this.instance_27, startFrame:50, endFrame:84, x:-54, y:-62, w:109, h:124});
	this.filterCacheList.push({instance: this.instance_27, startFrame:85, endFrame:85, x:-54, y:-62, w:109, h:124});
	this.filterCacheList.push({instance: this.instance_27, startFrame:86, endFrame:87, x:-54, y:-62, w:109, h:124});
	this.filterCacheList.push({instance: this.instance_27, startFrame:88, endFrame:98, x:-54, y:-62, w:109, h:124});
	this.filterCacheList.push({instance: this.instance_27, startFrame:149, endFrame:149, x:-54, y:-62, w:109, h:124});
	this.filterCacheList.push({instance: this.instance_27, startFrame:150, endFrame:184, x:-54, y:-62, w:109, h:124});
	this.filterCacheList.push({instance: this.instance_27, startFrame:185, endFrame:187, x:-54, y:-62, w:109, h:124});
	this.filterCacheList.push({instance: this.instance_27, startFrame:188, endFrame:199, x:-54, y:-62, w:109, h:124});
	this.filterCacheList.push({instance: this.instance_27, startFrame:249, endFrame:249, x:-54, y:-62, w:109, h:124});
	this.filterCacheList.push({instance: this.instance_27, startFrame:250, endFrame:284, x:-54, y:-62, w:109, h:124});
	this.filterCacheList.push({instance: this.instance_27, startFrame:285, endFrame:287, x:-54, y:-62, w:109, h:124});
	this.filterCacheList.push({instance: this.instance_27, startFrame:288, endFrame:299, x:-54, y:-62, w:109, h:124});
	this.filterCacheList.push({instance: this.instance_27, startFrame:349, endFrame:349, x:-54, y:-62, w:109, h:124});
	this.filterCacheList.push({instance: this.instance_27, startFrame:350, endFrame:383, x:-54, y:-62, w:109, h:124});
	this.filterCacheList.push({instance: this.instance_27, startFrame:384, endFrame:399, x:-54, y:-62, w:109, h:124});
	this.filterCacheList.push({instance: this.instance_28, startFrame:14, endFrame:39, x:66, y:125, w:109, h:131});
	this.filterCacheList.push({instance: this.instance_28, startFrame:84, endFrame:84, x:66, y:125, w:109, h:131});
	this.filterCacheList.push({instance: this.instance_28, startFrame:113, endFrame:139, x:66, y:125, w:109, h:131});
	this.filterCacheList.push({instance: this.instance_28, startFrame:184, endFrame:184, x:66, y:125, w:109, h:131});
	this.filterCacheList.push({instance: this.instance_28, startFrame:214, endFrame:239, x:66, y:125, w:109, h:131});
	this.filterCacheList.push({instance: this.instance_28, startFrame:284, endFrame:284, x:66, y:125, w:109, h:131});
	this.filterCacheList.push({instance: this.instance_28, startFrame:314, endFrame:339, x:66, y:125, w:109, h:131});
	this.filterCacheList.push({instance: this.instance_28, startFrame:383, endFrame:383, x:66, y:125, w:109, h:131});
	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(55.9,9.5,326.1,451.5);


(lib.sprite175 = function(mode,startPosition,loop,reversed) {
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
	this.frame_1269 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1269).call(this.frame_1269).wait(1));

	// Masked_Layer_175___169
	this.instance = new lib.text152("synched",0);
	this.instance.setTransform(-477.2,87.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1270));

	// Masked_Layer_174___169
	this.instance_1 = new lib.text151("synched",0);
	this.instance_1.setTransform(-477.2,181);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1270));

	// Masked_Layer_173___169
	this.instance_2 = new lib.shape150("synched",0);
	this.instance_2.setTransform(-142.2,-23.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1270));

	// Masked_Layer_170___169
	this.instance_3 = new lib.text149("synched",0);
	this.instance_3.setTransform(-477.2,-4.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1270));

	// Layer_167
	this.instance_4 = new lib.sprite145();
	this.instance_4.setTransform(424.15,340.3,1.4421,1.4421,179.9897);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1270));

	// Layer_166
	this.instance_5 = new lib.text148("synched",0);
	this.instance_5.setTransform(388.95,293.65,0.9614,0.9614);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1270));

	// Layer_165
	this.instance_6 = new lib.text147("synched",0);
	this.instance_6.setTransform(145.5,354.15,0.9614,0.9614);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1270));

	// Layer_164
	this.instance_7 = new lib.shape146("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1270));

	// Layer_161
	this.instance_8 = new lib.sprite145();
	this.instance_8.setTransform(248.8,330.4,1.4421,1.4421,89.9945);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1270));

	// Layer_160
	this.instance_9 = new lib.shape143("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1270));

	// Layer_138
	this.instance_10 = new lib.sprite142();
	this.instance_10.setTransform(172.15,300.05,1.5,0.2678);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).to({scaleX:1.5008,scaleY:0.272,x:172.2},1).to({scaleX:1.5016,scaleY:0.2762,y:300},1).to({scaleX:1.5088,scaleY:0.3141},9).to({scaleX:1.5096,scaleY:0.3183,y:299.95},1).to({scaleX:1.5135,scaleY:0.3393,y:300},5).to({scaleX:1.5144,scaleY:0.3435,y:299.95},1).to({scaleX:1.5168,scaleY:0.3561},3).to({scaleX:1.5208,scaleY:0.3772,x:172.3,y:299.9},5).to({scaleX:1.5215,scaleY:0.3814,x:172.25},1).to({scaleX:1.5247,scaleY:0.3982},4).to({scaleX:1.5255,scaleY:0.4024,x:172.3,y:299.85},1).to({scaleX:1.5303,scaleY:0.4277,y:299.8},6).to({scaleX:1.5311,scaleY:0.4319,x:172.25,y:299.75},1).to({scaleX:1.5343,scaleY:0.4487,x:172.3},4).to({scaleX:1.5351,scaleY:0.4529,x:172.35},1).to({scaleX:1.5399,scaleY:0.4781},6).to({scaleX:1.5407,scaleY:0.4823,x:172.3},1).to({scaleX:1.5431,scaleY:0.495},3).to({scaleX:1.5471,scaleY:0.516,y:299.65},5).to({scaleX:1.5479,scaleY:0.5202,y:299.7},1).to({scaleX:1.5527,scaleY:0.5454,x:172.35,y:299.6},6).to({scaleX:1.5591,scaleY:0.5791,x:172.3,y:299.55},8).to({scaleX:1.5622,scaleY:0.5959,x:172.4},4).to({scaleX:1.563,scaleY:0.6001,y:299.5},1).to({scaleX:1.5638,scaleY:0.6043,x:172.35},1).to({scaleX:1.5646,scaleY:0.6086,x:172.4,y:299.55},1).to({scaleX:1.5654,scaleY:0.6127,y:299.6},1).to({scaleX:1.5686,scaleY:0.6296,x:172.35,y:299.5},4).to({scaleX:1.5782,scaleY:0.6801,x:172.4,y:299.45},12).to({scaleX:1.579,scaleY:0.6843,y:299.4},1).to({scaleX:1.5798,scaleY:0.6885,x:172.45},1).to({scaleX:1.5806,scaleY:0.6927,y:299.45},1).to({scaleX:1.5917,scaleY:0.7515,x:172.5,y:299.35},14).to({scaleX:1.5989,scaleY:0.7894,x:172.45,y:299.3},9).to({scaleX:1.5997,scaleY:0.7936,x:172.5},1).to({scaleX:1.6021,scaleY:0.8062,x:172.45,y:299.25},3).to({scaleX:1.6029,scaleY:0.8104,x:172.5,y:299.2},1).to({scaleX:1.6037,scaleY:0.8146,y:299.25},1).to({scaleX:1.6061,scaleY:0.8273,x:172.55,y:299.2},3).to({scaleX:1.6133,scaleY:0.8651,x:172.5,y:299.1},9).to({scaleX:1.6157,scaleY:0.8777,x:172.55,y:299.15},3).to({scaleX:1.6165,scaleY:0.882,x:172.5,y:299.1},1).to({scaleX:1.6173,scaleY:0.8862,x:172.55},1).to({scaleX:1.6181,scaleY:0.8904,y:299.15},1).to({scaleX:1.6189,scaleY:0.8946,y:299.1},1).to({scaleX:1.6197,scaleY:0.8988,x:172.6,y:299.15},1).to({scaleX:1.6245,scaleY:0.924,y:299.05},6).to({scaleX:1.6292,scaleY:0.9492,y:299},6).to({scaleX:1.6301,scaleY:0.9535,x:172.55},1).to({scaleX:1.634,scaleY:0.9745,x:172.65},5).to({scaleX:1.6388,scaleY:0.9997,y:298.95},6).to({scaleX:1.6396,scaleY:1.0039,x:172.6},1).to({scaleX:1.6444,scaleY:1.0292,x:172.65},6).to({scaleX:1.6476,scaleY:1.046,y:298.85},4).to({scaleX:1.6636,scaleY:1.1301,y:298.7},20).to({scaleX:1.666,scaleY:1.1427,x:172.7,y:298.75},3).to({scaleX:1.6683,scaleY:1.1554,x:172.65,y:298.7},3).to({scaleX:1.6707,scaleY:1.168,x:172.7,y:298.75},3).to({scaleX:1.6715,scaleY:1.1722,x:172.75},1).to({scaleX:1.6755,scaleY:1.1932,y:298.65},5).to({scaleX:1.6779,scaleY:1.2058,x:172.7},3).to({scaleX:1.6787,scaleY:1.21,x:172.75},1).to({scaleX:1.6827,scaleY:1.2311,x:172.7,y:298.6},5).to({scaleX:1.6851,scaleY:1.2437,x:172.75,y:298.55},3).to({scaleX:1.6859,scaleY:1.2479,x:172.8},1).to({scaleX:1.6883,scaleY:1.2605,x:172.75},3).to({scaleX:1.6907,scaleY:1.2731,x:172.8,y:298.5},3).to({scaleX:1.705,scaleY:1.3489,x:172.85,y:298.4},18).to({scaleX:1.7058,scaleY:1.3531,x:172.8,y:298.45},1).to({scaleX:1.7122,scaleY:1.3867,y:298.35},8).to({scaleX:1.7186,scaleY:1.4204,x:172.9,y:298.3},8).to({scaleX:1.7194,scaleY:1.4246,y:298.25},1).to({scaleX:1.725,scaleY:1.454,x:172.85,y:298.3},7).to({scaleX:1.7258,scaleY:1.4582,y:298.25},1).to({scaleX:1.7298,scaleY:1.4792,x:172.9},5).to({scaleX:1.733,scaleY:1.4961,x:172.95,y:298.2},4).to({scaleX:1.7377,scaleY:1.5213,x:172.9},6).to({scaleX:1.7425,scaleY:1.5466,x:172.95,y:298.15},6).to({scaleX:1.7473,scaleY:1.5718,y:298.05},6).to({scaleX:1.7537,scaleY:1.6054,y:298.1},8).to({scaleX:1.7601,scaleY:1.6391,x:173,y:297.95},8).to({scaleX:1.7625,scaleY:1.6517,x:172.95,y:298},3).to({scaleX:1.7673,scaleY:1.6769,y:297.95},6).to({scaleX:1.7704,scaleY:1.6938,x:173.05,y:297.85},4).to({scaleX:1.7712,scaleY:1.698,y:297.9},1).to({scaleX:1.772,scaleY:1.7022,x:173},1).to({scaleX:1.776,scaleY:1.7232,x:173.05,y:297.85},5).to({scaleX:1.7768,scaleY:1.7274,x:173,y:297.9},1).to({scaleX:1.7776,scaleY:1.7317,x:173.05},1).to({scaleX:1.7816,scaleY:1.7527,y:297.8},5).to({scaleX:1.7912,scaleY:1.8031,y:297.75},12).to({scaleX:1.792,scaleY:1.8073,y:297.7},1).to({scaleX:1.7928,scaleY:1.8116,x:173.1},1).to({scaleX:1.7936,scaleY:1.8158,y:297.75},1).to({scaleX:1.7992,scaleY:1.8452,x:173.15,y:297.7},7).to({scaleX:1.8024,scaleY:1.862},4).to({scaleX:1.8071,scaleY:1.8873,x:173.1,y:297.6},6).to({scaleX:1.8095,scaleY:1.8999,x:173.15,y:297.65},3).to({scaleX:1.8127,scaleY:1.9167,x:173.2,y:297.6},4).to({scaleX:1.8135,scaleY:1.9209,y:297.55},1).to({scaleX:1.8159,scaleY:1.9335,x:173.15,y:297.5},3).to({scaleX:1.8167,scaleY:1.9377,y:297.55},1).to({scaleX:1.8231,scaleY:1.9714,x:173.25,y:297.5},8).to({scaleX:1.8271,scaleY:1.9924,y:297.45},5).to({scaleX:1.8279,scaleY:1.9966,y:297.5},1).to({scaleX:1.8287,scaleY:2.0008,x:173.2},1).to({scaleX:1.8319,scaleY:2.0177,y:297.4},4).to({scaleX:1.8327,scaleY:2.0219,x:173.25,y:297.45},1).to({scaleX:1.8375,scaleY:2.0471,x:173.3,y:297.4},6).to({scaleX:1.8422,scaleY:2.0723,y:297.3},6).to({scaleX:1.851,scaleY:2.1186,y:297.25},11).to({scaleX:1.8518,scaleY:2.1228,x:173.35},1).to({scaleX:1.8526,scaleY:2.127,x:173.3,y:297.3},1).to({scaleX:1.8614,scaleY:2.1733,x:173.25,y:297.2},11).to({scaleX:1.8638,scaleY:2.1859,x:173.3,y:297.15},3).to({scaleX:1.8662,scaleY:2.1985,y:297.1},3).to({scaleX:1.871,scaleY:2.2238},6).to({scaleX:1.8749,scaleY:2.2448,x:173.35,y:297.05},5).to({scaleX:1.8757,scaleY:2.249,x:173.3},1).to({scaleX:1.8798,scaleY:2.27,x:173.4,y:297},5).to({scaleX:1.8869,scaleY:2.3079},9).to({scaleX:1.8877,scaleY:2.3121,y:296.95},1).to({scaleX:1.8901,scaleY:2.3247,x:173.35,y:297},3).to({scaleX:1.8909,scaleY:2.3289,x:173.4,y:296.95},1).to({scaleX:1.9084,scaleY:2.4214,x:173.5,y:296.85},22).to({scaleX:1.9252,scaleY:2.5098,y:296.65},21).to({scaleX:1.9316,scaleY:2.5434,x:173.6,y:296.6},8).to({scaleX:1.9324,scaleY:2.5477,x:173.55,y:296.55},1).to({scaleX:1.9364,scaleY:2.5687,x:173.6,y:296.6},5).to({scaleX:1.9388,scaleY:2.5813,x:173.55,y:296.55},3).to({scaleX:1.9412,scaleY:2.5939,x:173.6},3).to({scaleX:1.9452,scaleY:2.615},5).to({scaleX:1.9459,scaleY:2.6192,x:173.65,y:296.5},1).to({scaleX:1.9507,scaleY:2.6444,x:173.6},6).to({scaleX:1.9723,scaleY:2.758,x:173.7,y:296.35},27).to({scaleX:1.9747,scaleY:2.7706,x:173.65,y:296.3},3).to({scaleX:1.9755,scaleY:2.7748,y:296.25},1).to({scaleX:1.985,scaleY:2.8253,y:296.2},12).to({scaleX:1.989,scaleY:2.8463,x:173.7,y:296.1},5).to({scaleX:1.9899,scaleY:2.8505,y:296.15},1).to({scaleX:1.9938,scaleY:2.8716},5).to({scaleX:1.9946,scaleY:2.8757,y:296.1},1).to({scaleX:1.9986,scaleY:2.8968},5).to({scaleX:1.9994,scaleY:2.901,x:173.75,y:296.05},1).to({scaleX:2.0002,scaleY:2.9052,y:296.1},1).to({scaleX:2.001,scaleY:2.9094,x:173.8},1).to({scaleX:2.0034,scaleY:2.922,x:173.75,y:296.05},3).to({scaleX:2.0058,scaleY:2.9346,x:173.8,y:296},3).to({scaleX:2.0066,scaleY:2.9388,y:296.05},1).to({scaleX:2.0074,scaleY:2.9431,y:296},1).to({scaleX:2.0106,scaleY:2.9599,y:295.95},4).to({scaleX:2.0154,scaleY:2.9851,x:173.85},6).to({scaleX:2.0193,scaleY:3.0061,x:173.8},5).to({scaleX:2.0257,scaleY:3.0398,x:173.85,y:295.9},8).to({scaleX:2.0265,scaleY:3.044,x:173.9,y:295.85},1).to({scaleX:2.0273,scaleY:3.0482,x:173.85},1).to({scaleX:2.0281,scaleY:3.0524,y:295.9},1).to({scaleX:2.0289,scaleY:3.0566,y:295.8},1).to({scaleX:2.0297,scaleY:3.0609,y:295.85},1).to({scaleX:2.0321,scaleY:3.0735,y:295.8},3).to({scaleX:2.0329,scaleY:3.0777,y:295.25},1).to({_off:true},1).wait(601));

	// Layer_135
	this.instance_11 = new lib.sprite105();
	this.instance_11.setTransform(84.85,300.35,1.3343,0.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).to({scaleX:1.3346,scaleY:0.4066,x:84.8},1).to({scaleX:1.3362,scaleY:0.4532,y:300.3},7).to({scaleX:1.3364,scaleY:0.4599,x:84.85},1).to({scaleX:1.3367,scaleY:0.4666,y:300.25},1).to({scaleX:1.3369,scaleY:0.4732,x:84.8},1).to({scaleX:1.3378,scaleY:0.4999,y:300.2},4).to({scaleX:1.3385,scaleY:0.5199,x:84.85},3).to({scaleX:1.3388,scaleY:0.5265,x:84.9,y:300.15},1).to({scaleX:1.339,scaleY:0.5332,y:300.1},1).to({scaleX:1.3392,scaleY:0.5398,x:84.85},1).to({scaleX:1.3399,scaleY:0.5598,x:84.9,y:300.15},3).to({scaleX:1.3402,scaleY:0.5665,x:84.85},1).to({scaleX:1.3409,scaleY:0.5865,y:300.1},3).to({scaleX:1.3416,scaleY:0.6064,y:300.05},3).to({scaleX:1.3425,scaleY:0.6331,y:300},4).to({scaleX:1.3427,scaleY:0.6398,x:84.9},1).to({scaleX:1.343,scaleY:0.6464,y:299.95},1).to({scaleX:1.3432,scaleY:0.6531,x:84.85},1).to({scaleX:1.3434,scaleY:0.6597,x:84.9},1).to({scaleX:1.3437,scaleY:0.6664,y:300},1).to({scaleX:1.3439,scaleY:0.673,x:84.85},1).to({scaleX:1.3441,scaleY:0.6797,y:299.95},1).to({scaleX:1.3448,scaleY:0.6997,y:299.9},3).to({scaleX:1.3455,scaleY:0.7197},3).to({scaleX:1.3465,scaleY:0.7463,x:84.9,y:299.85},4).to({scaleX:1.3472,scaleY:0.7663,y:299.75},3).to({scaleX:1.3479,scaleY:0.7862,y:299.8},3).to({scaleX:1.3481,scaleY:0.7929,x:84.95},1).to({scaleX:1.3488,scaleY:0.8129,x:84.9,y:299.75},3).to({scaleX:1.3495,scaleY:0.8329,y:299.7},3).to({scaleX:1.3497,scaleY:0.8395,x:84.95},1).to({scaleX:1.35,scaleY:0.8462,y:299.65},1).to({scaleX:1.3507,scaleY:0.8662},3).to({scaleX:1.3509,scaleY:0.8729,y:299.6},1).to({scaleX:1.3511,scaleY:0.8795,x:84.9,y:299.65},1).to({scaleX:1.3519,scaleY:0.8995},3).to({scaleX:1.3521,scaleY:0.9061,x:84.95},1).to({scaleX:1.3523,scaleY:0.9128,y:299.55},1).to({scaleX:1.353,scaleY:0.9328},3).to({scaleX:1.3542,scaleY:0.9661,y:299.5},5).to({scaleX:1.3544,scaleY:0.9727,x:85},1).to({scaleX:1.3546,scaleY:0.9794,y:299.45},1).to({scaleX:1.3549,scaleY:0.986,x:84.95,y:299.5},1).to({scaleX:1.3551,scaleY:0.9927,y:299.45},1).to({scaleX:1.3558,scaleY:1.0127},3).to({scaleX:1.3565,scaleY:1.0327,y:299.4},3).to({scaleX:1.3582,scaleY:1.0793,y:299.35},7).to({scaleX:1.3584,scaleY:1.086,x:85,y:299.25},1).to({scaleX:1.3586,scaleY:1.0926,y:299.3},1).to({scaleX:1.3593,scaleY:1.1126},3).to({scaleX:1.3605,scaleY:1.1459,x:84.95,y:299.25},5).to({scaleX:1.3607,scaleY:1.1526,x:85,y:299.2},1).to({scaleX:1.3609,scaleY:1.1592,x:85.05},1).to({scaleX:1.3621,scaleY:1.1925,x:85,y:299.15},5).to({scaleX:1.3624,scaleY:1.1992,x:85.05,y:299.2},1).to({scaleX:1.3626,scaleY:1.2058,y:299.15},1).to({scaleX:1.3628,scaleY:1.2125,x:85},1).to({scaleX:1.363,scaleY:1.2191,x:85.05},1).to({scaleX:1.3633,scaleY:1.2258,y:299.1},1).to({scaleX:1.3635,scaleY:1.2324,x:85},1).to({scaleX:1.3638,scaleY:1.2392,y:299.05},1).to({scaleX:1.3644,scaleY:1.2591},3).to({scaleX:1.3656,scaleY:1.2924,x:85.05,y:299},5).to({scaleX:1.3663,scaleY:1.3124},3).to({scaleX:1.3666,scaleY:1.3191,y:298.95},1).to({scaleX:1.3668,scaleY:1.3257,x:85},1).to({scaleX:1.3675,scaleY:1.3457},3).to({scaleX:1.3677,scaleY:1.3523,y:298.9},1).to({scaleX:1.3679,scaleY:1.3591,x:85.05},1).to({scaleX:1.3686,scaleY:1.379,x:85.1},3).to({scaleX:1.3689,scaleY:1.3857,y:298.85},1).to({scaleX:1.3691,scaleY:1.3923,x:85.05},1).to({scaleX:1.3703,scaleY:1.4257,x:85.1,y:298.8},5).to({scaleX:1.3714,scaleY:1.4589,x:85.05},5).to({scaleX:1.3717,scaleY:1.4656,y:298.7},1).to({scaleX:1.3719,scaleY:1.4722,x:85.1},1).to({scaleX:1.3726,scaleY:1.4922,y:298.65},3).to({scaleX:1.3733,scaleY:1.5122},3).to({scaleX:1.3736,scaleY:1.5189,y:298.7},1).to({scaleX:1.3742,scaleY:1.5388,y:298.6},3).to({scaleX:1.3749,scaleY:1.5588},3).to({scaleX:1.3752,scaleY:1.5655,x:85.05},1).to({scaleX:1.3754,scaleY:1.5721,y:298.55},1).to({scaleX:1.3766,scaleY:1.6055,x:85.15},5).to({scaleX:1.3773,scaleY:1.6254,y:298.45},3).to({scaleX:1.3775,scaleY:1.6321,y:298.5},1).to({scaleX:1.3777,scaleY:1.6387,x:85.1},1).to({scaleX:1.378,scaleY:1.6454,x:85.15},1).to({scaleX:1.3782,scaleY:1.652,y:298.45},1).to({scaleX:1.3789,scaleY:1.6721},3).to({scaleX:1.3792,scaleY:1.6787,x:85.1},1).to({scaleX:1.3794,scaleY:1.6854,y:298.4},1).to({scaleX:1.3801,scaleY:1.7053},3).to({scaleX:1.3803,scaleY:1.712,y:298.35},1).to({scaleX:1.3806,scaleY:1.7186,x:85.15,y:298.3},1).to({scaleX:1.3808,scaleY:1.7253,x:85.1},1).to({scaleX:1.381,scaleY:1.732,y:298.35},1).to({scaleX:1.3813,scaleY:1.7387,x:85.15},1).to({scaleX:1.3829,scaleY:1.7852,y:298.25},7).to({scaleX:1.3831,scaleY:1.792,x:85.1},1).to({scaleX:1.3834,scaleY:1.7986,y:298.2},1).to({scaleX:1.3843,scaleY:1.8252,x:85.2},4).to({scaleX:1.3845,scaleY:1.8319,y:298.15},1).to({scaleX:1.3852,scaleY:1.8519,y:298.2},3).to({scaleX:1.3855,scaleY:1.8586,x:85.15},1).to({scaleX:1.3857,scaleY:1.8652,y:298.15},1).to({scaleX:1.3859,scaleY:1.8719,x:85.2,y:298.1},1).to({scaleX:1.3869,scaleY:1.8985},4).to({scaleX:1.3876,scaleY:1.9185,y:298.05},3).to({scaleX:1.3883,scaleY:1.9385,y:298},3).to({scaleX:1.3892,scaleY:1.9651},4).to({scaleX:1.3894,scaleY:1.9717,x:85.15},1).to({scaleX:1.3896,scaleY:1.9785,y:297.95},1).to({scaleX:1.3899,scaleY:1.9851,x:85.2},1).to({scaleX:1.3911,scaleY:2.0184,x:85.15,y:297.9},5).to({scaleX:1.3913,scaleY:2.025,x:85.2,y:297.85},1).to({scaleX:1.3915,scaleY:2.0317,x:85.25},1).to({scaleX:1.3922,scaleY:2.0517},3).to({scaleX:1.3934,scaleY:2.085,x:85.2},5).to({scaleX:1.3936,scaleY:2.0916,y:297.8},1).to({scaleX:1.3939,scaleY:2.0983,x:85.25,y:297.75},1).to({scaleX:1.3946,scaleY:2.1183},3).to({scaleX:1.3957,scaleY:2.1516,x:85.2,y:297.7},5).to({scaleX:1.396,scaleY:2.1582,y:297.75},1).to({scaleX:1.3962,scaleY:2.1649,x:85.25,y:297.7},1).to({scaleX:1.3964,scaleY:2.1716,x:85.2},1).to({scaleX:1.3967,scaleY:2.1782,y:297.65},1).to({scaleX:1.3969,scaleY:2.1849,x:85.25},1).to({scaleX:1.3976,scaleY:2.2048,x:85.2,y:297.6},3).to({scaleX:1.3978,scaleY:2.2115,x:85.25},1).to({scaleX:1.3985,scaleY:2.2315},3).to({scaleX:1.3988,scaleY:2.2382,x:85.2,y:297.55},1).to({scaleX:1.3992,scaleY:2.2515,x:85.3},2).to({scaleX:1.3995,scaleY:2.2581,x:85.25,y:297.5},1).to({scaleX:1.4002,scaleY:2.2781,x:85.3},3).to({scaleX:1.4009,scaleY:2.2981},3).to({scaleX:1.4011,scaleY:2.3048,x:85.25},1).to({scaleX:1.4013,scaleY:2.3114,y:297.45},1).to({scaleX:1.4016,scaleY:2.3181,x:85.3},1).to({scaleX:1.4023,scaleY:2.338,x:85.25,y:297.4},3).to({scaleX:1.4025,scaleY:2.3447,x:85.3},1).to({scaleX:1.4032,scaleY:2.3647,y:297.35},3).to({scaleX:1.4041,scaleY:2.3913},4).to({scaleX:1.4048,scaleY:2.4114},3).to({scaleX:1.405,scaleY:2.418,x:85.25},1).to({scaleX:1.4053,scaleY:2.4247,y:297.25},1).to({scaleX:1.4055,scaleY:2.4313,x:85.3},1).to({scaleX:1.4065,scaleY:2.4579,x:85.35,y:297.2},4).to({scaleX:1.4072,scaleY:2.478},3).to({scaleX:1.4079,scaleY:2.4979,y:297.15},3).to({scaleX:1.4088,scaleY:2.5245},4).to({scaleX:1.409,scaleY:2.5312,x:85.3},1).to({scaleX:1.4093,scaleY:2.5379,y:297.1},1).to({scaleX:1.4095,scaleY:2.5446,x:85.35},1).to({scaleX:1.4102,scaleY:2.5645},3).to({scaleX:1.4111,scaleY:2.5911,y:297.05},4).to({scaleX:1.4119,scaleY:2.6111,y:297},3).to({scaleX:1.4135,scaleY:2.6578,y:296.9},7).to({scaleX:1.4142,scaleY:2.6777,x:85.4},3).to({scaleX:1.4144,scaleY:2.6844,x:85.35,y:296.85},1).to({scaleX:1.4156,scaleY:2.7177},5).to({scaleX:1.4158,scaleY:2.7244,x:85.4},1).to({scaleX:1.416,scaleY:2.731,x:85.35},1).to({scaleX:1.4163,scaleY:2.7377,y:296.8},1).to({scaleX:1.4165,scaleY:2.7443,x:85.4},1).to({scaleX:1.4167,scaleY:2.751,x:85.35},1).to({scaleX:1.4182,scaleY:2.791,x:85.4,y:296.75},6).to({scaleX:1.4198,scaleY:2.8375,y:296.65},7).to({scaleX:1.4205,scaleY:2.8576},3).to({scaleX:1.4216,scaleY:2.8908,y:296.6},5).to({scaleX:1.4219,scaleY:2.8975,y:296.55},1).to({scaleX:1.4221,scaleY:2.9042,x:85.45},1).to({scaleX:1.4228,scaleY:2.9242},3).to({scaleX:1.4244,scaleY:2.9708,y:296.5},7).to({scaleX:1.4252,scaleY:2.9908,y:296.4},3).to({scaleX:1.4261,scaleY:3.0173,x:85.4,y:296.45},4).to({scaleX:1.4268,scaleY:3.0374,x:85.45,y:296.4},3).to({scaleX:1.427,scaleY:3.0441,x:85.4},1).to({scaleX:1.4296,scaleY:3.1173,x:85.45,y:296.3},11).to({scaleX:1.4312,scaleY:3.1639,y:296.15},7).to({scaleX:1.4315,scaleY:3.1706,x:85.5},1).to({scaleX:1.4329,scaleY:3.2105,x:85.45,y:296.05},6).to({scaleX:1.4331,scaleY:3.2172,x:85.5},1).to({scaleX:1.4352,scaleY:3.2772,x:85.45,y:296},9).to({scaleX:1.4354,scaleY:3.2838,x:85.5},1).to({scaleX:1.4357,scaleY:3.2905,x:85.45},1).to({scaleX:1.4371,scaleY:3.3304,y:295.95},6).to({scaleX:1.4377,scaleY:3.3504,x:85.55,y:295.9},3).to({scaleX:1.4443,scaleY:3.5369,x:85.5,y:295.55},28).to({scaleX:1.4464,scaleY:3.5968,x:85.6},9).to({scaleX:1.4466,scaleY:3.6035,x:85.55,y:295.5},1).to({scaleX:1.448,scaleY:3.6434,y:295.4},6).to({scaleX:1.4531,scaleY:3.79,x:85.6,y:295.25},22).to({scaleX:1.4571,scaleY:3.9032,y:295.05},17).to({scaleX:1.4574,scaleY:3.9099,x:85.55},1).to({scaleX:1.4576,scaleY:3.9165,x:85.6},1).to({scaleX:1.4597,scaleY:3.9764,x:85.55,y:295},9).to({scaleX:1.4599,scaleY:3.9831,x:85.6,y:294.95},1).to({scaleX:1.462,scaleY:4.0431,y:294.85},9).to({scaleX:1.4658,scaleY:4.1496,x:85.65,y:294.65},16).to({scaleX:1.466,scaleY:4.1563,x:85.6},1).to({scaleX:1.4662,scaleY:4.1629,x:85.65},1).to({scaleX:1.4665,scaleY:4.1696,y:294.6},1).to({scaleX:1.4684,scaleY:4.2229,x:85.6},8).to({scaleX:1.4686,scaleY:4.2296,x:85.65},1).to({scaleX:1.4688,scaleY:4.2362,y:294.55},1).to({scaleX:1.4702,scaleY:4.2762,x:85.7,y:294.45},6).to({scaleX:1.4704,scaleY:4.2828,y:294.5},1).to({scaleX:1.4707,scaleY:4.2895,x:85.65},1).to({scaleX:1.4723,scaleY:4.3361,y:294.4},7).to({scaleX:1.4725,scaleY:4.3428,x:85.7},1).to({scaleX:1.4728,scaleY:4.3494,y:294.35},1).to({scaleX:1.473,scaleY:4.3561,x:85.65},1).to({scaleX:1.4744,scaleY:4.3961,x:85.7,y:294.3},6).to({scaleX:1.4747,scaleY:4.4027,x:85.65},1).to({scaleX:1.4753,scaleY:4.4227,y:294.25},3).to({scaleX:1.477,scaleY:4.4693,y:294.2},7).to({scaleX:1.4772,scaleY:4.476,x:85.7},1).to({scaleX:1.4774,scaleY:4.4826,x:85.75,y:294.15},1).to({scaleX:1.4793,scaleY:4.5359,x:85.7,y:294.1},8).to({scaleX:1.4795,scaleY:4.5425,x:85.75},1).to({scaleX:1.481,scaleY:4.5825,x:85.7,y:294},6).to({scaleX:1.4817,scaleY:4.6025,y:294.05},3).to({scaleX:1.483,scaleY:4.6425,x:85.75,y:293.9},6).to({scaleX:1.4833,scaleY:4.6492,x:85.7},1).to({scaleX:1.484,scaleY:4.6691},3).to({scaleX:1.4842,scaleY:4.6758,x:85.75},1).to({scaleX:1.4849,scaleY:4.6958},3).to({scaleX:1.4856,scaleY:4.7157,x:85.7,y:293.85},3).to({scaleX:1.4858,scaleY:4.7224,x:85.75,y:293.8},1).to({scaleX:1.4861,scaleY:4.729,x:85.8},1).to({scaleX:1.4863,scaleY:4.7357,x:85.75},1).to({scaleX:1.487,scaleY:4.7557,x:85.8,y:293.75},3).to({scaleX:1.4872,scaleY:4.7624,x:85.75},1).to({scaleX:1.488,scaleY:4.7823},3).to({scaleX:1.4882,scaleY:4.789,x:85.8,y:293.7},1).to({scaleX:1.4884,scaleY:4.7957,y:293.65},1).to({scaleX:1.4886,scaleY:4.8023,x:85.75,y:293.7},1).to({scaleX:1.4896,scaleY:4.829,y:293.65},4).to({scaleX:1.4903,scaleY:4.8489,x:85.8,y:293.3},3).to({_off:true},1).wait(601));

	// Layer_134
	this.instance_12 = new lib.shape140("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).to({_off:true},669).wait(601));

	// Layer_42
	this.ani = new lib.sprite139();
	this.ani.name = "ani";
	this.ani.setTransform(5.75,-2,0.9614,0.9614);

	this.timeline.addTween(cjs.Tween.get(this.ani).to({_off:true},669).wait(601));
	this.ani.addEventListener("tick", AdobeAn.handleFilterCache);

	// Layer_37
	this.aniH = new lib.sprite159();
	this.aniH.name = "aniH";
	this.aniH.setTransform(231.3,290.3,0.9614,0.9614,89.9945);
	this.aniH._off = true;

	this.timeline.addTween(cjs.Tween.get(this.aniH).wait(34).to({_off:false},0).to({_off:true},635).wait(601));

	// Layer_32
	this.aniG = new lib.sprite76();
	this.aniG.name = "aniG";
	this.aniG.setTransform(217.8,253.2,0.9614,0.9614,89.9945);
	this.aniG._off = true;

	this.timeline.addTween(cjs.Tween.get(this.aniG).wait(24).to({_off:false},0).to({_off:true},645).wait(601));

	// Layer_27
	this.aniF = new lib.sprite76();
	this.aniF.name = "aniF";
	this.aniF.setTransform(346.7,287.5,0.9614,0.9614,89.9945);
	this.aniF._off = true;

	this.timeline.addTween(cjs.Tween.get(this.aniF).wait(15).to({_off:false},0).to({_off:true},654).wait(601));

	// Layer_22
	this.aniE = new lib.sprite76();
	this.aniE.name = "aniE";
	this.aniE.setTransform(421.25,178.45,0.9614,0.9614);
	this.aniE._off = true;

	this.timeline.addTween(cjs.Tween.get(this.aniE).wait(15).to({_off:false},0).to({_off:true},654).wait(601));

	// Layer_17
	this.aniC = new lib.sprite76();
	this.aniC.name = "aniC";
	this.aniC.setTransform(284.15,256.25,0.9614,0.9614,89.9945);
	this.aniC._off = true;

	this.timeline.addTween(cjs.Tween.get(this.aniC).wait(7).to({_off:false},0).to({_off:true},662).wait(601));

	// Layer_12
	this.aniD = new lib.sprite156();
	this.aniD.name = "aniD";
	this.aniD.setTransform(244.75,221.1,0.9614,0.9614,89.9945);
	this.aniD._off = true;

	this.timeline.addTween(cjs.Tween.get(this.aniD).wait(7).to({_off:false},0).to({_off:true},662).wait(601));

	// Layer_9
	this.aniZ = new lib.sprite174();
	this.aniZ.name = "aniZ";
	this.aniZ.setTransform(5.75,-2,0.9614,0.9614);
	this.aniZ._off = true;

	this.timeline.addTween(cjs.Tween.get(this.aniZ).wait(669).to({_off:false},0).wait(601));
	this.aniZ.addEventListener("tick", AdobeAn.handleFilterCache);

	// Layer_7
	this.aniB = new lib.sprite76();
	this.aniB.name = "aniB";
	this.aniB.setTransform(388.95,254.75,0.9614,0.9614,89.9945);
	this.aniB._off = true;

	this.timeline.addTween(cjs.Tween.get(this.aniB).wait(7).to({_off:false},0).to({_off:true},662).wait(601));

	// Layer_6
	this.instance_13 = new lib.sprite142();
	this.instance_13.setTransform(173.85,295.25,2.0329,3.0777);
	this.instance_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(669).to({_off:false},0).wait(601));

	// Layer_3
	this.instance_14 = new lib.sprite105();
	this.instance_14.setTransform(85.8,293.3,1.4903,4.8489);
	this.instance_14._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(669).to({_off:false},0).wait(601));

	// Layer_2
	this.aniA = new lib.sprite76();
	this.aniA.name = "aniA";
	this.aniA.setTransform(400.1,140,0.9614,0.9614);

	this.instance_15 = new lib.shape140("synched",0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.aniA}]}).to({state:[{t:this.instance_15}]},669).wait(601));

	// Layer_1
	this.instance_16 = new lib.shape68("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(1270));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-488.8,-7.8,949.9000000000001,448.8);


// stage content:
(lib.vital_acc_ssf = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {p1:0,p2:920};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,1,918,919,920,921,2189];
	this.streamSoundSymbolsList[1] = [{id:"vital_acc_ssf1",startFrame:1,endFrame:919,loop:1,offset:0}];
	this.streamSoundSymbolsList[921] = [{id:"vital_acc_ssf2",startFrame:921,endFrame:2189,loop:1,offset:0}];
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
			GetUrlMain("vitalmenu_ssf");
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
		var soundInstance = playSound("vital_acc_ssf1",0);
		this.InsertIntoSoundStreamData(soundInstance,1,919,1);
	}
	this.frame_918 = function() {
		this.stop();
	}
	this.frame_919 = function() {
		this.stop();
	}
	this.frame_920 = function() {
		Prev(1);
		Next(0);
		InitAnim(CtlSprite2);
		
		function CtlSprite2(sw)
		{
			if( sw ){
				exportRoot.ani2.ani.play();
				exportRoot.ani2.ani.aniA.play();	
				exportRoot.ani2.ani.aniB.play();	
				exportRoot.ani2.ani.aniC.play();		
				exportRoot.ani2.ani.aniD.play();	
				exportRoot.ani2.ani.aniE.play();			
				exportRoot.ani2.ani.aniF.play();
				exportRoot.ani2.aniA.play();
				exportRoot.ani2.aniB.play();
				exportRoot.ani2.aniC.play();
				exportRoot.ani2.aniD.play();
				exportRoot.ani2.aniE.play();
				exportRoot.ani2.aniF.play();
				exportRoot.ani2.aniG.play();
				exportRoot.ani2.aniH.play();
				exportRoot.ani2.aniZ.play();
			}
			else{
				exportRoot.ani2.ani.stop();
		
				exportRoot.ani2.ani.aniA.stop();		
				exportRoot.ani2.ani.aniB.stop();		
				exportRoot.ani2.ani.aniC.stop();		
				exportRoot.ani2.ani.aniD.stop();	
				exportRoot.ani2.ani.aniE.stop();	
				exportRoot.ani2.ani.aniF.stop();
				exportRoot.ani2.aniA.stop();
				exportRoot.ani2.aniB.stop();
				exportRoot.ani2.aniC.stop();
				exportRoot.ani2.aniD.stop();
				exportRoot.ani2.aniE.stop();
				exportRoot.ani2.aniF.stop();
				exportRoot.ani2.aniG.stop();
				exportRoot.ani2.aniH.stop();
				exportRoot.ani2.aniZ.stop();
			}
		}
	}
	this.frame_921 = function() {
		var soundInstance = playSound("vital_acc_ssf2",0);
		this.InsertIntoSoundStreamData(soundInstance,921,2189,1);
	}
	this.frame_2189 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(917).call(this.frame_918).wait(1).call(this.frame_919).wait(1).call(this.frame_920).wait(1).call(this.frame_921).wait(1268).call(this.frame_2189).wait(1));

	// Layer_184
	this.instance = new lib.text29("synched",0);
	this.instance.setTransform(10,0,1.3948,1.3948);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2190));

	// Layer_182
	this.instance_1 = new lib.shape26("synched",0);
	this.instance_1.setTransform(10.5,14.5,1.3948,1.3948);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(2190));

	// Layer_183
	this.instance_2 = new lib.text28("synched",0);
	this.instance_2.setTransform(32.7,56.4,1.3957,1.3948);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(2190));

	// Layer_back
	this.back = new lib.buttonbak();
	this.back.name = "back";
	this.back.setTransform(350,645,1.0001,1.0002);
	new cjs.ButtonHelper(this.back, 0, 1, 2, false, new lib.buttonbak(), 3);

	this.timeline.addTween(cjs.Tween.get(this.back).wait(2190));

	// Layer_page
	this.page = new cjs.Text("Page number", "italic bold 15px 'Arial'", "#FF9900");
	this.page.name = "page";
	this.page.lineHeight = 17;
	this.page.lineWidth = 193;
	this.page.parent = this;
	this.page.setTransform(23,658,1.4989,1.4989);

	this.timeline.addTween(cjs.Tween.get(this.page).wait(2190));

	// Layer_next
	this.next = new lib.buttonnext();
	this.next.name = "next";
	this.next.setTransform(1496.1,5.1,0.9998,0.9999,0,0,0,0.1,0.1);
	new cjs.ButtonHelper(this.next, 0, 1, 2, false, new lib.buttonnext(), 3);

	this.timeline.addTween(cjs.Tween.get(this.next).wait(2190));

	// Layer_previous
	this.previous = new lib.buttonprev();
	this.previous.name = "previous";
	this.previous.setTransform(1432,5,1.0003,0.9993);
	new cjs.ButtonHelper(this.previous, 0, 1, 2, false, new lib.buttonprev(), 3);

	this.timeline.addTween(cjs.Tween.get(this.previous).wait(2190));

	// Layer_slider
	this.slider = new lib.sprite_slider();
	this.slider.name = "slider";
	this.slider.setTransform(610.1,670.1,0.9937,0.9983,0,0,0,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.slider).wait(2190));

	// Layer_replay
	this.replay = new lib.sprite_replay();
	this.replay.name = "replay";
	this.replay.setTransform(1045.1,650.1,0.9999,0.9999,0,0,0,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.replay).wait(2190));

	// Layer_slider_base
	this.instance_3 = new lib.sprite_sliderbase();
	this.instance_3.setTransform(600,650,1,0.9999);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(2190));

	// Layer_playpau
	this.playpau = new lib.sprite_playpau();
	this.playpau.name = "playpau";
	this.playpau.setTransform(555,650,0.9999,0.9999);

	this.timeline.addTween(cjs.Tween.get(this.playpau).wait(2190));

	// Mask_Layer_1 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("Eh8/AyyMAAAhfTMD5/AAAMAAABfTg");
	mask.setTransform(800,325);

	// Masked_Layer_2___1
	this.ani1 = new lib.sprite23();
	this.ani1.name = "ani1";
	this.ani1.setTransform(720,101.7,1.3948,1.3948);

	this.ani2 = new lib.sprite175();
	this.ani2.name = "ani2";
	this.ani2.setTransform(720,101.7,1.3948,1.3948);

	var maskedShapeInstanceList = [this.ani1,this.ani2];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.ani1}]}).to({state:[{t:this.ani2}]},920).wait(1270));

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
		{src:"images/vital_acc_ssf_atlas_1.png", id:"vital_acc_ssf_atlas_1"},
		{src:"sounds/vital_acc_ssf1.mp3", id:"vital_acc_ssf1"},
		{src:"sounds/vital_acc_ssf2.mp3", id:"vital_acc_ssf2"}
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