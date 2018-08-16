const JWT = require("jsonwebtoken")

const Nimble = require("./library/Nimble.js")
const TwitchExt = require("./library/TwitchExt.js")
const Persistence = require("./library/Persistence.js")

const SECRET = require("./config/Secret.js")
const CLIENT_ID = require("./config/ClientId.js")

module.exports.handler = new Nimble.LambdaHandler(async (event) => {
    try {
        event.authorization = JWT.verify(event.headers.Authorization, SECRET)
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

    // await TwitchExt.broadcast({
    //     "channelId": event.pathParameters.channelId,
    //     "clientId": CLIENT_ID,
    //     "secret": SECRET,
    //     "message": {
    //         "path": "v1/resetChannelSession",
    //         "payload": {
    //             "channel": channel
    //         }
    //     }
    // })

    return {
        "channel": channel
    }
})
