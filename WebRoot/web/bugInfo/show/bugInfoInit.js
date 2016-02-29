var STATE_NEW = 2;
var STATE_ASSIGNED = 3;
var STATE_REOPENED = 4;
var STATE_RESOLVED = 5;
var STATE_VERIFIED = 6;

var STATE_CBT = 7;
var STATE_CBD = 13;

var STATE_DBD = 8;
var STATE_DBT = 17;
var STATE_DBP = 21;

var STATE_DELAY = 9;
var STATE_CHECKED = 14;
var STATE_RENEW = 16;
var STATE_REQUEST = 18;
var STATE_GIVEUP = 22;



/**************************** 修订Bug状态 **************************/
bugStateComb.on('beforeselect',function(comb,record){
	var oldState = comb.getValue();
	var newState = record.get("id");
	
	if(newState == STATE_CHECKED && oldState != STATE_RESOLVED){
		friendAlert("把BUG设置为CHECK状态，必须先把BUG置于RESOLVED状态");
		return false;
	}
	
	if(newState == STATE_CHECKED){
		if(!isCheck.getValue()){
			friendAlert("还未审核通过,无法设置为CHECK状态");
			return false;
		}
		
		if(checker2Comb.getValue() != ""){
			if(!isCheck2.getValue()){
				friendAlert("审核人2还未审核通过,无法设置为CHECK状态");
				return false;
			}
		}
		
		if(checker3Comb.getValue() != ""){
			if(!isCheck3.getValue()){
				friendAlert("审核人2还未审核通过,无法设置为CHECK状态");
				return false;
			}
		}
		
		if(checker4Comb.getValue() != ""){
			if(!isCheck4.getValue()){
				friendAlert("审核人2还未审核通过,无法设置为CHECK状态");
				return false;
			}
		}
	}
	
	if(newState == STATE_CBD && oldState != STATE_CHECKED){
		friendAlert("把BUG设置为CLOSED-ByDevelopment状态，必须先把BUG置于CHECK状态");
		return false;
	}
	
	if(newState == STATE_CBT && oldState != STATE_CBD){
		friendAlert("把BUG设置为CLOSED-ByTest状态，必须先把BUG置于CLOSE-ByDevelopment状态");
		return false;
	}
	
	if(newState == STATE_GIVEUP){
		if(!window.confirm("修改成 GiveUp 前,请确认是否已经在BUG系统上进行三方（PM,PTM,PSD）评审.是否确定已评审通过?")){
			return false;
		}
	}
	
	if(newState == STATE_REOPENED){
		if(!window.confirm("确定要把状态置为reopen吗?")){
			return false;
		}
	}
	
	setBugInfoCmpAllowBlank(newState);
	setBugInfoHelpText(newState);
});

