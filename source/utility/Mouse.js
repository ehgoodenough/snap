let mouse = null

document.addEventListener("mousedown", function() {
    mouse = Date.now()
})

document.addEventListener("mouseup", function() {
    mouse = null
})

function isDown() {
    return mouse != null
}

function isJustDown(delta) {
    return Date.now() - mouse < delta
}

export default {isJustDown, isDown}
