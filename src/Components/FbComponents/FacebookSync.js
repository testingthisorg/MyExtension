import Axios from "axios";
import { Component } from 'react'
import { notifyMsgFromHttpRespErr } from "../../shared/utility";

const accnt_fields = "account_id,account_status,age,agency_client_declaration,amount_spent,attribution_spec,balance,business,business_city,business_country_code,business_name,business_state,business_street,business_street2,business_zip,can_create_brand_lift_study,created_time,currency,disable_reason,end_advertiser,end_advertiser_name,failed_delivery_checks,fb_entity,has_migrated_permissions,min_daily_budget,name,owner,partner,spend_cap,timezone_id,timezone_name,timezone_offset_hours_utc,id,io_number,min_campaign_group_spend_cap";
export class FacebookSync extends Component {
    constructor(props) {
        super(props);
        this.fbAxios = Axios.create({
            baseURL: 'https://graph.facebook.com/v3.3/',
            timeout: 5000
        })
    }
    componentDidMount = () => {
        console.log("[Facebook Syncing]", this.props.accessToken);
        this.beginProcessing();
    };

    beginProcessing = () => {
        var url = 'me/adaccounts?access_token=' + 
                        this.props.accessToken +
                        '&fields=' + accnt_fields;
        // get data from facebook
        this.props.spinStart("Analyzing. Do not close your browser.");

        new Promise((resolve, reject) => {
            this.fbAxios
                .get(url)
                .then(resp => {
                    console.log(resp);
                    resolve(resp.data.data);
                })
                .catch(err => {
                    reject(err);
                })
        }).then((data) => {
            Axios
                .post("aa-accounts", data)
                .then(resp => {
                    console.log(resp);
                    return;
                })
                .catch(err => {
                    throw new Error(err);
                })
        })
        .then(()=> {
            console.log('[get next item!]');
            return;
        })
        .catch(err => {
            this.props.spinStop();
            this.props.notify(notifyMsgFromHttpRespErr(err), "error");
        })
    }
    render() {
        return (null)
    }
}

export default FacebookSync;
