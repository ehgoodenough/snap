export var Colors = [
    "#32292F",
    "#575366",
    "#6E7DAB",
    "#5762D5",
    "#1446AO",
    "#27090F",
    "#5C2E3D",
    "#A9565E",
    "#8A7783",
    "#A7919D",
].map((color) => {
    return [
        parseInt(color.substring(1, 3), 16),
        parseInt(color.substring(3, 5), 16),
        parseInt(color.substring(5, 7), 16),
    ]
})

// var shuffle = Math.random() * Colors.length
// for(var i = 0; i < shuffle; i++) {
//     Colors.push(Colors.shift())
// }
