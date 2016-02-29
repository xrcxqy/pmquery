Ext.onReady(function() {
    Ext.QuickTips.init();
    Ext.MessageBox.wait('正在努力加载BUG信息中..', '请稍等...');
    
    
    var tbar=new Ext.Toolbar();
   	tbar.add({text:'SameAs',handler:sameAsBug,iconCls: 'sameAs',tooltip:'将该BugSame As 到其他Bug'});
    tbar.add('-');
//    tbar.add({text:'同步',handler:commonClick,iconCls: 'sameAs',tooltip:'将该同步到 到其他Bug'});
//    tbar.add('-');
    tbar.add({text:'三方评审人员',hidden:true,handler:applyTripartitReview,iconCls: 'sameAs',tooltip:'根据WCR人员组织架构信息自动填充三方评审人员'});
	
    tbar.add({text:'BUG同步',	handler:bugSynchronous,	iconCls: 'bugSynchronous'});
    tbar.add('-');
   
    tbar.add({text:'BUG镜像',	handler:mirrorBug,	iconCls: 'mirrorBug'});
    tbar.add('-');
    
	tbar.add('->');
//	tbar.add(attentionBtn);
	
	var attentioniconCls = "tbar_attention";
	var attentiontext= "关注BUG";
	if(bugInfo.attention){
		attentioniconCls = "tbar_unattention";
		attentiontext = "取消关注";
	}
	
	// 复制功能
	function urlToClipboard(copy_id,text) {
    	ZeroClipboard.setMoviePath("ext3.4/expand/zeroClipboard/ZeroClipboard.swf");
        var clip = new ZeroClipboard.Client();
        clip.setHandCursor(true);
        clip.setText(text);
        clip.glue(copy_id);
        clip.addEventListener('complete', function (client,text) {
            friendAlert("本BUG连接地址复制成功!");
        });
    }
    
	var copyBtn = new Ext.Button({
		id:'bug_url',
       	text:'复制BUG连接',
       	tooltip:'复制本BUG的地址',
       	iconCls:'tbar_copy',
       	listeners:{
           	'mouseover':function(){
           		var bugUrl = basePath + "servlet/viewBugInfo?type=showBugInfo&bugId=" + bugInfo.bugId;
           		urlToClipboard(this.id,bugUrl);
           	}
         }
  	});
  	
	tbar.add({text:'主页',hidden:parent.bugIDFocus, handler:homePage,iconCls: 'tbar_home',tooltip:'新标签页打开主页'});
  	tbar.add('-');
	tbar.add({text:'旧版本兼容',handler:adjustOldBug,iconCls: 'tbar_fix',tooltip:'系统将同步抄送人信息'});
	tbar.add('-');
	tbar.add(copyBtn);
	tbar.add('-');
	tbar.add({text:'刷新',	  handler:refresh,iconCls: 'tbar_refresh',tooltip:'重新加载最新信息'});
	tbar.add('-');
	tbar.add({id:'attention', isAttention:bugInfo.attention , text:attentiontext,handler:attentionBug,iconCls: attentioniconCls,tooltip:'关注该BUG,有任何新进展都会进行 邮件通知'});
	tbar.add('-');
	tbar.add({text:'保存为模板',handler:saveAsTemplate,iconCls: 'tbar_save_template',tooltip:'将BUG设置为模板,在提交BUG时候方便导入!'});
	tbar.add('-');
	var form = new Ext.form.FormPanel({
        region:'center',
		autoScroll:true,
		tbar:tbar,
		id:'formId',
        labelAlign: 'right',
        width   : '90%',
        bodyStyle: 'padding: 10px',
        defaults: {
           	anchor :'-20',
            width: 230
        },
   	 	border:false,
    	items:[{
      		xtype: 'fieldset',
     		title: 'Bug基本信息',
     		columnWidth: 0.5,
        	collapsible: true,
        	labelWidth: 100, 
        	defaults: {
           		anchor :'-20',
           	 	width: 230,
           	 	border:false
        	},
        	items: [{
        		// bug基本信息  一行3条记录
           	 	layout:'column',
            	items:[{
                	columnWidth:1/3,
                	layout: 'form',
                	border:false,
                	items: [bugId]
            	},{
                	columnWidth:1/3,
                	layout: 'form',
                	border:false,
                	items: [bugStateComb]
            	},{
                	columnWidth:1/3,
                	layout: 'form',
                	border:false,
                	items: [sameAsBugId]
            	}]
	      	},{
        		// bug基本信息  一行3条记录
           	 	layout:'column',
            	items:[{
                	columnWidth:1/3,
                	layout: 'form',
                	border:false,
                	items: [chargeCombo]
            	},{
                	columnWidth:1/3,
                	layout: 'form',
                	border:false,
                	items: [testChargeComb]
            	},{
                	columnWidth:1/3,
                	layout: 'form',
                	border:false,
                	items: [pstlCombo]
            	}]
	      	},{
        		// 多个归属人
           	 	layout:'column',
           	 	anchor:'65.5%',
            	items:[{
                	columnWidth:1/2,
                	layout: 'form',
                	border:false,
                	items: [vestingPeopleComb, vestingPeople2Comb,vestingPeople3Comb,vestingPeople4Comb]
            	},{
                	columnWidth:1/2,
                	layout: 'form',
                	border:false,
                	items: [checkerField,checkerField2,checkerField3,checkerField4]
            	}
//            	,{
//                	columnWidth:1/3,
//                	layout: 'form',
//                	border:false,
//                	items: [vestingPeople4Comb,checkerField4]
//            	}
            	]
	      	},{
	      		// bug基本信息  一行1条记录
           	 	layout:'column',
            	items:[{
                	columnWidth:1,
                	layout: 'form',
                	border:false,
                	items: [summaryField,dealPeople,ccUserField,uploadField,changeMessageArea,
                	resolved_analyse,resolved_solution,resolved_verification,resolved_moduleAffect,resolved_productAffect
                	]
            	}]
	      	},{
        		// bug基本信息  一行3条记录
           	 	layout:'column',
            	items:[{
                	columnWidth:1/3,
                	layout: 'form',
                	border:false,
                	items: [ResourceConsumptionField]
            	}]
	      	}]
        },{
      		xtype: 'fieldset',
     		title: '测试人员关注视图',
        	collapsible: true,
        	collapsed:setting.bugInfo_TestAreaCollapsed,
        	labelWidth: 100, 
        	defaults: {
           		anchor :'-20',
           	 	width: 230,
           	 	border:false
        	},
        	items: [{
           	 	layout:'column',
            	items:[{
                	columnWidth:1/3,
                	layout: 'form',
                	border:false,
                	items: [testMethodComb,repeatabilityComb,osCombo,testCaseNumField ,affectNumOfCase]
            	},{
                	columnWidth:1/3,
                	layout: 'form',
                	border:false,
                	items: [testCaseCombo,testabilityComb,comefromComb,specialField]
            	},{
                	columnWidth:1/3,
                	layout: 'form',
                	border:false,
                	items: [productCombo,testabilitySpecialComb,severityComb,priorityComb]
            	}]
	      	}
//	      	,{
//           	 	layout:'column',
//            	items:[{
//                	columnWidth:1,
//                	layout: 'form',
//                	border:false,
//                	items: [summaryField]
//            	}]
//	      	}
	      	]
        },{
      		xtype: 'fieldset',
     		title: '开发人员视图',
        	collapsible: true,
        	collapsed:setting.bugInfo_DevelopAreaCollapsed,
        	Labelwidth: 100, 
        	defaults: {
           		anchor :'-20',
           	 	width: 230,
           	 	border:false
        	},
        	items: [{
           	 	layout:'column',
            	items:[{
                	columnWidth:1/3,
                	layout: 'form',
                	border:false,
                	items: [webosComb,discoveryPhaseComb,resolutionComb,legacybugComb,bugReportField]
            	},{
                	columnWidth:1/3,
                	layout: 'form',
                	border:false,
                	items: [functionModuleCombo,bugCategoryComb,resolvedVersionField, needBugReportComb,delayProperty ]
            	},{
                	columnWidth:1/3,
                	layout: 'form',
                	border:false,
                	items: [relateProductsComb,includeStateComb,treeReviewComb,delayVersionComb,branchComb ]
            	}]
	      	},{
           	 	layout:'column',
            	items:[{
                	columnWidth:1/3,
                	layout: 'form',
                	border:false,
                	items: [oneKeyCollectionComb]
            	},{
                	columnWidth:1/3,
                	layout: 'form',
                	border:false,
                	items: [resolvedByCollectionCombo]
            	}]
	      	},{
           	 	layout:'column',
            	items:[{
                	columnWidth:1,
                	layout: 'form',
                	border:false,
                	items: [resolvedByCollectionReasonField,linkCAFIDfiled]
            	}]
	      	}]
        },{
      		xtype: 'fieldset',
     		title: '扩展属性',
        	collapsible: true,
        	collapsed:false,
        	Labelwidth: 100, 
        	defaults: {
           		anchor :'-20',
           	 	width: 230,
           	 	border:false
        	},
        	items: [{
           	 	layout:'column',
            	items:[{
                	columnWidth:1/3,
                	layout: 'form',
                	border:false,
                	items: [closeStepComb]
            	},{
                	columnWidth:1/3,
                	layout: 'form',
                	border:false,
                	items: [closeLoopComb]
            	}]
	      	},{
           	 	layout:'column',
            	items:[{
                	columnWidth:1,
                	layout: 'form',
                	border:false,
                	items: [closeStepInfoField,designCodingPrincipleArea]
            	}]
	      	}]
        },{
      		xtype: 'fieldset',
     		title: '<a class="underline" style="color: #15428B;" ext:qtip="日志显示不正常,请点击查看解决方案!" target="_Blank" href="help/html/commonError/error.jsp#logOneLine">日志信息</a>',
     		Labelwidth: 10, 
     		id:'logFieldSet',
        	collapsible: true,
        	layout:'fit',
        	height:30,
//        	autoHeight: false,
//        	height:"100%",
//        	url:'servlet/log?type=showLog&bugId='+ bugInfo.bugId,
        	html : '<iframe  id="logFrom" frameborder="0" width="100%" height="100%" src="servlet/log?type=showLog&bugId='+ bugInfo.bugId+'"></iframe>',
        	listeners:{  
				'expand':function(store, option ){
					var iframe = document.getElementById("logFrom").conentWindow;
					alert(iframe);
					if(this.hitmHeight){
						this.setHeight(this.hitmHeight);
					}	
					this.doLayout();
					Ext.getCmp("formId").doLayout();
				}
			} 
        }],
        buttonAlign:'center',
        buttons: [{
        	id:'submitBtnId',
  			text:'提交',
      		handler: function() {
      			submit(form);
      			//submitForm(form);
        	}
   		}]
	});
	
	scrollHander = form;

/**
 * 

//	// 初始化其他信息
//	var rollLastBtn = new Ext.Button({
//		renderTo: 'lookLastLog',
//		text:'查看最新纪录'
//	});
//	rollLastBtn.on("click",function(){
//		window.scrollTo(0,9999);
//	});
//	
//	// 初始化其他信息
//	var rollLastBtn = new Ext.Button({
//		renderTo: 'rollToTop',
//		text:'返回顶部'
//	});
//	rollLastBtn.on("click",function(){
//		window.scrollTo(0,0);
//	});
	
//	var panel = new Ext.Panel({
////		renderTo: 'buginfo',
//		 tbar:tbar,
//		layout:'fit',
//		autoHeight: true,
//        autoScroll:true,
////		height: 300,
//		hight:'100%',
//		items:[form]
//	});
*/
	
	var viewport = new Ext.Viewport({
        layout:'border',
        items:[
            form
         ]
    });
 
	initForm(form);
	
	
	// 快捷键
	KeyboardJS.on(setting.hotkeySbumitBugInfo, function(e) {
		submit(form);
      	//submitForm(form);
	});
	// 快捷键
	KeyboardJS.on(setting.hotkeyFocusBugId, function(e) {
		if(parent.bugIDFocus){
			parent.bugIDFocus();
		}
		
	});
});


