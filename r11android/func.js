//----------------------------------------------------------------------//
//
//----------------------------------------------------------------------//
_Img = [];//new Array(_PNG_MAX);
var _putNum = 0;
var _putData = new Array(_PUTDATA_MAX);//[_PUTDATA_MAX][10];
var _fontData = new Array("bold 10px Helvetica",
			  "bold 12px Helvetica",
			  "bold 14px Helvetica",
			  "bold 16px Helvetica",
			  "bold 17px Helvetica",
			  "bold 24px Helvetica");
var _fontSize = new Array(5,6,7,8,8.5,12);
var _WordData	= new Array(
    "タイトル",
			    "","","","","","","","","","",
			    "","","","","","","","","","");
var _WordTmp	= new Array(_PUTDATA_MAX);
var touchOn	= false;
var touchOnF	= false;
var touchOff	= false;
var touchOnCount	= 0;
var touchX	= 0;
var touchY	= 0;
var touchXOld	= 0;
var touchYOld	= 0;
var touchAct	= false;
var touchMoveX	= 0;
var touchMoveY	= 0;
var touchBaseX	= 0;
var touchBaseY	= 0;
var touchBiasX	= 0;
var touchBiasY	= 0;
var touchSpeedX	= 0;
var touchSpeedY	= 0;
var SlideAct	= 0;

var	_Audio;// = new Audio("");
var	_AudioSE;// = new Audio("");
var	_AudioSE2;// = new Audio("");
var	_AudioVoice;// = new Audio("");
var	audioObj2	= null;
var	AudioLevel	= 0;
//----------------------------------------------------------------------//
//
//----------------------------------------------------------------------//
funcInit=function(){
    for(var i = 0; i < _PUTDATA_MAX;i++){
	_putData[i]	= new Array(11);
    }
}

loadImg=function(_data){
    if(devicetype != 2){
	for(var i = 0; i < _data.length; i++){
	    loadImage(i,ResPng+_data[i]+".png");
	}
    }
    else{
	for(var i = 0; i < _data.length; i++){
	    loadImage(i,ResPngA+_data[i]+".png");
	}
    }

}
delImg=function(_data){
    for(var i = 0; i < _data.length; i++){
	_Img[i]	= null;
    }
}

//----------------------------------------------------------------------//
//
//----------------------------------------------------------------------//
var loadingCount=0;
//コンストラクタ
function Graphics(canvas) {
}

// 
function funcinit() {
  _putNum = 0;
}
function audioInit(){
    if(devicetype == 0){
	return;
    }
    var url = "/android_asset/www/res/snd/click01.wav";
    if(devicetype != 2){
	url = "res/snd/click01.wav";
    }
    if(audioObj2 == null){
	audioObj2 = new Media(url, audioEnd, audioError);
    }
    delete url;
}

function audioPlay(){
    if(devicetype == 0){
	return;
    }
    audioObj2.pause();
    audioObj2.play();
}

function audioEnd(){
}

function audioError(e){
}

//----------------------------------------------------------------------//
//
//----------------------------------------------------------------------//
//イメージの読み込み
function loadImage(i,src) {
    SetImageNum++;
//    console.log("iiiiiiiiiiiiii:"+i+","+src);
    loadingCount++;
    _Img[i]	= new Image();
    _Img[i].onload = function() {
	loadingCount--;
    }
    _Img[i].src	= src;
}

