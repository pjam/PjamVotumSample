//{block name="backend/customer/controller/detail"}
//{$smarty.block.parent}
Ext.define('Shopware.apps.PjamVotumSample.controller.Detail', {
    override: 'Shopware.apps.Customer.controller.Detail',

    onSaveCustomer: function(btn) {
        var me = this,
            win = btn.up('window'),
            form = win.down('form'),
            model = form.getRecord();

        if (form.getForm().isValid() ) {
            Ext.Ajax.request({
                method: 'POST',
                url: '{url controller=AttributeData action=saveData}',
                params: {
                    _foreignKey: model.get('id'),
                    _table: 's_user_attributes',
                    __attribute_votum_customer_number: form.getForm().getFieldValues().votum_customer_number
                }
            });
        }

        me.callParent([btn]);
    }
});
//{/block}