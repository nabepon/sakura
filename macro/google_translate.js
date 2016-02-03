/*
* ƒTƒNƒ‰‚Å‘I‘ð’†‚Ì•¶Žš—ñ‚ðGoogle–|–ó‚·‚é
*/
(function(){
	var wsh = new ActiveXObject("WScript.Shell");
	var translateUrl = "http://translate.google.com/?sl=en&tl=jp&q=";
	var str = Editor.GetSelectedString(0);
	wsh.Run('chrome -url ' + translateUrl + encodeURI(str));
	return
})();
