// Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.

const Nimble = require("library/Nimble")

let strings = {
    "en-US": require("./strings_en-US.xml"),
    "fr-FR": require("./strings_fr-FR.xml"),
    "it-IT": require("./strings_it-IT.xml"),
    "de-DE": require("./strings_de-DE.xml"),
    "es-ES": require("./strings_es-ES.xml"),
    "ja-JP": require("./strings_ja-JP.xml"),
    "ru-RU": require("./strings_ru-RU.xml"),
    "tr-TR": require("./strings_ja-JP.xml"),
}

// Localize the strings, selecting the set that matches the language.
strings = strings[Nimble.twitch.extension.locale]

// Convert the string set from LocXML to JSON.
strings = Nimble.utility.flattenLocXML(strings)

// Export the strings.
module.exports = strings
