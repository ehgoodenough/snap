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
                <figure className="front" style={{
                    transform: [
                        "rotateY(0deg)",
                        "translateZ(100px)"
                    ].join(" ")
                }}/>
                <figure className="back" style={{
                    transform: [
                        "rotateX(180deg)",
                        "translateZ(100px)"
                    ].join(" ")
                }}/>
                <figure className="right" style={{
                    transform: [
                        "rotateY(90deg)",
                        "translateZ(100px)"
                    ].join(" ")
                }}/>
                <figure className="left" style={{
                    transform: [
                        "rotateY(-90deg)",
                        "translateZ(100px)"
                    ].join(" ")
                }}/>
                <figure className="top" style={{
                    transform: [
                        "rotateX(90deg)",
                        "translateZ(100px)"
                    ].join(" ")
                }}/>
                <figure className="bottom" style={{
                    transform: [
                        "rotateX(-90deg)",
                        "translateZ(100px)"
                    ].join(" ")
                }}/>
            </div>
        )
    }
}

ReactDOM.render(<Stack/>, frame)
