/*
* htmlやjsを、エディタではなくChromeで開く
*/
(function(){
	var wsh = new ActiveXObject("WScript.Shell");
	var fileType = function(str){
		var reg = new RegExp("\." + str + "$");
		return reg.test(Editor.GetFilename())
	}
	
	if( fileType("html") || fileType("htm") || fileType("js") || fileType("md") || fileType("markdown") ){
		wsh.Run('chrome -url "' + Editor.GetFilename(0) + '"');
	}
	return
})();

