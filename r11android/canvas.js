//----------------------------------------------------------------------//
//
//----------------------------------------------------------------------//
var _count = 0;
var LocalMode	= 0;
var LocalUndo	= 0;
var LocalLog	= 0;
var LocalCounter	= 0;
var MenuMode	= 0;
var	MainMode	= MODE_INIT;
var	NextMode	= MODE_INIT;
var ChgMode;
var	TipsButton	= new Array(10);
var	MenuButton	= new Array(11);
var	SaveButton	= new Array(12);
var	BackButton	= new Array(2);
var	alpha	= 0;
var basePath;
var path;
var audioUrl;
var _BackButton;
var screenScale;
var canvas;
var canvas2;
var video;
var g;
var g2;
var devicetype;
var _userAgent;
var androidtype;
var _MainLoopFlag = false;
var _TouchFlag = false;
var _TouchFlag2 = false;
var _dialog = new dialog();
var _plugin = new pPlugin();
var _twitter;// = new Twitter();
var SoundFlag = 1;
var DlList;
var ChgImg = new Array(_PNG_MAX);
var ChgImgn = new Array(_PNG_MAX);
var SaveImg;
var LoadFlag = false;
var RegData	= new Array();	// セーブデータ
var TmpData	= new Array();	// セーブデータ
var RegSound	= new Array();	// セーブデータ
var PointFlag	= new Array();
var PointData;
var RegType;
var SelectSwicth = false;
var SelectMessNum;
var SelectMacroNum;
var SelectDDMode;
var _savecanvas;
//var BgFlag = new Array();	// bgアルバム
var MovieFlag = new Array();	// bgアルバム
var CGFlag = new Array();	// bgアルバム
var BgmFlag = new Array();	// bgm
var TipsFlag = new Array();	// tips
var FadeMode = -1;
var UVFadeFlag	= false;
var QueType = 0;
var SaveLock	= false;
var SaveDDMode;
var SaveMacroNum;
var NoSkipFlag = false;
var NoMenuFlag = false;
var DisKeyFlag	= false;
var DisEyeFlag	= false;
var SkipFlag = false;
var SkipCancel = false;
var AutoFlag = false;
var AutoCount = 0;
var Saveimage = -1;
var NewGame = 0;
var AppendGame = -1;
var ShortcutGame = -1;
var LogList	= new Array();
var NoWindow	= false;
var ResultData	= new Array();

var EffType = 0;

var _ET_non = 0;
var _ET_quake = 1;
var _ET_quake2 = 2;
var DirectLoad = false;
var _wait = 0;
var _wait2 = 0;
var _StartFlag = true;
var qdata = null;
var buttonWait = 0;
var VoiceFlag = true;
var MacAddress = "A4:BA:DB:FB:66:4E";
var NewFlag = false;
var MaskCount	= 0;
var ChkWebviewFlag = false;
var ChkStoreFlag = false;
var ChkMovieFlag = false;
var ClickCount = 0;
var SetImageNum = 0;
var ResetFlag	= false;
var ConfigText0	= 0;
var ConfigText1	= 0;
var WaitCounter = 0;
var seWaitFlag	= 0;
var voiceWaitFlag = 0;
var timerVoiceWait = -1;
var timerSEWait	= -1;
var playSENo	= 0;
var playVoiceNo	= 0;
var CautionFlag = false;
var timerWaitFlag = false;
var timerWaitTimer = -1;
var OldTimer	= 0;
var MaskColor	= 0;
var MaskAlpha	= 0;
var putWait = 0;
var FadeNow	= false;
var FadeMaskColor	= 0;
var FadeMaskAlpha	= 0;
var SystemFlag = false;
var PhoneData = null;
var PhoneFlag = false;
var SaveID = 0;
/*
var mesall = 0;
var selall = 0;
var meschk;// = new Array(282);
var selchk;// = new Array(282);
var meslocal;
var sellocal;
*/
//----------------------------------------------------------------------//
//
//----------------------------------------------------------------------//
//初期化
function onLoad() {
    var query = window.location.search.substring(1);
    if(query != ""){
	qdata = query.split("=");
//	console.log("xxxxxxxxx"+qdata[0]+","+qdata[1]);
    }
    delete query;

    devicetype	= 0;
    _userAgent	= navigator.userAgent;
    if (_userAgent.indexOf('iPhone')>0 ||
        _userAgent.indexOf('iPod')>0 ||
        _userAgent.indexOf('iPad')>0){
	devicetype	= 1;
	_twitter = Twitter;
    }
    else if(_userAgent.indexOf('Android')>0) {
	devicetype	= 2;
	if(_userAgent.search(/Android 2/) != -1 ||
	   _userAgent.search(/Android 1/) != -1){
	    androidtype	= 2;
	}
	else{
	    androidtype	= 3;
	}
	_twitter = new Twitter();
    }
    else{
	androidtype	= 2;
    }
    if(devicetype == 1){	// スマホはデバイス状態を待つ
        document.addEventListener("deviceready", canvasCtrl, false);
    }
    else if(devicetype >= 2){	// スマホはデバイス状態を待つ
//	document.addEventListener("deviceready", canvasCtrl, false);
/*
	if(qdata != null && qdata[1] == "98"){
            canvasCtrl();
	}
	else*/
	if(typeof device == 'undefined'){
            document.addEventListener("deviceready", canvasCtrl, false);
	}else{
            canvasCtrl();
	}
    }
    else{
	canvasCtrl();
    }
}

function _onTouchFlag(){
    _TouchFlag	= false;
}
function _onTouchFlag2(){
    _TouchFlag2	= false;
}
function _touchmove(event){ //タッチムーブイベント
    if(_TouchFlag){
	_TouchFlag2	= true;
	setTimeout(_onTouchFlag2,600);
    }
    touchAct	= true;
    touchXOld	= touchX;
    touchYOld	= touchY;
    var rect=event.target.getBoundingClientRect();
    touchX = (event.touches[0].pageX-rect.left)/screenScale; // 最初にタッチされた指のX座標
    touchY = (event.touches[0].pageY-rect.top)/screenScale; // 最初にタッチされた指のY座標
    touchMoveX	= touchXOld-touchX;
    touchMoveY	= touchYOld-touchY;
//    delete rect;
    event.preventDefault(); // 画面が動かないようにおまじない
}
function _touchstart(event){ // タッチスタートイベント
    touchAct	= false;
    touchOnCount	= 0;
    var rect=event.target.getBoundingClientRect();
    touchX = (event.touches[0].pageX-rect.left)/screenScale; // 最初にタッチされた指のX座標
    touchY = (event.touches[0].pageY-rect.top)/screenScale; // 最初にタッチされた指のY座標
    touchOn		= true;
    touchOff	= false;
    touchOnF	= true;
    touchXOld	= touchX;
    touchYOld	= touchY;
    touchMoveX	= 0;
    touchMoveY	= 0;
    touchSpeedX	= 0;
    touchSpeedY	= 0;
//    delete rect;
    event.preventDefault(); // 画面が動かないようにおまじない
}
function _touchend(event){ // タッチエンドイベント
    _TouchFlag	= true;
    setTimeout(_onTouchFlag,200);
    _wait	= 6;
    touchAct	= false;
    touchOn		= false;
    touchOff	= true;
    touchOnCount	= 0;
    touchSpeedX	= touchMoveX;
    touchSpeedY	= touchMoveY;
    touchMoveX	= 0;
    touchMoveY	= 0;
    event.preventDefault(); // 画面が動かないようにおまじない
}

function _mousemove(event){
    if(touchOn){
	SlideAct	= true;
	touchAct	= true;
	touchXOld	= touchX;
	touchYOld	= touchY;
	touchX = event.pageX/screenScale;
	touchY = event.pageY/screenScale;
	touchMoveX	= touchXOld-touchX;
	touchMoveY	= touchYOld-touchY;
    }
}
function _mousedown(event){
    SlideAct	= false;
    touchAct	= true;
    touchOnCount	= 0;
    touchOn		= true;
    touchOff	= false;
    touchOnF	= true;
    touchX = event.pageX/screenScale;
    touchY = event.pageY/screenScale;
    touchXOld	= touchX;
    touchYOld	= touchY;
    touchMoveX	= 0;
    touchMoveY	= 0;
    touchSpeedX	= 0;
    touchSpeedY	= 0;
}

function _mouseup(event){
    SlideAct	= false;
    touchAct	= false;
    touchOnCount	= 0;
    touchOn	= false;
    touchOff	= true;
    touchSpeedX	= touchMoveX;
    touchSpeedY	= touchMoveY;
    touchMoveX	= 0;
    touchMoveY	= 0;
}

function canvasCtrl() {
    document.addEventListener("pause", onPause, false);
    document.addEventListener("resume", onResume, false);
    document.addEventListener("menubutton", onMenuKey, false);

  //グラフィックスの取得
    canvas2	= document.getElementById("canvas1");
    g2		= canvas2.getContext("2d");
    canvas	= document.getElementById("canvas0");
    g		= canvas.getContext("2d");
    video	= document.getElementById("video");
    video.width		= 0;
    video.height	= 0;

    if(devicetype == 0){
	_Audio = new Audio("");
	_AudioSE = new Audio("");
	_AudioSE2 = new Audio("");
	_AudioVoice = new Audio("");
    }

    // canvasサイズをリサイズ
    if(devicetype == 0){
	screenScale	= 1.0;
	canvas.width	= ScreenWidthOrg*screenScale;
	canvas.height	= ScreenHeightOrg*screenScale;
    }
    else if(devicetype == 1){	// iphone
	screenScale	= 1.0;
	canvas.width	= 480;//ScreenWidthOrg*screenScale;
	canvas.height	= 360;//ScreenHeightOrg*screenScale;
    }
    else{
	screenScale	= screen.height/ScreenHeightOrg;
	canvas.width	= ScreenWidthOrg*screenScale;
	canvas.height	= screen.height;
	var _xbiass = (screen.width-canvas.width)/2;
	canvas.width	= screen.width;

	var dpi = window.devicePixelRatio;
	if(dpi >= 2 && androidtype > 2){
	    _xbiass /= dpi;
	    screenScale	/= dpi;
	}

	document.getElementById("canvas0").style.left = _xbiass+"px";
	delete _xbiass;
    }
//    console.log("ssssssssssss"+canvas.width);
//    console.log("sssssssssssss"+canvas.height);

    document.body.style.overflow = "hidden";	// スクロールバーをけす

    if(devicetype >= 1){
	document.addEventListener("touchmove", _touchmove,false);
	document.addEventListener("touchstart", _touchstart,false);
	document.addEventListener("touchend", _touchend,false); 
    }
    else{
	document.addEventListener("mousemove", _mousemove, false);
	document.addEventListener("mousedown", _mousedown, false);
	document.addEventListener("mouseup", _mouseup, false);
    }
    
//    g.funcInit();
    for(var i = 0; i < _PUTDATA_MAX;i++){
	_putData[i]	= new Array(11);
    }
    
    LocalCounter	= 0;

    _plugin.ChkVoice();
    _plugin.getmacadd("",
                      function(r){
			  if(devicetype == 2){
			      MacAddress	= r.macadd;
			  }
			  else{
			      MacAddress	= r;
			  }
			  MacAddress	= MacAddress.toUpperCase();
                      },
                      function(e){ }
                     );
    for(var i = 0; i < MenuButton.length;i++){
	MenuButton[i]	= new object(i);
    }
    for(var i = 0; i < TipsButton.length;i++){
	TipsButton[i]	= new object(i);
    }
    for(var i = 0; i < BackButton.length; i++){
	BackButton[i]	= new object(i);
    }
    for(var i = 0; i < 12;i++){
	SaveButton[i]	= new object(i);
	SaveButton[i].color	= 0xffffff;
    }
    for(var i = 0; i < _PNG_MAX; i++){
	ChgImgn[i]	= -1;
    }
    for(var i = 0; i < RegName.length; i++){
	RegData[RegName[i]] = 0;
    }
    RegData["REG_BG0"]	= -1;
    RegData["REG_CHARA0"]	= -1;
    RegData["REG_CHARA1"]	= -1;
    RegData["REG_CHARA2"]	= -1;
    RegData["REG_BGM"]	= -1;
    RegData["REG_SELOOP"]	= -1;

//    localStorage.clear();	// ローカルストレージのクリア
    loadSystem();
    loadSound();
    loadCGFlag();
    loadMovieFlag();
    loadBgmFlag();
    loadTipsFlag();
//    savePointFlag();
    loadPointFlag();
    loadTweetData();
    loadConfTextData();
//    loadMesData();
    PhoneData   = null;
    PhoneFlag   = false;
    localStorage_getItem("ISDATA");

    //タイマーの開始
    _MainLoopFlag	= setInterval(_mainLoop,60);
}
    //定期処理
    function _mainLoop() {
	if(--_wait2 > 0 || _TouchFlag2 || (devicetype == 2 && _TouchFlag)){
	    return;
	}
	if(!_MainLoopFlag || loadingCount > 0 || LoadFlag){	// 各種読み込みがあればはじく
//	    console.log("lllllllllllllllllllllllll");
	    return;
	}
	for(var i = 0; i < _PNG_MAX; i++){
	    if(_Img[i] != null && (_Img[i].width == 0 || _Img[i].height == 0)){
		return;
	    }
	}

	if(--ClickCount < 0){
	funcinit();
	if(MainMode != NextMode){
	    keyInit();
	    MainMode	= NextMode;
	    switch(MainMode){
	    case	MODE_LOGO:
		LogoInit();
		break;
	    case	MODE_SALVAGE:
		SalvageInit();
		break;
	    case	MODE_TITLE:
		TitleInit();
		break;
	    case	MODE_GAME:
		GameInit();
		break;
	    case	MODE_TWITTER:
		TwitterInit();
		break;
	    case	MODE_ALBUM:
		AlbumInit();
		break;
	    case	MODE_HELP:
		HelpInit();
		break;
	    case	MODE_OMAKE:
		OmakeInit();
		break;
	    case	MODE_END:
		EndInit();
		break;
	    }
	    for(var i = 0; i < _PNG_MAX; i++){	// イメージ切り替えロード
		if( ChgImg[i] != null){
		    delete	_Img[i];
		    if(devicetype != 2){
			loadImage(i,ChgImg[i]);
		    }
		    else{
			var _data = ChgImg[i].split("\/");
			_data	= _data[2].split(".");
			_plugin.SetImage(i,_data[0]);
			delete _data;
		    }
		    ChgImg[i]	= null;
		}
	    }
	}
	if(!_MainLoopFlag || loadingCount > 0 || LoadFlag){	// 各種読み込みがあればはじくInitでの対応
//	    console.log("lllllllllllllllllllllllll222222222");
	    return;
	}
	switch(MainMode){
	case	MODE_INIT:
	    if(qdata != null && qdata[1] == "99"){
		_plugin.SetProgress();
		loadImg(_pngGameData);
		modeChgCtrl(MODE_START);
	    }
	    else{
		loadImg(_pngLogoData);
		modeChgCtrl(MODE_START);
	    }
	    break;
	case	MODE_START:
	    //イメージの読み込み待ち
	    if (loadingCount <= 0){
		if(qdata != null && qdata[1] == "99"){
		    NewGame	= 0;
		    dataID	= 99;
		    modeChgCtrl(MODE_GAME);
		}
		else if(_StartFlag){
		    modeChgCtrl(MODE_LOGO);
//		    _StartFlag	= false;
		}
		else{
		    modeChgCtrl(MODE_TITLE);
		}
	    }
	    break;
	case	MODE_LOGO:
	    LogoCtrl();
	    break;
        case	MODE_SALVAGE:
            SalvageCtrl();
            break;
	case	MODE_TITLE:
	    TitleCtrl();
	    break;
	case	MODE_GAME:
	    GameCtrl();
	    break;
	case	MODE_TWITTER:
	    TwitterCtrl();
	    break;
	case	MODE_ALBUM:
	    AlbumCtrl();
	    FillRect(0,0,ScreenWidth,ScreenHeight,FadeColor,FadeAlphaNow);
	    FadeAlphaNow += FadePer;
	    if(--FadeTimer < 0){
		FadeAlphaNow	= FadeAlphaNext;
	    }
	    break;
	case	MODE_HELP:
	    HelpCtrl();
	    break;
	case	MODE_GETDATA:
	    GetdataCtrl();
	    break;
	case	MODE_OMAKE:
	    OmakeCtrl();
	    break;
	case	MODE_END:
	    EndCtrl();
	    break;
	}
	if(--MaskCount > 0){
	    FillRect(0,0,ScreenWidth,ScreenHeight,0x000000,1);
	}
	FillRect(ScreenWidth,0,ScreenWidth,ScreenHeight,0x000000,1);
	FillRect(0,ScreenHeight,ScreenWidth,ScreenHeight,0x000000,1);
/*
	SetWord(WORD_TMP00,"counter:"+_count+"MainMode:"+MainMode+"  "+_putNum+" >"+PutLine+":"+MesLine+" >>"+RainFlag+">"+RegData["REG_RAIN"]);
	PutLetter(WORD_TMP00,_FONT_SMALL,0,0,0x000000);
	PutLetter(WORD_TMP00,_FONT_SMALL,1,1,0xffffff);
*/
/*
	    if(MainMode == MODE_GAME){
		mesall = 0;
		selall = 0;
		for(var i = 0; i < 282; i++){
		    mesall = parseInt(mesall)+parseInt(meschk[i]);
		    selall = parseInt(selall)+parseInt(selchk[i]);
		}
		PutLetterStroke("MES:"+mesall+"/"+_mesall+"("+((mesall/_mesall)*100).toFixed(1)+"%",_FONT_SMALL,0,20,0xffffff,0x000000,imgTL,1);
		PutLetterStroke("SEL:"+selall+"/"+_selall+"("+((selall/_selall)*100).toFixed(1)+"%",_FONT_SMALL,0,40,0xffffff,0x000000,imgTL,1);

		PutLetterStroke("SCENE MES:"+meschk[MacroScenario]+"/"+mennum[MacroScenario][0]+"("+((meschk[MacroScenario]/mennum[MacroScenario][0])*100).toFixed(1)+"%",_FONT_SMALL,0,60,0xffffff,0x000000,imgTL,1);
		PutLetterStroke("SCENE SEL:"+selchk[MacroScenario]+"/"+mennum[MacroScenario][1]+"("+((selchk[MacroScenario]/mennum[MacroScenario][1])*100).toFixed(1)+"%",_FONT_SMALL,0,80,0xffffff,0x000000,imgTL,1);
	    }
*/
/*
	SetWord(WORD_TMP00,"touch:"+touchOn+":"+touchX+","+touchY+">"+touchXOld+","+touchYOld);
	PutLetter(WORD_TMP00,_FONT_SMALL,0,20,0x000000);
	SetWord(WORD_TMP00,"touchAct:"+touchAct+":"+touchMoveX+","+touchMoveY);
	PutLetter(WORD_TMP00,_FONT_SMALL,0,40,0x000000);
	SetWord(WORD_TMP00,"touchOnCount:"+touchOnCount+" ...>"+SkipFlag);
	PutLetter(WORD_TMP00,_FONT_SMALL,0,100,0x000000);
*/
//	PutLetterStroke("macro:"+MacroScenario+","+MACTB[MacroScenario]+","+DDMode+">",_FONT_SMALL,0,120,0xffffff,0x000000,imgTL,1);
/*
	PutLetterStroke("SelectMacroNum:"+SelectMacroNum+" AutoFlag:"+AutoFlag,_FONT_SMALL,0,140,0xffffff,0x000000,imgTL,1);
*/
	if(!_MainLoopFlag || --_wait2 > 0 || _TouchFlag2 || (devicetype == 2 && _TouchFlag)){
	    return;
	}
	}	// ClickCount;
//	g.clearRect(0,0,ScreenWidthOrg*screenScale,ScreenHeightOrg*screenScale);
	putAll(g);

	if(_savecanvas){	// 画面全体の保存
	    _savecanvas	= false;
//	    if(devicetype == 0 || devicetype == 1 || (devicetype == 2 && androidtype >= 3)){
	    if(devicetype == 1 || (devicetype == 2 && androidtype >= 3)){
//	    if(devicetype == 1){
/*
		var _ss = screenScale;
		screenScale	= 1;
		g2.clearRect(0,0,ScreenWidthOrg,ScreenHeightOrg);
		putAll(g2);
		_Img[Saveimage].src	= canvas2.toDataURL('image/png');
		screenScale	= _ss;
		delete _ss;
*/
		var _ss = screenScale;
		screenScale	= 1;
		g2.clearRect(0,0,ScreenWidthOrg,ScreenHeightOrg);
		// 背景キャラフォグのみ書き直し
		funcinit();
		BGObj.putbg();
		CharaObj[2].putchara();
		CharaObj[1].putchara();
		CharaObj[0].putchara();
		EffObj.putfog();	// フォグ＆太陽光
		FilterObj.putfilter();	// マスクフィルター
		if(MaskColor != 0){
		    FillRect(0,0,ScreenWidth,ScreenHeight,MaskColor,MaskAlpha);
		}
		putAll(g2);
		_Img[Saveimage].src	= canvas2.toDataURL('image/png');
		screenScale	= _ss;
		delete _ss;

		g2.clearRect(0,0,ScreenWidthOrg,ScreenHeightOrg);
	    }
	    else{
		_Img[Saveimage]	= _Img[PNG_bg0];
		_Img[PNG_album00]	= _Img[PNG_chara00];
		_Img[PNG_album01]	= _Img[PNG_chara10];
		_Img[PNG_album02]	= _Img[PNG_chara20];
		FadeObj.x	= BGObj.x;
		FadeObj.y	= BGObj.y;
		FadeObj.biasx	= BGObj.biasx;
		FadeObj.biasy	= BGObj.biasy;
		FadeObj.scalex	= BGObj.scalex;
		FadeObj.scaley	= BGObj.scaley;
		FadeObj.basex	= BGObj.basex;
		FadeObj.basey	= BGObj.basey;
		FadeObj.basew	= BGObj.basew;
		FadeObj.baseh	= BGObj.baseh;
		setFadeAndroid2();
	    }
	}
	for(var i = 0; i < _PNG_MAX; i++){	// イメージ切り替えコピー
//	    if( ChgImgn[i] != -1){
	    if( parseInt(ChgImgn[i]) > 0){
		_Img[i]	= _Img[parseInt(ChgImgn[i])];
		ChgImgn[i]	= -1;
	    }
	}
	for(var i = 0; i < _PNG_MAX; i++){	// イメージ切り替えロード
	    if( ChgImg[i] != null){
		delete	_Img[i];
		if(devicetype != 2){
		    loadImage(i,ChgImg[i]);
		}
		else{
		    var _data = ChgImg[i].split("\/");
		    _data	= _data[2].split(".");
		    _plugin.SetImage(i,_data[0]);
		    delete _data;
		}
		ChgImg[i]	= null;
	    }
	}
	if(MainMode != NextMode){	// destruction
	    switch(MainMode){
	    case	MODE_LOGO:
		LogoFinish();
		break;
	    case	MODE_TITLE:
		TitleFinish();
		break;
	    case	MODE_GAME:
		GameFinish();
		break;
	    case	MODE_ALBUM:
		AlbumFinish();
		break;
	    }
	}
	_count++;
	--_wait;
    }
//}

function	setFadeAndroid2(){
    FadeMaskColor	= MaskColor;
    FadeMaskAlpha	= MaskAlpha;
    setFadeChara(0);
    setFadeChara(1);
    setFadeChara(2);
}

function setFadeChara(_id){
    FadeChara[_id]._visible	= CharaObj[_id]._visible;
    if(CharaObj[_id].pat == -1){
	FadeChara[_id]._visible	= false;
    }
    FadeChara[_id].x	= CharaObj[_id].x;
    FadeChara[_id].y	= CharaObj[_id].y;
    FadeChara[_id].biasx	= CharaObj[_id].biasx;
    FadeChara[_id].biasy	= CharaObj[_id].biasy;
    FadeChara[_id].scalex	= CharaObj[_id].scalex;
    FadeChara[_id].scaley	= CharaObj[_id].scaley;
    FadeChara[_id].t	= CharaObj[_id].t;
}


//----------------------------------------------------------------------//
//
//----------------------------------------------------------------------//
var _logoColor;
var _logoImg;
var _logoCount;
var _logoData = [
    [IMG_CFlogo,0xffffff],
    [IMG_kid,0x000000],
];
function LogoInit(){
    addBackbutton();
    alpha	= 0;
    LocalMode	= 0;
    LocalCounter	= 0;
    _logoImg	= _logoData[0][0];
    _logoCount	= 0;
}
function LogoCtrl(){
    switch(LocalMode){
    case	0:
	FillRect(0,0,ScreenWidth,ScreenHeight,0xffffff,1);
	SpritePut(_logoImg,0,0,imgTL,alpha);
	alpha += 0.2;
	if(alpha > 1){
	    LocalMode	= 1;
	    LocalCounter = 4;
	}
	break;
    case	1:
	SpritePut(_logoImg,0,0,imgTL,alpha);
	if(--LocalCounter < 0){
	    _logoColor	= _logoData[_logoCount][1];
	    LocalMode	= 2;
	}
	break;
    case	2:
	FillRect(0,0,ScreenWidth,ScreenHeight,_logoColor,1);
	SpritePut(_logoImg,0,0,imgTL,alpha);
	alpha -= 0.2;
	if(alpha < 0){
	    alpha	= 0;
	    _logoCount++;
	    if(_logoCount < 2){
		_logoImg	= _logoData[_logoCount][0];
		LocalMode	= 0;
		LocalCounter = 4;
	    }
	    else{
		if(devicetype == 0){
		    modeChgCtrl(MODE_TITLE);
		}
		else{
		    if(SystemFlag || PhoneData == null){
			modeChgCtrl(MODE_TITLE);
		    }
		    else{	// localstorageが消えてたら本体呼び出しへ
			modeChgCtrl(MODE_SALVAGE);
		    }
		}
	    }
	}
	break;
    }
}
function LogoFinish(){
    _plugin.SetProgress();
//    g.delImg(_pngLogoData);
    loadImg(_pngTitleData);
}

//----------------------------------------------------------------------//
//
//----------------------------------------------------------------------//
function SalvageInit(){
    LocalMode     = 0;
    SaveID        = 0;
}
var SalvageData = [
    "SAVEDATA0",
    "SAVEDATA1",
    "SAVEDATA2",
    "SAVEDATA3",
    "SAVEDATA4",
    "SAVEDATA5",
    "SAVEDATA6",
    "SAVEDATA7",
    "SAVEDATA8",
    "SAVEDATA9",
    "SAVEDATA10",
    "SAVEDATA11",
    "SYSTEMDATA",
    "CGDATA",
    "MOVIEDATA",
    "BGMDATA",
    "TIPSDATA",
    "POINTDATA",
    "POINTFLAG",
];
function SalvageCtrl(){
    FillRect(0,0,ScreenWidth,ScreenHeight,0xffffff,1);
    switch(LocalMode){
    case    0:
	PhoneData   = null;
	PhoneFlag   = false;
	localStorage_getItem(SalvageData[SaveID]);
	LocalMode++;
    case    1:
	if(PhoneFlag){
	    //      console.log("ccccccccccccccc:"+PhoneData);
	    if(PhoneData == null || PhoneData == ""){
		;
	    }
	    else{
		localStorage.setItem(SalvageData[SaveID],PhoneData);
	    }
	    if(++SaveID >= SalvageData.length){
		LocalMode       = 2;
	    }
	    else{
		LocalMode       = 0;
	    }
	}
	break;
    case    2:
	loadSystem();
	loadSound();
	loadCGFlag();
	loadMovieFlag();
	loadBgmFlag();
	loadTipsFlag();
	loadPointFlag();
	loadTweetData();
	loadConfTextData();
	modeChgCtrl(MODE_TITLE);
	break;
    }
}
//----------------------------------------------------------------------//
//
//----------------------------------------------------------------------//
function TitleInit(){
    for(var i = 0; i < 50; i++){
	RainObj[i]	= new object();
	RainObj[i].init(IMG_ef_snow,0,0,imgCC,1);
    }
    snowSet(0);
    _plugin.DelProgress();
    alpha	= 0;
    LocalMode	= 0;
    LocalCounter	= 0;

    MenuButton[0].init(IMG_load,700/2,430/2,imgTL,0);
    MenuButton[1].init(IMG_start,700/2,430/2,imgTL,0);
    MenuButton[2].init(IMG_menu,700/2,430/2,imgTL,0);
    MenuButton[3].init(IMG_album,700/2,430/2,imgTL,0);

    MenuButton[4].init(IMG_point,20,10/2,imgTL,0);
    MenuButton[5].init(IMG_help,850/2,10/2,imgTL,0);
    MenuButton[6].init(IMG_news,750/2,90/2,imgTL,0);
    MenuButton[7].init(IMG_twitter,850/2,90/2,imgTL,0);
    MenuButton[8].init(IMG_shop,750/2,10/2,imgTL,0);

    MenuButton[0]._visible = true;
    MenuButton[1]._visible = true;
    MenuButton[2]._visible = true;
    MenuButton[3]._visible = true;
    MenuButton[4]._visible = true;
    MenuButton[5]._visible = true;
    MenuButton[6]._visible = true;
    MenuButton[7]._visible = true;
    MenuButton[8]._visible = true;

    MenuButton[9].init(IMG_frame,700/2,390/2,imgTL,1);
    MenuButton[10].init(IMG_frame,700/2,470/2,imgTL,1);
    MenuButton[9]._visible = true;
    MenuButton[10]._visible = true;

    MenuButton[0].hyInit(470/2,310/2,4,HV_UNIFORM,0);
    MenuButton[1].hyInit(470/2,390/2,4,HV_UNIFORM,0);
    MenuButton[2].hyInit(470/2,470/2,4,HV_UNIFORM,0);
    MenuButton[3].hyInit(470/2,550/2,4,HV_UNIFORM,0);

    BackButton[0].init(IMG_gotitle,ScreenWidth-10,ScreenHeight-10,imgBR,1);
    BackButton[1].init(IMG_goback,ScreenWidth-60,ScreenHeight-10,imgBR,1);
    _BackButton	= false;

    if(devicetype != 2){
	for(var i = PNG_album00; i < _PNG_MAX; i++){
	    loadImage(i,ResPng+_pngTitleData[i]+".png");
	}
    }
    else{
	for(var i = PNG_album00; i < _PNG_MAX; i++){
	    _plugin.SetImage(i,_pngTitleData[i]);
	}
    }
    if(RegData["SF_ED_COCORO_GOOD"] == 0){
	chgImage(PNG_bg0,ResPng+"title0.png");
    }
    else{
	chgImage(PNG_bg0,ResPng+"title1.png");
    }
    chgImage(PNG_calen,ResPng+"tt_logo.png");
}
function SetFadeOut(_count){
    FadeAlphaNow	= 0;
    FadeAlphaNext	= 1;
    FadeTimer		= _count;
    FadePer		= 1/FadeTimer;
}
function SetFadeIn(_count){
    FadeAlphaNow	= 1;
    FadeAlphaNext	= 0;
    FadeTimer		= _count;
    FadePer		= -(1/FadeTimer);
}
function SetChgMode(_mode){
    keyInit();
    ChgMode	= _mode;
    SetFadeOut(6);
}
var advTimer = -1;
var movieTimer;
var storeTimer;
var webviewTimer;
function advMovie(){
    keyInit();
    stopBGM();
//  playMovie("op00");
//  movieTimer	= setInterval(_plugin.ChkMovie,2000);
    LocalMode	= 16;
    LocalCounter	= 10;
}
function goLocalMode3(){
    playBGM("adx25");
    LocalMode	= 3;
//    advTimer	= setTimeout(advMovie,225000);
    if(advTimer != -1){
	clearTimeout(advTimer);
	advTimer	= -1;
    }
    advTimer	= setTimeout(advMovie,25000);
}
function TitleCtrl(){
    SpritePut(IMG_title1,0,0,imgTL,alpha);

    for(var i = 0; i < 50; i++){
	RainObj[i].puts();
	//	RainObj[i].fillarc(RainObj[i].x,RainObj[i].y,RainObj[i].r,RainObj[i].color,RainObj[i].alpha);
	RainObj[i].x *= 0.982;
	RainObj[i].y *= 0.982;
//	RainObj[i].y += 4;//Random(4);
	RainObj[i].r -= Random(10)/80;
	RainObj[i].scalex	= RainObj[i].r;
	RainObj[i].scaley	= RainObj[i].r;
	RainObj[i].alpha	+= 0.1;
	if(RainObj[i].alpha > 0.8){
	    RainObj[i].alpha	= 0.8;
	}
	if(RainObj[i].r < 0.1){
	    RainObj[i].alpha	= 0;
	    RainObj[i].x	= (Random(640)-320);
	    RainObj[i].y	= (Random(400)-80)-300;
	    RainObj[i].r	= 2+Random(10)/10;//Random(20)+10;
	}
    }
    SpritePut(IMG_title2,10,60,imgTL,alpha);

    if(LocalMode >= 20){
	MenuButton[9].put();
	MenuButton[10].put();
//	PutLetterStroke("cocoro",_FONT_SMALL,MenuButton[9].x,MenuButton[9].y,0xff0000,0xffffff,imgTL);
//	PutLetterStroke("satoru",_FONT_SMALL,MenuButton[10].x,MenuButton[10].y,0x0000ff,0xffffff,imgTL);
	BackButton[0].put();
	BackButton[1].put();
    }
    else{
	MenuButton[0].put();
	MenuButton[2].put();
	MenuButton[1].put();
	MenuButton[3].put();
	if(devicetype != 1 && RegData["SR_TITLE"] == 1)
	    MenuButton[4].put();
	MenuButton[5].put();
/*
	MenuButton[6].put();
	if((NewFlag) && MenuButton[6].alpha == 1){
	    PutLetterStroke("New!",_FONT_SMALL,MenuButton[6].x+8,MenuButton[6].y+2,0xff0000,0xffffff,imgTL,1);
	}
*/
	MenuButton[7].put();
	MenuButton[8].put();
    }

    switch(LocalMode){
    case	0:
	alpha += 0.2;
	if(alpha > 1){
	    alpha = 1;
	    LocalMode = 1;
	}
	break;
    case	1:
	MenuButton[0].hyValue();
	MenuButton[1].hyValue();
	MenuButton[2].hyValue();
	MenuButton[3].hyValue();
	MenuButton[0].alpha += 0.2;
	MenuButton[1].alpha += 0.2;
	MenuButton[2].alpha += 0.2;
	MenuButton[3].alpha += 0.2;
	if(MenuButton[0].alpha > 1){
	    MenuButton[0].alpha = 1;
	    MenuButton[1].alpha = 1;
	    MenuButton[2].alpha = 1;
	    MenuButton[3].alpha = 1;
	    LocalMode = 2;
	}
	break;
    case	2:
	MenuButton[4].alpha += 0.2;
	MenuButton[5].alpha += 0.2;
	MenuButton[6].alpha += 0.2;
	MenuButton[7].alpha += 0.2;
	MenuButton[8].alpha += 0.2;
	if(MenuButton[4].alpha > 1){
	    MenuButton[4].alpha = 1;
	    MenuButton[5].alpha = 1;
//	    MenuButton[6].alpha = 1;
	    MenuButton[7].alpha = 1;
	    MenuButton[8].alpha = 1;
//	    LocalMode	= 3;
	    if(RegData["SR_TITLE"] == 0){
		if(devicetype == 1){
		    _dialog.set("会員登録/ログイン","無料会員登録/ログインを押してください。\n登録すると、新着情報ページを確認することができます。\n無料会員登録/ログインをしなくとも遊ぶことはできます。\n\n※無料会員登録/ログインには端末情報を送信いたしますが、お客様の会員認証のみに使用いたします。","会員登録/ログイン","閉じる");
		}
		else{
		    _dialog.set("会員登録/ログイン","無料会員登録/ログインを押してください。\n登録すると、お得なポイントが貯まり、ここでしか手に入らないアプリがＧＥＴできます。\n会員登録/ログインをしなくても遊ぶことはできます。\n\n※会員登録/ログインには端末情報を送信いたしますが、お客様の会員認証にのみ使用いたします。","会員登録/ログイン","閉じる");
		}
		LocalMode	= 11;
	    }
	    else{
		LocalMode	= 12;
//		goLocalMode3();	// デバグでhttpを通らないように・・・
	    }
	}
	if(RegData["SR_TITLE"] == 0 && MenuButton[6].alpha > 0.6){
	    MenuButton[6].alpha	= 0.6;
	}
	else if(RegData["SR_TITLE"] == 1 && MenuButton[6].alpha > 1){
	    MenuButton[6].alpha	= 1;
	}
	break;
    case	3:
	if(devicetype != 1){
	    if(RegData["SR_TITLE"] == 1)
		PutLetterStroke(PointData+"point",_FONT_SMALL,MenuButton[4].x+60,MenuButton[4].y+16,0xffffff,0x000000,imgTR,1);
	}

	if(MenuButton[0].click()){	// load
	    playSE("sysse01");
	    SetChgMode(0);
	    clearTimeout(advTimer);
	    advTimer	= -1;
	    LocalMode	= 4;
	}
	else if(MenuButton[1].click()){	// newgame
	    playSE("sysse01");
//	    LocalMode	= 4;
	    clearTimeout(advTimer);
	    advTimer	= -1;
//	    SetChgMode(1);

	    var savedata = localStorage.getItem("SAVEDATA0");
	    if(savedata == null || savedata == ""){
		NewGame	= 1;
		LocalMode	= 4;
		SetChgMode(1);
	    }
	    else{
		_dialog.set("CAUTION","進行中のゲームデータがあります。\n最初からやり直してもよろしいでしょうか？\nオートセーブが初期化します。","YES","NO");
		LocalMode	= 8;
	    }
	}
	else if(MenuButton[2].click()){
	    playSE("sysse01");
	    SetChgMode(2);
	    clearTimeout(advTimer);
	    advTimer	= -1;
	    LocalMode	= 4;
	}
	else if(MenuButton[3].click()){	// album
	    playSE("sysse01");
	    SetChgMode(3);
	    clearTimeout(advTimer);
	    advTimer	= -1;
	    LocalMode	= 4;
	}
	else if(devicetype != 1 && RegData["SR_TITLE"] == 1 && MenuButton[4].click()){	// point
	    playSE("sysse01");
	    SetChgMode(4);
	    clearTimeout(advTimer);
	    advTimer	= -1;
	    LocalMode	= 4;
        }
	else if(MenuButton[5].click()){	// help
	    playSE("sysse01");
	    SetChgMode(5);
	    clearTimeout(advTimer);
	    advTimer	= -1;
	    LocalMode	= 4;
	}
/*
	else if(RegData["SR_TITLE"] == 1 && MenuButton[6].click()){	// news
	    playSE("sysse01");
	    clearTimeout(advTimer);
	    advTimer	= -1;
	    LocalMode	= 13;
	}
*/
	else if(MenuButton[7].click()){	// news
	    playSE("sysse01");
	    SetChgMode(7);
	    clearTimeout(advTimer);
	    advTimer	= -1;
	    LocalMode	= 4;
	}
	else if(MenuButton[8].click()){	// shop
	    playSE("sysse01");
	    SetChgMode(17);
	    LocalMode	= 4;
	    clearTimeout(advTimer);
	    advTimer	= -1;
	}
	else if(_BackButton){
	    _BackButton = false;
	    _dialog.set("game end","ゲームを終了しますか？","はい","いいえ");
	    LocalMode	= 10;
	}
	break;
    case	4:	// フェードして次のモードへ
    case	21:	// フェードして次のモードへ
	FillRect(0,0,ScreenWidth,ScreenHeight,FadeColor,FadeAlphaNow);
	FadeAlphaNow += FadePer;
	if(--FadeTimer < 0){
	    FadeAlphaNow	= FadeAlphaNext;
	    if(ChgMode == 0){	// load
		NewGame	= 0;
		keyInit();
		menuInit(5);//	    LocalMode	= 5;
		DirectLoad	= true;
		MenuMode = 2;
		loadAll(0);
		SetFadeIn(6);

	    }
	    else if(ChgMode == 1){	// newgame
//		NewGame	= true;
		modeChgCtrl(MODE_GAME);
	    }
	    else if(ChgMode == 2){
		menuInit(5);//	    LocalMode	= 5;
		SetFadeIn(6);
	    }
	    else if(ChgMode == 3){	// album
		modeChgCtrl(MODE_ALBUM);
		SetFadeIn(6);
	    }
	    else if(ChgMode == 4){	// point
                _plugin.SetWebview("http://game.cyberfrontonline.com/user/gifts?user_id="+MacAddress);
		LocalMode	= 15;
                ChkWebviewFlag  = true;
		webviewTimer	= setInterval(_plugin.ChkWebview,2000);
            }
	    else if(ChgMode == 5){	// help
		SetFadeIn(6);
		HelpInit();
		LocalMode	= 6;
	    }
	    else if(ChgMode == 6){	// news
	    }
	    else if(ChgMode == 7){	// news
		SetFadeIn(6);
		TwitterInit();
		LocalMode	= 7;
	    }
	    else if(ChgMode == 17){
		_plugin.store("",
                              function(r){ },
                              function(e){ }
                             );
		LocalMode	= 17;
                ChkStoreFlag    = true;
		storeTimer	= setInterval(_plugin.ChkStore,2000);
	    }
	}
	break;
    case	5:	// メニューモード(ゲーム中、タイトル兼用(いまのとこ))
	menuCtrl();
	FillRect(0,0,ScreenWidth,ScreenHeight,FadeColor,FadeAlphaNow);
	FadeAlphaNow += FadePer;
	if(--FadeTimer < 0){
	    FadeAlphaNow	= FadeAlphaNext;
	}
	break;
    case	6:	// メニューモード(ゲーム中、タイトル兼用(いまのとこ))
	HelpCtrl();
	FillRect(0,0,ScreenWidth,ScreenHeight,FadeColor,FadeAlphaNow);
	FadeAlphaNow += FadePer;
	if(--FadeTimer < 0){
	    FadeAlphaNow	= FadeAlphaNext;
	}
	break;
    case	7:
	TwitterCtrl();
	FillRect(0,0,ScreenWidth,ScreenHeight,FadeColor,FadeAlphaNow);
	FadeAlphaNow += FadePer;
	if(--FadeTimer < 0){
	    FadeAlphaNow	= FadeAlphaNext;
	}
	break;
    case	8:
	if(_dialog.dialogOk()){	// ok newgame
	    if(RegData["SF_ED_COCORO_GOOD"] == 1/* || true*/){
		MenuButton[9].pat	= IMG_cocoro;
		MenuButton[10].pat	= IMG_satoru;
		LocalMode	= 20;
	    }
	    else{
		NewGame	= 1;
		LocalMode	= 4;
		SetChgMode(1);
	    }
	}
	else if(_dialog.dialogNo()){	// noタイトルへ戻る
	    goLocalMode3();//LocalMode	= 3;
	}
	break;
    case	10:
	if(_dialog.dialogOk()){	// okなら終了
	    navigator.app.exitApp();
	}
	else if(_dialog.dialogNo()){	// noなら戻る
	    goLocalMode3();//LocalMode	= 3;
	}
	break;
    case	11:	// 会員登録
	if(_dialog.dialogOk()){	// okなら終了
	    LocalMode	= 12;
	}
	else if(_dialog.dialogNo()){	// noなら戻る
	    goLocalMode3();//LocalMode	= 3;
	}
	break;
    case	12:	// 会員登録
	if(httpComplete()){
	    switch(ResultData["status_code"]){
	    case	0:
		goLocalMode3();//LocalMode	= 3;
		RegData["SR_TITLE"] = 1;
		saveSystem();
		MenuButton[6].alpha	= 1;
		if(ResultData["new_info_flg"] == 1){
		    NewFlag	= true;
		}
		else{
		    NewFlag	= false;
		}
		PointData	= parseInt(ResultData["points"]);
		break;
	    case	1:
	    default:
		_dialog.set("接続失敗","接続に失敗しました。再接続しますか？","はい","いいえ");
		LocalMode	= 11;
		break;
	    }
	}
	else{
	    _dialog.set("接続失敗","接続に失敗しました。再接続しますか？","はい","いいえ");
	    LocalMode	= 11;
	}
	break;
    case	13:
	if(http2str("http://game.cyberfrontonline.com/user/read_info?user_id="+MacAddress)){
	    NewFlag	= false;
	    switch(ResultData["status_code"]){
	    case	0:
		LocalMode	= 15;
		if(devicetype == 0){
                    _plugin.SetWebview("http://game.cyberfrontonline.com/info/");
		}
		else if(devicetype == 1){
		    _plugin.SetWebview("http://game.cyberfrontonline.com/info/ios_new.html");
		}
		else if(devicetype == 2){
		    _plugin.SetWebview("http://game.cyberfrontonline.com/info/android_new.html");
		}
                ChkWebviewFlag  = true;
		webviewTimer	= setInterval(_plugin.ChkWebview,2000);
		break;
	    case	1:
	    default:
		_dialog.set("接続失敗","接続に失敗しました。再接続しますか？","はい","いいえ");
		LocalMode	= 14;
		break;
	    }
	}
	else{
	    _dialog.set("接続失敗","接続に失敗しました。再接続しますか？","はい","いいえ");
	    LocalMode	= 14;
	}
	break;
    case	14:
	if(_dialog.dialogOk()){	// okなら終了
	    LocalMode	= 13;
	}
	else if(_dialog.dialogNo()){	// noなら戻る
	    goLocalMode3();//LocalMode	= 3;
	}
	break;
    case	15:	// webview待ち
	if(T() || !ChkWebviewFlag){
	    clearInterval(webviewTimer);
	    goLocalMode3();	    
	}
	break;
    case	16:	// movie待ち
	if(--LocalCounter< 0){
	    playMovie("mov_op");
	    movieTimer	= setInterval(_plugin.ChkMovie,2000);
            ChkMovieFlag        = true;
	    LocalMode = 18;
	}
	break;
    case	18:	// movie待ち
	if(T() || !ChkMovieFlag){
	    clearInterval(movieTimer);
	    stopMovie();
	    goLocalMode3();	    
	}
	break;
    case	17:	// store待ち
	if(T() || !ChkStoreFlag){
	    clearInterval(storeTimer);
	    goLocalMode3();	    
	}
	break;
    case	20:
	if(MenuButton[9].click()){
	    playSE("sysse01");
	    NewGame	= 1;
	    LocalMode	= 21;
	    SetChgMode(1);
	}
	else if(MenuButton[10].click()){
	    playSE("sysse01");
	    NewGame	= 2;
	    LocalMode	= 21;
	    SetChgMode(1);
	}
	else if(BackButton[0].click()){
	    playSE("sysse01");
	    goLocalMode3();//LocalMode	= 3;
	}
	else if(BackButton[1].click()){
	    playSE("sysse01");
	    goLocalMode3();//LocalMode	= 3;
	}
	break;
    }
}
function TitleFinish(){
    _plugin.SetProgress();
    if(NextMode == MODE_GAME){
/*
	for(var i = PNG_album00; i < _PNG_MAX; i++){
	    delete	_Img[i];
//	    _Img[i]	= null;
	}
*/
    }
}

//HTTP→文字列
var httpURL;
var httpREQ;
function http2str(url) {
//    console.log("uuuuuuuuuu:"+url);
    httpURL	= url;
    try {
	ResultData	= new Array();
        var request=new XMLHttpRequest();
	httpREQ	= "\n";
        request.open("GET",url+"&ts="+(new Date()).getTime(),false);
        request.send(null);
        if (request.status==200 || request.status==0) {
//	    console.log("uuuuuuuuuu:"+request.status);
	    httpREQ += "status:"+request.status+"\n";
	    var objs = eval( '(' + request.responseText + ')' );
	    for( var propertyName in objs ){
		ResultData[propertyName] = objs[propertyName];
		httpREQ += propertyName+">"+objs[propertyName]+"\n";
//		console.log("sssssssxx:"+propertyName+">"+objs[propertyName]);
	    }
	    delete objs;
	    return	true;
        }
	delete request;
    } catch (e) {

    }
    return false;
}

function httpComplete() {
    var pointstr = "0";
    for(var i = 0; i < 17; i++){
	if(PointFlag[i] == 0){
	    pointstr += ",0";
	}
	else{
	    pointstr += ",1";
	}
    }
//    console.log("pointstr>>"+pointstr);
    var ret = http2str("http://game.cyberfrontonline.com/user/complete?user_id="+MacAddress+"&chapter_id="+pointstr+"&app_id=cftuqqsxsrqs1173263637&");
    delete pointstr;
    return	ret;
}

//----------------------------------------------------------------------//
//
//----------------------------------------------------------------------//
var DDMode;
var CallReturn;
var MacroNumReturn;
var ScreenMode=1;
var FadeColor;
var FadeTimer;
var FadeAlphaNext;
var FadeAlphaNow;
var MacroNext;
var JumpNum;
var MacroNum;
var MacroCommand;
var MesStr;
var MesCount;
var Word0,Word1;
var FadeObj = new object();
var FadeChara = new object(3);
var BGObj = new object();
var BGObjtmp  = new object();
var TitleObj = new object();
var MainObj = new object();
var EffObj = new object();
var MessObj = new object();
var MessNew = new object(14);
var MessColor = 0xffffff;
var MessNewLength = 14;
var NameObj = new object();
var HglassObj = new object();
var SelectObjNum = 0;
var SelectObj = new Array(5);
var SelectNext = new Array(5);
var CharaObj = new Array(3);
var FilterObj = new object();
var MacroScenario = 0;
var MacroData = null;
var MacroID = null;
var MacroData2 = null;
var MacroNum2;
var MacroMax2;
var Macro2Flag = false;
var TimeObj	= new object();
var RainObj = new Array(50);
var RainFlag = false;
var LightObj = new Array(2);
var LightFlag = false;
var QSaveObj = new object();
var FlashCount = 0;
var BlinkObj = new object();
var BlinkFlag = 0;

function CharaObjInit(_id){
    CharaObj[_id]	= new object(_id);
    CharaObj[_id]._visible	= false;
    if(_id == 0){
	CharaObj[_id].init(IMG_chara00,0,0,imgTL,1);
    }
    else if(_id == 1){
	CharaObj[_id].init(IMG_chara10,0,0,imgTL,1);
    }
    else{
	CharaObj[_id].init(IMG_chara20,0,0,imgTL,1);
    }
    CharaObj[_id].pat	= -1;//IMG_chara10;
    CharaObj[_id].pat2	= -1;//IMG_chara11;
    CharaObj[_id].biasx	= 0;
    CharaObj[_id].biasy	= 0;
    CharaObj[_id].x	= 0;
    CharaObj[_id].y	= 0;
    CharaObj[_id].t	= imgTC;
    CharaObj[_id].scalex	= 480;
    CharaObj[_id].scaley	= 360;
}
function chkCharaObj(_name){
/*
    if(_name.indexOf("co") != -1 ||
       _name.indexOf("en") != -1 ||
       _name.indexOf("ho") != -1 ||
       _name.indexOf("in") != -1 ||
       _name.indexOf("ka") != -1 ||
       _name.indexOf("ma") != -1 ||
       _name.indexOf("sa") != -1 ||
       _name.indexOf("sy") != -1 ||
       _name.indexOf("un") != -1 ||
       _name.indexOf("yo") != -1){
	_name = _name+"1";
    }
*/
    if(_name.indexOf("ev_") == -1){
	_name = _name+"1";
    }
    return _name;
}
function chkCharaObjF(_name){
    if(_name.indexOf("ev_") == -1){
	return	true;
    }
    return false;
}
function getNameID(_name){
    return _name.slice(0,2)
}

function chkMaskColor(_data){
//    console.log("chkMaskColor................:"+_data+">"+parseInt(bgColorData[_data]));
    MaskColor	= 0;
    MaskAlpha	= 1;
    switch(parseInt(bgColorData[_data])){
    case	1:
	MaskColor	= 0x4060C0;
	MaskAlpha	= 0.2;
	break;
    case	2:
	MaskColor	= 0x400000;
	MaskAlpha	= 0.1;
	break;
    case	3:
	MaskColor	= 0x1060C0;
	MaskAlpha	= 0.2;
	break;
    case	4:
	MaskColor	= 0x010101;
	MaskAlpha	= 0.4;
	break;
    case	5:
	MaskColor	= 0x001010;
	MaskAlpha	= 0.7;
	break;
    case	6:
	MaskColor	= 0x000040;
	MaskAlpha	= 0.6;
	break;
    }
}
	
function	GameInit(){
    ScreenMode	= 1;
    RainFlag = false;
    BlinkFlag	= 0;
    LightFlag = false;
    NoWindow	= false;
    Saveimage	= -1;
    EffType	= 0;
    seWaitFlag	= false;
    voiceWaitFlag	= false;
    SkipCancel	= false;
    timerWaitFlag	= false;
    timerVoiceWait = -1;
    timerSEWait	= -1;
    timerWaitTimer	= -1;

    stopBGM();
    stopSE();
    _plugin.ChkVoice();
    _plugin.DelProgress();
    MenuButton[7].init(IMG_gamemenu,ScreenWidth-4,4,imgTR,0.5);
    MenuButton[7]._visible	= true;
    MacroScenario	= 0;
    MacroNext		= 0;
    LogList	= null;
    LogList	= new Array();

    DDMode	= 0;
    MacroNum	= 0;
    MacroCommand = 0;
    LocalMode	= 0;
    BGObj.init(IMG_bg0,0,0,imgTL,1);
    BGObj.pat2	= IMG_bg1;
    BGObj.pat3	= -1;
    BGObj._visible	= false;
    FadeColor	= 0x000000;
    FadeAlphaNow	= 0;
    FadeObj.init(IMG_fade,0,0,imgTL,1);
    FadeObj.initfillrect(0,0,ScreenWidth,ScreenHeight,FadeColor,FadeAlphaNow);
    FadeObj._visible	= false;
    TitleObj.setletter("",20,30);
    TitleObj._visible	= false;
    EffObj._visible	= false;
    EffObj._effect	= 0;
    MainObj.init(IMG_main_back,0,ScreenHeight-71,imgTL,0);
    MainObj.pat2	= IMG_main_wind;
//    MainObj.alpha	= 1;
    MainObj._visible	= true;

    MessObj.setletter("",40/2,ScreenHeight-71+20/2);
//    NameObj.init(IMG_name_back,40/2,430/2,imgTL,1);
    NameObj.init(IMG_name_back,40/2,ScreenHeight-71-20,imgTL,1);
    NameObj._visible	= false;
    NameObj.pat2	= IMG_name_wind;
    MessObj.word	= "";
    MessObj.wordold	= "";

    HglassObj.init(IMG_msg_cur1,ScreenWidth-30,ScreenHeight-30/2,imgCC,1);
    HglassObj.scalex = 1;
    HglassObj.scaley = 1;
    HglassObj.rot = 0;
    HglassObj._mode	= 0;
    HglassObj._visible	= false;
    FilterObj.init(IMG_filter,0,0,imgTL,1);
    FilterObj._visible	= false;
    FilterObj.alpha	= 0;
    TimeObj._visible	= false;
    TimeObj.x	= ScreenWidth-320/2;
    TimeObj.y	= 22;
    TimeObj.color	= 0xffffff;
    for(var i = 0; i < MessNewLength; i++){
	MessNew[i]	= new object(i);
	MessNew[i].setletter("",20,ScreenHeight-71+10+19*i);
//	MessNew[i].setletter("",20,60+19*i);
	MessNew[i].word	= "";
	MessNew[i].wordold	= "";
	MessNew[i].messtr	= "";
	MessNew[i].color	= 0xffffff;
    }
    for(var i = 0; i < 3; i++){
	FadeChara[i]	= new object(i);
	FadeChara[i].init(IMG_album00+i,0,0,imgTL,1);
    }

    MessColor	= 0xffffff;
    MessageInitNew();

    MaskColor	= 0;

    SelectObj[0]	= new object();
    SelectObj[0]._visible	= false;
    SelectObj[1]	= new object();
    SelectObj[1]._visible	= false;
    SelectObj[2]	= new object();
    SelectObj[2]._visible	= false;
    SelectObj[3]	= new object();
    SelectObj[3]._visible	= false;
    SelectObj[4]	= new object();
    SelectObj[4]._visible	= false;

    CharaObjInit(0);
    CharaObjInit(1);
    CharaObjInit(2);

    for(vi = 0; vi < 12; vi++){
	SaveButton[vi].init(IMG_qsave,10+((vi%2)*130),40+46*Math.floor(vi/2),imgTL,1);
    }
    QSaveObj.init(IMG_qsave,ScreenWidth/2,10,imgTC,1);
    QSaveObj._count	= 0;
    for(var i = 0; i < 50; i++){
	RainObj[i]	= new object();
	RainObj[i].init(IMG_ef_snow,0,0,imgCC,1);
    }
    LightObj[0]	= new object();
    LightObj[1]	= new object();
    WaveFlag	= false;

    BlinkObj.init(IMG_effect1,0,0,imgTL,0);
    BlinkObj.mode	= 0;
    BlinkObj.alpha	= 0;
    BlinkObj._visible	= true;

    BGObj.x = 0;
    BGObj.y = 0;
    BGObj.biasx = 0;
    BGObj.biasy = 0;
    BGObj.alpha = 1;
    BGObj.basex	= 0;
    BGObj.basey	= 0;
    BGObj.basew	= 480;
    BGObj.baseh	= 360;
    BGObj._visible	= true;

    BGObj.x2 = 0;
    BGObj.y2 = 0;
    BGObj.biasx2 = 0;
    BGObj.biasy2 = 0;
    BGObj.basex2	= 0;
    BGObj.basey2	= 0;
    BGObj.basew2	= 480;
    BGObj.baseh2	= 320;

    if(ShortcutGame != -1){
	initReg();	// フラグ初期化
	MacroScenario	= 169;
	DDMode	= ShortcutGame;
	ShortcutGame	= -1;
	chgImage(PNG_bg0,ResPng+"bg_black.png");	// 背景ロード
	chgImage(PNG_bg1,ResPng+"bg_black.png");	// 背景ロードd
	MaskColor	= 0;
    }
    else if(NewGame > 0){
	initReg();	// フラグ初期化
	if(NewGame == 2){
	    RegData["LR_CHAPTER"]	= 1;
	}
	chgImage(PNG_bg0,ResPng+"bg_black.png");	// 背景ロード
	chgImage(PNG_bg1,ResPng+"bg_black.png");	// 背景ロード
// DEBUG
//	MacroScenario	= 52;
//	MacroData	= _macroData[MacroScenario];
//	DDMode	= 26;
//	RegData["SF_YUUKA_CLEAR"] = 1;
//	RegData["SF_HARUKA_CLEAR"] = 0;
//	RegData["SF_SAKI_CLEAR"] = 0;
//	RegData["SF_KURUMI_CLEAR"] = 0;
//	RegData["LF_COCORO_KANRI_COCORO"]	= 1;
//	RegData["LF_BAD_SATORU_BAD"]	= 1;	// MacroScenario = 24 co badend
//	RegData["LF_COCORO_SUIMINYAKU"]	= 1;	// MacroScenario = 16 co badend
//	BGObj._visible	= true;
//	chgImage(PNG_bg0,ResPng+"bg_black.png");	// 背景ロード
    }
    else{	// ゲームロード
	loadRegOrg(dataID,RegData,true);
//	RegData["LR_COCORO"]	= 10;
//	RegData["REG_BG0"]	= 0;
//	RegData["LF_COCORO_MAGURO"]	= 1;
//	RegData["LF_BAD_SATORU_BAD"]	= 0;
	if(parseInt(RegData["REG_BG0"]) != -1){	// キャラ0
	    if(isNaN(parseInt(RegData["REG_BG0"]))){
		chgImage(PNG_bg0,ResPng+RegData["REG_BG0"]+".png");	// 背景ロード
		chkMaskColor(RegData["REG_BG0"]);
	    }
	    else{
		CautionFlag	= true;
	    }
	}
	else{
	    chgImage(PNG_bg0,ResPng+"bg_black.png");	// 背景ロード
	}
	chgImage(PNG_bg1,ResPng+"bg_black.png");	// 背景ロード
	BGObj.basex	= RegData["LR_M02"];//0;
	BGObj.basey	= RegData["LR_M03"];//0;
	BGObj.basew	= RegData["LR_M04"];//480;
	BGObj.baseh	= RegData["LR_M05"];//360;
//	console.log(RegData["REG_BG0"]+"BGObj:"+BGObj.basex+","+BGObj.basey+","+BGObj.basew+","+BGObj.baseh);

	if(parseInt(RegData["REG_CHARA0"]) != -1){	// キャラ0
	    if(isNaN(parseInt(RegData["REG_CHARA0"]))){
		chgImage(PNG_chara00,ResPng+chkCharaObj(RegData["REG_CHARA0"])+".png");
		if(chkCharaObjF(RegData["REG_CHARA0"])){
		    // クチパクのためキャラは誰かを保存
		    CharaObj[0].eflag	= true;
		    CharaObj[0].nameID = getNameID(RegData["REG_CHARA0"]);
//		    console.log(".........................."+CharaObj[0].nameID);
		    chgImage(PNG_chara00e0,ResPng+RegData["REG_CHARA0"]+"4.png");
		    chgImage(PNG_chara00e1,ResPng+RegData["REG_CHARA0"]+"5.png");
		    chgImage(PNG_chara00m0,ResPng+RegData["REG_CHARA0"]+"2.png");
		    chgImage(PNG_chara00m1,ResPng+RegData["REG_CHARA0"]+"3.png");
		}
	    }
	    else{
		CautionFlag	= true;
	    }
	    CharaObj[0].x	= RegData["LR_M06"];//RegData["REG_CHARA0_X"]
	    CharaObj[0].y	= RegData["LR_M10"];//RegData["REG_CHARA0_X"]
	    CharaObj[0].alpha	= 1;
	    CharaObj[0]._visible	= true;
	    CharaObj[0].pat	= IMG_chara00;
	    CharaObj[0].biasx	= 0;
	    CharaObj[0].biasy	= 0;
	    CharaObj[0].scalex	= RegData["LR_M09"];//480;
	    CharaObj[0].scaley	= RegData["LR_M13"];//360;
	}
	if(parseInt(RegData["REG_CHARA1"]) != -1){	// キャラ1
	    if(isNaN(parseInt(RegData["REG_CHARA1"]))){
		chgImage(PNG_chara10,ResPng+chkCharaObj(RegData["REG_CHARA1"])+".png");
		if(chkCharaObjF(RegData["REG_CHARA1"])){
		    // クチパクのためキャラは誰かを保存
		    CharaObj[1].eflag	= true;
		    CharaObj[1].nameID = getNameID(RegData["REG_CHARA1"]);
//		    console.log(".........................."+CharaObj[1].nameID);
		    chgImage(PNG_chara10e0,ResPng+RegData["REG_CHARA1"]+"4.png");
		    chgImage(PNG_chara10e1,ResPng+RegData["REG_CHARA1"]+"5.png");
		    chgImage(PNG_chara10m0,ResPng+RegData["REG_CHARA1"]+"2.png");
		    chgImage(PNG_chara10m1,ResPng+RegData["REG_CHARA1"]+"3.png");
		}
	    }
	    else{
		CautionFlag	= true;
	    }
	    CharaObj[1].x	= RegData["LR_M07"];//RegData["REG_CHARA1_X"]
	    CharaObj[1].y	= RegData["LR_M11"];//RegData["REG_CHARA1_X"]
	    CharaObj[1].alpha = 1;
	    CharaObj[1]._visible	= true;
	    CharaObj[1].pat		= IMG_chara10;
	    CharaObj[1].biasx	= 0;
	    CharaObj[1].biasy	= 0;
	    CharaObj[1].scalex	= RegData["LR_M18"];//480;
	    CharaObj[1].scaley	= RegData["LR_M19"];//360;
	}
	if(parseInt(RegData["REG_CHARA2"]) != -1){	// キャラ1
	    if(isNaN(parseInt(RegData["REG_CHARA2"]))){
		chgImage(PNG_chara20,ResPng+chkCharaObj(RegData["REG_CHARA2"])+".png");
		if(chkCharaObjF(RegData["REG_CHARA2"])){
		    // クチパクのためキャラは誰かを保存
		    CharaObj[2].eflag	= true;
		    CharaObj[2].nameID = getNameID(RegData["REG_CHARA2"]);
//		    console.log(".........................."+CharaObj[2].nameID);
		    chgImage(PNG_chara20e0,ResPng+RegData["REG_CHARA2"]+"4.png");
		    chgImage(PNG_chara20e1,ResPng+RegData["REG_CHARA2"]+"5.png");
		    chgImage(PNG_chara20m0,ResPng+RegData["REG_CHARA2"]+"2.png");
		    chgImage(PNG_chara20m1,ResPng+RegData["REG_CHARA2"]+"3.png");
		}
	    }
	    else{
		CautionFlag	= true;
	    }
	    CharaObj[2].x	= RegData["LR_M08"];//RegData["REG_CHARA1_X"]
	    CharaObj[2].y	= RegData["LR_M12"];//RegData["REG_CHARA1_X"]
	    CharaObj[2].alpha = 1;
	    CharaObj[2]._visible	= true;
	    CharaObj[2].pat		= IMG_chara20;
	    CharaObj[2].biasx	= 0;
	    CharaObj[2].biasy	= 0;
	    CharaObj[2].scalex	= RegData["LR_M20"];//480;
	    CharaObj[2].scaley	= RegData["LR_M21"];//360;
	}
	if(parseInt(RegData["REG_BGM"]) != -1){	// BGM
	    playBGM(RegData["REG_BGM"]);
	}
	if(parseInt(RegData["REG_SELOOP"]) != -1){	// BGM
	    playSE(RegData["REG_SELOOP"]);
	}
	if(parseInt(RegData["REG_RAIN"]) != 0){	// 雨
	    snowSet(parseInt(RegData["REG_RAIN"])-1);
	}
	if(parseInt(RegData["LR_WIN_OFF"]) == 0){	// 台詞ウインドウ有り無し
	    MessObj.setletter("",40/2,50);
	    for(var i = 0; i < MessNewLength; i++){
		MessNew[i].setletter("",40,70+20*i);
	    }
	}
	switch(parseInt(RegData["REG_BLINK"])){	// フォグ＆太陽光
	case	1:
	    blinkSet(1);
	    break;
	default:
	    break;
	}
	MainObj.pat2	= IMG_main_wind+parseInt(RegData["REG_WINCOL"]);
	NameObj.pat2	= IMG_name_wind+parseInt(RegData["REG_WINCOL"]);

	if(parseInt(RegData["REG_FILTER"]) > 1){	// マスクフィルター
	    switch(parseInt(RegData["REG_FILTER"])){
	    case	2:
		FilterObj.pat	= -1;
		FilterObj.color	= RegData["REG_FILTCOLOR"];
		FilterObj.alpha	= RegData["REG_FILTALPHA"];
		break;
	    case	3:
		chgImage(PNG_filter,ResPng+"mask102.png");
		FilterObj.alpha	= 1;
		break;
	    case	4:
		chgImage(PNG_filter,ResPng+"mask101.png");
		FilterObj.alpha	= 1;
		break;
	    case	5:
		chgImage(PNG_filter,ResPng+"mask103.png");
		FilterObj.alpha	= 1;
		break;
	    case	6:
		chgImage(PNG_filter,ResPng+"mask012_b.png");
		FilterObj.alpha	= 1;
		break;
	    }
	    FilterObj._visible	= true;
	}
	// ロード時はとにかくフェードで始めるために
	FadeMode	= 1;
	FadeObj._count	= 10;
	FadeAlphaNow	= 1;
	FadeAlphaNext	= 0;
	FadeObj.color = 0x000000;
	FadeObj.haInit(FadeAlphaNow,FadeAlphaNext,FadeObj._count,HV_UNIFORM,0);
	FadeObj._visible	= true;
	FadeObj.outtype	= 0;
	FadeObj.type	= 0;
	chgImage(PNG_fade,ResPng+"bg_black.png");	// 
	LocalMode	= GAME_fade;
    }
    loadFile("./res/json/"+MACTB[MacroScenario]+".json");	// macroデータ取得
}

function menuInit0(){	// メニュー初期化 _next:MODE_TITLE,MODE_GAME時でのLocalMode
    SaveButton[0].init(IMG_save,120,80,imgCC,1);	// 使いまわしなので注意
    SaveButton[1].init(IMG_load,120+240,80,imgCC,1);
    SaveButton[2].init(IMG_config,120,140,imgCC,1);
    SaveButton[3].init(IMG_shortcut,120+240,140,imgCC,1);
    SaveButton[4].init(IMG_tips,120,200,imgCC,1);
    SaveButton[5].init(IMG_frame,120+240,200,imgCC,1);

    SaveButton[0]._visible	= true;
    SaveButton[1]._visible	= true;
    SaveButton[2]._visible	= true;
    SaveButton[3]._visible	= true;
    SaveButton[4]._visible	= true;
    SaveButton[5]._visible	= true;
    if(MainMode == MODE_TITLE){
	SaveButton[0].alpha	= 0.5;
    }
    MenuButton[0].init(IMG_news,10,ScreenHeight-10,imgBL,1);
    MenuButton[1].init(IMG_help,10+48,ScreenHeight-10,imgBL,1);
//    MenuButton[1].init(IMG_help,10,ScreenHeight-10,imgBL,1);
    MenuButton[0]._visible	= true;
    MenuButton[1]._visible	= true;
    MenuButton[0].alpha		= 1;
    MenuButton[1].alpha		= 1;
    if(RegData["SR_TITLE"] == 0 && MenuButton[0].alpha > 0.6){
	MenuButton[0].alpha	= 0.6;
    }
    else if(RegData["SR_TITLE"] == 1 && MenuButton[0].alpha > 1){
	MenuButton[0].alpha	= 1;
    }

    MenuButton[7]._visible	= false;	// ゲームメニューボタン
    BackButton[0].init(IMG_gotitle,ScreenWidth-10,ScreenHeight-10,imgBR,1);
    BackButton[1].init(IMG_goback,ScreenWidth-60,ScreenHeight-10,imgBR,1);
}
function menuInit(_next){	// メニュー初期化 _next:MODE_TITLE,MODE_GAME時でのLocalMode
    DirectLoad	= false;
    LocalUndo	= LocalMode;	// 戻りは今のモードに
    LocalMode	= _next;//GAME_menu;
    chgImage(PNG_effect1,ResPng+"cg_title.png");
    BGObj._visible      = false;

    BGObj.x2 = 0;
    BGObj.y2 = 0;
    BGObj.biasx2 = 0;
    BGObj.biasy2 = 0;
    BGObj.basex2	= 0;
    BGObj.basey2	= 0;
    BGObj.basew2	= 480;
    BGObj.baseh2	= 320;
    /*
    chgImage(PNG_bg0,ResPng+"cg_title.png");
    chgImage(PNG_bg1,ResPng+"cg_title.png");
    // BGの倍率を保存
    BGObjtmp.x	= BGObj.x;
    BGObjtmp.y	= BGObj.y;
    BGObjtmp.biasx	= BGObj.biasx;
    BGObjtmp.biasy	= BGObj.biasy;
    BGObjtmp.basex	= BGObj.basex;
    BGObjtmp.basey	= BGObj.basey;
    BGObjtmp.basew	= BGObj.basew;
    BGObjtmp.baseh	= BGObj.baseh;
    BGObjtmp.x2	= BGObj.x2;
    BGObjtmp.y2	= BGObj.y2;
    BGObjtmp.biasx2	= BGObj.biasx2;
    BGObjtmp.biasy2	= BGObj.biasy2;
    BGObjtmp.basex2	= BGObj.basex2;
    BGObjtmp.basey2	= BGObj.basey2;
    BGObjtmp.basew2	= BGObj.basew2;
    BGObjtmp.baseh2	= BGObj.baseh2;
    // menu用にbgを初期化
    BGObj.x = 0;
    BGObj.y = 0;
    BGObj.biasx = 0;
    BGObj.biasy = 0;
    BGObj.basex	= 0;
    BGObj.basey	= 0;
    BGObj.basew	= 480;
    BGObj.baseh	= 320;
    BGObj.x2 = 0;
    BGObj.y2 = 0;
    BGObj.biasx2 = 0;
    BGObj.biasy2 = 0;
    BGObj.basex2	= 0;
    BGObj.basey2	= 0;
    BGObj.basew2	= 480;
    BGObj.baseh2	= 320;
    */
    MenuMode	= 0;
    dataMode	= 0;
    menuInit0();
}

var dataMode;
var dataUndo;
var dataID;
var saveFlag;
function detailPanelPut(){
    SpritePut(IMG_bmg_w,ScreenWidth-10-186,40,imgTL,1);
    DrawLine(ScreenWidth-10-93-60,44+100,ScreenWidth-10-93+60,44+100,0xffffff,1);
    if(dataID != -1 && --putWait < 0){
//	FillPanel(ScreenWidth-10-186,40,186,210,0x00afe3,0x0057ae,0x003388,1,4,0);	// 右の詳細パネル
//	SpritePut(IMG_bmg_w,ScreenWidth-10-186,40,imgTL,1);
//	DrawLine(ScreenWidth-10-93-60,44+100,ScreenWidth-10-93+60,44+100,0xffffff,1);
	ClipOn(ScreenWidth-103-72,44,144,96);
	SpritePutR(IMG_bg0,ScreenWidth-103,44,imgTC,1,144,108,
		   TmpData["LR_M02"],TmpData["LR_M03"],TmpData["LR_M04"],TmpData["LR_M05"]);
	var _word = "DATA"+dataID;
	if(_word == 0){		_word = "AUTOSAVE";	    }
	_word += "\n "+TmpData["REG_ROUTE"]+"\n "+TmpData["REG_TITLE"]+"\n "+TmpData["REG_DATE0"]+"\n "+TmpData["REG_DATE1"];

//	console.log(TmpData["REG_CHARA0"]+","+TmpData["LR_M06"]+","+TmpData["LR_M10"]+","+TmpData["LR_M09"]+","+TmpData["LR_M13"]+",");
//	console.log(TmpData["REG_CHARA1"]+","+TmpData["LR_M07"]+","+TmpData["LR_M11"]+","+TmpData["LR_M18"]+","+TmpData["LR_M19"]+",");
//	console.log(TmpData["REG_CHARA2"]+","+TmpData["LR_M08"]+","+TmpData["LR_M12"]+","+TmpData["LR_M20"]+","+TmpData["LR_M21"]+",");

	if(TmpData["REG_CHARA0"] != -1)
	    SpritePutR(IMG_chara00,ScreenWidth-103-72+TmpData["LR_M06"]*0.3,44+TmpData["LR_M10"]*0.3,imgTC,1,
		       TmpData["LR_M09"]*0.3,TmpData["LR_M13"]*0.3,0,0,_Img[_imgData[IMG_chara00][0]].width,_Img[_imgData[IMG_chara00][0]].height);
	if(TmpData["REG_CHARA1"] != -1)
	    SpritePutR(IMG_chara10,ScreenWidth-103-72+TmpData["LR_M07"]*0.3,44+TmpData["LR_M11"]*0.3,imgTC,1,
		       TmpData["LR_M18"]*0.3,TmpData["LR_M19"]*0.3,0,0,_Img[_imgData[IMG_chara10][0]].width,_Img[_imgData[IMG_chara10][0]].height);
	if(TmpData["REG_CHARA2"] != -1)
	    SpritePutR(IMG_chara20,ScreenWidth-103-72+TmpData["LR_M08"]*0.3,44+TmpData["LR_M12"]*0.3,imgTC,1,
		       TmpData["LR_M20"]*0.3,TmpData["LR_M21"]*0.3,0,0,_Img[_imgData[IMG_chara20][0]].width,_Img[_imgData[IMG_chara20][0]].height);
	ClipOff();

	PutLetterDivStroke(_word,_FONT_SMALL,170,ScreenWidth-10-186+20,44+109,0xffffff,0x000000);	    
	if(saveFlag == 1){
	    SpritePut(IMG_save_b,ScreenWidth-10-10,40+210-10,imgBR,1);
	}
	else{
	    SpritePut(IMG_load_b,ScreenWidth-10-10,40+210-10,imgBR,1);
	}
    }
}
function detailPanelSet(_id,_save){
    dataID	= _id;

    loadRegOrg(dataID,TmpData,false);

    saveFlag	= _save;
/*
    var savedata = localStorage.getItem("SAVEDATA"+dataID);
    var _data = savedata.split(",");
    chgImage(PNG_bg0,ResPng+_data[REG_START+4]+".png");
    if(_data[REG_START+5] != -1)
	chgImage(PNG_chara00,ResPng+chkCharaObj(_data[REG_START+5])+".png");
    if(_data[REG_START+6] != -1)
	chgImage(PNG_chara10,ResPng+chkCharaObj(_data[REG_START+6])+".png");
    if(_data[REG_START+7] != -1)
	chgImage(PNG_chara20,ResPng+chkCharaObj(_data[REG_START+7])+".png");
    SaveButton[dataID].paneltype	= 1;
    delete savedata;
    delete _data;
*/
    if(TmpData["REG_BG0"] != -1)
	chgImage(PNG_bg0,ResPng+TmpData["REG_BG0"]+".png");
    if(TmpData["REG_CHARA0"] != -1)
	chgImage(PNG_chara00,ResPng+chkCharaObj(TmpData["REG_CHARA0"])+".png");
    if(TmpData["REG_CHARA1"] != -1)
	chgImage(PNG_chara10,ResPng+chkCharaObj(TmpData["REG_CHARA1"])+".png");
    if(TmpData["REG_CHARA2"] != -1)
	chgImage(PNG_chara20,ResPng+chkCharaObj(TmpData["REG_CHARA2"])+".png");
}

function 	saveCtrl(){
    PutLetterStroke("SAVE",_FONT_LARGE,10,10,0xffffff,0x000000,imgTL,1);
    for(var i = 0; i < 12; i++){
	SaveButton[i].putPanel();
    }
//    detailPanelPut();
    switch(dataMode){
    case	0:
	if(BackButton[0].click()){
	    playSE("sysse01");
	    _dialog.set("CAUTION","タイトルへ戻りますか？\nセーブしていない場合、タイトルに戻ると、今までのゲームデータは保存されません。","YES","NO");
	    dataMode	= 10;
	}
	else if(BackButton[1].click()){
	    playSE("sysse01");
	    keyInit();
	    menuInit0();
	    MenuMode = 0;
	}
	else if(dataID != -1 && Toff(ScreenWidth-10-186,40,186,210)){
	    dataMode	= 1;
	    _dialog.set("data save","CAUTION\n上書きしますか？\n上書きすると元には戻せません。","はい","いいえ");
	}
	else{
	    for(var i = 1; i < 12; i++){
		if(SaveButton[i].click()){
		    if(SaveButton[i].reg){	// セーブ箇所にデータがあれば上書き注意のダイアログをだす
			playSE("sysse01");
			if(dataID == i){
			    dataMode	= 1;
			    _dialog.set("data save","CAUTION\n上書きしますか？\n上書きすると元には戻せません。","はい","いいえ");
			}
			else{
			    if(dataID != -1){
				SaveButton[dataID].paneltype = 0;
			    }
                            putWait       = 2;
			    detailPanelSet(i,1);
			}
		    }
		    else{	// なければそのままセーブ
			saveRegOrg(i);
			saveSystem();
                        putWait       = 2;
			playSE("sysse09");
			loadAll(1);	// 簡易ロードしなおし
			detailPanelSet(i,1);
			dataMode	= 2;
			if(devicetype == 1){
                            _plugin.SetSaveProgress();
			}
			else{
			    _plugin.SetProgressW("セーブ中です。");
			}
			LocalCounter	= 20;
		    }
		    break;
		}
	    }
	}
	break;
    case	1:	// ダイアログのYES/NO待ち
	if(_dialog.dialogOk()){	// okならセーブ
	    saveRegOrg(dataID);
	    saveSystem();
	    var dataIDOrg = dataID;
	    loadAll(1);
	    dataMode	= 0;
	    detailPanelSet(dataIDOrg,1);
	    delete dataIDOrg;
	    dataMode	= 2;
            putWait       = 2;
	    if(devicetype == 1){
		_plugin.SetSaveProgress();
	    }
	    else{
		_plugin.SetProgressW("セーブ中です。");
	    }
	    LocalCounter	= 20;
	}
	else if(_dialog.dialogNo()){	// noなら戻る
	    dataMode	= 0;
	    keyInit();
	}
	break;
    case	2:	// セーブ中
	if(--LocalCounter < 0){
	    if(devicetype == 1){
		_plugin.DelSaveProgress();
	    }
	    else{
		_plugin.DelProgress();
	    }
	    dataMode	= 0;
	    _dialog.set("DATA SAVE","セーブが完了しました。","OK","");
	    keyInit();
	}
        putWait       = 2;
	break;
    case	10:
	if(_dialog.dialogOk()){	// okならセーブ
	    modeChgCtrl(MODE_TITLE);
	    keyInit();
	}
	else if(_dialog.dialogNo()){	// noなら戻る
	    dataMode	= 0;
	    keyInit();
	}
	break;
    }
    detailPanelPut();
}
function 	loadCtrl(){
    PutLetterStroke("LOAD",_FONT_LARGE,10,10,0xffffff,0x000000,imgTL,1);
    for(var i = 0; i < 12; i++){
	SaveButton[i].putPanel();
    }
//    detailPanelPut();
    switch(dataMode){
    case	0:
	if(BackButton[0].click()){	// タイトルへ戻るボタン
	    playSE("sysse01");
	    keyInit();
	    if(DirectLoad || MainMode == MODE_TITLE){		// MODE_TITLEから直接のロードモードならMODE_TITLE初期化
		dataMode	= 11;
	    }
	    else{
		_dialog.set("CAUTION","タイトルへ戻りますか？\nセーブしていない場合、タイトルに戻ると、今までのゲームデータは保存されません。","YES","NO");
		dataMode	= 10;
	    }
	}
	else if(BackButton[1].click()){	// 戻るボタン
	    playSE("sysse01");
	    keyInit();
	    if(DirectLoad){		// MODE_TITLEから直接のロードモードならMODE_TITLE初期化
		dataMode	= 11;
	    }
	    else{
		menuInit0();
		MenuMode = 0;	// 直接ロードでなければmenuモードに戻る
	    }
	}
	else if(dataID != -1 && Toff(ScreenWidth-10-186,40,186,210)){
	    dataMode	= 1;
	    _dialog.set("data load ","CAUTION\nこのデータをロードしますか？","はい","いいえ");	// ロードしますか？のダイアログ
	}
	else{
	    for(var i = 0; i < 12; i++){
		if(SaveButton[i].click()){
//		    console.log("...................."+i);
		    if(SaveButton[i].reg){	// セーブデータがないなら読み込めない
			if(dataID == i){
			    dataMode	= 1;
			    _dialog.set("data load ","CAUTION\nこのデータをロードしますか？","はい","いいえ");	// ロードしますか？のダイアログ
			}
			else{
			    playSE("sysse01");
			    if(dataID != -1){
				SaveButton[dataID].paneltype = 0;
			    }
			    detailPanelSet(i,0);
                            putWait     = 2;
			}
		    }
		    break;
		}
	    }
	}
	break;
    case	1:
	if(_dialog.dialogOk()){	// ダイアログok
	    stopBGM();
	    NewGame	= 0;
	    if(MainMode == MODE_TITLE){	// MODE_TITLEからならMODE_GAMEに
		modeChgCtrl(MODE_GAME);
	    }
	    else{	// MODE_GAMEからならMODE_GAME初期化
		GameInit();
	    }
	}
	else if(_dialog.dialogNo()){
	    dataMode	= 0;
	}
	break;
    case	10:
	if(_dialog.dialogOk()){	// okならセーブ
	    keyInit();
	    modeChgCtrl(MODE_TITLE);
	}
	else if(_dialog.dialogNo()){	// noなら戻る
	    dataMode	= 0;
	}
	break;
    case	11:
	TitleInit();
	break;
    }
    detailPanelPut();
}


function configInit0(){
    for(var i = 0;i < 3;i++){
	SaveButton[i].init(IMG_configbgm+i,240,60+60*i,imgTC,1);
	SaveButton[i].paneltype = 0;
	SaveButton[i].reg	= false;
	SaveButton[i]._visible	= true;
	SaveButton[i].color	= 0xffffff;
    }
}
function configInit1(){
    for(var i = 0;i < 8;i++){
	SaveButton[i].init(IMG_config2,120+(i%4)*66,110+100*parseInt(i/4),imgTL,1);
	SaveButton[i].width = 48;
	SaveButton[i].height = 38;
	SaveButton[i].alpha = 1;
	SaveButton[i]._visible = true;
	SaveButton[i].paneltype = 0;
	SaveButton[i].color = 0xffffff;
	if((i < 4 && i == ConfigText0) || (i >= 4 && (i%4) == ConfigText1)){
	    SaveButton[i].paneltype = 1;
	}
	SaveButton[i].word	= "  "+((i%4)+1);
    }
}
function configInit(_pageno){
    pageNo = _pageno;
    switch(pageNo){
    case	0:
	configInit0();
	break;
    case	1:
	configInit1();
	break;
    }
    for(var i = 0;i < 2;i++){
	MenuButton[i].init(IMG_page,10+50*i,ScreenHeight-50,imgTL,1);	// 使いまわしなので注意
	MenuButton[i].width = 44;
	MenuButton[i].height = 44;
	MenuButton[i].paneltype = 0;
	MenuButton[i].color = 0xffffff;
	if(i == pageNo){
	    MenuButton[i].paneltype = 1;
	}
	MenuButton[i].word	= "page"+(i+1);
    }
}
function 	configCtrl(){
    PutLetterStroke("CONFIG",_FONT_LARGE,10,10,0xffffff,0x000000,imgTL,1);
    switch(dataMode){
    case	0:
    case	10:
	for(var i = 0;i < 3;i++){
	    SaveButton[i].put();//Panel();
	    if(RegSound[i] == 1){
		SpritePut(IMG_on,300,60+60*i+7,imgTL,1);
	    }
	    else{
		SpritePut(IMG_off,300,60+60*i+7,imgTL,1);
	    }
	}
	break;
    case	1:
    case	11:
	SpritePut(IMG_conftext0,60,60,imgTL,1);
	SpritePut(IMG_conftext1,60,160,imgTL,1);
	for(var i = 0;i < 8;i++){
	    SaveButton[i].putPanelFont(_FONT_LARGE,200);
	}
	break;
    }

    for(var i = 0;i < 2;i++){
	MenuButton[i].putPanel();
    }

    switch(dataMode){
    case	0:
	if(SaveButton[0].click()){	// bgm
//	    console.log("sssssssss"+RegSound[0]);
	    RegSound[0] ^= 1;
	    saveSound();
	    if(RegSound[0] == 0){
		if(RegData["REG_BGM"] != -1){
		    stopBGMconfig();
		}
	    }
	    else{
		if(RegData["REG_BGM"] != -1){
		    playBGM(RegData["REG_BGM"]);
		}
	    }
	}
	else if(SaveButton[1].click()){	// se
	    RegSound[1] ^= 1;
	    saveSound();
	}
	else if(SaveButton[2].click()){	// voice
	    RegSound[2] ^= 1;
	    saveSound();
	}
	else if(BackButton[0].click()){
	    playSE("sysse01");
	    if(MainMode == MODE_TITLE){	// MODE_TITLEだとタイトル初期化
		TitleInit();
	    }
	    else{
		_dialog.set("CAUTION","タイトルへ戻りますか？\nセーブしていない場合、タイトルに戻ると、今までのゲームデータは保存されません。","YES","NO");
		dataUndo	= dataMode;
		dataMode	= 10;
	    }
	    keyInit();
	}
	else if(BackButton[1].click()){
	    playSE("sysse01");
	    keyInit();
	    menuInit0();
	    MenuMode = 0;
	}
	else {
	    for(var i = 0;i < 2;i++){
		if(MenuButton[i].click()){
		    playSE("sysse01");
		    configInit(i);
		    dataMode	= i;
//		    console.log("ttttttttttttttttttttt"+i);
		    break;
		}
	    }
	}
	break;
    case	1:
	if(BackButton[0].click()){
	    playSE("sysse01");
	    if(MainMode == MODE_TITLE){	// MODE_TITLEだとタイトル初期化
		TitleInit();
	    }
	    else{
		_dialog.set("CAUTION","タイトルへ戻りますか？\nセーブしていない場合、タイトルに戻ると、今までのゲームデータは保存されません。","YES","NO");
		dataUndo	= dataMode;
		dataMode	= 11;
	    }
	    keyInit();
	}
	else if(BackButton[1].click()){
	    playSE("sysse01");
	    keyInit();
	    menuInit0();
	    MenuMode = 0;
	}
	else {
	    for(var i = 0;i < 8;i++){
		if(SaveButton[i].click()){
		    if(i < 4){
			ConfigText0 = i;
		    }
		    else {
			ConfigText1 = i%4;
		    }
		    configInit1();
		    saveConfTextData();
		    break;
		}
	    }
	    for(var i = 0;i < 2;i++){
		if(MenuButton[i].click()){
		    playSE("sysse01");
		    configInit(i);
		    dataMode	= i;
		    break;
		}
	    }
	}
	break;
    case	10:
    case	11:
	if(_dialog.dialogOk()){	// okならセーブ
	    modeChgCtrl(MODE_TITLE);
	    keyInit();
	}
	else if(_dialog.dialogNo()){	// noなら戻る
	    dataMode	= dataUndo;
	}
	break;
    }
}

function shortcutInit(){
    dataMode	= 0;
    selectID	= -1;
    putWait     = 0;
    for(var i = 0;i < 2;i++){
	SaveButton[i].init(IMG_cg0,150+180*i,50,imgTC,1);
	SaveButton[i].paneltype = 0;
	SaveButton[i].reg	= false;
	SaveButton[i]._visible	= true;
	SaveButton[i].color	= 0xffffff;
    }
    SaveButton[0].pat	= IMG_cg0;
    SaveButton[1].pat	= IMG_cg1;
}
function shortcutInit2(_paggeno){
    pageNo = _paggeno;
    selectID	= -1;
    putWait     = 0;
    for(var i = 0;i <= Math.floor(shortcutStr[charaID].length/13);i++){
	MenuButton[i].init(IMG_page,10+50*i,ScreenHeight-50,imgTL,1);	// 使いまわしなので注意
	MenuButton[i].width = 44;
	MenuButton[i].height = 44;
	MenuButton[i].paneltype = 0;
	if(i == pageNo){
	    MenuButton[i].paneltype = 1;
	}
	MenuButton[i].word	= "page"+(i+1);
	MenuButton[i].color	= 0xffffff;
    }
    for(var i = 0;i < 12;i++){
	SaveButton[i].init(IMG_shortcut2,10+(i%2)*122,40+Math.floor(i/2)*38,imgTL,1);
	SaveButton[i].width = 120;
	SaveButton[i].height = 36;
	SaveButton[i].paneltype = 0;
	SaveButton[i].reg	= false;
	SaveButton[i]._visible	= true;
	SaveButton[i].color	= 0xffffff;
	SaveButton[i].scalex	= 0.28;
	SaveButton[i].scaley	= 0.28;
	SaveButton[i].paneltype = 0;
	if(i+pageNo*12 < shortcutStr[charaID].length){
	    SaveButton[i].word = "No:"+i+"\n";
//	    if(shortcutData[charaID][pageNo*12+i][5] == 1 || RegData[shortcutData[charaID][pageNo*12+i][5]] > 0 || true){
	    if(shortcutData[charaID][pageNo*12+i][5] == 1 || RegData[shortcutData[charaID][pageNo*12+i][5]] > 0){
		SaveButton[i].word += shortcutStr[charaID][pageNo*12+i][0];
		SaveButton[i].reg	= true;
	    }
	    else{
	    }
	}
	else{
	    SaveButton[i]._visible	= false;
	}
    }
}

function shortcutCtrl2Put(){
	for(var i = 0;i <= Math.floor(shortcutStr[charaID].length/13);i++){
	    MenuButton[i].putPanel();
	}
	for(var i = 0;i < 12;i++){
	    SaveButton[i].putPanelFont(_FONT_TINY,110);
	}
//	FillPanel(ScreenWidth-10-186,40,186,210,0x00afe3,0x0057ae,0x003388,1,4,0);	// 右の詳細パネル
	SpritePut(IMG_bmg_w,ScreenWidth-10-186,40,imgTL,1);
	DrawLine(ScreenWidth-10-93-60,44+100,ScreenWidth-10-93+60,44+100,0xffffff,1);
	if(selectID != -1 && --putWait < 0){
	    SpritePutR(IMG_bg0,ScreenWidth-10-93,44,imgTC,1,144,96,0,0,480,320);
	    if(shortcutData[charaID][pageNo*12+selectID][3] != null)
		SpritePutR(IMG_chara10,ScreenWidth-10-93+shortcutData[charaID][pageNo*12+selectID][4]*0.3-72,44,imgTC,1,144,96,0,0,480,320);
	    if(shortcutData[charaID][pageNo*12+selectID][1] != null)
		SpritePutR(IMG_chara00,ScreenWidth-10-93+shortcutData[charaID][pageNo*12+selectID][2]*0.3-72,44,imgTC,1,144,96,0,0,480,320);

	    var _word = ""+shortcutStr[charaID][pageNo*12+selectID][0]+"\n"+shortcutStr[charaID][pageNo*12+selectID][1];
	    _word = _word.replace(/%n/g,"\n");
	    PutLetterDivStroke(_word,_FONT_TINY,160,ScreenWidth-10-186+10,44+109,0xffffff,0x000000);	    
	    SpritePut(IMG_play_b,ScreenWidth-10-10,40+210-10,imgBR,1);
	    delete _word;
	}
}

function shortcutCtrl(){
    switch(dataMode){
    case	0:	// 人の選択
	PutLetterStroke("SHORT CUT",_FONT_LARGE,10,10,0xffffff,0x000000,imgTL,1);
	for(var i = 0;i < 2;i++){
	    SaveButton[i].put();//Panel();
	}
	for(var i = 0;i < 2;i++){
	    if(SaveButton[i].click()){
		playSE("sysse01");
		charaID	= i;
		dataMode	= 1;
		shortcutInit2(0);
		break;
	    }
	}
	if(BackButton[0].click()){
	    playSE("sysse01");
	    if(MainMode == MODE_TITLE){	// MODE_TITLEだとタイトル初期化
		dataMode	= 11;
//		TitleInit();
	    }
	    else{
//		modeChgCtrl(MODE_TITLE);
		_dialog.set("CAUTION","タイトルへ戻りますか？\nセーブしていない場合、タイトルに戻ると、今までのゲームデータは保存されません。","YES","NO");
		dataUndo	= dataMode;
		dataMode	= 10;
	    }
	    keyInit();
	}
	else if(BackButton[1].click()){
	    playSE("sysse01");
	    menuInit0();
	    keyInit();
	    MenuMode = 0;
	}
	break;
    case	1:
//	shortcutCtrl2Put();
	if(BackButton[0].click()){
	    playSE("sysse01");
	    if(MainMode == MODE_TITLE){	// MODE_TITLEだとタイトル初期化
		dataMode	= 11;
	    }
	    else{
		_dialog.set("CAUTION","タイトルへ戻りますか？\nセーブしていない場合、タイトルに戻ると、今までのゲームデータは保存されません。","YES","NO");
		dataUndo	= dataMode;
		dataMode	= 10;
	    }
	    keyInit();
	}
	else if(BackButton[1].click()){
	    playSE("sysse01");
	    dataMode	= 12;
	}
	else if(selectID != -1 && Toff(ScreenWidth-10-186,40,186,210)){
	    dataMode	= 2;
	    _dialog.set("shortcut load ","CAUTION\n「"+shortcutStr[charaID][pageNo*12+selectID][0]+"」\nこのデータをロードしますか？","はい","いいえ");	// ロードしますか？のダイアログ
	}
	else {
	    for(var i = 0;i <= Math.floor(shortcutStr[charaID].length/13);i++){
		if(MenuButton[i].click()){
		    playSE("sysse01");
		    shortcutInit2(i);
//		    chgImage(PNG_bg0,ResPng+"cg_title.png");
		    break;
		}
	    }
	    for(var i = 0;i < 12;i++){
		if(SaveButton[i]._visible && SaveButton[i].click() && SaveButton[i].reg){
		    playSE("sysse01");
		    if(selectID == i){
			dataMode	= 2;
			_dialog.set("shortcut load ","CAUTION\n「"+shortcutStr[charaID][pageNo*12+selectID][0]+"」\nこのデータをロードしますか？","はい","いいえ");	// ロードしますか？のダイアログ
		    }
		    else{
			selectID	= i;
			chgImage(PNG_bg0,ResPng+shortcutData[charaID][pageNo*12+selectID][0].toLowerCase()+".png");
			if(shortcutData[charaID][pageNo*12+selectID][1] != null)
			    chgImage(PNG_chara00,ResPng+chkCharaObj(shortcutData[charaID][pageNo*12+selectID][1].toLowerCase())+".png");
			if(shortcutData[charaID][pageNo*12+selectID][3] != null)
			    chgImage(PNG_chara10,ResPng+chkCharaObj(shortcutData[charaID][pageNo*12+selectID][3].toLowerCase())+".png");
                        putWait = 2;
		    }
		}
	    }
	}
	shortcutCtrl2Put();
	break;
    case	2:
	shortcutCtrl2Put();
	if(_dialog.dialogOk()){	// ダイアログok
//	    chgImage(PNG_bg0,ResPng+"bg_black.png");
//	    chgImage(PNG_bg1,ResPng+"bg_black.png");
	    dataMode	= 3;
	}
	else if(_dialog.dialogNo()){
	    dataMode	= 1;
	}
	break;
    case	3:
	NewGame	= 0;
	AppendGame	= -1;
	ShortcutGame	= parseInt(shortcutData[charaID][pageNo*12+selectID][6])+1;
	if(MainMode == MODE_TITLE){	// MODE_TITLEからならMODE_GAMEに
	    modeChgCtrl(MODE_GAME);
	}
	else{	// MODE_GAMEからならMODE_GAME初期化
	    GameInit();
	}
	
	break;
    case	10:
	if(_dialog.dialogOk()){	// okならセーブ
	    modeChgCtrl(MODE_TITLE);
	    keyInit();
	}
	else if(_dialog.dialogNo()){	// noなら戻る
	    dataMode	= dataUndo;
	}
	break;
    case	11:
	TitleInit();
	break;
    case	12:
	shortcutCtrl2Put();
	shortcutInit();
	keyInit();
	dataMode = 0;
//	chgImage(PNG_bg0,ResPng+"cg_title.png");
	break;
    }
}


var tipsNo;
var tipsAKASA = [
    "あ","か","さ","た","な","は","ま","や","ら","わ",
];
function tipsInit(_tipsno,_pageno){
    tipsNo = _tipsno;
    pageNo = _pageno;
    for(var i = 0;i < 10;i++){
	TipsButton[i].init(IMG_tips_menu,10+40*i,40,imgTL,1);	// 使いまわしなので注意
	TipsButton[i].width = 34;
	TipsButton[i].height = 34;
	TipsButton[i].paneltype = 0;
	TipsButton[i].color = 0xffffff;
	if(i == tipsNo){
	    TipsButton[i].paneltype = 1;
	}
	TipsButton[i].word	= tipsAKASA[i];
    }
    for(var i = 0;i < Math.floor(tipsData[tipsNo].length/12)+1;i++){
	MenuButton[i].init(IMG_page,10+50*i,ScreenHeight-50,imgTL,1);	// 使いまわしなので注意
	MenuButton[i].width = 44;
	MenuButton[i].height = 44;
	MenuButton[i].paneltype = 0;
	MenuButton[i].color = 0xffffff;
	if(i == pageNo){
	    MenuButton[i].paneltype = 1;
	}
	MenuButton[i].word	= "page"+(i+1);
    }
    for(var i = 0;i < 12;i++){
	SaveButton[i].init(IMG_tips2,10+(i%2)*222,80+Math.floor(i/2)*30,imgTL,1);
	SaveButton[i].width = 220;
	SaveButton[i].height = 28;
	SaveButton[i].paneltype = 0;
	SaveButton[i].reg	= false;
	SaveButton[i]._visible	= true;
	SaveButton[i].color	= 0xffffff;
	SaveButton[i].scalex	= 0.28;
	SaveButton[i].scaley	= 0.28;
	SaveButton[i].paneltype = 0;
	if(pageNo*12+i < tipsData[tipsNo].length){
	    SaveButton[i].word = (pageNo*12+i+1)+":";
	    if(TipsFlag[tipsData[tipsNo][pageNo*12+i]] > 0){
		SaveButton[i].reg	= true;
		SaveButton[i].word = tipsText[tipsData[tipsNo][pageNo*12+i]][0];
	    }
	    else{
		SaveButton[i].word = "？？？？？？？";
	    }
	}
	else{
	    SaveButton[i]._visible	= false;
	}
    }

}
function tipsCtrl(){
    PutLetterStroke("TIPS",_FONT_LARGE,10,10,0xffffff,0x000000,imgTL,1);
    for(var i = 0;i < 10;i++){
	TipsButton[i].putPanelFont(_FONT_LARGE,200);
    }
    for(var i = 0;i < Math.floor(tipsData[tipsNo].length/12)+1;i++){
	MenuButton[i].putPanel();
    }
    for(var i = 0;i < 12;i++){
	SaveButton[i].putPanel();
    }
    switch(dataMode){
    case	0:
	if(BackButton[0].click()){
	    playSE("sysse01");
	    if(MainMode == MODE_TITLE){	// MODE_TITLEだとタイトル初期化
		TitleInit();
	    }
	    else{
		_dialog.set("CAUTION","タイトルへ戻りますか？\nセーブしていない場合、タイトルに戻ると、今までのゲームデータは保存されません。","YES","NO");
		dataUndo	= dataMode;
		dataMode	= 10;
	    }
	    keyInit();
	}
	else if(BackButton[1].click()){
	    playSE("sysse01");
	    menuInit0();
	    keyInit();
	    MenuMode = 0;
	}
	for(var i = 0;i < 10;i++){
	    if(TipsButton[i].click()){
		playSE("sysse01");
		tipsInit(i,0);
		return;
	    }
	}
	for(var i = 0;i < Math.floor(tipsData[tipsNo].length/12)+1;i++){
	    if(MenuButton[i].click()){
		playSE("sysse01");
		tipsInit(tipsNo,i);
		return;
	    }
	}
	for(var i = 0;i < 12;i++){
	    if(SaveButton[i].reg && SaveButton[i].click()){
		playSE("sysse01");
		var tipsid = tipsData[tipsNo][pageNo*12+i];
                if(devicetype == 1){
                    _plugin.SetTipsDialog(tipsText[tipsid][0]+","+tipsText[tipsid][1]);
                }
                else{
		    _dialog.set(tipsText[tipsid][0],tipsText[tipsid][1],"OK","");
		}
		// tips内tipsを調べる
                if(tipsid >= 10){
                    tipsid = "0"+tipsid;
                }
                else{
                    tipsid = "00"+tipsid;
                }
		if(tipsInTips[tipsid] != null){
		    var _tdata = tipsInTips[tipsid].split(",");
		    for(var i = 0; i < _tdata.length; i++){
			TipsFlag[parseInt(_tdata[i],10)]	= 1;
		    }
		    saveTipsFlag();
		}
	    }
	}
	break;
    case	10:
	if(_dialog.dialogOk()){	// okならセーブ
	    modeChgCtrl(MODE_TITLE);
	    keyInit();
	}
	else if(_dialog.dialogNo()){	// noなら戻る
	    dataMode	= dataUndo;
	}
	break;
    }
}

function menuCtrl(){	// メニュー本体
    SpritePut(IMG_effect1,0,0,imgTL,1);
    BackButton[0].put();
    BackButton[1].put();
    switch(MenuMode){
    case	0:	// メニュー選択
	PutLetterStroke("MENU",_FONT_LARGE,10,10,0xffffff,0x000000,imgTL,1);
	for(var i = 0; i < 5; i++){
	    SaveButton[i].put();//menu();
	}
/*
	MenuButton[0].put();
	if((NewFlag) && MenuButton[0].alpha == 1){
	    PutLetterStroke("New!",_FONT_SMALL,MenuButton[0].x+8,MenuButton[0].y-32,0xff0000,0xffffff,imgTL,1);
	}
*/
	MenuButton[1].put();

/*
	if(RegData["SR_TITLE"] == 1 && MenuButton[0].click()){	// news
	    playSE("sysse01");
	    MenuMode	= 19;
	}
	else
*/
	if(MenuButton[1].click()){	// help
	    playSE("sysse01");
	    HelpInit();
	    MenuMode	= 7;
	}
	else if(BackButton[0].click()){	// タイトルへ戻るボタン
	    playSE("sysse01");
	    if(MainMode == MODE_TITLE){	// MODE_TITLEだとタイトル初期化
		TitleInit();
	    }
	    else{
		_dialog.set("CAUTION","タイトルへ戻りますか？\nセーブしていない場合、タイトルに戻ると、今までのゲームデータは保存されません。","YES","NO");
		MenuMode	= 10;
	    }
	}
	else if(BackButton[1].click()){	// ゲームに戻る
	    playSE("sysse01");
	    if(MainMode == MODE_TITLE){	// MODE_TITLEだとタイトル初期化
		TitleInit();
	    }
	    else{	// MODE_GAMEだと各種データ初期化
		BGObj._visible	= true;
		// BGの倍率を戻す
/*
		BGObj.x	= BGObjtmp.x;
		BGObj.y	= BGObjtmp.y;
		BGObj.biasx	= BGObjtmp.biasx;
		BGObj.biasy	= BGObjtmp.biasy;
		BGObj.basex	= BGObjtmp.basex;
		BGObj.basey	= BGObjtmp.basey;
		BGObj.basew	= BGObjtmp.basew;
		BGObj.baseh	= BGObjtmp.baseh;
		BGObj.x2	= BGObjtmp.x2;
		BGObj.y2	= BGObjtmp.y2;
		BGObj.biasx2	= BGObjtmp.biasx2;
		BGObj.biasy2	= BGObjtmp.biasy2;
		BGObj.basex2	= BGObjtmp.basex2;
		BGObj.basey2	= BGObjtmp.basey2;
		BGObj.basew2	= BGObjtmp.basew2;
		BGObj.baseh2	= BGObjtmp.baseh2;
*/
		MenuButton[7].alpha = 0.5;
		MenuButton[7]._visible	= true;	// ゲームメニューボタン
		QSaveObj._count	= 0;
		if(RegData["REG_BG0"] != -1){
		    chgImage(PNG_bg0,ResPng+RegData["REG_BG0"]+".png");	// 背景ロード
		}
		else{
		    chgImage(PNG_bg0,ResPng+"bg_black.png");	// 背景ロード
		}
		if(RegData["REG_CHARA0"] != -1)
		    chgImage(PNG_chara00,ResPng+chkCharaObj(RegData["REG_CHARA0"])+".png");	// 背景ロード
		if(RegData["REG_CHARA1"] != -1)
		    chgImage(PNG_chara10,ResPng+chkCharaObj(RegData["REG_CHARA1"])+".png");	// 背景ロード
		if(RegData["REG_CHARA2"] != -1)
		    chgImage(PNG_chara20,ResPng+chkCharaObj(RegData["REG_CHARA2"])+".png");	// 背景ロード
		LocalMode	= LocalUndo;
	    }
	    SkipFlag	= false;
	    AutoFlag	= false;
	    touchOnCount	= 0;
	}
	else{
	    var _si = 0;	// タイトルからのメニューではsaveはできない
	    if(MainMode == MODE_TITLE){
		_si = 1;
	    }
	    for(var i = _si; i < 5; i++){
		if(SaveButton[i].click()){
		    playSE("sysse01");
		    keyInit();
		    MenuMode += (i+1);	// メニューモード
		    dataMode	= 0;
		    // menuモードの初期化
		    if(i == 0){		// save
//			chgImage(PNG_bg0,ResPng+"cg_title.png");
//			chgImage(PNG_bg1,ResPng+"cg_title.png");
			loadAll(1);	// セーブデータの簡易ロード
		    }
		    else if(i == 1){	// load
//			chgImage(PNG_bg0,ResPng+"cg_title.png");
//			chgImage(PNG_bg1,ResPng+"cg_title.png");
			loadAll(0);	// セーブデータの簡易ロード
		    }
		    else if(i == 2){
			configInit(0);
		    }
		    else if(i == 3){
//			chgImage(PNG_bg0,ResPng+"cg_title.png");
//			chgImage(PNG_bg1,ResPng+"cg_title.png");
			shortcutInit();
		    }
		    else if(i == 4){
			tipsInit(0,0);
		    }
		    break;
		}
	    }
	    delete _si;
	}
	break;
    case	1:	// セーブモード
	saveCtrl();
	break;
    case	2:	// ロードモード
	loadCtrl();
	break;
    case	3:
	configCtrl();
	break;
    case	4:
	shortcutCtrl();
	break;
    case	5:
	tipsCtrl();
	break;
    case	7:
	HelpCtrl();
	break;
    case	10:
	if(_dialog.dialogOk()){
	    modeChgCtrl(MODE_TITLE);
	}
	else if(_dialog.dialogNo()){
	    MenuMode	= 0;
	}
	break;
    case	19:
	PutLetterStroke("MENU",_FONT_LARGE,10,10,0xffffff,0x000000,imgTL,1);
	for(var i = 0; i < 5; i++){
	    SaveButton[i].put();//menu();
	}
/*
	MenuButton[0].put();
	if((NewFlag) && MenuButton[0].alpha == 1){
	    PutLetterStroke("New!",_FONT_SMALL,MenuButton[0].x+8,MenuButton[0].y-32,0xff0000,0xffffff,imgTL,1);
	}
*/
	MenuButton[1].put();
	if(http2str("http://game.cyberfrontonline.com/user/read_info?user_id="+MacAddress)){
	    NewFlag	= false;
	    switch(ResultData["status_code"]){
	    case	0:
		MenuMode	= 20;
		if(devicetype == 0){
		    _plugin.SetWebview("http://game.cyberfrontonline.com/info/");
		}
		else if(devicetype == 1){
		    _plugin.SetWebview("http://game.cyberfrontonline.com/info/ios_new.html");
		}
		else if(devicetype == 2){
		    _plugin.SetWebview("http://game.cyberfrontonline.com/info/android_new.html");
		}
                ChkWebviewFlag  = true;
		webviewTimer	= setInterval(_plugin.ChkWebview,2000);
		break;
	    case	1:
	    default:
		MenuMode	= 21;
		_dialog.set("接続失敗","接続に失敗しました。再接続しますか？","はい","いいえ");
		break;
	    }
	}
	else{
	    MenuMode	= 21;
	    _dialog.set("接続失敗","接続に失敗しました。再接続しますか？","はい","いいえ");
	}
	break;
    case	20:
	PutLetterStroke("MENU",_FONT_LARGE,10,10,0xffffff,0x000000,imgTL,1);
	for(var i = 0; i < 5; i++){
	    SaveButton[i].put();//menu();
	}
/*
	MenuButton[0].put();
	if((NewFlag) && MenuButton[0].alpha == 1){
	    PutLetterStroke("New!",_FONT_SMALL,MenuButton[0].x+8,MenuButton[0].y-32,0xff0000,0xffffff,imgTL,1);
	}
*/
	MenuButton[1].put();
	if(T() || !ChkWebviewFlag){
	    clearInterval(webviewTimer);
	    MenuMode	= 0;
	}
	break;
    case	21:
	PutLetterStroke("MENU",_FONT_LARGE,10,10,0xffffff,0x000000,imgTL,1);
	for(var i = 0; i < 5; i++){
	    SaveButton[i].put();//menu();
	}
/*
	MenuButton[0].put();
	if((NewFlag) && MenuButton[0].alpha == 1){
	    PutLetterStroke("New!",_FONT_SMALL,MenuButton[0].x+8,MenuButton[0].y-32,0xff0000,0xffffff,imgTL,1);
	}
*/
	MenuButton[1].put();
	if(_dialog.dialogOk()){	// okなら終了
	    MenuMode	= 19;
	}
	else if(_dialog.dialogNo()){	// noなら戻る
	    MenuMode	= 0;
	}
	break;
    }
}

var _ybias = 0;
var _xbias = 0;
var _maxybias = 0;
function logInit(){
    LocalLog	= LocalMode;
    LocalMode	= GAME_log;
    keyInit();
    MenuButton[7]._visible	= false;	// ゲームメニューボタン
    BackButton[1].init(IMG_goback,ScreenWidth-10,ScreenHeight-10,imgBR,1);

    var _line = 0;
    for(var i = 0; i < LogList.length; i++){
	var _data	= LogList[i].split(",");
	if(_data[1] != ""){
	    _line ++;
	    _line ++;
	    _data[2] = "    "+_data[2];
	}
	if(_data[2] != ""){
	    _data[2]	= _data[2].replace(/%W/g,"");
	    _data[2]	= _data[2].replace(/%T030/g,"");
	    _data[2]	= _data[2].replace(/%T015/g,"");
	    _data[2]	= _data[2].replace(/%T/g,"");
	    _data[2]	= _data[2].replace(/%K/g,"");
	    _data[2]	= _data[2].replace(/%P/g,"");
	    _data[2]	= _data[2].replace(/%N/g,"");
	    _data[2]	= _data[2].replace(/%V/g,"");
	    _data[2]	= _data[2].replace(/%LC/g,"");
	}
	_WordData[WORD_TMP00] = "";
	var num = DivLetter(_data[2],_FONT_MIDDLE,440);
	_line += num;
	_line ++;
	delete num;
	delete _data;
    }
    _ybias = 0;
    if(_line > 11){
	_ybias = -(_line-11)*(_fontSize[_FONT_MIDDLE]*2+3);
    }
    _maxybias	= _ybias;
    LogID	= -1;
    delete _line;
}
var LogID;
function logCtrl(){
    var _data;
    var _line = 0;
    FillRect(0,0,ScreenWidth,ScreenHeight,0x000000,0.9);
    BackButton[1].put();
    for(var i = 0; i < 11; i++){
	DrawLine(20,(51+i*(_fontSize[_FONT_MIDDLE]*2+3)),ScreenWidth-20,(51+i*(_fontSize[_FONT_MIDDLE]*2+3)),0xffffff,1);
    }

    for(var i = 0; i < LogList.length; i++){
	_data	= LogList[i].split(",");
	var _lines = _line;
	if(_data[1] != ""){
	    _line++;
	    if((_line*(_fontSize[_FONT_MIDDLE]*2+3)+_ybias) >= -19 && (_line*(_fontSize[_FONT_MIDDLE]*2+3)+_ybias) <= 220){
		PutLetterStroke(_data[1],_FONT_MIDDLE,20,30+_line*(_fontSize[_FONT_MIDDLE]*2+3)+_ybias,_data[0],0x000000,imgTL,1);
	    }
	    _line++;
	    _data[2] = "    "+_data[2];
	}
	if(_data[2] != ""){
	    _data[2]	= _data[2].replace(/%W/g,"");
	    _data[2]	= _data[2].replace(/%TS[0-9]*/g,"");
	    _data[2]	= _data[2].replace(/%X[0-9]*/g,"");
	    _data[2]	= _data[2].replace(/%C[0-9A-Z]*/g,"");
	    _data[2]	= _data[2].replace(/%T060/g,"");
	    _data[2]	= _data[2].replace(/%T030/g,"");
	    _data[2]	= _data[2].replace(/%T015/g,"");
	    _data[2]	= _data[2].replace(/%TE/g,"");
	    _data[2]	= _data[2].replace(/%FS/g,"");
	    _data[2]	= _data[2].replace(/%FE/g,"");
	    _data[2]	= _data[2].replace(/%T/g,"");
	    _data[2]	= _data[2].replace(/%K/g,"");
	    _data[2]	= _data[2].replace(/%P/g,"");
	    _data[2]	= _data[2].replace(/%p/g,"");
	    _data[2]	= _data[2].replace(/%N/g,"");
	    _data[2]	= _data[2].replace(/%LC/g,"");
	    _data[2]	= _data[2].replace(/%LR/g,"");
	    _data[2]	= _data[2].replace(/%LF/g,"");
	    _data[2]	= _data[2].replace(/%LL/g,"");
	    _data[2]	= _data[2].replace(/%E/g,"");
	    _data[2]	= _data[2].replace(/%O/g,"");
	}
	if(_data[3] != ""){
	    if(((_line-1)*(_fontSize[_FONT_MIDDLE]*2+3)+_ybias) >= -19 && ((_line-1)*(_fontSize[_FONT_MIDDLE]*2+3)+_ybias) <= 220){
		PutLetterStroke("♪",_FONT_MIDDLE,10,30+(_line-1)*(_fontSize[_FONT_MIDDLE]*2+3)+_ybias,0xffff00,0x000000,imgTL,1);
	    }
	}

	_WordData[WORD_TMP00] = "";
	var num = DivLetter(_data[2],_FONT_MIDDLE,440);
	if(num == 0){
	    if((_line*(_fontSize[_FONT_MIDDLE]*2+3)+_ybias) >= -19 && (_line*(_fontSize[_FONT_MIDDLE]*2+3)+_ybias) <= 220){
		PutLetterStroke(_data[2],_FONT_MIDDLE,20,30+_line*(_fontSize[_FONT_MIDDLE]*2+3)+_ybias,_data[0],0x000000,imgTL,1);
	    }
	    _line++;
	}
	else{
	    for(var j = 0; j <= num; j++){
		if((_line*(_fontSize[_FONT_MIDDLE]*2+3)+_ybias) >= -19 && (_line*(_fontSize[_FONT_MIDDLE]*2+3)+_ybias) <= 220){
		    PutLetterStroke(_WordData[WORD_TMP00+j],_FONT_MIDDLE,20,30+_line*(_fontSize[_FONT_MIDDLE]*2+3)+_ybias,_data[0],0x000000,imgTL,1);
		}
		_line++;
	    }
	}
	var _lsub = _line-_lines;
	if(LogID == i && _data[3] != ""){
	    DrawRectR(21,30+_lines*(_fontSize[_FONT_MIDDLE]*2+3)+_ybias+1,ScreenWidth-42,_lsub*(_fontSize[_FONT_MIDDLE]*2+3)-2,0x8080f0,1,4,0);
	}
	delete _lines;
	delete _lsub;
	delete num;
    }
    if(touchMoveY != 0){
	touchOnF	= false;
	_ybias += -(Math.floor(touchMoveY)*(_fontSize[_FONT_MIDDLE]*2+3))*2;
	if(_ybias > 0){
	    _ybias = 0;
	}
	if(_ybias < _maxybias){
	    _ybias	= _maxybias;
	}
	LogID	= -1;
    }
    else if(BackButton[1].click()){
	playSE("sysse01");
	MenuButton[7]._visible	= true;	// ゲームメニューボタン
	MenuButton[7].alpha = 0.5;
	LocalMode	= LocalLog;
    }
    else{
	_line	= 0;
	for(var i = 0; i < LogList.length; i++){
	    var _data	= LogList[i].split(",");
	    var _lines = _line;
	    if(_data[1] != ""){
		_line ++;
		_line ++;
		_data[2] = "    "+_data[2];
	    }
	    if(_data[2] != ""){
		_data[2]	= _data[2].replace(/%W/g,"");
		_data[2]	= _data[2].replace(/%T030/g,"");
		_data[2]	= _data[2].replace(/%T015/g,"");
		_data[2]	= _data[2].replace(/%T/g,"");
		_data[2]	= _data[2].replace(/%K/g,"");
		_data[2]	= _data[2].replace(/%P/g,"");
		_data[2]	= _data[2].replace(/%N/g,"");
		_data[2]	= _data[2].replace(/%LC/g,"");
	    }
	    _WordData[WORD_TMP00] = "";
	    var num = DivLetter(_data[2],_FONT_MIDDLE,440);
	    _line += num;
	    _line ++;
	    var _lsub = _line-_lines;
	    if(Toff(0,30+_lines*(_fontSize[_FONT_MIDDLE]*2+3)+_ybias,ScreenWidth,_lsub*(_fontSize[_FONT_MIDDLE]*2+3)-2)){
		if(_data[3] != ""){
		    playVoice(_data[3]);
		}
		LogID	= i;
	    }
	    delete _data;
	    delete _lines;
	    delete _lsub;
	    delete num;
	}
    }
    delete _data;
    delete _line;
}

function uvCtrl(){
//    BGObj.hsxValue();
//    BGObj.hsyValue();
    FadeObj.haValue();
    var count = parseInt(RegData["LR_M00"]);
    count--;
    RegData["LR_M00"]	= count;
    if(count < 0 && !FadeObj.ha.isvalue()){
	LocalMode	= GAME_loop;
	if(UVFadeFlag){
	    UVFadeFlag	= false;
	    fadeCtrlReset();	// -----------
	}
    }
}

function timerwaitCtrl(){
    if(SkipFlag && timerWaitTimer != -1){
	clearTimeout(timerWaitTimer);
	timerWaitTimer	= -1;
	timerWaitFlag	= false;
    }

    if(!timerWaitFlag){
	LocalMode	= GAME_loop;
    }
}
//----------------------------------------------------------------------//
// ゲームメイン
//----------------------------------------------------------------------//
function	GameCtrl(){
    if(CautionFlag){
	modeChgCtrl(MODE_END);
	return;
    }
    // プット
    BGObj.putbg();
//    FillRect(0,0,20,20,0x00ffff);
    CharaObj[2].putchara();
    CharaObj[1].putchara();
    CharaObj[0].putchara();
//    FillRect(40,0,20,20,0xffffff);
    EffObj.putfog();	// フォグ＆太陽光
//    FillRect(60,0,20,20,0xff0000);
    if(RainFlag){	// 雨
//	fogCtrl(EffObj);
	switch(RegData["REG_RAIN"]){
	case	4:
	    for(var i = 0; i < 50; i++){
		RainObj[i].puts();
//		RainObj[i].fillarc(RainObj[i].x,RainObj[i].y,RainObj[i].r,RainObj[i].color,RainObj[i].alpha);
		RainObj[i].x+=RainObj[i].speedx;
		RainObj[i].y+=RainObj[i].speedy;
		if(--RainObj[i].count < 0){
		    RainObj[i].count	= Random(10);
		    RainObj[i].speedx	= Random(4)-2;
//		    RainObj[i].speedy	= Random(4)+2;
		}
		if(RainObj[i].y > 330){
		    RainObj[i].x	= Random(480);
		    RainObj[i].y	= -Random(10);
		}
	    }
	    break;
	default:
//	    fogSnow(EffObj);
	    for(var i = 0; i < 50; i++){
		RainObj[i].puts();
//		RainObj[i].fillarc(RainObj[i].x,RainObj[i].y,RainObj[i].r,RainObj[i].color,RainObj[i].alpha);
		RainObj[i].x+=RainObj[i].speedx;
		RainObj[i].y+=RainObj[i].speedy;
		if(RegData["REG_RAIN"] == 2){
		    if(RainObj[i].x > 490 || RainObj[i].y > 330){
			RainObj[i].x	= 480-Random(640);
			RainObj[i].y	= -Random(10);
		    }
		}
		else{
		    if(RainObj[i].x < -10 || RainObj[i].y > 330){
			RainObj[i].x	= Random(480)+120;
			RainObj[i].y	= -Random(10);
		    }
		}
	    }
	}
    }
//    FillRect(80,0,20,20,0xffff00);
    if(LightFlag){
	FillArc(LightObj[0].x,140,LightObj[0].scale,0xffffff,0.6,0);
	FillArc(440,140,LightObj[1].scale,0xffffff,0.6,0);
	LightObj[0].hsValue();
	LightObj[0].hxValue();
	LightObj[1].hsValue();
    }
    BlinkObj.putblink();
//    FillRect(140,0,20,20,0x00ff00);
    FilterObj.putfilter();	// マスクフィルター
//    FillRect(160,0,20,20,0x00ffff);

    if(MaskColor != 0){
	FillRect(0,0,ScreenWidth,ScreenHeight,MaskColor,MaskAlpha);
    }

    if(androidtype == 2){
	FadeObj.fadeput2();	// フェード
    }
    else{
	FadeObj.fadeput();	// フェード
    }

    if(androidtype == 2 && FadeNow){
	FadeChara[2].alpha	= FadeObj.alpha;
	FadeChara[1].alpha	= FadeObj.alpha;
	FadeChara[0].alpha	= FadeObj.alpha;
	FadeChara[2].putfadechara();
	FadeChara[1].putfadechara();
	FadeChara[0].putfadechara();
	if(FadeMaskColor != 0){
	    var _alpha = FadeObj.alpha;
	    if(_alpha > FadeMaskAlpha){
		_alpha = FadeMaskAlpha;
	    }
	    FillRect(0,0,ScreenWidth,ScreenHeight,FadeMaskColor,_alpha);
	}
    }

    if(!NoWindow){
	if(ScreenMode == 1){	// 台詞ウインドウ
	    MainObj.putmainwin();
	    NameObj.putname();
	}
	if(LocalMode != GAME_log){
	    MessObj.putletter();	// メッセージ
	    for(var i = 0; i < MessNewLength; i++){
		MessNew[i].putletter();	// メッセージ
		MessNew[i].haValue();
	    }
//	    if(!MessNew[0].ha.isvalue() && !MessNew[1].ha.isvalue() && !MessNew[2].ha.isvalue() ){
	    if(!MessNew[PutLine].ha.isvalue()){
		MesFadeNow	= false;
	    }
	}
	if(!DisKeyFlag)
	    HglassObj.puts();		// 砂時計
    }

    if(--FlashCount > 0){
	FillRect(0,0,ScreenWidth,ScreenHeight,0xffffff,1);
    }

    SelectObj[0].putselect();	// セレクトボタン
    SelectObj[1].putselect();
    SelectObj[2].putselect();
    SelectObj[3].putselect();
    SelectObj[4].putselect();

    if(SkipFlag && _count%10 > 4){
	SpritePut(IMG_sel_mark,ScreenWidth-40+16,MainObj.y-4,imgBR,1);
	SpritePut(IMG_sel_mark,ScreenWidth-40+8,MainObj.y-4,imgBR,1);
	SpritePut(IMG_sel_mark,ScreenWidth-40,MainObj.y-4,imgBR,1);
    }
    if(AutoFlag && _count%10 > 4){
	SpritePut(IMG_sel_mark,ScreenWidth-40,MainObj.y-4,imgBR,1);
    }

    TitleObj.puttitle();	// 左上のタイトル文字
    TimeObj.puttime();		// 右上の時計

    if(--QSaveObj._count > 0){	// Q.save
	QSaveObj.put();
    }

    if(HglassObj._visible){	// 砂時計コントロール
	switch(HglassObj._mode){
	case	0:
	    HglassObj.rot+=20;
	    if(HglassObj.rot > 360){
		HglassObj.rot	= 0;
		HglassObj._mode	= 1;
		HglassObj.wait = 10;
	    }
	    break;
	case	1:
	    if(--HglassObj.wait < 0){
		HglassObj._mode	= 0;
	    }
	    break;
	}
    }
    // エフェクトコントロール(フォグ)
    if(EffObj._visible){
	switch(EffObj._effect){
	case	1:
	    fogCtrl(EffObj);
	    break;
	case	2:
	    fogSnow(EffObj);
	    break;
	}
    }
    switch(EffType){		// 地震
    case	_ET_quake:
	BGObj.biasx = parseInt(Math.floor(Math.sin(_count*60*(Math.PI / 180))*6/2));
	BGObj.biasy = -parseInt(Math.floor(Math.cos(_count*56*(Math.PI / 180))*6/2));
	CharaObj[0].biasx	= BGObj.biasx;
	CharaObj[0].biasy	= BGObj.biasy;
	CharaObj[1].biasx	= BGObj.biasx;
	CharaObj[1].biasy	= BGObj.biasy;
	CharaObj[2].biasx	= BGObj.biasx;
	CharaObj[2].biasy	= BGObj.biasy;
	break;
    case	_ET_quake2:
	BGObj.biasx = parseInt(Math.floor(Math.sin(_count*200*(Math.PI / 180))*4/2));
	BGObj.biasy = -parseInt(Math.floor(Math.cos(_count*180*(Math.PI / 180))*4/2));
	CharaObj[0].biasx	= BGObj.biasx;
	CharaObj[0].biasy	= BGObj.biasy;
	CharaObj[1].biasx	= BGObj.biasx;
	CharaObj[1].biasy	= BGObj.biasy;
	CharaObj[2].biasx	= BGObj.biasx;
	CharaObj[2].biasy	= BGObj.biasy;
	break;
    }

    BGObj.haValue();	// 背景コントロール
    BGObj.hbxValue();
    BGObj.hbyValue();
//    if(BGObj.svalue){
	BGObj.hbwValue();
	BGObj.hbhValue();
//    }
    for(var i = 0; i < 3; i++){
	CharaObj[i].haValue();	// キャラコントロール
	CharaObj[i].hxValue();	// キャラコントロール
	CharaObj[i].hyValue();	// キャラコントロール
	if(CharaObj[i].svalue){
	    CharaObj[i].hsxValue();	// キャラコントロール
	    CharaObj[i].hsyValue();	// キャラコントロール
	}
    }
    switch(BlinkFlag){
    case	1:
	blinkCtrl(BlinkObj);
	break;
    }

    if(FilterObj.ha.isvalue()){
	FilterObj.haValue();
    }

    switch(LocalMode){	// ゲーム中モード
    case	GAME_loop:
	if(Macro2Flag){
	    MacroCtrl2();	// macroコントロール
	}
	else if(MacroData != null){
	    MacroCtrl();	// macroコントロール
	}
	break;
    case	GAME_mes:	// メッセージコントロール
	GamemessCtrl();
	break;
    case	GAME_wait:	// 待ち
	if(--LocalCounter < 0 || SkipFlag){
	    LocalMode	= GAME_loop;
	}
	break;
    case	GAME_sewait:	// 待ち
	if(!seWaitFlag){
	    LocalMode	= GAME_loop;
	}
	break;
    case	GAME_voicewait:	// 待ち
	if(!voiceWaitFlag){
	    LocalMode	= GAME_loop;
	}
	break;
    case	GAME_fade:	// フェードコントロール
	switch(FadeObj.type){
	case	0:		// 通常フェード
	case	11:		// 通常フェード
	case	13:		// 通常フェード
	case	4:		// ワイプのフェード
	    FadeObj.haValue();
	    break;
	case	10:
	    FadeObj.hsValue();	// 円形フェード
	    FadeObj.htValue();
	    break;
	}
	if(--FadeObj._count < 0){	// フェード終了→フェードが終わった後の処理
	    fadeCtrlReset();
	}
	break;
    case	GAME_win:	// 台詞ウインドウをもやっと出す
	MainObj.haValue();
	if(--LocalCounter < 0){
	    LocalMode	= GAME_loop;
	}
	break;
    case	GAME_next:	// macro呼び出し
	RegData["REG_BLINK"]	= 0;
	BlinkFlag	= 0;
	BlinkObj._visible	= false;

	loadFile("./res/json/"+MacroNext+".json");
	LocalMode	= GAME_loop;
	DDMode	= JumpNum;
	MacroNum	= 0;
	MacroCommand = 0;
	FadeAlphaNow	= 0;
//	if(devicetype > 0 && SetImageNum > 250){
	if(MacroNext == "SHORTCUT"){
	    ;
	}
	else if(SetImageNum > 250){
//	else if(SetImageNum > 250 || true){
	    ResetFlag	= true;
	    SetImageNum = 0;
	    for(var i = 0; i < MACTB.length;i++){
		if(MACTB[i] == MacroNext){
		    MacroScenario	= i;
		}
	    }
	    RegData["REG_BG0"]	= "bg_black";
	    BGObj.x = 0;
	    BGObj.y = 0;
	    BGObj.biasx = 0;
	    BGObj.biasy = 0;
	    BGObj.alpha = 1;
	    BGObj.basex	= 0;
	    BGObj.basey	= 0;
	    BGObj.basew	= 480;
	    BGObj.baseh	= 360;
	    CharaObj[0].x	= 0;
	    CharaObj[0].y	= 0;
	    CharaObj[0].scalex	= 480;
	    CharaObj[0].scaley	= 360;
	    CharaObj[0]._visible	= false;
	    CharaObj[1].x	= 0;
	    CharaObj[1].y	= 0;
	    CharaObj[1].scalex	= 480;
	    CharaObj[1].scaley	= 360;
	    CharaObj[1]._visible	= false;
	    CharaObj[2].x	= 0;
	    CharaObj[2].y	= 0;
	    CharaObj[2].scalex	= 480;
	    CharaObj[2].scaley	= 360;
	    CharaObj[2]._visible	= false;
	    RegData["REG_CHARA0"]	= -1;
	    RegData["REG_CHARA1"]	= -1;
	    RegData["REG_CHARA2"]	= -1;

	    saveRegOrg(99);
	    saveSystem();
            if(devicetype != 2){
              location.href = "wait.html";
            }
            else{
		_plugin.wait("",
			     function(r){ },
			     function(e){ }
			    );
	    }
	}
	break;
    case	GAME_cal:	// カレンダー
	CalendarCtrl();
	break;
    case	GAME_select:	// セレクト
	SelectCtrl();
	break;
    case	GAME_chara:	// キャラもやっと
	if(!CharaObj[0].ha.isvalue() && !CharaObj[1].ha.isvalue() && !CharaObj[2].ha.isvalue()){
	    LocalMode	= GAME_loop;
	}
	break;
    case	GAME_movie:	// 動画終わり待ち
	if(T() || !ChkMovieFlag){
	    keyInit();
	    clearInterval(movieTimer);
	    stopMovie();
	    LocalMode	= GAME_loop;
	}
	break;
    case	GAME_filt:	// マスクフィルターをもやっと
	FilterObj.haValue();
	if(!FilterObj.ha.isvalue()){
	    LocalMode	= GAME_loop;
	}
	break;
    case	GAME_qua:	// 背景、キャラ揺れ(地震とは違う
	if(QueType == "QUA0_CHR0" || QueType == "QUA1_CHR0" || QueType == "QUA2_CHR0"){
	    quaCtrl(CharaObj[0],0);
	}
	else if(QueType == "QUA1_CHR1"){
	    quaCtrl(CharaObj[1],0);
	}
	else if(QueType == "QUA2_ALL" || QueType == "QUA1_ALL" || QueType == "QUA0_ALL"){
	    quaCtrl(CharaObj[0],0);
	    quaCtrl(CharaObj[1],0);
	    quaCtrl(CharaObj[2],0);
	    quaCtrl(BGObj,0);
	}
	else{
	    quaCtrl(BGObj,1);
	}
	break;
    case	GAME_load:	// ロードからはここにくる予定だったけどこない(json読み込み待ち)
	LocalMode	= GAME_fade;
	break;
    case	GAME_syswin:	// 「ＣＵＲＥ」シナリオ覚醒
	if(T()){
	    EffObj._visible	= false;
	    LocalMode	= GAME_loop;
	}
	break;
    case	GAME_eos:	// シナリオ終了→システムセーブしますかダイアログYES/NO待ち
	saveSystem();
	if(devicetype != 0){
	    localStorage_save(null,null);
	}
	modeChgCtrl(MODE_TITLE);
/*
	if(_dialog.dialogOk()){
	    saveSystem();	// ok→システムセーブ
	    modeChgCtrl(MODE_TITLE);
	}
	else if(_dialog.dialogNo()){
	    loadSystem();	// no→システムデータ読み直し
	    modeChgCtrl(MODE_TITLE);
	}
*/
	break;
    case	GAME_menuinit:
	LocalMode	= LocalUndo;	// 戻りは今のモードに
	menuInit(GAME_menu);
	break;
    case	GAME_menu:	// メニューコントロール
	menuCtrl();
	break;
    case	GAME_log:
	logCtrl()
	break;
    case	GAME_nowindow:
	if(_T()){
	    LocalMode	= LocalLog;
	    NoWindow	= false;
	}
	break;
    case	GAME_uvctrl:
	uvCtrl()
	break;
    case	GAME_timerwait:
	timerwaitCtrl();
	break;
    }

    if(!NoWindow){
	MenuButton[7].put();	// ゲーム→menuボタン
    }
    if(LocalMode != GAME_log && LocalMode != GAME_select && LocalMode != GAME_fade){
	// スキップ
	if(NoSkipFlag){	// スキップしていけないマクロ中
	    SkipFlag	= false;
	    touchOnCount	= 0;
//	    MessObj.word	= "";
//	    MessageInitNew();
	}
	else if(!AutoFlag && !SkipFlag && !NoWindow && (SlideRight()||SlideLeft()) && LocalMode != GAME_menu){
	    stopSE();
	    playSE("sysse10");
	    SkipFlag	= true;
	    HglassObj._visible = false;
	    keyInit();
	}
	else if(SkipFlag && _T()){
	    SkipFlag	= false;
	    SkipCancel	= true;
	    touchOnCount	= 0;
	    MessObj.word	= "";
	    MessageInitNew();
	    keyInit();
	}
	if(!SkipFlag && !AutoFlag && !NoWindow && touchOn && LocalMode != GAME_menu){	// いまのとこおしっぱでスキップ
	    touchOnCount	++;
	    if(touchOnCount > 10){
		playSE("sysse11");
		AutoFlag	= true;
		keyInit();
	    }
	}
	else if(AutoFlag && _T()){
	    AutoFlag	= false;
	    touchOnCount	= 0;
	    keyInit();
	}
	if(!SkipFlag && !AutoFlag && !NoWindow && SlideDown() && LocalMode != GAME_menu){
	    NoWindow	= true;
	    LocalLog	= LocalMode;
	    LocalMode	= GAME_nowindow;
	    keyInit();
	}
    }
}

var qua2data = [
    1,0,-1
];
function quaCtrl(obj,flag){	// 背景、キャラ揺れ(地震とは違う
/*
    obj.htValue();
    obj.biasx = obj.tmp;
    if(obj._count%2 == 0){
	obj.biasx = -obj.tmp;
    }
    obj.biasy = 0;//obj._count%2*8;
    obj._count++;
    if(!obj.ht.isvalue()){
	obj.alpha	= 1;
	console.log("lllllllllllllllllllllllll"+obj.alpha);
	obj.biasx = 0;
	obj.biasy = 0;
	LocalMode	= GAME_loop;
    }
*/
    if(obj.pat >= 0){
	--obj._count;
	obj.biasx2 = obj.biasx;
	obj.biasy2 = obj.biasy;
	if(flag == 1){
	    obj.biasx = obj._count;
	    if(obj._count%2 == 0){
		obj.biasx *= -1;
	    }
	    obj.biasy *= -1;
	}
	else{
	    obj.biasx *= -1;
	}
	if(obj._count < 0){
	    obj.alpha	= 1;
	    obj.biasx = 0;
	    obj.biasy = 0;
	    LocalMode	= GAME_loop;
	}
    }
}
//----------------------------------------------------------------------//
// メッセージ
//----------------------------------------------------------------------//
var MesLine = 0;
var PutLine = 0;
var MesWidth = 410;
var NewCount = 0;
var MesFade = false;
var MesFadeNow = false;
var MesFadeOut = false;
var isMesFade = false;
var isMesVoice = false;

function MessageInitNew(){
    MesFadeNow	= false;
    MesLine	= 0;
    PutLine	= 0;
    for(var i = 0; i < MessNewLength; i++){
	MessNew[i].word		= "";
	MessNew[i].wordold	= "";
	MessNew[i].messtr	= "";
	MessNew[i].wordorg	= "";
	MessNew[i].biasx	= 0;
	MessNew[i].t2		= imgTL;
	MessNew[i].mescount	= 0;
	MessNew[i].alpha	= 1;
	MessNew[i].color	= 0xffffff;
	MessNew[i].fade		= false;
	MessNew[i].fadeout	= false;
    }
    MessColor	= 0xffffff;
}
function MessageVisible(_f){
    for(var i = 0; i < MessNewLength; i++){
	MessNew[i]._visible		= _f;
    }
}

function MessageSetNew(){
    for(var i = PutLine; i <= MesLine; i++){
	MessNew[i].word = MessNew[i].messtr;
	MessNew[i].alpha = 1;
	MessNew[i].ha.hvstart	= false;
	MessNew[i].counter	= 0;
    }
    PutLine	= MesLine;
}

function MessageFadeNew(){
    MessNew[PutLine].fade	= true;
    MessNew[PutLine].alpha	= 0;
    MessNew[PutLine].haInit(0,1,10,HV_UNIFORM,0);
    MesFade	= true;
    var _f = true;
    while(_f){
	Word0 = MessNew[PutLine].wordorg.charAt(MessNew[PutLine].mescount);
	if(Word0.indexOf("%") != -1){
	    MessNew[PutLine].mescount++;
	    Word0 = MessNew[PutLine].wordorg.charAt(MessNew[PutLine].mescount);
	    if(Word0.indexOf("F") != -1){
//		MessNew[PutLine].mescount++;
		Word0	= "";
		MesFade	= false;
		_f	= false;
	    }
	    else if(Word0.indexOf("L") != -1){
		Word0	= "";
		MessNew[PutLine].mescount++;
	    }
	    else if(Word0.indexOf("N") != -1){	// 改行
		MessDelFlag	= false;
		Word0	= "";
		MessNew[PutLine].mescount++;
	    }
	    else if(Word0.indexOf("X") != -1){
		MessNew[PutLine].mescount++;
		MessNew[PutLine].mescount++;
		MessNew[PutLine].mescount++;
	    }
	    else if(Word0.indexOf("C") != -1){
		MessNew[PutLine].mescount++;
		MessNew[PutLine].mescount++;
		MessNew[PutLine].mescount++;
		MessNew[PutLine].mescount++;
	    }
	}
	else{
	    MessNew[PutLine].word += Word0;
	}
	MessNew[PutLine].mescount++;
	if(MessNew[PutLine].mescount >= MessNew[PutLine].wordorg.length){
	    break;
	}
    }
}

function MessageCtrlNew(){
/*
    if(PutLine > MesLine){
	return -1;
    }
*/
    if(MessNew[PutLine].mescount < MessNew[PutLine].wordorg.length){
	if(MesFade){	// フェードmacroの改行時にくる
	    MessageFadeNew();
	    MessNew[PutLine].mescount++;
	}
	Word0 = MessNew[PutLine].wordorg.charAt(MessNew[PutLine].mescount);
	if(Word0.indexOf("%") != -1){
	    MessNew[PutLine].mescount++;
	    Word0 = MessNew[PutLine].wordorg.charAt(MessNew[PutLine].mescount);
	    if(Word0.indexOf("W") != -1){	// 文字間ウェイト
		Word0	= "";
		LocalCounter	= 30/6;
	    }
	    else if(Word0.indexOf("T") != -1){	// 文字間ウェイト
		MessNew[PutLine].mescount++;
		Word0 = MessNew[PutLine].wordorg.charAt(MessNew[PutLine].mescount);
		if(Word0.indexOf("S") != -1){
		    MessNew[PutLine].mescount++;
		    MessNew[PutLine].mescount++;
		    MessNew[PutLine].mescount++;
		}
		else if(Word0.indexOf("E") != -1){
		}
		else{
		    var _count = Word0;
		    MessNew[PutLine].mescount++;
		    Word0 = MessNew[PutLine].wordorg.charAt(MessNew[PutLine].mescount);
		    _count+=Word0;
		    MessNew[PutLine].mescount++;
		    Word0 = MessNew[PutLine].wordorg.charAt(MessNew[PutLine].mescount);
		    _count+=Word0;
		    _count = parseInt(_count);
		    LocalCounter	= _count/3;
		}
		Word0	= "";
	    }
	    else if(Word0.indexOf("K") != -1){	// キー押し待ち
		MessKeyWait	= true;
		Word0	= "";
	    }
	    else if(Word0.match(/^p/)){	// 押されたら消す
		MessDelFlag	= false;
		Word0	= "";
	    }
	    else if(Word0.indexOf("P") != -1 || Word0.indexOf("p") != -1){	// 押されたら消す
		MessDelFlag	= true;
		Word0	= "";
	    }
	    else if(Word0.indexOf("N") != -1){	// 改行
		MessDelFlag	= false;
//		Word0	= "\n";
		Word0	= "";
//		PutLine	++;
	    }
	    else if(Word0.indexOf("L") != -1){
		MessNew[PutLine].mescount++;
		Word0 = "";
	    }
	    else if(Word0.indexOf("V") != -1){
//		MessNew[PutLine].mescount++;
		Word0 = "";
	    }
	    else if(Word0.indexOf("F") != -1){	// フェードのため一気に文字を出しておく
		MessNew[PutLine].mescount++;
		Word0 = MessNew[PutLine].wordorg.charAt(MessNew[PutLine].mescount);
		if(Word0.indexOf("S") != -1){
		    MesFadeNow	= true;
		    MessNew[PutLine].mescount++;
		    MessageFadeNew();

		    Word0 = MessNew[PutLine].wordorg.charAt(MessNew[PutLine].mescount);
//		    console.log("sssssssssss"+Word0);
		    Word0	= "";

//		    MessNew[PutLine].mescount++;
		}
	    }
	    else if(Word0.indexOf("O") != -1){
		Word0 = "";
		MessNew[PutLine].mescount++;
	    }
	    else if(Word0.indexOf("X") != -1){
		Word0 = "";
		MessNew[PutLine].mescount++;
		MessNew[PutLine].mescount++;
		MessNew[PutLine].mescount++;
	    }
	    else if(Word0.indexOf("C") != -1){
		Word0 = "";
		MessNew[PutLine].mescount++;
		MessNew[PutLine].mescount++;
		MessNew[PutLine].mescount++;
		MessNew[PutLine].mescount++;
	    }
	}
	MessNew[PutLine].word += Word0;
	MessNew[PutLine].mescount++;
	WaitCounter	= WaitCountData[ConfigText0];
	return 0;
    }
    else{
	if(PutLine < MesLine){
	    PutLine++;
	}
	else{
	    return -1;
	}
	return 1;
    }
}
function MessageCalcNew(){
    MesCount	= 0;
//    MessNew[MesLine].wordorg = "";
    MessNew[MesLine].putstr	= "";
    while(MesCount < MesStr.length){
	Word0 = MesStr.charAt(MesCount);
	if(Word0.indexOf("%") != -1){
	    MessNew[MesLine].wordorg+=Word0;
	    MesCount++;
	    Word0 = MesStr.charAt(MesCount);
	    MessNew[MesLine].wordorg+=Word0;
	    if(Word0.indexOf("K") != -1){	// キー押し待ち
		MessKeyWait	= true;
	    }
	    else if(Word0.indexOf("T") != -1){	// wait
		MesCount++;
		Word0 = MesStr.charAt(MesCount);
		MessNew[MesLine].wordorg+=Word0;
		if(Word0.indexOf("S") != -1){
		    var tips = "";
		    MesCount++;
		    Word0 = MesStr.charAt(MesCount);
		    tips += Word0;
		    MessNew[MesLine].wordorg+=Word0;
		    MesCount++;
		    Word0 = MesStr.charAt(MesCount);
		    tips += Word0;
		    MessNew[MesLine].wordorg+=Word0;
		    MesCount++;
		    Word0 = MesStr.charAt(MesCount);
		    tips += Word0;
		    MessNew[MesLine].wordorg+=Word0;
		    TipsFlag[parseInt(tips,10)]	= 1;
		    saveTipsFlag();
		}
		else if(Word0.indexOf("E") != -1){
		    ;
		}
		else{
		    MesCount++;
		    Word0 = MesStr.charAt(MesCount);
		    MessNew[MesLine].wordorg+=Word0;
		    MesCount++;
		    Word0 = MesStr.charAt(MesCount);
		    MessNew[MesLine].wordorg+=Word0;
		}
		//			    MessKeyWait	= true;
	    }
	    else if(Word0.match(/^p/)){	// 押されたら消す
		MessDelFlag	= false;
	    }
	    else if(Word0.indexOf("P") != -1 || Word0.indexOf("p") != -1){	// 押されたら消す
		MessDelFlag	= true;
	    }
	    else if(Word0.indexOf("N") != -1){	// 改行
		MessDelFlag	= false;
//		MessNew[MesLine].messtr+="\n";
/*
		var tmpcount = parseInt(MesCount)+1;
		var tmpword = MesStr.charAt(tmpcount);
		if(MesCount > 0 && (tmpword == null || tmpword == "")){
		    ;
		}
		else{
		    MesLine++;
		}
*/
		MesLine++;
	    }
	    else if(Word0.indexOf("L") != -1){
		MesCount++;
		Word0 = MesStr.charAt(MesCount);
		MessNew[MesLine].wordorg+=Word0;
		if(Word0.indexOf("C") != -1){
		    MessNew[MesLine].t2	= imgTC;
		}
		else if(Word0.indexOf("R") != -1){
		    MessNew[MesLine].t2	= imgTR;
		}
	    }
	    else if(Word0.indexOf("F") != -1){
		MesCount++;
		Word0 = MesStr.charAt(MesCount);
		MessNew[MesLine].wordorg+=Word0;
		if(Word0.indexOf("S") != -1){
		    isMesFade	= true;
		}
	    }
	    else if(Word0.indexOf("X") != -1){
		var _x = "";
		MesCount++;
		Word0 = MesStr.charAt(MesCount);
		_x += Word0;
		MessNew[MesLine].wordorg+=Word0;
		MesCount++;
		Word0 = MesStr.charAt(MesCount);
		_x += Word0;
		MessNew[MesLine].wordorg+=Word0;
		MesCount++;
		Word0 = MesStr.charAt(MesCount);
		_x += Word0;
		MessNew[MesLine].wordorg+=Word0;
		MessNew[MesLine].biasx	= parseInt(_x);
	    }
	    else if(Word0.indexOf("C") != -1){
		var _c = "";
		MesCount++;
		Word0 = MesStr.charAt(MesCount);
		_c += (parseInt(Word0,16)*16).toString(16);
		MessNew[MesLine].wordorg+=Word0;
		MesCount++;

		Word0 = MesStr.charAt(MesCount);
		_c += (parseInt(Word0,16)*16).toString(16);
		MessNew[MesLine].wordorg+=Word0;
		MesCount++;

		Word0 = MesStr.charAt(MesCount);
		_c += (parseInt(Word0,16)*16).toString(16);
		MessNew[MesLine].wordorg+=Word0;
		MessNew[MesLine].color	= "0x"+_c;
//		console.log("sssssssssssssscolor:"+MessNew[MesLine].color);
		if(MessNew[MesLine].color != 0xffffff){
		    MessColor	= MessNew[MesLine].color;
		}
		MesCount++;
		Word0 = MesStr.charAt(MesCount);
		_c = (parseInt(Word0,16)*16)/255;
		MessNew[MesLine].wordorg+=Word0;
//		console.log("ssssssssssssss:alpha"+_c);
	    }
	    else if(Word0.indexOf("O") != -1){
		MessNew[MesLine].fadeout	= true;
		MesFadeOut	= true;
	    }
	    else if(Word0.indexOf("V") != -1){
		isMesVoice	= true;
	    }
	}
	else{
	    if(parseInt(strlen2(g,_FONT_MIDDLE,MessNew[MesLine].messtr+Word0)) > parseInt(MesWidth)){
		if(Word0.match("。") || Word0.match("？") || Word0.match("、") || Word0.match("」") || Word0.match("）") || Word0.match("！") || Word0.match("』")){
		    ;
                }
		else{
		    MesLine++;
		}
	    }
	    MessNew[MesLine].putstr += Word0;
	    MessNew[MesLine].wordorg += Word0;
	    MessNew[MesLine].messtr += Word0;
	}
	MesCount++;
    }
//    MesLine++;
    for(var i = PutLine; i <= MesLine; i++){
//	console.log("xxxxxx:"+MessNew[i].putstr);
	if(MessNew[i].t2 == imgTC){
	    MessNew[i].x = ScreenWidth/2-strlen2(g,_FONT_MIDDLE,MessNew[i].messtr)/2;
//	    console.log("xxxxxx:ccccccccccccccccccccccccccccccccccccccccccccccccc"+MessNew[i].x);
	}
	else if(MessNew[i].t2 == imgTR){
	    MessNew[i].x = ScreenWidth-20-strlen2(g,_FONT_MIDDLE,MessNew[i].messtr);
	}
	else{
	    MessNew[i].x = 20;
	}
//	MessNew[i].word	= MessNew[i].messtr;
//	console.log(""+MessNew[i].messtr);
//	console.log("x>>>");
    }
//    MesLine++;
}


var	MessMode;
var	MessDelFlag = false;
var	MessKeyWait = false;


var WaitCountData = [0,0,4,8];
var AutoCountData = [0,10,30,50];
function GamemessCtrl(){	// メッセージ中のコントロール
    if(SkipFlag){		// スキップ処理
	MessageSetNew();
	LocalMode	= GAME_loop;
    }
    else {			// 通常処理
    if(--WaitCounter < 0){
    if(--LocalCounter < 0){
	switch(MessMode){
	case	0:	// 1文字ずつだす
	    MainObj.alpha	= 1;
	    if(MessNew[PutLine].putstr == ""){
		AutoCount	= 0;
		if(MesFadeOut){
		    MesFadeOut	= false;
		}
		if(MessDelFlag){
		    MessDelFlag	= false;
		    MessObj.word	= "";
		    MessObj.wordold	= "";			
		    MessageInitNew();
		    break;
		}
		else if(!MessKeyWait){
		    MessageSetNew();
		    MessObj.wordold	= MessObj.word;
		    LocalMode	= GAME_loop;
		    break;
		}
	    }

	    if(DisKeyFlag){
		if(MessageCtrlNew() == -1){
		    HglassObj._visible = true;
		    HglassObj.rot = 0;
		    HglassObj._mode	= 0;
		    MessMode	= 1;
		}
	    }
	    else{
		if(ConfigText0 == 0){	// config0ならいっぺんに出す
		    MessageSetNew();
		    HglassObj._visible = true;
		    HglassObj.rot = 0;
		    HglassObj._mode	= 0;
		    MessMode	= 1;
		    for(var i = 0; i < 3; i++){
			CharaObj[i].mflag	= 0;
		    }
		}
		else if(!AutoFlag && (MainObj.click2(false) || (ScreenMode == 0 && _T()))){	// ボタン押されたら全出ししてキー待ちか次へ
		    MessageSetNew();
		    MessNew[PutLine].mescount = MessNew[PutLine].wordorg.length;
		    if(MessKeyWait){
			HglassObj._visible = true;
			HglassObj.rot = 0;
			HglassObj._mode	= 0;
		    }
		    MessMode	= 1;
		    for(var i = 0; i < 3; i++){
			CharaObj[i].mflag	= 0;
		    }
		}
		else if(MessageCtrlNew() == -1){
		    HglassObj._visible = true;
		    HglassObj.rot = 0;
		    HglassObj._mode	= 0;
		    MessMode	= 1;
		    for(var i = 0; i < 3; i++){
			CharaObj[i].mflag	= 0;
		    }
		}
	    }
	    break;
	case	1:
	    if(!NoMenuFlag && MenuButton[7].click()){	// ゲームメニューへ
		playSE("sysse07");
		LocalUndo	= LocalMode;
		LocalMode	= GAME_menuinit;
	    }
	    else if(SlideUp()){
		logInit();
	    }
	    else if(MesFadeNow && !AutoFlag && (MainObj.click2(false)||(ScreenMode == 0 && _T()))){
		MesFadeNow	= false;
		for(var i = 0; i < MessNewLength; i++){
		    MessNew[i].fade	= false;
		    MessNew[i].alpha	= 1;
		    MessNew[i].haInit(MessNew[i].alpha,1,1,HV_UNIFORM,0);
		}
	    }
	    else if(!voiceWaitFlag && ((MessKeyWait && !AutoFlag && (MainObj.click2(false)||(ScreenMode == 0 && _T()))) ||!MessKeyWait || SkipFlag || (AutoFlag && ++AutoCount > AutoCountData[ConfigText1]))){	// キー待ち
		if(MesFadeOut){
		    MesFadeOut	= false;
		    for(var i = 0; i < MessNewLength; i++){
			MessNew[i].alpha	= 1;
			MessNew[i].haInit(MessNew[i].alpha,0,5,HV_UNIFORM,0);
		    }
		    MessMode	= 2;
		}
		else{
		    AutoCount	= 0;
		    HglassObj._visible = false;
		    if(MessDelFlag){
			MessDelFlag	= false;
			MessObj.word	= "";
			MessObj.wordold	= "";			
			MessageInitNew();
		    }
		    else{
			MessObj.wordold	= MessObj.word;
		    }
		    LocalMode	= GAME_loop;
		}
	    }
	    break;
	case	2:
	    if(MessNew[0].alpha <= 0){
		AutoCount	= 0;
		HglassObj._visible = false;
		MessageInitNew();
		LocalMode	= GAME_loop;
	    }
	    break;
	}
    }
    else{
	MainObj.haValue();
    }
    }
    }

}

//----------------------------------------------------------------------//
//　カレンダー表示
//----------------------------------------------------------------------//
var CalenMode = 0;
var CalenAlpha = 0;
var CalObj0 = new object();
var CalObj1 = new object();
function	CalenderInit(){
    CalenMode	= 0;
    CalenAlpha	= 1;
    CalObj0.init(IMG_effect0,0,0,imgTL);		// IMG_effect0使いまわし
    CalObj0.haInit(0,1,20,HV_UNIFORM,0);
    CalObj0.alpha	= 0;
}
function	CalendarCtrl(){
//    SpritePut(IMG_calen,0,0,imgTL,1);
    CalObj0.put();
//    FillRect(0,0,ScreenWidth,ScreenHeight,FadeObj.color,CalenAlpha);
    if(SkipFlag){
	chgImagen(PNG_bg1,PNG_bg0);
	chgImage(PNG_bg0,ResPng+"bg_black.png");
	LocalMode	= GAME_loop;
	FadeObj._visible	= false;
	MenuButton[7]._visible	= true;
    }
    else{
	switch(CalenMode){
	case	0:
	    CalenAlpha -= 0.2;
	    if(CalenAlpha < 0){
		CalenAlpha	= 0;
		CalenMode	= 1;
		LocalCounter	= 60;

		if(MacroScenario == 0){	// かごめのみ別
		    if(VoiceFlag && RegSound[2] == 1){
			var _data = "pr_012";
			var waittime =  voiceWaitData[_data];
			if(waittime != null){
			    voiceWaitFlag	= true;
			    timerVoiceWait	= setTimeout(voiceWait,waittime);
			    CalenMode	= 4;
			    playVoice(_data);
			}
		    }
		}
	    }
	    break;
	case	4:
	    CalObj0.haValue();
	    if(_T()){
		if(timerVoiceWait != -1){
		    clearTimeout(timerVoiceWait);
		    timerVoiceWait	= -1;
		    voiceWaitFlag	= false;
		}
		CalenMode	= 2;
		CalObj0.haInit(1,0,20,HV_UNIFORM,0);
	    }
	    else if(!voiceWaitFlag){
		CalenMode	= 2;
		CalObj0.haInit(1,0,20,HV_UNIFORM,0);
	    }
	    break;
	case	1:
	    CalObj0.haValue();
	    if(--LocalCounter < 0 || _T()){
		CalenMode	= 2;
		CalObj0.haInit(1,0,20,HV_UNIFORM,0);
	    }
	    break;
	case	2:
	    CalObj0.haValue();
	    if(CalObj0.alpha <= 0){
		chgImagen(PNG_bg1,PNG_bg0);
		chgImage(PNG_bg0,ResPng+"bg_black.png");
		BGObj.alpha	= 0;
		BGObj.haInit(0,1,10,HV_UNIFORM,0);
		CalenMode	= 3;
	    }
	    break;
	case	3:
	    CalenAlpha += 0.1;
	    if(CalenAlpha > 1){
		CalenAlpha	= 1;
		LocalMode	= GAME_loop;
		FadeObj._visible	= false;
		MenuButton[7]._visible	= true;
	    }
	    break;
	}
    }
}
//----------------------------------------------------------------------//
// 選択肢
//----------------------------------------------------------------------//
var	SelectMode;
var	SelectSide;
var	SelectFlag;
var	vi;
var	sely;
function SelectInit(){
    playSE("sysse06");
    SelectMode	= 0;
    SelectSide	= -1;
    LocalCounter	= 10;
    keyInit();
    for(var i = 0; i < SelectObjNum; i++){
	SelectObj[i].init(IMG_sel,ScreenWidth/2+100/2,74+i*75/2,imgCC,0);
	SelectObj[i].hxInit(ScreenWidth/2+100/2,ScreenWidth/2,6,HV_UNIFORM,0);
	SelectObj[i].haInit(0,1,6,HV_UNIFORM,0);
    }
}
function SelectCtrl(){
    sely	= 0;
    selid	= -1;
    for(vi = 0; vi < SelectObjNum; vi++){
	if(SelectObj[vi].reg > 0){
	    SelectObj[vi].y = 74+sely*75/2;
	    SelectObj[vi].hxValue();
	    SelectObj[vi].haValue();
	    selid	= vi;
	    sely++;
	}
    }
    if(sely <= 1){
	SelectSide	= selid;
	SelectMode	= 2;
	LocalCounter	= 0;
	for(vi = 0; vi < 5; vi++){
	    SelectObj[vi]._visible = false;
	}
    }


    switch(SelectMode){
    case	0:
	if(--LocalCounter < 0){
	    SelectMode = 1;
	}
	break;
    case	1:
	SelectFlag	= false;
	if(MenuButton[7].click()){
	    playSE("sysse07");
	    if(SelectMacroNum != -1){
		MacroNum	= SelectMacroNum;
		DDMode		= SelectDDMode;
	    }
	    LocalUndo	= LocalMode;
	    LocalMode	= GAME_menuinit;
	    break;
	}

	for(vi = 0; vi < SelectObjNum; vi++){
	    if(SelectObj[vi].reg > 0 && SelectObj[vi].click()){
		SelectFlag	= true;
		if(SelectSide == vi){
		    MessageInitNew();
		    SelectMode = 2;
		}
		SelectSide	= vi;
		break;
	    }
	}
	if(SelectFlag){
	    if(SelectMode == 2){	// 決定
		playSE("sysse01");
		LocalCounter	= 12;
		for(vi = 0; vi < SelectObjNum; vi++){
		    if(SelectSide == vi){
			addLogList(",,,");
			addLogList("0xffcce5,,"+SelectObj[vi].word+",");
			SelectObj[vi].haInit(SelectObj[vi].alpha,0,4,HV_UNIFORM,4);
		    }
		    else{
			SelectObj[vi].haInit(SelectObj[vi].alpha,0,4,HV_UNIFORM,0);
		    }
		}
	    }
	    else{	// 選択
		playSE("sysse04");
		LocalCounter	= 6;
		SelectMode	= 0;
		for(vi = 0; vi < SelectObjNum; vi++){
		    if(SelectSide == vi){
			SelectObj[vi].hxInit(SelectObj[vi].x,ScreenWidth/2-60/2,3,HV_UNIFORM,0);
			SelectObj[vi].color	= 0xffffff;
		    }
		    else{
			SelectObj[vi].hxInit(SelectObj[vi].x,ScreenWidth/2,3,HV_UNIFORM,0);
			SelectObj[vi].color	= 0xc0c0c0;
		    }
		}
	    }
	}
	break;
    case	2:
	if(--LocalCounter < 0){
//	    console.log("xxxxxxxxxxxxxx:"+ SelectNext[SelectSide]+"  >"+DDMode);
	    DDMode	= MacroID[SelectNext[SelectSide]];	// シナリオデータを進めて
	    MacroNum	= 0;						// そこのMacroNumを０にして
	    LocalMode	= GAME_loop;					// メインループへ戻す
	    MessObj.word	= "";	// シナリオデータ移動なのでメッセージも消す
	    MessObj.wordold	= "";
	    MessageInitNew();
//	    console.log(">> xxxxxxxxxxxxxx:"+ SelectNext[SelectSide]+"  >"+DDMode);
	}
	break;
    }
}

function charaInit(){	// キャラ初期化(無表示)
    for(var i = 0; i < 3; i++){
	CharaObj[i].pat	= -1;
	CharaObj[i].pat2	= -1;
	CharaObj[i].biasx	= 0;
	CharaObj[i].biasy	= 0;
	CharaObj[i].x	= 0;
	CharaObj[i].y	= 0;
	CharaObj[i].scalex	= 480;
	CharaObj[i].scaley	= 360;
    }
    RegData["REG_CHARA0"]	= -1;
    RegData["REG_CHARA1"]	= -1;
    RegData["REG_CHARA2"]	= -1;
}
function charaSet(charaid,charaname,charax,fadetype){	// キャラ出し
//    console.log("charaset:"+charaid+":"+charax+","+fadetype);
    var xflag = false;
    if(CharaObj[charaid].pat == -1){
	xflag	= true;
    }
    CharaObj[charaid].mflag	= 0;
    CharaObj[charaid].eflag	= false;
    if(charaid == 0){
	chgImagen(PNG_chara01,PNG_chara00);	// ぼやっと出すために表表示を裏にコピーして
	chgImage(PNG_chara00,ResPng+chkCharaObj(charaname.toLowerCase())+".png");
	if(chkCharaObjF(charaname.toLowerCase())){
	    // クチパクのためキャラは誰かを保存
	    CharaObj[charaid].eflag	= true;
	    CharaObj[charaid].nameID = getNameID(charaname.toLowerCase());
//	    console.log(".........................."+CharaObj[charaid].nameID);
	    chgImage(PNG_chara00e0,ResPng+charaname.toLowerCase()+"4.png");
	    chgImage(PNG_chara00e1,ResPng+charaname.toLowerCase()+"5.png");
	    chgImage(PNG_chara00m0,ResPng+charaname.toLowerCase()+"2.png");
	    chgImage(PNG_chara00m1,ResPng+charaname.toLowerCase()+"3.png");
	}
	if(CharaObj[charaid].pat != -1){
//	    console.log("..........................0000");
	    CharaObj[charaid].pat2	= IMG_chara01;
	}
	else{
//	    console.log("..........................1111");
	    CharaObj[charaid].pat2	= -1;
	}
	CharaObj[charaid].pat		= IMG_chara00;
	RegData["REG_CHARA0"]	= (charaname.toLowerCase());
	if(!isNaN(parseInt(RegData["REG_CHARA0"]))){
	    CautionFlag	= true;
	}
    }
    else if(charaid == 1){
	chgImagen(PNG_chara11,PNG_chara10);	// ぼやっと出すために表表示を裏にコピーして
	chgImage(PNG_chara10,ResPng+chkCharaObj(charaname.toLowerCase())+".png");
	if(chkCharaObjF(charaname.toLowerCase())){
	    // クチパクのためキャラは誰かを保存
	    CharaObj[charaid].eflag	= true;
	    CharaObj[charaid].nameID = getNameID(charaname.toLowerCase());
//	    console.log(".........................."+CharaObj[charaid].nameID);
	    chgImage(PNG_chara10e0,ResPng+charaname.toLowerCase()+"4.png");
	    chgImage(PNG_chara10e1,ResPng+charaname.toLowerCase()+"5.png");
	    chgImage(PNG_chara10m0,ResPng+charaname.toLowerCase()+"2.png");
	    chgImage(PNG_chara10m1,ResPng+charaname.toLowerCase()+"3.png");
	}
	if(CharaObj[charaid].pat != -1){
	    CharaObj[charaid].pat2	= IMG_chara11;
	}
	else{
	    CharaObj[charaid].pat2	= -1;
	}
	CharaObj[charaid].pat		= IMG_chara10;
	RegData["REG_CHARA1"]	= (charaname.toLowerCase());
	if(!isNaN(parseInt(RegData["REG_CHARA1"]))){
	    CautionFlag	= true;
	}
    }
    else{
	chgImagen(PNG_chara21,PNG_chara20);	// ぼやっと出すために表表示を裏にコピーして
	chgImage(PNG_chara20,ResPng+chkCharaObj(charaname.toLowerCase())+".png");
	if(chkCharaObjF(charaname.toLowerCase())){
	    // クチパクのためキャラは誰かを保存
	    CharaObj[charaid].eflag	= true;
	    CharaObj[charaid].nameID = getNameID(charaname.toLowerCase());
//	    console.log(".........................."+CharaObj[charaid].nameID);
	    chgImage(PNG_chara20e0,ResPng+charaname.toLowerCase()+"4.png");
	    chgImage(PNG_chara20e1,ResPng+charaname.toLowerCase()+"5.png");
	    chgImage(PNG_chara20m0,ResPng+charaname.toLowerCase()+"2.png");
	    chgImage(PNG_chara20m1,ResPng+charaname.toLowerCase()+"3.png");
	}
	if(CharaObj[charaid].pat != -1){
	    CharaObj[charaid].pat2	= IMG_chara21;
	}
	else{
	    CharaObj[charaid].pat2	= -1;
	}
	CharaObj[charaid].pat		= IMG_chara20;
	RegData["REG_CHARA2"]	= (charaname.toLowerCase());
	if(!isNaN(parseInt(RegData["REG_CHARA2"]))){
	    CautionFlag	= true;
	}
    }
//    console.log("fffffffffffffffffffffffffffff:"+CharaObj[charaid].scalex+","+CharaObj[charaid].scaley);
    if(charaname.indexOf("X") >= 0){
	if(CharaObj[charaid].scaley <= 360){
	    CharaObj[charaid].scalex	= 480;
	    CharaObj[charaid].scaley	= 720;
	}
    }
    else {
	if(CharaObj[charaid].scaley > 360){
	    CharaObj[charaid].scalex	= 480;
	    CharaObj[charaid].scaley	= 360;
	}
    }
//    console.log("fffffffffffffffffffffffffffffx:"+CharaObj[charaid].scalex+","+CharaObj[charaid].scaley);
//    CharaObj[charaid].scalex	= 1;		// 表は透明から徐々に出てくる
//    CharaObj[charaid].scaley	= 1;		// 表は透明から徐々に出てくる
    CharaObj[charaid]._visible	= true;
    if(fadetype == "CHR_NOFADE"){
	CharaObj[charaid].alpha	= 1;		// 表は透明から徐々に出てくる
	CharaObj[charaid].alpha = CharaObj[charaid].alphanum;
    }
    else{
	CharaObj[charaid].alpha	= 0;		// 表は透明から徐々に出てくる
	CharaObj[charaid].haInit(0,1,4,HV_UNIFORM,0);
    }

    if(charax == null || charax == ""){
/*
	if(CharaObj[charaid].x == 0){
	    CharaObj[charaid].x	= 240;
	}
*/
	if(xflag){
	    CharaObj[charaid].x	= 240;
	    CharaObj[charaid].y	= 0;
	}
    }
    else if(isNaN(parseInt(charax))){
	CharaObj[charaid].x	= CHR_POSDATA[charax];
    }
    else {
	charax	= (charax*480)/640;
	CharaObj[charaid].x	= charax;//CHR_POSDATA[charax];
	CharaObj[charaid].y	= 0;
    }
    if(SkipFlag){
	CharaObj[charaid].alpha		= CharaObj[charaid].alphanum;
	CharaObj[charaid]._visible	= true;
	CharaObj[charaid].ha.hvstart	= false;
    }
//    CharaScaleSave(charaid);
//    CharaPosSave(charaid);
    delete	_data;
//    console.log("charaset e:id:"+charaid+":x"+CharaObj[charaid].x+",y:"+CharaObj[charaid].y+",a:"+CharaObj[charaid].alpha+",p"+CharaObj[charaid].pat);
}
function charaDel(charaid){	// キャラ消し
    if(CharaObj[charaid].pat != -1){
	if(charaid == 0){
	    chgImagen(PNG_chara01,PNG_chara00);	// ぼやっと出すために表表示を裏にコピーして
	    CharaObj[charaid].pat2	= IMG_chara01;
	}
	else if(charaid == 1){
	    chgImagen(PNG_chara11,PNG_chara10);	// ぼやっと出すために表表示を裏にコピーして
	    CharaObj[charaid].pat2	= IMG_chara11;
	}
	else{
	    chgImagen(PNG_chara21,PNG_chara20);	// ぼやっと出すために表表示を裏にコピーして
	    CharaObj[charaid].pat2	= IMG_chara21;
	}
	CharaObj[charaid].haInit(0,1,4,HV_UNIFORM,0);
	CharaObj[charaid].alpha = 0;
	CharaObj[charaid].mflag	= 0;
	CharaObj[charaid].eflag	= false;
	CharaObj[charaid].pat	= -1;
	LocalMode	= GAME_chara;
    }
    CharaObj[charaid].alphanum	= 1;
    if(SkipFlag){
	CharaObj[charaid].alpha = 1;
	CharaObj[charaid].ha.hvstart	= false;
    }
    if(charaid == 0){
	RegData["REG_CHARA0"]	= -1;
    }
    if(charaid == 1){
	RegData["REG_CHARA1"]	= -1;
    }
    if(charaid == 2){
	RegData["REG_CHARA2"]	= -1;
    }
}
function bgQuakeSet(pos,count){	// 背景振動
//    BGObj.init(IMG_bg0,0,0,imgTL,1);
    BGObj.init(IMG_bg0,BGObj.x,BGObj.y,imgTL,1);
    BGObj.pat2	= IMG_bg1;
    chgImagen(PNG_bg1,PNG_bg0);
    BGObj.htInit(pos,0,count,HV_UNIFORM,0);
    BGObj.biasx = BGObj.tmp;
    BGObj.alpha	= 0.5;

    BGObj.biasx	= 2;
    BGObj.biasy	= 0;
    if(MacroCommand == "QUA2"){
	BGObj.biasx	= 10;
	BGObj.biasy	= 2;
	BGObj.alpha	= 0.5;
    }
    BGObj.x2 = BGObj.x;
    BGObj.y2 = BGObj.y;
    BGObj.basex2 = BGObj.basex;
    BGObj.basey2 = BGObj.basey;
    BGObj.basew2 = BGObj.basew;
    BGObj.baseh2 = BGObj.baseh;

    BGObj._count = count;

    LocalMode	= GAME_qua;
    if(SkipFlag){
	BGObj.alpha	= 1;
	BGObj.biasx = 0;
	BGObj.biasy	= 0;
	LocalMode	= GAME_loop;
    }
}
function chrQuakeSet(charaid,pos,count){	// キャラ振動
    if(CharaObj[charaid].pat != -1){
	if(charaid == 0){
	    chgImagen(PNG_chara01,PNG_chara00);
	    CharaObj[charaid].pat	= IMG_chara00;
	    CharaObj[charaid].pat2	= IMG_chara01;
	}
	else if(charaid == 1){
	    chgImagen(PNG_chara11,PNG_chara10);
	    CharaObj[charaid].pat	= IMG_chara10;
	    CharaObj[charaid].pat2	= IMG_chara11;
	}
	else{
	    chgImagen(PNG_chara21,PNG_chara20);
	    CharaObj[charaid].pat	= IMG_chara20;
	    CharaObj[charaid].pat2	= IMG_chara21;
	}
	CharaObj[charaid].alpha = 0.5;
	CharaObj[charaid].htInit(pos,0,count,HV_UNIFORM,0);
	CharaObj[charaid].biasx = CharaObj[charaid].tmp;
	CharaObj[charaid]._count = count;
	CharaObj[charaid].biasx	= 2;

	LocalMode	= GAME_qua;
	if(SkipFlag){
	    CharaObj[charaid].alpha	= 1;
	    CharaObj[charaid].biasx = 0;
	    LocalMode	= GAME_loop;
	}
    }
}

function fogSnow(obj){
//    obj.putsnow();
    if(RegData["REG_RAIN"] == 2){
	obj.x += 40;
	obj.x %= 480;
    }
    else{
	obj.x -= 40;
	if(obj.x < -480){
	    obj.x	= 0;
	}
    }
}
function fogCtrl(obj){
    switch(obj._mode){
    case	0:
	obj.alpha += 0.01;
	if(obj.alpha > 0.3){
	    obj.alpha	= 0.3;
	    if(Random(10) > 5){
		obj._mode = 1;
	    }
	}
	break;
    case	1:
	obj.alpha -= 0.01;
	if(obj.alpha < 0.1){
	    obj.alpha	= 0.1;
	    if(Random(10) > 5){
		obj._mode = 0;
	    }
	}
	break;
    }
}
function snowSet(_r){
    RegData["REG_RAIN"]	= 1+_r;
    switch(_r){
    case	0:
	EffObj._visible	= false;
	for(var i = 0; i < 50; i++){
	    RainObj[i].x	= (Random(640)-320);
	    RainObj[i].basex	= RainObj[i].x;
	    RainObj[i].biasx	= 240;
	    RainObj[i].biasy	= 300;
//	    RainObj[i].y	= (Random(320)-60)-300;
	    RainObj[i].y	= (Random(400)-80)-300;
	    RainObj[i].r	= (Random(22)+8)/10;
	    RainObj[i].scalex	= RainObj[i].r;
	    RainObj[i].scaley	= RainObj[i].r;
	    RainObj[i].color	= 0xffffff;
	    RainObj[i].alpha	= 0.6;
//	    RainObj[i].count	= Random(20);
	}
	break;
    case	1:
	RainFlag	= true;
	chgImage(PNG_effect0,ResPng+"mask003.png");

	EffObj.pat	= IMG_effect0;
	EffObj._visible	= true;
	EffObj.alpha	= 0.8;
	EffObj._effect	= 2;
	EffObj._mode	= 0;
	EffObj._count	= _count;

	for(var i = 0; i < 50; i++){
	    RainObj[i].biasx	= 0;
	    RainObj[i].x	= (480-Random(640));
	    RainObj[i].y	= 320-Random(480);
	    RainObj[i].basex	= RainObj[i].x;
	    RainObj[i].basey	= RainObj[i].y;
	    RainObj[i].r	= (Random(6)+2)/10;
	    RainObj[i].scalex	= RainObj[i].r;
	    RainObj[i].scaley	= RainObj[i].r;
	    RainObj[i].speedx	= 20;
	    RainObj[i].speedy	= 20;
	    RainObj[i].color	= 0xffffff;
	    RainObj[i].alpha	= Random(4)/10+0.6;
	}
	break;
    case	2:
	RainFlag	= true;
	chgImage(PNG_effect0,ResPng+"mask003.png");

	EffObj.pat	= IMG_effect0;
	EffObj._visible	= true;
	EffObj.alpha	= 0.8;
	EffObj._effect	= 2;
	EffObj._mode	= 0;
	EffObj._count	= _count;

	for(var i = 0; i < 50; i++){
	    RainObj[i].biasx	= 0;
	    RainObj[i].x	= (Random(480)+120);
	    RainObj[i].y	= 320-Random(480);
	    RainObj[i].basex	= RainObj[i].x;
	    RainObj[i].basey	= RainObj[i].y;
	    RainObj[i].r	= (Random(6)+2)/10;
	    RainObj[i].scalex	= RainObj[i].r;
	    RainObj[i].scaley	= RainObj[i].r;
	    RainObj[i].speedx	= -20;
	    RainObj[i].speedy	= 20;
	    RainObj[i].color	= 0xffffff;
	    RainObj[i].alpha	= Random(4)/10+0.6;
	}
	break;
    case	3:
	RainFlag	= true;
	for(var i = 0; i < 50; i++){
	    RainObj[i].biasx	= 0;
	    RainObj[i].x	= (Random(480));
	    RainObj[i].y	= 320-Random(480);
	    RainObj[i].basex	= RainObj[i].x;
	    RainObj[i].basey	= RainObj[i].y;
	    RainObj[i].r	= (Random(3))/10;
	    RainObj[i].scalex	= RainObj[i].r;
	    RainObj[i].scaley	= RainObj[i].r;
	    RainObj[i].speedx	= Random(4)-2;
	    RainObj[i].speedy	= Random(4)+2;
	    RainObj[i].color	= 0xffffff;
	    RainObj[i].alpha	= Random(4)/10+0.6;
	    RainObj[i].count	= Random(10);
	}
	break;
    }
}
function blinkSet(_id){
    RegData["REG_BLINK"]	= _id;
    BlinkFlag	= _id;
    BGObj.mode	= 0;
    BlinkObj.color	= 0x900000;
    BlinkObj.mode	= 0;
    BlinkObj.alpha	= 0;
    BlinkObj._visible	= true;
}
function blinkCtrl(obj){
    switch(obj._mode){
    case	0:
	obj.alpha += 0.04;
	if(obj.alpha > 0.7){
	    obj.alpha	= 0.7;
	    obj._mode = 1;
	}
	break;
    case	1:
	obj.alpha -= 0.04;
	if(obj.alpha < 0.1){
	    obj.alpha	= 0.1;
	    obj._mode = 0;
	}
	break;
    }
}


function fadeCtrlReset(){	// フェードが終わった後の処理
//    console.log("fcccccccccccccc:"+FadeMode);
    FadeObj.ha.hvstart	= false;
    LocalMode	= GAME_loop;
    if(FadeMode == 0){
	FadeAlphaNow	= 1;
	FadeObj.alpha	= FadeAlphaNow;
//	charaInit();
    }
    else{
	FadeAlphaNow	= 0;//FadeAlphaNext;
	FadeObj.alpha	= FadeAlphaNow;
	FadeObj.type	= 0;
	FadeNow	= false;
    }
}
function wipeSet(wiper){	// ワイプフェード
    FadeObj._count	= 10;
    FadeObj._pcount	= 0;
    FadeObj._count	= 10+20;//_data[0]/10+20;
    FadeAlphaNext	= 0;
    FadeObj.alpha	= 1;
    FadeObj._visible	= true;
}

function addLogList(_log){
    if(LogList.length > 100){
	LogList.shift();
    }
    LogList.push(_log);
}


function seWait(){
    seWaitFlag = false;
    timerSEWait	= -1;
}
function voiceWait(){
    voiceWaitFlag = false;
    timerVoiceWait	= -1;
}
function timerWait(){
    timerWaitFlag	= false;
    timerWaitTimer	= -1;
}

function	Command_MOV_PLY(_MacroData){
    var _data = _MacroData.split(",");
    stopBGM();
    stopSE();
    stopVoice();
    playMovie(_data[0].toLowerCase());
    movieTimer	= setInterval(_plugin.ChkMovie,2000);
    ChkMovieFlag    = true;
    keyInit();
	
    MessObj.word	= "";	// シナリオデータ移動なのでメッセージも消す
    MessObj.wordold	= "";
    MessageInitNew();
    LocalMode	= GAME_movie;
    delete	_data;
}

function Command_WIN_OFF(){
    MessageVisible(false);
    MessObj._visible	= false;
    NameObj._visible	= false;
    HglassObj._visible = false;
    if(MainObj.alpha != 0){
	MainObj.haInit(1,0,3,HV_UNIFORM,0);
	NameObj.haInit(1,0,3,HV_UNIFORM,0);
    }
    MessageInitNew();	// <------------------------------------------
    LocalMode	= GAME_win;
    LocalCounter	= 4;
//    EffType	= 0;
    if(SkipFlag){
	RegData["REG_MES_DDMODE"]	= -1;
	MainObj.alpha	= 0;
	MainObj.ha.hvstart	= false;
	LocalMode	= GAME_loop;
    }
}
function Command_CHR_DSP(_id,_MacroData){
    var _data = _MacroData.split(",");
//    console.log("Command_CHR_DSP:"+_data[0]+","+_data[1]+","+_data[2]+","+_data[3]);
    charaSet(_id,_data[0],_data[1],_data[2]);
    if(!SkipFlag){
	LocalMode	= GAME_chara;
    }
    delete	_data;
}

function Command_BG_DSP(_MacroData,_type){
//    console.log("Command_BG_DSP org:"+_MacroData);
    var _data = _MacroData.split(",");
//    console.log("Command_BG_DSP:"+_data[0]+","+_data[1]+","+_data[2]+","+_data[3]+","+_data[4]+","+_data[5]+","+_data[6]);
    chgImagen(PNG_bg1,PNG_bg0);
    if(isNaN(parseInt((_data[0].toLowerCase())))){
	chgImage(PNG_bg0,ResPng+(_data[0].toLowerCase())+".png");
	chkMaskColor(_data[0].toLowerCase());
    }
    else{
	CautionFlag	= true;
    }

    if(_data[1] == null || _data[1] == ""){
	_data[1] = 0;
    }
    if(_data[2] == null || _data[2] == ""){
	_data[2] = 0;
    }
    if(_data[3] == null || _data[3] == ""){
	_data[3] = 0;
    }
    if(_data[4] == null || _data[4] == ""){
	_data[4] = 0;
    }
    if(_data[5] == null || _data[5] == "" || _data[5] == 0){
	_data[5] = 640;
    }
    if(_data[6] == null || _data[6] == "" || _data[6] == 0){
	_data[6] = 448;
    }

    BGObj.x2 = BGObj.x;
    BGObj.y2 = BGObj.y;
    BGObj.basex2	= BGObj.basex;
    BGObj.basey2	= BGObj.basey;
    BGObj.basew2	= BGObj.basew;
    BGObj.baseh2	= BGObj.baseh;
    RegData["REG_BG0"]	= (_data[0].toLowerCase());
    //	RegData["REG_BG0"]	= 0;
    BGObj.x = 0;
    BGObj.y = 0;
    BGObj.biasx = 0;
    BGObj.biasy = 0;

    BGObj.basex	= 0;
    BGObj.basey	= 0;
    BGObj.basew	= 480;
    BGObj.baseh	= 360;
    if(_type == 1){	// PSPBG_DSPEX
	BGObj.basex	= _data[3]*480/640;
	BGObj.basey	= _data[4]*360/448;
	BGObj.basew	= _data[5]*480/640;
	BGObj.baseh	= _data[6]*360/448;

	if(BGObj.basey > 0 && BGObj.baseh >= 360){
	    BGObj.baseh -= BGObj.basey;
	}

    }
    BGObj._visible	= true;
    if(_data[1] == "BG_ALPHA" || _data[1] == null){	// ぼやっと出す nullの場合もたぶんBG_ALPHA
	BGObj.alpha	= 0;
	BGObj.haInit(0,1,5,HV_UNIFORM,0);
    }
    else if(_data[1] == "BG_SLIDE_R"){
	BGObj.alpha	= 1;
	BGObj.pat3	= IMG_bg1;
	BGObj.alpha3	= 1.0;
	BGObj.x3	= 0;
	BGObj.y3	= 0;
	BGObj.speedx	= 60;
	if(SkipFlag){
	    BGObj.pat3	= -1;
	}
    }
    else if(_data[1] == "BG_SLIDE_L"){
	BGObj.alpha	= 1;
	BGObj.pat3	= IMG_bg1;
	BGObj.alpha3	= 1.0;
	BGObj.x3	= 0;
	BGObj.y3	= 0;
	BGObj.speedx	= -60;
	if(SkipFlag){
	    BGObj.pat3	= -1;
	}
    }
    else if(_data[1] == "BG_NOFADE"){
	CharaObj[0]._visible	= false;
	CharaObj[1]._visible	= false;
	CharaObj[2]._visible	= false;
	BGObj.alpha	= 1;
    }
    else {//if(_data[1] == "BG_FADE"){
	BGObj.alpha	= 0;
	BGObj.haInit(0,1,5,HV_UNIFORM,0);
    }
//    console.log("Command_BG_DSP xxx2:"+BGObj.basex+","+BGObj.basey+":"+BGObj.basew+","+BGObj.baseh+","+BGObj.alpha);
    if(_data[0].match(/EV_/)){
	CGFlag[_data[0].toLowerCase()]	= 1;
	saveCGFlag();
    }
    if(MacroScenario == 136){
    }
    else{
	charaDel(0);
	charaDel(1);
	charaDel(2);
    }
    if(SkipFlag){
	BGObj.alpha	= 1;
	BGObj.ha.hvstart	= false;
    }
    delete	_data;
}
function Command_FADE_OUT(_MacroData){
//    console.log("Command_FADE_OUT ...."+_MacroData);
    if(FadeMode == 0){	// 微妙かも？
	return;
    }
    FadeMode	= 0;
    var _data = _MacroData.split(",");

    if(androidtype == 2){	// android 2x は全部黒フェード
	FadeObj.type	= 0;
	FadeObj.outtype	= 0;
	FadeObj._count	= 10;
	FadeObj.color = 0x000000;
	FadeAlphaNow	= 0;
	FadeAlphaNext	= 1;
	FadeObj.haInit(FadeAlphaNow,FadeAlphaNext,FadeObj._count,HV_UNIFORM,0);
	FadeObj._visible	= true;
	if(SkipFlag){
	    FadeObj.alpha	= FadeAlphaNext;
	    FadeObj.ha.hvstart	= false;
	    fadeCtrlReset();
	}
	else{
	    LocalMode	= GAME_fade;
	}
    }
    else if(_data[2] == "FADE_SCREEN"/* || _data[2] == "FADE_SHADE_Y"*/){
	saveImage(PNG_fade);	// 画面全体の保存 
	FadeObj._count	= 1;
	FadeAlphaNext	= 1;
	FadeObj.alpha	= 1;
	FadeObj._visible	= true;
	FadeObj.type	= 4;
	FadeObj.mode	= 0;
	FadeObj.outtype	= 2;
	if(SkipFlag){
	    fadeCtrlReset();
	}
	else{
	    LocalMode	= GAME_fade;
	}
    }
    else if(_data[2] == "FADE_SHADE_ZOOM"){
	saveImage(PNG_fade);	// 画面全体の保存 
	FadeObj._count	= _data[0]/4;
	FadeAlphaNext	= 1;
	FadeObj.alpha	= 1;
	FadeObj._visible	= true;
	FadeObj.type	= 10;
	FadeObj.mode	= 0;
	FadeObj.outtype	= 10;
	FadeObj.hsInit(1,4,FadeObj._count,HV_UNIFORM,0);
	FadeObj.htInit(0,1,FadeObj._count,HV_UNIFORM,0);
	if(_data[1] == "FADE_WHITE"){
	    FadeObj.color = 0xffffff;
	}
	else {
	    FadeObj.color = 0x000000;
	}
	if(SkipFlag){
	    fadeCtrlReset();
	}
	else{
	    LocalMode	= GAME_fade;
	}
    }
    else if(_data[2] == "WIPE_SLIDE_R"){
	if(_data[1] == null || _data[1] == ""){
	    saveImage(PNG_fade);	// 画面全体の保存 
	}
	else{
	    chgImage(PNG_fade,ResPng+"bg_black.png");
	    setFadeAndroid2();
	}
	FadeObj.mode	= 0;
	FadeObj._count	= _data[0]/4;
	FadeAlphaNext	= 1;
	FadeObj.alpha	= 1;
	FadeObj._visible	= true;
	FadeObj.type	= 5;
	FadeObj.outtype	= 5;
	if(SkipFlag){
	    fadeCtrlReset();
	}
	else{
	    LocalMode	= GAME_fade;
	}
    }
    else if(_data[2] == "WIPE_SLIDE_L"){
	if(_data[1] == null || _data[1] == ""){
	    saveImage(PNG_fade);	// 画面全体の保存 
	}
	else{
	    chgImage(PNG_fade,ResPng+"bg_black.png");
	    setFadeAndroid2();
	}
	FadeObj.mode	= 0;
	FadeObj._count	= _data[0]/4;
	FadeAlphaNext	= 1;
	FadeObj.alpha	= 1;
	FadeObj._visible	= true;
	FadeObj.type	= 6;
	FadeObj.outtype	= 6;
	if(SkipFlag){
	    fadeCtrlReset();
	}
	else{
	    LocalMode	= GAME_fade;
	}
    }
    else if(_data[2] == "FADE_SHADE_ROT"){
	saveImage(PNG_fade);	// 画面全体の保存 
	FadeObj._count	= _data[0]/4;
	FadeObj.type	= 11;
	FadeObj.outtype	= 11;
	FadeObj._pcount	= 0;
//	BGObj._visible	= false;
	if(_data[1] == null){
	    ;
	}
	else if(_data[1] == "FADE_BLACK" || _data[1] == "COL_BLACK"){
	    FadeObj.color = 0x000000;
	}
	else {
	    FadeObj.color = 0xffffff;
	}
	FadeAlphaNext	= 1;
	FadeAlphaNow	= 0;
	FadeObj.haInit(FadeAlphaNow,FadeAlphaNext,FadeObj._count,HV_UNIFORM,0);
	FadeObj._visible	= true;
	if(SkipFlag){
	    FadeObj.alpha	= FadeAlphaNext;
	    FadeObj.ha.hvstart	= false;
	    fadeCtrlReset();
	}
	else{
	    LocalMode	= GAME_fade;
	}
    }
    else {//if(_data[2] == null || _data[2] == ""){
	setFadeAndroid2();
	FadeChara[0]._visible	= false;
	FadeChara[1]._visible	= false;
	FadeChara[2]._visible	= false;

	FadeObj._count	= _data[0]/4;
	FadeObj.type	= 0;
	FadeObj.outtype	= 0;
	if(_data[1] == null){
	    ;
	}
	else if(_data[1] == "FADE_BLACK" || _data[1] == "COL_BLACK"){
	    FadeObj.color = 0x000000;
	}
	else if(_data[1] == "COL_DARKRED"){
	    FadeObj.color = 0xc00000;
	}
	else if(_data[1] == "COL_RED"){
	    FadeObj.color = 0xff0000;
	}
	else {
	    FadeObj.color = 0xffffff;
	}
	FadeAlphaNow	= 0;
	FadeAlphaNext	= 1;
	FadeObj.haInit(FadeAlphaNow,FadeAlphaNext,FadeObj._count,HV_UNIFORM,0);
	FadeObj._visible	= true;
	if(SkipFlag){
	    FadeObj.alpha	= FadeAlphaNext;
	    FadeObj.ha.hvstart	= false;
	    fadeCtrlReset();
	}
	else{
	    LocalMode	= GAME_fade;
	}
    }
    if(!SkipFlag){
	FadeNow	= true;
    }
//    console.log("Command_FADE_OUT ...."+_data[0]+","+_data[1]+","+_data[2]+"("+FadeObj.type+","+FadeObj.outtype+","+FadeObj.mode);
    delete	_data;
}
function Command_FADE_IN(_MacroData){
//    console.log("Command_FADE_IN ...."+_MacroData+".....>>"+FadeObj.outtype);
    if(FadeMode == 1){	// 微妙かも？
	return;
    }
    FadeMode	= 1;
    LocalMode	= GAME_fade;
    var _data = _MacroData.split(",");
    {//if(_data[2] == null || _data[2] == ""){
	if(_data[0] == null || _data[0] == ""){
	    _data[0]	= 30;
	}
	FadeObj._count	= _data[0]/4;
	FadeAlphaNext	= 0;
	if(FadeObj.outtype == 2){	// FADE_SCREENのフェード
	    FadeObj._count	= _data[0]/2;
	    FadeObj.type	= 4;
	    FadeObj.alpha	= 1;
	    FadeObj.haInit(1,0,FadeObj._count,HV_UNIFORM,0);
	    if(SkipFlag){
		FadeObj.alpha	= 0;
		FadeObj.ha.hvstart	= false;
		fadeCtrlReset();
	    }
	}
	else if(FadeObj.outtype == 5 || _data[2] == "WIPE_SLIDE_R"){
	    wipeSet(true);
	    FadeObj.type = 5;
	    FadeObj.mode	= 1;
	    if(SkipFlag){
		FadeObj.mode	= 0;
		fadeCtrlReset();
	    }
	}
	else if(FadeObj.outtype == 6 || _data[2] == "WIPE_SLIDE_L"){
	    wipeSet(true);
	    FadeObj.type = 6;
	    FadeObj.mode	= 1;
	    if(SkipFlag){
		FadeObj.mode	= 0;
		fadeCtrlReset();
	    }
	}
	else if(FadeObj.outtype == 10){	// FADE_SHADE_ZOOMのフェード
	    saveImage(PNG_fade);	// 画面全体の保存 
	    FadeObj._count	= _data[0]/2;
	    FadeAlphaNext	= 0;
	    FadeObj.alpha	= 1;
	    FadeObj.type	= 10;
	    FadeObj.mode	= 0;
	    FadeObj.hsInit(4,1,FadeObj._count,HV_UNIFORM,0);
	    FadeObj.htInit(1,0,FadeObj._count,HV_UNIFORM,0);

	    if(SkipFlag){
		FadeObj.alpha	= FadeAlphaNext;
		FadeObj.ha.hvstart	= false;
		FadeObj.tmp	= FadeAlphaNext;
		FadeObj.ht.hvstart	= false;
		fadeCtrlReset();
	    }
	}
	else if(FadeObj.outtype == 11){	// ROT_FADEが分かるまで仮
	    if(_data[1] == null){
		;
	    }
	    else if(_data[1] == "FADE_BLACK" || _data[1] == "COL_BLACK"){
		FadeObj.color = 0x000000;
	    }
	    else {
		FadeObj.color = 0xffffff;
	    }
	    FadeObj.type	= 0;
	    FadeAlphaNow	= 1;
	    FadeAlphaNext	= 0;
	    FadeObj.haInit(FadeAlphaNow,FadeAlphaNext,FadeObj._count,HV_UNIFORM,0);
	    if(SkipFlag){
		FadeObj.alpha	= FadeAlphaNext;
		FadeObj.ha.hvstart	= false;
		fadeCtrlReset();
	    }
	}
	else {
	    if(_data[1] == null){
		;
	    }
	    else if(_data[1] == "FADE_BLACK" || _data[1] == "COL_BLACK"){
		FadeObj.color = 0x000000;
	    }
	    else if(_data[1] == "COL_DARKRED"){
		FadeObj.color = 0xe00000;
	    }
	    else if(_data[1] == "COL_RED"){
		FadeObj.color = 0xff0000;
	    }
	    else {
		FadeObj.color = 0xffffff;
	    }
	    FadeAlphaNow	= 1;
	    FadeAlphaNext	= 0;
	    FadeObj.haInit(FadeAlphaNow,FadeAlphaNext,FadeObj._count,HV_UNIFORM,0);
	    if(SkipFlag){
		FadeObj.alpha	= FadeAlphaNext;
		FadeObj.ha.hvstart	= false;
		fadeCtrlReset();
	    }
	}
	FadeObj._visible	= true;
    }
//    console.log("Command_FADE_IN...."+_data[1]+","+_data[2]+"("+FadeObj.type+","+FadeObj.outtype+","+FadeObj.mode);
    delete	_data;
    //	    _data = null;
}

function	Command_chrPoscAuto(_data0,_data1,_data2,_data3,_data4){
//    console.log("Command_chrPoscAuto"+_data0+","+_data1+","+_data2+","+_data3+","+_data4);
    var charaid = _data0;
    var chx	= (_data1*480/640);
    var chy	= -(_data2*_ORSIZEH/_SCSIZEH);
    var time = _data4;
    CharaObj[charaid].hxInit(CharaObj[charaid].x,chx,time,HV_UNIFORM,0);
    CharaObj[charaid].hyInit(CharaObj[charaid].y,chy,time,HV_UNIFORM,0);
    if(SkipFlag){
	CharaObj[charaid].hx.hvstart	= false;
	CharaObj[charaid].hy.hvstart	= false;
	CharaObj[charaid].x	= chx;
	CharaObj[charaid].y	= chy;
    }
}
function	Command_chrSclcAuto(_data0,_data1,_data2,_data3,_data4,_data5,_data6){
//    console.log("Command_chrSclcAuto"+_data0+","+_data1+","+_data2+","+_data3+","+_data4+","+_data5+","+_data6);
    var charaid = _data0;
    var chscalex	= (((_data1*480)/640));//480;
    var chscaley	= (((_data2*_ORSIZEH)/_SCSIZEH));//_Img[_imgData[CharaObj[charaid].pat]].height;//320;
    var time = _data6;
//    console.log(charaid+","+chscalex+","+chscaley+","+time+" <"+CharaObj[charaid].x+","+CharaObj[charaid].y);
    CharaObj[charaid].hsxInit(CharaObj[charaid].scalex,chscalex,time,HV_UNIFORM,0);
    CharaObj[charaid].hsyInit(CharaObj[charaid].scaley,chscaley,time,HV_UNIFORM,0);
    CharaObj[charaid].svalue	= true;
    if(SkipFlag){
	CharaObj[charaid].hsx.hvstart	= false;
	CharaObj[charaid].hsy.hvstart	= false;
	CharaObj[charaid].scalex	= chscalex;
	CharaObj[charaid].scaley	= chscaley;
    }
}

function	Command_PSPBG_UV_AUTO(_data0,_data1,_data2,_data3,_data4,_data5){
//    console.log("Command_PSPBG_UV_AUTO"+_data0+","+_data1+","+_data2+","+_data3+","+_data4+","+_data5);
    var chx	= (_data0*480/640);
    var chy	= (_data1*360/448);
    var chscalex	= (_data2*480/640);
    var chscaley	= (_data3*360/448);
/*
    if(chy > 0 && chscaley >= 360){
	chscaley -= chy;
    }
*/
    var time = _data5///4;
    BGObj.svalue	= true;
    BGObj.hbxInit(BGObj.basex,chx,time,HV_UNIFORM,0);
    BGObj.hbyInit(BGObj.basey,chy,time,HV_UNIFORM,0);
    BGObj.hbwInit(BGObj.basew,chscalex,time,HV_UNIFORM,0);
    BGObj.hbhInit(BGObj.baseh,chscaley,time,HV_UNIFORM,0);

    if(SkipFlag){
	BGObj.hbx.hvstart	= false;
	BGObj.hby.hvstart	= false;
	BGObj.hbw.hvstart	= false;
	BGObj.hbh.hvstart	= false;
	BGObj.basex	= chx;
	BGObj.basey	= chy;
	BGObj.basew	= chscalex;
	BGObj.baseh	= chscaley;
    }
//    console.log("Command_PSPBG_UV_AUTO"+chx+","+chy+":"+chscalex+","+chscaley);
}

function	Command_EFF_STP(){
    if(MacroCommand == "EFF_STP0"){
	RegData["REG_RAIN"]	= 0;
	RainFlag	= false;
	RegData["REG_BLINK"]	= 0;
	BlinkFlag	= 0;
	BlinkObj._visible	= false;
    }
    BGObj.biasx	= 0;
    BGObj.biasy	= 0;
    CharaObj[0].biasx	= BGObj.biasx;
    CharaObj[0].biasy	= BGObj.biasy
    CharaObj[1].biasx	= BGObj.biasx;
    CharaObj[1].biasy	= BGObj.biasy
    CharaObj[2].biasx	= BGObj.biasx;
    CharaObj[2].biasy	= BGObj.biasy
    EffType	= _ET_non;
    EffObj._visible	= false;
    EffObj._effect	= 0;
}

function getCharaxPos(_id,_data){
    var xflag = false;;
    if(CharaObj[_id].pat == -1){
	xflag = true;
    }
    var x0;
    if(_data == null || _data == ""){
	if(xflag){
	    if(_id == 0){
		x0 = 176;//464;
	    }
	    else {
		x0 = 464;//176;
	    }
	}
    }
    else if(_data.match(/CHR_RIGHT-/)){
	x0 = 464-30;
    }
    else if(_data == "CHR_LEFT"){
	x0 = 176;
    }
    else if(_data == "CHR_RIGHT"){
	x0 = 464;
    }
    else{
	x0 = _data;
    }
    return	x0;
}
function getCharaxPosT(_id,_data){
    var xflag = false;;
    if(CharaObj[_id].pat == -1){
	xflag = true;
    }
    var x0;
    if(_data == null || _data == ""){
	if(xflag){
	    if(_id == 0){
		x0 = 128;//512;
	    }
	    else if(_id == 1){
		x0 = 320;
	    }
	    else {
		x0 = 512;//128;
	    }
	}
    }
    else if(_data == "CHR_LEFT_O"){
	x0 = 128;
    }
    else if(_data == "CHR_RIGHT_O"){
	x0 = 512;
    }
    else if(_data == "CHR_CENTER"){
	x0 = 320;
    }
    else{
	x0 = _data;
    }
    return	x0;
}
function	Command_MES(_MacroData){
/*
	// 最終的にはずす
	if(MacroData[DDMode][MacroNum][2] != -1){
	    meslocal[MacroData[DDMode][MacroNum][2]] = 1;

	    meschk[MacroScenario] = 0;
	    for(var i = 0;i < meslocal.length;i++){
		if(meslocal[i] != 0){
		    meschk[MacroScenario]++;
		}
	    }
	    saveMesLocalData(MacroScenario);
	    saveMesData();
	}
	// 最終的にはずす
*/
    MesFade	= false;
    NameObj._visible	= false;
    NameObj.word	= "";
    var _data = _MacroData.split(",");	// ボイス付きは１個目がvoise２個目がメッセージなので懼??
    var _voiceid = "";
    MessMode	= 0;
    //	MessDelFlag = false;
    MessKeyWait = false;
    if(_data[1] == null || _data[1] == ""){	// メッセージ（台詞ではない）
	delete	MesStr;
	MesStr	= new String(_data[0]);
	stopVoice();
    }
    else{
	_voiceid	= _data[0].toLowerCase();
	if(!SkipFlag){
	    playVoice(_voiceid);
	}
	delete	MesStr;
	MesStr	= (new String(_data[1]).split("//"))[0];	// まれに//がついているメッセージがあるのでとる
	if(!SkipFlag){
	    // クチパク
	    var _nameid = MacroCommand.slice(4,6).toLowerCase();
	    mflagOldNameID	= _nameid;
	    for(var i = 0; i < 3; i++){
		if(CharaObj[i].nameID == _nameid){
//		    console.log("xxxxxxxxxxxxxx>>>:"+MesStr);
		    CharaObj[i].mflag	= MesStr.length*2;
		}
	    }
	}
    }
    NameObj.word	= "";
    if((MacroCommand.indexOf("MES_") != -1 || MesStr.indexOf("機長") != -1 || MesStr.indexOf("ゆに「") != -1 || MesStr.indexOf("男「") != -1 || MesStr.indexOf("女「") != -1 || MesStr.indexOf("黄泉木「") != -1 || MesStr.indexOf("黛「") != -1 || MesStr.indexOf("内海「") != -1 || MesStr.indexOf("穂鳥「") != -1 || MesStr.indexOf("黛「") != -1 || MesStr.indexOf("悟「") != -1 || MesStr.indexOf("こころ「") != -1 || MesStr.indexOf("榎本「") != -1) &&
       (MesStr.indexOf("「") > 0 && !(MesStr.indexOf("『「") > -1))){	// 台詞は名前と台詞を分ける
	_data	= MesStr.split("「")
	NameObj.word	= _data[0];
	NameObj._visible	= true;
	MesStr	= "「"+_data[1];
    }
    MesStr	= MesStr.replace(/-------------------------------------------/g,"--------------------------------------");
    MesStr	= MesStr.replace(/-/g,"−");
//    console.log("MesStr:"+MesStr);
    voiceWaitFlag	= false;
    MessageVisible(true);
    MessObj._visible = true;
    MessObj.t	= imgTL;
    MessObj.alpha	= 1;
    if(ScreenMode == 1){
	MainObj._visible	= true;
    }
    if(SkipFlag){
	if(MainObj.alpha == 0){	// メッセージウィンドウがでてなければ出す
	    MainObj.alpha = 1;
	}
	if(ScreenMode == 1 && MesLine > 2){
	    MesLine = 0;
	    MessageInitNew();
	}
	if(MessDelFlag){
	    MessDelFlag	= false;
	    MessageInitNew();
	}
	MessageCalcNew();
	MessageSetNew();
	MesCount	= 0;
    }
    else{
	isMesFade	= false;
	isMesVoice	= false;
	MessageCalcNew();
	if(isMesVoice){
	    var waittime =  voiceWaitData[_voiceid];
	    if(waittime != null){
		voiceWaitFlag	= true;
		setTimeout(voiceWait,waittime);
	    }
	}
	MesCount	= 0;
	LocalMode	= GAME_mes;
	LocalCounter	= 0;
//	if(isMesFade){
	    keyInit();
//	}
	if(MainObj.alpha == 0){	// メッセージウィンドウがでてなければ出す
	    MainObj.haInit(0,1,3,HV_UNIFORM,0);
	    LocalCounter	= 4;
	}
    }
    addLogList("0xffffff,"+NameObj.word+","+MesStr+","+_voiceid);
    delete	_data;
}

function	Command_SCRMODE(_MacroData){
    if(_MacroData == "SCR_WINDOW"){
	ScreenMode	= 1;
	MainObj._visible	= false;
	NameObj._visible	= false;
	LocalMode	= GAME_win;
	LocalCounter	= 4;
	MessObj.setletter("",40/2,ScreenHeight-71+20/2);
	for(var i = 0; i < MessNewLength; i++){
	    MessNew[i].setletter("",20,ScreenHeight-71+10+19*i);
	}
    }
    else if(_MacroData == "SCR_FULL"){
	ScreenMode	= 0;
	MainObj._visible	= false;
	MainObj.alpha	= 0;
	MessObj.setletter("",40/2,50);
	for(var i = 0; i < MessNewLength; i++){
	    MessNew[i].setletter("",40,70+20*i);
	}
    }
}
function	Command_WAIT(_MacroData){
    LocalMode		= GAME_wait;
    LocalCounter	= _MacroData/6;
}

//----------------------------------------------------------------------//
// マクロコントロール本体
//----------------------------------------------------------------------//
function	MacroCtrl2(){
    if(MacroNum2 >= MacroMax2){
	Macro2Flag	= false;
	return;
    }

    MacroCommand	= MacroData2[MacroNum2][0];
//    console.log(">>>>>>>>>>>>>>>>>22222:"+MacroCommand);
    if(MacroCommand == "CHR_DSP"){	// キャラ表示
	Command_CHR_DSP(0,MacroData2[MacroNum2][1]);
	MacroNum2++;
    }
    else if(MacroCommand == "CHR_DSPW"){	// キャラ表示
	var _data = MacroData2[MacroNum2][1].split(",");
	charaSet(0,_data[0],getCharaxPos(0,_data[2]));
	charaSet(1,_data[1],getCharaxPos(1,_data[3]));
	if(!SkipFlag){
	    LocalMode	= GAME_chara;
	}
	delete	_data;
	MacroNum2++;
    }
    else if(MacroCommand == "FADE_OUT" || MacroCommand =="FADE_OUT_STA"){	// フェードアウト
	Command_FADE_OUT(MacroData2[MacroNum2][1]);
	MacroNum2++;
    }
    else if(MacroCommand == "FADE_IN" || MacroCommand == "FADE_IN_STA"){	// フェードイン
	Command_FADE_IN(MacroData2[MacroNum2][1]);
	MacroNum2++;
    }
    else if(MacroCommand == "BG_DSP"){		// 背景表示
	Command_BG_DSP(MacroData2[MacroNum2][1],0);
	MacroNum2++;
    }
    else if(MacroCommand == "PSPBG_DSPEX"){
	Command_BG_DSP(MacroData2[MacroNum2][1],1);
	MacroNum2++;
    }
    else if(MacroCommand == "PSPBG_UV_AUTO"){
	var _data = MacroData2[MacroNum2][1].split(",");
	Command_PSPBG_UV_AUTO(_data[0],_data[1],_data[2],_data[3],_data[4],_data[5]/4);
	delete	_data;
	MacroNum2++;
    }
    else if(MacroCommand == "MES" || MacroCommand == "MESX" || MacroCommand.indexOf("MES_") != -1){
	Command_MES(MacroData2[MacroNum2][1]);
	MacroNum2++;
    }
    else if(MacroCommand == "WIN_OFF"){
	Command_WIN_OFF();
	MacroNum2++;
    }
    else if(MacroCommand == "TRACE_SPC"){
	MacroNum2++;
    }
    else if(MacroCommand == "WIN_COL"){
	var _data = MacroData2[MacroNum2][1].split(",");
	RegData["REG_WINCOL"]	= _data[0];
	MainObj.pat2	= IMG_main_wind+parseInt(RegData["REG_WINCOL"]);
	NameObj.pat2	= IMG_name_wind+parseInt(RegData["REG_WINCOL"]);
	MainObj._visible	= false;
	NameObj._visible	= false;
	delete	_data;
	MacroNum2++;
    }
    else if(MacroCommand == "MOV_PLY"){
	Command_MOV_PLY(MacroData2[MacroNum2][1]);
	MacroNum2++;
    }
    else if(MacroCommand == "EFF_STP0" || MacroCommand == "EFF_STP1"){
	Command_EFF_STP();
	MacroNum2++;
    }
    else if(MacroCommand == "ADX_STP" || MacroCommand == "BGM_FADE_NORMAL" || MacroCommand == "BGM_FADE_FAST"){
	stopBGM();
	MacroNum2++;
    }
    else if(MacroCommand == "DIS_SKIP"){
	NoSkipFlag	= true;
	MacroNum2++;
    }
    else if(MacroCommand == "ENA_SKIP"){
	NoSkipFlag	= false;
	MacroNum2++;
    }
    else if(MacroCommand == "DIS_KEY"){
	DisKeyFlag = true;
	MacroNum2++;
    }
    else if(MacroCommand == "ENA_KEY"){
	DisKeyFlag = false;
	MacroNum2++;
    }
    else if(MacroCommand == "SCRMODE"){	// 文字表示モード
	Command_SCRMODE(MacroData2[MacroNum2][1]);
	MacroNum2++;
    }
    else if(MacroCommand == "WAIT" || MacroCommand == "WAIT2"){
	Command_WAIT(MacroData2[MacroNum2][1]);
	MacroNum2++;
    }
}
function	MacroCtrl(){
    if(!T()){
//	return;
    }
    if(BGObj.alpha < 1 || BGObj.pat3 >= 0){	// <<<<<<<
	return;
    }
    if(MacroData[DDMode] == null || MacroData[DDMode].length <= MacroNum){
	DDMode++;
	MacroNum	= 0;						// そこのMacroNumを０にして
//	console.log("DDMode >.....................>:"+DDMode);
	LocalMode	= GAME_loop;					// メインループへ戻す
	MessObj.word	= "";	// シナリオデータ移動なのでメッセージも消す
	MessObj.wordold	= "";

	if(MacroScenario != 84){	// ちょっと例外
	    MainObj._visible	= false;
	    NameObj._visible	= false;
	    MessageInitNew();
	}
//	FilterObj.alpha	= 0;
	return;
    }
/*
    if(SkipFlag){
	MessageInitNew();
    }
    if(SkipCancel){
	MessageInitNew();
	SkipCancel	= false;
    }
*/
    MacroCommand	= MacroData[DDMode][MacroNum][0];
//    console.log(">>>>>>>>>>>>>>>>>:"+MacroCommand);
    if(MacroCommand == "EOS"){	// ゲーム終了
//	_dialog.set("system save","セーブしますか？","はい","いいえ")
	LocalMode = GAME_eos;
    }
    else if(MacroCommand == "TITLE_SET"){
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	TitleObj.settitle(TTLTB[MacroData[DDMode][MacroNum][1]].split(",")[1]);
	RegData["REG_ROUTE"] = TTLTB[MacroData[DDMode][MacroNum][1]].split(",")[0];
	RegData["REG_TITLE"] = TTLTB[MacroData[DDMode][MacroNum][1]].split(",")[1];
	MacroNum++;
//	_data = null;
	delete	_data;
    }
    else if(MacroCommand == "TITLE_DSP"){
//	console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr"+MacroScenario+","+DDMode);
	addLogList(",,,");
	addLogList("0x20e020,,"+TitleObj.word+",");
	addLogList(",,,");
	TitleObj._visible	= true;
	MacroNum++;
//	if(!(MacroScenario == 0 && DDMode == 0)){
	    saveRegOrg(0);
	    saveSystem();
	    QSaveObj._count	= 20;
	    playSE("sysse09");
//	}
    }
    else if(MacroCommand == "TIME_CLR"){
	MacroNum++;
    }
    else if(MacroCommand == "TIME_SET"){
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	if(_data[0] == "LR_HOU"){
	    TimeObj.settime(RegData[_data[0]],RegData[_data[1]]);
	}
	else{
	    TimeObj.settime(_data[0],_data[1]);
	}
	MacroNum++;
	delete	_data;
//	_data = null;
    }
    else if(MacroCommand == "TIME_DSP" || MacroCommand == "PSPTIME_DSP"){
	var _data = MacroData[DDMode][MacroNum][1];
	if(_data == null || _data == "" || _data == "undefined"){
	    ;
	}
	else{
	    _data = MacroData[DDMode][MacroNum][1].split(",");
	    TimeObj.settime(_data[0],_data[1]);
	}
	TimeObj._mode	= 0;

	if(TimeObj.timeword[0] == "" || TimeObj.timeword[0] == null){
	    TimeObj._visible	= false;
	}
	else{
	    TimeObj._visible	= true;
	}

	MacroNum++;
    }
    else if(MacroCommand == "DATE_CLR"){
	MacroNum++;
    }
    else if(MacroCommand == "DATE_SET"){
	MacroNum++;
    }
    else if(MacroCommand == "SCRMODE"){	// 文字表示モード
	Command_SCRMODE(MacroData[DDMode][MacroNum][1]);
	MacroNum++;
    }
    else if(MacroCommand == "FADE_OUT" || MacroCommand =="FADE_OUT_STA"){	// フェードアウト
	Command_FADE_OUT(MacroData[DDMode][MacroNum][1]);
	MacroNum++;
//	_data = null;
    }
    else if(MacroCommand == "FADE_IN" || MacroCommand == "FADE_IN_STA"){	// フェードイン
	Command_FADE_IN(MacroData[DDMode][MacroNum][1]);
	MacroNum++;
    }
    else if(MacroCommand == "FADE_IN_WAT"){
	MacroNum++;
    }
    else if(MacroCommand == "FADE_OUT_WAT"){
	MacroNum++;
    }
    else if(MacroCommand == "FILT_IN"){
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	RegData["REG_FILTER"]	= 1;
	if(_data[0] == "FILT_COL"){
	    RegData["REG_FILTER"]	= 2;
	    FilterObj.pat	= -1;
	    var _rgb	= "";
	    var _r	= (parseInt(_data[2])*16).toString(16);
	    var _g	= (parseInt(_data[3])*16).toString(16);
	    var _b	= (parseInt(_data[4])*16).toString(16);
	    if(_r.length == 1){
		_r = "0"+_r;
	    }
	    if(_g.length == 1){
		_g = "0"+_g;
	    }
	    if(_b.length == 1){
		_b = "0"+_b;
	    }
	    FilterObj.color = "0x"+_r+_g+_b;
	    FilterObj.alphamax	= _data[5]/16;
//	    console.log("FFFFFFFFFFFFFFFFFFFFFFFFF:"+FilterObj.color);
	}
	else if(_data[0] == "FILT_MONO"){
	    RegData["REG_FILTER"]	= 3;
	    chgImage(PNG_filter,ResPng+"mask102.png");
	    FilterObj.pat	= IMG_filter;
	    FilterObj.alphamax	= 1;
	}
	else if(_data[0] == "FILT_DARK"){	// 半透明黒
	    RegData["REG_FILTER"]	= 4;
	    chgImage(PNG_filter,ResPng+"mask101.png");
	    FilterObj.pat	= IMG_filter;
	    FilterObj.alphamax	= 1;
	}
	else if(_data[0] == "FILT_KAISOU"){
	    RegData["REG_FILTER"]	= 5;
	    chgImage(PNG_filter,ResPng+"mask103.png");
	    FilterObj.pat	= IMG_filter;
	    FilterObj.alphamax	= 1;
	}
	else{
	    RegData["REG_FILTER"]	= 6;
	    chgImage(PNG_filter,ResPng+"mask012_b.png");
	    FilterObj.pat	= IMG_filter;
	    FilterObj.alphamax	= 1;
	}
	RegData["REG_FILTCOLOR"]	= FilterObj.color;
	RegData["REG_FILTALPHA"]	= FilterObj.alphamax;

	FilterObj.haInit(FilterObj.alpha,FilterObj.alphamax,8,HV_UNIFORM,0);
	FilterObj._visible	= true;
	if(SkipFlag){
	    FilterObj.alpha	= FilterObj.alphamax;
	    FilterObj.ha.hvstart	= false;
	}
	else{
//	    LocalMode	= GAME_filt;
	}
	MacroNum++;
    }
    else if(MacroCommand == "FILT_OUT"){
	RegData["REG_FILTER"]	= 0;
//	chgImage(PNG_filter,ResPng+"mask012_b.png");
	FilterObj._visible	= true;
	FilterObj.haInit(1,0,8,HV_UNIFORM,0);
	if(SkipFlag){
	    FilterObj.alpha	= 0;
	    FilterObj.ha.hvstart	= false;
	}
	else{
//	    LocalMode	= GAME_filt;
	}
	MacroNum++;
    }
    else if(MacroCommand == "PSPCHR_SCLC_AUTO"){
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	Command_chrSclcAuto(_data[0],_data[1],_data[2],_data[3],_data[4],_data[5],_data[6]/4);
	MacroNum++;
	if(SkipFlag){	// co1_04用
	    if(MacroScenario == 76 && DDMode == 7){
		RegData["LR_M00"]	= 4;	// co1_04用waitを早める
	    }
	    else if(MacroScenario == 76 && DDMode == 8){
		RegData["LR_M00"]	= 19;	// co1_04用waitを早める
	    }
	    else{
		RegData["LR_M00"]	= 24;	// co1_04用waitを早める
	    }
	}
	delete	_data;
    }
    else if(MacroCommand == "PSPCHR_POSC_AUTO"){
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	Command_chrPoscAuto(_data[0],_data[1],_data[2],_data[3],_data[4]/4);
	MacroNum++;
	delete	_data;
    }
    else if(MacroCommand == "PSPCHR_POS0"){
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	var charaid = 0;
	CharaObj[charaid].hx.hvstart	= false;
	CharaObj[charaid].hy.hvstart	= false;
	CharaObj[charaid].x	= (_data[0]*480/640);
	CharaObj[charaid].y	= -(_data[1]*_ORSIZEH/_SCSIZEH);
//	CharaPosSave(charaid);
	MacroNum++;
	delete	_data;
    }
    else if(MacroCommand == "PSPCHR_POS1"){
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	var charaid = 1;
	CharaObj[charaid].hx.hvstart	= false;
	CharaObj[charaid].hy.hvstart	= false;
	CharaObj[charaid].x	= (_data[0]*480/640);
	CharaObj[charaid].y	= -(_data[1]*_ORSIZEH/_SCSIZEH);
//	CharaPosSave(charaid);
	MacroNum++;
	delete	_data;
    }
    else if(MacroCommand == "PSPCHR_POS2"){
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	var charaid = 2;
	CharaObj[charaid].hx.hvstart	= false;
	CharaObj[charaid].hy.hvstart	= false;
	CharaObj[charaid].x	= (_data[0]*480/640);
	CharaObj[charaid].y	= -(_data[1]*_ORSIZEH/_SCSIZEH);
//	CharaPosSave(charaid);
	MacroNum++;
	delete	_data;
    }
    else if(MacroCommand == "PSPCHR0_UV_SET"){
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	RegData["LR_M06"]	= _data[0];
	if(_data[1] == null || _data[1] == ""){
	    RegData["LR_M10"]	= 0;
	}
	else{
	    RegData["LR_M10"]	= _data[1];
	}
	RegData["LF_M00"]	= 1;
	MacroNum++;
	delete	_data;
    }
    else if(MacroCommand == "PSPCHR1_UV_SET"){
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	RegData["LR_M07"]	= _data[0];
	if(_data[1] == null || _data[1] == ""){
	    RegData["LR_M11"]	= 0;
	}
	else{
	    RegData["LR_M11"]	= _data[1];
	}
	RegData["LF_M01"]	= 1;
	MacroNum++;
	delete	_data;
    }
    else if(MacroCommand == "PSPCHR2_UV_SET"){
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	RegData["LR_M08"]	= _data[0];
	if(_data[1] == null || _data[1] == ""){
	    RegData["LR_M12"]	= 0;
	}
	else{
	    RegData["LR_M12"]	= _data[1];
	}
	RegData["LF_M02"]	= 1;
	MacroNum++;
	delete	_data;
    }
    else if(MacroCommand == "PSPCHR0_UV_SCL"){
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	RegData["LR_M09"]	= _data[0];
	RegData["LR_M13"]	= _data[1];
	RegData["LF_M04"]	= 1;
	MacroNum++;
	delete	_data;
    }
    else if(MacroCommand == "PSPCHR1_UV_SCL"){
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	RegData["LR_M18"]	= _data[0];
	RegData["LR_M19"]	= _data[1];
	RegData["LF_M05"]	= 1;
	MacroNum++;
	delete	_data;
    }
    else if(MacroCommand == "PSPCHR2_UV_SCL"){
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	RegData["LR_M20"]	= _data[0];
	RegData["LR_M21"]	= _data[1];
	RegData["LF_M06"]	= 1;
	MacroNum++;
	delete	_data;
    }
    else if(MacroCommand == "BG_UV_SAVE"){
	MacroNum++;
    }
    else if(MacroCommand == "CHR_SCLC_SAVE"){
	MacroNum++;
    }
    else if(MacroCommand == "CHR_POSC_SAVE"){
	MacroNum++;
    }
    else if(MacroCommand == "PSPCHR_DSP" || MacroCommand == "PSPCHR_DSP0"){	// キャラ表示
	Command_CHR_DSP(0,MacroData[DDMode][MacroNum][1]);
	MacroNum++;
    }
    else if(MacroCommand == "PSPCHR_DSP1"){	// キャラ表示
	Command_CHR_DSP(1,MacroData[DDMode][MacroNum][1]);
	MacroNum++;
    }
    else if(MacroCommand == "PSPCHR_DSP2"){	// キャラ表示
	Command_CHR_DSP(2,MacroData[DDMode][MacroNum][1]);
	MacroNum++;
    }
    else if(MacroCommand == "PSPCHR_DSPW" || MacroCommand == "PSPCHR_DSPW01"){
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	charaSet(0,_data[0],getCharaxPos(0,_data[2]));
	charaSet(1,_data[1],getCharaxPos(1,_data[3]));
	if(!SkipFlag){
	    LocalMode	= GAME_chara;
	}
	MacroNum++;
	delete	_data;
    }
    else if(MacroCommand == "PSPCHR_DSPW10"){
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	charaSet(1,_data[0],getCharaxPos(1,_data[2]));
	charaSet(0,_data[1],getCharaxPos(0,_data[3]));
	if(!SkipFlag){
	    LocalMode	= GAME_chara;
	}
	MacroNum++;
	delete	_data;
    }
    else if(MacroCommand == "PSPCHR_DSPW12"){
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	charaSet(1,_data[0],getCharaxPos(1,_data[2]));
	charaSet(2,_data[1],getCharaxPos(2,_data[3]));
	if(!SkipFlag){
	    LocalMode	= GAME_chara;
	}
	MacroNum++;
	delete	_data;
    }
    else if(MacroCommand == "PSPCHR_DSPT" || MacroCommand == "PSPCHR_DSPT021"){
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	charaSet(0,_data[0],getCharaxPosT(0,_data[3]));
	charaSet(1,_data[1],getCharaxPosT(1,_data[4]));
	charaSet(2,_data[2],getCharaxPosT(2,_data[5]));
	if(!SkipFlag){
	    LocalMode	= GAME_chara;
	}
	MacroNum++;
	delete	_data;
    }
    else if(MacroCommand == "CHR_COL"){
	MacroNum++;
    }
    else if(MacroCommand == "CHR_COL0"){
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	if(_data[0] == "CH_BLACK"){
	}
	else{
//	    CharaObj[0].alphanum	= 0.4;
	}
	MacroNum++;
    }
    else if(MacroCommand == "CHR_ERS" || MacroCommand == "CHR_ERS0"){	// キャラ消し
	charaDel(0);
	MacroNum++;
    }
    else if(MacroCommand == "CHR_ERS1"){	// キャラ消し
	charaDel(1);
	MacroNum++;
    }
    else if(MacroCommand == "CHR_ERS2"){	// キャラ消し
	charaDel(2);
	MacroNum++;
    }
    else if(MacroCommand == "CHR_ERSW01" || MacroCommand == "CHR_ERSW"){
	charaDel(0);
	charaDel(1);
	MacroNum++;
    }
    else if(MacroCommand == "CHR_ERSW12"){
	charaDel(1);
	charaDel(2);
	MacroNum++;
    }
    else if(MacroCommand == "CHR_ERSW02"){
	charaDel(0);
	charaDel(2);
	MacroNum++;
    }
    else if(MacroCommand == "CHR_ERSA" || MacroCommand == "CHR_ERST"){
	charaDel(0);
	charaDel(1);
	charaDel(2);
	MacroNum++;
    }
    else if(MacroCommand == "CHR_PRI"){
	MacroNum++;
    }
    else if(MacroCommand == "BG_DSP"){		// 背景表示
	Command_BG_DSP(MacroData[DDMode][MacroNum][1],0);
	MacroNum++;
    }
    else if(MacroCommand == "PSPBG_DSPEX" || MacroCommand == "BG_DSPEX"){
	Command_BG_DSP(MacroData[DDMode][MacroNum][1],1);
	MacroNum++;
    }
    else if(MacroCommand == "PSPBG_UV_AUTO"){
	var _data = MacroData[DDMode][MacroNum][1].split(",");

	Command_PSPBG_UV_AUTO(_data[0],_data[1],_data[2],_data[3],_data[4],_data[5]/4);
	if(SkipFlag){	// co1_04用
	    if(MacroScenario == 76 && DDMode == 7){
		RegData["LR_M00"]	= 4;	// co1_04用waitを早める
	    }
	    else if(MacroScenario == 76 && DDMode == 8){
		RegData["LR_M00"]	= 19;	// co1_04用waitを早める
	    }
	    else{
		RegData["LR_M00"]	= 24;	// co1_04用waitを早める
	    }
	}


	MacroNum++;
	delete	_data;
    }
    else if(MacroCommand == "BG_UV_INIT"){
//	BG_UV_INIT	MACRO	MAX_FRA,Z_SIZE,WIN_SW
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	RegData["LR_M04"]	= 1;
	if(_data[2] != null && _data[2] == 0){
	    Command_WIN_OFF();
	}
	if(_data[1] != null){
	    RegData["LR_M04"]	= _data[1];
	}
	RegData["LR_M00"]	= parseInt(_data[0]/4);
	RegData["LR_M01"]	= 0;
	RegData["LR_M15"]	= 0;
	RegData["LF_M00"]	= 0;
	RegData["LF_M01"]	= 0;
	RegData["LF_M02"]	= 0;
	RegData["LR_M14"]	= 0;
	RegData["LF_M04"]	= 0;
	RegData["LF_M05"]	= 0;
	RegData["LF_M06"]	= 0;
	MacroNum++;
	delete	_data;
    }
    else if(MacroCommand == "PSPBG_UV_SET"){
//	PSPBG_UV_SET	MACRO	U0,V0,U1,V1 macro01.inc
//	PSPBG_UV_SET:0;
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	RegData["LR_M02"]	=  _data[0];//(_data[0]*480/640);
	RegData["LR_M03"]	=  0;
	RegData["LR_M04"]	=  640;
	RegData["LR_M05"]	=  448;
	if(!(_data[1] == null || _data[1] == "")){
	    RegData["LR_M03"]	= _data[1];//(_data[1]*360/480);
	}
	if(!(_data[2] == null || _data[2] == "")){
	    RegData["LR_M04"]	= _data[2];//(_data[2]*480/640);
	}
	if(!(_data[3] == null || _data[3] == "")){
	    RegData["LR_M05"]	= _data[3];//(_data[3]*360/480);
	}
	RegData["LR_M15"]	=  1;
//	console.log(RegData["LR_M02"]+","+RegData["LR_M03"]+","+RegData["LR_M04"]+","+RegData["LR_M05"]);
	MacroNum++;
	delete	_data;
    }
    else if(MacroCommand == "BG_UV_GO"){
	RegData["LR_M01"]	= parseInt(RegData["LR_M01"])+1;
	if(RegData["LR_M15"] == 1){
	    Command_PSPBG_UV_AUTO(RegData["LR_M02"],RegData["LR_M03"],RegData["LR_M04"],RegData["LR_M05"],0,RegData["LR_M00"]);
	    if(SkipFlag){
		RegData["LR_M00"]	= 0;
		BGObj.alpha		= 1;
		BGObj.ha.hvstart	= false;
	    }
	}
	if(RegData["LF_M04"] == 1){
	    Command_chrSclcAuto(0,RegData["LR_M09"],RegData["LR_M13"],0,0,RegData["LR_M01"],RegData["LR_M00"]);
	}
	if(RegData["LF_M05"] == 1){
	    Command_chrSclcAuto(1,RegData["LR_M18"],RegData["LR_M19"],0,0,RegData["LR_M01"],RegData["LR_M00"]);
	}
	if(RegData["LF_M06"] == 1){
	    Command_chrSclcAuto(2,RegData["LR_M20"],RegData["LR_M21"],0,0,RegData["LR_M01"],RegData["LR_M00"]);
	}
	if(RegData["LF_M00"] == 1){
	    Command_chrPoscAuto(0,RegData["LR_M06"],RegData["LR_M10"],RegData["LR_M01"],RegData["LR_M00"]);
	}
	if(RegData["LF_M01"] == 1){
	    Command_chrPoscAuto(1,RegData["LR_M07"],RegData["LR_M11"],RegData["LR_M01"],RegData["LR_M00"]);
	}
	if(RegData["LF_M02"] == 1){
	    Command_chrPoscAuto(2,RegData["LR_M08"],RegData["LR_M12"],RegData["LR_M01"],RegData["LR_M00"]);
	}

	if(!SkipFlag){
	    LocalMode	= GAME_uvctrl;
	}
	MacroNum++;
    }
    else if(MacroCommand == "BG_UV_FADE"){
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	RegData["LF_M03"]	= 0;
	RegData["LR_M16"]	= 0;
	RegData["LR_M17"]	= 0;
	RegData["LR_M14"]	= _data[0];//TIM_S;
	RegData["LF_M03"]	= _data[1];//FAD_T;
	RegData["LR_M16"]	= _data[2];//TIM_E;
	if(!(_data[3] == null || _data[3] == "")){
	    RegData["LR_M17"]	= _data[3];//COL;
	}
	FadeObj._count	= parseInt(_data[2])/4;
	FadeObj.type	= 0;
	FadeObj.outtype	= 0;
	if(_data[3] == "FADE_BLACK" || _data[3] == "COL_BLACK"){
	    FadeObj.color = 0x000000;
	}
	else {
	    FadeObj.color = 0xffffff;
	}
	FadeMode	= 0;
	FadeAlphaNow	= 0;
	FadeAlphaNext	= 1;
	FadeObj.haInit(FadeAlphaNow,FadeAlphaNext,FadeObj._count,HV_UNIFORM,0);
	FadeObj._visible	= true;
	UVFadeFlag	= true;

	if(SkipFlag){
	    UVFadeFlag	= false;
	    FadeObj.alpha	= FadeAlphaNext;
	    FadeAlphaNow	= FadeAlphaNext;
	    FadeObj.ha.hvstart	= false;
	    fadeCtrlReset();	// ------------
	}
	MacroNum++;
    }
    else if(MacroCommand == "FLASH"){
	FlashCount	= 4;
	MacroNum++;
    }
    else if(MacroCommand == "EFF_SNOWSTORM_R3" || MacroCommand == "EFF_SNOWSTORM_R2" || MacroCommand == "EFF_SNOWSTORM_R1" || MacroCommand == "EFF_SNOWSTORM_R0"){
	snowSet(1);
	MacroNum++;
    }
    else if(MacroCommand == "EFF_SNOWSTORM_L3" || MacroCommand == "EFF_SNOWSTORM_L2" || MacroCommand == "EFF_SNOWSTORM_STA0"){
	snowSet(2);
	MacroNum++;
    }
    else if(MacroCommand == "EFF_SNOW_S_STA"){
	snowSet(3);
	MacroNum++;
    }
    else if(MacroCommand == "EFF_BLINK1_STA0"){
	blinkSet(1);
	MacroNum++;
    }
    else if(MacroCommand == "EFF_STEAM_STA"){
	chgImage(PNG_effect0,ResPng+"mask000.png");
	EffObj.init(IMG_effect0,0,0,imgTL,0);
	EffObj._visible	= true;
	EffObj._effect	= 1;
	EffObj.alpha	= 0.8;
	MacroNum++;
    }
    else if(MacroCommand == "EFF_STEAM_STP"){
	EffObj._visible	= false;
	EffObj._effect	= 0;
	MacroNum++;
    }
    else if(MacroCommand == "EFF_STP0" || MacroCommand == "EFF_STP1"){
	Command_EFF_STP();
	MacroNum++;
    }
    else if(MacroCommand == "EFF_PAR"){
	MacroNum++;
    }
    else if(MacroCommand == "EFF_HEADLIGHT_STA"){
	chgImage(PNG_effect0,ResPng+"mask042.png");
	LightFlag	= true;
	LightObj[0].init(IMG_effect0,400,140,imgTL,1);
	LightObj[0].hsInit(20,100,12,HV_ACCELETATE,0);
	LightObj[0].hxInit(400,360,12,HV_ACCELETATE,0);
	LightObj[1].init(IMG_effect0,440,140,imgTL,1);
	LightObj[1].hsInit(20,100,12,HV_ACCELETATE,0);
	MacroNum++;
    }
    else if(MacroCommand == "EFF_HEADLIGHT_STP"){
	LightFlag	= false;
	MacroNum++;
    }
    else if(MacroCommand == "QUA0"){
	QueType	= MacroCommand;
	bgQuakeSet(40/2,4);
	MacroNum++;
    }
    else if(MacroCommand == "QUA1"){
	QueType	= MacroCommand;
	bgQuakeSet(80/2,8);
	MacroNum++;
    }
    else if(MacroCommand == "QUA2"){
	QueType	= MacroCommand;
	bgQuakeSet(120/2,16);
	MacroNum++;
    }
    else if(MacroCommand == "QUA0_CHR0" || MacroCommand == "QUA1_CHR0" || MacroCommand == "QUA2_CHR0"){
	QueType	= MacroCommand;
	chrQuakeSet(0,40/2,4);
	MacroNum++;
    }
    else if(MacroCommand == "QUA1_CHR1"){
	QueType	= MacroCommand;
	chrQuakeSet(1,40/2,4);
	MacroNum++;
    }
    else if(MacroCommand == "QUA0_ALL" || MacroCommand == "QUA1_ALL"){
	QueType	= MacroCommand;
	bgQuakeSet(40/2,4);
	chrQuakeSet(0,40/2,4);
	chrQuakeSet(1,40/2,4);
	chrQuakeSet(2,40/2,4);
	MacroNum++;
    }
    else if(MacroCommand == "QUA2_ALL"){
	QueType	= MacroCommand;
	bgQuakeSet(120/2,16);
	chrQuakeSet(0,120/2,16);
	MacroNum++;
    }
    else if(MacroCommand == "EFF_QUA_STA0"){
	EffType	= _ET_quake;
	MacroNum++;
    }
    else if(MacroCommand == "EFF_QUA_PAR0"){
	EffType	= _ET_quake2;
	MacroNum++;
    }
    else if(MacroCommand == "EFF_QUA_STA1"){
	EffType	= _ET_quake;
	MacroNum++;
    }
    else if(MacroCommand == "CALENDER" || MacroCommand == "CALEN_DSP"){
	MainObj._visible	= false;
	NameObj._visible	= false;
	MessageInitNew();
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	if(_data[0] == "CAL_COCORO"){
	    chgImage(PNG_bg0,ResPng+"cal_a00.png");
//	    chgImage(PNG_calen,ResPng+"cal_a00.png");
	    chgImage(PNG_effect0,ResPng+"cal_a0"+_data[1]+".png");
	}
	else{
//	    chgImage(PNG_calen,ResPng+"cal_b00.png");
	    chgImage(PNG_bg0,ResPng+"cal_b00.png");
	    chgImage(PNG_effect0,ResPng+"cal_b0"+_data[1]+".png");
	}
//	chgImagen(PNG_bg1,PNG_bg0);
	chgImage(PNG_bg1,ResPng+"bg_black.png");
	chgImage(PNG_bg0,ResPng+"bg_black.png");
	BGObj.alpha	= 0;
	BGObj.haInit(0,1,10,HV_UNIFORM,0);
	BGObj.x = 0;
	BGObj.y = 0;
	BGObj.biasx = 0;
	BGObj.biasy = 0;
	BGObj.basex	= 0;
	BGObj.basey	= 0;
	BGObj.basew	= 480;
	BGObj.baseh	= 360;

	if(!SkipFlag){
	    keyInit();
	}
	CalenderInit();
	LocalMode	= GAME_cal;
	MenuButton[7]._visible	= false;
	MacroNum++;
	delete	_data;
//	_data = null;
    }
    else if(MacroCommand == "MOV_PLY"){
	Command_MOV_PLY(MacroData[DDMode][MacroNum][1]);
	MacroNum++;
//	_data = null;
    }
    else if(MacroCommand == "ADX_STA"){	// soundplay
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	playBGM(_data[0].toLowerCase());
	MacroNum++;
	delete	_data;
//	_data = null;
    }
    else if(MacroCommand == "ADX_VOL" || MacroCommand == "ADX_VOL_STA" || MacroCommand == "ADX_VOL_WAT"){
	MacroNum++;
    }
    else if(MacroCommand == "ADX_STP" || MacroCommand == "BGM_FADE_NORMAL" || MacroCommand == "BGM_FADE_FAST"){
	stopBGM();
	MacroNum++;
    }
    else if(MacroCommand == "VO_PLY"){
	if(!SkipFlag){
	    if(VoiceFlag && RegSound[2] == 1){
		var _data = MacroData[DDMode][MacroNum][1].split(",");
		var waittime =  voiceWaitData[_data[0].toLowerCase()];
		if(waittime != null){
		    LocalMode	= GAME_voicewait;
		    voiceWaitFlag	= true;
		    setTimeout(voiceWait,waittime);
		}
		playVoice(_data[0].toLowerCase());
		delete	_data;
	    }
	}	
	MacroNum++;
    }
    else if(MacroCommand == "VO_STA"){
	if(!SkipFlag){
	    var _data = MacroData[DDMode][MacroNum][1].split(",");
	    playVoice(_data[0].toLowerCase());
	    playVoiceNo = _data[0].toLowerCase();
	    delete	_data;
	}	
	MacroNum++;
    }
    else if(MacroCommand == "VO_WAT"){
	if(!SkipFlag){
	    LocalMode	= GAME_voicewait;
	    voiceWaitFlag	= true;
	    var waittime =  voiceWaitData[playSENo];
	    //	console.log("ssssssssssssssssss++++"+playSENo+"+"+waittime);
	    if(waittime == null){
		waittime	= 1000;
	    }
	    setTimeout(voiceWait,waittime);
	    LocalCounter	= 20;
	}
	MacroNum++;
    }
    else if(MacroCommand == "SE_STA" || MacroCommand == "SE_STA0" || MacroCommand == "SE_STA1"  || MacroCommand == "SE_STA2"){
	if(!SkipFlag){
	    // seplay
	    var _data = MacroData[DDMode][MacroNum][1].split(",");
	    playSE(_data[0].toLowerCase());
	    playSENo = _data[0].toLowerCase();
	    delete	_data;

	    seWaitFlag	= true;
	    var waittime =  seWaitData[playSENo];
	    if(waittime != null){
		timerSEWait	= setTimeout(seWait,waittime);
	    }


//	    _data = null;
	}
	MacroNum++;
    }
    else if(MacroCommand == "SE_STP" || MacroCommand == "SE_STP0" || MacroCommand == "SE_STP1" || MacroCommand == "SE_STP2"){
	stopSE();
	MacroNum++;
    }
    else if(MacroCommand == "SE_WAT" || MacroCommand == "SE_WAT0" || MacroCommand == "SE_WAT1" ||  MacroCommand == "SE_WAT2"){
	if(!SkipFlag){
	    if(timerSEWait != -1){
		LocalMode	= GAME_sewait;
	    }
/*
	    seWaitFlag	= true;
	    var waittime =  seWaitData[playSENo];
	    console.log("ssssssssssssssssssssssssssssssssssssssssssssssssseEEEEEEEEEEEE++++"+playSENo+"+"+waittime);
	    if(waittime == null){
		waittime	= 1000;
	    }
	    setTimeout(seWait,waittime);
*/
	    LocalCounter	= 20;
	}
	else{
	    if(timerSEWait != -1){
		clearTimeout(timerSEWait);
		timerSEWait	= -1;
		seWaitFlag	= false;
	    }
	}
	MacroNum++;
    }
    else if(MacroCommand == "SE_VOL_STA" || MacroCommand == "SE_VOL_STA0" || MacroCommand == "SE_VOL_STA1" || MacroCommand == "SE_VOL_STA2"){// SEのボリュームを[1]フレームかけて[0]にする。
//	stopSE();
	MacroNum++;
    }
    else if(MacroCommand == "SE_VOL" || MacroCommand == "SE_VOL0" || MacroCommand == "SE_VOL1"){
	MacroNum++;
    }
    else if(MacroCommand == "SE_VOL_WAT0" || MacroCommand == "SE_VOL_WAT1"){	// SEのボリュームを[1]フレームかけて[0]にする。
	MacroNum++;
    }
    else if(MacroCommand == "VIB_S_L1" || MacroCommand == "VIB_S_S1" || MacroCommand == "VIB_S_S0" || MacroCommand == "VIB_S_L3" || MacroCommand == "VIB_S_L2" || MacroCommand == "VIB_S_L0" || MacroCommand == "VIB_S_C2" || MacroCommand == "VIB_S_C1" || MacroCommand == "VIB_S_C0" || MacroCommand == "VIB_STP"){	// バイブレート
	MacroNum++;
    }
    else if(MacroCommand == "MES" || MacroCommand == "MESX" || MacroCommand.indexOf("MES_") != -1){
	Command_MES(MacroData[DDMode][MacroNum][1]);
	SelectMacroNum	= -1;
	if(MacroCommand == "MES" || MacroCommand.indexOf("MES_") != -1){
	    SelectMessNum	= MacroNum;
	    SelectDDMode	= DDMode;
	}
	MacroNum++;
    }
    else if(MacroCommand == "WIN_OFF"){
//	charaDel(0);
	Command_WIN_OFF();
	MacroNum++;
    }
    else if(MacroCommand == "WAIT" || MacroCommand == "WAIT2"){
	Command_WAIT(MacroData[DDMode][MacroNum][1]);
	MacroNum++;
    }
    else if(MacroCommand == "GOTO"){
//	console.log("===========:"+MacroData[DDMode][MacroNum][1]);
	DDMode	= MacroID[MacroData[DDMode][MacroNum][1]];
	MacroNum	= 0;
	MacroCommand = 0;
	FadeAlphaNow	= 0;
    }
    else if(MacroCommand == "EXT_GOTO"){
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	MacroNext	= _data[0];//MacroData[DDMode][MacroNum][1];
	JumpNum	= 0;
	if(!(_data[1] == null || _data[1] == "")){
	    JumpNum	= _data[1];
	}
	if(!(_data[2] == null || _data[2] == "")){
	    JumpNum	= _data[2];
	}
/*
	if(MacroNext == "L1D4N" && JumpNum != 0){
	    JumpNum	= 14; //DD 1 は KURUMI_LOST で jsonno でいうと 14;
	}
	else if(MacroNext == "HL2D6_2" && JumpNum != 0){
	    JumpNum	= 55;
	}
	else if(MacroNext == "C_IL2D1B_4" && JumpNum != 0){
	    JumpNum	= 5;
	}
	else if(MacroNext == "C_IL2D3_3" && JumpNum != 0){
	    JumpNum	= 1;
	}
	else if(MacroNext == "KL2D6_3,1" && JumpNum != 0){
	    JumpNum	= 1;
	}
	else if(MacroNext == "OP" && JumpNum != 0){
	    JumpNum	= 1;
	}
*/
//	console.log(".................:"+MacroNext);
	LocalMode	= GAME_next;
	delete	_data;
//	_data = null;
    }
    else if(MacroCommand == "DIS_SKIP"){
	NoSkipFlag	= true;
	MacroNum++;
    }
    else if(MacroCommand == "ENA_SKIP"){
	NoSkipFlag	= false;
	MacroNum++;
    }
    else if(MacroCommand == "DIS_KEY"){
	DisKeyFlag = true;
	MacroNum++;
    }
    else if(MacroCommand == "ENA_KEY"){
	DisKeyFlag = false;
	MacroNum++;
    }
    else if(MacroCommand == "DIS_EYE"){	// めぱち禁止
	DisEyeFlag = true;
	MacroNum++;
    }
    else if(MacroCommand == "ENA_EYE"){
	DisEyeFlag = false;
	MacroNum++;
    }
    else if(MacroCommand == "DIS_BREATH"){
	MacroNum++;
    }
    else if(MacroCommand == "ENA_BREATH"){
	MacroNum++;
    }
    else if(MacroCommand == "DIS_MENU"){	// メニュー禁止
	MenuButton[7]._visible	= false;
	NoMenuFlag	= true;
	MacroNum++;
    }
    else if(MacroCommand == "ENA_MENU"){
	MenuButton[7]._visible	= true;
	NoMenuFlag	= false;
	MacroNum++;
    }
    else if(MacroCommand == "TIMER_REST"){	// ps2_cmd
	OldTimer = 0;
	MacroNum++;
    }
    else if(MacroCommand == "TIMER_WAT2"){
	var _data = MacroData[DDMode][MacroNum][1].split(",");
//	console.log("TIMER_WAT2............"+_data[0]+","+_data[1]+","+_data[2]);
	var waittime = (parseInt(_data[0])*60*1000+parseInt(_data[1])*1000+parseInt(_data[2]));
//	console.log("TIMER_WAT2............"+waittime+","+OldTimer);
	if(!SkipFlag){
	    timerWaitTimer	= setTimeout(timerWait,waittime-OldTimer);
	    timerWaitFlag	= true;
	    LocalMode	= GAME_timerwait;
	}

	OldTimer	= waittime;
	delete	_data;

	MacroNum++;
    }
    else if(MacroCommand == "SELECT"){
/*
	// 最終的にはずす
	if(MacroData[DDMode][MacroNum][3] != -1){
	    sellocal[MacroData[DDMode][MacroNum][3]] = 1;

	    selchk[MacroScenario] = 0;
	    for(var i = 0;i < sellocal.length;i++){
		if(sellocal[i] != 0){
		    selchk[MacroScenario]++;
		}
	    }
	    saveMesLocalData(MacroScenario);
	    saveMesData();
	}
	// 最終的にはずす
*/
	SelectSwicth	= true;
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	SelectMacroNum	= SelectMessNum;//MacroNum;
	RegType	= _data[0];
	SelectObjNum = _data[1];

	saveRegOrg(0);	// クイックセーブ
	saveSystem();
	QSaveObj._count	= 20;

	MacroNum++;
	for(var i = 0; i < SelectObjNum; i++){
	    var _seldata = MacroData[DDMode][MacroNum][1].split(",");
	    SelectObj[i].init(IMG_sel,ScreenWidth/2+100/2,74+i*75/2,imgCC,0);
	    SelectObj[i].hxInit(ScreenWidth/2+100/2,ScreenWidth/2,6,HV_UNIFORM,0);
	    SelectObj[i].haInit(0,1,6,HV_UNIFORM,0);
	    SelectObj[i].pat2 = IMG_sel_waku+parseInt(RegData["REG_WINCOL"]);
	    SelectObj[i].word = _seldata[0];//(MacroData[DDMode][MacroNum][1].split(","))[0];
	    if(_seldata[1] == "" || _seldata[1] == null){
		SelectObj[i].reg = 1;
	    }
	    else{
		SelectObj[i].reg = RegData[_seldata[1]];//(MacroData[DDMode][MacroNum][1].split(","))[1]];
	    }
	    SelectObj[i]._visible = true;
	    SelectObj[i].color	= 0xc0c0c0;
	    MacroNum++;
	    delete	_seldata;
//	    _seldata = null;
	}
	delete	_data;
//	_data = null;
    }
    else if(MacroCommand == "SWITCH"){
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	RegType	= _data[0];
	SelectObjNum = _data[1];
	MacroNum++;
	for(var i = 0; i < SelectObjNum; i++){
	    var _seldata = MacroData[DDMode][MacroNum][1].split(",");
//	    console.log(">>>...."+_seldata[0]+":"+_seldata[1]);
	    SelectNext[_seldata[0]] = _seldata[1];
	    MacroNum++;
	    delete	_seldata;
//	    _seldata = null;
	}
//	console.log(">>>sssssssssssssssssssssssssss...."+RegType+" >" +RegData[RegType]);
	if(SelectSwicth){
	    SkipFlag	= false;
	    SelectSwicth	= false;
	    SelectInit();
	    LocalMode	= GAME_select;
	}
	else{
	    if(RegData[RegType] >= SelectObjNum){	// switchより数字が大きいことがある　> 次にGOTOがくるので飛ばす
		MacroNum	++;						// そこのMacroNumを０にして
		LocalMode	= GAME_loop;					// メインループへ戻す
	    }
	    else{
//		console.log(">>>"+RegData[RegType]);
		DDMode	= MacroID[SelectNext[parseInt(RegData[RegType])]];	// シナリオデータを進めて
//		console.log(">>>"+DDMode);
		MacroNum	= 0;						// そこのMacroNumを０にして
		LocalMode	= GAME_loop;					// メインループへ戻す
		MessObj.word	= "";	// シナリオデータ移動なのでメッセージも消す
		MessObj.wordold	= "";
		MessageInitNew();
	    }
	}
	delete	_data;
//	_data = null;
    }
    else if(MacroCommand == "RADD"){
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	if(!_data[1].match(/\D/ig)){
	    RegData[_data[0]]	= parseInt(RegData[_data[0]])+parseInt(_data[1]);
	}
	else{
	    RegData[_data[0]]	= parseInt(RegData[_data[0]])+parseInt(RegData[_data[1]]);
	}
//	console.log("-----------------------------------------------"+_data[0]+","+_data[1]+" >"+RegData[_data[0]]);
	MacroNum++;
	delete	_data;
//	_data = null;
    }
    else if(MacroCommand == "RSUB"){
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	if(!_data[1].match(/\D/ig)){
	    RegData[_data[0]]	= parseInt(RegData[_data[0]])-parseInt(_data[1]);
	}
	else{
	    RegData[_data[0]]	= parseInt(RegData[_data[0]])-parseInt(RegData[_data[1]]);
	}
//	console.log("-----------------------------------------------"+_data[0]+","+_data[1]+" >"+RegData[_data[0]]);
	MacroNum++;
	delete	_data;
//	_data = null;
    }
    else if(MacroCommand == "RMUL"){
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	if(!_data[1].match(/\D/ig)){
	    RegData[_data[0]]	= parseInt(RegData[_data[0]])*parseInt(_data[1]);
	}
	else{
	    RegData[_data[0]]	= parseInt(RegData[_data[0]])*parseInt(RegData[_data[1]]);
	}
//	console.log("-----------------------------------------------"+_data[0]+","+_data[1]+" >"+RegData[_data[0]]);
	MacroNum++;
	delete	_data;
//	_data = null;
    }
    else if(MacroCommand == "RDIV"){
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	if(!_data[1].match(/\D/ig)){
	    RegData[_data[0]]	= parseInt(RegData[_data[0]])/parseInt(_data[1]);
	}
	else {
	    RegData[_data[0]]	= parseInt(RegData[_data[0]])/parseInt(RegData[_data[1]]);
	}
//	console.log("-----------------------------------------------"+_data[0]+","+_data[1]+" >"+RegData[_data[0]]);
	MacroNum++;
	delete	_data;
//	_data = null;
    }
    else if(MacroCommand == "RRND"){
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	RegData[_data[0]]	= Random(_data[1]);
//	console.log("-----------------------------------------------"+_data[0]+","+_data[1]+" >"+RegData[_data[0]]);
	MacroNum++;
	delete	_data;
//	_data = null;
    }
    else if(MacroCommand == "RSET"){
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	if(!_data[1].match(/\D/ig)){
	    RegData[_data[0]]	= _data[1];
	}
	else{
	    RegData[_data[0]]	= parseInt(RegData[_data[1]]);
	}
//	console.log("-----------------------------------------------"+_data[0]+","+_data[1]+" >"+RegData[_data[0]]);
	MacroNum++;
	delete	_data;
//	_data = null;
    }
    else if(MacroCommand == "SET_SAVE" || MacroCommand == "SET_SAVPNT"){
	SaveLock	= true;
	SaveDDMode	= DDMode;
	SaveMacroNum	= MacroNum;
	MacroNum++;
    }
    else if(MacroCommand == "CLR_SAVE" || MacroCommand == "CLR_SAVPNT"){
	MessageInitNew();
	SaveLock	= false;
	MacroNum++;
    }
    else if(MacroCommand == "IF_ZERO"){
	HglassObj._visible = false;
	RegData["REG_MES_DDMODE"]	= -1;
	MainObj.alpha	= 0;
	NameObj._visible	= false;
	MessageVisible(false);
	MessObj._visible	= false;
	var _data = MacroData[DDMode][MacroNum][1].split(",");
//	console.log("-----------------------------------------------"+_data[0]+","+_data[1]+" >"+RegData[_data[0]]+"== 0");
	MacroNum++;
	if(parseInt(RegData[_data[0]]) == 0){
//	    console.log("......."+_data[1]);
	    DDMode	= MacroID[_data[1]];
	    MacroNum	= 0;
	    MacroCommand = 0;
	}
	delete	_data;
//	_data = null;
    }
    else if(MacroCommand == "IF_EQ"){
	HglassObj._visible = false;
	RegData["REG_MES_DDMODE"]	= -1;
//	MainObj.alpha	= 0;
//	NameObj._visible	= false;
//	MessageVisible(false);
//	MessObj._visible	= false;

	var _data = MacroData[DDMode][MacroNum][1].split(",");
//	console.log("-----------------------------------------------"+_data[0]+","+_data[1]+" >"+RegData[_data[0]]+"=="+_data[1]);
	MacroNum++;
	if(parseInt(RegData[_data[0]]) == parseInt(_data[1])){
//	    console.log("......."+_data[2]);
	    DDMode	= MacroID[_data[2]];
	    MacroNum	= 0;
	    MacroCommand = 0;
	}
	delete	_data;
//	_data = null;
    }
    else if(MacroCommand == "IF_NOT"){
	HglassObj._visible = false;
	RegData["REG_MES_DDMODE"]	= -1;
	MainObj.alpha	= 0;
	NameObj._visible	= false;
	MessageVisible(false);
	MessObj._visible	= false;
	var _data = MacroData[DDMode][MacroNum][1].split(",");
//	console.log("-----------------------------------------------"+_data[0]+","+_data[1]+" >"+RegData[_data[0]]+"!="+_data[1]);
	MacroNum++;
	if(parseInt(RegData[_data[0]]) != parseInt(_data[1])){
//	    console.log("......."+_data[2]);
	    DDMode	= MacroID[_data[2]];
	    MacroNum	= 0;
	    MacroCommand = 0;
	}
	delete	_data;
//	_data = null;
    }
    else if(MacroCommand == "IF_NOTZERO"){
	var _data = MacroData[DDMode][MacroNum][1].split(",");
//	console.log("-----------------------------------------------"+_data[0]+","+_data[1]+" >"+RegData[_data[0]]+"!= 0");
	MacroNum++;
	if(parseInt(RegData[_data[0]]) != 0){
//	    console.log("......."+_data[1]);
	    DDMode	= MacroID[_data[1]];
	    MacroNum	= 0;
	    MacroCommand = 0;
	}
	delete	_data;
//	_data = null;
    }
    else if(MacroCommand == "IF_SMALL"){
	var _data = MacroData[DDMode][MacroNum][1].split(",");
//	console.log("-----------------------------------------------"+_data[0]+","+_data[1]+" >"+RegData[_data[0]]+"<"+_data[1]);
	MacroNum++;
	if(parseInt(RegData[_data[0]]) < parseInt(_data[1])){
//	    console.log("......."+_data[2]);
	    DDMode	= MacroID[_data[2]];
	    MacroNum	= 0;
	    MacroCommand = 0;
	}
	delete	_data;
//	_data = null;
    }
    else if(MacroCommand == "IF_LARGE"){
	var _data = MacroData[DDMode][MacroNum][1].split(",");
//	console.log("-----------------------------------------------"+_data[0]+","+_data[1]+":"+RegData[_data[0]]+" >"+_data[1]);
	MacroNum++;
	if(parseInt(RegData[_data[0]]) > parseInt(_data[1])){
//	    console.log("......."+_data[2]);
	    DDMode	= MacroID[_data[2]];
	    MacroNum	= 0;
	    MacroCommand = 0;
	}
	delete	_data;
//	_data = null;
    }
    else if(MacroCommand == "IF_LARGE_EQ"){
	var _data = MacroData[DDMode][MacroNum][1].split(",");
//	console.log("-----------------------------------------------"+_data[0]+","+_data[1]+":"+RegData[_data[0]]+" >="+_data[1]);
	MacroNum++;
	if(parseInt(RegData[_data[0]]) >= parseInt(_data[1])){
//	    console.log("......."+_data[2]);
	    DDMode	= MacroID[_data[2]];
	    MacroNum	= 0;
	    MacroCommand = 0;
	}
	delete	_data;
//	_data = null;
    }
    else if(MacroCommand == "MOV_FLG"){
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	MovieFlag[_data[0].toLowerCase()]	= 1;
	saveMovieFlag();
	MacroNum++;
	delete	_data;
    }
    else if(MacroCommand == "BGM_FLG"){
	// ＢＧＭの演奏済みフラグ設定 ps2_cmd.mac
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	BgmFlag[_data[0].toLowerCase()]	= 1;
	saveBgmFlag();
	MacroNum++;
	delete	_data;
//	_data = null;
    }
    else if(MacroCommand == "BG_FLG"){
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	CGFlag[_data[0].toLowerCase()]	= 1;
	saveCGFlag();
	MacroNum++;
	delete	_data;
//	_data = null;
    }
    else if(MacroCommand == "TIPS_FLG"){	// L1D1AB_3.json
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	TipsFlag[parseInt(_data[0])]	= 1;
	saveTipsFlag();
	MacroNum++;
	delete	_data;
//	_data = null;
    }
    else if(MacroCommand == "CALL"){
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	CallReturn	= DDMode;
	MacroNumReturn	= MacroNum;
	DDMode	= MacroID[_data[0]];
	MacroNum	= 0;
	MacroCommand = 0;
	delete	_data;
//	_data = null;
    }
    else if(MacroCommand == "RET"){
	DDMode	= CallReturn;
	MacroNum	= MacroNumReturn;
	MacroNum++;
	MacroCommand = 0;
    }
    else if(MacroCommand == "SYS_WIND"){
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	chgImage(PNG_filter,ResPng+"window.png");
	EffObj.init(IMG_filter,ScreenWidth/2,ScreenHeight/2,imgCC,0);
	EffObj._visible	= true;
	EffObj.word	= _data[0];
	EffObj._effect	= 7;
	EffObj.color	= 0xffffff;
	EffObj.alpha	= 1.0;
	LocalMode	= GAME_syswin;
	MacroNum++;
	delete	_data;
//	_data = null;
    }
    else if(MacroCommand == "POINT"){	// 新規追加マクロ
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	if(PointFlag[_data[0]] == 0){
	    PointFlag[_data[0]] = 1;
	    PointData = parseInt(PointData)+parseInt(_data[1]);
	    savePointFlag();
//	    _dialog.set("ポイント追加",_data[1]+"ポイントが追加されました。","OK","");
            if(devicetype == 1){
              _dialog.set("実績解放",TweetStr[PointOpen[_data[0]]]+"を解放しました","OK","");
            }
            else{
		_dialog.set("ポイント追加",TweetStr[PointOpen[_data[0]]]+"を解放しました","OK","");
	    }
            AutoTweet(PointOpen[_data[0]]);
	}
	MacroNum++;
	delete	_data;
//	_data = null;
    }
    else if(MacroCommand == "POINTC"){	// 新規追加マクロ POINTC ココロバッドエンドチェック
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	if(PointFlag[6] == 0){	// 6がココロバッドエンドフラグ
	    PointFlag[parseInt(_data[0])] = 1;
	    var _point = 0;
	    for(var i = 17;i <= 36;i++){
		if(PointFlag[i] == 1){
		    _point++;  
		}
	    }
	    if(_point >= 5){
		PointFlag[6]	= 1;
		PointData = parseInt(PointData)+parseInt(_data[1]);
		//	    _dialog.set("ポイント追加",_data[1]+"ポイントが追加されました。","OK","");
                if(devicetype == 1){
                    _dialog.set("実績解放",TweetStr[PointOpen[6]]+"を解放しました","OK","");
                }
                else{
		    _dialog.set("ポイント追加",TweetStr[PointOpen[6]]+"を解放しました","OK","");
		}
		AutoTweet(PointOpen[6]);
	    }
	    savePointFlag();
	}
	MacroNum++;
	delete	_data;
//	_data = null;
    }
    else if(MacroCommand == "POINTS"){	// 新規追加マクロ POINTS 悟バッドエンドチェック
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	if(PointFlag[15] == 0){	// 15がココロバッドエンドフラグ
	    PointFlag[parseInt(_data[0])] = 1;
	    var _point = 0;
	    for(var i = 37;i <= 49;i++){
		if(PointFlag[i] == 1){
		    _point++;  
		}
	    }
	    if(_point >= 5){
		PointFlag[15]	= 1;
		PointData = parseInt(PointData)+parseInt(_data[1]);
		//	    _dialog.set("ポイント追加",_data[1]+"ポイントが追加されました。","OK","");
                if(devicetype == 1){
                    _dialog.set("実績解放",TweetStr[PointOpen[15]]+"を解放しました","OK","");
                }
                else{
		    _dialog.set("ポイント追加",TweetStr[PointOpen[15]]+"を解放しました","OK","");
		}
		AutoTweet(PointOpen[15]);
	    }
	    savePointFlag();
	}
	MacroNum++;
	delete	_data;
    }
    else if(MacroCommand == "COCORO_DOWN"){
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	if(_data[0] == null || _data[0] == ""){
	    RegData["LR_COCORO"]--;
	}
	else{
	    RegData["LR_COCORO"]-=parseInt(_data[0]);
	}
	if(RegData["LR_COCORO"] <= 0){
	    RegData["LR_COCORO"]	= 0;
	}
	MacroNum++;
	delete	_data;
    }
    else if(MacroCommand == "COCORO_UP"){
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	if(_data[0] == null || _data[0] == ""){
	    RegData["LR_COCORO"]++;
	}
	else{
	    RegData["LR_COCORO"]+=parseInt(_data[0]);
	}
	MacroNum++;
	delete	_data;
    }
    else if(MacroCommand == "LIN_DOWN"){
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	if(_data[0] == null || _data[0] == ""){
	    RegData["LR_LIN"]--;
	}
	else{
	    RegData["LR_LIN"]-=parseInt(_data[0]);
	}
	if(RegData["LR_LIN"] <= 0){
	    RegData["LR_LIN"]	= 0;
	}
	MacroNum++;
	delete	_data;
    }
    else if(MacroCommand == "LIN_UP"){
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	if(_data[0] == null || _data[0] == ""){
	    RegData["LR_LIN"]++;
	}
	else{
	    RegData["LR_LIN"]+=parseInt(_data[0]);
	}
	MacroNum++;
	delete	_data;
    }
    else if(MacroCommand == "SATORU_EP"){
	RegData["LR_SATORU_EP"] ++;
	MacroNum++;
    }
    else if(MacroCommand == "R11_INIT"){
	RegData["LR_COCORO"]	= 10;
	RegData["LR_LIN"]	= 10;
	if(RegData["LR_CHAPTER"] == 0){
	    RegData["LF_SATORU_NAYAMU"]	= RegData["SR_SATORU_NAYAMU"];
	    RegData["LF_SATORU_COFFEE"]	= RegData["SR_SATORU_COFFEE"];
	    RegData["LF_SATORU_COCORO_LIVE"]	= RegData["SR_SATORU_COCORO_LIVE"];
	    RegData["LF_SATORU_GURUGURU"]	= RegData["SR_SATORU_GURUGURU"];
	    RegData["LF_BAD_SATORU_BAD"]	= RegData["SR_BAD_SATORU_BAD"];
	    RegData["LF_BAD_SATORU_MIZU"]	= RegData["SR_BAD_SATORU_MIZU"];
	    RegData["LF_BAD_SATORU_YUBI"]	= RegData["SR_BAD_SATORU_YUBI"];
	    RegData["LF_BAD_SATORU_ROLLBAD"]	= RegData["SR_BAD_SATORU_ROLLBAD"];
	    RegData["LR_END_SATORU_EP"]	= RegData["SR_END_SATORU_EP"];
	}
	else {
	    RegData["LR_LIN"]	= RegData["SR_LIN"];
	    RegData["LR_COCORO_ILLUST"]	= RegData["SR_COCORO_ILLUST"];
	    RegData["LF_COCORO_MAGURO"]	= RegData["SR_COCORO_MAGURO"];
	    RegData["LF_COCORO_HUTAGO"]	= RegData["SR_COCORO_HUTAGO"];
	    RegData["LF_COCORO_KANRI_COCORO"]	= RegData["SR_COCORO_KANRI_COCORO"];
	    RegData["LF_BAD_COCORO_SUIMINYAKU"]	= RegData["SR_BAD_COCORO_SUIMINYAKU"];
	    RegData["LF_BAD_COCORO_SYOKUJI"]	= RegData["SR_BAD_COCORO_SYOKUJI"];
	    RegData["LF_BAD_COCORO_ENOMOTO"]	= RegData["SR_BAD_COCORO_ENOMOTO"];
	    RegData["LF_BAD_COCORO_SPHIA"]	= RegData["SR_BAD_COCORO_SPHIA"];
	    RegData["LF_BAD_COCORO_LIN_1"]	= RegData["SR_BAD_COCORO_LIN_1"];
	    RegData["LF_BAD_COCORO_YOMOGI"]	= RegData["SR_BAD_COCORO_YOMOGI"];
	    RegData["LF_BAD_COCORO_LIN_2"]	= RegData["SR_BAD_COCORO_LIN_2"];
	    RegData["LF_BAD_COCORO_LIN_3"]	= RegData["SR_BAD_COCORO_LIN_3"];
	    RegData["LF_BAD_COCORO_AKEKURA"]	= RegData["SR_BAD_COCORO_AKEKURA"];
	    RegData["LF_BAD_COCORO_TOUSI_COCORO"]	= RegData["SR_BAD_COCORO_TOUSI_COCORO"];
	    RegData["LF_BAD_COCORO_UNI"]	= RegData["SR_BAD_COCORO_UNI"];
	    RegData["LF_BAD_COCORO_7A"]	= RegData["SR_BAD_COCORO_7A"];
	    RegData["LF_BAD_COCORO_7B"]	= RegData["SR_BAD_COCORO_7B"];
	}
	MacroNum++;
    }
    else if(MacroCommand == "WIN_COL"){
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	RegData["REG_WINCOL"]	= _data[0];
	MainObj.pat2	= IMG_main_wind+parseInt(RegData["REG_WINCOL"]);
	NameObj.pat2	= IMG_name_wind+parseInt(RegData["REG_WINCOL"]);
	delete	_data;
	MacroNum++;
    }
    else if(MacroCommand == "PSPSCR_DSP"){
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	MacroData2	= null;
	MacroData2	= new Array();
	MacroNum2	= 0;
	MacroMax2	= 0;
	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "WIN_OFF";
	MacroData2[MacroMax2++][1]	= "";
	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "FADE_OUT";
	MacroData2[MacroMax2++][1]	= "1,,FADE_SCREEN";
	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "BG_DSP";
	MacroData2[MacroMax2++][1]	= _data[1]+",BG_NOFADE";
	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "CHR_DSP";
	MacroData2[MacroMax2++][1]	= _data[2]+","+_data[3]+",CHR_NOFADE";
	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "FADE_IN";
	MacroData2[MacroMax2++][1]	= _data[0]+",,FADE_SCREEN";
	Macro2Flag	= true;
	delete	_data;
	MacroNum++;
    }
    else if(MacroCommand == "PSPSCR_DSPW"){
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	MacroData2	= null;
	MacroData2	= new Array();
	MacroNum2	= 0;
	MacroMax2	= 0;
	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "WIN_OFF";
	MacroData2[MacroMax2++][1]	= "";
	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "FADE_OUT";
	MacroData2[MacroMax2++][1]	= "1,,FADE_SCREEN";
	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "BG_DSP";
	MacroData2[MacroMax2++][1]	= _data[1]+",BG_NOFADE";
	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "CHR_DSPW";
	MacroData2[MacroMax2++][1]	= _data[2]+","+_data[3]+","+_data[4]+","+_data[5]+",CHR_NOFADE";
	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "FADE_IN";
	MacroData2[MacroMax2++][1]	= _data[0]+",,FADE_SCREEN";
	Macro2Flag	= true;
	delete	_data;
	MacroNum++;
    }
    else if(MacroCommand == "VIEW_STA"){
//	RainFlag	= false;
//	EffObj._visible	= false;
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	MacroData2	= null;
	MacroData2	= new Array();
	MacroNum2	= 0;
	MacroMax2	= 0;
	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "WIN_OFF";
	MacroData2[MacroMax2++][1]	= "";
	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "FADE_OUT";
	MacroData2[MacroMax2++][1]	= "60,FADE_BLACK,FADE_SHADE_Y";
	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "TRACE_SPC";
	MacroData2[MacroMax2++][1]	= "";
	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "EFF_STP0";
	MacroData2[MacroMax2++][1]	= "";
	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "BG_DSP";
	MacroData2[MacroMax2++][1]	= "BG_BLACK,BG_NOFADE";
	Macro2Flag	= true;
	delete	_data;
	MacroNum++;
    }
    else if(MacroCommand == "VIEW_SA"){
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	MacroData2	= null;
	MacroData2	= new Array();
	MacroNum2	= 0;
	MacroMax2	= 0;
	Macro2Flag	= true;
	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "WIN_COL";
	MacroData2[MacroMax2++][1]	= "2";
	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "FADE_IN";
	MacroData2[MacroMax2++][1]	= "60,FADE_BLACK,FADE_SHADE_Y";
	delete	_data;
	MacroNum++;
    }
    else if(MacroCommand == "VIEW_CO"){
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	MacroData2	= null;
	MacroData2	= new Array();
	MacroNum2	= 0;
	MacroMax2	= 0;
	Macro2Flag	= true;
	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "WIN_COL";
	MacroData2[MacroMax2++][1]	= "1";
	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "FADE_IN";
	MacroData2[MacroMax2++][1]	= "60,FADE_BLACK,FADE_SHADE_Y";
	delete	_data;
	MacroNum++;
    }
    else if(MacroCommand == "VIEW_SE"){
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	MacroData2	= null;
	MacroData2	= new Array();
	MacroNum2	= 0;
	MacroMax2	= 0;
	Macro2Flag	= true;
	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "WIN_COL";
	MacroData2[MacroMax2++][1]	= "0";
	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "FADE_IN";
	MacroData2[MacroMax2++][1]	= "60,FADE_BLACK,FADE_SHADE_Y";
	delete	_data;
	MacroNum++;
    }
    else if(MacroCommand == "PSPLANTERN_PLY"){
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	MacroData2	= null;
	MacroData2	= new Array();
	MacroNum2	= 0;
	MacroMax2	= 0;
	Macro2Flag	= true;
//	MacroData2[MacroMax2] = new Array(2);
//	MacroData2[MacroMax2][0]	= "SET_SAVPNT";
//	MacroData2[MacroMax2++][1]	= "";
	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "FADE_OUT";
	MacroData2[MacroMax2++][1]	= "60,FADE_BLACK";
	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "EFF_STP0";
	MacroData2[MacroMax2++][1]	= "EFF_SKIP";
	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "BGM_FADE_NORMAL";
	MacroData2[MacroMax2++][1]	= "";
	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "BG_DSP";
	MacroData2[MacroMax2++][1]	= "BG_BLACK,BG_NOFADE";
	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "FADE_IN";
	MacroData2[MacroMax2++][1]	= "1";
	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "MOV_PLY";
	MacroData2[MacroMax2++][1]	= "MV08";
	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "BG_DSP";
	MacroData2[MacroMax2++][1]	= "BG_BLACK,BG_NOFADE";
//	MacroData2[MacroMax2] = new Array(2);
//	MacroData2[MacroMax2][0]	= "CLR_SAVPNT";
//	MacroData2[MacroMax2++][1]	= "";
	delete	_data;
	MacroNum++;
    }
    else if(MacroCommand == "BG_DSP_PAN_R"){
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	MacroData2	= null;
	MacroData2	= new Array();
	MacroNum2	= 0;
	MacroMax2	= 0;
	Macro2Flag	= true;

	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "PSPBG_UV_AUTO";
	MacroData2[MacroMax2++][1]	= "0,0,640,448,0,40";

	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "WAIT";
	MacroData2[MacroMax2++][1]	= "40";

	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "FADE_OUT";
	MacroData2[MacroMax2++][1]	= "30,FADE_BLACK";
/*
	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "BG_DSP";
	MacroData2[MacroMax2++][1]	= "EV_CO33B,BG_NOFADE";
*/
	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "PSPBG_DSPEX";
	MacroData2[MacroMax2++][1]	= "EV_CO33B,BG_NOFADE,,640,0,640,448";

	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "FADE_IN";
	MacroData2[MacroMax2++][1]	= "30,FADE_WHITE";

	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "PSPBG_UV_AUTO";
	MacroData2[MacroMax2++][1]	= "0,0,640,448,0,40";

	delete	_data;
	MacroNum++;
    }
    else if(MacroCommand == "BG_DSP_PAN_L"){
	var _data = MacroData[DDMode][MacroNum][1].split(",");
	MacroData2	= null;
	MacroData2	= new Array();
	MacroNum2	= 0;
	MacroMax2	= 0;
	Macro2Flag	= true;

	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "PSPBG_UV_AUTO";
	MacroData2[MacroMax2++][1]	= "640,0,640,448,0,40";

	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "WAIT";
	MacroData2[MacroMax2++][1]	= "40";

	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "FADE_OUT";
	MacroData2[MacroMax2++][1]	= "30,FADE_BLACK";

	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "PSPBG_DSPEX";
//	MacroData2[MacroMax2++][1]	= "EV_CO33A,BG_NOFADE,,640,0,640,480";
	MacroData2[MacroMax2++][1]	= _data[0]+",BG_NOFADE,,0,0,640,448";

	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "FADE_IN";
	MacroData2[MacroMax2++][1]	= "30,FADE_WHITE";

	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "PSPBG_UV_AUTO";
	MacroData2[MacroMax2++][1]	= "640,0,640,448,0,40";

	delete	_data;
	MacroNum++;
    }
    else if(MacroCommand == "END_TXT"){
	HglassObj._visible	= false;
	MenuButton[7]._visible	= false;	// ゲームメニューボタン

	var _data = MacroData[DDMode][MacroNum][1].split(",");
	MacroData2	= null;
	MacroData2	= new Array();
	MacroNum2	= 0;
	MacroMax2	= 0;
	Macro2Flag	= true;

	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "DIS_SKIP";
	MacroData2[MacroMax2++][1]	= "";
	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "DIS_KEY";
	MacroData2[MacroMax2++][1]	= "";
	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "WIN_OFF";
	MacroData2[MacroMax2++][1]	= "";
	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "WAIT";
	MacroData2[MacroMax2++][1]	= "120";
	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "SCRMODE";
	MacroData2[MacroMax2++][1]	= "SCR_FULL";
	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "MESX";
	MacroData2[MacroMax2++][1]	= "%N%N%N%N";
	if(RegData["LR_CHAPTER"] == 0){
	    MacroData2[MacroMax2] = new Array(2);
	    MacroData2[MacroMax2][0]	= "MESX";
	    MacroData2[MacroMax2++][1]	= "%CF66A%FS%LCThis　story　has　not　finished　yet.%FE%N";
	}
	else if(RegData["LR_CHAPTER"] == 1){
	    MacroData2[MacroMax2] = new Array(2);
	    MacroData2[MacroMax2][0]	= "MESX";
	    MacroData2[MacroMax2++][1]	= "%C88FC%FS%LCThis　story　has　not　finished　yet.%FE%N";
	}
	else{
	    MacroData2[MacroMax2] = new Array(2);
	    MacroData2[MacroMax2][0]	= "MESX";
	    MacroData2[MacroMax2++][1]	= "%FS%LCThis　story　has　not　finished　yet.%FE%N";
	}
	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "WAIT";
	MacroData2[MacroMax2++][1]	= "100";
	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "MESX";
	MacroData2[MacroMax2++][1]	= "%FS%LCTruth　is　not　revealed.%FE%N";
	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "WAIT";
	MacroData2[MacroMax2++][1]	= "100";
	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "MESX";
	MacroData2[MacroMax2++][1]	= "%FS%LCAnd　it　circulates　through　an　incident.%FE%N";
	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "WAIT";
	MacroData2[MacroMax2++][1]	= "100";
	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "MESX";
	MacroData2[MacroMax2++][1]	= "%FS%LC――　It　is　an　infinity　loop!%FE%N";
	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "WAIT";
	MacroData2[MacroMax2++][1]	= "300";
	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "MESX";
	MacroData2[MacroMax2++][1]	= "%FS%LC  %FE%N";
	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "MESX";
	MacroData2[MacroMax2++][1]	= "%O";
	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "ENA_KEY";
	MacroData2[MacroMax2++][1]	= "";
	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "ENA_SKIP";
	MacroData2[MacroMax2++][1]	= "";
	MacroData2[MacroMax2] = new Array(2);
	MacroData2[MacroMax2][0]	= "WIN_OFF";
	MacroData2[MacroMax2++][1]	= "";
	delete	_data;
	MacroNum++;
    }
    else if(MacroCommand == "R11_EXIT"){
	Command_R11_EXIT();
	MacroNum++;
    }
}
function	GameFinish(){
    stopBGM();
    stopSE();
    stopVoice();

    _plugin.SetProgress();
}
//----------------------------------------------------------------------//
//
//----------------------------------------------------------------------//
var twitterStr = [
    "ユーザ名",
    "パスワード",
];
var keyFlag = false;
function	TwitterInit(){
    keyFlag	= _twitter.chk();
    MenuMode	= 0;
    chgImage(PNG_effect1,ResPng+"cg_title.png");
    for(var i = 0;i < 4;i++){
	SaveButton[i].init(IMG_qsave,180,100+i*40,imgTL,1);
	SaveButton[i].width = 220;
	SaveButton[i].height = 28;
	SaveButton[i].paneltype = 0;
	SaveButton[i].reg	= false;
	SaveButton[i]._visible	= true;
	SaveButton[i].color	= 0xffffff;
	SaveButton[i].scalex	= 0.28;
	SaveButton[i].scaley	= 0.28;
	SaveButton[i].paneltype = 0;
    }

    SaveButton[0].init(IMG_autotweet,240,60+0*60,imgTC,1);
    SaveButton[3].init(IMG_twitterlogin,240,100+3*40,imgTC,1);
    SaveButton[4].init(IMG_twitterlogout,240,100+3*40,imgTC,1);
    SaveButton[3]._visible	= true;
    SaveButton[4]._visible	= true;
    SaveButton[3].alpha	= 1;
    SaveButton[4].alpha	= 1;
    
    SaveButton[1].word = ""+TweetID;
    SaveButton[2].word = ""+TweetPass;
}
function	TwitterCtrl(){
    SpritePut(IMG_effect1,0,0,imgTL,1);
    PutLetterStroke("Twitter",_FONT_LARGE,10,10,0xffffff,0x000000,imgTL,1);
    BackButton[0].put();
    BackButton[1].put();

    SaveButton[0].put();//PanelFont(_FONT_MIDDLE,200);
    if(TweetFlag == 1){
	SpritePut(IMG_on,SaveButton[0].x+80,SaveButton[0].y+7,imgTL,1);
    }
    else{
	SpritePut(IMG_off,SaveButton[0].x+80,SaveButton[0].y+7,imgTL,1);
    }
    if(TweetFlag){
	if(keyFlag){
	    SaveButton[4].put();//putPanelFont(_FONT_MIDDLE,200);
	}
	else{
	    SaveButton[3].put();//putPanelFont(_FONT_MIDDLE,200);
	}
    }
    switch(MenuMode){
    case	0:
	if(BackButton[0].click()){	// title
	    playSE("sysse01");
	    MenuMode	= 1;
//	    buttonWait	= 6;
	}
	else if(BackButton[1].click()){	// back
	    playSE("sysse01");
//	    buttonWait	= 6;
	    MenuMode	= 1;
	}
	else if(SaveButton[0].click()){	// 接続
	    playSE("sysse01");
	    TweetFlag ^= 1;
	    saveTweetData();
	}
	else if(TweetFlag && !keyFlag && SaveButton[3].click()){
	    playSE("sysse01");
            _twitter.init();
	}
	else if(TweetFlag && keyFlag && SaveButton[4].click()){
	    playSE("sysse01");
            _twitter.delkey();
	    keyFlag	= _twitter.chk();
	}
	break;
    case	1:
//	if(--buttonWait < 0){
	    TitleInit();
//	}
	break;
    }
}

function	GetdataCtrl(){
    switch(LocalMode){
    case	0:
	_dialog.set("ゲームデータ取得","ＳＤカードに約２Ｇ弱の空き容量が必要です。","OK","NO");
	break;
    case	1:
	break;
    }
}

var TweetStr = [
    "異常事態",
    "生命誕生",
    "殺人容疑",
    "疑心暗鬼",
    "回想少女",
    "生存報告",
    "現実逃避",
    "自我崩壊",
    "残酷遊戯",
    "同種同形",
    "時空共鳴",
    "復讐計画",
    "真相究明",
    "存在確認",
    "記憶迷路",
    "連鎖反応",
    "夢幻誘惑",
];
var PointOpen = [
    0,    1,    2,    3,    4,    5,    6,    7,    8,    9,    10,    11,    12,    13,    14,    15,    16,
];

function        AutoTweet(_id){
  if(TweetFlag && devicetype > 0){
      _twitter.init();
      _twitter.post("Remember11 ["+TweetStr[_id]+"]の実績を解放しました。");
  }
}

var EndMode = 0;
function EndInit(){
    EndMode	= 0;
}
function EndCtrl(){
    FillRect(0,0,ScreenWidth,ScreenHeight,0x000000,1);
    switch(EndMode){
    case	0:
	_dialog.set("CAUTION","大変申し訳ございませんが、メモリが圧迫してきていますので一度アプリを終了します。","OK","");
	EndMode	= 1;
	break;
    case	1:
	if(_dialog.dialogOk()){	// ok newgame
	    if(devicetype == 2){
		navigator.app.exitApp();
	    }
	    else {
		_plugin.exitapp("",
				function(r){ },
				function(e){ }
                               );
	    }
	}
	break;
    }
}

//----------------------------------------------------------------------//
//
//----------------------------------------------------------------------//
function	onPause() {
    if(MainMode == MODE_TITLE){
	if(advTimer != -1){
	    clearTimeout(advTimer);
	    advTimer	= -1;
	}
    }
    else if(MainMode == MODE_GAME){
	switch(LocalMode){	// ゲーム中モード
	case	GAME_loop:
	    menuInit(GAME_menu);
	    break;
	case	GAME_mes:	// メッセージコントロール
	    MessageSetNew();
            SkipFlag = false;
            MessMode	= 1;
            menuInit(GAME_menu);
            HglassObj._visible	= true;
            MessKeyWait   = true;
	    break;
	case	GAME_wait:	// 待ち
	case	GAME_sewait:	// 待ち
	    break;
	case	GAME_fade:	// フェードコントロール
	    menuInit(GAME_menu);
	    break;
	case	GAME_win:	// 台詞ウインドウをもやっと出す
	    menuInit(GAME_menu);
	    break;
	case	GAME_next:	// macro呼び出し
	    menuInit(GAME_menu);
	    break;
	case	GAME_cal:	// カレンダー
	    break;
	case	GAME_select:	// セレクト
	    SelectFlag	= false;
	    if(SelectMacroNum != -1){
		MacroNum	= SelectMacroNum;
		DDMode		= SelectDDMode;
	    }
	    menuInit(GAME_menu);
	    break;
	case	GAME_chara:	// キャラもやっと
	    menuInit(GAME_menu);
	    break;
	case	GAME_movie:	// 動画終わり待ち
	    break;
	case	GAME_filt:	// マスクフィルターをもやっと
	    menuInit(GAME_menu);
	    break;
	case	GAME_qua:	// 背景、キャラ揺れ(地震とは違う
	    menuInit(GAME_menu);
	    break;
	case	GAME_load:	// ロードからはここにくる予定だったけどこない(json読み込み待ち)
	    break;
	case	GAME_syswin:	// 「ＣＵＲＥ」シナリオ覚醒
	    break;
	case	GAME_eos:	// シナリオ終了懼システムセーブしますかダイアログYES/NO待ち
	    break;
	}
    }
    SkipFlag	= false;
    AutoFlag	= false;
    touchOnCount	= 0;
    MaskCount	= 3;
//    console.log("----------------------  onPause");
    keyInit();
    if(_MainLoopFlag){
	_MainLoopFlag	= false;
    }
}
function	onResume() {
//    console.log("----------------------  onResume");
    keyInit();
    if(!_MainLoopFlag){
	_MainLoopFlag	= true;
    }
    if(MainMode == MODE_TITLE && LocalMode == 3){
	goLocalMode3();
    }
}
function	onMenuKey(){
}

//----------------------------------------------------------------------//
//
//----------------------------------------------------------------------//
function	playMovie(_data){
    SkipFlag	= false;
//    console.log("playMovie.................:"+_data);
    if(devicetype == 0/* || devicetype == 1*/){
	canvas.width	= 0;
	canvas.height	= 0;
	video.src		= "res/movie/"+_data+".mp4";
	video.width		= ScreenWidthOrg*screenScale;
	video.height	= ScreenHeightOrg*screenScale;
	video.play();
	video.addEventListener("ended", function(){
	    canvas.width	= ScreenWidthOrg*screenScale;
	    canvas.height	= ScreenHeightOrg*screenScale;
	    video.width	= 0;
	    video.height	= 0;
	}, false);
    }
    else if(devicetype == 1){
	_plugin.movie(""+(_data.toLowerCase()+".mp4"),
		      function(r){ },
		      function(e){ }
		     );
    }
    else{
	_plugin.movie(""+(_data.toLowerCase()),
		      function(r){ },
		      function(e){ }
		     );
    }
    // movie
}
function	stopMovie(){
//    console.log("stopMovie.................:");
    if(devicetype == 0){
	video.pause();
	canvas.width	= ScreenWidthOrg*screenScale;
	canvas.height	= ScreenHeightOrg*screenScale;
	video.width	= 0;
	video.height	= 0;
    }
}

function	playBGM(_data){
//    console.log("playBGM.................:"+_data+" >"+devicetype);
    RegData["REG_BGM"]	= _data;
    if(RegSound[0] == 1){
	if(devicetype == 0){
	    _Audio.src	= "res/snd/bgm/"+_data+"nl.mp3";
	    _Audio.loop = true;
	    _Audio.play();
	}
	else{
	    _plugin.SoundPlay(_data.toLowerCase()+"nl.mp3");
	}
    }
}
function	stopBGM(){
//    console.log("stopBGM.................");
    RegData["REG_BGM"]	= -1;
    if(RegSound[0] == 1){
	if(devicetype == 0){
	    _Audio.pause();
	}
	else{
	    _plugin.SoundStop();
	}
    }
}
function	stopBGMconfig(){
//    console.log("stopBGMconfig.................");
    if(RegData["REG_BGM"] != -1){
	if(devicetype == 0){
	    _Audio.pause();
	}
	else{
	    _plugin.SoundStop();
	}
    }
}

function	playSE(_data){
//    console.log("playSE.................:"+_data);
    if(RegSound[1] == 1){
	var loopFlag = false;
	for(var i in loopSEData){
	    if(loopSEData[i] == _data){
		loopFlag = true;
		break;
	    }
	}
	if(loopFlag){
//	    console.log("playSE loopFlag.................:"+_data);
	    RegData["REG_SELOOP"]	= _data;
	    if(devicetype == 0){
		_AudioSE2.src = "res/snd/se/"+_data+".mp3";
		_AudioSE2.loop = true;
		_AudioSE2.play();
	    }
	    else{
		_plugin.PlaySE2(_data.toLowerCase()+".mp3");
	    }
	}
	else{
	    if(devicetype == 0){
		_AudioSE.src = "res/snd/se/"+_data+".mp3";
		//    _AudioSE.loop = true;
		_AudioSE.play();
	    }
	    else{
		_plugin.PlaySE(_data.toLowerCase()+".mp3");
	    }
	}
    }
}
function	stopSE(){
    RegData["REG_SELOOP"]	= -1;
    if(RegSound[1] == 1){
	if(devicetype == 0){
	    _AudioSE2.pause();
	    _AudioSE.pause();
	}
	else{
	    _plugin.StopSE();
	    _plugin.StopSE2();
	}
    }
}
function	playVoice(_data){
//    console.log("playVoice.................:"+_data+","+VoiceFlag);
    if(VoiceFlag && RegSound[2] == 1){
	if(devicetype == 0){
	    _AudioVoice.src	= "res/snd/voice/"+_data+".mp3";
	    _AudioVoice.play();
	}
	else{
	    _plugin.PlayVoice(_data.toLowerCase()+".mp3");
	}
    }
}
function	stopVoice(){
//    console.log("stopVoice.................");
    if(VoiceFlag && RegSound[2] == 1){
	if(devicetype == 0){
	    _AudioVoice.pause();
	}
	else{
	    _plugin.StopVoice();
	}
    }
}

//----------------------------------------------------------------------//
// json読み出し
//----------------------------------------------------------------------//
var httpObj;
function loadFile(fileName){
    for(var i = 0; i < MACTB.length;i++){
	if(MACTB[i] == MacroNext){
	    MacroScenario	= i;
	}
    }
//    console.log("loadFile:.........................>>>"+fileName);
    LoadFlag	= true;
    httpObj = new XMLHttpRequest();
    httpObj.onreadystatechange = checkStatus;
    httpObj.open('GET',fileName+"?"+(new Date()).getTime(),true);
    httpObj.send(null);
}

function checkStatus(){
//    console.log("ssssssssssssssss"+httpObj.readyState+","+httpObj.status);
    if (httpObj.readyState == 4 && httpObj.status == 200){	// android web
//    if (httpObj.readyState == 4 && httpObj.status == 0){	// ios

	var objss = eval( '(' + httpObj.responseText + ')' );
	MacroData	= null;
	MacroID	= null;
	delete	MacroData;
	delete	MacroID;
	
	MacroData	= new Array();
	MacroID		= new Object();
	var _macid = 0;
//	var _MessNum = 0;
//	var _SeleNum = 0;
	for( var propertyName in objss ){
	    var _json = objss[propertyName].split(";");
//	    console.log("sssssssxx:"+propertyName+">");//+objss[propertyName]);
	    MacroData[_macid]	= new Array();
	    MacroID[propertyName]	= _macid;
//	    for(var _id in _json){
	    for(var _id =0; _id < _json.length;_id++){
		if(_json[_id] != ""){
		    var _macrodata = _json[_id].split(":");
		    MacroData[_macid][_id] = new Array(2);
		    MacroData[_macid][_id][0]	= _macrodata[0];
		    MacroData[_macid][_id][1]	= _macrodata[1];

//		    console.log(MacroData[_macid][_id][0]+","+MacroData[_macid][_id][1]);
		    delete _macrodata;
		    delete _id;
		}
	    }
//	    console.log("........................."+MacroID[propertyName]);
	    _macid++;
	    delete	_json;
	    delete propertyName;
	    //		_json = null;
	}
	httpObj.abort();                                  // 通信を中断する
	httpObj.onreadystatechange = new Function;
	
	objss = null;
	httpObj  = null;
	delete	objss;
	delete	httpObj;
	LoadFlag	= false;
    }
}


function modeChgCtrl(_next){
//    console.log("mmmmmmodeChgCtrl:"+_next);
    NextMode	= _next;
}
function saveImage(img){
//    console.log(".........ssssssssssssssssss...................ssssssssssssssssssssss:saveImage");
    _savecanvas = true;
    Saveimage	= img;
}
function chgImagen(img,no){
//    console.log(".........chgImagen:"+img+","+no+","+_Img[no].src);
    ChgImgn[img]	= no;
}
function chgImage(img,url){
    url	= url.replace(/unbg/g,"bg");
    url	= url.replace(/unebg/g,"ebg");
//    console.log(".........chgImage:"+url);
    ChgImg[img]	= url;
}

function saveReg(){
    saveRegOrg(0);
}
function saveRegOrg(_id){
    var _Date = new Date();
    RegData["REG_DATE0"]	= (1900+_Date.getYear())+"/"+(_Date.getMonth()+1)+"/"+_Date.getDate();
    RegData["REG_DATE1"]	= _Date.getHours()+":"+_Date.getMinutes()+":"+_Date.getSeconds();
    RegData["LR_NO"]	= MacroScenario;
    RegData["LR_SEL"]	= DDMode;
    if(SaveLock){
	RegData["LR_T00"]	= SaveMacroNum;
    }
    else{
	RegData["LR_T00"]	= MacroNum;
    }
    RegData["REG_EFFECT"]	= EffObj._effect;
    RegData["REG_QUA"]	= EffType;
    RegData["LR_WIN_OFF"]	= ScreenMode;

    RegData["LR_M02"]	= parseInt(BGObj.basex);
    RegData["LR_M03"]	= parseInt(BGObj.basey);
    RegData["LR_M04"]	= parseInt(BGObj.basew);
    RegData["LR_M05"]	= parseInt(BGObj.baseh);
    RegData["LR_M09"]	= parseInt(CharaObj[0].scalex);
    RegData["LR_M13"]	= parseInt(CharaObj[0].scaley);
    RegData["LR_M18"]	= parseInt(CharaObj[1].scalex);
    RegData["LR_M19"]	= parseInt(CharaObj[1].scaley);
    RegData["LR_M20"]	= parseInt(CharaObj[2].scalex);
    RegData["LR_M21"]	= parseInt(CharaObj[2].scaley);
    RegData["LR_M06"]	= parseInt(CharaObj[0].x);
    RegData["LR_M10"]	= parseInt(CharaObj[0].y);
    RegData["LR_M07"]	= parseInt(CharaObj[1].x);
    RegData["LR_M11"]	= parseInt(CharaObj[1].y);
    RegData["LR_M08"]	= parseInt(CharaObj[2].x);
    RegData["LR_M12"]	= parseInt(CharaObj[2].y);
    
//    console.log("mmmmmmmmmmmmmmmmmmm:"+MacroScenario+","+DDMode+","+MacroNum);
    var savedata = "";
    for(var i = LR_START;i < RegName.length; i++){
//	console.log("savedata:"+i+":"+RegName[i]+">"+RegData[RegName[i]]+",");
	savedata	+= RegData[RegName[i]]+",";
    }
    localStorage.setItem("SAVEDATA"+_id,savedata);

    // 端末のほうにデータを避難させておく
    if(devicetype != 0){
	localStorage_save("SAVEDATA"+_id,savedata);
    }
//    console.log("savedata"+_id+":"+savedata);
    delete	_Data;
//    _Date = null;
}
function loadReg(){
    loadRegOrg(0);
}
function loadRegOrg(_id,_RegData,_flag){
    var savedata = localStorage.getItem("SAVEDATA"+_id);
//    console.log("loaddata:"+savedata);

    if(savedata == "" || savedata == null){
//	console.log("savedata:nodata");
    }
    else {
	var _data = savedata.split(",");
	var ii = 0;
	for(var i = LR_START;i < RegName.length; i++){
	    if(_data[ii] == null || _data[ii] == ""){
		_RegData[RegName[i]]	= 0;
	    }
	    else{
		_RegData[RegName[i]]	= _data[ii];
	    }
//	    console.log("savedata:"+i+")"+RegName[i]+":"+_RegData[RegName[i]]+"  >"+_data[ii]);
	    ii++;
	}
	if(_flag){
	    MacroScenario	= parseInt(_RegData["LR_NO"]);
	    DDMode		= parseInt(_RegData["LR_SEL"]);
	    MacroNum	= parseInt(_RegData["LR_T00"]);
	    MacroNum --;
	    if(MacroNum < 0){
		MacroNum	= 0;
	    }
	    ScreenMode	= parseInt(_RegData["LR_WIN_OFF"]);
	    if(ScreenMode == 1){
		MainObj._visible	= true;
	    }
	    EffType		= parseInt(_RegData["REG_QUA"]);
	}
//	console.log("mmmmmmmmmmmmmmmmmmml:"+MacroScenario+","+DDMode+","+MacroNum);
	delete	_data;
//	_data = null;
    }
    delete	savedata;
//    savedata = null;
}
function initReg(){
    for(var i = LR_START;i < RegName.length; i++){
	RegData[RegName[i]]	= 0;
    }
    RegData["REG_BG0"]	= -1;
    RegData["REG_CHARA0"]	= -1;
    RegData["REG_CHARA1"]	= -1;
    RegData["REG_CHARA2"]	= -1;
    RegData["REG_BGM"]	= -1;
    RegData["REG_SELOOP"]	= -1;
}
function loadAll(_save){	// _save = 1 だとautosaveが灰色
    dataID	= -1;
    putWait = 0;
    for(var i = 0;i < 12;i++){
	SaveButton[i].init(IMG_save_load,10+((i%2)*130),40+46*Math.floor(i/2),imgTL,1);
	SaveButton[i].width = 120;
	SaveButton[i].height = 44;
	SaveButton[i].paneltype = 0;
	SaveButton[i]._visible	= true;

	SaveButton[i].reg	= false;
	if(i == 0){
	    SaveButton[i].word	= "AUTO SAVE";
	    if(_save == 1){
		SaveButton[i].paneltype	= 2;
		SaveButton[i].color	= 0x808080;
	    }
	    else{
		SaveButton[i].color	= 0xffffff;
	    }
	}
	else{
	    SaveButton[i].word	= "DATA"+i;
	    SaveButton[i].color	= 0xffffff;
	}

	var savedata = localStorage.getItem("SAVEDATA"+i);
//	console.log(i+":"+savedata);
	if(savedata == "" || savedata == null){
	    SaveButton[i].word	+= "\n \n --/--/--.--:--:--";
	}
	else{
	    SaveButton[i].reg	= true;
	    var _data = savedata.split(",");
//	    for(var ii = 0; ii < _data.length; ii++){
//		console.log(i+">"+ii+":"+_data[ii]);
//	    }
	    var route = _data[REG_START+1];//.replace(/ルート/,"");
	    var date = _data[REG_START+2].split("/");
	    date[0] -= 2000;
//	    SaveButton[i].word	+= "\n "+_data[REG_START+1]+"\n "+_data[REG_START+2]+"."+_data[REG_START+3];
	    SaveButton[i].word	+= "\n "+route+"\n "+date[0]+"/"+date[1]+"/"+date[2]+"."+_data[REG_START+3];
//	    SaveData[i]["REG_BG0"]	= _data[REG_START+4];

//	    console.log(i+":"+_data[REG_START]);
//	    console.log(i+":"+_data[REG_START+1]);
//	    console.log(i+":"+_data[REG_START+2]);
//	    console.log(i+":"+_data[REG_START+3]);
//	    console.log(i+":"+_data[REG_START+4]);
	}
	delete	savedata;
//	savedata = null;
    }
}
function saveSystem(){
//    console.log("----------------------------------systemsave------------------------------------");
    var sysdata = "";
    for(var i = 0;i < SF_MAX; i++){
//	console.log("system:"+i+":"+RegName[i]+">"+RegData[RegName[i]]+",");
	sysdata	+= RegData[RegName[i]]+",";
//	localStorage.setItem(RegName[i], RegData[RegName[i]]);
    }
    localStorage.setItem("SYSTEMDATA",sysdata);
//    console.log("system:"+sysdata);
//    console.log("----------------------------------systemsave------------------------------------");
    delete	sysdata;
//    sysdata = null;
}
function loadSystem(){
//    console.log("----------------------------------systemload------------------------------------");
    var sysdata = localStorage.getItem("SYSTEMDATA");
//    console.log("system:nodata>>>"+sysdata);
    if(sysdata == "" || sysdata == null){
//	console.log("system.......................................................:nodata");
	SystemFlag        = false;
    }
    else {
	SystemFlag        = true;
	var _data = sysdata.split(",");
	for(var i = 0;i < SF_MAX; i++){
	    if(_data[i] == null || _data[i] == ""){
		RegData[RegName[i]]	= 0;
	    }
	    else{
		RegData[RegName[i]]	= _data[i];
	    }
//	    console.log("system:"+i+")"+RegName[i]+":"+RegData[RegName[i]]);
	}
    }
//    console.log("----------------------------------systemload------------------------------------");
}
function saveSound(){
//    console.log("----------------------------------soundsave------------------------------------");
    localStorage.setItem("SOUNDDATA",RegSound[0]+","+RegSound[1]+","+RegSound[2]);
}
function loadSound(){
//    console.log("----------------------------------soundload------------------------------------");
    var sdata = localStorage.getItem("SOUNDDATA");
    if(sdata == "" || sdata == null){
	RegSound[0] = 1;
	RegSound[1] = 1;
	RegSound[2] = 1;
    }
    else {
	var _data = sdata.split(",");
	RegSound[0] = _data[0];
	RegSound[1] = _data[1];
	RegSound[2] = _data[2];
//	_data = null;
	delete	_data;
    }
//    console.log("----------------------------------soundload ok------------------------------------"+RegSound[0]+","+RegSound[1]+","+RegSound[2]);
//    sdata = null;
    delete	sdata;
}
function saveCGFlag(){
//    console.log("----------------------------------cgsave------------------------------------");
    var cdata = "";
    var ii = 0;
    for(var i = 0; i < cgData.length; i++){
	for(var j = 0; j < cgData[i].length; j++){
	    for(var k = 0; k < cgData[i][j].length; k++){
		cdata += CGFlag[cgData[i][j][k]]+",";
//		console.log(ii+":"+cgData[i][j][k]+" >"+CGFlag[cgData[i][j][k]]);
		ii++;
	    }
	}
    }
    localStorage.setItem("CGDATA",cdata);
//    console.log("----------------------------------cgsave ok------------------------------------:"+cdata);
    delete	cdata;
//    cdata = null;
}
function loadCGFlag(){
//    console.log("----------------------------------cgload------------------------------------");
    var cdata = localStorage.getItem("CGDATA");
    if(cdata == "" || cdata == null){
	for(var i = 0; i < cgData.length; i++){
	    for(var j = 0; j < cgData[i].length; j++){
		for(var k = 0; k < cgData[i][j].length; k++){
		    CGFlag[cgData[i][j][k]] = 0;
		}
	    }
	}
    }
    else{
	var _data = cdata.split(",");
	var ii = 0;
	for(var i = 0; i < cgData.length; i++){
	    for(var j = 0; j < cgData[i].length; j++){
		for(var k = 0; k < cgData[i][j].length; k++){
		    CGFlag[cgData[i][j][k]] = _data[ii];
//		    console.log(ii+":"+cgData[i][j][k]+" >"+CGFlag[cgData[i][j][k]]);
		    ii++;
		}
	    }
	}
	delete	_data;
//	_data = null;
    }
    delete	cdata;
//    cdata = null;
//    console.log("----------------------------------cgload ok------------------------------------:"+cdata);
}
function saveMovieFlag(){
//    console.log("----------------------------------moviesave------------------------------------");
    var mdata = "";
    for(var i = 0; i < movieData.length; i++){
	mdata += MovieFlag[movieData[i]]+",";
    }
    localStorage.setItem("MOVIEDATA",mdata);
//    console.log("----------------------------------moviesave ok------------------------------------:"+mdata);
    delete	mdata;
//    mdata = null;
}
function loadMovieFlag(){
//    console.log("----------------------------------movieload------------------------------------");
    var mdata = localStorage.getItem("MOVIEDATA");
    if(mdata == "" || mdata == null){
	for(var i = 0; i < movieData.length; i++){
	    MovieFlag[movieData[i]] = 0;
	}
    }
    else{
	var _data = mdata.split(",");
	for(var i = 0; i < movieData.length; i++){
	    MovieFlag[movieData[i]] = _data[i];
	}
	delete	_data;
//	_data = null;
    }
    delete	mdata;
//    mdata = null;
//    console.log("----------------------------------movieload ok------------------------------------:"+mdata);
}
function saveBgmFlag(){
//    console.log("----------------------------------bgmsave------------------------------------");
    var bdata = "";
    for(var i = 0; i < bgmData.length; i++){
	bdata += BgmFlag[bgmData[i][0]]+",";
    }
    localStorage.setItem("BGMDATA",bdata);
//    localStorage.setItem("BGMDATA","");
//    console.log("----------------------------------bgmsave ok------------------------------------:"+bdata);
    delete	bdata;
//    bdata = null;
}
function loadBgmFlag(){
//    console.log("----------------------------------bgmload------------------------------------");
    var bdata = localStorage.getItem("BGMDATA");
    if(bdata == "" || bdata == null){
	for(var i = 0; i < bgmData.length; i++){
	    BgmFlag[bgmData[i][0]] = 0;
	}
    }
    else{
	var _data = bdata.split(",");
	for(var i = 0; i < bgmData.length; i++){
	    BgmFlag[bgmData[i][0]] = _data[i];
	}
	delete	_data;
//	_data = null;
    }
//    console.log("----------------------------------bgmload ok------------------------------------:"+bdata);
    delete	bdata;
//    bdata = null;
}
function saveTipsFlag(){
//    console.log("----------------------------------tipssave------------------------------------");
    var tdata = "";
    for(var i = 0; i < tipsText.length; i++){
	tdata += TipsFlag[i]+",";
    }
    localStorage.setItem("TIPSDATA",tdata);
//    localStorage.setItem("TIPSDATA","");
//    console.log("----------------------------------tipssave ok------------------------------------:"+tdata);
    delete	tdata;
//    tdata = null;
}
function loadTipsFlag(){
//    console.log("----------------------------------tipsload------------------------------------");
    var tdata = localStorage.getItem("TIPSDATA");
    if(tdata == "" || tdata == null){
	for(var i = 0; i < tipsText.length; i++){
	    TipsFlag[i] = 0;
	}
    }
    else{
	var _data = tdata.split(",");
	for(var i = 0; i < tipsText.length; i++){
	    TipsFlag[i] = _data[i];
	}
	delete	_data;
//	_data = null;
    }
//    console.log("----------------------------------tipsload ok------------------------------------:"+tdata);
    delete	tdata;
//    tdata = null;
}

function savePointFlag(){
//    console.log("----------------------------------pointsave------------------------------------");
    localStorage.setItem("POINTDATA",PointData);
    var pdata = "";
    for(var i = 0; i < 50; i++){
	pdata += PointFlag[i]+",";
    }
    localStorage.setItem("POINTFLAG",pdata);
//    console.log("----------------------------------pointsave ok------------------------------------:"+PointData+">>>"+pdata);
    delete	pdata;
//    pdata = null;
}
function loadPointFlag(){
//    console.log("----------------------------------pointload------------------------------------");
    PointData = localStorage.getItem("POINTDATA");
    if(PointData == "" || PointData == null){
	PointData	= 0;
    }
    var pdata = localStorage.getItem("POINTFLAG");
    if(pdata == "" || pdata == null){
	for(var i = 0; i < 50; i++){
	    PointFlag[i] = 0;
	}
    }
    else{
	var _data = pdata.split(",");
	for(var i = 0; i < 50; i++){
	    PointFlag[i] = _data[i];
	}
	delete	_data;
//	_data = null;
    }
//    console.log("----------------------------------pointload ok------------------------------------:"+PointData+"::::"+pdata);
    delete	pdata;
//    pdata = null;
}
var    TweetID;
var    TweetPass;
var    TweetFlag;
function saveTweetData(){
    localStorage.setItem("TWEETID",TweetID);
    localStorage.setItem("TWEETPASS",TweetPass);
    localStorage.setItem("TWEETFLAG",TweetFlag);
}
function loadTweetData(){
    TweetID	= localStorage.getItem("TWEETID");
    if(TweetID == null){
	TweetID	= "";
    }
    TweetPass	= localStorage.getItem("TWEETPASS");
    if(TweetPass == null){
	TweetPass	= "";
    }
    TweetFlag	= localStorage.getItem("TWEETFLAG");
    if(TweetFlag == null || TweetFlag == ""){
	TweetFlag	= 0;
    }
}
function saveConfTextData(){
    localStorage.setItem("CONFIGTEXT0",ConfigText0);
    localStorage.setItem("CONFIGTEXT1",ConfigText1);
}
function loadConfTextData(){
    ConfigText0	= localStorage.getItem("CONFIGTEXT0");
    if(ConfigText0 == null){
	ConfigText0	= 1;
    }
    ConfigText1	= localStorage.getItem("CONFIGTEXT1");
    if(ConfigText1 == null){
	ConfigText1	= 2;
    }
}
/*
// 最終的にははずす
function saveMesData(){

    var data = "";
    for(var i = 0; i < 282; i++){
	data += meschk[i]+",";
    }
    localStorage.setItem("MESALL",data);

    data = "";
    for(var i = 0; i < 282; i++){
	data += selchk[i]+",";
    }
    localStorage.setItem("SELALL",data);
}
// 最終的にははずす
function loadMesData(){
    var data = localStorage.getItem("MESALL");
    if(data == null){
	meschk = new Array(282);
	for(var i = 0; i < 282; i++){
	    meschk[i] = 0;
	}
    }
    else{
	meschk = data.split(",");
	mesall	= 0;
	for(var i = 0; i < 282; i++){
	    mesall += meschk[i];
	}
    }
    data = localStorage.getItem("SELALL");
    if(data == null){
	selchk = new Array(282);
	for(var i = 0; i < 282; i++){
	    selchk[i] = 0;
	}
    }
    else{
	selchk = data.split(",");
	selall	= 0;
	for(var i = 0; i < 282; i++){
	    selall += selchk[i];
	}
    }
}
// 最終的にははずす
function saveMesLocalData(sno){
    var datal = "";
    for(var i = 0; i < meslocal.length; i++){
	datal += ""+meslocal[i];
    }
    localStorage.setItem("MESALL"+sno,datal);

    datal = "";
    for(var i = 0; i < sellocal.length; i++){
	datal += ""+sellocal[i];
    }
    localStorage.setItem("SELALL"+sno,datal);
}
// 最終的にははずす
function loadMesLocalData(sno){
    var datal = localStorage.getItem("MESALL"+sno);
    if(datal == null){
	meslocal = new Array(mennum[sno][0]);
	for(var i = 0; i < meslocal.length; i++){
	    meslocal[i] = 0;
	}
    }
    else{
	meslocal = new Array(mennum[sno][0]);
	for(var i = 0; i < meslocal.length; i++){
	    meslocal[i] = datal.charAt(i);
	}
    }

    datal = localStorage.getItem("SELALL"+sno);
    if(datal == null){
	sellocal = new Array(mennum[sno][1]);
	for(var i = 0; i < sellocal.length; i++){
	    sellocal[i] = 0;
	}
    }
    else{
	sellocal = new Array(mennum[sno][1]);
	for(var i = 0; i < sellocal.length; i++){
	    sellocal[i] = datal.charAt(i);
	}
    }
}
*/
function localStorage_getItem(_key){
    if(devicetype != 0){
	_plugin.readdata(""+_key,
			 function(r){
			     if(devicetype == 2){
				 PhoneData	= r.strdata;
			     }
			     else{
				 PhoneData	= r;
			     }
                             PhoneFlag     = true;
			 },
			 function(e){
                             PhoneFlag     = true;
			 }
			);
    }
}

function localStorage_save(_key,_str){
    if(_key != null){
	localStorage_setItem(_key,_str);
	localStorage_setItem("ISDATA","1");
    }
    var sysdata = "";
    for(var i = 0;i < SF_MAX; i++){
	sysdata	+= RegData[RegName[i]]+",";
    }
    localStorage_setItem("SYSTEMDATA",sysdata);
    delete sysdata;

    var cdata = "";
    var ii = 0;
    for(var i = 0; i < cgData.length; i++){
	for(var j = 0; j < cgData[i].length; j++){
	    for(var k = 0; k < cgData[i][j].length; k++){
		cdata += CGFlag[cgData[i][j][k]]+",";
		ii++;
	    }
	}
    }
    localStorage_setItem("CGDATA",cdata);
    delete	cdata;

    var mdata = "";
    for(var i = 0; i < movieData.length; i++){
	mdata += MovieFlag[movieData[i]]+",";
    }
    localStorage_setItem("MOVIEDATA",mdata);
    delete	mdata;

    var bdata = "";
    for(var i = 0; i < bgmData.length; i++){
	bdata += BgmFlag[bgmData[i][0]]+",";
    }
    localStorage_setItem("BGMDATA",bdata);
    delete	bdata;

    var tdata = "";
    for(var i = 0; i < tipsText.length; i++){
	tdata += TipsFlag[i]+",";
    }
    localStorage_setItem("TIPSDATA",tdata);
    delete	tdata;

    localStorage_setItem("POINTDATA",PointData);
    var pdata = "";
    for(var i = 0; i < 50; i++){
	pdata += PointFlag[i]+",";
    }
    localStorage_setItem("POINTFLAG",pdata);
    delete	pdata;
}

function localStorage_setItem(_key,_str){
    localStorage.setItem(_key,_str);
    if(devicetype != 0){
	_plugin.writedata(_key+"="+_str,
			  function(r){
			  },
			  function(e){ }
			 );
    }
}

//----------------------------------------------------------------------//
//
//----------------------------------------------------------------------//
