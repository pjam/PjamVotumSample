<?php

class Shopware_Plugins_Frontend_PjamVotumSample_Bootstrap extends Shopware_Components_Plugin_Bootstrap
{
    // returns plugin's current version
    public function getVersion()
    {
        return '0.1.0';
    }

    // returns plugin's label
    public function getLabel()
    {
        return 'Votum Sample Plugin';
    }

    // gets plugin's information
    public function getInfo()
    {
        return array(
            'label' => $this->getLabel(),
            'version' => $this->getVersion(),
            'link' => 'https://github.com/pjam/pjamVotumSample'
        );
    }

    // method called on plugin installation
    public function install()
    {
        // get the crud service, which is responsible for managing the database
        $service = $this->get('shopware_attribute.crud_service');
        // inserts (if it does not exists) the field "votum_customer_number" with type "string"
        // into table "s_user_attributes"
        $service->update('s_user_attributes', 'votum_customer_number', 'string');

        // rebuild attribute models (recommended
        // https://developers.shopware.com/developers-guide/attribute-system/#rebuild-attribute-models)
        $metaDataCache = Shopware()->Models()->getConfiguration()->getMetadataCacheImpl();
        $metaDataCache->deleteAll();
        Shopware()->Models()->generateAttributeModels(['s_user_attributes']);

        $this->subscribeEvent(
            'Enlight_Controller_Action_PostDispatchSecure_Frontend',
            'addTemplateDir'
        );

        return true;
    }

    // method called on plugin uninstallation
    public function uninstall()
    {
        // get the crud service, which is responsible for managing the database
        $service = $this->get('shopware_attribute.crud_service');
        // deletes the field "votum_customer_number" from table "s_user_attributes"
        $service->delete('s_user_attributes', 'votum_customer_number');

        // rebuild attribute models (recommended
        // https://developers.shopware.com/developers-guide/attribute-system/#rebuild-attribute-models)
        $metaDataCache = Shopware()->Models()->getConfiguration()->getMetadataCacheImpl();
        $metaDataCache->deleteAll();
        Shopware()->Models()->generateAttributeModels(['s_user_attributes']);

        return true;
    }

    public function addTemplateDir()
    {
        Shopware()->Container()->get('template')->addTemplateDir($this->Path() . 'Views/');
    }
}