// 提交表单,添加时间判断
function submit(form){
	Ext.Ajax.request({
		url: 'servlet/bugInfo',
		method: 'POST',
		params: {
			'type':'checkUpdateSubmit',
			'lastUpdatedate':bugInfo.lastUpdatedate,
			'bugId':bugInfo.bugId
		},
		success: function(response, options){
			var result = Ext.util.JSON.decode(response.responseText);
			if(result.canSubmit){
				submitForm(form);
			}else{
				var msg = '当前BUG于: ' + result.sysLastUpdate + " 更新过,请勿覆盖提交!" ;
				msg += '<br/> ' + '<a target="_Blank" href="help/html/info/show.jsp#infoShowLastUpdatedate">查看帮助</a>'
				Ext.MessageBox.show({
			        title: '系统提示',
			        msg: msg,
			       // buttons:  {yes:'查看最新信息', no:'继续覆盖提交(导致数据丢失)'+ result.bugId},
			        buttons:  {yes:'查看最新BUG信息'},
			        icon: Ext.MessageBox.WARNING,
			        fn: function(btn){
			        	if(btn == "yes"){
			        		window.open("servlet/viewBugInfo?type=showBugInfo&bugId=" + bugInfo.bugId);
			        	}
			        }
			    });
			}
		}
	});
}
	


