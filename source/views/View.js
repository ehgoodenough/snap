import Preact from "preact"

import Slab from "views/Slab.view.js"
import Score from "views/Score.view.js"
import Frame from "views/Frame.view.js"
import Camera from "views/Camera.view.js"

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
        </Frame>
    )
}