//----------------------------------------------------------------------//
//
//----------------------------------------------------------------------//
function DrawLine(x0,y0,x1,y1,color,a){
    if(_putNum < _PUTDATA_MAX){
	_putData[_putNum][0] = _PUTTYPE_LINE
	_putData[_putNum][1] = x0;
	_putData[_putNum][2] = y0;
	_putData[_putNum][3] = x1;
	_putData[_putNum][4] = y1;
	_putData[_putNum][5] = color;
	_putData[_putNum][6] = a;
	_putNum++;
    }
}
function FillArc(x,y,r,color,a,s){
  if(_putNum < _PUTDATA_MAX){
    _putData[_putNum][0] = _PUTTYPE_FILLARC;
    _putData[_putNum][1] = x;
    _putData[_putNum][2] = y;
    _putData[_putNum][3] = r;
    _putData[_putNum][4] = color;
    _putData[_putNum][5] = a;
    _putData[_putNum][6] = s;
    _putNum++;
  }
}
function FillRect(x,y,w,h,color,a){
  if(_putNum < _PUTDATA_MAX){
    _putData[_putNum][0] = _PUTTYPE_FILLRECT;
    _putData[_putNum][1] = x;
    _putData[_putNum][2] = y;
    _putData[_putNum][3] = w;
    _putData[_putNum][4] = h;
    _putData[_putNum][5] = color;
    _putData[_putNum][6] = a;
    _putNum++;
  }
}
function FillRectR(x,y,w,h,color,a,r,s){
  if(_putNum < _PUTDATA_MAX){
    _putData[_putNum][0] = _PUTTYPE_FILLRECTR;
    _putData[_putNum][1] = x;
    _putData[_putNum][2] = y;
    _putData[_putNum][3] = w;
    _putData[_putNum][4] = h;
    _putData[_putNum][5] = color;
    _putData[_putNum][6] = a;
    _putData[_putNum][7] = r;
    _putData[_putNum][8] = s;
    _putNum++;
  }
}
function FillPanel(x,y,w,h,color,color2,colore,a,r,s){
  if(_putNum < _PUTDATA_MAX){
    _putData[_putNum][0] = _PUTTYPE_FILLPANEL;
    _putData[_putNum][1] = x;
    _putData[_putNum][2] = y;
    _putData[_putNum][3] = w;
    _putData[_putNum][4] = h;
    _putData[_putNum][5] = color;
    _putData[_putNum][6] = color2;
    _putData[_putNum][7] = a;
    _putData[_putNum][8] = r;
    _putData[_putNum][9] = s;
    _putData[_putNum][10] = colore;
    _putNum++;
  }
}
function DrawRectR(x,y,w,h,color,a,r,s){
  if(_putNum < _PUTDATA_MAX){
    _putData[_putNum][0] = _PUTTYPE_DRAWRECTR;
    _putData[_putNum][1] = x;
    _putData[_putNum][2] = y;
    _putData[_putNum][3] = w;
    _putData[_putNum][4] = h;
    _putData[_putNum][5] = color;
    _putData[_putNum][6] = a;
    _putData[_putNum][7] = r;
    _putData[_putNum][8] = s;
    _putNum++;
  }
}
function ClipOn(x,y,w,h){
  if(_putNum < _PUTDATA_MAX){
      _putData[_putNum][0] = _PUTTYPE_CLIPON;
      _putData[_putNum][1] = x;
      _putData[_putNum][2] = y;
      _putData[_putNum][3] = w;
      _putData[_putNum][4] = h;
    _putNum++;
  }
}
function ClipOff(){
  if(_putNum < _PUTDATA_MAX){
      _putData[_putNum][0] = _PUTTYPE_CLIPOFF;
      _putData[_putNum][1] = 0;
      _putData[_putNum][2] = 0;
      _putData[_putNum][3] = 300;//ScreenWidth;
      _putData[_putNum][4] = 200;//ScreenHeight;
    _putNum++;
  }
}

function SetWord(_id,_str){
  _WordData[_id]	= _str;
}

function strlen(str) {
    var len = 0;
    var str = escape(str);
    for (var i = 0; i < str.length; i++, len++) {
	if (str.charAt(i) == "%") {
            if (str.charAt(++i) == "u") {
		i += 3;
		len++;
            }
            i++;
	}
    }
    delete len;
    delete str;
//    console.log(",,,"+len);
    return len;
}
function strlen2(_g,font,str){
    _g.font = _fontData[font];
    return _g.measureText(str).width; 
}


function DivLetter(str,size,width) {
    var line = 0;
//    console.log("str");
    for (var i=0; i < str.length; ++i) {
	var chars = str.charAt(i);
//	if ( parseInt(strlen(_WordData[WORD_TMP00+line]+chars)*_fontSize[size]) > parseInt(width)){// || chars.match(/\n/)) {
	if ( parseInt(strlen2(g,size,_WordData[WORD_TMP00+line]+chars)) > parseInt(width)){// || chars.match(/\n/)) {
	    if(chars.match(/。/) || chars.match(/？/) || chars.match(/、/) || chars.match(/」/) || chars.match(/）/) || chars.match(/！/) || chars.match(/』/)){
		;
	    }
	    else{
		++line;
		_WordData[WORD_TMP00+line] = "";
		if(chars.match(/\n/)) {
		    chars = "";
		}
	    }
	}
	else if(chars.match(/\n/)) {
	    ++line;
	    _WordData[WORD_TMP00+line] = "";
	    chars = "";
	}
	_WordData[WORD_TMP00+line] += chars;
        delete chars;
    }
    return	line;
}
function PutLetterDiv(str,size,width,x,y,color) {
    _WordData[WORD_TMP00] = "";
    var num = DivLetter(str,size,width)
    for(var i = 0; i <= num; i++){
	PutLetter(WORD_TMP00+i,size,x,y+i*(_fontSize[size]*2+1),color);
    }
    delete num;
}
function PutLetterDivStroke(str,size,width,x,y,color,color2) {
    _WordData[WORD_TMP00] = "";
    var num = DivLetter(str,size,width);
    for(var i = 0; i <= num; i++){
	PutLetterStroke(_WordData[WORD_TMP00+i],size,x,y+i*(_fontSize[size]*2+1),color,color2,imgTL,1);
    }
    return num;
}
function PutLetterDivStroke2(str,size,width,x,y,color,color2,t,a) {
    _WordData[WORD_TMP00] = "";
    var num = DivLetter(str,size,width);
    for(var i = 0; i <= num; i++){
	PutLetterStroke(_WordData[WORD_TMP00+i],size,x,y+i*(_fontSize[size]*2+1),color,color2,t,a);
    }
    return num;
}

