var HelpTitle = [
    ["操作について","便利な機能"],
    ["ゲーム画面の表示について",],
    ["メニュー内の機能について","メニュー内の機能について２",],
    ["アルバムの機能について",],
    ["ゲームを更に楽しむ機能","ゲームを更に楽しむ機能２"],
];
var HelpMessafe = [
    [
	"＜通常ゲーム画面＞\n●タップ\n　通常モードでのテキスト送り、\n選択肢の決定。\n●画面長押し\n　オートプレイモード。\n●左/右フリック\n　スキップモード。\n●上フリック\n　メッセージログ表示。\n●下フリック\n　テキストウィンドウ非表示。",
	"＜スキップモード＞\n　左/右フリックでスキップモードに入ります。スキップモード中に画面に触れるとモードは終了します。また、選択肢を選択した際にもモードは終了します｡\n※既読シナリオのみスキップする機能はありません｡\n\n＜オートプレイモード＞\n画面の長押しでオートプレイモードに入ります。オートモード中に画面に触れるとモードは終了します。選択肢を選択した後は、継続されます。\n\n＜メッセージログ･スクロール＞\n　上か下にフリックしたあと指を離さずに長押しすると指を離すまでスクロールできます。\n\n",
    ],
    [
	"１．シーンタイトル表示\n２．オートセーブ表示\n３．ゲーム内時間表示\n４．メニューボタン\n５．キャラクター表示\n６．選択肢ウィンドウ\n７．テキストウィンドウ\n８．オート･スキップモード表示\n\n",
    ],
    [
	"＜SAVE＞\n　一番左上のスロットは､オートセーブ用スロットです｡上書きは､できません｡その他のスロットは､自由に新規保存､上書き保存ができます｡\n\n＜LOAD＞\n　一番左上のスロットをロードするとゲームを中断したシーンの冒頭､もしくは一番近い選択肢から再開できます｡\n\n＜CONFIG＞\n　ゲーム中のBGM、SE、VOICEのON/OFFを設定することができます。\n",
	"＜SHORTCUT＞\n　ショートカット機能です。任意の冒頭からゲームを開始することができます。ショートカットを使用するには、一度そのシーンを通過する必要があります。\n\n＜TIPS＞\n　ゲーム内に出てくる言葉を集めて解説した辞書です。110語収録しています。※この物語はフィクションです。この用語集に含まれる人物・団体・地名・事件・歴史・その他の設定には、架空のものが含まれております。\n",
    ],
    [
	"＜ALBUM＞\n　ゲーム内のイベントCGやBGM､MOVIEなどを鑑賞できます｡\n　クリア特典の待受け画像も､ここからダウンロードができます。\n　イベントCGはフルスクリーンで表示されます。上下のフリック操作で画像を動かして見ることもできます。\n\n",
    ],
    [
	"＜キャラクターボイス＞\nこのアプリにはキャラクターボイスが入っておりません。\n音声を聞きながらゲームを楽しみたいお客様は、タイトル画面の右上にあるショッピングカートアイコンをタップしてください。\nメインのキャラクターを演じているのは以下の声優です。\n\n冬川　こころ：森永理科\n優希堂　悟　：子安武人\n黛　鈴　　　：豊口めぐみ\n黄泉木　聖司：江原正士\n内海カーリー：久川綾\n涼蔭　穂鳥　：友永朱音\n楠田　ゆに　：皆川順子\n",
	"＜自動ツイート＞\nタイトル画面の右上にある、バードアイコンをタップするとTwitterにログインしてアプリと連携させることができます。\nバードアイコンをタップしたら自動ツイートをONにし、ログインボタンをタップしてください。\nゲームプレイ中、実績解放のポップアップが表示されたと同時に、ログインしたアカウントに自動ツイートされます。\nこのツイートは本アプリ内で見ることはできません。\n他のツイートと同じように、TwitterのアプリやTwitterのWEBサイトなどで見ることができます。\n",
    ],
];
var HelpPos = [
    [82,82],
    [82],
    [82,82],
    [82],
    [82,82],
];
//----------------------------------------------------------------------//
//
//----------------------------------------------------------------------//
var helpMode;
var helpUndo;
function HelpInit(){
    helpMode	= 0;
    chgImage(PNG_effect1,ResPng+"cg_title.png");
    for(var i = 0;i < HelpTitle.length;i++){
	SaveButton[i].init(IMG_help2,80,60+i*40,imgTL,1);
	SaveButton[i].width = 320;
	SaveButton[i].height = 28;
	SaveButton[i].paneltype = 0;
	SaveButton[i].reg	= false;
	SaveButton[i]._visible	= true;
	SaveButton[i].color	= 0xffffff;
	SaveButton[i].scalex	= 0.28;
	SaveButton[i].scaley	= 0.28;
	SaveButton[i].word = (i+1)+"."+HelpTitle[i][0];
    }
    HelpInit2(0);
}

function HelpInit2(_pageid){
    pageNo	= _pageid;
    for(var i = 0;i < 3;i++){
	MenuButton[i].init(IMG_page,10+50*i,ScreenHeight-50,imgTL,1);	// 使いまわしなので注意
	MenuButton[i].width = 44;
	MenuButton[i].height = 44;
	MenuButton[i].paneltype = 0;
	MenuButton[i].color	= 0xffffff;
	if(i == pageNo){
	    MenuButton[i].paneltype = 1;
	}
	MenuButton[i].word	= "page"+(i+1);
    }
}

