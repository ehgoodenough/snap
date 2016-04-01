import Three from "three"

var BOUNCE_POINT = 13

export class Slab extends Three.Mesh {
    constructor(slab) {
        var geometry = new Three.BoxGeometry(slab.width || 1, slab.depth || 1, slab.height || 1)
        var material = new Three.MeshLambertMaterial({color: slab.color || 0xFFFFFF})
        super(geometry, material)
    }
}

export class DynamicSlab extends Slab {
    constructor(slab) {
        super(slab)
        
        this.speed = slab.speed || 1
        this.direction = slab.direction || "x"
        
        this.position.y += slab.y || 0
        this.position[this.direction] -= 25
        
        this.geometry.dynamic = true
    }
    update(delta, input) {
        if(!this.isFrozen) {
            if(input.isTapped) {
                this.isFrozen = true
                
                // get the slab that is directly below this slab.
                var slab = this.parent.children.filter((child) => {
                    return child instanceof Slab
                })[this.position.y - 1]
                
                var difference = this.position[this.direction] - slab.position[this.direction]
                
                for(var index in this.geometry.vertices) {
                    if(difference < 0 && this.geometry.vertices[index][this.direction] < 0) {
                        this.geometry.vertices[index][this.direction] -= difference
                    } else if(difference > 0 && this.geometry.vertices[index][this.direction] > 0) {
                        this.geometry.vertices[index][this.direction] -= difference
                    }
                }
                this.geometry.verticesNeedUpdate = true
                
            } else {
                this.position[this.direction] += this.speed * delta
                if(this.speed > 0 && this.position[this.direction] > +BOUNCE_POINT
                || this.speed < 0 && this.position[this.direction] < -BOUNCE_POINT) {
                    this.speed *= -1
                }
            }
        }
    }
}

export class InitialSlab extends Slab {
    constructor() {
        super({
            width: 10,
            // depth: 100,
            height: 10,
            color: 0xCCCCCC,
        })
        //this.position.y = -49.5
        this.isFrozen = true
    }
}
