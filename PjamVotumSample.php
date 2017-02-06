<?php

namespace PjamVotumSample;

use Shopware\Components\Plugin;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Shopware\Components\Plugin\Context\InstallContext;
use Shopware\Components\Plugin\Context\UninstallContext;

/**
 * Shopware-Plugin pjamVotumSample.
 */
class PjamVotumSamplea extends Plugin
{

    /**
    * @param ContainerBuilder $container
    */
    public function build(ContainerBuilder $container)
    {
        $container->setParameter('pjam_votum_sample.plugin_dir', $this->getPath());
        parent::build($container);
    }

    /**
     * method called on plugin installation
     *
     * @param InstallContext $context
     * @return boolean
     *
     */
    public function install(InstallContext $context)
    {
        // get the crud service, which is responsible for managing the database
        $service = $this->container->get('shopware_attribute.crud_service');
        // inserts (if it does not exists) the field "votum_customer_number" with type "string"
        // into table "s_user_attributes"
        $service->update('s_user_attributes', 'votum_customer_number', 'string', [
            'label' => 'Votum Customer Number',
            'translatable' => true,
            'displayInBackend' => true
        ]);

        // rebuild attribute models (recommended
        // https://developers.shopware.com/developers-guide/attribute-system/#rebuild-attribute-models)
        $metaDataCache = Shopware()->Models()->getConfiguration()->getMetadataCacheImpl();
        $metaDataCache->deleteAll();
        Shopware()->Models()->generateAttributeModels(['s_user_attributes']);

        return true;
    }

    /**
     * method called on plugin uninstallation
     *
     * @param UninstallContext $context
     * @return boolean
     *
     */
    public function uninstall(UninstallContext $context)
    {
        // get the crud service, which is responsible for managing the database
        $service = $this->container->get('shopware_attribute.crud_service');
        // deletes the field "votum_customer_number" from table "s_user_attributes"
        $service->delete('s_user_attributes', 'votum_customer_number');

        // rebuild attribute models (recommended
        // https://developers.shopware.com/developers-guide/attribute-system/#rebuild-attribute-models)
        $metaDataCache = Shopware()->Models()->getConfiguration()->getMetadataCacheImpl();
        $metaDataCache->deleteAll();
        Shopware()->Models()->generateAttributeModels(['s_user_attributes']);

        return true;
    }
}
