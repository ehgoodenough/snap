import Three from "three"

var BOUNCE_POINT = 13

export class Slab extends Three.Mesh {
    constructor(slab) {
        var BoxGeometry = new Three.BoxGeometry(slab.width, 1, slab.height)
        var DefaultMaterial = new Three.MeshLambertMaterial({color: slab.color})
        super(BoxGeometry, DefaultMaterial)
        
        this.speed = slab.speed || 1
        this.direction = slab.direction || "x"
        
        this.position.y += slab.y || 0
        this.position[this.direction] -= 25
    }
    update(delta, input) {
        if(!this.isFrozen) {
            if(input.isTapped) {
                this.isFrozen = true
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
