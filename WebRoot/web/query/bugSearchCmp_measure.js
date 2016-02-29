
var empty = {xtype: 'label', html: '<div >&nbsp;</div>'};
/******************************************************************** 提交时间 *****************************/
/**
 * sbumitRadioGroup 和 resolvedRadioGroup 不配置 name,
 * 在统一的closeDateCheckboxGroup 中配置name
 * 并且由closeDateCheckboxGroup 重写的setValue方法中对其他的group进行赋值
 */
var sbumitRadioGroup = new Ext.form.RadioGroup({
    xtype: 'checkboxgroup',
    fieldLabel: ' <font style="font-weight:bold;">提交时间</font>',
    columns: 7,
    width:700,
    items: [
        {boxLabel: '今日新增', 			name: 'queryBean.reportType',inputValue :11},
        {boxLabel: '昨日新增', 			name: 'queryBean.reportType',inputValue :12},
        {boxLabel: '本周新增', 			name: 'queryBean.reportType',inputValue :13},
        {boxLabel: '上周新增', 			name: 'queryBean.reportType',inputValue :14},
        {boxLabel: '本月新增', 			name: 'queryBean.reportType',inputValue :15},
        {boxLabel: '上月新增', 			name: 'queryBean.reportType',inputValue :16},
        {boxLabel: '不选', 				name: 'queryBean.reportType',inputValue :''}
    ]
});
SearchOP.pushTosearchCmpList(sbumitRadioGroup);

/******************************************************************** 解决时间 *****************************/
/**
 * sbumitRadioGroup 和 resolvedRadioGroup 不配置 name,
 * 在统一的closeDateCheckboxGroup 中配置name
 * 并且由closeDateCheckboxGroup 重写的setValue方法中对其他的group进行赋值
 */
var resolvedRadioGroup = new Ext.form.RadioGroup({
    xtype: 'checkboxgroup',
    fieldLabel: ' <font style="font-weight:bold;">解决时间</font>',
    columns: 7,
    width:700,
    items: [
        {boxLabel: '今日解决', 			name: 'queryBean.reportType',inputValue :21},
        {boxLabel: '昨日解决', 			name: 'queryBean.reportType',inputValue :22},
        {boxLabel: '本周解决', 			name: 'queryBean.reportType',inputValue :23},
        {boxLabel: '上周解决', 			name: 'queryBean.reportType',inputValue :24},
        {boxLabel: '本月解决', 			name: 'queryBean.reportType',inputValue :25},
        {boxLabel: '上月解决', 			name: 'queryBean.reportType',inputValue :26},
        {boxLabel: '不选', 				name: 'queryBean.reportType',inputValue :''}
    ]
});
SearchOP.pushTosearchCmpList(resolvedRadioGroup);

/******************************************************************** 关闭时间 *****************************/
/**
 * sbumitRadioGroup 和 resolvedRadioGroup 不配置 name,
 * 在统一的closeDateCheckboxGroup 中配置name
 * 并且由closeDateCheckboxGroup 重写的setValue方法中对其他的group进行赋值
 */
var closeDateCheckboxGroup = new Ext.form.CheckboxGroup({
	postName:'queryBean.reportType',
    xtype: 'checkboxgroup',
    fieldLabel: ' <font style="font-weight:bold;">关闭时间</font>',
    columns: 7,
    width:700,
    
	// 自己改写的setValue方法
	setValue:function(inputValueList){
		setreportTypeValue(inputValueList);
	},
    items: [
        {boxLabel: '研发今日关闭', 		name: 'queryBean.reportType',inputValue :31},
        {boxLabel: '测试今日关闭', 		name: 'queryBean.reportType',inputValue :32}
    ]
});
SearchOP.pushTosearchCmpList(closeDateCheckboxGroup);

/**
 * 度量查询通用setValue方法
 * sbumitRadioGroup 和 resolvedRadioGroup 不配置 name,
 * 在统一的closeDateCheckboxGroup 中配置name
 * 并且由closeDateCheckboxGroup 重写的setValue方法中对其他的group进行赋值
 * @param inputValueList
 */
function setreportTypeValue(inputValueList){
	Ext.each(inputValueList,function(value){
		if(value > 10 && value < 20){
			sbumitRadioGroup.setValue(value);
		}else if(value > 20 && value < 30){
			resolvedRadioGroup.setValue(value);
		}else if (value > 30 && value < 40) {
			Ext.each(closeDateCheckboxGroup.items.items,function(checkBox){
				if(checkBox.inputValue == value){
					checkBox.setValue(true);
					return false;
				}
			});
		}
	});
}


/******************************************************************** 状态过滤 *****************************/
var denialStateCheck = new Ext.form.Checkbox({
	boxLabel:'<span style="color:blue">DENIAL</span>',
	inputValue : "-1",
	listeners : {
		'check' : function(field,checked) {
			Ext.each(filterStateRadioGroup.items.items,function(item,index){
				if(item.inputValue == 21 || item.inputValue == 8|| item.inputValue == 17){
					item.setValue(checked);
				}
			});
		}
	}
});

var filterStateRadioGroup = new Ext.form.CheckboxGroup({
	postName:'queryBean.stateNotIn',
	setValue:function(inputValueList){
		SearchOP.setCheckboxGroupValue(inputValueList,this);
	},
	
    xtype: 'checkboxgroup',
    fieldLabel: ' <font style="font-weight:bold;">状态过滤</font>',
    columns: 5,
    width:800,
    items: [
    	{boxLabel: 'DENIAL-ByPSD', 			name: 'queryBean.stateNotIn', inputValue:21},
    	{boxLabel: 'DENIAL-ByDevelopment', 	name: 'queryBean.stateNotIn', inputValue:8},
        {boxLabel: 'DENIAL-ByTest', 		name: 'queryBean.stateNotIn', inputValue:17},
        denialStateCheck
    ]
});
SearchOP.pushTosearchCmpList(filterStateRadioGroup);

/******************************************************************** Delay某版本 *****************************/
var delayRadioGroup = new Ext.form.RadioGroup({
	postName:'queryBean.delayToOs',
    fieldLabel: ' <font style="font-weight:bold;">Delay某版本</font>',
    columns: 7,
    width:700,
    items: [
        {boxLabel: '是', 			name: 'queryBean.delayToOs',inputValue :1},
        {boxLabel: '否', 			name: 'queryBean.delayToOs',inputValue :2},
        {boxLabel: '不选', 			name: 'queryBean.delayToOs',inputValue :''}
    ]
});
SearchOP.pushTosearchCmpList(delayRadioGroup);