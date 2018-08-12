// Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.

const Preact = require("preact")
const Nimble = require("../.")

require("./Leaderboard.view.less")

const LEADERBOARD_RENDER_LENGTH = 10
const LEADERBOARD_TOP_RENDER_LENGTH = 1
const LEADERBOARD_AROUND_ME_RENDER_LENGTH = 1

const BIG_ROW_COUNT = 9
const SMALL_ROW_COUNT = 5

module.exports = class NimbleLeaderboard {
    render() {
        return (
            <div className={this.className}>
                <div className="entries">
                    {this.entries}
                </div>
            </div>
        )
    }
    get className() {
        return `NimbleLeaderboard scoped-to-${this.props.scope}`
    }
    get leaderboardKey() {
        return this.props.activity + "/" + this.props.scope
    }
    get entries() {
        let topEntries = Nimble.sparks.leaderboards[this.leaderboardKey + "/top"]
        let aroundEntries = Nimble.sparks.leaderboards[this.leaderboardKey + "/around"]

        let entries = []
        for(var i = 0; i < (this.props.size === "big" ? BIG_ROW_COUNT : SMALL_ROW_COUNT); i += 1) {
            entries[i] = entries[i] || undefined
        }

        if(topEntries !== undefined
        && aroundEntries !== undefined) {
            let viewerName = Nimble.twitch.viewer.name || "@" + Nimble.twitch.viewer.opaqueUserId
            let viewerEntry = aroundEntries.find((entry) => {
                return entry.name === viewerName
            })
            if(viewerEntry !== undefined) {
                if(this.props.size === "big") {
                    if(viewerEntry.rank >= BIG_ROW_COUNT - 2) {
                        entries[0] = topEntries[0]
                        entries[1] = topEntries[1]
                        entries[2] = topEntries[2]
                        entries[3] = "..."
                        entries[4] = aroundEntries[0]
                        entries[5] = aroundEntries[1]
                        entries[6] = aroundEntries[2]
                        entries[7] = aroundEntries[3]
                        entries[8] = aroundEntries[4]
                    } else {
                        entries[0] = topEntries[0]
                        entries[1] = topEntries[1]
                        entries[2] = topEntries[2]
                        entries[3] = topEntries[3]
                        entries[4] = topEntries[4]
                        entries[5] = topEntries[5]
                        entries[6] = topEntries[6]
                        entries[7] = topEntries[7]
                        entries[8] = topEntries[8]
                    }
                } else {
                    if(viewerEntry.rank >= SMALL_ROW_COUNT - 1) {
                        entries[0] = topEntries[0]
                        entries[1] = "..."
                        entries[2] = aroundEntries[1]
                        entries[3] = aroundEntries[2]
                        entries[4] = aroundEntries[3]
                    } else {
                        entries[0] = topEntries[0]
                        entries[1] = topEntries[1]
                        entries[2] = topEntries[2]
                        entries[3] = topEntries[3]
                        entries[4] = topEntries[4]
                    }
                }
            } else {
                if(this.props.size === "big") {
                    entries[0] = topEntries[0]
                    entries[1] = topEntries[1]
                    entries[2] = topEntries[2]
                    entries[3] = topEntries[3]
                    entries[4] = topEntries[4]
                    entries[5] = topEntries[5]
                    entries[6] = topEntries[6]
                    entries[7] = topEntries[7]
                    entries[8] = topEntries[8]
                } else {
                    entries[0] = topEntries[0]
                    entries[1] = topEntries[1]
                    entries[2] = topEntries[2]
                    entries[3] = topEntries[3]
                    entries[4] = topEntries[4]
                }
            }
        }

        // // Waiting for localization before uncommenting this.
        // if(topEntries !== undefined && topEntries.length === 0
        // && aroundEntries !== undefined && aroundEntries.length === 0) {
        //     entries[1] = "No entries... yet!!"
        // }

        return entries.map((entry, index) => {
            if(entry === undefined) {
                return (
                    <div className="entry isEmpty" key={index}/>
                )
            } else if(typeof entry === "string") {
                return (
                    <div className="entry isString" key={index}>
                        {entry}
                    </div>
                )
            } else {
                return <LeaderboardEntry entry={entry} key={index}/>
            }
        })
    }
}

class LeaderboardEntry {
    render() {
        return (
            <div className={`entry ${this.isYou ? "isYou" : ""}`}>
                <span className="rank">{this.props.entry.rank}</span>
                <span className="name">{this.name}</span>
                <span className="score">{this.props.entry.score}</span>
            </div>
        )
    }
    get name() {
        if(this.props.entry.name[0] === "@") {
            return "private player"
        } else {
            return this.props.entry.name
        }
    }
    get isYou() {
        return this.props.entry.name === Nimble.twitch.viewer.name
            || this.props.entry.name === "@" + Nimble.twitch.viewer.opaqueUserId
    }
}
