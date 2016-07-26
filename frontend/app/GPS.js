export default class GPS {

    constructor(locationChangedCallback, errorCallback) {
        this.locationChangedCallback = locationChangedCallback;
        this.errorCallback = errorCallback;
        this.watchId = null;
    }

    startPolling = () => {
        this.watchId = navigator.geolocation.watchPosition(
            (position) => {
                this.locationChangedCallback({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    speed: position.speed
                });
            },
            (error) => this.errorCallback(error),
            {enableHighAccuracy: true, timeout: 10000, maximumAge: 0}
        );
    };

    stopPolling = () => {
        navigator.geolocation.clearWatch(this.watchId);
    };
}