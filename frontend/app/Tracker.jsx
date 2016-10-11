import React from 'react';
import Timer from './Timer.jsx';
import GPS from './GPS.js';
import DebugPanel from './DebugPanel.jsx';
import { distance } from './utils.js';
import { Button, Grid, Row, Col, Panel } from 'react-bootstrap';

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

        let sum = 0.0;
        for (let i = 0; i < this.state.positions.length - 1; ++i) {
            sum += distance(this.state.positions[i], this.state.positions[i + 1])
        }

        return sum;
    };

    locationChanged = (pos) => {
        this.setState({status: Status.FOUND});
        if (this.state.running) {
            this.setState({
                positions: [...this.state.positions, pos]
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
        let buttonText;
        if (this.state.status == Status.WAITING) {
            buttonText = 'Please wait...';
        } else if (this.state.status == Status.ERROR) {
            buttonText = 'Error occured';
        } else {
            buttonText = this.state.running ? 'Stop' : 'Start';
        }

        let buttonOnclick = (this.state.status == Status.ERROR || this.state.status == Status.WAITING)
            ? (() => {}
        ) : this.toggleTimer;

        let debugPanel = (this.state.debug) ? <DebugPanel positions={this.state.positions}/> : null;

        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <h1 className="text-center">Tracker</h1>
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} style={{marginBottom: 10}}>
                        <Button
                            block
                            bsSize="large"
                            bsStyle={this.state.running ? 'warning' : 'success'}
                            onClick={buttonOnclick}
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