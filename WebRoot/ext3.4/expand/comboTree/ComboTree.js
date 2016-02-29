/**
 * @description 基于Ext3.4版本实现的（其他版本或许支持，未测！）一个多选下拉树插件！
 * 				实现功能：1、多选节点！
 * 						 2、自动选中下拉框中已有的节点！
 * 						 3、自动将树节点TEXT赋值给插件的显示值(setValue())!
 * @example 参数nodes example:"[{text:'第一',leaf:true,checked:false},{text:'第二',leaf:true,checked:false},{text:'第三',leaf:true,checked:false},{text:'第四',leaf:true,checked:false}]"
 * 			支持一切动态树加载方式！
 * 			{
					xtype:"xz_combotree",
					tree:new Ext.tree.TreePanel({
						root: new Ext.tree.AsyncTreeNode({
				        	text:'root',
				            expanded: true,
				            children:Ext.decode(nodes)
				        }),
						autoScroll:true,
						rootVisible:false
					})
				}
 */
Ext.ns('Ext.ux.combo');

Ext.ux.combo.ComboBoxTree = Ext.extend(Ext.form.ComboBox, {
	passName : 'id',
	allowUnLeafClick : true,
	// tpl: '<div id="treeTpl"></div>', //html代码
	treeHeight : 180,
	store : new Ext.data.SimpleStore(
	{
		fields : [],
		data : [[]]
	}),
	// Default
	editable : false, // 禁止手写及联想功能
	checkTree:false,
	mode : 'local',
	triggerAction : 'all',
	maxHeight : 500,
	selectedClass : '',
	onSelect : Ext.emptyFn,
	emptyText : '请选择...',
	clearValue : function() {
		if (this.passField) {
			this.passField.value = '';
		}
		this.setRawValue('');
	},
	setRecordValue:function(id,value){
		if(!Ext.isEmpty(id)){
			if (this.passField) {
				this.passField.value = id;
			}
			this.setValue(value);
		}
	},
	setPassValue : function(passvalue) {
		if (this.passField)
			this.passField.value = passvalue;
	},
	onTreeSelected : function(node) {

	},
	onViewClick : Ext.emptyFn,
	assertValue : Ext.emptyFn,
	treeClk : function(node, e) {
		if (!node.isLeaf() && !this.allowUnLeafClick) {
			e.stopEvent();// 非叶子节点则不触发
			return;
		}
		
		// 多选的下拉树
		if(this.checkTree){
			var tempchekArr = this.tree.getChecked();
			var tempCheckText = [];
			var tempCheckValue = [];;
			Ext.each(tempchekArr,function(checknode){
				tempCheckValue.push(checknode.attributes.id);
				tempCheckText.push(checknode.attributes.text);
			});
			this.setValue(tempCheckText.join(","));
			if (this.passField)
				this.passField.value = tempCheckValue.join(",");// 以树的节点ID传递
		}else{
			// 普通单选下拉树
			this.setValue(node.text);// 设置option值
			if (this.passField)
				this.passField.value = node.id;// 以树的节点ID传递
		}
		
		this.collapse();// 隐藏option列表
		// 选中树节点后的触发事件
		this.fireEvent('treeselected', node);
	},
	initComponent : function() {
		Ext.ux.combo.ComboBoxTree.superclass.initComponent.call(this);
		this.tree.autoScroll = true;
		this.tree.height = this.treeHeight;
		this.tree.containerScroll = false;
		this.tplId = Ext.id();
		// overflow:auto"
		this.tpl = '<div id="' + this.tplId + '" style="' + this.treeHeight + '";overflow:hidden;"></div>';
		this.addEvents('treeselected');
		// this.on('treeselected',this.onTreeSelected,this);
	},

	listeners : {
		'expand' : {
			fn : function() {
				if (!this.tree.rendered && this.tplId) {
					this.tree.render(this.tplId);
				}
				this.tree.show();
				// 选择树的话必须全部打开树节点
				if(this.loadAllTreeNode){
					this.tree.expandAll();
				}
			},
			single : true
		},
		'render' : {
			fn : function() {

				this.tree.on('click', this.treeClk, this);

				if (this.passName) {
					this.passField = this.getEl().insertSibling({
						tag : 'input',
						type : 'hidden',
						name : this.passName,
						id : this.passId || Ext.id()
					}, 'before', true)
				}

				this.passField.value = this.passValue !== undefined
						? this.passValue
						: (this.value !== undefined ? this.value : '');

				this.el.dom.removeAttribute('name');
			}
		},
		'beforedestroy' : {
			fn : function(cmp) {
				this.purgeListeners();
				this.tree.purgeListeners();
			}
		}
	}

});

Ext.reg('combotree', Ext.ux.combo.ComboBoxTree);
