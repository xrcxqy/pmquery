var bugId = new Ext.form.DisplayField({
	fieldLabel:'BUGID',
	value:'0000001',
	fieldClass:'bugIdCs',
	anchor:ExtFormUtil.anchor
});

var sameAsBugIdDisplay = new Ext.form.DisplayField({
	fieldClass:'bugIdCs'
});
var sameAsBugId = new Ext.form.CompositeField({
	xtype: 'compositefield',
	fieldLabel:'SameAs Bug',
	autoHeight:true,
	anchor:ExtFormUtil.anchoreTreeToOne,
	msgTarget: 'under',
	items: [sameAsBugIdDisplay,
		{
			xtype: 'button', 
			text: '打开',
			listeners :{
				'click':function(btn,e){
					if(parent.openTabBUGID){
						parent.openTabBUGID(bugInfo.sameAsBugId);
					}else{
						window.open("servlet/viewBugInfo?type=showBugInfo&bugId="+bugInfo.sameAsBugId);
					}
				}
			}
		}]
});

//BUG归属人
var vestingPeopleConfig = {};
vestingPeopleConfig.hiddenName = 'bugInfo.vestingPeople.id';
vestingPeopleConfig.fieldLabel = 'BUG归属人';
vestingPeopleConfig.emptyText = '请选BUG归属人';
vestingPeopleConfig.store = userStore;
vestingPeopleConfig.mode = 'local';
var vestingPeopleComb = ExtFormUtil.getCommonComboBox(vestingPeopleConfig);

var vestingPeople2Config = {};
vestingPeople2Config.hiddenName = 'bugInfo.vestingPeople2.id';
vestingPeople2Config.fieldLabel = 'BUG归属人2';
vestingPeople2Config.emptyText = '请选BUG归属人2';
vestingPeople2Config.store = userStore;
vestingPeople2Config.mode = 'local';
var vestingPeople2Comb = ExtFormUtil.getCommonComboBox(vestingPeople2Config);

var vestingPeople3Config = {};
vestingPeople3Config.hiddenName = 'bugInfo.vestingPeople3.id';
vestingPeople3Config.fieldLabel = 'BUG归属人3';
vestingPeople3Config.emptyText = '请选BUG归属人3';
vestingPeople3Config.store = userStore;
vestingPeople3Config.mode = 'local';
var vestingPeople3Comb = ExtFormUtil.getCommonComboBox(vestingPeople3Config);

var vestingPeople4Config = {};
vestingPeople4Config.hiddenName = 'bugInfo.vestingPeople4.id';
vestingPeople4Config.fieldLabel = 'BUG归属人4';
vestingPeople4Config.emptyText = '请选BUG归属人4';
vestingPeople4Config.store = userStore;
vestingPeople4Config.mode = 'local';
var vestingPeople4Comb = ExtFormUtil.getCommonComboBox(vestingPeople4Config);

// Bug状态
var bugStateCombConfig = {};
bugStateCombConfig.hiddenName = 'bugInfo.state.id';
bugStateCombConfig.fieldLabel = 'Bug状态';
bugStateCombConfig.store = stateStore;
bugStateCombConfig.helpText='未发现Same-AS?<br/>请查看 系统帮助-->BUG处理-->Same-As';
var bugStateComb = ExtFormUtil.getCommonComboBox(bugStateCombConfig);

//测试负责人
var testChargeCombConfig = {};
testChargeCombConfig.hiddenName = 'bugInfo.testcharge.id';
testChargeCombConfig.fieldLabel = '测试负责人';
testChargeCombConfig.emptyText = '请选择测试负责人';
testChargeCombConfig.store = userStore;
testChargeCombConfig.mode = 'local';
var testChargeComb = ExtFormUtil.getCommonComboBox(testChargeCombConfig);

//工作包
var webosCombConfig = {};
webosCombConfig.hiddenName = 'bugInfo.workPackage.id';
webosCombConfig.fieldLabel = '工作包';
webosCombConfig.emptyText = '请选择工作包';
webosCombConfig.store = workPackageStore;
var webosComb = ExtFormUtil.getCommonComboBox(webosCombConfig);
webosComb.listWidth = 400;
showInfoCmpArr.push(webosComb);

