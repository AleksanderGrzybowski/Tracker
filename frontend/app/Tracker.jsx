import React from 'react';
import Timer from './Timer.jsx';
import GPS from './GPS.js';
import FakeGPS from './FakeGPS.js';
import DebugPanel from './DebugPanel.jsx';
import {distance} from './utils.js';

const Status = {
    WAITING: 'waiting',
    FOUND: 'found',
    ERROR: 'error'
};

export default class Tracker extends React.Component {

    constructor(props) {
        super(props);

        this.gps = new GPS(this.locationChanged, this.errorHappened);
        this.gps.startPolling();

        this.state = {
            elapsed: 0,
            timerRunning: false,
            positions: [],
            debug: false,
            status: Status.WAITING
        };
    }

    totalDistance = () => {
        if (this.state.positions.length < 2) return 0;

        var sum = 0.0;
        
        for (var i = 0; i < this.state.positions.length - 1; ++i) {
            sum += distance(this.state.positions[i], this.state.positions[i + 1])
        }

        return sum;
    };

    locationChanged = (pos) => {
        this.setState({
            positions: [...this.state.positions, pos],
            status: Status.FOUND
        })
    };

    errorHappened = () => {
        this.setState({status: Status.ERROR})
    };

    toggleTimer = () => {
        if (this.state.timerRunning) {
            clearInterval(this.intervalId)
        } else {
            this.intervalId = setInterval(() => {
                this.setState({elapsed: this.state.elapsed + 1})
            }, 1000)
        }
        
        this.setState({timerRunning: !this.state.timerRunning});
    };

    resetTimer = () => {
        this.setState({elapsed: 0});
    };

    toggleDebug = () => {
        this.setState({debug: !this.state.debug})
    };

    render() {
        const buttonText = this.state.timerRunning ? 'off' : 'on';
        
        var infoText;
        if (this.state.status === Status.WAITING) {
            infoText = 'Waiting for GPS';
        } else if (this.state.status === Status.FOUND) {
            infoText = 'GPS signal ok';
        } else if (this.state.status === Status.ERROR) {
            infoText = 'Error accessing GPS';
        } else {
            infoText = 'unknown status';
        }

        var debugPanel;
        if (this.state.debug) {
            debugPanel = <DebugPanel positions={this.state.positions}/>
        }
        
        return (
            <div>
                <div>{infoText}</div>
                <div>
                    <label>
                        <input type="checkbox" checked={this.state.debug} onChange={this.toggleDebug}/>
                        Debug panel
                    </label>
                </div>
                
                <div>
                    <button onClick={this.toggleTimer}>{buttonText}</button>
                    <button onClick={this.resetTimer}>reset</button>
                    <Timer elapsed={this.state.elapsed}/>
                </div>
                
                <p>Distance: {this.totalDistance()}</p>
                {debugPanel}
            </div>
        )
    }
}