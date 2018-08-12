const JWT = require("jsonwebtoken")

const Nimble = require("./library/Nimble.js")
const Leaderboard = require("./library/Leaderboard.js")

const SECRET = require("./config/Secret.js")

module.exports.handler = new Nimble.LambdaHandler(async (event) => {
    try {
        event.authorization = JWT.verify(event.headers.Authorization, SECRET)
    } catch(error) {
        throw new Nimble.UserError("The request is not authorized.")
    }

    return {
        "channel": await Leaderboard.getChannel(event.pathParameters.channelId)
    }
})

// {
//     "channel": {
//         "id": "123456789",
//         "tally": {
//             "3": 1000,
//             "4": 2000,
//         }
//     },
//     "user": {
//         "oid": "123456789",
//         "id": "124567789",
//         "best": 98,
//         "tally": 123,
//     }
// }

// CHANNELS_TABLE > what is the distribution of scores?
// SESSIONS_TABLE > what is the highest score for a channel? (channel id and sorted score, session unique)
// USERS_TABLE > what are my scores? (user id and sorted score, session unique) -> GSI!!
