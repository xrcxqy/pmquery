/******************************************************************** 操作系统 *****************************/
var osCombo = ExtFormUtil.getComboboxAddFieldVbox({
	name : 'queryBean.operateSystemJoin',
	fieldLabel : '操作系统',
	emptyText : '请选择操作系统',
	anchor : ExtFormUtil.anchoreTreeToOne,
	store : allOperateSystemStore
});
SearchOP.pushTosearchCmpList(osCombo);

osCombo.select = function (){
	workPackageStore.reload();
}

workPackageStore.on('beforeload',function(s,obj){
	if(osCombo.getValue() != ""){
		obj.params['osIdList'] = osCombo.getValue();
		s.baseParams.type = 'queryByOsList';
	}else{
		friendAlert("请选择操作系统,不然无法正确定位工作包信息");
	}
});

/******************************************************************** 工作包 *****************************/
var workPackageCombo = ExtFormUtil.getComboboxAddFieldVbox({
	name : 'queryBean.workPackageJoin',
	fieldLabel : '工作包',
	emptyText : '请选工作包',
	anchor : ExtFormUtil.anchoreTreeToOne,
	store : workPackageStore
});
SearchOP.pushTosearchCmpList(workPackageCombo);

/******************************************************************** Delay到此版本 *****************************/
var delayOsCombo = ExtFormUtil.getComboboxAddFieldVbox({
	name : 'queryBean.delayOsJoin',
	fieldLabel : 'Delay到此版本',
	emptyText : '请选择操作系统',
	anchor : ExtFormUtil.anchoreTreeToOne,
	store : allOperateSystemStore
});
SearchOP.pushTosearchCmpList(delayOsCombo);

/******************************************************************** Bug简介 *****************************/
var summaryField = new Ext.form.TextField({
  	fieldLabel: 'Bug简介',
  	labelStyle :'font-weight:bold',
	helpText :'请与其他查询条件进行组合查询.eg:操作系统,时间范围.',
	name: 'queryBean.viewBugInfo.summary',
 	anchor:ExtFormUtil.anchorone
});
SearchOP.pushTosearchCmpList(summaryField);

/******************************************************************** 专项 *****************************/
var specialField = new Ext.form.TextField({
  	fieldLabel: '专项',
  	labelStyle :'font-weight:bold',
	helpText :'通过模糊查询,匹配相应专项信息.',
	name: 'queryBean.viewBugInfo.special',
 	anchor:ExtFormUtil.anchorone
});
SearchOP.pushTosearchCmpList(specialField);

/******************************************************************** BugID列表 *****************************/
var bugIDList = new Ext.form.TextField({
  	fieldLabel: 'BugID列表',
  	labelStyle :'font-weight:bold',
	name: 'queryBean.bugIdJoin',
 	anchor:ExtFormUtil.anchorone,
 	helpText : '每个ID请用逗号分隔(,)eg: 88888 或则 66666,88888。否则查询可能报错'
});
SearchOP.pushTosearchCmpList(bugIDList);

/******************************************************************** Bug提交人 *****************************/
var submiterComb = ExtFormUtil.getComboboxAddFieldVbox({
	name : 'queryBean.submiterJoin',
	fieldLabel : 'Bug提交人',
	emptyText : '请选择Bug提交人',
	store : userStore
});
SearchOP.pushTosearchCmpList(submiterComb);


/******************************************************************** Bug负责人 *****************************/
var changerComb = ExtFormUtil.getComboboxAddFieldVbox({
	name : 'queryBean.chargeJoin',
	fieldLabel : 'Bug负责人',
	emptyText : '请选择Bug负责人',
	store : userStore
});
SearchOP.pushTosearchCmpList(changerComb);

/******************************************************************** Bug归属人 *****************************/
var vestingPeopleComb = ExtFormUtil.getComboboxAddFieldVbox({
	name : 'queryBean.vestingPeopleJoin',
	fieldLabel : 'Bug归属人',
	emptyText : '请选择Bug归属人',
	helpText : '谁产生这个BUG',
	store : userStore
});
SearchOP.pushTosearchCmpList(vestingPeopleComb);

