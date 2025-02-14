// Stopwatchscript.js

let timerDisplay = document.getElementById("timer");
let startButton = document.getElementById("start");
let pauseButton = document.getElementById("pause");
let resetButton = document.getElementById("reset");
let lapButton = document.getElementById("lap");
let lapList = document.getElementById("lap-list");

let timer = null;
let elapsedTime = 0;
let isPaused = false;

// Format time into HH:MM:SS
function formatTime(milliseconds) {
  let totalSeconds = Math.floor(milliseconds / 1000);
  let hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  let minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  let seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

// Start the timer
function startTimer() {
  if (!timer) {
    let startTime = Date.now() - elapsedTime;
    timer = setInterval(() => {
      if (!isPaused) {
        elapsedTime = Date.now() - startTime;
        timerDisplay.textContent = formatTime(elapsedTime);
      }
    }, 1000);
  }
}

// Pause or Resume the timer
function pauseTimer() {
  isPaused = !isPaused;
  pauseButton.textContent = isPaused ? "Resume" : "Pause";
}

// Reset the timer
function resetTimer() {
  clearInterval(timer);
  timer = null;
  elapsedTime = 0;
  isPaused = false;
  pauseButton.textContent = "Pause";
  timerDisplay.textContent = "00:00:00";
  lapList.innerHTML = ""; // Clear laps
}

// Record a lap
function recordLap() {
  if (timer && !isPaused) {
    let lapTime = formatTime(elapsedTime);
    let lapItem = document.createElement("li");
    lapItem.textContent = lapTime;
    lapList.appendChild(lapItem);
  }
}

// Event Listeners
startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);
lapButton.addEventListener("click", recordLap);
