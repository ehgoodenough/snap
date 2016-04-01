import Three from "three"

export class Camera extends Three.OrthographicCamera {
    constructor(camera) {
        var east = camera.width / -camera.zoom
        var west = camera.width / +camera.zoom
        var north = camera.height / +camera.zoom
        var south = camera.height / -camera.zoom
        super(east, west, north, south, camera.near, camera.far)
        
        this.position.set(100, 100, 100)
        this.lookAt(new Three.Vector3(0, 0, 0))
    }
    update(delta, input) {
        if(this.position.y < this.target) {
            this.position.y += delta * (this.target - this.position.y)
            if(this.target - this.position.y < 0.01) {
                this.position.y = this.target
            }
        }
    }
    get target() {
        return 100 + this.parent.score
    }
}
