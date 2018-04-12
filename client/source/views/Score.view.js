import Preact from "preact"

import "views/Score.view.less"

export default function Score(props) {
    return (
        <div className="Score">
            <h1>{props.game.score}</h1>
            <h3>{props.game.system.leaderboards.getRank(props.game.score)}</h3>
        </div>
    )
}
