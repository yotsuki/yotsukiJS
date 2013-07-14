// androidÇÕcordovaÇphonegapÇ…
var pPlugin = function() {
};

function _success(r) {
//    console.log("ssssssssssssssssssssss:"+r);
}
function _error(e) {
//    console.log("eeeeeeeeeeeeeeeeeeeeee:"+e);
}

pPlugin.prototype.SoundPlay = function(no) {
    if(SoundFlag == 1){
	this.soundplay(""+no,
		       function(r){_success(r)},
		       function(e){_error(e)}
		      );
    }
}
pPlugin.prototype.SoundStop = function(no) {
    if(SoundFlag == 1){
	this.soundstop(""+no,
		       function(r){_success(r)},
		       function(e){_error(e)}
		      );
    }
}
pPlugin.prototype.SoundClear = function() {
    this.soundclear("",
		   function(r){_success(r)},
		   function(e){_error(e)}
		  );
}
pPlugin.prototype.SoundRestart = function() {
    this.soundrestart("",
		      function(r){_success(r)},
		      function(e){_error(e)}
		     );
}
pPlugin.prototype.PlaySE = function(no) {
    if(SoundFlag == 1){
	this.playse(""+no,
		       function(r){_success(r)},
		       function(e){_error(e)}
		      );
    }
}
pPlugin.prototype.StopSE = function(no) {
    if(SoundFlag == 1){
	this.stopse("",
		       function(r){_success(r)},
		       function(e){_error(e)}
		      );
    }
}
pPlugin.prototype.PlaySE2 = function(no) {
    if(SoundFlag == 1){
	this.playse2(""+no,
		       function(r){_success(r)},
		       function(e){_error(e)}
		      );
    }
}
pPlugin.prototype.StopSE2 = function(no) {
    if(SoundFlag == 1){
	this.stopse2("",
		       function(r){_success(r)},
		       function(e){_error(e)}
		      );
    }
}
pPlugin.prototype.PlayVoice = function(no) {
    if(SoundFlag == 1){
	this.playvoice(""+no,
		       function(r){_success(r)},
		       function(e){_error(e)}
		      );
    }
}
pPlugin.prototype.StopVoice = function(no) {
    if(SoundFlag == 1){
	this.stopvoice("",
		       function(r){_success(r)},
		       function(e){_error(e)}
		      );
    }
}
pPlugin.prototype.SetImage = function(_no,_str) {
    loadingCount++;
    SetImageNum++;
    this.setimage(""+_str+","+_no,
		  function(fileInfo){
		      var _id = parseInt(fileInfo.id);
//		      console.log("hhhhhhhhhh:"+_id);
		      _Img[_id] = new Image();
		      var _data = fileInfo.data;		// pngÇÃbase64string
		      _data = _data.replace(/-/g,"+");	// androidÇÃbase64Ç∆à·Ç§ÇÃÇ≈èCê≥
		      _data = _data.replace(/_/g,"/");	// androidÇÃbase64Ç∆à·Ç§ÇÃÇ≈èCê≥
		      _Img[_id].src =  "data:image/png;base64,"+_data;	// ì™Ç…ÉfÅ[É^ÇÇ¬ÇØÇƒsrcÇ…ì¸ÇÍçûÇﬁ
		      loadingCount--;
//		      delete _id;
//		      delete _data;
		  },
		  function(e){
		      _error(e);
		      loadingCount--;
		  }
		 );
}
pPlugin.prototype.SetProgress = function() {
    if(devicetype == 2){
	this.setprogress("",
			 function(r){_success(r)},
			 function(e){_error(e)}
			);
    }
}
pPlugin.prototype.SetProgressW = function(word) {
    if(devicetype == 2){
	this.setprogress(""+word,
			 function(r){_success(r)},
			 function(e){_error(e)}
			);
    }
}
pPlugin.prototype.DelProgress = function() {
    if(devicetype == 2){
	this.delprogress("",
			 function(r){_success(r)},
			 function(e){_error(e)}
			);
    }
}
pPlugin.prototype.SetSaveProgress = function() {
    if(devicetype == 1){
	this.setprogress("",
			 function(r){_success(r)},
			 function(e){_error(e)}
			);
    }
}
pPlugin.prototype.DelSaveProgress = function() {
    if(devicetype == 1){
	this.delprogress("",
			 function(r){_success(r)},
			 function(e){_error(e)}
			);
    }
}
pPlugin.prototype.GetData = function() {
//        console.log("sssssssssssxx");
    this.getdata("",
		     function(r){_success(r)},
		     function(e){_error(e)}
		    );
}
pPlugin.prototype.ChkVoice = function() {
  _plugin.chkvoice("",
                   function(r){
                     //                     console.log("............."+r);
		       var rflag;
		       if(devicetype == 1){
			   rflag = r;
		       }
		       else {
			   rflag = r.flag;
		       }
                       if(parseInt(rflag) == 1){
			   //                       console.log(".............oooo"+r);
			   VoiceFlag        = true;
                       }
                       else{
			   //                       console.log(".............xxxx"+r);
			   VoiceFlag        = true;
                       }
                   },
                   function(e){
                       VoiceFlag        = true;
                   }
                  );
}
pPlugin.prototype.SetWebview = function(_str) {
  this.webview(""+_str,
               function(r){_success(r)},
               function(e){_error(e)}
               );
}

