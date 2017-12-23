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
                `translateZ(${-1 * props.camera}px)`
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
                transform: [
                    `translateX(${this.props.box.x || 0}px)`,
                    `translateY(${this.props.box.y || 0}px)`,
                    `translateZ(${this.props.box.z || 0}px)`,
                ].join(" ")
            }}>
                <div className="front face" style={{
                    width: this.props.box.width,
                    height: this.props.box.height,
                    transform: `translateZ(${this.props.box.depth/2}px)`,
                    backgroundColor: "#C00",
                }}/>
                <div className="right face" style={{
                    width: this.props.box.depth,
                    height: this.props.box.height,
                    transform: `rotateY(90deg) translateZ(${this.props.box.width - (this.props.box.depth/2)}px)`,
                    backgroundColor: "#0C0",
                }}/>
                <div className="bottom face" style={{
                    width: this.props.box.width,
                    height: this.props.box.depth,
                    transform: `rotateX(-90deg) translateZ(${this.props.box.height - (this.props.box.depth/2)}px)`,
                    backgroundColor: "#00C",
                }}/>
            </div>
        )
    }
}
