import Preact from "preact"

import Score from "views/Score.view.js"

export default function View(props) {
    return (
        <div id="frame">
            <Score score={props.system.game.score}/>
            <div className="Game" key={props.system.game.key}>
                <Camera camera={props.system.game.camera}>
                    {props.system.game.slabs.map((slab, key) => (
                        <Slab slab={slab} key={key}/>
                    ))}
                </Camera>
            </div>
        </div>
    )
}

function Camera(props) {
    return (
        <div className="camera" style={{
            transform: [
                "rotateX(65deg)",
                "rotateZ(45deg)",
                `translateZ(${-1 * props.camera.pan}em)`,
                `scale3d(${props.camera.zoom}, ${props.camera.zoom}, ${props.camera.zoom})`
            ].join(" ")
        }}>
            {props.children}
        </div>
    )
}

function Slab(props) {
    return (
        <div className="slab" style={{
            opacity: props.slab.isBroken ? 0 : 1,
            transform: [
                `translateX(${props.slab.position.x || 0}em)`,
                `translateY(${props.slab.position.y || 0}em)`,
                `translateZ(${(props.slab.position.z || 0) - (props.slab.size.z/2)}em)`,
            ].join(" ")
        }}>
            <div className="front face" style={{
                width: props.slab.size.x + "em",
                height: props.slab.size.y + "em",
                transform: `translateZ(${props.slab.size.z/2}em)`,
                backgroundColor: props.slab.color || "#C00",
            }}/>
            <div className="right face" style={{
                width: props.slab.size.z + "em",
                height: props.slab.size.y + "em",
                transform: `rotateY(90deg) translateZ(${props.slab.size.x - (props.slab.size.z/2)}em)`,
                backgroundColor: props.slab.darkerColor || "#0C0",
            }}/>
            <div className="bottom face" style={{
                width: props.slab.size.x + "em",
                height: props.slab.size.z + "em",
                transform: `rotateX(-90deg) translateZ(${props.slab.size.y - (props.slab.size.z/2)}em)`,
                backgroundColor: props.slab.darkererColor || "#00C",
            }}/>
        </div>
    )
}
