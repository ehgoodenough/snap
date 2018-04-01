import Preact from "preact"

import "views/Frame.view.less"

export default function Frame(props) {
    return (
        <div id="frame">
            {props.children}
        </div>
    )
}
