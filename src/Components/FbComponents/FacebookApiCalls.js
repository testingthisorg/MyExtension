import Axios from "axios";
import { RandomSleep } from "../../shared/utility";

const fbAxios = Axios.create({
    baseURL: 'https://graph.facebook.com/v3.3/',
    timeout: 5000
});

var user_base_url = 'me?access_token=~access_token~';
export async function fbGetUserInfo(access_token) {
    let url = user_base_url.replace('~access_token~', access_token);
    let data = await fbAxios.get(url).then(k => k.data);
    return data;
}


const accnt_fields = "account_id,account_status,age,agency_client_declaration,amount_spent,attribution_spec,balance,business,business_city,business_country_code,business_name,business_state,business_street,business_street2,business_zip,can_create_brand_lift_study,created_time,currency,disable_reason,end_advertiser,end_advertiser_name,failed_delivery_checks,fb_entity,has_migrated_permissions,min_daily_budget,name,owner,partner,spend_cap,timezone_id,timezone_name,timezone_offset_hours_utc,id,io_number,min_campaign_group_spend_cap";
var accnt_base_url = 'me/adaccounts?access_token=~access_token~&fields=' + accnt_fields;
export async function fbGetAdAccounts(access_token) {
    let url = accnt_base_url.replace('~access_token~', access_token);
    let data = await fbAxios.get(url).then(k => k.data);
    return data;
}

//const campaign_fields = "campaigns{account_id,adlabels,bid_strategy,boosted_object_id,brand_lift_studies,budget_rebalance_flag,budget_remaining,buying_type,can_create_brand_lift_study,can_use_spend_cap,configured_status,created_time,daily_budget,effective_status,id,lifetime_budget,issues_info,name,objective,recommendations,source_campaign,source_campaign_id,spend_cap,start_time,status,stop_time,updated_time}";
const campaign_fields = "account_id,adlabels,bid_strategy,boosted_object_id,brand_lift_studies,budget_rebalance_flag,budget_remaining,buying_type,can_create_brand_lift_study,can_use_spend_cap,configured_status,created_time,daily_budget,effective_status,id,lifetime_budget,issues_info,name,objective,recommendations,source_campaign,source_campaign_id,spend_cap,start_time,status,stop_time,updated_time";
var campaign_base_url = '~account_id~/campaigns?access_token=~access_token~&fields=' + campaign_fields;
export async function fbGetCampaigns(access_token, accntIds) {
    let accntData = [];
    let fbReturn = {};
    for (let idx = 0; idx < accntIds.length; idx++) {

        const accntId = accntIds[idx];
        console.log('[fbGetCampaigns] Getting account ' + accntId + '...');
        let url = campaign_base_url.replace('~access_token~', access_token)
            .replace('~account_id~', 'act_' + accntId);

        // follow cursor in loop
        do {
            let tempUrl = url;
            if (fbReturn.paging && fbReturn.paging.next) {
                tempUrl = fbReturn.paging.next;
            }
            await RandomSleep(0.5, 3);
            fbReturn = await fbAxios.get(tempUrl).then(k => k.data);
            accntData = accntData.concat(fbReturn.data);
            
        } while (fbReturn.paging && fbReturn.paging.next);
    }
    return accntData;
}