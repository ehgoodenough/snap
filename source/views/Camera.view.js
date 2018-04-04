import Preact from "preact"

import "views/Camera.view.less"

const CAMERA_OFFSET = 2.5

export default function Camera(props) {
    return (
        <div className="Camera" style={{
            "transform": [
                "rotateX(65deg)",
                "rotateZ(45deg)",
                `translateZ(${-1 * (props.camera.pan + CAMERA_OFFSET)}em)`,
                `scale3d(${props.camera.zoom}, ${props.camera.zoom}, ${props.camera.zoom})`
            ].join(" "),
            "transitionDuration": props.camera.speed + "s",
            "transitionTimingFunction": props.camera.tween || null
        }}>
            {props.children}
        </div>
    )
}
