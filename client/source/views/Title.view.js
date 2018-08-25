import Preact from "preact"

import "views/Title.view.less"

export default class Title {
    render() {
        return (
            <div className="Title" style={this.style}>
                <h1>SNAP</h1>
            </div>
        )
    }
    get style() {
        return {
            "opacity": this.props.model.hasInteracted ? 0 : 1
        }
    }
}
