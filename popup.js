var breakPopupWindow = null;

function setBreakTime() {
  var minutes = document.getElementById('breakTimeInput').value;
  if (minutes) {
    // Calculate the number of seconds until the next break
    var secondsUntilBreak = minutes * 60;

    // Create a new window with no content
    var popupWindow = window.open('', 'breakWindow', 'width=200,height=100');

    // Close the previous popup window, if it exists
    if (breakPopupWindow) {
      breakPopupWindow.close();
    }

    // Store a reference to the new popup window
    breakPopupWindow = popupWindow;

    // Start the countdown
    startCountdown(secondsUntilBreak, popupWindow);
  }
}

function startCountdown(seconds, popupWindow) {
  // Get the countdown element and set its initial value
  var countdownElement = document.getElementById('countdown');
  var popupCountdownElement = popupWindow.document.createElement('p');
  popupWindow.document.body.appendChild(popupCountdownElement);
  var countdownText = formatTime(seconds);
  countdownElement.innerHTML = countdownText;
  popupCountdownElement.innerHTML = countdownText;

  // Update the countdown every second
  var countdownInterval = setInterval(function() {
    seconds--;
    countdownText = formatTime(seconds);
    countdownElement.innerHTML = countdownText;
    popupCountdownElement.innerHTML = countdownText;
    if (seconds <= 0) {
      clearInterval(countdownInterval);
      popupWindow.alert('Time\'s up!');
      popupWindow.close();
      breakPopupWindow = null;
    }
  }, 1000);

  // Close the popup window when the countdown is done
  popupWindow.onunload = function() {
    clearInterval(countdownInterval);
    breakPopupWindow = null;
  };
}

function formatTime(seconds) {
  var minutes = Math.floor(seconds / 60);
  var seconds = seconds % 60;
  return minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
}
