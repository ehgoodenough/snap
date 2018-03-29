import React from "react"
import ReactDOM from "react-dom"
import Yaafloop from "yaafloop"
import Keyb from "keyb"

import View from "views/View.js"
import System from "models/System.js"

import "index.css"

let system = new System()
let view = ReactDOM.render(<View system={system}/>, frame)
let loop = new Yaafloop((delta) => {
    system.game.update(delta)
    view.forceUpdate()
})
