#! /bin/bash

ANDROID_SDK_PATH=/home/kelog/Kodzenie/Tracker/android-sdk 

cd frontend
./node_modules/.bin/webpack
cd ..

cp frontend/index.html mobile/app/www
cp frontend/bundle.js mobile/app/www

cd mobile/app
ANDROID_HOME=${ANDROID_SDK_PATH} ../node_modules/.bin/cordova run android
