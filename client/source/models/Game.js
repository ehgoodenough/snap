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
    }
    update(delta) {
        if(this.hasEnded) {
            if(Input.isJustDown(delta.ms)) {
                this.system.leaderboards.submitScore(this.score)
                this.system.startNewGame()
            }
        }

        this.slabs.forEach((slab) => {
            slab.update(delta)
        })
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

// ...POLISH...
// TODO: Restart prompts
// TODO: Title screen
// TODO: Mute sound button
// TODO: Version number in corner
// TODO: Add sound effects for consecutive perfect snaps
// TODO: Add particile effect for consecutive snaps
// TODO: Add personal high-sceores (requires you played once)
// TODO: Add high-scores (requires username to be given)
// ...DEPLOYMENT...
// TODO: Import Google Analytics and Full Story
// TODO: Test within twitch extension (double-clicks)
// TODO: Setup an infinite twitch stream.
// TODO: Get your twitch extension through review.
// ...NEXT TIME...
// TODO: Localize the strings.
// TODO: Make it playable on desktop screen and mobile screen.
// TODO: Add configure page for streamer (leaderboard, nuke leaderboard, thank you for downloading).
// TODO: Render a graph in the corner that displays the funnel of tally-over-scores.
