/*
* htmlやjsを、エディタではなくChromeで開く
*/
(function(){
	// 変数
	var wsh = new ActiveXObject("WScript.Shell");
	var filepath = Editor.GetFilename();
	var dir_list = filepath.split("\\");
	var filename = dir_list[dir_list.length-1];
	
	// 関数
	var fileType = function(str){
		var reg = new RegExp("\." + str + "$");
		return reg.test(Editor.GetFilename())
	}
	
	// 判定
	if( fileType("html") || fileType("htm") || fileType("js") || fileType("md") || fileType("markdown") ){
		wsh.Run('chrome -url "' + Editor.GetFilename(0) + '"');
	}
	if( fileType("java") ){
		// 編集中のファイルに出力するには引数に3を渡す
		Editor.ExecCommand('\"javac ' + filename + ' & java ' + filename.replace('.java','') + '\"', 1);
	}
	return
})();

