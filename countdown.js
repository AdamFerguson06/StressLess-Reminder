// Get the break time from the URL parameters
var urlParams = new URLSearchParams(window.location.search);
var breakTime = urlParams.get('breakTime');
var countdownSeconds = breakTime * 60;

// Get the countdown element and set its initial value
var countdownElement = document.getElementById('countdown');
countdownElement.innerHTML = formatCountdown(countdownSeconds);

// Update the countdown every second
var countdownInterval = setInterval(function() {
  countdownSeconds--;
  countdownElement.innerHTML = formatCountdown(countdownSeconds);
  if (countdownSeconds <= 0) {
    clearInterval(countdownInterval);
    if (!alertShown) {
      alertShown = true;
      alert('Time\'s up!');
    }
  }
}, 1000);

// Format the countdown time as MM:SS
function formatCountdown(seconds) {
  var minutes = Math.floor(seconds / 60);
  var secondsLeft = seconds % 60;
  return minutes + ':' + (secondsLeft < 10 ? '0' : '') + secondsLeft;
}

// Set the flag to track if the alert has been shown
var alertShown = false;
