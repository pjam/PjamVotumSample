//{block name="backend/customer/view/detail/base"}
//{$smarty.block.parent}
Ext.define('Shopware.apps.PjamVotumSample.view.detail.Base', {
    override: 'Shopware.apps.Customer.view.detail.Base',

    createBaseFormLeft: function() {
        var me = this,
            elements = me.callParent(arguments);

        // create the form field to hold the attribute data
        me.votumCustomerNumberField = Ext.create('Ext.form.field.Text', {
            xtype: 'textfield',
            name: 'votum_customer_number',
            labelWidth: 155,
            fieldLabel: 'Votum Customer Number',
        });

        // add the field to the fieldset container
        elements.push(me.votumCustomerNumberField);

        return elements;
    },

    initComponent: function() {
        var me = this;

        me.callParent(arguments);

        // if the customer exists, fetch the attribute data from the db and fills the corresponding form field with
        // its value (based on
        // https://developers.shopware.com/developers-guide/attribute-system/#add-your-field-and-load-the-data)
        if (me.record.get('id')) {
            Ext.Ajax.request({
                url: '{url controller=AttributeData action=loadData}',
                params: {
                    _foreignKey: me.record.get('id'),
                    _table: 's_user_attributes'
                },
                success: function (responseData, request) {
                    var response = Ext.JSON.decode(responseData.responseText);
                    me.votumCustomerNumberField.setValue(response.data['__attribute_votum_customer_number']);
                }
            });
        }
    }
});
//{/block}