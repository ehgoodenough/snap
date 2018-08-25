import Preact from "preact"

import "views/Prompt.view.less"

export default class Prompt {
    render() {
        return (
            <div className={this.classNames}>
                <span>{this.message}</span>
                <small>{"Click to snap"}</small>
            </div>
        )
    }
    get message() {
        if(this.props.model.hasInteracted != true) {
            return "Play Now!!"
        }
        if(this.props.model.game.hasEnded == true) {
            return "Play again?"
        }
    }
    get classNames() {
        return [
            "Prompt",
            this.props.model.hasInteracted != true ? "hasNotStarted" : "",
            this.props.model.game.hasEnded == true ? "hasEnded" : ""
        ].join(" ")
    }
}
