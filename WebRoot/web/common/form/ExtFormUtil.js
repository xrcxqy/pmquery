ExtFormUtil = {};
ExtFormUtil.supportLookOnLine = "-bat-sh-cs-cpp-h-cc-cxx-css-pas-diff-patch-js-java-php-py-rb-sql-vb-frx-xml-xslt-xhtml-html-xhtml-txt-text-log-";
ExtFormUtil.supportLookOnLineImg = "-jpg-bmp-jpeg-gif-png-";
ExtFormUtil.anchor = "90%";
ExtFormUtil.anchorone = "95%";
ExtFormUtil.anchoreTreeToOne = "96.7%";
ExtFormUtil.defaultComboboxmode = "remote";
ExtFormUtil.autoload = false;
ExtFormUtil.comboRecord = new Ext.data.Record.create(  
	[     
		{name: 'id',    type: 'string',	mapping:'id'},    
		{name: 'value', type: 'string',	mapping: 'value'}
	]  
); 

// 获取通用的下拉框Store数据
ExtFormUtil.getCommonComboBoxStore = function (config){
	var record = config.record || ExtFormUtil.comboRecord;
	return new Ext.data.Store({  
	 	proxy : new Ext.data.HttpProxy({
	            	url : config.url //'servlet/userConfig'  
	        	}),  
	    baseParams:config.params,//{type:'getTempDate'},
		autoLoad :  config.autoLoad||ExtFormUtil.autoload,// 是否自动加载   一般设置false 需要时候在加载  
		reader   :  new Ext.data.JsonReader({    
	                    root : 'root',  // 服务器返回json的根信息  
	                    id :'id' // 值为对应的mapping的值  
	                },  
	                record   // 要加载的数据  
	            )  
	}); 
}

// 获取通用的下拉框
ExtFormUtil.getCommonComboBox = function(config){
	return new Ext.form.ComboBox({
		id:config.id || Ext.id(),
		width:config.width,
		listWidth:config.listWidth,
		hiddenName:config.hiddenName,
		fieldLabel: config.fieldLabel,
		store:config.store,
		valueField: 'id',
		displayField:'value',
		forceSelection:"undefined" == typeof config.forceSelection?true:config.forceSelection,
		emptyText:config.emptyText||'请选择',
		triggerAction: 'all',
		anchor:config.anchor||'90%',
		disabled:config.disabled||false,
		helpText:config.helpText,
		cls:config.cls || '',
		allowBlank:"undefined" == typeof config.allowBlank?true:config.allowBlank,
		mode: config.mode||ExtFormUtil.defaultComboboxmode,
		blankText : config.blankText||'该选项为必填项',
		listeners:{
			'focus':function(){
				if(this.store.getCount()<2)
					this.store.load();
			},
			'beforequery':function(e){
				var combo = e.combo; 
				if(!e.forceAll){ 
					var value = e.query; 
					combo.store.filterBy(function(record,id){ 
						var text = record.get(combo.displayField); 
						return (text.toLowerCase().indexOf(value.toLowerCase())!=-1);
					});  
					combo.expand();  
					combo.restrictHeight();
					return false; 
				}  
			}
		} 	
	});
}

ExtFormUtil.getMultipleSelectComboBox = function(config){
	return new Ext.ux.form.LovCombo({
		hiddenName:config.hiddenName,
		fieldLabel:config.fieldLabel,
		store:config.store,
		valueField: 'id',
		displayField:'value',
		forceSelection:true,
		emptyText:config.emptyText || '请选择',
		triggerAction: 'all',
		anchor:config.anchor||'90%',
		beforeBlur:function(){}
	});
}


// 获取通用的文本框
ExtFormUtil.getCommonTextField = function(config){
	return new Ext.form.TextArea({
	  	fieldLabel: config.fieldLabel,
	  	name: config.name,
	  	border : false,
	  	height : 85,
		emptyText:config.emptyText||'请填写数据',
		hidden:"undefined" == typeof config.hidden?false:config.hidden,
		allowBlank:"undefined" == typeof config.allowBlank?true:config.allowBlank,
	 	anchor:config.anchor||ExtFormUtil.anchorone,
	 	helpText:config.helpText,
	 	listeners:{  
			'focus':function(e){
				e.setHeight(230);
			},
			'blur':function(e){
				e.setHeight(85);
			}
		} 
	});
}


