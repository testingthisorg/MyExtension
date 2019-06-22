import { RandomSleep, notifyMsgFromHttpRespErr } from "../../shared/utility";
import React, { Component } from 'react'
import {
    aaGetUserAdAccountIds,
    aaGetUserAdCreativeIds,
    aaGetUserAdIds,
    aaGetUserAdSetIds,
    aaGetUserCampaignIds,
    aaGetUserSyncStatus,
    aaSendAdAccounts,
    aaSendAdCreatives,
    aaSendAdSets,
    aaSendAds,
    aaSendCampaigns
} from "./AdAssassinApiCalls";
import { fbGetAdAccounts, fbGetAdCreatives, fbGetAdSets, fbGetAds, fbGetCampaigns } from "./FacebookApiCalls";

import Axios from "axios";

const accnt_fields = "account_id,account_status,age,agency_client_declaration,amount_spent,attribution_spec,balance,business,business_city,business_country_code,business_name,business_state,business_street,business_street2,business_zip,can_create_brand_lift_study,created_time,currency,disable_reason,end_advertiser,end_advertiser_name,failed_delivery_checks,fb_entity,has_migrated_permissions,min_daily_budget,name,owner,partner,spend_cap,timezone_id,timezone_name,timezone_offset_hours_utc,id,io_number,min_campaign_group_spend_cap";
export class FacebookSync extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialized: false
        };
        this.fbAxios = Axios.create({
            baseURL: 'https://graph.facebook.com/v3.3/',
            timeout: 5000
        })
    }
    componentDidMount = () => {
        console.log('[FacebookSync][componentDidMount]');
        if (!this.state.initialized) {
            console.log("[Facebook Syncing]", this.props.accessToken);
            this.beginProcessing();
            this.setState({ initialized: true });
        }
    };

    beginProcessing = async () => {
        let token = this.props.accessToken;
        this.props.spinAddTask(99, "Analyzing. Please do not close the browser.", 2, 0.01);
        let syncStati = await aaGetUserSyncStatus(this.props.userId);
        console.log('[sync statuses]', syncStati);
        let syncStatus = syncStati[0];
        let accnts = [];
        let accountIdsToSync = [];
        let campaigns = [];
        let campaignIdsToSync = [];
        let adsets = [];
        let adsetIdsToSync = [];
        let ads = [];
        let adIdsToSync = [];
        let creatives = [];
        let creativeIdsToSync = [];
        let leadForms = [];
        let leadFormIdsToSync = [];

        // =========================== Accounts ===================================
        if (!syncStatus.adAccountsCompleted) {
            await RandomSleep(2, 5);
            accnts = await fbGetAdAccounts(token);
            console.log(accnts.data.map(k => { return { accnt_id: k.id, owner_id: k.owner } }));
            accountIdsToSync = await aaSendAdAccounts(accnts.data);
        } else {
            await RandomSleep(1, 2);
            accountIdsToSync = await aaGetUserAdAccountIds(this.props.userId);
        }
        console.log('[Ad Account Ids to Sync]', accountIdsToSync);

        // =========================== Campaigns ===================================
        this.props.spinUpdateTask(99, "Just getting started here.", 2, 17);
        if (!syncStatus.campaignsCompleted) {
            await RandomSleep(3, 7);
            campaigns = await fbGetCampaigns(token, accountIdsToSync);
            campaignIdsToSync = await aaSendCampaigns(campaigns);
        } else {
            await RandomSleep(1, 2);
            campaignIdsToSync = await aaGetUserCampaignIds(this.props.userId);
        }
        console.log('[Campaign Ids to Sync]', campaignIdsToSync);
        // =========================== Ad Sets ===================================
        this.props.spinUpdateTask(99, "Sit tight we're getting closer.", 2, 34);
        if (!syncStatus.adSetsCompleted) {
            await RandomSleep(3, 7);
            adsets = await fbGetAdSets(token, campaignIdsToSync,
                this.props.spinUpdateTask.bind(this, 99, "Sit tight we're getting closer.", 2));
            adsetIdsToSync = await aaSendAdSets(adsets);
        } else {
            await RandomSleep(1, 2);
            adsetIdsToSync = await aaGetUserAdSetIds(this.props.userId);
        };
        console.log('[AdSet Ids to Sync]', adsetIdsToSync);

        // =========================== Ads ===================================
        this.props.spinUpdateTask(99, "Hang in there kiddo!", 2, 51);
        if (!syncStatus.adsCompleted) {
            await RandomSleep(3, 7);
            ads = await fbGetAds(token, adsetIdsToSync,
                this.props.spinUpdateTask.bind(this, 99, "Hang in there kiddo!", 2));
            adIdsToSync = await aaSendAds(ads);
        } else {
            await RandomSleep(1, 2);
            adIdsToSync = await aaGetUserAdIds(this.props.userId);
        };
        console.log('[Ad Ids to Sync]', adIdsToSync);
        // // =========================== Creatives ===================================
        // this.props.spinUpdateTask(99, "Just a few more left", 2, 68);
        if (!syncStatus.creativesCompleted) {
            await RandomSleep(3, 7);
            creatives = await fbGetAdCreatives(token, adIdsToSync,
                this.props.spinUpdateTask.bind(this, 99, "Hang in there kiddo!", 2));
            creativeIdsToSync = await aaSendAdCreatives(creatives);
        } else {
            await RandomSleep(1, 2);
            creativeIdsToSync = await aaGetUserAdCreativeIds(this.props.userId);
        };
        console.log('[Ad Creative Ids to Sync]', creativeIdsToSync);

        // // =========================== Lead Forms ===================================
        // this.props.spinUpdateTask(99, "Any second now...", 2, 85);
        // if (!syncStatus.leadFormsCompleted) {
        //     await RandomSleep(3, 7);
        //     leadForms = await fbGetLeadForms(token, adIdsToSync);
        //     leadFormIdsToSync = await aaSendLeadForms(leadForms);
        // } else {
        //     leadFormIdsToSync = await aaGetUserLeadFormIds(this.props.userId);
        // };
        // console.log('[Lead Form Ids to Sync]', leadFormIdsToSync);


        this.props.spinUpdateTask(99, "We did it!", 2, 100);
        await RandomSleep(2, 5);

        // =========================================================================
        this.props.spinRemoveTask(99);
        //this.props.spinRemoveTask(99);
        // for each account go get the campaigns from fb


        // new Promise(async (resolve, reject) => {
        //     await this.fbAxios
        //         .get(url)
        //         .then(resp => {
        //             console.log(resp);
        //             resolve(resp.data.data);
        //         })
        //         .catch(err => {
        //             reject(err);
        //         })
        // })
        //     .then(async (data) => {
        //         await Axios
        //             .post("aa-accounts", data)
        //             .then(resp => {
        //                 console.log(resp);
        //             })
        //             .catch(err => {
        //                 this.props.notify(notifyMsgFromHttpRespErr(err), 'error');
        //             })
        //     })
        //     .then(() => {
        //         console.log('[get next item!]');
        //     })
        //     .catch(err => {
        //         this.props.spinStop();
        //         this.props.notify(notifyMsgFromHttpRespErr(err), "error");
        //     })
    }
    render() {
        return (<div style={{ height: "0px", width: "0px", backgroundColor: "green" }}></div>);
    }
}

export default FacebookSync;
