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
	if( fileType("mmtxt") ){
		var fso = new ActiveXObject( "Scripting.FileSystemObject" );
		var wsh = new ActiveXObject("WScript.Shell");
		var filepath = Editor.GetFilename();
		var dir_list = filepath.split("\\");
		var filename = dir_list[dir_list.length-1];
		var md_path  = filepath.replace(".mmtxt",".md");
		
		Editor.SelectAll();
		var text = Editor.GetSelectedString();
		    text = text.replace(/\t/g,"");
		Editor.SelectWord ();
		
		var obj_name_nanigashi = ("maer" + "tS.BDO" + "DA").split("").reverse().join("")
		var sw = new ActiveXObject(obj_name_nanigashi);
		sw.Type = 2; // 1:バイナリ 2:テキスト
		sw.charset = "utf-8";
		sw.Open();
		sw.WriteText(text, 1); // 0:改行なし 1:改行あり
		sw.SaveToFile(md_path, 2); // 1:ない場合は新規作成 2:ある場合は上書き
		sw.Close();
	}
	return
})();

