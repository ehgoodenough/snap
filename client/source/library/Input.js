let mouse = null

function onDown() {
    mouse = Date.now()
}

function onUp() {
    mouse = null
}

function isJustDown(delta) {
    return Date.now() - mouse < delta
}

module.exports = {isJustDown, onDown, onUp}