/******************************************************************** 测试负责人 *****************************/
var testchargeComb = ExtFormUtil.getComboboxAddFieldVbox({
	name : 'queryBean.testchargeJoin',
	fieldLabel : '测试负责人',
	emptyText : '请选择测试负责人',
	store : userStore
});
SearchOP.pushTosearchCmpList(testchargeComb);

/******************************************************************** PSTL *****************************/
var pstlComb = ExtFormUtil.getComboboxAddFieldVbox({
	name : 'queryBean.pstlJoin',
	fieldLabel : 'PSTL',
	emptyText : '请选择PSTL',
	store : userStore
});
SearchOP.pushTosearchCmpList(pstlComb);

/******************************************************************** 未解决BUG *****************************/
var checkboxWaitResolved = new Ext.form.Checkbox({
	boxLabel:'<span style="color:blue">未解决BUG</span>',
	name : "",  
	inputValue : "-1",
	listeners : {
		'check' : function(field,checked) {
			Ext.each(stateCmp.items.items,function(item,index){
				if(item.inputValue == 2 || item.inputValue == 3 ||
					item.inputValue == 6 || item.inputValue == 18 ||
					item.inputValue == 16 || item.inputValue == 4 ){
					item.setValue(checked);
				}
			});
		}
	}
});
SearchOP.pushTosearchCmpList(checkboxWaitResolved);

/******************************************************************** 已解决BUG *****************************/
var checkboxResolved = new Ext.form.Checkbox({
	boxLabel:'<span style="color:blue">已解决BUG</span>',
	name : "",  
	inputValue : "-1",
	listeners : {
		'check' : function(field,checked) {
			Ext.each(stateCmp.items.items,function(item,index){
				if(item.inputValue == 5 || item.inputValue == 7 ||
					item.inputValue == 13 || item.inputValue == 14 ){
					item.setValue(checked);
				}
			});
		}
	}
});
SearchOP.pushTosearchCmpList(checkboxResolved);

/******************************************************************** 未关闭BUG *****************************/
var unCloseBug = new Ext.form.Checkbox({
	boxLabel:'<span style="color:blue">未关闭BUG</span>',
	name : "",  
	inputValue : "-1",
	listeners : {
		'check' : function(field,checked) {
			Ext.each(stateCmp.items.items,function(item,index){
				if(item.inputValue == 5 || item.inputValue == 14){
					item.setValue(checked);
				}
			});
		}
	}
});
SearchOP.pushTosearchCmpList(unCloseBug);

/******************************************************************** 非BUG *****************************/
var checkboxNoBug = new Ext.form.Checkbox({
	boxLabel:'<span style="color:blue">非BUG</span>',
	name : "",  
	inputValue : "-1",
	listeners : {
		'check' : function(field,checked) {
			Ext.each(stateCmp.items.items,function(item,index){
				if(item.inputValue == 8 || item.inputValue == 17 ||
					item.inputValue == 21 ){
					item.setValue(checked);
				}
			});
		}
	}
});

SearchOP.pushTosearchCmpList(checkboxNoBug);

