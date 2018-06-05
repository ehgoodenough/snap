const ShortID = require("shortid")

const Nimble = require("./library/Nimble.js")
const Leaderboard = require("./library/Leaderboard.js")

module.exports.handler = new Nimble.LambdaHandler(async (event) => {
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

    // let sessionId = ShortID.generate()
    // await Leaderboard.addScoreToChannelSession(channelId, sessionId, score)

    return {
        "channel": await Leaderboard.addScoreToChannel(channelId, score)
    }
})
