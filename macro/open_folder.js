/*
* ���݊J���Ă���t�@�C���̃t�H���_���J��
*/
(function(){
	var wsh = new ActiveXObject("WScript.Shell");
	var path = Editor.GetFilename().replace(/[^\\]*$/, "" );
	wsh.run('"' + path + '"');
	return
})();