const Nimble = require("library/Nimble")

const GA_GAME_KEY = "da6090ec942fbadf553e41ca641e7a20"
const GA_SECRET_KEY = "9b3fe1aa402799a0f7c1243f1e930087afc2f121"

const GameAnalytics = require("gameanalytics")
GameAnalytics._ = GameAnalytics.GameAnalytics

const analytics = module.exports = {}
analytics.isInitialized = false

analytics.initialize = function() {
    // GameAnalytics._.setEnabledInfoLog(true)
    // GameAnalytics._.setEnabledVerboseLog(true)

    GameAnalytics._.configureBuild(__VERSION__)
    GameAnalytics._.configureUserId(Nimble.twitch.viewer.opaqueUserId)
    GameAnalytics._.initialize(GA_GAME_KEY, GA_SECRET_KEY)

    GameAnalytics._.addDesignEvent(`Mount:${Nimble.twitch.extension.mount}`)
    GameAnalytics._.addDesignEvent(`Locale:${Nimble.twitch.extension.locale}`)

    analytics.isInitialized = true
}

analytics.reportError = function(error) {
    if(analytics.isInitialized === true) {
        GameAnalytics._.addErrorEvent(GameAnalytics.EGAErrorSeverity.Error, error.message)
    }
}

analytics.reportStartGame = function() {
    if(analytics.isInitialized === false) analytics.initialize()
    GameAnalytics._.addProgressionEvent(GameAnalytics.EGAProgressionStatus.Start, "game")
}

analytics.reportEndGame = function() {
    if(analytics.isInitialized === false) analytics.initialize()
    GameAnalytics._.addProgressionEvent(GameAnalytics.EGAProgressionStatus.Complete, "game")
}