//关联产品
var relateProductsCombConfig = {};
relateProductsCombConfig.hiddenName = 'bugInfoExp.linkProduct';
relateProductsCombConfig.fieldLabel = '关联产品';
relateProductsCombConfig.emptyText = '请选关联产品';
relateProductsCombConfig.store = linkProductStore;
//var relateProductsComb = ExtFormUtil.getCommonComboBox(relateProductsCombConfig);
var relateProductsComb = ExtFormUtil.getMultipleSelectComboBox(relateProductsCombConfig);
showInfoCmpArr.push(relateProductsComb);

//Bug引入的状态		
var includeStateCombConfig = {};
includeStateCombConfig.hiddenName = 'bugInfo.introducedState.id';
includeStateCombConfig.fieldLabel = 'Bug引入的状态';
includeStateCombConfig.emptyText = '请选Bug引入的状态';
includeStateCombConfig.store = introducedStateStore;
var includeStateComb = ExtFormUtil.getCommonComboBox(includeStateCombConfig);
showInfoCmpArr.push(includeStateComb);

//解决方式		
var resolutionCombConfig = {};
resolutionCombConfig.hiddenName = 'bugInfo.resolution.id';
resolutionCombConfig.fieldLabel = '解决方式';
resolutionCombConfig.emptyText = '请选Bug解决方式';
resolutionCombConfig.store = resolutionStore;
var resolutionComb = ExtFormUtil.getCommonComboBox(resolutionCombConfig);
showInfoCmpArr.push(resolutionComb);

//是否用户接口修订并通过三方评审
var treeReviewCombConfig = {};
treeReviewCombConfig.hiddenName = 'bugInfo.userRevisedTripartiteReview.id';
treeReviewCombConfig.fieldLabel = '是否用户接口修订并通过三方评审';
treeReviewCombConfig.emptyText = '请选是否用户接口修订并通过三方评审';
treeReviewCombConfig.store = userRevisedTripartiteReviewStore;
treeReviewCombConfig.helpText = "在 Resolved 状态时必填选项,如 未通过评审 ,则BUG状态将置为 ASSIGNED 状态,并由相应人员进行处理";
var treeReviewComb = ExtFormUtil.getCommonComboBox(treeReviewCombConfig);
showInfoCmpArr.push(treeReviewComb);

//关联caf表单ID	
var linkCAFIDConfig = {};
linkCAFIDConfig.name = 'bugInfoExp.linkCafId';
linkCAFIDConfig.fieldLabel = '关联caf表单ID';
linkCAFIDConfig.id = 'cafidCompositeFieldId';
linkCAFIDConfig.buttonText = '新增';
linkCAFIDConfig.anchor = ExtFormUtil.anchoreTreeToOne;
linkCAFIDConfig.helpText = '设计文档修订完成时必需关联CAF表单';
linkCAFIDConfig.width = 165;
var linkCAFIDfiled = ExtFormUtil.getCAFField(linkCAFIDConfig);


// 解决版本
var resolvedVersionField = new Ext.form.NumberField({
  	fieldLabel: '解决Revision',
	name: 'bugInfo.resolvedVersion',
 	anchor:ExtFormUtil.anchor,
 	allowDecimals:false,
	allowNegative:false
});

var changeMessageArea = ExtFormUtil.getHtmlEditor({
	fieldLabel: "更改内容",
	name:'bugInfoExp.changeMessage',
	anchor:ExtFormUtil.anchoreTreeToOne
});

var bugReportField = new Ext.form.TextField({
  	fieldLabel: 'Bug通告ID',
	name: 'bugInfo.bugReportId',
	helpText:'如果有填写表示已经发送bug通告',
 	anchor:ExtFormUtil.anchor
});

//Delay到版本
var delayVersionCombConfig = {};
delayVersionCombConfig.hiddenName = 'bugInfo.delayOs.id';
delayVersionCombConfig.fieldLabel = 'Delay到版本';
delayVersionCombConfig.store = delayOperateSystemStore;
var delayVersionComb = ExtFormUtil.getCommonComboBox(delayVersionCombConfig);

