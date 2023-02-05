var stopStopwatchInterval;
var isRunning = false;
var currentTime = {
  hour: 0,
  minute: 0,
  second: 0,
  milisecond: 0,
};

const histories = [];

function toogleStopwatch() {
  isRunning = !isRunning;
  if (isRunning) {
    runStopwatch();
    document.getElementById("stopwatchButton").innerText = "Pause";
  }

  if (!isRunning) {
    document.getElementById("stopwatchButton").innerText = "Continue";
    stopStopwatch();
  }
}

function runStopwatch() {
  stopStopwatchInterval = setInterval(() => {
    currentTime.milisecond += 4;
    if (currentTime.milisecond === 1000) {
      currentTime.milisecond = 0;
      currentTime.second += 1;
    }
    if (currentTime.second === 60) {
      currentTime.second = 0;
      currentTime.minute += 1;
    }
    if (currentTime.minute === 60) {
      currentTime.minute = 0;
      currentTime.hour += 1;
    }
    renderStopwatch()
  }, 1);
}

function parametrize() {
  let hour = "";
  if (currentTime.hour < 10) {
    hour += `0${currentTime.hour}:`;
  } else {
    hour += currentTime.hour;
  }

  if (currentTime.minute < 10) {
    hour += `0${currentTime.minute}:`;
  } else {
    hour += currentTime.minute + ":";
  }

  if (currentTime.second < 10) {
    hour += `0${currentTime.second}.`;
  } else {
    hour += currentTime.second + ".";
  }

  if (currentTime.milisecond < 10) {
    hour += `00${currentTime.milisecond}`;
  } else if (currentTime.milisecond < 100) {
    hour += `0${currentTime.milisecond}`;
  } else {
    hour += currentTime.milisecond
  }

  return hour;
}

function stopStopwatch() {
  clearInterval(stopStopwatchInterval);
  const now = new Date();
  const date = now.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const time = now.toLocaleTimeString();
  const stopwatch = parametrize();

  const currentHistory = {
    date,
    time,
    stopwatch,
  };
  histories.unshift(currentHistory);

  renderHistories();
}

function renderHistories() {
  let html = "";
  histories.map((history) => {
    html += `
        <div class="histories-items">
            <div class="histories-item-line">${history.time}</div>
            <div class="histories-item-line">${history.stopwatch}</div>
            <div class="histories-item-line">${history.date}</div>
        </div>
        `;
  });
  document.getElementById("histories").innerHTML = html;
}

function renderStopwatch(){
    document.getElementById("stopwatch").innerText = parametrize();
}

function reset() {
    histories.splice(0, histories.length)
    currentTime = {
        hour: 0,
        minute: 0,
        second: 0,
        milisecond: 0,
      };
    renderHistories();
    renderStopwatch();
}
