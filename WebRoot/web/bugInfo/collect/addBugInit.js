

// 操作系统变更
osCombo.on("beforeselect",function(comb,record){
	var os = record.get("value");
	setTestabilitySpecialAllowBlank(os);
});

// 判断是否需要填写定位信息
function setTestabilitySpecialAllowBlank(os){
	if(os.indexOf("11.0") == 0){
		if(userInfo.needLocate){
			testabilitySpecialComb.setAllowBlank(false);
			locateArea.setAllowBlank(false);
		}
	}else{
		testabilitySpecialComb.setAllowBlank(true);
		locateArea.setAllowBlank(true);
	}
}

// 表单是否必填和内容提示
function initForm(form){
	testMethodComb.setAllowBlank(false);
	testCaseCombo.setAllowBlank(false);
	productCombo.setAllowBlank(false);
	osCombo.setAllowBlank(false);
	functionModuleCombo.setAllowBlank(false);
	pstlCombo.setAllowBlank(false);
	chargeCombo.setAllowBlank(false);
	repeatabilityComb.setAllowBlank(false);
	severityComb.setAllowBlank(false);
	legacybugComb.setAllowBlank(false);
	comefromComb.setAllowBlank(false);
	
	testCaseNumField.setAllowBlank(false);
	summaryField.setAllowBlank(false);
//	testTopologyArea.setAllowBlank(false);
	topologyDescriptionArea.setAllowBlank(false);
	bugDescriptionArea.setAllowBlank(false);
	debugMessageArea.setAllowBlank(false);
	versionMessageArea.setAllowBlank(false);
	affectNumOfCase.setAllowBlank(false);
	productConfigArea.setAllowBlank(false);
	testabilityComb.setAllowBlank(false);
	loadBug.sethelpText("如果曾经提交过类似的bug,可以直接通过BUGID来导入");
	
	var uploadHelp = "1）辅测设备的配置如果有必需以附件形式上传；<br/>2）测试脚本如果有必需以附件形式上传；";
	uploadField.sethelpText(uploadHelp);
	
	var priorityHelpText = "系统自动根据'严重性' 与 '影响用例执行数' 来判断优先级的高低<br/>";
	priorityHelpText += "仅项目PM有权限强制修改项目信息.<br/>";
	priorityHelpText += "优先级判断规则如下: <br/>"
	priorityHelpText += "   1)影响用例执行数>=1 或 严重性为blocker 则为紧急<br/>";
	priorityHelpText += "   2)严重性为:critical  或 major 则为:正常 <br/>";
	priorityHelpText += "   3)以上两种情况之外为缓慢 <br/>";
	priorityComb.sethelpText(priorityHelpText);

	functionModuleCombo.sethelpText("功能模块太难查找?<br/>试试左上角的  模块路径<br/>快速定位路径");
	ccUserField.sethelpText("没有自动导入抄送人?<br/> 个人设置-->提交BUG设置-->添加抄送人  是否勾选上了");
	oneKeyCollectionComb.sethelpText("如果是一键收集的BUG,请选择对应类型。<br/>并请同步上传收集的附件: tech******.tar.gz<br/>未提交则无法提交BUG");
	form.doLayout();
}



/***********自动修订优先级 ****************/
affectNumOfCase.on('change', function(field,value,oldvalue){
	changePriority();
});
severityComb.on('change', function(field,value,oldvalue){
	changePriority();	
});


testabilitySpecialComb.on('change', function(field,value,oldvalue){
	if(value){
		var record = field.getStore().getById(value);
		if(locateArea.getValue() != ""){
			Ext.MessageBox.show({
		        title: '定位信息变更提醒',
		        msg: '由于您变更了 可测试性专题,请判断定位信息否需要导入对应模板',
		        buttons:  {yes:'当前定位信息即可', no:'导入新模板'},
		        icon: Ext.MessageBox.QUESTION,
		        closable:false,
		        fn: function(btn){
		        	if(btn == "yes"){
		        		
		        	}else if(btn == "no"){
		        		locateArea.setValue(record.get("template"));
		        	}
		        }
		    });
		}else{
			locateArea.setValue(record.get("template"));
		}
	}
});

