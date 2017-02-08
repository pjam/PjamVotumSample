//{block name="backend/customer/view/detail/base"}
//{$smarty.block.parent}
Ext.define('Shopware.apps.PjamVotumSample.view.detail.Base', {
    override: 'Shopware.apps.Customer.view.detail.Base',

    createBaseFormLeft: function() {
        var me = this,
            elements = me.callParent(arguments);

        me.votumCustomerNumberField = Ext.create('Ext.form.field.Text', {
            xtype: 'textfield',
            name: 'votum_customer_number',
            labelWidth: 155,
            fieldLabel: 'Votum Customer Number',
        });

        elements.push(me.votumCustomerNumberField);

        return elements;
    },

    initComponent: function() {
        var me = this;

        me.callParent(arguments);

        Ext.Ajax.request({
            url: '{url controller=AttributeData action=loadData}',
            params: {
                _foreignKey: me.record.get('id'),
                _table: 's_user_attributes'
            },
            success: function(responseData, request) {
                var response = Ext.JSON.decode(responseData.responseText);
                me.votumCustomerNumberField.setValue(response.data['__attribute_votum_customer_number']);
            }
        });
    }
});
//{/block}