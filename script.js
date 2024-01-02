// Existing code...

let whiteTime = 0;
let blackTime = 0;
let whiteInterval;
let blackInterval;
let whitePaused = true;
let blackPaused = true;

let whiteMoves = 0;
let blackMoves = 0;
let currentMoveColor = 'white';
let moveNumberInput;
let incrementTime;

function startTimer(color) {
  const time = color === 'white' ? whiteTime : blackTime;
  const timerId = color === 'white' ? 'whiteTimer' : 'blackTimer';

  let timer = time;
  const interval = setInterval(function () {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    document.getElementById(timerId).innerHTML = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    if (timer <= 0) {
      clearInterval(interval);
      document.getElementById('beep').play();
      setTimeout(function () {
        const acknowledge = confirm(color + ' time is up! Click OK to stop the sound.');
        if (acknowledge) {
          document.getElementById('beep').pause();
          document.getElementById('beep').currentTime = 0;
        }
      }, 500);
    } else if (color === 'white' ? whitePaused : blackPaused) {
      clearInterval(interval);
    } else {
      timer--;
      if (color === 'white') {
        whiteTime = timer;
      } else {
        blackTime = timer;
      }
      handleMoveCompletion(color);
    }
  }, 1000);

  return interval;
}

document.addEventListener('keydown', function (event) {
  if (event.code === 'Space') {
    if (whitePaused && blackPaused) {
      whitePaused = false;
      whiteInterval = startTimer('white');
    } else if (!whitePaused && blackPaused) {
      whitePaused = true;
      clearInterval(whiteInterval);
      blackPaused = false;
      blackInterval = startTimer('black');
    } else if (whitePaused && !blackPaused) {
      blackPaused = true;
      clearInterval(blackInterval);
      whitePaused = false;
      whiteInterval = startTimer('white');
    }
  }
});

function setTimer() {
  clearInterval(whiteInterval); // Clear existing intervals
  clearInterval(blackInterval);

  whitePaused = true; // Pause the timers
  blackPaused = true;

  const whiteTimeInput = document.getElementById('whiteTime').value;
  const blackTimeInput = document.getElementById('blackTime').value;
  const incrementTimeInput = document.getElementById('incrementTime').value;
  moveNumberInput = parseInt(document.getElementById('moveNumber').value);

  whiteTime = calculateTime(whiteTimeInput); // Update timer values
  blackTime = calculateTime(blackTimeInput);
  incrementTime = calculateTime(`00:${incrementTimeInput}`);

  console.log(`White time: ${whiteTime}`);
  console.log(`Black time: ${blackTime}`);
  console.log(`Increment time: ${incrementTimeInput}`);
  console.log(`Increment starts from move: ${moveNumberInput}`);

  document.getElementById('whiteTimer').innerHTML = '00:00'; // Update timer display
  document.getElementById('blackTimer').innerHTML = '00:00';

  whiteMoves = 0; // Reset move counters
  blackMoves = 0;
  currentMoveColor = 'white'; // Reset move color to white
}

function calculateTime(timeInput) {
  const [hours = 0, minutes = 0, seconds = 0] = timeInput.split(':').map(Number);
  return (hours * 60 * 60) + (minutes * 60) + seconds;
}

// ... (existing code)

function handleMoveCompletion(color) {
  if (color === 'white') {
    if (whiteMoves >= 2 * moveNumberInput) {
      whiteTime += incrementTime;
    }
    whiteMoves++;
  } else {
    if (blackMoves >= 2 * moveNumberInput) {
      blackTime += incrementTime;
    }
    blackMoves++;
  }

  currentMoveColor = color === 'white' ? 'black' : 'white';
}



