/*
* 現在開いているファイルのフォルダを開く
*/
(function(){
	var wsh = new ActiveXObject("WScript.Shell");
	var path = Editor.GetFilename().replace(/[^\\]*$/, "" );
	wsh.run('"' + path + '"');
	return
})();