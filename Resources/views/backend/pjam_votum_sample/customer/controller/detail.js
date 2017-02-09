//{block name="backend/customer/controller/detail"}
//{$smarty.block.parent}
Ext.define('Shopware.apps.PjamVotumSample.controller.Detail', {
    override: 'Shopware.apps.Customer.controller.Detail',

    onSaveCustomer: function(btn) {
        var me = this,
            win = btn.up('window'),
            form = win.down('form'),
            model = form.getRecord();

        // if saving an existing customer, just need to check if the form is valid
        // in that case, saves the attribute with the entered value in the form
        if (model.get('id') && form.getForm().isValid()) {
            Ext.Ajax.request({
                method: 'POST',
                url: '{url controller=AttributeData action=saveData}',
                params: {
                    _foreignKey: model.get('id'),
                    _table: 's_user_attributes',
                    __attribute_votum_customer_number: form.getForm().getFieldValues().votum_customer_number
                }
            });

            me.callParent([btn]);
        }
        // if is saving a new customer, we can only store the votum costumer number after the customer object is
        // created. As there are no events or entry points we can use, we copy the rest of the overriden function
        // and save the attribute right after the object is created
        else {
            var missingField = "Unknown field",
                listStore = me.subApplication.getStore('List');

            if (!form.getForm().isValid() ) {
                // check which field is not valid in order to tell the user, why the customer cannot be saved
                // SW-4322
                form.getForm().getFields().each(function(f){
                    if(!f.validate()){
                        if(f.fieldLabel){
                            missingField = f.fieldLabel;
                        }else if(f.name){
                            missingField = f.name;
                        }
                        Shopware.Notification.createGrowlMessage(me.snippets.form.errorTitle, Ext.String.format(me.snippets.form.errorMessage, missingField), me.snippets.growlMessage);
                        return false;
                    }

                });
                return;
            }

            if (!model.get('id')) {
                var addressData = {};
                Ext.each(me.getDetailWindow().addressForm.query('field'), function(field) {
                    field.submitValue = false;
                    addressData[field.getName()] = field.getValue();
                });

                var addressModel = Ext.create('Shopware.apps.Customer.model.Address', addressData),
                    billingModel = Ext.create('Shopware.apps.Customer.model.Billing'),
                    shippingModel = Ext.create('Shopware.apps.Customer.model.Shipping');

                billingModel.fromAddress(addressModel);
                shippingModel.fromAddress(addressModel);

                model.getBilling().add(billingModel);
                model.getShipping().add(shippingModel);
            }

            form.getForm().updateRecord(model);

            //save the model and check in the callback function if the operation was successfully
            model.save({
                callback: function (data, operation) {
                    var records = operation.getRecords(),
                        record = records[0],
                        rawData = record.getProxy().getReader().rawData;

                    if (operation.success === true) {
                        if (typeof addressModel !== 'undefined') {
                            addressModel.set('user_id', record.get('id'));
                            addressModel.save();
                        }

                        number = model.get('number');

                        Shopware.Notification.createGrowlMessage(
                            me.snippets.password.successTitle,
                            Ext.String.format(me.snippets.password.successText, number),
                            me.snippets.growlMessage
                        );

                        win.attributeForm.saveAttribute(record.get('id'));

                        Ext.Ajax.request({
                            method: 'POST',
                            url: '{url controller=AttributeData action=saveData}',
                            params: {
                                _foreignKey: record.get('id'),
                                _table: 's_user_attributes',
                                __attribute_votum_customer_number: form.getForm().getFieldValues().votum_customer_number
                            }
                        });

                        win.destroy();
                        listStore.load();
                    } else {
                        Shopware.Notification.createGrowlMessage(me.snippets.password.errorTitle, me.snippets.password.errorText + '<br> ' + rawData.message, me.snippets.growlMessage)
                    }
                }
            });
        }
    }
});
//{/block}