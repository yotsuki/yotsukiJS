function dialog() {
    var	_dok = false;
    var	_dng = false;

    this.title = "";
    this.message = "";
    this.ok = new object(0);
    this.ng = new object(0);
    this.flag = true;
    this.dialogok = false;
    this.dialogng = false;
// 確認ダイアログの表示プロセスの開始
    this._confirm	= function(button) {
	if(button == 2){
	    playSE("sysse02");
	    this.dialogng	= true;
	    _dng	= true;
	}
	else{
	    playSE("sysse01");
	    this.dialogok	= true;
	    _dok	= true;
	}
    }
    this._dismissed	= function(){
	playSE("sysse01");
	this.dialogok	= true;
	_dok	= true;
    }

    this.set	= function(title,message,ok,ng){
	this.dialogok = false;
	this.dialogng = false;
	_dok = false;
	_dng = false;
	if(devicetype == 0){
	    if(ng == ""){
		window.alert(message);
		this.dialogok	= true;
		_dok	= true;
	    }
	    else{
		if(window.confirm(message)){
		    this.dialogok	= true;
		    _dok	= true;
		    playSE("sysse01");
		}
		else{
		    this.dialogng	= true;
		    _dng	= true;
		    playSE("sysse02");
		}
	    }
	}
	else {
	    if(ng == ""){
		navigator.notification.alert(
		    message,		// メッセージ
		    this._dismissed,	// コールバック
		    title,		// タイトル
		    ok			// ボタン
		);
	    }
	    else{
		// 確認ダイアログの表示
		navigator.notification.confirm(
		    message,  // メッセージ
		    this._confirm,              // 選択されたボタンによって呼ばれるコールバック
		    title,            // タイトル
		    ok+","+ng	//"OK,Cancel"          // ボタン
		);
	    }
	}
    }
    this.put	= function(){
    }

    this.dialogOk	= function(){
	return	_dok;
    }
    this.dialogNo	= function(){
	return	_dng;
    }
}
