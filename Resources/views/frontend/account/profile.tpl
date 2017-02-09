{extends file="parent:frontend/account/profile.tpl"}

{block name='frontend_account_profile_profile_required_info'}
    <div class="profile--votum-customer-number">
        <input autocomplete="section-personal votum-customer-number"
               name="profile[attribute][votumcustomernumber]"
               type="text"
               placeholder="{s name='AccountLabelVotumCustomerNumber'
               namespace="frontend/plugins/account/profile"}Votum Customer Number{/s}"
               id="votumcustomernumber"
               value="{$sUserData.additional.user.votum_customer_number|escape}"
               class="profile--field{if $errorFlags.votumCustomerNumber} has--error{/if}"
        />
    </div>

    {$smarty.block.parent}
{/block}