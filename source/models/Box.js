import Keyb from "keyb"

const BOUNCE_POINT = 300
const SNAP_POINT = 10

import Color from "utility/Color.js"

export default class Box {
    constructor(box) {
        box.size.x = box.size.x || 0
        box.size.y = box.size.y || 0
        box.size.z = box.size.z || 0
        box.position.x = box.position.x || 0
        box.position.y = box.position.y || 0
        box.position.z = box.position.z || 0
        box.color = box.color || Color.generate(box.position.z)
        box.axis = box.axis || "y"
        box.speed = box.speed || +5

        this.game = box.game

        this.size = box.size
        this.position = box.position

        this.color = Color.shade(box.color, -0.1)
        this.darkerColor = Color.shade(box.color, -0.25)
        this.darkererColor = Color.shade(box.color, -0.5)

        this.axis = box.axis
        this.speed = box.speed
    }
    update(delta) {
        if(this === this.game.currentBox) {

            // Alias the axis, since
            // we'll be using it a lot.
            let axis = this.axis

            // Translating the box along it's axis.
            this.position[axis] += this.speed * delta.f

            // Bouncing the box at it's farthest points.
            if(this.speed > 0 && this.position[axis] > +BOUNCE_POINT) {
                this.position[axis] = +BOUNCE_POINT
                this.speed *= -1
            }
            if(this.speed < 0 && this.position[axis] < -BOUNCE_POINT) {
                this.position[axis] = -BOUNCE_POINT
                this.speed *= -1
            }

            // Listening for player input.
            if(Keyb.isJustDown("<space>")) {
                // If the current box is close enough to the previous box, snap it on top of it.
                if(Math.abs(this.game.previousBox.position[axis] - this.position[axis]) < SNAP_POINT) {
                    this.position[axis] = this.game.previousBox.position[axis]
                }

                // Shrink the current box if it isn't perfectly covering the previous box.
                let difference = this.game.previousBox.position[axis] - this.position[axis]
                if(difference > 0) {
                    this.size[axis] -= difference
                    this.position[axis] += difference
                }
                if(difference < 0) {
                    this.size[axis] += difference
                }

                // Check if this has
                // broken the box.
                if(this.size[axis] < 0) {
                    this.size[axis] = 0
                    this.isBroken = true

                    // End the game.
                    this.game.end()
                    return
                }

                // Create a new boxs, and put it
                // at the top of the stack of boxes!
                this.game.boxes.unshift(new Box({
                    "size": {
                        "x": this.size.x,
                        "y": this.size.y,
                        "z": this.size.z,
                    },
                    "position": {
                        "x": this.position.x,
                        "y": this.position.y,
                        "z": this.position.z + 25,
                    },
                    "game": this.game,
                    "speed": this.speed,
                    "axis": axis == "x" ? "y" : "x"
                }))
            }
        }
    }
}