var closeStepComb = ExtFormUtil.getCommonComboBox({
	hiddenName:'bugInfo.closeStep.id',
	fieldLabel:'闭环措施',
	store:closeStepStore
});

var closeLoopComb = ExtFormUtil.getCommonComboBox({
	hiddenName:'bugInfo.closeLoop.id',
	fieldLabel:'是否已闭环',
	store:closeLoopStore
});


var closeStepInfoField = new Ext.form.TextField({
  	fieldLabel: '闭环措施具体描述',
	name: 'bugInfo.closeStepInfo',
 	anchor:ExtFormUtil.anchoreTreeToOne
});

var designCodingPrincipleArea = ExtFormUtil.getCommonTextField({
	fieldLabel : '总结的设计/编码原则',
	name : 'bugInfo.designCodingPrinciple',
	anchor:ExtFormUtil.anchoreTreeToOne
});

//需要发BUG通告	
var needBugReportConfig = {};
needBugReportConfig.hiddenName = 'bugInfo.needBugReport.id';
needBugReportConfig.fieldLabel = '需要发BUG通告';
needBugReportConfig.store = needBugReportStore;
var needBugReportComb = ExtFormUtil.getCommonComboBox(needBugReportConfig);

// 当前处理人信息
var dealPeopleConfig = {};
dealPeopleConfig.hiddenName = 'bugInfoExp.dealPeople';
dealPeopleConfig.store = userStore;
dealPeopleConfig.mode = 'local';
//var dealPeopleComb = ExtFormUtil.getCommonComboBox(dealPeopleConfig);
//cmpList.push(dealPeopleComb);

var dealPeople = new Ext.form.CompositeField({
	id:'dealPeopleCompositeField',
	xtype: 'compositefield',
	fieldLabel:'BUG当前处理人',
	autoHeight:true,
	anchor:ExtFormUtil.anchoreTreeToOne,
	msgTarget: 'under',
	helpText:'当前BUG现阶段处理人.<br/>通过点击 新增 来添加多个处理人.<br/>把多余处理人置空,后保存即可删除当前处理人.<br/>至少存在一个当前处理人',
	addComboBox:function(){
		var fileSet = Ext.getCmp("dealPeoplefieldset");
		fileSet.add(ExtFormUtil.getCommonComboBox(dealPeopleConfig));
		fileSet.doLayout();
		Ext.getCmp("formId").doLayout();
	},
	addValue:function(id,value){
		var fileSet = Ext.getCmp("dealPeoplefieldset");
		var tempCom = ExtFormUtil.getCommonComboBox(dealPeopleConfig);
		tempCom.setRecordValue(id,value);
		fileSet.add(tempCom);
		fileSet.doLayout();
		Ext.getCmp("formId").doLayout();
	},
	setValue:function(valueList){
		var fileSet = Ext.getCmp("dealPeoplefieldset");
		// 先对旧数据置空
		Ext.each(fileSet.items.items,function(item,index){
			item.reset();
		});
		
		// 进行初始化
		Ext.each(valueList,function(item,index){
			if(!fileSet.get(index)){
				fileSet.add(ExtFormUtil.getCommonComboBox(dealPeopleConfig));
			}
			fileSet.get(index).setValueNoLoad(item.id);
		});
		
		// 布局重置
		fileSet.doLayout();
		Ext.getCmp("formId").doLayout();
	},
//		helpText:'点击添加更多当前bug处理人信息',
	items: [{
		xtype: 'button', 
		text: '新增',
		listeners :{
			'click':function(btn,e){
				dealPeople.addComboBox();
			}
		}
	},{
		xtype: 'fieldset',
		id:'dealPeoplefieldset',
		layout:"table",  
	    layoutConfig:{  
	        columns:4                     
	    },
		border:false,
		cls:"x-fieldset-ex",
		defaults: {
       	 	border:false
    	},
		items: [
			ExtFormUtil.getCommonComboBox(dealPeopleConfig)
		]
	}]
});




/***************************   下拉树  ******************************/

