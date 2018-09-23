module.exports = function flattenLocXML(locxml) {
    let list = locxml.resources.string || []

    let set = {}

    list.forEach((value) => {
        set[value.$.key] = value._
    })

    return set
}
