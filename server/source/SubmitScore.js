const ShortID = require("shortid")
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

    try {
        event.body = JSON.parse(event.body)
    } catch(error) {
        throw new Nimble.UserError("The request body must be parseable as JSON.")
    }

    let channelId = event.pathParameters.channelId
    let score = event.body.score

    if(channelId === undefined || score === undefined) {
        throw new Nimble.UserError("The request is missing some data.")
    }

    return {
        "channel": await Persistence.addScoreToChannel(channelId, score)
    }
})
