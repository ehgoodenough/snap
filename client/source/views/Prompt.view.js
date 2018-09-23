import Preact from "preact"

import "views/Prompt.view.less"
import strings from "data/strings.js"

export default class Prompt {
    render() {
        return (
            <div className={this.classNames}>
                <span>{this.message}</span>
                <small>{this.submessage}</small>
            </div>
        )
    }
    get message() {
        if(this.props.model.hasInteracted != true) {
            return strings.PLAY_PROMPT
        }
        if(this.props.model.game.hasEnded == true) {
            return strings.PLAY_AGAIN_PROMPT
        }
    }
    get submessage() {
        return strings.CLICK_TO_SNAP
    }
    get classNames() {
        return [
            "Prompt",
            this.props.model.hasInteracted != true ? "hasNotStarted" : "",
            this.props.model.game.hasEnded == true ? "hasEnded" : ""
        ].join(" ")
    }
}
