//////////////////////
///// Importing /////
////////////////////

import Three from "three"
import Afloop from "afloop"
import React from "react"
import ReactDOM from "react-dom"
import Hammer from "hammerjs"

import {Scene} from "./scripts/Scene.js"
import {Camera} from "./scripts/Camera.js"
import {Slab, SlidingSlab} from "./scripts/Slab.js"
import {MountComponent} from "./scripts/UI.js"

// var music = new Audio(require("./sounds/music.mp3"))
// music.volume = 0.25
// music.play()

/////////////////////////
///// Initializing /////
///////////////////////

const DETAIL = 800
const HEIGHT = 4 * DETAIL, WIDTH = 3 * DETAIL
const ASPECT = WIDTH / HEIGHT, NEAR = 0.1, FAR = 100000
const ZOOM = 300

window.WIDTH = WIDTH
window.HEIGHT = HEIGHT
window.DETAIL = DETAIL
window.ASPECT = ASPECT
window.ZOOM = ZOOM
window.ASPECT = ASPECT
window.NEAR = NEAR
window.FAR = FAR

window.state = new Object({
    scene: new Scene(),
})

var input = false
document.addEventListener("mousedown", (event) => {input = true})
document.addEventListener("keypress", (event) => {event.keyCode == 32 ? input = true : "nothing"})

var rendering = ReactDOM.render(<MountComponent/>, document.getElementById("mount"))

var loop = new Afloop((delta) => {
    var delta = Math.min(delta, 1)
    
    state.scene.update(delta, input)
    rendering.setState(state)
    
    input = false
})
