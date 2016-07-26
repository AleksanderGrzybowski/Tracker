import React from 'react';
import Timer from './Timer.jsx';
import GPS from './GPS.js';

export default class Tracker extends React.Component {
   
    constructor(props) {
        super(props);

        this.gps = new GPS(this.locationChanged, this.errorHappened);
        this.gps.startPolling();

        this.state = {
            elapsed: 0,
            timerRunning: false,
            currentLocation: "not yet"
        };
    }

    locationChanged = (pos) => {
        this.setState({currentLocation: `${pos.latitude} ${pos.longitude} ${pos.speed}`})
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


    render() {
        const onOffButton = this.state.timerRunning ?
            <button onClick={this.turnTimerOff}>off</button>
            : <button onClick={this.turnTimerOn}>on</button>;

        return (
            <div>
                {onOffButton}
                <button onClick={this.resetTimer}>reset</button>
                <p>{this.state.currentLocation}</p>
                <Timer elapsed={this.state.elapsed}/>
            </div>
        )
    }
}