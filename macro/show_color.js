
/*
* �I�������J���[�R�[�h�̐F��ʃE�B���h�E�ŕ\������
* �E�B���h�E�̓N���b�N����ƕ��܂�
* ��1�j00f �� ��I�����A�}�N�������s����
* ��2�jrgba(255,0,0,1) �� rgba�`���ɂ��Ή����Ă܂�
* 
* �������@
* show_color.html��C�ӂ̏ꏊ�ɂ����Avar path�̕������C�����Ă��������B
*/

(function(){
	// show_color.html����ꂽ�ꏊ�̃p�X�ɕύX���Ă��������B
	var path = "C:\\mydesk\\program\\sakura\\macro\\show_color.html";
	
	var color = Editor.GetSelectedString(0);
	var wsh = new ActiveXObject("WScript.Shell");
	wsh.Run('mshta "' + path + '#' + color + '"');
})()


/*
// ie���g���o�[�W�����B
// �N���܂ł��኱�x��

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