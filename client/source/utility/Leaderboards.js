const ALPHA_ENDPOINT = "https://zwxr8sz8fj.execute-api.us-east-1.amazonaws.com/alpha"
const GAMMA_ENDPOINT = "https://rrna8vhqof.execute-api.us-east-1.amazonaws.com/gamma"
const SCORES_URI = GAMMA_ENDPOINT + "/v1/{channelId}/scores"

export default class Leaderboards {
    constructor(leaderboards) {
        this.authorization = leaderboards.authorization

        this.retrieveScores()
    }
    retrieveScores() {
        window.fetch(SCORES_URI.replace("{channelId}", this.authorization.channelId), {
            "method": "GET",
            "headers": {
                "Authorization": this.authorization.token
            }
        }).then((response) => {
            return response.json().then((scores) => {
                this.consume(scores)
            })
        })
    }
    submitScore(score) {
        window.fetch(SCORES_URI.replace("{channelId}", this.authorization.channelId), {
            "method": "POST",
            "headers": {
                "Authorization": this.authorization.token
            },
            "body": JSON.stringify({
                "score": score
            }),
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
        console.log(scores)
    }
    getRank(score) {
        if(this.scores !== undefined) {
            let subtotal = this.scores.channel.subtotals[score] || 0
            return subtotal / this.scores.channel.total
            return subtotal + " of " + this.scores.channel.total
        }
    }
}
