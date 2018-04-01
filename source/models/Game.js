import ShortID from "shortid"

import Slab from "models/Slab.js"

const CAMERA_OFFSET = 2.5

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
    }
    update(delta) {
        this.slabs.forEach((slab) => {
            slab.update(delta)
        })

        this.camera.pan = this.currentSlab.position.z + CAMERA_OFFSET
    }
    end() {
        console.log("FREEZE, WAIT FOR INPUT, RESTART")
        this.system.startNewGame()
    }
    get currentSlab() {
        return this.slabs[0]
    }
    get previousSlab() {
        return this.slabs[1]
    }
}

// ...BALANCE...
// TODO: Tweak bounce point. Tweak snap point.
// TODO: Increase this.speed as this.position.z increases?
// TODO: Create a minimum delay between last slab and next slab to avoid accidental inputs.
// TODO: Re-introduce "perfect" snaps, where your slab grows out a bit.
// ...LOOK AND FEEL...
// TODO: Add a gradient up the background of the game
// TODO: Add sound effects for block-on-block or consecutive snaps
// TODO: Add particile effect for consecutive snaps
// ...DEPLOYMENT...
// TODO: Integrate this with a twitch extension.
// TODO: Get your twitch extension through review.
// TODO: Setup an infinite twitch stream.
// TODO: Put some sort of graphic on the twitch stream.
// TODO: Import Google Analytics and Full Story
/// ...CO-PLAY...
// TODO: Get a leaderboard.
// TODO: Add UI elements explaining what username is leaderboarding. Explain hwo to auth to use your real identity.
// TODO: Add UI elements when you beat your personal best highscore, stream highscore, all-time highscore.
// TODO: Zoom out when the game is over.
// ...TECH DEBT....
// TODO: Refactor the X and Z to be horizontal and Y to be vertical.
// TODO: Why are we offseting z/2 for the upwards transform, and not the others?
// TODO: Why is the x/y origin in the top left?
// TODO: Confirm that the camera is panning for any number of layers.
// ...SCOPE CREEP...
// Compare with your old jam version of Stack. Compare with the live official version of Stack.
// See other player's towers that are just a bit taller than you are now in the leaderboards. Render their name on the tower.
// See other live players who are playing right now, with some reasonable amount of lag. If they've auth'd, show their name and chat.
// See my friends who are playing right now. Make friends with other players who are playing right now.
// See my personal best tower while I'm playing.
// Return to see my highscore tower, and see who is passing it, so I can chat with them???
// Put cooler content the higher you go up, like getting-over-it-with-bennet-foddy
