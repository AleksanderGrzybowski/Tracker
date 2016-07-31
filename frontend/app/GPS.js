export default class GPS {

    constructor(locationChangedCallback, errorCallback) {
        this.locationChangedCallback = locationChangedCallback;
        this.errorCallback = errorCallback;
        this.watchId = null;
    }

    startPolling = () => {
        var gpsConfig = {enableHighAccuracy: true, timeout: 20000, maximumAge: 0};

        this.watchId = navigator.geolocation.watchPosition(
            (position) => {
                this.locationChangedCallback({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            },
            (error) => this.errorCallback(error),
            gpsConfig
        );
    };

    stopPolling = () => {
        navigator.geolocation.clearWatch(this.watchId);
    };
}