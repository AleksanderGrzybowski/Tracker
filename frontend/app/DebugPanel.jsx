import React from 'react';

export default class DebugPanel extends React.Component {
    render() {
        var lastPosition = this.props.positions[this.props.positions.length - 1];
        if (!lastPosition) {
            return <div>Waiting for position</div>
        }
        
        var lat = lastPosition.latitude;
        var lon = lastPosition.longitude;
        var count = this.props.positions.length;
        
        return (
            <div>
                <div>
                    Cnt: {count} Lat: {lat} | Lon: {lon}
                </div>
                
                <div>
                    <img
                        src={`https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&zoom=14&size=300x300&sensor=false&markers=color:blue%7Clabel:S%7C${lat},${lon}`}/>
                </div>
            </div>
        )
    }
}
