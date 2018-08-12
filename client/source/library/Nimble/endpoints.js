const Nimble = require(".")

module.exports.TWITCH_USER_URI = new Nimble.utility.URI("https://api.twitch.tv/kraken/users/{userId}")
module.exports.TWITCH_CHANNEL_URI = new Nimble.utility.URI("https://api.twitch.tv/kraken/channels/{channelId}")
module.exports.GAMESPARKS_NONCE_URI = new Nimble.utility.URI("https://bpb5tvnz87.execute-api.us-east-1.amazonaws.com/development/v1/channels/abc/gamesparks/{nonce}?extension=ARCADE")
