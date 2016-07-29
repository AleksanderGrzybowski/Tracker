import React from 'react';
import Timer from './Timer.jsx';
import GPS from './FakeGPS.js';
import DebugPanel from './DebugPanel.jsx';
import {distance} from './utils.js';
import {Button, Grid, Row, Col, Panel} from 'react-bootstrap';
// import GPS from './GPS.js';
// import GPS from './GPS.js';

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
            running: false,
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
        if (this.state.running) {
            this.setState({
                positions: [...this.state.positions, pos],
                status: Status.FOUND
            })
        }
    };

    errorHappened = () => {
        this.setState({status: Status.ERROR})
    };

    toggleTimer = () => {
        if (this.state.running) {
            clearInterval(this.intervalId);
        } else {
            this.setState({elapsed: 0, positions: []});
            this.intervalId = setInterval(() => {
                this.setState({elapsed: this.state.elapsed + 1})
            }, 1000)
        }

        this.setState({running: !this.state.running});
    };

    toggleDebug = () => {
        this.setState({debug: !this.state.debug})
    };

    render() {
        const buttonText = this.state.running ? 'Stop' : 'Start';

        var infoText;
        if (this.state.status === Status.WAITING) {
            infoText = 'Waiting for GPS';
        } else if (this.state.status === Status.ERROR) {
            infoText = 'Error accessing GPS';
        }

        var infoPanel;
        if (infoText) {
            infoPanel = (
                <Col xs={12}>
                    <Panel>
                        {infoText}
                    </Panel>
                </Col>
            )
        }

        var debugPanel;
        if (this.state.debug) {
            debugPanel = <DebugPanel positions={this.state.positions}/>
        }

        var style = {marginBottom: 10};
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <h1 className="text-center">Tracker</h1>
                    </Col>
                </Row>

                {infoPanel}

                <Row>
                    <Col xs={12} style={style}>
                        <Button
                            block
                            bsSize="large"
                            bsStyle={this.state.running ? 'warning' : 'success'}
                            onClick={this.toggleTimer}
                        >
                            {buttonText}
                        </Button>
                    </Col>
                </Row>

                <Row>
                    <Col xs={6}>
                        <Panel>
                            <Timer elapsed={this.state.elapsed}/>
                        </Panel>
                    </Col>
                    
                    <Col xs={6}>
                        <Panel>
                            <p className="text-center">{this.totalDistance().toFixed(1)} km</p>
                        </Panel>
                    </Col>
                </Row>

                <div>
                    <label>
                        <input type="checkbox" checked={this.state.debug} onChange={this.toggleDebug}/>
                        Debug panel
                    </label>
                </div>

                {debugPanel}
            </Grid>
        )
    }
}