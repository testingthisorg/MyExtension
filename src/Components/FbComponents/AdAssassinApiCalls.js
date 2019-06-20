import Axios from "axios";

export async function aaSendAdAccounts(data) {
    return await Axios.post("aa-accounts", data).then(k => k.data);
}

export async function aaSendCampaigns(data) {
    return await Axios.post("aa-campaigns", data).then(k => k.data);
}
export async function aaGetUserAdAccountIds(userId) {
    let url = "aa-accounts/" + userId + "/account-ids";
    return await Axios.get(url).then(k => k.data);
}
export async function aaGetUserSyncStatus(userId) {
    let url = "users/" + userId + "/sync-status";
    return await Axios.get(url).then(k => k.data);
}