//Bug类别
var bugCategoryTree = new Ext.tree.TreePanel({ 
    rootVisible:false, 
    autoScroll:true,
    autoHeight:false,
    loader: new Ext.tree.TreeLoader({
          dataUrl:'servlet/bugCategory?type=queryByPid'
    }),     
    root : new Ext.tree.AsyncTreeNode({
          id:'-1',
          text:'根结点',
          expanded:true
    }),
    listeners : {
		'click' : function(n) {
//				parentHide.setValue(n.id);
			}
		}
});


var bugCategoryComb = new Ext.ux.combo.ComboBoxTree({
	passName:'bugInfo.bugCategory.id',
	fieldLabel : 'Bug类别',
	allowUnLeafClick:false,
	listWidth:400,
	treeHeight : 300,
	anchor:ExtFormUtil.anchor,
	tree : bugCategoryTree
});
showInfoCmpArr.push(bugCategoryComb);

// 发现阶段
var discoveryPhaseTree = new Ext.tree.TreePanel({ 
    rootVisible:false, 
    autoScroll:true,
    autoHeight:false,
    loader: new Ext.tree.TreeLoader({
          dataUrl:'servlet/discoveryPhase?type=queryByPid'
    }),     
    root : new Ext.tree.AsyncTreeNode({
          id:'-1',
          text:'根结点',
          expanded:true
    }),
    listeners : {
		'click' : function(n) {
//				parentHide.setValue(n.id);
			}
		}
});

var discoveryPhaseComb = new Ext.ux.combo.ComboBoxTree({
	passName:'bugInfo.discoveryPhase.id',
	fieldLabel : 'BUG发现阶段',
	allowUnLeafClick:false,
	listWidth:400,
	treeHeight : 300,
	anchor:ExtFormUtil.anchor,
	tree : discoveryPhaseTree
});
showInfoCmpArr.push(discoveryPhaseComb);





var delayProperty = new Ext.form.RadioGroup({
    fieldLabel : "Delay属性",
    anchor:ExtFormUtil.anchor,
    items : [{
        boxLabel : 'ByPSD',
        inputValue : "ByPSD",
        name : "bugInfo.delayProperty"
    }, {
        boxLabel : 'ByDevelopment',
        name : "bugInfo.delayProperty",
        inputValue : "ByDevelopment"
    }]
});

osCombo.on('change', function(field,value,oldvalue){
	friendAlert("操作系统已变更。如果需要,请同步操作系统信息");
	webosComb.setValue("");
	webosComb.getStore().load();
});

workPackageStore.on('beforeload',function(s,obj){
	if(osCombo.getValue() != ""){
		obj.params['osId'] = osCombo.getValue();
		s.baseParams.type = 'queryByOs';
	}else{
		friendAlert("请选择操作系统,不然无法正确定位工作包信息");
	}
});



// 审核人
var checkerCombConfig = {};
checkerCombConfig.hiddenName = 'bugInfo.checker.id';
checkerCombConfig.emptyText = '请选择审核人';
checkerCombConfig.store = userStore;
checkerCombConfig.mode = 'local';
var checkerComb = ExtFormUtil.getCommonComboBox(checkerCombConfig);

checkerComb.on('beforeselect',function(combo,record){
	// 如果原先没有选过,则不进行校验
//	if(bugInfo.checkerId){
	if(isCheck.getValue()){
		friendAlert("不能修改审核人，该归属人已经通过审核");
		return false;
	}
//	}
});



var isCheck = new Ext.form.Checkbox({
	name : "bugInfo.checked",  
	inputValue : "1",
	listeners : {
		'change' : function(field,newValue,oldValue) {
			var checker = checkerComb.getValue();
			if(checker == ""){
				friendAlert("请配置审核人");
				field.setValue(oldValue);
				return;
			}else if(checker != user.id){
				friendAlert("您不是审核人,无权进行审核");
				field.setValue(oldValue);
				return;
			}
		}
	}
});

var checkerField = new Ext.form.CompositeField({
		xtype: 'compositefield',
		fieldLabel:'审核人',
		autoHeight:true,
		anchor:ExtFormUtil.anchor,
		items: [checkerComb,isCheck]
});

/**
 * 审核人2
 */