/******************************************************************** 当前状态 *****************************/
var stateCmp = new Ext.form.CheckboxGroup({
    fieldLabel: '当前状态',
    bodyStyle:'text-align: left',
    align:'left',
    labelStyle :'font-weight:bold',
    columns:[160,130,130,160,100,100,100],
    postName:'queryBean.stateArr',
    setValue:function(inputValueList){
    	SearchOP.setCheckboxGroupValue(inputValueList,this);
    },
    items: [
        {boxLabel: 'NEW', name: 'queryBean.stateArr', inputValue:2},
        {boxLabel: 'ASSIGNED', name: 'queryBean.stateArr', inputValue:3},
        {boxLabel: 'VERIFIED', name: 'queryBean.stateArr', inputValue:6},
        {boxLabel: 'REQUEST', name: 'queryBean.stateArr', inputValue:18},
        {boxLabel: 'RENEW', name: 'queryBean.stateArr', inputValue:16},
        {boxLabel: 'REOPENED', name: 'queryBean.stateArr', inputValue:4},
        checkboxWaitResolved,
        
        {boxLabel: 'RESOLVED', name: 'queryBean.stateArr', inputValue:5},
        {boxLabel: 'CHECKED', name: 'queryBean.stateArr', inputValue:14},
        {boxLabel: 'CLOSED-ByTest', name: 'queryBean.stateArr', inputValue:7},
        {boxLabel: 'CLOSED-ByDevelopment', name: 'queryBean.stateArr', inputValue:13},
		checkboxResolved,
        unCloseBug,
        {xtype: 'label', text: '',height:22},
       
        
       
        //{boxLabel: '<span style="color:blue">非BUG</span>', name: 'queryBean.stateArr', inputValue: 5},
        {boxLabel: 'DENIAL-ByDevelopment', name: 'queryBean.stateArr', inputValue:8},
        {boxLabel: 'DENIAL-ByTest', name: 'queryBean.stateArr', inputValue:17},
        {boxLabel: 'DENIAL-ByPSD', name: 'queryBean.stateArr', inputValue:21},
        checkboxNoBug,
        {xtype: 'label', text: '',height:22},
        {xtype: 'label', text: '',height:22},
        {xtype: 'label', text: '',height:22},
        
        
        {boxLabel: 'DELAY', name: 'queryBean.stateArr', inputValue:9},
        {boxLabel: 'GIVEUP', name: 'queryBean.stateArr', inputValue:22},
        {xtype: 'label', text: '',height:22},
        {xtype: 'label', text: '',height:22},
        {xtype: 'label', text: '',height:22},
        {xtype: 'label', text: '',height:22},
        {xtype: 'label', text: '',height:22}
    ]
});

SearchOP.pushTosearchCmpList(stateCmp);

/******************************************************************** 提交时间 *****************************/
var submitDateCmp = ExtFormUtil.getDateRangeCmp({
	helpText : '精确到天,系统默认添加 00:00:00 详情查看<br>系统帮助->BUG查询->查询项详解',
	fieldLabel : '提交时间',
	labelStyle : 'font-weight:bold',
	DateFromName : 'queryBean.submitDateFrom',
	DateToName : 'queryBean.submitDateTo'
});
SearchOP.pushTosearchCmpList(submitDateCmp);

/******************************************************************** 测试方法 *****************************/
var testmethodComb = ExtFormUtil.getComboboxAddFieldVbox({
	name : 'queryBean.testmethodJoin',
	fieldLabel : '测试方法',
	emptyText : '请选择测试方法',
	store : testMethodStore
});
SearchOP.pushTosearchCmpList(testmethodComb);

/******************************************************************** 测试用例 *****************************/
var testcaseComb = ExtFormUtil.getComboboxAddFieldVbox({
	name : 'queryBean.testcaseJoin',
	fieldLabel : '测试用例',
	emptyText : '请选择测试用例',
	store : testCaseStore
});
SearchOP.pushTosearchCmpList(testcaseComb);

/******************************************************************** 产品名称 *****************************/
var productComb = ExtFormUtil.getComboboxAddFieldVbox({
	name : 'queryBean.productJoin',
	fieldLabel : '产品名称',
	emptyText : '请选择产品名称',
	store : productStore
});
SearchOP.pushTosearchCmpList(productComb);

/******************************************************************** 可重复性 *****************************/
var repeatableComb = ExtFormUtil.getComboboxAddFieldVbox({
	name : 'queryBean.repeatableJoin',
	fieldLabel : '可重复性',
	emptyText : '请选择可重复性',
	store : repeatableStore
});
SearchOP.pushTosearchCmpList(repeatableComb);

/******************************************************************** 可测试性 *****************************/
var testabilityComb = ExtFormUtil.getComboboxAddFieldVbox({
	name : 'queryBean.testabilityJoin',
	fieldLabel : '可测试性',
	emptyText : '请选择可测试性',
	store : testabilityStore
});

