var _PUTDATA_MAX = 200;

var _FONT_TINY	= 0;
var _FONT_SMALL	= 1;
var _FONT_MIDDLE1 = 2;
var _FONT_MIDDLE0 = 3;
var _FONT_MIDDLE = 4;
var _FONT_LARGE = 5;

var _PUTTYPE_COLOR = 0;
var _PUTTYPE_WORD = 1;
var _PUTTYPE_LINE = 2;
var _PUTTYPE_POLYLINE = 3;
var _PUTTYPE_DRAWRECT = 4;
var _PUTTYPE_FILLRECT = 5;
var _PUTTYPE_FILLRECTR = 6;
var _PUTTYPE_DRAWARC = 7;
var _PUTTYPE_FILLARC = 8;
var _PUTTYPE_CLIP = 9;
var _PUTTYPE_SPRITE = 10;
var _PUTTYPE_SPRITE2 = 11;
var _PUTTYPE_SPRITES = 12;
var _PUTTYPE_MONSTER = 13;
var _PUTTYPE_WORD2 = 14;
var _PUTTYPE_DRAWRECTR = 15;
var _PUTTYPE_FILLPANEL = 16;
var _PUTTYPE_CLIPON = 17;
var _PUTTYPE_CLIPOFF = 18;

var MODE_INIT = 0;
var MODE_START = 1;
var MODE_LOGO = 2;
var MODE_TITLE = 3;
var MODE_MAIN = 4;
var MODE_INFO = 5;
var MODE_GAME = 6;
var MODE_TWITTER = 7;
var MODE_ALBUM = 8;
var MODE_GETDATA = 9;
var MODE_HELP = 10;
var MODE_OMAKE = 11;
var MODE_END = 12;
var MODE_SALVAGE = 13;

var  GAME_loop	= 0;
var  GAME_mes	= 1;
var  GAME_wait = 2;
var  GAME_fade = 3;
var  GAME_next = 4;
var  GAME_bg = 5;
var  GAME_win = 6;
var  GAME_cal = 7;
var  GAME_select = 8;
var  GAME_movie = 9;
var  GAME_chara = 10;
var  GAME_point = 11;
var  GAME_filt = 12;
var  GAME_qua = 13;
var  GAME_load = 14;
var  GAME_syswin = 15;
var  GAME_eos = 16;
var  GAME_menu = 17;
var  GAME_log = 18;
var  GAME_nowindow = 19;
var  GAME_sewait = 20;
var  GAME_menuinit = 21;
var  GAME_uvctrl = 22;
var  GAME_timerwait = 23;
var  GAME_voicewait = 24;

var imgTL	= 0;
var imgTC	= 1;
var imgTR	= 2;
var imgCL	= 3;
var imgCC	= 4;
var imgCR	= 5;
var imgBL	= 6;
var imgBC	= 7;
var imgBR	= 8;

var ScreenWidthOrg	= 480;
var ScreenHeightOrg	= 320;
var ScreenWidth		= 480;
var ScreenHeight	= 320;

var fileURL	= "/android_asset/www/res/";

var _NULL	= -1;
var _KEY_BACK	= 0;

var	CHR_POSDATA = {
    "CHR_LEFT_O":128*480/640,			// 表示位置右外
    "CHR_LEFT":176*480/640,			// 表示位置右
    "CHR_CENTER":320*480/640,			// 表示位置中央
    "CHR_RIGHT":464*480/640,			// 表示位置左
    "CHR_RIGHT_O":512*480/640,			// 表示位置左外
};

var ResPng	= "res/png/";
var ResPngA	= "/android_asset/www/res/png/";
var PanelTypeColor = [
/*
    [0x00afe3,0x0057ae,0x003388,],
    [0xfaaf91,0xb9987d,0x7f6c71,],
    [0x002750,0x002750,0x000000,],
    [0x00d8f3,0x0096cf,0x00d8f3],
*/
    [0xeeeeee,0xd7d7d7,0x696969,],
    [0xfaaf91,0xb9987d,0x7f6c71,],
    [0xd7d7d7,0xd7d7d7,0x000000,],
    [0xeeeeee,0xeeeeee,0xeeeeee],
];