// 获得通用的附件上传空间
ExtFormUtil.getFileUploadField = function(config){
	return new Ext.form.CompositeField({
		xtype: 'compositefield',
		fieldLabel:'附件',
		autoHeight:true,
		anchor:ExtFormUtil.anchorone,
		msgTarget: 'under',
		getFileName:function(){
			var compositefield = Ext.getCmp(config.id);
			var displayfield = compositefield.items.items[0];
			var fileName = displayfield.getValue();
			return fileName;
		},
		//item.fileName,item.fileId,item.systemName
		addUploadItem:function(item){
			var compositefield = Ext.getCmp(config.id);
			var displayfield = compositefield.items.items[0];
			var hiddenfield = compositefield.items.items[1];
			var obj = {};
			obj.url = "servlet/downloadAccessory?systemFileName=" + item.systemName;
			obj.systemName = item.systemName;
			obj.isUpload = true;
			displayfield.setValue(displayfield.getValue() + ExtFormUtil.createCanDeleteDisplayfield(item.fileName,item.fileId,hiddenfield.getId(),obj));
			hiddenfield.setValue(hiddenfield.getValue()+item.fileId+",");
			// 进行初始化
			compositefield.findParentByType(Ext.form.FormPanel).doLayout();;
		},
		id:config.id,
//		helpText:'上传附件',
		items: [{
			xtype: 'button', 
			text: '上传附件',
			
			listeners :{
				'click':function(btn,e){
					var compositefield = Ext.getCmp(config.id);
					if(!compositefield.uploadWin){
						compositefield.uploadWin =new Ext.Window({
							width : 650,
							title : '附件上传',
							height : 300,
							closeAction: 'hide',
							layout : 'fit',
							items : [
								{
									xtype:'uploadPanel',
									border : false,
									uploadUrl: basePath +　"servlet/uploadAccessory;jsessionid="+window["sessionId"],
									flashUrl : 'ext3.4/expand/swfupload/swfupload.swf'
								}
							],
							listeners :{
								'hide':function(win){
									var fileArr = win.get(0).deleteAll();
									Ext.each(fileArr,function(item,index){
										this.addUploadItem(item);
									},compositefield);
								}							
							}
						})
					}
					compositefield.uploadWin.show();
				}
			}
		},{
			xtype: 'displayfield', 
			value: ''
		},{
			xtype: 'hidden', 
			id:Ext.id(), 
			name:config.name, 
			value: ''
		}]
	});
}

ExtFormUtil.getButtonAddTextField = function(config){
	return new Ext.form.CompositeField({
		xtype: 'compositefield',
		fieldLabel:config.fieldLabel,
		autoHeight:true,
		anchor:config.anchor||anchorone,
		msgTarget: 'under',
		addValue:function(item){
			var compositefield = Ext.getCmp(config.id);
			var displayfield = compositefield.items.items[1];
			var hiddenfield = compositefield.items.items[2];
			displayfield.setValue(displayfield.getValue() + ExtFormUtil.createCanDeleteDisplayfield(item.value,item.value,hiddenfield.getId()));
			hiddenfield.setValue(hiddenfield.getValue()+item.value+",");
			// 进行初始化
			compositefield.findParentByType(Ext.form.FormPanel).doLayout();
		},
		id:config.id,
		helpText:config.helpText,
		items: [{
			xtype:'textfield',
			width:config.width||150
		},{
			xtype: 'button', 
			text: config.buttonText,
			listeners :{
				'click':function(btn,e){
					// 在界面上显示出来
					var compositefield = Ext.getCmp(config.id);
					var textfield = compositefield.items.items[0];
					var value = textfield.getValue();
					if(!value.trim()){
						alert("请出入数据");
						return;
					}
					// 数据校验
					if(compositefield.check){
						if(!compositefield.check(value)){
							return;
						}
					}
					compositefield.addValue({"value":value});
					textfield.setValue("");
				}
			}
		},{
			xtype: 'displayfield', 
			value: ''
		},{
			xtype: 'hidden', 
			id:Ext.id(), 
			name:config.name, 
			value: ''
		}]
	});
}

