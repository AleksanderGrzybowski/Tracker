import React from 'react';

export default class DebugPanel extends React.Component {
    render() {
        var lat = this.props.position.latitude;
        var lon = this.props.position.longitude;
        
        return (
            <div>
                <div>
                    Lat: {lat} | Lon: {lon}
                </div>
                
                <div>
                    <img
                        src={`https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&zoom=14&size=300x300&sensor=false&markers=color:blue%7Clabel:S%7C${lat},${lon}`}/>
                </div>
            </div>
        )
    }
}