pPlugin.prototype.ChkMovie = function() {
  _plugin.chkmovie("",
                   function(r){
		       var rflag;
		       if(devicetype == 1){
			   rflag = r;
		       }
		       else {
			   rflag = r.flag;
		       }
                       if(parseInt(rflag) == 1){
			   ChkMovieFlag        = true;
                       }
                       else{
			   ChkMovieFlag        = false;
                       }
                   },
                   function(e){
		       ChkMovieFlag        = false;
                   }
                  );
}
pPlugin.prototype.ChkStore = function() {
//    console.log("yyyyyyyyyyyyyyyyyyyy store");
    _plugin.chkstore("",
                     function(r){
			 var rflag;
			 if(devicetype == 1){
			     rflag = r;
			 }
			 else {
			     rflag = r.flag;
			 }
			 if(parseInt(rflag) == 1){
			     ChkStoreFlag        = true;
			 }
			 else{
			     ChkStoreFlag        = false;
			 }
                     },
                     function(e){
			 ChkStoreFlag        = false;
                     }
                    );
}
pPlugin.prototype.ChkWebview = function() {
  _plugin.chkwebview("",
                   function(r){
		       var rflag;
		       if(devicetype == 1){
			   rflag = r;
		       }
		       else {
			   rflag = r.flag;
		       }
                       if(parseInt(rflag) == 1){
			   ChkWebviewFlag        = true;
                       }
                       else{
			   ChkWebviewFlag        = false;
                       }
                   },
                   function(e){
		       ChkWebviewFlag        = false;
                   }
                  );
}
pPlugin.prototype.SetTipsDialog = function(_str) {
  this.dialog(""+_str,
               function(r){_success(r)},
               function(e){_error(e)}
               );
}