var checkerComb2Config = {};
checkerComb2Config.hiddenName = 'bugInfo.checker2.id';
checkerComb2Config.emptyText = '请选择审核人2';
checkerComb2Config.store = userStore;
checkerComb2Config.mode = 'local';
var checker2Comb = ExtFormUtil.getCommonComboBox(checkerComb2Config);

checker2Comb.on('beforeselect',function(combo,record){
	if(isCheck2.getValue()){
		friendAlert("不能修改审核人2，该归属人已经通过审核");
		return false;
	}
});

var isCheck2 = new Ext.form.Checkbox({
	name : "bugInfo.checked2",  
	inputValue : "1",
	listeners : {
		'change' : function(field,newValue,oldValue) {
			var checker = checker2Comb.getValue();
			if(checker == ""){
				friendAlert("请配置审核人2");
				field.setValue(oldValue);
				return;
			}else if(checker != user.id){
				friendAlert("您不是审核人2,无权进行审核");
				field.setValue(oldValue);
				return;
			}
		}
	}
});

var checkerField2 = new Ext.form.CompositeField({
		xtype: 'compositefield',
		fieldLabel:'审核人2',
		autoHeight:true,
		anchor:ExtFormUtil.anchor,
		items: [checker2Comb,isCheck2]
});


/**
 * 审核人3
 */
var checkerComb3Config = {};
checkerComb3Config.hiddenName = 'bugInfo.checker3.id';
checkerComb3Config.emptyText = '请选择审核人3';
checkerComb3Config.store = userStore;
checkerComb3Config.mode = 'local';
var checker3Comb = ExtFormUtil.getCommonComboBox(checkerComb3Config);

checker3Comb.on('beforeselect',function(combo,record){
	if(isCheck3.getValue()){
		friendAlert("不能修改审核人3，该归属人已经通过审核");
		return false;
	}
});

var isCheck3 = new Ext.form.Checkbox({
	name : "bugInfo.checked3",  
	inputValue : "1",
	listeners : {
		'change' : function(field,newValue,oldValue) {
			var checker = checker3Comb.getValue();
			if(checker == ""){
				friendAlert("请配置审核人3");
				field.setValue(oldValue);
				return;
			}else if(checker != user.id){
				friendAlert("您不是审核人3,无权进行审核");
				field.setValue(oldValue);
				return;
			}
		}
	}
});

var checkerField3 = new Ext.form.CompositeField({
		xtype: 'compositefield',
		fieldLabel:'审核人3',
		autoHeight:true,
		anchor:ExtFormUtil.anchor,
		items: [checker3Comb,isCheck3]
});


/**
 * 审核人4
 */
var checkerComb4Config = {};
checkerComb4Config.hiddenName = 'bugInfo.checker4.id';
checkerComb4Config.emptyText = '请选择审核人4';
checkerComb4Config.store = userStore;
checkerComb4Config.mode = 'local';
var checker4Comb = ExtFormUtil.getCommonComboBox(checkerComb4Config);

checker4Comb.on('beforeselect',function(combo,record){
	if(isCheck4.getValue()){
		friendAlert("不能修改审核人4，该归属人已经通过审核");
		return false;
	}
});

var isCheck4 = new Ext.form.Checkbox({
	name : "bugInfo.checked4",  
	inputValue : "1",
	listeners : {
		'change' : function(field,newValue,oldValue) {
			var checker = checker4Comb.getValue();
			if(checker == ""){
				friendAlert("请配置审核人4");
				field.setValue(oldValue);
				return;
			}else if(checker != user.id){
				friendAlert("您不是审核人4,无权进行审核");
				field.setValue(oldValue);
				return;
			}
		}
	}
});

var checkerField4 = new Ext.form.CompositeField({
		xtype: 'compositefield',
		fieldLabel:'审核人4',
		autoHeight:true,
		anchor:ExtFormUtil.anchor,
		items: [checker4Comb,isCheck4]
});

// 最早引入分支
var branchStoreConfig = {};
branchStoreConfig.params = {type:'getAllBranchByOs',osId:bugInfo.operateSystemId};
branchStoreConfig.url = 'servlet/branch';
var branchStore = ExtFormUtil.getCommonComboBoxStore(branchStoreConfig);
branchStore.load();
branchStore.on("load",function(store,record){
	if(record.length == 0){
		branchComb.setVisible(false);
	}
});

