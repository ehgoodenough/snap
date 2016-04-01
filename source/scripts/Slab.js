import Three from "three"
import LeftPad from "left-pad"

const COLOR_GRADIENT = 7 // the number of stages in each gradient between colors
const MINIMUM_SIZE = 0.3 // the smallest size of a slab that won't end the game
const BOUNCE_POINT = 13 // the position from the origin that a slab will bounce
const SNAP_POINT = 0.2 // the fuzzy difference in two slabs to trigger a snap
const SPEED = 20 // the rate per second to move the slab

var colors = [
    "#32292F",
    "#575366",
    "#6E7DAB",
    "#5762D5",
    "#1446AO",
    "#27090F",
    "#5C2E3D",
    "#A9565E",
    "#8A7783",
    "#A7919D",
].map((color) => {
    return [
        color.substring(1,3),
        color.substring(3,5),
        color.substring(5,7),
    ].map((color) => {
        return parseInt(color, 16)
    })
})

var shuffle = Math.random() * colors.length
for(var i = 0; i < shuffle; i++) {
    colors.push(colors.shift())
}

function generateColor(y) {
    var p = y % COLOR_GRADIENT / COLOR_GRADIENT
    var w = p * 2 - 1
    var w1 = (w / 1  + 1) / 2
    var w2 = 1 - w1
    
    var color1 = colors[(Math.floor(y / COLOR_GRADIENT) + 1) % colors.length]
    var color2 = colors[(Math.floor(y / COLOR_GRADIENT)) % colors.length]
    
    return "#" + [
        LeftPad(Math.round((color1[0] * w1) + (color2[0] * w2)).toString(16), 2, 0),
        LeftPad(Math.round((color1[1] * w1) + (color2[1] * w2)).toString(16), 2, 0),
        LeftPad(Math.round((color1[2] * w1) + (color2[2] * w2)).toString(16), 2, 0),
    ].join("")
}

export class Slab extends Three.Mesh {
    constructor(slab) {
        var geometry = new Three.BoxGeometry(slab.width || 1, slab.height || 1, slab.depth || 1)
        var material = new Three.MeshLambertMaterial({color: slab.color || generateColor(slab.y || 0)})
        super(geometry, material)
        
        this.position.x += slab.x || 0
        this.position.y += slab.y || 0
        this.position.z += slab.z || 0
        
        this.width = slab.width || 1
        this.height = slab.height || 1
        this.depth = slab.depth || 1
        
        this.color = slab.color || generateColor(this.position.y)
        
        this.receiveShadow = true
        this.castShadow = true
    }
}

export class SlidingSlab extends Slab {
    constructor(slab) {
        super(slab)
        
        this.speed = slab.speed || SPEED
        this.direction = slab.direction || "x"
        
        this.position[this.direction] -= 25
    }
    update(delta, input) {
        if(input.isTapped) {
            var slab = this.parent.children.filter((child) => {
                return child instanceof Slab
            })[this.position.y - 1]
            
            var ax0 = this.position.x - (this.width / 2)
            var az0 = this.position.z - (this.depth / 2)
            var ax1 = this.position.x + (this.width / 2)
            var az1 = this.position.z + (this.depth / 2)
            
            var bx0 = slab.position.x - (slab.width / 2)
            var bz0 = slab.position.z - (slab.depth / 2)
            var bx1 = slab.position.x + (slab.width / 2)
            var bz1 = slab.position.z + (slab.depth / 2)
            
            // snap
            if(this.direction == "x") {
                if(Math.abs(ax0 - bx0) < SNAP_POINT
                && Math.abs(ax1 - bx1) < SNAP_POINT) {
                    console.log("AWESOME")
                    ax0 = bx0
                    ax1 = bx1
                }
            }
            if(this.direction == "z") {
                if(Math.abs(az0 - bz0) < SNAP_POINT
                && Math.abs(az1 - bz1) < SNAP_POINT) {
                    console.log("AWESOME")
                    az0 = bz0
                    az1 = bz1
                }
            }
            
            // trim
            if(ax0 < bx0) {ax0 = bx0}
            if(az0 < bz0) {az0 = bz0}
            if(ax1 > bx1) {ax1 = bx1}
            if(az1 > bz1) {az1 = bz1}
            
            var width = ax1 - ax0
            var depth = az1 - az0
            var x = ax0 + (width / 2)
            var z = az0 + (depth / 2)
            var y = this.position.y
            
            if(width > MINIMUM_SIZE
            && depth > MINIMUM_SIZE) {
                this.parent.add(new Slab({
                    color: this.color,
                    x: x,
                    y: y,
                    z: z,
                    width: width,
                    depth: depth,
                }))
                
                this.parent.add(new SlidingSlab({
                    x: x,
                    y: y + 1,
                    z: z,
                    width: width,
                    depth: depth,
                    direction: this.direction == "x" ? "z" : "x",
                }))
                
                this.parent.score += 1
                window.scoreElement.innerHTML = this.parent.score
                // window.beep.play()
            } else {
                window.alert("GAME OVER")
            }
            
            this.parent.remove(this)
            
        } else {
            this.position[this.direction] += this.speed * delta
            if(this.speed > 0 && this.position[this.direction] > +BOUNCE_POINT
            || this.speed < 0 && this.position[this.direction] < -BOUNCE_POINT) {
                this.speed *= -1
            }
        }
    }
}
