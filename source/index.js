//////////////////////
///// Importing /////
////////////////////

import Three from "three"
import Afloop from "afloop"

/////////////////////////
///// Initializing /////
///////////////////////

var DETAIL = 10
var HEIGHT = 320 * DETAIL, WIDTH = 240 * DETAIL
var VIEW_ANGLE = 45, ASPECT = WIDTH / HEIGHT, NEAR = 0.1, FAR = 10000
var ZOOM = 25 * DETAIL

var renderer = new Three.WebGLRenderer({alpha: true})
renderer.shadowMap.enabled = false
renderer.setSize(WIDTH, HEIGHT)

document.getElementById("mount").appendChild(renderer.domElement)

var scene = new Three.Scene()

var camera = new Three.OrthographicCamera(WIDTH / -ZOOM, WIDTH / +ZOOM, HEIGHT / +ZOOM, HEIGHT / -ZOOM, NEAR, FAR)
camera.position.set(100, 100, 100)
camera.lookAt(new Three.Vector3(0, 0, 0))
scene.add(camera)

var FirstBlockGeometry = new Three.BoxGeometry(10, 100, 10)
var FirstBlockMaterial = new Three.MeshLambertMaterial({color: 0xCCCCCC})
var firstblock = new Three.Mesh(FirstBlockGeometry, FirstBlockMaterial)
firstblock.position.y = -50.5
scene.add(firstblock)

var light = new Three.DirectionalLight(0xFFFFFF, 1.3)
light.position.set(2, 3, 1.5)
light.castShadow = true
scene.add(light)

import {Slab} from "./scripts/Slab.js"
scene.add(new Slab({
    width: 10, height: 10,
    color: 0xCC0000,
    speed: 10,
}))


var loop = new Afloop((delta) => {
    scene.children.forEach((object) => {
        if(object.update instanceof Function) {
            object.update(delta)
        }
    })
    renderer.render(scene, camera)
})
