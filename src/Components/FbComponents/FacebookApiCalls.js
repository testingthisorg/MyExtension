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
export async function fbGetCampaigns(access_token, accntIds, spinnerUpdate) {
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


const adset_fields = "adlabels,account_id,adset_schedule,bid_amount,bid_info,bid_strategy,billing_event,budget_remaining,configured_status,created_time,creative_sequence,daily_budget,daily_min_spend_target,daily_spend_cap,destination_type,effective_status,end_time,frequency_control_specs,id,issues_info,lifetime_budget,lifetime_imps,lifetime_min_spend_target,lifetime_spend_cap,name,optimization_goal,optimization_sub_event,recurring_budget_semantics,rf_prediction_id,source_adset,source_adset_id,start_time,status,time_based_ad_rotation_id_blocks,time_based_ad_rotation_intervals,updated_time,use_new_app_click,campaign_id,instagram_actor_id,is_dynamic_creative,pacing_type,promoted_object,recommendations,targeting";
var adset_base_url = '~item_id~/adsets?access_token=~access_token~&fields=' + adset_fields;
export async function fbGetAdSets(access_token, itemIds, spinnerUpdate) {
    let itemData = [];
    let fbReturn = {};
    let spinnerInterval = 17 / itemIds.length;
    console.log('[spinner-interval]');
    for (let idx = 0; idx < itemIds.length; idx++) {
        spinnerUpdate((idx + 1) * spinnerInterval + 34);

        console.log('[spinnerUpdate][spinner-interval]', (idx + 1) * spinnerInterval + 34);
        await RandomSleep(2, 5);
        const itemId = itemIds[idx];
        console.log('[fbGetAdSets] Getting item id ' + itemId + '...');
        let url = adset_base_url.replace('~access_token~', access_token)
            .replace('~item_id~', itemId);

        // follow cursor in loop
        do {
            let tempUrl = url;
            if (fbReturn.paging && fbReturn.paging.next) {
                tempUrl = fbReturn.paging.next;
            }
            await RandomSleep(0.5, 3);
            fbReturn = await fbAxios.get(tempUrl).then(k => k.data);
            itemData = itemData.concat(fbReturn.data);

        } while (fbReturn.paging && fbReturn.paging.next);
    }
    return itemData;
}


const ad_fields = "account_id,ad_review_feedback,adlabels,adset_id,bid_amount,bid_info,bid_type,campaign_id,configured_status,created_time,effective_status,issues_info,id,last_updated_by_app_id,name,recommendations,source_ad_id,status,updated_time";
var ad_base_url = '~item_id~/ads?access_token=~access_token~&fields=' + ad_fields;
export async function fbGetAds(access_token, itemIds, spinnerUpdate) {
    let itemData = [];
    let fbReturn = {};
    let spinnerInterval = 17 / itemIds.length;
    for (let idx = 0; idx < itemIds.length; idx++) {
        spinnerUpdate((idx + 1) * spinnerInterval + 51);
        console.log('[spinnerUpdate][spinner-interval]', (idx + 1) * spinnerInterval + 51);
        await RandomSleep(2, 5);
        const itemId = itemIds[idx];
        console.log('[fbGetAds] Getting item id ' + itemId + '...');
        let url = ad_base_url.replace('~access_token~', access_token)
            .replace('~item_id~', itemId);

        // follow cursor in loop
        do {
            let tempUrl = url;
            if (fbReturn.paging && fbReturn.paging.next) {
                tempUrl = fbReturn.paging.next;
            }
            await RandomSleep(0.5, 3);
            fbReturn = await fbAxios.get(tempUrl).then(k => k.data);
            itemData = itemData.concat(fbReturn.data);

        } while (fbReturn.paging && fbReturn.paging.next);
    }
    return itemData;
}

const creative_fields = "account_id,actor_id,adlabels,asset_feed_spec,applink_treatment,body,branded_content_sponsor_page_id,call_to_action_type,effective_instagram_story_id,effective_object_story_id,id,image_crops,image_hash,image_url,instagram_actor_id,instagram_permalink_url,instagram_story_id,interactive_components_spec,link_og_id,link_url,messenger_sponsored_message,name,object_id,object_story_id,object_story_spec,object_type,object_url,platform_customizations,portrait_customizations,product_set_id,recommender_settings,status,template_url,template_url_spec,thumbnail_url,title,url_tags,use_page_actor_override,video_id";
var creative_base_url = '~item_id~/adcreatives?access_token=~access_token~&fields=' + creative_fields;
export async function fbGetAdCreatives(access_token, itemIds, spinnerUpdate) {
    let itemData = [];
    let fbReturn = {};
    let spinnerInterval = 17 / itemIds.length;
    for (let idx = 0; idx < itemIds.length; idx++) {
        spinnerUpdate((idx + 1) * spinnerInterval + 68);
        console.log('[spinnerUpdate][spinner-interval]', (idx + 1) * spinnerInterval + 51);
        await RandomSleep(2, 5);
        const itemId = itemIds[idx];
        console.log('[fbGetAdCreatives] Getting item id ' + itemId + '...');
        let url = creative_base_url.replace('~access_token~', access_token)
            .replace('~item_id~', itemId);

        // follow cursor in loop
        do {
            let tempUrl = url;
            if (fbReturn.paging && fbReturn.paging.next) {
                tempUrl = fbReturn.paging.next;
            }
            await RandomSleep(0.5, 3);
            fbReturn = await fbAxios.get(tempUrl).then(k => k.data);
            itemData = itemData.concat(fbReturn.data);

        } while (fbReturn.paging && fbReturn.paging.next);
    }
    return itemData;
}