SearchOP.pushTosearchCmpList(testabilityComb);

/******************************************************************** 可测试性专题 *****************************/
var testabilitySpecialComb = ExtFormUtil.getComboboxAddFieldVbox({
	name : 'queryBean.testabilitySpecialJoin',
	fieldLabel : '可测试性专题',
	emptyText : '请选择可测试性专题',
	store : testabilitySpecialStore
});
SearchOP.pushTosearchCmpList(testabilitySpecialComb);

/******************************************************************** 严重性 *****************************/
var severityComb = ExtFormUtil.getComboboxAddFieldVbox({
	name : 'queryBean.severityJoin',
	fieldLabel : '严重性',
	emptyText : '请选择严重性',
	store : severityStore
});
SearchOP.pushTosearchCmpList(severityComb);

/********************************************************************来源 *****************************/
var sourceComb = ExtFormUtil.getComboboxAddFieldVbox({
	name : 'queryBean.sourceJoin',
	fieldLabel : '来源',
	emptyText : '请选择来源',
	store : sourceStore
});
SearchOP.pushTosearchCmpList(sourceComb);

/********************************************************************优先级 *****************************/
var priorityComb = ExtFormUtil.getComboboxAddFieldVbox({
	name : 'queryBean.priorityJoin',
	fieldLabel : '优先级',
	emptyText : '请选择优先级',
	store : priorityStore
});
SearchOP.pushTosearchCmpList(priorityComb);

/********************************************************************测试用例编号 *****************************/
var testCaseNumField = ExtFormUtil.getTextFiedAddFieldVbox({
	anchor : ExtFormUtil.anchoreTreeToOne,
	name:'queryBean.viewBugInfo.testCaseNum',
	fieldLabel : '测试用例编号'
});
SearchOP.pushTosearchCmpList(testCaseNumField);

/********************************************************************一键收集 *****************************/
var oneKeyCollectionComb = ExtFormUtil.getComboboxAddFieldVbox({
	name : 'queryBean.oneKeyCollectionJoin',
	fieldLabel : '一键收集',
	emptyText : '请选择一键收集类型',
	store : oneKeyCollectionStore
});
SearchOP.pushTosearchCmpList(oneKeyCollectionComb);

/********************************************************************一键收集解决 *****************************/
var resolvedByCollectionComb = ExtFormUtil.getComboboxAddFieldVbox({
	name : 'queryBean.resolvedByCollectionJoin',
	fieldLabel : '一键收集解决',
	emptyText : '请选择是否一键收集解决',
	store : resolvedByCollectionStore
});
SearchOP.pushTosearchCmpList(resolvedByCollectionComb);

/********************************************************************关联产品*****************************/

var relatPproductComb = ExtFormUtil.getComboboxAddFieldVbox({
	name : 'queryBean.relatProductJoin',
	fieldLabel : '关联产品',
	emptyText : '请选择关联产品',
	store : productStore
});
SearchOP.pushTosearchCmpList(relatPproductComb);

/********************************************************************bug引入状态*****************************/
var introducedStateComb = ExtFormUtil.getComboboxAddFieldVbox({
	name : 'queryBean.introducedStateJoin',
	fieldLabel : 'bug引入状态',
	emptyText : '请选择bug引入状态',
	store : introducedStateStore
});
SearchOP.pushTosearchCmpList(introducedStateComb);

/********************************************************************闭环措施*****************************/
var closeStepComb = ExtFormUtil.getComboboxAddFieldVbox({
	name : 'queryBean.closeStepJoin',
	fieldLabel : '闭环措施',
	emptyText : '请选择闭环措施',
	store : closeStepStore
});

SearchOP.pushTosearchCmpList(closeStepComb);

/********************************************************************是否已闭环*****************************/
var closeLoopComb = ExtFormUtil.getComboboxAddFieldVbox({
	name : 'queryBean.closeLoopJoin',
	fieldLabel : '是否已闭环',
	emptyText : '请选择是否已闭环',
	store : closeLoopStore
});
SearchOP.pushTosearchCmpList(closeLoopComb);

