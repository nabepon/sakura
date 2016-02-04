
/*
* 選択したカラーコードの色を別ウィンドウで表示する
* ウィンドウはクリックすると閉じます
* 例1）00f ← を選択し、マクロを実行する
* 例2）rgba(255,0,0,1) ← rgba形式にも対応してます
* 
* 導入方法
* show_color.htmlを任意の場所におき、var pathの部分を修正してください。
*/

(function(){
	// show_color.htmlを入れた場所のパスに変更してください。
	var filename = Editor.GetFilename();
	var path = filename.replace(/js$/,"html").replace(/\\/,"\\\\");
	var document = new ActiveXObject('htmlfile');
	var color = Editor.GetSelectedString(0);
	var wsh = new ActiveXObject("WScript.Shell");
	wsh.Run('mshta "' + path + '#' + color + '"');
})()


/*
// ieを使うバージョン。
// 起動までが若干遅い

(function(){
	var color = Editor.GetSelectedString(0);
	var document = new ActiveXObject('htmlfile');
	var window = document.parentWindow;
	var js_str = "javascript:(function(){\
		document.onkeydown = function(){ window.close() };\
		document.body.onblur = function(){ window.close() };\
		document.body.style.background = '{color}';\
	})()".replace("{color}",color);
	var url = "https://rawgit.com/nabepon/sakura_editor_macro/master/color/show_color.html#" + js_str;
	var win = window.open(url ,"test","width=100, height=100, left=50, top=400, menubar=no, toolbar=no, location=no, status=no, resizable=yes ,scrollbars=no");
})()
*/