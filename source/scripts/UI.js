import React from "react"
import ReactDOM from "react-dom"
import Three from "three"

export class MountComponent extends React.Component {
    render() {
        if(!!this.state) {
            return (
                <div id="frame">
                    <ThreeComponent scene={this.state.scene}/>
                    <InterfaceComponent scene={this.state.scene}/>
                </div>
            )
        } else {
            return (
                <div/>
            )
        }
    }
}

class ThreeComponent extends React.Component {
    render() {
        return (
            <div className="canvas" ref="canvas"/>
        )
    }
    componentDidMount() {
        this.renderer = new Three.WebGLRenderer({alpha: true})
        this.renderer.shadowMap.enabled = false
        this.renderer.setSize(WIDTH, HEIGHT)
        
        this.refs.canvas.appendChild(this.renderer.domElement)
        this.renderer.render(this.props.scene, this.props.scene.camera)
    }
    componentDidUpdate() {
        this.renderer.render(this.props.scene, this.props.scene.camera)
    }
}

class InterfaceComponent extends React.Component {
    render() {
        return (
            <div className="interface">
                <div className="score">
                    {this.props.scene.score || 0}
                    {this.props.scene.score >= window.localStorage.highscore ? "!" : null}
                </div>
                {!!this.props.scene.message ? (
                    <div key="message" className="message">
                        {this.props.scene.message}
                    </div>
                ) : (
                    <div key="message" className="empty message"/>
                )}
            </div>
        )
    }
}