pPlugin.prototype.toast = function(directory,successCallback, failureCallback) {
    if(devicetype == 0){
	return;
    }
    return PhoneGap.exec(
	successCallback,	//Success callback from the plugin      
	failureCallback,	//Error callback from the plugin
	'pPlugin',		//Tell PhoneGap to run "pPluginPlugin" Plugin
	'toast',		//Tell plugin, which action we want to perform
	[directory]);		//Passing list of args to the plugin
};
pPlugin.prototype.soundplay = function(directory,successCallback, failureCallback) {
    if(devicetype == 0){
	return;
    }
    return PhoneGap.exec(
	successCallback,    //Success callback from the plugin      
	failureCallback,     //Error callback from the plugin
	'pPlugin',  //Tell PhoneGap to run "pPluginPlugin" Plugin
	'soundplay',              //Tell plugin, which action we want to perform
	[directory]);        //Passing list of args to the plugin
};
pPlugin.prototype.soundstop = function(directory,successCallback, failureCallback) {
    if(devicetype == 0){
	return;
    }
    return PhoneGap.exec(
	successCallback,    //Success callback from the plugin      
	failureCallback,     //Error callback from the plugin
	'pPlugin',  //Tell PhoneGap to run "pPluginPlugin" Plugin
	'soundstop',              //Tell plugin, which action we want to perform
	[directory]);        //Passing list of args to the plugin
};
pPlugin.prototype.soundclear = function(directory,successCallback, failureCallback) {
    if(devicetype == 0){
	return;
    }
    return PhoneGap.exec(
	successCallback,    //Success callback from the plugin      
	failureCallback,     //Error callback from the plugin
	'pPlugin',  //Tell PhoneGap to run "pPluginPlugin" Plugin
	'soundclear',              //Tell plugin, which action we want to perform
	[directory]);        //Passing list of args to the plugin
};
pPlugin.prototype.soundrestart = function(directory,successCallback, failureCallback) {
    if(devicetype == 0){
	return;
    }
    return PhoneGap.exec(
	successCallback,    //Success callback from the plugin      
	failureCallback,     //Error callback from the plugin
	'pPlugin',  //Tell PhoneGap to run "pPluginPlugin" Plugin
	'soundrestart',              //Tell plugin, which action we want to perform
	[directory]);        //Passing list of args to the plugin
};
pPlugin.prototype.getdllist = function(directory,successCallback, failureCallback) {
    if(devicetype == 0){
	return;
    }
    return PhoneGap.exec(
	successCallback,	//Success callback from the plugin      
	failureCallback,	//Error callback from the plugin
	'pPlugin',		//Tell PhoneGap to run "pPluginPlugin" Plugin
	'getdllist',		//Tell plugin, which action we want to perform
	[directory]);		//Passing list of args to the plugin
};
pPlugin.prototype.movie = function(directory,successCallback, failureCallback) {
    if(devicetype == 0){
	return;
    }
    return PhoneGap.exec(
	successCallback,	//Success callback from the plugin      
	failureCallback,	//Error callback from the plugin
	'pPlugin',		//Tell PhoneGap to run "pPluginPlugin" Plugin
	'movie',		//Tell plugin, which action we want to perform
	[directory]);		//Passing list of args to the plugin
};
pPlugin.prototype.playse = function(directory,successCallback, failureCallback) {
    if(devicetype == 0){
	return;
    }
    return PhoneGap.exec(
	successCallback,    //Success callback from the plugin      
	failureCallback,     //Error callback from the plugin
	'pPlugin',  //Tell PhoneGap to run "pPluginPlugin" Plugin
	'playse',              //Tell plugin, which action we want to perform
	[directory]);        //Passing list of args to the plugin
};
pPlugin.prototype.stopse = function(directory,successCallback, failureCallback) {
    if(devicetype == 0){
	return;
    }
    return PhoneGap.exec(
	successCallback,    //Success callback from the plugin      
	failureCallback,     //Error callback from the plugin
	'pPlugin',  //Tell PhoneGap to run "pPluginPlugin" Plugin
	'stopse',              //Tell plugin, which action we want to perform
	[directory]);        //Passing list of args to the plugin
};
pPlugin.prototype.playse2 = function(directory,successCallback, failureCallback) {
    if(devicetype == 0){
	return;
    }
    return PhoneGap.exec(
	successCallback,    //Success callback from the plugin      
	failureCallback,     //Error callback from the plugin
	'pPlugin',  //Tell PhoneGap to run "pPluginPlugin" Plugin
	'playse2',              //Tell plugin, which action we want to perform
	[directory]);        //Passing list of args to the plugin
};
pPlugin.prototype.stopse2 = function(directory,successCallback, failureCallback) {
    if(devicetype == 0){
	return;
    }
    return PhoneGap.exec(
	successCallback,    //Success callback from the plugin      
	failureCallback,     //Error callback from the plugin
	'pPlugin',  //Tell PhoneGap to run "pPluginPlugin" Plugin
	'stopse2',              //Tell plugin, which action we want to perform
	[directory]);        //Passing list of args to the plugin
};
pPlugin.prototype.playvoice = function(directory,successCallback, failureCallback) {
    if(devicetype == 0){
	return;
    }
    return PhoneGap.exec(
	successCallback,    //Success callback from the plugin      
	failureCallback,     //Error callback from the plugin
	'pPlugin',  //Tell PhoneGap to run "pPluginPlugin" Plugin
	'playvoice',              //Tell plugin, which action we want to perform
	[directory]);        //Passing list of args to the plugin
};
pPlugin.prototype.stopvoice = function(directory,successCallback, failureCallback) {
    if(devicetype == 0){
	return;
    }
    return PhoneGap.exec(
	successCallback,    //Success callback from the plugin      
	failureCallback,     //Error callback from the plugin
	'pPlugin',  //Tell PhoneGap to run "pPluginPlugin" Plugin
	'stopvoice',              //Tell plugin, which action we want to perform
	[directory]);        //Passing list of args to the plugin
};
pPlugin.prototype.setimage = function(directory,successCallback, failureCallback) {
    if(devicetype == 0 || devicetype == 1){
	return;
    }
    return PhoneGap.exec(
	successCallback,    //Success callback from the plugin      
	failureCallback,     //Error callback from the plugin
	'pPlugin',  //Tell PhoneGap to run "pPluginPlugin" Plugin
	'setimage',              //Tell plugin, which action we want to perform
	[directory]);        //Passing list of args to the plugin
};
pPlugin.prototype.setprogress = function(directory,successCallback, failureCallback) {
    if(devicetype == 0){
	return;
    }
    return PhoneGap.exec(
	successCallback,    //Success callback from the plugin      
	failureCallback,     //Error callback from the plugin
	'pPlugin',  //Tell PhoneGap to run "pPluginPlugin" Plugin
	'setprogress',              //Tell plugin, which action we want to perform
	[directory]);        //Passing list of args to the plugin
};
pPlugin.prototype.delprogress = function(directory,successCallback, failureCallback) {
    if(devicetype == 0){
	return;
    }
    return PhoneGap.exec(
	successCallback,    //Success callback from the plugin      
	failureCallback,     //Error callback from the plugin
	'pPlugin',  //Tell PhoneGap to run "pPluginPlugin" Plugin
	'delprogress',              //Tell plugin, which action we want to perform
	[directory]);        //Passing list of args to the plugin
};
pPlugin.prototype.getdata = function(directory,successCallback, failureCallback) {
    if(devicetype == 0 || devicetype == 1){
	return;
    }
    return PhoneGap.exec(
	successCallback,    //Success callback from the plugin      
	failureCallback,     //Error callback from the plugin
	'pPlugin',  //Tell PhoneGap to run "pPluginPlugin" Plugin
	'getdata',              //Tell plugin, which action we want to perform
	[directory]);        //Passing list of args to the plugin
};
pPlugin.prototype.store = function(directory,successCallback, failureCallback) {
    if(devicetype == 0){
	return;
    }
    return PhoneGap.exec(
	successCallback,	//Success callback from the plugin      
	failureCallback,	//Error callback from the plugin
	'pPlugin',		//Tell PhoneGap to run "pPluginPlugin" Plugin
	'store',		//Tell plugin, which action we want to perform
	[directory]);		//Passing list of args to the plugin
};
pPlugin.prototype.chkvoice = function(directory,successCallback, failureCallback) {
    if(devicetype == 0){
	return;
    }
    return PhoneGap.exec(
	successCallback,	//Success callback from the plugin      
	failureCallback,	//Error callback from the plugin
	'pPlugin',		//Tell PhoneGap to run "pPluginPlugin" Plugin
	'chkvoice',		//Tell plugin, which action we want to perform
	[directory]);		//Passing list of args to the plugin
};
pPlugin.prototype.getmacadd = function(directory,successCallback, failureCallback) {
    if(devicetype == 0){
	return;
    }
    return PhoneGap.exec(
	successCallback,	//Success callback from the plugin      
	failureCallback,	//Error callback from the plugin
	'pPlugin',		//Tell PhoneGap to run "pPluginPlugin" Plugin
	'getmacadd',		//Tell plugin, which action we want to perform
	[directory]);		//Passing list of args to the plugin
};
pPlugin.prototype.webview = function(directory,successCallback, failureCallback) {
    if(devicetype == 0){
	return;
    }
    return PhoneGap.exec(
	successCallback,	//Success callback from the plugin      
	failureCallback,	//Error callback from the plugin
	'pPlugin',		//Tell PhoneGap to run "pPluginPlugin" Plugin
	'webview',		//Tell plugin, which action we want to perform
	[directory]);		//Passing list of args to the plugin
};
pPlugin.prototype.kabegami = function(directory,successCallback, failureCallback) {
    if(devicetype == 0){
	return;
    }
    return PhoneGap.exec(
	successCallback,	//Success callback from the plugin      
	failureCallback,	//Error callback from the plugin
	'pPlugin',		//Tell PhoneGap to run "pPluginPlugin" Plugin
	'kabegami',		//Tell plugin, which action we want to perform
	[directory]);		//Passing list of args to the plugin
};
pPlugin.prototype.chkmovie = function(directory,successCallback, failureCallback) {
    if(devicetype == 0){
	return;
    }
    return PhoneGap.exec(
	successCallback,	//Success callback from the plugin      
	failureCallback,	//Error callback from the plugin
	'pPlugin',		//Tell PhoneGap to run "pPluginPlugin" Plugin
	'chkmovie',		//Tell plugin, which action we want to perform
	[directory]);		//Passing list of args to the plugin
};
pPlugin.prototype.chkwebview = function(directory,successCallback, failureCallback) {
    if(devicetype == 0){
	return;
    }
    return PhoneGap.exec(
	successCallback,	//Success callback from the plugin      
	failureCallback,	//Error callback from the plugin
	'pPlugin',		//Tell PhoneGap to run "pPluginPlugin" Plugin
	'chkwebview',		//Tell plugin, which action we want to perform
	[directory]);		//Passing list of args to the plugin
};
pPlugin.prototype.chkstore = function(directory,successCallback, failureCallback) {
    if(devicetype == 0){
	return;
    }
    return PhoneGap.exec(
	successCallback,	//Success callback from the plugin      
	failureCallback,	//Error callback from the plugin
	'pPlugin',		//Tell PhoneGap to run "pPluginPlugin" Plugin
	'chkstore',		//Tell plugin, which action we want to perform
	[directory]);		//Passing list of args to the plugin
};
pPlugin.prototype.wait = function(directory,successCallback, failureCallback) {
    if(devicetype == 0){
	return;
    }
    return PhoneGap.exec(
	successCallback,	//Success callback from the plugin      
	failureCallback,	//Error callback from the plugin
	'pPlugin',		//Tell PhoneGap to run "pPluginPlugin" Plugin
	'wait',		//Tell plugin, which action we want to perform
	[directory]);		//Passing list of args to the plugin
};
pPlugin.prototype.dialog = function(directory,successCallback, failureCallback) {
    if(devicetype != 1){
	return;
    }
    return PhoneGap.exec(
	successCallback,	//Success callback from the plugin      
	failureCallback,	//Error callback from the plugin
	'pPlugin',		//Tell PhoneGap to run "pPluginPlugin" Plugin
	'dialog',		//Tell plugin, which action we want to perform
	[directory]);		//Passing list of args to the plugin
};
pPlugin.prototype.appexit = function(directory,successCallback, failureCallback) {
    if(devicetype == 0){
	return;
    }
    return PhoneGap.exec(
	successCallback,	//Success callback from the plugin      
	failureCallback,	//Error callback from the plugin
	'pPlugin',		//Tell PhoneGap to run "pPluginPlugin" Plugin
	'appexit',		//Tell plugin, which action we want to perform
	[directory]);		//Passing list of args to the plugin
};
pPlugin.prototype.readdata = function(directory,successCallback, failureCallback) {
    if(devicetype == 0){
	return;
    }
    return PhoneGap.exec(
	successCallback,	//Success callback from the plugin      
	failureCallback,	//Error callback from the plugin
	'pPlugin',		//Tell PhoneGap to run "pPluginPlugin" Plugin
	'readdata',		//Tell plugin, which action we want to perform
	[directory]);		//Passing list of args to the plugin
};
pPlugin.prototype.writedata = function(directory,successCallback, failureCallback) {
    if(devicetype == 0){
	return;
    }
    return PhoneGap.exec(
	successCallback,	//Success callback from the plugin      
	failureCallback,	//Error callback from the plugin
	'pPlugin',		//Tell PhoneGap to run "pPluginPlugin" Plugin
	'writedata',		//Tell plugin, which action we want to perform
	[directory]);		//Passing list of args to the plugin
};
