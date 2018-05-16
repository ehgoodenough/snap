import Preact from "preact"

import "views/Score.view.less"

export default class Score extends Preact.Component {
    render() {
        if(this.props.game.hasStarted) {
            return (
                <div className="Score">
                    {this.score}
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
                    <small>snaps</small>
                </div>
            )
        } else {
            return (
                <div className="score"/>
            )
        }
    }
}
