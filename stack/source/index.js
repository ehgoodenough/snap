import React from "react"
import ReactDOM from "react-dom"
import Yaafloop from "yaafloop"
import Keyb from "keyb"

import View from "renders/View.js"

class Game {
    constructor() {
        this.camera = 0
        this.boxes = [
            new Box({width: 200, height: 200, depth: 25, z: 0}),
            new Box({width: 200, height: 200, depth: 25, z: 25, isLive: true}),
        ]
    }
    update(delta) {
        this.boxes.forEach((box) => {
            box.update(delta)
        })
    }
}

class Box {
    constructor(box) {
        this.width = box.width
        this.height = box.height
        this.depth = box.depth
        this.x = box.x || 0
        this.y = box.y || 0
        this.z = box.z || 0

        this.isLive = box.isLive
        this.speed = +5
    }
    update(delta) {
        if(this.isLive) {
            this.y += this.speed * delta.f

            if(this.speed > 0 && this.y > 300) {
                this.speed *= -1
            }
            if(this.speed < 0 && this.y < -300) {
                this.speed *= -1
            }
        }
    }
}

let game = new Game()
let view = ReactDOM.render(<View game={game}/>, frame)
let loop = new Yaafloop((delta) => {
    game.update(delta)
    view.forceUpdate()
})

// react css3d
// gameplay loop
// leaderboards
