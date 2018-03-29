import React from "react"
import ReactDOM from "react-dom"
import Yaafloop from "yaafloop"
import Keyb from "keyb"

import View from "views/View.js"
import Game from "models/Game.js"

import "index.css"

let game = new Game()
let view = ReactDOM.render(<View game={game}/>, frame)
let loop = new Yaafloop((delta) => {
    game.update(delta)
    view.forceUpdate()
})
