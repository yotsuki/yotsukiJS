var charaID = 0;
var pageNo = 0;
var selectID = 0;
var sabunNo = 0;
var playFlag = false;
var flagNum = 0;
function AlbumInit(){
    _plugin.DelProgress();
    LocalMode	= 0;
    MenuMode	= 0;
    dataMode	= 0;
    AppendGame = -1;

    MenuButton[0].init(IMG_cg,120,80,imgCC,1);	// 使いまわしなので注意
    MenuButton[1].init(IMG_movie,120+240,80,imgCC,1);
    MenuButton[2].init(IMG_bgm,120,140,imgCC,1);
    MenuButton[3].init(IMG_machi,120+240,140,imgCC,1);
    MenuButton[4].init(IMG_ending,120,200,imgCC,1);
    MenuButton[0].word = "CG";
    MenuButton[0].color	= 0xffffff;
    MenuButton[1].word = "MOVIE";
    MenuButton[1].color	= 0xffffff;
    MenuButton[2].word = "BGM";
    MenuButton[2].color	= 0xffffff;
    MenuButton[3].word = "SPECIAL";
    MenuButton[3].color	= 0xffffff;
    MenuButton[4].word = "ENDING";
    MenuButton[4].color	= 0xffffff;

    BackButton[0].init(IMG_gotitle,ScreenWidth-10,ScreenHeight-10,imgBR,1);
    BackButton[1].init(IMG_goback,ScreenWidth-60,ScreenHeight-10,imgBR,1);

//    chgImage(PNG_bg0,ResPng+"cg_title.png");
    chgImage(PNG_effect1,ResPng+"cg_title.png");
}
function albumBack(){
    if(BackButton[0].click()){
	playSE("sysse01");
	modeChgCtrl(MODE_TITLE);
    }
    else if(BackButton[1].click()){
	playSE("sysse01");
	AlbumInit();
	LocalMode	= 0;
    }
}
function AlbumCtrl(){
    SpritePut(IMG_effect1,0,0,imgTL,1);
    BackButton[0].put();
    BackButton[1].put();
    switch(LocalMode){
    case	0:
	PutLetterStroke("ALBUM",_FONT_LARGE,10,10,0xffffff,0x000000,imgTL,1);
	for(var i = 0; i < 5; i++){
	    MenuButton[i].put();//menu();
	}
	for(var i = 0; i < 5; i++){
	    if(MenuButton[i].click()){
		playSE("sysse01");
		LocalMode = (i+1);
		switch(i){
		case	0:
		    selectID	= 0;
		    cgInit();
		    break;
		case	1:
		    selectID	= 0;
		    movieInit(0);
		    break;
		case	2:
		    selectID	= -1;
		    playFlag	= false;
		    bgmInit(0);
		    break;
		case	3:
		    selectID	= -1;
		    machiInit();
		    break;
		case	4:
		    endingInit(0);
		    break;
		}
		break;
	    }
	}
	if(BackButton[0].click()){
	    playSE("sysse01");
	    LocalMode	= 10;
	    SetFadeOut(6);
	}
	else if(BackButton[1].click()){
	    playSE("sysse01");
	    LocalMode	= 10;
	    SetFadeOut(6);
	}
	break;
    case	1:
	PutLetterStroke("CG",_FONT_LARGE,10,10,0xffffff,0x000000,imgTL,1);
	cgCtrl();
	albumBack();
	break;
    case	2:
	PutLetterStroke("MOVIE",_FONT_LARGE,10,10,0xffffff,0x000000,imgTL,1);
	movieCtrl();
	albumBack();
	break;
    case	3:
	PutLetterStroke("BGM",_FONT_LARGE,10,10,0xffffff,0x000000,imgTL,1);
	bgmCtrl();
	albumBack();
	break;
    case	4:
	PutLetterStroke("SPECIAL",_FONT_LARGE,10,10,0xffffff,0x000000,imgTL,1);
	machiCtrl();
	albumBack();
	break;
    case	5:
	PutLetterStroke("ENDING",_FONT_LARGE,10,10,0xffffff,0x000000,imgTL,1);
	endingCtrl();
	albumBack();
	break;
    case	10:
	if(--FadeTimer < 0){
	    modeChgCtrl(MODE_TITLE);
	}
	break;
    }
}
function	AlbumFinish(){
    _plugin.SetProgress();
}

