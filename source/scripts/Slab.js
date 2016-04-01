import Three from "three"

var BOUNCE_POINT = 13

export class Slab extends Three.Mesh {
    constructor(slab) {
        var geometry = new Three.BoxGeometry(slab.width || 1, slab.height || 1, slab.depth || 1)
        var material = new Three.MeshLambertMaterial({color: slab.color || 0xFFFFFF})
        super(geometry, material)
        
        this.position.x += slab.x || 0
        this.position.y += slab.y || 0
        this.position.z += slab.z || 0
        
        this.receiveShadow = true
        this.castShadow = true
    }
}

export class SlidingSlab extends Slab {
    constructor(slab) {
        super(slab)
        
        this.speed = slab.speed || 1
        this.direction = slab.direction || "x"
        
        this.position[this.direction] -= 25
    }
    update(delta, input) {
        if(input.isTapped) {
            var slab = this.parent.children.filter((child) => {
                return child instanceof Slab
            })[this.position.y - 1]
            
            var difference = this.position[this.direction] - slab.position[this.direction]
            
            // given slab, how to get size? how to get color?
            
            this.parent.add(new Slab({
                color: 0x0000CC,
                x: this.position.x,
                y: this.position.y,
                z: this.position.z,
                width: 10,
                depth: 10,
                height: 1,
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
