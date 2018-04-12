import Game from "models/Game.js"
import Leaderboards from "utility/Leaderboards.js"

export default class System {
    constructor() {
        this.game = new Game({
            "hasStarted": false,
            "system": this
        })

        this.leaderboards = new Leaderboards({
            "channelId": "1234567890"
        })
    }
    startNewGame() {
        this.game = new Game({
            "hasStarted": true,
            "system": this
        })
    }
    update(delta) {
        if(this.game instanceof Game) {
            this.game.update(delta)
        }
    }
}
