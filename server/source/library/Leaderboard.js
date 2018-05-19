const AWS = require("aws-sdk")

const dynamo = new AWS.DynamoDB.DocumentClient()

const CHANNELS_TABLE = process.env.CHANNELS_TABLE
const CHANNEL_USERS_TABLE = process.env.CHANNEL_USERS_TABLE
const CHANNEL_SESSIONS_TABLE = process.env.CHANNEL_SESSIONS_TABLE

const Leaderboard = module.exports

Leaderboard.getChannel = async function(channelId) {
    return dynamo.get({
        "TableName": CHANNELS_TABLE,
        "Key": {"channelId": channelId}
    }).promise().then((response) => {
        return response.Item
    }).then((channel) => {
        if(channel !== undefined) {
            return channel
        } else {
            return Leaderboard.createChannel({
                "channelId": channelId,
                "createdAt": Date.now(),
                "tally": {"0": 0}
            })
        }
    })
}

Leaderboard.createChannel = async function(channel) {
    return dynamo.put({
        "TableName": CHANNELS_TABLE,
        "Item": channel
    }).promise().then(() => {
        return channel
    })
}

Leaderboard.addScoreToChannelSession = async function(channelId, sessionId, score) {
    let channelSession = {
        "channelId-sessionId": channelId + "-" + sessionId,
        "channelId": channelId,
        "sessionId": sessionId,
        "score": score
    }
    return dynamo.put({
        "TableName": CHANNEL_SESSIONS_TABLE,
        "Item": channelSession
    }).promise().then(() => {
        return channelSession
    })
}

Leaderboard.addScoreToChannel = async function(channelId, score) {
    await Leaderboard.getChannel(channelId)

    return dynamo.update({
        "TableName": CHANNELS_TABLE,
        "Key": {"channelId": channelId},
        "UpdateExpression": "SET tally.#score = if_not_exists(tally.#score, :zero) + :one",
        "ExpressionAttributeValues": {":zero": 0, ":one": 1},
        "ExpressionAttributeNames": {"#score": score},
        "ReturnValues": "ALL_NEW"
    }).promise().then((response) => {
        return response.Attributes
    })
}
