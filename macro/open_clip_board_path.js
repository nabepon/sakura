/*
* クリップボードにコピーしたパスを開く
*/
(function(){
	var wsh = new ActiveXObject("WScript.Shell");
	var clipboard = Editor.GetClipboard(0);
	
	var open_chrome = 0;
	var document = new ActiveXObject('htmlfile');
	var window = document.parentWindow;
	
	var checkMatch = function(str,check_list){
		for(var i in check_list){
			if( str.match(check_list[i]) ){
				return true
			}
		}
		return false;
	}
	
	if( checkMatch(clipboard, "09_運営,07_schedule".split(",") )){
		open_chrome = ( window.confirm("Chromeで開きますか？") )?1:0;
	}
	
	if(open_chrome){
		wsh.Run('chrome -url "' + clipboard + '"');
	}else{
		wsh.Run('"'+ clipboard +'"');
	}
	
	return
})();