function PutLetterStroke(str,size,x,y,color,color2,t,a) {
    if(_putNum < _PUTDATA_MAX){
	_putData[_putNum][0]	= _PUTTYPE_WORD2;
	_putData[_putNum][1]	= WORD_TMP00;

	var _len	= strlen(str);
	var x1	= 0;
	var y1	= 0;
	var w	= strlen2(g,size,str);//_len*_fontSize[size];
	var h	= _fontSize[size]*2;
	switch(t){
	case	imgTL:
	    break;
	case	imgTC:
	    x1	= w/2;
	    break;
	case	imgTR:
	    x1	= w;
	    break;
	case	imgCL:
	    y1	= h/2;
	    break;
	case	imgCC:
	    x1	= w/2;
	    y1	= h/2;
	    break;
	case	imgCR:
	    x1	= w;
	    y1	= h/2;
	    break;
	case	imgBL:
	    y1	= h;
	    break;
	case	imgBC:
	    x1	= w/2;
	    y1	= h;
	    break;
	case	imgBR:
	    x1	= w;
	    y1	= h;
	    break;
	}
	_putData[_putNum][2]	= x-x1;
	_putData[_putNum][3]	= y-y1;
	_putData[_putNum][4]	= size;
	_putData[_putNum][5]	= color;
	_putData[_putNum][6]	= color2;
	_putData[_putNum][7]	= a;
	_WordTmp[_putNum]	= str;//_WordData[i];
	_putNum++;

	delete _len;
	delete x1;
	delete y1;
	delete w;
	delete h;
    }
}

function PutLetterS(str,size,x,y,color,t) {
    if(_putNum < _PUTDATA_MAX){
	_putData[_putNum][0]	= _PUTTYPE_WORD;
	_putData[_putNum][1]	= WORD_TMP00;

	var _len	= strlen(str);
	var x1	= 0;
	var y1	= 0;
	var w	= _len*_fontSize[size];
	var h	= _fontSize[size];
	switch(t){
	case	imgTL:
	    break;
	case	imgTC:
	    x1	= w/2;
	    break;
	case	imgTR:
	    x1	= w;
	    break;
	case	imgCL:
	    y1	= h/2;
	    break;
	case	imgCC:
	    x1	= w/2;
	    y1	= h/2;
	    break;
	case	imgCR:
	    x1	= w;
	    y1	= h/2;
	    break;
	case	imgBL:
	    y1	= h;
	    break;
	case	imgBC:
	    x1	= w/2;
	    y1	= h;
	    break;
	case	imgBR:
	    x1	= w;
	    y1	= h;
	    break;
	}
	_putData[_putNum][2]	= x-x1;
	_putData[_putNum][3]	= y-y1;
	_putData[_putNum][4]	= size;
	_putData[_putNum][5]	= color;
	_WordTmp[_putNum]	= str;//_WordData[i];
	_putNum++;

	delete _len;
	delete x1;
	delete y1;
	delete w;
	delete h;
    }
}

function PutLetter(i,size,x,y,color) {
  if(_putNum < _PUTDATA_MAX){
    _putData[_putNum][0] = _PUTTYPE_WORD;
    _putData[_putNum][1] = i;
    _putData[_putNum][2] = x;
    _putData[_putNum][3] = y;
    _putData[_putNum][4] = size;
    _putData[_putNum][5] = color;
    _WordTmp[_putNum]	= _WordData[i];
    _putNum++;
  }
}

function SpritePutR(i,x,y,t,a,dw,dh,bx,by,bw,bh) {
    if(_putNum < _PUTDATA_MAX){
	var x1	= 0;
	var y1	= 0;
	var w	= dw;//_imgData[i][3];
	var h	= dh;//_imgData[i][4];
	switch(t){
	case	imgTL:
	    break;
	case	imgTC:
	    x1 = w/2;
	    break;
	case	imgTR:
	    x1 = w;
	    break;
	case	imgCL:
	    y1 = h/2;
	    break;
	case	imgCC:
	    x1 = w/2;
	    y1 = h/2;
	    break;
	case	imgCR:
	    x1 = w;
	    y1 = h/2;
	    break;
	case	imgBL:
	    y1 = h;
	    break;
	case	imgBC:
	    x1 = w/2;
	    y1 = h;
	    break;
	case	imgBR:
	    x1 = w;
	    y1 = h;
	    break;
	}
	_putData[_putNum][0] = _PUTTYPE_SPRITES;
	_putData[_putNum][1] = _imgData[i][0];
	_putData[_putNum][2] = x-x1;	// dx	表示位置
	_putData[_putNum][3] = y-y1;	// dy
	_putData[_putNum][4] = dw;//_imgData[i][3];	// dw　表示サイズ（スケーリングにも使える）
	_putData[_putNum][5] = dh;//_imgData[i][4];	// dh
	_putData[_putNum][6] = bx;//_imgData[i][1];	// ベースimage座標
	_putData[_putNum][7] = by;//_imgData[i][2];
	_putData[_putNum][8] = bw;//_imgData[i][3];	// ベースimageサイズ
	_putData[_putNum][9] = bh;//_imgData[i][4];
	_putData[_putNum][10] = a;
	_putNum++;
	delete x1;
	delete y1;
	delete w;
	delete h;
    }
}

