import ShortID from "shortid"

import Input from "utility/Input.js"
import Slab from "models/Slab.js"

const Leaderboard = {
    "subtotals": {},
    "total": 0
}

export default class Game {
    constructor(game) {
        this.system = game.system
        this.key = ShortID.generate()

        this.score = 0
        this.camera = {pan: 0, zoom: 1}
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
                size: {x: 8, y: 8, z: 8},
                isStartingBlock: true
            }),
        ]

        // this.a = Leaderboard.subtotals[this.score] || 0
        // this.b = Leaderboard.total
    }
    update(delta) {
        if(this.hasEnded) {
            if(Input.isJustDown(delta.ms)) {
                this.system.startNewGame()
            }
        }

        this.slabs.forEach((slab) => {
            slab.update(delta)
        })
    }
    end() {
        // Game over!!
        this.hasEnded = true

        // Slowly pan the camera down the finished tower.
        this.camera.speed = this.currentSlab.position.z / 2
        this.camera.tween = "ease-out"
        this.camera.pan = 0

        // Leaderboard.total += 1
        // for(var i = 0; i <= this.score; i += 1) {
        //     Leaderboard.subtotals[i] = Leaderboard.subtotals[i] || 0
        //     Leaderboard.subtotals[i] += 1
        // }
    }
    get currentSlab() {
        return this.slabs[0]
    }
    get previousSlab() {
        return this.slabs[1]
    }
}

/// ...SERVER + UI...
// TODO: Add UI elements showing score milestones (25% of users reahced here)
// TODO: Add UI elements for uploading your twitch username to the leaderboard
// TODO: Title screen, sound button, leaderboards button
// ...DEPLOYMENT...
// TODO: Import Google Analytics and Full Story
// TODO: Test within twitch extension (double-clicks)
// TODO: Add configure page for streamer (leaderboard, nuke leaderboard, thank you for downloading)
// TODO: Setup an infinite twitch stream.
// TODO: Get your twitch extension through review.
// ...POLISH...
// TODO: Re-introduce "perfect" snaps, where your slab grows out a bit.
// TODO: Add sound effects for consecutive perfect snaps
// ...LOOK AND FEEL...
// TODO: Add particile effect for consecutive snaps
// TODO: Add stars that fade in and out around the background?
// TODO: Fade out the bottom of the starting block?

// GET/POST /v1/scores
// {
//     "total": "0", // ???
//     "tally": {
//         "3": 1000,
//         "4": 2000,
//     }
// }
// On load, get the scores
// On end of game, submit a score, and get the latest scores back
// On retrieval of scores, find maximum score, and work backwards
// Calculate running total of players who reached that score
