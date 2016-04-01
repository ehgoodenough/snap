//////////////////////
///// Importing /////
////////////////////

import Three from "three"
import Afloop from "afloop"

import {Camera} from "./scripts/Camera.js"
import {Slab, SlidingSlab} from "./scripts/Slab.js"

/////////////////////////
///// Initializing /////
///////////////////////

const DETAIL = 800
const HEIGHT = 4 * DETAIL, WIDTH = 3 * DETAIL
const ASPECT = WIDTH / HEIGHT, NEAR = 0.1, FAR = 100000
const ZOOM = 300

var renderer = new Three.WebGLRenderer({alpha: true})
renderer.shadowMap.enabled = false
renderer.setSize(WIDTH, HEIGHT)

document.getElementById("mount").appendChild(renderer.domElement)

var scene = new Three.Scene()

var camera = new Camera({
    width: WIDTH, height: HEIGHT,
    zoom: ZOOM, near: NEAR, far: FAR
})
scene.add(camera)

var light = new Three.DirectionalLight(0xFFFFFF, 1.3)
light.position.set(2, 3, 1.5)
light.castShadow = true
scene.add(light)

scene.add(new Slab({
    y: -49.5,
    width: 7, depth: 7,
    height: 100,
    color: 0xCCCCCC,
}))
scene.add(new SlidingSlab({
    width: 7, depth: 7,
    y: 1
}))

scene.score = 0
scene.combo = 0

var input = new Object()
document.addEventListener("click", (event) => {
    input.isTapped = true
})

var loop = new Afloop((delta) => {
    var delta = Math.min(delta, 1)
    
    scene.children.forEach((object) => {
        if(object.update instanceof Function) {
            object.update(delta, input)
        }
    })
    
    renderer.render(scene, camera)
    
    input.isTapped = false
})

// smaller initial size (not ten by ten)
// faster speeds (not so slow)
// more zoomed in (less on the screen)
