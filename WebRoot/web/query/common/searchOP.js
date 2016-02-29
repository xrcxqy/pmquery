var SearchOP = {};

// 定义用户控件
SearchOP.searchCmpList = new Array();

SearchOP.pushTosearchCmpList = function(cmp){
	SearchOP.searchCmpList.push(cmp);
}

/**
* 清空数据
* @param cmpList ： 要清空的数据参数列表
* @param form : 进行控件清空的表单
*/
SearchOP.clearValue = function(cmpList,form){
	
	//DOTO: 判断是否是js
	if(Ext.isArray(cmpList)){
		
		Ext.each(cmpList,function(item,index){
			
			// 判断是否是自定义的组合
			if (item.xtype === "compositefield") {
				
				if (item.hasOwnProperty("reset")) {
					item.reset();
				}
				
		    // 系统默认控件
			} else {
				if("reset" in item){
					item.reset();
				}
			}
		});
		
		if(form || 'doLayout' in form){
			form.doLayout();
		}
	}
}

SearchOP.saveQueryStore = new Ext.data.JsonStore({
 	fields: [
		{name: 'id'},
       	{name: 'value',mapping:'queryName'},
       	{name: 'queryBean'},
       	{name: 'queryHeader'},
       	{name: 'queryType'},
       	{name: 'createDate'},
       	{name: 'show',type: 'boolean'},
       	{name: 'userHeader',type: 'boolean'}
  	],
    url: 'servlet/userQuery?type=getSelfQuery',
    root: 'root',
    totalProperty: 'totalCount',
    autoLoad :false,
    remoteSort:true,
    sortInfo: {
	    field: 'id',
	    direction: 'asc'
	}
});

SearchOP.saveQueryComBobox = ExtFormUtil.getCommonComboBox({
	store:SearchOP.saveQueryStore,
	width : 300
});

SearchOP.saveQueryComBobox.on('select',function (combo,record,index){
	SearchOP.clearValue(SearchOP.searchCmpList,SearchOP.form);
	
	// DOTO : 测试数据
	/**
	 * 
	SearchOP.searchCmpList = null;
	SearchOP.searchCmpList = new Array();
	SearchOP.searchCmpList.push(osFromCombo);
	 */
	var queryBeanStr = record.get('queryBean');
	var queryBean = Ext.util.JSON.decode(queryBeanStr);
	
	for(var eachQueryItem in queryBean){
		
		if(queryBean.hasOwnProperty(eachQueryItem)){
			
			Ext.each(SearchOP.searchCmpList,function(item,index){
					
					// 判断是否是自定义的组合
					if (item.xtype === "compositefield" || item.getXType() === "compositefield") {
						if(item.postName && item.postName.indexOf(eachQueryItem) != -1){
							if("setPostValue" in item){
								item.setPostValue(queryBean[eachQueryItem],eachQueryItem);
							}
							return false;
						}
				   
					} else if (item.getXType() === "radiogroup" || item.getXType() === "checkboxgroup"){
						if(item.postName === eachQueryItem){
							item.setValue(queryBean[eachQueryItem]);
							return false;
						}
					}
					 // 系统自身控件,直接使用自身的name即可
					else if(item.getXType() === "textfield"){
						if(item.name === eachQueryItem){
							item.setValue(queryBean[eachQueryItem]);
							return false;
						}
					} 
			});
		}
	}
	
	if(SearchOP.form || 'doLayout' in SearchOP.form){
		SearchOP.form.doLayout();
	}
});


SearchOP.setCheckboxGroupValue = function(inputValueList,checkboxGroup){
	Ext.each(inputValueList,function(value){
		Ext.each(checkboxGroup.items.items,function(checkBox){
			if(checkBox.inputValue == value){
				checkBox.setValue(true);
				return false;
			}
		});
	});
}