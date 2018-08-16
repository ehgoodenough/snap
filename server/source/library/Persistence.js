const AWS = require("aws-sdk")

const dynamo = new AWS.DynamoDB.DocumentClient()

const CHANNELS_TABLE = process.env.CHANNELS_TABLE

const Persistence = module.exports

Persistence.getChannel = async function(channelId) {
    return dynamo.get({
        "TableName": CHANNELS_TABLE,
        "Key": {"channelId": channelId}
    }).promise().then((response) => {
        return response.Item
    }).then((channel) => {
        if(channel !== undefined) {
            return channel
        } else {
            return Persistence.createChannel({
                "channelId": channelId,
                "createdAt": Date.now(),
                "tally": {"0": 0}
            })
        }
    })
}

Persistence.createChannel = async function(channel) {
    return dynamo.put({
        "TableName": CHANNELS_TABLE,
        "Item": channel
    }).promise().then(() => {
        return channel
    })
}

Persistence.addScoreToChannel = async function(channelId, score) {
    await Persistence.getChannel(channelId)

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
