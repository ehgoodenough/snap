const JWT = require("jsonwebtoken")

const Nimble = require("./library/Nimble.js")
const TwitchExt = require("./library/TwitchExt.js")
const Persistence = require("./library/Persistence.js")

const TWITCH_SECRET = require("./config/TWITCH_SECRET.js")
const TWITCH_CLIENT_ID = require("./config/TWITCH_CLIENT_ID.js")

module.exports.handler = new Nimble.LambdaHandler(async (event) => {
    // const id = require("shortid").generate()
    // await TwitchExt.broadcast({
    //     "channelId": event.pathParameters.channelId,
    //     "clientId": TWITCH_CLIENT_ID,
    //     "secret": TWITCH_SECRET,
    //     "message": {
    //         "path": "v1/resetChannelSession",
    //         "payload": {
    //             "channel": {
    //                 "sessionId": id
    //             }
    //         }
    //     }
    // })
    // return {
    //     "channel": {
    //         "sessionId": id
    //     }
    // }
    try {
        event.authorization = JWT.verify(event.headers.Authorization, TWITCH_SECRET)
    } catch(error) {
        throw new Nimble.UserError("The request is not authorized.")
    }

    if(event.authorization.role !== "broadcaster") {
        throw new Nimble.UserError("The request is not authorized.")
    }

    if(event.pathParameters.channelId === undefined) {
        throw new Nimble.UserError("The request is missing some data.")
    }

    let channel = await Persistence.resetSessionForChannel(event.pathParameters.channelId)

    await TwitchExt.broadcast({
        "channelId": event.pathParameters.channelId,
        "clientId": TWITCH_CLIENT_ID,
        "secret": TWITCH_SECRET,
        "message": {
            "path": "v1/resetChannelSession",
            "payload": {
                "channel": channel
            }
        }
    })

    return {
        "channel": channel
    }
})
