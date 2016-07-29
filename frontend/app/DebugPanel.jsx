import React from 'react';
import {Row, Col} from 'react-bootstrap';

export default class DebugPanel extends React.Component {
    render() {
        var positionsCount = this.props.positions.length;

        var lastPosition = this.props.positions[positionsCount - 1];

        var lat, lon;
        if (!lastPosition) {
            lat = lon = 'n/a';
        } else {
            lat = lastPosition.latitude;
            lon = lastPosition.longitude;
        }

        return (
            <div>
                <Row>
                    <Col xs={12}>
                        <img
                            className='img-responsive'
                            src={`https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&zoom=14&size=400x400&sensor=false&markers=color:blue%7Clabel:S%7C${lat},${lon}`}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col xs={12}>
                        <pre>
                            Cnt: {positionsCount} Lat: {lat} | Lon: {lon}
                        </pre>
                    </Col>
                </Row>

            </div>
        )
    }
}
