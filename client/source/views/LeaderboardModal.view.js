import Preact from "preact"

import "views/LeaderboardModal.view.less"

import Nimble from "library/Nimble"
import strings from "data/strings.js"

export default class LeaderboardModal extends Preact.Component {
    render() {
        if(this.props.model.game.hasEnded) {
            return (
                <div className="LeaderboardModal" onMouseDown={this.onMouseDown}>
                    <header>{strings.SCORES}</header>
                    <Nimble.views.Leaderboard activity="SNAP" scope={this.props.model.selectedLeaderboardScope} size="big"/>
                    <div className="scopes">
                        <div className="session scope" onMouseOver={this.onSelectScope("session")}>for session</div>
                        <div className="separator"/>
                        <div className="channel scope" onMouseOver={this.onSelectScope("channel")}>for channel</div>
                        <div className="separator"/>
                        <div className="global scope" onMouseOver={this.onSelectScope("global")}>for twitch</div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="LeaderboardModal isHidden"/>
            )
        }
    }
    onMouseDown(event) {
        event.stopPropagation()
    }
    onSelectScope(scope) {
        return (event) => {
            this.props.model.selectedLeaderboardScope = scope
        }
    }
}
