window.onload = function(){
	// 回调,设置页面高度
	if(window.parent.setLogHight){
		window.parent.setLogHight(document.body.scrollHeight + 40);
	}
	
 	// 快捷键
	KeyboardJS.on(parent.setting.hotkeyFocusBugId, function(e) {
		if(parent.parent.bugIDFocus){
			parent.parent.bugIDFocus();
		}
	});
}