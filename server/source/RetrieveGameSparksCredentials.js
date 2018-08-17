const JWT = require("jsonwebtoken")

const Nimble = require("./library/Nimble.js")
const GameSparks = require("./library/GameSparks.js")

const TWITCH_SECRET = require("./config/TWITCH_SECRET.js")

module.exports.handler = new Nimble.LambdaHandler(async (event) => {
    try {
        event.authorization = JWT.verify(event.headers.Authorization, TWITCH_SECRET)
    } catch(error) {
        throw new Nimble.UserError("The request is not authorized.")
    }

    const nonce = event.pathParameters.nonce
    const opaqueUserId = event.authorization.opaque_user_id

    return GameSparks.getCredentials(nonce, opaqueUserId)
})
