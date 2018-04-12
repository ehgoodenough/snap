import Preact from "preact"

import "views/ReplayPrompt.view.less"

export default class ReplayPrompt {
    render() {
        return (
            <div className={this.classNames}>
                <span>Play again?</span>
                <small>Tap or spacebar</small>
            </div>
        )
    }
    get classNames() {
        return [
            "ReplayPrompt",
            this.props.game.hasEnded ? "isRendered" : ""
        ].join(" ")
    }
}
