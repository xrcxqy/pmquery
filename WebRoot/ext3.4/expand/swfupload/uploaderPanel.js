/*
	If all uploads succeed: {"success":true}
	If an upload fails: {"success":false,"error":"Reason for error!"}
*/
var keel={};

keel.UploadPanel = function(cfg){
	this.width = 510;
	this.height = 200;
	Ext.apply(this,cfg);	
	this.gp = new Ext.grid.GridPanel({
		border :false,
		store: new Ext.data.Store({
			fields:['id','name','type','size','state','percent','uploaddata']
		}),
	    columns: [
	    	new Ext.grid.RowNumberer(),
	        {header: '文件名',	width: 150,	sortable: true,dataIndex: 'name', 	 menuDisabled:true},
	        {header: '类型',   	width: 70, 	sortable: true,dataIndex: 'type', 	 menuDisabled:true},
	        {header: '大小', 	width: 100, sortable: true,dataIndex: 'size', 	 menuDisabled:true,renderer:this.formatFileSize},
	        {header: '进度', 	width: 150, sortable: true,dataIndex: 'percent', menuDisabled:true,renderer:this.formatProgressBar,scope:this},
	        {header: '状态', 	width: 70, 	sortable: true,dataIndex: 'state',   menuDisabled:true,renderer:this.formatFileState,scope:this},
	        {header: '&nbsp;',	width: 50,				   dataIndex:'id', 		 menuDisabled:true,renderer:this.formatDelBtn}       
	    ]			
	});
	this.setting = {
		upload_url : this.uploadUrl, 
		flash_url : this.flashUrl,
		file_size_limit : this.fileSize || (1024*280) ,//上传文件体积上限，单位MB
		file_post_name : this.filePostName,
		file_types : this.fileTypes,  //允许上传的文件类型 
		post_params : this.postParams,
		use_query_string : true,
		button_cursor : SWFUpload.CURSOR.HAND,
		button_window_mode : SWFUpload.WINDOW_MODE.TRANSPARENT,
		custom_settings : {//自定义参数
			scope_handler : this
		},
		file_queued_handler : this.onFileQueued,
		file_dialog_start_handler : function(){},// 当文件选取对话框弹出前出发的事件处理函数
		file_dialog_complete_handler : this.onDiaogComplete,//当文件选取对话框关闭后触发的事件处理
		upload_start_handler : this.onUploadStart,// 开始上传文件前触发的事件处理函数
		upload_success_handler : this.onUploadSuccess,// 文件上传成功后触发的事件处理函数 
		upload_progress_handler : this.uploadProgress,
		upload_complete_handler : this.onUploadComplete,
		upload_error_handler : this.onUploadError,
		file_queue_error_handler : this.onFileError
	};
	keel.UploadPanel.superclass.constructor.call(this,{				
		tbar : [
			{text:'添加文件',	iconCls:'fileupload_add',    ref:'../addBtn'},'-',
			{text:'上传',	iconCls:'fileupload_upload', ref:'../uploadBtn',handler:this.startUpload,	scope:this},'-',
			{text:'停止上传',	iconCls:'fileupload_stop',   ref:'../stopBtn',	handler:this.stopUpload,	scope:this,disabled:true},'-',
			{text:'删除所有',	iconCls:'fileupload_del',	 ref:'../deleteBtn',handler:this.deleteAll,		scope:this},'-'
		],
		layout : 'fit',
		items : [this.gp],
		listeners : {
			
			// 绑定添加附件按钮到swfupload
			'afterrender':function(){
				var em = this.getTopToolbar().get(0).el.child('em');
				var placeHolderId = Ext.id();
				em.setStyle({
					position : 'relative',
					display : 'block'
				});
				em.createChild({
					tag : 'div',
					id : placeHolderId
				});
				this.swfupload = new SWFUpload(Ext.apply(this.setting,{
					button_width : em.getWidth(),
					button_height : em.getHeight(),
					button_placeholder_id :placeHolderId
				}));
				this.swfupload.uploadStopped = false;
				Ext.get(this.swfupload.movieName).setStyle({
					position : 'absolute',
					top : 0,
					left : -2
				});				
			},
			scope : this,
			delay : 100
		}
	});
}
Ext.extend(keel.UploadPanel,Ext.Panel,{
	// 设置按钮可见性
	toggleBtn :function(bl){
		this.addBtn.setDisabled(bl);
		this.uploadBtn.setDisabled(bl);
		this.deleteBtn.setDisabled(bl);
		this.stopBtn.setDisabled(!bl);
		this.gp.getColumnModel().setHidden(6,bl);
	},
	
	// 在文件上传前触发
 	onUploadStart : function(file) {  
	   var post_params = this.settings.post_params;  
	   Ext.apply(post_params,{//处理中文参数问题
	   		//fileName : file.name,
	        fileName : encodeURIComponent(file.name)
	   });  
	   this.setPostParams(post_params);  
	},
	
	// 点击上传文件按钮
	startUpload : function() {
		if (this.swfupload) {
			if (this.swfupload.getStats().files_queued > 0) {
				this.swfupload.uploadStopped = false;
				this.toggleBtn(true);
				this.swfupload.startUpload();
			}
		}
	},
	
	// 格式化文件大小信息
	formatFileSize : function(_v, celmeta, record) {
		return Ext.util.Format.fileSize(_v);
	},
	
	// 格式化文件状态
	formatFileState : function(n){//文件状态
		switch(n){
			case -1 : return '未上传';
			break;
			case -2 : return '正在上传';
			break;
			case -3 : return '<div style="color:red;">上传失败</div>';
			break;
			case -4 : return '上传成功';
			break;
			case -5 : return '取消上传';
			break;
			default: return n;
		}
	},
	
	// 格式化进度条
	formatProgressBar : function(v){
		var progressBarTmp = this.getTplStr(v);
		return progressBarTmp;
	},
	getTplStr : function(v){
		var bgColor = "orange";
	    var borderColor = "#008000";
		return String.format(
			'<div>'+
				'<div style="border:1px solid {0};height:10px;width:{1}px;margin:4px 0px 1px 0px;float:left;">'+		
					'<div style="float:left;background:{2};width:{3}%;height:10px;"><div></div></div>'+
				'</div>'+
			'<div style="text-align:center;float:right;width:40px;margin:3px 0px 1px 0px;height:10px;font-size:12px;">{3}%</div>'+			
		'</div>', borderColor,(90),bgColor, v);
	},
	
	// 当上传队列中的一个文件完成了一个上传周期 无论是失败还是成功
	onUploadComplete : function(file) {
		var me = this.customSettings.scope_handler;
		if(file.filestatus==-4){
			var ds = me.gp.store;
			for(var i=0;i<ds.getCount();i++){
				var record =ds.getAt(i);
				if(record.get('id')==file.id){
					record.set('percent', 100);
					if(record.get('state')!=-3){
						record.set('state', file.filestatus);
					}
					record.commit();
				}
			}
		}
		
		if (this.getStats().files_queued > 0 && this.uploadStopped == false) {
			this.startUpload();
		}else{			
			me.toggleBtn(false);
			me.linkBtnEvent();
		}		
	},
	
	//当文件选择对话框关闭消失时，如果选择的文件成功加入上传队列，
	//那么针对每个成功加入的文件都会触发一次该事件（N个文件成功加入队列，就触发N次此事件）
	onFileQueued : function(file) {
		var me = this.customSettings.scope_handler;
		var rec = new Ext.data.Record({
			id : file.id,
			name : file.name,
			size : file.size,
			type : file.type,
			state : file.filestatus,
			percent : 0
		})
		me.gp.getStore().add(rec);
	},
	
	// 上传文件
	onUploadSuccess : function(file, serverData) {
		var me = this.customSettings.scope_handler;
		var ds = me.gp.store;
		var msg = Ext.util.JSON.decode(serverData);
		if (msg.success) {			
			for(var i=0;i<ds.getCount();i++){
				var rec =ds.getAt(i);
				if(rec.get('id')==file.id){
					rec.set('state', file.filestatus);
					rec.set('uploaddata',msg.uploadData);
					rec.commit();
				}
			}			
		}else{
			for(var i=0;i<ds.getCount();i++){
				var rec =ds.getAt(i);
				if(rec.get('id')==file.id){
					rec.set('percent', 0);
					rec.set('state', -3);
					rec.commit();
				}
			}
		}
		me.linkBtnEvent();
	},
	
	//处理进度条
	uploadProgress : function(file, bytesComplete, totalBytes){
		var me = this.customSettings.scope_handler;
		var percent = Math.ceil((bytesComplete / totalBytes) * 100);
		percent = percent == 100? 99 : percent;
       	var ds = me.gp.store;
		for(var i=0;i<ds.getCount();i++){
			var record =ds.getAt(i);
			if(record.get('id')==file.id){
				record.set('percent', percent);
				record.set('state', file.filestatus);
				record.commit();
			}
		}
	},
	
	// 上传失败提示
	onUploadError : function(file, errorCode, message) {
		var me = this.customSettings.scope_handler;
		me.linkBtnEvent();
		var ds = me.gp.store;
		for(var i=0;i<ds.getCount();i++){
			var rec =ds.getAt(i);
			if(rec.get('id')==file.id){
				rec.set('percent', 0);
				rec.set('state', file.filestatus);
				rec.commit();
			}
		}
	},
	
	// 文件加入队列失败
	onFileError : function(file,n){
		switch(n){
			case -100 : tip('待上传文件列表数量超限，不能选择！');
			break;
			case -110 : tip('文件太大，不能选择！');
			break;
			case -120 : tip('该文件大小为0，不能选择！');
			break;
			case -130 : tip('该文件类型不可以上传！');
			break;
		}
		function tip(msg){
			Ext.Msg.show({
				title : '提示',
				msg : msg,
				width : 280,
				icon : Ext.Msg.WARNING,
				buttons :Ext.Msg.OK
			});
		}
	},
	
	//当文件选取对话框关闭后触发的事件处理
	onDiaogComplete : function(){
		var me = this.customSettings.scope_handler;
		me.linkBtnEvent();
	},
	
	// 设置停止上传文件
	stopUpload : function() {
		if (this.swfupload) {
			this.swfupload.uploadStopped = true;
			this.swfupload.stopUpload();
		}
	},
	
	// 移除全部数据,并且返回已经上传的数据
	deleteAll : function(){
		var fileArr = new Array()
		var ds = this.gp.store;
		for(var i=0;i<ds.getCount();i++){
			var record =ds.getAt(i);
			var file_id = record.get('id');
			this.swfupload.cancelUpload(file_id,false);		
			
			// 获得上传的数据信息
			var uploadDate = record.get('uploaddata');
			if(uploadDate){
				fileArr.push(uploadDate);
			}
		}
		ds.removeAll();
		this.swfupload.uploadStopped = false;
		return fileArr;
	},
	
	// 单个移除
	formatDelBtn : function(v){
		//var me = this.customSettings.scope_handler;
//		return "<a href='#' id='"+v+"'  style='color:blue' class='link-btn' ext:qtip='移除该文件'>移除</a>";
		return "<input type='button' id='"+v+"' class='link-btn' value='移除' ext:qtip='移除该文件'/>";
	},
	linkBtnEvent : function(){
		Ext.select('input.link-btn',false,this.gp.el.dom).on('click',function(o,e){
			var ds = this.gp.store;
			for(var i=0;i<ds.getCount();i++){
				var rec =ds.getAt(i);
				if(rec.get('id')==e.id){
					ds.remove(rec);
				}
			}			
			this.swfupload.cancelUpload(e.id,false);
		},this);
	}
});
Ext.reg('uploadPanel',keel.UploadPanel);