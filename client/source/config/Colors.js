export default [
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
