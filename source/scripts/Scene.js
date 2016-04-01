import Three from "three"
import Firebase from "firebase"

import {Camera} from "./Camera.js"
import {Slab, SlidingSlab} from "./Slab.js"

var firebase = new Firebase("https://yeahgoodenough.firebaseio.com/stack")

export class Scene extends Three.Scene {
    constructor(scene = new Object()) {
        super()

        this.score = 0
        this.combo = 0
        this.slabs = {}
        
        this.camera = new Camera({
            width: WIDTH, height: HEIGHT,
            zoom: ZOOM, near: NEAR, far: FAR
        })
        
        this.light = new Three.DirectionalLight(0xFFFFFF, 1.3)
        this.light.position.set(2, 3, 1.5)
        this.light.castShadow = true
        
        this.add(this.camera)
        this.add(this.light)
        this.add(new Slab({
            width: 7, height: 100, depth: 7,
            color: 0x888888,
            y: -49.5,
        }))
        
        this.mode = scene.mode || "new"
    }
    update(delta, input) {
        if(this.mode == "new") {
            if(input == true) {
                this.mode = "on"
                this.add(new SlidingSlab({
                    width: 7, depth: 7,
                    y: 1
                }))
            }
        } else if(this.mode == "on") {
            this.children.forEach((child) => {
                if(child.update instanceof Function) {
                    child.update(delta, input)
                }
            })
        } else if(this.mode == "done") {
            this.children.forEach((child) => {
                if(child.update instanceof Function) {
                    child.update(delta, input)
                }
            })
            if(input == true) {
                var toRemove = new Array()
                this.children.forEach((child) => {
                    if(child instanceof Slab) {
                        if(child.position.y > 0) {
                            toRemove.push(child)
                        }
                    } else if(child instanceof Camera) {
                        toRemove.push(child)
                    }
                })
                toRemove.forEach((child) => {
                    this.remove(child)
                })
                
                this.mode = "on"
                this.score = 0
                this.add(new SlidingSlab({
                    width: 7, depth: 7,
                    y: 1
                }))
                this.add(this.camera = new Camera({
                    width: WIDTH, height: HEIGHT,
                    zoom: ZOOM, near: NEAR, far: FAR
                }))
            }
        }
    }
    recordScore() {
        window.localStorage.highscore = Math.max(window.localStorage.highscore, this.score)
        firebase.push(this.score).setPriority(this.score)
    }
    get message() {
        if(this.mode == "new") {
            return "Tap to begin playing!"
        } else if(this.mode == "done") {
            if(this.score == window.localStorage.highscore) {
                return "New High Score!!"
            } else {
                return "Game Over!"
            }
        }
    }
}
