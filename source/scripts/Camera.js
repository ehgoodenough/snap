import Three from "three"

const ZOOM_OUT = 0.25 // the ratio to zoom to after the game is over.

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
        if(this.position.y < this.ty) {
            this.position.y += delta * (this.ty - this.position.y)
            if(this.ty - this.position.y < 0.01) {
                this.position.y = this.ty
            }
        }
        if(this.parent.isGameOver) {
            if(this.zoom > ZOOM_OUT) {
                this.zoom -= 3 * delta * (this.zoom - ZOOM_OUT)
                if(this.zoom - ZOOM_OUT < 0.0005) {
                    this.zoom = ZOOM_OUT
                }
                this.updateProjectionMatrix()
            }
        }
    }
    get ty() {
        return 100 + this.parent.score
    }
}
