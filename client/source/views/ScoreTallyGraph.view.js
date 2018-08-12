import Preact from "preact"

import "views/ScoreTallyGraph.view.less"

import Color from "utility/Color.js"

export default class ScoreTallyGraph extends Preact.Component {
    render() {
        if(this.props.model.game.hasStarted
        && this.props.model.scoretally.scores !== undefined
        && this.props.model.scoretally.scores.channel !== undefined
        && this.props.model.scoretally.scores.channel.highestScore > 15) {
            return (
                <div className={this.className}>
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
                <div className="ScoreTallyGraph hasntStarted"/>
            )
        }
    }
    get className() {
        return `ScoreTallyGraph ${this.props.model.game.hasEnded ? "hasEnded" : ""}`
    }
    get subtotals() {
        if(this.props.model.scoretally.scores) {
            let scores = this.props.model.scoretally.scores
            return Object.keys(scores.channel.subtotals).map((score) => {
                return (
                    <div className="bar" style={{
                        "height": ((scores.channel.subtotals[score] / scores.channel.highestSubtotal) * 1.9) + 0.1 + "em",
                        "backgroundColor": score > this.props.model.game.score ? "#FFF" : Color.generate(score)
                    }}/>
                )
            })
        }
    }
    get rank() {
        return (Math.round(this.props.model.scoretally.rank * 100) || 0) + "%"
    }
}
