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
