
/**
 * 定义数据对应关系
 */
var fields = new Ext.data.Record.create([
	{name: 'header', 	mapping : 'header'},
	{name: 'dataIndex', mapping : 'dataIndex'},
	{name: 'width', 	mapping : 'width', type: 'int'},
	{name: 'showOrder', mapping : 'showOrder', type: 'int'},
	{name: 'sortable', 	mapping : 'sortable', type: 'boolean'},
	{name: 'dragable', 	mapping : 'dragable', type: 'boolean'},
	{name: 'type', 		mapping : 'type'},
	{name: 'id', 		mapping : 'id'}
]);

/**
 *  创建store来存放数据
 */
var firstGridStore = new Ext.data.Store({
    proxy : new Ext.data.HttpProxy({
            	url : 'servlet/system/sysQueryItem'  
       		}),  
    baseParams:{type : 'queryForGrid',"selected" : false},   		
	autoLoad :  true,  // 是否自动加载   一般设置false 需要时候在加载  
	reader   :  new Ext.data.JsonReader({    
                    root : 'root',  // 服务器返回json的根信息  
                    id :'id' // 值为对应的mapping的值  
                },  
                fields   // 要加载的数据  
    )
});

/**
 * 定义表格2的数据源
 */
var secondGridStore = new Ext.data.Store({
    proxy : new Ext.data.HttpProxy({
            	url : 'servlet/system/sysQueryItem'  
       		}),  
    baseParams:{type : 'queryForGrid',"selected" : true},   		
	autoLoad :  true,  // 是否自动加载   一般设置false 需要时候在加载  
	reader   :  new Ext.data.JsonReader({    
                    root : 'root',  // 服务器返回json的根信息  
                    id :'id' // 值为对应的mapping的值  
                },  
                fields   // 要加载的数据  
    )
});

var inPutfield = new Ext.form.NumberField({
		minValue:10,
		maxValue :1000,
		nanText:'请输入0-1000之间的数字',
		maxText:'最大值不能超过1000',
		minText :'最小值不能低于0'
}); 


var firstcols = [
	{width: 250,header: "字段",sortable: true, dataIndex: 'header'}
];
// 定义表格  带选择数据
var firstGrid = new Ext.grid.GridPanel({
	//id 			 : 'notSelect',
	//layout       	 : 'fit',
	//width          : 300,
	//region         : 'west',
	border:false,
	ddGroup          : 'secondGridDDGroup',
    store            : firstGridStore,
    columns          : firstcols,
	enableDragDrop   : true,	//True表示为激活GridPanel行的拖动。
    stripeRows       : true,			//True表示为显示行的分隔符
//  	autoExpandColumn : 'firstheader',//指定某个列之id,grid就会在这一列自动扩展宽度，以填满空白的位置
    title            : '可选显示字段'
});

firstGrid.on('rowdblclick',function(s,rowIndex){
	var record = firstGrid.store.data.items[rowIndex];
	firstGrid.store.remove(record);
	secondGrid.store.add(record);
	
});


// 创建行模型，定义每列的数据来源
var secondcols = [
	{width: 210,header: "字段", sortable: true, dataIndex: 'header',renderer:function(val){return "<img src='resource/img/main/ok.png'>"+val}},
	{header: "显示宽度", width: 60, sortable: true, dataIndex: 'width',editor:inPutfield}
];


var sm = new Ext.grid.CheckboxSelectionModel({
	//checkOnly : true,
	singleSelect : false
	//handleMouseDown : Ext.emptyFn
});

// create the destination Grid
var secondGrid = new Ext.grid.EditorGridPanel({
	//id						: 'defaultSelect',
	//layout       			: 'fit',
	//width            		: 300,
    //region           	    : 'center',
	//plugins					: [editor],
	border:false,
	sm						: sm,
	ddGroup          		: 'firstGridDDGroup',
    store           		: secondGridStore,
    columns         		: secondcols,
	enableDragDrop   		: true,
    stripeRows       		: true,
//	autoExpandColumn 		: 'secondheader',
    title            		: '已选显示字段 (宽度双击可修改值范围:40-1000)'
});

secondGrid.on('celldblclick',function(s,rowIndex,columnIndex){
	if(columnIndex == 0){
		var record = secondGrid.store.data.items[rowIndex];
		if (record.data.dragable == false) {
			alert(record.data.header +  "   为必选字段请重新选择");
			return true;
		}
		secondGrid.store.remove(record);
		firstGrid.store.add(record);
	}
});

