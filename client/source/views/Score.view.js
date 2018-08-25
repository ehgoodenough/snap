import Preact from "preact"

import "views/Score.view.less"

export default class Score extends Preact.Component {
    render() {
        if(this.props.model.hasInteracted) {
            return (
                <div className={this.className} key={this.props.model.game.key}>
                    {this.score}
                </div>
            )
        } else {
            return <div/>
        }
    }
    get className() {
        return `Score ${this.props.model.game.hasEnded ? "hasEnded" : ""}`
    }
    get score() {
        if(this.props.model.game.score) {
            return (
                <div className="score">
                    <h1>{this.props.model.game.score}</h1>
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
