import Preact from "preact"
import Yaafloop from "yaafloop"
import Keyb from "keyb"

import View from "views/View.js"
import System from "models/System.js"

import "vendor/FullStory.js"
import "vendor/GoogleAnalytics.js"

import "index.css"

let system = new System()

let mount = Preact.render(<View system={system}/>, document.body)

let loop = new Yaafloop((delta) => {
    system.update(delta)
    Preact.render(<View system={system}/>, document.body, mount)
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
