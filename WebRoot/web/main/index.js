//var indexUrl = "web/main/mainIndex.jsp";
var indexUrl = "help/html/info/show.jsp#infoShowAdjustOldBug";
if(helpLink != ""){
	indexUrl = helpLink;
}

Ext.onReady(function () {
	Ext.QuickTips.init(); 
	var tbar=new Ext.Toolbar();
	tbar.add("BUGID");
	var queryKeyForm = new Ext.form.NumberField({
		id:'inputBugId',
		name:'queryKey',
		width:120,
		allowDecimals:false,
		allowNegative:false,
		enableKeyEvents:true,
		plugins: ['fieldtip'],
		qtip:'请输入BUGID,<br/>直接回车即可访问',
		emptyText:'要查询的BUGID',
		nanText : "BUGID 必须为连续的数字",
		listeners:{  
	 		"keyup":function(field,e){  
				if(e.getKey() == Ext.EventObject.ENTER){  
					queryByKey();
				}  
	    	}  
	    }
	});
	
	tbar.add(queryKeyForm);
	tbar.add('-');
	tbar.add({text:'查询',tooltip:'根据BUGID号进行快速查询',handler:queryByKey});
	
	function queryByKey(){
		alert('待开发');
		return;
		var key = queryKeyForm.getValue();
		if(key == ''){
			alert("请输入正确的BUGID");
		}else{
			openTabBUGID(key)
		}
	}
	
	var bbar=new Ext.Toolbar();
	bbar.add('->');
	bbar.add('-');
	bbar.add({text:'系统更新说明',handler:sysUpdateInfo,iconCls: 'bbar_update',tooltip:'介绍系统新增功能'});
	bbar.add('-');
	bbar.add({text:'注销',iconCls:'quit', tooltip:'退出当前账号',handler:quit});
	bbar.add('-');
	
	
	west=new Ext.tree.TreePanel({
		region: 'west',
		width: 200,
		border:false,
		tbar:tbar,
		bbar:bbar,
		collapsible: true,
		rootVisible: false,
		useArrows:true,
		autoScroll:true, 
		title:user,
		root: new Ext.tree.AsyncTreeNode({
            text: '所有类型',
            id: '0',
            expanded: true
        }),
        loader: new Ext.tree.TreeLoader({
     		url : 'servlet/userconfig/userInfo',
     		baseParams: {type:'userOPTree'}
		})
	});
	
	/**
	 * 打开前
	 */
	west.on('beforeappend',function(tree,parent,node){

	});
    
    // 点击打开页面
	west.on('click', function(node,e){
	    if(node.attributes.href != null){
            e.stopEvent();
			openTab(node);
         }
    });
	tabs = new Ext.TabPanel({
	    activeTab: 0,
	    region: 'center',
	    border:true,
	    id:'tab_id',
	    defaults:{autoScroll: true},
	    items:[{
        title: '首页',
	       html : '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="' + indexUrl + '"></iframe>'
	 	}],
    	listeners : {
			'tabchange' : function(tabPanel,panel) {
				if(true){
					var tab = panel.getId();
					var iframe = window.frames["iframe_" + tab];
					
					if(iframe && iframe.reloadStore){
						iframe.reloadStore();
					}
				}
				
			}
		}
	});
    var viewport= new Ext.Viewport({
        layout: 'border',
        border:false,
        defaults: {
            split: true
        },
        items: [{
            id: 'app-header',
            xtype: 'box',
            region: 'north',
            //height: 20,
            html: '手机维保信息查询'
        },west,tabs]
    });
    
    if(bugId && bugId != "null"){
    	openTabBUGID(bugId);
    }
});
    
// 系统更新说明
var updateInfowin = null;
function sysUpdateInfo(){
	alert('待开发');
	return;
    if(!updateInfowin){
	    updateInfowin = new Ext.Window({
	    	title:'系统更新信息(直接点击更新点可查看详细信息)',
	        width:500,
	        height:300,
	        closeAction:'hide',
	        plain:false,
	        resizable: true,
	        modal: true,
	        bodyStyle:"background-color: white",
	        autoScroll:true,
	        html: '<iframe frameborder="0" width="100%" height="100%" src="web/bugInfo/log/updateLog.jsp"></iframe>'
   		});
	}
	updateInfowin.show(this);
}

// 退出
function quit(){
	if(window.confirm("是否确认注销账号?")){
		alert('待开发');
			//window.location="servlet/logout";
	}
}


function openTabBUGID(bugID){
	var node=new Object();
	node.attributes=new Object();
	node.attributes.id="tab_bugid_" + bugID;
	node.attributes.href="servlet/viewBugInfo?type=showBugInfo&bugId=" + bugID;
	node.attributes.text = bugID;
	if(setting.autoBugInfoOpen){
		window.open(node.attributes.href);
	}else{
		openTab(node);
	}
}

/**
 * 根据节点信息打开标签页
 * @param {} node
 * @return {}
 */
function openTab(node){
	var id = node.attributes.id;
	var tab = tabs.getComponent(id);
    if(tab){
        tabs.setActiveTab(tab);
    }else{
       tab = tabs.add(new Ext.Panel({
       		closable:true,
            id: node.attributes.id,
            title:node.attributes.text,
            html : '<iframe name="iframe_'+node.attributes.id+'" scrolling="auto" frameborder="0" width="100%" height="100%" src='+ node.attributes.href + '></iframe>'
        }));
        tabs.setActiveTab(tab);
    }
    return tab;
}

function renameTab(iframeid,crid){
	tabs.getItem(iframeid.replace("iframe_","tab_")).destroy();
	openCrid(crid);
}

function openMyQueryTab(node){
	var id = 'tab_' + node.attributes.id;
	var tab = tabs.getComponent(id);
    if(tab){
        tabs.setActiveTab(tab);
    }else{
       tab = tabs.add(new Ext.Panel({
       		closable:true,
            id: 'tab_' + node.attributes.id,
            title:node.attributes.text,
            html : '<iframe name="my_query_iframe_'+node.attributes.id+'" scrolling="auto" frameborder="0" width="100%" height="100%"></iframe>'
		}));
        tabs.setActiveTab(tab);
    }
    return tab;
}
function openQueryTab(node){
   var tab = tabs.add(new Ext.Panel({
   		closable:true,
        id: 'query_' + node.attributes.id,
        title:node.attributes.text,
        html : '<iframe name="iframe_'+node.attributes.id+'" scrolling="auto" frameborder="0" width="100%" height="100%"></iframe>'

    }));
    tabs.setActiveTab(tab);
    return tab;
}
var refreshMenu=function(){
	west.getRootNode().reload();
}