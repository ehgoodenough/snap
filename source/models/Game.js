import Box from "models/Box.js"

export default class Game {
    constructor(game) {
        this.system = game.system

        this.score = 0
        this.camera = {pan: 0, zoom: 1}
        this.boxes = [
            new Box({
                game: this,
                position: {z: 25},
                size: {x: 200, y: 200, z: 25},
            }),
            new Box({
                game: this,
                color: "#888888",
                position: {z: 0},
                size: {x: 200, y: 200, z: 200},
                isStartingBlock: true
            }),
        ]
    }
    update(delta) {
        this.boxes.forEach((box) => {
            box.update(delta)
        })

        this.camera.pan = this.currentBox.position.z + (3*25)
    }
    end() {
        console.log("FREEZE, WAIT FOR INPUT, RESTART")
        this.system.startNewGame()
    }
    get currentBox() {
        return this.boxes[0]
    }
    get previousBox() {
        return this.boxes[1]
    }
}

// ...MVP...
// TODO: Allow the Game model for restarts.
// TODO: Render the score as a UI element.
// TODO: Add click listener as input.
// ...BALANCE...
// TODO: Tweak bounce point. Tweak snap point.
// TODO: Increase this.speed as this.position.z increases?
// TODO: Create a minimum delay between last box and next box to avoid accidental inputs.
// TODO: Re-introduce "perfect" snaps, where your box grows out a bit.
// TODO: Track the chains in the Game model.
/// ...CO-PLAY...
// TODO: Integrate with Gamesparks Leaderboards.
// TODO: Figure out how to center the view in the corner of the Twitch Extension.
// TODO: Add UI elements explaining what username is leaderboarding. Explain hwo to auth to use your real identity.
// TODO: Add UI elements when you beat your personal best highscore, stream highscore, all-time highscore.
// TODO: Zoom out when the game is over.
// ...TECH DEBT....
// TODO: Refactor 25 as a constant upwards unit.
// TODO: Rename the boxes into slabs, as per old codebase.
// TODO: Refactor the X and Z to be horizontal and Y to be vertical.
// TODO: Why are we offseting z/2 for the upwards transform, and not the others?
// TODO: Why is the x/y origin in the top left?
// TODO: Confirm that the camera is panning for any number of layers.
// TODO: Consider preact?
// ...DEPLOYMENT...
// TODO: Integrate this with a twitch extension.
// TODO: Get your twitch extension through review.
// TODO: Setup an infinite twitch stream.
// TODO: Put some sort of graphic on the twitch stream.
// ...SCOPE CREEP...
// Compare with your old jam version of Stack. Compare with the live official version of Stack.
// See other player's towers that are just a bit taller than you are now in the leaderboards. Render their name on the tower.
// See other live players who are playing right now, with some reasonable amount of lag. If they've auth'd, show their name and chat.
// See my friends who are playing right now. Make friends with other players who are playing right now.
// See my personal best tower while I'm playing.
// Return to see my highscore tower, and see who is passing it, so I can chat with them???
// Put cooler content the higher you go up, like getting-over-it-with-bennet-foddy
