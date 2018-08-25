import Game from "models/Game.js"

import Input from "library/Input.js"
import ScoreTally from "library/ScoreTally.js"

class Model {
    constructor(model) {

        this.selectedLeaderboardScope = "session"
        this.scoretally = new ScoreTally()

        this.hasInteracted = false
        this.startNewGame()
    }
    startNewGame() {
        this.game = new Game({
            "model": this
        })
    }
    update(delta) {
        if(this.game instanceof Game) {
            this.game.update(delta)
        }

        if(this.hasInteracted === false) {
            if(Input.isJustDown(delta.ms)) {
                this.hasInteracted = true
                this.startNewGame()
            }
        }
    }
}

export default Model
