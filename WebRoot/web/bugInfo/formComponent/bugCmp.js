var showInfoCmpArr = new Array();
// 测试方法
var testMethodCombConfig = {};
testMethodCombConfig.hiddenName = 'bugInfo.testMethod.id';
testMethodCombConfig.fieldLabel = '测试方法';
testMethodCombConfig.emptyText = '请选择测试方法';
testMethodCombConfig.store = testMethodStore;
testMethodCombConfig.helpText='测试方法帮助文档';
var testMethodComb = ExtFormUtil.getCommonComboBox(testMethodCombConfig);

// 测试用例
var testCaseCombConfig = {};
testCaseCombConfig.hiddenName = 'bugInfo.testCase.id';
testCaseCombConfig.fieldLabel = '测试用例';
testCaseCombConfig.emptyText = '请选择测试用例';
testCaseCombConfig.store = testCaseStore;
var testCaseCombo = ExtFormUtil.getCommonComboBox(testCaseCombConfig);

// 产品名称
var productCombConfig = {};
productCombConfig.hiddenName = 'bugInfo.product.id';
productCombConfig.fieldLabel = '产品名称';
productCombConfig.emptyText = '请选择产品名称';
productCombConfig.store = productStore;
var productCombo = ExtFormUtil.getCommonComboBox(productCombConfig);

// 一键收集
var oneKeyCollectionCombConfig = {};
//oneKeyCollectionCombConfig.helpText = "如果是一键收集的BUG,请选择对应类型。<br/>并请同步上传收集的附件: tech_vsd******.tar.gz";
oneKeyCollectionCombConfig.hiddenName = 'bugInfo.oneKeyCollection.id';
oneKeyCollectionCombConfig.fieldLabel = '一键收集';
oneKeyCollectionCombConfig.emptyText = '请选择一键收集类型';
oneKeyCollectionCombConfig.store = oneKeyCollectionStore;
var oneKeyCollectionComb = ExtFormUtil.getCommonComboBox(oneKeyCollectionCombConfig);


//操作系统
var osCombConfig = {};
osCombConfig.hiddenName = 'bugInfo.operateSystem.id';
osCombConfig.fieldLabel = '操作系统';
osCombConfig.emptyText = '请选择操作系统';
if(bugInfo){
	osCombConfig.helpText = "如果操作系统填错等原因需要非NEW状态下变更,请联系QA帮忙进行协助修订";
}

osCombConfig.store = operateSystemStore;
var osCombo = ExtFormUtil.getCommonComboBox(osCombConfig);

//PSTL
var pstlCombConfig = {};
pstlCombConfig.hiddenName = 'bugInfo.pstl.id';
pstlCombConfig.fieldLabel = 'PSTL';
pstlCombConfig.emptyText = '请选择PSTL';
pstlCombConfig.store = userStore;
pstlCombConfig.mode = 'local';
var pstlCombo = ExtFormUtil.getCommonComboBox(pstlCombConfig);

//Bug负责人
var chargeCombConfig = {};
chargeCombConfig.hiddenName = 'bugInfo.charge.id';
chargeCombConfig.fieldLabel = '<span style="font-weight:bold;">Bug负责人</span>';
chargeCombConfig.emptyText = '请选择Bug负责人';
chargeCombConfig.store = userStore;
chargeCombConfig.mode = 'local';
var chargeCombo = ExtFormUtil.getCommonComboBox(chargeCombConfig);

//来源
var comefromCombConfig = {};
comefromCombConfig.hiddenName = 'bugInfo.source.id';
comefromCombConfig.fieldLabel = '来源';
comefromCombConfig.emptyText = '请选择来源';
comefromCombConfig.store = sourceStore;
var comefromComb = ExtFormUtil.getCommonComboBox(comefromCombConfig);

//可测试性
var testabilityCombConfig = {};
testabilityCombConfig.hiddenName = 'bugInfo.testability.id';
testabilityCombConfig.fieldLabel = '可测试性';
testabilityCombConfig.emptyText = '请选择可测试性';
testabilityCombConfig.store = testabilityStore;
var testabilityComb = ExtFormUtil.getCommonComboBox(testabilityCombConfig);

//可测试性专题
var testabilitySpecialCombConfig = {};
testabilitySpecialCombConfig.hiddenName = 'bugInfo.testabilitySpecial.id';
testabilitySpecialCombConfig.fieldLabel = '可测试性专题';
testabilitySpecialCombConfig.emptyText = '请选择可测试性专题';
testabilitySpecialCombConfig.store = testabilitySpecialStore;
var testabilitySpecialComb = ExtFormUtil.getCommonComboBox(testabilitySpecialCombConfig);

// bug 简介
var summaryField = new Ext.form.TextField({
  	fieldLabel: 'Bug简介',
//	emptyText:'请输入Bug简介',
	name: 'bugInfo.summary',
 	anchor:ExtFormUtil.anchorone
});

// 专项
var specialField = new Ext.form.TextField({
  	fieldLabel: '专项',
//	emptyText:'请输入Bug简介',
	name: 'bugInfo.special',
 	anchor:ExtFormUtil.anchorone
});

