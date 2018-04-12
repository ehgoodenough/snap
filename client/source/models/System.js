import Game from "models/Game.js"
import Leaderboards from "utility/Leaderboards.js"

export default class System {
    constructor() {
        this.startNewGame()

        this.leaderboards = new Leaderboards({
            "channelId": "1234567890"
        })
    }
    startNewGame() {
        this.game = new Game({
            "system": this
        })
    }
}