ExtFormUtil.getCAFField = function(config){
	var textField = new Ext.form.TextField({
		width:config.width||150,
		enableKeyEvents:true,
		plugins: ['fieldajaxtip']
	});
	
	textField.on("keyup",
		function (thisField) {
			if(textField.getValue()){
				thisField.tipurl = "servlet/caf?type=showCAF&crId=" + textField.getValue();
				thisField.showTip();
			}else{
				thisField.tipurl = "";
			}
		},this,{
			single: false,//只会执行一次单击事件。
			buffer: 100, //间隔1秒响应，在响应前点击无效。
			delay: 200,//从事件触发开始，1秒后才会执行处理函数。
			stopPropagattion: true,//事件不会向上传递（即停止事件冒泡）。
			preventDefault: true //停止事件默认操作。
		});

	var field = new Ext.form.CompositeField({
		xtype: 'compositefield',
		fieldLabel:config.fieldLabel,
		autoHeight:true,
		anchor:config.anchor||anchorone,
		msgTarget: 'under',
		addValue:function(item){
			var compositefield = Ext.getCmp(config.id);
			var displayfield = compositefield.items.items[1];
			var hiddenfield = compositefield.items.items[2];
			var obj = {};
			obj.url = "http://192.168.5.39:8080/pim/servlet/caf/initFormForBug?crid=" + item.value;
			displayfield.setValue(displayfield.getValue() + ExtFormUtil.createCanDeleteDisplayfield(item.value,item.value,hiddenfield.getId(),obj));
			hiddenfield.setValue(hiddenfield.getValue()+item.value+",");
			// 进行初始化
			compositefield.findParentByType(Ext.form.FormPanel).doLayout();
		},
		id:config.id,
		helpText:config.helpText,
		items: [textField,{
			xtype: 'button', 
			text: config.buttonText,
			listeners :{
				'click':function(btn,e){
					// 在界面上显示出来
					var compositefield = Ext.getCmp(config.id);
					var textfield = compositefield.items.items[0];
					var value = textfield.getValue();
					if(!value.trim()){
						alert("请出入数据");
						return;
					}
					// 数据校验
					if(compositefield.check){
						if(!compositefield.check(value)){
							return;
						}
					}
					compositefield.addValue({"value":value});
					textfield.setValue("");
					textfield.tipurl = "";
				}
			}
		},{
			xtype: 'displayfield', 
			value: ''
		},{
			xtype: 'hidden', 
			id:Ext.id(), 
			name:config.name, 
			value: ''
		}]
	});
	
	return field;
}

