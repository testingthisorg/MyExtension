import { RandomSleep, notifyMsgFromHttpRespErr } from "../../shared/utility";
import React, { Component } from 'react'
import {
    aaGetUserAdAccountIds,
    aaGetUserAdCreativeIds,
    aaGetUserAdIds,
    aaGetUserAdImageIds,
    aaGetUserAdSetIds,
    aaGetUserCampaignIds,
    aaGetUserSyncStatus,
    aaSendAdAccounts,
    aaSendAdCreatives,
    aaSendAdImages,
    aaSendAdSets,
    aaSendAds,
    aaSendCampaigns
} from "./AdAssassinApiCalls";
import { fbGetAdAccounts, fbGetAdCreatives, fbGetAdImages, fbGetAdSets, fbGetAds, fbGetCampaigns } from "./FacebookApiCalls";

import Axios from "axios";

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
        let status_interval = 100 / 8;
        this.props.spinAddTask(99, "Analyzing. Please do not close the browser.", 2, 0.01);
        let syncStati = await aaGetUserSyncStatus(this.props.userId);
        await RandomSleep(1, 3);
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
        let adimages = [];
        let adimageIdsToSync = [];
        let leadForms = [];
        let leadFormIdsToSync = [];

        // =========================== Accounts ===================================

        this.props.spinUpdateTask(99, "Warming up the engines", 2, status_interval * 1);
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
        this.props.spinUpdateTask(99, null, 2, status_interval * 2);
        if (!syncStatus.campaignsCompleted) {
            await RandomSleep(2, 5);
            campaigns = await fbGetCampaigns(token, accountIdsToSync, status_interval, status_interval * 2,
                this.props.spinUpdateTask.bind(this, 99, null, 2));
            campaignIdsToSync = await aaSendCampaigns(campaigns);
        } else {
            await RandomSleep(1, 2);
            campaignIdsToSync = await aaGetUserCampaignIds(this.props.userId);
        }
        console.log('[Campaign Ids to Sync]', campaignIdsToSync);
        // =========================== Ad Sets ===================================
        this.props.spinUpdateTask(99, null, 2, status_interval * 3);
        if (!syncStatus.adSetsCompleted) {
            await RandomSleep(2, 5);
            adsets = await fbGetAdSets(token, campaignIdsToSync, status_interval, status_interval * 3,
                this.props.spinUpdateTask.bind(this, 99, null, 2));
            adsetIdsToSync = await aaSendAdSets(adsets);
        } else {
            await RandomSleep(1, 2);
            adsetIdsToSync = await aaGetUserAdSetIds(this.props.userId);
        };
        console.log('[AdSet Ids to Sync]', adsetIdsToSync);

        // =========================== Ads ===================================
        this.props.spinUpdateTask(99, null, 2, status_interval * 4);
        if (!syncStatus.adsCompleted) {
            await RandomSleep(2, 5);
            ads = await fbGetAds(token, adsetIdsToSync, status_interval, status_interval * 4,
                this.props.spinUpdateTask.bind(this, 99, null, 2));
            adIdsToSync = await aaSendAds(ads);
        } else {
            await RandomSleep(1, 2);
            adIdsToSync = await aaGetUserAdIds(this.props.userId);
        };
        console.log('[Ad Ids to Sync]', adIdsToSync);
        // // =========================== Creatives ===================================
        this.props.spinUpdateTask(99, null, 2, status_interval * 5);
        if (!syncStatus.creativesCompleted) {
            await RandomSleep(2, 5);
            creatives = await fbGetAdCreatives(token, adIdsToSync, status_interval, status_interval * 5,
                this.props.spinUpdateTask.bind(this, 99, null, 2));
            creativeIdsToSync = await aaSendAdCreatives(creatives);
        } else {
            await RandomSleep(1, 2);
            creativeIdsToSync = await aaGetUserAdCreativeIds(this.props.userId);
        };
        console.log('[Ad Creative Ids to Sync]', creativeIdsToSync);
        // // =========================== Images ===================================
        this.props.spinUpdateTask(99, null, 2, status_interval * 6);
        if (!syncStatus.adImagesCompleted) {
            await RandomSleep(2, 5);
            adimages = await fbGetAdImages(token, accountIdsToSync, status_interval, status_interval * 6,
                this.props.spinUpdateTask.bind(this, 99, null, 2));
            adimageIdsToSync = await aaSendAdImages(adimages);
        } else {
            await RandomSleep(1, 2);
            adimageIdsToSync = await aaGetUserAdImageIds(this.props.userId);
        };
        console.log('[Ad Image Ids to Sync]', adimageIdsToSync);
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
