(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"vital_opsm_sale_atlas_1", frames: [[3669,388,361,124],[2771,1524,1188,173],[2197,2120,1193,173],[997,1770,1213,173],[997,2120,1198,173],[2219,0,1201,227],[2771,1349,1193,173],[997,2417,1206,120],[997,2539,1264,99],[3107,1975,206,143],[3669,514,413,99],[2627,1975,478,99],[3745,1174,325,99],[3107,2390,175,99],[3107,2491,153,99],[2753,1874,583,99],[997,1945,1211,173],[2263,2295,838,130],[2263,2618,1358,82],[2526,649,1228,173],[2771,1699,1166,173],[3262,2491,107,120],[3966,1397,90,120],[997,1427,1161,281],[3961,1524,107,120],[3756,615,90,120],[2219,229,1161,227],[3966,1275,107,120],[3848,615,90,120],[2526,458,1141,189],[3103,2295,239,93],[3623,2618,354,99],[997,0,1220,843],[997,2702,1275,82],[2212,1895,413,124],[3753,824,292,99],[2526,824,1225,173],[2526,999,1225,173],[2263,2427,842,120],[2526,1174,1217,173],[997,2295,1217,120],[997,845,985,580],[3887,1874,48,648],[3937,1874,48,648],[0,0,995,3811],[2627,1895,113,53],[3284,2390,60,60],[3382,388,276,53],[3939,1699,111,164],[2160,1373,609,395],[1984,845,540,526],[3422,0,516,386],[3392,1874,493,370],[3392,2246,493,370],[2212,1770,539,123]]}
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



(lib.CachedBmp_48 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_47 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_46 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_45 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_44 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_43 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_42 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_41 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_40 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_39 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_38 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_37 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_36 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_35 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_34 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_33 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_32 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_31 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_30 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_29 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_28 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_27 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_26 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_25 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_24 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_23 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_22 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_21 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_20 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_19 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_18 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(30);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_17 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(31);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_16 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(32);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_15 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(33);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_14 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(34);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_13 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(35);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_12 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(36);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_11 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(37);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_10 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(38);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_9 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(39);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_8 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(40);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_7 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(41);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_6 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(42);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_5 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(43);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_4 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(44);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_3 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(45);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(46);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(47);
}).prototype = p = new cjs.Sprite();



(lib.image108 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(48);
}).prototype = p = new cjs.Sprite();



(lib.image109 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(49);
}).prototype = p = new cjs.Sprite();



(lib.image12 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(50);
}).prototype = p = new cjs.Sprite();



(lib.image66 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(51);
}).prototype = p = new cjs.Sprite();



(lib.image71 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(52);
}).prototype = p = new cjs.Sprite();



(lib.image74 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(53);
}).prototype = p = new cjs.Sprite();



(lib.image76 = function() {
	this.initialize(ss["vital_opsm_sale_atlas_1"]);
	this.gotoAndStop(54);
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
	this.instance = new lib.CachedBmp_48();
	this.instance.setTransform(-3.95,-3.75,0.3326,0.3326);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,120.10000000000001,41.2);


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
	this.instance = new lib.CachedBmp_47();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,395.4,57.599999999999994);


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
	this.instance = new lib.CachedBmp_46();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,397.09999999999997,57.599999999999994);


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
	this.instance = new lib.CachedBmp_45();
	this.instance.setTransform(-8.75,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8.7,-3.3,403.7,57.599999999999994);


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
	this.instance = new lib.CachedBmp_44();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,398.7,57.599999999999994);


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
	this.instance = new lib.CachedBmp_43();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,399.7,75.5);


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
	this.instance = new lib.CachedBmp_42();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,397.09999999999997,57.599999999999994);


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
	this.instance = new lib.CachedBmp_41();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,401.4,39.9);


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
	this.instance = new lib.CachedBmp_40();
	this.instance.setTransform(-3.95,-3.65,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.6,420.7,32.9);


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
	this.instance = new lib.CachedBmp_39();
	this.instance.setTransform(-3.95,-3.65,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.6,68.5,47.6);


(lib.text121 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(-3.95,-3.65,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.6,137.4,32.9);


(lib.text119 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(-3.95,-3.65,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.6,159.1,32.9);


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
	this.instance = new lib.CachedBmp_36();
	this.instance.setTransform(-3.95,-3.65,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.6,108.2,32.9);


(lib.text115 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(-3.95,-3.65,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.6,58.199999999999996,32.9);


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
	this.instance = new lib.CachedBmp_34();
	this.instance.setTransform(-3.95,-3.65,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.6,50.9,32.9);


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
	this.instance = new lib.CachedBmp_33();
	this.instance.setTransform(-3.95,-3.65,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.6,194,32.9);


(lib.text107 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,403.09999999999997,57.599999999999994);


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
	this.instance = new lib.CachedBmp_31();
	this.instance.setTransform(-3.95,-3.65,0.3326,0.3326);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.6,278.7,43.2);


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
	this.instance = new lib.CachedBmp_30();
	this.instance.setTransform(0,0,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,452,27.3);


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
	this.instance = new lib.CachedBmp_29();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,408.7,57.599999999999994);


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
	this.instance = new lib.CachedBmp_28();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,388.09999999999997,57.599999999999994);


(lib.text100 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,35.6,39.9);


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
	this.instance = new lib.CachedBmp_26();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,29.9,39.9);


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
	this.instance = new lib.CachedBmp_25();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,386.4,93.5);


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
	this.instance = new lib.CachedBmp_24();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,35.6,39.9);


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
	this.instance = new lib.CachedBmp_23();
	this.instance.setTransform(-2.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2.9,-3.3,29.9,39.9);


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
	this.instance = new lib.CachedBmp_22();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,386.4,75.5);


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
	this.instance = new lib.CachedBmp_21();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,35.6,39.9);


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
	this.instance = new lib.CachedBmp_20();
	this.instance.setTransform(-2.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2.9,-3.3,29.9,39.9);


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
	this.instance = new lib.CachedBmp_19();
	this.instance.setTransform(173.55,0.45,0.3173,0.3173);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(173.6,0.5,362,59.9);


(lib.text73 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(38.05,-3,0.3134,0.3134);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(38.1,-3,74.9,29.2);


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
	this.instance = new lib.CachedBmp_17();
	this.instance.setTransform(39.15,-2.65,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(39.2,-2.6,117.8,32.9);


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
	this.instance = new lib.CachedBmp_16();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,406.09999999999997,280.6);


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
	this.instance = new lib.CachedBmp_15();
	this.instance.setTransform(0,0,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,424.4,27.3);


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
	this.instance = new lib.CachedBmp_14();
	this.instance.setTransform(-3.95,-3.75,0.3326,0.3326);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,137.4,41.2);


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
	this.instance = new lib.CachedBmp_13();
	this.instance.setTransform(37.15,-3.65,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(37.2,-3.6,97.2,32.9);


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
	this.instance = new lib.CachedBmp_12();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,407.7,57.599999999999994);


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
	this.instance = new lib.CachedBmp_11();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,407.7,57.599999999999994);


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
	this.instance = new lib.CachedBmp_10();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,280.2,39.9);


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
	this.instance = new lib.CachedBmp_9();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,405.09999999999997,57.599999999999994);


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
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,405.09999999999997,39.9);


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

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgJAHgIQAIgHAJAAQAKAAAIAHQAHAIAAAJQAAAKgHAIQgIAHgKAAQgJAAgIgHg");
	this.shape.setTransform(-347.9,268.05);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_3
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgRARQgHgGAAgLQAAgJAHgIQAIgHAJAAQAKAAAIAHQAHAIAAAJQAAALgHAGQgIAIgKAAQgJAAgIgIg");
	this.shape_1.setTransform(-347.9,319.05);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgJAHgIQAIgHAJAAQAKAAAIAHQAHAIAAAJQAAAKgHAIQgIAHgKAAQgJAAgIgHg");
	this.shape_2.setTransform(-347.9,107.05);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgKAHgHQAIgHAJAAQAKAAAIAHQAHAHAAAKQAAAKgHAIQgIAHgKAAQgJAAgIgHg");
	this.shape_3.setTransform(-347.9,60.05);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-350.4,57.6,5,264);


(lib.shape133 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
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
	this.shape.setTransform(-347.9,174.05);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-350.4,171.6,5,5);


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

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("ADXGEImtsH");
	this.shape.setTransform(208.5,63.6);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(185.5,23.3,46,80.60000000000001);


