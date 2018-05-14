import ShortID from "shortid"

import Input from "utility/Input.js"
import Slab from "models/Slab.js"

export default class Game {
    constructor(game) {
        this.system = game.system
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
                size: {x: 8, y: 8, z: 8},
                isStartingBlock: true
            }),
        ]

        this.hasStarted = game.hasStarted || false
        this.hasEnded = false
    }
    update(delta) {
        if(this.hasStarted === false) {
            if(Input.isJustDown(delta.ms)) {
                this.hasStarted = true
            }
            return
        }

        if(this.hasEnded === true) {
            if(Input.isJustDown(delta.ms)) {
                this.system.leaderboards.submitScore(this.score)
                this.system.startNewGame()
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
    end() {
        if(this.hasEnded != true) {
            // Game over!!
            this.hasEnded = true

            // Slowly pan the camera down the finished tower.
            this.camera.speed = this.currentSlab.position.z / 2
            this.camera.tween = "ease-out"
            this.camera.pan = 0
        }
    }
    get currentSlab() {
        return this.slabs[0]
    }
    get previousSlab() {
        return this.slabs[1]
    }
    get rank() {
        return this.system.leaderboards.getRank(this.score)
    }
}

// TODO: Make the game less forgiving with the snaps.
// TODO: Make the game change it's pace as the game goes on.
// TODO: Show the highest scoring players in the background on the stream.
// TODO: Add personal high-sceores (requires you played once)
// TODO: Add high-scores (requires username to be given)
// TODO: Localize the strings.
// TODO: Make it playable on desktop screen and mobile screen. <perspective in em not in px>
// TODO: Add configure page for streamer (leaderboard, nuke leaderboard, thank you for downloading).
// TODO: Render a graph in the corner that displays the funnel of tally-over-scores.
// TODO: Add particile effect for consecutive snaps
// TODO: Add sound effects for consecutive perfect snaps
// TODO: Mute sound button
// TODO: Debug the analytics; it looks like they bugged out in production?
// TODO: Let players pay bits to buy special skins.