function SpritePut(i,x,y,t,a) {
    if(_putNum < _PUTDATA_MAX && i != -1){
	var x1	= 0;
	var y1	= 0;
	var w	= _Img[_imgData[i][0]].width;
	var h	= _Img[_imgData[i][0]].height;
	if(_imgData[i][1] != null){
	    w	= _imgData[i][3];
	    h	= _imgData[i][4];
	}
	switch(t){
	case	imgTL:
	    break;
	case	imgTC:
	    x1 = w/2;
	    break;
	case	imgTR:
	    x1 = w;
	    break;
	case	imgCL:
	    y1 = h/2;
	    break;
	case	imgCC:
	    x1 = w/2;
	    y1 = h/2;
	    break;
	case	imgCR:
	    x1 = w;
	    y1 = h/2;
	    break;
	case	imgBL:
	    y1 = h;
	    break;
	case	imgBC:
	    x1 = w/2;
	    y1 = h;
	    break;
	case	imgBR:
	    x1 = w;
	    y1 = h;
	    break;
	}
	if(_imgData[i][1] != null){
	    _putData[_putNum][0] = _PUTTYPE_SPRITES;
	    _putData[_putNum][1] = _imgData[i][0];
	    _putData[_putNum][2] = x-x1;	// dx	表示位置
	    _putData[_putNum][3] = y-y1;	// dy
	    _putData[_putNum][4] = _imgData[i][3];	// dw　表示サイズ（スケーリングにも使える）
	    _putData[_putNum][5] = _imgData[i][4];	// dh
	    _putData[_putNum][6] = _imgData[i][1];	// ベースimage座標
	    _putData[_putNum][7] = _imgData[i][2];
	    _putData[_putNum][8] = _imgData[i][3];	// ベースimageサイズ
	    _putData[_putNum][9] = _imgData[i][4];
	    _putData[_putNum][10] = a;
	}
	else{
	    _putData[_putNum][0] = _PUTTYPE_SPRITE;
	    _putData[_putNum][1] = _imgData[i][0];
	    _putData[_putNum][2] = x-x1;
	    _putData[_putNum][3] = y-y1;
	    _putData[_putNum][4] = a;
	    _putData[_putNum][5] = 0;
	}
	_putNum++;
	delete x1;
	delete y1;
	delete w;
	delete h;
    }
}
function SpritePutSh(i,x,y,t,a,s) {
    if(_putNum < _PUTDATA_MAX && i != -1){
	var x1	= 0;
	var y1	= 0;
	var w	= _Img[_imgData[i][0]].width;
	var h	= _Img[_imgData[i][0]].height;
	if(_imgData[i][1] != null){
	    w	= _imgData[i][3];
	    h	= _imgData[i][4];
	}
	switch(t){
	case	imgTL:
	    break;
	case	imgTC:
	    x1 = w/2;
	    break;
	case	imgTR:
	    x1 = w;
	    break;
	case	imgCL:
	    y1 = h/2;
	    break;
	case	imgCC:
	    x1 = w/2;
	    y1 = h/2;
	    break;
	case	imgCR:
	    x1 = w;
	    y1 = h/2;
	    break;
	case	imgBL:
	    y1 = h;
	    break;
	case	imgBC:
	    x1 = w/2;
	    y1 = h;
	    break;
	case	imgBR:
	    x1 = w;
	    y1 = h;
	    break;
	}
	_putData[_putNum][0] = _PUTTYPE_SPRITE;
	_putData[_putNum][1] = _imgData[i][0];
	_putData[_putNum][2] = x-x1;
	_putData[_putNum][3] = y-y1;
	_putData[_putNum][4] = a;
	_putData[_putNum][5] = s;
	_putNum++;
	delete x1;
	delete y1;
	delete w;
	delete h;
    }
}
function SpritePutS(i,x,y,t,sx,sy,r,a) {
    if(_putNum < _PUTDATA_MAX && i != -1){
	var x1	= 0;
	var y1	= 0;
	var w	= _Img[_imgData[i][0]].width;
	var h	= _Img[_imgData[i][0]].height;
	if(_imgData[i][1] != null){
	    w	= _imgData[i][3];
	    h	= _imgData[i][4];
	}
	switch(t){
	case	imgTL:
	    break;
	case	imgTC:
	    x1 = w/2;
	    break;
	case	imgTR:
	    x1 = w;
	    break;
	case	imgCL:
	    y1 = h/2;
	    break;
	case	imgCC:
	    x1 = w/2;
	    y1 = h/2;
	    break;
	case	imgCR:
	    x1 = w;
	    y1 = h/2;
	    break;
	case	imgBL:
	    y1 = h;
	    break;
	case	imgBC:
	    x1 = w/2;
	    y1 = h;
	    break;
	case	imgBR:
	    x1 = w;
	    y1 = h;
	    break;
	}
	if(_imgData[i][1] != null){
	    w	= _imgData[i][3];
	    h	= _imgData[i][4];
	}
	else{
	    _putData[_putNum][0] = _PUTTYPE_SPRITE2;
	    _putData[_putNum][1] = _imgData[i][0];
	    _putData[_putNum][2] = x;
	    _putData[_putNum][3] = y;
	    _putData[_putNum][4] = r;
	    _putData[_putNum][5] = x1;
	    _putData[_putNum][6] = y1;
	    _putData[_putNum][7] = sx;
	    _putData[_putNum][8] = sy;
	    _putData[_putNum][9] = a;
	    _putNum++;
	}
	delete x1;
	delete y1;
	delete w;
	delete h;
    }
}
function SpritePutS2(i,x,y,t,sx,sy,a) {
    if(_putNum < _PUTDATA_MAX){
	var x1	= 0;
	var y1	= 0;
	var w	= _Img[_imgData[i][0]].width;
	var h	= _Img[_imgData[i][0]].height;
	switch(t){
	case	imgTL:
	    break;
	case	imgTC:
	    x1 = w/2;
	    break;
	case	imgTR:
	    x1 = w;
	    break;
	case	imgCL:
	    y1 = h/2;
	    break;
	case	imgCC:
	    x1 = w/2;
	    y1 = h/2;
	    break;
	case	imgCR:
	    x1 = w;
	    y1 = h/2;
	    break;
	case	imgBL:
	    y1 = h;
	    break;
	case	imgBC:
	    x1 = w/2;
	    y1 = h;
	    break;
	case	imgBR:
	    x1 = w;
	    y1 = h;
	    break;
	}
	_putData[_putNum][0] = _PUTTYPE_SPRITES;
	_putData[_putNum][1] = _imgData[i][0];
	_putData[_putNum][2] = x-x1;	// dx	表示位置
	_putData[_putNum][3] = y-y1;	// dy
	_putData[_putNum][4] = sx;//_imgData[i][3];	// dw　表示サイズ（スケーリングにも使える）
	_putData[_putNum][5] = sy;//_imgData[i][4];	// dh
	_putData[_putNum][6] = 0;	// ベースimage座標
	_putData[_putNum][7] = 0;
	_putData[_putNum][8] = w;//_imgData[i][3];	// ベースimageサイズ
	_putData[_putNum][9] = h;//_imgData[i][4];
	_putData[_putNum][10] = a;
	_putNum++;
	delete x1;
	delete y1;
	delete w;
	delete h;
    }
}

