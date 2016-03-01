var pageSize=30;
var store;
Ext.onReady(function(){
	var myMask = new Ext.LoadMask(Ext.getBody(), {//也可以是Ext.getCmp('').getEl()窗口名称
		msg    : "正在操作,请稍后...",//你要写成Loading...也可以
		msgCls : 'z-index:10000;'
	});

    Ext.QuickTips.init();
    var storeField = new Array();
    var selectColumn = new Array();
    var maxWidthCol=null;
    var maxWidth=0;
    var defaultCol=null;
    Ext.each(columns,function(item,index,allItem){
    	if (item.header == '处理方法名称') {
    		item.id = "autoExpandColumn";
    		defaultCol=item;
    	}
    	if(item.width>maxWidth){
    		maxWidthCol=item;
    		maxWidth=item.width;
    	}
    	// 添加提示显示功能
//    	if (item.header == '处理状态') {
//    		item.renderer = checkStatus;
//    	}else {
//    		item.renderer = tipsfun;
//    	}
    	
    	item.renderer = tipsfun;
    	
    	// 拼接store的fields
    	var json = {};
    	json.name = item.dataIndex;
    	storeField.push(json);
    	selectColumn.push(item.dataIndex);
    });
    
    // 设置自动扩展宽度指定的ID
    if(defaultCol==null){
    	maxWidthCol.id= "autoExpandColumn";
    }
    store = new Ext.data.JsonStore({
        fields: storeField,
        url: 'servlet/pminfo/query',
	    root: 'root',
	    totalProperty: 'totalCount',
	    autoLoad :false,
	    remoteSort:true,
	    sortInfo: {
		    field: 'id',
		    direction: 'DESC' // or 'DESC' (case sensitive for local sorting)
		}
    });
    store.on("load",function(store){
    	Ext.MessageBox.hide();	
    	var response=store.reader.jsonData ;
    	if(!response.success){
    		var msg="数据加载失败";
    		if(response.msg)
    			msg=response.msg;
    		alert(msg);
    	}
    });
    store.on('beforeload',function(s,obj){
    	Ext.applyIf(obj.params, params);
    	obj.params['type'] = "queryResult";
    	obj.params['header'] = getHeaderJsonStr(grid);
    	Ext.MessageBox.wait("加载数据中", "请稍等......");
	});
	store.on('exception',function(s,obj){
		alert("无法进行查询,请进一步缩小查询范围.eg:添加 操作系统,时间范围等限制");
		Ext.MessageBox.hide();	
	});
	 
	var sm=new Ext.grid.RowSelectionModel({singleSelect:true});
	
	var tbar=new Ext.Toolbar();
	tbar.add({id:'exportExcel',text:'导出excel',iconCls: 'excel',tooltip:'点击后请稍等几秒钟!(不同数据量,等待时间不同)',handler:exportExcel});
	
//	tbar.add('->');
//	tbar.add('-');
//	tbar.add({text:'数据度量',iconCls: 'save_userquery',tooltip:'输入查询名称后,可以对本次查询进行保存!',handler:saveUserQuery});
//	tbar.add('-');
    var grid = new Ext.grid.GridPanel({
        store: store,
        region: 'center',
        sm:sm,
        border:false,
        columns:  columns,
        stripeRows: true,
        stateful: true,
        autoExpandColumn: 'autoExpandColumn',
        autoExpandMin:350,
        stateId: 'grid',
        bbar: new Ext.PagingToolbar({
            pageSize: pageSize,
            store: store,
            displayInfo: true,
            displayMsg: '显示 {0} - {1} 共 {2}',
            emptyMsg: "无任何记录"
           
        }),
        tbar:tbar 
    });
    grid.on('rowdblclick',function(s,rowIndex){
    	var record = s.store.data.items[rowIndex];
    	parent.openTabBUGID(record.data.bugId);
    });
    
    grid.on('headerclick',function(grid,index,e){
    	var sortAble = grid.getColumnModel().isSortable(index);
    	var header = grid.getColumnModel().getColumnHeader(index);
    	if (!sortAble) {
    		friendAlert(header + "  列暂不支持排序!请选择其他列进行排序");
    	}
    });
    
    
    var viewport = new Ext.Viewport({
      	layout: 'border',
      	items: [grid]
  	}); 
  	store.load({params:{"queryBean.start":0, "queryBean.limit":pageSize}});
  	/**
  	 * 导出excel
  	 */
  	function exportExcel(){
  		alert('待开发');
  		return;
  		var totalCount = grid.store.getTotalCount();
  		if(totalCount > 10000){
  			friendAlert("当前查询结果" + totalCount +"条数,超过最大限制10000条,请缩小范围后在导出");
  			return ;
  		}
  		
    	var sortInfo = grid.store.sortInfo;
	    var tempParams ={};// params;
	    Ext.applyIf(tempParams, params);
	    tempParams.exportExcel = 'exportExcel';
	    tempParams.type = 'queryResult';
	    tempParams.header = getHeaderJsonStr(grid);
	    tempParams['queryBean.sort'] = sortInfo.field;
	    tempParams['queryBean.dir'] = sortInfo.direction;
	    tempParams['queryBean.limit']=0;
		tempParams['queryBean.start']=0;
		var form = new Ext.form.FormPanel({
			url: 'servlet/query?dt='+(new Date()).getTime(),
			hidden : true,
			hideMode: 'offsets',
			method: 'POST',
			standardSubmit : true,
			items: []
		});
		form.render(document.body);
		form.getForm().getEl().dom.action = 'servlet/query';
		form.getForm().getEl().dom.target = "exportIframe";
		if(tempParams) {
			for (p in tempParams) {
				if(typeof(tempParams[p])=="object"){
					for(var i=0;i<tempParams[p].length;i++){
						form.add({
							xtype: 'hidden', 
							name : p, 
							value: tempParams[p][i]
						});
					}
				}else{
					form.add({
						xtype: 'hidden', 
						name : p, 
						value: tempParams[p]
					});
				}
			}
		}
		form.doLayout();
		form.getForm().submit();
		form.destroy();
		delete form;
  	}
  	
  	/**
  	 * 保存用户查询
  	 */
  	function saveUserQuery(){
  		var queryName = queryNaneField.getValue();
  		if(!queryName){
  			friendAlert("请输入查询的名称");
  			return;
  		}
  		var columnIdArr = [];
		Ext.each(columns,function(item,index,allItem){
			columnIdArr.push(item.sysId);
		});
		
  		Ext.Ajax.request({  
	    url : 'servlet/userQuery',  
	    params: {
	    	type:'addUsserQuery',
	    	'queryBean.userQuery.queryName':queryName,
	    	'queryBean.userQuery.queryBean':queryBean,
	    	'queryBean.userQuery.queryHeader':columnIdArr.join(),
	    	'queryBean.userQuery.queryType':queryType.getValue()
	    },
	    success : function(response) {  
	        var result = Ext.util.JSON.decode(response.responseText);
        	friendAlert(result.msg);
	    }
	});  
  	
  	}
  	/**
  	 * 获得表格的column的jsonString
  	 */
  	function getHeaderJsonStr(gridPanel){
  		var datarr = new Array();
  		var col = gridPanel.colModel.config;
    	for (var i = 0; i < col.length; i++) {
	    	var json = {};
	    	json.header = col[i].header;
	    	json.dataIndex = col[i].dataIndex;
	    	json.width = col[i].width;
	        datarr.push(json);
    	}
    	// 头信息JSON
		return Ext.util.JSON.encode(datarr);
  	}
  	
  	
	
	// 保存查询
	function saveUserQuery(){
  		var queryName = queryNaneField.getValue();
  		if(!queryName){
  			friendAlert("请输入查询的名称");
  			return;
  		}
  		var columnIdArr = [];
		Ext.each(columns,function(item,index,allItem){
			columnIdArr.push(item.sysId);
		});
		
  		Ext.Ajax.request({  
		    url : 'servlet/userQuery',  
		    params: {
		    	type:'addUserQuery',
		    	'queryBean.userQuery.queryName':queryName,
		    	'queryBean.userQuery.queryBean':queryBean,
		    	'queryBean.userQuery.queryHeader':columnIdArr.join(),
		    	'queryBean.userQuery.queryType':queryType.getValue()
		    },
		    success : function(response) {  
		        var result = Ext.util.JSON.decode(response.responseText);
	        	friendAlert(result.msg,3);
		    }
		}); 
  	}
});

// 每次切换tab页面都要重新加载数据
function reloadStore(){
	if(userQuery){
		if(parent.setting.autoRefresh){
			store.reload();
		}
	}
}