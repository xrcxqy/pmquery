
/**
 * 点击申请三方评审
 */
function applyTripartitReview(){
	alert(bugInfo.operateSystem);
	Ext.Ajax.request({
		url: 'servlet/cafService',
		method: 'POST',
		params: {
			'type':'tripartiteReview',
			'serviceInfoBean.operateSystem':bugInfo.operateSystem
		},
		success: function(response, options){
			var result = Ext.util.JSON.decode(response.responseText);
			if(result.success){
				dealPeople.setValue(result.userList);
			}else{
				alert(result.msg);
			}
		},
		failure: function(response, options){                
			
		}
	});
}


/**
 * 镜像BUG
 */
var mirrorBugWin;
function mirrorBug(){
	if(!mirrorBugWin){
		mirrorBugWin = new Ext.Window({
        	title:'BUG 镜像',
            layout:'fit',
            width:300,
            height:400,
            closeAction:'hide',
            plain: true,
            items: new Ext.form.FormPanel({
            	labelWidth: 50, 
		        frame:true,
		        bodyStyle:'padding:5px 5px 0',
		        defaults: {width: 240},
		        defaultType: 'textfield',
		        items: [
		                ExtFormUtil.getComboboxAddFieldVbox({
				        	name : 'queryBean.operateSystemJoin',
				        	fieldLabel : '操作系统',
				        	emptyText : '请选择操作系统',
				        	anchor : ExtFormUtil.anchoreTreeToOne,
				        	store : ExtFormUtil.getCommonComboBoxStore({
										url:'servlet/operateSystem',
										params:{type:'queryAllNoDelete'}
				        		    })
				        })
		        	]
            }),
            buttonAlign:'center',
            buttons: [{
                text:'提交',
                handler: function() {
                	var from = mirrorBugWin.items.items[0];
                	var mirrorOSList = from.items.items[0].getValue();
					
                	if(!mirrorOSList){
                		friendAlert("请至少选择一个操作系统进行镜像");
                	}
                	Ext.Ajax.request({
						url: 'servlet/bugInfo',
						method: 'POST',
						params: {
							'type':'mirrorBug',
							'bugId':bugInfo.bugId,
							'bugInfoExp.mirrorOSList' : mirrorOSList
						},
						success: function(response, options){
							var result = Ext.util.JSON.decode(response.responseText);
							if(result.success){
								Ext.Msg.alert(result.msg);
//								setTimeout(function(){
//									document.location.reload();
//								},5000);
								mirrorBugWin.hide();
							}else{
								friendAlert("Same As 操作失败. 原因:" + result.msg,2);
							}
						},
						failure: function(response, options){                
							
						}
					});
        		}
            }]
        });
    }
	mirrorBugWin.show(this);
}


/**
 * SAME AS 功能窗口
 * 
 */
var sameAsBugWin;
function sameAsBug(){
    if(!sameAsBugWin){
        sameAsBugWin = new Ext.Window({
        	title:'BUG SameAs',
            layout:'fit',
            width:400,
            height:220,
            closeAction:'hide',
            plain: true,
            items: new Ext.form.FormPanel({
            	labelWidth: 100, 
		        frame:true,
		        bodyStyle:'padding:5px 5px 0',
		        defaults: {width: 240},
		        defaultType: 'textfield',
		        items: [{
						id:'sameAsBugId',
		        		xtype:'numberfield',
		        		helpText:'只有在PGTTL/PTGTTL确认后,才能将ID小的BUG same as到ID大的BUG',
		                fieldLabel: 'SameAs BUGID',
		                allowBlank:false,
		                value:bugInfo.sameAsBugId
		            },{
		            	id:'sameAsBugReason',
		            	xtype:'textarea',
		            	height:100,
		                fieldLabel:'原因'
		    	}]
            }),
            buttonAlign:'center',
            buttons: [{
                text:'提交',
                handler: function() {
                	var from = sameAsBugWin.items.items[0];
                	var sameId = from.items.items[0];
                	var reason = from.items.items[1];
					
                	if(!sameId.getValue()){
                		friendAlert("请填写BugID");
                		return;
                	}
					
                	Ext.Ajax.request({
						url: 'servlet/bugInfo',
						method: 'POST',
						params: {
							'type':'sameAs',
							'bugId':bugInfo.bugId,
							'bugInfoExp.sameAsBugId' : sameId.getValue(),
							'bugInfoExp.reason':reason.getValue()
						},
						success: function(response, options){
							var result = Ext.util.JSON.decode(response.responseText);
							if(result.success){
								friendAlert("bug SameAs 操作成功.<br/> 系统于3秒后自动刷新",2);
								setTimeout(function(){
									document.location.reload();
								},3000);
								sameAsBugWin.hide();
							}else{
								friendAlert("Same As 操作失败. 原因:" + result.msg,2);
							}
						},
						failure: function(response, options){                
							
						}
					});
        		}
            },{
                text: '取消',
                handler: function(){
                    sameAsBugWin.hide();
                }
            },{
           	 	text: '清除SameAs Bug' + bugInfo.sameAsBugId,
           	 	hidden:!bugInfo.sameAsBugId,
                handler: function(){
                    Ext.MessageBox.confirm('提示','是否确定清除SameAs BUG:' + bugInfo.sameAsBugId,function(btn){
						if(btn == 'yes'){
							Ext.Ajax.request({
								url: 'servlet/bugInfo',
								method: 'POST',
								params: {
									'type':'sameAsDel',
									'bugId':bugInfo.bugId
								},
								success: function(response, options){
									var result = Ext.util.JSON.decode(response.responseText);
									if(result.success){
										friendAlert("清空Same As Bug 操作成功.<br/> 系统于3秒后自动刷新",2);
										setTimeout(function(){
											document.location.reload();
										},3000);
										sameAsBugWin.hide();
									}else{
										friendAlert("Same As 操作失败. 原因:" + result.msg,2);
									}
								},
								failure: function(response, options){                
									
								}
							});
						}
					});
                }
            }]
        });
    }
    sameAsBugWin.show(this);
}