function changePriority(){
	var numofcase = affectNumOfCase.getValue();
	var severity = severityComb.getValue();
	
	if(numofcase >= 1 || severity == 7){
		priorityComb.setValueNoLoad(3);
	}else if(severity == 5 || severity == 6){
		priorityComb.setValueNoLoad(2);
	}else{
		priorityComb.setValueNoLoad(1);
	}
}



function loadBugInfo(){
	var bugId = loadBugIdField.getValue();
	if(bugId == ''){
		friendAlert("请输入正确的BUGID号.");
		return;
	}
	
	loadBugInfoById(bugId);
}

bugInfoTemplateb.on('change', function(field,value,oldvalue){
	if(value){
		var record = field.getStore().getById(value);
		loadBugInfoById(record.get("bugId"));
	}
	
//	loadBugInfoById(value);
});

function loadBugInfoById(bugId){
	Ext.Ajax.request({
		url: 'servlet/viewBugInfo',
		method: 'POST',
		params: {
			'bugId' : bugId,
			'type':'queryById'
		},
		success: function(response, options){
			var result = Ext.util.JSON.decode(response.responseText);
			if(result.success){
				var bugInfo = result.bugInfo;
				bugDescriptionArea.setValue(bugInfo.bugDescription);
				debugMessageArea.setValue(bugInfo.bugDebugMessage);
				versionMessageArea.setValue(bugInfo.bugVersionMessage);
				productConfigArea.setValue(bugInfo.deviceUnderTestConfig);
				ideaAreaConfigArea.setValue(bugInfo.suggestionsAndViews);
				topologyDescriptionArea.setValue(bugInfo.topologyDescription);
				testTopologyArea.setValue(bugInfo.testTopology);
				testProcedureField.setValue(bugInfo.testProgram);
				affectNumOfCase.setValue(bugInfo.affectCaseCount);
				summaryField.setValue(bugInfo.summary);
				testCaseNumField.setValue(bugInfo.testCaseNum);
				
				testMethodComb.setRecordValue(bugInfo.testmethodId,bugInfo.testmethod);
				productCombo.setRecordValue(bugInfo.productId,bugInfo.product);
				osCombo.setRecordValue(bugInfo.operateSystemId,bugInfo.operateSystem);
				testCaseCombo.setRecordValue(bugInfo.testcaseId,bugInfo.testcase);
				pstlCombo.setRecordValue(bugInfo.pstlId,bugInfo.pstl);
				chargeCombo.setRecordValue(bugInfo.chargeId,bugInfo.charge);
				comefromComb.setRecordValue(bugInfo.sourceId,bugInfo.source);
				testabilityComb.setRecordValue(bugInfo.testabilityId,bugInfo.testability);
				legacybugComb.setRecordValue(bugInfo.legacyId,bugInfo.legacy);
				
				functionModuleCombo.setRecordValue(bugInfo.functionmoduleId,bugInfo.functionmodule);
				
				changePriority();
				
				// 抄送人导入
				if(bugInfo.ccUserList){
					Ext.each(bugInfo.ccUserList,function(item,index){
						ccUserField.addValue(item.value,item.id);
					});
				}
				
				setTestabilitySpecialAllowBlank(osCombo.getRawValue());
				friendAlert("已导入BUG:" + bugId + "对应的基本信息");
				
				//不建议进行默认初始化数据:可重复性,严重性
				repeatabilityComb.setRecordValue(bugInfo.repeatableId,bugInfo.repeatable);
				severityComb.setRecordValue(bugInfo.severityId,bugInfo.severity);
//				document.location.reload();
			}else{
				friendAlert(result.msg);
			}
		},
		failure: function(response, options){                
			
		}
	});
}