(lib.shape130 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("Ah+DUID9mn");
	this.shape.setTransform(386.075,60.175);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(371.9,37.5,28.400000000000034,45.400000000000006);


(lib.shape129 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("ACLADIkUgF");
	this.shape.setTransform(154.95,279.85);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(139.6,278.1,30.700000000000017,3.5);


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
	this.shape.graphics.f().s("#FF0000").ss(3,0,0,3).p("AhZgBICzAC");
	this.shape.setTransform(243.025,300.95);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(232.5,299.3,21.099999999999994,3.3000000000000114);


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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("AgCClIAFlK");
	this.shape.setTransform(275.525,224.55);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(273.8,206.5,3.5,36.099999999999994);


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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("AjlA5IHKhx");
	this.shape.setTransform(343.1,213.125);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(318.7,205.9,48.900000000000034,14.5);


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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("AmtBrINbjV");
	this.shape.setTransform(82.225,151.075);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(37.7,138.9,89.1,24.400000000000006);


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
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("A8+AAMA2FAAAID4AA");
	this.shape.setTransform(244.575,365.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("A7PBfIAAi9MA2fAAAIAAClIAAAYgAbQBHMg2EAAAg");
	this.shape_1.setTransform(230.85,358.35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(56.5,348.9,374.6,19);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AK0BfI1nAAIAAi9IVnAAg");
	this.shape.setTransform(391.825,27.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AqzBfIAAi9IVnAAIAAC9g");
	this.shape_1.setTransform(391.825,27.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(321.7,17,140.3,21);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AMkBfI5HAAIAAi9IZHAAg");
	this.shape.setTransform(200.675,14.85);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AsjBfIAAi9IZHAAIAAC9g");
	this.shape_1.setTransform(200.675,14.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(119.3,4.4,162.8,21);


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
	this.shape.graphics.f("rgba(255,255,255,0.8)").s().p("Aj4ClIAAlJIHwAAIAAFJg");
	this.shape.setTransform(428.15,81.925);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(403.3,65.5,49.69999999999999,32.900000000000006);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("ADoheIAAC9InPAAIAAi9g");
	this.shape.setTransform(276.275,296.55);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AjnBfIAAi9IHPAAIAAC9g");
	this.shape_1.setTransform(276.275,296.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(252.1,286.1,48.400000000000006,21);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AC7heIAAC9Il1AAIAAi9g");
	this.shape.setTransform(271.175,194.85);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("Ai6BfIAAi9IF1AAIAAC9g");
	this.shape_1.setTransform(271.175,194.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(251.5,184.4,39.39999999999998,21);


(lib.shape110 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("APLBfI+VAAIAAi9IeVAAg");
	this.shape.setTransform(224.55,138.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AvJBfIAAi9IeTAAIAAC9g");
	this.shape_1.setTransform(224.55,138.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_3
	this.instance = new lib.CachedBmp_7();
	this.instance.setTransform(92.1,150,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	var sprImg_shape_2 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_sale_atlas_1"],48);
	sprImg_shape_2.onload = function(){
		this.shape_2.graphics.bf(sprImg_shape_2, null, new cjs.Matrix2D(1,0,0,1,-55.5,-82)).s().p("AoqM0IAA5nIRVAAIAAZng")
	}.bind(this);
	this.shape_2.setTransform(251.95,246.35);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_1
	this.shape_3 = new cjs.Shape();
	var sprImg_shape_3 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_sale_atlas_1"],49);
	sprImg_shape_3.onload = function(){
		this.shape_3.graphics.bf(sprImg_shape_3, null, new cjs.Matrix2D(0.672,0,0,0.672,-204.5,-132.7)).s().p("A/8UvMAAAgpdMA/5AAAMAAAApdg")
	}.bind(this);
	this.shape_3.setTransform(212.55,175.375);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(8,42.7,412,300.40000000000003);


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
	this.shape.graphics.f().s("#FF9900").ss(3,1,0,3).p("AFasxQgFgegKgcAEyuhQgPgagTgXAk8uNQgNAbgIAeAjTwMQgSAOgSARQgVAWgRAXAALxTIg7ADACAw8QgcgLgegFAhqxDQgcAJgbAOAhommIA7ANAAMmXIA8gGACBmuQAcgLAagRAlbsXQgCARAAARIABAXAlUqiQAHAdALAbAklo2QAQAZAWAXABsjaQgZALgVAVIgCACAAciFQgHAVAAAZIABAPAAogPIAWAaQAWAXAcAKAjTndQAZATAaANADonuIApgrAEzpKQAPgaAKgdAFaq6QAEgdAAgeAESgFQASgYAGgeAEqh4QgHgegUgYACtAzQAfgCAagPADhjUQgagOghgBADlv+QgXgUgZgQACtOVQgKgZgVgVIgDgDABYNFQgVgHgYAAIgPABAgbNRQgPAJgNANQgXAXgKAcAhfPWQACAfAOAaAgnQ8QAZASAeAGACoQKQAOgaABghABMRTQAegHAZgV");
	this.shape.setTransform(220.9,178.825);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(184.4,66.6,72.99999999999997,224.50000000000003);


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
	this.shape.graphics.f().s("#FF0000").ss(2,0,0,3).p("AmyAAINlAA");
	this.shape.setTransform(132.6,101);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(88.1,100,89,2);


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
	this.shape.graphics.f().s("#FF0000").ss(2,0,0,3).p("AmyAAINlAA");
	this.shape.setTransform(167.6,173);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(123.1,172,89,2);


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

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(2,0,0,3).p("AmyAAINlAA");
	this.shape.setTransform(159.6,276);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(115.1,275,89,2);


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
	this.shape.graphics.f().s("#FF9900").ss(3,1,0,3).p("Ag8nHIAWAbQAWAXAbAKAhIo9QgHAVAAAZIABAPAAHqSQgYALgVAVIgCACADFowQgHgegUgYACtm9QASgYAGgeAB8qMQgagOghgBABImEQAfgCAagPABIHeQgKgZgVgWIgDgDAgMGOQgVgHgYAAIgPAAAiAGZQgPAJgNANQgXAXgKAcAjEIfQACAeAOAaAiMKEQAZATAfAFAgYKbQAdgHAZgVABDJSQAOgaABgg");
	this.shape.setTransform(230.975,222.8);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(209.8,154.5,42.39999999999998,136.60000000000002);


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
	this.shape.graphics.f().s("#FF0000").ss(2,0,0,3).p("AmyAAINlAA");
	this.shape.setTransform(167.6,173);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(123.1,172,89,2);


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
	this.shape.graphics.f().s("#FF0000").ss(2,0,0,3).p("AmyAAINlAA");
	this.shape.setTransform(159.6,276);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(115.1,275,89,2);


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
	this.shape.graphics.f("#003366").s().p("AgRARQgHgHAAgKQAAgKAHgHQAHgHAKAAQALAAAGAHQAIAHAAAKQAAAKgIAHQgGAIgLAAQgKAAgHgIg");
	this.shape.setTransform(8,38.85);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(5.5,36.4,5,5);


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

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF9900").ss(3,1,0,3).p("ACCgzQgLgZgVgVIgDgDAAtiDQgVgHgYAAIgPABAhHh3QgPAJgNANQgWAXgKAcAiLANQACAfAPAaAhSBzQAZASAfAGAB8BBQAOgaACghAAgCKQAfgHAYgV");
	this.shape.setTransform(225.225,275.725);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(209.8,260.4,30.899999999999977,30.700000000000045);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("ABVBUQgjAkgyAAQgxAAgjgkQgjgjAAgxQAAgxAjgjQAjgjAxAAQAyAAAjAjQAjAjAAAxQAAAxgjAjg");
	this.shape.setTransform(79.45,101.15);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AhUBVQgjgjAAgyQAAgxAjgjQAjgjAxAAQAxAAAkAjQAjAjAAAxQAAAygjAjQgkAjgxAAQgxAAgjgjg");
	this.shape_1.setTransform(79.45,101.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(66.5,88.2,26,26);


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
	this.shape.graphics.f().s("#FF0000").ss(2,1,0,3).p("AmyAAINlAA");
	this.shape.setTransform(159.6,276);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(115.1,275,89,2);


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

	// Layer_84
	this.instance = new lib.CachedBmp_4();
	this.instance.setTransform(-210.8,-967.05,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_83
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("AhZhZIAACzICzAAIAAizg");
	this.shape.setTransform(-69.25,-452.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AhZBaIAAizICzAAIAACzg");
	this.shape_1.setTransform(-69.25,-452.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_82
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(1,0,0,3).p("AA8hjIAADHIh3AAIAAjHg");
	this.shape_2.setTransform(24.3,-304.1);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("Ag7BkIAAjHIB3AAIAADHg");
	this.shape_3.setTransform(24.3,-304.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	// Layer_81
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#000000").ss(1,0,0,3).p("AA8hjIAADHIh3AAIAAjHg");
	this.shape_4.setTransform(24.3,-335.1);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("Ag7BkIAAjHIB3AAIAADHg");
	this.shape_5.setTransform(24.3,-335.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4}]}).wait(1));

	// Layer_80
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#000000").ss(1,0,0,3).p("ABYhXIAACvIivAAIAAivg");
	this.shape_6.setTransform(-8,-568.15);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AhWBXIAAiuICtAAIAACug");
	this.shape_7.setTransform(-8,-568.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6}]}).wait(1));

	// Layer_79
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#000000").ss(1,0,0,3).p("AjVAAIGrAA");
	this.shape_8.setTransform(52.55,-279);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(1));

	// Layer_78
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#000000").ss(1,0,0,3).p("AKQVnIAAFLQABAIADAHQAGAJAIAAIC8AAQAHAAAFgJIAFgIIAAgCMAAAg2AIvtAAIhyByIAANfQALAMAFANQAMAHAJANQAYAeAAAqQAAArgYAeQgQAUgUAHQgKAKgLAGIgEADQgVAMgZACIgBAAIAAABIitAAIAAgBImKAAIAAFHIDqCqICOAAIAAgCQAAgbAhgSQAjgUAvABIFzAAQAugBAhAUQAjASAAAbIAAACIACAAIAAUMICBBo");
	this.shape_9.setTransform(8.3,-417.25);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#993400").s().p("AKibJQgIAAgGgJQgDgGgBgIIAAlMImrAAIiBhnIAA0MIgCAAIAAgCQAAgbgigSQgigUguABIlzAAQgvgBgjAUQghASAAAbIAAACIiOAAIjqiqIAAlGIGKAAIAAAAICtAAIAAAAIABAAQAZgDAVgMIAFgCQAKgIAKgJQAVgHAPgUQAYgeAAgqQAAgrgYgeQgJgMgLgIQgGgNgLgLIAAtgIBzhyIPsAAMAAAA1/IgBADIgDAHQgFAJgIAAg");
	this.shape_10.setTransform(8.3,-417.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_10},{t:this.shape_9}]}).wait(1));

	// Layer_77
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#000000").ss(1,0,0,3).p("Ag7hjIAADHIB3AAIAAjHg");
	this.shape_11.setTransform(325.55,-218.75);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("Ag7BkIAAjHIB3AAIAADHg");
	this.shape_12.setTransform(325.55,-218.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_12},{t:this.shape_11}]}).wait(1));

	// Layer_76
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("#000000").ss(1,0,0,3).p("Al5XvMAAAgz/IPQAAQAoAAAAgyIAAhwQAAgogagIIAAhaIgBAAIAArwIBniHIAFAAIAAjRIC0AAIAAekIkJAAIAAADIjEAAQg5AAgoAoQgZAZgKAhIgIAAIAALHIALAAIAAC3QgjANgdAcQguAvgHA/IgBASIAAAJIABAPIgEAAIAAb0IkRHtIgVAAIAAPgImRAAImJjgIAAh6ICpiCIABAAIAAAAIAAgBIAAgFIBYAAIAAr5IADAAQBSjyCqjD");
	this.shape_13.setTransform(299.9,-174.25);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#00FF01").s().p("EgH6AyFImJjgIAAh7ICpiBIABAAIAAAAIAAgBIAAgFIBXAAIAAr5IAEAAQBSjzCqjCIAAAAIAAgHIAJAAMAAAgz+IPQAAQAoABAAgyIAAhxQAAgpgagHIAAhaIgBAAIAArvIBmiHIAGAAIAAjSIC0AAIAAekIkJAAIAAADIjEAAQg5AAgoAoQgaAZgJAiIgIAAIAALHIAKAAIAAC1QgiAOgdAdQguAugIA/IgBASIAAAJIABAPIgDAAIAAbzIkSHtIgUAAIAAPhg");
	this.shape_14.setTransform(299.9,-174.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_14},{t:this.shape_13}]}).wait(1));

	// Layer_75
	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("#000000").ss(1,0,0,3).p("AA8hjIAADHIh3AAIAAjHg");
	this.shape_15.setTransform(-43.9,-218.75);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("Ag7BkIAAjHIB3AAIAADHg");
	this.shape_16.setTransform(-43.9,-218.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_16},{t:this.shape_15}]}).wait(1));

	// Layer_74
	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f().s("#000000").ss(1,0,0,3).p("AF6XvMAAAgz/IvQAAQgoAAAAgyIAAhwQAAgoAagIIAAhaIABAAIAArwIhniHIgFAAIAAjRIi0AAIAAekIEJAAIAAADIDEAAQA5AAAoAoQAZAZAKAhIAIAAIAALHIgLAAIAAC3QAjANAdAcQAuAvAHA/IABASIAAAJIgBAPIAEAAIAAb0IESHtIAUAAIAAPgIGRAAIGJjgIAAh6IipiCIgBAAIAAAAIAAgBIAAgFIhXAAIAAr5IgEAAQhRjyirjD");
	this.shape_17.setTransform(-18.25,-174.25);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#00FF01").s().p("EABqAyFIAAvhIgVAAIkRntIAA7zIgEAAIABgPIAAgJIgBgSQgHg/guguQgcgdgkgOIAAi1IALAAIAArHIgIAAQgKgigZgZQgogog5AAIjEAAIAAgDIkJAAIAA+kIC0AAIAADSIAFAAIBnCHIAALvIAAAAIAABaQgbAHAAApIAABxQAAAyAogBIPQAAMAAAAz+IAKAAIAAAHIgBAAQCrDCBRDzIADAAIAAL5IBYAAIAAAFIAAABIAAAAIABAAICpCBIAAB7ImJDgg");
	this.shape_18.setTransform(-18.25,-174.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_18},{t:this.shape_17}]}).wait(1));

	// Layer_73
	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f().s("#000000").ss(1,0,0,3).p("ACeAPIk7AAIAAgdIE7AAg");
	this.shape_19.setTransform(318.65,426.9);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#C0C0C0").s().p("AicAPIAAgdIE6AAIAAAdg");
	this.shape_20.setTransform(318.65,426.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_20},{t:this.shape_19}]}).wait(1));

	// Layer_72
	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f().s("#000000").ss(1,0,0,3).p("ACWAPIkrAAIAAgdIErAAg");
	this.shape_21.setTransform(-35,426.9);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#C0C0C0").s().p("AiVAPIAAgdIErAAIAAAdg");
	this.shape_22.setTransform(-35,426.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_22},{t:this.shape_21}]}).wait(1));

	// Layer_71
	this.instance_1 = new lib.CachedBmp_5();
	this.instance_1.setTransform(207.7,-279.6,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_70
	this.instance_2 = new lib.CachedBmp_6();
	this.instance_2.setTransform(50.05,-279.55,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	// Layer_69
	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f().s("#000000").ss(1,0,0,3).p("AhRgXQAighAvAAQAwAAAiAhQAhAhAAAvIjlAAQAAgvAhghg");
	this.shape_23.setTransform(62.1276,38.025);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#01FFFF").s().p("AhyA5QAAgvAhghQAighAvAAQAwAAAiAhQAhAhAAAvg");
	this.shape_24.setTransform(62.125,38.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_24},{t:this.shape_23}]}).wait(1));

	// Layer_68
	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f().s("#000000").ss(1,0,0,3).p("ABRBRQghAigwAAQgvAAgigiQghghAAgwQAAgvAhghQAigiAvAAQAwAAAhAiQAiAhAAAvQAAAwgiAhg");
	this.shape_25.setTransform(219.8,32.5);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#01FFFF").s().p("AhQBRQgighAAgwQAAgvAighQAhgiAvAAQAwAAAiAiQAhAhAAAvQAAAwghAhQgiAigwAAQgvAAghgig");
	this.shape_26.setTransform(219.8,32.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_26},{t:this.shape_25}]}).wait(1));

	// Layer_67
	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f().s("#000000").ss(1,0,0,3).p("ABSBSQgiAhgwAAQgvAAgighQghgiAAgwQAAgvAhghQAigiAvAAQAwAAAiAiQAhAhAAAvQAAAwghAig");
	this.shape_27.setTransform(62.075,2.6);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#01FFFF").s().p("AhRBRQghghAAgwQAAgvAhgiQAighAvAAQAwAAAiAhQAhAiAAAvQAAAwghAhQgiAigwAAQgvAAgigig");
	this.shape_28.setTransform(62.075,2.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_28},{t:this.shape_27}]}).wait(1));

	// Layer_66
	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f().s("#000000").ss(1,0,0,3).p("ABRAYQghAhgwAAQgvAAgighQghghAAgvIDlAAQgBAvghAhg");
	this.shape_29.setTransform(219.8026,-273.275);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#01FFFF").s().p("AhQAYQgighAAgvIDlAAQgBAvggAhQgiAhgwAAQgvAAghghg");
	this.shape_30.setTransform(219.8,-273.275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_30},{t:this.shape_29}]}).wait(1));

	// Layer_65
	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f().s("#000000").ss(1,0,0,3).p("ABRBRQghAigwAAQgvAAgigiQghghAAgwQAAgvAhgiQAighAvAAQAwAAAhAhQAiAiAAAvQAAAwgiAhg");
	this.shape_31.setTransform(219.8,-235.5);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#01FFFF").s().p("AhQBRQgighAAgwQAAgvAighQAhgiAvAAQAwAAAiAiQAhAhAAAvQAAAwghAhQgiAigwAAQgvAAghgig");
	this.shape_32.setTransform(219.8,-235.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_32},{t:this.shape_31}]}).wait(1));

	// Layer_64
	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f().s("#000000").ss(1,0,0,3).p("ABSBSQgiAhgwAAQgvAAgighQghgiAAgwQAAgvAhghQAigiAvAAQAwAAAiAiQAhAhAAAvQAAAwghAig");
	this.shape_33.setTransform(62.025,-267.6);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#01FFFF").s().p("AhRBRQghghAAgwQAAgvAhgiQAighAvAAQAwAAAiAhQAhAiAAAvQAAAwghAhQgiAigwAAQgvAAgigig");
	this.shape_34.setTransform(62.025,-267.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_34},{t:this.shape_33}]}).wait(1));

	// Layer_63
	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f().s("#000000").ss(1,0,0,3).p("AjajjIGRAAQgqBZAABuQAACTBLBsImyABIgHAA");
	this.shape_35.setTransform(162.5776,-567.65);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#C0C0C0").s().p("AjZjjIGRAAQgqBZAABuQAACTBMBsImzABg");
	this.shape_36.setTransform(162.45,-567.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_36},{t:this.shape_35}]}).wait(1));

	// Layer_62
	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f().s("#000000").ss(1,0,0,3).p("ADajjImRAAQAqBZAABuQAACThKBsIGxABIAIAA");
	this.shape_37.setTransform(119.2242,-567.65);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#C0C0C0").s().p("AjYDjQBKhsAAiTQAAhugqhZIGRAAIAAHHg");
	this.shape_38.setTransform(119.325,-567.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_38},{t:this.shape_37}]}).wait(1));

	// Layer_61
	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f().s("#000000").ss(1,0,0,3).p("AjkT5IG7AAQhbhAAAkZIAA8tQAAkjBgg5IAAgOInAgB");
	this.shape_39.setTransform(163.9225,-397.225);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#C0C0C0").s().p("AjfT5MgABgnxIHBABIAAAOQhgA5AAEjIAActQAAEZBaBAg");
	this.shape_40.setTransform(163.475,-397.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_40},{t:this.shape_39}]}).wait(1));

	// Layer_60
	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f().s("#000000").ss(1,0,0,3).p("ADlT5Im7AAQBahAAAkZIAA8uQAAkihgg6IAAgOIHBAA");
	this.shape_41.setTransform(118.278,-397.2);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#C0C0C0").s().p("AjaT5QBahAAAkZIAA8uQAAkihgg6IAAgNIHBgBMAAAAnxg");
	this.shape_42.setTransform(118.7,-397.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_42},{t:this.shape_41}]}).wait(1));

	// Layer_59
	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f().s("#000000").ss(1,0,0,3).p("AJ26tMAAAA1bIzrAAMAAAg1bg");
	this.shape_43.setTransform(141,-70.9);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#C0C0C0").s().p("Ap1auMAAAg1bITrAAMAAAA1bg");
	this.shape_44.setTransform(141,-70.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_44},{t:this.shape_43}]}).wait(1));

	// Layer_58
	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f().s("#000000").ss(1,0,0,3).p("AAAhXIAACv");
	this.shape_45.setTransform(268.2,439);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f().s("#000000").ss(1,0,0,3).p("AF4MwMAAAgknQAxkZDrinI0aAAQDrCnAwEZMAAAAknIAAAQAF4MwIAAAQAz8XgMAn3AAAQguCWhyB4QjADKkQAAI0XAAQkQAAjAjKQhxh4gviVIAAgBIAAiwIHMAAIZuAAIG9AAAswUwQF+iyBHlOAF4MwQBHFOF/Cy");
	this.shape_46.setTransform(140.6896,297.375);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#C0C0C0").s().p("AqLe4QkQAAjAjKQhxh4gviVIAAgBMAn3AAAQguCWhyB4QjBDKkQAAgAz7XgIAAiwIHMAAQF+iyBHlOIAAAQIAAgQMAAAgknQgwkZjrinIUaAAQjrCngxEZMAAAAknIAAAQIAAgQQBHFOF+CyI5tAAIZtAAIG+AAIAACwg");
	this.shape_47.setTransform(140.6,297.375);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_47},{t:this.shape_46},{t:this.shape_45}]}).wait(1));

	// Layer_57
	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f().s("#000000").ss(1,0,0,3).p("AnBhmIODAAIAADNIuDAAg");
	this.shape_48.setTransform(141,-534.65);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#C0C0C0").s().p("AnBBnIAAjNIODAAIAADNg");
	this.shape_49.setTransform(141,-534.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_49},{t:this.shape_48}]}).wait(1));

	// Layer_56
	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f().s("#000000").ss(1,0,0,3).p("AANiLIG1AAIAACvIAABoIm1AAInOAAIAAhoIHOAAIAABoAANiLIAACvIG1AAAnBAkIAAivIHOAA");
	this.shape_50.setTransform(141,-256);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#C0C0C0").s().p("AANCMIAAhoIAAivIG1AAIAACvIm1AAIG1AAIAABogAnBCMIAAhoIHOAAIAABogAHCAkgAnBAkIAAivIHOAAIAACvg");
	this.shape_51.setTransform(141,-256);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_51},{t:this.shape_50}]}).wait(1));

	// Layer_55
	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f().s("#000000").ss(1,0,0,3).p("AFUCqIqnAAIAAlTIKnAAg");
	this.shape_52.setTransform(143.4,512.3);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#C0C0C0").s().p("AlTCqIAAlTIKnAAIAAFTg");
	this.shape_53.setTransform(143.4,512.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_53},{t:this.shape_52}]}).wait(1));

	// Layer_54
	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f().s("#000000").ss(1,0,0,3).p("AHqCqIvTAAIAAlTIPTAAg");
	this.shape_54.setTransform(143.4,512.3);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#C0C0C0").s().p("AnpCqIAAlTIPTAAIAAFTg");
	this.shape_55.setTransform(143.4,512.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_55},{t:this.shape_54}]}).wait(1));

	// Layer_53
	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f().s("#000000").ss(1,0,0,3).p("AAGpsIACAAIFvKfIAFAAIAAKgIkIAAIAABbIhwCXIkXAAIhoiMIAA79IGBAAg");
	this.shape_56.setTransform(291.3,353.15);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#00FF01").s().p("AkSPFIhpiMIAA79IGBAAIAAFXIACAAIFvKfIAFAAIAAKhIkIAAIAABbIhwCXg");
	this.shape_57.setTransform(291.3,353.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_57},{t:this.shape_56}]}).wait(1));

	// Layer_52
	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f().s("#000000").ss(1,0,0,3).p("AgFpsIgCAAIlwKfIgEAAIAAKgIEHAAIAABbIBxCXIEXAAIBoiMIAA79ImBAAg");
	this.shape_58.setTransform(-7.95,353.15);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#00FF01").s().p("AgDPFIhxiXIAAhbIkHAAIAAqhIAEAAIFwqfIABAAIAAlXIGCAAIAAb9IhoCMg");
	this.shape_59.setTransform(-7.95,353.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_59},{t:this.shape_58}]}).wait(1));

	// Layer_51
	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f().s("#000000").ss(1,0,0,3).p("AHSkzIkeg8IAAjiIpDAAIAAD6IhCAAIAAC4IBCAAIAAAlQCGCCB/C3QCSDRBQDBIDLAAIAAh4ICvAAg");
	this.shape_60.setTransform(343.9,-542.65);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FF00FF").s().p("ABYJRQhQjBiSjRQiAi3iGiCIAAglIhBAAIAAi3IBBAAIAAj7IJEAAIAADiIEeA9IAAMMIivAAIAAB3g");
	this.shape_61.setTransform(343.9,-542.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_61},{t:this.shape_60}]}).wait(1));

	// Layer_50
	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f().s("#000000").ss(1,0,0,3).p("AnRkzIEeg8IAAjhIJDAAIAAD6IBCAAIAAC3IhCAAIAAAlQiGCCh/C3QiSDRhQDBIjKAAIAAh4IiwAAg");
	this.shape_62.setTransform(-61.175,-542.625);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FF00FF").s().p("AkhJRIAAh4IiwAAIAAsMIEeg8IAAjhIJDAAIAAD6IBCAAIAAC3IhCAAIAAAlQiGCCh/C3QiSDRhQDBg");
	this.shape_63.setTransform(-61.175,-542.625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_63},{t:this.shape_62}]}).wait(1));

	// Layer_49
	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f().s("#000000").ss(1,0,0,3).p("AlxjnIAAHPQAABsDLAAIFNAAQDLAAAAhsIAAnPQAAhsjLAAIlNAAQjLAAAABsg");
	this.shape_64.setTransform(140.525,-625);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#989933").s().p("AimFUQjLAAAAhsIAAnPQAAhsDLAAIFNAAQDLAAAABsIAAHPQAABsjLAAg");
	this.shape_65.setTransform(140.525,-625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_65},{t:this.shape_64}]}).wait(1));

	// Layer_48
	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f().s("#000000").ss(1,0,0,3).p("Ai9jnIAAHPQAABsBoAAICrAAQBoAAAAhsIAAnPQAAhshoAAIirAAQhoAAAABsg");
	this.shape_66.setTransform(197.5,-625);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#989933").s().p("AhVFUQhoAAAAhsIAAnPQAAhsBoAAICqAAQBpAAAABsIAAHPQAABshpAAg");
	this.shape_67.setTransform(197.5,-625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_67},{t:this.shape_66}]}).wait(1));

	// Layer_47
	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f().s("#000000").ss(1,0,0,3).p("Ai9jnIAAHPQAABsBpAAICpAAQBpAAAAhsIAAnPQAAhshpAAIipAAQhpAAAABsg");
	this.shape_68.setTransform(83.5,-625);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#989933").s().p("AhUFUQhpAAAAhsIAAnPQAAhsBpAAICqAAQBoAAAABsIAAHPQAABshoAAg");
	this.shape_69.setTransform(83.5,-625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_69},{t:this.shape_68}]}).wait(1));

	// Layer_46
	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f().s("#000000").ss(1,0,0,3).p("AqEhtIUJAAIAADbI0JAAg");
	this.shape_70.setTransform(141,-671);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#989933").s().p("AqEBuIAAjbIUJAAIAADbg");
	this.shape_71.setTransform(141,-671);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_71},{t:this.shape_70}]}).wait(1));

	// Layer_45
	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f().s("#000000").ss(1,0,0,3).p("AmPhyIMfAAIAADlIsfAAg");
	this.shape_72.setTransform(141,-694.5);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#C0C0C0").s().p("AmPBzIAAjlIMfAAIAADlg");
	this.shape_73.setTransform(141,-694.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_73},{t:this.shape_72}]}).wait(1));

	// Layer_44
	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f().s("#000000").ss(1,0,0,3).p("Am3gsIAABZQAABQBQAAILPAAQBQAAAAhQIAAhZQAAhQhQAAIrPAAQhQAAAABQg");
	this.shape_74.setTransform(141,-695.5);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#C0C0C0").s().p("AlnB9QhQAAAAhPIAAhaQAAhQBQAAILPAAQBQAAAABQIAABaQAABPhQAAg");
	this.shape_75.setTransform(141,-695.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_75},{t:this.shape_74}]}).wait(1));

	// Layer_43
	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f().s("#000000").ss(1,0,0,3).p("AFeqiIAAVFIq7AAIAA1Fg");
	this.shape_76.setTransform(48.65,-860.3);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#008001").s().p("AldKjIAA1FIK7AAIAAVFg");
	this.shape_77.setTransform(48.65,-860.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_77},{t:this.shape_76}]}).wait(1));

	// Layer_42
	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f().s("#000000").ss(1,0,0,3).p("ALAFXIBWAAIAAuJIDcAAIAAOKQATAGAOAZQASAgABAuQgBAtgSAhQgOAZgTAFIgKACMggNAAAIAAjcIAUAAg");
	this.shape_78.setTransform(51.025,-791.525);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFFFF").s().p("AwlIzIAAjcIAUAAIAAAAIbRAAIAAAAI7RAAIbRAAIBWAAIAAuJIDcAAIAAOKQATAGAOAZQASAgABAuQgBAtgSAhQgOAZgTAFIgKACg");
	this.shape_79.setTransform(51.025,-791.525);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_79},{t:this.shape_78}]}).wait(1));

	// Layer_41
	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f().s("#000000").ss(1,0,0,3).p("ACokNIlPAAQhmAAAABmIAAG1IIbAAIAAm1QAAhmhmAAg");
	this.shape_80.setTransform(141.05,-821.3);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FF9833").s().p("AkNEOIAAm1QAAhmBmAAIFPAAQBmAAAABmIAAG1g");
	this.shape_81.setTransform(141.05,-821.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_81},{t:this.shape_80}]}).wait(1));

	// Layer_40
	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f().s("#000000").ss(1,0,0,3).p("ABVg9IAAB7IifAAQAMgDAJgPQAKgSAAgaQAAgYgKgSQgJgRgNgC");
	this.shape_82.setTransform(-58.739,-856.025);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFFFFF").s().p("AhPA+QANgDAJgPQAKgSAAgaQAAgYgKgSQgKgRgNgCIChAAIAAB7g");
	this.shape_83.setTransform(-58.275,-856.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_83},{t:this.shape_82}]}).wait(1));

	// Layer_39
	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f().s("#000000").ss(1,0,0,3).p("Ag+A9IAAAAQgPAAgKgRQgKgSAAgaQAAgYAKgTQAKgRAPAAICgAAIAAB5");
	this.shape_84.setTransform(-60,-868.35);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFFFFF").s().p("Ag9A9IgBAAQgPAAgKgSQgKgRAAgaQAAgYAKgTQAKgRAPgBICgAAIAAB6g");
	this.shape_85.setTransform(-60,-868.35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_85},{t:this.shape_84}]}).wait(1));

	// Layer_38
	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f().s("#000000").ss(1,0,0,3).p("ADQiCIAAEFImfAAIAAkFg");
	this.shape_86.setTransform(-29.375,-862.175);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FFFFFF").s().p("AjPCDIAAkFIGfAAIAAEFg");
	this.shape_87.setTransform(-29.375,-862.175);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_87},{t:this.shape_86}]}).wait(1));

	// Layer_37
	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f().s("#000000").ss(1,0,0,3).p("ADQAJIAAgRQAAgcgRgUQgRgUgYAAIkrAAQgYAAgRAUQgRAUAAAcIAAARQAAAcARAUQARAUAYAAIErAAQAYAAARgUQARgUAAgcg");
	this.shape_88.setTransform(-29.4,-841.35);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFFFFF").s().p("AiVBNQgYAAgRgUQgRgUAAgcIAAgRQAAgcARgUQARgUAYAAIErAAQAYAAARAUQARAUAAAcIAAARQAAAcgRAUQgRAUgYAAg");
	this.shape_89.setTransform(-29.4,-841.35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_89},{t:this.shape_88}]}).wait(1));

	// Layer_36
	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f().s("#000000").ss(1,0,0,3).p("ADQAJIAAgRQAAgcgRgUQgRgUgYAAIkrAAQgYAAgRAUQgRAUAAAcIAAARQAAAcARAUQARAUAYAAIErAAQAYAAARgUQARgUAAgcg");
	this.shape_90.setTransform(-29.4,-882.95);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FFFFFF").s().p("AiVBNQgYAAgRgUQgRgUAAgcIAAgRQAAgcARgUQARgUAYAAIErAAQAYAAARAUQARAUAAAcIAAARQAAAcgRAUQgRAUgYAAg");
	this.shape_91.setTransform(-29.4,-882.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_91},{t:this.shape_90}]}).wait(1));

	// Layer_35
	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f().s("#000000").ss(1,0,0,3).p("AAAC2IgpAaIAAmfIApAZIAqAAIAAFtIgqAAIAAgBIAAls");
	this.shape_92.setTransform(-6.825,-862.7205);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FFFFFF").s().p("AgpjPIApAZIAAFsIgpAagAAAC3IAAgBIAAlsIAqAAIAAFtgAAAi2g");
	this.shape_93.setTransform(-6.825,-862.725);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_93},{t:this.shape_92}]}).wait(1));

	// Layer_34
	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f().s("#000000").ss(1,0,0,3).p("Ag5AdQAAAeARAUQARAWAXAAIAAAAQAYAAARgWQARgUAAgeIAAg6QAAgdgRgVQgRgUgYAAIAAAAQgXAAgRAUQgRAVAAAdg");
	this.shape_94.setTransform(3.225,-862.7);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#FFFFFF").s().p("AAABkQgXABgRgWQgRgUAAgeIAAg6QAAgeARgUQARgVAXABIAAAAQAYgBARAVQARAUAAAeIAAA6QAAAegRAUQgRAWgYgBg");
	this.shape_95.setTransform(3.225,-862.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_95},{t:this.shape_94}]}).wait(1));

	// Layer_33
	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f().s("#000000").ss(1,0,0,3).p("AAAhBQgXgBgRAOQgRAOAAAUIAAAmQAAATARAOQARAOAXAAIAAAAQAYAAARgOQARgOAAgTIAAgmQAAgUgRgOQgRgOgYABg");
	this.shape_96.setTransform(3.175,-845.4009);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#FFFFFF").s().p("AAABDQgXAAgRgOQgRgOAAgTIAAgmQAAgUARgOQARgOAXABIAAAAQAYgBARAOQARAOAAAUIAAAmQAAATgRAOQgRAOgYAAg");
	this.shape_97.setTransform(3.175,-845.4009);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_97},{t:this.shape_96}]}).wait(1));

	// Layer_32
	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f().s("#000000").ss(1,0,0,3).p("AAAhBQgXgBgRAOQgRANAAAUIAAAmQAAAUARANQARAOAXABIAAAAQAYgBARgOQARgNAAgUIAAgmQAAgUgRgNQgRgOgYABg");
	this.shape_98.setTransform(3.175,-879.9509);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#FFFFFF").s().p("AAABDQgXgBgRgOQgRgNAAgUIAAgmQAAgUARgNQARgOAXABIAAAAQAYgBARAOQARANAAAUIAAAmQAAAUgRANQgRAOgYABg");
	this.shape_99.setTransform(3.175,-879.9509);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_99},{t:this.shape_98}]}).wait(1));

	// Layer_31
	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f().s("#000000").ss(1,0,0,3).p("AAZjMIAAGZIgxAAIAAmZg");
	this.shape_100.setTransform(11.45,-862.7);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#FFFFFF").s().p("AgYDNIAAmZIAxAAIAAGZg");
	this.shape_101.setTransform(11.45,-862.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_101},{t:this.shape_100}]}).wait(1));

	// Layer_30
	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f().s("#000000").ss(1,0,0,3).p("AknBQIJPAAQAgAAAYgYQAXgXAAghIAAgDQgBgfgWgWQgYgXggAAIpPAAQggAAgYAXQgWAWgBAfIAAADQAAAhAXAXQAYAYAgAAg");
	this.shape_102.setTransform(256.4995,-866.3);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#FFFFFF").s().p("AknBQQggAAgYgYQgXgXAAghIAAgCQABggAWgVQAYgYAgAAIJPAAQAgAAAYAYQAWAVABAgIAAACQAAAhgXAXQgYAYggAAg");
	this.shape_103.setTransform(256.4995,-866.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_103},{t:this.shape_102}]}).wait(1));

	// Layer_29
	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f().s("#000000").ss(1,0,0,3).p("AldjkIAAHIQAAAqBFAeQBFAeBjAAIDhAAQBiAABFgeQBGgeAAgqIAAnIQAAgqhGgeQhFgdhiAAIjhAAQhjAAhFAdQhFAeAAAqg");
	this.shape_104.setTransform(255.2,-825.3);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#FFFFFF").s().p("AhvFKQhkAAhFgeQhFgeAAgpIAAnJQAAgqBFgeQBFgdBkAAIDgAAQBiAABFAdQBGAeAAAqIAAHJQAAAphGAeQhFAehiAAg");
	this.shape_105.setTransform(255.2,-825.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_105},{t:this.shape_104}]}).wait(1));

	// Layer_28
	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f().s("#000000").ss(1,0,0,3).p("ACAksQgggdgtAAIhmAAQgtAAggAdQgfAeAAAqIAAHIQAAAqAfAeQAgAeAtAAIBmAAQAtAAAggeQAggeAAgqIAAnIQAAgqgggeg");
	this.shape_106.setTransform(306.3,-825.3);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#FFFFFF").s().p("AgzFKQgtAAgfgeQgggeAAgpIAAnJQAAgqAggeQAfgdAtAAIBnAAQAsAAAgAdQAgAeAAAqIAAHJQAAApggAeQggAegsAAg");
	this.shape_107.setTransform(306.3,-825.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_107},{t:this.shape_106}]}).wait(1));

	// Layer_27
	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f().s("#000000").ss(1,0,0,3).p("ABthPIAACfIjPAAQAQgEALgTQAOgXAAgiQAAgggOgXQgMgWgRgC");
	this.shape_108.setTransform(-202.089,-737.9);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#FFFFFF").s().p("AhnBQQARgDALgUQANgXAAghQAAghgNgYQgMgVgRgCIDRAAIAACfg");
	this.shape_109.setTransform(-201.65,-737.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_109},{t:this.shape_108}]}).wait(1));

	// Layer_26
	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f().s("#000000").ss(1,0,0,3).p("AhQBQIgCAAQgSgBgNgXQgOgXAAghQAAghAOgWQANgYASAAIDSAAIAACf");
	this.shape_110.setTransform(-203.9,-753.9);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#FFFFFF").s().p("AhQBQIgBAAQgTgBgNgXQgNgXAAghQAAghANgWQANgXATgBIDQAAIAACfg");
	this.shape_111.setTransform(-203.9,-753.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_111},{t:this.shape_110}]}).wait(1));

	// Layer_25
	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f().s("#000000").ss(1,0,0,3).p("AEOipIAAFTIobAAIAAlTg");
	this.shape_112.setTransform(-164.15,-746);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#FFFFFF").s().p("AkNCqIAAlTIIbAAIAAFTg");
	this.shape_113.setTransform(-164.15,-746);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_113},{t:this.shape_112}]}).wait(1));

	// Layer_24
	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f().s("#000000").ss(1,0,0,3).p("AEOAMIAAgWQAAglgWgaQgWgagfAAImFAAQgfAAgWAaQgWAaAAAlIAAAWQAAAkAWAaQAWAaAfAAIGFAAQAfAAAWgaQAWgaAAgkg");
	this.shape_114.setTransform(-164.15,-718.95);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#FFFFFF").s().p("AjCBkQgfAAgWgaQgWgaAAglIAAgVQAAglAWgaQAWgaAfAAIGFAAQAfAAAWAaQAWAaAAAlIAAAVQAAAlgWAaQgWAagfAAg");
	this.shape_115.setTransform(-164.15,-718.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_115},{t:this.shape_114}]}).wait(1));

	// Layer_23
	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f().s("#000000").ss(1,0,0,3).p("AEOALIAAgVQAAglgWgaQgWgagfAAImFAAQgfAAgWAaQgWAaAAAlIAAAVQAAAlAWAaQAWAaAfAAIGFAAQAfAAAWgaQAWgaAAglg");
	this.shape_116.setTransform(-164.15,-773);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#FFFFFF").s().p("AjCBkQgfAAgWgaQgWgaAAgkIAAgXQAAgkAWgaQAWgaAfAAIGFAAQAfAAAWAaQAWAaAAAkIAAAXQAAAkgWAaQgWAagfAAg");
	this.shape_117.setTransform(-164.15,-773);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_117},{t:this.shape_116}]}).wait(1));

	// Layer_22
	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f().s("#000000").ss(1,0,0,3).p("AAADtIg2AhIAAobIA2AhIA3AAIAAHaIg3AAIAAgBIAAnZ");
	this.shape_118.setTransform(-134.85,-746.675);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#FFFFFF").s().p("Ag2kNIA2AhIAAHZIg2AhgAAADuIAAgBIAAnZIA3AAIAAHagAAAjsg");
	this.shape_119.setTransform(-134.85,-746.675);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_119},{t:this.shape_118}]}).wait(1));

	// Layer_21
	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f().s("#000000").ss(1,0,0,3).p("AhKAmQAAAmAWAbQAWAbAeAAIABAAQAfAAAVgbQAWgbAAgmIAAhMQAAgmgWgbQgVgbgfAAIgBAAQgeAAgWAbQgWAbAAAmg");
	this.shape_120.setTransform(-121.8,-746.6);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#FFFFFF").s().p("AAACCQgeAAgXgbQgVgaAAgnIAAhLQAAgnAVgbQAXgbAeAAIAAAAQAgAAAVAbQAWAbAAAnIAABLQAAAngWAaQgVAbggAAg");
	this.shape_121.setTransform(-121.8,-746.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_121},{t:this.shape_120}]}).wait(1));

	// Layer_20
	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f().s("#000000").ss(1,0,0,3).p("AAAhVQgfgBgWASQgVASAAAaIAAAxQAAAaAVARQAWASAfABIAAAAQAfgBAWgSQAWgRAAgaIAAgxQAAgagWgSQgWgSgfABg");
	this.shape_122.setTransform(-121.85,-724.1007);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#FFFFFF").s().p("AAABXQgfgBgVgSQgWgRAAgaIAAgxQAAgaAWgSQAVgSAfABIABAAQAegBAWASQAWASAAAaIAAAxQAAAagWARQgWASgeABg");
	this.shape_123.setTransform(-121.85,-724.1007);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_123},{t:this.shape_122}]}).wait(1));

	// Layer_19
	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f().s("#000000").ss(1,0,0,3).p("AAAhVQgfgBgWASQgVASAAAaIAAAxQAAAaAVARQAWASAfABIAAAAQAfgBAWgSQAWgRAAgaIAAgxQAAgagWgSQgWgSgfABg");
	this.shape_124.setTransform(-121.85,-769.0007);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#FFFFFF").s().p("AAABXQgfgBgVgSQgWgRAAgaIAAgxQAAgaAWgSQAVgSAfABIABAAQAegBAWASQAWASAAAaIAAAxQAAAagWARQgWASgeABg");
	this.shape_125.setTransform(-121.85,-769.0007);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_125},{t:this.shape_124}]}).wait(1));

	// Layer_18
	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f().s("#000000").ss(1,0,0,3).p("AAhkJIAAITIhBAAIAAoTg");
	this.shape_126.setTransform(-111.1,-746.575);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#FFFFFF").s().p("AggEKIAAoTIBBAAIAAITg");
	this.shape_127.setTransform(-111.1,-746.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_127},{t:this.shape_126}]}).wait(1));

	// Layer_17
	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f().s("#000000").ss(1,0,0,3).p("ABwjHIBpAAIAuBaIAADaIguBbIhpAAIiBAAIj1AAIAAmPID1AAIAAGPADZjHIAAGPABwjHIAAGPAgRjHICBAA");
	this.shape_128.setTransform(-81.475,-746.2);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#FFFFFF").s().p("ADZDIgABwDIIAAmPIBpAAIAuBaIAADaIguBbIAAmPIAAGPgAgRDIIAAmPICBAAIAAGPgAkGDIIAAmPID1AAIAAGPgAgRjHg");
	this.shape_129.setTransform(-81.475,-746.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_129},{t:this.shape_128}]}).wait(1));

	// Layer_16
	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f().s("#000000").ss(1,0,0,3).p("ACjCWIAAkrQAAhyhkAAIh9AAQhkAAAAByIAAErQAAByBkAAIB9AAQBkAAAAhyg");
	this.shape_130.setTransform(6.675,-818.225);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#FFFFFF").s().p("Ag+EIQhkAAAAhyIAAkrQAAhyBkAAIB9AAQBkAAAAByIAAErQAAByhkAAg");
	this.shape_131.setTransform(6.675,-818.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_131},{t:this.shape_130}]}).wait(1));

	// Layer_15
	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f().s("#000000").ss(1,0,0,3).p("ACjCCIAAkDQAAhkhkAAIh9AAQhkAAAABkIAAEDQAABkBkAAIB9AAQBkAAAAhkg");
	this.shape_132.setTransform(-25.875,-814.775);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#FFFFFF").s().p("Ag+DmQhkAAAAhkIAAkDQAAhkBkAAIB9AAQBkAAAABkIAAEDQAABkhkAAg");
	this.shape_133.setTransform(-25.875,-814.775);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_133},{t:this.shape_132}]}).wait(1));

	// Layer_14
	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f().s("#000000").ss(1,0,0,3).p("AqnqJIAAgyIVPAAIAAV3I1PAA");
	this.shape_134.setTransform(151.65,-862.8);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#008001").s().p("AqnK8IAA1FIAAgyIVPAAIAAV3g");
	this.shape_135.setTransform(151.65,-862.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_135},{t:this.shape_134}]}).wait(1));

	// Layer_13
	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f().s("#000000").ss(1,0,0,3).p("ALHixI2NAAQhQAAAABPIAAPCQAAAPADALI1cAAIAACCIlKAAIAA/3MBNzAAAIAAf3IlKAAIAAiCI1cAAIADgaIAAvCQAAhPhQAAg");
	this.shape_136.setTransform(143.2,-690.75);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#0100FE").s().p("EAhwAP8IAAiCI1cAAIADgbIAAvBQAAhPhQABI2NAAQhQgBAABPIAAPBQAAAQADALI1cAAIAACCIlKAAIAA/3MBNzAAAIAAf3g");
	this.shape_137.setTransform(143.2,-690.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_137},{t:this.shape_136}]}).wait(1));

	// Layer_12
	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f().s("#000000").ss(1,0,0,3).p("AtyHYMAjFgJkIDrhAA49DHMAlZgKe");
	this.shape_138.setTransform(278.2233,762.2255);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f().s("#000000").ss(1,0,0,3).p("EgnegSHIAAxIMAyhAAAIAAINIAAAGMAKJAkDQDJE6ELAHAJpyRIgJAKIAGAAIADgKQBUj8AGizIAAh8EgUTAjQIBDwBIh3l1IgCgEQDPqRNQjOAJgyHQk0FQifFQIgMAOIFKSXAkigLIgBgFIgHAHIAIgCIAGgBAgyNLIjwtWACBnZImkHJEAgLANIQDhhTD5idEgUTAjVIAAgFQFZogIVjDA1JNWIyV/dMAw+AAA");
	this.shape_139.setTransform(232.1235,657.7276);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_139},{t:this.shape_138}]}).wait(1));

	// Layer_11
	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f().s("#000000").ss(1,0,0,3).p("AXZd3IAAATA3dGZMAhsAAAQitIEC4HbAQEE1Qh7JcCCIjEgGnAxFIeAAAIAAy7Qler5C5twQA5kRBskaMAAAgs/");
	this.shape_140.setTransform(184.525,114.275);

	this.timeline.addTween(cjs.Tween.get(this.shape_140).wait(1));

	// Layer_10
	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f().s("#000000").ss(1,0,0,3).p("AhzGZQCrIEi2HbAu+d3IAAATQHLvlnLyvMAAAgs/Au+eKIAAS7IeCAAAnoE1QB6JciBIj");
	this.shape_141.setTransform(45.9,114.275);

	this.timeline.addTween(cjs.Tween.get(this.shape_141).wait(1));

	// Layer_9
	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f().s("#000000").ss(1,0,0,3).p("AF+F9QifCejfABQjfgBieieQieieAAjfQAAjfCeieQCeieDfAAQDfAACfCeQCeCeAADfQAADfieCeg");
	this.shape_142.setTransform(141.4,201.1);

	this.timeline.addTween(cjs.Tween.get(this.shape_142).wait(1));

	// Layer_8
	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f().s("#000000").ss(1,0,0,3).p("AO6ATIksAAIAAoRIEsAAgAqjAxIVnAAIAADwI1nAAgApxATIksAAIAAoRIEsAAgARMH/MgiXAAA");
	this.shape_143.setTransform(139.4,95.175);

	this.timeline.addTween(cjs.Tween.get(this.shape_143).wait(1));

	// Layer_7
	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f().s("#000000").ss(1,0,0,3).p("ABahZIAACzIizAAIAAizg");
	this.shape_144.setTransform(351.5,-452.75);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#000000").s().p("AhZBaIAAizICzAAIAACzg");
	this.shape_145.setTransform(351.5,-452.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_145},{t:this.shape_144}]}).wait(1));

	// Layer_6
	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f().s("#000000").ss(1,0,0,3).p("Ag7hjIAADHIB3AAIAAjHg");
	this.shape_146.setTransform(257.9,-304.1);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#000000").s().p("Ag7BkIAAjHIB3AAIAADHg");
	this.shape_147.setTransform(257.9,-304.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_147},{t:this.shape_146}]}).wait(1));

	// Layer_5
	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f().s("#000000").ss(1,0,0,3).p("Ag7hjIAADHIB3AAIAAjHg");
	this.shape_148.setTransform(257.9,-335.1);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#000000").s().p("Ag7BkIAAjHIB3AAIAADHg");
	this.shape_149.setTransform(257.9,-335.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_149},{t:this.shape_148}]}).wait(1));

	// Layer_4
	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f().s("#000000").ss(1,0,0,3).p("AhXhXIAACvICvAAIAAivg");
	this.shape_150.setTransform(290.2,-568.15);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#000000").s().p("AhXBXIAAiuICvAAIAACug");
	this.shape_151.setTransform(290.2,-568.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_151},{t:this.shape_150}]}).wait(1));

	// Layer_3
	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f().s("#000000").ss(1,0,0,3).p("ADVAAImpAA");
	this.shape_152.setTransform(229.65,-279);

	this.timeline.addTween(cjs.Tween.get(this.shape_152).wait(1));

	// Layer_2
	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f().s("#000000").ss(1,0,0,3).p("AqPVnIAAFLIgEAPQgGAJgHAAIi9AAQgHAAgFgJIgEgIIgBgCMAAAg2AIPtAAIByByIAANfQgLAMgFANIgVAUQgYAeAAAqQAAArAYAeQAQAUAUAHQAKAKALAGIAEADQAVAMAZACIABAAIAAABICtAAIAAgBIGKAAIAAFHIjqCqIiOAAIAAgCQAAgbghgSQgjgUgvABIlzAAQgugBghAUQgjASAAAbIAAACIgCAAIAAUMIiBBo");
	this.shape_153.setTransform(273.9,-417.25);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#993400").s().p("AtdbJQgIAAgEgJIgFgHIAAgDMAAAg1/IPtAAIByByIAANgQgLALgFANIgWAUQgXAeAAArQAAAqAXAeQARAUATAHQAKAJAMAIIAEACQAUAMAaADIAAAAIAAAAICuAAIAAAAIGKAAIAAFGIjrCqIiNAAIAAgCQAAgbghgSQgjgUgvABIlzAAQgugBghAUQgjASAAAbIAAACIgCAAIAAUMIiBBnImrAAIAAFMIgFAOQgFAJgHAAg");
	this.shape_154.setTransform(273.9,-417.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_154},{t:this.shape_153}]}).wait(1));

	// Layer_1
	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f().s("#000000").ss(1,0,0,3).p("AAAnEIAAAAAAAHFIAAAA");
	this.shape_155.setTransform(152.025,-802.525);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#FFFFFF").s().p("AAAHFIAAuJIAAAAIAAOJg");
	this.shape_156.setTransform(152.025,-802.525);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_156},{t:this.shape_155}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-217.6,-967,704.1,1905.5);


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
	var sprImg_shape = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_sale_atlas_1"],54);
	sprImg_shape.onload = function(){
		this.shape.graphics.bf(sprImg_shape, null, new cjs.Matrix2D(0.734,0,0,0.734,-197.8,-45.1)).s().p("A+5HEIAAuHMA9zAAAIAAOHg")
	}.bind(this);
	this.shape.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-197.8,-45.1,395.70000000000005,90.30000000000001);


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
	var sprImg_shape = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_sale_atlas_1"],53);
	sprImg_shape.onload = function(){
		this.shape.graphics.bf(sprImg_shape, null, new cjs.Matrix2D(1,0,0,1,-246.5,-185)).s().p("EgmgAc6MAAAg5zMBNBAAAMAAAA5zg")
	}.bind(this);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-246.5,-185,493,370);


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

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AF0hZIrnAAIAACzILnAAg");
	this.shape.setTransform(162.825,146.3);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AlzBaIAAizILnAAIAACzg");
	this.shape_1.setTransform(162.825,146.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	var sprImg_shape_2 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_sale_atlas_1"],52);
	sprImg_shape_2.onload = function(){
		this.shape_2.graphics.bf(sprImg_shape_2, null, new cjs.Matrix2D(1,0,0,1,-246.5,-185)).s().p("EgmgAc6MAAAg5zMBNBAAAMAAAA5zg")
	}.bind(this);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-246.5,-185,493,370);


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
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("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");
	this.shape.setTransform(0.0006,0.3002);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1,0,0,3).p("AEpmXQASgKAUAGQAYAGANAXIAKAYIAEAMAGCk5IAAACIgKA6IgIAtIABABAEvjlIADgDQAIgHAKABQAKACAGAKQAFAKgBAMQgCAMgIAHQgJAHgKgBIgCgCIgBgBAFWjsIAKhOAEkliQAnACADAnADhjcIgEAAQgKgBgGgIQgGgHACgLQABgKAJgHIAFgDADhjcIABABIACACQAKABAIgHQAJgHACgMQABgNgFgJQgGgKgKgCQgKgBgIAHIgDADIANgDQAKABAHAIQAGAIgCALQgCAKgIAGQgHAGgHAAgAD6ldIgMBFADwjBQgUgQgfAFIgdAIADYi6IAMAXIALAUIhFAVIggAJIjyBJAiehqIEFhKIAxgNAF8heIAAABIACABQAKACAJgHQAIgIACgMQACgMgGgKQgGgJgKgCQgKgCgIAHIgDADIAOgCQAKABAGAIQAGAIgCAKQgBAKgJAHQgGAFgIABIAAAAIgEAAQgLgBgGgIQgGgIACgKQABgLAJgGIAFgEAEvjlIAOgDQAKABAGAIQAGAIgCALQgBAKgJAHQgGAFgIABIgBgBIgDAAQgLgBgGgIQgGgHACgLQABgKAJgHgAGJgYIgFADQgIAHgCAKQgBAKAGAIQAGAHAKABIAEABAGJgYIAOgDQAKABAGAIQAGAIgBAKQgCAKgIAHQgHAFgIABIAAAAIAAAAIADACQAJABAJgHQAIgHACgMQACgMgGgJQgGgKgJgBQgKgCgJAHgAFuBMIADgDQAJgIAKACQAJACAGAKQAGAJgCAMQgCAMgIAIQgJAHgJgCIgDgBIAAgBIgEAAQgKgBgGgIQgGgIABgKQACgKAIgHIAFgDQAHgEAHABQAKABAGAIQAGAIgBAKQgCALgIAGQgHAFgHABIgBAAAEvCJIADgDQAIgHAKACQAKABAGAKQAFAKgCAMQgCAMgIAHQgIAIgKgCIgCgCIgBAAIgDAAQgLgBgGgIQgGgIACgKQABgLAJgHIAFgDIANgCQAKAAAHAIQAGAIgCALQgCAKgIAHQgHAFgHABIgBAAADUCQIADgDQAJgHAKACQAKABAFAKQAGAKgCAMQgCALgGAHADUCQQAHgDAHABQAKAAAGAIQAGAIgBALQgCAJgGAGADHCfQACgHAGgFIAFgDAgcDuIDRheIA8gbAj4k7QARgKAVAGQAYAGAOAXQAJAPAHAVAiZjcIgNBqAi7jeIgGBWAktinIAKhaAk7FaIgCACIgDACIgEABIgDAAIgBAAIgEgBIgGgEQgFgFABgGIAEgKIACgBAj6GGQgEgFgGgBQgGAAgFAEQgFAEAAAGQAAAGAEAFIAHAFIAEAAIAEAAIAHgDQAEgEABgGQAAgHgFgEgAmkBXQgFAAgEAEQgEAEgBAGIAFALIAGAFIAEABAmPDSQgFAEAAAHQAAAGAEAFIAHAEIAEABIAAAAAD4C8IkjCFACmimIksBWADBCbIjeBj");
	this.shape_1.setTransform(-8.5877,-1.6758);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#020305").s().p("AgBAZQgHgNgBgQQAAgRAGgLIAGAJQAHAMAAARQAAAQgFALg");
	this.shape_2.setTransform(-31.1518,-24.925);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#8E9794").s().p("AAtF9QhJgGhBhcQhChdgSh8QgSh7AnhTQASgoAbgUQAdgVAnAEQBIAGBBBcQBBBdATB7QASB8gnBUQgWAughATQgVAMgZAAIgLgBgABCFDQgDAFABAJQACAIAFAHIAIAFIAEABIAEAAIAGgFQADgFgBgJQgCgIgFgHQgGgGgGAAIgCAAQgFAAgDAFgAgIFCQgFAEAAAGQAAAGAEAFIAHAFIADAAIAEAAIAHgDQAEgEABgGQAAgHgFgEQgEgFgGgBIgBAAQgFAAgEAEgAAbE7QAUAAAQgIIABgBQAZgOARgkQAVgqAAg5QAAgbgFggQgPhegyhGQgzhGg4gFIgDAAIgBAAIgEAAIAAAAIAAAAQgYAAgTANIgBAAQgVAPgOAeIgCAFIgEgGQgEgGgGAAQgHgBgEAGQgFAFAAAIQgBAIAEAGIAGAFIAFABIAEAAIADgBIAAAAQgJAhAAAmIAAADIAAgDQAAgmAJghIAAAAIAHgUIACgFIACgFQAOgeAVgPIABAAQATgNAYAAIAAAAIAAAAIAEAAIABAAIADAAQA4AFAzBGQAyBGAPBeQAFAgAAAbQAAA5gVAqQgRAkgZAOIgBABQgQAIgUAAIAAAAIAAAAIgIAAQglgEgigfIgVgWIgPgTQgWgfgQglIgKgbQgLghgGgkIgDgXIgBgfQgFAAgEAEQgEAEgBAGIAFALIAGAFIAEABIADAXQAGAkALAhQgFAEAAAHQAAAGAEAFIAHAEIAEABIAAAAQAQAlAWAfIAPATIgCABIgEAKQgBAGAFAFIAGAEIAEABIABAAIADAAIAEgBIADgCIACgCQAiAfAlAEIAIAAIAAAAIAAAAgACCD6QgGABgDAHQgDAHACAIQABAJAGAFIAIAEIAEAAIAEgBIAFgHQADgHgBgIQgCgIgGgFQgEgFgGAAIgCAAgACOB6QgGABgDAHQgEAIACAJQACAKAGAGIAIAFIAEAAIAEgCIAGgHQADgIgCgJQgCgKgGgFQgEgFgFAAIgDAAgABogSQgEAGAAAJQgBAHAFAHIAGAGIAEABIAEAAIAHgFQAFgGAAgIQAAgJgEgGQgFgHgGAAIgBAAQgGAAgEAFgAAdiMQgFAFAAAJQAAAJAFAGIAHAGIAEABIAEAAIAHgFQAEgGAAgIQgBgJgEgGQgFgHgGAAIgBAAQgFAAgEAFgAiAimQgEAFABAIQAAAHAFAGIAIAGIAEABIAEAAQADgBADgEQAEgFgBgIQgBgIgFgFIgLgHIgCAAQgFAAgDAFgAg4jBQgFAGABAJQAAAIAEAGIAHAGIAEABIAEAAIAHgFQAEgFAAgJQAAgJgFgGQgFgGgGgBIgBAAQgFAAgEAFgAgOjpIgYAAIAKhaIABgLQADgZARgNQAJgJAMAAIAOABQAUAGAMAVQAHAOAFAUQAEAMgBATIgGBWQgpgcgqgDgAAGlFQgGAMAAARQAAARAHANQAHANAKABQAKABAHgMIABgBQAFgMAAgQQAAgRgHgNIgHgJQgFgEgGgBIgBAAQgJAAgGALg");
	this.shape_3.setTransform(-34.8884,4.9007);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#6D6757").s().p("ABYFcIgEgBIgIgGQgGgGgBgJQgCgIAEgGQADgGAGABQAGAAAGAHQAGAGABAJQACAIgEAGIgFAFgAAGFSIgFgBIgFgEQgFgFABgGQAAgHAFgEQADgEAGABQAGAAAFAFQAEAFAAAGQAAAGgFAEIgGAEgACLEZIgIgEQgFgGgCgIQgCgJAEgGQADgHAGgBQAGgBAGAFQAFAFACAJQACAIgDAHIgGAGIgEACgAg8ETIAAAAIgEgBIgHgFQgEgFAAgGIAFgKIABgBIAVAXIgBABIgEADIgDABgAh6ChIgEgBIgGgFQgFgFABgGQAAgGAFgEIAKAbgACYCdIgIgFQgGgGgCgJQgCgKADgHQADgIAHgBQAGgBAGAGQAFAGACAKQACAJgDAIIgFAHIgEABgAibAoIgHgEIgEgLQAAgHAFgEQADgDAFAAIACAegABzAHIgHgGQgEgGAAgJQAAgJAFgGQAEgGAHABQAGAAAEAHQAEAHAAAJQAAAIgEAFIgHAFIgEABgAiXg+IgEgBIgGgGQgFgGABgIQAAgIAFgFQAFgFAGAAQAGABAFAGIAEAFIgDAGIgHATIgDACgAAoh0IgGgFQgFgHAAgIQAAgJAEgGQAEgFAGAAQAHABAEAGQAFAHAAAIQAAAJgEAFIgHAFIgEABgAhuiQIgEgBIgHgFQgFgGgBgIQgBgIAEgFQAEgFAGABIALAGQAFAGABAIQABAIgEAFQgCADgEABgAgsioIgHgGQgFgHAAgIQAAgJAEgFQAFgGAGABQAGAAAFAHQAEAGAAAJQAAAIgEAGIgGAEIgEABgAAdkHQgKgBgHgNQgIgMAAgRQgBgSAHgLQAHgMAKABQAGAAAFAFQgHALABARQAAARAIANIAGAIIgBABQgGALgJAAIgBAAg");
	this.shape_4.setTransform(-35.335,5.9962);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#BBC7BB").s().p("ABgE6QAnhTgSh9QgTh7hBhcQhAhdhJgGQgngDgdAVQAfgeAqgEIAYAAQArAEAoAcIAGhWQABgUgEgMQgFgTgGgOQgMgWgUgFIgOgCQARgJAVAFQAXAGAOAXQAJAQAHAUQAEANgBAVIgNBrIgbgWIAbAWIAIAHIAYAaIAeAoQA3BVAQBrQAHAugCAoIgBARQgEAjgKAfQgHAVgKASQglBFg/AHQAhgSAWgvg");
	this.shape_5.setTransform(-28.7528,3.9992);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#434542").s().p("AiDAQIDehiIAGAEQATAQAVAJIAGADIADABIkjCEQAKgfAEgkg");
	this.shape_6.setTransform(1.6,22.125);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#ADB4AC").s().p("Ah7DWQACgpgHguQgQhrg3hUIDyhJQgHAWAAAZIACAYQAGA/AlAvQAeAoAkAJIg8AbIAMALIjfBjgAh7DWIDShegACiBfIgBAAIgOgCQgkgJgegoQglgvgGg/IgCgYQAAgZAHgWIAggJQgNAcAAAmIABAYQADAfAKAaQALAZAQAWQARAVARANIAUAGIACAAIAAAAIADAAIAAAAIABAAQAbAAASgfIABgBIAAgBIABgCIABgBQAPgeAAgnIgCgZQgFg5gbgrQgbgpgfgEQAfAEAbApQAbArAFA5IACAZQAAAngPAeIgBABIgBACIAAABIgBABQgSAfgbAAIgBAAIAAAAIgDAAIAAAAIgCAAIgUgGQgRgNgRgVQgQgWgLgZQgKgagDgfIgBgYQAAgmANgcIBFgVIgKgUIgMgXIAMAXIAKAUIhFAVIggAJIjyBJIgdgoIErhWIkrBWIgYgaIEEhKIAxgNIAIgDIAegIQAfgFAUAQQgWgCgRAKIAPgBIAGAAQAsAEAlAvQAkAwAHBAQAGA+gaAqQgYAngnAAIgHgBgABHi+QAQgPAUgEQgUAEgQAPg");
	this.shape_7.setTransform(0.865,0.7256);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#979996").s().p("AAmDkIgDAAQgLgBgGgIQgGgIACgKQABgLAJgHIAFgDIANgCQAKAAAHAIQAGAIgCALQgCAKgIAHQgHAFgHABgAhKDKQACgHAGgFIAFgDQAHgDAHABQAKAAAGAIQAGAIgBALQgCAJgGAGQgVgJgTgQgABmCmIgEAAQgKgBgGgIQgGgIABgKQACgKAIgHIAFgDQAHgEAHABQAKABAGAIQAGAIgBAKQgCALgIAGQgHAFgHABgACBBCIgEgBQgKgBgGgHQgGgIABgLQACgKAIgHIAFgDIAOgDQAKABAGAIQAGAIgBALQgCAKgIAHQgHAFgIABgABqgzIgEAAQgLgBgGgIQgGgIACgKQABgLAJgGIAFgEIAOgCQAKABAGAIQAGAIgCAKQgBAKgJAHQgGAFgIABgAAmiLIgDAAQgLgBgGgIQgGgHACgLQABgKAJgHIAFgDIAOgDQAKABAGAIQAGAIgCALQgBAKgJAHQgGAFgIABgAiBiZIgDAAQgLgBgGgIIgEgJIAFgHQAJgOAMgLIACAAQAKABAHAIQAGAIgCAKQgCAKgIAHQgHAFgHABgAgwixIgEAAQgKgBgGgIQgGgHACgLQABgKAJgHIAFgDIANgDQAKABAHAIQAGAIgCALQgCAKgIAGQgHAGgHAAg");
	this.shape_8.setTransform(18.815,-5.975);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#73746F").s().p("AgFDvQgVgCgUgHIgDgBQAHgHACgLIAAgFQAAgJgEgIQgGgKgKgBIgBAAIgDgBIAAAAIgBAAQgGABgGAEIAAAAIAAAAIgBABIAAAAIAAAAIgDADIgFADQgHAFgCAHIgFgEIgMgLIA8gbIAOACIABAAQArAEAagqQAagqgGg/QgHg/gkgwQgkgvgsgEIgGAAIgPABQARgKAWACQAsAEAkAyQAlAxAIBBQACAQAAAPQAAAugTAhIgBABIAAAAQgYAngmAAIAAAAIAAAAIgGAAIgXgGIAXAGIAGAAIAAAAIAAAAQAmAAAYgnIAAAAIABgBQATghAAguQAAgPgCgQQgIhBglgxQgkgygsgEQgUgQgfAFIgeAIIAGgDQAIgIACgMIAAgFQAAgJgEgIQgGgJgKgCIgDAAQAKgJAMgGQAcgPAjACIAGAAQA0AFAtAnIAbAcIABABIAGAIQAYAeAPAiQAYAyAFA6QAJBjgtBCQgZAjgiAPIgBAAQgWAJgaAAIgKAAgAAZDlQAGAAAGgFIABAAIAAAAIABgBQAIgHACgMIAAgGQAAgJgEgHQgGgKgJgBIgBAAIgEgBIAAAAIAAAAQgHABgGAEIgBABIAAAAIgDADIADgDIAAAAIABgBQAGgEAHgBIAAAAIAAAAIAEABIABAAQAJABAGAKQAEAHAAAJIAAAGQgCAMgIAHIgBABIAAAAIgBAAQgGAFgGAAIgBAAIAAAAIgBAAIgCAAIAAAAIgDgCIAAAAQAIgBAHgFQAIgHACgKQABgLgGgIQgGgIgKAAIgOACIgFADQgHAHgCALQgCAKAHAIQAFAIAKABIAEAAIAAAAIADACIAAAAIACAAIABAAIAAAAIABAAgABZCoQAHgBAHgFQAIgIACgMIAAgFQAAgJgEgHQgGgKgKgCIgBAAIgDAAIAAAAIgBAAQgGAAgGAEIAAABIAAAAIgBAAIAAABIAAAAIgDADIgFADQgJAHgBAKQgCAKAGAIQAGAIALABIAEAAIAAABIACABIABABIADAAIAAAAIABAAgABzBDQAHAAAHgFIAAgBQAJgHACgMIAAgFQAAgKgEgHQgGgKgKgBIgCAAIAAAAIgCgBIAAAAIgBAAQgHABgGAEIAAABIAAAAIgDADIgFADQgJAHgBAKQgCALAGAIQAGAHALABIADABIABAAIACACIABAAIABAAIABAAIAAAAIABAAgABcgxQAGgBAGgEIABAAIAAAAIAAgBIABAAIAAAAQAIgIACgMIABgGQAAgJgEgHQgGgJgKgCIgCAAIgBAAIgCAAIAAAAIAAAAQgHAAgGAFIgBAAIgDADIgFAEQgIAGgCALQgBAKAGAIQAGAIAKABIAEAAIAAABIADABIADABIAAAAIABAAgAAYiJQAHAAAGgEIABAAIAAgBIAAAAIABgBQAIgHACgMIAAgFQAAgJgEgIQgGgKgJgCIgBAAIgCAAIgBAAIAAAAIAAAAQgIAAgGAFIAAAAIgBABIAAAAIgDADIgFADQgHAHgCAKQgBALAGAHQAFAIAKABIAEAAIAAABIADACIADAAIAAAAIAAAAgAg+ivQAHAAAHgFIABgBQAIgHACgMIAAgFQAAgKgEgHQgGgKgKgCIgDAAIAAAAIgBAAQgHAAgHAGIAAAAIgDADIgFADQgIAHgCAKQgCALAHAHQAGAIAKABIAEAAIAAABIAAgBQAIAAAHgGQAIgGACgKQABgLgGgIQgGgIgKgBIgOADIADgDIAAAAQAHgGAHAAIABAAIAAAAIADAAQAKACAGAKQAEAHAAAKIAAAFQgCAMgIAHIgBABQgHAFgHAAIgBAAIAAAAIgBAAIgCAAIgCgCIACACIACAAIABAAIAAAAIABAAgAgxDlIgGgDQAHgGABgJQACgLgGgIQgGgIgKAAQgIgBgGADIADgDIAAAAIAAAAIABgBIAAAAIAAAAQAGgEAGgBIABAAIAAAAIADABIABAAQAKABAGAKQAEAIAAAJIAAAFQgCALgHAHgAASDjgABYCoIgDAAIgBgBIgCgBIAAgBQAIgBAGgFQAJgGABgLQACgKgGgIQgHgIgKgBQgHgBgGAEIADgDIAAAAIAAgBIABAAIAAAAIAAgBQAGgEAGAAIABAAIAAAAIADAAIABAAQAKACAGAKQAEAHAAAJIAAAFQgCAMgIAIQgHAFgHABIgBAAIAAAAgABSCmgAByBDIgBAAIgBAAIgBAAIgCgCIAAAAQAHgBAHgFQAJgHABgKQACgLgGgIQgHgIgKgBIgNADIADgDIAAAAIAAgBQAGgEAHgBIABAAIAAAAIACABIAAAAIACAAQAKABAGAKQAEAHAAAKIAAAFQgCAMgJAHIAAABQgHAFgHAAIgBAAIAAAAgABjARgABbgxIgDgBIgDgBIABgBQAHgBAHgFQAIgHACgKQABgKgGgIQgGgIgKgBIgOACIADgDIABAAQAGgFAHAAIAAAAIAAAAIACAAIABAAIACAAQAKACAGAJQAEAHAAAJIgBAGQgCAMgIAIIAAAAIgBAAIAAABIAAAAIgBAAQgGAEgGABIgBAAIAAAAgABLhkgAAYiJIgDAAIgDgCIABAAQAHgBAHgFQAIgHACgKQABgLgGgIQgGgIgKgBIgOADIADgDIAAAAIABgBIAAAAQAGgFAIAAIAAAAIAAAAIABAAIACAAIABAAQAJACAGAKQAEAIAAAJIAAAFQgCAMgIAHIgBABIAAAAIAAABIgBAAQgGAEgHAAIAAAAIAAAAgAASiLgAiSiYIgDgCIAAAAQAIgBAHgFQAIgHACgKQABgKgGgIQgGgIgKgBIgDAAIAHgGIADAAQAKACAGAJQAEAIAAAJIAAAFQgCAMgIAIIgGADIgIADgAiNjSg");
	this.shape_9.setTransform(20.8993,-5.8883);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#878C88").s().p("AhLDVQAthBgJhjQgFg6gYgzQgPgigYgdIgGgJIgBAAIAHgtIAKg6IABgCIAAgaIABAAIAhACQAeAGAcAOQBiAsAeBkQAeBjg4BhQgtBPiABAQASgKAQgOQgQAOgSAKIgDABIATgOIAVgYQApg5AAhTIgBgaQgHhig7hLIgkgmIgHgFIAHAFIAkAmQA7BLAHBiIABAaQAABTgpA5IgVAYIgTAOQgZARgfAEQAigPAZgkgAgpDaQA8gmAlhDQAlhBAAhCQAAgkgLgkQgehqhhgvQgZgNgZgHQAZAHAZANQBhAvAeBqQALAkAAAkQAABCglBBQglBDg8AmQAdgaAUgoQAeg7AAhDQAAgjgJglQgYhshPhBIgXgQIAXAQQBPBBAYBsQAJAlAAAjQAABDgeA7QgUAogdAaIAAAAgAhLDyIAAAAgAgpDaIAAAAg");
	this.shape_10.setTransform(39.7733,-9.25);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#696C63").s().p("AACAbQgKgBgGgMQgIgLABgOIADgPQAlABAEAnIgDACIAAABQgHAKgKAAIgBAAg");
	this.shape_11.setTransform(22.55,-34.4488);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#070906").s().p("AgXgKIAGgKIABgBQAHgIAJAAQAFABAFAEIAGAGIABABQAHAMAAAOQgBAMgFAJQgDgmgmgCg");
	this.shape_12.setTransform(22.975,-36.0515);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#828073").s().p("AAdBLQgsgng0gFIgGAAIALhEIACgLIADgJQAFgSAPgLQALgJALAAIAPABQASAGALAVIAGASIAFAPIABAOIgBASIgLBNIALhNIABgSIgBgOIgFgPIgGgSQgLgVgSgGIgPgBQASgKAUAGQAYAGANAXIAKAYIADAMIABAIIAAAZIgBABIgKA6IgHAtgAgNg1IgBABIgFAKIgDAPQgBAPAIAMQAGAKAKABQALABAHgKIAAgBIADgCQAFgJAAgMQAAgPgHgMIgBgBIgFgGQgGgEgGgBIgBAAQgHAAgHAIgAgPhfg");
	this.shape_13.setTransform(22.65,-32.8508);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-54.2,-44.1,108.5,88.2);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AH4hZIvvAAIAACzIPvAAg");
	this.shape.setTransform(-20.55,171);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("An3BaIAAizIPuAAIAACzg");
	this.shape_1.setTransform(-20.55,171);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	var sprImg_shape_2 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_sale_atlas_1"],51);
	sprImg_shape_2.onload = function(){
		this.shape_2.graphics.bf(sprImg_shape_2, null, new cjs.Matrix2D(1,0,0,1,-258,-193)).s().p("EgoTAeKMAAAg8TMBQnAAAMAAAA8Tg")
	}.bind(this);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-258,-193,516,386);


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
	this.shape.graphics.f().s("#FF9900").ss(8,0,0,3).p("AJYJYIyvAAIAAyvISvAAg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-64,-64,128,128);


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

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgRARQgHgGAAgLQAAgJAHgIQAHgHAKAAQALAAAGAHQAIAIAAAJQAAALgIAGQgGAIgLAAQgKAAgHgIg");
	this.shape.setTransform(-365.95,138.15);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgJAHgIQAHgHAKAAQALAAAGAHQAIAIAAAJQAAAKgIAIQgGAHgLAAQgKAAgHgHg");
	this.shape_1.setTransform(-365.95,77.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-368.4,75,5,65.69999999999999);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AGnBaItNAAIAAizINNAAg");
	this.shape.setTransform(-33.825,-125.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AmmBaIAAizINNAAIAACzg");
	this.shape_1.setTransform(-33.825,-125.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-77.1,-135.8,86.6,20.000000000000014);


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
	this.shape.graphics.f("#FF0000").s().p("AAIAXIgPAAIgbAJIAjhAIAiBBg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.5,-3.3,7,6.699999999999999);


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

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(3,0,0,3).p("ADqA/InTh9");
	this.shape.setTransform(18.4,-118.125);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FF9900").ss(4,1,1).p("Ai4lAIAAA8Ai4nWIAAA8AAnnWIg7AAAC5nSIAAgEIg4AAAC5k8IAAg8AhunWIg8AAAC5imIAAg8AC5gQIAAg8AC5CFIAAg8Ai4CBIAAA8Ai4gUIAAA7Ai4iqIAAA8Ai4GtIAAAqIASAAAi4EXIAAA8AC5GxIAAg8ABJHXIA8AAAhMHXIA8AAAC5EbIAAg8");
	this.shape_1.setTransform(55.8,-73.4);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	var sprImg_shape_2 = cjs.SpriteSheetUtils.extractFrame(ss["vital_opsm_sale_atlas_1"],50);
	sprImg_shape_2.onload = function(){
		this.shape_2.graphics.bf(sprImg_shape_2, null, new cjs.Matrix2D(0.76,0,0,0.76,-205.2,-199.9)).s().p("EggDAfPMAAAg+dMBAHAAAMAAAA+dg")
	}.bind(this);
	this.shape_2.setTransform(0,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-205.2,-199.8,410.4,399.70000000000005);


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
	this.shape.graphics.f("#000000").s().p("AgRARQgHgHAAgKQAAgKAHgHQAIgHAJAAQAKAAAIAHQAHAHAAAKQAAAKgHAHQgIAIgKAAQgJAAgIgIg");
	this.shape.setTransform(-365.9,204.45);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgRASQgHgIAAgKQAAgJAHgIQAIgHAJAAQAKAAAIAHQAHAIAAAJQAAAKgHAIQgIAHgKAAQgJAAgIgHg");
	this.shape_1.setTransform(-365.9,64.2);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-368.4,61.7,5,145.3);


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

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF9900").ss(8,0,0,3).p("AcLV1Mg4VAAAMAAAgrpMA4VAAAg");
	this.shape.setTransform(30.775,-26.95);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-153.5,-170.6,368.6,287.4);


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

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("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");
	this.shape.setTransform(-44.9767,-148.35);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.lf(["#315223","#FFFFFF","#2D6C25"],[0,0.471,1],-6.7,-4.1,-15.3,39.2).s().p("AgCAAIAFAAIgEABg");
	this.shape_1.setTransform(-11,-129.975);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.lf(["#3D492E","#FFFFFF","#3D492E"],[0.035,0.471,0.988],0,-6.3,0,6.3).s().p("AACA4IgNgMQgSgSABgaQgBgZASgSQAWgTASAAQgkA7AgA7IAFAHQgPAAgNgHg");
	this.shape_2.setTransform(-59.1007,-98.55);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.lf(["#3D492E","#FFFFFF","#3D492E"],[0.035,0.471,0.988],0,-6.3,0,6.3).s().p("AgXA4Qgig7Alg7IABAAQAYAAARATQASASAAAZQAAAagSASQgHAHgHAFQgMAHgPAAg");
	this.shape_3.setTransform(-54.1959,-98.55);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.lf(["#3D492E","#FFFFFF","#3D492E"],[0.035,0.471,0.988],0,-2.7,0,6.2).s().p("AgjAcQgIgcAHgaIBHABQAFAMAAANQAAAOgHAOg");
	this.shape_4.setTransform(-191.1883,-78.45);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.lf(["#3D492E","#FFFFFF","#3D492E"],[0.035,0.471,0.988],0.8,-2.8,0.8,6.2).s().p("AgOAcQgHgNABgPQgBgOAGgNIAkABQgHAaAIAcg");
	this.shape_5.setTransform(-196.9021,-78.475);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.lf(["#3D492E","#FFFFFF","#3D492E"],[0.035,0.471,0.988],0,-1.8,0,1.8).s().p("AgZASIALgSQARgRAYAAQgMARgFASg");
	this.shape_6.setTransform(-195.9,-83.025);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.lf(["#3D492E","#FFFFFF","#3D492E"],[0.035,0.471,0.988],0,-1.8,0,1.9).s().p("AgjASQAFgSALgSIABAAQAKAAAGAGQAOABALALQAIAIAFALg");
	this.shape_7.setTransform(-191.275,-82.975);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.lf(["#3D492E","#FFFFFF","#3D492E"],[0.035,0.471,0.988],0,-4,0,4).s().p("AhLAcQgggMABgQQAAgIAIgGQAIgHAPgHQAggLArAAQAsAAAgALIAYAOQAHAGABAIQAAAKgNAJIgIAEIgBABIgKAEQggAMgsAAQgrAAgggMg");
	this.shape_8.setTransform(-173.6,-91.45);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.lf(["#3D492E","#FFFFFF","#3D492E"],[0.035,0.471,0.988],0,-6.3,0,6.3).s().p("AgLAsIgIgKQgKgOABgUQgBgZASgSQAQgTAYAAQgeAxARAvQAFAOAJAPQgYAAgRgTg");
	this.shape_9.setTransform(-197.1012,-124.55);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.lf(["#3D492E","#FFFFFF","#3D492E"],[0.035,0.471,0.988],0,-6.3,0,6.3).s().p("AghAiQgRgvAegxIABAAQAYAAARATQASASAAAZQAAAUgLAOIgHAKQgRATgYAAQgJgPgFgOg");
	this.shape_10.setTransform(-192.194,-124.55);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.lf(["#3D492E","#FFFFFF","#3D492E"],[0.035,0.471,0.988],0.7,-0.5,0.7,13.2).s().p("AgQAGIAJgKIAZAKg");
	this.shape_11.setTransform(94.15,-76.25);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.lf(["#3D492E","#FFFFFF","#3D492E"],[0.035,0.471,0.988],0.7,-1.7,0.7,14.3).s().p("AghARIgagLIAHgGIAFgDIAkgNIAIAAQAaAAAWARIAJAIIAGAIgAgzAAIAEgDIgFADgAgvgDg");
	this.shape_12.setTransform(99.35,-77.4007);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.lf(["#3D492E","#FFFFFF","#3D492E"],[0.035,0.471,0.988],0,-6.8,0,6.9).s().p("AgPAtQgWgYAAgfQAAgiAWgXIA1AWIgEByQgdgDgUgVg");
	this.shape_13.setTransform(92.85,-122.7);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.lf(["#3D492E","#FFFFFF","#3D492E"],[0.035,0.471,0.988],0,-8,0,8).s().p("AgRBQIAEhxIg2gXQAXgYAiABQAfgBAXAYIAOATQAKARgBAUQAAATgHAQQgHAMgJAJQgXAYgfAAg");
	this.shape_14.setTransform(98.05,-123.8255);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.lf(["#3D492E","#FFFFFF","#3D492E"],[0.035,0.471,0.988],0,-8,0,8).s().p("AgSBQIAGhxIg2gXQAXgYAgABQAggBAXAYIANARQALASAAAVQAAAUgJARIgPATQgXAYggAAg");
	this.shape_15.setTransform(97.55,-156.8255);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.lf(["#3D492E","#FFFFFF","#3D492E"],[0.035,0.471,0.988],0,-6.8,0,6.9).s().p("AgOAtQgYgXAAghQAAggAYgYIA1AWIgGBxQgcgCgTgVg");
	this.shape_16.setTransform(92.35,-155.7);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.lf(["#3D492E","#FFFFFF","#3D492E"],[0.035,0.471,0.988],0,-6.8,0,6.9).s().p("AgPAtQgXgYABggQgBghAXgXIA1AWIgEByQgdgDgUgVg");
	this.shape_17.setTransform(92.1,-175.7);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.lf(["#3D492E","#FFFFFF","#3D492E"],[0.035,0.471,0.988],0,-8,0,8).s().p("AgRBQIAEhxIg2gXQAYgYAgABQAggBAXAYIAMAPQALASAAAXQABAVgLASIgNARQgXAYggAAg");
	this.shape_18.setTransform(97.3,-176.8255);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#211811").s().p("AhQA1QgggfAAgqIAMgEIgMAEIAMgEIAAAAQAGATAMANQAaAgAkAAQAiAAAaggQAZgdAAgsIgBgKIAagIIABgBIACABQAUAbABAkQgBArghAeQghAggvAAQguAAgiggg");
	this.shape_19.setTransform(-20.45,-121.45);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#D3D3D3").s().p("AAZCvIAPitQAFg3AEhwIAagHIAFgCICLAYIgLA1QgSASABAaQgBAaASASIhMBvIgFBJgAAZCvIjzAAIAEgsQAHhCAQg/QAMgzASgyIDShCQgEBwgFA3IgPCtgABPiuIABAAIgFACgABQiug");
	this.shape_20.setTransform(-81.125,-93.15);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#9E9D58").s().p("AhDBLIAAh4QAFglAhAKIBiAbIgeAjQgGgGgJAAIgBAAQgXABgSARIgLARQgGANAAAOQAAAQAGANg");
	this.shape_21.setTransform(-195.5,-83.1911);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#BFC4A4").s().p("AgCAAIACgBIADADg");
	this.shape_22.setTransform(-170.075,-82.9);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#BDC66C").s().p("AIrBwIAAgRIgVAAIAAARIg7AAIAAgeIgVAAIAAAeIlYAAIAAgPIgVAAIAAAPIgjAAIgDhGIgFgEIAwgxIAFgHIAGABIHbBRIAAAMIACAkgAF7BmIAVAAIAAggIgVAAgAEkBSIAUAAIAAggIgUAAgADUBGIAUAAIAAghIgUAAgACEAtIAUAAIAAghIgUAAgApFBwIAAjfIAFABQAqAIAQAqIAAABIAEAPIADAxIAHBrg");
	this.shape_23.setTransform(-174.8,-86.925);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#778B44").s().p("AgdCAIgbgGIAAj8IBxAZQgaBIgNBXIgGAxQgGAQgHAGQgHAGgIAAQgGAAgHgDgAgGB4IAAjqg");
	this.shape_24.setTransform(-227.3,-126.4887);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFF33").s().p("AHGGBIgCglIABgLQADhAAXg9IAag5IAagIIB0gkQgSAygMAzQgQBAgHBCIgEArgAp4GBIgGhsIAAgBQAAgbgEgVIgBgQQgHh+AKhpIAGgxQANhYAahIQAZhGAmg4IBtgeQgiBSgWBaQgRBEgJBMQgPB/AGCZIANCtg");
	this.shape_25.setTransform(-162.0312,-114.175);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#625C2C").s().p("AhQA1QgigeAAgqIACgVQAGgYAQgTIDJAlQAEAMAAAPQAAAqgiAeIgWAQQgaAPghAAQguAAgigfg");
	this.shape_26.setTransform(-188.35,-149.825);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#CFC7C5").s().p("AHYCYIAAAAIjjgoIjggpIjJglIgUgDIlQg8IAAiGIM5CRIAABfIA6AAIAAhQIC+AWIAACRg");
	this.shape_27.setTransform(-179.325,-161.65);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FEF0FD").s().p("AiCgUIEEAAIABAog");
	this.shape_28.setTransform(-165.325,-218.95);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#DFD0D5").s().p("AgSFPIAAhfIgSoVIA4AIIATIcIAABQgAgkklIgCgpIA3AAIADAxg");
	this.shape_29.setTransform(-148.5,-187.5);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#A39092").s().p("AjaDqIi+gXIgTocIa4D/IAAAVI3nGwgA0MAzIAAmtIIhAAIEHApIASIVg");
	this.shape_30.setTransform(-103.7,-183.125);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#868D5A").s().p("AQLBXIgzgJIG+ihIADCqgAstgvIAIgEIgIAHgA2YhUIAAgBIADAAIACAPg");
	this.shape_31.setTransform(-83.45,-84.35);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#A1AC8E").s().p("AJ5DPImJhJIBzgaIAmgJIARAAIJxBbIAeAIIADAAIA0AJgAE2CNQAPgXAegKQgeAKgPAXgAxfh0IABgHICEhTIFlBEIAAB2g");
	this.shape_32.setTransform(-91.9,-96.35);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#5A4D23").s().p("AGmC/IgRABIgnAIIhyAaIBLhvIAPALQAMAHAPAAQAPAAANgHQAHgFAGgGQATgTgBgaQABgZgTgTQgQgTgZAAIgBAAQgRABgYASIALg0IMCCFIAAAlQhsgFgIBBQgDAqAjAYQAKAHANAGgAxFkZIHcBiIAACJIlmhDIiDBTgAwcjpQgRATAAAZQgBAUALAPIAHAJQASATAYAAQAZAAARgTIAHgJQALgPAAgUQgBgZgRgTQgRgTgZAAIgBAAQgYABgRASg");
	this.shape_33.setTransform(-93.05,-105.6);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#503C23").s().p("ACPC0IAAgHQAAhRgmg5Qgmg5g2AAIgdAFImOgnIHLiPID6A8IAAAWIB3ASIABCSIgjgCIAABsIg8gDIivgcICvAcIAAAygAFACWg");
	this.shape_34.setTransform(30.825,-124.45);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#F5EBF3").s().p("AhZCSIgCgDQgmg5ABhRIAAgUIABgKQAGg+AeguQAbgoAjgNIAdgEQA2AAAlA5QAmA6AABQIAAAGQgBBNglA3IgCADIgCADIiAAqQgbgNgVgggAg4BvQAPAXARAMQATAOAWAAQAXAAATgOQARgMAOgXQAegwAAhDQAAhEgegxQgegvgrgBQArABAeAvQAeAxAABEQAABDgeAwQgOAXgRAMQgTAOgXAAQgWAAgTgOQgRgMgPgXQgdgvAAhCIAAgCIAAgCQAAhDAdgwQAfgvAqgBQgqABgfAvQgdAwAABDIAAACIAAACQAABCAdAvgAgchcQgWAlAAA2QAAAzAWAmQAXAmAgAAQAgAAAXgmQAXgmAAgzQAAg2gXglQgXgmggAAQggAAgXAmg");
	this.shape_35.setTransform(32.1747,-107.6);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#85E8FF").s().p("AD0CkIiLgXIADgBIABAAIGaiBQAAAsAhAfQAhAfAvAAQAvAAAhgfQAigfAAgsQAAgigVgcIAFgCIGOAmQgjANgbAnQgeAugFA+IgBAKIgCAVIgOB6gARqEDQgXgmAAg0QAAg2AXglQAXgmAgAAQAhAAAWAmQAXAlAAA2QAAA0gXAmQgWAmghAAQggAAgXgmgABpCNIAAAAIADgBIgDABgAyihaIhMgRQAWhaAhhRIAxgOIgDAWQAAAqAiAfQAiAfAvgBQAhAAAagOIAWgQQAigfAAgqQAAgPgDgMIDgAoIAAEIg");
	this.shape_36.setTransform(-83.675,-124.7);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#3A3C24").s().p("AA7ArIgpgEIh1gSIAAgVIAAgUIB4AZIgGgyIBNAPIAIBMg");
	this.shape_37.setTransform(70.35,-138.375);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#544B2E").s().p("ADPB4IgIhNIhNgPIAGAzIh5gaIAAAVIj5g9IFehsIBRgRIAtgJIAJDzg");
	this.shape_38.setTransform(59.625,-145.775);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#ABAC9A").s().p("AjRCGIACgDQAkg3ABhMICxATIAAgxIA7ADIAAhsIAkADIBsAHIAAB9ImjCIg");
	this.shape_39.setTransform(62.15,-106.375);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#879059").s().p("AlJCRQgNgGgJgHQgkgYADgqQAJhBBrAFIAAgkIAOh6IABAAQAABRAlA5IACADQAWAfAaANICCgpIACgBIGkiJIAAB8IgBABIgdAKQggAIgfgDIgagFQgUgGgRgWIhRAeIm9ChIgDABgAj+BnIAQgGIgGglIBOgbIhOAbIAGAlIgQAGIAAgbQhdgZAAgYIAAgCIAAACQAAAYBdAZIAAAbgAj0A8IgHgmgAgJAXIAAgbgAj+Bng");
	this.shape_40.setTransform(44.6385,-91.8);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#A5A799").s().p("AgUiyIAEAAIAnADIAAFbIgtAHg");
	this.shape_41.setTransform(140.775,-142.575);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#656A32").s().p("AiuJEIgGgIIgIm2QAIgQAAgTQAAgWgJgQIgFj+QAJgRAAgVQAAgVgKgSIgCh6QAKgRAAgWQAAgXgMgTIgChqIDfAiQAiAIgEAjIAABaQAFApA1AEIBTAJQAFAbAAATQgCAugigBIgEAAIgCFlIgOAEIAAEqQAWAJAXAGIAPAEIAACpg");
	this.shape_42.setTransform(122.875,-133.7);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#72704A").s().p("AgTAsQAhABACgtQAAgTgFgbIAJABIAABcg");
	this.shape_43.setTransform(141.075,-164.875);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#747951").s().p("Ag1DRIgMmjIBxgeIASHXIgtAKQADgrhNALg");
	this.shape_44.setTransform(76.4,-181.15);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#44361B").s().p("AhAJNIgcxYQgKhAA/gBIBwASIACBqIgMgOQgXgYggAAQggAAgXAYQgXAXAAAhQAAAhAXAYQAUAVAcADIAHAAQAgAAAXgYIAOgSIACB6IgNgRQgXgYghAAQggAAgXAYQgXAYAAAgQAAAiAXAXQAVAVAbACIAHABQAhAAAXgYIAOgTIAFD+IgOgTQgXgYghAAQggAAgXAYQgXAXAAAiQAAAgAXAYQAVAVAbADIAHAAQAhgBAXgXQAJgKAGgLIAIG2IgJgIQgWgTgcABIgHAAIgjANIgFADIAAAAIgIAHIgJALg");
	this.shape_45.setTransform(95.356,-134.6);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#96936A").s().p("Aj4ATIgCgBIgDhqQCWAJBHgTIBrAAIASAAICgAAIAADFgAjCgPQC4gBBJgaIABgBIAXgKQAGgUAAgPIAAgKIAAAKQAAAPgGAUIgXAKIgBABQhJAai4ABIAAAAIgFAAIgcgBIgBAAIgCAAIAAAAIgDAAIADAAIAAAAIACAAIABAAIAcABIAFAAIAAAAgABAhaQgsAhhfAEQBfgEAsghIALgIg");
	this.shape_46.setTransform(117.7,-211.075);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#9AFE70").s().p("ASmKcIgBipQAfAEAggIIAdgKIABgBIALgFIgLAFIAAh8IAAh9IhtgIIgBiTIAoADIApAEIAAgBIAkADIgJj0IgSnYIBygeIABgJIH3BQIAAE9IgIgBIhUgJQg0gEgFgpIAAhaQAEgkgigHIjggjIhygSQg+ABAKBAIAbRZgAQYKcIgDirIBRgeQARAWAUAGIAaAEIABCpgAjqKcIAGhJIGHBJgAr7KcIAAgSIAVAAIAAASgAtLKcIAAgeIAVAAIAAAegAy4KcIAAgQIAVAAIAAAQgA6IKcIgMitQgHiZAQiBQAJhLARhEIBMAQIgOD7IgBAHIHqBgIABAAID5AqIBBgKIBegbIAYgHIgZA5QgXA8gEBBIgBAAInahTIACgIQAMgJAAgKQAAgJgIgGIgXgOQgggLgsAAQgtAAgfALQgQAHgIAHQgIAGAAAJQAAAQAgAMQAfAMAtAAQAsAAAggMIAFAFIgvAzIgCACIi3gxIhigbQgigKgFAkIAAB6gAuWKSIAAghIAVAAIAAAhgAvuJ+IAAghIAVAAIAAAhgAw+JxIAAggIAVAAIAAAggAyOJYIAAggIAVAAIAAAggAdJHvQgWgHgWgJIAAkpIAOgEIAtgHIAAFHgA8ZHvQgPgrgqgIIgFgBIAAihIAbAGQAQAGAMgJQAIgGAGgQQgLBpAIB/gA9XAdIAAg0ICxgwQgmA3gZBGg");
	this.shape_47.setTransform(-44.975,-142.45);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#757841").s().p("A0NJYIALgDIAAgBIABADIgGAHgA0BJXIAHgIIgBAJgA0BJXgAUMpdIACABIgCAJg");
	this.shape_48.setTransform(-36.625,-148.7);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#CCCFA7").s().p("AxRJ5QAGgNAAgQQAAgNgFgMQgEgLgJgIQgKgMgQgBIAegjIC2AxIAHACIADBGgAsGGVIgBAAIAAh2IAAiJIAAkIIDjApIAAAAIARG7IgRm7IBBALIXnmwIAAgVIG6h1IAMGlIgxAAI+sJFIABAgIBGAAIAAAjIhBAKgAnMG1IAAgjIhGAAIgBggIespFIAxAAQBPgMgEArIhRARIlfBtInMCPIgGABIgBABIgaAIIABAKQAAAsgaAfQgZAfgkAAQgjAAgagfQgMgPgGgSIAEgCIgEABIgNAEImZCBIgBAAIgEABIgEABIgaAIIjSBCIh0AkIgzAPIhdAbgAHXCVIChgygAlvGagAk8GLIgaAIIgZAHgAk8GLgAoTFygAHTCXIAAgBIAEgBIgEACIAAAAgA4VhoIAAiYIFQA9IAUAEQgRATgFAXIgwANIhtAeIixAxgA4VhoIFQhbg");
	this.shape_49.setTransform(-77.2425,-138.975);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#F9F8FF").s().p("AgrBiQgqgMgdgzQggg6AChOIAcAAQABBFAgAyQAiA2AxABQAxgBAkg2QAigyAEhFIAWAAQgHAugRAnQgMAbgRAYQgxBDg7AAg");
	this.shape_50.setTransform(60.5716,-210.775);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#ADA1AB").s().p("Am7AQIEyAgIAbAFQA8gBAxhCQAQgYAMgcIDHAgIAAAKIhyAdIhxAfIm6B0gAAbhCQARgmAHgvICtAAIDcAAQhHATiVgJIAAgKIAAAKIACBrgAAbhCg");
	this.shape_51.setTransform(69.975,-205.8);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#5F5FFE").s().p("AjrBDIAAimIDMAAQgBBOAgA6QAbAzAqAMgAAdAUQgegygBhFIDuAAQgEBFghAyQgkA2gyABQgygBgig2g");
	this.shape_52.setTransform(49.225,-210.975);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#D3C9C8").s().p("AtbhmIgCgxIAPAAICyAAIX6AAIAACnIAACIgArciFIAvAAQALgKAGgIQgGAIgLAKIgvAAIhygSg");
	this.shape_53.setTransform(-60.575,-205.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_2
	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f().s("#000000").ss(1,0,0,3).p("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");
	this.shape_54.setTransform(-45.1235,-428.4717);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.lf(["#556280","#CCD3DD","#49526F","#FFFFFF","#646782","#B5B8CA","#53577C"],[0.008,0.157,0.306,0.471,0.631,0.831,1],-31.3,95,4.3,95).s().p("AAAAAIABAAIAAAAg");
	this.shape_55.setTransform(47.475,-396.475);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#EDEBF8").s().p("AAAAFIABgJIAAAJg");
	this.shape_56.setTransform(-1.925,-369.5);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#302B2F").s().p("AgSDWIgKmrQAOAcArAJIAAFZQABARgMAcg");
	this.shape_57.setTransform(-18.642,-390.4);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#6C733D").s().p("AABAAIgBAAIABAAg");
	this.shape_58.setTransform(-143.575,-449.225);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#443A16").s().p("AnxCGIAAgBIAEAFIABACgAFWiKICbAAIABAKIhkAIQgjgFgVgNg");
	this.shape_59.setTransform(-93.625,-462.45);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#C1BAC1").s().p("Ah3FMIgEh+IA9idIhDgqIAAgTIAZACIgZgCIgBgnIBmAAIABAMIAFCCIhcDxgAg+AxIALgcIALgbIANghIgNAhIhAgEIA1AfgAiBAHIBDAqIg9CdgAgWBbIgFiCIAEgMIAHAAIgHAAIADgIIBjkOIA0gCIhgEQIgNAjIgsBzgAgzAVgAhogKIBAAEIgLAbgAiBgMgAgXgzg");
	this.shape_60.setTransform(-213.975,-402.175);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#A3253A").s().p("AJ+APIAAgQQAagOAHAegAqegOIAkADIAAATg");
	this.shape_61.setTransform(-163.45,-402.25);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#A29AA9").s().p("ABRJTIBYjhIjfiDIANgkIDcCBIA3iKIAfAAIACA5Ih/FYgAi/JTIBcjwIAKDwgAj4JTIAwh+IAEB+gAjyD4IgYgCIAAgiIAAgLIATALIgTAAIATAAIAoAAIABAmgAjPDUIgIkgIBqAIIAFENIAAALgAkKh2IAxgRIACA7IgcgEIgXA5gAhthEIgBhiQA5gQA0gIQB6gTBgATIAiAIIACBGQhNAlh6AIIg0ABIgXAAQgpAAgvgCgAjXhMIgCg7IA7gTIABAAIgGjAIAGDAIgBAAIg7ATIgFjIIA7gLIgChrIgEiNIAsAAIAGB5IAGB1IADC+IABBigAidiaIAvgMgAjZiHgAidiag");
	this.shape_62.setTransform(-206.3,-428.5);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFF33").s().p("AK1JTIgEiSIgRqvIgHlkIB1AAIATH8IAAD9IAKGsgAr/JTIgMlYIgCg5IgMkyIgChGIgPmcIB9AAIACBGIAFDqIACBMIAFDzIAKHDIADBzg");
	this.shape_63.setTransform(-101.6,-428.5);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#6D7397").s().p("AsrEUIgPgpIAAn7IAngDIAACNIAAEAIAACagAM4BmIACABIgCAJgApsgpIABgCQAFgUAVgKIAAAbIAAAFg");
	this.shape_64.setTransform(-68.25,-396.575);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#D5D3C6").s().p("AjOA6QAGgQgBgTIgZAIIADgxIgDAxIADhnIAAA2QDoAzDYgxIACBFQh2AUh0AAQhjAAhkgPg");
	this.shape_65.setTransform(70.025,-389.1881);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#544959").s().p("AgEABIAJgBIAAABg");
	this.shape_66.setTransform(135.8,-369.15);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#9AAC86").s().p("AAAgDIAEABIgHAHg");
	this.shape_67.setTransform(130,-422.5);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFAFE").s().p("AOZFXIAAgDIAAjQIAAg6IAAiPIAvAUIAKGIgAHqFXIgEiPIgJl2IBZgDIAAEmIABBGIADCcgAu8FXIgFiDIgHj6IgJkVIAAgNQAugcAvAcIAHEdIAGD1IAECNg");
	this.shape_68.setTransform(44.15,-403.3125);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#BDC66C").s().p("AYLFUIgBhGIgHjWIAAhVIAJF3gAEmFRIgHj4IgHkoIgDh5IAAgRIARKwgA4LBpIAAgLIAIADIgDAIIgFAMg");
	this.shape_69.setTransform(-62.05,-417.875);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#D8DACC").s().p("AgXAdQgXgOgJgLQgZgbA5gKIBPgeIAHBuIABARg");
	this.shape_70.setTransform(132.9712,-454.125);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FF0000").s().p("AKCJTQANgcgCgRIAAlaQgsgJgOgcIAAj9IA2ALIAAnuIAKgZIBLAAIBPAAQgZAogGAuIAAAOIAACBIAAAMIAACiIgBABQgIARAJAWQAIAWAYAaIA8AJIAAAkIhcgDIAAhaIAABaIBcADIAKAAIAABwIAABMIAAAgQhOAKgNAfIgCAAIgDAAIgBAAIgIABIAAABQgoAFgfAAIAAAAIgBAAQgcAAgWgFIgBAAIgBAAIgCgBIACABIABAAIABAAQAWAFAcAAIABAAIAAAAQAfAAAogFIAAgBIAIgBIABAAIADAAIACAAQgDAJACAKIAAByIAABNIAACsIgBAKgALtCxIAAjSgALCg6IAAgJIBMAGIhMgGIAAnYQAGgZAWgeQgWAegGAZIAAHYgALChDIg5gIgAs3JTIgrhzIgKnDIADABQA8AWA8AAIABAAIAAAAQAVAAAVgDIACAAIgCAAQgVADgVAAIAAAAIgBAAQg8AAg8gWIgDgBIgFjzQAbAPAcAJQBdAeBcgeIASgHIAAB7IAABcIgXAVIgNAEIgnAEIAAH7IAPApgAtfJTIgDhzIArBzgAtiHggAMOg9gALChDgAs6i+QgcgJgbgPIgChMQASAqAsASIgQkjIgEhJIBeAAIA8AAIgBAWIAAAdIAAAWIAAAbIAACeIAABIIARAQIAtApIgVgGIAVAGIABACIAAgBIACACIAAAHIgSAHQguAPguAAQguAAgvgPgAqHjFIAWgIgAqhjbQgcAbgugbIAAl3IAAF3IgCAAIgCAAIAAAAIAAAAQglAAgbgJIgEgCIgCAAIACAAIAEACQAbAJAlAAIAAAAIAAAAIACAAIACAAQAuAbAcgbgApvjFgApyjPg");
	this.shape_71.setTransform(-81.05,-428.5);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#5F5FFE").s().p("ALoITQgOgsgDgxIC5gDQgDA2gKAqgApKITIgBhHIABBHIh4AAIgBhRQArAQAkAAIAAAAIAAAAQAUAAARgEIAAAAIABgBIABAAIACgBIAjirIAIDygAp0HSQgkAAgrgQIgEgUIgbiGIAEAAQAeAFAiAAIAAAAIABAAQAzAAA7gMIAGgBIgGABQg7AMgzAAIgBAAIAAAAQgiAAgegFIgEAAIgCgJIACAJQg1gIgYgkQgEgRABgNIACgIIAaAAIAAgFIAAgcIAAgbIAAgzQgkAAAGgiQAUgwAwgDIAXAPIAAiTIACgQICOAAIAABWIAKAAIAABLIAUgNQA0gSANA6QAHAkgbAUQg5APg3ABQA3gBA5gPIAABAIAAATIAAARIAhAAIACAXQgUAqgqAHIgLABIgFABIABABIgjCrIgCABIgBAAIgBABIAAAAQgRAEgUAAIAAAAIAAAAgAn+DWIhzAAgArQDWIBfAAIADhUIhigIQgjgGgjgNQAjANAjAGIAABcIhGAAIBGAAgAqNA2QAkAAAkgUIACAAIABgBIAAAAIABAAIAAgBIABAAIABgBIgBABIgBAAIAAABIgBAAIAAAAIgBABIgCAAQgkAUgkAAIAAAAIgBAAQgjAAgkgTIgBgBIgCAAIgBgBIABABIACAAIABABQAkATAjAAIABAAIAAAAgArDHCIAAAAgALXG2QhggKgEg8IADgJIApAKIAAhCIAAgyQgvgPAAgWQAAgaA4gSIAngJIgFAkQBkAYBkgYIgIglIAuAKQA4ASAFAaQAEAXg3ARIgDABIADAAIgDBoIAZgJQABAUgGAQQgOAjg1AMIi5ADIAAAAgAMjGAQBNAABKgVIACgBIAAAAIAAAAIADgBIgDABIAAAAIAAAAIgCABQhKAVhNAAIAAAAIAAAAQg9AAg/gNIAAAAIgIgCIAIACIAAAAQA/ANA9AAIAAAAIAAAAgAKoEAQA4ATBTgBQBSAAA6gRQg6ARhSAAQhTABg4gTIgJgDgAOQGzIAAAAgArQDWIAAhcIBiAIIgDBUgArQDWgALKDHIAFgkIAOhXIAGgkICAAAIiAAAIABgoIgBgKQgGh1hBgMIgBAAIh2gTIg8gJQgYgagIgWIgBgmIABAAIAAgBQAMgXArgNIBQgXQgxgiBLgrQAwAAArgIQAGAYAnAIIgBB7QBgAnAUBqQAIAogDAwIgCAXIgFAbIAKAAIAOA9IAPA9IAIAlQgyAMgyAAQgyAAgygMgALTj9IAeAKIgegKIgcgHgAK3kEIAAg3IAdgNIgdANIAAA3IhqgFIBqAFgALPCjgAn+BygAo/gsIgKAAIAAhWIAjAAIAAAbIAAA7gApJiCgApJiCIiOAAQAGhTgggoQgOgSgUgJIjQggIgRgQIAAhIQAHgnBygSIAAhJICDAGIBOAFIAACeIgjgPIi0gPICJAAIiJAAIC0APIAjAPQA3AcAYA8IAHAUQAQA0gFBHgAr4mHIAmAAIgmAAIAAhOIAABOgAt7nJIBHgKg");
	this.shape_72.setTransform(-48.5864,-422.15);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#B5BB9F").s().p("ACxCRQgngIgGgZIACg6QgHgxA+AEIACABQAYANAZAAIAAAAIABAAQAVAAAWgKIABgBIACgBIgCABIgBABQgWAKgVAAIgBAAIAAAAQgZAAgYgNIgCgBIAAhLIBTAAQAIgCAFgFQgFAFgIACIhTAAQgcgDANg3IAAgWIB1AAIAAAUIAFAhQgEAMgGAHIgBABIACBUQAogDAUAkIAAArIAAA8IiqgCgAL/BtIgKgZIAvAAIgvAAIAAhGIAvgDIAAh2IABABIAAAAQAQAcAtAAIAAAAIABAAQAQAAAVgEIAABdQgyAKgygKIAABJIAAhJQAyAKAygKIAABHIBEgSIAAAtQg2ARgzAAQg0AAgwgRgAMkBUIAAAIIAAgIIBkgCgAOIALQAagWAqAeIAAAtIhEASgAU0AkIAAg7IAAhYIACAAIAFAAIAACTgAOIALgAzsgIIhNgFQgBgdAEgVIACAAQBHARBHABIABAAIAAAAQAhAAAigEIABAAIAAAAIAAAAIACgBIABAAIABAAIADAAQAAAXgIAZgAqtgeQgUgNgHgVIgFgWQANgqAxgGIAAgMIBRAAIAAAMQBGgIAMAfIAAA3IgmAagAojg1QACgMAAgLQAAgmgdgUIhRAAIAAA/IAAg/IBRAAQAdAUAAAmQAAALgCAMgAymgtQhHgBhHgRIgCAAQALhHA1ADIAAAKQAVAJAVAAIAAAAIAAAAQAaAAAagOIABAAIgBAAQgaAOgaAAIAAAAIAAAAQgVAAgVgJIAAgKIAAgPIBfAAIAAAUIArANQASAeAAAhIgDAAIgBAAIgBAAIgCABIAAAAIAAAAIgBAAQgiAEghAAIAAAAIgBAAgANihOQgtAAgQgcIAAAAIgBgBIgBgDQgEgJgCgMIAAgPIB/AAIAAAtIAAAPIgUAEQgVAEgQAAIgBAAIAAAAgAOIhSg");
	this.shape_73.setTransform(9.1969,-473.275);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#F7F7FF").s().p("AGbCDIAtgKIAAAXgAnHiPIABAAIgBAGg");
	this.shape_74.setTransform(97.45,-473.625);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#9AFE70").s().p("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");
	this.shape_75.setTransform(-44.975,-428.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54}]}).wait(1));

	// Layer_1
	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f().s("#000000").ss(1,0,0,3).p("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");
	this.shape_76.setTransform(-44.9625,-294.9923);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#A39092").s().p("AkQAtIAAhZIIhBZg");
	this.shape_77.setTransform(-205.725,-224.5);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#A3253A").s().p("AAAAAIAAAAIAAAAg");
	this.shape_78.setTransform(-162.075,-310.35);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#EBBC60").s().p("AgBAAIAAAAIADAAg");
	this.shape_79.setTransform(-182.65,-315.525);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#654E5E").s().p("AhCgcICFAUIiFAlg");
	this.shape_80.setTransform(-226.275,-298.875);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#C1BAC1").s().p("AkdAfIAAgZIAAhtIBTAMIBvARIAABNIAAAYIjCgVIDCAVIAAAIIAAgIIAtAEIFMArIAAAegAEeBKgAEeBKgAguAfIADhjIEDAVIAAAAIAAAgQABALAGAHIAMANIAGAEIAAABIACABIADABIABAAIAAABIAJADIAXACIAHAtgAhbAbg");
	this.shape_81.setTransform(-204.45,-310.725);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#A29AA9").s().p("AgJE0IAAgYIAAhOIhvgRIAAgLIgEi7IBxBIIACAvIAWgeIgYgRIhxhIIhPgzIAAglIBOAsIgHj1IAEgNIgEANIAAgNIAAANIhHDCIAAh1IARgxIgRgBIAAgmIARACIABgEIA1AAIAEAAIBnAAIAMFDIAgASIB+lVIA6AAIijHUIgCA3IgDBkgAhADCQAeAAAcgVIgDg/IADA/QgcAVgeAAIAAAAIgBAAQgaAAgdgQQAdAQAaAAIABAAIAAAAgAgNAMIhwhBgAh8gJg");
	this.shape_82.setTransform(-212.65,-338.825);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FEF0FD").s().p("ACOBKIoghZIAAg6IMlCIIAAALg");
	this.shape_83.setTransform(-192.675,-227.425);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#BEB6C1").s().p("AmKABIAAhLICHgmIKOBdIAACEg");
	this.shape_84.setTransform(-193.525,-288.475);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#DFD0D5").s().p("AgTFhIAAgMIgChNIA3AJIACBNIg3gJIA3AJIAAADgAgVEIIgPm6IAAgoIAAiGIA3AIIAACGIgBAAIABAOIAAAaIAPG7g");
	this.shape_85.setTransform(-150.4,-255.25);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#827D77").s().p("AhlEUIAAgdIDLAaIAAAagAgqCjIAAAAIAAijIAAkqIBqEtIhqgDIBqADIAVA9IARA5IAAA2g");
	this.shape_86.setTransform(-154.375,-326.575);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#6D7397").s().p("AgLglIAXAAIAABLg");
	this.shape_87.setTransform(-148.275,-366.225);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#CCCFA7").s().p("AgyCyIAAkNIBkhlIABA6IgOAGQgjANAAATIABAFIgBB1IAAArIAAB8g");
	this.shape_88.setTransform(-36.4,-313.05);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FF0000").s().p("ACwG4IAAhUIAAgpQgDghABghQADg4ATg1QAmhxBthmQAmglAvgiIAPgMIBXhcIADCrIhkBkQg3A6gdAoIgPAVIgQAfIgDALQgcBSABBrIADBFQgaAQgdAAQgdAAgfgQgAoyEoQgOgHgPgLIAAi1IgTg3IgVg8IhrkuIgwiHIAwCHIAAEqIAACjIgiAAIAAgBQAGgKABgMIAAgNIAAheIAAh+QAQhDhHANIgGkeIAoAAICMAAIAYBMIBqFQIAyCnIAAAQIAAAdIAABkIAAAdQgUAFgWAAQgaAAgcgHgAKEmKQAOgVAKgTIALgVICVAAIgHAVQgPAtgtBBQgqA6hCBNIgEAEgArilAg");
	this.shape_89.setTransform(-84.75,-324.4);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#674A38").s().p("AAAAAIAAAAIAAAAg");
	this.shape_90.setTransform(-1.75,-367.925);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#EDEBF8").s().p("AglEmIgBndQAthBAPgtIAGgVIABAAIABAVIAAAAIABA9IAIIZIgvAKg");
	this.shape_91.setTransform(-4.775,-338.525);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#302B2F").s().p("AAfGNQgFgtgyADIAAhyIAAgrIAAh6QAAgUgigNIgmgKIgDifIAFgFQBChMAog7IABHdIAdAVQBDA7gDBqgAhpmMIAkAAIgKAUQgLAUgOAVg");
	this.shape_92.setTransform(-9.8686,-330.25);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FFFF33").s().p("AKoHUIAAhZIAAg3IgegJQghgNgCgSIAAgFIAAh8IAAgqIABh2QADAPAfANQAiANAyAAQAyAAAjgNQAigOAAgSIAAB6IAAAqQh3Auh3guQB3AuB3guIAAByIAAAOQAAATgiANIgVAHIhAAHIg2gFIA2AFIBAgHIAABJIAABJQgeAPgdAAQgdAAgegPgAsUCLIgXgDIgIgDIgBAAIAAAAIgEgCIgCgBIAAAAIgGgEIgMgNQgFgIgCgMIAAgfIAFAAQA5AbBCAAIAAAAIAAAAQAqAAAtgLIAAANQgBAMgGAKIAAABQgIALgRAHIgYAHIhAADgArTBZQhCAAg5gbIgFgBIAAhOIAAiYQgHgpA+AJQASAmAbAAIAAAAIABAAQAYgBAegcIAAAAIACgBIAAgBIABAAIACgCQBIgOgRBEIAAB/IgFACQgvARgyAAIAAAAIgBAAQgzAAg3gTIgEgBIAAAAIgCgBIACABIAAAAIAEABQA3ATAzAAIABAAIAAAAQAyAAAvgRIAFgCIAABdQgtALgqAAIAAAAIAAAAgAKKAXQgfgNgDgPIgBgEQAAgUAjgNIAOgFIgBg7IgEirIgFjNIB2AAIABA9IAFDRIADCgIAmAKQAiANAAAUQAAASgiAOQgjANgyAAQgyAAgigNgAMOAAIgBg0IABA0QgXARgdAAQgdAAglgRIAAgvIAAAvQAlARAdAAQAdAAAXgRgArvijQgbAAgSgmIgKkZIBtAAIAGEeIgCACIgBAAIAAABIgCABIAAAAQgeAcgYABIgBAAIAAAAgAqzjEg");
	this.shape_93.setTransform(-97.6561,-321.6875);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#96936A").s().p("AgQBcIgGgQQgHgOgQgJQgQgJgYgDQAYADAQAJQAQAJAHAOIgMAQIhsAAQAtgOAMgaIAAgLIgBg+ICxhGQAOAhAmAGIAACQgAgiBcIAMgQIAGAQgAgWBMIAAAAg");
	this.shape_94.setTransform(128.7,-229.175);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#D3C9C8").s().p("AkRFWQAFgJAAgIQAAgWglgRIijgYIgPm6IbRDrIgFACIAAEdgAkRFWIiyAAIgPgCIgChOICjAYQAlARAAAWQAAAIgFAJgAnSFWIAAgCIAPACgA0wDCIAAhFIAAmpIAAgpIMVBxIAAAnIsVhvIMVBvIAOG6IADBOgAoND9IsjiAgATuA3I7RjrIAAgbIAAgOIcUD+IgZAJIgqANgAnji0g");
	this.shape_95.setTransform(-100.075,-254.2);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#F9F8FF").s().p("AB5CJIAAgOQAChSgig5Qgjg6gxAAQgxAAgkA6QgkA5gCBSIAAAOIgcAAIABgcQAIhmAxhHQAjg0ApgOIAfgGQA9ABAlBHQAlBHgIBmIgDAcg");
	this.shape_96.setTransform(60.7882,-233.65);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#ADA1AB").s().p("AW5G6IgChyIAHAAIADAAQArACAlAAIAAAAIABAAQCKAAAwgbIABAAIABgBIAAAAIAAAaIABBAIAAAKQgMAbgtANgAUNG6IADgbQAHhmglhIQglhIg8AAIggAGIkkghIAZgJI8Uj9IAAiGIg4gIIqOhdIiHgTIAAg7II7BJIAAgeIgHgtIAgAEIBAgEIAYgGIAABBIAAAdIDMAYIAAAIIAgAKQA6AeAwgbIAAgdIJ5BWIAABUQA+AgA1ggIgEhFIEHAkIAABYQA7AfA6gfIAAhIIQVCNIAAAQIAwAAIAAASIAAgSIAJAAIAAhRIBsgKIANgBIAoAAQCbAIAHBjIgbAIIgDAAIAAAAIgFACQhOAVhXAAIAAAAIAAAAQg/AAhEgLIAGE6IACBygANmCFIIJiLIARAAIAAgPIAAAPIgRAAgAWwgDIABARIgBgRIBDgpIBnAAIhnAAIhDApgAZagsIAWAAIgWAAIAAhFIAABFgAsDjlICvhFIivBFIirgZICrAZgAYRFKQglAAgrgCIgDAAIgHAAIgGk6QBEALA/AAIAAAAIAAAAQBXAABOgVIAFgCIAAAAIADAAIAAEbQgHAKgMAHIAAAAIgBABIgBAAQgwAbiKAAIgBAAIAAAAgAW3FIIAAAAg");
	this.shape_97.setTransform(-54.2,-264.225);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#DBD5D5").s().p("AT7DbIgwAAIAAgPIwViOIAAhIIAVgHQAigNABgTIAAgOQAzgDAFAuIBLAAQADhrhEg7IA7gDQApAcgHA1IAABYINzBpIAFAAIAAA1IAABRgAjGALQgBhqAdhSIAhAGIAABfIBUAIIA1APIAAAFQABASAhANIAfAJIAAA2gAuuhZIAAhkIB0AOIB+AQIAzAHIFSAqQgCAgAEAiIAAAogA0EiGIAAhCQARgHAIgLIABAAIAhAAIABAAICRAMIAABig");
	this.shape_98.setTransform(-36.125,-288.375);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#443A16").s().p("AVOAcIAGACIgIADgATXAbIAGgCIACAFgA1TgeIAAgCIARAAIgBAEg");
	this.shape_99.setTransform(-96.575,-366.7);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#5F5FFE").s().p("ALRLuIAAgNQABhTAlg6QAkg5AxAAQAyAAAiA5QAiA6gBBTIgBANgAHoLuIAAkdIAFgCIAqgNIEkAgQgqAOgjA1QgwBIgIBlIgCAcgAIGAtIgMqjIgBg7IAIADIAFABQAdAIAbABIABAAIAAAAQAXAAAWgHIACAAIgCAAQgWAHgXAAIAAAAIgBAAQgbgBgdgIIgFgBIgCgFQgIgSgHgTIgGgVICbAAIgVA9IgCAFIAIgDIACA9IAQKeQghAbggABQghgBgggbgAs+hdIgKqQIAKKQIh+gPIAAgtIgEpUIB4AAIAqAAIAUKXg");
	this.shape_100.setTransform(-23.1968,-295);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#FFFAFE").s().p("AOZJ/IgPzfIAAhEIA4AAIALHLIAAN+QgngFgNghgAHSDgIgEgBIANr/IAAhYIgBgsIBRAAIAAAkIABA4IASNTIAAABIhsAJgAu7A9IAAheIAAhEQAdgpA3g5IAAENgAvMqkIBZAAIAIE0QgwAjgmAkg");
	this.shape_101.setTransform(45.725,-302.25);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#9AFE70").s().p("AZyKbQAMgIAGgJIAAkcIAcgJQgHhjicgHIgngBIgNABIgStSIAIACIACAAIABAAQBDASBCAAIAAAAIAAAAQBnAABjgrIAEgCIAPTgIiyBFgAHmBmIAAhYQAGgzgogdIgLgHIgIoZIAFACQB5AlBzAAIAAAAIAAAAIAtgCIAEAAIABAAIAMKjQAgAbAhABQAggBAhgbIgQqeIAMACIAPABQCJANCQAAIAAAAIABAAQBtAABygIIgNMAgAowgdIgUqXIIDAAIALF8QhsBngnBxQgSA1gDA3gAtVhCIAAgaIg9i8IhqlQIAAhMIEWAAIAEJUIAAAtgA5mioIACg3ICknVICLAAIAKEaQg+gKAHApIAACYIAABQgA9XjLIAAjvIBOA0IAFC8IAAALgAdNq0IALAAIAAHLgA6ZlxIgNlDICrAAIh+FWgAAXq0IBoAAIAFDNIhWBcIgPAMgA9XneIAAgIIBGjBIAHD1gASGooQiQAAiJgNIgPgBIgMgCIgCg9IAKABQBqANBnAAIAAAAIAAAAQCjAACYghIAABYQhyAIhtAAIgBAAIAAAAgAVmowgANSo4IAAAAgAKio7QhzAAh5glIgFgCIgBg9IABAAIgBAAIgBgVIEVAAIAGAVQAHATAIASIgGACIgCABIgCAAQgjAFgjAAIgBAAIAAAAQhmAAhlgoIgBAAIgDgBIgFgDIgDgBIADABIAFADIADABIABAAQBlAoBmAAIAAAAIABAAQAjAAAjgFIACAAIACgBIABA7IgBAAIgEAAIgtACIAAAAIAAAAgAZHpDQhCAAhDgSIgBAAIgCAAIgIgCIgBg5IAAgkIFVAAIhTAVIgDABIgGABIAAAAQhUARhXAAIAAAAIAAAAQghAAghgDIgMgBIAMABQAhADAhAAIAAAAIAAAAQBXAABUgRIAAAAIAGgBIADgBIBTgVIAKAAIAABEIgEACQhjArhnAAIAAAAIAAAAgA9XqMIAQABIgQAwgAQrpnQhnAAhqgNIgKgBIgGgCIAVg9IIGAAIABAsQiYAhijAAIAAAAIAAAAgAcLq0g");
	this.shape_102.setTransform(-44.975,-300.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-234,-489,475.8,414.3);


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


