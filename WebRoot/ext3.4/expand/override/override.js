//Ext.Ajax.timeout = 120000;
Ext.Ajax.timeout =   120000;
// 为每个form控件前面如果是必填项的 加上 红色的 * 
var redFont = '<font color=red>*</font>';
var helpTextStr = '<img src="ext3.4/resources/images/myimage/lookMe.png"';
Ext.override(Ext.form.Field, {
  setFieldLabel : function(text) {
     this.label.update(this.fieldLabel);
  }
});



Ext.form.TextField.override({  
	initComponent: Ext.form.TextField.prototype.initComponent.createInterceptor(function(){  
		if (this.allowBlank === false && this.fieldLabel) {  
			this.fieldLabel += redFont;  
		}  
		// 如果不指定输入的值大小,默认为4000
		if(this.maxLength == Number.MAX_VALUE){
			this.maxLength = 100000;
		}
	})  
});  


// 如果为必填项,则添加红色标志
Ext.form.Field.prototype.setAllowBlank = function(allow){
	if(this.allowBlank != allow && this.fieldLabel){
		this.allowBlank = allow;
		if (this.allowBlank === false) {  
			this.fieldLabel += redFont;
		}else{
			this.fieldLabel = this.fieldLabel.replace(redFont,"");
		}
		this.setFieldLabel(this.fieldLabel);
		//this.label.update(this.fieldLabel);
	}
}

// 设置帮助文档
Ext.form.TextField.prototype.sethelpText = function(helpText){
	// 如果原先有帮助了
	if(this.helpText){
		if(this.fieldLabel){
			this.fieldLabel = this.fieldLabel.replace(this.helpText,helpText);
		}
	}else{
		this.helpText = helpText;
		var fl = this.fieldLabel;
	  	if (helpText && helpText !== '' && fl) {
	  		this.fieldLabel = '<span class="underline" ext:qtip="' + helpText + '">' +fl+'</span>'
	  	}
	}
	this.helpText = helpText;
	this.setFieldLabel(this.fieldLabel);
}

// 设置帮助文档
Ext.form.CompositeField.prototype.sethelpText = function(helpText){
	// 如果原先有帮助了
	if(this.helpText){
		if(this.fieldLabel){
			this.fieldLabel = this.fieldLabel.replace(this.helpText,helpText)
		}
	}else{
		this.helpText = helpText;
		var fl = this.fieldLabel;
	  	if (helpText && helpText !== '' && fl) {
	  		this.fieldLabel = '<span class="underline" ext:qtip="' + helpText + '">' +fl+'</span>'
	  	}
	}
	this.helpText = helpText;
	this.setFieldLabel(this.fieldLabel);
}

// 设置帮助文档
Ext.form.ComboBox.prototype.setValueNoLoad = function(value){
	var tempComb = this;
	if(!tempComb.store.getById(value)){
		tempComb.store.load({callback:function(){
			tempComb.setValue(value);
		}});
	}else{
		tempComb.setValue(value);
	}	
}

Ext.form.ComboBox.prototype.setRecordValue = function(id,value){
	if(!Ext.isEmpty(id)){
		var comboRecord = new Ext.data.Record.create([     
				{name: 'id',   	mapping:'id'},    
				{name: 'value',	mapping: 'value'}
			]  
		);
		
		this.store.add(
			new comboRecord({
				id:id,
				value:value
			})
		);
		this.setValue(id);
	}else{
		this.setValue("");
	}
}

// 修正 emptyText也会上传的bug
Ext.form.Action.prototype.constructor = Ext.form.Action.prototype.constructor.createSequence(function() {
    Ext.applyIf(this.options, {
        submitEmptyText:false
    });
});

// 控件提示内容框
Ext.intercept(Ext.form.Field.prototype, 'initComponent', function() {
	  var fl = this.fieldLabel;
	  var h = this.helpText;
	  if (h && h !== '' && fl) {
	    //this.fieldLabel = fl+'<span style="color:green;" ext:qtip="'+h+'">?</span> ';
	  	//this.fieldLabel =fl+ helpTextStr + ' ext:qtip="'+h+'"/> ';
	  	this.fieldLabel = '<span class="underline" ext:qtip="' + h + '">' +fl+'</span>'
	  }
});

// 新增设置laber方法



/**
 * 提取原始的fieldLaber信息,去除 红点，提示等附加信息
 * @param {} fieldLabel
 * @return {}
 */
function getFilterFieldLabel(fieldLabel){
	var tempFieldLabel = fieldLabel;
	// 是否有必填项红点
	var index = tempFieldLabel.indexOf(redFont);
	if (index != -1) {
		tempFieldLabel = tempFieldLabel.substr(0,index);
	}
	
	// 是否有提示信息
	index = tempFieldLabel.indexOf(helpTextStr);
	if (index != -1) {
		tempFieldLabel = tempFieldLabel.substr(0,index);
	}
	
	return tempFieldLabel;
}

/**
 * 空选项不能正常显示
 * 进行修正
 */
Ext.override(Ext.form.ComboBox, 
{
	initList: (
		function(){
			if(!this.tpl) {
				this.tpl = new Ext.XTemplate('<tpl for="."><div class="x-combo-list-item">{', 
								this.displayField , ':this.blank}</div></tpl>', 
								{blank: function(value){return value==='' ? '&nbsp' : value;}
				});
			}
	}).createSequence(Ext.form.ComboBox.prototype.initList)
});

/**
 * 为方便表格的QueryBean 查询,覆盖系统的默认属性配置
 */
Ext.data.Store.override({
	defaultParamNames : { // 默认参数名称
        start : 'queryBean.start',
        limit : 'queryBean.limit',
        sort : 'queryBean.sort',
        dir : 'queryBean.dir'
    }
});

/****************************  校验  ******************************************/
Ext.apply(Ext.form.VTypes, {
        timeCheck: function(v) {
            return /^\d+([.]{1}[0-9]+)?[w|W|d|D|h|H|m|M]?$/.test(v);
        },
        timeCheckText: '资源耗时填写有误,请查看正确的填写方式'
});