/*
* �T�N���őI�𒆂̕������Google�|�󂷂�
*/
(function(){
	var wsh = new ActiveXObject("WScript.Shell");
	var translateUrl = "http://translate.google.com/?sl=en&tl=jp&q=";
	var str = Editor.GetSelectedString(0);
	wsh.Run('chrome -url ' + translateUrl + encodeURI(str));
	return
})();