function SpritePutS3(i,x,y,t,bx,by,bw,bh,a) {
    if(_putNum < _PUTDATA_MAX){
	var x1	= 0;
	var y1	= 0;
	var w	= 480;//_imgData[i][3];
	var h	= 360;//_imgData[i][4];
	switch(t){
	case	imgTL:
	    break;
	case	imgTC:
	    x1 = w/2;
	    break;
	case	imgTR:
	    x1 = w;
	    break;
	case	imgCL:
	    y1 = h/2;
	    break;
	case	imgCC:
	    x1 = w/2;
	    y1 = h/2;
	    break;
	case	imgCR:
	    x1 = w;
	    y1 = h/2;
	    break;
	case	imgBL:
	    y1 = h;
	    break;
	case	imgBC:
	    x1 = w/2;
	    y1 = h;
	    break;
	case	imgBR:
	    x1 = w;
	    y1 = h;
	    break;
	}
	_putData[_putNum][0] = _PUTTYPE_SPRITES;
	_putData[_putNum][1] = _imgData[i][0];
	_putData[_putNum][2] = x-x1;	// dx	表示位置
	_putData[_putNum][3] = y-y1;	// dy
	_putData[_putNum][4] = 480;//_imgData[i][3];	// dw　表示サイズ（スケーリングにも使える）
	_putData[_putNum][5] = 360;//_imgData[i][4];	// dh
	_putData[_putNum][6] = bx;//_imgData[i][1];	// ベースimage座標
	_putData[_putNum][7] = by;//_imgData[i][2];
	_putData[_putNum][8] = bw;//_imgData[i][3];	// ベースimageサイズ
	_putData[_putNum][9] = bh;//_imgData[i][4];
	_putData[_putNum][10] = a;
	_putNum++;
	delete x1;
	delete y1;
	delete w;
	delete h;
    }
}

function SpritePutS4(i,x,y,t,sx,sy,a) {
    if(_putNum < _PUTDATA_MAX){
	var x1	= 0;
	var y1	= 0;
	var w	= sx;//_imgData[i][3];
	var h	= sy;//_imgData[i][4];
	switch(t){
	case	imgTL:
	    break;
	case	imgTC:
	    x1 = w/2;
	    break;
	case	imgTR:
	    x1 = w;
	    break;
	case	imgCL:
	    y1 = h/2;
	    break;
	case	imgCC:
	    x1 = w/2;
	    y1 = h/2;
	    break;
	case	imgCR:
	    x1 = w;
	    y1 = h/2;
	    break;
	case	imgBL:
	    y1 = h;
	    break;
	case	imgBC:
	    x1 = w/2;
	    y1 = h;
	    break;
	case	imgBR:
	    x1 = w;
	    y1 = h;
	    break;
	}
	_putData[_putNum][0] = _PUTTYPE_SPRITES;
	_putData[_putNum][1] = _imgData[i][0];
	_putData[_putNum][2] = x-x1;	// dx	表示位置
	_putData[_putNum][3] = y-y1;	// dy
	_putData[_putNum][4] = sx;//_imgData[i][3];	// dw　表示サイズ（スケーリングにも使える）
	_putData[_putNum][5] = sy;//_imgData[i][4];	// dh
	_putData[_putNum][6] = 0;//_imgData[i][1];	// ベースimage座標
	_putData[_putNum][7] = 0;//_imgData[i][2];
	_putData[_putNum][8] = _Img[_imgData[i][0]].width;//_imgData[i][3];	// ベースimageサイズ
	_putData[_putNum][9] = _Img[_imgData[i][0]].height;//_imgData[i][4];
	_putData[_putNum][10] = a;
	_putNum++;
	delete x1;
	delete y1;
	delete w;
	delete h;
    }
}