ExtFormUtil.getComboboxAddField = function(config){
	return new Ext.form.CompositeField({
		xtype: 'compositefield',
		fieldLabel:config.fieldLabel,
		autoHeight:true,
		anchor:config.anchor||anchorone,
		msgTarget: 'under',
		addValue:function(showValue,hiddenValue){
			var compositefield = Ext.getCmp(config.id);
			var displayfield = compositefield.items.items[1];
			var hiddenfield = compositefield.items.items[2];
			displayfield.setValue(displayfield.getValue() + ExtFormUtil.createCanDeleteDisplayfield(showValue,hiddenValue,hiddenfield.getId()));
			hiddenfield.setValue(hiddenfield.getValue()+hiddenValue+",");
			compositefield.items.items[0].setValue("");
			// 进行初始化
			compositefield.findParentByType(Ext.form.FormPanel).doLayout();
		},
		id:config.id,
		helpText:config.helpText,
		items: [	
		new Ext.form.ComboBox({
			store:config.store,
			triggerConfig :{tag: "img", src: Ext.BLANK_IMAGE_URL, cls: "x-form-trigger" + this.triggerClass},
			valueField: 'id',
			displayField:'value',
			forceSelection:true,
			emptyText:config.emptyText||'请选择',
			triggerAction: 'all',
			mode: 'local',
			anchor:'90%',
			hiddenName:'compositeField',
			inputByEdit:config.inputByEdit,
			listeners :{
				'select':function(combo,record,index){
					var recordForId = record.get("id");
					var showValue = record.get("value");
					Ext.getCmp(config.id).addValue(showValue,recordForId);
					combo.setValue("");
				},
				'focus':function(){
					if(this.store.getCount()<2)
						this.store.load();
				},
				'beforequery':function(e){
					var combo = e.combo; 
					if(!e.forceAll){ 
						var value = e.query; 
						combo.store.filterBy(function(record,id){ 
							var text = record.get(combo.displayField); 
							return (text.toLowerCase().indexOf(value.toLowerCase())!=-1);
						});  
						combo.expand();  
						combo.restrictHeight();
						return false; 
					}  
				},
				"keyup":function(field,e){  
					if(e.getKey() == Ext.EventObject.ENTER){
						var inputValue = field.getRawValue();
						if(inputValue == ""){
							return;
						}
						if(field.inputByEdit){
							Ext.getCmp(config.id).addValue(inputValue,inputValue);
						}else{
							var index = field.store.find('value',inputValue,0,true);
							field.store.each(function(record){
								var value = record.get("value");
								if(value == inputValue){
									Ext.getCmp(config.id).addValue(value,record.get("id"));
									return false;
								}
							});
						}
					}  
		    	}
			}
		}),{
			xtype: 'displayfield', 
			value: ''
		},{
			xtype: 'hidden', 
			id:Ext.id(), 
			name:config.name, 
			value: ''
		}]
	});
}
//组合控件，竖直排列，下拉框为主
ExtFormUtil.getComboboxAddFieldVbox = function(config){
	config.id=(config.id==null?Ext.id():config.id);
	return new Ext.form.CompositeField({
		xtype: 'compositefield',
		//fieldLabel:config.fieldLabel,
		anchor:config.anchor||ExtFormUtil.anchorone,
		msgTarget: 'under',
		postName : [config.name],
		addValue:function(showValue,hiddenValue,notNeedDoLayout){
			var compositefield = Ext.getCmp(config.id);
			var displayfield = compositefield.items.items[2];
			var hiddenfield = compositefield.items.items[3];
			var hidenValueList = hiddenfield.getValue();
			if(hidenValueList.indexOf(hiddenValue + ",") == -1){
				displayfield.setValue(displayfield.getValue() + ExtFormUtil.createCanDeleteDisplayfield(showValue,hiddenValue,hiddenfield.getId(),null,true));
				hiddenfield.setValue(hiddenfield.getValue()+hiddenValue+",");
				// 进行初始化
				if(!notNeedDoLayout){
					compositefield.findParentByType(Ext.form.FormPanel).doLayout();
				}
			}
		},
		getValue:function(){
			var compositefield = Ext.getCmp(config.id);
			var hiddenfield = compositefield.items.items[3];
			return hiddenfield.getValue();
		},
		setPostValue:function(postValue){
			var compositefield = this;
			var combobox = compositefield.items.items[1];
			var displayfield = compositefield.items.items[2];
			var hiddenfield = compositefield.items.items[3]; 
			var store = combobox.getStore();
			var idList = postValue.split(','); 
			if(store.getCount() < 1){
				store.load({  
			        callback: function(records, options, success){
			        	Ext.each(idList,function(item){
							if(item){
								var record = store.getById(item);
								if(record){
									var value = record.get('value');
									compositefield.addValue(value,item);
								}
							}
						});
			        }  
			    }); 
			}else{
				Ext.each(idList,function(item){
					if(item){
						var record = store.getById(item);
						if(record){
							var value = record.get('value');
							compositefield.addValue(value,item);
						}
					}
				});
			}
		},
		reset : function(dolayout){
			var compositefield = Ext.getCmp(config.id);
			var fieldLabel = compositefield.items.items[0];
			var combo = compositefield.items.items[1];
			var displayfield = compositefield.items.items[2];
			var hiddenfield = compositefield.items.items[3];
			displayfield.setValue("");
			hiddenfield.setValue("");
			fieldLabel.setValue(combo.fieldLabel + ": ");
			
			if(dolayout){
				compositefield.findParentByType(Ext.form.FormPanel).doLayout();
			}
		},
		id:config.id,
		//helpText:config.helpText,
		autoHeight:true,
		items: [{
			bodyStyle:'text-align: left;',
			layout:'column',
		 	border:false,
		 	items:[{
		 		columnWidth:1,
		 		border:false,
		 		items:[
		 		{
					xtype: 'displayfield',
					height:25,
					style:'font-weight:bold',
					value:config.helpText==null?config.fieldLabel+":":'<span class="underline" ext:qtip="' + config.helpText + '">' +config.fieldLabel+'</span>'+ ":"
				},
		 		new Ext.form.ComboBox({
		 			fieldLabel:config.fieldLabel,
					store:config.store,
					triggerConfig :{tag: "img", src: Ext.BLANK_IMAGE_URL, cls: "x-form-trigger" + this.triggerClass},
					valueField: 'id',
					displayField:'value',
					forceSelection:true,
					emptyText:config.emptyText||'请选择',
					triggerAction: 'all',
					listWidth:config.listWidth,
					mode: 'local',
					anchor:'90%',
					hiddenName:'compositeField',
					listeners :{
						'select':function(combo,record,index){
							var recordForId = record.get("id");
							var showValue = record.get("value");
							Ext.getCmp(config.id).addValue(showValue,recordForId);
							combo.setValue("");
						},
						'beforeselect':function(combo,record,index){
							var recordForId = record.get("id");
							var showValue = record.get("value");
							var compositefield = Ext.getCmp(config.id);
							var fb = combo.fieldLabel;
							var fieldLabel = compositefield.items.items[0];
							compositefield.addValue(showValue,recordForId);
							fieldLabel.setValue(fb + ":<font color='gray'> " + showValue + "</font>");
							
							if(compositefield.select){
								compositefield.select(recordForId);
							}
							return false;
						},
						'focus':function(){
							if(this.store.getCount()<2)
								this.store.load();
							else{
								this.initList();
								this.doQuery('');
							}
						},
						'beforequery':function(e){
							var combo = e.combo; 
							if(!e.forceAll){ 
								var value = e.query; 
								combo.store.filterBy(function(record,id){ 
									var text = record.get(combo.displayField); 
									return (text.toLowerCase().indexOf(value.toLowerCase())!=-1);
								});  
								combo.expand();  
								combo.restrictHeight();
								return false; 
							}  
						}
					}
				}),{
					xtype: 'displayfield', 
					autoHeight:true,
					value: ''
				},{
					xtype: 'hidden', 
					id:Ext.id(), 
					name:config.name, 
					value: ''
				}]
		 	}]
		}]
	});
}

