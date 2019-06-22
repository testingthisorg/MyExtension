import Axios from "axios";

export async function aaSendAdAccounts(data) {
    return await Axios.post("aa-accounts", data).then(k => k.data);
}
export async function aaSendCampaigns(data) {
    return await Axios.post("aa-campaigns", data).then(k => k.data);
}
export async function aaSendAdSets(data) {
    return await Axios.post("aa-adsets", data).then(k => k.data);
}
export async function aaSendAds(data) {
    return await Axios.post("aa-ads", data).then(k => k.data);
}
export async function aaSendAdCreatives(data) {
    return await Axios.post("aa-ad-creatives", data).then(k => k.data);
}
export async function aaSendLeadForms(data) {
    return await Axios.post("aa-lead-forms", data).then(k => k.data);
}

export async function aaGetUserSyncStatus(userId) {
    let url = "users/" + userId + "/sync-status";
    return await Axios.get(url).then(k => k.data);
}

export async function aaGetUserAdAccountIds(userId) {
    let url = "aa-accounts/" + userId + "/account-ids";
    return await Axios.get(url).then(k => k.data);
}

export async function aaGetUserCampaignIds(userId) {
    let url = "aa-campaigns/" + userId + "/campaign-ids";
    return await Axios.get(url).then(k => k.data);
}
export async function aaGetUserAdSetIds(userId) {
    let url = "aa-adsets/" + userId + "/adset-ids";
    return await Axios.get(url).then(k => k.data);
}
export async function aaGetUserAdIds(userId) {
    let url = "aa-ads/" + userId + "/ad-ids";
    return await Axios.get(url).then(k => k.data);
}
export async function aaGetUserAdCreativeIds(userId) {
    let url = "aa-ad-creatives/" + userId + "/ad-creative-ids";
    return await Axios.get(url).then(k => k.data);
}
export async function aaGetUserLeadFormIds(userId) {
    let url = "aa-lead-forms/" + userId + "/lead-form-ids";
    return await Axios.get(url).then(k => k.data);
}