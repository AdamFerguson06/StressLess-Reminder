// Get the break time from the URL parameter
const urlParams = new URLSearchParams(window.location.search);
const breakTime = urlParams.get('breakTime');

// Get the countdown element and set its initial value
const countdownElement = document.getElementById('countdown');
countdownElement.innerHTML = `${breakTime}:00`;

// Update the countdown every second
let secondsRemaining = breakTime * 60;
setInterval(() => {
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const countdownText = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  countdownElement.innerHTML = countdownText;

  secondsRemaining--;
  if (secondsRemaining < 0) {
    clearInterval();
    alert('Time\'s up!');
  }
}, 1000);