//组合控件，竖直排列，文本框为主
ExtFormUtil.getSingleComboVbox = function(config){
	return new Ext.form.CompositeField({
		xtype: 'compositefield',
		postName : [config.hiddenName],
		anchor:config.anchor||ExtFormUtil.anchorone,
		msgTarget: 'under',
		autoHeight:true,
		setPostValue:function(postValue){
			var combobox = this.items.items[1]; 
			var store = combobox.getStore();
			if(store.getCount() < 1){
				store.load({  
			        callback: function(records, options, success){
			        	combobox.setValue(postValue);
			        }  
			    }); 
			}else{
				combobox.setValue(postValue);
			}
		},
		reset : function(dolayout){
			var combo = this.items.items[1];
			combo.reset();
			if(dolayout){
				this.findParentByType(Ext.form.FormPanel).doLayout();
			}
		},
		items: [{
			bodyStyle:'text-align: left;',
			layout:'column',
		 	border:false,
		 	items:[{
		 		columnWidth:1,
		 		border:false,
		 		items:[{
					xtype: 'displayfield',
					height:25,
					style:'font-weight:bold;',
					value:config.helpText==null?config.fieldLabel+":":'<span class="underline" ext:qtip="' + config.helpText + '">' +config.fieldLabel+'</span>'+ ":"
				},
		 		ExtFormUtil.getCommonComboBox(config)
				]
		 	}]
		}]
	});
}

