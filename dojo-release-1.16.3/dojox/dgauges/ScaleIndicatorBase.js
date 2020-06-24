//>>built
define("dojox/dgauges/ScaleIndicatorBase",["dojo/_base/lang","dojo/_base/declare","dojo/_base/window","dojo/on","dojo/touch","dojo/_base/fx","dojox/gfx","dojox/widget/_Invalidating","./IndicatorBase"],function(_1,_2,_3,on,_4,fx,_5,_6,_7){
return _2("dojox.dgauges.ScaleIndicatorBase",_7,{scale:null,value:0,interactionArea:"gauge",interactionMode:"mouse",animationDuration:0,animationEaser:null,_indicatorShapeFuncFlag:true,_interactionAreaFlag:true,_downListeners:null,_cursorListeners:null,_moveAndUpListeners:null,_transitionValue:NaN,_preventAnimation:false,_animation:null,constructor:function(){
this.watch("value",_1.hitch(this,function(){
this.valueChanged(this);
}));
this.watch("value",_1.hitch(this,this._startAnimation));
this.watch("interactionArea",_1.hitch(this,function(){
this._interactionAreaFlag=true;
}));
this.watch("interactionMode",_1.hitch(this,function(){
this._interactionAreaFlag=true;
}));
this.watch("indicatorShapeFunc",_1.hitch(this,function(){
this._indicatorShapeFuncFlag=true;
}));
this.addInvalidatingProperties(["scale","value","indicatorShapeFunc","interactionArea","interactionMode"]);
this._downListeners=[];
this._moveAndUpListeners=[];
this._cursorListeners=[];
},_startAnimation:function(_8,_9,_a){
if(this.animationDuration===0){
return;
}
if(this._animation&&(this._preventAnimation||_9==_a)){
this._animation.stop();
return;
}
this._animation=new fx.Animation({curve:[_9,_a],duration:this.animationDuration,easing:this.animationEaser?this.animationEaser:fx._defaultEasing,onAnimate:_1.hitch(this,this._updateAnimation),onEnd:_1.hitch(this,this._endAnimation),onStop:_1.hitch(this,this._endAnimation)});
this._animation.play();
},_updateAnimation:function(v){
this._transitionValue=v;
this.invalidateRendering();
},_endAnimation:function(){
this._transitionValue=NaN;
this.invalidateRendering();
},refreshRendering:function(){
if(this._gfxGroup===null||this.scale===null){
return;
}else{
if(this._indicatorShapeFuncFlag&&_1.isFunction(this.indicatorShapeFunc)){
this._gfxGroup.clear();
this.indicatorShapeFunc(this._gfxGroup,this);
this._indicatorShapeFuncFlag=false;
}
if(this._interactionAreaFlag){
this._interactionAreaFlag=this._connectDownListeners();
}
}
},valueChanged:function(_b){
on.emit(this,"valueChanged",{target:this,bubbles:true,cancelable:true});
},_disconnectDownListeners:function(){
for(var i=0;i<this._downListeners.length;i++){
this._downListeners[i].remove();
}
this._downListeners=[];
},_disconnectMoveAndUpListeners:function(){
for(var i=0;i<this._moveAndUpListeners.length;i++){
this._moveAndUpListeners[i].remove();
}
this._moveAndUpListeners=[];
},_disconnectListeners:function(){
this._disconnectDownListeners();
this._disconnectMoveAndUpListeners();
this._disconnectCursorListeners();
},_connectCursorListeners:function(_c){
var _d=_c.on(_4.over,_1.hitch(this,function(){
this.scale._gauge._setCursor("pointer");
}));
this._cursorListeners.push(_d);
_d=_c.on(_4.out,_1.hitch(this,function(_e){
this.scale._gauge._setCursor("");
}));
this._cursorListeners.push(_d);
},_disconnectCursorListeners:function(){
for(var i=0;i<this._cursorListeners.length;i++){
this._cursorListeners[i].remove();
}
this._cursorListeners=[];
},_connectDownListeners:function(){
this._disconnectDownListeners();
this._disconnectCursorListeners();
var _f=null;
if(this.interactionMode=="mouse"||this.interactionMode=="touch"){
if(this.interactionArea=="indicator"){
_f=this._gfxGroup.on(_4.press,_1.hitch(this,this._onMouseDown));
this._downListeners.push(_f);
this._connectCursorListeners(this._gfxGroup);
}else{
if(this.interactionArea=="gauge"){
if(!this.scale||!this.scale._gauge||!this.scale._gauge._gfxGroup){
return true;
}
_f=this.scale._gauge._gfxGroup.on(_4.press,_1.hitch(this,this._onMouseDown));
this._downListeners.push(_f);
_f=this._gfxGroup.on(_4.press,_1.hitch(this,this._onMouseDown));
this._downListeners.push(_f);
this._connectCursorListeners(this.scale._gauge._gfxGroup);
}else{
if(this.interactionArea=="area"){
if(!this.scale||!this.scale._gauge||!this.scale._gauge._baseGroup){
return true;
}
_f=this.scale._gauge._baseGroup.on(_4.press,_1.hitch(this,this._onMouseDown));
this._downListeners.push(_f);
_f=this._gfxGroup.on(_4.press,_1.hitch(this,this._onMouseDown));
this._downListeners.push(_f);
this._connectCursorListeners(this.scale._gauge._baseGroup);
}
}
}
}
return false;
},_connectMoveAndUpListeners:function(){
var _10=null;
_10=on(_3.doc,_4.move,_1.hitch(this,this._onMouseMove));
this._moveAndUpListeners.push(_10);
_10=on(_3.doc,_4.release,_1.hitch(this,this._onMouseUp));
this._moveAndUpListeners.push(_10);
},_onMouseDown:function(_11){
this._connectMoveAndUpListeners();
this._startEditing();
},_onMouseMove:function(_12){
this._preventAnimation=true;
if(this._animation){
this._animation.stop();
}
},_onMouseUp:function(_13){
this._disconnectMoveAndUpListeners();
this._preventAnimation=false;
this._endEditing();
},_startEditing:function(){
if(!this.scale||!this.scale._gauge){
return;
}else{
this.scale._gauge.onStartEditing({indicator:this});
}
},_endEditing:function(){
if(!this.scale||!this.scale._gauge){
return;
}else{
this.scale._gauge.onEndEditing({indicator:this});
}
}});
});
