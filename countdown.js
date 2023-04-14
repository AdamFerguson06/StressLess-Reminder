// Get the break time from the query string
var searchParams = new URLSearchParams(window.location.search);
var breakTime = parseInt(searchParams.get('breakTime'));

// Get the countdown element and set its initial value
var countdownElement = document.getElementById('countdown');
countdownElement.innerHTML = breakTime + ':00';

// Update the countdown every second
var countdownSeconds = breakTime * 60;
var countdownInterval = setInterval(function() {
  var minutes = Math.floor(countdownSeconds / 60);
  var seconds = countdownSeconds % 60;
  var countdownText = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  countdownElement.innerHTML = countdownText;
  countdownSeconds--;
  if (countdownSeconds < 0) {
    clearInterval(countdownInterval);
    countdownElement.innerHTML = '0:00';
  }
}, 1000);
