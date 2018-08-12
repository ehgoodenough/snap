import Game from "models/Game.js"

import Leaderboards from "utility/Leaderboards.js"

class Model {
    constructor(model) {
        this.game = new Game({
            "hasStarted": false,
            "model": this
        })

        this.selectedLeaderboardScope = "channel"

        // this.leaderboards = new Leaderboards({
        //     "authorization": model.authorization
        // })

        // Hubble.submitEvent({
        //     "type": "start-of-model",
        //     "authorization": this.authorization,
        // })
        //
        // window.addEventListener("beforeunload", (event) => {
        //     Hubble.submitEvent({
        //         "type": "end-of-model",
        //         "authorization": this.authorization,
        //     })
        // })
    }
    startNewGame() {
        this.game = new Game({
            "hasStarted": true,
            "model": this
        })
    }
    update(delta) {
        if(this.game instanceof Game) {
            this.game.update(delta)
        }
    }
}

export default Model
