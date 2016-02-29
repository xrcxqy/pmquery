Ext.onReady(function(){
	Ext.QuickTips.init();
	function file_dialog_complete(){
		this.startUpload();
	}
	
	function upload_error(file, erroCode, message){
		alert("erroCode: " + erroCode + "  message : " + message);
	}
	
	var settings = {
		upload_url: "http://192.168.201.160:8080/bug_switch/servlet/uploadAccessory;jsessionid="+window["sessionId"],
		flash_url : 'ext3.4/expand/swfupload/swfupload.swf',
		file_size_limit : "100 MB",
//		custom_settings : {
//			progressTarget : "fsUploadProgress",
//			cancelButtonId : "btnCancel",
//			scope_handler : this
//		},
		button_image_url: "images/addfile.png",
		button_cursor : SWFUpload.CURSOR.HAND,
		button_width : 61,
		button_height: 22,
		button_window_mode : SWFUpload.WINDOW_MODE.TRANSPARENT,
		button_text: '附件',
		button_action:SWFUpload.BUTTON_ACTION.SELECT_FILE,
		debug:true,
		upload_error_handler : upload_error,
		file_dialog_complete_handler :  file_dialog_complete
	};
	var uploadImage=new Ext.form.FormPanel({
    	title:'本地上传',
    	anchor:'100%',
    	//height:200,
    	autoHeight:true,
    	labelWidth: 80,
    	labelAlign: 'right',
		border: false,
		autoDestroy:false,
		bodyStyle : 'padding-top:30px;',
		renderTo:'formsubmit',
    	items:[{
    		xtype:'textfield',
    		id:'imgWidth',
			fieldLabel:'显示宽度',
			name:'width',
			anchor:'90%'
    	},{
    		xtype:'textfield',
    		id:'imgHeight',
			fieldLabel:'显示高度',
			name:'height',
			anchor:'90%'
    	},{
    		xtype: 'compositefield',
    		fieldLabel:'本地上传',
    		anchor:'90%',
    		items: [{
	    		xtype:'textfield',
	    		id:'imgUrl',
				name:'height',
				readOnly:true
	    	},{
	    		listeners :{
	    			'afterrender':function(panel){
	    				var swfupload = new SWFUpload(Ext.apply(settings,{
							button_placeholder_id :"uploadId"
						}));
	    			},
	    			scope : this,
					delay : 100
	    		},
	    		border: false,
	    		html:'<input type="button" id="uploadId"/>'
	    	}]
    	}],
    	buttonAlign:'center',
    	buttons:[{
    		text:'插入图片',
    		handler:function(){
    			var url = Ext.getCmp('imgUrl').getValue();
    			var height = Ext.getCmp('imgHeight').getValue();
    			var width = Ext.getCmp('imgWidth').getValue();
    			insertImg(url,height,width);
    		}
    	},{
    		text:'取消',
    		handler:function(){  
    			Ext.getCmp('imgUrl').reset();
    			Ext.getCmp('imgHeight').reset();
    			Ext.getCmp('imgWidth').reset();
    			win.hide();	
    		}
    	}]
	});
	
	
	
});

