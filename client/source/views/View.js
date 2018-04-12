import Preact from "preact"

import Slab from "views/Slab.view.js"
import Score from "views/Score.view.js"
import Frame from "views/Frame.view.js"
import Camera from "views/Camera.view.js"
import Version from "views/Version.view.js"

export default function View(props) {
    return (
        <Frame>
            <Score game={props.system.game}/>
            <div className="Game" key={props.system.game.key}>
                <Camera camera={props.system.game.camera}>
                    {props.system.game.slabs.map((slab, key) => (
                        <Slab slab={slab} key={key}/>
                    ))}
                </Camera>
            </div>
            <Version/>
        </Frame>
    )
}

// TODO: Refactor the X and Z to be horizontal and Y to be vertical.
// TODO: Why are we offseting z/2 for the upwards transform, and not the others?
// TODO: Why is the x/y origin in the top left?
