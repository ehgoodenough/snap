import Game from "models/Game.js"
import Leaderboards from "utility/Leaderboards.js"

class Experience {
    constructor(experience) {
        this.game = new Game({
            "hasStarted": false,
            "experience": this
        })

        this.leaderboards = new Leaderboards({
            "authorization": experience.authorization
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
