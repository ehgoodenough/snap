const JWT = require("jsonwebtoken")

const Nimble = require("./library/Nimble.js")
const GameSparks = require("./library/GameSparks.js")

const SECRET = require("./config/Secret.js")

module.exports.handler = new Nimble.LambdaHandler(async (event) => {
    try {
        event.authorization = JWT.verify(event.headers.Authorization, SECRET)
    } catch(error) {
        throw new Nimble.UserError("The request is not authorized.")
    }

    const nonce = event.pathParameters.nonce
    const opaqueUserId = event.authorization.opaque_user_id
    
    return GameSparks.getCredentials(nonce, opaqueUserId)
})
