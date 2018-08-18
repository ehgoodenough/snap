import Preact from "preact"
import QueryString from "query-string"

import Nimble from "library/Nimble"

import "views/Mount.view.less"
import Game from "views/Game.view.js"
import Config from "views/Config.view.js"

let query = QueryString.parse(window.location.search)

export default class Mount {
    render() {
        return (
            <div className="Mount" id={`mounted-as-${Nimble.twitch.extension.mount}`}>
                <div className="View">
                    {this.view}
                </div>
            </div>
        )
    }
    get view() {
        if(Nimble.twitch.extension.mount === "config") {
            return (
                <Config model={this.props.model}/>
            )
        }

        return (
            <Game model={this.props.model}/>
        )
    }
}