//----------------------------------------------------------------------//
//
//----------------------------------------------------------------------//
//イメージの全描画
putAll=function(_g){
    _g.save();
    _g.scale(screenScale, screenScale);

    for(var i = 0; i < _putNum; i++){
	if(--_wait2 > 0 || _TouchFlag2 || (devicetype == 2 && _TouchFlag)){
	    break;
	}
	switch(_putData[i][0]){
	case	 _PUTTYPE_COLOR:
	    break;
	case	_PUTTYPE_FILLARC:
	    _g.save();
	    var color="rgb("+((_putData[i][4]>>16)&0xff)+","+((_putData[i][4]>>8)&0xff)+","+((_putData[i][4])&0xff)+")";
	    _g.shadowBlur = _putData[i][3]+4;
	    /* ぼかしの色を定義 */
	    _g.shadowColor = color;//"#ffffff";
	    /* 円を塗る */
	    _g.beginPath();
	    _g.arc(_putData[i][1],_putData[i][2], _putData[i][3], 0, Math.PI*2, false);
	    _g.globalAlpha	= _putData[i][5];
	    _g.fillStyle	= color;
	    _g.fill();
	    _g.restore();
	    break;
	case	_PUTTYPE_FILLRECT:
	    _g.save();
	    var color="rgb("+((_putData[i][5]>>16)&0xff)+","+((_putData[i][5]>>8)&0xff)+","+((_putData[i][5])&0xff)+")";
	    _g.fillStyle	= color;
	    _g.globalAlpha	= _putData[i][6];
	    _g.fillRect(_putData[i][1],_putData[i][2],_putData[i][3],_putData[i][4]);
	    _g.restore();
	    delete color;
	    break;
	case	_PUTTYPE_FILLRECTR:
	    //	_g.save();
	    var color="rgb("+((_putData[i][5]>>16)&0xff)+","+((_putData[i][5]>>8)&0xff)+","+((_putData[i][5])&0xff)+")";
	    if(_putData[i][8] == 1){
		_g.shadowColor = "rgb(20, 20, 20)";
		_g.shadowOffsetX = 2;
		_g.shadowOffsetY = 2;
		_g.shadowBlur = 4;
	    }
	    _g.fillStyle	= color;
	    _g.globalAlpha	= _putData[i][6];
	    _g.beginPath();
	    _g.arc(_putData[i][1] + _putData[i][7], _putData[i][2] + _putData[i][7], _putData[i][7], - Math.PI, - 0.5 * Math.PI, false);
	    _g.arc(_putData[i][1] + _putData[i][3] - _putData[i][7], _putData[i][2] + _putData[i][7], _putData[i][7], - 0.5 * Math.PI, 0, false);
	    _g.arc(_putData[i][1] + _putData[i][3] - _putData[i][7], _putData[i][2] + _putData[i][4] - _putData[i][7], _putData[i][7], 0, 0.5 * Math.PI, false);
	    _g.arc(_putData[i][1] + _putData[i][7], _putData[i][2] + _putData[i][4] - _putData[i][7], _putData[i][7], 0.5 * Math.PI, Math.PI, false);
	    _g.closePath();
	    _g.fill();
	    //	_g.restore();
	    delete color;
	    break;
	case	_PUTTYPE_FILLPANEL:
	    var grad  = _g.createLinearGradient(_putData[i][1],_putData[i][2], _putData[i][1],_putData[i][2]+_putData[i][4]);//_putData[i][4]);
	    var color="rgb("+((_putData[i][5]>>16)&0xff)+","+((_putData[i][5]>>8)&0xff)+","+((_putData[i][5])&0xff)+")";
	    var color2="rgb("+((_putData[i][6]>>16)&0xff)+","+((_putData[i][6]>>8)&0xff)+","+((_putData[i][6])&0xff)+")";
	    grad.addColorStop(0,color);
	    grad.addColorStop(1,color2);
	    _g.fillStyle = grad;
	    _g.globalAlpha	= _putData[i][7];
	    _g.beginPath();
	    _g.arc(_putData[i][1] + _putData[i][8], _putData[i][2] + _putData[i][8], _putData[i][8], - Math.PI, - 0.5 * Math.PI, false);
	    _g.arc(_putData[i][1] + _putData[i][3] - _putData[i][8], _putData[i][2] + _putData[i][8], _putData[i][8], - 0.5 * Math.PI, 0, false);
	    _g.arc(_putData[i][1] + _putData[i][3] - _putData[i][8], _putData[i][2] + _putData[i][4] - _putData[i][8], _putData[i][8], 0, 0.5 * Math.PI, false);
	    _g.arc(_putData[i][1] + _putData[i][8], _putData[i][2] + _putData[i][4] - _putData[i][8], _putData[i][8], 0.5 * Math.PI, Math.PI, false);
	    _g.closePath();
	    _g.fill();

	    color="rgb("+((_putData[i][10]>>16)&0xff)+","+((_putData[i][10]>>8)&0xff)+","+((_putData[i][10])&0xff)+")";
	    _g.strokeStyle	= color;
	    _g.globalAlpha	= _putData[i][7];
	    _g.beginPath();
	    _g.arc(_putData[i][1] + _putData[i][8], _putData[i][2] + _putData[i][8], _putData[i][8], - Math.PI, - 0.5 * Math.PI, false);
	    _g.arc(_putData[i][1] + _putData[i][3] - _putData[i][8], _putData[i][2] + _putData[i][8], _putData[i][8], - 0.5 * Math.PI, 0, false);
	    _g.arc(_putData[i][1] + _putData[i][3] - _putData[i][8], _putData[i][2] + _putData[i][4] - _putData[i][8], _putData[i][8], 0, 0.5 * Math.PI, false);
	    _g.arc(_putData[i][1] + _putData[i][8], _putData[i][2] + _putData[i][4] - _putData[i][8], _putData[i][8], 0.5 * Math.PI, Math.PI, false);
	    _g.closePath();
	    _g.stroke();


	    delete grad;
	    delete color;
	    delete color2;
	    break;
	case	_PUTTYPE_DRAWRECTR:
	    //	_g.save();
	    var color="rgb("+((_putData[i][5]>>16)&0xff)+","+((_putData[i][5]>>8)&0xff)+","+((_putData[i][5])&0xff)+")";
	    _g.strokeStyle	= color;
	    _g.globalAlpha	= _putData[i][6];
	    _g.beginPath();
	    _g.arc(_putData[i][1] + _putData[i][7], _putData[i][2] + _putData[i][7], _putData[i][7], - Math.PI, - 0.5 * Math.PI, false);
	    _g.arc(_putData[i][1] + _putData[i][3] - _putData[i][7], _putData[i][2] + _putData[i][7], _putData[i][7], - 0.5 * Math.PI, 0, false);
	    _g.arc(_putData[i][1] + _putData[i][3] - _putData[i][7], _putData[i][2] + _putData[i][4] - _putData[i][7], _putData[i][7], 0, 0.5 * Math.PI, false);
	    _g.arc(_putData[i][1] + _putData[i][7], _putData[i][2] + _putData[i][4] - _putData[i][7], _putData[i][7], 0.5 * Math.PI, Math.PI, false);
	    _g.closePath();
	    _g.stroke();
	    //	_g.restore();
	    delete color;
	    break;
	case	 _PUTTYPE_WORD:
	    {
		var color="rgb("+((_putData[i][5]>>16)&0xff)+","+((_putData[i][5]>>8)&0xff)+","+((_putData[i][5])&0xff)+")";
		_g.globalAlpha	= 1;
		_g.font = _fontData[_putData[i][4]];
		_g.strokeStyle	= color;
		_g.fillStyle	= color;
		_g.fillText(_WordTmp[i],_putData[i][2],_putData[i][3]+_fontSize[_putData[i][4]]*2);
		delete color;
	    }
	    break;
	case	 _PUTTYPE_WORD2:
	    {
		_g.font = _fontData[_putData[i][4]];
		_g.globalAlpha	= _putData[i][7];

		var color2="rgb("+((_putData[i][6]>>16)&0xff)+","+((_putData[i][6]>>8)&0xff)+","+((_putData[i][6])&0xff)+")";
		_g.strokeStyle	= color2;
		_g.fillStyle	= color2;
		_g.fillText(_WordTmp[i],_putData[i][2]-1,_putData[i][3]+_fontSize[_putData[i][4]]*2-1);
		_g.fillText(_WordTmp[i],_putData[i][2]+1,_putData[i][3]+_fontSize[_putData[i][4]]*2-1);
		_g.fillText(_WordTmp[i],_putData[i][2]-1,_putData[i][3]+_fontSize[_putData[i][4]]*2+1);
		_g.fillText(_WordTmp[i],_putData[i][2]+1,_putData[i][3]+_fontSize[_putData[i][4]]*2+1);

		var color="rgb("+((_putData[i][5]>>16)&0xff)+","+((_putData[i][5]>>8)&0xff)+","+((_putData[i][5])&0xff)+")";
		_g.strokeStyle	= color;
		_g.fillStyle	= color;
		_g.fillText(_WordTmp[i],_putData[i][2],_putData[i][3]+_fontSize[_putData[i][4]]*2);
		delete color;
		delete color2;
	    }
	    break;
	case	 _PUTTYPE_LINE:
	    {
		_g.lineWidth = 1;
		_g.lineCap = "round";
		var color="rgb("+((_putData[i][5]>>16)&0xff)+","+((_putData[i][5]>>8)&0xff)+","+((_putData[i][5])&0xff)+")";
		_g.strokeStyle	= color;
		_g.fillStyle	= color;
		_g.globalAlpha	= _putData[i][6];
		_g.beginPath();
		_g.moveTo(_putData[i][1],_putData[i][2]);
		_g.lineTo(_putData[i][3],_putData[i][4]);   
		_g.stroke();
		delete color;
	    }
	    break;
	case	 _PUTTYPE_SPRITE:
	    _g.save();
	    if(_putData[i][5] == 1){
		_g.shadowColor = "rgb(20, 20, 20)";
		_g.shadowOffsetX = 2;
		_g.shadowOffsetY = 2;
		_g.shadowBlur = 4;
	    }
	    _g.globalAlpha	= _putData[i][4];
	    _g.drawImage(_Img[_putData[i][1]],_putData[i][2],_putData[i][3]);
	    _g.restore();
	    break;
	case	_PUTTYPE_SPRITES:
	    if(_Img[_putData[i][1]] != null && _Img[_putData[i][1]].width > 0 && _Img[_putData[i][1]].height > 0){
		_g.save();
		_g.globalAlpha	= _putData[i][10];
		_g.drawImage(_Img[_putData[i][1]],
			    _putData[i][6],_putData[i][7],_putData[i][8],_putData[i][9],
			    _putData[i][2],_putData[i][3],_putData[i][4],_putData[i][5]);
		_g.restore();
	    }
	    break;
	case	 _PUTTYPE_SPRITE2:
	    _g.save();
	    _g.globalAlpha	= _putData[i][9];
	    _g.translate((_putData[i][2]),(_putData[i][3]));
	    _g.rotate(_putData[i][4]/180*Math.PI);
	    _g.scale(_putData[i][7], _putData[i][8]);
	    _g.translate(-(_putData[i][5]),-(_putData[i][6]));
	    _g.drawImage(_Img[_putData[i][1]],0,0);
	    _g.restore();
	    break;
	case	_PUTTYPE_CLIPON:
	    _g.save();
	    _g.beginPath();
	    _g.moveTo(_putData[i][1], _putData[i][2]);
	    _g.lineTo(_putData[i][1]+_putData[i][3], _putData[i][2]);
	    _g.lineTo(_putData[i][1]+_putData[i][3], _putData[i][2]+_putData[i][4]);
	    _g.lineTo(_putData[i][1], _putData[i][2]+_putData[i][4]);
	    _g.closePath();
	    _g.stroke();
	    _g.clip();
	    break;
	case	_PUTTYPE_CLIPOFF:
	    _g.restore();
	    break;
	}
    }
    _g.restore();
}

