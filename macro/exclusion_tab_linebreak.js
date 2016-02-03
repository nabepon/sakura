(function() {
	var source = Editor.GetSelectedString(0);
	var result = source.replace(/\t/g,"").replace(/\r/g,"").replace(/\n/g,"");
	Editor.Delete();
	Editor.InsText(result);
})()



