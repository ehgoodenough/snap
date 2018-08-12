import ShortID from "shortid"

import Input from "utility/Input.js"
import Nimble from "library/Nimble"

import Slab from "models/Slab.js"

export default class Game {
    constructor(game) {
        this.experience = game.experience
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

        this.hasEnded = false
        this.hasStarted = false

        if(game.hasStarted === true) {
            this.start()
        }
    }
    update(delta) {
        if(this.hasStarted === false) {
            if(Input.isJustDown(delta.ms)) {
                this.start()
            }
            return
        }

        if(this.hasEnded === true) {
            if(Input.isJustDown(delta.ms)) {
                this.experience.startNewGame()
            }
            return
        }

        if(this.hasStarted === true
        && this.hasEnded === false) {
            this.slabs.forEach((slab) => {
                slab.update(delta)
            })
            return
        }
    }
    start() {
        if(this.hasStarted != true) {
            this.hasStarted = true
            // Hubble.submitEvent({
            //     "type": "start-of-game",
            //     "authorization": this.experience.authorization,
            // })
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
            
            Nimble.sparks.submitLeaderboardEntry({
                "activity": "SNAP",
                "score": this.score,
            })

            // Hubble.submitEvent({
            //     "type": "end-of-game",
            //     "authorization": this.experience.authorization,
            // })
        }
    }
    get currentSlab() {
        return this.slabs[0]
    }
    get previousSlab() {
        return this.slabs[1]
    }
    get rank() {
        return this.experience.leaderboards.getRank(this.score)
    }
}
