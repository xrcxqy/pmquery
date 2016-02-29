/**
 * 扩展ExtJS htmlEditor插件，支持插入网络图片、本地上传图片功能
 */
Ext.namespace('Ext.ux','Ext.ux.plugins');  

/**
 * 图片上传扩展控件
 * @param {} config
 */
Ext.ux.plugins.ImageDialog=function(config){
	config=config||{};  
    Ext.apply(this,config);  
    var htmlEditorObj;
    var swfuploadId = Ext.id();
    var swfupload;
    // 进行部分基础数据初始化
    this.init=function(htmlEditor) {  
        this.editor = htmlEditor;  
        htmlEditorObj = htmlEditor;
        this.editor.on('render',onRender,this);
    };  
    
    // render 时候进行初始化,主要是进行添加图片上传按钮
    function onRender(){  
        if(!Ext.isSafari){  
//            this.editor.tb.add({  
//                itemId : 'htmlEditorImage',  
//                cls : 'x-btn-icon x-edit-insertimage',  
//                enableToggle : false,  
//                scope : this,  
//                handler : function(){  
//                    this.imageWin();  
//                },  
//                clickEvent : 'mousedown',  
//                tooltip : config.buttonTip ||{  
//                    title : '插入图片',  
//                    text : '插入图片到编辑器',  
//                    cls : 'x-html-editor-tip'  
//                },  
//                tabIndex :-1
//            });  
        	   this.editor.tb.insertButton(22,{  
                itemId : 'htmlEditorImage',  
                cls : 'x-btn-icon',  
                icon : "resource/img/buginfo/fileUpload_add.PNG",
                enableToggle : false,  
                scope : this,  
                handler : function(){  
                    this.imageWin();  
                },  
                clickEvent : 'mousedown',  
                tooltip : config.buttonTip ||{  
                    title : '插入图片',  
                    text : '插入图片到编辑器'
//                    cls : 'x-html-editor-tip'  
                }
//                ,  
//                tabIndex :-1
            }); 
        }  
    }  
    
    var win;
    
    //插入图片主窗口,包含网络图片和本地图片两种方式
    this.imageWin=function(){
    	win=new Ext.Window({
    		title:'插入图片',
    		width:400,
    		height:250,
    		resizable:false,
    		closeAction:'hide',
    		autoDestroy:false,
    		items:[{
    			xtype:'tabpanel',
    			anchor:'100%',
    			border: false,
    			activeTab: 0,
    			items:[
    			    uploadImage,
    			    webImg
    			]
    		}]
    	});
    	win.show();
    }
    
    //网络图片选项卡
    var webImg=new Ext.form.FormPanel({
    	title:'网络图片',
    	anchor:'100%',
    	//height:200,
    	autoHeight:true,
    	labelWidth: 80,
    	labelAlign: 'right',
		border: false,
		autoDestroy:false,
		bodyStyle : 'padding-top:30px;',
    	items:[{
    		xtype:'textfield',
			fieldLabel:'显示宽度',
			anchor:'90%'
    	},{
    		xtype:'textfield',
			fieldLabel:'显示高度',
			anchor:'90%'
    	},{
    		xtype:'textfield',
			fieldLabel:'图片网址',
			anchor:'90%',
			emptyText:'http://',
			allowBlank:false,
			blankText:'图片网址不能为空'
    	}],
    	buttonAlign:'center',
    	buttons:[{
    		text:'插入图片',
    		handler:function(){
    			var form = this.findParentByType('form');
    			var width = form.get(0).getValue();
    			var height = form.get(1).getValue();
    			var url = form.get(2).getValue();
    			insertImg(url,height,width);
    		}
    	},{
    		text:'关闭',
    		handler:function(){ 
    			this.findParentByType('form').form.reset();
    			win.hide();	
    		}
    	}]
    });
    
    //上传图片选项卡
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
    	items:[{
    		xtype:'textfield',
			fieldLabel:'显示宽度',
			anchor:'90%'
    	},{
    		xtype:'textfield',
			fieldLabel:'显示高度',
			anchor:'90%'
    	},{
    		xtype: 'compositefield',
    		fieldLabel:'本地上传',
    		anchor:'90%',
    		items: [{
		    		xtype:'textfield',
					readOnly:true
		    	},{
		    		xtype:'panel',
		    		border: false,
		    		listeners :{
		    			'afterrender':function(panel){
		    				if(!swfupload){
						    	swfupload = new SWFUpload({
						    		//swf配置
									upload_url: basePath +　"servlet/uploadAccessory;jsessionid="+window["sessionId"],
									flash_url : 'ext3.4/expand/swfupload/swfupload.swf',
									file_size_limit : "100 MB",
									file_types:config.filType || '*.JPG;*.jpg;*.PNG;*.png;*.gif;*.GIF;*.BMP;*.bmp;' ,
									post_params:{'type':'editImg'},
									prevent_swf_caching:false,
									// 按钮设置
									button_placeholder_id :	swfuploadId,
									button_image_url: basePath +　"ext3.4/expand/swfupload/images/addfile.png",
									button_width : 61,
									button_height: 22,
									button_text: '添加图片',
									button_text_style: ".theFont { font-size: 16; }",
									button_text_left_padding: 5,
									button_text_top_padding: 3,
									button_cursor : SWFUpload.CURSOR.HAND,
									button_window_mode : SWFUpload.WINDOW_MODE.TRANSPARENT,
									button_action:SWFUpload.BUTTON_ACTION.SELECT_FILE,
									
									// 事件
									file_dialog_complete_handler : file_dialog_complete,
									upload_success_handler:uploadSuccess,
									upload_progress_handler:uploadProgress 
								});
	    					}
		    			},
		    			scope : this,
						delay : 100
		    		},
		    		html:'<input type="button" id="'+ swfuploadId +'"/>'
		    	}]
	    	},{
	            xtype: 'progress',
	            anchor:'90%',
	            value: '未上传'
	     	}
	     ],
    	buttonAlign:'center',
    	buttons:[{
    		text:'插入图片',
    		handler:function(){
    			var form = this.findParentByType('form');
    			var width = form.get(0).getValue();
    			var height = form.get(1).getValue();
    			var url = form.get(2).items.items[0].getValue();
    			insertImg(url,height,width);
    		}
    	},{
    		text:'关闭',
    		handler:function(){  
    			this.findParentByType('form').form.reset();
    			win.hide();	
    		}
    	}]
	});
    
    // 根据图片的url,hight,width信息来插入图片
    function insertImg(url,hight,width){
    	if(url == ""){
    		friendAlert("请选择图片后在点击插入");
    		return;
    	}
		//确定插入上传的图片
		var img="<img src='"+url+"'";
		//高度不为空
		if(""!=hight){
			img+= " height="+hight;
		}
		//宽度不为空
		if(""!=width){
			img+= " width="+width
		}
		img+= " />";
		//插入图片
		if(!htmlEditorObj.activated){
			htmlEditorObj.activated = true;
		}
		htmlEditorObj.insertAtCursor(img);
		friendAlert("已插入图片,如果不继续添加图片,请点击关闭");
    }
    
    
    // swfupload 的部分方法实现
    function file_dialog_complete(){
		this.startUpload();
	}
	
	function uploadSuccess(file,response){
		uploadImage.get(3).updateProgress(1,'已上传100%');
		var result = Ext.util.JSON.decode(response);
		uploadImage.get(2).items.items[0].setValue(result.url);
	}
	
	function uploadProgress(file,complete,total){
		var i = complete/total;
		uploadImage.get(3).updateProgress(i, "已上传 : " + Math.round(100*i)+'%');
	}
}

