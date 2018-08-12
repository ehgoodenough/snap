import Preact from "preact"

import "views/LeaderboardModal.view.less"

import Nimble from "library/Nimble"
import Color from "utility/Color.js"

export default class LeaderboardModal extends Preact.Component {
    render() {
        if(this.props.model.game.hasEnded) {
            return (
                <div className="LeaderboardModal">
                    <header>High Scores</header>
                    <Nimble.views.Leaderboard activity="SNAP" scope={this.props.model.selectedLeaderboardScope} size="big"/>
                    <div className="scopes">
                        {/*<div className="today scope" onMouseOver={this.onSelectScope("today")}>today</div>
                        <div className="separator"/>*/}
                        <div className="channel scope" onMouseOver={this.onSelectScope("channel")}>for {Nimble.twitch.streamer.name}</div>
                        <div className="separator"/>
                        <div className="global scope" onMouseOver={this.onSelectScope("global")}>for all of twitch</div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="LeaderboardModal isHidden"/>
            )
        }
    }
    onSelectScope(scope) {
        return (event) => {
            this.props.model.selectedLeaderboardScope = scope
        }
    }
}
