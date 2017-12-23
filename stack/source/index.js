import React from "react"
import ReactDOM from "react-dom"
import Yaafloop from "yaafloop"
import Keyb from "keyb"

// react and css3d
// gameplay loop
// leaderboards

class Stack extends React.Component {
    render() {
        return (
            <div className="stack">
                <div className="camera">
                    <Box box={{width: 100, height: 100, depth: 50}}/>
                </div>
            </div>
        )
    }
}

class Box extends React.Component {
    render() {
        return (
            <div className="box">
                <div className="front face" style={{
                    width: this.props.box.width,
                    height: this.props.box.height,
                    transform: `translateZ(${this.props.box.depth/2}px)`,
                    backgroundColor: "#C00",
                }}/>
                <div className="right face" style={{
                    width: this.props.box.depth,
                    height: this.props.box.height,
                    left: this.props.box.depth/2,
                    transform: `rotateY(90deg) translateZ(${this.props.box.width/2}px)`,
                    backgroundColor: "#0C0",
                }}/>
                <div className="bottom face" style={{
                    width: this.props.box.width,
                    height: this.props.box.depth,
                    top: this.props.box.depth/2,
                    transform: `rotateX(-90deg) translateZ(${this.props.box.height/2}px)`,
                    backgroundColor: "#00C",
                }}/>
            </div>
        )
    }
}

ReactDOM.render(<Stack/>, frame)
