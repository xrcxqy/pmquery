var count = 0;
var reportCount = 1000;
var ddWin=null;//设置显示字段win
Ext.onReady(function() {
    Ext.QuickTips.init();
    var hideSelectJson = new Ext.form.Hidden({
		name : 'hideSelectJson'
	});
    var tbar=new Ext.Toolbar();
    tbar.add('我保存的查询: ');
    tbar.add(SearchOP.saveQueryComBobox);
    
    
    
    
    
	var form = new Ext.form.FormPanel({
        region:'center',
        labelAlign: 'left',
        autoScroll:true,
        width   : 1050,
        bodyStyle: 'padding: 10px',
        defaults: {
           	anchor :'-20',
            width: 230
        },
   	 	border:false,
   	 	tbar:tbar,
    	items:[hideSelectJson,{
      		xtype: 'fieldset',
     		title: '一般查询查询',
        	collapsible: true,
        	labelWidth: 80, 
        	defaults: {
           	 	border:false
        	},
        	items: [{
           	 	layout:'table',
           	 	border:false,
                layoutConfig: {columns:5},
                defaults: {frame:true, width:220, height: 1},
           	 	labelWidth: 1, 
            	items:[osCombo,workPackageCombo,delayOsCombo,{xtype: 'label', html: '<div >&nbsp;</div>'},{xtype: 'label', html: '<div >&nbsp;</div>'},//summaryField
            	submiterComb,changerComb,vestingPeopleComb,testchargeComb,pstlComb
            		
            	]
	      	},stateCmp,submitDateCmp,summaryField,{
           	 	layout:'column',
           	 	width:1000,
            	items:[{
                	columnWidth:1/2,
                	layout: 'form',
                	border:false,
                	items: [summaryField,specialField]
            	},{
                	columnWidth:1/2,
                	layout: 'form',
                	border:false,
                	items: [bugIDList]
            	}]
	      	},{
           	 	layout:'column',
           	 	width:1000,
            	items:[{
                	columnWidth:1/4,
                	layout: 'form',
                	border:false,
                	items: [sameAsBugRadioGroup]
            	},{
                	columnWidth:1/4,
                	layout: 'form',
                	border:false,
                	items: [mirrorBugRadioGroup]
            	},{
                	columnWidth:1/4,
                	layout: 'form',
                	border:false,
                	items: [ownerUserRadioGroup]
            	}]
	      	}]
        },{
      		xtype: 'fieldset',
     		title: '高级查询',
        	collapsible: true,
        	labelWidth: 70, 
        	defaults: {
           	 	border:false
        	},
        	items: [{
           	 	layout:'table',
                layoutConfig: {columns:5},
                defaults: {frame:true, width:200},
           	 	labelWidth: 1, 
            	items:[testmethodComb,testcaseComb,productComb,repeatableComb,testabilityComb,
            		severityComb,sourceComb,priorityComb,testCaseNumField,affectCaseCountCmp,
            		relatPproductComb,introducedStateComb,resolutionComb,userRevisedTripartiteReviewComb,bugReportIdCmp,
            		needBugReportComb,cafCmp,functionModuleCombo,discoveryPhaseComb,
            		bugCategoryComb,groupComb,submiterGroupComb,testabilitySpecialComb,closeStepComb,closeLoopComb,
            		oneKeyCollectionComb,resolvedByCollectionComb
            	]
	      	},{
           	 	layout:'column',
           	 	width:1000,
            	items:[{
                	columnWidth:1/4,
                	layout: 'form',
                	border:false,
                	items: [legacyCmp]
            	},{
                	columnWidth:1/4,
                	layout: 'form',
                	border:false,
                	items: [designCodingPrincipleCmp]
            	},{
                	columnWidth:1/4,
                	layout: 'form',
                	border:false,
                	items: [oneKeyCollectionCmp]
            	}]
            	
	      	}]
	    }],
	    
        buttonAlign:'center',
        buttons: [{
        	id:'submitBtnId',
  			text:'查询',
      		handler: function() {
      			submitForm(form)
        	}
   		},{
  			text:'重置查询条件',
      		handler: function() {
      			SearchOP.clearValue(SearchOP.searchCmpList,form);
        	}
   		},{
        	text:'自定义查询结果字段',
        	iconCls:'setup',
      		handler: function() {
      			if(ddWin==null)
	      			var ddWin= new Ext.Window({
				    	title:'设置查询结果显示字段',
				    	closeAction:'hide',
				    	maximizable: true,
				    	width: 650,
				    	//autoHeight:true,
				    	height:600,
				    	layout: 'fit',
						border:false,
						modal:true,
				    	items:  [ddPanel],
				    	buttons:[{
				    		text:'查询',
				    		handler:function(){ddWin.hide();submitForm(form);}
				    	},{
				    		text:'关闭',
				    		handler:function(){ddWin.hide()}
				    	}]    
					});
				ddWin.show(null,function(){ddPanel.init();});
        	}
   		}]
	});
	var viewport = new Ext.Viewport({
        layout:'border',
        autoScroll:true,
        items:[form]
    });
    
	SearchOP.form = form;
	
    function submitForm(form){
		count++;
		var node=new Object();
		node.attributes=new Object();
		node.attributes.id=count;
		node.attributes.text="第 " + count + " 次查询";
		parent.openQueryTab(node);
		hideSelectJson.setValue(ddPanel.parseTOJson()); 
		form.form.getEl().dom.target="iframe_"+count;
		form.form.getEl().dom.action='servlet/query?type=query';
		form.form.getEl().dom.submit(); 
	}
	
	function reportForm(form){
		reportCount++;
		var node=new Object();
		node.attributes=new Object();
		node.attributes.id=reportCount;
		node.attributes.text="第 " + (reportCount-1000) + " 次报表查看";
		parent.openQueryTab(node);
		form.form.getEl().dom.target="iframe_"+reportCount;
		form.form.getEl().dom.action='servlet/queryForStatistic?type=init';
		form.form.getEl().dom.submit(); 
	}
	
	// 默认关闭不常用查询项
	Ext.getCmp("settingFieldset").collapse();
});

