
var tagStoreConfig = {};
tagStoreConfig.params = {type:'queryDistinctTag'};
tagStoreConfig.url = 'servlet/bugInfoTag';
tagStoreConfig.autoLoad = true;
var tagStore = ExtFormUtil.getCommonComboBoxStore(tagStoreConfig);

var userStoreConfig = {};
userStoreConfig.params = {type:'allUserInfo'};
userStoreConfig.url = 'servlet/userInfo';
userStoreConfig.autoLoad = true;
var userStore = ExtFormUtil.getCommonComboBoxStore(userStoreConfig);

var stateStoreConfig = {};
stateStoreConfig.params = {type:'queryAll'};
stateStoreConfig.url = 'servlet/state';
var stateStore = ExtFormUtil.getCommonComboBoxStore(stateStoreConfig);

var testMethodStoreConfig = {};
testMethodStoreConfig.params = {type:'queryAll'};
testMethodStoreConfig.url = 'servlet/testMethod';
var testMethodStore = ExtFormUtil.getCommonComboBoxStore(testMethodStoreConfig);

var testCaseStoreConfig = {};
testCaseStoreConfig.params = {type:'queryAll'};
testCaseStoreConfig.url = 'servlet/testCase';
var testCaseStore = ExtFormUtil.getCommonComboBoxStore(testCaseStoreConfig);

var productStoreConfig = {};
productStoreConfig.params = {type:'queryAll'};
productStoreConfig.url = 'servlet/product';
var productStore = ExtFormUtil.getCommonComboBoxStore(productStoreConfig);

var linkProductStore = ExtFormUtil.getCommonComboBoxStore(productStoreConfig);

var operateSystemStoreConfig = {};

/**
 * 1. 如果bugInfo 不为空,则表示是显示BUG页面.根据状态不同来添加不一样的参数
 * 2. 如果bugInfo 为空,则表示是添加BUG页面
 */
if(bugInfo){
	if(bugInfo.stateId == 2 || bugInfo.isQA){
		operateSystemStoreConfig.params = {type:'queryAll'};
	}else{
		operateSystemStoreConfig.params = {type:'queryByOS',os:bugInfo.operateSystemId};
	}
}else{
	operateSystemStoreConfig.params = {type:'queryAllNoDelete'};
}
operateSystemStoreConfig.url = 'servlet/operateSystem';
var operateSystemStore = ExtFormUtil.getCommonComboBoxStore(operateSystemStoreConfig);

operateSystemStoreConfig.params = {type:'queryAll'};
var allOperateSystemStore = ExtFormUtil.getCommonComboBoxStore(operateSystemStoreConfig);



var delayOperateSystemStoreConfig = {};
delayOperateSystemStoreConfig.params = {type:'queryAll'};
delayOperateSystemStoreConfig.url = 'servlet/operateSystem';
var delayOperateSystemStore = ExtFormUtil.getCommonComboBoxStore(delayOperateSystemStoreConfig);

var sourceStoreConfig = {};
sourceStoreConfig.params = {type:'queryAll'};
sourceStoreConfig.url = 'servlet/source';
var sourceStore = ExtFormUtil.getCommonComboBoxStore(sourceStoreConfig);

var repeatableStoreConfig = {};
repeatableStoreConfig.params = {type:'queryAll'};
repeatableStoreConfig.url = 'servlet/repeatable';
var repeatableStore = ExtFormUtil.getCommonComboBoxStore(repeatableStoreConfig);

var severityStoreConfig = {};
severityStoreConfig.params = {type:'queryAll'};
severityStoreConfig.url = 'servlet/severity';
var severityStore = ExtFormUtil.getCommonComboBoxStore(severityStoreConfig);

var legacyBugStoreConfig = {};
legacyBugStoreConfig.params = {type:'queryAll'};
legacyBugStoreConfig.url = 'servlet/legacyBug';
var legacyBugStore = ExtFormUtil.getCommonComboBoxStore(legacyBugStoreConfig);

