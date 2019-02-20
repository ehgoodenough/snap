import Preact from "preact"

import Input from "library/Input.js"

import Score from "views/Score.view.js"
import Camera from "views/Camera.view.js"
import Version from "views/Version.view.js"
import Title from "views/Title.view.js"
import Prompt from "views/Prompt.view.js"
import CrossSlab from "views/CrossSlab.view.js"
import LeaderboardModal from "views/LeaderboardModal.view.js"

import "views/Game.view.less"

export default class Game {
    render() {
        return (
            <div className="Game"
                onMouseUp={this.onMouseUp}
                onMouseDown={this.onMouseDown}>
                <Version/>
                <Title model={this.props.model}/>
                <Prompt model={this.props.model}/>
                <Score model={this.props.model}/>
                <LeaderboardModal model={this.props.model}/>
                <Camera camera={this.props.model.game.camera} key={this.props.model.game.key}>
                    {this.props.model.game.slabs.map((slab, key) => (
                        <CrossSlab slab={slab} key={key}/>
                    ))}
                </Camera>
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