/********************************************************************解决方式*****************************/
var resolutionComb = ExtFormUtil.getComboboxAddFieldVbox({
	name : 'queryBean.resolutionJoin',
	fieldLabel : '解决方式',
	emptyText : '请选择解决方式',
	store : resolutionStore
});
SearchOP.pushTosearchCmpList(resolutionComb);

/********************************************************************是否用户接口修订并通过三方评审**********/
var userRevisedTripartiteReviewComb = ExtFormUtil.getComboboxAddFieldVbox({
	name : 'queryBean.userRevisedTripartiteReviewJoin',
	fieldLabel : '是否用户接口修订并通过三方评审',
	emptyText : '请选择是否用户接口修订并通过三方评审',
	store : userRevisedTripartiteReviewStore
});
SearchOP.pushTosearchCmpList(userRevisedTripartiteReviewComb);

/********************************************************************BUG通告ID**********/
var bugReportIdCmp = ExtFormUtil.getTextFiedAddFieldVbox({
	fieldLabel : 'BUG通告ID',
	name:'queryBean.viewBugInfo.bugReportId'
});
SearchOP.pushTosearchCmpList(bugReportIdCmp);

/********************************************************************设计/编码*********/
var designCodingPrincipleCmp = new Ext.form.RadioGroup({
	postName:'queryBean.viewBugInfo.designCodingPrinciple',
    xtype: 'checkboxgroup',
    fieldLabel: ' <font style="font-weight:bold;">设计/编码</font>',
    columns: 3,
    items: [
        {boxLabel: '不限制',    name: 'queryBean.viewBugInfo.designCodingPrinciple',inputValue :'',checked:true},
        {boxLabel: '已填写', 	name: 'queryBean.viewBugInfo.designCodingPrinciple',inputValue :2},
        {boxLabel: '未填写', 	name: 'queryBean.viewBugInfo.designCodingPrinciple',inputValue :1}
    ]
});
SearchOP.pushTosearchCmpList(designCodingPrincipleCmp);

/********************************************************************一键收集*********/
var oneKeyCollectionCmp = new Ext.form.RadioGroup({
	postName:'queryBean.oneKeyCollection',
    xtype: 'checkboxgroup',
    helpText:'是:一键收集项不为空.<br/>否: 一键收集项为空',
    fieldLabel: ' <font style="font-weight:bold;">一键收集</font>',
    columns: 3,
    items: [
        {boxLabel: '不限制', name: 'queryBean.oneKeyCollection',inputValue :'',checked:true},
        {boxLabel: '是', 	name: 'queryBean.oneKeyCollection',inputValue :1},
        {boxLabel: '否', 	name: 'queryBean.oneKeyCollection',inputValue :2}
    ]
});
SearchOP.pushTosearchCmpList(oneKeyCollectionCmp);

/********************************************************************遗留Bug*********/
var legacyCmp = new Ext.form.RadioGroup({
	postName:'queryBean.viewBugInfo.legacyId',
    xtype: 'checkboxgroup',
    fieldLabel: ' <font style="font-weight:bold;">遗留Bug</font>',
    columns: 3,
    items: [
        {boxLabel: '不限制', name: 'queryBean.viewBugInfo.legacyId',inputValue :'',checked:true},
        {boxLabel: '是', 	name: 'queryBean.viewBugInfo.legacyId',inputValue :2},
        {boxLabel: '否', 	name: 'queryBean.viewBugInfo.legacyId',inputValue :1}
    ]
});
SearchOP.pushTosearchCmpList(legacyCmp);

/********************************************************************SAME-AS*********/
var sameAsBugRadioGroup = new Ext.form.RadioGroup({
	postName:'queryBean.sameAsBugType',
    xtype: 'checkboxgroup',
    fieldLabel: ' <font style="font-weight:bold;">SAME-AS</font>',
    columns: 3,
    items: [
        {boxLabel: '不限制', name: 'queryBean.sameAsBugType',inputValue :'',checked:true},
        {boxLabel: '是', 	name: 'queryBean.sameAsBugType',inputValue :2},
        {boxLabel: '否', 	name: 'queryBean.sameAsBugType',inputValue :1}
    ]
});
SearchOP.pushTosearchCmpList(sameAsBugRadioGroup);

