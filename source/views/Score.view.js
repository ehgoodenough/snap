import Preact from "preact"

import "views/Score.view.less"

export default function Score(props) {
    return (
        <div className="Score">
            <h1>{props.score}</h1>
        </div>
    )
}