var voiceWaitData = { 
    "pr_012":"19000",	
    "co4_756":"2000",
    "co7_455":"4000",
    "co7_457":"3000",
    "co7_458":"8000",
    "co7_460":"3000",
    "co7_462":"3000",
    "co7_464":"4000",
    "co7_465":"4000",
}
var seWaitData = { 
    "se00_00":"1000",	
    "se00_01":"1000",	
    "se00_03":"1000",	
    "se00_04":"1000",	
    "se00_05":"1000",	
    "se00_06":"1000",	
    "se00_07":"1000",	
    "se00_08":"1000",	
    "se00_10":"1000",	
    "se00_14":"2000",	
    "se00_15":"3000",	
    "se00_16":"1000",	
    "se00_18":"1000",	
    "se00_19":"1000",	
    "se00_20":"1000",	
    "se00_21":"4000",	
    "se01_03":"1000",	
    "se01_04":"5000",	
    "se01_08":"3000",	
    "se01_11":"2000",	
    "se01_18":"5000",	
    "se01_27":"8000",	
    "se01_29":"1000",	
    "se01_31":"11000",	
    "se01_34":"6000",	
    "se01_37":"1000",	
    "se02_00":"1000",	
    "se02_03":"1000",	
    "se02_05":"1000",	
    "se02_08":"1000",	
    "se02_17":"1000",	
    "se02_20":"1000",	
    "se02_21":"1000",	
    "se02_22":"1000",	
    "se02_24":"1000",	
    "se02_25":"1000",	
    "se02_30":"1000",	
    "se02_31":"1000",	
    "se02_33":"1000",	
    "se02_38":"1000",	
    "se02_39":"1000",	
    "se02_42":"1000",	
    "se02_48":"1000",	
    "se02_49":"1000",	
    "se02_53":"4000",	
    "se02_55":"1000",	
    "se02_60":"3000",	
    "se02_62":"1000",	
    "se02_63":"1000",	
    "se02_64":"1000",	
    "se02_66":"1000",	
    "se02_69":"1000",	
    "se02_71":"1000",	
    "se02_72":"2000",	
    "se02_75":"1000",	
    "se02_78":"1000",	
    "se02_79":"3000",	
    "se02_84":"1000",	
    "se02_87":"1000",	
    "se02_90":"2000",	
    "se02_94":"1000",	
    "se02_96":"3000",	
    "se02_99":"6000",	
    "se02_a0":"1000",	
    "se02_a1":"1000",	
    "se02_a2":"1000",	
    "se03_04":"1000",	
    "se03_06":"1000",	
    "se03_09":"4000",	
    "se03_10":"2000",	
    "se03_11":"1000",	
    "se03_12":"4000",	
    "se03_13":"4000",	
    "se03_15":"1000",	
    "se03_20":"1000",	
    "se03_22":"1000",	
    "se03_23":"1000",	
    "se03_24":"1000",	
    "se03_26":"4000",	
    "se03_27":"1000",	
    "se03_28":"1000",	
    "se03_29":"1000",	
    "se03_32":"3000",	
    "se03_33":"1000",	
    "se03_37":"1000",	
    "se03_38":"1000",	
    "se03_46":"1000",	
    "se03_47":"1000",	
    "se03_54":"1000",	
    "se03_55":"1000",	
    "se03_61":"1000",	
    "se03_63":"2000",	
    "se03_72":"1000",	
    "se03_73":"1000",	
    "se03_76":"3000",	
    "se03_85":"1000",	
    "se03_89":"1000",	
    "se03_91":"1000",	
    "se03_a1":"2000",	
    "se03_a3":"1000",	
    "se03_a4":"2000",	
    "se03_a5":"1000",	
    "se03_a9":"3000",	
    "se03_b0":"1000",	
    "se03_b1":"2000",	
    "se03_b2":"6000",	
    "se03_c0":"6000",	
    "se03_c1":"1000",	
    "se03_c2":"1000",	
    "se03_c4":"1000",	
    "se03_c5":"1000",	
    "se03_c6":"1000",	
    "se03_c7":"1000",	
    "se04_09":"4000",	
    "se04_11":"4000",	
    "se04_12":"3000",	
    "se05_00":"1000",	
    "se05_02":"1000",	
    "se05_05":"3000",	
    "se05_07":"1000",	
    "se05_08":"1000",	
    "se05_09":"1000",	
    "se05_10":"1000",	
    "se05_13":"4000",	
    "se05_16":"2000",	
    "se05_18":"1000",	
    "se05_20":"1000",	
    "se05_26":"1000",	
    "se06_01":"1000",	
    "se06_05":"3000",	
    "se07_02":"3000",	
    "se07_04":"3000",	
    "se07_06":"4000",	
    "se07_10":"1000",	
    "se07_15":"4000",	
    "se07_20":"3000",	
    "se07_21":"1000",	
    "se07_22":"2000",	
    "se09_00":"5000",	
    "se09_01l":"16000",	
    "se09_02":"8000",	
    "se09_04":"5000",	
    "se09_09":"12000",	
    "se09_13":"6000",	
    "se09_15":"7000",	
    "se10_00":"8000",	
    "se10_05":"1000",	
    "se10_06":"2000",	
    "se10_12":"1000",	
    "se10_13":"28000",	
    "se10_14":"1000",	
};
var loopSEData = [
    "se01_01l",
    "se01_02l",
    "se01_09l",
    "se02_73l",
    "se03_21l",
    "se03_51l",
    "se04_00l",
    "se04_05l",
    "se04_08l",
    "se05_01l",
    "se05_03l",
    "se05_04l",
    "se05_22l",
    "se07_00l",
    "se07_01l",
    "se07_07l",
    "se07_23l",
    "se07_24l",
    "se07_25l",
    "se09_00l",
    "se09_01l",
    "se09_02l",
    "se09_03l",
    "se09_09l",
    "se10_04l",
    "se10_09l",
];

