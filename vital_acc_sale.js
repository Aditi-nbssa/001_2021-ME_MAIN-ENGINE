(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"vital_acc_sale_atlas_1", frames: [[0,1123,1196,843],[0,0,1044,1121]]},
		{name:"vital_acc_sale_atlas_2", frames: [[1343,0,442,124],[0,0,1341,82],[1787,0,113,53],[1902,0,60,60],[0,84,276,53]]}
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



(lib.CachedBmp_103 = function() {
	this.initialize(ss["vital_acc_sale_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_102 = function() {
	this.initialize(ss["vital_acc_sale_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_101 = function() {
	this.initialize(ss["vital_acc_sale_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_100 = function() {
	this.initialize(ss["vital_acc_sale_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_99 = function() {
	this.initialize(ss["vital_acc_sale_atlas_2"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_98 = function() {
	this.initialize(ss["vital_acc_sale_atlas_2"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_97 = function() {
	this.initialize(ss["vital_acc_sale_atlas_2"]);
	this.gotoAndStop(4);
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


(lib.text53 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
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
	this.instance.setTransform(-3.95,-3.75,0.3326,0.3326);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.7,147,41.2);


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
	this.instance = new lib.CachedBmp_102();
	this.instance.setTransform(0,0,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,446.4,27.3);


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
	this.instance = new lib.CachedBmp_101();
	this.instance.setTransform(-3.95,-3.35,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-3.3,398.09999999999997,280.6);


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
	this.shape.graphics.f("#003366").s().p("AgRARQgHgHAAgKQAAgKAHgHQAHgHAKAAQALAAAGAHQAIAHAAAKQAAAKgIAHQgGAIgLAAQgKAAgHgIg");
	this.shape.setTransform(8,38.85);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(5.5,36.4,5,5);


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
	this.shape.graphics.f("#2B2B2B").s().p("Al4D4IgDABQiIAMgRh8IgCgDQhpiTCGiUIAFgGQDDkVFRDWQEkhiBbC1QCBAPAkBzQANDNkVAAQAZComVhAIgGACQhIAfg+AAQhiAAhKhNg");
	this.shape.setTransform(0.0003,-0.0183);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-58.1,-32.5,116.2,65);


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
	this.shape.graphics.rf(["#FFFF00","#FF6600"],[0,1],-6.7,-7,0,-6.7,-7,25.3).s().p("AiaCsIhBgiIh8huIAUibIClg7IC7AUIgDASIAnAGIgGAwIAiADIgEAiIBOASIgEAeIC1AWIgFAqIgpgFIgCATIhJgJIgBAIIhGgHIgCAVIBhAMIgCAQIhdgMIgCAWIgtgGIgEAgIh6gPIgHA4g");
	this.shape.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-34.3,-18.7,68.69999999999999,37.5);


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
	this.shape.graphics.f().s("#FF0000").ss(1,0,0,3).p("AAGgGIgLAN");
	this.shape.setTransform(23.375,-1.125);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1,0,0,3).p("AjvhxIB3gDIgeh9IBOAiIAAhlIAzA/IBShJIAAA+IBtAIIg5AmIBUARIg8AoIA4AAIgfBYIBMAuADjgFIhkBTIA7A5IhbAHIAOCEIhlheIgfCHIhLijIgaAgIgKh9IhBgUIA/hC");
	this.shape_1.setTransform(0.1465,0.1694);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(1,0,0,3).p("AA0ArIhmhV");
	this.shape_2.setTransform(-18.75,-6.95);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#6D7397").s().p("AhhCaIgaAgIgKh9IhBgUIA/hCIhnhWIB3gDIgeh9IBOAiIAAhlIAzA/IBShJIAAA+IBtAIIg5AmIBUARIg8AoIA4AAIgfBYIBMAuIgLAOIhkBTIA7A5IhbAHIAOCEIhlheIgfCHg");
	this.shape_3.setTransform(0.025,-0.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-24.9,-32.8,49.9,66);


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

	// Layer_7
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(0.5,0,0,3).p("AgEgUIAAgCIACAAIAXADIAEAZIgSAMIgHAFIgYgPIAJgeIALACIgHAYIASAO");
	this.shape.setTransform(4.1317,-7.7491);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AgPAJIAJgfIABgBIAJACIgBACIgJgDIAJADIgGAYIATAOIgJAEg");
	this.shape_1.setTransform(3.25,-7.8);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgSAHIAHgZIABgBIABAAIAXACIAFAZIgSAMg");
	this.shape_2.setTransform(4.775,-7.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_6
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(0.5,0,0,3).p("AgEgUIAAgCIACAAIAXADIAEAZIgSAMIgSgOIAHgYIgLgCIgJAeIAYAPIAHgF");
	this.shape_3.setTransform(8.6817,4.0509);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#999999").s().p("AgPAJIAJgfIAKADIgKgDIAAgBIAKACIAAACIgGAYIASAOIgIAFg");
	this.shape_4.setTransform(7.8,4);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgSAGIAHgYIABgCIABAAIAXADIAFAZIgSANg");
	this.shape_5.setTransform(9.325,3.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3}]}).wait(1));

	// Layer_5
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#000000").ss(0.5,0,0,3).p("AgEgUIAAgCIACAAIAXADIAEAZIgSAMIgHAFIgYgPIAJgeIALACIgHAYIASAO");
	this.shape_6.setTransform(8.0817,15.0009);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#999999").s().p("AgPAJIAJgfIABgBIAJACIAAABIgKgCIAKACIgHAZIATAOIgJAEg");
	this.shape_7.setTransform(7.2,14.95);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgSAHIAHgZIABgBIABAAIAXADIAFAYIgSAMg");
	this.shape_8.setTransform(8.725,14.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6}]}).wait(1));

	// Layer_4
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#000000").ss(0.5,0,0,3).p("AAHASIgHAFIgYgPIAJgeIALACAAHASIASgMIgEgZIgXgDIgCAAIAAACIgHAYg");
	this.shape_9.setTransform(-2.3183,7.5509);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#999999").s().p("AgPAJIAJgfIAJADIgJgDIAAgBIAKACIgBACIgFAYIASAOIgIAEg");
	this.shape_10.setTransform(-3.2,7.5);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgSAHIAHgZIABgBIABAAIAXACIAFAZIgSAMg");
	this.shape_11.setTransform(-1.675,7.35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9}]}).wait(1));

	// Layer_3
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#000000").ss(0.5,0,0,3).p("AgEgUIAAgCIACAAIAXADIAEAZIgSAMAgEgUIgLgCIgJAeIAYAPIAHgFIgSgOg");
	this.shape_12.setTransform(-7.3183,-4.9491);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#999999").s().p("AgPAJIAJgfIAKADIgKgDIABgBIAJACIAAACIgHAYIATAOIgJAFg");
	this.shape_13.setTransform(-8.2,-5);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgSAGIAHgYIABgCIABAAIAXADIAFAZIgSANg");
	this.shape_14.setTransform(-6.675,-5.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_12}]}).wait(1));

	// Layer_2
	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("#000000").ss(0.5,0,0,3).p("AAHASIgHAFIgYgPIAJgeIALACIAAgCIACAAIAXADIAEAZgAgEgUIgHAYIASAO");
	this.shape_15.setTransform(-6.0183,-16.9491);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#999999").s().p("AgPAJIAJgfIAAgBIAKACIgBABIgJgCIAJACIgGAZIATAOIgIAEg");
	this.shape_16.setTransform(-6.9,-17);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgSAHIAHgZIABgBIABAAIAXACIAFAZIgSAMg");
	this.shape_17.setTransform(-5.375,-17.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_17},{t:this.shape_16},{t:this.shape_15}]}).wait(1));

	// Layer_1
	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f().s("#000000").ss(1,0,0,3).p("ABoDGQAjgYAAhLQgChNgnhVQgnhWg1gtQg1gsglAXIgTASABoDGIgCACQglAWg2gsQg2gtgmhWQgnhVgBhNQgBg3ATgbQgjAYAABKQABBNAnBVQAnBXA2AsQA1AtAlgXIARgQg");
	this.shape_18.setTransform(0,-0.017);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#9D9D9D").s().p("AgFDCQg2gsgmhXQgnhVgChNQAAhKAjgYQgSAbAAA0IAAADQABBNAnBVQAnBWA1AtIACACIACABIAAAAIABABQAgAZAaAAIABAAIAAAAQAOAAALgHIABAAIABAAIgBAAIgBAAQgLAHgOAAIAAAAIgBAAQgaAAgggZIgBgBIAAAAIgCgBIgCgCQg1gtgnhWQgnhVgBhNIAAgDQAAg0ASgbIATgSQAlgXA1AsQA1AtAnBWQAnBVACBNQAABLgkAYIgBACIAAAAIgRAQQgMAIgPAAQgcAAgjgeg");
	this.shape_19.setTransform(0,-0.017);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_19},{t:this.shape_18}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-14.8,-23.4,29.700000000000003,46.8);


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
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("ADzifIgOgBQgBgCgFAFIgKABIgLgHIgLABIgLABQgFgDgDAEQgEAFgDgDIgEgBACKhTQgFgFgGACIgLAHQgGAEgFABIgIADIgHABIgIADQgGADgGABQgHACgHAFQgIAGgFgEIgEgEIgFAHAEsiEQgLAIgCgCIgKACIgLAEIgDABIgIACIgNADIgOADIgMAEQgFADgDAAIgJABQgFACgDAEQgDAEgJgEIgMAAIgHAIQgEAEgGgCAFPhYIgHgBIgKgDIgKgCIgIgFIgLgCIgKgCQgGgCgHgDIgFgEADlCFQgFAFgIgCIgLgBIgGgBQgDgDgFAHQgEAHgEgFQgDgFgIABIgOAEIgNACQgFgBgBAEADzBBQgEAEgGgIIgJgHQgEABgEgGQgEgGgEAAIgJgBQgFgBgDgHQgCgHgGAAQgFABgCgEQgCgEgCADADfAFQgHAJgHgCIgIAAIgIACIgMADIgHACQgDAAABAEIgHACIgGAAQgGAAgGAFIgMAIIgJACQgEgBgFAFQgEAEgGgBIgKgCQgFgBgDAEQgDAEgGAAQgFAAgGAEQgGAEAAADQAAAEgGgCQgGgCgGAFQgFAEgHgCQgHgCgCAGQgBAGgCgCIgIgBIgNAEIgKAGIgGAEIgHgCQgFgEgGAHQgFAHgEgBAC6BUQgGgEgFAAIgMADIgJgBQgDgDgFADIgJADIgNgDIgEgCQADACgQACAB/CTIgKAGIgLgCIgIgCQgCAAgEADQgDAEgIAAIgNAAIgLABQgFACgEgCIgMgBQgIABgDADIgIADIgNACIgJgBQAAgBgCACQgCADgIABABbDNQgGgEgFAGQgEAHgCgCACnCuIgKABIgJAIIgHABIgLADIgKAGQgBADgGACIgKADAjoilQAAAEAKgCQAKgBADgDIAHAAQAEADADAAIANABIAOABQAGgCACgDIAIAAQAFAEACAAIAEgBIAAgBIACAAQgDgDAEgGIAFgFIAQgCAj7hLIAJABIAJAHIAKADIAKAHQgIADABACQABABgJgBIgLACIgIAJIgKAAQgEgEgBAFAjUg5QAEAGgFgGIABAAIAFgCAjPg3IgFgCAjlgPIAIAFIAMAAIAPADIAJAFIAHACIAFAAIAQACQAKABABAFQAAAGAIgCIAJgCIADABAhwjVIAHAKIAFAGIAHADIALAHIAEAFQgBABAKAGAiOimQgIgGABgCQACgDgEgGIgIgIQgGgCAEgEAiOimIADABAiNikIAAAAQACABAAAAIgIAEAiNilIgBgBAiLijQAFAFgBAFQAAAGACACIAIAFQAEADACAHIABAMQABAFAEAGIAGAJQACACAEgBAivhhIAJALIAIADIAHAFIAIAGIAGACQACgBABAEAiOgaIgJAAQgEABgCgJQgCgIgHgDIgNgBIgIACIgJgGAg3BmQgIAEgDAAIgKADIgIAEIgIABQgFABgDADQgCADgGAEIgIACIgLACIgMADIgDADQgBADgFAAIgLADIgJADIgKACIgFACIgKAEIgKADIgDACAi3AOIAJALIAFACQACAAAAAHQgBAHALADQALAEgFADQgEADAGAAAjFBwQAFAEAGABQAHABAAAFIACAHIAJADQAJABAAAHAjXAmQADAAAEAFIAIAIIAIAKQAEAHAFgBQAFAAABAFIAEAIIAJACAlPAIQAHAAACAFIAHAKQAFAGAGgBIAIABIAIAJIAIAMQABAEAFgBIAIACIAKADQAIABAAAJQABAKAFACIAHACIAGAEIALAFQAGACAGAHQAFAIgCgE");
	this.shape.setTransform(0.0139,0.1472);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-34.5,-22.3,69.1,44.7);


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
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("Am1kJIBhANIAAgBID+AhIAAABIA0AHAIZBPIgBAMQgEBGghAyQgkA3gyAAQgyAAgig3QgfgygBhGIAAgMQABhNAlg2QAkg2AxAAQAyAAAiA2QAiA2gBBNgAh1DmIhWgMIAAgCIj6gmIAAACIhSgNIgBgC");
	this.shape.setTransform(98.0296,12.2772);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1,0,0,3).p("AVlgkIAggFQA8AAAlBCQAlBEgHBfIgDAaQgHAvgSAnQgMAbgRAYQgwBDg9ABIgbgEAN7hhIHqA9QgqANgjAwQgwBEgIBfIgCAaQgBBPAgA6QAcAzAqANIkXgeIjQggAJ9iCMgiGgEgAG5EgI/Ckx");
	this.shape_1.setTransform(0.2001,-0.0227);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#F9F8FF").s().p("AgtDjQgqgNgdgzQggg6AChPIABgaQAIheAxhEQAjgxApgOIAfgEQA9AAAlBDQAlBEgIBeIgDAaQgHAugRAoQgMAbgRAYQgxBDg7AAgAhQh1QgkA3gCBMIAAAMQABBFAgAzQAiA2AyABQAwgBAkg2QAigzAEhFIAAgMQAChMgig3Qgjg2gxgBQgxABgkA2g");
	this.shape_2.setTransform(139.5848,18.8);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#6D7397").s().p("AhXCEQgfgzgBhFIAAgMQABhNAlg2QAkg3AwAAQAyAAAiA3QAiA2gBBNIgBAMQgEBFghAzQgkA2gxABQgygBgig2g");
	this.shape_3.setTransform(139.7032,20.225);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FF9900").s().p("ABSDtIAAgCIj5gnIAAACIhSgNIgBgCQgOgwAhgcQAlg5gLg4QgHgmAYgmQAfg+gHgpQgOgfAcgfIBhANIAAgBID9AhIAAABIAzAHQAOAQghAtQg1A6gJAmQgTBNAeA+QgWAxAMAxQgCAYAAAYg");
	this.shape_4.setTransform(69.3873,10.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-155.3,-42.9,310.70000000000005,85.8);