/********************************************************************镜像BUG*********/
var mirrorBugRadioGroup = new Ext.form.RadioGroup({
	postName:'queryBean.mirrorBugType',
    xtype: 'checkboxgroup',
    fieldLabel: ' <font style="font-weight:bold;">镜像BUG</font>',
    columns: 3,
    items: [
        {boxLabel: '不限制', name: 'queryBean.mirrorBugType',inputValue :'',checked:true},
        {boxLabel: '是', 	name: 'queryBean.mirrorBugType',inputValue :2},
        {boxLabel: '否', 	name: 'queryBean.mirrorBugType',inputValue :1}
    ]
});
SearchOP.pushTosearchCmpList(mirrorBugRadioGroup);

/********************************************************************负责人角色*********/
var ownerUserRadioGroup = new Ext.form.RadioGroup({
	postName:'queryBean.viewBugInfo.userRole',
    xtype: 'checkboxgroup',
    fieldLabel: ' <font style="font-weight:bold;">负责人角色</font>',
    columns: 3,
    items: [
        {boxLabel: '不限制', name: 'queryBean.viewBugInfo.userRole',inputValue :'',checked:true},
        {boxLabel: '开发', 	name: 'queryBean.viewBugInfo.userRole',inputValue :2},
        {boxLabel: '测试', 	name: 'queryBean.viewBugInfo.userRole',inputValue :3}
    ]
});
SearchOP.pushTosearchCmpList(ownerUserRadioGroup);

/********************************************************************需要发BUG通告*********/
var needBugReportComb = ExtFormUtil.getComboboxAddFieldVbox({
	name : 'queryBean.needBugReportJoin',
	fieldLabel : '需要发BUG通告',
	emptyText : '请选择需要发BUG通告',
	store : needBugReportStore
});
SearchOP.pushTosearchCmpList(needBugReportComb);

/********************************************************************关联caf表单ID*********/
var cafCmp = ExtFormUtil.getTextFiedAddFieldVbox({
	fieldLabel : '关联caf表单ID',
	name:'queryBean.cafId'
});
SearchOP.pushTosearchCmpList(cafCmp);

/********************************************************************专业组*********/
var groupConfig = {};
groupConfig.params = {type:'professionalGroup'};
groupConfig.url = 'servlet/system';
var groupStore = ExtFormUtil.getCommonComboBoxStore(groupConfig);
//bug引入状态
var groupComb = ExtFormUtil.getComboboxAddFieldVbox({
	name : 'queryBean.professionalGroupJoin',
	fieldLabel : '专业组(负责人)',
	emptyText : '请选择专业组',
	listWidth:400,
	store : groupStore
});
SearchOP.pushTosearchCmpList(groupComb);

/********************************************************************专业组(提交人)*********/
var submiterGroupComb = ExtFormUtil.getComboboxAddFieldVbox({
	name : 'queryBean.submiterGroupJoin',
	fieldLabel : '专业组(提交人)',
	emptyText : '请选择专业组',
	listWidth:400,
	store : groupStore
});
SearchOP.pushTosearchCmpList(submiterGroupComb);

/********************************************************************修改前操作系统*********/
var osFromCombo = ExtFormUtil.getSingleComboVbox({
	hiddenName : 'queryBean.osFrom',
	fieldLabel : '修改前操作系统',
	emptyText : '请选择修改前操作系统',
	store : allOperateSystemStore
});
SearchOP.pushTosearchCmpList(osFromCombo);

/********************************************************************修改后操作系统*********/
var osToCombo = ExtFormUtil.getSingleComboVbox({
	hiddenName : 'queryBean.osTo',
	fieldLabel : '修改后操作系统',
	emptyText : '请选择修改后操作系统',
	store : allOperateSystemStore
});
SearchOP.pushTosearchCmpList(osToCombo);

