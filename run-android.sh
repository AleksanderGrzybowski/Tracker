#! /bin/bash

ANDROID_SDK_PATH=/home/kelog/Kodzenie/Tracker/android-sdk 

cd frontend
./node_modules/.bin/webpack
cd ..

rm -rf mobile/app/www
cp -r frontend/out mobile/app/www

cd mobile/app
ANDROID_HOME=${ANDROID_SDK_PATH} ../node_modules/.bin/cordova run android
