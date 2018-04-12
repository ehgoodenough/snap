export default [
    // "#32292F",
    // "#575366",
    // "#6E7DAB",
    // "#5762D5",
    // "#1446AO",
    // "#27090F",
    // "#5C2E3D",
    // "#A9565E",
    // "#8A7783",
    // "#A7919D",

    // "#ACCBE8",
    // "#9295CA",
    // "#9ECEB4",
    // "#A9B2B1",
    // "#CDB48C",
    // "#FFD602",
    // "#E66665",
    // "#F47D43",
    // "#AE70AF",
    // "#076BB6",

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
