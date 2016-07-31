import React from 'react';
import {Row, Col} from 'react-bootstrap';

function mapsUrl(position) {
    var latLon = `${position.latitude},${position.longitude}`;
    return `https://maps.googleapis.com/maps/api/staticmap?center=${latLon}&zoom=17&size=400x400&sensor=false&markers=color:blue%7Clabel:S%7C${latLon}`
}

const DebugPanel = (props) => {
    var lastPosition = props.positions[props.positions.length - 1];

    var image;
    if (lastPosition) {
        image = <img className="img-responsive" src={mapsUrl(lastPosition)}/>
    }

    var preStyle = {
        fontSize: 10
    };

    var preText = props.positions
        .map((pos, idx) => `${idx} | ${pos.latitude.toFixed(10)} | ${pos.longitude.toFixed(10)}`)
        .join("\n");

    return (
        <div>
            <Row>
                <Col xs={12}>
                    {image}
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
};

export default DebugPanel;
