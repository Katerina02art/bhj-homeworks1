const initialTime = 60;
let currentTime = initialTime;
const timerElement = document.getElementById("timer");
let timerId;

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = secs.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

function updateTimer() {
  currentTime--;

  if (currentTime < 0) {
    clearInterval(timerId);
    timerElement.textContent = "00:00:00";
    alert("Вы победили в конкурсе!");
    return;
  }

  timerElement.textContent = formatTime(currentTime);
}

timerElement.textContent = formatTime(currentTime);
timerId = setInterval(updateTimer, 1000);