function HelpCtrl(){
    SpritePut(IMG_effect1,0,0,imgTL,1);
    PutLetterStroke("HELP",_FONT_LARGE,10,10,0xffffff,0x000000,imgTL,1);
    BackButton[0].put();
    BackButton[1].put();

    switch(helpMode){
    case	0:
	for(var i = 0;i < HelpTitle.length;i++){
	    SaveButton[i].putPanelFont(_FONT_MIDDLE,300);
	}
	if(BackButton[0].click()){	// title
	    playSE("sysse01");
	    keyInit();
	    ChgMode	= 0;
	    helpUndo	= helpMode;
	    helpMode	= 10;
	    buttonWait	= 0;
	}
	else if(BackButton[1].click()){	// back
	    playSE("sysse01");
	    keyInit();
	    ChgMode	= 1;
	    helpMode	= 10;
	    buttonWait	= 0;
	}
	else{
	    for(var i = 0;i < HelpTitle.length;i++){
		if(SaveButton[i].click()){
		    HelpInit2(0);
		    playSE("sysse01");
		    buttonWait	= 0;
		    selectID	= i;
		    helpMode	= 2;
		    if(i == 0){
			chgImage(PNG_calen,ResPng+"help1.png");
		    }
		    else if(i == 1){
			chgImage(PNG_calen,ResPng+"help2.png");
		    }
		    break;
		}
	    }
	}
	break;
    case	2:
	for(var i = 0;i < HelpTitle[selectID].length;i++){
	    MenuButton[i].putPanel();
	}
	PutLetterStroke(HelpTitle[selectID][pageNo],_FONT_MIDDLE,10,45,0xffffff,0x000000,imgTL,1);
	PutLetterDivStroke(HelpMessafe[selectID][pageNo],_FONT_SMALL,400,40,HelpPos[selectID][pageNo],0xffffff,0x000000);	    
	switch(selectID){
	case	0:
	case	1:
	    if(pageNo == 0)
		SpritePutS(IMG_calen,480-201-40,HelpPos[selectID][pageNo],imgTL,0.7,0.7,0,1);
	    break;
	}

	if(BackButton[0].click()){	// title
	    playSE("sysse01");
	    if(MainMode == MODE_TITLE){	// MODE_TITLEだとタイトル初期化
		helpMode	= 13;
//		TitleInit();
	    }
	    else{
		_dialog.set("CAUTION","タイトルへ戻りますか？\nセーブしていない場合、タイトルに戻ると、今までのゲームデータは保存されません。","YES","NO");
		helpUndo	= helpMode;
		helpMode	= 12;
	    }
	    keyInit();
	}
	else if(BackButton[1].click()){	// back
	    playSE("sysse01");
	    helpMode	 = 0;
	    pageNo	= 0;
	    keyInit();
	}
	else{
	    for(var i = 0;i < HelpTitle[selectID].length;i++){
		if(MenuButton[i].click()){
		    playSE("sysse01");
		    HelpInit2(i);
		    break;
		}
	    }
	}
	break;

    case	10:
	for(var i = 0;i < HelpTitle.length;i++){
	    SaveButton[i].putPanelFont(_FONT_MIDDLE,300);
	}
	if(--buttonWait < 0){
	    if(ChgMode == 0){	// title
		if(MainMode == MODE_TITLE){	// MODE_TITLEだとタイトル初期化
		    TitleInit();
		}
		else{
		    _dialog.set("CAUTION","タイトルへ戻りますか？\nセーブしていない場合、タイトルに戻ると、今までのゲームデータは保存されません。","YES","NO");
		    helpMode	= 11;
		}
	    }
	    else if(ChgMode == 1){	// back
		if(MainMode == MODE_TITLE){	// MODE_TITLEだとタイトル初期化
		    if(MenuMode == 7){
			menuInit0();
			MenuMode	= 0;
		    }
		    else{
			TitleInit();
		    }
		}
		else{
		    menuInit0();
		    keyInit();
		    MenuMode = 0;
		}
	    }
	}
	break;
    case	11:
	for(var i = 0;i < HelpTitle.length;i++){
	    SaveButton[i].putPanelFont(_FONT_MIDDLE,300);
	}
	if(_dialog.dialogOk()){
	    modeChgCtrl(MODE_TITLE);
	}
	else if(_dialog.dialogNo()){
	    helpMode	= helpUndo;
	}
	break;
    case	12:
	for(var i = 0;i < HelpTitle[selectID].length;i++){
	    MenuButton[i].putPanel();
	}

	PutLetterStroke(HelpTitle[selectID][pageNo],_FONT_MIDDLE,10,35,0xffffff,0x000000,imgTL,1);
	PutLetterDivStroke(HelpMessafe[selectID][pageNo],_FONT_SMALL,400,40,HelpPos[selectID][pageNo],0xffffff,0x000000);	    
	switch(selectID){
	case	0:
	case	1:
	    if(pageNo == 0)
		SpritePutS(IMG_bg0,480-201-40,HelpPos[selectID][pageNo],imgTL,0.7,0.7,0,1);
	    break;
	}
	if(_dialog.dialogOk()){
	    modeChgCtrl(MODE_TITLE);
	}
	else if(_dialog.dialogNo()){
	    helpMode	= helpUndo;
	}
	break;
    case	13:
	TitleInit();
	break;
  }
}
