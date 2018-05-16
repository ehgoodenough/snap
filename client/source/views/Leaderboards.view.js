import Preact from "preact"

import "views/Leaderboards.view.less"

import Color from "utility/Color.js"
import Experience from "models/Experience.js"

export default class Leaderboards extends Preact.Component {
    render() {
        if(this.props.game.hasStarted) {
            return (
                <div className="Leaderboards">
                    <div className="bar-graph">
                        {this.subtotals}
                    </div>
                    <div className="rank">
                        <span>{this.rank}</span>
                    </div>
                </div>
            )
        } else {
            return (
                <div/>
            )
        }
    }
    get subtotals() {
        if(Experience.leaderboards.scores) {
            let scores = Experience.leaderboards.scores
            return Object.keys(scores.channel.subtotals).map((score) => {
                return (
                    <div className="bar" style={{
                        "height": ((scores.channel.subtotals[score] / scores.channel.highestSubtotal) * 2) + "em",
                        "backgroundColor": score > Experience.game.score ? "#FFF" : Color.generate(score)
                    }}/>
                )
            })
        }
    }
    get rank() {
        return Math.round(Experience.game.rank * 100) + "%"
    }
}
