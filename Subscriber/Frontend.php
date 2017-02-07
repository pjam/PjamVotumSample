<?php

namespace pjamVotumSample\Subscriber;

use Enlight\Event\SubscriberInterface;

class Frontend implements SubscriberInterface
{
    public static function getSubscribedEvents()
    {
        return array(
            'Enlight_Controller_Action_PostDispatchSecure_Frontend' => 'onFrontendPostDispatch',
            // subscribe the post dispatch event for the frontend\account controller to handle the
            // votum customer number attribute changes
            'Enlight_Controller_Action_PostDispatchSecure_Frontend_Account' => 'onFrontendAccountPostDispatch'
        );
    }

    public function onFrontendPostDispatch(\Enlight_Event_EventArgs $args)
    {
        /** @var $controller \Enlight_Controller_Action */
        $controller = $args->getSubject();
        $view = $controller->View();

        $view->addTemplateDir(__DIR__ . '/../Resources/views');
    }

    public function onFrontendAccountPostDispatch(\Enlight_Event_EventArgs $args)
    {
        /** @var $controller \Enlight_Controller_Action */
        $controller = $args->getSubject();
        $request = $controller->Request();

        // lets catch the event after the customer has been updated
        // if a form error occurs, the post dispatch event for the saveProfile action doesn't get triggered,
        // so it's ok to use it to update the customer attribute
        if ($request->getActionName() == 'saveProfile') {
            // get the form data
            $postParams = $request->getPost();
            // get the value for votum customer number form field
            $votumCustomerNumber = $postParams['profile']['attribute']['votumcustomernumber'];

            // get the current user/customer id
            $userId = $controller->get('session')->get('sUserId');

            $entityManager = $controller->get('models');

            // fetch the current user/customer object
            /** @var Customer $customer */
            $customer = $entityManager->find(Customer::class, $userId);

            // get the customer attribute object and update the votum customer number
            $customerAttribute = $customer->getAttribute();
            $customerAttribute->setVotumCustomerNumber($votumCustomerNumber);

            // save the changes to attribute
            $entityManager->persist($customerAttribute);
            $entityManager->flush();
        }
    }
}
