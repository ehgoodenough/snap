const Nimble = require("./library/Nimble.js")
const Datalore = require("./library/Datalore.js")

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

    await Datalore.getChannel(channelId)

    return {
        "channel": await Datalore.addScoreToChannel(channelId, score)
    }
})
