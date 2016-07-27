export default class FakeGPS {

    constructor(locationChangedCallback, errorCallback) {
        this.locationChangedCallback = locationChangedCallback;
        this.errorCallback = errorCallback;
        this.intervalId = null;

        this.fakePosition = {
            latitude: 49.722655,
            longitude: 18.813023,
            speed: 1
        };
    }

    startPolling = () => {
        this.intervalId = setInterval(() => {
            this.locationChangedCallback(this.fakePosition);
            this.updatePosition();
        }, 2000);
    };

    updatePosition = () => {
        this.fakePosition = {
            latitude: this.fakePosition.latitude + 0.0005,
            longitude: this.fakePosition.longitude + 0.0005,
            speed: Math.random() * 10
        }
    };

    stopPolling = () => {
        clearInterval(this.intervalId);
    };
}