/********************************************************************修改前状态*********/
var stateFromComb = ExtFormUtil.getSingleComboVbox({
	hiddenName : 'queryBean.stateFrom',
	fieldLabel : '修改前状态',
	emptyText : '请选择修改前状态',
	store : stateStore
	
});
SearchOP.pushTosearchCmpList(stateFromComb);

/********************************************************************修改后状态*********/
var stateToComb = ExtFormUtil.getSingleComboVbox({
	hiddenName : 'queryBean.stateTo',
	fieldLabel : '修改后状态',
	emptyText : '请选择修改后状态',
	store : stateStore
});
SearchOP.pushTosearchCmpList(stateToComb);

/******************************************************************** 提交时间 ***************/
var opDateCmp = ExtFormUtil.getDateRangeCmp({
	fieldLabel : '操作时间',
	labelStyle : 'font-weight:bold',
	DateFromName : 'queryBean.opDateFrom',
	DateToName : 'queryBean.opDateTo'
});
SearchOP.pushTosearchCmpList(opDateCmp);

/******************************************************************** 功能模块 ***************/
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
var functionModuleCombo = new Ext.form.CompositeField({
	postName : ['queryBean.functionmoduleJoin'],
	setPostValue:function(postValue){
		var combo = this.items.items[1];
		Ext.Ajax.request({
			url: 'servlet/functionModule',
			method: 'POST',
			params: {
				'type':'queryById',
				'id': postValue
			},
			success: function(response, options){
				var result = Ext.util.JSON.decode(response.responseText);
				if(result.success){
					combo.setRecordValue(result.id,result.text);
				}else{
					alert(result.msg);
				}
			}
		});
	},
	reset : function(dolayout){
		var combo = this.items.items[1];
		combo.reset();
		if(dolayout){
			this.findParentByType(Ext.form.FormPanel).doLayout();
		}
	},
	items:[
		{
			bodyStyle:'text-align: left;',
			layout:'column',
		 	border:false,
		 	items:[{
		 		columnWidth:1,
		 		border:false,
		 		items:[
		 		{
					xtype: 'displayfield',
					height:25,
					style:'font-weight:bold',
					value:"功能模块:"
				},
		 		new Ext.ux.combo.ComboBoxTree({
					id : 'treecombo',
					passName:'queryBean.functionmoduleJoin',
					fieldLabel : '功能模块',
					listWidth:400,
					allowUnLeafClick:false,
					treeHeight : 300,
					anchor:ExtFormUtil.anchor,
					tree : functionModuleTree
				})
				]
			}]
		}
	]
});
SearchOP.pushTosearchCmpList(functionModuleCombo);

/******************************************************************** 发现阶段 ***************/
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
var discoveryPhaseComb = new Ext.form.CompositeField({
	postName : ['queryBean.discoveryPhaseJoin'],
	setPostValue:function(postValue){
		var combo = this.items.items[1];
		Ext.Ajax.request({
			url: 'servlet/discoveryPhase',
			method: 'POST',
			params: {
				'type':'queryById',
				'id': postValue
			},
			success: function(response, options){
				var result = Ext.util.JSON.decode(response.responseText);
				if(result.success){
					combo.setRecordValue(result.id,result.value);
				}else{
					alert(result.msg);
				}
			}
		});
	},
	reset : function(dolayout){
		var combo = this.items.items[1];
		combo.reset();
		if(dolayout){
			this.findParentByType(Ext.form.FormPanel).doLayout();
		}
	},
	items:[
		{
			bodyStyle:'text-align: left;',
			layout:'column',
		 	border:false,
		 	items:[{
		 		columnWidth:1,
		 		border:false,
		 		items:[
		 		{
					xtype: 'displayfield',
					height:25,
					style:'font-weight:bold',
					value:"BUG发现阶段:"
				},
		 		new Ext.ux.combo.ComboBoxTree({
					passName:'queryBean.discoveryPhaseJoin',
					fieldLabel : 'BUG发现阶段',
					allowUnLeafClick:false,
					listWidth:400,
					treeHeight : 300,
					anchor:ExtFormUtil.anchor,
					tree : discoveryPhaseTree
				})
				]
			}]
		}
	]
});
SearchOP.pushTosearchCmpList(discoveryPhaseComb);

