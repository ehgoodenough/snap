const Nimble = require("./library/Nimble.js")

module.exports.handler = new Nimble.LambdaHandler(() => {
    throw new Error("OH NO")
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

// On load, get the scores
// On end of game, submit a score, and get the latest scores back
// On retrieval of scores, find maximum score, and work backwards
// Calculate running total of players who reached that score (adding up all following values)
// Calculate total of all scores for a percentage.
// Calculate the largest tally for the height of  graphing.
// Calculate the last tally for the width of graphing.

// CHANNELS_TABLE > what is the distribution of scores?
// SESSIONS_TABLE > what is the highest score for a channel? (channel id and sorted score, session unique)
// USERS_TABLE > what are my scores? (user id and sorted score, session unique) -> GSI!!
