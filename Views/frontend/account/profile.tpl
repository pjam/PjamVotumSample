{extends file="parent:frontend/account/profile.tpl"}

{block name='frontend_account_profile_profile_required_info'}
    {*<div class="profile--votum-customer-number">
        <input autocomplete="section-personal votum-customer-number"
               name="profile[attribute][votumcustomernumber]"
               type="text"
               placeholder="Votum Customer Number"
               id="votumcustomernumber"
               value="{$sUserData.additional.user.votum_customer_number|escape}"
               class="profile--field{if $errorFlags.votumCustomerNumber} has--error{/if}"
        />
    </div>*}

    <div class="panel--body">
        <strong>Votum customer number</strong>
        <div class="profile--votum-customer-number">
            {$sUserData.additional.user.votum_customer_number|escape}
        </div>
    </div>

    {$smarty.block.parent}
{/block}