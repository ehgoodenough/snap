const JWT = require("jsonwebtoken")

const Nimble = require("./library/Nimble.js")
const Persistence = require("./library/Persistence.js")

const SECRET = require("./config/Secret.js")

module.exports.handler = new Nimble.LambdaHandler(async (event) => {
    try {
        event.authorization = JWT.verify(event.headers.Authorization, SECRET)
    } catch(error) {
        throw new Nimble.UserError("The request is not authorized.")
    }

    // Persistence.bumpSessionId (creates channel if need be and then bumps id)
    // TwitchExt.broadcast (send it to everyone!!)
})
