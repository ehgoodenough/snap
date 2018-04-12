// TODO: Wrap the endpoint in a utility method
// TODO: Determine the stage for selecting endpoints
// TODO: Determine the channel for submitting to the endpoints
let SCORES_URI = "https://zwxr8sz8fj.execute-api.us-east-1.amazonaws.com/alpha/v1/{channelId}/scores"

export default class Leaderboards {
    constructor(leaderboards) {
        this.channelId = leaderboards.channelId

        this.retrieveScores()
    }
    retrieveScores() {
        window.fetch(SCORES_URI.replace("{channelId}", this.channelId), {
            method: "GET"
        }).then((response) => {
            return response.json().then((scores) => {
                this.consume(scores)
            })
        }).catch((error) => {
            console.log(error)
        })
    }
    submitScore(score) {
        console.log("Submitting score...", score)
        window.fetch(SCORES_URI.replace("{channelId}", this.channelId), {
            method: "POST",
            body: JSON.stringify({"score": score}),
        }).then((response) => {
            return response.json().then((scores) => {
                this.consume(scores)
            })
        }).catch((error) => {
            console.log(error)
        })
    }
    consume(scores) {
        this.scores = scores

        this.scores.channel.tally
        
        // On retrieval of scores, find maximum score, and work backwards
        // - Calculate running total of players who reached that score (adding up all following values)
        // - Calculate total of all scores for a percentage.
        // - Calculate the largest tally for the height of  graphing.
        // - Calculate the last tally for the width of graphing.
    }
}
