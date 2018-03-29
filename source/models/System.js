import Game from "models/Game.js"

export default class System {
    constructor() {
        this.startNewGame()
    }
    startNewGame() {
        this.game = new Game({
            "system": this
        })
    }
}
