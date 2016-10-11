import React from 'react';

function padWithZero(number) {
    return number < 10 ? "0" + number : number
}

function secondsToString(totalSeconds) {
    const hours = parseInt(totalSeconds / 3600) % 24;
    const minutes = parseInt(totalSeconds / 60) % 60;
    const seconds = totalSeconds % 60;

    return [hours, minutes, seconds].map(padWithZero).join(':');
}

const Timer = ({elapsed}) => (
    <p className="text-center">{secondsToString(elapsed)}</p>
);

export default Timer;
