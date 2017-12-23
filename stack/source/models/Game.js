import Box from "models/Box.js"

export default class Game {
    constructor() {
        this.score = 0
        this.camera = {pan: 0, zoom: 1}
        this.boxes = [
            new Box({
                width: 200, height: 200, depth: 25, z: 25, game: this
            }),
            new Box({
                width: 200, height: 200, depth: 200, z: 0, game: this, color: "#888"
            }),
        ]
    }
    update(delta) {
        this.boxes.forEach((box) => {
            box.update(delta)
        })

        this.camera.pan = this.topBox.position.z
    }
    get topBox() {
        return this.boxes[0]
    }
    get previousBox() {
        return this.boxes[1]
    }
}

// TODO: View.Box should have lighted sides.
// TODO: Refactor 25 as a constant upwards unit.
// TODO: Rename the boxes into slabs, as per old codebase.
// TODO: Refactor the Game model for restarts.
// TODO: Refactor the X and Z to be horizontal and Y to be vertical.
// TODO: Add click listener to the Slab for input.
// TODO: Track the chains in the Game model.
// TODO: Figure out how to center the view in the corner of the Twitch Extension.
// TODO: Integrate with Gamesparks Leaderboards.
// TODO: Why are we offseting z/2 for the upwards transform, and not the others?
// TODO: Why is the x/y origin in the top left?
// TODO: Confirm that the camera is panning for any number of layers.
