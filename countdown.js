(function() {
    'use strict';
  
    // Get the break time from the URL
    var searchParams = new URLSearchParams(window.location.search);
    var breakTime = parseInt(searchParams.get('breakTime'), 10);
  
    // Get the countdown element and set its initial value
    var countdownElement = document.getElementById('countdown');
    countdownElement.innerHTML = breakTime + ':00';
  
    // Create and display the popup window
    var popupWindow = window.open('', 'popup', 'width=200,height=100');
    popupWindow.document.write('<p id="popup-countdown"></p>');
    popupWindow.document.close();
  
    // Update the countdown in the popup window every second
    var popupCountdownElement = popupWindow.document.getElementById('popup-countdown');
    var countdownSeconds = breakTime * 60;
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
  })();
  