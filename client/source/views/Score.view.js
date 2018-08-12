import Preact from "preact"

import "views/Score.view.less"

export default class Score extends Preact.Component {
    render() {
        if(this.props.game.hasStarted) {
            return (
                <div className={this.className} key={this.props.game.key}>
                    {this.score}
                </div>
            )
        } else {
            return <div/>
        }
    }
    get className() {
        return `Score ${this.props.game.hasEnded ? "hasEnded" : ""}`
    }
    get score() {
        if(this.props.game.score) {
            return (
                <div className="score">
                    <h1>{this.props.game.score}</h1>
                    {/*<small>snaps</small>*/}
                </div>
            )
        } else {
            return (
                <div className="score"/>
            )
        }
    }
}
