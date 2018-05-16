import Preact from "preact"

import Experience from "models/Experience.js"

import Slab from "views/Slab.view.js"
import Score from "views/Score.view.js"
import Frame from "views/Frame.view.js"
import Camera from "views/Camera.view.js"
import Version from "views/Version.view.js"
import Title from "views/Title.view.js"
import Leaderboards from "views/Leaderboards.view.js"
import ReplayPrompt from "views/ReplayPrompt.view.js"

import "views/View.less"

export default function View(props) {
    return (
        <Frame>
            <Version/>
            <Title game={Experience.game}/>
            <ReplayPrompt game={Experience.game}/>
            <Score game={Experience.game}/>
            <Leaderboards game={Experience.game}/>
            <div className="Game" key={Experience.game.key}>
                <Camera camera={Experience.game.camera}>
                    {Experience.game.slabs.map((slab, key) => (
                        <Slab slab={slab} key={key}/>
                    ))}
                </Camera>
            </div>
        </Frame>
    )
}

// TODO: Refactor the X and Z to be horizontal and Y to be vertical.
// TODO: Why are we offseting z/2 for the upwards transform, and not the others?
// TODO: Why is the x/y origin in the top left?
