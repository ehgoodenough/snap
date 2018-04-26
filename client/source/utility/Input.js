import Keyb from "keyb"

let mouse = null

document.addEventListener("mousedown", function() {
    mouse = Date.now()
})

document.addEventListener("mouseup", function() {
    mouse = null
})

document.addEventListener("touchstart", function() {
    mouse = Date.now()
})

document.addEventListener("touchend", function() {
    mouse = null
})

let Mouse = {
    "isDown": function() {
        return mouse != null
    },
    "isJustDown": function(delta) {
        return Date.now() - mouse < delta
    }
}

function isJustDown(delta) {
    return Keyb.isJustDown("<space>", delta)
        || Mouse.isJustDown(delta)
}

export default {isJustDown}