//组合控件，竖直排列，文本框为主
ExtFormUtil.getTextFiedAddFieldVbox = function(config){
	return new Ext.form.CompositeField({
		xtype: 'compositefield',
		postName : [config.name],
		//fieldLabel:config.fieldLabel,
		anchor:config.anchor||ExtFormUtil.anchorone,
		msgTarget: 'under',
		id:config.id,
		//helpText:config.helpText,
		autoHeight:true,
		setPostValue:function(postValue){
			var filed = this.items.items[1]; 
			filed.setValue(postValue);
		},
		reset : function(dolayout){
			var filed = this.items.items[1];
			filed.reset();
			if(dolayout){
				this.findParentByType(Ext.form.FormPanel).doLayout();
			}
		},
		items: [{
			bodyStyle:'text-align: left;',
			layout:'column',
		 	border:false,
		 	items:[{
		 		columnWidth:1,
		 		border:false,
		 		items:[
		 		{
					xtype: 'displayfield',
					height:25,
					style:'font-weight:bold;',
					value:config.helpText==null?config.fieldLabel+":":'<span class="underline" ext:qtip="' + config.helpText + '">' +config.fieldLabel+'</span>'+ ":"
				},
		 		new Ext.form.TextField({
				  	fieldLabel:config.fieldLabel,
				  	helpText:config.helpText,
					name: config.name,
				 	anchor:ExtFormUtil.anchorone
				})
				]
		 	}]
		}]
	});
}
ExtFormUtil.createCanDeleteDisplayfield = function(displayValue,hiddenValue,hiddenId,urlObj,brTag){
	var id = Ext.id();
	var imgTitle = displayValue;
	var showValue = displayValue;
	if(urlObj){
		var scr = document.createElement("a");
		scr.setAttribute("href",urlObj.url);
		scr.setAttribute("target","_blank");
		scr.innerHTML = displayValue;
		showValue = scr.outerHTML;
	}
	
	//span 标签
	var newSpan = document.createElement("span");
	newSpan.setAttribute("id",id);
	
	// 保存隐藏域的节点信息,用于移除
	newSpan.setAttribute("value",hiddenValue);
	newSpan.setAttribute("hiddenId",hiddenId);
	newSpan.setAttribute("displayValue",showValue);
	newSpan.setAttribute("class","displayfieldvalue");
	newSpan.innerHTML = showValue;
	
	//图片标签
	var newMig = document.createElement("img");
	newMig.setAttribute("title","点击移除 " + imgTitle);
	newMig.setAttribute("src","resource/img/form/btn_delete.png");
	newMig.setAttribute("onclick","removeSpan('"+ id +"')");
	newMig.setAttribute("class","displayfieldimg");
	// 把图片标签插入span
	newSpan.appendChild(newMig);
	if(urlObj && urlObj.isUpload){
		var extStart=displayValue.lastIndexOf(".");
		if(extStart != -1){
			var ext = displayValue.substring(extStart + 1,displayValue.length).toLowerCase();
			if(ExtFormUtil.supportLookOnLine.indexOf("-" + ext + "-") != -1){
				var showMig = document.createElement("img");
				showMig.setAttribute("title","在线查看文档 " + imgTitle);
				showMig.setAttribute("src","resource/img/form/btn_show.png");
				showMig.setAttribute("onclick","showFile('"+ urlObj.systemName +"')");
				showMig.setAttribute("class","displayfieldimg");
				newSpan.appendChild(showMig);
			}else if(ExtFormUtil.supportLookOnLineImg.indexOf("-" + ext + "-") != -1){
				var showMig = document.createElement("img");
				showMig.setAttribute("title","在线查看图片 " + imgTitle);
				showMig.setAttribute("src","resource/img/form/btn_show_img.png");
				showMig.setAttribute("onclick","showImgFile('"+ urlObj.systemName +"')");
				showMig.setAttribute("class","displayfieldimg");
				newSpan.appendChild(showMig);
			}
		}
		
	}
//	console.log(hiddenId);
	if(brTag){
		newSpan.appendChild(document.createElement("br"));
	}
		
	return newSpan.outerHTML;
	//"<span id='applier_"+this.getValue()+"' class='text_del'>"+this.getRawValue()+"<img onclick='removeSpan(\"applier_"+this.getValue()+"\")' src='resources/images/del_black.png'/></span>"

}

function showFile(fileName){
	window.open("servlet/downloadAccessory?type=showOnLine&systemFileName=" + fileName);
}