bugStateComb.on("change",function(comb,newValue,oldValue){
//	setBugInfoCmpAllowBlank(newValue);
//	setBugInfoHelpText(newValue);
});
// 根据不同的bug状态来设置不同的必填项
function setBugInfoCmpAllowBlank(state){
	Ext.each(showInfoCmpArr,function(item,index,allItem){
		item.setAllowBlank(true);
	});
	
	// 解决状态下必填项
	
	if(state == STATE_RESOLVED && bugInfo.stateId != STATE_RESOLVED){
		// 解决方案的填写
		resolved_analyse.setVisible(true);
		resolved_analyse.setAllowBlank(false);
		resolved_solution.setVisible(true);
		resolved_solution.setAllowBlank(false);
		resolved_verification.setVisible(true);
		resolved_verification.setAllowBlank(false);
		resolved_moduleAffect.setVisible(true);
		resolved_moduleAffect.setAllowBlank(false);
		resolved_productAffect.setVisible(true);
		resolved_productAffect.setAllowBlank(false);
	}else{
		resolved_analyse.setVisible(false);
		resolved_analyse.setAllowBlank(true);
		resolved_solution.setVisible(false);
		resolved_solution.setAllowBlank(true);
		resolved_verification.setVisible(false);
		resolved_verification.setAllowBlank(true);
		resolved_moduleAffect.setVisible(false);
		resolved_moduleAffect.setAllowBlank(true);
		resolved_productAffect.setVisible(false);
		resolved_productAffect.setAllowBlank(true);
	}
	
	if(state == STATE_RESOLVED){
		webosComb.setAllowBlank(false);
		treeReviewComb.setAllowBlank(false);
		legacybugComb.setAllowBlank(false);
		includeStateComb.setAllowBlank(false);
		resolutionComb.setAllowBlank(false);
		relateProductsComb.setAllowBlank(false);
		
		//如果是一键收集的BUG,则必须要选择是否是通过一键收集解决问题
		if(oneKeyCollectionComb.getValue()){
			resolvedByCollectionCombo.setAllowBlank(false);
			resolvedByCollectionReasonField.setAllowBlank(false);
		}
	}else if(state == STATE_CHECKED){
		webosComb.setAllowBlank(false);
		bugCategoryComb.setAllowBlank(false);
	}else if(state == STATE_ASSIGNED || state == STATE_REQUEST ||
			 state == STATE_VERIFIED || state == STATE_DBT     ||
			 state == STATE_DBT      || state == STATE_DBP     ||
			 state == STATE_REOPENED || state == STATE_RENEW){
	}
	
	if(state == STATE_DELAY){
		delayProperty.setVisible(true);
		delayProperty.setAllowBlank(false);
	}else{
		delayProperty.setVisible(false);
		delayProperty.setAllowBlank(true);
	}
}

function setBugInfoHelpText(state){
	
	if(state == STATE_RESOLVED){
		friendAlert("BUG置为resolved的同时，请提交CAF表单",4);
	}
	
	if(state == STATE_CBD){
		if(changeMessageArea.getValue() == "" || changeMessageArea.getValue() == "<br>"){
			changeMessageArea.setValue("验证方法:<br/><br/>测试结果:<br/><br/>相关测试:<br/><br/>验证版本:<br/><br/>提交日期:");
		}else{
			changeMessageArea.setValue(changeMessageArea.getValue() + "<br/>验证方法:<br/><br/>测试结果:<br/><br/>相关测试:<br/><br/>验证版本:<br/><br/>提交日期:");
		}
	}
	
	if(state == STATE_CBT){
		if(changeMessageArea.getValue() == "" || changeMessageArea.getValue() == "<br>"){
			changeMessageArea.setValue("验证方法:<br/><br/>测试结果:<br/><br/>相关测试:<br/><br/>验证版本:<br/><br/>提交日期:<br/><br/>受此bug影响的用例执行确认:");
		}else{
			changeMessageArea.setValue(changeMessageArea.getValue() + "<br/>验证方法:<br/><br/>测试结果:<br/><br/>相关测试:<br/><br/>验证版本:<br/><br/>提交日期:<br/><br/>受此bug影响的用例执行确认:");
		}
	}
}

