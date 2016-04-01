import Three from "three"

const BOUNCE_POINT = 13 // the position from the origin that a slab will bounce
const SNAP_POINT = 0.2 // the fuzzy difference in two slabs to trigger a snap

export class Slab extends Three.Mesh {
    constructor(slab) {
        var geometry = new Three.BoxGeometry(slab.width || 1, slab.height || 1, slab.depth || 1)
        var material = new Three.MeshLambertMaterial({color: slab.color || 0xFFFFFF})
        super(geometry, material)
        
        this.position.x += slab.x || 0
        this.position.y += slab.y || 0
        this.position.z += slab.z || 0
        
        this.width = slab.width || 1
        this.height = slab.height || 1
        this.depth = slab.depth || 1
        
        this.color = slab.color || 0xFFFFFF
        
        this.receiveShadow = true
        this.castShadow = true
    }
}

export class SlidingSlab extends Slab {
    constructor(slab) {
        super(slab)
        
        this.speed = slab.speed || 10
        this.direction = slab.direction || "x"
        
        this.position[this.direction] -= 25
    }
    update(delta, input) {
        if(input.isTapped) {
            var slab = this.parent.children.filter((child) => {
                return child instanceof Slab
            })[this.position.y - 1]
            
            // given slab, how to get size? how to get color?
            
            var ax0 = this.position.x - (this.width / 2)
            var az0 = this.position.z - (this.depth / 2)
            var ax1 = this.position.x + (this.width / 2)
            var az1 = this.position.z + (this.depth / 2)
            
            var bx0 = slab.position.x - (slab.width / 2)
            var bz0 = slab.position.z - (slab.depth / 2)
            var bx1 = slab.position.x + (slab.width / 2)
            var bz1 = slab.position.z + (slab.depth / 2)
            
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
            
            if(ax0 < bx0) {ax0 = bx0}
            if(az0 < bz0) {az0 = bz0}
            if(ax1 > bx1) {ax1 = bx1}
            if(az1 > bz1) {az1 = bz1}
            
            var width = ax1 - ax0
            var depth = az1 - az0
            var x = ax0 + (width / 2)
            var z = az0 + (depth / 2)
            var y = this.position.y
            
            if(width < 0 || depth < 0) {
                throw "game over"
            }
            
            this.parent.add(new Slab({
                color: this.color,
                x: x,
                y: y,
                z: z,
                width: width,
                depth: depth,
            }))
            
            this.parent.add(new SlidingSlab({
                color: 0x00CC00,
                x: x,
                y: y + 1,
                z: z,
                width: width,
                depth: depth,
                direction: this.direction == "x" ? "z" : "x",
            }))
            
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
