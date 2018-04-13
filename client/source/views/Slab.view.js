import Preact from "preact"

import "views/Slab.view.less"

export default function Slab(props) {
    return (
        <div className="Slab" style={{
            visibility: props.slab.isOnCamera ? "visible" : "hidden",
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
                borderColor: props.slab.color || "#C00",
            }}/>
            <div className="right face" style={{
                width: props.slab.size.z + "em",
                height: props.slab.size.y + "em",
                transform: `rotateY(90deg) translateZ(${props.slab.size.x - (props.slab.size.z/2)}em)`,
                backgroundColor: props.slab.darkerColor || "#0C0",
                borderColor: props.slab.darkerColor || "#0C0",
            }}/>
            <div className="bottom face" style={{
                width: props.slab.size.x + "em",
                height: props.slab.size.z + "em",
                transform: `rotateX(-90deg) translateZ(${props.slab.size.y - (props.slab.size.z/2)}em)`,
                backgroundColor: props.slab.darkererColor || "#00C",
                borderColor: props.slab.darkererColor || "#00C",
            }}/>
        </div>
    )
}
