import Preact from "preact"

import "views/Score.view.less"

export default class Score extends Preact.Component {
    render() {
        if(this.props.game.hasStarted) {
            return (
                <div className="Score">
                    {this.score}
                    {this.rank}
                </div>
            )
        } else {
            return <div/>
        }
    }
    get score() {
        if(this.props.game.score) {
            return (
                <div className="score">
                    <h1>{this.props.game.score}</h1>
                </div>
            )
        } else {
            return (
                <div className="score"/>
            )
        }
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