function showImgFile(fileName){
	var img = document.getElementById("showImg");
	img.setAttribute("src","servlet/downloadAccessory?type=imgFileOS&systemFileName=" + fileName);
	var image = new Image();//new一个image对象
    image.src=img.src;
    image.onload=function(){
    	if(ExtFormUtil.showImgPanel){
    		ExtFormUtil.showImgPanel.resizeTo(image.width,image.height);
			ExtFormUtil.showImgPanel.getEl().center();
	    	ExtFormUtil.showImgPanel.getEl().show(true);
    	}else{
    		friendAlert("暂不支持");
    	}
		
	};
}

/**
 * 根据ID来移除标签,同时要同步移除hidden的ID
 */
function removeSpan(spanid){
	var spanCmp = Ext.get(spanid)
	Ext.MessageBox.confirm('提示','是否确定要移除:' + spanCmp.dom.getAttribute("displayValue"),function(btn){
		if(btn == 'yes'){
			var hiddenCmp = Ext.getCmp(spanCmp.dom.getAttribute("hiddenId"));
			hiddenCmp.setValue(hiddenCmp.getValue().replace(spanCmp.dom.getAttribute("value")+",",""));
			spanCmp.remove();
		}
	});
}

ExtFormUtil.getEmptyCmp = function (){
	return new Ext.Panel({
		border:false,
		html: '<br>'
	});
}

// 富文本框
ExtFormUtil.getHtmlEditor = function(config){
	return  new Ext.form.HtmlEditor({
		fieldLabel: config.fieldLabel,
		name:config.name,
	    height: "undefined" == typeof config.height?230:config.height,
	    anchor:config.anchor,
	    labelWidth: 70,
	    allowBlank:false,
	    value:'<br>',
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
}

ExtFormUtil.getDateRangeCmp = function (config){
	
	return new Ext.form.CompositeField({
			id : config.id || Ext.id(),
			helpText :config.helpText||'精确到天,系统默认添加 00:00:00',
			fieldLabel:config.fieldLabel,
			labelStyle :config.labelStyle ,
			postName:[config.DateFromName,config.DateToName],
			items:[{
					xtype: 'displayfield',
					height:25,
					value:'由'
				},{
					xtype: 'datefield',
			    	format: config.format || 'Y-m-d',
			    	name: config.DateFromName,
			    	editable:true
				},{
					xtype: 'displayfield',
					height:25,
					value:'至'
				},{
					xtype: 'datefield',
			    	format: config.format || 'Y-m-d',
			    	name: config.DateToName,
			    	editable:true
				}
			],
			setPostValue:function(postValue,postName){
				var dateFromfield = this.items.items[1];
				var datetofield = this.items.items[3];
				if(dateFromfield.name === postName){
					dateFromfield.setValue(postValue);
				}else if(datetofield.name === postName){
					datetofield.setValue(postValue);
				}
			},
			reset : function(dolayout){
				
				var dateFromfield = this.items.items[1];
				var datetofield = this.items.items[3];
				dateFromfield.reset();
				datetofield.reset();
				
				if(dolayout){
					compositefield.findParentByType(Ext.form.FormPanel).doLayout();
				}
			}
		});
}

Ext.onReady(function() {
	// 判断是否有图片在线查看标签,如果没有这个标签,则无需初始化,避免报错
	var img = document.getElementById("showImg");
	if(img){
		var custom  = new Ext.Resizable('showImg', {
		    wrap:true,
		    pinned:true,
		    minWidth:50,
		    minHeight: 50,
		    preserveRatio: true,
		    handles: 'all',
		    draggable:true,
		    dynamic:true
		});
		var customEl = custom.getEl();
		document.body.insertBefore(customEl.dom, document.body.firstChild);
		customEl.on('dblclick', function(){
		    customEl.hide(true);
		});
		customEl.hide();
		ExtFormUtil.showImgPanel= custom;
	}
});

function trim(str){ //删除左右两端的空格   
	return str.replace(/(^\s*)|(\s*$)/g, "");  
}  
function ltrim(str){ //删除左边的空格   
	return str.replace(/(^\s*)/g,"");  
}  
function rtrim(str){ //删除右边的空格   
	return str.replace(/(\s*$)/g,"");  
}