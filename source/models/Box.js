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

// https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
function shadeColor2(color, percent) {
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1)
}

export default class Box {
    constructor(box) {
        this.vector = box.vector || "y"

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
        this.darkerColor = shadeColor2(this.color, -0.25)
        this.darkererColor = shadeColor2(this.color, -0.5)
        this.color = shadeColor2(this.color, -0.1)
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