function cgInit(){	// CG
    MenuMode	= 0;
    for(var i = 0;i < 2;i++){
	SaveButton[i].init(IMG_cg0+i,150+180*i,50,imgTC,1);
	SaveButton[i].paneltype = 0;
	SaveButton[i].reg	= false;
	SaveButton[i]._visible	= true;
	SaveButton[i].color	= 0xffffff;
    }
    SaveButton[5].pat	= IMG_cg6;
}
var cgPageNum = [
    6,5,
];
function cgCtrl(){	// CG
    switch(MenuMode){
    case	0:	// 人の選択
	for(var i = 0;i < 2;i++){
	    SaveButton[i].put();//Panel();
	}
	for(var i = 0;i < 2;i++){
	    if(SaveButton[i].click()){
		playSE("sysse01");
		charaID	= i;
		MenuMode	= 1;
		cgListInit(0);
		break;
	    }
	}
	break;
    case	1:	// ページの選択＆画像の選択
	for(var i = 0;i < cgPageNum[charaID];i++){
	    MenuButton[i].putPanel();
	}
	for(var i = 0;i < 6;i++){
	    if(i+pageNo*6 < cgData[charaID].length){
		SpritePut(IMG_i_unknown,SaveButton[i].x-1,SaveButton[i].y-1,imgTL,1);
	    }
	}
	_plugin.DelProgress();
	MenuMode	= 11;
	break;
    case	11:	// ページの選択＆画像の選択
	for(var i = 0;i < cgPageNum[charaID];i++){
	    if(MenuButton[i].click()){
		playSE("sysse01");
		cgListInit(i);
		MenuMode	= 1;
		putWait	= 0;
		break;
	    }
	}
	for(var i = 0;i < 6;i++){
	    if(SaveButton[i].reg && SaveButton[i].click() && (i+pageNo*6 < cgData[charaID].length)){
		playSE("sysse01");
		keyInit();
		selectID	= i;
		MenuMode	= 2;
		_xbias	= 0;
		_ybias = 0;
		if(charaID == 0 && pageNo == 5 && i == 4){
		    _xbias	= -480;
		}
		//	    sabunNo	= 0;
	    }
	}
        if(BackButton[0].click()){
	    playSE("sysse01");
	    modeChgCtrl(MODE_TITLE);
	    putWait	= 0;
	}
	else if(BackButton[1].click()){
	    playSE("sysse01");
	    MenuMode	= 0;
	    cgInit();
	    putWait	= 0;
	}
	else{
	    for(var i = 0;i < cgPageNum[charaID];i++){
		MenuButton[i].putPanel();
	    }
	    for(var i = 0;i < 6;i++){
		if(i+pageNo*6 < cgData[charaID].length){
		    SpritePut(IMG_i_unknown,SaveButton[i].x-1,SaveButton[i].y-1,imgTL,1);
		    if(putWait < 0 && SaveButton[i].reg){
			SaveButton[i].putPanelPat();
		    }
		}
	    }
	}
	putWait--;
	break;
    case	2:	// 画像、差分、表示
	SpritePut(IMG_album00+selectID,_xbias,_ybias,imgTL,1);
	if(SlideUp()){
	    touchOnF	= false;
	    _ybias += -(Math.floor(touchMoveY));
	    if(_ybias < -(_Img[_imgData[IMG_album00+selectID]].height-320)){
		_ybias	= -(_Img[_imgData[IMG_album00+selectID]].height-320);
	    }
	}
	else if(SlideDown()){
	    touchOnF	= false;
	    _ybias += -(Math.floor(touchMoveY));
	    if(_ybias > 0){
		_ybias	= 0;
	    }
	}
	else if(SlideLeft()){
	    touchOnF	= false;
	    _xbias += -(Math.floor(touchMoveX));
	    if(_xbias < -(_Img[_imgData[IMG_album00+selectID]].width-480)){
		_xbias	= -(_Img[_imgData[IMG_album00+selectID]].width-480);
	    }
	}
	else if(SlideRight()){
	    touchOnF	= false;
	    _xbias += -(Math.floor(touchMoveX));
	    if(_xbias > 0){
		_xbias	= 0;
	    }
	}
	else if(_T()){
	    ++sabunNo;
	    SaveButton[selectID].reg	= false;
	    for(var j = sabunNo; j < cgData[charaID][pageNo*6+selectID].length;j++){
		if(CGFlag[cgData[charaID][pageNo*6+selectID][j]] == 1){
		    chgImage(PNG_album00+i,ResPng+cgData[charaID][pageNo*6+selectID][j]+".png");
		    SaveButton[selectID].reg	= true;
		    sabunNo = j;
		    break;
		}
	    }
	    
	    if(SaveButton[selectID].reg){//++sabunNo < cgData[charaID][pageNo*6+selectID].length){
		_xbias	= 0;
		_ybias	= 0;
		if(charaID == 1 && pageNo == 4 && selectID == 1 && sabunNo == 1){
		    _xbias	= -480;
		}
		chgImage(PNG_album00+selectID,ResPng+cgData[charaID][selectID+pageNo*6][sabunNo]+".png");
	    }
	    else{
		keyInit();
		cgListInit(pageNo);
		MenuMode	= 1;
	    }
	}
	break;
    }
}
var cgData = [
    [
	["ev_pr01a",],
	["ev_pr02a",],
	["ev_co01a",	"ev_co01b",	"ev_co01c",],
	["ev_co02a",	"ev_co02b",	"ev_co02c",	"ev_co02d",],
	["ev_co03a",	"ev_co03b",	"ev_co03c",],
	["ev_co04a",],
	["ev_co05a",	"ev_co05b",	"ev_co05c",],
	["ev_co06a",	"ev_co06b",],
	["ev_co07a",	"ev_co07b",],
	["ev_co08a",],
	["ev_co09a",],
	["ev_co10a",	"ev_co10b",],
	["ev_co11a",],
	["ev_co12a",],
	["ev_co13a",	"ev_co13b",	"ev_co13c",],
	["ev_co14a",	"ev_co14b",],
	["ev_co15a",	"ev_co15b",],
	["ev_co16a",],
	["ev_co17a",],
	["ev_co18a",],
	["ev_co21a",],
	["ev_co20a",],
	["ev_co19a",],
	["ev_co22a",],
	["ev_co23a",],
	["ev_co24a",],
	["ev_co25a",	"ev_co25b",],
	["ev_co26a",],
	["ev_co27a",	"ev_co27b",],
	["ev_co36a",],
	["ev_co28a",],
	["ev_co29a",],
	["ev_co30a",	"ev_co30b",	"ev_co30c",	"ev_co30d",],
	["ev_co32a",	"ev_co32b",	"ev_co32c",],
	["ev_co33a",	"ev_co33b",],
	["ev_co34a",],
    ],
//	["ev_sa06a",	"ev_sa06b",	"ev_sa06c",	"ev_sa06d",],
    [
	["ev_pr03a",],
	["ev_sa02a",],
	["ev_sa03a",	"ev_sa03b",],
	["ev_sa17a",],
	["ev_sa05a",],
	["ev_sa18a",	"ev_sa18b",],
	["ev_co35a",],
	["ev_sa07a",],
	["ev_sa08a",],
	["ev_sa04a",],
	["ev_sa09a",],
//	["ev_co32c",],
//	["ev_co32b",],
	["ev_sa10a",],
	["ev_sa11a",],
	["ev_sa12a",],
	["ev_sa20a",],
	["ev_sa13a",	"ev_sa13b",],
	["ev_sa19a",],
	["ev_sa21a",],
	["ev_sa14a",],
	["ev_sa15a",	"ev_sa15b",],
	["ev_co31a",],
	["ev_sa01a",],
	["ev_sa16b",	"ev_sa16a",],
	["ev_sa22a",],
	["ev_sa23a",],
	["ev_sa24a",	"ev_sa24b",],
    ],
];
function cgListInit(_pageno){
    _plugin.SetProgress();
    pageNo	= _pageno;
    sabunNo	= 0;
    for(var i = 0;i < cgPageNum[charaID];i++){
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
    for(var i = 0;i < 6;i++){
	SaveButton[i].init(IMG_album00+i,10+150*(i%3),50+Math.floor(i/3)*110,imgTL,1);
	SaveButton[i].width = 144;
	SaveButton[i].height = 96;
	SaveButton[i].paneltype = 0;
	SaveButton[i].reg	= false;
	SaveButton[i]._visible	= true;
	SaveButton[i].color	= 0xffffff;
	SaveButton[i].scalex	= 0.28;
	SaveButton[i].scaley	= 0.28;
	if(i+pageNo*6 < cgData[charaID].length){
	    SaveButton[i].reg	= true;
	    for(var j = 0; j < cgData[charaID][i+pageNo*6].length;j++){
		if(CGFlag[cgData[charaID][i+pageNo*6][j]] == 0){
		    SaveButton[i].reg	= false;
		    break;
		}
	    }
	    if(SaveButton[i].reg){
		chgImage(PNG_album00+i,ResPng+cgData[charaID][i+pageNo*6][0]+".png");
	    }
//	    else{
//		chgImage(PNG_album00+i,ResPng+"cg_title.png");
//	    }
	    sabunNo = 0;
	}
	else{
	    SaveButton[i]._visible	= false;
	}
    }
}
var movieData = [
    "mov_op",
    "mv00",
    "mv01",
    "mv02",
    "mv03",
    "mv04",

    "mv08",
    "mv09",
    "mv12",
    "mv13",
    "mv14",
    "mv15",

    "mved1",
    "mved2",
    "mved3",
];
function movieInit(_pageno){	// MOVIE
    MenuMode	= 0;
    pageNo	= _pageno;
    for(var i = 0;i < 3;i++){
	MenuButton[i].init(IMG_page,10+50*i,ScreenHeight-50,imgTL,1);	// 使いまわしなので注意
	MenuButton[i].width = 44;
	MenuButton[i].height = 44;
	MenuButton[i].paneltype = 0;
	if(i == pageNo){
	    MenuButton[i].paneltype = 1;
	}
	MenuButton[i].word	= "page"+(i+1);
    }

    for(var i = 0;i < 6;i++){
	SaveButton[i].init(IMG_album00+i,10+150*(i%3),50+Math.floor(i/3)*110,imgTL,1);
	SaveButton[i].width = 144;
	SaveButton[i].height = 96;
	SaveButton[i].paneltype = 0;
	SaveButton[i].reg	= false;
	SaveButton[i]._visible	= true;
	SaveButton[i].color	= 0xffffff;
	SaveButton[i].scalex	= 0.28;
	SaveButton[i].scaley	= 0.28;
	SaveButton[i].word	= "movie"+(pageNo*6+i);
	if(pageNo*6+i < movieData.length){
	    if(MovieFlag[movieData[pageNo*6+i]] == 1/* || true*/){
		chgImage(PNG_album00+i,ResPng+movieData[pageNo*6+i]+".png");
		SaveButton[i].reg	= true;
	    }
//	    else{
//		chgImage(PNG_album00+i,ResPng+"i_unknown.png");
//		SaveButton[i].word	+= ":nolook";
//	    }
	}
	else{
	    SaveButton[i]._visible	= false;
	}
    }
}
function movieCtrl(){	// MOVIE
    switch(MenuMode){
    case	0:	// 人の選択
	for(var i = 0;i < 3;i++){
	    MenuButton[i].putPanel();
	}
	for(var i = 0;i < 6;i++){
	    if(pageNo*6+i < movieData.length){
		SpritePut(IMG_i_unknown,SaveButton[i].x-1,SaveButton[i].y-1,imgTL,1);
		if(MovieFlag[movieData[pageNo*6+i]] == 1/* || true*/){
		    SaveButton[i].putPanelPat();
		}
	    }
	}
	for(var i = 0;i < 3;i++){
	    if(MenuButton[i].click()){
		playSE("sysse01");
		movieInit(i);
		break;
	    }
	}
	for(var i = 0;i < 6;i++){
	    if(SaveButton[i].reg && SaveButton[i].click() && (i+pageNo*6 < movieData.length)){
		playSE("sysse01");
		stopBGM();
		keyInit();
		selectID	= i;
		MenuMode	= 1;
		LocalCounter	= 20;
	    }
	}
	break;
    case	1:
	FillRect(0,0,ScreenWidth,ScreenHeight,0x000000,1);
	if(--LocalCounter < 0){
	    ChkMovieFlag        = true;
	    playMovie(movieData[selectID+pageNo*6]);
	    movieTimer	= setInterval(_plugin.ChkMovie,2000);
	    MenuMode	= 2;
	}
	break;
    case	2:
	FillRect(0,0,ScreenWidth,ScreenHeight,0x000000,1);
	if(T() || !ChkMovieFlag){
	    clearInterval(movieTimer);
	    playBGM("adx25");
	    stopMovie();
	    keyInit();
	    MenuMode	= 0;
	}
	break;
    }
}
var bgmData = [
    ["adx01","Chaining\n\nMusic,Arrange\nTakeshi Abo", "Chaining"],
    ["adx32","Chaining −β−\n\nMusic,Arrange\nTakeshi Abo", "Chaining −β−"],
    ["adx02","Scheme\n\nMusic,Arrange\nTakeshi Abo", "Scheme"],
    ["adx33","Scheme −β−\n\nMusic,Arrange\nTakeshi Abo", "Scheme −β−"],
    ["adx03","Anima\n\nMusic,Arrange\nTakeshi Abo", "Anima"],
    ["adx04","Animus\n\nMusic,Arrange\nTakeshi Abo", "Animus"],
    ["adx05","Persona\n\nMusic,Arrange\nTakeshi Abo", "Persona"],
    ["adx06","Old wise man\n\nMusic,Arrange\nTakeshi Abo", "Old wise man"],
    ["adx07","Great mother\n\nMusic,Arrange\nTakeshi Abo", "Great mother"],
    ["adx08","Shadow\n\nMusic,Arrange\nTakeshi Abo", "Shadow"],
    ["adx09","Puer aeternus\n\nMusic,Arrange\nTakeshi Abo", "Puer aeternus"],
    ["adx10","Trickstar\n\nMusic,Arrange\nTakeshi Abo", "Trickstar"],
    ["adx11","Self\n\nMusic,Arrange\nTakeshi Abo", "Self"],
    ["adx12","Communication\n\nMusic,Arrange\nTakeshi Abo", "Communication"],
    ["adx27","Heuristic\n\nMusic,Arrange\nTakeshi Abo", "Heuristic"],
    ["adx13","Anxiety\n\nMusic,Arrange\nTakeshi Abo", "Anxiety"],
    ["adx14","Cue\n\nMusic,Arrange\nTakeshi Abo", "Cue"],
    ["adx15","Paranoia\n\nMusic,Arrange\nTakeshi Abo", "Paranoia"],
    ["adx16","Fear and Insanity\n\nMusic,Arrange\nTakeshi Abo", "Fear and Insanity"],
    ["adx17","Thanatos\n\nMusic,Arrange\nTakeshi Abo", "Thanatos"],
    ["adx18","Delusive consciousness\n\nMusic,Arrange\nTakeshi Abo", "Delusive consciousness"],
    ["adx30","Delusive consciousness\n amb.\n\nMusic,Arrange\nTakeshi Abo", "Delusive consciousness..."],
    ["adx19","Mantra\n\nMusic,Arrange\nTakeshi Abo", "Mantra"],
    ["adx20","Multiple maze\n\nMusic,Arrange\nTakeshi Abo", "Multiple maze"],
    ["adx21","Dreamy lens\n\nMusic,Arrange\nTakeshi Abo", "Dreamy lens"],
    ["adx29","Dreamy lens −Piano−\n\nMusic,Arrange\nTakeshi Abo", "Dreamy lens −Piano−"],
    ["adx22","Dark Gestalt\n\nMusic,Arrange\nTakeshi Abo", "Dark Gestalt"],
    ["adx28","Nucleus\n\nMusic,Arrange\nTakeshi Abo", "Nucleus"],
    ["adx23","Will −Theme−\n\nMusic,Arrange\nTakeshi Abo", "Will −Theme−"],
    ["adx24","Catharsis\n\nMusic,Arrange\nTakeshi Abo", "Catharsis"],
    ["adx25","All or None\n\nMusic,Arrange\nTakeshi Abo", "All or None"],
    ["adx31","All or None −Piano−\n\nMusic,Arrange\nTakeshi Abo", "All or None −Piano−"],
    ["adx26","δ Wave\n\nMusic,Arrange\nTakeshi Abo", "δ Wave"],
    ["adx35","警告劇場\n\n作：槻潮　鋼\n", "警告劇場"],
    ["adx36","little prophet\n\n作詞/作曲：志倉千代丸\n編曲：磯江俊道\n歌：KAORI", "little prophet"],
    ["adx37","Darkness of chaos\n\n作詞/作曲：志倉千代丸\n編曲：磯江俊道\n歌：皆川純子", "Darkness of chaos"],
    ["adx50","宇宙のステンシル\n\n作詞/作曲：志倉千代丸\n編曲：上野浩司\n歌：宮崎羽衣", "宇宙のステンシル"],
    ["adx51","キレナイナイフ\n\n作詞：前田たかひろ\n作曲/編曲：大島こうすけ\n歌：宮崎羽衣", "キレナイナイフ"],	// 38
//    ["adx01","YUKA\n作曲・編曲:阿保　剛\n\n","00:02:06"],
];
function bgmInit(_pageno){	// BGM
    flagNum	= 0;
    for(var i = 0; i < bgmData.length;i++){
	if(BgmFlag[bgmData[i][0]] == 1 /*|| true*/){
	    flagNum++;
	}
    }
    MenuMode	= 0;
    pageNo	= _pageno;
    for(var i = 0;i < 7;i++){
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
    SaveButton[9].init(IMG_soundskip0,295,44+160,imgTL,1);	// 使いまわしなので注意
    SaveButton[9].word = "<<";
    SaveButton[9]._visible = true;
    SaveButton[10].init(IMG_soundplay,295+50,44+160,imgTL,1);	// 使いまわしなので注意
    if(playFlag){
	SaveButton[10].pat	= IMG_soundstop;
    }
    else{
	SaveButton[10].pat	= IMG_soundplay;
    }
    SaveButton[10]._visible = true;
    SaveButton[11].init(IMG_soundskip1,295+100,44+160,imgTL,1);	// 使いまわしなので注意
    SaveButton[11].word = ">>";
    SaveButton[11]._visible = true;
    if(flagNum == 0){
	SaveButton[9]._visible = false;
	SaveButton[10]._visible = false;
	SaveButton[11]._visible = false;
    }

    for(var i = 0;i < 6;i++){
	SaveButton[i].init(IMG_bgm2,10,40+i*36,imgTL,1);
	SaveButton[i].width = 240;
	SaveButton[i].height = 34;
	SaveButton[i].paneltype = 0;
	SaveButton[i].reg	= false;
	SaveButton[i]._visible	= true;
	SaveButton[i].color	= 0xffffff;
	SaveButton[i].scalex	= 0.28;
	SaveButton[i].scaley	= 0.28;
	SaveButton[i].paneltype = 0;
	if(pageNo*6+i < bgmData.length){
	    if(selectID == pageNo*6+i){
		SaveButton[i].paneltype = 1;
	    }
	    SaveButton[i].word	= (pageNo*6+i+1)+":";
	    if(BgmFlag[bgmData[pageNo*6+i][0]] == 1/* || true*/){
		SaveButton[i].word += bgmData[pageNo*6+i][2];//(bgmData[pageNo*6+i][1]).split("\n")[0];
		SaveButton[i].reg	= true;
	    }
	    else{
		SaveButton[i].word += "？？？？？？？";
	    }
	}
	else{
	    SaveButton[i]._visible	= false;
	}
    }
}
function panelchjchk(){
    for(var j = 0; j < 6; j++){
	SaveButton[j].paneltype = 0;
    }
    if(pageNo == Math.floor(selectID/6)){
	SaveButton[selectID%6].paneltype = 1;
    }
}
function bgmCtrl(){	// BGM
    switch(MenuMode){
    case	0:	// 人の選択
	for(var i = 0;i < 7;i++){
	    MenuButton[i].putPanel();
	}
	for(var i = 0;i < 6;i++){
	    SaveButton[i].putPanelFont(_FONT_MIDDLE0);
	}

//	FillPanel(ScreenWidth-10-200,40,200,210,0x00afe3,0x0057ae,0x003388,1,4,0);	// 右の詳細パネル
	SpritePut(IMG_bmg_w,ScreenWidth-10-200,40,imgTL,1);
	SaveButton[9].put();//Panel();
	SaveButton[10].put();//Panel();
	SaveButton[11].put();//Panel();

	if(selectID != -1){
	    var _word = bgmData[selectID][1];
	    PutLetterDivStroke(_word,_FONT_SMALL,190,ScreenWidth-10-200+14,60,0xffffff,0x000000);	    
	}
	if(SaveButton[9].click() && flagNum > 0){
	    if(flagNum > 1){
		SaveButton[10].pat	= IMG_soundstop;
		playFlag	= true;
		if(selectID == -1){
		    selectID = bgmData.length;
		}
		while(true){
		    selectID--;
		    if(selectID < 0){
			selectID = bgmData.length-1;
		    }
		    if(BgmFlag[bgmData[selectID][0]] == 1 /*|| true*/){
			pageNo	= Math.floor(selectID/6);
			bgmInit(pageNo);
			break;
		    }
		}
	    }
	    playBGM(bgmData[selectID][0]);
	    panelchjchk();
	}
	else if(SaveButton[10].click() && flagNum > 0){
	    if(playFlag){
		playFlag	= false;
		SaveButton[10].pat	= IMG_soundplay;
		stopBGM();
	    }
	    else{
		SaveButton[10].pat	= IMG_soundstop;
		playFlag	= true;
		if(selectID == -1){
		    selectID = 0;
		}
		playBGM(bgmData[selectID][0]);
		panelchjchk();
	    }
	}
	else if(SaveButton[11].click() && flagNum > 0){
	    if(flagNum > 1){
		SaveButton[10].pat	= IMG_soundstop;
		playFlag	= true;
		while(true){
		    selectID++;
		    if(selectID >= bgmData.length){
			selectID = 0;
		    }
		    if(BgmFlag[bgmData[selectID][0]] == 1 /*|| true*/){
			pageNo	= Math.floor(selectID/6);
			bgmInit(pageNo);
			break;
		    }
		}
	    }
	    playBGM(bgmData[selectID][0]);
	    panelchjchk();
	}

	for(var i = 0;i < 7;i++){
	    if(MenuButton[i].click()){
		playSE("sysse01");
		bgmInit(i);
		break;
	    }
	}
	for(var i = 0;i < 6;i++){
	    if(SaveButton[i].reg && SaveButton[i].click() && (i+pageNo*6 < bgmData.length)){
		SaveButton[10].pat	= IMG_soundstop;
		playFlag	= true;
		keyInit();
		selectID	= i+pageNo*6;
		panelchjchk();
		playBGM(bgmData[i+pageNo*6][0]);
	    }
	}
	break;
    }
}

var machiData = [
    1,2,100,
];
function machiInit(){	// 待ちうけ
    var clearNum = 0;
    if(RegData["SF_ED_COCORO_GOOD"] > 0){
	clearNum++;
    }
    if(RegData["SF_ED_SATORU_GOOD"] > 0){
	clearNum++;
    }
    if(PointFlag[16] == 1/*RegData["SF_ALL_CLEAR"] > 0*/){
	clearNum	= 100;
    }

    for(var i = 0;i < 3;i++){
	SaveButton[i].init(IMG_album00+i,40+i*140,60,imgTL,1);
	SaveButton[i].width = 133;
	SaveButton[i].height = 200;
	SaveButton[i].paneltype = 0;
	SaveButton[i].reg	= false;
	SaveButton[i]._visible	= true;
	SaveButton[i].color	= 0xffffff;
	SaveButton[i].paneltype = 0;
	SaveButton[i].scalex = 1.0;
	SaveButton[i].scaley = 1.0;
	if(clearNum >= machiData[i]){
	    SaveButton[i].reg	= true;
	    chgImage(PNG_album00+i,ResPng+"i_cg_"+(i+1)+".png");
	}
	else{
	    chgImage(PNG_album00+i,ResPng+"i_cg_unknown.png");
	}
    }
}
function machiCtrl(){	// 待ちうけ
    for(var i = 0;i < 3;i++){
	SaveButton[i].puts();
    }
    switch(MenuMode){
    case	0:
	for(var i = 0;i < 3;i++){
	    if(SaveButton[i].reg && SaveButton[i].click()){
		playSE("sysse01");
		MenuMode	= 1;
                selectID  = i;
                if(devicetype == 1){
                    _dialog.set("待ちうけ","カメラロールに保存しますか？","はい","いいえ");
                }
                else{
//		    _dialog.set("待ちうけ","待ちうけ画像に設定しますか？","はい","いいえ");
		    _dialog.set("待ちうけ","ギャラリーに保存しますか？","はい","いいえ");
		}
	    }
	}
	break;
    case	1:
	if(_dialog.dialogOk()){	// okならプラグインで待ち受けに
            _plugin.kabegami(""+(selectID+1),
                             function(r){ },
                             function(e){ }
                            );
	    MenuMode	= 0;
	}
	else if(_dialog.dialogNo()){	// noなら
	    MenuMode	= 0;
	}
	break;
    }
}

var endingData = [
    ["SF_ED_COCORO_GOOD",	"ココロ編グッドエンド"			,""],
    ["SF_ED_COCORO_SUIMINYAKU",	"バスルームで悟殺害エンドＡ"		,""],
    ["SF_ED_COCORO_BAD_1",	"悟転移後刺殺エンド"			,""],
    ["SF_ED_COCORO_MIZU",	"スフィア組ジェノサイドエンド"		,""],
    ["SF_ED_COCORO_LIN_1",	"山小屋組全滅エンド（黛その１）"	,""],
    ["SF_ED_COCORO_SPHIA",	"スフィア遭難エンド"			,""],
    ["SF_ED_COCORO_ENOMOTO",	"バスルームで何者かに刺殺エンドＡ"	,""],
    ["SF_ED_COCORO_LIN_2",	"山小屋組全滅エンド（黛その２）"	,""],
    ["SF_ED_COCORO_YOMOGI",	"山小屋組全滅エンド（黄泉木）"		,""],
    ["SF_ED_COCORO_SYOKUJI",	"食事で毒殺エンド"			,""],
    ["SF_ED_COCORO_AKEKURA_1",	"墜落現場辿り着けず凍死エンド"		,""],
    ["SF_ED_COCORO_LIN_3",	"山小屋組全滅エンド（黛その３）"	,""],

    ["SF_ED_COCORO_AKEKURA_2",	"墜落現場から帰還できず凍死エンド"	,""],
    ["SF_ED_COCORO_TOUSHI_1",	"墜落現場で彷徨エンド"			,""],
    ["SF_ED_COCORO_TOUSHI_UNI",	"こころ責任感じて自殺エンド"		,""],
    ["SF_ED_COCORO_NADARE_1",	"こころ雪庇転落エンド"			,""],
    ["SF_ED_COCORO_NADARE_2",	"Ｘ地点雪崩遭遇エンド"			,""],
    ["SF_ED_COCORO_ROLLBAD",	"ひとりで山小屋遭難エンド"		,""],
    ["SF_ED_SATORU_GOOD",	"サトル編グッドエンド"			,""],
    ["SF_ED_SATORU_EPILOGUE",	"サトル編エピローグ"			,""],
    ["SF_ED_SATORU_SUIMINYAKU",	"バスルームで悟殺害エンドＢ"		,""],
    ["SF_ED_SATORU_BAD_1",	"謎の影に殺害エンド"			,""],
    ["SF_ED_SATORU_MIZU",	"内海計画実行エンド"			,""],
    ["SF_ED_SATORU_LIN_1",	"山小屋組全滅エンドＢ（黛その１）"	,""],

    ["SF_ED_SATORU_SPHIA",	"悟フリーズエンド"			,""],
    ["SF_ED_SATORU_ENOMOTO",	"バスルームで何者かに刺殺エンドＢ"	,""],
    ["SF_ED_SATORU_CHIRA_DMT",	"ＭＡＯ阻害剤効果で血管破裂エンド"	,""],
    ["SF_ED_SATORU_LIN_2",	"山小屋組全滅エンドＢ（黛その２）"	,""],
    ["SF_ED_SATORU_YOMOGI",	"山小屋組ジェノサイドエンド"		,""],
    ["SF_ED_SATORU_YUBI",	"内海暴走して悟刺殺エンド"		,""],
    ["SF_ED_SATORU_ROLLBAD",	"ユウキドウ計画失敗エンド"		,""],
    ["SF_ED_SATORU_KOYA",	"ひとりで山小屋放心エンド"		,""],
    ["SF_ED_SATORU_TOUSHI_UNI",	"山小屋組全滅エンド（こころ）"		,""],
];

function endingInit(_pageno){	// ending
    pageNo	= _pageno;
    for(var i = 0;i < 3;i++){
	MenuButton[i].init(IMG_page,10+50*i,ScreenHeight-50,imgTL,1);	// 使いまわしなので注意
	MenuButton[i].width = 44;
	MenuButton[i].height = 44;
	MenuButton[i].paneltype = 0;
	if(i == pageNo){
	    MenuButton[i].paneltype = 1;
	}
	MenuButton[i].word	= "page"+(i+1);
    }
    for(var i = 0;i < 12;i++){
	SaveButton[i].init(IMG_ending2,10+(i%2)*222,40+Math.floor(i/2)*38,imgTL,1);
	SaveButton[i].width = 220;
	SaveButton[i].height = 32;
	SaveButton[i].paneltype = 0;
	SaveButton[i].reg	= false;
	SaveButton[i]._visible	= true;
	SaveButton[i].color	= 0xffffff;
	SaveButton[i].scalex	= 0.28;
	SaveButton[i].scaley	= 0.28;
	SaveButton[i].paneltype = 0;
	if(pageNo*12+i < endingData.length){
	    SaveButton[i].word = "No."+(pageNo*12+i+1);
	    if(RegData[endingData[pageNo*12+i][0]] > 0){
		SaveButton[i].word	+= ":"+endingData[pageNo*12+i][2]+"\n"+endingData[pageNo*12+i][1];
	    }
	    else{
		SaveButton[i].word	+= "\n？？？？？？？";
		SaveButton[i].paneltype	= 2;
		SaveButton[i].color	= 0x808080;
	    }
	}
	else{
	    SaveButton[i]._visible	= false;
	}
    }
}
function endingCtrl(){	// ending
    for(var i = 0;i < 3;i++){
	MenuButton[i].putPanel();
    }
    for(var i = 0;i < 12;i++){
	SaveButton[i].putPanel();
    }
    for(var i = 0;i < 3;i++){
	if(MenuButton[i].click()){
	    playSE("sysse01");
	    endingInit(i);
	}
    }
}
