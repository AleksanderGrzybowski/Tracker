# Tracker

A very simple app which utilizes GPS to calculate traveled distance when I ride a bike. I made this one, cause I don't need anything fancy, and I don't trust privacy of commercial apps.

Frontend/Mobile
* Apache Cordova to run web application as an Android app
* React + react-bootstrap + ES6 for app code
* Webpack for glueing stuff together

Backend
* not even started, I don't actually need collecting statistics or alike 


To run it on physical Android device:
* download Android sdk and unpack it in ./android-sdk directory
* run `npm install` in relevant folders 
* set absolute path to android sdk in `./run-android.sh`
* run the above script
