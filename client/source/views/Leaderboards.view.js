import Preact from "preact"

import "views/Leaderboards.view.less"

import Color from "utility/Color.js"

export default class Leaderboards extends Preact.Component {
    render() {
        if(this.props.game.hasStarted
        && this.props.game.experience.leaderboards.scores !== undefined
        && this.props.game.experience.leaderboards.scores.channel !== undefined
        && this.props.game.experience.leaderboards.scores.channel.highestScore > 15) {
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
                <div className="Leaderboards isHidden"/>
            )
        }
    }
    get subtotals() {
        if(this.props.game.experience.leaderboards.scores) {
            let scores = this.props.game.experience.leaderboards.scores
            return Object.keys(scores.channel.subtotals).map((score) => {
                return (
                    <div className="bar" style={{
                        "height": ((scores.channel.subtotals[score] / scores.channel.highestSubtotal) * 1.9) + 0.1 + "em",
                        "backgroundColor": score > this.props.game.experience.game.score ? "#FFF" : Color.generate(score)
                    }}/>
                )
            })
        }
    }
    get rank() {
        return (Math.round(this.props.game.experience.game.rank * 100) || 0) + "%"
    }
}
