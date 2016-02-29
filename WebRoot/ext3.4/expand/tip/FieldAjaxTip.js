Ext.ns('Ext.ux.form');
Ext.ux.form.FieldAjaxTip = Ext.extend(Object, {
    init: function(field){
    	field.showTip = function(){
    		if(this.tipurl){
                if(!this.tip){
                    /*this.tip = new Ext.ToolTip({
                        title: this.qtitle,
                        html: this.qtip,
                        dismissDelay:this.dismissDelaythis
                    });*/
                    this.tip =new Ext.ToolTip({
				        //target: 'ajax-tip',
				        width: this.tipWidth,
				        autoLoad: this.tipurl,
				        dismissDelay: this.dismissDelaythis
				    });
                }
                this.tip.showBy(this.el, 'tl-bl?');
                this.tip.load({scripts: true,url:this.tipurl});
        	}
    	},
        field.on({
            focus: function(){
            	if(this.tipurl){
	                if(!this.tip){
	                    /*this.tip = new Ext.ToolTip({
	                        title: this.qtitle,
	                        html: this.qtip,
	                        dismissDelay:this.dismissDelaythis
	                    });*/
	                    this.tip =new Ext.ToolTip({
					        //target: 'ajax-tip',
					        width: this.tipWidth,
					        autoLoad: this.tipurl,
					        dismissDelay: this.dismissDelaythis
					    });
	                }
	                this.tip.showBy(this.el, 'tl-bl?');
	                this.tip.load({scripts: true,url:this.tipurl});
            	}
            },
            blur: function(){
                if(this.tip){
                    //this.tip.hide();
                }
            },
            destroy: function(){
              if(this.tip){
                  this.tip.destroy();
                  delete this.tip;
              }
            }
        });
    }
});
Ext.preg('fieldajaxtip', Ext.ux.form.FieldAjaxTip);    