(lib.shape20b = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("ADCjKQjjCEBuExIj5gmQhhkRDSifg");
	this.shape.setTransform(-1.0173,0.075);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#110000").s().p("AinDFQhhkQDSigID9AiQjjCDBuEyg");
	this.shape_1.setTransform(-1.5049,0.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-22.4,-24.5,42.3,49.1);


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
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("ADCjKQjjCEBuExIj5gmQhhkRDSifg");
	this.shape.setTransform(-1.0173,0.075);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF0000").s().p("AinDFQhhkQDSigID9AiQjjCDBuEyg");
	this.shape_1.setTransform(-1.5049,0.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-22.4,-24.5,42.3,49.1);


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
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("AB4AAIgBAMQgEBFghAzQgkA2gxABQgygBgig2QgfgzgBhFIAAgMQABhNAlg2QAkg3AwAAQAyAAAiA3QAiA2gBBNg");
	this.shape.setTransform(139.7032,20.225);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1,0,0,3).p("A4JmiMAo8AFZIAIABARBhHIABAAIEjAjIAggFQA8AAAlBCQAlBEgHBfIgDAaQgHAvgSAnQgMAbgRAYQgwBDg9ABIgbgEQgqgNgcgzQggg6ABhPIACgaQAIhfAwhEQAjgwAqgNAVDGfIkXgeMgo1gGS");
	this.shape_1.setTransform(0.2001,-0.0227);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#F9F8FF").s().p("AgtDjQgqgNgdgzQggg6AChPIABgaQAIheAxhEQAjgxApgOIAfgEQA9AAAlBDQAlBEgIBeIgDAaQgHAugRAoQgMAbgRAYQgxBDg7AAgAhQh1QgkA3gCBMIAAAMQABBFAgAzQAiA2AyABQAwgBAkg2QAigzAEhFIAAgMQAChMgig3Qgjg2gxgBQgxABgkA2g");
	this.shape_2.setTransform(139.5848,18.8);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#6D7397").s().p("AQ8GDMgo1gGSIAAmRMAo8AFaIAIABIgIgBIAIABIAFAAIABAAIEjAjQgpANgjAwQgxBEgIBfIgBAaQgCBPAgA6QAdAzAqANgAUrFQQgggygBhGIAAgMQAChNAkg3QAkg2AyAAQAxAAAjA2QAiA3gCBNIAAAMQgEBGgiAyQgkA3gxAAQgyAAgig3g");
	this.shape_3.setTransform(-1.3218,-0.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-155.3,-42.9,310.70000000000005,85.8);


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

	// Layer_7
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("AAIAVIAVgPIgGgbIgagEIgCAAIAAACAAIAVIgJAFIgbgRIALgiIAMACIgIAcg");
	this.shape.setTransform(147.3077,27.8032);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AgRAKIAKgiIABgCIALACIgBACIgLgCIALACIgHAcIAVAQIgKAFg");
	this.shape_1.setTransform(146.275,27.725);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgVAHIAIgcIABgBIABAAIAbADIAGAcIgVAOg");
	this.shape_2.setTransform(148.05,27.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_6
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(1,0,0,3).p("AAIAVIgJAFIgbgRIALgiIAMACAAIAVIAVgPIgGgbIgagEIgCAAIAAACIgIAcg");
	this.shape_3.setTransform(139.5577,35.6532);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#999999").s().p("AgRAKIAKgiIABgCIALACIgBACIgLgCIALACIgHAcIAVAQIgKAFgAAEgWg");
	this.shape_4.setTransform(138.525,35.575);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgVAHIAJgcIAAgBIABAAIAbADIAGAcIgWAOg");
	this.shape_5.setTransform(140.3,35.425);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3}]}).wait(1));

	// Layer_5
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#000000").ss(1,0,0,3).p("AAIAVIgJAFIgbgRIALgiIAMACAAIAVIAVgPIgGgbIgagEIgCAAIAAACIgIAcg");
	this.shape_6.setTransform(130.7077,26.5032);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#999999").s().p("AgRAKIAKgiIALACIgLgCIABgCIALACIgBACIgHAcIAVAQIgKAFg");
	this.shape_7.setTransform(129.675,26.425);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgUAHIAIgcIAAgBIACAAIAaADIAFAcIgVAOg");
	this.shape_8.setTransform(131.45,26.275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6}]}).wait(1));

	// Layer_4
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#000000").ss(1,0,0,3).p("AAIAVIAVgPIgGgbIgagEIgCAAIAAACIgIAcIAVAQIgJAFIgbgRIALgiIAMAC");
	this.shape_9.setTransform(130.6577,11.3532);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#999999").s().p("AgRAKIAKgiIABgCIALACIgBACIgLgCIALACIgHAcIAVAQIgKAFgAAEgWg");
	this.shape_10.setTransform(129.625,11.275);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgVAHIAJgcIAAgBIABAAIAbADIAGAcIgVAOg");
	this.shape_11.setTransform(131.4,11.125);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9}]}).wait(1));

	// Layer_3
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#000000").ss(1,0,0,3).p("AAIAVIAVgPIgGgbIgagEIgCAAIAAACAAIAVIgJAFIgbgRIALgiIAMACIgIAcg");
	this.shape_12.setTransform(141.6577,1.9032);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#999999").s().p("AgRAKIAKgiIABgCIALACIgBACIgLgCIALACIgHAcIAVAQIgKAFg");
	this.shape_13.setTransform(140.625,1.825);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgVAHIAIgcIABgBIABAAIAbADIAFAcIgUAOg");
	this.shape_14.setTransform(142.4,1.675);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_12}]}).wait(1));

	// Layer_2
	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("#000000").ss(1,0,0,3).p("AAIAVIAVgPIgGgbIgagEIgCAAIAAACAAIAVIgJAFIgbgRIALgiIAMACIgIAcg");
	this.shape_15.setTransform(149.7077,15.1532);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#999999").s().p("AgRAKIAKgiIABgCIALACIgBACIgLgCIALACIgHAcIAVAQIgKAFg");
	this.shape_16.setTransform(148.675,15.075);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgUAHIAIgcIAAgBIACAAIAaADIAGAcIgWAOg");
	this.shape_17.setTransform(150.45,14.925);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_17},{t:this.shape_16},{t:this.shape_15}]}).wait(1));

	// Layer_1
	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f().s("#000000").ss(1,0,0,3).p("AATjkIARgBQA8AAAlBDQAlBEgHBeIgDAaQgHAvgSAnQgMAbgRAYQgwBDg8ABIgQgCIgRACIgbgEQgqgNgcgzQggg6ABhPIACgaQAIheAwhEQAjgxAqgNIAfgFIAQABIgPAEQgpANgjAxQgwBEgIBeIgCAaQgBBPAgA6QAcAzAqANIALAC");
	this.shape_18.setTransform(137.9348,18.7999);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#9D9D9D").s().p("AgSDlIgLgCQgqgNgcgzQgfg4AAhKIAAgHIACgaQAIheAwhEQAjgxApgOIAPgDIARgBQA8AAAlBDQAlBEgHBeIgDAaQgHAugSAoQgMAbgRAYQgwBDg8AAgAg+DjQgqgNgcgzQggg6ABhPIACgaQAIheAwhEQAjgxAqgOIAfgEIAQABIgPADQgpAOgjAxQgwBEgIBeIgCAaIAAAHQAABKAfA4QAcAzAqANIALACIgRABgAgSDlg");
	this.shape_19.setTransform(137.9348,18.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_19},{t:this.shape_18}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(120.6,-5.2,34.80000000000001,48.1);


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
	this.shape.graphics.f("#003366").s().p("AgRASQgHgIAAgKQAAgJAHgIQAIgHAJAAQAKAAAIAHQAHAIAAAJQAAAKgHAIQgIAHgKAAQgJAAgIgHg");
	this.shape.setTransform(-368.7,198.85);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#003366").s().p("AgRASQgHgIAAgKQAAgJAHgIQAIgHAJAAQAKAAAIAHQAHAIAAAJQAAAKgHAIQgIAHgKAAQgJAAgIgHg");
	this.shape_1.setTransform(-368.7,117.85);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#003366").s().p("AgRASQgHgIAAgKQAAgJAHgIQAIgHAJAAQAKAAAIAHQAHAIAAAJQAAAKgHAIQgIAHgKAAQgJAAgIgHg");
	this.shape_2.setTransform(-368.7,17.85);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-371.2,15.4,5,186);


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
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("AA1AHIgBAAIgygHIgNgBIgogF");
	this.shape.setTransform(83.2409,189.1523);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1,0,0,3).p("A3CjwIITA/IAAgaIgGgmIAdADIAPAAIAsgDIAWgGIAABSIC8AUIAAAHIAdAJQA2AaAsgXIAAgZIJFBKIAABJQA5AaAxgaQgEggAAgcIDzAeIAABMQA2AbA2gbIAAg+IPBB6IAAAaIgQAAIneB5I54jaIgMgBIgBgBIAAABA1AisIiCAiA3Ci+ICCASIJaBQIAzAHIAABzAsbAQIqnhaArmAXIAAAAIgNgCArmAXIAAhzAqzhVICeAVIChg7");
	this.shape_1.setTransform(157.6856,186.8839);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#DFD0D5").s().p("AAYA9IAAAAIgwgGIAAgBIAAhyIAxAHIAAByg");
	this.shape_2.setTransform(85.95,183.725);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#D3C9C8").s().p("AAaADIAMACgAglgEIANACIAAAAg");
	this.shape_3.setTransform(85.875,189.5);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#654E5E").s().p("AhAgZICBASIiBAhg");
	this.shape_4.setTransform(16.675,170.4);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#BEB6C1").s().p("AFhBgIgpgFIqlhbIAAg/ICBgiIJaBQIAABzg");
	this.shape_5.setTransform(46.8,179.35);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#ADA1AB").s().p("AqlAeIgMgBIAAhzIgzgHIpbhQIiBgSIAAgyIITBAIAAgaIgGgnIAdADIAPAAIAsgDIAWgGIAABSIC8AUIAAAHIAcAJQA2AbAsgYIAAgZIJFBKIAABJQA6AbAxgbQgEggAAgcIDyAfIAABLQA2AbA2gbIAAg+IPCB6IAAAbIgQAAInfB4gAoUhBIChg6IihA6IidgVICdAVg");
	this.shape_6.setTransform(157.5,186.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(9.2,161.1,296.6,51.70000000000002);


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

	// Layer_7
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("AAHATIATgNIgFgaIgYgDIgCAAIAAABAAHATIgIAFIgYgQIAJgfIALABIgHAag");
	this.shape.setTransform(288.1081,244.4587);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AgQAJIAKgfIAAgCIAKACIAAABIgKgBIAKABIgHAaIAUAPIgKAFg");
	this.shape_1.setTransform(287.175,244.375);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgTAHIAIgaIAAgCIABAAIAZAEIAFAZIgTAOg");
	this.shape_2.setTransform(288.775,244.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_6
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(1,0,0,3).p("AAHATIATgNIgFgaIgYgDIgCAAIAAABIgHAaIATAPIgIAFIgYgQIAJgfIALAB");
	this.shape_3.setTransform(281.0081,251.6587);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#999999").s().p("AgQAJIAKgfIAAgCIAKACIAAABIgKgBIAKABIgHAaIAUAPIgKAFgAAEgVg");
	this.shape_4.setTransform(280.075,251.575);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgTAHIAIgaIAAgCIABAAIAZAEIAFAZIgTAOg");
	this.shape_5.setTransform(281.675,251.425);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3}]}).wait(1));

	// Layer_5
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#000000").ss(1,0,0,3).p("AAHATIATgNIgFgaIgYgDIgCAAIAAABIgHAaIATAPIgIAFIgYgQIAJgfIALAB");
	this.shape_6.setTransform(272.8581,243.2587);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#999999").s().p("AgQAJIAKgfIAAgCIAKACIAAABIgKgBIAKABIgHAaIAUAPIgKAFgAAEgVg");
	this.shape_7.setTransform(271.925,243.175);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgTAHIAIgaIAAgCIABAAIAZAEIAFAZIgTAOg");
	this.shape_8.setTransform(273.525,243.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6}]}).wait(1));

	// Layer_4
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#000000").ss(1,0,0,3).p("AAHATIATgNIgFgaIgYgDIgCAAIAAABIgHAaIATAPIgIAFIgYgQIAJgfIALAB");
	this.shape_9.setTransform(272.8081,229.3087);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#999999").s().p("AgQAJIAKgfIAAgCIAKACIAAABIgKgBIAKABIgHAaIAUAPIgKAFgAAEgVg");
	this.shape_10.setTransform(271.875,229.225);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgTAHIAIgaIAAgCIABAAIAZAEIAFAZIgTAOg");
	this.shape_11.setTransform(273.475,229.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9}]}).wait(1));

	// Layer_3
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#000000").ss(1,0,0,3).p("AAHATIATgNIgFgaIgYgDIgCAAIAAABIgHAaIATAPIgIAFIgYgQIAJgfIALAB");
	this.shape_12.setTransform(282.9081,220.6087);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#999999").s().p("AgQAJIAKgfIAAgCIAKACIAAABIgKgBIAKABIgHAaIAUAPIgKAFgAAEgVg");
	this.shape_13.setTransform(281.975,220.525);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgTAHIAIgaIAAgCIABAAIAZAEIAFAZIgTAOg");
	this.shape_14.setTransform(283.575,220.375);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_12}]}).wait(1));

	// Layer_2
	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("#000000").ss(1,0,0,3).p("AAHATIATgNIgFgaIgYgDIgCAAIAAABAAHATIgIAFIgYgQIAJgfIALABIgHAag");
	this.shape_15.setTransform(290.3581,232.8087);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#999999").s().p("AgQAJIAKgfIAAgCIAKACIAAABIgKgBIAKABIgHAaIAUAPIgKAFg");
	this.shape_16.setTransform(289.425,232.725);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgTAHIAIgaIAAgCIABAAIAZAEIAFAZIgTAOg");
	this.shape_17.setTransform(291.025,232.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_17},{t:this.shape_16},{t:this.shape_15}]}).wait(1));

	// Layer_1
	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f().s("#000000").ss(1,0,0,3).p("AASjRIAPgCQA4AAAiA+QAiA+gHBXIgDAYQgGArgQAkQgLAZgQAWQgtA+g2AAIgQgBIgPABIgZgDQgmgMgagvQgeg2ABhIIACgYQAHhXAtg+QAggtAmgMIAdgFIAPACIgOADQgmAMggAtQgsA+gIBXIgBAYQgCBIAeA2QAaAvAnAMIAJAC");
	this.shape_18.setTransform(279.4831,236.1498);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#9D9D9D").s().p("AgRDTIgJgCQgngMgagvQgcgzAAhEIAAgHIABgYQAIhXAsg+QAggtAmgNIAOgDIAPgBQA4AAAiA+QAiA+gHBXIgDAYQgGAqgQAlQgLAZgQAWQgtA9g2ABgAg5DRQgmgMgagvQgeg2ABhIIACgYQAHhXAtg+QAggtAmgNIAdgEIAPABIgOADQgmANggAtQgsA+gIBXIgBAYIAAAHQAABEAcAzQAaAvAnAMIAJACIgPABgAgRDTg");
	this.shape_19.setTransform(279.4831,236.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_19},{t:this.shape_18}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(263.4,214,32.200000000000045,44.39999999999998);


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
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("ADIjIQjjCIBuEtAg1jqQjRCcBgEU");
	this.shape.setTransform(81.2945,11.0107);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF0000").s().p("AioDFQhgkUDSicID9AiQjkCIBuEtg");
	this.shape_1.setTransform(81.4167,11.125);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#6D7397").s().p("AR/GDIj/goQhvkuDkiHICZAVIgIgBIAIABIAFAAIABAAIEjAjQgpANgjAwQgxBEgIBfIgBAaQgCBPAgA6QAdAzAqANgA22gPIAAmRMAitAElQjRCbBgEVgASUhFgASThFIgFAAIAGAAgASOhFg");
	this.shape_2.setTransform(-0.025,-0.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-146.3,-41.7,292.6,83.4);


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

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("AB3AMQgEBFghAzQgkA2gxABQgygBgig2QgfgzgBhFIAAgMQABhNAlg2QAkg3AwAAQAyAAAiA3QAiA2gBBNg");
	this.shape.setTransform(139.7032,20.225);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1,0,0,3).p("AVlgkIAggFQA8AAAlBCQAlBEgHBfIgDAaQgHAvgSAnQgMAbgRAYQgwBDg9ABIgbgEA4JmiMAo8AFZIEyAlQgqANgjAwQgwBEgIBfIgCAaQgBBPAgA6QAcAzAqANIkXgeMgo1gGS");
	this.shape_1.setTransform(0.2001,-0.0227);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(202,162,2,0.8)").s().p("ASBGDMgo1gGSIgFAAIAAmRIAFAAMAo8AFZIEyAlQgqANgiAwQgxBEgIBfIgCAaQgBBPAgA6QAcAzAqANg");
	this.shape_2.setTransform(-8.3,-0.225);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#F9F8FF").s().p("AgtDjQgqgNgdgzQggg6AChPIABgaQAIheAxhEQAjgxApgOIAfgEQA9AAAlBDQAlBEgIBeIgDAaQgHAugRAoQgMAbgRAYQgxBDg7AAgAhQh1QgkA3gCBMIAAAMQABBFAgAzQAiA2AyABQAwgBAkg2QAigzAEhFIAAgMQAChMgig3Qgjg2gxgBQgxABgkA2g");
	this.shape_3.setTransform(139.5848,18.8);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#6D7397").s().p("AhXCEQgfgzgBhFIAAgMQABhNAlg2QAkg3AwAAQAyAAAiA3QAiA2gBBNIgBAMQgEBFghAzQgkA2gxABQgygBgig2g");
	this.shape_4.setTransform(139.7032,20.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-155.3,-42.9,310.70000000000005,85.8);


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
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("AB3AMQgEBFghAzQgkA2gxABQgygBgig2QgfgzgBhFIAAgMQABhNAlg2QAkg3AwAAQAyAAAiA3QAiA2gBBNg");
	this.shape.setTransform(139.7032,20.225);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1,0,0,3).p("AVlgkIAggFQA8AAAlBCQAlBEgHBfIgDAaQgHAvgSAnQgMAbgRAYQgwBDg9ABIgbgEA4JmiMAo8AFZIEyAlQgqANgjAwQgwBEgIBfIgCAaQgBBPAgA6QAcAzAqANIkXgeMgo1gGS");
	this.shape_1.setTransform(0.2001,-0.0227);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("ASBGDMgo1gGSIgFAAIAAmRIAFAAMAo8AFZIEyAlQgqANgiAwQgxBEgIBfIgCAaQgBBPAgA6QAcAzAqANg");
	this.shape_2.setTransform(-8.3,-0.225);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#F9F8FF").s().p("AgtDjQgqgNgdgzQggg6AChPIABgaQAIheAxhEQAjgxApgOIAfgEQA9AAAlBDQAlBEgIBeIgDAaQgHAugRAoQgMAbgRAYQgxBDg7AAgAhQh1QgkA3gCBMIAAAMQABBFAgAzQAiA2AyABQAwgBAkg2QAigzAEhFIAAgMQAChMgig3Qgjg2gxgBQgxABgkA2g");
	this.shape_3.setTransform(139.5848,18.8);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#6D7397").s().p("AhXCEQgfgzgBhFIAAgMQABhNAlg2QAkg3AwAAQAyAAAiA3QAiA2gBBNIgBAMQgEBFghAzQgkA2gxABQgygBgig2g");
	this.shape_4.setTransform(139.7032,20.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-155.3,-42.9,310.70000000000005,85.8);


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
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("A5CovIJBBFIAAgcIgGgqIAfADIARAAIAwgDIAXgGIAABYIDNAXIAAAHIAfAKQA6AcAwgZIAAgbIJ4BQIAABPQA+AeA1geQgEgiAAgfIEIAiIAABTQA7AdA6gdIAAhEIQVCFIAAAcIgRAAIoICEIhEAWIgFABIAAI7I64j/Ig5gIIgCg0IA5AJIACAzA21nlIiNAlA5Cn4ICNATIKPBXIA3AIIAAB9IcVDvAsmkQIAAh+Arvj8IAAgNIgBAAIABANIAAAZIbRDfArvmGICrAXICvhAAsmjrIAAglIschqAsmjrIschpArgC9Ig4gIIACBIIssiCArgC9ICkAWQAzAWgUAfQgFAIgLAJIgwAAIiAgTIgDhJIgPmgAsUExIsuh/A5CA7IMqB6IgOmg");
	this.shape.setTransform(0.1855,-0.0321);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#654E5E").s().p("AhFgbICLATIiLAkg");
	this.shape_1.setTransform(-153.075,-47.725);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FEF0FD").s().p("AmWgjIAAg3IMrCBIACA0g");
	this.shape_2.setTransform(-119.4,21.375);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#BEB6C1").s().p("AmNAAIAAhEICNgmIKOBYIAAB8g");
	this.shape_3.setTransform(-120.325,-38);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#DFD0D5").s().p("AgSFcIgCg0IgChIIgPmgIAAglIAAh+IA3AIIAAB9IgBAAIABANIAAAZIAPGgIg3gIIA3AIIACBJIg3gJIA3AJIACAzg");
	this.shape_4.setTransform(-76.8,-4.325);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#ADA1AB").s().p("ArtAfIAAh8Ig4gIIqPhXIiMgTIAAg3IJBBFIAAgcIgHgqIAgADIAQAAIAxgDIAXgGIAABYIDMAXIAAAHIAfAKQA7AcAwgZIAAgbIJ4BQIAABPQA+AdA0gdQgDgiAAgfIEHAiIAABSQA7AdA7gdIAAhDIQVCEIAAAcIgSAAIoHCEgApChGICvhAIivBAIirgXICrAXg");
	this.shape_5.setTransform(0,-29.725);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#D3C9C8").s().p("AnNDaIgCgyICBATIAvAAQALgJAGgIQAFgJAAgIQAAgUglgQIijgXICjAXQAlAQAAAUQAAAIgFAJQgGAIgLAJIgvAAIiBgTIgChKIgPmgIbRDgIgFABIAAI7gA0zAdIAAg/IAAmQIAAgnIMbBqIAAAmIsbhpIMbBpIAOGgIsph5IMpB5IADBIgATxhigAnglCIAAgYIAAgNIcUDvIhDAWg");
	this.shape_6.setTransform(-26.875,9.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-161.1,-57.7,322.2,115.5);


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
	this.instance = new lib.CachedBmp_100();
	this.instance.setTransform(9.65,-0.4,0.3329,0.3329);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(9.7,-0.4,347.5,373.2);


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
	this.instance = new lib.CachedBmp_99();
	this.instance.setTransform(5,12,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_98();
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
	this.instance = new lib.CachedBmp_97();
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


(lib.sprite28 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.shape27("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite28, new cjs.Rectangle(-58.1,-32.5,116.2,65), null);


(lib.sprite21b = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.shape20b("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite21b, new cjs.Rectangle(-22.4,-24.5,42.3,49.1), null);


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

}).prototype = getMCSymbolPrototype(lib.sprite21, new cjs.Rectangle(-22.4,-24.5,42.3,49.1), null);


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

}).prototype = getMCSymbolPrototype(lib.sprite9, new cjs.Rectangle(-146.3,-41.7,292.6,83.4), null);


(lib.sprite4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.shape3("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite4, new cjs.Rectangle(-161.1,-57.7,322.2,115.5), null);


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

	// timeline functions:
	this.frame_219 = function() {
		this.stop(); // erukamo
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(219).call(this.frame_219).wait(1));

	// Layer_5
	this.instance = new lib.sprite9();
	this.instance.setTransform(-8,-0.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({alpha:0.6211},3).to({alpha:0.3281},3).to({alpha:0.1797},2).to({alpha:0.0508},3).to({alpha:0.0195},1).to({alpha:0},2).to({_off:true},1).wait(174).to({_off:false},0).wait(1).to({alpha:0.0117},2).to({alpha:0.0195},1).to({alpha:0.0391},2).to({alpha:0.0781},3).to({alpha:0.1016},1).to({alpha:0.1719},3).to({alpha:0.1992},1).to({alpha:0.6914},12).to({alpha:1},4).wait(1));

	// Mask_Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_0 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_1 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_2 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_3 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_4 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_5 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB3IgQGSg");
	var mask_graphics_6 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_7 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_8 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_9 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_10 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB3IgQGSg");
	var mask_graphics_11 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_12 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_13 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_14 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_15 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_16 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_17 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_18 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_19 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_20 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB4IgQGRg");
	var mask_graphics_21 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_22 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_23 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_24 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_25 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_26 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_27 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_28 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_29 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_30 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_31 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB3IgQGSg");
	var mask_graphics_32 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_33 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_34 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_35 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_36 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB4IgQGRg");
	var mask_graphics_37 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_38 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_39 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_40 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_41 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_42 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB3IgQGSg");
	var mask_graphics_43 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_44 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_45 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_46 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_47 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB3IgQGSg");
	var mask_graphics_48 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_49 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_50 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_51 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_52 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_53 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_54 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_55 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_56 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_57 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_58 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB3IgQGSg");
	var mask_graphics_59 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_60 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_61 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_62 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_63 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB3IgQGSg");
	var mask_graphics_64 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_65 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_66 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_67 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_68 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_69 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_70 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_71 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_72 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_73 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB4IgQGRg");
	var mask_graphics_74 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_75 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_76 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_77 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_78 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_79 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_80 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_81 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_82 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_83 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_84 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB3IgQGSg");
	var mask_graphics_85 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_86 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_87 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_88 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_89 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB4IgQGRg");
	var mask_graphics_90 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_91 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_92 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_93 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_94 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB4IgQGRg");
	var mask_graphics_95 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB3IgQGSg");
	var mask_graphics_96 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_97 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_98 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_99 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_100 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB3IgQGSg");
	var mask_graphics_101 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_102 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_103 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_104 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_105 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_106 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_107 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_108 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_109 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_110 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_111 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB3IgQGSg");
	var mask_graphics_112 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_113 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_114 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_115 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_116 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB3IgQGSg");
	var mask_graphics_117 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_118 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_119 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_120 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_121 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB4IgQGRg");
	var mask_graphics_122 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_123 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_124 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_125 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_126 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB4IgQGRg");
	var mask_graphics_127 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_128 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_129 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_130 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_131 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_132 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_133 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_134 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_135 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_136 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_137 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB3IgQGSg");
	var mask_graphics_138 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_139 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_140 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_141 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_142 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_143 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_144 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_145 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_146 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_147 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_148 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_149 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_150 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_151 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_152 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_153 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB3IgQGSg");
	var mask_graphics_154 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_155 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_156 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_157 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_158 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_159 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_160 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_161 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_162 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_163 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_164 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB3IgQGSg");
	var mask_graphics_165 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_166 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_167 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_168 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_169 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB3IgQGSg");
	var mask_graphics_170 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_171 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_172 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_173 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_174 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB4IgQGRg");
	var mask_graphics_175 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_176 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_177 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_178 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_179 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB4IgQGRg");
	var mask_graphics_180 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_181 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_182 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_183 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_184 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_185 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB3IgQGSg");
	var mask_graphics_186 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_187 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_188 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_189 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_190 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_191 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_192 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_193 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_194 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_195 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_196 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_197 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_198 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_199 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_200 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_201 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_202 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_203 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_204 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_205 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_206 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB3IgQGSg");
	var mask_graphics_207 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_208 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_209 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_210 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_211 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_212 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_213 = new cjs.Graphics().p("A4uCOIAQmSMAxNAB3IgQGSg");
	var mask_graphics_214 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_215 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_216 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_217 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB3IgQGSg");
	var mask_graphics_218 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");
	var mask_graphics_219 = new cjs.Graphics().p("A4uCNIAQmRMAxNAB4IgQGRg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:mask_graphics_0,x:-4,y:57.3}).wait(1).to({graphics:mask_graphics_1,x:-4,y:57.2}).wait(1).to({graphics:mask_graphics_2,x:-4,y:57.15}).wait(1).to({graphics:mask_graphics_3,x:-4,y:57.05}).wait(1).to({graphics:mask_graphics_4,x:-4,y:56.95}).wait(1).to({graphics:mask_graphics_5,x:-4,y:56.9}).wait(1).to({graphics:mask_graphics_6,x:-4,y:56.8}).wait(1).to({graphics:mask_graphics_7,x:-4,y:56.7}).wait(1).to({graphics:mask_graphics_8,x:-4,y:56.6}).wait(1).to({graphics:mask_graphics_9,x:-4,y:56.55}).wait(1).to({graphics:mask_graphics_10,x:-4,y:56.45}).wait(1).to({graphics:mask_graphics_11,x:-4,y:56.35}).wait(1).to({graphics:mask_graphics_12,x:-4,y:56.3}).wait(1).to({graphics:mask_graphics_13,x:-4,y:56.2}).wait(1).to({graphics:mask_graphics_14,x:-4,y:56.1}).wait(1).to({graphics:mask_graphics_15,x:-4,y:56.05}).wait(1).to({graphics:mask_graphics_16,x:-4,y:55.95}).wait(1).to({graphics:mask_graphics_17,x:-4,y:55.85}).wait(1).to({graphics:mask_graphics_18,x:-4,y:55.75}).wait(1).to({graphics:mask_graphics_19,x:-4,y:55.7}).wait(1).to({graphics:mask_graphics_20,x:-4,y:55.6}).wait(1).to({graphics:mask_graphics_21,x:-4,y:55.5}).wait(1).to({graphics:mask_graphics_22,x:-4,y:55.45}).wait(1).to({graphics:mask_graphics_23,x:-4,y:55.35}).wait(1).to({graphics:mask_graphics_24,x:-4,y:55.25}).wait(1).to({graphics:mask_graphics_25,x:-4,y:55.2}).wait(1).to({graphics:mask_graphics_26,x:-4,y:55.1}).wait(1).to({graphics:mask_graphics_27,x:-4,y:55}).wait(1).to({graphics:mask_graphics_28,x:-4,y:54.9}).wait(1).to({graphics:mask_graphics_29,x:-4,y:54.85}).wait(1).to({graphics:mask_graphics_30,x:-4,y:54.75}).wait(1).to({graphics:mask_graphics_31,x:-4,y:54.65}).wait(1).to({graphics:mask_graphics_32,x:-4,y:54.6}).wait(1).to({graphics:mask_graphics_33,x:-4,y:54.5}).wait(1).to({graphics:mask_graphics_34,x:-4,y:54.4}).wait(1).to({graphics:mask_graphics_35,x:-4,y:54.35}).wait(1).to({graphics:mask_graphics_36,x:-4,y:54.25}).wait(1).to({graphics:mask_graphics_37,x:-4,y:54.15}).wait(1).to({graphics:mask_graphics_38,x:-4,y:54.1}).wait(1).to({graphics:mask_graphics_39,x:-4,y:54}).wait(1).to({graphics:mask_graphics_40,x:-4,y:53.9}).wait(1).to({graphics:mask_graphics_41,x:-4,y:53.8}).wait(1).to({graphics:mask_graphics_42,x:-4,y:53.75}).wait(1).to({graphics:mask_graphics_43,x:-4,y:53.65}).wait(1).to({graphics:mask_graphics_44,x:-4,y:53.55}).wait(1).to({graphics:mask_graphics_45,x:-4,y:53.5}).wait(1).to({graphics:mask_graphics_46,x:-4,y:53.4}).wait(1).to({graphics:mask_graphics_47,x:-4,y:53.3}).wait(1).to({graphics:mask_graphics_48,x:-4,y:53.25}).wait(1).to({graphics:mask_graphics_49,x:-4,y:53.15}).wait(1).to({graphics:mask_graphics_50,x:-4,y:53.05}).wait(1).to({graphics:mask_graphics_51,x:-4,y:52.95}).wait(1).to({graphics:mask_graphics_52,x:-4,y:52.9}).wait(1).to({graphics:mask_graphics_53,x:-4,y:52.8}).wait(1).to({graphics:mask_graphics_54,x:-4,y:52.7}).wait(1).to({graphics:mask_graphics_55,x:-4,y:52.65}).wait(1).to({graphics:mask_graphics_56,x:-4,y:52.55}).wait(1).to({graphics:mask_graphics_57,x:-4,y:52.45}).wait(1).to({graphics:mask_graphics_58,x:-4,y:52.4}).wait(1).to({graphics:mask_graphics_59,x:-4,y:52.3}).wait(1).to({graphics:mask_graphics_60,x:-4,y:52.2}).wait(1).to({graphics:mask_graphics_61,x:-4,y:52.1}).wait(1).to({graphics:mask_graphics_62,x:-4,y:52.05}).wait(1).to({graphics:mask_graphics_63,x:-4,y:51.95}).wait(1).to({graphics:mask_graphics_64,x:-4,y:51.85}).wait(1).to({graphics:mask_graphics_65,x:-4,y:51.8}).wait(1).to({graphics:mask_graphics_66,x:-4,y:51.7}).wait(1).to({graphics:mask_graphics_67,x:-4,y:51.6}).wait(1).to({graphics:mask_graphics_68,x:-4,y:51.55}).wait(1).to({graphics:mask_graphics_69,x:-4,y:51.45}).wait(1).to({graphics:mask_graphics_70,x:-4,y:51.35}).wait(1).to({graphics:mask_graphics_71,x:-4,y:51.25}).wait(1).to({graphics:mask_graphics_72,x:-4,y:51.2}).wait(1).to({graphics:mask_graphics_73,x:-4,y:51.1}).wait(1).to({graphics:mask_graphics_74,x:-4,y:51}).wait(1).to({graphics:mask_graphics_75,x:-4,y:50.95}).wait(1).to({graphics:mask_graphics_76,x:-4,y:50.85}).wait(1).to({graphics:mask_graphics_77,x:-4,y:50.75}).wait(1).to({graphics:mask_graphics_78,x:-4,y:50.7}).wait(1).to({graphics:mask_graphics_79,x:-4,y:50.6}).wait(1).to({graphics:mask_graphics_80,x:-4,y:50.5}).wait(1).to({graphics:mask_graphics_81,x:-4,y:50.45}).wait(1).to({graphics:mask_graphics_82,x:-4,y:50.35}).wait(1).to({graphics:mask_graphics_83,x:-4,y:50.25}).wait(1).to({graphics:mask_graphics_84,x:-4,y:50.15}).wait(1).to({graphics:mask_graphics_85,x:-4,y:50.1}).wait(1).to({graphics:mask_graphics_86,x:-4,y:50}).wait(1).to({graphics:mask_graphics_87,x:-4,y:49.9}).wait(1).to({graphics:mask_graphics_88,x:-4,y:49.85}).wait(1).to({graphics:mask_graphics_89,x:-4,y:49.75}).wait(1).to({graphics:mask_graphics_90,x:-4,y:49.65}).wait(1).to({graphics:mask_graphics_91,x:-4,y:49.6}).wait(1).to({graphics:mask_graphics_92,x:-4,y:49.5}).wait(1).to({graphics:mask_graphics_93,x:-4,y:49.4}).wait(1).to({graphics:mask_graphics_94,x:-4,y:49.3}).wait(1).to({graphics:mask_graphics_95,x:-4,y:49.25}).wait(1).to({graphics:mask_graphics_96,x:-4,y:49.15}).wait(1).to({graphics:mask_graphics_97,x:-4,y:49.05}).wait(1).to({graphics:mask_graphics_98,x:-4,y:49}).wait(1).to({graphics:mask_graphics_99,x:-4,y:48.9}).wait(1).to({graphics:mask_graphics_100,x:-4,y:48.8}).wait(1).to({graphics:mask_graphics_101,x:-4,y:48.75}).wait(1).to({graphics:mask_graphics_102,x:-4,y:48.65}).wait(1).to({graphics:mask_graphics_103,x:-4,y:48.55}).wait(1).to({graphics:mask_graphics_104,x:-4,y:48.45}).wait(1).to({graphics:mask_graphics_105,x:-4,y:48.4}).wait(1).to({graphics:mask_graphics_106,x:-4,y:48.3}).wait(1).to({graphics:mask_graphics_107,x:-4,y:48.2}).wait(1).to({graphics:mask_graphics_108,x:-4,y:48.15}).wait(1).to({graphics:mask_graphics_109,x:-4,y:48.05}).wait(1).to({graphics:mask_graphics_110,x:-4,y:47.95}).wait(1).to({graphics:mask_graphics_111,x:-4,y:47.9}).wait(1).to({graphics:mask_graphics_112,x:-4,y:47.8}).wait(1).to({graphics:mask_graphics_113,x:-4,y:47.7}).wait(1).to({graphics:mask_graphics_114,x:-4,y:47.65}).wait(1).to({graphics:mask_graphics_115,x:-4,y:47.55}).wait(1).to({graphics:mask_graphics_116,x:-4,y:47.45}).wait(1).to({graphics:mask_graphics_117,x:-4,y:47.35}).wait(1).to({graphics:mask_graphics_118,x:-4,y:47.3}).wait(1).to({graphics:mask_graphics_119,x:-4,y:47.2}).wait(1).to({graphics:mask_graphics_120,x:-4,y:47.1}).wait(1).to({graphics:mask_graphics_121,x:-4,y:47.05}).wait(1).to({graphics:mask_graphics_122,x:-4,y:46.95}).wait(1).to({graphics:mask_graphics_123,x:-4,y:46.85}).wait(1).to({graphics:mask_graphics_124,x:-4,y:46.8}).wait(1).to({graphics:mask_graphics_125,x:-4,y:46.7}).wait(1).to({graphics:mask_graphics_126,x:-4,y:46.6}).wait(1).to({graphics:mask_graphics_127,x:-4,y:46.5}).wait(1).to({graphics:mask_graphics_128,x:-4,y:46.45}).wait(1).to({graphics:mask_graphics_129,x:-4,y:46.35}).wait(1).to({graphics:mask_graphics_130,x:-4,y:46.25}).wait(1).to({graphics:mask_graphics_131,x:-4,y:46.2}).wait(1).to({graphics:mask_graphics_132,x:-4,y:46.1}).wait(1).to({graphics:mask_graphics_133,x:-4,y:46}).wait(1).to({graphics:mask_graphics_134,x:-4,y:45.95}).wait(1).to({graphics:mask_graphics_135,x:-4,y:45.85}).wait(1).to({graphics:mask_graphics_136,x:-4,y:45.75}).wait(1).to({graphics:mask_graphics_137,x:-4,y:45.65}).wait(1).to({graphics:mask_graphics_138,x:-4,y:45.6}).wait(1).to({graphics:mask_graphics_139,x:-4,y:45.5}).wait(1).to({graphics:mask_graphics_140,x:-4,y:45.4}).wait(1).to({graphics:mask_graphics_141,x:-4,y:45.35}).wait(1).to({graphics:mask_graphics_142,x:-4,y:45.25}).wait(1).to({graphics:mask_graphics_143,x:-4,y:45.15}).wait(1).to({graphics:mask_graphics_144,x:-4,y:45.1}).wait(1).to({graphics:mask_graphics_145,x:-4,y:45}).wait(1).to({graphics:mask_graphics_146,x:-4,y:44.9}).wait(1).to({graphics:mask_graphics_147,x:-4,y:44.85}).wait(1).to({graphics:mask_graphics_148,x:-4,y:44.75}).wait(1).to({graphics:mask_graphics_149,x:-4,y:44.65}).wait(1).to({graphics:mask_graphics_150,x:-4,y:44.55}).wait(1).to({graphics:mask_graphics_151,x:-4,y:44.5}).wait(1).to({graphics:mask_graphics_152,x:-4,y:44.4}).wait(1).to({graphics:mask_graphics_153,x:-4,y:44.3}).wait(1).to({graphics:mask_graphics_154,x:-4,y:44.25}).wait(1).to({graphics:mask_graphics_155,x:-4,y:44.15}).wait(1).to({graphics:mask_graphics_156,x:-4,y:44.05}).wait(1).to({graphics:mask_graphics_157,x:-4,y:44}).wait(1).to({graphics:mask_graphics_158,x:-4,y:43.9}).wait(1).to({graphics:mask_graphics_159,x:-4,y:43.8}).wait(1).to({graphics:mask_graphics_160,x:-4,y:43.7}).wait(1).to({graphics:mask_graphics_161,x:-4,y:43.65}).wait(1).to({graphics:mask_graphics_162,x:-4,y:43.55}).wait(1).to({graphics:mask_graphics_163,x:-4,y:43.45}).wait(1).to({graphics:mask_graphics_164,x:-4,y:43.4}).wait(1).to({graphics:mask_graphics_165,x:-4,y:43.3}).wait(1).to({graphics:mask_graphics_166,x:-4,y:43.2}).wait(1).to({graphics:mask_graphics_167,x:-4,y:43.15}).wait(1).to({graphics:mask_graphics_168,x:-4,y:43.05}).wait(1).to({graphics:mask_graphics_169,x:-4,y:42.95}).wait(1).to({graphics:mask_graphics_170,x:-4,y:42.85}).wait(1).to({graphics:mask_graphics_171,x:-4,y:42.8}).wait(1).to({graphics:mask_graphics_172,x:-4,y:42.7}).wait(1).to({graphics:mask_graphics_173,x:-4,y:42.6}).wait(1).to({graphics:mask_graphics_174,x:-4,y:42.55}).wait(1).to({graphics:mask_graphics_175,x:-4,y:42.45}).wait(1).to({graphics:mask_graphics_176,x:-4,y:42.35}).wait(1).to({graphics:mask_graphics_177,x:-4,y:42.3}).wait(1).to({graphics:mask_graphics_178,x:-4,y:42.2}).wait(1).to({graphics:mask_graphics_179,x:-4,y:42.1}).wait(1).to({graphics:mask_graphics_180,x:-4,y:42}).wait(1).to({graphics:mask_graphics_181,x:-4,y:41.95}).wait(1).to({graphics:mask_graphics_182,x:-4,y:41.85}).wait(1).to({graphics:mask_graphics_183,x:-4,y:41.75}).wait(1).to({graphics:mask_graphics_184,x:-4,y:41.7}).wait(1).to({graphics:mask_graphics_185,x:-4,y:41.6}).wait(1).to({graphics:mask_graphics_186,x:-4,y:41.5}).wait(1).to({graphics:mask_graphics_187,x:-4,y:41.45}).wait(1).to({graphics:mask_graphics_188,x:-4,y:41.35}).wait(1).to({graphics:mask_graphics_189,x:-4,y:41.25}).wait(1).to({graphics:mask_graphics_190,x:-4,y:41.2}).wait(1).to({graphics:mask_graphics_191,x:-4,y:41.1}).wait(1).to({graphics:mask_graphics_192,x:-4,y:41}).wait(1).to({graphics:mask_graphics_193,x:-4,y:40.9}).wait(1).to({graphics:mask_graphics_194,x:-4,y:40.85}).wait(1).to({graphics:mask_graphics_195,x:-4,y:40.75}).wait(1).to({graphics:mask_graphics_196,x:-4,y:40.65}).wait(1).to({graphics:mask_graphics_197,x:-4,y:40.6}).wait(1).to({graphics:mask_graphics_198,x:-4,y:40.5}).wait(1).to({graphics:mask_graphics_199,x:-4,y:40.4}).wait(1).to({graphics:mask_graphics_200,x:-4,y:40.35}).wait(1).to({graphics:mask_graphics_201,x:-4,y:40.25}).wait(1).to({graphics:mask_graphics_202,x:-4,y:40.15}).wait(1).to({graphics:mask_graphics_203,x:-4,y:40.05}).wait(1).to({graphics:mask_graphics_204,x:-4,y:40}).wait(1).to({graphics:mask_graphics_205,x:-4,y:39.9}).wait(1).to({graphics:mask_graphics_206,x:-4,y:39.8}).wait(1).to({graphics:mask_graphics_207,x:-4,y:39.75}).wait(1).to({graphics:mask_graphics_208,x:-4,y:39.65}).wait(1).to({graphics:mask_graphics_209,x:-4,y:39.55}).wait(1).to({graphics:mask_graphics_210,x:-4,y:39.5}).wait(1).to({graphics:mask_graphics_211,x:-4,y:39.4}).wait(1).to({graphics:mask_graphics_212,x:-4,y:39.3}).wait(1).to({graphics:mask_graphics_213,x:-4,y:39.2}).wait(1).to({graphics:mask_graphics_214,x:-4,y:39.15}).wait(1).to({graphics:mask_graphics_215,x:-4,y:39.05}).wait(1).to({graphics:mask_graphics_216,x:-4,y:38.95}).wait(1).to({graphics:mask_graphics_217,x:-4,y:38.9}).wait(1).to({graphics:mask_graphics_218,x:-4,y:38.8}).wait(1).to({graphics:mask_graphics_219,x:-4,y:38.8}).wait(1));

	// Masked_Layer_3___2
	this.instance_1 = new lib.shape7("synched",0);

	var maskedShapeInstanceList = [this.instance_1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(220));

	// Layer_1
	this.instance_2 = new lib.shape5("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(220));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-155.3,-42.9,310.70000000000005,85.8);


(lib.sprite29 = function(mode,startPosition,loop,reversed) {
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

	// Masked_Layer_216___212
	this.instance = new lib.shape15("synched",0);
	this.instance.setTransform(-180,0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1090));

	// Masked_Layer_213___212
	this.instance_1 = new lib.text14("synched",0);
	this.instance_1.setTransform(-540.75,11.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1090));

	// Layer_211
	this.instance_2 = new lib.shape11("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1090));

	// Layer_210
	this.instance_3 = new lib.shape24("synched",0);
	this.instance_3.setTransform(296.7,237.35,0.92,0.92,29.9997);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1033).to({_off:false},0).to({scaleX:0.9187,scaleY:0.9187,rotation:27.3396,x:299.15,y:237,alpha:0.9102},1).to({scaleX:0.9192,scaleY:0.9192,rotation:14.5163,x:311.45,y:234.8,alpha:0.4805},6).to({scaleX:0.9197,scaleY:0.9197,rotation:5.5451,x:319.95,y:233.4,alpha:0.1914},6).to({scaleX:0.9198,scaleY:0.9198,rotation:3.5334,x:321.85,y:233.1,alpha:0.1211},2).to({scaleX:0.9199,scaleY:0.9199,rotation:2.0106,x:323.35,y:232.75,alpha:0.0703},2).to({rotation:1.2926,x:323.95,y:232.65,alpha:0.0508},1).to({rotation:0.7898,x:324.45,y:232.6,alpha:0.0313},1).to({scaleX:0.92,scaleY:0.92,rotation:0.0561,x:325.1,y:232.55,alpha:0.0117},2).to({rotation:0.0143,x:325.25,y:232.5,alpha:0},1).wait(1).to({rotation:0},0).wait(34));

	// Layer_202
	this.instance_4 = new lib.sprite28();
	this.instance_4.setTransform(168.55,205.55,0.3869,0.3869);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_200
	this.instance_5 = new lib.sprite28();
	this.instance_5.setTransform(151.35,208.5,0.3869,0.3869);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_198
	this.instance_6 = new lib.sprite28();
	this.instance_6.setTransform(160.55,191.45,0.3869,0.3869);
	this.instance_6.alpha = 0;
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_196
	this.instance_7 = new lib.sprite28();
	this.instance_7.setTransform(150,228.1,0.3869,0.3869);
	this.instance_7.alpha = 0;
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_194
	this.instance_8 = new lib.sprite28();
	this.instance_8.setTransform(196.15,216.6,0.3869,0.3869);
	this.instance_8.alpha = 0;
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_192
	this.instance_9 = new lib.sprite28();
	this.instance_9.setTransform(178.95,219.5,0.3869,0.3869);
	this.instance_9.alpha = 0;
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_190
	this.instance_10 = new lib.sprite28();
	this.instance_10.setTransform(188.15,202.5,0.3869,0.3869);
	this.instance_10.alpha = 0;
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_188
	this.instance_11 = new lib.sprite28();
	this.instance_11.setTransform(177.6,239.15,0.3869,0.3869);
	this.instance_11.alpha = 0;
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_186
	this.instance_12 = new lib.sprite28();
	this.instance_12.setTransform(218.25,216.6,0.3869,0.3869);
	this.instance_12.alpha = 0;
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_184
	this.instance_13 = new lib.sprite28();
	this.instance_13.setTransform(201.05,219.5,0.3869,0.3869);
	this.instance_13.alpha = 0;
	this.instance_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_182
	this.instance_14 = new lib.sprite28();
	this.instance_14.setTransform(210.25,202.5,0.3869,0.3869);
	this.instance_14.alpha = 0;
	this.instance_14._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_180
	this.instance_15 = new lib.sprite28();
	this.instance_15.setTransform(199.65,239.15,0.3869,0.3869);
	this.instance_15.alpha = 0;
	this.instance_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_178
	this.instance_16 = new lib.sprite28();
	this.instance_16.setTransform(240.35,216.6,0.3869,0.3869);
	this.instance_16.alpha = 0;
	this.instance_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_176
	this.instance_17 = new lib.sprite28();
	this.instance_17.setTransform(223.15,219.5,0.3869,0.3869);
	this.instance_17.alpha = 0;
	this.instance_17._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_174
	this.instance_18 = new lib.sprite28();
	this.instance_18.setTransform(232.35,202.5,0.3869,0.3869);
	this.instance_18.alpha = 0;
	this.instance_18._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_172
	this.instance_19 = new lib.sprite28();
	this.instance_19.setTransform(221.75,239.15,0.3869,0.3869);
	this.instance_19.alpha = 0;
	this.instance_19._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_170
	this.instance_20 = new lib.sprite28();
	this.instance_20.setTransform(253.95,246.55,0.3869,0.3869);
	this.instance_20.alpha = 0;
	this.instance_20._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_168
	this.instance_21 = new lib.sprite28();
	this.instance_21.setTransform(253.95,227.6,0.3869,0.3869);
	this.instance_21.alpha = 0;
	this.instance_21._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_166
	this.instance_22 = new lib.sprite28();
	this.instance_22.setTransform(269.25,211.15,0.3869,0.3869);
	this.instance_22.alpha = 0;
	this.instance_22._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_164
	this.instance_23 = new lib.sprite28();
	this.instance_23.setTransform(277.25,252.65,0.3869,0.3869);
	this.instance_23.alpha = 0;
	this.instance_23._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_162
	this.instance_24 = new lib.sprite28();
	this.instance_24.setTransform(281.7,230.55,0.3869,0.3869);
	this.instance_24.alpha = 0;
	this.instance_24._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_160
	this.instance_25 = new lib.sprite28();
	this.instance_25.setTransform(293.85,230.55,0.3869,0.3869);
	this.instance_25.alpha = 0;
	this.instance_25._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_158
	this.instance_26 = new lib.sprite28();
	this.instance_26.setTransform(168.55,194.5,0.3869,0.3869);
	this.instance_26.alpha = 0;
	this.instance_26._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_156
	this.instance_27 = new lib.sprite28();
	this.instance_27.setTransform(151.35,197.45,0.3869,0.3869);
	this.instance_27.alpha = 0;
	this.instance_27._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_27).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_154
	this.instance_28 = new lib.sprite28();
	this.instance_28.setTransform(160.55,180.4,0.3869,0.3869);
	this.instance_28.alpha = 0;
	this.instance_28._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_28).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_152
	this.instance_29 = new lib.sprite28();
	this.instance_29.setTransform(150,217.05,0.3869,0.3869);
	this.instance_29.alpha = 0;
	this.instance_29._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_29).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_150
	this.instance_30 = new lib.sprite28();
	this.instance_30.setTransform(196.15,205.55,0.3869,0.3869);
	this.instance_30.alpha = 0;
	this.instance_30._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_30).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_148
	this.instance_31 = new lib.sprite28();
	this.instance_31.setTransform(178.95,208.45,0.3869,0.3869);
	this.instance_31.alpha = 0;
	this.instance_31._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_31).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_146
	this.instance_32 = new lib.sprite28();
	this.instance_32.setTransform(188.15,191.45,0.3869,0.3869);
	this.instance_32.alpha = 0;
	this.instance_32._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_32).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_144
	this.instance_33 = new lib.sprite28();
	this.instance_33.setTransform(177.6,228.1,0.3869,0.3869);
	this.instance_33.alpha = 0;
	this.instance_33._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_33).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_142
	this.instance_34 = new lib.sprite28();
	this.instance_34.setTransform(218.25,205.55,0.3869,0.3869);
	this.instance_34.alpha = 0;
	this.instance_34._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_34).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_140
	this.instance_35 = new lib.sprite28();
	this.instance_35.setTransform(201.05,208.45,0.3869,0.3869);
	this.instance_35.alpha = 0;
	this.instance_35._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_35).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_138
	this.instance_36 = new lib.sprite28();
	this.instance_36.setTransform(210.25,191.45,0.3869,0.3869);
	this.instance_36.alpha = 0;
	this.instance_36._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_36).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_136
	this.instance_37 = new lib.sprite28();
	this.instance_37.setTransform(199.65,228.1,0.3869,0.3869);
	this.instance_37.alpha = 0;
	this.instance_37._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_37).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_134
	this.instance_38 = new lib.sprite28();
	this.instance_38.setTransform(240.35,205.55,0.3869,0.3869);
	this.instance_38.alpha = 0;
	this.instance_38._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_38).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_132
	this.instance_39 = new lib.sprite28();
	this.instance_39.setTransform(223.15,208.45,0.3869,0.3869);
	this.instance_39.alpha = 0;
	this.instance_39._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_39).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_130
	this.instance_40 = new lib.sprite28();
	this.instance_40.setTransform(232.35,191.45,0.3869,0.3869);
	this.instance_40.alpha = 0;
	this.instance_40._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_40).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_128
	this.instance_41 = new lib.sprite28();
	this.instance_41.setTransform(221.75,228.1,0.3869,0.3869);
	this.instance_41.alpha = 0;
	this.instance_41._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_41).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_126
	this.instance_42 = new lib.sprite28();
	this.instance_42.setTransform(253.95,235.5,0.3869,0.3869);
	this.instance_42.alpha = 0;
	this.instance_42._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_42).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_124
	this.instance_43 = new lib.sprite28();
	this.instance_43.setTransform(253.95,216.55,0.3869,0.3869);
	this.instance_43.alpha = 0;
	this.instance_43._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_43).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_122
	this.instance_44 = new lib.sprite28();
	this.instance_44.setTransform(269.25,200.1,0.3869,0.3869);
	this.instance_44.alpha = 0;
	this.instance_44._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_44).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_120
	this.instance_45 = new lib.sprite28();
	this.instance_45.setTransform(277.25,241.6,0.3869,0.3869);
	this.instance_45.alpha = 0;
	this.instance_45._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_45).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_118
	this.instance_46 = new lib.sprite28();
	this.instance_46.setTransform(281.7,219.5,0.3869,0.3869);
	this.instance_46.alpha = 0;
	this.instance_46._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_46).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_116
	this.instance_47 = new lib.sprite28();
	this.instance_47.setTransform(293.85,219.5,0.3869,0.3869);
	this.instance_47.alpha = 0;
	this.instance_47._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_47).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_114
	this.instance_48 = new lib.sprite28();
	this.instance_48.setTransform(168.55,238.65,0.3869,0.3869);
	this.instance_48.alpha = 0;
	this.instance_48._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_48).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_112
	this.instance_49 = new lib.sprite28();
	this.instance_49.setTransform(151.35,241.6,0.3869,0.3869);
	this.instance_49.alpha = 0;
	this.instance_49._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_49).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_110
	this.instance_50 = new lib.sprite28();
	this.instance_50.setTransform(160.55,224.55,0.3869,0.3869);
	this.instance_50.alpha = 0;
	this.instance_50._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_50).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_108
	this.instance_51 = new lib.sprite28();
	this.instance_51.setTransform(150,261.2,0.3869,0.3869);
	this.instance_51.alpha = 0;
	this.instance_51._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_51).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_106
	this.instance_52 = new lib.sprite28();
	this.instance_52.setTransform(196.15,249.7,0.3869,0.3869);
	this.instance_52.alpha = 0;
	this.instance_52._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_52).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_104
	this.instance_53 = new lib.sprite28();
	this.instance_53.setTransform(178.95,252.6,0.3869,0.3869);
	this.instance_53.alpha = 0;
	this.instance_53._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_53).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_102
	this.instance_54 = new lib.sprite28();
	this.instance_54.setTransform(188.15,235.6,0.3869,0.3869);
	this.instance_54.alpha = 0;
	this.instance_54._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_54).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_100
	this.instance_55 = new lib.sprite28();
	this.instance_55.setTransform(177.6,272.25,0.3869,0.3869);
	this.instance_55.alpha = 0;
	this.instance_55._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_55).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_98
	this.instance_56 = new lib.sprite28();
	this.instance_56.setTransform(218.25,249.7,0.3869,0.3869);
	this.instance_56.alpha = 0;
	this.instance_56._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_56).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_96
	this.instance_57 = new lib.sprite28();
	this.instance_57.setTransform(201.05,252.6,0.3869,0.3869);
	this.instance_57.alpha = 0;
	this.instance_57._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_57).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_94
	this.instance_58 = new lib.sprite28();
	this.instance_58.setTransform(210.25,235.6,0.3869,0.3869);
	this.instance_58.alpha = 0;
	this.instance_58._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_58).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_92
	this.instance_59 = new lib.sprite28();
	this.instance_59.setTransform(199.65,272.25,0.3869,0.3869);
	this.instance_59.alpha = 0;
	this.instance_59._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_59).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_90
	this.instance_60 = new lib.sprite28();
	this.instance_60.setTransform(240.35,249.7,0.3869,0.3869);
	this.instance_60.alpha = 0;
	this.instance_60._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_60).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_88
	this.instance_61 = new lib.sprite28();
	this.instance_61.setTransform(223.15,252.6,0.3869,0.3869);
	this.instance_61.alpha = 0;
	this.instance_61._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_61).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_86
	this.instance_62 = new lib.sprite28();
	this.instance_62.setTransform(232.35,235.6,0.3869,0.3869);
	this.instance_62.alpha = 0;
	this.instance_62._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_62).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_84
	this.instance_63 = new lib.sprite28();
	this.instance_63.setTransform(221.75,272.25,0.3869,0.3869);
	this.instance_63.alpha = 0;
	this.instance_63._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_63).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_82
	this.instance_64 = new lib.sprite28();
	this.instance_64.setTransform(253.95,279.65,0.3869,0.3869);
	this.instance_64.alpha = 0;
	this.instance_64._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_64).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_80
	this.instance_65 = new lib.sprite28();
	this.instance_65.setTransform(253.95,260.7,0.3869,0.3869);
	this.instance_65.alpha = 0;
	this.instance_65._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_65).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_78
	this.instance_66 = new lib.sprite28();
	this.instance_66.setTransform(269.25,244.25,0.3869,0.3869);
	this.instance_66.alpha = 0;
	this.instance_66._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_66).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_76
	this.instance_67 = new lib.sprite28();
	this.instance_67.setTransform(277.25,285.75,0.3869,0.3869);
	this.instance_67.alpha = 0;
	this.instance_67._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_67).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_74
	this.instance_68 = new lib.sprite28();
	this.instance_68.setTransform(281.7,263.65,0.3869,0.3869);
	this.instance_68.alpha = 0;
	this.instance_68._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_68).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_72
	this.instance_69 = new lib.sprite28();
	this.instance_69.setTransform(293.85,263.65,0.3869,0.3869);
	this.instance_69.alpha = 0;
	this.instance_69._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_69).wait(1076).to({_off:false},0).to({alpha:0.1797},9).wait(1).to({alpha:0.1992},0).wait(4));

	// Layer_70
	this.instance_70 = new lib.sprite28();
	this.instance_70.setTransform(168.55,212.15,0.3869,0.3869);
	this.instance_70.alpha = 0;
	this.instance_70._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_70).wait(1081).to({_off:false},0).to({alpha:0.2695},5).to({alpha:0.3398},3).wait(1));

	// Layer_68
	this.instance_71 = new lib.sprite28();
	this.instance_71.setTransform(151.35,215.1,0.3869,0.3869);
	this.instance_71.alpha = 0;
	this.instance_71._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_71).wait(1081).to({_off:false},0).to({alpha:0.2695},5).to({alpha:0.3398},3).wait(1));

	// Layer_66
	this.instance_72 = new lib.sprite28();
	this.instance_72.setTransform(160.55,198.05,0.3869,0.3869);
	this.instance_72.alpha = 0;
	this.instance_72._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_72).wait(1081).to({_off:false},0).to({alpha:0.2695},5).to({alpha:0.3398},3).wait(1));

	// Layer_64
	this.instance_73 = new lib.sprite28();
	this.instance_73.setTransform(150,234.7,0.3869,0.3869);
	this.instance_73.alpha = 0;
	this.instance_73._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_73).wait(1081).to({_off:false},0).to({alpha:0.2695},5).to({alpha:0.3398},3).wait(1));

	// Layer_62
	this.instance_74 = new lib.sprite28();
	this.instance_74.setTransform(196.15,223.2,0.3869,0.3869);
	this.instance_74.alpha = 0;
	this.instance_74._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_74).wait(1072).to({_off:false},0).to({alpha:0.3203},13).wait(1).to({alpha:0.3398},0).wait(4));

	// Layer_60
	this.instance_75 = new lib.sprite28();
	this.instance_75.setTransform(178.95,226.1,0.3869,0.3869);
	this.instance_75.alpha = 0;
	this.instance_75._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_75).wait(1072).to({_off:false},0).to({alpha:0.3203},13).wait(1).to({alpha:0.3398},0).wait(4));

	// Layer_58
	this.instance_76 = new lib.sprite28();
	this.instance_76.setTransform(188.15,209.1,0.3869,0.3869);
	this.instance_76.alpha = 0;
	this.instance_76._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_76).wait(1072).to({_off:false},0).to({alpha:0.3203},13).wait(1).to({alpha:0.3398},0).wait(4));

	// Layer_56
	this.instance_77 = new lib.sprite28();
	this.instance_77.setTransform(177.6,245.75,0.3869,0.3869);
	this.instance_77.alpha = 0;
	this.instance_77._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_77).wait(1072).to({_off:false},0).to({alpha:0.3203},13).wait(1).to({alpha:0.3398},0).wait(4));

	// Layer_54
	this.instance_78 = new lib.sprite28();
	this.instance_78.setTransform(218.25,223.2,0.3869,0.3869);
	this.instance_78.alpha = 0;
	this.instance_78._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_78).wait(1072).to({_off:false},0).to({alpha:0.3203},13).wait(1).to({alpha:0.3398},0).wait(4));

	// Layer_52
	this.instance_79 = new lib.sprite28();
	this.instance_79.setTransform(201.05,226.1,0.3869,0.3869);
	this.instance_79.alpha = 0;
	this.instance_79._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_79).wait(1072).to({_off:false},0).to({alpha:0.3203},13).wait(1).to({alpha:0.3398},0).wait(4));

	// Layer_50
	this.instance_80 = new lib.sprite28();
	this.instance_80.setTransform(210.25,209.1,0.3869,0.3869);
	this.instance_80.alpha = 0;
	this.instance_80._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_80).wait(1072).to({_off:false},0).to({alpha:0.3203},13).wait(1).to({alpha:0.3398},0).wait(4));

	// Layer_48
	this.instance_81 = new lib.sprite28();
	this.instance_81.setTransform(199.65,245.75,0.3869,0.3869);
	this.instance_81.alpha = 0;
	this.instance_81._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_81).wait(1072).to({_off:false},0).to({alpha:0.3203},13).wait(1).to({alpha:0.3398},0).wait(4));

	// Layer_46
	this.instance_82 = new lib.sprite28();
	this.instance_82.setTransform(240.35,223.2,0.3869,0.3869);
	this.instance_82.alpha = 0;
	this.instance_82._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_82).wait(1063).to({_off:false},0).to({alpha:0.1719},7).wait(1).to({alpha:0.1797},0).wait(5).to({alpha:0.1914},1).to({alpha:0.3203},8).wait(1).to({alpha:0.3398},0).wait(4));

	// Layer_44
	this.instance_83 = new lib.sprite28();
	this.instance_83.setTransform(223.15,226.1,0.3869,0.3869);
	this.instance_83.alpha = 0;
	this.instance_83._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_83).wait(1063).to({_off:false},0).to({alpha:0.1719},7).wait(1).to({alpha:0.1797},0).wait(5).to({alpha:0.1914},1).to({alpha:0.3203},8).wait(1).to({alpha:0.3398},0).wait(4));

	// Layer_42
	this.instance_84 = new lib.sprite28();
	this.instance_84.setTransform(232.35,209.1,0.3869,0.3869);
	this.instance_84.alpha = 0;
	this.instance_84._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_84).wait(1063).to({_off:false},0).to({alpha:0.1719},7).wait(1).to({alpha:0.1797},0).wait(5).to({alpha:0.1914},1).to({alpha:0.3203},8).wait(1).to({alpha:0.3398},0).wait(4));

	// Layer_40
	this.instance_85 = new lib.sprite28();
	this.instance_85.setTransform(221.75,245.75,0.3869,0.3869);
	this.instance_85.alpha = 0;
	this.instance_85._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_85).wait(1063).to({_off:false},0).to({alpha:0.1719},7).wait(1).to({alpha:0.1797},0).wait(5).to({alpha:0.1914},1).to({alpha:0.3203},8).wait(1).to({alpha:0.3398},0).wait(4));

	// Layer_38
	this.instance_86 = new lib.sprite28();
	this.instance_86.setTransform(253.95,253.15,0.3869,0.3869);
	this.instance_86.alpha = 0;
	this.instance_86._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_86).wait(1056).to({_off:false},0).to({alpha:0.1719},7).wait(1).to({alpha:0.1797},0).wait(12).to({alpha:0.1914},1).to({alpha:0.3203},8).wait(1).to({alpha:0.3398},0).wait(4));

	// Layer_36
	this.instance_87 = new lib.sprite28();
	this.instance_87.setTransform(253.95,234.2,0.3869,0.3869);
	this.instance_87.alpha = 0;
	this.instance_87._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_87).wait(1056).to({_off:false},0).to({alpha:0.1719},7).wait(1).to({alpha:0.1797},0).wait(12).to({alpha:0.1914},1).to({alpha:0.3203},8).wait(1).to({alpha:0.3398},0).wait(4));

	// Layer_34
	this.instance_88 = new lib.sprite28();
	this.instance_88.setTransform(269.25,217.75,0.3869,0.3869);
	this.instance_88.alpha = 0;
	this.instance_88._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_88).wait(1056).to({_off:false},0).to({alpha:0.1719},7).wait(1).to({alpha:0.1797},0).wait(12).to({alpha:0.1914},1).to({alpha:0.3203},8).wait(1).to({alpha:0.3398},0).wait(4));

	// Layer_32
	this.instance_89 = new lib.sprite28();
	this.instance_89.setTransform(277.25,259.25,0.3869,0.3869);
	this.instance_89.alpha = 0;
	this.instance_89._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_89).wait(1056).to({_off:false},0).to({alpha:0.1719},7).wait(1).to({alpha:0.1797},0).wait(12).to({alpha:0.1914},1).to({alpha:0.3203},8).wait(1).to({alpha:0.3398},0).wait(4));

	// Layer_30
	this.instance_90 = new lib.sprite28();
	this.instance_90.setTransform(281.7,237.15,0.3869,0.3869);
	this.instance_90.alpha = 0;
	this.instance_90._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_90).wait(1056).to({_off:false},0).to({alpha:0.1719},7).wait(1).to({alpha:0.1797},0).wait(12).to({alpha:0.1914},1).to({alpha:0.3203},8).wait(1).to({alpha:0.3398},0).wait(4));

	// Layer_28
	this.instance_91 = new lib.sprite28();
	this.instance_91.setTransform(293.85,237.15,0.3869,0.3869);
	this.instance_91.alpha = 0;
	this.instance_91._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_91).wait(1046).to({_off:false},0).to({alpha:0.1719},7).wait(1).to({alpha:0.1797},0).wait(22).to({alpha:0.1914},1).to({alpha:0.3203},8).wait(1).to({alpha:0.3398},0).wait(4));

	// Layer_27
	this.instance_92 = new lib.shape26("synched",0);
	this.instance_92.setTransform(295.25,237.4,0.92,0.92);
	this.instance_92.alpha = 0;
	this.instance_92._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_92).wait(1036).to({_off:false},0).to({alpha:0.8906},8).wait(1).to({alpha:1},0).wait(45));

	// Layer_26
	this.instance_93 = new lib.shape25("synched",0);
	this.instance_93.setTransform(280.05,238.5,0.92,0.92);
	this.instance_93.alpha = 0;
	this.instance_93._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_93).wait(1036).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(34));

	// Layer_25
	this.instance_94 = new lib.shape23("synched",0);
	this.instance_94.setTransform(219.65,228.55,0.92,0.92);
	this.instance_94.alpha = 0;
	this.instance_94._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_94).wait(851).to({_off:false},0).to({alpha:0.0195},1).to({alpha:0.9805},58).wait(1).to({alpha:1},0).wait(179));

	// Layer_24
	this.instance_95 = new lib.shape18("synched",0);
	this.instance_95.setTransform(152.6,218.85,0.92,0.92);
	this.instance_95._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_95).wait(162).to({_off:false},0).to({_off:true},870).wait(58));

	// Layer_17
	this.instance_96 = new lib.shape3("synched",0);
	this.instance_96.setTransform(157.5,214.3,0.92,0.92);

	this.timeline.addTween(cjs.Tween.get(this.instance_96).wait(122).to({startPosition:0},0).to({alpha:0.0195},20).to({_off:true},1).wait(947));

	// Layer_16
	this.instance_97 = new lib.shape10("synched",0);

	this.instance_98 = new lib.sprite21b();
	this.instance_98.setTransform(221.5,228.9,0.92,0.92);
	this.instance_98.alpha = 0;
	this.instance_98._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_97}]}).to({state:[]},162).to({state:[{t:this.instance_98}]},414).to({state:[{t:this.instance_98}]},99).to({state:[{t:this.instance_98}]},1).wait(414));
	this.timeline.addTween(cjs.Tween.get(this.instance_98).wait(576).to({_off:false},0).to({alpha:1},99).wait(415));

	// Layer_14
	this.instance_99 = new lib.sprite21();
	this.instance_99.setTransform(221.6,228.8,0.92,0.92);
	this.instance_99.alpha = 0;
	this.instance_99._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_99).wait(466).to({_off:false},0).to({alpha:0.0117},1).to({alpha:0.9883},108).wait(1).to({alpha:1},0).wait(514));

	// Layer_13
	this.instance_100 = new lib.shape22("synched",0);
	this.instance_100.setTransform(152.6,218.85,0.92,0.92);
	this.instance_100.alpha = 0;
	this.instance_100._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_100).wait(466).to({_off:false},0).to({alpha:0.0117},1).to({alpha:1},108).wait(1).to({startPosition:0},0).wait(514));

	// Layer_11
	this.instance_101 = new lib.sprite21();
	this.instance_101.setTransform(221.5,228.9,0.92,0.92);
	this.instance_101._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_101).wait(381).to({_off:false},0).wait(709));

	// Layer_8
	this.instance_102 = new lib.sprite9();
	this.instance_102.setTransform(145.25,218.65,0.92,0.92);

	this.timeline.addTween(cjs.Tween.get(this.instance_102).to({_off:true},162).wait(928));

	// Mask_Layer_5 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_0 = new cjs.Graphics().p("A2vCCIAPlxMAtQABtIgPFyg");
	var mask_graphics_1 = new cjs.Graphics().p("A2vCCIAPlxMAtQABtIgPFyg");
	var mask_graphics_2 = new cjs.Graphics().p("A2vCCIAPlxMAtQABtIgPFyg");
	var mask_graphics_3 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_4 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_5 = new cjs.Graphics().p("A2vCCIAPlxMAtQABtIgPFyg");
	var mask_graphics_6 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_7 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_8 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_9 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_10 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_11 = new cjs.Graphics().p("A2vCCIAPlxMAtQABtIgPFyg");
	var mask_graphics_12 = new cjs.Graphics().p("A2vCCIAPlxMAtQABtIgPFyg");
	var mask_graphics_13 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_14 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_15 = new cjs.Graphics().p("A2vCCIAPlxMAtQABtIgPFyg");
	var mask_graphics_16 = new cjs.Graphics().p("A2vCCIAPlxMAtQABtIgPFyg");
	var mask_graphics_17 = new cjs.Graphics().p("A2vCCIAPlxMAtQABtIgPFyg");
	var mask_graphics_18 = new cjs.Graphics().p("A2vCCIAPlxMAtQABtIgPFyg");
	var mask_graphics_19 = new cjs.Graphics().p("A2vCCIAPlxMAtQABtIgPFyg");
	var mask_graphics_20 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_21 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_22 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_23 = new cjs.Graphics().p("A2vCCIAPlxMAtQABtIgPFyg");
	var mask_graphics_24 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_25 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_26 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_27 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_28 = new cjs.Graphics().p("A2vCCIAPlxMAtQABtIgPFyg");
	var mask_graphics_29 = new cjs.Graphics().p("A2vCCIAPlxMAtQABtIgPFyg");
	var mask_graphics_30 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_31 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_32 = new cjs.Graphics().p("A2vCCIAPlxMAtQABtIgPFyg");
	var mask_graphics_33 = new cjs.Graphics().p("A2vCCIAPlxMAtQABtIgPFyg");
	var mask_graphics_34 = new cjs.Graphics().p("A2vCCIAPlxMAtQABtIgPFyg");
	var mask_graphics_35 = new cjs.Graphics().p("A2vCCIAPlxMAtQABtIgPFyg");
	var mask_graphics_36 = new cjs.Graphics().p("A2vCCIAPlxMAtQABtIgPFyg");
	var mask_graphics_37 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_38 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_39 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_40 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_41 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_42 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_43 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_44 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_45 = new cjs.Graphics().p("A2vCCIAPlxMAtQABtIgPFyg");
	var mask_graphics_46 = new cjs.Graphics().p("A2vCCIAPlxMAtQABtIgPFyg");
	var mask_graphics_47 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_48 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_49 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_50 = new cjs.Graphics().p("A2vCCIAPlxMAtQABtIgPFyg");
	var mask_graphics_51 = new cjs.Graphics().p("A2vCCIAPlxMAtQABtIgPFyg");
	var mask_graphics_52 = new cjs.Graphics().p("A2vCCIAPlxMAtQABtIgPFyg");
	var mask_graphics_53 = new cjs.Graphics().p("A2vCCIAPlxMAtQABtIgPFyg");
	var mask_graphics_54 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_55 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_56 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_57 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_58 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_59 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_60 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_61 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_62 = new cjs.Graphics().p("A2vCCIAPlxMAtQABtIgPFyg");
	var mask_graphics_63 = new cjs.Graphics().p("A2vCCIAPlxMAtQABtIgPFyg");
	var mask_graphics_64 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_65 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_66 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_67 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_68 = new cjs.Graphics().p("A2vCCIAPlxMAtQABtIgPFyg");
	var mask_graphics_69 = new cjs.Graphics().p("A2vCCIAPlxMAtQABtIgPFyg");
	var mask_graphics_70 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_71 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_72 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_73 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_74 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_75 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_76 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_77 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_78 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_79 = new cjs.Graphics().p("A2vCCIAPlxMAtQABtIgPFyg");
	var mask_graphics_80 = new cjs.Graphics().p("A2vCCIAPlxMAtQABtIgPFyg");
	var mask_graphics_81 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_82 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_83 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_84 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_85 = new cjs.Graphics().p("A2vCCIAPlxMAtQABtIgPFyg");
	var mask_graphics_86 = new cjs.Graphics().p("A2vCCIAPlxMAtQABtIgPFyg");
	var mask_graphics_87 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_88 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_89 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_90 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_91 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_92 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_93 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_94 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_95 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_96 = new cjs.Graphics().p("A2vCCIAPlxMAtQABtIgPFyg");
	var mask_graphics_97 = new cjs.Graphics().p("A2vCCIAPlxMAtQABtIgPFyg");
	var mask_graphics_98 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_99 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_100 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_101 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_102 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_103 = new cjs.Graphics().p("A2vCCIAPlxMAtQABtIgPFyg");
	var mask_graphics_104 = new cjs.Graphics().p("A2vCCIAPlxMAtQABtIgPFyg");
	var mask_graphics_105 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_106 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_107 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_108 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_109 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_110 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_111 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_112 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_113 = new cjs.Graphics().p("A2vCCIAPlxMAtQABtIgPFyg");
	var mask_graphics_114 = new cjs.Graphics().p("A2vCCIAPlxMAtQABtIgPFyg");
	var mask_graphics_115 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_116 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_117 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_118 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_119 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_120 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_121 = new cjs.Graphics().p("A2vCCIAPlxMAtQABtIgPFyg");
	var mask_graphics_122 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_123 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_124 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_125 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_126 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_127 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_128 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_129 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_130 = new cjs.Graphics().p("A2vCCIAPlxMAtQABtIgPFyg");
	var mask_graphics_131 = new cjs.Graphics().p("A2vCCIAPlxMAtQABtIgPFyg");
	var mask_graphics_132 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_133 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_134 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_135 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_136 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_137 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_138 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_139 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_140 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_141 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_142 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_143 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_144 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_145 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_146 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_147 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_148 = new cjs.Graphics().p("A2vCCIAPlxMAtQABtIgPFyg");
	var mask_graphics_149 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_150 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_151 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_152 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_153 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_154 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_155 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_156 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_157 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_158 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_159 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_160 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_161 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");
	var mask_graphics_577 = new cjs.Graphics().p("A2vCCIAPlxMAtQABuIgPFxg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:mask_graphics_0,x:148.9,y:271.55}).wait(1).to({graphics:mask_graphics_1,x:148.9,y:271.45}).wait(1).to({graphics:mask_graphics_2,x:148.9,y:271.35}).wait(1).to({graphics:mask_graphics_3,x:148.9,y:271.25}).wait(1).to({graphics:mask_graphics_4,x:148.9,y:271.15}).wait(1).to({graphics:mask_graphics_5,x:148.9,y:271}).wait(1).to({graphics:mask_graphics_6,x:148.9,y:270.9}).wait(1).to({graphics:mask_graphics_7,x:148.9,y:270.8}).wait(1).to({graphics:mask_graphics_8,x:148.9,y:270.7}).wait(1).to({graphics:mask_graphics_9,x:148.9,y:270.6}).wait(1).to({graphics:mask_graphics_10,x:148.9,y:270.5}).wait(1).to({graphics:mask_graphics_11,x:148.9,y:270.4}).wait(1).to({graphics:mask_graphics_12,x:148.9,y:270.3}).wait(1).to({graphics:mask_graphics_13,x:148.9,y:270.175}).wait(1).to({graphics:mask_graphics_14,x:148.9,y:270.05}).wait(1).to({graphics:mask_graphics_15,x:148.9,y:269.95}).wait(1).to({graphics:mask_graphics_16,x:148.9,y:269.85}).wait(1).to({graphics:mask_graphics_17,x:148.9,y:269.75}).wait(1).to({graphics:mask_graphics_18,x:148.9,y:269.65}).wait(1).to({graphics:mask_graphics_19,x:148.9,y:269.55}).wait(1).to({graphics:mask_graphics_20,x:148.9,y:269.45}).wait(1).to({graphics:mask_graphics_21,x:148.9,y:269.35}).wait(1).to({graphics:mask_graphics_22,x:148.9,y:269.225}).wait(1).to({graphics:mask_graphics_23,x:148.9,y:269.1}).wait(1).to({graphics:mask_graphics_24,x:148.9,y:269}).wait(1).to({graphics:mask_graphics_25,x:148.9,y:268.9}).wait(1).to({graphics:mask_graphics_26,x:148.9,y:268.8}).wait(1).to({graphics:mask_graphics_27,x:148.9,y:268.7}).wait(1).to({graphics:mask_graphics_28,x:148.9,y:268.6}).wait(1).to({graphics:mask_graphics_29,x:148.9,y:268.5}).wait(1).to({graphics:mask_graphics_30,x:148.9,y:268.375}).wait(1).to({graphics:mask_graphics_31,x:148.9,y:268.275}).wait(1).to({graphics:mask_graphics_32,x:148.9,y:268.15}).wait(1).to({graphics:mask_graphics_33,x:148.9,y:268.05}).wait(1).to({graphics:mask_graphics_34,x:148.9,y:267.95}).wait(1).to({graphics:mask_graphics_35,x:148.9,y:267.85}).wait(1).to({graphics:mask_graphics_36,x:148.9,y:267.75}).wait(1).to({graphics:mask_graphics_37,x:148.9,y:267.65}).wait(1).to({graphics:mask_graphics_38,x:148.9,y:267.55}).wait(1).to({graphics:mask_graphics_39,x:148.9,y:267.425}).wait(1).to({graphics:mask_graphics_40,x:148.9,y:267.325}).wait(1).to({graphics:mask_graphics_41,x:148.9,y:267.2}).wait(1).to({graphics:mask_graphics_42,x:148.9,y:267.1}).wait(1).to({graphics:mask_graphics_43,x:148.9,y:267}).wait(1).to({graphics:mask_graphics_44,x:148.9,y:266.9}).wait(1).to({graphics:mask_graphics_45,x:148.9,y:266.8}).wait(1).to({graphics:mask_graphics_46,x:148.9,y:266.7}).wait(1).to({graphics:mask_graphics_47,x:148.9,y:266.575}).wait(1).to({graphics:mask_graphics_48,x:148.9,y:266.475}).wait(1).to({graphics:mask_graphics_49,x:148.9,y:266.375}).wait(1).to({graphics:mask_graphics_50,x:148.9,y:266.25}).wait(1).to({graphics:mask_graphics_51,x:148.9,y:266.15}).wait(1).to({graphics:mask_graphics_52,x:148.9,y:266.05}).wait(1).to({graphics:mask_graphics_53,x:148.9,y:265.95}).wait(1).to({graphics:mask_graphics_54,x:148.9,y:265.85}).wait(1).to({graphics:mask_graphics_55,x:148.9,y:265.75}).wait(1).to({graphics:mask_graphics_56,x:148.9,y:265.625}).wait(1).to({graphics:mask_graphics_57,x:148.9,y:265.525}).wait(1).to({graphics:mask_graphics_58,x:148.9,y:265.425}).wait(1).to({graphics:mask_graphics_59,x:148.9,y:265.3}).wait(1).to({graphics:mask_graphics_60,x:148.9,y:265.2}).wait(1).to({graphics:mask_graphics_61,x:148.9,y:265.1}).wait(1).to({graphics:mask_graphics_62,x:148.9,y:265}).wait(1).to({graphics:mask_graphics_63,x:148.9,y:264.9}).wait(1).to({graphics:mask_graphics_64,x:148.9,y:264.775}).wait(1).to({graphics:mask_graphics_65,x:148.9,y:264.675}).wait(1).to({graphics:mask_graphics_66,x:148.9,y:264.575}).wait(1).to({graphics:mask_graphics_67,x:148.9,y:264.475}).wait(1).to({graphics:mask_graphics_68,x:148.9,y:264.35}).wait(1).to({graphics:mask_graphics_69,x:148.9,y:264.25}).wait(1).to({graphics:mask_graphics_70,x:148.9,y:264.15}).wait(1).to({graphics:mask_graphics_71,x:148.9,y:264.05}).wait(1).to({graphics:mask_graphics_72,x:148.9,y:263.95}).wait(1).to({graphics:mask_graphics_73,x:148.9,y:263.825}).wait(1).to({graphics:mask_graphics_74,x:148.9,y:263.725}).wait(1).to({graphics:mask_graphics_75,x:148.9,y:263.625}).wait(1).to({graphics:mask_graphics_76,x:148.9,y:263.525}).wait(1).to({graphics:mask_graphics_77,x:148.9,y:263.4}).wait(1).to({graphics:mask_graphics_78,x:148.9,y:263.3}).wait(1).to({graphics:mask_graphics_79,x:148.9,y:263.2}).wait(1).to({graphics:mask_graphics_80,x:148.9,y:263.1}).wait(1).to({graphics:mask_graphics_81,x:148.9,y:262.975}).wait(1).to({graphics:mask_graphics_82,x:148.9,y:262.875}).wait(1).to({graphics:mask_graphics_83,x:148.9,y:262.775}).wait(1).to({graphics:mask_graphics_84,x:148.9,y:262.675}).wait(1).to({graphics:mask_graphics_85,x:148.9,y:262.55}).wait(1).to({graphics:mask_graphics_86,x:148.9,y:262.45}).wait(1).to({graphics:mask_graphics_87,x:148.9,y:262.35}).wait(1).to({graphics:mask_graphics_88,x:148.9,y:262.25}).wait(1).to({graphics:mask_graphics_89,x:148.9,y:262.125}).wait(1).to({graphics:mask_graphics_90,x:148.9,y:262.025}).wait(1).to({graphics:mask_graphics_91,x:148.9,y:261.925}).wait(1).to({graphics:mask_graphics_92,x:148.9,y:261.825}).wait(1).to({graphics:mask_graphics_93,x:148.9,y:261.725}).wait(1).to({graphics:mask_graphics_94,x:148.9,y:261.6}).wait(1).to({graphics:mask_graphics_95,x:148.9,y:261.5}).wait(1).to({graphics:mask_graphics_96,x:148.9,y:261.4}).wait(1).to({graphics:mask_graphics_97,x:148.9,y:261.3}).wait(1).to({graphics:mask_graphics_98,x:148.9,y:261.175}).wait(1).to({graphics:mask_graphics_99,x:148.9,y:261.075}).wait(1).to({graphics:mask_graphics_100,x:148.9,y:260.975}).wait(1).to({graphics:mask_graphics_101,x:148.9,y:260.875}).wait(1).to({graphics:mask_graphics_102,x:148.9,y:260.775}).wait(1).to({graphics:mask_graphics_103,x:148.9,y:260.65}).wait(1).to({graphics:mask_graphics_104,x:148.9,y:260.55}).wait(1).to({graphics:mask_graphics_105,x:148.9,y:260.45}).wait(1).to({graphics:mask_graphics_106,x:148.9,y:260.325}).wait(1).to({graphics:mask_graphics_107,x:148.9,y:260.225}).wait(1).to({graphics:mask_graphics_108,x:148.9,y:260.125}).wait(1).to({graphics:mask_graphics_109,x:148.9,y:260.025}).wait(1).to({graphics:mask_graphics_110,x:148.9,y:259.925}).wait(1).to({graphics:mask_graphics_111,x:148.9,y:259.825}).wait(1).to({graphics:mask_graphics_112,x:148.9,y:259.7}).wait(1).to({graphics:mask_graphics_113,x:148.9,y:259.6}).wait(1).to({graphics:mask_graphics_114,x:148.9,y:259.5}).wait(1).to({graphics:mask_graphics_115,x:148.9,y:259.375}).wait(1).to({graphics:mask_graphics_116,x:148.9,y:259.275}).wait(1).to({graphics:mask_graphics_117,x:148.9,y:259.175}).wait(1).to({graphics:mask_graphics_118,x:148.9,y:259.075}).wait(1).to({graphics:mask_graphics_119,x:148.9,y:258.975}).wait(1).to({graphics:mask_graphics_120,x:148.9,y:258.875}).wait(1).to({graphics:mask_graphics_121,x:148.9,y:258.75}).wait(1).to({graphics:mask_graphics_122,x:148.9,y:258.65}).wait(1).to({graphics:mask_graphics_123,x:148.9,y:258.525}).wait(1).to({graphics:mask_graphics_124,x:148.9,y:258.425}).wait(1).to({graphics:mask_graphics_125,x:148.9,y:258.325}).wait(1).to({graphics:mask_graphics_126,x:148.9,y:258.225}).wait(1).to({graphics:mask_graphics_127,x:148.9,y:258.125}).wait(1).to({graphics:mask_graphics_128,x:148.9,y:258.025}).wait(1).to({graphics:mask_graphics_129,x:148.9,y:257.925}).wait(1).to({graphics:mask_graphics_130,x:148.9,y:257.8}).wait(1).to({graphics:mask_graphics_131,x:148.9,y:257.7}).wait(1).to({graphics:mask_graphics_132,x:148.9,y:257.575}).wait(1).to({graphics:mask_graphics_133,x:148.9,y:257.475}).wait(1).to({graphics:mask_graphics_134,x:148.9,y:257.375}).wait(1).to({graphics:mask_graphics_135,x:148.9,y:257.275}).wait(1).to({graphics:mask_graphics_136,x:148.9,y:257.175}).wait(1).to({graphics:mask_graphics_137,x:148.9,y:257.075}).wait(1).to({graphics:mask_graphics_138,x:148.9,y:256.975}).wait(1).to({graphics:mask_graphics_139,x:148.9,y:256.85}).wait(1).to({graphics:mask_graphics_140,x:148.9,y:256.725}).wait(1).to({graphics:mask_graphics_141,x:148.9,y:256.625}).wait(1).to({graphics:mask_graphics_142,x:148.9,y:256.525}).wait(1).to({graphics:mask_graphics_143,x:148.9,y:256.425}).wait(1).to({graphics:mask_graphics_144,x:148.9,y:256.325}).wait(1).to({graphics:mask_graphics_145,x:148.9,y:256.225}).wait(1).to({graphics:mask_graphics_146,x:148.9,y:256.125}).wait(1).to({graphics:mask_graphics_147,x:148.9,y:256.025}).wait(1).to({graphics:mask_graphics_148,x:148.9,y:255.9}).wait(1).to({graphics:mask_graphics_149,x:148.9,y:255.775}).wait(1).to({graphics:mask_graphics_150,x:148.9,y:255.675}).wait(1).to({graphics:mask_graphics_151,x:148.9,y:255.575}).wait(1).to({graphics:mask_graphics_152,x:148.9,y:255.475}).wait(1).to({graphics:mask_graphics_153,x:148.9,y:255.375}).wait(1).to({graphics:mask_graphics_154,x:148.9,y:255.275}).wait(1).to({graphics:mask_graphics_155,x:148.9,y:255.175}).wait(1).to({graphics:mask_graphics_156,x:148.9,y:255.075}).wait(1).to({graphics:mask_graphics_157,x:148.9,y:254.925}).wait(1).to({graphics:mask_graphics_158,x:148.9,y:254.825}).wait(1).to({graphics:mask_graphics_159,x:148.9,y:254.725}).wait(1).to({graphics:mask_graphics_160,x:148.9,y:254.625}).wait(1).to({graphics:mask_graphics_161,x:148.9,y:254.525}).wait(416).to({graphics:mask_graphics_577,x:148.9,y:254.525}).wait(513));

	// Masked_Layer_6___5
	this.instance_103 = new lib.shape7("synched",0);
	this.instance_103.setTransform(152.6,218.85,0.92,0.92);

	var maskedShapeInstanceList = [this.instance_103];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_103).to({_off:true},162).wait(928));

	// Layer_5
	this.aniA = new lib.sprite17();
	this.aniA.name = "aniA";
	this.aniA.setTransform(152.6,218.85,0.92,0.92);
	this.aniA._off = true;

	this.timeline.addTween(cjs.Tween.get(this.aniA).wait(162).to({_off:false},0).wait(415).to({alpha:0},0).to({_off:true},1).wait(512));

	// Layer_4
	this.instance_104 = new lib.shape5("synched",0);
	this.instance_104.setTransform(152.6,218.85,0.92,0.92);

	this.instance_105 = new lib.shape19("synched",0);
	this.instance_105.setTransform(152.6,218.85,0.92,0.92);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_104}]}).to({state:[]},162).to({state:[{t:this.instance_105}]},219).wait(709));

	// Layer_2
	this.instance_106 = new lib.sprite4();
	this.instance_106.setTransform(157.5,214.3,0.92,0.92);
	var instance_106Filter_1 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_106.filters = [instance_106Filter_1];
	this.instance_106.cache(-163,-60,326,120);

	this.timeline.addTween(cjs.Tween.get(this.instance_106).wait(1090));
	this.timeline.addTween(cjs.Tween.get(instance_106Filter_1).wait(122).to(new cjs.ColorFilter(0.05859375,0.05859375,0.05859375,1,192,192,192,0), 19).wait(1).to(new cjs.ColorFilter(0.01171875,0.01171875,0.01171875,1,202,202,202,0), 0).wait(948));

	// Layer_1
	this.instance_107 = new lib.shape2("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_107).wait(1090));

	this.filterCacheList = [];
	this.filterCacheList.push({instance: this.instance_106, startFrame:122, endFrame:122, x:-163, y:-60, w:326, h:120});
	this.filterCacheList.push({instance: this.instance_106, startFrame:123, endFrame:141, x:-163, y:-60, w:326, h:120});
	this.filterCacheList.push({instance: this.instance_106, startFrame:142, endFrame:142, x:-163, y:-60, w:326, h:120});
	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-551.2,-0.4,908.4000000000001,373.2);


