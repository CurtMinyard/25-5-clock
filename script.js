document.addEventListener('DOMContentLoaded', () => {
  let breakLength = 5;
  let sessionLength = 25;
  let timeLeft = sessionLength * 60;
  let isRunning = false;
  let isSession = true;
  let timer;

  const breakLengthEl = document.getElementById('break-length');
  const sessionLengthEl = document.getElementById('session-length');
  const timeLeftEl = document.getElementById('time-left');
  const timerLabelEl = document.getElementById('timer-label');
  const beep = document.getElementById('beep');

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  const updateDisplay = () => {
    timeLeftEl.textContent = formatTime(timeLeft);
    breakLengthEl.textContent = breakLength;
    sessionLengthEl.textContent = sessionLength;
  };

  const handleReset = () => {
    clearInterval(timer);
    breakLength = 5;
    sessionLength = 25;
    timeLeft = sessionLength * 60;
    isRunning = false;
    isSession = true;
    timerLabelEl.textContent = 'Session';
    beep.pause();
    beep.currentTime = 0;
    updateDisplay();
  };

  const handleStartStop = () => {
    if (isRunning) {
      clearInterval(timer);
    } else {
      timer = setInterval(() => {
        if (timeLeft <= 0) {
          beep.play();
          isSession = !isSession;
          timerLabelEl.textContent = isSession ? 'Session' : 'Break';
          timeLeft = (isSession ? sessionLength : breakLength) * 60;
        } else {
          timeLeft -= 1;
        }
        updateDisplay();
      }, 1000);
    }
    isRunning = !isRunning;
  };

  const handleIncrement = (type) => {
    if (type === 'break' && breakLength < 60) {
      breakLength += 1;
    } else if (type === 'session' && sessionLength < 60) {
      sessionLength += 1;
      if (!isRunning && isSession) {
        timeLeft = sessionLength * 60;
      }
    }
    updateDisplay();
  };

  const handleDecrement = (type) => {
    if (type === 'break' && breakLength > 1) {
      breakLength -= 1;
    } else if (type === 'session' && sessionLength > 1) {
      sessionLength -= 1;
      if (!isRunning && isSession) {
        timeLeft = sessionLength * 60;
      }
    }
    updateDisplay();
  };

  document.getElementById('break-increment').addEventListener('click', () => handleIncrement('break'));
  document.getElementById('break-decrement').addEventListener('click', () => handleDecrement('break'));
  document.getElementById('session-increment').addEventListener('click', () => handleIncrement('session'));
  document.getElementById('session-decrement').addEventListener('click', () => handleDecrement('session'));
  document.getElementById('start_stop').addEventListener('click', handleStartStop);
  document.getElementById('reset').addEventListener('click', handleReset);

  updateDisplay();
});
