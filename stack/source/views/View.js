import React from "react"

export default class View extends React.Component {
    render() {
        return (
            <div className="stack">
                <Camera camera={this.props.game.camera}>
                    {this.props.game.boxes.map((box, key) => (
                        <Box box={box} key={key}/>
                    ))}
                </Camera>
            </div>
        )
    }
}

function Camera(props) {
    return (
        <div className="camera" style={{
            transform: [
                "rotateX(65deg)",
                "rotateZ(45deg)",
                `translateZ(${-1 * props.camera.pan}px)`,
                `scale3d(${props.camera.zoom}, ${props.camera.zoom}, ${props.camera.zoom})`
            ].join(" ")
        }}>
            {props.children}
        </div>
    )
}

class Box extends React.Component {
    render() {
        return (
            <div className="box" style={{
                opacity: this.props.box.isBroken ? 0 : 1,
                transform: [
                    `translateX(${this.props.box.position.x || 0}px)`,
                    `translateY(${this.props.box.position.y || 0}px)`,
                    `translateZ(${(this.props.box.position.z || 0) - (this.props.box.size.z/2)}px)`,
                ].join(" ")
            }}>
                <div className="front face" style={{
                    width: this.props.box.size.x,
                    height: this.props.box.size.y,
                    transform: `translateZ(${this.props.box.size.z/2}px)`,
                    backgroundColor: this.props.box.color || "#C00",
                }}/>
                <div className="right face" style={{
                    width: this.props.box.size.z,
                    height: this.props.box.size.y,
                    transform: `rotateY(90deg) translateZ(${this.props.box.size.x - (this.props.box.size.z/2)}px)`,
                    backgroundColor: this.props.box.darkerColor || "#0C0",
                }}/>
                <div className="bottom face" style={{
                    width: this.props.box.size.x,
                    height: this.props.box.size.z,
                    transform: `rotateX(-90deg) translateZ(${this.props.box.size.y - (this.props.box.size.z/2)}px)`,
                    backgroundColor: this.props.box.darkererColor || "#00C",
                }}/>
            </div>
        )
    }
}
