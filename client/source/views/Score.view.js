import Preact from "preact"

import "views/Score.view.less"

export default function Score(props) {
    return (
        <div className="Score">
            <h1>{props.game.score}</h1>
            <h3>{props.game.a || 0} of {props.game.b || 0}</h3>
        </div>
    )
}