// 提交表单
function submitForm(form){
	var valid = true;
	var validLabe = "";
    form.form.items.each(function(f){
       if(!f.validate()){
           valid = false;
           validLabe += f.fieldLabel + "; ";
       }
       if(f.disabled){
       		f.setDisabled(false);
       }
    });
    
	if(valid){
		form.form.submit({
			waitTitle : '提示',
     		waitMsg : '正在保存bug信息,请稍后...',
			url: "servlet/bugInfo",
			clientValidation:false,
			params: {
				'type':'update',
				'bugId':bugInfo.bugId
		    },
			success: function(form, options) {
				var result = options.result;
				//var result =action.result;
				if(result.success){
					friendAlert("修订BUG信息成功.<br/> 系统于3秒后自动刷新",2);
					setTimeout(function(){
						document.location.reload();
					},2500);
				}else{
					friendAlert(result.msg);
				}
		    },
		    failure: function(form, options){
		    	var result = options.result;
		    	if(result.msg){
		    		friendAlert(result.msg);
		    	}else{
		    		friendAlert("系统出错,请联系管理员",2);
		    	}
			}
		});
	}else {
		friendAlert("数据填写不完整,有如下数据未填写:<br/><br/>" + validLabe,3);
	}
}

// 设置日志的高度
function setLogHight(hight){
	Ext.getCmp("logFieldSet").hitmHeight = hight;
	Ext.getCmp("logFieldSet").setHeight(hight);
	Ext.MessageBox.hide();
}