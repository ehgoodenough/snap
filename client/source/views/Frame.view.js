import Preact from "preact"

import "views/Frame.view.less"

export default function Frame(props) {
    return (
        <div className="Frame" id="frame">
            {props.children}
        </div>
    )
}
