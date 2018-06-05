import Preact from "preact"
import Yaafloop from "yaafloop"
import Keyb from "keyb"
import QueryString from "query-string"

import View from "views/View.js"
import Experience from "models/Experience.js"

import "vendor/FullStory.js"
import "vendor/GoogleAnalytics.js"

let query = QueryString.parse(location.search)
if(query.state === "testing") {
    console.clear()
}

Twitch.ext.onAuthorized((authorization) => {
    let experience = new Experience({
        "authorization": authorization
    })

    let mount = Preact.render(<View experience={experience}/>, document.body)

    let loop = new Yaafloop((delta) => {
        experience.update(delta)
        Preact.render(<View experience={experience}/>, document.body, mount)
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

// Focus the game.
document.addEventListener("click", function(event) {
    document.getElementById("input").focus()
})