// stage content:
(lib.vital_acc_sale = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {p1:0};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,1,1089];
	this.streamSoundSymbolsList[1] = [{id:"vital_acc_sale1",startFrame:1,endFrame:1089,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		InitPage(1);
		Next(0);
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
			GetUrlMain("vitalmenu_sale");
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
			}
			else{
				exportRoot.ani1.aniA.stop();
			}
		}
	}
	this.frame_1 = function() {
		var soundInstance = playSound("vital_acc_sale1",0);
		this.InsertIntoSoundStreamData(soundInstance,1,1089,1);
	}
	this.frame_1089 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1088).call(this.frame_1089).wait(1));

	// Layer_222
	this.instance = new lib.text33("synched",0);
	this.instance.setTransform(10,0,1.5021,1.5021);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1090));

	// Layer_239
	this.instance_1 = new lib.text53("synched",0);
	this.instance_1.setTransform(37.45,49.3,1.5031,1.5021);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1090));

	// Layer_238
	this.instance_2 = new lib.shape52("synched",0);
	this.instance_2.setTransform(13.5,2.7,1.5021,1.5021);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1090));

	// Layer_back
	this.back = new lib.buttonbak();
	this.back.name = "back";
	this.back.setTransform(350,645,1.0001,1.0002);
	new cjs.ButtonHelper(this.back, 0, 1, 2, false, new lib.buttonbak(), 3);

	this.timeline.addTween(cjs.Tween.get(this.back).wait(1090));

	// Layer_page
	this.page = new cjs.Text("Page number", "italic bold 15px 'Arial'", "#FF9900");
	this.page.name = "page";
	this.page.lineHeight = 17;
	this.page.lineWidth = 193;
	this.page.parent = this;
	this.page.setTransform(23,658,1.4989,1.4989);

	this.timeline.addTween(cjs.Tween.get(this.page).wait(1090));

	// Layer_next
	this.next = new lib.buttonnext();
	this.next.name = "next";
	this.next.setTransform(1496.1,5.1,0.9998,0.9999,0,0,0,0.1,0.1);
	new cjs.ButtonHelper(this.next, 0, 1, 2, false, new lib.buttonnext(), 3);

	this.timeline.addTween(cjs.Tween.get(this.next).wait(1090));

	// Layer_previous
	this.previous = new lib.buttonprev();
	this.previous.name = "previous";
	this.previous.setTransform(1432,5,1.0003,0.9993);
	new cjs.ButtonHelper(this.previous, 0, 1, 2, false, new lib.buttonprev(), 3);

	this.timeline.addTween(cjs.Tween.get(this.previous).wait(1090));

	// Layer_slider
	this.slider = new lib.sprite_slider();
	this.slider.name = "slider";
	this.slider.setTransform(610.1,670.1,0.9937,0.9983,0,0,0,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.slider).wait(1090));

	// Layer_replay
	this.replay = new lib.sprite_replay();
	this.replay.name = "replay";
	this.replay.setTransform(1045.1,650.1,0.9999,0.9999,0,0,0,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.replay).wait(1090));

	// Layer_slider_base
	this.instance_3 = new lib.sprite_sliderbase();
	this.instance_3.setTransform(600,650,1,0.9999);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1090));

	// Layer_playpau
	this.playpau = new lib.sprite_playpau();
	this.playpau.name = "playpau";
	this.playpau.setTransform(555,650,0.9999,0.9999);

	this.timeline.addTween(cjs.Tween.get(this.playpau).wait(1090));

	// Mask_Layer_1 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("Eh8/AyyMAAAhfTMD5/AAAMAAABfTg");
	mask.setTransform(800,325);

	// Masked_Layer_2___1
	this.ani1 = new lib.sprite29();
	this.ani1.name = "ani1";
	this.ani1.setTransform(857.15,71.8,1.5021,1.5021);

	var maskedShapeInstanceList = [this.ani1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.ani1).wait(1090));
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
		{src:"images/vital_acc_sale_atlas_1.png", id:"vital_acc_sale_atlas_1"},
		{src:"images/vital_acc_sale_atlas_2.png", id:"vital_acc_sale_atlas_2"},
		{src:"sounds/vital_acc_sale1.mp3", id:"vital_acc_sale1"}
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