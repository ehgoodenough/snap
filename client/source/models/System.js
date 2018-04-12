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

// On load, get the scores
// On end of game, submit a score, and get the latest scores back
// On retrieval of scores, find maximum score, and work backwards
    // Calculate running total of players who reached that score (adding up all following values)
    // Calculate total of all scores for a percentage.
    // Calculate the largest tally for the height of  graphing.
    // Calculate the last tally for the width of graphing.

let SCORES_URI = "https://zwxr8sz8fj.execute-api.us-east-1.amazonaws.com/alpha/v1/{channelId}/scores"
window.fetch(SCORES_URI.replace("{channelId}", 1234567890)).then((response) => response.json()).then((scores) => {
    console.log(scores)
})

// Refactor fetch calls into common library
// Wrap the URI in a utility method
// Determine the stage for selecting endpoints
