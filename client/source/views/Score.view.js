import Preact from "preact"

import "views/Score.view.less"

export default class Score extends Preact.Component {
    render() {
        return (
            <div className="Score">
                <h1>{this.props.game.score}</h1>
                {this.rank}
            </div>
        )
    }
    get rank() {
        let rank = this.props.game.rank
        if(rank == undefined || rank > 0.95) {
            return (
                <div className="neglibile rank"/>
            )
        } else {
            return (
                <div className="rank">
                    <h3>{Math.round(rank * 100) + "%"}</h3>
                </div>
            )
        }
    }
}
