import React from 'react';
import {Row, Col} from 'react-bootstrap';

function mapsUrl(position) {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${position.latitude},${position.longitude}&zoom=17&size=400x400&sensor=false&markers=color:blue%7Clabel:S%7C${position.latitude},${position.longitude}`
}

export default class DebugPanel extends React.Component {
    render() {
        var lastPosition = this.props.positions[this.props.positions.length - 1];

        var preStyle = {
            fontSize: 10
        };

        var preText = this.props.positions
            .map((pos, idx) => `${idx} | ${pos.latitude.toFixed(10)} | ${pos.longitude.toFixed(10)}`)
            .join("\n");

        return (
            <div>
                <Row>
                    <Col xs={12}>
                        <img
                            className="img-responsive"
                            src={mapsUrl(lastPosition)}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col xs={12}>
                        <pre style={preStyle}>
                            {preText}
                        </pre>
                    </Col>
                </Row>
            </div>
        )
    }
}
