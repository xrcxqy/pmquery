Ext.ns('Ext.ux.form');
Ext.ux.form.FieldTip = Ext.extend(Object, {
    init: function(field){
        field.on({
            focus: function(){
                if(!this.tip){
                    this.tip = new Ext.ToolTip({
                        title: this.qtitle,
                        html: this.qtip,
                        dismissDelay:this.dismissDelaythis
                    });
                }
                this.tip.showBy(this.el, 'tl-bl?');
            },
            blur: function(){
                if(this.tip){
                    this.tip.hide();
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
Ext.preg('fieldtip', Ext.ux.form.FieldTip);    