import ShortID from "shortid"
import QueryString from "query-string"

const QUERY = QueryString.parse(window.location.search)
const HUBBLE_URI = "https://jz432av6jk.execute-api.us-east-1.amazonaws.com/production/hubble/v1/snap/event?extension=SNAP"
// const HUBBLE_URI = "https://x5vyel5d39.execute-api.us-east-1.amazonaws.com/development/hubble/v1/snap/event?extension=SNAP"

module.exports.submitEvent = function(params) {
    return window.fetch(HUBBLE_URI, {
        "method": "POST",
        "body": JSON.stringify({
            "table_name": "events",
            "fields": {
                "opq_user_id": params.authorization.userId,
                "channel_id": params.authorization.channelId,
                "event_type": params.type,
                "version": __VERSION__,
                "anchor": QUERY["anchor"],
                "event_id": ShortID.generate(),
                "event_source": "SNAP",
                "instance": "STANDALONE-SNAP",
            }
        }),
        "headers": {
            "Authorization": params.authorization.token,
            "Content-Type": "application/json"
        }
    }).catch((error) => {
        console.log(error)
    })
}