var priorityStoreConfig = {};
priorityStoreConfig.params = {type:'queryAll'};
priorityStoreConfig.url = 'servlet/priority';
var priorityStore = ExtFormUtil.getCommonComboBoxStore(priorityStoreConfig);

var workPackageStoreConfig = {};
workPackageStoreConfig.params = {type:'queryAll'};
workPackageStoreConfig.url = 'servlet/workPackage';
var workPackageStore = ExtFormUtil.getCommonComboBoxStore(workPackageStoreConfig);

var discoveryPhaseStoreConfig = {};
discoveryPhaseStoreConfig.params = {type:'queryAll'};
discoveryPhaseStoreConfig.url = 'servlet/discoveryPhase';
var discoveryPhaseStore = ExtFormUtil.getCommonComboBoxStore(discoveryPhaseStoreConfig);

var resolutionStoreConfig = {};
resolutionStoreConfig.params = {type:'queryAll'};
resolutionStoreConfig.url = 'servlet/resolution';
var resolutionStore = ExtFormUtil.getCommonComboBoxStore(resolutionStoreConfig);


var needBugReportStoreConfig = {};
needBugReportStoreConfig.params = {type:'queryAll'};
needBugReportStoreConfig.url = 'servlet/needBugReport';
var needBugReportStore = ExtFormUtil.getCommonComboBoxStore(needBugReportStoreConfig);


var bugCategoryStoreConfig = {};
bugCategoryStoreConfig.params = {type:'queryAll'};
bugCategoryStoreConfig.url = 'servlet/bugCategory';
var bugCategoryStore = ExtFormUtil.getCommonComboBoxStore(bugCategoryStoreConfig);

var functionModuleStoreConfig = {};
functionModuleStoreConfig.params = {type:'queryAll'};
functionModuleStoreConfig.url = 'servlet/functionModule';
var functionModuleStore = ExtFormUtil.getCommonComboBoxStore(functionModuleStoreConfig);

var introducedStateStoreConfig = {};
introducedStateStoreConfig.params = {type:'queryAll'};
introducedStateStoreConfig.url = 'servlet/introducedState';
var introducedStateStore = ExtFormUtil.getCommonComboBoxStore(introducedStateStoreConfig);

var userRevisedTripartiteReviewStoreConfig = {};
userRevisedTripartiteReviewStoreConfig.params = {type:'queryAll'};
userRevisedTripartiteReviewStoreConfig.url = 'servlet/userRevisedTripartiteReview';
var userRevisedTripartiteReviewStore = ExtFormUtil.getCommonComboBoxStore(userRevisedTripartiteReviewStoreConfig);

var testabilityStoreConfig = {};
testabilityStoreConfig.params = {type:'queryAll'};
testabilityStoreConfig.url = 'servlet/testability';
var testabilityStore = ExtFormUtil.getCommonComboBoxStore(testabilityStoreConfig);

var testabilitySpecialStoreConfig = {};
testabilitySpecialStoreConfig.params = {type:'queryAll'};
testabilitySpecialStoreConfig.url = 'servlet/testabilitySpecial';
testabilitySpecialStoreConfig.record = new Ext.data.Record.create([     
		{name: 'id',    	type: 'string',	mapping:'id'},    
		{name: 'value', 	type: 'string',	mapping: 'value'},
		{name: 'template',	type: 'string', mapping: 'template'}
	]  
); 
var testabilitySpecialStore = ExtFormUtil.getCommonComboBoxStore(testabilitySpecialStoreConfig);

var closeStepStore = ExtFormUtil.getCommonComboBoxStore({
	url:'servlet/closeStep',
	params:{type:'queryAll'}
});

var closeLoopStore = ExtFormUtil.getCommonComboBoxStore({
	url:'servlet/closeLoop',
	params:{type:'queryAll'}
});

var oneKeyCollectionStore = ExtFormUtil.getCommonComboBoxStore({
	url:'servlet/oneKeyCollection',
	params:{type:'queryAll'}
});

var resolvedByCollectionStore = ExtFormUtil.getCommonComboBoxStore({
	url:'servlet/resolvedByCollection',
	params:{type:'queryAll'}
});