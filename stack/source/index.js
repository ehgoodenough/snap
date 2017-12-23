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
                <Box box={{width: 300, height: 200, depth: 100}}/>
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
                    transform: [
                        "rotateY(0deg)",
                        `translateZ(${this.props.box.depth/2}px)`
                    ].join(" "),
                    backgroundColor: "#C00",
                }}/>
                <div className="back face" style={{
                    width: this.props.box.width,
                    height: this.props.box.height,
                    transform: [
                        "rotateX(180deg)",
                        `translateZ(${this.props.box.depth/2}px)`
                    ].join(" "),
                    backgroundColor: "#C00",
                }}/>
                <div className="right face" style={{
                    width: this.props.box.depth,
                    height: this.props.box.height,
                    left: this.props.box.height/2,
                    transform: [
                        "rotateY(90deg)",
                        `translateZ(${this.props.box.width/2}px)`
                    ].join(" "),
                    backgroundColor: "#0C0",
                }}/>
                <div className="left face" style={{
                    width: this.props.box.depth,
                    height: this.props.box.height,
                    left: this.props.box.height/2,
                    transform: [
                        "rotateY(-90deg)",
                        `translateZ(${this.props.box.width/2}px)`
                    ].join(" "),
                    backgroundColor: "#0C0",
                }}/>
                <div className="top face" style={{
                    width: this.props.box.width,
                    height: this.props.box.depth,
                    top: this.props.box.depth/2,
                    transform: [
                        "rotateX(90deg)",
                        `translateZ(${this.props.box.height/2}px)`
                    ].join(" "),
                    backgroundColor: "#00C",
                }}/>
                <div className="bottom face" style={{
                    width: this.props.box.width,
                    height: this.props.box.depth,
                    top: this.props.box.depth/2,
                    transform: [
                        "rotateX(-90deg)",
                        `translateZ(${this.props.box.height/2}px)`
                    ].join(" "),
                    backgroundColor: "#00C",
                }}/>
            </div>
        )
    }
}

ReactDOM.render(<Stack/>, frame)
