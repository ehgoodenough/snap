import ShortID from "shortid"

import Input from "library/Input.js"
import Nimble from "library/Nimble"

import Slab from "models/Slab.js"

import analytics from "library/analytics.js"

export default class Game {
    constructor(game) {
        this.model = game.model
        this.key = ShortID.generate()

        this.score = 0
        this.combo = 0

        this.camera = {
            pan: 0,
            zoom: 1,
            speed: 2,
            tween: "ease",
        }

        this.slabs = [
            new Slab({
                game: this,
                position: {z: 1},
                size: {x: 8, y: 8, z: 1},
            }),
            new Slab({
                game: this,
                color: "#888888",
                position: {z: 0},
                size: {x: 8, y: 8, z: 16},
                isStartingBlock: true
            }),
        ]

        this.hasStarted = true
        this.hasEnded = false
        this.start()
    }
    start() {
        if(this.isDemoing === false) {
            analytics.reportStartGame()
        }
    }
    update(delta) {
        if(this.hasEnded === true) {
            if(Input.isJustDown(delta.ms)) {
                this.model.startNewGame()
            }
        }

        if(this.hasEnded === false) {
            this.slabs.forEach((slab) => {
                slab.update(delta)
            })
        }
    }
    end() {
        if(this.hasEnded != true) {
            // Game over!!
            this.hasEnded = true

            // Slowly pan the camera down the finished tower.
            this.camera.speed = this.currentSlab.position.z / 2
            this.camera.tween = "ease-out"
            this.camera.pan = 0

            if(this.isDemoing === false) {
                Nimble.sparks.submitLeaderboardEntry({
                    "activity": "SNAP",
                    "score": this.score,
                })

                analytics.reportEndGame()
            }

            if(this.isDemoing === true) {
                this.model.startNewGame()
            }
        }
    }
    get currentSlab() {
        return this.slabs[0]
    }
    get previousSlab() {
        return this.slabs[1]
    }
    get isDemoing() {
        return this.model.hasInteracted === false
    }
}