/**
 * BUG同步功能窗口
 */
var bugSynchronousWin;
function bugSynchronous(){
	if(!bugSynchronousWin){
		var url = "<iframe src='" + oldBugSystemUrl + "/branch/query_branch_by_bug.asp?";
		if(bugInfo.mirrorBugId){
			url += "bugid=" + bugInfo.mirrorBugId + "'";
		}else {
			url += "bugid=" + bugInfo.bugId+ "'";
		}
		url+=" scrolling='auto' style='width:100%;height:100%;margin:0;padding:0'></iframe>";
		bugSynchronousWin = new Ext.Window({
			width:1100,  
			closeAction:'hide',
			title:'BUG信息同步',
            height:370,  
            modal:true,  
            html:url
            //html:"<iframe src=" + oldBugSystemUrl + "/branch/query_branch_by_bug.asp?bugid=206182' scrolling='auto' style='width:100%;height:100%;margin:0;padding:0'></iframe>" 
		});
	}
	bugSynchronousWin.show(this);
}


//关注BUG
function attentionBug(){
	var attentiontbar = Ext.getCmp("attention");
	Ext.Ajax.request({
		url: 'servlet/attention',
		method: 'POST',
		params: {
			'type':'changeAttention',
			'bugId':bugInfo.bugId,
			'isAttention':attentiontbar.isAttention
		},
		success: function(response, options){
			var result = Ext.util.JSON.decode(response.responseText);
			if(result.success){
				if(attentiontbar.isAttention){
					attentiontbar.isAttention = false;
					attentiontbar.setText("关注BUG");
					attentiontbar.setIconClass('tbar_attention');
					friendAlert("BUG已取消关注");
				}else{
					attentiontbar.isAttention = true;
					attentiontbar.setText("取消关注");
					attentiontbar.setIconClass('tbar_unattention');
					friendAlert("BUG关注成功");
				}
			}
		}
	});
}

function saveAsTemplate(){
	
	Ext.MessageBox.prompt('保存为模板', '请输入模板名称:', function(btn, value){
		if(btn == "ok"){
			if(value.trim() == ""){
				alert("模板名称不能为空");
				saveAsTemplate();
			}else{
				Ext.Ajax.request({
					url: 'servlet/bugInfoTemplate',
					method: 'POST',
					params: {
						'type':'saveTemplate',
						'templateName':value,
						'bugId':bugInfo.bugId
					},
					success: function(response, options){
						var result = Ext.util.JSON.decode(response.responseText);
						if(result.success){
							friendAlert("保存模板成功",3);
						}
					}
				});
			}
		}
	});
}
//旧版本兼容
function adjustOldBug(){
	Ext.Ajax.request({
		url: 'servlet/bugInfo',
		method: 'POST',
		params: {
			'type':'adjustOldBug',
			'bugId':bugInfo.bugId
		},
		success: function(response, options){
			var result = Ext.util.JSON.decode(response.responseText);
			if(result.success){
				if(result.msg){
					
					var msg = "兼容旧版本信息操作成功.<br/> " + result.msg +"<br/> 是否需要重新载入该BUG";
					Ext.MessageBox.confirm('提示',msg,function(btn){
						if(btn == 'yes'){
							document.location.reload();
						}
					});
				}else{
					friendAlert("无任何变更,当前BUG已经兼容新版本",3);
				}
			}
		}
	});
}

// 打开主页
function homePage(){
	window.open("servlet/main");	
}

// 刷新
function refresh(){
	document.location.reload();
}

// 打开BUG
function openTagByBUGID(BUGID){
	parent.openTabBUGID(BUGID);
}
