{extends file="parent:frontend/register/personal_fieldset.tpl"}

{block name='frontend_register_personal_fieldset_password_description'}
    {$smarty.block.parent}

    <div class="register--votum-customer-number2">
        <input autocomplete="section-personal votum-customer-number2"
               name="register[personal][attribute][votumCustomerNumber2]"
               type="text"
               placeholder="{s name='RegisterPlaceholderVotumCustomerNumber2'
               namespace="frontend/plugins/register/personal_fieldset"}Votum Customer Number2{/s}"
               id="votumcustomernumber2"
               value="{$form_data.attribute.votumCustomerNumber2|escape}"
               class="register--field{if $errorFlags.votumCustomerNumber2} has--error{/if}"
                />
    </div>
{/block}