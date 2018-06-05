// TODO: Wrap the endpoint in a utility method
// TODO: Determine the stage for selecting endpoints
// TODO: Determine the channel for submitting to the endpoints
let ALPHA_ENDPOINT = "https://zwxr8sz8fj.execute-api.us-east-1.amazonaws.com/alpha/"
let SCORES_URI = ALPHA_ENDPOINT + "v1/{channelId}/scores"

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
        })
    }
    submitScore(score) {
        window.fetch(SCORES_URI.replace("{channelId}", this.channelId), {
            method: "POST",
            body: JSON.stringify({"score": score}),
        }).then((response) => {
            return response.json().then((scores) => {
                this.consume(scores)
            })
        })
    }
    consume(scores) {
        delete scores.channel.channelId
        delete scores.channel.createdAt

        scores.channel.total = Object.values(scores.channel.tally).reduce((a, b) => a + b)
        scores.channel.highestTally = Math.max(...Object.values(scores.channel.tally))
        scores.channel.highestScore = Math.max(...Object.keys(scores.channel.tally))

        let subtotal = 0
        scores.channel.subtotals = {}
        for(var i = scores.channel.highestScore; i >= 0; i -= 1) {
            subtotal += scores.channel.tally[i] || 0
            scores.channel.subtotals[i] = subtotal
        }

        scores.channel.highestSubtotal = Math.max(...Object.values(scores.channel.subtotals))

        this.scores = scores

        if(__STAGE__ === "DEVELOPMENT") {
            console.log(this.scores)
        }
    }
    getRank(score) {
        if(this.scores !== undefined) {
            let subtotal = this.scores.channel.subtotals[score] || 0
            return subtotal / this.scores.channel.total
            return subtotal + " of " + this.scores.channel.total
        }
    }
}