/***********自动修订优先级 ****************/
affectNumOfCase.on('change', function(field,value,oldvalue){
	changePriority();
});
severityComb.on('change', function(field,value,oldvalue){
	changePriority();	
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


/***********遗留BUG 自动进行****************/

/**
 * 由马秋华提出的需求 2013-3-7
	1. 如果遗留BUG选择是,则默认改为 选择 产品线判断
	
	2. 如果遗留BUG选择否和不选择
		如果原先“BUG通告”为“是”的，就不要改
		如果其他2个选项的，可以清空。。。
 */
legacybugComb.on('change', function(field,value,oldvalue){
	if(value == 2){
		needBugReportComb.setValueNoLoad(3);
	}else if(bugInfo.needBugReportId == 1){
		needBugReportComb.setValueNoLoad(1);
	}else{
		needBugReportComb.clearValue();
	}
});

/***********三方评审的选择项****************/
treeReviewComb.on('beforeselect',function(field,record){
	var b = true;
	if(record.get("id") == 2){
		b = window.confirm("如果选择 未通过评审 , bug状态将被设置为 ASSIGNED,是否确定要这么操作!");
		if(b){
			bugStateComb.setValueNoLoad(STATE_ASSIGNED);
		}
	}	
	return b;
});

//闭环措施
closeStepComb.on('change', function(field,value,oldvalue){
	if(value == 8 || value == 13){
		closeStepInfoField.setAllowBlank(false);
	}else{
		closeStepInfoField.setAllowBlank(true);
	}
});

/**
 * 初始化界面数据
 * @param {} form
 */
function initForm(form){
	initBugInfoHelpText();
	initBugInfoValue();
	initBugInfoShow();
	
	
}

function initBugInfoShow(){
	needBugReportComb.setDisabled(!bugInfo.isPSD);
	
	// 仅仅由PM才有手动修改的权限
	priorityComb.setDisabled(!bugInfo.isPm);
	
	//存在的情况下才显示
	if(bugInfo.sameAsBugId){
		sameAsBugIdDisplay.setValue(bugInfo.sameAsBugId);
	}else{
		sameAsBugId.setVisible(false);
	}
	
	//Delay属性
	if(bugInfo.delayProperty){
		delayProperty.setValue(bugInfo.delayProperty);
	}else{
		delayProperty.setVisible(false);
	}
	
	
}
function initBugInfoHelpText(){
	// 帮助提示内容
	chargeCombo.sethelpText("负责修复bug的人,一般确定后不更改.");
	vestingPeopleComb.sethelpText("产生bug的人,一般确定后不更改.");
	
	var priorityHelpText = "系统自动根据'严重性' 与 '影响用例执行数' 来判断优先级的高低<br/>";
	priorityHelpText += "仅项目PM有权限强制修改项目信息.<br/>";
	priorityHelpText += "优先级判断规则如下: <br/>"
	priorityHelpText += "   1)影响用例执行数>=1 或 严重性为blocker 则为紧急<br/>";
	priorityHelpText += "   2)严重性为:critical  或 major 则为:正常 <br/>";
	priorityHelpText += "   3)以上两种情况之外为缓慢 <br/>";
	priorityComb.sethelpText(priorityHelpText);

	needBugReportComb.sethelpText("由系统自动判断,只有PSD才能手动修订权限<br/>");
}

function initBugInfoValue(){
	// 操作系统为必填项
	osCombo.setAllowBlank(false);
	bugStateComb.setAllowBlank(false);
	affectNumOfCase.setValue(bugInfo.affectCaseCount);
	summaryField.setValue(bugInfo.summary);
	testCaseNumField.setValue(bugInfo.testCaseNum);
	bugId.setValue(bugInfo.bugId);
	
	
	testMethodComb.setRecordValue(bugInfo.testmethodId,bugInfo.testmethod);
	productCombo.setRecordValue(bugInfo.productId,bugInfo.product);
	osCombo.setRecordValue(bugInfo.operateSystemId,bugInfo.operateSystem);
	testCaseCombo.setRecordValue(bugInfo.testcaseId,bugInfo.testcase);
	pstlCombo.setRecordValue(bugInfo.pstlId,bugInfo.pstl);
	chargeCombo.setRecordValue(bugInfo.chargeId,bugInfo.charge);
	
	vestingPeopleComb.setRecordValue(bugInfo.vestingPeopleId,bugInfo.vestingPeople);
	checkerComb.setRecordValue(bugInfo.checkerId,bugInfo.checker);
	isCheck.setValue(bugInfo.checked);
	
	vestingPeople2Comb.setRecordValue(bugInfo.vestingPeopleId2,bugInfo.vestingPeople2);
	checker2Comb.setRecordValue(bugInfo.checkerId2,bugInfo.checker2);
	isCheck2.setValue(bugInfo.checked2);
	
	vestingPeople3Comb.setRecordValue(bugInfo.vestingPeopleId3,bugInfo.vestingPeople3);
	checker3Comb.setRecordValue(bugInfo.checkerId3,bugInfo.checker3);
	isCheck3.setValue(bugInfo.checked3);
	
	vestingPeople4Comb.setRecordValue(bugInfo.vestingPeopleId4,bugInfo.vestingPeople4);
	checker4Comb.setRecordValue(bugInfo.checkerId4,bugInfo.checker4);
	isCheck4.setValue(bugInfo.checked4);
	
	specialField.setValue(bugInfo.special);
	
	comefromComb.setRecordValue(bugInfo.sourceId,bugInfo.source);
	repeatabilityComb.setRecordValue(bugInfo.repeatableId,bugInfo.repeatable);
	severityComb.setRecordValue(bugInfo.severityId,bugInfo.severity);
	priorityComb.setRecordValue(bugInfo.priorityId,bugInfo.priority);
	legacybugComb.setRecordValue(bugInfo.legacyId,bugInfo.legacy);
	bugStateComb.setRecordValue(bugInfo.stateId,bugInfo.state);
	
	
	if(bugInfo.testchargeId){
		testChargeComb.setRecordValue(bugInfo.testchargeId,bugInfo.testcharge);
	}else{
		testChargeComb.setRecordValue(bugInfo.submiterId,bugInfo.submiter);
	}
	
	
	functionModuleCombo.setRecordValue(bugInfo.functionmoduleId,bugInfo.functionmodule);
	
	resolvedVersionField.setValue(bugInfo.resolvedVersion);
	webosComb.setRecordValue(bugInfo.workPackageId,bugInfo.workPackage);
	bugCategoryComb.setRecordValue(bugInfo.categoryId,bugInfo.category);
	resolutionComb.setRecordValue(bugInfo.resolutionId,bugInfo.resolution);
	discoveryPhaseComb.setRecordValue(bugInfo.discoveryPhaseId,bugInfo.discoveryPhase);
	bugReportField.setValue(bugInfo.bugReportId);
	needBugReportComb.setRecordValue(bugInfo.needBugReportId,bugInfo.needBugReport);
	includeStateComb.setRecordValue(bugInfo.introducedStateId,bugInfo.introducedState);
	treeReviewComb.setRecordValue(bugInfo.userRevisedTripartiteReviewId,bugInfo.userRevisedTripartiteReview);
	delayVersionComb.setRecordValue(bugInfo.delayOsId,bugInfo.delayOs);
	testabilityComb.setRecordValue(bugInfo.testabilityId,bugInfo.testability);
	testabilitySpecialComb.setRecordValue(bugInfo.testabilitySpecialId,bugInfo.testabilitySpecial);
	branchComb.setRecordValue(bugInfo.branchId,bugInfo.branch);
	closeStepComb.setRecordValue(bugInfo.closeStepId,bugInfo.closeStep);
	closeLoopComb.setRecordValue(bugInfo.closeLoopId,bugInfo.closeLoop);
	closeStepInfoField.setValue(bugInfo.closeStepInfo);
	designCodingPrincipleArea.setValue(bugInfo.designCodingPrinciple);
	relateProductsComb.setValueAfterLoad(bugInfo.linkProductIdList);
	
	// 一键收集的bug
	oneKeyCollectionComb.setRecordValue(bugInfo.oneKeyCollectionId,bugInfo.oneKeyCollection);
	resolvedByCollectionCombo.setRecordValue(bugInfo.resolvedByCollectionId,bugInfo.resolvedByCollection);
	resolvedByCollectionReasonField.setValue(bugInfo.resolvedByCollectionReason);
	
	// 抄送人信息
	Ext.each(bugInfo.ccUserList,function(item,index){
		ccUserField.addValue(item.value,item.id);
	});
	
	dealPeople.setValue(bugInfo.dealUserList);
	
	// 附件
	Ext.each(bugInfo.accessoryList,function(item,index){
		uploadField.addUploadItem(item);
	});
	
	// cafId 关联
	Ext.each(bugInfo.cafIdList,function(item){
		linkCAFIDfiled.addValue(item);
	});
}



// 部分数据初始化
ccUserField.anchor = ExtFormUtil.anchoreTreeToOne;
testCaseNumField.anchor = ExtFormUtil.anchor;
specialField.anchor = ExtFormUtil.anchor;
summaryField.anchor = ExtFormUtil.anchoreTreeToOne;
uploadField.anchor = ExtFormUtil.anchoreTreeToOne;