//Simple 'border layout' panel to house both grids
ddPanel = new Ext.Panel({
	title        :'<div align="center">可直接通过拖拉或双击选择要导出的字段</div>',
	width        : 600,
	height       : 350,
	layout       : 'hbox',
	defaults     : { flex : 1 }, //auto stretch
	layoutConfig : { align : 'stretch' },
	collapsible  : true,
	collapsed    : false,
	addEvent	 : true,
	
	
//layout       : 'border',		//箱子布局
//renderTo     : 'panel', 		//容器渲染的那个节点的id，或是DOM节点
//	border       : true,
//	style        : 'margin-left:100px',
//	gridSelectEn:'',
//	gridSelectCN:'',
//	gridSelectJson:'',
//	gridSelectWidth:'',
//	firstGrid	 :	firstGrid,
//	secondGrid	 :	secondGrid,
	items        : [
//		hidePanleEn,
//		hidePanleCn,
//		hidePanleWidth,
//		hideSelectJson,
		firstGrid,
		secondGrid
	],
	bbar    : [
		'->', 
		{
			text    : '上移',
			pressed : true,
			handler : function() {
				moveUp(secondGrid);
			}
		},'-',
		{
			text    : '下移',
			pressed : true,
			handler : function() {
				moveDown(secondGrid);
			}
		},'-',{
			text    : '还原默认值',
			pressed : true,
			handler : function() {
				firstGrid.store.reload();
				secondGrid.store.reload();
			}
		},'-',{
			text    : '保存选择列',
			pressed : true,
			handler : function() {
				saveDefaultSelect();
			}
		}
	]
});

//ddPanel.getCNSelectList = function(){
//		ddPanel.gridSelectEn = "";
//		ddPanel.gridSelectCN = "";
//		ddPanel.gridSelectWidth = "";
//		secondGridStore.each(function(r){ 
//			ddPanel.gridSelectEn = 	ddPanel.gridSelectEn + 	"," + r.data.dataIndex;	
//			ddPanel.gridSelectCN =  ddPanel.gridSelectCN + 	"," + r.data.header;	
//			ddPanel.gridSelectWidth =  ddPanel.gridSelectWidth + "," + r.data.width;	
//		}); 
//		ddPanel.gridSelectEn = ddPanel.gridSelectEn.substr(1);
//		ddPanel.gridSelectCN = ddPanel.gridSelectCN.substr(1);
//		ddPanel.gridSelectWidth = ddPanel.gridSelectWidth.substr(1);
//		hidePanleEn.setValue(ddPanel.gridSelectEn);
//		hidePanleCn.setValue(ddPanel.gridSelectCN);
//		hidePanleWidth.setValue(ddPanel.gridSelectWidth);
//}

ddPanel.parseTOJson = function(){
	var store = secondGrid.store;
	//ddPanel.gridSelectJson = Ext.encode(Ext.pluck(store.data.items, 'data'));
	var datar = new Array();
    var records = store.getRange();
    for (var i = 0; i < records.length; i++) {
    	var json = {};
    	json.header = records[i].data.header;
    	json.dataIndex = records[i].data.dataIndex;
    	json.width = records[i].data.width;
    	json.sortable = records[i].data.sortable;
    	json.type = records[i].data.type;
    	json.sysId = records[i].data.id;
        datar.push(json);
    }
    ddPanel.gridSelectJson = Ext.util.JSON.encode(datar);
	//alert(ddPanel.gridSelectJson);
	//hideSelectJson.setValue(ddPanel.gridSelectJson);
	return ddPanel.gridSelectJson;
}
/**
*	上移的实现方法
*/
function moveUp(grid){
	var tempRecord = grid.getSelectionModel().getSelections();
	if(tempRecord.length > 0){
		var insertIndex = firstIndex(tempRecord,grid);
		if(insertIndex != 0){
			Ext.each(tempRecord,grid.store.remove,grid.store);
			grid.store.insert(insertIndex - 1, tempRecord);
		}else{
			Ext.Msg.alert("提示","已经移动到首条,无法继续上移");
		}
		grid.getSelectionModel().selectRecords(tempRecord);
	}else{
		Ext.Msg.alert("提示:","未选中任何字段");
	}
}
/**
* 下移的实现方法
*/
function moveDown(grid){
	var tempRecord = grid.getSelectionModel().getSelections();
	if(tempRecord.length > 0){
		var insertIndex = lastIndex(tempRecord,grid);
		if(insertIndex != grid.getStore().getCount() - 1){
			insertIndex = firstIndex(tempRecord,grid);
			Ext.each(tempRecord,grid.store.remove,grid.store);
			grid.store.insert(insertIndex + 1, tempRecord);
		}else{
			Ext.Msg.alert("提示","已经移动到末条,无法继续下移");
		}
		grid.getSelectionModel().selectRecords(tempRecord);
	}else{
		Ext.Msg.alert("提示:","未选中任何字段");
	}
}