//可重复性
var repeatabilityCombConfig = {};
repeatabilityCombConfig.hiddenName = 'bugInfo.repeatable.id';
repeatabilityCombConfig.fieldLabel = '可重复性';
repeatabilityCombConfig.emptyText = '请选择可重复性';
repeatabilityCombConfig.store = repeatableStore;
var repeatabilityComb = ExtFormUtil.getCommonComboBox(repeatabilityCombConfig);

//严重性
var severityCombConfig = {};
severityCombConfig.hiddenName = 'bugInfo.severity.id';
severityCombConfig.fieldLabel = '严重性';
severityCombConfig.emptyText = '请选择严重性';
severityCombConfig.store = severityStore;
var severityComb = ExtFormUtil.getCommonComboBox(severityCombConfig);

//优先级
var priorityCombConfig = {};
priorityCombConfig.hiddenName = 'bugInfo.priority.id';
priorityCombConfig.fieldLabel = '优先级';
priorityCombConfig.emptyText = '请选择优先级';
priorityCombConfig.store = priorityStore;
priorityCombConfig.disabled = true; 
var priorityComb = ExtFormUtil.getCommonComboBox(priorityCombConfig);

//遗留Bug
var legacybugCombConfig = {};
legacybugCombConfig.hiddenName = 'bugInfo.legacyBug.id';
legacybugCombConfig.fieldLabel = '遗留Bug';
legacybugCombConfig.emptyText = '请选择是否遗留Bug';
legacybugCombConfig.store = legacyBugStore;
var legacybugComb = ExtFormUtil.getCommonComboBox(legacybugCombConfig);

showInfoCmpArr.push(legacybugComb);

// 影响执行数目
var affectNumOfCase = new Ext.form.NumberField({
  	fieldLabel: '影响用例执行数',
	emptyText:'(请填写 0 或 0 以上数字)',
	name: 'bugInfo.affectCaseCount',
	allowDecimals:false,
	allowNegative:false,
 	anchor:ExtFormUtil.anchor
});

// 资源消耗
var ResourceConsumptionField = new Ext.form.TextField({
  	fieldLabel: '资源消耗',
	name: 'bugInfoExp.resourceConsumption',
	helpText:'解决BUG实际耗时.<br/>支持周(w),天(d),小时(h),分钟(m)<br/>填写格式为: 数字 + 单位<br/>eg:1h, 1.5d, 2w, 30 <br/>如果不填写,默认为: m',
 	anchor:ExtFormUtil.anchor,
 	vtype:'timeCheck'
});

showInfoCmpArr.push(ResourceConsumptionField);

//测试用例编号
var testCaseNumField = new Ext.form.TextField({
  	fieldLabel: '测试用例编号',
	name: 'bugInfo.testCaseNum',
 	anchor:ExtFormUtil.anchorone
});

// 获得附件文本框
var uploadFieldConfig = {};
uploadFieldConfig.id = 'uploadConfigId';
uploadFieldConfig.name = 'bugInfoExp.uploadfile';
var uploadField = ExtFormUtil.getFileUploadField(uploadFieldConfig);

// 抄送人
//var ccUserField = new Ext.form.TextField({
//  	fieldLabel: '抄送人',
////	emptyText:'请输入Bug简介',
//	name: 'mig_textfield_1',
// 	anchor:ExtFormUtil.anchorone
//});
//cmpList.push(ccUserField);


var ccUserConfig = {};
ccUserConfig.name = 'bugInfoExp.ccUserList';
ccUserConfig.hidenId = 'ccNamehiddenId';
ccUserConfig.fieldLabel = '抄送人';
ccUserConfig.id = 'ccNameCompositeFieldId';
ccUserConfig.anchor = ExtFormUtil.anchoreTreeToOne;
//ccUserConfig.helpText = '抄送人';
ccUserConfig.store = userStore;
//linkCAFIDConfig.width = 165;
var ccUserField = ExtFormUtil.getComboboxAddField(ccUserConfig);

// Tag
var tagConfig = {};
tagConfig.name = 'bugInfoExp.bugTag';
tagConfig.hidenId = 'bugTaghidenId';
tagConfig.fieldLabel = 'Tag';
tagConfig.id = 'bugTagCompositeFieldId';
tagConfig.inputByEdit = true;
tagConfig.anchor = ExtFormUtil.anchoreTreeToOne;
tagConfig.store = tagStore;
var tagField = ExtFormUtil.getComboboxAddField(tagConfig);

/******************** 下拉树 **********************************/
// 功能模块
var functionModuleTree = new Ext.tree.TreePanel({ 
    rootVisible:false, 
    autoScroll:true,
    autoHeight:false,
    loader: new Ext.tree.TreeLoader({
          dataUrl:'servlet/functionModule?type=queryByPid'
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

var functionModuleCombo = new Ext.ux.combo.ComboBoxTree({
	id : 'treecombo',
//	editable:true,
	passName:'bugInfo.functionModule.id',
	fieldLabel : '功能模块',
//	width : 330,
	listWidth:400,
	allowUnLeafClick:false,
	treeHeight : 300,
	anchor:ExtFormUtil.anchor,
	tree : functionModuleTree
});
