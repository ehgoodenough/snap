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

    return GameSparks.getCredentials(event.pathParameters.nonce, event.authorization.opaque_user_id)
})
