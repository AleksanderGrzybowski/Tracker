# Tracker

A very simple app which utilizes GPS to calculate traveled distance when I ride a bike. I made this one, cause I don't need anything fancy, and I don't trust privacy of commercial apps.
This project actually failed. While everything works for me, in order for the GPS to operate, phone screen must be turned on. With the help of stackoverflow, I hacked around the automatic screen turnoff, but if phone is locked manually, then GPS readings stop after a few minutes. Fixing this in pure Cordova seems to be impossible without some native Java (Android) magic, so I just let it go.

Frontend + Mobile
* Apache Cordova to run web application as an Android app
* React + react-bootstrap + ES6 for app code
* Webpack for glueing stuff together


To run it on physical Android device:
* download Android sdk and unpack it in ./android-sdk directory
* run `npm install` in relevant folders 
* set absolute path to android sdk in `./run-android.sh`
* run the above script
