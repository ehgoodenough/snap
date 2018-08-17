import Preact from "preact"
import Yaafloop from "yaafloop"
import Keyb from "keyb"
import QueryString from "query-string"

import Nimble from "library/Nimble"
import Channel from "library/Channel.js"
import GameAnalytics from "integ/GameAnalytics.js"

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

    Channel.retrieveChannel().then(() => {
        Nimble.sparks.initialize().then(() => {
            Nimble.sparks.listenToLeaderboard("SNAP/session", `TwitchArcade.activity.SNAP.channelId.${Nimble.twitch.streamer.channelId}.sessionId.${Nimble.sparks.sessionId}`)
            Nimble.sparks.listenToLeaderboard("SNAP/channel", `ChannelHighScores.activity.SNAP.channelId.${Nimble.twitch.streamer.channelId}`)
            Nimble.sparks.listenToLeaderboard("SNAP/global",  "GlobalHighScores.activity.SNAP")
        })
    }).catch((error) => {
        Nimble.utility.log(error)
    })
})

Nimble.twitch.onMessage((message) => {
    if(message.path === "v1/resetChannelSession") {
        Nimble.sparks.sessionId = message.payload.channel.sessionId || "initial-session"
        Nimble.sparks.listenToLeaderboard("SNAP/session", `TwitchArcade.activity.SNAP.channelId.${Nimble.twitch.streamer.channelId}.sessionId.${Nimble.sparks.sessionId}`)
        // console.log("broadcast", Nimble.sparks.sessionId)
    }
})

// Disable the Twitch Fullscreen double-click shortcut listener.
document.body.addEventListener("dblclick", function(event) {
    event.stopPropagation()
})

window.addEventListener("error", (error) => {
    GameAnalytics.addErrorEvent(require("gameanalytics").EGAErrorSeverity.Error, error.message)
})
