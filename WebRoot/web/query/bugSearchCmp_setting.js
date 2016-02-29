/********************************************************************时间精确度*********/
var timeShowGroup = new Ext.form.RadioGroup({
	postName:'queryBean.datePrecision',
    xtype: 'checkboxgroup',
    fieldLabel: ' <font style="font-weight:bold;">时间精确度</font>',
    columns: 7,
    width:1200,
    items: [
        {boxLabel: '天(yyyy-MM-dd)',				name: 'queryBean.datePrecision',inputValue :1,checked:true},
        {boxLabel: '时(yyyy-MM-dd HH)', 			name: 'queryBean.datePrecision',inputValue :2},
        {boxLabel: '分(yyyy-MM-dd HH:mm)', 		name: 'queryBean.datePrecision',inputValue :3},
        {boxLabel: '秒(yyyy-MM-dd HH:mm:ss)', 	name: 'queryBean.datePrecision',inputValue :4}
    ]
});
SearchOP.pushTosearchCmpList(timeShowGroup);

/********************************************************************个人*********/
var personalConfigGroup = new Ext.form.CheckboxGroup({
	postName:'queryBean.personalConfig',
	setValue:function(inputValueList){
		SearchOP.setCheckboxGroupValue(inputValueList,this);
	},
	postName:'queryBean.personalConfig',
    xtype: 'checkboxgroup',
    fieldLabel: ' <font style="font-weight:bold;">个人</font>',
    columns: 7,
    width:700,
    items: [
        {boxLabel: '个人关注的BUG',  name: 'queryBean.personalConfig',inputValue :1}
    ]
});
SearchOP.pushTosearchCmpList(personalConfigGroup);