import Preact from "preact"
import QueryString from "query-string"

import Input from "utility/Input.js"
import Nimble from "library/Nimble"

import Slab from "views/Slab.view.js"
import Score from "views/Score.view.js"
import Frame from "views/Frame.view.js"
import Camera from "views/Camera.view.js"
import Version from "views/Version.view.js"
import Title from "views/Title.view.js"
import Prompt from "views/Prompt.view.js"
import Leaderboards from "views/Leaderboards.view.js"
import LeaderboardModal from "views/LeaderboardModal.view.js"

import "views/View.less"

let query = QueryString.parse(window.location.search)

export default class View {
    render() {
        return (
            <div id="view"
                onMouseUp={this.onMouseUp}
                onMouseDown={this.onMouseDown}
                className={`mounted-as-${Nimble.twitch.extension.mount}`}>
                <Frame>
                    <div className="Game">
                        <Version/>
                        <Title game={this.props.experience.game}/>
                        <Prompt game={this.props.experience.game}/>
                        <Score game={this.props.experience.game}/>
                        <LeaderboardModal game={this.props.experience.game}/>
                        {/*<Leaderboards game={this.props.experience.game}/>*/}
                        <Camera camera={this.props.experience.game.camera} key={this.props.experience.game.key}>
                            {this.props.experience.game.slabs.map((slab, key) => (
                                <Slab slab={slab} key={key}/>
                            ))}
                        </Camera>
                    </div>
                </Frame>
            </div>
        )
    }
    onMouseDown() {
        Input.onDown()
    }
    onMouseUp() {
        Input.onUp()
    }
}
