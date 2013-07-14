function object(id) {
    this.id	= id;
    this.imgno	= 0;
    this.pat	= 0;
    this.pat3	= 0;
    this.pate	= 0;
    this.patm	= 0;
    this.counte = 0;
    this.countm = 0;
    this.nameID	= "";
    this.mflag	= 0;
    this.eflag	= false; 
    this.x	= 0;
    this.y	= 0;
    this.x2	= 0;
    this.y2	= 0;
    this.x3	= 0;
    this.y3	= 0;
    this.t	= 0;
    this.t2	= 0;
    this.width	= 0;
    this.height	= 0;
    this.wbias	= 0;
    this.hbias	= 0;
    this.scalex	= 1.0;
    this.scaley	= 1.0;
    this.scalex2	= 1.0;
    this.scaley2	= 1.0;
    this.rot	= 0;
    this.hx	= new hokan();
    this.hy	= new hokan();
    this.ha	= new hokan();
    this.ht	= new hokan();
    this.hsx	= new hokan();
    this.hsy	= new hokan();
    this.hs	= new hokan();
    this.hbx	= new hokan();
    this.hby	= new hokan();
    this.hbw	= new hokan();
    this.hbh	= new hokan();
    this.scale	= 1.0;
    this.scale2	= 1.0;
    this._visible	= true;
    this.color	= 0;
    this.alpha	= 1.0;
    this.alpha3	= 1.0;
    this.alphanum	= 1.0;
    this.alphamax	= 0;
    this.r	= 10;
    this.speedx = 0;
    this.speedy = 0;
    this.speedr = 0;
    this.basex = 0;
    this.basey = 0;
    this.biasx = 0;
    this.biasy = 0;
    this.basex2 = 0;
    this.basey2 = 0;
    this.biasx2 = 0;
    this.biasy2 = 0;
    this.biasw = 0;
    this.biash = 0;
    this.word	= "";
    this.wordold	= "";
    this.wordorg	= "";
    this.messtr	= "";
    this.putstr = "";
    this.fade	= false;
    this.fadeout = false;
    this.mescount = 0;
    this.sflag = false;

    // ココから各ゲーム専用
    this.pat2 = 0;
    this._effect = 0;
    this._count	= 0;
    this._mode	= 0;
    this._num	= 0;
    this._parent = 0;
    this._child	= new Array(2);
    this.patorg	= 0;
    this._flow	= false;
    this._blink	= 0;
    this._blinktime	= 1;
    this._pcount	= 0;
    this.url = "";
    this.shadow	= 0;
    this.timeword = new Array();
    this.type	= 0;
    this.outtype	= 0;
    this.wait	= 0;
    this.reg	= "";
    this.tmp	= 0;
    this.paneltype = 0;
    this.panelorg = 0;
    this.puttype = 0;
    this.font = 0;
    this.fwidth = 0;
    this.svalue	= false;

    this.timeout	= null;
    // ココまで各ゲーム専用

    this.setblink	= function(blinktime,blink){
	this._blink	= blink;
	this._blinktime	= blinktime;
	this._pcount	= 0;
    }
    this.initblink	= function(){
	this._blink	= 0;
	this._blinktime	= 1;
    }
    this.init = function(imgno,x,y,t,a){
	if(this.timeout != null){
	    clearTimeout(this.timeout);
	}
	this.pat	= imgno;
	this.x		= x;
	this.y		= y;
	this.t		= t;
	if(imgno < 0){
	    this.width	= ScreenWidthOrg;
	    this.height	= ScreenHeightOrg;
	}
	else{
	    if(_imgData[imgno][1] != null){
		this.width	= _imgData[imgno][3];
		this.height	= _imgData[imgno][4];
	    }
	    else{
		this.width	= _Img[_imgData[imgno][0]].width;
		this.height	= _Img[_imgData[imgno][0]].height;
	    }
	}
	this.alpha	= a;
	this.wbias = 0;
	this.hbias = 0;

	switch(t){
	case	imgTL:
	    break;
	case	imgTC:
	    this.wbias = -this.width/2;
	    break;
	case	imgTR:
	    this.wbias = -this.width;
	    break;
	case	imgCL:
	    this.hbias	= -this.height/2;
	    break;
	case	imgCC:
	    this.wbias = -this.width/2;
	    this.hbias	= -this.height/2;
	    break;
	case	imgCR:
	    this.wbias = -this.width;
	    this.hbias	= -this.height/2;
	    break;
	case	imgBL:
	    this.hbias	= -this.height;
	    break;
	case	imgBC:
	    this.wbias = -this.width/2;
	    this.hbias	= -this.height;
	    break;
	case	imgBR:
	    this.wbias = -this.width;
	    this.hbias	= -this.height;
	    break;
	}
    }
    this.put = function(){
	this.puttype = 1;
	if(this._visible && (this._pcount%this._blinktime) >= this._blink){
	    if(this.pat == -1){
		FillRect(this.x,this.y,ScreenWidthOrg,ScreenHeightOrg,0x000000,this.alpha);
	    }
	    else if(this.pat == -2){
		FillRect(this.x,this.y,ScreenWidthOrg,ScreenHeightOrg,0xffffff,this.alpha);
	    }
	    else {
		if(this.shadow){
		    SpritePutSh(this.pat,this.x,this.y,this.t,this.alpha,this.shadow);
		}
		else{
		    SpritePut(this.pat,this.x,this.y,this.t,this.alpha);
		}
	    }
	}
	this._pcount++;
    }
    this.puts = function(){
	this.puttype = 2;
	if(this._visible && (this._pcount%this._blinktime) >= this._blink){
	    SpritePutS(this.pat,this.x+this.biasx,this.y+this.biasy,this.t,this.scalex,this.scaley,this.rot,this.alpha);
	}
	this._pcount++;
    }
    this.set = function(x,y){
	this.x		= x;
	this.y		= y;
    }
    this.tnowoff = function(){
	if(Toff(this.x-this.wbias,this.y-this.hbias,this.width,this.height) || TN(this.x-this.wbias,this.y-this.hbias,this.width,this.height)){
	    return true;
	}
	return false;
    }
    this.toff = function(){
	if(Toff(this.x-this.wbias,this.y-this.hbias,this.width,this.height)){
	    return true;
	}
	return false;
    }

    patback = function(obj){
	obj.paneltype	= obj.panelorg;
	obj.pat	= obj.patorg;
    }

    this.click = function(){
	if(Toff(parseInt(this.x)+parseInt(this.wbias),parseInt(this.y)+parseInt(this.hbias),parseInt(this.width),parseInt(this.height))){
	    this.panelorg	= this.paneltype;
	    this.paneltype	= 3;
	    this.patorg		= this.pat;
	    this.pat		+= IMG_bias;
	    if(this.pat > IMG2_satoru){
		this.pat		-= IMG_bias;
	    }
	    switch(this.puttype){
	    case	1:
		this.put();
		break;
	    case	2:
		this.puts();
		break;
	    case	3:
		this.putPanel0();
		break;
	    case	4:
		this.putPanel();
		break;
	    case	5:
		this.putPanelFont(this.font,this.fwidth);
		break;
	    case	6:
		this.putPanelPat();
		break;
	    }
	    this.pat = this.patorg;
	    this.paneltype = this.panelorg;
	    ClickCount	= 4;
	    return	true;
	}
	return	false;
    }
    this.click2 = function(_f){
	if(Toff(parseInt(this.x)+parseInt(this.wbias),parseInt(this.y)+parseInt(this.hbias),parseInt(this.width),parseInt(this.height))){
	    this.panelorg	= this.paneltype;
	    this.paneltype	= 3;
	    this.patorg		= this.pat;
	    this.pat		+= IMG_bias;
	    if(this.pat > IMG2_shop){
		this.pat		-= IMG_bias;
	    }
	    switch(this.puttype){
	    case	1:
		this.put();
		break;
	    case	2:
		this.puts();
		break;
	    case	3:
		this.putPanel0();
		break;
	    case	4:
		this.putPanel();
		break;
	    case	5:
		this.putPanelFont(this.font,this.fwidth);
		break;
	    case	6:
		this.putPanelPat();
		break;
	    }
	    this.pat = this.patorg;
	    this.paneltype = this.panelorg;
	    if(_f){
		ClickCount	= 4;
	    }
	    return	true;
	}
	return	false;
    }
    this.hxInit	= function(nowx,targx,count,type,counter){
	this.hx.init(this.x,targx,count,type);
	this.counter	= counter;
    }
    this.hxValue	= function(){
	if(this.counter-- < 0){
	    if(this.hx.isvalue()){
		this.x	= this.hx.value();
	    }
	}
    }
    this.hyInit	= function(nowy,targy,count,type,counter){
	this.hy.init(this.y,targy,count,type);
	this.counter	= counter;
    }
    this.hyValue	= function(){
	if(this.counter-- < 0){
	    if(this.hy.isvalue()){
		this.y	= this.hy.value();
	    }
	}
    }
    this.haInit	= function(nowa,targa,count,type,counter){
	this.alpha	= nowa;
	this.ha.init(this.alpha,targa,count,type);
	this.counter	= counter;
    }
    this.haValue	= function(){
	if(this.counter-- < 0){
	    if(this.ha.isvalue()){
		this.alpha	= this.ha.value();
	    }
	}
    }
    this.hsInit	= function(nowx,targx,count,type,counter){
	this.scale	= nowx;
	this.hs.init(this.scale,targx,count,type);
	this.counter	= counter;
    }
    this.hsValue	= function(){
	if(this.counter-- < 0){
	    if(this.hs.isvalue()){
		this.scale	= this.hs.value();
	    }
	}
    }
    this.hsxInit	= function(nowx,targx,count,type,counter){
	this.scalex	= nowx;
	this.hsx.init(this.scalex,targx,count,type);
	this.counter	= counter;
    }
    this.hsxValue	= function(){
	if(this.counter-- < 0){
	    if(this.hsx.isvalue()){
		this.scalex	= this.hsx.value();
//		console.log("sssssssssssx"+this.scalex);
	    }
	    else{
		this.svalue	= false;
	    }
	}
    }
    this.hsyInit	= function(nowy,targy,count,type,counter){
	this.scaley	= nowy;
	this.hsy.init(this.scaley,targy,count,type);
	this.counter	= counter;
    }
    this.hsyValue	= function(){
	if(this.counter-- < 0){
	    if(this.hsy.isvalue()){
		this.scaley	= this.hsy.value();
//		console.log("sssssssssssy"+this.scaley);
	    }
	    else{
		this.svalue	= false;
	    }
	}
    }
    this.hbxInit	= function(nowy,targy,count,type,counter){
	this.basex	= nowy;
	this.hbx.init(this.basex,targy,count,type);
	this.counter	= counter;
    }
    this.hbxValue	= function(){
	if(this.counter-- < 0){
	    if(this.hbx.isvalue()){
		this.basex	= this.hbx.value();
//		console.log("sssssssssssy"+this.scaley);
	    }
	}
    }
    this.hbyInit	= function(nowy,targy,count,type,counter){
	this.basey	= nowy;
	this.hby.init(this.basey,targy,count,type);
	this.counter	= counter;
    }
    this.hbyValue	= function(){
	if(this.counter-- < 0){
	    if(this.hby.isvalue()){
		this.basey	= this.hby.value();
//		console.log("sssssssssssy"+this.scaley);
	    }
	}
    }
    this.hbwInit	= function(nowy,targy,count,type,counter){
	this.basew	= nowy;
	this.hbw.init(this.basew,targy,count,type);
	this.counter	= counter;
    }
    this.hbwValue	= function(){
	if(this.counter-- < 0){
	    if(this.hbw.isvalue()){
		this.basew	= this.hbw.value();
//		console.log("sssssssssssy"+this.scaley);
	    }
	}
    }
    this.hbhInit	= function(nowy,targy,count,type,counter){
	this.baseh	= nowy;
	this.hbh.init(this.baseh,targy,count,type);
	this.counter	= counter;
    }
    this.hbhValue	= function(){
	if(this.counter-- < 0){
	    if(this.hbh.isvalue()){
		this.baseh	= this.hbh.value();
//		console.log("sssssssssssy"+this.scaley);
	    }
	}
    }

    this.htInit	= function(nowx,targx,count,type,counter){
	this.tmp	= nowx;
	this.ht.init(this.tmp,targx,count,type);
	this.counter	= counter;
    }
    this.htValue	= function(){
	if(this.counter-- < 0){
	    if(this.ht.isvalue()){
		this.tmp	= this.ht.value();
	    }
	}
    }
    this.hokaninit	= function(nowx,nowy,targx,targy,count,type){
	this.x	= nowx;
	this.y	= nowy;
	this.hx.init(this.x,targx,count,type);
	this.hy.init(this.y,targy,count,type);
    }
    this.hokanvalue	= function(){
	if(this.hx.isvalue()){
	    this.x	= this.hx.value();
	}
	if(this.hy.isvalue()){
	    this.y	= this.hy.value();
	}
	if(this.ha.isvalue()){
	    this.alpha	= this.ha.value();
	}
	if(this.hsx.isvalue()){
	    this.scalex	= this.hsx.value();
	}
	if(this.hsy.isvalue()){
	    this.scaley	= this.hsy.value();
	}
    }
    this.initfillrect	= function(x,y,width,height,color,alpha){
	if(this._visible){
	    this.x		= x;
	    this.y		= y;
	    this.width	= width;
	    this.height	= height;
	    this.color	= color;
	    this.alpha	= alpha;
	    FillRect(this.x,this.y,this.width,this.height,this.color,this.alpha);
	}
    }
    this.fillrect	= function(alpha){
	if(this._visible){
	    this.alpha = alpha;
	    FillRect(this.x,this.y,this.width,this.height,this.color,this.alpha);
	}
    }

    this.setletter	= function(word,x,y){
	this.word	= word;
	this.x	= x;
	this.y	= y;
    }
    this.putletter	= function(){
	if(this._visible){
//	    PutLetterDivStroke2(this.word,_FONT_MIDDLE,MesWidth,this.x+this.biasx,this.y-6,this.color,0x000000,this.t,this.alpha);
	    PutLetterDivStroke2(this.word,_FONT_MIDDLE,MesWidth,this.x+this.biasx,this.y-6,MessColor,0x000000,this.t,this.alpha);
	}
    }
    this.setfillbutton	= function(x,y,width,height,color,alpha,r){
	this.x		= x;
	this.y		= y;
	this.width	= width;
	this.height	= height;
	this.color	= color;
	this.alpha	= alpha;
	this.r		= r;
    }
    this.fillrectr	= function(x,y,width,height,color,alpha,r){
	this.x		= x;
	this.y		= y;
	this.width	= width;
	this.height	= height;
	this.color	= color;
	this.alpha	= alpha;
	this.r		= r;
	FillRectR(this.x,this.y,this.width,this.height,this.color,this.alpha,this.r);
    }
    this.drawrect	= function(){
	DrawRectR(this.x,this.y,this.width,this.height,this.color,this.alpha,this.r);
	PutLetterS(this.word,_FONT_SMALL,(this.x+this.width/2),(this.y+this.height/2),0x000000,imgBC)
    }
    this.drawline	= function(x,y,color,alpha){
	this.x		= x;
	this.y		= y;
	this.color	= color;
	this.alpha	= alpha;
	DrawLine(this.x,this.y,this.x+this.width,this.y+this.height,this.color,this.alpha);
    }
    this.fillarc	= function(x,y,r,color,alpha){
	this.x		= x;
	this.y		= y;
	this.r		= r;
	this.color	= color;
	this.alpha	= alpha;
	FillArc(this.x+this.biasx,this.y,this.r,this.color,this.alpha,0);
    }
    var selectTbl = [
	0,0,1,1,
    ];
    this.putselect = function(){
	if(this._visible && (this._pcount%this._blinktime) >= this._blink){
	    SpritePut(this.pat,this.x,this.y,this.t,this.alpha*0.5);
	    SpritePut(this.pat2,this.x,this.y,this.t,this.alpha);
	    if(this.alpha == 1){
		PutLetterStroke(this.word,_FONT_MIDDLE0,this.x-this.width/2+60/2,this.y-5/2,this.color,0x000000,imgCL,1);
	    }
	    if(this.color == 0xffffff){
		SpritePut(IMG_sel_mark,this.x-this.width/2+20/2+(selectTbl[this._pcount%4])*10,this.y+2,imgCL,this.alpha);
	    }
	}
	this._pcount++;
    }
    this.putmainwin = function(){
	if(this._visible){
	    SpritePut(this.pat,this.x,this.y,this.t,this.alpha*0.5);
	    SpritePut(this.pat2,this.x,this.y,this.t,this.alpha);
	}
    }

    this.putname = function(){
	if(this._visible){
	    SpritePut(this.pat,this.x,this.y,this.t,this.alpha*0.5);
	    SpritePut(this.pat2,this.x,this.y,this.t,this.alpha);
	    PutLetterStroke(this.word,_FONT_MIDDLE1,this.x+this.width/2,this.y+2,0xffffff,0x000000,imgTC,1);
	}
    }
    this.putbg = function(){
	if(this._visible){
	    if(this.pat2 != -1){
		SpritePutS3(this.pat2,parseInt(this.x2)+parseInt(this.biasx),parseInt(this.y2)+parseInt(this.biasy),this.t,
			    parseInt(this.basex2),parseInt(this.basey2),parseInt(this.basew2),parseInt(this.baseh2),1.0-parseFloat(this.alpha));
//		console.log(_Img[_imgData[this.pat2][0]].src+",,,,"+(1.0-parseFloat(this.alpha)));
	    }
	    if(this.pat != -1){
		SpritePutS3(this.pat,parseInt(this.x)+parseInt(this.biasx),parseInt(this.y)+parseInt(this.biasy),this.t,
			    parseInt(this.basex),parseInt(this.basey),parseInt(this.basew),parseInt(this.baseh),parseFloat(this.alpha));
	    }
	    if(this.pat3 != -1){
		SpritePutS3(this.pat3,
			    parseInt(this.x3)+parseInt(this.biasx),
			    parseInt(this.y3)+parseInt(this.biasy),this.t,
			    parseInt(this.basex2),
			    parseInt(this.basey2),
			    parseInt(this.basew2),
			    parseInt(this.baseh2),parseFloat(this.alpha3));
		this.alpha3 -= 0.08;
		if(this.alpha3 < 0){
		    this.alpha3	= 0;
		}
		this.x3+=this.speedx;
		if(this.x3 > 480 || this.x3 < -480){
		    this.pat3	= -1;
		}
	    }
	}
    }
    var eyeData= [
	[
	    _NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,
	    _NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,
	    _NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,
	    _NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,
	    _NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,
	    _NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,
	    IMG_chara00e0,IMG_chara00e0,
	    IMG_chara00e1,IMG_chara00e1,
	],
	[
	    _NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,
	    _NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,
	    _NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,
	    _NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,
	    _NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,
	    _NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,
	    IMG_chara10e0,IMG_chara10e0,
	    IMG_chara10e1,IMG_chara10e1,
	],
	[
	    _NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,
	    _NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,
	    _NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,
	    _NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,
	    _NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,
	    _NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,_NULL,
	    IMG_chara20e0,IMG_chara20e0,
	    IMG_chara20e1,IMG_chara20e1,
	],
    ];
    var mouthData= [
	[
	    _NULL,_NULL,_NULL,
	    IMG_chara00m0,IMG_chara00m0,
	    IMG_chara00m1,IMG_chara00m1,
	],
	[
	    _NULL,_NULL,_NULL,
	    IMG_chara10m0,IMG_chara10m0,
	    IMG_chara10m1,IMG_chara10m1,
	],
	[
	    _NULL,_NULL,_NULL,
	    IMG_chara20m0,IMG_chara20m0,
	    IMG_chara20m1,IMG_chara20m1,
	],
    ];
    this.putchara = function(){
	if(this._visible){
	    if(this.pat2 != -1){
		SpritePutS4(this.pat2,parseInt(this.x)-parseInt(this.biasx),parseInt(this.y)+parseInt(this.biasy),this.t,this.scalex,this.scaley,1.0-parseFloat(this.alpha));
	    }
	    if(this.pat != -1){
		SpritePutS4(this.pat,parseInt(this.x)+parseInt(this.biasx),parseInt(this.y)+parseInt(this.biasy),this.t,this.scalex,this.scaley,parseFloat(this.alpha));
		if(!DisEyeFlag && this.eflag){
		    if(eyeData[this.id][this.counte] != _NULL){
			SpritePutS4(eyeData[this.id][this.counte],parseInt(this.x)+parseInt(this.biasx),parseInt(this.y)+parseInt(this.biasy),this.t,this.scalex,this.scaley,parseFloat(this.alpha));
		    }
		    this.counte++;
		    if(this.counte >= eyeData[this.id].length){
			this.counte	= Random(40)+20;
		    }
		}
		if(--this.mflag > 0){
		    if(mouthData[this.id][this.countm] != _NULL){
			SpritePutS4(mouthData[this.id][this.countm],parseInt(this.x)+parseInt(this.biasx),parseInt(this.y)+parseInt(this.biasy),this.t,this.scalex,this.scaley,parseFloat(this.alpha));
		    }
		    this.countm++;
		    if(this.countm >= mouthData[this.id].length){
			this.countm	= 0;
		    }
		}
	    }
	}
    }
    this.settitle	= function(title){	// タイトルのセット
	this.word	= title;
	this._mode	= 0;
	this._count	= 0;
	this._pcount	= 0;
	this.alpha	= 0;
	this.color	= 0xffffff;
    }
    this.puttitle	= function(){		// タイトル表示
	if(this._visible){
	    PutLetterStroke(this.word,_FONT_MIDDLE,this.x,this.y,this.color,0x000000,imgCL,this.alpha);
	    switch(this._mode){
	    case	0:
		this.alpha += 0.3;
		if(this.alpha > 1){
		    this.alpha	= 1;
		    this._mode	= 1;
		}
		break;
	    case	1:
		if(++this._count > 40){
		    this._mode	= 2;
		}
		break;
	    case	2:
		this.alpha -= 0.3;
		if(this.alpha < 0){
		    this.alpha	= 0;
		    this._mode	= 3;
		    this._visible	= false;
		}
		break;
	    }
	}
    }

    this.settime = function(timeh,timem){	// 時刻セット
	this._mode	= 0;
	if(timeh >= 12){
	    this.timeword[0]	= "P";
	    this.timeword[1]	= "M";
	    timeh -= 12;
	}
	else{
	    this.timeword[0]	= "A";
	    this.timeword[1]	= "M";
	}
	this.timeword[2]	= "";
	this.timeword[3]	= Math.floor(timeh/10);
	this.timeword[4]	= timeh%10;
	this.timeword[5]	= ":";
	this.timeword[6]	= Math.floor(timem/10);
	this.timeword[7]	= timem%10;
	this._count	= 0;
	this.alpha	= 1;
    }
    this.puttime = function(){		// 時刻表示
	if(this._visible){
	    switch(this._mode){
	    case	0:
		if(this._pcount%2 == 0){
		    FillRect(this.x,this.y,_fontSize[_FONT_MIDDLE]*1.5,_fontSize[_FONT_MIDDLE]*2,0xffffff,this.alpha);
		}
		if(this._pcount > 10){
		    this._mode	= 1;
		}
		break;
	    case	1:
		FillRect(this.x+(this._count)*_fontSize[_FONT_MIDDLE]*1.3,this.y,_fontSize[_FONT_MIDDLE]*1.5,_fontSize[_FONT_MIDDLE]*2,0xffffff,this.alpha);
		for(var i = 0; i < this._count; i++){
		    PutLetterStroke(""+this.timeword[i],_FONT_MIDDLE,this.x+i*_fontSize[_FONT_MIDDLE]*1.3,this.y,this.color,0x000000,imgTL,this.alpha);
		}
		if(this._pcount%2 == 0){
		    this._count++;
		    if(this._count > 8){
			this._count	= 8;
			this._mode	= 2;
			this._pcount	= 0;
		    }
		}
		break;
	    case	2:
		if(this._pcount%2 == 0){
		    FillRect(this.x+(this._count)*_fontSize[_FONT_MIDDLE]*1.3,this.y,_fontSize[_FONT_MIDDLE]*1.5,_fontSize[_FONT_MIDDLE]*2,0xffffff,this.alpha);
		}
		for(var i = 0; i < this._count; i++){
		    PutLetterStroke(""+this.timeword[i],_FONT_MIDDLE,this.x+i*_fontSize[_FONT_MIDDLE]*1.3,this.y,this.color,0x000000,imgTL,this.alpha);
		}
		if(this._pcount > 20){
		    this.alpha -= 0.3;
		    if(this.alpha < 0){
			this.alpha	= 0;
			this._mode	= 3;
			this._visible	= false;
		    }
		}
		break;
	    }
	    this._pcount++;
	}
    }
    this.fadeput = function(){
	if(this._visible){
	    switch(this.type){
	    case	0:	// FADE
	    case	1:
		FillRect(this.x,this.y,this.width,this.height,this.color,this.alpha);
		break;
	    case	4:	// WIPE
		SpritePut(this.pat,this.x,this.y,this.t,this.alpha);
		break;
	    case	5:	// SLODE
		switch(this.mode){
		case	0:	// WIPE_OUT = 待ち
		    SpritePut(this.pat,this.x,this.y,this.t,this.alpha);
		    break;
		case	1:	// WIPE_IN ぺらぺら変わる
		    if(this._pcount*48 < 480){
			SpritePutR(this.pat,this.x+this._pcount*48,this.y,this.t,this.alpha,480-this._pcount*48,320,(this._pcount*48),0,480-(this._pcount*48),320);
		    }
		    this.alpha -= 0.08;
		    if(this.alpha < 0){
			this.alpha	= 0;
		    }
		    this._pcount ++;
		    break;
		}
		break;
	    case	6:	// SLODE
		switch(this.mode){
		case	0:	// WIPE_OUT = 待ち
		    SpritePut(this.pat,this.x,this.y,this.t,this.alpha);
		    break;
		case	1:	// WIPE_IN ぺらぺら変わる
		    if(this._pcount*48 < 480){
			SpritePutR(this.pat,this.x,this.y,this.t,this.alpha,480-this._pcount*48,320,0,0,480-this._pcount*48,320);
		    }
		    this.alpha -= 0.08;
		    if(this.alpha < 0){
			this.alpha	= 0;
		    }
		    this._pcount ++;
		    break;
		}
		break;
	    case	10:	// 
		SpritePutS(this.pat,ScreenWidth/2,ScreenHeight/2,imgCC,this.scale,this.scale,0,1);
		FillRect(this.x,this.y,this.width,this.height,this.color,this.tmp);
		break;
	    case	11:	// 
		FillRect(this.x,this.y,this.width,this.height,this.color,1);
		SpritePutS(this.pat,ScreenWidth/2,ScreenHeight/2,imgCC,1,1,this._pcount+=4,1);
		FillRect(this.x,this.y,this.width,this.height,this.color,this.alpha);
		break;
/*
	    case	13:	// rotのfadein
		SpritePutS(IMG_bg0,ScreenWidth/2,ScreenHeight/2,imgCC,1,1,this._pcount+=4,this.alpha);
		break;
	    case	12:	// 
		SpritePut(this.pat,0,0,imgTL,1);
		FillRect(0,0,480,320,this.color,this.alpha);
		break;
*/
	    }
	}
    }

    this.fadeput2 = function(){
	if(this._visible){
	    switch(this.type){
	    case	0:	// FADE
	    case	1:
		FillRect(this.x,this.y,this.width,this.height,this.color,this.alpha);
		break;
	    case	4:	// WIPE
		SpritePutS3(this.pat,parseInt(this.x)+parseInt(this.biasx),parseInt(this.y)+parseInt(this.biasy),this.t,
			    parseInt(this.basex),parseInt(this.basey),parseInt(this.basew),parseInt(this.baseh),parseFloat(this.alpha));
		break;
	    case	5:	// SLODE
		switch(this.mode){
		case	0:	// WIPE_OUT = 待ち
		    SpritePutS3(this.pat,parseInt(this.x)+parseInt(this.biasx),parseInt(this.y)+parseInt(this.biasy),this.t,
				parseInt(this.basex),parseInt(this.basey),parseInt(this.basew),parseInt(this.baseh),parseFloat(this.alpha));
		    break;
		case	1:	// WIPE_IN ぺらぺら変わる
		    if(++this._pcount*48 < 480){
			ClipOn(this._pcount*48,0,480-this._pcount*48,360);
			SpritePutS3(this.pat,parseInt(this.x)+parseInt(this.biasx),parseInt(this.y)+parseInt(this.biasy),this.t,
				    parseInt(this.basex),parseInt(this.basey),parseInt(this.basew),parseInt(this.baseh),parseFloat(this.alpha));
			ClipOff();
		    }
		    this.alpha -= 0.08;
		    if(this.alpha < 0){
			this.alpha	= 0;
		    }
//		    this._pcount ++;
		    break;
		}
		break;
	    case	6:	// SLODE
		switch(this.mode){
		case	0:	// WIPE_OUT = 待ち
		    SpritePutS3(this.pat,parseInt(this.x)+parseInt(this.biasx),parseInt(this.y)+parseInt(this.biasy),this.t,
				parseInt(this.basex),parseInt(this.basey),parseInt(this.basew),parseInt(this.baseh),parseFloat(this.alpha));
		    break;
		case	1:	// WIPE_IN ぺらぺら変わる
		    if(++this._pcount*48 < 480){
			ClipOn(0,0,480-this._pcount*48,360);
			SpritePutS3(this.pat,parseInt(this.x)+parseInt(this.biasx),parseInt(this.y)+parseInt(this.biasy),this.t,
				    parseInt(this.basex),parseInt(this.basey),parseInt(this.basew),parseInt(this.baseh),parseFloat(this.alpha));
			ClipOff();
		    }
		    this.alpha -= 0.08;
		    if(this.alpha < 0){
			this.alpha	= 0;
		    }
//		    this._pcount ++;
		    break;
		}
		break;
	    case	10:	// 
		SpritePutS(this.pat,ScreenWidth/2,ScreenHeight/2,imgCC,this.scale,this.scale,0,1);
		FillRect(this.x,this.y,this.width,this.height,this.color,this.tmp);
		break;
	    case	11:	// 
		FillRect(this.x,this.y,this.width,this.height,this.color,1);
		SpritePutS(this.pat,ScreenWidth/2,ScreenHeight/2,imgCC,1,1,this._pcount+=4,1);
		FillRect(this.x,this.y,this.width,this.height,this.color,this.alpha);
		break;
/*
	    case	13:	// rotのfadein
		SpritePutS(IMG_bg0,ScreenWidth/2,ScreenHeight/2,imgCC,1,1,this._pcount+=4,this.alpha);
		break;
	    case	12:	// 
		SpritePut(this.pat,0,0,imgTL,1);
		FillRect(0,0,480,320,this.color,this.alpha);
		break;
*/
	    }
	}
    }

    this.putfadechara = function(){
	if(this._visible){
	    if(this.pat != -1){
		switch(FadeObj.type){
		case	5:	// SLODE
		    switch(FadeObj.mode){
		    case	0:	// WIPE_OUT = 待ち
			SpritePutS4(this.pat,parseInt(this.x)+parseInt(this.biasx),parseInt(this.y)+parseInt(this.biasy),this.t,this.scalex,this.scaley,parseFloat(this.alpha));
			break;
		    case	1:	// WIPE_IN ぺらぺら変わる
			if(FadeObj._pcount*48 < 480){
			    ClipOn(FadeObj._pcount*48,0,480-FadeObj._pcount*48,360);
			    SpritePutS4(this.pat,parseInt(this.x)+parseInt(this.biasx),parseInt(this.y)+parseInt(this.biasy),this.t,this.scalex,this.scaley,parseFloat(this.alpha));
			    ClipOff();
			}
			break;
		    }
		    break;
		case	6:	// SLODE
		    switch(FadeObj.mode){
		    case	0:	// WIPE_OUT = 待ち
			SpritePutS4(this.pat,parseInt(this.x)+parseInt(this.biasx),parseInt(this.y)+parseInt(this.biasy),this.t,this.scalex,this.scaley,parseFloat(this.alpha));
			break;
		    case	1:	// WIPE_IN ぺらぺら変わる
			if(FadeObj._pcount*48 < 480){
			    ClipOn(0,0,480-FadeObj._pcount*48,360);
			    SpritePutS4(this.pat,parseInt(this.x)+parseInt(this.biasx),parseInt(this.y)+parseInt(this.biasy),this.t,this.scalex,this.scaley,parseFloat(this.alpha));
			    ClipOff();
			}
			break;
		    }
		    break;
		default:
		    SpritePutS4(this.pat,parseInt(this.x)+parseInt(this.biasx),parseInt(this.y)+parseInt(this.biasy),this.t,this.scalex,this.scaley,parseFloat(this.alpha));
		    break;
		}
	    }
	}
    }

    this.putfog = function(){
	switch(this._effect){
	case	0:
	case	1:
	    if(this._visible && (this._pcount%this._blinktime) >= this._blink){
		SpritePut(this.pat,this.x,this.y,this.t,this.alpha);
	    }
	    break;
	case	2:
	    if(this._visible){
		SpritePut(this.pat,this.x+480,parseInt(this.y)+parseInt(this.biasy),this.t,this.alpha);
		SpritePut(this.pat,this.x-480,parseInt(this.y)+parseInt(this.biasy),this.t,this.alpha);
		SpritePut(this.pat,this.x,parseInt(this.y)+parseInt(this.biasy),this.t,this.alpha);
	    }
	    break;
	case	7:
	    if(this._visible && (this._pcount%this._blinktime) >= this._blink){
		SpritePut(this.pat,this.x,this.y,this.t,this.alpha);
		PutLetterStroke(this.word,_FONT_MIDDLE0,240,this.y,this.color,0x000000,imgCC,1);
	    }
	    break;
	}
	this._pcount++;
    }
    this.putPanel0 = function(){
	if(this._visible && (this._pcount%this._blinktime) >= this._blink){
//	    FillPanel(this.x,this.y,this.width,this.height,PanelTypeColor[this.paneltype][0],PanelTypeColor[this.paneltype][1],PanelTypeColor[this.paneltype][2],this.alpha,4,this.shadow);
	    SpritePut(this.pat,this.x,this.y,this.t,this.alpha);
	    if(this.paneltype != 0){
		FillRect(this.x,this.y,this.width,this.height,PanelTypeColor[this.paneltype][0],0.4);
	    }
	}
	this.puttype = 3;
    }
    this.putPanel = function(){
	this.putPanelFont(_FONT_SMALL,200);
	this.puttype = 4;
    }
    this.putPanelFont = function(_font,_fwidth){
	this.font = _font;
	this.fwidth = _fwidth;
	this.putPanel0();
	if(this._visible && (this._pcount%this._blinktime) >= this._blink){
	    PutLetterDivStroke(this.word,_font,_fwidth,this.x+6,this.y+2,this.color,0x000000);
	}
	this._pcount++;
	this.puttype = 5;
    }
    this.putPanelPat = function(){
//	this.putPanel0();
	if(this._visible && (this._pcount%this._blinktime) >= this._blink){
	    SpritePutR(this.pat,this.x+3,this.y+3,this.t,this.alpha,140-2,92-2,0,0,_Img[_imgData[this.pat]].width,Math.min(320,_Img[_imgData[this.pat]].height));
	}
	this._pcount++;
	this.puttype = 6;
    }
    this.putblink	= function(){
	if(this._visible){
	    FillRect(this.x,this.y,ScreenWidthOrg,ScreenHeightOrg,this.color,this.alpha);
	}
    }
    this.putfilter	= function(){
	if(this._visible){
	    if(this.pat == -1){
		FillRect(this.x,this.y,ScreenWidthOrg,ScreenHeightOrg,this.color,this.alpha);
	    }
	    else {
		SpritePut(this.pat,this.x,this.y,this.t,this.alpha);
	    }
	}
	this._pcount++;
    }
}