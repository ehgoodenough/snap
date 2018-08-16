import Preact from "preact"
import Yaafloop from "yaafloop"
import Keyb from "keyb"
import QueryString from "query-string"
import Nimble from "library/Nimble"

import View from "views/View.js"
import Model from "models/Model.js"

if(Nimble.twitch.extension.state === "testing") {
    console.clear()
    require("statgrab/do")
}

Nimble.twitch.onAuthorized((authorization) => {
    let model = new Model()

    let mount = Preact.render(<View model={model}/>, document.body)

    let loop = new Yaafloop((delta) => {
        model.update(delta)
        Preact.render(<View model={model}/>, document.body, mount)
    })

    Nimble.sparks.initialize().then(() => {
        const GLOBAL_LEADERBOARD = "GlobalHighScores.activity.SNAP"
        const CHANNEL_LEADERBOARD = `ChannelHighScores.activity.SNAP.channelId.${Nimble.twitch.streamer.channelId}`
        const SESSION_LEADERBOARD = `TwitchArcade.activity.SNAP.channelId.${Nimble.twitch.streamer.channelId}.sessionId.${Nimble.sparks.sessionId}`
        Nimble.sparks.listenToLeaderboard("SNAP/session", SESSION_LEADERBOARD)
        Nimble.sparks.listenToLeaderboard("SNAP/channel", CHANNEL_LEADERBOARD)
        Nimble.sparks.listenToLeaderboard("SNAP/global", GLOBAL_LEADERBOARD)
    })
})

// Disable the Twitch Fullscreen double-click shortcut listener.
document.body.addEventListener("dblclick", function(event) {
    event.stopPropagation()
})

// Disable the Twitch keyboard shortcut listeners.
document.addEventListener("keydown", function(event) {
    event.preventDefault()
})

import GameAnalytics from "integ/GameAnalytics.js"

window.addEventListener("error", (error) => {
    GameAnalytics.addErrorEvent(require("gameanalytics").EGAErrorSeverity.Error, error.message)
})
