{extends file="parent:frontend/register/personal_fieldset.tpl"}

{block name='frontend_register_personal_fieldset_password_description'}
    {$smarty.block.parent}

    <div class="register--votum-customer-number">
        <input autocomplete="section-personal votum-customer-number"
               name="register[personal][attribute][votumCustomerNumber]"
               type="text"
               placeholder="{s name='RegisterPlaceholderVotumCustomerNumber'
               namespace="frontend/plugins/register/personal_fieldset"}Votum Customer Number{/s}"
               id="votumcustomernumber"
               value="{$form_data.attribute.votumCustomerNumber|escape}"
               class="register--field{if $errorFlags.votumCustomerNumber} has--error{/if}"
        />
    </div>
{/block}