// 保存默认查询项
function saveDefaultSelect(){
	var ids = new Array();
    var records = secondGrid.store.getRange();
    for (var i = 0; i < records.length; i++) {
        ids.push(Ext.util.Format.trim(records[i].data.id));
    }
	var defaultSelect = ids.join();
	Ext.MessageBox.confirm('提示','保存当前已选择字段,将替换原先的默认选择字段,是否确定这么操作?',function(btn){
		if(btn == 'yes'){
			Ext.Ajax.request({  
				    url : 'servlet/userSetting?type=updateSetting',  
			    params: {
			    	'queryBean.userSetting.searchDefaultQueryItem':defaultSelect
			    },
			    success : function(response) {  
			        var result = Ext.util.JSON.decode(response.responseText);
		        	Ext.Msg.alert(result.msg);
			    }
			});
		}
	});
}

/**
 * 获得records中最小的index坐标值
 */
function firstIndex(records,grid){
	var store = grid.getStore();
	var index = store.getCount();
	var tempindex = 0;
	Ext.each(records,function(record){
		tempindex = store.indexOf(record);
		if(tempindex < index){
			index = tempindex;
		}
	});
	return index;
}

/**
 * 获得records中最大的index坐标值
 */
function lastIndex(records,grid){
	var store = grid.getStore();
	var index = 0;
	var tempindex = 0;
	Ext.each(records,function(record){
		tempindex = store.indexOf(record);
		if(tempindex > index){
			index = tempindex;
		}
	});
	return index;
}
ddPanel.init=function(){
	var panel=this;
	if(!panel.addEvent){
		return;
	}
	panel.addEvent = false;
	var blankRecord =  Ext.data.Record.create(fields);
    /****
    * Setup Drop Targets
    ***/
    // This will make sure we only drop to the  view scroller element
    var firstGridDropTargetEl =  firstGrid.getView().scroller.dom;
    var firstGridDropTarget = new Ext.dd.DropTarget(firstGridDropTargetEl, {
        ddGroup    : 'firstGridDDGroup',
        notifyDrop : function(ddSource, e, data){
                var records =  ddSource.dragData.selections;
				for(var i = 0;i < records.length; i++){
					if (records[i].data.dragable == false) {
						alert(records[i].data.header +  "   为必选字段请重新选择");
						return true;
					}
				}
                Ext.each(records, ddSource.grid.store.remove, ddSource.grid.store);
                firstGrid.store.add(records);
                return true
        }
    });

   // This will make sure we only drop to the view scroller element
    var secondGridDropTargetEl2 = secondGrid.getView().scroller.dom;
	
	var secondGridDropTargetToSelf = new Ext.dd.DropTarget(secondGridDropTargetEl2, {
        ddGroup    : 'firstGridDDGroup',
        notifyDrop : function(ddSource, e, data){
			// 同一个 secondGridDropTargetEl2 只能有一个notifyDrop事件  实现统一写在下面
        }
    });
	
	var secondGridDropTargetEl = secondGrid.getView().scroller.dom;
    var secondGridDropTarget = new Ext.dd.DropTarget(secondGridDropTargetEl, {
        ddGroup    : 'secondGridDDGroup',
        notifyDrop : function(ddSource, e, data){
			var records =  ddSource.dragData.selections;
			if(secondGrid.store.indexOf(records[0]) == -1){
				//  从其他表格移动过来的数据
				//Ext.each(records, ddSource.grid.store.remove, ddSource.grid.store);
				//secondGrid.store.add(records);
				var insertindex = ddSource.getDragData(e).rowIndex;
				if(insertindex == undefined){
					insertindex = secondGrid.store.getCount();
				}
				Ext.each(records, function(record){
					ddSource.grid.store.remove(record);
					secondGrid.store.insert(insertindex,record);
				});
				secondGrid.getSelectionModel().selectRecords(records);
			}else{
				// 表格本身上下移动
				var sm = secondGrid.getSelectionModel();
				var rows = sm.getSelections();
				var store = secondGrid.store;
				var insertindex = ddSource.getDragData(e).rowIndex;
				var index = 0;
					// 如果拖动的位置超过表格的位置，则默认为最后一条记录
				if(insertindex == undefined){
					insertindex = store.getCount() - 1;
				}
				for (i = 0; i < rows.length; i++) {
				   var index = store.indexOf(rows[i]);
				   store.remove(rows[i]);
				   store.insert(insertindex,rows[i]);
				}
				sm.selectRecords(rows);
			}
			return true
        }
    });
}