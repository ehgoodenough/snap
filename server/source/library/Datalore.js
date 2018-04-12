const AWS = require("aws-sdk")

const dynamo = new AWS.DynamoDB.DocumentClient()

const CHANNELS_TABLE = process.env.CHANNELS_TABLE

function getChannel(channelId) {
    return dynamo.get({
        "TableName": CHANNELS_TABLE,
        "Key": {"channelId": channelId}
    }).promise().then((response) => {
        return response.Item
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

module.exports.getChannel = getChannel
module.exports.createChannel = createChannel
