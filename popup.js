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
      // Store the break time in minutes
      chrome.storage.sync.set({ breakTimeInMinutes: breakTimeInMinutes }, function () {
        console.log('Break time set to ' + breakTimeInMinutes + ' minutes.');
      });

      // Calculate the end time for the break
      const endTime = new Date().getTime() + breakTimeInMinutes * 60 * 1000;
      chrome.storage.sync.set({ endTime: endTime }, function () {
        console.log('Break end time set to ' + new Date(endTime));
      });

      // Open the countdown.html in a new window
      const width = 300;
      const height = 200;
      const left = (screen.width / 2) - (width / 2);
      const top = (screen.height / 2) - (height / 2);
      window.open('countdown.html', 'countdown', `width=${width},height=${height},top=${top},left=${left}`);
    }
  });
});
