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

      // Calculate the end time and save it
      const endTime = new Date().getTime() + breakTimeInMinutes * 60 * 1000;
      chrome.storage.sync.set({ 'endTime': endTime });

      // Set the break timer
      startCountdown(endTime);
    } else {
      console.log('Invalid break time');
    }
  });
});

function startCountdown(endTime) {
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = endTime - now;

    if (distance <= 0) {
      clearInterval(window.stressLessCountdownInterval);
      countdownElement.innerText = 'Time for a break!';
    } else {
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      countdownElement.innerText = minutes + 'm ' + seconds + 's';
    }
  }

  clearInterval(window.stressLessCountdownInterval);
  window.stressLessCountdownInterval = setInterval(updateCountdown, 1000);
  updateCountdown();
}