//var _ORSIZEH	= 320;
//var _SCSIZEH	= 450;
//var _ORSIZEH	= 344;
//var _SCSIZEH	= 480;
var _ORSIZEH	= 360;
var _SCSIZEH	= 448;


var bgColorData = {
//BGC_CH_CLOUD_TB:	// "曇"
    "bg_a01ar":"1",
    "bg_a10ar":"1",
    "bg_a11ar":"1",
    "bg_a13ar":"1",
    "bg_b08ar":"1",
    "bg_b09ar":"1",
    "bg_b10ar":"1",
    "bg_b11ar":"1",
    "bg_b12ar":"1",
    "bg_b13ar":"1",
    "bg_b14ar":"1",
    "bg_b15ar1":"1",
    "bg_b15ar2":"1",
    "bg_b16ar":"1",
    "bg_b17ar":"1",
    "bg_b22ar":"1",
    "bg_b23ar":"1",
//BGC_CH_EVENING_TB:	// "夕"
    "bg_a01e":"2",
    "bg_a10e":"2",
    "bg_a11e":"2",
    "bg_a13e":"2",
    "bg_b08e":"2",
    "bg_b09e":"2",
    "bg_b10e":"2",
    "bg_b11e":"2",
    "bg_b12e":"2",
    "bg_b13e":"2",
    "bg_b14e":"2",
    "bg_b15e1":"2",
    "bg_b15e2":"2",
    "bg_b16e":"2",
    "bg_b17e":"2",
    "bg_b22e":"2",
    "bg_b23e":"2",
//bgc_ch_dark_tb:	// "薄暗い（小屋・地下）"
    "bg_a02a1":"3",
    "bg_a02a2":"3",
    "bg_a02a3":"3",
    "bg_a02a4":"3",
    "bg_a02ar1":"3",
    "bg_a02ar2":"3",
    "bg_a02ar3":"3",
    "bg_a02ar4":"3",
    "bg_a02e1":"3",
    "bg_a02e2":"3",
    "bg_a02n1":"3",
    "bg_a02n3":"3",
    "bg_a02e3":"3",
    "bg_a02e4":"3",
    "bg_a02n5":"3",
    "bg_a02n7":"3",
    "bg_a02nr1":"3",
    "bg_a02nr3":"3",
    "bg_a02nr5":"3",
    "bg_a02nr7":"3",
    "bg_a03a1":"3",
    "bg_a03a2":"3",
    "bg_a03a3":"3",
    "bg_a03a4":"3",
    "bg_a03ar1":"3",
    "bg_a03ar2":"3",
    "bg_a03ar3":"3",
    "bg_a03ar4":"3",
    "bg_a03e1":"3",
    "bg_a03e2":"3",
    "bg_a03e3":"3",
    "bg_a03e4":"3",
    "bg_a03n1":"3",
    "bg_a03n3":"3",
    "bg_a03n5":"3",
    "bg_a03n7":"3",
    "bg_a03nr1":"3",
    "bg_a03nr3":"3",
    "bg_a03nr5":"3",
    "bg_a03nr7":"3",
    "bg_a04a":"3",
    "bg_a04ar":"3",
    "bg_a04e":"3",
    "bg_a04n1":"3",
    "bg_a04nr1":"3",
    "bg_a05a1":"3",
    "bg_a05a2":"3",
    "bg_a05a3":"3",
    "bg_a05a4":"3",
    "bg_a05ar1":"3",
    "bg_a05ar2":"3",
    "bg_a05ar3":"3",
    "bg_a05ar4":"3",
    "bg_a05e1":"3",
    "bg_a05e2":"3",
    "bg_a05e3":"3",
    "bg_a05e4":"3",
    "bg_a05n1":"3",
    "bg_a05n3":"3",
    "bg_a05n5":"3",
    "bg_a05n7":"3",
    "bg_a05nr1":"3",
    "bg_a05nr3":"3",
    "bg_a05nr5":"3",
    "bg_a05nr7":"3",
    "bg_a06a1":"3",
    "bg_a06a2":"3",
    "bg_a06a3":"3",
    "bg_a06a4":"3",
    "bg_a06ar1":"3",
    "bg_a06ar2":"3",
    "bg_a06ar3":"3",
    "bg_a06ar4":"3",
    "bg_a06e1":"3",
    "bg_a06e2":"3",
    "bg_a06e3":"3",
    "bg_a06e4":"3",
    "bg_a06n1":"3",
    "bg_a06n3":"3",
    "bg_a06n5":"3",
    "bg_a06n7":"3",
    "bg_a06nr1":"3",
    "bg_a06nr3":"3",
    "bg_a06nr5":"3",
    "bg_a06nr7":"3",
    "bg_a07a":"3",
    "bg_a07ar":"3",
    "bg_a07e":"3",
    "bg_a07n1":"3",
    "bg_a07nr1":"3",
    "bg_a08a1":"3",
    "bg_a08a2":"3",
    "bg_a08a3":"3",
    "bg_a08a4":"3",
    "bg_a08ar1":"3",
    "bg_a08ar2":"3",
    "bg_a08ar3":"3",
    "bg_a08ar4":"3",
    "bg_a08e1":"3",
    "bg_a08e2":"3",
    "bg_a08e3":"3",
    "bg_a08e4":"3",
    "bg_a08n1":"3",
    "bg_a08n3":"3",
    "bg_a08n5":"3",
    "bg_a08n7":"3",
    "bg_a08nr1":"3",
    "bg_a08nr3":"3",
    "bg_a08nr5":"3",
    "bg_a08nr7":"3",
    "bg_a09n1":"3",
    "bg_a09n2":"3",
    "bg_a09n7":"3",
    "bg_a09n8":"3",
    "bg_a12n1":"3",
    "bg_a12n4":"3",
    "bg_b07n1":"3",
    "bg_b07n4":"3",
    "bg_b19n1":"3",
    "bg_b19n3":"3",
    "bg_b20n1":"3",
    "bg_b21n1":"3",
//bgc_ch_night_tb:	// "夜"
    "bg_a01n1":"4",
    "bg_a01n2":"4",
    "bg_a01nr1":"4",
    "bg_a01nr2":"4",
    "bg_a10n":"4",
    "bg_a10nr":"4",
    "bg_a11n":"4",
    "bg_a11nr":"4",
    "bg_a13n":"4",
    "bg_a13nr":"4",
    "bg_b08n1":"4",
    "bg_b08n2":"4",
    "bg_b08nr1":"4",
    "bg_b08nr2":"4",
    "bg_b09n":"4",
    "bg_b09nr":"4",
    "bg_b10n":"4",
    "bg_b10nr":"4",
    "bg_b11n":"4",
    "bg_b11nr":"4",
    "bg_b12n":"4",
    "bg_b12nr":"4",
    "bg_b13n":"4",
    "bg_b13nr":"4",
    "bg_b14n":"4",
    "bg_b14nr":"4",
    "bg_b15n1":"4",
    "bg_b15n2":"4",
    "bg_b15nr1":"4",
    "bg_b15nr2":"4",
    "bg_b16n1":"4",
    "bg_b16n2":"4",
    "bg_b16nr1":"4",
    "bg_b16nr2":"4",
    "bg_b17n":"4",
    "bg_b17nr":"4",
    "bg_b22n":"4",
    "bg_b22nr":"4",
    "bg_b23n":"4",
    "bg_b23nr":"4",
    "bg_b01nr1":"4",
//bgc_ch_dark_night1_tb:	// "暗闇１（小屋・地下）"
    "bg_a02n2":"5",
    "bg_a02n4":"5",
    "bg_a02n6":"5",
    "bg_a02n8":"5",
    "bg_a02nr2":"5",
    "bg_a02nr4":"5",
    "bg_a02nr6":"5",
    "bg_a02nr8":"5",
    "bg_a03n2":"5",
    "bg_a03n4":"5",
    "bg_a03n6":"5",
    "bg_a03n8":"5",
    "bg_a03nr2":"5",
    "bg_a03nr4":"5",
    "bg_a03nr6":"5",
    "bg_a03nr8":"5",
    "bg_a04n2":"5",
    "bg_a04nr2":"5",
    "bg_a05n2":"5",
    "bg_a05n4":"5",
    "bg_a05n6":"5",
    "bg_a05n8":"5",
    "bg_a05nr2":"5",
    "bg_a05nr4":"5",
    "bg_a05nr6":"5",
    "bg_a05nr8":"5",
    "bg_a06n2":"5",
    "bg_a06n4":"5",
    "bg_a06n6":"5",
    "bg_a06n8":"5",
    "bg_a06nr2":"5",
    "bg_a06nr4":"5",
    "bg_a06nr6":"5",
    "bg_a06nr8":"5",
    "bg_a07n2":"5",
    "bg_a07nr2":"5",
    "bg_a08n2":"5",
    "bg_a08n4":"5",
    "bg_a08n6":"5",
    "bg_a08n8":"5",
    "bg_a08nr2":"5",
    "bg_a08nr4":"5",
    "bg_a08nr6":"5",
    "bg_a08nr8":"5",
    "bg_a09n3":"5",
    "bg_a09n4":"5",
    "bg_a09n5":"5",
    "bg_a09n6":"5",
    "bg_a12n2":"5",
    "bg_a12n3":"5",
    "bg_b19n2":"5",
    "bg_b19n4":"5",
    "bg_b20n2":"5",
    "bg_b21n2":"5",
//bgc_ch_dark_night2_tb:	// "暗闇２（スフィア）"
    "bg_b01n2":"6",
    "bg_b01n4":"6",
    "bg_b01nr2":"6",
    "bg_b01nr4":"6",
    "bg_b02n2":"6",
    "bg_b02n4":"6",
    "bg_b03n2":"6",
    "bg_b03n4":"6",
    "bg_b04n2":"6",
    "bg_b04n4":"6",
    "bg_b05nr1":"6",
    "bg_b05nr2":"6",
    "bg_b06n2":"6",
    "bg_b07n2":"6",
    "bg_b07n3":"6",
    "bg_b18n2":"6",
    "bg_c03n2":"6",
};
