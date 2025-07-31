(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"vital_acc_eg_atlas_1", frames: [[236,1289,1168,82],[1506,376,498,124],[460,1145,731,99],[704,1474,438,106],[1067,924,547,186],[1667,502,338,99],[0,1487,452,99],[1187,0,265,143],[704,1373,503,99],[1209,1430,466,105],[1667,818,265,99],[1144,1537,461,99],[1667,717,277,99],[236,1373,466,112],[1667,603,265,112],[0,582,1170,173],[0,0,1185,173],[236,757,222,530],[0,757,234,628],[1209,1373,113,53],[1144,1474,60,60],[460,1070,276,53],[1406,1112,253,316],[460,757,338,311],[502,175,500,375],[1004,175,500,375],[1172,552,493,370],[0,175,500,405],[800,757,265,386],[1661,1150,232,190],[1506,0,391,374],[1661,924,210,224]]},
		{name:"vital_acc_eg_atlas_2", frames: [[0,1772,1188,227],[0,1260,1182,281],[0,1543,1192,227],[898,0,919,477],[0,0,896,853],[898,479,494,779],[1394,479,492,569],[0,855,594,380]]}
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



(lib.CachedBmp_29 = function() {
	this.initialize(ss["vital_acc_eg_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_28 = function() {
	this.initialize(ss["vital_acc_eg_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_27 = function() {
	this.initialize(ss["vital_acc_eg_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_26 = function() {
	this.initialize(ss["vital_acc_eg_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_25 = function() {
	this.initialize(ss["vital_acc_eg_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_24 = function() {
	this.initialize(ss["vital_acc_eg_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_23 = function() {
	this.initialize(ss["vital_acc_eg_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_22 = function() {
	this.initialize(ss["vital_acc_eg_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_21 = function() {
	this.initialize(ss["vital_acc_eg_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_20 = function() {
	this.initialize(ss["vital_acc_eg_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_19 = function() {
	this.initialize(ss["vital_acc_eg_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_18 = function() {
	this.initialize(ss["vital_acc_eg_atlas_1"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_17 = function() {
	this.initialize(ss["vital_acc_eg_atlas_1"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_16 = function() {
	this.initialize(ss["vital_acc_eg_atlas_1"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_15 = function() {
	this.initialize(ss["vital_acc_eg_atlas_1"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_14 = function() {
	this.initialize(ss["vital_acc_eg_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_13 = function() {
	this.initialize(ss["vital_acc_eg_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_12 = function() {
	this.initialize(ss["vital_acc_eg_atlas_1"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_11 = function() {
	this.initialize(ss["vital_acc_eg_atlas_2"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_10 = function() {
	this.initialize(ss["vital_acc_eg_atlas_1"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_9 = function() {
	this.initialize(ss["vital_acc_eg_atlas_1"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_8 = function() {
	this.initialize(ss["vital_acc_eg_atlas_2"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_7 = function() {
	this.initialize(ss["vital_acc_eg_atlas_1"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_6 = function() {
	this.initialize(ss["vital_acc_eg_atlas_2"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_5 = function() {
	this.initialize(ss["vital_acc_eg_atlas_2"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_4 = function() {
	this.initialize(ss["vital_acc_eg_atlas_2"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_3 = function() {
	this.initialize(ss["vital_acc_eg_atlas_1"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2 = function() {
	this.initialize(ss["vital_acc_eg_atlas_1"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1 = function() {
	this.initialize(ss["vital_acc_eg_atlas_1"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.image11 = function() {
	this.initialize(ss["vital_acc_eg_atlas_1"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.image20 = function() {
	this.initialize(ss["vital_acc_eg_atlas_1"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.image31 = function() {
	this.initialize(ss["vital_acc_eg_atlas_2"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.image39 = function() {
	this.initialize(ss["vital_acc_eg_atlas_1"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.image41 = function() {
	this.initialize(ss["vital_acc_eg_atlas_1"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.image43 = function() {
	this.initialize(ss["vital_acc_eg_atlas_1"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.image47 = function() {
	this.initialize(ss["vital_acc_eg_atlas_1"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.image49 = function() {
	this.initialize(ss["vital_acc_eg_atlas_1"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.image50 = function() {
	this.initialize(ss["vital_acc_eg_atlas_1"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.image69 = function() {
	this.initialize(ss["vital_acc_eg_atlas_1"]);
	this.gotoAndStop(30);
}).prototype = p = new cjs.Sprite();



(lib.image70 = function() {
	this.initialize(ss["vital_acc_eg_atlas_1"]);
	this.gotoAndStop(31);
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
	this.instance = new lib.CachedBmp_29();
	this.instance.setTransform(0,0,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,388.8,27.3);


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
	this.instance = new lib.CachedBmp_28();
	this.instance.setTransform(-3.95,-3.75,0.3326,0.3326);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,165.6,41.2);


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
	this.instance = new lib.CachedBmp_27();
	this.instance.setTransform(-7.15,-3.65,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-7.1,-3.6,243.29999999999998,32.9);


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
	this.instance = new lib.CachedBmp_26();
	this.instance.setTransform(-3.95,-3.55,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.5,145.8,35.3);


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
	this.instance = new lib.CachedBmp_25();
	this.instance.setTransform(-65.45,-3.65,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-65.4,-3.6,182,61.9);


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
	this.instance = new lib.CachedBmp_24();
	this.instance.setTransform(-5.15,-2.65,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-5.1,-2.6,112.5,32.9);


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
	this.instance = new lib.CachedBmp_23();
	this.instance.setTransform(-5.15,-2.65,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-5.1,-2.6,150.4,32.9);


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
	this.instance = new lib.CachedBmp_22();
	this.instance.setTransform(-7.15,-3.65,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-7.1,-3.6,88.19999999999999,47.6);


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
	this.instance = new lib.CachedBmp_21();
	this.instance.setTransform(-23.75,-3.65,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-23.7,-3.6,167.39999999999998,32.9);


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
	this.instance = new lib.CachedBmp_20();
	this.instance.setTransform(-4,-3.7,0.3153,0.3153);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.7,147,33.1);


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
	this.instance = new lib.CachedBmp_19();
	this.instance.setTransform(37.15,-3.65,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(37.2,-3.6,88.2,32.9);


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
	this.instance = new lib.CachedBmp_18();
	this.instance.setTransform(37.15,-3.65,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(37.2,-3.6,153.39999999999998,32.9);


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
	this.instance = new lib.CachedBmp_17();
	this.instance.setTransform(37.15,-3.65,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(37.2,-3.6,92.2,32.9);


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
	this.instance = new lib.CachedBmp_16();
	this.instance.setTransform(37.2,-2.9,0.2944,0.2944);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(37.2,-2.9,137.2,33);


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
	this.instance = new lib.CachedBmp_15();
	this.instance.setTransform(37.2,-3.65,0.2944,0.2944);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(37.2,-3.6,78,33);


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
	this.instance = new lib.CachedBmp_14();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,395.4,75.5);


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
	this.instance = new lib.CachedBmp_13();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,393.4,93.5);


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
	this.instance = new lib.CachedBmp_12();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,389.4,57.599999999999994);


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
	this.instance = new lib.CachedBmp_11();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,396.7,75.5);


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
	this.instance = new lib.CachedBmp_10();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,394.4,57.599999999999994);


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
	this.shape.graphics.f("#003366").s().p("AgRARQgHgHAAgKQAAgKAHgHQAHgHAKAAQALAAAGAHQAIAHAAAKQAAAKgIAHQgGAIgLAAQgKAAgHgIg");
	this.shape.setTransform(8,38.85);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(5.5,36.4,5,5);


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

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("ANPCUI6dkn");
	this.shape.setTransform(-13.15,-10.225);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_3
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FF6600").ss(2,1,0,3).p("ARQjbQgWARgUAZAS+kFQgfABgcALAPegoQgJAdgGAdAQRiVQgRAZgNAcAV9iIIgjgwAWsgaQgIgdgMgbAUvjgQgZgTgcgJAW+BbIgGg7AW3DVIAHg8AWWFIIAUg4AVWGtIAfgoIAFgIAPIBPIgBA6AR+HnQAcALAeACAQiGdQAUAZAVASAPpE5QALAcAPAZAPLDEQAEAfAHAdATyHvQAdgIAagSAygnyIg/gBA2EhYIAQARQAWAWAZAQA24jEQAGAeANAbA21k7QgIAcAAAfA18miQgVAWgOAaAyaAAQAfgEAbgMA0OgIQAdAIAgACAvhltQgOgagVgXAvGj5QAAgggHgbAvgiIQANgaAHgdAwsguIAcgZIAOgPA0ZnmQgbAKgZARAwynIQgZgRgbgL");
	this.shape_1.setTransform(-9.775,-2.1);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	var sprImg_shape_2 = cjs.SpriteSheetUtils.extractFrame(ss["vital_acc_eg_atlas_1"],30);
	sprImg_shape_2.onload = function(){
		this.shape_2.graphics.bf(sprImg_shape_2, null, new cjs.Matrix2D(0.561,0,0,0.561,-109.6,-104.8)).s().p("AxHQYMAAAggvMAiPAAAMAAAAgvg")
	}.bind(this);
	this.shape_2.setTransform(115.85,20.475);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_1
	this.shape_3 = new cjs.Shape();
	var sprImg_shape_3 = cjs.SpriteSheetUtils.extractFrame(ss["vital_acc_eg_atlas_1"],31);
	sprImg_shape_3.onload = function(){
		this.shape_3.graphics.bf(sprImg_shape_3, null, new cjs.Matrix2D(0.923,0,0,0.923,-96.9,-103.4)).s().p("AvJQKMAAAggTIeTAAMAAAAgTg")
	}.bind(this);
	this.shape_3.setTransform(-118.85,18.875);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-215.8,-84.5,441.3,209.8);


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

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("ATIBqMgmPAAAIAAjTMAmPAAAg");
	this.shape.setTransform(-93.375,145.925);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AzHBqIAAjTMAmPAAAIAADTg");
	this.shape_1.setTransform(-93.375,145.925);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-216.8,134.3,246.9,23.299999999999983);


(lib.shape65 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("Ah5CcIDzk3");
	this.shape.setTransform(128.9,-113.2);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(115.3,-130.3,27.299999999999997,34.20000000000002);


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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("AjFAAIGLAB");
	this.shape.setTransform(134.475,10.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(113.2,9,42.60000000000001,3.0999999999999996);


(lib.shape63 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("ADGAAImLAA");
	this.shape.setTransform(41.425,10.8);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(20.2,9.3,42.5,3.0999999999999996);


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

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("Aibh5IE3Dy");
	this.shape.setTransform(61.25,167.05);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FF6600").ss(2,1,0,3).p("AEBjuIgugpAAulaIgugDIg6AEAChk3QgagOgdgJAFDiKQgMgbgQgZAFegWQgCgfgGgcAFTBfQAHgdADgfADKEfIAugnAgUFeIA3gBABeFTQAegIAbgNAEfDKIAfgzAjdkOIgqApAh1lKQgcAKgbAPAjuEAQAXAWAYAQAk3ChQAOAaASAYAlaAvQADAfAJAcAlXhFQgFAdgBAeAkri1QgQAagLAcAiKFDQAcAMAeAH");
	this.shape_1.setTransform(11.525,118.7738);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#FF0000").ss(1,0,0,3).p("AA8h6IAAD1Ag7h6IAAD1");
	this.shape_2.setTransform(90.35,12.025);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-24.5,-1.2,121.9,181.89999999999998);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AMvEOI5dAAIAAobIZdAAg");
	this.shape.setTransform(-136.35,139.925);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AsuEOIAAobIZdAAIAAIbg");
	this.shape_1.setTransform(-136.35,139.925);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-218.8,112,165,55.900000000000006);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("Ao+hjIR9AAIAADIIx9AAg");
	this.shape.setTransform(163.825,-145.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("Ao+BlIAAjIIR9AAIAADIg");
	this.shape_1.setTransform(163.825,-145.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(105.4,-156.6,116.9,22.099999999999994);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AKJBqI0RAAIAAjTIURAAg");
	this.shape.setTransform(152.5,172.125);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AqHBqIAAjTIUPAAIAADTg");
	this.shape_1.setTransform(152.5,172.125);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(86.7,160.5,131.7,23.30000000000001);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AFqiqIAAFVIrTAAIAAlVg");
	this.shape.setTransform(195.825,10.55);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AlpCrIAAlUILTAAIAAFUg");
	this.shape_1.setTransform(195.825,10.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(158.7,-7.5,74.30000000000001,36.1);


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

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AtEh0IaJAAIAADpI6JAAg");
	this.shape.setTransform(-121.2,-44.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AtEB1IAAjpIaJAAIAADpg");
	this.shape_1.setTransform(-121.2,-44.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_3
	this.shape_2 = new cjs.Shape();
	var sprImg_shape_2 = cjs.SpriteSheetUtils.extractFrame(ss["vital_acc_eg_atlas_1"],28);
	sprImg_shape_2.onload = function(){
		this.shape_2.graphics.bf(sprImg_shape_2, null, new cjs.Matrix2D(0.638,0,0,0.638,-84.6,-123.2)).s().p("AtNTQMAAAgmfIabAAMAAAAmfg")
	}.bind(this);
	this.shape_2.setTransform(73.975,17.7);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_2
	this.shape_3 = new cjs.Shape();
	var sprImg_shape_3 = cjs.SpriteSheetUtils.extractFrame(ss["vital_acc_eg_atlas_1"],29);
	sprImg_shape_3.onload = function(){
		this.shape_3.graphics.bf(sprImg_shape_3, null, new cjs.Matrix2D(0.907,0,0,0.907,-104.2,-86.4)).s().p("Av9M0IAA5oIf7AAIAAZog")
	}.bind(this);
	this.shape_3.setTransform(-127.5,20.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	// Layer_1
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#FF0000").ss(1,0,0,3).p("AAAhiIAADF");
	this.shape_4.setTransform(61.2,10.875);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-229.7,-105.5,388.29999999999995,246.4);


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

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("ADyAAInjAA");
	this.shape.setTransform(-120.625,-39.8);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.instance = new lib.CachedBmp_9();
	this.instance.setTransform(-87.35,-129,0.3547,0.3547);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	var sprImg_shape_1 = cjs.SpriteSheetUtils.extractFrame(ss["vital_acc_eg_atlas_1"],27);
	sprImg_shape_1.onload = function(){
		this.shape_1.graphics.bf(sprImg_shape_1, null, new cjs.Matrix2D(1,0,0,1,-250,-202.5)).s().p("EgnDAfpMAAAg/RMBOHAAAMAAAA/Rg")
	}.bind(this);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-250,-202.5,500,405);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AKEByI0HAAIAAjjIUHAAg");
	this.shape.setTransform(-1.9,86.525);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.498)").s().p("AqDByIAAjjIUHAAIAADjg");
	this.shape_1.setTransform(-1.9,86.525);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-67.3,74.1,130.8,24.900000000000006);


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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("AAAjxIAAHj");
	this.shape.setTransform(39.85,50.975);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.instance = new lib.CachedBmp_8();
	this.instance.setTransform(-122.75,-127.9,0.3153,0.3153);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	var sprImg_shape_1 = cjs.SpriteSheetUtils.extractFrame(ss["vital_acc_eg_atlas_1"],26);
	sprImg_shape_1.onload = function(){
		this.shape_1.graphics.bf(sprImg_shape_1, null, new cjs.Matrix2D(1,0,0,1,-246.5,-185)).s().p("EgmgAc6MAAAg5zMBNBAAAMAAAA5zg")
	}.bind(this);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-246.5,-185,493,370);


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

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("AENBIIoZiP");
	this.shape.setTransform(-183.975,-36.3);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.instance = new lib.CachedBmp_7();
	this.instance.setTransform(-150.9,-94.35,0.3284,0.3284);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	var sprImg_shape_1 = cjs.SpriteSheetUtils.extractFrame(ss["vital_acc_eg_atlas_1"],25);
	sprImg_shape_1.onload = function(){
		this.shape_1.graphics.bf(sprImg_shape_1, null, new cjs.Matrix2D(1,0,0,1,-250,-187.5)).s().p("EgnDAdTMAAAg6lMBOHAAAMAAAA6lg")
	}.bind(this);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-250,-187.5,500,375);


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

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("AG+ECIt7oD");
	this.shape.setTransform(-114.1,-59.65);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.instance = new lib.CachedBmp_6();
	this.instance.setTransform(-141.6,-126.3,0.3284,0.3284);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	var sprImg_shape_1 = cjs.SpriteSheetUtils.extractFrame(ss["vital_acc_eg_atlas_1"],24);
	sprImg_shape_1.onload = function(){
		this.shape_1.graphics.bf(sprImg_shape_1, null, new cjs.Matrix2D(1,0,0,1,-250,-187.5)).s().p("EgnDAdTMAAAg6lMBOHAAAMAAAA6lg")
	}.bind(this);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-250,-187.5,500,375);


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

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF9900").ss(8,1,0,3).p("EAbLAgwMg2VAAAMAAAhBfMA2VAAAg");
	this.shape.setTransform(138.1,-2.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FF9900").ss(8,1,0,3).p("Ae6bIMg9zAAAMAAAg2PMA9zAAAg");
	this.shape_1.setTransform(126.075,761.625);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-75.7,-216.1,403.59999999999997,1155.3);


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

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF9900").ss(8,0,0,3).p("EAbLggvMAAABBfMg2VAAAMAAAhBfg");
	this.shape.setTransform(138.1,-2.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FF9900").ss(8,0,0,3).p("Ae6bIMg9zAAAMAAAg2PMA9zAAAg");
	this.shape_1.setTransform(126.075,761.625);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-75.7,-216.1,403.59999999999997,1155.3);


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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("ADVhWImpCt");
	this.shape.setTransform(-34.95,168.25);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-57.7,158.1,45.5,20.30000000000001);


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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("ADVhWImpCt");
	this.shape.setTransform(-3.5,3.2);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-26.2,-6.9,45.5,20.3);


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
	this.shape.graphics.f().s("#FF0000").ss(3,0,0,3).p("ADVhWImpCt");
	this.shape.setTransform(-34.95,168.25);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-57.7,158.1,45.5,20.30000000000001);


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
	this.shape.graphics.f().s("#FF0000").ss(3,0,0,3).p("ADVhVImpCs");
	this.shape.setTransform(-3.5,3.2);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-26.2,-6.9,45.5,20.3);


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
	var sprImg_shape = cjs.SpriteSheetUtils.extractFrame(ss["vital_acc_eg_atlas_2"],7);
	sprImg_shape.onload = function(){
		this.shape.graphics.bf(sprImg_shape, null, new cjs.Matrix2D(1,0,0,1,-230.7,-190)).s().p("EgkDAdsMAAAg7XMBIHAAAMAAAA7Xg")
	}.bind(this);
	this.shape.setTransform(-66.25,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-297,-190,461.5,380);


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
	this.shape.graphics.f().s("#FF9900").ss(3,1,0,3).p("Ai8j9QgbAPgXASAkbizIghAnIgFAHAEbjnQgWgTgbgPACzkhIg5gRAA/k5Ig8ABAFjiIQgMgcgTgYAg5kuIhOAYAFaBdQAOgbAIgcAF5gVQABgegGgeABKErIAzgQAgwE6IA8gDAC0ECQAbgOAYgRAEUC8IAngsAlfhRQgNAcgHAcAl5AiQABAeAIAeAldCVQAOAbATAXAkPDxIA0AgAinEmQAdAKAdAF");
	this.shape.setTransform(92.6567,12.25);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(53.4,-20.6,78.5,65.80000000000001);


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

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("ABZjTIixGn");
	this.shape.setTransform(86.225,70.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(75.8,47.9,20.900000000000006,45.300000000000004);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AGQhZIAACzIsfAAIAAizg");
	this.shape.setTransform(89.55,104.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AmPBaIAAizIMfAAIAACzg");
	this.shape_1.setTransform(89.55,104.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(48.6,94.5,82,20);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AKeBaI07AAIAAizIU7AAg");
	this.shape.setTransform(18.5,165.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AqdBaIAAizIU7AAIAACzg");
	this.shape_1.setTransform(18.5,165.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-49.5,155.5,136,20);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AnBhZIODAAIAACzIuDAAg");
	this.shape.setTransform(154,-38.4);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AnBBaIAAizIODAAIAACzg");
	this.shape_1.setTransform(154,-38.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(108,-48.4,92,20);


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

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("AihiiIFDFF");
	this.shape.setTransform(136.85,-66.6);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	var sprImg_shape_1 = cjs.SpriteSheetUtils.extractFrame(ss["vital_acc_eg_atlas_1"],23);
	sprImg_shape_1.onload = function(){
		this.shape_1.graphics.bf(sprImg_shape_1, null, new cjs.Matrix2D(1.359,0,0,1.176,-229.7,-182.8)).s().p("Egj4AckMAAAg5HMBHxAAAMAAAA5Hg")
	}.bind(this);
	this.shape_1.setTransform(2.025,0);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-227.6,-182.8,459.29999999999995,365.6);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AK5BaI1xAAIAAizIVxAAg");
	this.shape.setTransform(21.6,121.85);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("Aq4BaIAAizIVxAAIAACzg");
	this.shape_1.setTransform(21.6,121.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-49,111.9,141.3,20);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AlJhZIKTAAIAACzIqTAAg");
	this.shape.setTransform(-56.05,-67.05);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AlJBaIAAizIKTAAIAACzg");
	this.shape_1.setTransform(-56.05,-67.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-90,-77,68,20);


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
	this.shape.graphics.f("#FF0000").s().p("AAIAXIgPAAIgbAJIAjhAIAiBBg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.5,-3.3,7,6.699999999999999);


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

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(3,0,0,3).p("AmIhqIMRDU");
	this.shape.setTransform(-128.325,-78.85);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	var sprImg_shape_1 = cjs.SpriteSheetUtils.extractFrame(ss["vital_acc_eg_atlas_1"],22);
	sprImg_shape_1.onload = function(){
		this.shape_1.graphics.bf(sprImg_shape_1, null, new cjs.Matrix2D(1.58,0,0,1.039,-199.8,-164.1)).s().p("A/NZqMAAAgzTMA+cAAAMAAAAzTg")
	}.bind(this);
	this.shape_1.setTransform(-6.45,0);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-206.3,-164.1,399.70000000000005,328.29999999999995);


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

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgRARQgHgGAAgLQAAgKAHgHQAHgHAKAAQALAAAGAHQAIAHAAAKQAAALgIAGQgGAIgLAAQgKAAgHgIg");
	this.shape.setTransform(-333.1,281.6);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_3
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgRARQgHgHAAgKQAAgKAHgHQAHgHAKAAQALAAAGAHQAIAHAAAKQAAAKgIAHQgGAIgLAAQgKAAgHgIg");
	this.shape_1.setTransform(-333.1,215.6);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgRARQgHgHAAgKQAAgKAHgHQAHgHAKAAQALAAAGAHQAIAHAAAKQAAAKgIAHQgGAIgLAAQgKAAgHgIg");
	this.shape_2.setTransform(-333.1,126.6);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgJAHgIQAHgHAKAAQALAAAGAHQAIAIAAAJQAAAKgIAIQgGAHgLAAQgKAAgHgHg");
	this.shape_3.setTransform(-333.1,76.6);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-335.6,74.1,5,210.00000000000003);


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
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("AyTRbMAknAAAASUxaMgknAAA");
	this.shape.setTransform(-459.275,-646.725);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.lf(["#D3D3D3","#DDDDDD","#FFFFFF","#E5E5E5","#D3D3D3"],[0,0.18,0.427,0.659,1],22.9,-73.4,22.9,58).s().p("AyTRbMAAAgi1MAknAAAMAAAAi1g");
	this.shape_1.setTransform(-459.275,-646.725);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(1,0,0,3).p("AO1o1IABgBIAAAAIBWBEAO1o1IAAgBIAAiKAOqoVIgBAEIAnAfIAAAKIAABRIhfgSIggAJIAABoIAAACQhDARgigiIAAhWIBlgDAQbrAIgFDLIBJjLASTprIgTgKIAThDASTnGIhagMIA7iHIAfATALRq2IABAkIACABQA4AoA4gpIgCgjALQrAIABAKQghAAgKAGIgGAEIgHAHIgPAPQhABFgcBbIAAAuAKOqSIAGgEIAAB0QAaALAZAHQBVAVBVghAKZqlIgFAPQABAQAfAMIATAFIA9AGQAuAAAggLQAYgKAHgLQACgUgOgJQgMgIgXgBIAAgLAI2rAIgQAUQhTBoADBfIAAASIAAByQAsAfAsgRIAAgRIAAhkANxnoIAAgoIA5gFANxoQIAAgMIAAhzAKUm/IhmgJALsmdIhYgRIAAgRALslHIi+gdAQ/mLIAAgeIBUAIAPQmRIAAgGIBBALIAFhpAQWkOIgCgBIAAgRIgDhsAQ+kbIAAAMIgoABAQ/mLIgBBwARdjZIgDABIhaAjQghAaAkALIBAAHIBQgXARPjaIALACIA5AHARdjZIgOgBIr7hmIiIA1QjNAQCghdIhugPIAFB/IACApIRbCUASTjSIg2gHASTj/Ih9gPASTkSIhVgJASTmDIhUgIAO1o1IgLAgANxmpIAAg/ANRk4IDDAYAPQnoIhfAAAKUoiIAABjADQrAIgBABIghBbQgdBQAGCQIgogJIAAgSIiSgZIAAAZQg2AEgkgVIAAiKIBaAOIBDAKIBPALIAKgnIAHgeIACgKIgEgCIhohEIAHBiIhJgJIhHgKIAkhjACRqSIALAGAChrAIgQAuIgPAsIgEAJIAAgLADHnxIAFhYIAlhhIgigVADxqqICoBkQgkA1ALA1Ii5gVAGonYQgKg7Agg7IAvhyAHHrAIgfBSIiahSAiPp6IgohGAh1rAIgaBGIgPApIgBApIgDBcIgBAcIAmAAAB6qgIgCggABCrAIA4AgIAXAOAAWqsIAAAAIgbgUAhArAIAIAUQAJAiADA3AgjosIAAAbIBFAHIgCgYABvoDIAAgUAB5o+IhcgMAAioKIBNAHAgHlAIAEBQIADApIATFpIADAyIADA3IAYG1Agvl0IAlAHIADAtIh+AZQhZAFBahdgAAxlnIhggNACXmEIAoAIIACgYIAGhdAGElwIApAIIgFhwAHWlhIgpgHAFUlAIi1gYAGElwIjDgkAGAncIAEBsAHWnTIgugFABvmfIAAhkAgjoRIAABZABNDdIgCgyIgTlqABQEUIgDg3IRGCqABQEUIAXGsAA2joIRdCVASTHCIxDiuASTFRIxIimAnkpFIgBhlIgBgWAq8psIDSAXIAGAQQAQAkAtARIAAADIAAAoAkYrAIABAWQhiBAhshAAkWqZIgBgRAmnoQIAIADIBfAAIAAAoIAAAoQg/AKgogyIkVgoIAAhfIAAhSIABgCAlAoNQAYgMAYgPIgGhxIBdgTAukrAIAAA5IArAIIAAhBAvVrAIgLBAAudoeIgHhpAv4nxIBTALIBUAKIC7AZIArAGIgBgDIophJAwArAIgCCOIBlAUIC0AbIAAhkIAAhZAq8oNIAAASIgtAAArppnIiQgYAulnmIh7AdQgyAyBwgFICSgoIgBgYApEm7IgogHIAAACIAoAFIBoAPIiPgRIAIB8IJgBRApgkYIgDgpAqOlHIADApIAYFeIACAvIACA1IATHRIAyAJIADBCAqWnDIAIB8IoHhFAw/qOIgCgkAw/qOIhWgJAyVo3IAQADQAeAFAogDIAAgKQACgpgCgpIAtAEApHB2IgCgvIgXlfApECrIgDg1IJdBeApYLAIgEhLIo5hkAoqJ+IganTAyVnGICdgrIidgUAqLkeIoKhGAwCoyIg9gKAyVAaIIkBVApvCkIomhYAyVKIIE3A4AyVgRIIiBRAiEl/IlYgtAlAnlICeAZAifooIhxAAAAZELIpdhgAAAjHIpghRAiwLAIl6hCAATCiIpchb");
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
	this.shape_10.graphics.f("#D3C9C8").s().p("ABPDgIgDgyIRICmIAAA2gABMCuIgTlqIRbCUIxbiUIgCgpIRdCVIAAAoIAAF8gApFB5IgDgvIJdBbIpdhbIgXlfIJfBRIAVFpIACAygABMCugAyTAdIAAgrIAAlTIAAgoIIHBFIACApIoJhGIIJBGIAZFeIoihRIIiBRIABAvgApfkVIgDgpIJhBRIABApg");
	this.shape_10.setTransform(-459.275,-299.725);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#654E5E").s().p("AQFC5QgkgLAggaIBbgjIA4AHIAAAxIhPAXgAChgOIC0AYIiIA0QgfACgWAAQiBAACKhOgAiDg1IBVAMIAmAHIACArIh9AZIgJABQhMAABVhYgAwfh/IB8gdIBTAKIACAYIiSAoIgSABQhbAAAugugAqUh5Ii8gZIhTgKIhUgLIicgTIAAgFIIpBJIAAADgAyTi6ICcATIicAsgAyTi6g");
	this.shape_11.setTransform(-459.275,-332.45);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#BEB6C1").s().p("AA3A6IgFh+IBvAOQihBdDNgRICIgzIL7BlIAMACIhbAjQggAaAkALIBAAGIBPgWIAABNgApigfIgIh8ICQARIFXAtQhaBdBagEIB9gaIAFBPgAyThpIAAg6ICcgrIBUALIh8AdQgyAyBxgFICSgoIgCgYIC8AZIAIB7g");
	this.shape_12.setTransform(-459.275,-328.5);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#302B2F").s().p("AgpALIAAgdIBTAIIAAAdg");
	this.shape_13.setTransform(-346.25,-340.125);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#ADA1AB").s().p("ARfDwIgPgBIr7hlIi0gZIhvgPIhggMIhVgMIlXgtIhpgPIgngHIAAACIophIIAAguIAPAEQAeAEAogDIABgKQABgpgBgpIAsAEIgsgEIgCgjIACAjIhWgIIAAgqICUAAIgCCOIBmAUIC0AbIAAhjIAAhaIAuAAIgBACIAABSIAABgIEUAnQAoAyA/gKIAAgoICfAZIgBAbIAlAAQAlAVA1gEIAAgZICTAZIAAASIAoAJIAoAIIABgYIDDAkIApAIIApAHQAsAfAsgRIAAgRIC+AdQAjAiBDgRIAAgCIDCAYIAAARIADABIB8AQIAAAsgAq6gxIAAgRIAAARIgtAAgAwBhoIg8gKgAuii9IAAg5IAqAAIAABBg");
	this.shape_14.setTransform(-459.275,-345.25);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#31190D").s().p("AgHAGIAPgPIgFAOIgGAFg");
	this.shape_15.setTransform(-393.375,-366.3);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FF0000").s().p("ADKCmIAAhzIAAgSQgDhdBShpIARgUICaAAIAAAKQggAAgKAHIgGADIgHAHIgPAQQhBBFgcBaIAAAtIAABkIAAARQgPAHgQAAQgcAAgcgUgAmKBWIAAiIIBaANIAAAcIAABYIAAAZIgQAAQgrAAgfgSgAmAhVIAlhkIAPAAIAHAUQAKAiACA3gAnDi5IBCAAIgbBHg");
	this.shape_16.setTransform(-432.3,-351.3843);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFF33").s().p("AInCxIAAhVIBlgEIhlAEIhYgSIAAgRIAAhiQAaALAZAHIACABIACAAQAfAHAfAAIAAAAIABAAQAyAAAygSIADgBIgDABQgyASgyAAIgBAAIAAAAQgfAAgfgHIgCAAIgCgBQgZgHgagLIAAh0QABAQAfAMIATAGIA9AGQAuAAAggMQAYgJAHgMQgHAMgYAJQggAMguAAIg9gGIgTgGQgfgMgBgQIAFgPIAHgHIAGgDQAKgHAhAAIgBgKIByAAIAAAMQAXABAMAHQAOAKgCATIAAB0IAAAMIAAAmIAABAIggAIIAABoIAAACQgWAGgTAAQglAAgXgXgAJGiEQAcAAAcgUIAAAAIABgBIgCgiIACAiIgBABIAAAAQgcAUgcAAIAAAAIAAAAQgaAAgZgRIgCgBIAAAAIgBgBIAAAAIgBgBIgCgBIgBgkIABAkIACABIABABIAAAAIABABIAAAAIACABQAZARAaAAIAAAAIAAAAgApsAUIAAgnIAIAAIBfAAIAAAnIAAAoQgLABgKAAQgxAAghgpgApkgTIgIgDQgtgSgQgjIgBhmQA2AgAzAAQA0AAAxggQgxAgg0AAQgzAAg2ggIgBgWIDOAAIABAWIABASIAGBwQgYAQgYAMgAqqixIAAAAg");
	this.shape_17.setTransform(-439.4066,-349.9667);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#968460").s().p("AgvAtIAAg+IAAgoIA5gFIgCAEIAoAfIAAAKIhfAAIBfAAIAABQgAAwgRg");
	this.shape_18.setTransform(-366.275,-346.525);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#C1BAC1").s().p("AQYDRIAoAAIAAgNIBUAJIAAAUgAQYDRIgDAAIAAgSIgChrIAEhoIgEBoIACBrIjCgYIAAhoIAfgIIBgARIAAhQIAAgKIgogeIACgEIALggIABgBIBWBDIhWhDIgBgBIAAAAIgBiKIBnAAIgGDMIBKjMIAzAAIAAAIIgTBDIATALIAAAlIgegTIg7CGIBZALIAAAmIhUgIIAAAdIBUAIIAABxIhUgJIAAhwIAABwIAAANIgoAAgAQTBUIhBgMIAAAHIAAgHgARADEgAIvB7IAAhkIBnAJIAAARIBXASIAABVgAGuB3IgFhwIAFBwIgpgHIgDhtIADBtIjDglIAGhbIC6ATQgLg0Ajg1IiohkIghgUIAAgCIA+AAICaBSIAfhSIAmAAIguBzQghA7AKA5IAuAFIAABzgACZBbIgBgvQAAhtAXhDIAihaIAhAUIglBiIgFBYIgGBbIgBAZgABxBSIAAgRIiTgZIAAhYIBFAGIBOAIIAAgUIhPgMIhEgKIhagNIAACIIglAAIABgbIifgYIAAgoQAZgMAXgQIBxAAIABgpIAPgoIAbhHIAmAAIglBkIBHAJIBKAKIBbALIgJAoIAJgoIAHgeIACgJIgEgDIhohDIAAgBIgbgUIBIAAIA4AhIgCghIApAAIAuAAIAAACIgiBaQgXBDAABtIABAvgABxBBIAAhjgAigAUIAChcgACDiFIAQgtIALAGIgLgGIAQguIgQAuIgXgNIAXANgAQTBUgAq6gsIAAhfIDSAWIAGARQAQAjAsASIAAADIAAAogAubg+IgHhoIAHBoIhmgUIACiOIArAAIAyAAIAAA6IAqAHICRAZIAABkgAvfifIALhBgAyEhTIgPgDIAAhgIBWAIQABApgBApIgBAKIgeABQgWAAgSgCgACTiygADRjgg");
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


(lib.sprite14 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.shape13("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite14, new cjs.Rectangle(-3.5,-3.3,7,6.699999999999999), null);


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

	// Layer_8
	this.instance = new lib.sprite14();
	this.instance.setTransform(72.9,4.55,2.0317,2.0317,96.7258);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_7
	this.instance_1 = new lib.shape71("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_3
	this.instance_2 = new lib.text61("synched",0);
	this.instance_2.setTransform(-224,-153.15);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	// Layer_2
	this.instance_3 = new lib.text68("synched",0);
	this.instance_3.setTransform(-207.75,140.05);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

	// Layer_1
	this.instance_4 = new lib.shape67("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite72, new cjs.Rectangle(-227.9,-156.7,453.4,326.1), null);


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

	// Layer_26
	this.instance = new lib.sprite14();
	this.instance.setTransform(116.1,-96.4,2.0317,2.0317,-143.2742);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_25
	this.instance_1 = new lib.shape65("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_23
	this.instance_2 = new lib.sprite14();
	this.instance_2.setTransform(113.3,10.65,2.0308,2.0308,-91.0311);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	// Layer_22
	this.instance_3 = new lib.shape64("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

	// Layer_20
	this.instance_4 = new lib.sprite14();
	this.instance_4.setTransform(62.6,10.65,2.0308,2.0308,88.9689);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

	// Layer_19
	this.instance_5 = new lib.shape63("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1));

	// Layer_17
	this.instance_6 = new lib.sprite14();
	this.instance_6.setTransform(44.45,154.25,2.0317,2.0317,-53.2742);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1));

	// Layer_16
	this.instance_7 = new lib.shape62("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1));

	// Layer_14
	this.instance_8 = new lib.text61("synched",0);
	this.instance_8.setTransform(-224,-153.15);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1));

	// Layer_13
	this.instance_9 = new lib.text60("synched",0);
	this.instance_9.setTransform(-149.95,118.15);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1));

	// Layer_12
	this.instance_10 = new lib.shape59("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1));

	// Layer_11
	this.instance_11 = new lib.text58("synched",0);
	this.instance_11.setTransform(112.6,-152.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(1));

	// Layer_10
	this.instance_12 = new lib.shape57("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(1));

	// Layer_9
	this.instance_13 = new lib.text56("synched",0);
	this.instance_13.setTransform(94.1,164.85);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(1));

	// Layer_8
	this.instance_14 = new lib.shape55("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(1));

	// Layer_7
	this.instance_15 = new lib.text54("synched",0);
	this.instance_15.setTransform(166.65,-3.95);

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(1));

	// Layer_6
	this.instance_16 = new lib.shape53("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(1));

	// Layer_5
	this.instance_17 = new lib.text52("synched",0);
	this.instance_17.setTransform(-181.45,-51.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(1));

	// Layer_4
	this.instance_18 = new lib.shape51("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite66, new cjs.Rectangle(-229.7,-156.7,477.4,351.9), null);


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

	// Layer_14
	this.instance = new lib.shape29("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_12
	this.instance_1 = new lib.sprite14();
	this.instance_1.setTransform(95.55,48.45,1.3535,1.3535,22.6548);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_11
	this.instance_2 = new lib.shape28("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	// Layer_10
	this.instance_3 = new lib.text27("synched",0);
	this.instance_3.setTransform(16,98.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

	// Layer_9
	this.instance_4 = new lib.shape26("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

	// Layer_8
	this.instance_5 = new lib.text25("synched",0);
	this.instance_5.setTransform(-83.65,159.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1));

	// Layer_7
	this.instance_6 = new lib.shape24("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1));

	// Layer_6
	this.instance_7 = new lib.text23("synched",0);
	this.instance_7.setTransform(77.7,-45.65);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1));

	// Layer_5
	this.instance_8 = new lib.shape22("synched",0);
	this.instance_8.setTransform(1,-1);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1));

	// Layer_3
	this.instance_9 = new lib.sprite14();
	this.instance_9.setTransform(119.9,-83.6,1.3551,1.3551,-45.0087);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1));

	// Layer_2
	this.instance_10 = new lib.shape21("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite30, new cjs.Rectangle(-227.6,-182.8,459.29999999999995,371.3), null);


(lib.sprite19 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.text18("synched",0);
	this.instance.setTransform(-84.4,115.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_7
	this.instance_1 = new lib.shape17("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_6
	this.instance_2 = new lib.text16("synched",0);
	this.instance_2.setTransform(-125.1,-73.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	// Layer_5
	this.instance_3 = new lib.shape15("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

	// Layer_3
	this.instance_4 = new lib.sprite14();
	this.instance_4.setTransform(-168.65,-89.75,1.3551,1.3551,-75.0086);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

	// Layer_2
	this.instance_5 = new lib.shape12("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite19, new cjs.Rectangle(-206.3,-164.1,399.70000000000005,328.29999999999995), null);


(lib.sprite73 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {"1.1.mp3":0,"1.2.mp3":432,"1.3.mp3":458,"1.4.mp3":480,"1.5.mp3":660};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		/* stopAllSounds ();
		*/
	}
	this.frame_1104 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1104).call(this.frame_1104).wait(1));

	// Masked_Layer_38___29
	this.instance = new lib.text10("synched",0);
	this.instance.setTransform(-456,196.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1105));

	// Masked_Layer_37___29
	this.instance_1 = new lib.text9("synched",0);
	this.instance_1.setTransform(-456,107.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1105));

	// Masked_Layer_36___29
	this.instance_2 = new lib.text8("synched",0);
	this.instance_2.setTransform(-456,58.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1105));

	// Masked_Layer_35___29
	this.instance_3 = new lib.text7("synched",0);
	this.instance_3.setTransform(-456,263.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1105));

	// Masked_Layer_34___29
	this.instance_4 = new lib.shape5("synched",0);
	this.instance_4.setTransform(-122.05,-9.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1105));

	// Masked_Layer_30___29
	this.instance_5 = new lib.text4("synched",0);
	this.instance_5.setTransform(-456,5.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1105));

	// Layer_70
	this.instance_6 = new lib.sprite72();
	this.instance_6.setTransform(230.85,163.75);
	this.instance_6.alpha = 0;
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(909).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(176));

	// Layer_43
	this.instance_7 = new lib.sprite66();
	this.instance_7.setTransform(230.85,163.75);
	this.instance_7.alpha = 0;
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(679).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(210).to({alpha:0},20).to({_off:true},1).wait(175));

	// Layer_41
	this.instance_8 = new lib.sprite14();
	this.instance_8.setTransform(170.55,133.25,0.1694,0.1694,90);
	this.instance_8.alpha = 0;
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(625).to({_off:false},0).to({scaleX:1.5184,scaleY:1.5186,rotation:90.0006,x:150.6,y:157.85,alpha:0.9492},19).wait(1).to({scaleX:1.5894,scaleY:1.5896,x:149.5,y:159.1,alpha:1},0).wait(34).to({alpha:0},20).to({_off:true},1).wait(405));

	// Layer_40
	this.instance_9 = new lib.shape48("synched",0);
	this.instance_9.setTransform(180.5,137.25,0.1,0.1);
	this.instance_9.alpha = 0;
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(625).to({_off:false},0).to({scaleX:0.8965,scaleY:0.8963,x:239.7,y:193.55,alpha:0.9492},19).wait(1).to({scaleX:0.9384,scaleY:0.9383,x:242.8,y:196.5,alpha:1},0).wait(34).to({startPosition:0},0).to({alpha:0},20).to({_off:true},1).wait(405));

	// Layer_37
	this.instance_10 = new lib.text46("synched",0);
	this.instance_10.setTransform(323.45,298.75,0.1,0.1);
	this.instance_10.alpha = 0;
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(534).to({_off:false},0).to({scaleX:1.0078,scaleY:0.9806,x:209.95,y:278.5,alpha:0.9492},19).wait(1).to({scaleX:1.0556,scaleY:1.0269,x:204,y:277.35,alpha:1},0).to({_off:true},91).wait(460));

	// Layer_36
	this.instance_11 = new lib.shape45("synched",0);
	this.instance_11.setTransform(328.65,290,0.1,0.1);
	this.instance_11.alpha = 0;
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(534).to({_off:false},0).to({scaleX:1.0078,scaleY:0.9806,x:271.4,y:201.25,alpha:0.9492},19).wait(1).to({scaleX:1.0556,scaleY:1.0269,x:268.4,y:196.5,alpha:1},0).to({_off:true},91).wait(460));

	// Layer_34
	this.instance_12 = new lib.sprite14();
	this.instance_12.setTransform(332.65,292.95,0.1694,0.1694);
	this.instance_12.alpha = 0;
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(534).to({_off:false},0).to({scaleX:1.7072,scaleY:1.661,rotation:0.0005,x:311.5,y:230.4,alpha:0.9492},19).wait(1).to({scaleX:1.7881,scaleY:1.7395,x:310.4,y:227.05,alpha:1},0).to({_off:true},91).wait(460));

	// Layer_33
	this.instance_13 = new lib.shape44("synched",0);
	this.instance_13.setTransform(328.65,290,0.1,0.1);
	this.instance_13.alpha = 0;
	this.instance_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(534).to({_off:false},0).to({scaleX:1.0078,scaleY:0.9806,x:271.4,y:201.25,alpha:0.9492},19).wait(1).to({scaleX:1.0556,scaleY:1.0269,x:268.4,y:196.5,alpha:1},0).to({_off:true},91).wait(460));

	// Layer_29
	this.instance_14 = new lib.sprite14();
	this.instance_14.setTransform(314.95,108,0.1694,0.1694,105.0002);
	this.instance_14.alpha = 0;
	this.instance_14._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(419).to({_off:false},0).to({scaleX:1.6394,scaleY:1.6396,rotation:104.9985,x:110.2,y:163.25,alpha:0.9492},19).wait(1).to({scaleX:1.7168,scaleY:1.717,rotation:104.9981,x:99.4,y:166.2,alpha:1},0).to({_off:true},116).wait(550));

	// Layer_28
	this.instance_15 = new lib.shape42("synched",0);
	this.instance_15.setTransform(330.95,111,0.1,0.1);
	this.instance_15.alpha = 0;
	this.instance_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(419).to({_off:false},0).to({scaleX:0.9679,scaleY:0.9678,x:265.05,y:192.25,alpha:0.9492},19).wait(1).to({scaleX:1.0136,scaleY:1.0135,x:261.6,y:196.55,alpha:1},0).to({_off:true},116).wait(550));

	// Layer_25
	this.instance_16 = new lib.sprite14();
	this.instance_16.setTransform(324.25,291.25,1.3535,1.3536,67.6538);
	this.instance_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(324).to({_off:false},0).to({_off:true},4).wait(4).to({_off:false},0).to({_off:true},4).wait(769));

	// Layer_24
	this.instance_17 = new lib.shape34("synched",0);
	this.instance_17.setTransform(337,132);

	this.instance_18 = new lib.shape36("synched",0);
	this.instance_18.setTransform(337,132);

	this.instance_19 = new lib.sprite14();
	this.instance_19.setTransform(374.75,126.7,0.1694,0.1694,120.0023);
	this.instance_19.alpha = 0;
	this.instance_19._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_17}]},324).to({state:[]},4).to({state:[{t:this.instance_18}]},4).to({state:[]},4).to({state:[{t:this.instance_19}]},28).to({state:[{t:this.instance_19}]},19).to({state:[{t:this.instance_19}]},1).to({state:[]},134).wait(587));
	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(364).to({_off:false},0).to({scaleX:1.6394,scaleY:1.6395,rotation:119.997,x:197.85,y:159,alpha:0.9492},19).wait(1).to({scaleX:1.7168,scaleY:1.7169,rotation:119.9973,x:188.55,y:160.6,alpha:1},0).to({_off:true},134).wait(587));

	// Layer_23
	this.instance_20 = new lib.shape40("synched",0);
	this.instance_20.setTransform(381.95,130.25,0.1,0.1);
	this.instance_20.alpha = 0;
	this.instance_20._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(364).to({_off:false},0).to({scaleX:0.9679,scaleY:0.9678,x:267.6,y:193.3,alpha:0.9492},19).wait(1).to({scaleX:1.0136,scaleY:1.0135,x:261.6,y:196.55,alpha:1},0).to({_off:true},134).wait(587));

	// Layer_22
	this.instance_21 = new lib.sprite14();
	this.instance_21.setTransform(355.7,126.2,1.3535,1.3536,67.6538);

	this.instance_22 = new lib.shape37("synched",0);
	this.instance_22.setTransform(377.4,130.5,0.25,0.25);

	this.instance_23 = new lib.shape38("synched",0);
	this.instance_23.setTransform(377.4,130.5,0.25,0.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_21}]},324).to({state:[]},4).to({state:[{t:this.instance_21}]},4).to({state:[]},4).to({state:[{t:this.instance_22}]},8).to({state:[]},3).to({state:[{t:this.instance_23}]},4).to({state:[]},4).wait(750));

	// Layer_21
	this.instance_24 = new lib.shape33("synched",0);
	this.instance_24.setTransform(337,132);

	this.instance_25 = new lib.shape35("synched",0);
	this.instance_25.setTransform(337,132);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_24}]},324).to({state:[]},4).to({state:[{t:this.instance_25}]},4).to({state:[]},4).wait(769));

	// Layer_20
	this.instance_26 = new lib.sprite19();
	this.instance_26.setTransform(238.3,185.8,1.1305,1.1305);
	this.instance_26.alpha = 0;
	this.instance_26._off = true;

	this.instance_27 = new lib.shape32("synched",0);
	this.instance_27.setTransform(305.2,196.5);
	this.instance_27.alpha = 0;
	this.instance_27._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(150).to({_off:false},0).to({alpha:0.9492},18).wait(1).to({alpha:1},0).wait(55).to({alpha:0.0391},22).to({_off:true},1).wait(858));
	this.timeline.addTween(cjs.Tween.get(this.instance_27).wait(304).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).to({_off:true},61).wait(720));

	// Layer_5
	this.instance_28 = new lib.sprite30();
	this.instance_28.setTransform(230.05,186.7);
	this.instance_28.alpha = 0;
	this.instance_28._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_28).wait(224).to({_off:false},0).to({alpha:0.9609},22).wait(1).to({alpha:1},0).wait(57).to({alpha:0.0508},19).to({_off:true},1).wait(781));

	// Layer_4
	this.instance_29 = new lib.shape2("synched",0);
	this.instance_29.setTransform(410.25,356,0.6956,0.473);

	this.timeline.addTween(cjs.Tween.get(this.instance_29).wait(150).to({startPosition:0},0).to({alpha:0.0508},18).to({_off:true},1).wait(936));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-459.9,-3.6,988.5,390.20000000000005);


// stage content:
(lib.vital_acc_eg = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {p1:0};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,1,1104];
	this.streamSoundSymbolsList[1] = [{id:"vital_acc_eg1",startFrame:1,endFrame:1104,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		InitPage(1);
		Next(0);
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
		var soundInstance = playSound("vital_acc_eg1",0);
		this.InsertIntoSoundStreamData(soundInstance,1,1104,1);
	}
	this.frame_1104 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1103).call(this.frame_1104).wait(1));

	// Layer_97
	this.instance = new lib.text80("synched",0);
	this.instance.setTransform(10,0,1.5022,1.5022);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1105));

	// Layer_95
	this.instance_1 = new lib.text78("synched",0);
	this.instance_1.setTransform(46.85,46.7,1.5031,1.5022);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1105));

	// Layer_94
	this.instance_2 = new lib.shape76("synched",0);
	this.instance_2.setTransform(22.85,0,1.5022,1.5022);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1105));

	// Layer_back
	this.back = new lib.buttonbak();
	this.back.name = "back";
	this.back.setTransform(350,645,1.0001,1.0002);
	new cjs.ButtonHelper(this.back, 0, 1, 2, false, new lib.buttonbak(), 3);

	this.timeline.addTween(cjs.Tween.get(this.back).wait(1105));

	// Layer_page
	this.page = new cjs.Text("Page number", "italic bold 15px 'Arial'", "#FF9900");
	this.page.name = "page";
	this.page.lineHeight = 17;
	this.page.lineWidth = 193;
	this.page.parent = this;
	this.page.setTransform(23,658,1.4989,1.4989);

	this.timeline.addTween(cjs.Tween.get(this.page).wait(1105));

	// Layer_next
	this.next = new lib.buttonnext();
	this.next.name = "next";
	this.next.setTransform(1496.1,5.1,0.9998,0.9999,0,0,0,0.1,0.1);
	new cjs.ButtonHelper(this.next, 0, 1, 2, false, new lib.buttonnext(), 3);

	this.timeline.addTween(cjs.Tween.get(this.next).wait(1105));

	// Layer_previous
	this.previous = new lib.buttonprev();
	this.previous.name = "previous";
	this.previous.setTransform(1432,5,1.0003,0.9993);
	new cjs.ButtonHelper(this.previous, 0, 1, 2, false, new lib.buttonprev(), 3);

	this.timeline.addTween(cjs.Tween.get(this.previous).wait(1105));

	// Layer_slider
	this.slider = new lib.sprite_slider();
	this.slider.name = "slider";
	this.slider.setTransform(610.1,670.1,0.9937,0.9983,0,0,0,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.slider).wait(1105));

	// Layer_replay
	this.replay = new lib.sprite_replay();
	this.replay.name = "replay";
	this.replay.setTransform(1045.1,650.1,0.9999,0.9999,0,0,0,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.replay).wait(1105));

	// Layer_slider_base
	this.instance_3 = new lib.sprite_sliderbase();
	this.instance_3.setTransform(600,650,1,0.9999);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1105));

	// Layer_playpau
	this.playpau = new lib.sprite_playpau();
	this.playpau.name = "playpau";
	this.playpau.setTransform(555,650,0.9999,0.9999);

	this.timeline.addTween(cjs.Tween.get(this.playpau).wait(1105));

	// Mask_Layer_1 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("Eh8/AyyMAAAhfTMD5/AAAMAAABfTg");
	mask.setTransform(800,325);

	// Masked_Layer_2___1
	this.ani1 = new lib.sprite73();
	this.ani1.name = "ani1";
	this.ani1.setTransform(745,80,1.5022,1.5022);

	var maskedShapeInstanceList = [this.ani1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.ani1).wait(1105));

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
		{src:"images/vital_acc_eg_atlas_1.png", id:"vital_acc_eg_atlas_1"},
		{src:"images/vital_acc_eg_atlas_2.png", id:"vital_acc_eg_atlas_2"},
		{src:"sounds/vital_acc_eg1.mp3", id:"vital_acc_eg1"}
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