//----------------------------------------------------------------------//
//
//----------------------------------------------------------------------//
function O(_key){
    if(_BackButton){
	_BackButton	= false;
	return	true;
    }
    return	false;
}
function T(){
    if(touchOn){
	touchOn	= false;
	return	true;
    }
    return	false;
}
function _T(){
    if(touchOnF && touchOff){
	touchOff	= false;
	return	true;
    }
    return	false;
}
function TN(_x,_y,_w,_h){
    if(touchOnF && touchX >= _x && touchX <= _x+_w && touchY >= _y && touchY <= _y+_h){
	touchOnF = false;
	return	true;
    }
    return	false;
}
function Ton(_x,_y,_w,_h){
    if(touchOn && touchX >= _x && touchX <= _x+_w && touchY >= _y && touchY <= _y+_h){
	touchOn	= false;
	return	true;
    }
    return	false;
}
function Toff(_x,_y,_w,_h){
    if(touchOnF && touchOff && touchX >= _x && touchX <= _x+_w && touchY >= _y && touchY <= _y+_h){
	touchOff	= false;
	return	true;
    }
    return	false;
}
function	SlideRight(){
    if(touchAct && Math.abs(touchMoveY) < Math.abs(touchMoveX) && touchMoveX < -10){
	return	true;
    }
    return	false;
}
function	SlideLeft(){
    if(touchAct && Math.abs(touchMoveY) < Math.abs(touchMoveX) && touchMoveX > 10){
	return	true;
    }
    return	false;
}
function	SlideUp(){
    if(touchAct && Math.abs(touchMoveY) > Math.abs(touchMoveX) && touchMoveY > 10){
	return	true;
    }
    return	false;
}
function	SlideDown(){
    if(touchAct && Math.abs(touchMoveY) > Math.abs(touchMoveX) && touchMoveY < -10){
	return	true;
    }
    return	false;
}
function	keyInit(){
    touchOn	= false;
    touchOnF	= false;
    touchOff	= false;
    touchAct	= false;
}

function	Random(l) {  // getRand
    return Math.floor(Math.random () * 65536)%l;
}

function	addBackbutton(){
    _BackButton	= false;
    document.addEventListener("backbutton", function (){
	_BackButton	= true;
    },false);
}
function	removeBackbutton(){
    document.removeEventListener("backbutton", function (){
    },false);
}

//----------------------------------------------------------------------//
//
//----------------------------------------------------------------------//
