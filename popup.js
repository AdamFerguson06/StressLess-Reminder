document.addEventListener('DOMContentLoaded', function () {
  const breakTimeInput = document.getElementById('breakTimeInput');
  const setBreakTimeButton = document.getElementById('setBreakTime');

  // Load the stored break time when the popup is opened
  chrome.storage.sync.get(['breakTimeInMinutes'], function (result) {
    if (result.breakTimeInMinutes) {
      breakTimeInput.value = result.breakTimeInMinutes;
    }
  });

  setBreakTimeButton.addEventListener('click', function () {
    const breakTimeInMinutes = parseInt(breakTimeInput.value, 10);

    if (breakTimeInMinutes && breakTimeInMinutes > 0) {
      // Save the break time to the Chrome storage
      chrome.storage.sync.set({ 'breakTimeInMinutes': breakTimeInMinutes }, function () {
        console.log('Break time set to', breakTimeInMinutes, 'minutes');
      });

      // Set the break timer
      setBreakTimer(breakTimeInMinutes);
    } else {
      console.log('Invalid break time');
    }
  });
});

function setBreakTimer(breakTimeInMinutes) {
  // Clear any existing timer
  clearTimeout(window.stressLessTimer);

  // Set a new timer
  window.stressLessTimer = setTimeout(function () {
    alert('Time for a break!');
  }, breakTimeInMinutes * 60 * 1000);
}
