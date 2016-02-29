Ext.onReady(function() {
    Ext.QuickTips.init();
     var tbar=new Ext.Toolbar();
     tbar.add({text:'品控项目',handler:showHelpWin});
     tbar.add('-');
     tbar.add({text:'模块路径',handler:showModulePathWin});
     
     
	 var form = new Ext.form.FormPanel({
	 	tbar:tbar,
        labelAlign: 'left',
        region:'center',
        autoScroll:true,
//        boxMinWidth:700,
//        boxMaxWidth:1000,
        bodyStyle: 'padding: 10px',
        defaults: {
           	anchor :'-20',
            width: 230
        },
   	 	border:false,
    	items:[{
      		xtype: 'fieldset',
     		title: '提交新BUG',
        	collapsible: false,
        	labelWidth: 100, 
        	defaults: {
           		anchor :'-20',
           	 	width: 230
        	},
        	items: [{
           	 	layout:'column',
           	 	border:false,
           	 	bodyStyle:'margin-bottom:20px;',
            	items:[{
                	columnWidth:1/2,
                	layout: 'form',
                	border:false,
                	items: [loadBug]
            	},{
                	columnWidth:1/2,
                	layout: 'form',
                	border:false,
                	items: [bugInfoTemplateb]
            	}]
	      	},{
           	 	layout:'column',
           	 	border:false,
            	items:[{
                	columnWidth:1/2,
                	layout: 'form',
                	border:false,
//                	labelWidth: 100, 
                	items: [testMethodComb,productCombo,pstlCombo,functionModuleCombo,testabilityComb,oneKeyCollectionComb]
            	},{
	                columnWidth:1/2,
	                layout: 'form',
	                border:false,
//	                labelWidth: 100, 
	                items: [testCaseCombo,osCombo,chargeCombo,comefromComb,testabilitySpecialComb]
	            }]
	      	},{
           	 	layout:'column',
           	 	border:false,
            	items:[{
                	columnWidth:1,
                	layout: 'form',
                	border:false,
//                	labelWidth: 100, 
                	items: [testCaseNumField,summaryField,specialField,testTopologyArea,
                		topologyDescriptionArea,bugDescriptionArea,
                		debugMessageArea,versionMessageArea,testProcedureField,
                		productConfigArea,locateArea,ccUserField,uploadField]
            	}]
	      	},{
           	 	layout:'column',
           	 	border:false,
            	items:[{
                	columnWidth:1/2,
                	layout: 'form',
                	border:false,
//                	labelWidth: 100, 
                	items: [repeatabilityComb,legacybugComb,ResourceConsumptionField]
            	},{
	                columnWidth:1/2,
	                layout: 'form',
	                border:false,
//	                labelWidth: 100, 
	                items: [severityComb,affectNumOfCase,priorityComb]
	            }]
	      	},{
           	 	layout:'column',
           	 	border:false,
            	items:[{
                	columnWidth:1,
                	layout: 'form',
                	border:false,
//                	labelWidth: 100, 
                	items: [ideaAreaConfigArea]
            	}]
	      	}]
        }],
        buttonAlign:'center',
        buttons: [{
        	id:'submitBtnId',
  			text:'提交',
      		handler: function() {
      			submitForm(form)
        	}
   		},{
  			text:'重置',
      		handler: function() {
      			Ext.MessageBox.confirm('提示','是否确定重置提交表单',function(btn){
      				if(btn == 'yes'){
      					form.form.reset();
      				}
      			});
      		}
   		}]
	});
	
	
	// 布局
	var viewport = new Ext.Viewport({
        layout:'border',
        autoScroll:true,
        items:[form]
    });
	initForm(form);
	
	// 快捷键
	KeyboardJS.on(parent.setting.hotkeySbumitBugInfo, function(e) {
		submitForm(form);
	});
	// 快捷键
	KeyboardJS.on(parent.setting.hotkeyFocusBugId, function(e) {
		parent.bugIDFocus();
	});
});

