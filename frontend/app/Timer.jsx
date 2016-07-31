import React from 'react';

function secondsToString(totalSec) {
    var hours = parseInt(totalSec / 3600) % 24;
    var minutes = parseInt(totalSec / 60) % 60;
    var seconds = totalSec % 60;

    return (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
}

const Timer = ({elapsed}) => (
    <p className="text-center">{secondsToString(elapsed)}</p>
);

export default Timer;
