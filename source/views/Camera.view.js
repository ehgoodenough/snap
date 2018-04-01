import Preact from "preact"

import "views/Camera.view.less"

export default function Camera(props) {
    return (
        <div className="Camera" style={{
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