// 提交表单
function submitForm(form){
	
	// 对表单数据完整性进行校验,并获取为填写完整的数据信息
	var valid = true;
	var validLabe = "";
	
	// 检查部分数据是否完善
    if(valid){
    	//1. 如果有一键收集,则必须包含有一键收集的附件
    	if(oneKeyCollectionComb.getValue()){
    		var uploadFileName = uploadField.getFileName();
//    		uploadFileName = summaryField.getValue();
//    		var re = new RegExp("tech_vsd.+tar/.gz","gi");
    		var re = /tech.+\.tar\.gz/i;
    		if(!re.test(uploadFileName)){
    			friendAlert("一键收集BUG请同步上传对应的附件<br/>附件格式: tech_XXXXXX.tar.gz");
    			return false;
    		}
    	}
    }
	
    form.form.items.each(function(f){
       if(!f.validate()){
           valid = false;
           validLabe += f.fieldLabel + "; ";
       }
    });
    
    if(testTopologyArea.getValue() == "" || testTopologyArea.getValue() == "<br>"){
    	 valid = false;
    	 validLabe += testTopologyArea.fieldLabel + "; ";
    }
    if(bugDescriptionArea.getValue() == "" || bugDescriptionArea.getValue() == "<br>"){
    	 valid = false;
    	 validLabe += bugDescriptionArea.fieldLabel + "; ";
    }
    
	if(valid){
		// disable 设置为false,不然无法传递数据
		priorityComb.setDisabled(false);
		
		form.form.submit({
			
			waitTitle : '提示',
     		waitMsg : '正在提交新BUG信息,请稍后...',
			url: "servlet/bugInfo",
			clientValidation:false,
			params: {
				'type':'add'
		    },
			success: function(form, options) {
				var result = options.result;
				//var result =action.result;
				if(result.success){		
					Ext.MessageBox.show({
				        title: '提交bug成功',
				        msg: '提交BUG成功,请记住BUGID:<font id="bugId">' + result.bugId + "</font><br/>请选择下一步您想要的操作",
				        buttons:  {yes:'继续添加新BUG', no:'查看BUG'+ result.bugId},
				        icon: Ext.MessageBox.QUESTION,
				        closable:false,
				        fn: function(btn){
				        	if(btn == "yes"){
				        		
				        	}else if(btn == "no"){
				        		parent.openTabBUGID(result.bugId);
				        	}
				        }
				    });
				}else{
					friendAlert("提交新BUG出错");
				}
		    },
		    failure: function(form, action){
		   		friendAlert("提交新BUG出错");
			}
		});
	}else{
		friendAlert("数据填写不完整,有如下数据未填写:<br/><br/>" + validLabe,3);
	}
}


var helpWin;
function showHelpWin(){
    if(!helpWin){
    	// 品控的操作系统
    	var activityOsConfig = {};
		activityOsConfig.fieldLabel = '品控在用操作系统';
		activityOsConfig.emptyText = '选择项目后,系统自动回填';
		activityOsConfig.store = ExtFormUtil.getCommonComboBoxStore({url:'servlet/operateSystem?type=queryByPkActivity'});
		var activityOs = ExtFormUtil.getCommonComboBox(activityOsConfig);
    	activityOs.on('select', function(comb,record){
    		osCombo.setValueNoLoad(record.get("id"));
		});
	    helpWin = new Ext.Window({
        	title:'品控系统活动项目',
            layout:'fit',
            width:400,
            height:80,
            closeAction:'hide',
            plain: true,
            items: new Ext.form.FormPanel({
            	labelWidth: 100, 
		        frame:true,
		        bodyStyle:'padding:5px 5px 0',
		        defaults: {width: 240},
		        defaultType: 'textfield',
		        items: [activityOs]
            })
        });
    }
    helpWin.show(this);
}

var modulePathWin;
function showModulePathWin(){
 	if(!modulePathWin){
		var functionModuleConfig = {};
		functionModuleConfig.fieldLabel = '功能模块';
		functionModuleConfig.store = ExtFormUtil.getCommonComboBoxStore({url:'servlet/functionModule?type=queryAllLeaf'});
		var functionModule = ExtFormUtil.getCommonComboBox(functionModuleConfig);
    	functionModule.on('select', function(comb,record){
    		Ext.Ajax.request({
				url: 'servlet/functionModule',
				method: 'POST',
				params: {
					'type':'queryModuleFullPath',
					'node': record.get("id")
				},
				success: function(response, options){
					var result = Ext.util.JSON.decode(response.responseText);
					if(result.success){
						functionModulePath.setValue(result.msg);
					}else{
						alert(result.msg);
					}
				}
			});
		});
		
		var functionModulePath =  new Ext.form.TextField({
		  	fieldLabel: '路径',
		  	anchor:'90%'
		});
		
        modulePathWin = new Ext.Window({
        	title:'BUG帮助',
            layout:'fit',
            width:600,
            height:100,
            closeAction:'hide',
            plain: true,
            items: new Ext.form.FormPanel({
            	labelWidth: 100, 
		        frame:true,
		        bodyStyle:'padding:5px 5px 0',
		        defaults: {width: 240},
		        defaultType: 'textfield',
		        items: [functionModule,functionModulePath]
            })
        });
    }
    modulePathWin.show(this);
}