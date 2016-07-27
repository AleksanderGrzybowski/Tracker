import React from 'react';
import Timer from './Timer.jsx';
import GPS from './GPS.js';
import DebugPanel from './DebugPanel.jsx';

export default class Tracker extends React.Component {

    constructor(props) {
        super(props);

        this.gps = new GPS(this.locationChanged, this.errorHappened);
        this.gps.startPolling();

        this.state = {
            elapsed: 0,
            timerRunning: false,
            position: {},
            debug: false,
        };
    }


    locationChanged = (pos) => {
        this.setState({position: pos})
    };

    errorHappened = () => {
        this.setState({currentLocation: 'error happened'})
    };

    turnTimerOn = () => {
        this.setState({timerRunning: true});
        this.intervalId = setInterval(() => {
            this.setState({elapsed: this.state.elapsed + 1})
        }, 1000)
    };

    turnTimerOff = () => {
        this.setState({timerRunning: false});
        clearInterval(this.intervalId)
    };

    resetTimer = () => {
        this.setState({elapsed: 0});
    };

    toggleDebug = () => {
        this.setState({debug: !this.state.debug})
    };

    render() {
        const onOffButton = this.state.timerRunning ?
            <button onClick={this.turnTimerOff}>off</button>
            : <button onClick={this.turnTimerOn}>on</button>;

        var debugPanel;
        if (this.state.debug) {
            debugPanel = <DebugPanel position={this.state.position}/>
        }

        return (
            <div>
                {onOffButton}
                <button onClick={this.resetTimer}>reset</button>
                <input type="checkbox" checked={this.state.debug} onChange={this.toggleDebug}/>
                <Timer elapsed={this.state.elapsed}/>
                {debugPanel}
            </div>
        )
    }
}