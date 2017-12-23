import Keyb from "keyb"

const BOUNCE_POINT = 300
const SNAP_POINT = 10
const COLOR_GRADIENT = 7

import Colors from "data/Colors.js"
import LeftPad from "left-pad"
function generateColor(z) {
    z /= 25 // !!!!!!?? :<

    var p = z % COLOR_GRADIENT / COLOR_GRADIENT
    var w = p * 2 - 1
    var w1 = (w / 1  + 1) / 2
    var w2 = 1 - w1

    var color1 = Colors[(Math.floor(z / COLOR_GRADIENT) + 1) % Colors.length]
    var color2 = Colors[(Math.floor(z / COLOR_GRADIENT)) % Colors.length]

    return "#" + [
        LeftPad(Math.round((color1[0] * w1) + (color2[0] * w2)).toString(16), 2, 0),
        LeftPad(Math.round((color1[1] * w1) + (color2[1] * w2)).toString(16), 2, 0),
        LeftPad(Math.round((color1[2] * w1) + (color2[2] * w2)).toString(16), 2, 0),
    ].join("")
}

export default class Box {
    constructor(box) {
        this.size = {
            x: box.width || 0,
            y: box.height || 0,
            z: box.depth || 0,
        }
        this.position = {
            x: box.x || 0,
            y: box.y || 0,
            z: box.z || 0,
        }

        this.speed = box.speed || +5

        this.game = box.game

        this.color = box.color || generateColor(this.position.z)
        this.vector = box.vector || "y"
    }
    update(delta) {
        if(this.game.topBox === this) {

            let v = this.vector

            this.position[v] += this.speed * delta.f

            if(this.speed > 0 && this.position[v] > +BOUNCE_POINT) {
                this.position[v] = +BOUNCE_POINT
                this.speed *= -1
            }
            if(this.speed < 0 && this.position[v] < -BOUNCE_POINT) {
                this.position[v] = -BOUNCE_POINT
                this.speed *= -1
            }

            if(Keyb.isJustDown("<space>")) {
                if(Math.abs(this.game.previousBox.position[v] - this.position[v]) < SNAP_POINT) {
                    this.position[v] = this.game.previousBox.position[v]
                }

                let difference = this.game.previousBox.position[v] - this.position[v]
                if(difference > 0) {
                    this.size[v] -= difference
                    this.position[v] += difference
                }
                if(difference < 0) {
                    this.size[v] += difference
                }

                if(this.size[v] < 0) {
                    this.size[v] = 0
                    this.isBroken = true
                }

                if(this.isBroken != true) {
                    this.game.boxes.unshift(new Box({
                        width: this.size.x,
                        height: this.size.y,
                        depth: this.size.z,
                        x: this.position.x,
                        y: this.position.y,
                        z: this.position.z + 25,
                        game: this.game,
                        speed: this.speed,
                        vector: v == "y" ? "x" : "y"
                    }))
                }
            }
        }
    }
}
