import Preact from "preact"

import "views/LeaderboardModal.view.less"

import Nimble from "library/Nimble"
import Color from "utility/Color.js"

export default class LeaderboardModal extends Preact.Component {
    render() {
        return (
            <div className="LeaderboardModal">
                <header>Scores</header>
                <Nimble.views.Leaderboard activity="SNAP" scope="channel" size="big"/>
            </div>
        )
        // if(this.props.game.hasStarted
        // && this.props.game.experience.leaderboards.scores !== undefined
        // && this.props.game.experience.leaderboards.scores.channel !== undefined
        // && this.props.game.experience.leaderboards.scores.channel.highestScore > 15) {
        //     return (
        //         <div className="Leaderboards">
        //             <div className="bar-graph">
        //                 {this.subtotals}
        //             </div>
        //             <div className="rank">
        //                 <span>{this.rank}</span>
        //             </div>
        //         </div>
        //     )
        // } else {
        //     return (
        //         <div className="Leaderboards isHidden"/>
        //     )
        // }
    }
}
