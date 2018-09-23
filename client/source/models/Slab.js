import Input from "library/Input.js"
import colors from "data/colors.js"

const BOUNCE_POINT = 10
const DEFAULT_SNAP_POINT = 0.25 // 0.33
const SNAP_POINTS = {"1": 10, "2": 2, "3": 1}
const COMBO_POINT = 4
const DEFAULT_SIZE = 8
const DEFAULT_SPEED = +0.33
const DEMO_SPEED = +0.44 //+0.22
const CAMERA_CULL_POINT = 20
const GOOD_ENOUGH = {DELTA: -1}

export default class Slab {
    constructor(slab) {
        slab.size.x = slab.size.x || 0
        slab.size.y = slab.size.y || 0
        slab.size.z = slab.size.z || 0
        slab.position.x = slab.position.x || 0
        slab.position.y = slab.position.y || 0
        slab.position.z = slab.position.z || 0
        slab.color = slab.color || colors.generate(slab.position.z)
        slab.axis = slab.axis || "y"
        slab.speed = slab.speed || DEFAULT_SPEED

        this.game = slab.game

        this.size = slab.size
        this.position = slab.position

        this.color = colors.shade(slab.color, -0.1)
        this.darkerColor = colors.shade(slab.color, -0.25)
        this.darkererColor = colors.shade(slab.color, -0.5)

        this.axis = slab.axis
        this.speed = slab.speed

        if(this.game.isDemoing) {
            this.speed = DEMO_SPEED
        }
    }
    get isGoodEnough() {
        return this.game.score >= 20
            || this.position[this.axis] - this.game.previousSlab.position[this.axis] > GOOD_ENOUGH.DELTA
    }
    update(delta) {
        if(this === this.game.currentSlab) {

            // Alias the axis, since
            // we'll be using it a lot.
            let axis = this.axis

            // Translating the slab along it's axis.
            this.position[axis] += this.speed * delta.f

            // Bouncing the slab at it's farthest points.
            if(this.speed > 0 && this.position[axis] > +BOUNCE_POINT) {
                this.position[axis] = +BOUNCE_POINT
                this.speed *= -1
            }
            if(this.speed < 0 && this.position[axis] < -BOUNCE_POINT) {
                this.position[axis] = -BOUNCE_POINT
                this.speed *= -1
            }

            // Listening for player input.
            if(Input.isJustDown(delta.ms) || (this.game.isDemoing && this.isGoodEnough)) {
                // If the current slab is almost on top of the previous slab, snap it on top of it.
                let snapPoint = SNAP_POINTS[this.position.z] || DEFAULT_SNAP_POINT
                if(Math.abs(this.position[axis] - this.game.previousSlab.position[axis]) < snapPoint) {
                    this.position[axis] = this.game.previousSlab.position[axis]

                    this.game.combo += 1
                } else {
                    this.game.combo = 0
                }

                // Shrink the current slab if it isn't perfectly covering the previous slab.
                let difference = this.game.previousSlab.position[axis] - this.position[axis]
                if(difference > 0) {
                    this.size[axis] -= difference
                    this.position[axis] += difference
                }
                if(difference < 0) {
                    this.size[axis] += difference
                }

                // Check if this has
                // broken the slab.
                if(this.size[axis] < 0) {
                    this.size[axis] = 0
                    this.isBroken = true

                    // End the game.
                    this.game.end()
                    return
                }

                if(this.game.combo >= COMBO_POINT) {
                    if(this.size[axis] < DEFAULT_SIZE) {
                        this.size[axis] += 1
                        if(this.size[axis] > DEFAULT_SIZE) {
                            this.size[axis] = DEFAULT_SIZE
                        }
                        this.position[axis] -= 1
                        if(this.position[axis] < 0) {
                            this.position[axis] = 0
                        }
                    } else if(this.size[not(axis)] < DEFAULT_SIZE) {
                        this.size[not(axis)] += 1
                        if(this.size[not(axis)] > DEFAULT_SIZE) {
                            this.size[not(axis)] = DEFAULT_SIZE
                        }
                        this.position[not(axis)] -= 1
                        if(this.position[not(axis)] < 0) {
                            this.position[not(axis)] = 0
                        }
                    }
                }

                // Create a new slab, and put it
                // at the top of the stack of slabs!
                this.game.slabs.unshift(new Slab({
                    "game": this.game,
                    "size": {
                        "x": this.size.x,
                        "y": this.size.y,
                        "z": this.size.z,
                    },
                    "position": {
                        "x": this.axis != "x" ? -BOUNCE_POINT : this.position.x,
                        "y": this.axis != "y" ? -BOUNCE_POINT : this.position.y,
                        "z": this.position.z + 1,
                    },
                    "speed": this.speed,
                    "axis": not(this.axis)
                }))

                // Pan the camera.
                if(this.game.isDemoing === false) {
                    this.game.camera.pan = this.position.z
                }

                // Bump the score.
                this.game.score += 1

                // Bump the delta for the demo.
                GOOD_ENOUGH.DELTA = (Math.random() + 0.5) * (Math.random() < 0.75 ? -1 : +1)
            }
        }
    }
    get isOnCamera() {
        return this.game.camera.pan - this.position.z < CAMERA_CULL_POINT
    }
}

function not(axis) {
    return axis == "x" ? "y" : "x"
}
