import { RandomSleep, notifyMsgFromHttpRespErr } from "../../shared/utility";
import React, { Component } from 'react'
import { aaGetUserAdAccountIds, aaGetUserSyncStatus, aaSendAdAccounts, aaSendCampaigns } from "./AdAssassinApiCalls";
import { fbGetAdAccounts, fbGetCampaigns } from "./FacebookApiCalls";

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
        this.props.spinStart("Analyzing. Pleasee not close your browser.");
        let syncStati = await aaGetUserSyncStatus(this.props.userId);
        console.log('[sync statuses]', syncStati);
        let syncStatus = syncStati[0];
        let accnts = [];
        let accountIdsToSync = [];
        let campaigns = [];
        let campaignIdsToSync = [];

        if (!syncStatus.adAccountsCompleted) {
            await RandomSleep(3, 9);
            accnts = await fbGetAdAccounts(token);
            await RandomSleep(3, 9);
            accountIdsToSync = await aaSendAdAccounts(accnts);
        } else {
            accountIdsToSync = await aaGetUserAdAccountIds(this.props.userId);
            console.log('[Skipping AdAccount Syncing]', accountIdsToSync);
        }
        if (!syncStatus.campaignsCompleted) {
            await RandomSleep(3, 9);
            campaigns = await fbGetCampaigns(token, accountIdsToSync);
            debugger;
            console.log('[fbGetCampaigns]', campaigns);
            await RandomSleep(3, 9);
            campaignIdsToSync = await aaSendCampaigns(campaigns);
        } else console.log('[Skipping Campaigns]');
        if (!syncStatus.adSetsCompleted) {


        } else console.log('[Skipping Ad Sets]');
        if (!syncStatus.adsCompleted) {
        } else console.log('[Skipping Ads]');
        if (!syncStatus.creativesCompleted) {
        } else console.log('[Skipping Creatives]');
        if (!syncStatus.leadFormsCompleted) {
        } else console.log('[Skipping Lead Forms]');
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
