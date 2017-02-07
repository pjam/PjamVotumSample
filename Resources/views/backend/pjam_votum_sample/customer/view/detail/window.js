//{block name="backend/customer/view/detail/window"}
// {$smarty.block.parent}
Ext.define('Shopware.apps.PjamVotumSample.view.detail.Window', {
    override:'Shopware.apps.Customer.view.detail.Window',

    /**
     * This extjs override will call the original method first
     */
    createPersonalFieldSet: function() {
        /*var me = this,
            result = me.callParent(arguments);

        me.customerVotumCustomerNumber = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'V',
            labelWidth: 155,
            name: 'votum_customer_number',
            allowBlank: true,
            required: false
        });

        result.add(me.customerVotumCustomerNumber);
        result.doLayout();

        return result;*/

        var me = this;

        me.customerSalutation = Ext.create('Ext.form.field.ComboBox', {
            triggerAction: 'all',
            fieldLabel: me.snippets.salutation.label,
            labelWidth: 155,
            name: 'salutation',
            editable: false,
            allowBlank: false,
            valueField: 'key',
            displayField: 'label',
            store: Ext.create('Shopware.apps.Base.store.Salutation').load()
        });

        me.customerTitle = Ext.create('Ext.form.field.Text', {
            fieldLabel: me.snippets.field_title,
            labelWidth: 155,
            name: 'title',
            allowBlank: true
        });

        me.customerFirstname = Ext.create('Ext.form.field.Text', {
            fieldLabel: me.snippets.firstname,
            labelWidth: 155,
            name: 'firstname',
            allowBlank: false,
            required: true
        });

        me.customerLastname = Ext.create('Ext.form.field.Text', {
            fieldLabel: me.snippets.lastname,
            labelWidth: 155,
            name: 'lastname',
            allowBlank: false,
            required: true
        });

        me.customerBirthday = Ext.create('Ext.form.field.Date', {
            fieldLabel: me.snippets.birthday,
            labelWidth: 155,
            submitFormat: 'd.m.Y',
            name: 'birthday'
        });

        me.customerVotumCustomerNumber = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Votum Customer Number',
            labelWidth: 155,
            name: 'votum_customer_number',
            allowBlank: true,
            required: false
        });

        return Ext.create('Ext.form.FieldSet', {
            layout: 'column',
            title: '{s name="personal_field_set" namespace="backend/customer/view/detail"}{/s}',
            defaults: {
                xtype: 'container',
                columnWidth:0.5,
                border:false,
                cls: Ext.baseCSSPrefix + 'field-set-container',
                layout:'anchor',
                defaults: {
                    anchor:'95%',
                    labelWidth:155,
                    minWidth:250,
                    xtype:'textfield'
                }
            },
            items: [
                { items: [me.customerSalutation, me.customerFirstname, me.customerBirthday] },
                { items: [me.customerTitle, me.customerLastname, me.customerVotumCustomerNumber] }
            ]
        });
    }
});
//{/block}