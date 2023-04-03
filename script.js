// Time

let newDate = new Date();

setTimeout(() => {
    let day = newDate.getDate(),
        month = newDate.getMonth(),
        year = newDate.getFullYear();
    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;
    document.querySelector('.current-date').innerHTML = `${day}.${month}.${year}`;
});

setInterval(() => {
    let newDate = new Date(),
        hour = newDate.getHours(),
        min = newDate.getMinutes(),
        sec = newDate.getSeconds();
    if (hour < 10) hour = '0' + hour;
    if (min < 10) min = '0' + min;
    if (sec < 10) sec = '0' + sec;
    document.querySelector('.current-time').innerHTML = `${hour}:${min}:${sec}`;
}, 1000);


// Stopwatch

const hourSW = document.querySelector('#hour');
const minuteSW = document.querySelector('#minute');
const secondSW = document.querySelector('#second');
const millisecondSW = document.querySelector('#millisecond');

const startStopwatchBtn = document.querySelector('.start-stopwatch');
const loopStapwatchBtn = document.querySelector('.loop-stopwatch');
const stopStapwatchBtn = document.querySelector('.stop-stopwatch');
const resetStapwatchBtn = document.querySelector('.reset-stopwatch');

const fieldStopwatch = document.querySelector('.stopwatch-window');


let milliseconds = 000,
    seconds = 00,
    minutes = 00,
    hours = 00;
let interval;

startStopwatchBtn.onclick = function () {
    clearInterval(interval);
    interval = setInterval(startStopwatch, 10);
    startStopwatchBtn.style.outline = '2px solid #ba02da';
    stopStapwatchBtn.style.outline = 'none';
    loopStapwatchBtn.style.outline = 'none';
    resetStapwatchBtn.style.outline = 'none';
};

loopStapwatchBtn.onclick = function () {
    const block = document.createElement('div');
    block.innerHTML = `${hourSW.innerHTML}:${minuteSW.innerHTML}:${secondSW.innerHTML}:${millisecondSW.innerHTML}`
    fieldStopwatch.append(block);
    stopStapwatchBtn.style.outline = 'none';
    startStopwatchBtn.style.outline = 'none';
    resetStapwatchBtn.style.outline = 'none';
    loopStapwatchBtn.style.outline = '2px solid #ba02da';
};

stopStapwatchBtn.onclick = function () {
    clearInterval(interval);
    stopStapwatchBtn.style.outline = '2px solid #ba02da';
    startStopwatchBtn.style.outline = 'none';
    loopStapwatchBtn.style.outline = 'none';
    resetStapwatchBtn.style.outline = 'none';
};

resetStapwatchBtn.onclick = function () {
    clearInterval(interval);
    milliseconds = '000';
    seconds = '00';
    minutes = '00';
    hours = '00';
    hourSW.innerHTML = hours;
    minuteSW.innerHTML = minutes;
    secondSW.innerHTML = seconds;
    millisecondSW.innerHTML = milliseconds;
    fieldStopwatch.innerHTML = '';
    stopStapwatchBtn.style.outline = 'none';
    startStopwatchBtn.style.outline = 'none';
    loopStapwatchBtn.style.outline = 'none';
    resetStapwatchBtn.style.outline = '2px solid #ba02da';
    setInterval(() => {
        resetStapwatchBtn.style.outline = 'none';
    }, 1000);
};


function startStopwatch() {
    milliseconds++;

    if (milliseconds <= 9) millisecondSW.innerHTML = '00' + milliseconds;
    if (milliseconds > 9) millisecondSW.innerHTML = '0' + milliseconds;
    if (milliseconds > 99) {
        seconds++;
        secondSW.innerHTML = '0' + seconds;
        milliseconds = '000';
        millisecondSW.innerHTML = milliseconds;
    }
    if (seconds > 9) secondSW.innerHTML = seconds;
    if (seconds > 59) {
        minutes++;
        minuteSW.innerHTML = '0' + minutes;
        seconds = '00';
        secondSW.innerHTML = seconds;
    }
    if (minutes > 9) minuteSW.innerHTML = minutes;
    if (minutes > 59) {
        hours++;
        hourSW.innerHTML = '0' + hours;
        minutes = '00';
        minuteSW.innerHTML = minutes;
    }
    if (hours > 9) hourSW.innerHTML = hours;
    if (hours > 23) {
        hours = '00';
        hourSW.innerHTML = hours;
    }
};

//Timer  

const setMinute = document.querySelector('.set-min');
const plusBtn = document.querySelector('.plus');
const minusBtn = document.querySelector('.minus');

const startTimerBtn = document.querySelector('.start-timer'); 
const stopTimerBtn = document.querySelector('.stop-timer'); 
const resetTimerBtn = document.querySelector('.reset-timer'); 

const countdownTimer = document.querySelector('.countdown-timer'); 
let startMin = 25;

function resetTime() {
    let setMin = new Date (0, 0, 0, 0, startMin, 0);
    setMin.setTime(startMin * 60 * 1000);
    timeLeft = setMin.getTime();
};

plusBtn.onclick = function() {
    startMin = startMin + 1;
    setMinute.innerHTML = `${startMin}`;
    resetTime();
    if (startMin > 59) startMin = -1;
};

minusBtn.onclick = function() {
    startMin = startMin - 1;
    setMinute.innerHTML = `${startMin}`;
    resetTime();
    if (startMin < 1) {
        startMin = 61;
    }
};

let timerMin;
let timeLeft;
let startTimeMin;
// resetTime();

startTimerBtn.onclick = function() {
    startTimeMin = new Date();
    timerMin = setInterval(() => {
        let currentTime = new Date();
        let time = timeLeft - (currentTime.getTime() - startTimeMin.getTime());
        if (time > 0) {
            let tmin = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
            let tsec = Math.floor((time % (1000 * 60)) / 1000);
            if (tsec < 10) tsec = '0' + tsec;
            if (tmin <= 0) tmin = '0' + tmin; 
            countdownTimer.innerHTML = `${tmin}:${tsec}`;
        } else if (time < 0) {
            startTimerBtn.style.outline = 'none';        
        }
    });
    startTimerBtn.disabled = true;
    stopTimerBtn.disabled = false;
    resetTimerBtn.disabled = false;
    plusBtn.disabled = true;
    minusBtn.disabled = true;

    startTimerBtn.style.outline = '1px solid #ba02da';
    stopTimerBtn.style.outline = 'none';

};

stopTimerBtn.onclick = function() {
    let currentTime = new Date();
    timeLeft = timeLeft - (currentTime.getTime() - startTimeMin.getTime());
    clearInterval(timerMin);

    startTimerBtn.disabled = false;
    stopTimerBtn.disabled = true;
    resetTimerBtn.disabled = false;
    plusBtn.disabled = true;
    minusBtn.disabled = true;

    stopTimerBtn.style.outline = '1px solid #ba02da';
    startTimerBtn.style.outline = 'none';
};

resetTimerBtn.onclick = function () { 

    clearInterval(timerMin);
    countdownTimer.innerHTML = '00:00';

    startTimerBtn.disabled = false;
    stopTimerBtn.disabled = false;
    resetTimerBtn.disabled = true;
    plusBtn.disabled = false;
    minusBtn.disabled = false;

    this.style.outline = '1px solid #ba02da';
    startTimerBtn.style.outline = 'none';
    stopTimerBtn.style.outline = 'none';

    setInterval(() => {
        this.style.outline = 'none';
    }, 2000);
};