(lib.sprite81 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_84
	this.instance = new lib.shape80("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite81, new cjs.Rectangle(-217.6,-967,704.1,1905.5), null);


(lib.sprite70 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.shape69("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite70, new cjs.Rectangle(-54.2,-44.1,108.5,88.2), null);


(lib.sprite15 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.shape14("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite15, new cjs.Rectangle(-3.5,-3.3,7,6.699999999999999), null);


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


(lib.sprite141 = function(mode,startPosition,loop,reversed) {
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
	this.frame_1179 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1179).call(this.frame_1179).wait(1));

	// Masked_Layer_53___41
	this.instance = new lib.shape140("synched",0);
	this.instance.setTransform(-159.25,-18);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1180));

	// Masked_Layer_49___41
	this.instance_1 = new lib.text139("synched",0);
	this.instance_1.setTransform(-499.6,291.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1180));

	// Masked_Layer_48___41
	this.instance_2 = new lib.text138("synched",0);
	this.instance_2.setTransform(-499.6,241.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1180));

	// Masked_Layer_47___41
	this.instance_3 = new lib.text137("synched",0);
	this.instance_3.setTransform(-499.6,193.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1180));

	// Masked_Layer_46___41
	this.instance_4 = new lib.text136("synched",0);
	this.instance_4.setTransform(-499.6,145.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1180));

	// Masked_Layer_45___41
	this.instance_5 = new lib.text135("synched",0);
	this.instance_5.setTransform(-499.6,79.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1180));

	// Masked_Layer_44___41
	this.instance_6 = new lib.text134("synched",0);
	this.instance_6.setTransform(-499.6,33.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1180));

	// Masked_Layer_43___41
	this.instance_7 = new lib.shape133("synched",0);
	this.instance_7.setTransform(-159.25,-18);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1180));

	// Masked_Layer_42___41
	this.instance_8 = new lib.text132("synched",0);
	this.instance_8.setTransform(-508,2.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1180));

	// Layer_39
	this.instance_9 = new lib.sprite15();
	this.instance_9.setTransform(230.85,103.6,2.0326,2.0326,149.993);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1180));

	// Layer_38
	this.instance_10 = new lib.shape131("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1180));

	// Layer_36
	this.instance_11 = new lib.sprite15();
	this.instance_11.setTransform(372.8,82.7,2.0326,2.0326,-150.0069);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(1180));

	// Layer_35
	this.instance_12 = new lib.shape130("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(1180));

	// Layer_33
	this.instance_13 = new lib.sprite15();
	this.instance_13.setTransform(170.2,279.95,2.0326,2.0326,89.9927);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(1180));

	// Layer_32
	this.instance_14 = new lib.shape129("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(1180));

	// Layer_30
	this.instance_15 = new lib.sprite15();
	this.instance_15.setTransform(232.5,300.95,2.0326,2.0326,-90.0073);

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(1180));

	// Layer_29
	this.instance_16 = new lib.shape128("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(1180));

	// Layer_27
	this.instance_17 = new lib.sprite15();
	this.instance_17.setTransform(275.35,242.6,2.0326,2.0326,179.9927);

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(1180));

	// Layer_26
	this.instance_18 = new lib.shape127("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(1180));

	// Layer_24
	this.instance_19 = new lib.sprite15();
	this.instance_19.setTransform(318.75,219.4,2.0326,2.0326,-105.0068);

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(1180));

	// Layer_23
	this.instance_20 = new lib.shape126("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(1180));

	// Layer_21
	this.instance_21 = new lib.sprite15();
	this.instance_21.setTransform(37.8,162.35,2.0326,2.0326,-105.0068);

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(1180));

	// Layer_20
	this.instance_22 = new lib.shape125("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(1180));

	// Layer_19
	this.instance_23 = new lib.text124("synched",0);
	this.instance_23.setTransform(60.3,351.25);

	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(1180));

	// Layer_18
	this.instance_24 = new lib.shape123("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(1180));

	// Layer_17
	this.instance_25 = new lib.text122("synched",0);
	this.instance_25.setTransform(406,67.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(1180));

	// Layer_16
	this.instance_26 = new lib.shape116("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(1180));

	// Layer_15
	this.instance_27 = new lib.text121("synched",0);
	this.instance_27.setTransform(327.35,21.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_27).wait(1180));

	// Layer_14
	this.instance_28 = new lib.shape120("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_28).wait(1180));

	// Layer_13
	this.instance_29 = new lib.text119("synched",0);
	this.instance_29.setTransform(124.95,8.75);

	this.timeline.addTween(cjs.Tween.get(this.instance_29).wait(1180));

	// Layer_12
	this.instance_30 = new lib.shape118("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_30).wait(1180));

	// Layer_11
	this.instance_31 = new lib.text117("synched",0);
	this.instance_31.setTransform(6.15,72.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_31).wait(1180));

	// Layer_10
	this.instance_32 = new lib.shape116("synched",0);
	this.instance_32.setTransform(-725.65,32.35,1.8078,0.5766);

	this.timeline.addTween(cjs.Tween.get(this.instance_32).wait(1180));

	// Layer_9
	this.instance_33 = new lib.text115("synched",0);
	this.instance_33.setTransform(257.8,290.45);

	this.timeline.addTween(cjs.Tween.get(this.instance_33).wait(1180));

	// Layer_8
	this.instance_34 = new lib.shape114("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_34).wait(1180));

	// Layer_7
	this.instance_35 = new lib.text113("synched",0);
	this.instance_35.setTransform(257.15,188.75);

	this.timeline.addTween(cjs.Tween.get(this.instance_35).wait(1180));

	// Layer_6
	this.instance_36 = new lib.shape112("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_36).wait(1180));

	// Layer_5
	this.instance_37 = new lib.text111("synched",0);
	this.instance_37.setTransform(131.2,132.35);

	this.timeline.addTween(cjs.Tween.get(this.instance_37).wait(1180));

	// Layer_4
	this.instance_38 = new lib.shape110("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_38).wait(1180));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-511.9,-0.7,989,381.3);


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
	this.frame_1193 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1193).call(this.frame_1193).wait(1));

	// レイヤー_11
	this.instance = new lib.text102("synched",0);
	this.instance.setTransform(-527.55,260.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1194));

	// レイヤー_10
	this.instance_1 = new lib.text101("synched",0);
	this.instance_1.setTransform(-510,211.55);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1194));

	// レイヤー_9
	this.instance_2 = new lib.text100("synched",0);
	this.instance_2.setTransform(-527.55,210.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1194));

	// レイヤー_8
	this.instance_3 = new lib.shape86("synched",0);
	this.instance_3.setTransform(-542.3,180.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1194));

	// レイヤー_3
	this.instance_4 = new lib.text94("synched",0);
	this.instance_4.setTransform(-510,124.95);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1194));

	// レイヤー_2
	this.instance_5 = new lib.text93("synched",0);
	this.instance_5.setTransform(-527.55,124.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1194));

	// レイヤー_4
	this.instance_6 = new lib.shape86("synched",0);
	this.instance_6.setTransform(-542.3,93.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1194));

	// レイヤー_7
	this.instance_7 = new lib.text88("synched",0);
	this.instance_7.setTransform(-510,55.35);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1194));

	// レイヤー_6
	this.instance_8 = new lib.text87("synched",0);
	this.instance_8.setTransform(-527.55,54.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1194));

	// レイヤー_5
	this.instance_9 = new lib.shape86("synched",0);
	this.instance_9.setTransform(-542.3,24);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1194));

	// Layer_101
	this.instance_10 = new lib.shape99("synched",0);

	this.instance_11 = new lib.shape92("synched",0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_10}]},824).to({state:[{t:this.instance_11}]},5).to({state:[{t:this.instance_10}]},5).to({state:[{t:this.instance_11}]},5).to({state:[{t:this.instance_10}]},5).wait(350));

	// Layer_100
	this.instance_12 = new lib.text98("synched",0);
	this.instance_12.setTransform(74.6,93.2);
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(824).to({_off:false},0).wait(370));

	// Layer_99
	this.instance_13 = new lib.shape83("synched",0);
	this.instance_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(824).to({_off:false},0).wait(370));

	// Layer_98
	this.instance_14 = new lib.text91("synched",0);
	this.instance_14.setTransform(107.25,166.4);
	this.instance_14._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(824).to({_off:false},0).wait(370));

	// Layer_97
	this.instance_15 = new lib.shape83("synched",0);
	this.instance_15.setTransform(32.65,73.2);
	this.instance_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(824).to({_off:false},0).wait(370));

	// Layer_96
	this.instance_16 = new lib.shape92("synched",0);

	this.instance_17 = new lib.shape85("synched",0);

	this.instance_18 = new lib.text84("synched",0);
	this.instance_18.setTransform(97.25,267.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_16}]},494).to({state:[{t:this.instance_17}]},5).to({state:[{t:this.instance_16}]},5).to({state:[{t:this.instance_17}]},5).to({state:[{t:this.instance_16}]},5).to({state:[{t:this.instance_18}]},310).wait(370));

	// Layer_95
	this.instance_19 = new lib.text91("synched",0);
	this.instance_19.setTransform(107.25,166.4);

	this.instance_20 = new lib.shape83("synched",0);
	this.instance_20.setTransform(22.65,173.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_19}]},494).to({state:[{t:this.instance_20}]},330).wait(370));

	// Layer_94
	this.instance_21 = new lib.shape83("synched",0);
	this.instance_21.setTransform(32.65,73.2);
	this.instance_21._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(494).to({_off:false},0).to({_off:true},330).wait(370));

	// Layer_93
	this.instance_22 = new lib.text84("synched",0);
	this.instance_22.setTransform(97.25,267.05);

	this.instance_23 = new lib.sprite15();
	this.instance_23.setTransform(177,101.3,1.5,1.5,89.9971);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_22}]},494).to({state:[{t:this.instance_23}]},330).wait(370));

	// Layer_92
	this.instance_24 = new lib.shape83("synched",0);
	this.instance_24.setTransform(22.65,173.85);

	this.instance_25 = new lib.shape97("synched",0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_24}]},494).to({state:[{t:this.instance_25}]},330).wait(370));

	// Layer_91
	this.instance_26 = new lib.shape85("synched",0);
	this.instance_26._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(210).to({_off:false},0).to({_off:true},5).wait(5).to({_off:false},0).to({_off:true},5).wait(5).to({_off:false},0).to({_off:true},264).wait(700));

	// Layer_90
	this.instance_27 = new lib.text84("synched",0);
	this.instance_27.setTransform(97.25,267.05);

	this.instance_28 = new lib.sprite15();
	this.instance_28.setTransform(212,173.3,1.5,1.5,89.9971);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_27}]},210).to({state:[{t:this.instance_28}]},284).wait(700));

	// Layer_89
	this.instance_29 = new lib.shape83("synched",0);
	this.instance_29.setTransform(22.65,173.85);

	this.instance_30 = new lib.shape90("synched",0);

	this.instance_31 = new lib.shape96("synched",0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_29}]},210).to({state:[{t:this.instance_30}]},284).to({state:[{t:this.instance_31}]},330).wait(370));

	// Layer_87
	this.instance_32 = new lib.sprite15();
	this.instance_32.setTransform(204,276.3,1.5,1.5,89.9971);
	this.instance_32._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_32).wait(210).to({_off:false},0).wait(984));

	// Layer_86
	this.instance_33 = new lib.shape82("synched",0);

	this.instance_34 = new lib.shape89("synched",0);

	this.instance_35 = new lib.shape95("synched",0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_33}]},210).to({state:[{t:this.instance_34}]},284).to({state:[{t:this.instance_35}]},330).wait(370));

	// Layer_1
	this.instance_36 = new lib.sprite81();
	this.instance_36.setTransform(224.4,191.35,0.1981,0.1982);

	this.timeline.addTween(cjs.Tween.get(this.instance_36).wait(1194));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-536.8,-0.3,857.5,377.6);


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

	// Masked_Layer_17___14
	this.instance = new lib.shape64("synched",0);
	this.instance.setTransform(-180,0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(790));

	// Masked_Layer_15___14
	this.instance_1 = new lib.text63("synched",0);
	this.instance_1.setTransform(-546.8,10.65);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(790));

	// Mask_Layer_1 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EgkZAgHMAAAhANMBIzAAAMAAABANg");
	mask.setTransform(213.3929,170.4254);

	// Masked_Layer_12___1
	this.instance_2 = new lib.text78("synched",0);
	this.instance_2.setTransform(-139.85,103.3,1.049,1.049,-1.5504);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	var maskedShapeInstanceList = [this.instance_2];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(499).to({_off:false},0).to({scaleX:1.0489,scaleY:1.0489,rotation:-1.513,x:-139.75,y:103.05,alpha:0.9492},19).wait(1).to({scaleX:1.049,scaleY:1.049,rotation:-1.5504,x:-139.85,y:103.3,alpha:1},0).wait(271));

	// Masked_Layer_11___1
	this.instance_3 = new lib.shape77("synched",0);
	this.instance_3.setTransform(234.3,129,1.049,1.049,-1.5504);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	var maskedShapeInstanceList = [this.instance_3];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(499).to({_off:false},0).to({scaleX:1.0489,scaleY:1.0489,rotation:-1.513,x:234.35,alpha:0.9492},19).wait(1).to({scaleX:1.049,scaleY:1.049,rotation:-1.5504,x:234.3,alpha:1},0).wait(271));

	// Masked_Layer_10___1
	this.instance_4 = new lib.shape65("synched",0);
	this.instance_4.setTransform(118.15,24,0.5001,0.3334);

	this.instance_5 = new lib.shape75("synched",0);
	this.instance_5.setTransform(126.15,23.2,0.1253,0.1253);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	var maskedShapeInstanceList = [this.instance_4,this.instance_5];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_4}]},429).to({state:[]},5).to({state:[{t:this.instance_4}]},5).to({state:[]},5).to({state:[{t:this.instance_5}]},10).to({state:[{t:this.instance_5}]},20).to({state:[{t:this.instance_5}]},1).wait(315));
	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(454).to({_off:false},0).to({scaleX:1.0176,scaleY:1.0176,x:205.2,y:179.5,alpha:0.9492},20).wait(1).to({scaleX:1.0622,scaleY:1.0622,x:209.15,y:187.3,alpha:1},0).wait(315));

	// Masked_Layer_9___1
	this.instance_6 = new lib.text73("synched",0);
	this.instance_6.setTransform(168.3,268.2,0.2,0.2);
	this.instance_6.alpha = 0;
	this.instance_6._off = true;

	var maskedShapeInstanceList = [this.instance_6];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(333).to({_off:false},0).to({scaleX:1.0191,scaleY:1.0191,x:295.55,y:340.2,alpha:0.9492},19).wait(1).to({scaleX:1.0622,scaleY:1.0622,x:302.2,y:344,alpha:1},0).wait(437));

	// Masked_Layer_8___1
	this.instance_7 = new lib.shape72("synched",0);
	this.instance_7.setTransform(150.8,240.2,0.2,0.2);
	this.instance_7.alpha = 0;
	this.instance_7._off = true;

	var maskedShapeInstanceList = [this.instance_7];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(333).to({_off:false},0).to({scaleX:1.0191,scaleY:1.0191,x:206.3,y:197.55,alpha:0.9492},19).wait(1).to({scaleX:1.0622,scaleY:1.0622,x:209.15,y:195.3,alpha:1},0).wait(437));

	// Masked_Layer_7___1
	this.instance_8 = new lib.text68("synched",0);
	this.instance_8.setTransform(110.9,353.1);
	this.instance_8.alpha = 0;
	this.instance_8._off = true;

	this.instance_9 = new lib.shape3("synched",0);
	this.instance_9.setTransform(145.1,248.7,0.3334,0.3334);

	var maskedShapeInstanceList = [this.instance_8,this.instance_9];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_8}]},124).to({state:[{t:this.instance_8}]},19).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},125).to({state:[{t:this.instance_8}]},20).to({state:[]},1).to({state:[{t:this.instance_9}]},19).to({state:[]},4).to({state:[{t:this.instance_9}]},4).to({state:[]},4).to({state:[{t:this.instance_9}]},4).to({state:[]},4).wait(461));
	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(124).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).to({startPosition:0},125).to({alpha:0},20).to({_off:true},1).wait(500));

	// Masked_Layer_6___1
	this.instance_10 = new lib.shape67("synched",0);
	this.instance_10.setTransform(219.85,188.4);
	this.instance_10.alpha = 0;
	this.instance_10._off = true;

	var maskedShapeInstanceList = [this.instance_10];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(124).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).to({startPosition:0},125).to({alpha:0},20).to({_off:true},1).wait(500));

	// Masked_Layer_5___1
	this.instance_11 = new lib.shape65("synched",0);
	this.instance_11.setTransform(254.95,88.2,0.3374,0.3677);

	this.instance_12 = new lib.sprite70();
	this.instance_12.setTransform(155.7,239.55);
	this.instance_12.alpha = 0;
	this.instance_12._off = true;

	var maskedShapeInstanceList = [this.instance_11,this.instance_12];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_11}]},99).to({state:[]},5).to({state:[{t:this.instance_11}]},5).to({state:[]},5).to({state:[{t:this.instance_12}]},181).to({state:[{t:this.instance_12}]},13).to({state:[{t:this.instance_12}]},1).wait(481));
	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(295).to({_off:false},0).to({alpha:0.9297},13).wait(1).to({alpha:1},0).wait(481));

	// Masked_Layer_4___1
	this.instance_13 = new lib.shape2("synched",0);
	this.instance_13.setTransform(225.2,459.2,0.92,0.92);

	var maskedShapeInstanceList = [this.instance_13];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(790));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-550.7,-9.2,997.2,385.09999999999997);


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

	// timeline functions:
	this.frame_0 = function() {
		/* stopAllSounds ();
		*/
	}
	this.frame_702 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(702).call(this.frame_702).wait(1));

	// Masked_Layer_12___5
	this.instance = new lib.text11("synched",0);
	this.instance.setTransform(-546.75,183.75);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(703));

	// Masked_Layer_11___5
	this.instance_1 = new lib.text10("synched",0);
	this.instance_1.setTransform(-546.75,70.75);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(703));

	// Masked_Layer_10___5
	this.instance_2 = new lib.text9("synched",0);
	this.instance_2.setTransform(-546.75,42.75);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(703));

	// Masked_Layer_9___5
	this.instance_3 = new lib.text8("synched",0);
	this.instance_3.setTransform(-546.75,116.75);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(703));

	// Masked_Layer_8___5
	this.instance_4 = new lib.shape6("synched",0);
	this.instance_4.setTransform(-181,-12);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(703));

	// Masked_Layer_6___5
	this.instance_5 = new lib.text5("synched",0);
	this.instance_5.setTransform(-546.75,9.75);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(703));

	// Layer_10
	this.instance_6 = new lib.text17("synched",0);
	this.instance_6.setTransform(246.55,82.65,0.0856,0.0856);
	this.instance_6.alpha = 0;
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(394).to({_off:false},0).to({scaleX:0.9565,scaleY:0.9565,x:111.35,y:68.5,alpha:0.9492},20).wait(1).to({scaleX:1,scaleY:1,x:104.6,y:67.8,alpha:1},0).wait(288));

	// Layer_9
	this.instance_7 = new lib.shape16("synched",0);
	this.instance_7.setTransform(255.15,93.05,0.0856,0.0856);
	this.instance_7.alpha = 0;
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(394).to({_off:false},0).to({scaleX:0.9565,scaleY:0.9565,x:217.8,y:194.75,alpha:0.9492},20).wait(1).to({scaleX:1,scaleY:1,x:215.95,y:199.85,alpha:1},0).wait(288));

	// Layer_7
	this.instance_8 = new lib.sprite15();
	this.instance_8.setTransform(258.5,83.4,0.145,0.145,104.9971);
	this.instance_8.alpha = 0;
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(394).to({_off:false},0).to({scaleX:0.2187,scaleY:0.2188,rotation:105.0017,x:258.35,y:83.6,alpha:0.0508},1).to({scaleX:0.5138,scaleY:0.5138,rotation:105.0004,x:257.65,y:84.3,alpha:0.2383},4).to({scaleX:0.5875,scaleY:0.5876,rotation:104.9999,x:257.45,y:84.45,alpha:0.2891},1).to({scaleX:0.8826,scaleY:0.8826,rotation:105.0001,x:256.8,y:85.2,alpha:0.4805},4).to({scaleX:0.9563,scaleY:0.9563,rotation:105.0008,x:256.6,y:85.35,alpha:0.5195},1).to({scaleX:1.2514,scaleY:1.2514,x:255.95,y:86.1,alpha:0.7109},4).to({scaleX:1.5464,scaleY:1.5464,rotation:105.0007,x:255.25,y:86.8,alpha:0.9102},4).to({scaleX:1.6201,scaleY:1.6201,rotation:105.0011,x:255.05,y:86.95,alpha:0.9492},1).wait(1).to({scaleX:1.6939,scaleY:1.6939,rotation:105.0008,x:254.9,y:87.15,alpha:1},0).wait(288));

	// Layer_6
	this.instance_9 = new lib.shape13("synched",0);
	this.instance_9.setTransform(255.15,93.05,0.0856,0.0856);
	this.instance_9.alpha = 0;
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(394).to({_off:false},0).to({scaleX:0.9565,scaleY:0.9565,x:217.8,y:194.75,alpha:0.9492},20).wait(1).to({scaleX:1,scaleY:1,x:215.95,y:199.85,alpha:1},0).wait(288));

	// Layer_4
	this.instance_10 = new lib.shape3("synched",0);
	this.instance_10.setTransform(250.75,132.2,0.1372,0.4602);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).to({_off:true},4).wait(4).to({_off:false},0).to({_off:true},4).wait(4).to({_off:false},0).to({_off:true},4).wait(683));

	// Layer_3
	this.instance_11 = new lib.shape2("synched",0);
	this.instance_11.setTransform(225.2,459.2,0.92,0.92);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(703));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-550.7,0,971.9000000000001,399.8);


