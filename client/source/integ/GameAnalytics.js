const Nimble = require("library/Nimble")
const GameAnalytics = require("gameanalytics").GameAnalytics

const GA_GAME_KEY = "da6090ec942fbadf553e41ca641e7a20"
const GA_SECRET_KEY = "9b3fe1aa402799a0f7c1243f1e930087afc2f121"

Nimble.twitch.onAuthorized((authorization) => {
    // GameAnalytics.setEnabledInfoLog(true)
    // GameAnalytics.setEnabledVerboseLog(true)
    
    GameAnalytics.configureBuild(__VERSION__)
    GameAnalytics.configureUserId(Nimble.twitch.viewer.opaqueUserId)
    GameAnalytics.initialize(GA_GAME_KEY, GA_SECRET_KEY)

    GameAnalytics.addDesignEvent(`Mount:${Nimble.twitch.extension.mount}`)
    GameAnalytics.addDesignEvent(`Locale:${Nimble.twitch.extension.locale}`)
})

module.exports = GameAnalytics