var branchCombConfig = {};
branchCombConfig.hiddenName = 'bugInfo.branch.id';
branchCombConfig.emptyText = '最早引入分支';
branchCombConfig.fieldLabel = '最早引入分支';
branchCombConfig.store = branchStore;
branchCombConfig.mode = 'local';
var branchComb = ExtFormUtil.getCommonComboBox(branchCombConfig);


// 状态变更为解决时候,需要必填的项
var resolved_analyseAreaConfig = {};
resolved_analyseAreaConfig.fieldLabel = '分析过程';
resolved_analyseAreaConfig.name = 'bugInfoExp.resolvedAnalyse';
resolved_analyseAreaConfig.anchor = ExtFormUtil.anchoreTreeToOne;
resolved_analyseAreaConfig.hidden = true;
var resolved_analyse = ExtFormUtil.getCommonTextField(resolved_analyseAreaConfig);

var resolved_solutionAreaConfig = {};
resolved_solutionAreaConfig.fieldLabel = '解决方案';
resolved_solutionAreaConfig.name = 'bugInfoExp.resolvedSolution';
resolved_solutionAreaConfig.anchor = ExtFormUtil.anchoreTreeToOne;
resolved_solutionAreaConfig.hidden = true;
var resolved_solution = ExtFormUtil.getCommonTextField(resolved_solutionAreaConfig);

var resolved_verificationAreaConfig = {};
resolved_verificationAreaConfig.fieldLabel = '验证解决方案';
resolved_verificationAreaConfig.name = 'bugInfoExp.resolvedVerification';
resolved_verificationAreaConfig.anchor = ExtFormUtil.anchoreTreeToOne;
resolved_verificationAreaConfig.hidden = true;
var resolved_verification = ExtFormUtil.getCommonTextField(resolved_verificationAreaConfig);

var resolved_moduleAffectAreaConfig = {};
resolved_moduleAffectAreaConfig.fieldLabel = '对其他模块影响';
resolved_moduleAffectAreaConfig.name = 'bugInfoExp.resolvedModuleAffect';
resolved_moduleAffectAreaConfig.anchor = ExtFormUtil.anchoreTreeToOne;
resolved_moduleAffectAreaConfig.hidden = true;
var resolved_moduleAffect = ExtFormUtil.getCommonTextField(resolved_moduleAffectAreaConfig);

var resolved_productAffectAreaConfig = {};
resolved_productAffectAreaConfig.fieldLabel = '对其他产品的影响';
resolved_productAffectAreaConfig.name = 'bugInfoExp.resolvedProductAffect';
resolved_productAffectAreaConfig.anchor = ExtFormUtil.anchoreTreeToOne;
resolved_productAffectAreaConfig.hidden = true;
var resolved_productAffect = ExtFormUtil.getCommonTextField(resolved_productAffectAreaConfig);

//是否能通过一键收集解决
var resolvedByCollectionCombConfig = {};
resolvedByCollectionCombConfig.hiddenName = 'bugInfo.resolvedByCollection.id';
resolvedByCollectionCombConfig.fieldLabel = '通过一键收集解决';
resolvedByCollectionCombConfig.emptyText = '请选择能否通过一键收集解决';
resolvedByCollectionCombConfig.store = resolvedByCollectionStore;
var resolvedByCollectionCombo = ExtFormUtil.getCommonComboBox(resolvedByCollectionCombConfig);
showInfoCmpArr.push(resolvedByCollectionCombo);

//一键收集解决信息
var resolvedByCollectionReasonField = ExtFormUtil.getCommonTextField({
	fieldLabel: '一键收集解决信息',
	name: 'bugInfo.resolvedByCollectionReason',
	emptyText:'请填写通过一键收集信息包，定位到的信息点，比如：某个文件路径、某个表项信息等',
	helpText : '是: 通过一键收集的哪些表项完成问题定位<br/><br/>否: 为什么无法通过一键收集定位问题/如何改进一键收集',
 	anchor:ExtFormUtil.anchoreTreeToOne
});
showInfoCmpArr.push(resolvedByCollectionReasonField);