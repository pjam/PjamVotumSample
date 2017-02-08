<?php

namespace pjamVotumSample\Subscriber;

use Enlight\Event\SubscriberInterface;

class Backend implements SubscriberInterface
{
    public static function getSubscribedEvents()
    {
        return array(
            // as in https://developers.shopware.com/developers-guide/attribute-system/#hook-into-the-backend-definition
            'Enlight_Controller_Action_PostDispatchSecure_Backend_Customer' => 'onCustomerPostDispatch'
        );
    }

    public function onCustomerPostDispatch(\Enlight_Event_EventArgs $args)
    {
        /** @var $controller \Enlight_Controller_Action */
        $controller = $args->getSubject();
        $view = $controller->View();
        $request = $controller->Request();

        $view->addTemplateDir(__DIR__ . '/../Resources/views');

        if ($request->getActionName() == 'load') {
            $view->extendsTemplate('backend/pjam_votum_sample/customer/view/detail/base.js');
            $view->extendsTemplate('backend/pjam_votum_sample/customer/controller/detail.js');
        }
    }
}