/******************************************************************** Bug类别 ***************/
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

var bugCategoryComb=new Ext.form.CompositeField({
	postName : ['queryBean.categoryJoin'],
	setPostValue:function(postValue){
		var combo = this.items.items[1];
		Ext.Ajax.request({
			url: 'servlet/bugCategory',
			method: 'POST',
			params: {
				'type':'queryById',
				'id': postValue
			},
			success: function(response, options){
				var result = Ext.util.JSON.decode(response.responseText);
				if(result.success){
					combo.setRecordValue(result.id,result.value);
				}else{
					alert(result.msg);
				}
			}
		});
	},
	reset : function(dolayout){
		var combo = this.items.items[1];
		combo.reset();
		if(dolayout){
			this.findParentByType(Ext.form.FormPanel).doLayout();
		}
	},
	items:[
		{
			bodyStyle:'text-align: left;',
			layout:'column',
		 	border:false,
		 	items:[{
		 		columnWidth:1,
		 		border:false,
		 		items:[
		 		{
					xtype: 'displayfield',
					height:25,
					style:'font-weight:bold',
					value:"Bug类别:"
				},
		 		 new Ext.ux.combo.ComboBoxTree({
					passName:'queryBean.categoryJoin',
					fieldLabel : 'Bug类别',
					allowUnLeafClick:false,
					listWidth:400,
					treeHeight : 300,
					anchor:ExtFormUtil.anchor,
					tree : bugCategoryTree
				})
				]
			}]
		}
	]
});
SearchOP.pushTosearchCmpList(bugCategoryComb);

/********************************************************************测试用例执行数*****************************/
var affectCaseCountCmp = new Ext.form.CompositeField({
	postName:['queryBean.viewBugInfo.affectCaseCount','queryBean.affectCaseCountFrom','queryBean.affectCaseCountTo'],
	xtype: 'compositefield',
	msgTarget: 'under',
	autoHeight:true,
	setPostValue:function(postValue,postName){
		Ext.each(this.items.items,function(field){
			if(field.name === postName){
				field.setValue(postValue);
				return false;
			}
		});
	},
	reset : function(dolayout){
		var affectCaseCount = this.items.items[1];
		var affectCaseCountStart = this.items.items[3];
		var affectCaseCountEnd = this.items.items[5];
		
		affectCaseCount.reset();
		affectCaseCountStart.reset();
		affectCaseCountEnd.reset();
		
		if(dolayout){
			this.findParentByType(Ext.form.FormPanel).doLayout();
		}
	},
	items: [{
		bodyStyle:'text-align: left;',
		layout:'column',
	 	border:false,
	 	items:[{
	 		columnWidth:1,
	 		border:false,
	 		items:[
	 		{
				xtype: 'displayfield',
				height:25,
				style:'font-weight:bold;',
				value:"测试用例执行数:"
			},{
				border:false,
				layout:'hbox',
				width : 150,
				items:[
			 		new Ext.form.TextField({
					  	name:'queryBean.viewBugInfo.affectCaseCount',
					  	width:30,
					 	anchor:ExtFormUtil.anchorone
					}),{
						xtype: 'displayfield',
						height:25,
						value:"或范围:"
					},new Ext.form.TextField({
					  	name:'queryBean.affectCaseCountFrom',
					  	width:30,
					 	anchor:ExtFormUtil.anchorone
					}),{
						xtype: 'displayfield',
						height:25,
						value:"至:"
					},new Ext.form.TextField({
					  	name:'queryBean.affectCaseCountTo',
					  	width:30,
					 	anchor:ExtFormUtil.anchorone
					})
				]
			}
			]
	 	}]
	}]
});
SearchOP.pushTosearchCmpList(affectCaseCountCmp);
