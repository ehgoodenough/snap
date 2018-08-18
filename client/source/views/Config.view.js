import Preact from "preact"
import Nimble from "library/Nimble"

import "views/Config.view.less"
import Game from "views/Game.view.js"
import Channel from "library/Channel.js"

export default class Config {
    render() {
        return (
            <div className="Config">
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
                    <div className="LeaderboardSegment">
                        <h3>For the Session</h3>
                        <div className="Leaderboard">
                            <Nimble.views.Leaderboard activity="SNAP" scope="session" doNotHighlightMe={!!!this.isSeeingMyScores}/>
                        </div>
                    </div>
                    <div className="LeaderboardSegment">
                        <h3>For the Channel</h3>
                        <div className="Leaderboard">
                            <Nimble.views.Leaderboard activity="SNAP" scope="channel" doNotHighlightMe={!!!this.isSeeingMyScores}/>
                        </div>
                    </div>
                    <div className="LeaderboardSegment">
                        <h3>For all of Twitch</h3>
                        <div className="Leaderboard">
                            <Nimble.views.Leaderboard activity="SNAP" scope="global" doNotHighlightMe={!!!this.isSeeingMyScores}/>
                        </div>
                    </div>
                </section>
                <section className="ActionSection">
                    <div className="ResetChannelSession">
                        <h3>Reset your Session Leaderboard?</h3>
                        <p>By clicking this button, you are reseting the <span className="session">session leaderboard</span>. The scores will still be preserved on your channel leaderboard and the all-of-twitch leaderboard.</p>
                        <button onClick={this.onResetChannelSession}>RESET SESSION</button>
                    </div>
                    <div className="ToggleLeaderboard">
                        <h3>See your Personal Scores?</h3>
                        <p>{"By hovering over this button, we'll show you all your personal scores. Only you see this."}</p>
                        <button onMouseOver={this.onSeeYourScores} onMouseOut={this.onUnseeYourScores}>
                            SEE YOUR SCORES
                        </button>
                    </div>
                </section>
                <section className="ChangelogSection">
                    <h3>Change Log</h3>
                    <div className="Release">
                        <h4><label>{"v1.3.0"}</label> {"2018-08-24?"}</h4>
                        <ul>
                            <li>Added resettable session leaderboards.</li>
                            <li>Improved this configuration dashboard, adding an introduction and changelog.</li>
                            <li>Added a prompt for "private" players to grant us their twitch id.</li>
                        </ul>
                    </div>
                    <div className="Release">
                        <h4><label>{"v1.2.0"}</label> {"2018-08-14"}</h4>
                        <ul>
                            <li>Added channel leaderboards.</li>
                            <li>Added global leaderboards.</li>
                        </ul>
                    </div>
                    <div className="Release">
                        <h4><label>{"v1.1.1"}</label> {"2018-07-05"}</h4>
                        <ul>
                            <li>Fixed outstanding blocking issue on mobile.</li>
                            <li>Instrumented some analytics calls.</li>
                        </ul>
                    </div>
                    <div className="Release">
                        <h4><label>{"v1.1.0"}</label> {"2018-06-19"}</h4>
                        <ul>
                            <li>Released the game to everyone! No more whitelist.</li>
                            <li>Featured on the Twitch Extension Discovery page!</li>
                            <li>Added support for mobile and component overlay.</li>
                            <li>Polished the title screen with a call-to-action.</li>
                            <li>Added a bar graph distribution of the scores.</li>
                        </ul>
                    </div>
                    <div className="Release">
                        <h4><label>{"v1.0.0"}</label> {"2018-04-15"}</h4>
                        <ul>
                            <li>Released the game! But only to a whitelist of streamers.</li>
                        </ul>
                    </div>
                </section>
            </div>
        )
    }
    onResetChannelSession() {
        Channel.resetChannelSession()
    }
    get onSeeYourScores() {
        return (event) => {
            this.isSeeingMyScores = true
        }
    }
    get onUnseeYourScores() {
        return (event) => {
            this.isSeeingMyScores = false
        }
    }
}
