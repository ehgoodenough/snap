import LeftPad from "left-pad"

const gradient = 7
const colors = [
    "#ee4035",
    "#f37736",
    "#fdf498",
    "#7bc043",
    "#0392cf",
].map((color) => {
    return [
        parseInt(color.substring(1, 3), 16),
        parseInt(color.substring(3, 5), 16),
        parseInt(color.substring(5, 7), 16),
    ]
})

function generate(i) {

    var p = i % gradient / gradient
    var w = p * 2 - 1
    var w1 = (w / 1  + 1) / 2
    var w2 = 1 - w1

    var color1 = colors[(Math.floor(i / gradient) + 1) % colors.length]
    var color2 = colors[(Math.floor(i / gradient)) % colors.length]

    return "#" + [
        LeftPad(Math.round((color1[0] * w1) + (color2[0] * w2)).toString(16), 2, 0),
        LeftPad(Math.round((color1[1] * w1) + (color2[1] * w2)).toString(16), 2, 0),
        LeftPad(Math.round((color1[2] * w1) + (color2[2] * w2)).toString(16), 2, 0),
    ].join("")
}

function shade(color, percent) {
    // https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1)
}

export default {generate, shade}