// stage content:
(lib.vital_opsm_sale = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {p1:0,p2:703,p3:1493,p4:2687};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,1,701,702,703,704,1491,1492,1493,1494,2685,2686,2687,2688,3866];
	this.streamSoundSymbolsList[1] = [{id:"vital_opsm_sale1",startFrame:1,endFrame:702,loop:1,offset:0}];
	this.streamSoundSymbolsList[704] = [{id:"vital_opsm_sale2",startFrame:704,endFrame:1492,loop:1,offset:0}];
	this.streamSoundSymbolsList[1494] = [{id:"vital_opsm_sale3",startFrame:1494,endFrame:2686,loop:1,offset:0}];
	this.streamSoundSymbolsList[2688] = [{id:"vital_opsm_sale4",startFrame:2688,endFrame:3866,loop:1,offset:0}];
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
			GetUrlMain("vitalmenu_sale");
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
		var soundInstance = playSound("vital_opsm_sale1",0);
		this.InsertIntoSoundStreamData(soundInstance,1,702,1);
	}
	this.frame_701 = function() {
		this.stop();
	}
	this.frame_702 = function() {
		this.stop();
	}
	this.frame_703 = function() {
		Prev(1);
		InitAnim();
	}
	this.frame_704 = function() {
		var soundInstance = playSound("vital_opsm_sale2",0);
		this.InsertIntoSoundStreamData(soundInstance,704,1492,1);
	}
	this.frame_1491 = function() {
		this.stop();
	}
	this.frame_1492 = function() {
		this.stop();
	}
	this.frame_1493 = function() {
		Next(1);
		InitAnim();
	}
	this.frame_1494 = function() {
		var soundInstance = playSound("vital_opsm_sale3",0);
		this.InsertIntoSoundStreamData(soundInstance,1494,2686,1);
	}
	this.frame_2685 = function() {
		this.stop();
	}
	this.frame_2686 = function() {
		this.stop();
	}
	this.frame_2687 = function() {
		Next(0);
		InitAnim();
	}
	this.frame_2688 = function() {
		var soundInstance = playSound("vital_opsm_sale4",0);
		this.InsertIntoSoundStreamData(soundInstance,2688,3866,1);
	}
	this.frame_3866 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(700).call(this.frame_701).wait(1).call(this.frame_702).wait(1).call(this.frame_703).wait(1).call(this.frame_704).wait(787).call(this.frame_1491).wait(1).call(this.frame_1492).wait(1).call(this.frame_1493).wait(1).call(this.frame_1494).wait(1191).call(this.frame_2685).wait(1).call(this.frame_2686).wait(1).call(this.frame_2687).wait(1).call(this.frame_2688).wait(1178).call(this.frame_3866).wait(1));

	// Layer_back
	this.back = new lib.buttonbak();
	this.back.name = "back";
	this.back.setTransform(350,645,1.0001,1.0002);
	new cjs.ButtonHelper(this.back, 0, 1, 2, false, new lib.buttonbak(), 3);

	this.timeline.addTween(cjs.Tween.get(this.back).wait(3867));

	// Layer_page
	this.page = new cjs.Text("Page number", "italic bold 15px 'Arial'", "#FF9900");
	this.page.name = "page";
	this.page.lineHeight = 17;
	this.page.lineWidth = 193;
	this.page.parent = this;
	this.page.setTransform(23,658,1.4989,1.4989);

	this.timeline.addTween(cjs.Tween.get(this.page).wait(3867));

	// Layer_next
	this.next = new lib.buttonnext();
	this.next.name = "next";
	this.next.setTransform(1496.1,5.1,0.9998,0.9999,0,0,0,0.1,0.1);
	new cjs.ButtonHelper(this.next, 0, 1, 2, false, new lib.buttonnext(), 3);

	this.timeline.addTween(cjs.Tween.get(this.next).wait(3867));

	// Layer_previous
	this.previous = new lib.buttonprev();
	this.previous.name = "previous";
	this.previous.setTransform(1432,5,1.0003,0.9993);
	new cjs.ButtonHelper(this.previous, 0, 1, 2, false, new lib.buttonprev(), 3);

	this.timeline.addTween(cjs.Tween.get(this.previous).wait(3867));

	// Layer_slider
	this.slider = new lib.sprite_slider();
	this.slider.name = "slider";
	this.slider.setTransform(610.1,670.1,0.9937,0.9983,0,0,0,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.slider).wait(3867));

	// Layer_replay
	this.replay = new lib.sprite_replay();
	this.replay.name = "replay";
	this.replay.setTransform(1045.1,650.1,0.9999,0.9999,0,0,0,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.replay).wait(3867));

	// Layer_slider_base
	this.instance = new lib.sprite_sliderbase();
	this.instance.setTransform(600,650,1,0.9999);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3867));

	// Layer_playpau
	this.playpau = new lib.sprite_playpau();
	this.playpau.name = "playpau";
	this.playpau.setTransform(555,650,0.9999,0.9999);

	this.timeline.addTween(cjs.Tween.get(this.playpau).wait(3867));

	// Layer_136
	this.instance_1 = new lib.text19("synched",0);
	this.instance_1.setTransform(825,43.7,1.5031,1.5021);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1493).to({_off:false},0).to({_off:true},1194).wait(1180));

	// Layer_135
	this.instance_2 = new lib.text107("synched",0);
	this.instance_2.setTransform(23.15,83.5,1.5021,1.5021);

	this.instance_3 = new lib.text106("synched",0);
	this.instance_3.setTransform(37.5,43.7,1.5031,1.5021);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_2}]},1493).to({state:[{t:this.instance_3}]},1194).wait(1180));

	// Layer_134
	this.instance_4 = new lib.text106("synched",0);
	this.instance_4.setTransform(37.5,43.7,1.5031,1.5021);

	this.instance_5 = new lib.text142("synched",0);
	this.instance_5.setTransform(825,43.7,1.5031,1.5021);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_4}]},1493).to({state:[{t:this.instance_5}]},1194).wait(1180));

	// Layer_116
	this.instance_6 = new lib.text23("synched",0);
	this.instance_6.setTransform(10,0,1.5021,1.5021);

	this.instance_7 = new lib.text104("synched",0);
	this.instance_7.setTransform(10,0,1.5021,1.5021);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_6}]}).to({state:[{t:this.instance_7}]},1493).wait(2374));

	// Layer_133
	this.instance_8 = new lib.text19("synched",0);
	this.instance_8.setTransform(825,43.7,1.5031,1.5021);

	this.instance_9 = new lib.shape86("synched",0);
	this.instance_9.setTransform(13.5,0,1.5021,1.5021);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_8}]}).to({state:[]},703).to({state:[{t:this.instance_9}]},790).wait(2374));

	// Mask_Layer_1 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("Eh8/AyyMAAAhfTMD5/AAAMAAABfTg");
	mask.setTransform(800,325);

	// Masked_Layer_2___1
	this.ani1 = new lib.sprite20();
	this.ani1.name = "ani1";
	this.ani1.setTransform(853,71.8,1.5021,1.5021);

	this.ani2 = new lib.sprite79();
	this.ani2.name = "ani2";
	this.ani2.setTransform(853,71.8,1.5021,1.5021);

	this.ani3 = new lib.sprite103();
	this.ani3.name = "ani3";
	this.ani3.setTransform(826,82.6,1.5021,1.5021);

	this.ani4 = new lib.sprite141();
	this.ani4.name = "ani4";
	this.ani4.setTransform(806,82.6,1.5021,1.5021);

	var maskedShapeInstanceList = [this.ani1,this.ani2,this.ani3,this.ani4];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.ani1}]}).to({state:[{t:this.ani2}]},703).to({state:[{t:this.ani3}]},790).to({state:[{t:this.ani4}]},1194).wait(1180));

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
		{src:"images/vital_opsm_sale_atlas_1.png", id:"vital_opsm_sale_atlas_1"},
		{src:"sounds/vital_opsm_sale1.mp3", id:"vital_opsm_sale1"},
		{src:"sounds/vital_opsm_sale2.mp3", id:"vital_opsm_sale2"},
		{src:"sounds/vital_opsm_sale3.mp3", id:"vital_opsm_sale3"},
		{src:"sounds/vital_opsm_sale4.mp3", id:"vital_opsm_sale4"}
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