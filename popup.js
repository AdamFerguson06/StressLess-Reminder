// Get the set break time button and add a click event listener
var setBreakTimeButton = document.getElementById('setBreakTime');
setBreakTimeButton.addEventListener('click', function() {
  // Get the break time from the input field
  var breakTime = document.getElementById('breakTimeInput').value;

  // Create the URL for the countdown screen
  var url = chrome.runtime.getURL('countdown.html') + '?breakTime=' + encodeURIComponent(breakTime);

  // Open the countdown screen in a new tab
  chrome.tabs.create({ url: url });
});

// Get the countdown element and set its initial value
var countdownElement = document.getElementById('countdown');
countdownElement.innerHTML = '---';

// Create and display the popup window
var popupWindow = window.open('', 'popup', 'width=200,height=100');
popupWindow.document.write('<p id="popup-countdown"></p>');
popupWindow.document.close();

// Update the countdown in the popup window every second
var popupCountdownElement = popupWindow.document.getElementById('popup-countdown');
var countdownSeconds = 0;
var countdownInterval = setInterval(function() {
  var minutes = Math.floor(countdownSeconds / 60);
  var seconds = countdownSeconds % 60;
  var countdownText = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  countdownElement.innerHTML = countdownText;
  popupCountdownElement.innerHTML = countdownText;
  countdownSeconds--;
  if (countdownSeconds < 0) {
    clearInterval(countdownInterval);
    popupWindow.alert('Time\'s up!');
  }
}, 1000);

// Close the popup window when the countdown is done
popupWindow.onunload = function() {
  clearInterval(countdownInterval);
};
