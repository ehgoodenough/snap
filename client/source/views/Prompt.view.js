import Preact from "preact"

import "views/Prompt.view.less"

export default class Prompt {
    render() {
        return (
            <div className={this.classNames}>
                <span>{this.message}</span>
                <small>Tap on the stream</small>
            </div>
        )
    }
    get message() {
        if(this.props.game.hasStarted != true) {
            return "Play Now!!"
        }
        if(this.props.game.hasEnded == true) {
            return "Play again?"
        }
    }
    get classNames() {
        return [
            "Prompt",
            this.props.game.hasStarted != true ? "hasNotStarted" : "",
            this.props.game.hasEnded == true ? "hasEnded" : ""
        ].join(" ")
    }
}
