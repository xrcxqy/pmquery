/*!
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.BLANK_IMAGE_URL = 'ext3.4/resources/images/default/s.gif';
Ext.example = function(){
    var msgCt;
    function createBox(t, s){
        return ['<div class="msg">',
                '<div class="x-box-tl"><div class="x-box-tr"><div class="x-box-tc"></div></div></div>',
                '<div class="x-box-ml"><div class="x-box-mr"><div class="x-box-mc"><h3>', t, '</h3>', s, '</div></div></div>',
                '<div class="x-box-bl"><div class="x-box-br"><div class="x-box-bc"></div></div></div>',
                '</div>'].join('');
    }
    return {
        msg : function(title,format,time){
        	var second = 1;
        	if(time){
        		second = time;
        	}
            if(!msgCt){
                msgCt = Ext.DomHelper.insertFirst(document.body, {id:'msg-div'}, true);
            }
            msgCt.alignTo(document, 't-t');
            var s = String.format.apply(String, Array.prototype.slice.call(arguments, 1));
            var m = Ext.DomHelper.append(msgCt, {html:createBox(title, s)}, true);
            m.slideIn('t').pause(second).ghost("t", {remove:true});
        },
        init : function(){
            var lb = Ext.get('lib-bar');
            if(lb){
                lb.show();
            }
        }
    };
}();


function friendAlert(msg,time,title){
	if (typeof(title) == "undefined") { 
		Ext.example.msg('提示',msg,time);	
	}else{
		Ext.example.msg(title,msg,time);
	}
}

/**
 * 提示信息打印
 */
function tipsfun(val, metadata, record, rowIndex, columnIndex,store){  
	metadata.attr = 'ext:qtip='+val;
  	return val;  
}