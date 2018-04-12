const AWS = require("aws-sdk")

const dynamo = new AWS.DynamoDB.DocumentClient()

const CHANNELS_TABLE = process.env.CHANNELS_TABLE

function getChannel(channelId) {
    return dynamo.get({
        "TableName": CHANNELS_TABLE,
        "Key": {"channelId": channelId}
    }).promise().then((response) => {
        return response.Item
    }).then((channel) => {
        if(channel !== undefined) {
            return channel
        } else {
            return createChannel({
                "channelId": channelId,
                "createdAt": Date.now(),
                "tally": {"0": 0}
            })
        }
    })
}

function createChannel(channel) {
    return dynamo.put({
        "TableName": CHANNELS_TABLE,
        "Item": channel
    }).promise().then(() => {
        return channel
    })
}

function addScoreToChannel(channelId, score) {
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


module.exports.getChannel = getChannel
module.exports.createChannel = createChannel
module.exports.addScoreToChannel = addScoreToChannel