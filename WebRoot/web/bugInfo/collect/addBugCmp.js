var loadBugIdField = new Ext.form.NumberField({
//	width:120,
	allowDecimals:false,
	allowNegative:false,
	enableKeyEvents:true,
	emptyText:'导入的BUGID',
//	nanText : "BUGID 必须为连续的数字",
	listeners:{  
 		"keyup":function(field,e){  
			if(e.getKey() == Ext.EventObject.ENTER){  
				loadBugInfo();
			}  
    	}  
    }  
});


// 根据BUGID载入
var loadBug = new Ext.form.CompositeField({
	xtype: 'compositefield',
	fieldLabel:'BUGID',
	autoHeight:true,
	anchor:ExtFormUtil.anchorone,
	msgTarget: 'under',
	items: [loadBugIdField,{
		xtype: 'button', text: '载入',handler:function(){
			loadBugInfo();
		}
	}]
});

//测试拓扑
//var testTopologyAreaConfig = {};
//testTopologyAreaConfig.fieldLabel = '测试拓扑';
//testTopologyAreaConfig.name = 'mig_textfield_2';
//var testTopologyArea = ExtFormUtil.getCommonTextField(testTopologyAreaConfig);

/**
 * 
var testTopologyArea = new Ext.form.HtmlEditor({
	fieldLabel: "测试拓扑" + redFont,
	name:'bugInfo.testTopology',
    height: 400,
    anchor:ExtFormUtil.anchorone,
    labelWidth: 70,
    allowBlank:false,
    createLinkText: "创建超链接",
    defaultLinkValue: "http://",
    enableAlignments: true,
    enableColors: true,
    enableFont: true,
    enableFontSize: true,
    enableFormat: true,
    enableLinks: true,
    enableLists: true,
    enableSourceEdit: true,
    fontFamilies: ["宋体", "隶书", "黑体"],
    plugins: new Ext.ux.plugins.ImageDialog({  
        url: '/ExtjsTest/upload.action',    
        post_var_name:'imageUpload'  
    })    
});
 */
var testTopologyArea = ExtFormUtil.getHtmlEditor({
	fieldLabel: "测试拓扑" + redFont,
	name:'bugInfo.testTopology',
	anchor:ExtFormUtil.anchorone
});

//拓扑描述
var topologyDescriptionAreaConfig = {};
topologyDescriptionAreaConfig.fieldLabel = '拓扑描述';
topologyDescriptionAreaConfig.name = 'bugInfo.topologyDescription';
var topologyDescriptionArea = ExtFormUtil.getCommonTextField(topologyDescriptionAreaConfig);

//Bug描述
/**
 * 
 * @type 
 
var bugDescriptionAreaConfig = {};
bugDescriptionAreaConfig.fieldLabel = 'Bug描述';
bugDescriptionAreaConfig.name = 'bugInfo.bugDescription';
bugDescriptionAreaConfig.emptyText = '对Bug进行描述。主要包括：'+ 
									'\n 1) 对bug出现过程的操作，如发包、配置等进行描述' + 
									'\n 2）对bug的现象，bug确认的信息，如关键log的分析进行描述'+
									'\n 3）对bug出现后进行的可恢复操作进行描述。'+
									'\n 填写时请删除以上说明文字';

bugDescriptionAreaConfig.helpText = '对Bug进行描述。主要包括：'+ 
									'<br/>1) 对bug出现过程的操作，如发包、配置等进行描述' + 
									'<br/>2）对bug的现象，bug确认的信息，如关键log的分析进行描述'+
									'<br/>3）对bug出现后进行的可恢复操作进行描述。'+
									'<br/>填写时请删除以上说明文字';
var bugDescriptionArea = ExtFormUtil.getCommonTextField(bugDescriptionAreaConfig);
*/

var bugDescriptionArea = ExtFormUtil.getHtmlEditor({
	fieldLabel: "Bug描述" + redFont,
	name:'bugInfo.bugDescription',
	anchor:ExtFormUtil.anchorone
});

//Debug信息
var debugMessageAreaConfig = {};
debugMessageAreaConfig.fieldLabel = 'Debug信息';
debugMessageAreaConfig.name = 'bugInfo.bugDebugMessage';
debugMessageAreaConfig.allowBlank = false;
var debugMessageArea = ExtFormUtil.getCommonTextField(debugMessageAreaConfig);

//版本信息
var versionMessageAreaConfig = {};
versionMessageAreaConfig.fieldLabel = '版本信息';
versionMessageAreaConfig.name = 'bugInfo.bugVersionMessage';
var versionMessageArea = ExtFormUtil.getCommonTextField(versionMessageAreaConfig);

//被测设备配置
var productConfigAreaConfig = {};
productConfigAreaConfig.fieldLabel = '被测设备配置';
productConfigAreaConfig.name = 'bugInfo.deviceUnderTestConfig';
var productConfigArea = ExtFormUtil.getCommonTextField(productConfigAreaConfig);

// 测试程序
var testProcedureField = new Ext.form.TextField({
  	fieldLabel: '测试程序',
	name: 'bugInfo.testProgram',
 	anchor:ExtFormUtil.anchorone
});

//被测设备配置
var locateAreaConfig = {};
locateAreaConfig.fieldLabel = '定位信息';
locateAreaConfig.name = 'bugInfo.locate';
var locateArea = ExtFormUtil.getCommonTextField(locateAreaConfig);

//你的建议和看法
var ideaAreaConfig = {};
ideaAreaConfig.fieldLabel = '你的建议和看法';
ideaAreaConfig.name = 'bugInfo.suggestionsAndViews';
var ideaAreaConfigArea = ExtFormUtil.getCommonTextField(ideaAreaConfig);


var bugInfoTemplatebStoreConfig = {};
bugInfoTemplatebStoreConfig.params = {type:'queryMyTemplate'};
bugInfoTemplatebStoreConfig.url = 'servlet/bugInfoTemplate';
bugInfoTemplatebStoreConfig.record = new Ext.data.Record.create(  
	[     
		{name: 'id',    type: 'string',	mapping:'id'},    
		{name: 'value', type: 'string',	mapping: 'value'},
		{name: 'bugId',	mapping: 'bugId'}
	]  
); 
var bugInfoTemplatebStore = ExtFormUtil.getCommonComboBoxStore(bugInfoTemplatebStoreConfig);

// 模板导入
var bugInfoTemplatebConfig = {};
bugInfoTemplatebConfig.fieldLabel = '模板导入';
bugInfoTemplatebConfig.store = bugInfoTemplatebStore;
bugInfoTemplatebConfig.helpText = '通过原先保存BUG模板信息来导入BUG,如果数据为空,则说明你未保存任何模板,请先赶紧去保存模板吧';
var bugInfoTemplateb = ExtFormUtil.getCommonComboBox(bugInfoTemplatebConfig);




