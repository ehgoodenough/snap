import Preact from "preact"
import QueryString from "query-string"

import Channel from "library/Channel.js"
import Input from "library/Input.js"
import Nimble from "library/Nimble"

import Slab from "views/Slab.view.js"
import Score from "views/Score.view.js"
import Camera from "views/Camera.view.js"
import Version from "views/Version.view.js"
import Title from "views/Title.view.js"
import Prompt from "views/Prompt.view.js"
import ScoreTallyGraph from "views/ScoreTallyGraph.view.js"
import LeaderboardModal from "views/LeaderboardModal.view.js"

import "views/View.less"

let query = QueryString.parse(window.location.search)

export default class View {
    render() {
        return (
            <div className="Mount" id={`mounted-as-${Nimble.twitch.extension.mount}`}>
                <div className="View">
                    {this.view}
                </div>
            </div>
        )
    }
    get view() {
        if(Nimble.twitch.extension.mount === "config") {
            return (
                <ConfigView model={this.props.model}/>
            )
        }

        return (
            <Game model={this.props.model}/>
        )
    }
}

class ConfigView {
    render() {
        return (
            <div className="ConfigView">
                <section className="PlaySection">
                    <Game model={this.props.model}/>
                    <div className="WelcomeMessage">
                        <h1>{"Welcome to Snap!!"}</h1>
                        <div>{"Thank you so much for installing."}</div>
                        <p><b>{"Q: What is Snap?"}</b><div>{"A game for you to share with your viewers. Just click or tap to play!! Try to snap your blocks on top of each other."}</div></p>
                        <p><b>{"Q: Why should I put a game on my stream???"}</b><div>{"A: To build engagement and community with your viewers. If you're ever queueing up for a match, or away from keyboard, or just chilling, your viewers can entertain themselves with a little distraction."}</div></p>
                        <p><b>{"Q: Where do I put this?"}</b><div>{"A: We support panels, overlays, component overlays, and mobile. So really anywhere!"}</div></p>
                        <p><b>{"Q: What is your favorite color?"}</b><div>{"A: Probably red. Thanks for asking!"}</div></p>
                    </div>
                </section>
                <section className="LeaderboardSection">
                    {/*<div className="LeaderboardSegment">
                        <h3>Leaderboards</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eros enim, efficitur eleifend ex in, tempor malesuada elit. In hac habitasse platea dictumst. Proin mollis urna nisl, eget sollicitudin metus scelerisque id.</p>
                    </div>*/}
                    <div className="LeaderboardSegment">
                        <h3>For Session</h3>
                        <div className="Leaderboard">
                            <Nimble.views.Leaderboard activity="SNAP" scope="session" doNotHighlightMe={true}/>
                        </div>
                    </div>
                    <div className="LeaderboardSegment">
                        <h3>For Channel</h3>
                        <div className="Leaderboard">
                            <Nimble.views.Leaderboard activity="SNAP" scope="channel" doNotHighlightMe={true}/>
                        </div>
                    </div>
                    <div className="LeaderboardSegment">
                        <h3>For all of Twitch</h3>
                        <div className="Leaderboard">
                            <Nimble.views.Leaderboard activity="SNAP" scope="global" doNotHighlightMe={true}/>
                        </div>
                    </div>
                </section>
                <section className="ActionSection">
                    <div className="ResetChannelSession">
                        <h3>Reset your Session Leaderboard?</h3>
                        <p>By clicking this button, you are reseting the <span className="session">session leaderboard</span>. The scores will still be preserved on your channel leaderboard and the all-of-twitch leaderboard.</p>
                        <button onClick={this.onResetChannelSession}>RESET SESSION</button>
                    </div>
                </section>
            </div>
        )
    }
    onResetChannelSession() {
        Channel.resetChannelSession()
    }
}

class Game {
    render() {
        return (
            <div className="Game"
                onMouseUp={this.onMouseUp}
                onMouseDown={this.onMouseDown}>
                <Version/>
                <Title model={this.props.model}/>
                <Prompt model={this.props.model}/>
                <Score model={this.props.model}/>
                <LeaderboardModal model={this.props.model}/>
                <ScoreTallyGraph model={this.props.model}/>
                <Camera camera={this.props.model.game.camera} key={this.props.model.game.key}>
                    {this.props.model.game.slabs.map((slab, key) => (
                        <Slab slab={slab} key={key}/>
                    ))}
                </Camera>
            </div>
        )
    }
    onMouseDown() {
        Input.onDown()
    }
    onMouseUp() {
        Input.onUp()
    }
}
