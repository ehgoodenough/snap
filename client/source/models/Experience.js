import Game from "models/Game.js"

import Hubble from "utility/Hubble.js"
import Leaderboards from "utility/Leaderboards.js"

class Experience {
    constructor(experience) {
        this.authorization = experience.authorization

        this.game = new Game({
            "hasStarted": false,
            "experience": this
        })

        this.leaderboards = new Leaderboards({
            "authorization": experience.authorization
        })

        Hubble.submitEvent({
            "type": "start-of-experience",
            "authorization": this.authorization,
        })

        window.addEventListener("beforeunload", (event) => {
            Hubble.submitEvent({
                "type": "end-of-experience",
                "authorization": this.authorization,
            })
        })
    }
    startNewGame() {
        this.game = new Game({
            "hasStarted": true,
            "experience": this
        })
    }
    update(delta) {
        if(this.game instanceof Game) {
            this.game.update(delta)
        }
    }
}

export default Experience
