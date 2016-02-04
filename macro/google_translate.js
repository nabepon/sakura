/*
* サクラで選択中の文字列をGoogle翻訳する
*/
(function(){
	var wsh = new ActiveXObject("WScript.Shell");
	var translateUrl = "http://translate.google.com/?sl=en&tl=jp&q=";
	var str = Editor.GetSelectedString(0);
	wsh.Run('chrome -url ' + translateUrl + encodeURI(str));
	return
})();
